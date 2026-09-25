import fs from 'node:fs';
import path from 'node:path';

const OUT=path.join(process.cwd(),'out','exp026-verifier');
const rp=path.join(OUT,'VERIFIER_REPORT.json');
const sp=path.join(OUT,'VALIDATION.json');

if(!fs.existsSync(rp)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(sp,JSON.stringify({status:'INFRASTRUCTURE_FAILURE',errors:['missing verifier report']},null,2)+'\n');
  process.exit(1);
}

const r=JSON.parse(fs.readFileSync(rp,'utf8'));
const errors=[];

if(!['SUPPORT_PROMOTION','DO_NOT_SUPPORT','INCOMPLETE'].includes(r.verdict)) errors.push('invalid verdict');
for(const field of [
  'candidate_hash_consistent',
  'public_holdout_covers_declared_burden',
  'decoder_report_complete_for_public_contract',
  'score_evidence_internally_consistent',
  'dependency_closure_supported',
  'base_profile_boundary_preserved'
]){
  if(typeof r[field]!=='boolean') errors.push(field+' must be boolean');
}
for(const field of ['overclaims','circularity_findings','evidence_gaps','scope_notes']){
  if(!Array.isArray(r[field])) errors.push(field+' must be array');
}
if(typeof r.reason!=='string'||r.reason.trim()==='') errors.push('reason must be nonempty');

const audit=r.self_audit??{};
for(const field of ['used_only_packet','did_not_use_hidden_assertions','did_not_rescore_hidden_expected_values']){
  if(audit[field]!==true) errors.push('self_audit '+field+' must be true');
}

const validation={
  status:errors.length===0?'VALID':'INVALID',
  errors,
  verdict:r.verdict??null
};
fs.writeFileSync(sp,JSON.stringify(validation,null,2)+'\n');
console.log(JSON.stringify(validation,null,2));
if(errors.length) process.exitCode=2;
