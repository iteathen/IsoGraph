import fs from 'node:fs';
const out='out/exp053', report=JSON.parse(fs.readFileSync(out+'/PARSED_REPORT.json','utf8')), a=JSON.parse(fs.readFileSync('experiments/053/hidden/ASSERTIONS.json','utf8'));
const eq=(x,y)=>JSON.stringify(x)===JSON.stringify(y), cases=Array.isArray(report.cases)?report.cases:[], map=new Map(),dup=[];
for(const c of cases){const id=String(c?.case_id??'');if(map.has(id))dup.push(id);map.set(id,c);}
const results=[];
for(const id of a.required_case_ids){const e=a.cases[id].answers,c=map.get(id),mis=[];if(!c)mis.push('missing');else{for(const[k,v]of Object.entries(e))if(!eq(c?.answers?.[k],v))mis.push(k);if(!eq(Object.keys(c?.answers??{}).sort(),Object.keys(e).sort()))mis.push('keys');if(typeof c.reason!=='string'||c.reason.trim().length<12)mis.push('reason');if(!Array.isArray(c.authority_used)||!c.authority_used.length)mis.push('authority');}results.push({case_id:id,pass:mis.length===0,mismatches:mis});}
const unexpected=[...map.keys()].filter(x=>!a.required_case_ids.includes(x)),audit=report.self_audit??{},auditErrors=[];
for(const[k,v]of Object.entries(a.required_self_audit))if(audit[k]!==v)auditErrors.push(k);
const allPass=results.every(x=>x.pass),guards={exact_case_count:cases.length===20,exact_case_order:eq(cases.map(x=>String(x?.case_id??'')),a.required_case_ids),no_duplicates:dup.length===0,no_unexpected:unexpected.length===0,self_audit:auditErrors.length===0,module_assessment_consistent:!allPass||report?.module_assessment?.dp_0_9==='SUPPORTED'};
const disposition=allPass&&Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY',score={experiment:'053',disposition,dp_0_9:{pass:allPass,passed_cases:results.filter(x=>x.pass).map(x=>x.case_id),failed_cases:results.filter(x=>!x.pass).map(x=>x.case_id)},guards,case_results:results,unexpected,auditErrors};
fs.writeFileSync(out+'/SCORE.json',JSON.stringify(score,null,2)+'\n');console.log(JSON.stringify({disposition,dp_0_9:score.dp_0_9,guards},null,2));if(disposition!=='QUALIFIES')process.exitCode=1;
