import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_REGROUNDED_0_10.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_10.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/W_SOURCE_ROLE_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const norm=s=>s.replace(/\s+/g,"");
const ROLE={AND:150001,OR:150002,NOT:150003,IMPLIES:150004,IFF:150005,FORALL:150006,EXISTS:150007,EQUAL:150008,APPLY:150009,PREDICATE_APPLICATION:150010,BINDER_OWNS:150011,DOMAIN_OF_BINDER:150012,RAW_CARRIER:150013,RAW_VALUE:150014,CONSTRUCTOR_TAG:150015,FIELD:150016,TRUE:150017,FALSE:150018,DEFINITION_EXPANDS_TO:150019,DERIVED_VIEW_OF:150020,QU_UNEXPANDED:150021,SOURCE_PROVENANCE:150022,PRIMITIVE_SUPPORT:150023,RAW_EXTENSION_TUPLE:150024};
const serialize=n=>n.kind==="RAW"?String(n.id):"(^"+ROLE[n.role]+(n.args?.length?" "+n.args.map(serialize).join(" "):"")+")";
const errors=[];

for(const d of derivation.items){
  const s=ssc.items.find(x=>x.id===d.census_id);
  if(!s)errors.push("missing SSC "+d.census_id);
  if(d.frozen_body!==s?.obligation)errors.push("frozen body mismatch "+d.census_id);
  const mi=manifest.items.find(x=>x.census_id===d.census_id);
  if(mi?.semantic_compilation_state!=="CORE_LOGIC_ROLE_COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest state "+d.census_id);
  if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("premature closure "+d.census_id);
  if(!mi?.primitive_formula_candidate?.body_formula)errors.push("formula candidate missing "+d.census_id);
  else if(!norm(native).includes(norm(serialize(mi.primitive_formula_candidate.body_formula))))errors.push("native formula missing "+d.census_id);
  const body=String(mi?.native_body_root_atom);
  if(!native.includes("(^150010 930003 "+body+" 930014)"))errors.push("compiled body state "+d.census_id);
  if(native.includes("(^150010 930003 "+body+" 930011)"))errors.push("stale unexpanded state "+d.census_id);
}

const counts={
  itemHasBody:(native.match(/\(\^150010\s+930001\s+\d+\s+\d+\)/g)||[]).length,
  incomplete:(native.match(/\(\^150010\s+930002\s+\d+\s+930010\)/g)||[]).length,
  closedPrimitive:(native.match(/\(\^150010\s+930002\s+\d+\s+930015\)/g)||[]).length,
  unexpanded:(native.match(/\(\^150010\s+930003\s+\d+\s+930011\)/g)||[]).length,
  compiled:(native.match(/\(\^150010\s+930003\s+\d+\s+930014\)/g)||[]).length,
  primitiveClosed:(native.match(/\(\^150010\s+930003\s+\d+\s+930016\)/g)||[]).length
};
const expectedCounts={itemHasBody:151,incomplete:137,closedPrimitive:14,unexpanded:128,compiled:9,primitiveClosed:14};
if(JSON.stringify(counts)!==JSON.stringify(expectedCounts))errors.push("state counts "+JSON.stringify(counts));
const pending=(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit||[]).slice().sort();
const expectedPending=derivation.items.map(x=>x.census_id).sort();
if(JSON.stringify(pending)!==JSON.stringify(expectedPending))errors.push("pending set");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==14)errors.push("accepted closure count");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false)errors.push("cross-author leak");
if(manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("packet authority leak");
if(derivation.target_behavior_imported!==false||derivation.closure_claim!==false)errors.push("derivation firewall");
const result={pass:errors.length===0,errors,counts,pending:expectedPending};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
