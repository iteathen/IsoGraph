import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
 packet:L+'LISI_L01_H1_PURE_GRAVITY_AND_ALL_MIXED_BRACKET_SOURCE_G0_0_1.json',
 gamma:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
 h1:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
 prev:L+'LISI_L01_H1_PHASE_ONLY_LIE_BRACKET_OBSTRUCTION_G0_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_27.json',gate:E+'L_CURRENT_STAGE_GATE_0_27.json'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const A=load(paths.packet),CL=load(paths.gamma),H=load(paths.h1),Prev=load(paths.prev),SSC=load(paths.ssc),Gate=load(paths.gate);
const Z=(re=0,im=0)=>[re,im],add=([a,b],[c,d])=>[a+c,b+d],times=([a,b],[c,d])=>[a*c-b*d,a*d+b*c],I=[[Z(1),Z()],[Z(),Z(1)]],s1=[[Z(),Z(1)],[Z(1),Z()]],s2=[[Z(),Z(0,-1)],[Z(0,1),Z()]],s3=[[Z(1),Z()],[Z(),Z(-1)]];
const pauli={sigma1:s1,sigma2:s2,sigma3:s3,I2:I};
const kron=(a,b)=>a.flatMap(ar=>b.map(br=>ar.flatMap(v=>br.map(w=>times(v,w)))));
const product=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((u,x,k)=>add(u,times(x,b[k][j])),Z())));
const scale=(a,v)=>a.map(row=>row.map(x=>times(x,v))),sum=(a,b)=>a.map((row,i)=>row.map((x,k)=>add(x,b[i][k])));
const minus=a=>scale(a,Z(-1)),comm=(a,b)=>sum(product(a,b),minus(product(b,a))),first8=a=>a.slice(0,8).map(row=>row.slice(0,8));
const compare=(a,b)=>{let n=0;for(let i=0;i<a.length;i++)for(let k=0;k<a[0].length;k++)if(a[i][k][0]!==b[i][k][0]||a[i][k][1]!==b[i][k][1])n++;return n;};
const nz=a=>a.flat().filter(x=>x[0]||x[1]).length,zeros=n=>Array.from({length:n},()=>Array.from({length:n},()=>Z()));
const sourceGamma=[
 ['Gamma1','sigma2 tensor sigma3 tensor I2 tensor sigma1'],
 ['Gamma2','sigma2 tensor sigma3 tensor I2 tensor sigma2'],
 ['Gamma3','sigma2 tensor sigma3 tensor I2 tensor sigma3'],
 ['Gamma4','i*sigma1 tensor I2 tensor I2 tensor I2'],
 ['GammaPrime1','sigma2 tensor sigma1 tensor sigma1 tensor I2'],
 ['GammaPrime2','sigma2 tensor sigma1 tensor sigma2 tensor I2'],
 ['GammaPrime3','sigma2 tensor sigma1 tensor sigma3 tensor I2'],
 ['GammaPrime4','sigma2 tensor sigma2 tensor I2 tensor I2']
];
const expectedRows=[
 ['(1/2)*omega_L+(i/2)*W^3','Wplus','-(1/4)*e_R*phiOne','+(1/4)*e_R*phiPlus'],
 ['Wminus','(1/2)*omega_L-(i/2)*W^3','+(1/4)*e_R*phiMinus','+(1/4)*e_R*phiZero'],
 ['-(1/4)*e_L*phiZero','+(1/4)*e_L*phiPlus','(1/2)*omega_R+(i/2)*B_1^3','B1plus'],
 ['+(1/4)*e_L*phiMinus','+(1/4)*e_L*phiOne','B1minus','(1/2)*omega_R-(i/2)*B_1^3']
];
const phi={phiPlus:[Z(1),Z(0,-1),Z(),Z()],phiMinus:[Z(1),Z(0,1),Z(),Z()],phiZero:[Z(),Z(),Z(-1),Z(0,-1)],phiOne:[Z(),Z(),Z(-1),Z(0,1)]};
const sourcePairs=[[1,2],[1,3],[2,3],[1,4],[2,4],[3,4]];
const printedOmega=[
 ['[i*sigma3,i*sigma3,i*sigma3,i*sigma3]','omega_S^3=+1'],
 ['[-i*sigma2,-i*sigma2,-i*sigma2,-i*sigma2]','omega_S^2=-1'],
 ['[i*sigma1,i*sigma1,i*sigma1,i*sigma1]','omega_S^1=+1'],
 ['[+sigma1,+sigma1,-sigma1,-sigma1]','omega_T^1=+1'],
 ['[+sigma2,+sigma2,-sigma2,-sigma2]','omega_T^2=+1'],
 ['[+sigma3,+sigma3,-sigma3,-sigma3]','omega_T^3=+1']
];
const terms=[
 [0,2,-1,'R','phiOne'],[0,3,1,'R','phiPlus'],[1,2,1,'R','phiMinus'],[1,3,1,'R','phiZero'],
 [2,0,-1,'L','phiZero'],[2,1,1,'L','phiPlus'],[3,0,1,'L','phiMinus'],[3,1,1,'L','phiOne']
];
function gamma(v){
 const imaginary=v.startsWith('i*'),tokens=(imaginary?v.slice(2):v).split(' tensor ');
 if(tokens.length!==4||tokens.some(x=>!pauli[x]))throw Error('source Pauli tensor not recognized');
 const a=tokens.map(x=>pauli[x]).reduce(kron);
 return imaginary?scale(a,Z(0,1)):a;
}
function printedMatrix(mu,nu,rows=expectedRows){
 const a=zeros(8);
 const rx=/^([+-])\(1\/4\)\*e_([RL])\*(phiPlus|phiMinus|phiZero|phiOne)$/;
 for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const match=rx.exec(rows[row][col]);if(!match)continue;
  const coeff=phi[match[3]][nu],basis=mu===3?I:[s1,s2,s3][mu],pref=mu===3?Z(0,1):Z(0,match[2]==='R'?-1:1);
  const term=scale(basis,times(Z(match[1]==='+'?1:-1),times(pref,coeff)));
  for(let i=0;i<2;i++)for(let j=0;j<2;j++)a[2*row+i][2*col+j]=term[i][j];
 }
 return a;
}
function printedGravityPair(mu,k){
 const a=zeros(8),spatial=k<3;
 // source mu,k zero-based; for spatial pairs, remaining spatial index is 0+1+2-mu-k=3-mu-k.
 const which=spatial?3-mu-k:mu;
 const spin=[s1,s2,s3][which];if(!spin)throw Error('bad spatial Clifford index');
 const orientation=!spatial?1:(mu===0&&k===2?-1:1);
 for(let block=0;block<4;block++){
  const pref=spatial?Z(0,orientation):Z(block<2?1:-1);
  const pair=scale(spin,pref);
  for(let i=0;i<2;i++)for(let j=0;j<2;j++)a[2*block+i][2*block+j]=pair[i][j];
 }
 return a;
}
function compute(cl=CL,h1=H){
 const sourceFields=cl.gamma_source.eight_ordered_generators;
 const eight=sourceFields.map(x=>gamma(x.source_tensor)), gravity=eight.slice(0,4), prime=eight.slice(4);
 const Gi=sourcePairs.map(([mu,k])=>first8(product(gravity[mu-1],gravity[k-1])));
 const omega=sourcePairs.map(([mu,k])=>printedGravityPair(mu-1,k-1));
 const pureDiff=Gi.map((g,i)=>compare(g,omega[i]));
 const X=gravity.flatMap(g=>prime.map(q=>first8(product(g,q))));
 const P=Array.from({length:16},(_,id)=>printedMatrix(Math.floor(id/4),id%4,h1.displayed_4x4_2x2_field_blocks.ordered_rows));
 const mixedPhase=Array.from({length:16},(_,id)=>compare(P[id],scale(X[id],Z(0,-1))));
 let rawSourceMixedDifference=0;
 for(let id=0;id<16;id++)rawSourceMixedDifference+=compare(P[id],X[id]);
 let pureMixedTotal=0,pureMixedPass=0;
 for(let gi=0;gi<6;gi++)for(let x=0;x<16;x++){
  pureMixedTotal++;pureMixedPass+=+(compare(comm(omega[gi],P[x]),scale(comm(Gi[gi],X[x]),Z(0,-1)))===0);
 }
 let GG=0,GGpass=0;
 for(let i=0;i<6;i++)for(let k=i+1;k<6;k++){
  GG++;GGpass+=+(compare(comm(omega[i],omega[k]),comm(Gi[i],Gi[k]))===0);
 }
 const classes={same_mu:{pairs:0,nonzero:0,flipped:0,changed_cells:0},same_nu:{pairs:0,nonzero:0,flipped:0,changed_cells:0},disjoint:{pairs:0,nonzero:0,flipped:0,changed_cells:0}};
 let firstNative=null,firstPrime=null;
 for(let a=0;a<16;a++)for(let b=a+1;b<16;b++){
  const className=Math.floor(a/4)===Math.floor(b/4)?'same_mu':a%4===b%4?'same_nu':'disjoint';
  const n=comm(X[a],X[b]),p=comm(P[a],P[b]),o=classes[className];
  o.pairs++;o.nonzero+=+(nz(n)>0);
  const neq=compare(n,p),flipped=neq>0;
  o.flipped+=+flipped;o.changed_cells+=neq;
  if(className==='same_mu'&&flipped&&!firstPrime)firstPrime={a:[Math.floor(a/4)+1,a%4+1],b:[Math.floor(b/4)+1,b%4+1],native_nonzero:nz(n),printed_nonzero:nz(p),different_cells:neq};
  if(className==='same_nu'&&flipped&&!firstNative)firstNative={a:[Math.floor(a/4)+1,a%4+1],b:[Math.floor(b/4)+1,b%4+1],native_nonzero:nz(n),printed_nonzero:nz(p),different_cells:neq};
 }
 const firstG12=Gi[0],native=comm(X[0],X[4]),p=comm(P[0],P[4]);
 return{pureDiff,mixedPhase,rawSourceMixedDifference,pureMixedTotal,pureMixedPass,GG,GGpass,classes,firstNative,firstPrime,
 witness:{native00:native[0][0],printed00:p[0][0],pure00:firstG12[0][0],native_target_delta:compare(native,scale(firstG12,Z(-2))),printed_target_delta:compare(p,scale(firstG12,Z(2)))}};
}
function verify(p=A,cl=CL,h1=H){
 const err=[],ok=(v,s)=>{if(!v)err.push(s)};
 ok(p.schema==='isograph.lisi-l01-h1-pure-mixed-full-graded-coefficient-bracket-audit.g0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'L G0 only');
 ok(p.frozen_source?.revision==='arXiv:0711.0770v1 2007-11-06'&&j(p.frozen_source?.primary_source_pages)===j([8,9,10,12]),'frozen primary PDF page provenance');
 for(const [i,name]of ['native_source_gamma','printed_source_H1','earlier_24_gravity_bracket','source_SSC_0_27','procedural_gate_0_27'].entries()){
  const k=[paths.gamma,paths.h1,paths.prev,paths.ssc,paths.gate][i];
  ok(p.dependency_pins?.[name]?.path===k&&p.dependency_pins?.[name]?.git_blob_sha===sha(k),'exact parent blob '+name);
 }
 for(const k of ['source_census_frozen','source_complete','source_mathematical_theorem_qualified','G1_authorized','external_cold_review_passed'])ok(p[k]===false,'no premature source authority '+k);
 ok(SSC.items.length===191&&Gate.current_lawful_state.G1_authorized===false&&Prev.finite_scope.independent_mixed_mixed_bracket_cases===24,'old source remains G0 under 191 IDs');
 ok(j(cl.gamma_source?.eight_ordered_generators?.map(x=>[x.label,x.source_tensor]))===j(sourceGamma),'eight exact primary-source gamma Kronecker tensors');
 ok(j(h1.displayed_4x4_2x2_field_blocks?.ordered_rows)===j(expectedRows),'printed H1 exact 4x4 spinor blocks');
 ok(p.source_roles?.native_mixed?.includes('COEFFICIENT')&&p.source_roles?.matrix_bracket?.includes('ONE-FORM')&&p.source_roles?.pure_electroweak_channel?.includes('does NOT independently identify'),'matrix coefficient/wedge/electroweak semantics separated');
 ok(p.source_roles?.original_source_gamma_metric==='diag(+,+,+,-,+,+,+,+); do not suppress timelike sign or alter phi scalar reality','real source metric and scalar roles');
 ok(p.independent_printed_omega_six_cases?.length===6,'six pure gravity source bivectors required');
 for(let id=0;id<6;id++){
  const a=p.independent_printed_omega_six_cases[id]||{},[mu,k]=sourcePairs[id];
  ok(a.mu===mu&&a.kappa===k&&a.printed_four_2spin_diagonal_blocks===printedOmega[id][0], 'Eq2.8 gravitational source spinor blocks pair '+id);
  ok((a.source_spatial_spin??a.source_boost_spin)===printedOmega[id][1],'Eq2.8 Levi/T signs pair '+id);
 }
 const f=p.finite_observations||{},pairs=f.all_mixed_pairs||{},I=p.source_implications_and_nonclaims||{};
 ok(f.gravity_pairs===6&&f.native_to_printed_pure_omega_nonzero_entry_mismatches===0&&f.mixed_pairs===16&&f.mixed_direct_native_vs_printed_nonzero_entry_mismatches===128&&f.printed_mixed_equals_diagnostic_minus_i_native_all_16===true&&f.source_mixed_phase_source_authorized===false,'source mixed and pure gamma assumptions');
 ok(f.pure_gravity_with_mixed_brackets?.pairs===96&&f.pure_gravity_with_mixed_brackets?.passes_under_diagnostic_F_G_identity_F_X_minus_i===96&&f.pure_gravity_with_mixed_brackets?.failures===0,'source mixed-pure co-variance all 96');
 ok(pairs.pairs===120&&pairs.nonzero_total===48&&pairs.changed_nonzero_pairs===48&&pairs.changed_matrix_entries===384,'all 120 source matrix coefficient pairs enumerated');
 const want={share_gravity_mu:[24,24,24,192,'SOURCE_PRIMED_CLIFFORD_BIVECTOR_NOT_FULLY_MATCHED_TO_PRINTED_SU2_FIELD_COEFFICIENTS'],
 share_higgs_nu:[24,24,24,192,'SOURCE_PURE_GRAVITY_BIVECTOR_FULLY_MATCHED_TO_PRINTED_OMEGA_IN_SAME_FIXED_ORDER'],
 disjoint_indices:[72,0,0,0,null]};
 for(const [name,[pairCount,nzCount,changed,cellCount,channel]]of Object.entries(want)){
  const v=pairs[name]||{};
  ok(v.pairs===pairCount&&v.nonzero===nzCount&&v.phase_bracket_sign_changed===changed&&v.changed_matrix_entries===cellCount,'source index class '+name);
  if(channel)ok(v.channel===channel,'source index class scope '+name);
 }
 ok(I.source_pure_gravity_fixed_was_not_an_arbitrary_test_assumption?.includes('ALL SIX')&&I.not_claimed_primed_source_field_equality?.includes('not yet')&&I.not_claimed_differential_curvature?.includes('matrix COEFFICIENTS'),'narrow claim and explicit excluded extra authorities');
 ok(I.source_mixed_phase_only_fails_gravity_bracket?.includes('24 mixed/mixed')&&I.all_current_G1_G7_authorized===false&&I.no_cross_track===true,'theory and stage claim bounded');
 ok(p.next_lawful_steps?.some(s=>s.includes('source itself explicitly normalizes'))&&p.next_lawful_steps?.some(s=>s.includes('Full frozen L01–L06')),'earliest lawful source task still G0');
 ok(!j(p).includes('W-SSC-'),'no W source contamination');
 if(err.length)return err;
 try{
  const data=compute(cl,h1);
  ok(data.pureDiff.length===6&&data.pureDiff.every(n=>n===0),'independently reconstructed six printed omega vs native gamma spin-bivectors');
  ok(data.mixedPhase.length===16&&data.mixedPhase.every(n=>n===0)&&data.rawSourceMixedDifference===128,'source native/printed mixed coefficients reconstruction');
  ok(data.pureMixedTotal===96&&data.pureMixedPass===96&&data.GG===15&&data.GGpass===15,'all source pure/mixed and pure/pure coefficient brackets');
  for(const [name,key]of [['same_mu','share_gravity_mu'],['same_nu','share_higgs_nu'],['disjoint','disjoint_indices']]){
   const a=data.classes[name],b=pairs[key]||{};
   ok(a.pairs===b.pairs&&a.nonzero===b.nonzero&&a.flipped===b.phase_bracket_sign_changed&&a.changed_cells===b.changed_matrix_entries,'all direct source bracket matrix entries class '+name);
  }
  ok(data.firstNative?.a[0]===1&&data.firstNative?.b[0]===2&&data.firstNative?.a[1]===1&&data.firstNative?.b[1]===1&&data.firstNative?.different_cells===8,'native first 24 source gravity sign mismatch');
  ok(data.firstPrime?.a[0]===1&&data.firstPrime?.b[0]===1&&data.firstPrime?.a[1]===1&&data.firstPrime?.b[1]===2&&data.firstPrime?.different_cells===8,'first primed sign mismatch is not full source W/B verification');
  ok(j(data.witness)===j({native00:Z(0,-2),printed00:Z(0,2),pure00:Z(0,1),native_target_delta:0,printed_target_delta:0}),'exact source G12 gravity witness with no arbitrary pure-sector phase');
 }catch(e){err.push('independent source matrix reconstruction error '+String(e));}
 return err;
}
const baseline=verify(),errors=[...baseline],mutations=[
 ['invert omega spatial orientation',p=>{p.independent_printed_omega_six_cases[1].printed_four_2spin_diagonal_blocks='[+i*sigma2,+i*sigma2,+i*sigma2,+i*sigma2]'}],
 ['reverse omega T orientation',p=>{p.independent_printed_omega_six_cases[2].printed_four_2spin_diagonal_blocks='[-sigma1,-sigma1,+sigma1,+sigma1]'}],
 ['omit timelike metric',p=>{p.source_roles.original_source_gamma_metric='all eight positive'}],
 ['invent split source',p=>{p.frozen_source.revision='arXiv:0711.0770v2'}],
 ['erase gravity match',p=>{p.finite_observations.native_to_printed_pure_omega_nonzero_entry_mismatches=6}],
 ['erase mixed 16 coefficient comparison',p=>{p.finite_observations.mixed_pairs=0}],
 ['change mixed phase',p=>{p.finite_observations.printed_mixed_equals_diagnostic_minus_i_native_all_16=false}],
 ['invent source-authorized phase',p=>{p.finite_observations.source_mixed_phase_source_authorized=true}],
 ['erase mixed-pure test',p=>{p.finite_observations.pure_gravity_with_mixed_brackets.passes_under_diagnostic_F_G_identity_F_X_minus_i=0}],
 ['erase primed Lie failures',p=>{p.finite_observations.all_mixed_pairs.share_gravity_mu.phase_bracket_sign_changed=0}],
 ['erase pure-gravity Lie failures',p=>{p.finite_observations.all_mixed_pairs.share_higgs_nu.phase_bracket_sign_changed=0}],
 ['mislabel commuting disjoint case',p=>{p.finite_observations.all_mixed_pairs.disjoint_indices.nonzero=72}],
 ['claim 120 wrong',p=>{p.finite_observations.all_mixed_pairs.pairs=119}],
 ['fake full electroweak source proof',p=>{p.source_roles.pure_electroweak_channel='all printed W B generators fully matched'}],
 ['fake differential form theorem',p=>{p.source_roles.matrix_bracket='full exterior curvature is proved by source matrix commutators'}],
 ['promote physical theory',p=>{p.source_mathematical_theorem_qualified=true}],
 ['promote current G1',p=>{p.G1_authorized=true}],
 ['promote external review',p=>{p.external_cold_review_passed=true}],
 ['falsify source gamma pin',p=>{p.dependency_pins.native_source_gamma.git_blob_sha='STORAGE'}],
 ['erase uncertain alternate source normalizations',p=>{p.next_lawful_steps=[]}],
 ['W track import',p=>{p.frozen_source.id='W-SSC-103'}],
 ['tamper gamma source',(_p,c)=>{c.gamma_source.eight_ordered_generators[3].source_tensor='sigma1 tensor I2 tensor I2 tensor I2'}],
 ['tamper H1 source sign',(_p,_c,h)=>{h.displayed_4x4_2x2_field_blocks.ordered_rows[0][2]='+(1/4)*e_R*phiOne'}]
];
let rejected=0;
if(!baseline.length)for(const [name,mut]of mutations){
 const p=cp(A),c=cp(CL),h=cp(H),b=j([p,c,h]);mut(p,c,h);
 if(j([p,c,h])===b)errors.push('mutation NO-OP '+name);
 else if(verify(p,c,h).length===0)errors.push('ESCAPED mutation '+name);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l01-h1-independent-pure-and-120-mixed-bracket.v0.1',pass:errors.length===0,errors,
 source_pure_gravity_pairs:6,pure_mixed_bracket_cases:96,source_mixed_matrix_pairs:16,
 all_mixed_mixed_bracket_pairs:120,nonzero_mixed_brackets:48,
 source_mixed_gravity_channel_countercases:24,nonadjudicated_primed_channel_countercases:24,
 adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',
 source_complete:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
