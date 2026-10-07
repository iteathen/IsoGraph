import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const freezePath='experiments/062/W_G4_FIXED_POINT_0_1.json';
const freeze=JSON.parse(fs.readFileSync(freezePath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

if(freeze.schema!=='isograph.exp062-w-g4-fixed-point.v0.1') fail('schema mismatch');
if(freeze.status!=='W_G4_FIXED_POINT_COMPLETE_W_LOCAL_G5_AUTHORIZED') fail('status mismatch');
if(freeze.track!=='W'||freeze.comparison_scope!=='W_ONLY') fail('scope mismatch');
if(freeze.authority!==false) fail('freeze must remain research evidence only');

for(const key of ['g3_fixed_point','g4_quotient','generator','verifier']){
  const x=freeze.input?.[key];
  if(!x?.path||!x?.git_blob_sha) { fail(key+': missing pin'); continue; }
  if(blob(x.path)!==x.git_blob_sha) fail(key+': blob pin mismatch');
}

const v=freeze.verification||{};
if(v.conclusion!=='success') fail('verification conclusion is not success');
for(const [k,val] of Object.entries({
  unresolved_roots:412,
  core_closed_roots:13,
  quotient_classes:352,
  singleton_classes:324,
  multi_member_classes:28,
  largest_class_size:12
})) if(v[k]!==val) fail('verification count mismatch '+k);
for(const k of ['exact_class_internal_isomorphism','duplicate_isomorphic_class_check','source_text_relabel_invariance','deterministic_replay_exact']){
  if(v[k]!==true) fail('verification flag false '+k);
}

const fp=freeze.fixed_point||{};
if(fp.W_G4_complete!==true||fp.W_local_G5_authorized!==true) fail('W G4/G5 gate not open');
if(fp.cross_track_comparison_authorized!==false||fp.global_G5_authorized!==false) fail('cross-track/global gate overclaim');
if(freeze.next_stage!=='W_LOCAL_G5_CANDIDATE_BASIS_SYNTHESIS') fail('next stage mismatch');

execFileSync('node',[freeze.input.verifier.path],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',freeze.input.g4_quotient.path],{encoding:'utf8'});
if(diff.trim()) fail('underlying G4 verifier/replay changed quotient');

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-g4-fixed-point.v0.1',
  pass:errors.length===0,
  errors,
  W_G4_complete:fp.W_G4_complete===true,
  W_local_G5_authorized:fp.W_local_G5_authorized===true,
  cross_track_comparison_authorized:false
},null,2));
if(errors.length) process.exit(1);
