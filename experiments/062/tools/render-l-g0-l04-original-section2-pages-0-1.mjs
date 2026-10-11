// Lisi G0 original-source visual evidence for exact §2 generator/eigenweight
// source cells. Pull exact frozen arXiv v2 PDF and render ONLY pp4–5 to PNG;
// no PDF revision substitution, no inferred mathematical correctness.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const official='https://arxiv.org/pdf/2407.02497v2';
const expected='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L04-original-matrix-vis-'));
try{
 const response=await fetch(official,{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('ORIGINAL_L04_V2_PDF_FETCH_'+response.status);
 const bin=Buffer.from(await response.arrayBuffer());
 if(hash(bin)!==expected||bin.length!==348134)throw Error('WRONG_HISTORICAL_SOURCE_BYTES');
 const p=path.join(dir,'L04v2.pdf');fs.writeFileSync(p,bin);
 const meta=execFileSync('pdfinfo',[p],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(meta))throw Error('FROZEN_ORIGINAL_PAGE_COUNT_NOT_17');
 for(const page of [4,5]){
  const prefix=path.join(dir,'original-'+page);
  execFileSync('pdftoppm',['-f',String(page),'-l',String(page),'-r','115','-png','-singlefile',p,prefix],{timeout:18000,maxBuffer:1000000});
  const image=fs.readFileSync(prefix+'.png'),b64=image.toString('base64');
  console.log('L04_SOURCE_PAGE_'+page+'_PNG_BASE64_BEGIN');
  for(let i=0;i<b64.length;i+=240)console.log(b64.slice(i,i+240));
  console.log('L04_SOURCE_PAGE_'+page+'_PNG_BASE64_END');
  console.log('L04_SOURCE_PAGE_'+page+'_ORIGINAL_METADATA '+JSON.stringify({page,source_sha256:expected,image_sha256:hash(image),image_bytes:image.length,source_math_cell_audit_only:true,G0_complete:false}));
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
