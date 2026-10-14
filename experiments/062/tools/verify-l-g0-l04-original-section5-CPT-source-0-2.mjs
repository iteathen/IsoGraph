// L-only IsoGraph G0 original L04 section5 source-first C/P/T Eq(5.1-5.3).
// Frozen original 2407.02497v2 PDF p10, all 13 blocks plus high-res crop SHA.
// This checker catches an actual incomplete SSC source extraction masked
// by MAPPED_MEANING; never treats zero preselected formula groups as G0 closure.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_SECTION5_C_P_T_QFT_SIGNED_SOURCE_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_13.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_14.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_80.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_81.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_34.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_35.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_51.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_52.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_146.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_147.json',
 self:E+'tools/verify-l-g0-l04-original-section5-CPT-source-0-2.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const B=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,gitsha(v)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,v])=>[k,read(v)]));
const originalSHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const originalPage='9d80a4f7a3be259431d0c84a33f911d7d9c6e4133cfebb8e764c364b1bacf09c';
const originalImage='288f4ffff3f69a86024e4aaab8d45fd1c2b85e9c4de61c85f916ca23c21bb54d';
const oldMapped='MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS';
const groupCases=[
 ['L04-S021','L-SSC-104','C','SCOPED_ORIGINAL_SECTION5_C_UNITARY_FOCK_SOURCE_EQ5_1_NO_PHASE_RECONCILED_WHOLE_COLD_OPEN',[
 ['generic_QFT_conjugation','Psi_hat^g(x) = o_hat(g) Psi_hat(x) o_hat^-(g) = o(g) Psi_hat(x\\u0027_g(x))'],
 ['source_C_spinor','Psi^C=i gamma_2 (Psi)^*'],
 ['source_C_QFT','Psi_hat^C = C_hat Psi_hat C_hat^-'],
 ['Eq5.1_a','(a_hat_p^{wedge/vee})^C = b_hat_p^{wedge/vee}'],
 ['Eq5.1_bdagger','(b_hat_p^{wedge/vee dagger})^C = a_hat_p^{wedge/vee dagger}']
 ]],
 ['L04-S022','L-SSC-105','P','SCOPED_ORIGINAL_SECTION5_P_OPPOSITE_I_PHASE_EQ5_2_SOURCE_RECONCILED_WHOLE_COLD_OPEN',[
 ['source_P_spinor','Psi^P=i gamma_0 Psi(t,-x)'],
 ['source_P_gamma_guards','i gamma_0 u_{-p}^{wedge/vee}=+i u_p^{wedge/vee}; i gamma_0 v_{-p}^{wedge/vee}=-i v_p^{wedge/vee}'],
 ['Eq5.2_a','(a_hat_p^{wedge/vee})^P=-i a_hat_{-p}^{wedge/vee}'],
 ['Eq5.2_bdagger','(b_hat_p^{wedge/vee dagger})^P=+i b_hat_{-p}^{wedge/vee dagger}']
 ]],
 ['L04-S023','L-SSC-106','T','SCOPED_ORIGINAL_SECTION5_T_ANTIUNITARY_FOCK_PAIRED_SIGN_EQ5_3_SOURCE_RECONCILED_WHOLE_COLD_OPEN',[
 ['source_T_spinor','Psi^T=gamma_13 Psi(-t,x)'],
 ['source_T_Fock','Psi_hat^T=T_hat\\u0027 Psi_hat T_hat\\u0027^-'],
 ['source_T_spinor_identity','gamma_13 u_{-p}^{wedge/vee}=(-/+) (u_p^{vee/wedge})^*; gamma_13 v_{-p}^{wedge/vee}=(-/+) (v_p^{vee/wedge})^*'],
 ['Eq5.3_a','(a_hat_p^{wedge/vee})^T=(-/+) a_hat_{-p}^{vee/wedge}'],
 ['Eq5.3_bdagger','(b_hat_p^{wedge/vee dagger})^T=(-/+) b_hat_{-p}^{vee/wedge dagger}']
 ]]
];
const note='These exact SOURCE assertions are not an independent proof of physical unification or universal CPT invariance';
function verify(z,page,render){
 const issues=[],ck=(v,s)=>{if(!v)issues.push(s)};
 const {packet:s,manifest:m,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 ck(s?.schema==='isograph.track-L.G0.L04-original-section5-CPT-QFT-operator-exact-source.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'source-only L G0 packet');
 ck(s?.frozen_original?.id==='L04'&&s.frozen_original.revision==='arXiv:2407.02497v2'&&s.frozen_original.PDF_SHA256===originalSHA&&s.frozen_original.PDF_bytes===348134&&s.frozen_original.pages===17&&s.frozen_original.printed_page===10&&s.frozen_original.source_page_SHA256===originalPage&&s.frozen_original.original_manifest.git_blob_sha===B.manifest,'historical L04 source version, exact PDF SHA, p10 block SHA and original manifest');
 const src=m?.original_sources?.[3],pg=src?.original_pdf_extracted_pages?.[9];
 ck(src?.id==='L04'&&src.revision==='arXiv:2407.02497v2'&&src.PDF_SHA256===originalSHA&&src.PDF_byte_count===348134&&src.original_pdf_extracted_pages.length===17,'frozen original all-six primary PDF scope');
 ck(sha(Buffer.from(page))===originalPage&&pg?.original_extracted_page_SHA256===originalPage&&pg.blocks?.length===13,'independently re-extract original complete p10 SHA and 13 block denominator');
 const lines=page.replaceAll('\r','').replace(/\f+$/g,'').split('\n'),actual=[];
 for(const block of pg?.blocks||[]){const raw=lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n');ck(sha(Buffer.from(raw))===block.original_source_block_SHA256,'source original 13 text block SHA '+block.source_atom_id);actual.push(block);}
 ck(eq(actual.map(x=>x.source_atom_id),Array.from({length:13},(_,k)=>'L04-P010-B'+String(k+1).padStart(3,'0'))),'original source-first 13 p10 blocks including nonload page furniture');
 ck(s?.independent_original_visual?.high_resolution_source_primary_CI?.run_id===38164906805&&s.independent_original_visual.high_resolution_source_primary_CI.head_sha==='85f0e2800fe7f36184737e8b6c46b15f3e5206dd'&&s.independent_original_visual.high_resolution_source_primary_CI.render_dpi===360&&eq(s.independent_original_visual.high_resolution_source_primary_CI.crop_xywh,[280,820,2600,2650])&&s.independent_original_visual.high_resolution_source_primary_CI.original_crop_SHA256===originalImage&&s.independent_original_visual.high_resolution_source_primary_CI.image_bytes===575949,'independent original exact high-res PDF visual historical CI provenance');
 ck(sha(render)===originalImage&&render.length===575949,'ACTUAL independent source p10 visual crop SHA');
 const part=s?.original_source_independent_completeness_partition;
 ck(part?.original_page_atoms_total===13&&part.source_claim_atoms===12&&part.source_C_atoms===6&&part.source_P_atoms===3&&part.source_T_atoms===3&&part.nonload_source_folio?.id==='L04-P010-B013'&&part.nonload_source_folio.sha256===pg?.blocks?.[12]?.original_source_block_SHA256&&part.nonload_source_folio.existing_original_source_unit==='L04-S053','source atom and excluded nonload page furniture dispositions');
 ck(s?.original_equation_scopes?.length===3&&eq(s.original_equation_scopes.map(x=>x.id),['L04-S021','L04-S022','L04-S023']),'three pre-existing source-first formula groups, no new IDs');
 for(const [id,sid,family,disposition,expected]of groupCases){
  const row=s.original_equation_scopes.find(x=>x.id===id);
  ck(row?.existing_SSC_owner===sid&&row.source_operator_family===family&&row.original_chosen_source_semantics?.length===expected.length,'source original C/P/T domain scopes and five/four/five formulas '+id);
  const min=family==='C'?1:family==='P'?7:10,max=family==='C'?6:family==='P'?9:12;
  ck(eq(row?.source_blocks?.map(x=>[x.id,x.sha256]),actual.slice(min-1,max).map(x=>[x.source_atom_id,x.original_source_block_SHA256])),'specific original source block→SSC owner visual+layout index '+id);
  for(let k=0;k<expected.length;k++){
   const f=row?.original_chosen_source_semantics?.[k],want=expected[k];
   // apostrophe escape is only a static code-literal safe way to write the printed x'_g and T' source roles
   const normalized=x=>typeof x==='string'?x.replaceAll('\\u0027',"'"):x;
   ck(f?.role===want[0]&&normalized(f?.printed)===normalized(want[1]),'original operator signed formula and binder '+id+'/'+want[0]);
  }
  ck(row?.negative_scope?.length>40,'source-specific negative inference and scope '+id);
 }
 const C=s?.original_equation_scopes?.[0],P0=s?.original_equation_scopes?.[1],T=s?.original_equation_scopes?.[2];
 ck(C?.original_chosen_source_semantics?.[1]?.source_modality?.includes('ANTIUNITARY')&&C?.original_chosen_source_semantics?.[2]?.source_modality?.includes('UNITARY')&&P0?.original_chosen_source_semantics?.[1]?.source_modality?.includes('opposite i phases')&&T?.original_chosen_source_semantics?.[0]?.source_modality?.includes('UNITARY')&&T?.original_chosen_source_semantics?.[1]?.source_modality?.includes('ANTIUNITARY'),'different source finite-spinor/Fock unitary, antiunitary and sign layers');
 ck(T?.original_chosen_source_semantics?.[3]?.source_modality?.toLowerCase().includes('paired')&&T?.original_chosen_source_semantics?.[4]?.source_modality?.includes('creation dagger')&&P0?.original_chosen_source_semantics?.[2]?.source_modality?.includes('does not swap'),'opposite P phases and coupled T spinor source superscripts');
 ck(s?.reopening_mechanism_and_systematic_method?.class==='SOURCE_FIRST_ORIGINAL_OPERATOR_PHASE_AND_ANTIUNITARY_LAYER_UNDERINDEX_HIDDEN_BEHIND_MAPPED_NARRATIVE_DISPOSITION'&&s.reopening_mechanism_and_systematic_method.prior_false_completeness.includes('selected FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED count reached zero'),'source-first method corrects preselected selected formula blindness');
 ck(s?.conservation?.original_all_source_groups===350&&s.conservation.L04_source_groups===53&&s.conservation.current_L_SSC_identities===191&&eq(s.conservation.changed_original_L04_source_groups,['L04-S021','L04-S022','L04-S023'])&&s.conservation.unchanged_other_L04_source_groups===50&&eq(s.conservation.changed_existing_SSC_ids,['L-SSC-104','L-SSC-105','L-SSC-106'])&&s.conservation.unchanged_whole_existing_SSC_records===188&&s.conservation.new_typed_SSC_ids===0&&s.conservation.new_mapped_not_global_source_groups===24,'explicit predecessor whole source 53 and SSC191 conservation no scope reduction');
 ck(s?.locks?.G0_open===true&&s.locks.G0_frozen===false&&s.locks.G1_authorized===false&&s.locks.whole_L04_original_source_semantic_cold_complete===false&&s.locks.physical_theory_proof_required_at_G0===false&&s.locks.W_math_imported===false&&s.locks.PR70_merge_authorized===false,'physical theorem and independent G0 locks');
 ck(oi?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'finite source/SSC unchanged denominator');
 const changedGroups=[],oldMappedCounts={},censusIds=new Set();
 for(let k=0;k<53;k++){
  const x=oi?.locations?.[k],y=i?.locations?.[k];if(!x||!y){ck(false,'missing original L04 source group '+k);continue;}
  ck(x.id===y.id,'unchanged source semantic group ID '+k);if(!eq(x,y))changedGroups.push(y.id);
  oldMappedCounts[y.disposition]=(oldMappedCounts[y.disposition]||0)+1;
  for(const sid of y.ssc_ids||[])censusIds.add(sid);
 }
 ck(eq(changedGroups,['L04-S021','L04-S022','L04-S023'])&&oldMappedCounts[oldMapped]===24,'three existing source group bodies corrected and 50 others entirely preserved');
 ck(Object.keys(oldMappedCounts).length===Object.keys(i?.counts?.by_disposition||{}).length&&Object.entries(oldMappedCounts).every(([key,n])=>i.counts.by_disposition[key]===n)&&i.counts.remaining_exact_source_groups===0,'source-first derived disposition count, selected exact zero NOT global G0');
 ck(eq([...censusIds].sort(),oi?.reverse?.L04_ssc_ids?.slice().sort())&&censusIds.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'recover both original→SSC/SSC→original per-owner links, do not fabricate global pass');
 for(const [id,sid,unused,disp]of groupCases){
  const g=i?.locations?.find(x=>x.id===id),old=oi?.locations?.find(x=>x.id===id);
  ck(old?.disposition===oldMapped&&g?.disposition===disp&&eq(g?.ssc_ids,[sid])&&g?.original_section5_CPT_operator_source_evidence?.git_blob_sha===B.packet,'original exact QFT formula source group and owner '+id);
 }
 const changedItems=[];
 for(let k=0;k<191;k++){
  const a=o?.items?.[k],b=n?.items?.[k];if(!a||!b){ck(false,'missing existing typed SSC '+k);continue;}
  ck(a.id===b.id,'191 existing L SSC typed identities unchanged '+k);if(!eq(a,b))changedItems.push(b.id);
 }
 ck(eq(changedItems,['L-SSC-104','L-SSC-105','L-SSC-106']),'188 complete other SSC source records conserved');
 for(const [id,sid]of groupCases){
  const rec=n?.items?.find(x=>x.id===sid),source=rec?.source_expression_census?.L04_ORIGINAL_SECTION5_C_P_T_FOCK_OPERATOR_SOURCE_0_1;
  ck(source?.source_packet?.git_blob_sha===B.packet&&source?.source_first_inverse?.git_blob_sha===B.inv&&source.source_original_group===id&&source.original_all13_p10_blocks_highres_CI===38164906805&&source.whole_original_semantic_cold_complete===false,'recover exact original formula source and SSC primary evidence '+sid);
 }
 const c104=n.items.find(x=>x.id==='L-SSC-104')?.body||'',c105=n.items.find(x=>x.id==='L-SSC-105')?.body||'',c106=n.items.find(x=>x.id==='L-SSC-106')?.body||'';
 for(const bit of ['UNITARY C-hat','ANTIUNITARY','Eq(5.1)','a_hat_p','b_hat_p','no printed'])ck(c104.includes(bit)||c104.toLowerCase().includes(bit.toLowerCase()),'original C QFT operator scope '+bit);
 for(const bit of ['Eq(5.2)','−i a_hat','+i b_hat','−p','DO NOT swap'])ck(c105.includes(bit),'original P Fock signed phase and spin scope '+bit);
 for(const bit of ['Eq(5.3)','ANTIUNITARY','∓ a_hat','∓ b_hat','−p','UNITARY'])ck(c106.includes(bit),'original T Fock antiunitary and source paired signs '+bit);
 ck(n?.schema==='woit-lisi.track-l.source-semantic-census.v0.81'&&n.predecessor.git_blob_sha===B.oldSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv&&n.guards.source_census_freeze_complete===false,'SSC exact lineage and no freeze');
 const q=r?.per_source?.find(x=>x.source==='L04');
 ck(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.35'&&r.source_first_predecessor.git_blob_sha===B.oldReg&&r.current_ssc.git_blob_sha===B.SSC&&r.per_source.length===6&&r.per_source.reduce((sum,z)=>sum+z.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191&&q?.audit_git_blob_sha===B.inv&&q.classified_source_locations[oldMapped]===24,'six original first source denominators conserved');
 ck(r.per_source.every(z=>z.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_complete===false&&r.explicit_locks.G1_authorized===false,'none of six whole cold proofs falsely closed');
 ck(v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.52'&&v.predecessor_exact.git_blob_sha===B.oldTr&&v.current_census.git_blob_sha===B.SSC&&v.current_L04_source_first_inventory.git_blob_sha===B.inv&&v.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&v.complete_sources===0,'current traversal full G0 source lineage');
 ck(g?.schema==='isograph.exp062-l-current-stage-gate.v0.147'&&g.predecessor_gate.git_blob_sha===B.oldGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.section5_source_packet.git_blob_sha===B.packet&&g.section5_source_verifier.git_blob_sha===B.self,'stage gate exact source-checker provenance');
 ck(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'CI not preclaimed success or G0/G1 authorization');
 return issues;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-CPT-original-source-'));let page='',imageBytes;
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('OFFICIAL_FROZEN_L04_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());if(bytes.length!==348134||sha(bytes)!==originalSHA)throw Error('WRONG_ORIGINAL_SOURCE_L04_REVISION');
 const f=path.join(dir,'original.pdf');fs.writeFileSync(f,bytes);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[f],{encoding:'utf8',timeout:10000})))throw Error('WRONG_FROZEN_ORIGINAL_PAGE_COUNT');
 page=execFileSync('pdftotext',['-f','10','-l','10','-layout','-enc','UTF-8',f,'-'],{encoding:'utf8',timeout:12000,maxBuffer:2000000});
 const stem=path.join(dir,'p10');
 execFileSync('pdftoppm',['-f','10','-l','10','-r','360','-x','280','-y','820','-W','2600','-H','2650','-png','-singlefile',f,stem],{timeout:35000,maxBuffer:4000000});
 imageBytes=fs.readFileSync(stem+'.png');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=verify(D,page,imageBytes),mutants=[
 ['forge_source_general_phase',d=>d.packet.original_equation_scopes[0].original_chosen_source_semantics[3].printed+=' +i'],
 ['flip_C_Fock_unitarity',d=>d.packet.original_equation_scopes[0].original_chosen_source_semantics[2].source_modality='ANTIUNITARY Fock C'],
 ['flip_C_spinor_unitarity',d=>d.packet.original_equation_scopes[0].original_chosen_source_semantics[1].source_modality='UNITARY spinor C'],
 ['change_C_annihilator',d=>d.packet.original_equation_scopes[0].original_chosen_source_semantics[3].printed='b_hat† invented'],
 ['delete_C_dagger',d=>d.packet.original_equation_scopes[0].original_chosen_source_semantics[4].printed='missing dagger'],
 ['wrong_P_creation_sign',d=>d.packet.original_equation_scopes[1].original_chosen_source_semantics[3].printed=d.packet.original_equation_scopes[1].original_chosen_source_semantics[3].printed.replace('+i','-i')],
 ['wrong_P_annihilator_sign',d=>d.packet.original_equation_scopes[1].original_chosen_source_semantics[2].printed=d.packet.original_equation_scopes[1].original_chosen_source_semantics[2].printed.replace('-i','+i')],
 ['wrong_P_momentum',d=>d.packet.original_equation_scopes[1].original_chosen_source_semantics[2].printed=d.packet.original_equation_scopes[1].original_chosen_source_semantics[2].printed.replace('a_hat_{-p}','a_hat_p')],
 ['invent_P_spin_index_switch',d=>d.packet.original_equation_scopes[1].original_chosen_source_semantics[2].printed=d.packet.original_equation_scopes[1].original_chosen_source_semantics[2].printed.replace('a_hat_{-p}^{wedge/vee}','a_hat_{-p}^{vee/wedge}')],
 ['wrong_P_source_spinor',d=>d.packet.original_equation_scopes[1].original_chosen_source_semantics[0].printed='no -x'],
 ['wrong_T_Fock_unitarity',d=>d.packet.original_equation_scopes[2].original_chosen_source_semantics[1].source_modality='UNITARY Fock T'],
 ['wrong_T_spinor_unitarity',d=>d.packet.original_equation_scopes[2].original_chosen_source_semantics[0].source_modality='ANTIUNITARY spinor T'],
 ['wrong_T_phase',d=>d.packet.original_equation_scopes[2].original_chosen_source_semantics[3].printed=d.packet.original_equation_scopes[2].original_chosen_source_semantics[3].printed.replace('(-/+)','(+/-)')],
 ['wrong_T_spinor_switch',d=>d.packet.original_equation_scopes[2].original_chosen_source_semantics[3].printed=d.packet.original_equation_scopes[2].original_chosen_source_semantics[3].printed.replace('vee/wedge','wedge/vee')],
 ['wrong_T_momentum',d=>d.packet.original_equation_scopes[2].original_chosen_source_semantics[4].printed=d.packet.original_equation_scopes[2].original_chosen_source_semantics[4].printed.replace('_{-p}','_p')],
 ['wrong_T_dagger',d=>d.packet.original_equation_scopes[2].original_chosen_source_semantics[4].printed=d.packet.original_equation_scopes[2].original_chosen_source_semantics[4].printed.replace('dagger','')],
 ['drop_original_C_source_block',d=>d.packet.original_equation_scopes[0].source_blocks.pop()],
 ['drop_original_T_source_block',d=>d.packet.original_equation_scopes[2].source_blocks.shift()],
 ['change_frozen_PDF_version',d=>d.packet.frozen_original.revision='arXiv:2407.02497v1'],
 ['change_frozen_PDF_SHA',d=>d.packet.frozen_original.PDF_SHA256='bad'],
 ['change_frozen_page_layout_SHA',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[9].original_extracted_page_SHA256='bad'],
 ['delete_original_p10_page_atom',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[9].blocks.pop()],
 ['wrong_folio_loadbearing',d=>d.packet.original_source_independent_completeness_partition.nonload_source_folio.existing_original_source_unit='L04-S023'],
 ['wrong_visual_crop_sha',d=>d.packet.independent_original_visual.high_resolution_source_primary_CI.original_crop_SHA256='bad'],
 ['change_scope_assertion',d=>d.packet.reopening_mechanism_and_systematic_method.prior_false_completeness='missing'],
 ['remove_original_source_group',d=>d.inv.locations.pop()],
 ['edit_nonaffected_original_group',d=>d.inv.locations.find(x=>x.id==='L04-S020').original_source_semantic_group+='made up'],
 ['change_original_group_owner',d=>d.inv.locations.find(x=>x.id==='L04-S021').ssc_ids=['L-SSC-107']],
 ['change_nonaffected_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-107').body+='made up'],
 ['erase_qualified_formula',d=>d.SSC.items.find(x=>x.id==='L-SSC-105').body='just summary'],
 ['forge_G0_full_cold',d=>d.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['forge_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['forge_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true],
 ['forge_CI_SUCCESS',d=>d.gate.new_source_CI.status='SUCCESS']
];
let rejected=0;
if(issues.length===0)for(const [name,mut]of mutants){const clone=structuredClone(D);try{mut(clone);if(verify(clone,page,imageBytes).length)rejected++;else issues.push('HOSTILE_ESCAPE '+name);}catch(e){issues.push('HOSTILE_VERIFIER_EXCEPTION '+name+' '+e.message)}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-section5-CPT-signed-QFT-source-0.2',PASS:issues.length===0,issues,frozen_original_PDF_SHA_verified:true,source_original_p10_page_and_13_blocks_verified:true,source_original_primary_PDF_visual_SHA_verified:sha(imageBytes)===originalImage,original_source_groups_repaired:['L04-S021','L04-S022','L04-S023'],existing_SSC_repaired:['L-SSC-104','L-SSC-105','L-SSC-106'],unchanged_entire_188_other_SSC_records:true,unchanged_entire_50_other_L04_source_groups:true,original_source_location_units:350,existing_L_SSC_identity_count:191,original_L04_mapped_groups_global_cold_unqualified:24,original_L04_selected_exact_preselected_pending:0,hostiles_defined:mutants.length,hostiles_rejected:rejected,complete_original_L04_cold_audit:false,all_six_frozen_original_cold_qualified:false,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(issues.length)process.exitCode=1;

