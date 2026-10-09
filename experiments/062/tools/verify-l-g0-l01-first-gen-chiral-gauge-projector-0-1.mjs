// L-only original L01 G0: source p12 pure gauge chiral blocks versus p24/p27 shorthand.
// Scope: exact isolated 4x4 printed coefficient pattern lifted by I2; not E8 full fermion action.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P=R+'LISI_L01_FIRST_GEN_CHIRAL_GAUGE_PROJECTOR_G0_0_1.json';
const O=R+'SOURCE_SEMANTIC_CENSUS_0_41.json',N=R+'SOURCE_SEMANTIC_CENSUS_0_42.json';
const G041=E+'L_CURRENT_STAGE_GATE_0_41.json',G0=E+'L_CURRENT_STAGE_GATE_0_42.json',G1=E+'L_CURRENT_STAGE_GATE_0_43.json';
const CH=R+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json';
const RT=R+'LISI_L01_RIGHT_ACTION_CONTRAGREDIENT_G0_0_1.json';
const SELF=E+'tools/verify-l-g0-l01-first-gen-chiral-gauge-projector-0-1.mjs';
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex');};
const cx=(a=0,b=0)=>[a,b],addC=(a,b)=>[a[0]+b[0],a[1]+b[1]],mulC=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const z=(m,n)=>Array.from({length:m},()=>Array.from({length:n},()=>cx()));
const add=(a,b)=>a.map((row,i)=>row.map((v,j)=>addC(v,b[i][j])));
const mm=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((s,v,k)=>addC(s,mulC(v,b[k][j])),cx())));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>cx(i===j?1:0)));
const proj=(indices,n)=>{const o=z(n,n);for(const i of indices)o[i][i]=cx(1);return o;};
const scaleI=(a,n)=>{const o=z(a.length*n,a[0].length*n);for(let i=0;i<a.length;i++)for(let j=0;j<a[0].length;j++)for(let t=0;t<n;t++)o[i*n+t][j*n+t]=[...a[i][j]];return o;};
const EXPECT_W=[['W3',0,0,'i/2'],['W3',1,1,'-i/2'],['Wplus',0,1,'1'],['Wminus',1,0,'1']];
const EXPECT_B=[['B13',2,2,'i/2'],['B13',3,3,'-i/2'],['B1plus',2,3,'1'],['B1minus',3,2,'1']];
const SEEDS=[
 {W3:2,Wplus:3,Wminus:-4,B13:6,B1plus:-7,B1minus:9},
 {W3:-4,Wplus:11,Wminus:5,B13:-2,B1plus:13,B1minus:-8},
 {W3:8,Wplus:-3,Wminus:2,B13:10,B1plus:4,B1minus:6},
 {W3:-10,Wplus:7,Wminus:-5,B13:12,B1plus:3,B1minus:-11}
];
const entryFormula=(name,factor,seed)=>{const a=seed[name];if(!Number.isInteger(a))throw Error('unknown field '+name);
 if(factor==='1')return cx(a);
 if(factor==='i/2')return cx(0,a/2);
 if(factor==='-i/2')return cx(0,-a/2);
 throw Error('bad coefficient '+factor);
};
const build=(entries,seed)=>{const M=z(4,4);for(const v of entries){M[v.row][v.col]=addC(M[v.row][v.col],entryFormula(v.symbol,v.factor,seed));}return M;};
function mathAudit(block,opts={}){
 const fails=[],check=(x,msg)=>{if(!x)fails.push(msg)};
 const lhs=JSON.stringify(block.column_labels),lbl='["nu_eL","eL","nu_eR","eR"]';
 check(lhs===lbl,'original chiral source field ordering fixed');
 const Wsource=block.W_source_coefficients,Bsource=block.B1_source_coefficients;
 const Pl=proj(opts.swapProjectors?[2,3]:[0,1],4),Pr=proj(opts.swapProjectors?[0,1]:[2,3],4);
 let fieldChecks=0,spinChecks=0,coeffCells=0,sourceMixedCountercases=0,nonSymmetry=0;
 for(const seed of SEEDS){
  const W=build(Wsource,seed),B=build(Bsource,seed);
  check(eq(mm(Pl,mm(W,Pl)),W)&&eq(mm(Pr,mm(B,Pr)),B),'printed sector supports across six gauge coefficients');
  check(eq(mm(W,Pr),z(4,4))&&eq(mm(B,Pl),z(4,4)),'opposite chirality annihilated');
  check(!eq(W,B)&&!eq(W,z(4,4))&&!eq(B,z(4,4)),'both independently nonzero sources');
  if(!eq(W,mm(W,Pl))||!eq(B,mm(B,Pr)))nonSymmetry++;
  const total=add(opts.omitW?z(4,4):W,opts.omitB?z(4,4):B);
  if(opts.includeMixed)total[0][2]=cx(7);
  for(let k=0;k<16;k++){
   const X=z(4,4);X[Math.floor(k/4)][k%4]=cx(1);
   const raw=mm(total,X);
   const separate=z(4,4);
   // Independent oracle uses source chiral row-selection, not the matrix multiplication/projector path.
   for(let row=0;row<4;row++)for(let col=0;col<4;col++){
    for(let src=(row<2?0:2);src<(row<2?2:4);src++){
     separate[row][col]=addC(separate[row][col],mulC(row<2?W[row][src]:B[row][src],X[src][col]));
    }
   }
   check(eq(raw,separate),'source 4x4 printed block vs chiral coordinate oracle seed '+seed.W3+' basis '+k);
   fieldChecks++;
  }
  const W8=scaleI(W,2),B8=scaleI(B,2),P8=scaleI(Pl,2),Q8=scaleI(Pr,2);
  check(eq(mm(W8,Q8),z(8,8))&&eq(mm(B8,P8),z(8,8)),'source actual 2-spinor factor lifted chiral supports');
  const combined8=add(W8,B8);
  for(let k=0;k<64;k++){
   const X=z(8,8);X[Math.floor(k/8)][k%8]=cx(1);
   const out=mm(combined8,X), projected=add(mm(W8,mm(P8,X)),mm(B8,mm(Q8,X)));
   check(eq(out,projected),'source 8x8 scalar-spinor lifted chiral support seed '+seed.W3+' basis '+k);
   spinChecks++;
  }
  // Original source ephi has off-diagonal 2spin blocks. Projecting it like pure W+B is false.
  const K=z(4,4);K[0][2]=cx(7);K[2][0]=cx(-11);
  check(!eq(mm(K,Pl),K)&&!eq(mm(K,Pr),K),'mixed frame-Higgs source not block-preserving');
  const Y=z(4,4);Y[2][1]=cx(1);
  check(!eq(mm(K,Y),mm(K,mm(Pl,Y))),'cross-chirality ephi cannot obey a single pure gauge projector');
  sourceMixedCountercases++;
  for(const [name,i,j,sgn] of EXPECT_W)check(Wsource.some(x=>x.symbol===name&&x.row===i&&x.col===j&&x.factor===sgn),'literal original W cell '+name+':'+i+':'+j);
  for(const [name,i,j,sgn] of EXPECT_B)check(Bsource.some(x=>x.symbol===name&&x.row===i&&x.col===j&&x.factor===sgn),'literal original B1 cell '+name+':'+i+':'+j);
  coeffCells+=8;
 }
 check(fieldChecks===64&&spinChecks===256&&sourceMixedCountercases===4&&coeffCells===32,'coverage contract 4 seeds 16+64 basis');
 check(nonSymmetry===0,'all printed chiral gauge terms individually supported');
 return {pass:fails.length===0,failures:fails,Gaussian_integer_fields:true,distinct_nonzero_gauge_seeds:SEEDS.length,
 four_field_label_basis_matrix_products:fieldChecks,eight_spinor_basis_matrix_products:spinChecks,
 printed_coefficient_source_literal_cases:coeffCells,source_frame_Higgs_mixed_countercases:sourceMixedCountercases,
 original_E8_full_spinor_rep_qualified:false,H2_component_sign_qualified:false};
}
function sourceCheck(p,old,newC,gate){
 const errors=[],ck=(x,msg)=>{if(!x)errors.push(msg)};
 ck(p.schema==='isograph.lisi-L01-first-generation-chiral-gauge-support-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'source only G0');
 ck(p.original_source?.revision==='arXiv:0711.0770v1'&&p.original_source.id==='L01'&&p.original_source.printed_pages?.join('|')==='10|11|12|23|24|27|28','original source page/modality exact');
 for(const [name,path]of [['H1_chiral',CH],['right_module_041',RT],['census041',O],['gate041',G041],['gate042',G0]])
  ck(p.parent_evidence?.[name]?.path===path&&p.parent_evidence[name].git_blob_sha===blob(path),'original frozen parent '+name);
 const b=p.original_chiral_gauge_block;
 ck(b?.column_labels?.join('|')==='nu_eL|eL|nu_eR|eR'&&b.block_carrier?.includes('8 complex')&&b.original_total_H1==='H1=omega/2 + e phi/4 + w_ew','printed column chirality and full H1 role');
 ck(b.W_source_coefficients?.length===4&&b.B1_source_coefficients?.length===4,'all eight typed EW source terms');
 ck(JSON.stringify(b.W_source_coefficients.map(x=>[x.symbol,x.row,x.col,x.factor]))===JSON.stringify(EXPECT_W),'exact 4 source W coefficients');
 ck(JSON.stringify(b.B1_source_coefficients.map(x=>[x.symbol,x.row,x.col,x.factor]))===JSON.stringify(EXPECT_B),'exact 4 source B1 coefficients');
 ck(b.H1_mixed_ephi_role?.includes('off-diagonal')&&b.source_spin_2x2_caveat?.includes('I2'),'Higgs mixed/chiral source no overreach');
 ck(p.two_source_expression_layers?.curvature_page24==='W*Psi_L+B1*Psi_R-Psi*(w+B2+xPhi)-Psi_q*g'&&p.two_source_expression_layers.action_page27==='(W+B1)*Psi-Psi*(w+B2+xPhi+g)','two original source layers separate');
 ck(p.two_source_expression_layers?.component_page27?.startsWith('W_i*Psi+B1_i*Psi+Psi*w_i')&&p.two_source_expression_layers?.right_sign_unresolved===true&&p.two_source_expression_layers?.quark_projection_unresolved_original_E8===true,'right and quark sign remain independent');
 ck(p.mathematical_reconstruction?.iff_statement?.includes('iff W P_R=0 and B1 P_L=0')&&p.mathematical_reconstruction?.Higgs_negative_control?.includes('must not be extended to K or full H1.')&&p.mathematical_reconstruction?.source_application_status?.includes('Conditional'),'projection proof scoped');
 ck(p.verification_contract?.seeds===4&&p.verification_contract?.source_field_basis_tests===16&&p.verification_contract?.source_spin_basis_tests===64,'finite baseline counts');
 ck(p.source_census_delta?.changed_only?.join('|')==='L-SSC-032|L-SSC-041|L-SSC-046'&&p.source_census_delta.unchanged_full_records===188&&p.source_census_delta.identity_count===191,'three exact changed source records');
 for(const id of ['G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_authority','source_equivalent_fully_qualified','original_E8_full_right_sign_map_qualified','author_typo_proved','second_third_generation_actions_proved','outreach_authorized','PR70_merge_authorized'])ck(p.stage?.[id]===false,'stage/source not overpromoted '+id);
 ck(p.stage?.G0_open===true,'G0 still open');
 const a=new Map(old.items.map(x=>[x.id,x])),bmap=new Map(newC.items.map(x=>[x.id,x])),changes=[];
 ck(a.size===191&&bmap.size===191&&old.items.length===191&&newC.items.length===191,'191 unique full record identities');
 for(const [id,x]of a){if(!bmap.has(id))errors.push('missing old record '+id);else if(JSON.stringify(x)!==JSON.stringify(bmap.get(id)))changes.push(id)}
 for(const id of bmap.keys())if(!a.has(id))errors.push('new ID '+id);
 ck(changes.join('|')==='L-SSC-032|L-SSC-041|L-SSC-046','only 032/041/046 changed; 188 whole records conserved '+changes);
 for(const id of changes){
  const before=a.get(id),after=bmap.get(id),link=after?.source_expression_census?.L01_CHIRAL_GAUGE_PROJECTOR_G0;
  ck(after?.body?.startsWith(before?.body||'ERROR'),'original body preserved '+id);
  ck(link?.packet?.path===P&&link.packet.git_blob_sha===blob(P),'packet binding '+id);
  ck(link?.full_E8_projection_qualified===false&&link?.source_right_sign_map_qualified===false&&link?.G1_authorized===false,'no illicit source authority '+id);
 }
 ck(newC.revision?.predecessor_git_blob_sha===blob(O)&&newC.revision.source_packet?.git_blob_sha===blob(P)&&newC.revision.changed_source_items?.join('|')==='L-SSC-032|L-SSC-041|L-SSC-046','current SSC lineage');
 ck(newC.guards?.source_census_freeze_complete===false&&newC.guards?.dp_allowed===false&&newC.guards.L01_FERMION_CHIRAL_FULL_E8_MAP_QUALIFIED===false,'current open SSC');
 ck(gate?.stage==='G0'&&gate.track==='L'&&gate.semantic_authority===false&&gate.predecessor_gate.git_blob_sha===blob(G0),'G0 gate parent exact');
 ck(gate.current_source_census?.git_blob_sha===blob(N)&&gate.current_source_census.source_identities===191&&gate.current_source_packet?.git_blob_sha===blob(P)&&gate.source_verifier?.git_blob_sha===blob(SELF),'G0 gate complete exact frozen data');
 ck(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false&&gate.current_lawful_state?.full_E8_fermionic_source_reconstruction_qualified===false,'gate source not closed');
 ck(!JSON.stringify(p).includes('W-SSC-'),'no W semantic inputs');
 return errors;
}
const issues=[],packet=load(P),math=mathAudit(packet.original_chiral_gauge_block);
issues.push(...math.failures.map(x=>'MATH '+x));
let mathMutRejected=0,sourceMutRejected=0;
const mathMutants=[
 ['Wplus moved to right',x=>{x.W_source_coefficients.find(t=>t.symbol==='Wplus').row=2;x.W_source_coefficients.find(t=>t.symbol==='Wplus').col=3}],
 ['B1plus moved to left',x=>{x.B1_source_coefficients.find(t=>t.symbol==='B1plus').row=0;x.B1_source_coefficients.find(t=>t.symbol==='B1plus').col=1}],
 ['Wminus shifted right',x=>{x.W_source_coefficients.find(t=>t.symbol==='Wminus').row=3}],
 ['B1minus shifted left',x=>{x.B1_source_coefficients.find(t=>t.symbol==='B1minus').row=1}],
 ['W3 diagonal flipped',x=>{x.W_source_coefficients.find(t=>t.symbol==='W3'&&t.row===1).factor='i/2'}],
 ['B13 diagonal flipped',x=>{x.B1_source_coefficients.find(t=>t.symbol==='B13'&&t.row===3).factor='i/2'}],
 ['erase Wplus',x=>{x.W_source_coefficients=x.W_source_coefficients.filter(t=>t.symbol!=='Wplus')}],
 ['erase B1minus',x=>{x.B1_source_coefficients=x.B1_source_coefficients.filter(t=>t.symbol!=='B1minus')}]
];
for(const [name,mut]of mathMutants){
 const b=structuredClone(packet.original_chiral_gauge_block);mut(b);
 try{if(!mathAudit(b).pass)mathMutRejected++;else issues.push('ESCAPED_MATH_MUTANT '+name)}
 catch(e){issues.push('CRASHED_MATH_MUTANT '+name+': '+e.message)}
}
for(const [name,opts]of [
 ['swap chirality',{swapProjectors:true}],
 ['misproject ephi as pure W/B',{includeMixed:true}],
 ['drop W sector',{omitW:true}],
 ['drop B1 sector',{omitB:true}]
]){if(!mathAudit(packet.original_chiral_gauge_block,opts).pass)mathMutRejected++;else issues.push('ESCAPED_MATH_MUTANT '+name)}
if(!process.argv.includes('--math-only')){
 const a=load(O),c=load(N),g=load(G1);
 issues.push(...sourceCheck(packet,a,c,g));
 const sourceMutants=[
 ['v2 source claimed',x=>{x.original_source.revision='arXiv:0711.0770v2'}],
 ['lost Wminus source factor',x=>{x.original_chiral_gauge_block.W_source_coefficients.find(y=>y.symbol==='Wminus').factor='i/2'}],
 ['B1 source to W block',x=>{x.original_chiral_gauge_block.B1_source_coefficients.find(y=>y.symbol==='B1plus').row=0}],
 ['swap chirality label',x=>{x.original_chiral_gauge_block.column_labels[0]='nu_eR'}],
 ['missing ephi',x=>{x.original_chiral_gauge_block.H1_mixed_ephi_role='no mixing'}],
 ['full H1 projected',x=>{x.mathematical_reconstruction.Higgs_negative_control='full H1 also preserves gauge block'}],
 ['p24 left chirality erased',x=>{x.two_source_expression_layers.curvature_page24=x.two_source_expression_layers.curvature_page24.replace('W*Psi_L','W*Psi')}],
 ['p27 negative right erased',x=>{x.two_source_expression_layers.action_page27=x.two_source_expression_layers.action_page27.replace('-Psi*','+Psi*')}],
 ['component right changed',x=>{x.two_source_expression_layers.component_page27='W_i*Psi+B1_i*Psi-Psi*w_i'}],
 ['claim right sign fixed',x=>{x.two_source_expression_layers.right_sign_unresolved=false}],
 ['G1 promotion',x=>{x.stage.G1_authorized=true}],
 ['author typo verdict',x=>{x.stage.author_typo_proved=true}],
 ['invent later generations',x=>{x.stage.second_third_generation_actions_proved=true}],
 ['false parent hash',x=>{x.parent_evidence.census041.git_blob_sha='STALE'}],
 ['source E8 qualified',x=>{x.stage.source_equivalent_fully_qualified=true}],
 ['source multi-ID dropped',x=>{x.source_census_delta.changed_only.pop()}]
 ];
 if(!issues.length)for(const [name,mut]of sourceMutants){
  const p=structuredClone(packet);mut(p);
  if(sourceCheck(p,a,c,g).length>0)sourceMutRejected++;else issues.push('ESCAPED_SOURCE_MUTANT '+name);
 }
}
const result={schema:'isograph.exp062-L01-chiral-gauge-support-G0.v0.1',pass:issues.length===0,issues,math,
 math_mutants_defined:12,math_mutants_rejected:mathMutRejected,
 source_mutants_defined:process.argv.includes('--math-only')?0:16,source_mutants_rejected:sourceMutRejected,
 changed_ids:['L-SSC-032','L-SSC-041','L-SSC-046'],entire_predecessor_records_unchanged:188,
 source_full_E8_qualified:false,right_sign_source_qualified:false,G1_authorized:false,cross_track_semantics_authorized:false};
console.log(JSON.stringify(result,null,2));if(issues.length)process.exitCode=1;
