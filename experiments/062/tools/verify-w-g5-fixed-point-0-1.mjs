import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const synthesisPath='experiments/062/W_G5_CANDIDATE_BASIS_SYNTHESIS_0_1.json';
const reviewPath='experiments/062/W_G5_SOURCE_SUFFICIENCY_REVIEW_0_1.json';
const g4Path='experiments/062/W_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const baseVerifier='experiments/062/tools/verify-w-g5-candidate-basis-synthesis-0-1.mjs';

const synthesis=JSON.parse(fs.readFileSync(synthesisPath,'utf8'));
const review=JSON.parse(fs.readFileSync(reviewPath,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const errors=[];
const fail=m=>errors.push(m);

execFileSync('node',[baseVerifier],{stdio:'pipe'});

if(review.schema!=='isograph.exp062-w-g5-source-sufficiency-review.v0.1') fail('review schema mismatch');
if(review.status!=='W_G5_NO_CANDIDATE_CONFIRMED_AFTER_COLLECTIVE_SOURCE_REVIEW') fail('review status mismatch');
if(review.track!=='W') fail('review track mismatch');
if(review.authority!==false) fail('review must remain non-authority');
if(review.input?.synthesis!==synthesisPath) fail('review synthesis path mismatch');

const multi=(g4.classes||[]).filter(c=>c.member_count>1);
if(multi.length!==28) fail('expected 28 multi-member G4 classes');

const synthesisByClass=new Map((synthesis.class_results||[]).map(x=>[x.class_id,x]));
const uniform=multi.filter(c=>{
  const row=synthesisByClass.get(c.class_id);
  return row?.provenance_relation_spans?.length===1;
});
const heterogeneous=multi.filter(c=>{
  const row=synthesisByClass.get(c.class_id);
  return row?.provenance_relation_spans?.length>1;
});
if(uniform.length!==5||heterogeneous.length!==23) fail('uniform/heterogeneous multi-class count mismatch');

const reviewed=review.multi_member_class_review?.uniform_classes||[];
if(reviewed.length!==uniform.length) fail('uniform review coverage mismatch');
const reviewedById=new Map(reviewed.map(x=>[x.class_id,x]));
for(const c of uniform){
  const r=reviewedById.get(c.class_id);
  if(!r){fail('missing uniform review '+c.class_id);continue;}
  if(r.disposition!=='NO_CANDIDATE') fail(c.class_id+': uniform class not rejected');
  if(JSON.stringify(r.members)!==JSON.stringify(c.member_occurrence_ids)) fail(c.class_id+': reviewed member set mismatch');
  const relation=synthesisByClass.get(c.class_id)?.provenance_relation_spans?.[0];
  if(r.surface_relation!==relation) fail(c.class_id+': reviewed surface relation mismatch');
}
if(review.multi_member_class_review?.total_multi_member_classes!==28||
   review.multi_member_class_review?.heterogeneous_surface_relation_classes!==23||
   review.multi_member_class_review?.uniform_surface_relation_classes!==5) fail('review count summary mismatch');

const expectedFamilies=['named operators with no source-local definition','partially stated algebraic/composition operators','explicit equality/identification surfaces','explicit action arrows','specialization/consequence surfaces'];
const actualFamilies=(review.cross_class_collective_review||[]).map(x=>x.family);
if(JSON.stringify(actualFamilies)!==JSON.stringify(expectedFamilies)) fail('cross-class collective review surface incomplete');
for(const x of review.cross_class_collective_review||[]) if(x.disposition!=='NO_CANDIDATE') fail('cross-class review admits candidate '+x.family);

const c=review.conclusion||{};
if(c.proposed_reusable_candidates!==0||c.unresolved_boundaries!==352) fail('review conclusion counts mismatch');
if(c.W_local_G5_complete!==true||c.W_local_G6_required!==false) fail('G5/G6 conclusion mismatch');
if(c.W_track_primitive_closure_complete!==false||c.W_track_sealed!==false) fail('W closure/seal overclaim');
if(c.cross_track_comparison_authorized!==false) fail('cross-track overclaim');
if(c.boundary_kind!=='GENUINE_CURRENT_AUTHORITY_PRIMITIVE_DOMAIN_BOUNDARY') fail('boundary kind mismatch');

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-g5-fixed-point.v0.1',
  pass:errors.length===0,
  errors,
  quotient_classes:352,
  multi_member_classes:28,
  uniform_multi_member_classes:5,
  heterogeneous_multi_member_classes:23,
  proposed_reusable_candidates:0,
  unresolved_boundaries:352,
  W_local_G5_complete:c.W_local_G5_complete===true,
  W_local_G6_required:false,
  W_track_primitive_closure_complete:false,
  W_track_sealed:false,
  cross_track_comparison_authorized:false
},null,2));
if(errors.length) process.exit(1);
