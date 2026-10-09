import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={gate:E+'L_CURRENT_STAGE_GATE_0_21.json',old:E+'L_CURRENT_STAGE_GATE_0_20.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_21.json',
 source:L+'LISI_L01_ELECTROWEAK_CL4_HIGGS_SOURCE_G0_0_1.json',
 sourceVerifier:E+'tools/verify-l-g0-l01-electroweak-cl4-higgs-source-0-1.mjs',
 sscVerifier:E+'tools/verify-l-g0-l031-ssc-source-0-21.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),J=JSON.stringify,clone=x=>JSON.parse(J(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=read(P.gate),Prev=read(P.old),SSC=read(P.ssc),Packet=read(P.source);
function verify(g=G){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)},s=g.L01_electroweak_Cl4_Higgs_source||{},ci=g.G0_21_CI||{},C=g.current_lawful_state||{};
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.21'&&g.track==='L'&&g.status==='L_G0_SSC_0_21_L01_ELECTROWEAK_CL4_HIGGS_FINITE_CI_PARTIAL_UNFROZEN_G1_G7_FORBIDDEN','current procedural stage L G0 only');
 ck(g.semantic_authority===false&&g.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY','gate cannot create mathematical authority');
 ck(g.supersedes?.path===P.old&&g.supersedes?.git_blob_sha===sha(P.old)&&Prev.current_lawful_state?.G1_authorized===false,'G0 previous gate dependency');
 ck(g.current_source_census?.path===P.ssc&&g.current_source_census?.git_blob_sha===sha(P.ssc),'exact new SSC0.21 source SHA');
 ck(g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&J(g.current_source_census?.changed_from_predecessor)===J(['L-SSC-031'])&&g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false,'source 191 IDs, 190 full unchanged, not frozen');
 ck(SSC.items.length===191&&SSC.guards.source_census_freeze_complete===false&&SSC.revision.G1_authorized===false&&SSC.guards.L01_electroweak_connection_and_cartan_complete===false,'actual G0 source incomplete');
 ck(s.path===P.source&&s.git_blob_sha===sha(P.source)&&s.frozen_source==='L01 arXiv:0711.0770v1 §2.2.2 printed page10','precise frozen source and substantive packet pin');
 ck(s.gamma_prime_generators===4&&s.Cl4_ordered_anticommutator_pairs===16&&s.real_Higgs_source_input_tuples===81&&s.source_matrix_cells===1296&&s.source_valid_real_mismatches===0,'finite G0 representation-only test domain');
 ck(s.distinct_phiOne_label_from_phiSup1===true&&s.positive_Cl4_signature===true&&s.source_original_unmodified===true,'source label identity and distinct Cl4 sign preserved');
 for(const key of ['source_electroweak_wew_connection_unexamined','source_Cartan_weights_unexamined'])ck(s[key]===true,'new unknown source not discharged '+key);
 for(const key of ['global_Cl4_or_E8_theorem_qualified','full_L01_source_qualified','external_cold_review_passed'])ck(s[key]===false,'no math theorem or external review '+key);
 ck(ci.finite_source?.run_id===37873857848&&ci.finite_source?.head_sha==='19bfb16a7d1b46553b74dfa2654c7b058572326b'&&ci.finite_source?.conclusion==='success'&&ci.finite_source?.Cl4_pairs===16&&ci.finite_source?.Higgs_real_tuples===81&&ci.finite_source?.Higgs_matrix_entries===1296&&ci.finite_source?.adversarial_defined===28&&ci.finite_source?.adversarial_rejected===28&&ci.finite_source?.external_review_passed===false,'finite source CI exact');
 ck(ci.SSC_021?.run_id===37874082017&&ci.SSC_021?.head_sha==='7322fb67b6be89e0ed84a02a2fa0ae57209d198c'&&ci.SSC_021?.conclusion==='success'&&ci.SSC_021?.current_source_items===191&&ci.SSC_021?.unchanged_source_items===190&&ci.SSC_021?.adversarial_defined===24&&ci.SSC_021?.adversarial_rejected===24&&ci.SSC_021?.external_review_passed===false,'SSC0.21 CI exact');
 ck(ci.source_verifier?.path===P.sourceVerifier&&ci.source_verifier?.git_blob_sha===sha(P.sourceVerifier),'finite source verifier pin');
 ck(ci.SSC_verifier?.path===P.sscVerifier&&ci.SSC_verifier?.git_blob_sha===sha(P.sscVerifier),'SSC0.21 verifier pin');
 for(const key of ['full_primary_source_complete','G1_authorized','global_qualified_module_promotion'])ck(ci[key]===false,'no stage promotion through CI '+key);
 ck(g.outstanding_source_reconstruction?.some(t=>t.includes('§2.2.2 Cl(4)')&&t.includes('unexpanded')),'unexamined electroweak and graviweak source still explicit');
 ck(g.outstanding_source_reconstruction?.some(t=>t.includes('L05')&&t.includes('Γ')),'L05 prior source gaps retained');
 ck(g.next_lawful_step?.startsWith('Continue independent L G0')&&g.next_lawful_step.includes('U-V'),'L-only next source domain');
 ck(C.G0_source_audit_authorized===true&&C.G0_source_local_CI_verified===true,'G0 source-only allowed');
 for(const key of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(C[key]===false,'illegal promotion '+key);
 ck(Packet.source_complete===false&&Packet.G1_authorized===false&&Packet.mathematical_theorem_qualified===false&&g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','source facts and external waiver boundary');
 ck(g.nonclaims?.some(x=>x.includes('phiOne')&&x.includes('phi^1'))&&g.nonclaims?.some(x=>x.includes('SL(2,C)')&&x.includes('L05')),'negative source conditions and historical contradictions visible');
 ck(!J(g).includes('W-SSC-'),'W/L semantic quarantine');
 return errors;
}
const base=verify(),errors=[...base],mutants=[
['fabricate G0 frozen',g=>{g.current_source_census.frozen=true}],
['fabricate L01 source complete',g=>{g.current_source_census.source_complete=true}],
['authorize G1',g=>{g.current_lawful_state.G1_authorized=true}],
['authorize G2',g=>{g.current_lawful_state.G2_authorized=true}],
['authorize G3',g=>{g.current_lawful_state.G3_authorized=true}],
['authorize G7',g=>{g.current_lawful_state.G7_authorized=true}],
['authorize Recursive IA',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
['authorize W/L synthesis',g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
['authorize merge',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
['claim Cl4 theorem',g=>{g.L01_electroweak_Cl4_Higgs_source.global_Cl4_or_E8_theorem_qualified=true}],
['claim electroweak wew examined',g=>{g.L01_electroweak_Cl4_Higgs_source.source_electroweak_wew_connection_unexamined=false}],
['claim Cartan and Table4 examined',g=>{g.L01_electroweak_Cl4_Higgs_source.source_Cartan_weights_unexamined=false}],
['substitute gravitational gamma4',g=>{g.L01_electroweak_Cl4_Higgs_source.positive_Cl4_signature=false}],
['identify phiOne and phi^1',g=>{g.L01_electroweak_Cl4_Higgs_source.distinct_phiOne_label_from_phiSup1=false}],
['change real scalar case count',g=>{g.L01_electroweak_Cl4_Higgs_source.real_Higgs_source_input_tuples=80}],
['wrong frozen source version',g=>{g.L01_electroweak_Cl4_Higgs_source.frozen_source='arxiv v2'}],
['wrong SSC pin',g=>{g.current_source_census.git_blob_sha='STALE'}],
['wrong source packet pin',g=>{g.L01_electroweak_Cl4_Higgs_source.git_blob_sha='STALE'}],
['wrong source verifier pin',g=>{g.G0_21_CI.source_verifier.git_blob_sha='STALE'}],
['wrong SSC verifier pin',g=>{g.G0_21_CI.SSC_verifier.git_blob_sha='STALE'}],
['fake source CI pass',g=>{g.G0_21_CI.finite_source.adversarial_rejected=0}],
['fake outside review',g=>{g.G0_21_CI.SSC_021.external_review_passed=true}],
['erase L05 source negative',g=>{g.outstanding_source_reconstruction=g.outstanding_source_reconstruction.filter(x=>!x.includes('L05'))}],
['W source import',g=>{g.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;if(!base.length)for(const [name,fn]of mutants){const s=clone(G),prev=J(s);fn(s);if(J(s)===prev)errors.push('NOOP '+name);else if(verify(s).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-current-g0-stage021-source.v0.1',pass:errors.length===0,errors,source_items:191,changed:'L-SSC-031',unchanged:190,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',earliest_lawful_stage:'G0',G1_through_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
