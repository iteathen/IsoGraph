#!/usr/bin/env node
// Lisi L01 G0 — ORIGINAL source remains immutable. Parametric b is a PROJECT COMPARISON only.
// b scales six first-row quark-generator cells after the source's individual nonzero
// complex generator rescaling. b=1 is printed Eq2.3; b=2 is NOT author source.
// Node command: node research/woit-lisi-isomorph/lisi/tools/check-l01-eq23-relative-normalization-0-1.mjs
import {readFileSync} from 'node:fs';
const frozen=JSON.parse(readFileSync(new URL('./l01_eq23_original_7x7_assisted_cells_0_1.json',import.meta.url),'utf8'));
const labels=['g3','g8','g_rg','g_gr','g_rb','g_br','g_gb','g_bg','q_r','q_g','q_b','qbar_r','qbar_g','qbar_b'];
function demand(p,s){if(!p)throw Error(s)}
function coefficient(label,v){
 if(label==='g3'){demand(v==='+i/2'||v==='-i/2','BAD_SOURCE_G3');return v[0]==='+'?1n:-1n;}
 if(label==='g8'){const x={'+i/sqrt3':2n,'-i/sqrt3':-2n,'+i/(2sqrt3)':1n,'-i/(2sqrt3)':-1n};demand(Object.hasOwn(x,v),'BAD_SOURCE_G8');return x[v];}
 if(label.startsWith('q')){demand(v==='+t'||v==='-t','BAD_SOURCE_QUARK');return v==='+t'?1n:-1n;}
 demand(v==='+1'||v==='-1','BAD_SOURCE_OFFDIAGONAL_GLUON');return v==='+1'?1n:-1n;
}
function source(b,data=frozen){
 demand(Number.isInteger(b)&&b>=0&&b<=3,'PARAMETER_DOMAIN');
 demand(data.track==='L'&&data.stage==='G0'&&data.semantic_authority===false,'SOURCE_SCOPE');
 demand(data.source.revision==='arXiv:0711.0770v1'&&data.source.PDF_page_zero_based===6,'SOURCE_REVISION');
 for(const k of ['full_49_cells_source_cold_qualified','independent_external_semantic_review','source_author_error_proven','G0_frozen','G1_authorized','W_semantics_imported','PR70_merge_authorized'])demand(data.qualification_locks[k]===false,'SOURCE_AUTHORITY_'+k);
 demand(data.matrix.length===7&&data.matrix.every(r=>r.length===7),'SOURCE_MATRIX_SIZE');
 demand(labels.every(n=>Object.hasOwn(data.source_symbols,n))&&Object.keys(data.source_symbols).length===14,'SOURCE_LABELS');
 const m=Object.fromEntries(labels.map(k=>[k,Array(49).fill(0n)]));let positions=0;
 for(let i=0;i<7;i++)for(let j=0;j<7;j++){
  const v=data.matrix[i][j];demand(typeof v==='string','BAD_SOURCE_CELL');
  if(v==='0')continue;positions++;
  for(const word of v.split(';')){
   const terms=word.split(':');demand(terms.length===2&&Object.hasOwn(m,terms[0]),'UNKNOWN_SOURCE_ENTRY');
   let val=coefficient(terms[0],terms[1]);
   if(i===0&&terms[0].startsWith('q'))val*=BigInt(b);
   m[terms[0]][7*i+j]+=val;
  }
 }
 demand(positions===42,'SOURCE_NONZERO_POSITIONS');
 return m;
}
function mul(A,B){
 const out=Array(49).fill(0n);
 for(let i=0;i<7;i++)for(let k=0;k<7;k++)if(A[7*i+k]!==0n)
  for(let j=0;j<7;j++)out[7*i+j]+=A[7*i+k]*B[7*k+j];
 return out;
}
function bracket(A,B){const X=mul(A,B),Y=mul(B,A);return X.map((x,i)=>x-Y[i]);}
function det(A){
 let m=A.map(r=>r.slice()),sgn=1n,prev=1n,n=m.length;
 demand(m.every(r=>r.length===n),'NOT_SQUARE');
 for(let k=0;k<n-1;k++){
  if(m[k][k]===0n){const pivot=m.findIndex((r,i)=>i>k&&r[k]!==0n);
   if(pivot<0)return 0n;[m[k],m[pivot]]=[m[pivot],m[k]];sgn=-sgn;}
  const pivot=m[k][k];
  for(let i=k+1;i<n;i++)for(let j=k+1;j<n;j++){
   const numer=m[i][j]*pivot-m[i][k]*m[k][j];
   demand(numer%prev===0n,'INEXACT_BAREISS');
   m[i][j]=numer/prev;
  }
  for(let i=k+1;i<n;i++)m[i][k]=0n;
  prev=pivot;
 }
 return sgn*m[n-1][n-1];
}
const wedge=[];for(let i=0;i<7;i++)for(let j=i+1;j<7;j++)for(let k=j+1;k<7;k++)wedge.push([i,j,k]);
const index=new Map(wedge.map((t,k)=>[t.join(','),k]));
function lookup(t){
 if(new Set(t).size!==3)return[-1,0n];
 let inversions=0;for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)if(t[i]>t[j])inversions++;
 return[index.get([...t].sort((a,b)=>a-b).join(',')),inversions%2?-1n:1n];
}
function action(A,phi){
 const out=Array(35).fill(0n);
 for(let row=0;row<35;row++){
  const [i,j,k]=wedge[row];
  for(let r=0;r<7;r++)for(const [t,c]of [
   [[r,j,k],A[7*r+i]],[[i,r,k],A[7*r+j]],[[i,j,r],A[7*r+k]]]){
   if(c===0n)continue;
   const[col,sgn]=lookup(t);
   if(col>=0)out[row]+=c*sgn*phi[col];
  }
 }
 return out;
}
function mod(x,p){const a=x%p;return a<0n?a+p:a;}
function powmod(x,n,p){let a=1n;while(n){if(n&1n)a=mod(a*x,p);x=mod(x*x,p);n>>=1n;}return a;}
function rankmod(rows,p){
 let a=rows.map(r=>r.map(x=>mod(x,p))),k=0;
 const m=a.length,n=a[0].length;
 for(let j=0;j<n&&k<m;j++){
  let row=k;while(row<m&&a[row][j]===0n)row++;
  if(row===m)continue;
  [a[k],a[row]]=[a[row],a[k]];
  const inv=powmod(a[k][j],p-2n,p);
  for(let z=j;z<n;z++)a[k][z]=mod(a[k][z]*inv,p);
  for(let r=k+1;r<m;r++)if(a[r][j]!==0n){
   const fac=a[r][j];
   for(let z=j;z<n;z++)a[r][z]=mod(a[r][z]-fac*a[k][z],p);
  }
  k++;
 }
 return k;
}
function gl7ActionRows(phi){
 const out=Array.from({length:35},()=>Array(49).fill(0n));
 for(let i=0;i<7;i++)for(let j=0;j<7;j++){
  const e=Array(49).fill(0n);e[7*i+j]=1n;
  const v=action(e,phi);
  for(let k=0;k<35;k++)out[k][7*i+j]=v[k];
 }
 return out;
}
const phi=Array(35).fill(0n);
for(const [triple,v]of [
 [[0,1,2],1],[[0,3,4],-1],[[0,5,6],-1],[[1,4,6],-2],[[2,3,5],2]
])phi[index.get(triple.join(','))]=BigInt(v);
const pivotRows=[1,2,3,4,5,6,8,11,13,17,19,24,26,34];
function analysis(b,data=frozen){
 const M=source(b,data);
 const originalCols=labels.map(n=>M[n]);
 const minor=det(pivotRows.map(r=>originalCols.map(c=>c[r])));
 const preserved=labels.filter(n=>action(M[n],phi).every(z=>z===0n));
 const qR=M.q_r,qG=M.q_g,qBB=M.qbar_b;
 const C=bracket(qR,qG);
 const witness={commutator_1_2:C[1].toString(),commutator_5_6:C[4*7+5].toString(),
  qbar_b_1_2:qBB[1].toString(),qbar_b_5_6:qBB[4*7+5].toString(),
  cross_product:(C[1]*qBB[4*7+5]-C[4*7+5]*qBB[1]).toString()};
 return{b,rank14_minor:minor.toString(),invariant_source_generators:preserved.length,
  non_invariant_generators:labels.filter(n=>!preserved.includes(n)),witness};
}
function run(){
 const orig=analysis(1),corrected=analysis(2),other=analysis(3),off=analysis(0);
 demand(orig.rank14_minor==='-2'&&orig.invariant_source_generators===8&&orig.witness.cross_product==='1','PRINTED_BASELINE');
 demand(corrected.rank14_minor==='-128'&&corrected.invariant_source_generators===14&&corrected.witness.cross_product==='0','COMPARISON_POSITIVE');
 demand(other.rank14_minor==='-1458'&&other.witness.cross_product==='-3','ALTERED_COMPARISON_NEGATIVE');
 demand(off.witness.cross_product==='0'&&off.invariant_source_generators<14,'ZERO_COUPLING_NOT_SUFFICIENT');
 // Stabilizer of explicit phi: 35x49 map surjective over Q if rank 35 modulo a prime.
 const op=gl7ActionRows(phi);
 const ranks=[1009n,1013n].map(p=>rankmod(op,p));
 demand(ranks[0]===35&&ranks[1]===35,'THREEFORM_NOT_STABLE');
 // Every original comparison generator preserves phi, so span is in stabilizer.
 // 14 independent by nonzero minor; stabilizer dimension=49-35=14. Equality follows.
 for(let i=0;i<14;i++)for(let j=i+1;j<14;j++){
  demand(action(bracket(source(2)[labels[i]],source(2)[labels[j]]),phi).every(z=>z===0n),'G2_COMPARISON_BRACKET');
 }
 return{source_original:orig,comparison_b2:corrected,comparison_b3:other,decoupled_b0:off,
  normalized_family:"Rescale only the six first-row quark/antiquark coefficients after a fixed invertible per-generator source-to-integer rescaling; b=1 frozen original; b=2 externally hypothesized, not a source correction.",
  exact_two_cell_polynomial:"b*(2-b)",
  inferred_conditions:"At nonzero coupling, necessary two-cell condition b=2; whole 14-generator comparison at b=2 spans the 14D stabilizer of the displayed phi.",
  comparison_threeform_nonzero_terms:[[0,1,2,1],[0,3,4,-1],[0,5,6,-1],[1,4,6,-2],[2,3,5,2]],
  comparison_gl7_stabilizer_rank_mod_p:ranks,comparison_gl7_stabilizer_dimension_exact:14,
  comparison_ordinary_commutator_pairs_preserving_phi:91,
  source_first_author_error_established:false,source_49cell_independent_cold:false,
  original_source_7x7_fixture_unchanged:true, G0_frozen:false};
}
const baseline=run();
const mutants=[
 {name:'mutate_printed_first_row',change:d=>d.matrix[0][3]='q_r:+t'},
 {name:'mutate_printed_internal_q',change:d=>d.matrix[3][1]='q_g:+t'},
 {name:'source_claims_cold',change:d=>d.qualification_locks.full_49_cells_source_cold_qualified=true},
 {name:'source_claims_error',change:d=>d.qualification_locks.source_author_error_proven=true},
 {name:'source_unlocks_G1',change:d=>d.qualification_locks.G1_authorized=true},
 {name:'source_W_import',change:d=>d.qualification_locks.W_semantics_imported=true},
 {name:'source_matrix_incomplete',change:d=>d.matrix[0].pop()},
 {name:'source_wrong_revision',change:d=>d.source.revision='arXiv:0711.0770v2'}
];
const checks=mutants.map(({name,change})=>{
 const d=JSON.parse(JSON.stringify(frozen));change(d);
 try{
  const altered=analysis(2,d); const isSame=altered.rank14_minor===baseline.comparison_b2.rank14_minor
   &&altered.invariant_source_generators===14&&altered.witness.cross_product==='0';
  return{name,rejected:!isSame,reason:isSame?'ESCAPED':'COMPARISON_INVARIANT_OR_SOURCE_PIN_CHANGE'};
 }catch(e){return{name,rejected:true,reason:String(e.message).slice(0,100)}}
});
demand(checks.every(t=>t.rejected),'NEGATIVE_CONTROL_ESCAPED');
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L01.relative-singlet-coupling-normalization-parameter.v0.1',
 scope:'PROJECT_COMPARISON_NOT_ORIGINAL_SOURCE_REPAIR',
 ...baseline,controls_defined:checks.length,controls_rejected:checks.length,negative_controls:checks},null,2));
