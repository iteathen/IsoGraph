// Lisi G0 frozen L03 v1: independent exact PDF source-numbered equation preview.
// Source-only observation, no math proof or G1 authorization. No PDFs retained.
import crypto from 'node:crypto';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
const official='https://arxiv.org/pdf/1006.4908v1';
const frozenSHA='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e';
const h=b=>crypto.createHash('sha256').update(b).digest('hex');
const sourceNumbers=[...Array.from({length:8},(_,i)=>'2.'+(i+1)),...Array.from({length:11},(_,i)=>'3.'+(i+1)),...Array.from({length:7},(_,i)=>'4.'+(i+1))];
const dir=mkdtempSync(join(tmpdir(),'L03-v1-G0-'));
try{
 const res=await fetch(official,{signal:AbortSignal.timeout(30000)});
 if(res.status!==200)throw Error('SOURCE_FETCH_FAILURE_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());
 if(h(bytes)!==frozenSHA)throw Error('SOURCE_SHA256_MISMATCH_NO_SUBSTITUTION');
 const file=join(dir,'L03v1.pdf');writeFileSync(file,bytes);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*14$/m.test(info))throw Error('SOURCE_V1_PDF_PAGE_MISMATCH');
 const pages=[];
 for(let page=1;page<=14;page++){
  const txt=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout',file,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1500000});
  pages.push(txt.split(/\n/));
 }
 const matches=sourceNumbers.map(label=>{
  const pattern=new RegExp('\\(\\s*'+label.replaceAll('.','\\.')+'\\s*\\)');
  const occur=[];
  pages.forEach((lines,page)=>lines.forEach((line,index)=>{
    if(!pattern.test(line))return;
    const snippet=lines.slice(Math.max(0,index-10),Math.min(lines.length,index+2)).map(x=>x.trim()).filter(Boolean).join(' | ');
    occur.push({page_zero_based:page,source_line:index,printed_number_position:line.indexOf('('+label+')'),source_nearby_text_sha256:h(Buffer.from(snippet)),nearby_original_source_math_excerpt:snippet.slice(-1700)});
  }));
  return {number:label,occurrences:occur.length,examples:occur.slice(0,5),source_numbered_expression_is_not_qualified_by_numeric_label_alone:true};
 });
 const misses=matches.filter(m=>m.occurrences===0).map(m=>m.number);
 const result={schema:'isograph.exp062.L.G0.L03-v1-original-numbered-equation-source-excerpt-oracle.v0.1',track:'L',stage:'G0',original_revision:'arXiv:1006.4908v1',exact_official_PDF_sha256:frozenSHA,source_PDF_pages:14,numbered_equations_expected:26,numbered_expression_labels_observed:26-misses.length,missing_source_number_labels:misses,all_numbered_math_formula_exact_cells_verified:false,SSCell_new_identity_asserted:false,G0_frozen:false,G1_authorized:false,records:matches};
 console.log('L03_FROZEN_SOURCE_EQ_EXCERPTS_BEGIN');
 console.log(JSON.stringify(result,null,2));
 console.log('L03_FROZEN_SOURCE_EQ_EXCERPTS_END');
 if(misses.length)process.exitCode=1;
}finally{rmSync(dir,{recursive:true,force:true});}
