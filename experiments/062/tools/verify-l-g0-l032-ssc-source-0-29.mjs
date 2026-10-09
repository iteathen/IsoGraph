import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={old:L+'SOURCE_SEMANTIC_CENSUS_0_28.json',next:L+'SOURCE_SEMANTIC_CENSUS_0_29.json',
 packet:L+'LISI_L01_H1_EW_PURE_BIVECTOR_SOURCE_G0_0_1.json',
 verifier:E+'tools/verify-l-g0-l01-h1-ew-pure-bivector-0-1.mjs',
 gate:E+'L_CURRENT_STAGE_GATE_0_28.json'};
const get=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Old=get(p.old),Current=get(p.next),Pkt=get(p.packet),Gate=get(p.gate);
function verify(s=Current){
 const errors=[],ok=(yes,msg)=>{if(!yes)errors.push(msg)},rev=s.revision||{},guard=s.guards||{};
 const oldItem=Old.items.find(x=>x.id==='L-SSC-032'),item=s.items?.find(x=>x.id==='L-SSC-032'),body=item?.body||'',d=item?.source_expression_census?.L01_H1_EW_pure_bivector_source_G0||{};
 ok(s.schema==='woit-lisi.track-l.source-semantic-census.v0.29'&&s.track==='L'&&s.status?.includes('G0')&&s.status?.includes('UNFROZEN'),'current source G0 only');
 ok(s.item_count===191&&s.items?.length===191&&j(s.items.map(x=>x.id))===j(Old.items.map(x=>x.id)),'all 191 stable source identities and order');
 ok(j(s.items.filter((x,i)=>j(x)!==j(Old.items[i])).map(x=>x.id))===j(['L-SSC-032']),'only L032 revised');
 ok(Old.items.filter(x=>x.id!=='L-SSC-032').every(x=>j(x)===j(s.items.find(y=>y.id===x.id))),'all other 190 complete records byte-equivalent as JSON');
 ok(body.startsWith(oldItem.body+' '),'full old L032 source assertions and negative source counterexamples exact prefix');
 ok(rev.id==='L_SSC_0_29_L032_SIX_EW_BIVECTORS_SOURCE_G0'&&rev.predecessor_path===p.old&&rev.predecessor_git_blob_sha===sha(p.old),'correct exact predecessor census');
 ok(rev.changed_source_items?.length===1&&rev.changed_source_items[0]==='L-SSC-032'&&rev.unchanged_source_items===190,'conservation accounting');
 ok(rev.source_packet?.path===p.packet&&rev.source_packet?.git_blob_sha===sha(p.packet),'source packet exact SHA pin');
 ok(rev.source_verifier?.path===p.verifier&&rev.source_verifier?.git_blob_sha===sha(p.verifier),'Node source checker exact SHA pin');
 ok(rev.predecessor_gate?.path===p.gate&&rev.predecessor_gate?.git_blob_sha===sha(p.gate),'previous G0-only stage pin');
 ok(rev.source_CI?.run_id===37897875620&&rev.source_CI?.conclusion==='success'&&rev.source_CI?.pure_ew_pairs===6&&rev.source_CI?.mixed_bracket_pairs===120&&rev.source_CI?.adversarial_defined===20&&rev.source_CI?.adversarial_rejected===20&&rev.source_CI?.external_cold_review_passed===false,'finite internal CI scope exact');
 for(const k of ['entire_frozen_L01_L06_source_census_complete','H1_full_graded_curvature_qualified','G1_authorized','source_census_frozen','global_semantic_promotion_authorized'])ok(rev[k]===false,'no downstream overclaim '+k);
 for(const k of [
 'L032_H1_six_primed_pure_bivectors_source_G0_verified','L032_H1_W_B1_source_chiral_coefficient_six_pairs_G0_verified',
 'L032_H1_all_96_EW_mixed_coefficient_brackets_G0_verified','L032_H1_all_15_pure_EW_brackets_G0_verified',
 'L032_H1_all_36_gravity_EW_commuting_G0_verified','L032_H1_24_prime_channel_bracket_countercases_full_W_B1_source_typed'
 ])ok(guard[k]===true,'finite source field/coefficient only '+k);
 for(const k of [
 'L032_H1_source_full_graded_curvature_theorem_qualified',
 'L032_H1_source_Wplus_Bplus_scalar_normalization_everywhere_qualified',
 'L032_H1_source_relative_i_author_repair_known','source_census_freeze_complete',
 'L_G1_source_reextraction_complete','recursive_IA_authorized'
 ])ok(guard[k]===false,'unresolved source and stage '+k);
 ok(d.packet?.path===p.packet&&d.packet?.git_blob_sha===sha(p.packet)&&d.source_verifier?.git_blob_sha===sha(p.verifier),'item source/replay exact lineage');
 ok(d.source_revision==='L01 arXiv 0711.0770v1 2007-11-06','exact original source, not Sept variant');
 ok(j(d.pure_electroweak_images)===j(Pkt.six_exact_source_pair_images),'all six W/B1 source pair roles conserved');
 ok(j(d.source_roles)===j(Pkt.basis_coefficient_contract)&&j(d.finite_scope)===j(Pkt.finite_evidence)&&j(d.limitations)===j(Pkt.reconstruction_limits),'complete positive source and negative scope data');
 ok(d.CI?.run_id===37897875620&&d.CI?.conclusion==='success'&&d.CI?.source_primed_pairs===6&&d.CI?.source_mixed_brackets===120&&d.CI?.adversarial_rejected===20&&d.CI?.external_cold_review_passed===false,'per-obligation exact CI evidence');
 for(const k of ['source_full_graded_curvature_qualified','source_authorized_relative_phase_correction_found','source_complete','G1_authorized'])ok(d[k]===false,'finite coefficient equality is not source proof '+k);
 ok(d.source_gamma_16x16_to_8x8_pure_EW_matrix_coefficient_identity_verified===true,'source independent primed six');
 for(const phrase of [
 'SOURCE-LOCAL G0 SUCCESSOR p10/p12 EW CHIRAL MATRIX COEFFICIENT RECONSTRUCTION',
 'p10 defines the exact γ′1..4 Pauli products','same printed source COEFFICIENT matrices',
 'zero differing matrix entries','all 96 EW/MIXED','all 15 pure EW/EW',
 'all 36 pure-gravity/EW brackets vanish','six timelike fixed-μ4',
 '72 other pairs commute','NOT a proof of graded one-form H1 wedge/curvature',
 'No new Semantic Identity, G1–G7'
 ])ok(body.toLowerCase().includes(phrase.toLowerCase()),'source claim bounded '+phrase);
 ok(Pkt.G1_authorized===false&&Old.guards.source_census_freeze_complete===false&&Gate.current_lawful_state.G1_authorized===false,'no prior G0 checkpoint promotion');
 ok(!j(item??{}).includes('W-SSC-'),'parallel W source identities not imported');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['alter one source item id',s=>{s.items.find(x=>x.id==='L-SSC-032').id='L-SSC-031'}],
 ['erase old L032 body',s=>{s.items.find(x=>x.id==='L-SSC-032').body='CLOSED'}],
 ['erase unrelated L125 original O sign',s=>{s.items.find(x=>x.id==='L-SSC-125').body='NORMALIZED'}],
 ['erase unrelated L133 f4',s=>{s.items.find(x=>x.id==='L-SSC-133').body='ERASED'}],
 ['erase one source obligation',s=>{s.items.pop()}],
 ['change conservation count',s=>{s.revision.unchanged_source_items=0}],
 ['corrupt predecessor blob',s=>{s.revision.predecessor_git_blob_sha='WRONG'}],
 ['corrupt packet blob',s=>{s.revision.source_packet.git_blob_sha='WRONG'}],
 ['corrupt checker blob',s=>{s.revision.source_verifier.git_blob_sha='WRONG'}],
 ['change source revision',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_EW_pure_bivector_source_G0.source_revision='arxiv 0711.0770v2'}],
 ['change source EW image',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_EW_pure_bivector_source_G0.pure_electroweak_images[3].B1='B_1^1=+2'}],
 ['alter 120 bracket count',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_EW_pure_bivector_source_G0.finite_scope.all_source_mixed_bracket_pairs=0}],
 ['erase 6 original EW',s=>{s.guards.L032_H1_six_primed_pure_bivectors_source_G0_verified=false}],
 ['erase 96 controls',s=>{s.guards.L032_H1_all_96_EW_mixed_coefficient_brackets_G0_verified=false}],
 ['falsify printed W/B1 closure',s=>{s.guards.L032_H1_24_prime_channel_bracket_countercases_full_W_B1_source_typed=false}],
 ['invent graded curvature theorem',s=>{s.guards.L032_H1_source_full_graded_curvature_theorem_qualified=true}],
 ['invent EW W+ normalization',s=>{s.guards.L032_H1_source_Wplus_Bplus_scalar_normalization_everywhere_qualified=true}],
 ['invent author repair',s=>{s.guards.L032_H1_source_relative_i_author_repair_known=true}],
 ['invent source G0 complete',s=>{s.guards.source_census_freeze_complete=true}],
 ['invent G1',s=>{s.revision.G1_authorized=true}],
 ['invent IA',s=>{s.guards.recursive_IA_authorized=true}],
 ['invent external pass',s=>{s.revision.source_CI.external_cold_review_passed=true}],
 ['smuggle W source identity',s=>{s.items.find(x=>x.id==='L-SSC-032').body+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const s=cp(Current),before=j(s);fn(s);if(j(s)===before)errors.push('mutation NO-OP '+name);else if(verify(s).length===0)errors.push('mutation ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-ssc029-ew-original-typed-source.v0.1',
 pass:errors.length===0,errors,source_items:191,changed_item:'L-SSC-032',unchanged_items:190,
 original_EW_pairs:6,EW_source_mixed_brackets:120,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',
 source_G0_complete:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
