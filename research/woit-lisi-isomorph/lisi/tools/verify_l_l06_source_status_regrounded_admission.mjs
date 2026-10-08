import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_22.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_22.json","utf8"));
const audit=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_L06_SOURCE_STATUS_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const errors=[];
for(const row of audit.items){
 const n=Number(row.census_id.slice(-3)),item=941000+n,body=942000+n;
 if(!native.includes("(^150010 940002 "+item+" 940015)")||!native.includes("(^150010 940003 "+body+" 940016)"))errors.push("closed routing "+row.census_id);
 if(native.includes("(^150010 940002 "+item+" 940010)")||native.includes("(^150010 940003 "+body+" 940014)"))errors.push("stale routing "+row.census_id);
 for(const t of [...row.body_incidences,...row.support_incidences]){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("tuple "+row.census_id);}
 const mi=manifest.items.find(x=>x.census_id===row.census_id);
 if(mi?.closure_mode!=="CLOSED_PRIMITIVE"||mi?.semantic_compilation_state!=="PRIMITIVE_CLOSED_AFTER_REGROUNDED_AUDIT")errors.push("manifest "+row.census_id);
}
if(manifest.regrounded_compilation?.accepted_closed_census_items!==17)errors.push("closed count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013"]))errors.push("pending");
const result={pass:errors.length===0,errors,accepted_closed:17,pending:["L-SSC-013"]};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
