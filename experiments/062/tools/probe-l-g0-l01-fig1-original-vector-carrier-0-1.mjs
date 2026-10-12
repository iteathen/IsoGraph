// L-only G0 forensic capability probe. No source-figure semantic decoding or promotion.
// Frozen arXiv L01 v1 binary -> original page 3 text/raster -> SVG path introspection.
// This records structural feasibility, NOT connector endpoints or field action semantics.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const FILES={
 candidate:P+'LISI_L01_ORIGINAL_FIG1_SM_PERIODIC_TABLE_SOURCE_CANDIDATE_G0_0_2.json',
 method:P+'LISI_L01_FIG1_DRAWN_VS_DECLARED_INCIDENCE_METHOD_G0_0_1.json',
 inverse:P+'LISI_L01_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_96.json',
 gate:'experiments/062/L_CURRENT_STAGE_GATE_0_190.json'
};
const j=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const D=Object.fromEntries(Object.entries(FILES).map(([k,p])=>[k,j(p)]));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const gitsha=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
const SH='344cfc45eb505b28f322ccee3de6192703893da7c31260ed384885525d6a9dfe';
const RENDER='8355664c5dd621e0aaec479db0e13f6bacacaa2b01b9dea517c581edbdf1b4fe';
const expected={source:'L01-S004',pdfPages:31,pdfBytes:623525,sourceCells:16,sourceGlyphs:48,Y:16};
function baseline(v){
 const problems=[],need=(a,l)=>{if(!a)problems.push(l)};
 need(v.candidate?.frozen_primary?.PDF_SHA256===SH&&v.method?.original?.PDF_sha256===SH,'frozen original SHA consistency');
 need(v.method?.frozen_earlier_evidence?.current_candidate?.git_blob_sha===gitsha(FILES.candidate),'candidate blob exact');
 need(v.method?.frozen_earlier_evidence?.source_first?.git_blob_sha===gitsha(FILES.inverse),'inverse blob exact');
 need(v.method?.frozen_earlier_evidence?.SSC?.git_blob_sha===gitsha(FILES.ssc),'SSC blob exact');
 need(v.method?.frozen_earlier_evidence?.G0_gate?.git_blob_sha==='16e7d3a9d89031e6d45201dff6fef033b478e8f5','gate189 source predecessor SHA');
 need(v.candidate?.grid?.source_cells?.length===expected.sourceCells&&v.candidate?.finding?.actual_visible_generation_glyph_occurrences===48&&v.candidate?.finding?.source_hypercharge_numerals_printed===16,'Figure 1 16/48/16 cardinality');
 need(v.inverse?.original_source_first_locations?.length===98&&v.inverse.original_source_first_locations.find(x=>x.original_source_location_id===expected.source)?.disposition==='ORIGINAL_TABLE_FIGURE_OR_MATRIX_EXACT_CELLS_UNVERIFIED','L01-S004 still exact unqualified');
 need(v.ssc?.item_count===191&&v.ssc?.items?.length===191,'191 source items');
 need(v.gate?.schema==='isograph.exp062-l-current-stage-gate.v0.190'&&v.gate.L01_Fig1_drawn_vs_prose_research?.git_blob_sha===gitsha(FILES.method),'current stage packet');
 need(!v.gate.current_lawful_state.G0_frozen&&!v.gate.current_lawful_state.G1_authorized&&!v.gate.current_lawful_state.PR70_merge_authorized&&!v.gate.current_lawful_state.W_semantics_imported,'no stage or track promotion');
 need(v.method.hypothesis_comparison.length===4&&v.method.source_prose_relations_separate.length===5&&v.method.source_visual_inventory_candidate.original_field_marker_symbols.length===6,'source method alternatives separate');
 need(v.method.source_visual_inventory_candidate.direct_field_stroke_graph_status==='UNKNOWN_NOT_QUALIFIED'&&v.method.stage_conservation.L01_unqualified_original_visual_groups===16,'geometry remains unknown');
 return problems;
}
const errors=baseline(D);
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l01-figure-vector-probe-'));
let originalPDFVerified=false,textPageVerified=false,originalRasterVerified=false,svg={available:false,reason:'NOT_ATTEMPTED',element_counts:{},stroke_bearing_inline_elements:0,source_svg_sha256:null,source_svg_bytes:0,sample_stroke_geometry:[]};
try {
 const r=await fetch('https://arxiv.org/pdf/0711.0770v1',{signal:AbortSignal.timeout(65000)});
 if(!r.ok)throw Error('original_PDF_HTTP_'+r.status);
 const bytes=Buffer.from(await r.arrayBuffer());
 if(bytes.length!==623525||sha(bytes)!==SH)throw Error('original_PDF_binary_sha_or_length_mismatch');
 originalPDFVerified=true;
 const pdf=path.join(temp,'l01-v1.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:13000});
 if(!/^Pages:\s*31$/m.test(info))throw Error('frozen_31_page_count_mismatch');
 const pgt=execFileSync('pdftotext',['-f','3','-l','3','-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:15000});
 textPageVerified=sha(Buffer.from(pgt))==='5fb73737e292efe76f68ee31e1857132896d5c290a64c94c4c71cc51f47f5de7';
 if(!textPageVerified||!pgt.includes('Figure 1: A periodic table of the standard model.'))throw Error('original_page3_text_or_caption_mismatch');
 const image=path.join(temp,'raster');
 execFileSync('pdftoppm',['-f','3','-l','3','-r','96','-singlefile','-png',pdf,image],{timeout:25000});
 const png=fs.readFileSync(image+'.png');
 originalRasterVerified=sha(png)===RENDER&&png.readUInt32BE(16)===816&&png.readUInt32BE(20)===1056;
 if(!originalRasterVerified)throw Error('original_page3_raster_hash_or_dimensions_mismatch');
 const base=path.join(temp,'original-vector');
 try{
   execFileSync('pdftocairo',['-f','3','-l','3','-svg',pdf,base+'.svg'],{timeout:30000});
   const names=fs.readdirSync(temp).filter(s=>s.endsWith('.svg'));
   const found=names.find(s=>s.startsWith('original-vector'))||names[0];
   if(!found){svg.reason='NO_SVG_CREATED';}
   else {
     const data=fs.readFileSync(path.join(temp,found));const src=data.toString('utf8');
     if(!src.includes('<svg'))svg.reason='OUTPUT_NOT_SVG';
     else{
       const all=Array.from(src.matchAll(/<(path|line|rect|circle|polyline|polygon|use|image)\b[^>]*>/g),m=>({type:m[1],tag:m[0]}));
       const count={};for(const x of all)count[x.type]=(count[x.type]||0)+1;
       const stroked=all.filter(x=>/\bstroke\s*:\s*(?!none\b)[^;"]+/i.test(x.tag)||/\bstroke\s*=\s*["'](?!none\b)/i.test(x.tag));
       const samples=stroked.slice(0,12).map(x=>({type:x.type,d:(x.tag.match(/\bd\s*=\s*["']([^"']+)/)||[])[1]?.slice(0,160)||null,style:(x.tag.match(/\bstyle\s*=\s*["']([^"']+)/)||[])[1]?.slice(0,160)||null}));
       svg={available:true,reason:'SVG_SOURCE_STRUCTURE_EXTRACTED_NOT_SEMANTICALLY_TRACED',source_svg_sha256:sha(data),source_svg_bytes:data.length,element_counts:count,stroke_bearing_inline_elements:stroked.length,root_dimensions:(src.match(/<svg\b[^>]{0,600}>/)||[])[0]?.slice(0,600)||null,sample_stroke_geometry:samples,geometry_semantics_qualified:false,field_marker_connector_incidence_qualified:false};
     }
   }
 }catch(err){svg.reason='VECTOR_EXPORT_UNAVAILABLE_'+String(err.message).slice(0,180)}
}finally{fs.rmSync(temp,{recursive:true,force:true})}
const hostiles=[
['forge_gate',x=>x.gate.current_lawful_state.G1_authorized=true],
['forge_S004',x=>x.inverse.original_source_first_locations.find(z=>z.original_source_location_id==='L01-S004').disposition='COLD_COMPLETE'],
['alter_method_blob',x=>x.method.frozen_earlier_evidence.current_candidate.git_blob_sha='BAD'],
['confuse_text_strokes',x=>x.method.source_visual_inventory_candidate.direct_field_stroke_graph_status='QUALIFIED'],
['erase_method_alternative',x=>x.method.hypothesis_comparison.pop()],
['invent_PDF_SHA',x=>x.method.original.PDF_sha256='BAD'],
['invent_Y_count',x=>x.candidate.finding.source_hypercharge_numerals_printed=48],
['remove_source_owner',x=>x.ssc.items.pop()],
['invent_physical_mode',x=>x.gate.current_lawful_state.W_semantics_imported=true],
['erase_field_symbol',x=>x.method.source_visual_inventory_candidate.original_field_marker_symbols.pop()]
];
let rejected=0;if(!errors.length)for(const [name,mutation]of hostiles){const x=structuredClone(D);try{mutation(x);if(baseline(x).length)rejected++;else errors.push('HOSTILE_ESCAPE_'+name)}catch(e){errors.push('HOSTILE_CHECK_EXCEPTION_'+name+' '+e.message)}}
const result={schema:'isograph.exp062.track-L.G0.L01-Fig1-original-vector-carrier-probe.v0.1',PASS:errors.length===0,errors,original_PDF_SHA256_verified:originalPDFVerified,original_page3_text_verified:textPageVerified,original_page3_raster_verified:originalRasterVerified,svg,source_model_cardinalities:{cells:16,source_species_glyphs:48,printed_Y_values:16},hostiles_defined:hostiles.length,hostiles_rejected:rejected,G0_frozen:false,L01_S004_cold_complete:false,whole_source_cold_complete:0,source_topology_determined:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
