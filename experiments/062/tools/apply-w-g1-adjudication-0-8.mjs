import fs from 'node:fs';

const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_7.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_8.json';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_8.json';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const fail=m=>{throw new Error(m)};

if(predecessor.track!=='W') fail('predecessor track must be W');
if(predecessor.items.length!==84) fail('predecessor must contain 84 W bodies');
const predecessorCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predecessorCount!==219) fail('predecessor must contain 219 occurrences');
if(adjudication.predecessor_input!==predecessorPath) fail('adjudication predecessor mismatch');
if(adjudication.corrections.length!==34) fail('expected 34 corrections');

const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const output=JSON.parse(JSON.stringify(predecessor));
const outputItems=new Map(output.items.map(x=>[x.census_id,x]));
const globalIds=new Set(output.items.flatMap(x=>(x.occurrences||[]).map(o=>o.occurrence_id)));
let additions=0,replacements=0;

for(const c of adjudication.corrections){
  const item=outputItems.get(c.census_id);
  const body=bodies.get(c.census_id);
  if(!item||typeof body!=='string') fail('missing item '+c.census_id);
  const o=c.occurrence;
  if(!body.includes(o.source_span)) fail('source span mismatch '+o.occurrence_id);
  if(!o.source_span.includes(o.relation_span)) fail('relation span mismatch '+o.occurrence_id);
  for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) fail('argument span mismatch '+o.occurrence_id+' :: '+a);

  if(c.action==='ADD_OCCURRENCE'){
    if(globalIds.has(o.occurrence_id)) fail('occurrence id collision '+o.occurrence_id);
    item.occurrences.push(o);
    globalIds.add(o.occurrence_id);
    additions++;
  }else if(c.action==='REPLACE_OCCURRENCE'){
    const i=item.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
    if(i<0) fail('replacement target missing '+c.replace_id);
    if(o.occurrence_id!==c.replace_id) fail('replacement changes occurrence id '+c.replace_id);
    item.occurrences[i]=o;
    replacements++;
  }else{
    fail('unsupported action '+c.action);
  }
}

const count=output.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(additions!==33||replacements!==1) fail('action counts '+additions+'/'+replacements);
if(count!==252) fail('successor occurrence count '+count);

for(const item of output.items){
  const body=bodies.get(item.census_id);
  const prior=new Set();
  const signatures=new Map();
  for(const o of item.occurrences||[]){
    if(!body.includes(o.source_span)) fail('source span not in body '+o.occurrence_id);
    if(!o.source_span.includes(o.relation_span)) fail('relation not enclosed '+o.occurrence_id);
    for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) fail('argument not enclosed '+o.occurrence_id+' :: '+a);
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
  additions,
  replacements,
  successor_occurrences:count,
  affected_bodies:new Set(adjudication.corrections.map(x=>x.census_id)).size
},null,2));
