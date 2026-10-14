// Track L only, G0: independently cold-traverse every original frozen L03 v1
// text block from the 167-page all-source manifest. Emit bounded original
// preview and original source-block hashes, NEVER imply formula-cell theorem
// or complete source-semantic cold qualification from text extraction.
import fs from 'node:fs';import crypto from 'node:crypto';
import os from 'node:os';import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const manifestPath=P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json';
const sourceInv=P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json';
const SSC=P+'SOURCE_SEMANTIC_CENSUS_0_64.json';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const gitSHA=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
if(gitSHA(manifestPath)!=='1ff8ff04547a938b19c7530de7741c3f1eec54a9')throw Error('SIX_SOURCE_ORIGINAL_PDF_MANIFEST_UNPINNED');
if(gitSHA(sourceInv)!=='701a482b077f2e66dcb94ae06c2590f2fc0f7000')throw Error('L03_CURRENT_SOURCE_FIRST_GROUPS_CHANGED');
if(gitSHA(SSC)!=='79a562e02f4410fe30c64676733438d1e08a92b7')throw Error('L_SSC064_CHANGED');
const all=read(manifestPath),s=all.original_sources[2],inv=read(sourceInv),ssc=read(SSC);
const originals=inv.original_first_locations||[],owners=new Set,ids=new Set(ssc.items.map(x=>x.id));
if(s?.id!=='L03'||s?.revision!=='arXiv:1006.4908v1'||s?.PDF_SHA256!=='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e'||s?.original_PDF_pages!==14||s?.original_pdf_layout_blocks!==94)throw Error('L03_NOT_EXACT_ORIGINAL14PAGE_94BLOCK_REV');
if(originals.length!==47||ids.size!==191)throw Error('SOURCE_OR_SSC_COUNT_DRIFT');
for(const o of originals){if(!o.source_location_id?.startsWith('L03-S')||typeof o.load_bearing!=='boolean'||!Array.isArray(o.SSC_ids)||(o.load_bearing&&o.SSC_ids.length===0))throw Error('L03_OWNER_OR_LOAD_BEFORE_READING_ORIGINAL');for(const owner of o.SSC_ids){if(!ids.has(owner))throw Error('FRAUDULENT_SSC_OWNER_'+owner);owners.add(owner)}}
if(owners.size!==26)throw Error('L03_26_SSC_OWNER_DIVERGENCE');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L03-original-v1-'));let previews=[],pageRecords=[];
function previewPart(lines){
 const v=lines.map(x=>x.trim()).filter(Boolean);return v.length?{opening:v.slice(0,2).join(' ').slice(0,160),closing:v.slice(-2).join(' ').slice(-160)}:{opening:'',closing:''};
}
try{
 const response=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('L03_FROZEN_PDF_HTTP_'+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(sha(bytes)!==s.PDF_SHA256||bytes.length!==s.PDF_byte_count)throw Error('L03_OFFICIAL_FROZEN_V1_PDF_BYTES_MISMATCH');
 const pdf=path.join(dir,'L03-v1.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*14$/m.test(info))throw Error('L03_FROZEN_14_PAGE_COUNT_MISMATCH');
 for(let p=0;p<14;p++){
  const actual=execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:14000,maxBuffer:1800000});
  const old=s.original_pdf_extracted_pages[p];
  if(sha(Buffer.from(actual))!==old.original_extracted_page_SHA256)throw Error('L03_ORIGINAL_PAGE_SHA_CHANGED_'+p);
  const lines=actual.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  let seen=0;
  for(const b of old.blocks){
   const start=b.original_extracted_line_start-1,end=b.original_extracted_line_end,part=lines.slice(start,end);
   if(sha(Buffer.from(part.join('\n')))!==b.original_source_block_SHA256)throw Error('L03_ORIGINAL_BLOCK_HASH_MISMATCH_'+b.source_atom_id);
   if(part.length!==b.source_block_nonblank_lines)throw Error('L03_ORIGINAL_BLOCK_LINE_MISMATCH_'+b.source_atom_id);
   seen+=part.length;
   const excerpt=previewPart(part);
   previews.push({
    source_atom_id:b.source_atom_id,source_PDF_page_zero_based:p,original_source_line_range:[b.original_extracted_line_start,b.original_extracted_line_end],
    original_text_SHA256:b.original_source_block_SHA256,
    source_text_characters:b.source_block_characters,
    equation_candidates:b.possible_numbered_formula_labels,
    original_bounded_excerpt:excerpt,
    disposition:'ORIGINAL_FIRST_BLOCK_LOCATED_SEMANTIC_ROLE_AND_MATRIX_EXACTNESS_PENDING',
    original_source_provenance_frozen:true,SSCs_not_assumed_from_excerpt:true});
  }
  if(seen!==old.source_extracted_nonblank_lines)throw Error('ORIGINAL_NONBLANK_PAGE_COVERAGE_'+p);
  pageRecords.push({page_zero_based:p,sha:old.original_extracted_page_SHA256,blocks:old.source_layout_blocks,nonblank:seen});
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
if(previews.length!==94||pageRecords.reduce((n,x)=>n+x.nonblank,0)!==806)throw Error('L03_94_TEXT_ATOMS_ORIGINAL_COVERAGE');
const result={schema:'isograph.exp062.L.G0.L03.frozen-14-page-original-first-94-block-preview.v0.1',
 track:'L',stage:'G0',semantic_authority:false,original_revision:'arXiv:1006.4908v1',
 exact_original_PDF_SHA256:s.PDF_SHA256,source_papers:1,source_pages:14,original_pdf_text_layout_blocks:94,source_original_nonblank_lines:806,
 parent_all_six_original_source_manifest_blob:'1ff8ff04547a938b19c7530de7741c3f1eec54a9',
 source_first_source_groups_47:47,existing_source_SSC_owners_26:26,
 sources_mathematical_formula_cells_semantically_completed:0,
 independently_complete_original_papers_qualified:0,
 original_page_records:pageRecords,
 existing_source_loci:originals.map(x=>({id:x.source_location_id,source_locator:x.original_source_locator,
 meaning:x.source_semantic_group,existing_source_owner_SSC_IDs:x.SSC_ids,disposition:x.disposition})),
 original_text_block_previews:previews,
 G0_complete:false,G0_frozen:false,G1_authorized:false,W_semantics_imported:false};
const violations=[],checks=[
 ['drop_source_block',x=>x.original_text_block_previews.pop()],
 ['wrong_PDF_hash',x=>x.exact_original_PDF_SHA256='bad'],
 ['forge_locus',x=>x.existing_source_loci[0].id='L03-S999'],
 ['change_source_body',x=>x.existing_source_loci[0].meaning='unindexed'],
 ['erase_SSC_owner',x=>x.existing_source_loci[0].existing_source_owner_SSC_IDs=[]],
 ['forge_source_cold',x=>x.independently_complete_original_papers_qualified=1],
 ['premature_G1',x=>x.G1_authorized=true],
 ['invent_G0',x=>x.G0_complete=true],
 ['alter_source_excerpt',x=>x.original_text_block_previews[0].original_bounded_excerpt.opening='fake original source']
];
function check(x){
 const errors=[],t=(v,msg)=>{if(!v)errors.push(msg)};
 t(x?.schema===result.schema&&x?.track==='L'&&x?.stage==='G0','stage');
 t(x?.exact_original_PDF_SHA256===s.PDF_SHA256&&x?.source_pages===14&&x?.source_original_nonblank_lines===806,'exact frozen original PDF');
 t(x?.original_text_block_previews?.length===94&&x?.original_page_records?.length===14,'all original source blocks present');
 for(let p=0;p<14;p++){
  const saved=x?.original_page_records?.[p],original=s.original_pdf_extracted_pages[p];
  t(saved?.sha===original.original_extracted_page_SHA256&&saved?.blocks===original.source_layout_blocks&&saved?.nonblank===original.source_extracted_nonblank_lines,'original source page hash '+p);
 }
 for(let k=0;k<94;k++){
  const saved=x?.original_text_block_previews?.[k],pristine=previews[k];
  t(saved?.source_atom_id===pristine.source_atom_id&&saved?.original_text_SHA256===pristine.original_text_SHA256&&JSON.stringify(saved?.original_source_line_range)===JSON.stringify(pristine.original_source_line_range)&&JSON.stringify(saved?.original_bounded_excerpt)===JSON.stringify(pristine.original_bounded_excerpt),'source exact text block and original-bounded excerpt '+k);
 }
 t(x?.existing_source_loci?.length===47,'all 47 source-first groups');
 for(let k=0;k<47;k++){
  const saved=x?.existing_source_loci?.[k],original=originals[k];
  t(saved?.id===original.source_location_id&&saved?.meaning===original.source_semantic_group&&JSON.stringify(saved?.existing_source_owner_SSC_IDs)===JSON.stringify(original.SSC_ids),'source row body/owner exact '+k);
 }
 t(x?.sources_mathematical_formula_cells_semantically_completed===0&&x?.independently_complete_original_papers_qualified===0&&x?.G0_complete===false&&x?.G0_frozen===false&&x?.G1_authorized===false,'G0 no artificial closure');
 return errors;
}
const issues=check(result);let rejected=0;
for(const [name,fn]of checks){const test=JSON.parse(JSON.stringify(result));try{fn(test);if(check(test).length)rejected++;else issues.push('ESCAPED_'+name)}catch(e){issues.push('HOSTILE_ERROR_'+name+':'+String(e))}}
console.log('L03_FROZEN_94_SOURCE_BLOCK_PREVIEW_BEGIN');
console.log(JSON.stringify(result,null,2));
console.log('L03_FROZEN_94_SOURCE_BLOCK_PREVIEW_END');
console.log('L03_FROZEN_94_SOURCE_BLOCK_SUMMARY',JSON.stringify({
 success:issues.length===0,issues,original_pdf_SHA256_verified:true,source_original_pdf_pages:14,
 original_source_text_blocks:94,original_nonblank_text_lines:806,source_first_loci:47,source_SSC_roots:26,
 exact_formula_cells_qualified:0,whole_source_cold_complete:0,hostiles_defined:checks.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false}));
if(issues.length)process.exitCode=1;
