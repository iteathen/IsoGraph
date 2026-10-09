// L-only G0: exact D4 root-phase coordinate gauge versus shared-Phi rank-one transport.
// Frozen L01 Table 9 and §2.4.1 provide root labels and proposed factorization only.
// Chosen complex Chevalley phases and resulting field family are project diagnostics.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const file={
 packet:R+'LISI_L01_D4_ROOT_PHASE_RANK_ONE_TRANSPORT_G0_0_1.json',
 old:R+'SOURCE_SEMANTIC_CENSUS_0_36.json',next:R+'SOURCE_SEMANTIC_CENSUS_0_37.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_36.json',newGate:E+'L_CURRENT_STAGE_GATE_0_37.json',
 root:R+'LISI_L01_TABLE9_D4_XPHI_Q_ROOT_SUPPORT_G0_0_1.json',
 compact:R+'LISI_L01_D4_COMPACT_PHASE_Q_WITNESS_G0_0_1.json',
 s2:R+'LISI_L01_SO8_S2_QUADRATIC_RESIDUAL_G0_0_1.json'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const mathOnly=process.argv.includes('--math-only');
const issues=[];
function guard(p,old,current,gate) {
 const errors=[],expect=(ok,msg)=>{if(!ok)errors.push(msg);};
 expect(p?.schema==='isograph.lisi-L01-D4-phase-rank-one-transport-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'L/G0-only packet');
 expect(p?.source?.revision==='arXiv:0711.0770v1'&&JSON.stringify(p.source.printed_pages)==='[16,21,22,23,24,27]','original source revision/pages');
 for(const [k,path] of [['ssc036',file.old],['gate036',file.oldGate],['root_source',file.root],['compact_project',file.compact],['prior_Q_action',file.s2]])
  expect(p.parents?.[k]?.path===path&&p.parents[k].git_blob_sha===sha(path),'parent provenance '+k);
 expect(p?.source?.source_three_coarse_groups?.join('|')==='combined abelian w+B2|mixed xPhi|strong su3','source 3 H2 groups');
 expect(p?.source?.fixed_evidence?.includes('three six-root xPhi families')&&p.source.fixed_evidence.includes('six shared colored/anticolored Phi'),'root labels and same Phi');
 expect(p?.mathematical_problem?.role_labels?.join('|')==='x1|x2|x3'&&p.mathematical_problem.color_labels?.join('|')==='c1|c2|c3|a1|a2|a3','3x6 factor carriers');
 expect(p?.mathematical_problem?.source_project_rank_one_family?.includes('same six Phi_c')&&p.mathematical_problem.true_coordinate_transport.includes('/lambda_(a,c)'),'exact rank-one versus basis-coordinate distinction');
 expect(p?.mathematical_problem?.factorization_invariant_condition?.includes('rank one')&&p.mathematical_problem.separable_phase_condition.includes('lambda_(a,c)=u_a*v_c'),'precise phase factorization criterion');
 const a=p?.two_exact_project_completions;
 expect(a?.unphased?.matrix_rank===1&&a.unphased.nonzero_inverse_phase_2x2_minors===0&&a.unphased.Q12_polynomial_nonzero_Phi_monomials===9&&a.unphased.w_Cartan_Phi_monomials===0&&a.unphased.strong_root_Phi_monomials===6,'unphased source root-project profile');
 expect(a?.chosen_compact?.matrix_rank===2&&a.chosen_compact.inverse_phase_2x2_minor_cases===45&&a.chosen_compact.nonzero_inverse_phase_2x2_minors===18,'nonseparable compact rephase 3x6 minors');
 expect(a?.chosen_compact?.Q12_polynomial_nonzero_Phi_monomials===3&&a.chosen_compact.w_Cartan_Phi_monomials===3&&a.chosen_compact.other_Cartan_Phi_monomials===0&&a.chosen_compact.strong_root_Phi_monomials===0,'compact chosen phase output channels');
 expect(a?.separable_control?.rank===1&&a.separable_control.nonzero_inverse_phase_2x2_minors===0&&a.separable_control.rank_one_transport_preserved===true,'separable rephasing control');
 expect(p?.scoped_trace_invariant?.distinct_quartic_monomials===6&&p.scoped_trace_invariant.project_both_phase_policies==='tr([Y1,Y2]^2)=8*(Phi_a1*Phi_c1+Phi_a2*Phi_c2+Phi_a3*Phi_c3)^2','trace invariant retained');
 const n=p?.adversarial_and_discovery_disposition;
 for(const f of ['source_field_phase_conventions_extracted','source_factorized_field_family_equivalence_qualified','source_original_real_E8_phase_map_qualified','source_Hodge_trace_E8_admissibility_qualified','source_author_math_error_established'])
  expect(n?.[f]===false,'no unsupported source phase/author claim '+f);
 expect(p?.census?.target_revision===37&&p.census.total_source_IDs===191&&p.census.changed_only.join('|')==='L-SSC-040|L-SSC-044'&&p.census.unchanged_complete_predecessor_records===189,'census delta declared correctly');
 for(const f of ['G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_comparison_authorized','full_E8_theorem_qualified','source_original_phase_identification_qualified','real_E8_source_Hodge_qualified','author_source_error_qualified','external_cold_review_passed','PR70_merge_authorized','author_outreach_authorized'])
  expect(p.stage_guards?.[f]===false,'stage firewall '+f);
 const A=new Map((old.items||[]).map(x=>[x.id,x])),B=new Map((current.items||[]).map(x=>[x.id,x]));
 expect(A.size===191&&B.size===191,'191 stable unique source IDs');
 const changed=[];
 for(const [id,obj] of A) {const b=B.get(id);if(!b)errors.push('missing '+id);else if(JSON.stringify(obj)!==JSON.stringify(b))changed.push(id);}
 for(const id of B.keys())if(!A.has(id))errors.push('invented '+id);
 expect(changed.join('|')==='L-SSC-040|L-SSC-044','189 untouched complete source records ('+changed+')');
 for(const id of ['L-SSC-040','L-SSC-044']){
  const previous=A.get(id),revised=B.get(id);
  expect(revised?.body?.startsWith(previous?.body||'MISSING'),'positive predecessor source preserved '+id);
  const provenance=revised?.source_expression_census?.L01_D4_PHASE_RANK_ONE_G0;
  expect(provenance?.source_packet?.path===file.packet&&provenance?.source_packet?.git_blob_sha===sha(file.packet),'exact new source claim provenance '+id);
  expect(provenance?.root_phase_authorized_from_source===false&&provenance?.source_factorization_equivalence_qualified===false&&provenance?.source_real_E8_Hodge_or_action_qualified===false&&provenance?.author_source_error_proved===false&&provenance?.G1_authorized===false,'per-item incomplete G0 scope '+id);
 }
 expect(current.guards?.source_census_freeze_complete===false&&current.guards?.dp_allowed===false,'no source freeze or DP');
 expect(current.revision?.predecessor_git_blob_sha===sha(file.old)&&current.revision?.source_packet?.git_blob_sha===sha(file.packet)&&current.revision?.changed_source_items?.join('|')==='L-SSC-040|L-SSC-044','SSC0.37 source lineage');
 expect(gate?.track==='L'&&gate?.stage==='G0'&&gate?.semantic_authority===false&&gate?.predecessor_gate?.git_blob_sha===sha(file.oldGate),'G0 gate parent');
 expect(gate.current_source_census?.git_blob_sha===sha(file.next)&&gate.current_source_census?.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'G0 current gate fail-closed');
 expect(!JSON.stringify(p).includes('W-SSC-'),'W semantics quarantined');
 return errors;
}
function phaseProof(overrides={}) {
 const errors=[],ck=(ok,msg)=>{if(!ok)errors.push(msg);};
 const n=8,zero=()=>new Array(64).fill(0),E=(i,j)=>{const M=zero();M[8*i+j]=1;return M;};
 const add=(A,B)=>A.map((v,i)=>v+B[i]),sub=(A,B)=>A.map((v,i)=>v-B[i]);
 const sc=(A,k)=>A.map(v=>k*v),eq=(A,B)=>A.length===B.length&&A.every((v,i)=>v===B[i]);
 const mm=(A,B)=>{const M=zero();for(let i=0;i<8;i++)for(let j=0;j<8;j++){let v=0;for(let k=0;k<8;k++)v+=A[i*8+k]*B[k*8+j];M[i*8+j]=v;}return M;};
 const comm=(A,B)=>sub(mm(A,B),mm(B,A));
 const trace=A=>[0,1,2,3,4,5,6,7].reduce((v,i)=>v+A[i*8+i],0);
 const axis=i=>[0,1,2].map(j=>Number(i===j)),root=(w,a)=>[w,...a],names=['c1','c2','c3','a1','a2','a3'];
 const roles=new Map();
 for(let i=0;i<3;i++)for(const sg of [1,-1]){
  const label=(sg===1?'c':'a')+(i+1),v=axis(i).map(t=>sg*t);
  roles.set('1:'+label,root(-1,v));roles.set('2:'+label,root(1,v));
  roles.set('3:'+label,root(0,axis(i).map(t=>-sg*(1-t))));
 }
 const rootMat=r=>{
  const pos=[],neg=[];
  for(let i=0;i<4;i++){if(r[i]===1)pos.push(i);else if(r[i]===-1)neg.push(i);else if(r[i]!==0)throw Error('not a D4 root');}
  if(pos.length===2&&neg.length===0){const [i,j]=pos;return sub(E(i,j+4),E(j,i+4));}
  if(neg.length===2&&pos.length===0){const [i,j]=neg;return sub(E(i+4,j),E(j+4,i));}
  if(pos.length===1&&neg.length===1){return sub(E(pos[0],neg[0]),E(neg[0]+4,pos[0]+4));}
  throw Error('invalid root '+r);
 };
 const gen=new Map([...roles].map(([k,v])=>[k,rootMat(v)]));
 const base=Array.from({length:3},()=>new Array(6).fill(1));
 const chosen=Array.from({length:3},()=>new Array(6).fill(1));
 for(let c=0;c<3;c++)chosen[1][c]=-1;
 const separable=Array.from({length:3},(_,a)=>[1,-1,1,-1,1,-1].map(v=>v*[1,-1,1][a]));
 const phase=overrides.phase || chosen;
 const minorCounts=phase=>{
  let nonzero=0,total=0,first=null;
  for(let a=0;a<3;a++)for(let b=a+1;b<3;b++)for(let c=0;c<6;c++)for(let d=c+1;d<6;d++){
   const delta=phase[a][c]*phase[b][d]-phase[a][d]*phase[b][c];total++;
   if(delta){nonzero++;first??=[a,b,c,d,delta];}
  }
  return {total,nonzero,rank:nonzero?2:1,first};
 };
 const mBase=minorCounts(base),mChosen=minorCounts(phase),mSeparable=minorCounts(separable);
 ck(mBase.total===45&&mBase.nonzero===0,'identity-phase rank one');
 ck(mChosen.total===45&&mChosen.nonzero===18,'chosen phase has exactly 18 nonzero minors');
 ck(mSeparable.total===45&&mSeparable.nonzero===0,'factorable phase gauge control');
 const coefficient=(a,c,x,phi)=>x[a]*phi[c];
 const mapElement=(x,phi,phase,transport)=> {
  let M=zero();
  for(let a=0;a<3;a++)for(let c=0;c<6;c++){
   const factor=phase[a][c],coord=coefficient(a,c,x,phi)*(transport?1/factor:1);
   M=add(M,sc(gen.get((a+1)+':'+names[c]),coord*factor));
  }
  return M;
 };
 let transportCases=0,phaseFixedDifferent=0,rankTwoTransports=0;
 const seeds=[
  {p:[1,-2,3],q:[-3,1,2],phi:[1,2,3,-1,2,-2]},
  {p:[2,3,-1],q:[1,-4,2],phi:[2,1,-2,3,-1,1]},
  {p:[1,1,1],q:[2,-1,3],phi:[-2,3,1,2,-1,4]},
  {p:[-1,2,-3],q:[3,1,-2],phi:[3,2,-1,-3,1,2]}
 ];
 for(const sample of seeds){
  const Xp=mapElement(sample.p,sample.phi,base,false),Xq=mapElement(sample.q,sample.phi,base,false);
  const Tp=mapElement(sample.p,sample.phi,phase,true),Tq=mapElement(sample.q,sample.phi,phase,true);
  ck(eq(Xp,Tp)&&eq(Xq,Tq),'inverse coordinate transport fixes connection coefficients');
  ck(eq(comm(Xp,Xq),comm(Tp,Tq)),'inverse coordinate transport fixes curvature');
  const Hp=mapElement(sample.p,sample.phi,phase,false),Hq=mapElement(sample.q,sample.phi,phase,false);
  if(!eq(Hp,Xp)||!eq(comm(Hp,Hq),comm(Xp,Xq)))phaseFixedDifferent++;
  const M=Array.from({length:3},(_,a)=>Array.from({length:6},(_,c)=>coefficient(a,c,sample.p,sample.phi)/phase[a][c]));
  if(minorCounts(M).nonzero>0)rankTwoTransports++;
  transportCases++;
 }
 ck(transportCases===4&&phaseFixedDifferent===4&&rankTwoTransports===4,'phase changes fixed-parameter family but never the fully transported connection');
 function poly12(P){
  let poly=new Map();
  for(let c=0;c<6;c++)for(let d=0;d<6;d++){
   const key=[names[c],names[d]].sort().join('*');
   const matrix=sc(comm(gen.get('1:'+names[c]),gen.get('2:'+names[d])),P[0][c]*P[1][d]);
   poly.set(key,add(poly.get(key)||zero(),matrix));
  }
  for(const [k,v] of [...poly])if(eq(v,zero()))poly.delete(k);
  return poly;
 }
 const original=poly12(base),modified=poly12(phase);
 function classify(poly){
  let w=0,other=0,strong=0;
  for(const [k,M] of poly){
   const ifw=M[0]!==0,ifcolor=[1,2,3].some(i=>M[i*8+i]!==0);
   const offdiag=M.some((v,z)=>v!==0&&Math.floor(z/8)!==z%8);
   if(ifw)w++;if(ifcolor)other++;if(offdiag)strong++;
   ck(!ifw||!ifcolor,'no simultaneously w and color Cartan coefficient '+k);
  }
  return {nonzero_monomials:poly.size,w_Cartan:w,other_Cartan:other,strong_root:strong};
 }
 const first=classify(original),second=classify(modified);
 ck(JSON.stringify(first)==='{"nonzero_monomials":9,"w_Cartan":0,"other_Cartan":3,"strong_root":6}','original Chevalley Q12 polynomial sector profile');
 ck(JSON.stringify(second)==='{"nonzero_monomials":3,"w_Cartan":3,"other_Cartan":0,"strong_root":0}','nonseparable phase changes Q12 output sector profile');
 function traceQuartic(poly){
  const r=new Map();
  for(const [ka,A] of poly)for(const [kb,B] of poly){
   const term=(ka+'*'+kb).split('*').sort().join('*');
   r.set(term,(r.get(term)||0)+trace(mm(A,B)));
  }
  for(const [k,v] of [...r])if(!v)r.delete(k);
  return r;
 }
 const aTrace=traceQuartic(original),bTrace=traceQuartic(modified),expected=new Map();
 for(let i=1;i<=3;i++)for(let j=1;j<=3;j++){
  const key=['a'+i,'c'+i,'a'+j,'c'+j].sort().join('*');
  expected.set(key,(expected.get(key)||0)+8);
 }
 const polyEq=(a,b)=>a.size===b.size&&[...a].every(([k,v])=>b.get(k)===v);
 ck(aTrace.size===6&&polyEq(aTrace,expected),'unphased exact quartic tr(Q12^2)');
 ck(bTrace.size===6&&polyEq(bTrace,expected),'chosen phase exact same quartic trace despite sector transfer');
 const special={c1:1,a1:1},evalPoly=poly=>{let M=zero();for(const [key,A]of poly){const w=key.split('*').reduce((s,k)=>s*(special[k]||0),1);M=add(M,sc(A,w));}return M;};
 const Qa=evalPoly(original),Qb=evalPoly(modified);
 const diag=A=>[0,1,2,3,4,5,6,7].map(i=>A[i*8+i]);
 ck(JSON.stringify(diag(Qa))==='[0,2,0,0,0,-2,0,0]','unphased Q12 B-L/color Cartan example');
 ck(JSON.stringify(diag(Qb))==='[-2,0,0,0,2,0,0,0]','rephased Q12 w Cartan example');
 ck(trace(mm(Qa,Qa))===8&&trace(mm(Qb,Qb))===8&&!eq(Qa,Qb),'same quadratic norm does not imply same channel resolution');
 return{pass:errors.length===0,errors,phase_2x2_minor_total:45,
  identity_nonzero_minors:mBase.nonzero,chosen_nonzero_minors:mChosen.nonzero,separable_nonzero_minors:mSeparable.nonzero,
  generic_transport_sample_pairs:transportCases,nonseparable_fixed_param_changed_cases:phaseFixedDifferent,
  inverse_transport_rank_two_cases:rankTwoTransports,
  baseline_Q12:first,rephased_Q12:second,
  two_quartic_trace_polynomial_checks:[aTrace.size,bTrace.size],
  special_baseline_cartan_diagonal:diag(Qa),special_rephased_cartan_diagonal:diag(Qb),
  special_Q12_trace_squares:[trace(mm(Qa,Qa)),trace(mm(Qb,Qb))],
  source_original_phase_or_field_reality_established:false};
}
if(!mathOnly){
 const p=read(file.packet),old=read(file.old),current=read(file.next),gate=read(file.newGate);
 issues.push(...guard(p,old,current,gate));
}
const math=phaseProof();
if(!math.pass)issues.push(...math.errors.map(s=>'MATH '+s));
const phaseCases=[
 ['identity instead of chosen',Array.from({length:3},()=>new Array(6).fill(1))],
 ['flip all x2 roots',Array.from({length:3},(_,a)=>new Array(6).fill(a===1?-1:1))],
 ['flip only two x2 positive-color roots',Array.from({length:3},(_,a)=>Array.from({length:6},(_,c)=>a===1&&c<2?-1:1))],
 ['flip three x2 anti-color roots',Array.from({length:3},(_,a)=>Array.from({length:6},(_,c)=>a===1&&c>=3?-1:1))]
];
let phaseMutantsRejected=0;
for(const [name,phase] of phaseCases){
 let rejected=false;try{rejected=!phaseProof({phase}).pass;}catch{rejected=true;}
 if(!rejected)issues.push('ESCAPED phase math mutant '+name);else phaseMutantsRejected++;
}
const sourceMutations=[
 ['wrong L01 revision',p=>{p.source.revision='arXiv:0711.0770v2'}],
 ['drop shared Phi factor',p=>{p.mathematical_problem.source_project_rank_one_family='18 unrelated oneforms'}],
 ['declare root phases source-fixed',p=>{p.adversarial_and_discovery_disposition.source_field_phase_conventions_extracted=true}],
 ['change rank-one preservation condition',p=>{p.mathematical_problem.factorization_invariant_condition='all phases preserve shared Phi'}],
 ['declare chosen phase rank one',p=>{p.two_exact_project_completions.chosen_compact.matrix_rank=1}],
 ['forge 2x2 minors',p=>{p.two_exact_project_completions.chosen_compact.nonzero_inverse_phase_2x2_minors=0}],
 ['overwrite phase Q channel result',p=>{p.two_exact_project_completions.chosen_compact.strong_root_Phi_monomials=6}],
 ['alter quartic trace constant',p=>{p.scoped_trace_invariant.project_both_phase_policies='tr=0'}],
 ['claim physical E8 equivalence',p=>{p.adversarial_and_discovery_disposition.source_factorized_field_family_equivalence_qualified=true}],
 ['allow G1',p=>{p.stage_guards.G1_authorized=true}],
 ['allow W',p=>{p.stage_guards.cross_track_comparison_authorized=true}],
 ['stale source parent hash',p=>{p.parents.ssc036.git_blob_sha='STALE'}]
];
let sourceMutantsRejected=0;
if(!issues.length&&!mathOnly){
 const p=read(file.packet),old=read(file.old),current=read(file.next),gate=read(file.newGate);
 for(const [name,mutate] of sourceMutations){
  const changed=structuredClone(p);mutate(changed);
  if(guard(changed,old,current,gate).length===0)issues.push('ESCAPED source mutant '+name);
  else sourceMutantsRejected++;
 }
}
console.log(JSON.stringify({schema:'isograph.exp062-L01-phase-rank-one-transport-G0.v0.1',
 pass:issues.length===0,issues,math,phase_mutants_defined:phaseCases.length,phase_mutants_rejected:phaseMutantsRejected,
 source_mutants_defined:mathOnly?0:sourceMutations.length,source_mutants_rejected:sourceMutantsRejected,
 source_checks_skipped:mathOnly,SSC_ID_count:mathOnly?null:read(file.next).items.length,
 changed_source_items:['L-SSC-040','L-SSC-044'],unchanged_records:189,
 source_phase_qualified:false,source_factorized_field_equivalence_qualified:false,
 G1_authorized:false,cross_track_comparison_authorized:false,external_cold_verification_passed:false},null,2));
if(issues.length)process.exitCode=1;
