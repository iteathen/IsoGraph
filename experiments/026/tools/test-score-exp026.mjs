import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp026');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','026','hidden','ASSERTIONS.json'),'utf8'));

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const report={
  cases:assertions.required_case_ids.map(id=>({
    case_id:id,
    answers:structuredClone(assertions.cases[id].answers),
    reason:'Synthetic deterministic qualification scorer explanation.',
    authority_used:['DTS 0.1 candidate']
  })),
  module_assessment:{dts_0_1:'SUPPORTED'},
  self_audit:{...assertions.required_self_audit}
};

const reportPath=path.join(OUT,'PARSED_REPORT.json');
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

let run=spawnSync(process.execPath,['experiments/026/tools/score-exp026.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect qualification report failed: '+run.stdout+run.stderr);
let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='QUALIFIES') throw new Error('perfect qualification disposition mismatch');

report.cases.find(x=>x.case_id==='Q18').answers.scoped_ti_may_proceed=false;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

run=spawnSync(process.execPath,['experiments/026/tools/score-exp026.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_QUALIFY') throw new Error('bad qualification report was not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 026 qualification scorer self-test PASS');
