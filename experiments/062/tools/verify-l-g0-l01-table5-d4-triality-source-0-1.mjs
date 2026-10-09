import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={source:L+'LISI_L01_TABLE5_D4_ROOT_TRIALITY_SOURCE_G0_0_1.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_23.json',gate:E+'L_CURRENT_STAGE_GATE_0_23.json',cl71:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',ew:L+'LISI_L01_ELECTROWEAK_WEW_CARTAN_TABLE4_G0_0_1.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=o=>JSON.parse(j(o));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const src=load(files.source),ssc=load(files.ssc),gate=load(files.gate);
const header=['(1/2)*omega_L^3','(1/2)*omega_R^3','W^3','B_1^3'];
// Cold visual transcription of frozen L01 arxiv v1 p12, independent of source packet entries.
const expectedTable5=[
 ['omegaL','gravitational_left',[2,0,0,0],[-2,0,0,0],['±1',0,0,0]],
 ['omegaR','gravitational_right',[0,2,0,0],[0,-2,0,0],[0,'±1',0,0]],
 ['W','electroweak_SU2L',[0,0,2,0],[0,0,-2,0],[0,0,'±1',0]],
 ['B1','PatiSalam_SU2R',[0,0,0,2],[0,0,0,-2],[0,0,0,'±1']],
 ['eT_phiPlus','frameTime_times_Higgs',[-1,1,1,1],[1,-1,1,1],['∓1/2','±1/2','1/2','1/2']],
 ['eT_phiMinus','frameTime_times_Higgs',[-1,1,-1,-1],[1,-1,-1,-1],['∓1/2','±1/2','-1/2','-1/2']],
 ['eT_phiZero','frameTime_times_Higgs',[-1,1,-1,1],[1,-1,-1,1],['∓1/2','±1/2','-1/2','1/2']],
 ['eT_phiOne','frameTime_times_Higgs',[-1,1,1,-1],[1,-1,1,-1],['∓1/2','±1/2','1/2','-1/2']],
 ['eS_phiPlus','frameSpace_times_Higgs',[1,1,1,1],[-1,-1,1,1],['±1/2','±1/2','1/2','1/2']],
 ['eS_phiMinus','frameSpace_times_Higgs',[1,1,-1,-1],[-1,-1,-1,-1],['±1/2','±1/2','-1/2','-1/2']],
 ['eS_phiZero','frameSpace_times_Higgs',[1,1,-1,1],[-1,-1,-1,1],['±1/2','±1/2','-1/2','1/2']],
 ['eS_phiOne','frameSpace_times_Higgs',[1,1,1,-1],[-1,-1,1,-1],['±1/2','±1/2','1/2','-1/2']]
];
const expected8Splus=[
 ['nu_eL','lepton_left_neutrino',[1,0,1,0],[-1,0,1,0],['±1/2',0,'1/2',0]],
 ['eL','lepton_left_electron',[1,0,-1,0],[-1,0,-1,0],['±1/2',0,'-1/2',0]],
 ['nu_eR','lepton_right_neutrino',[0,1,0,1],[0,-1,0,1],[0,'±1/2',0,'1/2']],
 ['eR','lepton_right_electron',[0,1,0,-1],[0,-1,0,-1],[0,'±1/2',0,'-1/2']]
];
const expectedT=[[0,0,0,1],[1,0,0,0],[0,0,1,0],[0,1,0,0]];
const t6=[
 ['nu_muL','8Sminus','nu_eL',[[0,1,1,0],[0,-1,1,0]]],
 ['muL','8Sminus','eL',[[0,1,-1,0],[0,-1,-1,0]]],
 ['nu_muR','8Sminus','nu_eR',[[1,0,0,1],[1,0,0,-1]]],
 ['muR','8Sminus','eR',[[-1,0,0,1],[-1,0,0,-1]]],
 ['nu_tauL','8V','nu_eL',[[0,0,1,1],[0,0,1,-1]]],
 ['tauL','8V','eL',[[0,0,-1,1],[0,0,-1,-1]]],
 ['nu_tauR','8V','nu_eR',[[1,1,0,0],[-1,1,0,0]]],
 ['tauR','8V','eR',[[1,-1,0,0],[-1,-1,0,0]]]
];
const T=v=>expectedT.map(row=>row.reduce((s,x,i)=>s+x*v[i],0)),byMatrix=(v,mat)=>mat.map(row=>row.reduce((s,x,i)=>s+x*v[i],0));
const key=v=>v.join(','),norm=v=>v.reduce((s,x)=>s+x*x,0),coords=row=>[row.coordinate_numerators_over_2.wedge,row.coordinate_numerators_over_2.vee];
const table=arr=>arr.map(z=>[z.id,z.sector,...coords(z),z.source_signs]);
function verify(x=src){
 const errors=[],ck=(cond,msg)=>{if(!cond)errors.push(msg)},s=x.table5||{},t=x.triality_T||{},t6source=x.table6_source_companion||{},scope=x.finite_source_scope||{},negative=x.negative_evidence||{};
 ck(x.schema==='isograph.lisi-l01-table5-d4-triality-root-weights-g0.v0.1'&&x.track==='L'&&x.stage==='G0'&&x.authority===false,'L source research G0, not theorem');
 ck(x.source?.id==='L01'&&x.source?.revision==='arXiv:0711.0770v1 2007-11-06'&&j(x.source?.printed_pages)===j([12,13,14])&&j(x.source?.pdf_zero_based_pages)===j([12,13,14]),'frozen original paper exact pages');
 for(const [name,p]of [['ssc_023',files.ssc],['gate_023',files.gate],['cl71_source',files.cl71],['wew_Cartan_Table4',files.ew]])ck(x.parents?.[name]?.path===p&&x.parents?.[name]?.git_blob_sha===blob(p),'exact previous source dependency '+name);
 ck(ssc.items.length===191&&gate.current_lawful_state.G1_authorized===false&&gate.current_lawful_state.G0_source_census_frozen===false,'G0 still source-incomplete');
 ck(x.source_complete===false&&x.source_census_frozen===false&&x.mathematical_theorem_qualified===false&&x.G1_authorized===false&&x.external_cold_review_passed===false,'no arbitrary G0/G1 promotion');
 ck(j(s.header)===j(header)&&s.signed_coordinate_encoding?.includes('CORRELATED'),'exact four source axes and no independent sign symbols');
 ck(s.bosonic_rows_ordered?.length===12&&s.spinor8Splus_rows_ordered?.length===4,'16 rows, no missing source line');
 ck(j(table(s.bosonic_rows_ordered))===j(expectedTable5),'all twelve signed bosonic source rows complete, exact ordered wedge/vee signs');
 ck(j(table(s.spinor8Splus_rows_ordered))===j(expected8Splus),'all four spinor paired source weights correct');
 ck(s.printed_bosonic_root_instances===24&&s.printed_positive_chiral_spinor_weights===8&&s.bosonic_root_source_case?.includes('NOT part of those 24'),'source weight/boson typed boundary');
 ck(s.actor_roles?.includes('eT and eS are distinct')&&s.actor_roles?.includes('W left and B1 right'),'source separate frame and electroweak chirality labels');
 ck(j(t.matrix)===j(expectedT)&&t.source_expr?.includes('(B_1^3,omega_L^3/2,W^3,omega_R^3/2)'),'4x4 source T row/column permutation');
 ck(t.source_claim?.includes('T^3=identity')&&t.expected_fixed_root_count===6&&t.expected_nontrivial_orbits_of_three===6,'triality finite source claimed source scope');
 ck(j(t.fixed_six_labels)===j(['W^+','W^-','eS_phiPlus^wedge','eS_phiZero^wedge','eS_phiMinus^vee','eS_phiOne^vee']),'all six exact printed invariant root labels');
 ck(t.source_example?.includes('omega_R^wedge -> B1^+ -> omega_L^wedge'),'source sample cyclic orbit');
 ck(t.source_no_physical_obligation?.includes('No inference'),'triality three physical generations NOT proved');
 ck(t6source.status==='EIGHT_PRINTED_SOURCE_PLUS_MINUS_ROWS_CONSERVED_G0_CANDIDATE'&&j(t6source.eight_rows_expected?.map(z=>[z.id,z.source,z.from,z.expected]))===j(t6),'all eight Table6 companion source rows');
 ck(t6source.full_F4_root_set_cardinality_expected===48&&t6source.not_claims?.some(z=>z.includes('global F4')),'F4 named correspondence source only');
 ck(scope.Table5_printed_rows===16&&scope.root_pair_rows===12&&scope.spin_pair_rows===4&&scope.expanded_D4_source_roots===24&&scope.expanded_8Splus_weights===8,'source table count and pairing');
 ck(scope.Table6_printed_companion_rows===8&&scope.expanded_8Sminus_weights===8&&scope.expanded_8V_weights===8&&scope.expected_combined_root_candidates===48,'source Table6 companion count');
 ck(scope.expected_D4_norm2_numerator_square===4&&scope.expected_spin_weight_norm2_numerator_square===2&&scope.expected_permutation_order===3,'source metric and finite T typed domain');
 ck(negative.L01_real_Spin_Lie_group?.includes('center/Killing')&&negative.L05_published_O?.includes('e7*e6=-e2'),'L01 and L05 historic negative evidence preserved');
 ck(negative.L01_fermion_generation_modality?.includes('tentative')&&negative.G0_source_census_frozen===false&&negative.G1_authorized===false&&negative.external_cold_review_passed===false,'physical generation and gate not qualified');
 for(const k of ['source_full_H1_positive_chiral_8x8_matrix_field_entries_complete','source_Table3_Table4_independent_all_weight_convolutions_complete','source_D4_all_24_root_generators_and_Lie_brackets_closed','source_F4_48_root_Lie_algebra_qualified','source_triality_generations_physical_identification_qualified','source_F4_7_1_real_form_or_dynamics_proven','whole_L01_L06_source_census_complete','source_G0_zero_change_fixed_point','G1_to_G7_authorized'])ck(x.unresolved?.[k]===false,'source item cannot be prematurely qualified '+k);
 ck(x.next_lawful_step?.includes('25+ hostile')&&!j(x).includes('W-SSC-'),'stage nonclaim and W source firewall');
 if(errors.length)return {errors,statistics:null};
 const roots=s.bosonic_rows_ordered.flatMap(z=>coords(z)),spin=s.spinor8Splus_rows_ordered.flatMap(z=>coords(z));
 const rootSet=new Set(roots.map(key)),spSet=new Set(spin.map(key));
 ck(roots.length===24&&rootSet.size===24&&roots.every(v=>norm(v)===4),'24 distinct length-1 source D4 roots');
 ck(spin.length===8&&spSet.size===8&&spin.every(v=>norm(v)===2),'8 distinct length-half-squared 8Splus source spinor weights');
 const basis=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
 ck(basis.every(v=>key(byMatrix(byMatrix(byMatrix(v,t.matrix),t.matrix),t.matrix))===key(v)),'T matrix truly of order 3 on arbitrary four-coordinate basis');
 ck(roots.every(v=>rootSet.has(key(byMatrix(v,t.matrix)))),'all source D4 roots T-stable');
 const fixed=new Set(roots.filter(v=>key(v)===key(byMatrix(v,t.matrix))).map(key));
 let nontriv=0,visited=new Set();
 for(const v of roots){const a=key(v);if(visited.has(a))continue;const orbit=[v,byMatrix(v,t.matrix),byMatrix(byMatrix(v,t.matrix),t.matrix)].map(key);
 orbit.forEach(z=>visited.add(z));if(new Set(orbit).size===3)nontriv++;}
 ck(fixed.size===6&&nontriv===6,'six fixed source roots plus six nontrivial T-three-cycles');
 const observedLabels=s.bosonic_rows_ordered.flatMap(z=>coords(z).map((v,i)=>({label:z.id+'^'+(i?'vee':'wedge'),v})));
 const fixedLabels=observedLabels.filter(z=>fixed.has(key(z.v))).map(z=>z.label.replace('W^wedge','W^+').replace('W^vee','W^-'));
 ck(j(fixedLabels.sort())===j(t.fixed_six_labels.slice().sort()),'six source fixed root labels identify exactly the printed classes');
 const predicted6=t6source.eight_rows_expected.map(z=>{
  const old=s.spinor8Splus_rows_ordered.find(u=>u.id===z.from);
  const vs=coords(old).map(v=>z.source==='8Sminus'?byMatrix(v,t.matrix):byMatrix(byMatrix(v,t.matrix),t.matrix));
  return {...z,actual:vs};
 });
 ck(predicted6.every(z=>j(z.actual)===j(z.expected)),'all sixteen Table6 T and T² images independently reconstruct');
 const minus=spin.map(v=>byMatrix(v,t.matrix)),vec=spin.map(v=>byMatrix(byMatrix(v,t.matrix),t.matrix));
 const union=new Set([...roots,...spin,...minus,...vec].map(key));
 ck(minus.every(v=>norm(v)===2)&&vec.every(v=>norm(v)===2)&&union.size===48,'48 distinct coordinate candidates with source-specified 24+8+8+8 grouping');
 ck(t.matrix.reduce((s,row,i)=>s+row.reduce((n,v,j)=>n+ +(v!==0),0),0)===4,'T preserves signed-coordinate incidence, no covert linear combination');
 return {errors,statistics:{Table5_rows:16,Table5_root_instances:24,Table5_spinor_instances:8,Table6_rows:8,Table6_source_companion_instances:16,triality_fixed_D4_roots:6,nontrivial_D4_T_orbits:6,finite_T_operator_order:3,combined_48_coordinate_candidates:48,external_semantic_theorem_qualified:false}};
}
const baseline=verify(),errors=[...baseline.errors],mutants=[
 ['swap W and B1 root source role',p=>{p.table5.bosonic_rows_ordered[2].coordinate_numerators_over_2.wedge=[0,0,0,2]}],
 ['flip omegaL plus sign',p=>{p.table5.bosonic_rows_ordered[0].coordinate_numerators_over_2.wedge[0]=-2}],
 ['drop omegaR boson row',p=>{p.table5.bosonic_rows_ordered.splice(1,1)}],
 ['change eT opposite-sign pair',p=>{p.table5.bosonic_rows_ordered[4].coordinate_numerators_over_2.wedge[0]=1}],
 ['change eS equal-sign pair',p=>{p.table5.bosonic_rows_ordered[8].coordinate_numerators_over_2.wedge[1]=-1}],
 ['change eT phiPlus B1 sign',p=>{p.table5.bosonic_rows_ordered[4].coordinate_numerators_over_2.wedge[3]=-1}],
 ['flip eT source sign text',p=>{p.table5.bosonic_rows_ordered[4].source_signs[0]='±1/2'}],
 ['lose phiOne distinct source row',p=>{p.table5.bosonic_rows_ordered[7].id='phi^1'}],
 ['replace spin nu_eR ± sign with fixed',p=>{p.table5.spinor8Splus_rows_ordered[2].coordinate_numerators_over_2.vee[1]=1}],
 ['swap source 8Splus left and right labels',p=>{p.table5.spinor8Splus_rows_ordered[0].id='nu_eR'}],
 ['invent extra source root',p=>{p.table5.bosonic_rows_ordered.push(cp(p.table5.bosonic_rows_ordered[1]))}],
 ['T wrong cycle',p=>{p.triality_T.matrix[0]=[1,0,0,0]}],
 ['T claim order four',p=>{p.triality_T.expected_nontrivial_orbits_of_three=8}],
 ['erase fixed eS_phiMinus vee',p=>{p.triality_T.fixed_six_labels.pop()}],
 ['wrong Table6 nu_muL source label',p=>{p.table6_source_companion.eight_rows_expected[0].source='8V'}],
 ['wrong Table6 μR sign',p=>{p.table6_source_companion.eight_rows_expected[3].expected[0]=[1,0,0,1]}],
 ['wrong Table6 τR diagonal',p=>{p.table6_source_companion.eight_rows_expected[7].expected[0]=[1,1,0,0]}],
 ['source interpretation unpaired independent ±',p=>{p.table5.signed_coordinate_encoding='UNCOUPLED SIGNS'}],
 ['pretend Table5 roots are spinors',p=>{p.table5.bosonic_root_source_case='All entries spinors'}],
 ['F4 global group proof',p=>{p.unresolved.source_F4_48_root_Lie_algebra_qualified=true}],
 ['full H1 matrix proved',p=>{p.unresolved.source_full_H1_positive_chiral_8x8_matrix_field_entries_complete=true}],
 ['all D4 brackets proved',p=>{p.unresolved.source_D4_all_24_root_generators_and_Lie_brackets_closed=true}],
 ['triality generations physically proven',p=>{p.unresolved.source_triality_generations_physical_identification_qualified=true}],
 ['delete L01 false real group',p=>{p.negative_evidence.L01_real_Spin_Lie_group='repaired'}],
 ['delete L05 ordinary O contradiction',p=>{p.negative_evidence.L05_published_O='repaired'}],
 ['drop original source revision',p=>{p.source.revision='arXiv:0711.0770v2'}],
 ['drop old SSC SHA pin',p=>{p.parents.ssc_023.git_blob_sha='STALE'}],
 ['invent external review',p=>{p.external_cold_review_passed=true}],
 ['claim G0 fixed',p=>{p.unresolved.source_G0_zero_change_fixed_point=true}],
 ['claim G1',p=>{p.G1_authorized=true}],
 ['Woit semantic input',p=>{p.source.modality+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.errors.length)for(const [name,edit]of mutants){const obj=cp(src),before=j(obj);edit(obj);if(j(obj)===before)errors.push('NO-OP '+name);else if(verify(obj).errors.length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-table5-D4-root-weights-triality-g0-source.v0.1',pass:errors.length===0,errors,baseline:baseline.statistics,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.errors.length?'BASELINE_FAILED':'TESTED',source_G0_closed:false,G1_authorized:false,physical_generations_qualified:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
