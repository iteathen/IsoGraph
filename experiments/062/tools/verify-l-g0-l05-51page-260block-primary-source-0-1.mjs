// L-only G0 frozen original L05 publisher version-of-record recovery,
// 51 exact pages/260 primary text blocks and 38 existing SSC owner frontier.
// Original page/atom layout role is NOT semantic cold review or a new source SI.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 prior:P+'LISI_L05_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 inv:P+'LISI_L05_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',
 atom:P+'LISI_L05_FROZEN_VOR_260_BLOCK_SOURCE_TO_SSC_FRONTIER_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 proof:E+'L_G0_SIX_FROZEN_ORIGINAL_PDF_BINARY_PROVENANCE_0_1.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_54.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_77.json',
 prevReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_30.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_31.json',
 prevTr:P+'SOURCE_TRAVERSAL_LEDGER_0_47.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_48.json',
 prevGate:E+'L_CURRENT_STAGE_GATE_0_137.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_138.json',
 self:E+'tools/verify-l-g0-l05-51page-260block-primary-source-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const blob=p=>{const bytes=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes])).digest('hex')};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const B=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const SHA='03f6ffbb04640051101e20985556d8dec81631adbe44672b907204e9e84cf880',SIZE=1432661;
function verify(z,pages){
 const bad=[],ck=(v,m)=>{if(!v)bad.push(m)};
 const {prior:o,inv:i,atom:a,manifest:m,proof:q,oldSSC:oc,SSC:n,prevReg:pr,reg:r,prevTr:pt,tr:t,prevGate:pg,gate:g}=z;
 ck(o?.schema==='isograph.track-L.G0.L05-journal-version-of-record-source-first-reverse.v0.2'&&i?.schema==='isograph.track-L.G0.L05-journal-version-of-record-source-first-reverse.v0.3'&&i?.track==='L'&&i?.stage==='G0'&&i?.semantic_authority===false,'L05 only G0 nonauthority provenance upgrade');
 ck(o?.original_source?.publisher_original_full_PDF_sha256_verified===false&&o.original_source.source_revision_provenance_complete_at_byte_level===false&&i.original_source.publisher_original_full_PDF_sha256_verified===true&&i.original_source.source_revision_provenance_complete_at_byte_level===true,'historical false preserved while exact current source byte proven');
 ck(i?.predecessor_current?.git_blob_sha===B.prior&&i.predecessor_current.prior_byte_provenance_false_preserved_historically===true,'provenance-only precursor byte SHA');
 ck(i?.original_source?.publisher_original_binary_SHA256===SHA&&i.original_source.publisher_original_binary_byte_count===SIZE&&i.original_source.original_exact_pages_independently_verified===51&&i.original_source.qualifying_source_binary_CI_run_id===38046224902&&i.original_source.arxiv_is_not_assumed_byte_identical_to_published_VOR===true,'published original bytes exactly qualified, never substituted with preprint');
 ck(i?.original_source?.external_independent_complete_original_pdf_semantic_review_passed===false&&i?.convergence?.whole_original_semantic_cold_complete===false,'no false original semantics whole cold pass');
 ck(i?.current_source_provenance?.source_binary_proof?.git_blob_sha===B.proof&&i.current_source_provenance.source_binary_proof.run_id===38046224902&&i.current_source_provenance.source_binary_proof.conclusion==='success'&&i.current_source_provenance.manifest.git_blob_sha===B.manifest,'exact historical source/authority route');
 ck(q?.schema==='isograph.exp062.L.G0.six-official-frozen-original-PDF-binary-provenance-qualified.v0.1'&&q.exact_CI.run_id===38046224902&&q.exact_CI.conclusion==='success'&&q.source_manifest.all_six_official_exact_PDF_bytes_retrieved===true,'qualified six-original SHA evidence');
 const source=(m?.original_sources||[])[4], proof=(q?.original_sources||[]).find(z=>z.id==='L05');
 ck(source?.id==='L05'&&proof?.id==='L05'&&source.PDF_SHA256===SHA&&source.PDF_byte_count===SIZE&&source.original_PDF_pages===51&&source.original_pdf_layout_blocks===260&&source.original_pdf_nonblank_lines===2583&&source.revision===proof.frozen_revision&&source.original_official_url===proof.official_exact_version_URL&&proof.source_binary_byte_count===SIZE&&proof.SHA256_exact_official_binary===SHA&&proof.independently_extracted_original_PDF_pages===51&&proof.original_binary_revision_page_qualified===true,'exact original publisher VOR SHA/DOI/size/page/revision not preprint');
 ck(a?.schema==='isograph.track-L.G0.L05.finite-publisher-original-260-block-to-51-page-SSC-frontier.v0.1'&&a?.track==='L'&&a.stage==='G0'&&a.semantic_authority===false&&a.frozen_original_manifest.git_blob_sha===B.manifest&&a.predecessor_page_owner_inventory.git_blob_sha===B.prior,'original 260 atom frontier parent sha');
 ck(a?.historical_source_original_binary_qualification?.git_blob_sha===B.proof&&a.historical_source_original_binary_qualification.run_id===38046224902&&a.historical_source_original_binary_qualification.conclusion==='success','block frontier original revision authority');
 ck(i?.source_260_original_block_frontier?.git_blob_sha===B.atom&&i.source_260_original_block_frontier.original_layout_blocks===260&&i.source_260_original_block_frontier.original_block_semantic_cold_qualified_count===0,'indexed 260 original atoms distinct from cold semantics');
 ck(a?.counts?.original_L05_publisher_pages===51&&a.counts.original_L05_layout_blocks===260&&a.counts.original_L05_nonblank_pdf_lines===2583&&a.counts.original_page_source_units_unchanged===51&&a.counts.candidate_legacy_SSC_owners===38&&a.counts.L_all_current_SSC_identities===191&&a.counts.source_semantics_independently_cold_qualified_block_count===0,'correct finite denominator not semantic claims');
 ck(a?.source_first_method?.layout_blocks_are_not_new_frozen_scope_units===true&&a.source_first_method.correspondence_complete_only_at_parent_page_role_level===true&&a.source_first_method.preexisting_source_research_may_already_contain_exact_formulas===true&&a.source_first_method.source_semantic_fidelity_global_PASS===false,'source-first coverage doesn't claim semantic completeness');
 ck(a?.qualification_limits?.G0_frozen===false&&a.qualification_limits.G1_authorized===false&&a.qualification_limits.W_semantics_imported===false&&a.qualification_limits.PR70_merge_authorized===false,'strict L G0 stage only');
 for(const key of ['page_source_units','original_tables','original_figures','original_equation_index_candidate','source_specific_ambiguity_inconsistency_and_negative_claims'])ck(eq(i?.[key],o?.[key]),'51 original full page groups and all table/figure/equation/negative original evidence conserved '+key);
 ck(o?.page_source_units?.length===51&&i?.page_source_units?.length===51&&a?.original_first_layout_blocks?.length===260,'51 original pages and 260 source blocks preserved, no source inflation');
 const sOld=(oc?.items||[]).filter(x=>/^L05(?:\s|$|§)/.test(x.source_provenance));
 const sNew=(n?.items||[]).filter(x=>/^L05(?:\s|$|§)/.test(x.source_provenance));
 ck(sOld.length===38&&sNew.length===38&&sOld.every((x,k)=>eq(x,sNew[k]))&&n.items.length===191&&i?.current_original_L05_SSC_identity_conservation?.identical_38_whole_record_objects===true&&i.current_original_L05_SSC_identity_conservation.current_census_sha===B.SSC,'38 entire L05 source SSC records literally unchanged from census54 to77');
 const originalAtoms=a?.original_first_layout_blocks||[];
 let index=0,layoutCount=0;const parentOwners=new Set(),sourceIds=new Set(),backward={};
 for(let p=0;p<51;p++){
  const srcPage=source?.original_pdf_extracted_pages?.[p],mapped=i?.page_source_units?.[p],raw=pages?.[p];
  const pageID='L05-P'+String(p+1).padStart(2,'0');
  if(!srcPage||!mapped){ck(false,'missing frozen original page or inventory '+p);continue;}
  ck(srcPage.PDF_page_zero_based===p&&mapped.id===pageID&&mapped.pdf_page_zero_based===p,'original precise page parent '+p);
  ck(typeof raw==='string'&&sha(Buffer.from(raw))===srcPage.original_extracted_page_SHA256,'fresh original VOR full PDF PAGE text SHA '+p);
  const lines=raw?.replaceAll('\r','').replace(/\f+$/g,'').split('\n')||[];
  for(const owner of mapped.existing_SSC_ids||[]){parentOwners.add(owner);(backward[owner]??=[]).push(pageID);}
  for(let nblock=0;nblock<srcPage.blocks.length;nblock++){
   const z=srcPage.blocks[nblock],row=originalAtoms[index++],id=z.source_atom_id;
   if(!row){ck(false,'missing new original 260 source text atom '+id);continue;}
   ck(!sourceIds.has(row.atom_id)&&row.atom_id===id,'unique frozen text block '+id);sourceIds.add(row.atom_id);
   const literal=lines.slice(z.original_extracted_line_start-1,z.original_extracted_line_end).join('\n');
   ck(sha(Buffer.from(literal))===z.original_source_block_SHA256,'fresh original publisher PDF block SHA '+id);
   ck(row.original_block_sha256===z.original_source_block_SHA256&&row.original_page_sha256===srcPage.original_extracted_page_SHA256&&row.original_zero_based_page===p&&row.original_printed_page===p+1&&eq(row.original_layout_line_span,[z.original_extracted_line_start,z.original_extracted_line_end]),'original text block exact source locator '+id);
   ck(row.parent_frozen_page_location_id===pageID&&eq(row.existing_parent_page_SSC_candidate_ids,mapped.existing_SSC_ids)&&eq(row.formula_label_hints_not_proof,z.possible_numbered_formula_labels),'original block belongs to parent page, not fabricated semantic claim '+id);
   ck(row.source_atom_disposition==='ORIGINAL_TEXT_LAYOUT_ATOM_PARENT_PAGE_LINK_ONLY_SEMANTIC_COLD_UNQUALIFIED'&&row.original_atom_source_semantics_whole_verified===false,'unverified block stays unverified '+id);
   layoutCount++;
  }
 }
 ck(index===260&&layoutCount===260&&sourceIds.size===260&&parentOwners.size===38,'all 260 source SHA atoms, 51 pages, 38 existing SSC candidates');
 ck(eq([...parentOwners].sort(),i.bidirectional.existing_SSC_ids.slice().sort()),'forward existing L05 source-to-SSC owner set');
 for(const [id,pages]of Object.entries(backward))ck(eq(pages,i.bidirectional.existing_SSC_to_source_pages[id]),'backward exact candidate source page linkage '+id);
 ck(i?.counts?.dispositions.ORIGINAL_FORMULA_TABLE_FIGURE_EXACT_CELL_AND_CONVENTION_REPLAY_UNVERIFIED===31&&i.counts.original_equation_exact_source_reconstruction_independently_passed===0&&i.counts.fully_cold_complete_original_sources===0&&i.bidirectional.source_to_SSC_global_fidelity_PASS===false&&i.bidirectional.SSC_to_original_global_fidelity_PASS===false,'31 page groups + 30 source equations still G0 open and not falsely qualified');
 ck(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.31'&&r.source_first_predecessor.git_blob_sha===B.prevReg&&r.current_ssc.git_blob_sha===B.SSC&&r.per_source.length===6&&r.per_source.reduce((x,y)=>x+y.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191,'finite 350-group SSC191 authority lock and register predecessor');
 const l=r?.per_source?.find(x=>x.source==='L05');
 ck(l?.audit_git_blob_sha===B.inv&&l?.original_source_block_frontier?.git_blob_sha===B.atom&&l.original_exact_cell_expression_groups_not_yet_independently_verified===31&&l.original_complete_cold_review_passed===false&&r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_complete===false,'register 51 original L05 pages with 260 subindex blocks, all six cold open');
 ck(t?.schema==='lisi.full-treatment.source-traversal-ledger.v0.48'&&t.predecessor_exact.git_blob_sha===B.prevTr&&t.current_L05_source_first_inventory.git_blob_sha===B.inv&&t.current_L05_260_original_layout_block_frontier.git_blob_sha===B.atom&&t.current_G0_six_original_finite_convergence.git_blob_sha===B.reg&&t.complete_sources===0&&t.G1_authorized===false,'traversal original source fidelity ancestry');
 ck(g?.schema==='isograph.exp062-l-current-stage-gate.v0.138'&&g.predecessor_gate.git_blob_sha===B.prevGate&&g.current_source_census.git_blob_sha===B.SSC&&g.current_convergence.git_blob_sha===B.reg&&g.current_traversal.git_blob_sha===B.tr&&g.L05_original_block_frontier.git_blob_sha===B.atom&&g.L05_exact_source_provenance.git_blob_sha===B.inv&&g.L05_current_verifier.git_blob_sha===B.self,'stage pins exact source and verified code');
 ck(g.new_source_CI.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new test cannot predeclare success, stage G0 only');
 return bad;
}
const folder=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L05-VOR-51page-original-')),pages=[];
try{
 const target='https://link.springer.com/content/pdf/10.1007/s00006-026-01447-5.pdf';
 const response=await fetch(target,{signal:AbortSignal.timeout(50000)});
 if(response.status!==200)throw Error('EXACT_PUBLISHER_ORIGINAL_UNAVAILABLE_HTTP_'+response.status);
 const bin=Buffer.from(await response.arrayBuffer());
 if(bin.length!==SIZE||sha(bin)!==SHA)throw Error('FROZEN_VOR_SOURCE_BYTES_CHANGED_DO_NOT_SUBSTITUTE_'+bin.length+'/'+sha(bin));
 const p=path.join(folder,'L05-exact-2026-VOR.pdf');fs.writeFileSync(p,bin);
 const info=execFileSync('pdfinfo',[p],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*51$/m.test(info))throw Error('EXACT_PUBLISHER_VOR_PAGE_COUNT');
 for(let page=1;page<=51;page++)pages[page-1]=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',p,'-'],{encoding:'utf8',timeout:12000,maxBuffer:3000000});
}finally{fs.rmSync(folder,{recursive:true,force:true});}
const issues=verify(D,pages);
const hostile=[
 ['remove_original_layout_atom',d=>d.atom.original_first_layout_blocks.pop()],
 ['forge_one_original_layout_sha',d=>d.atom.original_first_layout_blocks[137].original_block_sha256='wrong'],
 ['forge_one_original_page_sha',d=>d.atom.original_first_layout_blocks[20].original_page_sha256='wrong'],
 ['move_atom_to_wrong_original_page',d=>d.atom.original_first_layout_blocks[11].original_zero_based_page=20],
 ['disguise_unverified_as_complete',d=>d.atom.original_first_layout_blocks[17].original_atom_source_semantics_whole_verified=true],
 ['forge_semantic_certified_count',d=>d.atom.counts.source_semantics_independently_cold_qualified_block_count=260],
 ['invent_root_owner',d=>d.atom.original_first_layout_blocks[0].existing_parent_page_SSC_candidate_ids.push('L-SSC-999')],
 ['erase_source_owner',d=>d.atom.original_first_layout_blocks[40].existing_parent_page_SSC_candidate_ids=[]],
 ['falsify_frozen_DOI',d=>d.atom.source.publisher_DOI='fictitious'],
 ['source_arxiv_substitution',d=>d.atom.source.arxiv_not_substituted=false],
 ['alter_exact_VOR_revision',d=>d.manifest.original_sources[4].revision='arXiv:2609.12112'],
 ['alter_exact_frozen_pdf_sha',d=>d.manifest.original_sources[4].PDF_SHA256='wrong'],
 ['alter_verification_original_proof',d=>d.proof.original_sources[4].source_binary_byte_count=1],
 ['alter_old_source_page',d=>d.prior.page_source_units[4].source_semantic_group+=' unauthored'],
 ['alter_new_source_page',d=>d.inv.page_source_units[4].source_semantic_group+=' unsourced'],
 ['alter_current_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-130').body+=' fabricated'],
 ['alter_old_L05_SSC',d=>d.oldSSC.items.find(x=>x.id==='L-SSC-129').body+=' fabricated'],
 ['erase_SSC_to_page_inverse',d=>d.inv.bidirectional.existing_SSC_to_source_pages['L-SSC-125']=[]],
 ['erase_page_to_SSC_reference',d=>d.inv.page_source_units[3].existing_SSC_ids=[]],
 ['forget_conserved_10_tables',d=>d.inv.original_tables.pop()],
 ['erase_historical_original_multiplication_discrepancy',d=>d.inv.source_specific_ambiguity_inconsistency_and_negative_claims=[]],
 ['fake_51_pages_source_cold',d=>d.inv.counts.fully_cold_complete_original_sources=1],
 ['miscount_original_260_blocks',d=>d.reg.per_source.find(x=>x.source==='L05').original_source_block_frontier.original_layout_blocks=259],
 ['wrong_L05_version_provenance',d=>d.inv.original_source.publisher_original_full_PDF_sha256_verified=false],
 ['wrong_legacy_source_provenance',d=>d.prior.original_source.publisher_original_full_PDF_sha256_verified=true],
 ['promote_G0',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['promote_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['allow_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true],
 ['preclaim_CI_success',d=>d.gate.new_source_CI.status='SUCCESS'],
 ['cross_track_seal_violation',d=>d.atom.qualification_limits.W_semantics_imported=true]
];
let rejected=0;
if(issues.length===0)for(const [name,mut] of hostile){const d=structuredClone(D);try{mut(d);if(verify(d,pages).length)rejected++;else issues.push('HOSTILE_ESCAPE '+name)}catch(e){issues.push('VERIFIER_HOSTILE_EXCEPTION '+name+': '+e.message)}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L05-frozen-publisher-VOR-260-original-layout-census.v0.1',PASS:issues.length===0,issues,original_exact_PDF_SHA256_verified:true,original_VOR_publisher_DOI:'10.1007/s00006-026-01447-5',original_PDF_bytes:SIZE,original_PDF_pages:51,original_page_sha256_checks:51,original_block_sha256_checks:260,existing_L05_SSC_owners:38,all_L_SSC_identities:191,unchanged_L05_original_page_locations:51,unchanged_L05_SSC_original_records:38,source_exact_selected_page_groups_still_open:31,source_semantic_complete_original_sources:0,hostiles_defined:hostile.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(issues.length)process.exitCode=1;
