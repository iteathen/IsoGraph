// Track L G0: independently read frozen L03 v1 original PDF Eq(4.4), then
// source->SSC->inventory->convergence->stage conservation with hostile controls.
// This is NOT a whole-source audit or an author's mathematical theorem proof.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 source:P+'LISI_L03_EQ4_4_ORIGINAL_KILLING_FORM_SOURCE_G0_0_1.json',
 oldInventory:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_4.json',
 inventory:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_5.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_58.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_59.json',
 oldRegister:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_7.json',
 register:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_8.json',
 oldTraversal:P+'SOURCE_TRAVERSAL_LEDGER_0_25.json',
 traversal:P+'SOURCE_TRAVERSAL_LEDGER_0_26.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_91.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_92.json',
 self:E+'tools/verify-l-g0-l03-eq44-original-source-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const D={src:read(F.source),oldInv:read(F.oldInventory),inv:read(F.inventory),old:read(F.oldSSC),ssc:read(F.SSC),oldReg:read(F.oldRegister),reg:read(F.register),oldTr:read(F.oldTraversal),tr:read(F.traversal),oldGate:read(F.oldGate),gate:read(F.gate)};
const refs=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,sha(p)]));
const open='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED';
const exact='EXACT_ORIGINAL_EQ4_4_KILLING_FORM_CLIFFORD_AND_SIGNED_TENSOR_SOURCE_RECONCILED_GLOBAL_COLD_OPEN';
const originalTensor='−σ1 ⊗ 1 ⊗ 1 ⊗ σ2 ⊗ σ2 ⊗ 1 ⊗ 1';
const bodyTokens=['odd-signature Clifford-vector product','−σ1⊗1⊗1⊗σ2⊗σ2⊗1⊗1','128×128','(48,72)','(64,64)','(112,136)','mixed bivector-spinor'];
function check(d){
 const errs=[],t=(p,msg)=>{if(!p)errs.push(msg);};
 const {src:s,oldInv:oi,inv:i,old:o,ssc:n,oldReg:pr,reg:r,oldTr:ot,tr:v,oldGate:og,gate:g}=d;
 t(s.schema==='isograph.track-L.G0.L03-original-Eq4.4-Killing-form-carrier-source.v0.1'&&s.track==='L'&&s.stage==='G0','L-only G0 source packet');
 t(s.source?.original_revision==='arXiv:1006.4908v1'&&s.source?.original_sha256==='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e'&&s.source?.equation==='4.4'&&s.source?.original_pdf_page_zero_based===10,'frozen v1 revision PDF and locator');
 t(s.original_extracted_text?.nearby_original_text_sha256==='35245705bb642be80acc810cd8d44d6266a8f8ab9644cf1ca34ec0e5c8183625','prior original-source text hash');
 const c=s.original_source_claim||{};
 t(c.odd_signature_vector_product==='g=(GammaPrime_1 GammaPrime_2 GammaPrime_3 GammaPrime_16)_+'&&c.printed_positive_chiral_factorization==='GammaPrimePlus_1_16 GammaPrimePlus_2_16 GammaPrimePlus_3_16','Clifford product and chiral factor order');
 t(c.source_signed_Pauli_tensor==='-sigma1 tensor 1 tensor 1 tensor sigma2 tensor sigma2 tensor 1 tensor 1','tensor sign and all 7 slots');
 t(c.spinor_metric_carrier==='real positive-chiral 128 x 128 spinor pairing'&&c.bivector_pairing.includes('eta_xy eta_wz - eta_wy eta_xz'),'source pairing carriers and ordered metric indices');
 t(c.mixed_bivector_spinor_pairing==='g_xy,phi=(GammaPrime_xy,QPrime_phi)=0','zero mixed pairing');
 t(JSON.stringify(c.bivector_signature)==='[48,72]'&&JSON.stringify(c.spinor_signature)==='[64,64]'&&JSON.stringify(c.total_signature)==='[112,136]','scoped Killing signatures');
 t(s.discrepancy_or_omission?.class==='SOURCE_OPERATOR_DEFINITION_AND_GENERATING_MATRIX_UNDERINDEXED_WHILE_SIGNATURE_SUMMARY_ALREADY_PRESENT'&&s.discrepancy_or_omission?.new_typed_identity_needed===false,'actual omission class vs duplicate');
 t(s.conservation?.old_L03_original_formula_groups_pending===17&&s.conservation?.new_L03_original_formula_groups_pending_on_scoped_pass===16&&s.conservation?.unmodified_ssc_records===190&&s.conservation?.complete_all_six_original_cold_reviews===0,'source-fidelity scope not inflated');
 t(s.stage_locks?.G0_frozen===false&&s.stage_locks?.G1_authorized===false&&s.stage_locks?.W_semantics_imported===false,'packet stage isolation');
 t(oi.original_first_locations?.length===47&&i.original_first_locations?.length===47,'original 47 location denominator');
 let edits=[];
 for(let k=0;k<47;k++){const a=oi.original_first_locations[k],b=i.original_first_locations[k];t(a?.source_location_id===b?.source_location_id,'original location identity '+k);if(JSON.stringify(a)!==JSON.stringify(b))edits.push(b?.source_location_id);}
 t(edits.join(',')==='L03-S032','46 old original source locations unchanged');
 const oldRow=oi.original_first_locations.find(x=>x.source_location_id==='L03-S032'),row=i.original_first_locations.find(x=>x.source_location_id==='L03-S032');
 t(oldRow?.disposition===open&&row?.disposition===exact&&row?.SSC_ids?.join(',')==='L-SSC-082','original->SSC correspondence and distinct source definition');
 t(row?.original_source_metric_evidence?.git_blob_sha===refs.source&&row?.original_source_metric_evidence?.whole_source_cold_complete===false,'source packet exact blob pinned');
 t(i.counts?.by_disposition?.[open]===16&&i.counts?.by_disposition?.[exact]===1&&Object.values(i.counts?.by_disposition||{}).reduce((a,b)=>a+b,0)===47,'exact source owner disposition conservation');
 t(i.counts?.remaining_other_original_formula_and_matrix_exactness_groups===16&&i.reverse?.SSC_to_original_all_ids_have_group===true&&i.reverse?.source_to_SSC_full_exact_source_fidelity_pass===false,'source inverse stays open');
 t(o.items?.length===191&&n.items?.length===191&&n.schema==='woit-lisi.track-l.source-semantic-census.v0.59','SSC revision 191 items');
 const changed=[];for(let k=0;k<191;k++){const x=o.items[k],y=n.items[k];t(x?.id===y?.id,'SSC SI identity '+k);if(JSON.stringify(x)!==JSON.stringify(y))changed.push(y?.id);}
 t(changed.join(',')==='L-SSC-082','190 entire prior SSC records conserved');
 const original=o.items.find(x=>x.id==='L-SSC-082'),updated=n.items.find(x=>x.id==='L-SSC-082');
 t(updated?.body?.startsWith(original?.body||'undefined')&&bodyTokens.every(tok=>updated?.body?.includes(tok)),'source-specific operator/signature assertion body');
 t(updated?.source_expression_census?.L03_ORIGINAL_KILLING_METRIC_EQ4_4_0_1?.source_packet?.git_blob_sha===refs.source&&updated?.source_expression_census?.L03_ORIGINAL_KILLING_METRIC_EQ4_4_0_1?.original_first_reverse_inventory?.git_blob_sha===refs.inventory,'SSC original source evidence links');
 t(n.predecessor?.git_blob_sha===refs.oldSSC&&n.revision?.source_packet?.git_blob_sha===refs.source&&n.revision?.source_first_inverse?.git_blob_sha===refs.inventory,'SSC exact ancestry');
 t(n.guards?.source_census_freeze_complete===false&&n.guards?.L03_original_remaining_exact_formula_groups===16&&n.guards?.L03_original_whole_PDF_cold_complete===false,'SSC no false cold freeze');
 t(pr.per_source?.find(x=>x.source==='L04')?.original_exact_cell_expression_groups_not_yet_independently_verified===14,'actual source L04 prior 14');
 t(r.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.8'&&r.current_ssc?.git_blob_sha===refs.SSC,'six-source convergence new SSC');
 t(r.per_source?.length===6&&r.per_source?.reduce((q,z)=>q+z.source_first_location_units,0)===350&&r.denominator?.distinct_ssc_identity_refs===191,'six-source location and identity denominators');
 const l03=r.per_source.find(x=>x.source==='L03'),l04=r.per_source.find(x=>x.source==='L04');
 t(l03?.audit_git_blob_sha===refs.inventory&&l03?.original_exact_cell_expression_groups_not_yet_independently_verified===16&&l03?.original_complete_cold_review_passed===false,'L03 16 pending and cold open');
 t(l04?.original_exact_cell_expression_groups_not_yet_independently_verified===14&&r.explicit_G0_outstanding?.source_exactness_by_source?.find(x=>x.source==='L04')?.count===14,'L04 stale counter repaired');
 t(r.explicit_G0_outstanding?.source_exactness_by_source?.find(x=>x.source==='L03')?.count===16,'L03 register debt consistency');
 t(r.source_first_predecessor?.git_blob_sha===refs.oldRegister&&r.L03_original_killing_metric_source_evidence?.git_blob_sha===refs.source,'convergence old predecessor and current source');
 t(r.exit_acceptance_contract?.G0_SSC_complete===false&&r.exit_acceptance_contract?.G0_SSC_frozen===false&&r.explicit_locks?.G1_authorized===false,'global G0 still open');
 t(ot.schema==='lisi.full-treatment.source-traversal-ledger.v0.25'&&v.schema==='lisi.full-treatment.source-traversal-ledger.v0.26'&&v.predecessor_exact?.git_blob_sha===refs.oldTraversal,'traversal historical predecessor');
 t(v.current_census?.git_blob_sha===refs.SSC&&v.current_L03_source_first_inventory?.git_blob_sha===refs.inventory&&v.current_G0_six_original_finite_convergence?.git_blob_sha===refs.register,'traversal lineage');
 t(v.sources?.length===6&&v.complete_sources===0&&v.sources?.every(z=>z.current_complete===false)&&v.sources?.find(z=>z.id==='L03')?.current_exact_formula_groups_unverified===16,'no premature complete source');
 t(v.G1_authorized===false&&v.source_census_freeze_authorized===false,'traversal G0 gate stays closed');
 t(og.schema==='isograph.exp062-l-current-stage-gate.v0.91'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.92'&&g.predecessor_gate?.git_blob_sha===refs.oldGate,'stage authority predecessor');
 t(g.current_source_census?.git_blob_sha===refs.SSC&&g.current_source_inventory?.git_blob_sha===refs.inventory&&g.current_convergence?.git_blob_sha===refs.register&&g.current_traversal?.git_blob_sha===refs.traversal&&g.source_packet?.git_blob_sha===refs.source&&g.verifier?.git_blob_sha===refs.self,'stage exact source provenance');
 t(g.previous_graded_source_CI?.run_id===38078974505&&g.previous_graded_source_CI?.head_sha==='72e4c89f85575cebc9865f629d70dfb5e56538ef'&&g.previous_graded_source_CI?.conclusion==='success','prior CI lineage is not this CI');
 t(g.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.new_source_CI?.result===null&&g.new_source_CI?.source_cold_original_whole_pdf_pass===false,'new CI not prematurely promoted');
 t(g.current_lawful_state?.G0_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.PR70_merge_authorized===false&&g.current_lawful_state?.whole_original_L01_L06_cold_complete===false,'procedural G0 hold');
 return errs;
}
const norm=s=>s.replace(/\s+/g,' ').trim();
function originalPDFCheck(page){
 const issues=[],n=norm(page),t=(yes,m)=>{if(!yes)issues.push(m);};
 const p=n.indexOf('(4.4)');
 t(p>=0,'original Eq4.4 actual label');
 const window=p>=0?n.slice(Math.max(0,p-160),p+420):'';
 t(n.includes('odd signature Clifford vector matrices'),'source defines spinor metric with odd Clifford vectors');
 t(window.includes('Γ′1 Γ′2 Γ′3 Γ′16')&&window.includes('−σ1 ⊗ 1 ⊗ 1 ⊗ σ2 ⊗ σ2 ⊗ 1 ⊗ 1'),'original Eq4.4 signed ordered 7-tensor and Clifford factors');
 t(n.includes('with signature (48, 72)'),'original separate 120-bivector signature');
 t(n.includes('Between bivector and')&&n.includes('spinor generators the Killing form is zero'),'original mixed pairing zero');
 return issues;
}
const original='https://arxiv.org/pdf/1006.4908v1',frozen='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L03-EQ44-G0-'));let sourceErrors=[],page='';
try{
 const res=await fetch(original,{signal:AbortSignal.timeout(35000)});
 if(res.status!==200)throw Error('ORIGINAL_PDF_RETRIEVAL_HTTP_'+res.status);
 const b=Buffer.from(await res.arrayBuffer());
 if(crypto.createHash('sha256').update(b).digest('hex')!==frozen)throw Error('ORIGINAL_PDF_BYTES_NOT_FROZEN_V1');
 const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,b);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*14$/m.test(info))throw Error('FROZEN_L03_V1_PAGE_COUNT');
 page=execFileSync('pdftotext',['-f','11','-l','11','-layout',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:2000000});
 sourceErrors=originalPDFCheck(page);
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=check(D).concat(sourceErrors),mutants=[
 ['source_negative_tensor',d=>d.src.original_source_claim.source_signed_Pauli_tensor='sigma1 tensor 1 tensor 1 tensor sigma2 tensor sigma2 tensor 1 tensor 1'],
 ['swap_source_tensor_slots',d=>d.src.original_source_claim.source_signed_Pauli_tensor='-sigma1 tensor 1 tensor sigma2 tensor 1 tensor sigma2 tensor 1 tensor 1'],
 ['source_spinor_carrier',d=>d.src.original_source_claim.spinor_metric_carrier='complex 128 x 128'],
 ['invent_source_revision',d=>d.src.source.original_revision='arXiv:1006.4908v2'],
 ['erase_mixed_zero',d=>d.src.original_source_claim.mixed_bivector_spinor_pairing='unknown'],
 ['forge_source_cold',d=>d.src.conservation.complete_all_six_original_cold_reviews=6],
 ['invent_new_typed',d=>d.src.discrepancy_or_omission.new_typed_identity_needed=true],
 ['modify_other_source_group',d=>d.inv.original_first_locations[0].source_semantic_group+=' changed'],
 ['remove_original_row',d=>d.inv.original_first_locations.pop()],
 ['revert_exact_disposition',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S032').disposition=open],
 ['tamper_source_packet_sha',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S032').original_source_metric_evidence.git_blob_sha='forged'],
 ['erase_SSC_operator',d=>d.ssc.items.find(x=>x.id==='L-SSC-082').body='signature summary only'],
 ['alter_untouched_SSC',d=>d.ssc.items.find(x=>x.id==='L-SSC-001').body+=' forged'],
 ['duplicate_SSC_item',d=>d.ssc.items.push(d.ssc.items[0])],
 ['wrong_predecessor_SSC',d=>d.ssc.predecessor.git_blob_sha='forged'],
 ['forge_SSC_G0',d=>d.ssc.guards.source_census_freeze_complete=true],
 ['erase_register_debt',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['reopen_stale_L04_count',d=>d.reg.explicit_G0_outstanding.source_exactness_by_source.find(x=>x.source==='L04').count=16],
 ['invent_six_cold',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['alter_traversal_owner',d=>d.tr.sources.find(x=>x.id==='L03').current_exact_formula_groups_unverified=0],
 ['wrong_traversal_sha',d=>d.tr.current_L03_source_first_inventory.git_blob_sha='forged'],
 ['wrong_gate_parent',d=>d.gate.predecessor_gate.git_blob_sha='forged'],
 ['relabel_prior_CI',d=>d.gate.previous_graded_source_CI.conclusion='failure'],
 ['invent_new_CI_pass',d=>d.gate.new_source_CI.status='SUCCESS'],
 ['promote_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['merge_PR',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;for(const [name,mutation] of mutants){const d=JSON.parse(JSON.stringify(D));try{mutation(d);if(check(d).length)rejected++;else issues.push('HOSTILE_ESCAPED_'+name);}catch(e){issues.push('HOSTILE_CHECKER_ERROR_'+name+':'+String(e));}}
if(originalPDFCheck(page.replace(originalTensor,'+σ1 ⊗ 1 ⊗ 1 ⊗ σ2 ⊗ σ2 ⊗ 1 ⊗ 1')).length)rejected++;else issues.push('HOSTILE_ESCAPED_FROZEN_PDF_SIGN');
if(originalPDFCheck(page.replace('odd signature Clifford vector matrices','ordinary metric convention')).length)rejected++;else issues.push('HOSTILE_ESCAPED_FROZEN_PDF_CARRIER');
const result={schema:'isograph.exp062.L.G0.L03.original-source-Eq4.4.v0.1',pass:issues.length===0,issues,original_frozen_pdf_sha256_verified:true,original_source_formula_body_checked:sourceErrors.length===0,original_source_group:'L03-S032',SSC_existing:'L-SSC-082',six_source_locations:350,SSC_ids:191,other_original_SSC_records_conserved:190,old_L03_formula_groups_open:17,new_L03_formula_groups_open:16,other_all_six_original_whole_cold_sources_complete:0,hostiles_defined:mutants.length+2,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(issues.length)process.exitCode=1;
