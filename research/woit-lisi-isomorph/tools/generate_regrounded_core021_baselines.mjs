import fs from "node:fs";
import crypto from "node:crypto";

const root="research/woit-lisi-isomorph";

function canonical(v){
  if(Array.isArray(v)) return "["+v.map(canonical).join(",")+"]";
  if(v&&typeof v==="object") return "{"+Object.keys(v).sort().map(k=>JSON.stringify(k)+":"+canonical(v[k])).join(",")+"}";
  return JSON.stringify(v);
}
const H=v=>crypto.createHash("sha256").update(canonical(v)).digest("hex");

const configs={
  W:{
    dir:"woit",
    ssc:"SOURCE_SEMANTIC_CENSUS_0_2.json",
    manifest:"WOIT_NATIVE_COMPILATION_MANIFEST_0_2.json",
    output:"CORE021_CLOSURE_LEDGER_0_48.json",
    target:"WOIT_FULL_RENDERING_0_2",
    scopeId:"W_FULL_SOURCE_SCOPE_0_2",
    boundaryRefs:["../SOURCE_CORPUS_FREEZE_0_2.md","SOURCE_SEMANTIC_CENSUS_0_2.json","SOURCE_ASSERTION_CONSERVATION_0_2.md"],
    sourceInterpretationSha256:"183c3132f72bc3f3dd49b08ad00716aa69a96972d5b18d90077bd178797cb807",
    campaign:"Woit full independent treatment — corrected SSC 0.2",
    bodyPrefix:"W-BODY-",
    authorityOwner:"W_SOURCE_RENDERING",
    historicalLedger:"CORE021_CLOSURE_LEDGER_0_47.json",
    historicalPromoted:79,
    censusMap:(x,scopeId)=>({
      id:x.id,
      kind:"SOURCE_SEMANTIC_OBLIGATION",
      source_provenance:x.source,
      scope_ref:scopeId,
      semantic_body_ref:"SOURCE_SEMANTIC_CENSUS_0_2.json#"+x.id
    }),
    evidence:x=>x.state
  },
  L:{
    dir:"lisi",
    ssc:"SOURCE_SEMANTIC_CENSUS_0_2.json",
    manifest:"LISI_NATIVE_COMPILATION_MANIFEST_0_4.json",
    output:"CORE021_CLOSURE_LEDGER_0_18.json",
    target:"LISI_FULL_RENDERING_0_2",
    scopeId:"L_FULL_SOURCE_SCOPE_0_2",
    boundaryRefs:["../SOURCE_CORPUS_FREEZE_0_2.md","SOURCE_SEMANTIC_CENSUS_0_2.json","LISI_SSC_SOURCE_CORRECTION_0_2.md"],
    sourceInterpretationSha256:"bbcf7ea5ec9d4a46729d16a1fb2756ae1c3d4b44989741fb3e5f340c6162e03c",
    campaign:"Lisi full independent treatment",
    bodyPrefix:"L-BODY-",
    authorityOwner:"L_SOURCE_RENDERING",
    historicalLedger:"CORE021_CLOSURE_LEDGER_0_16.json",
    historicalPromoted:39,
    censusMap:(x,scopeId)=>({
      id:x.id,
      kind:x.kind||"source_semantic_obligation",
      source_provenance:x.source_provenance,
      scope_ref:scopeId,
      semantic_body_ref:"SOURCE_SEMANTIC_CENSUS_0_2.json#"+x.id
    }),
    evidence:x=>x.source_disposition_hint||x.state||"SOURCE_ASSERTED"
  }
};

