// L-only G0 §5 p11 original Eq5.4 chiral helicity operator and weight source fidelity.
// Freeze original PDF v2, its entire page 11 and all seven original text blocks.
// Re-render original source visual for author printed binder fidelity. Non-physics proof.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_P11_EQ5_4_OPERATOR_WEIGHT_AND_T2_SOURCE_G0_0_2.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 blocks:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
 cube:P+'LISI_L04_ORIGINAL_CPT_CUBE_8_VERTEX_28_EDGE_SOURCE_G0_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_15.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_16.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_83.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_82.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_36.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_37.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_53.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_54.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_149.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_150.json',
 self:E+'tools/verify-l-g0-l04-original-p11-Eq5_4-source-0-2.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const B=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,gitsha(v)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,v])=>[k,read(v)]));
const ORIGINAL='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const PAGE='56f1289518a0e92e840f0a5325bcd6b243429613be4f19304e267a91fb8594d0';
const PNG='135d6d31489136b84f60c225d495d234b14e41b7e082b08101ad8c8d37eb9f0b';
const expected=[
 ['C','(a_hat_{L/R}^{wedge/vee})^C','bar_a_hat_{L/R}^{wedge/vee}','no explicit i','L/R unchanged','wedge/vee unchanged','particle annihilation -> antiparticle annihilation','(omega_T,omega_S,h,q)->(omega_T,omega_S,h,-q)'],
 ['P','(a_hat_{L/R}^{wedge/vee})^P','(-i) a_hat_{R/L}^{wedge/vee}','-i','L/R swaps to R/L under momentum reflection','wedge/vee unchanged','particle annihilation persists','(omega_T,omega_S,h,q)->(-omega_T,omega_S,-h,q)'],
 ['T','(a_hat_{L/R}^{wedge/vee})^T','(-/+) a_hat_{L/R}^{vee/wedge}','upper source (-), lower source (+); paired ∓','L/R unchanged','wedge/vee swaps to vee/wedge','particle annihilation persists','(omega_T,omega_S,h,q)->(-omega_T,-omega_S,h,q)']
];
const oldMapped='MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS';
const corrected={
 'L04-S024':'SCOPED_ORIGINAL_EQ5_4_SIGNED_HELICITY_AND_WEIGHT_ACTIONS_COLD_SOURCE_RECONCILED_WHOLE_OPEN',
 'L04-S025':'SCOPED_ORIGINAL_T_SQUARED_QUATERNIONIC_AUTHOR_CLAIM_COLD_VERIFIED_WHOLE_OPEN'
};
function verify(z,actual,visual){
 const issues=[],ck=(v,s)=>{if(!v)issues.push(s)};
 const {packet:s,manifest:m,blocks:cross,cube:q,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 ck(s?.schema==='isograph.track-L.G0.L04-original-p11-Eq5_4-operator-weight-and-Tsquare-source.v0.2'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'source-only G0 L04 qualification and authority');
 ck(s?.frozen_original?.id==='L04'&&s.frozen_original.revision==='arXiv:2407.02497v2'&&s.frozen_original.PDF_SHA256===ORIGINAL&&s.frozen_original.PDF_bytes===348134&&s.frozen_original.PDF_pages===17&&s.frozen_original.original_page===11&&s.frozen_original.original_page_SHA256===PAGE&&s.frozen_original.original_manifest.git_blob_sha===B.manifest,'strict frozen original PDF revision/page/bytes');
 ck(s?.source_visual_provenance?.all17_independent_visual_CI_run===38120301520&&s.source_visual_provenance.original_p11_job===114413453012&&s.source_visual_provenance.original_p11_png_SHA256===PNG&&s.source_visual_provenance.original_p11_png_bytes===238652&&s.source_visual_provenance.independent_whole_source_semantic_pass===false,'original visual all17 immutable historical success without false cold');
 const org=m?.original_sources?.[3],page=org?.original_pdf_extracted_pages?.[10];
 ck(org?.id==='L04'&&org.revision==='arXiv:2407.02497v2'&&org.PDF_SHA256===ORIGINAL&&org.PDF_byte_count===348134&&org.original_pdf_extracted_pages.length===17,'manifest original source exact binary');
 ck(sha(Buffer.from(actual))===PAGE&&page?.original_extracted_page_SHA256===PAGE&&page?.blocks?.length===7,'ACTUAL independent frozen PDF page11 text SHA and all seven source blocks');
 ck(sha(visual)===PNG&&visual.length===238652,'ACTUAL original PDF p11 165dpi visual SHA and source-cell signs');
 const lines=actual.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const rows=s?.source_atom_partition?.source_atoms_by_role||[];
 ck(rows.length===7&&s?.source_atom_partition?.complete_original_p11_atoms===7,'seven original page11 text blocks represented, not selected formulas only');
 for(let k=0;k<7;k++){
  const one=page?.blocks?.[k],other=rows[k];
  if(!one||!other){ck(false,'missing original page11 source atom '+k);continue;}
  const content=lines.slice(one.original_extracted_line_start-1,one.original_extracted_line_end).join('\n');
  ck(sha(Buffer.from(content))===one.original_source_block_SHA256&&other.id===one.source_atom_id&&other.sha===one.original_source_block_SHA256,'original PDF physical block SHA '+one.source_atom_id);
  const crossRef=cross?.original_first_source_blocks?.find(x=>x.atom_id===other.id);
  ck(!!crossRef&&crossRef.source_original_text_block_SHA256===one.original_source_block_SHA256&&eq(crossRef.source_group_ids,other.source_claim_groups),'independent frozen original source→SSC role crosswalk '+other.id);
 }
 ck(rows[0]?.shared_block_distinct_source_semantic_roles===true&&eq(rows[0]?.SSC_owners,['L-SSC-107','L-SSC-106'])&&rows[6]?.nonload_page_furniture===true&&eq(rows[6]?.source_claim_groups,['L04-S053']),'same original p11 block has TWO semantic obligations and footer separate');
 ck(s?.source_atom_partition?.existing_original_all109_block_crosswalk?.git_blob_sha===B.blocks&&s.source_atom_partition.existing_CPT_cube_figure_source.git_blob_sha===B.cube,'historical source crosswalk and eight-vertex cube evidence reused, not duplicated');
 ck(q?.figure?.source_Equation_5_4?.scope?.includes('along z')&&q.figure.vertices?.length===8&&q.figure.incidence_edges?.length===28,'already independent source CPT cube and source Eq5.4 weight maps preserved');
 const source=s?.source_original_s024;
 ck(source?.source_group==='L04-S024'&&source.existing_SSC_owner==='L-SSC-107'&&source.author_equation==='(5.4)'&&source.source_scope.includes('along or against z-axis'),'source Eq5.4 original domain and existing owner');
 const ops=source?.three_original_coupled_operator_rows||[];
 ck(ops.length===3,'all original three Eq5.4 source operator rows retained');
 for(let k=0;k<3;k++){
  const got=ops[k],exp=expected[k];
  if(!got){ck(false,'missing original operator row '+k);continue;}
  const vals=[got.operator,got.left,got.right,got.phase,got.helicity_branch,got.spinor_updown,got.sector,got.weight_map];
  ck(eq(vals,exp),'full exact source Eq5.4 operator/weight/side/phase/index/coupling row '+exp[0]);
  const fromCube=q.figure.source_Equation_5_4[got.operator];
  ck(fromCube===got.weight_map,'source Eq5.4 original weight map agrees with already qualified original cube '+got.operator);
 }
 ck(source?.source_negative_claims?.length===3&&source.source_negative_claims[0].includes('16-element')&&source.source_negative_claims[1].includes('distinct source indices'),'8 projective coordinate actions not source 16-element signed operator lift; index firewall');
 const time=s?.source_original_s025;
 ck(time?.source_group==='L04-S025'&&time.existing_SSC_owner==='L-SSC-106'&&time.original_author_assertion==='The existence of this antiunitary time conjugation operator, T, squaring to minus one, implies our fermion representation space is quaternionic.'&&time.source_symbolic.startsWith('T^2=-1')&&time.source_citation==='[4] author-cited reference role only; do not import that reference\'s mathematical claims into L04','original p11 antiunitary time square and source-native citation role');
 ck(time?.existing_SSC_meaning_already_present===true&&time.no_new_SSC_item_or_body_rewrite_justified===true&&time.qualification.includes('not a proof'),'negative/uncertain author status properly distinguished from missing source');
 ck(s?.systematic_omission_method?.class==='MAPPED_MEANING_STATUS_MASKS_P11_EXACT_OPERATOR_INDEX_BINDERS'&&s.systematic_omission_method.prevention.includes('even for MAPPED_MEANING rows'),'systematic finite source-first mapped semantic class repaired');
 ck(s?.conservation?.all_source_first_groups===350&&s.conservation.original_L04_groups===53&&s.conservation.all_SSC_IDs===191&&s.conservation.unchanged_complete_other_L04_source_groups===51&&s.conservation.unchanged_entire_other_SSC_records===190&&s.conservation.new_typed_SSC_IDs===0&&s.conservation.old_L04_mapped_unverified_groups===24&&s.conservation.new_L04_mapped_unverified_groups===22,'finite conservation scope with no new SSC');
 ck(s?.stage_locks?.G0_frozen===false&&s.stage_locks.G1_authorized===false&&s.stage_locks.other_track_W_imported===false&&s.stage_locks.whole_L04_original_semantic_cold_pass===false&&s.stage_locks.physics_theorem_proof_required_at_G0===false&&s.stage_locks.PR70_merge_authorized===false,'cold stage and no physical theory G0 requirement');
 ck(oi?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'all frozen L04 group/SSC identities conserved');
 const changedLocations=[],dispositions={},owners=new Set();
 for(let k=0;k<53;k++){
  const old=oi?.locations?.[k],cur=i?.locations?.[k];
  if(!old||!cur){ck(false,'missing source group '+k);continue;}
  ck(old.id===cur.id,'original stable location id '+k);
  if(!eq(old,cur))changedLocations.push(cur.id);
  dispositions[cur.disposition]=(dispositions[cur.disposition]||0)+1;
  for(const id of cur.ssc_ids||[])owners.add(id);
 }
 ck(eq(changedLocations,['L04-S024','L04-S025']),'all 51 other complete source group records conserved');
 ck(dispositions[oldMapped]===22&&Object.keys(dispositions).length===Object.keys(i?.counts?.by_disposition||{}).length&&Object.entries(dispositions).every(([key,count])=>i.counts.by_disposition[key]===count)&&i.counts.remaining_exact_source_groups===0,'mapped pending count derived from actual 53 original source dispositions');
 ck(eq([...owners].sort(),oi?.reverse?.L04_ssc_ids?.slice().sort())&&owners.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'bidirectional L04 source role owner conservation but global cold PASS not fabricated');
 for(const id of ['L04-S024','L04-S025']){
  const row=i?.locations?.find(x=>x.id===id),old=oi?.locations?.find(x=>x.id===id);
  ck(old?.disposition===corrected[id]&&row?.disposition===corrected[id]&&eq(row.ssc_ids,[id==='L04-S024'?'L-SSC-107':'L-SSC-106'])&&row.original_p11_Eq5_4_source_evidence.git_blob_sha===B.packet&&row.original_p11_Eq5_4_source_evidence.whole_source_cold_complete===false,'source prior mapped row exact role and scoped advance '+id);
 }
 ck(i?.original_p11_Eq5_4_source_first?.git_blob_sha===B.packet&&i.original_p11_Eq5_4_source_first.other_mapped_meaning_original_groups_unqualified===22,'inverse original primary source packet pointer');
 const diff=[];
 for(let k=0;k<191;k++){
  const old=o?.items?.[k],cur=n?.items?.[k];
  if(!old||!cur){ck(false,'missing SSC item '+k);continue;}
  ck(old.id===cur.id,'previous type identity '+k);
  if(!eq(old,cur))diff.push(cur.id);
 }
 ck(eq(diff,['L-SSC-107']),'190 entire other existing SSC objects unchanged (including original SSC106 T²)');
 const record=n?.items?.find(x=>x.id==='L-SSC-107'),oldT=o?.items?.find(x=>x.id==='L-SSC-106');
 for(const bit of ['Eq(5.4)','bar_a_hat_{L/R}','−i a_hat_{R/L}','∓ a_hat_{L/R}','(−ωT,−ωS,h,q)','along or against z','16-element'])ck(record?.body?.includes(bit),'exact source original index/sign/binder in existing SSC107 '+bit);
 ck(oldT?.body?.includes('T²=−1')&&eq(oldT,n.items.find(x=>x.id==='L-SSC-106')),'p11 T square antiunitary author claim was ALREADY represented, no unnecessary rewrite');
 ck(n.items.find(x=>x.id==='L-SSC-107')?.body===o.items.find(x=>x.id==='L-SSC-107')?.body,'original author Eq5.4 semantic body must remain unchanged on packet SHA correction');
 ck(s.predecessor_unqualified_original_packet?.git_blob_sha==='1cba00ecf087e9bb204171b0c905cb45faab2f1c'&&s.original_block_hash_transcription_correction?.repaired_atom_hashes?.length===2,'retained first failed original packet and two SHA copy corrections');
 const pointer=record?.source_expression_census?.L04_ORIGINAL_EQ5_4_P11_HELICITY_WEIGHT_REVERSE_0_1;
 ck(pointer?.source_packet?.git_blob_sha===B.packet&&pointer.source_first_inverse.git_blob_sha===B.inv&&pointer.original_source_atom==='L04-P011-B001'&&pointer.whole_source_COLD_complete===false,'original SSC107 claim evidence original source recoverable pointer');
 ck(n?.schema==='woit-lisi.track-l.source-semantic-census.v0.83'&&n.predecessor.git_blob_sha===B.oldSSC&&n.revision.source_packet.git_blob_sha===B.packet&&n.revision.source_first_inverse.git_blob_sha===B.inv&&n.guards.source_census_freeze_complete===false,'exact SSC predecessor, source and no freeze');
 const l=r?.per_source?.find(x=>x.source==='L04');
 ck(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.37'&&r.source_first_predecessor.git_blob_sha===B.oldReg&&r.current_ssc.git_blob_sha===B.SSC&&r.per_source.length===6&&r.per_source.reduce((sum,x)=>sum+x.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191&&l.audit_git_blob_sha===B.inv&&l.classified_source_locations[oldMapped]===22&&l.original_exact_cell_expression_groups_not_yet_independently_verified===0,'current finite source global denominator and meaningful 24→22 mapped convergence');
 ck(r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_complete===false&&r.explicit_locks.G1_authorized===false,'no whole source cold pass or G1');
 ck(v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.54'&&v.predecessor_exact.git_blob_sha===B.oldTr&&v.current_census.git_blob_sha===B.SSC&&v.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&v.current_L04_source_first_inventory.git_blob_sha===B.inv&&v.complete_sources===0,'current traversal exact source-file parents and freeze open');
 ck(g?.schema==='isograph.exp062-l-current-stage-gate.v0.150'&&g.predecessor_gate.git_blob_sha===B.oldGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.p11_weight_source_packet.git_blob_sha===B.packet&&g.p11_weight_source_verifier.git_blob_sha===B.self,'current G0 gate source and checker SHA');
 ck(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new verifier success not preclaimed');
 return issues;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-original-p11-semantic-'));
let originalPage='',imageBytes=Buffer.alloc(0);
try{
 const resp=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(resp.status!==200)throw Error('ORIGINAL_SOURCE_HTTP_'+resp.status);
 const bytes=Buffer.from(await resp.arrayBuffer());
 if(bytes.length!==348134||sha(bytes)!==ORIGINAL)throw Error('ORIGINAL_FROZEN_REVISION_OR_BYTES_CHANGED');
 const pdf=path.join(dir,'L04.pdf');fs.writeFileSync(pdf,bytes);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_WRONG_PAGE_COUNT');
 originalPage=execFileSync('pdftotext',['-f','11','-l','11','-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:15000,maxBuffer:1200000});
 const prefix=path.join(dir,'source-original-p11');
 execFileSync('pdftoppm',['-f','11','-l','11','-r','165','-png','-singlefile',pdf,prefix],{timeout:25000,maxBuffer:3000000});
 imageBytes=fs.readFileSync(prefix+'.png');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=verify(D,originalPage,imageBytes);
const mutants=[
 ['wrong_C_antiparticle',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[0].right='a_hat same particle'],
 ['wrong_C_charge_flip',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[0].weight_map='q preserved'],
 ['wrong_C_helicity',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[0].helicity_branch='L/R swapped'],
 ['wrong_P_minus_i',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[1].right='(+i) a_hat_{R/L}^{wedge/vee}'],
 ['wrong_P_helicity_index',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[1].right='(-i) a_hat_{L/R}^{wedge/vee}'],
 ['wrong_P_updown',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[1].spinor_updown='wedge/vee swapped'],
 ['wrong_P_weight',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[1].weight_map='wrong'],
 ['wrong_T_sign_coupling',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[2].phase='upper+ lower-'],
 ['wrong_T_spinor_swap',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[2].right='(-/+) a_hat_{L/R}^{wedge/vee}'],
 ['wrong_T_helicity',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[2].helicity_branch='R/L'],
 ['wrong_T_weight',d=>d.packet.source_original_s024.three_original_coupled_operator_rows[2].weight_map='wrong'],
 ['wrong_T_square',d=>d.packet.source_original_s025.source_symbolic='T^2=+1'],
 ['wrong_T_source_modality',d=>d.packet.source_original_s025.original_author_assertion=d.packet.source_original_s025.original_author_assertion.replace('antiunitary','unitary')],
 ['invent_T_author_thm',d=>d.packet.source_original_s025.qualification='proven physical theorem'],
 ['misclassify_source_citation',d=>d.packet.source_original_s025.source_citation='[4] semantic authority adopted'],
 ['misconstrue_lift',d=>d.packet.source_original_s024.source_negative_claims[0]='8 weights equal 16 signed group'],
 ['expand_outside_z',d=>d.packet.source_original_s024.source_scope='all momenta'],
 ['missing_shared_block_owner',d=>d.packet.source_atom_partition.source_atoms_by_role[0].SSC_owners=['L-SSC-107']],
 ['drop_p11_source_atom',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[10].blocks.pop()],
 ['replace_source_revision',d=>d.packet.frozen_original.revision='arXiv:2407.02497v1'],
 ['change_original_page_SHA',d=>d.manifest.original_sources[3].original_pdf_extracted_pages[10].original_extracted_page_SHA256='wrong'],
 ['change_visual_original_SHA',d=>d.packet.source_visual_provenance.original_p11_png_SHA256='wrong'],
 ['wrong_old_SSC_provenance',d=>d.SSC.predecessor.git_blob_sha='wrong'],
 ['tamper_other_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-106').body+=' forged'],
 ['tamper_other_original_group',d=>d.inv.locations.find(x=>x.id==='L04-S023').original_source_semantic_group+=' wrong'],
 ['erase_p11_SSC_owner',d=>d.inv.locations.find(x=>x.id==='L04-S024').ssc_ids=[]],
 ['pretend_24_mapped_remain',d=>d.reg.per_source.find(x=>x.source==='L04').classified_source_locations.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=24],
 ['forge_global_cold',d=>d.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['forge_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['forge_G0',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['forge_PRmerge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true],
 ['forge_CI_SUCCESS',d=>d.gate.new_source_CI.status='SUCCESS']
];
let rejected=0;
if(errors.length===0)for(const [name,change]of mutants){const z=structuredClone(D);try{change(z);if(verify(z,originalPage,imageBytes).length)rejected++;else errors.push('HOSTILE_ESCAPE '+name);}catch(e){errors.push('HOSTILE_CHECKER_EXCEPTION '+name+' '+e.message);}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-p11-Eq5_4-CPT-helicity-source-0.2',PASS:errors.length===0,issues:errors,original_revision_exact_SHA_qualified:true,source_original_p11_layout_blocks_sha_rechecked:7,original_p11_primary_visual_SHA_qualified:sha(imageBytes)===PNG,original_semantic_group_repaired:'L04-S024',original_semantic_group_preexisting_meaning_cold_verified:'L04-S025',changed_existing_SSC:['L-SSC-107'],unchanged_entire_other_SSC:190,unchanged_entire_L04_source_groups:51,original_L04_mapped_source_groups_unverified:22,hostiles_defined:mutants.length,hostiles_rejected:rejected,whole_original_L04_semantic_cold_pass:false,full_six_original_cold_pass:false,G0_frozen:false,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;

