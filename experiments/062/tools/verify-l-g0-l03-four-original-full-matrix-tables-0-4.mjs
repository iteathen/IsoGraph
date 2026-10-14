// Lisi-only G0: verify ALL original frozen L03 v1 Eq(2.8),(3.1),(3.3),(3.4)
// table rows, carrier/order, 64-real/128-real matching and G0 source locks.
// This is transcription fidelity, NOT a proof of the author's physical theory.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={source:P+'LISI_L03_ORIGINAL_FOUR_REMAINING_MATRIX_TABLES_SOURCE_G0_0_1.json',
 oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_9.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_67.json',
 oldRegister:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_19.json',
 originalLayout:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_117.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_118.json',
 self:E+'tools/verify-l-g0-l03-four-original-full-matrix-tables-0-4.mjs'};
const frozen='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const gitSHA=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const hashObj=o=>{const b=Buffer.from(JSON.stringify(o));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const h=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,gitSHA(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const ids=['L03-S015','L03-S017','L03-S019','L03-S021'];
const sources=D.source.source_first;
const I=64,J=128;
const expected18=['G23','G13','G12','G14','G24','G34','g1','g2','g3','g4','g5','g6','g7','g8','W1','W2','W3','Y'];
const expected10=['g9','g10','g11','g12','g13','g14','g15','Wp1','Wp2','Wp3'];
const c=(r=0,i=0)=>[r,i];
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const coefficients={'1':c(1),'-1':c(-1),'i':c(0,1),'-i':c(0,-1),
 'i/4':c(0,.25),'-i/4':c(0,-.25),'i/6':c(0,1/6),'1/6':c(1/6),
 '-i/(4sqrt3)':c(0,-1/(4*Math.sqrt(3))),'i/(2sqrt3)':c(0,1/(2*Math.sqrt(3))),
 '1/4':c(.25),'-1/4':c(-.25),
 '-1/(4sqrt3)':c(-1/(4*Math.sqrt(3))),'1/(2sqrt3)':c(1/(2*Math.sqrt(3))),
 '1/(2sqrt6)':c(1/(2*Math.sqrt(6)))};
