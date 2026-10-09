// L-only G0 coefficient-complete restricted bosonic H1 curvature proof.
// Project reconstruction: the source's named mixed-output basis remains unresolved.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/', X='experiments/062/';
const sources={
 packet:R+'LISI_L01_H1_ALL_THREE_GRADED_CURVATURE_SECTORS_G0_0_1.json',
 graded:R+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json',
 ssc:R+'SOURCE_SEMANTIC_CENSUS_0_31.json',
 gate:X+'L_CURRENT_STAGE_GATE_0_31.json'
};
const mathOnly=process.argv.includes('--math-only'), errors=[];
const requireTrue=(ok,why)=>{if(!ok)errors.push(why)};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlobSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
if(!mathOnly){
 const p=load(sources.packet), g=load(sources.graded), s=load(sources.ssc), t=load(sources.gate);
 requireTrue(p.schema==='isograph.lisi-l01-graded-H1-three-curvature-sectors-G0.v0.1' && p.stage==='G0' && p.authority===false,'packet scope/authority');
 requireTrue(p.frozen_source.H1==='H1=(1/2)*omega+(1/4)*e*phi+(W+B1)' && p.frozen_source.FG==='F_G=(1/2)*(R-(1/8)*e wedge e*phi^2)' && p.frozen_source.Fgw==='F_gw=(d(e)+(1/2)*[omega,e])*phi-e*(d(phi)+[W+B1,phi])' && p.frozen_source.Few==='F_ew=(d(W)+W wedge W)+(d(B1)+B1 wedge B1)','H1/F_G/F_gw/F_ew source literals');
 requireTrue(g.source?.revision==='arXiv:0711.0770v1 2007-11-06' && g.actor_degrees?.some(a=>a.id==='phi' && a.form_degree===0) && g.actor_degrees?.some(a=>a.id==='e' && a.form_degree===1),'revision/form-degree fidelity');
 requireTrue(s.items?.length===191 && s.guards?.source_census_freeze_complete===false && t.current_lawful_state?.G1_authorized===false,'open SSC031 and G0-only gate');
 requireTrue(p.dependencies?.predecessor_ssc031?.git_blob_sha===gitBlobSha(sources.ssc) && p.dependencies?.predecessor_g0_gate031?.git_blob_sha===gitBlobSha(sources.gate) && t.current_source_census?.git_blob_sha===gitBlobSha(sources.ssc),'SSC/gate provenance SHA');
 requireTrue(p.limitations?.mixed_output_basis_source_normalization_qualified===false && p.limitations?.author_mathematical_error_proved===false && p.limitations?.G1_authorized===false,'no source-output-basis or stage promotion');
}
// Formal polynomial ring with commuting independent coefficient symbols and 256
// Clifford blades. Exact integer arithmetic; no seeded numerical samples.
const eta=[1,1,1,-1,1,1,1,1];
function bladeMultiply(a,b){
 let sign=1;
 for(let i=0;i<8;i++)if(a&(1<<i))for(let j=0;j<8;j++)if(b&(1<<j)){
  if(i>j)sign=-sign; if(i===j)sign*=eta[i];
 }
 return[a^b,sign];
}
const one=(mask,symbol='',scale=1)=>new Map([[mask+'|'+symbol,scale]]);
function add(...maps){const out=new Map;for(const m of maps)for(const[k,v]of m)out.set(k,(out.get(k)||0)+v);for(const[k,v]of out)if(!v)out.delete(k);return out;}
const scale=(m,f)=>new Map([...m].map(([k,v])=>[k,f*v]).filter(([k,v])=>v));
const sub=(a,b)=>add(a,scale(b,-1));
const symbols=(s,t)=>s&&t?[...s.split(';'),...t.split(';')].sort().join(';'):s||t;
function multiply(a,b){const out=new Map;for(const [ak,av]of a){const[am,as]=ak.split('|');for(const [bk,bv]of b){
 const[bm,bs]=bk.split('|'),[m,sgn]=bladeMultiply(+am,+bm),key=m+'|'+symbols(as,bs);
 out.set(key,(out.get(key)||0)+sgn*av*bv);
 }}for(const[k,v]of out)if(!v)out.delete(k);return out;}
