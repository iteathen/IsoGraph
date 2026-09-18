import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const ROOT=process.cwd(), OUT=path.join(ROOT,'out','exp010');
const A=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','010','hidden','ASSERTIONS.json'),'utf8'));

function make(){
  const cases=A.required_case_ids.map(id=>({
    case_id:id,
    candidate_status:'CORRESPONDENCE',
    separator_kind:'NONE',
    failed_obligation:'NONE',
    cross_residual_disposition:'NOT_APPLICABLE',
    one_to_subgraph_attempted:false,
    mappings:[],
    residuals:[],
    rejected_overclaims:[],
    protocols_used:['DP-01'],
    reason:'Synthetic fixture with enough explanatory content for deterministic scorer testing.'
  }));
  for(const c of cases){
    const s=A.cases[c.case_id];
    Object.assign(c,s.expect||{});
    for(const [k,v] of Object.entries(s.allowed||{})) c[k]=v[0];
    if(s.require_failed_obligation) c.failed_obligation='RELATION_PRESERVATION';
    if(s.require_one_to_subgraph) c.one_to_subgraph_attempted=true;
    if(s.required_mappings) c.mappings=s.required_mappings.map(m=>({...m,role:'fixture role'}));
    if(s.require_residual) c.residuals=['method-specific decomposition residual'];
    if(s.required_rejection_concepts) c.rejected_overclaims=[...s.required_rejection_concepts];
  }
  return {cases,module_assessment:{dp_0_1_to_0_4:'SUPPORTED'},self_audit:{used_only_packet:true,notes:'fixture'}};
}
function run(report){
  fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(report,null,2)+'\n');
  return spawnSync(process.execPath,['experiments/010/tools/score-exp010.mjs'],{cwd:ROOT,encoding:'utf8'});
}
{
  const x=run(make()); assert.equal(x.status,0,x.stderr||x.stdout);
  const s=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8')); assert.equal(s.disposition,'QUALIFIES');
}
{
  const r=make(); const d=r.cases.find(x=>x.case_id==='D03'); d.candidate_status='REJECTED'; d.separator_kind='STRUCTURAL_BREAKER'; d.failed_obligation='different machinery';
  const x=run(r); assert.equal(x.status,2);
  const s=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8')); assert.equal(s.disposition,'DOES_NOT_QUALIFY');
}
{
  const r=make(); r.cases.find(x=>x.case_id==='D08').mappings=r.cases.find(x=>x.case_id==='D08').mappings.filter(m=>!m.left.includes('A03'));
  const x=run(r); assert.equal(x.status,2);
}
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 010 scorer tests: PASS');
