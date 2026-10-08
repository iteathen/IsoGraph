import fs from 'node:fs';
const predecessorPath='experiments/062/L_EXTRACTION_RECONCILED_0_18.json';
const adjudicationPath='experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_19.json';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const outputPath='experiments/062/L_EXTRACTION_RECONCILED_0_19.json';
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='L'||predecessor.items.length!==151) fail('bad predecessor');
const predecessorCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predecessorCount!==461) fail('predecessor count '+predecessorCount);
if(adjudication.predecessor_input!==predecessorPath) fail('adjudication predecessor');
if(adjudication.corrections.length!==105) fail('correction count');
if(adjudication.corrections.filter(x=>x.action==='ADD_OCCURRENCE').length!==86) fail('addition count');
if(adjudication.corrections.filter(x=>x.action==='REPLACE_OCCURRENCE').length!==19) fail('replacement count');
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const output=JSON.parse(JSON.stringify(predecessor)), itemMap=new Map(output.items.map(x=>[x.census_id,x]));
for(const c of adjudication.corrections){
 const item=itemMap.get(c.census_id),body=bodies.get(c.census_id),o=c.occurrence;
 if(!item||!body) fail('missing '+c.census_id);
 if(!body.includes(o.source_span)||!o.source_span.includes(o.relation_span)) fail('span '+o.occurrence_id);
 for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) fail('arg '+o.occurrence_id+' :: '+a);
 if(c.action==='ADD_OCCURRENCE'){
  if(item.occurrences.some(x=>x.occurrence_id===o.occurrence_id)) fail('collision '+o.occurrence_id);
  item.occurrences.push(o);
 }else if(c.action==='REPLACE_OCCURRENCE'){
  const i=item.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
  if(i<0||c.replace_id!==o.occurrence_id) fail('replace '+o.occurrence_id);
  item.occurrences[i]=o;
 }else fail('action '+c.action);
}
const count=output.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==547) fail('successor count '+count);
const ids=new Set();
for(const item of output.items){
 const body=bodies.get(item.census_id),prior=new Set(),sigs=new Map();
 if(item.extraction_status!=='COMPLETE') fail('incomplete '+item.census_id);
 for(const o of item.occurrences||[]){
  if(ids.has(o.occurrence_id)) fail('duplicate '+o.occurrence_id); ids.add(o.occurrence_id);
  if(!body.includes(o.source_span)||!o.source_span.includes(o.relation_span)) fail('final span '+o.occurrence_id);
  for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) fail('final arg '+o.occurrence_id+' :: '+a);
  for(const d of o.depends_on||[]) if(!prior.has(d)) fail('dependency '+o.occurrence_id+' -> '+d);
  prior.add(o.occurrence_id);
  const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
  if(sigs.has(sig)) fail('semantic duplicate '+sigs.get(sig)+' / '+o.occurrence_id);
  sigs.set(sig,o.occurrence_id);
 }
}
const l130=itemMap.get('L-SSC-130');
if(l130.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O01')?.argument_spans?.[0]!=='individual generalized reflections') fail('L130 individual scope');
if(!l130.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O03')?.source_span?.includes('even compositions')) fail('L130 even composition');
if(l130.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O06')?.argument_spans?.[1]!=='T') fail('L130 T preservation');
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,items:151,predecessor_occurrences:predecessorCount,additions:86,replacements:19,successor_occurrences:count,affected_bodies:new Set(adjudication.corrections.map(x=>x.census_id)).size},null,2));
