import fs from 'node:fs';
import path from 'node:path';
import { assessRejectedOverclaims } from '../../../tools/qualification/semantic-rejections.mjs';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp010');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','010','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');

function sameSet(a,b){
  if(!Array.isArray(a)||!Array.isArray(b)) return false;
  const A=[...a].sort(), B=[...b].sort();
  return A.length===B.length && A.every((x,i)=>x===B[i]);
}
function mappingFound(actual, expected){
  return (actual||[]).some(m=>sameSet(m?.left,expected.left)&&sameSet(m?.right,expected.right));
}

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  const s={experiment:'010',disposition:'INFRASTRUCTURE_FAILURE',error:'missing report or assertions'};
  fs.writeFileSync(scorePath,JSON.stringify(s,null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const assertions=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const cases=Array.isArray(report?.cases)?report.cases:[];
const byId=new Map();
const duplicates=[];
for(const c of cases){
  const id=String(c?.case_id??'');
  if(byId.has(id)) duplicates.push(id);
  byId.set(id,c);
}
const results=[];
for(const id of assertions.required_case_ids){
  const spec=assertions.cases[id];
  const a=byId.get(id);
  const mismatches=[];
  if(!a){mismatches.push({field:'case_id',expected:id,actual:null});}
  else{
    for(const [k,v] of Object.entries(spec.expect||{})){
      if(a[k]!==v) mismatches.push({field:k,expected:v,actual:a[k]??null});
    }
    for(const [k,allowed] of Object.entries(spec.allowed||{})){
      if(!allowed.includes(a[k])) mismatches.push({field:k,expected_one_of:allowed,actual:a[k]??null});
    }
    if(spec.require_failed_obligation && (!a.failed_obligation || a.failed_obligation==='NONE')){
      mismatches.push({field:'failed_obligation',expected:'concrete non-NONE obligation',actual:a.failed_obligation??null});
    }
    if(spec.require_one_to_subgraph && a.one_to_subgraph_attempted!==true){
      mismatches.push({field:'one_to_subgraph_attempted',expected:true,actual:a.one_to_subgraph_attempted??null});
    }
    for(const m of spec.required_mappings||[]){
      if(!mappingFound(a.mappings,m)) mismatches.push({field:'mappings',missing:m});
    }
    if(spec.require_residual && (!Array.isArray(a.residuals)||a.residuals.length===0)){
      mismatches.push({field:'residuals',expected:'nonempty',actual:a.residuals??null});
    }
    if(spec.required_rejection_concepts){
      const q=assessRejectedOverclaims(a.rejected_overclaims,spec.required_rejection_concepts);
      if(!q.semantic_coverage_complete) mismatches.push({field:'rejected_overclaims',missing:q.missing_concepts});
    }
    if(typeof a.reason!=='string'||a.reason.trim().length<12) mismatches.push({field:'reason',expected:'nontrivial explanation',actual:a.reason??null});
    if(!Array.isArray(a.protocols_used)||a.protocols_used.length===0) mismatches.push({field:'protocols_used',expected:'nonempty',actual:a.protocols_used??null});
  }
  results.push({case_id:id,pass:mismatches.length===0,mismatches});
}
const unexpected=[...byId.keys()].filter(id=>!assertions.required_case_ids.includes(id));
const guards={
  exact_case_coverage:cases.length===assertions.required_case_ids.length,
  no_duplicates:duplicates.length===0,
  no_unexpected:unexpected.length===0,
  packet_self_audit:report?.self_audit?.used_only_packet===true,
  module_assessment_supported:report?.module_assessment?.dp_0_1_to_0_4==='SUPPORTED'
};
const disposition=results.every(r=>r.pass)&&Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={experiment:'010',disposition,guards,duplicates,unexpected_case_ids:unexpected,case_results:results};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='QUALIFIES') process.exitCode=2;
