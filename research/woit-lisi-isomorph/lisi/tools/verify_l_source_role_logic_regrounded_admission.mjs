import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_18.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_18.json","utf8"));
const audit=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_SOURCE_ROLE_LOGIC_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const errors=[],norm=s=>s.replace(/\s+/g,"");
for(const row of audit.items){
  const n=Number(row.census_id.slice(-3)),item=941000+n,body=942000+n;
  if(!native.includes("(^150010 940002 "+item+" 940015)")||!native.includes("(^150010 940003 "+body+" 940016)"))errors.push("closed routing "+row.census_id);
  if(native.includes("(^150010 940002 "+item+" 940010)")||native.includes("(^150010 940003 "+body+" 940014)"))errors.push("stale routing "+row.census_id);
  const mi=manifest.items.find(x=>x.census_id===row.census_id);
  if(mi?.closure_mode!=="CLOSED_PRIMITIVE"||mi?.semantic_compilation_state!=="PRIMITIVE_CLOSED_AFTER_REGROUNDED_CORE_LOGIC_AUDIT")errors.push("manifest "+row.census_id);
  if(!norm(native).includes(norm(mi?.primitive_formula_closure?.serialized_formula||"")))errors.push("formula "+row.census_id);
  for(const t of mi?.primitive_formula_closure?.support_incidences||[]){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("support "+row.census_id);}
  if(mi?.primitive_formula_closure?.qualified_qu_used||mi?.primitive_formula_closure?.schema_used||mi?.primitive_formula_closure?.cross_author_semantics_used)errors.push("closure metadata "+row.census_id);
}
if(manifest.regrounded_compilation?.accepted_closed_census_items!==14)errors.push("closed count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013","L-SSC-023"]))errors.push("pending set");
const result={pass:errors.length===0,errors,accepted_closed:manifest.regrounded_compilation?.accepted_closed_ids,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
