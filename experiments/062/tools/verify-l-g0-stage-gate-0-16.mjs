import fs from 'node:fs';import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const paths={gate:E+'L_CURRENT_STAGE_GATE_0_16.json',pre:E+'L_CURRENT_STAGE_GATE_0_15.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_15.json',source:L+'LISI_L05_EQ4_CYCLIC_SOURCE_G0_0_1.json',sourceVerifier:E+'tools/verify-l-g0-l05-eq4-cyclic-source-0-1.mjs',sscVerifier:E+'tools/verify-l-g0-l126-ssc-source-0-15.mjs'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=get(paths.gate),S=get(paths.ssc),P=get(paths.source),Old=get(paths.pre);
function audit(g=G){
 const failures=[],check=(p,m)=>{if(!p)failures.push(m)},c=g.current_lawful_state||{},q=g.G0_16_CI||{},a=g.Eq4_G0_source_packet||{};
 check(g.schema==='isograph.exp062-l-current-stage-gate.v0.16'&&g.track==='L'&&g.status.includes('G0')&&g.status.includes('UNFROZEN')&&g.semantic_authority===false,'current G0 procedural non-semantic');
 check(g.supersedes?.path===paths.pre&&g.supersedes?.git_blob_sha===sha(paths.pre),'exact old gate');
 check(g.current_source_census?.path===paths.ssc&&g.current_source_census?.git_blob_sha===sha(paths.ssc),'SSC0.15 exact source SHA');
 check(S.item_count===191&&S.items.length===191&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&j(g.current_source_census?.changed_from_predecessor)===j(['L-SSC-126']),'191 IDs with one L126 body revised');
 check(g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false&&S.guards.source_census_freeze_complete===false,'G0 still incomplete');
 check(a.path===paths.source&&a.git_blob_sha===sha(paths.source)&&a.four_exact_M_expressions_transcribed===true,'frozen Eq4 source packet');
 check(a.source_four_M_control_C===8&&a.source_four_M_control_H===64&&a.source_ordinary_O_triples===512&&a.source_ordinary_O_counterexamples===4,'exact ordinary source domain');
 for(const k of ['split_index_lowering_tested','source_Gamma_lowered_four_members_tested','source_whole_Eq4_eight_members_closed','mathematical_theorem_qualified'])check(a[k]===false,'do not promote unknown '+k);
 check(a.source_article_unmodified===true&&P.finite_evidence?.ordinary_O?.counterexamples?.length===4,'source under real printed O');
 check(q.source_CI?.run_id===37840813885&&q.source_CI?.conclusion==='success'&&q.source_CI?.adversarial_mutations===23&&q.source_CI?.external_cold_review_passed===false,'finite Eq4 CI verified internally');
 check(q.SSC_CI?.run_id===37841417817&&q.SSC_CI?.conclusion==='success'&&q.SSC_CI?.L_190_unmodified_items===190&&q.SSC_CI?.adversarial_mutations===20&&q.SSC_CI?.external_cold_review_passed===false,'SSC0.15 CI verified internally');
 check(q.source_verifier?.path===paths.sourceVerifier&&q.source_verifier?.git_blob_sha===sha(paths.sourceVerifier),'exact source checker dependency');
 check(q.source_census_verifier?.path===paths.sscVerifier&&q.source_census_verifier?.git_blob_sha===sha(paths.sscVerifier),'exact source census checker dependency');
 check(q.mathematical_qualification===false&&q.external_review_passed===false&&q.source_census_frozen===false&&q.G1_authorized===false,'CI not math qualification');
 for(const id of [37840691538,37841277279])check(g.historical_failures?.some(x=>x.run_id===id&&x.status==='failed'),'failed Eq4 verification history '+id);
 check(g.outstanding_source_reconstruction?.some(x=>x.includes('four signed source M')&&x.includes('Gamma/barGamma lowered-index')),'Gamma and split scope remain open');
 check(g.outstanding_source_reconstruction?.some(x=>x.includes('L01–L06')),'other source body remains open');
 check(g.next_lawful_step?.startsWith('Continue G0')&&g.next_lawful_step?.includes('Eq17-onward'),'source only next step');
 check(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 source local allowed');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])check(c[k]===false,'not lawful '+k);
 check(Old.current_lawful_state?.G1_authorized===false&&S.guards.section2_Eq4_math_qualified===false&&P.G1_authorized===false,'parent gate and source not advanced');
 check(!j(g).includes('W-SSC-'),'L independent');
 return failures;
}
const baseline=audit(),errors=[...baseline],mutants=[
 ['G0 complete',g=>{g.current_source_census.frozen=true}],
 ['source complete',g=>{g.current_source_census.source_complete=true}],
 ['G1 start',g=>{g.current_lawful_state.G1_authorized=true}],
 ['G3 start',g=>{g.current_lawful_state.G3_authorized=true}],
 ['G7 start',g=>{g.current_lawful_state.G7_authorized=true}],
 ['IA start',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ['cross track',g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['merge',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ['Eq4 Gamma falsely proved',g=>{g.Eq4_G0_source_packet.source_Gamma_lowered_four_members_tested=true}],
 ['split metric falsely proved',g=>{g.Eq4_G0_source_packet.split_index_lowering_tested=true}],
 ['Eq4 universal theorem',g=>{g.Eq4_G0_source_packet.mathematical_theorem_qualified=true}],
 ['hide source O negative',g=>{g.Eq4_G0_source_packet.source_ordinary_O_counterexamples=0}],
 ['source packet pin stale',g=>{g.Eq4_G0_source_packet.git_blob_sha='stale'}],
 ['SSC pin stale',g=>{g.current_source_census.git_blob_sha='stale'}],
 ['source checker stale',g=>{g.G0_16_CI.source_verifier.git_blob_sha='stale'}],
 ['SSC checker stale',g=>{g.G0_16_CI.source_census_verifier.git_blob_sha='stale'}],
 ['fake external verification',g=>{g.G0_16_CI.external_review_passed=true}],
 ['erase failed CI',g=>{g.historical_failures=g.historical_failures.filter(x=>x.run_id!==37840691538)}],
 ['wrong source revision',g=>{g.Eq4_G0_source_packet.frozen_source='Sept arxiv'}],
 ['W semantic contamination',g=>{g.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const g=cp(G),b=j(g);fn(g);if(j(g)===b)errors.push('no-op '+name);else if(audit(g).length===0)errors.push('escaped '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-current-g0-stage016-verify.v0.1',pass:errors.length===0,errors,source_items:191,earliest_lawful_stage:'G0',adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_through_G7_authorized:false,external_semantic_verification_passed:false},null,2));if(errors.length)process.exitCode=1;
