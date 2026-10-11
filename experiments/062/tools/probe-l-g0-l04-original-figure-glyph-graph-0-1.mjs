// Original L04 Fig1/Fig2 MARKER-to-VERTEX identity probe, source-first G0.
// Reconstruct only the author's frozen SVG geometry and caption palette,
// never infer physical equivalence or close G0 from screenshot recognition.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const orig=JSON.parse(fs.readFileSync(P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8')).original_sources[3];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const sourceHash='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const targets=[
 {page:14,svgSha:'d18cfa48eb5763afb52efd435d1de7149a9b1b1c7e94f66f37db7eb1c278357f',sourceGroup:'L04-S041',figureTransform:'matrix(0.47862',
 lineColors:{red:'rgb(91.998291%, 45.999146%, 45.999146%)',green:'rgb(18.400574%, 91.998291%, 18.400574%)',blue:'rgb(18.000793%, 53.999329%, 89.997864%)',triality:'rgb(25%, 25%, 25%)'},
 markerColors:{source_glyph:'rgb(92.999268%, 92.999268%, 0%)'}},
 {page:16,svgSha:'de073783202a4ddabd0647b77e672dcb3545321ce54ab1e0f74dd36239b918e3',sourceGroup:'L04-S048',figureTransform:'matrix(1.24861',
 lineColors:{triality:'rgb(49.998474%, 49.998474%, 49.998474%)'},
 markerColors:{neutrino:'rgb(84.999084%, 84.999084%, 84.999084%)',charged_lepton:'rgb(92.999268%, 92.999268%, 0%)',up_red:'rgb(84.999084%, 25.500488%, 25.500488%)',down_orange:'rgb(97.998047%, 48.999023%, 9.799194%)',up_green:'rgb(5.999756%, 59.999084%, 5.999756%)',down_chartreuse:'rgb(67.549133%, 96.498108%, 24.125671%)',up_blue:'rgb(23.999023%, 52.000427%, 79.998779%)',down_purple:'rgb(67.89856%, 58.200073%, 96.998596%)'}}
];
const attr=(s,name)=>s.match(new RegExp('\\b'+name+'="([^"]+)"'))?.[1]||null;
const coords=d=>[...d.matchAll(/[ML]\s*([+-]?\d+(?:\.\d+)?)\s+([+-]?\d+(?:\.\d+)?)/g)].map(z=>({x:+z[1],y:+z[2]}));
const find=(arr,x,y,tol=.01)=>{let i=arr.findIndex(n=>Math.hypot(n.x-x,n.y-y)<=tol);if(i===-1){i=arr.length;arr.push({x,y})}return i};
if(orig?.id!=='L04'||orig.revision!=='arXiv:2407.02497v2'||orig.PDF_SHA256!==sourceHash||orig.PDF_byte_count!==348134)throw Error('EXACT_ORIGINAL_PDF_PIN');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'iso-L04-original-marker-map-'));
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('ORIGINAL_PDF_HTTP_'+response.status);
 const bin=Buffer.from(await response.arrayBuffer());
 if(bin.length!==348134||sha(bin)!==sourceHash)throw Error('WRONG_HISTORICAL_L04_PDF');
 const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,bin);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000})))throw Error('WRONG_ORIGINAL_L04_PAGES');
 for(const z of targets){
  const raw=execFileSync('pdftotext',['-f',String(z.page),'-l',String(z.page),'-layout','-enc','UTF-8',pdf,'-'],{timeout:15000});
  if(sha(raw)!==orig.original_pdf_extracted_pages[z.page-1].original_extracted_page_SHA256)throw Error('EXACT_ORIGINAL_LAYOUT_PAGE_'+z.page);
  const svgfile=path.join(dir,'fig'+z.page+'.svg');
  execFileSync('pdftocairo',['-f',String(z.page),'-l',String(z.page),'-svg',pdf,svgfile],{timeout:30000});
  const svg=fs.readFileSync(svgfile,'utf8');
  if(sha(Buffer.from(svg))!==z.svgSha)throw Error('ORIGINAL_VECTOR_BYTES_CHANGED_'+z.page);
  const tags=svg.match(/<path\b[^>]*>/g)||[],edges=[],glyphs=[],nonstraight=[];
  for(const tag of tags){
   if(!(attr(tag,'transform')||'').includes(z.figureTransform))continue;
   const stroke=attr(tag,'stroke'),fill=attr(tag,'fill'),d=attr(tag,'d')||'';
   const c=coords(d);
   const lineClass=Object.entries(z.lineColors).find(([,v])=>v===stroke)?.[0];
   if(lineClass&&fill==='none'){
     if(c.length!==2){nonstraight.push({type:'line',stroke,points:c.length});continue}
     edges.push({color:lineClass,p:c[0],q:c[1]});
   }
   const category=Object.entries(z.markerColors).find(([,v])=>v===fill)?.[0];
   if(category&&stroke==='rgb(25%, 25%, 25%)'){
     if(c.length<3){nonstraight.push({type:'marker',fill,points:c.length});continue}
     const xx=c.map(k=>k.x),yy=c.map(k=>k.y);
     const bbox={x0:Math.min(...xx),x1:Math.max(...xx),y0:Math.min(...yy),y1:Math.max(...yy)};
     glyphs.push({category,cx:(bbox.x0+bbox.x1)/2,cy:(bbox.y0+bbox.y1)/2,width:bbox.x1-bbox.x0,height:bbox.y1-bbox.y0});
   }
  }
  const nodes=[],E=edges.map(e=>({color:e.color,a:find(nodes,e.p.x,e.p.y),b:find(nodes,e.q.x,e.q.y)}));
  const nearest=g=>nodes.reduce((acc,n,k)=>{const d=Math.hypot(g.cx-n.x,g.cy-n.y);return d<acc.dist?{id:k,dist:d}:acc},{id:-1,dist:Infinity});
  const assignments=glyphs.map(g=>({...g,...nearest(g)}));
  const hist=(arr,key)=>Object.fromEntries([...new Set(arr.map(key))].sort().map(k=>[k,arr.filter(v=>key(v)===k).length]));
  const assigned=hist(assignments,x=>x.id);
  const categoryMap=Object.fromEntries(nodes.map((n,i)=>[i,assignments.filter(g=>g.id===i).map(g=>g.category)]));
  const adj=nodes.map(()=>[]);
  for(const e of E){adj[e.a].push(e.b);adj[e.b].push(e.a)}
  const seen=new Set(),components=[];
  for(let i=0;i<nodes.length;i++)if(!seen.has(i)){const stack=[i],members=[];seen.add(i);while(stack.length){const u=stack.pop();members.push(u);for(const v of adj[u])if(!seen.has(v)){seen.add(v);stack.push(v)}}components.push(members)}
  const compPurity=components.map(member=>({size:member.length,colors:[...new Set(member.flatMap(id=>categoryMap[id]))].sort()}));
  const byType=Object.fromEntries(Object.keys(z.markerColors).map(k=>{
   const f=assignments.filter(g=>g.category===k);
   return [k,{count:f.length,assigned_vertex_count:new Set(f.map(g=>g.id)).size,unique_sizes:hist(f,g=>Math.round(g.width*g.height*100)/100),max_match_distance:Math.max(0,...f.map(g=>g.dist))}]
  }));
  let cubes=null;
  if(z.page===14){
   const groups=Object.keys(z.lineColors).filter(k=>k!=='triality');
   const colorNodes=Object.fromEntries(groups.map(k=>[k,new Set(E.filter(e=>e.color===k).flatMap(e=>[e.a,e.b]))]));
   const assignedGeneration={};for(const [k,values]of Object.entries(colorNodes))for(const id of values){assignedGeneration[id]??=[];assignedGeneration[id].push(k)}
   const black=E.filter(e=>e.color==='triality');
   const cross=black.filter(e=>assignedGeneration[e.a]?.[0]!==assignedGeneration[e.b]?.[0]).length;
   const degreesByColor=Object.fromEntries(groups.map(k=>{const d={};for(const e of E.filter(e=>e.color===k)){d[e.a]=(d[e.a]||0)+1;d[e.b]=(d[e.b]||0)+1}return [k,hist([...colorNodes[k]],id=>d[id]||0)]}));
   cubes={vertices_by_cube:Object.fromEntries(Object.entries(colorNodes).map(([k,v])=>[k,v.size])),generation_overlap_nodes:Object.values(assignedGeneration).filter(x=>x.length!==1).length,black_edges_cross_generations:cross,black_edges_total:black.length,cube_degree_histograms:degreesByColor};
  }
  console.log('L04_SOURCE_FIGURE_GLYPH_GRAPH_'+z.page+'_BEGIN');
  console.log(JSON.stringify({schema:'isograph.exp062-L04-frozen-original-figure-glyph-graph-probe.v0.1',track:'L',stage:'G0',source_revision:'arXiv:2407.02497v2',PDF_SHA256:sourceHash,svg_sha256:z.svgSha,page:z.page,source_group:z.sourceGroup,
   line_count:E.length,node_count:nodes.length,glyph_count:glyphs.length,line_classes:hist(E,e=>e.color),marker_types:byType,markers_unmatched:assignments.filter(x=>x.dist>5).length,duplicate_marker_node_assignments:Object.values(assigned).filter(x=>x>1).length,unmarked_nodes:nodes.filter((_,i)=>!(i in assigned)).length,
   marker_match_distance_summary:{min:Math.min(...assignments.map(g=>g.dist)),max:Math.max(...assignments.map(g=>g.dist)),first6:assignments.slice(0,6).map(g=>({category:g.category,node:g.id,distance:g.dist,width:g.width,height:g.height}))},
   graph_component_sizes:hist(components,x=>x.length),component_palette_count:hist(compPurity,c=>c.colors.length),nonstraight_candidates:nonstraight,cube_relation:cubes,
   source_exact_figure_all_incidence_qualified:false,G0_frozen:false,G1_authorized:false},null,2));
  console.log('L04_SOURCE_FIGURE_GLYPH_GRAPH_'+z.page+'_END');
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
