import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_20.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_20.json","utf8"));
const audit=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L023_REGROUNDED_SUMMARY_LOGIC_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L023_REGROUNDED_NATIVE_DERIVATION_0_2.json","utf8"));
const errors=[],norm=s=>s.replace(/\s+/g,"");
if(audit.status!=="PASS_CANDIDATE_CLOSED_PRIMITIVE"||audit.proposed_disposition!=="CLOSED_PRIMITIVE")errors.push("audit");
if(!norm(native).includes(norm(d.serialized_formula)))errors.push("formula");
for(const t of d.support_incidences){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("support "+q);}
if(!native.includes("(^150010 940002 941023 940015)")||!native.includes("(^150010 940003 942023 940016)"))errors.push("closed routing");
if(native.includes("(^150010 940002 941023 940010)")||native.includes("(^150010 940003 942023 940014)"))errors.push("stale routing");
const mi=manifest.items.find(x=>x.census_id==="L-SSC-023"),dep=manifest.items.find(x=>x.census_id==="L-SSC-154");
if(mi?.closure_mode!=="CLOSED_PRIMITIVE"||mi?.semantic_compilation_state!=="PRIMITIVE_CLOSED_AFTER_REGROUNDED_CORE_LOGIC_AUDIT")errors.push("L023 manifest");
if(dep?.closure_mode!=="CLOSED_PRIMITIVE")errors.push("L154 dependency");
if(JSON.stringify(mi?.primitive_formula_closure?.source_local_dependencies)!==JSON.stringify(["L-SSC-154"]))errors.push("dependency metadata");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==15)errors.push("closed count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013"]))errors.push("pending set");
const result={pass:errors.length===0,errors,accepted_closed:15,pending:["L-SSC-013"],dependency:"L-SSC-154"};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
