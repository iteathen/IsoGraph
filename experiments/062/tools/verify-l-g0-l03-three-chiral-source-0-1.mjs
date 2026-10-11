// L only: frozen original L03 v1 Eq3.2/Eq4.1/Eq4.2 exact source
// matrix signs, 120 count, 191/350 conservation. G0 remains OPEN.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={src:P+'LISI_L03_ORIGINAL_CL12_4_THREE_CHIRAL_BLOCK_GROUPS_G0_0_1.json',
 oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_8.json',
 inv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_9.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_66.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_67.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_18.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_19.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_35.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_36.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_113.json',gate:E+'L_CURRENT_STAGE_GATE_0_114.json',
 self:E+'tools/verify-l-g0-l03-three-chiral-source-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const SHA=b=>crypto.createHash('sha256').update(b).digest('hex');
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const ids=['L03-S018','L03-S029','L03-S030'],owners=['L-SSC-007','L-SSC-072','L-SSC-080'];
const open='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED';
const exact='EXACT_ORIGINAL_EQ3_2_EQ4_1_EQ4_2_CHIRAL_CLIFFORD_BLOCKS_VISUAL_SOURCE_RECONCILED_GLOBAL_COLD_OPEN';
const find=(a,id,key='id')=>a?.find(x=>x?.[key]===id);
function verify(d){
 const problems=[],t=(v,msg)=>{if(!v)problems.push(msg);};
 const {src:s,oldInv:o,inv:i,oldSSC:os,ssc:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:pg,gate:g}=d;
 const p=s?.original_first_groups||{},a=p['L03-S018']||{},b=p['L03-S029']||{},c=p['L03-S030']||{};
 t(s?.schema==='isograph.track-L.G0.L03-original-Eq3_2-Eq4_1-Eq4_2-Clifford-chiral-extension.v0.1'&&s?.track==='L'&&s?.stage==='G0','L source G0');
 t(s?.original_primary?.revision==='arXiv:1006.4908v1'&&s?.original_primary?.SHA256==='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e'&&s?.original_primary?.pdf_total_pages===14,'exact frozen source');
 t(s?.original_visual_oracle?.run_id===38098981415&&s?.original_visual_oracle?.conclusion==='success','source original SHA-pinned rendered visual');
 t(s?.G0_complete===false&&s?.G0_frozen===false&&s?.G1_authorized===false&&s?.W_semantics_imported===false,'source stage not promoted');
 t(Object.keys(p).join(',')===ids.join(',')&&s?.scope_and_method?.source_exact_original_groups_after_scope===4,'original exact three source groups, remaining four');
 t(a.equation==='3.2'&&a.source_PDF_page_zero_based===6&&JSON.stringify(a.SSC_owners)===JSON.stringify(['L-SSC-007','L-SSC-072']),'original Eq3.2 source scope');
 t(a.Cl11_3_source_bivector==='Gamma_ij=Gamma_i Gamma_j (i<j)'&&JSON.stringify(a.block_diagonal_matrix_128)==='[["GammaPlus_ij","0"],["0","GammaMinus_ij"]]'&&a.independent_bivector_basis_count===91&&a.positive_chiral_block_dimension_real===64&&a.negative_chiral_block_dimension_real===64,'original R128 into 64+64 exact chiral source block');
 const v256=[['i=1..14','GammaPrime_i=sigma1 tensor Gamma_i'],['15','GammaPrime_15=sigma1 tensor Gamma'],['16','GammaPrime_16=-i sigma2 tensor 1']];
 t(b.equation==='4.1'&&b.source_PDF_page_zero_based===9&&b.SSC_owners?.join(',')==='L-SSC-080'&&JSON.stringify(b.sixteen_generator_families)===JSON.stringify(v256)&&b.old_14_Cl11_3_product==='Gamma=Gamma1 Gamma2 ... Gamma14=sigma3 tensor 1','original Eq4.1 sixteen vector source signs and tensor factors');
 t(b.source_real_clifford_dimension===256&&b.Clifford_source_signature?.join(',')==='12,4','real Cl12,4 source scope');
 const f256=[['ij 1<=i<j<=14','GammaPrime_ij=1 tensor Gamma_ij'],['i15 i=1..14','GammaPrime_i15=1 tensor Gamma_i Gamma'],['i16 i=1..14','GammaPrime_i16=sigma3 tensor Gamma_i'],['1516','GammaPrime_1516=sigma3 tensor Gamma']];
 const f128=[['ij','GammaPrimePlus_ij=Gamma_ij','[[GammaPlus_ij,0],[0,GammaMinus_ij]]'],['i15','GammaPrimePlus_i15=Gamma_i Gamma','[[0,-GammaPlus_i],[GammaMinus_i,0]]'],['i16','GammaPrimePlus_i16=Gamma_i','[[0,GammaPlus_i],[GammaMinus_i,0]]'],['1516','GammaPrimePlus_1516=Gamma','[[1,0],[0,-1]]']];
 t(c.equation==='4.2'&&c.source_PDF_page_zero_based===10&&c.SSC_owners?.join(',')==='L-SSC-080','source Eq4.2 original source scope');
 t(JSON.stringify(c.R256_bivector_families)===JSON.stringify(f256)&&JSON.stringify(c.positive_chiral_R128_restriction_families)===JSON.stringify(f128),'source four 256R to 128R signed chiral matrix families');
 const co=c.family_source_counts||{};
 t(co.ij===91&&co.i15===14&&co.i16===14&&co['1516']===1&&co.total===120&&91+14+14+1===16*15/2,'91+14+14+1 source 120 bivectors');
 t(c.Spin12_4_positive_chiral_real_spinor_dimension===128&&c.source_partition_independent_R256_vs_R128===true,'source real carrier partition');
 const mult=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((x,y,k)=>x+y*b[k][j],0)));
 const s1=[[0,1],[1,0]],minusIS2=[[0,-1],[1,0]],s3=[[1,0],[0,-1]];
 t(JSON.stringify(mult(s1,s1))==='[[1,0],[0,1]]'&&JSON.stringify(mult(s1,minusIS2))===JSON.stringify(s3),'Pauli source signs sigma1(-i sigma2)=sigma3');
 t(o?.original_first_locations?.length===47&&i?.original_first_locations?.length===47,'47 previous and current original source groups');
 const changed=[];
 for(let k=0;k<47;k++){const q=o?.original_first_locations?.[k],z=i?.original_first_locations?.[k];t(q?.source_location_id===z?.source_location_id,'original source group identity '+k);if(JSON.stringify(q)!==JSON.stringify(z))changed.push(z?.source_location_id);}
 t(changed.join(',')===ids.join(',')&&s?.scope_and_method?.other_old_source_first_groups_wholly_unchanged===44,'44 untouched original source rows');
 for(const id of ids){
  const q=find(o.original_first_locations,id,'source_location_id'),z=find(i.original_first_locations,id,'source_location_id');
  t(q?.disposition===open&&z?.disposition===exact&&z?.original_Cl12_4_chiral_visual_source_packet?.git_blob_sha===H.src,'source exact status and packet SHA '+id);
  t(JSON.stringify(z?.SSC_ids)===JSON.stringify(p[id]?.SSC_owners),'source/SSC membership '+id);
 }
 t(i?.counts?.by_disposition?.[open]===4&&i?.counts?.by_disposition?.[exact]===3&&Object.values(i?.counts?.by_disposition||{}).reduce((x,y)=>x+y,0)===47,'remaining G0 source exact groups 4');
 t(os?.items?.length===191&&n?.items?.length===191&&n?.schema==='woit-lisi.track-l.source-semantic-census.v0.67','191 source census identities');
 const changedSSC=[];
 for(let k=0;k<191;k++){const q=os?.items?.[k],z=n?.items?.[k];t(q?.id===z?.id,'historical SSC identity '+k);if(JSON.stringify(q)!==JSON.stringify(z))changedSSC.push(z?.id);}
 t(changedSSC.join(',')===owners.join(',')&&new Set(n.items.map(z=>z.id)).size===191,'188 unchanged whole source records');
 for(const id of owners){
  const q=find(os.items,id),z=find(n.items,id);
  t(z?.body?.startsWith(q?.body)&&z.body.length>q.body.length,'original source to SSC body semantics '+id);
  const ev=z?.source_expression_census?.L03_SOURCE_ORIGINAL_CL12_4_EQ32_EQ41_EQ42_0_1;
  t(ev?.packet?.git_blob_sha===H.src&&ev?.inverse?.git_blob_sha===H.inv&&ev?.global_cold_complete===false,'SSC exact source proof pointer '+id);
 }
 t(n?.predecessor?.git_blob_sha===H.oldSSC&&n?.revision?.source_packet?.git_blob_sha===H.src&&n?.revision?.source_first_inverse?.git_blob_sha===H.inv&&n?.guards?.source_census_freeze_complete===false,'SSC original history and G0 guard');
 t(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.18'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.19'&&r?.source_first_predecessor?.git_blob_sha===H.oldReg,'six source first register ancestor');
 t(r?.current_ssc?.git_blob_sha===H.ssc&&r?.L03_original_Cl12_4_chiral_source_exact?.git_blob_sha===H.src&&r?.per_source?.length===6&&r?.per_source?.reduce((x,y)=>x+y.source_first_location_units,0)===350,'all six frozen source group conservation');
 t(r?.per_source?.find(z=>z.source==='L03')?.original_exact_cell_expression_groups_not_yet_independently_verified===4&&r?.per_source?.every(z=>z.original_complete_cold_review_passed===false),'four original L03 matrix groups remain, 0/6 full cold');
 t(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false&&r?.exit_acceptance_contract?.G1_authorized===false,'no false source G0 freeze');
 t(pt?.schema==='lisi.full-treatment.source-traversal-ledger.v0.35'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.36'&&v?.predecessor_exact?.git_blob_sha===H.oldTr,'traversal lineage');
 t(v?.current_census?.git_blob_sha===H.ssc&&v?.current_L03_source_first_inventory?.git_blob_sha===H.inv&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg&&v?.sources?.find(z=>z.id==='L03')?.current_exact_formula_groups_unverified===4,'original traversal current unchanged sources');
 t(pg?.schema==='isograph.exp062-l-current-stage-gate.v0.113'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.114'&&g?.predecessor_gate?.git_blob_sha===H.oldGate,'stage gate lineage');
 t(g?.current_source_census?.git_blob_sha===H.ssc&&g?.current_L03_inventory?.git_blob_sha===H.inv&&g?.current_convergence?.git_blob_sha===H.reg&&g?.current_traversal?.git_blob_sha===H.tr&&g?.original_matrix_packet?.git_blob_sha===H.src&&g?.source_verifier?.git_blob_sha===H.self,'stage current source exact original pointers');
 t(g?.previous_L03_section2_eight_CI?.run_id===38099542045&&g?.previous_L03_section2_eight_CI?.conclusion==='success'&&g?.previous_L03_section2_eight_CI?.hostiles_rejected===31,'source previous CI preserved');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'not prequalified G0/G1 or merge');
 return problems;
}
async function originalPDF(){
 const errors=[],dir=fs.mkdtempSync(path.join(os.tmpdir(),'L03-3-clifford-G0-'));
 try{
  const r=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(40000)});
  if(r.status!==200)throw Error('SOURCE_HTTP_'+r.status);
  const b=Buffer.from(await r.arrayBuffer());if(SHA(b)!=='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e')throw Error('FROZEN_SOURCE_SHA256');
  const f=path.join(dir,'source.pdf');fs.writeFileSync(f,b);
  if(!/^Pages:\s*14$/m.test(execFileSync('pdfinfo',[f],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_14_PAGES');
  for(const [page,label]of [[6,'3.2'],[9,'4.1'],[10,'4.2']]){
   const txt=execFileSync('pdftotext',['-f',String(page+1),'-l',String(page+1),'-layout','-enc','UTF-8',f,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1200000});
   const q=D.src.original_primary.source_pages_exact_original['original_pdf_page_zero_based_'+page];
   if(SHA(Buffer.from(txt))!==q?.original_pdftotext_layout_page_SHA256)errors.push('SOURCE_ORIGINAL_PAGE_HASH_'+page);
   if(!txt.includes('('+label+')'))errors.push('SOURCE_ORIGINAL_EQ_LABEL_'+label);
  }
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
 return errors;
}
const muts=[
 ['wrong_original_revision',d=>d.src.original_primary.revision='v2'],
 ['wrong_source_SHA',d=>d.src.original_primary.SHA256='wrong'],
 ['drop_source_group',d=>delete d.src.original_first_groups['L03-S030']],
 ['flip_original_3_2',d=>d.src.original_first_groups['L03-S018'].block_diagonal_matrix_128[0]=['GammaMinus_ij','0']],
 ['wrong_91',d=>d.src.original_first_groups['L03-S018'].independent_bivector_basis_count=90],
 ['wrong_256_gamma16_sign',d=>d.src.original_first_groups['L03-S029'].sixteen_generator_families[2][1]='GammaPrime_16=+i sigma2 tensor 1'],
 ['wrong_14_chirality',d=>d.src.original_first_groups['L03-S029'].old_14_Cl11_3_product='Gamma=1'],
 ['wrong_128_carrier',d=>d.src.original_first_groups['L03-S030'].Spin12_4_positive_chiral_real_spinor_dimension=256],
 ['flip_128_i15',d=>d.src.original_first_groups['L03-S030'].positive_chiral_R128_restriction_families[1][2]='[[0,+GammaPlus_i],[GammaMinus_i,0]]'],
 ['flip_128_i16',d=>d.src.original_first_groups['L03-S030'].positive_chiral_R128_restriction_families[2][2]='[[0,-GammaPlus_i],[GammaMinus_i,0]]'],
 ['wrong_1516',d=>d.src.original_first_groups['L03-S030'].R256_bivector_families[3][1]='GammaPrime_1516=1 tensor Gamma'],
 ['wrong_source_count',d=>d.src.original_first_groups['L03-S030'].family_source_counts.ij=90],
 ['invent_global_G0',d=>d.src.G0_complete=true],
 ['alter_unaffected_source',d=>d.inv.original_first_locations[0].source_semantic_group+=' forged'],
 ['revert_exact_status',d=>find(d.inv.original_first_locations,'L03-S018','source_location_id').disposition=open],
 ['erase_source_packet',d=>find(d.inv.original_first_locations,'L03-S029','source_location_id').original_Cl12_4_chiral_visual_source_packet.git_blob_sha='bad'],
 ['erase_source_SSC_owner',d=>find(d.inv.original_first_locations,'L03-S030','source_location_id').SSC_ids=[]],
 ['rewrite_old_SSC',d=>find(d.ssc.items,'L-SSC-071').body+=' source forged'],
 ['erase_exact_new_SSC',d=>find(d.ssc.items,'L-SSC-080').body='anonymous'],
 ['invent_new_SSC_root',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['fake_L03_closed',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['fake_G0_frozen',d=>d.reg.exit_acceptance_contract.G0_SSC_frozen=true],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['rewrite_predecessor_CI',d=>d.gate.previous_L03_section2_eight_CI.conclusion='failure']
];
const errors=verify(D);let rejected=0;
for(const [name,fn]of muts){const d=JSON.parse(JSON.stringify(D));try{fn(d);if(verify(d).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name)}catch(e){errors.push('HOSTILE_THROW_'+name+':'+String(e));}}
errors.push(...await originalPDF());
const result={schema:'isograph.exp062.L.G0.L03.original-3-chiral-blocks.v0.1',pass:errors.length===0,issues:errors,
 frozen_original_SHA256_verified:true,original_source_eqs:['3.2','4.1','4.2'],
 original_source_groups_reconstructed:3,remaining_L03_formula_groups:4,SSC_changed_existing:['L-SSC-007','L-SSC-072','L-SSC-080'],
 SSC_other_whole_records_unchanged:188,original_L03_source_rows_unchanged:44,original_source_group_count:47,
 total_frozen_L_source_units:6,total_existing_SSC_IDs:191,whole_source_cold_passes:0,
 hostiles_defined:muts.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
