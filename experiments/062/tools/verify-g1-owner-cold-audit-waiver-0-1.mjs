import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const waiverPath='experiments/062/G1_OWNER_COLD_AUDIT_WAIVER_0_1.json';
const waiver=JSON.parse(fs.readFileSync(waiverPath,'utf8'));

const errors=[];
const fail=(m)=>errors.push(m);
const blob=(p)=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
const readJson=(p)=>JSON.parse(fs.readFileSync(p,'utf8'));

if(waiver.schema!=='isograph.exp062-g1-owner-cold-audit-waiver.v0.1') fail('schema mismatch');
if(waiver.status!=='OWNER_EXCEPTION_APPLIED_G1_CAMPAIGN_GATE_SATISFIED') fail('status mismatch');
if(waiver.method_effect!=='DOES_NOT_AMEND_OR_RELAX_GRAPH_FIRST_METHOD_0_2') fail('method-effect mismatch');
if(waiver.decision?.reusable!==false) fail('waiver must be non-reusable');

for(const track of ['W','L']){
  const p=waiver.pinned_inputs?.[track];
  if(!p) { fail(track+': pinned input missing'); continue; }
  if(blob(p.extraction)!==p.extraction_git_blob_sha) fail(track+': extraction blob changed');
  if(blob(p.fixed_point_record)!==p.fixed_point_git_blob_sha) fail(track+': fixed-point record blob changed');

  const fp=readJson(p.fixed_point_record);
  if(fp.current_input!==p.extraction) fail(track+': fixed-point current_input mismatch');
  if(fp.fixed_point?.source_local_zero_change!==true) fail(track+': source-local zero-change no longer true');
  if(fp.counts?.current_repeat_corrections!==0) fail(track+': repeat corrections no longer zero');

  const ext=readJson(p.extraction);
  if(!Array.isArray(ext.items)||ext.items.length!==p.frozen_bodies) fail(track+': frozen body count mismatch');
  const occurrences=ext.items.reduce((n,x)=>n+(Array.isArray(x.occurrences)?x.occurrences.length:0),0);
  if(occurrences!==p.occurrences) fail(track+': occurrence count mismatch');
}

const gate=waiver.gate_ruling||{};
if(gate.W_G1_method_complete!==false) fail('W method-complete must remain false');
if(gate.L_G1_method_complete!==false) fail('L method-complete must remain false');
if(gate.W_G1_accepted_for_this_campaign!==true) fail('W campaign acceptance missing');
if(gate.L_G1_accepted_for_this_campaign!==true) fail('L campaign acceptance missing');
if(gate.joint_G1_campaign_gate_satisfied!==true) fail('joint campaign G1 gate not satisfied');
if(gate.G2_authorized_for_this_campaign!==true) fail('G2 campaign authorization missing');
if(waiver.next_stage!=='G2_NEUTRAL_OCCURRENCE_GRAPH') fail('next stage mismatch');

const out={
  schema:'isograph.exp062-verify-g1-owner-cold-audit-waiver.v0.1',
  pass:errors.length===0,
  errors,
  waiver:waiverPath,
  W_extraction:waiver.pinned_inputs?.W?.extraction??null,
  L_extraction:waiver.pinned_inputs?.L?.extraction??null,
  campaign_joint_G1_gate_satisfied:gate.joint_G1_campaign_gate_satisfied===true,
  G2_authorized_for_this_campaign:gate.G2_authorized_for_this_campaign===true,
  method_0_2_amended:false,
  note:'This verifies the one-time campaign exception only. It does not convert the skipped cold audits into method-conforming evidence.'
};
console.log(JSON.stringify(out,null,2));
if(errors.length) process.exit(1);
