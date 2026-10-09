import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const path={
 old:L+'SOURCE_SEMANTIC_CENSUS_0_27.json',now:L+'SOURCE_SEMANTIC_CENSUS_0_28.json',
 packet:L+'LISI_L01_H1_PURE_GRAVITY_AND_ALL_MIXED_BRACKET_SOURCE_G0_0_1.json',
 checker:E+'tools/verify-l-g0-l01-h1-pure-gravity-all-mixed-brackets-0-1.mjs',
 gate:E+'L_CURRENT_STAGE_GATE_0_27.json',
 fail1:E+'L032_H1_PURE_GRAVITY_PAIR_ENUMERATION_VERIFIER_DEFECT_0_1.json',
 fail2:E+'L032_H1_PURE_GRAVITY_PAIR_ORDER_SECOND_BASELINE_DEFECT_0_1.json'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Old=read(path.old),Current=read(path.now),Pkt=read(path.packet),Gate=read(path.gate);
function verify(s=Current){
 const err=[],ok=(v,n)=>{if(!v)err.push(n)};
 const before=Old.items.find(x=>x.id==='L-SSC-032');
 const item=s.items?.find(x=>x.id==='L-SSC-032'),body=item?.body??'',detail=item?.source_expression_census?.L01_H1_pure_gravity_and_all_mixed_brackets_G0||{},rev=s.revision||{},guard=s.guards||{};
 ok(s.schema==='woit-lisi.track-l.source-semantic-census.v0.28'&&s.status?.includes('G0')&&s.status?.includes('UNFROZEN'),'G0 candidate and unchanged authority classification');
 ok(s.item_count===191&&s.items?.length===191&&j(s.items.map(x=>x.id))===j(Old.items.map(x=>x.id)),'all 191 ID/order preserved');
 ok(j(s.items.filter((x,i)=>j(x)!==j(Old.items[i])).map(x=>x.id))===j(['L-SSC-032']),'exactly L032 changed');
 ok(Old.items.filter(x=>x.id!=='L-SSC-032').every(x=>j(x)===j(s.items.find(z=>z.id===x.id))),'all 190 other complete source item objects byte-equivalent as JSON');
 ok(body.startsWith(before.body+' '),'all prior L032 claims and published-source negative evidence conserved as exact prefix');
 ok(rev.id==='L_SSC_0_28_L032_PURE_GRAVITY_6_AND_MIXED_BRACKETS_120_G0'&&rev.predecessor_path===path.old&&rev.predecessor_git_blob_sha===sha(path.old),'SSC old semantic tuple exact');
 ok(rev.source_packet?.path===path.packet&&rev.source_packet?.git_blob_sha===sha(path.packet),'source packet exact SHA');
 ok(rev.source_verifier?.path===path.checker&&rev.source_verifier?.git_blob_sha===sha(path.checker),'source arithmetic checker exact SHA');
 ok(rev.predecessor_gate?.path===path.gate&&rev.predecessor_gate?.git_blob_sha===sha(path.gate),'prior L G0 gate');
 ok(rev.failed_fixtures?.length===2&&rev.failed_fixtures[0].path===path.fail1&&rev.failed_fixtures[1].path===path.fail2&&rev.failed_fixtures[0].git_blob_sha===sha(path.fail1)&&rev.failed_fixtures[1].git_blob_sha===sha(path.fail2),'failed baseline fixture provenance exact');
 ok(rev.node_CI?.id===37896380480&&rev.node_CI?.conclusion==='success'&&rev.node_CI?.adversarial_rejected===23&&rev.node_CI?.pure_gravity_pairs===6&&rev.node_CI?.mixed_brackets===120&&rev.node_CI?.source_typed_gravity_output_countercases===24&&rev.node_CI?.external_review_passed===false,'source CI exact bounded scope');
 ok(rev.unchanged_source_items===190&&j(rev.changed_source_items)===j(['L-SSC-032']),'conservation metadata');
 for(const k of ['whole_L01_L06_source_complete','whole_L01_H1_graded_source_qualified','source_census_frozen','G1_authorized','full_core_primitive_closure'])ok(rev[k]===false,'no qualification claim '+k);
 ok(detail.source_packet?.path===path.packet&&detail.source_packet?.git_blob_sha===sha(path.packet)&&detail.source_verifier?.git_blob_sha===sha(path.checker),'source item same pinned evidence');
 ok(j(detail.source_printed_omega_coefficients)===j(Pkt.independent_printed_omega_six_cases),'six source omega configurations and real sign/orientation');
 ok(j(detail.source_operator_roles)===j(Pkt.source_roles)&&j(detail.finite_scope)===j(Pkt.finite_observations)&&j(detail.negative_scope_limits)===j(Pkt.source_implications_and_nonclaims),'every source coefficient role and negative scope tracked');
 ok(detail.ci?.run_id===37896380480&&detail.ci?.adversarial_mutants===23&&detail.ci?.external_cold_review_passed===false,'item scoped evidence not external PASS');
 ok(detail.failed_fixtures?.length===2&&detail.failed_fixtures.every(f=>f.mutations_executed===0),'failed baseline does not pass mutations');
 for(const k of ['source_full_curvature_proved','paper_math_error_owner_known','source_authorized_rephasing_found','all_primed_electroweak_source_identification_verified','stage_G1_authorized'])ok(detail[k]===false,'source residual boundary '+k);
 for(const [k,v]of Object.entries({
 L032_H1_independent_pure_omega_six_source_operators_G0_verified:true,
 L032_H1_all_96_pure_mixed_source_coeff_brackets_G0_verified:true,
 L032_H1_all_120_mixed_coeff_bracket_diagnostics_G0_verified:true,
 L032_H1_24_gravity_channel_bracket_countercases_source_typed_G0_verified:true,
 L032_H1_24_prime_channel_bracket_countercases_full_W_B1_source_typed:false,
 L032_H1_phase_only_source_author_repair_known:false,
 L032_H1_complete_curvature_dynamics_qualified:false,
 L032_full_positive_chiral_8x8_H1_source_reconstructed:false,
 source_census_freeze_complete:false,
 L_G1_source_reextraction_complete:false,recursive_IA_authorized:false
 }))ok(guard[k]===v,'exact source and stage guard '+k);
 for(const token of [
 'ALL SIX independently printed 8x8 omega_L/R','16 mixed frame ONE-FORM times real Higgs scalar',
 'All 96 source PURE-GRAVITY/MIXED','ALL 120 unordered source MIXED/MIXED',
 '72 pairs with disjoint gravity and Higgs','Total 48 nonzero bracket differences across 384',
 'Only the 24 gravity-output bracket cases','24 prime/electroweak-output cases remain MATRIX COEFFICIENT DIAGNOSTICS',
 'No mathematical/physical-theory invalidity','G1–G7'
 ])ok(body.includes(token),'conserved bounded claim text '+token);
 ok(Old.guards.source_census_freeze_complete===false&&Gate.current_lawful_state.G1_authorized===false&&Pkt.G1_authorized===false,'source still unfrozen G0-only');
 ok(!j(item??{}).includes('W-SSC-'),'W source isolation');
 return err;
}
const baseline=verify(),errors=[...baseline],mutations=[
 ['L032 identity merged',s=>{s.items.find(x=>x.id==='L-SSC-032').id='L-SSC-031'}],
 ['erase L032 body',s=>{s.items.find(x=>x.id==='L-SSC-032').body='SOURCE_CLOSED'}],
 ['remove L125 source octonion negative',s=>{s.items.find(x=>x.id==='L-SSC-125').body='NORMALIZED'}],
 ['remove unrelated L133 proof data',s=>{s.items.find(x=>x.id==='L-SSC-133').body='ERASED'}],
 ['drop source item',s=>{s.items.pop()}],
 ['pretend all old 190 source changed',s=>{s.revision.unchanged_source_items=0}],
 ['lose old census hash',s=>{s.revision.predecessor_git_blob_sha='STALE'}],
 ['lose packet hash',s=>{s.revision.source_packet.git_blob_sha='STALE'}],
 ['lose verifier hash',s=>{s.revision.source_verifier.git_blob_sha='STALE'}],
 ['wrong original source omega',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_pure_gravity_and_all_mixed_brackets_G0.source_printed_omega_coefficients[0].printed_four_2spin_diagonal_blocks='WRONG'}],
 ['falsify 120 pair count',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_pure_gravity_and_all_mixed_brackets_G0.finite_scope.all_mixed_pairs.pairs=0}],
 ['falsify pure G six',s=>{s.guards.L032_H1_independent_pure_omega_six_source_operators_G0_verified=false}],
 ['falsify pure-mixed source 96',s=>{s.guards.L032_H1_all_96_pure_mixed_source_coeff_brackets_G0_verified=false}],
 ['claim full printed EW primitive closure',s=>{s.guards.L032_H1_24_prime_channel_bracket_countercases_full_W_B1_source_typed=true}],
 ['erase one source phase witness',s=>{s.items.find(x=>x.id==='L-SSC-032').body=s.items.find(x=>x.id==='L-SSC-032').body.replace('384 8x8','0 8x8')}],
 ['rewrite first failed baseline as PASS',s=>{s.revision.failed_fixtures[0].id=0}],
 ['erase failed fixture history',s=>{s.revision.failed_fixtures=[]}],
 ['fabricate source rephasing',s=>{s.guards.L032_H1_phase_only_source_author_repair_known=true}],
 ['fabricate source G0 closure',s=>{s.guards.source_census_freeze_complete=true}],
 ['fabricate H1 graded curvature',s=>{s.guards.L032_H1_complete_curvature_dynamics_qualified=true}],
 ['fabricate current G1',s=>{s.revision.G1_authorized=true}],
 ['fabricate external reviewer',s=>{s.revision.node_CI.external_review_passed=true}],
 ['cross-track contamination',s=>{s.items.find(x=>x.id==='L-SSC-032').body+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutations){
 const s=cp(Current),b=j(s);fn(s);if(j(s)===b)errors.push('mutation no-op '+name);else if(verify(s).length===0)errors.push('mutation escaped '+name);else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l-ssc028-h1-pure-and-120-mixed.v0.1',
 pass:errors.length===0,errors,source_items:191,changed_item:'L-SSC-032',unchanged_items:190,
 source_pure_gravity_pairs:6,mixed_matrix_pairs:120,
 adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',
 source_G0_complete:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
