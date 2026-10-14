#!/usr/bin/env node
// Lisi L01 Eq1.1, Eq1.2, Eq2.3: exact Z2 Grassmann coefficient / matrix-generator layer test.
// Original source: arXiv:0711.0770v1, PDF page indexes 3 and 6.
// Input source Eq2.3 7x7 matrix is assisted and NOT independently cold qualified.
// This test DOES NOT assert which graded tensor product conventions Lisi intended.
import {readFileSync} from 'node:fs';
const F=JSON.parse(readFileSync(new URL('./l01_eq23_original_7x7_assisted_cells_0_1.json',import.meta.url),'utf8'));
const labels=['g3','g8','g_rg','g_gr','g_rb','g_br','g_gb','g_bg','q_r','q_g','q_b','qbar_r','qbar_g','qbar_b'];
function demand(v,why){if(!v)throw Error(why);}
function ints(input=F){
 demand(input.track==='L'&&input.stage==='G0'&&input.semantic_authority===false,'BAD_TRACK_AUTHORITY');
 demand(input.source.revision==='arXiv:0711.0770v1'&&input.source.PDF_page_zero_based===6,'SOURCE_REV_CHANGED');
 for(const k of ['full_49_cells_source_cold_qualified','independent_external_semantic_review','ordinary_matrix_commutator_necessarily_author_physics_rule','source_author_error_proven','G0_frozen','G1_authorized','W_semantics_imported','PR70_merge_authorized'])
  demand(input.qualification_locks[k]===false,'FALSE_QUALIFICATION_'+k);
 demand(Array.isArray(input.matrix)&&input.matrix.length===7&&input.matrix.every(r=>r.length===7),'SOURCE_7x7_REQUIRED');
 demand(labels.every(k=>Object.hasOwn(input.source_symbols,k))&&Object.keys(input.source_symbols).length===14,'SOURCE_GENERATOR_SET');
 const out=Object.fromEntries(labels.map(k=>[k,Array(49).fill(0n)]));
 let filled=0;
 for(let i=0;i<7;i++)for(let j=0;j<7;j++){
  const cell=input.matrix[i][j];demand(typeof cell==='string','BAD_CELL_'+i+'_'+j);
  if(cell==='0')continue;filled++;
  for(const piece of cell.split(';')){
   const z=piece.split(':');demand(z.length===2&&Object.hasOwn(out,z[0]),'BAD_SOURCE_ENTRY_'+piece);
   const [name,lexeme]=z;
   let coefficient;
   if(name==='g3')coefficient={'+i/2':1n,'-i/2':-1n}[lexeme];
   else if(name==='g8')coefficient={'+i/sqrt3':2n,'-i/sqrt3':-2n,'+i/(2sqrt3)':1n,'-i/(2sqrt3)':-1n}[lexeme];
   else if(name.startsWith('q'))coefficient={'+t':1n,'-t':-1n}[lexeme];
   else coefficient={'+1':1n,'-1':-1n}[lexeme];
   demand(typeof coefficient==='bigint','INVALID_ORIGINAL_COEFFICIENT_'+name+':'+lexeme);
   out[name][7*i+j]+=coefficient;
  }
 }
 demand(filled===42,'SOURCE_42_NONZERO_POSITIONS_CHANGED');
 return out;
}
function multiply(A,B){
 const out=Array(49).fill(0n);
 for(let i=0;i<7;i++)for(let k=0;k<7;k++)if(A[7*i+k]!==0n)
  for(let j=0;j<7;j++)out[7*i+j]+=A[7*i+k]*B[7*k+j];
 return out;
}
function combine(A,B,sign=1n){return A.map((v,i)=>v+sign*B[i]);}
function grassmannMultiply(maskA,maskB){
 demand(maskA>=0&&maskA<4&&maskB>=0&&maskB<4,'EXTERIOR_2_GENERATORS');
 if(maskA&maskB)return {mask:0,sign:0n};
 let parity=0;
 for(let a=0;a<2;a++)if(maskA&(1<<a))for(let b=0;b<2;b++)if(maskB&(1<<b))if(a>b)parity++;
 return{mask:maskA|maskB,sign:parity%2?-1n:1n};
}
function lift(mask,mat){return new Map([[mask,mat]])}
function multiplyLifted(A,B){
 const out=new Map();
 for(const [a,Am] of A)for(const [b,Bm] of B){
  const {mask,sign}=grassmannMultiply(a,b);
  if(sign===0n)continue;
  const m=multiply(Am,Bm).map(x=>x*sign);
  out.set(mask,out.has(mask)?combine(out.get(mask),m):m);
 }
 return out;
}
function bracketLifted(A,B,parityA,parityB){
 const p=multiplyLifted(A,B),q=multiplyLifted(B,A);
 const backSign=parityA*parityB%2===0?-1n:1n;
 const keys=new Set([...p.keys(),...q.keys()]),out=new Map();
 for(const k of keys)out.set(k,combine(p.get(k)||Array(49).fill(0n),q.get(k)||Array(49).fill(0n),backSign));
 return out;
}
function check(input=F,flipReverseSign=false){
 const S=ints(input),one=lift(0,S.g_rg),theta=lift(1,S.q_r),eta=lift(2,S.q_g);
 demand(grassmannMultiply(1,2).sign===1n,'THETA_ETA_PRODUCT');
 const etaTheta=grassmannMultiply(2,1);
 demand((flipReverseSign?-etaTheta.sign:etaTheta.sign)===-1n,'ETA_THETA_SIGN');
 demand(grassmannMultiply(1,1).sign===0n&&grassmannMultiply(2,2).sign===0n,'NILPOTENCY');
 const oddOdd=bracketLifted(theta,eta,1,1);
 const ordinary=bracketLifted(theta,eta,0,0);
 demand(oddOdd.size===1&&oddOdd.has(3)&&ordinary.size===1&&ordinary.has(3),'ODD_ODD_MUST_HAVE_THETA_ETA');
 const expectedComm=combine(multiply(S.q_r,S.q_g),multiply(S.q_g,S.q_r),-1n);
 const expectedAnti=combine(multiply(S.q_r,S.q_g),multiply(S.q_g,S.q_r),1n);
 demand(oddOdd.get(3).every((x,i)=>x===expectedComm[i]),'ODD_SUPER_BRACKET_IS_MATRIX_LIE_COMMUTATOR');
 demand(ordinary.get(3).every((x,i)=>x===expectedAnti[i]),'ORDINARY_BRACKET_IS_MATRIX_ANTICOMMUTATOR');
 const bosonFermion=bracketLifted(one,theta,0,1);
 const expectedBoson=combine(multiply(S.g_rg,S.q_r),multiply(S.q_r,S.g_rg),-1n);
 demand(bosonFermion.has(1)&&bosonFermion.get(1).every((x,i)=>x===expectedBoson[i]),'EVEN_ODD_ACTION');
 const c=oddOdd.get(3),a=ordinary.get(3),q=S.qbar_b;
 const at=(m,i,j)=>m[7*(i-1)+(j-1)];
 const cells={
  superbracket_generated_from_two_independent_odd_coefficients:{
   grassmann_component:'theta_eta, even degree 2',row1_col2:at(c,1,2).toString(),row5_col6:at(c,5,6).toString()},
  ordinary_commutator_of_the_odd_Grassmann_matrices:{
   grassmann_component:'theta_eta, even degree 2',row1_col2:at(a,1,2).toString(),row5_col6:at(a,5,6).toString()},
  source_anti_b_coefficient_matrix:{row1_col2:at(q,1,2).toString(),row5_col6:at(q,5,6).toString()},
  ordinary_generator_commutator_mismatch_crossproduct:(at(c,1,2)*at(q,5,6)-at(c,5,6)*at(q,1,2)).toString(),
  alternative_matrix_anticommutator_mismatch_crossproduct:(at(a,1,2)*at(q,5,6)-at(a,5,6)*at(q,1,2)).toString()
 };
 demand(cells.superbracket_generated_from_two_independent_odd_coefficients.row1_col2==='2'&&cells.superbracket_generated_from_two_independent_odd_coefficients.row5_col6==='-1','PRIOR_LIE_WITNESS_MISMATCH');
 demand(cells.ordinary_commutator_of_the_odd_Grassmann_matrices.row1_col2==='0'&&cells.ordinary_commutator_of_the_odd_Grassmann_matrices.row5_col6==='-1','PRIOR_ANTICOMMUTATOR_WITNESS_MISMATCH');
 demand(cells.ordinary_generator_commutator_mismatch_crossproduct==='1'&&cells.alternative_matrix_anticommutator_mismatch_crossproduct==='-1','MISCLASSIFIED_SPAN_WITNESS');
 return{
  source_fidelity:'ASSISTED_ORIGINAL_ARXIV_0711_0770v1_NOT_INDEPENDENT_COLD',
  formal_assumption:'theta,eta are independent odd Grassmann generators and coefficient matrices represent even Lie generators in a graded associative tensor algebra',
  exterior_algebra:{theta_eta:'+',eta_theta:'-',theta_squared:'0',eta_squared:'0',theta_eta_is_nonzero:true},
  superbracket_even_odd:'[G,theta Q]_s = theta [G,Q] (matrices even)',
  superbracket_odd_odd:'[theta Qr,eta Qg]_s = theta eta (QrQg-QgQr) for even Q matrices',
  ordinary_commutator_odd_odd:'[theta Qr,eta Qg]_ordinary = theta eta (QrQg+QgQr)',
  generated_coefficient_parity:'even degree2',
  mismatch:cells,
  source_g2_generator_closure_repaired_by_plain_Grassmann_coefficients:false,
  naive_matrix_anticommutator_repairs_source_closure:false,
  original_source_operator_unique_qualified:false,
  original_source_49cells_cold_qualified:false,original_Eq1_1_AST_complete:false,
  no_inference_of_a_specific_Lie_superalgebra:true,
  source_original_and_b2_project_comparison_untouched:true,G0_frozen:false
 };
}
const baseline=check(F);
const mutations=[
 ['flip_source_qr',d=>d.matrix[0][3]='q_r:+t'],
 ['flip_source_qg',d=>d.matrix[3][1]='q_g:+t'],
 ['flip_source_qbarb',d=>d.matrix[0][1]='qbar_b:+t'],
 ['delete_source_matrix_cell',d=>d.matrix[2].pop()],
 ['forge_source_cold',d=>d.qualification_locks.full_49_cells_source_cold_qualified=true],
 ['forge_source_author_error',d=>d.qualification_locks.source_author_error_proven=true],
 ['forge_G1',d=>d.qualification_locks.G1_authorized=true],
 ['allow_cross_track',d=>d.qualification_locks.W_semantics_imported=true],
 ['alter_revision',d=>d.source.revision='arXiv:0711.0770v2']
];
const hostiles=mutations.map(([name,change])=>{
 const copy=JSON.parse(JSON.stringify(F));change(copy);
 try{check(copy);return{name,rejected:false,reason:'ESCAPED'}}catch(e){return{name,rejected:true,reason:String(e.message).slice(0,150)};}
});
try{check(F,true);hostiles.push({name:'reverse_grassmann_eta_theta_sign',rejected:false,reason:'ESCAPED'});}
catch(e){hostiles.push({name:'reverse_grassmann_eta_theta_sign',rejected:true,reason:String(e.message).slice(0,150)})}
demand(hostiles.every(x=>x.rejected),'UNREJECTED_HOSTILE_MUTATION');
console.log(JSON.stringify({
 schema:'isograph.exp062.L.G0.L01.grassmann-even-generator-layer-firewall.v0.1',
 stage:'G0',track:'L',source_semantic_authority:false,source_cold_review_complete:false,
 claim_scope:'Conditional algebra for source-assisted Eq2.3 coefficient matrices and standard Grassmann parity; not a source-certified physical graded operator',
 ...baseline,controls_defined:hostiles.length,controls_rejected:hostiles.length,negative_controls:hostiles
},null,2));
