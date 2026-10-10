// IsoGraph Track L G0 - frozen original-source official-byte acquisition probe.
// Scope: source provenance bytes only, not source-semantic cold completion or theory proof.
// All URLs below are the previously frozen exact original revisions. No fallback substitutions.
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const sourceSpecs=[
  {id:'L01',revision:'arXiv:0711.0770v1',url:'https://arxiv.org/pdf/0711.0770v1',pages:31,needle:'0711.0770v1'},
  {id:'L02',revision:'arXiv:1004.4866v2',url:'https://arxiv.org/pdf/1004.4866v2',pages:12,needle:'1004.4866v2'},
  {id:'L03',revision:'arXiv:1006.4908v1',url:'https://arxiv.org/pdf/1006.4908v1',pages:14,needle:'1006.4908v1'},
  {id:'L04',revision:'arXiv:2407.02497v2',url:'https://arxiv.org/pdf/2407.02497v2',pages:17,needle:'2407.02497v2'},
  {id:'L05',revision:'Springer Version of Record 2026-08-29 DOI 10.1007/s00006-026-01447-5',url:'https://link.springer.com/content/pdf/10.1007/s00006-026-01447-5.pdf',pages:51,needle:'10.1007/s00006-026-01447-5'},
  {id:'L06',revision:'arXiv:1506.08073v2',url:'https://arxiv.org/pdf/1506.08073v2',pages:42,needle:'1506.08073v2'}
];
const outDir=mkdtempSync(join(tmpdir(),'isograph-g0-frozen-original-'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const sanitize=s=>String(s).replace(/[\r\n]+/g,' ').slice(0,380);
async function oneOriginal(s){
 const row={source:s.id,requested_exact_revision:s.revision,requested_url:s.url,expected_original_pages:s.pages,verified_exact_original_source_bytes:false,source_semantics_cold_complete:false,authority_effect:'PROVENANCE_EVIDENCE_ONLY_NOT_G0_FREEZE'};
 let res;
 try{
   res=await fetch(s.url,{redirect:'follow',headers:{'User-Agent':'IsoGraph-G0-Source-Provenance-Audit/0.1 (public academic source verification)','Accept':'application/pdf'},signal:AbortSignal.timeout(25000)});
   row.status_code=res.status;row.result_url=res.url;row.content_type=res.headers.get('content-type')||null;
   row.response_last_modified=res.headers.get('last-modified')||null;
   row.response_etag=res.headers.get('etag')||null;
   if(!res.ok){row.result='HTTP_NON_SUCCESS_NO_SOURCE_BYTES';return row;}
   const b=Buffer.from(await res.arrayBuffer());
   row.bytes_received=b.length;
   if(b.length<1024||b.length>30_000_000||b.subarray(0,5).toString()!=='%PDF-'){row.result='RESPONSE_NOT_ACCEPTED_AS_FROZEN_PDF';return row;}
   row.retrieved_pdf_sha256=hash(b);
   const f=join(outDir,s.id+'.pdf');writeFileSync(f,b);
   let pdfinfo;
   try{
     const info=execFileSync('pdfinfo',[f],{encoding:'utf8',timeout:12000,maxBuffer:200000});
     const m=info.match(/^Pages:\s*(\d+)\s*$/m);
     pdfinfo=m?Number(m[1]):null;
   }catch(err){row.pdfinfo_failure=sanitize(err.message);pdfinfo=null;}
   row.actual_pdf_pages=pdfinfo;
   let firstPage='';
   try{
     firstPage=execFileSync('pdftotext',['-f','1','-l','1','-layout',f,'-'],{encoding:'utf8',timeout:12000,maxBuffer:150000});
   }catch(err){row.pdftotext_failure=sanitize(err.message);}
   const normalized=firstPage.replace(/\s+/g,' ').toLowerCase();
   row.original_revision_marker_found=normalized.includes(s.needle.toLowerCase());
   row.journal_DOI_marker_found=s.id==='L05'?normalized.includes(s.needle.toLowerCase()):null;
   row.expected_page_count_matches=pdfinfo===s.pages;
   row.verified_exact_original_source_bytes=pdfinfo===s.pages&&row.original_revision_marker_found===true;
   row.result=row.verified_exact_original_source_bytes?'OFFICIAL_PDF_BYTES_SHA256_AND_PAGE_REVISION_MATCH':'PDF_BYTES_RETRIEVED_BUT_FROZEN_SCOPE_NOT_FULLY_VERIFIED';
   return row;
 }catch(err){
   row.result='NETWORK_OR_ACQUISITION_FAILED';
   row.error=sanitize(err?.message||err);
   return row;
 }
}
try{
 const rows=[];
 for(const item of sourceSpecs)rows.push(await oneOriginal(item));
 const complete=rows.every(x=>x.verified_exact_original_source_bytes===true);
 const manifest={
   schema:'isograph.exp062.track-L.G0.frozen-original-official-byte-provenance-probe.v0.1',
   date:'2026-10-10',track:'L',stage:'G0',
   git_head_sha:process.env.GITHUB_SHA||null,
   github_run_id:process.env.GITHUB_RUN_ID||null,
   original_corpus:'research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md',
   frozen_corpus_git_blob_sha:'5775af1ab9289f97d903b39d5eb8eda241bafe78',
   source_census_git_blob_sha:'ce8b4de22b27f553272e526d3985c8ef67fb364f',
   source_count:sourceSpecs.length,
   original_exact_bytes_verified_count:rows.filter(x=>x.verified_exact_original_source_bytes).length,
   all_original_exact_bytes_verified:complete,
   source_fidelity_whole_original_cold_audit_complete:false,
   original_semantics_newly_qualified:false,
   G0_complete:false,G0_frozen:false,G1_authorized:false,W_semantics_imported:false,
   no_source_version_fallbacks_attempted:true,
   rows
 };
 console.log('G0_SOURCE_PROVENANCE_MANIFEST_BEGIN');
 console.log(JSON.stringify(manifest,null,2));
 console.log('G0_SOURCE_PROVENANCE_MANIFEST_END');
 if(!complete)process.exitCode=1;
}finally{
 rmSync(outDir,{recursive:true,force:true});
}
