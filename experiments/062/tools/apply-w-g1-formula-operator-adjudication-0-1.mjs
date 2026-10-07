import fs from 'node:fs';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_14.json';
const adjudicationPath='experiments/062/W_G1_FORMULA_OPERATOR_ADJUDICATION_0_1.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_15.json';
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='W'||predecessor.items.length!==84)fail('predecessor shape');
const predCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predCount!==331)fail('predecessor count '+predCount);
if(adjudication.predecessor_input!==predecessorPath)fail('adjudication predecessor');
if(adjudication.corrections.length!==53)fail('correction count '+adjudication.corrections.length);
const output=JSON.parse(JSON.stringify(predecessor)),by=new Map(output.items.map(x=>[x.census_id,x]));
for(const c of adjudication.corrections){
 if(c.action!=='ADD_OCCURRENCE')fail('unsupported action '+c.action);
 const it=by.get(c.census_id);if(!it)fail('missing item '+c.census_id);
 if(it.occurrences.some(o=>o.occurrence_id===c.occurrence.occurrence_id))fail('id collision '+c.occurrence.occurrence_id);
 it.occurrences.push(c.occurrence);
}
const count=output.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==384)fail('successor count '+count);
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,predecessor:predecessorPath,adjudication:adjudicationPath,output:outputPath,items:84,predecessor_occurrences:predCount,added_occurrences:53,successor_occurrences:count},null,2));
