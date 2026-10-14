// L-only G0: source-root-compatible compact sign completion versus proposed shared-Phi rank one.
// Original source L01 arXiv:0711.0770v1 Table9 and §2.4.1: factorization is a proposal.
// The complex 8x8 Chevalley realization, dagger, and conjugacy rules are PROJECT choices.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={packet:R+'LISI_L01_D4_COMPACT_REALITY_SIGN_PHASE_G0_0_1.json',
 old:R+'SOURCE_SEMANTIC_CENSUS_0_37.json',now:R+'SOURCE_SEMANTIC_CENSUS_0_38.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_37.json',newGate:E+'L_CURRENT_STAGE_GATE_0_38.json',
 rankone:R+'LISI_L01_D4_ROOT_PHASE_RANK_ONE_TRANSPORT_G0_0_1.json',
 compact:R+'LISI_L01_D4_COMPACT_PHASE_Q_WITNESS_G0_0_1.json',
 table9:R+'LISI_L01_TABLE9_D4_XPHI_Q_ROOT_SUPPORT_G0_0_1.json'};
const load=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const gitBlob=f=>{const b=fs.readFileSync(f);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const issues=[],assert=(yes,msg)=>{if(!yes)issues.push(msg);};
function sourceGuard(packet,previous,current,gate){
 const errors=[],ck=(ok,msg)=>{if(!ok)errors.push(msg);};
 ck(packet?.schema==='isograph.lisi-L01-D4-compact-reality-phase-obstruction-G0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.authority===false,'source-local L G0');
 ck(packet?.original_source?.revision==='arXiv:0711.0770v1'&&packet.original_source.paper_pages.includes('§2.4.1 printed p22'),'frozen source and factorization locator');
 ck(packet.original_source.original_assertions.some(v=>v.includes('NOT a demonstrated uniqueness or mandatory theorem')),'original factorization modality is tentative');
 for(const [key,path] of [['ssc037',files.old],['gate037',files.oldGate],['rankone',files.rankone],['compact',files.compact],['table9',files.table9]])
  ck(packet.frozen_parents?.[key]?.path===path&&packet.frozen_parents[key].git_blob_sha===gitBlob(path),'frozen source ancestor '+key);
 const m=packet.project_model;
 ck(m?.color_roles?.join('|')==='c1|c2|c3|a1|a2|a3'&&m.families?.join('|')==='x1|x2|x3','three by six carrier');
 ck(m?.root_matrix_reality?.join('|')==='E_(1,ci)^dagger=+E_(2,ai)|E_(1,ai)^dagger=-E_(2,ci)|E_(3,ci)^dagger=-E_(3,ai)','root matrix dagger sign');
 ck(m?.matrix_checks===18&&m?.chosen_phase_class?.includes('+/-1'),'project matrix and unit sign scope');
 ck(m?.chosen_field_reality?.join('|')==='Phi_ai=complexConjugate(Phi_ci), i=1..3|x2=-complexConjugate(x1) as complex 1-form coefficients|x3 real 1-form coefficients','project scalar/oneform conjugacies');
 ck(m?.necessary_sufficient_compact_sign_constraints?.join('|')==='lambda_(2,ai)=lambda_(1,ci) for i=1..3|lambda_(2,ci)=-lambda_(1,ai) for i=1..3|lambda_(3,ai)=lambda_(3,ci) for i=1..3','all compact dagger constraints');
 ck(m?.independent_sign_choices===9&&m.compact_sign_assignments_enumerated===512&&m.all_45_rank_one_minors_defined===true,'exact exhaustive sign class');
 ck(JSON.stringify(m?.compact_phase_nonzero_minors_histogram)==='{"18":32,"22":192,"26":288}'&&m.minimum_nonzero_minors===18&&m.maximum_nonzero_minors===26&&m.rank_one_compact_sign_assignments===0,'full sign family histogram');
 ck(m?.local_phase_plaquette_identity?.includes('=+2')&&m.rank_one_transport_plaquette_identity.includes('vanishes'),'nonseparable phase plaquette');
 ck(m?.source_reality_choice_qualified===false&&m.all_complex_U1_phase_choices_exhausted===false&&m.real_E8_source_root_generators_identified===false,'not global phase or source real form');
 ck(packet.negative_controls?.last_round_compact_signs?.includes('18 nonzero rank-one minors'),'prior candidate negative controls');
 ck(packet.conservation_target?.changed_only?.join('|')==='L-SSC-040|L-SSC-044'&&packet.conservation_target.unchanged_complete_records===189&&packet.conservation_target.total_source_identities===191,'two item census delta');
 for(const key of ['source_factorization_mandatory_theorem','source_root_phases_fixed_by_table9','source_compact_conjugacy_fixed','source_full_E8_model_obstruction_proved','source_action_equality_falsified','author_mathematical_error_proved','external_cold_independent_review_passed','G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_synthesis_authorized','author_outreach_authorized','PR70_merge_authorized'])
  ck(packet.source_scope_guards?.[key]===false,'no unauthorized source/status claim '+key);
 const A=new Map((previous.items||[]).map(v=>[v.id,v])),B=new Map((current.items||[]).map(v=>[v.id,v]));
 ck(A.size===191&&B.size===191,'191 distinct source identities conserved');
 const changed=[];
 for(const [id,v]of A){const nxt=B.get(id);if(!nxt)errors.push('missing identity '+id);else if(JSON.stringify(v)!==JSON.stringify(nxt))changed.push(id);}
 for(const id of B.keys())if(!A.has(id))errors.push('invented identity '+id);
 ck(changed.join('|')==='L-SSC-040|L-SSC-044','exact 189 complete records unchanged ('+changed+')');
 for(const id of ['L-SSC-040','L-SSC-044']){
  const a=A.get(id),b=B.get(id),l=b?.source_expression_census?.L01_D4_COMPACT_SIGN_PHASE_G0;
  ck(b?.body?.startsWith(a?.body||'MISSING'),'source claim predecessor prefix '+id);
  ck(l?.packet?.path===files.packet&&l.packet.git_blob_sha===gitBlob(files.packet),'source-item exact G0 packet hash '+id);
  ck(l?.original_source_field_conjugacy_qualified===false&&l?.G1_authorized===false,'per-item source limitations '+id);
 }
 ck(current.guards?.source_census_freeze_complete===false&&current.guards.dp_allowed===false,'SSC38 still unfrozen');
 ck(current.revision?.predecessor_git_blob_sha===gitBlob(files.old)&&current.revision?.source_packet?.git_blob_sha===gitBlob(files.packet)&&current.revision?.changed_source_items?.join('|')==='L-SSC-040|L-SSC-044','SSC38 parent provenance');
 ck(gate.stage==='G0'&&gate.track==='L'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===gitBlob(files.oldGate),'G0 procedural stage lineage');
 ck(gate.current_source_census?.git_blob_sha===gitBlob(files.now)&&gate.current_source_census?.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'G0 gate source and W firewall');
 ck(!JSON.stringify(packet).includes('W-SSC-'),'no W semantic import');
 return errors;
}
// Independent root-matrix conjugation and entire compact +/- phase search.
// Implementation uses exact integer matrix entries; no random seeds or sampling of phases.
function model(opts={}){
 const failures=[],ck=(v,s)=>{if(!v)failures.push(s);};
 const dim=8,zero=()=>new Array(64).fill(0);
 const E=(i,j)=>{const A=zero();A[i*dim+j]=1;return A;};
 const difference=(a,b)=>a.map((v,i)=>v-b[i]);
 const sum=(a,b)=>a.map((v,i)=>v+b[i]);
 const neg=a=>a.map(v=>-v);
 const mul=(a,b)=>{const M=zero();for(let i=0;i<8;i++)for(let k=0;k<8;k++)if(a[i*8+k])for(let j=0;j<8;j++)M[i*8+j]+=a[i*8+k]*b[k*8+j];return M;};
 const trans=a=>a.map((_,k)=>a[(k%8)*8+Math.floor(k/8)]);
 const equal=(a,b)=>a.length===b.length&&a.every((v,i)=>v===b[i]);
 const adj=a=>trans(a); // root matrices are real, dagger == transpose here
 const I=[0,1,2],names=['c1','c2','c3','a1','a2','a3'];
 const unit=(i)=>I.map(k=>Number(k===i));
 const roots={};
 for(let i=0;i<3;i++)for(const sign of [1,-1]){
  const color=(sign===1?'c':'a')+(i+1),vec=unit(i).map(v=>sign*v);
  roots['1:'+color]=[-1,...vec];
  roots['2:'+color]=[1,...vec];
  roots['3:'+color]=[0,...unit(i).map(v=>-sign*(1-v))];
 }
 const rootM=r=>{
  const pos=[],minus=[];
  for(let i=0;i<4;i++){if(r[i]===1)pos.push(i);else if(r[i]===-1)minus.push(i);else throwIfNonzero(r[i]);}
  function throwIfNonzero(v){if(v!==0)throw Error('Not D4 root');}
  if(pos.length===2)return difference(E(pos[0],pos[1]+4),E(pos[1],pos[0]+4));
  if(minus.length===2)return difference(E(minus[0]+4,minus[1]),E(minus[1]+4,minus[0]));
  if(pos.length===1&&minus.length===1)return difference(E(pos[0],minus[0]),E(minus[0]+4,pos[0]+4));
  throw Error('Invalid D4 root');
 };
 const generators=Object.fromEntries(Object.entries(roots).map(([k,r])=>[k,rootM(r)]));
 const J=zero();for(let i=0;i<4;i++){J[i*8+4+i]=1;J[(i+4)*8+i]=1;}
 let J_tests=0,dagger_tests=0;
 for(const [k,M]of Object.entries(generators)){
  ck(equal(sum(mul(trans(M),J),mul(J,M)),zero()),'D4 J-orthogonality '+k);J_tests++;
 }
 for(let i=1;i<=3;i++){
  const c='c'+i,a='a'+i;
  const cases=[
   ['1:'+c,'2:'+a,1],['1:'+a,'2:'+c,-1],
   ['2:'+c,'1:'+a,-1],['2:'+a,'1:'+c,1],
   ['3:'+c,'3:'+a,-1],['3:'+a,'3:'+c,-1]
  ];
  for(const [left,right,sign]of cases){ck(equal(adj(generators[left]),generators[right].map(v=>v*sign)),'root dagger '+left+' to '+right);dagger_tests++;}
 }
 ck(J_tests===18&&dagger_tests===18,'complete root matrix checks');
 const compactPhases=(r1,r3,opts={})=>{
  const r2=new Array(6);
  for(let i=0;i<3;i++){
   r2[i]=-(opts.wrongX2ColorSign?-1:1)*r1[i+3];
   r2[i+3]=(opts.wrongX2AntiSign?-1:1)*r1[i];
  }
  const s3=[...r3,...r3.map(v=>opts.wrongX3Sign?-v:v)];
  return [r1,r2,s3];
 };
 function minorCount(L){
  let n=0,total=0,plaquette=[];
  for(let a=0;a<3;a++)for(let b=a+1;b<3;b++)for(let c=0;c<6;c++)for(let d=c+1;d<6;d++){
   if(L[a][c]*L[b][d]!==L[a][d]*L[b][c])n++;
   total++;
  }
  for(let i=0;i<3;i++)plaquette.push(L[0][i]*L[1][i+3]-L[0][i+3]*L[1][i]);
  return{total,nonzero:n,plaquette};
 }
 const histogram={},representatives=[],list=[];
 for(let mask=0;mask<512;mask++){
  const r1=Array.from({length:6},(_,i)=>mask&(1<<i)?-1:1);
  const r3=Array.from({length:3},(_,i)=>mask&(1<<(i+6))?-1:1);
  const L=compactPhases(r1,r3,opts);
  const c=minorCount(L);
  ck(c.total===45,'every phase must enumerate 45 minors '+mask);
  if(c.plaquette.some(v=>v!==2))ck(false,'compact color/anti-color plaquette +2 '+mask);
  histogram[c.nonzero]=(histogram[c.nonzero]||0)+1;
  if(!representatives.some(x=>x.nonzero===c.nonzero))representatives.push({mask,nonzero:c.nonzero,phases:L});
  list.push(L);
 }
 ck(list.length===512,'all 2^9 compact sign assignments');
 ck(JSON.stringify(Object.keys(histogram).sort((a,b)=>a-b).map(x=>[+x,histogram[x]]))==='[[18,32],[22,192],[26,288]]','full compact sign minor histogram');
 const smallest=Math.min(...Object.keys(histogram).map(Number));
 ck(smallest===18,'compact chosen sign family has 18 nonzero minors minimum');
 // Verify the same 2x2-minor support on a genuine generic nonzero x_a * Phi_c
 // coefficient matrix transported inversely under the phase convention.
 const x=[2,-3,5],phi=[1,-2,3,4,-5,6];
 for(const r of representatives){
  const C=r.phases.map((row,a)=>row.map((lambda,c)=>x[a]*phi[c]/lambda));
  ck(minorCount(C).nonzero===r.nonzero,'phase versus generic transported shared-Phi coefficient minors '+r.mask);
 }
 // Independent complex arithmetic checks of compact X(p) from root matrices
 // for all source-color and anti-color Phi_c and generic complex x1.
 const cm=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
 const cadd=(a,b)=>[a[0]+b[0],a[1]+b[1]],ccj=x=>[x[0],-x[1]];
 const sourcePhi=[[1,2],[-3,1],[2,-1]];
 const fields=[
  {x1:[2,3],x3:2},
  {x1:[-1,4],x3:-1},
  {x1:[4,-2],x3:3}
 ];
 function compactModel(L,inputs){
  let M=Array.from({length:64},()=>[0,0]);
  const coeff=[inputs.x1,[-inputs.x1[0],inputs.x1[1]],[inputs.x3,0]];
  const scalars=[...sourcePhi,...sourcePhi.map(ccj)];
  for(let a=0;a<3;a++)for(let c=0;c<6;c++){
   const weight=cm(cm(coeff[a],scalars[c]),[L[a][c],0]),V=generators[(a+1)+':'+names[c]];
   M=M.map((z,k)=>V[k]?cadd(z,[weight[0]*V[k],weight[1]*V[k]]):z);
  }
  return M;
 }
 const conjTrans=M=>M.map((_,k)=>ccj(M[(k%8)*8+Math.floor(k/8)]));
 const cEQ=(A,B)=>A.every((v,i)=>v[0]===B[i][0]&&v[1]===B[i][1]);
 let compactSamples=0;
 for(const chosen of representatives)for(const item of fields){
  const M=compactModel(chosen.phases,item),dag=conjTrans(M);
  ck(cEQ(M,dag.map(v=>[-v[0],-v[1]])),'generic compact skew Hermitian '+chosen.mask);
  compactSamples++;
 }
 ck(compactSamples===9,'compact matrix reality independently checked on 9 multi-color samples');
 return{pass:failures.length===0,failures,root_J_tests:J_tests,root_dagger_tests:dagger_tests,
 phase_assignments:512,independent_sign_bits:9,all_2x2_minor_tests:512*45,
 distribution:histogram,min_nonzero_minors:smallest,zero_minor_phase_candidates:histogram[0]||0,
 all_color_anti_plaquettes:3*512,compact_generic_samples:compactSamples,
 factors_only_conditional:true,source_original_compact_reality_qualified:false};
}
const math=model();
if(!math.pass)issues.push(...math.failures.map(x=>'math '+x));
const hostile=[
 ['incorrect x2 c sign',()=>model({wrongX2ColorSign:true})],
 ['incorrect x2 anti sign',()=>model({wrongX2AntiSign:true})],
 ['incorrect x3 anti sign',()=>model({wrongX3Sign:true})]
];
let mathMutationsRejected=0;
for(const [name,f]of hostile){let escaped=false;try{escaped=f().pass;}catch(e){}if(escaped)issues.push('escaped math mutant '+name);else mathMutationsRejected++;}
let sourceMutationsRejected=0;
const mNames=[
 ['wrong PDF version',p=>{p.original_source.revision='arXiv:0711.0770v2'}],
 ['factorization now mandatory',p=>{p.source_scope_guards.source_factorization_mandatory_theorem=true}],
 ['flip first dagger',p=>{p.project_model.root_matrix_reality[0]='E_(1,ci)^dagger=-E_(2,ai)'}],
 ['flip x2 compact sign rule',p=>{p.project_model.necessary_sufficient_compact_sign_constraints[1]='lambda_(2,ci)=lambda_(1,ai) for i=1..3'}],
 ['forged minor histogram',p=>{p.project_model.compact_phase_nonzero_minors_histogram['18']=33}],
 ['forged rank-one compact',p=>{p.project_model.rank_one_compact_sign_assignments=1}],
 ['falsified all U1 proven',p=>{p.project_model.all_complex_U1_phase_choices_exhausted=true}],
 ['claim actual original E8',p=>{p.source_scope_guards.source_full_E8_model_obstruction_proved=true}],
 ['claim source author error',p=>{p.source_scope_guards.author_mathematical_error_proved=true}],
 ['claim G1',p=>{p.source_scope_guards.G1_authorized=true}],
 ['fake parent source blob',p=>{p.frozen_parents.ssc037.git_blob_sha='STALE'}],
 ['allow W comparison',p=>{p.source_scope_guards.cross_track_synthesis_authorized=true}]
];
if(!process.argv.includes('--math-only')){
 const packet=load(files.packet),previous=load(files.old),current=load(files.now),gate=load(files.newGate);
 issues.push(...sourceGuard(packet,previous,current,gate));
 if(!issues.length)for(const [name,mut]of mNames){const altered=structuredClone(packet);mut(altered);
  if(!sourceGuard(altered,previous,current,gate).length)issues.push('escaped source mutation '+name);else sourceMutationsRejected++;
 }
}
console.log(JSON.stringify({schema:'isograph.exp062-L01-D4-compact-sign-ansatz-G0.v0.1',
 pass:issues.length===0,issues,math,math_mutants_defined:hostile.length,math_mutants_rejected:mathMutationsRejected,
 source_mutants_defined:process.argv.includes('--math-only')?0:mNames.length,source_mutants_rejected:sourceMutationsRejected,
 source_validation_skipped:process.argv.includes('--math-only'),
 source_census_count:process.argv.includes('--math-only')?null:load(files.now).items.length,changed_full_source_records:['L-SSC-040','L-SSC-044'],untouched_full_records:189,
 original_author_phase_or_reality_qualified:false,source_census_frozen:false,G1_authorized:false,W_semantics_available:false,external_cold_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
