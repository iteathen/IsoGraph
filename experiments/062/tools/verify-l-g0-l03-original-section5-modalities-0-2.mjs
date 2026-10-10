// IsoGraph L-only G0: SHA-frozen original L03 v1 §5 source semantics.
// Source-first test of conditional new-particle predictions, source-native EPE
// reference, mirror scalar interactions and hypothetical scalar-fermion composite
// generation idea. No physics proof, G0 freeze, or W semantic imports.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_64.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_65.json',
 oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',inv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_7.json',
 packet:P+'LISI_L03_ORIGINAL_SECTION5_SPECULATIVE_SCALAR_MIRROR_GENERATIONS_G0_0_1.json',
 layout:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_16.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_17.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_33.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_34.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_111.json',gate:E+'L_CURRENT_STAGE_GATE_0_112.json',
 self:E+'tools/verify-l-g0-l03-original-section5-modalities-0-2.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitblob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const h=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,gitblob(p)]));
const x=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const get=(a,id,k='id')=>a?.find(z=>z?.[k]===id);
const frozen='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e';
function audit(d){
 const problems=[],q=(truth,msg)=>{if(!truth)problems.push(msg);};
 const {packet:p,oldInv:oi,inv:i,oldSSC:o,ssc:s,layout:l,oldReg:pr,reg:r,oldTr:pt,tr:t,oldGate:og,gate:g}=d;
 q(p?.schema==='isograph.track-L.G0.L03-frozen-original-section5-conditional-physical-claims.v0.1'&&p?.track==='L'&&p?.stage==='G0','L03 source-only G0 artifact');
 q(p?.frozen_source?.revision==='arXiv:1006.4908v1'&&p?.frozen_source?.exact_SHA256===frozen&&p?.frozen_source?.original_PDF_pages===14,'exact v1 original-source identity');
 q(p?.frozen_source?.source_first_all_94_block_CI?.run_id===38094818994&&p?.frozen_source?.source_first_all_94_block_CI?.conclusion==='success'&&p?.frozen_source?.source_first_all_94_block_CI?.hostiles_rejected===9,'prior exact primary original SHA-94 source block provenance');
 const b13=p?.source_first?.[0]||{},b14=p?.source_first?.[1]||{};
 q(p?.source_first?.length===2&&b13.existing_source_location_id==='L03-S040'&&b13.existing_SSC_owner==='L-SSC-090'&&b14.existing_source_location_id==='L03-S041'&&b14.existing_SSC_owner==='L-SSC-091','exact two original first owners, no duplicate SI');
 q(b13.original_layout_atom==='L03-P013-B003'&&b13.original_layout_SHA256==='610fe45f657dac937624829f095c16d8858961b9701b496f317c8437309e2fe7','original §5 opening frozen block');
 q(b14.original_layout_atoms?.join(',')==='L03-P013-B003,L03-P014-B002'&&b14.original_layout_SHAs?.[1]==='29c1085bca2a24e1a989964639f16d1f14c4ec2846ebdadb183a8132ed5baad5','original §5 p14 sequel block');
 const a=b13.recovered_load_bearing_semantics||{},b=b14.recovered_load_bearing_semantics||{};
 q(a.source_antecedent?.startsWith('IF ')&&a.source_antecedent?.includes('nonzero frame-Higgs')&&a.source_prediction_scope?.startsWith('IF ')&&a.source_prediction_scope?.includes('mirror fermions'),'conditional E8(−24) direct model and symmetry breaking');
 q(a.predicted_charge_evidence_role?.includes('eigenvalues under commuting force generators')&&a.original_source_native_explorer_footnote==='http://deferentialgeometry.org/epe/'&&a.predicted_charge_evidence_role?.includes('not part of the frozen original corpus'),'outbound EPE source native citation only, no target content imported');
 q(a.collider_modality?.includes('distinct POSSIBILITY')&&a.collider_modality?.includes('not a guaranteed or observed')&&a.author_epistemic_confidence?.includes("'incontrovertible'")&&a.author_epistemic_confidence?.includes("not a separately qualified theorem"),'LHC detection possibility and author confidence not independent mathematics');
 q(b.limitation?.includes('mirror')&&b.limitation?.includes('not known to occur')&&b.limitation?.includes('large mirror masses'),'unobserved mirrors and conditional mass problem');
 q(b.asserted_scalar_coupling?.includes('axions')&&b.asserted_scalar_coupling?.includes('interact with the mirror'),'proposed scalar/mirror interaction');
 q(b.conditional_generation_hypothesis?.includes('COULD')&&b.conditional_generation_hypothesis?.includes('POSSIBLY')&&b.conditional_generation_hypothesis?.includes('scalar-fermion composite')&&b.conditional_generation_hypothesis?.includes('no model, dynamics'),'author hypothetical scalar-fermion composite, not theorem');
 q(b.separate_E8_split_hint?.includes('Pati-Salam')&&b.separate_E8_split_hint?.includes('undeveloped')&&b.explicit_open_questions?.includes('OPEN')&&b.negative_direct_identification_separate?.includes('NOT directly'),'split E8(8) hint and prior negative preserved');
 q(p?.methodological_correction?.failure_class==='AUTHOR_NARRATIVE_CAUSAL_MECHANISM_AND_SPECULATIVE_MODALITY_UNDERINDEXED_AS_GENERIC_OPEN_PROBLEM'&&p?.methodological_correction?.systemic_extraction_repair?.includes('modal verbs'),'systematic failure class, not invented new type');
 q(p?.historical_conservation?.new_typed_SSC_ids===0&&p?.historical_conservation?.unchanged_entire_SSC_records===189&&p?.historical_conservation?.original_L03_formula_matrix_groups_still_pending===15&&p?.historical_conservation?.whole_original_sources_semantically_cold_complete===0,'original source limited repair and preserved 15 exact formula debt');
 q(p?.G0_complete===false&&p?.G0_frozen===false&&p?.G1_authorized===false&&p?.W_semantics_imported===false&&p?.PR70_merge_authorized===false,'source packet G0/W firewall');
 q(l?.original_sources?.[2]?.revision==='arXiv:1006.4908v1'&&l?.original_sources?.[2]?.PDF_SHA256===frozen&&l?.original_sources?.[2]?.original_pdf_layout_blocks===94,'independent original PDF layout source denominator');
 for(const [page,id,digest]of [[12,'L03-P013-B003',b13.original_layout_SHA256],[13,'L03-P014-B002',b14.original_layout_SHAs?.[1]]]){
  const z=l?.original_sources?.[2]?.original_pdf_extracted_pages?.[page]?.blocks?.find(x=>x.source_atom_id===id);
  q(z?.original_source_block_SHA256===digest,'original source-first SHA location '+id);
 }
 q(oi?.original_first_locations?.length===47&&i?.original_first_locations?.length===47,'conserve all 47 L03 original first groups');
 let edits=[];
 for(let k=0;k<47;k++){
  const a=oi.original_first_locations[k],b=i.original_first_locations[k];
  q(a.source_location_id===b.source_location_id,'exact source identity '+k);
  if(JSON.stringify(a)!==JSON.stringify(b))edits.push(b.source_location_id);
 }
 q(edits.join(',')==='L03-S040,L03-S041','45 exact full predecessor original locations conserved');
 for(const [loc,owner]of [['L03-S040','L-SSC-090'],['L03-S041','L-SSC-091']]){
  const row=get(i.original_first_locations,loc,'source_location_id');
  q(row?.SSC_ids?.join(',')===owner&&row?.original_section5_source_fidelity?.git_blob_sha===h.packet&&row?.original_section5_source_fidelity?.whole_original_source_cold_qualified===false,'source row exact original PDF packet/inverse '+loc);
 }
 const row40=get(i.original_first_locations,'L03-S040','source_location_id'),row41=get(i.original_first_locations,'L03-S041','source_location_id');
 q(row40?.source_semantic_group?.includes('LHC')&&row40?.source_semantic_group?.includes('EPE')===false&&row40?.source_semantic_group?.includes('Explorer')&&row40?.source_semantic_group?.includes('POSSIBILITY'),'SSC-directed §5 collider/EPE modality full source BODY');
 q(row41?.source_semantic_group?.includes('SCALAR–FERMION COMPOSITES')&&row41?.source_semantic_group?.includes('INTERACT WITH')&&row41?.source_semantic_group?.includes('NOT been observed')&&row41?.source_semantic_group?.includes('does NOT undo'),'SSC-directed source S041 speculative causal mechanism in actual body');
 q(i?.original_section5_semantic_modal_repair?.git_blob_sha===h.packet&&i?.predecessor_section5_source_first?.git_blob_sha===h.oldInv,'inverse exact lineage');
 q(i?.counts?.original_source_formula_groups_unverified===15&&i?.stage_locks?.G0_frozen===false,'15 matrix formula groups not promoted');
 q(o?.items?.length===191&&s?.items?.length===191&&s?.schema==='woit-lisi.track-l.source-semantic-census.v0.65','exact source SSC successor');
 let sscedits=[];
 for(let k=0;k<191;k++){
  const a=o.items[k],b=s.items[k];q(a?.id===b?.id,'191 stable source SI identities '+k);
  if(JSON.stringify(a)!==JSON.stringify(b))sscedits.push(b?.id);
 }
 q(sscedits.join(',')==='L-SSC-090,L-SSC-091','189 untouched entire source SSI objects');
 const m90=get(s.items,'L-SSC-090')?.body||'',m91=get(s.items,'L-SSC-091')?.body||'';
 for(const term of ['IF the physical world','Element' ,'LHC','POSSIBILITY','incontrovertible','NOT imported'])q(m90.includes(term),'L-SSC-090 source modality/citation '+term);
 for(const term of ['INTERACT WITH MIRROR FERMIONS','COULD','POSSIBLY','scalar–fermion composites','NOT a derived composite model','CANNOT DIRECTLY'])q(m91.includes(term),'L-SSC-091 original modal/negative scope '+term);
 for(const id of ['L-SSC-090','L-SSC-091']){
  const z=get(s.items,id)?.source_expression_census?.L03_ORIGINAL_SECTION5_SPECULATIVE_SCALAR_MIRROR_GENERATION_0_1;
  q(z?.packet?.git_blob_sha===h.packet&&z?.original_source_first_inverse?.git_blob_sha===h.inv&&z?.direct_triality_three_block_negative_preserved===true&&z?.whole_original_source_cold_complete===false,'each SSC source provenance and negative guard '+id);
 }
 q(s?.predecessor?.git_blob_sha===h.oldSSC&&s?.revision?.source_packet?.git_blob_sha===h.packet&&s?.revision?.source_first_inverse?.git_blob_sha===h.inv&&s?.guards?.source_census_freeze_complete===false,'source census exact historical predecessor/guard');
 q(get(s.items,'L-SSC-087')?.body===get(o.items,'L-SSC-087')?.body&&get(s.items,'L-SSC-087')?.body?.includes('cannot directly be interpreted'),'prior negative source generation result unedited');
 q(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.16'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.17'&&r?.source_first_predecessor?.git_blob_sha===h.oldReg,'finite six-source register lineage');
 q(r?.current_ssc?.git_blob_sha===h.ssc&&r?.L03_original_section5_physical_modal_source_fidelity?.git_blob_sha===h.packet&&r?.per_source?.find(x=>x.source==='L03')?.audit_git_blob_sha===h.inv,'six-source source→SSC provenance');
 q(r?.per_source?.length===6&&r?.per_source?.reduce((n,z)=>n+z.source_first_location_units,0)===350&&r?.per_source?.every(z=>z.original_complete_cold_review_passed===false),'all six original groups conserved, no source cold pass');
 const expectedOriginalScopedDebt={L01:16,L02:0,L03:15,L04:14,L05:31,L06:30};
 for(const [source,n] of Object.entries(expectedOriginalScopedDebt)){
  const row=r?.per_source?.find(z=>z.source===source);
  q(row?.original_exact_cell_expression_groups_not_yet_independently_verified===n,'preserve actual per-source original exactness debt, NOT globally summable '+source);
 }
 q(r?.L03_original_section5_physical_modal_source_fidelity?.original_15_matrix_formula_cells_exactness_not_promoted===true,'L03 scoped source modality repair cannot retire 15 original source matrix groups');
 q(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false&&r?.explicit_locks?.G1_authorized===false,'global stage gate remains unqualified');
 q(pt?.schema==='lisi.full-treatment.source-traversal-ledger.v0.33'&&t?.schema==='lisi.full-treatment.source-traversal-ledger.v0.34'&&t?.predecessor_exact?.git_blob_sha===h.oldTr,'source traversal exact lineage');
 q(t?.current_census?.git_blob_sha===h.ssc&&t?.current_L03_source_first_inventory?.git_blob_sha===h.inv&&t?.current_G0_six_original_finite_convergence?.git_blob_sha===h.reg&&t?.complete_sources===0,'source original traversal still cold-open');
 q(og?.schema==='isograph.exp062-l-current-stage-gate.v0.111'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.112'&&g?.predecessor_gate?.git_blob_sha===h.oldGate,'current stage gate predecessor');
 q(g?.source_packet?.git_blob_sha===h.packet&&g?.source_first_inverse?.git_blob_sha===h.inv&&g?.current_source_census?.git_blob_sha===h.ssc&&g?.current_convergence?.git_blob_sha===h.reg&&g?.current_traversal?.git_blob_sha===h.tr&&g?.source_verifier?.git_blob_sha===h.self,'stage original source exact packet pointers');
 q(g?.first_failed_section5_original_CI?.run_id===38095413498&&g?.first_failed_section5_original_CI?.conclusion==='failure'&&g?.first_failed_section5_original_CI?.hostiles_rejected===37,'retain exact failed original source 37/38 hostile CI and unchanged source scope');
 q(g?.source_first_L03_94_CI?.run_id===38094818994&&g?.source_first_L03_94_CI?.conclusion==='success'&&g?.source_first_L03_94_CI?.hostiles_rejected===9,'prior scoped primary original L03 hash CI success');
 q(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'no premature CI or stage promotion');
 return problems;
}
const normalize=s=>s.replace(/-\s*\n\s*/g,'').replace(/[\n\r\t]+/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
function sourceTextCheck(p13,p14){
 const issues=[],q=(b,msg)=>{if(!b)issues.push(msg);};
 const a=normalize(p13),b=normalize(p14),both=a+' '+b;
 q(a.includes('large hadron collider')&&a.includes('distinct possibility'),'original p13 collider expressly possible');
 q(a.includes('elementary particle explorer')&&a.includes('charges of these'),'original p13 native outgoing explorer + source particle charges');
 q(a.includes('frame-higgs')&&a.includes('vacuum expectation value'),'original conditional frame-Higgs symmetry breaking');
 q(a.includes('incontrovertible')&&a.includes('mirror fermions'),'original author confidence separate from negative mirror issue');
 q(a.includes('axions and other higgs scalars')&&a.includes('which interact with the')&&b.includes('mirrors. these scalars'),'original scalar interaction carries over from p13 to p14 across intervening footnote/page furniture');
 q(b.includes('possibly as scalar-fermion composites'),'original p14 proposal explicitly POSSIBLY composite');
 q(b.includes('could also help explain')&&b.includes('three generations'),'original p14 scalar-driven generations are COULD not proven');
 q(b.includes('split real form')&&b.includes('pati-salam'),'separate source split real form via Pati-Salam only hinted');
 q(b.includes('remain open questions')&&b.includes('quantum description'),'original author unclosed full action/mass/quantum');
 return issues;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L03-v1-Section5-G0-'));let p13='',p14='';
try{
 const resp=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(45000)});
 if(resp.status!==200)throw Error('FROZEN_L03_V1_ORIGINAL_HTTP_'+resp.status);
 const pdfBytes=Buffer.from(await resp.arrayBuffer());
 if(sha(pdfBytes)!==frozen)throw Error('ORIGINAL_L03_v1_SHA256_BYTES_NOT_IDENTICAL');
 const pdf=path.join(dir,'original-L03-v1.pdf');fs.writeFileSync(pdf,pdfBytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*14$/m.test(info))throw Error('ORIGINAL_L03_NOT_14_PAGE_FROZEN_V1');
 const extract=(page)=>execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:2000000});
 p13=extract(13);p14=extract(14);
 for(const [page,raw]of [[12,p13],[13,p14]]){
  const expected=x.layout.original_sources[2].original_pdf_extracted_pages[page].original_extracted_page_SHA256;
  if(sha(Buffer.from(raw))!==expected)throw Error('FROZEN_V1_PDF_SOURCE_PAGE_TEXT_SHA_NOT_MATCH_'+page);
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=audit(x).concat(sourceTextCheck(p13,p14));
const hostiles=[
 ['source_revision_swap',d=>d.packet.frozen_source.revision='arXiv:1006.4908v2'],
 ['source_sha_swap',d=>d.packet.frozen_source.exact_SHA256='bad'],
 ['erase_source_clause',d=>d.packet.source_first.pop()],
 ['wrong_source_locus',d=>d.packet.source_first[0].existing_source_location_id='L03-S042'],
 ['wrong_original_atom_sha',d=>d.packet.source_first[1].original_layout_SHAs[1]='bad'],
 ['erase_conditional_IF',d=>d.packet.source_first[0].recovered_load_bearing_semantics.source_antecedent='unconditionally true'],
 ['invent_LHC_discovery',d=>d.packet.source_first[0].recovered_load_bearing_semantics.collider_modality='LHC directly observed evidence'],
 ['import_EPE_external_semantics',d=>d.packet.source_first[0].recovered_load_bearing_semantics.predicted_charge_evidence_role='External EPE target already proves the unification'],
 ['erase_source_native_footnote',d=>d.packet.source_first[0].recovered_load_bearing_semantics.original_source_native_explorer_footnote='unknown'],
 ['fake_author_theorem',d=>d.packet.source_first[0].recovered_load_bearing_semantics.author_epistemic_confidence='model universally proven'],
 ['erase_mirror_negative',d=>d.packet.source_first[1].recovered_load_bearing_semantics.limitation='mirror fermions observed'],
 ['erase_scalar_mirror_interaction',d=>d.packet.source_first[1].recovered_load_bearing_semantics.asserted_scalar_coupling='no interaction described'],
 ['invent_composite_generation_proof',d=>d.packet.source_first[1].recovered_load_bearing_semantics.conditional_generation_hypothesis='three generations decisively proved'],
 ['erase_split_source_hint',d=>d.packet.source_first[1].recovered_load_bearing_semantics.separate_E8_split_hint='none'],
 ['reverse_prior_negative',d=>d.packet.source_first[1].recovered_load_bearing_semantics.negative_direct_identification_separate='three blocks ARE three generations'],
 ['forge_source_G0',d=>d.packet.G0_complete=true],
 ['mutate_unaffected_source_row',d=>d.inv.original_first_locations[2].source_semantic_group+=' false'],
 ['erase_S040_body',d=>get(d.inv.original_first_locations,'L03-S040','source_location_id').source_semantic_group='generic'],
 ['erase_S041_body',d=>get(d.inv.original_first_locations,'L03-S041','source_location_id').source_semantic_group='generic'],
 ['reassign_S040_owner',d=>get(d.inv.original_first_locations,'L03-S040','source_location_id').SSC_ids=['L-SSC-092']],
 ['tamper_original_source_hash',d=>get(d.inv.original_first_locations,'L03-S040','source_location_id').original_section5_source_fidelity.git_blob_sha='bad'],
 ['rewrite_old_unaffected_SSC',d=>get(d.ssc.items,'L-SSC-085').body+=' forged'],
 ['strip_SSC_composite',d=>get(d.ssc.items,'L-SSC-091').body='nothing'],
 ['strip_SSC_LHC',d=>get(d.ssc.items,'L-SSC-090').body='nothing'],
 ['add_new_SSC',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['violate_triality_negative',d=>get(d.ssc.items,'L-SSC-087').body='three triality sectors are physically three generations'],
 ['forge_original_formula_debt_retired',d=>d.reg.per_source.find(z=>z.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['forge_six_original_source_cold',d=>d.reg.per_source[0].original_complete_cold_review_passed=true],
 ['premature_G0_complete',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['premature_G0_freeze',d=>d.reg.exit_acceptance_contract.G0_SSC_frozen=true],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['premature_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let killed=0;
for(const [name,fn]of hostiles){
 const mut=JSON.parse(JSON.stringify(x));try{fn(mut);if(audit(mut).length)killed++;else errors.push('HOSTILE_ESCAPED_'+name);}catch(e){errors.push('HOSTILE_THROW_'+name+':'+String(e));}
}
for(const [name,originalPage,old,newText] of [
 ['original_LHC','13','large hadron collider','proved at collider'],
 ['original_EPE','13','elementary particle explorer','fictional unification theorem'],
 ['original_author_confidence','13','incontrovertible','made up'],
 ['original_composite','14','possibly as scalar-fermion composites','proven as composite generations'],
 ['original_split_PatiSalam','14','pati-salam','no second clue'],
 ['original_open_quantum','14','remain open questions','quantum model fully solved']
]){
 const before=originalPage==='13'?normalize(p13):normalize(p14);
 const changed=before.replaceAll(old,newText);
 if(changed===before)errors.push('INERT_ORIGINAL_PDF_HOSTILE_'+name);
 else if(sourceTextCheck(originalPage==='13'?changed:p13,originalPage==='14'?changed:p14).length)killed++;
 else errors.push('ORIGINAL_PDF_HOSTILE_ESCAPED_'+name);
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L03.original-section5-physical-source-modality.v0.2',
 success:errors.length===0,issues:errors,exact_frozen_original_v1_SHA256_verified:true,source_original_pages_checked:[13,14],
 source_orig_block_SHA256_proven:true,source_loci_repaired:['L03-S040','L03-S041'],existing_ssc_items_repaired:['L-SSC-090','L-SSC-091'],
 unchanged_whole_SSC_items:189,whole_other_L03_first_source_rows:45,
 original_15_formula_matrix_exact_groups_remain_open:true,source_whole_L03_semantic_cold_complete:false,
 hostiles_defined:hostiles.length+6,hostiles_rejected:killed,G0_complete:false,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;
