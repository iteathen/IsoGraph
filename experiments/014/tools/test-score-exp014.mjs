import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp014');
const A=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','014','hidden','ASSERTIONS.json'),'utf8'));
function make(){
 return {
  case_id:'T01',
  candidate_status:'CORRESPONDENCE',
  separator_kind:'NONE',
  one_to_subgraph_attempted:true,
  mappings:A.required_mappings.map(m=>({...m,role:'fixture role'})),
  residuals:['scalar budget versus distinct-token resource implementation'],
  rejected_overclaims:[...A.required_rejection_concepts],
  protocols_used:['DP-07','DP-13','DP-24'],
  reason:'Synthetic fixture reconstructing the complete finite-resource exhaustion proof topology.',
  module_assessment:'SUPPORTED',
  self_audit:{used_only_packet:true,notes:'fixture'}
 };
}
function run(report){fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(report,null,2)+'\n');return spawnSync(process.execPath,['experiments/014/tools/score-exp014.mjs'],{cwd:ROOT,encoding:'utf8'});}
{const x=run(make());assert.equal(x.status,0,x.stderr||x.stdout);}
{const r=make();r.mappings[0].left='A01';const x=run(r);assert.equal(x.status,2);}
{const r=make();r.rejected_overclaims=r.rejected_overclaims.filter(x=>x!=='SAME_ALGORITHM');const x=run(r);assert.equal(x.status,2);}
{const r=make();r.mappings=r.mappings.filter(m=>!m.left.includes('A02'));const x=run(r);assert.equal(x.status,2);}
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 014 scorer tests: PASS');
