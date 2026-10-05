import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_12.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_12.json","utf8"));
const audit=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_MODALITY_BATCH_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const errors=[];
if(audit.status!=="PASS_4_CANDIDATE_CLOSED_PRIMITIVE")errors.push("audit status");
for(const row of audit.items){
  const n=Number(row.census_id.slice(-3)),item=941000+n,body=942000+n;
  if(!native.includes("(^150010 940002 "+item+" 940015)"))errors.push("closed disposition "+row.census_id);
  if(!native.includes("(^150010 940003 "+body+" 940016)"))errors.push("closed body state "+row.census_id);
  if(native.includes("(^150010 940002 "+item+" 940010)"))errors.push("stale incomplete "+row.census_id);
  if(native.includes("(^150010 940003 "+body+" 940014)"))errors.push("stale pending "+row.census_id);
  for(const t of [...row.body_incidences,...row.support_incidences]){
    const q="(^150010 "+t.join(" ")+")"; if(!native.includes(q))errors.push("missing tuple "+row.census_id+" "+q);
  }
  const mi=manifest.items.find(x=>x.census_id===row.census_id);
  if(mi?.closure_mode!=="CLOSED_PRIMITIVE"||mi?.semantic_compilation_state!=="PRIMITIVE_CLOSED_AFTER_REGROUNDED_AUDIT")errors.push("manifest state "+row.census_id);
  if(mi?.primitive_closure?.qualified_qu_used||mi?.primitive_closure?.schema_used||mi?.primitive_closure?.cross_author_semantics_used)errors.push("bad closure metadata "+row.census_id);
}
const closed=manifest.items.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED").map(x=>x.census_id).sort();
const expected=["L-SSC-022","L-SSC-048","L-SSC-049","L-SSC-069","L-SSC-091","L-SSC-121","L-SSC-189","L-SSC-190","L-SSC-191"];
if(JSON.stringify(closed)!==JSON.stringify(expected))errors.push("closed set "+JSON.stringify(closed));
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013","L-SSC-023"]))errors.push("pending set");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false||manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("firewall");
const result={pass:errors.length===0,errors,closed_ids:closed,pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
