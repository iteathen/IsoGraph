// Lisi G0: inspect ALL 17 frozen original L04 PDF pages directly.
// Only SHA256-locked arXiv:2407.02497v2. This is visual evidence,
// not a qualified original-source semantic cold pass by itself.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const manifest=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/lisi/L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8'));
const original=manifest.original_sources[3];
const sourceSHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const chunk=Number(process.env.L04_COLD_CHUNK);
if(!Number.isInteger(chunk)||chunk<0||chunk>4)throw Error('INVALID_17_PAGE_CHUNK');
if(original?.id!=='L04'||original.revision!=='arXiv:2407.02497v2'||original.PDF_SHA256!==sourceSHA||original.PDF_byte_count!==348134||original.original_pdf_extracted_pages?.length!==17)throw Error('NOT_FROZEN_L04_ORIGINAL');
const pages=Array.from({length:4},(_,i)=>4*chunk+i+1).filter(x=>x<=17);
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-G0-17-original-visual-'));
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('HISTORICAL_ORIGINAL_HTTP_'+res.status);
 const bin=Buffer.from(await res.arrayBuffer());
 if(bin.length!==348134||sha(bin)!==sourceSHA)throw Error('WRONG_FROZEN_ORIGINAL_PDF_BYTES');
 const source=path.join(dir,'L04-2407v2.pdf');fs.writeFileSync(source,bin);
 const info=execFileSync('pdfinfo',[source],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_ORIGINAL_PAGE_COUNT');
 for(const page of pages){
  const raw=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',source,'-'],{encoding:'utf8',timeout:12000,maxBuffer:2000000});
  if(sha(Buffer.from(raw))!==original.original_pdf_extracted_pages[page-1].original_extracted_page_SHA256)throw Error('CURRENT_ORIGINAL_PAGE_LAYOUT_HASH_'+page);
  const prefix=path.join(dir,'p'+page);
  execFileSync('pdftoppm',['-f',String(page),'-l',String(page),'-r','165','-png','-singlefile',source,prefix],{timeout:25000,maxBuffer:3000000});
  const img=fs.readFileSync(prefix+'.png'),base64=img.toString('base64'),id=String(page).padStart(2,'0');
  console.log('L04_COLD_ORIGINAL_PAGE_'+id+'_BASE64_BEGIN');
  for(let k=0;k<base64.length;k+=240)console.log(base64.slice(k,k+240));
  console.log('L04_COLD_ORIGINAL_PAGE_'+id+'_BASE64_END');
  console.log('L04_COLD_ORIGINAL_PAGE_'+id+'_METADATA '+JSON.stringify({page,PDF_SHA256:sourceSHA,original_layout_SHA256:sha(Buffer.from(raw)),image_SHA256:sha(img),image_bytes:img.length,original_page_visual_for_independent_cold_review:true,original_semantics_complete:false}));
 }
 console.log('L04_COLD_SOURCE_VISUAL_CHUNK '+JSON.stringify({chunk,pages,pdf_source_sha256:sourceSHA,original_pages:17,G0_cold_review_complete:false,source_census_frozen:false,G1_authorized:false}));
}finally{fs.rmSync(dir,{recursive:true,force:true});}
