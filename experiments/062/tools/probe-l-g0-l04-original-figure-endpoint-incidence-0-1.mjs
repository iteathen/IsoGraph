// Independent L-only original L04 FIGURE 1/2 exact SVG incidence probe.
// First collect all original straight line segments from the SHA-pinned PDF,
// then report connected-component/degrees for multiple geometric tolerances.
// This probe is NOT a G0 source-coverage qualification or physical-theory proof.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const original=JSON.parse(fs.readFileSync(P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json','utf8')).original_sources[3];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const digest='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const target=[
 {page:14,source_group:'L04-S041',vectorExpectedSHA:'d18cfa48eb5763afb52efd435d1de7149a9b1b1c7e94f66f37db7eb1c278357f',
  colors:{red:'rgb(91.998291%, 45.999146%, 45.999146%)',green:'rgb(18.400574%, 91.998291%, 18.400574%)',blue:'rgb(18.000793%, 53.999329%, 89.997864%)',triality:'rgb(25%, 25%, 25%)'}},
 {page:16,source_group:'L04-S048',vectorExpectedSHA:'de073783202a4ddabd0647b77e672dcb3545321ce54ab1e0f74dd36239b918e3',
  colors:{triality:'rgb(49.998474%, 49.998474%, 49.998474%)'}}
];
if(original?.revision!=='arXiv:2407.02497v2'||original.id!=='L04'||original.PDF_SHA256!==digest||original.PDF_byte_count!==348134)throw Error('HISTORICAL_FROZEN_SOURCE_INVALID');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'iso-L04-original-fig-graph-'));
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('WRONG_ORIGINAL_HTTP');
 const bin=Buffer.from(await response.arrayBuffer());
 if(bin.length!==348134||sha(bin)!==digest)throw Error('NOT_FROZEN_ORIGINAL_SOURCE');
 const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,bin);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_SOURCE_PAGES');
 for(const spec of target){
  const pg=spec.page;
  const raw=execFileSync('pdftotext',['-f',String(pg),'-l',String(pg),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:15000,maxBuffer:1900000});
  if(sha(raw)!==original.original_pdf_extracted_pages[pg-1].original_extracted_page_SHA256)throw Error('ORIGINAL_PAGE_SHA_'+pg);
  const output=path.join(dir,'original'+pg+'.svg');
  execFileSync('pdftocairo',['-f',String(pg),'-l',String(pg),'-svg',pdf,output],{timeout:30000});
  const svg=fs.readFileSync(output,'utf8');
  if(sha(Buffer.from(svg))!==spec.vectorExpectedSHA)throw Error('ORIGINAL_VECTOR_SVG_HASH_DISAGREEMENT_'+pg);
  const tags=svg.match(/<path\b[^>]*>/g)||[];
  const edges=[],failures=[];
  for(const tag of tags){
   const stroke=tag.match(/\bstroke="([^"]+)"/)?.[1],fill=tag.match(/\bfill="([^"]+)"/)?.[1]||null,d=tag.match(/\bd="([^"]+)"/)?.[1]||'';
   const color=Object.entries(spec.colors).find(([name,rgb])=>stroke===rgb)?.[0];
   if(!color||fill!=='none')continue;
   const trans=tag.match(/\btransform="([^"]+)"/)?.[1]||'';
   // Exclude source page text decoration and marker outline: the figure's
   // vector line paths share its own coordinate transform, and have fill none.
   if(pg===14&&!trans.includes('matrix(0.47862'))continue;
   if(pg===16&&!trans.includes('matrix(1.24861'))continue;
   const match=d.match(/^\s*M\s*([+-]?\d+(?:\.\d+)?)\s+([+-]?\d+(?:\.\d+)?)\s+L\s*([+-]?\d+(?:\.\d+)?)\s+([+-]?\d+(?:\.\d+)?)/);
   if(!match){failures.push({color,d:d.slice(0,140)});continue}
   edges.push({color,x1:+match[1],y1:+match[2],x2:+match[3],y2:+match[4]});
  }
  const probe=tolerance=>{
   const nodes=[];
   const locate=(x,y)=>{let i=nodes.findIndex(v=>Math.hypot(v.x-x,v.y-y)<=tolerance);if(i<0){i=nodes.length;nodes.push({x,y})}return i};
   const links=edges.map(e=>({...e,a:locate(e.x1,e.y1),b:locate(e.x2,e.y2)}));
   const degree=Array(nodes.length).fill(0),adj=nodes.map(()=>[]),perColor={};
   for(const e of links){degree[e.a]++;degree[e.b]++;adj[e.a].push(e.b);adj[e.b].push(e.a);
    let c=perColor[e.color]||(perColor[e.color]={edgeCount:0,vertexIds:new Set()});c.edgeCount++;c.vertexIds.add(e.a);c.vertexIds.add(e.b);}
   const seen=new Set(),components=[];
   for(let i=0;i<nodes.length;i++)if(!seen.has(i)){const stack=[i];seen.add(i);let members=[];while(stack.length){let j=stack.pop();members.push(j);for(const k of adj[j])if(!seen.has(k)){seen.add(k);stack.push(k)}}components.push(members)}
   const hist={};for(const d of degree)hist[d]=(hist[d]||0)+1;
   const componentsBySize={};for(const c of components)componentsBySize[c.length]=(componentsBySize[c.length]||0)+1;
   return {tolerance,vertexCount:nodes.length,edgeCount:links.length,degreeHistogram:hist,componentSizeHistogram:componentsBySize,
      coloredSubgraphs:Object.fromEntries(Object.entries(perColor).map(([k,v])=>[k,{edges:v.edgeCount,vertices:v.vertexIds.size}])),
      first10Links:links.slice(0,10).map(e=>({color:e.color,a:e.a,b:e.b})),
      first8Nodes:nodes.slice(0,8)};
  };
  console.log('L04_ORIGINAL_FIGURE_INCIDENCE_'+pg+'_BEGIN');
  console.log(JSON.stringify({schema:'isograph.exp062-L04-original-figure-vector-incidence-first-probe.v0.1',track:'L',stage:'G0',page:pg,source_group:spec.source_group,source_pdf_SHA256:digest,original_svg_SHA256:spec.vectorExpectedSHA,line_segments_parsed:edges.length,nonstraight_colored_candidates:failures,
    color_counts:Object.fromEntries(Object.keys(spec.colors).map(k=>[k,edges.filter(e=>e.color===k).length])),
    clustering:[0.001,0.01,0.05,0.2,0.5].map(probe),source_exact_figure_semantics_NOT_YET_QUALIFIED:true,G0_frozen:false,G1_authorized:false},null,2));
  console.log('L04_ORIGINAL_FIGURE_INCIDENCE_'+pg+'_END');
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
