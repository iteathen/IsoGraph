import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={current:E+'L_CURRENT_STAGE_GATE_0_27.json',old:E+'L_CURRENT_STAGE_GATE_0_26.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_27.json',
 source:L+'LISI_L01_H1_PHASE_ONLY_LIE_BRACKET_OBSTRUCTION_G0_0_1.json',
 verifier:E+'tools/verify-l-g0-l01-h1-phase-only-bracket-0-1.mjs',sscVerifier:E+'tools/verify-l-g0-l032-ssc-source-0-27.mjs',
 failed:E+'L032_H1_PHASE_BRACKET_VERIFIER_NEXT_STEP_TOKEN_DEFECT_0_1.json'};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Gate=read(p.current),Prior=read(p.old),SSC=read(p.ssc),Packet=read(p.source),Failed=read(p.failed);
function check(g=Gate){
 const e=[],ck=(v,msg)=>{if(!v)e.push(msg)},s=g.current_lawful_state||{},z=g.L032_H1_phase_only_bracket_G0||{},q=g.G0_27_CI||{};
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.27'&&g.track==='L'&&g.semantic_authority===false&&g.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY'&&g.status?.includes('G0')&&g.status?.includes('UNFROZEN'),'L G0 source-only procedural routing');
 ck(g.supersedes?.path===p.old&&g.supersedes?.git_blob_sha===sha(p.old),'exact predecessor procedural gate');
 ck(g.current_source_census?.path===p.ssc&&g.current_source_census?.git_blob_sha===sha(p.ssc)&&g.current_source_census?.source_identities===191,'exact current 191 source items');
 ck(j(g.current_source_census?.changed_from_predecessor)===j(['L-SSC-032'])&&g.current_source_census?.unchanged_from_predecessor===190&&g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false,'191 SI plus 190 full predecessor unchanged');
 ck(SSC.items?.length===191&&SSC.guards?.source_census_freeze_complete===false&&SSC.guards?.L032_H1_phase_only_fixed_pure_gravity_Lie_homomorphism===false,'G0 source open and bracket counterexample');
 ck(z.packet?.path===p.source&&z.packet?.git_blob_sha===sha(p.source)&&z.frozen_source?.includes('arXiv:0711.0770v1')&&z.operator_scope?.includes('SOURCE MATRIX COEFFICIENT BRACKET'),'exact L01 source coefficient-only scope');
 ck(z.mixed_source_pairs===16&&z.pure_gravity_unordered_pairs===6&&z.fixed_prime_indices===4&&z.source_brackets_tested===24&&z.source_operator_entries_changed===192,'24 finite matrix bracket source cases');
 ck(z.native_mixed_brackets==='[X_mu,nu,X_kappa,nu]=-2 G_mu,kappa'&&z.printed_mixed_brackets==='[P_mu,nu,P_kappa,nu]=+2 G_mu,kappa'&&z.project_generated_phase?.includes('NOT author source correction'),'signed bracket source non-repair');
 ck(z.pure_gravity_source_bivectors_fixed===true&&z.phase_only_Lie_homomorphism===false&&z.positive_same_coefficient_finite_result_only===true,'conditional homomorphism failure');
 for(const name of ['graded_full_source_curvature_or_spinor_action_qualified','author_intent_or_mathematical_error_qualified','full_L01_L06_corpus_qualified'])ck(z[name]===false,'open physical source theory '+name);
 ck(z.unexamined_source_coefficient_or_non_similarity_transport_remains===true&&z.no_W_source_input===undefined,'unresolved alternative evidence not imported');
 ck(q.source_bracket?.run_id===37893649278&&q.source_bracket?.conclusion==='success'&&q.source_bracket?.source_brackets===24&&q.source_bracket?.adversarial_rejected===18&&q.source_bracket?.external_cold_review_passed===false,'finite bracket CI never external PASS');
 ck(q.SSC_0_27?.run_id===37893875820&&q.SSC_0_27?.conclusion==='success'&&q.SSC_0_27?.source_items===191&&q.SSC_0_27?.unchanged_items===190&&q.SSC_0_27?.adversarial_rejected===22&&q.SSC_0_27?.external_cold_review_passed===false,'exact source conservation CI');
 ck(q.previous_trace_square?.run_id===37892401781&&q.previous_trace_square?.adversarial_rejected===26&&q.previous_trace_square?.external_cold_review_passed===false,'prior trace-square negative retained');
 ck(q.source_verifier?.path===p.verifier&&q.source_verifier?.git_blob_sha===sha(p.verifier),'source signed bracket verifier current exact hash');
 ck(q.SSC_verifier?.path===p.sscVerifier&&q.SSC_verifier?.git_blob_sha===sha(p.sscVerifier),'SSC 190 body checker exact hash');
 ck(q.failed_bracket_baseline?.path===p.failed&&q.failed_bracket_baseline?.git_blob_sha===sha(p.failed)&&q.failed_bracket_baseline?.run_id===37893439563&&q.failed_bracket_baseline?.mutants_executed===0,'failed baseline preserved not counted');
 ck(Failed.failed_run?.id===37893439563&&Failed.failed_run?.adversarial_executed===0,'truth of historical failed mutation gate');
 ck(q.external_semantic_review_passed===false&&q.global_L01_L06_math_theorem_qualified===false&&q.G1_authorized===false,'no CI to theorem laundering');
 ck(g.outstanding_source_reconstruction?.some(t=>t.includes('MATRIX-OPERATOR commutators')&&t.includes('unadjudicated')),'explicit G0 gap retained');
 ck(g.next_lawful_step?.startsWith('Continue L-only G0')&&g.next_lawful_step?.includes('full graded curvature'),'no future premature stage');
 ck(s.G0_source_audit_authorized===true&&s.G0_source_local_CI_verified===true,'G0 only');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(s[k]===false,'no source-stage authority '+k);
 ck(Prior.current_lawful_state?.G1_authorized===false&&Packet.mathematical_theory_qualified===false&&SSC.revision.G1_authorized===false,'predecessor source semantics unqualified');
 ck(!j(g).includes('W-SSC-'),'no W track source evidence');
 return e;
}
const base=check(),errors=[...base],mutants=[
 ['pretend G0 frozen',x=>{x.current_source_census.frozen=true}],
 ['pretend G0 complete',x=>{x.current_source_census.source_complete=true}],
 ['pretend G1 authorized',x=>{x.current_lawful_state.G1_authorized=true}],
 ['pretend G3 authorized',x=>{x.current_lawful_state.G3_authorized=true}],
 ['pretend G7 authorized',x=>{x.current_lawful_state.G7_authorized=true}],
 ['pretend IA authorized',x=>{x.current_lawful_state.L_recursive_IA_authorized=true}],
 ['pretend W-L authorized',x=>{x.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['pretend merge authorized',x=>{x.current_lawful_state.PR70_merge_authorized=true}],
 ['pretend graded curvature closed',x=>{x.L032_H1_phase_only_bracket_G0.graded_full_source_curvature_or_spinor_action_qualified=true}],
 ['pretend author error proved',x=>{x.L032_H1_phase_only_bracket_G0.author_intent_or_mathematical_error_qualified=true}],
 ['pretend mixed scalar Lie homomorphism',x=>{x.L032_H1_phase_only_bracket_G0.phase_only_Lie_homomorphism=true}],
 ['erase source bracket cases',x=>{x.L032_H1_phase_only_bracket_G0.source_brackets_tested=0}],
 ['change source mixed bracket sign',x=>{x.L032_H1_phase_only_bracket_G0.native_mixed_brackets='-3 G'}],
 ['change printed source bracket sign',x=>{x.L032_H1_phase_only_bracket_G0.printed_mixed_brackets='-2 G'}],
 ['erase original pure sector fixed',x=>{x.L032_H1_phase_only_bracket_G0.pure_gravity_source_bivectors_fixed=false}],
 ['replace signed test with actual exterior wedge',x=>{x.L032_H1_phase_only_bracket_G0.operator_scope='EXTERIOR FORM'}],
 ['change frozen source to different revision',x=>{x.L032_H1_phase_only_bracket_G0.frozen_source='L01 0711.0770v2'}],
 ['forget open source alternatives',x=>{x.L032_H1_phase_only_bracket_G0.unexamined_source_coefficient_or_non_similarity_transport_remains=false}],
 ['source packet stale SHA',x=>{x.L032_H1_phase_only_bracket_G0.packet.git_blob_sha='old'}],
 ['source SSC stale SHA',x=>{x.current_source_census.git_blob_sha='old'}],
 ['source verifier stale SHA',x=>{x.G0_27_CI.source_verifier.git_blob_sha='old'}],
 ['SSC verifier stale SHA',x=>{x.G0_27_CI.SSC_verifier.git_blob_sha='old'}],
 ['erase failed run',x=>{delete x.G0_27_CI.failed_bracket_baseline}],
 ['fake external cold validation',x=>{x.G0_27_CI.SSC_0_27.external_cold_review_passed=true}],
 ['W import',x=>{x.next_lawful_step+=' W-SSC-103'}]
];
let rej=0;if(!base.length)for(const [name,fn]of mutants){const x=copy(Gate),before=j(x);fn(x);if(j(x)===before)errors.push('NOOP '+name);else if(check(x).length===0)errors.push('ESCAPED '+name);else rej++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-G0-stage027-H1-source-only.v0.1',pass:errors.length===0,errors,source_items:191,source_changed:'L-SSC-032',source_unaffected:190,brackets:24,adversarial_defined:mutants.length,adversarial_rejected:rej,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',G1_G7_authorized:false,source_global_theorem_qualified:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
