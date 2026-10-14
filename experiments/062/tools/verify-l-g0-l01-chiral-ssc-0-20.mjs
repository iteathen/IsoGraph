import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={old:L+'SOURCE_SEMANTIC_CENSUS_0_19.json',next:L+'SOURCE_SEMANTIC_CENSUS_0_20.json',
 source:L+'LISI_L01_EQ2_8_CHIRAL_SOURCE_FINITE_G0_0_1.json',
 verifier:E+'tools/verify-l-g0-l01-eq2-8-chiral-source-0-1.mjs',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_19.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),J=JSON.stringify,cp=x=>JSON.parse(J(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Before=read(P.old),Now=read(P.next),Source=read(P.source),Gate=read(P.oldGate);
function check(s=Now){
 const err=[],ok=(v,msg)=>{if(!v)err.push(msg)};
 const rev=s.revision||{},guard=s.guards||{},old=Before.items.find(x=>x.id==='L-SSC-030'),item=s.items?.find(x=>x.id==='L-SSC-030'),
 data=item?.source_expression_census?.L01_clifford_Eq2_8_finite_chiral_G0||{};
 ok(s.schema==='woit-lisi.track-l.source-semantic-census.v0.20'&&s.status==='L_G0_SSC_0_20_L01_EQ2_8_EXACT_FINITE_CHIRAL_SOURCE_ONLY_PARTIAL_UNFROZEN','G0 current source-only status');
 ok(s.item_count===191&&s.items?.length===191&&J(s.items.map(x=>x.id))===J(Before.items.map(x=>x.id)),'191 SI IDs unchanged/order exact');
 ok(J(s.items.map((x,i)=>J(x)!==J(Before.items[i])?x.id:null).filter(Boolean))===J(['L-SSC-030']),'single L030 source body change');
 ok(Before.items.filter(x=>x.id!=='L-SSC-030').every(x=>J(x)===J(s.items.find(z=>z.id===x.id))),'all 190 unrelated full source records exact');
 ok(rev.id==='L_SSC_0_20_L030_EQ2_8_FINITE_CLIFFORD_SOURCE_G0'&&rev.predecessor_path===P.old&&rev.predecessor_git_blob_sha===sha(P.old)&&rev.unchanged_source_items===190&&J(rev.changed_source_items)===J(['L-SSC-030']),'record-preserving exact prior SSC0.19');
 for(const [name,p]of[['source_packet',P.source],['source_verifier',P.verifier],['predecessor_gate',P.oldGate]])ok(rev[name]?.path===p&&rev[name]?.git_blob_sha===sha(p),'exact source/test/stage provenance '+name);
 ok(rev.exact_source_CI?.id===37871145207&&rev.exact_source_CI?.conclusion==='success'&&rev.exact_source_CI?.real_input_vectors===729&&rev.exact_source_CI?.source_matrix_cells===11664&&rev.exact_source_CI?.adversarial_defined===25&&rev.exact_source_CI?.adversarial_rejected===25&&rev.exact_source_CI?.external_review_passed===false,'G0 source CI limited 729 real vectors');
 ok(rev.old_negative_L01_real_group_preserved===true&&rev.author_frozen_source_unchanged===true&&rev.source_full_L01_closed===false&&rev.source_full_L01_L06_corpus_closed===false&&rev.source_census_frozen===false&&rev.G1_authorized===false&&rev.global_module_qualified===false,'source claim vs math negative evidence vs authority');
 ok(guard.L01_clifford_Eq2_8_six_bivectors_finite_G0_reconstructed===true&&guard.L01_clifford_Eq2_8_729_real_coefficient_cases_tested===true&&guard.L01_chiral_real_coefficient_conjugacy_guard_preserved===true,'typed finite source positive only');
 for(const key of ['L01_clifford_spin_group_general_math_qualified','L01_complete_source_reconstruction','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ok(guard[key]===false,'source mandatory gap preserved '+key);
 ok(guard.L01_7_additional_source_formula_gaps_remain_open===true&&Gate.current_lawful_state?.G1_authorized===false,'full L01 source still incomplete');
 if(!item){err.push('missing L-SSC-030 source item');return err}
 ok(item.body.startsWith(old.body+' '),'complete author positive and negative old L030 source body retained');
 for(const x of ['gamma1=sigma2⊗sigma1','gamma4=i*sigma1⊗I2','omegaS=(omega23,-omega13,omega12)','omegaT=(omega14,omega24,omega34)','omega_R^tau=conj(omega_L^tau)','729 coefficient tuples','11,664 matrix entries','ZERO mismatches','real group SL2C=SL2R×SL2R counterexample remains mathematically false'])ok(item.body.includes(x),'source original Eq2.8 formula and qualifier '+x);
 ok(data.source_packet?.path===P.source&&data.source_packet?.git_blob_sha===sha(P.source)&&data.independent_verifier?.path===P.verifier&&data.independent_verifier?.git_blob_sha===sha(P.verifier),'L030 source and verifier exact metadata pins');
 ok(data.source_version==='L01 arXiv:0711.0770v1 §2.2.1 printed pages 8-9'&&J(data.original_gamma)===J(Source.matrix_role.original_gamma)&&J(data.independent_expected_bivectors)===J(Source.independent_expected_bivectors)&&J(data.source_spin_connection)===J(Source.source_omega_role_reconstruction),'exact original source gamma and chiral sign roles');
 ok(J(data.exact_source_real_coefficient_domain)===J([-1,0,1])&&data.real_coefficient_tuples===729&&data.source_4x4_cells_tested===11664&&data.gamma_ordered_pairs===16&&data.chiral_basis_bivector_cases===6&&data.matched_source_cells===11664&&data.source_bad_cells===0,'finite source cell reconstruction and domain');
 ok(J(data.complex_extension_negative_control)===J(Source.finite_source_test.reality_guard_negative_control),'non-real domain negative control');
 ok(data.CI?.id===37871145207&&data.CI?.adversarial_rejected===25&&data.CI?.external_review_passed===false,'source CI exact, not third-party qualification');
 for(const k of ['full_clifford_mathematical_theorem_qualified','source_real_group_direct_product_assertion_corrected','source_full_cold_review_passed','G1_authorized'])ok(data[k]===false,'no source/semantic promotion via L030 '+k);
 ok(J(item.source_expression_census.L01_seven_source_modality_G0)===J(old.source_expression_census.L01_seven_source_modality_G0)&&J(item.source_expression_census.L01_real_spin_source_discrepancy)===J(old.source_expression_census.L01_real_spin_source_discrepancy),'all old L01 source modalities and real group counterexample unchanged');
 ok(!J(s).includes('W-SSC-'),'L research firewall no W source import');
 return err;
}
const baseline=check(),issues=[...baseline],mutants=[
 ['erase L030',x=>{x.items=x.items.filter(y=>y.id!=='L-SSC-030')}],
 ['change L030 source ID',x=>{x.items.find(y=>y.id==='L-SSC-030').id='L-SSC-031'}],
 ['erase old source prefix',x=>{x.items.find(y=>y.id==='L-SSC-030').body='new chiral equation only'}],
 ['erase L125 prior source negative',x=>{x.items.find(y=>y.id==='L-SSC-125').body='normalized octonions'}],
 ['change L030 original gamma source',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_clifford_Eq2_8_finite_chiral_G0.original_gamma.gamma4='sigma1'}],
 ['flip old L01 chiral source',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_seven_source_modality_G0.source_exact_excerpt='L/R same'}],
 ['erase old real group negative',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_real_spin_source_discrepancy.mathematically_false_under_stated_real_direct_product=false}],
 ['misstate omegaS rotation',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_clifford_Eq2_8_finite_chiral_G0.source_spin_connection.spatial_rotations='omegaS=(omega23,+omega13,omega12)'}],
 ['remove real guard',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_clifford_Eq2_8_finite_chiral_G0.exact_source_real_coefficient_domain=[]}],
 ['fake 729 complete source tuples',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_clifford_Eq2_8_finite_chiral_G0.real_coefficient_tuples=999}],
 ['delete source sign',x=>{x.items.find(y=>y.id==='L-SSC-030').body=x.items.find(y=>y.id==='L-SSC-030').body.replace('omegaT=(omega14,omega24,omega34)','omegaT wrong')}],
 ['change 6 bivector roles',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_clifford_Eq2_8_finite_chiral_G0.chiral_basis_bivector_cases=7}],
 ['erase non-real control',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_clifford_Eq2_8_finite_chiral_G0.complex_extension_negative_control.source_admissible=true}],
 ['alter source input hash',x=>{x.revision.source_packet.git_blob_sha='bad'}],
 ['alter old SSC hash',x=>{x.revision.predecessor_git_blob_sha='bad'}],
 ['alter source CI',x=>{x.revision.exact_source_CI.adversarial_rejected=0}],
 ['claim full L01 source',x=>{x.guards.L01_complete_source_reconstruction=true}],
 ['claim entire Clifford proof',x=>{x.guards.L01_clifford_spin_group_general_math_qualified=true}],
 ['claim G1',x=>{x.revision.G1_authorized=true}],
 ['claim IA',x=>{x.guards.recursive_IA_authorized=true}],
 ['claim external cold review',x=>{x.revision.exact_source_CI.external_review_passed=true}],
 ['claim original group corrected',x=>{x.items.find(y=>y.id==='L-SSC-030').source_expression_census.L01_clifford_Eq2_8_finite_chiral_G0.source_real_group_direct_product_assertion_corrected=true}],
 ['import W source',x=>{x.items.find(y=>y.id==='L-SSC-030').body+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [label,fn]of mutants){const x=cp(Now),before=J(x);fn(x);if(J(x)===before)issues.push('NOOP '+label);else if(check(x).length===0)issues.push('ESCAPED '+label);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-ssc020-finite-chiral-source.v0.1',pass:issues.length===0,errors:issues,current_source_items:191,only_changed_item:'L-SSC-030',unchanged:190,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',current_G1_authorized:false,external_review_passed:false},null,2));if(issues.length)process.exitCode=1;
