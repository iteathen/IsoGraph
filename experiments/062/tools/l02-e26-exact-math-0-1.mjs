// L02 v2 Eq26: exact project-selected N=3 Cl(4,3) exterior/Hodge finite two-oracle witness.
// Local G0 mathematical engine for L02 v2 Eq(26), used before versioned repo verifier.
// Exact generic Clifford-exterior form-product oracle versus independently diagonal
// Lie-bivector scalar pairing oracle; Hodge metric comes from independent e, not eprime.
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){const t=a%b;a=b;b=t;}return a||1n;};
class Q{constructor(a,b=1n){a=BigInt(a);b=BigInt(b);if(b===0n)throw Error('division by zero');if(b<0n){a=-a;b=-b;}const g=gcd(a,b);this.n=a/g;this.d=b/g;}
 add(b){b=q(b);return new Q(this.n*b.d+b.n*this.d,this.d*b.d)}
 neg(){return new Q(-this.n,this.d)}
 sub(b){return this.add(q(b).neg())}
 mul(b){b=q(b);return new Q(this.n*b.n,this.d*b.d)}
 div(b){b=q(b);return new Q(this.n*b.d,this.d*b.n)}
 eq(b){b=q(b);return this.n===b.n&&this.d===b.d}
 is0(){return this.n===0n}
 toString(){return this.d===1n?String(this.n):String(this.n)+'/'+String(this.d)}
}
const q=x=>x instanceof Q?x:new Q(x), Q0=q(0),Q1=q(1), qarr=a=>a.map(row=>row.map(q));
const add=(a,b)=>a.map((row,i)=>row.map((x,j)=>x.add(b[i][j])));
const multiply=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((s,x,k)=>s.add(x.mul(b[k][j])),Q0)));
const trans=a=>a[0].map((_,i)=>a.map(r=>r[i]));
const ident=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>q(i===j?1:0)));
const inv=(matrix)=>{const n=matrix.length,A=matrix.map((r,i)=>[...r,...ident(n)[i]]);let det=Q1;for(let col=0;col<n;col++){let pivot=col;while(pivot<n&&A[pivot][col].is0())pivot++;if(pivot===n)throw Error('singular frame');if(pivot!==col){[A[pivot],A[col]]=[A[col],A[pivot]];det=det.neg();}const v=A[col][col];det=det.mul(v);A[col]=A[col].map(x=>x.div(v));for(let i=0;i<n;i++)if(i!==col){const f=A[i][col];A[i]=A[i].map((x,j)=>x.sub(f.mul(A[col][j])));}}return{matrix:A.map(r=>r.slice(n)),det};};
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],pmask=pairs.map(([i,j])=>(1<<i)|(1<<j));
const wedge=(a,b)=>{if(a&b)return 0;let sign=1;for(let i=0;i<4;i++)if(a&(1<<i))for(let j=0;j<4;j++)if(b&(1<<j))if(i>j)sign=-sign;return sign;};
const eta=[1,-1,-1,-1,1,1,1]; // Cl(1+N,3), N=3, as selected in preceding G0 packet.
const cmul=(a,b,metric=eta)=>{let s=1;for(let i=0;i<metric.length;i++)if(a&(1<<i)){for(let j=0;j<metric.length;j++)if(b&(1<<j)){if(i>j)s=-s;if(i===j)s*=metric[i];}}return[a^b,s];};
const form=()=>new Map();const key=(g,e)=>String(g)+':'+String(e);
const put=(A,g,e,v)=>{const k=key(g,e),val=(A.get(k)||Q0).add(v);if(val.is0())A.delete(k);else A.set(k,val);};
const linear=(A,other,s=Q1)=>{const B=new Map(A);for(const[k,v] of other){const[g,e]=k.split(':').map(Number);put(B,g,e,v.mul(s));}return B;};
const scale=(A,s)=>{const B=new Map();for(const[k,v]of A){const z=v.mul(s);if(!z.is0())B.set(k,z);}return B;};
const product=(A,B,metric=eta)=>{const out=form();for(const[k,x]of A)for(const[l,y]of B){const[g,e]=k.split(':').map(Number),[h,f]=l.split(':').map(Number);const w=wedge(e,f);if(!w)continue;const[mask,sgn]=cmul(g,h,metric);put(out,mask,e|f,x.mul(y).mul(w*sgn));}return out;};
const coframes=[
[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
[[2,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
[[1,0,0,0],[0,-2,0,0],[0,0,1,0],[0,0,0,1]],
[[1,2,0,0],[0,1,0,0],[0,0,1,1],[0,0,0,1]],
[[1,0,0,0],[2,1,0,0],[0,0,1,0],[0,1,0,-1]],
[[1,0,1,0],[0,3,0,0],[0,0,-1,0],[0,0,0,2]]
];
const epFrames=[
[[1,0,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,1]],
[[1,0,0,1],[0,1,0,0],[2,0,1,0],[0,0,0,1]],
[[0,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,-1]],
[[2,0,0,0],[0,1,0,0],[0,0,-1,1],[0,0,0,1]],
[[1,0,0,0],[0,1,0,1],[0,0,1,0],[0,0,0,2]],
[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
];
const hodge=(e,{absoluteOrientation=false,flipSignature=false}={})=>{
 const ef=qarr(e),eInv=inv(ef),g=multiply(multiply(ef,qarr([[flipSignature?1:1,0,0,0],[0,flipSignature?1:-1,0,0],[0,0,flipSignature?1:-1,0],[0,0,0,flipSignature?1:-1]])),trans(ef));
 const gin=inv(g).matrix;
 let vol=absoluteOrientation?new Q(eInv.det.n<0n?-eInv.det.n:eInv.det.n,eInv.det.d):eInv.det;
 const M=pairs.map(([i,j])=>pairs.map(([k,l])=>gin[i][k].mul(gin[j][l]).sub(gin[i][l].mul(gin[j][k]))));
 const W=pmask.map(x=>pmask.map(y=>q(wedge(x,y))));
 const H=multiply(W,M).map(row=>row.map(v=>v.mul(vol)));
 return{H,metricPair:M,W,gin,det:eInv.det,vol};
};
const star=(A,H)=>{const out=form();for(const[k,v]of A){const[g,e]=k.split(':').map(Number),i=pmask.indexOf(e);if(i<0)throw Error('not twoform');for(let j=0;j<6;j++)if(!H[j][i].is0())put(out,g,pmask[j],v.mul(H[j][i]));}return out;};
const scalarTop=A=>A.get(key(0,15))||Q0;
const pairGeneric=(A,B,H,metric=eta)=>scalarTop(product(A,star(B,H),metric));
const coeffArray=A=>{const out=new Map();for(const[k,v]of A){const [g,e]=k.split(':').map(Number);const idx=pmask.indexOf(e);if(idx<0)throw Error('not 2form');if(!out.has(g))out.set(g,Array.from({length:6},()=>Q0));out.get(g)[idx]=out.get(g)[idx].add(v);}return out;};
const pairSector=(A,B,H,metric=eta)=>{const l=coeffArray(A),r=coeffArray(B);let sum=Q0;for(const[g,row]of l){const b=r.get(g);if(!b)continue;if((g.toString(2).match(/1/g)||[]).length!==2)throw Error('not Lie bivector');let [i,j]=[...Array(7).keys()].filter(i=>g&(1<<i));const gammaSq=q(-metric[i]*metric[j]);const xb=multiply(H,b.map(x=>[x])).map(row=>row[0]);const W = pmask.map(mask=>pmask.map(other=>q(wedge(mask,other))));const wx=multiply(W,xb.map(x=>[x])).map(v=>v[0]);for(let k=0;k<6;k++)sum=sum.add(row[k].mul(wx[k]).mul(gammaSq));}return sum;};
const eqForm=(A,B)=>{const keys=new Set([...A.keys(),...B.keys()]);return [...keys].every(k=>(A.get(k)||Q0).eq(B.get(k)||Q0));};
const buildCase=(i,opts={},seed=0)=>{
 const f=hodge(coframes[i],opts),eprime=opts.eprimeEqualsE?coframes[i]:epFrames[i];
 const phi=[q(1+i+seed),q(-2+i-seed),q(3-2*i+2*seed)],phi2=phi.reduce((s,v)=>s.add(v.mul(v)),Q0);
 const R=form(),Sig=form(),Tor=form(),Dphi=form(),Y=form();
 // Direct frame-Higgs Sigma=eprime wedge eprime, with nonredundant (mu<nu) sum.
 for(let mu=0;mu<4;mu++)for(let nu=mu+1;nu<4;nu++){
  for(let a=0;a<4;a++)for(let b=a+1;b<4;b++){
   const z=q(eprime[mu][a]*eprime[nu][b]-eprime[mu][b]*eprime[nu][a]).mul(2);
   put(Sig,(1<<a)|(1<<b),(1<<mu)|(1<<nu),z);
   put(R,(1<<a)|(1<<b),(1<<mu)|(1<<nu),q((1+((mu+3*a+5*b+7*nu+i+3*seed)%7))*((mu+b+i)%2?-1:1)));
  }
  for(let a=0;a<4;a++)put(Tor,(1<<a),(1<<mu)|(1<<nu),q(((a+2*mu+nu+i+seed)%7)-3));
  for(let m=4;m<7;m++)for(let n=m+1;n<7;n++)put(Y,(1<<m)|(1<<n),(1<<mu)|(1<<nu),q((m*nu+3*mu+n+i+2*seed)%9-4));
 }
 // Dphi as internal-vector-valued 1form, eprime as external-vector-valued 1form.
 for(let mu=0;mu<4;mu++)for(let n=4;n<7;n++)put(Dphi,1<<n,1<<mu,q(((mu*2+3*n+i+4*seed)%7)-3));
 const phiForm=form();for(let n=4;n<7;n++)put(phiForm,1<<n,0,phi[n-4]);
 const eForm=form();for(let mu=0;mu<4;mu++)for(let a=0;a<4;a++)put(eForm,1<<a,1<<mu,q(eprime[mu][a]));
 const M=linear(product(Tor,phiForm),product(eForm,Dphi),q(-1));
 // Note eprime phi has Lorentz/internal bivector and Tor phi has Lorentz/internal bivector.
 const F=linear(linear(linear(scale(R,q(opts.badRFactorLeft?2:1).div(2)),scale(Sig,phi2.mul(q(opts.wrongHiggsSignLeft?1:-1)).div(16))),scale(M,q(opts.badMixedFactorLeft?2:1).div(4))),scale(Y,q(opts.badGaugeLeft?0:1)));
 return {...f,R,Sig,M,Y,F,phi2,eprime,e:coframes[i]};
};
const round=(opts={})=>{
 const errs=[],ck=(v,s)=>{if(!v)errs.push(s)};let negative_controls=0,closure=0,sector=0,starChecks=0,gradChecks=0,crossChecks=0,zeroMixed=0,nonzeroTerm=0;
 for(let i=0;i<coframes.length;i++)for(let seed=0;seed<4;seed++){
  const d=buildCase(i,opts,seed),{H,R,Sig,M,Y,F,phi2}=d;
  // Star involution, metric bilinear identity; e vs e' independent.
  const hh=multiply(H,H),I=ident(6);
  ck(hh.every((row,r)=>row.every((x,c)=>x.eq(q(r===c?-1:0)))),'Lorentzian Hodge square frame '+i+':'+seed);starChecks+=36;
  // Independent source orientation oracle: physical coframe volume carries SIGNED det(e),
  // rather than |det(e)|. Eq26 equality alone is invariant under flipping * everywhere.
  const wh=multiply(d.W,H), expected=d.metricPair.map(row=>row.map(x=>x.mul(d.det)));
  ck(wh.every((row,r)=>row.every((x,c)=>x.eq(expected[r][c]))),'signed coframe volume reproduces 2form Hodge pairing '+i+':'+seed);
  const fields=[R,Sig,M,Y],sects=[0,0,1,2];
  for(let u=0;u<4;u++)for(let v=0;v<4;v++){
    const p=pairGeneric(fields[u],fields[v],H,opts.flipCliffordSignature?[1,1,1,1,1,1,1]:eta);
    const indep=pairSector(fields[u],fields[v],H);
    ck(p.eq(indep),'generic Clifford/exterior trace versus independent bilinear projector frame '+i+' fields '+u+v);sector++;
    if(sects[u]!==sects[v]){ck(p.is0(),'cross-subsector orthogonality '+i+'/'+u+'/'+v);crossChecks++;}
    if(u===v&&!p.is0())nonzeroTerm++;
  }
  const primal=pairGeneric(F,F,H,opts.flipCliffordSignature?[1,1,1,1,1,1,1]:eta);
  const coef={r:q(1).div(opts.badRNorm?2:4),s:q(1).div(opts.badSigmaNorm?128:256),m:q(1).div(opts.badMixNorm?8:16),y:q(opts.badYmNorm?2:1),cross:phi2.mul(q(opts.flipCrossSign?1:-1).div(opts.badCrossNorm?8:16)),phi4:phi2.mul(phi2)};
  let rhs=pairSector(R,R,H).mul(coef.r)
    .add(pairSector(R,Sig,H).mul(coef.cross))
    .add(pairSector(Sig,Sig,H).mul(coef.phi4).mul(coef.s))
    .add(pairSector(M,M,H).mul(coef.m))
    .add(pairSector(Y,Y,H).mul(coef.y));
  if(opts.forceEprimeEqualsE){const other=buildCase(i,{...opts,eprimeEqualsE:true},seed);rhs=pairSector(R,other.Sig,H).mul(coef.cross).add(pairSector(R,R,H).mul(coef.r))
    .add(pairSector(other.Sig,other.Sig,H).mul(coef.phi4).mul(coef.s))
    .add(pairSector(other.M,other.M,H).mul(coef.m)).add(pairSector(Y,Y,H).mul(coef.y));}
  if(!primal.eq(rhs))errs.push('Eq26 source action coefficients frame'+i+': direct='+String(primal)+', sector='+String(rhs));closure++;
  const single=pairSector(R,Sig,H),flip=pairSector(Sig,R,H);ck(single.eq(flip),'symmetry of Hodge-paired 2forms '+i);gradChecks++;
  if(!pairSector(M,M,H).is0())zeroMixed++;
 }
 return{pass:errs.length===0,issues:errs,frames:coframes.length,
  all_coframes_distinct_Hodge_and_connection:!opts.eprimeEqualsE,
  exact_Lorentzian_Hodge_star_involution_checks:starChecks,
  independent_bivector_trace_pair_tests:sector,independent_mixed_subsector_zero_witnesses:crossChecks,
  Eq26_unexpanded_vs_source_component_action_cases:closure,symmetric_R_Sigma_bilinear_checks:gradChecks,
  nonzero_Higgs_gradient_torsion_pair_cases:zeroMixed,nonzero_diagonal_action_term_count:nonzeroTerm,
  exact_rational_arithmetic:true,source_general_all_N_theorem:false,source_equation27_global_solution_qualified:false};
};
const mutants=[
['gravity quarter instead of source quarter',{badRNorm:true}],
['cross term wrong sign',{flipCrossSign:true}],
['cross term factor half',{badCrossNorm:true}],
['Higgs potential term factor double',{badSigmaNorm:true}],
['mixed frameHiggs kinetic norm wrong',{badMixNorm:true}],
['gauge curvature coefficient double',{badYmNorm:true}],
['force eprime=e only on RHS',{forceEprimeEqualsE:true}],
['replace Lorentzian Hodge metric by Euclidean',{flipSignature:true}],
['replace signed Hodge orientation with absolute',{absoluteOrientation:true}],
['Clifford temporal gamma square positive',{flipCliffordSignature:true}],
['source Fgrav factor doubled on LHS',{badRFactorLeft:true}],
['source sigma Higgs sign reversed on LHS',{wrongHiggsSignLeft:true}],
['source 4N curvature prefactor doubled on LHS',{badMixedFactorLeft:true}],
['source gauge curvature missing from LHS',{badGaugeLeft:true}]
];
export {round,mutants};
