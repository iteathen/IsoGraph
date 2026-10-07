import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const inputPath='experiments/062/L_G3_CORE_DEFINABILITY_0_2.json';
const adjPath='experiments/062/L_G3_CORE_DEFINABILITY_ADJUDICATION_0_3.json';
const outPath='experiments/062/L_G3_CORE_DEFINABILITY_0_3.json';
const generator='experiments/062/tools/apply-l-g3-core-definability-adjudication-0-3.mjs';
const input=JSON.parse(fs.readFileSync(inputPath,'utf8'));
const adj=JSON.parse(fs.readFileSync(adjPath,'utf8'));
const out=JSON.parse(fs.readFileSync(outPath,'utf8'));
const errors=[],fail=m=>errors.push(m);
if(input.schema!=='isograph.exp062-l-g3-core-definability.v0.2')fail('input schema');
if(adj.schema!=='isograph.exp062-l-g3-core-definability-adjudication.v0.3')fail('adj schema');
if(out.schema!=='isograph.exp062-l-g3-core-definability.v0.3')fail('out schema');
if(adj.input?.path!==inputPath||adj.input?.git_blob_sha!==execFileSync('git',['hash-object',inputPath],{encoding:'utf8'}).trim())fail('adj input pin');
const expectedIds=new Set(["L-SSC-037-O03","L-SSC-047-O04","L-SSC-051-O02","L-SSC-051-O03","L-SSC-051-O04","L-SSC-052-O03","L-SSC-056-O04","L-SSC-057-O05","L-SSC-066-O02","L-SSC-079-O03","L-SSC-080-O03","L-SSC-089-O03","L-SSC-099-O03","L-SSC-099-O04","L-SSC-104-O04","L-SSC-105-O04","L-SSC-106-O04","L-SSC-119-O02","L-SSC-119-O04","L-SSC-123-O05","L-SSC-133-O03","L-SSC-145-O02","L-SSC-147-O02","L-SSC-149-O03","L-SSC-151-O02","L-SSC-168-O02","L-SSC-168-O06","L-SSC-175-O07","L-SSC-187-O04","L-SSC-188-O08","L-SSC-188-O09"]);
if((adj.corrections||[]).length!==31)fail('correction count');
const inputById=new Map();for(const i of input.items)for(const r of i.occurrences)inputById.set(r.occurrence_id,r);
for(const c of adj.corrections||[]){
 if(!expectedIds.delete(c.occurrence_id))fail('unexpected/duplicate correction '+c.occurrence_id);
 const r=inputById.get(c.occurrence_id);
 if(!r||r.disposition!=='UNEXPANDED_DEMAND'||c.from!=='UNEXPANDED_DEMAND'||c.to!=='CORE_CLOSED')fail(c.occurrence_id+': disposition mismatch');
 if(typeof c.basis!=='string'||!c.basis.includes('incidence')&&!c.basis.includes('identity'))fail(c.occurrence_id+': weak basis');
}
if(expectedIds.size)fail('missing expected corrections '+[...expectedIds].join(','));
const counts={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};
for(const i of out.items||[])for(const r of i.occurrences||[]){if(!(r.disposition in counts))fail('bad disposition '+r.occurrence_id);else counts[r.disposition]++;}
for(const [k,v] of Object.entries({CORE_CLOSED:82,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:736}))if(counts[k]!==v||out.counts?.[k]!==v)fail('count '+k);
if(out.fixed_point?.G3_complete!==false||out.fixed_point?.G4_authorized!==false)fail('premature fixed point');
const structural=JSON.stringify(out.items.map(i=>({census_id:i.census_id,occurrences:i.occurrences.map(r=>({occurrence_id:r.occurrence_id,g2_node_id:r.g2_node_id,disposition:r.disposition}))})));
for(const re of [/W-SSC-/i,/\bPD-[A-Z0-9-]+/i,/\bB-[A-Z0-9-]+/i,/DNWF/i,/DNIA/i])if(re.test(structural))fail('forbidden token '+re);
execFileSync('node',[generator],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',outPath],{encoding:'utf8'});
if(diff.trim())fail('generator replay mismatch');
console.log(JSON.stringify({schema:'isograph.exp062-verify-l-g3-core-definability.v0.3',pass:errors.length===0,errors,counts,replay_exact:diff.trim()==='',G3_complete:false,G4_authorized:false},null,2));
if(errors.length)process.exit(1);
