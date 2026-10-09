import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={gate:E+'L_CURRENT_STAGE_GATE_0_30.json',old:E+'L_CURRENT_STAGE_GATE_0_29.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_30.json',source:L+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json',
sourceVerifier:E+'tools/verify-l-g0-l01-h1-graded-curvature-source-0-1.mjs',
sscVerifier:E+'tools/verify-l-g0-l039-ssc-source-0-30.mjs',
gate29Verifier:E+'tools/verify-l-g0-current-stage-gate-0-29.mjs',
failedSource:E+'L039_GRADED_CURVATURE_VERIFIER_BASELINE_FIXTURE_DEFECT_0_1.json',
failedSSC:E+'L039_SSC030_NORMALIZATION_WEDGE_MUTATION_ESCAPE_DEFECT_0_1.json'};
const read=k=>JSON.parse(fs.readFileSync(k,'utf8')),j=JSON.stringify,cp=o=>JSON.parse(j(o));
const sha=k=>{const b=fs.readFileSync(k);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=read(paths.gate),Prev=read(paths.old),S=read(paths.ssc),Source=read(paths.source);
function validate(x=G){
 const errs=[],ok=(q,s)=>{if(!q)errs.push(s)},st=x.current_lawful_state||{},a=x.L039_G0_graded_curvature_source||{},ci=x.G0_30_CI||{};
 ok(x.schema==='isograph.exp062-l-current-stage-gate.v0.30'&&x.track==='L'&&x.status==='L_G0_SSC_0_30_L039_GRADED_CURVATURE_EQ31_EQ35_SOURCE_TYPED_CI_PARTIAL_UNFROZEN_G1_G7_FORBIDDEN'&&x.semantic_authority===false,'G0 source-only procedural');
 ok(x.supersedes?.path===paths.old&&x.supersedes?.git_blob_sha===sha(paths.old)&&Prev.current_lawful_state?.G1_authorized===false,'pinned previous G0 gate');
 ok(x.current_source_census?.path===paths.ssc&&x.current_source_census?.git_blob_sha===sha(paths.ssc)&&x.current_source_census?.source_identities===191&&x.current_source_census?.unchanged_from_predecessor===190&&j(x.current_source_census?.changed_from_predecessor)===j(['L-SSC-039']),'191 SI handles and full 190-body conservation');
 ok(x.current_source_census?.frozen===false&&x.current_source_census?.source_complete===false&&S.guards?.source_census_freeze_complete===false,'source not frozen');
 ok(a.path===paths.source&&a.git_blob_sha===sha(paths.source)&&a.frozen_source==='L01 arXiv:0711.0770v1 2007-11-06 §3.1 printed pp23-24','exact original source revision/locator');
 ok(a.original_H1_connection==='H1=(1/2)*omega+(1/4)*e*phi+w_ew'&&a.source_equations===7&&a.distinct_typed_actor_roles===11,'source H1 quarter factor and seven source equations');
 for(const [name,value]of Object.entries({source_gravity_outer_half:true,source_gravity_inner_eighth:true,source_Fgw_unscaled_literal:true,source_FEW_separate_W_and_B1:true,field_e_is_one_form:true,Higgs_phi_is_scalar:true,raw_common_output_factor4_comparison_is_conditional:true}))ok(a[name]===value,'typed source role/negative grade '+name);
 for(const name of ['common_output_projection_identification_qualified','author_mathematical_error_established','full_graded_curvature_qualified','entire_frozen_L_source_complete'])ok(a[name]===false,'unqualified source semantics '+name);
 ok(ci.G0_29_gate_guard?.id===37903641916&&ci.G0_29_gate_guard?.conclusion==='success'&&ci.G0_29_gate_guard?.adversarial_rejected===23&&ci.G0_29_gate_guard?.external_review_passed===false&&ci.G0_29_gate_guard?.verifier?.git_blob_sha===sha(paths.gate29Verifier),'old procedural gate CI support');
 ok(ci.graded_source?.id===37904387927&&ci.graded_source?.conclusion==='success'&&ci.graded_source?.source_equations===7&&ci.graded_source?.actor_roles===11&&ci.graded_source?.adversarial_defined===24&&ci.graded_source?.adversarial_rejected===24&&ci.graded_source?.external_cold_review_passed===false,'source proof finite/internally scoped');
 ok(ci.graded_source?.verifier?.path===paths.sourceVerifier&&ci.graded_source?.verifier?.git_blob_sha===sha(paths.sourceVerifier),'source verifier blob lineage');
 ok(ci.SSC?.id===37904818379&&ci.SSC?.conclusion==='success'&&ci.SSC?.source_items===191&&ci.SSC?.unchanged_items===190&&ci.SSC?.adversarial_defined===23&&ci.SSC?.adversarial_rejected===23&&ci.SSC?.external_cold_review_passed===false,'SSC source conservation internal scope');
 ok(ci.SSC?.verifier?.path===paths.sscVerifier&&ci.SSC?.verifier?.git_blob_sha===sha(paths.sscVerifier),'SSC source verifier blob lineage');
 ok(ci.failed_source_baseline?.id===37904227568&&ci.failed_source_baseline?.mutations_executed===0&&ci.failed_source_baseline?.defect?.path===paths.failedSource&&ci.failed_source_baseline?.defect?.git_blob_sha===sha(paths.failedSource),'source failed baseline zero-mutants recorded');
 ok(ci.failed_SSC_mutations?.id===37904658269&&ci.failed_SSC_mutations?.adversarial_defined===23&&ci.failed_SSC_mutations?.adversarial_rejected===21&&ci.failed_SSC_mutations?.defect?.git_blob_sha===sha(paths.failedSSC),'SSC 2 mutated source escapes retained');
 ok(x.historical_failures?.some(z=>z.run_id===37904227568&&z.status==='failed')&&x.historical_failures?.some(z=>z.run_id===37904658269&&z.status==='failed'),'failure history not rewritten');
 ok(ci.G1_authorized===false&&ci.external_review_passed===false&&ci.current_graded_curvature_qualified===false,'passing CI not theorem authority');
 ok(x.outstanding_source_reconstruction?.some(z=>z.includes('1/4')&&z.includes('IDENTICAL SOURCE OUTPUT NORMALIZATION IS UNPROVED'))&&x.outstanding_source_reconstruction?.some(z=>z.includes('L05')),'unresolved normalized curvature and source domain');
 ok(x.next_lawful_step?.startsWith('Stay L-only G0')&&x.next_lawful_step?.includes('same normalized projected graviweak output')&&x.next_lawful_step?.includes('L05'),'same quantity requires proof before accusation');
 ok(st.G0_source_audit_authorized===true&&st.G0_source_local_CI_verified===true,'source G0 allowed only');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ok(st[k]===false,'prevent premature '+k);
 ok(Source.open_conditions?.conditional_factor4_author_error_confirmed===false&&S.guards?.L039_author_publication_math_error_ownership_established===false&&Source.G1_authorized===false,'source normalizations not author error or G1');
 ok(x.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE'&&x.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY','external call waived only, no new semantics');
 ok(!j(x).includes('W-SSC-'),'no W track semantic premise');
 return errs;
}
const base=validate(),issues=[...base],mutants=[
 ['promote G1',x=>{x.current_lawful_state.G1_authorized=true}],
 ['promote G7',x=>{x.current_lawful_state.G7_authorized=true}],
 ['promote IA',x=>{x.current_lawful_state.L_recursive_IA_authorized=true}],
 ['promote WL',x=>{x.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['promote merge',x=>{x.current_lawful_state.PR70_merge_authorized=true}],
 ['freeze source',x=>{x.current_source_census.frozen=true}],
 ['change source SI',x=>{x.current_source_census.changed_from_predecessor=['L-SSC-032']}],
 ['erase Eq3.3 outer 1/2',x=>{x.L039_G0_graded_curvature_source.source_gravity_outer_half=false}],
 ['erase Eq3.3 inner 1/8',x=>{x.L039_G0_graded_curvature_source.source_gravity_inner_eighth=false}],
 ['forget mixed e scalar quarter',x=>{x.L039_G0_graded_curvature_source.original_H1_connection='H1=e*phi'}],
 ['conflate W B1',x=>{x.L039_G0_graded_curvature_source.source_FEW_separate_W_and_B1=false}],
 ['promote factor4 author typo',x=>{x.L039_G0_graded_curvature_source.author_mathematical_error_established=true}],
 ['erase projection uncertainty',x=>{x.L039_G0_graded_curvature_source.common_output_projection_identification_qualified=true}],
 ['claim full field curvature',x=>{x.L039_G0_graded_curvature_source.full_graded_curvature_qualified=true}],
 ['replace source edition',x=>{x.L039_G0_graded_curvature_source.frozen_source='new paper'}],
 ['wrong packet SHA',x=>{x.L039_G0_graded_curvature_source.git_blob_sha='stale'}],
 ['wrong SSC SHA',x=>{x.current_source_census.git_blob_sha='stale'}],
 ['lose source verifier',x=>{x.G0_30_CI.graded_source.verifier.git_blob_sha='stale'}],
 ['lose SSC verifier',x=>{x.G0_30_CI.SSC.verifier.git_blob_sha='stale'}],
 ['delete failed baseline',x=>{x.G0_30_CI.failed_source_baseline.mutations_executed=24}],
 ['delete two escaped controls',x=>{x.G0_30_CI.failed_SSC_mutations.adversarial_rejected=23}],
 ['pretend outside review',x=>{x.G0_30_CI.graded_source.external_cold_review_passed=true}],
 ['overwrite lawful step',x=>{x.next_lawful_step='G1 may now run'}],
 ['W contamination',x=>{x.next_lawful_step+=' W-SSC-103'}]
];
let reject=0;
if(!base.length)for(const [name,fn]of mutants){const x=cp(G),before=j(x);fn(x);if(j(x)===before)issues.push('NO-OP '+name);else if(validate(x).length===0)issues.push('ESCAPED '+name);else reject++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-gate030-graded-curvature-source.v0.1',pass:issues.length===0,errors:issues,source_ids:191,changed:'L-SSC-039',unmodified:190,
graded_source_equations:7,graded_actor_roles:11,conditional_factor4_not_author_error:true,adversarial_defined:mutants.length,adversarial_rejected:reject,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,external_review_passed:false},null,2));if(issues.length)process.exitCode=1;
