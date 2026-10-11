#!/usr/bin/env node
'use strict';
// Current-W G1 source-local stage exact successor. G1-global/G2 remain blocked.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const data=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const root='experiments/062/';
const paths={
 old:root+'W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_5.json',
 stage:root+'W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_6.json',
 review:root+'W_G1_W059_W060_W061_W04A_AUTHOR_ORIGINAL_FIRST_0_1.json',
 ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json',
 inverse:root+'W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json',
 gate:root+'W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json'
};
const pins={
 old:'25574b0c79b6897119bb291cebf25d66e2b06073',stage:'b3f5f69ba57d6b4dd48d9a2d14ab903546621a7a',
 review:'1904608d75fb39919e82bd9176c0812f304fb545',
 ssc:'f13075a1e2b039bab66e738cc992e121cd6c9947',
 inverse:'6a959eabe8803770bc8e9851e288de6535821477',
 gate:'e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'
};
for(const [name,sha]of Object.entries(pins))assert.equal(blob(paths[name]),sha,'immutable source/evidence SHA drift '+name);
const old=data(paths.old),stage=data(paths.stage),review=data(paths.review),ssc=data(paths.ssc),idx=data(paths.inverse),gate=data(paths.gate);
const inserted=['W-SSC-059','W-SSC-060','W-SSC-061'];
const priorReviewed=Object.values(old.source_reconciliation.reviewed_ids_by_input).flat();
const ids=new Set(ssc.items.map(x=>x.id));
const clone=x=>structuredClone(x);
function verify(j){
 assert.equal(j.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.6');
 assert.equal(j.stage,'G1_SOURCE_LOCAL_TWENTYSEVEN_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(j.track,'W');
 assert.equal(j.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(j.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(j.G0_qualified_frozen,true);
 assert.equal(j.G1_complete,false);assert.equal(j.G2_authorized,false);assert.equal(j.G3_to_G7_authorized,false);
 assert.equal(j.cross_track_semantics_eligible,false);assert.equal(j.scientific_theory_truth_qualified,false);
 assert.equal(j.source_track_sealed,false);assert.equal(j.PR70_merge_authorized,false);
 assert.equal(j.independent_external_third_party_G1_validation_claimed,false);
 assert.equal(j.source_only_authority,true);
 assert.deepEqual(j.predecessor,{path:paths.old,git_blob_sha:pins.old,preserved_unchanged:true});
 assert.equal(j.current_G1_qualification_scope,'SOURCE_LOCAL_27_OF_151_ONLY');
 assert.equal(j.source_inputs.W04a_three.path,paths.review);
 assert.equal(j.source_inputs.W04a_three.sha,pins.review);
 for(const [key,value]of Object.entries(old.source_inputs))assert.deepEqual(j.source_inputs[key],value,'prior source provenance erased '+key);
 for(const [key,value]of Object.entries(old.verified_workflows))assert.deepEqual(j.verified_workflows[key],value,'prior successful CI altered '+key);
 assert.equal(j.historical_CI_failures_not_reclassified.length,old.historical_CI_failures_not_reclassified.length+3);
 assert.deepEqual(j.historical_CI_failures_not_reclassified.slice(0,-3),old.historical_CI_failures_not_reclassified);
 assert.deepEqual(j.historical_CI_failures_not_reclassified.slice(-3).map(x=>x.id),[38164291812,38164409214,38164520912]);
 assert.ok(j.historical_CI_failures_not_reclassified.every(x=>x.qualification==='FAILED'));
 const sc=j.source_reconciliation,prev=old.source_reconciliation;
 assert.deepEqual(sc.reviewed_ids_by_input.W04a_three,inserted);
 for(const [key,value]of Object.entries(prev.reviewed_ids_by_input))assert.deepEqual(sc.reviewed_ids_by_input[key],value);
 assert.equal(Object.keys(sc.reviewed_ids_by_input).length,Object.keys(prev.reviewed_ids_by_input).length+1);
 assert.equal(sc.current_source_local_reviewed_count,27);
 assert.equal(sc.candidate_author_source_occurrences,202);
 assert.equal(sc.target_SSC_bodies,151);
 assert.equal(sc.source_local_bodies_not_yet_reviewed,124);
 assert.equal(sc.old_historical_84_body_occurrence_extraction_authority,false);
 assert.equal(sc.remaining_category_counts.exact_prior_body_but_occurrence_audit_not_complete,0);
 assert.equal(sc.remaining_category_counts.changed_prior_body_unreviewed,58);
 assert.equal(sc.remaining_category_counts.no_prior_occurrences,66);
 const currentReviewed=Object.values(sc.reviewed_ids_by_input).flat();
 assert.equal(currentReviewed.length,27);assert.equal(new Set(currentReviewed).size,27);
 assert.deepEqual(new Set(currentReviewed),new Set([...priorReviewed,...inserted]));
 assert.ok(currentReviewed.every(id=>ids.has(id)));
 assert.equal(ids.size,151);
 const beforeLeft=prev.remaining_by_mechanism;
 const afterLeft=sc.remaining_by_mechanism;
 assert.deepEqual(afterLeft.historical_body_exact_but_unreviewed,[]);
 assert.deepEqual(afterLeft.historical_body_modified_but_unreviewed,beforeLeft.historical_body_modified_but_unreviewed.filter(id=>id!=='W-SSC-059'&&id!=='W-SSC-061'));
 assert.deepEqual(afterLeft.no_historical_G1_extraction,beforeLeft.no_historical_G1_extraction.filter(id=>id!=='W-SSC-060'));
 const remaining=[...afterLeft.historical_body_modified_but_unreviewed,...afterLeft.no_historical_G1_extraction];
 assert.equal(remaining.length,124);assert.equal(new Set(remaining).size,124);
 assert.ok(remaining.every(id=>ids.has(id)&&!currentReviewed.includes(id)));
 assert.deepEqual(new Set([...remaining,...currentReviewed]),ids);
 assert.equal(sc.candidate_author_source_occurrences,prev.candidate_author_source_occurrences+review.summary.new_candidate_occurrences);
 const ci=j.verified_workflows.W04a_three;
 assert.equal(ci.id,38164617429);assert.equal(ci.job_id,114544480902);
 assert.equal(ci.conclusion,'success');
 assert.equal(ci.head,'806b75656b22c390de042c7b1a39278dd56da1a2');
 assert.equal(ci.original_source,'W04a author March 5 2026');
 assert.equal(ci.original_live_author_sha256,'69792bb18e780484b0bdf491f5029d9bbeef04db7de677bd10122ffe7e869659');
 assert.equal(ci.original_fresh_reads,2);
 assert.equal(ci.author_original_anchors,14);assert.equal(ci.author_source_hostiles,6);assert.equal(ci.typed_G1_hostiles,28);
 assert.deepEqual(ci.reviewed_ids,inserted);
 assert.equal(ci.candidate_occurrences,20);
 assert.equal(ci.original_G0_source_census_unchanged,true);
 assert.deepEqual(review.rows.map(x=>x.census_id),inserted);
 assert.equal(review.summary.new_candidate_occurrences,20);
 assert.equal(idx.current_ssc_to_original_inverse.length,151);
 assert.equal(gate.current.G0_frozen,true);
 assert.equal(gate.historical_oct03_target.G0_complete,false);
 assert.equal(j.W04a_original_first_addendum.scientific_theorem_proved,false);
 assert.equal(j.W04a_original_first_addendum.old_Oct03_provenance_authenticated,false);
 return {W_current_G1:'SOURCE_LOCAL_ONLY',verified_bodies:27,remaining:124,changed_prior:58,absent_prior:66,candidate_occurrences:202,G2:'BLOCKED',historic_Oct03:'OPEN'};
}
const yes=verify(clone(stage));
const attacks=[
['false global G1 qualified',j=>j.G1_complete=true],
['premature G2',j=>j.G2_authorized=true],
['old G0 falsely closed',j=>j.original_2026_10_03_target_G0='COMPLETE'],
['other author imported',j=>j.cross_track_semantics_eligible=true],
['PR merge asserted',j=>j.PR70_merge_authorized=true],
['fake current 27 count',j=>j.source_reconciliation.current_source_local_reviewed_count=28],
['inflate 202 source occurrences',j=>j.source_reconciliation.candidate_author_source_occurrences=203],
['erase one reviewed ID',j=>j.source_reconciliation.reviewed_ids_by_input.W04a_three.pop()],
['add old reviewed body as new',j=>j.source_reconciliation.reviewed_ids_by_input.W04a_three[0]='W-SSC-035'],
['drop one remaining W body',j=>j.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.pop()],
['mark already qualified body unreviewed',j=>j.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.push('W-SSC-060')],
['original source changed',j=>j.verified_workflows.W04a_three.original_live_author_sha256='X'],
['change successful CI identity',j=>j.verified_workflows.W04a_three.id=0],
['reclassify historical failed CI',j=>j.historical_CI_failures_not_reclassified.at(-1).qualification='PASS'],
['erase prior qualified CI',j=>delete j.verified_workflows.W04d_W04e_three_original_PDF],
['forge prior stage hash',j=>j.predecessor.git_blob_sha='bad'],
['misroute source input',j=>j.source_inputs.W04a_three.sha='bad'],
['invent scientific proof',j=>j.W04a_original_first_addendum.scientific_theorem_proved=true],
['fabricate old Oct03 evidence',j=>j.W04a_original_first_addendum.old_Oct03_provenance_authenticated=true],
['qualify external review unearned',j=>j.independent_external_third_party_G1_validation_claimed=true],
['cross-current-source false denominator',j=>j.source_reconciliation.target_SSC_bodies=150],
['erase old source CI failure',j=>j.historical_CI_failures_not_reclassified.splice(0,1)]
];
for(const [name,attack]of attacks){const candidate=clone(stage);attack(candidate);let caught=false;try{verify(candidate)}catch(e){caught=true;}assert.ok(caught,'hostile escaped: '+name)}
console.log('W G1 exact current-author 27-body stage transition PASS '+JSON.stringify({...yes,hostile_rejections:attacks.length,hostile_total:attacks.length}));
