import fs from "node:fs";
const m=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_14.json","utf8"));
const a13=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L013_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const a23=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L023_REGROUNDED_PRIMITIVE_CLOSURE_AUDIT_0_1.json","utf8"));
const errors=[];
for(const [id,a] of [["L-SSC-013",a13],["L-SSC-023",a23]]){
  const mi=m.items.find(x=>x.census_id===id);
  if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest must remain open "+id);
  if(!String(a.status).startsWith("DEFERRED_INCOMPLETE"))errors.push("audit status "+id);
  if(a.core020_gate?.dependency_closure_sufficient!==false||a.core020_gate?.disposition!=="INCOMPLETE_UNEXPANDED")errors.push("anti-evasion gate "+id);
}
const result={pass:errors.length===0,errors,L013:a13.status,L023:a23.status};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
