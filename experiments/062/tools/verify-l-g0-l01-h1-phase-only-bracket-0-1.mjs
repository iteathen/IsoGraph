import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={packet:L+'LISI_L01_H1_PHASE_ONLY_LIE_BRACKET_OBSTRUCTION_G0_0_1.json',
 trace:L+'LISI_L01_H1_MIXED_TRACE_SQUARE_SIMILARITY_OBSTRUCTION_G0_0_1.json',
 h1:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
 gamma:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_26.json',gate:E+'L_CURRENT_STAGE_GATE_0_26.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const A=get(paths.packet),T=get(paths.trace),H=get(paths.h1),Cl=get(paths.gamma),SSC=get(paths.ssc),GATE=get(paths.gate);
const z=(re=0,im=0)=>[re,im],multiplyComplex=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const s1=[[z(),z(1)],[z(1),z()]],s2=[[z(),z(0,-1)],[z(0,1),z()]],s3=[[z(1),z()],[z(),z(-1)]],I=[[z(1),z()],[z(),z(1)]];
const scale=(a,c)=>a.map(row=>row.map(x=>multiplyComplex(x,c)));
const kron=(a,b)=>a.flatMap(row=>b.map(br=>row.flatMap(x=>br.map(y=>multiplyComplex(x,y)))));
const matmul=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((v,x,k)=>add(v,multiplyComplex(x,b[k][j])),z())));
const matadd=(a,b)=>a.map((row,i)=>row.map((x,j)=>add(x,b[i][j])));
const neg=a=>scale(a,z(-1)),bracket=(a,b)=>matadd(matmul(a,b),neg(matmul(b,a)));
const first8=a=>a.slice(0,8).map(row=>row.slice(0,8));
const equal=(a,b)=>j(a)===j(b);
const neq=(a,b)=>a.reduce((n,row,i)=>n+row.filter((x,k)=>!equal(x,b[i][k])).length,0);
const sourceTensors=[
 ['Gamma1','sigma2 tensor sigma3 tensor I2 tensor sigma1'],['Gamma2','sigma2 tensor sigma3 tensor I2 tensor sigma2'],
 ['Gamma3','sigma2 tensor sigma3 tensor I2 tensor sigma3'],['Gamma4','i*sigma1 tensor I2 tensor I2 tensor I2'],
 ['GammaPrime1','sigma2 tensor sigma1 tensor sigma1 tensor I2'],['GammaPrime2','sigma2 tensor sigma1 tensor sigma2 tensor I2'],
 ['GammaPrime3','sigma2 tensor sigma1 tensor sigma3 tensor I2'],['GammaPrime4','sigma2 tensor sigma2 tensor I2 tensor I2']];
const Pauli={sigma1:s1,sigma2:s2,sigma3:s3,I2:I};
function makeGamma(t){
 const havei=t.startsWith('i*'),pieces=(havei?t.slice(2):t).split(' tensor ');
 if(pieces.length!==4||pieces.some(x=>!Pauli[x]))throw Error('non-source Pauli tensor');
 const prod=pieces.map(x=>Pauli[x]).reduce(kron);
 if(prod.length!==16||prod[0].length!==16)throw Error('matrix dimension incorrect');
 return havei?scale(prod,z(0,1)):prod;
}
const printedRows=[
 ['(1/2)*omega_L+(i/2)*W^3','Wplus','-(1/4)*e_R*phiOne','+(1/4)*e_R*phiPlus'],
 ['Wminus','(1/2)*omega_L-(i/2)*W^3','+(1/4)*e_R*phiMinus','+(1/4)*e_R*phiZero'],
 ['-(1/4)*e_L*phiZero','+(1/4)*e_L*phiPlus','(1/2)*omega_R+(i/2)*B_1^3','B1plus'],
 ['+(1/4)*e_L*phiMinus','+(1/4)*e_L*phiOne','B1minus','(1/2)*omega_R-(i/2)*B_1^3']];
const phi={
 phiPlus:[z(1),z(0,-1),z(),z()],phiMinus:[z(1),z(0,1),z(),z()],
 phiZero:[z(),z(),z(-1),z(0,-1)],phiOne:[z(),z(),z(-1),z(0,1)]};
