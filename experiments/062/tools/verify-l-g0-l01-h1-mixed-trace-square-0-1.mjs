import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={packet:L+'LISI_L01_H1_MIXED_TRACE_SQUARE_SIMILARITY_OBSTRUCTION_G0_0_1.json',
 previous:L+'LISI_L01_H1_GAMMA_TO_PRINTED_RELATIVE_PHASE_DIAGNOSTIC_G0_0_1.json',
 cl:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
 H1:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_25.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_25.json',
 verifier:E+'tools/verify-l-g0-l01-h1-gamma-relative-phase-0-1.mjs'};
const parse=f=>JSON.parse(fs.readFileSync(f,'utf8')),J=JSON.stringify,C=x=>JSON.parse(J(x));
const Sha=f=>{const b=fs.readFileSync(f);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const A=parse(p.packet),Cl=parse(p.cl),H=parse(p.H1),Prev=parse(p.previous),SSC=parse(p.ssc),Gate=parse(p.gate);
const Z=(r=0,i=0)=>[r,i],add=(a,b)=>[a[0]+b[0],a[1]+b[1]],mult=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const zeros=(r,c=r)=>Array.from({length:r},()=>Array.from({length:c},()=>Z()));
const matmul=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((v,x,k)=>add(v,mult(x,b[k][j])),Z())));
const times=(a,c)=>a.map(row=>row.map(x=>mult(x,c)));
const kron=(a,b)=>a.flatMap(row=>b.map(br=>row.flatMap(x=>br.map(y=>mult(x,y)))));
const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Z(i===j?1:0)));
const q2=[[Z(),Z(1)],[Z(1),Z()]],qY=[[Z(),Z(0,-1)],[Z(0,1),Z()]],qZ=[[Z(1),Z()],[Z(),Z(-1)]],I=identity(2);
const Pauli={sigma1:q2,sigma2:qY,sigma3:qZ,I2:I};
const expectedTensors=[
 ['Gamma1','sigma2 tensor sigma3 tensor I2 tensor sigma1'],
 ['Gamma2','sigma2 tensor sigma3 tensor I2 tensor sigma2'],
 ['Gamma3','sigma2 tensor sigma3 tensor I2 tensor sigma3'],
 ['Gamma4','i*sigma1 tensor I2 tensor I2 tensor I2'],
 ['GammaPrime1','sigma2 tensor sigma1 tensor sigma1 tensor I2'],
 ['GammaPrime2','sigma2 tensor sigma1 tensor sigma2 tensor I2'],
 ['GammaPrime3','sigma2 tensor sigma1 tensor sigma3 tensor I2'],
 ['GammaPrime4','sigma2 tensor sigma2 tensor I2 tensor I2']
];
const printedRows=[
 ['(1/2)*omega_L+(i/2)*W^3','Wplus','-(1/4)*e_R*phiOne','+(1/4)*e_R*phiPlus'],
 ['Wminus','(1/2)*omega_L-(i/2)*W^3','+(1/4)*e_R*phiMinus','+(1/4)*e_R*phiZero'],
 ['-(1/4)*e_L*phiZero','+(1/4)*e_L*phiPlus','(1/2)*omega_R+(i/2)*B_1^3','B1plus'],
 ['+(1/4)*e_L*phiMinus','+(1/4)*e_L*phiOne','B1minus','(1/2)*omega_R-(i/2)*B_1^3']
];
const phiCoeff={phiPlus:[Z(1),Z(0,-1),Z(),Z()],phiMinus:[Z(1),Z(0,1),Z(),Z()],
 phiZero:[Z(),Z(),Z(-1),Z(0,-1)],phiOne:[Z(),Z(),Z(-1),Z(0,1)]};
const rel=(s)=>{const v=s.startsWith('i*');const parts=(v?s.slice(2):s).split(' tensor ');
 if(parts.length!==4||parts.some(x=>!Pauli[x]))throw Error('Bad Pauli tensor source');
 const matrix=parts.map(x=>Pauli[x]).reduce(kron);
 if(matrix.length!==16||matrix[0].length!==16)throw Error('Not a 16x16 tensor');
 return v?times(matrix,Z(0,1)):matrix;};
