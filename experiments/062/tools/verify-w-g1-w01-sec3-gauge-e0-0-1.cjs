#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../../..');
const file = p => fs.readFileSync(path.join(root,p));
const load = p => JSON.parse(file(p));
const sha = b => crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const P='experiments/062/W_G1_W01_SEC3_GAUGE_E0_SOURCE_FIRST_CANDIDATES_0_1.json';
const C=load(P), F=C.frozen_inputs;
for(const p of [F.ssc,F.inventory,F.gate,F.last_qualified_G1]) assert.equal(sha(file(p.path)),p.git_blob_sha,'frozen Git blob '+p.path);
const S=load(F.ssc.path), I=load(F.inventory.path), G=load(F.gate.path), T=load(F.last_qualified_G1.path);
assert.equal(S.census_item_count,151); assert.equal(G.current.G0_frozen,true);
assert.equal(G.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
assert.equal(T.source_reconciliation.current_source_local_reviewed_count,39);
const expected={
 'W-SSC-002':['CITED_PREDECESSOR_SUBGROUP_GAUGING','WOIT_EUCLIDEAN_REAL_FORM_SELECTION','LEFT_INTERNAL_WEAK_YANG_MILLS_GAUGING','RIGHT_SPACETIME_CHIRAL_SPIN_GAUGING','ORDERED_DISTINCT_FACTOR_ROLES'],
 'W-SSC-003':['CHOICE_OF_NONZERO_IMAGINARY_TIME_VECTOR','SELECTED_TIME_RELATIVE_HOM_MAP','JOINT_E0_X_ORDERED_SPIN4_ACTION','MIDDLE_GL_CANCELLATION_TO_GR_CONJUGATION','TIME_DIRECTION_RELATIVE_INVARIANCE','SPATIAL_LEFT_INVARIANT_RIGHT_ROTATING','RIGHT_THREEDIMENSIONAL_SPIN_DOUBLE_COVER_ROLE','PROPOSED_HIGGS_ROLE_FOR_TIME_DIRECTION_DEGREE']
};
function check(c){
 assert.equal(c.track,'W'); assert.equal(c.semantic_authority,false); assert.equal(c.status,'AUTHOR_SOURCE_FIRST_CANDIDATE_MECHANICAL_ONLY_NOT_COLD_QUALIFIED');
 assert.equal(c.qualified_current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.deepEqual(c.rows.map(r=>r.census_id),['W-SSC-002','W-SSC-003']);
 assert.equal(c.rows.flatMap(r=>r.occurrences).length,13);
 for(const r of c.rows){
  const s=S.items.find(q=>q.id===r.census_id),inv=I.current_ssc_to_original_inverse.find(q=>q.ssc_id===r.census_id);
  assert(s&&inv); assert.equal(r.original_census_body_exact,s.obligation); assert.equal(r.source_unit,'W01'); assert.equal(r.source_revision,'arXiv:2104.05099v2');
  assert.deepEqual(r.exact_G0_typed_source_IDs,s.source_expression_census.statements.map(z=>z.id)); assert.deepEqual(r.original_G0_inverse_locators,inv.original_source_keys);
  assert.deepEqual(r.occurrences.map(o=>o.source_semantic_operation_or_relation),expected[r.census_id]);
  const seen=new Set(); for(let k=0;k<r.occurrences.length;k++){
   const o=r.occurrences[k]; assert.equal(o.occurrence_id,r.census_id+'-CURG1-SEC3-'+String(k+1).padStart(2,'0'));
   assert.equal(o.original_source.revision,'arXiv:2104.05099v2');assert.equal(o.original_source.source_unit,'W01');
   assert.equal(o.qualification,'SOURCE_LOCAL_CANDIDATE_NO_INDEPENDENT_COLD_G1_QUALIFICATION');
   assert.equal(o.G1_semantic_expansion,'UNEXPANDED_SEMANTIC_OCCURRENCE_NOT_CORE_CLOSED');
   assert(o.source_typed_statement_ids.length>0 && o.source_typed_statement_ids.every(id=>r.exact_G0_typed_source_IDs.includes(id)));
   assert(o.source_argument_or_carrier_roles.length>0 && o.source_result_role && o.source_side_conditions_and_negative_guard);
   assert(o.original_source.rendered_HTML_lines.every(([lo,hi])=>Number.isInteger(lo)&&lo>0&&hi>=lo&&hi<=156));
   assert(o.dependencies_in_same_frozen_body.every(d=>seen.has(d))); seen.add(o.occurrence_id);
  }
 }
 const [a,b]=c.rows.map(r=>r.occurrences);
 assert(a[0].source_side_conditions_and_negative_guard.startsWith('CITATIONS_ARE_REFERENCE_ROLES_ONLY'));
 assert(a[2].source_argument_or_carrier_roles.includes('SU(2)_L')); assert(a[3].source_argument_or_carrier_roles.includes('SU(2)_R'));
 assert(a[4].source_side_conditions_and_negative_guard.startsWith('NO_FACTOR_SWAP'));
 assert(b[0].source_argument_or_carrier_roles.includes('selected nonzero imaginary-time direction e0'));
 assert(b[1].source_side_conditions_and_negative_guard.startsWith('NOT_E0_INDEPENDENT'));
 assert(b[2].source_argument_or_carrier_roles.includes('e0 and x both transform'));
 assert(b[3].source_result_role.includes('gR e0^(-1) x gR^(-1)'));
 assert(b[4].source_side_conditions_and_negative_guard.startsWith('TEMPORAL_INVARIANCE_NOT_FOR_ARBITRARY'));
 assert(b[5].source_result_role.includes('SU(2)_R'));
 assert(b[7].source_side_conditions_and_negative_guard.includes('NOT_A_FINISHED_HIGGS'));
 assert.equal(c.source_roles_and_falsifiers.no_L_or_cross_author_semantics,true);
 assert.equal(c.source_roles_and_falsifiers.no_G2_or_core_primitive_promotion,true);
 const g=c.stage_lock;assert.equal(g.previous_G1_qualified_bodies,39);assert.equal(g.new_G1_qualified_bodies,0);assert.equal(g.total_current_SSC_bodies,151);
 for(const k of ['G1_complete','G2_authorized','G3_to_G7_authorized','IA_NEI_DTS_DP_authorized','source_sealed','W_L_synthesis_authorized','PR70_merge_authorized'])assert.equal(g[k],false);
}
check(C);
const mutate=(fn)=>{const m=JSON.parse(JSON.stringify(C));fn(m);assert.throws(()=>check(m));};
const trials=[
 c=>c.rows[0].occurrences.splice(3,1),
 c=>c.rows[1].occurrences.push({...c.rows[1].occurrences[0]}),
 c=>c.rows[0].exact_G0_typed_source_IDs.pop(),
 c=>c.rows[1].original_G0_inverse_locators.pop(),
 c=>c.rows[0].original_census_body_exact+=' ',
 c=>c.rows[1].source_revision='arXiv:2104.05099v1',
 c=>c.rows[0].occurrences[2].source_argument_or_carrier_roles[0]='SU(2)_R',
 c=>c.rows[0].occurrences[3].source_argument_or_carrier_roles[0]='SU(2)_L',
 c=>c.rows[0].occurrences[0].source_side_conditions_and_negative_guard='ADOPT_PRIOR_PROPOSAL',
 c=>c.rows[0].occurrences[1].dependencies_in_same_frozen_body=['missing'],
 c=>c.rows[1].occurrences[0].source_argument_or_carrier_roles[0]='zero e0',
 c=>c.rows[1].occurrences[1].source_side_conditions_and_negative_guard='CANONICAL_MAP',
 c=>c.rows[1].occurrences[2].source_argument_or_carrier_roles[1]='freeze e0',
 c=>c.rows[1].occurrences[3].source_result_role='gL e0^(-1) x gL^(-1)',
 c=>c.rows[1].occurrences[4].source_side_conditions_and_negative_guard='UNCONDITIONAL_TIME_INVARIANCE',
 c=>c.rows[1].occurrences[5].source_result_role='right action trivial',
 c=>c.rows[1].occurrences[7].source_side_conditions_and_negative_guard='FINISHED_HIGGS',
 c=>c.rows[1].occurrences[2].source_typed_statement_ids=['L-SSC-001'],
 c=>c.rows[1].occurrences[0].qualification='COLD_G1_QUALIFIED',
 c=>c.stage_lock.G2_authorized=true,
 c=>c.stage_lock.new_G1_qualified_bodies=2,
 c=>c.source_roles_and_falsifiers.no_L_or_cross_author_semantics=false
];
trials.forEach(mutate);
console.log('PASS: frozen-source/current-gate identity, W-SSC-002/003 exact typed and reciprocal G0 crosswalk, 13 G1 candidates, role/order/modality/firewalls; '+trials.length+'/'+trials.length+' hostile mutants rejected.');
console.log('BOUNDARY: mechanical integrity only; NO independent original-source cold review, G1 qualification, Core/physical theorem proof, G2 or W/L/merge promotion.');
