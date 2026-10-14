import fs from 'node:fs';
import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const p={gate:E+'L_CURRENT_STAGE_GATE_0_15.json',prev:E+'L_CURRENT_STAGE_GATE_0_14.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_14.json',packet:L+'LISI_L05_EQ5_INDEXED_BIVECTOR_SOURCE_RECONSTRUCTION_0_1.json',sourceVerifier:E+'tools/verify-l-g0-l127-eq5-indexed-source-0-1.mjs',sscVerifier:E+'tools/verify-l-g0-l127-ssc-source-0-14.mjs'};
const load=k=>JSON.parse(fs.readFileSync(k,'utf8')),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const sha=k=>{const b=fs.readFileSync(k);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const g=load(p.gate),s=load(p.ssc),source=load(p.packet),old=load(p.prev);
function check(v=g){
 const fail=[],ok=(test,msg)=>{if(!test)fail.push(msg)},c=v.current_lawful_state||{},f=v.Eq5_G0_source_packet||{},q=v.G0_15_CI||{};
 ok(v.schema==='isograph.exp062-l-current-stage-gate.v0.15'&&v.track==='L'&&v.semantic_authority===false&&v.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY','G0 research gate not semantic authority');
 ok(v.status==='L_G0_SSC_0_14_EQ5_SOURCE_INDEXED_CI_VERIFIED_PARTIAL_UNFROZEN_G1_TO_G7_FORBIDDEN','exact current G0 gate');
 ok(v.supersedes?.path===p.prev&&v.supersedes?.git_blob_sha===sha(p.prev)&&old.current_lawful_state?.G1_authorized===false,'previous gate correctly pinned');
 ok(v.current_source_census?.path===p.ssc&&v.current_source_census?.git_blob_sha===sha(p.ssc)&&v.current_source_census?.source_identities===191&&v.current_source_census?.unchanged_from_predecessor===190&&j(v.current_source_census?.changed_from_predecessor)===j(['L-SSC-127']),'current L SSC complete ID conservation');
 ok(v.current_source_census?.frozen===false&&v.current_source_census?.source_complete===false&&s.guards.source_census_freeze_complete===false,'frozen source not declared complete');
 ok(f.path===p.packet&&f.git_blob_sha===sha(p.packet)&&f.G0_source_indexed_transcription===true&&f.mathematical_clifford_or_so8_qualification===false&&f.source_version_unchanged===true,'exact source-only indexed packet');
 ok(j(f.free_upper_indices)===j(['a','e'])&&f.bound_upper_index==='b'&&j(f.free_lower_indices)===j(['b','f'])&&f.bound_lower_index==='a','source chiral binders separate');
 ok(f.source_signed_chiral_cases===15136&&f.source_ordinary_O_reverse_fail_pairs_upper===6&&f.source_ordinary_O_reverse_fail_pairs_lower===6&&f.source_ordinary_O_Lie_commutators_outside_span===168&&f.unfrozen_arxiv_version_not_frozen_L05_authority===true,'numerical negative source and revision distinction');
 ok(q.Eq5_exact_source_run?.id===37839333341&&q.Eq5_exact_source_run?.conclusion==='success'&&q.Eq5_exact_source_run?.adversarial_rejected===27&&q.Eq5_exact_source_run?.external_cold_review_passed===false,'source CI exactly limited');
 ok(q.SSC0_14_run?.id===37839907021&&q.SSC0_14_run?.conclusion==='success'&&q.SSC0_14_run?.adversarial_rejected===22&&q.SSC0_14_run?.external_cold_review_passed===false,'source census CI exactly limited');
 ok(q.Eq5_source_verifier?.path===p.sourceVerifier&&q.Eq5_source_verifier?.git_blob_sha===sha(p.sourceVerifier),'source verifier exact SHA');
 ok(q.SSC0_14_verifier?.path===p.sscVerifier&&q.SSC0_14_verifier?.git_blob_sha===sha(p.sscVerifier),'SSC verifier exact SHA');
 ok(q.asserted_math_qualified===false&&q.full_source_census_qualified===false&&q.gate_G1_authorized===false,'no authority laundering by passing CI');
 for(const id of [37838619149,37838782350,37838925736,37839051903,37839225214,37839683075])ok(v.historical_failures?.some(x=>x.run_id===id&&x.status==='failed'),'preserve failed verifier '+id);
 ok(v.outstanding_source_reconstruction?.some(x=>x.includes('Eq.(4)'))&&v.outstanding_source_reconstruction?.some(x=>x.includes('Eq.(5) exact printed')&&x.includes('G0 only'))&&v.outstanding_source_reconstruction?.some(x=>x.includes('L01–L06')),'source remaining not hidden');
 ok(v.next_lawful_step?.startsWith('Remain G0')&&v.next_lawful_step?.includes('Eq(4)'),'no out-of-order next work');
 ok(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 source-local work continues');
 for(const key of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ok(c[key]===false,'no stage promotion '+key);
 ok(source.G1_authorized===false&&source.source_complete===false&&source.primitive_or_theorem_qualification===false&&s.guards.section2_Eq5_index_complete===false,'Eq5 not current math authority');
 ok(!j(v).includes('W-SSC-'),'no W source import');
 return fail;
}
const baseline=check(),errors=[...baseline],muts=[
 ['G1 authorized',x=>{x.current_lawful_state.G1_authorized=true}],
 ['G3 authorized',x=>{x.current_lawful_state.G3_authorized=true}],
 ['G7 authorized',x=>{x.current_lawful_state.G7_authorized=true}],
 ['IA authorized',x=>{x.current_lawful_state.L_recursive_IA_authorized=true}],
 ['cross-track authorized',x=>{x.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['merge authorized',x=>{x.current_lawful_state.PR70_merge_authorized=true}],
 ['source frozen',x=>{x.current_source_census.frozen=true}],
 ['premature theorem',x=>{x.Eq5_G0_source_packet.mathematical_clifford_or_so8_qualification=true}],
 ['erase Lie nonclosure',x=>{x.Eq5_G0_source_packet.source_ordinary_O_Lie_commutators_outside_span=0}],
 ['erase right source index',x=>{x.Eq5_G0_source_packet.bound_upper_index='a'}],
 ['erase lower source index',x=>{x.Eq5_G0_source_packet.bound_lower_index='b'}],
 ['alter source pin',x=>{x.Eq5_G0_source_packet.git_blob_sha='stale'}],
 ['alter SSC pin',x=>{x.current_source_census.git_blob_sha='stale'}],
 ['alter verifier pin',x=>{x.G0_15_CI.Eq5_source_verifier.git_blob_sha='stale'}],
 ['alter source sign cases',x=>{x.Eq5_G0_source_packet.source_signed_chiral_cases=0}],
 ['erase prior fail',x=>{x.historical_failures=x.historical_failures.filter(z=>z.run_id!==37839051903)}],
 ['external verification fabricated',x=>{x.G0_15_CI.SSC0_14_run.external_cold_review_passed=true}],
 ['unfrozen arxiv substituted',x=>{x.Eq5_G0_source_packet.unfrozen_arxiv_version_not_frozen_L05_authority=false}],
 ['W contamination',x=>{x.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;if(!baseline.length)for(const [name,mutate]of muts){const v=copy(g),b=j(v);mutate(v);if(j(v)===b)errors.push('no-op '+name);else if(check(v).length===0)errors.push('escaped '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage015-source-gate.v0.1',pass:errors.length===0,errors,source_items:191,changed:'L-SSC-127',adversarial_defined:muts.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILURE':'TESTED',G1_through_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
