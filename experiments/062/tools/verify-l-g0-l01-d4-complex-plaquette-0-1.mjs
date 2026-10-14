import fs from 'node:fs';
import crypto from 'node:crypto';
// L-only G0 mathematical kernel for arbitrary complex root phases.
// Project compact D4, chosen Phi/x conjugacy; not source-author E8 authority.
const mIssues=[],ok=(v,s)=>{if(!v)mIssues.push(s)};
const polyVar=name=>new Map([[name,1]]);
const addP=(A,B)=>{const C=new Map(A);for(const[k,v]of B)C.set(k,(C.get(k)||0)+v);for(const[k,v]of C)if(v===0)C.delete(k);return C;};
const negP=A=>new Map([...A].map(([k,v])=>[k,-v]));
const mulP=(A,B)=>{const C=new Map();for(const[k,v]of A)for(const[s,t]of B){const p=[...k.split("*"),...s.split("*")].sort().join("*");C.set(p,(C.get(p)||0)+v*t);}for(const[k,v]of C)if(v===0)C.delete(k);return C;};
const cpmul=(x,y)=>[addP(mulP(x[0],y[0]),negP(mulP(x[1],y[1]))),addP(mulP(x[0],y[1]),mulP(x[1],y[0]))];
const cpadd=(x,y)=>[addP(x[0],y[0]),addP(x[1],y[1])];
const cpconj=x=>[x[0],negP(x[1])];
const cpneg=x=>[negP(x[0]),negP(x[1])];
const eqPoly=(A,B)=>A.size===B.size&&[...A].every(([k,v])=>B.get(k)===v);
let colorCertificates=0,realTerms=0,imaginaryResiduals=0;
for(let i=1;i<=3;i++){
 const u=polyVar("u"+i),v=polyVar("v"+i),r=polyVar("r"+i),s=polyVar("s"+i);
 const a=[u,v],b=[r,s];
 const kappaTimesD=cpadd(cpmul(a,cpconj(a)),cpneg(cpmul(b,cpneg(cpconj(b)))));
 const desired=addP(addP(mulP(u,u),mulP(v,v)),addP(mulP(r,r),mulP(s,s)));
 ok(eqPoly(kappaTimesD[0],desired),'all-complex phase positivity identity '+i);
 ok(kappaTimesD[1].size===0,'complex plaquette imaginary cancellation '+i);
 ok(kappaTimesD[0].size===4&&[...kappaTimesD[0].values()].every(n=>n===1),'four independent squares '+i);
 colorCertificates++;realTerms+=kappaTimesD[0].size;imaginaryResiduals+=kappaTimesD[1].size;
}
const C=(r=0,i=0)=>[r,i],cadd=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const cneg=a=>[-a[0],-a[1]],csub=(a,b)=>cadd(a,cneg(b)),cconj=a=>[a[0],-a[1]];
const cmul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const ceq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const abs2=a=>a[0]*a[0]+a[1]*a[1];
const Z=()=>Array.from({length:64},()=>C());
const Ei=(i,j)=>{const M=Z();M[i*8+j]=C(1);return M;};
const mAdd=(A,B)=>A.map((x,i)=>cadd(x,B[i])),mSub=(A,B)=>A.map((x,i)=>csub(x,B[i]));
const mScale=(A,s)=>A.map(x=>cmul(x,s));
const mEq=(A,B)=>A.every((x,i)=>ceq(x,B[i]));
const mMul=(A,B)=>{const M=Z();for(let i=0;i<8;i++)for(let j=0;j<8;j++)for(let k=0;k<8;k++)M[i*8+j]=cadd(M[i*8+j],cmul(A[i*8+k],B[k*8+j]));return M;};
const transpose=A=>A.map((_,k)=>A[(k%8)*8+Math.floor(k/8)]);
const dagger=A=>transpose(A).map(cconj);
const axis=k=>[0,1,2].map(j=>Number(k===j));
const root=(a,color,signed)=>{const vec=axis(color).map(v=>v*signed);return a===1?[-1,...vec]:a===2?[1,...vec]:[0,...axis(color).map(v=>-signed*(1-v))];};
const rootMatrix=r=>{
 const p=[],n=[];
 for(let i=0;i<4;i++)if(r[i]===1)p.push(i);else if(r[i]===-1)n.push(i);else if(r[i]!==0)throw Error('invalid D4 root');
 if(p.length===2)return mSub(Ei(p[0],p[1]+4),Ei(p[1],p[0]+4));
 if(n.length===2)return mSub(Ei(n[0]+4,n[1]),Ei(n[1]+4,n[0]));
 return mSub(Ei(p[0],n[0]),Ei(n[0]+4,p[0]+4));
};
const names=['c1','c2','c3','a1','a2','a3'],G={};
for(let a=1;a<=3;a++)for(let j=0;j<3;j++)for(const sign of [1,-1])G[a+':'+(sign===1?'c':'a')+(j+1)]=rootMatrix(root(a,j,sign));
const J=Z();for(let i=0;i<4;i++){J[i*8+i+4]=C(1);J[(i+4)*8+i]=C(1);}
let Jchecks=0,daggerChecks=0;
for(const M of Object.values(G)){ok(mEq(mAdd(mMul(transpose(M),J),mMul(J,M)),Z()),'J-preserved source-compatible D4 generator');Jchecks++;}
for(let j=1;j<=3;j++)for(const entry of [
 ['1:c'+j,'2:a'+j,1],['1:a'+j,'2:c'+j,-1],
 ['2:c'+j,'1:a'+j,-1],['2:a'+j,'1:c'+j,1],
 ['3:c'+j,'3:a'+j,-1],['3:a'+j,'3:c'+j,-1]
]){
 const [l,r,sgn]=entry;
 ok(mEq(dagger(G[l]),mScale(G[r],C(sgn))),'exact complex dagger matrix '+l+'->'+r);
 daggerChecks++;
}
function gaussTest(opts={}){
 const errors=[],ensure=(v,s)=>{if(!v)errors.push(s)};
 const kappaCases=[C(1,1),C(2,-1),C(-1,2)];
 const zColor=[C(1,1),C(-2,3),C(3,-2)],zAnti=[C(1,-2),C(2,2),C(-3,1)],z3=[C(1,2),C(-1,1),C(3,2)];
 const phiColor=[C(2,1),C(-1,3),C(3,-2)],xCases=[C(1,2),C(-2,1),C(3,-1)];
 let plaquettes=0,skewCases=0;
 for(const kappa of kappaCases){
  const lambda=[new Array(6),new Array(6),new Array(6)];
  for(let i=0;i<3;i++){
   lambda[0][i]=cmul(cconj(kappa),zColor[i]);
   lambda[0][i+3]=cmul(cconj(kappa),zAnti[i]);
   lambda[1][i]=opts.flipColor?cconj(zAnti[i]):cneg(cconj(zAnti[i]));
   lambda[1][i+3]=opts.flipAnti?cneg(cconj(zColor[i])):cconj(zColor[i]);
   lambda[2][i]=z3[i];lambda[2][i+3]=opts.flip3?cneg(cconj(z3[i])):cconj(z3[i]);
   const D=csub(cmul(lambda[0][i],lambda[1][i+3]),cmul(lambda[0][i+3],lambda[1][i]));
   const target=C(abs2(lambda[0][i])+abs2(lambda[0][i+3]));
   ensure(ceq(cmul(kappa,D),target)&&target[0]>0,'nontrivial complex kappa determinant '+i);
   plaquettes++;
  }
  for(let j=0;j<3;j++){
   const x1=xCases[j],x2=opts.flipX?cmul(kappa,cconj(x1)):cneg(cmul(kappa,cconj(x1)));
   const x3=C([2,-1,3][j]),x=[x1,x2,x3];
   const phi=[...phiColor,...phiColor.map(t=>opts.flipPhi?cneg(cconj(t)):cconj(t))];
   let X=Z();
   for(let a=1;a<=3;a++)for(let t=0;t<6;t++)X=mAdd(X,mScale(G[a+':'+names[t]],cmul(cmul(x[a-1],phi[t]),lambda[a-1][t])));
   ensure(mEq(mAdd(dagger(X),X),Z()),'compact source-root matrix skew-Hermitian '+j);
   ensure(mEq(mAdd(mMul(transpose(X),J),mMul(J,X)),Z()),'complex orthogonal Lie carrier '+j);
   skewCases++;
  }
 }
 return {pass:errors.length===0,errors,plaquettes,skewCases};
}
const tested=gaussTest();
ok(tested.pass,'direct source-root Gaussian complex matrix check '+tested.errors.slice(0,2));
const hostile=[['wrong color conjugacy',{flipColor:true}],['wrong anti conjugacy',{flipAnti:true}],['wrong x3 conjugacy',{flip3:true}],['wrong x2 conjugacy',{flipX:true}],['wrong Higgs anti-color conjugacy',{flipPhi:true}]];
let hostileRejected=0;
for(const [name,flags]of hostile){if(gaussTest(flags).pass)mIssues.push('ESCAPED complex model mutant '+name);else hostileRejected++;}
const mathReport={pass:mIssues.length===0,issues:mIssues,formal_colors:colorCertificates,independent_real_variables:12,independent_square_terms:realTerms,imaginary_polynomial_residuals:imaginaryResiduals,J_root_tests:Jchecks,dagger_root_tests:daggerChecks,Gaussian_plaquettes:tested.plaquettes,compact_matrix_samples:tested.skewCases,
hostile_math_defined:hostile.length,hostile_math_rejected:hostileRejected,all_nonzero_complex_phases_conditional_plaq_proved:true,source_original_E8_reality_qualified:false};

