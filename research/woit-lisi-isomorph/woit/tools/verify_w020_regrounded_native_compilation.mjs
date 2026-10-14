import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_REGROUNDED_0_2.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_2.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/W020_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));

const errors=[];
const item=ssc.items.find(x=>x.id==="W-SSC-020");
if(!item)errors.push("SSC W020 missing");
if(derivation.frozen_body!==item?.obligation)errors.push("frozen body mismatch");

const required=[
  "(^150010 930000 930106 931020)",
  "(^150010 930005 931020 930106)",
  "(^150010 930001 931020 932020)",
  "(^150010 930002 931020 930010)",
  "(^150010 930003 932020 930014)",
  "(^150010 934000 932020 934010)",
  "(^150010 934001 932020 934011)"
];
for(const x of required)if(!native.includes(x))errors.push("missing "+x);

if(native.includes("(^150010 930003 932020 930011)"))errors.push("stale W020 unexpanded body-state remains");
if(!native.includes("(^150014 930014)")||!native.includes("(^150014 934000)")||!native.includes("(^150014 934001)")||!native.includes("(^150013 934010)")||!native.includes("(^150014 934011)"))errors.push("declaration missing");

const itemHasBody=(native.match(/\(\^150010\s+930001\s+\d+\s+\d+\)/g)||[]).length;
const incomplete=(native.match(/\(\^150010\s+930002\s+\d+\s+930010\)/g)||[]).length;
const closedRouting=(native.match(/\(\^150010\s+930002\s+\d+\s+930012\)/g)||[]).length;
const unexpanded=(native.match(/\(\^150010\s+930003\s+\d+\s+930011\)/g)||[]).length;
const expanded=(native.match(/\(\^150010\s+930003\s+\d+\s+930013\)/g)||[]).length;
const compiled=(native.match(/\(\^150010\s+930003\s+\d+\s+930014\)/g)||[]).length;

if(itemHasBody!==151)errors.push("routing census cardinality changed");
if(incomplete!==151||closedRouting!==0)errors.push("closure disposition changed during compilation");
if(unexpanded!==150||expanded!==0||compiled!==1)errors.push("body-state counts incorrect");

const mi=manifest.items.find(x=>x.census_id==="W-SSC-020");
if(mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest compilation state");
if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("manifest prematurely closes W020");
if(manifest.items.some(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED"))errors.push("manifest inherited closure survived");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==0)errors.push("manifest accepted closure");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false)errors.push("cross-author semantics leak");
if(manifest.regrounded_compilation?.closure_packets_authoritative!==false)errors.push("closure packet authority leak");
if("carried_forward_closure_packets" in manifest)errors.push("historical closure packets remain on current authority surface");
if(derivation.mathematical_target_semantics_imported!==false||derivation.closure_claim!==false)errors.push("derivation firewall");

const result={
  census_id:"W-SSC-020",
  pass:errors.length===0,
  errors,
  item_has_body:itemHasBody,
  incomplete_dispositions:incomplete,
  closed_routing_dispositions:closedRouting,
  unexpanded_bodies:unexpanded,
  compiled_pending_closure:compiled
};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
