import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_REGROUNDED_0_26.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_23.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/W_FINAL_SOURCE_SUMMARY_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const ROLE={AND:150001,OR:150002,NOT:150003,IMPLIES:150004,IFF:150005,FORALL:150006,EXISTS:150007,EQUAL:150008,APPLY:150009,PREDICATE_APPLICATION:150010,BINDER_OWNS:150011,DOMAIN_OF_BINDER:150012,RAW_CARRIER:150013,RAW_VALUE:150014,CONSTRUCTOR_TAG:150015,FIELD:150016,TRUE:150017,FALSE:150018,DEFINITION_EXPANDS_TO:150019,DERIVED_VIEW_OF:150020,QU_UNEXPANDED:150021,SOURCE_PROVENANCE:150022,PRIMITIVE_SUPPORT:150023,RAW_EXTENSION_TUPLE:150024};
const serialize=n=>n.kind==="RAW"?String(n.id):"(^"+ROLE[n.role]+(n.args?.length?" "+n.args.map(serialize).join(" "):"")+")";
const norm=s=>s.replace(/\s+/g,"");
const N=norm(native),errors=[],ids=derivation.items.map(x=>x.census_id);
for(const d of derivation.items){
  const s=ssc.items.find(x=>x.id===d.census_id);
  const mi=manifest.items.find(x=>x.census_id===d.census_id);
  if(!s)errors.push("missing SSC "+d.census_id);
  if(d.frozen_body!==s?.obligation)errors.push("frozen body mismatch "+d.census_id);
  if(!mi)errors.push("manifest item missing "+d.census_id);
  if(mi?.semantic_compilation_state!=="CORE_LOGIC_COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest state "+d.census_id);
  if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("premature closure "+d.census_id);
  if(!mi?.primitive_formula_candidate?.body_formula)errors.push("formula candidate missing "+d.census_id);
  else if(!N.includes(norm(serialize(mi.primitive_formula_candidate.body_formula))))errors.push("native formula missing "+d.census_id);
  const body=mi?.native_body_root_atom;
  if(!native.includes("(^150010 930003 "+body+" 930014)"))errors.push("compiled state missing "+d.census_id);
  if(native.includes("(^150010 930003 "+body+" 930011)"))errors.push("stale unexpanded state "+d.census_id);
  for(const t of mi?.primitive_formula_candidate?.support_incidences||[]){
    const x="(^150010 "+t.join(" ")+")";
    if(!native.includes(x))errors.push("support incidence missing "+d.census_id+" "+x);
  }
}
for(const id of Object.keys(derivation.relation_atoms))if(!native.includes("(^150014 "+id+")"))errors.push("relation declaration missing "+id);
for(const id of Object.keys(derivation.status_atoms))if(!native.includes("(^150014 "+id+")"))errors.push("status declaration missing "+id);
for(const id of Object.keys(derivation.target_atoms))if(!native.includes("(^150013 "+id+")"))errors.push("target declaration missing "+id);
const counts={
  itemHasBody:(native.match(/\(\^150010\s+930001\s+\d+\s+\d+\)/g)||[]).length,
  incomplete:(native.match(/\(\^150010\s+930002\s+\d+\s+930010\)/g)||[]).length,
  closedPrimitive:(native.match(/\(\^150010\s+930002\s+\d+\s+930015\)/g)||[]).length,
  unexpanded:(native.match(/\(\^150010\s+930003\s+\d+\s+930011\)/g)||[]).length,
  compiled:(native.match(/\(\^150010\s+930003\s+\d+\s+930014\)/g)||[]).length,
  primitiveClosed:(native.match(/\(\^150010\s+930003\s+\d+\s+930016\)/g)||[]).length
};
const expected={itemHasBody:151,incomplete:87,closedPrimitive:64,unexpanded:84,compiled:3,primitiveClosed:64};
if(JSON.stringify(counts)!==JSON.stringify(expected))errors.push("state counts "+JSON.stringify(counts));
const pending=(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit||[]).slice().sort();
if(JSON.stringify(pending)!==JSON.stringify(ids.slice().sort()))errors.push("pending set");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==64)errors.push("accepted closure count");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false)errors.push("cross-author semantics leak");
if(manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("closure packet authority leak");
if(derivation.target_behavior_imported!==false||derivation.closure_claim!==false)errors.push("derivation firewall");
const result={pass:errors.length===0,errors,counts,pending:ids.slice().sort(),formula_count:ids.length};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;