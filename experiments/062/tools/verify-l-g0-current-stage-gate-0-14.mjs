import fs from 'node:fs';import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const p={gate:E+'L_CURRENT_STAGE_GATE_0_14.json',old:E+'L_CURRENT_STAGE_GATE_0_13.json',audit:E+'L_G0_TO_G7_HOSTILE_STAGE_PROVENANCE_AUDIT_0_1.json',v:E+'tools/verify-l-g0-to-g7-hostile-stage-provenance-0-1.mjs',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_13.json'};
const get=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=get(p.gate),S=get(p.ssc),A=get(p.audit);
function chk(g=G){
 const errors=[],ok=(x,s)=>{if(!x)errors.push(s)},c=g.current_lawful_state||{},z=g.G0_14_hostile_stage_audit||{},r=z.CI||{};
 ok(g.schema==='isograph.exp062-l-current-stage-gate.v0.14'&&g.status.includes('G0')&&g.track==='L','current L G0 only');
 ok(g.supersedes?.path===p.old&&g.supersedes?.git_blob_sha===sha(p.old),'exact predecessor stage');
 ok(g.current_source_census?.path===p.ssc&&g.current_source_census?.git_blob_sha===sha(p.ssc)&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&j(g.current_source_census?.changed_from_predecessor)===j(['L-SSC-126']),'191 identities and one changed');
 ok(g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false&&S.guards?.source_census_freeze_complete===false,'G0 not frozen');
 ok(z.audit?.path===p.audit&&z.audit?.git_blob_sha===sha(p.audit)&&z.verifier?.path===p.v&&z.verifier?.git_blob_sha===sha(p.v),'hostile stage audit and verifier exact pin');
 ok(r.run_id===37834981548&&r.conclusion==='success'&&r.stage_mutations_rejected===26&&r.stage_mutations_defined===26&&r.external_cold_review_passed===false,'26 independent stage mutations not external pass');
 ok(r.verified_older_stages?.length===7&&r.source_mathematical_conflict_known===true,'G1-G7 stages not upgraded');
 ok(g.G0_13_CI?.run_id===37834466685&&g.G0_13_CI?.conclusion==='success'&&g.L126_new_source_discrepancy?.failing_pairs===7&&g.L126_new_source_discrepancy?.failing_16x16_entries===28,'unrepaired source contradiction');
 ok(A.stage_lineage?.G3?.old_scoped_bodies===151&&A.stage_lineage?.G7?.historical_census_ids?.length===4&&A.stage_lineage?.G6?.historical_global_authority===false,'scope-limited G3/G6/G7');
 ok(g.historical_invalidation?.legacy_G1_green_CI_run_37826407305==='HISTORICAL_0_25_INPUTS_ONLY_NOT_CURRENT_G1_SOURCE_CLOSURE','old green CI not current authority');
 ok(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 only audited');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ok(c[k]===false,'invalid stage promotion '+k);
 ok(g.semantic_authority===false&&g.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY'&&g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','authority/external reviewer boundary');
 ok(!j(g).includes('W-SSC-'),'no W source premise');return errors;
}
const base=chk(),errs=[...base],mutants=[
 ['G1',x=>{x.current_lawful_state.G1_authorized=true}],['G2',x=>{x.current_lawful_state.G2_authorized=true}],['G3',x=>{x.current_lawful_state.G3_authorized=true}],
 ['G4',x=>{x.current_lawful_state.G4_authorized=true}],['G5',x=>{x.current_lawful_state.G5_authorized=true}],['G6',x=>{x.current_lawful_state.G6_campaign_new_promotion_authorized=true}],
 ['G7',x=>{x.current_lawful_state.G7_authorized=true}],['IA',x=>{x.current_lawful_state.L_recursive_IA_authorized=true}],['Cross',x=>{x.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['Merge',x=>{x.current_lawful_state.PR70_merge_authorized=true}],['Source',x=>{x.current_source_census.frozen=true}],['SSC pin',x=>{x.current_source_census.git_blob_sha='stale'}],
 ['Audit pin',x=>{x.G0_14_hostile_stage_audit.audit.git_blob_sha='stale'}],['Verifier pin',x=>{x.G0_14_hostile_stage_audit.verifier.git_blob_sha='stale'}],
 ['Source math',x=>{x.L126_new_source_discrepancy.failing_pairs=0}],['Legacy green promotion',x=>{x.historical_invalidation.legacy_G1_green_CI_run_37826407305='CURRENT'}],
 ['External',x=>{x.G0_14_hostile_stage_audit.CI.external_cold_review_passed=true}],['W import',x=>{x.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;if(!base.length)for(const [name,fn]of mutants){const x=cp(G),b=j(x);fn(x);if(j(x)===b)errs.push('no-op '+name);else if(chk(x).length===0)errs.push('escaped '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-gate014-negative-source-guard.v0.1',pass:errs.length===0,errors:errs,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',source_obligations:191,stage:'G0',G1_to_G7_qualified:false,external_review_passed:false},null,2));if(errs.length)process.exitCode=1;
