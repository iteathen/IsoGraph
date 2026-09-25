import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd(), OUT=path.join(ROOT,'out','exp017');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','017','hidden','ASSERTIONS.json'),'utf8'));
fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});

const report={
  cases:assertions.required_case_ids.map(id=>({case_id:id,answers:assertions.cases[id].answers,reason:'Synthetic deterministic scorer self-test explanation.',authority_used:['Core 0.18 candidate']})),
  module_assessment:{core_0_18:'SUPPORTED'},
  self_audit:{used_only_packet:true,notes:'synthetic scorer test'}
};
fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(report,null,2)+'\n');
let run=spawnSync(process.execPath,['experiments/017/tools/score-exp017.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0)throw new Error('perfect report did not qualify: '+run.stdout+run.stderr);
let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='QUALIFIES')throw new Error('perfect score disposition mismatch');

report.cases[6].answers.projection_allowed=true;
fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/017/tools/score-exp017.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_QUALIFY')throw new Error('bad report was not rejected');
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 017 scorer self-test PASS');
