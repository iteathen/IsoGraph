#!/usr/bin/env node
// Lisi L01 G0 — auxiliary real-form firewall for Eq2.3 normalization comparison.
// Original arXiv 0711.0770v1 source matrix is immutable and assisted/non-cold.
// The b=2 relative coefficient model is PROJECT-GENERATED and not attributed to Lisi.
// No original-source real form, external equivalence, G0 promotion or merger is claimed.
import {readFileSync} from 'node:fs';
const fixture=JSON.parse(readFileSync(new URL('./l01_eq23_original_7x7_assisted_cells_0_1.json',import.meta.url),'utf8'));
const names=['g3','g8','g_rg','g_gr','g_rb','g_br','g_gb','g_bg','q_r','q_g','q_b','qbar_r','qbar_g','qbar_b'];
function need(b,msg){if(!b)throw Error(msg);}
function mats(b,f=fixture){
 need(b===1||b===2,'NOT_A_TESTED_SOURCE_FAMILY_MEMBER');
 need(f.track==='L'&&f.stage==='G0'&&f.semantic_authority===false,'WRONG_OR_PROMOTED_TRACK');
 need(f.source.revision==='arXiv:0711.0770v1'&&f.source.PDF_page_zero_based===6,'ORIGINAL_SOURCE_MOVED');
 for(const k of ['full_49_cells_source_cold_qualified','independent_external_semantic_review','source_author_error_proven','G0_frozen','G1_authorized','W_semantics_imported','PR70_merge_authorized'])
  need(f.qualification_locks[k]===false,'AUTHORITY_VIOLATION_'+k);
 need(f.matrix.length===7&&f.matrix.every(r=>r.length===7),'SOURCE_MATRIX_7x7');
 need(names.length===Object.keys(f.source_symbols).length&&names.every(n=>Object.hasOwn(f.source_symbols,n)),'SOURCE_LABEL_SET');
 const out=Object.fromEntries(names.map(n=>[n,Array(49).fill(0n)]));
 let occupied=0;
 for(let i=0;i<7;i++)for(let j=0;j<7;j++){
  const cell=f.matrix[i][j];need(typeof cell==='string','NONSTRING_SOURCE_CELL');
  if(cell==='0')continue;
  occupied++;
  for(const term of cell.split(';')){
   const t=term.split(':');need(t.length===2&&Object.hasOwn(out,t[0]),'BAD_GENERATOR_CELL');
   const [sym,lexeme]=t;let c;
   if(sym==='g3')c={'+i/2':1n,'-i/2':-1n}[lexeme];
   else if(sym==='g8')c={'+i/sqrt3':2n,'-i/sqrt3':-2n,'+i/(2sqrt3)':1n,'-i/(2sqrt3)':-1n}[lexeme];
   else if(sym.startsWith('q'))c={'+t':1n,'-t':-1n}[lexeme];
   else c={'+1':1n,'-1':-1n}[lexeme];
   need(typeof c==='bigint','BAD_SOURCE_COEFFICIENT_'+sym+':'+lexeme);
   if(i===0&&sym.startsWith('q'))c*=BigInt(b);
   out[sym][7*i+j]+=c;
  }
 }
 need(occupied===42,'ORIGINAL_SOURCE_NONZERO_POSITION_COUNT');
 return out;
}
function metric(b){
 const H=Array(49).fill(0n);H[0]=1n;
 for(const [i,j] of [[1,2],[3,4],[5,6]])H[7*i+j]=H[7*j+i]=BigInt(b);
 return H;
}
function bilinear(A,H){
 let out=Array(49).fill(0n);
 for(let i=0;i<7;i++)for(let j=0;j<7;j++)for(let k=0;k<7;k++)
  out[7*i+j]+=A[7*k+i]*H[7*k+j]+H[7*i+k]*A[7*k+j];
 return out;
}
function symBasis(){
 const B=[];
 for(let i=0;i<7;i++)for(let j=i;j<7;j++){
  const E=Array(49).fill(0n);E[7*i+j]=E[7*j+i]=1n;B.push(E);
 }
 need(B.length===28,'SYMMETRIC_FORM_VARIABLE_COUNT');
 return B;
}
function constraint(M){
 const bas=symBasis(),rows=[];
 for(const key of names){
  const A=M[key];
  for(let k=0;k<49;k++){
   let row=[];
   for(const E of bas)row.push(bilinear(A,E)[k]);
   rows.push(row);
  }
 }
 need(rows.length===686&&rows.every(r=>r.length===28),'CONSTRAINT_MATRIX_SIZE');
 return rows;
}
function determinant(a){
 a=a.map(r=>r.slice());const n=a.length;
 need(a.every(r=>r.length===n),'NON_SQUARE_DETERMINANT');
 let prev=1n,sgn=1n;
 for(let k=0;k<n-1;k++){
  if(a[k][k]===0n){
   const x=a.findIndex((r,i)=>i>k&&r[k]!==0n);
   if(x<0)return 0n;
   [a[k],a[x]]=[a[x],a[k]];sgn=-sgn;
  }
  const p=a[k][k];
  for(let i=k+1;i<n;i++)for(let j=k+1;j<n;j++){
   const t=a[i][j]*p-a[i][k]*a[k][j];
   need(t%prev===0n,'BAREISS_DIVISION_NOT_EXACT');
   a[i][j]=t/prev;
  }
  for(let i=k+1;i<n;i++)a[i][k]=0n;
  prev=p;
 }
 return sgn*a[n-1][n-1];
}
const proofRows=[3,4,5,6,10,11,12,13,17,18,19,20,24,27,32,33,40,48,50,51,57,65,75,83,125,206,395];
const proofCols=[...Array(26).keys(),27];
function trial(b,f=fixture,rankRowMutant=false,metricMutant=false){
 const M=mats(b,f),H=metric(b);
 if(metricMutant)H[0]=-H[0];
 let failed=[];
 for(const name of names){
  if(bilinear(M[name],H).some(x=>x!==0n))failed.push(name);
 }
 need(failed.length===0,'SOURCE_COMPARISON_FORM_INVARIANCE_LOST_'+failed.join('_'));
 need(determinant(Array.from({length:7},(_,i)=>H.slice(7*i,7*i+7)))===-(BigInt(b)**6n),'METRIC_DETERMINANT_CHANGED');
 const R=constraint(M);
 const rows=rankRowMutant?[...proofRows.slice(0,26),proofRows[0]]:proofRows;
 const d=determinant(rows.map(i=>proofCols.map(j=>R[i][j])));
 need(d===(b===1?-16384n:-32768n),'SYMMETRIC_FORM_RANK27_MINOR_FAILED');
 const g3=M.g3;
 let trace=0n;for(let i=0;i<7;i++)for(let k=0;k<7;k++)trace+=g3[7*i+k]*g3[7*k+i];
 need(trace===4n,'NONCOMPACT_TRACE_SQUARE_WITNESS_LOST');
 return{parameter:b,source_model:b===1?'ASSISTED_ORIGINAL':'HYPOTHETICAL_COMPARISON_NOT_SOURCE',
  source_generator_count:14,source_coefficient_matrix_entries:49,
  chosen_auxiliary_real_metric_H:{
   first_diagonal:'1',paired_offdiagonal:[[2,3,String(b)],[4,5,String(b)],[6,7,String(b)]],
   determinant:(-(BigInt(b)**6n)).toString(),real_signature:{positive:4,negative:3},
   all_fourteen_matrices_preserve_H:true},
  symmetric_invariant_form_space:{
   variables:28,constraint_rows:686,exact_independent_minor_size:27,
   selected_rows_zero_based:proofRows,selected_cols_zero_based:proofCols,
   exact_minor_determinant:d.toString(),
   nonzero_H_proves_rank_at_most:27,nonzero_minor_proves_rank_at_least:27,
   unique_invariant_symmetric_form_up_to_real_or_rational_scalar:true},
  one_auxiliary_real_Cartan_generator:{
   generator:'integer-rescaled g3',diagonal:'[0,0,0,1,-1,-1,1]',real_trace_of_square:trace.toString(),
   forbids_real_similarity_to_an_entire_algebra_of_real_skew_symmetric_matrices:true},
  boundary:'This tests integer-rescaled real spans, after multiplication of original Cartan by nonreal scalars. Source real-form claim is NOT derived.'
 };
}
function hostile(f,k){
 if(k==='change_g3_sign')f.matrix[3][3]=f.matrix[3][3].replace('g3:+i/2','g3:-i/2');
 if(k==='change_first_quark')f.matrix[0][3]='q_r:+t';
 if(k==='corrupt_g8')f.matrix[1][1]='g8:-i/sqrt3';
 if(k==='forge_cold')f.qualification_locks.full_49_cells_source_cold_qualified=true;
 if(k==='forge_error')f.qualification_locks.source_author_error_proven=true;
 if(k==='forge_G1')f.qualification_locks.G1_authorized=true;
 if(k==='forge_W')f.qualification_locks.W_semantics_imported=true;
 if(k==='wrong_revision')f.source.revision='arXiv:0711.0770v2';
}
const original=trial(1),hypothetical=trial(2);
const hostileNames=['change_g3_sign','change_first_quark','corrupt_g8','forge_cold','forge_error','forge_G1','forge_W','wrong_revision'];
const controls=hostileNames.map(name=>{
 let f=JSON.parse(JSON.stringify(fixture));hostile(f,name);
 try{trial(2,f);return{name,rejected:false,reason:'ESCAPED'}}catch(e){return{name,rejected:true,reason:String(e.message).slice(0,140)}}
});
for(const [name,args] of [
 ['corrupt_rank27_minor',[2,fixture,true,false]],
 ['corrupt_unique_metric',[2,fixture,false,true]]
]){
 try{trial(...args);controls.push({name,rejected:false,reason:'ESCAPED'});}
 catch(e){controls.push({name,rejected:true,reason:String(e.message).slice(0,140)});}
}
need(controls.every(c=>c.rejected),'HOSTILE_CONTROL_ESCAPE');
console.log(JSON.stringify({
 schema:'isograph.exp062.L.G0.L01.auxiliary-realform-comparison-vs-compact-G2.v0.1',
 source_exact_PDF_review_cold:false,source_physical_realform_identified:false,
 external_context:{
  reference:'Cacciatori et al., Euler angles for G2, hep-th/0503106v2, source PDF pp4-5',
  stated_matrix_normalization:'Tr(C_i C_j)=-4 delta_ij',
  basis_matrices:'real skew-symmetric, so real span preserves Euclidean I_7',
  mathematical_contrast:'Any real linear combination of real-skew matrices has trace(square)<=0, invariant under real similarity; the auxiliary integer-rescaled Cartan g3 has trace(square)=+4. No real GL7 change of basis can identify these real matrix sets.',
  complex_equivalence_not_ruled_out:true,
  source_G2_realform_identified:false},
 original,comparison:hypothetical,controls_defined:controls.length,controls_rejected:controls.length,negative_controls:controls
},null,2));
