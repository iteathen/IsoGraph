import fs from "node:fs";
import crypto from "node:crypto";

const root="research/woit-lisi-isomorph/woit";
const ssc=JSON.parse(fs.readFileSync(root+"/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const manifest=JSON.parse(fs.readFileSync(root+"/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_14.json","utf8"));
const native=fs.readFileSync(root+"/WOIT_NATIVE_COMPILATION_REGROUNDED_0_13.isg","utf8");

function canonical(v){
  if(Array.isArray(v))return "["+v.map(canonical).join(",")+"]";
  if(v&&typeof v==="object")return "{"+Object.keys(v).sort().map(k=>JSON.stringify(k)+":"+canonical(v[k])).join(",")+"}";
  return JSON.stringify(v);
}
const H=v=>crypto.createHash("sha256").update(canonical(v)).digest("hex");
const norm=s=>s.replace(/\s+/g,"");

const ROLE={
  AND:150001, OR:150002, NOT:150003, IMPLIES:150004, IFF:150005,
  FORALL:150006, EXISTS:150007, EQUAL:150008, APPLY:150009,
  PREDICATE_APPLICATION:150010, BINDER_OWNS:150011, DOMAIN_OF_BINDER:150012,
  RAW_CARRIER:150013, RAW_VALUE:150014, CONSTRUCTOR_TAG:150015, FIELD:150016,
  TRUE:150017, FALSE:150018, DEFINITION_EXPANDS_TO:150019,
  DERIVED_VIEW_OF:150020, QU_UNEXPANDED:150021, SOURCE_PROVENANCE:150022,
  PRIMITIVE_SUPPORT:150023, RAW_EXTENSION_TUPLE:150024
};

function serializeAst(n){
  if(n?.kind==="RAW") return String(n.id);
  if(n?.kind!=="OP"||!ROLE[n.role]) throw new Error("bad formula AST");
  return "(^"+ROLE[n.role]+(n.args?.length?" "+n.args.map(serializeAst).join(" "):"")+")";
}
function collectRaw(n,out=new Set()){
  if(n?.kind==="RAW"){out.add(n.id);return out;}
  for(const a of n?.args||[])collectRaw(a,out);
  return out;
}

const scope={
  id:"W_FULL_SOURCE_SCOPE_0_2",
  declared_census_ids:ssc.items.map(x=>x.id),
  boundary_refs:["../SOURCE_CORPUS_FREEZE_0_2.md","SOURCE_SEMANTIC_CENSUS_0_2.json","SOURCE_ASSERTION_CONSERVATION_0_2.md"]
};
const governing_authority={
  core:"0.17-0.21 cumulative",qu:"0.1",nei:"0.4",dts:"0.1",
  discovery:"0.1-0.10",experimental_inquiry:"0.1",
  campaign:"Woit full independent treatment — corrected SSC 0.2",
  cross_author_semantics:false
};
const closedIds=manifest.items.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED").map(x=>x.census_id).sort();
const inference_profile={
  id:"W_REGROUNDED_PARTIAL_PRIMITIVE_CLOSURE_0_6",
  stage:"PARTIAL_PRIMITIVE_CLOSURE_REGROUNDED",
  recursive_ia:false,cross_author_semantics:false,source_census_frozen:true,
  closed_census_items:closedIds.length,total_census_items:ssc.items.length,
  ia_gate:"NOT_AUTHORIZED",process_regrounding_audit:"../PROCESS_REGROUNDING_AUDIT_0_2.json",
  authoritative_native_manifest:"WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_14.json"
};
const census=ssc.items.map(x=>({
  id:x.id,kind:"SOURCE_SEMANTIC_OBLIGATION",source_provenance:x.source,
  scope_ref:scope.id,semantic_body_ref:"SOURCE_SEMANTIC_CENSUS_0_2.json#"+x.id
}));
const manifestById=new Map(manifest.items.map(x=>[x.census_id,x]));
const nodes=[],dispositions=[];

const rawNodeId=(cid,id)=>cid.replace(/-/g,"_")+"__RAW_"+id;
const incidenceNodeId=(cid,k,i)=>cid.replace(/-/g,"_")+"__"+k+"_I"+String(i+1).padStart(2,"0");
const formulaNodeId=(cid,path)=>cid.replace(/-/g,"_")+"__FORMULA_"+path;
const tupleText=t=>"(^150010 "+t.join(" ")+")";

function addRawNodes(cid,rawIds,rawMap){
  for(const atom of [...rawIds].sort((a,b)=>a-b)){
    if(rawMap.has(atom))continue;
    const id=rawNodeId(cid,atom);rawMap.set(atom,id);
    nodes.push({id,native_atom:atom,classification:"RAW_DATA_ATOM",authoritative:true,authority_owner:"W_SOURCE_RENDERING",children:[],source_census_ids:[cid],closure_mode:"CLOSED_PRIMITIVE",reconstruction_path:[],unexpanded_dependencies:[]});
  }
}
function buildFormulaNode(cid,n,path,rawMap){
  if(n.kind==="RAW")return rawMap.get(n.id);
  const id=formulaNodeId(cid,path);
  const children=(n.args||[]).map((a,i)=>buildFormulaNode(cid,a,path+"_A"+String(i+1).padStart(2,"0"),rawMap));
  nodes.push({id,classification:"CORE_PRIMITIVE",primitive_role:n.role,primitive_role_id:ROLE[n.role],authoritative:true,authority_owner:"CORE",children,native_fragment:serializeAst(n),source_census_ids:[cid],closure_mode:"CLOSED_PRIMITIVE",reconstruction_path:[],unexpanded_dependencies:[]});
  return id;
}
function addSupport(cid,support,rawMap){
  return support.map((t,k)=>{
    if(!native.includes(tupleText(t)))throw new Error("native support tuple missing "+cid+" "+tupleText(t));
    const id=incidenceNodeId(cid,"SUPPORT",k);
    nodes.push({id,classification:"CORE_PRIMITIVE",primitive_role:"PREDICATE_APPLICATION",primitive_role_id:150010,authoritative:true,authority_owner:"CORE",children:t.map(x=>rawMap.get(x)),native_tuple:[150010,...t],source_census_ids:[cid],closure_mode:"CLOSED_PRIMITIVE",reconstruction_path:[],unexpanded_dependencies:[]});
    return id;
  });
}

for(let i=0;i<census.length;i++){
  const c=census[i],mi=manifestById.get(c.id);
  if(!mi)throw new Error("manifest missing "+c.id);

  if(mi.closure_mode==="INCOMPLETE_UNEXPANDED"){
    const id="W-BODY-"+String(i+1).padStart(3,"0");
    nodes.push({id,native_atom:mi.native_body_root_atom,classification:"UNEXPANDED_SOURCE_BODY",authoritative:true,authority_owner:"W_SOURCE_RENDERING",children:[],source_census_ids:[c.id],closure_mode:"INCOMPLETE_UNEXPANDED",reconstruction_path:[],unexpanded_dependencies:["GRAPH_FIRST_PRIMITIVE_OR_SCHEMA_REDUCTION_REQUIRED"]});
    dispositions.push({census_id:c.id,closure_mode:"INCOMPLETE_UNEXPANDED",body_roots:[id],support_roots:[],dependency_roots:[],reconstruction_path:[],evidence_dispositions:[ssc.items[i].state]});
    continue;
  }
  if(mi.closure_mode!=="CLOSED_PRIMITIVE")throw new Error("unsupported current closure mode "+mi.closure_mode+" for "+c.id);

  if(mi.primitive_closure){
    const pc=mi.primitive_closure;
    if(!pc.audit||pc.qualified_qu_used||pc.schema_used||pc.cross_author_semantics_used)throw new Error("invalid primitive closure metadata "+c.id);
    const body=pc.body_incidences||[],support=pc.support_incidences||[];
    if(!body.length)throw new Error("closed item has no body incidences "+c.id);
    for(const t of body)if(!native.includes(tupleText(t)))throw new Error("native body tuple missing "+c.id+" "+tupleText(t));
    const rawIds=new Set([...(pc.raw_atoms||[]).map(x=>x.id),...body.flat(),...support.flat()]);
    const rawMap=new Map();addRawNodes(c.id,rawIds,rawMap);
    const bodyRoots=body.map((t,k)=>{
      const id=incidenceNodeId(c.id,"BODY",k);
      nodes.push({id,classification:"CORE_PRIMITIVE",primitive_role:"PREDICATE_APPLICATION",primitive_role_id:150010,authoritative:true,authority_owner:"CORE",children:t.map(x=>rawMap.get(x)),native_tuple:[150010,...t],source_census_ids:[c.id],closure_mode:"CLOSED_PRIMITIVE",reconstruction_path:[],unexpanded_dependencies:[]});
      return id;
    });
    const supportRoots=addSupport(c.id,support,rawMap);
    dispositions.push({census_id:c.id,closure_mode:"CLOSED_PRIMITIVE",body_roots:bodyRoots,support_roots:supportRoots,dependency_roots:[],reconstruction_path:[c.id,...bodyRoots,...supportRoots],evidence_dispositions:[ssc.items[i].state,"REGROUNDED_NATIVE_PRIMITIVE_CLOSURE_AUDIT_PASS"]});
    continue;
  }

  if(mi.primitive_formula_closure){
    const pc=mi.primitive_formula_closure;
    if(!pc.audit||pc.qualified_qu_used||pc.schema_used||pc.cross_author_semantics_used)throw new Error("invalid formula closure metadata "+c.id);
    const formula=pc.body_formula,support=pc.support_incidences||[];
    const serialized=serializeAst(formula);
    if(!norm(native).includes(norm(serialized)))throw new Error("native formula missing "+c.id);
    const rawIds=collectRaw(formula);
    for(const t of support)for(const x of t)rawIds.add(x);
    const rawMap=new Map();addRawNodes(c.id,rawIds,rawMap);
    const formulaRoot=buildFormulaNode(c.id,formula,"ROOT",rawMap);
    const supportRoots=addSupport(c.id,support,rawMap);
    dispositions.push({census_id:c.id,closure_mode:"CLOSED_PRIMITIVE",body_roots:[formulaRoot],support_roots:supportRoots,dependency_roots:[],reconstruction_path:[c.id,formulaRoot,...supportRoots],evidence_dispositions:[ssc.items[i].state,"REGROUNDED_NATIVE_CORE_LOGIC_CLOSURE_AUDIT_PASS"]});
    continue;
  }
  throw new Error("closed item lacks recognized graph-derived closure metadata "+c.id);
}

const authoritativeNodes=nodes.filter(x=>x.authoritative).sort((a,b)=>a.id.localeCompare(b.id));
const ledger={
  version:"core-0.21-ledger-0.2",
  frozen:{
    qualification_target_id:"WOIT_FULL_RENDERING_0_2",
    source_interpretation_sha256:"183c3132f72bc3f3dd49b08ad00716aa69a96972d5b18d90077bd178797cb807",
    source_semantic_census_sha256:H([...census].sort((a,b)=>a.id.localeCompare(b.id))),
    semantic_scope_sha256:H(scope),primitive_kernel_sha256:H(authoritativeNodes),qu_state_sha256:"NONE",
    governing_authority_sha256:H(governing_authority),inference_profile_sha256:H(inference_profile)
  },
  scope,governing_authority,inference_profile,census,nodes,dispositions,scope_revision:null,ia_fixed_point:null,
  diagnostic:{
    expected_strict_closure:false,process_regrounding:true,accepted_closed_items:closedIds.length,
    closed_primitive:closedIds.length,closed_schema:0,incomplete_unexpanded:ssc.items.length-closedIds.length,
    historical_candidate_ledger:"CORE021_CLOSURE_LEDGER_0_47.json",
    historical_promoted_items_preserved_as_research_evidence:79,
    authoritative_native_manifest:"WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_14.json",
    rule:"Closure is extracted only from audited current-native incidences or Core formula ASTs; historical closure packets are not authority."
  }
};
if(process.argv.includes("--write"))fs.writeFileSync(root+"/CORE021_CLOSURE_LEDGER_0_54.json",JSON.stringify(ledger,null,2)+"\n");
console.log(JSON.stringify({census:census.length,closed_primitive:closedIds.length,closed_schema:0,incomplete:ssc.items.length-closedIds.length,closed_ids:closedIds,primitive_kernel_sha256:ledger.frozen.primitive_kernel_sha256},null,2));
