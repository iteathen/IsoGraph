// L04 G0 exact matrix diagnostic for frozen arXiv:2407.02497v2 pp4-5.
// Gaussian-integer operations and 4x4 Pauli-tensor matrices. No physical or global author theorem claim.
const z=(r=0,i=0)=>[r,i];
const plus=(a,b)=>z(a[0]+b[0],a[1]+b[1]);
const prod=(a,b)=>z(a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]);
const Mplus=(A,B)=>A.map((r,i)=>r.map((x,j)=>plus(x,B[i][j])));
const neg=A=>A.map(row=>row.map(x=>z(-x[0],-x[1])));
const minus=(A,B)=>Mplus(A,neg(B));
const scaled=(c,A)=>A.map(row=>row.map(x=>prod(c,x)));
const Mmul=(A,B)=>A.map((row,i)=>row.map((_,j)=>row.reduce((sum,_,k)=>plus(sum,prod(A[i][k],B[k][j])),z())));
const kron=(A,B)=>A.flatMap(row=>B.map(rb=>row.flatMap(x=>rb.map(y=>prod(x,y)))));
const ident2=[[z(1),z()],[z(),z(1)]],s1=[[z(),z(1)],[z(1),z()]],s2=[[z(),z(0,-1)],[z(0,1),z()]],s3=[[z(1),z()],[z(),z(-1)]];
const g=[kron(s1,ident2),...[s1,s2,s3].map(p=>kron(scaled(z(0,-1),s2),p))];
const ident4=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>z(i===j?1:0)));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const eta=[1,-1,-1,-1];
function calculateOne({key,a,b,coeff,eigen}){
 const v=coeff.reduce((acc,c,k)=>Mplus(acc,scaled(c,g[k])),scaled(z(),ident4));
 const G2=Mmul(g[a],g[b]); // Twice J3 (a,b=1,2) or twice K3 (a,b=0,3).
 const twiceFullCommutator=minus(Mmul(G2,v),Mmul(v,G2));
 const fullTarget=scaled(prod(z(2),eigen),v);
 // P4 printed last expression (1/2)B^{mu nu}v_nu gamma_mu,
 // with B^{ab}=+1/2, B^{ba}=-1/2. Four times it is:
 const rhs4=minus(scaled(prod(z(eta[b]),coeff[b]),g[a]),scaled(prod(z(eta[a]),coeff[a]),g[b]));
 const expected=scaled(eigen,v);
 // Independently expand the p4 middle antisymmetric two-index sum.
 // 2*(4*middle) = sum_{(mu,nu)} (2B^{mu nu}) (gamma_mu v_nu - gamma_nu v_mu).
 const term=(u,w)=>minus(scaled(prod(z(eta[w]),coeff[w]),g[u]),scaled(prod(z(eta[u]),coeff[u]),g[w]));
 const twiceMiddle4=minus(term(a,b),term(b,a));
 const p4agreesWithP5=eq(rhs4,scaled(z(4),expected)); // p4=rhs4/4, p5=expected
 return {branch:key,full_commutator_matches_printed_p5: eq(twiceFullCommutator,fullTarget),
 printed_p4_final_fourfold_matches_p5:eq(rhs4,expected),
 printed_p4_middle_matches_final: eq(twiceMiddle4,scaled(z(2),rhs4)),
 printed_p4_final_equals_p5:p4agreesWithP5,
 nonzero_vector:!eq(v,scaled(z(),ident4)),
 printed_p5_eigenvalue:eigen[1]===1?'+i':eigen[1]===-1?'-i':eigen[0]===1?'+1':'-1',
 printed_p4_result_ratio_to_p5:'1/4'};
}
export function calculateL04VectorNormalization(){
const gSquared=g.map((x,i)=>eq(Mmul(x,x),scaled(z(eta[i]),ident4)));
const anticommuting=g.every((x,i)=>g.every((y,j)=>i===j||eq(Mplus(Mmul(x,y),Mmul(y,x)),scaled(z(),ident4))));
const branches=[
calculateOne({key:'spin-vee',a:1,b:2,coeff:[z(),z(1),z(0,-1),z()],eigen:z(0,1)}),
calculateOne({key:'spin-wedge',a:1,b:2,coeff:[z(),z(1),z(0,1),z()],eigen:z(0,-1)}),
calculateOne({key:'boost-vee',a:0,b:3,coeff:[z(1),z(),z(),z(-1)],eigen:z(1)}),
calculateOne({key:'boost-wedge',a:0,b:3,coeff:[z(1),z(),z(),z(1)],eigen:z(-1)})];
return {scope:'conditional Cl(1,3) Weyl/Pauli 4x4 exact Gaussian integer matrix audit',metric:[1,-1,-1,-1],gamma_squares_match_metric:gSquared.every(Boolean),distinct_gammas_anticommute:anticommuting,source_original_p4_and_p5_not_rewritten:true,source_x_cross_convention_and_author_intent_unresolved:true,
 all_four_branches_show_conditional_fourfold_ratio:branches.every(x=>x.full_commutator_matches_printed_p5&&x.printed_p4_final_fourfold_matches_p5&&x.printed_p4_middle_matches_final&&!x.printed_p4_final_equals_p5&&x.nonzero_vector),
 branches,physically_realized:false,whole_source_cold_complete:false};
}
if(process.argv[1]?.endsWith('l04-vector-bivector-normalization-model-0-1.mjs')){
 const r=calculateL04VectorNormalization();console.log(JSON.stringify(r,null,2));if(!r.all_four_branches_show_conditional_fourfold_ratio)process.exitCode=1;
}
