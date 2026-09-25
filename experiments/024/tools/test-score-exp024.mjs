import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp024');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','024','hidden','ASSERTIONS.json'),'utf8'));
const pub=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','024','COMPARISON_REQUESTS.json'),'utf8'));

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const claims=pub.comparison_requests.map(req=>{
  const expected=assertions.expected[req.request_id];
  return {
    request_id:req.request_id,
    left:req.left,
    right:req.right,
    view:req.view,
    disposition:expected.disposition,
    common_structure:expected.disposition==='TI'?['synthetic-common']:[],
    residuals:expected.requires_residual?['synthetic-residual']:[],
    qu_dependencies:expected.requires_qu?['synthetic-qu']:[],
    breaker:expected.disposition==='REJECTED'?'synthetic load-bearing breaker':null,
    reason:'Synthetic deterministic corrected-comparison scorer explanation.',
    authority_used:['synthetic-authority']
  };
});

const report={
  claims,
  self_audit:{
    answered_every_public_request:true,
    ...assertions.required_self_audit
  }
};

const reportPath=path.join(OUT,'PARSED_REPORT.json');
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

let run=spawnSync(process.execPath,['experiments/024/tools/score-exp024.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect corrected report failed: '+run.stdout+run.stderr);
let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='PASSES') throw new Error('perfect corrected report disposition mismatch');

report.claims.find(x=>x.request_id==='R05').disposition='TI';
report.claims.find(x=>x.request_id==='R05').common_structure=['synthetic-common'];
report.claims.find(x=>x.request_id==='R05').breaker=null;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

run=spawnSync(process.execPath,['experiments/024/tools/score-exp024.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_PASS') throw new Error('incorrect process TI was not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 024 corrected TI scorer self-test PASS');
