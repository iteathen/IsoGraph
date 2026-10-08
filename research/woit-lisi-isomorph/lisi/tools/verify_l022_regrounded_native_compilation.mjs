import fs from "node:fs";

const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_1.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_1.json","utf8"));
const derivation=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L022_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));

const errors=[];
const item=ssc.items.find(x=>x.id==="L-SSC-022");
if(!item)errors.push("SSC L022 missing");
if(derivation.frozen_body!==item?.body)errors.push("frozen body mismatch");
const required=[
  "(^150010 940001 941022 942022)",
  "(^150010 940002 941022 940010)",
  "(^150010 940003 942022 940014)",
  "(^150010 944000 942022 942021)",
  "(^150010 944001 942022 944010)",
  "(^150010 944002 944010 940099 944011)"
];
for(const x of required)if(!native.includes(x))errors.push("missing "+x);
if(native.includes("(^150010 940003 942022 940011)"))errors.push("stale L022 unexpanded body-state remains");
if(!native.includes("(^150014 940014)")||!native.includes("(^150014 944000)")||!native.includes("(^150013 944010)"))errors.push("declaration missing");
const itemHasBody=(native.match(/\(\^150010\s+940001\s+\d+\s+\d+\)/g)||[]).length;
if(itemHasBody!==191)errors.push("routing census cardinality changed");
const incomplete=(native.match(/\(\^150010\s+940002\s+\d+\s+940010\)/g)||[]).length;
if(incomplete!==191)errors.push("closure disposition changed during compilation");
const unexpanded=(native.match(/\(\^150010\s+940003\s+\d+\s+940011\)/g)||[]).length;
const compiled=(native.match(/\(\^150010\s+940003\s+\d+\s+940014\)/g)||[]).length;
if(unexpanded!==190||compiled!==1)errors.push("body-state counts incorrect");
const mi=manifest.items.find(x=>x.census_id==="L-SSC-022");
if(mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest compilation state");
if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("manifest prematurely closes L022");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==0)errors.push("manifest accepted closure");
if(manifest.regrounded_compilation?.cross_author_semantics_imported!==false)errors.push("cross-author semantics leak");
if(derivation.mathematical_target_semantics_imported!==false||derivation.closure_claim!==false)errors.push("derivation firewall");
const result={census_id:"L-SSC-022",pass:errors.length===0,errors,item_has_body:itemHasBody,incomplete_dispositions:incomplete,unexpanded_bodies:unexpanded,compiled_pending_closure:compiled};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
