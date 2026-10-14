#!/usr/bin/env node
'use strict';
// Corrected v0.2 scoped W-only SOURCE-LOCAL MECHANICAL gate; same-author expected values, NOT an independent cold original-source audit.
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const path={
 candidate:'experiments/062/W_G1_W01_PALATINI_HODGE_SOURCE_FIRST_CANDIDATES_0_1.json',
 ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json',
 inverse:'experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json',
 g0:'experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json',
 stage:'experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_8.json'
};
const pins={ssc:'f13075a1e2b039bab66e738cc992e121cd6c9947',inverse:'6a959eabe8803770bc8e9851e288de6535821477',g0:'e3848f4025a733d33b8b8b3411fa779e8b0a5b9a',stage:'8dced9390509bbb18e22a9327c8acf1d6013c23c'};
for(const k of Object.keys(pins))assert.equal(gitBlob(path[k]),pins[k],'frozen authority '+k);
const SS=read(path.ssc),IX=read(path.inverse),G0=read(path.g0),S=read(path.stage),C=read(path.candidate);
const expected=[
 ['W-SSC-029','W01-029-PALATINI-01',159,166,'FRAME_SPIN_CONNECTION_VERSUS_CANONICAL_FORM_ROLES','FRAME_FORMS_HAVE_DISTINCT_CARRIERS_AND_PURPOSES'],
 ['W-SSC-029','W01-029-PALATINI-01',167,171,'PALATINI_ORDERED_WEDGE_ACTION_INTEGRAL','ORDER_EA_WEDGE_EB_WEDGE_OMEGA_AND_INDEX_0123_NOT_DISCARDABLE'],
 ['W-SSC-029','W01-029-PALATINI-01',169,171,'CURVATURE_TWO_FORM_DEPENDS_ON_SPIN_CONNECTION','SOURCE_DEPENDENCY_OMEGA_MUST_NOT_BE_REMOVED'],
 ['W-SSC-029','W01-029-VAR-02',173,178,'SPIN_CONNECTION_VARIATION_TORSION_EQUATION','VARIED_OMEGA_NOT_E_AND_EQUATION_NOT_UNIVERSAL_ZERO_STATIONARITY'],
 ['W-SSC-029','W01-029-VAR-02',177,180,'TORSION_FREE_DETERMINES_LEVI_CIVITA_OMEGA','SOURCE_CONDITIONAL_NOT_ARBITRARY_OMEGA_AND_NOT_NEW_PRIMITIVE'],
 ['W-SSC-029','W01-029-VAR-03',182,184,'FRAME_VARIATION_EINSTEIN_EQUATIONS','NO_FULL_EINSTEIN_COMPONENT_EQUATIONS_PRINTED_HERE_AND_NOT_OMEGA_VARIATION'],
 ['W-SSC-030','W01-030-SPIN-01',186,187,'ORDERED_SPIN4_CHIRAL_LIE_ALGEBRA_DIRECT_SUM','RIGHT_LEFT_ORDERED_ROLES_NO_FACTOR_COLLAPSE'],
 ['W-SSC-030','W01-030-CONN-02',189,191,'SPIN_CONNECTION_RIGHT_LEFT_COMPONENT_SUM','CONNECTION_SUM_DISTINCT_FROM_CURVATURE_SUM'],
 ['W-SSC-030','W01-030-CONN-02',189,193,'CURVATURE_RIGHT_LEFT_CONNECTION_DEPENDENT_COMPONENTS','EACH_CURVATURE_DEPENDS_ON_MATCHING_CHIRAL_CONNECTION_NOT_CROSS_COMPONENT'],
 ['W-SSC-030','W01-030-CONN-02',193,193,'RIGHT_LEFT_SPINOR_ENDOMORPHISM_ACTION_ROLES','NO_CROSS_CHIRAL_IDENTIFICATION_OR_GLOBAL_SPINOR_EQUALITY'],
 ['W-SSC-030','W01-030-HODGE-03',194,198,'HODGE_TWO_FORM_SIGNED_EIGENSPACE_DIRECT_SUM','HODGE_PLUS_AND_MINUS_DISTINCT_EIGENSUBSPACES_NOT_CHIRAL_FACTOR_NAMES'],
 ['W-SSC-030','W01-030-HODGE-03',198,199,'HODGE_SIGNED_SECTORS_SPINOR_HOM_INCLUSIONS','SOURCE_PRINTS_INCLUSIONS_NOT_EQUALITIES_AND_NO_PLUS_LEFT_SWAP'],
 ['W-SSC-030','W01-030-CURV-04',201,203,'FOUR_ORDERED_HODGE_BY_CHIRAL_CURVATURE_COMPONENTS','FOUR_DISTINCT_SIGN_X_CHIRAL_COMPONENTS_NOT_INTERCHANGEABLE_AND_NO_W031_EINSTEIN_VANISHING_IMPORTED']
];
const expectedSemantic=[
 {
  "source_argument_or_carrier_roles": [
   "omega: spin-connection one-form valued in spin(n) Lie algebra",
   "e: canonical frame one-form valued in R^n"
  ],
  "source_result_role": "TWO_DISTINCT_FRAME_BUNDLE_FORM_ROLES",
  "dependency_operation_names_in_same_body": []
 },
 {
  "source_argument_or_carrier_roles": [
   "M: four-dimensional Riemannian integration domain",
   "A,B,C,D: index roles 0..3",
   "e^A,e^B: canonical one-forms",
   "Omega^CD(omega): connection-dependent curvature two-form"
  ],
  "source_result_role": "integral_M epsilon_ABCD e^A wedge e^B wedge Omega^CD(omega)",
  "dependency_operation_names_in_same_body": [
   "FRAME_SPIN_CONNECTION_VERSUS_CANONICAL_FORM_ROLES"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "omega: source spin connection",
   "Omega^CD(omega): source curvature two-form"
  ],
  "source_result_role": "CURVATURE_DEPENDENT_ON_OMEGA_NOT_FREE_ACTION_FIELD",
  "dependency_operation_names_in_same_body": [
   "FRAME_SPIN_CONNECTION_VERSUS_CANONICAL_FORM_ROLES"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "varied field: omega^AB",
   "e^A: frame one-form",
   "d: exterior differential",
   "wedge: ordered product"
  ],
  "source_result_role": "de^A + omega^A_B wedge e^B = 0",
  "dependency_operation_names_in_same_body": [
   "PALATINI_ORDERED_WEDGE_ACTION_INTEGRAL"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "source torsion equation: de^A + omega^A_B wedge e^B = 0",
   "e: frame form determining connection"
  ],
  "source_result_role": "SOURCE_IDENTIFIES_OMEGA_AS_LEVI_CIVITA_CONNECTION_UNDER_TORSION_FREE_CONDITION",
  "dependency_operation_names_in_same_body": [
   "SPIN_CONNECTION_VARIATION_TORSION_EQUATION"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "varied field: e^A",
   "Palatini source fields: e and omega"
  ],
  "source_result_role": "EINSTEIN_EQUATIONS_IN_E_PER_AUTHOR",
  "dependency_operation_names_in_same_body": [
   "PALATINI_ORDERED_WEDGE_ACTION_INTEGRAL"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "spin(4): source algebra",
   "su(2)_R: right chiral role",
   "su(2)_L: left chiral role"
  ],
  "source_result_role": "spin(4) = su(2)_R direct_sum su(2)_L",
  "dependency_operation_names_in_same_body": []
 },
 {
  "source_argument_or_carrier_roles": [
   "omega: original connection",
   "omega_R: right-chiral connection",
   "omega_L: left-chiral connection"
  ],
  "source_result_role": "omega = omega_R + omega_L",
  "dependency_operation_names_in_same_body": [
   "ORDERED_SPIN4_CHIRAL_LIE_ALGEBRA_DIRECT_SUM"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "Omega: full spin-connection curvature",
   "Omega_R(omega_R): right-chiral curvature",
   "Omega_L(omega_L): left-chiral curvature"
  ],
  "source_result_role": "Omega = Omega_R(omega_R) + Omega_L(omega_L)",
  "dependency_operation_names_in_same_body": [
   "SPIN_CONNECTION_RIGHT_LEFT_COMPONENT_SUM"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "omega_R,Omega_R: right connection and curvature",
   "omega_L,Omega_L: left connection and curvature",
   "S_R,S_L: distinct spinor spaces"
  ],
  "source_result_role": "R-valued actions in End(S_R); L-valued actions in End(S_L)",
  "dependency_operation_names_in_same_body": [
   "CURVATURE_RIGHT_LEFT_CONNECTION_DEPENDENT_COMPONENTS"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "Lambda^2(M): source two-forms in four-dimensional Riemannian signature",
   "star: Hodge operator",
   "Lambda^2_+: eigenvalue +1",
   "Lambda^2_-: eigenvalue -1"
  ],
  "source_result_role": "Lambda^2(M) = Lambda^2_+(M) direct_sum Lambda^2_-(M)",
  "dependency_operation_names_in_same_body": []
 },
 {
  "source_argument_or_carrier_roles": [
   "Lambda^2_+(M): Hodge + sector",
   "Lambda^2_-(M): Hodge - sector",
   "S_R,S_L: spinor action carriers"
  ],
  "source_result_role": "Lambda^2_+(M) subset Hom(S_R,S_R); Lambda^2_-(M) subset Hom(S_L,S_L)",
  "dependency_operation_names_in_same_body": [
   "HODGE_TWO_FORM_SIGNED_EIGENSPACE_DIRECT_SUM",
   "RIGHT_LEFT_SPINOR_ENDOMORPHISM_ACTION_ROLES"
  ]
 },
 {
  "source_argument_or_carrier_roles": [
   "Omega(omega): full curvature",
   "Omega_(+,R): plus right",
   "Omega_(+,L): plus left",
   "Omega_(-,R): minus right",
   "Omega_(-,L): minus left"
  ],
  "source_result_role": "Omega(omega) = Omega_(+,R)(omega) + Omega_(+,L)(omega) + Omega_(-,R)(omega) + Omega_(-,L)(omega)",
  "dependency_operation_names_in_same_body": [
   "CURVATURE_RIGHT_LEFT_CONNECTION_DEPENDENT_COMPONENTS",
   "HODGE_SIGNED_SECTORS_SPINOR_HOM_INCLUSIONS"
  ]
 }
];
function check(a){
 assert.equal(a.schema,'isograph.exp062-W-G1-W01-palatini-hodge-original-first.v0.1');
 assert.equal(a.track,'W');assert.equal(a.semantic_authority,false);
 assert.equal(a.status,'SELF_AUTHORED_SOURCE_LOCAL_CANDIDATE_NOT_INDEPENDENTLY_COLD_QUALIFIED');
 assert.equal(a.qualified_current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(a.source.original_version,'arXiv:2104.05099v2');
 assert.equal(a.source.url,'https://arxiv.org/html/2104.05099v2');
 assert.equal(a.source.current_session_primary_source_byte_hash_independently_recomputed,false);
 assert.equal(a.source.oct03_mutable_source_identity_authenticated,false);
 assert.deepEqual(a.source.original_html_lines,[159,203]);
 for(const k of ['ssc','inverse','g0','qualified_G1_predecessor']){
  const pk=k==='qualified_G1_predecessor'?'stage':k;
  assert.equal(a.frozen_inputs[k].git_blob_sha,pins[pk],'source pin '+k);
 }
 const gateFlags=['old_Oct03_G0_complete','this_packet_independent_cold_source_review','this_packet_G1_qualified','global_G1_complete','G2_G7_authorized','IA_NEI_DTS_DP_authorized','W_L_synthesis_authorized','source_sealed','PR70_merge_authorized'];
 assert.equal(a.gates.current_author_G0_frozen,true);
 for(const k of gateFlags)assert.equal(a.gates[k],false,'no false gate '+k);
 assert.equal(G0.current.G0_frozen,true);
 assert.equal(S.source_reconciliation.current_source_local_reviewed_count,39);
 assert.equal(a.extraction_summary.qualified_bodies_unchanged,39);
 assert.equal(a.extraction_summary.candidate_bodies,2);
 assert.equal(a.extraction_summary.local_semantic_occurrence_candidates,13);
 assert.equal(a.extraction_summary.source_typed_assertions,7);
 assert.equal(a.extraction_summary.global_G1_complete,false);
 assert.equal(a.checks.independent_cold_semantic_reconstruction,'NOT_PERFORMED');
 assert.equal(a.rows.length,2);
 const all=[];
 for(const [idx,id]of ['W-SSC-029','W-SSC-030'].entries()){
  const r=a.rows[idx];assert.equal(r.census_id,id);assert.equal(r.source_unit,'W01');
  const frozen=SS.items.find(x=>x.id===id);
  const inv=IX.current_ssc_to_original_inverse.find(x=>x.ssc_id===id);
  assert.equal(r.source_scope,frozen.source);assert.equal(r.exact_frozen_census_body,frozen.obligation);
  assert.deepEqual(r.exact_G0_source_expression_statements,frozen.source_expression_census.statements);
  assert.deepEqual(r.original_G0_reciprocal_locators,inv.original_source_keys);
  assert.deepEqual(r.original_G0_typed_statement_ids,inv.source_typed_statement_ids);
  assert.deepEqual(r.original_G0_typed_statement_ids,frozen.source_expression_census.statements.map(x=>x.id));
  assert.ok(S.source_reconciliation.remaining_by_mechanism.historical_body_modified_but_unreviewed.includes(id));
  assert.equal(r.occurrences.length,idx===0?6:7);
  const bodyOps=new Set(r.occurrences.map(x=>x.source_semantic_operation_or_relation));
  const types=new Set(r.occurrences.map(x=>x.original_G0_typed_statement_id));
  assert.deepEqual([...types].sort(),[...r.original_G0_typed_statement_ids].sort());
  for(let j=0;j<r.occurrences.length;j++){
   const o=r.occurrences[j],e=expected[all.length]; // stable occurrence order, no implicit inference
   assert.equal(o.occurrence_id,id+'-CURG1-PH-'+String(j+1).padStart(2,'0'));
   assert.equal(e[0],id);assert.equal(o.original_G0_typed_statement_id,e[1]);
   assert.deepEqual(o.original_author_source.rendered_html_line_range,[e[2],e[3]]);
   assert.equal(o.original_author_source.revision,'arXiv:2104.05099v2');
   assert.equal(o.original_author_source.url,a.source.url);
   assert.equal(o.original_author_source.exact_original_source_byte_digest_reverified_here,false);
   assert.equal(o.source_semantic_operation_or_relation,e[4]);
   assert.equal(o.source_side_condition_and_negative_guard,e[5]);
   assert.ok(o.source_argument_or_carrier_roles.length>0&&o.source_result_role);
   const eSemantic=expectedSemantic[all.length];
   assert.deepEqual(o.source_argument_or_carrier_roles,eSemantic.source_argument_or_carrier_roles,'frozen semantic argument roles');
   assert.equal(o.source_result_role,eSemantic.source_result_role,'frozen source result role');
   assert.deepEqual(o.dependency_operation_names_in_same_body,eSemantic.dependency_operation_names_in_same_body,'source dependency incidence');
   assert.ok(o.source_binder_ownership.includes('NO_UNIVERSAL_THEOREM_ADDED'));
   assert.equal(o.noncore_behavior,'UNEXPANDED_NO_NEW_PRIMITIVE_OR_SCHEMA_AUTHORITY');
   assert.equal(o.G1_disposition,'SOURCE_LOCAL_CANDIDATE_PENDING_INDEPENDENT_COLD_SOURCE_RECONSTRUCTION');
   assert.ok(o.dependency_operation_names_in_same_body.every(x=>bodyOps.has(x)&&x!==o.source_semantic_operation_or_relation));
   all.push(o);
  }
 }
 assert.equal(all.length,13);
 assert.equal(new Set(all.map(x=>x.occurrence_id)).size,13);
 assert.ok(a.important_residuals.some(x=>x.includes('W-SSC-031')));
 assert.equal(a.checks.same_author_expected_result_control_not_independent,true);
}
check(C);
// Finite algebraic local diagnostic only: oriented orthonormal 4D basis of six 2-forms.
// Star 01=23, 02=-13, 03=12, 12=03, 13=-02, 23=01; star^2=I and trace=0 -> eigenmultiplicities 3 each.
const star={'01':['23',1],'02':['13',-1],'03':['12',1],'12':['03',1],'13':['02',-1],'23':['01',1]};
for(const [k,[t,s]]of Object.entries(star)){assert.equal(star[t][0],k);assert.equal(s*star[t][1],1)}
assert.equal(Object.keys(star).length,6);
assert.equal(Object.entries(star).filter(([k,v])=>v[0]===k).length,0);
const mutate=[
 ['remove-body',x=>x.rows.pop()],['remove-occurrence',x=>x.rows[0].occurrences.pop()],
 ['duplicate-id',x=>x.rows[0].occurrences[1].occurrence_id=x.rows[0].occurrences[0].occurrence_id],
 ['swap-typed-variation',x=>x.rows[0].occurrences[3].original_G0_typed_statement_id='W01-029-VAR-03'],
 ['reverse-wedge',x=>x.rows[0].occurrences[1].source_side_condition_and_negative_guard='ORDER_EB_WEDGE_EA'],
 ['detach-curvature',x=>x.rows[0].occurrences[2].source_side_condition_and_negative_guard='OMEGA_INDEPENDENT'],
 ['invent-component-Einstein',x=>x.rows[0].occurrences[5].source_side_condition_and_negative_guard='EINSTEIN_COMPONENTS_PRINTED'],
 ['swap-Hodge-sign',x=>x.rows[1].occurrences[4].source_side_condition_and_negative_guard='HODGE_MINUS_PLUS_INTERCHANGEABLE'],
 ['swap-spinor-carrier',x=>x.rows[1].occurrences[5].source_side_condition_and_negative_guard='PLUS_LEFT_MINUS_RIGHT'],
 ['truncate-four-components',x=>x.rows[1].occurrences[6].source_semantic_operation_or_relation='TWO_COMPONENTS'],
 ['erase-source-text',x=>x.rows[0].exact_frozen_census_body=''],
 ['invent-binder',x=>x.rows[1].occurrences[0].source_binder_ownership='FORALL_REAL_FORMS'],
 ['drop-dependency',x=>x.rows[1].occurrences[3].dependency_operation_names_in_same_body=[]],
 ['W-L-import',x=>x.gates.W_L_synthesis_authorized=true],
 ['promote-G2',x=>x.gates.G2_G7_authorized=true],
 ['promote-SSC',x=>x.gates.this_packet_G1_qualified=true],
 ['false-cold',x=>x.checks.independent_cold_semantic_reconstruction='PASS'],
 ['wrong-G0-blob',x=>x.frozen_inputs.ssc.git_blob_sha='historical-stale'],
 ['wrong-W01-source',x=>x.source.original_version='arXiv:2104.05099v1'],
 ['wrong-original-line',x=>x.rows[0].occurrences[0].original_author_source.rendered_html_line_range=[149,166]],
 ['wrong-track',x=>x.track='L'],
 ['wrong-count',x=>x.extraction_summary.qualified_bodies_unchanged=41],
 ['false-physics-authority',x=>x.semantic_authority=true],
 ['swap-omega-variation-role',x=>x.rows[0].occurrences[3].source_argument_or_carrier_roles[0]='varied field: e^A'],
 ['erase-curvature-result',x=>x.rows[0].occurrences[2].source_result_role='independent arbitrary curvature'],
 ['flip-hodge-eigen-argument',x=>x.rows[1].occurrences[4].source_argument_or_carrier_roles[2]='Lambda^2_+: eigenvalue -1'],
 ['alter-four-term-output',x=>x.rows[1].occurrences[6].source_result_role='Omega(omega)=Omega_(+,R)+Omega_(-,L)'],
 ['missing-typed-source',x=>x.rows[1].occurrences[2].original_G0_typed_statement_id='MISSING']
];
let denied=0;for(const [label,fn]of mutate){const m=structuredClone(C);fn(m);let rejected=false;try{check(m)}catch{rejected=true}assert.ok(rejected,'hostile mutation escaped '+label);denied++}
console.log('W01 Palatini/Hodge scoped source candidate: positive PASS; G0 2-body/7-typed/13-occurrence reciprocal PASS; local 6-form Hodge involution PASS; hostile '+denied+'/'+mutate.length+' REJECTED; current qualified G1 remains 39/151, NO independent cold qualification');
