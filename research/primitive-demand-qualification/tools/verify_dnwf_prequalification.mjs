import fs from "node:fs";
const root="research/primitive-demand-qualification/dnwf";
const ssc=JSON.parse(fs.readFileSync(root+"/DNWF_SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const cand=JSON.parse(fs.readFileSync(root+"/DNWF_0_1_CANDIDATE.json","utf8"));
const audit=JSON.parse(fs.readFileSync(root+"/DNWF_Q0_Q2_PREQUALIFICATION_AUDIT_0_1.json","utf8"));
const md=fs.readFileSync(root+"/DNWF_0_1_CANDIDATE.md","utf8");
const errors=[];
if(ssc.status!=="FROZEN_CANDIDATE_MODULE_SSC"||ssc.items.length!==7)errors.push("SSC freeze/count");
if(cand.status!=="UNQUALIFIED_SEMANTIC_EXTENSION_CANDIDATE")errors.push("candidate status");
if(cand.new_semantic_relations?.length!==1)errors.push("new semantic relation count");
const rel=cand.new_semantic_relations?.[0];
if(rel?.id!==160100||rel?.name!=="WF_TERM_ALGEBRA"||rel?.arity!==2)errors.push("candidate relation identity");
const raw=(cand.raw_packet_metadata_relations||[]).map(x=>x.id);
if(JSON.stringify(raw)!==JSON.stringify([160110,160111,160112,160113,160114,160115,160116]))errors.push("raw metadata IDs");
const sscIds=ssc.items.map(x=>x.id).sort();
const covered=Object.keys(audit.q1?.coverage||{}).sort();
if(JSON.stringify(sscIds)!==JSON.stringify(covered))errors.push("Q1 coverage");
if((audit.q1?.uncovered_ssc_items||[]).length|| (audit.q1?.unsupported_candidate_semantic_clauses||[]).length)errors.push("Q1 gaps");
if(audit.q0?.disposition!=="PASS"||audit.q1?.disposition!=="PASS"||audit.q2?.disposition!=="PASS")errors.push("Q0-Q2 disposition");
if(audit.q3?.disposition!=="NOT_RUN"||audit.q7?.disposition!=="INCOMPLETE_EVIDENCE"||audit.authority!==false)errors.push("qualification overclaim");
if(audit.downstream?.DNIA!=="BLOCKED_ON_DNWF_Q7"||audit.downstream?.W!=="BLOCKED_ON_PRIMITIVE_DOMAIN_BOUNDARY")errors.push("downstream gate");
const forbidden=/woit|lisi|twistor|triality|quaternion|octonion|clifford|penrose|yang.?mills|einstein|bundle|group|vector|matrix|hodge/i;
if(forbidden.test(rel.name))errors.push("domain label in new relation");
for(const clause of cand.semantic_clauses||[])if(forbidden.test(clause))errors.push("domain label in semantic clause "+clause);
for(const item of ssc.items){
  if(/numeric index|arithmetic|cardinality/i.test(item.body)&&item.id!=="DNWF-SSC-001"&&item.id!=="DNWF-SSC-007")errors.push("unexpected arithmetic semantics "+item.id);
}
for(const must of ["constructor closure","constructor coverage","constructor separation","well-foundedness","least generated carrier","initial fold property","structural induction","structural recursion"]){
  if(!md.toLowerCase().includes(must))errors.push("candidate prose missing "+must);
}
const result={pass:errors.length===0,errors,q0:audit.q0.disposition,q1:audit.q1.disposition,q2:audit.q2.disposition,q3:audit.q3.disposition,authority:audit.authority};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;