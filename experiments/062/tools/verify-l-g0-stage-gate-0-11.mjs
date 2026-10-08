import fs from 'node:fs';
import crypto from 'node:crypto';
const exp='experiments/062/',l='research/woit-lisi-isomorph/lisi/';
const paths={gate:exp+'L_CURRENT_STAGE_GATE_0_11.json',old:exp+'L_CURRENT_STAGE_GATE_0_10.json',ssc:l+'SOURCE_SEMANTIC_CENSUS_0_11.json',packet:l+'LISI_L05_SP3_EQ13_EQ14_SOURCE_G0_0_1.json',sourceDefect:exp+'L05_SP3_EQ14_ROOT_PHASE_SOURCE_FIDELITY_DEFECT_0_1.json',verDefect:exp+'L_SSC_0_11_ADVERSARIAL_VERIFIER_BASELINE_MASKING_DEFECT_0_1.json',verifier:exp+'tools/verify-l-g0-l133-ssc-source-0-11.mjs',waiver:exp+'OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=o=>JSON.parse(j(o));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const gate=read(paths.gate),ssc=read(paths.ssc),packet=read(paths.packet),waiver=read(paths.waiver);
function verify(g=gate){
 const e=[],ck=(v,s)=>{if(!v)e.push(s)},c=g.current_lawful_state||{},r=g.G0_11_CI||{};
 ck(g.track==='L'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.11'&&g.status?.includes('G0')&&g.status?.includes('UNFROZEN'),'L gate stage identity');
 ck(g.supersedes?.path===paths.old&&g.supersedes?.git_blob_sha===sha(paths.old),'old gate exact provenance');
 ck(g.current_source_census?.path===paths.ssc&&g.current_source_census?.git_blob_sha===sha(paths.ssc)&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190,'SSC pinned exact');
 ck(g.sp3_source_exact_packet?.path===paths.packet&&g.sp3_source_exact_packet?.git_blob_sha===sha(paths.packet)&&g.sp3_source_exact_packet?.eq13_bracket_families===15&&g.sp3_source_exact_packet?.root_vector_phases_determined===false,'source packet and incomplete Eq14 phases');
 ck(g.sp3_root_phase_modality_defect?.git_blob_sha===sha(paths.sourceDefect)&&g.sp3_adversarial_baseline_masking_defect?.git_blob_sha===sha(paths.verDefect),'negative source and test defects pinned');
 ck(r.run_id===37824604048&&r.head_sha==='cd32c7bfc3166153b29f6bd2e4bc9a20ec8d61fc'&&r.conclusion==='success','exact replay SHA and run');
 ck(r.SSC_verifier?.git_blob_sha===sha(paths.verifier),'SSC fail-closed verifier exact pin');
 ck(r.tests?.some(x=>x.includes('216/216'))&&r.tests?.some(x=>x.includes('27 effective'))&&r.external_review_passed===false&&r.full_L_source_fidelity_qualified===false,'finite internal evidence not external promotion');
 ck(g.historical_failures?.some(x=>x.run_id===37823733174&&x.status==='failed')&&g.historical_failures?.some(x=>x.run_id===37824412749&&x.status==='failed'),'failed verification evidence remains visible');
 ck(g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE'&&waiver.scope?.waived_only?.length===2&&waiver.scope?.still_required?.includes('deterministic replay and CI verification'),'waiver limited to external calls');
 ck(g.outstanding_source_reconstruction?.some(x=>x.includes('Eq.(5)'))&&g.outstanding_source_reconstruction?.some(x=>x.includes('§4.3 full f4'))&&g.outstanding_source_reconstruction?.some(x=>x.includes('L01–L06')),'genuine G0 source boundary');
 ck(g.next_lawful_step?.includes('Eq5')&&g.next_lawful_step?.includes('G0'),'next stage source-only');
 ck(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 local may continue');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(c[k]===false,'cannot authorize '+k);
 ck(ssc.items.length===191&&ssc.items[132].id==='L-SSC-133'&&ssc.guards?.source_census_freeze_complete===false&&packet.brackets.length===15,'pinned input remains current G0 candidate');
 ck(!j(g).includes('W-SSC-'),'source-track independence');
 return e;
}
const baseline=verify(),errors=[...baseline];
const muts=[
 ['promote G1',g=>{g.current_lawful_state.G1_authorized=true}],
 ['promote IA',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ['pretend source frozen',g=>{g.current_source_census.frozen=true;g.current_lawful_state.G0_source_census_frozen=true}],
 ['lose SSC pin',g=>{g.current_source_census.git_blob_sha='stale'}],
 ['lose verifier pin',g=>{g.G0_11_CI.SSC_verifier.git_blob_sha='stale'}],
 ['fabricate external audit',g=>{g.G0_11_CI.external_review_passed=true}],
 ['miscount source formulas',g=>{g.sp3_source_exact_packet.eq13_bracket_families=14}],
 ['erase negative root phase',g=>{g.sp3_source_exact_packet.root_vector_phases_determined=true}],
 ['erase Eq5 missing source',g=>{g.outstanding_source_reconstruction=g.outstanding_source_reconstruction.filter(x=>!x.includes('Eq.(5)'))}],
 ['erase early fixture failure',g=>{g.historical_failures=g.historical_failures.filter(x=>x.run_id!==37823733174)}],
 ['erase adversarial masking failure',g=>{g.historical_failures=g.historical_failures.filter(x=>x.run_id!==37824412749)}],
 ['waive all replay',g=>{g.owner_external_verification_bypass.status='FULL_WAIVER'}],
 ['merge without owner',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ['new W import',g=>{g.unauthorized_source='W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of muts){const x=cp(gate),prior=j(x);fn(x);if(j(x)===prior)errors.push('no-op mutation: '+name);else if(verify(x).length===0)errors.push('escaped mutation: '+name);else rejected++;}
const out={schema:'isograph.exp062-l-g0-gate011-verify.v0.1',pass:errors.length===0,errors,source_items:ssc.items.length,G0_frozen:false,downstream_authorized:false,mutation_tested:baseline.length===0,adversarial_rejected:rejected,adversarial_defined:muts.length,external_review_passed:false};
console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;
