// IsoGraph L-only G0: independent SHA-frozen source-first 94-block reverse audit
// plus one genuine unnumbered SU(2) Lie-bracket source-fidelity repair.
// Distinguish source block role/SSC membership from all formula-cell cold proof.
import fs from 'node:fs';import crypto from 'node:crypto';
import os from 'node:os';import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 cross:P+'LISI_L03_94_FROZEN_ORIGINAL_PDF_BLOCK_TO_SSC_ROLE_CROSSWALK_0_1.json',
 source:P+'LISI_L03_UNNUMBERED_SU2_SOURCE_LIE_BRACKET_G0_0_1.json',
 oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_10.json',
 inv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_11.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_68.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_69.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_20.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_21.json',
 oldTrav:P+'SOURCE_TRAVERSAL_LEDGER_0_37.json',
 trav:P+'SOURCE_TRAVERSAL_LEDGER_0_38.json',
 layout:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_119.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_120.json',
 self:E+'tools/verify-l-g0-l03-94-sourceblocks-su2-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const frozen='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e';
const status='LOAD_BEARING_ORIGINAL_TEXT_SOURCE_ROLE_MAPPED_GLOBAL_SOURCE_COLD_OPEN';
const by=(items,id,key='id')=>items?.find(x=>x?.[key]===id);
function check(d,printed){
 const errors=[],t=(v,msg)=>{if(!v)errors.push(msg);};
 const {cross:c,source:p,oldInv:o,inv:i,oldSSC:s0,ssc:s,oldReg:r0,reg:r,oldTrav:t0,trav:tr,layout:layout,oldGate:g0,gate:g}=d;
 t(c?.schema==='isograph.track-L.G0.L03-94-original-primary-PDF-source-first-block-to-SSC-role-census.v0.1'&&c?.track==='L'&&c?.stage==='G0'&&c?.stage_locks?.G0_frozen===false,'L03 original source 94 layout role packet only');
 t(c?.frozen_source?.revision==='arXiv:1006.4908v1'&&c?.frozen_source?.SHA256===frozen&&c?.counts?.original_PDF_pages===14&&c?.counts?.source_original_layout_blocks===94&&c?.counts?.original_extracted_nonblank_lines===806,'frozen PDF source 94 atoms original scope');
 t(c?.original_source_evidence?.source_first_predecessor?.git_blob_sha===H.oldInv&&c?.original_source_evidence?.current_SSC?.git_blob_sha===H.oldSSC,'independent original role audit of previous source/SSC');
 t(c?.counts?.source_group_locators===47&&c?.counts?.existing_SSC_source_owner_IDs===26&&c?.counts?.source_math_cell_whole_original_global_complete===0&&c?.counts?.source_whole_14page_original_semantic_cold_verified===false,'original roles not global source cold proof');
 t(c?.counts?.by_disposition?.SOURCE_PROVENANCE_OR_PAGE_FURNITURE===21&&c?.counts?.by_disposition?.[status]===70&&c?.counts?.by_disposition?.DEFENSIBLE_SOURCE_NONLOAD_EXCLUSION===2&&c?.counts?.by_disposition?.SOURCE_NATIVE_CITATIONS_NO_EXTERNAL_THEOREM_IMPORT===1,'source block exact semantic role categories');
 t(p?.schema==='isograph.track-L.G0.L03.original-unnumbered-SU2-Lie-generator-source-modality.v0.1'&&p?.stage==='G0'&&p?.track==='L'&&p?.stage_locks?.G0_frozen===false&&p?.stage_locks?.G1_authorized===false,'exact G0 SU2 source packet and no G1');
 t(p?.frozen_source?.revision==='arXiv:1006.4908v1'&&p?.frozen_source?.original_sha256===frozen&&p?.frozen_source?.source_layout_atom==='L03-P004-B003'&&p?.frozen_source?.original_text_SHA256==='c71107da019fc9292bd1dc9dcd2a74819a2dd01a1533fc316b57503f498f4f67','original source unnumbered p4 specific SHA and version');
 const q=p?.source_native_definition||{};
 t(q.exact_unumbered_original_bracket==='[(i/2)sigma_I,(i/2)sigma_J]=-(1/4)(sigma_I sigma_J-sigma_J sigma_I)=-epsilon_IJ^K (i/2)sigma_K','source printed bracket sign and full i/2/1/4 normalization');
 t(q.coefficient==='-1/4'&&q.original_structure_constant==='-epsilon_IJ^K'&&JSON.stringify(q.input_binders)==='["I","J"]'&&q.output_binder==='K','original antisymmetric epsilon sign/binders and coefficient roles');
 t(q.source_claim_scope?.includes('not the later arbitrary gravitational')&&q.adjacent_carrier_scope?.includes('P_L')&&q.modality?.startsWith('AUTHOR_EXACT_SOURCE_MATRIX'),'distinguish abstract su2 source from left-chiral physical model');
 t(p?.source_conservation?.other_original_rows_whole_unchanged===46&&p?.source_conservation?.other_entire_SSC_records_unchanged===190&&p?.real_source_fidelity_defect?.new_typed_SSC_ID_required===false,'source packet conserves 46 group rows and 190 SSC records');
 t(layout?.original_sources?.[2]?.PDF_SHA256===frozen&&layout?.original_sources?.[2]?.original_pdf_extracted_pages?.length===14&&layout?.original_sources?.[2]?.original_pdf_layout_blocks===94,'original all-six primary PDF manifest');
 const rows=c?.source_blocks||[],oldRows=o?.original_first_locations||[],newRows=i?.original_first_locations||[],index=new Map(oldRows.map(x=>[x.source_location_id,x]));
 const oldIDs=new Set(s0?.items?.map(x=>x.id)||[]),union=new Set,ownerUnion=new Set;let statuses={},blocks=0;
 t(rows.length===94&&oldRows.length===47&&newRows.length===47&&s0?.items?.length===191&&s?.items?.length===191,'finite original block /source group/SSC counts');
 for(let n=0;n<94;n++){
  const r1=rows[n],originalBlock=layout?.original_sources?.[2]?.original_pdf_extracted_pages?.[r1?.source_original_PDF_page_zero_based]?.blocks?.find(x=>x.source_atom_id===r1?.atom_id);
  t(originalBlock?.original_source_block_SHA256===r1?.original_extracted_text_SHA256&&JSON.stringify([originalBlock?.original_extracted_line_start,originalBlock?.original_extracted_line_end])===JSON.stringify(r1?.original_extracted_line_range),'original primary hashed atom and source text line span '+n);
  const ids=r1?.source_first_existing_locations||[],claim=r1?.existing_SSC_owners||[],ownerSet=new Set;
  for(const id of ids){const old=index.get(id);t(!!old,'all original L03 mapped group exists '+id);union.add(id);for(const sid of old?.SSC_ids||[])ownerSet.add(sid);}
  t(claim.length===ownerSet.size&&claim.every(id=>ownerSet.has(id)&&oldIDs.has(id)),'source atom exact SSC owner set '+r1?.atom_id);
  for(const sid of claim)ownerUnion.add(sid);
  const correctLoad=ids.some(id=>index.get(id)?.load_bearing===true);
  t(r1?.load_bearing===correctLoad,'original load-bearing/SSC status '+r1?.atom_id);
  t(r1?.source_math_cells_globally_cold_verified===false&&r1?.author_modality_verified_when_applicable===false,'source atom role not whole cold '+n);
  t(typeof r1?.role_original_primary_source_first==='string'&&r1.role_original_primary_source_first.length>4,'independent source textual role '+n);
  statuses[r1?.disposition]=(statuses[r1?.disposition]||0)+1;blocks++;
 }
 t(blocks===94&&union.size===47&&ownerUnion.size===26,'complete independent 94 text atom roles mapped to existing 47 source groups/26 owners');
 t(statuses[status]===70&&statuses.SOURCE_PROVENANCE_OR_PAGE_FURNITURE===21&&statuses.DEFENSIBLE_SOURCE_NONLOAD_EXCLUSION===2&&statuses.SOURCE_NATIVE_CITATIONS_NO_EXTERNAL_THEOREM_IMPORT===1,'all original 94 text atom dispositions conserved');
 const atom=by(rows,'L03-P004-B003','atom_id');
 t(atom?.source_first_existing_locations?.join(',')==='L03-S010'&&atom?.existing_SSC_owners?.join(',')==='L-SSC-071'&&atom?.role_original_primary_source_first?.includes('Unnumbered SU2 commutator'),'source first affected unnumbered atom exact original role');
 t(o?.schema==='isograph.track-L.G0.L03-original-source-first-bidirectional-coverage.v0.10'&&i?.schema==='isograph.track-L.G0.L03-original-source-first-bidirectional-coverage.v0.11','L03 original-first source predecessor/correct successor');
 let changed=[];
 for(let k=0;k<47;k++){
  const x=oldRows[k],y=newRows[k];t(x?.source_location_id===y?.source_location_id,'47 complete source identity '+k);
  if(JSON.stringify(x)!==JSON.stringify(y))changed.push(y?.source_location_id);
 }
 t(changed.join(',')==='L03-S010','46 entire unchanged original L03 source group rows');
 const edited=by(newRows,'L03-S010','source_location_id');
 t(edited?.SSC_ids?.join(',')==='L-SSC-071'&&edited?.original_source_semantic_group?.includes('−ε_IJ^K (i/2)σ_K')&&edited?.original_source_semantic_group?.includes('−(1/4)'),'SU2 original source semantics, signed scalar and indexed K');
 t(edited?.source_original_unnumbered_SU2_generator_bracket?.git_blob_sha===H.source&&edited?.source_original_unnumbered_SU2_generator_bracket?.original_full_PDF_cold_semantic_qualified===false,'source original packet SHA and no whole cold');
 t(i?.predecessor_SU2_unnumbered_source?.git_blob_sha===H.oldInv&&i?.current_original_94_block_first_census?.git_blob_sha===H.cross,'new inverse independent source ancestry');
 t(s0?.schema==='woit-lisi.track-l.source-semantic-census.v0.68'&&s?.schema==='woit-lisi.track-l.source-semantic-census.v0.69','original full 191 SSC predecessor');
 let changedSSC=[];
 for(let k=0;k<191;k++){const before=s0?.items?.[k],after=s?.items?.[k];t(before?.id===after?.id,'all 191 SI identities conserved '+k);if(JSON.stringify(before)!==JSON.stringify(after))changedSSC.push(after?.id);}
 t(changedSSC.join(',')==='L-SSC-071','190 unaffected whole SSC records unchanged');
 const b=by(s?.items,'L-SSC-071')?.body||'',oldBody=by(s0?.items,'L-SSC-071')?.body||'';
 t(b.startsWith(oldBody)&&b.includes('[T_I,T_J]=−(1/4)')&&b.includes('−ε_IJ^K (i/2)σ_K')&&b.includes('distinct from Eq(2.1)'), 'original SSC full sign/cell modality and no loss of earlier body');
 const ep=by(s?.items,'L-SSC-071')?.source_expression_census?.L03_ORIGINAL_UNNUMBERED_SU2_BRACKET_0_1;
 t(ep?.original_source_packet?.git_blob_sha===H.source&&ep?.source_first_inverse?.git_blob_sha===H.inv&&ep?.original_94block_crosswalk?.git_blob_sha===H.cross&&ep?.whole_original_14page_source_cold_complete===false,'new SSC source and 94-block exact reverse pointers');
 t(s?.predecessor?.git_blob_sha===H.oldSSC&&s?.revision?.original_source_packet?.git_blob_sha===H.source&&s?.revision?.source_first_inverse?.git_blob_sha===H.inv&&s?.guards?.source_census_freeze_complete===false,'SSC exact ancestor and stage');
 t(r0?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.20'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.21','global six-original source ledger version');
 t(r?.source_first_predecessor?.git_blob_sha===H.oldReg&&r?.current_ssc?.git_blob_sha===H.ssc&&r?.L03_94_frozen_primary_source_block_census?.git_blob_sha===H.cross&&r?.L03_unnumbered_SU2_original_fidelity?.git_blob_sha===H.source,'six-source original-first finite convergence provenance');
 t(r?.per_source?.length===6&&r?.per_source?.reduce((sum,z)=>sum+z.source_first_location_units,0)===350&&r?.per_source?.every(z=>z.original_complete_cold_review_passed===false),'all six frozen source cold status still open');
 for(const z of r0?.per_source||[])if(z.source!=='L03')t(JSON.stringify(z)===JSON.stringify(r.per_source.find(x=>x.source===z.source)),'other whole frozen L source records conserved '+z.source);
 const updated=r?.per_source?.find(z=>z.source==='L03');t(updated?.audit_git_blob_sha===H.inv&&updated?.original_exact_cell_expression_groups_not_yet_independently_verified===0&&updated?.original_94_text_block_role_correspondences===94&&updated?.original_complete_cold_review_passed===false,'L03 94 mapping and zero selected exact packet, not whole source');
 t(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false&&r?.explicit_locks?.G1_authorized===false,'global G0 exit still blocked');
 t(t0?.schema==='lisi.full-treatment.source-traversal-ledger.v0.37'&&tr?.schema==='lisi.full-treatment.source-traversal-ledger.v0.38'&&tr?.predecessor_exact?.git_blob_sha===H.oldTrav,'traversal preceding stage');
 t(tr?.current_census?.git_blob_sha===H.ssc&&tr?.current_L03_source_first_inventory?.git_blob_sha===H.inv&&tr?.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg&&tr?.complete_sources===0&&tr?.G1_authorized===false,'traversal all-original G0 hold');
 t(g0?.schema==='isograph.exp062-l-current-stage-gate.v0.119'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.120'&&g?.predecessor_gate?.git_blob_sha===H.oldGate,'procedural stage exact parent');
 t(g?.current_source_census?.git_blob_sha===H.ssc&&g?.current_L03_inventory?.git_blob_sha===H.inv&&g?.current_convergence?.git_blob_sha===H.reg&&g?.current_traversal?.git_blob_sha===H.trav&&g?.source_block_crosswalk?.git_blob_sha===H.cross&&g?.source_packet?.git_blob_sha===H.source&&g?.source_verifier?.git_blob_sha===H.self,'procedural stage exact original evidence links');
 t(g?.previous_four_matrix_CI?.run_id===38113680576&&g?.previous_four_matrix_CI?.conclusion==='success'&&g?.previous_four_matrix_CI?.hostiles_rejected===22,'prior current four-matrix original SSC CI success exact scope');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'new original source CI not prequalified, G0 open');
 if(printed){
  t(printed.SHA256===frozen&&printed.pages===14&&printed.original_atom_verified===true,'fresh independent official original v1 SHA and 94-blocks');
  t(printed.SU2_source_text_has_negative_epsilon&&printed.SU2_source_text_has_two_Pauli_terms,'original SU2 author source actual signed antisymmetric formula');
 }
 return errors;
}
async function getOriginalSource(){
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'L03-unnumbered-original-SU2-'));
 try{
  const resp=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(40000)});
  if(resp.status!==200)throw Error('ORIGINAL_PDF_NOT_RECOVERABLE_HTTP_'+resp.status);
  const bytes=Buffer.from(await resp.arrayBuffer());if(sha(bytes)!==frozen)throw Error('FROZEN_L03_ORIGINAL_PDF_SHA_MISMATCH');
  const pdf=path.join(temp,'frozen.pdf');fs.writeFileSync(pdf,bytes);
  const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});if(!/^Pages:\s*14$/m.test(info))throw Error('FROZEN_L03_SOURCE_PAGES_NOT_14');
  let sourceText='';
  for(let page=0;page<14;page++){
   const raw=execFileSync('pdftotext',['-f',String(page+1),'-l',String(page+1),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:14000,maxBuffer:1800000});
   const m=D.layout.original_sources[2].original_pdf_extracted_pages[page];
   if(sha(Buffer.from(raw))!==m.original_extracted_page_SHA256)throw Error('ORIGINAL_SOURCE_PAGE_SHA_CHANGED_'+page);
   const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
   for(const block of m.blocks){
    const text=lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n');
    if(sha(Buffer.from(text))!==block.original_source_block_SHA256)throw Error('ORIGINAL_SOURCE_BLOCK_SHA_CHANGED_'+block.source_atom_id);
    if(block.source_atom_id==='L03-P004-B003')sourceText=text;
   }
  }
  const expected=D.layout.original_sources[2].original_pdf_extracted_pages[3].blocks.find(x=>x.source_atom_id==='L03-P004-B003');
  if(sha(Buffer.from(sourceText))!==expected.original_source_block_SHA256)throw Error('ORIGINAL_SU2_BLOCK_BYTE_SHA_CHANGED');
  return {SHA256:frozen,pages:14,original_atom_verified:true,SU2_source_text_has_negative_epsilon:sourceText.includes('−ǫIJ')&&sourceText.includes('σK'),SU2_source_text_has_two_Pauli_terms:sourceText.includes('σI σJ')&&sourceText.includes('σJ σI'),text:sourceText};
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
}
const src=await getOriginalSource();const problems=check(D,src);
const mutants=[
 ['drop_original_atom',d=>d.cross.source_blocks.pop()],
 ['tamper_original_atom_SHA',d=>by(d.cross.source_blocks,'L03-P004-B003','atom_id').original_extracted_text_SHA256='forged'],
 ['switch_source_revision',d=>d.source.frozen_source.revision='arXiv:1006.4908v2'],
 ['source_unnumbered_coefficient_sign',d=>d.source.source_native_definition.coefficient='+1/4'],
 ['source_generator_scalar',d=>d.source.source_native_definition.exact_unumbered_original_bracket='commutator without i/2'],
 ['source_epsilon_sign',d=>d.source.source_native_definition.original_structure_constant='+epsilon_IJ^K'],
 ['reorder_source_binder',d=>d.source.source_native_definition.input_binders.reverse()],
 ['source_modality_false_physics',d=>d.source.source_native_definition.modality='PHYSICAL_THEOREM_PROVEN'],
 ['drop_original_47_group',d=>d.inv.original_first_locations.pop()],
 ['delete_local_source_owner',d=>by(d.inv.original_first_locations,'L03-S010','source_location_id').SSC_ids=[]],
 ['restore_source_underindex',d=>by(d.inv.original_first_locations,'L03-S010','source_location_id').source_semantic_group='opaque su2'],
 ['rewrite_other_source_row',d=>d.inv.original_first_locations[0].source_semantic_group+=' invented'],
 ['rewrite_other_SSC',d=>by(d.ssc.items,'L-SSC-072').body+=' invented'],
 ['erase_source_new_SSC',d=>by(d.ssc.items,'L-SSC-071').body='general lie only'],
 ['add_typed_SSC',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['invalidate_source_pointer',d=>by(d.ssc.items,'L-SSC-071').source_expression_census.L03_ORIGINAL_UNNUMBERED_SU2_BRACKET_0_1.original_source_packet.git_blob_sha='bad'],
 ['forge_other_L_paper_cold',d=>d.reg.per_source.find(x=>x.source==='L05').original_complete_cold_review_passed=true],
 ['forge_global_G0',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['invent_original_cold_blocks',d=>d.cross.counts.source_math_cell_whole_original_global_complete=94],
 ['change_traversal',d=>d.trav.current_L03_source_first_inventory.git_blob_sha='wrong'],
 ['change_stage_verifier',d=>d.gate.source_verifier.git_blob_sha='wrong'],
 ['promote_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['merge_PR70',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;
for(const [name,change]of mutants){
 const clone=JSON.parse(JSON.stringify(D));
 try{change(clone);if(check(clone,src).length)rejected++;else problems.push('HOSTILE_ESCAPED_'+name)}
 catch(e){problems.push('HOSTILE_TEST_ERROR_'+name+':'+String(e));}
}
const originalSourceHostiles=[
 ['original_text_delete_epsilon',t=>t.replace('−ǫIJ','+ǫIJ')],
 ['original_text_delete_ordered_pauli',t=>t.replace('σI σJ','σI σI')]
];
for(const [name,mutate]of originalSourceHostiles){
 const modified=mutate(src.text);
 if(modified===src.text){problems.push('INERT_ORIGINAL_SOURCE_HOSTILE_'+name);continue;}
 const test={...src,text:modified,SU2_source_text_has_negative_epsilon:modified.includes('−ǫIJ')&&modified.includes('σK'),SU2_source_text_has_two_Pauli_terms:modified.includes('σI σJ')&&modified.includes('σJ σI')};
 if(check(D,test).length)rejected++;else problems.push('ORIGINAL_SOURCE_HOSTILE_ESCAPED_'+name);
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L03.frozen-original-94-source-block-SU2-fidelity.v0.1',
 pass:problems.length===0,issues:problems,original_L03_PDF_SHA256_verified:true,original_PDF_pages:14,original_layout_blocks_SHA256_verified:94,
 original_source_role_dispositions:94,source_first_groups:47,existing_L03_SSC_IDs:26,
 one_newly_repaired_unumbered_SU2_bracket_in_existing_SSC:true,unchanged_entire_SSC_records:190,
 unchanged_entire_original_source_rows:46,original_frozen_source_whole_cold_qualified:false,
 all_six_original_whole_source_COLD_completed:0,hostiles_defined:mutants.length+originalSourceHostiles.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false},null,2));
if(problems.length)process.exitCode=1;
