// IsoGraph L-only G0. Frozen original L04 pp4-5 source fidelity and conditional p4-vs-p5 normalization.
// Deterministic INTERNAL qualification only. No author error verdict, physics theorem, cross-track or G1 authority.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';import path from 'node:path';import {execFileSync} from 'node:child_process';
import {calculateL04VectorNormalization} from './l04-vector-bivector-normalization-model-0-1.mjs';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={packet:P+'LISI_L04_ORIGINAL_SECTION2_VECTOR_BIVECTOR_NORMALIZATION_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_88.json',SSC:P+'SOURCE_SEMANTIC_CENSUS_0_89.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_21.json',inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_22.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_44.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_61.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_165.json'};
const parse=p=>JSON.parse(fs.readFileSync(p,'utf8')),D=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,parse(p)]));
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim()]));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),changed=(a,b)=>a.filter((x,i)=>!eq(x,b[i])).map(x=>x.id);
const constantPDF='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const expectedBranches=[
 ['spin-vee','+i','+i/4'],['spin-wedge','-i','-i/4'],['boost-vee','+1','+1/4'],['boost-wedge','-1','-1/4']];
const output=calculateL04VectorNormalization();
function check(d,pages){const {packet:q,manifest:m,oldSSC:s0,SSC:s,oldInv:i0,inv:i,reg:r,tr:t,gate:g}=d,e=[],need=(ok,msg)=>{if(!ok)e.push(msg)};
 const src=m.original_sources.find(z=>z.id==='L04');
 need(q?.schema==='isograph.track-L.G0.L04-vector-bivector-source-normalization-audit.v0.1'&&q.track==='L'&&q.stage==='G0'&&q.semantic_authority===false,'track-scoped source candidate');
 need(q?.source?.revision==='arXiv:2407.02497v2'&&q.source.pdf_SHA256===constantPDF&&src.PDF_SHA256===constantPDF&&q.source.pdf_bytes===348134&&q.source.pdf_pages===17,'locked original PDF');
 need(eq(q?.source?.original_pages?.map(p=>p.index),[3,4])&&eq(q.source.original_pages.map(p=>p.extracted_page_SHA256),[src.original_pdf_extracted_pages[3].original_extracted_page_SHA256,src.original_pdf_extracted_pages[4].original_extracted_page_SHA256]),'original two complete page SHA anchors');
 for(const orig of q?.source?.original_pages??[]){const pg=pages.get(orig.index);need(typeof pg==='string'&&sha(Buffer.from(pg))===orig.extracted_page_SHA256,'independent original page extraction SHA '+orig.index)}
 need(eq(q?.source?.source_atoms?.map(x=>x.id),['L04-P004-B009','L04-P004-B010','L04-P005-B001']),'exact 3 frozen source text atoms');
 for(const atom of q?.source?.source_atoms??[]){const rec=src.original_pdf_extracted_pages[atom.page_index]?.blocks.find(b=>b.source_atom_id===atom.id),page=pages.get(atom.page_index);
  need(rec?.original_source_block_SHA256===atom.sha256&&eq([rec?.original_extracted_line_start,rec?.original_extracted_line_end],atom.lines),'manifest source atom '+atom.id);
  if(typeof page==='string'&&rec){const lines=page.replaceAll('\r','').replace(/\f+$/g,'').split('\n');need(sha(Buffer.from(lines.slice(rec.original_extracted_line_start-1,rec.original_extracted_line_end).join('\n')) )===atom.sha256,'recomputed frozen source atom '+atom.id)}
 }
 need(q.original_group==='L04-S010'&&q.existing_ssc_owner==='L-SSC-099'&&q.source_roles?.length===11,'one original group eleven roles');
 const role=k=>q.source_roles?.find(x=>x.key===k);
 need(q.source_roles?.every(x=>x.kind&&x.literal&&x.scope),'all original roles have exact source statement/scope');
 need(role('BIVECTOR_BASIS')?.literal.includes('(1/2)B^{mu nu}')&&role('ACTION_MIDDLE')?.literal.includes('(1/4)B^{mu nu}')&&role('ACTION_FINAL')?.literal.includes('(1/2)B^{mu nu}')&&role('ACTION_FIRST')?.literal.includes('×'),'preserve p4 every displayed operator/coeff');
 need(role('VECTOR_SPIN_BRANCH')?.literal.includes('±i')&&role('VECTOR_BOOST_BRANCH')?.literal.includes('±1')&&role('CARTAN_TWO_OPERATORS')?.literal.includes('gamma12')&&role('DISTINCT_SPINOR_ACTION')?.kind==='SOURCE_ADJACENCY_BOUNDARY','p5 source vector signs and no spinor collapse');
 const conditional=q.conditional_exact_reconstruction;
 need(conditional?.status==='CONDITIONAL_SOURCE_INTERNAL_NORMALIZATION_TENSION_NOT_ESTABLISHED_AUTHOR_DEFECT'&&conditional.assumptions.length===4,'conditional not verdict');
 need(conditional?.critical_limit?.includes('do not declare a confirmed typographical error')&&conditional.local_exact_check.positive_branches===4&&conditional.local_exact_check.printed_p4_equals_full_commutator===0,'method, authority and internal falsifiers');
 need(output.gamma_squares_match_metric&&output.distinct_gammas_anticommute&&output.all_four_branches_show_conditional_fourfold_ratio,'independently recalculated exact Pauli/Clifford matrix algebra');
 need(conditional.four_branch_results.length===4&&output.branches.length===4&&conditional.four_branch_results.every((b,k)=>b.branch===expectedBranches[k][0]&&b.printed_p5_eigenvalue===expectedBranches[k][1]&&b.printed_p4_final_eigenvalue===expectedBranches[k][2]&&b.full_matrix_commutator_eigenvalue===expectedBranches[k][1]&&output.branches[k].branch===b.branch&&output.branches[k].printed_p5_eigenvalue===b.printed_p5_eigenvalue&&output.branches[k].printed_p4_result_ratio_to_p5==='1/4'),'four exact source-conditional branch values match independent model');
 need(q.source_preservation.changed_existing_ssc?.join(',')==='L-SSC-099'&&q.source_preservation.unchanged_entire_SSC_records===190&&q.source_preservation.original_mapped_groups_remaining===11,'packet conservation');
 need(s.item_count===191&&s.items.length===191&&i.locations.length===53&&eq(changed(s.items,s0.items),['L-SSC-099'])&&eq(changed(i.locations,i0.locations),['L04-S010']),'190 entire SSC and 52 L04 source groups unchanged');
 need(new Set(i.locations.flatMap(x=>x.ssc_ids)).size===34&&eq(i.locations.find(x=>x.id==='L04-S010')?.ssc_ids,['L-SSC-099']),'all existing 34 L04 owners mapped');
 need(i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===11&&Object.values(i.counts.by_disposition).reduce((a,b)=>a+b,0)===53&&i.counts.current_mapped_meaning_groups_source_cold_open===11,'11 mapped L04 remain, all 53 counted');
 need(s.items.find(x=>x.id==='L-SSC-099')?.body.includes('conditional source-internal observation')&&s.items.find(x=>x.id==='L-SSC-099')?.body.includes('±i/4')&&s.items.find(x=>x.id==='L-SSC-099')?.body.includes('Vector and spinor action carriers stay separate'),'current SSC preserves discrepancies and separate carriers');
 need(q.predecessors.source_census.git_blob_sha===H.oldSSC&&q.predecessors.source_inverse.git_blob_sha===H.oldInv&&q.predecessors.current_gate.git_blob_sha==='92e92ae38032cb3cec58d1ba0d725df4017c8ea7','packet true frozen predecessor');
 need(s.predecessor.git_blob_sha===H.oldSSC&&s.revision.source_packet.git_blob_sha===H.packet&&s.revision.source_first_inverse.git_blob_sha===H.inv&&i.current_original_p4_p5_vector_audit.source_packet.git_blob_sha===H.packet,'source packet SSC / inverse hash lineage');
 need(r.current_ssc.git_blob_sha===H.SSC&&r.per_source.find(x=>x.source==='L04').audit_git_blob_sha===H.inv&&r.per_source.reduce((n,x)=>n+x.source_first_location_units,0)===350&&r.per_source.every(x=>!x.original_complete_cold_review_passed),'350 original location units, 0/6 whole original passes');
 need(t.current_census.git_blob_sha===H.SSC&&t.current_L04_source_first_inventory.git_blob_sha===H.inv&&t.current_G0_six_original_finite_convergence.git_blob_sha===H.reg&&t.complete_sources===0,'traversal current graph');
 need(g.current_source_census.git_blob_sha===H.SSC&&g.current_L04_source_first.git_blob_sha===H.inv&&g.current_convergence.git_blob_sha===H.reg&&g.current_traversal.git_blob_sha===H.tr,'current gate exact hash chain');
 need(g.predecessor_gate.last_scoped_CI_success.run_id===38183907130&&g.predecessor_gate.failed_original_CI_dispositions_preserved.includes(38181860303)&&g.new_source_CI.run_id===null,'prior CI and pending new run preserved');
 need(!g.current_lawful_state.G0_frozen&&!g.current_lawful_state.G1_authorized&&!g.current_lawful_state.W_semantics_imported&&!g.current_lawful_state.cross_track_synthesis_authorized&&!g.current_lawful_state.PR70_merge_authorized,'no promotion cross-track or merge');
 need(!q.locks.G0_frozen&&!q.locks.G1_authorized&&!q.locks.PR70_merge_authorized&&q.source_preservation.whole_frozen_source_cold_completed===0,'source packet no freeze or extra powers');
 return e;
}
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l04-vector-p4-5-')),pages=new Map();let originalVerified=false;
try{const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error('FROZEN_ORIGINAL_SOURCE_HTTP_'+response.status);const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length!==348134||sha(bytes)!==constantPDF)throw Error('FROZEN_ORIGINAL_PDF_BYTES_SHA');originalVerified=true;
 const file=path.join(tmp,'source.pdf');fs.writeFileSync(file,bytes);if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_SOURCE_PAGES_NOT_17');
 for(const p of [3,4])pages.set(p,execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000}));
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
const errors=check(D,pages);
const mutants=[
 ['source_pdf_digest',o=>o.packet.source.pdf_SHA256='BAD'],['source_printed_page_digest',o=>o.packet.source.original_pages[0].extracted_page_SHA256='BAD'],
 ['source_p4_action_atom_digest',o=>o.packet.source.source_atoms[1].sha256='BAD'],['source_p5_eigen_atom_digest',o=>o.packet.source.source_atoms[2].sha256='BAD'],
 ['remove_source_role',o=>o.packet.source_roles.pop()],['change_action_middle_coefficient',o=>o.packet.source_roles.find(x=>x.key==='ACTION_MIDDLE').literal='(1/2)B^{mu nu}'],
 ['change_action_final_coefficient',o=>o.packet.source_roles.find(x=>x.key==='ACTION_FINAL').literal='(2)B^{mu nu}'],
 ['change_spin_eigen_sign',o=>o.packet.source_roles.find(x=>x.key==='VECTOR_SPIN_BRANCH').literal='J3 v=i/4 v'],
 ['change_boost_eigen_sign',o=>o.packet.source_roles.find(x=>x.key==='VECTOR_BOOST_BRANCH').literal='K3 v=1/4 v'],
 ['erase_vector_spinor_distinction',o=>o.packet.source_roles.find(x=>x.key==='DISTINCT_SPINOR_ACTION').kind='SAME'],
 ['promote_typo_claim',o=>o.packet.conditional_exact_reconstruction.status='PROVEN_AUTHOR_ERROR'],
 ['falsify_branch_one',o=>o.packet.conditional_exact_reconstruction.four_branch_results[0].printed_p4_final_eigenvalue='+i'],
 ['falsify_branch_four',o=>o.packet.conditional_exact_reconstruction.four_branch_results[3].printed_p5_eigenvalue='+1'],
 ['rewrite_math_scope',o=>o.packet.conditional_exact_reconstruction.local_exact_check.printed_p4_equals_full_commutator=4],
 ['modify_unrelated_SSC',o=>o.SSC.items.find(x=>x.id==='L-SSC-098').body+='BAD'],
 ['modify_unrelated_original_group',o=>o.inv.locations.find(x=>x.id==='L04-S011').disposition='BAD'],
 ['remove_current_owner',o=>o.inv.locations.find(x=>x.id==='L04-S010').ssc_ids=[]],
 ['break_unqualified_original_count',o=>o.inv.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
 ['wrong_census_identity_count',o=>o.SSC.item_count=192],
 ['break_convergence_SSC_pointer',o=>o.reg.current_ssc.git_blob_sha='BAD'],
 ['break_gate_traversal_pointer',o=>o.gate.current_traversal.git_blob_sha='BAD'],
 ['erase_prior_failed_CI',o=>o.gate.predecessor_gate.failed_original_CI_dispositions_preserved=[]],
 ['forge_new_CI_success',o=>o.gate.new_source_CI.run_id=123],
 ['premature_complete_source',o=>o.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['premature_G1',o=>o.gate.current_lawful_state.G1_authorized=true],
 ['premature_cross_track',o=>o.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['premature_merge',o=>o.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;if(!errors.length)for(const [name,mutate]of mutants){const m=structuredClone(D);try{mutate(m);if(check(m,pages).length)rejected++;else errors.push('HOSTILE_ESCAPE_'+name)}catch(e){errors.push('HOSTILE_CHECKER_EXCEPTION_'+name+':'+String(e))}}
const report={schema:'isograph.exp062.track-L.G0.L04-original-vector-normalization.v0.1',PASS:errors.length===0,errors,source_original_PDF_binary_SHA256_verified:originalVerified,original_p4_p5_full_page_SHA256_verified:pages.size,original_source_blocks_sha256_verified:3,scoped_original_source_group:'L04-S010',source_roles:11,exact_conditional_Weyl_matrix_branches:output.branches.length,internal_normalization_tension_conditional:true,source_author_typo_proven:false,remaining_broad_mapped_L04_groups:11,SSC_IDs:191,all_six_source_groups:350,whole_original_sources_cold_complete:0,hostiles_defined:mutants.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
