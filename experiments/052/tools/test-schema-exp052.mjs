import fs from 'node:fs';
const a=JSON.parse(fs.readFileSync('experiments/052/hidden/ASSERTIONS.json','utf8'));
const s=JSON.parse(fs.readFileSync('experiments/052/PUBLIC_OUTPUT_SCHEMA.json','utf8'));
if(JSON.stringify(s.case_ids)!==JSON.stringify(a.required_case_ids))throw new Error('case ids mismatch');
for(const id of a.required_case_ids){
 const fields=Object.keys(a.cases[id].answers).sort();
 if(JSON.stringify(s.answer_fields[id].slice().sort())!==JSON.stringify(fields))throw new Error('fields '+id);
 for(const k of fields)if(s.field_contracts?.[id]?.[k]?.type!=='boolean')throw new Error('contract '+id+'.'+k);
}
if(JSON.stringify(s.module_assessment.fields.slice().sort())!==JSON.stringify(Object.keys(a.required_module_assessment).sort()))throw new Error('module fields');
console.log('Experiment 052 schema self-test PASS');