const top=A=>A.slice(0,8).map(row=>row.slice(0,8));
const regex=/^([+-])\(1\/4\)\*e_([LR])\*(phiPlus|phiMinus|phiZero|phiOne)$/;
function printedBasis(mu,nu,rows){
 const result=zeros(8);
 for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  const m=regex.exec(rows[i][j]);if(!m)continue;
  const sig=m[1]==='+'?Z(1):Z(-1),ph=phiCoeff[m[3]][nu];
  const e=mu===3?times(I,Z(0,1)):times([q2,qY,qZ][mu],m[2]==='R'?Z(0,-1):Z(0,1));
  const term=times(e,mult(sig,ph));
  for(let r=0;r<2;r++)for(let c=0;c<2;c++)result[i*2+r][j*2+c]=term[r][c];
 }
 return result;
}
const equal=(a,b)=>J(a)===J(b);
const square=a=>matmul(a,a),tr=a=>a.reduce((v,row,i)=>add(v,row[i]),Z());
const nonzeroCells=(a,b)=>a.reduce((num,row,i)=>num+row.filter((x,j)=>!equal(x,b[i][j])).length,0);
function verify(packet=A,cl=Cl,h1=H){
 const errors=[],ck=(v,label)=>{if(!v)errors.push(label)};
 ck(packet.schema==='isograph.lisi-l01-h1-mixed-generator-trace-square-obstruction.g0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.authority===false,'G0 source research packet');
 ck(packet.source?.id==='L01'&&packet.source?.revision==='arXiv:0711.0770v1 dated 2007-11-06'&&packet.source?.source_claim?.includes('first quadrant'),'frozen source and source H1 exact source claim');
 for(const [key,file]of[['phase_diagnostic',p.previous],['Cl71_source',p.cl],['H1_printed',p.H1],['SSC0_25',p.ssc],['current_gate0_25',p.gate],['prior_phase_verifier',p.verifier]])
  ck(packet.input_blobs?.[key]?.path===file&&packet.input_blobs?.[key]?.git_blob_sha===Sha(file),'exact source provenance '+key);
 for(const k of ['source_census_frozen','full_L01_source_audited','source_mathematical_theorem_qualified','G1_authorized','external_cold_review_passed'])ck(packet[k]===false,'no premature source closure '+k);
 ck(SSC.items?.length===191&&Gate.current_lawful_state?.G1_authorized===false&&Gate.current_lawful_state?.G0_source_census_frozen===false,'current G0 not closed');
 ck(Prev.finite_claim_under_declared_representation?.direct_native_tensor_vs_printed_H1_mixed_coefficient_mismatches===128,'historical selected natural basis scope');
 ck(J(cl.gamma_source?.eight_ordered_generators?.map(x=>[x.label,x.source_tensor]))===J(expectedTensors),'all eight primary-source Clifford Pauli factors');
 ck(J(h1.displayed_4x4_2x2_field_blocks?.ordered_rows)===J(printedRows),'all sixteen H1 printed source matrix entries');
 ck(h1.source_frame_and_spin_rules?.source_chiral_frame?.includes('RIGHT uses MINUS')&&h1.source_Higgs_labels?.phiPlus==='phi^1 - i*phi^2'&&h1.source_Higgs_labels?.phiMinus==='phi^1 + i*phi^2'&&h1.source_Higgs_labels?.phiZero==='-phi^3 - i*phi^4'&&h1.source_Higgs_labels?.phiOne==='-phi^3 + i*phi^4','H1 real Higgs four components and source frame i conventions');
 const scope=packet.scalar_and_matrix_domain||{},lemma=scope.invariance_lemma||'',w=packet.source_pauli_analytic_first_witness||{},expect=packet.source_all_pairs_expected||{};
 ck(scope.basis_change_claim_tested?.includes('CONSTANT_INVERTIBLE_COMPLEX_SIMILARITY')&&scope.coefficients?.includes('ONE_FORM')===false&&scope.coefficients?.includes('one-form')&&scope.printed_field_matrix?.includes('P_mu_nu'),'exact field coefficients and limited similarity operation');
 ck(lemma.includes('tr((S^-1 X S)^2)=tr(S^-1 X^2 S)=tr(X^2)'),'general exact similarity invariant (not sampled S)');
 ck(w.mu===1&&w.nu===1&&w.native_trace_square===-8&&w.printed_trace_square===8&&w.nonzero_trace_gap===16&&w.basis_only_similarity_possible===false,'source-exact analytic invariant');
 ck(w.native_source_Clifford?.includes('i*(sigma2 tensor sigma1 tensor sigma1)')&&w.printed_source_H1?.startsWith('P_11 = sigma2 tensor sigma1 tensor sigma1'),'analytic Pauli product and source H1 printed i-frame');
 ck(expect.generator_pairs===16&&expect.each_matrix_dimension===8&&expect.total_cells===1024&&expect.direct_native_vs_printed_mismatch_cells===128&&expect.different_trace_squares_pairs===16&&expect.basis_only_similarity_obstructed_for_each_pair===true,'finite 16-pair source claim');
 ck(expect.global_phase_diagnostic==='P_mu_nu=(-i)*X_mu_nu on all sixteen tested coefficient matrices','previous exact phase observation not authority');
 ck(packet.discrepancy_disposition?.source_error_ownership?.startsWith('UNRESOLVED')&&packet.discrepancy_disposition?.basis_only_explanation?.startsWith('FALSIFIED')&&packet.discrepancy_disposition?.independent_external_referee_passed===false,'do not confuse falsifying basis-only with author error');
 ck(packet.nonclaims?.length===5&&!J(packet).includes('W-SSC-'),'no full source theory or W track');
 if(errors.length)return{errors,results:null};
 try {
 const G=cl.gamma_source.eight_ordered_generators.map(x=>rel(x.source_tensor)),xTr=[],yTr=[];
 let nativeVsPrinted=0,phaseGap=0,traceGap=0,sourceSignChecks=0,squareMiss=0,first=null;
 for(let mu=0;mu<4;mu++)for(let nu=0;nu<4;nu++){
  const X=top(matmul(G[mu],G[nu+4])),P=printedBasis(mu,nu,h1.displayed_4x4_2x2_field_blocks.ordered_rows);
  const metric=mu===3?-1:+1;
  const xSquare=square(X),pSquare=square(P);
  const needNative=times(identity(8),Z(-metric)),needPrinted=times(identity(8),Z(metric));
  if(!equal(xSquare,needNative)||!equal(pSquare,needPrinted))squareMiss++;
  const native=tr(xSquare),printed=tr(pSquare);xTr.push(native[0]);yTr.push(printed[0]);
  if(!equal(native,Z(-8*metric))||!equal(printed,Z(8*metric)))traceGap++;
  const phase=times(X,Z(0,-1));
  phaseGap+=nonzeroCells(P,phase);nativeVsPrinted+=nonzeroCells(X,P);
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){sourceSignChecks++;
   if(!first&&!equal(X[r][c],P[r][c]))first={mu:mu+1,nu:nu+1,row:r,col:c,native:X[r][c],printed:P[r][c]};}
 }
 ck(squareMiss===0&&traceGap===0,'all 16 pair squared matrices equal their exact source signature-predicted opposite ±I8');
 ck(J(xTr)===J(expect.source_native_square_traces)&&J(yTr)===J(expect.printed_H1_square_traces),'all 16 exact trace-square source evidence');
 ck(nativeVsPrinted===128&&phaseGap===0&&sourceSignChecks===1024,'printed and raw source independent 1024-cell comparison');
 ck(first&&first.mu===1&&first.nu===1&&first.row===0&&first.col===7&&equal(first.native,Z(1))&&equal(first.printed,Z(0,-1)),'finite first witness original source');
 const X11=top(matmul(G[0],G[4]));
 const independentAnalytic=times(kron(kron(qY,q2),q2),Z(0,1));
 const P11=printedBasis(0,0,h1.displayed_4x4_2x2_field_blocks.ordered_rows);
 const independentPrint=kron(kron(qY,q2),q2);
 ck(equal(X11,independentAnalytic)&&equal(P11,independentPrint),'independent Kronecker analytic first witness');
 const g12=top(matmul(G[0],G[1])),ew12=top(matmul(G[4],G[5]));
 let positive=true;
 for(let i=0;i<8;i++)for(let j=0;j<8;j++){
  const expectedG=i===j?Z(0,i%2===0?1:-1):Z();
  const expectedEW=i===j?Z(0,Math.floor(i/2)%2===0?1:-1):Z();
  if(!equal(g12[i][j],expectedG)||!equal(ew12[i][j],expectedEW))positive=false;
 }
 ck(positive,'exact pure-gravity and pure-EW source Γ-bivector orientation controls');
 return{errors,results:{source_pairs:16,source_matrix_cells:1024,native_vs_printed_differences:nativeVsPrinted,after_minus_i_differences:phaseGap,
 native_square_traces:xTr,printed_square_traces:yTr,
 pair_matrix_square_failures:squareMiss,trace_square_failures:traceGap,
 first_witness:first,first_native_trace:tr(square(X11)),first_printed_trace:tr(square(P11)),
 pure_sector_controls_passed:positive,source_basis_only_similarity_possible:false,
 whole_author_source_or_physics_invalid_proved:false,source_revision_unchanged:true}};
 }catch(err){errors.push('source-math implementation failure '+String(err));return{errors,results:null};}
}
const baseline=verify(),errors=[...baseline.errors];
const mutants=[
 ['invent equal source spectra',x=>{x.source_pauli_analytic_first_witness.printed_trace_square=-8}],
 ['erase obstruction gap',x=>{x.source_pauli_analytic_first_witness.nonzero_trace_gap=0}],
 ['change first source mu',x=>{x.source_pauli_analytic_first_witness.mu=2}],
 ['change original gamma source',x=>{x.source_pauli_analytic_first_witness.native_source_Clifford='Gamma1GammaPrime1=I8'}],
 ['change printed source eR',x=>{x.source_pauli_analytic_first_witness.printed_source_H1='P_11=i*X_11'}],
 ['change similarity claim',x=>{x.source_pauli_analytic_first_witness.basis_only_similarity_possible=true}],
 ['misstate operator invariant',x=>{x.scalar_and_matrix_domain.invariance_lemma='trace similarity may change'}],
 ['allow physical field normalization',x=>{x.discrepancy_disposition.source_error_ownership='AUTHOR_MATH_WRONG_CONFIRMED'}],
 ['erase constant-complex similarity scope',x=>{x.scalar_and_matrix_domain.basis_change_claim_tested='no limit'}],
 ['replace 16-pair trace',x=>{x.source_all_pairs_expected.source_native_square_traces[0]=+8}],
 ['replace printed trace',x=>{x.source_all_pairs_expected.printed_H1_square_traces[15]=+8}],
 ['fabricate all pairs identical',x=>{x.source_all_pairs_expected.direct_native_vs_printed_mismatch_cells=0}],
 ['erase all pair obstruction',x=>{x.source_all_pairs_expected.different_trace_squares_pairs=0}],
 ['change source scalar phase',x=>{x.source_all_pairs_expected.global_phase_diagnostic='P=X'}],
 ['fake current census freeze',x=>{x.source_census_frozen=true}],
 ['fake H1 mathematics theorem',x=>{x.source_mathematical_theorem_qualified=true}],
 ['promote current G1',x=>{x.G1_authorized=true}],
 ['fabricate independent reviewer',x=>{x.external_cold_review_passed=true}],
 ['change frozen L01 revision',x=>{x.source.revision='0711.0770v2'}],
 ['mis-pin primary gamma source',x=>{x.input_blobs.Cl71_source.git_blob_sha='stale'}],
 ['mis-pin source gamma previous',x=>{x.input_blobs.phase_diagnostic.git_blob_sha='stale'}],
 ['force alleged global invalidity',x=>{x.nonclaims=[]}],
 ['smuggle W authority',x=>{x.source.source_claim='W-SSC-103'}],
 ['mutate gamma pair valid tensor',(_x,c)=>{c.gamma_source.eight_ordered_generators[0].source_tensor='sigma1 tensor sigma3 tensor I2 tensor sigma1'}],
 ['mutate printed H1 mixed sign',(_x,_c,h)=>{h.displayed_4x4_2x2_field_blocks.ordered_rows[0][3]='-(1/4)*e_R*phiPlus'}],
 ['mutate Higgs source phi',(_x,_c,h)=>{h.source_Higgs_labels.phiPlus='phi^1 + i*phi^2'}]
];
let rejected=0;
if(!baseline.errors.length)for(const [name,fn]of mutants){
 const x=C(A),cl=C(Cl),h=C(H),before=J([x,cl,h]);fn(x,cl,h);
 if(J([x,cl,h])===before)errors.push('NOOP '+name);
 else if(verify(x,cl,h).errors.length===0)errors.push('ESCAPED '+name);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l01-h1-source-trace-square-similarity-obstruction.v0.1',pass:errors.length===0,errors,
 baseline:baseline.results,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.errors.length?'BASELINE_FAILED':'TESTED',
 source_census_frozen:false,G1_authorized:false,source_author_mistake_established:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
