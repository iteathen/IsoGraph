import fs from 'node:fs';import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const p={
 gate:E+'L_CURRENT_STAGE_GATE_0_26.json',old:E+'L_CURRENT_STAGE_GATE_0_25.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_26.json',source:L+'LISI_L01_H1_MIXED_TRACE_SQUARE_SIMILARITY_OBSTRUCTION_G0_0_1.json',
 verifier:E+'tools/verify-l-g0-l01-h1-mixed-trace-square-0-1.mjs',sscVerifier:E+'tools/verify-l-g0-l032-ssc-source-0-26.mjs',
 failed:E+'L032_SSC026_VERIFIER_SOURCE_NATIVE_TOKEN_BASELINE_DEFECT_0_1.json'};
const load=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Gate=load(p.gate),Old=load(p.old),SSC=load(p.ssc),Packet=load(p.source),Def=load(p.failed);
function verify(g=Gate){
 const errors=[],ck=(v,n)=>{if(!v)errors.push(n)},st=g.current_lawful_state||{},src=g.L032_H1_trace_square_source_G0||{},ci=g.G0_26_CI||{};
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.26'&&g.track==='L'&&g.semantic_authority===false&&g.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY'&&g.status.includes('G0')&&g.status.includes('UNFROZEN'),'G0 only current L source routing');
 ck(g.supersedes?.path===p.old&&g.supersedes?.git_blob_sha===sha(p.old),'precise prior procedural gate hash');
 ck(g.current_source_census?.path===p.ssc&&g.current_source_census?.git_blob_sha===sha(p.ssc)&&g.current_source_census?.source_identities===191,'current SSC0.26 content hash');
 ck(j(g.current_source_census?.changed_from_predecessor)===j(['L-SSC-032'])&&g.current_source_census?.unchanged_from_predecessor===190&&g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false,'191 stable source IDs and no completion claim');
 ck(SSC.items?.length===191&&SSC.guards?.source_census_freeze_complete===false&&SSC.guards?.L032_H1_fixed_complex_similarity_alone_cannot_reconcile_coefficients===true,'SSC exact negative mathematical result under G0');
 ck(src.packet?.path===p.source&&src.packet?.git_blob_sha===sha(p.source)&&src.source?.includes('arXiv:0711.0770v1')&&src.exact_e_phi_source_role?.includes('ONE_FORM'),'exact frozen L01 packet provenance and field roles');
 ck(src.native_16x16_to_8x8_first_quadrant_source_operators===16&&src.source_mixed_coefficient_matrix_cells===1024&&src.native_printed_discrepant_cells===128&&src.all_16_trace_squares_opposite===true,'source exact 16 pair invariant');
 ck(src.explicit_first_witness==='X_11^2=-I8, tr(X_11^2)=-8; P_11^2=+I8, tr(P_11^2)=+8'&&src.complex_constant_similarity_only_reconciliation===false,'basis-independent trace-square difference');
 for(const key of ['implicit_source_coefficient_redefinition_authorized','author_intent_or_published_error_certified','source_field_coefficients_modified','full_original_H1_chiral_basis_or_field_dynamics_qualified'])ck(src[key]===false,'no unauthorized source domain repair '+key);
 ck(src.no_W_source_input===true,'L source independence');
 ck(ci.phase_diagnostic?.id===37892025204&&ci.phase_diagnostic?.adversarial_rejected===21&&ci.phase_diagnostic?.conclusion==='success'&&ci.phase_diagnostic?.external_review_passed===false,'prior source diag exact CI');
 ck(ci.trace_square?.id===37892401781&&ci.trace_square?.adversarial_rejected===26&&ci.trace_square?.conclusion==='success'&&ci.trace_square?.external_review_passed===false,'source invariant CI exact');
 ck(ci.SSC_0_26?.id===37892737318&&ci.SSC_0_26?.adversarial_rejected===22&&ci.SSC_0_26?.source_items===191&&ci.SSC_0_26?.unchanged_items===190&&ci.SSC_0_26?.external_review_passed===false,'SSC0.26 exact source conservation CI');
 ck(ci.math_verifier?.path===p.verifier&&ci.math_verifier?.git_blob_sha===sha(p.verifier),'math verifier exact source byte pin');
 ck(ci.source_SSC_verifier?.path===p.sscVerifier&&ci.source_SSC_verifier?.git_blob_sha===sha(p.sscVerifier),'SSC verifier exact source byte pin');
 ck(ci.failed_SSC_baseline?.path===p.failed&&ci.failed_SSC_baseline?.git_blob_sha===sha(p.failed)&&ci.failed_SSC_baseline?.id===37892651742&&ci.failed_SSC_baseline?.mutations_executed===0,'historical failed CI is negative evidence not PASS');
 ck(Def.failed_CI?.run_id===37892651742&&Def.failed_CI?.ssc_error?.includes('source native'),'failed wording fixture true negative');
 for(const key of ['external_semantic_cold_review_passed','semantic_Cl71_D4_or_H1_equivalence_qualified','source_census_frozen','G1_authorized'])ck(ci[key]===false,'passing internal CI not semantic promotion '+key);
 ck(g.outstanding_source_reconstruction?.some(s=>s.includes('OPPOSITE trace-square')&&s.includes('UNRESOLVED')===false&&s.includes('unadjudicated')),'remaining source normalization and coefficient interpretation fully visible');
 ck(g.outstanding_source_reconstruction?.some(s=>s.includes('L05')&&s.includes('Eq(1)')),'original L05 negative source retained');
 ck(g.next_lawful_step?.startsWith('Remain at G0')&&g.next_lawful_step?.includes('source-asserted i scalar')&&g.next_lawful_step?.includes('L01–L06'),'source-first no guessed repair');
 ck(st.G0_source_audit_authorized===true&&st.G0_source_local_CI_verified===true,'G0 source research permitted');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(st[k]===false,'no stage permission '+k);
 ck(Old.current_lawful_state?.G1_authorized===false&&Packet.source_pauli_analytic_first_witness.basis_only_similarity_possible===false,'old and new exact downstream boundary');
 ck(!j(g).includes('W-SSC-'),'anti W source import');
 return errors;
}
const baseline=verify(),errors=[...baseline],muts=[
 ['fake G0 source freeze',g=>{g.current_source_census.frozen=true}],
 ['fake source completeness',g=>{g.current_source_census.source_complete=true}],
 ['G1 unauthorized',g=>{g.current_lawful_state.G1_authorized=true}],
 ['G3 unauthorized',g=>{g.current_lawful_state.G3_authorized=true}],
 ['G7 unauthorized',g=>{g.current_lawful_state.G7_authorized=true}],
 ['IA unauthorized',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ['cross track unauthorized',g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['merge unauthorized',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ['source theorem falsely true',g=>{g.L032_H1_trace_square_source_G0.full_original_H1_chiral_basis_or_field_dynamics_qualified=true}],
 ['author blame fabricated',g=>{g.L032_H1_trace_square_source_G0.author_intent_or_published_error_certified=true}],
 ['coefficient repaired silently',g=>{g.L032_H1_trace_square_source_G0.implicit_source_coefficient_redefinition_authorized=true}],
 ['allow basis-only similarity',g=>{g.L032_H1_trace_square_source_G0.complex_constant_similarity_only_reconciliation=true}],
 ['erase first witness',g=>{g.L032_H1_trace_square_source_G0.explicit_first_witness='none'}],
 ['change 16 pairs to 15',g=>{g.L032_H1_trace_square_source_G0.native_16x16_to_8x8_first_quadrant_source_operators=15}],
 ['erase source-candidate difference',g=>{g.L032_H1_trace_square_source_G0.native_printed_discrepant_cells=0}],
 ['change source revision',g=>{g.L032_H1_trace_square_source_G0.source='arxiv v2'}],
 ['stale source math SHA',g=>{g.L032_H1_trace_square_source_G0.packet.git_blob_sha='STALE'}],
 ['stale source SSC SHA',g=>{g.current_source_census.git_blob_sha='STALE'}],
 ['stale verifier SHA',g=>{g.G0_26_CI.math_verifier.git_blob_sha='STALE'}],
 ['forge CI external review',g=>{g.G0_26_CI.trace_square.external_review_passed=true}],
 ['erase failed CI',g=>{delete g.G0_26_CI.failed_SSC_baseline}],
 ['change source target to W',g=>{g.next_lawful_step+=' W-SSC-101'}]
];
let rejects=0;
if(!baseline.length)for(const [name,fn]of muts){const x=copy(Gate),before=j(x);fn(x);if(j(x)===before)errors.push('NO-OP '+name);else if(verify(x).length===0)errors.push('ESCAPED '+name);else rejects++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage026-H1-mixed-traces.v0.1',pass:!errors.length,errors,source_items:191,source_changed:'L-SSC-032',source_unchanged:190,source_pairs:16,
 adversarial_defined:muts.length,adversarial_rejected:rejects,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILURE':'TESTED',author_error_qualified:false,G1_to_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
