// L01 Eq2.3 assisted original 7x7 matrix: exact two-cell commutator-span obstruction.
// The underlying source transcription is NON-COLD; no author-error or G0 qualification follows.
import { readFileSync } from 'node:fs';
const input=JSON.parse(readFileSync(new URL('./l01_eq23_original_7x7_assisted_cells_0_1.json',import.meta.url),'utf8'));
function parseCell(cell){
 if(typeof cell!=="string")throw Error("CELL_NOT_A_STRING");
 if(cell==="0")return[];
 return cell.split(";").map(z=>{let parts=z.split(":");if(parts.length!==2||!parts[0]||!parts[1])throw Error("BAD_CELL_SYNTAX_"+cell);return{sym:parts[0],coeff:parts[1]}});
};
function verifyMatrix(input){
 const errs=[],need=(p,code)=>{if(!p)errs.push(code)};
 need(input.track==="L"&&input.stage==="G0"&&input.semantic_authority===false,"G0_L_SEMANTIC_FIREWALL");
 for(const key of ["full_49_cells_source_cold_qualified","independent_external_semantic_review","ordinary_matrix_commutator_necessarily_author_physics_rule","source_author_error_proven","physical_theory_qualified","G0_frozen","G1_authorized","W_semantics_imported","cross_track_synthesis_authorized","PR70_merge_authorized"])need(input.qualification_locks[key]===false,"FALSE_AUTHORITY_"+key);
 if(!Array.isArray(input.matrix)||input.matrix.length!==7||!input.matrix.every(row=>Array.isArray(row)&&row.length===7)){
  return{errors:[...errs,"SOURCE_MATRIX_SHAPE_7_BY_7_VIOLATION"],summary:null};
 }
 let parsed=[],count=0,diag=[];
 const coeffOK=new Set(input.coefficients.allowed),symbols=new Set(Object.keys(input.source_symbols));
 need(symbols.size===14,"14_SOURCE_SYMBOL_LABELS");
 for(let i=0;i<7;i++){
  parsed.push([]);
  for(let j=0;j<7;j++){
   let c;try{c=parseCell(input.matrix[i][j])}catch(e){errs.push("BAD_SOURCE_CELL_"+i+"_"+j+"_"+e.message);c=[];}
   parsed[i].push(c);if(c.length)count++;
   for(const t of c){need(symbols.has(t.sym),"BAD_SYMBOL_"+t.sym);need(coeffOK.has(t.coeff),"BAD_COEFFICIENT_"+t.coeff);}
  }
 }
 need(count===42,"42_NONZERO_ORIGINAL_POSITIONS");
 let single=(sym,i,j)=>parsed[i-1][j-1].find(t=>t.sym===sym)?.coeff||null;
 const d8=["+i/sqrt3","-i/sqrt3"];need(d8.every((t,j)=>single("g8",j+2,j+2)===t),"SOURCE_G8_FIRST_DIAGONAL");
 need(["+i/2","-i/2","-i/2","+i/2"].every((t,j)=>single("g3",j+4,j+4)===t),"SOURCE_G3_DIAGONAL");
 need(["+i/(2sqrt3)","-i/(2sqrt3)","+i/(2sqrt3)","-i/(2sqrt3)"].every((t,j)=>single("g8",j+4,j+4)===t),"SOURCE_G8_LAST_DIAGONAL");
 const checkSign=(sym,i,j,want)=>need(single(sym,i,j)===(want>0?"+t":"-t"),"WITNESS_LITERAL_"+sym+"_"+i+"_"+j);
 for(const [sym,i,j,sgn] of [["q_r",1,4,-1],["q_g",4,2,-1],["q_g",1,6,-1],["q_r",6,2,1],["q_r",5,1,1],["qbar_b",1,2,-1],["qbar_b",5,6,1]])checkSign(sym,i,j,sgn);
 for(const [i,j] of [[1,2],[5,6]])need(parsed[i-1][j-1].length===1&&parsed[i-1][j-1][0].sym==="qbar_b","TARGET_POSITION_UNIQUELY_QBAR_B_"+i+"_"+j);
 const sign=(z)=>z==="+t"?1:z==="-t"?-1:0;
 function part(sym,i,j){return sign(single(sym,i,j));}
 function bracketT2(a,b,i,j){let k=0;for(let t=1;t<=7;t++)k+=part(a,i,t)*part(b,t,j)-part(b,i,t)*part(a,t,j);return k;}
 const br12=bracketT2("q_r","q_g",1,2),br56=bracketT2("q_r","q_g",5,6);
 need(br12===2&&br56===-1,"DIRECT_MATRIX_BRACKET_VALUES");
 const lhs=br12*part("qbar_b",5,6),rhs=br56*part("qbar_b",1,2);
 need(lhs===2&&rhs===1&&lhs!==rhs,"EXACT_TWO_CELL_CLOSURE_OBSTRUCTION");
 return{errors:errs,summary:{
 original_matrix_shape:[7,7],symbols:14,nonzero_positions:count,
 bracket_expression:"[Q_r,Q_g]",
 bracket_values:{"row1_col2":"1","row5_col6":"-1/2"},
 only_source_generator_at_either_target:"Qbar_b",
 source_Qbar_b_values:{"row1_col2":"-1/sqrt(2)","row5_col6":"1/sqrt(2)"},
 crossmultiplication_ratios_in_common_units:[lhs,rhs],
 result:"CONDITIONAL_ORDINARY_LIE_SPAN_NONCLOSURE_OF_THIS_ASSISTED_EQ2_3_TRANSCRIPTION",
 author_defect_proven:false,
 needs_source_original_49_cell_cold_review:true
 }};
};
function mutate(d,name){
 switch(name){
 case"flip_r1_qbarb":d.matrix[0][1]="qbar_b:+t";break;
 case"flip_r5_qbarb":d.matrix[4][5]="qbar_b:-t";break;
 case"flip_r4_qg":d.matrix[3][1]="q_g:+t";break;
 case"flip_r6_qr":d.matrix[5][1]="q_r:-t";break;
 case"erase_r5_qr":d.matrix[4][0]="0";break;
 case"flip_g8_diag":d.matrix[1][1]="g8:-i/sqrt3";break;
 case"drop_matrix_column":d.matrix[0].pop();break;
 case"forge_cold":d.qualification_locks.full_49_cells_source_cold_qualified=true;break;
 case"forge_source_defect":d.qualification_locks.source_author_error_proven=true;break;
 case"enable_G1":d.qualification_locks.G1_authorized=true;break;
 case"import_W":d.qualification_locks.W_semantics_imported=true;break;
 case"assert_matrix_physics":d.qualification_locks.ordinary_matrix_commutator_necessarily_author_physics_rule=true;break;
 default:throw Error("BAD_TEST_"+name);
 }
};
const names=["flip_r1_qbarb","flip_r5_qbarb","flip_r4_qg","flip_r6_qr","erase_r5_qr","flip_g8_diag","drop_matrix_column","forge_cold","forge_source_defect","enable_G1","import_W","assert_matrix_physics"];
const base=verifyMatrix(input);if(base.errors.length)throw Error('BAD_ASSISTED_SOURCE_BASELINE '+JSON.stringify(base.errors));
const controls=names.map(name=>{const d=JSON.parse(JSON.stringify(input));mutate(d,name);const a=verifyMatrix(d);return{name,rejected:a.errors.length>0,errors:a.errors.slice(0,4)}});
if(controls.some(t=>!t.rejected))throw Error('MUTATION_ESCAPE '+JSON.stringify(controls));
console.log(JSON.stringify({schema:'isograph.track-L.G0.L01.Eq2.3-two-cell-conditional-source-local-obstruction.v0.1',
original_pdf_binary_rehashed_this_run:false,independent_source_semantic_cold_review:false,source_error_proven:false,G0_frozen:false,
...base.summary,negative_controls:controls,negative_controls_defined:controls.length,negative_controls_rejected:controls.filter(x=>x.rejected).length},null,2));
