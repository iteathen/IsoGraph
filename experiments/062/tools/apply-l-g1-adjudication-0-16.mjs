import fs from 'node:fs';

const predecessorPath='experiments/062/L_EXTRACTION_RECONCILED_0_15.json';
const adjudicationPath='experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_16.json';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const outputPath='experiments/062/L_EXTRACTION_RECONCILED_0_16.json';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const fail=(m)=>{throw new Error(m)};

if(predecessor.track!=='L') fail('predecessor track must be L');
if(predecessor.items.length!==151) fail('predecessor must contain 151 L bodies');
const predecessorCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predecessorCount!==411) fail('predecessor must contain 411 occurrences');
if(adjudication.predecessor_input!==predecessorPath) fail('adjudication predecessor mismatch');
if(adjudication.corrections.length!==15) fail('expected 15 adjudicated corrections');
if(adjudication.corrections.some(x=>x.action!=='ADD_OCCURRENCE')) fail('0.16 permits additions only');

const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const output=JSON.parse(JSON.stringify(predecessor));
const itemMap=new Map(output.items.map(x=>[x.census_id,x]));

for(const correction of adjudication.corrections){
  const item=itemMap.get(correction.census_id);
  const body=bodies.get(correction.census_id);
  const o=correction.occurrence;
  if(!item||typeof body!=='string') fail('missing item/body '+correction.census_id);
  if(!body.includes(o.source_span)) fail('source span mismatch '+o.occurrence_id);
  if(!o.source_span.includes(o.relation_span)) fail('relation not enclosed '+o.occurrence_id);
  for(const arg of o.argument_spans||[]) if(!o.source_span.includes(arg)) fail('argument not enclosed '+o.occurrence_id+' :: '+arg);
  if(item.occurrences.some(x=>x.occurrence_id===o.occurrence_id)) fail('add id collision '+o.occurrence_id);
  item.occurrences.push(o);
}

const count=output.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==426) fail('successor occurrence count must be 426, got '+count);
const globalIds=new Set();
for(const item of output.items){
  const body=bodies.get(item.census_id),prior=new Set(),signatures=new Map();
  for(const o of item.occurrences||[]){
    if(globalIds.has(o.occurrence_id)) fail('global duplicate occurrence id '+o.occurrence_id);
    globalIds.add(o.occurrence_id);
    if(!body.includes(o.source_span)) fail('final source span mismatch '+o.occurrence_id);
    if(!o.source_span.includes(o.relation_span)) fail('final relation not enclosed '+o.occurrence_id);
    for(const arg of o.argument_spans||[]) if(!o.source_span.includes(arg)) fail('final argument not enclosed '+o.occurrence_id+' :: '+arg);
    for(const d of o.depends_on||[]) if(!prior.has(d)) fail('dependency not prior/same-item '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(signatures.has(sig)) fail('exact duplicate semantic occurrence '+signatures.get(sig)+' / '+o.occurrence_id);
    signatures.set(sig,o.occurrence_id);
  }
}
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,items:output.items.length,predecessor_occurrences:predecessorCount,additions:15,successor_occurrences:count,affected_bodies:new Set(adjudication.corrections.map(x=>x.census_id)).size},null,2));
