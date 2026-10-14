// L-only G0: source-first narrative modality and phenomenological scale fidelity.
// Retrieve SHA-pinned original L02 v2 PDF; test original p8/p10 source words,
// original 81-block hashes, original 59 source group and 191-item SSC conservation.
// Do not prove the source physical theory or qualify all six original sources.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={src:P+'LISI_L02_BARE_PLANCK_SCALE_AND_QUANTIZATION_MODAL_SOURCE_G0_0_1.json',
 oldInv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_7.json',inv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_8.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_63.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_64.json',
 block:P+'LISI_L02_FROZEN_12_PAGE_ORIGINAL_LAYOUT_ATOMIC_COVERAGE_0_1.json',
 blockCross:P+'LISI_L02_81_ORIGINAL_LAYOUT_BLOCK_SOURCE_SSC_CORRESPONDENCE_0_1.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_14.json',reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_15.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_31.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_32.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_105.json',gate:E+'L_CURRENT_STAGE_GATE_0_106.json',
 self:E+'tools/verify-l-g0-l02-original-planck-quantum-modality-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blobSHA=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blobSHA(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const find=(a,id,k='id')=>a?.find(x=>x?.[k]===id);
const frozen='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a';
const compact=t=>t.replace(/\r/g,'').replace(/-\s*\n\s*/g,'').replace(/\s+/g,' ').toLowerCase();
function sourceCheck(p8,p10){
 const bad=[],test=(v,m)=>{if(!v)bad.push(m);};
 const a=compact(p8),b=compact(p10);
 test(a.includes('clearly far from observed values'),'original bare source explicitly far from observed');
 test(a.includes('too simple to have phenomenological applications'),'original negative author simplicity scope');
 test(a.includes('bare parameters'),'original author bare not measured');
 test(a.includes('planck scale'),'original source Planck scale binder');
 test(a.includes('neighborhood of a fixed point'),'original speculative fixed point');
 test(a.includes('asymptotic high energy behavior'),'original speculative high-energy not measured');
 test(a.includes('gravitational and yang-mills couplings are explicitly related'),'original authored sign of unification, not theorem');
 test(b.includes('gravitational sector needs to be better understood'),'original author unresolved gravity');
 test(b.includes('low order polynomials'),'original low-degree quantization hope premise');
 test(b.includes('we believe that progress can be made on the quantization'),'original author belief not proof');
 test(b.includes('remains to be investigated'),'original quantization remains open');
 test(b.includes('scalar function')&&b.includes('u('),'original author alternative U(Phi) unproved');
 test(b.includes('natural and simple proposal'),'source author concluding proposal vs physical proof');
 return bad;
}
function check(d){
 const bad=[],t=(yes,m)=>{if(!yes)bad.push(m);};
 const {src:o,oldInv:oi,inv:i,oldSSC:ps,ssc:s,block:b,blockCross:bc,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:pg,gate:g}=d;
 t(o?.schema==='isograph.track-L.G0.L02-frozen-original-source-phenomenological-scale-quantization-modalities.v0.1'&&o?.track==='L'&&o?.stage==='G0','L G0 original source packet');
 t(o?.frozen_source?.revision==='arXiv:1004.4866v2'&&o?.frozen_source?.original_PDF_SHA256===frozen&&o?.frozen_source?.pages===12,'exact official original source revision bytes');
 t(o?.source_first?.length===2&&o?.source_first?.[0]?.source_first_location==='L02-S048'&&o?.source_first?.[1]?.source_first_location==='L02-S054','original-first two real author narrative places');
 const p8=o?.source_first?.[0]?.source_native_meaning||{},p10=o?.source_first?.[1]?.source_native_meaning||{};
 t(o?.source_first?.[0]?.existing_SSC_id==='L-SSC-064'&&o?.source_first?.[1]?.existing_SSC_id==='L-SSC-069','two already existing L02 owners not new SI');
 t(p8.scale_binder?.includes('AT THE PLANCK SCALE')===false&&p8.scale_binder?.includes('Planck scale')&&p8.negative_physical_applicability?.includes('too simple')&&p8.hypothesis_modal?.includes('conditional speculation'),'Planck-scale source meaning, source negative and speculative scope');
 t(p8.author_evaluation?.includes('not qualified empirical support'),'author evaluation without physical theorem');
 t(p10.methodological_hope?.includes('low-order polynomial')&&p10.methodological_hope?.includes('explicitly conjectural')&&p10.future_variants?.includes('U(Phi)'),'quantization motivated hope and alternative action not proved');
 t(o?.source_fidelity_failure_class?.class==='AUTHOR_MODALITY_PHENOMENOLOGY_SCALE_AND_LIMITATION_QUALIFIER_UNDERINDEXED'&&o?.conservation?.new_typed_IDs===0,'systematic source error class addressed, no invented identity');
 t(o?.G0_frozen===false&&o?.G1_authorized===false&&o?.W_semantics_imported===false,'no G0 premature freeze or W bridge');
 t(b?.source?.SHA256===frozen&&b?.original_first_block_count===81&&b?.original_extracted_nonblank_lines===614&&bc?.original_source_blocks?.length===81,'original source layout and 81-block pointers pinned');
 const evidence=[['L02-P08-B005',7],['L02-P10-B007',9]];
 for(const [id,page]of evidence){
  const atom=b?.pages?.[page]?.blocks?.find(x=>x.atom_id===id),recon=bc?.original_source_blocks?.find(x=>x.atom_id===id);
  t(!!atom&&atom?.original_extracted_text_SHA256===recon?.original_extracted_text_SHA256,'source exact original PDF narrative block and role '+id);
  t(recon?.disposition==='ORIGINAL_LOADBEARING_ROLE_MAPPED_EXACT_SEMANTICS_NOT_WHOLE_COLD'&&recon?.source_specific_mathematical_formula_cells_independently_cold_complete===false,'role source not mistaken whole-paper cold '+id);
 }
 t(oi?.source_first_locations?.length===59&&i?.source_first_locations?.length===59,'59 frozen source group identities retained');
 const revised=[];
 for(let idx=0;idx<59;idx++){
  const a=oi?.source_first_locations?.[idx],z=i?.source_first_locations?.[idx];
  t(a?.source_location_id===z?.source_location_id,'source group ID conservation '+idx);
  if(JSON.stringify(a)!==JSON.stringify(z))revised.push(z?.source_location_id);
 }
 t(revised.join(',')==='L02-S048,L02-S054','exactly 57 unaffected original source group bodies kept');
 const body48=find(i?.source_first_locations,'L02-S048','source_location_id'),body54=find(i?.source_first_locations,'L02-S054','source_location_id');
 t(body48?.SSC_ids?.join(',')==='L-SSC-064'&&body54?.SSC_ids?.join(',')==='L-SSC-069','SSC original first claims correspondence');
 t(body48?.original_source_semantic_group?.includes('Planck-scale')&&body48?.original_source_semantic_group?.includes('phenomenological applications')&&body48?.original_source_semantic_group?.includes('fixed point'),'L02-S048 source FULL body, not evidence-pointer-only');
 t(body54?.original_source_semantic_group?.includes('low-order polynomial')&&body54?.original_source_semantic_group?.includes('quantization')&&body54?.original_source_semantic_group?.includes('U(Phi)'),'L02-S054 source whole stance');
 for(const id of ['L02-S048','L02-S054']){
  const row=find(i?.source_first_locations,id,'source_location_id');
  t(row?.source_original_scale_stance_evidence?.git_blob_sha===H.src&&row?.source_original_scale_stance_evidence?.whole_source_cold_review_complete===false,'exact source packet+G0 guard '+id);
 }
 t(i?.predecessor_source_first?.git_blob_sha===H.oldInv&&i?.original_source_phenomenological_planck_and_quantum_stance?.git_blob_sha===H.src,'original source fidelity predecessor anchored');
 t(ps?.items?.length===191&&s?.items?.length===191&&s?.schema==='woit-lisi.track-l.source-semantic-census.v0.64','SSC exact 191 identity current version');
 let changes=[];
 for(let idx=0;idx<191;idx++){const a=ps?.items?.[idx],z=s?.items?.[idx];t(a?.id===z?.id,'191 SI identity '+idx);if(JSON.stringify(a)!==JSON.stringify(z))changes.push(z?.id);}
 t(changes.join(',')==='L-SSC-064,L-SSC-069','189 entire unrelated SSC source items byte-conserved');
 const s64=find(s?.items,'L-SSC-064')?.body||'',s69=find(s?.items,'L-SSC-069')?.body||'';
 for(const part of ['Planck scale','PLANCK-SCALE','too simple for phenomenological applications','not an established ultraviolet','SOURCE-AUTHOR EVALUATIVE STANCE'])t(s64.includes(part),'SSC author bare scale/negative + modality '+part);
 for(const part of ['BELIEVE','low-order polynomial','quantization','still to be investigated','PROPOSAL','U(Phi)'])t(s69.includes(part),'SSC future theory original author modal '+part);
 for(const id of ['L-SSC-064','L-SSC-069']){
  const packet=find(s?.items,id)?.source_expression_census?.L02_ORIGINAL_PLANCK_BARE_AND_QUANTUM_MODALITY_SOURCE_0_1;
  t(packet?.source_packet?.git_blob_sha===H.src&&packet?.source_first_inverse?.git_blob_sha===H.inv&&packet?.whole_original_source_cold_complete===false,'record original evidence and cold boundary '+id);
 }
 t(s?.predecessor?.git_blob_sha===H.oldSSC&&s?.revision?.source_packet?.git_blob_sha===H.src&&s?.revision?.source_first_inverse?.git_blob_sha===H.inv,'new source semantic revision exact lineage');
 t(s?.guards?.source_census_freeze_complete===false&&s?.guards?.L02_original_planck_scale_bare_relation_qualifier_conserved===true,'SSC G0 no freeze');
 t(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.14'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.15','six-source source first convergence successor');
 t(r?.source_first_predecessor?.git_blob_sha===H.oldReg&&r?.current_ssc?.git_blob_sha===H.ssc&&r?.L02_scale_stance_g0_original_source_reconciliation?.git_blob_sha===H.src,'finite G0 source evidence hash conservation');
 t(r?.per_source?.length===6&&r?.per_source?.reduce((acc,x)=>acc+x.source_first_location_units,0)===350&&r?.per_source?.every(x=>x.original_complete_cold_review_passed===false),'six frozen source no cold completion');
 t(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false&&r?.explicit_locks?.G1_authorized===false,'global G0 exit contract still unmet');
 t(pt?.schema==='lisi.full-treatment.source-traversal-ledger.v0.31'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.32'&&v?.predecessor_exact?.git_blob_sha===H.oldTr,'L source traversal ancestry');
 t(v?.current_census?.git_blob_sha===H.ssc&&v?.current_L02_source_first_inventory?.git_blob_sha===H.inv&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg&&v?.complete_sources===0,'all six L source traversal still open');
 t(pg?.schema==='isograph.exp062-l-current-stage-gate.v0.105'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.106'&&g?.predecessor_gate?.git_blob_sha===H.oldGate,'procedural gate exact lineage');
 t(g?.source_packet?.git_blob_sha===H.src&&g?.source_first_inventory?.git_blob_sha===H.inv&&g?.source_verifier?.git_blob_sha===H.self&&g?.current_source_census?.git_blob_sha===H.ssc&&g?.current_convergence?.git_blob_sha===H.reg,'procedural source evidence routing');
 t(g?.previous_L02_81_CI?.run_id===38093037947&&g?.previous_L02_81_CI?.conclusion==='success'&&g?.previous_L02_81_CI?.hostiles_rejected===27,'prior successful L02 81-role PI source scoped CI');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'no premature source stage transition');
 return bad;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02-Planck-G0-'));let page8='',page10='';
try{
 const r=await fetch('https://arxiv.org/pdf/1004.4866v2',{signal:AbortSignal.timeout(35000)});
 if(r.status!==200)throw Error('L02_OFFICIAL_SOURCE_HTTP_'+r.status);
 const b=Buffer.from(await r.arrayBuffer());if(sha(b)!==frozen)throw Error('L02_SOURCE_FROZEN_PDF_SHA_MISMATCH');
 const file=path.join(dir,'original.pdf');fs.writeFileSync(file,b);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});if(!/^Pages:\s*12$/m.test(info))throw Error('L02_FROZEN_PAGES_NOT12');
 const original=(page)=>execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:14000,maxBuffer:2000000});
 page8=original(8);page10=original(10);
 const expectedAtoms=[['L02-P08-B005',D.block.pages[7],page8],['L02-P10-B007',D.block.pages[9],page10]];
 for(const [id,p,pdfText]of expectedAtoms){
  const lines=pdfText.replaceAll('\r','').replace(/\f+$/g,'').split('\n'),atom=p.blocks.find(x=>x.atom_id===id);
  const text=lines.slice(atom.extracted_source_first_line_start-1,atom.extracted_source_first_line_end).join('\n');
  if(sha(Buffer.from(text))!==atom.original_extracted_text_SHA256)throw Error('FROZEN_TEXT_BLOCK_SHA_MISMATCH_'+id);
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=check(D).concat(sourceCheck(page8,page10));
const muts=[
 ['drop_source',d=>d.src.source_first.pop()],
 ['wrong_source_version',d=>d.src.frozen_source.revision='arXiv:v1'],
 ['erase_planck',d=>d.src.source_first[0].source_native_meaning.scale_binder='no physical scale'],
 ['erase_too_simple',d=>d.src.source_first[0].source_native_meaning.negative_physical_applicability='fully validated physical model'],
 ['assert_fixed_point',d=>d.src.source_first[0].source_native_meaning.hypothesis_modal='fixed point proven'],
 ['no_author_stance',d=>d.src.source_first[0].source_native_meaning.author_evaluation='physical proof'],
 ['quantization_proved',d=>d.src.source_first[1].source_native_meaning.methodological_hope='proof complete'],
 ['erase_U_Phi',d=>d.src.source_first[1].source_native_meaning.future_variants='only one possible model'],
 ['invent_G0',d=>d.src.G0_complete=true],
 ['alter_untouched_source_row',d=>d.inv.source_first_locations[0].original_source_semantic_group+=' forged'],
 ['erase_source_planck_body',d=>find(d.inv.source_first_locations,'L02-S048','source_location_id').original_source_semantic_group='generic bare'],
 ['erase_source_quantum_body',d=>find(d.inv.source_first_locations,'L02-S054','source_location_id').original_source_semantic_group='unknown'],
 ['alter_source_SHA',d=>find(d.inv.source_first_locations,'L02-S054','source_location_id').source_original_scale_stance_evidence.git_blob_sha='bad'],
 ['alter_other_SSC',d=>find(d.ssc.items,'L-SSC-063').body+=' forged'],
 ['erase_Planck_SSC',d=>find(d.ssc.items,'L-SSC-064').body='nothing'],
 ['erase_quantum_SSC',d=>find(d.ssc.items,'L-SSC-069').body='nothing'],
 ['add_false_SSC',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['alter_register',d=>d.reg.current_ssc.git_blob_sha='bad'],
 ['forge_source_complete',d=>d.reg.per_source.find(x=>x.source==='L02').original_complete_cold_review_passed=true],
 ['forge_G0_complete',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['forge_G0_frozen',d=>d.reg.exit_acceptance_contract.G0_SSC_frozen=true],
 ['switch_traverse',d=>d.tr.current_L02_source_first_inventory.git_blob_sha='bad'],
 ['fake_CI',d=>d.gate.new_source_CI.status='SUCCESS'],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['merge_PR',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;for(const [name,mutation]of muts){
 const d=JSON.parse(JSON.stringify(D));try{mutation(d);if(check(d).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name);}catch(e){errors.push('HOSTILE_ERROR_'+name+':'+String(e));}
}
for(const [name,which,original,target]of [
 ['pdf_planck','8','Planck scale','measured low-energy scale'],
 ['pdf_phenomenology','8','phenomenological applications','fully verified predictions'],
 ['pdf_polynomial','10','low order polynomials','arbitrary transcendental functions'],
 ['pdf_belief','10','we believe that progress can be made on the quantization','we have already completely quantized']]){
  const p=which==='8'?page8:page10;
  const normalized=compact(p),mutated=normalized.replaceAll(original.toLowerCase(),target.toLowerCase());
  if(mutated===normalized)errors.push('INERT_PDF_HOSTILE_'+name);
  else if(sourceCheck(which==='8'?mutated:page8,which==='10'?mutated:page10).length)rejected++;
  else errors.push('HOSTILE_ESCAPED_PDF_'+name);
}
const output={schema:'isograph.exp062.L.G0.L02.original-planck-quantum-modalities.v0.1',pass:errors.length===0,issues:errors,
 frozen_source_revision:'arXiv:1004.4866v2',source_original_PDF_SHA256_verified:true,
 original_source_pages_replayed:[8,10],original_2_text_source_block_SHAs_verified:true,
 source_stance_occurrences_repaired:['L02-S048','L02-S054'],existing_SSC_items_repaired:['L-SSC-064','L-SSC-069'],
 unchanged_complete_SSC_records:189,unchanged_complete_old_L02_source_first_rows:57,
 new_typed_occurrences:0,whole_frozen_L_sources_cold_complete:0,hostiles_defined:muts.length+4,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(output,null,2));if(errors.length)process.exitCode=1;
