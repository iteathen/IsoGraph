import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const ROOT=process.cwd(), OUT=path.join(ROOT,'out','exp050');
const a=JSON.parse(fs.readFileSync('experiments/050/hidden/ASSERTIONS.json','utf8'));
function perfect(){return {cases:a.required_case_ids.map(id=>({case_id:id,answers:structuredClone(a.cases[id].answers),reason:'Synthetic principle-level DP 0.8 qualification explanation.',authority_used:['DP 0.8 candidate']})),module_assessment:{dp_0_8:'SUPPORTED'},self_audit:{...a.required_self_audit}};}
function run(r){fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(r,null,2)+'\n');return spawnSync(process.execPath,['experiments/050/tools/score-exp050.mjs'],{cwd:ROOT,encoding:'utf8'});}
let x=run(perfect());if(x.status!==0)throw new Error('perfect report failed '+x.stdout+x.stderr);
let r=perfect();r.cases.find(x=>x.case_id==='E03').answers.preserve_clue_after_repair=false;x=run(r);if(x.status===0)throw new Error('lost surviving clue not rejected');
r=perfect();r.cases.find(x=>x.case_id==='E07').answers.expected_output_privileged=true;x=run(r);if(x.status===0)throw new Error('expected-output privilege not rejected');
r=perfect();r.cases.find(x=>x.case_id==='E14').answers.nei_same_established=true;x=run(r);if(x.status===0)throw new Error('NEI overreach not rejected');
r=perfect();r.self_audit.kept_repair_and_discovery_questions_separate=false;x=run(r);if(x.status===0)throw new Error('self audit not rejected');
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 050 scorer self-test PASS');
