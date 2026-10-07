import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const graphPath='experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_1.json';
const g3Path='experiments/062/W_G3_CORE_DEFINABILITY_0_1.json';
const waiverPath='experiments/062/G1_OWNER_COLD_AUDIT_WAIVER_0_1.json';
const generatorPath='experiments/062/tools/generate-w-g3-core-definability-0-1.mjs';

const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const graph=JSON.parse(fs.readFileSync(graphPath,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const waiver=JSON.parse(fs.readFileSync(waiverPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

if(g3.schema!=='isograph.exp062-w-g3-core-definability.v0.1') fail('schema mismatch');
if(g3.track!=='W') fail('track mismatch');
if(g3.status!=='G3_CONSERVATIVE_DEFINABILITY_PASS_OPEN') fail('status mismatch');
if(g3.authority!==false) fail('G3 artifact must remain non-authority');
if(g3.input?.extraction?.path!==extractionPath||g3.input?.extraction?.git_blob_sha!==blob(extractionPath)) fail('extraction pin mismatch');
if(g3.input?.g2_graph?.path!==graphPath||g3.input?.g2_graph?.git_blob_sha!==blob(graphPath)) fail('G2 pin mismatch');
if(g3.input?.campaign_waiver?.path!==waiverPath||g3.input?.campaign_waiver?.git_blob_sha!==blob(waiverPath)) fail('waiver pin mismatch');
if(waiver.gate_ruling?.G2_authorized_for_this_campaign!==true) fail('campaign gate no longer authorizes G2/G3');
if(graph.next_stage!=='G3_QUALIFIED_CORE_DEFINABILITY_PASS') fail('G2 no longer routes to G3');

const allowed=new Set(['CORE_CLOSED','CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION','QUALIFIED_QU_BOUNDARY_CANDIDATE','UNEXPANDED_DEMAND']);
const sourceIds=[];
for(const item of extraction.items) for(const o of item.occurrences||[]) sourceIds.push(o.occurrence_id);
const g3Ids=[];
const dispositions={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};

if(!Array.isArray(g3.items)||g3.items.length!==84) fail('G3 must contain 84 bodies');
for(const [i,item] of (g3.items||[]).entries()){
  const src=extraction.items[i];
  if(!src||item.census_id!==src.census_id) fail('body order mismatch at '+i);
  if((item.occurrences||[]).length!==(src?.occurrences||[]).length) fail(item.census_id+': occurrence count mismatch');
  for(const row of item.occurrences||[]){
    g3Ids.push(row.occurrence_id);
    if(!allowed.has(row.disposition)) fail(row.occurrence_id+': invalid disposition');
    else dispositions[row.disposition]++;
    const srcOcc=(src?.occurrences||[]).find(o=>o.occurrence_id===row.occurrence_id);
    if(!srcOcc){fail(row.occurrence_id+': unknown occurrence');continue;}
    if(!row.g2_node_id) fail(row.occurrence_id+': missing G2 node');
    if(row.source_provenance?.source_span!==srcOcc.source_span) fail(row.occurrence_id+': source span mismatch');
    if(row.source_provenance?.relation_span!==srcOcc.relation_span) fail(row.occurrence_id+': relation span mismatch');
    if(row.source_provenance?.logical_force!==srcOcc.logical_force) fail(row.occurrence_id+': logical force mismatch');
    if(row.source_provenance?.definition_status!==srcOcc.definition_status) fail(row.occurrence_id+': definition status mismatch');

    if(row.disposition==='CORE_CLOSED'){
      if(!row.closure_basis) fail(row.occurrence_id+': CORE_CLOSED lacks basis');
      if(row.missing_definition_or_authority!==null) fail(row.occurrence_id+': CORE_CLOSED carries missing definition');
      const args=srcOcc.argument_spans||[];
      const safe=srcOcc.relation_span==='='&&srcOcc.logical_force==='EQUALITY_OR_IDENTIFICATION'&&args.length===2&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(args[0])&&/^-?[0-9]+$/.test(args[1]);
      if(!safe) fail(row.occurrence_id+': 0.1 closed outside conservative literal-assignment rule');
    }else{
      if(typeof row.missing_definition_or_authority!=='string'||!row.missing_definition_or_authority.trim()) fail(row.occurrence_id+': unresolved row lacks exact missing-definition statement');
    }
  }
}

if(JSON.stringify(g3Ids)!==JSON.stringify(sourceIds)) fail('G3 occurrence order/coverage mismatch');
for(const [k,v] of Object.entries(dispositions)) if(g3.counts?.[k]!==v) fail('count mismatch '+k);
if(g3.counts?.occurrences!==425||g3.counts?.bodies!==84) fail('global G3 counts mismatch');
if(g3.fixed_point?.G3_complete!==false||g3.fixed_point?.G4_authorized!==false) fail('0.1 must not claim G3 fixed point/G4 authorization');

const itemStructure=JSON.stringify(g3.items.map(item=>({
  census_id:item.census_id,
  occurrences:item.occurrences.map(x=>({occurrence_id:x.occurrence_id,g2_node_id:x.g2_node_id,disposition:x.disposition}))
})));
for(const re of [/L-SSC-/i,/\bPD-[A-Z0-9-]+/i,/\bB-[A-Z0-9-]+/i,/DNWF/i,/DNIA/i]){
  if(re.test(itemStructure)) fail('forbidden cross-track/pre-G4/pre-G5 token in G3 structure: '+re);
}

execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',g3Path],{encoding:'utf8'});
if(diff.trim()) fail('G3 generator does not replay checked-in artifact');

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-g3-core-definability.v0.1',
  pass:errors.length===0,
  errors,
  counts:dispositions,
  G3_complete:false,
  G4_authorized:false,
  replay_exact:diff.trim()==='',
  note:'This verifies only the conservative W G3 0.1 pass. It does not convert unresolved rows into primitive candidates or authorize G4.'
},null,2));
if(errors.length) process.exit(1);
