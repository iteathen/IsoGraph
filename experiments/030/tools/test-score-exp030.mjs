import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp030');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','030','hidden','ASSERTIONS.json'),'utf8'));

function perfect(){
  return {
    cases:assertions.required_case_ids.map(id=>({
      case_id:id,
      answers:structuredClone(assertions.cases[id].answers),
      reason:'Synthetic Experiment 030 scorer self-test explanation.',
      authority_used:['Core 0.19 section 18.11']
    })),
    module_assessment:{mutation_regression:'SUPPORTED'},
    self_audit:{...assertions.required_self_audit}
  };
}

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});
const reportPath=path.join(OUT,'PARSED_REPORT.json');

let report=perfect();
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
let run=spawnSync(process.execPath,['experiments/030/tools/score-exp030.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect report failed '+run.stdout+run.stderr);
let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='QUALIFIES') throw new Error('perfect disposition mismatch');

report=perfect();
report.cases.find(x=>x.case_id==='R02').answers.decoder_preserved_mutated_distinction=true;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/030/tools/score-exp030.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_QUALIFY') throw new Error('bad mutation report not rejected');

report=perfect();
report.self_audit.distinguished_preservation_from_detection=false;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/030/tools/score-exp030.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_QUALIFY') throw new Error('bad audit not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 030 scorer self-test PASS');
