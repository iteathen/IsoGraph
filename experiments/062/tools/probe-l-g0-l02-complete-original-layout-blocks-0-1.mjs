// Lisi G0: derive an ORIGINAL-first complete layout-block denominator from frozen
// arXiv:1004.4866v2 PDF bytes. Does not use SSC to define or omit source blocks.
// A text block is a locator, NOT a complete semantic occurrence or cold-review pass.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const sourceURL='https://arxiv.org/pdf/1004.4866v2';
const frozen='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sourceCounts={L02:12,sourceFirstGroups:59,SSCIdentities:21};
function fromPage(page,raw){
 const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const blocks=[],nonempty=[],blank=[];
 let start=null,buffer=[];
 const flush=end=>{
  if(start===null)return;
  const text=buffer.join('\n'),tokens=text.match(/\S+/g)||[];
  blocks.push({atom_id:'L02-P'+String(page).padStart(2,'0')+'-B'+String(blocks.length+1).padStart(3,'0'),
   pdf_page_zero_based:page-1,within_page_block_ordinal:blocks.length+1,
   extracted_source_first_line_start:start+1,extracted_source_first_line_end:end,
   original_extracted_text_SHA256:sha(Buffer.from(text)),
   exact_nonblank_line_count:buffer.length,characters:text.length,tokens:tokens.length,
   apparent_numbered_equation_label_candidates:[...new Set([...text.matchAll(/\(\s*(?:[1-9]|[12]\d|30)\s*\)/g)].map(x=>x[0].replace(/[\s()]/g,'')))],
   source_semantic_review_disposition:'ORIGINAL_TEXT_LAYOUT_ATOM_ONLY_SEMANTIC_ADJUDICATION_PENDING'});
  start=null;buffer=[];
 };
 for(let n=0;n<lines.length;n++){
  const line=lines[n],occupied=line.trim().length>0;
  if(occupied){nonempty.push(n+1);if(start===null)start=n;buffer.push(line);}
  else{blank.push(n+1);flush(n);}
 }
 flush(lines.length);
 return {page_zero_based:page-1,source_extracted_text_SHA256:sha(Buffer.from(raw)),extracted_total_lines:lines.length,nonblank_lines:nonempty.length,blank_lines:blank.length,original_first_blocks:blocks.length,blocks,source_semantic_complete:false};
}
function validate(x){
 const bad=[],t=(yes,msg)=>{if(!yes)bad.push(msg);};
 t(x?.schema==='isograph.track-L.G0.L02-original-PDF-source-layout-block-first.v0.1','original source atom schema');
 t(x?.source?.revision==='arXiv:1004.4866v2'&&x?.source?.SHA256===frozen&&x?.source?.page_count===12,'frozen source bytes/authority');
 t(x?.pages?.length===12&&x?.original_first_block_count>=12,'all 12 page original blocks meaningful');
 let blocks=0,nonblank=0;const seen=new Set;
 for(let p=0;p<12;p++){
  const page=x.pages?.[p];
  t(page?.page_zero_based===p&&page?.blocks?.length===page?.original_first_blocks,'original page atomic order '+p);
  const occupied=new Set,labels=[];
  for(let j=0;j<(page?.blocks||[]).length;j++){
   const z=page.blocks[j];
   t(z?.pdf_page_zero_based===p&&z?.within_page_block_ordinal===j+1,'block chronological source address '+p+'/'+j);
   t(z?.atom_id==='L02-P'+String(p+1).padStart(2,'0')+'-B'+String(j+1).padStart(3,'0'),'stable source atom address '+p+'/'+j);
   t(/^[0-9a-f]{64}$/.test(z?.original_extracted_text_SHA256||'')&&z?.characters>0&&z?.tokens>0,'source extracted block has bytes/hash '+p+'/'+j);
   t(z?.source_semantic_review_disposition==='ORIGINAL_TEXT_LAYOUT_ATOM_ONLY_SEMANTIC_ADJUDICATION_PENDING','cannot promote source semantic cold just by layout extraction');
   const start=z?.extracted_source_first_line_start,end=z?.extracted_source_first_line_end;
   t(Number.isInteger(start)&&Number.isInteger(end)&&start>=1&&end>=start&&end<=page.extracted_total_lines,'source locator range '+p+'/'+j);
   for(let k=start;k<=end;k++){t(!occupied.has(k),'duplicate source line '+p+'/'+k);occupied.add(k);}
   t(end-start+1===z?.exact_nonblank_line_count,'original text block lines '+p+'/'+j);
   t(!seen.has(z?.atom_id),'unique original block '+p+'/'+j);seen.add(z?.atom_id);
   blocks++;nonblank+=z?.exact_nonblank_line_count||0;
   labels.push(...(z?.apparent_numbered_equation_label_candidates||[]));
  }
  t(occupied.size===page?.nonblank_lines,'all original nonblank text lines owned once '+p);
  t(page?.extracted_total_lines===page?.nonblank_lines+page?.blank_lines,'original blank/nonblank partition '+p);
  t(/^[0-9a-f]{64}$/.test(page?.source_extracted_text_SHA256||''),'source original extracted page hash '+p);
 }
 t(blocks===x?.original_first_block_count&&nonblank===x?.original_extracted_nonblank_lines,'global original block and line conservation');
 t(x?.source_own_claimed_global_semantic_completeness===false&&x?.original_source_whole_PDF_cold_review_complete===false&&x?.G0_frozen===false&&x?.G1_authorized===false,'source layout not falsely a semantic G0 pass');
 return bad;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02-v2-source-atoms-'));
try{
 const resp=await fetch(sourceURL,{signal:AbortSignal.timeout(35000)});
 if(resp.status!==200)throw Error('FROZEN_SOURCE_FETCH_HTTP_'+resp.status);
 const bytes=Buffer.from(await resp.arrayBuffer());
 if(sha(bytes)!==frozen)throw Error('FROZEN_SOURCE_BINARY_SHA256_MISMATCH');
 const pdf=path.join(dir,'original-L02-v2.pdf');
 fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:14000});
 if(!/^Pages:\s*12$/m.test(info))throw Error('ORIGINAL_12_PAGE_COUNT_MISMATCH');
 const pages=[];
 for(let p=1;p<=12;p++){
  const text=execFileSync('pdftotext',['-f',String(p),'-l',String(p),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:14000,maxBuffer:2000000});
  pages.push(fromPage(p,text));
 }
 const result={schema:'isograph.track-L.G0.L02-original-PDF-source-layout-block-first.v0.1',
  date:'2026-10-10',track:'L',stage:'G0',semantic_authority:false,
  source:{id:'L02',revision:'arXiv:1004.4866v2',official_url:sourceURL,SHA256:frozen,raw_pdf_bytes:bytes.length,page_count:12},
  extraction:{tool:'Poppler pdftotext -f P -l P -layout -enc UTF-8 original.pdf -',version_context:'ubuntu-24.04 poppler-utils actual source runner revision',page_body_hashes_original_source_not_SSC_derived:true,layout_blocks_delimited_by_blank_extracted_lines:true,source_is_visual_PDF_first_and_text_extraction_is_an_approximation:true},
  source_first_scope:{original_source_pages:12,previous_source_first_semantic_groups:59,existing_ssc_owner_ids:21,source_first_groups_59_not_used_to_partition_PDF:true},
  pages,original_first_block_count:pages.reduce((n,p)=>n+p.original_first_blocks,0),
  original_extracted_nonblank_lines:pages.reduce((n,p)=>n+p.nonblank_lines,0),
  source_own_claimed_global_semantic_completeness:false,original_source_whole_PDF_cold_review_complete:false,
  semantic_review_required:'Every original extracted source block requires independent original -> source-first group -> SSC disposition; equations/tables/figures also require visual page confirmation. This is finite locator coverage, not G0 completion.',
  G0_frozen:false,G1_authorized:false,W_semantics_imported:false};
 const errors=validate(result);let rejected=0;const mutators=[
  a=>a.pages.pop(),
  a=>a.pages[0].blocks.shift(),
  a=>a.pages[1].blocks[0].original_extracted_text_SHA256='bad',
  a=>a.pages[2].blocks[0].source_semantic_review_disposition='ORIGINAL_SEMANTIC_COLD_COMPLETE',
  a=>a.pages[3].nonblank_lines=0,
  a=>a.pages[4].blocks[0].extracted_source_first_line_start=999999,
  a=>a.pages[5].blocks[0].atom_id='L02-P01-B001',
  a=>a.pages[6].blank_lines=0,
  a=>a.pages[7].blocks[0].original_extracted_text_SHA256='0'.repeat(63),
  a=>a.source.SHA256='wrong',
  a=>a.original_first_block_count=0,
  a=>a.source_own_claimed_global_semantic_completeness=true,
  a=>a.G1_authorized=true
 ];
 for(let k=0;k<mutators.length;k++){
  const c=JSON.parse(JSON.stringify(result));mutators[k](c);
  if(validate(c).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+k);
 }
 console.log('L02_ORIGINAL_FIRST_LAYOUT_MANIFEST_BEGIN');
 console.log(JSON.stringify(result,null,2));
 console.log('L02_ORIGINAL_FIRST_LAYOUT_MANIFEST_END');
 console.log('L02_LAYOUT_ATOM_VERIFICATION',JSON.stringify({success:errors.length===0,issues:errors,hostiles_defined:mutators.length,hostiles_rejected:rejected,blocks:result.original_first_block_count,original_nonblank_lines:result.original_extracted_nonblank_lines,complete:false,G1_authorized:false}));
 if(errors.length)process.exitCode=1;
}finally{fs.rmSync(dir,{recursive:true,force:true});}
