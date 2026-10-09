import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={gate:E+'L_CURRENT_STAGE_GATE_0_24.json',old:E+'L_CURRENT_STAGE_GATE_0_23.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_24.json',
 source:L+'LISI_L01_TABLE5_D4_ROOT_TRIALITY_SOURCE_G0_0_1.json',
 sourceV:E+'tools/verify-l-g0-l01-table5-d4-triality-source-0-1.mjs',sscV:E+'tools/verify-l-g0-l032-l033-ssc-source-0-24.mjs',
 defectSource:E+'L01_TABLE5_D4_VERIFIER_F4_NONCLAIM_BASELINE_DEFECT_0_1.json',
 defectSSC:E+'L032_L033_SSC024_VERIFIER_FIELD_SCHEMA_BASELINE_DEFECT_0_1.json'};
const get=k=>JSON.parse(fs.readFileSync(k,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=k=>{const b=fs.readFileSync(k);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const G=get(p.gate),old=get(p.old),S=get(p.ssc),P=get(p.source);
function verify(g=G){
 const errors=[],ck=(value,msg)=>{if(!value)errors.push(msg)},x=g.L032_L033_Table5_T3_source||{},ci=g.G0_24_CI||{},state=g.current_lawful_state||{},ssc=g.current_source_census||{};
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.24'&&g.track==='L'&&g.semantic_authority===false&&g.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY','G0 procedural not semantic authority');
 ck(g.status==='L_G0_SSC_0_24_L01_D4_TABLE5_SOURCE_T3_FINITE_CI_UNFROZEN_G1_G7_FORBIDDEN','exact live stage and prohibition');
 ck(g.supersedes?.path===p.old&&g.supersedes?.git_blob_sha===sha(p.old)&&old.current_lawful_state?.G1_authorized===false,'predecessor exact G0 gate SHA');
 ck(ssc.path===p.ssc&&ssc.git_blob_sha===sha(p.ssc)&&ssc.source_identities===191&&j(ssc.changed_from_predecessor)===j(['L-SSC-032','L-SSC-033'])&&ssc.unchanged_from_predecessor===189,'exact two source obligations and all 189 other unchanged');
 ck(ssc.frozen===false&&ssc.source_complete===false&&S.items?.length===191&&S.guards?.source_census_freeze_complete===false,'whole source SSC still unfrozen');
 ck(x.path===p.source&&x.git_blob_sha===sha(p.source)&&x.frozen_source==='L01 arXiv:0711.0770v1 §2.2.3–2.2.4 pp12–14','exact L01 source packet version');
 for(const [name,value]of Object.entries({G0_exact_source_table_rows:16,D4_boson_root_instances:24,original_8Splus_spinor_weights:8,source_Table6_companion_rows:8,source_8Sminus_weights:8,source_8V_weights:8,finite_triality_permutation_order:3,finite_D4_fixed_roots:6,finite_nonfixed_T_orbits:6,combined_coordinate_candidates:48}))
  ck(x[name]===value,'finite Table5/6 exact count '+name);
 for(const name of ['Table5_signed_source_rows_transcribed','Table6_T_T2_source_image_transcribed','earlier_L01_real_Spin_group_negative_preserved','original_L05_octonion_negative_preserved'])
  ck(x[name]===true,'exact source and negative '+name);
 for(const name of ['full_H1_positive_8x8_field_entries_reconstructed','D4_full_Lie_root_generators_closed','F4_48_root_real_form_theorem_qualified','source_tentative_physical_generations_proved','source_E8_global_triality_unique','source_census_frozen','G1_authorized'])
  ck(x[name]===false,'must not promote scope '+name);
 ck(P.table5.bosonic_rows_ordered.length===12&&P.table5.spinor8Splus_rows_ordered.length===4&&P.table6_source_companion.eight_rows_expected.length===8&&P.external_cold_review_passed===false,'source Table5/6 still candidate');
 ck(ci.source?.id===37885282995&&ci.source?.head_sha==='431f6bffdd23aabb211b3828358fed572f2bf6ac'&&ci.source?.conclusion==='success'&&ci.source?.adversarial_rejected===31&&ci.source?.external_cold_review_passed===false,'source CI scoped, not external');
 ck(ci.ssc?.id===37885838995&&ci.ssc?.head_sha==='b8581111dd82fb6c50fe03620991b49d2e14d198'&&ci.ssc?.conclusion==='success'&&ci.ssc?.adversarial_rejected===20&&ci.ssc?.unchanged_source_items===189&&ci.ssc?.external_cold_review_passed===false,'SSC0.24 conservation CI scoped, not external');
 for(const [name,pathname]of [['source_verifier',p.sourceV],['ssc_verifier',p.sscV],['failed_source_verifier',p.defectSource],['failed_ssc_verifier',p.defectSSC]])
  ck(ci[name]?.path===pathname&&ci[name]?.git_blob_sha===sha(pathname),'exact G0 CI/test/defect SHA '+name);
 ck(ci.failed_source_verifier?.id===37885206752&&ci.failed_source_verifier?.mutations_tested===0&&ci.failed_ssc_verifier?.id===37885659932&&ci.failed_ssc_verifier?.mutations_tested===0,'two prior FAILED baselines, zero qualifying mutants');
 ck(ci.whole_source_cold_audit_passed===false&&ci.source_census_frozen===false&&ci.G1_authorized===false&&ci.global_mathematical_or_physical_theorem_qualified===false,'finite source CI not math/full source theorem');
 ck(g.G0_23_CI?.source?.id===37879801679&&g.G0_23_CI?.ssc?.id===37880017060,'prior Cl71 G0 CI unchanged');
 for(const id of [37885206752,37885659932])ck(g.historical_failures?.some(z=>z.run_id===id&&z.status==='failed'),'failed CI retained '+id);
 ck(g.outstanding_source_reconstruction?.some(y=>y.includes('L01 Table5 12 source paired D4')&&y.includes('NOT qualified')),'Table5 remaining Lie and physical obligations');
 ck(g.outstanding_source_reconstruction?.some(y=>y.includes('8x8')&&y.includes('H1')),'H1 source 8x8 remaining');
 ck(g.next_lawful_step?.startsWith('Continue independent L-only G0')&&g.next_lawful_step?.includes('full positive-chiral 8x8'),'next step stays source and earliest gate');
 ck(state.G0_source_audit_authorized===true&&state.G0_source_local_CI_verified===true,'G0 permitted');
 for(const name of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])
  ck(state[name]===false,'no stage promotion '+name);
 ck(g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner waiver only outside review calls');
 ck(!j(g).includes('W-SSC-'),'strict L track no W source');
 return errors;
}
const baseline=verify(),errors=[...baseline],muts=[
 ['fake G0 source freeze',g=>{g.current_source_census.frozen=true}],
 ['fake G0 completeness',g=>{g.current_source_census.source_complete=true}],
 ['G1 access',g=>{g.current_lawful_state.G1_authorized=true}],
 ['G4 access',g=>{g.current_lawful_state.G4_authorized=true}],
 ['G7 access',g=>{g.current_lawful_state.G7_authorized=true}],
 ['IA access',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ['W/L cross comparison',g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['merge unauthorized',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ['promote F4 theorem',g=>{g.L032_L033_Table5_T3_source.F4_48_root_real_form_theorem_qualified=true}],
 ['promote physical generations',g=>{g.L032_L033_Table5_T3_source.source_tentative_physical_generations_proved=true}],
 ['make H1 full proof',g=>{g.L032_L033_Table5_T3_source.full_H1_positive_8x8_field_entries_reconstructed=true}],
 ['make full D4 bracket proof',g=>{g.L032_L033_Table5_T3_source.D4_full_Lie_root_generators_closed=true}],
 ['invent E8 canonical T',g=>{g.L032_L033_Table5_T3_source.source_E8_global_triality_unique=true}],
 ['wrong source version',g=>{g.L032_L033_Table5_T3_source.frozen_source='arXiv:0711.0770v2'}],
 ['erase source root row',g=>{g.L032_L033_Table5_T3_source.D4_boson_root_instances=23}],
 ['erase Table6 spinor',g=>{g.L032_L033_Table5_T3_source.source_8V_weights=7}],
 ['wrong census SHA',g=>{g.current_source_census.git_blob_sha='STALE'}],
 ['wrong source SHA',g=>{g.L032_L033_Table5_T3_source.git_blob_sha='STALE'}],
 ['wrong checker pin',g=>{g.G0_24_CI.source_verifier.git_blob_sha='STALE'}],
 ['erase failed CI evidence',g=>{g.G0_24_CI.failed_ssc_verifier.mutations_tested=20}],
 ['pretend external review',g=>{g.G0_24_CI.ssc.external_cold_review_passed=true}],
 ['erase L05 O negative',g=>{g.L032_L033_Table5_T3_source.original_L05_octonion_negative_preserved=false}],
 ['invent W dependence',g=>{g.next_lawful_step+=' W-SSC-102'}]
];
let rejected=0;
if(!baseline.length)for(const [name,edit]of muts){const x=cp(G),prev=j(x);edit(x);if(j(x)===prev)errors.push('NOOP '+name);else if(verify(x).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage024-table5-source.v0.1',pass:errors.length===0,errors,source_items:191,source_changed:['L-SSC-032','L-SSC-033'],source_unchanged:189,adversarial_defined:muts.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_to_G7_authorized:false,external_cold_review_passed:false},null,2));if(errors.length)process.exitCode=1;
