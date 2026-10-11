// L-only G0 original L04v2 §1 Clifford adjoint, reflection and unitary PTU.
// This verifier does not qualify physics or G0 whole-source completeness.
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={packet:P+'LISI_L04_ORIGINAL_SECTION1_CLIFFORD_ADJOINT_REFLECTION_PTU_SOURCE_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_5.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_72.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_73.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_25.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_26.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_42.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_43.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_127.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_128.json',
 self:E+'tools/verify-l-g0-l04-original-section1-Clifford-PTU-0-1.mjs'};
const j=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,j(p)]));
const frozenSHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const original12=[
 'Psi(x) -> U Psi(x_prime); A(x) -> U A(x_prime) U^{-} (source Clifford group spinor/vector actions)',
 'U_theta=exp[-(gamma gamma0 gamma1 theta)/2]=cos(theta/2)-gamma gamma0 gamma1 sin(theta/2)',
 'U_zeta=exp[-(gamma0 gamma2 zeta)/2]=cosh(zeta/2)-gamma0 gamma2 sinh(zeta/2)',
 'gamma_pseudoscalar=gamma0 gamma1 gamma2 gamma3',
 'A_prime=R_u A=(u gamma) A (u gamma)^{-} (original Clifford adjoint reflective action)',
 'Psi_prime=R_u Psi=(u gamma) Psi (original Clifford reflective spinor action)',
 'U_T_unitary_prime=gamma0 gamma=gamma1 gamma2 gamma3',
 'U_P_prime=-gamma1 gamma2 gamma3 gamma=gamma0',
 'U_PT_prime=gamma (joint Clifford parity/time reflection)',
 'P T_U=-T_U P (unitary Clifford reflection anticommutation)',
 'P and T_U original eight-element finite subgroup PT_U < Pin(1,3)',
 'Spin(1,3)=Spin+(1,3) semidirect {1,P T_U} (author original subgroup assertion)'
 ];
const blocks=[
 ['L04-P002-B004',25,36,'124f212b6f4c9d8bf78225b4befe5c51907d640a19b4c45df182c217c60221ab'],
 ['L04-P002-B005',38,41,'3fe094d567175aa9698c77ba9b3b2de8d3deccd45b7579149912fb3e179d94d1'],
 ['L04-P002-B006',43,43,'61e04c7d8dec48949cbfc5e913a2e3bb2f6ed457db9dbddfc274e747e71f6b6c'],
 ['L04-P003-B001',1,34,'599069870dfbe88de38891eb84e32d38aed9ca92ca66a0cee397c2cb98c15f5f']
 ];
