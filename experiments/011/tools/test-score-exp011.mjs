import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp011');
const A=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','011','hidden','ASSERTIONS.json'),'utf8'));
function make(){
  return {
    mapping:A.required_mappings.map(([left,right])=>({left,right,role:'fixture'})),
    ...A.expected,
    beta_residuals:['Guard(B2,B3, provenance_tag)','B0 -> B5 -> B6 audit branch'],
    rejected_overclaims:[...A.required_rejection_concepts],
    reason:'Synthetic fixture preserving residuals, open structure, factorization provenance, and identity bounds.',
    self_audit:{used_only_packet:true,notes:'fixture'}
  };
}
function run(x){fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(x,null,2)+'\n');return spawnSync(process.execPath,['experiments/011/tools/score-exp011.mjs'],{cwd:ROOT,encoding:'utf8'});}
{const x=run(make());assert.equal(x.status,0,x.stderr||x.stdout);const s=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));assert.equal(s.disposition,'QUALIFIES');}
{const r=make();r.relation_kind='STRONG_EMBEDDING';r.strong_embedding=true;const x=run(r);assert.equal(x.status,2);}
{const r=make();r.mapping.push({left:'A1a',right:'B5',role:'label trap'});r.misleading_label_B5_mapped_to_A1a=true;const x=run(r);assert.equal(x.status,2);}
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 011 scorer tests: PASS');
