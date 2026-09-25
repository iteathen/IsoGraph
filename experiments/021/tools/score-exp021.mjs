import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp021');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','021','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');

function key(left,right,view){
  const pair=[String(left),String(right)].sort((a,b)=>a.localeCompare(b));
  return pair[0]+'|'+pair[1]+'|'+String(view);
}
function nonemptyArray(value){return Array.isArray(value)&&value.length>0;}

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'021',disposition:'INFRASTRUCTURE_FAILURE'},null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const assertions=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const claims=Array.isArray(report?.claims)?report.claims:[];

const byKey=new Map();
const duplicateKeys=[];
const malformed=[];

for(const claim of claims){
  const left=String(claim?.left??'');
  const right=String(claim?.right??'');
  const view=String(claim?.view??'');
  const k=key(left,right,view);
  if(left.localeCompare(right)>0) malformed.push({key:k,problem:'noncanonical_pair_order'});
  if(!['TI','REJECTED','INCOMPLETE'].includes(claim?.disposition)) malformed.push({key:k,problem:'invalid_disposition'});
  if(!Array.isArray(claim?.common_structure)) malformed.push({key:k,problem:'common_structure_not_array'});
  if(!Array.isArray(claim?.residuals)) malformed.push({key:k,problem:'residuals_not_array'});
  if(!Array.isArray(claim?.qu_dependencies)) malformed.push({key:k,problem:'qu_dependencies_not_array'});
  if(typeof claim?.reason!=='string'||claim.reason.trim().length<16) malformed.push({key:k,problem:'weak_reason'});
  if(!nonemptyArray(claim?.authority_used)) malformed.push({key:k,problem:'missing_authority'});
  if(byKey.has(k)) duplicateKeys.push(k);
  byKey.set(k,claim);
}

const results=[];
for(const req of assertions.required_claims){
  const k=key(req.left,req.right,req.view);
  const claim=byKey.get(k);
  const mismatches=[];
  if(!claim){
    mismatches.push({field:'claim',expected:k,actual:null});
  }else{
    if(claim.disposition!==req.disposition){
      mismatches.push({field:'disposition',expected:req.disposition,actual:claim.disposition});
    }
    if(req.disposition==='TI' && !nonemptyArray(claim.common_structure)){
      mismatches.push({field:'common_structure',expected:'nonempty for TI',actual:claim.common_structure??null});
    }
    if(req.requires_residual && !nonemptyArray(claim.residuals)){
      mismatches.push({field:'residuals',expected:'nonempty',actual:claim.residuals??null});
    }
    if(req.requires_qu && !nonemptyArray(claim.qu_dependencies)){
      mismatches.push({field:'qu_dependencies',expected:'nonempty',actual:claim.qu_dependencies??null});
    }
  }
  results.push({key:k,pass:mismatches.length===0,mismatches});
}

const audit=report?.self_audit??{};
const auditMismatches=[];
for(const [name,expected] of Object.entries(assertions.required_self_audit)){
  if(audit[name]!==expected) auditMismatches.push({field:name,expected,actual:audit[name]??null});
}

const allRequired=results.every(r=>r.pass);
const guards={
  no_duplicate_claim_keys:duplicateKeys.length===0,
  all_claims_well_formed:malformed.length===0,
  required_self_audit:auditMismatches.length===0
};
const disposition=allRequired&&Object.values(guards).every(Boolean)?'PASSES':'DOES_NOT_PASS';

const score={
  experiment:'021',
  disposition,
  required_claims:{pass:allRequired,failed:results.filter(r=>!r.pass).map(r=>r.key)},
  guards,
  duplicate_claim_keys:duplicateKeys,
  malformed_claims:malformed,
  self_audit_mismatches:auditMismatches,
  claim_results:results,
  total_claims_reported:claims.length,
  discoveries_reported:Array.isArray(report?.discoveries)?report.discoveries.length:0
};

fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='PASSES') process.exitCode=2;
