import fs from "node:fs";import crypto from "node:crypto";
const L="research/woit-lisi-isomorph/lisi/",E="experiments/062/";
const P={src:L+"LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json",ssc:L+"SOURCE_SEMANTIC_CENSUS_0_22.json",gate:E+"L_CURRENT_STAGE_GATE_0_22.json",ew:L+"LISI_L01_ELECTROWEAK_WEW_CARTAN_TABLE4_G0_0_1.json",grav:L+"LISI_L01_EQ2_8_CHIRAL_SOURCE_FINITE_G0_0_1.json"};
const read=p=>JSON.parse(fs.readFileSync(p,"utf8")),str=JSON.stringify,clone=x=>JSON.parse(str(x));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash("sha1").update(Buffer.concat([Buffer.from("blob "+b.length+"\0"),b])).digest("hex")};
const src=read(P.src),gate=read(P.gate),ssc=read(P.ssc);
const C=(a=0,b=0)=>[a,b],plus=(x,y)=>[x[0]+y[0],x[1]+y[1]],prod=(x,y)=>[x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]],
scale=(x,t)=>[x[0]*t,x[1]*t],neg=x=>[-x[0],-x[1]];
const zero=(n,m=n)=>Array.from({length:n},()=>Array.from({length:m},()=>C()));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>C(i===j?1:0)));
const add=(a,b)=>a.map((row,i)=>row.map((v,j)=>plus(v,b[i][j])));
const negate=a=>a.map(row=>row.map(neg)),scaleMatrix=(a,t)=>a.map(row=>row.map(v=>scale(v,t)));
const multiply=(a,b)=>a.map((row,i)=>Array.from({length:b[0].length},(_,j)=>row.reduce((s,v,k)=>plus(s,prod(v,b[k][j])),C())));
const kron=(a,b)=>a.flatMap(row=>b.map(br=>row.flatMap(v=>br.map(w=>prod(v,w)))));
const kronList=arr=>arr.reduce(kron);
const mismatch=(a,b)=>a.reduce((s,row,i)=>s+row.reduce((n,v,j)=>n+ +(v[0]!==b[i][j][0]||v[1]!==b[i][j][1]),0),0);
const sigma1=[[C(),C(1)],[C(1),C()]],sigma2=[[C(),C(0,-1)],[C(0,1),C()]],sigma3=[[C(1),C()],[C(),C(-1)]],I=eye(2);
const iSigma1=sigma1.map(row=>row.map(x=>prod(C(0,1),x)));
const factors=[
 [sigma2,sigma3,I,sigma1],[sigma2,sigma3,I,sigma2],[sigma2,sigma3,I,sigma3],[iSigma1,I,I,I],
 [sigma2,sigma1,sigma1,I],[sigma2,sigma1,sigma2,I],[sigma2,sigma1,sigma3,I],[sigma2,sigma2,I,I]
];
const gammas=factors.map(kronList);
const anticommutator=(a,b)=>add(multiply(a,b),multiply(b,a));
const biv=(a,b)=>scaleMatrix(add(multiply(gammas[a],gammas[b]),negate(multiply(gammas[b],gammas[a]))),0.5);
const top=x=>x.slice(0,8).map(row=>row.slice(0,8)),bottom=x=>x.slice(8,16).map(row=>row.slice(8,16));
const offCount=x=>x.reduce((n,row,i)=>n+row.reduce((s,z,j)=>s+ +((i<8)!==(j<8)&&(z[0]!==0||z[1]!==0)),0),0);
const positiveChiralProjector=kronList([sigma3,I,I,I]);
const rightExpected=(grav,ew)=>{
 const spatial=grav<3,tau=spatial?grav:ew;
 if(spatial&&ew<3)return scaleMatrix(kronList([sigma2,[sigma1,sigma2,sigma3][ew],[sigma1,sigma2,sigma3][grav]]).map(row=>row.map(x=>prod(C(0,1),x))),1);
 if(spatial&&ew===3)return kronList([sigma1,I,[sigma1,sigma2,sigma3][grav]]).map(row=>row.map(x=>prod(C(0,-1),x)));
 if(!spatial&&ew<3)return scaleMatrix(kronList([sigma1,[sigma1,sigma2,sigma3][ew],I]),-1);
 return scaleMatrix(kronList([sigma2,I,I]),-1);
};
const oldEW=[kron(sigma1,sigma1),kron(sigma1,sigma2),kron(sigma1,sigma3),kron(sigma2,I)];
const oldEWbiv=(a,b)=>scaleMatrix(add(multiply(oldEW[a],oldEW[b]),negate(multiply(oldEW[b],oldEW[a]))),0.5);
const mixedBasis=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>multiply(gammas[i],gammas[j+4])));
const matrixPhi=coeff=>coeff.reduce((mat,v,i)=>add(mat,scaleMatrix(gammas[i+4],v)),zero(16));
const matrixE=coeff=>coeff.reduce((mat,v,i)=>add(mat,scaleMatrix(gammas[i],v)),zero(16));
function typedSourceCheck(p=src){
 const errors=[],ck=(yes,why)=>{if(!yes)errors.push(why)};
 ck(p.schema==="isograph.lisi-l01-graviweak-cl71-source-g0.v0.1"&&p.track==="L"&&p.stage==="G0"&&p.authority===false,"L G0 unqualified source only");
 ck(p.source?.id==="L01"&&p.source?.revision==="arXiv:0711.0770v1 2007-11-06"&&p.source?.section==="§2.2.3 Graviweak D4"&&p.source?.printed_page===12&&p.source?.pdf_page_zero_based===12,"exact primary source version and page");
 for(const [field,path]of Object.entries({source_SSC_022:P.ssc,gate_022:P.gate,electroweak_wew_source:P.ew,gravity_clifford_source:P.grav}))
 ck(p.parent?.[field]?.path===path&&p.parent?.[field]?.git_blob_sha===gitsha(path),"exact predecessor SHA "+field);
 ck(ssc.items.length===191&&gate.current_lawful_state.G1_authorized===false&&ssc.guards.source_census_freeze_complete===false,"upstream source stage remains G0");
 ck(p.source_complete===false&&p.source_census_frozen===false&&p.mathematical_theorem_qualified===false&&p.G1_authorized===false&&p.external_cold_review_passed===false,"no theorem or source promotion");
 const rows=p.gamma_source?.eight_ordered_generators||[];
 const expected=[
  ["Gamma1","sigma2 tensor sigma3 tensor I2 tensor sigma1","SPACE_POSITIVE"],
  ["Gamma2","sigma2 tensor sigma3 tensor I2 tensor sigma2","SPACE_POSITIVE"],
  ["Gamma3","sigma2 tensor sigma3 tensor I2 tensor sigma3","SPACE_POSITIVE"],
  ["Gamma4","i*sigma1 tensor I2 tensor I2 tensor I2","TIME_NEGATIVE"],
  ["GammaPrime1","sigma2 tensor sigma1 tensor sigma1 tensor I2","ELECTROWEAK_POSITIVE"],
  ["GammaPrime2","sigma2 tensor sigma1 tensor sigma2 tensor I2","ELECTROWEAK_POSITIVE"],
  ["GammaPrime3","sigma2 tensor sigma1 tensor sigma3 tensor I2","ELECTROWEAK_POSITIVE"],
  ["GammaPrime4","sigma2 tensor sigma2 tensor I2 tensor I2","ELECTROWEAK_POSITIVE"]
 ];
 ck(rows.length===8&&str(rows.map(x=>[x.label,x.source_tensor,x.metric_role,x.order]))===str(expected.map((x,i)=>[...x,i])),"exact ordered eight 4-tensor source generators, all signs");
 ck(p.gamma_source?.source_metric==="eta=diag(+1,+1,+1,-1,+1,+1,+1,+1) for THIS SOURCE GENERATOR ORDER (first 3 grav space; Gamma4 grav time; four prime electroweak positive)","one time negative and seven positive source basis");
 ck(p.gamma_source?.source_bivector==="Gamma_{I J}=(1/2)[Gamma_I,Gamma_J], including gravity/electroweak and mixed ordered pairs; source H1 chiral even connection only.","exact Clifford bivector normalization");
 ck(p.gamma_source?.positive_chirality_orientation?.includes("first 8x8 quadrant")&&p.gamma_source?.two_algebra_roles?.length===3,"source chiral role and non-reuse of 4x4 names");
 ck(p.H1?.source_formula==="H_1=(1/2)*omega+(1/4)*e*phi+w_ew"&&p.H1?.mixed_operator?.includes("Gamma_mu*GammaPrime_nu")&&p.H1?.mixed_operator?.includes("ordered first gravity vector then electroweak vector"),"source H1 1/2,1/4 and rightmost ordering");
 ck(p.H1?.source_relative_coefficients?.join("|")==="1/2 for omega|1/4 for e phi|1 for w_ew"&&p.H1?.frame?.includes("gravity 1-form")&&p.H1?.higgs?.includes("four REAL scalar"),"source typed form/scalar distinction");
 ck(p.H1?.source_modality?.includes("AUTHOR CLAIM")&&p.H1?.full_8x8_display?.includes("require separate source-native"),"no universal curvature theorem or false 8x8 completion");
 ck(p.finite_math_scope?.Clifford_ordered_generator_pairs===64&&str(p.finite_math_scope?.expected_diagonal_signature)===str([1,1,1,-1,1,1,1,1])&&p.finite_math_scope?.mixed_frame_Higgs_basis_products===16,"finite source-mathematics domain");
 ck(p.finite_math_scope?.mixed_operators_even_under_outer_chirality===true&&p.finite_math_scope?.source_quadrant?.includes("upper 8x8 first quadrant"),"correct chirality projection");
 ck(p.source_table5_boundary?.root_weight_rows_exactly_checked===false&&p.source_table5_boundary?.root_triality_rotation_all_source_orbits_checked===false&&p.source_table5_boundary?.source_physical_identification?.includes("tentatively"),"Table5 and triality physical generation OPEN");
 ck(p.negative_evidence?.no_W_source_import===true&&p.negative_evidence?.source_dynamics?.includes("not independent full physical")&&p.finite_math_scope?.nonclaims?.some(x=>x.includes("No full 8x8")),"negative outcomes and open G0 source");
 ck(p.next_lawful_step?.includes("64 ordered anticommutator")&&p.next_lawful_step?.includes("16 mixed")&&!str(p).includes("W-SSC-"),"source-only next work");
 // Independent two-dimensional Pauli matrices reconstruct all 16x16 source gamma products.
 let ordered=0,cellFailures=0,diagNeg=0;
 for(let i=0;i<8;i++)for(let j=0;j<8;j++){
  const anti=anticommutator(gammas[i],gammas[j]);
  const expectedMat=scaleMatrix(eye(16),i===j?2*[1,1,1,-1,1,1,1,1][i]:0);
  cellFailures+=mismatch(anti,expectedMat);ordered++;
 }
 ck(ordered===64&&cellFailures===0,"all ordered Cl7,1 source anticommutator cases and 16x16 coefficient cells");
 let gammaQuadrant=0,mixedInputs=0,mixedWitness=0,antisym=0;
 for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  const T=mixedBasis[i][j],other=multiply(gammas[j+4],gammas[i]);
  mixedInputs++;
  antisym+=mismatch(add(T,other),zero(16));
  gammaQuadrant+=offCount(T);
  mixedWitness+=mismatch(top(T),rightExpected(i,j));
  mixedWitness+=mismatch(T,biv(i,j+4));
 }
 ck(mixedInputs===16&&gammaQuadrant===0&&antisym===0&&mixedWitness===0,"16 cross-carrier ordered bivectors: chirality preserving and exact alternative tensor witness");
 // Each bivector of the 4x4 EW source lifts to original sixteen matrices; the source does not identify the underlying objects' SI handles.
 let wewEmbeddingFailures=0;
 for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)
  wewEmbeddingFailures+=mismatch(top(biv(i+4,j+4)),kron(oldEWbiv(i,j),I));
 ck(wewEmbeddingFailures===0,"six EW Clifford bivector operators commute with gravity spectator and lift 4x4 source representation");
 // Full 81x81 finite set of REAL frame and Higgs source coefficient tuples, no source Lie theorem claimed.
 const values=[-1,0,1],realVectors=[];
 for(let t=0;t<81;t++){let q=t,a=[];for(let k=0;k<4;k++){a.push(values[q%3]);q=Math.floor(q/3)}realVectors.push(a)}
 let total=0,failures=0,first=null;
 for(const e of realVectors){
  const Ematrix=matrixE(e);
  for(const phi of realVectors){
   const full=multiply(Ematrix,matrixPhi(phi));
   let expanded=zero(16);
   for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(e[i]*phi[j])expanded=add(expanded,scaleMatrix(mixedBasis[i][j],e[i]*phi[j]));
   const d=mismatch(full,expanded)+offCount(full);
   failures+=d;if(d&&!first)first={e,phi,failed_entries:d};
   total++;
  }
 }
 ck(total===6561&&failures===0,"all 6561 real e/phi pairs source mixed ephi equals ordered product and preserves 8+8 chiral blocks");
 const originalSource=read(P.ew);
 ck(originalSource.fermion_and_gauge_roles?.left?.includes("LEFT-chiral")&&p.H1?.electroweak_connection?.includes("distinct independent w/B1"),"do not erase chiral wew role when embedding H1");
 return {errors,stats:{Cl71_ordered_pairs:ordered,Cl71_antcommutator_cells:ordered*256,
mixed_ordered_Clifford_basis:mixedInputs,mixed_chirality_off_blocks:0,independent_mixed_tensor_witnesses:16,
EW_4x4_to_16x16_bivector_lift_pairs:6,real_frame_Higgs_tuples:total,
mixed_16x16_source_cells:total*256,positive_8x8_projection_cells:total*64}};
}
const baseline=typedSourceCheck(),errors=[...baseline.errors];
const cases=[
 ["edit Gamma4 time sign",p=>{p.gamma_source.eight_ordered_generators[3].source_tensor="sigma1 tensor I2 tensor I2 tensor I2"}],
 ["wrong Gamma1 spatial tensor",p=>{p.gamma_source.eight_ordered_generators[0].source_tensor="sigma2 tensor sigma1 tensor I2 tensor sigma1"}],
 ["wrong GammaPrime4 source sigma",p=>{p.gamma_source.eight_ordered_generators[7].source_tensor="sigma2 tensor sigma3 tensor I2 tensor I2"}],
 ["swap GammaPrime2 and3",p=>{p.gamma_source.eight_ordered_generators[5].source_tensor="sigma2 tensor sigma1 tensor sigma3 tensor I2"}],
 ["change Cl71 metric",p=>{p.gamma_source.source_metric=p.gamma_source.source_metric.replace("-1","+1")}],
 ["change source H1 frame Higgs factor",p=>{p.H1.source_formula="H1=1/2 omega+1/2 e phi+w"}],
 ["delete source frame reality",p=>{p.H1.higgs="four complex scalar fields"}],
 ["change source order phi e",p=>{p.H1.mixed_operator="phi*e"}],
 ["erase Clifford gamma bivector half",p=>{p.gamma_source.source_bivector="GammaIJ=GammaI GammaJ"}],
 ["claim H1 8x8 source fully checked",p=>{p.H1.full_8x8_display="fully checked source"}],
 ["promote Table5 all rows",p=>{p.source_table5_boundary.root_weight_rows_exactly_checked=true}],
 ["promote triality orbits",p=>{p.source_table5_boundary.root_triality_rotation_all_source_orbits_checked=true}],
 ["promote generation physical theorem",p=>{p.source_table5_boundary.source_physical_identification="T generates unique 3 generations"}],
 ["erase chirality claim",p=>{p.finite_math_scope.mixed_operators_even_under_outer_chirality=false}],
 ["erase source preserved Spin obstruction",p=>{p.negative_evidence.L01_real_Spin_Lie_group="source repaired"}],
 ["erase old octonion source blocker",p=>{p.negative_evidence.L05_original_O="source repaired"}],
 ["erase mixed source basis count",p=>{p.finite_math_scope.mixed_frame_Higgs_basis_products=0}],
 ["switch to different source",p=>{p.source.revision="arXiv:0711.0770v2"}],
 ["alter source page",p=>{p.source.printed_page=13}],
 ["stale SSC parent",p=>{p.parent.source_SSC_022.git_blob_sha="STALE"}],
 ["stale wew parent",p=>{p.parent.electroweak_wew_source.git_blob_sha="STALE"}],
 ["claim G0 frozen",p=>{p.source_census_frozen=true}],
 ["claim physical math theorem",p=>{p.mathematical_theorem_qualified=true}],
 ["claim G1",p=>{p.G1_authorized=true}],
 ["fake external cold review",p=>{p.external_cold_review_passed=true}],
 ["cross-track insertion",p=>{p.source.modality+=" W-SSC-103"}]
];
let rejected=0;
if(!baseline.errors.length)for(const [label,edit]of cases){
 const x=clone(src),before=str(x);edit(x);
 if(str(x)===before)errors.push("NOOP mutation "+label);
 else if(typedSourceCheck(x).errors.length===0)errors.push("ESCAPED mutation "+label);
 else rejected++;
}
console.log(JSON.stringify({schema:"isograph.exp062-l01-cl71-graviweak-source-g0.v0.1",pass:errors.length===0,errors,baseline:baseline.stats,
adversarial_defined:cases.length,adversarial_rejected:rejected,mutation_gate:baseline.errors.length?"BASELINE_FAILED":"TESTED",
full_H1_8x8_source_matrix_qualified:false,full_Table5_audited:false,G1_to_G7_authorized:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
