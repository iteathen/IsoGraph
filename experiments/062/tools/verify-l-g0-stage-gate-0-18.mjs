import fs from 'node:fs';import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const paths={
gate:E+'L_CURRENT_STAGE_GATE_0_18.json',previous:E+'L_CURRENT_STAGE_GATE_0_17.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_17.json',
proof:L+'LISI_L05_O_RATIONAL_BIVECTOR_CERTIFICATE_G0_0_1.json',
proofVerifier:E+'tools/verify-l-g0-o-rational-bivector-0-1.mjs',
sscVerifier:E+'tools/verify-l-g0-l127-ssc-source-0-17.mjs',
priorDefect:E+'L_G0_GATE017_STALE_EQ5_INDEX_STATUS_DEFECT_0_1.json',
priorPublication:L+'LISI_L05_OCTONION_INDEPENDENT_VERSION_REAUDIT_0_1.json'
};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),J=JSON.stringify,copy=x=>JSON.parse(J(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=get(paths.gate),old=get(paths.previous),SSC=get(paths.ssc),Q=get(paths.proof),Defect=get(paths.priorDefect);
const oldBroken=Defect.confirmed_historical_copy_error;
function verify(g=G){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)};
 const route=g.current_lawful_state||{},p=g.current_Eq5_exact_Q_certificate||{},ci=g.G0_18_CI||{},oldStatus=g.supersedes||{};
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.18'&&g.track==='L'&&g.semantic_authority===false&&g.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY','only procedural G0 research authority');
 ck(g.status==='L_G0_SSC_0_17_Q_RATIONAL_SOURCE_NEGATIVE_CI_AND_STALE_STATUS_REPAIRED_PARTIAL_UNFROZEN_G1_G7_FORBIDDEN','exact gate G0 status/qualification');
 ck(oldStatus.path===paths.previous&&oldStatus.git_blob_sha===sha(paths.previous),'parent G0 gate exact published Git blob');
 ck(g.current_source_census?.path===paths.ssc&&g.current_source_census?.git_blob_sha===sha(paths.ssc)&&g.current_source_census?.source_identities===191&&
  J(g.current_source_census?.changed_from_predecessor)===J(['L-SSC-127'])&&g.current_source_census?.unchanged_from_predecessor===190,'current 191 IDs / 190 entire source records unchanged');
 ck(g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false&&SSC.guards.source_census_freeze_complete===false,'no source-frozen G0 claim');
 ck(p.path===paths.proof&&p.git_blob_sha===sha(paths.proof)&&p.source_repaired===false,'Q source proof exact pin and unmodified journal');
 ck(p.original_signed_source_cell_e6e7==='-e2'&&p.original_signed_source_cell_e7e6==='-e2','both original published O cells conserved');
 ck(p.rational_source_operator_variants===4&&p.diagnostic_counterfactual_variants===4&&p.generator_basis_rank_Q===28&&p.commutators_tested_each===378&&p.original_outside_span_Q_each===168&&p.alternative_outside_span_Q_each===0,'all eight Q source tests and full exact counts');
 ck(p.sparse_analytic_witness?.includes('commutator [B01,B06] evaluates +2')&&p.full_ordinary_O_source_assertion_consistency===false,'exact 2-entry rational nonclosure witness not named theorem');
 for(const key of ['intended_corrected_full_f4_theorem_qualified','author_erratum_proved','G1_authorized'])ck(p[key]===false,'no unearned author/mathematical/qualification '+key);
 ck(Q.all_eight_variants_exact_rational?.length===8&&Q.external_review_passed===false&&SSC.revision?.G1_authorized===false,'adversarial Q source packet not external');
 ck(ci.exact_rational_CI?.id===37856322251&&ci.exact_rational_CI?.conclusion==='success'&&ci.exact_rational_CI?.adversarial_rejected===24&&ci.exact_rational_CI?.external_review_passed===false,'exact rational source CI no external');
 ck(ci.SSC0_17_CI?.id===37856608771&&ci.SSC0_17_CI?.conclusion==='success'&&ci.SSC0_17_CI?.adversarial_rejected===20&&ci.SSC0_17_CI?.unchanged_complete_source_items===190&&ci.SSC0_17_CI?.external_review_passed===false,'exact source SSC0.17 conservation CI');
 ck(ci.original_publication_technical_recheck?.id===37851752108&&ci.original_publication_technical_recheck?.conclusion==='success'&&ci.original_publication_technical_recheck?.adversarial_rejected===22&&ci.original_publication_technical_recheck?.external_review_passed===false,'old published source version recheck bounded');
 for(const [slot,name]of[['exact_Q_verifier','proofVerifier'],['SSC0_17_verifier','sscVerifier'],['old_gate_status_defect','priorDefect'],['independent_publication_version_packet','priorPublication']]){
 const v=ci[slot]||{},q=paths[name];ck(v.path===q&&v.git_blob_sha===sha(q),'exact reference '+slot);
 }
 ck(ci.source_census_frozen===false&&ci.mathematical_theorem_qualified===false&&ci.G1_authorized===false,'passing tests do not grant source theorem authority');
 for(const id of [37851631738,37856511570])ck(g.historical_failures?.some(x=>x.run_id===id&&x.status==='failed'),'historical failed intermediate runs preserved '+id);
 const notes=g.outstanding_source_reconstruction||[];
 ck(notes.length===old.outstanding_source_reconstruction.length,'all outstanding source obligations conserved 1:1 through semantic replacements');
 ck(notes.some(x=>x.includes('Eq(5) Γ/M-indexed formulas ARE TRANSCRIBED')&&x.includes('NOT mathematical')),'Eq5 current source transcription vs math failure not conflated');
 ck(notes.some(x=>x.includes('Eq(17) four compact-source')&&x.includes('AFTER Eq(17)')),'Eq17 current source transcription vs remaining work not conflated');
 for(const historical of oldBroken)ck(!notes.includes(historical)&&!J(notes).includes(historical),'stale historical gate status removed without deleting its defect artifact');
 for(const ongoing of old.outstanding_source_reconstruction.filter(x=>!oldBroken.includes(x)))ck(notes.includes(ongoing),'all otherwise still-open source obligations untouched '+ongoing.slice(0,45));
 ck(g.historical_invalidation?.historical_gate_017_extraction_status==='REPAIRED_IN_SUCCESSOR_G0_018_WITHOUT_UPGRADING_SCOPE','source metadata repair not stage closure');
 ck(g.next_lawful_step?.startsWith('Remain in L-only G0')&&g.next_lawful_step?.includes('all six frozen L01-L06'),'complete source cold audit still required');
 ck(route.G0_source_audit_authorized===true&&route.G0_source_local_CI_verified===true,'G0 source-local only');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ck(route[k]===false,'do not promote '+k);
 ck(g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE'&&g.nonclaims?.some(x=>x.includes('independent external cold review')),'external reviewer waiver not review PASS');
 ck(!J(g).includes('W-SSC-'),'W source isolation');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['source G1 premature',g=>{g.current_lawful_state.G1_authorized=true}],
 ['source G7 premature',g=>{g.current_lawful_state.G7_authorized=true}],
 ['source IA premature',g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ['source W-L premature',g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['source merge premature',g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ['claim source frozen',g=>{g.current_source_census.frozen=true}],
 ['claim source complete',g=>{g.current_source_census.source_complete=true}],
 ['invent whole f4 theorem',g=>{g.current_Eq5_exact_Q_certificate.intended_corrected_full_f4_theorem_qualified=true}],
 ['call author formal erratum',g=>{g.current_Eq5_exact_Q_certificate.author_erratum_proved=true}],
 ['normalize published source O sign',g=>{g.current_Eq5_exact_Q_certificate.original_signed_source_cell_e6e7='e2'}],
 ['alter exact 168 rational results',g=>{g.current_Eq5_exact_Q_certificate.original_outside_span_Q_each=0}],
 ['erase spare witness',g=>{g.current_Eq5_exact_Q_certificate.sparse_analytic_witness='not proved'}],
 ['source Q certificate SHA stale',g=>{g.current_Eq5_exact_Q_certificate.git_blob_sha='bad'}],
 ['source SSC SHA stale',g=>{g.current_source_census.git_blob_sha='bad'}],
 ['source verifier SHA stale',g=>{g.G0_18_CI.exact_Q_verifier.git_blob_sha='bad'}],
 ['forget error status correction',g=>{g.outstanding_source_reconstruction[0]=oldBroken[0]}],
 ['forget Eq17 correction',g=>{g.outstanding_source_reconstruction[1]=oldBroken[1]}],
 ['remove Eq4 unclosed obligation',g=>{g.outstanding_source_reconstruction=g.outstanding_source_reconstruction.filter(x=>!x.includes('Eq.(4)'))}],
 ['erase historical failed test',g=>{g.historical_failures=g.historical_failures.filter(x=>x.run_id!==37856511570)}],
 ['invent external pass',g=>{g.G0_18_CI.SSC0_17_CI.external_review_passed=true}],
 ['cross-track contamination',g=>{g.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [label,mutation]of mutants){
 const d=copy(G),before=J(d);mutation(d);if(J(d)===before)errors.push('NOOP '+label);
 else if(verify(d).length===0)errors.push('ESCAPED '+label);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-stage018-source-rational-integrity.v0.1',pass:errors.length===0,errors,
 source_items:191,source_declared_complete:false,source_l127_Q_outside_span_each:168,
 previously_stale_source_statuses_repaired:2,
 adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED_NO_MUTANTS':'TESTED',
 G1_to_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
