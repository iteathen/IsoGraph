import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const predecessorPath='experiments/062/W_G3_CORE_DEFINABILITY_0_4.json';
const adjudicationPath='experiments/062/W_G3_EXPLICIT_IN_BODY_ADJUDICATION_0_5.json';
const currentPath='experiments/062/W_G3_CORE_DEFINABILITY_0_5.json';
const generatorPath='experiments/062/tools/apply-w-g3-explicit-adjudication-0-5.mjs';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const current=JSON.parse(fs.readFileSync(currentPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);

if(current.schema!=='isograph.exp062-w-g3-core-definability.v0.5') fail('schema mismatch');
if(current.status!=='W_G3_FIXED_POINT_COMPLETE_W_LOCAL_G4_AUTHORIZED') fail('status mismatch');
if(current.predecessor!==predecessorPath||current.adjudication!==adjudicationPath) fail('lineage mismatch');
const fp=current.fixed_point||{};
if(fp.G3_complete!==true||fp.pending_rows!==0||fp.W_local_G4_authorized!==true) fail('W G3 fixed-point gate mismatch');
if(fp.cross_track_G4_authorized!==false||fp.G4_authorized!==false) fail('cross-track/global G4 must remain blocked');

const pred=new Map(),cur=new Map();
for(const item of predecessor.items||[]) for(const row of item.occurrences||[]) pred.set(row.occurrence_id,row);
for(const item of current.items||[]) for(const row of item.occurrences||[]) cur.set(row.occurrence_id,row);
if(pred.size!==425||cur.size!==425) fail('coverage mismatch');

const explicitIds=new Set((adjudication.rows||[]).map(x=>x.occurrence_id));
if(explicitIds.size!==41) fail('expected 41 explicit adjudication rows');
for(const [id,row] of cur){
  const p=pred.get(id);
  if(!p){fail(id+': predecessor missing');continue;}
  if(explicitIds.has(id)){
    if(p.review_state!=='PENDING_EXPLICIT_SOURCE_ADJUDICATION') fail(id+': predecessor was not pending explicit');
    if(row.review_state!=='FINAL_UNEXPANDED_EXPLICIT_IN_BODY') fail(id+': final explicit review state mismatch');
    if(row.disposition!=='UNEXPANDED_DEMAND') fail(id+': explicit final disposition changed');
    const a=adjudication.rows.find(x=>x.occurrence_id===id);
    if(row.missing_definition_or_authority!==a.exact_missing_lower_behavior) fail(id+': exact missing-lower behavior mismatch');
  }else if(JSON.stringify(p)!==JSON.stringify(row)){
    fail(id+': non-explicit row mutated');
  }
}

const disp={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};
const review={FINAL_CORE_CLOSED:0,FINAL_UNEXPANDED_EXTERNAL_DEFINITION:0,FINAL_UNEXPANDED_PARTIAL_SOURCE_DEFINITION:0,FINAL_UNEXPANDED_EXPLICIT_IN_BODY:0};
for(const row of cur.values()){
  if(!(row.disposition in disp)) fail(row.occurrence_id+': invalid disposition'); else disp[row.disposition]++;
  if(!(row.review_state in review)) fail(row.occurrence_id+': non-final review state'); else review[row.review_state]++;
}
for(const [k,v] of Object.entries(adjudication.resulting_counts||{})) if(disp[k]!==v) fail('disposition count mismatch '+k);
for(const [k,v] of Object.entries(adjudication.resulting_review_counts||{})) if(review[k]!==v) fail('review count mismatch '+k);
if(disp.CORE_CLOSED!==13||disp.UNEXPANDED_DEMAND!==412||review.FINAL_UNEXPANDED_EXPLICIT_IN_BODY!==41) fail('fixed-point counts mismatch');

const structural=JSON.stringify([...cur.values()].map(x=>({id:x.occurrence_id,disposition:x.disposition,review_state:x.review_state,g2_node_id:x.g2_node_id})));
for(const re of [/L-SSC-/i,/\bPD-[A-Z0-9-]+/i,/\bB-[A-Z0-9-]+/i,/DNWF/i,/DNIA/i]) if(re.test(structural)) fail('forbidden structural token '+re);

execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',currentPath],{encoding:'utf8'});
if(diff.trim()) fail('0.5 generator replay mismatch');

console.log(JSON.stringify({
 schema:'isograph.exp062-verify-w-g3-fixed-point.v0.5',
 pass:errors.length===0,
 errors,
 dispositions:disp,
 review_states:review,
 replay_exact:diff.trim()==='',
 W_G3_complete:fp.G3_complete===true,
 W_local_G4_authorized:fp.W_local_G4_authorized===true,
 cross_track_G4_authorized:false
},null,2));
if(errors.length) process.exit(1);
