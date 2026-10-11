// L-only G0 source-first source-to-SSC conservation after original L04 figures.
// Runs independent exact frozen PDF/SVG verifier before any packet-to-SSC
// assertion, and verifies retained known p7 8-column exact source debt.
// This is scoped G0 source fidelity, not physical truth or all-six G0 freeze.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_FIGURE_GRAPH_GLYPH_SSC_RECONCILIATION_G0_0_2.json',
 sourceCandidate:P+'LISI_L04_ORIGINAL_FIGURES_SOURCE_FULL_VERTEX_EDGE_INCIDENCE_G0_0_2.json',
 graph1:P+'LISI_L04_ORIGINAL_FIGURE1_24_VERTEX_60_EDGE_SOURCE_CELLS_0_1.json',
 graph2:P+'LISI_L04_ORIGINAL_FIGURE2_192_VERTEX_192_EDGE_SOURCE_CELLS_0_1.json',
 glyph1:P+'LISI_L04_ORIGINAL_FIGURE1_GLYPH_POLARITY_SOURCE_CELLS_0_2.json',
 glyph2:P+'LISI_L04_ORIGINAL_FIGURE2_GLYPH_POLARITY_SOURCE_CELLS_0_2.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 crosswalk:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
 p7Evidence:P+'LISI_L04_ORIGINAL_SECTION3_DIRAC_SOLUTIONS_PHASE_G0_0_1.json',
 prevInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_10.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_11.json',
 prevSSC:P+'SOURCE_SEMANTIC_CENSUS_0_77.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_78.json',
 prevReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_31.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_32.json',
 prevTr:P+'SOURCE_TRAVERSAL_LEDGER_0_48.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_49.json',
 prevGate:E+'L_CURRENT_STAGE_GATE_0_141.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_142.json',
 sourceVerifier:E+'tools/verify-l-g0-l04-original-full-figures-source-0-4.mjs',
 self:E+'tools/verify-l-g0-l04-figures-to-SSC-source-cold-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const B=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self'&&k!=='sourceVerifier').map(([k,p])=>[k,read(p)]));
