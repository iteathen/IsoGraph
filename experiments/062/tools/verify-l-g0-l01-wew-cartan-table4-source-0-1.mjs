import fs from "node:fs";
import crypto from "node:crypto";

const L="research/woit-lisi-isomorph/lisi/", E="experiments/062/";
const P={
 packet:L+"LISI_L01_ELECTROWEAK_WEW_CARTAN_TABLE4_G0_0_1.json",
 ssc:L+"SOURCE_SEMANTIC_CENSUS_0_21.json",
 gate:E+"L_CURRENT_STAGE_GATE_0_21.json",
 higgs:L+"LISI_L01_ELECTROWEAK_CL4_HIGGS_SOURCE_G0_0_1.json",
 visual:L+"LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json",
 freeze:"research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md"
};
const read=p=>JSON.parse(fs.readFileSync(p,"utf8")), clone=x=>JSON.parse(JSON.stringify(x)), str=JSON.stringify;
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash("sha1").update(Buffer.concat([Buffer.from("blob "+b.length+"\0"),b])).digest("hex")};
const packet=read(P.packet),ssc=read(P.ssc),gate=read(P.gate),higgs=read(P.higgs);
const C=(a=0,b=0)=>[a,b];
const plus=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const neg=a=>[-a[0],-a[1]];
const times=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const scale=(a,t)=>[a[0]*t,a[1]*t];
const zero=(n,m=n)=>Array.from({length:n},()=>Array.from({length:m},()=>C()));
const matrixPlus=(A,B)=>A.map((row,i)=>row.map((z,j)=>plus(z,B[i][j])));
const matrixNeg=A=>A.map(row=>row.map(neg));
const matrixScale=(A,t)=>A.map(row=>row.map(z=>scale(z,t)));
const matrixMul=(A,B)=>A.map((row,i)=>Array.from({length:B[0].length},(_,j)=>row.reduce((s,v,k)=>plus(s,times(v,B[k][j])),C())));
const kron=(A,B)=>A.flatMap(row=>B.map(br=>row.flatMap(v=>br.map(w=>times(v,w)))));
const matDiffCount=(A,B)=>A.reduce((s,row,i)=>s+row.reduce((k,z,j)=>k+ +(z[0]!==B[i][j][0]||z[1]!==B[i][j][1]),0),0);
const id=(n)=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>C(i===j?1:0)));
const upper=(M)=>M.slice(0,2).map(r=>r.slice(0,2)),lower=(M)=>M.slice(2,4).map(r=>r.slice(2,4));
const sig1=[[C(0),C(1)],[C(1),C(0)]],
 sig2=[[C(0),C(0,-1)],[C(0,1),C(0)]],
 sig3=[[C(1),C(0)],[C(0),C(-1)]],
 I2=id(2),pauli=[sig1,sig2,sig3];
