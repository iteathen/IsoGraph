import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd(), OUT=path.join(ROOT,'out','exp052');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','052','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

fs.mkdirSync(OUT,{recursive:true});
if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'052',disposition:'INFRASTRUCTURE_FAILURE'},null,2)+'\n');
  process.exit(1);
}
const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const a=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const cases=Array.isArray(report?.cases)?report.cases:[];
const byId=new Map(),duplicates=[];
for(const item of cases){const id=String(item?.case_id??'');if(byId.has(id))duplicates.push(id);byId.set(id,item);}
const results=[];
for(const id of a.required_case_ids){
  const expected=a.cases[id].answers, actual=byId.get(id), mismatches=[];
  if(!actual)mismatches.push({field:'case_id',expected:id,actual:null});
  else{
    for(const [k,v] of Object.entries(expected)){
      const got=actual?.answers?.[k];
      if(!eq(got,v))mismatches.push({field:'answers.'+k,expected:v,actual:got??null});
    }
    if(!eq(Object.keys(actual?.answers??{}).sort(),Object.keys(expected).sort()))mismatches.push({field:'answers.keys'});
    if(typeof actual.reason!=='string'||actual.reason.trim().length<12)mismatches.push({field:'reason'});
    if(!Array.isArray(actual.authority_used)||actual.authority_used.length===0)mismatches.push({field:'authority_used'});
  }
  results.push({case_id:id,pass:mismatches.length===0,mismatches});
}
const unexpected=[...byId.keys()].filter(id=>!a.required_case_ids.includes(id));
const audit=report?.self_audit??{},auditErrors=[];
for(const [k,v] of Object.entries(a.required_self_audit))if(audit[k]!==v)auditErrors.push({field:k,expected:v,actual:audit[k]??null});
const moduleErrors=[];
for(const [k,v] of Object.entries(a.required_module_assessment))if(report?.module_assessment?.[k]!==v)moduleErrors.push({field:k,expected:v,actual:report?.module_assessment?.[k]??null});
const guards={
  exact_case_count:cases.length===a.required_case_ids.length,
  exact_case_order:eq(cases.map(x=>String(x?.case_id??'')),a.required_case_ids),
  no_duplicates:duplicates.length===0,
  no_unexpected:unexpected.length===0,
  self_audit:auditErrors.length===0,
  module_assessment:moduleErrors.length===0
};
const allPass=results.every(x=>x.pass);
const disposition=allPass&&Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={
  experiment:'052',disposition,
  integration:{pass:allPass,passed_cases:results.filter(x=>x.pass).map(x=>x.case_id),failed_cases:results.filter(x=>!x.pass).map(x=>x.case_id)},
  guards,duplicates,unexpected_case_ids:unexpected,self_audit_errors:auditErrors,module_assessment_errors:moduleErrors,case_results:results
};
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify({disposition,integration:score.integration,guards},null,2));
if(disposition!=='QUALIFIES')process.exitCode=1;
