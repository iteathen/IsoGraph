// IsoGraph G0 L-only exact ORIGINAL PDF FIG1/Fig2 full graph source fidelity.
// Cold reverse: start at original SHA-pinned PDF SVG and map each drawn path
// onto candidate every-edge/every-marker witnesses; do NOT prove physics,
// freeze SSC, or infer undrawn CPT/24-cell edges.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/';
const F={
 packet:P+'LISI_L04_ORIGINAL_FIGURES_SOURCE_FULL_VERTEX_EDGE_INCIDENCE_G0_0_2.json',
 oldPacket:P+'LISI_L04_ORIGINAL_FIGURES_SOURCE_FULL_VERTEX_EDGE_INCIDENCE_G0_0_1.json',
 glyph1:P+'LISI_L04_ORIGINAL_FIGURE1_GLYPH_POLARITY_SOURCE_CELLS_0_2.json',
 glyph2:P+'LISI_L04_ORIGINAL_FIGURE2_GLYPH_POLARITY_SOURCE_CELLS_0_2.json',
 graph1:P+'LISI_L04_ORIGINAL_FIGURE1_24_VERTEX_60_EDGE_SOURCE_CELLS_0_1.json',
 graph2:P+'LISI_L04_ORIGINAL_FIGURE2_192_VERTEX_192_EDGE_SOURCE_CELLS_0_1.json',
 original:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 crosswalk:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_10.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_77.json',
 register:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_31.json',
 self:'experiments/062/tools/verify-l-g0-l04-original-full-figures-source-0-3.mjs'
};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const A=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,v])=>[k,read(v)]));
const B=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,gitsha(v)]));
const digest='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const specs=[
 {page:14,id:'L04-S041',atom:'L04-P014-B003',owners:['L-SSC-119','L-SSC-120'],layout:'faf74d2a90fab12b0517d101b9b157ff044e9ec40761f80a2e1d52b08f313c18',svg:'d18cfa48eb5763afb52efd435d1de7149a9b1b1c7e94f66f37db7eb1c278357f',transform:'matrix(0.47862',lines:{red:'rgb(91.998291%, 45.999146%, 45.999146%)',green:'rgb(18.400574%, 91.998291%, 18.400574%)',blue:'rgb(18.000793%, 53.999329%, 89.997864%)',triality:'rgb(25%, 25%, 25%)'},marks:{source_glyph:'rgb(92.999268%, 92.999268%, 0%)'},graph:'graph1'},
 {page:16,id:'L04-S048',atom:'L04-P016-B001',owners:['L-SSC-123'],layout:'7595a5b8c5c6f7574b0e877d08ed8a1649d399b8d31818d0bcb4289463fdc2c7',svg:'de073783202a4ddabd0647b77e672dcb3545321ce54ab1e0f74dd36239b918e3',transform:'matrix(1.24861',lines:{triality:'rgb(49.998474%, 49.998474%, 49.998474%)'},marks:{
 neutrino:'rgb(84.999084%, 84.999084%, 84.999084%)',charged_lepton:'rgb(92.999268%, 92.999268%, 0%)',up_red:'rgb(84.999084%, 25.500488%, 25.500488%)',down_orange:'rgb(97.998047%, 48.999023%, 9.799194%)',up_green:'rgb(5.999756%, 59.999084%, 5.999756%)',down_chartreuse:'rgb(67.549133%, 96.498108%, 24.125671%)',up_blue:'rgb(23.999023%, 52.000427%, 79.998779%)',down_purple:'rgb(67.89856%, 58.200073%, 96.998596%)'},graph:'graph2'}
];
const attr=(s,n)=>s.match(new RegExp('\\b'+n+'="([^"]+)"'))?.[1]||'';
const points=d=>[...d.matchAll(/(?:M|L)\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)].map(m=>[Number(m[1]),Number(m[2])]);
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const components=(vertexIds,edges)=>{
 const adj=new Map(vertexIds.map(v=>[v,[]]));
 for(const e of edges){if(!adj.has(e.a)||!adj.has(e.b))return null;adj.get(e.a).push(e.b);adj.get(e.b).push(e.a)}
 const seen=new Set(),out=[];
 for(const node of vertexIds)if(!seen.has(node)){let stack=[node],c=[];seen.add(node);while(stack.length){let x=stack.pop();c.push(x);for(const y of adj.get(x))if(!seen.has(y)){seen.add(y);stack.push(y)}}out.push(c.sort((a,b)=>a-b))}
 return out.sort((a,b)=>a[0]-b[0]);
};
const perVertexDegree=(vs,es)=>Object.fromEntries(vs.map(v=>[v,es.filter(e=>e.a===v||e.b===v).length]));
const cubeCheck=(vs,es)=>{
 if(vs.length!==8||es.length!==12||components(vs,es)?.length!==1||Object.values(perVertexDegree(vs,es)).some(x=>x!==3))return false;
 const adj=new Map(vs.map(v=>[v,new Set()]));for(const e of es){adj.get(e.a).add(e.b);adj.get(e.b).add(e.a)}
 for(const root of vs){const distance=new Map([[root,0]]),q=[root];while(q.length){const n=q.shift();for(const v of adj.get(n))if(!distance.has(v)){distance.set(v,distance.get(n)+1);q.push(v)}}const histogram=[...distance.values()].reduce((a,x)=>(a[x]=(a[x]||0)+1,a),[]);if(!eq(histogram,[1,3,3,1]))return false}
 return true;
};
function verify(D,origin){
 const errors=[],assert=(value,msg)=>{if(!value)errors.push(msg)};
 const {packet:s,oldPacket:oldP,glyph1:pol1,glyph2:pol2,graph1:g1,graph2:g2,original:o,crosswalk:c,inv:i,ssc:n,register:r}=D;
 assert(s?.schema==='isograph.track-L.G0.L04-original-figures-complete-graph-source-0.2'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'source original-only L/G0 packet');
 assert(s?.frozen_primary?.revision==='arXiv:2407.02497v2'&&s.frozen_primary.PDF_SHA256===digest&&s.frozen_primary.PDF_bytes===348134&&s.frozen_primary.PDF_pages===17&&s.frozen_primary.source_manifest.git_blob_sha===B.original&&s.frozen_primary.original_block_crosswalk.git_blob_sha===B.crosswalk,'frozen source revision all-historical provenance');
 assert(s?.original_source_first_evidence?.full_source_graph_evidence?.run_id===38158275490&&s.original_source_first_evidence.full_source_graph_evidence.status==='success','separately qualified primary PDF source graph extraction job');
 assert(s?.predecessor_source_packet?.git_blob_sha===B.oldPacket&&oldP.schema==='isograph.track-L.G0.L04-original-figures-complete-graph-source-0.1'&&eq(s.original_figure_records,oldP.original_figure_records),'original visual graph fixture and historical failed audit conserved under successor');
 assert(s?.original_source_semantic_distinction?.failure_and_correction?.baseline_CI_run===38159001915&&s.original_source_semantic_distinction.failure_and_correction.old_baseline_failed===true,'preserve original cpt spacing failure, do not retroactively promote');
 assert(s?.original_glyph_polarity_source_evidence?.figure1?.git_blob_sha===B.glyph1&&s.original_glyph_polarity_source_evidence.figure2.git_blob_sha===B.glyph2&&s.original_glyph_polarity_source_evidence.previous_extraction.fig1_naively_unclassified===12&&s.original_glyph_polarity_source_evidence.previous_extraction.fig2_naively_unclassified===96,'original five-corner source glyph polarity method successor and exact fixture ancestry');
 assert(s.original_glyph_polarity_source_evidence.semantic_interpretation_OF_marker_polarity.startsWith('UNASSIGNED:')&&s.original_glyph_polarity_source_evidence.semantic_interpretation_OF_marker_polarity.includes('no physical label'),'source visible glyph polarity is NOT a licensed physics assignment');
 assert(s?.conservation?.frozen_L_source_pdf_units===6&&s.conservation.frozen_six_source_first_location_groups===350&&s.conservation.old_L04_original_source_group_count===53&&s.conservation.old_L_SSC_IDs===191&&eq(s.conservation.modified_source_group_ids,['L04-S041','L04-S048'])&&eq(s.conservation.planned_modified_existing_SSC_ids,['L-SSC-119','L-SSC-123'])&&s.conservation.new_typed_source_item_IDs===0,'source IDs and scope not inflated');
 assert(s?.stage_locks?.G0_frozen===false&&s.stage_locks.G1_authorized===false&&s.stage_locks.G0_all_six_whole_original_semantic_cold_complete_count===0&&s.stage_locks.author_math_physics_truth_proof_required_for_G0===false&&s.stage_locks.W_semantics_imported===false&&s.stage_locks.PR70_merge_authorized===false&&s.stage_locks.source_figure_reconstruction_scoped_verification_pending===true&&s.stage_locks.original_figure_triangle_glyph_polarity_independently_qualified===false&&s.stage_locks.original_figure_full_visual_glyph_polarity_cold_review_pending===true,'pending source-figure witness and G0/G1 locks');
 const f=o?.original_sources?.[3];
 assert(f?.id==='L04'&&f.revision==='arXiv:2407.02497v2'&&f.PDF_SHA256===digest&&f.PDF_byte_count===348134&&f.original_pdf_extracted_pages?.length===17,'original manifest independent of packet');
 assert(eq(i?.locations,A.inv.locations)&&eq(n?.items,A.ssc.items),'entire prior L04 source inventory and 191 SSC item bodies conserved in evidence-only probe');
 assert(i?.locations?.length===53&&n?.items?.length===191&&i.counts.remaining_exact_source_groups===2&&r?.per_source?.length===6&&r.per_source.reduce((sum,z)=>sum+z.source_first_location_units,0)===350&&r.per_source.every(z=>z.original_complete_cold_review_passed===false),'old G0 remains OPEN, no scope reduction before qualification');
 const sourceRows=s?.original_figure_records||[];
 assert(sourceRows.length===2&&eq(sourceRows.map(z=>z.id),specs.map(z=>z.id)),'original author two figure group source partition');
 for(const spec of specs){
  const rec=sourceRows.find(x=>x.id===spec.id),graph=D[spec.graph],polarity=spec.page===14?pol1:pol2;
  const raw=origin[spec.page];
  const targetPage=f?.original_pdf_extracted_pages?.[spec.page-1];
  assert(rec?.original_printed_page===spec.page&&rec.original_page_layout_SHA256===spec.layout&&rec.original_svg_SHA256===spec.svg&&rec.original_text_atom===spec.atom&&eq(rec.existing_SSC_owner_ids,spec.owners)&&rec.all_source_vertex_edge_evidence.git_blob_sha===B[spec.graph],'exact original figure locator/owner and physical blob '+spec.id);
  assert(graph?.schema==='isograph.track-L.G0.L04-original-PDF-Fig1-Fig2-all-vertex-edge-source-candidate.v0.1'&&graph.source_revision==='arXiv:2407.02497v2'&&graph.original_PDF_SHA256===digest&&graph.source_group===spec.id&&graph.original_svg_SHA256===spec.svg&&graph.source_page_SHA256===spec.layout&&graph.complete_original_figure_incidence_candidate===true&&graph.whole_L04_source_semantic_cold_qualified===false,'exact finite graph candidate before full-source cold');
  assert(sha(Buffer.from(raw?.layout||''))===spec.layout&&targetPage?.original_extracted_page_SHA256===spec.layout&&sha(Buffer.from(raw?.svg||''))===spec.svg,'SHA-pinned actual original PDF page and SVG '+spec.page);
  const block=targetPage?.blocks?.find(x=>x.source_atom_id===spec.atom);
  const layout=raw?.layout||'',lines=layout.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  const actual=lines.slice(block?.original_extracted_line_start-1,block?.original_extracted_line_end).join('\n');
  assert(!!block&&sha(Buffer.from(actual))===block.original_source_block_SHA256,'exact original author figure caption source block '+spec.atom);
  const reverse=c?.original_first_source_blocks?.find(x=>x.atom_id===spec.atom);
  assert(reverse?.original_first_role==='ORIGINAL_DIAGRAM_CAPTION_MAPPING_VISUAL_EDGE_INCIDENCE_STILL_OPEN'&&eq(reverse.source_group_ids,[spec.id])&&eq(reverse.existing_SSC_owner_ids,spec.owners),'primary original figure-to-SSC 109 block reverse source');
  // TeX layout prints CP T with a typographic gap; original block SHA stays exact.
  const caption=actual.replace(/\s+/g,' ').toLowerCase().replace(/c\s*p\s*t/g,'cpt');
  if(spec.page===14)for(const kw of ['figure 1','24','cpt','red','green','blue','triality'])assert(caption.includes(kw),'frozen original Figure1 author caption term '+kw);
  if(spec.page===16)for(const kw of ['figure 2','192','24-cell','gray','neutrinos','quarks','not shown'])assert(caption.includes(kw),'frozen original Figure2 caption distinguishes drawn/non-drawn '+kw);
  const verts=graph?.vertices||[],edges=graph?.edges||[],marks=graph?.markers||[];
  assert(verts.length===(spec.page===14?24:192)&&edges.length===(spec.page===14?60:192)&&marks.length===verts.length,'candidate whole figure vertex/edge/marker cardinality');
  const uniqueIds=verts.every((v,k)=>v.id===k)&&edges.every((e,k)=>e.id===k)&&marks.every((m,k)=>m.id===k);
  assert(uniqueIds&&new Set(marks.map(x=>x.vertex)).size===verts.length&&verts.every(x=>marks.find(m=>m.vertex===x.id)?.category===x.category),'stable source vertex IDs and marker bijection');
  const tags=(raw.svg.match(/<path\b[^>]*>/g)||[]).filter(tag=>attr(tag,'transform').includes(spec.transform));
  const originalLines=[],originalMarkers=[];
  for(const tag of tags){
   const stroke=attr(tag,'stroke'),fill=attr(tag,'fill'),d=attr(tag,'d');
   const line=Object.entries(spec.lines).find(([,rgb])=>rgb===stroke)?.[0];
   const marker=Object.entries(spec.marks).find(([,rgb])=>rgb===fill)?.[0];
   const ps=points(d);
   if(line&&fill==='none')originalLines.push({category:line,points:ps});
   if(marker&&stroke==='rgb(25%, 25%, 25%)')originalMarkers.push({category:marker,points:ps});
  }
  assert(originalLines.length===edges.length&&originalMarkers.length===marks.length,'all actual source vector paths exhaustively indexed');
  // Independent reversal: every original SVG path must match exact frozen
  // graph fixture endpoints and its SVG stroke. No generation by SSC ledgers.
  const nearest=(p)=>verts.map(v=>({id:v.id,d:Math.hypot(p[0]-v.x,p[1]-v.y)})).sort((a,b)=>a.d-b.d)[0];
  const observed=[];
  for(let k=0;k<originalLines.length;k++){
   const line=originalLines[k],a=line.points?.[0]&&nearest(line.points[0]),b=line.points?.[1]&&nearest(line.points[1]);
   if(line.points.length!==2||!a||!b||a.d>0.000005||b.d>0.000005){assert(false,'original SVG path unmapped '+spec.page+'/'+k);continue}
   const e=edges[k];
   assert(e?.a===a.id&&e?.b===b.id&&e?.color===line.category,'EVERY ORIGINAL SOURCE FIGURE EDGE identity/color/endpoints '+spec.page+'/'+k);
   observed.push(e?.id);
  }
  assert(observed.length===edges.length&&new Set(observed).size===edges.length,'all SVG path IDs consumed exactly once');
  for(let k=0;k<originalMarkers.length;k++){
   const gl=originalMarkers[k],ps=gl.points;
   if(!ps?.length){assert(false,'original SVG glyph path lacks points '+spec.page+'/'+k);continue}
   const xs=ps.map(p=>p[0]),ys=ps.map(p=>p[1]),lo=Math.min(...xs),hi=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys),center=[(lo+hi)/2,(top+bottom)/2],close=nearest(center);
   const m=marks[k],v=verts[m?.vertex];
   assert(m?.category===gl.category&&v?.id===close.id&&close.d<5&&Math.abs(m.area-(hi-lo)*(bottom-top))<0.000011&&Math.abs(v.area-m.area)<0.000011,'EVERY original glyph color/size/source vertex incidence '+spec.page+'/'+k);
   const saved=polarity?.all_marker_polygons?.[k];
   if(!saved){assert(false,'missing original five-corner source glyph '+spec.page+'/'+k);continue}
   const sourcePoints=ps.filter((p,t)=>ps.findIndex(q=>Math.hypot(p[0]-q[0],p[1]-q[1])<.005)===t).map(([x,y])=>({x,y}));
   const polyYs=sourcePoints.map(p=>p.y),topY=Math.min(...polyYs),bottomY=Math.max(...polyYs);
   const topXs=sourcePoints.filter(p=>Math.abs(p.y-topY)<.05).map(p=>p.x);
   const bottomXs=sourcePoints.filter(p=>Math.abs(p.y-bottomY)<.05).map(p=>p.x);
   const topWidth=Math.max(...topXs)-Math.min(...topXs),bottomWidth=Math.max(...bottomXs)-Math.min(...bottomXs);
   const direction=topWidth<bottomWidth?'UP':topWidth>bottomWidth?'DOWN':'UNRESOLVED';
   assert(sourcePoints.length===5&&eq(sourcePoints,saved.source_path_points)&&saved.source_vertex===m.vertex&&saved.color===gl.category&&saved.orientation===direction&&direction!=='UNRESOLVED'&&Math.abs(saved.upper_end_width-topWidth)<0.000001&&Math.abs(saved.lower_end_width-bottomWidth)<0.000001&&Math.abs(saved.area-m.area)<0.000011,'ALL source glyph orientation and five-corner SVG vertex cells '+spec.page+'/'+k);

  }
  const allIds=verts.map(x=>x.id),comp=components(allIds,edges);
  assert(polarity?.schema==='isograph.track-L.G0.original-figure-glyph-polarity-full-flattened-tip.v0.2'&&polarity.original_source_glyphs_all_polarity_resolved===true&&polarity.original_svg_sha256===spec.svg&&polarity.source_sha256===digest&&polarity.all_marker_polygons?.length===marks.length,'216 exact original five-corner figure marker provenance '+spec.page);
  if(spec.page===14){
   assert(rec.source_graph_semantics.vertex_count===24&&rec.source_graph_semantics.exact_drawn_edges===60&&rec.source_graph_semantics.source_triality_black_edges===24&&rec.source_graph_semantics.source_intergeneration_three_vertex_cycles===8,'source scoped Fig1 structural/caption assertions');
   const colorMembership=new Map();
   for(const color of ['red','green','blue']){
    const ce=edges.filter(x=>x.color===color),ids=[...new Set(ce.flatMap(e=>[e.a,e.b]))].sort((a,b)=>a-b);
    for(const id of ids){assert(!colorMembership.has(id),'no source figure cube generation overlap');colorMembership.set(id,color)}
    assert(cubeCheck(ids,ce)&&ce.length===12&&ids.length===8&&eq(ids,graph.source_semantics.cube_role_nodes[color]),'EXACT source cube graph isomorphic to Q3 via distances '+color);
   }
   const directions=Object.fromEntries(polarity.all_marker_polygons.map(x=>[x.source_vertex,x.orientation]));
   assert(polarity.orientation_count.UP===12&&polarity.orientation_count.DOWN===12&&Object.keys(directions).length===24,'Figure1 source 12 UP/12 DOWN orientation exact');
   for(const color of ['red','green','blue']){const ids=graph.source_semantics.cube_role_nodes[color];assert(ids.filter(id=>directions[id]==='UP').length===4&&ids.filter(id=>directions[id]==='DOWN').length===4,'Figure1 every source cube 4UP4DOWN '+color);}
   const triality=edges.filter(x=>x.color==='triality'),black=components(allIds,triality);
   assert(black?.length===8&&black.every(c=>c.length===3&&new Set(c.map(id=>colorMembership.get(id))).size===3)&&eq(black,graph.source_semantics.triality_triplets),'source Fig1 all 8 distinct generation-triality triples');
   for(const [color,limits] of Object.entries({red:[320,400],green:[240,300],blue:[200,230]})){
    const ids=graph.source_semantics.cube_role_nodes[color];
    assert(ids.every(id=>verts[id].area>limits[0]&&verts[id].area<limits[1]),'source original 1st/2nd/3rd generation glyph size hierarchy '+color);
   }
   assert(edges.filter(e=>e.color==='red').length===12&&edges.filter(e=>e.color==='green').length===12&&edges.filter(e=>e.color==='blue').length===12&&triality.length===24&&comp?.length===1&&comp[0].length===24,'source Fig1 finite 24-vertex full connected drawn graph');
  }else{
   assert(rec.source_graph_semantics.vertex_count===192&&rec.source_graph_semantics.source_gray_triality_edges===192&&rec.source_graph_semantics.source_triad_cycles===64&&rec.source_graph_semantics.source_CPT_cube_edges_drawn===false,'source Fig2 drawing excludes undrawn CPT cube edges');
   const black=components(allIds,edges);
   assert(comp?.length===64&&black?.length===64&&black.every(c=>c.length===3),'Figure2 64 full three-vertex graph components');
   const directions=Object.fromEntries(polarity.all_marker_polygons.map(x=>[x.source_vertex,x.orientation]));
   assert(polarity.orientation_count.UP===96&&polarity.orientation_count.DOWN===96&&Object.keys(directions).length===192,'Figure2 original source 96 UP /96 DOWN complete');
   assert(black.every(ids=>ids.every(id=>directions[id]===directions[ids[0]])),'Figure2 each original triality triangle conserves drawn glyph polarity without assigning physics');

   const byType=Object.keys(spec.marks);
   for(const color of byType){
    const got=verts.filter(v=>v.category===color);
    const triple=black.filter(c=>verts[c[0]].category===color);
    assert(got.length===24&&triple.length===8&&eq(triple,graph.source_semantics.per_type_triality_triplets[color]),'source Fig2 all 8 triality triples within one each particle type '+color);
    assert(got.filter(x=>directions[x.id]==='UP').length===12&&got.filter(x=>directions[x.id]==='DOWN').length===12&&triple.filter(t=>directions[t[0]]==='UP').length===4&&triple.filter(t=>directions[t[0]]==='DOWN').length===4,'Figure2 source species 12 glyph UP/12 DOWN and four triality triplets each '+color);
    for(const group of triple){
     const sizes=group.map(id=>verts[id].area);
     assert(group.every(id=>verts[id].category===color)&&sizes.filter(a=>a>65&&a<82).length===1&&sizes.filter(a=>a>48&&a<65).length===1&&sizes.filter(a=>a>38&&a<48).length===1,'Fig2 exactly one big and two smaller original source generation glyphs '+color);
    }
   }
   assert(rec.source_graph_semantics.author_proposed_disjoint_24_cells===8&&rec.source_graph_semantics.source_colored_vertex_count_per_category===24&&rec.source_graph_semantics.source_CPT_cube_edges_drawn===false&&new Set(verts.map(v=>v.category)).size===8,'eight source-proposed 24-cells but no unprinted CPT/24-cell strokes');
  }
  const prior=i.locations.find(z=>z.id===spec.id);
  assert(prior?.disposition==='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED'&&eq(prior.ssc_ids,spec.owners)&&prior.all_original_plot_edges_incidence_qualified===false,'figure groups not prematurely promoted');
 }
 assert(n.items.find(x=>x.id==='L-SSC-119')?.body.includes('NOT yet independently certified')&&n.items.find(x=>x.id==='L-SSC-123')?.body.includes('not empirical proof')&&r.exit_acceptance_contract.G0_SSC_frozen===false,'SSC77 prior historical source fidelity still open');
 return errors;
}
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'iso-L04-two-figure-cold-original-'));const orig={};
try{
 const fetcher=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(fetcher.status!==200)throw Error('ORIGINAL_SOURCE_HTTP_'+fetcher.status);
 const data=Buffer.from(await fetcher.arrayBuffer());if(data.length!==348134||sha(data)!==digest)throw Error('INVALID_FROZEN_L04_PDF');
 const pdf=path.join(temp,'frozen.pdf');fs.writeFileSync(pdf,data);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:10000})))throw Error('ORIGINAL_PDF_NOT_17P');
 for(const p of [14,16]){
  const svg=path.join(temp,'page-'+p+'.svg');
  execFileSync('pdftocairo',['-f',String(p),'-l',String(p),'-svg',pdf,svg],{timeout:30000});
  orig[p]={svg:fs.readFileSync(svg,'utf8'),layout:execFileSync('pdftotext',['-f',String(p),'-l',String(p),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:15000})};
 }
}finally{fs.rmSync(temp,{recursive:true,force:true});}
const errors=verify(A,orig);
const adversarial=[
 ['remove_original_figure1_edge',d=>d.graph1.edges.splice(4,1)],
 ['remove_original_figure2_edge',d=>d.graph2.edges.splice(60,1)],
 ['duplicate_figure1_edge',d=>d.graph1.edges.push(d.graph1.edges[0])],
 ['wrong_figure2_triality_edge_color',d=>d.graph2.edges[52].color='red'],
 ['wrong_figure1_cube_color',d=>d.graph1.edges[5].color='green'],
 ['swap_figure1_black_to_blue',d=>d.graph1.edges[58].color='blue'],
 ['alter_source_svg_vertex',d=>d.graph1.vertices[7].x+=.25],
 ['alter_source_f2_vertex',d=>d.graph2.vertices[142].y+=.25],
 ['migrate_marker_vertex',d=>d.graph2.markers[133].vertex=134],
 ['duplicate_marker_owner',d=>d.graph1.markers[4].vertex=3],
 ['recolor_figure2_species',d=>d.graph2.vertices[190].category='charged_lepton'],
 ['change_figure2_glyph_area',d=>d.graph2.vertices[11].area=333],
 ['invent_figure2_cube_edges',d=>d.packet.original_figure_records[1].source_graph_semantics.source_CPT_cube_edges_drawn=true],
 ['promote_author_physics',d=>d.packet.stage_locks.author_math_physics_truth_proof_required_for_G0=true],
 ['claim_full_L04_original_semantic_cold',d=>d.packet.stage_locks.G0_whole_L04_original_semantic_cold_complete=true],

 ['change_figure1_polyglyph_UP_to_DOWN',d=>d.glyph1.all_marker_polygons[0].orientation='DOWN'],
 ['change_figure2_polyglyph_UP_to_DOWN',d=>{const z=d.glyph2.all_marker_polygons[88];z.orientation=z.orientation==='UP'?'DOWN':'UP'}],
 ['mutate_original_five_corner_path',d=>d.glyph1.all_marker_polygons[5].source_path_points[1].x+=0.125],
 ['mutate_source_glyph_polygon_width',d=>d.glyph2.all_marker_polygons[170].upper_end_width+=0.3],
 ['delete_original_figure2_polyglyph',d=>d.glyph2.all_marker_polygons.pop()],
 ['invent_spin_mapping',d=>d.packet.original_glyph_polarity_source_evidence.semantic_interpretation_OF_marker_polarity='UP means spin positive and DOWN means anti-fermion'],
 ['forge_glyph_source_fixture_SHA',d=>d.packet.original_glyph_polarity_source_evidence.figure2.git_blob_sha='bad'],
 ['forge_glyph_polarity_done',d=>d.packet.stage_locks.original_figure_triangle_glyph_polarity_independently_qualified=true],
 ['erase_glyph_polarity_backlog',d=>d.packet.stage_locks.original_figure_full_visual_glyph_polarity_cold_review_pending=false],
 ['forge_G0_freeze',d=>d.packet.stage_locks.G0_frozen=true],
 ['forge_G1',d=>d.packet.stage_locks.G1_authorized=true],
 ['forge_W_cross_author',d=>d.packet.stage_locks.W_semantics_imported=true],
 ['forge_merge_auth',d=>d.packet.stage_locks.PR70_merge_authorized=true],
 ['replace_source_revision',d=>d.packet.frozen_primary.revision='arXiv:2407.02497v1'],
 ['replace_source_PDF_SHA',d=>d.original.original_sources[3].PDF_SHA256='WRONG'],
 ['change_figure_caption_owner',d=>d.packet.original_figure_records[0].existing_SSC_owner_ids=['L-SSC-123']],
 ['remove_source_original_block',d=>d.crosswalk.original_first_source_blocks.find(x=>x.atom_id==='L04-P014-B003').source_group_ids=[]],
 ['remove_prior_original_group',d=>d.inv.locations.pop()],
 ['edit_unaffected_source_group',d=>d.inv.locations.find(x=>x.id==='L04-S009').original_source_semantic_group+=' forged'],
 ['invent_new_SSC_item',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['alter_original_L_SSC',d=>d.ssc.items.find(x=>x.id==='L-SSC-120').body+=' forged'],
 ['forge_fig1_color_block',d=>d.packet.original_figure_records[0].source_graph_semantics.source_triality_black_edges=12],
 ['forge_fig2_24cell_full_edges',d=>d.packet.original_figure_records[1].source_graph_semantics.source_gray_triality_edges=0],
 ['forge_source_G0_count',d=>d.register.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['wrong_figure1_record_SHA',d=>d.packet.original_figure_records[0].all_source_vertex_edge_evidence.git_blob_sha='WRONG'],
 ['wrong_figure2_record_SHA',d=>d.packet.original_figure_records[1].all_source_vertex_edge_evidence.git_blob_sha='WRONG']
];
for(const pg of [14,16])for(const n of [0,1,3,5,7,12,19,22])adversarial.push(['alter_original_edge_'+pg+'_'+n,d=>{const g=pg===14?d.graph1:d.graph2;g.edges[n].b=(g.edges[n].b+1)%g.vertices.length}]);
let killed=0;
if(errors.length===0)for(const [name,mut]of adversarial){const d=structuredClone(A);try{mut(d);if(verify(d,orig).length)killed++;else errors.push('ESCAPED_MUTATION '+name)}catch(e){errors.push('HOSTILE_RUNTIME_EXCEPTION '+name+': '+e.message)}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.full-two-original-figure-graph-fidelity.v0.3',PASS:errors.length===0,issues:errors,source_PDF_SHA256_verified:true,source_pages_original:[14,16],figure1:{vertices:24,edges:60,CPT_cubes:3,triality_triangles:8},figure2:{vertices:192,gray_triality_edges:192,category_24cells:8,triality_triangles:64,undrawn_CPT_cube_edges_added:0},source_figure_graph_blobs:[B.graph1,B.graph2],glyph_polarity_source_fully_extracted_fig1:24,glyph_polarity_source_fully_extracted_fig2:192,first_CI_failure_preserved:38159001915,hostiles_defined:adversarial.length,hostiles_rejected:killed,SSC_revision_authorized_this_probe:false,original_entire_source_cold_qualified:false,G0_frozen:false,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;
