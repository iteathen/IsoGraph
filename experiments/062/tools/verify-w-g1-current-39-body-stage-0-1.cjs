#!/usr/bin/env node
'use strict';
// Only W source-local G1 progression to 39/151; global G1 and G2 must remain OPEN.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const files={
 prior:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_7.json','6898f1f62e85b5cbca3f258b3d7d28a552a3e61a'],
 new:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_8.json','8dced9390509bbb18e22a9327c8acf1d6013c23c'],
 six:['experiments/062/W_G1_W04B_SIX_UNREVIEWED_SOURCE_FIRST_0_2.json','3bd6114a629fe9f958b4ee331fa3cdeb9292a7c5'],
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 g0:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a']
};
for(const [name,[path,s]] of Object.entries(files))assert.equal(sha(path),s,'immutable stage/source revision drift '+name);
const old=read(files.prior[0]),M=read(files.new[0]),six=read(files.six[0]),SSC=read(files.ssc[0]),inverse=read(files.inverse[0]),g0=read(files.g0[0]);
const add=['W-SSC-015','W-SSC-066','W-SSC-067','W-SSC-068','W-SSC-070','W-SSC-071'];
const fromChanged=['W-SSC-068','W-SSC-071'],fromAbsent=['W-SSC-015','W-SSC-066','W-SSC-067','W-SSC-070'];
const clone=x=>structuredClone(x);
const prevReview=new Set(Object.values(old.source_reconciliation.reviewed_ids_by_input).flat());
const byID=new Map(SSC.items.map(x=>[x.id,x])),inverseByID=new Map(inverse.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x]));
function verify(q){
 assert.equal(q.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.8');
 assert.equal(q.stage,'G1_SOURCE_LOCAL_THIRTYNINE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(q.track,'W');
 assert.equal(q.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(q.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(q.G0_qualified_frozen,true);assert.equal(q.G1_complete,false);
 assert.equal(q.G2_authorized,false);assert.equal(q.G3_to_G7_authorized,false);
 assert.equal(q.cross_track_semantics_eligible,false);assert.equal(q.scientific_theory_truth_qualified,false);
 assert.equal(q.source_track_sealed,false);assert.equal(q.PR70_merge_authorized,false);
 assert.equal(q.source_only_authority,true);
 assert.equal(q.independent_external_third_party_G1_validation_claimed,false);
 assert.deepEqual(q.predecessor,{path:files.prior[0],git_blob_sha:files.prior[1],preserved_unchanged:true});
 assert.equal(q.current_G1_qualification_scope,'SOURCE_LOCAL_39_OF_151_ONLY');
 assert.equal(Object.keys(q.source_inputs).length,Object.keys(old.source_inputs).length+1);
 assert.equal(Object.keys(q.verified_workflows).length,Object.keys(old.verified_workflows).length+1);
 for(const [key,value] of Object.entries(old.source_inputs))assert.deepEqual(q.source_inputs[key],value,'changed past source input '+key);
 for(const [key,value] of Object.entries(old.verified_workflows))assert.deepEqual(q.verified_workflows[key],value,'changed past verified CI '+key);
 assert.deepEqual(q.source_inputs.W04b_remaining_six,{path:files.six[0],sha:files.six[1]});
 assert.deepEqual(q.historical_CI_failures_not_reclassified.slice(0,-2),old.historical_CI_failures_not_reclassified);
 assert.deepEqual(q.historical_CI_failures_not_reclassified.slice(-2),[
 {id:38175961045,reason:'W04B_V01_MATH_MARKUP_SEPARATED_AUTHOR_LINE29_FIXTURE',qualification:'FAILED'},
 {id:38176046371,reason:'W04B_V02_VERIFIER_NONEXISTENT_CANDIDATE_FREEZE_POINTER_SCHEMA',qualification:'FAILED'}]);
 const ci=q.verified_workflows.W04b_remaining_six;
 assert.equal(ci.id,38176150976);
 assert.equal(ci.job_id,114578857171);
 assert.equal(ci.head,'84d01d33d8f23c47a681ffddb83a914dd8b3a756');
 assert.equal(ci.conclusion,'success');
 assert.equal(ci.original_source_url,'https://www.math.columbia.edu/~woit/wordpress/?p=15600');
 assert.equal(ci.original_author_sha256,'b706bc304a45c29059e74c5db0be3e8cd4da25f0d71f68de941d45db38d4cb67');
 assert.equal(ci.original_clean_reads,2);assert.equal(ci.cold_source_anchors,19);
 assert.equal(ci.author_original_blog_comments_excluded,true);
 assert.equal(ci.source_local_candidate_bodies,6);assert.equal(ci.source_local_occurrences,45);
 assert.equal(ci.adversarial_guards,30);
 assert.deepEqual(ci.reviewed_ids,add);
 assert.equal(ci.previous_W_source_local_reviewed,33);
 assert.equal(ci.historical_Oct03_original_raw_identity_qualified,false);
 assert.equal(ci.G1_global_complete,false);
 assert.equal(ci.G2_authorized,false);
 assert.deepEqual(six.rows.map(x=>x.census_id),add);
 assert.deepEqual(six.rows.map(x=>x.occurrences.length),[2,9,9,10,4,11]);
 assert.equal(six.summary.authored_occurrence_candidates,45);
 assert.equal(six.G1_global_complete,false);
 const before=old.source_reconciliation,now=q.source_reconciliation;
 assert.equal(before.current_source_local_reviewed_count,33);
 assert.equal(now.current_source_local_reviewed_count,39);
 assert.equal(now.candidate_author_source_occurrences,262);
 assert.equal(now.target_SSC_bodies,151);
 assert.equal(now.source_local_bodies_not_yet_reviewed,112);
 assert.equal(now.remaining_category_counts.exact_prior_body_but_occurrence_audit_not_complete,0);
 assert.equal(now.remaining_category_counts.changed_prior_body_unreviewed,56);
 assert.equal(now.remaining_category_counts.no_prior_occurrences,56);
 assert.equal(now.old_historical_84_body_occurrence_extraction_authority,false);
 for(const [k,v] of Object.entries(before.reviewed_ids_by_input))assert.deepEqual(now.reviewed_ids_by_input[k],v,'historical reviewed IDs changed '+k);
 assert.equal(Object.keys(now.reviewed_ids_by_input).length,Object.keys(before.reviewed_ids_by_input).length+1);
 assert.deepEqual(now.reviewed_ids_by_input.W04b_remaining_six,add);
 for(const id of add)assert.ok(!prevReview.has(id));
 for(const id of fromChanged)assert.ok(before.remaining_by_mechanism.historical_body_modified_but_unreviewed.includes(id));
 for(const id of fromAbsent)assert.ok(before.remaining_by_mechanism.no_historical_G1_extraction.includes(id));
 assert.deepEqual(now.remaining_by_mechanism.historical_body_modified_but_unreviewed,before.remaining_by_mechanism.historical_body_modified_but_unreviewed.filter(id=>!fromChanged.includes(id)));
 assert.deepEqual(now.remaining_by_mechanism.no_historical_G1_extraction,before.remaining_by_mechanism.no_historical_G1_extraction.filter(id=>!fromAbsent.includes(id)));
 assert.deepEqual(now.remaining_by_mechanism.historical_body_exact_but_unreviewed,before.remaining_by_mechanism.historical_body_exact_but_unreviewed);
 assert.equal(now.classes_now_defended.length,before.classes_now_defended.length+6);
 assert.deepEqual(now.classes_now_defended.slice(0,before.classes_now_defended.length),before.classes_now_defended);
 const all=Object.values(now.reviewed_ids_by_input).flat();
 const missing=[...now.remaining_by_mechanism.historical_body_modified_but_unreviewed,...now.remaining_by_mechanism.no_historical_G1_extraction];
 const expectedIDs=new Set(SSC.items.map(x=>x.id));
 assert.equal(all.length,39);assert.equal(new Set(all).size,39);
 assert.equal(missing.length,112);assert.equal(new Set(missing).size,112);
 assert.deepEqual(new Set([...all,...missing]),expectedIDs);
 assert.equal(SSC.items.length,151);
 assert.equal(inverse.current_ssc_to_original_inverse.length,151);
 assert.equal(inverse.summary.original_to_ssc_pair_count,560);
 assert.equal(g0.current.G0_frozen,true);
 assert.equal(g0.historical_oct03_target.G0_complete,false);
 assert.equal(q.W04b_remaining_six_original_first_addendum.qualified_run_id,38176150976);
 assert.deepEqual(q.W04b_remaining_six_original_first_addendum.reviewed_ids,add);
 assert.deepEqual(q.W04b_remaining_six_original_first_addendum.previous_W04b_G1_reviewed_ids,['W-SSC-014','W-SSC-069']);
 assert.equal(q.W04b_remaining_six_original_first_addendum.all_W04b_source_identities_now_G1_source_locally_reviewed,true);
 assert.equal(q.W04b_remaining_six_original_first_addendum.current_W04b_source_item_total,8);
 assert.equal(q.W04b_remaining_six_original_first_addendum.G2_authorized,false);
 assert.equal(q.W04b_remaining_six_original_first_addendum.source_theory_proven,false);
 assert.equal(q.W04b_remaining_six_original_first_addendum.old_original_oct03_G0_proven,false);
 const W04b=SSC.items.filter(x=>x.source==='W04b').map(x=>x.id);
 assert.equal(W04b.length,8);
 assert.ok(W04b.every(id=>all.includes(id)));
 assert.equal(q.next_gate.includes('112 W current G1'),true);
 return {current_source_target_G0:'FROZEN',current_W_G1:'39/151_SOURCE_LOCAL',author_occurrences:262,remaining:112,changed_historical:56,no_historical:56,G2:'BLOCKED'};
}
const result=verify(clone(M));
const tests=[
 ['false G1 qualification',q=>q.G1_complete=true],
 ['force G2',q=>q.G2_authorized=true],
 ['reclassify historical Oct03',q=>q.original_2026_10_03_target_G0='PASS'],
 ['force imported cross-author',q=>q.cross_track_semantics_eligible=true],
 ['alter prior verified CI',q=>q.verified_workflows.W04a_remaining_six.conclusion='failed'],
 ['new W04b CI failed',q=>q.verified_workflows.W04b_remaining_six.conclusion='failed'],
 ['new W04b wrong CI SHA',q=>q.verified_workflows.W04b_remaining_six.head='BAD'],
 ['source retrieval missing',q=>q.verified_workflows.W04b_remaining_six.original_clean_reads=0],
 ['original anchor shrink',q=>q.verified_workflows.W04b_remaining_six.cold_source_anchors=0],
 ['hyperfunction source hostiles misreported',q=>q.verified_workflows.W04b_remaining_six.adversarial_guards=0],
 ['claim old failure succeeded',q=>q.historical_CI_failures_not_reclassified.at(-1).qualification='SUCCESS'],
 ['remove failed old run',q=>q.historical_CI_failures_not_reclassified.pop()],
 ['mute stage source G0',q=>q.source_inputs.freeze.sha='bad'],
 ['misbind W04b source',q=>q.source_inputs.W04b_remaining_six.sha='bad'],
 ['inject old reviewed W069 twice',q=>q.source_reconciliation.reviewed_ids_by_input.W04b_remaining_six[0]='W-SSC-069'],
 ['remove new W071',q=>q.source_reconciliation.reviewed_ids_by_input.W04b_remaining_six.pop()],
 ['orphan 112th unreviewed source',q=>q.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.pop()],
 ['old 58 unchanged',q=>q.source_reconciliation.remaining_by_mechanism.historical_body_modified_but_unreviewed.push('W-SSC-068')],
 ['no-historical count drift',q=>q.source_reconciliation.remaining_category_counts.no_prior_occurrences=60],
 ['G1 count drift',q=>q.source_reconciliation.current_source_local_reviewed_count=40],
 ['occurrence denominator drift',q=>q.source_reconciliation.candidate_author_source_occurrences=263],
 ['remaining source denominator drift',q=>q.source_reconciliation.source_local_bodies_not_yet_reviewed=111],
 ['false W04b all covered',q=>q.W04b_remaining_six_original_first_addendum.current_W04b_source_item_total=7],
 ['claim theorem',q=>q.W04b_remaining_six_original_first_addendum.source_theory_proven=true],
 ['forget cold Woit authorship',q=>q.verified_workflows.W04b_remaining_six.author_original_blog_comments_excluded=false],
 ['silently seal W',q=>q.source_track_sealed=true],
 ['alter predecessor stage SHA',q=>q.predecessor.git_blob_sha='bad'],
 ['erase historical source failure record',q=>q.historical_CI_failures_not_reclassified.shift()]
];
for(const [name,mut]of tests){const c=clone(M);mut(c);let fail=false;try{verify(c)}catch(e){fail=true;}assert.ok(fail,'HOSTILE ESCAPED '+name)}
console.log('W G1 current source-local 39 body stage PASS '+JSON.stringify({...result,adversarial_rejected:tests.length,adversarial_total:tests.length}));
