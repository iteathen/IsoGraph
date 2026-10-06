import fs from 'node:fs';

const predecessorPath=process.argv[2]||'experiments/062/L_EXTRACTION_RECONCILED_0_1.json';
const reviewPath=process.argv[3]||'experiments/062/L_SOURCE_COMPLETENESS_REAUDIT_ADJUDICATION_0_1.json';
const outputPath=process.argv[4]||'experiments/062/L_EXTRACTION_RECONCILED_0_2.json';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const auditPath='experiments/062/evidence/run-37502616897-attempt-2/exp062-l-batched-audit/AUDIT.json';

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const review=JSON.parse(fs.readFileSync(reviewPath,'utf8'));
const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));

const L=corpus.items.filter(x=>x.track==='L');
const expectedIds=L.map(x=>x.census_id);
const bodyById=new Map(L.map(x=>[x.census_id,x.body]));
const predById=new Map(predecessor.items.map(x=>[x.census_id,x]));
const correctionRows=audit.items.filter(x=>x.status==='CORRECTION_REQUIRED');
const correctionIds=correctionRows.map(x=>x.census_id);
const reviewItems=review.items||review.decisions||[];
const reviewById=new Map(reviewItems.map(x=>[x.census_id,x]));
const allowedDecision=new Set(['ACCEPT_SOURCE_LOCAL_CORRECTION','ACCEPT_WITH_SOURCE_LOCAL_NARROWING','REJECT_CORE_ONLY_OR_SOURCE_MODALITY','REJECT_DUPLICATE_OR_SPURIOUS']);
const allowedForce=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDef=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA|W-SSC-\d+)\b/i;
const errors=[];

if(predecessor.track!=='L')errors.push('predecessor track');
if(JSON.stringify(predecessor.items.map(x=>x.census_id))!==JSON.stringify(expectedIds))errors.push('predecessor corpus/order');
if(JSON.stringify(reviewItems.map(x=>x.census_id))!==JSON.stringify(correctionIds))errors.push('review correction ids/order');

const auditById=new Map(correctionRows.map(x=>[x.census_id,x]));
for(const id of correctionIds){
 const row=reviewById.get(id),auditRow=auditById.get(id);
 if(!row){errors.push(id+': missing review row');continue;}
 const leads=row.lead_resolutions||[];
 if(leads.length!==auditRow.omissions.length)errors.push(id+': lead count');
 if(JSON.stringify(leads.map(x=>x.audit_source_span))!==JSON.stringify(auditRow.omissions.map(x=>x.source_span)))errors.push(id+': lead span/order');
 for(const lead of leads){
  if(!allowedDecision.has(lead.decision))errors.push(id+': invalid decision');
  const accept=lead.decision.startsWith('ACCEPT_');
  if(!Array.isArray(lead.proposed_occurrences))errors.push(id+': occurrences not array');
  if(accept&&!(lead.proposed_occurrences||[]).length)errors.push(id+': accepted lead empty');
  if(!accept&&(lead.proposed_occurrences||[]).length)errors.push(id+': rejected lead nonempty');
 }
}

const additionalById=new Map();
for(const x of review.additional_source_local_findings||[]){
 if(!expectedIds.includes(x.census_id)){errors.push('additional unknown '+x.census_id);continue;}
 if(additionalById.has(x.census_id))errors.push('duplicate additional '+x.census_id);
 additionalById.set(x.census_id,x.proposed_occurrences||[]);
}

function maxOccurrenceNumber(occurrences){
 let max=0;
 for(const o of occurrences||[]){
  const m=String(o.occurrence_id||'').match(/-O(\d+)$/);
  if(m)max=Math.max(max,Number(m[1]));
 }
 return max;
}

