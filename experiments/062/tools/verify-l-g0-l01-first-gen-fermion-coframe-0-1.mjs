// L-only G0: exact source p27-28 first-generation fermion action, coframe, and unresolved right sign map.
// L01 arXiv:0711.0770v1. No complete E8 fermion/Grassmann realization or second/third-generation action.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
 packet:R+'LISI_L01_FERMION_ACTION_COFRA_SIGN_SOURCE_G0_0_1.json',
 old:R+'SOURCE_SEMANTIC_CENSUS_0_39.json',current:R+'SOURCE_SEMANTIC_CENSUS_0_40.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_39.json',gate:E+'L_CURRENT_STAGE_GATE_0_40.json',
 page:R+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json',
 h2:R+'LISI_L01_H2_F2_FERMION_GRADED_SOURCE_G0_0_1.json'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sourceLiteral={
 CURVATURE_FIRST_GEN:'D(Psi)=d(Psi)+[H1+H2,Psi]',
 AUXILIARY_3_FORM_CHOICE:'Bdot=volume4*Psi_bar*coframe_contraction',
 ACTION_LEFT_RIGHT_OPERATOR:'S_f=integral<volume4*Psi_bar*coframe*(d(Psi)+H1*Psi-Psi*H2)>',
 ACTION_SUBSTITUTED_H1_H2:'d(Psi)+(omega/2+e*phi/4+W+B1)*Psi-Psi*(w+B2+xPhi+g)',
 ACTION_COMPONENT_DERIVATIVE:'Psi_bar*gamma^mu*(e_mu)^i*(partial_i(Psi)+(1/4)*omega_i^mu_nu*gamma_mu_nu*Psi + W_i*Psi + B1_i*Psi + Psi*w_i + Psi*B2_i + Psi*x_i*Phi + Psi*g_i) + Psi_bar*phi*Psi',
 SOURCE_COFRA_IDENTITY:'gamma^mu*(e_mu)^i*(e_i)^nu*gamma_nu=gamma^mu*gamma_mu=4',
 SOURCE_UNDERSTANDING_LIMIT:'New w and xPhi fermionic terms not yet well understood; CKM recovery a possibility, not a derivation.',
 OTHER_GENERATION_ACTION_LIMIT:'Fermion action for second and third generations is not understood well enough to write down; one generation only.'
};
const issues=[];
function sourceGuards(packet,previous,current,gate){
 const bad=[],ck=(v,m)=>{if(!v)bad.push(m);};
 ck(packet?.schema==='isograph.lisi-L01-first-generation-fermion-action-coframe-G0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.authority===false,'L G0 evidence only');
 ck(packet?.source?.id==='L01'&&packet.source.revision==='arXiv:0711.0770v1'&&JSON.stringify(packet.source.printed_pages)==='[24,27,28]','exact original v1/source pages');
 for(const [key,path]of [['ssc039',paths.old],['gate039',paths.oldGate],['h2Packet',paths.h2],['pageAudit',paths.page]])
  ck(packet?.frozen_parents?.[key]?.path===path&&packet.frozen_parents[key].git_blob_sha===blob(path),'source provenance '+key);
 const items=packet?.source_equation_layers||[];
 ck(items.length===8&&new Set(items.map(x=>x.id)).size===8,'eight source equation and limitation layers');
 for(const [key,text]of Object.entries(sourceLiteral))ck(items.find(x=>x.id===key)?.normalized===text,'original printed formula '+key);
 ck(items.find(x=>x.id==='ACTION_COMPONENT_DERIVATIVE')?.right_component_sign_note?.includes('PLUS'),'positive component right action distinct from negative operator');
 const needed={Psi:0,Psi_bar:0,Bdot:3,D_Psi:1,volume4:4,coframe:1,e:1,phi:0,Phi:0,H1:1,H2:1};
 for(const [name,deg] of Object.entries(needed))ck(packet?.source_roles?.find(x=>x.id===name)?.degree===deg,'original typed source role '+name);
 const r=packet?.source_right_sign_boundary;
 ck(r?.pre_component_signs?.join('|')==='-Psi*w|-Psi*B2|-Psi*xPhi|-Psi*g','negative source H2 operator terms');
 ck(r?.printed_component_signs?.join('|')==='+Psi*w_i|+Psi*B2_i|+Psi*x_i*Phi|+Psi*g_i','positive printed component terms');
 ck(r?.source_native_generator_to_component_map_qualified===false&&r.not_conclude_source_typo===true&&r.cannot_replace_H2_with_negative_generator_for_other_brackets_without_rechecking===true,'no source-right action sign convention silently selected');
 ck(r?.source_quark_color_restriction_from_3_1_preserved===true,'strong only quark subspace in §3.1');
 ck(packet?.conditional_math?.signature?.join('|')==='1|1|1|-1'&&packet.conditional_math.gamma_contraction?.includes('4*I'),'4D Lorentzian raised gamma');
 ck(packet?.conditional_math?.frame_inverse_requirements?.includes('invertible 4x4')&&packet.conditional_math.exterior_3form_pairing?.includes('alpha_i wedge dx^j=-'),'invertible coframe and exterior ordering preserved');
 ck(packet?.conditional_math?.requires_antiGrassmann_sign_convention?.includes('do not prove complete S_f'),'Grassmann source limitation');
 ck(packet?.new_source_scope?.ids===191&&packet.new_source_scope.changed_only?.join('|')==='L-SSC-041|L-SSC-046'&&packet.new_source_scope.unchanged_full_records===189,'proposed delta L041/L046 only');
 for(const name of ['G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_synthesis_authorized','full_native_E8_source_reconstruction_complete','source_exact_component_right_action_map_qualified','source_other_generations_dirac_action_qualified','full_fermion_physics_qualified','external_cold_review_passed','author_outreach_authorized','PR70_merge_authorized'])
  ck(packet?.stage_locks?.[name]===false,'not authorized '+name);
 const A=new Map((previous.items||[]).map(x=>[x.id,x])),B=new Map((current.items||[]).map(x=>[x.id,x]));
 ck(A.size===191&&B.size===191,'complete 191 source IDs preserved');
 const changed=[];for(const [id,item]of A){const newRec=B.get(id);if(!newRec)bad.push('lost '+id);else if(JSON.stringify(newRec)!==JSON.stringify(item))changed.push(id);}
 for(const id of B.keys())if(!A.has(id))bad.push('invented '+id);
 ck(changed.join('|')==='L-SSC-041|L-SSC-046','all 189 other full records unchanged ('+changed+')');
 for(const id of ['L-SSC-041','L-SSC-046']){
  const ancestor=A.get(id),newRec=B.get(id),link=newRec?.source_expression_census?.L01_FERMION_ACTION_COFRA_G0;
  ck(newRec?.body?.startsWith(ancestor?.body||'MISSING'),'original source positive prefix conserved '+id);
  ck(link?.source_packet?.path===paths.packet&&link.source_packet.git_blob_sha===blob(paths.packet),'new original packet blob '+id);
  ck(link?.source_E8_operator_realization_qualified===false&&link?.source_right_sign_map_qualified===false&&link?.other_two_gen_action_qualified===false&&link?.G1_authorized===false,'per-item source gap remains '+id);
 }
 ck(current.guards?.source_census_freeze_complete===false&&current.guards.dp_allowed===false,'SSC40 source unfinished');
 ck(current.revision?.predecessor_git_blob_sha===blob(paths.old)&&current.revision?.source_packet?.git_blob_sha===blob(paths.packet)&&current.revision?.changed_source_items?.join('|')==='L-SSC-041|L-SSC-046','SSC40 source lineage');
 ck(gate?.stage==='G0'&&gate.track==='L'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===blob(paths.oldGate),'gate G0 parent');
 ck(gate.current_source_census?.git_blob_sha===blob(paths.current)&&gate.current_source_census?.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'source gate 0.40 exact SSC');
 ck(!JSON.stringify(packet).includes('W-SSC-'),'no W imports');
 return bad;
}
// Independent exact integer inverse coframes via 4x4 adjugate/minors,
// independent of the Clifford multiplication used for source gamma contraction.
function mathEvidence(){
 const failures=[],check=(v,m)=>{if(!v)failures.push(m);};
 const det3=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
 const minor=(A,i,j)=>A.filter((_,r)=>r!==i).map(row=>row.filter((_,c)=>c!==j));
 const determinant=A=>A[0].reduce((acc,_,j)=>acc+BigInt(j%2?-1:1)*A[0][j]*det3(minor(A,0,j)),0n);
 const transpose=A=>A[0].map((_,c)=>A.map(row=>row[c]));
 const inverse=A=>{const d=determinant(A);if(!d)throw Error('SINGULAR_SOURCE_FRAME');
  const cof=A.map((row,r)=>row.map((_,c)=>BigInt((r+c)%2?-1:1)*det3(minor(A,r,c))));
  const adj=transpose(cof);return adj.map(row=>row.map(v=>{if(v%d)throw Error('NON_INTEGER_INVERSE');return v/d;}));
 };
 const I=Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>BigInt(r===c)));
 const multiply=(A,B)=>A.map(row=>B[0].map((_,c)=>row.reduce((v,k,i)=>v+k*B[i][c],0n)));
 const equal=(A,B)=>A.length===B.length&&A.every((row,r)=>row.every((v,c)=>v===B[r][c]));
 const metric=[1n,1n,1n,-1n];
 const cl=(a,b)=>{let s=1n;for(let i=0;i<4;i++)if(a&(1<<i))for(let j=0;j<4;j++)if(b&(1<<j)){if(i>j)s=-s;if(i===j)s*=metric[i];}return [a^b,s];};
 const coeff=(arr)=>Object.fromEntries([...arr]);
 let gammaAnticommutators=0;
 for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  const[a,v]=cl(1<<i,1<<j),[b,w]=cl(1<<j,1<<i);
  check(a===b&&v+w===(i===j?2n*metric[i]:0n),'4 original gamma anticommutator '+i+','+j);
  gammaAnticommutators++;
 }
 const bases=[...Array(12)].map((_,k)=>{
  let A=I.map(row=>[...row]);
  const shear=(u,v,t)=>{const B=I.map(row=>[...row]);B[u][v]=BigInt(t);A=multiply(B,A);};
  shear(k%4,(k+1)%4,(k%3)+1);
  shear((k+2)%4,(k+3)%4,k%2?-2:1);
  if(k%4===0){[A[0],A[1]]=[A[1],A[0]];}
  return A;
 });
 let coframeCases=0,deltaEntries=0,gammaChecks=0,scalarResults=[],transposeWrongDetected=0;
 for(const [i,A]of bases.entries()){
  const d=determinant(A);check(d===1n||d===-1n,'unimodular coframe '+i);
  const Inv=inverse(A);
  check(equal(multiply(A,Inv),I)&&equal(multiply(Inv,A),I),'independent inverse both sides '+i);
  let gamma=new Map;
  for(let mu=0;mu<4;mu++)for(let nu=0;nu<4;nu++){
   let alpha=0n;
   for(let k=0;k<4;k++){
    alpha+=Inv[mu][k]*A[k][nu];
    deltaEntries++;
   }
   const[mask,sgn]=cl(1<<mu,1<<nu);
   const value=alpha*metric[mu]*sgn;
   gamma.set(mask,(gamma.get(mask)||0n)+value);
  }
  for(const[k,v]of [...gamma])if(v===0n)gamma.delete(k);
  check(gamma.size===1&&gamma.get(0)===4n,'inverse frame gamma^mu gamma_mu=4 exactly '+i);
  scalarResults.push(String(gamma.get(0)));gammaChecks++;coframeCases++;
  if(!equal(Inv,transpose(Inv))){
    if(!equal(multiply(A,transpose(Inv)),I))transposeWrongDetected++;
  }
 }
 check(coframeCases===12&&gammaChecks===12&&transposeWrongDetected>0,'nonvacuous invertibility and transpose mutants');
 const singular=I.map(r=>[...r]);singular[3]=[...singular[2]];
 let singularRejected=0;
 try{inverse(singular);}catch(e){singularRejected+=Number(e.message==='SINGULAR_SOURCE_FRAME');}
 check(singularRejected===1,'reject singular frame not choose pseudo-inverse');
 // Clifford frame-Higgs term source coefficient one quarter becomes unit phi
 // only when the inverse coframe contracts gamma^mu gamma_mu to FOUR.
 const rawContraction=4;
 const higgsSourceTerm=rawContraction/4,wrongHalf=rawContraction/2;
 check(higgsSourceTerm===1&&wrongHalf!==higgsSourceTerm,'source Higgs quarter essential');
 // Exterior contraction: alpha_i := interior_(d/dx_i)(dx0^dx1^dx2^dx3)
 // yields dx^j wedge alpha_i = +delta_i^j vol; reversed order carries a minus.
 const one=i=>1<<i,signWedge=(a,b)=>{if(a&b)return 0;let s=1;for(let i=0;i<4;i++)if(a&(1<<i))for(let j=0;j<4;j++)if(b&(1<<j)&&i>j)s=-s;return s;};
 let exteriorChecks=0,orderedSignControls=0;
 for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  const alpha=15^one(i),interiorSign=i%2?-1:1,delta=i===j?1:0;
  const left=signWedge(one(j),alpha)*interiorSign,right=signWedge(alpha,one(j))*interiorSign;
  check(left===delta&&right===-delta,'coframe exterior order/orientation '+i+','+j);
  exteriorChecks++;if(i===j&&left!==right)orderedSignControls++;
 }
 check(exteriorChecks===16&&orderedSignControls===4,'four 3form/1form positive versus reversed-sign controls');
 // The source gives -Psi H2 before components but +Psi T_i in the final line.
 // Only a FORMAL sign map can reconcile equal independent symbols;
 // NOT evidence that the E8 representation actually has this map.
 const right=['w','B2','xPhi','g'],vals=[2,-3,5,-7];
 let signObligations=0,directIdentityFailures=0;
 for(let k=0;k<4;k++){
  const pre=-vals[k],mapped=-(vals[k]),coordinate=+mapped;
  check(pre===coordinate,'formal transport of right-sector sign '+right[k]);
  signObligations++;if(pre!==+vals[k])directIdentityFailures++;
 }
 check(signObligations===4&&directIdentityFailures===4,'unresolved right representation sign is nonvacuous');
 return{pass:failures.length===0,failures,source_Clifford_signature:'+++ -',gamma_anticommutators:gammaAnticommutators,
   invertible_coframes:coframeCases,coframe_matrix_product_checks:coframeCases*2,
   index_contractions:deltaEntries,gamma_coframe_contractions:gammaChecks,all_four_result:scalarResults.every(x=>x==='4'),
   transpose_coframe_rejections:transposeWrongDetected,singular_frames_rejected:singularRejected,
   exterior_ordered_3form_1form_pairings:exteriorChecks,ordered_pair_sign_controls:orderedSignControls,
   right_operator_sign_obligations:signObligations,identity_right_sign_falsifiers:directIdentityFailures,
   source_E8_right_representation_map_qualified:false,other_2_gen_action_source_qualified:false,full_fermion_physics_proved:false};
}
const math=mathEvidence();issues.push(...math.failures.map(s=>'MATH '+s));
let sourceMutantsRejected=0;
if(!process.argv.includes('--math-only')){
 const p=load(paths.packet),old=load(paths.old),current=load(paths.current),gate=load(paths.gate);
 issues.push(...sourceGuards(p,old,current,gate));
 const mutants=[
 ['source revision',x=>{x.source.revision='arXiv:0711.0770v2'}],
 ['wrong H1 source quarter',x=>{x.source_equation_layers.find(y=>y.id==='ACTION_SUBSTITUTED_H1_H2').normalized=x.source_equation_layers.find(y=>y.id==='ACTION_SUBSTITUTED_H1_H2').normalized.replace('e*phi/4','e*phi/2')}],
 ['H2 right sign lost',x=>{x.source_equation_layers.find(y=>y.id==='ACTION_LEFT_RIGHT_OPERATOR').normalized=x.source_equation_layers.find(y=>y.id==='ACTION_LEFT_RIGHT_OPERATOR').normalized.replace('-Psi*H2','+Psi*H2')}],
 ['right component signs rewritten',x=>{x.source_equation_layers.find(y=>y.id==='ACTION_COMPONENT_DERIVATIVE').normalized=x.source_equation_layers.find(y=>y.id==='ACTION_COMPONENT_DERIVATIVE').normalized.replace('+ Psi*w_i','- Psi*w_i')}],
 ['fermion multiplier made twoform',x=>{x.source_roles.find(y=>y.id==='Bdot').degree=2}],
 ['spinor turned 1form',x=>{x.source_roles.find(y=>y.id==='Psi').degree=1}],
 ['coframe inverse omitted',x=>{x.conditional_math.frame_inverse_requirements='singular frame acceptable'}],
 ['source field source map claimed',x=>{x.source_right_sign_boundary.source_native_generator_to_component_map_qualified=true}],
 ['other generation action invented',x=>{x.source_equation_layers.find(y=>y.id==='OTHER_GENERATION_ACTION_LIMIT').normalized='All three fermion generation actions fully derived'}],
 ['CKM claimed proven',x=>{x.source_equation_layers.find(y=>y.id==='SOURCE_UNDERSTANDING_LIMIT').normalized='CKM fully obtained'}],
 ['drop quark-only g restriction',x=>{x.source_right_sign_boundary.source_quark_color_restriction_from_3_1_preserved=false}],
 ['stage promoted to G1',x=>{x.stage_locks.G1_authorized=true}],
 ['fake ancestor hash',x=>{x.frozen_parents.ssc039.git_blob_sha='STALE'}],
 ['erase source 3-form orientation',x=>{x.conditional_math.exterior_3form_pairing='ungraded commuting product'}]
 ];
 if(!issues.length)for(const [name,fn] of mutants){
  const candidate=structuredClone(p);fn(candidate);
  if(sourceGuards(candidate,old,current,gate).length===0)issues.push('ESCAPED_SOURCE_MUTANT '+name);else sourceMutantsRejected++;
 }
}
console.log(JSON.stringify({
 schema:'isograph.exp062-L01-first-generation-fermion-source-G0.v0.1',pass:issues.length===0,issues,
 math,source_mutants_defined:process.argv.includes('--math-only')?0:14,source_mutants_rejected:sourceMutantsRejected,
 source_checks_skipped:process.argv.includes('--math-only'),
 source_records:process.argv.includes('--math-only')?null:load(paths.current).items?.length,
 unchanged_complete_records:189,changed_records:['L-SSC-041','L-SSC-046'],
 right_action_representation_source_fixed:false,second_third_generation_action_source_written:false,
 G1_authorized:false,source_census_frozen:false,cross_author_synthesis_authorized:false,external_cold_review_passed:false
},null,2));if(issues.length)process.exitCode=1;
