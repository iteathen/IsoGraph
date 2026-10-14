import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const files={gate:exp+'L_CURRENT_STAGE_GATE_0_12.json',before:exp+'L_CURRENT_STAGE_GATE_0_11.json',ssc:root+'SOURCE_SEMANTIC_CENSUS_0_12.json',packet:root+'LISI_L05_F4_EQ15_EQ16_SOURCE_G0_0_1.json',sourceVerifier:exp+'tools/verify-l-g0-l05-f4-eq15-eq16-source-0-1.mjs',sscVerifier:exp+'tools/verify-l-g0-l133-ssc-source-0-12.mjs',bypass:exp+'OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=get(files.gate),S=get(files.ssc),P=get(files.packet),W=get(files.bypass);
function audit(g=G){
 const e=[],ck=(v,msg)=>{if(!v)e.push(msg)},c=g.current_lawful_state||{},r=g.G0_12_CI||{},f=g.f4_source_packet||{};
 ck(g.track==='L'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.12'&&g.status?.includes('G0')&&g.status?.includes('UNFROZEN'),'strict L G0 current gate');
 ck(g.supersedes?.path===files.before&&g.supersedes?.git_blob_sha===sha(files.before),'previous lawful gate source pin');
 ck(g.current_source_census?.path===files.ssc&&g.current_source_census?.git_blob_sha===sha(files.ssc)&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false,'exact SSC0.12 source witness');
 ck(f.path===files.packet&&f.git_blob_sha===sha(files.packet)&&f.eq16_bracket_families===10&&f.split_source_sign_rows===3&&j(f.distinct_source_forms)===j(['f4(-52)','f4(-20)','f4(4)']),'f4 source roles and signed families');
 ck(f.nonassociative_right_first===true&&f.no_naive_octonionic_matrix_Lie_theorem===true&&f.finite_octonion_math_tests==='NOT_RUN','no mathematical import');
 ck(r.run_id===37825937865&&r.head_sha==='4d36f0b8c6a1d4ae6c6bdf27a7df670c12d2e136'&&r.conclusion==='success','literal exact CI run');
 ck(r.source_packet_verifier?.path===files.sourceVerifier&&r.source_packet_verifier?.git_blob_sha===sha(files.sourceVerifier)&&r.source_census_verifier?.path===files.sscVerifier&&r.source_census_verifier?.git_blob_sha===sha(files.sscVerifier),'full CI verifier blob pin');
 ck(r.tests?.some(s=>s.includes('26 source-packet'))&&r.tests?.some(s=>s.includes('26 SSC0.12'))&&r.external_review_passed===false&&r.full_L_source_fidelity_qualified===false&&r.G1_authorized===false,'adversarial test scope and nonclaims');
 ck(g.G0_11_CI?.run_id===37824604048&&g.G0_11_CI?.conclusion==='success','conserve Eq13 Eq14 prior gate success');
 ck(g.historical_failures?.some(x=>x.run_id===37823733174)&&g.historical_failures?.some(x=>x.run_id===37824412749),'failed verifier history preserved');
 ck(g.outstanding_source_reconstruction?.some(s=>s.includes('§4.3 Eq.(15)/(16)')&&s.includes('Eq.(17) onward')),'remaining source obligation');
 ck(g.outstanding_source_reconstruction?.some(s=>s.includes('Eq.(5)'))&&g.outstanding_source_reconstruction?.some(s=>s.includes('L01–L06')),'full source fixed point not fabricated');
 ck(g.next_lawful_step?.includes('Eq.(17)')&&g.next_lawful_step?.includes('G0'),'only next lawful G0');
 ck(g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE'&&W.scope?.still_required?.includes('deterministic replay and CI verification'),'waiver excludes mechanical gates');
 ck(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'local G0 work only');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','PR70_merge_authorized'])ck(c[k]===false,'unauthorized stage '+k);
 ck(S.items.length===191&&S.status.includes('UNFROZEN')&&S.guards.section4_f4_and_split_cases_complete===false&&P.eq16.brackets.length===10&&P.eq16.split_real_form.brackets.length===3,'pinned inputs retain open scope');
 ck(!j(g).includes('W-SSC-'),'no cross W authority');
 return e;
}
const baseline=audit(),errors=[...baseline];
const mutants=[
 ['G1 promotion',g=>{g.current_lawful_state.G1_authorized=true}],
 ['G7 promotion',g=>{g.current_lawful_state.G7_authorized=true}],
 ['IA promotion',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ['source freeze',g=>{g.current_source_census.frozen=true}],
 ['source SHA change',g=>{g.current_source_census.git_blob_sha='stale'}],
 ['source verifier SHA change',g=>{g.G0_12_CI.source_packet_verifier.git_blob_sha='stale'}],
 ['SSC verifier SHA change',g=>{g.G0_12_CI.source_census_verifier.git_blob_sha='stale'}],
 ['ordinary/split collapse',g=>{g.f4_source_packet.distinct_source_forms.pop()}],
 ['fabricate Lie theorem',g=>{g.f4_source_packet.finite_octonion_math_tests='PASS'}],
 ['delete nonassoc guard',g=>{g.f4_source_packet.nonassociative_right_first=false}],
 ['erase remaining Eq17',g=>{g.outstanding_source_reconstruction=g.outstanding_source_reconstruction.filter(s=>!s.includes('§4.3 Eq.(15)/(16)'))}],
 ['external pass claim',g=>{g.G0_12_CI.external_review_passed=true}],
 ['erase old CI failure',g=>{g.historical_failures=g.historical_failures.filter(x=>x.run_id!==37824412749)}],
 ['erase prior Eq13 source CI',g=>{g.G0_11_CI.run_id=0}],
 ['merge unauthorized',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ['smuggle W claim',g=>{g.unauthorized_source='W-SSC-121'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const x=cp(G),prev=j(x);fn(x);if(j(x)===prev)errors.push('mutation no-op '+name);else if(audit(x).length===0)errors.push('mutation escape '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-gate012-integrity.v0.1',pass:errors.length===0,errors,adversarial_mutations_defined:mutants.length,adversarial_mutations_rejected:rejected,mutation_gate:baseline.length===0?'TESTED':'UNTESTED_BASELINE_FAILURE',source_items:191,changed_item:'L-SSC-133',source_frozen:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
