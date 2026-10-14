// Experiment 062 L-only G0: bounded exact Gaussian-integer Pauli/Dirac diagnostics.
// Neither original printed S031 quaternion-coefficient ∼ conversion nor physical QFT is silently repaired.
export const z=(r=0,i=0)=>[r,i];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const neg=a=>[-a[0],-a[1]];
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const star=a=>[a[0],-a[1]],eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const I=z(1),O=z(),Mi=z(0,-1);
const I2=[[I,O],[O,I]],S1=[[O,I],[I,O]],S2=[[O,Mi],[z(0,1),O]],S3=[[I,O],[O,z(-1)]];
const scale=(c,A)=>A.map(row=>row.map(x=>mul(c,x)));
const plus=(A,B)=>A.map((row,i)=>row.map((v,j)=>add(v,B[i][j])));
const times=(A,B)=>A.map((row,i)=>row.map((_,j)=>row.reduce((v,x,k)=>add(v,mul(A[i][k],B[k][j])),O)));
const matrixStar=A=>A.map(row=>row.map(star));
const dagger=A=>A[0].map((_,i)=>A.map(row=>star(row[i])));
const e=[I2,...[S1,S2,S3].map(v=>scale(Mi,v))];
const qMatrix=q=>q.reduce((A,c,i)=>plus(A,scale(c,e[i])),scale(O,I2));
const qComplexStar=q=>q.map(star),qTilde=q=>q.map((v,i)=>i?neg(v):v);
const qNorm=q=>q.reduce((v,c)=>add(v,mul(c,c)),O);
const det=M=>sub(mul(M[0][0],M[1][1]),mul(M[0][1],M[1][0]));
const psiQL=p=>[[p[0],neg(star(p[3]))],[p[1],star(p[2])]];
const diracScalar=p=>[[p[0],p[2]],[p[1],p[3]]].reduce((v,[x,y])=>add(v,add(mul(star(x),y),mul(star(y),x))),O);
const quaternions=[
[z(1),z(2),z(3),z(4)], [z(0,1),z(1,2),z(2,-1),z(-3,0)], [z(1,1),O,O,O],
[O,z(0,1),O,O],[z(5,-7),z(-4,1),z(1,-9),z(-2,-3)],[O,O,O,O],
[z(1),z(0,1),z(1,1),z(-1,-1)]];
const spinors=[];for(let i=0;i<4;i++)for(const v of [I,z(0,1)]){const a=[O,O,O,O];a[i]=v;spinors.push(a)}
spinors.push([z(1,2),z(-2,1),z(3,-1),z(4,-3)],[z(0,1),O,O,O],[z(1,1),z(2,2),z(3,3),z(4,4)],[O,O,z(2),z(-2)],[z(2),z(1,-1),z(-4,3),z(0,2)]);
export function auditModel(){
const sigmaStar=[I2,S1,S2,S3].map((s,i)=>eq(matrixStar(s),times(times(S2,i?scale(z(-1),s):s),S2)));
const matrixStars=quaternions.map(q=>eq(matrixStar(qMatrix(q)),times(times(scale(z(-1),e[2]),qMatrix(qComplexStar(q))),e[2])));
const daggers=quaternions.map(q=>eq(dagger(qMatrix(q)),qMatrix(qTilde(qComplexStar(q)))));
const determinants=quaternions.map(q=>eq(det(qMatrix(q)),qNorm(q)));
const dirac=spinors.map(p=>{const v=det(psiQL(p)),s=diracScalar(p);return eq(s,z(2*v[0],0))&&s[1]===0});
const sample=spinors[8];
const Psi1i=[z(0,1),O,O,O],qDirect=psiQL(Psi1i);
const twicePrintedQuaternion=plus(scale(z(0,-1),I2),e[3]);
const printMismatch=!eq(scale(z(2),qDirect),twicePrintedQuaternion);
const all=[...sigmaStar,...matrixStars,...daggers,...determinants,...dirac];
return{PASS:all.every(Boolean),checks:{basis_sigma_star:sigmaStar,quaternion_matrix_complex_star:matrixStars,quaternion_matrix_hermitian_dagger:daggers,complex_quaternion_norm_equals_det:determinants,Dirac_scalar_equals_twice_real_det:dirac},sample_count:{sigma:4,quaternion:7,spinor:13},source_sample:{Psi:sample,det_psiQL:det(psiQL(sample)),Dirac_scalar:diracScalar(sample)},S031_conditional_printed_coefficient_mismatch:printMismatch,
conservation:"source S031 printed ~ interpretation unresolved; selected Pauli matrix, finite Gaussian integers, no physical theory claim"};
}
if(process.argv[1]?.endsWith('verify-l-g0-l04-conjugation-invariant-finite-0-1.mjs'))console.log(JSON.stringify(auditModel(),null,2));
