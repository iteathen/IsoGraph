// L-only G0 all-sector Clifford/exterior 1-jet replay, no author-output basis claim.
import './verify-l-g0-l039-nonzero-connection-mixed-projection-0-1.mjs';
import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={
 packet:L+'LISI_L01_H1_ALL_THREE_GRADED_CURVATURE_SECTORS_G0_0_1.json',
 coverage:L+'LISI_L039_CURRENT_G0_COVERAGE_LEDGER_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_31.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_31.json',
 predecessor:L+'LISI_L01_H1_NONZERO_CONNECTION_GRADED_MIXED_PROJECTION_G0_0_1.json',
 graded:L+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Packet=load(files.packet),Coverage=load(files.coverage),SSC=load(files.ssc),Gate=load(files.gate);
const clone=x=>JSON.parse(JSON.stringify(x));
const eta=[1,1,1,-1,1,1,1,1],bit=i=>1<<i;
const blade=(a,b)=>{let s=1;for(let i=0;i<8;i++)if(a&bit(i))for(let j=0;j<8;j++)if(b&bit(j)){if(i>j)s=-s;if(i===j)s*=eta[i]}return[a^b,s]};
const B=Array.from({length:8},(_,i)=>new Map([[bit(i),1]]));
const add=(...xs)=>{let r=new Map;for(const x of xs)for(const[k,v]of x)r.set(k,(r.get(k)||0)+v);return new Map([...r].filter(([k,v])=>v!==0))};
const sc=(x,k)=>new Map([...x].map(([mask,v])=>[mask,v*k]).filter(([mask,v])=>v!==0));
const mul=(a,b)=>{let r=new Map;for(const[i,x]of a)for(const[j,y]of b){let[k,s]=blade(i,j);r.set(k,(r.get(k)||0)+x*y*s)}return new Map([...r].filter(([k,v])=>v!==0))};
const sub=(a,b)=>add(a,sc(b,-1)),comm=(a,b)=>sub(mul(a,b),mul(b,a)),eq=(a,b)=>sub(a,b).size===0;
const combine=(bs,cs)=>add(...bs.map((x,i)=>sc(x,cs[i])));
const gravity=[],EW=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){gravity.push(mul(B[i],B[j]));EW.push(mul(B[4+i],B[4+j]));}
const weight=n=>{let v=0;while(n){v+=n&1;n>>=1}return v};
const project=(x,s)=>new Map([...x].filter(([mask,v])=>s==='G'?(mask&240)===0&&weight(mask&15)===2:
 s==='EW'?(mask&15)===0&&weight(mask&240)===2:
 weight(mask&15)===1&&weight(mask&240)===1));
