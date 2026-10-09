import fs from 'node:fs';import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const paths={gate:E+'L_CURRENT_STAGE_GATE_0_25.json',old:E+'L_CURRENT_STAGE_GATE_0_24.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_25.json',packet:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
sourceVerifier:E+'tools/verify-l-g0-l01-h1-positive-chiral-blocks-0-1.mjs',sscVerifier:E+'tools/verify-l-g0-l032-ssc-source-0-25.mjs',
defect:E+'L032_H1_SPIN_COEFFICIENT_VS_MATRIX_CONJUGATION_FIDELITY_DEFECT_0_1.json',
failedChecker:E+'L032_H1_VERIFIER_SCALAR_CASE_BASELINE_DEFECT_0_1.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=get(paths.gate),prev=get(paths.old),S=get(paths.ssc),P=get(paths.packet);
function verify(g=G){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)},x=g.L032_H1_positive_chiral_source||{},c=g.current_source_census||{},q=g.G0_25_CI||{},l=g.current_lawful_state||{};
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.25'&&g.track==='L'&&g.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY'&&g.semantic_authority===false,'L source G0 procedural not semantic authority');
 ck(g.status==='L_G0_SSC_0_25_L01_H1_POSITIVE_CHIRAL_SOURCE_BLOCK_FINITE_UNFROZEN_G1_G7_FORBIDDEN','G0 0.25 current source scope');
 ck(g.supersedes?.path===paths.old&&g.supersedes?.git_blob_sha===sha(paths.old)&&prev.current_lawful_state?.G1_authorized===false,'exact previous source gate and stage');
 ck(c.path===paths.ssc&&c.git_blob_sha===sha(paths.ssc)&&c.source_identities===191&&j(c.changed_from_predecessor)===j(['L-SSC-032'])&&c.unchanged_from_predecessor===190&&c.frozen===false&&c.source_complete===false,'source SSC0.25 191 IDs 190 unchanged');
 ck(S.items?.length===191&&S.guards.source_census_freeze_complete===false&&S.revision.source_math_clifford_16_to_8_qualification===false,'G0 source not mathematically qualified');
 ck(x.path===paths.packet&&x.git_blob_sha===sha(paths.packet)&&x.frozen_source==='L01 arXiv:0711.0770v1 §2.2.3 Eq.(2.10), printed page12 / zero-based PDF page12','exact frozen original paper and source packet bytes');
 for(const [name,num]of Object.entries({source_4x4_printed_block_rows:4,source_2x2_spinor_operator_cells:16,source_full_positive_chiral_matrix_size:8,mixed_graviweak_ephi_2x2_cells:8,diag_gravity_omega_Cartan_cells:4,offdiag_gauge_W_B1_cells:4,real_frame_four_component_tuples:81,real_Higgs_four_scalar_tuples:81,source_frame_Higgs_tuple_pairs:6561,exact_signed_source_mixed_matrix_cells:209952}))
 ck(x[name]===num,'exact finite source geometry count '+name);
 for(const name of ['original_frame_e_one_form_and_Higgs_phi_real_scalar_separate','original_e_R_upper_vs_e_L_lower_distinct','omega_R_tau_equal_conj_omega_L_tau_only_real_coefficients'])ck(x[name]===true,'source field/coefficient typing '+name);
 for(const name of ['omega_R_full_matrix_elementwise_conjugation_asserted','complete_16x16_source_gamma_to_8x8_printed_basis_transport','complete_gravity_EW_dynamics_theorem','full_L01_L06_source_census_complete','G1_authorized'])ck(x[name]===false,'unknown source representation and math not promoted '+name);
 ck(P.source_complete===false&&P.source_chiral_embedding?.source_2x2_block_action_proved_from_16x16_gamma_basis===false&&P.source_chiral_embedding?.spinor_input_column?.length===4,'source packet chiral row/column basis not claimed proven');
 ck(q.H1_source?.id===37886866737&&q.H1_source?.head_sha==='c1d36b6fd649370e72519c62dc3736ea3c08c6a1'&&q.H1_source?.conclusion==='success'&&q.H1_source?.adversarial_defined===34&&q.H1_source?.adversarial_rejected===34&&q.H1_source?.external_cold_review_passed===false,'positive source-only CI scope');
 ck(q.SSC_0_25?.id===37887131691&&q.SSC_0_25?.conclusion==='success'&&q.SSC_0_25?.source_items===191&&q.SSC_0_25?.unchanged_items===190&&q.SSC_0_25?.adversarial_defined===22&&q.SSC_0_25?.adversarial_rejected===22&&q.SSC_0_25?.external_cold_review_passed===false,'source SSC CI exact limited scope');
 for(const [name,path]of[['source_verifier',paths.sourceVerifier],['SSC_verifier',paths.sscVerifier],['source_conjugation_defect',paths.defect],['failed_source_verifier',paths.failedChecker]])ck(q[name]?.path===path&&q[name]?.git_blob_sha===sha(path),'exact checker and defect provenance '+name);
 ck(q.failed_source_verifier?.id===37886785922&&q.failed_source_verifier?.adversarial_mutants_executed===0,'no mutation test credited to prior failed CI');
 ck(q.full_source_corpus_closed===false&&q.source_census_frozen===false&&q.full_mathematical_equivalence_qualified===false&&q.G1_authorized===false,'passing CI cannot promote authority');
 ck(g.outstanding_source_reconstruction?.some(z=>z.includes('16x16 Clifford')&&z.includes('OPEN'))&&g.outstanding_source_reconstruction?.some(z=>z.includes('coefficient')&&z.includes('NOT')),'preserve exact unresolved source basis and omega conjugation');
 ck(g.outstanding_source_reconstruction?.some(z=>z.includes('L01')&&z.includes('L06')),'remaining full source census retained');
 ck(g.next_lawful_step?.startsWith('Continue independent L-only G0')&&g.next_lawful_step?.includes('16x16')&&g.next_lawful_step?.includes('8x8'),'stay at earliest source boundary');
 ck(l.G0_source_audit_authorized===true&&l.G0_source_local_CI_verified===true,'G0 source audit allowed');
 for(const name of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(l[name]===false,'no stage bypass '+name);
 ck(g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','external review waived NOT passed');
 ck(!j(g).includes('W-SSC-'),'W source firewall');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['G0 freeze',z=>{z.current_source_census.frozen=true}],
 ['G1 promote',z=>{z.current_lawful_state.G1_authorized=true}],
 ['G3 promote',z=>{z.current_lawful_state.G3_authorized=true}],
 ['G7 promote',z=>{z.current_lawful_state.G7_authorized=true}],
 ['IA promote',z=>{z.current_lawful_state.L_recursive_IA_authorized=true}],
 ['W/L promote',z=>{z.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['PR merge',z=>{z.current_lawful_state.PR70_merge_authorized=true}],
 ['full H1 Clifford equality',z=>{z.L032_H1_positive_chiral_source.complete_16x16_source_gamma_to_8x8_printed_basis_transport=true}],
 ['full gravitational dynamics',z=>{z.L032_H1_positive_chiral_source.complete_gravity_EW_dynamics_theorem=true}],
 ['matrix instead of coefficient star',z=>{z.L032_H1_positive_chiral_source.omega_R_full_matrix_elementwise_conjugation_asserted=true}],
 ['frame e treated scalar',z=>{z.L032_H1_positive_chiral_source.original_frame_e_one_form_and_Higgs_phi_real_scalar_separate=false}],
 ['mixed eR eL equal',z=>{z.L032_H1_positive_chiral_source.original_e_R_upper_vs_e_L_lower_distinct=false}],
 ['fake 4x4 scalar action',z=>{z.L032_H1_positive_chiral_source.source_full_positive_chiral_matrix_size=4}],
 ['invent extra mixed source cell',z=>{z.L032_H1_positive_chiral_source.mixed_graviweak_ephi_2x2_cells=9}],
 ['wrong source arxiv version',z=>{z.L032_H1_positive_chiral_source.frozen_source='arXiv 0711.0770v2'}],
 ['wrong current SSC pin',z=>{z.current_source_census.git_blob_sha='WRONG'}],
 ['wrong packet pin',z=>{z.L032_H1_positive_chiral_source.git_blob_sha='WRONG'}],
 ['wrong source verifier pin',z=>{z.G0_25_CI.source_verifier.git_blob_sha='WRONG'}],
 ['wrong SSC verifier pin',z=>{z.G0_25_CI.SSC_verifier.git_blob_sha='WRONG'}],
 ['false external review',z=>{z.G0_25_CI.H1_source.external_cold_review_passed=true}],
 ['erase source correction defect',z=>{delete z.G0_25_CI.source_conjugation_defect}],
 ['erase failed baseline',z=>{z.G0_25_CI.failed_source_verifier.adversarial_mutants_executed=34}],
 ['fake 190 conservation',z=>{z.current_source_census.unchanged_from_predecessor=189}],
 ['W import',z=>{z.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const z=copy(G),prev=j(z);fn(z);if(j(z)===prev)errors.push('NOOP '+name);else if(verify(z).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage025-H1-source.v0.1',pass:errors.length===0,errors:errors.slice(0,28),source_items:191,changed:['L-SSC-032'],unchanged:190,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_to_G7_authorized:false,mathematical_16x16_to_8x8_basis_proven:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
