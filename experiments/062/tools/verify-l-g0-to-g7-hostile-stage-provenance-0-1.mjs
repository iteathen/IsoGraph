import fs from 'node:fs';
import crypto from 'node:crypto';
const P={audit:'experiments/062/L_G0_TO_G7_HOSTILE_STAGE_PROVENANCE_AUDIT_0_1.json'};
const j=JSON.stringify,cp=x=>JSON.parse(j(x)),get=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const A=get(P.audit);
function verify(a=A){
 const errors=[],ck=(v,s)=>{if(!v)errors.push(s)};
 const p=a.stage_lineage||{},u=a.upstream||{},g0=get(u.gate.path),ssc=get(u.ssc.path);
 const G1=get(p.G1.fixed_point_audit.path),G3=get(p.G3.definability.path),G4=get(p.G4.fixed_point.path),G5=get(p.G5.fixed_point.path),G6=get(p.G6.provisional_qualification.path),G7=get(p.G7.targeted_replay.path);
 ck(a.track==='L'&&a.authority===false&&a.status.includes('HOSTILE_AUDIT_G0_REOPEN'),'research audit cannot confer authority');
 ck(u.gate.git_blob_sha===sha(u.gate.path)&&u.ssc.git_blob_sha===sha(u.ssc.path),'current governing gate and SSC exact SHA');
 ck(g0.schema==='isograph.exp062-l-current-stage-gate.v0.13'&&ssc.schema==='woit-lisi.track-l.source-semantic-census.v0.13','no stale gate or census');
 ck(u.frozen===false&&u.source_complete===false&&u.source_count===191&&ssc.items.length===191&&ssc.guards.source_census_freeze_complete===false,'current G0 open, 191 IDs');
 ck(u.earliest_lawful_stage==='G0'&&g0.current_lawful_state?.G1_authorized===false,'G1 intrinsically blocked');
 ck(ssc.revision.changed_source_items.length===1&&ssc.revision.changed_source_items[0]==='L-SSC-126'&&ssc.revision.G1_authorized===false,'latest negative source correction actually incorporated');
 ck(u.new_contradiction?.includes('7/36')&&u.new_contradiction?.includes('28')&&g0.L126_new_source_discrepancy?.failing_pairs===7,'source counterexample preserved');
 const link=[
 ['G1.fixed_point_audit',p.G1.fixed_point_audit],['G1.extraction',p.G1.extraction],['G2.graph',p.G2.graph],['G3.definability',p.G3.definability],
 ['G4.fixed_point',p.G4.fixed_point],['G5.fixed_point',p.G5.fixed_point],['G6.provisional_qualification',p.G6.provisional_qualification],['G7.targeted_replay',p.G7.targeted_replay]
 ];
 for(const [key,obj]of link)ck(obj?.git_blob_sha===sha(obj.path),'historical stage source fingerprint '+key);
 ck(G1.status==='SOURCE_LOCAL_ZERO_CHANGE_FIXED_POINT_CANDIDATE_INDEPENDENT_COLD_AUDIT_REQUIRED'&&G1.fixed_point?.L_G1_complete===false,'old G1 not complete full treatment');
 ck(G3.input?.extraction?.git_blob_sha===sha(p.G1.extraction.path)&&G3.input?.g2_graph?.git_blob_sha===sha(p.G2.graph.path),'old G3 depends on old G1/G2 exact SHA');
 ck(G3.counts?.bodies===151&&G3.counts?.occurrences===818&&G3.counts?.CORE_CLOSED===82&&G3.counts?.UNEXPANDED_DEMAND===736,'old G3 count cannot become new 191 source census');
 ck(p.G3.old_scoped_bodies===151&&p.G3.old_occurrences===818&&p.G3.old_CORE_CLOSED===82&&p.G3.old_UNEXPANDED_DEMAND===736,'G3 audit old scope');
 ck(G4.input?.g3_fixed_point?.git_blob_sha===sha(p.G3.definability.path)&&p.G4.old_G3_dependency_sha===sha(p.G3.definability.path),'G4 old G3 dependency exact, not self');
 ck(G4.fixed_point?.L_G4_complete===true&&p.G4.status==='HISTORICAL_OLD_SOURCE_TUPLE_NOT_CURRENT','G4 old success only');
 ck(G5.input?.g4_fixed_point?.git_blob_sha===sha(p.G4.fixed_point.path)&&G5.fixed_point?.L_track_primitive_closure_complete===false,'G5 old scope and no global primitive closure');
 ck(p.G5.global_source_primitive_closed===false&&p.G5.status==='HISTORICAL_OLD_SOURCE_TUPLE_NOT_CURRENT','G5 current unqualified');
 ck(G6.semantic_authority===true&&G6.global_qualified_authority===false&&p.G6.historical_semantic_authority_scoped===true&&p.G6.historical_global_authority===false,'hypothesis qualification local not globally promoted');
 ck(p.G6.may_be_consumed_as_current_L_source_authority===false&&p.G6.new_current_source_consumption_forbidden===true,'source G0 prevents new consumption');
 ck(G7.fixed_point?.targeted_cone_complete===true&&j(G7.fixed_point?.census_ids)===j(['L-SSC-125','L-SSC-128','L-SSC-129','L-SSC-130']),'old G7 four source items only');
 ck(p.G7.global_L_primitive_closed===false&&p.G7.status==='HISTORICAL_REPLAY_OLD_DEPENDENCY_TUPLE','G7 fixed point cannot be global closure');
 ck(a.live_green_workflow_staleness_control?.example_run_id===37826407305&&a.live_green_workflow_staleness_control?.interpretation.startsWith('OLD_0_25_INPUT_CHECK_ONLY')&&a.live_green_workflow_staleness_control?.source_gate_overrides_workflow_success===true,'legacy green CI not authority');
 const d=a.disposition||{};
 ck(d.G0_source_fidelity_review_authorized===true&&d.G0_frozen===false&&d.external_cold_verification_passed===false,'only G0 source audit');
 for(const k of ['G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_new_L_promotion_authorized','G7_authorized','L_recursive_IA_authorized','cross_track_authorized','merge_authorized','source_new_math_authority'])ck(d[k]===false,'cannot authorize '+k);
 for(const k of ['G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_recursive_IA_authorized','WL_cross_track_comparison_authorized','PR70_merge_authorized'])ck(g0.current_lawful_state?.[k]===false,'live G0 authority gate '+k);
 ck(!j(a).includes('W-SSC-'),'anti-bias no W source premises');
 return errors;
}
const base=verify(),errs=[...base];
const mutations=[
 ['pretend G0 frozen',a=>{a.disposition.G0_frozen=true}],
 ['pretend G1 ready',a=>{a.disposition.G1_authorized=true}],
 ['pretend G2 ready',a=>{a.disposition.G2_authorized=true}],
 ['pretend G3 ready',a=>{a.disposition.G3_authorized=true}],
 ['pretend G4 ready',a=>{a.disposition.G4_authorized=true}],
 ['pretend G5 ready',a=>{a.disposition.G5_authorized=true}],
 ['pretend G6 promotion',a=>{a.disposition.G6_new_L_promotion_authorized=true}],
 ['pretend G7 ready',a=>{a.disposition.G7_authorized=true}],
 ['pretend IA ready',a=>{a.disposition.L_recursive_IA_authorized=true}],
 ['pretend cross-track authorized',a=>{a.disposition.cross_track_authorized=true}],
 ['pretend merge authorization',a=>{a.disposition.merge_authorized=true}],
 ['pretend global math proof',a=>{a.disposition.source_new_math_authority=true}],
 ['pretend external audit',a=>{a.disposition.external_cold_verification_passed=true}],
 ['erase source fingerprint',a=>{a.upstream.ssc.git_blob_sha='stale'}],
 ['mutate old G1 extraction pin',a=>{a.stage_lineage.G1.extraction.git_blob_sha='stale'}],
 ['mutate old G2 graph pin',a=>{a.stage_lineage.G2.graph.git_blob_sha='stale'}],
 ['mutate old G3 pin',a=>{a.stage_lineage.G3.definability.git_blob_sha='stale'}],
 ['G4 self-pinning',a=>{a.stage_lineage.G4.old_G3_dependency_sha=a.stage_lineage.G4.fixed_point.git_blob_sha}],
 ['G3 scope laundering',a=>{a.stage_lineage.G3.old_scoped_bodies=191}],
 ['G5 global false-positive',a=>{a.stage_lineage.G5.global_source_primitive_closed=true}],
 ['G6 global promotion false-positive',a=>{a.stage_lineage.G6.historical_global_authority=true}],
 ['G6 newly consumed',a=>{a.stage_lineage.G6.may_be_consumed_as_current_L_source_authority=true}],
 ['G7 old scope globalized',a=>{a.stage_lineage.G7.global_L_primitive_closed=true}],
 ['legacy CI promoted',a=>{a.live_green_workflow_staleness_control.source_gate_overrides_workflow_success=false}],
 ['erase source negativity',a=>{a.upstream.new_contradiction='none'}],
 ['smuggle W semantic',a=>{a.upstream.new_contradiction+=' W-SSC-103'}]
];
let rejected=0;
if(!base.length)for(const [label,fn]of mutations){const a=cp(A),before=j(a);fn(a);if(j(a)===before)errs.push('mutation no-op '+label);else if(verify(a).length===0)errs.push('escaped mutation '+label);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-to-g7-hostile-stage-replay.v0.1',pass:errs.length===0,errors:errs,earliest_lawful_stage:'G0',source_obligations:191,legacy_G3_bodies:151,legacy_G3_occurrences:818,legacy_G7_scope_count:4,legacy_G6_global_qualified:false,adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:base.length?'UNTESTED_BASELINE_FAILURE':'TESTED',G1_to_G7_current_authority:false},null,2));if(errs.length)process.exitCode=1;
