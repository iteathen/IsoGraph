import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={gate:E+'L_CURRENT_STAGE_GATE_0_28.json',previous:E+'L_CURRENT_STAGE_GATE_0_27.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_28.json',
 packet:L+'LISI_L01_H1_PURE_GRAVITY_AND_ALL_MIXED_BRACKET_SOURCE_G0_0_1.json',
 verifier:E+'tools/verify-l-g0-l01-h1-pure-gravity-all-mixed-brackets-0-1.mjs',
 sscVerifier:E+'tools/verify-l-g0-l032-ssc-source-0-28.mjs',
 failedSSC:E+'L032_SSC028_FAILED_RUN_ID_MUTATION_ESCAPE_0_1.json'};
const read=k=>JSON.parse(fs.readFileSync(k,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=k=>{const b=fs.readFileSync(k);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Gate=read(files.gate),Old=read(files.previous),S=read(files.ssc),Packet=read(files.packet);
function verify(g=Gate){
 const errors=[],ok=(v,msg)=>{if(!v)errors.push(msg)},ci=g.G0_28_CI||{},p=g.L032_H1_all_mixed_source_G0_packet||{},c=g.current_lawful_state||{};
 ok(g.schema==='isograph.exp062-l-current-stage-gate.v0.28'&&g.track==='L'&&g.status.includes('G0')&&g.status.includes('UNFROZEN')&&g.semantic_authority===false,'G0 L procedural not semantic authority');
 ok(g.supersedes?.path===files.previous&&g.supersedes?.git_blob_sha===sha(files.previous)&&Old.current_lawful_state.G1_authorized===false,'exact source prior stage');
 ok(g.current_source_census?.path===files.ssc&&g.current_source_census?.git_blob_sha===sha(files.ssc)&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&j(g.current_source_census?.changed_from_predecessor)===j(['L-SSC-032']),'exact current SSC and 190 unaffected');
 ok(g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false&&S.guards.source_census_freeze_complete===false,'G0 source not completed');
 ok(p.path===files.packet&&p.git_blob_sha===sha(files.packet)&&p.source?.includes('arXiv:0711.0770v1')&&p.source?.includes('p9 omegaL/R'),'original frozen L01 source and file SHA');
 ok(p.source_pure_gravity_bivector_pairs===6&&p.source_pure_omega_mismatch_entries===0&&p.mixed_native_vs_printed_source_pairs===16,'source geometry pure/mixed equality narrow');
 ok(p.pure_with_mixed_bracket_pairs===96&&p.mixed_mixed_operator_pairs===120&&p.nonzero_source_mixed_mixed_brackets===48&&p.gravity_output_source_typed_sign_countercases===24&&p.primed_output_not_yet_printed_W_B1_typed_countercases===24&&p.disjoint_zero_bracket_pairs===72&&p.changed_matrix_cells===384,'all original source coefficient bracket roles classified');
 for(const k of ['current_source_full_electroweak_bivector_identification_complete','full_graded_curvature_qualified','universal_author_physical_model_error_established'])ok(p[k]===false,'not author/full theory qualification '+k);
 ok(p.negative_i_only_a_project_diagnostic===true&&p.frozen_source_original_coefficients_preserved===true,'diagnostic factor never source correction');
 ok(ci.source?.run_id===37896380480&&ci.source?.conclusion==='success'&&ci.source?.adversarial_defined===23&&ci.source?.adversarial_rejected===23&&ci.source?.external_cold_review_passed===false,'source CI exact and reviewed only internally');
 ok(ci.SSC?.run_id===37896779211&&ci.SSC?.conclusion==='success'&&ci.SSC?.source_items===191&&ci.SSC?.unchanged_items===190&&ci.SSC?.adversarial_rejected===23&&ci.SSC?.external_cold_review_passed===false,'SSC source CI exact');
 ok(ci.source_verifier?.path===files.verifier&&ci.source_verifier?.git_blob_sha===sha(files.verifier),'exact source checked code');
 ok(ci.SSC_verifier?.path===files.sscVerifier&&ci.SSC_verifier?.git_blob_sha===sha(files.sscVerifier),'exact SSC checked code');
 ok(ci.failed_SSC_mutant?.path===files.failedSSC&&ci.failed_SSC_mutant?.git_blob_sha===sha(files.failedSSC)&&ci.failed_SSC_mutant?.run_id===37896672136&&ci.failed_SSC_mutant?.mutants_rejected===22&&ci.failed_SSC_mutant?.mutants_total===23&&ci.failed_SSC_mutant?.disposition.includes('FAIL'),'failed adversarial test cannot be hidden');
 ok(g.historical_failures?.some(x=>x.run_id===37896172149&&x.status==='failed')&&g.historical_failures?.some(x=>x.run_id===37896285018&&x.status==='failed')&&g.historical_failures?.some(x=>x.run_id===37896672136&&x.status==='failed'),'all historic failed source controls retained');
 ok(ci.G1_authorized===false&&ci.full_source_cold_review_passed===false&&ci.mathematical_Lie_or_physical_theory_qualified===false,'no CI semantic authority promotion');
 ok(g.next_lawful_step?.startsWith('Continue independent L-only G0')&&g.next_lawful_step?.includes('electroweak W/B1 six pure prime bivector')&&g.next_lawful_step?.includes('full graded curvature'),'next lawful source work specific');
 ok(g.outstanding_source_reconstruction?.some(x=>x.includes('24 primed-channel cases')&&x.includes('OPEN'))&&g.outstanding_source_reconstruction?.some(x=>x.includes('L05')),'unresolved source claims and negative frozen octonion retained');
 ok(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 source-local research allowed');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ok(c[k]===false,'unauthorized stage or source promotion '+k);
 ok(Packet.G1_authorized===false&&S.guards.L032_H1_24_prime_channel_bracket_countercases_full_W_B1_source_typed===false,'primed source not qualified');
 ok(!j(g).includes('W-SSC-'),'no parallel-track W semantic inference');
 return errors;
}
const base=verify(),errors=[...base],mutants=[
 ['promote G1',g=>{g.current_lawful_state.G1_authorized=true}],
 ['promote G3',g=>{g.current_lawful_state.G3_authorized=true}],
 ['promote G7',g=>{g.current_lawful_state.G7_authorized=true}],
 ['promote IA',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ['promote cross-track',g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['merge PR without stage',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ['pretend SSC frozen',g=>{g.current_source_census.frozen=true}],
 ['replace source arxiv version',g=>{g.L032_H1_all_mixed_source_G0_packet.source='Sept new edition'}],
 ['erase pure omega match',g=>{g.L032_H1_all_mixed_source_G0_packet.source_pure_omega_mismatch_entries=6}],
 ['smuggle entire electroweak theorem',g=>{g.L032_H1_all_mixed_source_G0_packet.current_source_full_electroweak_bivector_identification_complete=true}],
 ['smuggle curvature theorem',g=>{g.L032_H1_all_mixed_source_G0_packet.full_graded_curvature_qualified=true}],
 ['smuggle physical error attribution',g=>{g.L032_H1_all_mixed_source_G0_packet.universal_author_physical_model_error_established=true}],
 ['fabricate source phase authority',g=>{g.L032_H1_all_mixed_source_G0_packet.negative_i_only_a_project_diagnostic=false}],
 ['forget W/B1 gap',g=>{g.L032_H1_all_mixed_source_G0_packet.primed_output_not_yet_printed_W_B1_typed_countercases=0}],
 ['replace source SHA',g=>{g.L032_H1_all_mixed_source_G0_packet.git_blob_sha='stale'}],
 ['replace old SSC SHA',g=>{g.current_source_census.git_blob_sha='stale'}],
 ['edit node verifier pin',g=>{g.G0_28_CI.source_verifier.git_blob_sha='stale'}],
 ['erase SSC baseline failure',g=>{g.G0_28_CI.failed_SSC_mutant.run_id=0}],
 ['erase one failed source case',g=>{g.historical_failures=g.historical_failures.filter(z=>z.run_id!==37896172149)}],
 ['fake external pass',g=>{g.G0_28_CI.source.external_cold_review_passed=true}],
 ['smuggle W premise',g=>{g.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;
if(!base.length)for(const [name,fn]of mutants){const g=cp(Gate),before=j(g);fn(g);if(j(g)===before)errors.push('mutation NO-OP '+name);else if(verify(g).length===0)errors.push('mutation ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-current-g0-stage028-source-routing.v0.1',
 pass:errors.length===0,errors,source_items:191,source_item_changed:'L-SSC-032',other_source_items_unchanged:190,
 source_omega_pairs:6,coefficient_operator_bracket_pairs:120,primed_source_gap_open:true,
 adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',
 G1_to_G7_authorized:false,external_semantic_review_passed:false},null,2));if(errors.length)process.exitCode=1;
