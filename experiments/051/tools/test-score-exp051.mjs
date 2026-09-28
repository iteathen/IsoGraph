import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp051');
const a=JSON.parse(fs.readFileSync('experiments/051/hidden/ASSERTIONS.json','utf8'));
function perfect(){return {cases:[{case_id:'H01',answers:structuredClone(a.cases.H01.answers),reason:'Synthetic hidden-distinction qualification explanation.',authority_used:['DP 0.8']}],module_assessment:{dp_0_8_target_5:'SUPPORTED'},self_audit:{...a.required_self_audit}};}
function run(r){fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(r,null,2)+'\n');return spawnSync(process.execPath,['experiments/051/tools/score-exp051.mjs'],{cwd:ROOT,encoding:'utf8'});}
let x=run(perfect());if(x.status!==0)throw new Error('perfect report failed '+x.stdout+x.stderr);
let r=perfect();r.cases[0].answers.source_a_requires_repair=true;x=run(r);if(x.status===0)throw new Error('false repair not rejected');
r=perfect();r.cases[0].answers.normalize_to_common_quantity=true;x=run(r);if(x.status===0)throw new Error('normalization not rejected');
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 051 scorer self-test PASS');
