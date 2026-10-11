// L-only G0 exact original-source §2 complex/real Cartan–Weyl fidelity.
// The original author's printed ±2i and the independently derived ±2
// MUST remain distinct. This is G0 source fidelity, NOT a physics proof.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_SECTION2_CARTAN_COMPLEX_REAL_ROOT_SOURCE_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_4.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_70.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_71.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_23.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_24.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_40.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_41.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_124.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_125.json',
 self:E+'tools/verify-l-g0-l04-original-Cartan-root-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const B=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const originSHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const expected={
 COMPLEX:[
 '[J3,E_L^{vee/wedge}]=(±i) E_L^{vee/wedge}',
 '[K3,E_L^{vee/wedge}]=(∓1) E_L^{vee/wedge}',
 'E_L^{vee/wedge}=(1/2)(∓J1+iJ2±iK1+K2)',
 '[J3,E_R^{vee/wedge}]=(±i) E_R^{vee/wedge}',
 '[K3,E_R^{vee/wedge}]=(±1) E_R^{vee/wedge}',
 'E_R^{vee/wedge}=(1/2)(±J1−iJ2±iK1+K2)',
 '[E_L^vee,E_L^wedge]=−iJ3−K3',
 '[E_R^vee,E_R^wedge]=−iJ3+K3'
 ],
 H:[
 'H_L=−iJ3−K3; H_R=−iJ3+K3',
 '[H_L,E_L^{vee/wedge}]=±2i E_L^{vee/wedge} (printed)',
 '[E_L^vee,E_L^wedge]=H_L',
 '[H_R,E_R^{vee/wedge}]=±2i E_R^{vee/wedge} (printed)',
 '[E_R^vee,E_R^wedge]=H_R'
 ],
 REAL:[
 '[J3,E_±^R]=(+1) E_±^I',
 '[J3,E_±^I]=(−1) E_±^R',
 '[K3,E_±^R]=(±1) E_±^R',
 '[K3,E_±^I]=(±1) E_±^I',
 'E_±^R=(1/2)(±J1+K2)',
 'E_±^I=(1/2)(±J2−K1)',
 '[E_+^R,E_-^I]=[E_-^R,E_+^I]=−(1/2)J3',
 '[E_+^R,E_-^R]=[E_+^I,E_-^I]=+(1/2)K3'
 ]
};
const sourceLocs=[
 ['L04-P004-B006',17,29,'ed3f203b07c2d349376a83990125ea2223d5d3a426f97138ab393f855b917df8'],
 ['L04-P004-B007',31,35,'acdf390d62067927b57fdeb12587c71acd23f40047d8eef48ae5eb56f0393a4c'],
 ['L04-P004-B008',37,55,'80d9a5c40b20931e205ada7f0f5bfd605ed2d125d69af90ebdf4c744187bf46a']
];
const disposal='SCOPED_ORIGINAL_COMPLEX_REAL_CARTAN_ROOT_EXACT_VISUAL_RECONCILED_WHOLE_COLD_OPEN';
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function verify(z,actualSourcePage){
 const issues=[],t=(condition,message)=>{if(!condition)issues.push(message);};
 const {packet:s,manifest:m,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 t(s?.schema==='isograph.track-L.G0.L04-frozen-original-Cartan-Weyl-complex-real-root-operators.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'source-local G0-only authority');
 t(s?.frozen_original?.revision==='arXiv:2407.02497v2'&&s.frozen_original.PDF_SHA256===originSHA&&s.frozen_original.PDF_bytes===348134&&s.frozen_original.pages===17,'exact frozen original source bytes/revision');
 t(s?.original_visual_evidence?.run_id===38117619140&&s.original_visual_evidence.conclusion==='success'&&s.original_visual_evidence.page_4_original_PNG_SHA256==='77ab96bf89d97d29fa260572feb3340f45d67005e3e0e9286ec4bc794d31f23d','original independently rendered image CI provenance');
 t(m?.original_sources?.[3]?.id==='L04'&&m.original_sources[3].revision==='arXiv:2407.02497v2'&&m.original_sources[3].PDF_SHA256===originSHA,'preexisting frozen 6 source manifest pin');
 const page=m.original_sources[3].original_pdf_extracted_pages[3];
 const lines=actualSourcePage.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 t(hash(Buffer.from(actualSourcePage))===page.original_extracted_page_SHA256,'independently reextract original complete PDF page four SHA');
 t(eq(s?.original_source_text_blocks?.map(x=>[x.source_atom_id,...x.source_line_span,x.SHA256]),sourceLocs),'three original SHA-pinned source blocks and full spans');
 for(const [id,a,b,sha] of sourceLocs){
  const atom=page.blocks.find(x=>x.source_atom_id===id);
  t(atom?.original_source_block_SHA256===sha&&atom?.original_extracted_line_start===a&&atom?.original_extracted_line_end===b,'frozen original location '+id);
  t(hash(Buffer.from(lines.slice(a-1,b).join('\n')))===sha,'original source block re-extracted '+id);
 }
 const groups=s?.source_semantic_groups||[];
 t(eq(groups.map(x=>x.id),['L04-S009-COMPLEX','L04-S009-H','L04-S009-REAL']),'source-first exact three families partition not new SSC IDs');
 for(let k=0;k<3;k++){
  const g=groups[k],label=['COMPLEX','H','REAL'][k];
  t(g?.original_group==='L04-S009'&&g?.SSC_owner==='L-SSC-098','existing source/owner disposition '+label);
  t(eq(g?.source_asserted_formulas,expected[label]),'ORIGINAL VISUAL formula coefficient/order/indices/coupled sign '+label);
  t(eq(g?.source_first_locators,['L04-P004-B00'+(k+6)]),'original three block source-first locators '+label);
 }
 const discrepancy=s?.source_internal_discrepancy||{};
 t(discrepancy.status==='PRESERVE_AUTHOR_ASSERTION_AND_INDEPENDENT_ALGEBRAIC_OBSERVATION_SEPARATELY'&&discrepancy.author_printed_claim.includes('±2i')&&discrepancy.independent_source_internal_calculation.includes('2s E_L^s')&&discrepancy.independent_source_internal_calculation.includes('2s E_R^s')&&discrepancy.source_value_repaired===false&&discrepancy.author_typos_or_physical_validity_adjudicated===false,'do not silently correct source internal ±2i vs ±2 inconsistency');
 t(s?.repair_diagnosis?.class==='ORIGINAL_SOURCE_OPERATOR_COEFFICIENT_SIGN_AND_PAIRED_BINDER_UNDERINDEXED_IN_EXISTING_SSC_SUMMARY'&&s.repair_diagnosis.affected_existing_ssc_id==='L-SSC-098','cause-oriented recovery not duplicate source identity');
 t(s?.conservation?.unchanged_whole_existing_SSC_records===190&&s?.conservation?.new_typed_SSC_ids===0&&s?.conservation?.selected_exact_L04_debt_previous===12&&s?.conservation?.selected_exact_L04_debt_now===11,'finite milestone scope and unchanged other records');
 t(s?.stage_locks?.G0_frozen===false&&s.stage_locks.G1_authorized===false&&s.stage_locks.W_semantics_imported===false&&s.stage_locks.whole_L04_source_semantic_cold_pass===false,'no stage or cross-author leakage');
 t(oi?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'original source group and SSC finite cardinalities');
 let modifiedGroups=[];
 for(let k=0;k<53;k++){
  t(oi.locations[k].id===i.locations[k].id,'conserved source group identity '+k);
  if(!eq(oi.locations[k],i.locations[k]))modifiedGroups.push(i.locations[k].id);
 }
 t(eq(modifiedGroups,['L04-S009']),'no other original 52 source groups touched');
 const loc=i.locations.find(x=>x.id==='L04-S009');
 t(loc?.disposition===disposal&&eq(loc?.ssc_ids,['L-SSC-098'])&&loc?.original_Cartan_source_evidence?.git_blob_sha===B.packet&&loc.original_Cartan_source_evidence.whole_L04_cold_complete===false,'repaired original S009 source role scoped not cold pass');
 const derived={};let ids=new Set();
 for(const loc of i.locations){derived[loc.disposition]=(derived[loc.disposition]||0)+1;for(const id of loc.ssc_ids)ids.add(id);}
 t(Object.keys(derived).length===Object.keys(i.counts.by_disposition).length&&Object.entries(derived).every(([k,v])=>i.counts.by_disposition[k]===v)&&i.counts.by_disposition.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===11&&i.counts.by_disposition[disposal]===1,'mechanically derived disposition counts');
 t(i.counts.remaining_exact_source_groups===11&&i.counts.independent_full_cold_complete_sources===0&&i.G0_frozen===false&&i.G1_authorized===false,'11 source exact groups remain and no G0 freeze');
 t(eq([...ids].sort(),oi.reverse.L04_ssc_ids.slice().sort())&&ids.size===34,'bidirectional L04 53→34 SSC identity coverage conserved');
 t(i.original_section2_Cartan_source_reconciliation?.git_blob_sha===B.packet&&i.original_section2_Cartan_source_reconciliation?.prior_inv_sha===B.oldInv,'exact corresponding source evidence pin');
 let modified=[];
 for(let k=0;k<191;k++){
  t(o.items[k].id===n.items[k].id,'exact old SSC identity '+k);
  if(!eq(o.items[k],n.items[k]))modified.push(n.items[k].id);
 }
 t(eq(modified,['L-SSC-098']),'190 entire prior SSC records byte-equivalent canonical JSON');
 const item=n.items.find(x=>x.id==='L-SSC-098');
 for(const needle of ['H_L=−iJ3−K3','[H_L,E_L^{vee/wedge}]=±2i','E_±^R=(1/2)(±J1+K2)','[E_+^R,E_-^I]','±2i','±2','source-internal'])t(item.body.includes(needle),'source original SSC literal and discrepancy '+needle);
 t(item?.source_expression_census?.L04_ORIGINAL_COMPLEX_REAL_CARTAN_ROOT_SOURCE_0_1?.source_packet?.git_blob_sha===B.packet&&item.source_expression_census.L04_ORIGINAL_COMPLEX_REAL_CARTAN_ROOT_SOURCE_0_1.source_first_inverse.git_blob_sha===B.inv,'source→SSC explicit in-record evidence pointer');
 t(n?.predecessor?.git_blob_sha===B.oldSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv&&n.item_count===191,'SSC parent and original packet pin');
 t(n?.guards?.source_census_freeze_complete===false&&n.guards.whole_L_source_cold_audit_complete===false,'current SSC remains prefreeze');
 t(r?.source_first_predecessor?.git_blob_sha===B.oldReg&&r?.current_ssc?.git_blob_sha===B.SSC&&r?.per_source?.length===6&&r.per_source.reduce((a,b)=>a+b.source_first_location_units,0)===350,'frozen six original group count and SSC pinned');
 t(r.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified===11&&r.per_source.every(x=>x.original_complete_cold_review_passed===false),'11 selected L04 exact groups; 0 six whole-source cold passes');
 t(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r.exit_acceptance_contract.G1_authorized===false&&r.explicit_locks.G0_frozen===false,'global G0 stage never promoted');
 t(v?.predecessor_exact?.git_blob_sha===B.oldTr&&v?.current_census?.git_blob_sha===B.SSC&&v?.current_L04_source_first_inventory?.git_blob_sha===B.inv&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===B.reg&&v.complete_sources===0,'current traversal ancestry and G0 open');
 t(g?.predecessor_gate?.git_blob_sha===B.oldGate&&g?.current_source_census?.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.root_source_packet.git_blob_sha===B.packet&&g.root_source_verifier.git_blob_sha===B.self,'stage gate pins exact ancestry/source/verifier');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new test pending, no false success or merge');
 return issues;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l04-cartang0-'));let actualSourcePage='',verifiedBinary=false;
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('HISTORICAL_SOURCE_HTTP_'+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length!==348134||hash(bytes)!==originSHA)throw Error('WRONG_ORIGINAL_HISTORICAL_L04_BYTES');
 verifiedBinary=true;
 const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_17_PAGE_SOURCE');
 actualSourcePage=execFileSync('pdftotext',['-f','4','-l','4','-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1200000});
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=verify(D,actualSourcePage);
const hostile=[
 ['complex_left_K_sign',d=>d.packet.source_semantic_groups[0].source_asserted_formulas[1]='[K3,E_L]=±1 E_L'],
 ['complex_right_K_sign',d=>d.packet.source_semantic_groups[0].source_asserted_formulas[4]='[K3,E_R]=∓1 E_R'],
 ['complex_left_raising_coeff',d=>d.packet.source_semantic_groups[0].source_asserted_formulas[2]=d.packet.source_semantic_groups[0].source_asserted_formulas[2].replace('iK1','−iK1')],
 ['complex_right_raising_coeff',d=>d.packet.source_semantic_groups[0].source_asserted_formulas[5]=d.packet.source_semantic_groups[0].source_asserted_formulas[5].replace('−iJ2','+iJ2')],
 ['complex_L_root_product_sign',d=>d.packet.source_semantic_groups[0].source_asserted_formulas[6]='[E_L^vee,E_L^wedge]=+iJ3−K3'],
 ['complex_R_root_product_sign',d=>d.packet.source_semantic_groups[0].source_asserted_formulas[7]='[E_R^vee,E_R^wedge]=+iJ3+K3'],
 ['Cartan_H_left_minus',d=>d.packet.source_semantic_groups[1].source_asserted_formulas[0]='H_L=−iJ3+K3; H_R=−iJ3−K3'],
 ['silently_correct_printed_2i_to_2',d=>d.packet.source_semantic_groups[1].source_asserted_formulas[1]=d.packet.source_semantic_groups[1].source_asserted_formulas[1].replace('±2i','±2')],
 ['erase_source_internal_discrepancy',d=>d.packet.source_internal_discrepancy.source_value_repaired=true],
 ['claim_author_typo',d=>d.packet.source_internal_discrepancy.author_typos_or_physical_validity_adjudicated=true],
 ['real_J_action_R_wrong',d=>d.packet.source_semantic_groups[2].source_asserted_formulas[0]='[J3,E_R]=−E_I'],
 ['real_J_action_I_wrong',d=>d.packet.source_semantic_groups[2].source_asserted_formulas[1]='[J3,E_I]=+E_R'],
 ['real_K_paired_sign',d=>d.packet.source_semantic_groups[2].source_asserted_formulas[2]='[K3,E_±^R]=(∓1) E_±^R'],
 ['real_I_generator_K_sign',d=>d.packet.source_semantic_groups[2].source_asserted_formulas[5]='E_±^I=(1/2)(±J2+K1)'],
 ['real_R_generator_half',d=>d.packet.source_semantic_groups[2].source_asserted_formulas[4]='E_±^R=(1/4)(±J1+K2)'],
 ['real_cross_root_J_coeff',d=>d.packet.source_semantic_groups[2].source_asserted_formulas[6]='[E_R,E_I]=−J3'],
 ['real_cross_root_K_sign',d=>d.packet.source_semantic_groups[2].source_asserted_formulas[7]='[E_R,E_R]=−(1/2)K3'],
 ['change_frozen_revision',d=>d.packet.frozen_original.revision='arXiv:2407.02497v1'],
 ['change_original_source_bytes',d=>d.packet.original_source_text_blocks[2].SHA256='WRONG'],
 ['change_original_page_sha',d=>d.packet.original_visual_evidence.page_4_original_PNG_SHA256='WRONG'],
 ['remove_existing_owner',d=>d.inv.locations.find(x=>x.id==='L04-S009').ssc_ids=[]],
 ['forge_full_source_cold',d=>d.inv.counts.independent_full_cold_complete_sources=6],
 ['forge_G0',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['forge_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['import_W_semantics',d=>d.packet.stage_locks.W_semantics_imported=true],
 ['alter_unrelated_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-119').body+=' UNAUTHORIZED'],
 ['alter_other_original_group',d=>d.inv.locations.find(x=>x.id==='L04-S008').original_source_semantic_group+=' UNAUTHORIZED'],
 ['unpin_SSC_parent',d=>d.SSC.predecessor.git_blob_sha='WRONG'],
 ['forge_convergence_coverage',d=>d.reg.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['false_CI_success',d=>d.gate.new_source_CI.status='SUCCESS']
];
let rejected=0;
if(issues.length===0){
 for(const [name,change]of hostile){const mut=structuredClone(D);change(mut);if(verify(mut,actualSourcePage).length)rejected++;else issues.push('HOSTILE_ESCAPE '+name);}
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-complex-real-Cartan-Weyl-source-0.1',PASS:issues.length===0,issues,frozen_original_SHA256_verified:verifiedBinary,original_page_4_and_three_block_SHA_verified:issues.length===0,semantic_source_groups_repaired:['L04-S009'],existing_SSC_items_repaired:['L-SSC-098'],unchanged_original_L04_groups:52,unchanged_L_SSC_items:190,exact_selected_L04_source_groups_remaining:11,hostiles_defined:hostile.length,hostiles_rejected:rejected,full_original_source_cold_qualification:false,G0_frozen:false,G1_authorized:false},null,2));
if(issues.length)process.exitCode=1;
