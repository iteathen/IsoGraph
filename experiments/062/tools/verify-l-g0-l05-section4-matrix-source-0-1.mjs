import fs from 'node:fs';
import crypto from 'node:crypto';

const path='experiments/062/L_G0_L05_SECTION4_L133_SOURCE_EXPRESSION_AUDIT_0_1.json';
const audit=JSON.parse(fs.readFileSync(path,'utf8'));
const resultRecord=JSON.parse(fs.readFileSync('experiments/062/L_G0_L05_SECTION4_MATRIX_COMMUTATOR_CONTROLS_0_1.json','utf8'));
const j=x=>JSON.stringify(x),clone=x=>JSON.parse(j(x));
const expectedC=[
['2*i*B1_3','-2*(conj(v1)*v2-conj(v2)*v1)-(psi1*conj(psi2)-psi2*conj(psi1))-(chi1*conj(chi2)-chi2*conj(chi1))'],
['(2*i/sqrt(3))*B2_3','(chi1*conj(chi2)-chi2*conj(chi1))+(conj(psi1)*psi2-conj(psi2)*psi1)'],
['v3','-2*i*(B1_1*v2-B1_2*v1)+(conj(chi1)*conj(psi2)-conj(chi2)*conj(psi1))'],
['psi3','i*(B1_1+sqrt(3)*B2_1)*psi2-i*(B1_2+sqrt(3)*B2_2)*psi1+(conj(v1)*conj(chi2)-conj(v2)*conj(chi1))'],
['chi3','i*(B1_1-sqrt(3)*B2_1)*chi2-i*(B1_2-sqrt(3)*B2_2)*chi1+(conj(psi1)*conj(v2)-conj(psi2)*conj(v1))']
];
const expectedH=[
['M3','M1*M2-M2*M1-(tilde(v1)*v2-tilde(v2)*v1)-(psi1*tilde(psi2)-psi2*tilde(psi1))'],
['P3','P1*P2-P2*P1-(tilde(chi1)*chi2-tilde(chi2)*chi1)-(v1*tilde(v2)-v2*tilde(v1))'],
['V3','V1*V2-V2*V1-(tilde(psi1)*psi2-tilde(psi2)*psi1)-(chi1*tilde(chi2)-chi2*tilde(chi1))'],
['v3','(P1*v2-P2*v1)+(v1*M2-v2*M1)+(tilde(chi1)*tilde(psi2)-tilde(chi2)*tilde(psi1))'],
['psi3','(M1*psi2-M2*psi1)+(psi1*V2-psi2*V1)+(tilde(v1)*tilde(chi2)-tilde(v2)*tilde(chi1))'],
['chi3','(V1*chi2-V2*chi1)+(chi1*P2-chi2*P1)+(tilde(psi1)*tilde(v2)-tilde(psi2)*tilde(v1))']
];
const expectedCMatrix=[
['i*B1 + i/sqrt(3)*B2','-v0+i*v1','psi0+i*psi1'],
['v0+i*v1','-i*B1+i/sqrt(3)*B2','-chi0+i*chi1'],
['-psi0+i*psi1','chi0+i*chi1','-2i/sqrt(3)*B2']
];
const expectedHMatrix=[['M','-tilde(v)','psi'],['v','P','-tilde(chi)'],['-tilde(psi)','chi','V']];

