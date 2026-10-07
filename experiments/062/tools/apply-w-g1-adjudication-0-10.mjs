import fs from 'node:fs';

const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_9.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_10.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_10.json';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='W'||predecessor.items.length!==84)fail('predecessor shape');
const predCount=predecessor.items.reduce((n,x)=>n+x.occurrences.length,0);
if(predCount!==281)fail('predecessor occurrence count '+predCount);
if(adjudication.predecessor_input!==predecessorPath)fail('adjudication predecessor mismatch');
if(adjudication.corrections.length!==25)fail('expected 25 corrections');

const output=structuredClone(predecessor);
const byItem=new Map(output.items.map(x=>[x.census_id,x]));
const ids=new Set(output.items.flatMap(x=>x.occurrences.map(o=>o.occurrence_id)));
for(const c of adjudication.corrections){
  if(c.action!=='ADD_OCCURRENCE')fail('unsupported '+c.action);
  const it=byItem.get(c.census_id); if(!it)fail('missing item '+c.census_id);
  if(ids.has(c.occurrence.occurrence_id))fail('id collision '+c.occurrence.occurrence_id);
  it.occurrences.push(c.occurrence); ids.add(c.occurrence.occurrence_id);
}
const count=output.items.reduce((n,x)=>n+x.occurrences.length,0);
if(count!==306)fail('successor occurrence count '+count);
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,predecessor:predecessorPath,adjudication:adjudicationPath,output:outputPath,items:84,predecessor_occurrences:281,added_occurrences:25,successor_occurrences:306},null,2));
