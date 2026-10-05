import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_2.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_2.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L121_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const errors=[];
const item=ssc.items.find(x=>x.id==="L-SSC-121");
if(derivation.frozen_body!==item?.body)errors.push("frozen body mismatch");
for(const x of [
 "(^150010 940001 941121 942121)",
 "(^150010 940002 941121 940010)",
 "(^150010 940003 942121 940014)",
 "(^150010 944003 942121 942119)",
 "(^150010 944004 942121 940104)",
 "(^150010 944002 940104 942121 944012)"
])if(!native.includes(x))errors.push("missing "+x);
if(native.includes("(^150010 940003 942121 940011)"))errors.push("stale L121 unexpanded state");
const itemHasBody=(native.match(/\(\^150010\s+940001\s+\d+\s+\d+\)/g)||[]).length;
const incomplete=(native.match(/\(\^150010\s+940002\s+\d+\s+940010\)/g)||[]).length;
const unexpanded=(native.match(/\(\^150010\s+940003\s+\d+\s+940011\)/g)||[]).length;
const compiled=(native.match(/\(\^150010\s+940003\s+\d+\s+940014\)/g)||[]).length;
if(itemHasBody!==191)errors.push("routing cardinality");
if(incomplete!==191)errors.push("closure disposition changed");
if(unexpanded!==189||compiled!==2)errors.push("body state counts");
const mi=manifest.items.find(x=>x.census_id==="L-SSC-121");
if(mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest compile state");
if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("premature L121 closure");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==0)errors.push("accepted closure");
if(manifest.regrounded_compilation?.compiled_census_items?.join(",")!=="L-SSC-022,L-SSC-121")errors.push("compiled set");
if(derivation.target_mathematical_semantics_imported!==false||derivation.closure_claim!==false)errors.push("firewall");
const result={census_id:"L-SSC-121",pass:errors.length===0,errors,item_has_body:itemHasBody,incomplete_dispositions:incomplete,unexpanded_bodies:unexpanded,compiled_pending_closure:compiled};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
