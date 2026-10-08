import fs from "node:fs";
import crypto from "node:crypto";
const ssc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const prior=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/CORE021_CLOSURE_LEDGER_0_25.json","utf8"));
const ledger=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/CORE021_CLOSURE_LEDGER_0_26.json","utf8"));
function canonical(v){if(Array.isArray(v))return "["+v.map(canonical).join(",")+"]";if(v&&typeof v==="object")return "{"+Object.keys(v).sort().map(k=>JSON.stringify(k)+":"+canonical(v[k])).join(",")+"}";return JSON.stringify(v);}
const H=v=>crypto.createHash("sha256").update(canonical(v)).digest("hex");
const errors=[];
if(ssc.items.length!==191||ledger.census.length!==191)errors.push("cardinality");
for(let i=0;i<191;i++){
  const s=ssc.items[i],c=ledger.census[i];
  if(c.id!==s.id)errors.push("id "+i);
  if(c.kind!==(s.kind||"source_semantic_obligation"))errors.push("kind "+s.id);
  if(c.source_provenance!==s.source_provenance)errors.push("source "+s.id);
  if(c.scope_ref!==ledger.scope.id)errors.push("scope "+s.id);
  if(c.semantic_body_ref!=="SOURCE_SEMANTIC_CENSUS_0_2.json#"+s.id)errors.push("body ref "+s.id);
}
const sorted=[...ledger.census].sort((a,b)=>a.id.localeCompare(b.id));
if(H(sorted)!==ledger.frozen.source_semantic_census_sha256)errors.push("canonical hash mismatch");
if(ledger.frozen.source_semantic_census_sha256!=="60ea1b8210005dd08e275fa1e6b08080f57a7e3a73f8aa91fd292037c908b6c7")errors.push("restored hash mismatch");
if(prior.frozen.source_semantic_census_sha256!=="87f31b343bfcde73c79b1e63b553b51b5aaf160ccc5ef3e1de267af3618eb099")errors.push("bad predecessor hash unexpected");
for(const k of ["primitive_kernel_sha256","semantic_scope_sha256","qu_state_sha256","governing_authority_sha256","inference_profile_sha256","source_interpretation_sha256","qualification_target_id"])if(ledger.frozen[k]!==prior.frozen[k])errors.push("unrelated frozen field changed "+k);
const result={pass:errors.length===0,errors,restored_hash:ledger.frozen.source_semantic_census_sha256,accepted_closed:ledger.dispositions.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED").length,incomplete:ledger.dispositions.filter(x=>x.closure_mode==="INCOMPLETE_UNEXPANDED").length};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
