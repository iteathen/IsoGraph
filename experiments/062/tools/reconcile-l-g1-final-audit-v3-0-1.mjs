import fs from 'node:fs';

const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const predecessor=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_4.json','utf8'));
const review=JSON.parse(fs.readFileSync('experiments/062/L_G1_FINAL_AUDIT_V3_ADJUDICATION_0_1.json','utf8'));
const output=process.argv[2]||'experiments/062/L_EXTRACTION_RECONCILED_0_5.json';
const L=corpus.items.filter(x=>x.track==='L'),bodyById=new Map(L.map(x=>[x.census_id,x.body])),prevById=new Map(predecessor.items.map(x=>[x.census_id,x])),reviewById=new Map(review.decisions.map(x=>[x.census_id,x]));
const errors=[];function maxN(os){let m=0;for(const o of os||[]){const q=String(o.occurrence_id||'').match(/-O(\d+)$/);if(q)m=Math.max(m,Number(q[1]));}return m;}
if(review.status!=='SOURCE_LOCAL_ADJUDICATION_COMPLETE_FOR_RUN_37520642413_ATTEMPT_1'||review.counts?.accepted_occurrence_additions!==6||review.counts?.accepted_dependency_metadata_repairs!==1)errors.push('review');
const next={track:'L',items:[]};let added=0,repaired=0;
for(const src of L){
 const id=src.census_id,pred=prevById.get(id),occ=JSON.parse(JSON.stringify(pred.occurrences||[])),row=reviewById.get(id);let n=maxN(occ);
 if(row){
  for(const rep of row.occurrence_metadata_repairs||[]){
   const o=occ.find(x=>x.occurrence_id===rep.occurrence_id);
   if(!o||JSON.stringify(o[rep.field])!==JSON.stringify(rep.old_value)){errors.push(rep.occurrence_id+': repair precondition');continue;}
   o[rep.field]=rep.new_value;repaired++;
  }
  for(const lead of row.lead_resolutions||[])for(const p of lead.proposed_occurrences||[]){
   const occurrence_id=id+'-O'+String(++n).padStart(2,'0');
   if(!src.body.includes(p.source_span)||!src.body.includes(p.relation_span)||!p.source_span.includes(p.relation_span))errors.push(occurrence_id+': span');
   if((p.argument_spans||[]).some(a=>!src.body.includes(a)))errors.push(occurrence_id+': arg');
   occ.push({occurrence_id,source_span:p.source_span,relation_span:p.relation_span,argument_spans:p.argument_spans,logical_force:p.logical_force,definition_status:p.definition_status,depends_on:p.depends_on||[],load_bearing_note:p.load_bearing_note});added++;
  }
 }
 next.items.push({census_id:id,occurrences:occ,extraction_status:'COMPLETE'});
}
const changed=[];
for(const item of next.items){
 const old=prevById.get(item.census_id),now=new Map(item.occurrences.map(o=>[o.occurrence_id,o])),pos=new Map(item.occurrences.map((o,i)=>[o.occurrence_id,i]));
 for(const o of old.occurrences||[]){
  const n=now.get(o.occurrence_id);if(!n){errors.push(o.occurrence_id+': missing predecessor');continue;}
  if(JSON.stringify(n)!==JSON.stringify(o)){
   changed.push(o.occurrence_id);
   if(o.occurrence_id!=='L-SSC-188-O03')errors.push(o.occurrence_id+': unauthorized predecessor change');
   const allowed=JSON.parse(JSON.stringify(o));allowed.depends_on=['L-SSC-188-O02'];if(JSON.stringify(allowed)!==JSON.stringify(n))errors.push(o.occurrence_id+': non-dependency mutation');
  }
 }
 for(let i=0;i<item.occurrences.length;i++)for(const d of item.occurrences[i].depends_on||[])if(!pos.has(d)||pos.get(d)>=i)errors.push(item.occurrences[i].occurrence_id+': dependency '+d);
}
const pc=predecessor.items.reduce((n,x)=>n+x.occurrences.length,0),tc=next.items.reduce((n,x)=>n+x.occurrences.length,0);
if(pc!==284||added!==6||repaired!==1||tc!==290||JSON.stringify(changed)!==JSON.stringify(['L-SSC-188-O03']))errors.push('counts/changes');
if(errors.length){console.error(JSON.stringify({pass:false,errors},null,2));process.exit(1);}
fs.writeFileSync(output,JSON.stringify(next,null,2)+'\n');
console.log(JSON.stringify({pass:true,output,item_count:151,predecessor_occurrence_count:pc,added_occurrence_count:added,dependency_metadata_repair_count:repaired,occurrence_count:tc,all_complete:true},null,2));
