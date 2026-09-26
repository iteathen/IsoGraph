import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp031');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','031','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'031',disposition:'INFRASTRUCTURE_FAILURE'},null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const assertions=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const cases=Array.isArray(report?.cases)?report.cases:[];
const byId=new Map();
const duplicates=[];
for(const item of cases){
  const id=String(item?.case_id??'');
  if(byId.has(id)) duplicates.push(id);
  byId.set(id,item);
}

const results=[];
for(const id of assertions.required_case_ids){
  const expected=assertions.cases[id];
  const actual=byId.get(id);
  const mismatches=[];
  if(!actual){
    mismatches.push({field:'case_id',expected:id,actual:null});
  }else{
    for(const [key,value] of Object.entries(expected.answers)){
      const got=actual?.answers?.[key];
      if(!eq(got,value)) mismatches.push({field:'answers.'+key,expected:value,actual:got??null});
    }
    const expectedKeys=Object.keys(expected.answers).sort();
    const actualKeys=Object.keys(actual?.answers??{}).sort();
    if(!eq(expectedKeys,actualKeys)) mismatches.push({field:'answers.keys',expected:expectedKeys,actual:actualKeys});
    if(typeof actual.reason!=='string'||actual.reason.trim().length<12) mismatches.push({field:'reason',expected:'nontrivial',actual:actual.reason??null});
    if(!Array.isArray(actual.authority_used)||actual.authority_used.length===0) mismatches.push({field:'authority_used',expected:'nonempty',actual:actual.authority_used??null});
  }
  results.push({case_id:id,pass:mismatches.length===0,mismatches});
}

const unexpected=[...byId.keys()].filter(id=>!assertions.required_case_ids.includes(id));
const audit=report?.self_audit??{};
const auditErrors=[];
for(const [field,expected] of Object.entries(assertions.required_self_audit)){
  if(audit[field]!==expected) auditErrors.push({field,expected,actual:audit[field]??null});
}
const assessment=report?.module_assessment??{};
const assessmentErrors=[];
for(const [field,expected] of Object.entries(assertions.required_module_assessment)){
  if(assessment[field]!==expected) assessmentErrors.push({field,expected,actual:assessment[field]??null});
}

const allPass=results.every(r=>r.pass);
const guards={
  exact_case_count:cases.length===assertions.required_case_ids.length,
  exact_case_order:eq(cases.map(x=>String(x?.case_id??'')),assertions.required_case_ids),
  no_duplicates:duplicates.length===0,
  no_unexpected:unexpected.length===0,
  self_audit:auditErrors.length===0,
  module_assessment:assessmentErrors.length===0
};

const categories={};
for(const [name,ids] of Object.entries(assertions.categories)){
  const subset=results.filter(r=>ids.includes(r.case_id));
  categories[name]={pass:subset.every(r=>r.pass),failed_cases:subset.filter(r=>!r.pass).map(r=>r.case_id),case_count:subset.length};
}
const disposition=allPass&&Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={
  experiment:'031',
  disposition,
  full_stack_core_0_19:{pass:allPass,passed_cases:results.filter(r=>r.pass).length,total_cases:results.length,failed_cases:results.filter(r=>!r.pass).map(r=>r.case_id)},
  categories,
  guards,
  duplicates,
  unexpected_case_ids:unexpected,
  self_audit_errors:auditErrors,
  module_assessment_errors:assessmentErrors,
  case_results:results
};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='QUALIFIES') process.exitCode=2;
