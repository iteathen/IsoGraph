import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const extractionPath='experiments/062/L_EXTRACTION_RECONCILED_0_25.json';
const g3Path='experiments/062/L_G3_CORE_DEFINABILITY_0_5.json';
const g4Path='experiments/062/L_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const g4FixedPath='experiments/062/L_G4_FIXED_POINT_0_1.json';
const outputPath='experiments/062/L_G5_RESIDUAL_RECONSTRUCTION_FRONTIER_0_1.json';
const methodPath='research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const fixed=JSON.parse(fs.readFileSync(g4FixedPath,'utf8'));

if(extraction.track!=='L'||g3.track!=='L'||g4.track!=='L'||fixed.track!=='L') throw new Error('L track mismatch');
if(fixed.fixed_point?.L_G4_complete!==true||fixed.fixed_point?.L_local_G5_authorized!==true) throw new Error('L G4 fixed point does not authorize L-local G5');
if(fixed.fixed_point?.cross_track_comparison_authorized!==false||fixed.fixed_point?.global_G5_authorized!==false) throw new Error('cross-track/global G5 must remain blocked');
if(g3.counts?.UNEXPANDED_DEMAND!==736||g3.counts?.CORE_CLOSED!==82) throw new Error('unexpected L G3 counts');
if((g4.classes||[]).length!==345||g4.counts?.unresolved_input_occurrences!==736) throw new Error('unexpected L G4 counts');

const extractionRow=new Map();
for(const item of extraction.items||[]) for(const occ of item.occurrences||[]) extractionRow.set(occ.occurrence_id,{census_id:item.census_id,...occ});
const g3Row=new Map();
const bodyRows=new Map();
for(const item of g3.items||[]){
  bodyRows.set(item.census_id,item.occurrences||[]);
  for(const row of item.occurrences||[]) g3Row.set(row.occurrence_id,{census_id:item.census_id,...row});
}
const componentCache=new Map();
function component(root){
  if(componentCache.has(root)) return componentCache.get(root);
  const rr=g3Row.get(root); if(!rr) throw new Error(root+': G3 row missing');
  const rows=bodyRows.get(rr.census_id)||[];
  const adjacency=new Map(rows.map(r=>[r.occurrence_id,new Set()]));
  for(const r of rows) for(const d of r.source_provenance?.depends_on||[]){
    if(!adjacency.has(d)) throw new Error(r.occurrence_id+': dependency target absent '+d);
    adjacency.get(r.occurrence_id).add(d);
    adjacency.get(d).add(r.occurrence_id);
  }
  const seen=new Set([root]),queue=[root];
  while(queue.length){
    const id=queue.shift();
    for(const n of adjacency.get(id)||[]) if(!seen.has(n)){seen.add(n);queue.push(n);}
  }
  const result=[...seen];
  componentCache.set(root,result);
  return result;
}

const classes=[];
let totalMemberComponents=0;
let totalComponentRows=0;
let pureNameOnlyClasses=0;
let pureOpaqueClasses=0;
let pureEvaluationClasses=0;
const NAME='G1 explicitly records this occurrence as name-only/external-definition-required. No exact source-faithful lower definition is admitted under current L-only authority.';
const OPAQUE='G2 preserves this occurrence only as opaque incidence/provenance. This pass has not established that the full source-local behavior is exhausted by primitive extensional relation application, raw data, or another exact qualified-Core form.';
const EVAL='The source occurrence denotes an operation with load-bearing evaluation/composition/arithmetic behavior. Core 0.20 forbids hiding that behavior in a nonlogical symbol or raw argument text; exact lower relational semantics remain unexpanded.';

