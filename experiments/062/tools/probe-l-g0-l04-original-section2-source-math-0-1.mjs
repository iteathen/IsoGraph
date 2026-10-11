// L-only G0 source-first original L04 §2 formula locator study.
// Never turn a PDF layout transcript into an independent visual-cell proof.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const manifest=JSON.parse(fs.readFileSync(P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8'));
const s=manifest.original_sources[3];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
if(s.id!=='L04'||s.revision!=='arXiv:2407.02497v2'||s.PDF_SHA256!=='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422')throw Error('FROZEN_SOURCE_REVISION_DISAGREEMENT');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-original-math-section2-'));
const targets=[{page:3,ordinals:[2,3,5,6,7,8,9,10]},{page:4,ordinals:[1,2]}];
const all=[];
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('SOURCE_HTTP_'+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(hash(bytes)!==s.PDF_SHA256||bytes.length!==s.PDF_byte_count)throw Error('FROZEN_SOURCE_PDF_CHANGED');
 const pdf=path.join(dir,'L04v2.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('SOURCE_PAGE_COUNT_17');
 for(const target of targets){
  const p=target.page,raw=execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1800000});
  const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  const page=s.original_pdf_extracted_pages[p];
  if(hash(Buffer.from(raw))!==page.original_extracted_page_SHA256)throw Error('ORIGINAL_PAGE_HASH_'+p);
  for(const ordinal of target.ordinals){
   const atom=page.blocks[ordinal-1];
   if(!atom)throw Error('MISSING_ORIGINAL_SOURCE_ATOM_'+p+'/'+ordinal);
   const section=lines.slice(atom.original_extracted_line_start-1,atom.original_extracted_line_end);
   if(hash(Buffer.from(section.join('\n')))!==atom.original_source_block_SHA256)throw Error('SOURCE_MATH_BLOCK_HASH_MISMATCH_'+p+'/'+ordinal);
   const relevant=section.map((text,i)=>({line:atom.original_extracted_line_start+i,text:text.trim()})).filter(x=>x.text&&/[=γσϵϵε∓±∨∧†ρπ]|J[₁₂₃]|K[₁₂₃]/u.test(x.text));
   const selected=relevant.map(x=>({line:x.line,source_token_excerpt:x.text.slice(0,155)})).slice(0,24);
   all.push({source_atom:atom.source_atom_id,page_zero_based:p,source_line_span:[atom.original_extracted_line_start,atom.original_extracted_line_end],original_block_SHA256:atom.original_source_block_SHA256,formula_line_count:relevant.length,selected_symbolic_source_lines:selected,source_printed_formula_cell_exactness_independent_visual_verified:false});
  }
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
if(all.length!==10||all.some(x=>x.formula_line_count===0))throw Error('SOURCE_SECTION2_FORMULA_BLOCK_EVIDENCE_INCOMPLETE');
const result={schema:'isograph.exp062.L.G0.L04.original-section2-source-math-locators.v0.1',track:'L',stage:'G0',frozen_revision:'arXiv:2407.02497v2',source_sha256:s.PDF_SHA256,original_pages:[4,5],source_atoms:all.length,records:all,whole_original_source_cold_complete:false,G0_frozen:false,G1_authorized:false};
console.log('L04_ORIGINAL_SECTION2_SOURCE_LOCATOR_BEGIN');
console.log(JSON.stringify(result,null,2));
console.log('L04_ORIGINAL_SECTION2_SOURCE_LOCATOR_END');
console.log('L04_ORIGINAL_SECTION2_SOURCE_LOCATOR_SUMMARY',JSON.stringify({success:true,source_sha256_verified:true,source_atoms:all.length,original_PDF_pages:2,source_role_groups_targeted:['L04-S008','L04-S009','L04-S010','L04-S011'],source_formula_visual_exactness_qualified:false,G0_complete:false}));
