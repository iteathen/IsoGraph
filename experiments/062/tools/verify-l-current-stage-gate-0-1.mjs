import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const gatePath='experiments/062/L_CURRENT_STAGE_GATE_0_1.json';
const contractPath='experiments/062/L_G1_COLD_AUDIT_0_25_CONTRACT_0_1.json';
const fixedPointPath='experiments/062/L_G1_COMPLETE_REPEAT_AUDIT_0_1.json';
const extractionPath='experiments/062/L_EXTRACTION_RECONCILED_0_25.json';
const extractionVerifierPath='experiments/062/tools/verify-l-extraction-reconciled-0-25.mjs';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const methodPath='research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';

const failList=[];
const fail=m=>failList.push(m);
const read=p=>fs.readFileSync(p,'utf8');
const blob=v=>execFileSync('git',['hash-object','--stdin'],{input:v,encoding:'utf8'}).trim();
const json=p=>JSON.parse(read(p));

for(const p of [gatePath,contractPath,fixedPointPath,extractionPath,extractionVerifierPath,corpusPath,methodPath]){
  if(!fs.existsSync(p)) fail('missing '+p);
}
if(failList.length){
  console.log(JSON.stringify({schema:'isograph.exp062-verify-l-current-stage-gate.v0.1',pass:false,errors:failList},null,2));
  process.exit(1);
}

const gate=json(gatePath);
const contract=json(contractPath);
const fixed=json(fixedPointPath);
const extraction=json(extractionPath);

const currentBlobs={
  contract:blob(read(contractPath)),
  fixed_point:blob(read(fixedPointPath)),
  extraction:blob(read(extractionPath)),
  extraction_verifier:blob(read(extractionVerifierPath)),
  corpus:blob(read(corpusPath)),
  method:blob(read(methodPath))
};

if(gate.status!=='L_G1_CURRENT_INPUT_COLD_AUDIT_REQUIRED_DOWNSTREAM_G2_G5_PROVISIONAL_UNAUTHORIZED') fail('gate status');
if(gate.semantic_authority!==false) fail('gate semantic_authority');
if(gate.track!=='L') fail('gate track');
if(gate.governing_method!==methodPath) fail('gate governing method');

if(gate.controlling_gate?.source_local_fixed_point?.path!==fixedPointPath) fail('gate fixed-point path');
if(gate.controlling_gate?.source_local_fixed_point?.git_blob_sha!==currentBlobs.fixed_point) fail('gate fixed-point blob pin');
if(gate.controlling_gate?.cold_audit_contract?.path!==contractPath) fail('gate contract path');
if(gate.controlling_gate?.cold_audit_contract?.git_blob_sha!==currentBlobs.contract) fail('gate contract blob pin');

const s=gate.current_lawful_state||{};
for(const k of ['G1_independent_cold_audit_complete','L_G1_complete','joint_G1_complete','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G6_authorized','recursive_IA_authorized','cross_track_comparison_authorized','track_sealed']){
  if(s[k]!==false) fail('gate state '+k+' must be false');
}
if(s.G1_source_local_zero_change!==true) fail('gate state G1_source_local_zero_change');

if(gate.downstream_artifact_disposition?.status!=='PROVISIONAL_UNAUTHORIZED_DOWNSTREAM_EVIDENCE_DO_NOT_CONSUME_AS_STAGE_COMPLETION') fail('downstream disposition');
for(const p of gate.downstream_artifact_disposition?.artifacts||[]){
  if(!fs.existsSync(p)) fail('listed provisional artifact missing '+p);
}

