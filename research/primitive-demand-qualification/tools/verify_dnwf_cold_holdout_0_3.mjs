import fs from "node:fs";
const root="research/primitive-demand-qualification/dnwf";
const c2=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_CASES_0_2.json","utf8"));
const c3=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_CASES_0_3.json","utf8"));
const o2=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_ORACLE_0_2.json","utf8"));
const o3=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_ORACLE_0_3.json","utf8"));
const p3=fs.readFileSync(root+"/DNWF_COLD_PROMPT_0_3.md","utf8");
const a=JSON.parse(fs.readFileSync(root+"/DNWF_ATTEMPT1_CLASSIFICATION_TAXONOMY_AUDIT_0_1.json","utf8"));
const repair=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_TAXONOMY_REPAIR_AUDIT_0_1.json","utf8"));
const errors=[];
if(a.status!=="QUALIFICATION_HOLDOUT_DEFECT_CONFIRMED_ATTEMPT1_NOT_A_PASS"||a.candidate_changed!==false)errors.push("attempt1 audit");
if(repair.status!=="SUCCESSOR_HOLDOUT_FROZEN_AFTER_DEMONSTRATED_AMBIGUITY"||repair.unchanged_expected_classifications!==true)errors.push("repair audit");
if(c3.predecessor!=="DNWF_COLD_CASES_0_2.json"||o3.predecessor!=="DNWF_COLD_ORACLE_0_2.json")errors.push("successor lineage");
const ids2=c2.cases.map(x=>x.id),ids3=c3.cases.map(x=>x.id);
if(JSON.stringify(ids2)!==JSON.stringify(ids3)||ids3.length!==19)errors.push("case ids");
const changed=[];
for(const id of ids3){
 const x=c2.cases.find(z=>z.id===id),y=c3.cases.find(z=>z.id===id);
 if(x.description!==y.description)changed.push(id);
}
if(JSON.stringify(changed)!==JSON.stringify(["DNWF-C15","DNWF-C17","DNWF-C18"]))errors.push("unexpected public case changes "+JSON.stringify(changed));
const cls2=Object.fromEntries(o2.cases.map(x=>[x.id,x.classification]));
const cls3=Object.fromEntries(o3.cases.map(x=>[x.id,x.classification]));
if(JSON.stringify(cls2)!==JSON.stringify(cls3))errors.push("oracle classification changed");
for(const id of ids3){
 const x=o2.cases.find(z=>z.id===id),y=o3.cases.find(z=>z.id===id);
 if(JSON.stringify(x.required)!==JSON.stringify(y.required)||JSON.stringify(x.forbidden)!==JSON.stringify(y.forbidden))errors.push("oracle semantic obligation changed "+id);
}
for(const s of ["CONSISTENT_DNWF","INCONSISTENT_DNWF","DISTINCT_SEMANTICS","OVERCLAIM","mutually exclusive","underlying DNWF structure is not the defect"])if(!p3.includes(s))errors.push("prompt taxonomy missing "+s);
for(const id of ["DNWF-C15","DNWF-C17","DNWF-C18"]){
 const desc=c3.cases.find(x=>x.id===id)?.description||"";
 if(!desc)errors.push("missing "+id);
}
const publicText=JSON.stringify(c3)+"\n"+p3;
for(const x of o3.cases){
 const leak='"case_id":"'+x.id+'","classification":"'+x.classification+'"';
 if(publicText.replace(/\s+/g,"").includes(leak))errors.push("case-specific oracle leak "+x.id);
}
if(o3.qualification_rule?.required_case_classification_accuracy!=="19/19 for each independent decoder")errors.push("threshold changed");
const result={pass:errors.length===0,errors,changed_cases:changed,expected_classifications_unchanged:true,attempt1_preserved:true};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;