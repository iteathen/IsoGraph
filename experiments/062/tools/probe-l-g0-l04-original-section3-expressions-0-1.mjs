// Frozen original L04 §3 exact source expression locator, G0 source evidence only.
// Independently reextract p6–7, verify immutable original PDF/page/block bytes,
// and emit original symbolic transcript for source-first comparison before SSC edits.
// Does NOT source-complete the 17-page original or qualify author physics.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const manifest=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/lisi/L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8'));
const z=manifest.original_sources[3],expected='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
if(z.id!=='L04'||z.revision!=='arXiv:2407.02497v2'||z.PDF_SHA256!==expected||z.PDF_byte_count!==348134||z.original_pdf_extracted_pages.length!==17)throw Error('WRONG_FROZEN_L04_SOURCE');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-3-original-source-proof-'));
let checks=0;
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('HISTORICAL_L04_HTTP_'+response.status);
 const bin=Buffer.from(await response.arrayBuffer());
 if(bin.length!==348134||sha(bin)!==expected)throw Error('INVALID_HISTORICAL_L04_PDF_BYTES');
 const pdf=path.join(dir,'frozen-L04.pdf');fs.writeFileSync(pdf,bin);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('NOT_17_PAGE_FROZEN_L04');
 for(const page of [6,7]){
  const raw=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:14000,maxBuffer:2000000});
  const old=z.original_pdf_extracted_pages[page-1];
  if(sha(Buffer.from(raw))!==old.original_extracted_page_SHA256)throw Error('FROZEN_L04_PAGE_MISMATCH_'+page);
  const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  for(const block of old.blocks){
   const original=lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n');
   if(sha(Buffer.from(original))!==block.original_source_block_SHA256)throw Error('ORIGINAL_BLOCK_SHA_MISMATCH_'+block.source_atom_id);
   checks++;
   if(block.source_atom_id.endsWith('-B008')||block.source_atom_id.endsWith('-B006')&&page===7)continue;
   console.log('L04_SECTION3_ORIGINAL_BLOCK_BEGIN '+JSON.stringify({id:block.source_atom_id,page,source_sha256:expected,block_sha256:block.original_source_block_SHA256,lines:[block.original_extracted_line_start,block.original_extracted_line_end]}));
   console.log(original);
   console.log('L04_SECTION3_ORIGINAL_BLOCK_END '+block.source_atom_id);
  }
  const rawReading=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-raw','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:14000,maxBuffer:2000000});
  console.log('L04_SECTION3_ORIGINAL_PAGE_META '+JSON.stringify({page,layout_sha256:old.original_extracted_page_SHA256,raw_reading_sha256:sha(Buffer.from(rawReading)),original_visual_review_CI:38120301520,complete_semantic_cold_review:false}));
  console.log('L04_SECTION3_ORIGINAL_RAW_BEGIN_PAGE_'+page);
  console.log(rawReading.slice(0,14000));
  console.log('L04_SECTION3_ORIGINAL_RAW_END_PAGE_'+page);
 }
 console.log('L04_SECTION3_SOURCE_PROBE '+JSON.stringify({PASS:true,frozen_revision:'arXiv:2407.02497v2',PDF_SHA256:expected,original_pages_reverified:[6,7],original_source_blocks_verified:checks,stage:'G0',SSC_revised:false,G0_frozen:false,G1_authorized:false}));
}finally{fs.rmSync(dir,{recursive:true,force:true});}
