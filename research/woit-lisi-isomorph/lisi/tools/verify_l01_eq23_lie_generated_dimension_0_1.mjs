// Source-assisted L01 Eq2.3 original-v1 7x7 matrix. Exact BigInt/integers; qualified source semantics NOT claimed.
// node research/woit-lisi-isomorph/lisi/tools/verify_l01_eq23_lie_generated_dimension_0_1.mjs
import {readFileSync} from 'node:fs';
const fixture=JSON.parse(readFileSync(new URL('./l01_eq23_original_7x7_assisted_cells_0_1.json',import.meta.url),'utf8'));
function z(n){return BigInt(n)};
function add(A,B){return A.map((x,i)=>x+B[i])};
function matMul(A,B){
 let out=Array(49).fill(0n);
 for(let i=0;i<7;i++)for(let k=0;k<7;k++)if(A[7*i+k]!==0n)for(let j=0;j<7;j++)out[7*i+j]+=A[7*i+k]*B[7*k+j];
 return out;
};
function comm(A,B){const x=matMul(A,B),y=matMul(B,A);return x.map((v,i)=>v-y[i]);};
function anti(A,B){const x=matMul(A,B),y=matMul(B,A);return x.map((v,i)=>v+y[i]);};
function detBareiss(src){
 const n=src.length;const m=src.map(a=>a.slice());let sign=1n,prev=1n;
 for(let k=0;k<n-1;k++){
  if(m[k][k]===0n){
   const row=m.findIndex((r,i)=>i>k&&r[k]!==0n);if(row<0)return 0n;
   const tmp=m[k];m[k]=m[row];m[row]=tmp;sign=-sign;
  }
  const pivot=m[k][k];
  for(let i=k+1;i<n;i++)for(let j=k+1;j<n;j++){
   let n=m[i][j]*pivot-m[i][k]*m[k][j];
   if(n%prev!==0n)throw Error("NON_EXACT_BAREISS_DIVISION");
   m[i][j]=n/prev;
  }
  for(let i=k+1;i<n;i++)m[i][k]=0n;
  prev=pivot;
 }
 return sign*m[n-1][n-1];
};
function coeffToInt(sym,c){
 if(sym==="g3"){if(c==="+i/2")return 1n;if(c==="-i/2")return -1n;}
 else if(sym==="g8"){if(c==="+i/sqrt3")return 2n;if(c==="-i/sqrt3")return -2n;if(c==="+i/(2sqrt3)")return 1n;if(c==="-i/(2sqrt3)")return -1n;}
 else if(sym.startsWith("q")){if(c==="+t")return 1n;if(c==="-t")return -1n;}
 else{if(c==="+1")return 1n;if(c==="-1")return -1n;}
 throw Error("SOURCE_COEFFICIENT_DOMAIN_MISMATCH_"+sym+"_"+c);
};
function extract(f){
 const names=["g3","g8","g_rg","g_gr","g_rb","g_br","g_gb","g_bg","q_r","q_g","q_b","qbar_r","qbar_g","qbar_b"];
 const errors=[];
 const need=(v,x)=>{if(!v)errors.push(x)};
 need(f?.track==="L"&&f?.stage==="G0"&&f?.semantic_authority===false,"G0_SOURCE_AUTHORITY_FIREWALL");
 for(const s of ["full_49_cells_source_cold_qualified","independent_external_semantic_review","ordinary_matrix_commutator_necessarily_author_physics_rule","source_author_error_proven","physical_theory_qualified","G0_frozen","G1_authorized","W_semantics_imported","cross_track_synthesis_authorized","PR70_merge_authorized"])
  need(f?.qualification_locks?.[s]===false,"INVALID_AUTHORITY_"+s);
 need(f?.source?.revision==="arXiv:0711.0770v1"&&f?.source?.PDF_page_zero_based===6,"ORIGINAL_FROZEN_SOURCE_PIN");
 need(f?.source?.PDF_binary_rehashed_this_turn===false,"PDF_REHASH_FALSE_BOUNDARY");
 if(!Array.isArray(f.matrix)||f.matrix.length!==7||f.matrix.some(row=>!Array.isArray(row)||row.length!==7))return{errors:[...errors,"BAD_ORIGINAL_7X7_SHAPE"],matrices:null};
 if(names.some(n=>!Object.hasOwn(f.source_symbols,n))||Object.keys(f.source_symbols).length!==14)errors.push("BAD_GENERATOR_SET");
 const M=Object.fromEntries(names.map(n=>[n,Array(49).fill(0n)]));let occupied=0;
 for(let i=0;i<7;i++)for(let j=0;j<7;j++){
  const cell=f.matrix[i][j];if(typeof cell!=="string"){errors.push("NONSTRING_CELL_"+i+"_"+j);continue;}
  if(cell==="0")continue;occupied++;
  for(const entry of cell.split(";")){
   const t=entry.split(":");if(t.length!==2||!Object.hasOwn(M,t[0])){errors.push("UNKNOWN_SYMBOL_"+i+"_"+j);continue;}
   try{M[t[0]][7*i+j]+=coeffToInt(t[0],t[1]);}catch(e){errors.push(String(e.message))}
  }
 }
 need(occupied===42,"WRONG_NONZERO_POSITIONS");
 return{errors,matrices:M,names,occupied};
};
function trial(f){
 const {errors,matrices,names,occupied}=extract(f);
 if(errors.length||!matrices)return{errors,summary:null};
 const M=matrices;
 const H=Array(49).fill(0n);H[0]=1n;for(const [a,b]of [[1,2],[3,4],[5,6]]){H[a*7+b]=1n;H[b*7+a]=1n}
 for(const n of names){
  const A=M[n], AT=Array(49).fill(0n);for(let i=0;i<7;i++)for(let j=0;j<7;j++)AT[i*7+j]=A[j*7+i];
  const x=add(matMul(AT,H),matMul(H,A));
  if(x.some(y=>y!==0n))errors.push("DOES_NOT_PRESERVE_METRIC_"+n);
 }
 const pairs=[["q_r","q_g"],["q_r","q_b"],["q_r","qbar_r"],["q_g","q_b"],["qbar_r","qbar_g"],["qbar_r","qbar_b"],["qbar_g","qbar_b"]];
 const basis=[...names.map(n=>M[n]),...pairs.map(([a,b])=>comm(M[a],M[b]))];
 const rows=[1,2,3,4,5,6,8,10,11,12,13,17,18,19,20,24,26,27,33,34,40];
 const submatrix=rows.map(r=>basis.map(col=>col[r]));
 let determinant=null;try{determinant=detBareiss(submatrix);}catch(e){errors.push("BAREISS_FAILED_"+String(e))}
 if(determinant!==-2n)errors.push("ORIGINAL_21x21_NONZERO_MINOR_REPLAY_FAILED");
 if(detBareiss(Array.from({length:7},(_,i)=>H.slice(i*7,i*7+7)))!==-1n)errors.push("NONDEGENERATE_METRIC_FAIL");
 const cross=comm(M.q_r,M.q_g), plus=anti(M.q_r,M.q_g), q=M.qbar_b;
 const b1=cross[1],b2=cross[4*7+5], a1=plus[1],a2=plus[4*7+5];
 const norm=[q[1],q[4*7+5]];
 if(!(b1===2n&&b2===-1n&&a1===0n&&a2===-1n&&norm[0]===-1n&&norm[1]===1n))errors.push("KEY_TWO_CELL_SOURCE_CLOSURE_DIAGNOSTIC_CHANGED");
 if(b1*norm[1]===b2*norm[0]||a1*norm[1]===a2*norm[0])errors.push("TWO_CELL_OBSTRUCTION_ABSENT");
 return{errors,summary:{
  original_matrix_positions:49,original_generator_count:14,source_scaled_integral_generator_count:basis.length,
  generator_rescalings:{g3:"multiply original g3 matrix by -2i",g8:"multiply original g8 matrix by -2i*sqrt(3)",quark_and_antiquark:"multiply original q matrices by sqrt(2)",six_offdiagonal_gluons:"unchanged"},
  rescaling_semantics:"Nonzero complex rescalings preserve the generated complex Lie algebra, but not necessarily a specified source real form",
  chosen_seven_independent_commutator_pairs:pairs,
  independent_21_vector_rows_zero_based:rows,
  determinant_of_exact_21_by_21_minor:determinant.toString(),
  invariant_symmetric_H_entries_1_based:[[1,1],[2,3],[3,2],[4,5],[5,4],[6,7],[7,6]],
  det_H:"-1",auxiliary_real_signature:[4,3],symmetric_form_invariance_for_all_14:true,
  upper_bound_from_form:21,lower_bound_from_nonzero_minor:21,
  resulting_complex_Lie_generated_algebra:"so(7,C) given the source-assisted generators and ordinary matrix Lie commutator",
  printed_source_claim:"a chosen 7x7 matrix representation of g2, which is dimension 14",
  residual_added_commutator_directions:7,
  odd_odd_ordinary_witness_rescaled:{bracket_positions_1based:{"1,2":b1.toString(),"5,6":b2.toString()},only_compatible_original_generator:"qbar_b",qbar_b_entries:{"1,2":norm[0].toString(),"5,6":norm[1].toString()}},
  odd_odd_anticommutator_witness_rescaled:{entries_1based:{"1,2":a1.toString(),"5,6":a2.toString()},no_single_qbar_b_coefficient_matches:true},
  status:"ASSISTED_ORIGINAL_PDF_TRANSCRIPTION_CONDITIONAL_EXACT_ALGEBRA_NOT_SEMANTIC_AUTHORITY"
 }};
};
function alter(obj,name){
 switch(name){
 case "flip_qr_1_4":obj.matrix[0][3]="q_r:+t";break;
 case "flip_qg_4_2":obj.matrix[3][1]="q_g:+t";break;
 case "flip_qbarb_5_6":obj.matrix[4][5]="qbar_b:-t";break;
 case "alter_g8_2_2":obj.matrix[1][1]="g8:-i/sqrt3";break;
 case "delete_quark_r_5_1":obj.matrix[4][0]="0";break;
 case "invent_odd_cell":obj.matrix[2][2]="q_r:+t";break;
 case "truncate_row":obj.matrix[0].pop();break;
 case "wrong_generator_coeff":obj.matrix[6][4]="g_gr:+t";break;
 case "false_cold":obj.qualification_locks.full_49_cells_source_cold_qualified=true;break;
 case "false_author_error":obj.qualification_locks.source_author_error_proven=true;break;
 case "false_G1":obj.qualification_locks.G1_authorized=true;break;
 case "false_W_import":obj.qualification_locks.W_semantics_imported=true;break;
 default:throw Error("UNKNOWN_MUTATION_"+name);
 }
};
const cases=["flip_qr_1_4","flip_qg_4_2","flip_qbarb_5_6","alter_g8_2_2","delete_quark_r_5_1","invent_odd_cell","truncate_row","wrong_generator_coeff","false_cold","false_author_error","false_G1","false_W_import"];
const baseline=trial(fixture);if(baseline.errors.length)throw Error('BAD_ORIGINAL_ASSISTED_MATRIX '+JSON.stringify(baseline.errors));
const controls=cases.map(name=>{const x=JSON.parse(JSON.stringify(fixture));alter(x,name);const t=trial(x);return{name,rejected:t.errors.length>0,errors:t.errors.slice(0,4)}});
if(controls.some(x=>!x.rejected))throw Error('HOSTILE_ESCAPED '+JSON.stringify(controls));
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L01.eq23-complex-Lie-closure-exact-determinant.v0.1',track:'L',stage:'G0',original_source_cold_verified:false,source_semantic_authority:false,G0_frozen:false,
...baseline.summary,controls_defined:controls.length,controls_rejected:controls.filter(x=>x.rejected).length,negative_controls:controls},null,2));
