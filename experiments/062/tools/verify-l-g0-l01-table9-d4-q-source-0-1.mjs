// Experiment 062 L G0: source Table 9 xPhi roots, simple-factorized Q support.
// Algebraic model = chosen complex Chevalley so8; not a source-fixed real E8 model.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={
 packet:R+'LISI_L01_TABLE9_D4_XPHI_Q_ROOT_SUPPORT_G0_0_1.json',
 old:R+'SOURCE_SEMANTIC_CENSUS_0_34.json',next:R+'SOURCE_SEMANTIC_CENSUS_0_35.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_34.json',nextGate:E+'L_CURRENT_STAGE_GATE_0_35.json',
 h2:R+'LISI_L01_H2_F2_FERMION_GRADED_SOURCE_G0_0_1.json',
 s2:R+'LISI_L01_SO8_S2_QUADRATIC_RESIDUAL_G0_0_1.json'};
const data=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const Packet=data(files.packet),Old=data(files.old),Current=data(files.next),Gate=data(files.nextGate);
function sourceGuards(packet=Packet,old=Old,next=Current,gate=Gate){
 const errors=[],ck=(yes,msg)=>{if(!yes)errors.push(msg);};
 ck(packet.schema==='isograph.lisi-L01-table9-D4-xPhi-Q-root-support-G0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.semantic_authority===false,'source L G0 only');
 ck(packet.original_source?.revision==='arXiv:0711.0770v1'&&JSON.stringify(packet.original_source.printed_pages)==='[16,18,21,22,23,24,27]','source original paper/page scope');
 for(const [field,path]of [['census034',files.old],['gate034',files.oldGate],['H2_source',files.h2],['S2_source',files.s2]]){
  ck(packet.pinned_predecessors?.[field]?.path===path&&packet.pinned_predecessors[field].git_blob_sha===sha(path),'exact frozen source lineage '+field);
 }
 const t=packet.source_table9_root_data;
 ck(JSON.stringify(t?.coordinate_order)==='["w","x","y","z"]','source Cartan coordinate order');
 ck(t?.strong_su3==='w=0; xyz all ordered permutations of (+1,-1,0); six roots','six color roots');
 ck(t?.new_x1_Phi==='w=-1; xyz permutations of (±1,0,0); six roots','x1 source six weights');
 ck(t?.new_x2_Phi==='w=+1; xyz permutations of (±1,0,0); six roots','x2 source six weights');
 ck(t?.new_x3_Phi==='w=0; xyz ± permutations of (+1,+1,0) with a common ± sign; six roots','x3 source six weights');
 ck(t?.complete_D4_root_count===24&&t.Cartan_dimension===4&&t.source_so8_decomposition==='so(8) -> su(3) + u(1) + u(1) + 3*(3+bar3): 8+1+1+18=28','source D4 dimension');
 ck(t?.source_three_grouping?.length===3&&t.source_four_named_curvature_terms?.join('|')==='Fw|FB2|Fx|Fg'&&t.author_three_parts_wording_explained_as_coarse_group_count===true,'three coarse groups not four named terms');
 ck(t?.source_three_grouping?.[0]?.includes('Combined u(1)_w plus u(1)_(B-L)'),'source combined abelian sector');
 ck(t?.exact_Q_projection_and_all_coefficients_source_qualified===false,'group counting is not full Q projection');
 ck(t?.source_factorization?.includes('x_(a,p)')&&t.source_factorization?.includes('Phi_color'),'preserve proposed x oneform times shared Phi scalar factorization');
 const q=packet.exact_root_support;
 ck(q?.unordered_mixed_root_pairs_total===153&&JSON.stringify(q.all_pairs)==='{"cartan_opposite":9,"strong_root":18,"mixed_root":36,"no_root":90}','whole source root pair classification');
 ck(q?.effective_cross_generation_oneform_pairs_total===108&&JSON.stringify(q.effective_cross_generation)==='{"cartan_opposite":6,"strong_root":12,"mixed_root":36,"no_root":54}'&&q.same_generation_oneform_wedge_excluded===true,'wedge-simple source factor reduction');
 const m=packet.independently_chosen_mathematical_model;
 ck(m?.full_24_root_matrix_commutators_tested===276&&m?.paired_su3_color_weight_alignment_verified===true,'exact complex matrix/weight checks');
 ck(m?.source_rank_one_phi_monomial_support?.x1_x2?.nonzero_phi_monomials===9&&m?.source_rank_one_phi_monomial_support?.x1_x3?.nonzero_phi_monomials===4&&m?.source_rank_one_phi_monomial_support?.x2_x3?.nonzero_phi_monomials===4,'source simple-factor mathematical witnesses');
 ck(m?.conditional_trace_identity==='tr([Y1,Y2]^2)=8*(Phi_a1*Phi_c1+Phi_a2*Phi_c2+Phi_a3*Phi_c3)^2'&&m.trace_quartic_independent_monomials===6,'conditional Chevalley trace identity');
 ck(m?.not_a_source_fixed_real_form_or_phase_choice===true&&m.original_real_E8_or_compact_so8_field_admissibility_proved===false&&m.author_original_clifford_trace_equals_this_normalization_proved===false&&m.does_not_prove_source_mistake===true,'real/phase and author-error firewall');
 ck(packet.source_census_proposed_delta?.changed_only?.join('|')==='L-SSC-040|L-SSC-044'&&packet.source_census_proposed_delta.unchanged===189,'two source-target revisions only');
 for(const f of ['source_census_frozen','G1_authorized','G2_to_G7_authorized','recursive_IA_authorized','cross_track_comparison_authorized','full_E8_action_qualified','author_math_error_proved','root_phase_source_qualified','real_form_field_admissibility_proved','external_cold_review_passed','author_outreach_authorized','PR70_merge_authorized']){
  ck(packet.stage_guards?.[f]===false,'no overclaim '+f);
 }
 const A=new Map((old.items||[]).map(z=>[z.id,z])),B=new Map((next.items||[]).map(z=>[z.id,z]));
 ck(A.size===191&&B.size===191,'191 distinct full source identities');
 let changed=[];for(const [id,a]of A){const b=B.get(id);if(!b)errors.push('deleted item '+id);else if(JSON.stringify(a)!==JSON.stringify(b))changed.push(id);}
 for(const id of B.keys())if(!A.has(id))errors.push('invented item '+id);
 ck(changed.join('|')==='L-SSC-040|L-SSC-044','189 predecessor records conserved; actual '+changed);
 for(const id of ['L-SSC-040','L-SSC-044']){
  const before=A.get(id),after=B.get(id);
  ck(after?.body?.startsWith(before?.body||'MISSING'),'original source assertion prefix '+id);
  const link=after?.source_expression_census?.L01_D4_Q_TABLE9_G0;
  ck(link?.packet?.path===files.packet&&link.packet.git_blob_sha===sha(files.packet),'evidence full blob provenance '+id);
  ck(link?.full_E8_real_root_phase_qualification===false&&link?.physical_counterexample_established===false,'no upgraded theorem '+id);
 }
 ck(next.guards?.source_census_freeze_complete===false&&next.guards.dp_allowed===false&&next.revision?.predecessor_git_blob_sha===sha(files.old)&&next.revision?.source_packet?.git_blob_sha===sha(files.packet),'current SSC35 stage/integrity');
 ck(next.revision?.changed_source_items?.join('|')==='L-SSC-040|L-SSC-044','SSC35 exact changed set');
 ck(gate.stage==='G0'&&gate.track==='L'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===sha(files.oldGate),'current G0 gate parent');
 ck(gate.current_source_census?.git_blob_sha===sha(files.next)&&gate.current_source_census.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'G0 gate/census firewall');
 ck(!JSON.stringify(packet).includes('W-SSC-'),'no W source imports');
 return errors;
}
function rootMathProof(opts={}){
 const err=[], check=(b,s)=>{if(!b)err.push(s)};
 const axis=i=>Array.from({length:3},(_,j)=>Number(i===j));
 const addv=(a,b)=>a.map((v,i)=>v+b[i]),neg=a=>a.map(v=>-v),four=(w,xyz)=>[w,...xyz];
 const rootKey=r=>r.join(',');
 const g=[];
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(i!==j)g.push(four(0,addv(axis(i),neg(axis(j)))));
 const groups=[[],[],[]],colors=['c1','c2','c3','a1','a2','a3'];
 const roleRoot=new Map();
 for(let k=0;k<3;k++)for(const sg of [1,-1]){
  const label=(sg===1?'c':'a')+(k+1);
  let xyz=axis(k).map(v=>sg*v);
  const r1=four(opts.invalidW?-2:-1,xyz),r2=four(1,xyz);
  const r3=four(0,axis(k).map(v=>-sg*(1-v)));
  for(const [a,r] of [[1,r1],[2,r2],[3,r3]]){groups[a-1].push(r);roleRoot.set(a+':'+label,r);}
 }
 if(opts.invalidX3)roleRoot.set('3:c1',four(0,[0,1,-1]));
 if(opts.dropX2)for(const c of colors)roleRoot.delete('2:'+c);
 const xRoots=[...roleRoot.values()],allRoots=[...g,...xRoots];
 const rootSets={g:new Set(g.map(rootKey)),m:new Set(xRoots.map(rootKey))};
 check(g.length===6&&xRoots.length===18&&new Set(allRoots.map(rootKey)).size===24,'Table9: 6 strong +18 mixed D4 roots');
 check(groups.every(x=>x.length===6),'Table9: three x fields each six colored roles');
 const kind=r=>r.every(v=>v===0)?'cartan':rootSets.g.has(rootKey(r))?'strong':rootSets.m.has(rootKey(r))?'mixed':'absent';
 const rootCount={cartan:0,strong:0,mixed:0,absent:0};
 for(let i=0;i<18;i++)for(let j=i+1;j<18;j++)rootCount[kind(addv(xRoots[i],xRoots[j]))]++;
 check(rootCount.cartan===9&&rootCount.strong===18&&rootCount.mixed===36&&rootCount.absent===90,'complete 153 mixed pair source root sums');
 const cross={cartan:0,strong:0,mixed:0,absent:0};
 if(roleRoot.size===18)for(let a=1;a<=3;a++)for(let b=a+1;b<=3;b++)for(const c of colors)for(const d of colors)cross[kind(addv(roleRoot.get(a+':'+c),roleRoot.get(b+':'+d)))]++;
 check(cross.cartan===6&&cross.strong===12&&cross.mixed===36&&cross.absent===54,'rank-one oneform excludes same-generation root pairs');
 const weight=r=>r.slice(1).map(v=>3*v-(r[1]+r[2]+r[3]));
 if(roleRoot.size===18)for(const c of colors){const v=weight(roleRoot.get('1:'+c));for(const a of [2,3])check(rootKey(v)===rootKey(weight(roleRoot.get(a+':'+c))),'same su3 color weight '+c);}
 if(err.length)return{pass:false,errors:err};
 const E=(i,j)=>{const m=Array(64).fill(0);m[8*i+j]=1;return m;};
 const plus=(A,B)=>A.map((v,i)=>v+B[i]),minus=(A,B)=>A.map((v,i)=>v-B[i]);
 const sc=(A,k)=>A.map(x=>k*x),zero=()=>Array(64).fill(0);
 const mm=(A,B)=>{const O=zero();for(let i=0;i<8;i++)for(let j=0;j<8;j++){let t=0;for(let k=0;k<8;k++)t+=A[8*i+k]*B[8*k+j];O[8*i+j]=t;}return O;};
 const comm=(A,B)=>minus(mm(A,B),mm(B,A));
 const eq=(A,B)=>A.every((v,i)=>v===B[i]);
 const trace=A=>Array.from({length:8},(_,i)=>A[i*8+i]).reduce((x,y)=>x+y,0);
 const J=zero();for(let i=0;i<4;i++){J[i*8+i+4]=1;J[(i+4)*8+i]=1;}
 const T=A=>Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>A[j*8+i])).flat();
 const H=Array.from({length:4},(_,i)=>minus(E(i,i),E(i+4,i+4)));
 const matrix=r=>{
  let pos=[],negR=[];for(let k=0;k<4;k++){if(r[k]===1)pos.push(k);else if(r[k]===-1)negR.push(k);else if(r[k]!==0)throw Error('nonroot coordinate '+r);}
  if(pos.length===2&&negR.length===0){const [i,j]=pos;return minus(E(i,j+4),E(j,i+4));}
  if(negR.length===2&&pos.length===0){const [i,j]=negR;return minus(E(i+4,j),E(j+4,i));}
  if(pos.length===1&&negR.length===1){const i=pos[0],j=negR[0];return minus(E(i,j),E(j+4,i+4));}
  throw Error('wrong D4 root '+r);
 };
 const map=new Map(allRoots.map(r=>[rootKey(r),matrix(r)])),z=zero();
 for(const [key,M] of map){
  check(eq(plus(mm(T(M),J),mm(J,M)),z),'D4 J preservation '+key);
  const r=key.split(',').map(Number);
  for(let i=0;i<4;i++)check(eq(comm(H[i],M),sc(M,r[i])),'Cartan eigen root '+key+':'+i);
 }
 let allRootBrackets=0;
 for(let i=0;i<allRoots.length;i++)for(let j=i+1;j<allRoots.length;j++){
  const r=allRoots[i],s=allRoots[j],d=addv(r,s),B=comm(matrix(r),matrix(s)),target=kind(d);
  if(target==='mixed'||target==='strong'){
   const M=map.get(rootKey(d));check(eq(B,M)||eq(B,sc(M,-1)),'root-addition bracket '+i+':'+j);
  }else if(target==='absent')check(eq(B,z),'nonroot bracket zero '+i+':'+j);
  else{const diag=H.reduce((A,v,k)=>plus(A,sc(v,r[k])),z);check(eq(B,diag)||eq(B,sc(diag,-1)),'opposite-root Cartan '+i+':'+j);}
  allRootBrackets++;
 }
 check(allRootBrackets===276,'24 root unordered matrix bracket pairs');
 const monomial=(a,b)=>[a,b].sort().join('*'),poly={},support={};
 for(const [a,b] of [[1,2],[1,3],[2,3]]){
  const coeff=new Map();
  for(const c of colors)for(const d of colors){
   const k=monomial(c,d);
   coeff.set(k,plus(coeff.get(k)||z,comm(matrix(roleRoot.get(a+':'+c)),matrix(roleRoot.get(b+':'+d)))));
  }
  for(const [k,M] of [...coeff])if(eq(M,z))coeff.delete(k);
  poly[a+''+b]=coeff;
  const stat={nonzero_monomials:coeff.size,source_B2_support:0,source_w_support:0,source_color_Cartan_support:0,strong_root_monomials:0,mixed_root_monomials:0};
  for(const [k,M] of coeff){
   const diag=H.map((_,i)=>M[i*8+i]);
   if(diag[1]+diag[2]+diag[3]!==0)stat.source_B2_support++;
   if(diag[0]!==0)stat.source_w_support++;
   if(diag[1]!==diag[2]||diag[1]!==diag[3])stat.source_color_Cartan_support++;
   for(const r of g){const B=matrix(r),at=B.findIndex(x=>x!==0);if(M[at]!==0)stat.strong_root_monomials++;}
   for(const r of xRoots){const B=matrix(r),at=B.findIndex(x=>x!==0);if(M[at]!==0)stat.mixed_root_monomials++;}
  }
  support[a+''+b]=stat;
 }
 check(support['12'].nonzero_monomials===9&&support['13'].nonzero_monomials===4&&support['23'].nonzero_monomials===4,'source rank-one phi monomials');
 check(support['12'].source_B2_support===3&&support['12'].strong_root_monomials===6&&support['13'].mixed_root_monomials===4&&support['23'].mixed_root_monomials===4,'all 3 grouped source bracket supports');
 const lhs=new Map();
 for(const [key,A]of poly['12'])for(const[key2,B]of poly['12']){
  const k=(key+'*'+key2).split('*').sort().join('*');lhs.set(k,(lhs.get(k)||0)+trace(mm(A,B)));
 }
 for(const[k,v]of lhs)if(!v)lhs.delete(k);
 const rhs=new Map();
 for(let i=1;i<=3;i++)for(let j=1;j<=3;j++){const k=['a'+i,'c'+i,'a'+j,'c'+j].sort().join('*');rhs.set(k,(rhs.get(k)||0)+8);}
 check(lhs.size===6&&lhs.size===rhs.size&&[...rhs].every(([k,v])=>lhs.get(k)===v),'exact rank-one quartic trace formula');
 const ph={a1:1,c1:1,a2:0,c2:0,a3:0,c3:0};
 const chosen=[...poly['12']].reduce((M,[k,A])=>{const v=k.split('*').reduce((v,c)=>v*(ph[c]||0),1);return plus(M,sc(A,v));},z);
 check(trace(mm(chosen,chosen))===8,'nonzero complex-D4 Q-only quadratic trace');
 return{pass:err.length===0,errors:err,source_table9:{strong:g.length,mixed:xRoots.length,root_pairs:rootCount,rank_one_cross_pairs:cross},matrix:{root_bracket_checks:allRootBrackets,rank_one_monomial_support:support,quartic_trace_coefficients:lhs.size,minimal_trace_square:8},source_real_form_qualified:false};
}
const issues=sourceGuards(),math=rootMathProof();
if(!math.pass)issues.push(...math.errors.map(x=>'MATH '+x));
const modelMutants=[
 ['wrong w coordinate',()=>rootMathProof({invalidW:true})],
 ['wrong x3 signed root family',()=>rootMathProof({invalidX3:true})],
 ['missing x2 generation',()=>rootMathProof({dropX2:true})]
];
let mathMutantsRejected=0;
for(const [name,fn] of modelMutants){let rejected=false;try{const r=fn();rejected=!r.pass;}catch{rejected=true;}if(!rejected)issues.push('ESCAPED_MATH '+name);else mathMutantsRejected++;}
const mutations=[
 ['forge source revision',p=>{p.original_source.revision='arXiv:0711.0770v2'}],
 ['alter x2 signed root',p=>{p.source_table9_root_data.new_x2_Phi='w=-2; bad'}],
 ['replace x3 sign with opposite',p=>{p.source_table9_root_data.new_x3_Phi='w=0; xyz +/- opposite signs'}],
 ['four rather than three groups',p=>{p.source_table9_root_data.source_three_grouping.push('extra fifth') }],
 ['erase two abelian grouping',p=>{p.source_table9_root_data.source_three_grouping[0]='u1_w alone'}],
 ['discard one-form wedge guard',p=>{p.exact_root_support.same_generation_oneform_wedge_excluded=false}],
 ['erase proposed rank-one factor',p=>{p.source_table9_root_data.source_factorization='18 unrelated oneforms'}],
 ['declare source Q full coefficients qualified',p=>{p.source_table9_root_data.exact_Q_projection_and_all_coefficients_source_qualified=true}],
 ['declare actual compact field admissibility',p=>{p.independently_chosen_mathematical_model.original_real_E8_or_compact_so8_field_admissibility_proved=true}],
 ['forge polynomial trace',p=>{p.independently_chosen_mathematical_model.conditional_trace_identity='tr=0'}],
 ['allow G1',p=>{p.stage_guards.G1_authorized=true}],
 ['import W',p=>{p.provenance.external_antecedent+=' W-SSC-001'}],
 ['stale predecessor census SHA',p=>{p.pinned_predecessors.census034.git_blob_sha='STALE'}]
];
let sourceMutantsRejected=0;
if(!issues.length)for(const [name,mut]of mutations){const p=structuredClone(Packet);mut(p);if(sourceGuards(p).length===0)issues.push('ESCAPED_SOURCE '+name);else sourceMutantsRejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-L01-table9-D4-Q-source-G0.v0.1',pass:issues.length===0,issues,math,math_mutants_defined:modelMutants.length,math_mutants_rejected:mathMutantsRejected,source_mutants_defined:mutations.length,source_mutants_rejected:sourceMutantsRejected,SSC_IDs:Current.items.length,changed_records:['L-SSC-040','L-SSC-044'],unchanged_records:189,G1_authorized:false,cross_author_comparison_authorized:false,external_cold_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
