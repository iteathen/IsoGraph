import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
  const b=Buffer.from(read(p),'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[];
const check=(ok,msg)=>{if(!ok)errors.push(msg);};

const B=json('experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json');
const L=json('experiments/062/L_CURRENT_STAGE_GATE_0_2.json');
const W=json('experiments/062/W_CURRENT_STAGE_GATE_0_1.json');
const Q=json('experiments/063/OWNER_WAIVER_PROVISIONAL_QUALIFICATION_0_1.json');
const SSC=json('experiments/063/MODULE_SSC_0_1.json');
const IA=json('experiments/063/MODULE_IA_FIXED_POINT_0_1.json');
const CASES=json('experiments/063/QUALIFICATION_CASES_0_1.json');
const PB=json('experiments/063/PROVIDER_BOUNDARY_0_1.json');
const manifest=read('qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md');

check(B.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','bypass inactive');
check(JSON.stringify(B.scope?.tracks)==='["W","L"]','track scope');
check(B.routing?.independently_verified_claim_allowed===false,'independent claim guard');
check(B.evidence_labels?.global_external_verification_state==='INCOMPLETE_EVIDENCE','global evidence state');
check(B.routing?.global_qualified_module_manifest_may_be_changed===false,'manifest mutation guard');

for(const rec of [
  B.g1_inputs.W.extraction,B.g1_inputs.W.fixed_point_record,
  B.g1_inputs.L.extraction,B.g1_inputs.L.fixed_point_record,
  L.owner_bypass,L.controlling_g1.extraction,L.controlling_g1.source_local_fixed_point,
  L.downstream_pin_chain.g2_graph,L.downstream_pin_chain.g3_fixed_point,L.downstream_pin_chain.g4_fixed_point,
  L.downstream_pin_chain.g5_synthesis,L.downstream_pin_chain.g5_source_sufficiency_review,L.downstream_pin_chain.g5_fixed_point,
  W.owner_bypass,W.g1.extraction,W.g1.source_local_fixed_point,
  W.downstream_pin_chain.g2,W.downstream_pin_chain.g3,W.downstream_pin_chain.g4,W.downstream_pin_chain.g5,W.downstream_pin_chain.g5_reopening,
  W.g6.provisional_qualification,
  Q.owner_bypass,Q.frozen_inputs.module_ssc,Q.frozen_inputs.module_ia_fixed_point,Q.frozen_inputs.qualification_cases,
  Q.frozen_inputs.candidate_md,Q.frozen_inputs.candidate_native,Q.frozen_inputs.w_hypothesis,Q.frozen_inputs.w_reopening,
  Q.external_verification.provider_boundary
]){
  check(fs.existsSync(rec.path),'missing pin '+rec.path);
  if(fs.existsSync(rec.path))check(blobSha(rec.path)===rec.git_blob_sha,'blob mismatch '+rec.path);
}

check(L.status==='L_G1_ACCEPTED_UNDER_OWNER_EXTERNAL_BYPASS_G2_G5_CHAIN_RESTORED_CURRENT_AUTHORITY_BOUNDARY','L gate status');
check(L.current_lawful_state?.G1_source_local_zero_change===true,'L G1 fixed point');
check(L.current_lawful_state?.G1_external_verification_complete===false,'L external evidence false');
check(L.current_lawful_state?.G2_authorized===true&&L.current_lawful_state?.G5_complete===true,'L downstream restored');
check(L.current_lawful_state?.G6_candidate_exists===false,'L no fabricated G6 candidate');

check(W.status==='W_G6_CANDIDATE_CAMPAIGN_PROVISIONALLY_QUALIFIED_G7_EXPLICIT_REOPENING_AUTHORIZED','W gate status');
check(W.g6?.global_disposition==='INCOMPLETE_EVIDENCE','W global evidence');
check(W.g6?.campaign_consumption_allowed===true,'W campaign consumption');
check(W.g6?.globally_qualified===false,'W global qualification guard');
check(W.current_lawful_state?.G7_authorized===true&&W.current_lawful_state?.G7_scope==='EXPLICIT_DEPENDENCIES_ONLY','W G7 routing');
check(JSON.stringify(W.explicit_dependency_scope?.W_bodies)==='["W-SSC-029","W-SSC-149"]','W body scope');
check(JSON.stringify(W.explicit_dependency_scope?.W_occurrences)==='["W-SSC-029-O03","W-SSC-029-O04","W-SSC-149-O02","W-SSC-149-O03"]','W occurrence scope');

check(Q.status==='OWNER_WAIVER_PROVISIONAL_QUALIFIED_WITH_EXPLICIT_SCOPE','provisional qualification status');
check(Q.global_semantic_authority===false&&Q.campaign_semantic_authority===true,'authority split');
check(Q.external_verification?.complete===false&&Q.external_verification?.globally_qualified!==true,'external evidence');
check(Q.external_verification?.global_disposition==='INCOMPLETE_EVIDENCE','qualification global disposition');
check(Q.campaign_disposition?.W_may_consume_candidate===true,'campaign consume');
check(Q.campaign_disposition?.global_qualified_module_manifest_update===false,'manifest gate');
check(Q.deterministic_preflight?.conclusion==='success'&&Q.deterministic_preflight?.cases_passed===10&&Q.deterministic_preflight?.cases_total===10,'preflight evidence');
check(Q.internal_scope_review?.result==='PASS_WITH_EXPLICIT_SCOPE','scope review');
check(Q.internal_scope_review?.semantic_overreach_detected===false,'overreach');
check(Q.internal_scope_review?.hidden_ACT_to_VARIATION_derivation_detected===false,'ACT derivation');
check(Q.internal_scope_review?.W_domain_leakage_into_candidate_detected===false,'domain leakage');

check(SSC.assertions?.length===8&&SSC.explicit_nonclaims?.length===4,'SSC census');
check(IA.fixed_point?.complete===true&&IA.fixed_point?.open_module_local_ia===0,'module IA fixed point');
check(CASES.cases?.length===10,'qualification cases');
check(PB.ruling?.candidate_qualified===false,'provider boundary factual candidate status');
check(PB.ruling?.W_may_consume_candidate===false,'provider boundary preserved');
check(!/211000|VARIATIONAL_STATIONARITY_INTERFACE_0_1|PRIMITIVE_BIVARIATE_ACTION_VARIATION_SCHEMA_0_1/.test(manifest),'global qualified manifest contaminated');

console.log(JSON.stringify({
 schema:'isograph.owner-external-verification-bypass-verifier.v0.2',
 pass:errors.length===0,
 errors,
 routing:{
   owner_bypass:B.status,
   L:L.status,
   W:W.status,
   G6_campaign_disposition:Q.campaign_disposition?.disposition,
   global_external_state:Q.external_verification?.global_disposition
 }
},null,2));
if(errors.length)process.exitCode=1;
