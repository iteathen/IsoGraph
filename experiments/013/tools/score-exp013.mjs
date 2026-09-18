import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp013');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const assertionsPath=path.join(ROOT,'experiments','013','hidden','ASSERTIONS.json');
const scorePath=path.join(OUT,'SCORE.json');

function deepEqual(a,b){return JSON.stringify(a)===JSON.stringify(b);}

if(!fs.existsSync(reportPath)||!fs.existsSync(assertionsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'013',disposition:'INFRASTRUCTURE_FAILURE',error:'missing report or assertions'},null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const assertions=JSON.parse(fs.readFileSync(assertionsPath,'utf8'));
const cases=Array.isArray(report?.cases)?report.cases:[];
const byId=new Map(), duplicates=[];
for(const item of cases){
  const id=String(item?.case_id??'');
  if(byId.has(id))duplicates.push(id);
  byId.set(id,item);
}

const results=[];
for(const id of assertions.required_case_ids){
  const spec=assertions.cases[id];
  const actual=byId.get(id);
  const mismatches=[];
  if(!actual){
    mismatches.push({field:'case_id',expected:id,actual:null});
  }else{
    for(const [key,expected] of Object.entries(spec.answers)){
      const got=actual?.answers?.[key];
      if(!deepEqual(got,expected)) mismatches.push({field:`answers.${key}`,expected,actual:got??null});
    }
    const expectedKeys=Object.keys(spec.answers).sort();
    const actualKeys=Object.keys(actual?.answers??{}).sort();
    if(!deepEqual(actualKeys,expectedKeys)) mismatches.push({field:'answers.keys',expected:expectedKeys,actual:actualKeys});
    if(typeof actual.reason!=='string'||actual.reason.trim().length<12)mismatches.push({field:'reason',expected:'nontrivial explanation',actual:actual.reason??null});
    if(!Array.isArray(actual.authority_used)||actual.authority_used.length===0)mismatches.push({field:'authority_used',expected:'nonempty',actual:actual.authority_used??null});
  }
  results.push({case_id:id,modules:spec.modules,pass:mismatches.length===0,mismatches});
}

const unexpected=[...byId.keys()].filter(id=>!assertions.required_case_ids.includes(id));
const quCases=results.filter(r=>r.modules.includes('QU'));
const neiCases=results.filter(r=>r.modules.includes('NEI'));
const quPass=quCases.every(r=>r.pass);
const neiPass=neiCases.every(r=>r.pass);
const guards={
  exact_case_coverage:cases.length===assertions.required_case_ids.length,
  no_duplicates:duplicates.length===0,
  no_unexpected:unexpected.length===0,
  packet_self_audit:report?.self_audit?.used_only_packet===true,
  qu_assessment_consistent:!quPass||report?.module_assessment?.qu_0_1==='SUPPORTED',
  nei_assessment_consistent:!neiPass||report?.module_assessment?.nei_0_1_0_2==='SUPPORTED'
};
const disposition=quPass&&neiPass&&Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={
  experiment:'013',
  disposition,
  qu_0_1:{pass:quPass,failed_cases:quCases.filter(x=>!x.pass).map(x=>x.case_id)},
  nei_0_1_0_2:{pass:neiPass,failed_cases:neiCases.filter(x=>!x.pass).map(x=>x.case_id)},
  guards,
  duplicates,
  unexpected_case_ids:unexpected,
  case_results:results
};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='QUALIFIES')process.exitCode=2;