const Gamma=[kron(sig1,sig1),kron(sig1,sig2),kron(sig1,sig3),kron(sig2,I2)];
const biv=(i,j)=>matrixScale(matrixPlus(matrixMul(Gamma[i],Gamma[j]),matrixNeg(matrixMul(Gamma[j],Gamma[i]))),0.5);
const sources=[biv(1,2),biv(2,0),biv(0,1)];
const deltas=[biv(0,3),biv(1,3),biv(2,3)];
const blockDiag=(A,B)=>Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i<2&&j<2?A[i][j]:i>=2&&j>=2?B[i-2][j-2]:C()));
const sigI=pauli.map(m=>m.map(row=>row.map(z=>times(C(0,1),z))));
const cMatrix=(W,B)=>blockDiag(pauli.reduce((a,s,i)=>matrixPlus(a,matrixScale(sigI[i],W[i]/2)),zero(2)),pauli.reduce((a,s,i)=>matrixPlus(a,matrixScale(sigI[i],B[i]/2)),zero(2)));
const fromUV=(V,U)=>sources.reduce((acc,m,i)=>matrixPlus(matrixPlus(acc,matrixScale(m,V[i]/2)),matrixScale(deltas[i],U[i]/2)),zero(4));
const fromVUblock=(V,U)=>cMatrix(V.map((x,i)=>x+U[i]),V.map((x,i)=>x-U[i]));
const cartan=(w,b)=>matrixPlus(matrixScale(biv(0,1),(w+b)/4),matrixScale(biv(2,3),(w-b)/4));
const cartanDiagonal=(w,b)=>Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>C(0,i===j?[w,-w,b,-b][i]/2:0)));
const phiZero=matrixScale(matrixPlus(matrixNeg(Gamma[2]),matrixMul(Gamma[3],matrixScale(id(4),0))),0.5);
// Use explicit i multiplication for the published Xphi0 representative.
const multiplyImag=A=>A.map(row=>row.map(z=>times(C(0,1),z)));
const xPhiZero=matrixScale(matrixPlus(matrixNeg(Gamma[2]),multiplyImag(Gamma[3])),0.5);
const comparator=(A,B)=>matDiffCount(A,B)===0;
const expectedRows=[
 ["Wplus",6,0,0,0,6],["Wminus",-6,0,0,0,-6],
 ["B1plus",0,6,0,6,6],["B1minus",0,-6,0,-6,-6],
 ["phiPlus",3,3,0,3,6],["phiMinus",-3,-3,0,-3,-6],
 ["phiZero",-3,3,0,3,0],["phiOne",3,-3,0,-3,0],
 ["nuL",3,0,3,-3,0],["eL",-3,0,3,-3,-6],
 ["nuR",0,3,3,0,0],["eR",0,-3,3,-6,-6],
 ["uL",3,0,-1,1,4],["dL",-3,0,-1,1,-2],
 ["uR",0,3,-1,4,4],["dR",0,-3,-1,-2,-2]
];
function check(p=packet){
 const errors=[],must=(v,what)=>{if(!v)errors.push(what)};
 must(p.schema==="isograph.lisi-l01-electroweak-connection-cartan-table4-g0.v0.1"&&p.track==="L"&&p.stage==="G0"&&p.authority===false,"L-only source packet not global authority");
 must(p.source?.id==="L01"&&p.source?.revision==="arXiv:0711.0770v1 2007-11-06"&&p.source?.pdf_pages_zero_based?.join(",")==="10,11"&&p.source?.section==="§2.2.2 Electroweak D2","frozen source edition, exact page and section");
 for(const [key,path]of Object.entries({ssc_021:P.ssc,gate_021:P.gate,higgs_cl4_source:P.higgs,L01_visual_audit:P.visual,frozen_corpus:P.freeze}))
  must(p.parents?.[key]?.path===path&&p.parents?.[key]?.git_blob_sha===blob(path),"exact source predecessor "+key);
 must(ssc.items.length===191&&ssc.status.includes("UNFROZEN")&&gate.current_lawful_state.G1_authorized===false,"no descendant stage promotion");
 must(p.source_complete===false&&p.source_census_frozen===false&&p.mathematical_theorem_qualified===false&&p.G1_authorized===false&&p.external_cold_review_passed===false,"source not already qualified");
 must(p.fermion_and_gauge_roles?.left?.includes("LEFT-chiral")&&p.fermion_and_gauge_roles?.right?.includes("DIFFERENT Pati-Salam")&&p.fermion_and_gauge_roles?.Higgs?.includes("four real"),"distinct W/B1 and real Higgs source scopes");
 must(p.wew?.first_2x2_block==="sum_{tau=1}^3 (V^tau+U^tau)*(i/2)*sigma_tau"&&p.wew?.second_2x2_block==="sum_{tau=1}^3 (V^tau-U^tau)*(i/2)*sigma_tau","source chirality and U sign, not switched");
 must(p.wew?.equal_first==="sum_{tau=1}^3 W^tau*(i/2)*sigma_tau"&&p.wew?.equal_second==="sum_{tau=1}^3 B_1^tau*(i/2)*sigma_tau","source W versus B1 block roles");
 must(str(p.wew?.roles_equalities)===str(["W^tau=V^tau+U^tau","B_1^tau=V^tau-U^tau","V^tau=(W^tau+B_1^tau)/2","U^tau=(W^tau-B_1^tau)/2"]),"exact U/V coefficient inverse rotation");
 must(p.wew?.binder?.startsWith("tau ranges 1..3")&&p.wew?.source_bivector_definition?.includes("gammaPrime_mu*gammaPrime_nu-gammaPrime_nu*gammaPrime_mu")&&p.wew?.source_lhs?.startsWith("w_ew=(1/2)*sum_{mu,nu}"),"source 1/2 and antisymmetric μν index scope");
 must(p.wew?.source_rotation?.includes("ANALOGOUS")&&p.wew?.diagnostic_six_bivector_basis?.status==="INDEPENDENT_DERIVED_CHECK_WITNESS_NOT_SOURCE_COEFFICIENT_IDENTIFICATION","diagnostic witness not source-index authority");
 must(str(p.wew?.diagnostic_six_bivector_basis?.common)===str([["tau1","gammaPrime_23"],["tau2","gammaPrime_31"],["tau3","gammaPrime_12"]])&&str(p.wew?.diagnostic_six_bivector_basis?.difference)===str([["tau1","gammaPrime_14"],["tau2","gammaPrime_24"],["tau3","gammaPrime_34"]]),"all six oriented derived basis operators");
 must(p.cartan?.source_expr==="C=(1/4)*(W^3+B_1^3)*gammaPrime_12+(1/4)*(W^3-B_1^3)*gammaPrime_34"&&p.cartan?.source_diag==="C=(i/2)*diag(W^3,-W^3,B_1^3,-B_1^3)","exact source Cartan coefficient, sign and diagonal");
 must(p.cartan?.phiZero_weight_example?.source_vector==="X_phiZero=(1/2)*(-gammaPrime_3+i*gammaPrime_4)"&&p.cartan?.phiZero_weight_example?.source_eigenbracket==="[C,X_phiZero]=i*(-W^3/2+B_1^3/2)*X_phiZero","exact Higgs Cartan commutator and charge");
 must(p.table4?.common_denominator===6&&p.table4?.source_rows_ordered?.length===16&&str(p.table4.source_rows_ordered.map(x=>[x.label,...x.units]))===str(expectedRows),"every printed Table4 row and 80 values, no selective sampling");
 must(str(p.table4?.columns)===str(["source_label","W3","B1^3","sqrt(2)/sqrt(3)*B2","halfY","Q"])&&p.table4?.check_identity_1==="halfY = B1^3 - [sqrt(2)/sqrt(3)*B2]"&&p.table4?.check_identity_2==="Q = W3 + halfY","source hypercharge transformation, not naturalized scaling");
 must(p.table4?.distinguish_phiOne?.includes("NOT real phi^1")&&p.derived_source_claims?.half_hypercharge==="(1/2)Y=B_1^3-sqrt(2)/sqrt(3)*B2","source complex phiOne and root scale");
 must(p.derived_source_claims?.coupling?.includes("sin²(theta_W)=3/8")&&p.derived_source_claims?.coupling?.includes("NOT independently qualified"),"source-only coupling claims");
 must(p.pending?.length===5&&p.pending[3].includes("Cl(7,1)")&&p.pending[4].includes("G1-G7 current replay forbidden"),"downstream formulas unexpanded");
 must(p.excluded_domains?.length===7&&p.excluded_domains.some(x=>x.includes("unrestricted complex"))&&p.excluded_domains.some(x=>x.includes("Woit")),"source type and independent research firewalls");
 must(p.expected_limited_finite_reconstruction?.ordered_six_real_W_B1_inputs===729&&p.expected_limited_finite_reconstruction?.source_table4_cells===80,"finite stated domain not universal theorem");
 // All original Pauli pairs checked mechanically independent of packet's authored source block.
 let cl4Fails=0;for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  const anti=matrixPlus(matrixMul(Gamma[i],Gamma[j]),matrixMul(Gamma[j],Gamma[i]));
  const expected=matrixScale(id(4),i===j?2:0);
  cl4Fails+=matDiffCount(anti,expected);
 }
 must(cl4Fails===0,"original frozen Cl4 Clifford basis positive control");
 let bFails=0;for(let i=0;i<3;i++){
  bFails+=matDiffCount(sources[i],blockDiag(sigI[i],sigI[i]));
  bFails+=matDiffCount(deltas[i],blockDiag(sigI[i],matrixNeg(sigI[i])));
 }
 must(bFails===0,"six signed bivector Clifford upper/lower decompositions reconstructed");
 let wcells=0,wrong=0,first;
 const values=[-1,0,1];
 for(let index=0;index<729;index++){
  let t=index;const components=[];
  for(let i=0;i<6;i++){components.push(values[t%3]);t=Math.floor(t/3);}
  const W=components.slice(0,3),B=components.slice(3,6);
  const V=W.map((x,i)=>(x+B[i])/2),U=W.map((x,i)=>(x-B[i])/2);
  const expected=cMatrix(W,B),viaBlocks=fromVUblock(V,U),viaBivector=fromUV(V,U);
  for(const got of [viaBlocks,viaBivector]){
   const n=matDiffCount(expected,got);wrong+=n;if(n&&!first)first={components,W,B,n};
  }
  wcells+=16;
 }
 must(wcells===11664&&wrong===0,"729 entire complex chiral 4x4 wew matrices: W/B1 vs U/V vs Pauli Clifford");
 let cartanCells=0,cartanErr=0,eigenErr=0;
 for(const W of values)for(const B of values){
  const a=cartan(W,B),b=cartanDiagonal(W,B);
  cartanErr+=matDiffCount(a,b);
  const bracket=matrixPlus(matrixMul(a,xPhiZero),matrixNeg(matrixMul(xPhiZero,a)));
  const right=matrixScale(multiplyImag(xPhiZero),(B-W)/2);
  eigenErr+=matDiffCount(bracket,right);
  cartanCells+=16;
 }
 must(cartanCells===144&&cartanErr===0&&eigenErr===0,"9 Cartan diagonal and printed Higgs eigenvector commutator instances");
 let tableErrors=0;
 for(const row of p.table4?.source_rows_ordered||[]){
  const [w,b,s,halfY,Q]=row.units;
  if(b-s!==halfY||w+halfY!==Q)tableErrors++;
 }
 must(tableErrors===0,"all 16 Table4 rows satisfy BOTH exact integer weight identities, 32 arithmetic obligations");
 // The complex W^3=i case violates anti-Hermitian su2 source reality, not the source statement.
 const badComplexW=blockDiag([[C(-.5),C()],[C(),C(.5)]],zero(2));
 const Hermitian=badComplexW.map((row,i)=>row.map((_,j)=>[badComplexW[j][i][0],-badComplexW[j][i][1]]));
 const antiHermitian=matrixNeg(Hermitian);
 must(!comparator(badComplexW,antiHermitian),"complex-coefficient out-of-domain negative control cannot become source counterexample");
 must(higgs.source_clifford?.source_vector?.includes("phi^1,phi^2,phi^3,phi^4 are real")&&p.fermion_and_gauge_roles?.source_cross_requirement?.includes("B1plus and B1minus"),"connected Higgs source but distinct right-chiral gauge field roles");
 must(!str(p).includes("W-SSC-"),"no cross-track source semantic premises");
 return {errors,stats:{Cl4Ordered:16,bivectorRoles:6,wewRealTuples:729,wewMatrixCells:wcells,sourceDerivationMatrixChecks:wcells*2,cartanCases:9,cartanAndEigenCells:cartanCells*2,weightRows:16,weightSourceCells:80,weightDerivedIdentities:32,excludedComplexSourceControls:1}};
}
const base=check(),errors=[...base.errors],mutations=[
 ["source revision altered",p=>{p.source.revision="arXiv 0711.0770v2"}],
 ["source paper page shifted",p=>{p.source.pdf_pages_zero_based=[9,10]}],
 ["swap SU2L/SU2R",p=>{p.wew.equal_first="sum_tau B_1^tau*(i/2)*sigma_tau"}],
 ["erase right chiral field",p=>{p.fermion_and_gauge_roles.right="same as left"}],
 ["flip lower U sign",p=>{p.wew.second_2x2_block="sum_tau (V^tau+U^tau)*(i/2)*sigma_tau"}],
 ["flip upper U sign",p=>{p.wew.first_2x2_block="sum_tau (V^tau-U^tau)*(i/2)*sigma_tau"}],
 ["flip U inverse",p=>{p.wew.roles_equalities[3]="U^tau=(B_1^tau-W^tau)/2"}],
 ["treat gravity omega as same SI",p=>{p.wew.source_rotation="U=omega_T"}],
 ["erase half bivector factor",p=>{p.wew.source_lhs="w_ew=sum w gamma"}],
 ["swap bivector source commutator",p=>{p.wew.source_bivector_definition="gamma=gamma_mu gamma_nu"}],
 ["wrong Cartan B1 sign",p=>{p.cartan.source_expr=p.cartan.source_expr.replace("W^3-B_1^3","W^3+B_1^3")}],
 ["wrong Cartan last eigenvalue",p=>{p.cartan.source_diag=p.cartan.source_diag.replace("-B_1^3","B_1^3")}],
 ["wrong phi0 eigenweight",p=>{p.cartan.phiZero_weight_example.source_eigenbracket="[C,X]=0"}],
 ["swap conjugated Higgs label",p=>{p.table4.distinguish_phiOne="phiOne IS real phi^1"}],
 ["wrong phiZero Table4 W3",p=>{p.table4.source_rows_ordered[6].units[0]=3}],
 ["wrong right electron Y",p=>{p.table4.source_rows_ordered[11].units[3]=-3}],
 ["missing table row",p=>{p.table4.source_rows_ordered.pop()}],
 ["wrong Wplus charge",p=>{p.table4.source_rows_ordered[0].units[4]=-6}],
 ["wrong quark rational",p=>{p.table4.source_rows_ordered[13].units[2]=1}],
 ["mislabel phiOne charge row",p=>{p.table4.source_rows_ordered[7].label="phi^1"}],
 ["replace B2 scale",p=>{p.derived_source_claims.half_hypercharge="(1/2)Y=B_1^3-B2"}],
 ["assert B1plus SM field",p=>{p.fermion_and_gauge_roles.source_cross_requirement="B1 is established SM field"}],
 ["fabricate g1 phenomenological proof",p=>{p.derived_source_claims.coupling="globally proved physics"}],
 ["claim no graviweak work left",p=>{p.pending=p.pending.filter(x=>!x.includes("Cl(7,1)"))}],
 ["import complex-valued arbitrary W",p=>{p.excluded_domains=p.excluded_domains.filter(x=>!x.includes("unrestricted complex"))}],
 ["promote G1",p=>{p.G1_authorized=true}],
 ["promote mathematical theorem",p=>{p.mathematical_theorem_qualified=true}],
 ["mark source frozen",p=>{p.source_census_frozen=true}],
 ["fabricate cold external check",p=>{p.external_cold_review_passed=true}],
 ["wrong predecessor SHA",p=>{p.parents.higgs_cl4_source.git_blob_sha="STALE"}],
 ["wrong source corpus",p=>{p.parents.frozen_corpus.git_blob_sha="STALE"}],
 ["smuggle W assumption",p=>{p.fermion_and_gauge_roles.left+=" W-SSC-103"}]
];
let rejected=0;
if(!base.errors.length)for(const [name,edit]of mutations){
 const m=clone(packet),before=str(m);edit(m);
 if(str(m)===before)errors.push("no-op hostile mutation "+name);
 else if(check(m).errors.length===0)errors.push("escaped hostile mutation "+name);
 else rejected++;
}
const result={schema:"isograph.exp062-l01-wew-cartan-table4-source-check.v0.1",
pass:errors.length===0,errors,baseline:base.stats,adversarial_defined:mutations.length,adversarial_rejected:rejected,
mutation_gate:base.errors.length?"BASELINE_NOT_PASS":"TESTED",
source_global_claims_qualified:false,source_census_frozen:false,G1_to_G7_authorized:false,external_review_passed:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
