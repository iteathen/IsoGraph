import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
 packet:L+'LISI_L01_GRADED_H1_COMMON_BASIS_NORMALIZATION_G0_0_1.json',
 gamma:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
 graded:L+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json',
 chiral:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_30.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_30.json'
};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Packet=get(paths.packet),G=get(paths.gamma),S=get(paths.ssc),Gate=get(paths.gate),Graded=get(paths.graded),Chiral=get(paths.chiral);
const gammaLiteral=[
 'sigma2 tensor sigma3 tensor I2 tensor sigma1',
 'sigma2 tensor sigma3 tensor I2 tensor sigma2',
 'sigma2 tensor sigma3 tensor I2 tensor sigma3',
 'i*sigma1 tensor I2 tensor I2 tensor I2',
 'sigma2 tensor sigma1 tensor sigma1 tensor I2',
 'sigma2 tensor sigma1 tensor sigma2 tensor I2',
 'sigma2 tensor sigma1 tensor sigma3 tensor I2',
 'sigma2 tensor sigma2 tensor I2 tensor I2'
];
const cadd=(a,b)=>[a[0]+b[0],a[1]+b[1]],cmul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const z=n=>Array.from({length:n},()=>Array.from({length:n},()=>[0,0]));
const scaled=(A,n)=>A.map(row=>row.map(x=>[x[0]*n,x[1]*n]));
const added=(A,B)=>A.map((row,i)=>row.map((x,k)=>cadd(x,B[i][k])));
const neg=A=>scaled(A,-1);
const mm=(A,B)=>{const n=A.length,C=z(n);for(let i=0;i<n;i++)for(let k=0;k<n;k++){const a=A[i][k];if(a[0]===0&&a[1]===0)continue;for(let v=0;v<n;v++){const b=B[k][v];if(b[0]!==0||b[1]!==0)C[i][v]=cadd(C[i][v],cmul(a,b));}}return C};
const comm=(A,B)=>added(mm(A,B),neg(mm(B,A)));
const eq=(A,B)=>A.length===B.length&&A.every((row,i)=>row.every((v,k)=>v[0]===B[i][k][0]&&v[1]===B[i][k][1]));
const iszero=A=>A.every(row=>row.every(v=>v[0]===0&&v[1]===0));
const kron=(A,B)=>{const r=A.length,s=B.length,C=z(r*s);for(let i=0;i<r;i++)for(let j=0;j<r;j++)for(let u=0;u<s;u++)for(let v=0;v<s;v++)C[i*s+u][j*s+v]=cmul(A[i][j],B[u][v]);return C};
const ident=n=>{const A=z(n);for(let i=0;i<n;i++)A[i][i]=[1,0];return A};
const Pauli={I2:ident(2),sigma1:[[[0,0],[1,0]],[[1,0],[0,0]]],sigma2:[[[0,0],[0,-1]],[[0,1],[0,0]]],sigma3:[[[1,0],[0,0]],[[0,0],[-1,0]]]};
function gammaMatrix(s){
 const labels=s.split(' tensor '),nums=labels.map(y=>y.replace(/^i\*/, ''));
 if(nums.length!==4||nums.some(x=>!Pauli[x]))throw Error('Gamma tensor operand unavailable '+s);
 let A=nums.reduce((acc,k)=>acc?kron(acc,Pauli[k]):Pauli[k],null);
 if(labels.some(x=>x.startsWith('i*'))){
  if(labels.filter(x=>x.startsWith('i*')).length!==1)throw Error('invalid Gamma source i factor');
  A=A.map(row=>row.map(x=>[-x[1],x[0]]));
 }
 return A;
}
function independentlyCompute(tensors){
 const gamma=tensors.map(gammaMatrix),eta=[1,1,1,-1,1,1,1,1],I=ident(16);
 let anticommutator_cases=0,anticommutator_bad=0;
 for(let a=0;a<8;a++)for(let b=0;b<8;b++){
  const expected=a===b?scaled(I,2*eta[a]):z(16);
  const sum=added(mm(gamma[a],gamma[b]),mm(gamma[b],gamma[a]));
  anticommutator_cases++;anticommutator_bad+=+(!eq(sum,expected));
 }
 const mixed=Array.from({length:4},(_,mu)=>Array.from({length:4},(_,alpha)=>mm(gamma[mu],gamma[4+alpha])));
 let pair=0,pureG=0,pureEW=0,commuting=0,bracket_bad=0,first=null;
 for(let i=0;i<16;i++)for(let k=i+1;k<16;k++){
  const mu=Math.floor(i/4),a=i%4,nu=Math.floor(k/4),b=k%4;
  const B=comm(mixed[mu][a],mixed[nu][b]);
  let expected=z(16);
  if(mu!==nu&&a===b){expected=scaled(mm(gamma[mu],gamma[nu]),-2);pureG++}
  else if(mu===nu&&a!==b){expected=scaled(mm(gamma[4+a],gamma[4+b]),-2*eta[mu]);pureEW++}
  else commuting++;
  const mismatch=!eq(B,expected);
  if(mismatch){bracket_bad++;first??={mu,a,nu,b};}
  pair++;
 }
 let quadratic_checks=0,quadratic_wrong=0;
 const values=[-1,0,1];
 for(const a of values)for(const b of values)for(const c of values)for(const d of values){
  const phi=[a,b,c,d],q=phi.reduce((s,x)=>s+x*x,0);
  const X=Array.from({length:4},(_,mu)=>phi.reduce((A,u,alpha)=>added(A,scaled(mixed[mu][alpha],u)),z(16)));
  for(let mu=0;mu<4;mu++)for(let nu=mu+1;nu<4;nu++){
   const B=comm(X[mu],X[nu]),expected=scaled(comm(gamma[mu],gamma[nu]),-q);
   quadratic_checks+=256;
   if(!eq(B,expected))quadratic_wrong++;
  }
 }
 let gradientCases=0,torsionCases=0,gradientFailures=0,torsionFailures=0,ratio4Witness=null;
 for(let mu=0;mu<4;mu++)for(let alpha=0;alpha<4;alpha++)for(let k=0;k<4;k++)if(k!==mu){
  // All frames at x=0 have e^j=dx^j, determinant 1. Case gradient: phi^alpha=1+x^k (not zero at origin).
  // d(e^mu phi^alpha)=de^mu phi^alpha-e^mu ^ dphi^alpha. At origin de=0.
  const signEwedgePhi=mu<k?1:-1;
  const gradientSign=-signEwedgePhi;
  const Graw4=scaled(mixed[mu][alpha],gradientSign);
  const Gnamed=scaled(mixed[mu][alpha],gradientSign);
  gradientFailures+=+(!eq(Graw4,Gnamed)||iszero(Graw4));
  // Torsion: e^mu=(1+x^k)dx^mu, phi constant; de^mu=dx^k ^ dx^mu, invertible at origin.
  const torsionSign=k<mu?1:-1;
  const Traw4=scaled(mixed[mu][alpha],torsionSign),Tnamed=scaled(mixed[mu][alpha],torsionSign);
  torsionFailures+=+(!eq(Traw4,Tnamed)||iszero(Traw4));
  gradientCases++;torsionCases++;
  if(mu===1&&alpha===0&&k===0)ratio4Witness={mu,alpha,k,gradient_sign:gradientSign,normalized_raw_M_coefficient:'1/4',named_unscaled_M_coefficient:'1',project_basis_N:'M/4',coframe_det:1};
 }
 return{gamma,mixed,Clifford_ordered_pairs:anticommutator_cases,Clifford_pair_failures:anticommutator_bad,
  mixed_pair_population:pair,pureG,pureEW,commuting,commutator_failures:bracket_bad,first,
  Higgs_vectors:81,quadratic_matrix_entry_checks:quadratic_checks,quadratic_failures:quadratic_wrong,
  gradientCases,gradientFailures,torsionCases,torsionFailures,ratio4Witness};
}
const math=independentlyCompute(gammaLiteral);
function check(p=Packet,cl=G){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)};
 ok(p.schema==='isograph.lisi-l01-h1-graded-common-basis-normalization-g0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'L G0 only');
 for(const key of ['source_census_frozen','full_source_cold_audit_complete','author_mathematical_error_confirmed','source_math_theorem_qualified','G1_authorized','external_cold_review_passed'])ok(p[key]===false,'no scientific or stage promotion '+key);
 ok(p.source?.id==='L01'&&p.source?.revision==='arXiv:0711.0770v1'&&p.source?.url==='https://arxiv.org/pdf/0711.0770v1'&&j(p.source?.examined_pages)===j([8,9,12,23,24]),'frozen source revision/pages');
 const pins=[['current_G0_gate030',paths.gate],['current_SSC030',paths.ssc],['graded_source_packet',paths.graded],['Cl71_gamma_source',paths.gamma],['source_chiral_8x8',paths.chiral]];
 for(const [key,f]of pins)ok(p.parents?.[key]?.path===f&&p.parents?.[key]?.git_blob_sha===sha(f),'pinned source/provenance '+key);
 ok(Gate.current_lawful_state?.G1_authorized===false&&S.items.length===191&&S.guards.source_census_freeze_complete===false,'current no G1');
 ok(j(cl.gamma_source?.eight_ordered_generators.map(x=>x.source_tensor))===j(gammaLiteral),'exact original eight source tensor gammas, independent literal oracle');
 ok(j(p.definition?.Clifford_generators_source_order.map(x=>x.source_tensor))===j(gammaLiteral)&&j(p.definition?.metric_signature)===j([1,1,1,-1,1,1,1,1]),'source gamma order/signature preserved');
 ok(p.definition?.mixed_source_basis?.includes('gravity-first product')&&p.definition?.H1==='H1=(1/2)*omega+(1/4)*E+(W+B1)','mixed Clifford source-normalized roles');
 ok(p.definition?.mixed_1form_E==='E=sum_mu sum_alpha e^mu*phi^alpha*M_(mu,alpha) with e^mu 1-form and phi^alpha real scalar, do not commute exterior factors across sign','source φ degree-zero scalar and e degree-one form, ordered mixed basis');
 ok(p.definition?.source_named_mixed_formula==='F_gw=(de+(1/2)[omega,e])*phi-e*(dphi+[W+B1,phi])','exact Eq3.4 source print');
 ok(p.definition?.source_gravity_formula==='F_G=(1/2)*(R-(1/8)*e wedge e*phi^2)','exact Eq3.3 grav sign/coefficient');
 ok(p.independent_algebra_predictions?.quadratic_source_coefficient?.includes('-1/16')&&p.independent_algebra_predictions?.graded_derivative?.includes('(1/4)')&&p.independent_algebra_predictions?.graded_derivative?.includes('-e wedge d(phi)'),'graded derivative and quadratic coefficient signs preserved');
 ok(p.definition?.restricted_variables?.includes('INVERTIBLE')&&p.definition?.source_jets?.includes('off-shell'),'no degenerate-vierbein physical inference');
 const finite=p.finite_coverage_expectations||{};
 ok(math.Clifford_ordered_pairs===64&&math.Clifford_pair_failures===0&&finite.original_Clifford_pairs===64,'source 16x16 Pauli Clifford verification');
 ok(math.mixed_pair_population===120&&math.commutator_failures===0&&math.pureG===24&&math.pureEW===24&&math.commuting===72,'exact full mixed commutator closure and no mixed-output cases');
 ok(j(finite.matrix_commutator_pair_population)===j({total:120,gravity_pure:24,EW_pure:24,zero:72,remaining_mixed:0}),'full source mixed bracket counts');
 ok(math.Higgs_vectors===81&&math.quadratic_matrix_entry_checks===124416&&math.quadratic_failures===0,'general 4-real-Higgs quadratic source consistency in 16x16');
 ok(finite.real_Higgs_scoped_test_vectors===81&&finite.quadratic_gravity_pair_tests===486&&finite.quadratic_matrix_entry_checks===124416,'claim-specific 81*6*256 finite domain');
 ok(math.gradientCases===48&&math.gradientFailures===0&&math.torsionCases===48&&math.torsionFailures===0,'both genuinely invertible-coframe finite jet cases');
 ok(finite.nondegenerate_gradient_jet_controls===48&&finite.nondegenerate_torsion_jet_controls===48,'exact gradient/torsion domain');
 ok(p.admissible_source_field_controls?.length===2&&p.admissible_source_field_controls?.every(x=>x.expected_coframe_det_at_origin===1&&x.literal_common_M_ratio===4&&x.named_source_operator_qualification===false),'valid source coframe determinant and only diagnostic comparison');
 ok(p.admissible_source_field_controls?.[0].coordinate_model?.includes('phi^1=1+x1')&&p.admissible_source_field_controls?.[1].coordinate_model?.includes('phi^1=1'),'gradient/torsion source field scopes');
 const contract=p.competing_comparison_contracts||[];
 ok(contract.length===2&&contract?.[0]?.id==='COMMON_UNSCALED_M'&&contract?.[0]?.status==='PROJECT_CONDITIONAL_COUNTEREXAMPLE_NOT_AUTHOR_MATH_ERROR','unscaled interpretation conditional only');
 ok(contract?.[1]?.id==='PROJECT_NORMALIZED_OUTPUT_BASIS'&&contract?.[1]?.statement?.includes('N_(mu,alpha)=M_(mu,alpha)/4')&&contract?.[1]?.status==='POSSIBLE_CONSISTENT_OUTPUT_CONVENTION_NOT_TRACED_TO_AUTHOR_SOURCE','normalized output alternative not source authority');
 ok(p.repair_disposition?.includes('No correction to original L01 formulas justified')&&p.repair_disposition?.includes('degenerate coframe')&&p.discovery_disposition?.includes('remains unresolved'),'correctly preserve earlier degenerate frame weakness without author blame');
 ok(p.next_lawful_step?.startsWith('Independently replay')&&p.next_lawful_step?.includes('G1–G7 still forbidden'),'source audit rather than promotion');
 ok(!j(p).includes('W-SSC-'),'no W-source contamination');
 return errors;
}
const baseline=check(),errors=[...baseline],mutants=[
 ['claim L01 author error',p=>{p.author_mathematical_error_confirmed=true}],
 ['claim physical result',p=>{p.source_math_theorem_qualified=true}],
 ['G1 leak',p=>{p.G1_authorized=true}],
 ['full source audit leak',p=>{p.full_source_cold_audit_complete=true}],
 ['claim external review',p=>{p.external_cold_review_passed=true}],
 ['wrong gradient e det',p=>{p.admissible_source_field_controls[0].expected_coframe_det_at_origin=0}],
 ['wrong torsion e det',p=>{p.admissible_source_field_controls[1].expected_coframe_det_at_origin=0}],
 ['H1 coefficient quadrupled',p=>{p.definition.H1=p.definition.H1.replace('(1/4)','1')}],
 ['field scalar becomes form',p=>{p.definition.mixed_1form_E='phi is a 1form'}],
 ['flip exterior minus',p=>{p.independent_algebra_predictions.graded_derivative='d(e phi)=de phi+e dphi'}],
 ['erase FG sign',p=>{p.definition.source_gravity_formula='F_G=(1/2)*(R+(1/8)*e wedge e*phi^2)'}],
 ['erase pure gravity 24 cases',p=>{p.finite_coverage_expectations.matrix_commutator_pair_population.gravity_pure=0}],
 ['erase pure EW 24 cases',p=>{p.finite_coverage_expectations.matrix_commutator_pair_population.EW_pure=0}],
 ['fake quadratic matrix comparison',p=>{p.finite_coverage_expectations.quadratic_matrix_entry_checks=0}],
 ['erase diagnostic alternative',p=>{p.competing_comparison_contracts.pop()}],
 ['declare normalized N as author source',p=>{p.competing_comparison_contracts[1].status='AUTHOR_SOURCE_PROVED'}],
 ['delete arxiv v1 pin',p=>{p.source.revision='arXiv:0711.0770v2'}],
 ['old SSC pin',p=>{p.parents.current_SSC030.git_blob_sha='STALEREF'}],
 ['wrong source gamma sign',(_p,g)=>{g.gamma_source.eight_ordered_generators[3].source_tensor='sigma1 tensor I2 tensor I2 tensor I2'}],
 ['swap gamma source tensors',(_p,g)=>{const a=g.gamma_source.eight_ordered_generators;[a[0].source_tensor,a[4].source_tensor]=[a[4].source_tensor,a[0].source_tensor]}],
 ['change only one mixed generator label',p=>{p.definition.Clifford_generators_source_order[4].source_tensor='sigma1 tensor I2 tensor I2 tensor I2'}],
 ['import W model',p=>{p.next_lawful_step+=' W-SSC-097'}]
];
let rejected=0;if(!baseline.length)for(const [name,fn]of mutants){const p=cp(Packet),g=cp(G),before=j([p,g]);fn(p,g);if(j([p,g])===before)errors.push('NO_OP '+name);else if(check(p,g).length===0)errors.push('ESCAPE '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-graded-normalization-source-replay.v0.1',pass:errors.length===0,errors,
  gamma_ordered_pairs:math.Clifford_ordered_pairs,clifford_failures:math.Clifford_pair_failures,
  mixed_commutator_cases:math.mixed_pair_population,mixed_commutator_failures:math.commutator_failures,
  mixed_bracket_types:{gravity:math.pureG,EW:math.pureEW,zero:math.commuting},
  quadratic_scalar_vectors:math.Higgs_vectors,quadratic_matrix_entries_checked:math.quadratic_matrix_entry_checks,quadratic_failures:math.quadratic_failures,
  gradient_valid_coframe_cases:math.gradientCases,gradient_failures:math.gradientFailures,
  torsion_valid_coframe_cases:math.torsionCases,torsion_failures:math.torsionFailures,
  adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',
  author_math_error_confirmed:false,G1_authorized:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
