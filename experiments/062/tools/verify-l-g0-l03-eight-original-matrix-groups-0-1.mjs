// Track L ONLY G0: independent frozen original L03 v1 visual-source matrix
// transcription fidelity, source→SSC conservation, and sign/slot math controls.
// Eight existing Section 2 groups; not a proof of the author's physics or G0.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L03_ORIGINAL_SECTION2_EIGHT_OPERATOR_MATRIX_GROUPS_G0_0_1.json',
 oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_7.json',
 inv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_8.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_65.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_66.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_17.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_18.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_34.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_35.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_112.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_113.json',
 self:E+'tools/verify-l-g0-l03-eight-original-matrix-groups-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const SHA=b=>crypto.createHash('sha256').update(b).digest('hex');
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const originalSHA='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e';
const ids=['L03-S006','L03-S007','L03-S008','L03-S009','L03-S011','L03-S012','L03-S013','L03-S014'];
const editIds=['L-SSC-006','L-SSC-070','L-SSC-071','L-SSC-072','L-SSC-074','L-SSC-075'];
const open='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED';
const done='SCOPED_EXACT_ORIGINAL_EQ2_1_TO_EQ2_7_SOURCE_MATRIX_CARRIER_VISUAL_RECONCILED_GLOBAL_COLD_OPEN';
const near=(a,b)=>Math.abs(a.r-b.r)<1e-9&&Math.abs(a.i-b.i)<1e-9;
const c=(r=0,i=0)=>({r,i});
const add=(a,b)=>c(a.r+b.r,a.i+b.i);
const mul=(a,b)=>c(a.r*b.r-a.i*b.i,a.r*b.i+a.i*b.r);
const scale=(a,b)=>mul(a,c(b));
const cmplx=x=>typeof x==='number'?c(x):x==='0'?c():x==='1'?c(1):x==='-1'?c(-1):(x==='i'||x==='+i')?c(0,1):x==='-i'?c(0,-1):(()=>{throw Error('COMPLEX_LITERAL_NOT_IN_SOURCE_'+x)})();
const M=x=>x.map(row=>row.map(cmplx));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>c(i===j?1:0)));
const mm=(a,b)=>a.map((row,i)=>b[0].map((_,j)=>row.reduce((v,z,k)=>add(v,mul(z,b[k][j])),c())));
const ma=(a,b)=>a.map((row,i)=>row.map((z,j)=>add(z,b[i][j])));
const ms=(a,z)=>a.map(row=>row.map(v=>mul(v,z)));
const kron=(a,b)=>a.flatMap(ar=>b.map(br=>ar.flatMap(x=>br.map(y=>mul(x,y)))));
const eq=(a,b)=>a?.length===b?.length&&a.every((row,i)=>row?.length===b[i]?.length&&row.every((x,j)=>near(x,b[i][j])));
const conT=a=>a[0].map((_,j)=>a.map(row=>c(row[j].r,-row[j].i)));
const sigmaInput=(r)=>[M(r.sigma1),M(r.sigma2),M(r.sigma3)];
function parseLinear(src,values){
 const n=String(src).replace(/\s+/g,'');
 if(n==='0')return c();
 const matches=[...n.matchAll(/([+-]?)(i?)([vw])(\d+)/g)];
 if(matches.map(x=>x[0]).join('')!==n||!matches.length)throw Error('WRONG_LINEAR_SOURCE_EXPRESSION_'+src);
 return matches.reduce((sum,m)=>{
  const sign=m[1]==='-'?-1:1,key=m[3]+m[4],num=values[key];
  if(typeof num!=='number')throw Error('UNKNOWN_SOURCE_BASIS_'+key);
  return add(sum,m[2]==='i'?c(0,sign*num):c(sign*num));
 },c());
}
function sourceArithmetic(groups){
 const bad=[],t=(yes,msg)=>{if(!yes)bad.push(msg);};
 const a=groups['L03-S006'],b=groups['L03-S007'],w=groups['L03-S008'],p=groups['L03-S009'],h=groups['L03-S012'],n=groups['L03-S014'];
 if(!a||!b||!w||!p||!h||!n)return ['ORIGINAL_SOURCE_MATH_GROUP_MISSING'];
 let s1,s2,s3,g;try{
 [s1,s2,s3]=sigmaInput(a);
 t(a.product==='sigma_I sigma_J=delta_IJ 1 + i epsilon_IJ^K sigma_K','source Pauli ordered epsilon index product sign');
 const sig=[s1,s2,s3],unit=I(2);
 for(let i=0;i<3;i++)t(eq(mm(sig[i],sig[i]),unit),'Pauli square sign '+i);
 for(const [i,j,k] of [[0,1,2],[1,2,0],[2,0,1]])t(eq(mm(sig[i],sig[j]),ms(sig[k],c(0,1))),'Pauli source epsilon orientation '+i+'/'+j);
 t(b.antisymmetrized_product==='gamma_ab=gamma_[a gamma_b]=1/2(gamma_a gamma_b -gamma_b gamma_a)=gamma_a gamma_b for a<b','source bivector index ordering and antisymmetrization 1/2');
 const gammaExpected=['gamma1=i sigma2 tensor sigma1','gamma2=i sigma2 tensor sigma2','gamma3=i sigma2 tensor sigma3','gamma4=sigma1 tensor 1'];
 t(JSON.stringify(b.gamma_vectors)===JSON.stringify(gammaExpected),'all four original source Clifford vector tensor factor names');
 g=[ms(kron(s2,s1),c(0,1)),ms(kron(s2,s2),c(0,1)),ms(kron(s2,s3),c(0,1)),kron(s1,unit)];
 for(let i=0;i<4;i++)t(eq(mm(g[i],g[i]),ms(I(4),c(i===3?1:-1))),'Weyl Cl(1,3) chosen generator squared '+i);
 for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)t(eq(ma(mm(g[i],g[j]),mm(g[j],g[i])),ms(I(4),c())),'source Clifford anticommutator '+i+'/'+j);
 const vv={v1:2,v2:3,v3:5,v4:7};
 const sourceV=b.vector_action_4x4?.map(row=>row.map(x=>parseLinear(x,vv)));
 const computedV=g.reduce((sum,m,i)=>ma(sum,ms(m,c([2,3,5,7][i]))),ms(I(4),c(0)));
 t(eq(sourceV,computedV),'four full source v^a gamma_a matrix rows exact sign/slot order');
 const names=['23','13','12','14','24','34'];
 t(JSON.stringify(b.bivector_rows?.map(x=>x[0]))===JSON.stringify(names),'six original bivector row labels');
 for(const [key,expr] of b.bivector_rows||[]){
  const m=String(expr).match(/^([+-]?i)?\s*(1|sigma[123]) tensor (1|sigma[123])$/);
  t(!!m,'source Pauli bivector two factor expression syntactically valid '+key);if(!m)continue;
  const fac=x=>x==='1'?unit:sig[Number(x.slice(-1))-1];
  const expected=ms(kron(fac(m[2]),fac(m[3])),m[1]?cmplx(m[1]):c(1));
  const ij=[Number(key[0])-1,Number(key[1])-1];
  t(eq(expected,mm(g[ij[0]],g[ij[1]])),'six original bivector matrix signs and Pauli tensor order '+key);
 }
 const sample={w12:2,w13:3,w14:5,w23:7,w24:11,w34:13};
 let omega=ms(I(4),c(0));
 for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)omega=ma(omega,ms(mm(g[i],g[j]),c(sample['w'+(i+1)+(j+1)])));
 const wL=w.left_chiral_matrix.map(row=>row.map(x=>parseLinear(x,sample)));
 const wR=w.right_chiral_matrix.map(row=>row.map(x=>parseLinear(x,sample)));
 t(eq(wL,omega.slice(0,2).map(row=>row.slice(0,2))),'source Eq2.3 left 2x2 operator coefficient binders');
 t(eq(wR,omega.slice(2,4).map(row=>row.slice(2,4))),'source Eq2.3 right 2x2 operator coefficient binders');
 t(eq(wR,ms(conT(wL),c(-1)))&&w.chosen_rep_relation==='omega_R=-omega_L dagger','source Eq2.3 right negative Hermitian adjoint and source textual scope');
 t(p.pseudoscalar==='gamma=gamma1 gamma2 gamma3 gamma4=-i sigma3 tensor 1'&&p.projectors==='P_L/R=1/2(1±i gamma)'&&p.P_L_chiral_block_diagonal?.join(',')==='1,0'&&p.P_R_chiral_block_diagonal?.join(',')==='0,1','source Eq2.4 exact projector identities and chirality labels');
 const pseu=mm(mm(mm(g[0],g[1]),g[2]),g[3]);
 t(eq(pseu,[[c(0,-1),c(),c(),c()],[c(),c(0,-1),c(),c()],[c(),c(),c(0,1),c()],[c(),c(),c(),c(0,1)]]),'Eq2.4 source pseudoscalar diag and chirality orientation');
 const ip=ma(I(4),ms(pseu,c(0,1)));
 const im=ma(I(4),ms(pseu,c(0,-1)));
 t(eq(ms(ip,c(.5)),[[c(1),c(),c(),c()],[c(),c(1),c(),c()],[c(),c(),c(),c()],[c(),c(),c(),c()]])&&eq(ms(im,c(.5)),[[c(),c(),c(),c()],[c(),c(),c(),c()],[c(),c(),c(1),c()],[c(),c(),c(),c(1)]]),'source Eq2.4 left/right projector blocks');
 t(n.equivalent_pauli_form==='-i sigma2'&&n.complex_field_to_real_column?.join(',')==='f_r,f_i'&&n.i_action_on_real_column?.join(',')==='-f_i,f_r','source realification exact complex-to-real component order and Pauli factor');
 const re=M(n.i_real_matrix),sq=mm(re,re);
 t(eq(sq,ms(I(2),c(-1))),'i realification squared minus identity');
 const vector=[c(5),c(7)],result=mm(re,vector.map(x=>[x]));
 t(near(result[0][0],c(-7))&&near(result[1][0],c(5)),'realification ordered complex field input/output action');
 }catch(e){bad.push('SOURCE_ARITHMETIC_TEST_EXCEPTION_'+String(e));}
 const gen=['nu_L','nu_R','e_L','e_R','u_L^r','u_R^r','d_L^r','d_R^r','u_L^g','u_R^g','d_L^g','d_R^g','u_L^b','u_R^b','d_L^b','d_R^b'];
 t(JSON.stringify(groups['L03-S011']?.generation_16C)===JSON.stringify(gen)&&groups['L03-S011']?.column_scope?.includes('32C'),'source original ordered 16C fermions and 32C spin carrier');
 const expectedY=['-1','0','-1','-2','1/3','4/3','1/3','-2/3','1/3','4/3','1/3','-2/3','1/3','4/3','1/3','-2/3'];
 const expectedQ=['0','0','-1','-1','2/3','2/3','-1/3','-1/3','2/3','2/3','-1/3','-1/3','2/3','2/3','-1/3','-1/3'];
 t(h.Y_diagonal_16?.join(',')===expectedY.join(','),'original Eq2.6 hypercharge full source original 16 eigenvalues in order');
 t(h.Q_diagonal_16_without_i?.join(',')===expectedQ.join(','),'source p5 full electric source eigenvalues');
 const frac=z=>z.includes('/')?Number(z.split('/')[0])/Number(z.split('/')[1]):Number(z);
 for(let j=0;j<16;j++){
  const color=Math.floor(j/4),weak=Math.floor((j%4)/2),chir=j%2;
  const z=weak===0?1:-1,baseline=color===0?-1:1/3;
  const sourceY=baseline+(chir===1?z:0);
  const sourceQ=(sourceY+(chir===0?z:0))/2;
  t(Math.abs(frac(h.Y_diagonal_16[j])-sourceY)<1e-9,'hypercharge source SU2R+SU4 decomposition '+j);
  t(Math.abs(frac(h.Q_diagonal_16_without_i[j])-sourceQ)<1e-9,'source electric U1Q representation right/left conditional '+j);
 }
 t(h.electric_charge_Q==='(i/2)(1 tensor sigma3 tensor P_R+sqrt(2/3) Lambda15 tensor 1 tensor 1)+(i/2)1 tensor sigma3 tensor P_L','exact source electric-Q left projection term');
 t(h.hypercharge_prefactor==='i/2'&&h.Y_decomposition==='(i/2)(1 tensor sigma3 tensor P_R + sqrt(2/3) Lambda15 tensor 1 tensor 1)'&&h.Lambda15==='sqrt(3/2) diag(-1,1/3,1/3,1/3)','original hypercharge source overall i/2 and Lambda15 normalization');
 const generators={
 gravity6:'T_ab^G=1 tensor 1 tensor gamma_ab',
 strong8:'T_A^g=(i/2)Lambda_A tensor 1 tensor 1',
 weak3:'T_I^W=(i/2)1 tensor sigma_I tensor P_L',
 hypercharge1:'T^Y=(i/2)1 tensor sigma3 tensor P_R+(i/2)sqrt(2/3)Lambda15 tensor 1 tensor 1'
 };
 t(JSON.stringify(groups['L03-S013']?.generators)===JSON.stringify(generators),'original Eq2.7 four complete C32 generator families with 6+8+3+1 sources');
 t(groups['L03-S013']?.carrier==='C(32) acting on same ordered 32-complex one-generation fermion column','Eq2.7 source carrier 32C not C64');
 return bad;
}
function check(d){
 const err=[],t=(b,s)=>{if(!b)err.push(s);};
 const {packet:p,oldInv:oi,inv:i,oldSSC:os,ssc:n,oldReg:or,reg:r,oldTr:ot,tr:v,oldGate:og,gate:g}=d;
 t(p?.schema==='isograph.track-L.G0.L03-original-source-8-group-clifford-SM-matrix-literal.v0.1'&&p?.track==='L'&&p?.stage==='G0','source scoped L G0');
 t(p?.frozen_original?.revision==='arXiv:1006.4908v1'&&p?.frozen_original?.SHA256===originalSHA&&p?.frozen_original?.total_original_PDF_pages===14,'frozen original 14-page SHA pinned');
 t(p?.source_visual_cold_read?.run_id===38098981415&&p?.source_visual_cold_read?.job_id===114350756436&&p?.source_visual_cold_read?.conclusion==='success','original PDF rendered and inspected independent source');
 t(p?.source_fidelity_failure_mechanism?.class==='SELECTED_GENERATOR_COUNTS_AND_REPRESENTATION_LABELS_UNDERINDEXED_EXACT_SOURCE_MATRICES_AND_BINDERS','source error class and extraction rule');
 t(p?.G0_complete!==true&&p?.original_source_coverage_boundary?.full_L03_original_semantic_cold_complete===false&&p?.conservation?.G0_frozen===false&&p?.conservation?.G1_authorized===false,'packet no global stage promotion');
 const groups=p?.source_first_groups||{};
 t(Object.keys(groups).join(',')===ids.join(','),'eight frozen source group identities only');
 err.push(...sourceArithmetic(groups));
 t(p?.original_source_coverage_boundary?.previous_remaining_exact_formula_groups===15&&p?.original_source_coverage_boundary?.after_scoped_replay_remaining_exact_groups===7&&p?.original_source_coverage_boundary?.new_typed_identities===0,'finite source exact debt 15 to 7, no new SSC');
 t(p?.conservation?.old_entire_SSC_records_untouched===185&&p?.conservation?.old_complete_source_rows_untouched===39,'whole original records conserved');
 t(oi?.original_first_locations?.length===47&&i?.original_first_locations?.length===47,'all 47 source group identities');
 const changes=[];for(let j=0;j<47;j++){const x=oi?.original_first_locations?.[j],y=i?.original_first_locations?.[j];t(x?.source_location_id===y?.source_location_id,'source-first identity '+j);if(JSON.stringify(x)!==JSON.stringify(y))changes.push(y?.source_location_id);}
 t(changes.join(',')===ids.join(','),'39 unmodified whole source rows');
 for(const id of ids){
  const before=oi?.original_first_locations?.find(x=>x.source_location_id===id);
  const row=i?.original_first_locations?.find(x=>x.source_location_id===id),src=groups[id];
  t(before?.disposition===open&&row?.disposition===done,'original source exact groups restored '+id);
  t(JSON.stringify(before?.SSC_ids)===JSON.stringify(src?.source_roles)&&JSON.stringify(row?.SSC_ids)===JSON.stringify(src?.source_roles),'bidirectional owner group '+id);
  t(row?.original_source_matrix_literal_packet?.git_blob_sha===H.packet&&row?.original_source_matrix_literal_packet?.G0_whole_source_cold_complete===false,'exact original source byte packet and no whole cold '+id);
  t(row?.source_semantic_group?.length>before?.source_semantic_group?.length,'actual source-first semantic body expanded '+id);
 }
 t(i?.counts?.by_disposition?.[open]===7&&i?.counts?.by_disposition?.[done]===8&&Object.values(i?.counts?.by_disposition||{}).reduce((x,y)=>x+y,0)===47,'source exact status 7/8 and 47 denominator');
 t(i?.current_exact_source_formula_groups_remaining===7&&i?.predecessor_section2_matrix_eight?.git_blob_sha===H.oldInv,'original first stable ancestor/remaining debt');
 t(os?.items?.length===191&&n?.items?.length===191&&os?.schema==='woit-lisi.track-l.source-semantic-census.v0.65'&&n?.schema==='woit-lisi.track-l.source-semantic-census.v0.66','original 191 SSC IDs same');
 const edited=[];for(let k=0;k<191;k++){const x=os?.items?.[k],y=n?.items?.[k];t(x?.id===y?.id,'SSC historical identity '+k);if(JSON.stringify(x)!==JSON.stringify(y))edited.push(y?.id);}
 t(edited.join(',')===editIds.join(',')&&new Set(n?.items?.map(x=>x.id)).size===191,'185 full SSC records unchanged, six exact source semantic repairs');
 for(const id of editIds){
  const z=n?.items?.find(x=>x.id===id),prev=os?.items?.find(x=>x.id===id);
  t(z?.body?.startsWith(prev?.body)&&z.body.length>prev.body.length,'SSC original semantic body preserved/extended '+id);
  const ev=z?.source_expression_census?.L03_FROZEN_ORIGINAL_SECTION2_EIGHT_MATRIX_GROUPS_0_1;
  t(ev?.original_source_matrix_catalog?.git_blob_sha===H.packet&&ev?.source_first_inverse?.git_blob_sha===H.inv&&ev?.whole_source_cold_review_complete===false,'SSC exact source packet inverse '+id);
 }
 t(n?.predecessor?.git_blob_sha===H.oldSSC&&n?.revision?.original_source_packet?.git_blob_sha===H.packet&&n?.revision?.original_first_inverse?.git_blob_sha===H.inv,'original exact SSC ancestry');
 t(n?.guards?.source_census_freeze_complete===false&&n?.guards?.L03_remaining_unverified_exact_formula_matrix_groups===7,'source fidelity guard and not G0 freeze');
 t(or?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.17'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.18'&&r?.source_first_predecessor?.git_blob_sha===H.oldReg,'six original register ancestry');
 t(r?.current_ssc?.git_blob_sha===H.ssc&&r?.per_source?.length===6&&r?.per_source?.reduce((x,y)=>x+y.source_first_location_units,0)===350,'original 350/191 corpus conservation');
 const L03=r?.per_source?.find(x=>x.source==='L03');
 t(L03?.audit_git_blob_sha===H.inv&&L03?.original_exact_cell_expression_groups_not_yet_independently_verified===7&&L03?.original_complete_cold_review_passed===false,'seven exact formula groups remain L03 source');
 t(r?.per_source?.every(x=>x.original_complete_cold_review_passed===false)&&r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false,'none of six sources G0 cold-closed');
 t(r?.L03_original_section2_eight_signed_matrix_replay?.git_blob_sha===H.packet,'source 8 matrix packet attached to convergent register');
 t(ot?.schema==='lisi.full-treatment.source-traversal-ledger.v0.34'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.35'&&v?.predecessor_exact?.git_blob_sha===H.oldTr,'traversal ancestor');
 t(v?.current_census?.git_blob_sha===H.ssc&&v?.current_L03_source_first_inventory?.git_blob_sha===H.inv&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg&&v?.complete_sources===0,'traversal source group and SSC conservation');
 t(og?.schema==='isograph.exp062-l-current-stage-gate.v0.112'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.113'&&g?.predecessor_gate?.git_blob_sha===H.oldGate,'stage authority exact predecessor');
 t(g?.current_source_census?.git_blob_sha===H.ssc&&g?.current_L03_inventory?.git_blob_sha===H.inv&&g?.current_convergence?.git_blob_sha===H.reg&&g?.current_traversal?.git_blob_sha===H.tr&&g?.original_matrix_packet?.git_blob_sha===H.packet&&g?.source_verifier?.git_blob_sha===H.self,'stage current G0 exact source/SSC/CI links');
 t(g?.prior_visual_SHA_rendered_CI?.run_id===38098981415&&g?.prior_visual_SHA_rendered_CI?.conclusion==='success','original source visual SHA provenance');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'no prior CI or G1/merge misclaim');
 return err;
}
const PDF=async()=>{
 const errors=[];
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L03-G0-Eq2-'));
 try{
  const resp=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(40000)});
  if(resp.status!==200)throw Error('FROZEN_SOURCE_HTTP_'+resp.status);
  const bytes=Buffer.from(await resp.arrayBuffer());
  if(SHA(bytes)!==originalSHA)throw Error('ORIGINAL_SOURCE_V1_SHA256_CHANGED');
  const file=path.join(dir,'original.pdf');fs.writeFileSync(file,bytes);
  const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
  if(!/^Pages:\s*14$/m.test(info))throw Error('FROZEN_SOURCE_PDF_PAGES_NOT14');
  const packet=D.packet;
  for(let p=1;p<=5;p++){
   const originalText=execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1000000});
   const rec=packet?.frozen_original?.source_primary_pages_sha256?.['PDF_zero_based_'+p];
   if(SHA(Buffer.from(originalText))!==rec?.source_page_SHA256)errors.push('PRIMARY_ORIGINAL_PDF_PAGE_HASH_MISMATCH_'+p);
   if((originalText.match(/\S+/g)||[]).length<25)errors.push('PRIMARY_ORIGINAL_PDF_TEXT_MISSING_'+p);
  }
  const second=execFileSync('pdftotext',['-f','2','-l','2','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:12000});
  const third=execFileSync('pdftotext',['-f','3','-l','3','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:12000});
  const fourth=execFileSync('pdftotext',['-f','4','-l','4','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:12000});
  const fifth=execFileSync('pdftotext',['-f','5','-l','5','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:12000});
  const txt=[second,third,third,third,fourth,fourth,fifth,fifth];
  const labels=['(2.1)','(2.2)','(2.3)','(2.4)','(2.5)','(2.6)','(2.7)','i ↦'];
  for(let z=0;z<labels.length;z++){
   const near=txt[z].replace(/\s+/g,' ');
   if(z===7){if(!fifth.includes('σ2')||!fifth.includes('f'))errors.push('ORIGINAL_REALIFICATION_PAGE_CONTENT_MISSING');}
   else if(!near.includes(labels[z]))errors.push('ORIGINAL_SOURCE_EQ_LABEL_NOT_FOUND_'+labels[z]);
  }
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
 return errors;
};
const mutated=[
 ['wrong_original_frozen_revision',d=>d.packet.frozen_original.revision='arXiv:1006.4908v2'],
 ['wrong_pdf_hash',d=>d.packet.frozen_original.SHA256='bad'],
 ['change_sigma2_entry',d=>d.packet.source_first_groups['L03-S006'].sigma2[0][1]='i'],
 ['flip_source_epsilon',d=>d.packet.source_first_groups['L03-S006'].product='sigma_I sigma_J=delta_IJ 1 - i epsilon_IJ^K sigma_K'],
 ['flip_gamma_vector',d=>d.packet.source_first_groups['L03-S007'].gamma_vectors[0]='gamma1=-i sigma2 tensor sigma1'],
 ['wrong_vector_action',d=>d.packet.source_first_groups['L03-S007'].vector_action_4x4[0][3]='v1+i v2'],
 ['wrong_bivector_order',d=>d.packet.source_first_groups['L03-S007'].bivector_rows[1][1]='-i 1 tensor sigma2'],
 ['wrong_spinL',d=>d.packet.source_first_groups['L03-S008'].left_chiral_matrix[0][1]='w13+i w23+w14-i w24'],
 ['wrong_spinR',d=>d.packet.source_first_groups['L03-S008'].right_chiral_matrix[1][0]='-w13+i w23-w14-i w24'],
 ['erase_right_Hermitian',d=>d.packet.source_first_groups['L03-S008'].chosen_rep_relation='omega_R=omega_L dagger'],
 ['change_pseudoscalar',d=>d.packet.source_first_groups['L03-S009'].pseudoscalar='gamma=+i sigma3 tensor 1'],
 ['move_left_projector',d=>d.packet.source_first_groups['L03-S009'].P_L_chiral_block_diagonal=[0,1]],
 ['swap_original_fermion',d=>{const x=d.packet.source_first_groups['L03-S011'].generation_16C;[x[0],x[1]]=[x[1],x[0]];}],
 ['change_Y_charge',d=>d.packet.source_first_groups['L03-S012'].Y_diagonal_16[4]='-1/3'],
 ['change_electric_charge',d=>d.packet.source_first_groups['L03-S012'].Q_diagonal_16_without_i[5]='-2/3'],
 ['change_Lambda15',d=>d.packet.source_first_groups['L03-S012'].Lambda15='sqrt(2/3) diag(-1,1/3,1/3,1/3)'],
 ['change_Y_prefactor',d=>d.packet.source_first_groups['L03-S012'].hypercharge_prefactor='i'],
 ['change_C32_gauge',d=>d.packet.source_first_groups['L03-S013'].generators.strong8='T_A^g=i Lambda_A tensor 1 tensor 1'],
 ['change_i_realification',d=>d.packet.source_first_groups['L03-S014'].i_real_matrix[1][0]=-1],
 ['invent_new_source_ID',d=>d.packet.source_first_groups['L03-S099']={eq:'novel'}],
 ['fake_global_G0',d=>d.packet.original_source_coverage_boundary.full_L03_original_semantic_cold_complete=true],
 ['forge_other_source_group',d=>d.inv.original_first_locations[0].source_semantic_group+='fake'],
 ['remove_orig_owner',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S006').SSC_ids=[]],
 ['revert_source_exact_status',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S006').disposition=open],
 ['forge_packet_SHA',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S007').original_source_matrix_literal_packet.git_blob_sha='bad'],
 ['erase_SSC_source_body',d=>d.ssc.items.find(x=>x.id==='L-SSC-071').body='summary'],
 ['alter_unrelated_SSC',d=>d.ssc.items.find(x=>x.id==='L-SSC-082').body+=' invented'],
 ['invent_192nd_SSC',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['unfix_L03_exact_count',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=15],
 ['forge_six_G0_freeze',d=>d.reg.exit_acceptance_contract.G0_SSC_frozen=true],
 ['promote_G1',d=>d.gate.current_lawful_state.G1_authorized=true]
];
let rejected=0;const issues=check(D);
for(const [name,fn]of mutated){
 const clone=JSON.parse(JSON.stringify(D));
 try{fn(clone);if(check(clone).length)rejected++;else issues.push('HOSTILE_ESCAPED_'+name);}
 catch(e){issues.push('HOSTILE_EXCEPTION_'+name+':'+String(e));}
}
const sourceErrors=await PDF();issues.push(...sourceErrors);
const out={schema:'isograph.exp062.L.G0.L03.eight-original-section2-matrices.v0.1',
 pass:issues.length===0,issues,official_original_SHA256_verified:sourceErrors.length===0,
 original_visual_source_run:38098981415,source_scoped_exact_formula_matrix_groups_replayed:8,
 remaining_L03_exact_formula_matrix_groups:7,source_first_original_L03_groups:47,
 existing_global_SSC_IDs:191,changed_existing_SSC_ids:editIds,
 unchanged_entire_old_SSC_records:185,other_original_L03_source_groups_conserved:39,
 hostiles_defined:mutated.length,hostiles_rejected:rejected,
 complete_6_original_semantic_cold_reviews:0,G0_complete:false,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(out,null,2));if(issues.length)process.exitCode=1;
