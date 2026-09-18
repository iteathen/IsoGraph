import fs from 'node:fs';
import path from 'node:path';
import { assessRejectedOverclaims } from '../../../tools/qualification/semantic-rejections.mjs';

const ROOT=process.cwd(), OUT=path.join(ROOT,'out','exp011');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','011','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'011',disposition:'INFRASTRUCTURE_FAILURE',error:'missing report/assertions'},null,2)+'\n');
  process.exit(1);
}
const r=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const a=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const mismatches=[];
for(const [k,v] of Object.entries(a.expected)){
  if(r[k]!==v) mismatches.push({field:k,expected:v,actual:r[k]??null});
}
for(const [left,right] of a.required_mappings){
  const ok=(r.mapping||[]).some(m=>m?.left===left&&m?.right===right);
  if(!ok) mismatches.push({field:'mapping',missing:{left,right}});
}
const residualText=(Array.isArray(r.beta_residuals)?r.beta_residuals:[]).join(' ');
for(const token of a.required_beta_residual_tokens){
  if(!residualText.includes(token)) mismatches.push({field:'beta_residuals',missing_token:token});
}
const qrc=assessRejectedOverclaims(r.rejected_overclaims,a.required_rejection_concepts);
if(!qrc.semantic_coverage_complete) mismatches.push({field:'rejected_overclaims',missing:qrc.missing_concepts});
if(typeof r.reason!=='string'||r.reason.trim().length<20) mismatches.push({field:'reason',expected:'nontrivial explanation',actual:r.reason??null});
if(r?.self_audit?.used_only_packet!==true) mismatches.push({field:'self_audit.used_only_packet',expected:true,actual:r?.self_audit?.used_only_packet??null});
const forbidden=(r.mapping||[]).some(m=>m?.right==='B5');
if(forbidden) mismatches.push({field:'mapping',error:'misleading B5 label was mapped into common core'});
const disposition=mismatches.length===0?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={experiment:'011',disposition,qrc_semantic_rejection_coverage:qrc.semantic_coverage_complete,mismatches};
fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');console.log(JSON.stringify(score,null,2));if(disposition!=='QUALIFIES')process.exitCode=2;
