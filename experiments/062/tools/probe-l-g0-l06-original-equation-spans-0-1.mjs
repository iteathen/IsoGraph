// Source-first cold excerpt probe for previously unindexed L06 numbered equations.
// Scoped read-only, no PDF commits, no semantic qualification from plain text.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
const expected='e2649e8cbccb4a7fb8f876b8a3a53a8abc795dfeac4c6b4177ce13dac103f0be';
const url='https://arxiv.org/pdf/1506.08073v2';
const temp=mkdtempSync(join(tmpdir(),'L06-original-source-'));
const h=b=>crypto.createHash('sha256').update(b).digest('hex');
try{
 const res=await fetch(url,{signal:AbortSignal.timeout(30000)});
 if(res.status!==200)throw Error('ORIGINAL_L06_HTTP_'+res.status);
 const buf=Buffer.from(await res.arrayBuffer());
 if(h(buf)!==expected)throw Error('ORIGINAL_L06_FROZEN_SHA256_MISMATCH');
 const pdf=join(temp,'L06-v2.pdf');writeFileSync(pdf,buf);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8'});
 if(!/^Pages:\s*42$/m.test(info))throw Error('WRONG_L06_ORIGINAL_PDF_PAGE_COUNT');
 const audit=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/lisi/LISI_L06_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json','utf8'));
 const prior=new Set(audit.partial_reconstructability_equation_examples.map(x=>x.printed_numbered_formula_locator));
 const records=[];const ignored=[];
 for(let page=1;page<=42;page++){
   const out=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout',pdf,'-'],{encoding:'utf8',maxBuffer:1000000,timeout:10000});
   const lines=out.split('\n');
   for(let i=0;i<lines.length;i++){
     const m=lines[i].match(/\(\s*(\d{1,2}(?:\.\d{1,2})?)\s*\)\s*$/);
     if(!m)continue;
     const label=m[1];
     const normalized=lines.slice(Math.max(0,i-6),i+1).map(s=>s.trim()).filter(Boolean);
     const context=normalized.join(' | ').slice(-760);
     const rec={label,page_zero_based:page-1,line_index:i,previously_selected:prior.has(label),original_PDF_line_end_text_SHA256:h(Buffer.from(context)),source_display_excerpt:context};
     if(label==='2'){ignored.push(rec);continue;}
     records.push(rec);
   }
 }
 const unseen=records.filter(x=>!x.previously_selected);
 const control=records.filter(x=>x.previously_selected&&['12.1','13.1','14.1','15.1','16.1','17.1'].includes(x.label));
 console.log('L06_EXACT_ORIGINAL_EQUATION_SPANS_BEGIN');
 console.log(JSON.stringify({schema:'isograph.L.G0.L06-source-first-cold-eq-spans.v0.1',source_sha256:expected,original_pages:42,source_revision:'arXiv:1506.08073v2',original_ledger_selected_ids:prior.size,numbered_expressions_detected:records.length,source_line_end_new_candidates:unseen.length,ambiguous_unsectioned_numeric_candidates:ignored,original_rendered_source_unknown_new_scc_meaning:true,unreviewed:unseen,controls:control,G0_frozen:false,G1_authorized:false},null,2));
 console.log('L06_EXACT_ORIGINAL_EQUATION_SPANS_END');
}finally{rmSync(temp,{recursive:true,force:true});}
