import fs from 'node:fs';
const predecessor=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_22.json','utf8'));
const adj=JSON.parse(fs.readFileSync('experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_23.json','utf8'));
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const outPath='experiments/062/L_EXTRACTION_RECONCILED_0_23.json';
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='L'||predecessor.items.length!==151)fail('bad predecessor');
if(predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0)!==733)fail('predecessor count');
if(adj.corrections.length!==61)fail('correction count');
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const out=JSON.parse(JSON.stringify(predecessor)),map=new Map(out.items.map(x=>[x.census_id,x]));
for(const c of adj.corrections){
 const item=map.get(c.census_id),body=bodies.get(c.census_id),o=c.occurrence;
 if(!item||!body)fail('missing '+c.census_id);
 if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))fail('source '+o.occurrence_id);
 if(!o.source_span.includes(o.relation_span))fail('relation '+o.occurrence_id);
 for(const a of o.argument_spans||[])if(!o.source_span.includes(a))fail('arg '+o.occurrence_id+' :: '+a);
 if(c.action==='ADD_OCCURRENCE'){
  const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans]);
  if(item.occurrences.some(x=>JSON.stringify([x.source_span,x.relation_span,x.argument_spans])===sig))fail('semantic duplicate '+o.occurrence_id);
  if(item.occurrences.some(x=>x.occurrence_id===o.occurrence_id))fail('id collision '+o.occurrence_id);
  item.occurrences.push(o);
 }else if(c.action==='REPLACE_OCCURRENCE'){
  const i=item.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
  if(i<0||c.replace_id!==o.occurrence_id)fail('replace '+o.occurrence_id);
  item.occurrences[i]=o;
 }else fail('action '+c.action);
}
const count=out.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==790)fail('successor count '+count);
const ids=new Set();
for(const item of out.items){
 const body=bodies.get(item.census_id),prior=new Set(),sigs=new Map();
 for(const o of item.occurrences||[]){
  if(ids.has(o.occurrence_id))fail('dup '+o.occurrence_id);ids.add(o.occurrence_id);
  if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))fail('final source '+o.occurrence_id);
  if(!o.source_span.includes(o.relation_span))fail('final relation '+o.occurrence_id);
  for(const a of o.argument_spans||[])if(!o.source_span.includes(a))fail('final arg '+o.occurrence_id+' :: '+a);
  for(const d of o.depends_on||[])if(!prior.has(d))fail('dep '+o.occurrence_id+' -> '+d);
  prior.add(o.occurrence_id);
  const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
  if(sigs.has(sig))fail('exact dup '+sigs.get(sig)+' / '+o.occurrence_id);
  sigs.set(sig,o.occurrence_id);
 }
}
fs.writeFileSync(outPath,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({pass:true,items:151,predecessor_occurrences:733,corrections:61,additions:57,replacements:4,successor_occurrences:count},null,2));
