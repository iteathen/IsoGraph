import fs from 'node:fs';
const out='out/exp060';
const report=JSON.parse(fs.readFileSync(out+'/PARSED_REPORT.json','utf8'));
const a=JSON.parse(fs.readFileSync('experiments/060/hidden/ASSERTIONS.json','utf8'));
const eq=(x,y)=>JSON.stringify(x)===JSON.stringify(y);
const cases=Array.isArray(report.cases)?report.cases:[];
const expected=a.cases.R01.answers;
const actual=cases.find(x=>x?.case_id==='R01');
const mismatches=[];
if(!actual) mismatches.push({field:'case_id',expected:'R01',actual:null});
else{
 for(const [k,v] of Object.entries(expected)) if(!eq(actual?.answers?.[k],v)) mismatches.push({field:'answers.'+k,expected:v,actual:actual?.answers?.[k]??null});
 if(!eq(Object.keys(actual?.answers??{}).sort(),Object.keys(expected).sort())) mismatches.push({field:'answers.keys'});
 if(typeof actual.reason!=='string'||actual.reason.trim().length<12) mismatches.push({field:'reason'});
 if(!Array.isArray(actual.authority_used)||actual.authority_used.length===0) mismatches.push({field:'authority_used'});
}
const moduleErrors=[];
for(const [k,v] of Object.entries(a.required_module_assessment)) if(report?.module_assessment?.[k]!==v) moduleErrors.push({field:k,expected:v,actual:report?.module_assessment?.[k]??null});
const auditErrors=[];
for(const [k,v] of Object.entries(a.required_self_audit)) if(report?.self_audit?.[k]!==v) auditErrors.push({field:k,expected:v,actual:report?.self_audit?.[k]??null});
const guards={exact_case_count:cases.length===1,exact_case_order:cases.length===1&&cases[0]?.case_id==='R01',module_assessments:moduleErrors.length===0,self_audit:auditErrors.length===0};
const pass=mismatches.length===0;
const disposition=pass&&Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={experiment:'060',disposition,integration_boundary:{pass,mismatches},guards,module_errors:moduleErrors,self_audit_errors:auditErrors};
fs.writeFileSync(out+'/SCORE.json',JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='QUALIFIES') process.exitCode=1;
