import fs from 'node:fs';

const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_3.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_4.json','utf8'));
const adjudication=JSON.parse(fs.readFileSync('experiments/062/W_SOURCE_COMPLETENESS_REAUDIT_ADJUDICATION_0_1.json','utf8'));

const errors=[];
const W=corpus.items.filter(x=>x.track==='W');
const bodyById=new Map(W.map(x=>[x.census_id,x.body]));
const expectedIds=W.map(x=>x.census_id);
const allowedForce=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDef=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA|L-SSC-\d+)\b/i;

if(next.track!=='W') errors.push('track mismatch');
if(JSON.stringify(next.items.map(x=>x.census_id))!==JSON.stringify(expectedIds)) errors.push('84-id corpus/order mismatch');
if(next.items.length!==84) errors.push('item_count != 84');

const prevById=new Map(prev.items.map(x=>[x.census_id,x]));
const globalIds=new Set();
for(const item of next.items){
 const body=bodyById.get(item.census_id);
 if(typeof body!=='string'){errors.push(item.census_id+': missing frozen body');continue;}
 if(item.extraction_status!=='COMPLETE') errors.push(item.census_id+': extraction_status != COMPLETE');
 if(!Array.isArray(item.occurrences)){errors.push(item.census_id+': occurrences not array');continue;}
 const positions=new Map();
 item.occurrences.forEach((o,i)=>positions.set(o.occurrence_id,i));
 const seen=new Set();
 for(let i=0;i<item.occurrences.length;i++){
  const o=item.occurrences[i];
  if(typeof o.occurrence_id!=='string'||seen.has(o.occurrence_id)) errors.push(item.census_id+': bad/duplicate occurrence_id '+o.occurrence_id);
  if(typeof o.occurrence_id==='string'&&!o.occurrence_id.startsWith(item.census_id+'-O')) errors.push(item.census_id+': occurrence prefix mismatch '+o.occurrence_id);
  if(globalIds.has(o.occurrence_id)) errors.push('global duplicate occurrence_id '+o.occurrence_id);
  globalIds.add(o.occurrence_id);
  seen.add(o.occurrence_id);
  if(typeof o.source_span!=='string'||!body.includes(o.source_span)) errors.push(o.occurrence_id+': source_span not exact');
  if(typeof o.relation_span!=='string'||!body.includes(o.relation_span)||!o.source_span.includes(o.relation_span)) errors.push(o.occurrence_id+': relation_span not exact/inside source_span');
  if(!Array.isArray(o.argument_spans)||o.argument_spans.some(s=>typeof s!=='string'||!body.includes(s))) errors.push(o.occurrence_id+': argument span not exact');
  if(!allowedForce.has(o.logical_force)) errors.push(o.occurrence_id+': invalid logical_force');
  if(!allowedDef.has(o.definition_status)) errors.push(o.occurrence_id+': invalid definition_status');
  if(!Array.isArray(o.depends_on)) errors.push(o.occurrence_id+': depends_on not array');
  if(typeof o.load_bearing_note!=='string'||!o.load_bearing_note.trim()) errors.push(o.occurrence_id+': missing load_bearing_note');
  const semanticMeta=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,load_bearing_note:o.load_bearing_note});
  if(forbidden.test(semanticMeta)) errors.push(o.occurrence_id+': forbidden candidate/cross-track label outside quoted spans');
  for(const dep of o.depends_on||[]){
   if(!positions.has(dep)) errors.push(o.occurrence_id+': missing same-item dependency '+dep);
   else if(positions.get(dep)>=i) errors.push(o.occurrence_id+': dependency is not prior '+dep);
  }
 }
 const old=prevById.get(item.census_id);
 if(!old){errors.push(item.census_id+': predecessor item missing');continue;}
 const nextByOcc=new Map(item.occurrences.map(o=>[o.occurrence_id,o]));
 for(const oldOcc of old.occurrences){
  const now=nextByOcc.get(oldOcc.occurrence_id);
  if(!now) errors.push(item.census_id+'/'+oldOcc.occurrence_id+': predecessor occurrence silently dropped');
  else if(JSON.stringify(now)!==JSON.stringify(oldOcc)) errors.push(item.census_id+'/'+oldOcc.occurrence_id+': predecessor occurrence silently modified');
 }
}

const total=next.items.reduce((n,x)=>n+x.occurrences.length,0);
const predecessorTotal=prev.items.reduce((n,x)=>n+x.occurrences.length,0);
if(predecessorTotal!==159) errors.push('predecessor occurrence_count != 159');
if(total!==177) errors.push('occurrence_count != 177');
if(total-predecessorTotal!==18) errors.push('new occurrence count != 18');
if(adjudication?.status!=='SOURCE_LOCAL_ADJUDICATION_COMPLETE_FOR_RUN_37496395745_ATTEMPT_2') errors.push('adjudication status mismatch');
if(adjudication?.counts?.correction_rows!==12) errors.push('adjudication correction row count mismatch');
if(adjudication?.counts?.audit_omission_leads!==15) errors.push('adjudication omission lead count mismatch');

const w108Prev=prevById.get('W-SSC-108');
const w108Next=next.items.find(x=>x.census_id==='W-SSC-108');
if(JSON.stringify(w108Prev)!==JSON.stringify(w108Next)) errors.push('W-SSC-108 changed despite rejected bare-association lead');
const w106=next.items.find(x=>x.census_id==='W-SSC-106');
if(!(w106?.occurrences||[]).some(o=>o.source_span==='no-F-rational-point/fixed-point-free Galois action')) errors.push('W-SSC-106 narrowed mathematical occurrence missing');
if((w106?.occurrences||[]).some(o=>o.source_span.includes('finite-prime analogue'))) errors.push('W-SSC-106 rejected analogy component promoted');

const report={
 pass:errors.length===0,
 errors,
 track:'W',
 item_count:next.items.length,
 occurrence_count:total,
 predecessor_occurrence_count:predecessorTotal,
 added_occurrence_count:total-predecessorTotal,
 adjudication:'experiments/062/W_SOURCE_COMPLETENESS_REAUDIT_ADJUDICATION_0_1.json',
 corpus:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json',
 predecessor:'experiments/062/W_EXTRACTION_RECONCILED_0_3.json',
 successor:'experiments/062/W_EXTRACTION_RECONCILED_0_4.json',
 authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY'
};
console.log(JSON.stringify(report,null,2));
if(errors.length) process.exit(1);