const coeff=(v)=>{if(!Object.hasOwn(coefficients,v))throw Error('UNKNOWN_ORIGINAL_SOURCE_COEFFICIENT_'+v);return coefficients[v];};
function oneTerm(factors,co){
 const n=2**factors.length,v=coeff(co),out=new Array(n);
 for(let row=0;row<n;row++){
  let col=row,phase=v;
  for(let k=0;k<factors.length;k++){
   const bit=(row>>(factors.length-k-1))&1,mask=1<<(factors.length-k-1),t=factors[k];
   if(t==='1')continue;
   if(t==='s1')col^=mask;
   else if(t==='s2'){col^=mask;phase=mul(phase,bit?c(0,1):c(0,-1));}
   else if(t==='s3'){if(bit)phase=mul(phase,c(-1));}
   else throw Error('UNKNOWN_ORIGINAL_PAULI_FACTOR_'+t);
  }
  out[row]={col,re:phase[0],im:phase[1]};
 }
 return out;
}
const tensor=(row)=>oneTerm(row.tensor_factors,row.coefficient);
function matrixOfTerms(terms,n){
 const out=new Float64Array(n*n);
 for(const t of terms){
  const op=tensor(t);
  if(op.length!==n)throw Error('WRONG_ORIGINAL_SOURCE_TENSOR_LEVELS');
  for(let r=0;r<n;r++)out[r*n+op[r].col]+=op[r].re;
 }
 return out;
}
function addInPlace(target,term,scalar=1){
 for(let i=0;i<target.length;i++)target[i]+=term[i]*scalar;
}
function dot(a,b){let x=0;for(let k=0;k<a.length;k++)x+=a[k]*b[k];return x;}
function rankGram(arr,tol=1e-8){
 const m=arr.length,gram=arr.map(x=>arr.map(y=>dot(x,y))),a=gram.map(x=>x.slice());
 let rank=0;
 for(let j=0;j<m;j++){
  let pivot=rank;
  for(let i=rank+1;i<m;i++)if(Math.abs(a[i][j])>Math.abs(a[pivot][j]))pivot=i;
  if(Math.abs(a[pivot][j])<tol)continue;
  [a[pivot],a[rank]]=[a[rank],a[pivot]];
  let v=a[rank][j];
  for(let k=j;k<m;k++)a[rank][k]/=v;
  for(let i=rank+1;i<m;i++){v=a[i][j];for(let k=j;k<m;k++)a[i][k]-=v*a[rank][k];}
  rank++;
 }
 return rank;
}
function sourceMatrixArithmetic(source){
 const bad=[],t=(ok,msg)=>{if(!ok)bad.push(msg);};
 const G=source?.['L03-S015']?.source_rows,Cl=source?.['L03-S017']?.source_rows,E=source?.['L03-S019']?.source_rows,PS=source?.['L03-S021']?.source_rows;
 if(!G||!Cl||!E||!PS)return ['FOUR_ORIGINAL_SOURCE_MATRIX_TABLES_REQUIRED'];
 const coeffTokens=[...Object.values(G).flat(),...Cl,...Object.values(E).flat(),...Object.values(PS).flat()].map(x=>x?.coefficient);
 const unknown=[...new Set(coeffTokens)].filter(token=>!Object.hasOwn(coefficients,token));
 t(unknown.length===0,'all original source Eq2.8,3.1,3.3,3.4 complex/real coefficient literals recognized: '+unknown.join(','));
 if(unknown.length)return bad;

 t(JSON.stringify(Object.keys(G))===JSON.stringify(expected18)&&JSON.stringify(Object.keys(E))===JSON.stringify(expected18),'original Eq2.8 and Eq3.3 full matching eighteen source generator order');
 const sourceTableShapes=JSON.stringify(Object.keys(G))===JSON.stringify(expected18)&&JSON.stringify(Object.keys(E))===JSON.stringify(expected18)&&JSON.stringify(Object.keys(PS))===JSON.stringify(expected10)&&Cl.length===14;
 t(sourceTableShapes,'original Eq2.8/3.3 18 row names; Eq3.1 all 14 and Eq3.4 all 10 source rows');
 if(!sourceTableShapes)return bad;
 let factorShapeOK=true;
 for(const [name,arr]of Object.entries(G)){
  const ok=arr?.length>0&&arr.every(x=>x?.tensor_factors?.length===6);
  t(ok,'each exact R64 six tensor-factor row '+name);factorShapeOK&&=ok;
 }
 for(const g of Cl){const ok=g?.tensor_factors?.length===7;t(ok,'all fourteen R128 seven Pauli source factors '+g?.id);factorShapeOK&&=ok;}
 if(!factorShapeOK)return bad;
 const gam=Cl.map(x=>tensor(x));
 for(let j=0;j<14;j++){
  t(gam[j].length===128&&gam[j].every(x=>Math.abs(x.im)<1e-10&&Math.abs(Math.abs(x.re)-1)<1e-10),'all original gamma source R128 entries real signed permutation '+j);
  for(let row=0;row<J;row++){
   const a=gam[j][row],b=gam[j][a.col],v=mul(c(a.re,a.im),c(b.re,b.im));
   t(b.col===row&&Math.abs(v[0]-(j<3?-1:1))<1e-10&&Math.abs(v[1])<1e-10,'source original Cl11,3 square sign '+(j+1)+' row '+row);
  }
 }
 for(let j=0;j<14;j++)for(let k=j+1;k<14;k++){
  for(let row=0;row<J;row++){
   const a=gam[j][row],b=gam[k][a.col],u=gam[k][row],v=gam[j][u.col];
   t(b.col===v.col&&Math.abs(a.re*b.re+u.re*v.re)<1e-10,'source Clifford anticommutation '+j+'/'+k+'/'+row);
  }
 }
 function posBivector(i,j){
  const out=new Float64Array(I*I),a=gam[i-1],b=gam[j-1];
  for(let r=0;r<I;r++){const u=a[r],v=b[u.col];if(v.col>=I)throw Error('CL11_3_BIVECTOR_NOT_POSITIVE_BLOCK');out[r*I+v.col]=u.re*v.re;}
  return out;
 }
 function fromMap(terms){
  const out=new Float64Array(I*I);
  for(const e of terms){if(e.indices.length!==2||e.indices[0]>=e.indices[1]||e.indices[1]>14)throw Error('SOURCE_BIVECTOR_INDEX_ORDER');
   addInPlace(out,posBivector(...e.indices),coeff(e.coefficient)[0]);}
  return out;
 }
 const sourceFrom64={};
 let max=0;
 for(const name of expected18){
  sourceFrom64[name]=matrixOfTerms(G[name],I);
  const mapped=fromMap(E[name]);
  let diff=0;for(let k=0;k<mapped.length;k++)diff=Math.max(diff,Math.abs(mapped[k]-sourceFrom64[name][k]));
  max=Math.max(max,diff);
  t(diff<1e-9,'original source Eq2.8 vs Eq3.3 R64 generator full 64x64 matrix action '+name);
 }
 t(max<1e-9,'all 18 original source representation-chosen identities matched');
 const rowGam15=fromMap(PS.g15),rowWp3=fromMap(PS.Wp3);
 const Y=sourceFrom64.Y;
 let hyperdiff=0;for(let k=0;k<Y.length;k++)hyperdiff=Math.max(hyperdiff,Math.abs(Y[k]-rowWp3[k]-Math.sqrt(6)/3*rowGam15[k]));
 t(hyperdiff<1e-9,'Y source generator decomposes in SU2_R and SU4 Pati-Salam source basis under chosen representation');
 const candidates=[...Array.from({length:8},(_,k)=>fromMap(E['g'+(k+1)])),...Array.from({length:7},(_,k)=>fromMap(PS['g'+(k+9)])),
 ...['W1','W2','W3'].map(k=>fromMap(E[k])),...['Wp1','Wp2','Wp3'].map(k=>fromMap(PS[k]))];
 t(candidates.length===21&&rankGram(candidates)===21,'21 independent original Pati-Salam chosen R64 source generator matrices');
 t(source['L03-S015']?.fermion_real64_column_original_particle_block_order?.join(',')==='nu,e,u_r,d_r,u_g,d_g,u_b,d_b','Eq2.8 original 8 particle/carrier blocks ordered');
 t(source['L03-S015']?.first_8real_electron_subcolumn?.join(',')==='e_L_up_real,e_L_up_imag,e_L_down_real,e_L_down_imag,e_R_up_real,e_R_up_imag,e_R_down_real,e_R_down_imag','Eq2.8 original electron block fine spin/chirality/real order');
 t(source['L03-S017']?.signature_order?.includes('4..14 positive')&&source['L03-S019']?.source_modality?.includes('SOURCE_ASSERTED')&&source['L03-S021']?.source_scope?.includes('40 frame-Higgs complement'),'original Clifford and representation assertion modalities and remaining complement');
 return bad;
}
function check(d){
 const errs=[],t=(v,msg)=>{if(!v)errs.push(msg);};
 const p=d.source||{},I=d.oldInv||{},S=d.oldSSC||{},R=d.oldRegister||{},G=d.oldGate||{},Q=d.gate||{};
 t(p.schema==='isograph.track-L.G0.L03.original-complete-four-matrix-tables.v0.1'&&p.track==='L'&&p.stage==='G0','original source stage L G0 only');
 t(p.frozen_source?.revision==='arXiv:1006.4908v1'&&p.frozen_source?.SHA256===frozen&&p.frozen_source?.pages===14,'actual original revision and hash');
 t(p.source_oracle?.text_CI?.run_id===38100167428&&p.source_oracle?.text_CI?.conclusion==='success'&&p.source_oracle?.visual_CI?.run_id===38098981415,'independent original PDF source-first visual and text oracles');
 t(hashObj(p.source_first)==='310352a666c9c49e3192e49b75937e2d5e86f05c','full exact original source table carrier-coefficient/row inventory immutable source transcript hash');
 t(p.conservation?.old_original_formula_groups_pending===4&&p.conservation?.new_typed_SSC_ids===0&&p.conservation?.whole_L03_original_source_semantic_cold_complete===false,'no fabricated source new ID or G0 closure');
 t(p.source_exit_guard?.G0_complete===false&&p.source_exit_guard?.G0_frozen===false&&p.source_exit_guard?.G1_authorized===false&&p.source_exit_guard?.W_semantics_imported===false,'source packet no stage false complete');
 t(Object.keys(p.source_first||{}).join(',')===ids.join(','),'four already indexed loadbearing original source groups');
 errs.push(...sourceMatrixArithmetic(p.source_first));
 t(I.schema==='isograph.track-L.G0.L03-original-source-first-bidirectional-coverage.v0.9'&&I.original_first_locations?.length===47&&I.counts?.original_source_formula_groups_unverified===4,'47 original source first IDs and exactly four pending source formula groups');
 const open='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED';
 for(const id of ids){
  const x=I.original_first_locations.find(z=>z.source_location_id===id),current=p.source_first[id];
  t(x?.disposition===open&&JSON.stringify(x?.SSC_ids)===JSON.stringify(current?.existing_SSC_owners),'original existing source first underindexing and SSC owner preserved '+id);
 }
 t(S.schema==='woit-lisi.track-l.source-semantic-census.v0.67'&&S.items?.length===191&&S.guards?.source_census_freeze_complete===false,'old 191 source record G0 guard');
 t(JSON.stringify(S.items)===JSON.stringify(D.oldSSC.items)&&JSON.stringify(S.guards)===JSON.stringify(D.oldSSC.guards),'all 191 preexisting SSC entire original source bodies, guards and modality exactly conserved; no hidden unrelated rewrite');
 t(JSON.stringify(I.original_first_locations)===JSON.stringify(D.oldInv.original_first_locations),'all 47 historical original L03 source row owner, disposition and semantics conserved prior to scoped promotion');
 t(JSON.stringify(R.per_source)===JSON.stringify(D.oldRegister.per_source),'all six prior frozen original source-gate debts exactly conserved');

 t(R.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.19'&&R.current_ssc?.git_blob_sha===h.oldSSC&&R.per_source?.length===6,'whole six frozen source exact history');
 t(R.per_source.reduce((x,z)=>x+z.source_first_location_units,0)===350&&R.per_source.every(z=>z.original_complete_cold_review_passed===false),'six source 350 owner groups / zero cold source closure');
 t(R.exit_acceptance_contract?.G0_SSC_frozen===false&&R.exit_acceptance_contract?.G0_SSC_complete===false&&R.exit_acceptance_contract?.G1_authorized===false,'global G0 unchanged');
 t(G.schema==='isograph.exp062-l-current-stage-gate.v0.117'&&G.current_source_census?.git_blob_sha===h.oldSSC&&G.current_lawful_state?.G0_frozen===false&&G.current_lawful_state?.G1_authorized===false,'current gate source authority and stage');
 t(G.first_four_matrices_failed_CI?.run_id===38100555833&&G.first_four_matrices_failed_CI?.conclusion==='failure'&&G.first_four_matrices_failed_CI?.source_coefficient_problem==='1/6','predecessor original coefficient-domain CI failure preserved');
 t(Q.schema==='isograph.exp062-l-current-stage-gate.v0.118'&&Q.predecessor_gate?.git_blob_sha===h.oldGate&&Q.current_source_census?.git_blob_sha===h.oldSSC&&Q.preflight_source_verifier?.git_blob_sha===h.self,'new stage G0 exact source+verifier authority routed');
 t(Q.third_four_matrices_failed_CI?.run_id===38113061884&&Q.third_four_matrices_failed_CI?.conclusion==='failure'&&Q.third_four_matrices_failed_CI?.hostiles_rejected===21,'retain third failed 21/22 CI unrelated SSC conservation escape');
 t(Q.second_four_matrices_failed_CI?.run_id===38112911977&&Q.second_four_matrices_failed_CI?.conclusion==='failure'&&Q.second_four_matrices_failed_CI?.hostiles_rejected===21,'second historical failed 21/22 hostile CI preserved');
 t(Q.current_lawful_state?.G0_frozen===false&&Q.current_lawful_state?.G1_authorized===false&&Q.current_lawful_state?.PR70_merge_authorized===false,'success cannot preauthorize G1/merge');
 t(d.originalLayout?.original_sources?.[2]?.PDF_SHA256===frozen&&d.originalLayout.original_sources[2].original_pdf_layout_blocks===94,'source original layout 94 blocks');
 return errs;
}
async function checkOriginalPDF(){
 const issues=[],dir=fs.mkdtempSync(path.join(os.tmpdir(),'L03-four-final-matrix-source-'));
 try{
  const r=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(40000)});
  if(r.status!==200)throw Error('ORIGINAL_FROZEN_HTTP_'+r.status);
  const bytes=Buffer.from(await r.arrayBuffer());
  if(sha(bytes)!==frozen)throw Error('ORIGINAL_FROZEN_PDF_SHA256_CHANGED');
  const fn=path.join(dir,'frozen.pdf');fs.writeFileSync(fn,bytes);
  if(!/^Pages:\s*14$/m.test(execFileSync('pdfinfo',[fn],{encoding:'utf8',timeout:14000})))throw Error('ORIGINAL_14PAGE_COUNT');
  for(const [page,eqs]of [[6,['2.8']],[7,['3.1']],[8,['3.3','3.4']]]){
   const str=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',fn,'-'],{encoding:'utf8',timeout:15000,maxBuffer:1800000});
   const record=D.originalLayout.original_sources[2].original_pdf_extracted_pages[page-1];
   if(sha(Buffer.from(str))!==record.original_extracted_page_SHA256)issues.push('FROZEN_ORIGINAL_SOURCE_PAGE_SHA_'+page);
   for(const eq of eqs)if(!str.includes('('+eq+')'))issues.push('ORIGINAL_SOURCE_EQ_LABEL_'+eq);
  }
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
 return issues;
}
const bad=check(D),mutants=[
 ['relabel_original_source_revision',d=>d.source.frozen_source.revision='arXiv:v2'],
 ['flip_source_gamma_sign',d=>d.source.source_first['L03-S017'].source_rows[0].coefficient='-i'],
 ['flip_original_gamma_Pauli',d=>d.source.source_first['L03-S017'].source_rows[6].tensor_factors[4]='s2'],
 ['alter_real64_tensor',d=>d.source.source_first['L03-S015'].source_rows.g1[0].tensor_factors[0]='s3'],
 ['flip_original_epsilon_C32',d=>d.source.source_first['L03-S015'].source_rows.W1[0].coefficient='i/4'],
 ['alter_real64_mirror_Y',d=>d.source.source_first['L03-S015'].source_rows.Y[2].coefficient='i/4'],
 ['flip_original_Bivector_source',d=>d.source.source_first['L03-S019'].source_rows.g1[1].coefficient='1/4'],
 ['flip_original_TG_W',d=>d.source.source_first['L03-S019'].source_rows.W3[0].coefficient='1/4'],
 ['invert_pati_salam_su4',d=>d.source.source_first['L03-S021'].source_rows.g9[0].coefficient='-1/4'],
 ['alter_pati_salam_Wprime',d=>d.source.source_first['L03-S021'].source_rows.Wp3[1].coefficient='-1/4'],
 ['modify_source_Y_fraction',d=>d.source.source_first['L03-S019'].source_rows.Y[2].coefficient='1/4'],
 ['invent_unsupported_original_scalar',d=>d.source.source_first['L03-S019'].source_rows.Y[2].coefficient='1/37'],
 ['missing_source_gamma_row',d=>d.source.source_first['L03-S017'].source_rows.pop()],
 ['add_source_matrix_row',d=>d.source.source_first['L03-S015'].source_rows.G99=[{coefficient:'1',tensor_factors:['1','1','1','1','1','1']}]],
 ['change_original_64_column_order',d=>d.source.source_first['L03-S015'].fermion_real64_column_original_particle_block_order.reverse()],
 ['fake_author_theory_proved',d=>d.source.source_exit_guard.G0_complete=true],
 ['claim_all_formula_groups_retired',d=>d.source.conservation.old_original_formula_groups_pending=0],
 ['remove_old_source_owner',d=>d.oldInv.original_first_locations.find(x=>x.source_location_id==='L03-S015').SSC_ids=[]],
 ['false_source_first_done',d=>d.oldInv.counts.original_source_formula_groups_unverified=0],
 ['alter_existing_SSC',d=>d.oldSSC.items[0].body+=' fake'],
 ['alter_unaffected_L03_source',d=>d.oldInv.original_first_locations[0].source_semantic_group+=' unknown author inference'],
 ['forge_other_L_source_cold',d=>d.oldRegister.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['invent_global_G0',d=>d.oldRegister.exit_acceptance_contract.G0_SSC_frozen=true],
 ['premature_G1',d=>d.oldGate.current_lawful_state.G1_authorized=true]
];
let rejected=0;
for(const [name,fn] of mutants){
 const d=JSON.parse(JSON.stringify(D));
 try{fn(d);if(check(d).length)rejected++;else bad.push('HOSTILE_ESCAPED_'+name);}
 catch(e){bad.push('HOSTILE_EXCEPTION_'+name+':'+String(e));}
}
bad.push(...await checkOriginalPDF());
const output={schema:'isograph.exp062.L.G0.L03.four-original-matrix-tables-preflight.v0.4',pass:bad.length===0,issues:bad,
 original_PDF_SHA256_verified:true,original_pages_6_7_8_qualified:true,
 source_original_reconstructed_groups:4,source_original_real64_rows:18,source_original_real128_vectors:14,
 source_original_positive_chiral_rows:18,source_original_extra_PatiSalam_rows:10,
 source_to_source_original_18_representation_matrices_numerically_checked:true,
 total_original_L03_source_location_groups:47,existing_L_SSC_identities:191,
 original_formula_groups_unverified_before_G0_proposal:4,source_G0_frozen:false,
 source_mathematical_physics_theory_qualified:false,hostiles_defined:mutants.length,hostiles_rejected:rejected};
console.log(JSON.stringify(output,null,2));if(bad.length)process.exitCode=1;
