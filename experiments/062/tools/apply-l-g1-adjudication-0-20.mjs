import fs from 'node:fs';
const predecessorPath='experiments/062/L_EXTRACTION_RECONCILED_0_19.json';
const adjudicationPath='experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_20.json';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const outputPath='experiments/062/L_EXTRACTION_RECONCILED_0_20.json';
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='L'||predecessor.items.length!==151) fail('bad predecessor');
if(predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0)!==547) fail('predecessor count');
if(adjudication.corrections.length!==82) fail('correction count');
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const output=JSON.parse(JSON.stringify(predecessor)),map=new Map(output.items.map(x=>[x.census_id,x]));
for(const c of adjudication.corrections){
 const item=map.get(c.census_id),body=bodies.get(c.census_id);
 if(!item||!body) fail('missing '+c.census_id);
 if(c.action==='ADD_OCCURRENCE'||c.action==='REPLACE_OCCURRENCE'){
  const o=c.occurrence;
  if(!body.includes(o.source_span)||!o.source_span.includes(o.relation_span)) fail('span '+o.occurrence_id);
  for(const a of o.argument_spans||[])if(!o.source_span.includes(a))fail('arg '+o.occurrence_id+' :: '+a);
  if(c.action==='ADD_OCCURRENCE'){
   if(item.occurrences.some(x=>x.occurrence_id===o.occurrence_id))fail('collision '+o.occurrence_id);
   item.occurrences.push(o);
  }else{
   const i=item.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
   if(i<0||c.replace_id!==o.occurrence_id)fail('replace '+o.occurrence_id);
   item.occurrences[i]=o;
  }
 }else if(c.action==='REMOVE_OCCURRENCE'){
  const i=item.occurrences.findIndex(x=>x.occurrence_id===c.remove_id);
  if(i<0)fail('remove '+c.remove_id);
  item.occurrences.splice(i,1);
 }else fail('action '+c.action);
}
const count=output.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==578)fail('successor count '+count);
const ids=new Set();
for(const item of output.items){
 const body=bodies.get(item.census_id),prior=new Set(),sigs=new Map();
 for(const o of item.occurrences||[]){
  if(ids.has(o.occurrence_id))fail('dup '+o.occurrence_id);ids.add(o.occurrence_id);
  if(!body.includes(o.source_span)||!o.source_span.includes(o.relation_span))fail('final span '+o.occurrence_id);
  for(const a of o.argument_spans||[])if(!o.source_span.includes(a))fail('final arg '+o.occurrence_id+' :: '+a);
  for(const d of o.depends_on||[])if(!prior.has(d))fail('dep '+o.occurrence_id+' -> '+d);
  prior.add(o.occurrence_id);
  const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
  if(sigs.has(sig))fail('semantic dup '+sigs.get(sig)+' / '+o.occurrence_id);
  sigs.set(sig,o.occurrence_id);
 }
}
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,items:151,predecessor_occurrences:547,corrections:82,additions:40,replacements:33,removals:9,successor_occurrences:count},null,2));
