import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={packet:L+'LISI_L01_SPIN_REAL_GROUP_ISOMORPHISM_SOURCE_DEFECT_G0_0_1.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_18.json',
audit:L+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json',
gate:E+'L_CURRENT_STAGE_GATE_0_18.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const S=get(P.packet),SSC=get(P.ssc),A=get(P.audit),G=get(P.gate);
// The algebra is derived independently from three exact sl(2,R) Chevalley brackets.
// First three basis elements are E,F,H, followed by iE,iF,iH in complex realification.
// The direct product instead has two commuting real copies E1,F1,H1 and E2,F2,H2.
const three={
 '0,1':[0,0,1],'1,0':[0,0,-1],
 '2,0':[2,0,0],'0,2':[-2,0,0],
 '2,1':[0,-2,0],'1,2':[0,2,0]
};
function adStructure(model){
 const c=Array.from({length:6},()=>Array.from({length:6},()=>Array(6).fill(0)));
 for(let i=0;i<6;i++)for(let z=0;z<6;z++){
  const first=Math.floor(i/3),second=Math.floor(z/3);
  if(model==='product'&&first!==second)continue;
  const rel=three[(i%3)+','+(z%3)]||[0,0,0];
  const iCount=first+second,base=model==='product'?first*3:(iCount===1?3:0),k=model==='complex'&&iCount===2?-1:1;
  for(let r=0;r<3;r++)c[i][z][base+r]=k*rel[r];
 }
 return c;
}
function Killing(model){
 const sc=adStructure(model);
 const adj=Array.from({length:6},(_,i)=>Array.from({length:6},(_,r)=>Array.from({length:6},(_,col)=>sc[i][col][r])));
 return adj.map(A=>adj.map(B=>A.reduce((total,row,k)=>total+row.reduce((t,v,j)=>t+v*B[j][k],0),0)));
}
function inertiaFromExactBlock(K){
 // The explicit Chevalley Killing forms have only diagonal 1x1 and disjoint
 // zero-diagonal symmetric [0,a;a,0] blocks. Fail closed if another shape occurs.
 let plus=0,minus=0,zero=0;const seen=new Set();
 for(let i=0;i<K.length;i++){
  if(seen.has(i))continue;
  const neighbors=[];
  for(let j=0;j<K.length;j++)if(j!==i&&K[i][j]!==0)neighbors.push(j);
  if(neighbors.length===1&&K[i][i]===0){
   const z=neighbors[0];
   if(seen.has(z)||K[z][z]!==0||K[z].filter((q,k)=>k!==i&&q!==0).length!==0)throw Error('unexpected 2x2 Killing block');
   plus++;minus++;seen.add(i);seen.add(z);
  }else if(neighbors.length===0){
   if(K[i][i]>0)plus++;else if(K[i][i]<0)minus++;else zero++;
   seen.add(i);
  }else throw Error('unexpected noncanonical Killing matrix block');
 }
 return{positive:plus,negative:minus,zero};
}
function sourceMath(d=S){
 const e=[],ck=(q,n)=>{if(!q)e.push(n)};
 const source=d.frozen_source||{},m=d.mathematical_scope||{},basis=d.independent_real_Lie_algebra_certificate||{},center=d.independent_group_center_certificate||{},route=d.qualification_boundary||{};
 ck(d.schema==='isograph.lisi-l01-real-spin-group-isomorphism-negative-source-evidence.g0.v0.1'&&d.track==='L'&&d.stage==='G0'&&d.authority===false,'source-local G0 evidence, no theology');
 ck(source.id==='L01'&&source.arxiv_version==='0711.0770v1, 2007-11-06'&&source.url==='https://arxiv.org/pdf/0711.0770v1'&&source.pdf_zero_based_page===10&&source.section.includes('§2.2.1'),'exact original 2007 page and revision');
 ck(source.verbatim_source_statement==='The Spin^+(3,1) Lie group of gravity, with Lie algebra so(3,1), is neither simple nor compact — it is isomorphic to SL(2,C) = SL(2,R) × SL(2,R).','verbatim published group equality, not corrected wording');
 for(const [key,path]of[['current_L_SSC',P.ssc],['full_L01_visual_review',P.audit],['current_procedural_gate',P.gate]])
  ck(d.predecessors?.[key]?.path===path&&d.predecessors?.[key]?.git_blob_sha===gitSha(path),'source predecessor SHA '+key);
 ck(SSC.items?.length===191&&SSC.guards?.source_census_freeze_complete===false&&G.current_lawful_state?.G1_authorized===false,'full source G0 still open');
 ck(A.page_ledger?.length===31&&A.L01_related_source_items?.length===30&&A.coverage_count?.complete_source_item_cold_reconstructions===0,'L01 original page context not source/theorem closure');
 ck(m.real_forms_not_identical===true&&m.left?.includes('SL(2,C)')&&m.right?.includes('SL(2,R) × SL(2,R)'), 'real group categories NOT complexified source identity');
 ck(m.conditional_noncounterexample?.includes('COMPLEXIFIED')&&m.do_not_conflate?.includes('Spin(2,2)'),'preserve possible shared complexification, not real sameness');
 ck(center.Z_SL2C==='{+I2,-I2}'&&center.center_order_left===2&&center.center_order_right===4&&center.group_isomorphism_possible===false,'group center counterexample exact');
 ck(center.Z_SL2R_product?.includes('(+I2,-I2)')&&center.Z_SL2R_product?.includes('(-I2,+I2)'),'product has two independent sign centers');
 // Elementary commutant argument for field R or C:
 // X=[[a,b],[c,d]] must commute with diag(2,1/2): b=c=0.
 // X must then commute with [[1,1],[0,1]]: a=d.
 // det(X)=1 yields a=±1, so Z(SL2(F))={±I}.
 const detDiagonalDiff=2-1/2,unipotent=1;
 ck(detDiagonalDiff!==0&&unipotent===1&&center.center_order_left===2&&center.center_order_right===2*2,'exact elementary center-size basis');
 const Kleft=Killing('complex'),Kright=Killing('product');
 const lsign=inertiaFromExactBlock(Kleft),rsign=inertiaFromExactBlock(Kright);
 ck(j(basis.Killing_SL2C_as_real)===j(Kleft)&&j(basis.Killing_SL2R_product)===j(Kright),'independently compute all 36 exact integer K entries for each real form');
 ck(j(lsign)===j({positive:3,negative:3,zero:0})&&j(rsign)===j({positive:4,negative:2,zero:0}),'real Killing form inertia differs 3/3 vs4/2');
 ck(j(basis.signature_sl2C_R)===j(lsign)&&j(basis.signature_sl2R_plus_sl2R)===j(rsign)&&basis.real_Lie_algebra_isomorphism_possible===false,'semantic signature conclusion correct');
 ck(basis.Chevalley_relation==='[E,F]=H; [H,E]=2E; [H,F]=-2F; i²=-1 for realification; cross-factor brackets zero in direct product','exact source-independent 6D bracket law');
 ck(d.source_disposition?.source_group_equality_false_under_stated_real_category===true&&d.source_disposition?.source_external_math_disagrees===true&&d.source_disposition?.no_claim_full_2007_E8_model_invalid===true,'source correction scoped to one printed equality only');
 ck(route.L_G0_source_census_frozen===false&&route.L_G1_through_G7_authorized===false&&route.full_primitive_closure===false&&route.external_review_passed===false,'scope and third party review unqualified');
 ck(!j(d).includes('W-SSC-'),'independent L-only source');
 return e;
}
const baseline=sourceMath(),errors=[...baseline],mutants=[
 ['normalize original author quote',d=>{d.frozen_source.verbatim_source_statement='SL(2,C) is just an abstract complexification'}],
 ['change old printed page',d=>{d.frozen_source.pdf_zero_based_page=9}],
 ['promote later arxiv version',d=>{d.frozen_source.arxiv_version='0711.0770v2'}],
 ['change group center 2 to 4',d=>{d.independent_group_center_certificate.center_order_left=4}],
 ['change product center to 2',d=>{d.independent_group_center_certificate.center_order_right=2}],
 ['invent real group isomorphism',d=>{d.independent_group_center_certificate.group_isomorphism_possible=true}],
 ['mask real form distinction',d=>{d.mathematical_scope.real_forms_not_identical=false}],
 ['erase complexification distinction',d=>{d.mathematical_scope.conditional_noncounterexample='No possible common structure'}],
 ['wrong Killing block',d=>{d.independent_real_Lie_algebra_certificate.Killing_SL2C_as_real[0][1]=4}],
 ['wrong product Killing block',d=>{d.independent_real_Lie_algebra_certificate.Killing_SL2R_product[3][4]=-4}],
 ['swap Killing signatures',d=>{d.independent_real_Lie_algebra_certificate.signature_sl2C_R={positive:4,negative:2,zero:0}}],
 ['claim Lie algebra same',d=>{d.independent_real_Lie_algebra_certificate.real_Lie_algebra_isomorphism_possible=true}],
 ['change bracket coefficient',d=>{d.independent_real_Lie_algebra_certificate.Chevalley_relation='[H,E]=E'}],
 ['wrong frozen SSC SHA',d=>{d.predecessors.current_L_SSC.git_blob_sha='stale'}],
 ['wrong visual audit SHA',d=>{d.predecessors.full_L01_visual_review.git_blob_sha='stale'}],
 ['claim source full cold review',d=>{d.qualification_boundary.source_31_page_VISUAL_audit_full_formula_closure=true}],
 ['claim G1',d=>{d.qualification_boundary.L_G1_through_G7_authorized=true}],
 ['claim complete E8 program false',d=>{d.source_disposition.no_claim_full_2007_E8_model_invalid=false}],
 ['claim author corrected source',d=>{d.source_disposition.printed_author_claim_preserved_verbatim=false}],
 ['claim external verification',d=>{d.qualification_boundary.external_review_passed=true}],
 ['W source import',d=>{d.mathematical_scope.left+=' W-SSC-103'}]
];
let rejected=0;if(!baseline.length)for(const [name,fn]of mutants){
 const d=cp(S),before=j(d);fn(d);if(j(d)===before)errors.push('NOOP '+name);else if(sourceMath(d).length===0)errors.push('ESCAPED '+name);else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l01-real-Lie-group-inequality-hostile.v0.1',
 pass:errors.length===0,errors,exact_Killing_dimensions:[6,6],computed_signatures:{SL2C_real:[3,3],SL2R_direct_product:[4,2]},
 elementary_group_center_cardinalities:[2,4],real_group_equality:false,
 adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',
 source_corrected:false,entire_E8_program_invalidated:false,full_source_cold_audit:false,G1_authorized:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
