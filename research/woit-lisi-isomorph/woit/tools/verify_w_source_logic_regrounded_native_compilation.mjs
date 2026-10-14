import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_REGROUNDED_0_8.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_8.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/W_SOURCE_LOGIC_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const norm=s=>s.replace(/\s+/g,"");
const N=norm(native);
const errors=[];

for(const d of derivation.items){
  const s=ssc.items.find(x=>x.id===d.census_id);
  if(!s)errors.push("missing SSC "+d.census_id);
  if(d.frozen_body!==s?.obligation)errors.push("frozen body mismatch "+d.census_id);
  const mi=manifest.items.find(x=>x.census_id===d.census_id);
  if(mi?.semantic_compilation_state!=="CORE_LOGIC_COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest state "+d.census_id);
  if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("premature closure "+d.census_id);
  const body=String(mi?.native_body_root_atom);
  if(!native.includes("(^150010 930003 "+body+" 930014)"))errors.push("compiled body state "+d.census_id);
  if(native.includes("(^150010 930003 "+body+" 930011)"))errors.push("stale unexpanded state "+d.census_id);
}
const expected=[
"(^150019 932021 (^150001 (^150010 934002 932021 934310 934033) (^150004 (^150010 934002 932021 934310 934033) (^150010 934002 932021 934311 934034))))",
"(^150019 932025 (^150001 (^150010 934002 932025 934320 934035) (^150004 (^150010 934031 934320 934321) (^150010 934030 934320))))",
"(^150019 932058 (^150001 (^150010 934002 932058 934320 934040) (^150010 934002 932058 934320 934039) (^150010 934002 932058 934320 934041) (^150010 934002 932058 934331 934038) (^150004 (^150001 (^150010 934002 932058 934320 934040) (^150010 934002 932058 934320 934039) (^150010 934002 932058 934320 934041) (^150010 934002 932058 934331 934038)) (^150003 (^150010 934032 934320 934332)))))",
"(^150019 932121 (^150001 (^150010 934002 932121 934340 934036) (^150010 934002 932121 934340 934037) (^150010 934002 932121 934341 934033) (^150010 934002 932121 934342 934038) (^150004 (^150001 (^150010 934002 932121 934340 934036) (^150010 934002 932121 934340 934037) (^150010 934002 932121 934341 934033) (^150010 934002 932121 934342 934038)) (^150010 934002 932121 934340 934034))))"
];
for(const x of expected)if(!N.includes(norm(x)))errors.push("missing logical formula "+x.slice(0,24));

for(const id of [934030,934031,934032,934033,934034,934035,934036,934037,934038,934039,934040,934041])if(!native.includes("(^150014 "+id+")"))errors.push("missing raw value "+id);
for(const id of [934310,934311,934320,934321,934331,934332,934340,934341,934342])if(!native.includes("(^150013 "+id+")"))errors.push("missing raw target "+id);

const counts={
  itemHasBody:(native.match(/\(\^150010\s+930001\s+\d+\s+\d+\)/g)||[]).length,
  incomplete:(native.match(/\(\^150010\s+930002\s+\d+\s+930010\)/g)||[]).length,
  closedPrimitive:(native.match(/\(\^150010\s+930002\s+\d+\s+930015\)/g)||[]).length,
  unexpanded:(native.match(/\(\^150010\s+930003\s+\d+\s+930011\)/g)||[]).length,
  compiled:(native.match(/\(\^150010\s+930003\s+\d+\s+930014\)/g)||[]).length,
  primitiveClosed:(native.match(/\(\^150010\s+930003\s+\d+\s+930016\)/g)||[]).length
};
const expectedCounts={itemHasBody:151,incomplete:141,closedPrimitive:10,unexpanded:137,compiled:4,primitiveClosed:10};
if(JSON.stringify(counts)!==JSON.stringify(expectedCounts))errors.push("state counts "+JSON.stringify(counts));

const pending=(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit||[]).slice().sort();
const expectedPending=["W-SSC-021","W-SSC-025","W-SSC-058","W-SSC-121"].sort();
if(JSON.stringify(pending)!==JSON.stringify(expectedPending))errors.push("pending set");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==10)errors.push("accepted closure count");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false)errors.push("cross-author semantics leak");
if(manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("closure packet authority leak");
if(derivation.target_behavior_imported!==false||derivation.closure_claim!==false)errors.push("derivation firewall");

const result={pass:errors.length===0,errors,counts,pending:expectedPending,formula_count:expected.length};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
