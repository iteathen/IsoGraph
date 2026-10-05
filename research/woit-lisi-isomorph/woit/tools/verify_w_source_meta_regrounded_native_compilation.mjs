import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_REGROUNDED_0_6.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_6.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/W_SOURCE_META_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));

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
  if(!native.includes("(^150010 930003 "+d.body_root+" 930014)"))errors.push("compiled body state missing "+d.census_id);
  if(native.includes("(^150010 930003 "+d.body_root+" 930011)"))errors.push("stale unexpanded body state "+d.census_id);
}

const relationIds=[934003,934004,934006,934007,934008];
const statusIds=[934016,934017,934018,934019,934020,934021,934022,934023,934024];
for(const id of [...relationIds,...statusIds])if(!native.includes("(^150014 "+id+")"))errors.push("missing raw relation/status "+id);
for(const id of Object.keys(derivation.target_atoms))if(!native.includes("(^150013 "+id+")"))errors.push("missing opaque target "+id);

const counts={
  itemHasBody:(native.match(/\(\^150010\s+930001\s+\d+\s+\d+\)/g)||[]).length,
  incomplete:(native.match(/\(\^150010\s+930002\s+\d+\s+930010\)/g)||[]).length,
  closedPrimitive:(native.match(/\(\^150010\s+930002\s+\d+\s+930015\)/g)||[]).length,
  unexpanded:(native.match(/\(\^150010\s+930003\s+\d+\s+930011\)/g)||[]).length,
  compiled:(native.match(/\(\^150010\s+930003\s+\d+\s+930014\)/g)||[]).length,
  primitiveClosed:(native.match(/\(\^150010\s+930003\s+\d+\s+930016\)/g)||[]).length
};
const expected={itemHasBody:151,incomplete:146,closedPrimitive:5,unexpanded:141,compiled:5,primitiveClosed:5};
if(JSON.stringify(counts)!==JSON.stringify(expected))errors.push("state counts "+JSON.stringify(counts));

const pending=manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit?.slice().sort()||[];
const expectedPending=["W-SSC-016","W-SSC-057","W-SSC-109","W-SSC-110","W-SSC-111"].sort();
if(JSON.stringify(pending)!==JSON.stringify(expectedPending))errors.push("pending set");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==5)errors.push("accepted closure count");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false)errors.push("cross-author semantics leak");
if(manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("closure packet authority leak");
if(derivation.target_behavior_imported!==false||derivation.closure_claim!==false)errors.push("derivation firewall");

const result={pass:errors.length===0,errors,counts,pending:expectedPending,tuple_count:derivation.items.flatMap(x=>x.tuples).length};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
