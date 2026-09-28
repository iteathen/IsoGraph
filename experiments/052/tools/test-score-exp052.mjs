import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp052');
const a=JSON.parse(fs.readFileSync('experiments/052/hidden/ASSERTIONS.json','utf8'));
function perfect(){return {cases:a.required_case_ids.map(id=>({case_id:id,answers:structuredClone(a.cases[id].answers),reason:'Synthetic full-stack integration explanation.',authority_used:['qualified integrated stack']})),module_assessment:{...a.required_module_assessment},self_audit:{...a.required_self_audit}};}
function run(r){fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(r,null,2)+'\n');return spawnSync(process.execPath,['experiments/052/tools/score-exp052.mjs'],{cwd:ROOT,encoding:'utf8'});}
let x=run(perfect());if(x.status!==0)throw new Error('perfect failed '+x.stdout+x.stderr);
let r=perfect();r.cases.find(x=>x.case_id==='I02').answers.select_realization=true;x=run(r);if(x.status===0)throw new Error('QU overreach not rejected');
r=perfect();r.cases.find(x=>x.case_id==='I15').answers.global_identity_established=true;x=run(r);if(x.status===0)throw new Error('NEI overreach not rejected');
r=perfect();r.cases.find(x=>x.case_id==='I05').answers.promote_to_core=true;x=run(r);if(x.status===0)throw new Error('Core promotion leak not rejected');
r=perfect();r.module_assessment.dp_0_8='UNSUPPORTED';x=run(r);if(x.status===0)throw new Error('module assessment not enforced');
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 052 scorer self-test PASS');
