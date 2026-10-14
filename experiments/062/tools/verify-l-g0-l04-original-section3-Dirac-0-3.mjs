// IsoGraph L-only G0 §3 original Dirac solution source-fidelity qualification.
// Verify SHA256-frozen official L04 v2 PDF pp6–7 + ALL 14 layout blocks,
// then validate source-first SSC correspondence and 32 hostile distinctions.
// G0 source-scope checker. Not Core native reconstruction, not physics proof,
// and not whole-source cold semantic completeness qualification.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_SECTION3_DIRAC_SOLUTIONS_PHASE_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_7.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_8.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_74.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_75.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_27.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_28.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_44.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_45.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_131.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_132.json',
 self:E+'tools/verify-l-g0-l04-original-section3-Dirac-0-3.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const B=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const SOURCE='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const groupIDs=['L04-S013','L04-S014','L04-S015'];
const ownerIDs=['L-SSC-100','L-SSC-101'];
const selectedEquals=[
 'i gamma_2 (u_p^{wedge/vee})^* = v_p^{wedge/vee}',
 'i gamma_2 (v_p^{wedge/vee})^* = u_p^{wedge/vee}',
 'i gamma_0 u_{-p}^{wedge/vee} = +i u_p^{wedge/vee}',
 'i gamma_0 v_{-p}^{wedge/vee} = -i v_p^{wedge/vee}',
 'gamma_13 u_{-p}^{wedge/vee} = (-/+) (u_p^{vee/wedge})^*',
 'gamma_13 v_{-p}^{wedge/vee} = (-/+) (v_p^{vee/wedge})^*'
];
const requiredBlocks=[
 ['L04-P006-B001','b3c5add041709dcbef325194dcb60726978031156d91f6549fc70c7052795921'],
 ['L04-P006-B002','1820b31b7277ebe1479c136ccf991ab95142dfece67afb30c8271dee7d203850'],
 ['L04-P006-B003','de781effd77c985093dcc38cf29df31070821cae9554592585d0c2b35e406e18'],
 ['L04-P006-B004','fbcf44ca19fa7bb6a0945a329ad9887e16333e0ec9241c9d5dcf5b768baa1404'],
 ['L04-P006-B005','8213c460393b91abe669a7a170dfe3af8f474ec80752a8d75731ce087a78756b'],
 ['L04-P006-B006','a5a3085cc14fae63df08da006ac1b3c44fe562dbae34fc1e1bc896f733ab9adb'],
 ['L04-P006-B007','1c0fcfe59602c1370e805412f7ef0b1d464bf1589329aca6d3eebe594e089016'],
 ['L04-P006-B008','4a2b0453f88bba88a24133ff8581393a49cba5a9ee3fd788325a7ad4170c118a'],
 ['L04-P007-B001','406ce0d033850ebb23cbcebfc8fc7ccc0d71352e3d85a77cb2456b07f7fb236b'],
 ['L04-P007-B002','a634192bd2a88cca1015af4043e23e353f9bf6f7b27ae7b27d7576b9c212f9e6'],
 ['L04-P007-B003','3e33fe789bf60f34dc8cd2c2583cdc2f404d8e2ee50aa1f30bf2cf1de5cc2b78'],
 ['L04-P007-B004','82282ff3e670d59c68f028df0b43807ef1939609586d822e8bea27e6df20cbb1'],
 ['L04-P007-B005','a87dd3fce8fef7964c7ba4563d5580360fca77c9caa1b744f808b2e08c228ab8'],
 ['L04-P007-B006','fa0c9c800abb0c6a238fecf6b9372ce007b69cba39a9558ecb98bdc8b0a2997b']
];
const oldOpen='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED';
const newG={
 'L04-S013':'SCOPED_ORIGINAL_DIRAC_MASSIVE_MASSLESS_EQ3_1_SOURCE_RECONCILED_WHOLE_COLD_OPEN',
 'L04-S014':'MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS',
 'L04-S015':'SCOPED_ORIGINAL_EQ3_2_CPT_PHASE_AND_PT_DIAGRAM_SOURCE_RECONCILED_WHOLE_COLD_OPEN'
};
function check(z,pages){
 const problems=[],t=(truth,msg)=>{if(!truth)problems.push(msg);};
 const {packet:s,manifest:m,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 t(s?.schema==='isograph.track-L.G0.L04-frozen-original-section3-Dirac-Eq3_1-3_2-source.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'L-only G0 nonauthority source packet');
 t(s?.frozen_original?.revision==='arXiv:2407.02497v2'&&s.frozen_original.PDF_SHA256===SOURCE&&s.frozen_original.PDF_bytes===348134&&s.frozen_original.original_PDF_pages===17,'exact historical frozen PDF byte and revision identity');
 t(s?.frozen_original?.source_manifest?.git_blob_sha===B.manifest,'original source layout manifest pointer');
 t(s?.independent_original_source?.original_p6_p7_text_probe_run_id===38143503811&&s.independent_original_source.visual_original_pages.join(',')==='6,7'&&s.independent_original_source.all17_visual_run_id===38120301520&&s.independent_original_source.whole_paper_semantic_cold_qualified===false,'independent original text and visual PDF provenance');
 const source=m?.original_sources?.[3];
 t(source?.id==='L04'&&source.revision==='arXiv:2407.02497v2'&&source.PDF_SHA256===SOURCE&&source.PDF_byte_count===348134&&source.original_pdf_extracted_pages?.length===17,'frozen complete original L04 source identity in all-six manifest');
 const observed=[];
 for(const pg of [6,7]){
  const cell=source?.original_pdf_extracted_pages?.[pg-1];
  const original=pages?.[pg];
  t(!!original&&sha(Buffer.from(original))===cell?.original_extracted_page_SHA256,'physical frozen page source match '+pg);
  const lines=original?.replaceAll('\r','').replace(/\f+$/g,'').split('\n')||[];
  for(const b of cell?.blocks||[]){
   const segment=lines.slice(b.original_extracted_line_start-1,b.original_extracted_line_end).join('\n');
   t(sha(Buffer.from(segment))===b.original_source_block_SHA256,'original PDF block independent re-extract '+b.source_atom_id);
   observed.push([b.source_atom_id,b.original_source_block_SHA256]);
  }
 }
 t(eq(observed,requiredBlocks),'complete exact 14-block source-first partition, no missing narrative/equation/diagram blocks');
 t(s?.source_first_finite_partition?.length===3&&eq(s.source_first_finite_partition.map(x=>x.id),groupIDs),'original source section3 packet preserves existing three group identities');
 for(const [id,oldDisposition]of [['L04-S013',oldOpen],['L04-S014','MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS'],['L04-S015',oldOpen]]){
  const a=oi?.locations?.find(x=>x.id===id),b=i?.locations?.find(x=>x.id===id),c=s.source_first_finite_partition.find(x=>x.id===id);
  t(a?.disposition===oldDisposition&&b?.disposition===newG[id]&&eq(b?.ssc_ids,a?.ssc_ids)&&eq(b?.original_section3_Dirac_source_evidence?.source_atoms,c?.source_atoms)&&b.original_section3_Dirac_source_evidence.git_blob_sha===B.packet&&b.original_section3_Dirac_source_evidence.whole_L04_source_cold_complete===false,'source original location exact scoped disposition '+id);
 }
 const p6=s?.original_p6_source_assertions;
 t(p6?.Dirac_equation==='0 = i gamma^mu partial_mu Psi - m Psi (source)'&&p6?.Pauli_momentum?.matrix==='p = sum_{pi=1..3} p^pi sigma_pi = [[p3,p1-i p2],[p1+i p2,-p3]]','original Dirac momentum matrix sign and Pauli argument order');
 t(p6?.Pauli_momentum?.energy==='E^2=|p|^2+m^2'&&p6?.Pauli_momentum?.unit_direction.includes('dimensionless 2x2'),'distinct source energy, magnitude and directional matrix carriers');
 t(p6?.positive_negative_energy?.solution?.includes('exp(+i p_mu x^mu)')&&p6?.positive_negative_energy?.boost_operator?.includes('cosh(zeta/2)-p_u sinh(zeta/2)')&&p6?.positive_negative_energy?.boost_operator?.includes('cosh(zeta/2)+p_u sinh(zeta/2)'),'positive/negative energy spinor phases and upper/lower boost carrier');
 t(p6?.positive_negative_energy?.v_rest_and_boost==='v_p^{wedge/vee}=U_p (1/sqrt(2))[xi^{wedge/vee};-xi^{wedge/vee}]=(1/sqrt(2m))[sqrt(E-p) xi^{wedge/vee};-sqrt(E+p) xi^{wedge/vee}]','original massive v sign, sqrt/Pauli carrier and normalization');
 t(p6?.positive_negative_energy?.u_rest_and_boost==='u_p^{wedge/vee}=U_p (1/sqrt(2))[chi^{wedge/vee};chi^{wedge/vee}]=(1/sqrt(2m))[sqrt(E-p) chi^{wedge/vee};sqrt(E+p) chi^{wedge/vee}]','original boosted massive u two components');
 t(eq(p6?.positive_negative_energy?.boost_guards,['sinh(zeta)=|p|/m','cosh(zeta)=E/m','tanh(zeta)=|p|/E']),'all 3 independent original source rapidity ratios');
 t(p6?.positive_negative_energy?.source_spinors?.includes('epsilon=-i sigma_2')&&p6?.positive_negative_energy?.source_massive_normalization==='bar(u)u=1=-bar(v)v','source i matrix and opposite massive normalization');
 t(p6?.massless_source?.eq3_1_u==='u_{p0}^{wedge/vee}=(1/2)[(1-p_u)chi^{wedge/vee};(1+p_u)chi^{wedge/vee}]'&&p6?.massless_source?.eq3_1_v==='v_{p0}^{wedge/vee}=(1/2)[(1-p_u)xi^{wedge/vee};-(1+p_u)xi^{wedge/vee}]','original source Eq3.1 massless projectors, half normalization and v lower minus');
 t(p6?.massless_source?.guard?.startsWith('m->0')&&eq(p6?.massless_source?.source_massless_normalization,['bar(u)u=bar(v)v=0','u^dagger u=v^dagger v=1']),'source massless limit not unconditional finite m, separate renormalization');
 t(eq(p6?.massless_source?.source_matrix_carriers,['i gamma_2 = [[0,epsilon],[-epsilon,0]]','i gamma_0 = [[0,i I],[i I,0]]','gamma_13 = [[-epsilon,0],[0,-epsilon]]','sigma_pi^* = epsilon sigma_pi epsilon']),'source gamma block operators and complex star support');
 t(eq(s?.original_Eq3_2_p6_source?.ordered_six_printed_identities,selectedEquals)&&s.original_Eq3_2_p6_source.source_nonimplication.includes('physical CP/T invariance'),'all six printed Eq3.2 gamma conjugation, index, phase, momentum inversion and negative boundary');
 t(s?.original_p7_source_scope?.helicity_guard?.includes('NOT helicity eigenstates')&&s.original_p7_source_scope.helicity_guard.includes('p_u = +/- sigma_3')&&s.original_p7_source_scope.negative_energy_source_disclaimer.includes('OPPOSITE'),'source p7 longitudinal-only helicity scope and negative-energy label countercase');
 const gph=s?.original_p7_source_scope?.diagram_original_visual_graph;
 t(eq(gph?.vertices?.map(x=>x.id),['TL','TR','BL','BR'])&&eq(gph?.source_labelled_unordered_edges,[{op:'P',pair:['TL','TR']},{op:'P',pair:['BL','BR']},{op:'T',pair:['TL','BR']},{op:'T',pair:['TR','BL']}])&&gph.arrow_directionality_and_phase_independently_qualified===false,'p7 four vertex P/T source inc. and unqualified phase/direction');
 t(s?.original_p7_source_scope?.source_spinor_basis_cardinality?.all_original_column_vector_components_independently_qualified_here===false&&s.original_p7_source_scope.source_CPT_qualitative.boundary.includes('NOT quantitative'),'no false complete individual eight source columns or physical QFT phases');
 t(s?.conservation?.unmodified_existing_original_groups===50&&s.conservation.unchanged_complete_existing_SSC_records===189&&s.conservation.new_typed_SSC_items===0&&s.conservation.after_scoped_selected_exact_groups===5,'conservation compact scope and no fabricated new source identities');
 t(s?.status?.all_six_original_cold_qualified===0&&s.status.G0_frozen===false&&s.status.G1_authorized===false&&s.status.W_semantics_imported===false&&s.status.external_source_mathematics_truth_not_required_for_G0===true&&s.status.full_L04_original_source_cold_qualified===false&&s.status.p7_eight_spinor_components_cold_verified===false,'source stage/authority/theorem-scope locks');
 t(i?.locations?.length===53&&oi?.locations?.length===53&&i.counts.remaining_exact_source_groups===5&&o?.items?.length===191&&n?.items?.length===191,'finite original source/SSC count preserved');
 const changedGroup=[];const by={};const own=new Set();
 for(let k=0;k<53;k++){const cur=i?.locations?.[k],old=oi?.locations?.[k];if(!cur||!old){t(false,'missing or malformed source-location row '+k);continue;}t(cur.id===old.id,'old source location ID conserved '+k);if(!eq(cur,old))changedGroup.push(cur.id);by[cur.disposition]=(by[cur.disposition]||0)+1;for(const id of cur.ssc_ids||[])own.add(id);}
 t(eq(changedGroup,groupIDs),'all 50 other source groups unchanged, three contiguous §3 locations only');
 t(Object.keys(by).length===Object.keys(i.counts.by_disposition||{}).length&&Object.entries(by).every(([k,v])=>i.counts.by_disposition[k]===v)&&by[oldOpen]===5,'mechanically derived original disposition count');
 t(eq([...own].sort(),oi.reverse.L04_ssc_ids.slice().sort())&&own.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'two-way original L04 group/SSC exact owner namespace, global PASS forbidden');
 t(i.original_section3_source_first_reconciliation.git_blob_sha===B.packet&&i.original_section3_source_first_reconciliation.source_current_exact_selected_groups===5,'direct source packet in original inventory');
 const changedItems=[];
 for(let k=0;k<191;k++){t(o.items[k].id===n.items[k].id,'191 original SSC identity preserved '+k);if(!eq(o.items[k],n.items[k]))changedItems.push(n.items[k].id);}
 t(eq(changedItems,ownerIDs),'189 complete other SSC item objects conserved');
 const hundred=n.items.find(x=>x.id==='L-SSC-100'),hundredOne=n.items.find(x=>x.id==='L-SSC-101');
 for(const str of ['γ^μ∂_μΨ−mΨ','√(E−p)','ξ;−ξ','u_p0=(1/2)','v_p0=(1/2)','γ₁₃v_{−p}','+iu_p','−iv_p'])t(hundred?.body?.includes(str),'SSC-100 recovered frozen source-specific signed original semantic token '+str);
 for(const str of ['NOT helicity eigenstates','p_u=±σ₃','negative-energy','P pairs TL–TR','T pairs TL–BR','complete original printed matrix cells remain'])t(hundredOne?.body?.includes(str),'SSC-101 preserved source negative/conditional scope '+str);
 for(const id of ownerIDs){const it=n.items.find(x=>x.id===id)?.source_expression_census?.L04_ORIGINAL_SECTION3_EQ3_1_EQ3_2_SOURCE_0_1;t(it?.source_packet?.git_blob_sha===B.packet&&it?.source_first_inverse?.git_blob_sha===B.inv&&it?.original_PDF_SHA256===SOURCE&&it.whole_source_COLD_complete===false,'current SSC in-record recoverable original source pointer '+id);}
 t(n.schema==='woit-lisi.track-l.source-semantic-census.v0.75'&&n.predecessor.git_blob_sha===B.oldSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv,'new SSC exact parent and source-first independent evidence');
 t(r.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.28'&&r.source_first_predecessor.git_blob_sha===B.oldReg&&r.current_ssc.git_blob_sha===B.SSC,'new convergence exact source lineage');
 const rL=r.per_source.find(x=>x.source==='L04');
 t(r.per_source.length===6&&r.per_source.reduce((a,x)=>a+x.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191&&rL.audit_git_blob_sha===B.inv&&rL.original_exact_cell_expression_groups_not_yet_independently_verified===5&&rL.classified_source_locations[oldOpen]===5,'finite 6 frozen sources 350 groups 191 SSC and original L04 remaining 5');
 t(r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_frozen===false&&r.explicit_locks.G1_authorized===false,'no invented global cold pass or G1');
 t(v.schema==='lisi.full-treatment.source-traversal-ledger.v0.45'&&v.predecessor_exact.git_blob_sha===B.oldTr&&v.current_census.git_blob_sha===B.SSC&&v.current_L04_source_first_inventory.git_blob_sha===B.inv&&v.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&v.complete_sources===0,'current traversal provenance and six-source gate');
 t(g.schema==='isograph.exp062-l-current-stage-gate.v0.132'&&g.predecessor_gate.git_blob_sha===B.oldGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.section3_source_packet.git_blob_sha===B.packet&&g.section3_source_verifier.git_blob_sha===B.self,'stage gate exact authoritative ancestry');
 t(g.new_source_CI.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'CI status pending and no false G0/G1 or merge');
 return problems;
}
const pages={};const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-lisi-original-section3-'));
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('ORIGINAL_PDF_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());
 if(bytes.length!==348134||sha(bytes)!==SOURCE)throw Error('WRONG_FROZEN_ORIGINAL_REVISION');
 const file=path.join(dir,'L04-v2.pdf');fs.writeFileSync(file,bytes);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_PDF_WRONG_PAGE_COUNT');
 for(const pg of [6,7])pages[pg]=execFileSync('pdftotext',['-f',String(pg),'-l',String(pg),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:14000,maxBuffer:1500000});
}finally{fs.rmSync(dir,{recursive:true,force:true});}
// A valid baseline MUST PASS before hostile mutations are scored.
const issues=check(D,pages);
// Fail-closed malformed packet/source row mutants are rejection tests, not successful semantic proofs.
const mutants=[
 ['delete_CPT_negative_phase',d=>d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[3]='missing'],
 ['wrong_Gamma13_complex_star',d=>d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[4]=d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[4].replace('^*','')],
 ['reverse_gamma13_pair_sign',d=>d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[5]=d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[5].replace('(-/+)','(+/-)')],
 ['change_charge_matrix_u',d=>d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[0]='i gamma_2 u_p=v_p'],
 ['change_charge_matrix_v',d=>d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[1]='i gamma_0 v_p=u_p'],
 ['flip_i_gamma0_u',d=>d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[2]=d.packet.original_Eq3_2_p6_source.ordered_six_printed_identities[2].replace('+i','-i')],
 ['change_rapidity',d=>d.packet.original_p6_source_assertions.positive_negative_energy.boost_guards[1]='cosh(zeta)=|p|/E'],
 ['erase_negative_energy',d=>d.packet.original_p6_source_assertions.positive_negative_energy.solution='only positive'],
 ['change_Pauli_offdiagonal',d=>d.packet.original_p6_source_assertions.Pauli_momentum.matrix='[[p3,p1+ip2],[p1-ip2,-p3]]'],
 ['change_boost_block_sign',d=>d.packet.original_p6_source_assertions.positive_negative_energy.boost_operator='swapped'],
 ['change_massive_u_plusminus',d=>d.packet.original_p6_source_assertions.positive_negative_energy.u_rest_and_boost='incorrect'],
 ['change_massive_v_minus',d=>d.packet.original_p6_source_assertions.positive_negative_energy.v_rest_and_boost='incorrect'],
 ['drop_massless_limit',d=>d.packet.original_p6_source_assertions.massless_source.guard='unconditional finite mass'],
 ['change_u_projector',d=>d.packet.original_p6_source_assertions.massless_source.eq3_1_u='wrong'],
 ['change_v_projector',d=>d.packet.original_p6_source_assertions.massless_source.eq3_1_v='wrong'],
 ['drop_massless_renormalization',d=>d.packet.original_p6_source_assertions.massless_source.source_massless_normalization=[]],
 ['flip_gamma2_source_carrier',d=>d.packet.original_p6_source_assertions.massless_source.source_matrix_carriers[0]='wrong'],
 ['drop_antiheli_guard',d=>d.packet.original_p7_source_scope.helicity_guard='all momentum helicity eigen'],
 ['drop_v_negative_contrast',d=>d.packet.original_p7_source_scope.negative_energy_source_disclaimer='same'],
 ['change_P_role_incidence',d=>d.packet.original_p7_source_scope.diagram_original_visual_graph.source_labelled_unordered_edges[0].pair[1]='BR'],
 ['change_T_role_incidence',d=>d.packet.original_p7_source_scope.diagram_original_visual_graph.source_labelled_unordered_edges[2].pair[1]='BL'],
 ['forge_8spinor_full_reconstruction',d=>d.packet.original_p7_source_scope.source_spinor_basis_cardinality.all_original_column_vector_components_independently_qualified_here=true],
 ['claim_physics_truth',d=>d.packet.status.external_source_mathematics_truth_not_required_for_G0=false],
 ['change_PDF_bytes',d=>d.packet.frozen_original.PDF_bytes=348133],
 ['change_PDF_revision',d=>d.packet.frozen_original.revision='arXiv:2407.02497v1'],
 ['erase_original_block',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[5].blocks.pop()],
 ['flip_original_page_hash',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[6].original_extracted_page_SHA256='BAD'],
 ['drop_source_group',d=>d.inv.locations.splice(12,1)],
 ['change_unaffected_original_group',d=>d.inv.locations.find(x=>x.id==='L04-S008').original_source_semantic_group+=' novel'],
 ['change_unaffected_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-108').body+=' novel'],
 ['delete_Source_SSC_owner',d=>d.inv.locations.find(x=>x.id==='L04-S015').ssc_ids.pop()],
 ['fake_global_G0',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['fake_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['fake_whole_cold',d=>d.reg.per_source[3].original_complete_cold_review_passed=true],
 ['bad_stage_head_CI',d=>d.gate.new_source_CI.status='SUCCESS']
];
let rejected=0;
if(issues.length===0){for(const [name,mut] of mutants){let d=structuredClone(D);mut(d);if(check(d,pages).length)rejected++;else issues.push('ESCAPED_HOSTILE '+name);}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-Dirac-Eq3_1-3_2-source-0.3',PASS:issues.length===0,issues,frozen_original_PDF_SHA256_verified:true,original_entire_pages:[6,7],source_blocks_reextracted_sha_verified:14,original_location_total:350,original_L04_groups:53,existing_SSC_identities:191,exact_source_groups_repaired:2,scoped_source_groups_modified:3,unchanged_SSC_items:189,remaining_selected_L04_exact_groups:5,hostiles_defined:mutants.length,hostiles_rejected:rejected,original_whole_source_semantic_cold_qualified:false,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(issues.length)process.exitCode=1;
