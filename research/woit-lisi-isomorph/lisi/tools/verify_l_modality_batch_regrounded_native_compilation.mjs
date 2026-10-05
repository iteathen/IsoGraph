import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_11.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_11.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_MODALITY_BATCH_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const errors=[];
for(const item of d.items){
  const s=ssc.items.find(x=>x.id===item.census_id);
  if(item.frozen_body!==s?.body)errors.push("frozen body "+item.census_id);
  for(const t of item.native_incidences){const q="(^150010 "+t.join(" ")+")";if(!native.includes(q))errors.push("missing "+item.census_id+" "+q);}
  const n=Number(item.census_id.slice(-3)),body=942000+n,itemAtom=941000+n;
  if(!native.includes("(^150010 940002 "+itemAtom+" 940010)"))errors.push("closure disposition changed "+item.census_id);
  if(!native.includes("(^150010 940003 "+body+" 940014)"))errors.push("compiled state missing "+item.census_id);
  if(native.includes("(^150010 940003 "+body+" 940011)"))errors.push("stale unexpanded state "+item.census_id);
  const mi=manifest.items.find(x=>x.census_id===item.census_id);
  if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest state "+item.census_id);
}
if(manifest.regrounded_compilation?.accepted_closed_census_items!==5)errors.push("accepted closure count changed");
if(d.closure_claim!==false)errors.push("premature closure claim");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false||manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("firewall");
const result={pass:errors.length===0,errors,compiled:d.items.map(x=>x.census_id),accepted_closed:manifest.regrounded_compilation?.accepted_closed_ids,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
