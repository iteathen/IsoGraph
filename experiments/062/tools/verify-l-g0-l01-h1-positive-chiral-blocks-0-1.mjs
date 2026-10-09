import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const paths={
packet:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_24.json',gate:E+'L_CURRENT_STAGE_GATE_0_24.json',
cl71:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
cl4:L+'LISI_L01_ELECTROWEAK_CL4_HIGGS_SOURCE_G0_0_1.json',
table5:L+'LISI_L01_TABLE5_D4_ROOT_TRIALITY_SOURCE_G0_0_1.json',
spinDefect:E+'L032_H1_SPIN_COEFFICIENT_VS_MATRIX_CONJUGATION_FIDELITY_DEFECT_0_1.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const D=get(paths.packet),SSC=get(paths.ssc),Gate=get(paths.gate),defect=get(paths.spinDefect);
// Independently transcribed field-label layout from frozen L01 arXiv 0711.0770v1 Eq.(2.10), printed p12.
// Each of 16 entries is typed as a 2x2 spin matrix (or source field coefficient times identity).
const sourceRows=[
 ['(1/2)*omega_L+(i/2)*W^3','Wplus','-(1/4)*e_R*phiOne','+(1/4)*e_R*phiPlus'],
 ['Wminus','(1/2)*omega_L-(i/2)*W^3','+(1/4)*e_R*phiMinus','+(1/4)*e_R*phiZero'],
 ['-(1/4)*e_L*phiZero','+(1/4)*e_L*phiPlus','(1/2)*omega_R+(i/2)*B_1^3','B1plus'],
 ['+(1/4)*e_L*phiMinus','+(1/4)*e_L*phiOne','B1minus','(1/2)*omega_R-(i/2)*B_1^3']
];
const spinLabels=['nu_eL','eL','nu_eR','eR'];
const sOmega='omega_(L/R)=sum_tau=1..3 (omega_S^tau ∓ i*omega_T^tau)*i*sigma_tau; for REAL omega_S^tau and omega_T^tau, only the SOURCE COEFFICIENTS obey omega_R^tau=(omega_L^tau)^*. Matrix-level entrywise omega_R=(omega_L)^* is NOT asserted (i*sigma_tau includes complex Pauli factors).';
const phiExpected={phiPlus:'phi^1 - i*phi^2',phiMinus:'phi^1 + i*phi^2',phiZero:'-phi^3 - i*phi^4',phiOne:'-phi^3 + i*phi^4'};
const complex=(re=0,im=0)=>[re,im], add=(a,b)=>[a[0]+b[0],a[1]+b[1]],times=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const multScalar=(a,z)=>a.map(x=>times(x,z)),matrixPlus=(a,b)=>a.map((x,i)=>add(x,b[i])),zero2=()=>[complex(),complex(),complex(),complex()];
const sigma=[
 [complex(0),complex(1),complex(1),complex(0)],
 [complex(0),complex(0,-1),complex(0,1),complex(0)],
 [complex(1),complex(),complex(),complex(-1)]
],I=[complex(1),complex(),complex(),complex(1)];
const ePrimitive=(side,k)=>{
 if(k===3)return multScalar(I,complex(0,1));
 return multScalar(sigma[k],side==='R'?complex(0,-1):complex(0,1));
};
const phiBasis={
 phiPlus:[complex(1),complex(0,-1),complex(),complex()],
 phiMinus:[complex(1),complex(0,1),complex(),complex()],
 phiZero:[complex(),complex(),complex(-1),complex(0,-1)],
 phiOne:[complex(),complex(),complex(-1),complex(0,1)]
};
const mixedReg=/^([+-])\(1\/4\)\*e_([LR])\*(phiPlus|phiMinus|phiZero|phiOne)$/;
function mixedParse(s){
 const match=mixedReg.exec(s);return match?{sign:match[1]==='+'?1:-1,side:match[2],label:match[3]}:null;
}
const mixedPosition=[[0,2],[0,3],[1,2],[1,3],[2,0],[2,1],[3,0],[3,1]];
function sampleMatrix(coeff,index){
 return coeff.reduce((matrix,w,k)=>matrixPlus(matrix,multScalar(ePrimitive(index,k),complex(w))),zero2());
}
function mixAt(side,e,ph,phiName,sign){
 let em=zero2();for(let i=0;i<4;i++)em=matrixPlus(em,multScalar(ePrimitive(side,i),complex(e[i])));
 let scalar=complex();for(let j=0;j<4;j++){const v=phiBasis[phiName][j];scalar=add(scalar,times(v,complex(ph[j])));}
 return multScalar(em,times(scalar,complex(sign)));
}
function verify(packet=D){
 const errors=[],ck=(v,n)=>{if(!v)errors.push(n)},r=packet.displayed_4x4_2x2_field_blocks||{},k=packet.source_frame_and_spin_rules||{},ch=packet.source_chiral_embedding||{},roles=packet.source_graded_roles||{};
 ck(packet.schema==='isograph.lisi-l01-h1-positive-chiral-field-blocks-g0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.authority===false,'G0 source packet not mathematical authority');
 ck(packet.source?.id==='L01'&&packet.source?.revision==='arXiv:0711.0770v1 (2007-11-06)'&&packet.source?.main_location==='§2.2.3 Eq.(2.10), printed page12, zero-based PDF page12'&&packet.source?.modality==='AUTHOR_ASSERTED_OPERATOR_LAYOUT_NOT_COMPLETE_REAL_CLIFFORD_SOURCE_THEOREM','frozen original source revision/exact locator/modality');
 for(const [role,path]of [['SSC_0_24',paths.ssc],['G0_GATE_0_24',paths.gate],['Cl71_source',paths.cl71],['Cl4_Higgs_source',paths.cl4],['Table5_T3_source',paths.table5]])
  ck(packet.parents?.[role]?.path===path&&packet.parents?.[role]?.git_blob_sha===gitsha(path),'exact source parent git blob '+role);
 ck(SSC.items?.length===191&&Gate.current_lawful_state?.G1_authorized===false&&Gate.current_lawful_state?.G0_source_census_frozen===false,'current G0 source incomplete, no downstream replay');
 for(const key of ['source_census_frozen','source_complete','G1_authorized','mathematical_8x8_gamma_equivalence_qualified','external_cold_review_passed'])ck(packet[key]===false,'no manufactured source/Clifford authority '+key);
 ck(packet.source?.section==='§2.2.3 Graviweak D4' || packet.source?.subsource?.length===3,'source hierarchy and prior frame/Higgs dependencies');
 ck(roles.whole_source_connection==='H_1=(1/2)*omega+(1/4)*e*phi+w_ew'&&roles.ordered_mixed_ephi==='e*phi=sum_{mu,nu} e^mu phi^nu Gamma_mu GammaPrime_nu, source order e then phi and graded ONE_FORM result; no commutation or reassociation assumption.','H1 mixed real source coefficient and form grading');
 ck(roles.frame_e?.includes('ONE_FORM')&&roles.higgs_phi?.includes('SCALAR')&&roles.electroweak_wew?.includes('independent RIGHT Pati-Salam B_1'),'source type of frame, Higgs and W/B1 actors');
 ck(j(ch.printed_block_shape)===j([4,4])&&ch.block_entry_carrier?.includes('2x2')&&ch.source_statement?.includes('(8×8)')===false&&ch.source_statement?.includes('8x8'),'4-by-4 block matrix of 2-by-2 spinors is 8-by-8');
 ck(j(ch.spinor_input_column)===j(spinLabels)&&r.source_not_a_flat_4x4_scalar_matrix===true,'source spinor input actor column 4 x 2');
 ck(ch.source_2x2_block_action_proved_from_16x16_gamma_basis===false&&r.source_mathematical_8x8_Clifford_or_spinor_equivalence_not_independently_derived===true,'representational bridge NOT qualified');
 ck(j(r.row_order)===j(spinLabels)&&j(r.column_order)===j(spinLabels)&&j(r.ordered_rows)===j(sourceRows),'EXACT all sixteen original source field entries and source labels');
 ck(r.mixed_frame_Higgs_cell_count===8&&r.gravitational_plus_Cartan_diag_count===4&&r.charged_gauge_offdiag_count===4,'exact 8+4+4 typed cell census');
 ck(r.source_sign_orientations?.includes('(1,3)')&&r.source_sign_orientations?.includes('(3,1)')&&r.source_sign_orientations?.includes('e_R')&&r.source_sign_orientations?.includes('e_L'),'source negative mixed block signs and chiral frame roles');
 ck(k.source_chiral_frame?.includes('e_(L/R)=i*(e^4 ± sum_')&&k.source_chiral_frame?.includes('upper/RIGHT uses MINUS')&&k.source_chiral_frame?.includes('lower/LEFT uses PLUS'),'source eR eL exactly oriented');
 ck(k.source_chiral_spin===sOmega&&packet.source_fidelity_repair?.path===paths.spinDefect&&packet.source_fidelity_repair?.scope==='SOURCE_OPERATOR_COEFFICIENT_CONJUGATION_ONLY_NOT_MATRIX'&&defect.status.includes('CONFIRMED'),'omegaR omegaL source coefficient conjugation only; not whole matrix');
 ck(j(packet.source_Higgs_labels&&Object.fromEntries(Object.entries(packet.source_Higgs_labels).filter(([key])=>key!=='reality_guard')))===j(phiExpected)&&packet.source_Higgs_labels?.reality_guard?.includes('phiOne is NOT'),'four real Higgs component map, complex labels distinguish phiOne');
 ck(packet.source_chiral_embedding?.upper_right_block?.includes('e_R')&&packet.source_chiral_embedding?.lower_left_block?.includes('e_L'),'upper/right and lower/left spin frames no role conflation');
 ck(packet.important_defect_hazards?.length===5&&packet.open_source_dependencies?.length===4&&packet.open_source_dependencies?.some(x=>x.includes('16x16 Clifford-to-print H1 8x8')),'known hazards and incomplete Clifford basis transport conserved');
 ck(packet.important_defect_hazards?.some(x=>x.includes('omega_L^3/omega_R^3'))&&packet.important_defect_hazards?.some(x=>x.includes('phiOne'))&&packet.important_defect_hazards?.some(x=>x.includes('L05')),'preserve Cartan/source Higgs and historical L05 negative evidence');
 ck(packet.next_lawful_step?.startsWith('Independently verify all printed source H1')&&!j(packet).includes('W-SSC-'),'G0 source audit only no W import');
 if(errors.length)return {errors,stats:null};
 const mixed=r.ordered_rows.flatMap((row,i)=>row.flatMap((txt,j)=>mixedParse(txt)?[{i,j,term:mixedParse(txt)}]:[]));
 ck(mixed.length===8&&j(mixed.map(x=>[x.i,x.j]))===j(mixedPosition),'8 precise mixed source cell coordinates');
 for(const v of mixed){ck((v.i<2?v.term.side==='R':v.term.side==='L'),'chiral frame operator correctly typed at '+v.i+','+v.j);}
 let symbolicCells=0;
 // 8 printed e-phi cells, 4 frame basis components, 4 Higgs basis components, 4 complex 2x2 entries:
 // 8*4*4*4=512 independently recomputed complex-rational coefficient slots, with a SOURCE-READ expected sign/role recipe.
 const expectedPairings=[
  [0,2,-1,'R','phiOne'],[0,3,+1,'R','phiPlus'],[1,2,+1,'R','phiMinus'],[1,3,+1,'R','phiZero'],
  [2,0,-1,'L','phiZero'],[2,1,+1,'L','phiPlus'],[3,0,+1,'L','phiMinus'],[3,1,+1,'L','phiOne']];
 for(const [i,jj,sign,side,label]of expectedPairings){
  const got=mixedParse(r.ordered_rows[i][jj]);
  ck(j(got)===j({sign,side,label}),'printed source e/Higgs role at ['+i+','+jj+']');
  for(let iE=0;iE<4;iE++)for(let iP=0;iP<4;iP++){
   const expected=multScalar(ePrimitive(side,iE),times(phiBasis[label][iP],complex(sign)));
   const reconstructed=multScalar(ePrimitive(got.side,iE),times(phiBasis[got.label][iP],complex(got.sign)));
   ck(j(expected)===j(reconstructed),'source signed polynomial block '+[i,jj,iE,iP]);
   symbolicCells+=4;
  }
 }
 // Cross-check 81 real frame tuples and 81 real scalar Higgs tuples against the independent
 // source-readable 8 two-spinor block prescription. NO claim of equality to the larger 16x16 Gamma packet.
 const domain=[-1,0,1],tuples=[];
 for(const e1 of domain)for(const e2 of domain)for(const e3 of domain)for(const e4 of domain)tuples.push([e1,e2,e3,e4]);
 let numericCells=0,firstMismatch=null;
 for(const e of tuples)for(const ph of tuples)for(const [i,jj,sign,side,label]of expectedPairings){
  const got=mixedParse(r.ordered_rows[i][jj]);
  const actual=mixAt(got.side,e,ph,got.label,got.sign),want=mixAt(side,e,ph,label,sign);
  if(j(actual)!==j(want))firstMismatch??={i,jj,e,ph,actual,want};
  numericCells+=4;
 }
 ck(firstMismatch===null&&numericCells===6561*8*4,'exact all real frame/Higgs chiral 2x2 source cases');
 ck(j(ePrimitive('L',3))===j(ePrimitive('R',3)),'common frame time coefficient');
 for(let k=0;k<3;k++)ck(j(matrixPlus(ePrimitive('L',k),ePrimitive('R',k)))===j(zero2()),'source opposite spatial frame sign '+k);
 ck(j(phiBasis.phiZero[3])===j(complex(0,-1))&&j(phiBasis.phiOne[3])===j(complex(0,1)),'source distinct phiZero/phiOne complex-conjugate signs');
 return {errors,stats:{printed_field_block_rows:4,printed_block_entries:16,source_operator_dimension:8,source_spinor_block_dimension:2,mixed_entries:8,complex_polynomial_coefficient_cells:symbolicCells,real_frame_tuples:81,real_higgs_tuples:81,real_frame_Higgs_pairs:6561,finite_mixed_source_matrix_cells:numericCells,unqualified_16x16_source_gamma_to_8x8_transport:true}};
}
const baseline=verify(),errors=[...baseline.errors],muts=[];
for(let i=0;i<4;i++)for(let k=0;k<4;k++)
 muts.push(['wrong H1 source entry '+i+','+k,p=>{p.displayed_4x4_2x2_field_blocks.ordered_rows[i][k]='WRONG';}]);
muts.push(
 ['erase source row',p=>{p.displayed_4x4_2x2_field_blocks.ordered_rows.pop()}],
 ['switch eR to eL',p=>{p.displayed_4x4_2x2_field_blocks.ordered_rows[0][2]='-(1/4)*e_L*phiOne'}],
 ['reverse sign top right',p=>{p.displayed_4x4_2x2_field_blocks.ordered_rows[0][3]='-(1/4)*e_R*phiPlus'}],
 ['fake 4x4 scalar matrix',p=>{p.displayed_4x4_2x2_field_blocks.source_not_a_flat_4x4_scalar_matrix=false}],
 ['fake 16x16 gamma equivalence',p=>{p.source_chiral_embedding.source_2x2_block_action_proved_from_16x16_gamma_basis=true}],
 ['recast Higgs scalar as one-form',p=>{p.source_graded_roles.higgs_phi='Higgs is a 1-form'}],
 ['premature source complete',p=>{p.source_complete=true}],
 ['premature source frozen',p=>{p.source_census_frozen=true}],
 ['promote theorem',p=>{p.mathematical_8x8_gamma_equivalence_qualified=true}],
 ['promote G1',p=>{p.G1_authorized=true}],
 ['fabricate external review',p=>{p.external_cold_review_passed=true}],
 ['make whole omega matrix conjugation',p=>{p.source_frame_and_spin_rules.source_chiral_spin='omega_R=(omega_L)^*'}],
 ['lose source spin repair',p=>{delete p.source_fidelity_repair}],
 ['wrong Higgs phiOne',p=>{p.source_Higgs_labels.phiOne='phi^1'}],
 ['wrong Higgs phiZero',p=>{p.source_Higgs_labels.phiZero='-phi^3 + i*phi^4'}],
 ['change original arxiv source revision',p=>{p.source.revision='arXiv:0711.0770v2'}],
 ['erase old Cl71 source SHA',p=>{p.parents.Cl71_source.git_blob_sha='STALE'}],
 ['import W research',p=>{p.source_graded_roles.frame_e+=' W-SSC-097'}]
);
let rejected=0;
if(!baseline.errors.length){
 for(const [name,fn]of muts){const x=cp(D),old=j(x);fn(x);
  if(j(x)===old)errors.push('NOOP '+name);
  else if(verify(x).errors.length===0)errors.push('ESCAPED '+name);
  else rejected++;}
}
console.log(JSON.stringify({schema:'isograph.exp062-l01-h1-positive-chiral-source-blocks.v0.1',pass:errors.length===0,errors:errors.slice(0,28),
 baseline:baseline.stats,adversarial_defined:muts.length,adversarial_rejected:rejected,mutation_gate:baseline.errors.length?'BASELINE_FAILED':'TESTED',
 source_complete:false,G1_authorized:false,full_16x16_to_8x8_clifford_transport_proved:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
