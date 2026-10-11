// IsoGraph Track L G0 — reverse original §7 p15 discussion (SHA-frozen L04 v2).
// One source-first narrative replay, not an expansion into later mathematics.
// Direct original PDF SHA/page/3 block re-extraction plus source→SSC exact role
// mapping, source-modal distinctions, 191-item conservation and hostile checks.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={
 packet:P+'LISI_L04_ORIGINAL_P15_DISCUSSION_FIVE_SOURCE_UNITS_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 historicalCrosswalk:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_16.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_17.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_83.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_84.json',
 oldRegister:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_37.json',
 register:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_38.json',
 oldTraversal:P+'SOURCE_TRAVERSAL_LEDGER_0_54.json',
 traversal:P+'SOURCE_TRAVERSAL_LEDGER_0_55.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_151.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_152.json',
 self:E+'tools/verify-l-g0-l04-original-p15-discussion-source-reverse-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const gitblob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const B=Object.fromEntries(Object.entries(files).map(([k,p])=>[k,gitblob(p)]));
const D=Object.fromEntries(Object.entries(files).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const HASH='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const atoms=[
 ['L04-P015-B001','f77a11597d060336e1df65f09585c9bfc863bdb2518ba336bb16d0cfe2e40679',1,1],
 ['L04-P015-B002','c8980b78050c0d5e204c26070c19ca9e01479a3f89afc1593e8846a9d7f1ae1a',3,32],
 ['L04-P015-B003','20c283b729d105f8d5f550f101819b43b5da7d002c027ca06abd8c1d6297d227',37,37]
];
const ids=['L04-S043','L04-S044','L04-S045','L04-S046','L04-S047'];
const changed=['L04-S043','L04-S045','L04-S046','L04-S047'];
const s43owners=['L-SSC-096','L-SSC-104','L-SSC-105','L-SSC-106','L-SSC-108','L-SSC-111','L-SSC-115','L-SSC-118','L-SSC-120','L-SSC-124'];
const roles=[
 ['C_FOCK','L-SSC-104','particles/antiparticles'],
 ['P_FOCK','L-SSC-105','preserving spin'],
 ['T_FOCK','L-SSC-106','preserving helicity'],
 ['T_SPINOR_VERSUS_ANTIUNITARY','L-SSC-096','antiunitary U_T=gamma13 K'],
 ['CPT_SIGNED_GROUP_VS_PROJECTIVE_EIGHT','L-SSC-108','order 16'],
 ['CHIRED_BIQUATERNION_CONTEXT','L-SSC-111','isomorphism to biquaternionic'],
 ['CPT_P15_EQUALITY_MODALITY','L-SSC-115','C=i e1, P=−K e3, T=−K e2'],
 ['CPTT_GROUP_96','L-SSC-118','order 96'],
 ['TRIALITY_NONFIRST_GEN_WEIGHT_SCOPE','L-SSC-120','nonsensical'],
 ['PHYSICAL_MODEL_CONJECTURE_RECAP','L-SSC-124','proposed']
];
const reviewedDisposition=new Map([
 ['L04-S043','SCOPED_ORIGINAL_P15_DISCUSSION_RECAP_EXACT_SOURCE_SEMANTICS_COLD_CHECKED_WHOLE_L04_OPEN'],
 ['L04-S045','SCOPED_ORIGINAL_P15_POSSIBLE_DIRECT_PRODUCT_SOURCE_MODALITY_COLD_CHECKED_WHOLE_L04_OPEN'],
 ['L04-S046','SCOPED_ORIGINAL_P15_192_WEIGHT_CONDITIONAL_E8_KNOWLEDGE_MODALITY_COLD_CHECKED_WHOLE_L04_OPEN'],
 ['L04-S047','SCOPED_ORIGINAL_P15_SPECULATIVE_UNIFICATION_CLAIM_COLD_CHECKED_WHOLE_L04_OPEN']
]);
function check(z,originalPage){
 const errors=[],req=(v,m)=>{if(!v)errors.push(m);};
 const {packet:p,manifest:m,historicalCrosswalk:x,oldInv:oi,inv:i,oldSSC:os,SSC:ss,oldRegister:or,register:r,oldTraversal:ot,traversal:t,oldGate:og,gate:g}=z;
 req(p?.schema==='isograph.track-L.G0.L04-original-p15-discussion-source-first-reverse.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'L-only exact source scope, nonauthority');
 req(p?.frozen_original?.id==='L04'&&p.frozen_original.revision==='arXiv:2407.02497v2'&&p.frozen_original.PDF_SHA256===HASH&&p.frozen_original.PDF_byte_count===348134&&p.frozen_original.PDF_pages===17&&p.frozen_original.printed_page===15,'frozen original PDF revision/size/page');
 req(p?.independent_source_visually_inspected?.CI_run_id===38120301520&&p.independent_source_visually_inspected.job_id===114413452999&&p.independent_source_visually_inspected.page_image_sha256==='c1157ded51c85ad69e8c748addcd91e6824da3cc255b9ed4248b7c4afb141e23'&&p.independent_source_visually_inspected.original_paper_whole_17_pages_semantic_cold_complete===false,'original independent page-15 visual CI provenance');
 req(p?.provenance?.L04_original_layout_manifest?.git_blob_sha===B.manifest&&p.provenance.L04_full_109_block_crosswalk.git_blob_sha===B.historicalCrosswalk,'original source manifest and historical crosswalk pinned');
 const source=m?.original_sources?.[3],page=source?.original_pdf_extracted_pages?.[14];
 req(source?.id==='L04'&&source.revision==='arXiv:2407.02497v2'&&source.PDF_SHA256===HASH&&source.PDF_byte_count===348134&&source.original_pdf_extracted_pages?.length===17,'original all-six source manifest exact PDF');
 req(typeof originalPage==='string'&&sha256(Buffer.from(originalPage))===page?.original_extracted_page_SHA256&&p.frozen_original.original_page_SHA256===page?.original_extracted_page_SHA256,'ACTUAL original p15 entire source layout SHA');
 const lines=originalPage?.replaceAll('\r','').replace(/\f+$/g,'').split('\n')||[];
 const blocks=[];
 for(const atom of page?.blocks||[]){
   const v=lines.slice(atom.original_extracted_line_start-1,atom.original_extracted_line_end).join('\n');
   req(sha256(Buffer.from(v))===atom.original_source_block_SHA256,'actual frozen original page15 SHA block '+atom.source_atom_id);
   blocks.push([atom.source_atom_id,atom.original_source_block_SHA256,atom.original_extracted_line_start,atom.original_extracted_line_end]);
 }
 req(same(blocks,atoms),'original page15 all 3 frozen exact text blocks and line spans');
 req(same(p?.frozen_original?.source_atoms?.map(q=>[q.id,q.original_text_block_sha256,...q.original_lines]),atoms),'source packet original 3 blocks match independently extracted original');
 const p15Cross=x?.original_first_source_blocks?.filter(z=>z.atom_id.startsWith('L04-P015-'))||[];
 req(same(p15Cross.map(a=>a.atom_id),atoms.map(a=>a[0]))&&p15Cross[0].original_first_role==='ORIGINAL_TEXT_BLOCK_AUTHOR_SEMANTIC_ROLE_TO_EXISTING_SSC'&&p15Cross[1].original_first_role==='ORIGINAL_TEXT_BLOCK_AUTHOR_SEMANTIC_ROLE_TO_EXISTING_SSC'&&p15Cross[2].original_first_role==='DEFENSIBLE_NONLOAD_PAGE_FURNITURE'&&same(p15Cross[1].source_group_ids,ids)&&same(p15Cross[2].source_group_ids,['L04-S053']),'original source heading/entire-discussion/pagination distinguished, historical 109-block crosswalk conserved');
 const raw=originalPage.toLowerCase().replace(/\s+/g,' ');
 for(const phrase of ['fundamental symmetries of a quantum dirac spinor','unitary','antiunitary','8 weights','triality','order 96','standard model','24-cells','e8 theory'])req(raw.includes(phrase),'actual original page15 visible words '+phrase);
 const units=p?.source_first_unit_census||[];
 req(same(units.map(x=>x.id),ids)&&units.length===5,'exact five existing §7 source groups, no invented subdivision');
 req(same(units[0]?.old_ssc_owner_ids,['L-SSC-118','L-SSC-120','L-SSC-124'])&&same(units[0]?.new_ssc_owner_ids,s43owners)&&units[0].original_author_semantics?.length===10,'S043 exact 7 previously missing reciprocal source owner links');
 for(let k=0;k<roles.length;k++){
   const source=units[0]?.original_author_semantics?.[k],ref=roles[k];
   req(source?.role===ref[0]&&source?.existing_ssc===ref[1]&&(source?.source_statement+' '+source?.scope).includes(ref[2]),'visual source p15 load-bearing scope modality '+ref[0]);
 }
 req(same(units[1]?.new_ssc_owner_ids,['L-SSC-116'])&&units[1].original_author_semantics?.[0]?.source_statement?.includes('t∼−'),'prior §6 negative vs §7 positive triality source representatives retained separately');
 req(same(units[2]?.new_ssc_owner_ids,['L-SSC-122'])&&units[2].original_author_semantics?.[0]?.source_statement?.includes('possible')&&units[2].original_author_semantics[0].scope.includes('not algebraic impossibility'),'§7 direct product permitted, author preference only');
 req(same(units[3]?.new_ssc_owner_ids,['L-SSC-123'])&&units[3].original_author_semantics?.length===3&&units[3].original_author_semantics[2].scope.includes('NOT an objective uniqueness theorem')&&units[3].original_author_semantics[1].scope.includes('not empirically established'),'original 192 states & E8 only proposal author knows, conditional not uniqueness theorem');
 req(same(units[4]?.new_ssc_owner_ids,['L-SSC-124'])&&units[4].original_author_semantics?.[0]?.source_statement?.includes('seems likely'),'author physical prediction modality is speculative');
 req(p?.diagnostic?.existing_ssc_owner_reuse===true&&p?.diagnostic?.no_new_typed_occurrence===true&&p?.diagnostic?.new_semantic_omission?.includes('literal equality'),'source indexing versus source interpretation distinct and no new source ID');
 req(p?.conservation?.SSC_unchanged_entire_existing_items===190&&p.conservation.unchanged_original_L04_location_objects===49&&p.conservation.after_L04_mapped_original_groups_cold_open===18,'prior original 49 source locations and 190 complete SSC items unchanged');
 req(p?.locks?.G0_frozen===false&&p.locks.G1_authorized===false&&p.locks.W_semantics_imported===false&&p.locks.PR70_merge_authorized===false&&p.locks.source_physics_or_math_proof_required===false,'no false G0 freeze, G1 or physical theorem');
 req(oi?.locations?.length===53&&i?.locations?.length===53&&os?.items?.length===191&&ss?.items?.length===191,'53 frozen L04 groups and 191 typed original source owners');
 const altered=[],counts={},ownerSet=new Set();
 for(let k=0;k<53;k++){
  const before=oi?.locations?.[k],after=i?.locations?.[k];
  if(!before||!after){req(false,'source location missing '+k);continue;}
  req(before.id===after.id,'source original stable location identity '+k);
  if(!same(before,after))altered.push(after.id);
  counts[after.disposition]=(counts[after.disposition]||0)+1;
  for(const ref of after.ssc_ids||[])ownerSet.add(ref);
 }
 req(same(altered,changed),'only four §7 source groups modified');
 req(Object.keys(counts).length===Object.keys(i.counts.by_disposition||{}).length&&Object.entries(counts).every(([k,v])=>i.counts.by_disposition[k]===v)&&counts.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===18,'finite 53 original source group disposition and 22→18 mapped-cold obligation');
 req(i.counts.remaining_exact_source_groups===0&&i.counts.current_mapped_meaning_groups_source_cold_open===18&&i.original_p15_discussion_cold_review.source_packet.git_blob_sha===B.packet,'current scoped original source evidence and exact-cell scope');
 req(ownerSet.size===34&&same([...ownerSet].sort(),oi.reverse.L04_ssc_ids.slice().sort())&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'34 original L04 SSC roots and global cold fidelity not preclaimed');
 for(const u of units){
  const previous=oi?.locations?.find(x=>x.id===u.id),current=i?.locations?.find(x=>x.id===u.id);
  req(same(previous?.ssc_ids,u.old_ssc_owner_ids)&&same(current?.ssc_ids,u.new_ssc_owner_ids),'exact ORIGINAL location→existing SSC owner array '+u.id);
  if(u.id==='L04-S044'){req(same(previous,current)&&current?.disposition==='PRIOR_OMISSION_NOW_DUAL_SIGN_CONSERVED','unchanged source opposite triality signs preserved');continue;}
  req(current?.disposition===reviewedDisposition.get(u.id)&&current?.original_p15_source_first_evidence?.git_blob_sha===B.packet&&current.original_p15_source_first_evidence.whole_L04_cold_complete===false,'original location source-scoped replay and G0 still open '+u.id);
 }
 const modified=[];for(let k=0;k<191;k++){const prior=os?.items?.[k],curr=ss?.items?.[k];if(!prior||!curr){req(false,'missing original source record '+k);continue;}req(prior.id===curr.id,'old SSC identity preserved '+k);if(!same(prior,curr))modified.push(curr.id);}
 req(same(modified,['L-SSC-115']),'190 original SSC entire records unmodified');
 const record=ss?.items?.find(x=>x.id==='L-SSC-115');
 for(const token of ['§7 p15','C=i e1','P=−K e3','T=−K e2','Eq(6.1)','∼','unrestricted'])req(record?.body?.includes(token),'source-specific representation/equality modality exact SSC115 '+token);
 req(record?.source_expression_census?.L04_P15_ORIGINAL_DISCUSSION_CPT_GENERATOR_MODALITY_0_1?.source_packet?.git_blob_sha===B.packet&&record.source_expression_census.L04_P15_ORIGINAL_DISCUSSION_CPT_GENERATOR_MODALITY_0_1.source_first_inverse.git_blob_sha===B.inv,'current SSC115 p15 source-first reversible proof pointer');
 const scoped=[[104,['particle','antiparticle']],[105,['momentum','helicity']],[106,['spin','helicity']],[96,['U_T^Q','antiunitary']],[108,['order 16','eight']],[111,['biquaternionic']],[118,['96']],[120,['nonsensical']],[124,['proposal']],[122,['mathematical impossibility']],[123,['only current proposal']],[116,['t=+1/2']]];
 for(const [nr,terms]of scoped){const item=ss.items.find(x=>x.id==='L-SSC-'+String(nr).padStart(3,'0'));for(const token of terms)req(item?.body?.toLowerCase().includes(token.toLowerCase()),'earlier SSC semantic owner retains original p15 meaning '+nr+': '+token);}
 req(ss?.schema==='woit-lisi.track-l.source-semantic-census.v0.84'&&ss.predecessor.git_blob_sha===B.oldSSC&&ss.revision.source_packet.git_blob_sha===B.packet&&ss.revision.source_first_inverse.git_blob_sha===B.inv&&ss.guards.source_census_freeze_complete===false,'SSC source lineage, no G0 false source census freeze');
 const l=r?.per_source?.find(x=>x.source==='L04');
 req(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.38'&&r.source_first_predecessor.git_blob_sha===B.oldRegister&&r.current_ssc.git_blob_sha===B.SSC&&r.per_source.length===6&&r.per_source.reduce((a,b)=>a+b.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191,'six original frozen source and 191 SSC denominator');
 req(l?.audit_git_blob_sha===B.inv&&l.classified_source_locations.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===18&&l.original_exact_cell_expression_groups_not_yet_independently_verified===0&&r.per_source.every(x=>x.original_complete_cold_review_passed===false),'18 cold-open L04 mapped groups, 0/6 original whole source cold passes');
 req(r.exit_acceptance_contract.G0_SSC_frozen===false&&r.explicit_locks.G1_authorized===false,'no G0 freeze or higher stages from page15 scoped review');
 req(t?.schema==='lisi.full-treatment.source-traversal-ledger.v0.55'&&t.predecessor_exact.git_blob_sha===B.oldTraversal&&t.current_census.git_blob_sha===B.SSC&&t.current_L04_source_first_inventory.git_blob_sha===B.inv&&t.current_G0_six_original_finite_convergence.git_blob_sha===B.register&&t.complete_sources===0,'L current traversal exact predecessor/source pointers and no full cold qualification');
 req(g?.schema==='isograph.exp062-l-current-stage-gate.v0.152'&&g.predecessor_gate.git_blob_sha===B.oldGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.register&&g.current_traversal.git_blob_sha===B.traversal&&g.current_L04_source_first.git_blob_sha===B.inv&&g.p15_source_packet.git_blob_sha===B.packet&&g.p15_source_verifier.git_blob_sha===B.self,'G0 gate pins exact entire current p15 source/provenance and checker');
 req(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new scoped CI pending, no preclaimed global PASS');
 return errors;
}
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-Lisi-G0-p15-original-'));
let originalPage,sourceBinaryOK=false;
try{
 const result=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(result.status!==200)throw Error('FROZEN_SOURCE_HTTP_'+result.status);
 const bytes=Buffer.from(await result.arrayBuffer());
 if(bytes.length!==348134||sha256(bytes)!==HASH)throw Error('FROZEN_PDF_WRONG_REVISION_OR_CONTENT_SHA');
 sourceBinaryOK=true;
 const file=path.join(temp,'L04-2407v2.pdf');fs.writeFileSync(file,bytes);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('SOURCE_FROZEN_17_PAGE_COUNT_FAIL');
 originalPage=execFileSync('pdftotext',['-f','15','-l','15','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:13000,maxBuffer:1000000});
}finally{fs.rmSync(temp,{recursive:true,force:true});}
const errors=check(D,originalPage);
const hostile=[
 ['remove_repeated_unitary_source_owner',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids=z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.filter(x=>x!=='L-SSC-096')],
 ['remove_repeated_QFT_C',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids=z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.filter(x=>x!=='L-SSC-104')],
 ['remove_repeated_QFT_P',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids=z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.filter(x=>x!=='L-SSC-105')],
 ['remove_repeated_QFT_T',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids=z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.filter(x=>x!=='L-SSC-106')],
 ['remove_CPT16_vs8_owner',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids=z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.filter(x=>x!=='L-SSC-108')],
 ['remove_chiral_isomorphism_owner',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids=z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.filter(x=>x!=='L-SSC-111')],
 ['remove_CPT_equality_owner',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids=z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.filter(x=>x!=='L-SSC-115')],
 ['invent_extra_source_owner',z=>z.inv.locations.find(x=>x.id==='L04-S043').ssc_ids.push('L-SSC-191')],
 ['collapse_time_antiunitary',z=>z.packet.source_first_unit_census[0].original_author_semantics[3].source_statement='all time unitary'],
 ['change_signed_CPT_group_order',z=>z.packet.source_first_unit_census[0].original_author_semantics[4].source_statement='only order 8 group'],
 ['drop_p15_equality',z=>z.packet.source_first_unit_census[0].original_author_semantics[6].source_statement='C∼i e1; P∼-K e3; T∼-K e2'],
 ['drop_96_group_order',z=>z.packet.source_first_unit_census[0].original_author_semantics[7].source_statement='order 48'],
 ['erase_negative_other_gens',z=>z.packet.source_first_unit_census[0].original_author_semantics[8].source_statement='all three gen direct Lorentz'],
 ['replace_alternative_possible_with_impossible',z=>z.packet.source_first_unit_census[2].original_author_semantics[0].source_statement='CPT×A4 algebraically impossible'],
 ['falsify_E8_uniqueness_scope',z=>z.packet.source_first_unit_census[3].original_author_semantics[2].scope='Proven objective uniqueness theorem'],
 ['turn_speculation_into_proof',z=>z.packet.source_first_unit_census[4].original_author_semantics[0].source_statement='proven fundamental SM symmetry'],
 ['replace_historical_t_sign',z=>z.packet.source_first_unit_census[1].original_author_semantics[0].source_statement='both source sections t=+1/2'],
 ['delete_original_p15_body_block',z=>z.manifest.original_sources[3].original_pdf_extracted_pages[14].blocks.splice(1,1)],
 ['alter_frozen_PDF_digest',z=>z.packet.frozen_original.PDF_SHA256='WRONG'],
 ['replace_original_source_revision',z=>z.packet.frozen_original.revision='arXiv:2407.02497v1'],
 ['alter_actual_p15_layout_hash',z=>z.manifest.original_sources[3].original_pdf_extracted_pages[14].original_extracted_page_SHA256='WRONG'],
 ['alter_p15_body_source_block_hash',z=>z.packet.frozen_original.source_atoms[1].original_text_block_sha256='WRONG'],
 ['make_page_furniture_original_assertion',z=>z.historicalCrosswalk.original_first_source_blocks.find(x=>x.atom_id==='L04-P015-B003').original_first_role='ORIGINAL_TEXT_BLOCK_AUTHOR_SEMANTIC_ROLE_TO_EXISTING_SSC'],
 ['corrupt_original_unaffected_group',z=>z.inv.locations.find(x=>x.id==='L04-S008').original_source_semantic_group+=' FALSIFIED'],
 ['alter_S044_historical_two_triality_signs',z=>z.inv.locations.find(x=>x.id==='L04-S044').original_source_semantic_group+=' TYPO'],
 ['alter_unrelated_SSC',z=>z.SSC.items.find(x=>x.id==='L-SSC-108').body+=' UNSOURCED'],
 ['remove_SSC115_source_notation',z=>z.SSC.items.find(x=>x.id==='L-SSC-115').body='Only tilde notation'],
 ['wrong_L04_mapped_count',z=>z.register.per_source.find(x=>x.source==='L04').classified_source_locations.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
 ['pretend_SSC192',z=>z.SSC.item_count=192],
 ['pretend_all_six_source_cold',z=>z.register.per_source[3].original_complete_cold_review_passed=true],
 ['pretend_global_G0_freeze',z=>z.gate.current_lawful_state.G0_frozen=true],
 ['premature_G1',z=>z.gate.current_lawful_state.G1_authorized=true],
 ['pretend_PR_merge_authorized',z=>z.gate.current_lawful_state.PR70_merge_authorized=true],
 ['CI_success_without_result',z=>z.gate.new_source_CI.status='SUCCESS']
];
let rejected=0;
if(errors.length===0)for(const [name,mutate]of hostile){const z=structuredClone(D);try{mutate(z);if(check(z,originalPage).length)rejected++;else errors.push('HOSTILE_ESCAPE '+name);}catch(e){errors.push('CHECKER_RUNTIME_EXCEPTION '+name+': '+e.message);}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04.original-p15-discussion-reverse.v0.1',PASS:errors.length===0,issues:errors,source_PDF_SHA256_verified:sourceBinaryOK,original_page:15,original_page_blocks_reextracted:3,original_p15_existing_groups_reviewed:5,existing_SSC_owner_links_added:7,prior_mapped_original_groups_open:22,current_mapped_original_groups_open:18,unchanged_existing_L04_original_groups:49,unchanged_entire_L_SSC_records:190,new_typed_source_ids:0,hostiles_defined:hostile.length,hostiles_rejected:rejected,all_six_frozen_sources:6,source_first_groups:350,SSC_total:191,global_G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false,whole_original_source_semantic_cold_complete:false},null,2));
if(errors.length)process.exitCode=1;
