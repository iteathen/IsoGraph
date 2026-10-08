import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_21.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_21.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_L06_SOURCE_STATUS_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const errors=[];
for(const row of d.items){
 const s=ssc.items.find(x=>x.id===row.census_id);if(row.frozen_body!==s?.body)errors.push("body "+row.census_id);
 for(const t of [...row.body_incidences,...row.support_incidences]){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("tuple "+row.census_id+" "+q);}
 const n=Number(row.census_id.slice(-3)),item=941000+n,body=942000+n;
 if(!native.includes("(^150010 940002 "+item+" 940010)"))errors.push("disposition "+row.census_id);
 if(!native.includes("(^150010 940003 "+body+" 940014)"))errors.push("compiled "+row.census_id);
 const mi=manifest.items.find(x=>x.census_id===row.census_id);
 if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest "+row.census_id);
}
if(manifest.regrounded_compilation?.accepted_closed_census_items!==15)errors.push("closed count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-009","L-SSC-011","L-SSC-013"]))errors.push("pending");
if(d.closure_claim!==false)errors.push("premature closure");
const result={pass:errors.length===0,errors,compiled:d.items.map(x=>x.census_id),accepted_closed:15,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
