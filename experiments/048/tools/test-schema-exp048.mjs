import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','048','hidden','ASSERTIONS.json'),'utf8'));
const schema=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','048','PUBLIC_OUTPUT_SCHEMA.json'),'utf8'));

if(!schema.field_contracts||typeof schema.field_contracts!=='object') throw new Error('field_contracts missing');

for(const id of assertions.required_case_ids){
  const expected=assertions.cases[id].answers;
  const contracts=schema.field_contracts[id];
  if(!contracts) throw new Error('missing contracts for '+id);
  const keys=Object.keys(expected).sort();
  if(JSON.stringify(Object.keys(contracts).sort())!==JSON.stringify(keys)) throw new Error('contract keys mismatch '+id);
  for(const [field,value] of Object.entries(expected)){
    const contract=contracts[field];
    if(typeof value==='boolean'){
      if(contract?.type!=='boolean') throw new Error(id+'.'+field+' must be boolean contract');
    }else if(typeof value==='string'){
      if(contract?.type!=='enum'||!Array.isArray(contract.values)||contract.values.length<2) throw new Error(id+'.'+field+' must publish multi-option enum');
      if(!contract.values.includes(value)) throw new Error(id+'.'+field+' enum omits hidden expected token');
    }else{
      throw new Error('unsupported hidden expected type '+id+'.'+field);
    }
  }
}
console.log('Experiment 048 public schema self-test PASS');