if(contract.status!=='FROZEN_CURRENT_INPUT_COLD_AUDIT_CONTRACT_PROVIDER_WINDOW_ACTIVE_NOT_RUN') fail('contract status');
if(contract.track!=='L'||contract.semantic_authority!==false) fail('contract track/authority');
if(contract.input?.extraction?.path!==extractionPath||contract.input?.extraction?.git_blob_sha!==currentBlobs.extraction) fail('contract extraction pin');
if(contract.input?.deterministic_verifier?.path!==extractionVerifierPath||contract.input?.deterministic_verifier?.git_blob_sha!==currentBlobs.extraction_verifier) fail('contract verifier pin');
if(contract.input?.source_local_fixed_point?.path!==fixedPointPath||contract.input?.source_local_fixed_point?.git_blob_sha!==currentBlobs.fixed_point) fail('contract fixed-point pin');
if(contract.input?.corpus?.path!==corpusPath||contract.input?.corpus?.git_blob_sha!==currentBlobs.corpus) fail('contract corpus pin');
if(contract.governing_method?.path!==methodPath||contract.governing_method?.git_blob_sha!==currentBlobs.method) fail('contract method pin');

if(contract.audit_contract?.independent!==true) fail('audit independent');
if(contract.audit_contract?.all_rows_required!==151) fail('audit row count');
if(contract.audit_contract?.older_audit_evidence_reuse_forbidden!==true) fail('old audit reuse must be forbidden');
if(contract.audit_contract?.textbook_semantics_forbidden!==true) fail('textbook semantics must be forbidden');
if(contract.audit_contract?.primitive_candidate_generation_forbidden!==true) fail('primitive candidate generation must be forbidden');
if(contract.audit_contract?.cross_track_inference_forbidden!==true) fail('cross-track inference must be forbidden');

if(extraction.track!=='L'||extraction.items?.length!==151) fail('extraction shape');
const occCount=(extraction.items||[]).reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(occCount!==818) fail('extraction occurrence count');

if(fixed.fixed_point?.source_local_zero_change!==true) fail('fixed point zero-change');
if(fixed.fixed_point?.L_candidate_frozen_for_independent_cold_audit!==true) fail('fixed point frozen');
if(fixed.fixed_point?.L_G1_complete!==false) fail('fixed point L G1 must be incomplete');
if(fixed.fixed_point?.joint_G1_complete!==false) fail('fixed point joint G1 must be incomplete');
if(fixed.fixed_point?.G2_authorized!==false) fail('fixed point G2 must be blocked');
if(fixed.counts?.current_repeat_corrections!==0) fail('fixed point correction count');

const g=contract.gate||{};
for(const k of ['L_G1_complete','joint_G1_complete','G2_authorized','G3_authorized','G4_authorized','G5_authorized','recursive_IA_authorized','cross_track_comparison_authorized']){
  if(g[k]!==false) fail('contract gate '+k+' must be false');
}
if(g.source_local_zero_change!==true) fail('contract source-local zero-change');

const provider=contract.provider||{};
if(provider.current_action!=='DO_NOT_CALL_PROVIDER_BEFORE_NOT_BEFORE_WINDOW') fail('provider current action');
const notBefore=provider.latest_known_quota_evidence?.implied_not_before_utc;
if(notBefore!==gate.provider_transport_boundary?.latest_known_quota_attempt?.implied_not_before_utc) fail('provider not-before mismatch');
if(gate.provider_transport_boundary?.request_emitted_for_L_0_25!==false) fail('unexpected L 0.25 request state');
if(provider.latest_known_quota_evidence?.workflow_run_id!==37544009233) fail('provider evidence run id');

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-l-current-stage-gate.v0.1',
  pass:failList.length===0,
  errors:failList,
  track:'L',
  extraction:extractionPath,
  items:extraction.items?.length,
  occurrences:occCount,
  source_local_zero_change:s.G1_source_local_zero_change,
  independent_cold_audit_complete:s.G1_independent_cold_audit_complete,
  L_G1_complete:s.L_G1_complete,
  G2_authorized:s.G2_authorized,
  provider_not_before_utc:notBefore,
  downstream_status:gate.downstream_artifact_disposition?.status
},null,2));
if(failList.length) process.exitCode=1;
