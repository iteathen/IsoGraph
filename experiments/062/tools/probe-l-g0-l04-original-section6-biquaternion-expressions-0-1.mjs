// L-only G0 original L04 §6 independent source-first mathematical carrier audit.
// Original p12–13 SHA-frozen arXiv v2 only; reproduce each original PDF text block
// and source visual reading candidates before any SSC interpretation or promotion.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const freeze=JSON.parse(fs.readFileSync(P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8'));
const source=freeze.original_sources[3];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const expected='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
if(source?.id!=='L04'||source.revision!=='arXiv:2407.02497v2'||source.PDF_SHA256!==expected||source.PDF_byte_count!==348134||source.original_pdf_extracted_pages.length!==17)throw Error('WRONG_FROZEN_L04_SOURCE');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-S030-S031-original-'));
let count=0;
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('HISTORICAL_L04_PDF_HTTP_'+res.status);
 const bin=Buffer.from(await res.arrayBuffer());if(bin.length!==348134||hash(bin)!==expected)throw Error('ORIGINAL_L04_SHA256_WRONG');
 const pdf=path.join(tmp,'L04-original-v2.pdf');fs.writeFileSync(pdf,bin);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000})))throw Error('FROZEN_ORIGINAL_17_PAGES');
 for(const p of [12,13]){
  const raw=execFileSync('pdftotext',['-f',String(p),'-l',String(p),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1800000});
  const original=source.original_pdf_extracted_pages[p-1];
  if(hash(Buffer.from(raw))!==original.original_extracted_page_SHA256)throw Error('FROZEN_SOURCE_PAGE_SHA_'+p);
  const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  for(const b of original.blocks){
   const text=lines.slice(b.original_extracted_line_start-1,b.original_extracted_line_end).join('\n');
   if(hash(Buffer.from(text))!==b.original_source_block_SHA256)throw Error('SOURCE_BLOCK_HASH_'+b.source_atom_id);
   count++;
   if(b.source_atom_id.endsWith('-B007')||b.source_atom_id.endsWith('-B009'))continue;
   console.log('L04_SECTION6_SOURCE_BLOCK_BEGIN '+JSON.stringify({id:b.source_atom_id,page:p,lines:[b.original_extracted_line_start,b.original_extracted_line_end],SHA256:b.original_source_block_SHA256}));
   console.log(text);
   console.log('L04_SECTION6_SOURCE_BLOCK_END '+b.source_atom_id);
  }
  const rawRead=execFileSync('pdftotext',['-f',String(p),'-l',String(p),'-raw','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1800000});
  console.log('L04_SECTION6_RAW_BEGIN_PAGE_'+p);
  console.log(rawRead.slice(0,16500));
  console.log('L04_SECTION6_RAW_END_PAGE_'+p);
  console.log('L04_SECTION6_ORIGINAL_PAGE_META '+JSON.stringify({page:p,page_sha256:original.original_extracted_page_SHA256,raw_sha256:hash(Buffer.from(rawRead)),exact_source_revision:'arXiv:2407.02497v2'}));
 }
 console.log('L04_SECTION6_ORIGINAL_SOURCE_AUDIT '+JSON.stringify({PASS:true,original_frozen_PDF_SHA256:expected,source_original_pages:[12,13],source_original_block_hashes_verified:count,original_source_visual_run_id:38120301520,stage:'G0',SSC_changed:false,G0_frozen:false,G1_authorized:false,whole_original_semantic_cold_complete:false}));
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
