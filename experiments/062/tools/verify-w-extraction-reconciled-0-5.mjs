import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const p=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_4.json','utf8'));
const n=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_5.json','utf8'));
const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body])),e=[],changed=[];
if(n.track!=='W'||n.items.length!==84)e.push('track/items');
const pm=new Map(p.items.map(x=>[x.census_id,x]));
let count=0;
for(const it of n.items){const old=pm.get(it.census_id);if(!old)e.push('missing predecessor '+it.census_id);if(it.extraction_status!=='COMPLETE')e.push('incomplete '+it.census_id);if((old?.occurrences?.length||0)!==it.occurrences.length)e.push('occ count '+it.census_id);const body=bodies.get(it.census_id);
 for(let i=0;i<it.occurrences.length;i++){count++;const a=old.occurrences[i],b=it.occurrences[i];if(a.occurrence_id!==b.occurrence_id)e.push('order '+it.census_id);
  const ac={...a},bc={...b};delete ac.source_span;delete bc.source_span;if(JSON.stringify(ac)!==JSON.stringify(bc))e.push('semantic change '+b.occurrence_id);
  if(a.source_span!==b.source_span)changed.push(b.occurrence_id);
  if(!body.includes(b.source_span)||!b.source_span.includes(b.relation_span)||b.argument_spans.some(x=>!b.source_span.includes(x)))e.push('enclosure '+b.occurrence_id);
 }}
if(count!==177)e.push('count');if(JSON.stringify(changed)!==JSON.stringify(['W-SSC-119-O02']))e.push('changed set '+JSON.stringify(changed));
console.log(JSON.stringify({pass:!e.length,errors:e,item_count:n.items.length,occurrence_count:count,changed_source_spans:changed,all_complete:n.items.every(x=>x.extraction_status==='COMPLETE')},null,2));if(e.length)process.exitCode=1;
