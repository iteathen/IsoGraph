import fs from 'node:fs';

const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_15.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_16.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_16.json';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='W'||predecessor.items.length!==84)fail('predecessor shape');
const predCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predCount!==384)fail('predecessor occurrence count '+predCount);
if(adjudication.predecessor_input!==predecessorPath)fail('adjudication predecessor mismatch');
if((adjudication.corrections||[]).length!==26)fail('expected 26 corrections');

const output=JSON.parse(JSON.stringify(predecessor));
const byItem=new Map(output.items.map(x=>[x.census_id,x]));
const ids=new Set(output.items.flatMap(x=>(x.occurrences||[]).map(o=>o.occurrence_id)));
for(const c of adjudication.corrections){
  if(c.action!=='ADD_OCCURRENCE')fail('unsupported action '+c.action);
  const item=byItem.get(c.census_id); if(!item)fail('missing item '+c.census_id);
  if(ids.has(c.occurrence.occurrence_id))fail('occurrence id collision '+c.occurrence.occurrence_id);
  item.occurrences.push(c.occurrence);
  ids.add(c.occurrence.occurrence_id);
}
const count=output.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==410)fail('successor occurrence count '+count);
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({
  pass:true,predecessor:predecessorPath,adjudication:adjudicationPath,output:outputPath,
  item_count:84,predecessor_occurrence_count:384,added_occurrences:26,successor_occurrence_count:410
},null,2));