for(const qc of g4.classes||[]){
  const members=[];
  for(const root of qc.member_occurrence_ids||[]){
    const rr=g3Row.get(root), er=extractionRow.get(root);
    if(!rr||!er) throw new Error(root+': provenance missing');
    if(rr.disposition!=='UNEXPANDED_DEMAND') throw new Error(root+': non-unresolved G5 root');
    const ids=component(root);
    const componentRows=ids.map(id=>{
      const gr=g3Row.get(id), ex=extractionRow.get(id);
      if(!gr||!ex) throw new Error(id+': component provenance missing');
      return {
        occurrence_id:id,
        census_id:gr.census_id,
        g3_disposition:gr.disposition,
        missing_definition_or_authority:gr.missing_definition_or_authority,
        source_provenance:gr.source_provenance,
        g1_load_bearing_note:ex.load_bearing_note
      };
    });
    totalMemberComponents++;
    totalComponentRows+=componentRows.length;
    members.push({
      root_occurrence_id:root,
      root_census_id:rr.census_id,
      root_source_provenance:rr.source_provenance,
      root_missing_definition_or_authority:rr.missing_definition_or_authority,
      component_occurrence_ids:ids,
      component_rows:componentRows
    });
  }
  const rootRelations=[...new Set(members.map(m=>m.root_source_provenance?.relation_span))];
  const rootStatuses=[...new Set(members.map(m=>m.root_source_provenance?.definition_status))];
  const rootReasons=[...new Set(members.map(m=>m.root_missing_definition_or_authority))];
  const allUnresolved=members.flatMap(m=>m.component_rows.filter(r=>r.g3_disposition==='UNEXPANDED_DEMAND'));
  const componentReasons=[...new Set(allUnresolved.map(r=>r.missing_definition_or_authority))];
  const allName=allUnresolved.length>0&&allUnresolved.every(r=>r.missing_definition_or_authority===NAME);
  const allOpaque=allUnresolved.length>0&&allUnresolved.every(r=>r.missing_definition_or_authority===OPAQUE);
  const allEval=allUnresolved.length>0&&allUnresolved.every(r=>r.missing_definition_or_authority===EVAL);
  if(allName) pureNameOnlyClasses++;
  if(allOpaque) pureOpaqueClasses++;
  if(allEval) pureEvaluationClasses++;
  classes.push({
    class_id:qc.class_id,
    member_count:qc.member_count,
    structural_invariant_sha256:qc.structural_invariant_sha256,
    component_node_count:qc.component_node_count,
    component_dependency_edge_count:qc.component_dependency_edge_count,
    diagnostics:{
      root_relation_spans:rootRelations,
      root_definition_statuses:rootStatuses,
      root_g3_failure_reasons:rootReasons,
      component_unresolved_failure_reasons:componentReasons,
      root_relation_homogeneous:rootRelations.length===1,
      root_definition_status_homogeneous:rootStatuses.length===1,
      whole_component_name_only:allName,
      whole_component_opaque_incidence:allOpaque,
      whole_component_evaluation_semantics:allEval
    },
    current_authority_reduction:{
      all_roots_rejected_by_g3:true,
      qualified_QU_boundary_candidates_in_L_G3:0,
      reduction_state:'RESIDUAL_REMAINS_UNDER_FROZEN_G0_AUTHORITY'
    },
    members,
    g5_state:'UNADJUDICATED_RESIDUAL'
  });
}

const out={
  schema:'isograph.exp062-l-g5-residual-reconstruction-frontier.v0.1',
  date:'2026-10-06',
  status:'L_LOCAL_G5_RESIDUAL_RECONSTRUCTION_FRONTIER',
  authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
  authority:false,
  track:'L',
  comparison_scope:'L_ONLY',
  governing_method:methodPath,
  input:{
    extraction:{path:extractionPath,git_blob_sha:blob(extractionPath)},
    g3_fixed_point:{path:g3Path,git_blob_sha:blob(g3Path)},
    g4_quotient:{path:g4Path,git_blob_sha:blob(g4Path)},
    g4_fixed_point:{path:g4FixedPath,git_blob_sha:blob(g4FixedPath)}
  },
  gate:{
    L_G4_complete:true,
    L_local_G5_authorized:true,
    cross_track_comparison_authorized:false,
    global_G5_authorized:false,
    G6_authorized:false
  },
  authority_freeze:{
    note:'Campaign G0 authority remains exact qualified cumulative Core through 0.21 plus qualified QU only when the frozen L source itself contains genuinely unresolved structured possibility. L G3 contains zero QU-boundary candidates.',
    L_G3_CORE_CLOSED:82,
    L_G3_UNEXPANDED_DEMAND:736,
    L_G3_QUALIFIED_QU_BOUNDARY_CANDIDATE:0
  },
  diagnostic_rule:'Source relation words, definition status, and G3 failure reasons are available at G5 for explicit reconstruction analysis, but none is itself a candidate-basis key. Structural G4 equivalence does not imply semantic equivalence.',
  counts:{
    quotient_classes:classes.length,
    unresolved_root_occurrences:classes.reduce((n,c)=>n+c.member_count,0),
    member_components:totalMemberComponents,
    component_rows_with_repetition:totalComponentRows,
    whole_component_name_only_classes:pureNameOnlyClasses,
    whole_component_opaque_incidence_classes:pureOpaqueClasses,
    whole_component_evaluation_semantics_classes:pureEvaluationClasses
  },
  classes,
  next_required_steps:[
    'For every class, attempt reduction under the frozen G0 authority and document exact reconstruction evidence.',
    'Identify the smallest residual semantic behavior only after class-member source reconstruction; do not name candidates from source nouns or G4 topology alone.',
    'Test any residual candidate across other L classes by explicit reconstruction and split non-covered members rather than broadening by intuition.',
    'Record unresolved source-information boundaries explicitly where all load-bearing behavior remains name-only under L-local evidence.',
    'No candidate is authority at G5. Any reusable semantic extension must enter independent G6 qualification.'
  ]
};
fs.writeFileSync(outputPath,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,counts:out.counts},null,2));
