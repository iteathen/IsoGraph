import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp015');
const A=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','015','hidden','ASSERTIONS.json'),'utf8'));
function make(){
 return {
  mapping:A.required_mappings.map(([left,right])=>({left,right,role:'fixture role'})),
  ...A.expected,
  overclaim_checks:{...A.overclaim_checks},
  beta_residuals:['Check(Q2,Q3, policy_tag)','Q0 -> Q5 -> Q6 external audit branch'],
  reason:'Synthetic fixture preserving open topology, weak embedding, residuals, and source-local provenance.',
  self_audit:{used_only_packet:true,notes:'fixture'}
 };
}
function run(r){fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(r,null,2)+'\n');return spawnSync(process.execPath,['experiments/015/tools/score-exp015.mjs'],{cwd:ROOT,encoding:'utf8'});}
{const x=run(make());assert.equal(x.status,0,x.stderr||x.stdout);}
{const r=make();r.overclaim_checks.same_algorithm_established=true;const x=run(r);assert.equal(x.status,2);}
{const r=make();r.relation_kind='STRONG_EMBEDDING';r.strong_embedding=true;const x=run(r);assert.equal(x.status,2);}
{const r=make();r.mapping.push({left:'P1a',right:'Q5',role:'label trap'});const x=run(r);assert.equal(x.status,2);}
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 015 scorer tests: PASS');
