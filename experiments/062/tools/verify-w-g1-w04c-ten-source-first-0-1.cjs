#!/usr/bin/env node
'use strict';
// W-only original-author G1 source-local mechanical gate; does NOT qualify global G1 or provide a cold semantic auditor.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\\0'),b])).digest('hex')};
const files={
  "cand": "experiments/062/W_G1_W04C_TEN_ORIGINAL_SOURCE_FIRST_CANDIDATES_0_2.json",
  "old": "experiments/062/W_G1_W04C_TEN_ORIGINAL_SOURCE_FIRST_CANDIDATES_0_1.json",
  "ssc": "research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json",
  "g0": "experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json",
  "stage": "experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_8.json",
  "index": "experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json"
};
const shaPins={
  "old": "0939768dcaedac6e1fa1a980879cea9f1456a099",
  "ssc": "f13075a1e2b039bab66e738cc992e121cd6c9947",
  "stage": "8dced9390509bbb18e22a9327c8acf1d6013c23c",
  "index": "6a959eabe8803770bc8e9851e288de6535821477",
  "g0": "e3848f4025a733d33b8b8b3411fa779e8b0a5b9a"
};
for(const [k,p]of Object.entries(files)){if(k!=='cand')assert.equal(blob(p),shaPins[k],'immutable input '+k)}
const C=read(files.cand),SS=read(files.ssc),O=read(files.stage),I=read(files.index);
const sourceIds=["W-SSC-016","W-SSC-017","W-SSC-018","W-SSC-072","W-SSC-073","W-SSC-074","W-SSC-075","W-SSC-076","W-SSC-077","W-SSC-078"],authorSrc="https://www.math.columbia.edu/~woit/wordpress/?p=15620";
const check=(A)=>{
  assert.equal(A.schema,'isograph.exp062-W-G1-W04c-current-author-ten-source-first.v0.2');
  assert.equal(A.track,'W');assert.equal(A.predecessor.git_blob_sha,shaPins.old);
  assert.equal(A.author_source.url,authorSrc);assert.equal(A.author_source.comments_not_consumed,true);
  assert.equal(A.scope.target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
  assert.equal(A.scope.old_oct03_target,'OPEN_UNAUTHENTICATED');
  for(const f of ['G1_global_complete','G2_authorized','cross_track_use_authorized','science_truth_proved'])assert.equal(A.scope[f],false,'no promotion '+f);
  assert.equal(A.completeness_profile.separate_cold_semantic_auditor,false);
  assert.equal(A.completeness_profile.no_global_G1_promotion,true);
  assert.equal(A.rows.length,10);assert.equal(new Set(A.rows.map(r=>r.id)).size,10);
  assert.deepEqual(A.rows.map(r=>r.id).sort(),[...sourceIds].sort());
  const occ=[],allLines=new Set();
  for(const r of A.rows){
    assert.equal(r.id,r.census_id);assert.equal(r.source_unit,'W04c');
    const item=SS.items.find(i=>i.id===r.id);
    assert.equal(item?.source,'W04c');assert.equal(r.exact_frozen_ssc_body,item.obligation);
    const typed=item.source_expression_census.statements;
    assert.deepEqual(r.original_typed_incidence_ids,typed.map(x=>x.id));
    const seen=new Set(),ids=new Set(r.semantic_operations.map(o=>o.occurrence_id));
    for(const o of r.semantic_operations){
      assert.ok(o.occurrence_id.startsWith(r.id+'-CURG1-'));assert.equal(o.exact_frozen_ssc_body_ref.git_blob_sha,shaPins.ssc);
      assert.equal(o.exact_frozen_ssc_body_ref.census_id,r.id);assert.equal(o.original_author_url,authorSrc);
      assert.ok(I.source_first_current_mutable_locations.some(x=>x.unit==='W04c'&&x.load_bearing&&x.ssc_owners.includes(r.id)&&x.source_location[0]===o.original_author_line));
      assert.equal(o.exact_original_locator,'W04c/web_author_article/W04C-L'+o.original_author_line);
      const t=typed.find(x=>x.id===o.original_typed_assertion_id);
      assert.equal(t?.source_line,o.original_author_line);assert.equal(t.modality,o.source_modality);
      seen.add(t.id);
      assert.ok(o.source_polarity&&o.argument_or_result_roles.length&&o.source_guard&&o.author_semantic_relation_or_operation);
      assert.ok(o.dependency_occurrence_ids.every(v=>ids.has(v)&&v!==o.occurrence_id));
      assert.equal(o.G1_state,'SOURCE_LOCAL_CANDIDATE_NOT_PRIMITIVE_OR_GLOBAL_G1_AUTHORITY');
      assert.ok(o.source_explicit_binder===null||(o.author_semantic_relation_or_operation==='MINKOWSKI_SPACETIME_REPRESENTED_BY_CP1S_CONTAINED_IN_N'&&o.source_explicit_binder==='ALL_CP1S_INSIDE_N_ONLY'));
      occ.push(o);allLines.add(o.original_author_line);
    }
    assert.ok(typed.every(t=>seen.has(t.id)),'uncovered typed atom '+r.id);
    for(const a of r.audit_only_original_locations||[]){
      assert.equal(r.id,'W-SSC-016');assert.ok([9,13,14].includes(a.line));assert.match(a.kind,/NOT_WOIT|NO_G1/);allLines.add(a.line);
    }
  }
  assert.deepEqual(A.rows.find(r=>r.id==='W-SSC-016').audit_only_original_locations.map(x=>x.line),[9,13,14]);
  const original=I.source_first_current_mutable_locations.filter(e=>e.unit==='W04c'&&e.load_bearing);
  assert.ok(original.every(e=>allLines.has(e.source_location[0])),'source inverse missing original line');
  assert.equal(occ.length,54);assert.equal(new Set(occ.map(o=>o.occurrence_id)).size,54);
  assert.equal(A.summary.authored_relation_operation_candidates,54);assert.equal(A.summary.typed_original_incidents,24);
  assert.equal(A.summary.old_source_local_verified,39);assert.equal(A.summary.maximum_source_local_after_proper_review,49);
  assert.equal(O.source_reconciliation.current_source_local_reviewed_count,39);
  assert.equal(O.source_reconciliation.source_local_bodies_not_yet_reviewed,112);
  assert.ok(sourceIds.every(id=>O.source_reconciliation.remaining_by_mechanism.no_historical_G1_extraction.includes(id)));
  for(const [id,key,guard] of [["W-SSC-017","WICK_CHOICE_ANALOGIZED_TO_GAUGE_CHOICE","LIKE_GAUGE_NOT_VERIFIED_GAUGE_EQUIVALENCE"],["W-SSC-075","RIGHT_LOCAL_SL2C_ACTION_ON_CP1_POINT_FIBERS","RIGHT_GEOMETRIC_ROLE"],["W-SSC-075","LEFT_LOCAL_SL2C_ACTION_ON_MODULI_TANGENT","LEFT_AND_RIGHT_DISTINCT"],["W-SSC-076","AUTHOR_DOES_NOT_KNOW_HOW_TO_CONSTRUCT_HIGGS","EXPLICIT_UNKNOWN_NOT_CORE_QU"],["W-SSC-077","COUPLINGS_BY_HOLOMORPHIC_BUNDLE_STRUCTURE_SELF_DUAL","AT_LEAST_SELF_DUAL_DO_NOT_GENERALIZE"],["W-SSC-077","POSTPROJECTIVE_PROPOSED_U1_TIMES_SU3","SOURCE_RESULT_NOT_VERIFIED_GROUP_ISOMORPHISM"],["W-SSC-078","DIRAC_VS_DOLBEAULT_OPERATOR_CHOICE_OPEN","ALTERNATIVES_NOT_EQUIVALENT"]]){
     assert.ok(A.rows.find(r=>r.id===id)?.semantic_operations.some(o=>o.author_semantic_relation_or_operation===key&&o.source_guard===guard),'negative guard '+key);
  }
  assert.ok(A.open_obligations.some(s=>s.includes('adversarial/cold audit')));
  assert.ok(A.open_obligations.some(s=>s.includes('Other 102')));
  assert.ok(A.interpretation_rule.includes('No March12 comments'));
  assert.equal(A.summary.global_G1_complete,false);
};
check(C);
const mutants=[
 ['skip-item',x=>x.rows.pop()],
 ['false-G1',x=>x.scope.G1_global_complete=true],
 ['false-G2',x=>x.scope.G2_authorized=true],
 ['false-track',x=>x.track='L'],
 ['false-Oct3',x=>x.scope.old_oct03_target='QUALIFIED'],
 ['false-cold',x=>x.completeness_profile.separate_cold_semantic_auditor=true],
 ['drop-dirac',x=>x.rows[0].audit_only_original_locations.pop()],
 ['reverse-author',x=>x.author_source.url='https://example.org'],
 ['wrong-original-line',x=>x.rows.find(r=>r.id==='W-SSC-072').semantic_operations[0].original_author_line=19],
 ['alter-SSC-body',x=>x.rows[0].exact_frozen_ssc_body+=' mathematically completed'],
 ['corrupt-typed',x=>x.rows[0].semantic_operations[0].original_typed_assertion_id='WRONG'],
 ['drop-typed',x=>x.rows.find(r=>r.id==='W-SSC-077').semantic_operations.splice(0,3)],
 ['duplicate-ID',x=>x.rows[0].semantic_operations[1].occurrence_id=x.rows[0].semantic_operations[0].occurrence_id],
 ['add-cross-body-dependency',x=>x.rows[0].semantic_operations[0].dependency_occurrence_ids.push('W-SSC-077-CURG1-01')],
 ['flip-symmetry',x=>x.rows.find(r=>r.id==='W-SSC-075').semantic_operations[0].author_semantic_relation_or_operation='LEFT_LOCAL_SL2C_ACTION_ON_CP1_POINT_FIBERS'],
 ['overwrite-Higgs-negative',x=>x.rows.find(r=>r.id==='W-SSC-076').semantic_operations[1].source_guard='HIGGS_CONSTRUCTED'],
 ['drop-selfdual',x=>x.rows.find(r=>r.id==='W-SSC-077').semantic_operations.find(o=>o.author_semantic_relation_or_operation==='COUPLINGS_BY_HOLOMORPHIC_BUNDLE_STRUCTURE_SELF_DUAL').source_guard='ALL_INTERACTING_YM'],
 ['promote-U1-quotient',x=>x.rows.find(r=>r.id==='W-SSC-077').semantic_operations.find(o=>o.author_semantic_relation_or_operation==='POSTPROJECTIVE_PROPOSED_U1_TIMES_SU3').source_guard='GROUP_THEOREM'],
 ['fabricate-binder',x=>x.rows[0].semantic_operations[0].source_explicit_binder='FORALL_UNIVERSES'],
 ['falsify-original-index',x=>x.rows[0].semantic_operations[0].exact_original_locator='W04b/web_author_article/W04B-L10'],
 ['G1-count-fraud',x=>x.summary.maximum_source_local_after_proper_review=151],
 ['nonauthor-promoted',x=>x.rows[0].semantic_operations[0].G1_state='QUALIFIED_NEW_PRIMITIVE'],
 ['lose-open',x=>x.open_obligations=[]]
];
let rejected=0;
for(const [name,change]of mutants){
 const m=structuredClone(C);change(m);
 let failed=false;try{check(m)}catch{failed=true}
 assert.ok(failed,'hostile mutation escaped: '+name);rejected++;
}
console.log('W04c ten-body current-author source-local positive PASS; typed 24; occurrences 54; adversarial '+rejected+'/'+mutants.length+' rejected; global G1 UNQUALIFIED');
