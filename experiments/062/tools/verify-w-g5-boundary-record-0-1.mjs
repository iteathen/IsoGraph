import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const recordPath='experiments/062/W_G5_FIXED_POINT_0_1.json';
const record=JSON.parse(fs.readFileSync(recordPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

if(record.schema!=='isograph.exp062-w-g5-fixed-point.v0.1') fail('schema mismatch');
if(record.status!=='W_LOCAL_G5_COMPLETE_CURRENT_AUTHORITY_BOUNDARY') fail('status mismatch');
if(record.track!=='W'||record.authority!==false) fail('track/authority mismatch');

for(const key of ['g4_fixed_point','synthesis','source_sufficiency_review','verifier']){
  const x=record.input?.[key];
  if(!x?.path||!x?.git_blob_sha){fail(key+': missing pin');continue;}
  if(blob(x.path)!==x.git_blob_sha) fail(key+': blob pin mismatch');
}

const v=record.verification||{};
if(v.conclusion!=='success'||v.quotient_classes!==352||v.multi_member_classes!==28||
   v.uniform_multi_member_classes!==5||v.heterogeneous_multi_member_classes!==23||
   v.proposed_reusable_candidates!==0||v.unresolved_boundaries!==352) fail('verification summary mismatch');

const fp=record.fixed_point||{};
if(fp.W_local_G5_complete!==true||fp.W_local_G6_required!==false) fail('G5/G6 gate mismatch');
if(fp.W_track_primitive_closure_complete!==false||fp.W_track_IA_authorized!==false||
   fp.W_track_NEI_DTS_DP_authorized!==false||fp.W_track_sealed!==false) fail('downstream gate overclaim');
if(fp.cross_track_comparison_authorized!==false) fail('cross-track gate overclaim');
if(fp.boundary_kind!=='GENUINE_CURRENT_AUTHORITY_PRIMITIVE_DOMAIN_BOUNDARY') fail('boundary kind mismatch');

execFileSync('node',[record.input.verifier.path],{stdio:'pipe'});

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-g5-boundary-record.v0.1',
  pass:errors.length===0,
  errors,
  W_local_G5_complete:fp.W_local_G5_complete===true,
  W_local_G6_required:false,
  W_track_primitive_closure_complete:false,
  W_track_IA_authorized:false,
  W_track_NEI_DTS_DP_authorized:false,
  W_track_sealed:false,
  cross_track_comparison_authorized:false
},null,2));
if(errors.length) process.exit(1);
