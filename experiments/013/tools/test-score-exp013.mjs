import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp013');
const A=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','013','hidden','ASSERTIONS.json'),'utf8'));

function make(){
  return {
    cases:A.required_case_ids.map(id=>({
      case_id:id,
      answers:{...A.cases[id].answers},
      reason:'Synthetic fixture with explicit proposition-level answers for deterministic scorer validation.',
      authority_used:['fixture authority']
    })),
    module_assessment:{qu_0_1:'SUPPORTED',nei_0_1_0_2:'SUPPORTED'},
    self_audit:{used_only_packet:true,notes:'fixture'}
  };
}
function run(report){
  fs.rmSync(OUT,{recursive:true,force:true});
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(report,null,2)+'\n');
  return spawnSync(process.execPath,['experiments/013/tools/score-exp013.mjs'],{cwd:ROOT,encoding:'utf8'});
}
{
  const x=run(make());assert.equal(x.status,0,x.stderr||x.stdout);
  const s=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));assert.equal(s.disposition,'QUALIFIES');
}
{
  const r=make();r.cases.find(x=>x.case_id==='F08').answers.nei_query_status='UNKNOWN';
  const x=run(r);assert.equal(x.status,2);
}
{
  const r=make();delete r.cases.find(x=>x.case_id==='F02').answers.four_admissible;
  const x=run(r);assert.equal(x.status,2);
}
{
  const r=make();r.cases.find(x=>x.case_id==='F05').answers.QX_QZ='QUI';
  const x=run(r);assert.equal(x.status,2);
}
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 013 scorer tests: PASS');
