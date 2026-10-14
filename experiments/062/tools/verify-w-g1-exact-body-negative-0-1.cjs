#!/usr/bin/env node
'use strict';
// The old identical G0 body did not guarantee an exhaustive G1 occurrence map.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const INPUT={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 old:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 frontier:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_REBASELINE_FRONTIER_0_1.json','0813758c9d11a32fa7e9e90329aaa7cf4d3d4c19'],
 stage:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a']
};
for(const [k,[p,h]] of Object.entries(INPUT))assert.equal(sha(p),h,'qualified G0 or historical G1 drift '+k);
const ssc=read(INPUT.ssc[0]),inv=read(INPUT.inverse[0]),legacy=read(INPUT.old[0]),front=read(INPUT.frontier[0]),stage=read(INPUT.stage[0]);
const m=read('experiments/062/W_G1_CURRENT_AUTHOR_EXACT_BODY_NEGATIVE_MODALITY_REAUDIT_0_1.json');
const S=new Map(ssc.items.map(x=>[x.id,x])),I=new Map(inv.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x])),L=new Map(legacy.items.map(x=>[x.census_id,x]));
const copy=x=>structuredClone(x),wanted=['W-SSC-039','W-SSC-116'];
function verify(q){
 assert.equal(q.schema,'isograph.exp062-W-current-source-G1-exact-body-negative-modality-cold-recheck.v0.1');
 assert.equal(q.track,'W');
 assert.equal(q.source_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(q.original_Oct03_source_G0,'OPEN');
 assert.equal(q.status,'SOURCE_FIRST_TWO_EXACT_BODY_G1_OMISSIONS_REPAIRED_LOCAL_NOT_GLOBAL');
 assert.equal(q.systematic_failure_class,'BODY_EXACTNESS_DOES_NOT_PROVE_OCCURRENCE_COMPLETENESS');
 assert.equal(q.source_G0_body_count,151);
 assert.equal(q.cold_audited_body_count,2);
 assert.equal(q.new_candidate_occurrence_count,6);
 assert.equal(q.current_scope_G1_complete,false);
 assert.equal(q.G2_authorized,false);
 assert.equal(q.no_L_semantics,true);
 assert.equal(q.no_cited_third_party_math_import,true);
 assert.equal(q.prior_84_body_G1_still_not_CURRENT_authority,true);
 assert.deepEqual(q.affected_historical_body_ids,wanted);
 assert.equal(stage.current.G0_frozen,true);
 assert.equal(stage.historical_oct03_target.G0_complete,false);
 assert.equal(stage.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(ssc.items.length,151);
 assert.equal(front.rows.length,151);
 assert.equal(q.rows.length,2);
 for(const [key,[path,h]] of Object.entries(INPUT))assert.deepEqual(q.input_git_blob_SHA[key],{path,sha:h});
 const seen=new Set();
 for(const [i,z] of q.rows.entries()){
  const source=S.get(z.census_id),original=I.get(z.census_id),old=L.get(z.census_id),prior=front.rows.find(x=>x.census_id===z.census_id);
  assert.equal(z.census_id,wanted[i]);
  assert.ok(source&&original&&old&&prior);
  assert.equal(z.source_unit,original.unit);
  assert.equal(z.exact_current_frozen_body,source.obligation);
  assert.deepEqual(z.source_origin_locations,original.original_source_keys);
  assert.deepEqual(z.original_typed_statement_ids,original.source_typed_statement_ids);
  assert.equal(z.exact_legacy_body_identical,true);
  assert.equal(prior.historical_G1.historical_body_identical_to_current,true);
  assert.equal(z.legacy_extract_occurrences,old.occurrences.length);
  assert.equal(z.old_G1_not_promoted,true);
  assert.equal(z.new_independent_cold_occurrences.length,3);
  assert.ok(z.source_first_reconstruction_scope.length>30);
  const ids=new Set();
  for(let k=0;k<3;k++){
   const a=z.new_independent_cold_occurrences[k];
   assert.equal(a.occurrence_id,z.census_id+'-COLD-'+String(k+1).padStart(2,'0'));
   assert.ok(!seen.has(a.occurrence_id));seen.add(a.occurrence_id);
   assert.equal(a.status,'SOURCE_FIRST_CANDIDATE_PENDING_ADVERSARIAL_CI');
   assert.equal(a.source_claim_is_mathematical_proof,false);
   assert.ok(source.obligation.includes(a.source_span));
   assert.ok(a.source_span.includes(a.relation_span));
   for(const arg of a.argument_spans)assert.ok(a.source_span.includes(arg));
   assert.ok(a.source_side_condition_modality.length>20);
   assert.ok(a.source_roles&&typeof a.source_roles==='object');
   ids.add(a.occurrence_id);
  }
 }
 const b039=q.rows[0],b116=q.rows[1];
 const source039=S.get('W-SSC-039').source_expression_census.statements.find(x=>x.id==='W01-S43-039-01');
 assert.equal(source039.status,'AUTHOR_PROPOSES_FULL_INTERACTING_THEORY_UNCONSTRUCTED');
 assert.equal(source039.negative,'DO_NOT_INFER_COMPLETE_PT_YANG_MILLS_ACTION');
 assert.equal(b039.new_independent_cold_occurrences[2].logical_force,'AUTHOR_EXPLICIT_UNFINISHED_INTERACTING_PT_DYNAMICS');
 assert.equal(b039.new_independent_cold_occurrences[2].source_roles.completion,'NOT_CONSTRUCTED');
 const source116=S.get('W-SSC-116').source_expression_census.statements;
 assert.equal(source116[2].epistemic,'AUTHOR_SPECULATION_NO_ASSERTED_ISOMORPHISM');
 assert.ok(source116[2].negative.includes('NOT_ACTUAL_N4_PT_DYNAMICS'));
 assert.equal(b116.new_independent_cold_occurrences[1].logical_force,'SOURCE_AUTHOR_SPECULATIVE_RELATION');
 assert.equal(b116.new_independent_cold_occurrences[1].source_roles.status,'SPECULATION');
 assert.equal(b116.new_independent_cold_occurrences[2].logical_force,'SOURCE_NEGATIVE_NOT_ACTUAL_DYNAMICS');
 assert.equal(b116.new_independent_cold_occurrences[2].source_roles.negated,'PROPOSAL_DYNAMICAL_CONSTRUCTION');
 return {qualified_new_target_G0:'FROZEN',historical_original_target:'OPEN',G1:'LOCAL_CANDIDATE_NOT_COMPLETE',audited_source_bodies:2,new_candidates:6,G2:'BLOCKED'};
}
const success=verify(copy(m));
const tests=[
 ['remove source unconstructed PT negative',z=>z.rows[0].new_independent_cold_occurrences.pop()],
 ['pretend PT dynamic theory exists',z=>z.rows[0].new_independent_cold_occurrences[2].source_roles.completion='COMPLETED'],
 ['demote W039 negative to positive math',z=>z.rows[0].new_independent_cold_occurrences[2].logical_force='AUTHOR_COMPLETE_PT_DYNAMICS'],
 ['remove intrinsics PT source',z=>z.rows[0].new_independent_cold_occurrences[0].source_span='U1 bundles are from S4'],
 ['W116 spec promoted to theory',z=>z.rows[1].new_independent_cold_occurrences[1].source_roles.status='ESTABLISHED'],
 ['W116 speculation relabeled proved bridge',z=>z.rows[1].new_independent_cold_occurrences[1].logical_force='DEMONSTRATED_ISOMORPHISM'],
 ['W116 adopted dynamics invented',z=>z.rows[1].new_independent_cold_occurrences[2].source_roles.negated='NONE'],
 ['delete W116 historical negative claim',z=>z.rows[1].new_independent_cold_occurrences[2].logical_force='ADOPTED_N4_QFT'],
 ['change source citation provenance W116',z=>z.rows[1].original_typed_statement_ids.pop()],
 ['reassign W039 to W02',z=>z.rows[0].source_unit='W02'],
 ['erase original G0 locator',z=>z.rows[0].source_origin_locations=[]],
 ['G0 author frozen corpus changed',z=>z.input_git_blob_SHA.ssc.sha='bad'],
 ['false W-branch G1 complete',z=>z.current_scope_G1_complete=true],
 ['G2 authorization',z=>z.G2_authorized=true],
 ['Oct03 closure fabricated',z=>z.original_Oct03_source_G0='QUALIFIED'],
 ['L premise imported',z=>z.no_L_semantics=false],
 ['source body rewritten',z=>z.rows[1].exact_current_frozen_body='different'],
 ['fake earlier G1 input authority',z=>z.prior_84_body_G1_still_not_CURRENT_authority=false],
 ['zero root source span',z=>z.rows[1].new_independent_cold_occurrences[0].source_span=''],
 ['invent math theorem',z=>z.rows[0].new_independent_cold_occurrences[0].source_claim_is_mathematical_proof=true]
];
for(const [name,f]of tests){let z=copy(m);f(z);let rejected=false;try{verify(z)}catch(e){rejected=true;}assert.ok(rejected,'hostile escaped: '+name)}
console.log('W G1 cold source-first exact-body negative and provisional modality PASS '+JSON.stringify({...success,hostile_rejections:tests.length,hostile_total:tests.length}));
