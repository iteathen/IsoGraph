import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const g5Path='experiments/062/W_G5_CANDIDATE_BASIS_SYNTHESIS_0_1.json';
const freezePath='experiments/062/W_G4_FIXED_POINT_0_1.json';
const g4Path='experiments/062/W_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const g3Path='experiments/062/W_G3_CORE_DEFINABILITY_0_5.json';
const manifestPath='qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md';

const g5=JSON.parse(fs.readFileSync(g5Path,'utf8'));
const freeze=JSON.parse(fs.readFileSync(freezePath,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
const stable=x=>JSON.stringify(x);

if(g5.schema!=='isograph.exp062-w-g5-candidate-basis-synthesis.v0.1') fail('schema mismatch');
if(g5.status!=='W_LOCAL_G5_FIXED_POINT_NO_LAWFUL_REUSABLE_CANDIDATE') fail('status mismatch');
if(g5.track!=='W'||g5.comparison_scope!=='W_ONLY') fail('scope mismatch');
if(g5.authority!==false) fail('G5 artifact must remain research evidence only');

for(const [key,path] of Object.entries({
  g4_fixed_point:freezePath,
  g4_quotient:g4Path,
  g3_fixed_point:g3Path,
  qualified_module_manifest:manifestPath
})){
  const x=g5.input?.[key];
  if(x?.path!==path||x?.git_blob_sha!==blob(path)) fail(key+': input pin mismatch');
}
if(freeze.fixed_point?.W_G4_complete!==true||freeze.fixed_point?.W_local_G5_authorized!==true) fail('W G4 fixed point does not authorize G5');
if(freeze.fixed_point?.cross_track_comparison_authorized!==false) fail('cross-track gate unexpectedly open');

const byId=new Map();
for(const it of g3.items||[]) for(const row of it.occurrences||[]) byId.set(row.occurrence_id,row);
const g4ClassById=new Map((g4.classes||[]).map(c=>[c.class_id,c]));
const classByOccurrence=new Map();
for(const c of g4.classes||[]) for(const id of c.member_occurrence_ids||[]) classByOccurrence.set(id,c.class_id);

if((g5.class_results||[]).length!==(g4.classes||[]).length) fail('class result coverage mismatch');
const seenClasses=new Set();
let singleton=0,multi=0,uniform=0,hetero=0;
for(const row of g5.class_results||[]){
  if(seenClasses.has(row.class_id)) fail('duplicate class result '+row.class_id);
  seenClasses.add(row.class_id);
  const c=g4ClassById.get(row.class_id);
  if(!c){fail('unknown class result '+row.class_id);continue;}
  if(row.member_count!==c.member_count) fail(row.class_id+': member count mismatch');
  if(row.structural_invariant_sha256!==c.structural_invariant_sha256) fail(row.class_id+': structural invariant mismatch');
  if(stable(row.member_occurrence_ids)!==stable(c.member_occurrence_ids)) fail(row.class_id+': member order/coverage mismatch');
  if(row.core_reduction!=='NO_ALREADY_UNEXPANDED_AT_G3') fail(row.class_id+': incorrect Core reduction');
  if(row.qualified_module_reduction!=='NO_APPLICABLE_DEFINITION_AUTHORITY') fail(row.class_id+': incorrect module reduction');
  if(row.residual_disposition!=='UNRESOLVED_BOUNDARY'||row.candidate_id!==null) fail(row.class_id+': illegal candidate/residual state');

  const members=c.member_occurrence_ids.map(id=>byId.get(id));
  if(members.some(x=>!x||x.disposition!=='UNEXPANDED_DEMAND')) fail(row.class_id+': class contains non-unexpanded G3 member');
  const rels=[...new Set(members.map(x=>x.source_provenance.relation_span))];
  const statuses=[...new Set(members.map(x=>x.source_provenance.definition_status))];
  const forces=[...new Set(members.map(x=>x.source_provenance.logical_force))];
  if(stable(row.provenance_relation_spans)!==stable(rels)) fail(row.class_id+': relation provenance mismatch');
  if(stable(row.provenance_definition_statuses)!==stable(statuses)) fail(row.class_id+': definition-status provenance mismatch');
  if(stable(row.provenance_logical_forces)!==stable(forces)) fail(row.class_id+': logical-force provenance mismatch');

  if(c.member_count===1){
    singleton++;
    if(row.g5_review_kind!=='SINGLETON_UNRESOLVED_BOUNDARY') fail(row.class_id+': singleton review kind mismatch');
  }else{
    multi++;
    if(rels.length===1){
      uniform++;
      if(row.g5_review_kind!=='REPEATED_STRUCTURE_SAME_SURFACE_LABEL_BUT_SEMANTICS_UNDEFINED') fail(row.class_id+': uniform-label review kind mismatch');
    }else{
      hetero++;
      if(row.g5_review_kind!=='STRUCTURAL_RECURRENCE_SEMANTICALLY_HETEROGENEOUS') fail(row.class_id+': heterogeneous review kind mismatch');
    }
  }
}
for(const c of g4.classes||[]) if(!seenClasses.has(c.class_id)) fail('missing class result '+c.class_id);

const relMap=new Map();
for(const [id,row] of byId){
  if(row.disposition!=='UNEXPANDED_DEMAND') continue;
  const rel=row.source_provenance.relation_span;
  if(!relMap.has(rel)) relMap.set(rel,{occurrence_ids:[],class_ids:new Set(),statuses:new Set(),forces:new Set()});
  const x=relMap.get(rel);
  x.occurrence_ids.push(id);
  x.class_ids.add(classByOccurrence.get(id));
  x.statuses.add(row.source_provenance.definition_status);
  x.forces.add(row.source_provenance.logical_force);
}
const probes=[...relMap.entries()].map(([rel,x])=>({
  relation_span_provenance_only:rel,
  occurrence_count:x.occurrence_ids.length,
  quotient_class_ids:[...x.class_ids],
  quotient_class_count:x.class_ids.size,
  definition_statuses:[...x.statuses],
  logical_forces:[...x.forces],
  probe_result:'NO_LAWFUL_SHARED_CANDIDATE_CURRENT_W_AUTHORITY',
  reason:'This recurrence was inspected only after G4. The repeated source spelling cannot supply its own missing semantics; all participating occurrences remain G3 UNEXPANDED_DEMAND. No exact candidate expansion/reconstruction can therefore be specified without adding authority.'
})).filter(x=>x.quotient_class_count>1).sort((a,b)=>b.quotient_class_count-a.quotient_class_count||b.occurrence_count-a.occurrence_count||a.relation_span_provenance_only.localeCompare(b.relation_span_provenance_only));
if(stable(g5.cross_class_surface_recurrence_probes)!==stable(probes)) fail('cross-class recurrence probe mismatch');

const expectedClassIds=(g4.classes||[]).map(c=>c.class_id);
if(stable(g5.unresolved_boundary_class_ids)!==stable(expectedClassIds)) fail('unresolved boundary class list mismatch');
if(!Array.isArray(g5.candidate_basis)||g5.candidate_basis.length!==0) fail('candidate basis must be empty');

const c=g5.counts||{};
if(c.quotient_classes!==352||c.singleton_classes!==singleton||c.multi_member_classes!==multi||
   c.multi_member_uniform_relation_label_classes!==uniform||
   c.multi_member_heterogeneous_relation_label_classes!==hetero||
   c.cross_class_surface_recurrence_probes!==probes.length||
   c.proposed_reusable_candidates!==0||c.unresolved_boundaries!==352) fail('summary counts mismatch');

const fp=g5.fixed_point||{};
if(fp.W_local_G5_complete!==true||fp.candidate_basis_empty!==true||fp.unresolved_boundary_count!==352) fail('G5 fixed point incomplete');
if(fp.W_local_G6_required!==false) fail('G6 incorrectly required without a candidate');
if(fp.W_track_primitive_closure_complete!==false||fp.W_track_sealed!==false) fail('W track closure/seal overclaim');
if(fp.cross_track_comparison_authorized!==false) fail('cross-track comparison overclaim');
if(g5.boundary?.kind!=='GENUINE_CURRENT_AUTHORITY_PRIMITIVE_DOMAIN_BOUNDARY') fail('boundary kind mismatch');

const text=stable({class_results:g5.class_results,cross_class_surface_recurrence_probes:g5.cross_class_surface_recurrence_probes});
if(/L-SSC-/i.test(text)) fail('L evidence leaked into W G5');
for(const row of g5.class_results||[]) if(row.candidate_id!==null) fail('candidate ID unexpectedly present');

execFileSync('node',['experiments/062/tools/verify-w-g4-fixed-point-0-1.mjs'],{stdio:'pipe'});

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-g5-candidate-basis-synthesis.v0.1',
  pass:errors.length===0,
  errors,
  counts:{
    quotient_classes:352,
    singleton_classes:singleton,
    multi_member_classes:multi,
    uniform_relation_label_multi_classes:uniform,
    heterogeneous_relation_label_multi_classes:hetero,
    cross_class_recurrence_probes:probes.length,
    candidate_basis:0,
    unresolved_boundaries:352
  },
  W_local_G5_complete:fp.W_local_G5_complete===true,
  W_local_G6_required:false,
  W_track_primitive_closure_complete:false,
  W_track_sealed:false,
  cross_track_comparison_authorized:false
},null,2));
if(errors.length) process.exit(1);
