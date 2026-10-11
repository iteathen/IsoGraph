// L-only IsoGraph G0 §6 original Dirac-biquaternion source fidelity.
// Exact original 2407.02497v2, entire p12/p13 PDF original SHA+15 text blocks;
// source assertion-versus-conditional reader calculation preserved separately.
// This is an SSC source-fidelity test, NOT theory truth, G1 or full L04 cold pass.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
  packet:P+'LISI_L04_ORIGINAL_SECTION6_BIQUATERNION_MATRIX_SOURCE_G0_0_1.json',
  manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
  sourceCrosswalk:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
  oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_9.json',
  inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_10.json',
  oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_76.json',
  SSC:P+'SOURCE_SEMANTIC_CENSUS_0_77.json',
  oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_29.json',
  reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_30.json',
  oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_46.json',
  tr:P+'SOURCE_TRAVERSAL_LEDGER_0_47.json',
  oldGate:E+'L_CURRENT_STAGE_GATE_0_136.json',
  gate:E+'L_CURRENT_STAGE_GATE_0_137.json',
  self:E+'tools/verify-l-g0-l04-original-section6-biquaternion-matrix-0-2.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const B=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,blob(v)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,v])=>[k,read(v)]));
const ORIGINAL='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const EG=[
  {source_location:'L04-S030',SSC:'L-SSC-111',source_atoms:['L04-P012-B002','L04-P012-B003'],printed:[
    'Psi=(Psi_1,Psi_2,Psi_3,Psi_4)^T',
    'Psi^C=i gamma_2 (Psi)^* = (-Psi_4^*,Psi_3^*,Psi_2^*,-Psi_1^*)^T',
    'Psi_Q = [[Psi_1,-Psi_4^*],[Psi_2,Psi_3^*],[Psi_3,Psi_2^*],[Psi_4,-Psi_1^*]] ~ [psi_HL;psi_HR]'
  ]},
  {source_location:'L04-S031',SSC:'L-SSC-112',source_atoms:['L04-P012-B003','L04-P012-B004','L04-P012-B005'],printed:[
    'e_0 ~ sigma_0; e_pi ~ -i sigma_pi (pi=1,2,3); e_mu in H; psi_HL = psi_HL^mu e_mu in C tensor H',
    'psi_QL = [[Psi_1^R+i Psi_1^I,-Psi_4^R+i Psi_4^I],[Psi_2^R+i Psi_2^I,Psi_3^R-i Psi_3^I]]',
    'psi_QR = i sigma_2 (psi_QL)^* sigma_1 ~ psi_HR = i (psi_HL)^* e_3',
    'psi_HL coefficient e_0 = (1/2)(Psi_1^R+Psi_3^R -i Psi_1^I+i Psi_3^I) [as printed]',
    'psi_HL coefficient e_1 = (1/2)(Psi_2^I+Psi_4^I +i Psi_2^R-i Psi_4^R) [as printed]',
    'psi_HL coefficient e_2 = (1/2)(-Psi_2^R-Psi_4^R +i Psi_2^I-i Psi_4^I) [as printed]',
    'psi_HL coefficient e_3 = (1/2)(Psi_1^I+Psi_3^I +i Psi_1^R-i Psi_3^R) [as printed]'
  ]}
];
const DISP=[
 'SCOPED_ORIGINAL_DIRAC_CHARGE_CONJUGATE_4x2_BIQUATERNION_CARRIER_EXACT_SOURCE_VISUAL_WHOLE_COLD_OPEN',
 'SCOPED_ORIGINAL_PAULI_COMPLEX_BIQUATERNION_COMPONENTS_AND_RIGHT_CHIRAL_MAP_VISUAL_WHOLE_COLD_OPEN'
];
const srcUnverified='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED';
function verify(z,pages){
 const errors=[],check=(v,msg)=>{if(!v)errors.push(msg)};
 const {packet:s,manifest:m,sourceCrosswalk:cw,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 check(s?.schema==='isograph.track-L.G0.L04-original-p12-Dirac-biquaternion-source-matrix.v0.1'&&s?.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'original L-only nonauthoritative G0 source packet');
 check(s?.frozen_original?.id==='L04'&&s.frozen_original.revision==='arXiv:2407.02497v2'&&s.frozen_original.PDF_SHA256===ORIGINAL&&s.frozen_original.bytes===348134&&s.frozen_original.pages===17,'original official source v2 hash/length/page pin');
 check(s?.source_first_evidence?.original_17_page_primary_visual_run===38120301520&&s.source_first_evidence.original_p12_visual_job_id===114413453012&&s.source_first_evidence.original_p12_p13_exact_reextraction_run===38148126736&&s.source_first_evidence.original_layout_manifest.git_blob_sha===B.manifest,'independent original visual and exact text block evidence pinned');
 const original=m?.original_sources?.[3],sourceBlockRefs=new Map();
 check(original?.id==='L04'&&original.revision==='arXiv:2407.02497v2'&&original.PDF_SHA256===ORIGINAL&&original.PDF_byte_count===348134&&original.original_pdf_extracted_pages?.length===17,'original source binary identity in frozen all-six manifest');
 const rawBlocks=[];
 for(const pg of [12,13]){
  const p=original?.original_pdf_extracted_pages?.[pg-1],raw=pages?.[pg];
  check(typeof raw==='string'&&sha(Buffer.from(raw))===p?.original_extracted_page_SHA256,'independent entire original PDF page SHA '+pg);
  const lines=raw?.replaceAll('\r','').replace(/\f+$/g,'').split('\n')||[];
  for(const loc of p?.blocks||[]){
   const text=lines.slice(loc.original_extracted_line_start-1,loc.original_extracted_line_end).join('\n');
   check(sha(Buffer.from(text))===loc.original_source_block_SHA256,'frozen original source text block SHA '+loc.source_atom_id);
   sourceBlockRefs.set(loc.source_atom_id,loc.original_source_block_SHA256);
   rawBlocks.push(loc.source_atom_id);
  }
 }
 check(rawBlocks.length===16&&rawBlocks.filter(x=>x.startsWith('L04-P012-')).length===7&&rawBlocks.filter(x=>x.startsWith('L04-P013-')).length===9,'independent complete page12/13 original layout partition');
 const p12furniture=cw?.original_first_source_blocks?.find(x=>x.atom_id==='L04-P012-B007');
 const p13furniture=cw?.original_first_source_blocks?.find(x=>x.atom_id==='L04-P013-B009');
 check(p12furniture?.original_first_role==='DEFENSIBLE_NONLOAD_PAGE_FURNITURE'&&eq(p12furniture?.source_group_ids,['L04-S053'])&&p13furniture?.original_first_role==='DEFENSIBLE_NONLOAD_PAGE_FURNITURE'&&eq(p13furniture?.source_group_ids,['L04-S053']),'both source page furniture blocks independently classified, not omitted original formulas');
 check(!s?.source_first_evidence?.source_block_SHA256?.some(x=>x[0]==='L04-P012-B007')&&s?.source_first_evidence?.source_block_SHA256?.length===6,'original p12 load-bearing six SHA blocks remain distinct from seventh source page furniture');
 const expectedBlockIds=['L04-P012-B001','L04-P012-B002','L04-P012-B003','L04-P012-B004','L04-P012-B005','L04-P012-B006'];
 check(eq(s?.source_first_evidence?.source_block_SHA256?.map(x=>x[0]),expectedBlockIds),'original all six p12 block identity order, not only selected formulas');
 for(const entry of s?.source_first_evidence?.source_block_SHA256||[])check(entry?.length===2&&sourceBlockRefs.get(entry[0])===entry[1],'immutable original source block physical byte SHA '+entry?.[0]);
 check(s?.original_assertions?.length===2&&eq(s.original_assertions.map(x=>x.source_location),['L04-S030','L04-S031']),'no invented original source semantics or duplicate SSC owner');
 check(s.original_assertions[0].source_scope_nonassertion_guard?.includes('not assert an additional fourth fermion generation')&&s.conservation.source_scope_nonassertion_guard_separated_from_author_formula===true&&s.methodology_correction.do_not_treat_analyst_guard_as_original_formula===true,'analyst scope inference MUST NOT be represented as verbatim author formula');
 for(let k=0;k<2;k++){
  const got=s?.original_assertions?.[k],want=EG[k];
  check(got?.SSC===want.SSC&&got.source_location===want.source_location&&eq(got.source_atoms,want.source_atoms)&&eq(got.printed,want.printed),'exact signed Dirac/carrier/PsiQ/Pauli/complex quaternion original asserted source '+want.source_location);
 }
 check(s?.original_assertions?.[1]?.source_equivalence_kind?.includes('~')&&s.original_assertions[1].source_equivalence_kind.includes('not a proven universal equality'),'original ~ source relation scope preserved');
 const d=s?.source_internal_distinction_evidence;
 check(d?.status==='ORIGINAL_PRINT_PRESERVED_SEPARATELY_FROM_CONDITIONAL_READER_CHECK'&&d?.original_printed_quaternion_coefficients_not_silently_corrected===true&&d?.conditional_diagnostic?.includes('diag(i,0)')&&d.conditional_diagnostic.includes('diag(-i,0)')&&d.asserts_definite_author_error===false&&d.requires_theory_proof_for_G0===false,'source assertion and conditional reconstruction discrepancy must not be reclassified as mathematical theorem or silent correction');
 check(s?.adjacent_original_p12_source_claims_not_promoted_by_this_packet?.S032_S033?.includes('not claimed')&&s.adjacent_original_p12_source_claims_not_promoted_by_this_packet.S028_S029.includes('order-48'),'adjacent source uncertainty/other source owners preserved');
 check(s?.conservation?.frozen_L_sources===6&&s.conservation.source_groups_all===350&&s.conservation.original_L04_groups===53&&s.conservation.all_L_SSC_identities===191&&s.conservation.other_original_L04_groups_unchanged===51&&s.conservation.unchanged_existing_L_SSC_items===189&&s.conservation.new_L_SSC_ids===0,'unchanged frozen source/SSC identities conserved');
 check(s?.locks?.G0_frozen===false&&s.locks.G1_authorized===false&&s.locks.whole_six_original_cold_sources_completed===0&&s.locks.whole_L04_original_cold_complete===false&&s.locks.no_cross_author_import===true&&s.locks.source_truth_proof_not_required===true&&s.locks.PR70_merge_authorized===false,'G0/G1 cross-author/math truth/merge firewall');
 check(oi?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191&&i.counts.remaining_exact_source_groups===2,'stable original source/group count and current exact selected debt');
 const moved=[],by={},owner=new Set();
 for(let k=0;k<53;k++){
  const before=oi?.locations?.[k],after=i?.locations?.[k];
  if(!before||!after){check(false,'missing original location '+k);continue;}
  check(before.id===after.id,'same 53 source location identities '+k);
  if(!eq(before,after))moved.push(after.id);
  by[after.disposition]=(by[after.disposition]||0)+1;
  for(const id of after.ssc_ids||[])owner.add(id);
 }
 check(eq(moved,['L04-S030','L04-S031']),'other 51 ENTIRE original source groups preserved, including p13 adjacent statements');
 check(Object.keys(by).length===Object.keys(i?.counts?.by_disposition||{}).length&&Object.entries(by).every(([k,val])=>i.counts.by_disposition[k]===val)&&by[srcUnverified]===2,'machine-derived source original group dispositions, not stale historical headline');
 check(eq([...owner].sort(),oi?.reverse?.L04_ssc_ids?.slice().sort())&&owner.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'per-location reciprocal source→owner SSC with global cold PASS still false');
 for(let k=0;k<2;k++){
  const id=EG[k].source_location,row=i?.locations?.find(x=>x.id===id),prior=oi?.locations?.find(x=>x.id===id);
  check(prior?.disposition===srcUnverified&&row?.disposition===DISP[k]&&eq(row?.ssc_ids,[EG[k].SSC])&&row?.source_locator?.includes('p12')&&row?.original_section6_biquaternion_source_evidence?.git_blob_sha===B.packet,'original p12 exact source location, linked SSC and scoped disposition '+id);
 }
 check(i?.original_section6_biquaternion_source_first?.git_blob_sha===B.packet&&i.original_section6_biquaternion_source_first.corrected_prior_S031_locator_p13_to_original_p12===true&&i.original_section6_biquaternion_source_first.current_selected_exact_count===2,'existing original source first S031 p13→p12 locator bug repaired');
 const changed=[];
 for(let k=0;k<191;k++){const a=o?.items?.[k],b=n?.items?.[k];if(!a||!b){check(false,'missing old or new SSC item '+k);continue;}check(a.id===b.id,'same old typed semantic source ID '+k);if(!eq(a,b))changed.push(b.id);}
 check(eq(changed,['L-SSC-111','L-SSC-112']),'unchanged 189 other complete SSC items conserved with their original roles');
 const c111=n?.items?.find(x=>x.id==='L-SSC-111'),c112=n?.items?.find(x=>x.id==='L-SSC-112');
 for(const bit of ['ΨQ=[[Ψ1,-Ψ4*]','ΨC=iγ2Ψ*','Ψ3*','-Ψ1*','NOT a proved physical equivalence'])check(c111?.body?.includes(bit),'complete source-specific exact row/binder in SSC111: '+bit);
 for(const bit of ['eπ∼−iσπ','ψQR=iσ2(ψQL)*σ1','-Ψ4^R+iΨ4^I','e0 coefficient','e1=','e2=','e3=','diag(i,0)','diag(-i,0)'])check(c112?.body?.includes(bit),'complete source-specific exact signed quaternion body in SSC112: '+bit);
 for(const x of [c111,c112]){
  const v=x?.source_expression_census?.L04_ORIGINAL_SECTION6_BIQUATERNION_MATRIX_0_1;
  check(v?.source_packet?.git_blob_sha===B.packet&&v?.source_first_inverse?.git_blob_sha===B.inv&&v?.source_original_SHA256===ORIGINAL&&v?.whole_source_semantic_cold_complete===false,'in-record SOURCE->SSC independent exact evidence pointer '+x?.id);
 }
 check(n?.schema==='woit-lisi.track-l.source-semantic-census.v0.77'&&n.predecessor.git_blob_sha===B.oldSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv&&n.guards.source_census_freeze_complete===false,'SSC rev ancestry/source freeze not falsely claimed');
 check(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.30'&&r.source_first_predecessor.git_blob_sha===B.oldReg&&r.current_ssc.git_blob_sha===B.SSC&&r.per_source.length===6&&r.per_source.reduce((a,b)=>a+b.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191,'current whole L source denominator exact 6,350,191');
 const rl=r?.per_source?.find(x=>x.source==='L04');
 check(rl?.audit_git_blob_sha===B.inv&&rl.original_exact_cell_expression_groups_not_yet_independently_verified===2&&r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_complete===false&&r.explicit_locks.G1_authorized===false,'G0 globally OPEN with two selected fig source groups but no whole-original cold certification');
 check(v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.47'&&v.predecessor_exact.git_blob_sha===B.oldTr&&v.current_census.git_blob_sha===B.SSC&&v.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&v.current_L04_source_first_inventory.git_blob_sha===B.inv&&v.complete_sources===0,'latest traversal descendant pinned with whole-source cold 0');
 check(g?.schema==='isograph.exp062-l-current-stage-gate.v0.137'&&g.predecessor_gate.git_blob_sha===B.oldGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.original_section6_source_packet.git_blob_sha===B.packet&&g.original_section6_source_verifier.git_blob_sha===B.self,'current gate pins all source packet/verifier ancestors exact hashes');
 check(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new CI not preclaimed success and no G1/merge authorization');
 return errors;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-lisi-L04-biqa-original-'));const pages={};
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('FROZEN_ORIGINAL_L04_HTTP_'+res.status);
 const data=Buffer.from(await res.arrayBuffer());if(data.length!==348134||sha(data)!==ORIGINAL)throw Error('ORIGINAL_L04_PDF_REVISION_HASH_CHANGED');
 const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,data);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_SOURCE_PAGE_COUNT');
 for(const pg of [12,13])pages[pg]=execFileSync('pdftotext',['-f',String(pg),'-l',String(pg),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:15000,maxBuffer:2200000});
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=verify(D,pages);
const mutants=[
 ['wrong_charge_first_minus',z=>z.packet.original_assertions[0].printed[1]=z.packet.original_assertions[0].printed[1].replace('-Psi_4^*','+Psi_4^*')],
 ['wrong_charge_last_minus',z=>z.packet.original_assertions[0].printed[1]=z.packet.original_assertions[0].printed[1].replace('-Psi_1^*','+Psi_1^*')],
 ['swap_4x2_carrier',z=>z.packet.original_assertions[0].printed[2]='wrong'],
 ['forget_original_star',z=>z.packet.original_assertions[0].printed[2]=z.packet.original_assertions[0].printed[2].replace('Psi_3^*','Psi_3')],
 ['drop_C_tensor_H',z=>z.packet.original_assertions[1].printed[0]='no Pauli basis'],
 ['wrong_p2x2_L_top_right_sign',z=>z.packet.original_assertions[1].printed[1]=z.packet.original_assertions[1].printed[1].replace('-Psi_4^R','+Psi_4^R')],
 ['wrong_p2x2_L_bottom_right_sign',z=>z.packet.original_assertions[1].printed[1]=z.packet.original_assertions[1].printed[1].replace('-i Psi_3^I','+i Psi_3^I')],
 ['wrong_p2x2_L_offdiag_order',z=>z.packet.original_assertions[1].printed[1]='wrong order'],
 ['right_chiral_wrong_sigma',z=>z.packet.original_assertions[1].printed[2]=z.packet.original_assertions[1].printed[2].replace('sigma_2','sigma_1')],
 ['right_chiral_star_removed',z=>z.packet.original_assertions[1].printed[2]=z.packet.original_assertions[1].printed[2].replace('(psi_QL)^*','psi_QL')],
 ['change_e0_printed_phase',z=>z.packet.original_assertions[1].printed[3]=z.packet.original_assertions[1].printed[3].replace('-i Psi_1^I','+i Psi_1^I')],
 ['change_e1_printed_phase',z=>z.packet.original_assertions[1].printed[4]=z.packet.original_assertions[1].printed[4].replace('+i Psi_2^R','-i Psi_2^R')],
 ['change_e2_printed_real_sign',z=>z.packet.original_assertions[1].printed[5]=z.packet.original_assertions[1].printed[5].replace('-Psi_2^R','+Psi_2^R')],
 ['change_e3_printed_phase',z=>z.packet.original_assertions[1].printed[6]=z.packet.original_assertions[1].printed[6].replace('-i Psi_3^R','+i Psi_3^R')],
 ['forge_source_math_error',z=>z.packet.source_internal_distinction_evidence.asserts_definite_author_error=true],
 ['forget_tilde_ambiguity',z=>z.packet.original_assertions[1].source_equivalence_kind='plain identity'],
 ['invent_G0_math_theorem',z=>z.packet.locks.source_truth_proof_not_required=false],
 ['change_original_PDF_revision',z=>z.packet.frozen_original.revision='arXiv:2407.02497v1'],
 ['change_PDF_hash',z=>z.packet.frozen_original.PDF_SHA256='WRONG'],
 ['change_original_page12_hash',z=>z.manifest.original_sources[3].original_pdf_extracted_pages[11].original_extracted_page_SHA256='WRONG'],
 ['erase_original_p13_block',z=>z.manifest.original_sources[3].original_pdf_extracted_pages[12].blocks.pop()],
 ['change_p12_packet_atom_sha',z=>z.packet.source_first_evidence.source_block_SHA256[4][1]='WRONG'],
 ['erase_original_L04_group',z=>z.inv.locations.pop()],
 ['alter_other_original_source_group',z=>z.inv.locations.find(x=>x.id==='L04-S008').original_source_semantic_group+=' invent'],
 ['alter_other_SSC',z=>z.SSC.items.find(x=>x.id==='L-SSC-108').body+=' invent'],
 ['mislocate_S031_to_p13',z=>z.inv.locations.find(x=>x.id==='L04-S031').source_locator='§6 p13'],
 ['erase_one_S031_owner_ref',z=>z.inv.locations.find(x=>x.id==='L04-S031').ssc_ids=[]],
 ['forge_all_six_source_cold',z=>z.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['forge_G0',z=>z.gate.current_lawful_state.G0_frozen=true],
 ['forge_G1',z=>z.gate.current_lawful_state.G1_authorized=true],
 ['forge_merge',z=>z.gate.current_lawful_state.PR70_merge_authorized=true],
 ['forge_current_CI_PASS',z=>z.gate.new_source_CI.status='SUCCESS'],
 ['falsify_p12_nonload_furniture',z=>z.sourceCrosswalk.original_first_source_blocks.find(x=>x.atom_id==='L04-P012-B007').original_first_role='ORIGINAL_TEXT_BLOCK_AUTHOR_SEMANTIC_ROLE_TO_EXISTING_SSC'],
 ['falsify_p13_nonload_furniture',z=>z.sourceCrosswalk.original_first_source_blocks.find(x=>x.atom_id==='L04-P013-B009').original_first_role='SOURCE_NATIVE_CITATION_ROLES'],
 ['flip_SSC112_signed_matrix_cell',z=>z.SSC.items.find(x=>x.id==='L-SSC-112').body=z.SSC.items.find(x=>x.id==='L-SSC-112').body.replace('-Ψ4^R+iΨ4^I','+Ψ4^R+iΨ4^I')]
];
let rejected=0;
if(issues.length===0){
 for(const [name,change]of mutants){const mod=structuredClone(D);try{change(mod);if(verify(mod,pages).length)rejected++;else issues.push('HOSTILE_ESCAPE '+name)}catch(e){issues.push('HOSTILE_CHECKER_EXCEPTION '+name+': '+e.message)}}
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-section6-chiral-Dirac-biquaternion-source-0.2',PASS:issues.length===0,issues,frozen_PDF_SHA256_verified:true,original_pages:[12,13],original_p12_p13_layout_blocks_verified:16,original_source_group_locations_repaired:['L04-S030','L04-S031'],all_L_SSC_IDs:191,unmodified_prior_SSC_records:189,unchanged_L04_original_location_bodies:51,selected_L04_exact_source_groups_remaining:2,hostiles_defined:mutants.length,hostiles_rejected:rejected,whole_six_original_semantic_cold_complete:false,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(issues.length)process.exitCode=1;

