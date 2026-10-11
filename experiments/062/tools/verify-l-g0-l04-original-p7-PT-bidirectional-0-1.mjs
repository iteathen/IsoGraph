// Lisi G0 frozen original L04 arXiv:2407.02497v2 p7 diagram source fidelity.
// Re-extract original PDF bytes, p7 complete text, six source blocks,
// and 360dpi cropped vector-rendered arrow shapes BEFORE source->SSC checks.
// No QFT phase / physical-glyph meaning / G1 or full-original G0 promotion.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_P7_PT_DIRECTED_GLYPH_SOURCE_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_12.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_13.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_79.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_80.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_33.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_34.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_50.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_51.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_144.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_145.json',
 self:E+'tools/verify-l-g0-l04-original-p7-PT-bidirectional-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const B=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,gitsha(v)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,v])=>[k,read(v)]));
const SRC='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const PAGE='8b40b6901b5cfcbb654d22a128a4763a04e399d927e437dc51a60714784a20ea';
const CROP='866e7e1b645d0911a96ef84ee54fa5b3958291dc897b868e1b8b303130cb0ad6';
const oldDisp='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED';
const newDisp='SCOPED_ORIGINAL_P7_P_AND_T_DOUBLE_ARROW_VERTEX_GLYPH_SOURCE_FIDELITY_WHOLE_COLD_OPEN';
const expectedVertices=[
 ['TL','Psi_L^wedge','top_left','DOWN','UPPER_RIGHT_AIMED_LEFT'],
 ['TR','Psi_R^wedge','top_right','UP','UPPER_RIGHT_AIMED_LEFT'],
 ['BL','Psi_R^vee','bottom_left','DOWN','UPPER_LEFT_AIMED_RIGHT'],
 ['BR','Psi_L^vee','bottom_right','UP','UPPER_LEFT_AIMED_RIGHT']
];
const expectedLinks=[
 ['P','TL','TR','top_horizontal_between_columns','LEFT_ARROWHEAD','RIGHT_ARROWHEAD'],
 ['P','BL','BR','bottom_horizontal_between_columns','LEFT_ARROWHEAD','RIGHT_ARROWHEAD'],
 ['T','TL','BR','upper_left_to_lower_right_cross','UPPER_LEFT_ARROWHEAD','LOWER_RIGHT_ARROWHEAD'],
 ['T','TR','BL','upper_right_to_lower_left_cross','UPPER_RIGHT_ARROWHEAD','LOWER_LEFT_ARROWHEAD']
];
const expectedAtoms=[
 ['L04-P007-B003','3e33fe789bf60f34dc8cd2c2583cdc2f404d8e2ee50aa1f30bf2cf1de5cc2b78'],
 ['L04-P007-B004','82282ff3e670d59c68f028df0b43807ef1939609586d822e8bea27e6df20cbb1'],
 ['L04-P007-B005','a87dd3fce8fef7964c7ba4563d5580360fca77c9caa1b744f808b2e08c228ab8']
];
function verify(z,sourcePage,sourceCrop){
 const issues=[],ok=(cond,msg)=>{if(!cond)issues.push(msg);};
 const {packet:s,manifest:m,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 ok(s?.schema==='isograph.track-L.G0.L04-frozen-original-p7-unnumbered-PT-arrow-glyph-source.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'L-only G0 nonauthority');
 ok(s?.frozen_original?.revision==='arXiv:2407.02497v2'&&s.frozen_original.PDF_SHA256===SRC&&s.frozen_original.PDF_bytes===348134&&s.frozen_original.pages===17&&s.frozen_original.PDF_page===7&&s.frozen_original.layout_page_SHA256===PAGE&&s.frozen_original.source_manifest.git_blob_sha===B.manifest,'exact original frozen source revision/digest/layout');
 const origin=m?.original_sources?.[3];
 ok(origin?.id==='L04'&&origin.revision==='arXiv:2407.02497v2'&&origin.PDF_SHA256===SRC&&origin.PDF_byte_count===348134&&origin.original_pdf_extracted_pages?.length===17,'original 6-source immutable source manifest');
 ok(sha(Buffer.from(sourcePage))===PAGE&&origin?.original_pdf_extracted_pages?.[6]?.original_extracted_page_SHA256===PAGE,'original p7 source textual layout SHA independently extracted');
 const lines=sourcePage.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const actual=[];
 for(const x of origin?.original_pdf_extracted_pages?.[6]?.blocks||[]){
  const raw=lines.slice(x.original_extracted_line_start-1,x.original_extracted_line_end).join('\n');
  ok(sha(Buffer.from(raw))===x.original_source_block_SHA256,'full source p7 frozen source block physical SHA '+x.source_atom_id);
  actual.push(x.source_atom_id);
 }
 ok(equal(actual,Array.from({length:6},(_,i)=>'L04-P007-B'+String(i+1).padStart(3,'0'))),'entire source original p7 text block partition');
 ok(equal(s?.independent_original_visual_evidence?.original_p7_layout_atoms?.map(x=>[x.id,x.sha256]),expectedAtoms),'exact text native graph/qualitative source block 3–5 SHA pin');
 const ci=s?.independent_original_visual_evidence?.high_resolution_original_diagram_CI;
 ok(ci?.run_id===38164025649&&ci.job_id===114542717628&&ci.head_sha==='6bd2ab4a7b110e3fda3a40d4fc2fccc345fc777b'&&ci.conclusion==='success'&&ci.render_dpi===360&&equal(ci.source_crop_xywh_pixels,[1000,2150,1500,1000])&&ci.original_crop_image_SHA256===CROP&&ci.original_crop_image_bytes===38631,'independently original visual/GitHub Actions crop provenance');
 ok(sha(sourceCrop)===CROP&&sourceCrop.length===38631,'LIVE independently rendered original PDF vector page7 crop SHA and image bytes');
 ok(s?.independent_original_visual_evidence?.layout_extraction_does_not_encode_pdf_drawn_arrowheads===true,'source interpretation must derive from primary image not pdftotext alone');
 ok(s?.existing_original_source_coverage?.source_group==='L04-S015'&&equal(s.existing_original_source_coverage.existing_owners,['L-SSC-100','L-SSC-101'])&&s.existing_original_source_coverage.source_CPT_cube_on_p11_is_separate===true,'frozen source S015 ownership and distinct p11 CPT cube');
 const vtx=s?.original_p7_figure_source_transcription?.source_original_vertices||[];
 const actualVertices=vtx.map(x=>[x.id,x.caption,x.layout,x.longitudinal_glyph_vertical_arrow,x.circular_arrow_head_on_loop]);
 ok(equal(actualVertices,expectedVertices)&&vtx.length===4&&vtx.every(x=>x.yellow_shape_border==='YELLOW_FILLED_GREY_OUTLINE'),'original four independent vertices/glyph circular and vertical polarity');
 const edges=s?.original_p7_figure_source_transcription?.diagram_transformation_links||[];
 const actualLinks=edges.map(x=>[x.source_letter,x.vertex_pair?.[0],x.vertex_pair?.[1],x.printed_location,x.drawn_ends?.[0],x.drawn_ends?.[1]]);
 ok(equal(actualLinks,expectedLinks)&&edges.length===4&&edges.every(x=>x.bidirectional_arrows_drawn===true),'two P and two crossed T original double-headed transformed relation source geometry');
 const pol=s?.original_p7_figure_source_transcription?.visual_polarity_roles;
 ok(equal(pol?.source_vertical_arrow_down_vertices,['TL','BL'])&&equal(pol?.source_vertical_arrow_up_vertices,['TR','BR'])&&equal(pol?.source_loop_uppers_aim_left,['TL','TR'])&&equal(pol?.source_loop_lowers_aim_right,['BL','BR'])&&pol?.printed_PT_arrowheads===8&&pol.drawn_vertical_arrowheads===4&&pol.drawn_circular_loop_arrowheads===4&&pol.visual_yellow_glyphs===4,'all distinct original p7 orientation and glyph count evidence');
 const roles=s?.original_p7_figure_source_transcription;
 ok(roles?.source_figure_lacks_explicit_phase_labels===true&&roles.physical_assignment_from_unlabelled_loop_shape==='NOT_INFERRED_FROM_GLYPH_ALONE'&&roles.source_colours_and_geometry_preserved_not_promoted_to_physical_law===true&&roles.source_artist_drawn_line_scope.includes('not create eight directed transformation laws'),'author visual versus physical/phase authority firewall');
 const scope=s?.author_p7_qualitative_semantics;
 ok(scope?.scope?.includes('momentum along or opposite the z axis')&&scope.C.includes('same spin, helicity and momentum')&&scope.P.includes('opposite helicity and opposite momentum')&&scope.T.includes('opposite spin, same helicity')&&scope.source_explicit_deferred_claim.includes('exact phases require')&&scope.physical_symmetry_validity_not_independently_proved===true,'author original prose p7 scope, qualifiers and unresolved QFT phases');
 ok(s?.cause_and_method_repair?.cause==='SOURCE_VISUAL_FIGURE_DIRECTION_AND_GLYPH_POLARITY_LOST_BY_TEXT_ONLY_AND_UNDIRECTED_EDGE_INDEX'&&s.cause_and_method_repair.scope_limit.includes('source does not itself define a separate physical phase formula'),'systematic source-first graph method, not conjectural physical inference');
 const c=s?.conservation;
 ok(c?.original_L_sources===6&&c.original_finite_source_locations===350&&c.original_L04_source_groups===53&&c.original_L04_existing_SSC_owners===34&&c.all_L_existing_SSC_items===191&&equal(c.existing_L04_source_groups_revised,['L04-S015'])&&c.entire_other_L04_source_groups_unchanged===52&&equal(c.existing_SSC_items_revised,['L-SSC-101'])&&c.entire_other_SSC_items_unchanged===190&&c.new_SSC_ids===0&&c.previous_selected_L04_exact_groups===1&&c.current_selected_L04_exact_groups===0,'conserved 350/53/191 original denominator and sole owner change');
 ok(s?.locks?.G0_open===true&&s.locks.G0_frozen===false&&s.locks.G1_authorized===false&&s.locks.whole_L04_original_semantic_cold_complete===false&&s.locks.all_six_sources_original_cold_complete===false&&s.locks.no_cross_track_source_import===true&&s.locks.author_physics_theory_proved===false&&s.locks.PR70_merge_authorized===false,'G0 stage lock and source physical theorem firewall');
 ok(i?.locations?.length===53&&oi?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'current vs prior source groups and SSC counts exact');
 const changed=[],counts={},links=new Set();
 for(let k=0;k<53;k++){
  const before=oi?.locations?.[k],after=i?.locations?.[k];
  if(!before||!after){ok(false,'missing source row '+k);continue;}
  ok(before.id===after.id,'stable 53 original source group IDs '+k);
  if(!equal(before,after))changed.push(after.id);
  counts[after.disposition]=(counts[after.disposition]||0)+1;
  for(const id of after.ssc_ids||[])links.add(id);
 }
 ok(equal(changed,['L04-S015']),'52 entire other original source group records unchanged');
 ok(oi?.locations?.find(x=>x.id==='L04-S015')?.disposition===oldDisp&&i.locations.find(x=>x.id==='L04-S015')?.disposition===newDisp,'source group one exact-source role advanced; no other groups scope-shrunk');
 const sourceRow=i?.locations?.find(x=>x.id==='L04-S015');
 ok(sourceRow?.original_p7_unnumbered_diagram_source_exact_reconciled?.git_blob_sha===B.packet&&sourceRow.original_p7_unnumbered_diagram_source_exact_reconciled.original_highres_crop_CI===38164025649&&equal(sourceRow.ssc_ids,['L-SSC-100','L-SSC-101'])&&sourceRow.original_p7_unnumbered_diagram_source_exact_pending.G0_exact_original_source_incidence_open===false,'original S015 exact source optical evidence and mapping');
 ok(sourceRow?.original_section3_Dirac_source_evidence?.scoped_original_p7_eight_columns_CI_run_id===38162809912,'predecessor eight original spinor cells CI now exact success');
 ok(Object.entries(counts).every(([k,n])=>i?.counts?.by_disposition?.[k]===n)&&Object.keys(counts).length===Object.keys(i?.counts?.by_disposition||{}).length&&!Object.hasOwn(counts,oldDisp)&&i.counts.remaining_exact_source_groups===0,'finite selected exact-source count DERIVED from actual 53 source dispositions');
 ok(equal([...links].sort(),oi?.reverse?.L04_ssc_ids?.slice().sort())&&links.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'two-way source/SSC owner map with global source cold still open');
 const changedSSC=[];
 for(let k=0;k<191;k++){
  const before=o?.items?.[k],after=n?.items?.[k];
  if(!before||!after){ok(false,'missing census item '+k);continue;}
  ok(before.id===after.id,'191 original SSC source identities preserved '+k);
  if(!equal(before,after))changedSSC.push(after.id);
 }
 ok(equal(changedSSC,['L-SSC-101']),'190 COMPLETE other SSC records unchanged');
 const rec=n?.items?.find(x=>x.id==='L-SSC-101');
 for(const phrase of ['horizontal double-headed P arrows','double-headed T arrows','DOWN at TL/BL','UP at TR/BR','upper-right arrow tip directed LEFT','upper-left tip is directed RIGHT','no new QFT phase','p11 eight-weight CPT cube'])ok(rec?.body?.includes(phrase),'actual SSC owner original figure source scope '+phrase);
 const own=rec?.source_expression_census?.L04_ORIGINAL_P7_UNNUMBERED_P_T_DOUBLE_ARROW_AND_GLYPH_SOURCE_0_1;
 ok(own?.source_packet?.git_blob_sha===B.packet&&own?.source_first_inverse?.git_blob_sha===B.inv&&own.original_p7_visual_CI===38164025649&&own.source_owner_location==='L04-S015'&&own.whole_source_semantic_cold_complete===false,'exact source↔SSC body proof with Git blob lineage');
 ok(n?.schema==='woit-lisi.track-l.source-semantic-census.v0.80'&&n.predecessor.git_blob_sha===B.oldSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv&&n.item_count===191&&n.guards.source_census_freeze_complete===false,'current SSC v0.80 exact predecessor/conservation');
 const l=r?.per_source?.find(x=>x.source==='L04');
 ok(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.34'&&r.source_first_predecessor.git_blob_sha===B.oldReg&&r.current_ssc.git_blob_sha===B.SSC&&r.per_source.length===6&&r.per_source.reduce((n,x)=>n+x.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191&&l?.audit_git_blob_sha===B.inv&&l?.original_exact_cell_expression_groups_not_yet_independently_verified===0,'global original inventory uses 6/350/191 without manipulating denominator');
 ok(r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.explicit_G0_outstanding.source_exactness_by_source.find(x=>x.source==='L04')?.fully_independently_qualified===false&&r.exit_acceptance_contract.G0_SSC_complete===false&&r.explicit_locks.G1_authorized===false,'zero selected groups is NOT whole-original G0 completion');
 ok(v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.51'&&v.predecessor_exact.git_blob_sha===B.oldTr&&v.current_census.git_blob_sha===B.SSC&&v.current_L04_source_first_inventory.git_blob_sha===B.inv&&v.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&v.complete_sources===0,'current Lisi source traversal authority and predecessor preserved');
 ok(g?.schema==='isograph.exp062-l-current-stage-gate.v0.145'&&g.predecessor_gate.git_blob_sha===B.oldGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.p7_arrow_source_packet.git_blob_sha===B.packet&&g.p7_arrow_source_verifier.git_blob_sha===B.self,'stage gate exact source packet/checker lineage');
 ok(g.new_source_CI.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new CI not predeclared successful; G0/G1/merge remain blocked');
 return issues;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-p7-source-glyph-'));let sourcePage='',sourceCrop;
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('FROZEN_ORIGINAL_PDF_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());
 if(bytes.length!==348134||sha(bytes)!==SRC)throw Error('WRONG_FROZEN_L04_SOURCE_PDF');
 const file=path.join(dir,'L04v2.pdf');fs.writeFileSync(file,bytes);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:10000})))throw Error('FROZEN_L04_ORIGINAL_PAGE_COUNT');
 sourcePage=execFileSync('pdftotext',['-f','7','-l','7','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1600000});
 const stem=path.join(dir,'crop');execFileSync('pdftoppm',['-f','7','-l','7','-r','360','-x','1000','-y','2150','-W','1500','-H','1000','-png','-singlefile',file,stem],{timeout:30000,maxBuffer:3000000});
 sourceCrop=fs.readFileSync(stem+'.png');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=verify(D,sourcePage,sourceCrop);
const mutants=[
 ['wrong_upper_spin_glyph',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[0].longitudinal_glyph_vertical_arrow='UP'],
 ['wrong_lower_spin_glyph',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[2].longitudinal_glyph_vertical_arrow='UP'],
 ['wrong_right_top_spin_glyph',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[1].longitudinal_glyph_vertical_arrow='DOWN'],
 ['wrong_right_lower_spin_glyph',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[3].longitudinal_glyph_vertical_arrow='DOWN'],
 ['wrong_top_loop_head',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[1].circular_arrow_head_on_loop='UPPER_LEFT_AIMED_RIGHT'],
 ['wrong_bottom_loop_head',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[2].circular_arrow_head_on_loop='UPPER_RIGHT_AIMED_LEFT'],
 ['wrong_source_T_partner',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[2].vertex_pair[1]='BL'],
 ['wrong_source_other_T_partner',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[3].vertex_pair[1]='BR'],
 ['wrong_top_P_arrowhead',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[0].drawn_ends[0]='NO_HEAD'],
 ['wrong_bottom_P_arrowhead',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[1].drawn_ends[1]='NO_HEAD'],
 ['wrong_T_cross_arrowhead',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[2].drawn_ends[0]='NO_HEAD'],
 ['wrong_other_T_arrowhead',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[3].drawn_ends[1]='NO_HEAD'],
 ['turn_P_one_way',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[0].bidirectional_arrows_drawn=false],
 ['turn_T_one_way',d=>d.packet.original_p7_figure_source_transcription.diagram_transformation_links[3].bidirectional_arrows_drawn=false],
 ['change_node_label',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[2].caption='Psi_L^vee'],
 ['swap_node_geometry',d=>d.packet.original_p7_figure_source_transcription.source_original_vertices[1].layout='bottom_right'],
 ['invent_physical_spin_for_loop',d=>d.packet.original_p7_figure_source_transcription.physical_assignment_from_unlabelled_loop_shape='QUANTIFIED_SPIN_LAW'],
 ['invent_Eq3_2_QFT_phase',d=>d.packet.original_p7_figure_source_transcription.source_figure_lacks_explicit_phase_labels=false],
 ['erase_massless_scope',d=>d.packet.author_p7_qualitative_semantics.scope='all off-axis massive momenta'],
 ['erase_physical_T_scope',d=>d.packet.author_p7_qualitative_semantics.T='unrestricted symmetry'],
 ['incorrect_original_pdf_revision',d=>d.packet.frozen_original.revision='arXiv:2407.02497v1'],
 ['incorrect_original_pdf_sha',d=>d.packet.frozen_original.PDF_SHA256='BAD'],
 ['bad_original_source_text_page_SHA',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[6].original_extracted_page_SHA256='BAD'],
 ['bad_original_source_block',d=>d.packet.independent_original_visual_evidence.original_p7_layout_atoms[1].sha256='BAD'],
 ['bad_original_visual_crop_hash',d=>d.packet.independent_original_visual_evidence.high_resolution_original_diagram_CI.original_crop_image_SHA256='BAD'],
 ['delete_source_location',d=>d.inv.locations.pop()],
 ['edit_other_source_location',d=>d.inv.locations.find(x=>x.id==='L04-S014').original_source_semantic_group+=' UNSOURCED'],
 ['delete_S015_existing_owner',d=>d.inv.locations.find(x=>x.id==='L04-S015').ssc_ids.pop()],
 ['edit_other_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-100').body+=' UNSOURCED'],
 ['wrong_source_pointer',d=>d.SSC.items.find(x=>x.id==='L-SSC-101').source_expression_census.L04_ORIGINAL_P7_UNNUMBERED_P_T_DOUBLE_ARROW_AND_GLYPH_SOURCE_0_1.source_packet.git_blob_sha='BAD'],
 ['wrong_current_selected_exact_count',d=>d.reg.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified=1],
 ['forge_full_cold_L04',d=>d.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['forge_G0_complete',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['forge_G1_authorized',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['forge_merge_authorized',d=>d.gate.current_lawful_state.PR70_merge_authorized=true],
 ['forge_succeeded_CI',d=>d.gate.new_source_CI.status='SUCCESS']
];
let rejected=0;
if(errors.length===0)for(const [name,mut]of mutants){const q=structuredClone(D);try{mut(q);if(verify(q,sourcePage,sourceCrop).length)rejected++;else errors.push('HOSTILE_ESCAPED '+name);}catch(e){errors.push('HOSTILE_VERIFIER_EXCEPTION '+name+' '+e.message);}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-p7-PT-bidirectional-glyph-visual-source.v0.1',PASS:errors.length===0,errors,frozen_original_pdf_sha256_verified:true,original_page7_text_and_all_6_blocks_checked:true,original_live_highres_crop_SHA256_verified:sha(sourceCrop)===CROP,original_vertex_labels:4,original_bidirectional_P_and_T_relations:4,original_relation_arrowheads:8,original_vertical_glyph_arrows:4,original_loop_glyph_arrows:4,L04_source_groups_total:53,L04_source_groups_unchanged_whole:52,existing_L_SSC_identities:191,unchanged_entire_SSC_items:190,L04_selected_exact_groups_remaining:0,hostiles_defined:mutants.length,hostiles_rejected:rejected,whole_original_L04_semantic_cold_review_passed:false,all_six_original_source_cold_complete:false,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(errors.length)process.exitCode=1;

