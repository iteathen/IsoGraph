import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const p=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_12.json','utf8'));
const n=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_13.json','utf8'));
const a=JSON.parse(fs.readFileSync('experiments/062/L_G1_FINAL_AUDIT_V11_ADJUDICATION_0_1.json','utf8'));
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body])),e=[],ids=new Set(),count=0;
if(n.track!=='L'||n.items.length!==151)e.push('track/items');
const pm=new Map(p.items.map(x=>[x.census_id,x]));
for(const it of n.items){
 if(it.extraction_status!=='COMPLETE')e.push('incomplete '+it.census_id);
 const body=bodies.get(it.census_id);
 for(let i=0;i<it.occurrences.length;i++){
  count++;
  const o=it.occurrences[i];
  if(ids.has(o.occurrence_id))e.push('duplicate '+o.occurrence_id);ids.add(o.occurrence_id);
  if(!body.includes(o.source_span)||!o.source_span.includes(o.relation_span)||o.argument_spans.some(s=>!o.source_span.includes(s)))e.push('enclosure '+o.occurrence_id);
  const prior=new Set(it.occurrences.slice(0,i).map(x=>x.occurrence_id));
  for(const d of o.depends_on||[])if(!prior.has(d))e.push('dependency '+o.occurrence_id+' -> '+d);
 }
 if(!pm.has(it.census_id))e.push('predecessor item '+it.census_id);
}
const additions=['L-SSC-039-O03','L-SSC-039-O04','L-SSC-039-O05','L-SSC-039-O06'];
const removals=['L-SSC-188-O10','L-SSC-188-O11'];
for(const id of additions)if(!ids.has(id))e.push('missing addition '+id);
for(const id of removals)if(ids.has(id))e.push('stale removal '+id);
if(count!==319)e.push('count '+count);
if(a.successor_occurrence_count!==319)e.push('adjudication count');
console.log(JSON.stringify({pass:!e.length,errors:e,item_count:n.items.length,occurrence_count:count,additions,removals,all_complete:n.items.every(x=>x.extraction_status==='COMPLETE')},null,2));
if(e.length)process.exitCode=1;
