import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp024');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','024','hidden','ASSERTIONS.json');
const publicPath=path.join(ROOT,'experiments','024','COMPARISON_REQUESTS.json');
const scorePath=path.join(OUT,'SCORE.json');

function nonempty(value){return Array.isArray(value)&&value.length>0;}

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)||!fs.existsSync(publicPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'024',disposition:'INFRASTRUCTURE_FAILURE'},null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const assertions=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const pub=JSON.parse(fs.readFileSync(publicPath,'utf8'));
const claims=Array.isArray(report?.claims)?report.claims:[];

const byId=new Map();
const duplicates=[];
const malformed=[];

for(const claim of claims){
  const id=String(claim?.request_id??'');
  if(byId.has(id)) duplicates.push(id);
  byId.set(id,claim);

  if(!['TI','REJECTED','INCOMPLETE'].includes(claim?.disposition)) malformed.push({request_id:id,problem:'invalid_disposition'});
  if(!Array.isArray(claim?.common_structure)) malformed.push({request_id:id,problem:'common_structure_not_array'});
  if(!Array.isArray(claim?.residuals)) malformed.push({request_id:id,problem:'residuals_not_array'});
  if(!Array.isArray(claim?.qu_dependencies)) malformed.push({request_id:id,problem:'qu_dependencies_not_array'});
  if(typeof claim?.reason!=='string'||claim.reason.trim().length<16) malformed.push({request_id:id,problem:'weak_reason'});
  if(!nonempty(claim?.authority_used)) malformed.push({request_id:id,problem:'missing_authority'});
}

const publicById=new Map(pub.comparison_requests.map(r=>[r.request_id,r]));
const results=[];

for(const id of assertions.required_requests){
  const expected=assertions.expected[id];
  const publicRequest=publicById.get(id);
  const claim=byId.get(id);
  const mismatches=[];

  if(!publicRequest) mismatches.push({field:'public_request',expected:id,actual:null});
  if(!claim){
    mismatches.push({field:'claim',expected:id,actual:null});
  }else{
    for(const field of ['left','right','view']){
      if(claim[field]!==publicRequest[field]){
        mismatches.push({field,expected:publicRequest[field],actual:claim[field]??null});
      }
    }
    if(claim.disposition!==expected.disposition){
      mismatches.push({field:'disposition',expected:expected.disposition,actual:claim.disposition});
    }
    if(claim.disposition==='TI'&&!nonempty(claim.common_structure)){
      mismatches.push({field:'common_structure',expected:'nonempty for TI',actual:claim.common_structure??null});
    }
    if(expected.requires_residual&&!nonempty(claim.residuals)){
      mismatches.push({field:'residuals',expected:'nonempty',actual:claim.residuals??null});
    }
    if(expected.requires_qu&&!nonempty(claim.qu_dependencies)){
      mismatches.push({field:'qu_dependencies',expected:'nonempty',actual:claim.qu_dependencies??null});
    }
    if(claim.disposition==='REJECTED'&&(typeof claim.breaker!=='string'||claim.breaker.trim().length<8)){
      mismatches.push({field:'breaker',expected:'concrete load-bearing breaker',actual:claim.breaker??null});
    }
  }
  results.push({request_id:id,pass:mismatches.length===0,mismatches});
}

const unexpected=[...byId.keys()].filter(id=>!assertions.required_requests.includes(id));
const audit=report?.self_audit??{};
const auditErrors=[];

if(audit.answered_every_public_request!==true){
  auditErrors.push({field:'answered_every_public_request',expected:true,actual:audit.answered_every_public_request??null});
}
for(const [field,expected] of Object.entries(assertions.required_self_audit)){
  if(audit[field]!==expected) auditErrors.push({field,expected,actual:audit[field]??null});
}

const allPass=results.every(r=>r.pass);
const guards={
  exact_claim_count:claims.length===assertions.required_requests.length,
  no_duplicates:duplicates.length===0,
  no_unexpected:unexpected.length===0,
  all_claims_well_formed:malformed.length===0,
  public_contract_self_audit:auditErrors.length===0
};

const disposition=allPass&&Object.values(guards).every(Boolean)?'PASSES':'DOES_NOT_PASS';

const score={
  experiment:'024',
  disposition,
  required_requests:{pass:allPass,failed:results.filter(r=>!r.pass).map(r=>r.request_id)},
  guards,
  duplicate_request_ids:duplicates,
  unexpected_request_ids:unexpected,
  malformed_claims:malformed,
  self_audit_errors:auditErrors,
  request_results:results
};

fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='PASSES') process.exitCode=2;
