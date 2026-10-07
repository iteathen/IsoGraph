import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const graphPath='experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_1.json';
const waiverPath='experiments/062/G1_OWNER_COLD_AUDIT_WAIVER_0_1.json';
const generatorPath='experiments/062/tools/generate-w-g2-neutral-occurrence-graph-0-1.mjs';

const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const graph=JSON.parse(fs.readFileSync(graphPath,'utf8'));
const waiver=JSON.parse(fs.readFileSync(waiverPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

if(graph.schema!=='isograph.exp062-w-g2-neutral-occurrence-graph.v0.1') fail('schema mismatch');
if(graph.track!=='W') fail('track mismatch');
if(graph.status!=='G2_NEUTRAL_OCCURRENCE_GRAPH_CANDIDATE') fail('status mismatch');
if(graph.authority!==false) fail('G2 artifact must remain non-authority');
if(graph.input?.path!==extractionPath) fail('input path mismatch');
if(graph.input?.git_blob_sha!==blob(extractionPath)) fail('input blob mismatch');
if(graph.input?.owner_waiver!==waiverPath) fail('waiver path mismatch');
if(graph.input?.owner_waiver_git_blob_sha!==blob(waiverPath)) fail('waiver blob mismatch');

const gate=waiver.gate_ruling||{};
if(gate.W_G1_accepted_for_this_campaign!==true||gate.joint_G1_campaign_gate_satisfied!==true||gate.G2_authorized_for_this_campaign!==true) fail('waiver does not authorize W G2');
if(graph.gate?.independent_cold_audit_satisfied!==false) fail('skipped cold audit must not be represented as satisfied');
if(graph.gate?.independent_cold_audit_waived_for_this_campaign!==true) fail('waiver marker missing');
if(graph.gate?.waiver_is_reusable!==false) fail('waiver must remain non-reusable');

if(!Array.isArray(graph.items)||graph.items.length!==84) fail('graph must contain 84 W bodies');
if(JSON.stringify(graph.items.map(x=>x.census_id))!==JSON.stringify(extraction.items.map(x=>x.census_id))) fail('body order mismatch');

let occNodes=0,argNodes=0,argEdges=0,depEdges=0;
const globalNodeIds=new Set(), globalEdgeIds=new Set();
for(let bi=0;bi<extraction.items.length;bi++){
  const src=extraction.items[bi];
  const gi=graph.items?.[bi];
  if(!gi) continue;
  if(gi.census_id!==src.census_id) fail(src.census_id+': census mismatch');
  if(gi.source_extraction_status!==src.extraction_status) fail(src.census_id+': extraction status mismatch');
  const nodes=gi.graph?.nodes||[];
  const edges=gi.graph?.edges||[];
  const nodeIds=new Set(nodes.map(n=>n.node_id));
  for(const id of nodeIds) {
    if(globalNodeIds.has(id)) fail('duplicate global node id '+id);
    globalNodeIds.add(id);
  }
  for(const e of edges){
    if(globalEdgeIds.has(e.edge_id)) fail('duplicate global edge id '+e.edge_id);
    globalEdgeIds.add(e.edge_id);
    if(!nodeIds.has(e.from)||!nodeIds.has(e.to)) fail(src.census_id+': edge leaves body '+e.edge_id);
  }

  const occurrenceNodes=nodes.filter(n=>n.kind==='OPAQUE_SEMANTIC_OCCURRENCE');
  const argumentNodes=nodes.filter(n=>n.kind==='ORDERED_ARGUMENT_SLOT');
  occNodes+=occurrenceNodes.length;
  argNodes+=argumentNodes.length;

  if(occurrenceNodes.length!==(src.occurrences||[]).length) fail(src.census_id+': occurrence-node count mismatch');

  const byOccurrence=new Map(occurrenceNodes.map(n=>[n.provenance?.occurrence_id,n]));
  for(const occ of src.occurrences||[]){
    const n=byOccurrence.get(occ.occurrence_id);
    if(!n){ fail(occ.occurrence_id+': occurrence node missing'); continue; }
    if(n.research_state!=='UNEXPANDED_SEMANTIC_OCCURRENCE') fail(occ.occurrence_id+': unresolved marker missing');
    const p=n.provenance||{};
    for(const [k,v] of Object.entries({
      census_id:src.census_id,
      occurrence_id:occ.occurrence_id,
      source_span:occ.source_span,
      relation_span:occ.relation_span,
      logical_force_source:occ.logical_force,
      definition_status_source:occ.definition_status,
      load_bearing_note:occ.load_bearing_note
    })) if(p[k]!==v) fail(occ.occurrence_id+': provenance mismatch '+k);

    const ae=edges.filter(e=>e.kind==='ORDERED_ARGUMENT_INCIDENCE'&&e.provenance_occurrence_id===occ.occurrence_id).sort((a,b)=>a.position-b.position);
    argEdges+=ae.length;
    if(ae.length!==(occ.argument_spans||[]).length) fail(occ.occurrence_id+': argument-edge count mismatch');
    for(let i=0;i<(occ.argument_spans||[]).length;i++){
      const e=ae[i];
      if(!e||e.position!==i+1) fail(occ.occurrence_id+': argument position mismatch '+(i+1));
      const an=nodes.find(x=>x.node_id===e?.to);
      if(an?.kind!=='ORDERED_ARGUMENT_SLOT') fail(occ.occurrence_id+': argument target kind mismatch');
      if(an?.provenance?.argument_span!==occ.argument_spans[i]) fail(occ.occurrence_id+': argument span mismatch '+(i+1));
      if(an?.provenance?.argument_position!==i+1) fail(occ.occurrence_id+': argument-node position mismatch '+(i+1));
    }

    const de=edges.filter(e=>e.kind==='INTRA_BODY_DEPENDENCY_INCIDENCE'&&e.provenance_occurrence_id===occ.occurrence_id).sort((a,b)=>a.position-b.position);
    depEdges+=de.length;
    if(de.length!==(occ.depends_on||[]).length) fail(occ.occurrence_id+': dependency-edge count mismatch');
    for(let i=0;i<(occ.depends_on||[]).length;i++){
      const e=de[i];
      if(!e||e.position!==i+1||e.provenance_target_occurrence_id!==occ.depends_on[i]) fail(occ.occurrence_id+': dependency mismatch '+(i+1));
      const tn=nodes.find(x=>x.node_id===e?.to);
      if(tn?.provenance?.occurrence_id!==occ.depends_on[i]) fail(occ.occurrence_id+': dependency target mismatch '+(i+1));
    }
  }

  for(const n of nodes) if(!['OPAQUE_SEMANTIC_OCCURRENCE','ORDERED_ARGUMENT_SLOT'].includes(n.kind)) fail(src.census_id+': forbidden node kind '+n.kind);
  for(const e of edges) if(!['ORDERED_ARGUMENT_INCIDENCE','INTRA_BODY_DEPENDENCY_INCIDENCE'].includes(e.kind)) fail(src.census_id+': forbidden edge kind '+e.kind);
}

const expectedOcc=extraction.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
const expectedArgs=extraction.items.reduce((n,x)=>n+(x.occurrences||[]).reduce((m,o)=>m+(o.argument_spans||[]).length,0),0);
const expectedDeps=extraction.items.reduce((n,x)=>n+(x.occurrences||[]).reduce((m,o)=>m+(o.depends_on||[]).length,0),0);
if(occNodes!==expectedOcc) fail('global occurrence-node count mismatch');
if(argNodes!==expectedArgs) fail('global argument-node count mismatch');
if(argEdges!==expectedArgs) fail('global argument-edge count mismatch');
if(depEdges!==expectedDeps) fail('global dependency-edge count mismatch');

const expectedCounts={
  frozen_bodies:84,
  semantic_occurrence_nodes:expectedOcc,
  ordered_argument_slot_nodes:expectedArgs,
  total_nodes:expectedOcc+expectedArgs,
  ordered_argument_edges:expectedArgs,
  dependency_edges:expectedDeps,
  total_edges:expectedArgs+expectedDeps
};
for(const [k,v] of Object.entries(expectedCounts)) if(graph.counts?.[k]!==v) fail('count mismatch '+k);

const structuralProjection={
  schema:graph.schema,
  status:graph.status,
  track:graph.track,
  gate:graph.gate,
  semantics:{
    forbidden_inference:graph.semantics?.forbidden_inference
  },
  counts:graph.counts,
  items:graph.items.map(item=>({
    census_id:item.census_id,
    nodes:item.graph.nodes.map(n=>({
      node_id:n.node_id,
      kind:n.kind,
      research_state:n.research_state??null
    })),
    edges:item.graph.edges
  }))
};
const structuralText=JSON.stringify(structuralProjection);
for(const re of [/["']?PD-[A-Z0-9-]+/i,/["']?B-[A-Z0-9-]+/i,/DNWF/i,/DNIA/i,/L-SSC-/i,/CORE_CLOSED/i,/CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION/i,/QUALIFIED_QU_BOUNDARY_CANDIDATE/i,/UNEXPANDED_DEMAND/i]){
  if(re.test(structuralText)) fail('forbidden pre-G3/pre-G5 structural token: '+re);
}

execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',graphPath],{encoding:'utf8'});
if(diff.trim()) fail('deterministic generator does not replay checked-in G2 graph');

const out={
  schema:'isograph.exp062-verify-w-g2-neutral-occurrence-graph.v0.1',
  pass:errors.length===0,
  errors,
  input:extractionPath,
  graph:graphPath,
  counts:expectedCounts,
  cold_audit_method_satisfied:false,
  cold_audit_campaign_waived:true,
  G2_neutral_graph_replay_exact:diff.trim()==='',
  G3_authorized_if_pass:errors.length===0,
  note:'This verifies W G2 neutrality and deterministic incidence replay only. It does not perform or prejudge the G3 Core-definability pass.'
};
console.log(JSON.stringify(out,null,2));
if(errors.length) process.exit(1);