const images={2:'e8c1479d4ddb702edfa57a16533db754b61f294f1c82e241d397a4d2b3f19f4b',3:'c55915351f3882ed35563390fb1ea234c98223f735b27cac05e4cb7fcc3b8409'};
const dispo='SCOPED_ORIGINAL_CLIFFORD_ADJOINT_REFLECTION_PTU_GENERATOR_EXACT_VISUAL_RECONCILED_WHOLE_COLD_OPEN';
const verify=(d,pages,imageSHAs)=>{
 const errors=[],ok=(v,msg)=>{if(!v)errors.push(msg);};
 const {packet:p,manifest:m,oldInv:old,inv:i,oldSSC:o,SSC:n,oldReg:prior,reg:r,oldTr:pt,tr:t,oldGate:og,gate:g}=d;
 ok(p?.schema==='isograph.track-L.G0.L04-frozen-original-Clifford-adjoint-reflection-PTU.v0.1'&&p?.track==='L'&&p?.stage==='G0'&&p.source_semantic_authority===false,'frozen original L-only source not authority');
 ok(p?.original?.revision==='arXiv:2407.02497v2'&&p.original.SHA256===frozenSHA&&p.original.PDF_bytes===348134&&p.original.PDF_pages===17,'exact original revision and historical byte pin');
 ok(m?.original_sources?.[3]?.id==='L04'&&m.original_sources[3].PDF_SHA256===frozenSHA,'frozen six original source manifest');
 const original=m.original_sources[3];
 ok(p?.visual_source_CI?.run_id===38120301520&&p.visual_source_CI.job_id===114413453042&&p.visual_source_CI.conclusion==='success'&&p.visual_source_CI.whole_PDF_semantic_cold_pass===false,'historically successful original all17 visual no cold claim');
 for(let pg of [2,3]){
  const src=original.original_pdf_extracted_pages[pg-1];
  ok(sha(Buffer.from(pages[pg]||''))===src.original_extracted_page_SHA256&&p.original.original_layout_page_SHA256[pg]===src.original_extracted_page_SHA256,'source original PDF page layout SHA '+pg);
  ok(p.visual_source_CI.pages_SHA256[pg]===images[pg]&&imageSHAs[pg]===images[pg],'independent original rendered visual p'+pg+' SHA');
 }
 ok(eq(p?.source_printed_semantics,original12)&&p.source_unit==='L04-S003'&&p.existing_SSC_owner==='L-SSC-094','12 original source signed Clifford/PTU expressions');
 ok(eq(p?.original_source_blocks?.map(x=>[x.source_atom_id,...x.original_extracted_line_span,x.source_block_SHA256]),blocks),'four full original source blocks p2/p3 exact spans and sha');
 for(const [id,a,b,hash]of blocks){
  const pn=Number(id.slice(5,8)),block=original.original_pdf_extracted_pages[pn-1].blocks.find(x=>x.source_atom_id===id);
  const raw=pages[pn].replace(/\f+$/g,'').split('\n').slice(a-1,b).join('\n');
  ok(block?.original_source_block_SHA256===hash&&block.original_extracted_line_start===a&&block.original_extracted_line_end===b&&sha(Buffer.from(raw))===hash,'original re-extracted source block '+id);
 }
 ok(p?.scope_guard?.do_not_absorb_adjacent_source_group_roles?.length===4&&p.scope_guard.whole_original_G0_cold_complete===false&&p.scope_guard.source_math_claims_proven===false,'separation S002/S004/S005/S006 source scopes and no theorem');
 ok(p?.failure_mechanism?.class==='GENERIC_CLIFFORD_ADJOINT_REFLECTION_SUMMARY_MISSES_AUTHOR_ORIGINAL_SIGNS_COEFFICIENTS_AND_DISTINCT_GROUP_CARRIERS','cause class grammar-specific extraction defect');
 ok(p?.conservation?.old_exact_source_L04_groups===9&&p.conservation.new_exact_source_L04_groups===8&&p.conservation.unchanged_original_L04_groups===52&&p.conservation.unchanged_entire_SSC_records===190&&p.conservation.new_typed_SSC_records===0,'exact source structural conservation');
 ok(p?.stage_locks?.G0_frozen===false&&p.stage_locks.G1_authorized===false&&p.stage_locks.W_semantics_imported===false,'source stage isolation');
 ok(old?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'finite stable original source and SSC denominators');
 let changedLoc=[],ids=new Set();
 for(let k=0;k<53;k++){
  const a=old.locations[k],b=i.locations[k];
  ok(a?.id===b?.id,'original identity stable row '+k);
  if(!a||!b)continue;
  if(!eq(a,b))changedLoc.push(b.id);
  for(const id of b.ssc_ids||[])ids.add(id);
 }
 ok(eq(changedLoc,['L04-S003'])&&ids.size===34&&eq([...ids].sort(),old.reverse.L04_ssc_ids.slice().sort()),'52 original group identities and 34 owner references unchanged');
 const locus=i.locations.find(z=>z.id==='L04-S003');
 ok(locus?.disposition===dispo&&eq(locus.ssc_ids,['L-SSC-094'])&&locus.original_Clifford_PTU_source_evidence?.git_blob_sha===H.packet&&locus.original_Clifford_PTU_source_evidence?.full_L04_original_cold_complete===false,'repaired S003 source-to-SSC pointer exact');
 const counts={};for(const z of i.locations)counts[z.disposition]=(counts[z.disposition]||0)+1;
 ok(Object.keys(counts).length===Object.keys(i.counts.by_disposition).length&&Object.entries(counts).every(([k,v])=>i.counts.by_disposition[k]===v)&&counts.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===8&&counts[dispo]===1,'finite inverse source disposition recount');
 ok(i.counts.remaining_exact_source_groups===8&&i.G0_frozen===false&&i.G1_authorized===false&&i.counts.complete_original_cold_sources===0,'8 selected exact source groups and cold 0');
 let changedSSC=[];for(let k=0;k<191;k++){
  const x=o.items[k],y=n.items[k];
  ok(x?.id===y?.id,'SSC stable identity '+k);
  if(!x||!y)continue;
  if(!eq(x,y))changedSSC.push(y.id);
 }
 ok(eq(changedSSC,['L-SSC-094']),'190 complete SSC records preserved');
 const owner=n.items.find(x=>x.id==='L-SSC-094');
 for(const f of original12)ok(owner?.body?.includes(f),'SSC exact original source expression '+f.slice(0,70));
 const ptr=owner?.source_expression_census?.L04_ORIGINAL_SECTION1_CLIFFORD_REFLECTION_PTU_G0_0_1;
 ok(ptr?.source_packet?.git_blob_sha===H.packet&&ptr.source_first_inverse?.git_blob_sha===H.inv&&ptr.whole_source_cold_complete===false,'direct SSC-to-original source first inverse');
 ok(n.predecessor?.git_blob_sha===H.oldSSC&&n.revision?.source_first_inverse?.git_blob_sha===H.inv&&n.revision?.source_packet?.git_blob_sha===H.packet&&n.items.length===191,'SSC exact ancestry');
 ok(n.guards?.source_census_freeze_complete===false&&n.guards?.whole_L_source_cold_audit_complete===false,'SSC G0 not frozen');
 ok(r.source_first_predecessor?.git_blob_sha===H.oldReg&&r.current_ssc?.git_blob_sha===H.SSC&&r.per_source?.reduce((a,x)=>a+x.source_first_location_units,0)===350,'convergence exact original and all six source locations');
 const l=r.per_source.find(x=>x.source==='L04');
 ok(l?.original_exact_cell_expression_groups_not_yet_independently_verified===8&&l.classified_source_locations.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===8&&r.explicit_G0_outstanding.source_exactness_by_source.find(x=>x.source==='L04').count===8,'current source-first derived exact debt matches three counters');
 ok(r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_complete===false,'all six cold audits still incomplete');
 ok(t.predecessor_exact?.git_blob_sha===H.oldTr&&t.current_census?.git_blob_sha===H.SSC&&t.current_L04_source_first_inventory?.git_blob_sha===H.inv&&t.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg&&t.complete_sources===0,'traversal exact parent and G0 cold open');
 ok(g.predecessor_gate?.git_blob_sha===H.oldGate&&g.current_source_census?.git_blob_sha===H.SSC&&g.current_convergence?.git_blob_sha===H.reg&&g.current_traversal?.git_blob_sha===H.tr&&g.clifford_source_packet?.git_blob_sha===H.packet&&g.clifford_source_verifier?.git_blob_sha===H.self,'all gated parent artifacts version-pinned');
 ok(g.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state?.G0_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.PR70_merge_authorized===false,'pending CI no false scope closure, W unchanged');
 return errors;
};
let pages={},imgs={},binaryOK=false;const dir=fs.mkdtempSync(path.join(os.tmpdir(),'iso-L04-Clifford-Pin-original-G0-'));
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('FROZEN_ORIGINAL_HTTP_'+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length!==348134||sha(bytes)!==frozenSHA)throw Error('FROZEN_ORIGINAL_SHA');
 binaryOK=true;
 const file=path.join(dir,'L04-original.pdf');fs.writeFileSync(file,bytes);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_ORIGINAL_17_PAGE_COUNT');
 for(const pg of [2,3]){
  pages[pg]=execFileSync('pdftotext',['-f',String(pg),'-l',String(pg),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:18000});
  const out=path.join(dir,'L04-p'+pg);
  execFileSync('pdftoppm',['-f',String(pg),'-l',String(pg),'-r','165','-png','-singlefile',file,out],{timeout:25000});
  imgs[pg]=sha(fs.readFileSync(out+'.png'));
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=verify(D,pages,imgs);
const hostile=[
 ['rotation_sin_sign',d=>d.packet.source_printed_semantics[1]=d.packet.source_printed_semantics[1].replace(')-gamma',')+gamma')],
 ['rotation_exponent_half',d=>d.packet.source_printed_semantics[1]=d.packet.source_printed_semantics[1].replace('theta)/2','theta)/4')],
 ['boost_hyperbolic_sign',d=>d.packet.source_printed_semantics[2]=d.packet.source_printed_semantics[2].replace(')-gamma',')+gamma')],
 ['boost_cosh_vs_cos',d=>d.packet.source_printed_semantics[2]=d.packet.source_printed_semantics[2].replace('cosh(','cos(')],
 ['Clifford_pseudoscalar_order',d=>d.packet.source_printed_semantics[3]='gamma_pseudoscalar=gamma0 gamma2 gamma1 gamma3'],
 ['vector_adjoint_right_action_erase',d=>d.packet.source_printed_semantics[4]=d.packet.source_printed_semantics[4].replace(' A (u gamma)^{-}',' A')],
 ['spinor_transform_adjoint_invention',d=>d.packet.source_printed_semantics[5]=d.packet.source_printed_semantics[5].replace('(u gamma) Psi','(u gamma) Psi (u gamma)^{-}')],
 ['P_unitary_spatial_convention_sign',d=>d.packet.source_printed_semantics[7]='U_P_prime=+gamma1 gamma2 gamma3 gamma=gamma0'],
 ['T_prime_clifford_gamma',d=>d.packet.source_printed_semantics[6]='U_T_unitary_prime=gamma0 gamma=gamma0 gamma2 gamma3'],
 ['PT_prime_phase',d=>d.packet.source_printed_semantics[8]='U_PT_prime=i gamma'],
 ['PTU_anticommute_to_commute',d=>d.packet.source_printed_semantics[9]='P T_U=+T_U P'],
 ['group_order_to_sixteen',d=>d.packet.source_printed_semantics[10]='P/TU finite order 16'],
 ['spinor_vector_U_swap',d=>d.packet.source_printed_semantics[0]='Psi -> U A U^{-}; A -> U Psi'],
 ['moved_Pin_signature_into_S003',d=>d.packet.scope_guard.do_not_absorb_adjacent_source_group_roles=[]],
 ['invent_Clifford_source_qualifies_math',d=>d.packet.scope_guard.source_math_claims_proven=true],
 ['alter_frozen_original_revision',d=>d.packet.original.revision='arXiv:2407.02497v1'],
 ['alter_original_pdf_hash',d=>d.packet.original.SHA256='WRONG'],
 ['alter_original_block_SHA',d=>d.packet.original_source_blocks[2].source_block_SHA256='WRONG'],
 ['alter_image_png_SHA',d=>d.packet.visual_source_CI.pages_SHA256[3]='WRONG'],
 ['delete_original_location',d=>d.inv.locations.splice(2,1)],
 ['invent_new_SSC_owner',d=>d.inv.locations.find(x=>x.id==='L04-S003').ssc_ids=['L-SSC-999']],
 ['remove_SSC_expression',d=>d.SSC.items.find(x=>x.id==='L-SSC-094').body=d.SSC.items.find(x=>x.id==='L-SSC-094').body.replace(original12[0],'WRONG')],
 ['mutate_unrelated_source_group',d=>d.inv.locations.find(x=>x.id==='L04-S004').source_locator='WRONG'],
 ['mutate_unrelated_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-095').body+='WRONG'],
 ['falsify_L04_selected_counter',d=>d.reg.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['falsify_whole_6_cold',d=>d.reg.per_source.forEach(x=>x.original_complete_cold_review_passed=true)],
 ['source_to_SSC_parent_wrong',d=>d.SSC.predecessor.git_blob_sha='WRONG'],
 ['stage_G0_forge',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['stage_G1_forge',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['cross_author_W_semantics',d=>d.packet.stage_locks.W_semantics_imported=true]
 ];
let rejected=0;
if(!errors.length){
 for(const [name,mut]of hostile){
  const m=structuredClone(D);mut(m);
  if(verify(m,pages,imgs).length)rejected++;
  else errors.push('HOSTILE_ESCAPED '+name);
 }
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-Clifford-reflection-PTU-source.v0.1',PASS:errors.length===0,errors,official_original_pdf_SHA_verified:binaryOK,original_p2_p3_visual_PNG_SHA_checked:2,original_original_source_blocks_SHA_checked:4,original_source_group_repaired:'L04-S003',existing_SSC_repaired:'L-SSC-094',source_expression_sign_branch_count:12,untouched_original_L04_groups:52,untouched_whole_SSC_records:190,original_L04_selected_exact_remaining:8,hostiles_defined:hostile.length,hostiles_rejected:rejected,whole_source_semantic_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;