const next={track:'L',items:[]};
let addedCount=0;
for(const id of expectedIds){
 const body=bodyById.get(id),pred=predById.get(id);
 const occurrences=JSON.parse(JSON.stringify(pred.occurrences||[]));
 const existingIds=new Set(occurrences.map(x=>x.occurrence_id));
 let n=maxOccurrenceNumber(occurrences);
 const reviewRow=reviewById.get(id);
 const candidates=[];
 if(reviewRow)for(const lead of reviewRow.lead_resolutions||[])if(lead.decision.startsWith('ACCEPT_'))for(const o of lead.proposed_occurrences||[])candidates.push(o);
 for(const o of additionalById.get(id)||[])candidates.push(o);
 const candidateIdMap=new Map();
 for(const o of candidates){
  if(typeof o.candidate_id!=='string'||candidateIdMap.has(o.candidate_id)){errors.push(id+': bad/duplicate candidate '+o.candidate_id);continue;}
  candidateIdMap.set(o.candidate_id,id+'-O'+String(++n).padStart(2,'0'));
 }
 for(const o of candidates){
  const finalId=candidateIdMap.get(o.candidate_id);
  if(!finalId)continue;
  if(typeof o.source_span!=='string'||!body.includes(o.source_span))errors.push(finalId+': source span');
  if(typeof o.relation_span!=='string'||!body.includes(o.relation_span)||!o.source_span.includes(o.relation_span))errors.push(finalId+': relation span');
  if(!Array.isArray(o.argument_spans)||o.argument_spans.some(a=>typeof a!=='string'||!body.includes(a)))errors.push(finalId+': argument span');
  if(!allowedForce.has(o.logical_force))errors.push(finalId+': logical force');
  if(!allowedDef.has(o.definition_status))errors.push(finalId+': definition status');
  if(!Array.isArray(o.depends_on))errors.push(finalId+': depends_on');
  const deps=(o.depends_on||[]).map(dep=>candidateIdMap.get(dep)||dep);
  for(const dep of deps)if(!existingIds.has(dep)&&![...candidateIdMap.values()].includes(dep))errors.push(finalId+': dependency '+dep);
  const meta=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:deps,load_bearing_note:o.load_bearing_note});
  if(forbidden.test(meta))errors.push(finalId+': forbidden semantic metadata');
  occurrences.push({
   occurrence_id:finalId,
   source_span:o.source_span,
   relation_span:o.relation_span,
   argument_spans:o.argument_spans,
   logical_force:o.logical_force,
   definition_status:o.definition_status,
   depends_on:deps,
   load_bearing_note:o.load_bearing_note
  });
  existingIds.add(finalId);addedCount++;
 }
 next.items.push({census_id:id,occurrences,extraction_status:'COMPLETE'});
}

for(const item of next.items){
 const body=bodyById.get(item.census_id),seen=new Set();
 for(const o of item.occurrences){
  if(seen.has(o.occurrence_id))errors.push(o.occurrence_id+': duplicate final id');seen.add(o.occurrence_id);
  if(!body.includes(o.source_span))errors.push(o.occurrence_id+': final source');
  if(!body.includes(o.relation_span)||!o.source_span.includes(o.relation_span))errors.push(o.occurrence_id+': final relation');
  for(const a of o.argument_spans||[])if(!body.includes(a))errors.push(o.occurrence_id+': final argument '+a);
  for(const dep of o.depends_on||[])if(!seen.has(dep)&&!item.occurrences.some(x=>x.occurrence_id===dep))errors.push(o.occurrence_id+': final dependency '+dep);
 }
 // Conservation: predecessor occurrences must survive byte-identically.
 const byId=new Map(item.occurrences.map(x=>[x.occurrence_id,x]));
 for(const old of predById.get(item.census_id).occurrences||[]){
  const now=byId.get(old.occurrence_id);
  if(!now)errors.push(old.occurrence_id+': predecessor dropped');
  else if(JSON.stringify(now)!==JSON.stringify(old))errors.push(old.occurrence_id+': predecessor modified');
 }
}

if(next.items.length!==151)errors.push('final item count');
if(JSON.stringify(next.items.map(x=>x.census_id))!==JSON.stringify(expectedIds))errors.push('final order');
if(next.items.some(x=>x.extraction_status!=='COMPLETE'))errors.push('final incomplete status');

if(errors.length){
 console.error(JSON.stringify({pass:false,errors,added_occurrences:addedCount},null,2));
 process.exit(1);
}
fs.writeFileSync(outputPath,JSON.stringify(next,null,2)+'\n');
console.log(JSON.stringify({pass:true,output:outputPath,item_count:151,predecessor_occurrence_count:predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0),added_occurrences:addedCount,total_occurrences:next.items.reduce((n,x)=>n+x.occurrences.length,0),all_complete:true},null,2));
