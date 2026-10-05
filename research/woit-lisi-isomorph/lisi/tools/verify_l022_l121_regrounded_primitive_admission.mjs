import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_10.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_10.json","utf8"));
const audits=[
  JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L022_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8")),
  JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L121_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"))
];
const errors=[];
for(const [item,body] of [[941022,942022],[941121,942121]]){
  if(!native.includes("(^150010 940002 "+item+" 940015)"))errors.push("closed disposition missing "+item);
  if(!native.includes("(^150010 940003 "+body+" 940016)"))errors.push("primitive-closed body state missing "+body);
  if(native.includes("(^150010 940002 "+item+" 940010)"))errors.push("stale incomplete disposition "+item);
  if(native.includes("(^150010 940003 "+body+" 940014)"))errors.push("stale pending body state "+body);
}
for(const a of audits){
  if(a.status!=="PASS_CANDIDATE_CLOSED_PRIMITIVE"||a.proposed_disposition!=="CLOSED_PRIMITIVE")errors.push("audit disposition "+a.census_id);
  for(const t of [...a.body_analysis.primitive_extensional_incidences,...a.body_analysis.support_incidences]){
    const s="(^150010 "+t.join(" ")+")"; if(!native.includes(s))errors.push("missing "+a.census_id+" "+s);
  }
  const mi=manifest.items.find(x=>x.census_id===a.census_id);
  if(mi?.closure_mode!=="CLOSED_PRIMITIVE"||mi?.semantic_compilation_state!=="PRIMITIVE_CLOSED_AFTER_REGROUNDED_AUDIT")errors.push("manifest state "+a.census_id);
  if(mi?.primitive_closure?.qualified_qu_used||mi?.primitive_closure?.schema_used||mi?.primitive_closure?.cross_author_semantics_used)errors.push("invalid closure metadata "+a.census_id);
}
const closed=manifest.items.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED").map(x=>x.census_id).sort();
const expected=["L-SSC-022","L-SSC-121","L-SSC-189","L-SSC-190","L-SSC-191"];
if(JSON.stringify(closed)!==JSON.stringify(expected))errors.push("closed set mismatch "+JSON.stringify(closed));
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013","L-SSC-023"]))errors.push("pending set mismatch");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false||manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("firewall");
const result={pass:errors.length===0,errors,closed_ids:closed,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2)); if(!result.pass)process.exitCode=1;
