import fs from 'node:fs';
import path from 'node:path';
import { assessRejectedOverclaims } from '../../../tools/qualification/semantic-rejections.mjs';

const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp014');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','014','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');

function sameSet(a,b){
  if(!Array.isArray(a)||!Array.isArray(b))return false;
  const A=[...a].sort(),B=[...b].sort();
  return A.length===B.length&&A.every((x,i)=>x===B[i]);
}
function mappingFound(actual,expected){
  return (actual||[]).some(m=>sameSet(m?.left,expected.left)&&sameSet(m?.right,expected.right));
}

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'014',disposition:'INFRASTRUCTURE_FAILURE',error:'missing report/assertions'},null,2)+'\n');
  process.exit(1);
}
const r=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const a=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const mismatches=[];
for(const [k,v] of Object.entries(a.expected)){
  if(r[k]!==v)mismatches.push({field:k,expected:v,actual:r[k]??null});
}
for(const m of r.mappings||[]){
  if(!Array.isArray(m?.left)||!Array.isArray(m?.right))mismatches.push({field:'mappings.serializer',expected:'left/right arrays',actual:m});
}
for(const m of a.required_mappings){
  if(!mappingFound(r.mappings,m))mismatches.push({field:'mappings',missing:m});
}
if(a.require_residual&&(!Array.isArray(r.residuals)||r.residuals.length===0))mismatches.push({field:'residuals',expected:'nonempty',actual:r.residuals??null});
const qrc=assessRejectedOverclaims(r.rejected_overclaims,a.required_rejection_concepts);
if(!qrc.semantic_coverage_complete)mismatches.push({field:'rejected_overclaims',missing:qrc.missing_concepts});
if(!Array.isArray(r.protocols_used)||r.protocols_used.length===0)mismatches.push({field:'protocols_used',expected:'nonempty',actual:r.protocols_used??null});
if(typeof r.reason!=='string'||r.reason.trim().length<20)mismatches.push({field:'reason',expected:'nontrivial explanation',actual:r.reason??null});
if(r?.self_audit?.used_only_packet!==true)mismatches.push({field:'self_audit.used_only_packet',expected:true,actual:r?.self_audit?.used_only_packet??null});
const disposition=mismatches.length===0?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={experiment:'014',disposition,qrc_semantic_rejection_coverage:qrc.semantic_coverage_complete,mismatches};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='QUALIFIES')process.exitCode=2;