const srcPaths={
 packet:'research/woit-lisi-isomorph/lisi/LISI_L01_D4_COMPLEX_PHASE_PLAQUETTE_G0_0_1.json',
 prior:'research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_38.json',
 current:'research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_39.json',
 priorGate:'experiments/062/L_CURRENT_STAGE_GATE_0_38.json',
 currentGate:'experiments/062/L_CURRENT_STAGE_GATE_0_39.json',
 sign:'research/woit-lisi-isomorph/lisi/LISI_L01_D4_COMPACT_REALITY_SIGN_PHASE_G0_0_1.json',
 rank:'research/woit-lisi-isomorph/lisi/LISI_L01_D4_ROOT_PHASE_RANK_ONE_TRANSPORT_G0_0_1.json'
};
const sourceJson=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sourceSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
function sourceGuard(p,old,current,gate){
 const errors=[],ok=(v,s)=>{if(!v)errors.push(s)};
 ok(p?.schema==='isograph.lisi-L01-D4-complex-phase-conjugacy-obstruction-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'L G0 source packet');
 ok(p?.original_source?.revision==='arXiv:0711.0770v1'&&p.original_source.not_an_author_root_phase_choice===true&&p.original_source.source_semantics.includes('only proposes'),'original source version and tentative factorization');
 for(const[k,path]of [['ssc038',srcPaths.prior],['gate038',srcPaths.priorGate],['sign_exhaustion',srcPaths.sign],['rank_one_transport',srcPaths.rank]])
  ok(p.pinned_inputs?.[k]?.path===path&&p.pinned_inputs[k].git_blob_sha===sourceSha(path),'exact input SHA '+k);
 const m=p.chosen_model;
 ok(m?.allowed_generator_rescalings.includes('arbitrary NONZERO complex numbers')&&m?.compactness_constraints_for_generic_fields?.join('|')==='kappa*lambda_(2,ai)=conjugate(lambda_(1,ci))|kappa*lambda_(2,ci)=-conjugate(lambda_(1,ai))|lambda_(3,ai)=conjugate(lambda_(3,ci))','nonzero complex phase scope and compactness signs');
 ok(m?.exact_polynomial_certificate==='kappa*D_i=abs(lambda_(1,ci))^2+abs(lambda_(1,ai))^2=u_i^2+v_i^2+r_i^2+s_i^2'&&m.nonzero_monomial_coefficients_in_certificate===12,'polynomial positivity');
 ok(m?.strict_nonzero_result.includes('every D_i is nonzero')&&m.rank_one_incompatibility.includes('NO project compact'),'nonzero pair minor no rank-one');
 ok(p?.finite_exact_cross_checks?.root_J_checks===18&&p.finite_exact_cross_checks.root_dagger_checks===18&&p.finite_exact_cross_checks.generic_compact_matrix_cases===9,'independent matrix checks scope');
 ok(p?.census?.ids===191&&p.census.changed_only.join('|')==='L-SSC-040|L-SSC-044'&&p.census.unchanged_full_records===189,'expected SSC delta');
 for(const f of ['source_author_specified_root_phases','source_factorization_proven_mandatory','source_actual_e8_reality_identified','all_L01_L06_original_semantics_cold_reaudited','original_E8_Hodge_trace_qualified','source_author_error_proved','physical_theory_falsified','independent_external_review_passed','G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_author_semantics_authorized','author_outreach_authorized','PR70_merge_authorized'])
  ok(p.guards?.[f]===false,'source/future-stage lock '+f);
 const A=new Map((old.items||[]).map(x=>[x.id,x])),B=new Map((current.items||[]).map(x=>[x.id,x])),changed=[];
 ok(A.size===191&&B.size===191,'all 191 stable source identities');
 for(const [id,v]of A){const dst=B.get(id);if(!dst)errors.push('missing source '+id);else if(JSON.stringify(v)!==JSON.stringify(dst))changed.push(id);}
 for(const id of B.keys())if(!A.has(id))errors.push('invented source '+id);
 ok(changed.join('|')==='L-SSC-040|L-SSC-044','189 complete source records unchanged: '+changed);
 for(const id of ['L-SSC-040','L-SSC-044']){
  const prev=A.get(id),next=B.get(id),src=next?.source_expression_census?.L01_D4_COMPLEX_PLAQUETTE_G0;
  ok(next?.body?.startsWith(prev?.body||'MISSING'),'preserve previous source assertion '+id);
  ok(src?.packet?.path===srcPaths.packet&&src.packet.git_blob_sha===sourceSha(srcPaths.packet),'per-item packet SHA '+id);
  ok(src?.author_root_phase_reality_qualified===false&&src?.G1_authorized===false,'per-item no authority '+id);
 }
 ok(current.guards?.source_census_freeze_complete===false&&current.guards.dp_allowed===false,'SSC039 unfrozen no DP');
 ok(current.revision?.predecessor_git_blob_sha===sourceSha(srcPaths.prior)&&current.revision?.source_packet?.git_blob_sha===sourceSha(srcPaths.packet)&&current.revision?.changed_source_items.join('|')==='L-SSC-040|L-SSC-044','SSC039 source and parent provenance');
 ok(gate.track==='L'&&gate.stage==='G0'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===sourceSha(srcPaths.priorGate),'current G0 gate exact parent');
 ok(gate.current_source_census?.git_blob_sha===sourceSha(srcPaths.current)&&gate.current_source_census.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'G0 stage and W firewall');
 ok(!JSON.stringify(p).includes('W-SSC-'),'do not import W');
 return errors;
}
let sourceMutantsRejected=0,sourceCount=null,sourceErrors=[];
const sourceMutants=[
 ['wrong revision',x=>x.original_source.revision='arXiv:0711.0770v2'],
 ['factorization mandatory',x=>x.guards.source_factorization_proven_mandatory=true],
 ['real E8 claimed',x=>x.guards.source_actual_e8_reality_identified=true],
 ['wrong plus conjugacy',x=>x.chosen_model.compactness_constraints_for_generic_fields[1]='kappa*lambda_(2,ci)=conjugate(lambda_(1,ai))'],
 ['only unit phases',x=>x.chosen_model.allowed_generator_rescalings='Only unit phase choices'],
 ['wrong sum squares',x=>x.chosen_model.exact_polynomial_certificate='kappa*D_i=0'],
 ['source mathematical error claimed',x=>x.guards.source_author_error_proved=true],
 ['full source audit claimed',x=>x.guards.all_L01_L06_original_semantics_cold_reaudited=true],
 ['G1 promoted',x=>x.guards.G1_authorized=true],
 ['stale parent',x=>x.pinned_inputs.ssc038.git_blob_sha='stale'],
 ['W source import',x=>x.provenance.external_antecedents+=' W-SSC-001']
];
if(!process.argv.includes('--math-only')){
 const p=sourceJson(srcPaths.packet),old=sourceJson(srcPaths.prior),current=sourceJson(srcPaths.current),gate=sourceJson(srcPaths.currentGate);
 sourceErrors=sourceGuard(p,old,current,gate);sourceCount=current.items.length;
 if(!sourceErrors.length)for(const[name,fn]of sourceMutants){const q=structuredClone(p);fn(q);if(sourceGuard(q,old,current,gate).length===0)sourceErrors.push('ESCAPED SOURCE MUTANT '+name);else sourceMutantsRejected++;}
}
mathReport.source_guard={issues:sourceErrors,pass:sourceErrors.length===0,source_checks_skipped:process.argv.includes('--math-only'),source_mutants_defined:process.argv.includes('--math-only')?0:sourceMutants.length,source_mutants_rejected:sourceMutantsRejected,source_identities:sourceCount,changed_items:['L-SSC-040','L-SSC-044'],untouched_full_records:189,SSC_frozen:false,G1_authorized:false,cross_author_semantics_authorized:false};
if(sourceErrors.length){mathReport.pass=false;mathReport.issues.push(...sourceErrors);}

console.log(JSON.stringify(mathReport,null,2));
if(!mathReport.pass)process.exitCode=1;
