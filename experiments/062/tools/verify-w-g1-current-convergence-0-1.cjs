#!/usr/bin/env node
'use strict';
// Current qualified G0 remains frozen. This tests finite W-only G1 progress, not global G1 success.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const paths={
ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
original_index:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
freeze:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
frontier:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_REBASELINE_FRONTIER_0_1.json','0813758c9d11a32fa7e9e90329aaa7cf4d3d4c19'],
three:['experiments/062/W_G1_CURRENT_AUTHOR_HIGH_RISK_SOURCE_LOCAL_REPAIRS_0_2.json','7fd86707d2e59e3c8a7ba49423439e3fd98f1170'],
four:['experiments/062/W_G1_CURRENT_AUTHOR_FOUR_STALE_SOURCE_LOCAL_REPAIRS_0_2.json','0692a2d96a6bf50ab4aa413cca167f4e5a998b29'],
exact:['experiments/062/W_G1_CURRENT_AUTHOR_EXACT_BODY_NEGATIVE_MODALITY_REAUDIT_0_2.json','5750438d06ff9525393a79a96004643605a0d5ae']
};
for(const [name,[path,expect]]of Object.entries(paths))assert.equal(sha(path),expect,'frozen W-only G0/G1 evidence mutated '+name);
const ssc=read(paths.ssc[0]),index=read(paths.original_index[0]),stage=read(paths.freeze[0]),front=read(paths.frontier[0]),sets={three:read(paths.three[0]),four:read(paths.four[0]),exact:read(paths.exact[0])};
const state=read('experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_1.json');
const allowed=['W-SSC-125','W-SSC-022','W-SSC-026','W-SSC-035','W-SSC-037','W-SSC-069','W-SSC-104','W-SSC-039','W-SSC-116'];
const cp=x=>structuredClone(x);
function verify(m){
 assert.equal(m.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.1');
 assert.equal(m.track,'W');
 assert.equal(m.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(m.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(m.stage,'G1_SOURCE_LOCAL_NINE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(m.G0_qualified_frozen,true);
 assert.equal(m.G1_complete,false);
 assert.equal(m.G2_authorized,false);
 assert.equal(m.G3_to_G7_authorized,false);
 assert.equal(m.cross_track_semantics_eligible,false);
 assert.equal(m.scientific_theory_truth_qualified,false);
 assert.equal(m.source_track_sealed,false);
 assert.equal(m.PR70_merge_authorized,false);
 assert.equal(m.source_only_authority,true);
 assert.equal(m.independent_external_third_party_G1_validation_claimed,false);
 assert.equal(ssc.items.length,151);
 assert.equal(index.current_ssc_to_original_inverse.length,151);
 assert.equal(stage.current.G0_frozen,true);
 assert.equal(stage.historical_oct03_target.G0_complete,false);
 assert.equal(stage.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(front.rows.length,151);
 for(const [name,[path,expect]]of Object.entries(paths))assert.deepEqual(m.source_inputs[name],{path,sha:expect});
 const g=m.source_reconciliation;
 assert.equal(g.current_source_local_reviewed_count,9);
 assert.equal(g.candidate_author_source_occurrences,83);
 assert.equal(g.reclassified_audit_guards_from_three_body_initial,4);
 assert.equal(g.reclassified_duplicates_or_analysis_from_four_body_initial,4);
 assert.equal(g.additional_exact_body_negative_omissions,2);
 assert.equal(g.old_historical_84_body_occurrence_extraction_authority,false);
 assert.equal(g.target_SSC_bodies,151);
 assert.equal(g.source_local_bodies_not_yet_reviewed,142);
 assert.deepEqual(g.remaining_category_counts,{exact_prior_body_but_occurrence_audit_not_complete:15,changed_prior_body_unreviewed:60,no_prior_occurrences:67});
 assert.equal(g.remaining_G1_problem.startsWith('Independently re-extract or verify all 142'),true);
 assert.deepEqual(g.reviewed_ids_by_input.three,sets.three.rows.map(x=>x.census_id));
 assert.deepEqual(g.reviewed_ids_by_input.four,sets.four.rows.map(x=>x.census_id));
 assert.deepEqual(g.reviewed_ids_by_input.exact,sets.exact.rows.map(x=>x.census_id));
 const covered=[...g.reviewed_ids_by_input.three,...g.reviewed_ids_by_input.four,...g.reviewed_ids_by_input.exact];
 assert.deepEqual(covered,allowed);
 assert.equal(new Set(covered).size,9);
 const count=sets.three.rows.reduce((n,x)=>n+x.occurrences.length,0)
   +sets.four.rows.reduce((n,x)=>n+x.occurrences.length,0)
   +sets.exact.rows.reduce((n,x)=>n+x.new_independent_cold_occurrences.length,0);
 assert.equal(count,83);
 assert.equal(g.candidate_author_source_occurrences,count);
 const allIds=new Set(ssc.items.map(x=>x.id));
 const frontierIds=new Set(front.rows.map(x=>x.census_id));
 assert.deepEqual([...frontierIds].sort(),[...allIds].sort());
 const remain=front.rows.filter(x=>!covered.includes(x.census_id));
 assert.equal(remain.length,142);
 const expected={
  historical_body_exact_but_unreviewed:remain.filter(x=>x.historical_G1.historical_body_identical_to_current).map(x=>x.census_id),
  historical_body_modified_but_unreviewed:remain.filter(x=>x.historical_G1.previous_extraction_present&&!x.historical_G1.historical_body_identical_to_current).map(x=>x.census_id),
  no_historical_G1_extraction:remain.filter(x=>!x.historical_G1.previous_extraction_present).map(x=>x.census_id)
 };
 assert.deepEqual(g.remaining_by_mechanism,expected);
 assert.deepEqual([expected.historical_body_exact_but_unreviewed.length,expected.historical_body_modified_but_unreviewed.length,expected.no_historical_G1_extraction.length],[15,60,67]);
 assert.ok(g.classes_now_defended.includes('PROMOTE_TWISTED_YM_GEOMETRIC_LANGLANDS_SPECULATION_TO_CONSTRUCTED_DYNAMICS'));
 assert.ok(g.classes_now_defended.includes('SOURCE_TRANSCRIPTION_KAPPA_FOR_CONJUGATE'));
 assert.ok(g.classes_now_defended.includes('COLLAPSE_DELIGNE_LAMBDA1_USUAL_INTO_ALL_FLAT'));
 assert.ok(g.classes_now_defended.includes('LOSS_OF_AUTHOR_NEGATIVE_UNBUILT_PT_INTERACTIONS'));
 const records=m.verified_workflows;
 assert.deepEqual(Object.keys(records),['initial_all_151_frontier','high_risk_three','high_risk_four','exact_body_negative']);
 assert.deepEqual(Object.values(records).map(x=>x.id),[38146570133,38147418419,38148035787,38148472421]);
 assert.ok(Object.values(records).every(x=>x.conclusion==='success'));
 assert.deepEqual(Object.values(records).map(x=>x.adversarial),[18,25,32,20]);
 assert.deepEqual(m.historical_CI_failures_not_reclassified.map(x=>x.id),[38147320057,38147946438,38148367681]);
 assert.ok(m.historical_CI_failures_not_reclassified.every(x=>x.qualification==='FAILED'));
 return {current_target_G0:'FROZEN',old_target_G0:'OPEN',G1:'9_BODIES_SOURCE_LOCAL',source_occurrences:83,reviewed:9,remaining:142,remaining_exact:15,remaining_modified:60,remaining_new:67,G2:'BLOCKED'};
}
const yes=verify(cp(state));
const tests=[
 ['invent full G1 close',t=>t.G1_complete=true],
 ['invent current G2 authorization',t=>t.G2_authorized=true],
 ['invent G3',t=>t.G3_to_G7_authorized=true],
 ['retroactively close historical G0',t=>t.original_2026_10_03_target_G0='CLOSED'],
 ['misreport entire track seal',t=>t.source_track_sealed=true],
 ['invent cross-track use',t=>t.cross_track_semantics_eligible=true],
 ['claim external independent audit',t=>t.independent_external_third_party_G1_validation_claimed=true],
 ['replace exact current G0 SSC hash',t=>t.source_inputs.ssc.sha='bad'],
 ['phantom 10th G1 source body',t=>t.source_reconciliation.current_source_local_reviewed_count=10],
 ['phantom candidate occurrence',t=>t.source_reconciliation.candidate_author_source_occurrences=84],
 ['wrong previous 84 corpus authority',t=>t.source_reconciliation.old_historical_84_body_occurrence_extraction_authority=true],
 ['claim all old exact 17 fully passed',t=>t.source_reconciliation.remaining_category_counts.exact_prior_body_but_occurrence_audit_not_complete=0],
 ['change 60 changed remaining',t=>t.source_reconciliation.remaining_category_counts.changed_prior_body_unreviewed=59],
 ['alter 67 never extracted',t=>t.source_reconciliation.remaining_category_counts.no_prior_occurrences=66],
 ['drop nonauthor safeguard count',t=>t.source_reconciliation.reclassified_audit_guards_from_three_body_initial=0],
 ['drop W116 missing negative',t=>t.source_reconciliation.additional_exact_body_negative_omissions=1],
 ['remove one remaining SSC item',t=>t.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.pop()],
 ['W125 duplicate current author review ID',t=>t.source_reconciliation.reviewed_ids_by_input.four[0]='W-SSC-125'],
 ['suppress old failed CI',t=>t.historical_CI_failures_not_reclassified.pop()],
 ['relabel actual failed historical CI',t=>t.historical_CI_failures_not_reclassified[0].qualification='PASS'],
 ['false earlier exact run successful',t=>t.verified_workflows.exact_body_negative.conclusion='failure'],
 ['wrong G1 candidate total previous provenance',t=>t.verified_workflows.high_risk_four.adversarial=31],
 ['claim physical theory verified',t=>t.scientific_theory_truth_qualified=true],
 ['claim PR merged',t=>t.PR70_merge_authorized=true]
];
for(const [name,f]of tests){let x=cp(state);f(x);let failed=false;try{verify(x)}catch(e){failed=true;}assert.ok(failed,'hostile escaped '+name)}
console.log('W G1 finite current author source stage convergence PASS '+JSON.stringify({...yes,adversarial_rejected:tests.length,adversarial_total:tests.length}));
