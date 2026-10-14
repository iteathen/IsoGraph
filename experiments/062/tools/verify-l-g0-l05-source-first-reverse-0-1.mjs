// L-only G0 publisher-VOR original-first page, SSC, authority and negative-evidence guard.
// Passing means internal bidirectional/source-scope conservation, NOT complete PDF source fidelity.
// No Woit source semantics, later-stage primitive/IA/NEI/DTS/DP or PR promotion.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 source:R+'LISI_L05_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
 ssc:R+'SOURCE_SEMANTIC_CENSUS_0_54.json',
 traversal:R+'SOURCE_TRAVERSAL_LEDGER_0_18.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_79.json',
 previousGate:E+'L_CURRENT_STAGE_GATE_0_78.json',
 self:E+'tools/verify-l-g0-l05-source-first-reverse-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const objectBlob=o=>{const b=Buffer.from(JSON.stringify(o,null,2)+'\n');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const packet=read(F.source),census=read(F.ssc),traversal=read(F.traversal),gate=read(F.gate);
const owner=x=>/^L05(?:\s|$|§)/.test(x.source_provenance);
const sorted=x=>[...x].sort();
const cM='ORIGINAL_SOURCE_SEMANTIC_GROUP_MAPPED_COLD_FULL_SOURCE_FIDELITY_OPEN';
const cP='ORIGINAL_FORMULA_TABLE_FIGURE_EXACT_CELL_AND_CONVENTION_REPLAY_UNVERIFIED';
const cX='SOURCE_NATIVE_CITATION_ROLE_ONLY_NO_EXTERNAL_SOURCE_SEMANTIC_IMPORT';
function test(a,c,t,g){
 const issues=[],ck=(v,msg)=>{if(!v)issues.push(msg);};
 ck(a?.schema==='isograph.track-L.G0.L05-journal-version-of-record-source-first-reverse.v0.1'&&a?.track==='L'&&a?.stage==='G0'&&a?.semantic_authority===false,'G0 original source L-only nonauthority');
 ck(a?.original_source?.id==='L05'&&a?.original_source?.version_of_record==='Advances in Applied Clifford Algebras 36:45'&&a?.original_source?.publication_date==='2026-08-29','frozen Springer 2026-08-29 published original');
 ck(a?.original_source?.doi==='10.1007/s00006-026-01447-5'&&a?.original_source?.original_pdf_url==='https://link.springer.com/content/pdf/10.1007/s00006-026-01447-5.pdf','publisher original URL not substitute arxiv');
 ck(a?.original_source?.official_original_pages===51&&a?.original_source?.arxiv_is_not_assumed_byte_identical_to_published_VOR===true,'original 51 source pages, no later arxiv identity');
 ck(a?.original_source?.publisher_PDF_header_visually_observed===true&&a?.original_source?.publisher_original_full_PDF_sha256_verified===false&&a?.original_source?.source_revision_provenance_complete_at_byte_level===false,'no invented exact publisher PDF bytes');
 ck(a?.original_source?.external_independent_complete_original_pdf_semantic_review_passed===false&&a?.convergence?.full_source_cold_complete===false,'original external cold completeness not inferred');
 ck(a?.parent?.current_source_census_sha===blob(F.ssc)&&a?.parent?.historical_source_traversal_predecessor==='SOURCE_TRAVERSAL_LEDGER_0_17.json','frozen prior SSC and traversal source');
 ck(c?.schema==='woit-lisi.track-l.source-semantic-census.v0.54'&&c?.track==='L'&&c?.items?.length===191&&c?.item_count===191,'191 current source identities not edited');
 ck(objectBlob(c)===blob(F.ssc),'all 191 original SSC bodies/guards byte-consistent with unchanged current file');
 ck(c?.guards?.source_census_freeze_complete===false&&c?.guards?.dp_allowed===false,'source census and later stages still unfrozen');
 const original=c.items.filter(owner),ids=sorted(original.map(x=>x.id)),pages=a?.page_source_units||[];
 ck(ids.length===38&&a?.counts?.existing_original_SSC_ids===38,'exact 38 original published L05 source SSC identities');
 ck(pages.length===51&&a?.counts?.source_pages_mapped===51,'all 51 pages partitioned');
 let seen=new Set(),mapped=new Set(),count={};
 for(let i=0;i<pages.length;i++){
  const p=pages[i]||{},id='L05-P'+String(i+1).padStart(2,'0');
  ck(p.id===id&&!seen.has(id),'unique original numbered publisher page '+i);seen.add(p.id);
  ck(p.pdf_page_zero_based===i&&p.printed_journal_page===i+1,'exact publisher page index '+i);
  ck(typeof p.source_semantic_group==='string'&&p.source_semantic_group.length>12,'original source page semantic contents '+i);
  ck(p.load_bearing===true&&[cM,cP,cX].includes(p.disposition),'known load-bearing source group and citation-only scope '+i);
  ck(p.original_equation_exact_reconstruction_independently_certified===false&&p.whole_original_source_human_cold_complete===false,'no page/formula completed without independent evidence '+i);
  for(const id of p.existing_SSC_ids||[]){ck(ids.includes(id),'source-only SSC reference '+i);mapped.add(id);}
  ck((p.existing_SSC_ids||[]).length>0,'each original source page has SSC disposition '+i);
  count[p.disposition]=(count[p.disposition]||0)+1;
 }
 ck(JSON.stringify(sorted(mapped))===JSON.stringify(ids),'reverse original L05 source to 38 existing SSC IDs');
 ck(JSON.stringify(sorted(a?.bidirectional?.existing_SSC_ids||[]))===JSON.stringify(ids),'explicit source SSA reverse identity register');
 ck(JSON.stringify(sorted(Object.keys(a?.bidirectional?.existing_SSC_to_source_pages||{})))===JSON.stringify(ids),'per-item SSC -> original source page index');
 ck((count[cM]||0)===17&&(count[cP]||0)===31&&(count[cX]||0)===3,'true original page state counts 17/31/3');
 ck(Object.entries(a?.counts?.dispositions||{}).every(([k,v])=>(count[k]||0)===v),'counts derived from source-first pages');
 const tabs=a?.original_tables||[],figs=a?.original_figures||[],eqs=a?.original_equation_index_candidate||[];
 ck(tabs.length===10&&a?.counts?.original_tables_indexed===10,'published Table1-10 all indexed');
 for(let i=0;i<tabs.length;i++){
  const tab=tabs[i]||{};
  ck(tab.id==='L05-T'+(i+1),'original Table'+(i+1)+' independent index');
  ck(tab.pdf_page_zero_based>=0&&tab.pdf_page_zero_based<=50,'table PDF page in published original '+i);
  ck(tab.exact_all_original_cells_cold_reconstructed===false,'no source Table whole-cell false promotion '+i);
  ck(tab.existing_SSC_ids?.every(x=>ids.includes(x)),'table old source identifiers only '+i);
 }
 ck(figs.length===2&&figs[0]?.id==='L05-F1'&&figs[1]?.id==='L05-F2','exact original Figure1 and Figure2, no fictitious Figure3');
 ck(figs[0]?.pdf_page_zero_based===38&&figs[1]?.pdf_page_zero_based===41&&figs.every(x=>x.exact_source_diagram_cells_cold_reconstructed===false),'two distinct original diagram locations, no visual falsely complete');
 ck(eqs.length===30&&a?.counts?.source_equation_sequence_index_candidate===30&&a?.counts?.original_equation_exact_source_reconstruction_independently_passed===0,'30 source equation spine candidates never passed as exact');
 for(let i=0;i<eqs.length;i++){
  const eq=eqs[i]||{};
  ck(eq.id==='L05-E'+String(i+1).padStart(2,'0')&&eq.original_number===i+1,'eq candidate indexed 1..30 without invented formula '+i);
  ck(eq.exact_pdf_page_and_formula_bindings_independently_rechecked===false&&eq.disposition==='EXPRESSION_INDEX_PROVISIONAL_G0_EXACT_SOURCE_REPLAY_REQUIRED','no CI proves original Eq exactness '+i);
  ck(eq.existing_SSC_ids?.every(x=>ids.includes(x)),'no invented W primitive from Eq slot '+i);
 }
 const neg=a?.source_specific_ambiguity_inconsistency_and_negative_claims||[];
 ck(neg.length===4&&neg[0]?.source?.includes('ordinary O table')&&neg[0]?.exact_original_cells?.join(',')==='e6e7=-e2,e7e6=-e2'&&neg[0]?.must_not_infer_author_typo===true,'conserve exact original O table and discrepancy separately');
 ck(neg[1]?.source?.includes('Woit')&&neg[1]?.target_semantics_imported===false&&neg[1]?.role==='CITATION_ONLY','Woit [33] source-native citation only, zero W semantic import');
 ck(neg[2]?.source_typing_preserved===true&&neg[3]?.theory_not_proved===true,'root phases and physical generation uncertainties remain open');
 ck(a?.bidirectional?.source_to_SSC_global_fidelity_PASS===false&&a?.bidirectional?.SSC_to_original_global_fidelity_PASS===false,'page census is not full original PDF source fidelity');
 ck(a?.stage?.G0_open===true&&a.stage?.source_census_frozen===false&&a.stage?.G1_authorized===false&&a.stage?.W_L_bridge_authorized===false,'source stage G0 only');
 ck(t?.schema==='lisi.full-treatment.source-traversal-ledger.v0.18'&&t?.predecessor==='SOURCE_TRAVERSAL_LEDGER_0_17.json'&&t?.complete_sources===0,'current source traversal successor held open');
 ck(t?.sources?.length===6&&t.sources.every(s=>s.current_complete===false),'all six source cold verification incomplete');
 ck(t?.current_L05_source_first_inventory?.git_blob_sha===blob(F.source)&&t?.current_G0_source_first_progress?.source_locations===308&&t?.current_G0_source_first_progress?.current_SSC_records_mapped===149,'mechanical 5 of 6 original source convergence');
 ck(g?.schema==='isograph.exp062-l-current-stage-gate.v0.79'&&g?.track==='L'&&g?.stage==='G0'&&g?.semantic_authority===false&&g?.status?.endsWith('OPEN_UNFROZEN'),'no G0 stage promotion');
 ck(g?.predecessor_gate?.git_blob_sha===blob(F.previousGate)&&g?.current_source_census?.git_blob_sha===blob(F.ssc)&&g?.source_traversal?.git_blob_sha===blob(F.traversal),'exact procedural authority routing');
 ck(g?.L05_source_first_inventory?.git_blob_sha===blob(F.source)&&g?.source_verifier?.git_blob_sha===blob(F.self),'exact source and checker hashes');
 ck(g?.source_CI?.status==='PENDING_GITHUB_CI'&&g?.source_CI?.external_complete_original_pdf_review_passed===false,'CI cannot self-declare success before workflow');
 ck(g?.convergence?.source_first_inventory_sources===5&&g.convergence?.full_cold_complete_sources===0&&g?.current_lawful_state?.source_census_frozen===false,'G0 global freeze still false');
 ck(g?.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false,'no later stage or W import');
 ck(g?.current_lawful_state?.L05_publisher_and_later_arxiv_revisions_identical_qualified===false&&g.current_lawful_state?.L05_original_octonion_inconsistency_silently_repaired===false,'original journal and negative evidence conserved');
 return issues;
}
let errors=test(packet,census,traversal,gate);
const hostiles=[
 ['remove_page',(a)=>a.page_source_units.pop()],
 ['duplicate_page_id',(a)=>a.page_source_units[4].id='L05-P01'],
 ['shift_original_page',(a)=>a.page_source_units[3].pdf_page_zero_based=4],
 ['invent_arxiv_identity',(a)=>a.original_source.arxiv_is_not_assumed_byte_identical_to_published_VOR=false],
 ['substitute_corpus',(a)=>a.original_source.original_pdf_url='https://arxiv.org/pdf/2609.12112'],
 ['forge_publisher_date',(a)=>a.original_source.publication_date='2026-09-01'],
 ['forge_original_pdf_sha',(a)=>a.original_source.publisher_original_full_PDF_sha256_verified=true],
 ['promote_external_cold',(a)=>a.original_source.external_independent_complete_original_pdf_semantic_review_passed=true],
 ['premature_formula_success',(a)=>a.counts.original_equation_exact_source_reconstruction_independently_passed=30],
 ['fake_source_page_cold',(a)=>a.page_source_units[3].whole_original_source_human_cold_complete=true],
 ['remove_backward_map',(a)=>delete a.bidirectional.existing_SSC_to_source_pages['L-SSC-153']],
 ['smuggle_W_ssc',(a)=>a.page_source_units[3].existing_SSC_ids.push('W-SSC-123')],
 ['erase_Source_O_print',(a)=>a.source_specific_ambiguity_inconsistency_and_negative_claims[0].exact_original_cells=['e6e7=+e2']],
 ['claim_author_typo',(a)=>a.source_specific_ambiguity_inconsistency_and_negative_claims[0].must_not_infer_author_typo=false],
 ['import_W33',(a)=>a.source_specific_ambiguity_inconsistency_and_negative_claims[1].target_semantics_imported=true],
 ['erase_table10',(a)=>a.original_tables.pop()],
 ['duplicate_table_number',(a)=>a.original_tables[1].id='L05-T1'],
 ['fake_Table6_cold',(a)=>a.original_tables[5].exact_all_original_cells_cold_reconstructed=true],
 ['invent_figure3',(a)=>a.original_figures.push({...a.original_figures[0],id:'L05-F3'})],
 ['fake_fig2_cold',(a)=>a.original_figures[1].exact_source_diagram_cells_cold_reconstructed=true],
 ['remove_eq30',(a)=>a.original_equation_index_candidate.pop()],
 ['skip_eq_label',(a)=>a.original_equation_index_candidate[10].original_number=12],
 ['fake_eq5_cold',(a)=>a.original_equation_index_candidate[4].exact_pdf_page_and_formula_bindings_independently_rechecked=true],
 ['change_O_in_SSC',(a,c)=>c.items.find(x=>x.id==='L-SSC-125').body+=' Sourced wrong'],
 ['change_unrelated_SSC',(a,c)=>c.items.find(x=>x.id==='L-SSC-020').body='fabricated'],
 ['truncate_SSC',(a,c)=>c.items.pop()],
 ['force_complete_traversal',(a,c,t)=>t.sources.find(x=>x.id==='L05').current_complete=true],
 ['change_traversal_ancestor',(a,c,t)=>t.current_L05_source_first_inventory.git_blob_sha='BROKEN'],
 ['promote_G1',(a,c,t,g)=>g.current_lawful_state.G1_authorized=true],
 ['promote_DP',(a,c,t,g)=>g.current_lawful_state.DP_pass_authorized=true],
 ['promote_W_bridge',(a,c,t,g)=>g.current_lawful_state.cross_track_synthesis_authorized=true],
 ['fake_gate_source_sha',(a,c,t,g)=>g.L05_source_first_inventory.git_blob_sha='BROKEN'],
 ['fake_gate_verifier_sha',(a,c,t,g)=>g.source_verifier.git_blob_sha='BROKEN'],
 ['fake_gate_cold',(a,c,t,g)=>g.convergence.full_cold_complete_sources=6],
 ['fake_ci_success',(a,c,t,g)=>g.source_CI.status='SUCCESS'],
 ['erase_published_vs_arxiv_guard',(a,c,t,g)=>g.current_lawful_state.L05_publisher_and_later_arxiv_revisions_identical_qualified=true],
 ['erase_negative_original_O',(a,c,t,g)=>g.current_lawful_state.L05_original_octonion_inconsistency_silently_repaired=true]
];
let killed=0;
for(const [name,mutate] of hostiles){
 const v=[packet,census,traversal,gate].map(x=>JSON.parse(JSON.stringify(x)));
 mutate(...v);
 if(test(...v).length)killed++;else errors.push('HOSTILE_ESCAPED '+name);
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L05.vOR-original-first-reverse-0.1',pass:errors.length===0,errors,original_page_groups:51,original_source_existing_SSC:38,tables:10,figures:2,equation_spine_provisional:30,new_source_meaning_gaps_proven:0,unchanged_current_SSC_full_records:191,hostiles_defined:hostiles.length,hostiles_rejected:killed,external_original_full_source_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;
