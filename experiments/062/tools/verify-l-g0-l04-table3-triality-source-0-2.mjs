// Track L G0: reproduce original L04 printed Table 3 and triality matrix signs.
// Source-exact transcription and SSC conservation, not physical theory qualification.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
 packet:R+'LISI_L04_TABLE3_TRIALITY_MATRIX_EXACT_G0_0_2.json',
 census:R+'SOURCE_SEMANTIC_CENSUS_0_50.json',
 audit:R+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_67.json',
 predecessor:E+'L_CURRENT_STAGE_GATE_0_66.json',
 verifier:E+'tools/verify-l-g0-l04-table3-triality-source-0-2.mjs'
};
const load=path=>JSON.parse(fs.readFileSync(path,'utf8'));
const sha=path=>{const b=fs.readFileSync(path);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const packet=load(paths.packet),census=load(paths.census),first=load(paths.audit),gate=load(paths.gate);
const labels=['1','C','P','T','CP','CT','PT','CPT'];
const normalize=s=>s.replace(/^\+/,'');
function multiply(a,b){
 const raw= s=>{let sign=s.startsWith('-')?-1:1,v=s.replace(/^[+-]/,'');return {sign,c:Number(v.includes('C')),p:Number(v.includes('P')),t:Number(v.includes('T'))};};
 let x=raw(a),y=raw(b);
 let s=x.sign*y.sign*((x.p*y.p+x.t*y.t+x.t*y.p)%2?-1:1);
 let val=(x.c^y.c?'C':'')+(x.p^y.p?'P':'')+(x.t^y.t?'T':'');
 return (s<0?'-':'')+(val||'1');
}
const matrixRows=rows=>rows.map(s=>[...s].map(c=>c==='+'?1:c==='-'?-1:NaN));
const matmul=(a,b)=>a.map(row=>Array.from({length:b[0].length},(_,col)=>row.reduce((z,value,k)=>z+value*b[k][col],0)));
const I8=[[8,0,0,0],[0,8,0,0],[0,0,8,0],[0,0,0,8]];
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function verify(p,c,a,g){
 let failures=[],ck=(value,problem)=>{if(!value)failures.push(problem)};
 ck(p.schema==='isograph.track-L.G0.L04-original-source-exact-table3-triality-matrix.v0.2'&&p.track==='L'&&p.stage==='G0'&&p.semantic_authority===false,'original L-only source packet schema');
 ck(p.source?.id==='L04'&&p.source.revision==='arXiv:2407.02497v2'&&p.source.original_pdf==='https://arxiv.org/pdf/2407.02497v2','exact original L04 source revision');
 ck(p.source?.pdf_byte_sha_verified===false,'unclaimed original source bytes');
 ck(p.predecessor?.git_blob_sha==='c5e1e4ede1bd5d119a4d7005d98b89782947c000'&&p.evidence_scope?.initial_CI_run_id===38025480834,'first exact triality transcription failed CI and retained');
 ck(p.triality?.triality_integer_sign_rows?.[0]==='+-++','original PDF p14 first triality matrix row fourth sign is plus');
 ck(p.ancestors?.source_first_inventory_git_blob_sha===sha(paths.audit)&&p.ancestors?.source_census_git_blob_sha===sha(paths.census),'correct current source and SSC parents');
 ck(c.items?.length===191&&c.item_count===191&&c.guards?.source_census_freeze_complete===false,'current 191 identity unfrozen SSC');
 ck(a.locations?.length===53&&a.counts?.by_disposition?.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===18,'exact predecessor 53/18 G0 source packet');
 const unitById=new Map(a.locations.map(x=>[x.id,x]));
 for(const [id,sid] of [['L04-S026','L-SSC-108'],['L04-S039','L-SSC-119']]){
  ck(unitById.get(id)?.disposition==='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED','exact original audit group was pending '+id);
  ck(unitById.get(id)?.ssc_ids?.includes(sid),'exact SSC source role '+id);
  ck(c.items.some(x=>x.id===sid),'existing source ID '+sid);
 }
 const t=p.Table3||{},rows=t.printed_nonidentity_rows||{},cols=t.printed_column_order||[];
 ck(t.source_location==='L04-S026'&&t.SSC_ID==='L-SSC-108'&&t.printed_entries===56,'source Table3 explicit scope');
 ck(same(cols,labels)&&same(Object.keys(rows),labels.slice(1)),'Table3 source printed axes');
 let compared=0;
 for(let r of labels.slice(1))for(let j=0;j<8;j++){
  const s=rows[r]?.[j],x=multiply(r,labels[j]);
  ck(typeof s==='string'&&normalize(s)===x,'original Table3 exact signed cell '+r+'/'+labels[j]);compared++;
 }
 ck(compared===56,'56 source-printed table entries checked');
 const signed=[...labels,...labels.map(s=>'-'+s).map(s=>s==='-1'?'-1':s)];
 let products=0,triples=0;
 for(let i of signed)for(let j of signed){
  const ij=multiply(i,j);ck(signed.includes(ij),'full signed subgroup closure '+i+'/'+j);products++;
  for(let k of signed){ck(multiply(ij,k)===multiply(i,multiply(j,k)),'triple relation '+i+'/'+j+'/'+k);triples++;}
 }
 ck(products===256&&triples===4096,'complete finite group controls');
 const t0=p.triality||{},sgn=t0.triality_integer_sign_rows||[];
 ck(t0.source_location==='L04-S039'&&t0.SSC_ID==='L-SSC-119'&&t0.each_triality_integer_entry_divided_by===2,'printed triality matrix scope');
 ck(same(t0.weight_order,['omega_t','omega_S','h','q']),'frozen coordinate order');
 const A=matrixRows(sgn);
 ck(A.length===4&&A.every(r=>r.length===4&&r.every(Number.isInteger)),'four valid printed sign rows');
 let cube;
 if(A.length===4&&A.every(r=>r.length===4&&r.every(Number.isInteger))){cube=matmul(matmul(A,A),A);ck(same(cube,I8),'triality t^3=1 exact signed integer matrix');}
 const d=t0.first_generation_diagonal_sign_strings||{};
 ck(d.C_I==='-++-'&&d.P_I==='-+-+'&&d.T_I==='--++','printed source first generation C/P/T signs');
 for(const [key,signs]of Object.entries(d)){
  let B=matrixRows([signs]).flat();
  if(B.length===4&&B.every(Number.isInteger)&&cube){
   let D=B.map((v,i)=>Array.from({length:4},(_,j)=>j===i?v:0));
   let R=matmul(matmul(A,D),matmul(A,A));
   ck(R.flat().every(v=>v%8===0),'triality-transported signed permutation '+key);
  }else ck(false,'invalid source sign diagonal '+key);
 }
 ck(t0.source_generation_II_relation?.includes('t C_I t^2'),'only source conditional transport relation');
 ck(p.evidence_scope?.source_literal_cells_replayed===56&&p.evidence_scope?.checked_products===256&&p.evidence_scope?.associativity_triples===4096,'replayed count provenance');
 ck(p.evidence_scope?.independent_complete_original_PDF_cold_review_passed===false,'do not confuse source packet with cold complete PDF');
 const cv=p.convergence||{};
 ck(cv.previous_L04_source_locations===53&&cv.original_L04_ssc_ids===34&&cv.previous_exact_unverified_locations===18&&cv.remaining_exact_unverified_locations===16,'source-convergence exact 18 to 16');
 ck(same(cv.exact_original_source_groups_replayed,['L04-S026','L04-S039']),'only two G0 source expression group dispositions');
 ck(cv.source_census_frozen===false&&cv.G1_authorized===false&&cv.any_full_source_cold_complete===false,'G0 source freeze forbidden');
 ck(p.preservation?.new_SSC_item_ids?.length===0&&p.preservation?.semantic_W_imports===false,'no gratuitous SSC addition or W');
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.67'&&g.stage==='G0'&&g.status.endsWith('OPEN_UNFROZEN')&&g.semantic_authority===false,'G0 gate0.66 source-only');
 ck(g.predecessor_gate?.git_blob_sha===sha(paths.predecessor)&&g.source_l04_table_matrix?.git_blob_sha===sha(paths.packet),'current stage exact parents');
 ck(g.source_verifier?.git_blob_sha===sha(paths.verifier),'exact new checker pin');
 ck(g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.source_census_complete===false&&g.current_lawful_state?.NEI_pass_authorized===false&&g.current_lawful_state?.DTS_pass_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false,'no later G stages');
 ck(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.source_cold_review_passed===false,'do not claim CI or source review before outcome');
 return failures;
}
let failures=verify(packet,census,first,gate),killed=0;
const hostile=[
 ['delete_printed_table_row',(p,c,a,g)=>delete p.Table3.printed_nonidentity_rows.CT],
 ['wrong_printed_table_sign',(p,c,a,g)=>p.Table3.printed_nonidentity_rows.T[2]='PT'],
 ['invert_source_C_squared',(p,c,a,g)=>p.Table3.printed_nonidentity_rows.C[1]='-1'],
 ['switch_source_P_and_T_columns',(p,c,a,g)=>[p.Table3.printed_column_order[2],p.Table3.printed_column_order[3]]=[p.Table3.printed_column_order[3],p.Table3.printed_column_order[2]]],
 ['change_triality_sign',(p,c,a,g)=>p.triality.triality_integer_sign_rows[2]='++--'],
 ['change_matrix_denominator',(p,c,a,g)=>p.triality.each_triality_integer_entry_divided_by=4],
 ['change_C_diagonal',(p,c,a,g)=>p.triality.first_generation_diagonal_sign_strings.C_I='++++'],
 ['change_original_revision',(p,c,a,g)=>p.source.revision='arXiv:2407.02497v1'],
 ['claim_source_sha',(p,c,a,g)=>p.source.pdf_byte_sha_verified=true],
 ['fake_location_label',(p,c,a,g)=>p.triality.source_location='L04-S040'],
 ['pretend_14_groups_remaining',(p,c,a,g)=>p.convergence.remaining_exact_unverified_locations=14],
 ['forge_scc_revision',(p,c,a,g)=>p.ancestors.source_census_git_blob_sha='DEADBEEF'],
 ['pretend_198_SSC_records',(p,c,a,g)=>p.convergence.original_L04_ssc_ids=198],
 ['erase_G0_open',(p,c,a,g)=>p.convergence.source_census_frozen=true],
 ['authorize_G1',(p,c,a,g)=>g.current_lawful_state.G1_authorized=true],
 ['forge_gate_source_parent',(p,c,a,g)=>g.source_l04_table_matrix.git_blob_sha='DEADBEEF'],
 ['claim_completed_CI',(p,c,a,g)=>g.source_CI.status='SUCCESS']
];
for(const [name,mutate]of hostile){
 let p=structuredClone(packet),c=structuredClone(census),a=structuredClone(first),g=structuredClone(gate);
 mutate(p,c,a,g);
 if(verify(p,c,a,g).length)killed++;else failures.push('ESCAPED_MUTANT '+name);
}
console.log(JSON.stringify({schema:'isograph.exp062.l-original-table3-triality-source-exact-g0.v0.1',pass:failures.length===0,issues:failures,table3_original_cells:56,source_signed_group_products:256,source_associativity_triplets:4096,triality_4_by_4_cube_pass:true,unverified_groups_prior:18,unverified_groups_after:16,hostile_defined:hostile.length,hostile_rejected:killed,source_full_original_PDF_review_passed:false,G0_frozen:false,G1_authorized:false},null,2));
if(failures.length)process.exitCode=1;
