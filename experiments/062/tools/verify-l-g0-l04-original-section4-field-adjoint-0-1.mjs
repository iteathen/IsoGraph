// L-only G0: SHA-pinned original L04 v2 p8 field/adjoint source fidelity.
// Independent re-extraction of ALL 17 original pages and ALL 109 source blocks,
// exact visual p8, source-first inverse, SSC record and 30 adversarial mutations.
// Page/source lookup alone is NOT full source semantic G0 qualification.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_SECTION4_QUANTIZED_FIELD_ADJOINT_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 all109:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_4.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_5.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_71.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_72.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_24.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_25.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_41.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_42.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_125.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_126.json',
 self:E+'tools/verify-l-g0-l04-original-section4-field-adjoint-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const jsonEqual=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const H=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,blob(v)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,v])=>[k,read(v)]));
const frozenSHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const header=[
 ['L04-P008-B002',3,13,'2cb5f103d8acc0c3457f82aa69000ff6395f6884270d4e67f9f3e58c1842cdfe'],
 ['L04-P008-B003',15,25,'68f3ff1bbc5e929bf89ec0078efa4fc3f23de8ac2ca5a08773fb5ee88f21fc96'],
 ['L04-P008-B004',27,51,'66cab51b9aa5aaeb402f9350a9f59da02fc80f8a86590b80f730bc921800671f'],
 ['L04-P008-B005',54,61,'3534705d92d1aefe7878213228dea2e3dd4b700213824d9b7c6918f84e6b1cd1']
 ];
const eq41=[
 'Psi_hat(x)=integral[d^3p/((2pi)^3(2E))](a_hat_p^{wedge/vee} u_p^{wedge/vee} exp(-i p_mu x^mu)+b_hat_p^{wedge/vee dagger} v_p^{wedge/vee} exp(+i p_mu x^mu))',
 'restrict longitudinal modes p_z = +E or -E; +z/-z momentum subscript ties to exp(∓iE(t∓z))',
 'Eq4.1 column component 1: a_hat_-^wedge exp(-iE(t+z)) - b_hat_-^{vee dagger} exp(+iE(t+z))',
 'Eq4.1 column component 2: a_hat_+^vee exp(-iE(t-z)) + b_hat_+^{wedge dagger} exp(+iE(t-z))',
 'Eq4.1 column component 3: a_hat_+^wedge exp(-iE(t-z)) + b_hat_+^{vee dagger} exp(+iE(t-z))',
 'Eq4.1 column component 4: a_hat_-^vee exp(-iE(t+z)) - b_hat_-^{wedge dagger} exp(+iE(t+z))'
 ];
