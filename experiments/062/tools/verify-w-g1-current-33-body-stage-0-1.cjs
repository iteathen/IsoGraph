#!/usr/bin/env node
'use strict';
// W current-source G1 scoped 33 body stage exact successor, G1 GLOBAL OPEN.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const path={
old:'experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_6.json',
curr:'experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_7.json',
author:'experiments/062/W_G1_W04A_SIX_REMAINING_AUTHOR_SOURCE_FIRST_0_1.json',
ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json',
inverse:'experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json',
G0:'experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json'
};
const pins={
old:'b3f5f69ba57d6b4dd48d9a2d14ab903546621a7a',
curr:'6898f1f62e85b5cbca3f258b3d7d28a552a3e61a',
author:'df2f9cf8741d17bce974913b48198a675aab68c3',
ssc:'f13075a1e2b039bab66e738cc992e121cd6c9947',
inverse:'6a959eabe8803770bc8e9851e288de6535821477',
G0:'e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'
};
for(const [k,v]of Object.entries(pins))assert.equal(gitBlob(path[k]),v,'immutable input changed '+k);
const old=read(path.old),actual=read(path.curr),author=read(path.author),SSC=read(path.ssc),inverse=read(path.inverse),gate=read(path.G0);
const added=['W-SSC-011','W-SSC-012','W-SSC-013','W-SSC-063','W-SSC-064','W-SSC-065'];
const sourceID=new Set(SSC.items.map(x=>x.id));
const oldReviewed=Object.values(old.source_reconciliation.reviewed_ids_by_input).flat(),oldReviewSet=new Set(oldReviewed);
const clone=x=>JSON.parse(JSON.stringify(x));
function verify(j){
 assert.equal(j.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.7');
 assert.equal(j.stage,'G1_SOURCE_LOCAL_THIRTYTHREE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(j.track,'W');
 assert.equal(j.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(j.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(j.G0_qualified_frozen,true);assert.equal(j.G1_complete,false);
 assert.equal(j.G2_authorized,false);assert.equal(j.G3_to_G7_authorized,false);
 assert.equal(j.cross_track_semantics_eligible,false);
 assert.equal(j.scientific_theory_truth_qualified,false);
 assert.equal(j.source_track_sealed,false);assert.equal(j.PR70_merge_authorized,false);
 assert.equal(j.source_only_authority,true);
 assert.equal(j.independent_external_third_party_G1_validation_claimed,false);
 assert.deepEqual(j.predecessor,{path:path.old,git_blob_sha:pins.old,preserved_unchanged:true});
 assert.equal(j.current_G1_qualification_scope,'SOURCE_LOCAL_33_OF_151_ONLY');
 for(const [name,val] of Object.entries(old.source_inputs))assert.deepEqual(j.source_inputs[name],val,'past input changed '+name);
 for(const [name,val] of Object.entries(old.verified_workflows))assert.deepEqual(j.verified_workflows[name],val,'past qualified run changed '+name);
 assert.equal(Object.keys(j.source_inputs).length,Object.keys(old.source_inputs).length+1);
 assert.equal(Object.keys(j.verified_workflows).length,Object.keys(old.verified_workflows).length+1);
 assert.deepEqual(j.source_inputs.W04a_remaining_six,{path:path.author,sha:pins.author});
 assert.equal(j.historical_CI_failures_not_reclassified.length,old.historical_CI_failures_not_reclassified.length+2);
 assert.deepEqual(j.historical_CI_failures_not_reclassified.slice(0,-2),old.historical_CI_failures_not_reclassified);
 assert.deepEqual(j.historical_CI_failures_not_reclassified.slice(-2),[
  {id:38168733900,reason:'W04A_SIX_FIRST_VERIFIER_QUALIFIER_SCHEMA_MISMATCH',qualification:'FAILED'},
  {id:38168824307,reason:'W04A_SIX_SECOND_VERIFIER_CONVENTIONAL_OS_MUTATION_ESCAPE',qualification:'FAILED'}]);
 const ci=j.verified_workflows.W04a_remaining_six;
 assert.equal(ci.id,38168903764);assert.equal(ci.job_id,114557162034);
 assert.equal(ci.head,'189b19971504fc6c5aecd640c1e5948a40a95e43');
 assert.equal(ci.conclusion,'success');
 assert.equal(ci.original_author,'W04a March 5 2026');
 assert.equal(ci.original_source_sha256,'69792bb18e780484b0bdf491f5029d9bbeef04db7de677bd10122ffe7e869659');
 assert.equal(ci.original_reads,2);assert.equal(ci.source_anchor_count,11);
 assert.equal(ci.source_adversarial_controls,8);assert.equal(ci.G1_adversarial_controls,28);
 assert.deepEqual(ci.reviewed_ids,added);assert.equal(ci.occurrences,15);
 assert.equal(ci.original_Oct03_G0_completed,false);
 assert.equal(ci.new_source_G0_conserved,true);assert.equal(ci.G2_authorized,false);
 assert.equal(author.summary.six_new_source_bodies,6);
 assert.equal(author.summary.occurrence_candidates,15);
 assert.deepEqual(author.rows.map(x=>x.census_id),added);
 const s=j.source_reconciliation,p=old.source_reconciliation;
 assert.equal(s.current_source_local_reviewed_count,33);
 assert.equal(s.candidate_author_source_occurrences,217);
 assert.equal(s.target_SSC_bodies,151);
 assert.equal(s.source_local_bodies_not_yet_reviewed,118);
 assert.equal(s.remaining_category_counts.exact_prior_body_but_occurrence_audit_not_complete,0);
 assert.equal(s.remaining_category_counts.changed_prior_body_unreviewed,58);
 assert.equal(s.remaining_category_counts.no_prior_occurrences,60);
 assert.equal(s.old_historical_84_body_occurrence_extraction_authority,false);
 assert.deepEqual(s.reviewed_ids_by_input.W04a_remaining_six,added);
 assert.equal(Object.keys(s.reviewed_ids_by_input).length,Object.keys(p.reviewed_ids_by_input).length+1);
 for(const [k,x]of Object.entries(p.reviewed_ids_by_input))assert.deepEqual(s.reviewed_ids_by_input[k],x,'past reviewed owner modified '+k);
 for(const id of added)assert.ok(!oldReviewSet.has(id)&&p.remaining_by_mechanism.no_historical_G1_extraction.includes(id));
 assert.deepEqual(s.remaining_by_mechanism.historical_body_exact_but_unreviewed,p.remaining_by_mechanism.historical_body_exact_but_unreviewed);
 assert.deepEqual(s.remaining_by_mechanism.historical_body_modified_but_unreviewed,p.remaining_by_mechanism.historical_body_modified_but_unreviewed);
 assert.deepEqual(s.remaining_by_mechanism.no_historical_G1_extraction,p.remaining_by_mechanism.no_historical_G1_extraction.filter(id=>!added.includes(id)));
 const reviewed=Object.values(s.reviewed_ids_by_input).flat(),remaining=[
 ...s.remaining_by_mechanism.historical_body_modified_but_unreviewed,
 ...s.remaining_by_mechanism.no_historical_G1_extraction];
 assert.equal(reviewed.length,33);assert.equal(new Set(reviewed).size,33);
 assert.equal(remaining.length,118);assert.equal(new Set(remaining).size,118);
 assert.ok(remaining.every(x=>sourceID.has(x)&&!reviewed.includes(x)));
 assert.deepEqual(new Set([...reviewed,...remaining]),sourceID);
 assert.equal(SSC.items.length,151);
 assert.equal(inverse.current_ssc_to_original_inverse.length,151);
 assert.equal(gate.current.G0_frozen,true);
 assert.equal(gate.historical_oct03_target.G0_complete,false);
 assert.equal(j.W04a_remaining_six_original_first_addendum.CI_run,38168903764);
 assert.equal(j.W04a_remaining_six_original_first_addendum.W04a_all_10_G0_source_ids_now_source_local_G1_reviewed,true);
 assert.equal(j.W04a_remaining_six_original_first_addendum.G0_source_id_count,10);
 assert.equal(j.W04a_remaining_six_original_first_addendum.source_physics_proven,false);
 assert.equal(j.W04a_remaining_six_original_first_addendum.old_Oct03_historical_identity_verified,false);
 assert.deepEqual(j.W04a_remaining_six_original_first_addendum.old_failed_runs,[38168733900,38168824307]);
 assert.deepEqual(j.W04a_remaining_six_original_first_addendum.reviewed_ids,added);
 assert.equal(s.candidate_author_source_occurrences,p.candidate_author_source_occurrences+15);
 assert.equal(s.remaining_category_counts.no_prior_occurrences,p.remaining_category_counts.no_prior_occurrences-6);
 assert.ok(j.next_gate.includes('118 W bodies'));
 return {W_G1_source_local:'33/151',G1_candidate_occurrences:217,remaining:118,changed_prior:58,absent_prior:60,G2:'BLOCKED',old_Oct03_G0:'OPEN'};
}
const yes=verify(clone(actual));
const attacks=[
 ['fake G1 all complete',q=>q.G1_complete=true],
 ['authorize G2',q=>q.G2_authorized=true],
 ['erase historical G0',q=>q.original_2026_10_03_target_G0='CLOSED'],
 ['fake third party mathematical proof',q=>q.scientific_theory_truth_qualified=true],
 ['mutate prior source input',q=>q.source_inputs.ssc.sha='BAD'],
 ['mutate frozen G0',q=>q.source_inputs.freeze.sha='BAD'],
 ['mutate March5 source review',q=>q.source_inputs.W04a_remaining_six.sha='BAD'],
 ['wrong CI run',q=>q.verified_workflows.W04a_remaining_six.id=0],
 ['wrong successful head',q=>q.verified_workflows.W04a_remaining_six.head='BAD'],
 ['forget source original witness',q=>q.verified_workflows.W04a_remaining_six.source_anchor_count=10],
 ['forget correct hostile count',q=>q.verified_workflows.W04a_remaining_six.G1_adversarial_controls=27],
 ['reclassify failed CI',q=>q.historical_CI_failures_not_reclassified.at(-1).qualification='SUCCESS'],
 ['remove failure record',q=>q.historical_CI_failures_not_reclassified.pop()],
 ['add false G1 body',q=>q.source_reconciliation.reviewed_ids_by_input.W04a_remaining_six.push('W-SSC-035')],
 ['erase verified W065',q=>q.source_reconciliation.reviewed_ids_by_input.W04a_remaining_six.pop()],
 ['lose an open source body',q=>q.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.pop()],
 ['count drift 33',q=>q.source_reconciliation.current_source_local_reviewed_count=34],
 ['count drift occurrences',q=>q.source_reconciliation.candidate_author_source_occurrences=218],
 ['declare wrong remaining',q=>q.source_reconciliation.source_local_bodies_not_yet_reviewed=117],
 ['pretend W04a still incomplete',q=>q.W04a_remaining_six_original_first_addendum.W04a_all_10_G0_source_ids_now_source_local_G1_reviewed=false],
 ['invent source-theory truth',q=>q.W04a_remaining_six_original_first_addendum.source_physics_proven=true],
 ['replace old 27 approved source',q=>q.source_reconciliation.reviewed_ids_by_input.three[0]='W-SSC-036'],
 ['forge prior full stage',q=>q.predecessor.git_blob_sha='BAD'],
 ['misreport cross-author',q=>q.cross_track_semantics_eligible=true],
 ['lie about original author source',q=>q.verified_workflows.W04a_remaining_six.original_source_sha256='BAD']
];
for(const [name,mutate]of attacks){const candidate=clone(actual);mutate(candidate);let failed=false;try{verify(candidate)}catch(e){failed=true;}assert.ok(failed,'HOSTILE ESCAPED: '+name)}
console.log('W G1 current-author source-local 33 body stage PASS '+JSON.stringify({...yes,adversarial_rejected:attacks.length,adversarial_total:attacks.length}));
