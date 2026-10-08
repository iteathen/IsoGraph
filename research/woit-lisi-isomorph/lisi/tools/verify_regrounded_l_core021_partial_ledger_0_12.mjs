import fs from "node:fs";
import {spawnSync} from "node:child_process";
const ledgerPath="research/woit-lisi-isomorph/lisi/CORE021_CLOSURE_LEDGER_0_30.json";
const checker="tools/core021/check-core021-ledger.mjs";
const ledger=JSON.parse(fs.readFileSync(ledgerPath,"utf8"));
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const run=spawnSync(process.execPath,[checker,ledgerPath],{encoding:"utf8"});
let report;try{report=JSON.parse(run.stdout);}catch{throw new Error("Core checker did not emit JSON\n"+run.stdout+run.stderr);}
const errors=[];
const expectedGates={SOUNDNESS_STRUCTURE:true,COVERAGE:true,RECONSTRUCTION:true,SCOPE_INTEGRITY:true,AUTHORITY_ROUTING_STRUCTURE:true,IA_FIXED_POINT_CURRENT:true,STRICT_CLOSURE:false};
for(const [k,v] of Object.entries(expectedGates))if(report.gates?.[k]!==v)errors.push("gate "+k+" expected "+v+" got "+report.gates?.[k]);
if(run.status===0||report.qualifies!==false)errors.push("partial ledger unexpectedly qualifies");
if((report.errors||[]).some(x=>!String(x).startsWith("STRICT_CLOSURE:")))errors.push("non-strict checker error");
const closed=ledger.dispositions.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED"),open=ledger.dispositions.filter(x=>x.closure_mode==="INCOMPLETE_UNEXPANDED");
const ids=closed.map(x=>x.census_id).sort();
const expectedIds=["L-SSC-001","L-SSC-002","L-SSC-003","L-SSC-004","L-SSC-005","L-SSC-009","L-SSC-010","L-SSC-011","L-SSC-012","L-SSC-022","L-SSC-023","L-SSC-048","L-SSC-049","L-SSC-069","L-SSC-074","L-SSC-090","L-SSC-091","L-SSC-121","L-SSC-122","L-SSC-148","L-SSC-154","L-SSC-167","L-SSC-189","L-SSC-190","L-SSC-191"];
if(JSON.stringify(ids)!==JSON.stringify(expectedIds)||closed.some(x=>x.closure_mode!=="CLOSED_PRIMITIVE"))errors.push("closed set");
if(open.length!==166)errors.push("open count");
if(ledger.census.length!==ssc.items.length)errors.push("frozen census cardinality");
for(let i=0;i<ssc.items.length;i++){const c=ledger.census[i],s=ssc.items[i];if(c.id!==s.id||c.kind!==(s.kind||"source_semantic_obligation")||c.source_provenance!==s.source_provenance||c.semantic_body_ref!=="SOURCE_SEMANTIC_CENSUS_0_2.json#"+s.id)errors.push("frozen census projection "+s.id);}
if(ledger.frozen.source_semantic_census_sha256!=="60ea1b8210005dd08e275fa1e6b08080f57a7e3a73f8aa91fd292037c908b6c7")errors.push("frozen census hash");
const sr=ledger.scope_revision;if(!sr||sr.old_target_id!=="LISI_FULL_RENDERING_0_1"||sr.new_target_id!=="LISI_FULL_RENDERING_0_2"||sr.new_scope_sha256!==ledger.frozen.semantic_scope_sha256||sr.old_target_preserved!==true||sr.in_place_mutation!==false)errors.push("scope revision");
for(const id of ["L-SSC-013","L-SSC-177","L-SSC-178"])if(ledger.dispositions.find(x=>x.census_id===id)?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("required open blocker "+id);
if(ledger.inference_profile?.recursive_ia!==false||ledger.ia_fixed_point!==null)errors.push("IA state");
const result={pass:errors.length===0,errors,checker_exit:run.status,checker_gates:report.gates,accepted_closed_items:ids,incomplete_unexpanded:open.length,scope_revision:sr,ia_authorized:false,dp_authorized:false};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