const digest='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const selected='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED';
const d1='SCOPED_ORIGINAL_FIG1_24_GLYPH_60_SOURCE_EDGE_AND_TIP_GEOMETRY_RECONCILED_WHOLE_COLD_OPEN';
const d2='SCOPED_ORIGINAL_FIG2_192_GLYPH_192_SOURCE_EDGE_AND_TIP_GEOMETRY_RECONCILED_WHOLE_COLD_OPEN';
let exactSource={PASS:false};
try{
 const out=execFileSync(process.execPath,[F.sourceVerifier],{encoding:'utf8',timeout:140000,maxBuffer:3000000});
 exactSource=JSON.parse(out);
}catch(e){console.error('INDEPENDENT_ORIGINAL_FIGURE_SOURCE_VERIFIER_FAILED',e.message);process.exit(1);}
if(!(exactSource.PASS===true&&exactSource.source_PDF_SHA256_verified===true&&
 exactSource.figure1?.vertices===24&&exactSource.figure1?.edges===60&&exactSource.figure2?.vertices===192&&exactSource.figure2?.gray_triality_edges===192&&
 exactSource.glyph_polarity_source_fully_extracted_fig1===24&&exactSource.glyph_polarity_source_fully_extracted_fig2===192&&
 exactSource.hostiles_defined===57&&exactSource.hostiles_rejected===57&&exactSource.original_entire_source_cold_qualified===false&&exactSource.G0_frozen===false)){
 throw Error('INDEPENDENT_ORIGINAL_SOURCE_VERIFIER_RESULT_NOT_SCOPED_PASS');
}
function check(x){
 const fail=[],t=(ok,msg)=>{if(!ok)fail.push(msg)};
 const {packet:s,sourceCandidate:sc,graph1:g1,graph2:g2,glyph1:t1,glyph2:t2,manifest:m,crosswalk:cx,p7Evidence:p7,prevInv:oi,inv:i,prevSSC:o,SSC:n,prevReg:pr,reg:r,prevTr:pt,tr:v,prevGate:og,gate:g}=x;
 t(s?.schema==='isograph.track-L.G0.L04-original-figures-and-overlooked-exact-spinor-source-reconciliation.v0.2'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'independent nonauthority L-only source first packet');
 t(s?.original_source?.id==='L04'&&s.original_source.revision==='arXiv:2407.02497v2'&&s.original_source.PDF_SHA256===digest&&s.original_source.PDF_bytes===348134&&s.original_source.pages===17,'official exact frozen author PDF identity');
 t(s?.original_source?.primary_layout_manifest?.git_blob_sha===B.manifest&&s.original_source.primary_text_block_crosswalk.git_blob_sha===B.crosswalk,'frozen source independent location evidence');
 t(m?.original_sources?.[3]?.revision==='arXiv:2407.02497v2'&&m.original_sources[3].PDF_SHA256===digest,'all six original frozen source binary provenance');
 t(s?.independent_original_frozen_pdf_CI?.run_id===38159774143&&s.independent_original_frozen_pdf_CI.conclusion==='success'&&s.independent_original_frozen_pdf_CI.hostiles_defined===57&&s.independent_original_frozen_pdf_CI.hostiles_rejected===57,'prior exact primary SVG original source hostile pass pinned');
 t(s?.original_figure_graph_witness?.git_blob_sha===B.sourceCandidate&&sc?.stage_locks?.G0_whole_L04_original_semantic_cold_complete===false,'historical source graph candidate has original-source authority only');
 const ss=s?.source_first_dispositions||[];
 t(eq(ss.map(x=>x.id),['L04-S041','L04-S048']),'exact two fixed original source figure groups only');
 const sourceExpected=[
 {page:14,owner:['L-SSC-119','L-SSC-120'],caption:'L04-P014-B003',nodes:24,edges:60,glyphs:24,up:12,down:12,svg:'d18cfa48eb5763afb52efd435d1de7149a9b1b1c7e94f66f37db7eb1c278357f'},
 {page:16,owner:['L-SSC-123'],caption:'L04-P016-B001',nodes:192,edges:192,glyphs:192,up:96,down:96,svg:'de073783202a4ddabd0647b77e672dcb3545321ce54ab1e0f74dd36239b918e3'}
 ];
 for(let k=0;k<2;k++){
  const a=ss[k],want=sourceExpected[k],gg=k===0?g1:g2,tt=k===0?t1:t2,cxrow=cx?.original_first_source_blocks?.find(z=>z.atom_id===want.caption);
  if(!a||!gg||!tt){t(false,'missing original figure fixture '+k);continue;}
  t(a.printed_page===want.page&&a.caption===want.caption&&eq(a.existing_SSC_owners,want.owner)&&a.source_svg_sha256===want.svg,'source figure locator caption, SVG pin, existing SSC ownership '+k);
  t(cxrow?.source_group_ids?.includes(a.id)&&cxrow.original_first_role==='ORIGINAL_DIAGRAM_CAPTION_MAPPING_VISUAL_EDGE_INCIDENCE_STILL_OPEN','original pre-scoped caption block identity conserved '+k);
  t(a.evidence?.graph?.git_blob_sha===B[k===0?'graph1':'graph2']&&a.evidence?.glyph?.git_blob_sha===B[k===0?'glyph1':'glyph2'],'source graph and glyph original fixture pointer '+k);
  t(gg?.vertices?.length===want.nodes&&gg?.edges?.length===want.edges&&gg?.markers?.length===want.nodes&&gg.original_svg_SHA256===want.svg,'original drawn vertices edges markers and actual frozen SVG '+k);
  t(tt?.all_marker_polygons?.length===want.glyphs&&tt.original_svg_sha256===want.svg,'original glyph full polygon SVG witness '+k);
  t(tt.all_marker_polygons.filter(z=>z.orientation==='UP').length===want.up&&tt.all_marker_polygons.filter(z=>z.orientation==='DOWN').length===want.down,'all source glyph polygon tips as geometry not physics '+k);
  t(tt?.source_interpretation_OF_orientation_not_assumed===true&&tt.source_marker_polarity_has_no_author_substantive_interpretation_assigned===true,'no invented physical glyph label '+k);
  t(a.unrepresented_symbolic_polarity_meaning?.includes('no')||a.unrepresented_symbolic_polarity_meaning?.includes('Do not'),'source unspecified physical glyph meaning retained '+k);
 }
 t(ss[0]?.source_claims?.colored_source_edges?.red===12&&ss[0].source_claims.colored_source_edges.green===12&&ss[0].source_claims.colored_source_edges.blue===12&&ss[0].source_claims.colored_source_edges.black_triality===24&&ss[0].source_claims.intergeneration_triality_triangles===8,'source Fig1 three CPT cube colors, 24 black triality, 8 triads');
 t(ss[1]?.source_claims?.figure2_drawn_CPT_cube_edges===0&&ss[1].source_claims.gray_triality_edges===192&&ss[1].source_claims.source_triality_triangles===64&&ss[1].source_claims.original_author_proposed_disjoint_24cell_families===8,'source Fig2 actual drawn 192 triality only, eight proposed 24cell type');
 t(s?.source_group_S014_reclassification?.id==='L04-S014'&&s.source_group_S014_reclassification.existing_SSC_owner==='L-SSC-101'&&s.source_group_S014_reclassification.classification_after===selected,'known §3 p7 eight matrix cells not erased by figure success');
 t(s?.source_group_S014_reclassification?.prior_packet?.git_blob_sha===B.p7Evidence&&p7?.original_p7_source_scope?.source_spinor_basis_cardinality?.all_original_column_vector_components_independently_qualified_here===false,'independent existing original §3 p7 missing cold proof source');
 t(s?.methodology_correction?.failure_class==='SELECTED_EXACT_BACKLOG_UNDERCOUNTS_KNOWN_UNVERIFIED_FORMULA_CELLS_IN_MAPPED_MEANING_GROUPS','G0 systematic missing exact-cell count class exposed');
 t(s?.epistemic_boundaries?.interpretation_of_glyph_orientation_from_physical_state==='UNASSIGNED'&&s.epistemic_boundaries.author_24cell_model_not_math_or_physics_theorem_proved===true,'source glyph meaning unassigned, model proof not created');
 t(s?.source_to_SSC_status?.current_selected_exact_formula_table_figure_groups_pending===1&&s.source_to_SSC_status.current_L_SSC_identities===191&&s.source_to_SSC_status.new_original_source_semantic_IDs_required===0,'no fabricated complete G0 and no typed new identities');
 t(s?.stage_locks?.G0_frozen===false&&s.stage_locks.G1_authorized===false&&s.stage_locks.whole_L04_source_cold_complete===false&&s.stage_locks.all_six_source_cold_complete===0&&s.stage_locks.PR70_merge_authorized===false&&s.stage_locks.cross_track_semantic_inference===false,'source scoped G0 and W/PR locks');
 t(i?.locations?.length===53&&oi?.locations?.length===53&&i.counts.remaining_exact_source_groups===1&&i.counts.independent_full_cold_complete_sources===0,'original 53 groups current scoped exact one residual');
 let changed=[],seen=new Set(),dist={};
 for(let k=0;k<53;k++){
  const old=oi?.locations?.[k],cur=i?.locations?.[k];if(!old||!cur){t(false,'original source location deleted '+k);continue;}
  t(old.id===cur.id,'stable original source group ID '+k);
  if(!eq(old,cur))changed.push(cur.id);
  dist[cur.disposition]=(dist[cur.disposition]||0)+1;
  for(const owner of cur.ssc_ids||[])seen.add(owner);
 }
 t(eq(changed,['L04-S014','L04-S041','L04-S048']),'exactly 3 original source groups touched: 2 source figures and 1 p7 known debt');
 t(Object.keys(dist).length===Object.keys(i?.counts?.by_disposition||{}).length&&Object.entries(dist).every(([k,n])=>i.counts.by_disposition[k]===n)&&dist[selected]===1,'recomputed original source census by disposition, 1 pending p7');
 t(i.locations.find(z=>z.id==='L04-S014')?.disposition===selected&&oi.locations.find(z=>z.id==='L04-S014').disposition==='MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS','prior mapped p7 exact gap explicitly reclassified');
 t(i.locations.find(z=>z.id==='L04-S041')?.all_original_plot_edges_incidence_qualified===true&&i.locations.find(z=>z.id==='L04-S048')?.all_original_plot_edges_incidence_qualified===true,'both source figure graph correspondences accounted');
 t(i.locations.find(z=>z.id==='L04-S041')?.original_frozen_source_figure_reconstruction?.git_blob_sha===B.packet&&i.locations.find(z=>z.id==='L04-S048')?.original_frozen_source_figure_reconstruction?.git_blob_sha===B.packet,'original figure packet in current source-first inverse');
 t(eq([...seen].sort(),oi?.reverse?.L04_ssc_ids?.slice().sort())&&seen.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'all original 34 L04 owner identities preserved without asserting global completeness');
 const modi=[];
 for(let k=0;k<191;k++){const prev=o?.items?.[k],cur=n?.items?.[k];if(!prev||!cur){t(false,'SSC item deleted '+k);continue;}t(prev.id===cur.id,'old/new typed SSC source identity '+k);if(!eq(prev,cur))modi.push(cur.id);}
 t(eq(modi,['L-SSC-119','L-SSC-123']),'exactly 189 entire other SSC source bodies unchanged');
 for(const [id,key,group]of [['L-SSC-119','L04_FIG1_FULL_DRAWN_SOURCE_GRAPH_AND_POLARITY_0_1','L04-S041'],['L-SSC-123','L04_FIG2_FULL_DRAWN_SOURCE_GRAPH_AND_POLARITY_0_1','L04-S048']]){
  const row=n.items.find(z=>z.id===id),rec=row?.source_expression_census?.[key];
  t(rec?.source_packet?.git_blob_sha===B.packet&&rec?.source_first_inverse?.git_blob_sha===B.inv&&rec.original_source_location===group&&rec.whole_L04_original_semantic_cold_complete===false,'original source-to-SSC direct packet, group and cold guard '+id);
  t(row?.body?.includes('UP=')&&row.body.includes('DOWN=')&&((id==='L-SSC-119'&&row.body.includes('60 visible line segments')&&row.body.includes('24 black triality'))||(id==='L-SSC-123'&&row.body.includes('192 visible gray triality line segments')&&row.body.includes('CPT cube edges'))),'SSC source geometry counts exact as printed without physical inference '+id);
  t(rec?.source_tip_direction_interpretation==='UNASSIGNED','SSC figure glyph physical semantics explicitly unassigned '+id);
 }
 t(n.items.find(z=>z.id==='L-SSC-101')?.body.includes('complete original printed matrix cells remain to be independently cold reconstructed'),'known original p7 matrix cold debt retained in untouched SSC101');
 t(n?.schema==='woit-lisi.track-l.source-semantic-census.v0.78'&&n.predecessor.git_blob_sha===B.prevSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv&&n.guards.source_census_freeze_complete===false,'new SSC exact lineage and global cold-open');
 const loc=r?.per_source?.find(z=>z.source==='L04');
 t(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.32'&&r.source_first_predecessor.git_blob_sha===B.prevReg&&r.current_ssc.git_blob_sha===B.SSC&&r.denominator.source_first_location_units===350&&r.denominator.distinct_ssc_identity_refs===191,'original six source inventory finite denominator');
 t(loc?.audit_git_blob_sha===B.inv&&loc.original_exact_cell_expression_groups_not_yet_independently_verified===1&&r.per_source.every(z=>z.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_frozen===false,'no false freeze or zero selected exact source gap');
 t(v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.49'&&v.predecessor_exact.git_blob_sha===B.prevTr&&v.current_census.git_blob_sha===B.SSC&&v.current_L04_source_first_inventory.git_blob_sha===B.inv&&v.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&v.complete_sources===0,'source traversal exact predecessor and current G0 scope');
 t(g?.schema==='isograph.exp062-l-current-stage-gate.v0.142'&&g.predecessor_gate.git_blob_sha===B.prevGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.full_figure_source_packet.git_blob_sha===B.packet&&g.source_to_SSC_verifier.git_blob_sha===B.self,'final stage gate exact test and original source artifact SHA');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'no invented CI success or merge authorization');
 return fail;
}
const errors=check(D);
const hostile=[
 ['erase_p7_residual',d=>d.inv.locations.find(x=>x.id==='L04-S014').disposition='MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS'],
 ['forge_zero_exact_open',d=>d.inv.counts.remaining_exact_source_groups=0],
 ['source_unknown_p7_is_proved',d=>d.p7Evidence.original_p7_source_scope.source_spinor_basis_cardinality.all_original_column_vector_components_independently_qualified_here=true],
 ['erase_p7_role',d=>d.inv.locations.find(x=>x.id==='L04-S014').ssc_ids=[]],
 ['fake_full_original_L04_cold',d=>d.packet.stage_locks.whole_L04_source_cold_complete=true],
 ['fake_whole_source_cold',d=>d.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['claim_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['claim_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true],
 ['claim_original_source_physical_glyph',d=>d.packet.epistemic_boundaries.interpretation_of_glyph_orientation_from_physical_state='electric charge'],
 ['replace_frozen_revision',d=>d.packet.original_source.revision='arXiv:2407.02497v1'],
 ['replace_frozen_SHA',d=>d.packet.original_source.PDF_SHA256='wrong'],
 ['claim_empty_source_fig1',d=>d.packet.source_first_dispositions[0].source_claims.exact_drawing_edges=0],
 ['change_fig1_CPT_color',d=>d.packet.source_first_dispositions[0].source_claims.colored_source_edges.red=11],
 ['invent_fig2_CPT_edge',d=>d.packet.source_first_dispositions[1].source_claims.figure2_drawn_CPT_cube_edges=1],
 ['fig2_gray_source_edge_deleted',d=>d.graph2.edges.pop()],
 ['fig1_source_edge_deleted',d=>d.graph1.edges.pop()],
 ['delete_fig2_glyph',d=>d.glyph2.all_marker_polygons.pop()],
 ['flip_fig1_tip',d=>d.glyph1.all_marker_polygons[0].orientation='DOWN'],
 ['swap_fig1_SSC_owner',d=>d.packet.source_first_dispositions[0].existing_SSC_owners=['L-SSC-123']],
 ['remove_original_caption',d=>d.crosswalk.original_first_source_blocks.find(x=>x.atom_id==='L04-P014-B003').source_group_ids=[]],
 ['alter_unaffected_L04_group',d=>d.inv.locations.find(x=>x.id==='L04-S009').original_source_semantic_group+=' forged'],
 ['drop_source_group',d=>d.inv.locations.pop()],
 ['alter_unaffected_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-120').body+=' forged'],
 ['invent_SSC_ID',d=>d.SSC.items.push({...d.SSC.items[0],id:'L-SSC-192'})],
 ['silently_rewrite_SSC119_fig1_source',d=>d.SSC.items.find(x=>x.id==='L-SSC-119').body=d.SSC.items.find(x=>x.id==='L-SSC-119').body.replace('60 visible line segments','61 visible line segments')],
 ['SSC123_glyph_physics_invented',d=>d.SSC.items.find(x=>x.id==='L-SSC-123').source_expression_census.L04_FIG2_FULL_DRAWN_SOURCE_GRAPH_AND_POLARITY_0_1.source_tip_direction_interpretation='electric charge'],
 ['forget_SSC119_packet_SHA',d=>d.SSC.items.find(x=>x.id==='L-SSC-119').source_expression_census.L04_FIG1_FULL_DRAWN_SOURCE_GRAPH_AND_POLARITY_0_1.source_packet.git_blob_sha='forged'],
 ['forge_global_G0',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['fake_current_CI_success',d=>d.gate.new_source_CI.status='SUCCESS'],
 ['change_original_graph_SHA',d=>d.packet.source_first_dispositions[1].evidence.graph.git_blob_sha='wrong']
];
let rejected=0;
if(errors.length===0){for(const [name,mutate] of hostile){const copy=structuredClone(D);try{mutate(copy);if(check(copy).length)rejected++;else errors.push('HOSTILE_ESCAPED '+name);}catch(e){errors.push('MUTANT_CHECKER_EXCEPTION '+name+': '+e.message);}}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.two-original-figures-to-current-SSC-and-p7-source-debt.v0.1',PASS:errors.length===0,errors,original_PDF_source_passed:exactSource.PASS,source_fig1_vertices:24,source_fig1_edges:60,source_fig2_vertices:192,source_fig2_drawn_edges:192,source_glyph_polygons:216,original_source_first_groups:53,all_frozen_source_first_groups:350,old_new_SSC_IDs:191,changed_ssc_bodies:['L-SSC-119','L-SSC-123'],current_selected_original_exact_unverified_groups:['L04-S014'],independent_whole_source_cold_complete:false,hostiles_defined:hostile.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,PR_merge_authorized:false},null,2));
if(errors.length)process.exitCode=1;

