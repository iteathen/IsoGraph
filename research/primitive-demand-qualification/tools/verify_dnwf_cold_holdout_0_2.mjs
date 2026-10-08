import fs from "node:fs";
const root="research/primitive-demand-qualification/dnwf";
const audit=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_CASE_COVERAGE_AUDIT_0_1.json","utf8"));
const cases=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_CASES_0_2.json","utf8"));
const oracle=JSON.parse(fs.readFileSync(root+"/DNWF_COLD_ORACLE_0_2.json","utf8"));
const prompt=fs.readFileSync(root+"/DNWF_COLD_PROMPT_0_2.md","utf8");
const errors=[];
if(audit.status!=="FAIL_PREDECESSOR_HOLDOUT_INCOMPLETE_SUCCESSOR_REQUIRED")errors.push("predecessor audit status");
if(audit.predecessor_mutated!==false||audit.cold_execution_on_predecessor_allowed_for_qualification!==false)errors.push("predecessor preservation");
if(cases.status!=="FROZEN_PUBLIC_COLD_CASES_SUCCESSOR_NO_EXPECTED_LABELS"||cases.predecessor!=="DNWF_COLD_CASES_0_1.json")errors.push("case successor");
if(oracle.status!=="FROZEN_HIDDEN_ORACLE_SUCCESSOR_DO_NOT_SUPPLY_TO_DECODER"||oracle.predecessor!=="DNWF_COLD_ORACLE_0_1.json")errors.push("oracle successor");
const caseIds=cases.cases.map(x=>x.id),oracleIds=oracle.cases.map(x=>x.id);
if(caseIds.length!==19||new Set(caseIds).size!==19||JSON.stringify(caseIds)!==JSON.stringify(oracleIds))errors.push("case/oracle ids");
for(let i=1;i<=19;i++)if(!caseIds.includes("DNWF-C"+String(i).padStart(2,"0")))errors.push("missing C"+i);
const allowed=new Set(["CONSISTENT_DNWF","INCONSISTENT_DNWF","DISTINCT_SEMANTICS","OVERCLAIM"]);
for(const x of oracle.cases)if(!allowed.has(x.classification)||!(x.required||[]).length)errors.push("oracle row "+x.id);
if(oracle.qualification_rule?.required_case_classification_accuracy!=="19/19 for each independent decoder")errors.push("accuracy rule");
if(!prompt.includes("DNWF_COLD_CASES_0_2.json")||prompt.includes("expected answers")===false)errors.push("prompt routing");
const publicText=JSON.stringify(cases)+"\n"+prompt;
for(const x of oracle.cases){
  if(publicText.includes("\\\"classification\\\":\\\""+x.classification+"\\\""))errors.push("oracle label leaked "+x.id);
}
const planMutations=Object.values(audit.q5_mapping_predecessor||{});
if(!planMutations.includes("MISSING"))errors.push("predecessor gap not recorded");
const result={pass:errors.length===0,errors,cases:caseIds.length,predecessor_qualified:false,successor_frozen:true};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
