#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const original='experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_1.json';
const updated='experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_2.json';
const newG1='experiments/062/W_G1_CURRENT_AUTHOR_W01_S43_SOURCE_FIRST_0_1.json';
assert.equal(sha(original),'1904d4c44f9443d241eb33c550838ff913571f1f');
assert.equal(sha(newG1),'a2fff4315b5b23d028b8ff74e46c35ddef55c1da');
assert.equal(sha('research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json'),'f13075a1e2b039bab66e738cc992e121cd6c9947');
assert.equal(sha('experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json'),'e3848f4025a733d33b8b8b3411fa779e8b0a5b9a');
const old=read(original),cur=read(updated),source=read(newG1),G0=read('experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json');
const copy=x=>JSON.parse(JSON.stringify(x));
function verify(x){
 assert.equal(x.schema,'isograph.exp062-W-G1-current-author-source-local-convergence-stage.v0.2');
 assert.equal(x.track,'W');
 assert.equal(x.stage,'G1_SOURCE_LOCAL_TWELVE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(x.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(x.original_2026_10_03_target_G0,'OPEN_HISTORICAL_BYTES_UNAUTHENTICATED');
 assert.equal(x.G0_qualified_frozen,true);
 assert.equal(x.G1_complete,false);
 assert.equal(x.G2_authorized,false);
 assert.equal(x.G3_to_G7_authorized,false);
 assert.equal(x.cross_track_semantics_eligible,false);
 assert.equal(x.scientific_theory_truth_qualified,false);
 assert.equal(x.source_track_sealed,false);
 assert.equal(x.PR70_merge_authorized,false);
 assert.equal(x.source_only_authority,true);
 assert.equal(x.independent_external_third_party_G1_validation_claimed,false);
 assert.deepEqual(x.predecessor,{path:original,git_blob_sha:'1904d4c44f9443d241eb33c550838ff913571f1f',preserved_unchanged:true});
 assert.deepEqual(x.source_inputs.W01_S43,{path:newG1,sha:'a2fff4315b5b23d028b8ff74e46c35ddef55c1da'});
 assert.deepEqual(Object.fromEntries(Object.entries(x.source_inputs).filter(([k])=>k!=='W01_S43')),old.source_inputs);
 assert.equal(G0.current.G0_frozen,true);
 assert.equal(G0.historical_oct03_target.G0_complete,false);
 assert.equal(source.rows.length,3);
 assert.equal(source.rows.reduce((sum,item)=>sum+item.occurrences.length,0),24);
 assert.deepEqual(x.source_reconciliation.reviewed_ids_by_input.W01_S43,['W-SSC-040','W-SSC-041','W-SSC-042']);
 assert.deepEqual(Object.fromEntries(Object.entries(x.source_reconciliation.reviewed_ids_by_input).filter(([k])=>k!=='W01_S43')),old.source_reconciliation.reviewed_ids_by_input);
 assert.equal(x.source_reconciliation.current_source_local_reviewed_count,12);
 assert.equal(x.source_reconciliation.candidate_author_source_occurrences,107);
 assert.equal(x.source_reconciliation.source_local_bodies_not_yet_reviewed,139);
 assert.equal(x.source_reconciliation.target_SSC_bodies,151);
 assert.equal(x.source_reconciliation.remaining_category_counts.exact_prior_body_but_occurrence_audit_not_complete,12);
 assert.equal(x.source_reconciliation.remaining_by_mechanism.historical_body_exact_but_unreviewed.length,12);
 assert.equal(x.source_reconciliation.remaining_by_mechanism.historical_body_modified_but_unreviewed.length,60);
 assert.equal(x.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.length,67);
 const pending=Object.values(x.source_reconciliation.remaining_by_mechanism).flat();
 const reviewed=Object.values(x.source_reconciliation.reviewed_ids_by_input).flat();
 assert.equal(pending.length,139);
 assert.equal(new Set(pending).size,139);
 assert.equal(reviewed.length,12);
 assert.equal(new Set(reviewed).size,12);
 for(const id of reviewed)assert.ok(!pending.includes(id),'reviewed W source still pending '+id);
 assert.equal(pending.length+reviewed.length,151);
 assert.deepEqual(x.verified_workflows.W01_S43,{id:38149557699,conclusion:'success',adversarial:30,head:'ab4b16e11540b08b49b3f3e093cb30c5aabe819e',original_cold_author_anchors:22,verified_bodies:['W-SSC-040','W-SSC-041','W-SSC-042'],source_original:'arXiv:2104.05099v2 §4.3'});
 assert.deepEqual(Object.fromEntries(Object.entries(x.verified_workflows).filter(([k])=>k!=='W01_S43')),old.verified_workflows);
 assert.deepEqual(x.historical_CI_failures_not_reclassified.slice(0,-1),old.historical_CI_failures_not_reclassified);
 assert.deepEqual(x.historical_CI_failures_not_reclassified.at(-1),{id:38149417761,reason:'SOURCE_FREE_MASSLESS_ROLE_MUTATION_ESCAPE',qualification:'FAILED'});
 assert.equal(old.source_reconciliation.current_source_local_reviewed_count,9);
 assert.equal(old.G2_authorized,false);
 return {G0:'FROZEN',W_G1:'PARTIAL_SOURCE_LOCAL',reviewed_bodies:12,pending_bodies:139,new_bodies:3,new_occurrence_candidates:24,G2:'BLOCKED',old_Oct03:'OPEN'};
}
const good=verify(copy(cur));
const mutations=[
 ['premature G1 qualification',q=>q.G1_complete=true],
 ['premature G2',q=>q.G2_authorized=true],
 ['misrepresent Oct03',q=>q.original_2026_10_03_target_G0='COMPLETE'],
 ['cross-track semantic use',q=>q.cross_track_semantics_eligible=true],
 ['pr merge unauthorized',q=>q.PR70_merge_authorized=true],
 ['falsify total 151 reviewed',q=>q.source_reconciliation.current_source_local_reviewed_count=151],
 ['overwrite occurrence count',q=>q.source_reconciliation.candidate_author_source_occurrences=108],
 ['erase outstanding W body',q=>q.source_reconciliation.remaining_by_mechanism.historical_body_modified_but_unreviewed.pop()],
 ['duplicate outstanding W body',q=>q.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction[0]=q.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction[1]],
 ['return W040 to pending',q=>q.source_reconciliation.remaining_by_mechanism.historical_body_exact_but_unreviewed.push('W-SSC-040')],
 ['drop W041 from reviewed',q=>q.source_reconciliation.reviewed_ids_by_input.W01_S43.pop()],
 ['source input changed',q=>q.source_inputs.W01_S43.sha='bad'],
 ['reclassify failed CI',q=>q.historical_CI_failures_not_reclassified.at(-1).qualification='SUCCESS'],
 ['invent successful CI result',q=>q.verified_workflows.W01_S43.conclusion='failure'],
 ['claim mathematical truth',q=>q.scientific_theory_truth_qualified=true],
 ['claim independent third-party review',q=>q.independent_external_third_party_G1_validation_claimed=true],
 ['unqualified G3',q=>q.G3_to_G7_authorized=true],
 ['source track premature seal',q=>q.source_track_sealed=true],
 ['rewrite predecessor',q=>q.predecessor.git_blob_sha='bad']
];
for(const [name,change] of mutations){const q=copy(cur);change(q);let rejected=false;try{verify(q)}catch(e){rejected=true;}assert.ok(rejected,'unrejected hostile '+name)}
console.log('W G1 current-author twelve-body stage PASS '+JSON.stringify({...good,hostile_rejected:mutations.length,hostile_total:mutations.length}));
