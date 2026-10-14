import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const inputPath='experiments/062/L_G3_CORE_DEFINABILITY_0_1.json';
const adjPath='experiments/062/L_G3_CORE_DEFINABILITY_ADJUDICATION_0_2.json';
const outPath='experiments/062/L_G3_CORE_DEFINABILITY_0_2.json';
const generator='experiments/062/tools/apply-l-g3-core-definability-adjudication-0-2.mjs';
const input=JSON.parse(fs.readFileSync(inputPath,'utf8'));
const adj=JSON.parse(fs.readFileSync(adjPath,'utf8'));
const out=JSON.parse(fs.readFileSync(outPath,'utf8'));
const errors=[],fail=m=>errors.push(m);
if(input.schema!=='isograph.exp062-l-g3-core-definability.v0.1')fail('input schema');
if(adj.schema!=='isograph.exp062-l-g3-core-definability-adjudication.v0.2')fail('adjudication schema');
if(out.schema!=='isograph.exp062-l-g3-core-definability.v0.2')fail('output schema');
if(adj.input?.path!==inputPath)fail('adj input path');
if(adj.input?.git_blob_sha!==execFileSync('git',['hash-object',inputPath],{encoding:'utf8'}).trim())fail('adj input blob');
if((adj.corrections||[]).length!==50)fail('correction count');
const allowedScope=new Set(['in selected exceptional embeddings','Within F1','Within F2','After symmetry breaking','Within the restricted sector','With Phi=*','For a Standard-Model embedding','For z-directed massless momenta','For sp(3)','For noncompact e8(8) and e8(-24)','Within the e8 noncompact gradings','For large G','For a Spin(4,4)-type regional structure','under this regional assumption']);
const sourceById=new Map();for(const item of input.items)for(const row of item.occurrences)sourceById.set(row.occurrence_id,row);
const expectedKinds={CORE_IDENTITY_EQUALITY_WRAPPER:0,CORE_CONJUNCTION_WRAPPER:0,CORE_DISJUNCTION_WRAPPER:0,CORE_SCOPE_BOUNDARY_WRAPPER:0};
for(const c of adj.corrections||[]){
 const row=sourceById.get(c.occurrence_id);if(!row){fail('missing '+c.occurrence_id);continue;}
 if(row.disposition!=='UNEXPANDED_DEMAND'||c.from!=='UNEXPANDED_DEMAND'||c.to!=='CORE_CLOSED')fail(c.occurrence_id+': disposition');
 const p=row.source_provenance||{};let ok=false;
 if(c.kind==='CORE_IDENTITY_EQUALITY_WRAPPER'){ok=p.relation_span==='='&&p.logical_force==='EQUALITY_OR_IDENTIFICATION';}
 else if(c.kind==='CORE_CONJUNCTION_WRAPPER'){ok=p.relation_span==='and';}
 else if(c.kind==='CORE_DISJUNCTION_WRAPPER'){ok=p.relation_span==='or';}
 else if(c.kind==='CORE_SCOPE_BOUNDARY_WRAPPER'){ok=allowedScope.has(p.relation_span);}
 else fail(c.occurrence_id+': kind');
 if(!ok)fail(c.occurrence_id+': rule mismatch');
 if(!c.basis)fail(c.occurrence_id+': basis missing');
 if(c.kind in expectedKinds)expectedKinds[c.kind]++;
}
if(expectedKinds.CORE_IDENTITY_EQUALITY_WRAPPER!==33)fail('equality count');
if(expectedKinds.CORE_CONJUNCTION_WRAPPER!==1)fail('and count');
if(expectedKinds.CORE_DISJUNCTION_WRAPPER!==2)fail('or count');
if(expectedKinds.CORE_SCOPE_BOUNDARY_WRAPPER!==14)fail('scope count');
const counts={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};
for(const item of out.items||[])for(const row of item.occurrences||[]){if(!(row.disposition in counts))fail('bad disposition '+row.occurrence_id);else counts[row.disposition]++;}
for(const [k,v] of Object.entries({CORE_CLOSED:51,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:767}))if(counts[k]!==v||out.counts?.[k]!==v)fail('count '+k);
if(out.fixed_point?.G3_complete!==false||out.fixed_point?.G4_authorized!==false)fail('premature fixed point');
const structural=JSON.stringify(out.items.map(i=>({census_id:i.census_id,occurrences:i.occurrences.map(r=>({occurrence_id:r.occurrence_id,g2_node_id:r.g2_node_id,disposition:r.disposition}))})));
for(const re of [/W-SSC-/i,/\bPD-[A-Z0-9-]+/i,/\bB-[A-Z0-9-]+/i,/DNWF/i,/DNIA/i])if(re.test(structural))fail('forbidden structural token '+re);
execFileSync('node',[generator],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',outPath],{encoding:'utf8'});
if(diff.trim())fail('generator replay mismatch');
console.log(JSON.stringify({schema:'isograph.exp062-verify-l-g3-core-definability.v0.2',pass:errors.length===0,errors,wrapper_counts:expectedKinds,counts,replay_exact:diff.trim()==='',G3_complete:false,G4_authorized:false},null,2));
if(errors.length)process.exit(1);