const re=/^([+-])\(1\/4\)\*e_([RL])\*(phiPlus|phiMinus|phiZero|phiOne)$/;
function printedMatrix(mu,nu,rows){
 const matrix=Array.from({length:8},()=>Array.from({length:8},()=>z()));
 for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const match=re.exec(rows[a][b]);if(!match)continue;
  const e=mu===3?scale(I,z(0,1)):scale([s1,s2,s3][mu],match[2]==='R'?z(0,-1):z(0,1));
  const bmat=scale(e,multiplyComplex(z(match[1]==='+'?1:-1),phi[match[3]][nu]));
  for(let i=0;i<2;i++)for(let k=0;k<2;k++)matrix[2*a+i][2*b+k]=bmat[i][k];
 }
 return matrix;
}
function verify(pkt=A,cl=Cl,h1=H){
 const issues=[],ok=(v,n)=>{if(!v)issues.push(n)},roots=pkt.exact_algebraic_witness||{},scope=pkt.operator_scope||{},range=pkt.finite_scope||{};
 ok(pkt.schema==='isograph.lisi-l01-h1-mixed-pure-bivector-bracket-obstruction.g0.v0.1'&&pkt.track==='L'&&pkt.stage==='G0'&&pkt.authority===false,'G0 L research only');
 ok(pkt.frozen_source?.id==='L01'&&pkt.frozen_source?.revision==='A. Garrett Lisi arXiv:0711.0770v1 2007-11-06','frozen source revision');
 for(const [name,path]of[['trace_square_packet',paths.trace],['printed_H1_packet',paths.h1],['source_gamma_packet',paths.gamma],['SSC0_26',paths.ssc],['current_gate0_26',paths.gate]])
 ok(pkt.parents?.[name]?.path===path&&pkt.parents?.[name]?.git_blob_sha===sha(path),'exact source G0 dependency '+name);
 ok(SSC.items?.length===191&&GATE.current_lawful_state?.G1_authorized===false&&T.source_all_pairs_expected?.different_trace_squares_pairs===16,'unfrozen source predecessor and trace');
 for(const k of ['source_complete','source_census_frozen','mathematical_theory_qualified','G1_authorized','external_cold_review_passed'])ok(pkt[k]===false,'no source or stage promotion '+k);
 ok(j(cl.gamma_source?.eight_ordered_generators?.map(x=>[x.label,x.source_tensor]))===j(sourceTensors),'exact original Cl(7,1) Pauli tensor factor ordering');
 ok(j(h1.displayed_4x4_2x2_field_blocks?.ordered_rows)===j(printedRows),'source H1 field matrix exact');
 ok(scope.source_coefficient_guard?.includes('not the square of e^mu as a differential one-form')&&scope.bracket?.includes('NOT exterior wedge'),'formal matrix coefficient vs differential exterior algebra distinct');
 ok(scope.transformation_tested?.includes('WHILE FIXING source pure gravity')&&scope.source_frame_guard?.includes('i times original real frame'),'phase-only and real form scope');
 ok(roots.native_commutator==='[X_11,X_21]=-2 G_12'&&roots.printed_commutator==='[P_11,P_21]=+2 G_12'&&roots.native_row0_col0==='-2i'&&roots.printed_row0_col0==='+2i'&&roots.pure_G12_row0_col0==='+i','analytical source specific commutator witness');
 ok(roots.conditional_bracket_preservation===false&&roots.source_published_bracket_equivalence_for_all_generator_roles_certified===false,'no global Lie promotion');
 ok(range.gravity_unordered_index_pairs===6&&range.fixed_electroweak_index_choices===4&&range.independent_mixed_mixed_bracket_cases===24&&range.matrix_cells_changing_between_commutators===192&&range.each_case_changing_matrix_cells===8,'all 24 homogeneous source fixed-prime brackets');
 ok(range.all_native_commutators_equal_minus2_original_gravity_bivector===true&&range.all_printed_commutators_equal_plus2_original_gravity_bivector===true&&range.source_pure_gravity_fixed===true&&range.global_phase_only_operator_Lie_automorphism===false&&range.diagnostic_phase_is_not_source_authority===true,'no phase-only Lie algebra homomorphism fixing source pure sector');
 ok(pkt.hypotheses_not_ruled_out?.length===4&&pkt.falsifiers?.length===3&&pkt.next_lawful_step?.includes('G0'),'residual alternatives and dependency ordering');
 ok(!j(pkt).includes('W-SSC-'),'W track firewall');
 if(issues.length)return{issues,math:null};
 try{
 const gamma=cl.gamma_source.eight_ordered_generators.map(x=>makeGamma(x.source_tensor));
 const X=Array.from({length:4},(_,mu)=>Array.from({length:4},(_,nu)=>first8(matmul(gamma[mu],gamma[nu+4]))));
 const P=Array.from({length:4},(_,mu)=>Array.from({length:4},(_,nu)=>printedMatrix(mu,nu,h1.displayed_4x4_2x2_field_blocks.ordered_rows)));
 let sourceMatrixErrors=0,bracketCases=0,matrixDifference=0,nativeWrong=0,printedWrong=0,first=null,pairsWrong=0;
 for(let mu=0;mu<4;mu++)for(let nu=0;nu<4;nu++)sourceMatrixErrors+=neq(P[mu][nu],scale(X[mu][nu],z(0,-1)));
 for(let mu=0;mu<4;mu++)for(let k=mu+1;k<4;k++)for(let nu=0;nu<4;nu++){
  const G=first8(matmul(gamma[mu],gamma[k]));
  const native=bracket(X[mu][nu],X[k][nu]),printed=bracket(P[mu][nu],P[k][nu]);
  const expectedNative=scale(G,z(-2)),expectedPrint=scale(G,z(2));
  nativeWrong+=neq(native,expectedNative);printedWrong+=neq(printed,expectedPrint);
  const delta=neq(native,printed);matrixDifference+=delta;bracketCases++;
  if(delta!==8)pairsWrong++;
  first??={mu:mu+1,kappa:k+1,nu:nu+1,native00:native[0][0],printed00:printed[0][0],pure00:G[0][0],changed_cells:delta};
 }
 ok(sourceMatrixErrors===0,'reconstructed printed P mixed coefficients vs source X; all 16 pairs');
 ok(bracketCases===24&&pairsWrong===0&&nativeWrong===0&&printedWrong===0&&matrixDifference===192,'all 24 original source operator Lie brackets reversed relative to fixed pure gravity');
 ok(j(first)===j({mu:1,kappa:2,nu:1,native00:z(0,-2),printed00:z(0,2),pure00:z(0,1),changed_cells:8}),'exact first Lie sign witness');
 return{issues,math:{mixed_source_coefficients:16,bracket_cases:bracketCases,per_case_operator_dimension:8,source_mixed_phase_mismatched_cells:sourceMatrixErrors,
 native_commutator_wrong_cells:nativeWrong,printed_commutator_wrong_cells:printedWrong,
 pairs_with_non_eight_differences:pairsWrong,bracket_matrix_differing_entries:matrixDifference,first_witness:first,source_physical_curvature_theorem_proved:false}};
 }catch(err){issues.push('source matrix implementation failed '+String(err));return{issues,math:null};}
}
const baseline=verify(),errors=[...baseline.issues],muts=[
 ['flip native bracket sign',x=>{x.exact_algebraic_witness.native_commutator='[X_11,X_21]=+2 G_12'}],
 ['erase printed bracket sign',x=>{x.exact_algebraic_witness.printed_commutator='[P_11,P_21]=-2 G_12'}],
 ['fake signed Lie homomorphism',x=>{x.finite_scope.global_phase_only_operator_Lie_automorphism=true}],
 ['erase fixed source pure gravity',x=>{x.finite_scope.source_pure_gravity_fixed=false}],
 ['discard one bracket',x=>{x.finite_scope.independent_mixed_mixed_bracket_cases=23}],
 ['erase 192 differences',x=>{x.finite_scope.matrix_cells_changing_between_commutators=0}],
 ['hide one-form vs operator scope',x=>{x.operator_scope.bracket='FULL_CURVATURE_COMMUTATOR'}],
 ['confuse same mu exterior product',x=>{x.operator_scope.source_coefficient_guard='e wedge e is nonzero'}],
 ['fake full physical Lie equivalence',x=>{x.exact_algebraic_witness.source_published_bracket_equivalence_for_all_generator_roles_certified=true}],
 ['wrong L01 source',x=>{x.frozen_source.revision='arXiv:0711.0770v2'}],
 ['scope unlicensed gamma source',x=>{x.parents.source_gamma_packet.git_blob_sha='STALE'}],
 ['fake module closure',x=>{x.mathematical_theory_qualified=true}],
 ['fake G1 authorization',x=>{x.G1_authorized=true}],
 ['fake outside reviewer',x=>{x.external_cold_review_passed=true}],
 ['remove alternatives',x=>{x.hypotheses_not_ruled_out=[]}],
 ['import cross author',x=>{x.frozen_source.id='W-SSC-103'}],
 ['alter native gamma source',(_x,c)=>{c.gamma_source.eight_ordered_generators[1].source_tensor='sigma2 tensor sigma3 tensor I2 tensor sigma1'}],
 ['alter printed H1 source',(_x,_c,h)=>{h.displayed_4x4_2x2_field_blocks.ordered_rows[1][2]='-(1/4)*e_R*phiMinus'}]
];
let rejected=0;
if(!baseline.issues.length)for(const [label,mut]of muts){
 const x=cp(A),c=cp(Cl),p=cp(H),old=j([x,c,p]);mut(x,c,p);
 if(j([x,c,p])===old)errors.push('NOOP '+label);
 else if(verify(x,c,p).issues.length===0)errors.push('ESCAPED '+label);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l01-H1-phase-only-mixed-pure-bracket.v0.1',pass:!errors.length,errors,baseline:baseline.math,adversarial_defined:muts.length,adversarial_rejected:rejected,mutation_gate:baseline.issues.length?'BASELINE_FAILED':'TESTED',
 source_census_frozen:false,L_G1_authorized:false,source_full_lie_theorem_proved:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
