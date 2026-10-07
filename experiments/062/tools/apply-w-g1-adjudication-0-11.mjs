import fs from 'node:fs';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_10.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_11.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_11.json';
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='W'||predecessor.items.length!==84)fail('predecessor shape');
const predCount=predecessor.items.reduce((n,x)=>n+x.occurrences.length,0);
if(predCount!==306)fail('predecessor count '+predCount);
if(adjudication.predecessor_input!==predecessorPath)fail('adjudication predecessor');
if(adjudication.corrections.length!==12)fail('correction count');
const output=JSON.parse(JSON.stringify(predecessor)),by=new Map(output.items.map(x=>[x.census_id,x]));
let adds=0,replaces=0;
for(const c of adjudication.corrections){
 const it=by.get(c.census_id);if(!it)fail('missing '+c.census_id);
 if(c.action==='ADD_OCCURRENCE'){if(it.occurrences.some(o=>o.occurrence_id===c.occurrence.occurrence_id))fail('collision '+c.occurrence.occurrence_id);it.occurrences.push(c.occurrence);adds++;}
 else if(c.action==='REPLACE_OCCURRENCE'){const i=it.occurrences.findIndex(o=>o.occurrence_id===c.replace_id);if(i<0)fail('replace '+c.replace_id);if(c.occurrence.occurrence_id!==c.replace_id)fail('replace id');it.occurrences[i]=c.occurrence;replaces++;}
 else fail('action '+c.action);
}
const count=output.items.reduce((n,x)=>n+x.occurrences.length,0);
if(adds!==11||replaces!==1||count!==317)fail('counts '+JSON.stringify({adds,replaces,count}));
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,predecessor:predecessorPath,adjudication:adjudicationPath,output:outputPath,items:84,predecessor_occurrences:predCount,additions:adds,replacements:replaces,successor_occurrences:count},null,2));
