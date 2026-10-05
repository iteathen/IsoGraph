import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_13.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_13.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L154_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const errors=[];const s=ssc.items.find(x=>x.id==="L-SSC-154");
if(d.frozen_body!==s?.body)errors.push("frozen body mismatch");
for(const t of [...d.native_incidences,[940005,941154,940104]]){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("missing "+q);}
if(!native.includes("(^150010 940002 941154 940010)"))errors.push("closure disposition changed");
if(!native.includes("(^150010 940003 942154 940014)"))errors.push("compiled state missing");
if(native.includes("(^150010 940003 942154 940011)"))errors.push("stale unexpanded state");
const mi=manifest.items.find(x=>x.census_id==="L-SSC-154");
if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest state");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==9||d.closure_claim!==false||d.target_internal_behavior_imported!==false)errors.push("premature closure/firewall");
const result={pass:errors.length===0,errors,census_id:"L-SSC-154",accepted_closed:manifest.regrounded_compilation?.accepted_closed_census_items,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
