#!/usr/bin/env node
// Lisi L01 Eq2.3: conditional invariant alternating 3-form test over Q.
// Original PDF arXiv:0711.0770v1, p6; source input is assisted, NOT cold qualified.
// No claim about author error, Grassmann physics, real form, or G0 closure.
import {readFileSync} from 'node:fs';
const fixture=JSON.parse(readFileSync(new URL('./l01_eq23_original_7x7_assisted_cells_0_1.json',import.meta.url),'utf8'));
const names=['g3','g8','g_rg','g_gr','g_rb','g_br','g_gb','g_bg','q_r','q_g','q_b','qbar_r','qbar_g','qbar_b'];
function need(x,msg){if(!x)throw Error(msg)}
function coef(sym,v){
 const tab={'+t':1n,'-t':-1n,'+1':1n,'-1':-1n,'+i/2':1n,'-i/2':-1n,
 '+i/(2sqrt3)':1n,'-i/(2sqrt3)':-1n,'+i/sqrt3':2n,'-i/sqrt3':-2n};
 need(Object.hasOwn(tab,v),'UNRECOGNIZED_COEFF '+sym+':'+v);
 if(sym==='g3')need(v==='+i/2'||v==='-i/2','G3_BAD_SCALING');
 else if(sym==='g8')need(v.includes('sqrt3'),'G8_BAD_SCALING');
 else if(sym.startsWith('q'))need(v==='+t'||v==='-t','Q_BAD_SCALING');
 else need(v==='+1'||v==='-1','GLUON_BAD_SCALING');
 return tab[v];
}
function matrices(f){
 need(f.track==='L'&&f.stage==='G0'&&f.semantic_authority===false,'FALSE_TRACK_OR_AUTHORITY');
 for(const k of ['full_49_cells_source_cold_qualified','independent_external_semantic_review','source_author_error_proven',
 'ordinary_matrix_commutator_necessarily_author_physics_rule','G0_frozen','G1_authorized','W_semantics_imported','PR70_merge_authorized'])
 need(f.qualification_locks[k]===false,'FALSE_PROMOTION_'+k);
 need(f.source.revision==='arXiv:0711.0770v1'&&f.source.PDF_page_zero_based===6,'SOURCE_REVISION_CHANGED');
 need(Array.isArray(f.matrix)&&f.matrix.length===7&&f.matrix.every(r=>Array.isArray(r)&&r.length===7),'MATRIX_NOT_7_BY_7');
 need(Object.keys(f.source_symbols).length===14&&names.every(n=>Object.hasOwn(f.source_symbols,n)),'SYMBOL_SET_CHANGED');
 const M=Object.fromEntries(names.map(n=>[n,Array(49).fill(0n)]));let painted=0;
 for(let i=0;i<7;i++)for(let j=0;j<7;j++){
  const v=f.matrix[i][j];need(typeof v==='string','MATRIX_NONSTRING');
  if(v==='0')continue;painted++;
  for(const t of v.split(';')){const [name,c,...extra]=t.split(':');
   need(extra.length===0&&Object.hasOwn(M,name),'MATRIX_SYMBOL_'+t);
   M[name][7*i+j]+=coef(name,c);
  }
 }
 need(painted===42,'PRINTED_NONZERO_MATRIX_CELL_COUNT');
 need(f.matrix[0][3]==='q_r:-t'&&f.matrix[0][1]==='qbar_b:-t'&&f.matrix[4][5]==='qbar_b:+t',
 'SOURCE_PRIOR_WITNESS_CHANGED');
 return M;
}
const triples=[];for(let i=0;i<7;i++)for(let j=i+1;j<7;j++)for(let k=j+1;k<7;k++)triples.push([i,j,k]);
need(triples.length===35,'WEDGE_DIMENSION');
const triplesIndex=new Map(triples.map((t,i)=>[t.join(','),i]));
function wedgeIndex(t){if(new Set(t).size<3)return[-1,0n];
 let parity=0;for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)if(t[i]>t[j])parity++;
 return[triplesIndex.get([...t].sort((a,b)=>a-b).join(',')),parity%2?-1n:1n];
}
function action(A){
 const out=Array.from({length:35},()=>Array(35).fill(0n));
 for(let row=0;row<35;row++){
  const [i,j,k]=triples[row];
  for(let r=0;r<7;r++)for(const [t,a] of [
   [[r,j,k],A[7*r+i]],[[i,r,k],A[7*r+j]],[[i,j,r],A[7*r+k]]
  ]){
   if(a===0n)continue;const [col,sign]=wedgeIndex(t);
   if(col>=0)out[row][col]+=a*sign;
  }
 }
 return out;
}
function applyRows(B,v){return B.map(row=>row.reduce((a,x,i)=>a+x*v[i],0n));}
function rowStack(ms){return ms.flatMap(A=>action(A));}
function minor(rows,idx,columns){return idx.map(i=>columns.map(j=>rows[i][j]));}
function detBareiss(arr){
 let a=arr.map(r=>r.slice()),prev=1n,sgn=1n;const n=a.length;
 need(a.every(r=>r.length===n),'DET_SQUARE');
 for(let k=0;k<n-1;k++){
  if(a[k][k]===0n){let x=k+1;while(x<n&&a[x][k]===0n)x++;if(x===n)return 0n;
   [a[k],a[x]]=[a[x],a[k]];sgn=-sgn;
  }
  const p=a[k][k];
  for(let i=k+1;i<n;i++)for(let j=k+1;j<n;j++){
   const numerator=a[i][j]*p-a[i][k]*a[k][j];
   need(numerator%prev===0n,'NONEXACT_BAREISS');
   a[i][j]=numerator/prev;
  }
  for(let i=k+1;i<n;i++)a[i][k]=0n;
  prev=p;
 }
 return sgn*a[n-1][n-1];
}
function skew(i,j){const m=Array(49).fill(0n);m[7*i+j]=1n;m[7*j+i]=-1n;return m;}
function matmul(A,B){const C=Array(49).fill(0n);
 for(let i=0;i<7;i++)for(let k=0;k<7;k++)if(A[7*i+k])for(let j=0;j<7;j++)C[7*i+j]+=A[7*i+k]*B[7*k+j];
 return C;
}
function bracket(A,B){const P=matmul(A,B),Q=matmul(B,A);return P.map((x,i)=>x-Q[i]);}
const pivot32Rows=[1,2,3,4,5,6,7,8,11,12,15,16,17,18,21,22,27,28,31,32,33,34,45,48,54,55,59,60,64,65,81,141];
const pivot32Cols=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,17,18,19,20,21,22,24,25,27,28,29,30,31,32,33,34];
const pivot34Rows=[...pivot32Rows,284,295];
const pivot34Cols=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34];
const pivot35Rows=[...pivot34Rows,322];
const pivot35Cols=[...Array(35).keys()];
function stable(corrupt=false){
 const base=[
 [[5,1],[7,1]],[[4,1],[8,1]],[[3,-1],[9,1]],[[2,-1],[10,1]],
 [[4,1],[11,1]],[[5,-1],[12,1]],[[2,-1],[13,1]],[[3,1],[14,1]],
 [[6,-1],[15,1]],[[1,1],[16,1]],[[0,1],[17,1]],[[0,1],[18,1]],
 [[1,-1],[19,1]],[[6,-1],[20,1]]
 ];
 const wedgePairs=[];for(let i=0;i<7;i++)for(let j=i+1;j<7;j++)wedgePairs.push([i,j]);
 const B=base.map(combos=>{const m=Array(49).fill(0n);
  for(const [index,coeff]of combos){const[i,j]=wedgePairs[index],t=BigInt(coeff);m[7*i+j]+=t;m[7*j+i]-=t;}
  return m;
 });
 const phi=Array(35).fill(0n);
 for(const [t,v] of [
 [[0,1,2],1],[[0,3,4],1],[[0,5,6],1],[[1,3,5],1],
 [[1,4,6],-1],[[2,3,6],-1],[[2,4,5],-1]
 ])phi[triplesIndex.get(t.join(','))]=BigInt(v);
 if(corrupt)phi[0]+=1n;
 need(B.length===14&&base.every((c,i)=>c[1][0]===i+7),'CANONICAL_G2_INDEPENDENT_PIVOTS');
 for(const A of B)need(applyRows(action(A),phi).every(v=>v===0n),'CANONICAL_G2_FALSE_NEGATIVE');
 let brackets=0;for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){
  const C=bracket(B[i],B[j]);
  need(applyRows(action(C),phi).every(x=>x===0n),'CANONICAL_G2_BRACKET_CONTROL_FAILED');
  for(let r=0;r<7;r++)for(let c=0;c<7;c++)need(C[7*r+c]+C[7*c+r]===0n,'CANONICAL_G2_METRIC_CONTROL_FAILED');
  brackets++;
 }
 const skewResponses=Array.from({length:35},()=>Array(21).fill(0n));
 for(let col=0;col<wedgePairs.length;col++){
  const vector=applyRows(action(skew(...wedgePairs[col])),phi);
  for(let r=0;r<35;r++)skewResponses[r][col]=vector[r];
 }
 const canonicalMinor=detBareiss(minor(skewResponses,[1,2,3,4,10,11,21],[0,1,2,3,4,5,6]));
 need(canonicalMinor===-1n,'CANONICAL_G2_STABILIZER_RANK7_MINOR_FAIL');
 return{canonical_stabilizer_dimension:14,canonical_stabilizer_operator_rank:7,
 canonical_exact_7_by_7_minor:canonicalMinor.toString(),
 canonical_invariant_3form_nonzero_coefficients:7,canonical_brackets_preserve_form:brackets};
}
function test(f,proofRows=pivot35Rows,canonicalMutant=false){
 const M=matrices(f), g=rowStack(names.slice(0,8).map(n=>M[n])),
 gq=rowStack([...names.slice(0,8),'q_r'].map(n=>M[n])),
 gqr=rowStack([...names.slice(0,8),'q_r','qbar_r'].map(n=>M[n]));
 const d32=detBareiss(minor(g,pivot32Rows,pivot32Cols));
 const d34=detBareiss(minor(gq,pivot34Rows,pivot34Cols));
 const d35=detBareiss(minor(gqr,proofRows,pivot35Cols));
 need(d32===65536n&&d34===65536n&&d35===65536n,'EXACT_THREE_FORM_MINOR_FAILURE');
 const inv=[Array(35).fill(0n),Array(35).fill(0n),Array(35).fill(0n)];
 for(const [idx,value]of [[0,-1],[9,1],[14,1]])inv[0][idx]=BigInt(value);
 inv[1][23]=1n; inv[2][26]=1n;
 for(const phi of inv)need(applyRows(g,phi).every(x=>x===0n),'GLUON_THREE_FORM_WITNESS_FALSE');
 const one=Array(35).fill(0n);for(const [idx,value]of [[0,1],[9,-1],[14,-1],[23,-2],[26,1]])one[idx]=BigInt(value);
 need(applyRows(gq,one).every(x=>x===0n),'GLUON_PLUS_QR_ONE_FORM_FALSE');
 need(applyRows(gqr,one).some(x=>x!==0n),'QBAR_R_FALSE_POSITIVE');
 const positive=stable(canonicalMutant);
 return{original_source_matrix_count:14,positive_control:positive,
 gluon_source_3form_invariant_dimension:3, gluon_plus_q_r_source_invariant_dimension:1,
 gluon_plus_q_r_qbar_r_source_invariant_dimension:0,
 exact_32_by_32_gluon_minor:d32.toString(),exact_34_by_34_gluon_plus_qr_minor:d34.toString(),
 exact_35_by_35_gluon_qr_qbar_r_minor:d35.toString(),
 selected_35_source_equations_zero_based:proofRows,
 no_nonzero_common_three_form_for_all_fourteen:true,
 original_pdf_source_review_independent:false, G0_frozen:false};
}
function mutant(f,name){
 switch(name){
 case 'wrong_qbar_r_row4':f.matrix[3][0]='qbar_r:-t';break;
 case 'wrong_qr_row5':f.matrix[4][0]='q_r:-t';break;
 case 'wrong_gluon_g8':f.matrix[1][1]='g8:-i/sqrt3';break;
 case 'bad_original_shape':f.matrix[0].pop();break;
 case 'false_author_error':f.qualification_locks.source_author_error_proven=true;break;
 case 'false_cold':f.qualification_locks.full_49_cells_source_cold_qualified=true;break;
 case 'false_G1':f.qualification_locks.G1_authorized=true;break;
 case 'false_W_import':f.qualification_locks.W_semantics_imported=true;break;
 default:throw Error('UNKNOWN_MUTANT_'+name);
 }
}
const result=test(fixture);
const mutations=['wrong_qbar_r_row4','wrong_qr_row5','wrong_gluon_g8','bad_original_shape',
 'false_author_error','false_cold','false_G1','false_W_import'];
const controls=mutations.map(name=>{const v=JSON.parse(JSON.stringify(fixture));mutant(v,name);
 try{test(v);return{name,rejected:false,reason:'ESCAPED'}}catch(e){return{name,rejected:true,reason:String(e.message).slice(0,150)}}});
for(const [name,fn]of [
 ['duplicate_rank35_row',()=>test(fixture,[...pivot35Rows.slice(0,34),pivot35Rows[0]])],
 ['canonical_positive_corruption',()=>test(fixture,pivot35Rows,true)] ]){
 try{fn();controls.push({name,rejected:false,reason:'ESCAPED'});}
 catch(e){controls.push({name,rejected:true,reason:String(e.message).slice(0,150)});}
}
need(controls.every(t=>t.rejected),'INVALID_NEGATIVE_CONTROL_ESCAPE');
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L01.exact-threeform-nonexistence.v0.1',
 input_source:'ASSISTED_2007_ORIGINAL_L01_EQ2_3_MATRIX',independent_cold_source_review:false,
 claims_author_defect:false,math_scope:'7x7 complex Lie coefficient matrices under ordinary algebra',
 ...result,negative_controls:controls,controls_defined:controls.length,controls_rejected:controls.length},null,2));
