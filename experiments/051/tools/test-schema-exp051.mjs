import fs from 'node:fs';
const a=JSON.parse(fs.readFileSync('experiments/051/hidden/ASSERTIONS.json','utf8'));
const s=JSON.parse(fs.readFileSync('experiments/051/PUBLIC_OUTPUT_SCHEMA.json','utf8'));
if(JSON.stringify(s.case_ids)!==JSON.stringify(a.required_case_ids))throw new Error('case id mismatch');
const fields=Object.keys(a.cases.H01.answers).sort();
if(JSON.stringify(s.answer_fields.H01.slice().sort())!==JSON.stringify(fields))throw new Error('fields mismatch');
for(const k of fields)if(s.field_contracts?.H01?.[k]?.type!=='boolean')throw new Error('missing boolean '+k);
console.log('Experiment 051 schema self-test PASS');
