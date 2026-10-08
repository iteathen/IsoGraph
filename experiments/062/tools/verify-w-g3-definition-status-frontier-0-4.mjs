import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const predecessorPath='experiments/062/W_G3_CORE_DEFINABILITY_0_3.json';
const frontierPath='experiments/062/W_G3_DEFINITION_STATUS_FRONTIER_0_4.json';
const currentPath='experiments/062/W_G3_CORE_DEFINABILITY_0_4.json';
const generatorPath='experiments/062/tools/apply-w-g3-definition-status-frontier-0-4.mjs';

const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const frontier=JSON.parse(fs.readFileSync(frontierPath,'utf8'));
const current=JSON.parse(fs.readFileSync(currentPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);

if(current.schema!=='isograph.exp062-w-g3-core-definability.v0.4') fail('schema mismatch');
if(current.predecessor!==predecessorPath||current.frontier!==frontierPath) fail('lineage mismatch');
if(current.fixed_point?.G3_complete!==false||current.fixed_point?.G4_authorized!==false) fail('gate overclaim');
if(current.fixed_point?.pending_explicit_rows!==41) fail('expected 41 pending explicit rows');

const source=new Map();
for(const item of extraction.items||[]) for(const o of item.occurrences||[]) source.set(o.occurrence_id,o);
const front=new Map((frontier.rows||[]).map(x=>[x.occurrence_id,x]));
const cur=new Map();
for(const item of current.items||[]) for(const row of item.occurrences||[]) cur.set(row.occurrence_id,row);
if(source.size!==425||front.size!==425||cur.size!==425) fail('coverage mismatch');

const counts={FINAL_CORE_CLOSED:0,FINAL_UNEXPANDED_EXTERNAL_DEFINITION:0,FINAL_UNEXPANDED_PARTIAL_SOURCE_DEFINITION:0,PENDING_EXPLICIT_SOURCE_ADJUDICATION:0};
for(const [id,row] of cur){
  const s=source.get(id),f=front.get(id);
  if(!s||!f){fail(id+': source/frontier missing');continue;}
  if(row.review_state!==f.review_state||row.review_state_reason!==f.reason) fail(id+': review-state mismatch');
  if(!(row.review_state in counts)) fail(id+': invalid review state');
  else counts[row.review_state]++;
  if(row.disposition==='CORE_CLOSED'&&row.review_state!=='FINAL_CORE_CLOSED') fail(id+': closed row not final');
  if(row.disposition==='UNEXPANDED_DEMAND'){
    if(s.definition_status==='NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED'&&row.review_state!=='FINAL_UNEXPANDED_EXTERNAL_DEFINITION') fail(id+': name-only routing mismatch');
    if(s.definition_status==='PARTIAL_IN_BODY'&&row.review_state!=='FINAL_UNEXPANDED_PARTIAL_SOURCE_DEFINITION') fail(id+': partial routing mismatch');
    if(s.definition_status==='EXPLICIT_IN_BODY'&&row.review_state!=='PENDING_EXPLICIT_SOURCE_ADJUDICATION') fail(id+': explicit routing mismatch');
  }
}
for(const [k,v] of Object.entries(frontier.counts||{})) if(counts[k]!==v) fail('frontier count mismatch '+k);
if(counts.FINAL_CORE_CLOSED!==13||counts.FINAL_UNEXPANDED_EXTERNAL_DEFINITION!==67||counts.FINAL_UNEXPANDED_PARTIAL_SOURCE_DEFINITION!==304||counts.PENDING_EXPLICIT_SOURCE_ADJUDICATION!==41) fail('expected review counts mismatch');

execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',currentPath],{encoding:'utf8'});
if(diff.trim()) fail('0.4 generator replay mismatch');

console.log(JSON.stringify({
 schema:'isograph.exp062-verify-w-g3-definition-status-frontier.v0.4',
 pass:errors.length===0,
 errors,
 review_counts:counts,
 replay_exact:diff.trim()==='',
 pending_explicit_rows:41,
 G3_complete:false,
 G4_authorized:false
},null,2));
if(errors.length) process.exit(1);
