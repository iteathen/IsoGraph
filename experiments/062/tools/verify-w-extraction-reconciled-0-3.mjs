import fs from 'node:fs';
import assert from 'node:assert/strict';

const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_2.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_3.json','utf8'));
const adjudication=JSON.parse(fs.readFileSync('experiments/062/W_FULL_AUDIT_LEAD_ADJUDICATION_0_1.json','utf8'));

const errors=[];
const W=corpus.items.filter(x=>x.track==='W');
const bodyById=new Map(W.map(x=>[x.census_id,x.body]));
const expectedIds=W.map(x=>x.census_id);
const allowedForce=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDef=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const replaced=new Set([
 'W-SSC-039/W-SSC-039-O01',
 'W-SSC-040/W-SSC-040-O01',
 'W-SSC-042/W-SSC-042-O01',
 'W-SSC-050/W-SSC-050-O01',
 'W-SSC-062/W-SSC-062-O01',
 'W-SSC-114/W-SSC-114-O01',
 'W-SSC-124/W-SSC-124-O01'
]);
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA|L-SSC-\d+)\b/i;

if(next.track!=='W') errors.push('track mismatch');
if(JSON.stringify(next.items.map(x=>x.census_id))!==JSON.stringify(expectedIds)) errors.push('84-id corpus/order mismatch');
if(next.items.length!==84) errors.push('item_count != 84');

const prevById=new Map(prev.items.map(x=>[x.census_id,x]));
for(const item of next.items){
 const body=bodyById.get(item.census_id);
 if(typeof body!=='string'){errors.push(item.census_id+': missing frozen body');continue;}
 if(item.extraction_status!=='COMPLETE') errors.push(item.census_id+': extraction_status != COMPLETE');
 if(!Array.isArray(item.occurrences)) {errors.push(item.census_id+': occurrences not array');continue;}
 const seen=new Set();
 for(const o of item.occurrences){
  if(typeof o.occurrence_id!=='string'||seen.has(o.occurrence_id)) errors.push(item.census_id+': bad/duplicate occurrence_id '+o.occurrence_id);
  seen.add(o.occurrence_id);
  if(typeof o.source_span!=='string'||!body.includes(o.source_span)) errors.push(o.occurrence_id+': source_span not exact');
  if(typeof o.relation_span!=='string'||!body.includes(o.relation_span)||!o.source_span.includes(o.relation_span)) errors.push(o.occurrence_id+': relation_span not exact/inside source_span');
  if(!Array.isArray(o.argument_spans)||o.argument_spans.some(s=>typeof s!=='string'||!body.includes(s))) errors.push(o.occurrence_id+': argument span not exact');
  if(!allowedForce.has(o.logical_force)) errors.push(o.occurrence_id+': invalid logical_force');
  if(!allowedDef.has(o.definition_status)) errors.push(o.occurrence_id+': invalid definition_status');
  if(!Array.isArray(o.depends_on)) errors.push(o.occurrence_id+': depends_on not array');
  const semanticMeta=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,load_bearing_note:o.load_bearing_note});
  if(forbidden.test(semanticMeta)) errors.push(o.occurrence_id+': forbidden candidate/cross-track label outside quoted spans');
 }
 for(const o of item.occurrences){
  for(const dep of o.depends_on||[]) if(!seen.has(dep)) errors.push(o.occurrence_id+': missing same-item dependency '+dep);
 }
 const old=prevById.get(item.census_id);
 if(!old){errors.push(item.census_id+': predecessor item missing');continue;}
 const nextByOcc=new Map(item.occurrences.map(o=>[o.occurrence_id,o]));
 for(const oldOcc of old.occurrences){
  const key=item.census_id+'/'+oldOcc.occurrence_id;
  if(replaced.has(key)) continue;
  const now=nextByOcc.get(oldOcc.occurrence_id);
  if(!now) errors.push(key+': predecessor occurrence silently dropped');
  else if(JSON.stringify(now)!==JSON.stringify(oldOcc)) errors.push(key+': predecessor occurrence silently modified');
 }
}

const total=next.items.reduce((n,x)=>n+x.occurrences.length,0);
if(total!==159) errors.push('occurrence_count != 159');
if(adjudication?.counts?.audit_correction_rows!==46) errors.push('adjudication correction count mismatch');
if(adjudication?.counts?.accepted_audit_rows!==43) errors.push('adjudication accepted count mismatch');
if(adjudication?.counts?.rejected_audit_rows!==3) errors.push('adjudication rejected count mismatch');
for(const id of ['W-SSC-043','W-SSC-055']){
 const a=prevById.get(id), b=next.items.find(x=>x.census_id===id);
 if(JSON.stringify(a)!==JSON.stringify(b)) errors.push(id+': rejected-modality item changed');
}

const report={
 pass:errors.length===0,
 errors,
 track:'W',
 item_count:next.items.length,
 occurrence_count:total,
 predecessor_occurrence_count:prev.items.reduce((n,x)=>n+x.occurrences.length,0),
 explicitly_replaced_occurrences:[...replaced],
 adjudication:'experiments/062/W_FULL_AUDIT_LEAD_ADJUDICATION_0_1.json',
 corpus:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json',
 predecessor:'experiments/062/W_EXTRACTION_RECONCILED_0_2.json',
 successor:'experiments/062/W_EXTRACTION_RECONCILED_0_3.json',
 authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY'
};
console.log(JSON.stringify(report,null,2));
if(errors.length) process.exit(1);
