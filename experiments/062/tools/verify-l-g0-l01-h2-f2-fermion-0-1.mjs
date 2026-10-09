// L-only G0 source conservation and non-tautological independent polynomial Fx exterior identity.
// Original arXiv:0711.0770v1 pp22-24. No full so(8)/E8 source theorem.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R="research/woit-lisi-isomorph/lisi/",E="experiments/062/";
const packetPath="research/woit-lisi-isomorph/lisi/LISI_L01_H2_F2_FERMION_GRADED_SOURCE_G0_0_1.json",prevSscPath=R+'SOURCE_SEMANTIC_CENSUS_0_31.json',prevGatePath=E+'L_CURRENT_STAGE_GATE_0_31.json',sscPath=R+'SOURCE_SEMANTIC_CENSUS_0_32.json',gatePath=E+'L_CURRENT_STAGE_GATE_0_32.json';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const expected={
  "H2_CONNECTION": "H2=w+B2+xPhi+g",
  "H2_U1_GROUP": "w+B2 in u(1)+u(1)_(B-L)",
  "H2_XPHI_CARRIER": "xPhi=(x1+x2+x3) x (Phi_(r/g/b)+Phi_(rbar/gbar/bbar)) in 3 x (3+3bar)",
  "F2_DECOMPOSITION": "F2=Fw+FB2+Fx+Fg+(xPhi)(xPhi)",
  "FW": "Fw=d(w)",
  "FB2": "FB2=d(B2)",
  "FX": "Fx=(d(x)+[w+B2,x])Phi-x(d(Phi)+[g,Phi])=(Dx)Phi-x(DPhi)",
  "FG_STRONG": "Fg=d(g)+g*g",
  "XPHI_RESIDUAL": "The last term does not easily separate; xPhi xPhi contributes to all three parts of F2.",
  "DPSI_DEFINITION": "D(Psi)=d(Psi)+[H1+H2,Psi]",
  "DPSI_EXPANDED": "D(Psi)=(d+(1/2)omega+(1/4)ephi)Psi+W Psi_L+B1 Psi_R-Psi(w+B2+xPhi)-Psi_q g",
  "OTHER_GENERATIONS": "The second and third fermion generation parts of this curvature are similar."
};
function sourceGuards(q){
 const issues=[],ok=(v,msg)=>{if(!v)issues.push(msg)};
 ok(q?.schema==="isograph.lisi-l01-h2-f2-fermion-graded-source-G0.v0.1"&&q.track==="L"&&q.stage==="G0"&&q.authority===false,"L G0 scope");
 ok(q?.source?.id==="L01"&&q.source.revision==="arXiv:0711.0770v1"&&JSON.stringify(q.source.printed_pages)==="[22,23,24]","source original revision/page");
 ok(q?.parent?.ssc031?.git_blob_sha==="6004578250d4e742f70406f4a547410699ecd813"&&q.parent.gate031.git_blob_sha==="5db1fd6dbac360a2cd3ee81cf564382028cadfea","old SSC/gate preserved");
 const a=q?.source_expressions||[];
 ok(a.length===12 && new Set(a.map(x=>x.id)).size===12,"12 distinct source expressions");
 for(const [id,s] of Object.entries(expected)){const e=a.find(x=>x.id===id);ok(e?.text===s,"original literal "+id)}
 for(const [id,degree]of [["w",1],["B2",1],["x",1],["Phi",0],["g",1],["xPhi",1],["Fw",2],["FB2",2],["Fx",2],["Fg",2],["D(Psi)","Grassmann 1-form"]]){
  ok(q?.actor_roles?.find(x=>x.id===id)?.degree===degree,"form-degree "+id);
 }
 ok(q?.strictly_scoped_observations?.source_displayed_addends_in_F2?.join("|")==="Fw|FB2|Fx|Fg|(xPhi)(xPhi)","all source F2 additive/remaining terms");
 ok(q?.strictly_scoped_observations?.named_component_terms===4&&q.strictly_scoped_observations.literal_author_N_part_wording==="all three parts"&&q.strictly_scoped_observations.grouping_of_three_vs_four_labels.startsWith("UNRESOLVED"),"three author words versus four formula labels preserved without grouping assertion");
 ok(q?.strictly_scoped_observations?.last_term_independent_of_named_components===false && q.strictly_scoped_observations.source_says_xPhi_product_contributes_to_multiple_sectors===true,"nonseparable product");
 ok(q?.strictly_scoped_observations?.source_Fx_signed_operands?.join("|")==="+(d(x)+[w+B2,x])*Phi|-x*(d(Phi)+[g,Phi])","source Fx full signed operators");
 ok(q?.strictly_scoped_observations?.source_DPsi_signed_operands?.join("|")==="+(d+(1/2)omega+(1/4)ephi)*Psi|+W*Psi_L|+B1*Psi_R|-Psi*(w+B2+xPhi)|-Psi_q*g","source fermion derivative left/right role");
 ok(q?.strictly_scoped_observations?.source_DPsi_only_first_generation_expanded===true,"fermion scope nonprojection");
 ok(q?.conditional_math_reconstruction?.explicit_component_identity?.includes("-x_p tensor")&&q.conditional_math_reconstruction.model_scope?.includes("NOT independently proven"),"conditional math scope");
 ok(q?.source_census_delta?.ids_preserved===191&&q.source_census_delta.other_unchanged===189&&q.source_census_delta.changed_only?.join("|")==="L-SSC-040|L-SSC-041","191-source conservation");
 for(const flag of ["source_frozen_complete","G1_authorized","G2_G7_authorized","recursive_IA_authorized","cross_track_semantics_authorized","source_mistake_established","E8_Lie_closure_qualified","PR70_merge_authorized"])ok(q?.constraints?.[flag]===false,"no promotion "+flag);
 ok(!JSON.stringify(q).includes("W-SSC-"),"do not import W source identities");
 return issues;
}
function mathReplay(){
 const faults=[],check=(v,m)=>{if(!v)faults.push(m)};
 // Multivariate polynomial entries in a tensor product of two noncommuting matrix algebras.
 const zero=()=>new Map, variable=s=>new Map([[s,1]]);
 const coeff=(v)=>v?new Map([["",v]]):zero();
 const ap=(...xs)=>{const m=zero();for(const p of xs)for(const[k,v]of p)m.set(k,(m.get(k)||0)+v);for(const[k,v]of m)if(v===0)m.delete(k);return m};
 const np=p=>new Map([...p].map(([k,v])=>[k,-v]));
 const sp=(a,b)=>{const p=zero();for(const[k,u]of a)for(const[t,v]of b){const str=[...k.split(";").filter(Boolean),...t.split(";").filter(Boolean)].sort().join(";");p.set(str,(p.get(str)||0)+u*v)}for(const[k,v]of p)if(v===0)p.delete(k);return p};
 const mz=(h,w)=>Array.from({length:h},()=>Array.from({length:w},zero));
 const mid=n=>Array.from({length:n},(_,r)=>Array.from({length:n},(_,s)=>coeff(+(r===s))));
 const mat=name=>Array.from({length:2},(_,r)=>Array.from({length:2},(_,s)=>variable(`${name}_${r}${s}`)));
 const madd=(...arr)=>arr.reduce((a,b)=>a.map((row,r)=>row.map((v,s)=>ap(v,b[r][s]))));
 const mneg=a=>a.map(row=>row.map(np));
 const msub=(a,b)=>madd(a,mneg(b));
 const mmul=(a,b)=>a.map((row,r)=>Array.from({length:b[0].length},(_,c)=>ap(...row.map((v,k)=>sp(v,b[k][c])))));
 const comm=(a,b)=>msub(mmul(a,b),mmul(b,a));
 const tensor=(a,b)=>a.flatMap(row=>b.map(brow=>row.flatMap(v=>brow.map(w=>sp(v,w)))));
 const equal=(a,b)=>a.length===b.length&&a.every((row,r)=>row.every((poly,c)=>{const delta=ap(poly,np(b[r][c]));return delta.size===0}));
 const I=mid(2);
 const X=Array.from({length:4},(_,j)=>mat("x"+j)),U=Array.from({length:4},(_,j)=>madd(mat("w"+j),mat("b"+j))),
   G=Array.from({length:4},(_,j)=>mat("g"+j));
 const Phi=mat("Phi"),dPhi=Array.from({length:4},(_,j)=>mat("dp"+j));
 const dx=(p,q)=>mat("dx"+p+"_"+q);
 const xp=x=>tensor(X[x],Phi);
 let equalities=0,first=null,terms=0;
 const defects={sign_dphi:0,sign_g:0,omit_left_cov:0,omit_dphi:0,omit_right_cov:0};
 for(let p=0;p<4;p++)for(let q=p+1;q<4;q++){
  const dm=madd(tensor(dx(p,q),Phi),tensor(X[q],dPhi[p]),mneg(tensor(X[p],dPhi[q])));
  const Up=madd(tensor(U[p],I),tensor(I,G[p])),Uq=madd(tensor(U[q],I),tensor(I,G[q]));
  const raw=madd(dm,comm(Up,xp(q)),mneg(comm(Uq,xp(p))));
  const Dx=madd(dx(p,q),comm(U[p],X[q]),mneg(comm(U[q],X[p])));
  const Dp=madd(dPhi[p],comm(G[p],Phi)),Dq=madd(dPhi[q],comm(G[q],Phi));
  const expected=madd(tensor(Dx,Phi),mneg(tensor(X[p],Dq)),tensor(X[q],Dp));
  if(!equal(raw,expected)){faults.push("off-shell all-coeff Fx algebra "+p+","+q);first??=[p,q]}
  else equalities++;
  terms+=raw.reduce((sum,row)=>sum+row.reduce((t,v)=>t+v.size,0),0);
  const wrong={
    sign_dphi:madd(tensor(Dx,Phi),tensor(X[p],Dq),mneg(tensor(X[q],Dp))),
    sign_g:madd(tensor(Dx,Phi),mneg(tensor(X[p],madd(dPhi[q],mneg(comm(G[q],Phi))))),tensor(X[q],madd(dPhi[p],mneg(comm(G[p],Phi))))),
    omit_left_cov:madd(tensor(dx(p,q),Phi),mneg(tensor(X[p],Dq)),tensor(X[q],Dp)),
    omit_dphi:madd(tensor(Dx,Phi),mneg(tensor(X[p],comm(G[q],Phi))),tensor(X[q],comm(G[p],Phi))),
    omit_right_cov:madd(tensor(Dx,Phi),mneg(tensor(X[p],dPhi[q])),tensor(X[q],dPhi[p]))
  };
  for(const [name,candidate]of Object.entries(wrong))if(!equal(raw,candidate))defects[name]++;
 }
 for(const [name,n] of Object.entries(defects))check(n===6,"mutation escaped "+name+": "+n+"/6");
 check(equalities===6,"expected six oriented twoform polynomial identities");
 return{pass:faults.length===0,faults,source:"L01 §3.1 Fx; conditional two-commuting-carrier-factor implementation",oriented_twoforms:6,exact_polynomial_identity_cases:equalities,total_nonzero_matrix_entry_monomials:terms,adversarial_math_mutant_types:5,adversarial_math_mutant_rejections_per_type:defects,uses_exact_independent_symbolic_field_coefficients:true,uses_E8_source_bracket_representation:false,source_xPhi_squared_decomposition_qualified:false,G1_authorized:false};
}
const issues=[];
const packet=read(packetPath),old=read(prevSscPath),ssc=read(sscPath),oldGate=read(prevGatePath),gate=read(gatePath);
issues.push(...sourceGuards(packet));
for(const [where,target] of [['ssc031',prevSscPath],['gate031',prevGatePath],['visual_audit',R+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json']]){
 if(packet.parent?.[where]?.path!==target || packet.parent?.[where]?.git_blob_sha!==sha(target))issues.push('source input provenance '+where);
}
if(old.items?.length!==191 || ssc.items?.length!==191)issues.push('expected 191 L source items');
const byId=arr=>new Map(arr.map(item=>[item.id,item])); const A=byId(old.items),B=byId(ssc.items);
if(A.size!==191||B.size!==191)issues.push('distinct source identity conservation');
const changed=[];for(const[id,a]of A){const b=B.get(id);if(!b)issues.push('missing identity '+id);else if(JSON.stringify(a)!==JSON.stringify(b))changed.push(id)}
for(const id of B.keys())if(!A.has(id))issues.push('new identity '+id);
if(changed.join('|')!=='L-SSC-040|L-SSC-041')issues.push('unexpected full SSC deltas '+changed.join(','));
for(const id of ['L-SSC-040','L-SSC-041']){
 const a=A.get(id),b=B.get(id);
 if(!b?.body?.startsWith(a.body)||b?.source_expression_census?.L01_H2_F2_FERMION_G0?.source_packet?.path!==packetPath||b?.source_expression_census?.L01_H2_F2_FERMION_G0?.source_packet?.git_blob_sha!==sha(packetPath))issues.push('source body or packet not conserved for '+id);
}
if(ssc?.guards?.source_census_freeze_complete!==false||ssc?.revision?.predecessor_git_blob_sha!==sha(prevSscPath)||ssc?.revision?.changed_source_items?.join('|')!=='L-SSC-040|L-SSC-041'||ssc?.revision?.source_packet?.git_blob_sha!==sha(packetPath))issues.push('current 0.32 SSC source revision routing');
if(gate?.predecessor_gate?.git_blob_sha!==sha(prevGatePath)||gate?.current_source_census?.git_blob_sha!==sha(sscPath)||gate?.current_source_census?.source_identities!==191||gate?.current_lawful_state?.G1_authorized!==false||gate?.current_lawful_state?.source_census_frozen!==false||gate?.current_lawful_state?.cross_track_synthesis_authorized!==false)issues.push('0.32 stage lock');
const base=mathReplay();issues.push(...base.faults);
const mutants=[
 ['bad source revision',x=>x.source.revision='arXiv:0711.0770v2'],
 ['lost H2 B2',x=>x.source_expressions.find(y=>y.id==='H2_CONNECTION').text='H2=w+B1+xPhi+g'],
 ['lost quadratic remainder',x=>x.source_expressions.find(y=>y.id==='F2_DECOMPOSITION').text='F2=Fw+FB2+Fx+Fg'],
 ['wrong weak Fw',x=>x.source_expressions.find(y=>y.id==='FW').text='Fw=d(W)'],
 ['flip mixed covariant sign',x=>x.source_expressions.find(y=>y.id==='FX').text=x.source_expressions.find(y=>y.id==='FX').text.replace('-x(', '+x(')],
 ['source 3 to 4',x=>x.strictly_scoped_observations.literal_author_N_part_wording='all four parts'],
 ['assert independent curvature sectors',x=>x.strictly_scoped_observations.last_term_independent_of_named_components=true],
 ['flip fermion W handedness',x=>x.source_expressions.find(y=>y.id==='DPSI_EXPANDED').text=x.source_expressions.find(y=>y.id==='DPSI_EXPANDED').text.replace('W Psi_L','W Psi_R')],
 ['flip fermion right-sector sign',x=>x.source_expressions.find(y=>y.id==='DPSI_EXPANDED').text=x.source_expressions.find(y=>y.id==='DPSI_EXPANDED').text.replace('-Psi(w', '+Psi(w')],
 ['erase quark-only g',x=>x.source_expressions.find(y=>y.id==='DPSI_EXPANDED').text=x.source_expressions.find(y=>y.id==='DPSI_EXPANDED').text.replace('-Psi_q g','-Psi g')],
 ['turn scalar Phi into one-form',x=>x.actor_roles.find(y=>y.id==='Phi').degree=1],
 ['source declares G1',x=>x.constraints.G1_authorized=true]
];
let rejected=0;
if(!issues.length)for(const[name,mut]of mutants){const obj=structuredClone(packet);mut(obj);if(sourceGuards(obj).length===0)issues.push('ESCAPED SOURCE MUTANT '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l040-l041-G0-source-plus-Fx-offshell.v0.1',pass:issues.length===0,issues,math:base,source_expressions:packet.source_expressions.length,typed_actors:packet.actor_roles.length,SSC_identities:191,unchanged_complete_records:189,changed_records:changed,source_mutations_defined:mutants.length,source_mutations_rejected:rejected,source_census_frozen:false,G1_authorized:false,cross_track_semantics_authorized:false,external_cold_verification_passed:false},null,2));
if(issues.length)process.exitCode=1;
