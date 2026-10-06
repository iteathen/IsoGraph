import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_REGROUNDED_0_25.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_22.json","utf8"));
const audit=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/W_CROSS_REFERENCE_SUMMARY_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const errors=[];
const ids=["W-SSC-060","W-SSC-065","W-SSC-066","W-SSC-067","W-SSC-070","W-SSC-077","W-SSC-080","W-SSC-085","W-SSC-089","W-SSC-127"];
if(audit.status!=="PASS_10_CANDIDATE_CLOSED_PRIMITIVE"||audit.proposed_disposition!=="CLOSED_PRIMITIVE")errors.push("audit disposition");
for(const id of ids){
 const mi=manifest.items.find(x=>x.census_id===id);
 if(mi?.closure_mode!=="CLOSED_PRIMITIVE")errors.push("manifest mode "+id);
 if(mi?.semantic_compilation_state!=="PRIMITIVE_CLOSED_AFTER_REGROUNDED_CROSS_REFERENCE_AUDIT")errors.push("manifest state "+id);
 const item=String(mi?.native_item_atom),body=String(mi?.native_body_root_atom);
 if(!native.includes("(^150010 930002 "+item+" 930015)"))errors.push("closed disposition "+id);
 if(!native.includes("(^150010 930003 "+body+" 930016)"))errors.push("closed body-state "+id);
 if(native.includes("(^150010 930002 "+item+" 930010)")||native.includes("(^150010 930003 "+body+" 930014)"))errors.push("stale pending state "+id);
 if(mi?.primitive_formula_closure?.qualified_qu_used||mi?.primitive_formula_closure?.schema_used||mi?.primitive_formula_closure?.cross_author_semantics_used)errors.push("invalid closure metadata "+id);
}
if(manifest.regrounded_compilation?.accepted_closed_census_items!==64)errors.push("closed count");
if((manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit||[]).length!==0)errors.push("pending set");
const result={pass:errors.length===0,errors,accepted_closed:manifest.regrounded_compilation?.accepted_closed_census_items};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;