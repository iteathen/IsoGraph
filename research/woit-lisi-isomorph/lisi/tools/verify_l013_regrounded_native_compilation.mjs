import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_4.isg","utf8");
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_4.json","utf8"));
const d=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L013_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const errors=[];const item=ssc.items.find(x=>x.id==="L-SSC-013");
if(d.frozen_body!==item?.body)errors.push("frozen body mismatch");
for(const n of [188,189,190,191]){const x="(^150010 944005 942013 942"+String(n).padStart(3,"0")+")";if(!native.includes(x))errors.push("missing "+x);}
for(const x of ["(^150010 940002 941013 940010)","(^150010 940003 942013 940014)"])if(!native.includes(x))errors.push("missing "+x);
if(native.includes("(^150010 940003 942013 940011)"))errors.push("stale L013 body state");
const incomplete=(native.match(/\(\^150010\s+940002\s+\d+\s+940010\)/g)||[]).length;
const unexpanded=(native.match(/\(\^150010\s+940003\s+\d+\s+940011\)/g)||[]).length;
const compiled=(native.match(/\(\^150010\s+940003\s+\d+\s+940014\)/g)||[]).length;
if(incomplete!==191||unexpanded!==187||compiled!==4)errors.push("state counts");
const mi=manifest.items.find(x=>x.census_id==="L-SSC-013");
if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.semantic_compilation_state!=="COMPILED_PENDING_PRIMITIVE_CLOSURE_AUDIT")errors.push("manifest state");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==0||d.closure_claim!==false)errors.push("premature closure");
const result={census_id:"L-SSC-013",pass:errors.length===0,errors,incomplete_dispositions:incomplete,unexpanded_bodies:unexpanded,compiled_pending_closure:compiled};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
