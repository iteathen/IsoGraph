import fs from 'node:fs';
import {spawnSync} from 'node:child_process';

const assertions=JSON.parse(fs.readFileSync('experiments/031/hidden/ASSERTIONS.json','utf8'));
const out='out/exp031';
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

function reportFromOracle(){
  return {
    cases:assertions.required_case_ids.map(id=>({
      case_id:id,
      answers:structuredClone(assertions.cases[id].answers),
      reason:'Mechanical scorer self-test explanation for '+id,
      authority_used:['scorer-self-test']
    })),
    module_assessment:structuredClone(assertions.required_module_assessment),
    self_audit:structuredClone(assertions.required_self_audit)
  };
}
function run(expectSuccess){
  const r=spawnSync(process.execPath,['experiments/031/tools/score-exp031.mjs'],{encoding:'utf8'});
  if(expectSuccess&&r.status!==0) throw new Error('expected scorer PASS but got '+r.status+' '+r.stdout+' '+r.stderr);
  if(!expectSuccess&&r.status===0) throw new Error('expected scorer rejection');
  return JSON.parse(fs.readFileSync(out+'/SCORE.json','utf8'));
}

const good=reportFromOracle();
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(good,null,2));
const goodScore=run(true);
if(goodScore.disposition!=='QUALIFIES'||goodScore.full_stack_core_0_19.passed_cases!==32) throw new Error('perfect oracle did not qualify');

const bad=reportFromOracle();
bad.cases.find(x=>x.case_id==='F31').answers.qu_restriction_admissible=true;
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(bad,null,2));
const badScore=run(false);
if(badScore.disposition!=='DOES_NOT_QUALIFY'||!badScore.full_stack_core_0_19.failed_cases.includes('F31')) throw new Error('mutation was not detected');

fs.rmSync(out,{recursive:true,force:true});
console.log('Experiment 031 scorer self-test PASS');
