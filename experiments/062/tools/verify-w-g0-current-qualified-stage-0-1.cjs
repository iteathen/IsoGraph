#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root='experiments/062/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const pins={
 old:[root+'W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_1.json','1a9f7398d5dfbca0a6223c9b4d6a78e68d1cca73'],
 qualified:[root+'W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 evidence:[root+'W_G0_CURRENT_AUTHOR_SOURCE_EXACT_CI_FREEZE_0_1.json','85f4d559480a23ac923db2494c193642138aba8b'],
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 original:[root+'W_CURRENT_STAGE_GATE_0_131.json','dcaebb6246e1f277fb0a343eac639d24d54b5821']
};
for(const [n,[path,sha]] of Object.entries(pins))assert.equal(hash(path),sha,n+' exact file changed');
const old=read(pins.old[0]),stage=read(pins.qualified[0]),ci=read(pins.evidence[0]),source=read(pins.ssc[0]),history=read(pins.original[0]);
function verify(s,c){
 assert.equal(s.schema,'isograph.exp062-woit-current-author-source-G0-qualified-stage-gate.v0.2');
 const prior=structuredClone(s);delete prior.qualified_successor;
 prior.schema=old.schema;prior.current.status=old.current.status;
 assert.deepStrictEqual(prior,old,'new target gate must conserve its exact predecessor');
 assert.equal(s.current.status,'CURRENT_AUTHOR_SOURCE_G0_SSC_FREEZE_QUALIFIED');
 assert.equal(s.current.G0_complete_source_census,true);
 assert.equal(s.current.G0_frozen,true);
 assert.equal(s.current.source_first_original_locations,649);
 assert.equal(s.current.original_source_to_SSC_pairs,560);
 assert.equal(s.current.W_only_source_census.item_count,151);
 assert.equal(s.historical_oct03_target.G0_complete,false);
 assert.equal(s.historical_oct03_target.G1_authorized,false);
 assert.equal(s.qualified_successor.previous_stage_gate.git_blob_sha,pins.old[1]);
 assert.equal(s.qualified_successor.exact_freeze_qualification.run_id,38122736575);
 assert.equal(s.qualified_successor.exact_freeze_qualification.job_id,114420642480);
 assert.equal(s.qualified_successor.exact_freeze_qualification.head_sha,'851eac84fa3d43b8221773e294088bc21ee53930');
 assert.equal(s.qualified_successor.exact_freeze_qualification.conclusion,'success');
 assert.equal(s.qualified_successor.old_Oct03_target_still_open,true);
 assert.equal(s.qualified_successor.G1_eligible_current_target_only,true);
 assert.equal(s.qualified_successor.G1_not_started,true);
 assert.equal(s.current.G1_occurrence_extraction_started,false);
 assert.equal(s.current.G2_G7_or_later_qualified,false);
 assert.equal(s.current.source_track_sealed,false);
 assert.equal(s.current.cross_track_W_L_synthesis_authorized,false);
 assert.equal(s.current.research_PR_merge_authorized,false);
 assert.equal(c.status,'CURRENT_AUTHOR_2026_10_11_G0_SSC_QUALIFIED_UNDER_SEPARATE_SCOPE_REVISION');
 assert.equal(c.G0_current_target_complete,true);
 assert.equal(c.old_target_status,'OPEN_UNAUTHENTICATED_HISTORICAL_MUTABLE_BYTES');
 assert.equal(c.old_oct03_frozen_raw_bytes_same_not_verified,true);
 assert.equal(c.known_current_scope_source_semantic_omissions_remaining,0);
 assert.equal(c.verified_exact_CI.new_G0_freeze.id,38122736575);
 assert.equal(c.verified_exact_CI.new_G0_freeze.sha,'851eac84fa3d43b8221773e294088bc21ee53930');
 assert.equal(c.verified_exact_CI.new_G0_freeze.conclusion,'success');
 assert.equal(c.frozen_inputs.source_census.git_blob_sha,pins.ssc[1]);
 assert.equal(c.author_source_counts.source_item_ids,151);
 assert.equal(c.author_source_counts.original_locations,649);
 assert.equal(c.author_source_counts.source_to_ssc_links,560);
 assert.deepEqual(c.historical_failures_remain_failed,[38121249339,38121919671,38122045839,38122111843,38122669284]);
 assert.equal(history.current_lawful_state.G0_open,true);
 assert.equal(history.current_lawful_state.G0_frozen,false);
 assert.equal(source.items.length,151);
 return true;
}
const result=verify(stage,ci);
let count=0;
for(const [label,attack] of [
 ['fake original scope closure',(s,c)=>s.historical_oct03_target.G0_complete=true],
 ['fake current G0 open',(s,c)=>s.current.G0_frozen=false],
 ['erase G1 stage isolation',(s,c)=>s.qualified_successor.G1_eligible_current_target_only=false],
 ['fake prior source SHA',(s,c)=>s.qualified_successor.previous_stage_gate.git_blob_sha='0'.repeat(40)],
 ['fake G0 CI success',(s,c)=>s.qualified_successor.exact_freeze_qualification.conclusion='failure'],
 ['fake W/L bridge authorization',(s,c)=>s.current.cross_track_W_L_synthesis_authorized=true],
 ['start G1 immediately',(s,c)=>s.current.G1_occurrence_extraction_started=true],
 ['source-body item counter drift',(s,c)=>c.author_source_counts.source_item_ids=152],
 ['reclassify old failed CI',(s,c)=>c.historical_failures_remain_failed.pop()],
 ['scope falsified as Oct03 bytes',(s,c)=>c.old_oct03_frozen_raw_bytes_same_not_verified=false],
 ['report current missing source obligation',(s,c)=>c.known_current_scope_source_semantic_omissions_remaining=1],
 ['pretend source track sealed',(s,c)=>s.current.source_track_sealed=true]
]){
 const s=structuredClone(stage),c=structuredClone(ci);attack(s,c);
 let rejected=false;try{verify(s,c)}catch(e){rejected=true;}assert.ok(rejected,'escaped hostile '+label);count++;
}
console.log('W current-author G0 qualified stage successor PASS '+JSON.stringify({new_scope:'G0_SSC_FROZEN',historical_scope:'G0_OPEN',items:151,locations:649,reciprocal:560,hostile_rejected:count,hostile_total:count}));
