// G0 L-only independent matrix realization of mixed-output uniform basis transport.
// Typed source: L01 arXiv:0711.0770v1 p.12 eight 16x16 Pauli Kronecker gammas.
// Exact Gaussian-integer matrix multiplication; no dependency on abstract blade verifier.
const issues=[];const ck=(q,m)=>{if(!q)issues.push(m);};
const c=(r=0,i=0)=>[r,i],zero=()=>c(),i=c(0,1),unit=c(1);
const add=(x,y)=>c(x[0]+y[0],x[1]+y[1]),sub=(x,y)=>c(x[0]-y[0],x[1]-y[1]);
const mul=(x,y)=>c(x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]);
const scale=(x,k)=>c(x[0]*k,x[1]*k),eqc=(x,y)=>x[0]===y[0]&&x[1]===y[1];
const I=[[unit,zero()],[zero(),unit]];
const X=[[zero(),unit],[unit,zero()]],Y=[[zero(),c(0,-1)],[c(0,1),zero()]],Z=[[unit,zero()],[zero(),c(-1)]];
const base={I,X,Y,Z};
const mats=(a,b)=>a.map((row,ri)=>row.map((v,ci)=>add(v,b[ri][ci])));
const mscale=(a,k)=>a.map(row=>row.map(v=>scale(v,k)));
const msub=(a,b)=>a.map((row,ri)=>row.map((v,ci)=>sub(v,b[ri][ci])));
const mAdd=(...ms)=>ms.reduce((a,b)=>mats(a,b));
const mMul=(a,b)=>{const h=a.length,w=b[0].length,inner=b.length;const out=[];for(let y=0;y<h;y++){
 const row=[];for(let x=0;x<w;x++){let v=zero();for(let k=0;k<inner;k++)v=add(v,mul(a[y][k],b[k][x]));row.push(v);}out.push(row);
}return out;};
const mzero=(n)=>Array.from({length:n},()=>Array.from({length:n},zero));
const mIdentity=(n)=>Array.from({length:n},(_,a)=>Array.from({length:n},(_,b)=>c(a===b?1:0)));
const mEq=(a,b)=>a.every((row,ri)=>row.every((v,ci)=>eqc(v,b[ri][ci])));
const comm=(a,b)=>msub(mMul(a,b),mMul(b,a));
const kron=(a,b)=>{const out=[];for(const row of a)for(const brow of b){let line=[];for(const v of row)for(const w of brow)line.push(mul(v,w));out.push(line)}return out};
const tensor=(...ps)=>ps.reduce((a,b)=>kron(a,b));
const iX=X.map(row=>row.map(v=>mul(v,i)));
const gamma=[
 tensor(Y,Z,I,X),tensor(Y,Z,I,Y),tensor(Y,Z,I,Z),tensor(iX,I,I,I),
 tensor(Y,X,X,I),tensor(Y,X,Y,I),tensor(Y,X,Z,I),tensor(Y,Y,I,I)
];
const metric=[1,1,1,-1,1,1,1,1],size=16,z=mzero(size),id=mIdentity(size);
ck(gamma.length===8 && gamma.every(m=>m.length===16&&m.every(row=>row.length===16)),'exact source Pauli gamma dimensions');
let Clifford64=0;
for(let a=0;a<8;a++)for(let b=0;b<8;b++){
 const actual=mats(mMul(gamma[a],gamma[b]),mMul(gamma[b],gamma[a]));
 const expected=a===b?mscale(id,2*metric[a]):z;
 ck(mEq(actual,expected),'16x16 source Clifford gamma anticommutator '+a+','+b);Clifford64++;
}
const G=[],EW=[],M=[];
for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)G.push({a,b,mat:mMul(gamma[a],gamma[b])});
for(let a=4;a<8;a++)for(let b=a+1;b<8;b++)EW.push({a:a-4,b:b-4,mat:mMul(gamma[a],gamma[b])});
for(let a=0;a<4;a++)for(let b=4;b<8;b++)M.push({a,b:b-4,mat:mMul(gamma[a],gamma[b])});
const normalizedBasis=[...G,...EW,...M];
let evenChiral=0;
for(let j=0;j<normalizedBasis.length;j++){
 const m=normalizedBasis[j].mat; let okay=true;
 for(let r=0;r<16;r++)for(let k=0;k<16;k++)if((r<8)!==(k<8))if(!eqc(m[r][k],zero()))okay=false;
 ck(okay,'source 16x16 bivector even chirality '+j);evenChiral++;
}
const g=(a,b)=>{if(a===b)return z; const found=G.find(x=>x.a===Math.min(a,b)&&x.b===Math.max(a,b));return a<b?found.mat:mscale(found.mat,-1);};
const ew=(a,b)=>{if(a===b)return z; const found=EW.find(x=>x.a===Math.min(a,b)&&x.b===Math.max(a,b));return a<b?found.mat:mscale(found.mat,-1);};
const mm=(a,b)=>M.find(x=>x.a===a&&x.b===b).mat;
let GN=0,EN=0,NN=0,mmG=0,mmEW=0,mmZero=0,GE=0,mismatchesWrongSign=0;
function compare(actual,expected,kind,ki,kj){
 ck(mEq(actual,expected),kind+' FULL source matrix '+ki+','+kj);
 const a=actual.slice(0,8).map(row=>row.slice(0,8)),b=expected.slice(0,8).map(row=>row.slice(0,8));
 ck(mEq(a,b),kind+' positive chiral quadrant '+ki+','+kj);
}
for(let h=0;h<6;h++)for(let x=0;x<16;x++){
 const H=G[h],N=M[x];
 const expected=mAdd(mscale(mm(H.a,N.b),2*(H.b===N.a?metric[H.b]:0)),
    mscale(mm(H.b,N.b),-2*(H.a===N.a?metric[H.a]:0)));
 compare(comm(H.mat,N.mat),expected,'G/N',h,x);GN++;
}
for(let h=0;h<6;h++)for(let x=0;x<16;x++){
 const H=EW[h],N=M[x];
 const expected=mAdd(mscale(mm(N.a,H.a),2*(H.b===N.b?1:0)),
    mscale(mm(N.a,H.b),-2*(H.a===N.b?1:0)));
 compare(comm(H.mat,N.mat),expected,'EW/N',h,x);EN++;
}
for(let x=0;x<16;x++)for(let y=x+1;y<16;y++){
 const A=M[x],B=M[y];
 const expected=mAdd(mscale(g(A.a,B.a),-2*(A.b===B.b?1:0)),
     mscale(ew(A.b,B.b),-2*(A.a===B.a?metric[A.a]:0)));
 const actual=comm(A.mat,B.mat);
 compare(actual,expected,'N/N times 16',x,y);NN++;
 const any=!mEq(actual,z);
 if(A.b===B.b&&A.a!==B.a)mmG++;
 else if(A.a===B.a&&A.b!==B.b)mmEW++;
 else mmZero++;
 if(any && !mEq(mscale(actual,-1),expected))mismatchesWrongSign++;
}
for(let x=0;x<6;x++)for(let y=0;y<6;y++){
 compare(comm(G[x].mat,EW[y].mat),z,'G/EW',x,y);GE++;
}
ck(mismatchesWrongSign===48,'wrong sign consistent with Jacobi still violates 48 original source matrix brackets');
ck(mmG===24 && mmEW===24 && mmZero===72,'typed mixed/mixed 24+24+72 support');
const report={schema:'isograph.exp062-l039-direct-pauli-output-transport-G0.v0.1',pass:issues.length===0,issues,
 source:'L01 arXiv:0711.0770v1',stage:'G0',implementation:'independently entered eight Pauli tensor source gammas; exact Gaussian integer matrix operations',
 dimension:16,source_gamma_anticommutators:Clifford64,source_even_chiral_bivectors:evenChiral,
 G_N_brackets:GN,EW_N_brackets:EN,N_N_brackets:NN,N_N_to_G:mmG,N_N_to_EW:mmEW,N_N_zero:mmZero,G_EW_commuting:GE,
 checked_full_and_first_chiral_quadrants:true,wrong_sign_direct_source_matrix_mismatches:mismatchesWrongSign,
 coordinate_transport_N_eq_M_over_4:'consistent as basis change with rescaled coefficients, not automatic Lie automorphism',
 author_source_output_normalization_qualified:false,G1_authorized:false,source_census_frozen:false,external_cold_verification:false,cross_author_semantics_authorized:false};
console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
