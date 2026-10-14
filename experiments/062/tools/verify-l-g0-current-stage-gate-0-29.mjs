import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={gate:E+'L_CURRENT_STAGE_GATE_0_29.json',previous:E+'L_CURRENT_STAGE_GATE_0_28.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_29.json',source:L+'LISI_L01_H1_EW_PURE_BIVECTOR_SOURCE_G0_0_1.json',
 sourceVerifier:E+'tools/verify-l-g0-l01-h1-ew-pure-bivector-0-1.mjs',
 sscVerifier:E+'tools/verify-l-g0-l032-ssc-source-0-29.mjs',
 failed:E+'L032_SSC029_SOURCE_REVISION_AND_TOKEN_VERIFIER_BASELINE_DEFECT_0_1.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=get(paths.gate),P=get(paths.previous),S=get(paths.ssc),F=get(paths.source),Fail=get(paths.failed);
function verify(g=G){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)};
 const c=g.current_lawful_state||{},packet=g.L032_H1_EW_source_G0_packet||{},ci=g.G0_29_CI||{},f=F.finite_evidence||{},limits=F.reconstruction_limits||{};
 ok(g.schema==='isograph.exp062-l-current-stage-gate.v0.29'&&g.track==='L'&&g.status==='L_G0_SSC_0_29_L032_SIX_PRIMED_EW_SOURCE_BIVECTORS_AND_120_SOURCE_BRACKETS_CI_UNFROZEN_G1_G7_FORBIDDEN'&&g.semantic_authority===false,'G0 v0.29 source-only stage');
 ok(g.supersedes?.path===paths.previous&&g.supersedes?.git_blob_sha===sha(paths.previous)&&P.current_lawful_state?.G1_authorized===false,'exact previous G0 parent');
 ok(g.current_source_census?.path===paths.ssc&&g.current_source_census?.git_blob_sha===sha(paths.ssc)&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&j(g.current_source_census?.changed_from_predecessor)===j(['L-SSC-032']),'191 ID and 190 exact preceding source items');
 ok(g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false&&S.guards?.source_census_freeze_complete===false,'never current G0 freeze');
 ok(packet.path===paths.source&&packet.git_blob_sha===sha(paths.source)&&packet.source==='Frozen L01 arXiv:0711.0770v1 printed §2.2.2 p10 and §2.2.3 p12','source packet SHA, version and printed pages');
 ok(F.frozen_source?.revision==='arXiv:0711.0770v1 2007-11-06'&&F.frozen_source?.printed_pages?.length===2,'independent source PDF exact version');
 for(const [key,val] of Object.entries({original_source_pure_primed_pairs:6,native_vs_printed_W_B1_chiral_source_coefficient_differences:0,
 all_source_primed_EW_mixed_bracket_covariance_cases:96,all_source_pure_EW_brackets:15,all_source_gravity_EW_commuting_pairs:36,
 source_mixed_mixed_brackets_total:120,source_gravity_output_bracket_failures:24,source_primed_output_bracket_failures_now_source_typed:24,source_timelike_eta44_negative_controls:6}))ok(packet[key]===val,'precise printed EW source scope '+key);
 for(const key of ['source_Wplus_B1plus_full_scalar_normalization_closed','source_full_one_form_curvature_closed','source_physical_theory_error_ownership_known','primitive_schema_closure_qualified'])ok(packet[key]===false,'no source-global promotion '+key);
 ok(packet.source_relative_negative_i_only_project_diagnostic===true,'-i relative factor NOT source-authorized');
 ok(f.source_primed_bivector_pairs===6&&f.each_coefficient_case_tested===64&&f.native_vs_printed_complex_matrix_entry_mismatches===0&&f.all_source_mixed_bracket_pairs===120&&f.source_mixed_mixed_nonzero_pairs===48,'source coefficient finite cases');
 ok(f.gravity_target_24_sign_changed===24&&f.ew_target_24_sign_changed===24&&f.disjoint_72_zero===72&&f.phase_factor_project_diagnostic_only===true,'exact ± phase source-controlled distinction');
 for(const k of ['source_full_graded_curvature_reconstructed','source_published_Wplus_Bplus_scalar_normalizations_independently_reconstructed','source_source_authorized_relative_i_repair_found','source_complete_G0','author_paper_physical_theory_disproved','cross_track_source_used'])ok(limits[k]===false,'source packet negative boundary '+k);
 ok(ci.EW_source?.run_id===37897875620&&ci.EW_source?.conclusion==='success'&&ci.EW_source?.pure_EW_pairs===6&&ci.EW_source?.mixed_brackets===120&&ci.EW_source?.adversarial_defined===20&&ci.EW_source?.adversarial_rejected===20&&ci.EW_source?.external_cold_review_passed===false,'source CI scoped and internal');
 ok(ci.SSC?.run_id===37898244250&&ci.SSC?.conclusion==='success'&&ci.SSC?.source_items===191&&ci.SSC?.unchanged_items===190&&ci.SSC?.adversarial_defined===23&&ci.SSC?.adversarial_rejected===23&&ci.SSC?.external_cold_review_passed===false,'source conservation CI scoped and internal');
 ok(ci.EW_source_verifier?.path===paths.sourceVerifier&&ci.EW_source_verifier?.git_blob_sha===sha(paths.sourceVerifier),'exact source verifier pin');
 ok(ci.SSC_verifier?.path===paths.sscVerifier&&ci.SSC_verifier?.git_blob_sha===sha(paths.sscVerifier),'exact SSC verifier pin');
 ok(ci.SSC_failed_baseline?.path===paths.failed&&ci.SSC_failed_baseline?.git_blob_sha===sha(paths.failed)&&ci.SSC_failed_baseline?.run_id===37898129132&&ci.SSC_failed_baseline?.mutants_executed===0&&Fail.run?.mutation_executed===0,'failed baseline never counted as mutation PASS');
 ok(g.historical_failures?.some(x=>x.run_id===37898129132&&x.status==='failed'),'failed run remains negative evidence');
 ok(ci.G1_authorized===false&&ci.source_cold_complete===false&&ci.mathematical_theory_qualified===false&&ci.external_review_passed===false,'passing internal CI not source mathematical proof');
 ok(g.outstanding_source_reconstruction?.some(x=>x.includes('120 coefficient pairs')&&x.includes('OPEN'))&&g.outstanding_source_reconstruction?.some(x=>x.includes('L05')),'open source scope and published O discrepancy preserved');
 ok(g.next_lawful_step?.startsWith('Stay L-only G0: examine original L01 §3 graded curvature')&&g.next_lawful_step?.includes('original ordinary octonionic negatives'),'next source-local dependency stage');
 ok(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 only allowed');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ok(c[k]===false,'G0 downstream remains forbidden '+k);
 ok(F.G1_authorized===false&&S.guards?.L032_H1_source_full_graded_curvature_theorem_qualified===false,'source typed finite output not field-curvature qualifier');
 ok(g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner waives external CALL only');
 ok(!j(g).includes('W-SSC-'),'track W semantic firewall');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['promote source G1',x=>{x.current_lawful_state.G1_authorized=true}],
 ['promote G7',x=>{x.current_lawful_state.G7_authorized=true}],
 ['promote IA',x=>{x.current_lawful_state.L_recursive_IA_authorized=true}],
 ['promote cross-track',x=>{x.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['permit merge',x=>{x.current_lawful_state.PR70_merge_authorized=true}],
 ['freeze source',x=>{x.current_source_census.frozen=true}],
 ['declare complete G0',x=>{x.current_source_census.source_complete=true}],
 ['fake EW basis evidence',x=>{x.L032_H1_EW_source_G0_packet.native_vs_printed_W_B1_chiral_source_coefficient_differences=6}],
 ['erase six EW generators',x=>{x.L032_H1_EW_source_G0_packet.original_source_pure_primed_pairs=5}],
 ['overclaim curvature',x=>{x.L032_H1_EW_source_G0_packet.source_full_one_form_curvature_closed=true}],
 ['overclaim global scalar normalization',x=>{x.L032_H1_EW_source_G0_packet.source_Wplus_B1plus_full_scalar_normalization_closed=true}],
 ['assume author physical error',x=>{x.L032_H1_EW_source_G0_packet.source_physical_theory_error_ownership_known=true}],
 ['pretend relative i is source',x=>{x.L032_H1_EW_source_G0_packet.source_relative_negative_i_only_project_diagnostic=false}],
 ['erase primed 24',x=>{x.L032_H1_EW_source_G0_packet.source_primed_output_bracket_failures_now_source_typed=0}],
 ['erase timelike controls',x=>{x.L032_H1_EW_source_G0_packet.source_timelike_eta44_negative_controls=0}],
 ['change frozen source edition',x=>{x.L032_H1_EW_source_G0_packet.source='L01 updated arxiv v2'}],
 ['stale source packet blob',x=>{x.L032_H1_EW_source_G0_packet.git_blob_sha='stale'}],
 ['stale SSC blob',x=>{x.current_source_census.git_blob_sha='stale'}],
 ['erase CI verifier pin',x=>{x.G0_29_CI.EW_source_verifier.git_blob_sha='stale'}],
 ['fake external pass',x=>{x.G0_29_CI.EW_source.external_cold_review_passed=true}],
 ['erase source failed baseline',x=>{x.G0_29_CI.SSC_failed_baseline.mutants_executed=23}],
 ['silence source uncertainty',x=>{x.next_lawful_step='G1 authorized'}],
 ['import W meaning',x=>{x.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const g=cp(G),before=j(g);fn(g);if(j(g)===before)errors.push('NO-OP '+name);else if(verify(g).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage029-source-guard.v0.1',pass:!errors.length,errors,source_items:191,only_source_item_revised:'L-SSC-032',source_ew_bivectors:6,mixed_operator_pairs:120,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',source_census_frozen:false,G1_to_G7_authorized:false,external_semantic_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
