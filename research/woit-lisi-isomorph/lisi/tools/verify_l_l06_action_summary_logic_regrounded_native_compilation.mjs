import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_23.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_23.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_L06_ACTION_SUMMARY_LOGIC_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const errors=[],norm=s=>s.replace(/\s+/g,"");
for(const row of d.items){
 if(row.frozen_body!==ssc.items.find(x=>x.id===row.census_id)?.body)errors.push("body "+row.census_id);
 if(!norm(native).includes(norm(row.serialized_formula)))errors.push("formula "+row.census_id);
 for(const t of row.support_incidences){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("support "+row.census_id);}
 const n=Number(row.census_id.slice(-3)),item=941000+n,body=942000+n;
 if(!native.includes("(^150010 940002 "+item+" 940010)")||!native.includes("(^150010 940003 "+body+" 940014)"))errors.push("routing "+row.census_id);
 const mi=manifest.items.find(x=>x.census_id===row.census_id);
 if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="CORE_LOGIC_COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest "+row.census_id);
}
if(manifest.regrounded_compilation?.accepted_closed_census_items!==17)errors.push("count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013","L-SSC-167","L-SSC-177","L-SSC-178"]))errors.push("pending");
const result={pass:errors.length===0,errors,compiled:d.items.map(x=>x.census_id),accepted_closed:17,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