const bracket=(a,b)=>sub(multiply(a,b),multiply(b,a));
const equal=(a,b)=>sub(a,b).size===0;
function project(m,part){return new Map([...m].filter(([key])=>{
 const mask=+key.split('|')[0],ga=mask&15,ew=(mask>>4)&15;
 const weight=n=>{let count=0;for(;n;n&=n-1)count++;return count};
 return part==='G'?weight(ga)===2 && ew===0:part==='EW'?weight(ew)===2 && ga===0:weight(ga)===1 && weight(ew)===1;
}));}
const gamma=Array.from({length:8},(_,i)=>one(1<<i)),G=[],EW=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
 G.push(multiply(gamma[i],gamma[j]));
 EW.push(multiply(gamma[i+4],gamma[j+4]));
}
function linear(basis,kind,i,j){return add(...basis.map((b,k)=>multiply(b,one(0,kind+i+(j??'')+'_'+k))))}
const Omega=i=>linear(G,'o',i),V=i=>linear(EW,'v',i),e=i=>linear(gamma.slice(0,4),'e',i);
const Phi=linear(gamma.slice(4),'phi',0);
const dOmega=(p,q)=>linear(G,'do',p,q),dV=(p,q)=>linear(EW,'dv',p,q),de=(p,q)=>linear(gamma.slice(0,4),'de',p,q),dPhi=p=>linear(gamma.slice(4),'dphi',p);
let antiCount=0;
for(let a=0;a<8;a++)for(let b=0;b<8;b++){
 const rhs=a===b?one(0,'',eta[a]*2):new Map;
 requireTrue(equal(add(multiply(gamma[a],gamma[b]),multiply(gamma[b],gamma[a])),rhs),'source Clifford anticommutator '+a+','+b);
 antiCount++;
}
const perTwoform=[];
for(let p=0;p<4;p++)for(let q=p+1;q<4;q++){
 const Op=Omega(p),Oq=Omega(q),Vp=V(p),Vq=V(q),ep=e(p),eq=e(q);
 const dO=sub(dOmega(p,q),dOmega(q,p)),dW=sub(dV(p,q),dV(q,p)),dE=sub(de(p,q),de(q,p));
 // 4H_i=2Ω_i+e_i Φ+4V_i; 16F=4d(4H)+[4H_p,4H_q].
 const H4=i=>add(scale(Omega(i),2),multiply(e(i),Phi),scale(V(i),4));
 const derivH4=(i,j)=>add(scale(dOmega(i,j),2),multiply(de(i,j),Phi),multiply(e(j),dPhi(i)),scale(dV(i,j),4));
 const full=add(scale(sub(derivH4(p,q),derivH4(q,p)),4),bracket(H4(p),H4(q)));
 // INDEPENDENT RHS using source-typed gravity, torsion, Higgs derivative.
 // 16F_G=8dΩ+4[Ωp,Ωq]-Φ²[ep,eq]
 const FG=add(scale(dO,8),scale(bracket(Op,Oq),4),scale(multiply(multiply(Phi,Phi),bracket(ep,eq)),-1));
 // 16F_EW=16(dV+[Vp,Vq])
 const FEW=scale(add(dW,bracket(Vp,Vq)),16);
 // 16P_M F=4(T Φ-e_p D_q Φ+e_q D_p Φ)
 const T4=add(scale(dE,4),scale(sub(bracket(Op,eq),bracket(Oq,ep)),2));
 const Dq=add(dPhi(q),bracket(Vq,Phi)),Dp=add(dPhi(p),bracket(Vp,Phi));
 const FM=sub(multiply(T4,Phi),scale(sub(multiply(ep,Dq),multiply(eq,Dp)),4));
 const gg=project(full,'G'),ww=project(full,'EW'),mm=project(full,'M');
 const residual=sub(full,add(gg,ww,mm));
 requireTrue(equal(gg,FG),'gravity all-monomial identity '+p+','+q);
 requireTrue(equal(ww,FEW),'EW all-monomial identity '+p+','+q);
 requireTrue(equal(mm,FM),'mixed all-monomial identity '+p+','+q);
 requireTrue(residual.size===0,'non-bivector polynomial residual '+p+','+q);
 perTwoform.push({indices:[p,q],raw_terms:full.size,gravity_terms:gg.size,ew_terms:ww.size,mixed_terms:mm.size,residual_terms:residual.size});
}
let mmCount=0,gmCount=0,emCount=0,geCount=0;
const M=[];
for(let a=0;a<4;a++)for(let b=0;b<4;b++)M.push(multiply(gamma[a],gamma[b+4]));
for(let a=0;a<16;a++)for(let b=a+1;b<16;b++){
 const c=bracket(M[a],M[b]);
 requireTrue(equal(c,add(project(c,'G'),project(c,'EW'))),'mixed/mixed closure '+a+','+b);mmCount++;
}
for(let a=0;a<6;a++)for(let b=0;b<16;b++){
 const c=bracket(G[a],M[b]),d=bracket(EW[a],M[b]);
 requireTrue(equal(c,project(c,'M')),'G/M closure '+a+','+b);
 requireTrue(equal(d,project(d,'M')),'EW/M closure '+a+','+b);
 gmCount++;emCount++;
}
for(let a=0;a<6;a++)for(let b=0;b<6;b++){
 requireTrue(bracket(G[a],EW[b]).size===0,'G/EW commutes '+a+','+b);geCount++;
}
const p=0,q=1,Op=Omega(p),Oq=Omega(q),Vp=V(p),Vq=V(q),ep=e(p),eq=e(q);
const dO=sub(dOmega(p,q),dOmega(q,p)),dW=sub(dV(p,q),dV(q,p)),dE=sub(de(p,q),de(q,p));
const Q=multiply(multiply(Phi,Phi),bracket(ep,eq)),S=bracket(Op,Oq),C=bracket(Vp,Vq);
const FG=add(scale(dO,8),scale(S,4),scale(Q,-1)),FEW=scale(add(dW,C),16);
const TOR=add(scale(dE,4),scale(sub(bracket(Op,eq),bracket(Oq,ep)),2));
const EX=sub(multiply(ep,add(dPhi(q),bracket(Vq,Phi))),multiply(eq,add(dPhi(p),bracket(Vp,Phi))));
const FM=sub(multiply(TOR,Phi),scale(EX,4));
const mutants=[
 ['wrong gravity quadratic sign',add(FG,scale(Q,2)),FG],
 ['omit gravity commutator',sub(FG,scale(S,4)),FG],
 ['wrong gravity derivative scale',add(FG,dO),FG],
 ['omit EW connection bracket',sub(FEW,scale(C,16)),FEW],
 ['omit EW exterior derivative',sub(FEW,scale(dW,16)),FEW],
 ['wrong mixed output factor',scale(FM,4),FM],
 ['reverse Higgs differential sign',add(FM,scale(sub(multiply(ep,dPhi(q)),multiply(eq,dPhi(p))),8)),FM],
 ['omit gravity torsion bracket',sub(FM,scale(multiply(sub(bracket(Op,eq),bracket(Oq,ep)),Phi),2)),FM],
 ['omit EW Higgs bracket',add(FM,scale(sub(multiply(ep,bracket(Vq,Phi)),multiply(eq,bracket(Vp,Phi))),4)),FM],
 ['wrong full Higgs covariant sign',add(FM,scale(EX,8)),FM]
];
let mutantsRejected=0;
for(const[name,corrupted,expected]of mutants){const detected=!equal(corrupted,expected);requireTrue(detected,'mutation escaped '+name);mutantsRejected+=+detected;}
requireTrue(equal(multiply(gamma[3],gamma[3]),one(0,'',-1)),'source negative Clifford square');
requireTrue([...multiply(Phi,Phi).keys()].every(key=>key.startsWith('0|')),'real Higgs quadratic scalar');
console.log(JSON.stringify({schema:'isograph.exp062-l039-universal-symbolic-H1.v0.1',pass:errors.length===0,issues:errors,math_only_source_checks_skipped:mathOnly,
 source:'L01 arXiv:0711.0770v1',stage:'G0',census:'SSC0.31 UNFROZEN',method:'exact independent-coefficient polynomials and Clifford blade multiplication, no random field samples',
 generator_anticommutators:antiCount,mixed_mixed_brackets:mmCount,gravity_mixed_brackets:gmCount,EW_mixed_brackets:emCount,gravity_EW_commuting_brackets:geCount,
 oriented_twoforms:perTwoform,mutations_defined:mutants.length,mutations_rejected:mutantsRejected,
 named_source_output_basis_qualified:false,source_census_frozen:false,external_cold_qualification:false,G1_authorized:false,cross_track_authorized:false},null,2));
if(errors.length)process.exitCode=1;
