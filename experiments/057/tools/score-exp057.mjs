import fs from 'node:fs';

const out='out/exp057';
const report=JSON.parse(fs.readFileSync(out+'/PARSED_REPORT.json','utf8'));
const expected=JSON.parse(fs.readFileSync('experiments/057/hidden/ASSERTIONS.json','utf8'));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

const cases=Array.isArray(report.cases)?report.cases:[];
const byId=new Map();
const duplicates=[];
for(const item of cases){
 const id=String(item?.case_id??'');
 if(byId.has(id)) duplicates.push(id);
 byId.set(id,item);
}

const results=[];
for(const id of expected.required_case_ids){
 const e=expected.cases[id].answers;
 const actual=byId.get(id);
 const mismatches=[];
 if(!actual) mismatches.push({field:'case_id',expected:id,actual:null});
 else{
  for(const [k,v] of Object.entries(e)){
   const got=actual?.answers?.[k];
   if(!eq(got,v)) mismatches.push({field:'answers.'+k,expected:v,actual:got??null});
  }
  if(!eq(Object.keys(actual?.answers??{}).sort(),Object.keys(e).sort())) mismatches.push({field:'answers.keys'});
  if(typeof actual.reason!=='string'||actual.reason.trim().length<12) mismatches.push({field:'reason'});
  if(!Array.isArray(actual.authority_used)||actual.authority_used.length===0) mismatches.push({field:'authority_used'});
 }
 results.push({case_id:id,pass:mismatches.length===0,mismatches});
}

const unexpected=[...byId.keys()].filter(id=>!expected.required_case_ids.includes(id));
const audit=report.self_audit??{};
const auditErrors=[];
for(const [k,v] of Object.entries(expected.required_self_audit)){
 if(audit[k]!==v) auditErrors.push({field:k,expected:v,actual:audit[k]??null});
}

const allPass=results.every(x=>x.pass);
const gates={
 exact_case_count:cases.length===expected.required_case_ids.length,
 exact_case_order:eq(cases.map(x=>String(x?.case_id??'')),expected.required_case_ids),
 no_duplicates:duplicates.length===0,
 no_unexpected:unexpected.length===0,
 self_audit:auditErrors.length===0,
 module_assessment_consistent:!allPass||report?.module_assessment?.core_0_21==='SUPPORTED'
};
const disposition=allPass&&Object.values(gates).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={
 experiment:'057',
 disposition,
 core_0_21:{
  pass:allPass,
  passed_cases:results.filter(x=>x.pass).map(x=>x.case_id),
  failed_cases:results.filter(x=>!x.pass).map(x=>x.case_id)
 },
 gates,
 duplicates,
 unexpected_case_ids:unexpected,
 self_audit_errors:auditErrors,
 case_results:results
};

fs.writeFileSync(out+'/SCORE.json',JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify({disposition,core_0_21:score.core_0_21,gates},null,2));
if(disposition!=='QUALIFIES') process.exitCode=1;
