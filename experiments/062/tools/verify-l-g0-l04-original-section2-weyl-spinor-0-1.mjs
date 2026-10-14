// L-only G0 frozen original arXiv:2407.02497v2 §2 source matrix fidelity.
// Checks actual official PDF SHA256 and printed page/block locations; preserves
// paired Clifford/Weyl operator signs and 191 older SSC identities. Matrix
// algebra is a transcription check, NOT physical theory/author theorem proof.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_SECTION2_WEYL_GAMMA_VECTOR_AND_EQ2_1_SOURCE_G0_0_1.json',
 original:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_69.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_70.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_22.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_23.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_39.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_40.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_123.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_124.json',
 self:E+'tools/verify-l-g0-l04-original-section2-weyl-spinor-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const h=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const exactSHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const ids=['L04-S008','L04-S010','L04-S011'],changedItems=['L-SSC-098','L-SSC-099'];
const sourceDisposed='SCOPED_ORIGINAL_WEYL_VECTOR_EQ2_1_SIGNED_SOURCE_VISUAL_RECONCILED_WHOLE_COLD_OPEN';
function check(z,pages){
 const issues=[],t=(v,msg)=>{if(!v)issues.push(msg);};
 const {packet:s,original:m,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 t(s?.schema==='isograph.track-L.G0.L04-frozen-original-section2-Weyl-and-spinor-exact-source.v0.1'&&s.track==='L'&&s.stage==='G0','scoped G0 original source only');
 t(s?.frozen_source?.revision==='arXiv:2407.02497v2'&&s?.frozen_source?.SHA256===exactSHA&&s?.frozen_source?.pages===17,'exact frozen original v2 revision');
 t(s?.frozen_source?.original_source_visual_CI?.run_id===38117058546&&s?.frozen_source?.original_source_visual_CI?.conclusion==='success'&&JSON.stringify(s?.frozen_source?.original_source_visual_CI?.source_rendered_original_pages)==='[4,5]','visually inspected source pages p4,p5 exact CI');
 t(s?.source_claims?.length===3&&JSON.stringify(s.source_claims.map(x=>x.original_group))===JSON.stringify(ids),'source 3 named original semantic obligations');
 t(s?.conservation?.old_L04_source_groups===53&&s?.conservation?.new_source_group_exact_pending_after_scoped_pass===12&&s?.conservation?.unchanged_original_L04_groups===50&&s?.conservation?.unchanged_complete_SSC_records===189&&s?.conservation?.typed_items_added===0,'exact finite source and item conservation');
 t(s?.stage_locks?.G0_frozen===false&&s?.stage_locks?.G1_authorized===false&&s?.stage_locks?.source_whole_L04_cold_complete===false&&s?.stage_locks?.W_semantics_imported===false,'source/authority scope not promoted');
 const c8=s?.source_claims?.[0]||{},c10=s?.source_claims?.[1]||{},c11=s?.source_claims?.[2]||{};
 const expected8=[
 'gamma_0 = sigma_1 tensor sigma_0',
 'gamma_pi = -i sigma_2 tensor sigma_pi (pi=1,2,3)',
 'J_pi = (1/4) epsilon_{pi rho sigma} gamma_{rho sigma} = -(i/2) sigma_0 tensor sigma_pi',
 'K_pi = (1/2) gamma_{0 pi} = (1/2) sigma_3 tensor sigma_pi',
 '[J_pi,J_rho] = epsilon_{pi rho sigma} J_sigma',
 '[J_pi,K_rho] = epsilon_{pi rho sigma} K_sigma',
 '[K_pi,K_rho] = -epsilon_{pi rho sigma} J_sigma'
 ];
 t(JSON.stringify(c8?.source_formula)===JSON.stringify(expected8)&&c8?.current_SSC_owner_ID==='L-SSC-098','original Weyl gamma Clifford J/K and Lorentz brackets exact signed carrier');
 t(c10?.source_formula?.length===5&&c10.source_formula[1]?.includes('(1/4) B^{mu nu}')&&c10.source_formula[1]?.includes('(1/2) B^{mu nu} v_nu gamma_mu')&&c10.source_formula[3]?.includes('K_3 cross v_S=0')&&c10.source_formula[4]?.includes('K_3 cross v_T'),'vector action source coefficients/indices and distinct spin/boost eigenvectors');
 t(c10?.source_scope?.includes('COUPLED ordered alternatives')&&c10?.current_SSC_owner_ID==='L-SSC-099','coupled sign variant source not independent choices');
 t(c11?.source_formula?.length===5&&c11.source_formula[1]?.includes('J_3=-(i/2)')&&c11.source_formula[2]?.includes('(-/+ 1/2)Psi_L')&&c11.source_formula[3]?.includes('(+/- 1/2)Psi_R')&&c11.source_formula[4]?.includes('Psi_L^wedge=Q_1')&&c11.source_formula[4]?.includes('Psi_R^vee=Q_4'),'original Eq2.1 chiral Q1 Q2 Q3 Q4 and opposite left-right boost signs');
 t(c11?.source_pair_sign_coupling?.includes('Upper/lower sign order preserved')&&c11?.current_SSC_owner_ID==='L-SSC-099','source spinor chiral index/binder coupling');
 t(m?.original_sources?.[3]?.revision==='arXiv:2407.02497v2'&&m?.original_sources?.[3]?.PDF_SHA256===exactSHA,'same frozen 167-page source manifest original v2');
 const first=m.original_sources[3];
 for(const [id,record]of Object.entries(s?.original_source_block_SHA256||{})){
  const atom=first.original_pdf_extracted_pages?.[record?.page_zero_based]?.blocks?.find(x=>x.source_atom_id===id);
  t(!!atom&&atom.original_extracted_line_start===record?.first_line&&atom.original_extracted_line_end===record?.last_line&&atom.original_source_block_SHA256===record?.original_text_block_SHA256,'independent original source block hash and locator '+id);
  const page=pages?.[record?.page_zero_based],lines=page?.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  if(lines&&atom&&atom.original_extracted_line_end<=lines.length){
   const text=lines.slice(atom.original_extracted_line_start-1,atom.original_extracted_line_end).join('\n');
   t(sha(Buffer.from(text))===record?.original_text_block_SHA256,'ACTUAL original PDF math block hash '+id);
  }else t(false,'unavailable original source PDF/block '+id);
 }
 t(Object.keys(s?.original_source_block_SHA256||{}).length===7,'seven independent page 4-5 original cell block identities');
 t(oi?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'full source-first/SSC identities conserved');
 const revisions=[];
 for(let k=0;k<53;k++){
  const prior=oi?.locations?.[k],cur=i?.locations?.[k];
  t(prior?.id===cur?.id,'source group ID '+k);
  if(JSON.stringify(prior)!==JSON.stringify(cur))revisions.push(cur?.id);
 }
 t(JSON.stringify(revisions)===JSON.stringify(ids),'50 whole original-first group bodies untouched');
 for(const id of ids){const row=i?.locations?.find(x=>x.id===id);t(row?.original_Clifford_and_Eq2_1_source_evidence?.git_blob_sha===h.packet&&row?.original_Clifford_and_Eq2_1_source_evidence?.whole_L04_source_semantic_cold_complete===false,'in-source evidence and cold lock '+id);}
 for(const id of ['L04-S008','L04-S011'])t(i?.locations?.find(x=>x.id===id)?.disposition===sourceDisposed,'only eligible original formula group status qualified '+id);
 t(i?.locations?.find(x=>x.id==='L04-S009')?.disposition==='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED','do not close separate root/Cartan source definition');
 t(i?.counts?.by_disposition?.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===12&&i?.counts?.by_disposition?.[sourceDisposed]===2&&i?.counts?.remaining_exact_source_groups===12,'14 to 12 source group debt legitimately scoped');
 const diffs=[];
 for(let k=0;k<191;k++){
  const a=o?.items?.[k],b=n?.items?.[k];t(a?.id===b?.id,'unchanged typed ID at '+k);if(JSON.stringify(a)!==JSON.stringify(b))diffs.push(b?.id);
 }
 t(JSON.stringify(diffs)===JSON.stringify(changedItems),'189 entire other SSC records conserved; no invented IDs');
 const b98=n?.items?.find(x=>x.id==='L-SSC-098')?.body||'',b99=n?.items?.find(x=>x.id==='L-SSC-099')?.body||'';
 for(const bit of ['gamma_0=sigma_1⊗sigma_0','gamma_pi=−i sigma_2⊗sigma_pi','K_pi=(1/2)gamma_0 pi','[K_pi,K_rho]=−epsilon_pi rho sigma J_sigma'])t(b98.includes(bit),'source matrix coefficient and sign SSC098 '+bit);
 for(const bit of ['(1/4)B^{mu nu}v^rho','Psi_L^wedge=Q1','Psi_R^vee=Q4','K3 Psi_L^{vee/wedge}=(∓1/2)','K3 Psi_R^{vee/wedge}=(±1/2)'])t(b99.includes(bit),'source action/index/carrier in SSC099 '+bit);
 for(const id of changedItems){const rec=n?.items?.find(x=>x.id===id)?.source_expression_census?.L04_ORIGINAL_WEYL_VECTOR_AND_EQ2_1_SIGNED_VISUAL_0_1;t(rec?.source_packet?.git_blob_sha===h.packet&&rec?.source_first_inverse?.git_blob_sha===h.inv&&rec?.whole_source_COLD_complete===false,'exact in-record source pointer '+id);}
 t(n?.predecessor?.git_blob_sha===h.oldSSC&&n?.revision?.source_packet?.git_blob_sha===h.packet&&n?.revision?.source_first_inverse?.git_blob_sha===h.inv&&n?.guards?.source_census_freeze_complete===false,'SSC source ancestry and G0 open');
 t(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.22'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.23'&&r?.source_first_predecessor?.git_blob_sha===h.oldReg,'convergence source authority predecessor');
 t(r?.current_ssc?.git_blob_sha===h.SSC&&r?.L04_section2_original_Weyl_and_Eq2_1_source_packet?.git_blob_sha===h.packet&&r?.per_source?.length===6&&r?.per_source?.reduce((q,x)=>q+x.source_first_location_units,0)===350,'six source denominator and newest exact source packet');
 t(r?.per_source?.find(x=>x.source==='L04')?.original_exact_cell_expression_groups_not_yet_independently_verified===12&&r?.per_source?.every(x=>x.original_complete_cold_review_passed===false),'global G0 source debt still retained');
 t(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false&&r?.explicit_locks?.G1_authorized===false,'global exit contract remains open');
 t(pt?.schema==='lisi.full-treatment.source-traversal-ledger.v0.39'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.40'&&v?.predecessor_exact?.git_blob_sha===h.oldTr,'source traversal exact predecessor');
 t(v?.current_census?.git_blob_sha===h.SSC&&v?.current_L04_source_first_inventory?.git_blob_sha===h.inv&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===h.reg&&v?.complete_sources===0,'L source traversal still G0');
 t(og?.schema==='isograph.exp062-l-current-stage-gate.v0.123'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.124'&&g?.predecessor_gate?.git_blob_sha===h.oldGate,'current stage gate lineage');
 t(g?.current_source_census?.git_blob_sha===h.SSC&&g?.source_original_packet?.git_blob_sha===h.packet&&g?.source_original_verifier?.git_blob_sha===h.self&&g?.current_convergence?.git_blob_sha===h.reg&&g?.current_traversal?.git_blob_sha===h.tr,'stage exact source binding and tested checker');
 t(g?.source_visual_CI?.run_id===38117058546&&g?.source_visual_CI?.conclusion==='success'&&g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS','CI source proof and no preclaimed new success');
 t(g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'stage and merge no authority');
 return issues;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-visual-Eq21-G0-'));const pages=[];
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('HISTORICAL_L04_SOURCE_HTTP_'+response.status);
 const b=Buffer.from(await response.arrayBuffer());if(sha(b)!==exactSHA)throw Error('HISTORICAL_L04_OFFICIAL_V2_NOT_FROZEN');
 const p=path.join(dir,'original.pdf');fs.writeFileSync(p,b);
 const info=execFileSync('pdfinfo',[p],{encoding:'utf8',timeout:12000});if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_L04_ORIGINAL_17_PAGES');
 for(const q of [4,5])pages[q-1]=execFileSync('pdftotext',['-f',String(q),'-l',String(q),'-layout','-enc','UTF-8',p,'-'],{encoding:'utf8',timeout:14000,maxBuffer:1600000});
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=check(D,pages),hostiles=[
 ['switch_source_revision',d=>d.packet.frozen_source.revision='arXiv:2407.02497v1'],
 ['alter_gamma_pi_minus',d=>d.packet.source_claims[0].source_formula[1]='gamma_pi=+i sigma2'],
 ['alter_J_complex_factor',d=>d.packet.source_claims[0].source_formula[2]=d.packet.source_claims[0].source_formula[2].replace('-(i/2)','+(i/2)')],
 ['alter_K_half_factor',d=>d.packet.source_claims[0].source_formula[3]=d.packet.source_claims[0].source_formula[3].replace('(1/2)','(1/4)')],
 ['alter_Lorentz_boost_sign',d=>d.packet.source_claims[0].source_formula[6]='[K_pi,K_rho]=+epsilon J'],
 ['erase_vector_action',d=>d.packet.source_claims[1].source_formula[1]='unknown'],
 ['swap_vector_spin',d=>d.packet.source_claims[1].source_formula[3]=d.packet.source_claims[1].source_formula[3].replace('K_3 cross v_S=0','K_3 cross v_S=1')],
 ['reverse_left_K_chirality',d=>d.packet.source_claims[2].source_formula[2]=d.packet.source_claims[2].source_formula[2].replace('(-/+ 1/2)','(+/- 1/2)')],
 ['reverse_Q_component',d=>d.packet.source_claims[2].source_formula[4]=d.packet.source_claims[2].source_formula[4].replace('Psi_R^vee=Q_4','Psi_R^vee=Q_3')],
 ['invent_original_matrix',d=>d.packet.source_claims.push({...d.packet.source_claims[0],original_group:'L04-S099'})],
 ['source_binder_missing',d=>d.packet.original_source_block_SHA256['L04-P004-B003'].original_text_block_SHA256='bad'],
 ['source_group_rename',d=>d.inv.locations.find(x=>x.id==='L04-S008').id='L04-S099'],
 ['reopen_selected_original_exact',d=>d.inv.counts.remaining_exact_source_groups=14],
 ['forge_separate_root_family_complete',d=>d.inv.locations.find(x=>x.id==='L04-S009').disposition=sourceDisposed],
 ['alter_unchanged_source_group',d=>d.inv.locations[0].original_source_semantic_group+='forged'],
 ['remove_SSC_source_root',d=>d.SSC.items.find(x=>x.id==='L-SSC-098').body='opaque'],
 ['rewrite_unmodified_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-101').body+='forged'],
 ['duplicate_typed_ID',d=>d.SSC.items.push({...d.SSC.items[0],id:'L-SSC-192'})],
 ['fake_original_CI',d=>d.packet.frozen_source.original_source_visual_CI.conclusion='failure'],
 ['forge_G0_packet',d=>d.packet.stage_locks.G0_frozen=true],
 ['forge_current_global_G0',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['erase_prior_L01_debt',d=>d.reg.per_source.find(x=>x.source==='L01').original_complete_cold_review_passed=true],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['forge_CI_PASS',d=>d.gate.new_source_CI.status='SUCCESS']
];
let rejected=0;for(const [name,edit] of hostiles){const d=JSON.parse(JSON.stringify(D));try{edit(d);if(check(d,pages).length)rejected++;else issues.push('HOSTILE_ESCAPED_'+name)}catch(e){issues.push('HOSTILE_CHECKER_EXCEPTION_'+name+':'+String(e));}}
const result={schema:'isograph.exp062.L.G0.L04.original-section2-Weyl-chiral.v0.1',
 pass:issues.length===0,issues,source_original_revision:'arXiv:2407.02497v2',original_PDF_SHA256_verified:true,
 original_visual_pages:[4,5],source_Clifford_Lorentz_group_reconciled:'L04-S008',source_Vector_source_enhanced:'L04-S010',source_spinor_group_reconciled:'L04-S011',
 SSC_roots_modified:changedItems,other_SSC_whole_records_conserved:189,
 original_source_first_other_groups_conserved:50,selected_L04_exact_groups_before:14,after:12,
 whole_original_L04_cold_complete:false,all_six_original_cold_complete_sources:0,
 hostiles_defined:hostiles.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(issues.length)process.exitCode=1;
