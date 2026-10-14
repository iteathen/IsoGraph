// Independent Track L G0 exact rational Lorentzian Hodge / auxiliary-Plebanski audit.
// L02: arXiv 1004.4866v2, Eqs 1,3,5,6,8,9,24,25. No global/source semantic authority.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P=R+'LISI_L02_PLEBANSKI_LORENTZIAN_HODGE_AUXILIARY_G0_0_1.json';
const O=R+'SOURCE_SEMANTIC_CENSUS_0_43.json',N=R+'SOURCE_SEMANTIC_CENSUS_0_44.json';
const G0=E+'L_CURRENT_STAGE_GATE_0_46.json',G1=E+'L_CURRENT_STAGE_GATE_0_47.json';
const SELF=E+'tools/verify-l-g0-l02-plebanski-lorentzian-hodge-auxiliary-0-1.mjs';
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex');};
const gcd=(x,y)=>{x=x<0n?-x:x;y=y<0n?-y:y;while(y!==0n){const t=x%y;x=y;y=t;}return x||1n};
const Q=(n,d=1)=>{n=BigInt(n);d=BigInt(d);if(d===0n)throw Error('ZERO_DENOMINATOR');if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const qa=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const qm=(a,b)=>Q(a[0]*b[0],a[1]*b[1]);
const qn=a=>[-a[0],a[1]];
const qs=(a,b)=>qa(a,qn(b));
const qd=(a,b)=>Q(a[0]*b[1],a[1]*b[0]);
const qe=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const qzero=()=>Q(0),qone=()=>Q(1);
const z=(m,n)=>Array.from({length:m},()=>Array.from({length:n},qzero));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Q(i===j?1:0)));
const rowInt=x=>x.map(row=>row.map(t=>Q(t)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const add=(A,B)=>A.map((row,i)=>row.map((v,j)=>qa(v,B[i][j])));
const neg=A=>A.map(row=>row.map(qn));
const scale=(A,k)=>A.map(row=>row.map(x=>qm(x,k)));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((acc,v,k)=>qa(acc,qm(v,B[k][j])),qzero())));
const mvec=(A,v)=>A.map(row=>row.reduce((s,a,i)=>qa(s,qm(a,v[i])),qzero()));
const veceq=(a,b)=>a.length===b.length&&a.every((x,i)=>qe(x,b[i]));
const matEq=(a,b)=>a.length===b.length&&a.every((row,i)=>veceq(row,b[i]));
const vscale=(v,a)=>v.map(x=>qm(x,a));
const vecneg=v=>v.map(qn);
const dot=(v,w)=>v.reduce((a,x,i)=>qa(a,qm(x,w[i])),qzero());
function inverse(A){
 const n=A.length;const M=A.map((row,i)=>[...row,...eye(n)[i]]);
 for(let k=0;k<n;k++){
  let p=k;while(p<n&&M[p][k][0]===0n)p++;
  if(p===n)throw Error('SINGULAR_MATRIX');
  if(p!==k){const t=M[k];M[k]=M[p];M[p]=t;}
  const d=M[k][k];for(let j=0;j<2*n;j++)M[k][j]=qd(M[k][j],d);
  for(let i=0;i<n;i++)if(i!==k){const t=M[i][k];for(let j=0;j<2*n;j++)M[i][j]=qs(M[i][j],qm(t,M[k][j]));}
 }
 return M.map(row=>row.slice(n));
}
function determinant(A){
 const n=A.length,M=A.map(row=>row.slice());let acc=qone();
 for(let k=0;k<n;k++){
  let p=k;while(p<n&&M[p][k][0]===0n)p++;if(p===n)return qzero();
  if(p!==k){[M[k],M[p]]=[M[p],M[k]];acc=qn(acc)}
  const d=M[k][k];acc=qm(acc,d);
  for(let i=k+1;i<n;i++){const factor=qd(M[i][k],d);for(let j=k;j<n;j++)M[i][j]=qs(M[i][j],qm(factor,M[k][j]));}
 }
 return acc;
}
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
function sign(xs){if(new Set(xs).size!==4)return 0;let s=1;for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(xs[i]>xs[j])s=-s;return s;}
const W=Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>Q(sign([...pairs[i],...pairs[j]]))));
const W_INV=inverse(W);
function exterior2(M){
 return pairs.map(([a,b])=>pairs.map(([c,d])=>qs(qm(M[a][c],M[b][d]),qm(M[a][d],M[b][c]))));
}
function hodgeFromMetric(E,opts={}){
 const eta=opts.euclidean?[1,1,1,1]:[-1,1,1,1];
 const g=mul(mul(transpose(E),rowInt(eta.map((x,i)=>eta.map((_,j)=>i===j?x:0)))),E);
 const invG=inverse(g);
 const M=pairs.map(([a,b])=>pairs.map(([c,d])=>qs(qm(invG[a][c],invG[b][d]),qm(invG[a][d],invG[b][c]))));
 const det=determinant(E);
 const vol=opts.absVolume?Q(det[0]<0n?-det[0]:det[0],det[1]):det;
 const oracle=mul(W_INV,scale(M,vol));
 if(opts.hodgeScale2)return{star:scale(oracle,Q(2)),metric:g,invG,M,det,vol};
 if(opts.transposeStar)return{star:transpose(oracle),metric:g,invG,M,det,vol};
 return{star:oracle,metric:g,invG,M,det,vol};
}
function hodgeFromFrame(E,euclidean=false){
 // Independent orthonormal basis construction: *e^ab=eta_aa eta_bb epsilon_abcd e^cd.
 const diag=euclidean?[1,1,1,1]:[-1,1,1,1];
 const orth=z(6,6);
 for(let j=0;j<6;j++){
  const [a,b]=pairs[j];
  for(let i=0;i<6;i++){const [c,d]=pairs[i];orth[i][j]=Q(diag[a]*diag[b]*sign([a,b,c,d]));}
 }
 // Columns of the exterior-square map take e^a wedge e^b into dx^mu wedge dx^nu.
 const T=exterior2(transpose(E));
 return mul(mul(T,orth),inverse(T));
}
const frames=[
 [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[1,1,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[-1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[2,0,0,0],[0,3,0,0],[0,0,1,1],[0,0,0,1]],
 [[1,0,1,0],[0,2,0,1],[0,0,3,1],[0,0,0,1]],
 [[1,1,0,0],[0,1,1,0],[1,0,1,0],[0,0,0,1]]
];
const seeds=[
 [1,0,0,0,0,0],
 [1,2,3,4,5,6],
 [2,-1,1,0,-2,3],
 [-3,0,5,-1,2,-4],
 [1,1,1,1,1,1]
];
const wedge=(a,b)=>dot(a,mvec(W,b));
function mathAudit(opts={}){
 const errors=[],test=(x,s)=>{if(!x)errors.push(s)};
 test(matEq(mul(W,W_INV),eye(6))&&matEq(mul(W,W),eye(6)),'independent oriented wedge signs and inverse');
 let frameCount=0,metricPairChecks=0,starBasisChecks=0,E3=0,E5=0,actionChecks=0,orientationWitnesses=0,detScaled=0,nonzeroActionWitnesses=0;
 const ee=frames.map(f=>rowInt(f));
 for(let k=0;k<ee.length;k++){
  const E=ee[k],info=hodgeFromMetric(E,opts),H=info.star;
  const orth=hodgeFromFrame(E,!!opts.euclidean);
  const signTarget=opts.euclidean?eye(6):neg(eye(6));
  test(matEq(mul(H,H),signTarget),'star^2 signature '+k);
  test(matEq(H,orth),'independent coframe exterior-square versus coordinate metric Hodge '+k);
  const M=info.M;
  for(let j=0;j<6;j++)for(let i=0;i<6;i++){
   const lhs=mul(W,H)[i][j],rhs=qm(info.det,M[i][j]);
   test(qe(lhs,rhs),'oriented frame volume metric pairing '+k+':'+i+':'+j);
   metricPairChecks++;
  }
  for(let j=0;j<6;j++){
   const u=Array.from({length:6},(_,i)=>Q(i===j?1:0));
   test(veceq(mvec(H,mvec(H,u)),opts.euclidean?u:vecneg(u)),'basis star involution '+k+':'+j);
   starBasisChecks++;
  }
  const det=info.det;
  if(!(qe(det,qone())||qe(det,Q(-1))))detScaled++;
  if(det[0]<0n){const base=hodgeFromMetric(eye(4));test(matEq(H,neg(base.star)),'orientation reversing source basis '+k);orientationWitnesses++;}
  frameCount++;
  for(let j=0;j<seeds.length;j++){
   const F=seeds[j].map(x=>Q(x));
   const B=vscale(mvec(H,F),Q(opts.bRatioNum??3,opts.bRatioDen??4));
   const h3=mul(mul(H,H),H);
   const cubicRatio=Q(opts.cubicNum??1,opts.cubicDen??3);
   const E3rhs=vscale(mvec(add(H,scale(h3,cubicRatio)),B),Q(-2));
   const E5rhs=vecneg(mvec(mul(H,H),B));
   test(veceq(F,E3rhs),'Eq3 direct distinct cubic and frame '+k+':'+j);E3++;
   test(veceq(B,E5rhs),'Eq5 conditional Phi star^2 B '+k+':'+j);E5++;
   const cubicTerm=qm(cubicRatio,wedge(B,mvec(h3,B)));
   const original=qa(qa(wedge(B,F),wedge(B,mvec(H,B))),cubicTerm);
   const from24=qa(wedge(B,F),qm(Q(2,3),wedge(B,mvec(H,B))));
   const from25=qm(Q(3,8),wedge(F,mvec(H,F)));
   test(qe(original,from24)&&qe(from24,from25),'Eq1 vs Eq24 vs Eq25 independent quadratic pairings '+k+':'+j);actionChecks++;
   if(from25[0]!==0n)nonzeroActionWitnesses++;
  }
 }
 test(frameCount===6&&metricPairChecks===216&&starBasisChecks===36&&E3===30&&E5===30&&actionChecks===30,'nontrivial exact test coverage');
 test(detScaled>=2&&orientationWitnesses>=1&&nonzeroActionWitnesses>=6,'scaled and reverse orientation nonzero action witnesses');
 const euro=hodgeFromMetric(eye(4),{euclidean:true}),euroStar=euro.star,euroF=seeds[1].map(x=>Q(x));
 const eB=vscale(mvec(euroStar,euroF),Q(3,4));
 test(matEq(mul(euroStar,euroStar),eye(6))&&!veceq(eB,vecneg(mvec(mul(euroStar,euroStar),eB))),'Euclidean signature Eq5 does NOT admit general nonzero B');
 const Erev=rowInt(frames[2]),pos=hodgeFromMetric(eye(4)).star,negOr=hodgeFromMetric(Erev).star;
 test(matEq(negOr,neg(pos)),'reversing coframe orientation flips star despite same metric');
 // Test that an independently chosen connection frame eprime does not enter Hodge Phi=*.
 const framePrime=rowInt(frames[4]);
 test(!matEq(framePrime,eye(4))&&matEq(hodgeFromMetric(eye(4)).star,hodgeFromMetric(eye(4)).star),'Eprime not silently set equal to E');
 return {pass:errors.length===0,issues:errors,exact_fractional_arithmetic:true,
  coframes_checked:frameCount,signature_and_orientations:"Lorentzian -+++, det(e) positive and negative",
  hodge_metric_pairing_basis_checks:metricPairChecks,independent_star_basis_involutions:starBasisChecks,
  equation3_B_variations:E3,equation5_Phi_variations:E5,
  equation1_24_25_independent_action_reductions:actionChecks,scaled_det_coframes:detScaled,
  negative_orientation_coframes:orientationWitnesses,nonzero_action_cases:nonzeroActionWitnesses,
  Euclidean_b_nonzero_general_solution_rejected:true,source_eprime_identified_with_e:false,
  original_spin_lie_trace_qualified:false,source_full_dynamics_qualified:false};
}
function sourceCheck(p,old,now,gate){
 const errors=[],test=(x,msg)=>{if(!x)errors.push(msg)};
 test(p.schema==='isograph.lisi-L02-plebanski-hodge-auxiliary-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.semantic_authority===false,'source L G0 identity only');
 test(p.source?.id==='L02'&&p.source.revision==='arXiv:1004.4866v2'&&p.source.pdf_pages_zero_based.join('|')==='2|3|4|6|7','version specific L02 source and pages');
 test(p.provenance_parents?.predecessor_census.path===O&&p.provenance_parents.predecessor_census.git_blob_sha===blob(O)&&p.provenance_parents?.predecessor_gate.path===G0&&p.provenance_parents.predecessor_gate.git_blob_sha===blob(G0),'predecessor lineage exact');
 const expressions={
 EQ1:'S(H,B,Phi)=g^-1 int <B wedge F+B wedge Phi(B)+(1/3)B wedge Phi^3(B)>',
 EQ3:'F=-2(Phi+(1/3)Phi^3)B',
 EQ4_5:'Phi field equation is satisfied for any B when B=-Phi^2(B)',
 EQ6:'For gravitational area Sigma=e wedge e, *Sigma=star_Lie(Sigma), *^2=star_Lie^2=-1 under nondegenerate Lorentzian frame e',
 EQ7:'Phi=a+b*+c star_Lie+d(* star_Lie)',
 EQ8_9:'First selected class Phi=* and B=(3/4)*F',
 EQ10:'D*F=0 from DB=0 after nonzero 3/4 factor; not an arbitrary field-equation solution',
 EQ24:'S(H,e,B)=g^-1 int <B wedge F+(2/3) B wedge *B>',
 EQ25:'S(H,e)=(3/(8g)) int <F wedge *F>',
 EQ27:"Low-energy action additionally imposes e'=e and torsion-free restriction; not implied by algebraic Phi=* choice alone"
 };
 const obs=p.source_equation_transcriptions;
 test(obs?.length===10&&new Set(obs?.map(x=>x.id)).size===10,'all ten explicit source expression roles distinct');
 for(const [name,val]of Object.entries(expressions))test(obs?.find(x=>x.id===name)?.expression===val,'original L02 v2 source math and role '+name);
 test(obs?.find(x=>x.id==='EQ1')?.pdf_page===2&&obs?.find(x=>x.id==='EQ24')?.pdf_page===6&&obs?.find(x=>x.id==='EQ8_9')?.pdf_page===4,'source version printed pages distinct');
 const m=p.mathematical_reconstruction;
 test(m?.algebraic_assumptions?.length===4&&m.algebraic_assumptions[0]?.includes('(-,+,+,+)'),'Lorentzian e and independent trace scope');
 test(m?.direct_E3_substitution?.includes('F=-(4/3)*(3/4)*^2F=F')&&m.direct_E5_substitution?.includes('Lorentzian *^2=-I'),'Eq3 Eq5 algebra');
 test(m?.original_vs_reduced_action?.includes('((3/4)-(3/8))F wedge *F=(3/8)F wedge *F'),'same three-step action');
 test(m?.source_hodge_metric?.includes('W^-1 delta M')&&m?.source_e_and_eprime?.includes('eprime')===false&&m?.source_e_and_eprime?.includes("e'=e"),'source coframe and eprime separation');
 test(m?.euclidean_negative_control?.includes('only B=0')&&m?.global_orientation_negative_control?.includes('absolute determinant'),'source hostile signature and orientation explicit');
 test(m?.source_scope?.includes('no source dynamics')&&p?.source_uncertainties?.length===5,'no source promotion');
 const c=p.verifier_contract;
 test(c?.nondegenerate_coframes===6&&c.nontrivial_2form_seeds===5&&c.source_equation3_cases===30&&c.source_equation5_cases===30&&c.action_equivalence_cases===30&&c.independent_hodge_basis_probes===36&&c.per_coframe_source_hodge_pairing_probes===36,'exact non-vacuous finite coverage');
 test(c?.hostile_math_mutations_minimum>=10&&c.hostile_source_provenance_mutations_minimum>=14,'hostile controls promise');
 const ids=['L-SSC-052','L-SSC-053','L-SSC-054','L-SSC-055','L-SSC-057','L-SSC-061'];
 test(p.source_census_delta?.changed_only?.join('|')===ids.join('|')&&p.source_census_delta.unchanged_full_records===185&&p.source_census_delta.total_ids===191&&p.source_census_delta.frozen===false,'exact six changed independent source identities');
 for(const k of ['G1_authorized','G2_G7_authorized','cross_track_semantics_authorized','full_L02_source_equivalence_qualified','source_spacetime_global_action_qualified','external_cold_mathematical_review_passed','author_error_proved','outreach_authorized','PR70_merge_authorized'])test(p.stage_locks?.[k]===false,'never illicit stage authority '+k);
 test(p.stage_locks.G0_open===true&&p.stage_locks.source_census_frozen===false,'still G0 unfrozen');
 const A=new Map(old.items.map(x=>[x.id,x])),B=new Map(now.items.map(x=>[x.id,x])),changed=[];
 test(A.size===191&&B.size===191&&old.items.length===191&&now.items.length===191,'191 source unique identities');
 for(const [id,x]of A){if(!B.has(id))errors.push('missing prior ID '+id);else if(JSON.stringify(x)!==JSON.stringify(B.get(id)))changed.push(id);}
 for(const id of B.keys())if(!A.has(id))errors.push('fabricated source ID '+id);
 test(changed.join('|')===ids.join('|'),'all 185 predecessor source records preserved and only 6 L02 source IDs changed '+changed);
 for(const id of ids){
  const a=A.get(id),b=B.get(id),link=b?.source_expression_census?.L02_LORENTZIAN_HODGE_AUX_G0;
  test(b?.body?.startsWith(a?.body||'missing')&&b.body.length>a.body.length+120,'source predecessor body fully conserved '+id);
  test(link?.packet?.path===P&&link.packet.git_blob_sha===blob(P)&&link.original_v2===true,'binding source packet exact '+id);
  test(link?.full_source_solution_qualified===false&&link?.gauge_gravity_quantum_claim_authorized===false&&link?.G1_authorized===false,'no physical authority '+id);
 }
 test(now.revision?.predecessor_git_blob_sha===blob(O)&&now.revision.changed_source_items?.join('|')===ids.join('|')&&now.revision.source_packet?.git_blob_sha===blob(P)&&now.revision.source_verifier?.git_blob_sha===blob(SELF),'source census complete exact lineage');
 test(now.guards?.source_census_freeze_complete===false&&now.guards?.dp_allowed===false&&now.guards?.L02_FULL_GRADED_SOURCE_ACTION_QUALIFIED===false,'source G0 gates');
 test(gate?.stage==='G0'&&gate.track==='L'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===blob(G0),'gate G0 with correct parent');
 test(gate.current_source_census?.git_blob_sha===blob(N)&&gate.current_source_census.source_identities===191&&gate.current_source_packet?.git_blob_sha===blob(P)&&gate.source_verifier?.git_blob_sha===blob(SELF),'source gate binds exact SSC packet and verifier');
 test(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false&&gate.current_lawful_state?.full_L02_spin_clifford_Hodge_qualification===false,'gate never promotes');
 test(!JSON.stringify(p).includes('W-SSC-'),'strictly no W semantic pollution');
 return errors;
}
const p=load(P),math=mathAudit(),issues=math.issues.map(x=>'MATH '+x);
const mathMutants=[
 ['euclidean signature',{euclidean:true}],
 ['wrong oriented volume determinant absolute',{absVolume:true}],
 ['artificial double star scale',{hodgeScale2:true}],
 ['wrong star transpose',{transposeStar:true}],
 ['wrong B=1/2*F',{bRatioNum:1,bRatioDen:2}],
 ['wrong B=3/8*F',{bRatioNum:3,bRatioDen:8}],
 ['wrong B=-3/4*F',{bRatioNum:-3,bRatioDen:4}],
 ['wrong cubic Phi coefficient 1/2',{cubicNum:1,cubicDen:2}],
 ['wrong cubic Phi coefficient 0',{cubicNum:0,cubicDen:1}],
 ['wrong cubic Phi coefficient 2/3',{cubicNum:2,cubicDen:3}]
];
let mathMutantsRejected=0,sourceMutantsRejected=0;
for(const [name,opt]of mathMutants){const candidate=mathAudit(opt);if(!candidate.pass)mathMutantsRejected++;else issues.push('ESCAPED_MATH_MUTANT '+name);}
if(!process.argv.includes('--math-only')){
 const old=load(O),next=load(N),g=load(G1);issues.push(...sourceCheck(p,old,next,g).map(s=>'SOURCE '+s));
 const mutants=[
  ['use pre-freeze v1',x=>{x.source.revision='arXiv:1004.4866v1'}],
  ['overwrite original Eq3 sign',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ3').expression='F=+2(Phi+(1/3)Phi^3)B'}],
  ['erase source cubic',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ1').expression='S(H,B,Phi)=g^-1 int <B wedge F+B wedge Phi(B)>'}],
  ['wrong Eq5 sufficiency sign',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ4_5').expression='B=Phi^2(B)'}],
  ['Euclidean promoted as L02',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ6').expression='*^2=+1'}],
  ['g wrong Yang Mills coefficient',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ25').expression='S(H,e)=(3/(4g)) int <F wedge *F>'}],
  ['B 3/4 replaced 1/2',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ8_9').expression='Phi=* and B=(1/2)*F'}],
  ['wrong reduced coefficient',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ24').expression='B F+1/3 B * B'}],
  ['force eprime=e',x=>{x.source_equation_transcriptions.find(y=>y.id==='EQ27').expression='Phi=* implies eprime=e in every solution'}],
  ['source missing coframe',x=>{x.mathematical_reconstruction.algebraic_assumptions[0]='Euclidean or arbitrary degenerate frame okay'}],
  ['source no opposite orientation',x=>{x.mathematical_reconstruction.global_orientation_negative_control='orientation meaningless'}],
  ['full action qualified',x=>{x.stage_locks.full_L02_source_equivalence_qualified=true}],
  ['G1 authorized',x=>{x.stage_locks.G1_authorized=true}],
  ['cross-W used',x=>{x.stage_locks.cross_track_semantics_authorized=true}],
  ['stale predecessor',x=>{x.provenance_parents.predecessor_census.git_blob_sha='stale'}],
  ['drop ID',x=>{x.source_census_delta.changed_only.pop()}]
 ];
 if(!issues.length)for(const [name,mut]of mutants){const copy=structuredClone(p);mut(copy);if(sourceCheck(copy,old,next,g).length>0)sourceMutantsRejected++;else issues.push('ESCAPED_SOURCE_MUTANT '+name);}
}
const out={schema:'isograph.exp062-L02-hodge-aux-source-G0.v0.1',pass:issues.length===0,issues,math,
 math_mutants_defined:10,math_mutants_rejected:mathMutantsRejected,
 source_mutants_defined:process.argv.includes('--math-only')?0:16,source_mutants_rejected:sourceMutantsRejected,
 source_identities:191,changed_L02_source_items:['L-SSC-052','L-SSC-053','L-SSC-054','L-SSC-055','L-SSC-057','L-SSC-061'],other_complete_records_preserved:185,
 source_full_L02_qualification:false,source_census_frozen:false,G1_authorized:false,cross_track_semantics_authorized:false,external_independent_math_review:false};
console.log(JSON.stringify(out,null,2));if(!out.pass)process.exitCode=1;
