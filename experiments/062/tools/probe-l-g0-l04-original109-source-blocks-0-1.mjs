// Track L G0: SHA-pinned frozen L04 arXiv:2407.02497v2 full 17-page
// original source-first 109 text-block preview, independent of SSC scope.
// Source text atoms are locators, NOT a global mathematical/diagram cold proof.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const manifest=P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json';
const originalInv=P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json';
const SSC=P+'SOURCE_SEMANTIC_CENSUS_0_69.json';
const SHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
if(blob(manifest)!=='1ff8ff04547a938b19c7530de7741c3f1eec54a9')throw Error('FROZEN_SIX_OFFICIAL_PRIMARY_LAYOUT_NOT_PINNED');
if(blob(originalInv)!=='d17e883fb81664fc6ee2fd980a6aadd583c76d49')throw Error('ORIGINAL_L04_53_SOURCE_FIRST_ROWS_NOT_PINNED');
if(blob(SSC)!=='71cc26d8c98b03af77e616b54c81ce514bc445f0')throw Error('CURRENT_L_SSC069_CHANGED');
const all=read(manifest),original=all.original_sources[3],inv=read(originalInv),ssc=read(SSC);
if(original.id!=='L04'||original.revision!=='arXiv:2407.02497v2'||original.PDF_SHA256!==SHA||original.original_PDF_pages!==17||original.original_pdf_layout_blocks!==109)throw Error('L04_FROZEN_ORIGINAL_BYTE_VERSION_LAYOUT_MISMATCH');
if(inv.locations?.length!==53||ssc.items?.length!==191)throw Error('L04_OR_SSC_ORIGINAL_GROUP_COUNTS_CHANGED');
const owners=new Set,SSCs=new Set(ssc.items.map(x=>x.id));
for(const r of inv.locations){if(!r.id.startsWith('L04-S')||typeof r.source_load_bearing!=='boolean'||!Array.isArray(r.ssc_ids)||(r.source_load_bearing?r.ssc_ids.length===0:r.ssc_ids.length!==0))throw Error('L04_SOURCE_GROUP_OWNER_G0_CROSSWALK_INVALID_'+r.id);for(const sid of r.ssc_ids||[]){if(!SSCs.has(sid))throw Error('UNKNOWN_L04_SSC_OWNER_'+sid);owners.add(sid);}}
if(owners.size!==34)throw Error('L04_SOURCE_34_OWNER_MEMBERSHIP_CHANGED');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-original-PDF-first-v2-'));let previews=[],pages=[];
function part(lines){
 const used=lines.map(x=>x.trim()).filter(Boolean),first=used.slice(0,2).join(' '),last=used.slice(-2).join(' ');
 const bound=(x)=>x.length>130?x.slice(0,75)+' [context omitted] '+x.slice(-45):x;
 return {opening:bound(first),closing:bound(last)};
}
try{
 const resp=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(resp.status!==200)throw Error('ORIGINAL_FROZEN_L04_PDF_HTTP_'+resp.status);
 const b=Buffer.from(await resp.arrayBuffer());
 if(b.length!==original.PDF_byte_count||sha(b)!==SHA)throw Error('ORIGINAL_L04_FROZEN_PDF_BINARY_SHA_CHANGED');
 const file=path.join(dir,'original.pdf');fs.writeFileSync(file,b);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});if(!/^Pages:\s*17$/m.test(info))throw Error('ORIGINAL_L04_PAGES_NOT_17');
 for(let page=0;page<17;page++){
  const raw=execFileSync('pdftotext',['-f',String(page+1),'-l',String(page+1),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:14000,maxBuffer:1800000});
  const saved=original.original_pdf_extracted_pages[page];
  if(sha(Buffer.from(raw))!==saved.original_extracted_page_SHA256)throw Error('ORIGINAL_L04_PAGE_TEXT_SHA_MISMATCH_'+page);
  const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  let n=0;
  for(const atom of saved.blocks){
   const chunk=lines.slice(atom.original_extracted_line_start-1,atom.original_extracted_line_end);
   if(sha(Buffer.from(chunk.join('\n')))!==atom.original_source_block_SHA256)throw Error('ORIGINAL_L04_BLOCK_SHA_MISMATCH_'+atom.source_atom_id);
   n+=chunk.length;
   previews.push({
    source_atom_id:atom.source_atom_id,source_PDF_page_zero_based:page,
    original_extracted_line_range:[atom.original_extracted_line_start,atom.original_extracted_line_end],
    original_text_sha256:atom.original_source_block_SHA256,
    chars:atom.source_block_characters,printed_eq_label_candidates:atom.possible_numbered_formula_labels,
    original_bounded_excerpt:part(chunk),
    semantic_review_status:'ORIGINAL_TEXT_BLOCK_LOCATED_SOURCE_SEMANTIC_AND_FIGURE_INCIDENCE_COLD_PENDING'
   });
  }
  if(n!==saved.source_extracted_nonblank_lines)throw Error('NONBLANK_ORIGINAL_SOURCE_LINES_NOT_CONSERVED_'+page);
  pages.push({page_PDF_zero_based:page,page_SHA256:saved.original_extracted_page_SHA256,layout_blocks:saved.source_layout_blocks,original_nonblank_lines:n});
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const packet={schema:'isograph.exp062.L.G0.L04.original17page109textblock-source-first-v0.1',date:'2026-10-10',track:'L',stage:'G0',authority_effect:'SOURCE_FIRST_FINITE_RESEARCH_ONLY',
 frozen_primary:{id:'L04',revision:'arXiv:2407.02497v2',PDF_SHA256:SHA,pages:17,layout_blocks:109,nonblank_original_lines:848},
 source_owners:{source_group_ids:53,distinct_L04_SSC_owner_IDs:34,total_L_SSC_IDs:191,source_original_first_path:originalInv,original_first_git_blob_sha:'d17e883fb81664fc6ee2fd980a6aadd583c76d49'},
 original_frozen_6source_manifest:{path:manifest,git_blob_sha:'1ff8ff04547a938b19c7530de7741c3f1eec54a9'},
 source_first_old_53_locations:inv.locations.map(x=>({id:x.id,original_source_locator:x.source_locator,role:x.original_source_semantic_group,original_owner_SSC_ids:x.ssc_ids,load_bearing:x.source_load_bearing,disposition:x.disposition})),
 original_page_hashes:pages,original_109_block_previews:previews,
 visual_diagram_exact_edge_incidence_qualified:false,formula_cell_source_semantics_all_exact:false,whole_original_cold_review_completed:false,
 remaining_prior_selected_formula_diagram_groups:14,source_to_SSC_original_full_fidelity_PROVEN:false,SSC_to_source_original_full_fidelity_PROVEN:false,
 G0_frozen:false,G1_authorized:false,W_semantics_imported:false,PR70_merge_authorized:false
};
function check(x){
 let issues=[],t=(b,m)=>{if(!b)issues.push(m)};
 t(x?.schema===packet.schema&&x?.frozen_primary?.revision==='arXiv:2407.02497v2'&&x?.frozen_primary?.PDF_SHA256===SHA&&x?.frozen_primary?.pages===17&&x?.frozen_primary?.layout_blocks===109,'original source exact frozen revision/size');
 t(x?.source_owners?.source_group_ids===53&&x?.source_owners?.distinct_L04_SSC_owner_IDs===34&&x?.source_owners?.total_L_SSC_IDs===191,'all original owner groups');
 t(x?.original_109_block_previews?.length===109&&x?.original_page_hashes?.length===17&&x?.source_first_old_53_locations?.length===53,'finite first original source coverage');
 for(let i=0;i<17;i++)t(x?.original_page_hashes?.[i]?.page_SHA256===packet.original_page_hashes[i].page_SHA256&&x?.original_page_hashes?.[i]?.layout_blocks===packet.original_page_hashes[i].layout_blocks,'original frozen page SHA/block conservation '+i);
 for(let i=0;i<109;i++){const saved=x?.original_109_block_previews?.[i],canonical=previews[i];t(saved?.source_atom_id===canonical.source_atom_id&&saved?.original_text_sha256===canonical.original_text_sha256&&JSON.stringify(saved?.original_bounded_excerpt)===JSON.stringify(canonical.original_bounded_excerpt),'exact original source text block '+i);}
 for(let i=0;i<53;i++){const saved=x?.source_first_old_53_locations?.[i],old=packet.source_first_old_53_locations[i];t(JSON.stringify(saved)===JSON.stringify(old),'old L04 source semantics body/owner conserved '+i);}
 t(x?.remaining_prior_selected_formula_diagram_groups===14&&x?.whole_original_cold_review_completed===false&&x?.visual_diagram_exact_edge_incidence_qualified===false&&x?.G0_frozen===false&&x?.G1_authorized===false,'original L04 exact math/diagram and stage remain unqualified');
 return issues;
}
const baseline=check(packet),errors=[...baseline],hostiles=[
 ['drop_original_block',d=>d.original_109_block_previews.pop()],
 ['alter_source_excerpt',d=>d.original_109_block_previews[10].original_bounded_excerpt.opening='fake'],
 ['alter_source_sha',d=>d.original_109_block_previews[22].original_text_sha256='fake'],
 ['wrong_frozen_version',d=>d.frozen_primary.revision='arXiv:2407.02497v1'],
 ['delete_original_page',d=>d.original_page_hashes.pop()],
 ['alter_original_page_hash',d=>d.original_page_hashes[2].page_SHA256='bad'],
 ['forge_orig_source_role',d=>d.source_first_old_53_locations[0].role='other math'],
 ['delete_SSC_owner',d=>d.source_first_old_53_locations[2].original_owner_SSC_ids=[]],
 ['change_exact_source_debt',d=>d.remaining_prior_selected_formula_diagram_groups=0],
 ['invent_original_diagram_cold_pass',d=>d.visual_diagram_exact_edge_incidence_qualified=true],
 ['invent_whole_G0',d=>d.whole_original_cold_review_completed=true],
 ['promote_G1',d=>d.G1_authorized=true]
];
let rejected=0;
if(baseline.length)errors.push('INVALID_HOSTILE_INTERPRETATION_WHEN_BASELINE_FALSE');
else for(const [name,modify]of hostiles){const v=JSON.parse(JSON.stringify(packet));try{modify(v);if(check(v).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name)}catch(e){errors.push('HOSTILE_EXCEPTION_'+name+':'+String(e))}}
console.log('L04_FROZEN_ORIGINAL_109_SOURCE_BLOCKS_BEGIN');
console.log(JSON.stringify(packet,null,2));
console.log('L04_FROZEN_ORIGINAL_109_SOURCE_BLOCKS_END');
console.log('L04_FROZEN_ORIGINAL_109_SOURCE_BLOCK_SUMMARY',JSON.stringify({pass:errors.length===0,issues:errors,original_SHA256_verified:true,pages:17,original_text_blocks:109,nonblank_original_lines:848,source_first_groups:53,distinct_SSC_owners:34,remaining_selected_exact_source_groups:14,full_original_L04_cold_complete:false,hostiles_defined:hostiles.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false}));
if(errors.length)process.exitCode=1;
