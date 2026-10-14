// L02 v2 Eq28: selected Lorentzian off-shell quadratic sign and vacuum stationarity.
// Exact rational Clifford scalar and independent coordinate-Hodge metric oracles.
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){const x=a%b;a=b;b=x;}return a||1n;};
class Q {constructor(n,d=1n){n=BigInt(n);d=BigInt(d);if(!d)throw Error('division zero');if(d<0){n=-n;d=-d;}const z=gcd(n,d);this.n=n/z;this.d=d/z;} add(o){o=q(o);return new Q(this.n*o.d+o.n*this.d,this.d*o.d);} sub(o){return this.add(q(o).neg());}neg(){return new Q(-this.n,this.d);}mul(o){o=q(o);return new Q(this.n*o.n,this.d*o.d);}div(o){o=q(o);return new Q(this.n*o.d,this.d*o.n);}eq(o){o=q(o);return this.n===o.n&&this.d===o.d;}gt(o){o=q(o);return this.n*o.d>o.n*this.d;}is0(){return this.n===0n;}toString(){return this.d===1n?String(this.n):String(this.n)+'/'+String(this.d);}}
const q=x=>x instanceof Q?x:new Q(x),zero=q(0),one=q(1);
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>q(i===j)));
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s.add(x.mul(b[k][j])),zero)));
const transpose=a=>a[0].map((_,j)=>a.map(r=>r[j]));
function inverse(m){let n=m.length,a=m.map((r,i)=>[...r,...I(n)[i]]),det=one;for(let j=0;j<n;j++){let v=j;while(v<n&&a[v][j].is0())v++;if(v===n)throw Error('singular');if(v!==j){[a[j],a[v]]=[a[v],a[j]];det=det.neg();}const z=a[j][j];det=det.mul(z);a[j]=a[j].map(x=>x.div(z));for(let k=0;k<n;k++)if(k!==j){const c=a[k][j];a[k]=a[k].map((x,t)=>x.sub(c.mul(a[j][t])));}}return{matrix:a.map(r=>r.slice(n)),det};}
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
function wedge(a,b,{swapOrientation=false}={}){if(a&b)return 0;let s=1;for(let i=0;i<4;i++)if(a&(1<<i))for(let j=0;j<4;j++)if(b&(1<<j)&&i>j)s=-s;return swapOrientation?-s:s;}
const mask=pairs.map(([a,b])=>(1<<a)|(1<<b));
const frames=[
 [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[-1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[2,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[1,1,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]],
 [[1,0,0,1],[0,2,0,0],[0,0,-1,0],[0,0,0,1]]
];
const vector=(m,a,b)=>pairs.map(([u,v])=>q(m[a][u]*m[b][v]-m[a][v]*m[b][u]));
const dot=(a,b)=>a.reduce((s,x,i)=>s.add(x.mul(b[i])),zero);
const cmul=(a,b,eta)=>{let s=1;for(let i=0;i<eta.length;i++)if(a&(1<<i))for(let j=0;j<eta.length;j++)if(b&(1<<j)){if(i>j)s=-s;if(i===j)s*=eta[i];}return[a^b,s];};
function mathAudit(flags={}){
 const problems=[],ck=(v,s)=>{if(!v)problems.push(s)};
 const signature=flags.euclidean?[1,1,1,1,1,1,1]:[1,-1,-1,-1,1,1,flags.internalPhaseWrong?-1:1];
 ck(wedge(mask[0],mask[5],flags)===1&&wedge(mask[1],mask[4],flags)===-1,'source fixed coordinate orientation epsilon');
 const generator=flags.higgsChargedGenerator?((1<<4)|(1<<5)):((1<<5)|(1<<6));
 const higgs=(1<<4);
 const product=cmul(generator,generator,signature),a=cmul(generator,higgs,signature),b=cmul(higgs,generator,signature);
 const gammaSq=flags.forceWrongTrace?1:product[1];
 ck(product[0]===0&&product[1]===-1,'compact internal bivector Clifford square -1');
 ck(a[0]===b[0]&&a[1]===b[1],'commuting selected unbroken U1 with Higgs gamma4');
 ck(gammaSq===-1,'Clifford scalar trace negative in compact color direction');
 let cases=0,negative=0,positive=0,hodgeChecks=0,symmetric=0,potentialCases=0;
 for(let k=0;k<frames.length;k++){
  const frame=frames[k],E=frame.map(r=>r.map(q)),vol=inverse(E).det,Einv=inverse(E).matrix;
  const spacetime=signature.slice(0,4);const et=spacetime.map((z,i)=>spacetime.map((_,j)=>q(i===j?z:0)));
  const gi=mul(mul(Einv,et),transpose(Einv));
  const M=pairs.map(([u,v])=>pairs.map(([w,x])=>gi[u][w].mul(gi[v][x]).sub(gi[u][x].mul(gi[v][w]))));
  const W=mask.map(u=>mask.map(v=>q(wedge(u,v,flags))));
  const oriented=flags.absDet?new Q(vol.n<0n?-vol.n:vol.n,vol.d):vol;
  const H=mul(flags.reverseStarOrder?M:W,flags.reverseStarOrder?W:M).map(r=>r.map(z=>z.mul(oriented)));
  const HH=mul(H,H);
  for(let i=0;i<6;i++)for(let j=0;j<6;j++){
   ck(HH[i][j].eq(i===j?-1:0),'Lorentzian Hodge square -I frame '+k+' '+i+','+j);hodgeChecks++;
  }
  const electric=vector(frame,flags.swapElectric?2:0,flags.swapElectric?3:1),magnetic=vector(frame,flags.swapMagnetic?0:2,flags.swapMagnetic?1:3);
  const pairing=f=>dot(f,mul(W,mul(H,f.map(x=>[x]))).map(r=>r[0]));
  const pairE=pairing(electric).mul(gammaSq),pairB=pairing(magnetic).mul(gammaSq);
  const sourceE=vol.mul(-spacetime[0]*spacetime[1]);const sourceB=vol.mul(-spacetime[2]*spacetime[3]);
  ck(pairE.eq(sourceE),'independent electric Clifford/metric/Hodge oracle '+k);
  ck(pairB.eq(sourceB),'independent magnetic Clifford/metric/Hodge oracle '+k);
  ck(pairE.div(vol).eq(1)&&pairB.div(vol).eq(-1),'opposite local Lorentzian action density directions '+k);
  for(const lambda of [1,2,3,5]){
   const f=q(lambda*lambda),oneE=pairE.mul(f).div(vol),oneB=pairB.mul(f).div(vol);
   ck(oneE.eq(f)&&oneB.eq(f.neg()),'off-shell quadratic has opposite signs lambda '+lambda+' frame '+k);
   if(oneE.gt(0))positive++;if(oneB.n<0n)negative++;
   for(const g of [1,-1,2,-2]){
     const sE=oneE.mul(3).div(8*g),sB=oneB.mul(3).div(8*g);
     ck(sE.mul(sB).n<0n,'either sign coupling leaves indefinite Lorentzian variation');symmetric++;
   }
   cases++;
  }
 }
 for(const v2 of [1,2,3,5,11]){
  const v=q(v2),R0=v.div(flags.wrongVacuumCurvature?4:8),F0=R0.div(2).sub(v.div(16));
  ck(F0.is0(),'vacuum full g curvature F0 zero Eq28 v² '+v2);
  const scalarR=v.mul(flags.wrongScalarCurvature?4:3);
  const scalarPotential=x=>scalarR.mul(x).mul(q(-1).div(16)).add(x.mul(x).mul(q(flags.wrongQuartic?6:3).div(32)));
  const deriv=scalarPotential(v.add(1)).sub(scalarPotential(v.sub(1))).div(2);
  ck(deriv.is0(),'Eq28 scalar Higgs vacuum stationary at fixed scalar curvature '+v2);
  const second=scalarPotential(v.add(1)).add(scalarPotential(v.sub(1))).sub(scalarPotential(v).mul(2));
  ck(second.eq(q(3).div(16)),'positive scalar potential Hessian on selected background for g>0 '+v2);
  potentialCases++;
 }
 ck(positive===24&&negative===24&&cases===24,'24 electric/magnetic opposite sign witnesses');
 ck(!flags.declareSourceAuthorError,'positive and negative quadratic directions do not prove author typo');
 ck(!flags.declareUnrestrictedMin,'strict minimum is not qualified without domain of admissible variations');
 return {pass:problems.length===0,issues:problems,frames:frames.length,seed_magnitudes:4,
  local_negative_YangMills_quadratic_witnesses:negative,local_positive_witnesses:positive,
  exact_Hodge_square_checks:hodgeChecks,sign_indefinite_coupling_variants:symmetric,
  Eq28_exact_vacuum_and_scalar_potential_cases:potentialCases,compact_unbroken_abelian_commutes_Higgs:true,
  source_global_minimum_disproved:false,selected_Lorentzian_unrestricted_local_Hessian_positive_definite:false,
  source_author_typo_established:false};
}
const mutations=[
 ['euclidean_spacetime',{euclidean:true}],['internal_bivector_phase',{internalPhaseWrong:true}],
 ['Higgs_not_in_unbroken_commutant',{higgsChargedGenerator:true}],['flip_Clifford_scalar_trace',{forceWrongTrace:true}],
 ['absolute_orientation_in_star',{absDet:true}],['reverse_Hodge_matrix_order',{reverseStarOrder:true}],
 ['flip_wedge_orientation',{swapOrientation:true}],['electric_mislabeled_as_magnetic',{swapElectric:true}],
 ['magnetic_mislabeled_as_electric',{swapMagnetic:true}],['wrong_vacuum_R_fraction',{wrongVacuumCurvature:true}],
 ['wrong_source_scalar_R0',{wrongScalarCurvature:true}],['wrong_source_quartic_potential',{wrongQuartic:true}],
 ['invent_author_typo',{declareSourceAuthorError:true}],['declare_unrestricted_minimum',{declareUnrestrictedMin:true}]
];
export{mathAudit,mutations};
if(process.argv.includes('--selftest')){
 const baseline=mathAudit(),mutants=mutations.map(([name,args])=>({name,...mathAudit(args)}));
 console.log(JSON.stringify({baseline,mutants:mutants.map(x=>({name:x.name,pass:x.pass,issues:x.issues.slice(0,3)}))},null,2));
 if(!baseline.pass||mutants.some(x=>x.pass))process.exitCode=1;
}
