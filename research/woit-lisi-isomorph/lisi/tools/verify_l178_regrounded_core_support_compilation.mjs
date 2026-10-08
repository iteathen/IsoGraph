import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_25.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_25.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L178_REGROUNDED_CORE_SUPPORT_NATIVE_DERIVATION_0_2.json","utf8"));
const errors=[],norm=s=>s.replace(/\s+/g,"");
if(!norm(native).includes(norm(d.serialized_formula)))errors.push("new formula");
const old=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_L06_ACTION_SUMMARY_LOGIC_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8")).items.find(x=>x.census_id==="L-SSC-178");
if(norm(native).includes(norm(old.serialized_formula)))errors.push("old blocked formula still authoritative");
if(!d.serialized_formula.includes("^150023"))errors.push("primitive support absent");
if(d.serialized_formula.includes("944123"))errors.push("blocked inducedUsing relation remains");
for(const t of d.support_incidences){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("source support");}
if(!native.includes("(^150010 940002 941178 940010)")||!native.includes("(^150010 940003 942178 940014)"))errors.push("routing");
const mi=manifest.items.find(x=>x.census_id==="L-SSC-178");
if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="CORE_LOGIC_RECOMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==18)errors.push("count");
const result={pass:errors.length===0,errors,census_id:"L-SSC-178",accepted_closed:18,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
