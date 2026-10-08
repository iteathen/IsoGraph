import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const fixedPath='experiments/062/L_G5_FIXED_POINT_0_1.json';
const g4FixedPath='experiments/062/L_G4_FIXED_POINT_0_1.json';
const synthesisPath='experiments/062/L_G5_CANDIDATE_BASIS_SYNTHESIS_0_1.json';
const reviewPath='experiments/062/L_G5_SOURCE_SUFFICIENCY_REVIEW_0_1.json';
const synthesisVerifierPath='experiments/062/tools/verify-l-g5-candidate-basis-synthesis-0-1.mjs';

const fixed=JSON.parse(fs.readFileSync(fixedPath,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4FixedPath,'utf8'));
const synthesis=JSON.parse(fs.readFileSync(synthesisPath,'utf8'));
const review=JSON.parse(fs.readFileSync(reviewPath,'utf8'));
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
const errors=[];
const fail=m=>errors.push(m);

if(fixed.schema!=='isograph.exp062-l-g5-fixed-point.v0.1')fail('schema');
if(fixed.status!=='L_LOCAL_G5_COMPLETE_CURRENT_AUTHORITY_BOUNDARY')fail('status');
if(fixed.track!=='L'||fixed.authority!==false)fail('track/authority');
for(const [key,path] of Object.entries({
  g4_fixed_point:g4FixedPath,
  synthesis:synthesisPath,
  source_sufficiency_review:reviewPath,
  verifier:synthesisVerifierPath
})){
 const x=fixed.input?.[key];
 if(x?.path!==path||x?.git_blob_sha!==blob(path))fail(key+' pin mismatch');
}
if(g4.fixed_point?.L_G4_complete!==true||g4.fixed_point?.L_local_G5_authorized!==true)fail('G4 prerequisite');
if(synthesis.status!=='L_LOCAL_G5_FIXED_POINT_NO_LAWFUL_REUSABLE_CANDIDATE')fail('synthesis status');
if(synthesis.counts?.quotient_classes!==345||synthesis.counts?.multi_member_classes!==63||
   synthesis.counts?.multi_member_uniform_relation_label_classes!==5||
   synthesis.counts?.multi_member_heterogeneous_relation_label_classes!==58||
   synthesis.counts?.cross_class_surface_recurrence_probes!==67||
   synthesis.counts?.proposed_reusable_candidates!==0||synthesis.counts?.unresolved_boundaries!==345)fail('synthesis counts');
if(!Array.isArray(synthesis.candidate_basis)||synthesis.candidate_basis.length!==0)fail('candidate basis nonempty');
if(synthesis.fixed_point?.L_local_G5_complete!==true||synthesis.fixed_point?.L_local_G6_required!==false||
   synthesis.fixed_point?.L_track_primitive_closure_complete!==false||synthesis.fixed_point?.L_track_sealed!==false||
   synthesis.fixed_point?.cross_track_comparison_authorized!==false)fail('synthesis fixed point');
if(review.status!=='L_G5_NO_CANDIDATE_CONFIRMED_AFTER_COLLECTIVE_SOURCE_REVIEW')fail('review status');
if(review.conclusion?.proposed_reusable_candidates!==0||review.conclusion?.unresolved_boundaries!==345||
   review.conclusion?.L_local_G5_complete!==true||review.conclusion?.L_local_G6_required!==false||
   review.conclusion?.L_track_primitive_closure_complete!==false||review.conclusion?.L_track_sealed!==false||
   review.conclusion?.cross_track_comparison_authorized!==false||
   review.conclusion?.boundary_kind!=='GENUINE_CURRENT_AUTHORITY_PRIMITIVE_DOMAIN_OR_SOURCE_INFORMATION_BOUNDARY')fail('review conclusion');

const fp=fixed.fixed_point||{};
if(fp.L_local_G5_complete!==true)fail('L G5 not complete');
if(fp.L_local_G6_required!==false)fail('G6 must remain unrequired');
if(fp.L_track_primitive_closure_complete!==false)fail('primitive closure overclaim');
if(fp.L_track_IA_authorized!==false)fail('IA overclaim');
if(fp.L_track_NEI_DTS_DP_authorized!==false)fail('NEI/DTS/DP overclaim');
if(fp.L_track_sealed!==false)fail('seal overclaim');
if(fp.cross_track_comparison_authorized!==false)fail('cross-track overclaim');
if(fp.boundary_kind!=='GENUINE_CURRENT_AUTHORITY_PRIMITIVE_DOMAIN_OR_SOURCE_INFORMATION_BOUNDARY')fail('boundary kind');
if(fixed.verification?.workflow_run_id!==37582648150||fixed.verification?.conclusion!=='success'||
   fixed.verification?.quotient_classes!==345||fixed.verification?.proposed_reusable_candidates!==0||
   fixed.verification?.unresolved_boundaries!==345)fail('verification record');

const text=JSON.stringify({fixed,review});
if(/W-SSC-/i.test(text))fail('W source evidence leaked');
if(/"L_track_sealed":true|"cross_track_comparison_authorized":true|"L_track_IA_authorized":true|"L_local_G6_required":true/.test(text))fail('illegal true gate');

execFileSync('node',[synthesisVerifierPath],{stdio:'pipe'});

console.log(JSON.stringify({
 schema:'isograph.exp062-verify-l-g5-fixed-point.v0.1',
 pass:errors.length===0,
 errors,
 L_local_G5_complete:fp.L_local_G5_complete===true,
 L_local_G6_required:false,
 L_track_primitive_closure_complete:false,
 L_track_IA_authorized:false,
 L_track_NEI_DTS_DP_authorized:false,
 L_track_sealed:false,
 cross_track_comparison_authorized:false,
 boundary_kind:fp.boundary_kind,
 unresolved_boundaries:345,
 candidate_basis:0
},null,2));
if(errors.length)process.exit(1);
