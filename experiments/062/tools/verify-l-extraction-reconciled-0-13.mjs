import fs from 'node:fs';

const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_12.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_13.json','utf8'));
const rec=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILIATION_0_13.json','utf8'));

const expectedItems=corpus.items.filter(x=>x.track==='L');
const bodies=new Map(expectedItems.map(x=>[x.census_id,x.body]));
const prevItems=new Map(prev.items.map(x=>[x.census_id,x]));
const expectedAdd=new Set(rec.additions||[]);
const expectedRemove=new Set(rec.removals||[]);
const errors=[];
const globalIds=new Set();
let count=0;

if(next.track!=='L') errors.push('track mismatch');
if(next.items.length!==expectedItems.length) errors.push('item count '+next.items.length);
if(JSON.stringify(next.items.map(x=>x.census_id))!==JSON.stringify(expectedItems.map(x=>x.census_id))) errors.push('census ids/order mismatch');

for(const item of next.items){
  const body=bodies.get(item.census_id);
  const p=prevItems.get(item.census_id);
  if(!body) errors.push('unknown item '+item.census_id);
  if(!p) errors.push('missing predecessor item '+item.census_id);
  if(item.extraction_status!=='COMPLETE') errors.push('incomplete '+item.census_id);

  const priorIds=new Set();
  const nextById=new Map();
  for(const o of item.occurrences||[]){
    count++;
    if(globalIds.has(o.occurrence_id)) errors.push('duplicate '+o.occurrence_id);
    globalIds.add(o.occurrence_id);
    nextById.set(o.occurrence_id,o);

    if(typeof o.source_span!=='string'||!body?.includes(o.source_span)) errors.push('source span '+o.occurrence_id);
    if(typeof o.relation_span!=='string'||!o.source_span?.includes(o.relation_span)) errors.push('relation span '+o.occurrence_id);
    if(!Array.isArray(o.argument_spans)||o.argument_spans.some(s=>typeof s!=='string'||!o.source_span?.includes(s))) errors.push('argument enclosure '+o.occurrence_id);
    if(!Array.isArray(o.depends_on)) errors.push('depends_on '+o.occurrence_id);
    for(const d of o.depends_on||[]) if(!priorIds.has(d)) errors.push('dependency '+o.occurrence_id+' -> '+d);
    priorIds.add(o.occurrence_id);
  }

  const prevById=new Map((p?.occurrences||[]).map(o=>[o.occurrence_id,o]));
  for(const [id,o] of prevById){
    if(expectedRemove.has(id)){
      if(nextById.has(id)) errors.push('stale removal '+id);
      continue;
    }
    if(!nextById.has(id)) errors.push('unexpected removal '+id);
    else if(JSON.stringify(nextById.get(id))!==JSON.stringify(o)) errors.push('unexpected mutation '+id);
  }
  for(const [id] of nextById){
    if(!prevById.has(id) && !expectedAdd.has(id)) errors.push('unexpected addition '+id);
  }
}

for(const id of expectedAdd) if(!globalIds.has(id)) errors.push('missing addition '+id);
for(const id of expectedRemove) if(globalIds.has(id)) errors.push('removal still present '+id);

const prevCount=prev.items.reduce((n,x)=>n+(x.occurrences?.length||0),0);
if(prevCount!==rec.predecessor_occurrence_count) errors.push('predecessor count '+prevCount);
if(count!==rec.successor_occurrence_count) errors.push('successor count '+count);
if(count!==319) errors.push('expected 319');

console.log(JSON.stringify({
  pass:errors.length===0,
  errors,
  item_count:next.items.length,
  predecessor_occurrence_count:prevCount,
  occurrence_count:count,
  additions:[...expectedAdd],
  removals:[...expectedRemove],
  all_complete:next.items.every(x=>x.extraction_status==='COMPLETE')
},null,2));
if(errors.length) process.exitCode=1;
