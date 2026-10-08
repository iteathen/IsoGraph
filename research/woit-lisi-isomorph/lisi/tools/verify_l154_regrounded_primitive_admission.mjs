import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_14.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_14.json","utf8"));
const audit=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L154_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const errors=[];
if(audit.status!=="PASS_CANDIDATE_CLOSED_PRIMITIVE"||audit.proposed_disposition!=="CLOSED_PRIMITIVE")errors.push("audit disposition");
if(!native.includes("(^150010 940002 941154 940015)")||!native.includes("(^150010 940003 942154 940016)"))errors.push("closed routing state");
if(native.includes("(^150010 940002 941154 940010)")||native.includes("(^150010 940003 942154 940014)"))errors.push("stale routing state");
for(const t of [...audit.body_analysis.primitive_extensional_incidences,...audit.body_analysis.support_incidences]){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("missing "+q);}
const mi=manifest.items.find(x=>x.census_id==="L-SSC-154");
if(mi?.closure_mode!=="CLOSED_PRIMITIVE"||mi?.semantic_compilation_state!=="PRIMITIVE_CLOSED_AFTER_REGROUNDED_AUDIT")errors.push("manifest state");
if(mi?.primitive_closure?.qualified_qu_used||mi?.primitive_closure?.schema_used||mi?.primitive_closure?.cross_author_semantics_used)errors.push("bad closure metadata");
const closed=manifest.items.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED").map(x=>x.census_id).sort();
const expected=["L-SSC-022","L-SSC-048","L-SSC-049","L-SSC-069","L-SSC-091","L-SSC-121","L-SSC-154","L-SSC-189","L-SSC-190","L-SSC-191"];
if(JSON.stringify(closed)!==JSON.stringify(expected))errors.push("closed set");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013","L-SSC-023"]))errors.push("pending set");
const result={pass:errors.length===0,errors,closed_ids:closed,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
