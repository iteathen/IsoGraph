import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const file={
packet:L+'LISI_L05_F4_EQ17_SOURCE_G0_0_1.json',
prior:L+'LISI_L05_F4_EQ15_EQ16_SOURCE_G0_0_1.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_15.json',
gate:E+'L_CURRENT_STAGE_GATE_0_16.json',
table:L+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
defect:E+'L133_EQ17_PSI_CONJUGATION_SOURCE_FIDELITY_DEFECT_0_1.json'
};
const read=k=>JSON.parse(fs.readFileSync(k,'utf8')),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const S=read(file.packet),O=read(file.table),Prior=read(file.prior),SSC=read(file.ssc),Gate=read(file.gate),Defect=read(file.defect);
const expected=[
 ['L4-EQ17-B3','B3','B1*B2-B2*B1-(tilde(v1)*v2-tilde(v2)*v1)-t²(tilde(psi1)*psi2-tilde(psi2)*psi1)-t(tilde(chi1)*chi2-tilde(chi2)*chi1)','bivector',
  ['B1 B2','-B2 B1','- vector-pair','-t² negative-spinor-pair','-t positive-spinor-pair']],
 ['L4-EQ17-V3','v3','t²(B1)*v2-t²(B2)*v1+tilde(chi1)*tilde(psi2)-tilde(chi2)*tilde(psi1)','vector',
  ['t²(B1) v2','-t²(B2) v1','+mixed chi/psi','-mixed chi/psi']],
 ['L4-EQ17-PSI3','psi3','B1*psi2-B2*psi1+tilde(v1)*tilde(chi2)-tilde(v2)*tilde(chi1)','negative_spinor',
  ['B1 psi2','-B2 psi1','+mixed vector/chi','-mixed vector/chi']],
 ['L4-EQ17-CHI3','chi3','t(B1)*chi2-t(B2)*chi1+tilde(psi1)*tilde(v2)-tilde(psi2)*tilde(v1)','positive_spinor',
  ['t(B1) chi2','-t(B2) chi1','+mixed psi/vector','-mixed psi/vector']]
];
const diagonal=[
 ['L4-EQ17-BM','B_M','-1/2*B^{ab}*tilde(e_a)*e_b'],
 ['L4-EQ17-BP','B_P=t(B_M)','-1/2*B^{ab}*t_{ab}^{cd}*tilde(e_c)*e_d','-1/2*B^{ab}*e_a*tilde(e_b)'],
 ['L4-EQ17-BV','B_V=t(B_P)=t²(B_M)','-1/2*B^{ab}*t_{ab}^{cd}*e_c*tilde(e_d)','-1/2*B^{ab}*(t²)_{ab}^{cd}*tilde(e_c)*e_d']
];
const exactB1Psi='B1*psi2=-1/2*B1^{ab}*psi2^c*tilde(e_a)*(e_b*e_c)';
function check(p=S){
 const errors=[],ck=(v,why)=>{if(!v)errors.push(why)};
 ck(p.schema==='isograph.lisi-l05-f4-eq17-g0-source-literal.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'L G0 only');
 ck(p.source?.id==='L05'&&p.source?.published==='2026-08-29 journal version of record'&&p.source?.doi==='10.1007/s00006-026-01447-5'&&p.source?.section==='§4.3'&&p.source?.eq==='(17)'&&p.source?.page==='printed page 19/51, zero-based PDF page 18'&&p.source?.real_form==='ordinary source f4(-52) ONLY','frozen source version, source modality and carrier');
 ck(p.source_source_semantically_complete===false&&p.source_census_frozen===false&&p.G1_authorized===false&&p.global_mathematical_qualification===false&&p.external_cold_review_passed===false,'no source or theorem promotion');
 for(const [label,k]of[['Eq15_Eq16_source',file.prior],['current_SSC_015',file.ssc],['current_G0_gate_016',file.gate],['Eq1_source_table',file.table]])
  ck(p.parents?.[label]?.path===k&&p.parents?.[label]?.git_blob_sha===sha(k),'parent exact blob '+label);
 ck(SSC.items.length===191&&Gate.current_lawful_state?.G1_authorized===false&&Prior.eq16?.brackets?.length===10,'upstream G0 source scope still valid');
 const t=O.basis_multiplication_tables.find(x=>x.carrier==='O');
 ck(t.entries[6][7]==='-e2'&&t.entries[7][6]==='-e2','original ordinary O contradictory source cells preserved');
 const cs=p.eq17_components||[];
 ck(cs.length===4,'exactly four Eq17 independently asserted components');
 for(let i=0;i<expected.length;i++){
  const z=cs[i]||{},[id,lhs,rhs,role,order]=expected[i];
  ck(z.id===id&&z.lhs===lhs&&z.rhs===rhs&&z.result_role===role&&j(z.term_order)===j(order),'Eq17 source exact '+id);
 }
 const ds=p.diagonal_operator_source||[];
 ck(ds.length===3,'three separately typed diagonal B source operators');
 for(let i=0;i<diagonal.length;i++){
  const z=ds[i]||{},v=diagonal[i];
  ck(z.id===v[0]&&z.lhs===v[1]&&z.rhs===v[2]||v.length===4&&z.id===v[0]&&z.lhs===v[1]&&z.rhs_1===v[2]&&z.rhs_2===v[3],'diagonal source operator '+(i+1));
 }
 ck(p.context?.starting_source_display==='[A(B1,v1,psi1,chi1),A(B2,v2,psi2,chi2)] = A(B3,v3,psi3,chi3)'&&p.context?.scoping.includes('ordinary O and compact real form only'),'source input ordering and real form');
 ck(p.context?.ordered_product?.includes('compositional operators')&&p.context?.source_triality_action?.includes('neither their all-and-only generating semantics'),'B operator and unknown t as source not imported theorem');
 ck(p.ordered_composition_example?.source_formula===exactB1Psi,'right-first nested source composition B1psi2');
 ck(j(p.ordered_composition_example?.ordered_AST?.evaluation)===j(['multiply rightmost e_b*e_c','then multiply on the left by tilde(e_a)','apply scalar coefficients -1/2 B1^{ab} psi2^c']),'ordered right-first AST and scalar coefficient role');
 ck(p.ordered_composition_example?.free_result==='ordinary-octonion typed negative-spinor source role in compact f4(-52) scope only; no field/group module qualified','no illegal quaternion/split carrier promotion');
 ck(p.negative_evidence?.Eq1_ordinary_O_printed_conflict==='e6*e7=-e2 and e7*e6=-e2, as published; do not adopt mathematical repair cell','source Eq1 inconsistency preserved');
 ck(p.negative_evidence?.Eq2_3_source_clifford_failure?.includes('7 of 36')&&p.negative_evidence?.Eq4_ordinary_O_cycles?.includes('4 of 512')&&p.negative_evidence?.Eq5_bivector_Lie_failure?.includes('168 of 378'),'source upstream negative evidence');
 ck(p.negative_evidence?.Eq17_full_f4_semantic_reconstruction?.startsWith('NOT_ESTABLISHED')&&p.negative_evidence?.stage_G1_authorized===false&&p.negative_evidence?.external_verification_passed===false,'not source theorem or G1 promotion');
 ck(p.unreconstructed_primary_source?.length===4&&p.unreconstructed_primary_source.some(x=>x.includes('reflection matrices'))&&p.unreconstructed_primary_source.some(x=>x.includes('t/t²')),'remaining unexpanded source and phase/root constraints');
 ck(p.source_transcription_defect_repair?.path===file.defect&&Defect.defects?.length===2&&p.source_transcription_defect_repair?.adopted_author_source_only===true,'prior source transcription defect not erased');
 ck(!j(p).includes('W-SSC-')&&p.next_lawful_step?.includes('G0'),'track independence');
 return errors;
}
const baseline=check(),errors=[...baseline];
const mutants=[];
for(let i=0;i<4;i++)mutants.push(['erase source Eq17 component '+(i+1),s=>{s.eq17_components[i].rhs='MISSING'}]);
for(let i=0;i<3;i++)mutants.push(['erase diagonal B role '+(i+1),s=>{s.diagonal_operator_source[i].lhs='MISSING'}]);
mutants.push(
 ['conjugate wrong spinor B3',s=>{s.eq17_components[0].rhs=s.eq17_components[0].rhs.replace('tilde(psi1)*psi2','psi1*tilde(psi2)')}],
 ['swap B1 B2',s=>{s.eq17_components[0].rhs=s.eq17_components[0].rhs.replace('B1*B2-B2*B1','B2*B1-B1*B2')}],
 ['change t² to t in B3',s=>{s.eq17_components[0].rhs=s.eq17_components[0].rhs.replace('-t²(', '-t(')}],
 ['reverse vector order',s=>{s.eq17_components[1].rhs=s.eq17_components[1].rhs.replace('tilde(chi1)*tilde(psi2)','tilde(psi2)*tilde(chi1)')}],
 ['flip psi2 vector tilde',s=>{s.eq17_components[2].rhs=s.eq17_components[2].rhs.replace('tilde(v1)*tilde(chi2)','v1*tilde(chi2)')}],
 ['flip chi spinor sign',s=>{s.eq17_components[3].rhs=s.eq17_components[3].rhs.replace('-tilde(psi2)*tilde(v1)','+tilde(psi2)*tilde(v1)')}],
 ['remove chi t action',s=>{s.eq17_components[3].rhs=s.eq17_components[3].rhs.replace('t(B1)','B1')}],
 ['remove right-first parentheses',s=>{s.ordered_composition_example.source_formula=s.ordered_composition_example.source_formula.replace('tilde(e_a)*(e_b*e_c)','(tilde(e_a)*e_b)*e_c')}],
 ['mix quaternionic source carrier',s=>{s.ordered_composition_example.free_result='ordinary-quaternion chiral spinor carrier'}],
 ['promote split f4 source',s=>{s.source.real_form='split f4(4)'}],
 ['wrong journal version',s=>{s.source.published='2026-09-10 arxiv'}],
 ['erase source contradiction',s=>{s.negative_evidence.Eq1_ordinary_O_printed_conflict='fixed'}],
 ['fake t qualification',s=>{s.context.source_triality_action='t² is globally qualified primitive'}],
 ['source G0 complete',s=>{s.source_source_semantically_complete=true}],
 ['source frozen',s=>{s.source_census_frozen=true}],
 ['G1 unlawful',s=>{s.G1_authorized=true}],
 ['math theorem falsely qualified',s=>{s.global_mathematical_qualification=true}],
 ['external review false',s=>{s.external_cold_review_passed=true}],
 ['erase old correction',s=>{delete s.source_transcription_defect_repair}],
 ['stale frozen source table',s=>{s.parents.Eq1_source_table.git_blob_sha='WRONG'}],
 ['erase unverified reflections',s=>{s.unreconstructed_primary_source=s.unreconstructed_primary_source.filter(x=>!x.includes('reflection matrices'))}],
 ['source W import',s=>{s.context.source_triality_action='W-SSC-103 source authority'}]
);
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const p=copy(S),prev=j(p);fn(p);if(j(p)===prev)errors.push('mutation no-op '+name);else if(check(p).length===0)errors.push('escaped '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l05-f4-eq17-source-literal.v0.1',pass:errors.length===0,errors,eq17_source_component_rows:4,diagonal_roles:3,negative_source_table_preserved:true,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILURE':'TESTED',source_math_theorem_qualified:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
