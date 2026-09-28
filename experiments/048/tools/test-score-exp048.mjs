import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp048');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','048','hidden','ASSERTIONS.json'),'utf8'));

function perfectReport(){
  return {
    cases:assertions.required_case_ids.map(id=>({
      case_id:id,
      answers:structuredClone(assertions.cases[id].answers),
      reason:'Synthetic deterministic Core 0.20 scorer explanation.',
      authority_used:['Core 0.20 candidate']
    })),
    module_assessment:{core_0_20:'SUPPORTED'},
    self_audit:{...assertions.required_self_audit}
  };
}

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});
const reportPath=path.join(OUT,'PARSED_REPORT.json');

let report=perfectReport();
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
let run=spawnSync(process.execPath,['experiments/048/tools/score-exp048.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect report failed: '+run.stdout+run.stderr);

report=perfectReport();
report.cases.find(x=>x.case_id==='C01').answers.primitive_complete=true;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/048/tools/score-exp048.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status===0) throw new Error('named-leaf violation was not rejected');

report=perfectReport();
report.cases.find(x=>x.case_id==='C08').answers.relation_status='RAW_DATA_ATOM';
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/048/tools/score-exp048.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status===0) throw new Error('missing-definition QU violation was not rejected');

report=perfectReport();
report.self_audit.did_not_use_sidecar_as_native_semantics=false;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/048/tools/score-exp048.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status===0) throw new Error('bad self audit was not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 048 scorer self-test PASS');
