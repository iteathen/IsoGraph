// Lisi G0 original-first FINITE diagram geometry probe (not semantic qualification).
// The historical PDF byte SHA is mandatory. Extract vector SVG for printed
// pages 14 & 16, independently classify source canvas attributes and ensure
// page-figure provenance; this does not assert author physical correctness.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const ROOT='research/woit-lisi-isomorph/lisi/';
const manifest=JSON.parse(fs.readFileSync(ROOT+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8'));
const crosswalk=JSON.parse(fs.readFileSync(ROOT+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json','utf8'));
const source=manifest.original_sources[3];
const originalSHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const sha=data=>crypto.createHash('sha256').update(data).digest('hex');
if(source.id!=='L04'||source.revision!=='arXiv:2407.02497v2'||source.PDF_SHA256!==originalSHA||source.PDF_byte_count!==348134||source.original_pdf_extracted_pages.length!==17)throw Error('FROZEN_ORIGINAL_IDENTITY_MISMATCH');
const sourceFigures=[
 {page:14,group:'L04-S041',owners:['L-SSC-119','L-SSC-120'],source_atom:'L04-P014-B003',source_page_hash:'faf74d2a90fab12b0517d101b9b157ff044e9ec40761f80a2e1d52b08f313c18'},
 {page:16,group:'L04-S048',owners:['L-SSC-123'],source_atom:'L04-P016-B001',source_page_hash:'7595a5b8c5c6f7574b0e877d08ed8a1649d399b8d31818d0bcb4289463fdc2c7'}
];
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-original-figure-vector-'));
try {
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('ORIGINAL_SOURCE_HTTP_'+res.status);
 const bin=Buffer.from(await res.arrayBuffer());
 if(bin.length!==348134||sha(bin)!==originalSHA)throw Error('ORIGINAL_FROZEN_PDF_SHA_INVALID');
 const file=path.join(dir,'source.pdf');
 fs.writeFileSync(file,bin);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_17_PAGE_COUNT_WRONG');
 for(const fig of sourceFigures){
  const info=crosswalk.original_first_source_blocks.find(x=>x.atom_id===fig.source_atom);
  if(!info||info.original_first_role!=='ORIGINAL_DIAGRAM_CAPTION_MAPPING_VISUAL_EDGE_INCIDENCE_STILL_OPEN'||!info.source_group_ids.includes(fig.group)||JSON.stringify(info.existing_SSC_owner_ids.slice().sort())!==JSON.stringify(fig.owners.slice().sort()))throw Error('ORIGINAL_DIAGRAM_SOURCE_SSC_CROSSWALK_NOT_PINNED_'+fig.page);
  const page=source.original_pdf_extracted_pages[fig.page-1];
  const layout=execFileSync('pdftotext',['-f',String(fig.page),'-l',String(fig.page),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000});
  if(sha(layout)!==fig.source_page_hash||fig.source_page_hash!==page.original_extracted_page_SHA256)throw Error('ORIGINAL_DIAGRAM_PAGE_LAYOUT_SHA_MISMATCH_'+fig.page);
  const prefix=path.join(dir,'fig'+fig.page+'.svg');
  execFileSync('pdftocairo',['-f',String(fig.page),'-l',String(fig.page),'-svg',file,prefix],{encoding:'utf8',timeout:35000,maxBuffer:8000000});
  const svg=fs.readFileSync(prefix,'utf8'),svgHash=sha(Buffer.from(svg));
  const tags=[...(svg.match(/<(?:path|circle|rect|polyline|polygon|line|image)\b[^>]*>/g)||[])];
  const styleCount={},strokeCount={},fillCount={},coloredExamples={};
  for(const tag of tags){
   const kind=/^<(\w+)/.exec(tag)?.[1]||'unknown';
   const st=/\bstroke="([^"]+)"/.exec(tag)?.[1]||'UNSPECIFIED';
   const fi=/\bfill="([^"]+)"/.exec(tag)?.[1]||'UNSPECIFIED';
   const style=/\bstyle="([^"]+)"/.exec(tag)?.[1]||'UNSPECIFIED';
   styleCount[kind]=(styleCount[kind]||0)+1;
   strokeCount[st]=(strokeCount[st]||0)+1;
   fillCount[fi]=(fillCount[fi]||0)+1;
   const key=kind+' / stroke '+st+' / fill '+fi;
   if((st.includes('rgb(')||fi.includes('rgb('))&&!coloredExamples[key])coloredExamples[key]=tag.slice(0,320);
  }
  const counts=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([key,count])=>({key,count}));
  const report={
   schema:'isograph.exp062-L04-original-diagram-vector-source-first-probe.v0.1',
   stage:'G0',track:'L',source_revision:'arXiv:2407.02497v2',original_PDF_SHA256:originalSHA,
   original_page:fig.page,original_page_layout_SHA256:fig.source_page_hash,
   source_group:fig.group,original_source_atom:fig.source_atom,owner_SSC_ids:fig.owners,
   exact_original_pdf_vector_svg_SHA256:svgHash,svg_bytes:Buffer.byteLength(svg),
   graphical_elements:tags.length,element_types:counts(styleCount),
   stroke_palette:counts(strokeCount),fill_palette:counts(fillCount),
   colored_element_samples:Object.entries(coloredExamples).slice(0,26).map(([key,tag])=>({key,tag})),
   source_original_load_bearing_glyph_counts_PROVEN:false,
   source_original_complete_vertex_edge_incidence_PROVEN:false,
   original_figure_semantic_cold_audit_complete:false,
   G0_frozen:false,G1_authorized:false,cross_author_inference:false
  };
  console.log('L04_ORIGINAL_FIGURE_VECTOR_'+fig.page+'_BEGIN');
  console.log(JSON.stringify(report,null,2));
  console.log('L04_ORIGINAL_FIGURE_VECTOR_'+fig.page+'_END');
 }
}finally {fs.rmSync(dir,{recursive:true,force:true});}
