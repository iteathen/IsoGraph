import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={gate:E+'L_CURRENT_STAGE_GATE_0_20.json',old:E+'L_CURRENT_STAGE_GATE_0_19.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_20.json',packet:L+'LISI_L01_EQ2_8_CHIRAL_SOURCE_FINITE_G0_0_1.json',
 sourceVerifier:E+'tools/verify-l-g0-l01-eq2-8-chiral-source-0-1.mjs',
 sscVerifier:E+'tools/verify-l-g0-l01-chiral-ssc-0-20.mjs'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),J=JSON.stringify,cp=x=>JSON.parse(J(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const g=get(P.gate),old=get(P.old),SSC=get(P.ssc),packet=get(P.packet);
function check(z=g){
 const errors=[],ck=(v,msg)=>{if(!v)errors.push(msg)},s=z.current_lawful_state||{},d=z.L01_Eq2_8_finite_G0_source||{},CI=z.G0_20_CI||{};
 ck(z.schema==='isograph.exp062-l-current-stage-gate.v0.20'&&z.status==='L_G0_SSC_0_20_L01_EQ2_8_FINITE_CLIFFORD_CHIRAL_CI_PARTIAL_UNFROZEN_G1_G7_FORBIDDEN'&&z.track==='L'&&z.semantic_authority===false&&z.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY','current L G0 procedural non-semantic gate');
 ck(z.supersedes?.path===P.old&&z.supersedes?.git_blob_sha===sha(P.old)&&old.current_lawful_state.G1_authorized===false,'previous exact G0 gate');
 ck(z.current_source_census?.path===P.ssc&&z.current_source_census?.git_blob_sha===sha(P.ssc)&&z.current_source_census?.source_identities===191&&J(z.current_source_census?.changed_from_predecessor)===J(['L-SSC-030'])&&z.current_source_census?.unchanged_from_predecessor===190,'exact 191 SSC0.20/190 conserved source records');
 ck(z.current_source_census?.frozen===false&&z.current_source_census?.source_complete===false&&SSC.guards?.source_census_freeze_complete===false&&SSC.revision?.G1_authorized===false,'source not complete and G1 forbidden');
 ck(d.packet?.path===P.packet&&d.packet?.git_blob_sha===sha(P.packet)&&d.primary_source==='L01 arXiv:0711.0770v1 (2007-11-06) §2.2.1 Eq2.8','original L01 exact revised frozen source');
 ck(d.Cl31_ordered_gamma_pairs===16&&d.source_gamma_bivectors===6&&d.real_antisymmetric_source_coefficient_tuples===729&&d.source_full_4x4_cells===11664&&d.computed_discrepancies===0,'mathematical finite source cases/cells faithfully bounded');
 ck(d.source_chiral_omega_signs_opposite===true&&d.source_reality_guard_six_real_coefficients===true&&d.complex_coefficient_extension_not_admissible===true,'source left/right complex sign and REAL domain no evasion');
 ck(d.source_paper_unmodified===true&&d.full_Clifford_or_Lie_theorem_qualified===false&&d.real_group_SL2C_SL2R_direct_product_source_mathematical_discrepancy_preserved===true&&d.full_L01_30_source_item_ast_cold_review_complete===false,'no source repair or theorem promotion');
 ck(CI.Eq2_8_finite?.id===37871145207&&CI.Eq2_8_finite?.conclusion==='success'&&CI.Eq2_8_finite?.head_sha==='eec22ef9c2900d004a5851547289b73580f132c4'&&CI.Eq2_8_finite?.adversarial_rejected===25&&CI.Eq2_8_finite?.external_cold_review_passed===false,'finite Eq2.8 CI exact');
 ck(CI.SSC0_20?.id===37871318015&&CI.SSC0_20?.conclusion==='success'&&CI.SSC0_20?.head_sha==='6eda3d69ebd4916e4f3206139f2370992d0456f8'&&CI.SSC0_20?.unchanged_source_items===190&&CI.SSC0_20?.adversarial_rejected===23&&CI.SSC0_20?.external_cold_review_passed===false,'source census CI exact');
 ck(CI.source_verifier?.path===P.sourceVerifier&&CI.source_verifier?.git_blob_sha===sha(P.sourceVerifier)&&CI.ssc_verifier?.path===P.sscVerifier&&CI.ssc_verifier?.git_blob_sha===sha(P.sscVerifier),'pinned exact deterministic verifiers');
 ck(CI.G0_source_census_complete===false&&CI.G1_authorized===false&&CI.global_module_qualified===false&&CI.external_review_passed===false,'no CI pass as semantic promotion');
 ck(packet.matrix_role?.six_source_coefficients?.includes('6 free real components')&&packet.full_L01_ASTS_compiled===false&&packet.G1_authorized===false&&SSC.guards.L01_complete_source_reconstruction===false,'finite real source not entire 31-page AST');
 ck(z.outstanding_source_reconstruction?.some(t=>t.includes('L01')&&t.includes('NO complete 30-obligation')),'L01 source mathematical scope deficit still visible');
 ck(z.outstanding_source_reconstruction?.some(t=>t.includes('SL(2,C)')&&t.includes('false')),'distinct printed group false claim retained');
 ck(z.outstanding_source_reconstruction?.some(t=>t.includes('L05')),'source L05 and remaining corpus open');
 ck(z.next_lawful_step?.startsWith('Continue L-only')&&z.next_lawful_step?.includes('L05 lowered Γ'),'only lawful direct source G0 activity');
 ck(s.G0_source_audit_authorized===true&&s.G0_source_local_CI_verified===true,'G0 source can continue');
 for(const field of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(s[field]===false,'unlawful stage promotion '+field);
 ck(z.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE'&&!J(z).includes('W-SSC-'),'owner bypass only external and W source firewall');
 return errors;
}
const base=check(),errors=[...base],mutants=[
 ['promote G0 frozen',x=>{x.current_source_census.frozen=true}],
 ['fake L01 complete',x=>{x.L01_Eq2_8_finite_G0_source.full_L01_30_source_item_ast_cold_review_complete=true}],
 ['authorize G1',x=>{x.current_lawful_state.G1_authorized=true}],
 ['authorize G7',x=>{x.current_lawful_state.G7_authorized=true}],
 ['authorize Recursive IA',x=>{x.current_lawful_state.L_recursive_IA_authorized=true}],
 ['authorize cross-track',x=>{x.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['authorize merge',x=>{x.current_lawful_state.PR70_merge_authorized=true}],
 ['alter exact SSC pin',x=>{x.current_source_census.git_blob_sha='bad'}],
 ['alter packet source pin',x=>{x.L01_Eq2_8_finite_G0_source.packet.git_blob_sha='bad'}],
 ['alter gamma pairs',x=>{x.L01_Eq2_8_finite_G0_source.Cl31_ordered_gamma_pairs=15}],
 ['alter six basis count',x=>{x.L01_Eq2_8_finite_G0_source.source_gamma_bivectors=7}],
 ['alter source 729 cases',x=>{x.L01_Eq2_8_finite_G0_source.real_antisymmetric_source_coefficient_tuples=728}],
 ['hide finite discrepancy',x=>{x.L01_Eq2_8_finite_G0_source.computed_discrepancies=1}],
 ['flip L/R source relative sign',x=>{x.L01_Eq2_8_finite_G0_source.source_chiral_omega_signs_opposite=false}],
 ['admit complex coefficient extension',x=>{x.L01_Eq2_8_finite_G0_source.complex_coefficient_extension_not_admissible=false}],
 ['erase printed real group contradiction',x=>{x.L01_Eq2_8_finite_G0_source.real_group_SL2C_SL2R_direct_product_source_mathematical_discrepancy_preserved=false}],
 ['promote whole Clifford theorem',x=>{x.L01_Eq2_8_finite_G0_source.full_Clifford_or_Lie_theorem_qualified=true}],
 ['fake 190 unchanged',x=>{x.current_source_census.unchanged_from_predecessor=0}],
 ['wrong Eq2.8 source revision',x=>{x.L01_Eq2_8_finite_G0_source.primary_source='arXiv v2'}],
 ['erase incomplete 30 assertion',x=>{x.outstanding_source_reconstruction=x.outstanding_source_reconstruction.filter(t=>!t.includes('NO complete 30-obligation'))}],
 ['fabricate external review',x=>{x.G0_20_CI.external_review_passed=true}],
 ['tamper source CI SHA',x=>{x.G0_20_CI.source_verifier.git_blob_sha='bad'}],
 ['smuggle W source',x=>{x.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;if(!base.length)for(const [name,fn]of mutants){const x=cp(g),before=J(x);fn(x);if(J(x)===before)errors.push('NOOP '+name);else if(check(x).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage020-source-finite.v0.1',pass:errors.length===0,errors,source_ids:191,source_revised:'L-SSC-030',source_unchanged:190,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',G1_to_G7_authorized:false,external_cold_review_passed:false},null,2));if(errors.length)process.exitCode=1;
