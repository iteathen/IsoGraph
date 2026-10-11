#!/usr/bin/env node
'use strict';
// Freeze only the W 2026-10-11 source rebaseline. Old Oct03 target MUST stay OPEN.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const path='experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_1.json';
const originals={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 scope:['research/woit-lisi-isomorph/woit/W_CURRENT_AUTHOR_SOURCE_SCOPE_2026_10_11_0_1.json','86bb7d5ad55c26ea3586f2a74f1411c2a5d843c7'],
 inventory:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 reply:['experiments/062/W04E_CURRENT_AUTHOR_REPLY_SOURCE_FINGERPRINT_0_1.json','f9710438201916323070af2ba07562344400897f'],
 oldstage:['experiments/062/W_CURRENT_STAGE_GATE_0_131.json','dcaebb6246e1f277fb0a343eac639d24d54b5821'],
 oldcorpus:['research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md','5775af1ab9289f97d903b39d5eb8eda241bafe78']
};
const q=read(path),old=read(originals.oldstage[0]),s=read(originals.ssc[0]),scope=read(originals.scope[0]),index=read(originals.inventory[0]),reply=read(originals.reply[0]);
for(const [k,[p,h]] of Object.entries(originals))assert.equal(sha(p),h,'frozen source input SHA changed '+k);
const stable=Object.fromEntries(Object.entries(originals).map(([k,[p,h]])=>[k,{path:p,sha:h}]));
function verify(a){
 assert.equal(a.track,'W');
 assert.equal(a.qualified_source_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(a.stage_authority,'SOURCE_SEMANTIC_CENSUS_FREEZE_ONLY');
 assert.equal(a.historical_oct03_target.status,'OPEN_HISTORICAL_RAW_MUTABLE_SOURCE_BYTES_UNAUTHENTICATED');
 assert.equal(a.historical_oct03_target.corpus_git_sha,stable.oldcorpus.sha);
 assert.equal(a.historical_oct03_target.G0_complete,false);
 assert.equal(a.historical_oct03_target.G1_authorized,false);
 assert.equal(a.historical_oct03_target.preserved_unchanged,true);
 assert.equal(old.current_lawful_state.G0_open,true);
 assert.equal(old.current_lawful_state.G0_frozen,false);
 assert.equal(old.current_lawful_state.G1_authorized,false);
 assert.equal(a.current.status,'CURRENT_SOURCE_TARGET_G0_SSC_FROZEN_AWAITING_THIS_CERTIFICATE_EXACT_CI');
 assert.equal(a.current.G0_complete_source_census,true);
 assert.equal(a.current.G0_frozen,true);
 assert.equal(a.current.source_first_original_locations,649);
 assert.equal(a.current.load_bearing_source_locations,463);
 assert.equal(a.current.original_source_to_SSC_pairs,560);
 assert.equal(a.current.no_known_remaining_current_source_semantic_omissions,true);
 assert.equal(a.current.known_remaining_current_source_semantic_omission_count,0);
 assert.equal(a.current.source_reconstruction_and_anti_bias_pass,'SOURCE_FIRST_LOCAL_AND_HISTORICAL_COLD_AUDITS_QUALIFIED_CURRENT_SCOPE');
 assert.equal(a.current.original_source_to_ssc_complete,true);
 assert.equal(a.current.ssc_to_original_complete,true);
 assert.equal(a.current.source_scope_revision_0_2_authorized_by_owner,true);
 assert.equal(a.current.exact_original_author_source_hashes_pin_count,8);
 assert.equal(a.current.W04e_author_reply_scoped_original_hash_pinned,true);
 assert.equal(a.current.source_census_conservation_pass,true);
 assert.equal(a.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(a.current.G1_occurrence_extraction_started,false);
 assert.equal(a.current.G2_G7_or_later_qualified,false);
 assert.equal(a.current.source_track_sealed,false);
 assert.equal(a.current.cross_track_W_L_synthesis_authorized,false);
 assert.equal(a.current.research_PR_merge_authorized,false);
 assert.equal(a.no_retroactive_2026_10_03_equality_claim,true);
 assert.equal(a.evidence.current_original_9_source_preflight.run_id,38122473278);
 assert.equal(a.evidence.current_original_9_source_preflight.commit_sha,'e5b7e5cc9d456ed6f80bbd72a0139307608d5cbf');
 assert.equal(a.evidence.current_original_9_source_preflight.status,'SUCCESS');
 assert.equal(a.evidence.current_original_9_source_preflight.hostile_cases_rejected,67);
 assert.deepEqual(a.evidence.failed_predecessor_runs_preserved.map(x=>x.id),
     [38121249339,38121919671,38122045839,38122111843]);
 assert.ok(a.evidence.failed_predecessor_runs_preserved.every(x=>x.qualification==='FAILED'));
 assert.equal(a.current.W_only_source_census.path,stable.ssc.path);
 assert.equal(a.current.W_only_source_census.git_blob_sha,stable.ssc.sha);
 assert.equal(a.current.source_corpus_scope.path,stable.scope.path);
 assert.equal(a.current.source_corpus_scope.git_blob_sha,stable.scope.sha);
 assert.equal(a.current.original_source_locations.path,stable.inventory.path);
 assert.equal(a.current.original_source_locations.git_blob_sha,stable.inventory.sha);
 assert.equal(a.current.author_reply_evidence.path,stable.reply.path);
 assert.equal(a.current.author_reply_evidence.git_blob_sha,stable.reply.sha);
 assert.equal(a.current.previous_old_stage_gate.path,stable.oldstage.path);
 assert.equal(a.current.previous_old_stage_gate.git_blob_sha,stable.oldstage.sha);
 assert.equal(scope.target_id,a.qualified_source_target);
 assert.equal(scope.original_frozen_target.retained_open,true);
 assert.equal(scope.original_frozen_target.no_retroactive_qualification,true);
 assert.equal(scope.source_scope.exact_mutable_oct03_bytes_claimed_same,false);
 assert.equal(reply.scoped_sha256_NFC_whitespace_apostrophe,a.current.author_reply_evidence.original_author_reply_SHA256);
 assert.equal(reply.oct03_historical_raw_equal_unverified,true);
 assert.equal(s.items.length,151);assert.equal(s.census_item_count,151);
 assert.equal(new Set(s.items.map(x=>x.id)).size,151);
 assert.equal(s.items.reduce((n,x)=>n+(x.source_expression_census?.statements||[]).length,0),539);
 assert.equal(index.summary.current_original_locations,649);
 assert.equal(index.summary.current_original_load_bearing_locations,463);
 assert.equal(index.summary.original_to_ssc_pair_count,560);
 assert.equal(index.summary.source_owners_without_original_reciprocal,0);
 assert.equal(index.summary.source_semantic_items_added,0);
 assert.equal(index.original_versioned_source_locations,437);
 assert.equal(index.current_ssc_to_original_inverse.length,151);
 assert.equal(a.G0_exit_conditions_current_scope.remaining_G0_specific_obligations.length,0);
 assert.equal(a.G0_exit_conditions_current_scope.frozen_original_nine_source_semantic_target,true);
 assert.equal(a.G0_exit_conditions_current_scope.independent_first_original_review_and_hostile_qualification,true);
 return {current_source_G0:'FROZEN',historical_oct03_G0:'OPEN',source_items:151,units:9,locations:649,source_links:560,author_content_hashes:8,G1_only_new_target:'ELIGIBLE_NOT_STARTED'};
}
const original=structuredClone(q),result=verify(original);
const cases=[
 ['old target wrongly closed',t=>t.historical_oct03_target.G0_complete=true],
 ['old gate falsely qualified',t=>t.historical_oct03_target.G1_authorized=true],
 ['silently claim Oct03 equivalence',t=>t.no_retroactive_2026_10_03_equality_claim=false],
 ['current G0 not frozen',t=>t.current.G0_frozen=false],
 ['current unreviewed load',t=>t.current.load_bearing_source_locations=462],
 ['missing inverse pair',t=>t.current.original_source_to_SSC_pairs=559],
 ['hide source omission',t=>t.current.known_remaining_current_source_semantic_omission_count=1],
 ['invent new source item',t=>t.current.W_only_source_census.item_count=152],
 ['source scope git SHA drift',t=>t.current.source_corpus_scope.git_blob_sha='BAD'],
 ['SSC SHA drift',t=>t.current.W_only_source_census.git_blob_sha='BAD'],
 ['delete W04e scoped author reply SHA',t=>t.current.author_reply_evidence.original_author_reply_SHA256='BAD'],
 ['G1 already underway',t=>t.current.G1_occurrence_extraction_started=true],
 ['G2 improperly qualified',t=>t.current.G2_G7_or_later_qualified=true],
 ['force cross track synth',t=>t.current.cross_track_W_L_synthesis_authorized=true],
 ['misreport PR merge',t=>t.current.research_PR_merge_authorized=true],
 ['misreport successful CI',t=>t.evidence.current_original_9_source_preflight.status='FAILURE'],
 ['reclassify old failure as pass',t=>t.evidence.failed_predecessor_runs_preserved[0].qualification='PASS'],
 ['drop own original location',t=>t.current.source_first_original_locations=648],
 ['promote source track sealed',t=>t.current.source_track_sealed=true],
 ['authority widened',t=>t.stage_authority='PHYSICAL_UNIFICATION_THEOREM'],
 ['erase old stages',t=>t.current.previous_old_stage_gate.git_blob_sha='OTHER'],
 ['deny current source auth',t=>t.current.source_scope_revision_0_2_authorized_by_owner=false]
];
for(const [name,change] of cases){const t=structuredClone(original);change(t);let fails=false;try{verify(t)}catch(e){fails=true;}assert.ok(fails,'freeze hostile escaped: '+name)}
console.log('W current original target G0 source-census freeze preflight '+JSON.stringify({...result,hostile_rejected:cases.length,hostile_total:cases.length}));
