// IsoGraph L-only G0: original PDF p12/p15, source modality and 48-element commuting-C triality.
// v0.2: first CI 38190554058 failed p12 over-specific substring group despite original PDF/page/block SHA and finite baseline passing; 0/34 hostiles were attempted.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {auditTriality48} from './verify-l04-commuting-C-48-finite-model-0-1.mjs';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={packet:P+'LISI_L04_ORIGINAL_P12_COMMUTING_C_TRIALITY_ALTERNATIVE_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldS:P+'SOURCE_SEMANTIC_CENSUS_0_90.json',S:P+'SOURCE_SEMANTIC_CENSUS_0_91.json',
 oldI:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_23.json',I:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_24.json',
 R:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_46.json',
 T:P+'SOURCE_TRAVERSAL_LEDGER_0_63.json',G:E+'L_CURRENT_STAGE_GATE_0_170.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),D=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,read(v)]));
const blobs=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,execFileSync('git',['hash-object',v],{encoding:'utf8'}).trim()]));
const digest=x=>crypto.createHash('sha256').update(x).digest('hex'),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const changed=(a,b)=>a.filter((x,i)=>!eq(x,b[i])).map(x=>x.id);
function check(d,pages){
 const {packet:p,manifest:m,oldS,s,oldI,I,R,T,G}= {
  packet:d.packet,manifest:d.manifest,oldS:d.oldS,s:d.S,oldI:d.oldI,I:d.I,R:d.R,T:d.T,G:d.G};
 const issues=[],need=(v,desc)=>{if(!v)issues.push(desc)};
 const source=m.original_sources?.find(x=>x.id==='L04'),f=p.frozen_source;
 need(p.schema==='isograph.track-L.G0.L04-original-section6-tprime-source-modalities.v0.1'&&p.track==='L'&&p.stage==='G0'&&!p.semantic_authority,'source-only G0 candidate');
 need(source.PDF_SHA256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422'&&source.PDF_SHA256===f.PDF_SHA256&&f.PDF_bytes===348134&&f.PDF_pages===17,'exact source binary and revision');
 need(f.revision==='arXiv:2407.02497v2'&&eq(f.source_atoms?.map(x=>x.source_atom_id),['L04-P012-B001','L04-P012-B002','L04-P015-B002']),'original identity and three source atoms');
 for(const a of f.source_atoms??[]){
  const pg=source.original_pdf_extracted_pages.find(v=>v.PDF_page_zero_based===a.PDF_page_zero_based);
  const atom=pg?.blocks.find(x=>x.source_atom_id===a.source_atom_id),raw=pages.get(a.PDF_page_zero_based);
  need(pg?.original_extracted_page_SHA256===a.original_page_sha256&&atom?.original_source_block_SHA256===a.original_block_sha256&&eq(a.extracted_lines,[atom?.original_extracted_line_start,atom?.original_extracted_line_end]),'frozen original source SHA/line '+a.source_atom_id);
  need(typeof raw==='string'&&digest(Buffer.from(raw))===a.original_page_sha256,'fresh full source page SHA '+a.source_atom_id);
  if(atom&&typeof raw==='string'){
   const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
   need(digest(Buffer.from(lines.slice(atom.original_extracted_line_start-1,atom.original_extracted_line_end).join('\n')) )===a.original_block_sha256,'fresh source block SHA '+a.source_atom_id);
  }
 }
 const p12=(pages.get(11)||'').replace(/\s+/g,' ').toLowerCase(),p15=(pages.get(14)||'').replace(/\s+/g,' ').toLowerCase();
 need(p12.includes('triality')&&p12.includes('standard model')&&p12.includes('commute'),'original p12 SHA-locked narrative locator: full-page and source-block SHA checks are the exact text oracle');
 need(p15.includes('direct product')&&p15.includes('24-cell')&&p15.includes('a4'),'original p15 alternative/role retained');
 const a=p.source_groups?.[0],b=p.source_groups?.[1];
 need(p.source_groups?.length===2&&a?.id==='L04-S028'&&b?.id==='L04-S029','two original first groups');
 need(a?.source_roles?.length===9&&b?.source_roles?.length===8,'17 uncollapsed author source roles');
 need(eq(a?.ssc,['L-SSC-014','L-SSC-108','L-SSC-109'])&&eq(b?.ssc,['L-SSC-097','L-SSC-109','L-SSC-110','L-SSC-111','L-SSC-124']),'exact reciprocal existing source-SSC owners');
 need(p.source_groups?.every(g=>Array.isArray(g.source_roles)&&g.source_roles.every(u=>typeof u.meaning==='string'&&g.ssc.includes(u.owner)&&typeof u.modality==='string')),'all source role owners and modalities');
 const find=(g,id)=>g?.source_roles?.find(x=>x.id===id);
 need(find(a,'tprime_tilde_rep')?.modality==='AUTHOR_REPRESENTATION_RELATION_NOT_UNSCOPED_EQUALITY'&&find(a,'tprime_tilde_rep')?.meaning.includes('∼'),'p12 original tilde is source-author representation, not equality');
 need(find(a,'tprime_order_three')?.meaning.includes('t′³=1')&&find(a,'basis_adjoint_cycle')?.modality==='AUTHOR_SOURCE_ADJOINT_ACTION','source order and adjoint versus literal group element');
 need(find(a,'direct_48')?.meaning.includes('2T×Z2')&&find(a,'direct_48')?.meaning.includes('order48')&&find(a,'sound_nonunique')?.modality==='AUTHOR_ACCEPTED_MATH_NOT_UNIQUE','author 48 valid but nonunique');
 need(find(b,'not_expected_C_commutation')?.modality==='AUTHOR_MODEL_SELECTION_EXPECTATION'&&find(b,'selected_t_commutes_CPT')?.modality==='AUTHOR_DESIGN_CONSTRAINT_NOT_UNIVERSAL_THEOREM','author preference cannot become theorem');
 need(find(b,'change_representatives')?.modality==='AUTHOR_CONSTRUCTION_STRATEGY'&&find(b,'translate_biquaternion')?.modality==='SOURCE_NEXT_STEP_NOT_COMPLETION','original response and next source semantics');
 need(find(b,'physical_proposal')?.modality==='AUTHOR_MODEL_PREFERENCE_NOT_EMPIRICAL_VALIDATION','avoid physical-theorem promotion');
 need(p.scope_separation?.p12_commuting_C_48.includes('order48')&&p.scope_separation?.p13_selected_96.includes('order96')&&p.scope_separation?.p15_trivial_direct_product.includes('order192')&&p.scope_separation?.p15_192_fermion_weights.includes('not a group-order'),'three groups and 192 weights separated');
 const e=p.exact_finite_model?.expected,model=auditTriality48(p.exact_finite_model?.selected_tprime_doubled);
 need(eq(p.exact_finite_model?.selected_tprime_doubled,[-1,-1,-1,-1])&&eq(p.exact_finite_model?.positive_companion_doubled,[1,1,1,1]),'precise signed source representative; p15 distinct');
 need(model.source_quaternion_basis_e1e2_e3&&model.source_ei_squares_negative&&model.tprime_cube_positive_one&&!model.tprime_cube_negative_one,'exact Hurwitz algebra and source tprime cube');
 need(model.positive_half_companion_cube_negative_one&&eq(model.source_adjoint_three_cycle,[true,true,true])&&model.q8_normal_under_tprime,'source p12 minus versus p15 plus; ad action; subgroup normality');
 need(e?.tprime_order===3&&e?.positive_companion_cube==='−1'&&model.PT_Q8_order===e?.PT_Q8_order&&model.PTtprime_binary_tetrahedral_order===e?.PTtprime_binary_tetrahedral_order,'source 3/8/24 algebra cardinalities');
 need(eq(e?.adjoint_cycles,['e1→e2','e2→e3','e3→e1']),'source-asserted ordered adjoint cycle preserved');
 
 need(model.independent_split_complex_C_commutes_with_tprime===e?.C_commutes_with_tprime&&model.CPTtprime_direct_product_order===e?.CPTtprime_direct_product_order&&model.center_order===e?.center_order,'original C commute and group48 center4');
 need(eq(model.group_element_order_histogram,e?.group_element_order_histogram),'48 member group order histogram exact');
 need(p.exact_finite_model.interpretation.includes('not full physics')||p.exact_finite_model.interpretation.includes('not full physics'), 'finite model nonpromotion');
 need(s.items.length===191&&s.item_count===191&&I.locations.length===53&&eq(changed(s.items,oldS.items),['L-SSC-109','L-SSC-110'])&&eq(changed(I.locations,oldI.locations),['L04-S028','L04-S029']),'189 full SSC and 51 L04 records unchanged');
 need(eq(I.locations.find(x=>x.id==='L04-S028')?.ssc_ids,a?.ssc)&&eq(I.locations.find(x=>x.id==='L04-S029')?.ssc_ids,b?.ssc)&&new Set(I.locations.flatMap(x=>x.ssc_ids)).size===34,'source inverse bidirectional owners');
 need(I.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===8&&Object.values(I.counts.by_disposition).reduce((n,x)=>n+x,0)===53,'eight open group 53 denominator');
 need(s.items.find(x=>x.id==='L-SSC-109')?.body.includes('t′ ∼')&&s.items.find(x=>x.id==='L-SSC-109')?.body.includes('NON-UNIQUE'),'current SSC correct author exact tilde and nonunique scope');
 need(oldS.items.find(x=>x.id==='L-SSC-109')?.body.includes("using t'=-1/2")&&oldS.items.find(x=>x.id==='L-SSC-110')?.body.includes('it therefore requires'),'frozen historical source defects remain visible');
 need(s.items.find(x=>x.id==='L-SSC-110')?.body.includes('not expected')&&s.items.find(x=>x.id==='L-SSC-110')?.body.includes('preference'),'current SSC no manufactured physical necessity');
 need(p.predecessor?.source_census?.git_blob_sha===blobs.oldS&&p.predecessor?.inverse?.git_blob_sha===blobs.oldI&&p.predecessor?.gate?.git_blob_sha==='988fd758480aeb420d95596452a15abaf958be0a','previous paper and ledger frozen sha');
 need(s.predecessor.git_blob_sha===blobs.oldS&&s.revision.source_packet.git_blob_sha===blobs.packet&&s.revision.source_first_inverse.git_blob_sha===blobs.I&&I.current_p12_48_triality_scope.source_packet.git_blob_sha===blobs.packet,'new SSC inverse packet exact SHA pointers');
 need(R.current_ssc.git_blob_sha===blobs.S&&R.per_source.find(x=>x.source==='L04').audit_git_blob_sha===blobs.I&&R.per_source.reduce((v,x)=>v+x.source_first_location_units,0)===350&&R.per_source.every(x=>!x.original_complete_cold_review_passed),'six-paper convergence current SHA');
 need(T.current_census.git_blob_sha===blobs.S&&T.current_L04_source_first_inventory.git_blob_sha===blobs.I&&T.current_G0_six_original_finite_convergence.git_blob_sha===blobs.R&&T.complete_sources===0,'traversal SHA and cold incomplete');
 need(G.current_source_census.git_blob_sha===blobs.S&&G.current_L04_source_first.git_blob_sha===blobs.I&&G.current_convergence.git_blob_sha===blobs.R&&G.current_traversal.git_blob_sha===blobs.T,'gate exact dependency SHAs');
 need(G.predecessor_gate.prior_scoped_CI_success===38188484102&&G.new_source_CI.run_id===null,'prior successful CI preserved and new not faked');
 need(!G.current_lawful_state.G0_frozen&&!G.current_lawful_state.G1_authorized&&!G.current_lawful_state.W_semantics_imported&&!G.current_lawful_state.cross_track_synthesis_authorized&&!G.current_lawful_state.PR70_merge_authorized,'hard stage and track firewalls');
 need(p.locks.G0_frozen===false&&p.locks.G1_authorized===false&&p.locks.whole_original_source_semantic_cold_passes===0,'packet stage bounds');
 return issues;
}
const work=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l04-tprime-original-'));const pages=new Map();let originalBinaryVerified=false;
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(60000)});
 if(!response.ok)throw Error('frozen original HTTP '+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length!==348134||digest(bytes)!==D.packet.frozen_source.PDF_SHA256)throw Error('FROZEN_ORIGINAL_BINARY_SHA_MISMATCH');
 originalBinaryVerified=true;
 const file=path.join(work,'l04-v2.pdf');fs.writeFileSync(file,bytes);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000})))throw Error('frozen original page-count mismatch');
 for(const i of [11,14])pages.set(i,execFileSync('pdftotext',['-f',String(i+1),'-l',String(i+1),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000}));
}finally{fs.rmSync(work,{recursive:true,force:true})}
const failures=check(D,pages);
const mutants=[
 ['change_original_binary',d=>d.packet.frozen_source.PDF_SHA256='BAD'],
 ['change_page12_sha',d=>d.packet.frozen_source.source_atoms[1].original_page_sha256='BAD'],
 ['change_p12_atom_sha',d=>d.packet.frozen_source.source_atoms[1].original_block_sha256='BAD'],
 ['change_p15_atom_sha',d=>d.packet.frozen_source.source_atoms[2].original_block_sha256='BAD'],
 ['forget_source_S029',d=>d.packet.source_groups.pop()],
 ['forget_triality_adjoint_role',d=>d.packet.source_groups[0].source_roles.splice(4,1)],
 ['restore_tprime_unscoped_equality',d=>d.packet.source_groups[0].source_roles.find(x=>x.id==='tprime_tilde_rep').modality='LITERAL_EQUALITY'],
 ['change_tprime_rep_sign',d=>d.packet.exact_finite_model.selected_tprime_doubled=[1,1,1,1]],
 ['misstate_tprime_order',d=>d.packet.exact_finite_model.expected.tprime_order=6],
 ['misstate_adjoint_cycle',d=>d.packet.exact_finite_model.expected.adjoint_cycles=['e1→e3']],
 ['change_Q8_order',d=>d.packet.exact_finite_model.expected.PT_Q8_order=16],
 ['change_2T_order',d=>d.packet.exact_finite_model.expected.PTtprime_binary_tetrahedral_order=12],
 ['change_C_commutation',d=>d.packet.exact_finite_model.expected.C_commutes_with_tprime=false],
 ['change_total_order_48',d=>d.packet.exact_finite_model.expected.CPTtprime_direct_product_order=96],
 ['change_center',d=>d.packet.exact_finite_model.expected.center_order=2],
 ['tamper_order_histogram',d=>d.packet.exact_finite_model.expected.group_element_order_histogram['3']=7],
 ['group192_as_48',d=>d.packet.scope_separation.p15_trivial_direct_product='same as group48'],
 ['promote_source_necessity',d=>d.packet.source_groups[1].source_roles.find(x=>x.id==='not_expected_C_commutation').modality='MATHEMATICAL_NECESSITY'],
 ['promote_physical_validation',d=>d.packet.source_groups[1].source_roles.find(x=>x.id==='physical_proposal').modality='EMPIRICAL_PROOF'],
 ['mutate_wrong_original_SSC',d=>d.oldS.items.find(x=>x.id==='L-SSC-109').body='retroactive'],
 ['mutate_unrelated_SSC',d=>d.S.items.find(x=>x.id==='L-SSC-119').body+='UNAUTHORIZED'],
 ['mutate_unrelated_L04',d=>d.I.locations.find(x=>x.id==='L04-S030').disposition='UNAUTHORIZED'],
 ['erase_new_S028_owner',d=>d.I.locations.find(x=>x.id==='L04-S028').ssc_ids.pop()],
 ['erase_new_S029_owner',d=>d.I.locations.find(x=>x.id==='L04-S029').ssc_ids.pop()],
 ['remove_corrected_SSC_tilde',d=>d.S.items.find(x=>x.id==='L-SSC-109').body='tprime equals'],
 ['remove_SSC_modal_qualifier',d=>d.S.items.find(x=>x.id==='L-SSC-110').body='C commutation logically impossible'],
 ['false_eight_open',d=>d.I.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
 ['fake_new_original_CI',d=>d.G.new_source_CI.run_id=123],
 ['erase_prior_scoped_CI',d=>d.G.predecessor_gate.prior_scoped_CI_success=0],
 ['break_current_exact_SHA',d=>d.G.current_traversal.git_blob_sha='BAD'],
 ['premature_G0_freeze',d=>d.G.current_lawful_state.G0_frozen=true],
 ['premature_G1',d=>d.G.current_lawful_state.G1_authorized=true],
 ['import_W_semantics',d=>d.G.current_lawful_state.W_semantics_imported=true],
 ['premature_PR_merge',d=>d.G.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;
if(!failures.length)for(const [name,mutate]of mutants){const d=structuredClone(D);try{mutate(d);if(check(d,pages).length)rejected++;else failures.push('HOSTILE_ESCAPE_'+name)}catch(e){failures.push('HOSTILE_CHECK_EXCEPTION_'+name+':'+String(e))}}
const result={schema:'isograph.exp062.L.G0.original-L04-tprime-48.v0.2',PASS:failures.length===0,failures,original_pdf_binary_SHA256_verified:originalBinaryVerified,original_pages_SHA256_checked:pages.size,source_groups:2,source_roles:17,SSC_count:191,original_source_groups_total:350,original_source_groups_remaining_broad_mapped:8,Q8:auditTriality48().PT_Q8_order,binary_tetrahedral:auditTriality48().PTtprime_binary_tetrahedral_order,commuting_C_extension:auditTriality48().CPTtprime_direct_product_order,hostiles_defined:mutants.length,hostiles_rejected:rejected,full_source_cold_passes:0,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false};
console.log(JSON.stringify(result,null,2));if(failures.length)process.exitCode=1;
