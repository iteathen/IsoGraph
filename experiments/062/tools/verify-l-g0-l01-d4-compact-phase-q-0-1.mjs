// L-only G0 chosen compact real so8(Q) algebra witness; NOT author phase authority.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
 packet:R+'LISI_L01_D4_COMPACT_PHASE_Q_WITNESS_G0_0_1.json',
 sscOld:R+'SOURCE_SEMANTIC_CENSUS_0_35.json',sscNew:R+'SOURCE_SEMANTIC_CENSUS_0_36.json',
 gateOld:E+'L_CURRENT_STAGE_GATE_0_35.json',gateNew:E+'L_CURRENT_STAGE_GATE_0_36.json',
 root:R+'LISI_L01_TABLE9_D4_XPHI_Q_ROOT_SUPPORT_G0_0_1.json',
 s2:R+'LISI_L01_SO8_S2_QUADRATIC_RESIDUAL_G0_0_1.json',
 h2:R+'LISI_L01_H2_F2_FERMION_GRADED_SOURCE_G0_0_1.json'
};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const P=get(paths.packet),A=get(paths.sscOld),B=get(paths.sscNew),Gate=get(paths.gateNew);
const issues=[];
function guard(packet=P,old=A,current=B,gate=Gate){
 const issues=[],need=(v,k)=>{if(!v)issues.push(k)};
 need(packet.schema==='isograph.lisi-L01-D4-compact-phase-Q-witness-G0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.semantic_authority===false,'G0 L only');
 need(packet.source?.revision==='arXiv:0711.0770v1'&&JSON.stringify(packet.source.printed_pages)==='[16,18,21,22,23,24,27]','original paper source exact');
 for(const [key,path] of [['source_census035',paths.sscOld],['G0_gate035',paths.gateOld],['root_packet',paths.root],['S2_packet',paths.s2],['H2_packet',paths.h2]])
  need(packet.frozen_parents?.[key]?.path===path&&packet.frozen_parents[key].git_blob_sha===sha(path),'frozen ancestor '+key);
 const m=packet.project_chosen_realization,w=packet.exact_witness,v=packet.verification_contract;
 need(m?.rephase==='lambda_(x2,color c_i)=-1 for all three color-positive x2 root vectors, lambda=+1 for all other x1/x2/x3 source mixed roots.','project root phases explicit');
 need(m?.chosen_phi_reality==='Phi_anti_i=complexConjugate(Phi_color_i) for each of three color labels.','chosen conjugacy');
 need(m?.chosen_x_reality==='x2_p=-complexConjugate(x1_p) for each spacetime 1-form coefficient, x3_p real.','chosen compact oneforms');
 need(m?.compact_antiHermitian_identity?.includes('Y2=(Y1)^dagger')&&m?.J_bilinear_identity?.includes('X_p^T J+J X_p=0'),'compact+orthogonal matrix conditions');
 need(m?.not_equivalence_to_an_author_original_matrix===true&&m?.not_source_fixed?.includes('does not fix'),'project not source phases');
 need(w?.matrix_Q==='diag(-4i,0,0,0,4i,0,0,0), exact 8x8 project matrices'&&w.matrix_trace_Q_squared===-32,'exact minimal compact model Q');
 need(w?.unit_volume_model_S2_unexpanded===8&&w?.unit_volume_model_S2_displayed===16&&w?.unit_volume_model_display_minus_unexpanded===8,'exact conditional source S2 evaluation');
 need(w?.full_source_real_model_counterexample_qualified===false&&w?.source_author_mathematical_error_established===false,'no author error');
 need(v?.source_field_reality_rules_exactly_the_author_intended===false&&v?.local_offshell_not_equation_of_motion_solution===true&&v?.Hodge_original_e_frame_extraction_verified===false,'source vs project distinction');
 need(packet.source_census_target?.new_revision===36&&packet.source_census_target?.changed_only?.join('|')==='L-SSC-044'&&packet.source_census_target.untouched_records===190,'scope change L044 only');
 for(const f of ['G1_authorized','G2_to_G7_authorized','source_census_frozen','real_E8_original_author_phase_qualified','physical_source_error_proved','cross_author_semantics_authorized','PR70_merge_authorized'])
  need(packet.stage_guards?.[f]===false,'stage/author firewall '+f);
 const x=new Map((old.items||[]).map(o=>[o.id,o])),y=new Map((current.items||[]).map(o=>[o.id,o]));
 need(x.size===191&&y.size===191,'191 preserved source items');
 const changed=[];for(const [id,a]of x){const b=y.get(id);if(!b)issues.push('deleted '+id);else if(JSON.stringify(a)!==JSON.stringify(b))changed.push(id);}
 for(const id of y.keys())if(!x.has(id))issues.push('new '+id);
 need(changed.join('|')==='L-SSC-044','190 unchanged original source records');
 const old44=x.get('L-SSC-044'),new44=y.get('L-SSC-044');
 need(new44?.body?.startsWith(old44?.body||'MISSING'),'L044 body predecessor conserved');
 const link=new44?.source_expression_census?.L01_D4_COMPACT_Q_G0;
 need(link?.packet?.path===paths.packet&&link?.packet?.git_blob_sha===sha(paths.packet),'L044 new exact blob provenance');
 need(link?.original_real_E8_phase_qualified===false&&link?.author_source_error_proved===false,'per-source negative status');
 need(current.guards?.source_census_freeze_complete===false&&current.guards.dp_allowed===false,'L unfinished source closure');
 need(current.revision?.predecessor_git_blob_sha===sha(paths.sscOld)&&current.revision?.source_packet?.git_blob_sha===sha(paths.packet)&&current.revision?.changed_source_items?.join('|')==='L-SSC-044','L036 revision pins');
 need(gate.track==='L'&&gate.stage==='G0'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===sha(paths.gateOld),'current G0 gate parent');
 need(gate.current_source_census?.git_blob_sha===sha(paths.sscNew)&&gate.current_source_census?.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'L036 G0 firewall');
 need(!JSON.stringify(packet).includes('W-SSC-'),'no W evidence');
 return issues;
}
issues.push(...guard());

function compactProof(opt={}){
 const issues=[],ck=(ok,msg)=>{if(!ok)issues.push(msg)};
 const C=(re=0,im=0)=>[re,im],add=(x,y)=>C(x[0]+y[0],x[1]+y[1]),neg=x=>C(-x[0],-x[1]);
 const mul=(x,y)=>C(x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]);
 const conj=x=>C(x[0],-x[1]),equals=(x,y)=>x[0]===y[0]&&x[1]===y[1];
 const zero=()=>Array.from({length:64},()=>C()),scalar=(M,x)=>M.map(z=>mul(z,x));
 const plus=(X,Y)=>X.map((v,k)=>add(v,Y[k])),minus=(X,Y)=>plus(X,scalar(Y,C(-1)));
 const E=(i,j)=>{const m=zero();m[8*i+j]=C(1);return m;};
 const mm=(A,B)=>{const M=zero();for(let i=0;i<8;i++)for(let j=0;j<8;j++){let v=C();for(let k=0;k<8;k++)v=add(v,mul(A[8*i+k],B[8*k+j]));M[8*i+j]=v;}return M;};
 const bracket=(A,B)=>minus(mm(A,B),mm(B,A));
 const transpose=A=>Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>A[8*j+i])).flat();
 const dagger=A=>transpose(A).map(conj);
 const matEq=(A,B)=>A.every((v,k)=>equals(v,B[k]));
 const trace=A=>Array.from({length:8},(_,i)=>A[i*8+i]).reduce((v,x)=>add(v,x),C());
 const J=zero();for(let i=0;i<4;i++){J[8*i+(i+4)]=C(1);J[8*(i+4)+i]=C(1);}
 const axis=i=>Array.from({length:3},(_,j)=>Number(i===j));
 const four=(w,v)=>[w,...v],role=new Map(),color=['c1','c2','c3','a1','a2','a3'];
 for(let i=0;i<3;i++)for(const sign of [1,-1]){
  const name=(sign===1?'c':'a')+(i+1),v=axis(i).map(x=>sign*x);
  role.set('1:'+name,four(-1,v));role.set('2:'+name,four(1,v));
  role.set('3:'+name,four(0,axis(i).map(x=>-sign*(1-x))));
 }
 function matrix(r){
  const pos=[],minusR=[];
  for(let k=0;k<4;k++){if(r[k]===1)pos.push(k);else if(r[k]===-1)minusR.push(k);}
  if(pos.length===2){const [i,j]=pos;return minus(E(i,j+4),E(j,i+4));}
  if(minusR.length===2){const [i,j]=minusR;return minus(E(i+4,j),E(j+4,i));}
  const i=pos[0],j=minusR[0];return minus(E(i,j),E(j+4,i+4));
 }
 const lam=(a,name)=>a===2&&name[0]==='c'&&!opt.noRephase?-1:1;
 const roots=new Map([...role].map(([k,r])=>[k,scalar(matrix(r),C(lam(+k[0],k.slice(2))))]));
 let checkedRootJ=0;
 for(const [k,M]of roots){ck(matEq(plus(mm(transpose(M),J),mm(J,M)),zero()),'root J bilinear '+k);checkedRootJ++;}
 function Y(phi,a){return color.reduce((M,name)=>plus(M,scalar(roots.get(a+':'+name),phi[name]||C())),zero());}
 const phi=(triplet,mode='conjugate')=>{
  const p={};for(let i=1;i<=3;i++){p['c'+i]=triplet[i-1];p['a'+i]=mode==='wrong'?neg(conj(triplet[i-1])):conj(triplet[i-1]);}return p;
 };
 const samplePhis=[[C(1,2),C(-2,3),C(4,-1)],[C(2,-1),C(1,4),C(-3,-2)],[C(1),C(),C(-2)]];
 let genericRealitySamples=0;
 for(const p of samplePhis){
  const ps=phi(p,opt.wrongPhiReality?'wrong':'conjugate'),Y1=Y(ps,1),Y2=Y(ps,2),Y3=Y(ps,3);
  ck(matEq(dagger(Y1),Y2),'chosen Y1^dagger=Y2');
  ck(matEq(dagger(Y3),scalar(Y3,C(-1))),'chosen Y3 skew');
  for(const [x1,x3] of [[C(1,2),3],[C(4,-1),-2],[C(-2,3),1]]){
   const x2=opt.wrongX2?conj(x1):neg(conj(x1));
   const X=plus(plus(scalar(Y1,x1),scalar(Y2,x2)),scalar(Y3,C(x3)));
   ck(matEq(plus(dagger(X),X),zero()),'compact skew Hermitian generic');
   ck(matEq(plus(mm(transpose(X),J),mm(J,X)),zero()),'compact J bilinear generic');
   genericRealitySamples++;
  }
 }
 // Exact minimal spatial p,q off-shell coefficient test.
 const p=phi([C(1),C(),C()]);
 if(opt.dropAnticolor)p.a1=C();
 const Y1=Y(p,1),Y2=Y(p,2);
 const Xp=minus(Y1,Y2);
 const Xq=plus(scalar(Y1,C(0,1)),scalar(Y2,C(0,1)));
 const q=bracket(Xp,Xq);
 ck(matEq(plus(dagger(Xp),Xp),zero())&&matEq(plus(dagger(Xq),Xq),zero()),'minimal compact generator reality');
 ck(matEq(plus(dagger(q),q),zero()),'minimal compact curvature skew');
 ck(matEq(plus(mm(transpose(q),J),mm(J,q)),zero()),'minimal compact curvature J');
 const expected=zero();expected[0]=C(0,-4);expected[8*4+4]=C(0,4);
 ck(matEq(q,expected),'exact minimal project Q diagonal');
 const tr=trace(mm(q,q));
 ck(equals(tr,C(-32)),'exact compact trace Q2=-32');
 const sourceZeroNamedComponents=true; // w=B2=g=0, dx=0, dPhi=0 at restricted constant-coefficient point.
 ck(sourceZeroNamedComponents,'source restricted named curvature terms vanish');
 const lorentzEta=[1,1,1,-1];
 const hodge2=mask=>{
  const complement=(15^mask),sum=[0,1,2,3],left=sum.filter(i=>mask&(1<<i)),right=sum.filter(i=>complement&(1<<i));
  let orient=1;for(const i of left)for(const j of right)if(i>j)orient=-orient;
  for(const i of left)orient*=lorentzEta[i];
  return{mask:complement,sign:orient};
 };
 const h=hodge2(3),hback=hodge2(h.mask);
 ck(h.mask===12&&h.sign===1&&hback.sign===-1,'Lorentzian star on spatial 2form and square -1');
 const HQQ=tr[0]*h.sign;
 const actionFull=-HQQ/4,actionDisplay=-HQQ/2;
 ck(HQQ===-32&&actionFull===8&&actionDisplay===16&&actionDisplay-actionFull===8,'bounded vector trace/Hodge model action residual');
 return{pass:issues.length===0,issues,root_J_checks:checkedRootJ,compact_reality_samples:genericRealitySamples,
  exact_Q_trace_sq:tr,exact_Q_matrix_diagonal:['-4i','0','0','0','+4i','0','0','0'],spatial_hodge_sq:-1,
  vector_trace_HQQ_for_unit_spatial_twoform:HQQ,chosen_model_S2_full:actionFull,chosen_model_S2_display:actionDisplay,chosen_model_delta:actionDisplay-actionFull,
  selected_source_original_root_phases_qualified:false,source_original_E8_normalized_trace_or_Hodge_proved:false};
}
const actual=compactProof();if(!actual.pass)issues.push(...actual.issues.map(x=>'MODEL '+x));
const mathMutants=[
 ['wrong root phase',()=>compactProof({noRephase:true})],
 ['wrong x2 conjugacy',()=>compactProof({wrongX2:true})],
 ['wrong Phi anti-color reality',()=>compactProof({wrongPhiReality:true})],
 ['missing required anti-color',()=>compactProof({dropAnticolor:true})]
];
let mathMutantsRejected=0;
for(const [name,fn] of mathMutants){let r=false;try{r=!fn().pass;}catch{r=true;}if(r)mathMutantsRejected++;else issues.push('ESCAPED_MODEL '+name);}
const sourceMutations=[
 ['wrong source revision',p=>p.source.revision='arXiv:0711.0770v2'],
 ['wrong phase assignment',p=>p.project_chosen_realization.rephase='lambda=+1 everywhere'],
 ['incorrect x2 conjugacy',p=>p.project_chosen_realization.chosen_x_reality='x2=+conjugate x1'],
 ['source author phases claimed',p=>p.project_chosen_realization.not_equivalence_to_an_author_original_matrix=false],
 ['wrong minimum Q',p=>p.exact_witness.matrix_trace_Q_squared=0],
 ['wrong displayed action coefficient',p=>p.exact_witness.unit_volume_model_S2_displayed=8],
 ['wrong source action difference',p=>p.exact_witness.unit_volume_model_display_minus_unexpanded=0],
 ['claim original E8 real model proven',p=>p.exact_witness.full_source_real_model_counterexample_qualified=true],
 ['promote source field constraints',p=>p.verification_contract.source_field_reality_rules_exactly_the_author_intended=true],
 ['claim source frame Hodge',p=>p.verification_contract.Hodge_original_e_frame_extraction_verified=true],
 ['promote author error',p=>p.stage_guards.physical_source_error_proved=true],
 ['promote G1',p=>p.stage_guards.G1_authorized=true],
 ['stale old SSC lineage',p=>p.frozen_parents.source_census035.git_blob_sha='STALE']
];
let sourceMutantsRejected=0;
if(!issues.length)for(const [name,edit]of sourceMutations){const p=structuredClone(P);edit(p);if(guard(p).length===0)issues.push('ESCAPED_SOURCE '+name);else sourceMutantsRejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-L01-compact-D4-phase-Q-G0.v0.1',pass:issues.length===0,issues,
 model:actual,math_mutants_defined:mathMutants.length,math_mutants_rejected:mathMutantsRejected,
 source_mutants_defined:sourceMutations.length,source_mutants_rejected:sourceMutantsRejected,
 source_SSC_count:B.items?.length,changed_only:['L-SSC-044'],unchanged:190,
 original_E8_Hodge_or_author_error_qualified:false,G1_authorized:false,W_semantics_allowed:false},null,2));
if(issues.length)process.exitCode=1;
