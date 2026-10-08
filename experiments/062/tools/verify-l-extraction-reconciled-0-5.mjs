import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8')),prev=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_4.json','utf8')),next=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_5.json','utf8')),review=JSON.parse(fs.readFileSync('experiments/062/L_G1_FINAL_AUDIT_V3_ADJUDICATION_0_1.json','utf8'));
const errors=[],L=corpus.items.filter(x=>x.track==='L'),bodyById=new Map(L.map(x=>[x.census_id,x.body])),prevById=new Map(prev.items.map(x=>[x.census_id,x])),global=new Set(),allowedForce=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']),allowedDef=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']),forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA|W-SSC-\d+)\b/i,changed=[];
if(next.track!=='L'||next.items.length!==151||JSON.stringify(next.items.map(x=>x.census_id))!==JSON.stringify(L.map(x=>x.census_id)))errors.push('corpus/order');
for(const item of next.items){
 const body=bodyById.get(item.census_id),pos=new Map(item.occurrences.map((o,i)=>[o.occurrence_id,i])),now=new Map(item.occurrences.map(o=>[o.occurrence_id,o]));
 if(item.extraction_status!=='COMPLETE')errors.push(item.census_id+': incomplete');
 for(let i=0;i<item.occurrences.length;i++){
  const o=item.occurrences[i];if(global.has(o.occurrence_id))errors.push(o.occurrence_id+': duplicate');global.add(o.occurrence_id);
  if(!body.includes(o.source_span)||!body.includes(o.relation_span)||!o.source_span.includes(o.relation_span))errors.push(o.occurrence_id+': span');
  if((o.argument_spans||[]).some(a=>!body.includes(a)))errors.push(o.occurrence_id+': arg');
  if(!allowedForce.has(o.logical_force)||!allowedDef.has(o.definition_status)||forbidden.test(JSON.stringify(o)))errors.push(o.occurrence_id+': metadata');
  for(const d of o.depends_on||[])if(!pos.has(d)||pos.get(d)>=i)errors.push(o.occurrence_id+': dependency '+d);
 }
 for(const old of prevById.get(item.census_id).occurrences||[]){
  const n=now.get(old.occurrence_id);if(!n){errors.push(old.occurrence_id+': predecessor missing');continue;}
  if(JSON.stringify(n)!==JSON.stringify(old)){
   changed.push(old.occurrence_id);
   if(old.occurrence_id!=='L-SSC-188-O03')errors.push(old.occurrence_id+': predecessor');
   const allowed=JSON.parse(JSON.stringify(old));allowed.depends_on=['L-SSC-188-O02'];if(JSON.stringify(allowed)!==JSON.stringify(n))errors.push(old.occurrence_id+': unexpected mutation');
  }
 }
}
const pc=prev.items.reduce((n,x)=>n+x.occurrences.length,0),tc=next.items.reduce((n,x)=>n+x.occurrences.length,0);
if(pc!==284||tc!==290||tc-pc!==6||JSON.stringify(changed)!==JSON.stringify(['L-SSC-188-O03']))errors.push('counts/change set');
if(review.status!=='SOURCE_LOCAL_ADJUDICATION_COMPLETE_FOR_RUN_37520642413_ATTEMPT_1'||review.counts?.accepted_occurrence_additions!==6||review.counts?.accepted_dependency_metadata_repairs!==1)errors.push('review');
console.log(JSON.stringify({pass:!errors.length,errors,item_count:151,predecessor_occurrence_count:pc,occurrence_count:tc,added_occurrence_count:tc-pc,changed_predecessor_occurrences:changed,all_complete:next.items.every(x=>x.extraction_status==='COMPLETE'),authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY'},null,2));if(errors.length)process.exitCode=1;
