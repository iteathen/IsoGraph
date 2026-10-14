import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const g5Path='experiments/062/L_G5_CANDIDATE_BASIS_SYNTHESIS_0_1.json';
const freezePath='experiments/062/L_G4_FIXED_POINT_0_1.json';
const g4Path='experiments/062/L_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const g3Path='experiments/062/L_G3_CORE_DEFINABILITY_0_5.json';
const frontierPath='experiments/062/L_G5_RESIDUAL_RECONSTRUCTION_FRONTIER_0_1.json';
const manifestPath='qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md';
const generatorPath='experiments/062/tools/generate-l-g5-candidate-basis-synthesis-0-1.mjs';

const g5=JSON.parse(fs.readFileSync(g5Path,'utf8'));
const freeze=JSON.parse(fs.readFileSync(freezePath,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const frontier=JSON.parse(fs.readFileSync(frontierPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
const stable=x=>JSON.stringify(x);

if(g5.schema!=='isograph.exp062-l-g5-candidate-basis-synthesis.v0.1')fail('schema mismatch');
if(g5.status!=='L_LOCAL_G5_FIXED_POINT_NO_LAWFUL_REUSABLE_CANDIDATE')fail('status mismatch');
if(g5.track!=='L'||g5.comparison_scope!=='L_ONLY')fail('scope mismatch');
if(g5.authority!==false)fail('G5 must remain non-authority');
for(const [key,path] of Object.entries({
  g4_fixed_point:freezePath,
  g4_quotient:g4Path,
  g3_fixed_point:g3Path,
  residual_frontier:frontierPath,
  qualified_module_manifest:manifestPath
})){
  const x=g5.input?.[key];
  if(x?.path!==path||x?.git_blob_sha!==blob(path))fail(key+': input pin mismatch');
}
if(freeze.fixed_point?.L_G4_complete!==true||freeze.fixed_point?.L_local_G5_authorized!==true)fail('L G4 fixed point does not authorize G5');
if(freeze.fixed_point?.cross_track_comparison_authorized!==false||freeze.fixed_point?.global_G5_authorized!==false)fail('cross/global gate unexpectedly open');
if(g3.counts?.UNEXPANDED_DEMAND!==736||g3.counts?.QUALIFIED_QU_BOUNDARY_CANDIDATE!==0)fail('L G3 state mismatch');
if((g4.classes||[]).length!==345||(frontier.classes||[]).length!==345)fail('G4/frontier coverage');

const byId=new Map();
for(const it of g3.items||[])for(const row of it.occurrences||[])byId.set(row.occurrence_id,row);
const g4ClassById=new Map((g4.classes||[]).map(c=>[c.class_id,c]));
const frontierByClass=new Map((frontier.classes||[]).map(c=>[c.class_id,c]));
const classByOccurrence=new Map();
for(const c of g4.classes||[])for(const id of c.member_occurrence_ids||[])classByOccurrence.set(id,c.class_id);

if((g5.class_results||[]).length!==345)fail('class result count');
const seen=new Set();
let singleton=0,multi=0,uniform=0,hetero=0;
for(const row of g5.class_results||[]){
  if(seen.has(row.class_id))fail('duplicate class '+row.class_id);
  seen.add(row.class_id);
  const c=g4ClassById.get(row.class_id),fr=frontierByClass.get(row.class_id);
  if(!c||!fr){fail('unknown class '+row.class_id);continue;}
  if(row.member_count!==c.member_count)fail(row.class_id+': member count');
  if(row.structural_invariant_sha256!==c.structural_invariant_sha256)fail(row.class_id+': invariant');
  if(stable(row.member_occurrence_ids)!==stable(c.member_occurrence_ids))fail(row.class_id+': member coverage/order');
  if(row.core_reduction!=='NO_ALREADY_UNEXPANDED_AT_G3')fail(row.class_id+': Core reduction');
  if(row.qualified_module_reduction!=='NO_APPLICABLE_DEFINITION_AUTHORITY')fail(row.class_id+': module reduction');
  if(row.exact_residual_expansion_available!==false)fail(row.class_id+': residual expansion claim');
  if(row.residual_disposition!=='UNRESOLVED_BOUNDARY'||row.candidate_id!==null)fail(row.class_id+': illegal candidate state');

  const members=c.member_occurrence_ids.map(id=>byId.get(id));
  if(members.some(x=>!x||x.disposition!=='UNEXPANDED_DEMAND'))fail(row.class_id+': non-unexpanded member');
  const rels=[...new Set(members.map(x=>x.source_provenance.relation_span))];
  const statuses=[...new Set(members.map(x=>x.source_provenance.definition_status))];
  const forces=[...new Set(members.map(x=>x.source_provenance.logical_force))];
  if(stable(row.provenance_relation_spans)!==stable(rels))fail(row.class_id+': relation provenance');
  if(stable(row.provenance_definition_statuses)!==stable(statuses))fail(row.class_id+': definition status provenance');
  if(stable(row.provenance_logical_forces)!==stable(forces))fail(row.class_id+': force provenance');
  const reasonSets=(fr.members||[]).map(m=>[...new Set((m.component_rows||[]).filter(x=>x.g3_disposition==='UNEXPANDED_DEMAND').map(x=>x.missing_definition_or_authority))]);
  if(stable(row.component_unresolved_failure_reason_sets)!==stable(reasonSets))fail(row.class_id+': component failure reasons');
  if(row.whole_component_name_only!==(fr.diagnostics?.whole_component_name_only===true))fail(row.class_id+': name-only flag');
  if(row.whole_component_opaque_incidence!==(fr.diagnostics?.whole_component_opaque_incidence===true))fail(row.class_id+': opaque flag');
  if(row.whole_component_evaluation_semantics!==(fr.diagnostics?.whole_component_evaluation_semantics===true))fail(row.class_id+': evaluation flag');

  if(c.member_count===1){
    singleton++;
    if(row.g5_review_kind!=='SINGLETON_UNRESOLVED_BOUNDARY')fail(row.class_id+': singleton review kind');
  }else{
    multi++;
    if(rels.length===1){
      uniform++;
      if(row.g5_review_kind!=='REPEATED_STRUCTURE_SAME_SURFACE_LABEL_BUT_SEMANTICS_UNDEFINED')fail(row.class_id+': uniform review kind');
    }else{
      hetero++;
      if(row.g5_review_kind!=='STRUCTURAL_RECURRENCE_SEMANTICALLY_HETEROGENEOUS')fail(row.class_id+': heterogeneous review kind');
    }
  }
}
for(const c of g4.classes||[])if(!seen.has(c.class_id))fail('missing class '+c.class_id);

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
if(stable(g5.cross_class_surface_recurrence_probes)!==stable(probes))fail('cross-class recurrence probes');

if(!Array.isArray(g5.candidate_basis)||g5.candidate_basis.length!==0)fail('candidate basis must be empty');
const expectedClassIds=(g4.classes||[]).map(c=>c.class_id);
if(stable(g5.unresolved_boundary_class_ids)!==stable(expectedClassIds))fail('boundary class list');

const c=g5.counts||{};
if(c.quotient_classes!==345||c.singleton_classes!==singleton||c.multi_member_classes!==multi||
   c.multi_member_uniform_relation_label_classes!==uniform||
   c.multi_member_heterogeneous_relation_label_classes!==hetero||
   c.cross_class_surface_recurrence_probes!==probes.length||
   c.proposed_reusable_candidates!==0||c.unresolved_boundaries!==345)fail('summary counts');

const boundary=g5.boundary||{};
if(boundary.kind!=='GENUINE_CURRENT_AUTHORITY_PRIMITIVE_DOMAIN_OR_SOURCE_INFORMATION_BOUNDARY'||boundary.scope!=='L_ONLY')fail('boundary kind/scope');
const fp=g5.fixed_point||{};
if(fp.L_local_G5_complete!==true||fp.candidate_basis_empty!==true||fp.unresolved_boundary_count!==345)fail('G5 fixed point');
if(fp.L_local_G6_required!==false)fail('G6 incorrectly required');
if(fp.L_track_primitive_closure_complete!==false||fp.L_track_sealed!==false)fail('closure/seal overclaim');
if(fp.cross_track_comparison_authorized!==false)fail('cross-track overclaim');

const structuralText=stable({class_results:g5.class_results,cross_class_surface_recurrence_probes:g5.cross_class_surface_recurrence_probes});
if(/W-SSC-/i.test(structuralText))fail('W evidence leaked');
for(const row of g5.class_results||[])if(row.candidate_id!==null)fail('candidate ID present '+row.class_id);

execFileSync('node',['experiments/062/tools/verify-l-g5-residual-frontier-0-1.mjs'],{stdio:'pipe'});
execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',g5Path],{encoding:'utf8'});
if(diff.trim())fail('G5 generator replay diff');

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-l-g5-candidate-basis-synthesis.v0.1',
  pass:errors.length===0,
  errors,
  counts:{
    quotient_classes:345,
    singleton_classes:singleton,
    multi_member_classes:multi,
    uniform_relation_label_multi_classes:uniform,
    heterogeneous_relation_label_multi_classes:hetero,
    cross_class_recurrence_probes:probes.length,
    candidate_basis:0,
    unresolved_boundaries:345
  },
  deterministic_replay_exact:diff.trim()==='',
  L_local_G5_complete:fp.L_local_G5_complete===true,
  L_local_G6_required:false,
  L_track_primitive_closure_complete:false,
  L_track_sealed:false,
  cross_track_comparison_authorized:false
},null,2));
if(errors.length)process.exit(1);
