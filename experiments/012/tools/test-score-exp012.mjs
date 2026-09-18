import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const ROOT=process.cwd(), OUT=path.join(ROOT,'out','exp012');
const A=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','012','hidden','ASSERTIONS.json'),'utf8'));

function make(){
  const cases=[
    {
      case_id:'R01',
      candidate_status:'CORRESPONDENCE',
      separator_kind:'NONE',
      failed_obligation:'NONE',
      one_to_subgraph_attempted:false,
      mappings:[],
      residuals:['representation differences remain non-separating'],
      rejected_overclaims:['natural identity','structural breaker'],
      protocols_used:['DP-10','DP-38'],
      reason:'The supported structural correspondence remains legal because no qualified separator exists.'
    },
    {
      case_id:'R02',
      candidate_status:'CORRESPONDENCE',
      separator_kind:'NONE',
      failed_obligation:'NONE',
      one_to_subgraph_attempted:true,
      mappings:A.cases.R02.required_mappings.map(m=>({...m,role:'fixture role'})),
      residuals:['Beta derives its ranking from frozen acyclic dependency structure.'],
      rejected_overclaims:[...A.cases.R02.required_rejection_concepts],
      protocols_used:['DP-07','DP-13','DP-24'],
      reason:'The common topology is finite ranking plus strict descent, contradiction, and termination.'
    }
  ];
  return {cases,module_assessment:{dp_0_1_to_0_4:'SUPPORTED'},self_audit:{used_only_packet:true,notes:'fixture'}};
}
function run(report){
  fs.rmSync(OUT,{recursive:true,force:true});
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(report,null,2)+'\n');
  return spawnSync(process.execPath,['experiments/012/tools/score-exp012.mjs'],{cwd:ROOT,encoding:'utf8'});
}
{
  const x=run(make()); assert.equal(x.status,0,x.stderr||x.stdout);
  const s=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
  assert.equal(s.disposition,'QUALIFIES');
}
{
  const r=make(); r.cases[0].candidate_status='REJECTED'; r.cases[0].separator_kind='STRUCTURAL_BREAKER'; r.cases[0].failed_obligation='different files';
  const x=run(r); assert.equal(x.status,2);
}
{
  const r=make(); r.cases[1].rejected_overclaims=r.cases[1].rejected_overclaims.filter(x=>x!=='SAME_ALGORITHM');
  const x=run(r); assert.equal(x.status,2);
}
{
  const r=make(); r.cases[1].mappings=r.cases[1].mappings.filter(x=>!x.left.includes('A02'));
  const x=run(r); assert.equal(x.status,2);
}
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 012 scorer tests: PASS');
