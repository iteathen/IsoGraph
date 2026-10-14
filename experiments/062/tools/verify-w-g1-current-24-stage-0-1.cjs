#!/usr/bin/env node
'use strict';
// W 24/151 G1 source-local original-first qualified stage. Not global G1 or G2.
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const p={
 prev:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_4.json','57f0fa392ad02c2fb522d4c6f5127c8db29549eb'],
 newpdf:['experiments/062/W_G1_W084_W095_W126_CURRENT_ORIGINAL_FIRST_0_1.json','f506682020063d9ed91bbc3455c14d880ffeddec'],
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 gate:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a']
};
for(const [key,[path,h]]of Object.entries(p))assert.equal(blob(path),h,'SOURCE INPUT SHA CHANGED '+key);
const prev=read(p.prev[0]),addition=read(p.newpdf[0]),SSC=read(p.ssc[0]),inverse=read(p.inverse[0]),gate=read(p.gate[0]);
const m=read('experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_5.json');
const copy=x=>structuredClone(x);
const newIds=['W-SSC-084','W-SSC-095','W-SSC-126'];
function verify(s){
 assert.equal(s.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.5');
 assert.equal(s.track,'W');
 assert.equal(s.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(s.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(s.stage,'G1_SOURCE_LOCAL_TWENTYFOUR_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(s.G0_qualified_frozen,true);
 for(const k of ['G1_complete','G2_authorized','G3_to_G7_authorized','cross_track_semantics_eligible','scientific_theory_truth_qualified','source_track_sealed','PR70_merge_authorized','independent_external_third_party_G1_validation_claimed'])assert.equal(s[k],false,'FORBIDDEN_PROMOTION '+k);
 assert.equal(s.predecessor.path,p.prev[0]);
 assert.equal(s.predecessor.git_blob_sha,p.prev[1]);
 assert.equal(s.predecessor.preserved_unchanged,true);
 assert.equal(prev.stage,'G1_SOURCE_LOCAL_TWENTYONE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(prev.source_reconciliation.current_source_local_reviewed_count,21);
 assert.equal(prev.source_reconciliation.candidate_author_source_occurrences,164);
 assert.equal(gate.current.G0_frozen,true);
 assert.equal(gate.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(gate.historical_oct03_target.G0_complete,false);
 assert.equal(SSC.items.length,151);
 assert.equal(inverse.current_ssc_to_original_inverse.length,151);
 assert.deepEqual(s.source_inputs.W04d_W04e_PDF_threes,{path:p.newpdf[0],sha:p.newpdf[1]});
 for(const k of Object.keys(prev.source_inputs))assert.deepEqual(s.source_inputs[k],prev.source_inputs[k],'historical input modified '+k);
 const n=s.source_reconciliation, old=prev.source_reconciliation;
 for(const k of Object.keys(old.reviewed_ids_by_input))assert.deepEqual(n.reviewed_ids_by_input[k],old.reviewed_ids_by_input[k],'conserved old W reviewed ids '+k);
 assert.deepEqual(n.reviewed_ids_by_input.W04d_W04e_PDF_threes,newIds);
 const idsets=Object.values(n.reviewed_ids_by_input).flat();
 assert.equal(idsets.length,24);assert.equal(new Set(idsets).size,24);
 const left=n.remaining_by_mechanism;
 assert.deepEqual(left.historical_body_exact_but_unreviewed,[]);
 assert.deepEqual(left.historical_body_modified_but_unreviewed,old.remaining_by_mechanism.historical_body_modified_but_unreviewed);
 assert.deepEqual(left.no_historical_G1_extraction,old.remaining_by_mechanism.no_historical_G1_extraction);
 assert.deepEqual(left.historical_body_modified_but_unreviewed.length,60);
 assert.deepEqual(left.no_historical_G1_extraction.length,67);
 assert.equal(n.current_source_local_reviewed_count,24);
 assert.equal(n.source_local_bodies_not_yet_reviewed,127);
 assert.equal(n.candidate_author_source_occurrences,182);
 assert.deepEqual(n.remaining_category_counts,{
   exact_prior_body_but_occurrence_audit_not_complete:0,
   changed_prior_body_unreviewed:60,
   no_prior_occurrences:67
 });
 assert.equal(n.old_stage_count_reconciliation.previous_stage_0_4.remaining_list_exact_length,3);
 assert.equal(n.old_stage_count_reconciliation.previous_stage_0_4.reported_remaining_category_exact_count,6);
 assert.equal(n.old_stage_count_reconciliation.previous_stage_0_4.prior_stage_kept_historical,true);
 assert.equal(n.old_stage_count_reconciliation.current_exact_recomputed_from_actual_151_item_set,0);
 assert.deepEqual(n.source_overlap_and_original_authority,old.source_overlap_and_original_authority);
 for(const x of old.classes_now_defended)assert.ok(n.classes_now_defended.includes(x),'lost previous G1 guard '+x);
 for(const x of [
 "OS_CONVENTIONAL_REFLECTION_CHOICE_THETA_VS_UNBUILT_FOUR_DIM_CHIRAL_THETA",
 "TWISTOR_GEOMETRY_ALL_FOUR_RIEMANNIAN_VS_COMPLEX_HOLOMORPHIC_ONLY_IF_ASD",
 "WARD_PENROSE_CERTAIN_PT_PLUS_BUNDLES_RIGHT_WEYL_SD_EUCLIDEAN_HALF_AND_MINKOWSKI_BOUNDARY"
 ])assert.ok(n.classes_now_defended.includes(x));
 const allIds=[...idsets,...Object.values(left).flat()];
 assert.equal(allIds.length,151);assert.equal(new Set(allIds).size,151);
 assert.deepEqual([...allIds].sort(),SSC.items.map(x=>x.id).sort(),'incomplete current G1 accounting denominator');
 assert.equal(addition.counts.new_exact_historical_bodies,3);
 assert.equal(addition.counts.occurrence_candidates,18);
 assert.deepEqual(addition.rows.map(x=>x.census_id),newIds);
 const inv=new Map(inverse.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x]));
 for(const row of addition.rows){
    assert.ok(idsets.includes(row.census_id));
    const v=inv.get(row.census_id);
    assert.equal(row.source_unit,v.unit);
    assert.deepEqual([row.original.current_G0_source_location],v.original_source_keys);
    assert.deepEqual(v.source_typed_statement_ids,[]);
 }
 assert.equal(s.verified_workflows.W04d_W04e_three_original_PDF.id,38161623011);
 assert.equal(s.verified_workflows.W04d_W04e_three_original_PDF.job_id,114535561333);
 assert.equal(s.verified_workflows.W04d_W04e_three_original_PDF.head,'deaa6fd49f5d9f54b326dde33cad9ceaeeedf54a');
 assert.equal(s.verified_workflows.W04d_W04e_three_original_PDF.conclusion,'success');
 assert.equal(s.verified_workflows.W04d_W04e_three_original_PDF.hostile_rejected,22);
 assert.equal(s.verified_workflows.W04d_W04e_three_original_PDF.originals_checked,2);
 assert.equal(s.verified_workflows.W04d_W04e_three_original_PDF.original_source_bodies.length,3);
 for(const [key,v] of Object.entries(prev.verified_workflows))assert.deepEqual(s.verified_workflows[key],v,'old valid CI not preserved '+key);
 for(const oldFail of prev.historical_CI_failures_not_reclassified)assert.ok(s.historical_CI_failures_not_reclassified.some(x=>JSON.stringify(x)===JSON.stringify(oldFail)));
 const fail=s.historical_CI_failures_not_reclassified.find(x=>x.id===38161466294);
 assert.equal(fail.qualification,'FAILED');
 assert.equal(s.source_only_authority,true);
 assert.equal(s.new_G1_original_cold_review.original_source_PDF_sha_verified,true);
 assert.equal(s.new_G1_original_cold_review.W04d_metric_ASD_conditional_holomorphic,true);
 assert.equal(s.new_G1_original_cold_review.W04e_certain_PTplus_bundles_right_chiral_SD_connection,true);
 assert.equal(s.new_G1_original_cold_review.W04e_conventional_Theta_not_constructed_chiral_Theta,true);
 assert.equal(s.new_G1_original_cold_review.external_third_party_proof_imported,false);
 assert.equal(s.current_G1_qualification_scope,'SOURCE_LOCAL_24_OF_151_ONLY');
 assert.ok(s.next_gate.includes('60') && s.next_gate.includes('67'));
 return {G1:'24_OF_151_SOURCE_LOCAL',W_G0:'FROZEN_CURRENT_ONLY',G1_remaining:127,changed_body_frontier:60,no_old_G1:67,author_occurrences:182,old_Oct03:'OPEN',G2:'BLOCKED'};
}
const ok=verify(copy(m));
const cases=[
 ['false G1 complete',x=>x.G1_complete=true],
 ['false G2',x=>x.G2_authorized=true],
 ['false W-L',x=>x.cross_track_semantics_eligible=true],
 ['false Oct03',x=>x.original_2026_10_03_target_G0='CLOSED'],
 ['remove one original reviewed ID',x=>x.source_reconciliation.reviewed_ids_by_input.W04d_W04e_PDF_threes.pop()],
 ['duplicate old reviewed ID',x=>x.source_reconciliation.reviewed_ids_by_input.W04d_W04e_PDF_threes[0]=x.source_reconciliation.reviewed_ids_by_input.three[0]],
 ['drop current G1 remaining ID',x=>x.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.pop()],
 ['incorrect SSC denominator',x=>x.source_reconciliation.current_source_local_reviewed_count=25],
 ['spurious math theorem',x=>x.scientific_theory_truth_qualified=true],
 ['bad 182 exact author occurrence count',x=>x.source_reconciliation.candidate_author_source_occurrences=200],
 ['erase ASD guard',x=>x.new_G1_original_cold_review.W04d_metric_ASD_conditional_holomorphic=false],
 ['erase certain PT+ guard',x=>x.new_G1_original_cold_review.W04e_certain_PTplus_bundles_right_chiral_SD_connection=false],
 ['misconstrue Theta',x=>x.new_G1_original_cold_review.W04e_conventional_Theta_not_constructed_chiral_Theta=false],
 ['remove original source pin',x=>x.source_inputs.W04d_W04e_PDF_threes.sha='bad'],
 ['lose old source validation',x=>x.source_inputs.three.sha='bad'],
 ['stage false success',x=>x.verified_workflows.W04d_W04e_three_original_PDF.conclusion='failure'],
 ['stage wrong CI job',x=>x.verified_workflows.W04d_W04e_three_original_PDF.job_id=0],
 ['reclassify original failed verification',x=>x.historical_CI_failures_not_reclassified.find(y=>y.id===38161466294).qualification='PASS'],
 ['delete prior failures',x=>x.historical_CI_failures_not_reclassified=[]],
 ['rewrite prior 21 source IDs',x=>x.source_reconciliation.reviewed_ids_by_input.three=[]],
 ['fake source fully sealed',x=>x.source_track_sealed=true],
 ['source-uncertainty attribution',x=>x.new_G1_original_cold_review.external_third_party_proof_imported=true],
 ['bad historical stage count repair',x=>x.source_reconciliation.old_stage_count_reconciliation.previous_stage_0_4.remaining_list_exact_length=6],
 ['false G1 final scope',x=>x.current_G1_qualification_scope='COMPLETE_151'],
 ['invent new math class',x=>x.source_reconciliation.classes_now_defended=[]]
];
for(const [name,edit] of cases){const x=copy(m);edit(x);let caught=false;try{verify(x)}catch(e){caught=true;}assert.ok(caught,'hostile escaped '+name)}
console.log('W G1 CURRENT SOURCE 24 BODY STAGE QUALIFICATION PASS '+JSON.stringify({...ok,adversarial_rejections:cases.length,adversarial_total:cases.length}));
