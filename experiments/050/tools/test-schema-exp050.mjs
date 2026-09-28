import fs from 'node:fs';
const a=JSON.parse(fs.readFileSync('experiments/050/hidden/ASSERTIONS.json','utf8'));
const s=JSON.parse(fs.readFileSync('experiments/050/PUBLIC_OUTPUT_SCHEMA.json','utf8'));
if(JSON.stringify(s.case_ids)!==JSON.stringify(a.required_case_ids)) throw new Error('case ids mismatch');
for(const id of a.required_case_ids){
  const expected=a.cases[id].answers;
  const fields=s.answer_fields[id];
  if(JSON.stringify([...fields].sort())!==JSON.stringify(Object.keys(expected).sort())) throw new Error('field names mismatch '+id);
  for(const k of Object.keys(expected)){
    if(s.field_contracts?.[id]?.[k]?.type!=='boolean') throw new Error('nonboolean/missing contract '+id+'.'+k);
  }
}
console.log('Experiment 050 public schema self-test PASS');
