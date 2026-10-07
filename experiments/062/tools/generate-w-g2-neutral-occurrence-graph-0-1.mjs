import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const waiverPath='experiments/062/G1_OWNER_COLD_AUDIT_WAIVER_0_1.json';
const outputPath='experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_1.json';
const methodPath='research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';

const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const waiver=JSON.parse(fs.readFileSync(waiverPath,'utf8'));
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

if(extraction.track!=='W') throw new Error('expected W extraction');
if(extraction.items.length!==84) throw new Error('expected 84 W bodies');
const occurrenceCount=extraction.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(occurrenceCount!==425) throw new Error('expected 425 W occurrences');

const gate=waiver.gate_ruling||{};
const pin=waiver.pinned_inputs?.W;
if(!pin) throw new Error('W waiver pin missing');
if(pin.extraction!==extractionPath) throw new Error('waiver input mismatch');
if(blob(extractionPath)!==pin.extraction_git_blob_sha) throw new Error('waiver extraction blob mismatch');
if(gate.W_G1_accepted_for_this_campaign!==true||gate.joint_G1_campaign_gate_satisfied!==true||gate.G2_authorized_for_this_campaign!==true) {
  throw new Error('G2 campaign gate not authorized');
}

const allOccurrences=[];
for(const item of extraction.items){
  if(item.extraction_status!=='COMPLETE') throw new Error(item.census_id+': G1 extraction incomplete');
  for(const occ of item.occurrences||[]) allOccurrences.push({census_id:item.census_id,occ});
}

const nodeByOccurrence=new Map();
allOccurrences.forEach(({occ},i)=>{
  nodeByOccurrence.set(occ.occurrence_id,'W-G2-O'+String(i+1).padStart(4,'0'));
});

const items=[];
let argumentNodeCount=0;
let argumentEdgeCount=0;
let dependencyEdgeCount=0;
let edgeSerial=0;

for(const item of extraction.items){
  const validIds=new Set((item.occurrences||[]).map(o=>o.occurrence_id));
  const nodes=[];
  const edges=[];

  for(const occ of item.occurrences||[]){
    const occurrenceNodeId=nodeByOccurrence.get(occ.occurrence_id);
    if(!occurrenceNodeId) throw new Error(occ.occurrence_id+': opaque node allocation missing');

    nodes.push({
      node_id:occurrenceNodeId,
      kind:'OPAQUE_SEMANTIC_OCCURRENCE',
      research_state:'UNEXPANDED_SEMANTIC_OCCURRENCE',
      provenance:{
        census_id:item.census_id,
        occurrence_id:occ.occurrence_id,
        source_span:occ.source_span,
        relation_span:occ.relation_span,
        logical_force_source:occ.logical_force,
        definition_status_source:occ.definition_status,
        load_bearing_note:occ.load_bearing_note
      }
    });

    for(let i=0;i<(occ.argument_spans||[]).length;i++){
      argumentNodeCount++;
      const argNodeId='W-G2-A'+String(argumentNodeCount).padStart(5,'0');
      nodes.push({
        node_id:argNodeId,
        kind:'ORDERED_ARGUMENT_SLOT',
        provenance:{
          census_id:item.census_id,
          occurrence_id:occ.occurrence_id,
          argument_position:i+1,
          argument_span:occ.argument_spans[i]
        }
      });
      argumentEdgeCount++;
      edgeSerial++;
      edges.push({
        edge_id:'W-G2-E'+String(edgeSerial).padStart(5,'0'),
        kind:'ORDERED_ARGUMENT_INCIDENCE',
        from:occurrenceNodeId,
        to:argNodeId,
        position:i+1,
        provenance_occurrence_id:occ.occurrence_id
      });
    }

    for(let i=0;i<(occ.depends_on||[]).length;i++){
      const target=occ.depends_on[i];
      if(!validIds.has(target)) throw new Error(occ.occurrence_id+': dependency leaves body: '+target);
      const targetNodeId=nodeByOccurrence.get(target);
      if(!targetNodeId) throw new Error(occ.occurrence_id+': dependency target allocation missing: '+target);
      dependencyEdgeCount++;
      edgeSerial++;
      edges.push({
        edge_id:'W-G2-E'+String(edgeSerial).padStart(5,'0'),
        kind:'INTRA_BODY_DEPENDENCY_INCIDENCE',
        from:occurrenceNodeId,
        to:targetNodeId,
        position:i+1,
        provenance_occurrence_id:occ.occurrence_id,
        provenance_target_occurrence_id:target
      });
    }
  }

  items.push({
    census_id:item.census_id,
    source_extraction_status:item.extraction_status,
    graph:{
      nodes,
      edges
    }
  });
}

