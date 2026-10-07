import fs from 'node:fs';

const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_6.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_7.json';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_7.json';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const fail=(m)=>{throw new Error(m)};

if(predecessor.track!=='W') fail('predecessor track must be W');
if(predecessor.items.length!==84) fail('predecessor must contain 84 W bodies');
const predecessorCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predecessorCount!==210) fail('predecessor must contain 210 occurrences');
if(adjudication.predecessor_input!==predecessorPath) fail('adjudication predecessor mismatch');
if(adjudication.corrections.length!==9) fail('expected 9 adjudicated additions');

const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const byItem=new Map();
for(const c of adjudication.corrections){
  if(c.action!=='ADD_OCCURRENCE') fail('unsupported adjudication action '+c.action);
  if(!byItem.has(c.census_id)) byItem.set(c.census_id,[]);
  byItem.get(c.census_id).push(c.occurrence);
}

const output=structuredClone(predecessor);
const globalIds=new Set(output.items.flatMap(x=>(x.occurrences||[]).map(o=>o.occurrence_id)));
for(const item of output.items){
  const body=bodies.get(item.census_id);
  if(typeof body!=='string') fail('missing frozen body '+item.census_id);
  for(const occurrence of byItem.get(item.census_id)||[]){
    if(globalIds.has(occurrence.occurrence_id)) fail('occurrence id collision '+occurrence.occurrence_id);
    if(!body.includes(occurrence.source_span)) fail('source span mismatch '+occurrence.occurrence_id);
    if(!occurrence.source_span.includes(occurrence.relation_span)) fail('relation not enclosed '+occurrence.occurrence_id);
    for(const arg of occurrence.argument_spans||[]) if(!occurrence.source_span.includes(arg)) fail('argument not enclosed '+occurrence.occurrence_id+' :: '+arg);
    item.occurrences.push(occurrence);
    globalIds.add(occurrence.occurrence_id);
  }
}

const count=output.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==219) fail('successor occurrence count must be 219, got '+count);

for(const item of output.items){
  const prior=new Set();
  const signatures=new Map();
  for(const o of item.occurrences||[]){
    for(const d of o.depends_on||[]) if(!prior.has(d)) fail('dependency not prior/same-item '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(signatures.has(sig)) fail('exact duplicate semantic occurrence '+signatures.get(sig)+' / '+o.occurrence_id);
    signatures.set(sig,o.occurrence_id);
  }
}

fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({
  pass:true,
  predecessor:predecessorPath,
  adjudication:adjudicationPath,
  output:outputPath,
  items:output.items.length,
  predecessor_occurrences:predecessorCount,
  added_occurrences:adjudication.corrections.length,
  successor_occurrences:count,
  affected_bodies:byItem.size
},null,2));
