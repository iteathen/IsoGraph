// G0 source-first L04 original Fig1/Fig2 TRIANGLE GLYPH POLARITY probe.
// Do not infer charge/helicity from orientation without original source words.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const src=JSON.parse(fs.readFileSync(P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8')).original_sources[3];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const expected='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const specs=[
 {page:14,srcGraph:P+'LISI_L04_ORIGINAL_FIGURE1_24_VERTEX_60_EDGE_SOURCE_CELLS_0_1.json',svgSHA:'d18cfa48eb5763afb52efd435d1de7149a9b1b1c7e94f66f37db7eb1c278357f',transform:'matrix(0.47862',colors:{source_glyph:'rgb(92.999268%, 92.999268%, 0%)'}},
 {page:16,srcGraph:P+'LISI_L04_ORIGINAL_FIGURE2_192_VERTEX_192_EDGE_SOURCE_CELLS_0_1.json',svgSHA:'de073783202a4ddabd0647b77e672dcb3545321ce54ab1e0f74dd36239b918e3',transform:'matrix(1.24861',colors:{
 neutrino:'rgb(84.999084%, 84.999084%, 84.999084%)',charged_lepton:'rgb(92.999268%, 92.999268%, 0%)',up_red:'rgb(84.999084%, 25.500488%, 25.500488%)',down_orange:'rgb(97.998047%, 48.999023%, 9.799194%)',up_green:'rgb(5.999756%, 59.999084%, 5.999756%)',down_chartreuse:'rgb(67.549133%, 96.498108%, 24.125671%)',up_blue:'rgb(23.999023%, 52.000427%, 79.998779%)',down_purple:'rgb(67.89856%, 58.200073%, 96.998596%)'}}
];
const attr=(tag,key)=>tag.match(new RegExp('\\b'+key+'="([^"]+)"'))?.[1]||'';
const coord=d=>[...d.matchAll(/[ML]\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)].map(m=>({x:+m[1],y:+m[2]}));
const unique=arr=>arr.filter((p,i)=>arr.findIndex(q=>Math.hypot(p.x-q.x,p.y-q.y)<.005)===i);
const area=p=>{const x=p.map(q=>q.x),y=p.map(q=>q.y);return (Math.max(...x)-Math.min(...x))*(Math.max(...y)-Math.min(...y))};
if(src?.id!=='L04'||src.revision!=='arXiv:2407.02497v2'||src.PDF_SHA256!==expected||src.PDF_byte_count!==348134)throw Error('HISTORICAL_ORIGINAL_REVISION');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-original-glyph-orient-'));
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('PDF_HTTP_'+response.status);
 const bin=Buffer.from(await response.arrayBuffer());if(bin.length!==348134||sha(bin)!==expected)throw Error('WRONG_ORIGINAL_PDF');
 const source=path.join(dir,'original.pdf');fs.writeFileSync(source,bin);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[source],{encoding:'utf8',timeout:12000})))throw Error('PDF_PAGE_COUNT');
 for(const z of specs){
  const graph=JSON.parse(fs.readFileSync(z.srcGraph,'utf8'));
  const output=path.join(dir,'fig'+z.page+'.svg');
  execFileSync('pdftocairo',['-f',String(z.page),'-l',String(z.page),'-svg',source,output],{timeout:30000});
  const svg=fs.readFileSync(output,'utf8');
  if(sha(Buffer.from(svg))!==z.svgSHA)throw Error('ORIGINAL_SOURCE_FIGURE_SHA_'+z.page);
  const tags=svg.match(/<path\b[^>]*>/g)||[],glyph=[];
  for(const tag of tags){
   if(!attr(tag,'transform').includes(z.transform))continue;
   const color=Object.entries(z.colors).find(([,v])=>v===attr(tag,'fill'))?.[0];
   if(!color||attr(tag,'stroke')!=='rgb(25%, 25%, 25%)')continue;
   const v=unique(coord(attr(tag,'d')));
   const ys=v.map(p=>p.y),top=Math.min(...ys),bottom=Math.max(...ys);
   const nearTop=v.filter(p=>p.y<top+.05).length,nearBottom=v.filter(p=>p.y>bottom-.05).length;
   const orientation=nearTop===1&&nearBottom>=2?'UP':nearBottom===1&&nearTop>=2?'DOWN':'UNCLASSIFIED';
   glyph.push({id:glyph.length,source_vertex:graph.markers[glyph.length]?.vertex,color,orientation,distinct_path_corners:v.length,nearTop,nearBottom,area:+area(v).toFixed(5),source_path_points:v});
  }
  if(glyph.length!==graph.markers.length)throw Error('ORIGINAL_FIGURE_GLYPH_COUNT_'+z.page);
  const histogram={};for(const g of glyph){histogram[g.orientation]=(histogram[g.orientation]||0)+1;if(g.source_vertex===undefined)throw Error('NO_SOURCE_VTX')}
  console.log('L04_ORIGINAL_GLYPH_ORIENTATION_'+z.page+'_BEGIN');
  console.log(JSON.stringify({schema:'isograph.track-L.G0.original-figure-glyph-polarity-source-only.v0.1',source_sha256:expected,original_svg_sha256:z.svgSHA,page:z.page,original_fig_group:graph.source_group,all_marker_polygons:glyph,orientation_count:histogram,source_interpretation_OF_orientation_not_assumed:true,whole_L04_original_cold_complete:false,G0_frozen:false,G1_authorized:false}));
  console.log('L04_ORIGINAL_GLYPH_ORIENTATION_'+z.page+'_END');
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
