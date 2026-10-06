import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const p=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_11.json','utf8'));
const n=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_12.json','utf8'));
const a=JSON.parse(fs.readFileSync('experiments/062/G1_SOURCE_SPAN_ENCLOSURE_AUDIT_0_1.json','utf8'));
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body])),e=[],changed=[];
if(n.track!=='L'||n.items.length!==151)e.push('track/items');
const pm=new Map(p.items.map(x=>[x.census_id,x]));
let count=0;
for(const it of n.items){
 const old=pm.get(it.census_id);
 if(!old)e.push('missing predecessor '+it.census_id);
 if(it.extraction_status!=='COMPLETE')e.push('incomplete '+it.census_id);
 if((old?.occurrences?.length||0)!==it.occurrences.length)e.push('occ count '+it.census_id);
 const body=bodies.get(it.census_id);
 for(let i=0;i<it.occurrences.length;i++){
  count++;
  const x=old.occurrences[i],y=it.occurrences[i];
  if(x.occurrence_id!==y.occurrence_id)e.push('order '+it.census_id);
  const xc={...x},yc={...y};delete xc.source_span;delete yc.source_span;
  if(JSON.stringify(xc)!==JSON.stringify(yc))e.push('semantic change '+y.occurrence_id);
  if(x.source_span!==y.source_span)changed.push(y.occurrence_id);
  if(!body.includes(y.source_span)||!y.source_span.includes(y.relation_span)||y.argument_spans.some(s=>!y.source_span.includes(s)))e.push('enclosure '+y.occurrence_id);
 }
}
const expectedChanged=a.repairs.filter(x=>x.track==='L').map(x=>x.occurrence_id);
if(count!==317)e.push('count');
if(JSON.stringify(changed)!==JSON.stringify(expectedChanged))e.push('changed set '+JSON.stringify(changed));
console.log(JSON.stringify({pass:!e.length,errors:e,item_count:n.items.length,occurrence_count:count,changed_source_spans:changed,all_complete:n.items.every(x=>x.extraction_status==='COMPLETE')},null,2));
if(e.length)process.exitCode=1;
