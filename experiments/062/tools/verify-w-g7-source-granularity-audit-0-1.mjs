import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
  const b=Buffer.from(read(p),'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const A=json('experiments/062/W_G7_SOURCE_GRANULARITY_AUDIT_0_1.json');
const B=json('experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json');
const C=json('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json');
const WSSC=json('research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json');
const G7=json('experiments/062/W_G7_VARIATIONAL_STATIONARITY_INSTANTIATION_0_1.json');

check(A.status==='SOURCE_LOCAL_GRANULARITY_AUDIT_COMPLETE_TARGETED_SSC_CORRECTION_REQUIRED','audit status');
check(A.authority===false && A.authority_effect==='NONE_RESEARCH_EVIDENCE_ONLY','authority leak');
check(A.governing_method.endsWith('PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md'),'method 0.3');
check(B.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','bypass inactive');
check(B.routing?.G1_campaign_accepted_under_owner_bypass===true,'campaign bypass routing');
check(A.owner_external_verification_bypass?.active===true,'audit bypass state');
check(A.scope?.source_expansion===false && A.scope?.source_corpus_unchanged===true,'source expansion');
check(A.scope?.cross_track_evidence_used===false && A.scope?.L_evidence_used===false,'cross-track leakage');

for(const rec of Object.values(A.inputs)){
  check(fs.existsSync(rec.path),'missing pin '+rec.path);
  if(fs.existsSync(rec.path))check(blobSha(rec.path)===rec.git_blob_sha,'blob mismatch '+rec.path);
}

const ids=['W-SSC-029','W-SSC-149'];
check(JSON.stringify(A.scope?.target_census_ids)===JSON.stringify(ids),'target census scope');
for(const id of ids){
  const d=C.items.find(x=>x.track==='W'&&x.census_id===id);
  const s=WSSC.items.find(x=>x.id===id);
  check(!!d && !!s,'missing source item '+id);
  check(d.body===s.obligation,'demand/SSC body mismatch '+id);
  const obs=A.source_local_observations.find(x=>x.census_id===id);
  check(obs?.current_body===d.body,'audit current body mismatch '+id);
  check((obs?.source_visible_structure_not_conserved_in_current_body||[]).length>=4,'insufficient source audit '+id);
  check((obs?.insufficient_even_after_conservation||[]).some(x=>/variation directions/i.test(x)),'direction gap '+id);
  check((obs?.insufficient_even_after_conservation||[]).some(x=>/total or single-valued/i.test(x)),'totality gap '+id);
  check((obs?.insufficient_even_after_conservation||[]).some(x=>/zero-first-variation/i.test(x)),'zero gap '+id);
}

check(A.source_conservation_ruling?.result==='TARGETED_SSC_CORRECTION_REQUIRED_BEFORE_ANY_LOWER_CANDIDATE_MAY_CONSUME_THE_NEW_DETAIL','source correction ruling');
check(A.source_conservation_ruling?.historical_inputs_immutable===true,'historical mutation allowed');
check(JSON.stringify(A.source_conservation_ruling?.reopen_only)===JSON.stringify(ids),'reopen scope');
check(A.primitive_211000_ruling?.result==='UNCHANGED_SOURCE_INSTANCE_INSUFFICIENT_FOR_211000','211000 ruling');
check(A.primitive_211000_ruling?.source_instance_closed_occurrences===0,'unexpected W closure');
check(G7.ruling?.primitive_211000_consumed_to_close_W===false,'prior G7 changed');

const layers=Object.fromEntries((A.decomposition_layers||[]).map(x=>[x.layer,x]));
check(layers.D0?.source_support==='SUPPORTED_MORE_STRONGLY_AFTER_SOURCE_CORRECTION','D0');
check(/UNDEFINED/.test(layers.D1?.source_support||''),'D1 boundary');
check(layers.D4?.source_support==='ABSENT','D4 boundary');

const probes=Object.fromEntries((A.hypothesis_probes||[]).map(x=>[x.hypothesis_id,x]));
check(probes['W-G5H-VAR-LOWER-001']?.disposition==='REJECT_BEFORE_G6_NO_EVASION_OPAQUE_VARIATION_RENAMING','weak probe disposition');
check(probes['W-G5H-VAR-LOWER-002']?.disposition==='REJECT_FOR_W_SOURCE_INSTANCE_UNSUPPORTED_TRANSFORMATION_SEMANTICS','strong probe disposition');
for(const p of Object.values(probes)){
  for(const k of ['origin','parent_residual','candidate_statement','declared_scope','motivating_evidence','prohibited_evidence','predicted_consequences','known_alternatives','positive_controls','negative_adversarial_controls','falsifier','adaptive_evidence','fresh_confirmation_status','coverage_limits','revision_lineage','disposition']) check(p[k]!==undefined,'probe missing '+k);
}
check(A.conclusion?.lower_generic_candidate_currently_justified===false,'candidate unexpectedly justified');
check(A.conclusion?.current_source_supports_internal_variation_behavior===false,'variation behavior imported');
check((A.nonclaims||[]).some(x=>/does not close any W occurrence/.test(x)),'closure nonclaim');
check((A.nonclaims||[]).some(x=>/does not use L evidence/.test(x)),'L nonclaim');
check((A.nonclaims||[]).some(x=>/does not claim external verification passed/.test(x)),'external nonclaim');

console.log(JSON.stringify({
 schema:'isograph.exp062-w-g7-source-granularity-audit-verifier.v0.1',
 pass:errors.length===0,
 errors,
 status:A.status,
 correction:A.source_conservation_ruling?.result,
 weak_probe:probes['W-G5H-VAR-LOWER-001']?.disposition,
 strong_probe:probes['W-G5H-VAR-LOWER-002']?.disposition
},null,2));
if(errors.length)process.exitCode=1;