const eq42=[
 'Psi_bar_hat(x)=Psi_hat(x)dagger gamma_0 = integral[d^3p/((2pi)^3(2E))](a_hat_p^{wedge/vee dagger} u_bar_p^{wedge/vee} exp(+i p_mu x^mu)+b_hat_p^{wedge/vee} v_bar_p^{wedge/vee} exp(-i p_mu x^mu))',
 'Eq4.2 row component 1: a_hat_+^{wedge dagger} exp(+iE(t-z)) + b_hat_+^vee exp(-iE(t-z))',
 'Eq4.2 row component 2: a_hat_-^{vee dagger} exp(+iE(t+z)) - b_hat_-^wedge exp(-iE(t+z))',
 'Eq4.2 row component 3: a_hat_-^{wedge dagger} exp(+iE(t+z)) - b_hat_-^vee exp(-iE(t+z))',
 'Eq4.2 row component 4: a_hat_+^{vee dagger} exp(+iE(t-z)) + b_hat_+^wedge exp(-iE(t-z))'
];
const disposed='SCOPED_ORIGINAL_EQ4_1_EQ4_2_COLUMN_ROW_SIGNED_SOURCE_VISUAL_RECONCILED_WHOLE_COLD_OPEN';
const p8VisualSHA='7ea9fdefd2492f307b29a1118329e81285c301311a18eb7cc86be887efc4b003';
function audit(z,actualPages,imageHash){
 const fails=[],ok=(condition,msg)=>{if(!condition)fails.push(msg);};
 const {packet:s,manifest:m,all109:x,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:ot,tr:t,oldGate:og,gate:g}=z;
 ok(s?.schema==='isograph.track-L.G0.L04-frozen-original-quantized-field-and-adjoint-column-row.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.source_semantic_authority===false,'G0 original semantic source and no invented authority');
 ok(s?.frozen_source?.revision==='arXiv:2407.02497v2'&&s.frozen_source.PDF_SHA256===frozenSHA&&s.frozen_source.PDF_byte_count===348134&&s.frozen_source.PDF_pages===17,'exact source frozen SHA and date');
 ok(s?.frozen_visual_evidence?.run_id===38120301520&&s.frozen_visual_evidence.source_chunk_job_id===114413452988&&s.frozen_visual_evidence.original_head_sha==='91401ae8b82806779aa5c0437c751c572c88b000'&&s.frozen_visual_evidence.overall_conclusion==='success'&&s.frozen_visual_evidence.source_p8_visual_SHA256===p8VisualSHA&&imageHash===p8VisualSHA,'independent original p8 SHA visual replay');
 ok(m?.original_sources?.length===6&&m.original_sources[3].id==='L04'&&m.original_sources[3].PDF_SHA256===frozenSHA&&m.original_sources[3].revision==='arXiv:2407.02497v2','six frozen sources original authority revision');
 const orig=m.original_sources[3];
 ok(orig.original_pdf_extracted_pages?.length===17&&actualPages.length===17,'17 original source pages inspected as extracted independent source evidence');
 let atoms=[],sourceAtoms=new Map();
 for(let page=0;page<17;page++){
  const src=orig.original_pdf_extracted_pages[page],raw=actualPages[page],lines=raw?.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  ok(!!src&&sha(Buffer.from(raw||''))===src?.original_extracted_page_SHA256,'actual extracted original page '+(page+1));
  for(const b of src?.blocks||[]){
   ok(!sourceAtoms.has(b.source_atom_id),'no duplicate original atom '+b.source_atom_id);
   let token=lines?.slice(b.original_extracted_line_start-1,b.original_extracted_line_end).join('\n');
   ok(token!==undefined&&sha(Buffer.from(token))===b.original_source_block_SHA256,'all original source PDF block SHA '+b.source_atom_id);
   sourceAtoms.set(b.source_atom_id,b);atoms.push(b);
  }
 }
 ok(atoms.length===109&&sourceAtoms.size===109,'109 source text blocks independently rechecked');
 ok(x?.original_first_source_blocks?.length===109&&x.track==='L'&&x.stage==='G0','original 109 block source-first semantic role crosswalk present');
 const visited=new Set();
 for(const b of x?.original_first_source_blocks||[]){
  const actual=sourceAtoms.get(b.atom_id);
  ok(!!actual&&!visited.has(b.atom_id),'all source block pointers reciprocal and unique '+b.atom_id);
  visited.add(b.atom_id);
  ok(actual?.original_source_block_SHA256===b.source_original_text_block_SHA256&&actual?.original_extracted_line_start===b.source_line_range[0]&&actual?.original_extracted_line_end===b.source_line_range[1],'exact original 109 block SHA/line provenance '+b.atom_id);
 }
 ok(visited.size===109,'original all source blocks covered by 109 crosswalk including nonload material');
 ok(jsonEqual(s?.original_source_text_blocks?.map(b=>[b.source_atom_id,...b.original_extracted_line_span,b.original_source_block_SHA256]),header),'four exact 8th original PDF page block signatures');
 ok(s?.frozen_source?.original_extracted_page_SHA256===orig.original_pdf_extracted_pages[7].original_extracted_page_SHA256,'original p8 fixed layout SHA');
 ok(s?.source_claims?.length===2&&jsonEqual(s.source_claims.map(z=>z.original_source_group),['L04-S016','L04-S017']),'source-first pair has stable source location identity');
 const q1=s?.source_claims?.[0],q2=s?.source_claims?.[1];
 ok(q1?.existing_SSC_owner==='L-SSC-102'&&q1?.printed_equation==='(4.1)'&&q1?.source_original_page===8&&jsonEqual(q1.blocks,['L04-P008-B002','L04-P008-B004'])&&jsonEqual(q1.source_asserted_formulas,eq41),'all original field 4-column signs, phase, operators and binders');
 ok(q2?.existing_SSC_owner==='L-SSC-102'&&q2?.printed_equation==='(4.2)'&&q2?.source_original_page===8&&jsonEqual(q2.blocks,['L04-P008-B003','L04-P008-B005'])&&jsonEqual(q2.source_asserted_formulas,eq42),'all original adjoint 4-row signs, phase, operators and binders');
 ok(q1?.positive_controls_source_scope?.length===4&&q2?.positive_controls_source_scope?.length===4,'source four paired binder guard cases for each');
 ok(s?.observed_prior_omission?.cause_class==='EXACT_SOURCE_OPERATOR_ROLE_ORDER_PHASE_AND_BINDER_UNDERINDEXED_IN_SSC_GENERIC_QUANTIZED_FIELD_SUMMARY'&&jsonEqual(s.observed_prior_omission.original_groups,['L04-S016','L04-S017']),'cause-oriented recurring omission prevention');
 ok(s?.bidirectional_conservation?.unmodified_L04_source_groups===51&&s.bidirectional_conservation.unmodified_complete_old_SSC===190&&s.bidirectional_conservation.added_SSC_ids===0&&s.bidirectional_conservation.new_remaining_original_exact_L04_groups===9,'exact source group and source semantic record conservation');
 ok(s?.explicit_limitations?.G0_complete===false&&s.explicit_limitations.G1_authorized===false&&s.explicit_limitations.W_semantics_imported===false&&s.explicit_limitations.whole_17page_source_semantic_cold_complete===false,'G0 remains open, no W/G1');
 ok(oi.locations.length===53&&i.locations.length===53&&o.items.length===191&&n.items.length===191,'53 original groups and 191 stable SSC items');
 const revisedGroups=[],idMap=new Set();
 for(let k=0;k<53;k++){
  const before=oi.locations[k],after=i.locations[k];
  ok(before.id===after.id,'conserved original group stable identity '+k);
  if(!jsonEqual(before,after))revisedGroups.push(after.id);
  for(const id of after.ssc_ids||[])idMap.add(id);
 }
 ok(jsonEqual(revisedGroups,['L04-S016','L04-S017']),'only 2 original source groups changed');
 ok(jsonEqual([...idMap].sort(),oi.reverse.L04_ssc_ids.slice().sort())&&idMap.size===34,'53 groups map to all and only 34 existing L04 SSC IDs');
 for(const id of ['L04-S016','L04-S017']){
  const loc=i.locations.find(x=>x.id===id);
  ok(loc.disposition===disposed&&loc.ssc_ids?.length===1&&loc.ssc_ids[0]==='L-SSC-102'&&loc.original_field_adjoint_source_evidence.git_blob_sha===H.packet&&loc.original_field_adjoint_source_evidence.whole_L04_cold_complete===false,'reconstructed original group owner/source/guard '+id);
 }
 const dispositions={};for(const loc of i.locations)dispositions[loc.disposition]=(dispositions[loc.disposition]||0)+1;
 ok(Object.keys(dispositions).length===Object.keys(i.counts.by_disposition).length&&Object.entries(dispositions).every(([key,val])=>i.counts.by_disposition[key]===val)&&i.counts.by_disposition.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===9&&i.counts.by_disposition[disposed]===2,'derived original source group disposition counts exactly');
 ok(i.counts.remaining_exact_source_groups===9&&i.counts.complete_original_cold_sources===0&&i.G0_frozen===false&&i.G1_authorized===false,'9 selected source exact groups left 0 whole cold passes');
 ok(i.original_section4_field_adjoint_reconciliation?.source_packet_sha===H.packet&&i.original_section4_field_adjoint_reconciliation.parent_old_inventory_blob===H.oldInv,'bidirectional source inverse exact packet lineage');
 let changed=[];for(let k=0;k<191;k++){ok(o.items[k].id===n.items[k].id,'existing SSC ID '+k);if(!jsonEqual(o.items[k],n.items[k]))changed.push(n.items[k].id);}
 ok(jsonEqual(changed,['L-SSC-102']),'all 190 other typed original SSC items unchanged');
 const field=n.items.find(z=>z.id==='L-SSC-102');
 for(const line of [...eq41,...eq42])ok(field.body.includes(line),'full source original Eq4.1/4.2 formula conserved exactly in SSC: '+line.slice(0,80));
 const ptr=field?.source_expression_census?.L04_ORIGINAL_EQ4_1_EQ4_2_COLUMN_ROW_P8_SOURCE_0_1;
 ok(ptr?.source_packet?.git_blob_sha===H.packet&&ptr?.source_first_inverse?.git_blob_sha===H.inv&&ptr?.whole_source_cold_complete===false,'original source→SSC in-record exact bidirectional pointer');
 ok(n.predecessor.git_blob_sha===H.oldSSC&&n.revision.source_packet.git_blob_sha===H.packet&&n.revision.source_first_inverse.git_blob_sha===H.inv&&n.item_count===191,'SSC versioned predecessor and original source evidence');
 ok(n.guards.source_census_freeze_complete===false&&n.guards.whole_L_source_cold_audit_complete===false,'G0 census unfrozen');
 ok(r.source_first_predecessor.git_blob_sha===H.oldReg&&r.current_ssc.git_blob_sha===H.SSC&&r.per_source.reduce((a,z)=>a+z.source_first_location_units,0)===350&&r.per_source.length===6,'350 six original source role groups conserved');
 const rs=r.per_source.find(x=>x.source==='L04');
 ok(rs.original_exact_cell_expression_groups_not_yet_independently_verified===9&&rs.classified_source_locations.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===9&&r.explicit_G0_outstanding.source_exactness_by_source.find(x=>x.source==='L04').count===9,'live source exact counts derived, no stale 11/14/18 shadows');
 ok(r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_complete===false&&r.exit_acceptance_contract.G0_SSC_frozen===false,'G0 six source cold audits remain open');
 ok(t.predecessor_exact.git_blob_sha===H.oldTr&&t.current_census.git_blob_sha===H.SSC&&t.current_L04_source_first_inventory.git_blob_sha===H.inv&&t.current_G0_six_original_finite_convergence.git_blob_sha===H.reg&&t.complete_sources===0,'traversal exact source parents and no claimed completion');
 ok(g.predecessor_gate.git_blob_sha===H.oldGate&&g.current_source_census.git_blob_sha===H.SSC&&g.current_convergence.git_blob_sha===H.reg&&g.current_traversal.git_blob_sha===H.tr&&g.field_source_packet.git_blob_sha===H.packet&&g.field_source_verifier.git_blob_sha===H.self,'stage gate precise provenance for all artifacts');
 ok(g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false&&g.new_source_CI.status==='PENDING_GITHUB_ACTIONS','not even scoped success preclaimed until CI');
 return fails;
}
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-G0-all17-source-original-'));
let originalPages=[],imageHash='',sourceVerified=false;
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('FROZEN_ORIGINAL_PDF_HTTP_'+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length!==348134||sha(bytes)!==frozenSHA)throw Error('FROZEN_ORIGINAL_V2_PDF_SHA_INVALID');
 sourceVerified=true;
 const pdf=path.join(tmp,'frozen-L04v2.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_ORIGINAL_PDF_17_PAGES');
 for(let page=1;page<=17;page++){
  originalPages.push(execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:16000,maxBuffer:2200000}));
 }
 const pngPrefix=path.join(tmp,'frozen-p8');
 execFileSync('pdftoppm',['-f','8','-l','8','-r','165','-png','-singlefile',pdf,pngPrefix],{timeout:20000});
 imageHash=sha(fs.readFileSync(pngPrefix+'.png'));
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
const errors=audit(D,originalPages,imageHash);
const hostile=[
 ['field_positive_negative_z_phase',d=>d.packet.source_claims[0].source_asserted_formulas[2]=d.packet.source_claims[0].source_asserted_formulas[2].replace('t+z','t-z')],
 ['field_particle_antiparticle_swap',d=>d.packet.source_claims[0].source_asserted_formulas[0]=d.packet.source_claims[0].source_asserted_formulas[0].replace('b_hat_p','a_hat_p')],
 ['field_first_component_minus_sign',d=>d.packet.source_claims[0].source_asserted_formulas[2]=d.packet.source_claims[0].source_asserted_formulas[2].replace(' - b_hat',' + b_hat')],
 ['field_third_component_wedge_vee',d=>d.packet.source_claims[0].source_asserted_formulas[4]=d.packet.source_claims[0].source_asserted_formulas[4].replace('^wedge','^vee')],
 ['field_second_component_vee_wedge',d=>d.packet.source_claims[0].source_asserted_formulas[3]=d.packet.source_claims[0].source_asserted_formulas[3].replace('^vee','^wedge')],
 ['field_fourth_component_momentum',d=>d.packet.source_claims[0].source_asserted_formulas[5]=d.packet.source_claims[0].source_asserted_formulas[5].replace('a_hat_-','a_hat_+')],
 ['field_integral_2E_factor',d=>d.packet.source_claims[0].source_asserted_formulas[0]=d.packet.source_claims[0].source_asserted_formulas[0].replace('(2E)','(sqrt(2E))')],
 ['erase_longitudinal_restriction',d=>d.packet.source_claims[0].source_asserted_formulas.splice(1,1)],
 ['adjoint_second_sign',d=>d.packet.source_claims[1].source_asserted_formulas[2]=d.packet.source_claims[1].source_asserted_formulas[2].replace(' - b_hat',' + b_hat')],
 ['adjoint_third_spin',d=>d.packet.source_claims[1].source_asserted_formulas[3]=d.packet.source_claims[1].source_asserted_formulas[3].replace('^{wedge dagger}','^{vee dagger}')],
 ['adjoint_dagger_b',d=>d.packet.source_claims[1].source_asserted_formulas[1]=d.packet.source_claims[1].source_asserted_formulas[1].replace('b_hat_+^vee','b_hat_+^{vee dagger}')],
 ['adjoint_general_phase_sign',d=>d.packet.source_claims[1].source_asserted_formulas[0]=d.packet.source_claims[1].source_asserted_formulas[0].replace('exp(+i p_mu','exp(-i p_mu')],
 ['adjoint_fourth_permutation',d=>d.packet.source_claims[1].source_asserted_formulas[4]=d.packet.source_claims[1].source_asserted_formulas[4].replace('a_hat_+','a_hat_-')],
 ['source_revision_swapped',d=>d.packet.frozen_source.revision='arXiv:2407.02497v3'],
 ['source_byte_hash_swapped',d=>d.packet.frozen_source.PDF_SHA256='BAD'],
 ['source_p8_image_hash_swapped',d=>d.packet.frozen_visual_evidence.source_p8_visual_SHA256='BAD'],
 ['source_block_span_wrong',d=>d.packet.original_source_text_blocks[0].original_extracted_line_span[1]=14],
 ['remove_original_109_crosswalk_entry',d=>d.all109.original_first_source_blocks.pop()],
 ['source_109_block_sha_wrong',d=>d.all109.original_first_source_blocks[3].source_original_text_block_SHA256='BAD'],
 ['source_53_group_missing',d=>d.inv.locations.splice(15,1)],
 ['erase_S016_owner',d=>d.inv.locations.find(z=>z.id==='L04-S016').ssc_ids=[]],
 ['invent_original_S017_new_SSC',d=>d.inv.locations.find(z=>z.id==='L04-S017').ssc_ids=['L-SSC-999']],
 ['fake_exact_source_0',d=>d.inv.counts.remaining_exact_source_groups=0],
 ['forge_whole_source_cold',d=>d.inv.counts.complete_original_cold_sources=6],
 ['forge_original_group_identity',d=>d.inv.locations.find(z=>z.id==='L04-S017').id='L04-S099'],
 ['change_unrelated_SSC',d=>d.SSC.items.find(z=>z.id==='L-SSC-124').body+=' UNAUTHORIZED'],
 ['erase_field_component_in_SSC',d=>d.SSC.items.find(z=>z.id==='L-SSC-102').body=d.SSC.items.find(z=>z.id==='L-SSC-102').body.replace(eq41[5],'ERASED')],
 ['bad_source_census_parent',d=>d.SSC.predecessor.git_blob_sha='BAD'],
 ['bad_convergence_count',d=>d.reg.per_source.find(z=>z.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['false_CI_pass',d=>d.gate.new_source_CI.status='SUCCESS'],
 ['forge_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['import_W_semantics',d=>d.packet.explicit_limitations.W_semantics_imported=true],
 ['erase_source_noncompleteness',d=>d.packet.explicit_limitations.whole_17page_source_semantic_cold_complete=true]
];
let caught=0;
if(!errors.length){
 for(const [name,mut] of hostile){const z=structuredClone(D);mut(z);if(audit(z,originalPages,imageHash).length)caught++;else errors.push('HOSTILE_ESCAPED '+name);}
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.source-field-adjoint-17page-109block-audit.v0.1',PASS:errors.length===0,errors,original_frozen_pdf_sha_verified:sourceVerified,original_pages_layout_sha_rechecked:17,original_PDF_blocks_SHA_rechecked:109,source_first_109_block_crosswalk_verified:true,independent_exact_source_p8_visual_replay_verified:imageHash===p8VisualSHA,source_groups_repaired:['L04-S016','L04-S017'],existing_SSC_repaired:['L-SSC-102'],other_original_source_groups_unchanged:51,other_SSC_IDs_unchanged:190,remaining_L04_source_exact_selected_groups:9,hostiles_defined:hostile.length,hostiles_rejected:caught,whole_source_cold_completeness:false,G0_frozen:false,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;

