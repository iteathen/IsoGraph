// IsoGraph Track L G0 independent lexical source-first locator audit.
// Reads exact official PDFs whose SHA256/version/page provenance was previously qualified.
// It detects equation/table/figure locator CANDIDATES; it is not semantic cold verification.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const ROOT='research/woit-lisi-isomorph/lisi/';
const prov=JSON.parse(fs.readFileSync('experiments/062/L_G0_SIX_FROZEN_ORIGINAL_PDF_BINARY_PROVENANCE_0_1.json','utf8'));
const srcAudit=[
  ROOT+'LISI_L01_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
  ROOT+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',
  ROOT+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
  ROOT+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
  ROOT+'LISI_L05_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
  ROOT+'LISI_L06_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json'
];
const h=x=>crypto.createHash('sha256').update(x).digest('hex');
const fileDir=mkdtempSync(join(tmpdir(),'isograph-L-G0-text-source-'));
function sourceLedgerEquationAnchors(id,doc){
 if(id==='L01')return doc.original_source_first_locations.map(x=>x.original_numbered_equation).filter(Boolean).map(String);
 if(id==='L02')return doc.source_first_locations.flatMap(x=>x.equations||[]).map(String);
 if(id==='L05')return doc.original_equation_index_candidate.map(x=>x.original_number).map(String);
 if(id==='L06')return doc.partial_reconstructability_equation_examples.map(x=>x.printed_numbered_formula_locator).map(String);
 return [];
}
function locs(pageText,expr,limit=3000){
 const names=[];
 for(const match of pageText.matchAll(expr)) names.push(String(match[1]));
 return names.slice(0,limit);
}
const sorter=(a,b)=>{
 const A=a.split('.').map(Number),B=b.split('.').map(Number);
 return (A[0]-B[0])||(A.length>1&&B.length>1?(A[1]-B[1]):A.length-B.length);
};
const normalizeError=e=>String(e?.message||e).replace(/[\n\r]+/g,' ').slice(0,300);
async function inspect(pdfSource,prevPacket){
 const result={
  id:pdfSource.id,
  frozen_revision:pdfSource.frozen_revision,
  original_pdf_url:pdfSource.official_exact_version_URL,
  SHA256_expected:pdfSource.SHA256_exact_official_binary,
  original_pages_expected:pdfSource.expected_original_pages,
  raw_source_SHA256_matches_qualified_manifest:false,
  source_equation_table_figure_markers_are_lexical_candidates_not_semantic_proof:true,
  independently_complete_original_source_cold_review:false,
  G0_frozen:false
 };
 try{
  const res=await fetch(pdfSource.official_exact_version_URL,{headers:{'User-Agent':'IsoGraph-G0-Source-First-Location-Audit/0.1','Accept':'application/pdf'},signal:AbortSignal.timeout(25000)});
  result.HTTP_status=res.status;
  if(!res.ok){result.error='HTTP '+res.status;return result;}
  const buf=Buffer.from(await res.arrayBuffer());
  result.raw_source_SHA256_observed=h(buf);
  result.raw_source_SHA256_matches_qualified_manifest=result.raw_source_SHA256_observed===pdfSource.SHA256_exact_official_binary;
  if(!result.raw_source_SHA256_matches_qualified_manifest){result.error='SOURCE_BINARY_CHANGED_QUARANTINE_NO_EXTRACTION';return result;}
  const pdf=join(fileDir,pdfSource.id+'.pdf');writeFileSync(pdf,buf);
  const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:15000});
  result.original_pages_pdfinfo=Number(info.match(/^Pages:\s*(\d+)$/m)?.[1]||0);
  const all=execFileSync('pdftotext',['-layout',pdf,'-'],{encoding:'utf8',timeout:25000,maxBuffer:35000000});
  let pgs=all.split('\f');while(pgs.length>0&&pgs[pgs.length-1].trim()==='')pgs.pop();
  result.source_text_pages_extracted=pgs.length;
  result.page_text_sha256=pgs.map((page,i)=>({pdf_page_zero_based:i,source_text_SHA256:h(Buffer.from(page,'utf8')),source_text_codepoints:page.length}));
  const everyEq=new Map(),tails=new Map(),tables=new Map(),figures=new Map();
  pgs.forEach((page,i)=>{
   const numeric=/\(\s*(\d{1,2}(?:\.\d{1,2})?)\s*\)/g;
   const tail=/\(\s*(\d{1,2}(?:\.\d{1,2})?)\s*\)\s*$/gm;
   const tb=/^\s*Table\s+(\d{1,2})\b/gmi,fg=/^\s*Figure\s+(\d{1,2})\b/gmi;
   const add=(map,strings)=>{for(const label of strings){const k=label.trim();const x=map.get(k)||new Set();x.add(i);map.set(k,x);}};
   add(everyEq,locs(page,numeric));add(tails,locs(page,tail));add(tables,locs(page,tb));add(figures,locs(page,fg));
  });
  const toRows=map=>[...map.entries()].sort((x,y)=>sorter(x[0],y[0])).map(([label,pg])=>({label,pdf_page_zero_based:[...pg].sort((a,b)=>a-b)}));
  const allE=toRows(everyEq),tailE=toRows(tails),allT=toRows(tables),allF=toRows(figures);
  const indexed=sourceLedgerEquationAnchors(pdfSource.id,prevPacket).sort(sorter);
  result.existing_original_source_ledger_numbered_equation_anchors=indexed;
  result.numbered_expression_token_candidates_all_contexts=allE;
  result.numbered_expression_candidates_at_line_ends=tailE;
  result.original_table_caption_lexical_candidates=allT;
  result.original_figure_caption_lexical_candidates=allF;
  result.line_end_label_candidates_not_in_existing_source_ledger=tailE.filter(x=>!indexed.includes(x.label)).map(x=>x.label);
  result.existing_ledger_equation_anchor_not_detected_as_any_numeric_token=indexed.filter(x=>!everyEq.has(x));
  result.candidate_counts={all_numeric_expression_tokens:allE.length,display_tail_candidates:tailE.length,original_tables:allT.length,original_figures:allF.length};
  result.original_source_pages_match=result.original_pages_pdfinfo===pdfSource.expected_original_pages&&result.source_text_pages_extracted===pdfSource.expected_original_pages;
  result.result=result.original_source_pages_match?'SOURCE_TEXT_LOCATION_ORACLE_SUCCESS_NO_SEMANTIC_QUALIFICATION':'ORIGINAL_SOURCE_PAGE_SPLIT_MISMATCH';
  return result;
 }catch(e){result.error=normalizeError(e);result.result='SOURCE_TEXT_INSPECTION_FAILED';return result;}
}
try{
 const results=[];
 for(let i=0;i<prov.original_sources.length;i++){
  const prior=JSON.parse(fs.readFileSync(srcAudit[i],'utf8'));
  results.push(await inspect(prov.original_sources[i],prior));
 }
 const passed=results.length===6&&results.every(x=>x.raw_source_SHA256_matches_qualified_manifest&&x.original_source_pages_match);
 const manifest={
  schema:'isograph.exp062-L-G0.original-PDF-fresh-source-text-locator-oracle.v0.1',
  date:'2026-10-10',track:'L',stage:'G0',
  head_sha:process.env.GITHUB_SHA||null,run_id:process.env.GITHUB_RUN_ID||null,
  source_byte_manifest:'experiments/062/L_G0_SIX_FROZEN_ORIGINAL_PDF_BINARY_PROVENANCE_0_1.json',
  all_six_original_hashes_unchanged_and_pdf_pages_matched:passed,
  original_equation_figure_table_anchors_are_LEXICAL_CANDIDATES:true,
  actual_original_source_semantic_coverage_cold_COMPLETE:false,
  G0_frozen:false,G1_authorized:false,
  sources:results
 };
 console.log('L_G0_SOURCE_TEXT_ORACLE_BEGIN');
 console.log(JSON.stringify(manifest,null,2));
 console.log('L_G0_SOURCE_TEXT_ORACLE_END');
 if(!passed)process.exitCode=1;
}finally{rmSync(fileDir,{force:true,recursive:true});}
