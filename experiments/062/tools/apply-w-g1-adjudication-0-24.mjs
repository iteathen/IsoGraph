import fs from 'node:fs';
const P=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_23.json','utf8'));
const A=JSON.parse(fs.readFileSync('experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_24.json','utf8'));
const O=JSON.parse(JSON.stringify(P));
const i=O.items.findIndex(x=>x.census_id==='W-SSC-097');
if(i<0)throw new Error('missing W-SSC-097');
O.items[i]=A.replacement_item;
fs.writeFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_24.json',JSON.stringify(O,null,2)+'\n');
