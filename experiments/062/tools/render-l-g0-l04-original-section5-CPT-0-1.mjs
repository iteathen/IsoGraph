// Track L G0: exact frozen L04 arXiv:2407.02497v2 §5 p10
// independent original-page/body reconstruction for ALL C/P/T source equations.
// Original SOURCE ONLY; no physics theorem or G1 qualification.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const src=JSON.parse(fs.readFileSync(P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8')).original_sources[3];
const ORIGINAL='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422',sha=b=>crypto.createHash('sha256').update(b).digest('hex');
if(src.id!=='L04'||src.PDF_SHA256!==ORIGINAL||src.PDF_byte_count!==348134||src.revision!=='arXiv:2407.02497v2'||src.original_pdf_extracted_pages.length!==17)throw Error('WRONG_FROZEN_L04_PDF');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-original-section5-p10-'));
try{
 const r=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(r.status!==200)throw Error('FROZEN_L04_ORIGINAL_HTTP_'+r.status);
 const buf=Buffer.from(await r.arrayBuffer());if(buf.length!==348134||sha(buf)!==ORIGINAL)throw Error('FROZEN_ORIGINAL_BINARY_SHA_FAIL');
 const f=path.join(dir,'original.pdf');fs.writeFileSync(f,buf);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[f],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_17_PAGE_FAILURE');
 const raw=execFileSync('pdftotext',['-f','10','-l','10','-layout','-enc','UTF-8',f,'-'],{encoding:'utf8',timeout:12000,maxBuffer:2000000});
 const pg=src.original_pdf_extracted_pages[9];if(sha(Buffer.from(raw))!==pg.original_extracted_page_SHA256)throw Error('ORIGINAL_P10_LAYOUT_HASH_CHANGED');
 const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n'),verified=[];
 for(const a of pg.blocks){
  const data=lines.slice(a.original_extracted_line_start-1,a.original_extracted_line_end).join('\n');
  if(sha(Buffer.from(data))!==a.original_source_block_SHA256)throw Error('ORIGINAL_P10_BLOCK_'+a.source_atom_id);
  verified.push({id:a.source_atom_id,sha256:a.original_source_block_SHA256,lines:[a.original_extracted_line_start,a.original_extracted_line_end]});
 }
 if(verified.length!==13)throw Error('FROZEN_P10_13_SOURCE_BLOCK_PARTITION');
 const stem=path.join(dir,'p10-source');
 const xywh=[280,820,2600,2650],dpi=360;
 execFileSync('pdftoppm',['-f','10','-l','10','-r',String(dpi),'-x',String(xywh[0]),'-y',String(xywh[1]),'-W',String(xywh[2]),'-H',String(xywh[3]),'-png','-singlefile',f,stem],{timeout:35000,maxBuffer:4000000});
 const img=fs.readFileSync(stem+'.png'),b64=img.toString('base64');
 console.log('L04_ORIGINAL_SECTION5_P10_SOURCE_IMAGE_BASE64_BEGIN');
 for(let k=0;k<b64.length;k+=240)console.log(b64.slice(k,k+240));
 console.log('L04_ORIGINAL_SECTION5_P10_SOURCE_IMAGE_BASE64_END');
 console.log('L04_ORIGINAL_SECTION5_P10_SOURCE_META '+JSON.stringify({track:'L',source:'L04',original_revision:'arXiv:2407.02497v2',PDF_SHA256:ORIGINAL,original_source_page:10,original_source_page_layout_SHA256:pg.original_extracted_page_SHA256,source_original_layout_atoms_sha_verified:13,original_layout_atom_ids:verified.map(x=>x.id),original_crop_render_dpi:dpi,crop_xywh:xywh,original_crop_SHA256:sha(img),image_bytes:img.length,G0_complete:false,G1_authorized:false,source_semantic_G0_candidate_only:true,original_mathematics_truth_not_proved:true}));
}finally{fs.rmSync(dir,{recursive:true,force:true});}
