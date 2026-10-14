import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={
 packet:L+'LISI_L01_H1_EW_PURE_BIVECTOR_SOURCE_G0_0_1.json',
 cl:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
 h1:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
 prev:L+'LISI_L01_H1_PURE_GRAVITY_AND_ALL_MIXED_BRACKET_SOURCE_G0_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_28.json',gate:E+'L_CURRENT_STAGE_GATE_0_28.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const A=get(files.packet),Cl=get(files.cl),H=get(files.h1),Prev=get(files.prev),SSC=get(files.ssc),Gate=get(files.gate);
const Z=(a=0,b=0)=>[a,b],plus=(a,b)=>[a[0]+b[0],a[1]+b[1]],mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const s1=[[Z(),Z(1)],[Z(1),Z()]],s2=[[Z(),Z(0,-1)],[Z(0,1),Z()]],s3=[[Z(1),Z()],[Z(),Z(-1)]],I=[[Z(1),Z()],[Z(),Z(1)]],pauli=[s1,s2,s3];
const dict={sigma1:s1,sigma2:s2,sigma3:s3,I2:I};
const kron=(a,b)=>a.flatMap(ar=>b.map(br=>ar.flatMap(x=>br.map(y=>mul(x,y)))));
const prod=(a,b)=>a.map(ar=>b[0].map((_,j)=>ar.reduce((s,v,k)=>plus(s,mul(v,b[k][j])),Z())));
const scale=(a,s)=>a.map(ar=>ar.map(v=>mul(v,s))),sum=(a,b)=>a.map((ar,i)=>ar.map((v,k)=>plus(v,b[i][k]))),minus=a=>scale(a,Z(-1)),comm=(a,b)=>sum(prod(a,b),minus(prod(b,a))),first8=a=>a.slice(0,8).map(r=>r.slice(0,8));
const zero=n=>Array.from({length:n},()=>Array.from({length:n},()=>Z()));
const delta=(a,b)=>a.flatMap((r,i)=>r.filter((v,k)=>v[0]!==b[i][k][0]||v[1]!==b[i][k][1])).length;
const nz=a=>a.flat().filter(x=>x[0]||x[1]).length;
const gammaOrder=[
 ['Gamma1','sigma2 tensor sigma3 tensor I2 tensor sigma1'],
 ['Gamma2','sigma2 tensor sigma3 tensor I2 tensor sigma2'],
 ['Gamma3','sigma2 tensor sigma3 tensor I2 tensor sigma3'],
 ['Gamma4','i*sigma1 tensor I2 tensor I2 tensor I2'],
 ['GammaPrime1','sigma2 tensor sigma1 tensor sigma1 tensor I2'],
 ['GammaPrime2','sigma2 tensor sigma1 tensor sigma2 tensor I2'],
 ['GammaPrime3','sigma2 tensor sigma1 tensor sigma3 tensor I2'],
 ['GammaPrime4','sigma2 tensor sigma2 tensor I2 tensor I2']
];
const sourceTable=[
 [1,2,'V^3=+2,U=0','W^3=+2','B_1^3=+2','both +i*sigma3'],
 [1,3,'V^2=-2,U=0','W^2=-2','B_1^2=-2','both -i*sigma2'],
 [2,3,'V^1=+2,U=0','W^1=+2','B_1^1=+2','both +i*sigma1'],
 [1,4,'U^1=+2,V=0','W^1=+2','B_1^1=-2','left +i*sigma1, right -i*sigma1'],
 [2,4,'U^2=+2,V=0','W^2=+2','B_1^2=-2','left +i*sigma2, right -i*sigma2'],
 [3,4,'U^3=+2,V=0','W^3=+2','B_1^3=-2','left +i*sigma3, right -i*sigma3']
];
const printedH1=[
 ['(1/2)*omega_L+(i/2)*W^3','Wplus','-(1/4)*e_R*phiOne','+(1/4)*e_R*phiPlus'],
 ['Wminus','(1/2)*omega_L-(i/2)*W^3','+(1/4)*e_R*phiMinus','+(1/4)*e_R*phiZero'],
 ['-(1/4)*e_L*phiZero','+(1/4)*e_L*phiPlus','(1/2)*omega_R+(i/2)*B_1^3','B1plus'],
 ['+(1/4)*e_L*phiMinus','+(1/4)*e_L*phiOne','B1minus','(1/2)*omega_R-(i/2)*B_1^3']
];
const phi={phiPlus:[Z(1),Z(0,-1),Z(),Z()],phiMinus:[Z(1),Z(0,1),Z(),Z()],phiZero:[Z(),Z(),Z(-1),Z(0,-1)],phiOne:[Z(),Z(),Z(-1),Z(0,1)]};
const mixedSourcePositions=[[0,2,-1,'R','phiOne'],[0,3,1,'R','phiPlus'],[1,2,1,'R','phiMinus'],[1,3,1,'R','phiZero'],[2,0,-1,'L','phiZero'],[2,1,1,'L','phiPlus'],[3,0,1,'L','phiMinus'],[3,1,1,'L','phiOne']];
const gamma=str=>{const hasI=str.startsWith('i*'),parts=(hasI?str.slice(2):str).split(' tensor ');if(parts.length!==4||parts.some(x=>!dict[x]))throw Error('source Pauli factor');const m=parts.map(x=>dict[x]).reduce(kron);return hasI?scale(m,Z(0,1)):m;};
const mixedPrinted=(mu,nu)=>{const out=zero(8);
 for(const [r,c,sgn,side,pName]of mixedSourcePositions){const e=mu===3?scale(I,Z(0,1)):scale(pauli[mu],Z(0,side==='R'?-1:1)),v=scale(e,mul(Z(sgn),phi[pName][nu]));for(let i=0;i<2;i++)for(let j=0;j<2;j++)out[2*r+i][2*c+j]=v[i][j];}return out;};
const expectedEW=(a,b)=>{
 const spatial=b<4,k=spatial?6-a-b:a,sgn=spatial?(a===1&&b===3?-1:1):1;
 const W=2*sgn,B=spatial?2*sgn:-2*sgn,output=zero(8);
 const spin=pauli[k-1];
 for(let side=0;side<2;side++)for(let i=0;i<2;i++)for(let j=0;j<2;j++)for(let gravity=0;gravity<2;gravity++){
  output[(2*side+i)*2+gravity][(2*side+j)*2+gravity]=mul(Z(0,(side===0?W:B)/2),spin[i][j]);
 }
 return{out:output,W,B,sgn,k,source_U:spatial?0:2*sgn,source_V:spatial?2*sgn:0};
};
function compute(cl=Cl){
 const src=cl.gamma_source.eight_ordered_generators.map(x=>gamma(x.source_tensor));
 const g=src.slice(0,4),p=src.slice(4);
 const omega=Array.from({length:6},(_,n)=>{const pairs=[[1,2],[1,3],[2,3],[1,4],[2,4],[3,4]],q=pairs[n];return first8(prod(p[q[0]-1],p[q[1]-1]));});
 const checked=[[1,2],[1,3],[2,3],[1,4],[2,4],[3,4]].map(([a,b])=>expectedEW(a,b));
 const pureMismatch=omega.map((m,k)=>delta(m,checked[k].out));
 const gravity=[[1,2],[1,3],[2,3],[1,4],[2,4],[3,4]].map(([a,b])=>first8(prod(g[a-1],g[b-1])));
 const native=g.flatMap(gr=>p.map(pr=>first8(prod(gr,pr))));
 const printed=Array.from({length:16},(_,k)=>mixedPrinted(Math.floor(k/4),k%4));
 const phase=printed.map((m,k)=>delta(m,scale(native[k],Z(0,-1))));
 let pureEWmixed=0,pureEWmixedPass=0,ewPairCases=0,ewPairPass=0,crossCases=0,crossZero=0;
 for(let i=0;i<6;i++){
  for(let k=0;k<16;k++){pureEWmixed++;pureEWmixedPass+=+(delta(comm(checked[i].out,printed[k]),scale(comm(omega[i],native[k]),Z(0,-1)))===0);}
  for(let k=i+1;k<6;k++){ewPairCases++;ewPairPass+=+(delta(comm(checked[i].out,checked[k].out),comm(omega[i],omega[k]))===0);}
  for(let gg=0;gg<6;gg++){crossCases++;crossZero+=+(nz(comm(checked[i].out,gravity[gg]))===0);}
 }
 let gravityMixed=0,gravityFailures=0,gravityChanged=0,ewMixed=0,ewFailures=0,ewChanged=0,disjoint=0,disjointNonzero=0,timelikeEW=0;
 const ewPairs=[[1,2],[1,3],[2,3],[1,4],[2,4],[3,4]],gPairs=ewPairs;
 for(let u=0;u<16;u++)for(let v=u+1;v<16;v++){
  const ma=Math.floor(u/4),mb=Math.floor(v/4),na=u%4,nb=v%4,nat=comm(native[u],native[v]),prt=comm(printed[u],printed[v]);
  if(na===nb){
   const key=gPairs.findIndex(([a,b])=>a===ma+1&&b===mb+1);
   const ncheck=scale(gravity[key],Z(-2)),pcheck=scale(gravity[key],Z(2));
   gravityMixed++;gravityFailures+=+(delta(nat,ncheck)+delta(prt,pcheck)>0);gravityChanged+=delta(nat,prt);
  }else if(ma===mb){
   const key=ewPairs.findIndex(([a,b])=>a===na+1&&b===nb+1),metric=ma===3?-1:1;
   const ncheck=scale(checked[key].out,Z(-2*metric)),pcheck=scale(checked[key].out,Z(2*metric));
   ewMixed++;ewFailures+=+(delta(nat,ncheck)+delta(prt,pcheck)>0);ewChanged+=delta(nat,prt);timelikeEW+=+(ma===3);
  }else{disjoint++;disjointNonzero+=+(nz(nat)!==0||nz(prt)!==0);}
 }
 return{pureMismatch,phase,pureEWmixed,pureEWmixedPass,ewPairCases,ewPairPass,crossCases,crossZero,gravityMixed,gravityFailures,gravityChanged,ewMixed,ewFailures,ewChanged,disjoint,disjointNonzero,timelikeEW};
}
function verify(pkt=A,cl=Cl,h1=H){
 const e=[],ok=(v,s)=>{if(!v)e.push(s)},f=pkt.finite_evidence||{},roles=pkt.basis_coefficient_contract||{},lim=pkt.reconstruction_limits||{};
 ok(pkt.schema==='isograph.lisi-l01-h1-ew-pure-coefficient-source.g0.v0.1'&&pkt.track==='L'&&pkt.stage==='G0'&&pkt.authority===false,'L source G0 only');
 ok(pkt.frozen_source?.id==='L01'&&pkt.frozen_source?.revision==='arXiv:0711.0770v1 2007-11-06'&&j(pkt.frozen_source?.printed_pages)===j([10,12]),'frozen original source p10 & 12');
 for(const [key,path]of[['Cl71_source_gamma',files.cl],['EW_printed_H1_source',files.h1],['previous_pure_gravity_mixed_G0',files.prev],['SSC0_28',files.ssc],['gate0_28',files.gate]])
  ok(pkt.dependency_pins?.[key]?.path===path&&pkt.dependency_pins?.[key]?.git_blob_sha===sha(path),'exact original source pin '+key);
 ok(SSC.items.length===191&&Gate.current_lawful_state.G1_authorized===false&&Prev.finite_observations.all_mixed_pairs.changed_nonzero_pairs===48,'source prior graph still G0');
 for(const k of ['source_census_frozen','complete_physical_gauge_theorem_qualified','G1_authorized','external_review_passed'])ok(pkt[k]===false,'no source theorem '+k);
 ok(j(cl.gamma_source.eight_ordered_generators.map(x=>[x.label,x.source_tensor]))===j(gammaOrder),'source Pauli Gamma exact');
 ok(j(h1.displayed_4x4_2x2_field_blocks.ordered_rows)===j(printedH1),'source printed H1 coefficient ordered rows exact');
 ok(roles.source_selection?.includes('w_ew^{ab}=+1')&&roles.printed_chiral_operator?.includes('tensor each scalar 4x4 entry')&&roles.role_transport==='W^tau=V^tau+U^tau, B_1^tau=V^tau-U^tau; V for 3 spatial γ′ pairs, U for 3 mixed with fourth positive γ′ generator; source\'s 1/2 antisymmetric coefficient sum fixes factor of two for selected ordered pair.','real source W/B1 two separate Pauli operators');
 const expected=sourceTable.map(([a,b,uv,w,v,blocks])=>({a,b,source_electroweak_vector:uv,W:w,B1:v,printed_L_and_R:blocks}));
 ok(j(pkt.six_exact_source_pair_images)===j(expected),'all six signed source W/B1 source Pauli coefficient rows independently frozen');
 ok(f.source_primed_bivector_pairs===6&&f.matrix_dimension===8&&f.each_coefficient_case_tested===64&&f.native_vs_printed_complex_matrix_entry_mismatches===0,'six exact source 8x8 coefficient equalities');
 ok(f.pure_ew_with_mixed_cases===96&&f.pure_ew_mixed_bracket_phase_covariant===96&&f.pure_ew_with_pure_ew_pairs===15&&f.source_pure_ew_to_printed_bracket_agreement===15&&f.source_pure_gravity_pure_ew_cross_pairs===36&&f.gravity_ew_bracket_zero_pairs===36,'complete source pure EW coefficient bracket controls');
 ok(f.all_source_mixed_bracket_pairs===120&&f.source_mixed_mixed_nonzero_pairs===48&&f.gravity_target_24_sign_changed===24&&f.ew_target_24_sign_changed===24&&f.disjoint_72_zero===72,'both source typed mixed bracket channels');
 ok(f.source_ew_output_bracket_sample?.native_mixed_operator_bracket==='[X_11,X_12]=-2*E_12'&&f.source_ew_output_bracket_sample?.printed_mixed_operator_bracket==='[P_11,P_12]=+2*E_12','source primed coefficient first witness');
 ok(f.source_ew_output_bracket_sample?.real_source_gravity_metric_sign_caveat?.includes('mu=4 timelike'),'Cl(7,1) mixed coefficient timelike guard');
 ok(f.phase_factor_project_diagnostic_only===true&&f.pure_source_omega_negative_evidence_conserved===true,'no source-authorized phase');
 for(const k of ['source_full_graded_curvature_reconstructed','source_field_connection_differential_forms_identified_everywhere','source_published_Wplus_Bplus_scalar_normalizations_independently_reconstructed','source_source_authorized_relative_i_repair_found','source_complete_G0','source_native_primitive_closure','author_paper_physical_theory_disproved','cross_track_source_used'])ok(lim[k]===false,'explicit scope/unresolved source '+k);
 ok(pkt.next_lawful_work?.some(x=>x.includes('full L01–L06'))&&pkt.next_lawful_work?.some(x=>x.includes('source G0 fixed point')),'no false source completion');
 ok(!j(pkt).includes('W-SSC-'),'track L firewall');
 if(e.length)return e;
 try{const obs=compute(cl);
  ok(obs.pureMismatch.length===6&&obs.pureMismatch.every(z=>z===0),'independent 6 primed bivector Pauli source matches');
  ok(obs.phase.length===16&&obs.phase.every(z=>z===0),'16 printed H1 source mixed coefficients independently reformed');
  ok(obs.pureEWmixed===96&&obs.pureEWmixedPass===96,'96 primed pure/mixed compatibility');
  ok(obs.ewPairCases===15&&obs.ewPairPass===15&&obs.crossCases===36&&obs.crossZero===36,'all pure/pure EW and gravity/EW coefficient commutators');
  ok(obs.gravityMixed===24&&obs.gravityFailures===0&&obs.gravityChanged===192&&obs.ewMixed===24&&obs.ewFailures===0&&obs.ewChanged===192,'all 48 mixed output source typed with original gravity metric');
  ok(obs.disjoint===72&&obs.disjointNonzero===0&&obs.timelikeEW===6,'mixed disjoint cases zero and six timelike controls');
 }catch(err){e.push('original source Pauli reconstruction failure '+String(err));}
 return e;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['invert right SU2 boost sign',p=>{p.six_exact_source_pair_images[3].B1='B_1^1=+2'}],
 ['wrong source double antisymmetric factor',p=>{p.basis_coefficient_contract.source_selection='w_ew^{ab}=1/2'}],
 ['confuse SU2 left/right',p=>{p.six_exact_source_pair_images[0].printed_L_and_R='only left +i*sigma3'}],
 ['erase one EW pair',p=>{p.six_exact_source_pair_images.pop()}],
 ['source prime timelike false',p=>{p.finite_evidence.source_ew_output_bracket_sample.real_source_gravity_metric_sign_caveat='all plus'}],
 ['forget timelike sample bracket',p=>{p.finite_evidence.ew_target_24_sign_changed=18}],
 ['erase mixed EW source bracket',p=>{p.finite_evidence.source_ew_output_bracket_sample.native_mixed_operator_bracket='0'}],
 ['erase primed phase covariance',p=>{p.finite_evidence.pure_ew_mixed_bracket_phase_covariant=0}],
 ['erase 36 gravity-EW zero cases',p=>{p.finite_evidence.gravity_ew_bracket_zero_pairs=0}],
 ['invent source minus i',p=>{p.finite_evidence.phase_factor_project_diagnostic_only=false}],
 ['premature Wplus source closure',p=>{p.reconstruction_limits.source_published_Wplus_Bplus_scalar_normalizations_independently_reconstructed=true}],
 ['premature graded geometry',p=>{p.reconstruction_limits.source_full_graded_curvature_reconstructed=true}],
 ['premature physical error',p=>{p.reconstruction_limits.author_paper_physical_theory_disproved=true}],
 ['premature G1',p=>{p.G1_authorized=true}],
 ['external reviewer false',p=>{p.external_review_passed=true}],
 ['source page altered',p=>{p.frozen_source.revision='arXiv:0711.0770v2'}],
 ['tamper input pin',p=>{p.dependency_pins.Cl71_source_gamma.git_blob_sha='stale'}],
 ['W import',p=>{p.frozen_source.id='W-SSC-103'}],
 ['source gamma wrong',(_p,c)=>{c.gamma_source.eight_ordered_generators[7].source_tensor='sigma2 tensor sigma1 tensor I2 tensor I2'}],
 ['source H1 sign wrong',(_p,_c,h)=>{h.displayed_4x4_2x2_field_blocks.ordered_rows[2][0] = '+(1/4)*e_L*phiZero'}]
];
let rejected=0;if(!baseline.length)for(const [name,fn]of mutants){const p=cp(A),c=cp(Cl),h=cp(H),base=j([p,c,h]);fn(p,c,h);if(j([p,c,h])===base)errors.push('NO-OP '+name);else if(verify(p,c,h).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-ew-pure-source-g0.v0.1',pass:errors.length===0,errors,pure_ew_pairs:6,source_ew_mixed_covariant:96,source_gravity_ew_commuting:36,mixed_source_bracket_cases:120,source_ew_target_24_sourced:true,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,external_review_passed:false,physical_theorem_qualified:false},null,2));if(errors.length)process.exitCode=1;
