import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={packet:L+'LISI_L01_ELECTROWEAK_CL4_HIGGS_SOURCE_G0_0_1.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_20.json',gate:E+'L_CURRENT_STAGE_GATE_0_20.json',grav:L+'LISI_L01_EQ2_8_CHIRAL_SOURCE_FINITE_G0_0_1.json',visual:L+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),J=JSON.stringify,clone=x=>JSON.parse(J(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const D=get(P.packet),SSC=get(P.ssc),GATE=get(P.gate);
const C=(r=0,i=0)=>[r,i],zero=(m,n)=>Array.from({length:m},()=>Array.from({length:n},()=>C()));
const add=(x,y)=>C(x[0]+y[0],x[1]+y[1]),neg=x=>C(-x[0],-x[1]);
const mul=(x,y)=>C(x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]);
const conj=x=>C(x[0],-x[1]),scale=(x,a)=>C(x[0]*a,x[1]*a);
const addM=(A,B)=>A.map((row,i)=>row.map((v,j)=>add(v,B[i][j])));
const scaleM=(A,c)=>A.map(row=>row.map(v=>mul(v,c)));
const transposeConj=A=>A[0].map((_,i)=>A.map(row=>conj(row[i])));
const mulM=(A,B)=>Array.from({length:A.length},(_,i)=>Array.from({length:B[0].length},(_,j)=>A[i].reduce((acc,a,k)=>add(acc,mul(a,B[k][j])),C())));
const kronecker=(A,B)=>Array.from({length:A.length*B.length},(_,i)=>Array.from({length:A[0].length*B[0].length},(_,j)=>mul(A[Math.floor(i/B.length)][Math.floor(j/B[0].length)],B[i%B.length][j%B[0].length])));
const I2=[[C(1),C()],[C(),C(1)]],s1=[[C(),C(1)],[C(1),C()]],s2=[[C(),C(0,-1)],[C(0,1),C()]],s3=[[C(1),C()],[C(),C(-1)]];
const S=[s1,s2,s3];
const Gamma=[kronecker(s1,s1),kronecker(s1,s2),kronecker(s1,s3),kronecker(s2,I2)];
const symbol=[
['0','0','-phiOne','phiPlus'],['0','0','phiMinus','phiZero'],
['-phiZero','phiPlus','0','0'],['phiMinus','phiOne','0','0']
];
function labels(phi){const [a,b,c,d]=phi;return{phiPlus:C(a,-b),phiMinus:C(a,b),phiZero:C(-c,-d),phiOne:C(-c,d)};}
const evaluateSymbolic=(phi)=>{
 const x=labels(phi);
 return symbol.map(row=>row.map(t=>t==='0'?C():t[0]==='-'?neg(x[t.slice(1)]):x[t]));
};
function rawBlocks(phi){
 const [a,b,c,d]=phi;
 const upper=[[C(c,-d),C(a,-b)],[C(a,b),C(-c,-d)]];
 const lower=[[C(c,d),C(a,-b)],[C(a,b),C(-c,d)]];
 const Z=zero(4,4);
 for(let i=0;i<2;i++)for(let j=0;j<2;j++){Z[i][2+j]=upper[i][j];Z[2+i][j]=lower[i][j];}
 return Z;
}
const Equal=(A,B)=>J(A)===J(B);
const TUPLES=[];
for(const a of [-1,0,1])for(const b of [-1,0,1])for(const c of [-1,0,1])for(const d of [-1,0,1])TUPLES.push([a,b,c,d]);
function testSource(src=D){
 const errors=[],ck=(x,why)=>{if(!x)errors.push(why)};
 const p=src.primary_source||{},sc=src.source_clifford||{},f=src.finite_scope||{},u=src.unresolved||{};
 ck(src.schema==='isograph.lisi-l01-electroweak-cl4-higgs-g0-source.v0.1'&&src.status==='SOURCE_EXACT_L01_SECTION2_2_2_HIGGS_CL4_FINITE_CANDIDATE_NOT_G0_FIXED_POINT'&&src.track==='L'&&src.stage==='G0'&&src.authority===false,'source G0 candidate not authority');
 for(const key of ['source_complete','source_census_frozen','mathematical_theorem_qualified','G1_authorized','external_review_passed'])ck(src[key]===false,'forbidden source or stage promotion '+key);
 ck(p.id==='L01'&&p.author==='A. Garrett Lisi'&&p.revision==='arXiv:0711.0770v1, 2007-11-06'&&p.url==='https://arxiv.org/pdf/0711.0770v1'&&p.printed_section==='§2.2.2 Electroweak D2'&&p.printed_page===10&&p.pdf_zero_based_page===10,'exact frozen primary source print and location');
 ck(p.source_modality==='AUTHOR_PROPOSES_SENSIBLE_REPRESENTATION_AND_WRITES_EXACT_MATRIX; NOT_FULL_PHYSICAL_DERIVATION','proposal source modality retained');
 for(const [name,path]of [['ssc_020',P.ssc],['gate_020',P.gate],['gravitational_source',P.grav],['L01_31_page_visual',P.visual]])ck(src.predecessors?.[name]?.path===path&&src.predecessors?.[name]?.git_blob_sha===sha(path),'exact original source predecessor '+name);
 ck(SSC.items.length===191&&GATE.current_lawful_state?.G1_authorized===false&&GATE.current_lawful_state?.G0_source_census_frozen===false,'actual current frozen authority tuple G0 only');
 ck(sc.carrier==='Cl(4) positive Euclidean signature, not earlier gravitational Cl(3,1)','Cl4 vs Cl31 carrier guard');
 const sig=sc.Pauli_2x2||{};
 ck(sig.sigma1==='[[0,1],[1,0]]'&&sig.sigma2==='[[0,-i],[i,0]]'&&sig.sigma3==='[[1,0],[0,-1]]'&&sig.identity==='[[1,0],[0,1]]','exact Pauli independent source signs');
 ck(J(sc.generators_ordered?.map(x=>[x.source_label,x.Kronecker]))===J([['gammaPrime1','sigma1 tensor sigma1'],['gammaPrime2','sigma1 tensor sigma2'],['gammaPrime3','sigma1 tensor sigma3'],['gammaPrime4','sigma2 tensor identity']]),'four ordered generators; no gravitational i');
 ck(sc.source_vector==='phi = sum_{mu=1}^4 phi^mu gammaPrime_mu; phi^1,phi^2,phi^3,phi^4 are real independent source components','source real coefficient and binder scope');
 ck(sc.source_blocks?.upper_right==='-i*phi^4*I2 + sum_{eps=1}^3 phi^eps*sigma_eps'&&sc.source_blocks?.lower_left==='+i*phi^4*I2 + sum_{eps=1}^3 phi^eps*sigma_eps','upper/lower conjugate blocks are not swapped');
 ck(J(sc.source_4x4_matrix)===J(symbol),'all sixteen source cells, phiOne vs phi^1');
 const srcLabels=sc.source_labels||{};
 ck(J(srcLabels)===J({phiPlus:'phi^1 - i*phi^2',phiMinus:'phi^1 + i*phi^2',phiZero:'-phi^3 - i*phi^4',phiOne:'-phi^3 + i*phi^4'}),'four source phi label definitions exact');
 ck(sc.distinct_binders?.length===3&&sc.distinct_binders[0]?.includes('mu ranges 1..4')&&sc.distinct_binders[1]?.includes('eps ranges 1..3')&&sc.distinct_binders[2]?.includes('matrix output, columns input'),'matrix row/col and summed binders retained');
 ck(sc.dangerous_identity==='phiOne is NOT the real field coefficient phi^1; phiOne is a distinct complex source Higgs label formed from phi^3 and phi^4','explicit phiOne label nonidentity');
 ck(J(sc.source_reality_conditions)===J(['phiMinus=conjugate(phiPlus)','phiOne=conjugate(phiZero)','phi^1..phi^4 are four real fields; arbitrary complex phi^mu are outside the stated source scope']),'source 4-real domain not arbitrary C4');
 ck(sc.preserved_modalities?.length===3&&sc.preserved_modalities[0].includes('CONSIDER')&&sc.preserved_modalities[1].includes('different fermion chiralities')&&sc.preserved_modalities[2].includes('Lie algebra decomposition'),'no E8 or global group theorem inferred');
 ck(J(f.real_input_values)===J([-1,0,1])&&f.real_phi_tuples===81&&f.Clifford_ordered_generator_pairs===16&&f.Higgs_4x4_entries_per_tuple===16&&f.finite_vector_matrix_cells===1296,'finite exact real domain and cells');
 ck(f.Clifford_expected_anticommutator==='gammaPrime_mu gammaPrime_nu + gammaPrime_nu gammaPrime_mu = 2*delta_{mu nu}*I4','positive Cl4 anticommutator expected');
 ck(f.finite_positive_checks?.length===4,'independent positive source-vector and matrix checks tracked');
 ck(J(f.source_excluded_negative_case)===J({phi_components:['0','0','0','i'],source_real_coefficients_violated:true,expected_phiHermitian:false,disposition:'DOMAIN_NEGATIVE_CONTROL_NOT_SOURCE_COUNTEREXAMPLE'}),'source excluded imaginary phi4 counterexample');
 ck(f.historical_real_form_warning?.includes('real SL(2,C)=SL(2,R)xSL(2,R)')&&f.historical_real_form_warning?.includes('not repaired'),'old printed real Spin claim remains uncorrected');
 for(const k of ['full_L01_primary_source_assertion_census','whole_source_L01_L06_census_complete','G0_fixed_point','G1_to_G7_authorized','cross_track_synthesis','external_cold_review_passed'])ck(u[k]===false,'open source boundary '+k);
 ck(u.electroweak_connection?.includes('require separate typed source audit')&&u.Cartan_and_weights?.includes('remain unresolved'),'do not promote connection and Higgs weight claims');
 ck(!J(src).includes('W-SSC-')&&src.next_lawful_step?.includes('G0 source partial'),'track independence');
 // The arithmetic witnesses are independent of the metadata, and are re-run for every mutant only after a passing baseline.
 let clBad=0,hermitianBad=0,normBad=0,sourceMatrixBad=0,blockBad=0,tupleCount=0,first;
 const I4=zero(4,4);for(let i=0;i<4;i++)I4[i][i]=C(1);
 for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const A=addM(mulM(Gamma[a],Gamma[b]),mulM(Gamma[b],Gamma[a]));
  const B=scaleM(I4,C(a===b?2:0));
  if(!Equal(A,B)){clBad++;first??={kind:'anticommutator',a,b};}
 }
 for(const phi of TUPLES){
  tupleCount++;
  const mat=Gamma.reduce((acc,m,i)=>addM(acc,scaleM(m,C(phi[i]))),zero(4,4));
  const E=evaluateSymbolic(phi),raw=rawBlocks(phi);
  if(!Equal(mat,E)){sourceMatrixBad++;first??={kind:'Higgs raw vs labels',phi};}
  if(!Equal(raw,E)){blockBad++;first??={kind:'Higgs block vs labels',phi};}
  if(!Equal(mat,transposeConj(mat))){hermitianBad++;first??={kind:'Hermitian',phi};}
  const norm=phi.reduce((s,v)=>s+v*v,0);
  if(!Equal(mulM(mat,mat),scaleM(I4,C(norm)))){normBad++;first??={kind:'Cl4 vector square',phi};}
 }
 const excluded=scaleM(Gamma[3],C(0,1));
 const excludedIsHermitian=Equal(excluded,transposeConj(excluded));
 ck(tupleCount===81&&clBad===0&&hermitianBad===0&&normBad===0&&sourceMatrixBad===0&&blockBad===0,'all finite exact Cl4 and 4x4 real source checks '+J({clBad,hermitianBad,normBad,sourceMatrixBad,blockBad,first}));
 ck(excludedIsHermitian===false,'imaginary phi4 is out-of-scope and not source-Hermitian');
 return errors;
}
const baseline=testSource(),errors=[...baseline],mutants=[
['flip source sigma2 sign',s=>{s.source_clifford.Pauli_2x2.sigma2='[[0,i],[-i,0]]'}],
['flip gammaPrime4 i like gravity',s=>{s.source_clifford.generators_ordered[3].Kronecker='i*sigma1 tensor identity'}],
['swap gammaPrime2 and 3',s=>{s.source_clifford.generators_ordered[1].Kronecker='sigma1 tensor sigma3'}],
['replace Cl4 with Cl31',s=>{s.source_clifford.carrier='Cl(3,1)'}],
['replace Higgs first output',s=>{s.source_clifford.source_4x4_matrix[0][2]='-phi^1'}],
['erase Higgs conjugate lower block',s=>{s.source_clifford.source_4x4_matrix[2][0]='-phiOne'}],
['flip Higgs third row sign',s=>{s.source_clifford.source_4x4_matrix[2][0]='phiZero'}],
['swap upper and lower block sign',s=>{s.source_clifford.source_blocks.upper_right='+i*phi^4*I2 + sum_{eps=1}^3 phi^eps*sigma_eps'}],
['flip phiPlus sign',s=>{s.source_clifford.source_labels.phiPlus='phi^1 + i*phi^2'}],
['flip phiOne fourth sign',s=>{s.source_clifford.source_labels.phiOne='-phi^3 - i*phi^4'}],
['misread phiOne as real phi^1',s=>{s.source_clifford.dangerous_identity='phiOne=phi^1'}],
['replace four real with complex',s=>{s.source_clifford.source_vector='all phi complex'}],
['pretend full matrix all complex',s=>{s.source_clifford.source_reality_conditions[2]='phi^1..phi^4 arbitrary complex'}],
['wrong source locator',s=>{s.primary_source.pdf_zero_based_page=9}],
['switch L source version',s=>{s.primary_source.revision='arXiv:0711.0770v2'}],
['erase modality warning',s=>{s.primary_source.source_modality='ESTABLISHED_E8_THEOREM'}],
['change finite 81 cases',s=>{s.finite_scope.real_phi_tuples=80}],
['change 1296 entries',s=>{s.finite_scope.finite_vector_matrix_cells=1280}],
['add imaginary Phi source as real',s=>{s.finite_scope.source_excluded_negative_case.source_real_coefficients_violated=false}],
['assert electroweak connection closed',s=>{s.unresolved.electroweak_connection='FULLY_QUALIFIED'}],
['assert physical E8 proof',s=>{s.source_clifford.preserved_modalities[0]='E8 physics proved'}],
['assert source complete',s=>{s.source_complete=true}],
['assert entire Cl4 theorem',s=>{s.mathematical_theorem_qualified=true}],
['authorize G1',s=>{s.G1_authorized=true}],
['invent external cold review',s=>{s.external_review_passed=true}],
['tamper source census parent',s=>{s.predecessors.ssc_020.git_blob_sha='stale'}],
['tamper stage parent',s=>{s.predecessors.gate_020.git_blob_sha='stale'}],
['cross-track premise',s=>{s.primary_source.source_modality+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){
 const s=clone(D),before=J(s);fn(s);
 if(J(s)===before)errors.push('NOOP '+name);
 else if(testSource(s).length===0)errors.push('ESCAPED '+name);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l01-electroweak-cl4-higgs-source.v0.1',pass:!errors.length,errors,Cl4_ordered_gamma_pairs:16,source_real_phi_tuples:81,source_Higgs_matrix_cells:1296,source_positive_mismatches_expected:0,negative_imaginary_phi4_source_admissible:false,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',L01_whole_source_complete:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
