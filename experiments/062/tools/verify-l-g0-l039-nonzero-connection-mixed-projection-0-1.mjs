// L-only original-source Cl(7,1) graded H1 project diagnostic; never G1 authority.
import './verify-l-g0-l039-independent-graded-jets-0-2.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';

const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={
 packet:L+'LISI_L01_H1_NONZERO_CONNECTION_GRADED_MIXED_PROJECTION_G0_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_31.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_31.json',
 prior:L+'LISI_L01_GRADED_H1_COMMON_BASIS_NORMALIZATION_G0_0_1.json',
 graded:L+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Packet=read(P.packet),Census=read(P.ssc),Gate=read(P.gate);
const clone=x=>JSON.parse(JSON.stringify(x));
const eta=[1,1,1,-1,1,1,1,1],bit=i=>1<<i;
function blade(a,b,signature=eta){
 let s=1;
 for(let i=0;i<8;i++)if(a&bit(i))for(let j=0;j<8;j++)if(b&bit(j)){
  if(i>j)s=-s;if(i===j)s*=signature[i];
 }
 return[a^b,s];
}
const B=Array.from({length:8},(_,i)=>new Map([[bit(i),1]]));
const add=(...xs)=>{const r=new Map;for(const x of xs)for(const [k,v]of x)r.set(k,(r.get(k)||0)+v);return new Map([...r].filter(([k,v])=>v!==0))};
const sc=(x,n)=>new Map([...x].map(([k,v])=>[k,v*n]).filter(([k,v])=>v!==0));
const mul=(a,b)=>{const r=new Map;for(const[i,x]of a)for(const[j,y]of b){const[k,s]=blade(i,j);r.set(k,(r.get(k)||0)+x*y*s)}return new Map([...r].filter(([k,v])=>v!==0))};
const sub=(a,b)=>add(a,sc(b,-1));
const comm=(a,b)=>sub(mul(a,b),mul(b,a));
const eq=(a,b)=>sub(a,b).size===0;
const combine=(bases,coeff)=>add(...bases.map((v,i)=>sc(v,coeff[i])));
const gram=Array.from({length:6}),ew=Array.from({length:6}),mix=Array.from({length:4},(_,i)=>Array.from({length:4},(_,a)=>mul(B[i],B[a+4])));
let k=0;for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
 gram[k]=mul(B[i],B[j]);ew[k]=mul(B[i+4],B[j+4]);k++;
}
const mixed=x=>new Map([...x].filter(([mask])=>{
 const lo=mask&15,hi=mask&240;
 return lo!==0&&(lo&(lo-1))===0&&hi!==0&&(hi&(hi-1))===0;
}));
function generatorChecks(){
 let g=0,e=0,mm=0,gv=0,fail=0;
 for(let k=0;k<6;k++)for(let i=0;i<4;i++)for(let a=0;a<4;a++){
  g++;if(!eq(comm(gram[k],mix[i][a]),mul(comm(gram[k],B[i]),B[a+4])))fail++;
  e++;if(!eq(comm(ew[k],mix[i][a]),mul(B[i],comm(ew[k],B[a+4]))))fail++;
 }
 for(let x=0;x<16;x++)for(let y=x+1;y<16;y++){
  mm++;if(mixed(comm(mix[Math.floor(x/4)][x%4],mix[Math.floor(y/4)][y%4])).size)fail++;
 }
 for(let i=0;i<6;i++)for(let j=0;j<6;j++){
  gv++;if(comm(gram[i],ew[j]).size)fail++;
 }
 return{g,e,mm,gv,fail};
}
function run(seed,opt={}){
 // At every x=0 the entire coframe is the identity; all derivatives can vary.
 const e=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?(opt.frameScale??1):0));
 const dE=Array.from({length:4},(_,p)=>Array.from({length:4},(_,j)=>Array.from({length:4},(_,u)=>((seed+3*p+7*j+11*u)%5)-2)));
 const phi=Array.from({length:4},(_,a)=>((seed+3*a)%5)-2);
 const dPhi=Array.from({length:4},(_,p)=>Array.from({length:4},(_,a)=>((seed+3*p+13*a)%5)-2));
 const Omega=Array.from({length:4},(_,p)=>combine(gram,gram.map((_,k)=>((seed+2*p+7*k)%5)-2)));
 const EW=Array.from({length:4},(_,p)=>combine(ew,ew.map((_,k)=>((seed+11*p+13*k)%5)-2)));
 const E=Array.from({length:4},(_,p)=>combine(B.slice(0,4),e[p])),Phi=combine(B.slice(4),phi);
 const H=Array.from({length:4},(_,p)=>add(sc(Omega[p],opt.spinFactor??.5),sc(mul(E[p],Phi),opt.mixedFactor??.25),sc(EW[p],opt.EWFactor??1)));
 const derivEphi=(p,j)=>add(mul(combine(B.slice(0,4),dE[p][j]),Phi),sc(mul(E[j],combine(B.slice(4),dPhi[p])),opt.derivSign??1));
 const derivPhi=p=>combine(B.slice(4),dPhi[p]);
 let mismatches=0,first=null,covered=0;
 const determinant=e.reduce((v,row,i)=>v*row[i],1);
 for(let p=0;p<4;p++)for(let q=p+1;q<4;q++){
  const raw=mixed(add(sc(sub(derivEphi(p,q),derivEphi(q,p)),opt.mixedFactor??.25),comm(H[p],H[q])));
  const T=add(sub(combine(B.slice(0,4),dE[p][q]),combine(B.slice(0,4),dE[q][p])),
    sc(sub(comm(Omega[p],E[q]),comm(Omega[q],E[p])),.5));
  const Dp=i=>add(derivPhi(i),comm(EW[i],Phi));
  const ewHiggsWedge=sub(mul(E[p],Dp(q)),mul(E[q],Dp(p)));
  const named=mixed(sub(mul(T,Phi),sc(ewHiggsWedge,opt.namedHiggsSign??1)));
  if(determinant!==1||!eq(sc(raw,4),named)){
   mismatches++;first??={seed,p,q,determinant,raw:[...sc(raw,4)],named:[...named]};
  }
  covered++;
 }
 return{mismatches,covered,first};
}
function replay(opt={}){
 let cases=0,failed=0,first=null;
 for(let seed=0;seed<12;seed++){const x=run(seed,opt);cases+=x.covered;failed+=x.mismatches;first??=x.first;}
 return{cases,failed,first};
}
function sourceGuards(p=Packet,c=Census,g=Gate){
 const e=[],ck=(v,k)=>{if(!v)e.push(k)};
 ck(p.schema==='isograph.lisi-l01-nonzero-connection-graded-mixed-projection-g0.v0.1'&&p.stage==='G0'&&p.track==='L'&&p.authority===false,'G0 L-only packet');
 ck(p.source?.id==='L01'&&p.source?.revision==='arXiv:0711.0770v1'&&JSON.stringify(p.source.printed_pages)===JSON.stringify([12,23,24]),'frozen L01 publication/pages');
 ck(p.source?.source_H1==='H1=(1/2)*omega+(1/4)*e*phi+(W+B1)'&&p.source?.source_Fgw==='F_gw=(d(e)+(1/2)*[omega,e])*phi-e*(d(phi)+[W+B1,phi])','source H1 Fgw source-normalized printed signs');
 ck(p.source?.source_higgs_form_degree===0&&p.source?.source_e_form_degree===1&&p.source?.source_omega_form_degree===1&&p.source?.source_W_B1_form_degree===1,'source graded 1form vs scalar');
 ck(p.parents?.predecessor_ssc031?.path===P.ssc&&p.parents?.predecessor_ssc031?.git_blob_sha===hash(P.ssc),'source census exact pin');
 ck(p.parents?.current_G0_gate031?.path===P.gate&&p.parents?.current_G0_gate031?.git_blob_sha===hash(P.gate),'G0 stage exact pin');
 ck(p.parents?.previous_common_basis_diagnostic?.path===P.prior&&p.parents?.previous_common_basis_diagnostic?.git_blob_sha===hash(P.prior),'predecessor experiment exact pin');
 ck(p.parents?.graded_source_Eq31_Eq35?.path===P.graded&&p.parents?.graded_source_Eq31_Eq35?.git_blob_sha===hash(P.graded),'original exact graded source pin');
 ck(p.project_derivation?.H1_coefficient==='H_i=(1/2)*Omega_i+(1/4)*e_i*Phi+V_i, with V_i=W_i+B1_i','distinct spin Higgs EW coefficients');
 ck(p.project_derivation?.predicted_conditional_equality==='4*P_M(dH1+H1 wedge H1)=(d(e)+(1/2)*[omega,e])*phi-e*(d(phi)+[W+B1,phi])','conditional four and graded sign preserved');
 ck(p.project_derivation?.projection_P_M?.includes('UNscaled M generators')&&p.project_derivation?.open_normalization?.includes('NOT proven'),'project output normalization not author authority');
 const q=p.finite_coverage||{};
 ck(q.gravity_mixed_generator_actions===96&&q.EW_mixed_generator_actions===96&&q.mixed_mixed_commutators===120&&q.pure_gravity_EW_commutations===36&&q.oriented_twoform_comparisons===72&&q.coframe_determinant===1,'generator and graded control population');
 for(const v of ['G0_source_census_frozen','L01_L06_source_complete','source_math_theorem_qualified','common_source_output_generator_basis_qualified','author_mathematical_error_proved','G1_authorized','G2_G7_authorized','cross_author_semantics_available','external_cold_review_passed'])ck(p.caveats?.[v]===false,'unqualified downstream claim '+v);
 ck(c.items?.length===191&&c.guards.source_census_freeze_complete===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false,'current conservation and G0 no-promotion');
 ck(!JSON.stringify(p).includes('W-SSC-'),'L source-only');
 return e;
}
const gen=generatorChecks(),base=replay(),issues=sourceGuards();
if(gen.g!==96||gen.e!==96||gen.mm!==120||gen.gv!==36||gen.fail!==0)issues.push('SOURCE CLIFFORD GENERATOR CLOSURE '+JSON.stringify(gen));
if(base.cases!==72||base.failed!==0)issues.push('NONZERO CONNECTION GRADED 2FORM '+JSON.stringify(base));
const mathMutants=[
 ['spin connection 1/2 erased',{spinFactor:1}],
 ['Higgs mixed connection 1/4 erased',{mixedFactor:1}],
 ['electroweak background erased',{EWFactor:0}],
 ['Higgs derivative sign reversed',{derivSign:-1}],
 ['printed named Higgs connection sign reversed',{namedHiggsSign:-1}],
 ['coframe degenerates',{frameScale:0}]
];
const sourceMutants=[
 ['claim mathematical theory',p=>{p.caveats.source_math_theorem_qualified=true}],
 ['declare N source authorized',p=>{p.caveats.common_source_output_generator_basis_qualified=true}],
 ['replace source Higgs coefficient',p=>{p.source.source_H1=p.source.source_H1.replace('(1/4)','1')}],
 ['move Higgs scalar into one-form role',p=>{p.source.source_higgs_form_degree=1}],
 ['change source census authority pin',p=>{p.parents.predecessor_ssc031.git_blob_sha='WRONG'}],
 ['smuggle W author semantics',p=>{p.status+=' W-SSC-001'}]
];
let rejected=0;
if(!issues.length){
 for(const [name,m]of mathMutants){
  if(replay(m).failed===0)issues.push('ESCAPED GRADED MATH MUTANT '+name);else rejected++;
 }
 for(const [name,fn]of sourceMutants){
  const p=clone(Packet);fn(p);
  if(sourceGuards(p).length===0)issues.push('ESCAPED SOURCE MUTANT '+name);else rejected++;
 }
}
if(process.exitCode)issues.push('predecessor graded-jet/source verifier failed');
console.log(JSON.stringify({schema:'isograph.exp062-l01-nonzero-H1-clifford-mixed-G0.v0.1',pass:issues.length===0,issues,
 original_gamma_Clifford_metric:eta,gravity_mixed_pairs:gen.g,EW_mixed_pairs:gen.e,mixed_mixed_pairs:gen.mm,gravity_EW_pairs:gen.gv,
 generator_failures:gen.fail,nonzero_background_seeds:12,graded_twoform_cases:base.cases,graded_twoform_failures:base.failed,
 adversarial_defined:mathMutants.length+sourceMutants.length,adversarial_rejected:rejected,
 only_conditional_source_M_output_comparison:true,common_source_output_normalization_authorized:false,G1_authorized:false,
 external_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
