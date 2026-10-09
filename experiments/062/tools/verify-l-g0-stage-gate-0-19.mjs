import fs from 'node:fs';import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const P={gate:E+'L_CURRENT_STAGE_GATE_0_19.json',pre:E+'L_CURRENT_STAGE_GATE_0_18.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_19.json',source:L+'LISI_L01_SEVEN_SOURCE_MODALITY_ASSERTIONS_G0_0_1.json',
 spin:L+'LISI_L01_SPIN_REAL_GROUP_ISOMORPHISM_SOURCE_DEFECT_G0_0_1.json',
 visual:L+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json',
 vsource:E+'tools/verify-l-g0-l01-seven-modalities-0-1.mjs',vssc:E+'tools/verify-l-g0-l01-seven-ssc-0-19.mjs',
 vspin:E+'tools/verify-l-g0-l01-spin-real-form-source-0-1.mjs'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const S=get(P.ssc),G=get(P.gate),Previous=get(P.pre),Sp=get(P.spin),Packet=get(P.source),Visual=get(P.visual);
const ids=['L-SSC-028','L-SSC-030','L-SSC-033','L-SSC-039','L-SSC-040','L-SSC-042','L-SSC-043'];
function check(q=G){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)};
 const c=q.current_lawful_state||{},p=q.L01_07_modality_fidelity||{},ci=q.G0_19_CI||{};
 ck(q.schema==='isograph.exp062-l-current-stage-gate.v0.19'&&q.status==='L_G0_SSC_0_19_L01_SEVEN_FROZEN_SOURCE_MODALITIES_CI_PARTIAL_UNFROZEN_G1_G7_FORBIDDEN'&&q.track==='L'&&q.semantic_authority===false&&q.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY','current L G0 routing only');
 ck(q.supersedes?.path===P.pre&&q.supersedes?.git_blob_sha===sha(P.pre)&&Previous.current_lawful_state?.G1_authorized===false,'exact old G0 gate');
 ck(q.current_source_census?.path===P.ssc&&q.current_source_census?.git_blob_sha===sha(P.ssc)&&q.current_source_census?.source_identities===191&&J(q.current_source_census?.changed_from_predecessor)===j(ids)&&q.current_source_census?.unchanged_from_predecessor===184,'current source SSC0.19 parent and conservation');
 ck(q.current_source_census?.frozen===false&&q.current_source_census?.source_complete===false&&S.guards?.source_census_freeze_complete===false&&S.revision?.G1_authorized===false,'source not frozen/qualified');
 ck(p.packet?.path===P.source&&p.packet?.git_blob_sha===sha(P.source)&&p.source_visual_pages?.path===P.visual&&p.source_visual_pages?.git_blob_sha===sha(P.visual),'source and primary visual audit SHA pins');
 ck(p.published_group_discrepancy?.path===P.spin&&p.published_group_discrepancy?.git_blob_sha===sha(P.spin),'real group source counterexample provenance');
 ck(p.source_version==='L01 arXiv:0711.0770v1 (2007-11-06)'&&p.source_visual_pages?.visual_pages===31&&p.source_visual_pages?.all_source_formulas_AST_closed===false,'exact original 2007 frozen source and incomplete AST');
 ck(j(p.source_items_reopened)===j(ids)&&Packet.seven_source_claim_packets?.length===7&&Visual.coverage_count?.complete_source_item_cold_reconstructions===0,'seven source scope vs 0/30 full cold reviews');
 ck(p.source_omega_L==='omega_S−i*omega_T'&&p.source_omega_R==='omega_S+i*omega_T'&&p.omega_reality_not_independent===true,'both source chiral signs exact and roles dependent');
 ck(p.source_false_real_direct_product==='Spin^+(3,1) ≅ SL(2,C) = SL(2,R)×SL(2,R) is FALSE in real Lie group category under centers 2 vs4 and real Killing signatures (3,3) vs (4,2)','source group claim false under correct real category only');
 ck(p.whole_E8_model_mathematical_invalidity_established===false&&p.source_specific_root_coefficient_theorem_proved===false&&p.source_triality_unique_physical_assignment_proved===false&&p.source_L01_30_assertion_core_closure_complete===false,'do not imply all model false or normalized root/triality');
 ck(p.source_action_boundary_term_discarded===true&&Sp.independent_group_center_certificate?.center_order_left===2&&Sp.independent_group_center_certificate?.center_order_right===4,'boundary side condition and separate group center witnesses');
 ck(ci.source_modalities?.id===37870344713&&ci.source_modalities?.head_sha==='03a09d157240bd431dbb794163567039037c9d31'&&ci.source_modalities?.conclusion==='success'&&ci.source_modalities?.adversarial_rejected===22&&ci.source_modalities?.external_review_passed===false,'exact seven source CI');
 ck(ci.source_census?.id===37870574868&&ci.source_census?.head_sha==='e440f849eb6bd95fd23d0d15ce5af18698ac5a99'&&ci.source_census?.conclusion==='success'&&ci.source_census?.unchanged_source_items===184&&ci.source_census?.adversarial_rejected===24&&ci.source_census?.external_review_passed===false,'exact SSC0.19 CI no promotion');
 for(const [field,expected]of [['source_modality_verifier',P.vsource],['source_census_verifier',P.vssc],['source_group_real_spin_verifier',P.vspin]])ck(ci[field]?.path===expected&&ci[field]?.git_blob_sha===sha(expected),'exact verifier/pin '+field);
 ck(ci.source_full_cold_audit_passed===false&&ci.G1_authorized===false&&ci.external_cold_review_passed===false&&ci.source_math_module_promotion===false,'CI not source theorem qualification');
 ck(q.outstanding_source_reconstruction?.some(x=>x.includes('L01')&&x.includes('0/30')),'L01 source completeness counterfactual rejected');
 ck(q.outstanding_source_reconstruction?.some(x=>x.includes('Spin/SL2')),'group source discrepancy is open and preserved');
 ck(q.outstanding_source_reconstruction?.some(x=>x.includes('L05')),'other frozen source audit open');
 ck(q.next_lawful_step?.startsWith('Continue G0')&&q.next_lawful_step?.includes('L02-L06'),'next work only source G0');
 ck(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 source permitted');
 for(const field of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(c[field]===false,'unlawful stage promotion '+field);
 ck(q.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE'&&!j(q).includes('W-SSC-'),'owner waiver not external pass, no W import');
 return errors;
}
const base=check(),errors=[...base],mutants=[
 ['false SSC complete',q=>{q.current_source_census.frozen=true}],
 ['false source complete',q=>{q.current_source_census.source_complete=true}],
 ['promote G1',q=>{q.current_lawful_state.G1_authorized=true}],
 ['promote G7',q=>{q.current_lawful_state.G7_authorized=true}],
 ['promote IA',q=>{q.current_lawful_state.L_recursive_IA_authorized=true}],
 ['promote cross-track',q=>{q.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['promote merge',q=>{q.current_lawful_state.PR70_merge_authorized=true}],
 ['switch to source arxiv v2',q=>{q.L01_07_modality_fidelity.source_version='0711.0770v2'}],
 ['erase minus sign',q=>{q.L01_07_modality_fidelity.source_omega_L='omega_S+i*omega_T'}],
 ['erase plus sign',q=>{q.L01_07_modality_fidelity.source_omega_R='omega_S−i*omega_T'}],
 ['assert chiral independence',q=>{q.L01_07_modality_fidelity.omega_reality_not_independent=false}],
 ['erase real group counterexample',q=>{q.L01_07_modality_fidelity.source_false_real_direct_product='ISOMORPHIC_REAL_GROUPS'}],
 ['refute all E8 via one group',q=>{q.L01_07_modality_fidelity.whole_E8_model_mathematical_invalidity_established=true}],
 ['claim root coefficient theorem',q=>{q.L01_07_modality_fidelity.source_specific_root_coefficient_theorem_proved=true}],
 ['hide BF boundary condition',q=>{q.L01_07_modality_fidelity.source_action_boundary_term_discarded=false}],
 ['wrong 184 other records count',q=>{q.current_source_census.unchanged_from_predecessor=180}],
 ['drop source ID',q=>{q.L01_07_modality_fidelity.source_items_reopened.pop()}],
 ['alter SSC sha',q=>{q.current_source_census.git_blob_sha='bad'}],
 ['alter source verifier sha',q=>{q.G0_19_CI.source_modality_verifier.git_blob_sha='bad'}],
 ['alter real source sha',q=>{q.L01_07_modality_fidelity.published_group_discrepancy.git_blob_sha='bad'}],
 ['fabricate external review',q=>{q.G0_19_CI.external_cold_review_passed=true}],
 ['erase L01 0/30 incompleteness',q=>{q.outstanding_source_reconstruction=q.outstanding_source_reconstruction.filter(s=>!s.includes('0/30'))}],
 ['smuggle W source',q=>{q.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;if(!base.length)for(const [n,mutate]of mutants){const x=cp(G),prior=j(x);mutate(x);if(j(x)===prior)errors.push('NOOP '+n);else if(check(x).length===0)errors.push('ESCAPED '+n);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage019-l01-seven.v0.1',pass:errors.length===0,errors,current_source_count:191,source_changed:7,source_unchanged:184,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',G1_to_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
