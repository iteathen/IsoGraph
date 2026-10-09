import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={packet:L+'LISI_L01_EQ2_8_CHIRAL_SOURCE_FINITE_G0_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_19.json',gate:E+'L_CURRENT_STAGE_GATE_0_19.json',
 seven:L+'LISI_L01_SEVEN_SOURCE_MODALITY_ASSERTIONS_G0_0_1.json',
 spin:L+'LISI_L01_SPIN_REAL_GROUP_ISOMORPHISM_SOURCE_DEFECT_G0_0_1.json',
 visual:L+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json'};
const get=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const S=get(P.packet),SSC=get(P.ssc),Gate=get(P.gate),seven=get(P.seven),spin=get(P.spin);
const z=(a=0,b=0)=>[a,b],add=(a,b)=>[a[0]+b[0],a[1]+b[1]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],times=(a,t)=>[a[0]*t,a[1]*t],neg=a=>times(a,-1),conj=a=>[a[0],-a[1]];
const I=[[[1,0],[0,0]],[[0,0],[1,0]]],
      S1=[[[0,0],[1,0]],[[1,0],[0,0]]],
      S2=[[[0,0],[0,-1]],[[0,1],[0,0]]],
      S3=[[[1,0],[0,0]],[[0,0],[-1,0]]],sigmas=[S1,S2,S3];
const zero=(r,c)=>Array.from({length:r},()=>Array.from({length:c},()=>z())),
 ma=(A,B)=>A.map((row,i)=>row.map((a,j)=>add(a,B[i][j]))),
 sm=(A,t)=>A.map(row=>row.map(a=>times(a,t))),
 scale=(A,s)=>A.map(row=>row.map(x=>mul(x,s))),
 matmul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,v,k)=>add(s,mul(v,B[k][j])),z()))),
 kron=(A,B)=>A.flatMap(row=>B.map(brow=>row.flatMap(a=>brow.map(b=>mul(a,b))))),
 same=(A,B)=>A.length===B.length&&A.every((row,i)=>row.length===B[i]?.length&&row.every((v,j)=>v[0]===B[i][j][0]&&v[1]===B[i][j][1])),
 diag=(A,B)=>{const r=zero(4,4);for(let i=0;i<2;i++)for(let k=0;k<2;k++){r[i][k]=A[i][k];r[i+2][k+2]=B[i][k];}return r},
 basisExpected=[
 [1,2,'i*sigma3','i*sigma3',scale(S3,z(0,1)),scale(S3,z(0,1))],
 [1,3,'-i*sigma2','-i*sigma2',scale(S2,z(0,-1)),scale(S2,z(0,-1))],
 [1,4,'+sigma1','-sigma1',S1,sm(S1,-1)],
 [2,3,'i*sigma1','i*sigma1',scale(S1,z(0,1)),scale(S1,z(0,1))],
 [2,4,'+sigma2','-sigma2',S2,sm(S2,-1)],
 [3,4,'+sigma3','-sigma3',S3,sm(S3,-1)]
 ];
const Gamma=[kron(S2,S1),kron(S2,S2),kron(S2,S3),kron(scale(S1,z(0,1)),I)];
const bivs=[];
for(let mu=0;mu<4;mu++)for(let nu=mu+1;nu<4;nu++)bivs.push({mu:mu+1,nu:nu+1,
  computed:sm(ma(matmul(Gamma[mu],Gamma[nu]),sm(matmul(Gamma[nu],Gamma[mu]),-1)),0.5)});
