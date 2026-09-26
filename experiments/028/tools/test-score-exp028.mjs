import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp028');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','028','hidden','ASSERTIONS.json'),'utf8'));

function perfectReport(){
  return {
    cases:assertions.required_case_ids.map(id=>({
      case_id:id,
      answers:structuredClone(assertions.cases[id].answers),
      reason:'Synthetic deterministic Experiment 028 scorer explanation.',
      authority_used:['DP 0.7 candidate']
    })),
    module_assessment:{dp_0_7_delta:'SUPPORTED'},
    self_audit:{...assertions.required_self_audit}
  };
}

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const reportPath=path.join(OUT,'PARSED_REPORT.json');
let report=perfectReport();
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

let run=spawnSync(process.execPath,['experiments/028/tools/score-exp028.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect report failed: '+run.stdout+run.stderr);

let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='QUALIFIES') throw new Error('perfect report disposition mismatch');

report=perfectReport();
report.cases.find(item=>item.case_id==='D02').answers.shared_label_sufficient=true;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/028/tools/score-exp028.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_QUALIFY') throw new Error('wrong semantic answer was not rejected');

report=perfectReport();
report.self_audit.did_not_make_global_negative_isomorphism_claim=false;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/028/tools/score-exp028.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_QUALIFY') throw new Error('bad self-audit was not rejected');

report=perfectReport();
report.cases.push(structuredClone(report.cases[0]));
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/028/tools/score-exp028.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.guards.no_duplicates!==false) throw new Error('duplicate case was not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 028 scorer self-test PASS');
