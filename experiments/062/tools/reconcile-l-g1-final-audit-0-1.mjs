import fs from 'node:fs';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/L_EXTRACTION_RECONCILED_0_2.json';
const reviewPath='experiments/062/L_G1_FINAL_AUDIT_ADJUDICATION_0_1.json';
const outputPath=process.argv[2]||'experiments/062/L_EXTRACTION_RECONCILED_0_3.json';

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const review=JSON.parse(fs.readFileSync(reviewPath,'utf8'));
const L=corpus.items.filter(x=>x.track==='L');
const ids=L.map(x=>x.census_id);
const bodyById=new Map(L.map(x=>[x.census_id,x.body]));
const predById=new Map(predecessor.items.map(x=>[x.census_id,x]));
const reviewById=new Map(review.decisions.map(x=>[x.census_id,x]));
const allowedForce=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDef=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA|W-SSC-\d+)\b/i;
const errors=[];

if(predecessor.track!=='L') errors.push('predecessor track');
if(predecessor.items.length!==151||JSON.stringify(predecessor.items.map(x=>x.census_id))!==JSON.stringify(ids)) errors.push('predecessor corpus/order');
if(review.status!=='SOURCE_LOCAL_ADJUDICATION_COMPLETE_FOR_RUN_37518708240_ATTEMPT_1') errors.push('review status');
if(review.counts?.proposed_occurrences!==5) errors.push('review proposed count');

function maxOccurrenceNumber(occurrences){
 let max=0;
 for(const o of occurrences||[]){
  const m=String(o.occurrence_id||'').match(/-O(\d+)$/);
  if(m) max=Math.max(max,Number(m[1]));
 }
 return max;
}

const next={track:'L',items:[]};
let added=0;
for(const id of ids){
 const pred=predById.get(id);
 const occurrences=JSON.parse(JSON.stringify(pred.occurrences||[]));
 const existingIds=new Set(occurrences.map(x=>x.occurrence_id));
 const row=reviewById.get(id);
 if(row){
  const accepted=(row.lead_resolutions||[]).flatMap(l=>l.decision.startsWith('ACCEPT_')?(l.proposed_occurrences||[]):[]);
  let n=maxOccurrenceNumber(occurrences);
  const candidateMap=new Map();
  for(const o of accepted){
   if(typeof o.candidate_id!=='string'||candidateMap.has(o.candidate_id)) errors.push(id+': bad/duplicate candidate '+o.candidate_id);
   candidateMap.set(o.candidate_id,id+'-O'+String(++n).padStart(2,'0'));
  }
  for(const o of accepted){
   const finalId=candidateMap.get(o.candidate_id);
   const body=bodyById.get(id);
   if(!body.includes(o.source_span)) errors.push(finalId+': source span');
   if(!body.includes(o.relation_span)||!o.source_span.includes(o.relation_span)) errors.push(finalId+': relation span');
   if(!Array.isArray(o.argument_spans)||o.argument_spans.some(a=>!body.includes(a))) errors.push(finalId+': argument span');
   if(!allowedForce.has(o.logical_force)) errors.push(finalId+': force');
   if(!allowedDef.has(o.definition_status)) errors.push(finalId+': definition status');
   const deps=(o.depends_on||[]).map(d=>candidateMap.get(d)||d);
   for(const d of deps) if(!existingIds.has(d)&&![...candidateMap.values()].includes(d)) errors.push(finalId+': unresolved dependency '+d);
   if(forbidden.test(JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:deps,load_bearing_note:o.load_bearing_note}))) errors.push(finalId+': forbidden metadata');
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
   existingIds.add(finalId); added++;
  }
 }
 next.items.push({census_id:id,occurrences,extraction_status:'COMPLETE'});
}

for(const item of next.items){
 const pred=predById.get(item.census_id);
 const now=new Map(item.occurrences.map(x=>[x.occurrence_id,x]));
 const positions=new Map(item.occurrences.map((x,i)=>[x.occurrence_id,i]));
 for(const old of pred.occurrences||[]){
  if(!now.has(old.occurrence_id)||JSON.stringify(now.get(old.occurrence_id))!==JSON.stringify(old)) errors.push(old.occurrence_id+': predecessor conservation');
 }
 for(let i=0;i<item.occurrences.length;i++) for(const d of item.occurrences[i].depends_on||[]) if(!positions.has(d)||positions.get(d)>=i) errors.push(item.occurrences[i].occurrence_id+': dependency order '+d);
}
const predecessorCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
const total=next.items.reduce((n,x)=>n+x.occurrences.length,0);
if(added!==5||total-predecessorCount!==5) errors.push('addition count');
if(errors.length){console.error(JSON.stringify({pass:false,errors},null,2));process.exit(1);}
fs.writeFileSync(outputPath,JSON.stringify(next,null,2)+'\n');
console.log(JSON.stringify({pass:true,output:outputPath,item_count:151,predecessor_occurrence_count:predecessorCount,added_occurrence_count:added,occurrence_count:total,all_complete:true},null,2));
