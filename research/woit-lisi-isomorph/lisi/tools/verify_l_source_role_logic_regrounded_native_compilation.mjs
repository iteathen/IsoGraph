import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_17.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_17.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_SOURCE_ROLE_LOGIC_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const errors=[],norm=s=>s.replace(/\s+/g,"");
for(const row of d.items){
  const s=ssc.items.find(x=>x.id===row.census_id);
  if(row.frozen_body!==s?.body)errors.push("frozen body "+row.census_id);
  if(!norm(native).includes(norm(row.serialized_formula)))errors.push("formula "+row.census_id);
  const q="(^150010 "+row.support_incidence.join(" ")+")";if(!native.includes(q))errors.push("support "+row.census_id);
  const n=Number(row.census_id.slice(-3)),item=941000+n,body=942000+n;
  if(!native.includes("(^150010 940002 "+item+" 940010)"))errors.push("disposition changed "+row.census_id);
  if(!native.includes("(^150010 940003 "+body+" 940014)"))errors.push("compiled state "+row.census_id);
  if(native.includes("(^150010 940003 "+body+" 940011)"))errors.push("stale state "+row.census_id);
  const mi=manifest.items.find(x=>x.census_id===row.census_id);
  if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="CORE_LOGIC_COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest "+row.census_id);
}
if(manifest.regrounded_compilation?.accepted_closed_census_items!==11)errors.push("closed count changed");
const expected=["L-SSC-013","L-SSC-023","L-SSC-074","L-SSC-090","L-SSC-122"];
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(expected))errors.push("pending set");
if(d.closure_claim!==false||manifest.regrounded_compilation?.cross_author_semantics_imported!==false||manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("firewall");
const result={pass:errors.length===0,errors,compiled:d.items.map(x=>x.census_id),accepted_closed:11,pending:expected};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
