import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_11.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_12.json','utf8'));
const audit=JSON.parse(fs.readFileSync('experiments/062/G1_SOURCE_SPAN_ENCLOSURE_AUDIT_0_1.json','utf8'));
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const repairs=new Map((audit.repairs||[]).filter(x=>x.track==='L').map(x=>[x.occurrence_id,x]));
const errors=[],changed=[];
if(next.track!=='L'||next.items.length!==151)errors.push('track/items');
const prevItems=new Map(prev.items.map(x=>[x.census_id,x]));
let count=0;
for(const item of next.items){
  const p=prevItems.get(item.census_id);
  if(!p)errors.push('missing predecessor '+item.census_id);
  if(item.extraction_status!=='COMPLETE')errors.push('incomplete '+item.census_id);
  if((p?.occurrences?.length||0)!==item.occurrences.length)errors.push('occurrence count '+item.census_id);
  const body=bodies.get(item.census_id);
  for(let i=0;i<item.occurrences.length;i++){
    count++;
    const a=p?.occurrences?.[i],b=item.occurrences[i];
    if(!a||a.occurrence_id!==b.occurrence_id)errors.push('order '+item.census_id+' '+i);
    const ac={...a},bc={...b}; delete ac.source_span; delete bc.source_span;
    if(JSON.stringify(ac)!==JSON.stringify(bc))errors.push('semantic change '+b.occurrence_id);
    const repair=repairs.get(b.occurrence_id);
    if(a?.source_span!==b.source_span){
      changed.push(b.occurrence_id);
      if(!repair)errors.push('unregistered source-span change '+b.occurrence_id);
      else if(b.source_span!==repair.new_source_span||a.source_span!==repair.old_source_span)errors.push('repair mismatch '+b.occurrence_id);
    }else if(repair)errors.push('expected repair missing '+b.occurrence_id);
    if(!body?.includes(b.source_span)||!b.source_span.includes(b.relation_span)||b.argument_spans.some(x=>!b.source_span.includes(x)))errors.push('enclosure '+b.occurrence_id);
    for(const dep of b.depends_on||[]){
      const j=item.occurrences.findIndex(x=>x.occurrence_id===dep);
      if(j<0||j>=i)errors.push('dependency '+b.occurrence_id+' -> '+dep);
    }
  }
}
const expected=[...repairs.keys()];
if(count!==317)errors.push('total count');
if(JSON.stringify(changed)!==JSON.stringify(expected))errors.push('changed set');
console.log(JSON.stringify({pass:!errors.length,errors,item_count:next.items.length,occurrence_count:count,source_span_repairs:changed.length,changed_source_spans:changed,all_complete:next.items.every(x=>x.extraction_status==='COMPLETE')},null,2));
if(errors.length)process.exitCode=1;