function checkChiralSplit(){
 const K=[mul(B[4],B[7]),mul(B[5],B[7]),mul(B[6],B[7])];
 const J=[mul(B[5],B[6]),mul(B[6],B[4]),mul(B[4],B[5])];
 const L=J.map((x,i)=>add(x,K[i])),R=J.map((x,i)=>sub(x,K[i]));
 let brackets=0,errors=0,reconstructed=0;
 for(let i=0;i<3;i++)for(let j=0;j<3;j++){brackets++;if(comm(L[i],R[j]).size)errors++}
 for(let i=0;i<3;i++){reconstructed+=2;if(!eq(sc(add(L[i],R[i]),.5),J[i])||!eq(sc(sub(L[i],R[i]),.5),K[i]))errors++}
 return{brackets,reconstructed,errors};
}
function field(seed){
 const e=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>Number(i===j)));
 const phi=Array.from({length:4},(_,a)=>((seed+3*a)%5)-2);
 const dE=Array.from({length:4},(_,p)=>Array.from({length:4},(_,j)=>Array.from({length:4},(_,u)=>((seed+3*p+7*j+11*u)%5)-2)));
 const dPhi=Array.from({length:4},(_,p)=>Array.from({length:4},(_,a)=>((seed+3*p+13*a)%5)-2));
 const omega=Array.from({length:4},(_,p)=>combine(gravity,gravity.map((_,k)=>((seed+2*p+7*k)%5)-2)));
 const v=Array.from({length:4},(_,p)=>combine(EW,EW.map((_,k)=>((seed+11*p+13*k)%5)-2)));
 const dOmega=Array.from({length:4},(_,p)=>Array.from({length:4},(_,q)=>combine(gravity,gravity.map((_,k)=>((seed+3*p+17*q+11*k)%5)-2))));
 const dV=Array.from({length:4},(_,p)=>Array.from({length:4},(_,q)=>combine(EW,EW.map((_,k)=>((seed+13*p+7*q+19*k)%5)-2))));
 const eGamma=e.map(x=>combine(B.slice(0,4),x)),Phi=combine(B.slice(4),phi);
 const dEPhi=(p,q)=>add(mul(combine(B.slice(0,4),dE[p][q]),Phi),mul(eGamma[q],combine(B.slice(4),dPhi[p])));
 const dPhiGamma=p=>combine(B.slice(4),dPhi[p]);
 return{e,phi,dE,dPhi,omega,v,dOmega,dV,eGamma,Phi,dEPhi,dPhiGamma};
}
function replay(opt={}){
 let total=0,gravityErrors=0,ewErrors=0,mixedErrors=0,residualErrors=0,first=null;
 const results=[];
 for(let seed=0;seed<15;seed++){
  const f=field(seed),phiSquared=f.phi.reduce((s,x)=>s+x*x,0);
  const H=f.eGamma.map((x,p)=>add(sc(f.omega[p],opt.spinScale??.5),sc(mul(x,f.Phi),opt.mixedScale??.25),sc(f.v[p],opt.ewScale??1)));
  for(let p=0;p<4;p++)for(let q=p+1;q<4;q++){
   const raw=add(sc(sub(f.dOmega[p][q],f.dOmega[q][p]),opt.spinScale??.5),
     sc(sub(f.dEPhi(p,q),f.dEPhi(q,p)),opt.mixedScale??.25),
     sc(sub(f.dV[p][q],f.dV[q][p]),opt.ewScale??1),comm(H[p],H[q]));
   const srcG=add(sc(add(sub(f.dOmega[p][q],f.dOmega[q][p]),sc(comm(f.omega[p],f.omega[q]),opt.riemannFactor??.5)),.5),
     sc(comm(f.eGamma[p],f.eGamma[q]),(opt.gravityHiggsFactor??(-1/16))*phiSquared));
   const srcEW=add(sub(f.dV[p][q],f.dV[q][p]),sc(comm(f.v[p],f.v[q]),opt.EWCurvatureFactor??1));
   const torsion=add(combine(B.slice(0,4),f.dE[p][q].map((v,i)=>v-f.dE[q][p][i])),
     sc(sub(comm(f.omega[p],f.eGamma[q]),comm(f.omega[q],f.eGamma[p])),.5));
   const Dp=i=>add(f.dPhiGamma(i),comm(f.v[i],f.Phi));
   const sourceMixed=sub(mul(torsion,f.Phi),sc(sub(mul(f.eGamma[p],Dp(q)),mul(f.eGamma[q],Dp(p))),opt.higgsCovariantSign??1));
   const g=eq(project(raw,'G'),project(srcG,'G'));
   const ew=eq(project(raw,'EW'),project(srcEW,'EW'));
   const mixed=eq(sc(project(raw,'M'),opt.mixedOutputRatio??4),project(sourceMixed,'M'));
   const projectionResidual=sub(raw,add(project(raw,'G'),project(raw,'EW'),project(raw,'M')));
   if(!g||!ew||!mixed||projectionResidual.size)first??={seed,p,q,failed:{g,ew,mixed,residual:projectionResidual.size}};
   gravityErrors+=+(!g);ewErrors+=+(!ew);mixedErrors+=+(!mixed);residualErrors+=+(projectionResidual.size!==0);
   total++;
  }
 }
 return{seeds:15,total,gravityErrors,ewErrors,mixedErrors,residualErrors,first};
}
function guards(p=Packet,c=Coverage){
 let errors=[],ck=(v,k)=>{if(!v)errors.push(k)};
 ck(p.schema==='isograph.lisi-l01-graded-H1-three-curvature-sectors-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'G0 track only');
 ck(p.frozen_source?.id==='L01'&&p.frozen_source?.revision==='arXiv:0711.0770v1'&&JSON.stringify(p.frozen_source.printed_pages)==='[12,23,24]','exact original source');
 ck(p.frozen_source?.H1==='H1=(1/2)*omega+(1/4)*e*phi+(W+B1)','H1 coefficients intact');
 ck(p.frozen_source?.FG==='F_G=(1/2)*(R-(1/8)*e wedge e*phi^2)'&&p.frozen_source?.Few==='F_ew=(d(W)+W wedge W)+(d(B1)+B1 wedge B1)','FG outer inner signs and EW two source curvatures');
 ck(p.frozen_source?.Fgw==='F_gw=(d(e)+(1/2)*[omega,e])*phi-e*(d(phi)+[W+B1,phi])'&&p.frozen_source?.field_roles?.includes('degree-zero scalar'),'Fgw sign and scalar grading');
 for(const [key,f]of [['predecessor_ssc031',files.ssc],['predecessor_g0_gate031',files.gate],['nonzero_mixed_projection',files.predecessor],['graded_source',files.graded]])
  ck(p.dependencies?.[key]?.path===f&&p.dependencies?.[key]?.git_blob_sha===sha(f),'exact parent provenance '+key);
 ck(p.project_typed_setup?.H==='H_i=Omega_i/2+(e_i*Phi)/4+V_i, V_i=W_i+B1_i','typed three sector connection');
 ck(p.conditional_reconstruction?.gravity?.includes('(1/8)')&&p.conditional_reconstruction?.mixed?.startsWith('4*P_M(F)')&&p.conditional_reconstruction?.EW?.includes('d(V)+V wedge V'),'all three explicit sector identities');
 ck(p.conditional_reconstruction?.literal_source_output_basis_qualification?.includes('NOT established'),'author source output normalization open');
 ck(p.finite_checks?.field_seeds===15&&p.finite_checks?.oriented_twoform_checks===90&&p.finite_checks?.three_sector_comparisons===270&&p.finite_checks?.non_bivector_residual_checks===90&&p.finite_checks?.EW_LR_cross_brackets===9,'finite checked claims');
 for(const flag of ['source_census_frozen','full_L01_L06_source_audit_complete','primitive_closure_complete','full_superconnection_mathematical_theorem_qualified','mixed_output_basis_source_normalization_qualified','author_mathematical_error_proved','external_cold_review_passed','G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_semantic_use_authorized'])
  ck(p.limitations?.[flag]===false,'no source/stage promotion '+flag);
 ck(SSC.items?.length===191&&SSC.guards.source_census_freeze_complete===false&&Gate.current_lawful_state.G1_authorized===false,'G0 census still open');
 ck(c.schema==='isograph.lisi-l039-source-G0-coverage-ledger.v0.1'&&c.track==='L'&&c.stage==='G0'&&c.authority===false,'coverage ledger scoped');
 ck(c.remaining_open?.some(s=>s.includes('Source-authorized common output'))&&c.retained_unexamined_scope?.includes('NOT same as a new cold audit'),'exact uncovered source record');
 ck(!JSON.stringify([p,c]).includes('W-SSC-'),'W semantics never imported');
 return errors;
}
const base=replay(),split=checkChiralSplit(),issues=guards();
if(base.total!==90||base.gravityErrors||base.ewErrors||base.mixedErrors||base.residualErrors)issues.push('THREE_SECTOR_REPLAY_FAILED '+JSON.stringify(base));
if(split.brackets!==9||split.reconstructed!==6||split.errors!==0)issues.push('EW_LR_SPLIT_FAILED '+JSON.stringify(split));
const mathMutants=[
 ['spin coefficient corrupted',{spinScale:1}],
 ['mixed coefficient corrupted',{mixedScale:1}],
 ['EW coefficient omitted',{ewScale:0}],
 ['gravity R commutator coefficient corrupted',{riemannFactor:1}],
 ['gravity frame Higgs sign corrupted',{gravityHiggsFactor:1/16}],
 ['EW curvature commutator factor corrupted',{EWCurvatureFactor:0}],
 ['mixed unscaled output factor corrupted',{mixedOutputRatio:1}],
 ['Higgs Dphi sign corrupted',{higgsCovariantSign:-1}]
];
const sourceMutants=[
 ['G1 claimed',p=>{p.limitations.G1_authorized=true}],
 ['full source claimed',p=>{p.limitations.full_L01_L06_source_audit_complete=true}],
 ['normalization source declared',p=>{p.limitations.mixed_output_basis_source_normalization_qualified=true}],
 ['source FG inner factor changed',p=>{p.frozen_source.FG=p.frozen_source.FG.replace('(1/8)','(1/4)')}],
 ['parent SHA stale',p=>{p.dependencies.nonzero_mixed_projection.git_blob_sha='STALE'}],
 ['drop entire EW role',p=>{p.frozen_source.Few='F_ew=d(W)'}]
];
let rejected=0;if(!issues.length){
 for(const [name,cfg]of mathMutants){const m=replay(cfg);if(!m.gravityErrors&&!m.ewErrors&&!m.mixedErrors&&!m.residualErrors)issues.push('ESCAPED_MATH '+name);else rejected++}
 for(const [name,mut]of sourceMutants){const p=clone(Packet);mut(p);if(guards(p).length===0)issues.push('ESCAPED_SOURCE '+name);else rejected++}
}
if(process.exitCode)issues.push('predecessor source/normalization verifier failed');
console.log(JSON.stringify({schema:'isograph.exp062-l039-H1-three-sector-graded-source-replay.v0.1',pass:issues.length===0,issues,
 full_restricted_graded_jet_seeds:base.seeds,twoform_positions:base.total,
 gravity_equalities:base.total-base.gravityErrors,EW_equalities:base.total-base.ewErrors,mixed_project_equalities:base.total-base.mixedErrors,
 bivector_closure_residual_failures:base.residualErrors,EW_chiral_commuting_pairs:split.brackets,
 adversarial_defined:mathMutants.length+sourceMutants.length,adversarial_rejected:rejected,
 source_common_mixed_output_basis_fixed:false,G1_authorized:false,external_cold_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
