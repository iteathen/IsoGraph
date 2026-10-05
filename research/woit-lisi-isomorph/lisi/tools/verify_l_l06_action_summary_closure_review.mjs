import fs from "node:fs";
const native=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_REGROUNDED_0_24.isg","utf8");
const manifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_24.json","utf8"));
const review=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/L_L06_ACTION_SUMMARY_LOGIC_CLOSURE_REVIEW_0_1.json","utf8"));
const errors=[];
if(review.status!=="ONE_PASS_TWO_BLOCKED")errors.push("review");
if(!native.includes("(^150010 940002 941167 940015)")||!native.includes("(^150010 940003 942167 940016)"))errors.push("L167 routing");
for(const cid of ["L-SSC-177","L-SSC-178"]){const n=Number(cid.slice(-3)),mi=manifest.items.find(x=>x.census_id===cid);if(mi?.closure_mode!=="INCOMPLETE_UNEXPANDED")errors.push("premature "+cid);if(mi?.primitive_closure_review?.status!=="BLOCKED_UNEXPANDED_DOMAIN_RELATION")errors.push("block state "+cid);if(!native.includes("(^150010 940002 "+(941000+n)+" 940010)")||!native.includes("(^150010 940003 "+(942000+n)+" 940014)"))errors.push("blocked routing "+cid);}
const m=manifest.items.find(x=>x.census_id==="L-SSC-167");if(m?.closure_mode!=="CLOSED_PRIMITIVE"||!m?.primitive_formula_closure)errors.push("L167 manifest");
if(manifest.regrounded_compilation?.accepted_closed_census_items!==18)errors.push("count");
if(JSON.stringify(manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit)!==JSON.stringify(["L-SSC-013","L-SSC-177","L-SSC-178"]))errors.push("pending");
const result={pass:errors.length===0,errors,accepted_closed:18,blocked:["L-SSC-177","L-SSC-178"],pending:manifest.regrounded_compilation?.compiled_pending_primitive_closure_audit};console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
