import fs from 'node:fs';
import crypto from 'node:crypto';

const inputPath='experiments/062/L_G1_DEPENDENCY_CONE_SOURCE_INCIDENCE_0_2.json';
const defaultOutput='experiments/062/L_G2_DEPENDENCY_CONE_NEUTRAL_SUBGRAPH_0_1.json';
const outputPath=process.argv[2]||defaultOutput;
const read=p=>fs.readFileSync(p,'utf8');
const blobSha=p=>{
 const b=Buffer.from(read(p),'utf8');
 return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const S=JSON.parse(read(inputPath));
if(S.status!=='TARGETED_G1_SOURCE_INCIDENCE_REOPEN_FORMULA_COMPLETE_CANDIDATE')throw new Error('unexpected G1 supplement status');

let nOcc=0,nArg=0,nFormula=0,nTerm=0,nOutput=0,nRaw=0,nEdge=0;
const occNode=new Map();
for(const item of S.items)for(const o of item.occurrences){
 nOcc++;
 occNode.set(o.occurrence_id,'L-G2R-O'+String(nOcc).padStart(4,'0'));
}

const items=[];
const allNodes=[];
const allEdges=[];
const addEdge=(kind,from,to,position,prov={})=>{
 nEdge++;
 const e={edge_id:'L-G2R-E'+String(nEdge).padStart(5,'0'),kind,from,to,...prov};
 if(position!==undefined)e.position=position;
 allEdges.push(e);
 return e;
};

function termNode(token,ctx){
 nTerm++;
 const id='L-G2R-T'+String(nTerm).padStart(5,'0');
 allNodes.push({node_id:id,kind:'FORMULA_TERM_SLOT',provenance:{...ctx,source_term:String(token)}});
 return id;
}

function formulaNode(ast,ctx){
 if(typeof ast==='string'||typeof ast==='number'||typeof ast==='boolean')return termNode(ast,ctx);
 if(!ast||typeof ast!=='object')throw new Error('bad AST '+JSON.stringify(ast));
 if(!ast.op)throw new Error('formula object missing op '+JSON.stringify(ast));
 nFormula++;
 const id='L-G2R-F'+String(nFormula).padStart(5,'0');
 allNodes.push({
  node_id:id,
  kind:'OPAQUE_SOURCE_OPERATION_APPLICATION',
  research_state:'UNEXPANDED_SEMANTIC_OCCURRENCE',
  provenance:{...ctx,source_operation_label:ast.op}
 });
 let pos=0;
 for(const a of ast.args||[]){
  pos++;
  const child=formulaNode(a,{...ctx,formula_parent_op:ast.op,formula_position:pos});
  addEdge('ORDERED_FORMULA_ARGUMENT_INCIDENCE',id,child,pos,{provenance_occurrence_id:ctx.occurrence_id});
 }
 for(const out of ast.outputs||[]){
  pos++;
  nOutput++;
  const rid='L-G2R-R'+String(nOutput).padStart(5,'0');
  allNodes.push({node_id:rid,kind:'FORMULA_RESULT_ROLE_SLOT',provenance:{...ctx,source_role_label:out.role}});
  addEdge('ORDERED_FORMULA_RESULT_ROLE_INCIDENCE',id,rid,pos,{provenance_occurrence_id:ctx.occurrence_id});
  const expr=formulaNode(out.expr,{...ctx,formula_parent_op:ast.op,result_role:out.role});
  addEdge('FORMULA_RESULT_EXPRESSION_INCIDENCE',rid,expr,1,{provenance_occurrence_id:ctx.occurrence_id});
 }
 return id;
}

function rawBundleNode(key,value,ctx){
 nRaw++;
 const id='L-G2R-D'+String(nRaw).padStart(5,'0');
 allNodes.push({node_id:id,kind:'RAW_SOURCE_DATA_BUNDLE',provenance:{...ctx,source_data_key:key,source_data_value:value}});
 return id;
}

for(const item of S.items){
 const itemNodeIds=[];
 for(const o of item.occurrences){
  const oid=occNode.get(o.occurrence_id);
  const node={
   node_id:oid,
   kind:'OPAQUE_SEMANTIC_OCCURRENCE',
   research_state:'UNEXPANDED_SEMANTIC_OCCURRENCE',
   provenance:{
    census_id:item.census_id,
    occurrence_id:o.occurrence_id,
    source_reversible_reference:o.source_reversible_reference,
    source_span:o.source_span,
    relation_span:o.relation_span,
    logical_force_source:o.logical_force,
    definition_status_source:o.definition_status,
    load_bearing_note:o.load_bearing_note
   }
  };
  allNodes.push(node); itemNodeIds.push(oid);

  (o.argument_spans||[]).forEach((a,i)=>{
   nArg++;
   const aid='L-G2R-A'+String(nArg).padStart(5,'0');
   allNodes.push({node_id:aid,kind:'ORDERED_ARGUMENT_SLOT',provenance:{census_id:item.census_id,occurrence_id:o.occurrence_id,argument_position:i+1,argument_span:a}});
   addEdge('ORDERED_ARGUMENT_INCIDENCE',oid,aid,i+1,{provenance_occurrence_id:o.occurrence_id});
  });

  (o.depends_on||[]).forEach((d,i)=>{
   const did=occNode.get(d);
   if(!did)throw new Error('dependency target missing '+o.occurrence_id+' -> '+d);
   addEdge('SOURCE_DEPENDENCY_INCIDENCE',oid,did,i+1,{provenance_occurrence_id:o.occurrence_id,provenance_target_occurrence_id:d});
  });

  if(o.formula_ast){
   const fid=formulaNode(o.formula_ast,{census_id:item.census_id,occurrence_id:o.occurrence_id});
   addEdge('FORMULA_REFINEMENT_INCIDENCE',oid,fid,1,{provenance_occurrence_id:o.occurrence_id});
  }

  for(const key of ['raw_case_dimensions','raw_signatures']){
   if(o[key]!==undefined){
    const did=rawBundleNode(key,o[key],{census_id:item.census_id,occurrence_id:o.occurrence_id});
    addEdge('RAW_SOURCE_DATA_INCIDENCE',oid,did,1,{provenance_occurrence_id:o.occurrence_id});
   }
  }
 }
 items.push({census_id:item.census_id,occurrence_root_nodes:itemNodeIds});
}

const graph={
 schema:'isograph.exp062-l-g2-dependency-cone-neutral-subgraph.v0.1',
 date:'2026-10-07',
 status:'TARGETED_G2_DEPENDENCY_CLOSED_NEUTRAL_SUBGRAPH_CANDIDATE',
 authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
 authority:false,
 track:'L',
 governing_method:S.governing_method,
 input:{path:inputPath,git_blob_sha:blobSha(inputPath)},
 scope:{
  census_ids:S.scope.target_census_ids,
  source_expansion:false,
  cross_track_evidence_used:false,
  replaces_global_G2:false,
  purpose:'Targeted successor subgraph used to diagnose and re-run the affected dependency cone before any integration into the full L graph.'
 },
 neutrality_contract:{
  source_operation_labels:'PROVENANCE_ONLY_NOT_GRAPH_CLASS_KEYS',
  source_term_labels:'PROVENANCE_ONLY_NOT_GRAPH_CLASS_KEYS',
  source_role_labels:'PROVENANCE_ONLY_NOT_GRAPH_CLASS_KEYS',
  source_relation_spans:'PROVENANCE_ONLY_NOT_GRAPH_CLASS_KEYS',
  node_kinds:[
   'OPAQUE_SEMANTIC_OCCURRENCE',
   'ORDERED_ARGUMENT_SLOT',
   'OPAQUE_SOURCE_OPERATION_APPLICATION',
   'FORMULA_TERM_SLOT',
   'FORMULA_RESULT_ROLE_SLOT',
   'RAW_SOURCE_DATA_BUNDLE'
  ],
  edge_kinds:[
   'ORDERED_ARGUMENT_INCIDENCE',
   'SOURCE_DEPENDENCY_INCIDENCE',
   'FORMULA_REFINEMENT_INCIDENCE',
   'ORDERED_FORMULA_ARGUMENT_INCIDENCE',
   'ORDERED_FORMULA_RESULT_ROLE_INCIDENCE',
   'FORMULA_RESULT_EXPRESSION_INCIDENCE',
   'RAW_SOURCE_DATA_INCIDENCE'
  ],
  forbidden_inference:[
   'No source-domain word is used as a semantic category or quotient key.',
   'No historical PD-* category or B-* candidate basis ID is used.',
   'No DNWF/DNIA authority is used.',
   'No W track or synthesis evidence is used.',
   'No familiar mathematical definition is imported.'
  ]
 },
 counts:{
  reopened_bodies:S.counts.reopened_bodies,
  semantic_occurrence_roots:nOcc,
  ordered_argument_nodes:nArg,
  formula_application_nodes:nFormula,
  formula_term_nodes:nTerm,
  formula_result_role_nodes:nOutput,
  raw_source_data_nodes:nRaw,
  total_nodes:allNodes.length,
  total_edges:allEdges.length,
  source_dependency_edges:allEdges.filter(e=>e.kind==='SOURCE_DEPENDENCY_INCIDENCE').length,
  formula_refinement_edges:allEdges.filter(e=>e.kind==='FORMULA_REFINEMENT_INCIDENCE').length
 },
 items,
 nodes:allNodes,
 edges:allEdges,
 next_stage:'TARGETED_G3_QUALIFIED_CORE_DEFINABILITY_PASS'
};
fs.writeFileSync(outputPath,JSON.stringify(graph,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,counts:graph.counts},null,2));