const graph={
  schema:'isograph.exp062-w-g2-neutral-occurrence-graph.v0.1',
  date:'2026-10-06',
  status:'G2_NEUTRAL_OCCURRENCE_GRAPH_CANDIDATE',
  authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
  authority:false,
  track:'W',
  governing_method:methodPath,
  frozen_source_corpus:corpusPath,
  input:{
    path:extractionPath,
    git_blob_sha:blob(extractionPath),
    fixed_point_record:pin.fixed_point_record,
    owner_waiver:waiverPath,
    owner_waiver_git_blob_sha:blob(waiverPath)
  },
  gate:{
    source_local_zero_change:true,
    independent_cold_audit_satisfied:false,
    independent_cold_audit_waived_for_this_campaign:true,
    G2_authorized_for_this_campaign:true,
    waiver_is_reusable:false
  },
  semantics:{
    graph_meaning:'Mechanical W-only topology of the source-conserved G1 semantic occurrences. Occurrence semantics remain opaque at G2.',
    occurrence_node_meaning:'Fresh body-local/source-occurrence identity for one G1 occurrence, marked UNEXPANDED_SEMANTIC_OCCURRENCE. The marker is research bookkeeping and is not a Core primitive.',
    argument_slot_meaning:'Ordered argument incidence only. argument_span is provenance and is not treated as a primitive/category label or as proof that equal text denotes global identity.',
    dependency_edge_meaning:'Exact same-body depends_on incidence copied from the G1 occurrence record.',
    source_metadata_rule:'relation_span, logical_force_source, definition_status_source, load_bearing_note, and argument_span are reversible provenance metadata only; they do not select graph classes or primitive semantics at G2.',
    binder_rule:'No explicit binder table exists in W G1 0.18. G2 does not invent binder ownership or quantifier incidence beyond the source-conserved occurrence fields actually present.',
    forbidden_inference:[
      'No PD-* demand category is used.',
      'No B-* candidate basis ID is used.',
      'No DNWF or DNIA artifact is used.',
      'No source-domain noun creates a category node.',
      'No L-track evidence or cross-track correspondence is used.',
      'No familiar mathematical definition is imported.',
      'No Core-definability disposition is assigned before G3.'
    ]
  },
  counts:{
    frozen_bodies:extraction.items.length,
    semantic_occurrence_nodes:occurrenceCount,
    ordered_argument_slot_nodes:argumentNodeCount,
    total_nodes:occurrenceCount+argumentNodeCount,
    ordered_argument_edges:argumentEdgeCount,
    dependency_edges:dependencyEdgeCount,
    total_edges:argumentEdgeCount+dependencyEdgeCount
  },
  items,
  next_stage:'G3_QUALIFIED_CORE_DEFINABILITY_PASS'
};

fs.writeFileSync(outputPath,JSON.stringify(graph,null,2)+'\n');
console.log(JSON.stringify({
  output:outputPath,
  bodies:graph.counts.frozen_bodies,
  occurrence_nodes:graph.counts.semantic_occurrence_nodes,
  argument_nodes:graph.counts.ordered_argument_slot_nodes,
  edges:graph.counts.total_edges
},null,2));
