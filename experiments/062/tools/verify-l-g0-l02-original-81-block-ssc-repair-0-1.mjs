// Track L G0: original first 81 frozen L02 PDF blocks -> 59 source-group ->
// 21 existing SSC source owners. Original source Eq1 unnumbered B Phi B indexed
// component is verified from original SHA-pinned primary v2 PDF. Not G0 freeze.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 layout:P+'LISI_L02_FROZEN_12_PAGE_ORIGINAL_LAYOUT_ATOMIC_COVERAGE_0_1.json',
 cross:P+'LISI_L02_81_ORIGINAL_LAYOUT_BLOCK_SOURCE_SSC_CORRESPONDENCE_0_1.json',
 original:P+'LISI_L02_ORIGINAL_UNNUMBERED_BPHIB_INDEXED_G0_0_1.json',
 oldInv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',
 inv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_7.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_62.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_63.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_13.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_14.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_30.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_31.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_102.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_103.json',
 self:E+'tools/verify-l-g0-l02-original-81-block-ssc-repair-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSHA=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const h=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,gitSHA(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const find=(items,id,key='id')=>items?.find(x=>x?.[key]===id);
const status='ORIGINAL_LOADBEARING_ROLE_MAPPED_EXACT_SEMANTICS_NOT_WHOLE_COLD';
function check(d){
 const err=[],t=(ok,msg)=>{if(!ok)err.push(msg);};
 const {layout:m,cross:c,original:o,oldInv:oi,inv:i,oldSSC:ps,ssc:s,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:pg,gate:g}=d;
 const frozen='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a';
 t(c?.schema==='isograph.track-L.G0.L02-81-frozen-original-PDF-block-source-SSC-role-crosswalk.v0.1'&&c.track==='L'&&c.stage==='G0'&&c.G0_complete===false&&c.G1_authorized===false,'L original 81 G0 source-only, not closed');
 t(c?.original_source?.frozen_revision==='arXiv:1004.4866v2'&&c?.original_source?.original_PDF_SHA256===frozen&&c?.original_source?.source_first_layout_manifest?.git_blob_sha===h.layout,'original frozen SHA and independent text layout');
 t(c?.original_source?.source_block_bounded_preview_original_PDF_run?.run_id===38092075528&&c?.original_source?.source_block_bounded_preview_original_PDF_run?.conclusion==='success','independent original SHA-checked source-block preview provenance');
 t(c?.existing_source_first?.git_blob_sha===h.oldInv&&c?.existing_SSC?.git_blob_sha===h.oldSSC,'original source-first corpus and original SSC pinned to source before edits');
 t(c?.original_source?.revision_note?.includes('does not substitute arXiv:1004.4866v2'),'internal PDF newer build date never silently source revision');
 t(c?.counts?.original_source_text_blocks===81&&c?.counts?.original_nonblank_extracted_lines===614&&c?.counts?.source_group_ids_all_59_referred===true&&c?.counts?.existing_source_SSC_roots_all_21_referred===true,'source first finite denominator and both correspondence directions');
 t(c?.counts?.qualified_full_original_formula_cell_semantic_cold_blocks===0&&c?.reverse?.source_to_SSC_complete_exact_math_cold_proved===false&&c?.G0_frozen===false,'layout and roles not global source semantic fidelity');
 t(c?.counts?.by_disposition?.FROZEN_SOURCE_IDENTITY_OR_REVISION_METADATA===3&&c?.counts?.by_disposition?.DEFENSIBLE_NONLOAD_EXCLUSION===16&&c?.counts?.by_disposition?.[status]===62,'real original 81 classification buckets');
 t(m?.pages?.length===12&&m?.original_first_block_count===81&&m?.original_extracted_nonblank_lines===614&&m?.source?.SHA256===frozen,'frozen PDF source layout ancestry');
 t(oi?.source_first_locations?.length===59&&i?.source_first_locations?.length===59&&ps?.items?.length===191&&s?.items?.length===191,'original old/new source-group/SSC identities');
 const invChanged=[];
 for(let n=0;n<59;n++){
  const a=oi?.source_first_locations?.[n],b=i?.source_first_locations?.[n];
  t(a?.source_location_id===b?.source_location_id,'original 59 source-group ID '+n);
  if(JSON.stringify(a)!==JSON.stringify(b))invChanged.push(b?.source_location_id);
 }
 t(invChanged.join(',')==='L02-S011','58 entire source original-first groups preserved');
 const oldSource=find(oi?.source_first_locations,'L02-S011','source_location_id'),newSource=find(i?.source_first_locations,'L02-S011','source_location_id');
 t(oldSource?.SSC_ids?.join(',')==='L-SSC-052'&&newSource?.SSC_ids?.join(',')==='L-SSC-052','repair existing SSC identity, no duplicate');
 t(newSource?.original_source_semantic_group?.includes('(1/32)epsilon^(mu nu rho sigma)')&&newSource?.original_source_semantic_group?.includes('Phi_(rho sigma)^(phi chi IJ)_(KL)'),'source-first original component coefficient/indices in source semantic BODY');
 t(newSource?.original_unnumbered_BPhiB_indexed_source?.git_blob_sha===h.original&&newSource?.original_unnumbered_BPhiB_indexed_source?.whole_source_cold_complete===false,'source-first original packet exact pointer and partial status');
 const edited=[];
 for(let n=0;n<191;n++){
  const x=ps?.items?.[n],y=s?.items?.[n];
  t(x?.id===y?.id,'global 191 source item identity '+n);
  if(JSON.stringify(x)!==JSON.stringify(y))edited.push(y?.id);
 }
 t(edited.join(',')==='L-SSC-052'&&new Set(s?.items?.map(x=>x.id)).size===191,'190 prior exact whole SSC source records conserved');
 const item=find(s?.items,'L-SSC-052'),body=item?.body||'';
 for(const q of ['d̃⁴x·(1/32)','ε^{μνρσ}','B_{μν IJ}','Φ_{ρσ}{}^{φχ IJ}{}_{KL}','B_{φχ}^{KL}','Eq(4)','SECOND TERM']){
  t(body.includes(q),'original source SSC body retains exact 1/32/source indices '+q);
 }
 const ep=item?.source_expression_census?.L02_ORIGINAL_UNNUMBERED_BPHIB_COMPONENT_0_1;
 t(ep?.source_packet?.git_blob_sha===h.original&&ep?.original_block_first?.git_blob_sha===h.cross&&ep?.original_inverse?.git_blob_sha===h.inv&&ep?.Eq1_second_term_not_Eq4===true,'SSC inverse body + unnumbered source scope pointer');
 t(s?.predecessor?.git_blob_sha===h.oldSSC&&s?.revision?.source_packet?.git_blob_sha===h.original&&s?.revision?.source_first_inverse?.git_blob_sha===h.inv,'new SSC exact predecessor and source');
 t(s?.guards?.source_census_freeze_complete===false&&s?.guards?.L02_original_unnumbered_1_32_component_exact_source_guard===true,'original SSC G0 still unqualified');
 const crows=c?.original_source_blocks||[],sources=new Map((oi?.source_first_locations||[]).map(z=>[z.source_location_id,z]));
 const ssIDs=new Set(ps?.items?.map(z=>z.id)),seen=new Set,groupUnion=new Set,ownerUnion=new Set;
 t(crows.length===81,'every original layout block disposition exists');
 let hashChecked=0;const statusCount={};
 for(let ix=0;ix<81;ix++){
  const b=crows[ix]||{},p=b.original_PDF_page_zero_based,k=(m?.pages?.[p]?.blocks||[]).find(x=>x.atom_id===b.atom_id);
  t(!seen.has(b.atom_id),'unique original source block '+ix);seen.add(b.atom_id);
  t(k?.original_extracted_text_SHA256===b.original_extracted_text_SHA256&&JSON.stringify([k?.extracted_source_first_line_start,k?.extracted_source_first_line_end])===JSON.stringify(b.original_extracted_text_line_range),'PDF derived original source atom SHA and line span '+ix);
  if(k)hashChecked++;
  const mapped=b.source_first_group_ids||[],claimed=b.existing_original_SSC_owner_ids||[];
  const union=new Set;
  for(const id of mapped){
   const z=sources.get(id);t(!!z&&z?.pdf_pages_zero_based?.includes(p),'original per-page source-first group route '+ix+'/'+id);
   groupUnion.add(id);for(const x of z?.SSC_ids||[])union.add(x);
  }
  t(claimed.length===union.size&&claimed.every(x=>union.has(x)&&ssIDs.has(x)),'source-specific exact original block-to-SSC member set '+b.atom_id);
  for(const x of union)ownerUnion.add(x);
  const isProv=b.disposition==='FROZEN_SOURCE_IDENTITY_OR_REVISION_METADATA',isNonload=b.disposition==='DEFENSIBLE_NONLOAD_EXCLUSION',isLoad=b.disposition===status;
  t(isProv||isNonload||isLoad,'source first block disposition type '+ix);
  t(b.full_original_formula_symbol_cell_cold_review_complete===false,'no false cold qualified source block '+ix);
  t(isLoad?b.load_bearing===true&&mapped.length>0:isNonload?b.load_bearing===false:b.load_bearing===false,'original source nonload/authority/meaning role '+ix);
  if(isNonload||isProv)t(claimed.length===0||b.atom_id==='L02-P10-B008','only legitimate source provenance/exclusion SSC owner handling '+ix);
  statusCount[b.disposition]=(statusCount[b.disposition]||0)+1;
 }
 t(hashChecked===81&&groupUnion.size===59&&ownerUnion.size===21,'all source atom SHA and 59 /21 bidirectional original source owners');
 t(statusCount.FROZEN_SOURCE_IDENTITY_OR_REVISION_METADATA===3&&statusCount.DEFENSIBLE_NONLOAD_EXCLUSION===16&&statusCount[status]===62,'source first original 81 classifications reconciled');
 const special=find(crows,'L02-P03-B003','atom_id');
 t(special?.source_first_group_ids?.join(',')==='L02-S011'&&special?.existing_original_SSC_owner_ids?.join(',')==='L-SSC-052'&&special?.original_source_semantic_capture_gap?.includes('1_32'),'independent original unnumbered Eq1 second action term original->SSC');
 t(o?.schema==='isograph.track-L.G0.L02-frozen-v2-original-unnumbered-BPhiB-component.v0.1'&&o?.original_primary?.original_layout_sha256===special?.original_extracted_text_SHA256&&o?.original_primary?.revision==='arXiv:1004.4866v2','authoritative original source bytes+P03-B003 component packet');
 t(o?.author_original_component_claim?.numeric_coefficient==='1/32'&&o?.author_original_component_claim?.original_epsilon_indices?.join(',')==='mu,nu,rho,sigma'&&o?.author_original_component_claim?.Phi_output_spacetime_indices?.join(',')==='phi,chi'&&o?.author_original_component_claim?.second_B_indices?.join(',')==='phi,chi,K,L','original 1/32 binder/operator source fidelity');
 t(o?.source_modality?.Eq4_variation_distinct_from_unnumbered_second_action_term===true&&o?.preservation?.new_typed_source_item_created===0&&o?.G0_frozen===false,'no author source formula conflation/G0 premature closure');
 t(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.13'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.14','finite original source convergence successor');
 t(r?.source_first_predecessor?.git_blob_sha===h.oldReg&&r?.current_ssc?.git_blob_sha===h.ssc&&r?.L02_independent_original_81_block_role_crosswalk?.git_blob_sha===h.cross&&r?.L02_unnumbered_BPhiB_source_repair?.git_blob_sha===h.original,'six source census convergence exact refs');
 t(r?.per_source?.length===6&&r?.per_source?.reduce((q,z)=>q+z.source_first_location_units,0)===350&&r?.per_source?.every(z=>z.original_complete_cold_review_passed===false),'six frozen source 350-unit conservation and none whole cold');
 t(r?.explicit_locks?.G0_frozen===false&&r?.explicit_locks?.G1_authorized===false,'G0 open');
 t(pt?.schema==='lisi.full-treatment.source-traversal-ledger.v0.30'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.31'&&v?.predecessor_exact?.git_blob_sha===h.oldTr,'exact source traversal parent');
 t(v?.current_census?.git_blob_sha===h.ssc&&v?.current_L02_source_first_inventory?.git_blob_sha===h.inv&&v?.current_L02_81_source_atom_roles?.git_blob_sha===h.cross&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===h.reg&&v?.complete_sources===0,'source traversal semantic progress not premature closure');
 t(pg?.schema==='isograph.exp062-l-current-stage-gate.v0.102'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.103'&&g?.predecessor_gate?.git_blob_sha===h.oldGate,'current stage gate authority parent');
 t(g?.source_packet?.git_blob_sha===h.original&&g?.source_block_crosswalk?.git_blob_sha===h.cross&&g?.source_verifier?.git_blob_sha===h.self&&g?.current_source_census?.git_blob_sha===h.ssc&&g?.current_convergence?.git_blob_sha===h.reg&&g?.source_first_inventory?.git_blob_sha===h.inv,'stage gate exact source+verifier pins');
 t(g?.prior_81_source_original_replay_CI?.run_id===38091968685&&g?.prior_81_source_original_replay_CI?.conclusion==='success'&&g?.prior_81_source_original_replay_CI?.hostiles_rejected===20,'prior source original hash replay qual scope');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'new G0 not prequalified');
 return err;
}
function sourcePDFControl(src,wholePage){
 const issues=[],t=(v,m)=>{if(!v)issues.push(m);};
 const s=src.replace(/\s+/g,' '),page=(wholePage||'').replace(/\s+/g,' ');
 t(page.includes('Written out with indices, the second term in the action is'),'frozen original prose explicitly second action term');
 t(/Φ/.test(s)&&/B/.test(s)&&/ǫ/.test(s),'frozen original component Phi, two B and epsilon');
 t(/1\s*32/.test(s),'frozen original 1/32 component coefficient');
 t(page.includes('Varying')&&page.includes('field equations'),'not misattribute original component to Eq4');
 return issues;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02-original-BPhiB-'));
let originalPart='',pageOriginal='';
try{
 const res=await fetch('https://arxiv.org/pdf/1004.4866v2',{signal:AbortSignal.timeout(35000)});
 if(res.status!==200)throw Error('FROZEN_V2_SOURCE_HTTP_'+res.status);
 const b=Buffer.from(await res.arrayBuffer()),digest=sha(b);
 if(digest!=='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a')throw Error('FROZEN_SOURCE_SHA256_MISMATCH');
 const pdf=path.join(dir,'source.pdf');fs.writeFileSync(pdf,b);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*12$/m.test(info))throw Error('FROZEN_V2_PAGES_MISMATCH');
 const txt=execFileSync('pdftotext',['-f','3','-l','3','-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1500000});pageOriginal=txt;
 const lines=txt.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const unit=D.layout.pages[2].blocks.find(x=>x.atom_id==='L02-P03-B003');
 originalPart=lines.slice(unit.extracted_source_first_line_start-1,unit.extracted_source_first_line_end).join('\n');
 if(sha(Buffer.from(originalPart))!==unit.original_extracted_text_SHA256)throw Error('PRIMARY_ORIGINAL_COMPONENT_BLOCK_SHA_MISMATCH');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=check(D).concat(sourcePDFControl(originalPart,pageOriginal));
const tests=[
 ['erase_source_block',d=>d.cross.original_source_blocks.pop()],
 ['forge_original_block_sha',d=>find(d.cross.original_source_blocks,'L02-P03-B003','atom_id').original_extracted_text_SHA256='bad'],
 ['erase_block_SSC_owner',d=>find(d.cross.original_source_blocks,'L02-P03-B003','atom_id').existing_original_SSC_owner_ids=[]],
 ['incorrect_source_group',d=>find(d.cross.original_source_blocks,'L02-P03-B003','atom_id').source_first_group_ids=['L02-S012']],
 ['invent_uncited_SSC',d=>find(d.cross.original_source_blocks,'L02-P03-B003','atom_id').existing_original_SSC_owner_ids.push('L-SSC-999')],
 ['alter_original_block_role',d=>find(d.cross.original_source_blocks,'L02-P03-B003','atom_id').load_bearing=false],
 ['forge_original_block_G0_cold',d=>d.cross.counts.qualified_full_original_formula_cell_semantic_cold_blocks=81],
 ['reclassify_nonload_as_load',d=>find(d.cross.original_source_blocks,'L02-P01-B003','atom_id').disposition=status],
 ['alter_original_version_date',d=>d.cross.original_source.revision_note='source silently upgraded'],
 ['original_source_wrong_revision',d=>d.original.original_primary.revision='arXiv:1004.4866v1'],
 ['source_coefficient_wrong',d=>d.original.author_original_component_claim.numeric_coefficient='1/16'],
 ['source_epsilon_order_wrong',d=>d.original.author_original_component_claim.original_epsilon_indices.reverse()],
 ['source_left_B_wrong',d=>d.original.author_original_component_claim.first_B_indices.pop()],
 ['source_output_B_wrong',d=>d.original.author_original_component_claim.second_B_indices=['mu','nu','K','L']],
 ['source_eq4_conflated',d=>d.original.source_modality.Eq4_variation_distinct_from_unnumbered_second_action_term=false],
 ['alter_untouched_inv_row',d=>d.inv.source_first_locations[0].original_source_semantic_group+=' false'],
 ['erase_inv_BPhiB',d=>find(d.inv.source_first_locations,'L02-S011','source_location_id').original_source_semantic_group='generic action'],
 ['delete_inv_owner',d=>find(d.inv.source_first_locations,'L02-S011','source_location_id').SSC_ids=[]],
 ['rewrite_untouched_SSC',d=>find(d.ssc.items,'L-SSC-001').body+=' changed'],
 ['erase_SSC_1_32',d=>find(d.ssc.items,'L-SSC-052').body='anonymous operator'],
 ['add_SSC_identity',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['erase_source_provenance',d=>find(d.ssc.items,'L-SSC-052').source_expression_census.L02_ORIGINAL_UNNUMBERED_BPHIB_COMPONENT_0_1.original_inverse.git_blob_sha='bad'],
 ['delete_L03_fidelity_debt',d=>d.reg.per_source.find(x=>x.source==='L03').original_complete_cold_review_passed=true],
 ['forge_global_freeze',d=>d.reg.exit_acceptance_contract.G0_SSC_frozen=true],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true]
];
let rejected=0;
for(const [name,mutate]of tests){
 const copy=JSON.parse(JSON.stringify(D));
 try{mutate(copy);if(check(copy).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name);}
 catch(e){errors.push('HOSTILE_ERROR_'+name+':'+String(e));}
}
for(const [name,changed]of [['original_coefficient',originalPart.replace(/1\s*32/,'1/16')],['original_operator',originalPart.replaceAll('Φ','X')]]){
 if(changed===originalPart)errors.push('INERT_PDF_HOSTILE_'+name);
 else if(sourcePDFControl(changed,pageOriginal).length)rejected++;
 else errors.push('ORIGINAL_PDF_HOSTILE_ESCAPED_'+name);
}
const result={schema:'isograph.exp062.L.G0.L02.81-source-block-and-BPhiB-original.v0.1',
 pass:errors.length===0,issues:errors,original_v2_PDF_SHA256_verified:true,
 source_original_81_blocks_crosswalked:81,source_first_original_groups:59,source_SSC_identities:21,
 SSC_unchanged_entire_records:190,source_underindexed_locus:'L02-P03-B003',
 unnumbered_coefficient_source:'1/32',source_author_mathematical_assertions_proved:false,
 six_original_complete_cold_review_count:0,hostiles_defined:tests.length+2,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
