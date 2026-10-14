// L02 source-faithful local G0 v2: exact Cl(4,3) tensor exterior-jet Eq12–14.
// Project finite N=3, not original full source dynamics, e'=e restriction, or theory proof.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P=R+'LISI_L02_FRAME_HIGGS_GRADED_CURVATURE_G0_0_1.json';
const O=R+'SOURCE_SEMANTIC_CENSUS_0_44.json',N=R+'SOURCE_SEMANTIC_CENSUS_0_45.json';
const G0=E+'L_CURRENT_STAGE_GATE_0_48.json',G1=E+'L_CURRENT_STAGE_GATE_0_49.json';
const HODGE=R+'LISI_L02_PLEBANSKI_LORENTZIAN_HODGE_AUXILIARY_G0_0_1.json';
const SELF=E+'tools/verify-l-g0-l02-frame-higgs-graded-curvature-0-1.mjs';
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex');};
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){[a,b]=[b,a%b]}return a||1n;};
const Q=(num,den=1)=>{let a=BigInt(num),b=BigInt(den);if(!b)throw Error('zero denominator');if(b<0n){a=-a;b=-b;}const d=gcd(a,b);return[a/d,b/d]};
const qa=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),qm=(a,b)=>Q(a[0]*b[0],a[1]*b[1]),qn=a=>[-a[0],a[1]],qe=(a,b)=>a[0]===b[0]&&a[1]===b[1],qb=()=>Q(0);
const coframes=[
 [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[2,1,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[0,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]],
 [[1,0,1,0],[0,2,0,0],[0,0,2,1],[0,0,0,1]],
 [[1,1,0,0],[0,1,1,0],[1,0,1,0],[0,0,0,1]]
];
const spinEta=[1,-1,-1,-1,1,1,1]; // Cl(4,3) source spin(1+N,3), N=3.
const popcnt=x=>{let n=0;while(x){n+=x&1;x>>=1}return n;};
function exteriorProduct(f,g){
 if(f&g)return null;
 let s=1;for(let i=0;i<4;i++)if(f&(1<<i))for(let j=0;j<4;j++)if((g&(1<<j))&&i>j)s=-s;
 return{f:f|g,sign:s};
}
function cliffordProduct(x,y){
 let sign=1;
 for(let i=0;i<7;i++)if(x&(1<<i))for(let j=0;j<7;j++)if(y&(1<<j)&&i>j)sign=-sign;
 for(let i=0;i<7;i++)if((x&y)&(1<<i))sign*=spinEta[i];
 return{mask:x^y,sign};
}
const key=(form,cliff)=>form*128+cliff;
function put(M,f,c,coeff){
 const k=key(f,c),cur=M.get(k)||qb(),n=qa(cur,coeff);
 if(!n[0])M.delete(k);else M.set(k,n);
}
const singleton=(f,c,coef=Q(1))=>{const M=new Map();put(M,f,c,coef);return M;};
const zero=()=>new Map();
const plus=(...arrays)=>{const out=zero();for(const M of arrays)for(const [k,v]of M)put(out,Math.floor(k/128),k%128,v);return out;};
const scale=(M,a)=>{const out=zero();for(const [k,v]of M)put(out,Math.floor(k/128),k%128,qm(v,a));return out;};
const subtract=(A,B)=>plus(A,scale(B,Q(-1)));
const multiply=(A,B)=>{
 const out=zero();
 for(const [k,a]of A)for(const [j,b]of B){
  const f=exteriorProduct(Math.floor(k/128),Math.floor(j/128));
  if(!f)continue;
  const c=cliffordProduct(k%128,j%128);
  put(out,f.f,c.mask,qm(qm(a,b),Q(f.sign*c.sign)));
 }
 return out;
};
const same=(A,B)=>A.size===B.size&&[...A].every(([k,v])=>B.has(k)&&qe(v,B.get(k)));
const nonzero=A=>[...A].some(([,v])=>v[0]!==0n);
const component=(A,pred)=>new Map([...A].filter(([k])=>pred(k%128)));
const exteriorGrades=(A,degree)=>[...A].every(([k])=>popcnt(Math.floor(k/128))===degree);
const phiScore=(s,i)=>(s+2)*(i+1)-(i===2?3:0);
const coefficient=(s,tag,...args)=>{
 let t=s*11+tag*7;for(let i=0;i<args.length;i++)t+=args[i]*(i*3+5);
 return (t%7)-3;
};
function data(seed,opts={}){
 const mat=coframes[seed];
 const phiM=Array.from({length:3},(_,i)=>phiScore(seed,i));
 const e=zero(),phi=zero(),omega=zero(),A=zero(),de=zero(),dphi=zero(),domega=zero(),dA=zero(),dE=zero();
 const ePrime=mat;
 const qval=x=>Q(x);
 const firstDerivative=(tag,...args)=>coefficient(seed,tag,...args);
 for(let mu=0;mu<4;mu++){
  for(let a=0;a<4;a++)put(e,1<<mu,1<<a,qval(ePrime[a][mu]));
  for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)put(omega,1<<mu,(1<<a)|(1<<b),qval(coefficient(seed,1,mu,a,b)));
  for(let m=4;m<7;m++)for(let n=m+1;n<7;n++)put(A,1<<mu,(1<<m)|(1<<n),qval(coefficient(seed,2,mu,m,n)));
 }
 for(let m=4;m<7;m++)put(phi,0,1<<m,qval(phiM[m-4]));
 // Coefficients of dH are computed as independent local first jets, not d(e'phi) identity.
 for(let nu=0;nu<4;nu++){
  for(let m=4;m<7;m++)put(dphi,1<<nu,1<<m,qval(firstDerivative(3,nu,m)));
  for(let mu=0;mu<4;mu++){
   const f=exteriorProduct(1<<nu,1<<mu);
   if(!f)continue;const sf=Q(f.sign);
   for(let a=0;a<4;a++){
    const deVal=firstDerivative(4,nu,mu,a);
    put(de,f.f,1<<a,qm(sf,qval(deVal)));
    for(let m=4;m<7;m++){
     const dPhi=firstDerivative(3,nu,m);
     const jet=(opts.omitEprimeDerivative?0:deVal)*phiM[m-4]+(opts.omitPhiDerivative?0:ePrime[a][mu]*dPhi);
     put(dE,f.f,(1<<a)|(1<<m),qm(sf,qval(jet)));
    }
   }
   for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)
    put(domega,f.f,(1<<a)|(1<<b),qm(sf,qval(firstDerivative(5,nu,mu,a,b))));
   for(let m=4;m<7;m++)for(let n=m+1;n<7;n++)
    put(dA,f.f,(1<<m)|(1<<n),qm(sf,qval(firstDerivative(6,nu,mu,m,n))));
  }
 }
 const E=multiply(e,phi);
 const phi2=phiM.map(n=>n*n).reduce((a,b)=>a+b,0);
 return{seed,e,phi,omega,A,de,dphi,domega,dA,dE,E,phi2:qval(phi2),coframe:ePrime};
}
function mathAudit(opts={}){
 const errors=[],test=(x,msg)=>{if(!x)errors.push(msg)};
 let passedCases=0,projectedChecks=0,gradedLeibnizChecks=0,quadraticCliffordChecks=0,nonzeroGravity=0,nonzeroMixed=0,nonzeroGauge=0,independentHodgeFrameWitnesses=0;
 const gmask=mask=>popcnt(mask)===2&&mask<16;
 const mmask=mask=>popcnt(mask)===2&&popcnt(mask&15)===1&&popcnt(mask&112)===1;
 const Amask=mask=>popcnt(mask)===2&&(mask&15)===0;
 for(let seed=0;seed<coframes.length;seed++){
  const f=data(seed,opts),oneHalf=Q(1,2),oneQuarter=Q(1,4),oneE=Q(opts.H_E_num??1,opts.H_E_den??4);
  const H=plus(scale(f.omega,oneHalf),scale(f.E,oneE),opts.dropGaugeInH?zero():f.A);
  const dH=plus(scale(f.domega,oneHalf),scale(f.dE,oneE),f.dA);
  const fullF=plus(dH,multiply(H,H));
  const omega2fac=Q(opts.Romega2Num??1,opts.Romega2Den??2);
  const Rcurv=plus(f.domega,scale(multiply(f.omega,f.omega),omega2fac));
  const Sigma=multiply(f.e,f.e);
  const SigmaCoeff=Q(opts.sigmaNum??1,opts.sigmaDen??8);
  const sigmaQuad=scale(Sigma,qm(f.phi2,Q(opts.sigmaSign??-1)));
  const grav=scale(plus(Rcurv,scale(sigmaQuad,SigmaCoeff)),Q(opts.leadingGravNum??1,opts.leadingGravDen??2));
  const T=plus(f.de,scale(plus(multiply(f.omega,f.e),multiply(f.e,f.omega)),Q(opts.torsionNum??1,opts.torsionDen??2)));
  const AgaugeComm=subtract(multiply(f.A,f.phi),multiply(f.phi,f.A));
  const Dphi=plus(f.dphi,scale(AgaugeComm,Q(opts.dphiGaugeSign??1)));
  const mixed=scale(plus(multiply(T,f.phi),scale(multiply(f.e,Dphi),Q(opts.eDphiSign??-1))),Q(opts.mixedNum??1,opts.mixedDen??4));
  const gauge=plus(f.dA,opts.omitGaugeA2?zero():multiply(f.A,f.A));
  const sourceRHS=plus(grav,mixed,gauge);
  test(same(fullF,sourceRHS),'original source Eq14 full Clifford/exterior with direct jet dH seed '+seed);passedCases++;
  const projectedGroups=[[gmask,grav,'grav'],[mmask,mixed,'mixed'],[Amask,gauge,'gauge']];
  for(const [pred,target,label] of projectedGroups){
   const proj=component(fullF,pred);
   test(same(proj,target),'independent Clifford bivector sector '+label+' seed '+seed);
   if(label==='grav'&&nonzero(proj))nonzeroGravity++;
   if(label==='mixed'&&nonzero(proj))nonzeroMixed++;
   if(label==='gauge'&&nonzero(proj))nonzeroGauge++;
   projectedChecks++;
  }
  const leibniz=subtract(multiply(f.de,f.phi),multiply(f.e,f.dphi));
  test(same(f.dE,leibniz),'independent jets vs graded Leibniz d(eprime phi) seed '+seed);gradedLeibnizChecks++;
  const ee=multiply(f.E,f.E),expectedEE=scale(Sigma,qn(f.phi2));
  test(same(ee,expectedEE),'independent Clifford E wedge E=-Sigma phi^2 seed '+seed);quadraticCliffordChecks++;
  test(exteriorGrades(fullF,2),'curvature pure spacetime 2-form seed '+seed);
  test([...fullF.keys()].every(k=>popcnt(k%128)===2),'curvature stays spin Clifford bivector sector '+seed);
  test(nonzero(fullF)&&nonzero(grav)&&nonzero(mixed)&&nonzero(gauge),'nonvacuous all three source sectors '+seed);
  if(seed!==0&&JSON.stringify(f.coframe)!==JSON.stringify(coframes[0]))independentHodgeFrameWitnesses++;
 }
 test(passedCases===5&&projectedChecks===15&&gradedLeibnizChecks===5&&quadraticCliffordChecks===5,'nonvacuous exact source sector basis coverage');
 test(nonzeroGravity===5&&nonzeroMixed===5&&nonzeroGauge===5&&independentHodgeFrameWitnesses===4,'nonzero source components and eprime distinct from independent Hodge frame');
 const x=singleton(0,1),y=singleton(0,16);
 test(same(multiply(x,y),scale(multiply(y,x),Q(-1))),'pure Clifford vector gamma0 and gamma4 anticommute as degree-zero forms');
 const u=singleton(1,1),v=singleton(2,16);
 test(same(multiply(u,v),multiply(v,u)),'two degree-one vector-valued forms commute when Clifford and exterior signs cancel');
 return{pass:errors.length===0,issues:errors,source_dimension_selection:"Cl(4,3), finite N=3 only",
   pointwise_first_jet_cases:passedCases,independent_sector_projection_checks:projectedChecks,
   exact_independent_graded_Leibniz_cases:gradedLeibnizChecks,exact_E_squared_source_phi2_cases:quadraticCliffordChecks,
   nonzero_grav:nonzeroGravity,nonzero_mixed:nonzeroMixed,nonzero_gauge:nonzeroGauge,
   source_eprime_different_from_Hodge_e_witnesses:independentHodgeFrameWitnesses,
   Clifford_bivector_grade_preserved:true,source_full_dynamics_qualified:false,
   source_e_equals_eprime_dynamically_derived:false,source_general_spinN_qualified:false};
}
function sourceCheck(p,old,now,gate){
 const errors=[],check=(x,why)=>{if(!x)errors.push(why)};
 check(p.schema==='isograph.lisi-L02-v2-frame-Higgs-graded-curvature-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'identity strictly L G0');
 check(p.original_source?.revision==='arXiv:1004.4866v2'&&p.original_source.id==='L02'&&p.original_source.pdf_pages_zero_based?.join('|')==='4|5|6','frozen L02 exact source and pages');
 const l=[['predecessor_source_census',O],['predecessor_gate',G0],['selected_phi_hodge_packet',HODGE]];
 for(const [name,path]of l)check(p.parent?.[name]?.path===path&&p.parent[name].git_blob_sha===blob(path),'immutable parent '+name);
 const dict={
 EQ12:'H=(1/2)omega+(1/4)E+A',
 EQ13:"E=e_prime phi; e_prime is connection's frame, phi internal Higgs vector",
 EQ14:'F=(1/2)(R-(1/8)Sigma_prime phi2)+(1/4)(T phi-e_prime Dphi)+F_A',
 EQ14_DEFS:'R=domega+(1/2)omega omega; Sigma_prime=e_prime e_prime; phi2=sum_m phi_m^2; T=de_prime+(1/2)[omega,e_prime]; Dphi=dphi+[A,phi]; F_A=dA+A A',
 EQ15_17:'Source writes independent grav, mixed and YM equations; full solutions not proved by algebraic Eq14 decomposition',
 EQ18:'e_prime=e is an additional restricted-solution ansatz, not a consequence of Eq12/Eq14 alone',
 EQ19:'T=0 is an additional torsion-free restriction after ignoring fermionic matter sources'
 };
 check(p.source_equations?.length===7&&new Set(p.source_equations.map(x=>x.id)).size===7,'all source v2 equation roles');
 for(const [id,txt]of Object.entries(dict))check(p.source_equations.find(x=>x.id===id)?.text===txt,'exact source role '+id);
 check(p.source_equations.find(x=>x.id==='EQ14')?.pdf_page===5&&p.source_equations.find(x=>x.id==='EQ18')?.pdf_page===5,'actual PDF page');
 const m=p.project_exact_reconstruction;
 check(m?.model?.includes('N=3 only')&&m?.metric_signature?.includes('eta=(+,-,-,-,+,+,+)')&&m?.metric_signature?.includes('gamma_0^2=+1'),'Cl(4,3) source-chosen signature and N3 limit');
 check(m?.independent_jet_method?.includes('not by invoking target graded Leibniz')&&m?.source_mixed_graded_derivative?.includes('because e_prime is degree-one'),'non-tautological independent E jets');
 check(m?.source_quadratic_offblock_sign?.includes('=-Sigma_prime phi2')&&m?.source_grav_norm?.includes('Fgrav=R/2 -Sigma_prime phi2/16'),'quartic source coefficient/Clifford sign');
 check(m?.source_frame_boundary?.includes('Eq18 chooses e_prime=e only')&&m?.unqualified?.length===4,'source e and e_prime not assumed equal');
 check(m?.projection?.includes('6+12+3=21')&&m?.source_gauge_norm?.includes('F_A=dA+A wedge A'),'exact source bivector grading projection');
 check(p.exact_verifier_contract?.nondegenerate_connection_eprime_coframes===5&&p.exact_verifier_contract?.source_compatible_Clifford_generators===7&&p.exact_verifier_contract?.spacetime_basis_1forms===4,'finite scoped coverage');
 const changedIds=['L-SSC-056','L-SSC-057','L-SSC-058','L-SSC-059'];
 check(p.source_census_delta?.changed_only?.join('|')===changedIds.join('|')&&p.source_census_delta.other_complete_records===187&&p.source_census_delta.total_ids===191&&p.source_census_delta.frozen===false,'only four complete source records changed');
 for(const k of ['G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_semantics_authorized','full_L02_dynamics_qualified','source_all_spin_groups_qualified','source_frame_e_eprime_equality_derived','source_gravitational_solution_qualified','second_third_generation_actions_qualified','external_independent_theory_review_passed','author_error_proved','outreach_authorized','PR70_merge_authorized'])check(p.stage_locks?.[k]===false,'no source qualification promotion '+k);
 check(p.stage_locks.G0_open===true,'G0 open');
 const A=new Map(old.items.map(x=>[x.id,x])),B=new Map(now.items.map(x=>[x.id,x])),diff=[];
 check(A.size===191&&B.size===191&&old.items.length===191&&now.items.length===191,'191 distinct source identities');
 for(const [id,rec]of A){if(!B.has(id))errors.push('missing prior item '+id);else if(JSON.stringify(rec)!==JSON.stringify(B.get(id)))diff.push(id);}
 for(const id of B.keys())if(!A.has(id))errors.push('new item '+id);
 check(diff.join('|')===changedIds.join('|'),'only L02 four source records extended, 187 exact retained '+diff);
 for(const id of changedIds){
  const a=A.get(id),b=B.get(id),link=b?.source_expression_census?.L02_FRAME_HIGGS_GRADED_CURVATURE_G0;
  check(b?.body?.startsWith(a?.body||'MISSING')&&b.body.length>a.body.length+120,'all original source record content preserved '+id);
  check(link?.packet?.path===P&&link?.packet?.git_blob_sha===blob(P)&&link?.source_original_v2===true,'new source packet exact binding '+id);
  check(link?.full_E8_L01_fermion_map_qualified===false&&link?.all_L02_spinN_source_qualified===false&&link?.G1_authorized===false,'scope locks '+id);
 }
 check(now.revision?.predecessor_git_blob_sha===blob(O)&&now.revision.source_packet?.git_blob_sha===blob(P)&&now.revision.source_verifier?.git_blob_sha===blob(SELF)&&now.revision.changed_source_items.join('|')===changedIds.join('|'),'source census complete lineage');
 check(now.guards?.source_census_freeze_complete===false&&now.guards?.dp_allowed===false&&now.guards?.L02_SOURCE_SPINN_EPRIME_DYNAMICS_FULLY_QUALIFIED===false,'source guards remain open');
 check(gate.stage==='G0'&&gate.track==='L'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===blob(G0),'G0 gate lineage exact');
 check(gate.current_source_census?.git_blob_sha===blob(N)&&gate.current_source_census.source_identities===191&&gate.current_source_packet?.git_blob_sha===blob(P)&&gate.source_verifier?.git_blob_sha===blob(SELF),'source gate complete exact bindings');
 check(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false&&gate.current_lawful_state?.L02_full_graded_curvature_source_dynamics_qualified===false,'G0-only');
 check(!JSON.stringify(p).includes('W-SSC-'),'no W import');
 return errors;
}
const p=load(P),math=mathAudit(),issues=math.issues.map(x=>'MATH '+x);
const mathMutants=[
 ['wrong H_E factor 1/2',{H_E_num:1,H_E_den:2}],
 ['wrong source grav Sigma sign',{sigmaSign:1}],
 ['wrong source grav Sigma factor 1/4',{sigmaNum:1,sigmaDen:4}],
 ['wrong torsion commutator factor 1',{torsionNum:1,torsionDen:1}],
 ['wrong covariant eDphi plus',{eDphiSign:1}],
 ['reverse source internal commutator',{dphiGaugeSign:-1}],
 ['missing source A wedge A',{omitGaugeA2:true}],
 ['wrong spin gravitational R coefficient',{Romega2Num:1,Romega2Den:1}],
 ['missing differentiated phi in independent left jet',{omitPhiDerivative:true}],
 ['missing differentiated eprime in independent left jet',{omitEprimeDerivative:true}],
 ['missing A sector in full source H',{dropGaugeInH:true}],
 ['wrong mixed quarter',{mixedNum:1,mixedDen:2}],
 ['wrong leading gravitational half',{leadingGravNum:1,leadingGravDen:1}]
];
let mathMutantsRejected=0,sourceMutantsRejected=0;
for(const [name,options]of mathMutants){let q=mathAudit(options);if(!q.pass)mathMutantsRejected++;else issues.push('ESCAPED_MATH_MUTANT '+name);}
if(!process.argv.includes('--math-only')){
 const o=load(O),n=load(N),g=load(G1);issues.push(...sourceCheck(p,o,n,g).map(x=>'SOURCE '+x));
 const mutants=[
 ['fake pre-freeze v1',x=>{x.original_source.revision='arXiv:1004.4866v1'}],
 ['flip E normalization',x=>{x.source_equations.find(y=>y.id==='EQ12').text='H=(1/2)omega+(1/2)E+A'}],
 ['fake decomposed phi first',x=>{x.source_equations.find(y=>y.id==='EQ13').text="E=e phi"}],
 ['grav Higgs Sigma plus',x=>{x.source_equations.find(y=>y.id==='EQ14').text=x.source_equations.find(y=>y.id==='EQ14').text.replace('R-(1/8)','R+(1/8)')}],
 ['mixed sign plus',x=>{x.source_equations.find(y=>y.id==='EQ14').text=x.source_equations.find(y=>y.id==='EQ14').text.replace('T phi-e_prime Dphi','T phi+e_prime Dphi')}],
 ['wrong Clifford metric',x=>{x.project_exact_reconstruction.metric_signature='euclidean Cl(7,0)'}],
 ['assume dynamic frame eprime equals e',x=>{x.source_equations.find(y=>y.id==='EQ18').text='e_prime=e is a theorem of Eq12'}],
 ['torsion forced with matter',x=>{x.source_equations.find(y=>y.id==='EQ19').text='T=0 even with fermionic matter sources'}],
 ['wrong mixed jet derivative sign',x=>{x.project_exact_reconstruction.source_mixed_graded_derivative='d(ephi)=de phi+e dphi'}],
 ['wrong eprime Sigma factor',x=>{x.project_exact_reconstruction.source_quadratic_offblock_sign='EE=+Sigma phi2'}],
 ['erase source differential dependence',x=>{x.project_exact_reconstruction.independent_jet_method='Direct source formula seeded as expected'}],
 ['falsely qualify all Spin(N)',x=>{x.stage_locks.source_all_spin_groups_qualified=true}],
 ['promote G1',x=>{x.stage_locks.G1_authorized=true}],
 ['declare author typo',x=>{x.stage_locks.author_error_proved=true}],
 ['stale source predecessor',x=>{x.parent.predecessor_gate.git_blob_sha='stale'}],
 ['omit changed source ID',x=>{x.source_census_delta.changed_only.pop()}]
 ];
 if(!issues.length)for(const [name,fn]of mutants){const q=structuredClone(p);fn(q);if(sourceCheck(q,o,n,g).length>0)sourceMutantsRejected++;else issues.push('ESCAPED_SOURCE_MUTANT '+name);}
}
const result={schema:'isograph.exp062-L02-frame-Higgs-graded-curvature-G0.v0.1',pass:issues.length===0,issues,math,
 math_mutants_defined:13,math_mutants_rejected:mathMutantsRejected,
 source_mutants_defined:process.argv.includes('--math-only')?0:16,source_mutants_rejected:sourceMutantsRejected,
 source_identities:191,changed_source_items:['L-SSC-056','L-SSC-057','L-SSC-058','L-SSC-059'],other_complete_predecessor_records_preserved:187,
 complete_original_L02_source_qualified:false,source_eprime_e_dynamically_proved:false,
 G0_unfrozen:true,G1_authorized:false,cross_author_synthesis_authorized:false,external_independent_cold_mathematical_review_passed:false};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
