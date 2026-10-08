import fs from 'node:fs';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_17.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_18.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='W'||predecessor.items.length!==84)fail('predecessor shape');
const pc=predecessor.items.reduce((n,x)=>n+x.occurrences.length,0);if(pc!==418)fail('predecessor count '+pc);
if(adjudication.predecessor_input!==predecessorPath)fail('adjudication predecessor');
if(adjudication.corrections.length!==7)fail('correction count');
const output=JSON.parse(JSON.stringify(predecessor)),by=new Map(output.items.map(x=>[x.census_id,x])),ids=new Set(output.items.flatMap(x=>x.occurrences.map(o=>o.occurrence_id)));
for(const c of adjudication.corrections){if(c.action!=='ADD_OCCURRENCE')fail('action '+c.action);const it=by.get(c.census_id);if(!it)fail('item '+c.census_id);if(ids.has(c.occurrence.occurrence_id))fail('collision '+c.occurrence.occurrence_id);it.occurrences.push(c.occurrence);ids.add(c.occurrence.occurrence_id);}
const sc=output.items.reduce((n,x)=>n+x.occurrences.length,0);if(sc!==425)fail('successor count '+sc);
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,predecessor:predecessorPath,adjudication:adjudicationPath,output:outputPath,item_count:84,predecessor_occurrence_count:pc,added_occurrences:7,successor_occurrence_count:sc},null,2));