const signature=[];
for(let mu=0;mu<4;mu++)for(let nu=0;nu<4;nu++){
 const want=zero(4,4);if(mu===nu)for(let i=0;i<4;i++)want[i][i]=z(mu===3?-2:2);
 signature.push(same(ma(matmul(Gamma[mu],Gamma[nu]),matmul(Gamma[nu],Gamma[mu])),want));
}
const basisFailures=bivs.filter((b,i)=>!same(b.computed,diag(basisExpected[i][4],basisExpected[i][5])));
let tuples=0,cells=0,failCells=0,failReality=0,first=null;
const values=[-1,0,1];
for(const a of values)for(const b of values)for(const c of values)for(const d of values)for(const e of values)for(const f of values){
  const w=[a,b,c,d,e,f]; // omega12, omega13, omega14, omega23, omega24, omega34
  const Sreal=[d,-b,a],Treal=[c,e,f];
  let direct=zero(4,4);
  for(let i=0;i<6;i++)direct=ma(direct,sm(bivs[i].computed,w[i]));
  let left=zero(2,2),right=zero(2,2);
  for(let k=0;k<3;k++){
   const l=z(Sreal[k],-Treal[k]),r=z(Sreal[k],Treal[k]);
   if(j(conj(l))!==j(r))failReality++;
   left=ma(left,scale(scale(sigmas[k],z(0,1)),l));
   right=ma(right,scale(scale(sigmas[k],z(0,1)),r));
  }
  const expected=diag(left,right);
  for(let i=0;i<4;i++)for(let k=0;k<4;k++){
    cells++;
    if(j(direct[i][k])!==j(expected[i][k])){
      failCells++;first??={omega12:a,omega13:b,omega14:c,omega23:d,omega24:e,omega34:f,row:i,col:k,actual:direct[i][k],expected:expected[i][k]};
    }
  }
  tuples++;
}
const invalidComplexCoeff={left:mul(z(0,-1),z(0,1)),right:mul(z(0,1),z(0,1))};
function verify(p=S){
 const errors=[],ck=(b,m)=>{if(!b)errors.push(m)};
 ck(p.schema==='isograph.lisi-l01-chiral-Cl31-spin-Eq2_8-source-g0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'L G0 candidate only');
 ck(p.status==='PRIMARY_SOURCE_EQ2_8_EXACT_FINITE_CLIFFORD_CHIRAL_BLOCK_SOURCE_CANDIDATE_NOT_WHOLE_THEOREM'&&p.source_complete===false&&p.mathematical_qualification===false&&p.full_L01_ASTS_compiled===false&&p.G1_authorized===false&&p.external_cold_review_passed===false,'no false mathematical/source certification');
 ck(p.source?.id==='L01'&&p.source.revision==='arXiv:0711.0770v1, 2007-11-06'&&p.source.url==='https://arxiv.org/pdf/0711.0770v1'&&j(p.source.printed_locations)===j([
 '§2.2.1 printed page 8: generators gamma1..gamma4',
 '§2.2.1 printed page 9: Eq(2.8), spin connection and its chiral blocks',
 '§2.2.1 printed page 9: six real ωS/ωT coefficients, conjugation coupling'
 ]),'exact frozen source locator and version');
 for(const [key,pp]of[['source_census0_19',P.ssc],['current_gate0_19',P.gate],['seven_original_modality_source',P.seven],['separate_real_group_counterexample',P.spin],['full_L01_visual_source',P.visual]])ck(p.predecessors?.[key]?.path===pp&&p.predecessors?.[key]?.git_blob_sha===sha(pp),'original exact source SHA '+key);
 ck(SSC.items.length===191&&SSC.guards.source_census_freeze_complete===false&&Gate.current_lawful_state.G1_authorized===false,'L G0 remains strict');
 const r=p.matrix_role||{},ss=r.original_gamma||{},m=p.source_omega_role_reconstruction||{},t=p.finite_source_test||{};
 ck(r.source_signature==='Cl(3,1), three positive spatial generators and one negative gamma4'&&r.six_source_coefficients?.includes('6 free real components'),'Cl(3,1) and six REAL source coefficients');
 ck(j(ss)===j({gamma1:'sigma2 ⊗ sigma1',gamma2:'sigma2 ⊗ sigma2',gamma3:'sigma2 ⊗ sigma3',gamma4:'i*sigma1 ⊗ identity2'}),'four ordered source gamma matrices');
 ck(r.bivector_definition==='gamma_munu = (gamma_mu*gamma_nu-gamma_nu*gamma_mu)/2; 1<=mu<nu<=4'&&r.spin_connection_full_sum?.includes('equals sum_{mu<nu} omega^{mu,nu} gamma_{mu,nu}'),'correct antisym/full-sum normalizations');
 ck(j(p.independent_expected_bivectors?.map(q=>[q.mu,q.nu,q.left,q.right]))===j(basisExpected.map(q=>q.slice(0,4))),'all six independent source Clifford bivector left/right expressions, plus relative signs');
 ck(p.independent_expected_bivectors?.length===6&&basisFailures.length===0&&signature.length===16&&signature.every(Boolean),'16 Clifford generator anticommutators and source six basis bivectors');
 ck(m.spatial_rotations==='omegaS=(omega23,-omega13,omega12); omegaS^tau=(1/2)*sum_{eps,pi=1..3} omega^{eps,pi} epsilon_{eps,pi,tau}'&&m.temporal_boosts==='omegaT=(omega14,omega24,omega34)','printed rotational/boost coefficient role and sign');
 ck(m.upper==='omega_L = sum_tau (omegaS^tau-i*omegaT^tau)*(i*sigma_tau)'&&m.lower==='omega_R = sum_tau (omegaS^tau+i*omegaT^tau)*(i*sigma_tau)'&&m.component_condition==='omega_R^tau=complex_conjugate(omega_L^tau) for SIX REAL primitive connection coefficients','source omegaL and omegaR opposing complex signs with explicit real guard');
 ck(m.do_not_infer?.includes('Only author-written coefficient conjugation'),'forbid unproven entrywise whole-matrix conjugation');
 ck(t.source_signatures_and_ordered_gamma_pairs===16&&t.exact_ordered_bivectors===6&&j(t.coefficients_real_set)===j([-1,0,1])&&t.real_connection_tuples===729&&t.tested_block_matrix_cells===11664,'complete finite 3^6 real source domain');
 ck(t.expected_unmatched_source_gamma_cases===0&&t.expected_unmatched_omega_cases===0&&t.expected_nonzero_chiral_cross_blocks===0&&tuples===729&&cells===11664&&failCells===0&&failReality===0,'all 729 source 4x4 connection matrices and coefficient conjugacy correct');
 const nc=t.reality_guard_negative_control||{};
 ck(nc.source_admissible===false&&j(nc.omegaT_complex)===j(['i','0','0'])&&j(invalidComplexCoeff.left)===j([1,0])&&j(invalidComplexCoeff.right)===j([-1,0])&&nc.expected_L1==='1'&&nc.expected_R1==='-1'&&nc.expected_R1_conjugate_of_L1==='1','negative unqualified complex extension violates source reality guard');
 ck(p.independent_negative_evidence?.printed_real_group_equality?.includes('2 vs4 center orders')&&spin.independent_group_center_certificate.center_order_right===4,'independent real Spin group conflict preserved');
 for(const key of ['source_author_formula_unchanged','no_external_cold_review_passed'])ck(p.independent_negative_evidence?.[key]===true,'source unchanged/review not passed '+key);
 for(const key of ['author_intended_correction_known','whole_E8_model_refuted','mathematical_clifford_general_theorem_proven','source_L01_complete'])ck(p.independent_negative_evidence?.[key]===false,'do not extend finite result '+key);
 ck(!j(p).includes('W-SSC-')&&p.required_next?.length===4,'research independent L and remaining open obligations');
 return errors;
}
const base=verify(),errors=[...base],mutants=[
 ['change gamma1 Pauli',q=>{q.matrix_role.original_gamma.gamma1='sigma2 ⊗ sigma3'}],
 ['flip gamma4 i sign',q=>{q.matrix_role.original_gamma.gamma4='sigma1 ⊗ identity2'}],
 ['wrong Clifford signature',q=>{q.matrix_role.source_signature='Cl(4,0)'}],
 ['wrong gamma12 source block',q=>{q.independent_expected_bivectors[0].left='-i*sigma3'}],
 ['wrong gamma13 source sign',q=>{q.independent_expected_bivectors[1].right='i*sigma2'}],
 ['wrong boost left sign',q=>{q.independent_expected_bivectors[2].left='-sigma1'}],
 ['wrong boost right sign',q=>{q.independent_expected_bivectors[4].right='+sigma2'}],
 ['lose bivector half',q=>{q.matrix_role.bivector_definition='gamma_mu gamma_nu - gamma_nu gamma_mu'}],
 ['wrong boost spatial permutation',q=>{q.source_omega_role_reconstruction.spatial_rotations='omegaS=(omega23,+omega13,omega12)'}],
 ['wrong source omegaL sign',q=>{q.source_omega_role_reconstruction.upper=q.source_omega_role_reconstruction.upper.replace('omegaS^tau-i*omegaT^tau','omegaS^tau+i*omegaT^tau')}],
 ['wrong source omegaR sign',q=>{q.source_omega_role_reconstruction.lower=q.source_omega_role_reconstruction.lower.replace('omegaS^tau+i*omegaT^tau','omegaS^tau-i*omegaT^tau')}],
 ['wrong omegaR reality',q=>{q.source_omega_role_reconstruction.component_condition='omegaR independent'}],
 ['remove real coefficient guard',q=>{q.matrix_role.six_source_coefficients='complex arbitrary'}],
 ['claim whole-matrix conjugation',q=>{q.source_omega_role_reconstruction.do_not_infer='all matrix entries complex conjugate'}],
 ['claim nonreal coefficient admissible',q=>{q.finite_source_test.reality_guard_negative_control.source_admissible=true}],
 ['drop tuple count',q=>{q.finite_source_test.real_connection_tuples=728}],
 ['erase source cell count',q=>{q.finite_source_test.tested_block_matrix_cells=0}],
 ['change original source',q=>{q.source.revision='arXiv:0711.0770v2'}],
 ['change SSC input SHA',q=>{q.predecessors.source_census0_19.git_blob_sha='stale'}],
 ['erase Spin source falsifier',q=>{q.independent_negative_evidence.printed_real_group_equality='TRUE direct product'}],
 ['declare all E8 invalid',q=>{q.independent_negative_evidence.whole_E8_model_refuted=true}],
 ['claim full Clifford theorem',q=>{q.independent_negative_evidence.mathematical_clifford_general_theorem_proven=true}],
 ['premature G1',q=>{q.G1_authorized=true}],
 ['claim external pass',q=>{q.external_cold_review_passed=true}],
 ['import W theorem',q=>{q.source.source_modality='W-SSC-001'}]
];
let rejected=0;
if(!base.length)for(const [name,fn]of mutants){const q=cp(S),before=j(q);fn(q);if(j(q)===before)errors.push('NOOP '+name);else if(verify(q).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-Eq2_8-exact-chiral-block-source.v0.1',pass:errors.length===0,errors,Cl31_gamma_pairs_tested:16,bivector_source_basis:6,real_tuples:729,source_connection_cells:11664,source_matrix_discrepancies:failCells,source_complex_guard_violations_in_admissible_domain:failReality,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',G0_source_complete:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