const cx=(a=0,b=0)=>[a,b],ca=(x,y)=>[x[0]+y[0],x[1]+y[1]],cn=x=>[-x[0],-x[1]],cs=(x,y)=>ca(x,cn(y)),cm=(x,y)=>[x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]],cc=x=>[x[0],-x[1]],ck=(x,n)=>[x[0]*n,x[1]*n],ci=n=>cx(0,n);
const q=(a=0,b=0,c=0,d=0)=>[a,b,c,d], qa=(x,y)=>x.map((v,i)=>v+y[i]), qn=x=>x.map(v=>-v),qs=(x,y)=>qa(x,qn(y)),qc=x=>[x[0],-x[1],-x[2],-x[3]];
const qm=(x,y)=>[
x[0]*y[0]-x[1]*y[1]-x[2]*y[2]-x[3]*y[3],
x[0]*y[1]+x[1]*y[0]+x[2]*y[3]-x[3]*y[2],
x[0]*y[2]-x[1]*y[3]+x[2]*y[0]+x[3]*y[1],
x[0]*y[3]+x[1]*y[2]-x[2]*y[1]+x[3]*y[0]
];
const qdiff=(a,b,c,d)=>qs(qm(a,b),qm(c,d)),qsum=(...xs)=>xs.reduce(qa,q());
const matC=(b,d,v,p,h)=>[[ci(b+d/Math.sqrt(3)),cn(cc(v)),p],[v,ci(-b+d/Math.sqrt(3)),cn(cc(h))],[cn(cc(p)),h,ci(-2*d/Math.sqrt(3))]];
const matH=(M,P,V,v,p,h)=>[[M,qn(qc(v)),p],[v,P,qn(qc(h))],[qn(qc(p)),h,V]];
const matrixProduct=(a,b,zero,add,mul)=>Array.from({length:3},(_,i)=>Array.from({length:3},(_,k)=>{let t=zero();for(let j=0;j<3;j++)t=add(t,mul(a[i][j],b[j][k]));return t}));
const matrixCommutator=(a,b,zero,add,mul,sub)=>{const ab=matrixProduct(a,b,zero,add,mul),ba=matrixProduct(b,a,zero,add,mul);return ab.map((r,i)=>r.map((v,k)=>sub(v,ba[i][k])))};
const cerr=(a,b)=>Math.max(...a.map((v,i)=>Math.abs(v-b[i])));