function build(track){
  const c=configs[track];
  const dir=root+"/"+c.dir;
  const ssc=JSON.parse(fs.readFileSync(dir+"/"+c.ssc,"utf8"));
  const manifest=JSON.parse(fs.readFileSync(dir+"/"+c.manifest,"utf8"));

  if(manifest.frozen_ssc!==c.ssc) throw new Error(track+": manifest not pinned to "+c.ssc);
  if(ssc.items.length!==manifest.items.length) throw new Error(track+": census/manifest count mismatch");

  const manifestById=new Map(manifest.items.map(x=>[x.census_id,x]));
  const census=ssc.items.map(x=>c.censusMap(x,c.scopeId));
  const censusIds=census.map(x=>x.id);
  const manifestIds=manifest.items.map(x=>x.census_id);
  if(new Set(censusIds).size!==censusIds.length) throw new Error(track+": duplicate census ID");
  if(censusIds.some(id=>!manifestById.has(id)) || manifestIds.some(id=>!censusIds.includes(id)))
    throw new Error(track+": manifest/census membership mismatch");

  const scope={id:c.scopeId,declared_census_ids:censusIds,boundary_refs:c.boundaryRefs};
  const governing_authority={
    core:"0.17-0.21 cumulative",
    qu:"0.1",
    nei:"0.4",
    dts:"0.1",
    discovery:"0.1-0.10",
    experimental_inquiry:"0.1",
    campaign:c.campaign,
    cross_author_semantics:false
  };
  const inference_profile={
    id:track+"_REGROUNDED_PRE_PRIMITIVE_CLOSURE_0_1",
    stage:"PRE_PRIMITIVE_CLOSURE_REGROUNDED",
    recursive_ia:false,
    cross_author_semantics:false,
    source_census_frozen:true,
    closed_census_items:0,
    total_census_items:census.length,
    ia_gate:"NOT_AUTHORIZED",
    process_regrounding_audit:"../PROCESS_REGROUNDING_AUDIT_0_2.json"
  };

  const nodes=census.map((item,i)=>{
    const m=manifestById.get(item.id);
    if(!Number.isInteger(m.native_body_root_atom)) throw new Error(track+": missing native body root for "+item.id);
    return {
      id:c.bodyPrefix+String(i+1).padStart(3,"0"),
      native_atom:m.native_body_root_atom,
      classification:"UNEXPANDED_SOURCE_BODY",
      authoritative:true,
      authority_owner:c.authorityOwner,
      children:[],
      source_census_ids:[item.id],
      closure_mode:"INCOMPLETE_UNEXPANDED",
      reconstruction_path:[],
      unexpanded_dependencies:["GRAPH_FIRST_PRIMITIVE_OR_SCHEMA_REDUCTION_REQUIRED"]
    };
  });

  const dispositions=census.map((item,i)=>({
    census_id:item.id,
    closure_mode:"INCOMPLETE_UNEXPANDED",
    body_roots:[c.bodyPrefix+String(i+1).padStart(3,"0")],
    support_roots:[],
    dependency_roots:[],
    reconstruction_path:[],
    evidence_dispositions:[c.evidence(ssc.items[i])]
  }));

  const censusCanonical=[...census].sort((a,b)=>String(a.id).localeCompare(String(b.id)));
  const kernel=[...nodes].sort((a,b)=>String(a.id).localeCompare(String(b.id)));
  const ledger={
    version:"core-0.21-ledger-0.2",
    frozen:{
      qualification_target_id:c.target,
      source_interpretation_sha256:c.sourceInterpretationSha256,
      source_semantic_census_sha256:H(censusCanonical),
      semantic_scope_sha256:H(scope),
      primitive_kernel_sha256:H(kernel),
      qu_state_sha256:"NONE",
      governing_authority_sha256:H(governing_authority),
      inference_profile_sha256:H(inference_profile)
    },
    scope,
    governing_authority,
    inference_profile,
    census,
    nodes,
    dispositions,
    scope_revision:null,
    ia_fixed_point:null,
    diagnostic:{
      expected_strict_closure:false,
      process_regrounding:true,
      accepted_closed_items:0,
      incomplete_unexpanded:census.length,
      historical_candidate_ledger:c.historicalLedger,
      historical_promoted_items_preserved_as_research_evidence:c.historicalPromoted,
      authoritative_native_manifest:c.manifest,
      rule:"No closure packet, domain-familiar schema, or ledger-added node may promote its own source item. Closure must be regenerated from the authoritative native graph plus qualified authority."
    }
  };
  return {config:c,ledger};
}

const W=build("W"), L=build("L");
const summary={
  W:{output:W.config.output,census:W.ledger.census.length,closed:0,incomplete:W.ledger.dispositions.length,kernel:W.ledger.frozen.primitive_kernel_sha256},
  L:{output:L.config.output,census:L.ledger.census.length,closed:0,incomplete:L.ledger.dispositions.length,kernel:L.ledger.frozen.primitive_kernel_sha256}
};

if(process.argv.includes("--write")){
  fs.writeFileSync(root+"/woit/"+W.config.output,JSON.stringify(W.ledger,null,2)+"\n");
  fs.writeFileSync(root+"/lisi/"+L.config.output,JSON.stringify(L.ledger,null,2)+"\n");
}
console.log(JSON.stringify(summary,null,2));
