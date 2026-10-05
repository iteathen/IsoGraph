import fs from "node:fs";
import crypto from "node:crypto";

const root="research/woit-lisi-isomorph/lisi";
const ssc=JSON.parse(fs.readFileSync(root+"/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync(root+"/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_12.json","utf8"));
const native=fs.readFileSync(root+"/LISI_NATIVE_COMPILATION_REGROUNDED_0_12.isg","utf8");

function canonical(v){
  if(Array.isArray(v))return "["+v.map(canonical).join(",")+"]";
  if(v&&typeof v==="object")return "{"+Object.keys(v).sort().map(k=>JSON.stringify(k)+":"+canonical(v[k])).join(",")+"}";
  return JSON.stringify(v);
}
const H=v=>crypto.createHash("sha256").update(canonical(v)).digest("hex");

const scope={
  id:"L_FULL_SOURCE_SCOPE_0_2",
  declared_census_ids:ssc.items.map(x=>x.id),
  boundary_refs:["../SOURCE_CORPUS_FREEZE_0_2.md","SOURCE_SEMANTIC_CENSUS_0_2.json","LISI_SSC_SOURCE_CORRECTION_0_2.md"]
};
const governing_authority={
  core:"0.17-0.21 cumulative",
  qu:"0.1",
  nei:"0.4",
  dts:"0.1",
  discovery:"0.1-0.10",
  experimental_inquiry:"0.1",
  campaign:"Lisi full independent treatment",
  cross_author_semantics:false
};
const closedIds=manifest.items.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED").map(x=>x.census_id).sort();
const inference_profile={
  id:"L_REGROUNDED_PARTIAL_PRIMITIVE_CLOSURE_0_4",
  stage:"PARTIAL_PRIMITIVE_CLOSURE_REGROUNDED",
  recursive_ia:false,
  cross_author_semantics:false,
  source_census_frozen:true,
  closed_census_items:closedIds.length,
  total_census_items:ssc.items.length,
  ia_gate:"NOT_AUTHORIZED",
  process_regrounding_audit:"../PROCESS_REGROUNDING_AUDIT_0_2.json",
  authoritative_native_manifest:"LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_12.json"
};
const census=ssc.items.map(x=>({
  id:x.id,
  kind:x.kind||"source_semantic_obligation",
  source_provenance:x.source_provenance,
  scope_ref:scope.id,
  semantic_body_ref:"SOURCE_SEMANTIC_CENSUS_0_2.json#"+x.id
}));
const manifestById=new Map(manifest.items.map(x=>[x.census_id,x]));
const nodes=[],dispositions=[];

function tupleText(tuple){return "(^150010 "+tuple.join(" ")+")";}
function rawNodeId(censusId,id){return censusId.replace(/-/g,"_")+"__RAW_"+id;}
function incidenceNodeId(censusId,kind,index){return censusId.replace(/-/g,"_")+"__"+kind+"_I"+String(index+1).padStart(2,"0");}

for(let i=0;i<census.length;i++){
  const c=census[i],mi=manifestById.get(c.id);
  if(!mi)throw new Error("manifest missing "+c.id);

  if(mi.closure_mode==="INCOMPLETE_UNEXPANDED"){
    const id="L-BODY-"+String(i+1).padStart(3,"0");
    nodes.push({
      id,native_atom:mi.native_body_root_atom,classification:"UNEXPANDED_SOURCE_BODY",
      authoritative:true,authority_owner:"L_SOURCE_RENDERING",children:[],source_census_ids:[c.id],
      closure_mode:"INCOMPLETE_UNEXPANDED",reconstruction_path:[],
      unexpanded_dependencies:["GRAPH_FIRST_PRIMITIVE_OR_SCHEMA_REDUCTION_REQUIRED"]
    });
    dispositions.push({
      census_id:c.id,closure_mode:"INCOMPLETE_UNEXPANDED",body_roots:[id],
      support_roots:[],dependency_roots:[],reconstruction_path:[],
      evidence_dispositions:[ssc.items[i].source_disposition_hint||"SOURCE_ASSERTED"]
    });
    continue;
  }

  if(mi.closure_mode!=="CLOSED_PRIMITIVE")throw new Error("unsupported current closure mode "+mi.closure_mode+" for "+c.id);
  const pc=mi.primitive_closure;
  if(!pc||!pc.audit)throw new Error("primitive closure metadata missing for "+c.id);
  if(pc.qualified_qu_used||pc.schema_used||pc.cross_author_semantics_used)throw new Error("invalid CLOSED_PRIMITIVE metadata for "+c.id);

  const body=pc.body_incidences||[],support=pc.support_incidences||[];
  if(!body.length)throw new Error("closed item has no body incidences "+c.id);
  for(const tuple of [...body,...support])if(!native.includes(tupleText(tuple)))throw new Error("native tuple missing "+c.id+" "+tupleText(tuple));

  const rawIds=[...new Set([...(pc.raw_atoms||[]).map(x=>x.id),...body.flat(),...support.flat()])].sort((a,b)=>a-b);
  const rawMap=new Map();
  for(const atom of rawIds){
    const rid=rawNodeId(c.id,atom);rawMap.set(atom,rid);
    nodes.push({
      id:rid,native_atom:atom,classification:"RAW_DATA_ATOM",authoritative:true,
      authority_owner:"L_SOURCE_RENDERING",children:[],source_census_ids:[c.id],
      closure_mode:"CLOSED_PRIMITIVE",reconstruction_path:[],unexpanded_dependencies:[]
    });
  }
  const bodyRoots=body.map((tuple,k)=>{
    const id=incidenceNodeId(c.id,"BODY",k);
    nodes.push({
      id,classification:"CORE_PRIMITIVE",primitive_role:"PREDICATE_APPLICATION",
      authoritative:true,authority_owner:"CORE",children:tuple.map(x=>rawMap.get(x)),
      native_tuple:[150010,...tuple],source_census_ids:[c.id],closure_mode:"CLOSED_PRIMITIVE",
      reconstruction_path:[],unexpanded_dependencies:[]
    });
    return id;
  });
  const supportRoots=support.map((tuple,k)=>{
    const id=incidenceNodeId(c.id,"SUPPORT",k);
    nodes.push({
      id,classification:"CORE_PRIMITIVE",primitive_role:"PREDICATE_APPLICATION",
      authoritative:true,authority_owner:"CORE",children:tuple.map(x=>rawMap.get(x)),
      native_tuple:[150010,...tuple],source_census_ids:[c.id],closure_mode:"CLOSED_PRIMITIVE",
      reconstruction_path:[],unexpanded_dependencies:[]
    });
    return id;
  });
  dispositions.push({
    census_id:c.id,closure_mode:"CLOSED_PRIMITIVE",body_roots:bodyRoots,
    support_roots:supportRoots,dependency_roots:[],
    reconstruction_path:[c.id,...bodyRoots,...supportRoots],
    evidence_dispositions:[ssc.items[i].source_disposition_hint||"SOURCE_ASSERTED","REGROUNDED_NATIVE_PRIMITIVE_CLOSURE_AUDIT_PASS"]
  });
}

const authoritativeNodes=[...nodes].filter(x=>x.authoritative).sort((a,b)=>a.id.localeCompare(b.id));
const ledger={
  version:"core-0.21-ledger-0.2",
  frozen:{
    qualification_target_id:"LISI_FULL_RENDERING_0_2",
    source_interpretation_sha256:"bbcf7ea5ec9d4a46729d16a1fb2756ae1c3d4b44989741fb3e5f340c6162e03c",
    source_semantic_census_sha256:H([...census].sort((a,b)=>a.id.localeCompare(b.id))),
    semantic_scope_sha256:H(scope),
    primitive_kernel_sha256:H(authoritativeNodes),
    qu_state_sha256:"NONE",
    governing_authority_sha256:H(governing_authority),
    inference_profile_sha256:H(inference_profile)
  },
  scope,governing_authority,inference_profile,census,nodes,dispositions,
  scope_revision:null,ia_fixed_point:null,
  diagnostic:{
    expected_strict_closure:false,process_regrounding:true,
    accepted_closed_items:closedIds.length,closed_primitive:closedIds.length,closed_schema:0,
    incomplete_unexpanded:ssc.items.length-closedIds.length,
    historical_candidate_ledger:"CORE021_CLOSURE_LEDGER_0_16.json",
    historical_non_authoritative_successor:"CORE021_CLOSURE_LEDGER_0_17.json",
    historical_promoted_items_preserved_as_research_evidence:39,
    authoritative_native_manifest:"LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_12.json",
    rule:"Closure is extracted only from audited current-native incidences; historical closure packets are not authority."
  }
};
if(process.argv.includes("--write"))fs.writeFileSync(root+"/CORE021_CLOSURE_LEDGER_0_22.json",JSON.stringify(ledger,null,2)+"\n");
console.log(JSON.stringify({census:census.length,closed_primitive:closedIds.length,closed_schema:0,incomplete:ssc.items.length-closedIds.length,closed_ids:closedIds,primitive_kernel_sha256:ledger.frozen.primitive_kernel_sha256},null,2));
