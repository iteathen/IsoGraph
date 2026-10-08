import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_26.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_26.json","utf8"));
const review=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_L06_ACTION_SUMMARY_BLOCKER_REOPEN_0_1.json","utf8"));
const errors=[],norm=s=>s.replace(/\s+/g,"");
const old=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_L06_ACTION_SUMMARY_LOGIC_REGROUNDED_NATIVE_DERIVATION_0_1.json","utf8"));
const repair=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L178_REGROUNDED_CORE_SUPPORT_NATIVE_DERIVATION_0_2.json","utf8"));
for(const row of [old.items.find(x=>x.census_id==="L-SSC-177"),repair])if(norm(native).includes(norm(row.serialized_formula)))errors.push("blocked formula remains");
for(const n of [177,178]){
 if(!native.includes("(^150010 940002 "+(941000+n)+" 940010)")||!native.includes("(^150010 940003 "+(942000+n)+" 940011)"))errors.push("reopen routing "+n);
 const mi=manifest.items.find(x=>x.census_id==="L-SSC-"+n);
 if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED"||mi?.unexpanded!==true||mi?.semantic_compilation_state!=="REOPENED_UNEXPANDED_AFTER_PRIMITIVE_CLOSURE_REVIEW")errors.push("manifest "+n);
}
for(const id of [944116,944117,944118,944119,944123,944124,...Array.from({length:14},(_,i)=>944198+i)])if(native.includes(String(id)))errors.push("stale candidate atom "+id);
if(review.status!=="REOPEN_L177_L178_INCOMPLETE_UNEXPANDED")errors.push("review status");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==18)errors.push("closed count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013"]))errors.push("pending");
const result={pass:errors.length===0,errors,accepted_closed:18,reopened:["L-SSC-177","L-SSC-178"],pending:["L-SSC-013"]};console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
