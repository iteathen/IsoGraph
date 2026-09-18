import fs from 'node:fs';
import path from 'node:path';
import { assessRejectedOverclaims } from '../../../tools/qualification/semantic-rejections.mjs';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out', 'exp012');
const reportPath = path.join(OUT, 'PARSED_REPORT.json');
const assertionsPath = path.join(ROOT, 'experiments', '012', 'hidden', 'ASSERTIONS.json');
const scorePath = path.join(OUT, 'SCORE.json');

function sameSet(a,b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  const A=[...a].sort(), B=[...b].sort();
  return A.length===B.length && A.every((x,i)=>x===B[i]);
}
function mappingFound(actual, expected) {
  return (actual || []).some(m => sameSet(m?.left, expected.left) && sameSet(m?.right, expected.right));
}

if (!fs.existsSync(reportPath) || !fs.existsSync(assertionsPath)) {
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath, JSON.stringify({experiment:'012',disposition:'INFRASTRUCTURE_FAILURE',error:'missing report or assertions'},null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const assertions=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const cases=Array.isArray(report?.cases)?report.cases:[];
const byId=new Map();
const duplicates=[];
for (const item of cases) {
  const id=String(item?.case_id ?? '');
  if (byId.has(id)) duplicates.push(id);
  byId.set(id,item);
}

const results=[];
for (const id of assertions.required_case_ids) {
  const spec=assertions.cases[id];
  const actual=byId.get(id);
  const mismatches=[];
  if (!actual) {
    mismatches.push({field:'case_id',expected:id,actual:null});
  } else {
    for (const [k,v] of Object.entries(spec.expect || {})) {
      if (actual[k] !== v) mismatches.push({field:k,expected:v,actual:actual[k] ?? null});
    }
    for (const [k,allowed] of Object.entries(spec.allowed || {})) {
      if (!allowed.includes(actual[k])) mismatches.push({field:k,expected_one_of:allowed,actual:actual[k] ?? null});
    }
    if (spec.forbidden_failed_obligation && actual.failed_obligation !== 'NONE') {
      mismatches.push({field:'failed_obligation',expected:'NONE',actual:actual.failed_obligation ?? null});
    }
    for (const expected of spec.required_mappings || []) {
      if (!mappingFound(actual.mappings, expected)) mismatches.push({field:'mappings',missing:expected});
    }
    if (spec.require_residual && (!Array.isArray(actual.residuals) || actual.residuals.length === 0)) {
      mismatches.push({field:'residuals',expected:'nonempty',actual:actual.residuals ?? null});
    }
    if (spec.required_rejection_concepts) {
      const q=assessRejectedOverclaims(actual.rejected_overclaims,spec.required_rejection_concepts);
      if (!q.semantic_coverage_complete) mismatches.push({field:'rejected_overclaims',missing:q.missing_concepts});
    }
    if (typeof actual.reason !== 'string' || actual.reason.trim().length < 12) {
      mismatches.push({field:'reason',expected:'nontrivial explanation',actual:actual.reason ?? null});
    }
    if (!Array.isArray(actual.protocols_used) || actual.protocols_used.length===0) {
      mismatches.push({field:'protocols_used',expected:'nonempty',actual:actual.protocols_used ?? null});
    }
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
const score={experiment:'012',disposition,guards,duplicates,unexpected_case_ids:unexpected,case_results:results};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if (disposition!=='QUALIFIES') process.exitCode=2;
