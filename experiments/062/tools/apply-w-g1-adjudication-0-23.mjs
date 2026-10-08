import fs from 'node:fs';
const P=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_22.json','utf8'));
const A=JSON.parse(fs.readFileSync('experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_23.json','utf8'));
const O=JSON.parse(JSON.stringify(P));
O.items[O.items.findIndex(x=>x.census_id===A.replacement.census_id)]=A.replacement.replacement_item;
fs.writeFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_23.json',JSON.stringify(O,null,2)+'\n');
console.log(JSON.stringify({pass:true,bodies:O.items.length,occurrences:O.items.reduce((n,x)=>n+x.occurrences.length,0)},null,2));
