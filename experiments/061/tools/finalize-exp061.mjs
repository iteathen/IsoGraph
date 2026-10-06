import fs from 'node:fs';

const pre=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/dnwf/DNWF_Q0_Q2_PREQUALIFICATION_AUDIT_0_1.json','utf8'));
const score=JSON.parse(fs.readFileSync('out/exp061/SCORE_DECODERS.json','utf8'));
const verifier=JSON.parse(fs.readFileSync('out/exp061/verifier/VERIFIER_REPORT.json','utf8'));
const metaA=JSON.parse(fs.readFileSync('out/exp061/decoder-A/METADATA.json','utf8'));
const metaB=JSON.parse(fs.readFileSync('out/exp061/decoder-B/METADATA.json','utf8'));
const vmeta=JSON.parse(fs.readFileSync('out/exp061/verifier/METADATA.json','utf8'));

const errors=[];
if(pre.q0?.disposition!=='PASS'||pre.q1?.disposition!=='PASS'||pre.q2?.disposition!=='PASS')errors.push('Q0-Q2 not all PASS');
if(pre.authority!==false)errors.push('prequalification unexpectedly authoritative');
if(score.disposition!=='PASS_CLASSIFICATION_PENDING_SEMANTIC_VERIFIER')errors.push('decoder classification stage failed');
if(score.decoder_A?.classification_matches!==19||score.decoder_B?.classification_matches!==19)errors.push('not 19/19 both decoders');
if(!score.packet_identity||!score.source_identity)errors.push('decoder packet/source mismatch');
for(const k of ['decoder_A_reason_coverage','decoder_B_reason_coverage','q5_mutation_coverage','candidate_scope_and_nonclaims','cold_isolation_evidence']){
 if(verifier[k]!=='PASS')errors.push('verifier '+k+'='+String(verifier[k]));
}
if(verifier.support_promotion!==true)errors.push('verifier does not support promotion');
if(metaA.semantic_status!=='FROZEN'||metaB.semantic_status!=='FROZEN'||vmeta.semantic_status!=='FROZEN')errors.push('semantic evidence not frozen');
if(metaA.packet_sha256!==metaB.packet_sha256)errors.push('decoder packet hash mismatch');
if(metaA.source_sha!==metaB.source_sha||metaA.source_sha!==vmeta.source_sha)errors.push('source SHA mismatch');

const result={
 experiment:'061',
 target:'DNWF_0_1',
 disposition:errors.length?'DOES_NOT_QUALIFY':'QUALIFICATION_EVIDENCE_COMPLETE_SUPPORTS_PROMOTION',
 errors,
 q0_q2:'PASS',
 decoder_A_classification:score.decoder_A?.classification_matches+'/19',
 decoder_B_classification:score.decoder_B?.classification_matches+'/19',
 verifier:{
  decoder_A_reason_coverage:verifier.decoder_A_reason_coverage,
  decoder_B_reason_coverage:verifier.decoder_B_reason_coverage,
  q5_mutation_coverage:verifier.q5_mutation_coverage,
  candidate_scope_and_nonclaims:verifier.candidate_scope_and_nonclaims,
  cold_isolation_evidence:verifier.cold_isolation_evidence,
  support_promotion:verifier.support_promotion
 },
 source_sha:metaA.source_sha,
 packet_sha256:metaA.packet_sha256,
 models:{decoder_A:metaA.model,decoder_B:metaB.model,verifier:vmeta.model},
 report_hashes:{decoder_A:metaA.report_sha256,decoder_B:metaB.report_sha256,verifier:vmeta.report_sha256},
 resource_provenance:{decoder_invocations:2,independent_verifier_invocations:1}
};
fs.writeFileSync('out/exp061/FINAL_EVIDENCE.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;
