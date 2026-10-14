// Lisi G0 frozen original v2: source-first bounded text PREVIEWS per 81
// SHA-pinned original blocks for human original->SSC semantic adjudication.
// Previews are NOT the source; source is original official PDF. No G0 promotion.
import fs from 'node:fs';import crypto from 'node:crypto';
import os from 'node:os';import path from 'node:path';
import {execFileSync} from 'node:child_process';
const manifest=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/lisi/LISI_L02_FROZEN_12_PAGE_ORIGINAL_LAYOUT_ATOMIC_COVERAGE_0_1.json','utf8'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const expected='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a';
const trim=s=>s.replace(/\s+/g,' ').trim();
const bounded=s=>s.length<=130?s:s.slice(0,80)+' […] '+s.slice(-45);
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02v2-original-source-preview-'));
try{
 const response=await fetch('https://arxiv.org/pdf/1004.4866v2',{signal:AbortSignal.timeout(35000)});
 if(response.status!==200)throw Error('FROZEN_V2_PDF_HTTP_'+response.status);
 const buf=Buffer.from(await response.arrayBuffer()),sha=hash(buf);
 if(sha!==expected||manifest.source.SHA256!==sha)throw Error('ORIGINAL_SOURCE_PDF_SHA256_FAILED');
 const pdf=path.join(dir,'orig.pdf');fs.writeFileSync(pdf,buf);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*12$/m.test(info))throw Error('ORIGINAL_PAGE_COUNT_FAIL');
 const review=[],errors=[];
 let lines=0;
 for(let p=0;p<12;p++){
  const txt=execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1500000});
  const raw=txt.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  if(hash(Buffer.from(txt))!==manifest.pages[p].source_extracted_text_SHA256)errors.push('PAGE_SHA_MISMATCH_'+p);
  for(const b of manifest.pages[p].blocks){
   const first=b.extracted_source_first_line_start-1,last=b.extracted_source_first_line_end;
   const block=raw.slice(first,last),sourceText=block.join('\n');
   const sample=block.map(trim).filter(Boolean);
   if(hash(Buffer.from(sourceText))!==b.original_extracted_text_SHA256)errors.push('BLOCK_SHA_MISMATCH_'+b.atom_id);
   if(block.length!==b.exact_nonblank_line_count)errors.push('BLOCK_LINE_LENGTH_MISMATCH_'+b.atom_id);
   const fragments={
    start:bounded(sample.slice(0,2).join(' ')),
    end:bounded(sample.slice(-2).join(' ')),
    label_windows:sample.filter(s=>/\(\s*(?:[1-9]|[12]\d|30)\s*\)/.test(s)).slice(0,5).map(bounded)
   };
   review.push({atom_id:b.atom_id,page_pdf_zero_based:p,layout_lines:[b.extracted_source_first_line_start,b.extracted_source_first_line_end],chars:b.characters,source_SHA256:b.original_extracted_text_SHA256,candidate_owner_groups:b.possible_source_first_ids_on_same_original_page,fragments,semantic_review:'PENDING_SOURCE_FIRST_ADJUDICATION'});
   lines+=block.length;
  }
 }
 if(review.length!==81||lines!==614)errors.push('ORIGINAL_SOURCE_LAYOUT_DENOMINATOR_CHANGED');
 const result={schema:'isograph.exp062.L.G0.L02-original-first-block-bounded-preview.v0.1',track:'L',stage:'G0',source_revision:'arXiv:1004.4866v2',source_pdf_sha256:sha,original_source_pages:12,blocks:review.length,nonblank_lines:lines,prior_manifest_git_blob_sha:'512072e74144cbc9a0eb84b124e0d81762e3e739',whole_original_semantic_source_cold_complete:false,block_preview_to_semantic_mapping_complete:false,G0_frozen:false,G1_authorized:false,errors,records:review};
 console.log('L02_SOURCE_BLOCK_BOUNDED_PREVIEW_BEGIN');
 console.log(JSON.stringify(result,null,2));
 console.log('L02_SOURCE_BLOCK_BOUNDED_PREVIEW_END');
 if(errors.length)process.exitCode=1;
}finally{fs.rmSync(dir,{recursive:true,force:true});}