function cSource(x,y){
 const [b,d,v,p,h]=x,[B,D,V,P,H]=y;
 const dif=(a,b,c,d)=>cs(cm(a,b),cm(c,d));
 const B1=cs(cs(ck(dif(cc(v),V,cc(V),v),-2),dif(p,cc(P),P,cc(p))),dif(h,cc(H),H,cc(h)));
 const B2=ca(dif(h,cc(H),H,cc(h)),dif(cc(p),P,cc(P),p));
 const v3=ca(ck(cm(ci(1),cs(ck(V,b),ck(v,B))),-2),dif(cc(h),cc(P),cc(H),cc(p)));
 const p3=ca(cm(ci(1),cs(ck(P,b+Math.sqrt(3)*d),ck(p,B+Math.sqrt(3)*D))),dif(cc(v),cc(H),cc(V),cc(h)));
 const h3=ca(cm(ci(1),cs(ck(H,b-Math.sqrt(3)*d),ck(h,B-Math.sqrt(3)*D))),dif(cc(p),cc(V),cc(P),cc(v)));
 return [B1,B2,v3,p3,h3];
}
function hSource(x,y){
const [M,P,V,v,p,h]=x,[N,Q,W,w,t,d]=y;
return [
 qsum(qdiff(M,N,N,M),qn(qdiff(qc(v),w,qc(w),v)),qn(qdiff(p,qc(t),t,qc(p)))),
 qsum(qdiff(P,Q,Q,P),qn(qdiff(qc(h),d,qc(d),h)),qn(qdiff(v,qc(w),w,qc(v)))),
 qsum(qdiff(V,W,W,V),qn(qdiff(qc(p),t,qc(t),p)),qn(qdiff(h,qc(d),d,qc(h)))),
 qsum(qdiff(P,w,Q,v),qdiff(v,N,w,M),qdiff(qc(h),qc(t),qc(d),qc(p))),
 qsum(qdiff(M,t,N,p),qdiff(p,W,t,V),qdiff(qc(v),qc(d),qc(w),qc(h))),
 qsum(qdiff(V,d,W,h),qdiff(h,Q,d,P),qdiff(qc(p),qc(w),qc(t),qc(v)))
];
}
const su3Inputs=[
 [[1,-2,[1,2],[0,-1],[2,3]],[-1,1,[0,3],[1,2],[3,-2]]],
 [[0,0,[0,0],[1,0],[0,0]],[2,0,[0,1],[0,0],[1,1]]],
 [[1,1,[1,1],[2,2],[3,1]],[1,-1,[-1,0],[1,-2],[1,-2]]]
];
const h1=[[0,1,-2,3],[0,2,1,-1],[0,-1,3,1],[1,2,3,4],[-2,1,0,3],[1,-1,2,0]];
const h2=[[0,-1,1,2],[0,3,-2,2],[0,2,1,-3],[3,1,-2,1],[0,-1,3,2],[-2,2,1,1]];
const sp3Inputs=[[h1,h2],[h1.map(x=>x.map(v=>v/2)),h2],[h2,h1]];
function verify(data){
const issues=[],check=(yes,msg)=>{if(!yes)issues.push(msg)};
const s=data.source_specific,co=s?.su3_commutator,ho=s?.sp3_commutator;
check(data.counts?.source_six_lie_decompositions===6,'source decomposition family count');
check(j(s?.su3_matrix?.first)===j(expectedCMatrix),'su3 exact 3x3 source matrix');
check(j(s?.sp3_matrix?.entries)===j(expectedHMatrix),'sp3 exact 3x3 source matrix');
check(j(co?.components?.map(x=>[x.lhs,x.rhs]))===j(expectedC),'su3 exact 5 source bracket formulas');
check(j(ho?.components?.map(x=>[x.lhs,x.rhs]))===j(expectedH),'sp3 exact 6 source bracket formulas');
check(s?.su3_matrix?.guards?.some(x=>x.includes('two independent')),'source diagonal two-degrees-of-freedom guard');
check(s?.sp3_matrix?.guards?.some(x=>x.includes('conjugation')),'source tilde/complex-conjugation distinction');
check(data.stage_gate?.G0_source_census_complete===false&&data.stage_gate?.G3_Core_closed_R04_R05_current===false,'source stage premature G3');
const numeric={su3:[],sp3:[]};
for(const [x,y] of su3Inputs){
const c=matrixCommutator(matC(...x),matC(...y),()=>cx(),ca,cm,cs);
const expected=[cs(c[0][0],c[1][1]),cn(c[2][2]),c[1][0],c[0][2],c[2][1]];
const got=cSource(x,y);numeric.su3.push(Math.max(...got.map((v,i)=>cerr(v,expected[i]))));
}
for(const [x,y] of sp3Inputs){
const c=matrixCommutator(matH(...x),matH(...y),()=>q(),qa,qm,qs);
const expected=[c[0][0],c[1][1],c[2][2],c[1][0],c[0][2],c[2][1]];
const got=hSource(x,y);numeric.sp3.push(Math.max(...got.map((v,i)=>cerr(v,expected[i]))));
}
const worst=Math.max(...numeric.su3,...numeric.sp3);
check(worst<1e-9,'source component bracket mismatch against independent source matrix commutator');
return{issues,numeric,worst};
}
const controls=[
['su3 wrong sign',d=>{d.source_specific.su3_commutator.components[0].rhs=d.source_specific.su3_commutator.components[0].rhs.replace('-2*','+2*')}],
['su3 changed source diagonal',d=>{d.source_specific.su3_matrix.first[1][1]='+i*B1+i/sqrt(3)*B2'}],
['sp3 noncommutative operand swap',d=>{d.source_specific.sp3_commutator.components[3].rhs=d.source_specific.sp3_commutator.components[3].rhs.replace('P1*v2','v2*P1')}],
['sp3 missing conjugation',d=>{d.source_specific.sp3_matrix.entries[0][1]='-v'}],
['missing source bracket',d=>{d.source_specific.sp3_commutator.components.pop()}],
['premature G3 closure',d=>{d.stage_gate.G3_Core_closed_R04_R05_current=true}],
['source family omitted',d=>{d.counts.source_six_lie_decompositions=5}]
];
const state=verify(audit),rejected=[];
for(const [name,mutation] of controls){const t=clone(audit);mutation(t);if(verify(t).issues.length)rejected.push(name);else state.issues.push('escaped '+name)}
const result={schema:'isograph.exp062-l-g0-l05-section4-matrix-source-verifier.v0.1',pass:state.issues.length===0,
errors:state.issues,source_bracket_components:{su3:5,sp3:6},
finite_matrix_pairs:{su3:3,sp3:3},max_matrix_error:state.worst,
adversarial_tests_rejected:rejected.length,adversarial_controls:rejected,
qualification:'LOCAL_INTERNAL_DETERMINISTIC_ONLY_NOT_FULL_SOURCE_AUDIT'};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exit(1);
