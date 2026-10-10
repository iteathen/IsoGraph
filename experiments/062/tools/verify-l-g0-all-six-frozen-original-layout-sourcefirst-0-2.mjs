// IsoGraph L G0: finite, independent, SHA256-frozen PDF-FIRST layout inventory
// for all six original source revisions. Never substitute a newer arXiv/journal
// revision. Every extracted nonblank line is conserved exactly once in a
// deterministic source block; no semantic completeness claim follows from this.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const P='research/woit-lisi-isomorph/lisi/';
const PROVENANCE='experiments/062/L_G0_SIX_FROZEN_ORIGINAL_PDF_BINARY_PROVENANCE_0_1.json';
const SSC=P+'SOURCE_SEMANTIC_CENSUS_0_64.json';
const PINNED=P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json';
const REG=P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_16.json';
const TRAV=P+'SOURCE_TRAVERSAL_LEDGER_0_33.json';
const TABLE=[
 {id:'L01',path:P+'LISI_L01_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',key:'original_source_first_locations',idKey:'original_source_location_id',ownerKey:'existing_SSC_ids',pageKey:'original_pdf_pages_zero_based',loadKey:'load_bearing',groups:98,ssc:30,blob:'24163965af4d1e13e75371638fcfd70b793db2ac'},
 {id:'L02',path:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_8.json',key:'source_first_locations',idKey:'source_location_id',ownerKey:'SSC_ids',pageKey:'pdf_pages_zero_based',loadKey:'load_bearing',groups:59,ssc:21,blob:'06451fcb7f5458c1432d11439f54589d299d4dd3'},
 {id:'L03',path:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',key:'original_first_locations',idKey:'source_location_id',ownerKey:'SSC_ids',pageKey:null,loadKey:'load_bearing',groups:47,ssc:26,blob:'701a482b077f2e66dcb94ae06c2590f2fc0f7000'},
 {id:'L04',path:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',key:'locations',idKey:'id',ownerKey:'ssc_ids',pageKey:null,loadKey:'source_load_bearing',groups:53,ssc:34,blob:'d17e883fb81664fc6ee2fd980a6aadd583c76d49'},
 {id:'L05',path:P+'LISI_L05_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',key:'page_source_units',idKey:'id',ownerKey:'existing_SSC_ids',pageKey:'pdf_page_zero_based',loadKey:'load_bearing',groups:51,ssc:38,blob:'6a23839e35f5dfa404f64e61985a8ff34379816d'},
 {id:'L06',path:P+'LISI_L06_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',key:'page_source_units',idKey:'source_location_id',ownerKey:'existing_SSC_ids',pageKey:'PDF_page_zero_based',loadKey:'load_bearing',groups:42,ssc:42,blob:'c020274072cefc2b360fb9d5c1b047d47527b1fb'}
];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const blobSha=f=>{const b=fs.readFileSync(f);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const original=read(PROVENANCE);
const ssc=read(SSC);
if(blobSha(PROVENANCE)!=='33428220982f694be2dba283b41824196f8ff63b')throw Error('FROZEN_QUALIFIED_SIX_SOURCE_PROVENANCE_CHANGED');
if(blobSha(SSC)!=='79a562e02f4410fe30c64676733438d1e08a92b7')throw Error('CURRENT_191_SSC_BLOB_CHANGED_RESYNC_REQUIRED');
if(original.schema!=='isograph.exp062.L.G0.six-official-frozen-original-PDF-binary-provenance-qualified.v0.1'||original.exact_CI?.run_id!==38046224902||original.exact_CI.conclusion!=='success')throw Error('SIX_OFFICIAL_BYTE_QUALIFICATION_NOT_CURRENT');
if(ssc.items?.length!==191||ssc.guards?.source_census_freeze_complete!==false)throw Error('CURRENT_191_G0_UNFROZEN_CONTRACT');
const reg=read(REG),trav=read(TRAV);
if(blobSha(REG)!=='cd12aa4e45e00df821cbda58acf028c48d2e1d7a'||blobSha(TRAV)!=='f180f50457753e2f23a0da4f3d81e3556a233f3d')throw Error('LIVE_SIX_ORIGINAL_G0_REGISTER_SHA_DRIFT');
if(reg.schema!=='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.16'||reg.per_source?.length!==6||reg.current_ssc?.git_blob_sha!=='79a562e02f4410fe30c64676733438d1e08a92b7')throw Error('LIVE_SIX_SOURCE_REGISTER_AND_CURRENT_SSC_DISAGREE');
if(reg.all_six_original_complete_finite_PDF_first_layout?.git_blob_sha!=='1ff8ff04547a938b19c7530de7741c3f1eec54a9'||reg.exit_acceptance_contract?.G0_SSC_frozen!==false||reg.exit_acceptance_contract?.G0_SSC_complete!==false)throw Error('LIVE_SIX_SOURCE_LAYOUT_OR_G0_EXIT_CONTRACT_BROKEN');
if(trav.schema!=='lisi.full-treatment.source-traversal-ledger.v0.33'||trav.current_G0_six_original_finite_convergence?.git_blob_sha!=='cd12aa4e45e00df821cbda58acf028c48d2e1d7a'||trav.complete_sources!==0||trav.G1_authorized!==false)throw Error('SIX_SOURCE_TRAVERSAL_OR_STAGE_WRONG');
const knownSSC=new Set(ssc.items.map(x=>x.id));
if(knownSSC.size!==191)throw Error('DUPLICATE_SSC_IDENTITIES');
const allSourceGroups=new Set,allOwnerIDs=new Set;
const originals=TABLE.map((def,i)=>{
 const source=original.original_sources[i];
 if(source?.id!==def.id||source.original_binary_revision_page_qualified!==true||source.source_semantic_full_original_cold_complete!==false)throw Error('WRONG_FROZEN_SOURCE_PROVENANCE_'+def.id);
 if(blobSha(def.path)!==def.blob)throw Error('CURRENT_SOURCE_GROUP_PACKET_CHANGED_'+def.id);
 const x=read(def.path),rows=x[def.key];
 if(rows?.length!==def.groups)throw Error('SOURCE_GROUP_DENOMINATOR_CHANGED_'+def.id);
 const owners=new Set;
 const sourceGroups=rows.map((row,k)=>{
  const id=row[def.idKey],ids=row[def.ownerKey]||[],load=row[def.loadKey];
  const p=def.pageKey?(Array.isArray(row[def.pageKey])?row[def.pageKey]:[row[def.pageKey]]):null;
  if(typeof id!=='string'||!id.startsWith(def.id+'-')||allSourceGroups.has(id))throw Error('SOURCE_GROUP_ID_DUPLICATE_'+id);
  if(typeof load!=='boolean'||(load&&ids.length===0)||(!load&&ids.length!==0))throw Error('SOURCE_LOAD_BEARING_OWNER_INVARIANT_'+id);
  if(ids.length!==new Set(ids).size||ids.some(x=>!knownSSC.has(x)))throw Error('SOURCE_TO_SSC_INVALID_OWNER_'+id);
  if(p&&p.some(q=>!Number.isInteger(q)||q<0||q>=source.expected_original_pages))throw Error('SOURCE_PAGE_CANDIDATE_INVALID_'+id);
  allSourceGroups.add(id);
  for(const name of ids){owners.add(name);allOwnerIDs.add(name);}
  return {id,original_first_owner_ids:ids,load_bearing:load,
    candidate_PDF_pages_zero_based:p,source_first_order:k+1,
    source_semantic_cold_complete:false};
 });
 if(owners.size!==def.ssc)throw Error('ORIGINAL_SOURCE_OWNER_DENOMINATOR_'+def.id+'_'+owners.size);
 return {id:def.id,revision:source.frozen_revision,original_official_url:source.official_exact_version_URL,
 PDF_SHA256:source.SHA256_exact_official_binary,PDF_byte_count:source.source_binary_byte_count,
 original_PDF_pages:source.expected_original_pages,source_first_original_groups:sourceGroups,
 distinct_source_SSC_owner_IDs:owners.size,existing_source_first_path:def.path,existing_source_first_blob_SHA:def.blob,
 source_group_page_links_precise:!!def.pageKey,
 semantic_source_complete:false,original_pdf_extracted_pages:[],original_pdf_layout_blocks:0,original_pdf_nonblank_lines:0};
});
if(originals.length!==6||allSourceGroups.size!==350||allOwnerIDs.size!==191)throw Error('SIX_SOURCE_ORIGINAL_TO_SSC_INVERSE_COUNTS_WRONG');
const manifest={
 schema:'isograph.track-L.G0.six-frozen-original-source-PDF-layout-first.v0.1',
 date:'2026-10-10',track:'L',stage:'G0',semantic_authority:false,
 original_frozen_source_binary_provenance:{path:PROVENANCE,git_blob_sha:'33428220982f694be2dba283b41824196f8ff63b',qualification_CI_run_id:38046224902},
 exact_source_SSC:{path:SSC,git_blob_sha:'79a562e02f4410fe30c64676733438d1e08a92b7',existing_IDs:191},
 method:'From each official frozen original PDF SHA256+Poppler page-first: partition all nonblank pdftotext -layout -enc UTF-8 page lines into blank-separated stable SHA256 text blocks. Preserve exact page+line+block locations. THEN separately bind all existing original-first source groups and SSC owners; no semantic completeness follows from matching layout blocks or source group owner unions. Original mathematical formulas, figures, tables, narrative and all source limitations require independent source-first visual/formula exactness.',
 source_first_group_count:350,original_PDF_page_count_total:0,original_layout_block_total:0,original_extracted_nonblank_line_total:0,
 original_source_first_locations_exhaustively_semantic_cold_reviewed:0,
 original_source_layout_blocks_exhaustively_semantic_cold_reviewed:0,
 original_whole_source_papers_semantically_cold_complete:0,
 source_provenance_byte_gaps:0,
 source_G0_complete:false,G0_frozen:false,G1_authorized:false,W_semantics_imported:false,
 original_sources:originals
};
function pageBlocks(id,p,raw){
 const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const blocks=[];let begin=-1,last=[];
 function flush(end){
  if(begin===-1)return;
  const txt=last.join('\n');
  blocks.push({source_atom_id:id+'-P'+String(p+1).padStart(3,'0')+'-B'+String(blocks.length+1).padStart(3,'0'),
   source_PDF_page_zero_based:p,source_page_block_ordinal:blocks.length+1,
   original_extracted_line_start:begin+1,original_extracted_line_end:end,original_source_block_SHA256:hash(Buffer.from(txt)),
   source_block_nonblank_lines:last.length,source_block_characters:txt.length,
   possible_numbered_formula_labels:[...new Set([...txt.matchAll(/\(\s*(?:[1-9]|[1-9]\d|[12]\d\d)\s*\)/g)].map(m=>m[0].replace(/[() ]/g,'')))],
   semantic_occurrence_status:'ORIGINAL_LAYOUT_ATOM_NOT_INDEPENDENTLY_SEMANTICALLY_ADJUDICATED'});
  begin=-1;last=[];
 }
 let nonblank=0;
 for(let i=0;i<lines.length;i++){
  if(lines[i].trim()){nonblank++;if(begin<0)begin=i;last.push(lines[i]);}
  else flush(i);
 }
 flush(lines.length);
 const result={PDF_page_zero_based:p,original_extracted_page_SHA256:hash(Buffer.from(raw)),source_extracted_line_count:lines.length,source_extracted_nonblank_lines:nonblank,source_layout_blocks:blocks.length,blocks,semantics_original_source_cold_complete:false};
 let observed=0;const occupied=new Set;
 for(const b of blocks){
  const originalText=lines.slice(b.original_extracted_line_start-1,b.original_extracted_line_end).join('\n');
  if(hash(Buffer.from(originalText))!==b.original_source_block_SHA256)throw Error('ORIGINAL_PAGE_BLOCK_HASH_MISMATCH_'+id+'_'+p);
  if(b.source_block_nonblank_lines!==b.original_extracted_line_end-b.original_extracted_line_start+1)throw Error('ORIGINAL_PAGE_BLOCK_LENGTH_MISMATCH_'+id+'_'+p);
  for(let n=b.original_extracted_line_start;n<=b.original_extracted_line_end;n++){
   if(occupied.has(n)||!lines[n-1].trim())throw Error('SOURCE_BLANK_OR_DUPLICATE_LINE_'+id+'_'+p);
   occupied.add(n);observed++;
  }
 }
 if(observed!==nonblank||lines.length-nonblank<0)throw Error('ORIGINAL_NONBLANK_LAYOUT_COVERAGE_'+id+'_'+p);
 return result;
}
const DIR=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L-six-original-G0-'));
const rawPageText={};let fatal=null;
try{
 for(const row of manifest.original_sources){
  const result=await fetch(row.original_official_url,{signal:AbortSignal.timeout(60000)});
  if(result.status!==200)throw Error('FROZEN_PRIMARY_ORIGINAL_HTTP_'+row.id+'_'+result.status);
  const bytes=Buffer.from(await result.arrayBuffer());
  if(bytes.length!==row.PDF_byte_count||hash(bytes)!==row.PDF_SHA256)throw Error('ORIGINAL_SOURCE_REVISION_BYTES_CHANGED_OR_UNAVAILABLE_'+row.id+'_'+bytes.length);
  const pdf=path.join(DIR,row.id+'.pdf');fs.writeFileSync(pdf,bytes);
  const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:18000});
  if(!new RegExp('^Pages:\\s*'+row.original_PDF_pages+'$','m').test(info))throw Error('OFFICIAL_ORIGINAL_PDF_PAGE_COUNT_'+row.id);
  rawPageText[row.id]=[];
  for(let p=0;p<row.original_PDF_pages;p++){
   const src=execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:18000,maxBuffer:3000000});
   rawPageText[row.id].push(src);
   const page=pageBlocks(row.id,p,src);
   row.original_pdf_extracted_pages.push(page);
   row.original_pdf_layout_blocks+=page.source_layout_blocks;
   row.original_pdf_nonblank_lines+=page.source_extracted_nonblank_lines;
   manifest.original_layout_block_total+=page.source_layout_blocks;
   manifest.original_extracted_nonblank_line_total+=page.source_extracted_nonblank_lines;
   manifest.original_PDF_page_count_total++;
  }
 }
}finally{fs.rmSync(DIR,{recursive:true,force:true});}
if(manifest.original_PDF_page_count_total!==167||manifest.original_sources.reduce((a,x)=>a+x.original_pdf_extracted_pages.length,0)!==167)throw Error('FROZEN_SIX_ALL_SOURCE_PAGE_COUNT_167_CONSERVATION');
if(blobSha(PINNED)!=='1ff8ff04547a938b19c7530de7741c3f1eec54a9')throw Error('HISTORICAL_SIX_ORIGINAL_LAYOUT_MANIFEST_BLOB_CHANGED');
const canonical=read(PINNED);
if(JSON.stringify(canonical)!==JSON.stringify(manifest))throw Error('FRESH_ORIGINAL_PDFS_DISAGREE_WITH_PINNED_167_PAGE_MANIFEST');
function validate(d){
 const issues=[],t=(v,m)=>{if(!v)issues.push(m);};
 t(d?.schema===manifest.schema&&d?.track==='L'&&d?.stage==='G0','original source G0 L-only manifest');
 t(d?.original_frozen_source_binary_provenance?.git_blob_sha==='33428220982f694be2dba283b41824196f8ff63b'&&d?.exact_source_SSC?.git_blob_sha==='79a562e02f4410fe30c64676733438d1e08a92b7','qualified original PDF + SSC exact frozen parents');
 t(d?.source_first_group_count===350&&d?.original_PDF_page_count_total===167&&d?.original_sources?.length===6,'finite original source/revision denominators');
 t(d?.original_whole_source_papers_semantically_cold_complete===0&&d?.source_G0_complete===false&&d?.G0_frozen===false&&d?.G1_authorized===false&&d?.W_semantics_imported===false,'source PDF locator coverage != G0 semantics');
 t(reg?.per_source?.length===6&&reg.per_source.reduce((q,z)=>q+z.source_first_location_units,0)===350&&reg?.explicit_locks?.G1_authorized===false&&trav?.current_census?.item_count===191,'all six original source statuses/SSC exactly conserved under current convergence');
 let groups=0,blocks=0,nonblank=0;const groupIds=new Set,sscIDs=new Set;
 for(let i=0;i<6;i++){
  const a=d?.original_sources?.[i],o=manifest.original_sources[i],evidence=original.original_sources[i],source=TABLE[i],current=read(source.path)[source.key]||[];
  if(!a){t(false,'FROZEN_ORIGINAL_SOURCE_WHOLE_RECORD_DELETED_'+i);continue;}
  t(a?.id===evidence.id&&a?.revision===evidence.frozen_revision&&a?.original_official_url===evidence.official_exact_version_URL&&a?.PDF_SHA256===evidence.SHA256_exact_official_binary&&a?.PDF_byte_count===evidence.source_binary_byte_count,'original exact qualified PDF byte identity '+i);
  t(a?.original_PDF_pages===evidence.expected_original_pages&&a?.original_pdf_extracted_pages?.length===evidence.expected_original_pages,'all frozen original PDF pages source '+i);
  const currentReg=reg.per_source[i],currentTrav=trav.sources[i];
  t(currentReg?.source===source.id&&currentReg?.source_first_original_text_blocks===a?.original_pdf_layout_blocks&&currentReg?.original_extracted_nonblank_text_lines===a?.original_pdf_nonblank_lines&&currentReg?.original_frozen_PDF_source_layout_pages===a?.original_PDF_pages,'per-source original PDF first denominators conserved in current convergence '+source.id);
  t(currentTrav?.id===source.id&&currentTrav?.current_original_text_layout_blocks===a?.original_pdf_layout_blocks&&currentTrav?.current_full_source_cold_review_completed===false,'per-source original traversal cold review explicitly still open '+source.id);
  t(a?.existing_source_first_blob_SHA===source.blob&&a?.source_first_original_groups?.length===current.length,'source location authority predecessor '+i);
  t(a?.semantic_source_complete===false,'no original whole source cold approval '+i);
  t(a?.original_pdf_layout_blocks===a?.original_pdf_extracted_pages?.reduce((v,p)=>v+p.source_layout_blocks,0)&&a?.original_pdf_nonblank_lines===a?.original_pdf_extracted_pages?.reduce((v,p)=>v+p.source_extracted_nonblank_lines,0),'per-source source-PDF block/line conservation '+source.id);
  const origOwners=new Set;
  for(let k=0;k<current.length;k++){
   const b=a.source_first_original_groups?.[k],actual=current[k],ids=actual[source.ownerKey]||[];
   t(b?.id===actual[source.idKey]&&!groupIds.has(b?.id),'stable and unique source-location SI '+source.id+'/'+k);groupIds.add(b?.id);
   t(b?.load_bearing===actual[source.loadKey]&&JSON.stringify(b?.original_first_owner_ids)===JSON.stringify(ids)&&b?.source_semantic_cold_complete===false,'per-original-source-location SSC owner, load bearing, and no false cold completion '+source.id+'/'+k);
   for(const id of ids){sscIDs.add(id);origOwners.add(id);}
   groups++;
  }
  t(origOwners.size===source.ssc,'original source SCC owner identity count '+source.id);
  for(let p=0;p<evidence.expected_original_pages;p++){
   const page=a.original_pdf_extracted_pages?.[p],actual=pageBlocks(source.id,p,rawPageText[source.id][p]);
   for(const key of ['PDF_page_zero_based','original_extracted_page_SHA256','source_extracted_line_count','source_extracted_nonblank_lines','source_layout_blocks']){
    t(page?.[key]===actual[key],'physical original PDF text page exact digest '+source.id+'/'+p+'/'+key);
   }
   t(JSON.stringify(page?.blocks)===JSON.stringify(actual.blocks),'each original source block exact SHA/line/ordinal '+source.id+'/'+p);
   t(page?.semantics_original_source_cold_complete===false,'no source page semantic pass invented '+source.id+'/'+p);
   blocks+=actual.source_layout_blocks;nonblank+=actual.source_extracted_nonblank_lines;
  }
 }
 t(groups===350&&groupIds.size===350&&sscIDs.size===191,'all six source->SSC inverse exact 350/191');
 t(blocks===d.original_layout_block_total&&nonblank===d.original_extracted_nonblank_line_total,'original physical source nonblank and block totals from independently fetched PDF');
 t(d.original_source_first_locations_exhaustively_semantic_cold_reviewed===0&&d.original_source_layout_blocks_exhaustively_semantic_cold_reviewed===0,'no retrospective human cold completeness inference');
 return issues;
}
const errors=validate(canonical);
const attacks=[
 ['switch_original_revision',d=>d.original_sources[0].revision='arXiv:0711.0770v2'],
 ['switch_source_sha',d=>d.original_sources[5].PDF_SHA256='wrong'],
 ['remove_source',d=>d.original_sources.pop()],
 ['drop_original_page',d=>d.original_sources[3].original_pdf_extracted_pages.pop()],
 ['tamper_original_page_SHA',d=>d.original_sources[2].original_pdf_extracted_pages[2].original_extracted_page_SHA256='bad'],
 ['remove_original_block',d=>d.original_sources[0].original_pdf_extracted_pages[0].blocks.pop()],
 ['tamper_original_block_SHA',d=>d.original_sources[4].original_pdf_extracted_pages[10].blocks[0].original_source_block_SHA256='bad'],
 ['rewrite_original_line',d=>d.original_sources[1].original_pdf_extracted_pages[5].blocks[0].original_extracted_line_start++],
 ['add_false_source_owner',d=>d.original_sources[2].source_first_original_groups[0].original_first_owner_ids.push('L-SSC-999')],
 ['drop_redundant_source_owner',d=>d.original_sources[0].source_first_original_groups[0].original_first_owner_ids=[]],
 ['wrong_source_load_bearing',d=>d.original_sources[3].source_first_original_groups[0].load_bearing=false],
 ['drop_source_group',d=>d.original_sources[5].source_first_original_groups.pop()],
 ['claim_global_full_source_cold',d=>d.original_whole_source_papers_semantically_cold_complete=6],
 ['fake_source_G0_complete',d=>d.source_G0_complete=true],
 ['fake_original_group_semantic_cold',d=>d.original_sources[0].source_first_original_groups[0].source_semantic_cold_complete=true],
 ['forge_per_source_block_count',d=>d.original_sources[4].original_pdf_layout_blocks=0],
 ['forge_source_url',d=>d.original_sources[3].original_official_url='https://arxiv.org/pdf/2407.02497v1'],
 ['claim_source_page_semantic_cold',d=>d.original_sources[1].original_pdf_extracted_pages[0].semantics_original_source_cold_complete=true],
 ['claim_G0_frozen',d=>d.G0_frozen=true],
 ['claim_G1_authorized',d=>d.G1_authorized=true],
 ['import_W_semantics',d=>d.W_semantics_imported=true],
 ['change_original_SSC_authority',d=>d.exact_source_SSC.git_blob_sha='forged'],
 ['change_binary_qualification',d=>d.original_frozen_source_binary_provenance.git_blob_sha='forged'],
 ['invent_block_total',d=>d.original_layout_block_total=1]
];
let rejected=0;
for(const [name,fn]of attacks){
 const clone=JSON.parse(JSON.stringify(canonical));
 try{fn(clone);if(validate(clone).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name);}
 catch(e){errors.push('HOSTILE_TEST_EXCEPTION_'+name+':'+String(e));}
}
// The complete original-source manifest is immutable in the repository; no bloated logs.
console.log('L_SIX_FROZEN_ORIGINAL_LAYOUT_REVERIFICATION_SUMMARY',JSON.stringify({
 success:errors.length===0,issues:errors,all_six_frozen_official_sha256_verified:true,
 source_papers:6,source_pdf_pages:manifest.original_PDF_page_count_total,
 original_layout_blocks:manifest.original_layout_block_total,source_nonblank_text_lines:manifest.original_extracted_nonblank_line_total,
 source_first_semantic_location_groups:350,existing_SSC_identity_roots:191,
 all_source_semantic_cold_complete:0,hostiles_defined:attacks.length,hostiles_rejected:rejected,pinned_167_page_original_manifest_blob_sha:'1ff8ff04547a938b19c7530de7741c3f1eec54a9',
 per_source:manifest.original_sources.map(x=>({id:x.id,pages:x.original_PDF_pages,blocks:x.original_pdf_layout_blocks,nonblank:x.original_pdf_nonblank_lines,source_groups:x.source_first_original_groups.length})),
 G0_frozen:false,G1_authorized:false}));
if(errors.length)process.exitCode=1;
