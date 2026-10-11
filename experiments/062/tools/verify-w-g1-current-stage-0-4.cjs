#!/usr/bin/env node
'use strict';
// W source-local G1 21/151 only. Must reject full G1, G2, Oct03 freeze.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p));
const blob=p=>{let b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const INPUT={
 prior:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_3.json','dff23ea971d6c73e20679e380f2256747e491462'],
 w043:['experiments/062/W_G1_W043_ORIGINAL_SECTION43_COLD_SOURCE_0_1.json','4f7ce3913758fa6e3dd3c4ae72d918bb71b1b8b3'],
 w033:['experiments/062/W_G1_W033_W113_ORIGINAL_AUTHOR_SECTION41_0_1.json','bb669900daac66f900de9e981c747ad5bfac1ba3'],
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 frozen:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477']
};
for(const [k,[p,sha]]of Object.entries(INPUT))assert.equal(blob(p),sha,'prior verified W frozen evidence SHA drift '+k);
const prior=read(INPUT.prior[0]),w043=read(INPUT.w043[0]),w033=read(INPUT.w033[0]),ssc=read(INPUT.ssc[0]),frozen=read(INPUT.frozen[0]),inverse=read(INPUT.inverse[0]);
const stage=read('experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_4.json');
const clone=x=>JSON.parse(JSON.stringify(x));
const tuple=[['W01_S43_W043',['W-SSC-043'],INPUT.w043,38153727147,114512275992,8,8,20],
 ['W01_S41_W033_W113',['W-SSC-033','W-SSC-113'],INPUT.w033,38154197336,114513670402,20,12,25]];
const freshIds=['W-SSC-033','W-SSC-043','W-SSC-113'];
function verify(m){
 assert.equal(m.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.4');
 assert.equal(m.track,'W');assert.equal(m.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(m.stage,'G1_SOURCE_LOCAL_TWENTYONE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(m.current_G1_qualification_scope,'SOURCE_LOCAL_21_OF_151_ONLY');
 assert.equal(m.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(m.G0_qualified_frozen,true);assert.equal(m.G1_complete,false);assert.equal(m.G2_authorized,false);
 assert.equal(m.G3_to_G7_authorized,false);assert.equal(m.cross_track_semantics_eligible,false);
 assert.equal(m.scientific_theory_truth_qualified,false);assert.equal(m.source_track_sealed,false);assert.equal(m.PR70_merge_authorized,false);
 assert.equal(frozen.current.G0_frozen,true);assert.equal(frozen.historical_oct03_target.G0_complete,false);
 assert.equal(ssc.items.length,151);assert.equal(inverse.current_ssc_to_original_inverse.length,151);
 assert.equal(m.predecessor.path,INPUT.prior[0]);assert.equal(m.predecessor.git_blob_sha,INPUT.prior[1]);assert.equal(m.predecessor.preserved_unchanged,true);
 assert.equal(prior.G1_complete,false);assert.equal(prior.source_reconciliation.current_source_local_reviewed_count,18);
 assert.equal(m.source_reconciliation.current_source_local_reviewed_count,21);
 assert.equal(m.source_reconciliation.candidate_author_source_occurrences,164);
 assert.equal(m.source_reconciliation.source_local_bodies_not_yet_reviewed,130);
 assert.equal(m.source_reconciliation.source_overlap_and_original_authority.W033_typed_original_statements,8);
 assert.equal(m.source_reconciliation.source_overlap_and_original_authority.W113_independent_own_typed_original_statements,0);
 assert.equal(m.source_reconciliation.source_overlap_and_original_authority.W113_uses_shared_W033_original_author_evidence,true);
 assert.equal(m.source_reconciliation.source_overlap_and_original_authority.author_source_assertion_not_counted_twice,true);
 assert.equal(m.source_reconciliation.source_overlap_and_original_authority.W043_PT0_to_S3_state_relation_unconstructed,true);
 assert.equal(m.source_reconciliation.source_overlap_and_original_authority.W033_ASD_metric_conditional_preserved,true);
 const orig18=new Set(Object.values(prior.source_reconciliation.reviewed_ids_by_input).flat());
 assert.equal(orig18.size,18);
 let matched=0;
 for(const [key,ids,[path,sha],run,job,occ,nh,oh]of tuple){
  assert.deepEqual(m.source_inputs[key],{path,sha});
  assert.deepEqual(m.source_reconciliation.reviewed_ids_by_input[key],ids);
  assert.equal(m.verified_workflows[key].id,run);
  assert.equal(m.verified_workflows[key].job_id,job);
  assert.equal(m.verified_workflows[key].conclusion,'success');
  assert.equal(m.verified_workflows[key].original_source,'arXiv:2104.05099v2');
  assert.equal(m.verified_workflows[key].original_cold_hostile,nh);
  assert.equal(m.verified_workflows[key].occurrence_hostile,oh);
  assert.equal(m.verified_workflows[key].source_roles,occ);
  for(const id of ids)assert.ok(!orig18.has(id),'source body already counted '+id);
  matched+=occ;
 }
 assert.equal(matched,28);
 assert.equal(m.source_reconciliation.candidate_author_source_occurrences,prior.source_reconciliation.candidate_author_source_occurrences+matched);
 assert.equal(w043.census_id,'W-SSC-043');assert.equal(w043.candidate_occurrences.length,8);
 assert.deepEqual(w033.rows.map(x=>x.census_id),['W-SSC-033','W-SSC-113']);
 assert.deepEqual(w033.rows.map(x=>x.occurrences.length),[11,9]);
 assert.equal(w033.rows[1].own_original_typed_ids.length,0);
 assert.equal(w033.rows[0].own_original_typed_ids.length,8);
 const r=m.source_reconciliation.reviewed_ids_by_input;
 for(const [key,arr]of Object.entries(prior.source_reconciliation.reviewed_ids_by_input))assert.deepEqual(r[key],arr,'historical source review mutated '+key);
 const all=Object.values(r).flat(),seen=new Set(all);
 assert.equal(all.length,21);assert.equal(seen.size,21);
 for(const id of all)assert.ok(ssc.items.some(x=>x.id===id),'fabricated W SSC item '+id);
 const remaining=m.source_reconciliation.remaining_by_mechanism;
 const before=prior.source_reconciliation.remaining_by_mechanism;
 assert.deepEqual(remaining.historical_body_exact_but_unreviewed,before.historical_body_exact_but_unreviewed.filter(x=>!freshIds.includes(x)));
 assert.deepEqual(remaining.historical_body_modified_but_unreviewed,before.historical_body_modified_but_unreviewed);
 assert.deepEqual(remaining.no_historical_G1_extraction,before.no_historical_G1_extraction);
 assert.equal(remaining.historical_body_exact_but_unreviewed.length,3);
 assert.equal(remaining.historical_body_modified_but_unreviewed.length,60);
 assert.equal(remaining.no_historical_G1_extraction.length,67);
 assert.equal(3+60+67,130);assert.equal(21+130,151);
 const failures=m.historical_CI_failures_not_reclassified;
 const oldFails=prior.historical_CI_failures_not_reclassified;
 assert.deepEqual(failures.slice(0,oldFails.length),oldFails);
 assert.deepEqual(failures.slice(oldFails.length).map(x=>x.id),[38153444885,38153578897,38154072894]);
 assert.ok(failures.every(x=>x.qualification==='FAILED'));
 return {stage:'G1_OPEN',qualified_source_local_bodies:21,frozen_SSC:151,outstanding_source_bodies:130,
 exact_legacy_bodies_remaining:3,changed_legacy_bodies_remaining:60,no_legacy_occurrence_bodies:67,
 source_local_occurrence_records:164,old_Oct03_G0:'OPEN',G2:'BLOCKED'};
}
const result=verify(clone(stage));
const attacks=[
 ['G1 false complete',x=>x.G1_complete=true],
 ['G2 forced',x=>x.G2_authorized=true],
 ['old Oct03 falsely closed',x=>x.original_2026_10_03_target_G0='FROZEN'],
 ['source stage count drift',x=>x.source_reconciliation.current_source_local_reviewed_count=22],
 ['source owner omission',x=>x.source_reconciliation.reviewed_ids_by_input.W01_S43_W043=[]],
 ['source duplicate mistaken as new',x=>x.source_reconciliation.reviewed_ids_by_input.W01_S41_W033_W113.push('W-SSC-043')],
 ['erase W113 shared source provenance',x=>x.source_reconciliation.source_overlap_and_original_authority.W113_uses_shared_W033_original_author_evidence=false],
 ['invent W113 own typed source statements',x=>x.source_reconciliation.source_overlap_and_original_authority.W113_independent_own_typed_original_statements=8],
 ['promote unbuilt PT0 isomorphism',x=>x.source_reconciliation.source_overlap_and_original_authority.W043_PT0_to_S3_state_relation_unconstructed=false],
 ['erase ASD source metric conditional',x=>x.source_reconciliation.source_overlap_and_original_authority.W033_ASD_metric_conditional_preserved=false],
 ['erase W source original',x=>x.source_inputs.W01_S43_W043.sha='bad'],
 ['source CI claimed error',x=>x.verified_workflows.W01_S43_W043.conclusion='failure'],
 ['wrong source original revision',x=>x.verified_workflows.W01_S41_W033_W113.original_source='arXiv-v1'],
 ['wrong fresh hostility counts',x=>x.verified_workflows.W01_S41_W033_W113.original_cold_hostile=11],
 ['retro-reclassify old fail',x=>x.historical_CI_failures_not_reclassified.at(-1).qualification='PASS'],
 ['drop failed historical',x=>x.historical_CI_failures_not_reclassified.pop()],
 ['wrong review total',x=>x.source_reconciliation.source_local_bodies_not_yet_reviewed=129],
 ['change exact remaining',x=>x.source_reconciliation.remaining_by_mechanism.historical_body_exact_but_unreviewed.push('W-SSC-043')],
 ['change changed historical',x=>x.source_reconciliation.remaining_by_mechanism.historical_body_modified_but_unreviewed.pop()],
 ['mark science truth proven',x=>x.scientific_theory_truth_qualified=true],
 ['bridge authorized',x=>x.cross_track_semantics_eligible=true],
 ['merge authorized',x=>x.PR70_merge_authorized=true]
];
for(const [name,fn]of attacks){const x=clone(stage);fn(x);let fail=false;try{verify(x)}catch(e){fail=true;}assert.ok(fail,'stage hostile escaped '+name);}
console.log('W G1 21/151 current original source convergence PASS '+JSON.stringify({...result,hostile_rejections:attacks.length,hostile_total:attacks.length}));
