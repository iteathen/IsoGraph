// Lisi G0 exact frozen L04 §3 p7 eight massless Dirac u/v source columns.
// Re-fetch original v2 PDF, hash 17-page original, verify all six p7 PDF
// source blocks and original fixed page render; compare 8×4 SOURCE row cells,
// Q1–Q4 identity and exact current SSC, and preserve separate p7 P/T arrow
// source gap. No physical theorem, no G0 freeze, no primitive G1.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_P7_EIGHT_SIGNED_SPINOR_COLUMNS_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_11.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_12.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_78.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_79.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_32.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_33.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_49.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_50.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_143.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_144.json',
 self:E+'tools/verify-l-g0-l04-original-p7-eight-spinor-columns-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const B=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const originalSha='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const rows=[
 ['L04-P7-U1','positive','u','minus_z','u_{-0}^wedge',[1,0,0,0],'Psi_L^wedge','Q1',1],
 ['L04-P7-U2','positive','u','plus_z','u_{+0}^vee',[0,1,0,0],'Psi_L^vee','Q2',1],
 ['L04-P7-U3','positive','u','plus_z','u_{+0}^wedge',[0,0,1,0],'Psi_R^wedge','Q3',1],
 ['L04-P7-U4','positive','u','minus_z','u_{-0}^vee',[0,0,0,1],'Psi_R^vee','Q4',1],
 ['L04-P7-V1','negative','v','minus_z','v_{-0}^wedge',[0,0,0,-1],'Psi_R^vee','Q4',-1],
 ['L04-P7-V2','negative','v','plus_z','v_{+0}^vee',[0,0,1,0],'Psi_R^wedge','Q3',1],
 ['L04-P7-V3','negative','v','plus_z','v_{+0}^wedge',[0,1,0,0],'Psi_L^vee','Q2',1],
 ['L04-P7-V4','negative','v','minus_z','v_{-0}^vee',[-1,0,0,0],'Psi_L^wedge','Q1',-1]
];
const sourceAtoms=[
 ['L04-P007-B001','406ce0d033850ebb23cbcebfc8fc7ccc0d71352e3d85a77cb2456b07f7fb236b',1,14],
 ['L04-P007-B002','a634192bd2a88cca1015af4043e23e353f9bf6f7b27ae7b27d7576b9c212f9e6',16,27],
 ['L04-P007-B003','3e33fe789bf60f34dc8cd2c2583cdc2f404d8e2ee50aa1f30bf2cf1de5cc2b78',29,37]
];
const exactOpen='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED';
const columnsReconciled='SCOPED_ORIGINAL_P7_EIGHT_4X1_SIGNED_U_V_HELICITY_SOURCE_CELLS_RECONCILED_WHOLE_COLD_OPEN';
function check(z,observed){
 const errors=[],t=(ok,msg)=>{if(!ok)errors.push(msg);};
 const {packet:s,manifest:m,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 t(s?.schema==='isograph.track-L.G0.L04-frozen-original-p7-eight-spinor-column-cell-source.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'source L-only G0 semantics not authority');
 t(s?.frozen_original?.id==='L04'&&s.frozen_original.revision==='arXiv:2407.02497v2'&&s.frozen_original.PDF_SHA256===originalSha&&s.frozen_original.PDF_bytes===348134&&s.frozen_original.pages===17&&s.frozen_original.original_page===7,'exact official frozen source PDF pin');
 t(s?.frozen_original?.source_layout_manifest?.git_blob_sha===B.manifest&&s.frozen_original.page_text_layout_SHA256==='8b40b6901b5cfcbb654d22a128a4763a04e399d927e437dc51a60714784a20ea'&&s.frozen_original.original_page_visual_CI?.image_SHA256==='b9601b1c4ceaaa6d7ffbf5e1e40c469583643911ccee126ee492eede255270e5','independent original exact p7 image and source SHA');
 const source=m?.original_sources?.[3],page=source?.original_pdf_extracted_pages?.[6];
 t(source?.id==='L04'&&source.revision==='arXiv:2407.02497v2'&&source.PDF_SHA256===originalSha&&source.PDF_byte_count===348134&&source.original_pdf_extracted_pages?.length===17,'original source manifestation and page count');
 t(observed?.pageSHA===page?.original_extracted_page_SHA256&&observed?.pageSHA===s.frozen_original.page_text_layout_SHA256,'original entire PDF p7 layout independent page SHA');
 t(observed?.imageSHA===s.frozen_original.original_page_visual_CI.image_SHA256,'independent physical p7 source image matched original visual sha');
 t(page?.blocks?.length===6&&eq(sourceAtoms.map(x=>x[0]),s?.original_source_location?.original_p7_source_atoms?.map(x=>x.id)),'three targeted original source spans under full 6-block p7 partition');
 for(const [id,h,a,b]of sourceAtoms){
  const src=page?.blocks?.find(x=>x.source_atom_id===id),p=s?.original_source_location?.original_p7_source_atoms?.find(x=>x.id===id);
  t(src?.original_source_block_SHA256===h&&p?.sha256===h&&p.line_start===a&&p.line_end===b,'exact original block SHA, line span and packet source locator '+id);
  t(observed?.blocks?.[id]===h,'physical original PDF source block independently SHA reread '+id);
 }
 t(s?.original_source_location?.group_id==='L04-S014'&&s.original_source_location.existing_SSC_owner==='L-SSC-101','source first known p7 original exact obligation and existing owner');
 t(s?.source_printed_helicity_boundary?.general_massless_momenta_NOT_helicity_eigenstates===true&&s.source_printed_helicity_boundary.source_restricted_p_u==='p_u=+sigma3 or -sigma3 for along/opposite z only'&&s.source_printed_helicity_boundary.source_helicity_operator==='h=(1/2) sigma0 tensor p_u','author scope only along ±z, not universal helicity claim');
 t(s?.source_printed_helicity_boundary?.negative_energy_label_guard?.includes('opposite physical spin and helicity'),'original explicit counter-intuitive v-label negative evidence');
 const vv=s?.exact_eight_printed_column_cells,aa=vv?.source_rows||[];
 t(aa.length===8&&vv.source_cell_count===32&&vv.source_positive_energy_rows===4&&vv.source_negative_energy_rows===4&&vv.negative_components_count===2,'finite exact source p7 eight 4x1 columns and 2 negative signs');
 for(let k=0;k<8;k++){
  const row=aa[k],expect=rows[k];
  if(!row){t(false,'missing original eight source column '+k);continue;}
  t(eq([row.id,row.energy,row.spinor,row.momentum,row.source_symbol,row.four_component,row.source_basis,row.Q_basis,row.overall_basis_sign],expect),'original printed source column exact ordered u/v, signed cells, momenta and Q basis '+k);
  t(row.four_component?.length===4&&row.four_component.filter(x=>x!==0).length===1&&Math.abs(row.four_component.find(x=>x!==0))===1,'source four-component basis 1-sparse exact signed unit '+k);
 }
 t(eq(vv?.source_basis_reference?.source_Q_bindings,['Q1=Psi_L^wedge','Q2=Psi_L^vee','Q3=Psi_R^wedge','Q4=Psi_R^vee']),'original source Eq2.1 four distinct Weyl spinor binders');
 t(s?.companion_prior_source?.git_blob_sha==='3127823df7c31eca60f097c2a7f97bd5838be354'&&s.companion_prior_source.all_eight_original_spinor_cells_were_unqualified_predecessor===true,'historical source p7 known missed exact source cells preserved');
 t(s?.separate_open_G0_source_boundary?.original_group==='L04-S015'&&s.separate_open_G0_source_boundary.source_arrow_direction_and_spin_glyph_meaning_full_reverse_cold_complete===false&&s.separate_open_G0_source_boundary.original_p7_unnumbered_C_P_T_chiral_diagram===true,'p7 drawn P/T arrow and spin geometry original exact boundary remains');
 t(s?.systematic_method?.class==='NARRATIVE_MAPPED_SOURCE_GROUP_WAS_NOT_AN_EXACT_SOURCE_COLUMN_CELL_RECONSTRUCTION'&&s?.conservation?.typed_SSC_added===0,'cause-oriented source extraction not semantic ID inflation');
 t(s?.locks?.G0_frozen===false&&s.locks.G1_authorized===false&&s.locks.whole_L04_original_source_cold_complete===false&&s.locks.all_L_original_complete_cold_sources===0&&s.locks.original_theory_truth_required_for_G0===false&&s.locks.PR70_merge_authorized===false&&s.locks.W_math_imported===false,'stage, source theorem and W firewall');
 t(oi?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'old current original source and SSC finite identity counts');
 const moved=[],dispositions={},owners=new Set();
 for(let k=0;k<53;k++){
  const old=oi?.locations?.[k],cur=i?.locations?.[k];
  if(!old||!cur){t(false,'deleted source group '+k);continue;}
  t(old.id===cur.id,'stable source group id '+k);
  if(!eq(old,cur))moved.push(cur.id);
  dispositions[cur.disposition]=(dispositions[cur.disposition]||0)+1;
  for(const id of cur.ssc_ids||[])owners.add(id);
 }
 t(eq(moved,['L04-S014','L04-S015']),'only existing source groups S014/S015 modified');
 const row14=i?.locations?.find(x=>x.id==='L04-S014'),row15=i?.locations?.find(x=>x.id==='L04-S015');
 t(row14?.disposition===columnsReconciled&&eq(row14?.ssc_ids,['L-SSC-101'])&&row14.original_p7_eight_signed_column_source_evidence?.git_blob_sha===B.packet,'original eight signed column source group complete and SSC owner scoped');
 t(row15?.disposition===exactOpen&&eq(row15?.ssc_ids,['L-SSC-100','L-SSC-101'])&&row15.original_p7_unnumbered_diagram_source_exact_pending?.G0_exact_original_source_incidence_open===true,'original p7 P/T figure source obligation not silently erased');
 t(Object.keys(dispositions).length===Object.keys(i?.counts?.by_disposition||{}).length&&Object.entries(dispositions).every(([k,v])=>i.counts.by_disposition[k]===v)&&dispositions[exactOpen]===1&&i.counts.remaining_exact_source_groups===1,'source first mechanically computed exact outstanding original debt');
 t(eq([...owners].sort(),oi?.reverse?.L04_ssc_ids?.slice().sort())&&owners.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'34 existing L04 owner sets conserved without global false PASS');
 const edited=[];
 for(let k=0;k<191;k++){
  const old=o?.items?.[k],cur=n?.items?.[k];if(!old||!cur){t(false,'deleted typed SSC row '+k);continue;}
  t(old.id===cur.id,'stable SSC identity at '+k);
  if(!eq(old,cur))edited.push(cur.id);
 }
 t(eq(edited,['L-SSC-101'])&&n?.item_count===191,'190 entire other SSC records conserved, one existing L-SSC-101 updated');
 const body=n?.items?.find(x=>x.id==='L-SSC-101')?.body||'';
 for(const row of aa){const literal=row.source_symbol+'=['+row.four_component.join(',')+']='+(row.overall_basis_sign===-1?'-':'')+row.source_basis;t(body.includes(literal),'original P7 exact source4x1 row in current SSC101 '+row.id);}
 t(body.includes('diagram')&&body.includes('remain G0 source fidelity OPEN')&&body.includes('opposite')&&body.includes('momentum ±z'),'source p7 negative modality and remaining arrow scope remain in SSC');
 t(n?.items?.find(x=>x.id==='L-SSC-101')?.source_expression_census?.L04_ORIGINAL_P7_EIGHT_SIGNED_U_V_SPINOR_COLUMNS_0_1?.source_packet?.git_blob_sha===B.packet&&n.items.find(x=>x.id==='L-SSC-101').source_expression_census.L04_ORIGINAL_P7_EIGHT_SIGNED_U_V_SPINOR_COLUMNS_0_1.source_first_inverse.git_blob_sha===B.inv,'exact current in-record source atom to SSC pointer');
 t(n?.schema==='woit-lisi.track-l.source-semantic-census.v0.79'&&n.predecessor.git_blob_sha===B.oldSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv&&n.guards.source_census_freeze_complete===false,'source SSC ancestry and stage guard');
 t(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.33'&&r.source_first_predecessor.git_blob_sha===B.oldReg&&r.current_ssc.git_blob_sha===B.SSC&&r.denominator.source_first_location_units===350&&r.denominator.distinct_ssc_identity_refs===191,'whole six source count and SSC authority fixed');
 t(r?.per_source?.find(x=>x.source==='L04')?.audit_git_blob_sha===B.inv&&r.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified===1&&r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_frozen===false,'source-specific known original p7 next exact pending and global G0 open');
 t(v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.50'&&v.predecessor_exact.git_blob_sha===B.oldTr&&v.current_census.git_blob_sha===B.SSC&&v.current_L04_source_first_inventory.git_blob_sha===B.inv&&v.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&v.complete_sources===0,'stage traversal exact source and historical evidence');
 t(g?.schema==='isograph.exp062-l-current-stage-gate.v0.144'&&g.predecessor_gate.git_blob_sha===B.oldGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.source_p7_matrix_packet.git_blob_sha===B.packet&&g.source_p7_matrix_verifier.git_blob_sha===B.self,'current stage gate exact provenance and verifier');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new CI pending and G0/G1 locks');
 return errors;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L04-P7-original-cold-')),obs={blocks:{}};
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('ORIGINAL_SOURCE_PDF_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());if(bytes.length!==348134||sha(bytes)!==originalSha)throw Error('WRONG_FROZEN_L04_SOURCE_BYTES');
 const pdf=path.join(dir,'L04-original-v2.pdf');fs.writeFileSync(pdf,bytes);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000})))throw Error('FROZEN_ORIGINAL_17_PAGES');
 const raw=execFileSync('pdftotext',['-f','7','-l','7','-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:2000000});
 obs.pageSHA=sha(Buffer.from(raw));
 const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const manifest=D.manifest.original_sources[3].original_pdf_extracted_pages[6];
 for(const block of manifest.blocks){const text=lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n');obs.blocks[block.source_atom_id]=sha(Buffer.from(text));}
 const prefix=path.join(dir,'original-p7');execFileSync('pdftoppm',['-f','7','-l','7','-r','165','-png','-singlefile',pdf,prefix],{timeout:22000,maxBuffer:1500000});obs.imageSHA=sha(fs.readFileSync(prefix+'.png'));
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=check(D,obs);
const mutants=[
 ['delete_one_original_signed_row',d=>d.packet.exact_eight_printed_column_cells.source_rows.pop()],
 ['incorrect_p7_negative_sign',d=>d.packet.exact_eight_printed_column_cells.source_rows[4].four_component[3]=1],
 ['incorrect_u_minus_z_label',d=>d.packet.exact_eight_printed_column_cells.source_rows[0].momentum='plus_z'],
 ['swap_positive_energy_basis',d=>d.packet.exact_eight_printed_column_cells.source_rows[0].Q_basis='Q4'],
 ['swap_negative_energy_chirality',d=>d.packet.exact_eight_printed_column_cells.source_rows[7].source_basis='Psi_R^wedge'],
 ['promote_generic_momentum_eigenstate',d=>d.packet.source_printed_helicity_boundary.general_massless_momenta_NOT_helicity_eigenstates=false],
 ['erase_negative_energy_source_caveat',d=>d.packet.source_printed_helicity_boundary.negative_energy_label_guard='none'],
 ['invent_source_physics_proof',d=>d.packet.locks.original_theory_truth_required_for_G0=true],
 ['forget_original_PDF_byte_SHA',d=>d.packet.frozen_original.PDF_SHA256='bad'],
 ['alter_visual_source_SHA',d=>d.packet.frozen_original.original_page_visual_CI.image_SHA256='bad'],
 ['delete_original_p7_source_block',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[6].blocks.pop()],
 ['falsify_original_block_hash',d=>d.packet.original_source_location.original_p7_source_atoms[0].sha256='bad'],
 ['move_next_G0_source_boundary',d=>d.packet.separate_open_G0_source_boundary.original_group='L04-S027'],
 ['erase_original_spin_arrow_pending',d=>d.packet.separate_open_G0_source_boundary.source_arrow_direction_and_spin_glyph_meaning_full_reverse_cold_complete=true],
 ['premature_next_G0_group_PASSED',d=>d.inv.locations.find(x=>x.id==='L04-S015').disposition='MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS'],
 ['erase_source_SSC101_owner',d=>d.inv.locations.find(x=>x.id==='L04-S014').ssc_ids=[]],
 ['erase_S015_SSC101_redundant_owner',d=>d.inv.locations.find(x=>x.id==='L04-S015').ssc_ids=['L-SSC-100']],
 ['invent_new_SSC_source_item',d=>d.SSC.items.push({...d.SSC.items[0],id:'L-SSC-192'})],
 ['edit_unrelated_L04_source_group',d=>d.inv.locations.find(x=>x.id==='L04-S041').original_source_semantic_group+='forged'],
 ['edit_unrelated_SSC119',d=>d.SSC.items.find(x=>x.id==='L-SSC-119').body+='forged'],
 ['replace_source_printed_basis',d=>d.SSC.items.find(x=>x.id==='L-SSC-101').body=d.SSC.items.find(x=>x.id==='L-SSC-101').body.replace('u_{-0}^wedge=[1,0,0,0]','u_{-0}^wedge=[-1,0,0,0]')],
 ['fake_entire_L04_cold',d=>d.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['fake_current_G0',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['fake_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['fake_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true],
 ['fake_current_CI_PASS',d=>d.gate.new_source_CI.status='SUCCESS']
];
for(let k=0;k<8;k++)mutants.push(['flip_original_source_cell_'+k,d=>{const a=d.packet.exact_eight_printed_column_cells.source_rows[k].four_component;a[a.findIndex(x=>x!==0)]*=-1;}]);
let rejected=0;
if(issues.length===0){for(const [name,change] of mutants){const d=structuredClone(D);try{change(d);if(check(d,obs).length)rejected++;else issues.push('HOSTILE_ESCAPE '+name);}catch(e){issues.push('VERIFIER_EXCEPTION '+name+': '+e.message)}}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-p7-eight-spinor-source-0.1',PASS:issues.length===0,issues,original_source_PDF_sha_verified:true,original_page:7,p7_original_layout_SHA256_verified:true,p7_original_raster_SHA256_verified:true,original_p7_pdf_blocks_sha_verified:6,original_u_v_spinor_columns:8,source_signed_four_component_cells:32,original_L04_source_groups:53,all_L_source_groups:350,all_existing_SSC_items:191,changed_SSC_item:'L-SSC-101',source_remaining_original_exact_group:'L04-S015',hostiles_defined:mutants.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,whole_source_cold_complete:false,PR_merge_authorized:false},null,2));
if(issues.length)process.exitCode=1;

