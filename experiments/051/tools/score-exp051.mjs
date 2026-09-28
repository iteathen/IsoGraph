import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp051');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const aPath=path.join(ROOT,'experiments','051','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');
fs.mkdirSync(OUT,{recursive:true});
if(!fs.existsSync(reportPath)||!fs.existsSync(aPath)){fs.writeFileSync(scorePath,JSON.stringify({experiment:'051',disposition:'INFRASTRUCTURE_FAILURE'},null,2)+'\n');process.exit(1);}
const r=JSON.parse(fs.readFileSync(reportPath,'utf8')),a=JSON.parse(fs.readFileSync(aPath,'utf8'));
const item=Array.isArray(r.cases)?r.cases[0]:null, mismatches=[];
if(!item||item.case_id!=='H01')mismatches.push({field:'case_id'});
else{
 const expected=a.cases.H01.answers;
 for(const [k,v] of Object.entries(expected))if(item?.answers?.[k]!==v)mismatches.push({field:'answers.'+k,expected:v,actual:item?.answers?.[k]??null});
 if(JSON.stringify(Object.keys(item?.answers??{}).sort())!==JSON.stringify(Object.keys(expected).sort()))mismatches.push({field:'answers.keys'});
 if(typeof item.reason!=='string'||item.reason.trim().length<12)mismatches.push({field:'reason'});
 if(!Array.isArray(item.authority_used)||item.authority_used.length===0)mismatches.push({field:'authority_used'});
}
const auditErrors=[];
for(const [k,v] of Object.entries(a.required_self_audit))if(r?.self_audit?.[k]!==v)auditErrors.push(k);
const guards={exact_case_count:Array.isArray(r.cases)&&r.cases.length===1,self_audit:auditErrors.length===0,module_assessment:mismatches.length>0||r?.module_assessment?.dp_0_8_target_5==='SUPPORTED'};
const disposition=mismatches.length===0&&Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={experiment:'051',disposition,target_5:{pass:mismatches.length===0,mismatches},guards,self_audit_errors:auditErrors};
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='QUALIFIES')process.exitCode=1;
