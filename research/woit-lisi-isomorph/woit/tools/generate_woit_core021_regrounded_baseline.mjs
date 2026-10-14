import fs from "node:fs";
import crypto from "node:crypto";
const root="research/woit-lisi-isomorph/w";
const ssc=JSON.parse(fs.readFileSync(root+"/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync(root+"/WOIT_NATIVE_COMPILATION_MANIFEST_0_2.json","utf8"));
const prior=JSON.parse(fs.readFileSync(root+"/CORE021_CLOSURE_LEDGER_0_47.json","utf8"));
const clone=x=>JSON.parse(JSON.stringify(x));
function canonical(v){if(Array.isArray(v))return "["+v.map(canonical).join(",")+"]";if(v&&typeof v==="object")return "{"+Object.keys(v).sort().map(k=>JSON.stringify(k)+":"+canonical(v[k])).join(",")+"}";return JSON.stringify(v);}
const H=v=>crypto.createHash("sha256").update(canonical(v)).digest("hex");
const scope=clone(prior.scope),governing_authority=clone(prior.governing_authority);
const inference_profile={id:"W_REGROUNDED_PRE_PRIMITIVE_CLOSURE_0_1",stage:"PRE_PRIMITIVE_CLOSURE_REGROUNDED",recursive_ia:false,cross_author_semantics:false,source_census_frozen:true,promotion_packets_authoritative:false,closure_admission_rule:"DERIVE_FROM_FROZEN_SSC_PLUS_AUTHORITATIVE_NATIVE_GRAPH_AND_QUALIFIED_AUTHORITY"};
const census=ssc.items.map(x=>({id:x.id,kind:x.kind||"source_semantic_obligation",source_provenance:x.source||x.source_provenance,scope_ref:scope.id,semantic_body_ref:"SOURCE_SEMANTIC_CENSUS_0_2.json#"+x.id}));
const mb=new Map(manifest.items.map(x=>[x.census_id,x]));
const nodes=census.map((c,i)=>{const m=mb.get(c.id);if(!m)throw new Error("manifest missing "+c.id);return {id:"W-BODY-"+String(i+1).padStart(3,"0"),native_atom:m.native_body_root_atom,classification:"UNEXPANDED_SOURCE_BODY",authoritative:true,authority_owner:"W_SOURCE_RENDERING",children:[],source_census_ids:[c.id],closure_mode:"INCOMPLETE_UNEXPANDED",reconstruction_path:[],unexpanded_dependencies:["PRIMITIVE_EXPANSION_REQUIRED"]};});
const dispositions=census.map((c,i)=>({census_id:c.id,closure_mode:"INCOMPLETE_UNEXPANDED",body_roots:["W-BODY-"+String(i+1).padStart(3,"0")],support_roots:[],dependency_roots:[],reconstruction_path:[],evidence_dispositions:[ssc.items[i].state||manifest.items[i]?.evidence_state||"OPEN"]}));
const ledger={version:"core-0.21-ledger-0.2",frozen:{qualification_target_id:prior.frozen.qualification_target_id,source_interpretation_sha256:prior.frozen.source_interpretation_sha256,source_semantic_census_sha256:H([...census].sort((a,b)=>a.id.localeCompare(b.id))),semantic_scope_sha256:H(scope),primitive_kernel_sha256:H([...nodes].sort((a,b)=>a.id.localeCompare(b.id))),qu_state_sha256:"NONE",governing_authority_sha256:H(governing_authority),inference_profile_sha256:H(inference_profile)},scope,governing_authority,inference_profile,census,nodes,dispositions,scope_revision:null,ia_fixed_point:null,diagnostic:{expected_strict_closure:false,reason:"Re-grounded zero-promotion baseline: "+census.length+" frozen W source bodies are authoritatively routed and intentionally INCOMPLETE_UNEXPANDED until graph-first primitive/schema derivation re-admits closure.",source_semantic_census:"SOURCE_SEMANTIC_CENSUS_0_2.json",native_manifest:"WOIT_NATIVE_COMPILATION_MANIFEST_0_2.json",prior_promoted_ledger_preserved_as_evidence:"CORE021_CLOSURE_LEDGER_0_47.json",process_audit:"../PROCESS_REGROUNDING_AUDIT_0_1.json",closure_packets_authoritative:false,current_closed_census_items:0}};
fs.writeFileSync(root+"/CORE021_REGROUNDED_BASELINE_0_1.json",JSON.stringify(ledger,null,2)+"\n");
console.log(JSON.stringify({census:census.length,closed:0,incomplete:census.length},null,2));
