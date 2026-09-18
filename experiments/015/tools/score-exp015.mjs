import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp015');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','015','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'015',disposition:'INFRASTRUCTURE_FAILURE',error:'missing report/assertions'},null,2)+'\n');
  process.exit(1);
}
const r=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const a=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const mismatches=[];
for(const [k,v] of Object.entries(a.expected)){
  if(r[k]!==v)mismatches.push({field:k,expected:v,actual:r[k]??null});
}
for(const [k,v] of Object.entries(a.overclaim_checks)){
  if(r?.overclaim_checks?.[k]!==v)mismatches.push({field:`overclaim_checks.${k}`,expected:v,actual:r?.overclaim_checks?.[k]??null});
}
for(const [left,right] of a.required_mappings){
  const ok=(r.mapping||[]).some(m=>m?.left===left&&m?.right===right);
  if(!ok)mismatches.push({field:'mapping',missing:{left,right}});
}
const residual=(Array.isArray(r.beta_residuals)?r.beta_residuals:[]).join(' ');
for(const token of a.required_beta_residual_tokens){
  if(!residual.includes(token))mismatches.push({field:'beta_residuals',missing_token:token});
}
if((r.mapping||[]).some(m=>m?.right==='Q5'))mismatches.push({field:'mapping',error:'misleading Q5 label entered common mapping'});
if(typeof r.reason!=='string'||r.reason.trim().length<20)mismatches.push({field:'reason',expected:'nontrivial explanation',actual:r.reason??null});
if(r?.self_audit?.used_only_packet!==true)mismatches.push({field:'self_audit.used_only_packet',expected:true,actual:r?.self_audit?.used_only_packet??null});
const disposition=mismatches.length===0?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={experiment:'015',disposition,mismatches};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='QUALIFIES')process.exitCode=2;
