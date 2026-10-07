import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const g5Path='experiments/062/L_G5_CANDIDATE_BASIS_SYNTHESIS_0_1.json';
const freezePath='experiments/062/L_G4_FIXED_POINT_0_1.json';
const g4Path='experiments/062/L_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const g3Path='experiments/062/L_G3_CORE_DEFINABILITY_0_5.json';
const frontierPath='experiments/062/L_G5_RESIDUAL_RECONSTRUCTION_FRONTIER_0_1.json';
const manifestPath='qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md';

const freeze=JSON.parse(fs.readFileSync(freezePath,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const frontier=JSON.parse(fs.readFileSync(frontierPath,'utf8'));
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

if(freeze.fixed_point?.L_G4_complete!==true||freeze.fixed_point?.L_local_G5_authorized!==true)throw new Error('L G4 fixed point does not authorize G5');
if(freeze.fixed_point?.cross_track_comparison_authorized!==false||freeze.fixed_point?.global_G5_authorized!==false)throw new Error('cross-track/global G5 must remain blocked');
if(g3.counts?.UNEXPANDED_DEMAND!==736||g3.counts?.QUALIFIED_QU_BOUNDARY_CANDIDATE!==0)throw new Error('unexpected L G3 state');
if((g4.classes||[]).length!==345||(frontier.classes||[]).length!==345)throw new Error('class coverage mismatch');

const byId=new Map();
for(const it of g3.items||[])for(const row of it.occurrences||[])byId.set(row.occurrence_id,row);
const frontierByClass=new Map((frontier.classes||[]).map(x=>[x.class_id,x]));
const classByOccurrence=new Map();
for(const c of g4.classes||[])for(const id of c.member_occurrence_ids||[])classByOccurrence.set(id,c.class_id);

const classResults=[];
let singleton=0,multi=0,uniform=0,hetero=0;
for(const c of g4.classes||[]){
  const fr=frontierByClass.get(c.class_id);
  if(!fr)throw new Error(c.class_id+': residual frontier missing');
  const members=c.member_occurrence_ids.map(id=>byId.get(id));
  if(members.some(x=>!x||x.disposition!=='UNEXPANDED_DEMAND'))throw new Error(c.class_id+': non-unexpanded member');
  const rels=[...new Set(members.map(x=>x.source_provenance.relation_span))];
  const statuses=[...new Set(members.map(x=>x.source_provenance.definition_status))];
  const forces=[...new Set(members.map(x=>x.source_provenance.logical_force))];
  let reviewKind,reason;
  if(c.member_count===1){
    singleton++;
    reviewKind='SINGLETON_UNRESOLVED_BOUNDARY';
    reason='G3 already established that this occurrence is not reducible under the frozen L authority. No same-class structural recurrence exists from which to infer a reusable residual semantic expansion, and adding semantics from the source label would exceed the frozen source evidence.';
  }else if(rels.length===1){
    multi++;uniform++;
    reviewKind='REPEATED_STRUCTURE_SAME_SURFACE_LABEL_BUT_SEMANTICS_UNDEFINED';
    reason='Exact G4 structural recurrence and repeated source spelling are both present, but the repeated spelling cannot supply its own missing semantics. Every participating occurrence remains G3 UNEXPANDED_DEMAND, and the L source-conserved component does not provide an exact reusable expansion/reconstruction contract for that label.';
  }else{
    multi++;hetero++;
    reviewKind='STRUCTURAL_RECURRENCE_SEMANTICALLY_HETEROGENEOUS';
    reason='Exact G4 isomorphism is present, but the members carry different source relations. Structural recurrence therefore does not establish one residual semantic behavior. Combining them into one candidate would enlarge a candidate by intuition rather than exact reconstruction.';
  }
  const componentReasonSets=(fr.members||[]).map(m=>[...new Set((m.component_rows||[]).filter(x=>x.g3_disposition==='UNEXPANDED_DEMAND').map(x=>x.missing_definition_or_authority))]);
  classResults.push({
    class_id:c.class_id,
    member_count:c.member_count,
    structural_invariant_sha256:c.structural_invariant_sha256,
    member_occurrence_ids:c.member_occurrence_ids,
    g5_review_kind:reviewKind,
    provenance_relation_spans:rels,
    provenance_definition_statuses:statuses,
    provenance_logical_forces:forces,
    component_unresolved_failure_reason_sets:componentReasonSets,
    whole_component_name_only:fr.diagnostics?.whole_component_name_only===true,
    whole_component_opaque_incidence:fr.diagnostics?.whole_component_opaque_incidence===true,
    whole_component_evaluation_semantics:fr.diagnostics?.whole_component_evaluation_semantics===true,
    core_reduction:'NO_ALREADY_UNEXPANDED_AT_G3',
    qualified_module_reduction:'NO_APPLICABLE_DEFINITION_AUTHORITY',
    exact_residual_expansion_available:false,
    residual_disposition:'UNRESOLVED_BOUNDARY',
    candidate_id:null,
    reason
  });
}

const relMap=new Map();
for(const [id,row] of byId){
  if(row.disposition!=='UNEXPANDED_DEMAND')continue;
  const rel=row.source_provenance.relation_span;
  if(!relMap.has(rel))relMap.set(rel,{occurrence_ids:[],class_ids:new Set(),statuses:new Set(),forces:new Set(),failure_reasons:new Set()});
  const x=relMap.get(rel);
  x.occurrence_ids.push(id);
  x.class_ids.add(classByOccurrence.get(id));
  x.statuses.add(row.source_provenance.definition_status);
  x.forces.add(row.source_provenance.logical_force);
  x.failure_reasons.add(row.missing_definition_or_authority);
}
const probes=[...relMap.entries()].map(([rel,x])=>({
  relation_span_provenance_only:rel,
  occurrence_count:x.occurrence_ids.length,
  quotient_class_ids:[...x.class_ids],
  quotient_class_count:x.class_ids.size,
  definition_statuses:[...x.statuses],
  logical_forces:[...x.forces],
  g3_failure_reasons:[...x.failure_reasons],
  probe_result:'NO_LAWFUL_SHARED_CANDIDATE_CURRENT_L_AUTHORITY',
  reason:'This recurrence is inspected only after G4. Repeated source spelling cannot supply its own missing semantics; every participating occurrence remains G3 UNEXPANDED_DEMAND. The frozen L evidence therefore does not provide an exact reusable expansion/reconstruction contract without adding semantic authority.'
})).filter(x=>x.quotient_class_count>1).sort((a,b)=>b.quotient_class_count-a.quotient_class_count||b.occurrence_count-a.occurrence_count||a.relation_span_provenance_only.localeCompare(b.relation_span_provenance_only));

const out={
  schema:'isograph.exp062-l-g5-candidate-basis-synthesis.v0.1',
  date:'2026-10-06',
  status:'L_LOCAL_G5_FIXED_POINT_NO_LAWFUL_REUSABLE_CANDIDATE',
  authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
  authority:false,
  track:'L',
  comparison_scope:'L_ONLY',
  governing_method:'research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md',
  input:{
    g4_fixed_point:{path:freezePath,git_blob_sha:blob(freezePath)},
    g4_quotient:{path:g4Path,git_blob_sha:blob(g4Path)},
    g3_fixed_point:{path:g3Path,git_blob_sha:blob(g3Path)},
    residual_frontier:{path:frontierPath,git_blob_sha:blob(frontierPath)},
    qualified_module_manifest:{path:manifestPath,git_blob_sha:blob(manifestPath)}
  },
  reduction_policy:{
    core:'Inherited exactly from L G3. All 736 G5 roots are UNEXPANDED_DEMAND; G5 does not relabel them Core-closed by structural recurrence.',
    QU:'Not applicable as missing-definition camouflage. L G3 produced zero QUALIFIED_QU_BOUNDARY_CANDIDATE rows; Core 0.21 forbids routing missing semantic definitions through QU.',
    NEI:'Qualified generally, but the frozen G0/G3 authority routing for these residuals does not provide NEI as the missing source operation/definition authority; NEI cannot retroactively define these frozen source semantics.',
    DTS:'Qualified generally, but transition anatomy cannot supply an absent source-local definition for these residual operations/relations.',
    DP:'Discovery/search/valuation machinery cannot supply semantic proof authority or a missing frozen source definition.',
    EI:'Experimental evidence generation cannot retroactively define a frozen source semantic operator.',
    candidate_rule:'A reusable candidate requires enough L source-conserved behavior to state an exact expansion and reconstruction contract. Structural recurrence, G3 failure-reason recurrence, or repeated source spelling alone is insufficient.'
  },
  counts:{
    quotient_classes:classResults.length,
    singleton_classes:singleton,
    multi_member_classes:multi,
    multi_member_uniform_relation_label_classes:uniform,
    multi_member_heterogeneous_relation_label_classes:hetero,
    cross_class_surface_recurrence_probes:probes.length,
    proposed_reusable_candidates:0,
    unresolved_boundaries:classResults.length
  },
  class_results:classResults,
  cross_class_surface_recurrence_probes:probes,
  candidate_basis:[],
  unresolved_boundary_class_ids:classResults.map(x=>x.class_id),
  boundary:{
    kind:'GENUINE_CURRENT_AUTHORITY_PRIMITIVE_DOMAIN_OR_SOURCE_INFORMATION_BOUNDARY',
    scope:'L_ONLY',
    statement:'Under the frozen L campaign authority, every L G4 class retains unresolved semantic behavior but no class or cross-class recurrence provides enough source-conserved semantics to state an exact reusable residual expansion. Name-only components require external definition authority; evaluation/composition components lack the laws needed for reconstruction; opaque-incidence components remain unproven as finite extensional relations. This is a current procedural/authority boundary, not a claim of mathematical impossibility.',
    unblock_paths:[
      'Supply independently authoritative source information that defines a currently name-only/load-bearing behavior, then reopen the affected L source-local chain.',
      'Propose a generic semantic extension only when its exact residual semantics can be independently specified; run it as a separate G6 IsoGraph qualification project before L may consume it.',
      'If qualified authority changes, invalidate affected G3/G4/G5 results and rerun downstream stages as required.'
    ],
    prohibited_shortcuts:[
      'Do not promote a source-domain noun or familiar mathematical name as the candidate definition.',
      'Do not use repeated relation spelling, G4 class frequency, or structural isomorphism as semantic authority.',
      'Do not import W evidence or cross-track correspondence into the L-local boundary.',
      'Do not use QU, NEI, DTS, DP, or EI to camouflage a missing semantic definition outside their qualified routing scope.'
    ]
  },
  fixed_point:{
    L_local_G5_complete:true,
    candidate_basis_empty:true,
    unresolved_boundary_count:classResults.length,
    L_local_G6_required:false,
    L_track_primitive_closure_complete:false,
    L_track_sealed:false,
    cross_track_comparison_authorized:false,
    reason:'Every frozen L G4 quotient class and every post-G4 cross-class surface recurrence was reviewed under the current authority. No exact reusable residual candidate can be stated without adding semantics not supplied by the frozen L evidence/current authority.'
  },
  next_stage:'CURRENT_AUTHORITY_BOUNDARY_NO_L_LOCAL_G6_CANDIDATE'
};
fs.writeFileSync(g5Path,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({output:g5Path,counts:out.counts,fixed_point:out.fixed_point,boundary_kind:out.boundary.kind},null,2));
