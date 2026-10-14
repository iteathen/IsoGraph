// L-only G0 ORIGINAL primary-PDF figure 1/2 complete vertex/edge source inventory.
// This emits candidate source evidence; it does NOT qualify SSC or freeze G0.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const ROOT='research/woit-lisi-isomorph/lisi/';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const original=JSON.parse(fs.readFileSync(ROOT+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8')).original_sources[3];
const crosswalk=JSON.parse(fs.readFileSync(ROOT+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json','utf8'));
const digest='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const specs=[
 {page:14,group:'L04-S041',atom:'L04-P014-B003',owners:['L-SSC-119','L-SSC-120'],pageSHA:'faf74d2a90fab12b0517d101b9b157ff044e9ec40761f80a2e1d52b08f313c18',svgSHA:'d18cfa48eb5763afb52efd435d1de7149a9b1b1c7e94f66f37db7eb1c278357f',transform:'matrix(0.47862',lines:{
 red:'rgb(91.998291%, 45.999146%, 45.999146%)',green:'rgb(18.400574%, 91.998291%, 18.400574%)',blue:'rgb(18.000793%, 53.999329%, 89.997864%)',triality:'rgb(25%, 25%, 25%)'},marks:{source_glyph:'rgb(92.999268%, 92.999268%, 0%)'}},
 {page:16,group:'L04-S048',atom:'L04-P016-B001',owners:['L-SSC-123'],pageSHA:'7595a5b8c5c6f7574b0e877d08ed8a1649d399b8d31818d0bcb4289463fdc2c7',svgSHA:'de073783202a4ddabd0647b77e672dcb3545321ce54ab1e0f74dd36239b918e3',transform:'matrix(1.24861',lines:{triality:'rgb(49.998474%, 49.998474%, 49.998474%)'},marks:{
 neutrino:'rgb(84.999084%, 84.999084%, 84.999084%)',charged_lepton:'rgb(92.999268%, 92.999268%, 0%)',up_red:'rgb(84.999084%, 25.500488%, 25.500488%)',down_orange:'rgb(97.998047%, 48.999023%, 9.799194%)',up_green:'rgb(5.999756%, 59.999084%, 5.999756%)',down_chartreuse:'rgb(67.549133%, 96.498108%, 24.125671%)',up_blue:'rgb(23.999023%, 52.000427%, 79.998779%)',down_purple:'rgb(67.89856%, 58.200073%, 96.998596%)'}}];
const attr=(s,name)=>s.match(new RegExp('\\b'+name+'="([^"]+)"'))?.[1]||'';
const coords=d=>[...d.matchAll(/[ML]\s*([+-]?\d+(?:\.\d+)?)\s+([+-]?\d+(?:\.\d+)?)/g)].map(x=>[+x[1],+x[2]]);
const unique=o=>[...new Set(o)];
const groups=edges=>{
 const nodes=unique(edges.flatMap(e=>[e.a,e.b])).sort((a,b)=>a-b),adj=Object.fromEntries(nodes.map(id=>[id,[]]));
 for(const e of edges){adj[e.a].push(e.b);adj[e.b].push(e.a)}
 const seen=new Set(),out=[];
 for(const id of nodes)if(!seen.has(id)){const todo=[id],component=[];seen.add(id);while(todo.length){const a=todo.pop();component.push(a);for(const b of adj[a])if(!seen.has(b)){seen.add(b);todo.push(b)}}out.push(component.sort((a,b)=>a-b))}
 return out.sort((a,b)=>a[0]-b[0]);
};
if(original.id!=='L04'||original.revision!=='arXiv:2407.02497v2'||original.PDF_SHA256!==digest||original.PDF_byte_count!==348134||original.original_pdf_extracted_pages.length!==17)throw Error('FROZEN_PDF_VERSION');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-original-finite-figure-graph-'));
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('SOURCE_PDF_HTTP_'+response.status);
 const bin=Buffer.from(await response.arrayBuffer());
 if(bin.length!==348134||sha(bin)!==digest)throw Error('WRONG_ORIGINAL_SOURCE_PDF');
 const pdf=path.join(temp,'original.pdf');fs.writeFileSync(pdf,bin);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000})))throw Error('SOURCE_PDF_PAGES');
 for(const spec of specs){
  const sourceBlock=crosswalk.original_first_source_blocks.find(x=>x.atom_id===spec.atom);
  if(sourceBlock?.original_first_role!=='ORIGINAL_DIAGRAM_CAPTION_MAPPING_VISUAL_EDGE_INCIDENCE_STILL_OPEN'||!sourceBlock.source_group_ids.includes(spec.group)||JSON.stringify(sourceBlock.existing_SSC_owner_ids.slice().sort())!==JSON.stringify(spec.owners.slice().sort()))throw Error('FIGURE_SOURCE_OWNER_MISMATCH');
  const page=execFileSync('pdftotext',['-f',String(spec.page),'-l',String(spec.page),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:15000});
  if(sha(page)!==spec.pageSHA||original.original_pdf_extracted_pages[spec.page-1].original_extracted_page_SHA256!==spec.pageSHA)throw Error('FIGURE_ORIGINAL_PAGE_SHA');
  const filepath=path.join(temp,'original-'+spec.page+'.svg');
  execFileSync('pdftocairo',['-f',String(spec.page),'-l',String(spec.page),'-svg',pdf,filepath],{timeout:30000});
  const svg=fs.readFileSync(filepath,'utf8');
  if(sha(Buffer.from(svg))!==spec.svgSHA)throw Error('ORIGINAL_FIGURE_SVG_SHA');
  const tags=svg.match(/<path\b[^>]*>/g)||[];
  const nodes=[],edges=[],glyphs=[],other=[];
  const locate=(x,y)=>{let n=nodes.findIndex(z=>Math.hypot(z.x-x,z.y-y)<=.01);if(n<0){n=nodes.length;nodes.push({id:n,x,y})}return n};
  for(const tag of tags){
   if(!attr(tag,'transform').includes(spec.transform))continue;
   const d=attr(tag,'d'),stroke=attr(tag,'stroke'),fill=attr(tag,'fill');
   const loc=coords(d),line=Object.entries(spec.lines).find(([,rgb])=>rgb===stroke)?.[0];
   if(line&&fill==='none'){
    if(loc.length!==2){other.push({type:'unexpected_line',stroke,points:loc.length});continue}
    edges.push({id:edges.length,color:line,a:locate(...loc[0]),b:locate(...loc[1])});
   }
   const mark=Object.entries(spec.marks).find(([,rgb])=>rgb===fill)?.[0];
   if(mark&&stroke==='rgb(25%, 25%, 25%)'){
    if(loc.length<3){other.push({type:'unexpected_glyph',fill,points:loc.length});continue}
    const xs=loc.map(p=>p[0]),ys=loc.map(p=>p[1]),left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
    glyphs.push({category:mark,cx:(left+right)/2,cy:(top+bottom)/2,w:right-left,h:bottom-top});
   }
  }
  const marks=glyphs.map((g,i)=>{
   const nearest=nodes.map((n,k)=>({id:k,dist:Math.hypot(n.x-g.cx,n.y-g.cy)})).sort((a,b)=>a.dist-b.dist)[0];
   return {id:i,vertex:nearest.id,category:g.category,area:+(g.w*g.h).toFixed(5),distance:+nearest.dist.toFixed(5)};
  });
  if(other.length||marks.length!==nodes.length||new Set(marks.map(x=>x.vertex)).size!==nodes.length||marks.some(x=>x.distance>5))throw Error('INCOMPLETE_MARKER_OR_EDGE_EXTRACTION_'+spec.page);
  for(const n of nodes){
   const m=marks.find(x=>x.vertex===n.id);
   n.category=m.category;n.area=m.area;
  }
  const color=(c)=>edges.filter(x=>x.color===c);
  const counts=Object.fromEntries(Object.keys(spec.lines).map(c=>[c,color(c).length]));
  const components=groups(edges);
  const black=groups(color('triality'));
  const sourceSemantics={};
  if(spec.page===14){
   const generation={};for(const name of ['red','green','blue']){
    const es=color(name),vs=unique(es.flatMap(e=>[e.a,e.b]));
    for(const v of vs)generation[v]=name;
    const degrees=vs.map(v=>es.filter(e=>e.a===v||e.b===v).length);
    if(es.length!==12||vs.length!==8||degrees.some(d=>d!==3)||groups(es).length!==1)throw Error('SOURCE_CUBE_NOT_8_VERTEX_12_EDGE_'+name);
   }
   if(nodes.length!==24||edges.length!==60||color('triality').length!==24||black.length!==8||black.some(g=>g.length!==3||unique(g.map(v=>generation[v])).length!==3))throw Error('FIGURE1_TRIANGULAR_GENERATION_TRIALITY');
   sourceSemantics.cube_role_nodes=Object.fromEntries(['red','green','blue'].map(c=>[c,Object.keys(generation).filter(n=>generation[n]===c).map(Number).sort((a,b)=>a-b)]));
   sourceSemantics.triality_triplets=black;sourceSemantics.glyph_area_by_cube=Object.fromEntries(['red','green','blue'].map(c=>[c,sourceSemantics.cube_role_nodes[c].map(v=>nodes[v].area)]));
  }else{
   const species=Object.keys(spec.marks);
   if(nodes.length!==192||edges.length!==192||black.length!==64||black.some(g=>g.length!==3||unique(g.map(v=>nodes[v].category)).length!==1)||components.length!==64)throw Error('FIGURE2_ORIGINAL_64_TRIANGULAR_TRIALITY');
   for(const category of species)if(nodes.filter(n=>n.category===category).length!==24)throw Error('FIGURE2_PER_TYPE_24_'+category);
   sourceSemantics.source_particle_types=species;
   sourceSemantics.per_type_triality_triplets=Object.fromEntries(species.map(c=>[c,black.filter(g=>nodes[g[0]].category===c)]));
   if(species.some(c=>sourceSemantics.per_type_triality_triplets[c].length!==8))throw Error('FIGURE2_PER_TYPE_TRIANGLE_CARDINALITY');
  }
  const out={schema:'isograph.track-L.G0.L04-original-PDF-Fig1-Fig2-all-vertex-edge-source-candidate.v0.1',track:'L',stage:'G0',semantic_authority:false,source_revision:'arXiv:2407.02497v2',original_PDF_SHA256:digest,pdf_page:spec.page,source_group:spec.group,SSC_owner_ids:spec.owners,caption_atom:spec.atom,source_page_SHA256:spec.pageSHA,original_svg_SHA256:spec.svgSHA,tolerance:.01,vertices:nodes,edges,markers:marks,incidence_summary:{vertices:nodes.length,edges:edges.length,edge_palette:counts,connected_component_sizes:components.map(c=>c.length),triality_triplets:black.length,unmatched_markers:0,duplicate_marker_owners:0},source_semantics:sourceSemantics,complete_original_figure_incidence_candidate:true,whole_L04_source_semantic_cold_qualified:false,G0_frozen:false,G1_authorized:false};
  const json=JSON.stringify(out);
  console.log('L04_ORIGINAL_COMPLETE_FIGURE_'+spec.page+'_BEGIN');
  console.log(json);
  console.log('L04_ORIGINAL_COMPLETE_FIGURE_'+spec.page+'_END');
  console.log('L04_ORIGINAL_COMPLETE_FIGURE_SUMMARY '+JSON.stringify({page:spec.page,figure_source_sha256:sha(Buffer.from(json)),vertices:nodes.length,edges:edges.length,triplets:black.length,original_svg_sha256:spec.svgSHA,source_complete_cold:false,G0_frozen:false}));
 }
}finally{fs.rmSync(temp,{recursive:true,force:true});}
