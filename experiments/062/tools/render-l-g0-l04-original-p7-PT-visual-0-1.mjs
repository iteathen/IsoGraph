// Track L G0 original L04 v2 p7 unnumbered C/P/T figure, visual-first.
// High-resolution SOURCE EVIDENCE, not physical spin/phase inference or G0 freeze.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const original=JSON.parse(fs.readFileSync(P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8')).original_sources[3];
const sourceHash='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
if(original.id!=='L04'||original.revision!=='arXiv:2407.02497v2'||original.PDF_SHA256!==sourceHash||original.PDF_byte_count!==348134||original.original_pdf_extracted_pages.length!==17)throw Error('WRONG_FROZEN_ORIGINAL_L04_PDF');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-p7-fig-cold-'));
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('FROZEN_SOURCE_HTTP_'+res.status);
 const data=Buffer.from(await res.arrayBuffer());
 if(data.length!==348134||hash(data)!==sourceHash)throw Error('FROZEN_ORIGINAL_BYTES_DIFFER');
 const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,data);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:10000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('ORIGINAL_17_PAGES_REQUIRED');
 const raw=execFileSync('pdftotext',['-f','7','-l','7','-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:10000});
 if(hash(Buffer.from(raw))!==original.original_pdf_extracted_pages[6].original_extracted_page_SHA256)throw Error('FROZEN_ORIGINAL_P7_TEXT_HASH');
 const prefix=path.join(dir,'frozen-p7-detail');
 const resolution=360,crop=[1000,2150,1500,1000];
 execFileSync('pdftoppm',['-f','7','-l','7','-r',String(resolution),'-x',String(crop[0]),'-y',String(crop[1]),'-W',String(crop[2]),'-H',String(crop[3]),'-png','-singlefile',pdf,prefix],{timeout:30000,maxBuffer:3000000});
 const img=fs.readFileSync(prefix+'.png'),base64=img.toString('base64');
 console.log('L04_P7_UNNUMBERED_ORIGINAL_GLYPH_CROP_BASE64_BEGIN');
 for(let i=0;i<base64.length;i+=240)console.log(base64.slice(i,i+240));
 console.log('L04_P7_UNNUMBERED_ORIGINAL_GLYPH_CROP_BASE64_END');
 console.log('L04_P7_UNNUMBERED_ORIGINAL_GLYPH_CROP_META '+JSON.stringify({source_revision:'arXiv:2407.02497v2',source_sha256:sourceHash,pdf_page:7,source_text_SHA256:hash(Buffer.from(raw)),source_crop_dpi:resolution,source_crop_xywh_pixels:crop,image_sha256:hash(img),image_bytes:img.length,source_first_visual_only:true,source_spin_glyph_physical_meaning_not_qualified:true,source_CPT_diagram_not_Fig1_or_Fig2:true,full_original_L04_cold_complete:false,G0_frozen:false,G1_authorized:false}));
}finally{fs.rmSync(dir,{recursive:true,force:true});}
