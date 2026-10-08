import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const predecessorPath='experiments/062/W_G3_CORE_DEFINABILITY_0_2.json';
const adjudicationPath='experiments/062/W_G3_CORE_DEFINABILITY_ADJUDICATION_0_3.json';
const currentPath='experiments/062/W_G3_CORE_DEFINABILITY_0_3.json';
const generatorPath='experiments/062/tools/apply-w-g3-core-definability-adjudication-0-3.mjs';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const current=JSON.parse(fs.readFileSync(currentPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);

if(current.schema!=='isograph.exp062-w-g3-core-definability.v0.3') fail('schema mismatch');
if(current.predecessor!==predecessorPath||current.adjudication!==adjudicationPath) fail('lineage mismatch');
if(current.fixed_point?.G3_complete!==false||current.fixed_point?.G4_authorized!==false) fail('gate overclaim');

const pred=new Map(),cur=new Map();
for(const item of predecessor.items||[]) for(const row of item.occurrences||[]) pred.set(row.occurrence_id,row);
for(const item of current.items||[]) for(const row of item.occurrences||[]) cur.set(row.occurrence_id,row);
if(pred.size!==425||cur.size!==425) fail('coverage mismatch');

const expected=new Set((adjudication.corrections||[]).map(x=>x.occurrence_id));
const actual=[];
for(const [id,p] of pred){
  const c=cur.get(id);
  if(!c){fail(id+': missing');continue;}
  if(JSON.stringify(p)!==JSON.stringify(c)) actual.push(id);
  if(!expected.has(id)&&JSON.stringify(p)!==JSON.stringify(c)) fail(id+': unexpected mutation');
}
if(JSON.stringify(actual.sort())!==JSON.stringify([...expected].sort())) fail('changed set mismatch');

for(const change of adjudication.corrections||[]){
  const p=pred.get(change.occurrence_id),c=cur.get(change.occurrence_id);
  if(!p||!c) continue;
  if(p.disposition!==change.from||c.disposition!==change.to) fail(change.occurrence_id+': transition mismatch');
  if(c.disposition!=='CORE_CLOSED'||!c.closure_basis||c.missing_definition_or_authority!==null) fail(change.occurrence_id+': invalid closure');
}
for(const held of adjudication.reviewed_not_closed||[]){
  const row=cur.get(held.occurrence_id);
  if(!row||row.disposition!=='UNEXPANDED_DEMAND') fail(held.occurrence_id+': reviewed hold changed');
}

const counts={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};
for(const row of cur.values()) counts[row.disposition]++;
if(counts.CORE_CLOSED!==13||counts.UNEXPANDED_DEMAND!==412) fail('expected 13 closed / 412 unresolved');
for(const [k,v] of Object.entries(adjudication.resulting_counts||{})) if(counts[k]!==v) fail('count mismatch '+k);

execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',currentPath],{encoding:'utf8'});
if(diff.trim()) fail('generator replay mismatch');

console.log(JSON.stringify({
 schema:'isograph.exp062-verify-w-g3-core-definability.v0.3',
 pass:errors.length===0,
 errors,
 changed_occurrences:actual.sort(),
 counts,
 replay_exact:diff.trim()==='',
 G3_complete:false,
 G4_authorized:false
},null,2));
if(errors.length) process.exit(1);
