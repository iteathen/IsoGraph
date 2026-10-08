import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_REGROUNDED_0_4.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_4.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/W_MODALITY_BATCH_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));

const errors=[];
for(const d of derivation.items){
  const s=ssc.items.find(x=>x.id===d.census_id);
  if(!s)errors.push("missing SSC "+d.census_id);
  if(d.frozen_body!==s?.obligation)errors.push("frozen body mismatch "+d.census_id);
  for(const t of d.tuples){
    const x="(^150010 "+t.join(" ")+")";
    if(!native.includes(x))errors.push("missing tuple "+d.census_id+" "+x);
  }
  const mi=manifest.items.find(x=>x.census_id===d.census_id);
  if(mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest compilation state "+d.census_id);
  if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("premature closure "+d.census_id);
  const body=String(d.body_root);
  if(!native.includes("(^150010 930003 "+body+" 930014)"))errors.push("compiled body state missing "+d.census_id);
  if(native.includes("(^150010 930003 "+body+" 930011)"))errors.push("stale unexpanded body state "+d.census_id);
}
const declared=["(^150014 934002)","(^150014 934012)","(^150014 934013)","(^150014 934014)","(^150014 934015)"];
for(const x of declared)if(!native.includes(x))errors.push("missing status declaration "+x);
for(const id of Object.keys(derivation.target_atoms))if(!native.includes("(^150013 "+id+")"))errors.push("missing opaque target "+id);

const itemHasBody=(native.match(/\(\^150010\s+930001\s+\d+\s+\d+\)/g)||[]).length;
const incomplete=(native.match(/\(\^150010\s+930002\s+\d+\s+930010\)/g)||[]).length;
const closedPrimitive=(native.match(/\(\^150010\s+930002\s+\d+\s+930015\)/g)||[]).length;
const unexpanded=(native.match(/\(\^150010\s+930003\s+\d+\s+930011\)/g)||[]).length;
const compiled=(native.match(/\(\^150010\s+930003\s+\d+\s+930014\)/g)||[]).length;
const primitiveClosed=(native.match(/\(\^150010\s+930003\s+\d+\s+930016\)/g)||[]).length;
if(itemHasBody!==151)errors.push("routing census cardinality");
if(incomplete!==150||closedPrimitive!==1)errors.push("closure disposition count");
if(unexpanded!==146||compiled!==4||primitiveClosed!==1)errors.push("body-state count");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==1)errors.push("accepted closure count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit?.slice().sort())!==JSON.stringify(["W-SSC-018","W-SSC-044","W-SSC-046","W-SSC-078"].sort()))errors.push("pending set");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false)errors.push("cross-author semantics leak");
if(manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("closure packet authority leak");
if("carried_forward_closure_packets" in manifest)errors.push("current packet authority surface");
if(derivation.target_behavior_imported!==false||derivation.closure_claim!==false)errors.push("derivation firewall");

const result={pass:errors.length===0,errors,census_items:itemHasBody,incomplete,closedPrimitive,unexpanded,compiled,primitiveClosed,pending:derivation.items.map(x=>x.census_id)};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
