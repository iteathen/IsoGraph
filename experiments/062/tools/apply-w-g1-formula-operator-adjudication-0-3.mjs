import fs from 'node:fs';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_19.json';
const adjudicationPath='experiments/062/W_G1_FORMULA_OPERATOR_ADJUDICATION_0_3.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_20.json';
const p=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const a=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const o=JSON.parse(JSON.stringify(p));
const by=new Map(o.items.map(x=>[x.census_id,x])),ids=new Set(o.items.flatMap(x=>x.occurrences.map(y=>y.occurrence_id)));
for(const c of a.additions||[]){
 if(c.action!=='ADD_OCCURRENCE')throw new Error('action '+c.action);
 const it=by.get(c.census_id); if(!it)throw new Error('item '+c.census_id);
 if(ids.has(c.occurrence.occurrence_id))throw new Error('collision '+c.occurrence.occurrence_id);
 it.occurrences.push(c.occurrence); ids.add(c.occurrence.occurrence_id);
}
fs.writeFileSync(outputPath,JSON.stringify(o,null,2)+'\n');
console.log(JSON.stringify({pass:true,predecessor_occurrences:p.items.reduce((n,x)=>n+x.occurrences.length,0),added:(a.additions||[]).length,successor_occurrences:o.items.reduce((n,x)=>n+x.occurrences.length,0)},null,2));
