#!/usr/bin/env node
'use strict';
// Exact W G1 source-only stage routing, no G2 and no cross-track semantics.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const paths={
 old:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_2.json','1b74246bd5e216ac6e2ec9a6731ba23528301e6e'],
 six:['experiments/062/W_G1_CURRENT_AUTHOR_SIX_SOURCE_FIRST_EXACT_BODIES_0_1.json','eba39a22d61fb990e2f1a6a7b64f2dabe9866c3e'],
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 g0:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477']
};
for(const [k,[p,sha]] of Object.entries(paths))assert.equal(gitsha(p),sha,'frozen source change: '+k);
const old=load(paths.old[0]),s=load(paths.six[0]),ssc=load(paths.ssc[0]),g0=load(paths.g0[0]),inverse=load(paths.inverse[0]),M=load('experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_3.json');
const exactNew=['W-SSC-001','W-SSC-014','W-SSC-062','W-SSC-114','W-SSC-134','W-SSC-138'];
const knownFailed=[38151309597,38151431107,38151522936,38151642056,38151762954,38151924084];
function verify(m){
 assert.equal(m.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.3');
 assert.equal(m.track,'W');
 assert.equal(m.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(m.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(m.stage,'G1_SOURCE_LOCAL_EIGHTEEN_BODIES_RECONCILED_GLOBAL_G1_OPEN');
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
 assert.deepEqual(m.predecessor,{path:paths.old[0],git_blob_sha:paths.old[1],preserved_unchanged:true});
 assert.deepEqual(m.source_inputs.six_original,{path:paths.six[0],sha:paths.six[1]});
 for(const [k,v] of Object.entries(old.source_inputs))assert.deepEqual(m.source_inputs[k],v,'prior G1 source changed: '+k);
 for(const [k,v]of Object.entries(old.verified_workflows))assert.deepEqual(m.verified_workflows[k],v,'prior qualified CI changed: '+k);
 assert.equal(m.verified_workflows.six_original.id,38152045274);
 assert.equal(m.verified_workflows.six_original.job_id,114507318550);
 assert.equal(m.verified_workflows.six_original.conclusion,'success');
 assert.equal(m.verified_workflows.six_original.head,'2edbd8813f5bd82129f2e25ff7c34f2c6b376fc6');
 assert.equal(m.verified_workflows.six_original.source_anchor_count,17);
 assert.equal(m.verified_workflows.six_original.hostile_original_author,10);
 assert.equal(m.verified_workflows.six_original.hostile_reciprocal,30);
 assert.deepEqual(m.verified_workflows.six_original.verified_bodies,exactNew);
 assert.equal(g0.current.G0_frozen,true);
 assert.equal(g0.historical_oct03_target.G0_complete,false);
 assert.equal(ssc.items.length,151);
 assert.equal(inverse.current_ssc_to_original_inverse.length,151);
 assert.equal(s.rows.length,6);
 assert.deepEqual(s.rows.map(x=>x.census_id),exactNew);
 assert.equal(s.summary.new_candidate_occurrences,29);
 const n=m.source_reconciliation,o=old.source_reconciliation;
 assert.equal(n.target_SSC_bodies,151);
 assert.equal(n.current_source_local_reviewed_count,18);
 assert.equal(n.candidate_author_source_occurrences,136);
 assert.equal(n.source_local_bodies_not_yet_reviewed,133);
 assert.equal(n.old_historical_84_body_occurrence_extraction_authority,false);
 assert.deepEqual(n.reviewed_ids_by_input.six_original,exactNew);
 for(const [k,v]of Object.entries(o.reviewed_ids_by_input))assert.deepEqual(n.reviewed_ids_by_input[k],v,'previous W qualified source candidate changed '+k);
 assert.equal(n.remaining_category_counts.exact_prior_body_but_occurrence_audit_not_complete,6);
 assert.equal(n.remaining_category_counts.changed_prior_body_unreviewed,60);
 assert.equal(n.remaining_category_counts.no_prior_occurrences,67);
 assert.deepEqual(n.remaining_by_mechanism.historical_body_modified_but_unreviewed,o.remaining_by_mechanism.historical_body_modified_but_unreviewed);
 assert.deepEqual(n.remaining_by_mechanism.no_historical_G1_extraction,o.remaining_by_mechanism.no_historical_G1_extraction);
 assert.deepEqual(n.remaining_by_mechanism.historical_body_exact_but_unreviewed,
   o.remaining_by_mechanism.historical_body_exact_but_unreviewed.filter(x=>!exactNew.includes(x)));
 assert.equal(n.remaining_by_mechanism.historical_body_exact_but_unreviewed.length,6);
 assert.equal(n.remaining_by_mechanism.historical_body_modified_but_unreviewed.length,60);
 assert.equal(n.remaining_by_mechanism.no_historical_G1_extraction.length,67);
 assert.deepEqual(n.classes_now_defended.slice(0,o.classes_now_defended.length),o.classes_now_defended);
 assert.equal(n.classes_now_defended.length,o.classes_now_defended.length+7);
 assert.deepEqual(m.historical_CI_failures_not_reclassified.slice(0,old.historical_CI_failures_not_reclassified.length),old.historical_CI_failures_not_reclassified);
 assert.deepEqual(m.historical_CI_failures_not_reclassified.slice(old.historical_CI_failures_not_reclassified.length).map(x=>x.id),knownFailed);
 assert.ok(m.historical_CI_failures_not_reclassified.every(x=>x.qualification==='FAILED'));
 const seen=new Set();
 for(const x of Object.values(n.reviewed_ids_by_input).flat().concat(n.remaining_by_mechanism.historical_body_exact_but_unreviewed,n.remaining_by_mechanism.historical_body_modified_but_unreviewed,n.remaining_by_mechanism.no_historical_G1_extraction)){
  assert.ok(!seen.has(x),'duplicated W frozen current G1 body '+x);seen.add(x);
 }
 assert.equal(seen.size,151);
 assert.deepEqual([...seen].sort(),ssc.items.map(x=>x.id).sort());
 assert.ok(!n.reviewed_ids_by_input.six_original.some(id=>n.remaining_by_mechanism.historical_body_exact_but_unreviewed.includes(id)));
 assert.equal(n.current_source_local_reviewed_count+n.source_local_bodies_not_yet_reviewed,151);
 assert.equal(n.candidate_author_source_occurrences,o.candidate_author_source_occurrences+s.summary.new_candidate_occurrences);
 return {reviewed:18,still_open:133,candidates:136,source_originals:4,negative_controls:40,G2:'BLOCKED',old_oct03:'OPEN'};
}
const baseline=verify(structuredClone(M));
const cases=[
 ['false G1 completion',q=>q.G1_complete=true],
 ['false G2 authorized',q=>q.G2_authorized=true],
 ['false October3 G0',q=>q.original_2026_10_03_target_G0='COMPLETE'],
 ['false PR merge',q=>q.PR70_merge_authorized=true],
 ['import L',q=>q.cross_track_semantics_eligible=true],
 ['source G0 dequalified',q=>q.G0_qualified_frozen=false],
 ['wrong prior stage hash',q=>q.predecessor.git_blob_sha='fake'],
 ['change new input SHA',q=>q.source_inputs.six_original.sha='bad'],
 ['claim 19 verified',q=>q.source_reconciliation.current_source_local_reviewed_count=19],
 ['claim 132 remaining',q=>q.source_reconciliation.source_local_bodies_not_yet_reviewed=132],
 ['change 136 candidates',q=>q.source_reconciliation.candidate_author_source_occurrences=140],
 ['reinclude reviewed old ID',q=>q.source_reconciliation.remaining_by_mechanism.historical_body_exact_but_unreviewed.push('W-SSC-014')],
 ['delete one original W body',q=>q.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.pop()],
 ['fake all old bodies exact',q=>q.source_reconciliation.remaining_category_counts.changed_prior_body_unreviewed=0],
 ['old W G1 prior changed',q=>q.source_reconciliation.reviewed_ids_by_input.three.pop()],
 ['new W source count missing',q=>q.source_reconciliation.reviewed_ids_by_input.six_original.pop()],
 ['fabricate passing failed run',q=>q.historical_CI_failures_not_reclassified.at(-1).qualification='SUCCESS'],
 ['hide failed run',q=>q.historical_CI_failures_not_reclassified.pop()],
 ['wrong source cold CI status',q=>q.verified_workflows.six_original.conclusion='failure'],
 ['misreport original source anchors',q=>q.verified_workflows.six_original.source_anchor_count=16],
 ['same source G0 classification shifted',q=>q.source_inputs.ssc.sha='changed'],
 ['stage rewrite as G2',q=>q.stage='G2_NEUTRAL_GRAPH_COMPLETE']
];
for(const [name,mutate] of cases){let q=structuredClone(M),caught=false;mutate(q);try{verify(q)}catch(e){caught=true}assert.ok(caught,'HOSTILE ESCAPED '+name)}
console.log('W_G1_EIGHTEEN_SOURCE_LOCAL_QUALIFICATION_PASS '+JSON.stringify({...baseline,hostile_rejected:cases.length,hostile_total:cases.length}));
