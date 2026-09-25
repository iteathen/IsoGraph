import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp021');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','021','hidden','ASSERTIONS.json'),'utf8'));

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const claims=assertions.required_claims.map(req=>({
  left:req.left,
  right:req.right,
  view:req.view,
  disposition:req.disposition,
  common_structure:req.disposition==='TI'?['synthetic-common-structure']:[],
  residuals:req.requires_residual?['synthetic-residual']:[],
  qu_dependencies:req.requires_qu?['synthetic-qu-dependency']:[],
  reason:'Synthetic deterministic scorer self-test explanation.',
  authority_used:['synthetic-authority']
}));
const report={
  claims,
  discoveries:[],
  self_audit:{...assertions.required_self_audit}
};
const reportPath=path.join(OUT,'PARSED_REPORT.json');
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

let run=spawnSync(process.execPath,['experiments/021/tools/score-exp021.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect report failed: '+run.stdout+run.stderr);
let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='PASSES') throw new Error('perfect report disposition mismatch');

report.claims.find(c=>c.left==='T04A'&&c.right==='T04B'&&c.view==='C_PROCESS').disposition='TI';
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/021/tools/score-exp021.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_PASS') throw new Error('incorrect process TI was not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 021 scorer self-test PASS');
