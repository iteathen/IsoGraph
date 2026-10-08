import fs from 'node:fs';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_19.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_19.json';
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='W'||predecessor.items.length!==84)fail('predecessor shape');
const output=JSON.parse(JSON.stringify(predecessor));
for(const c of adjudication.replacements||[]){
  if(c.action!=='REPLACE_ITEM')fail('action '+c.action);
  const i=output.items.findIndex(x=>x.census_id===c.census_id);
  if(i<0)fail('item '+c.census_id);
  output.items[i]=c.replacement_item;
}
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
const pc=predecessor.items.reduce((n,x)=>n+x.occurrences.length,0);
const sc=output.items.reduce((n,x)=>n+x.occurrences.length,0);
console.log(JSON.stringify({pass:true,predecessor:predecessorPath,adjudication:adjudicationPath,output:outputPath,item_count:output.items.length,predecessor_occurrences:pc,successor_occurrences:sc,affected_bodies:(adjudication.replacements||[]).map(x=>x.census_id)},null,2));
