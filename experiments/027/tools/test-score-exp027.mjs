import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp027');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','027','hidden','ASSERTIONS.json'),'utf8'));

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const report={
  cases:assertions.required_case_ids.map(id=>({
    case_id:id,
    answers:structuredClone(assertions.cases[id].answers),
    reason:'Synthetic deterministic integration scorer explanation.',
    authority_used:['qualified integrated stack with DTS']
  })),
  module_assessment:{integrated_with_dts:'SUPPORTED'},
  self_audit:{...assertions.required_self_audit}
};

const reportPath=path.join(OUT,'PARSED_REPORT.json');
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

let run=spawnSync(process.execPath,['experiments/027/tools/score-exp027.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect integrated report failed: '+run.stdout+run.stderr);

let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='QUALIFIES') throw new Error('perfect integrated report disposition mismatch');

report.cases.find(item=>item.case_id==='D10').answers.qualified_ti_admissible=true;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

run=spawnSync(process.execPath,['experiments/027/tools/score-exp027.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_QUALIFY'){
  throw new Error('deliberately bad integrated report was not rejected');
}

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 027 integrated scorer self-test PASS');
