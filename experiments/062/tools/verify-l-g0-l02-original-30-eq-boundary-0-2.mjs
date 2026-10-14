// Track L G0: check frozen L02 original v2 Eq(1)-Eq(30) location completeness,
// exact 9-group scope vs 30-original-eq scope, and all 350 prior inventory
// source->SSC correspondences. Source labels are NOT whole formula qualifications.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={packet:P+'LISI_L02_ALL_30_ORIGINAL_NUMBERED_EQUATION_EVIDENCE_BOUNDARY_G0_0_1.json',
 oldInv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',inv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_4.json',
 selected:P+'LISI_L02_ORIGINAL_PRINTED_EQUATIONS_RECONCILIATION_G0_0_1.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_60.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_9.json',reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_10.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_27.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_28.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_94.json',gate:E+'L_CURRENT_STAGE_GATE_0_95.json',
 L01:P+'LISI_L01_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
 L03:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',
 L04:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 L05:P+'LISI_L05_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 L06:P+'LISI_L06_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 self:E+'tools/verify-l-g0-l02-original-30-eq-boundary-0-2.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const hashes=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,sha(p)]));
const priorNumbers=[4,15,16,17,20,21,22,23];
function check(d){
 const errs=[],t=(ok,msg)=>{if(!ok)errs.push(msg);};
 const {packet:p,oldInv:o,inv:i,selected:s,SSC:n,oldReg:pr,reg:r,oldTr:ot,tr:v,oldGate:og,gate:g}=d;
 const f=p.original_source||{},e=p.total_original_equation_spine||{};
 t(p.schema==='isograph.track-L.G0.L02.original-all-30-equation-source-evidence-scope.v0.1'&&p.track==='L'&&p.stage==='G0','L G0 only original-first packet');
 t(f.frozen_revision==='arXiv:1004.4866v2'&&f.original_PDF_SHA256==='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a'&&f.original_PDF_pages===12,'original frozen official v2 SHA and page count');
 t(f.source_binary_evidence?.CI_run_id===38046224902&&f.source_binary_evidence?.conclusion==='success'&&f.full_original_semantic_cold_complete===false,'prior original PDF provenance and whole-review lock');
 t(p.original_first_inventory?.git_blob_sha===hashes.oldInv&&p.selected_exact_original_literal_packet?.git_blob_sha===hashes.selected,'both historical source packets exact Git blob');
 t(p.selected_exact_original_literal_packet?.numbered_equation_groups===8&&p.selected_exact_original_literal_packet?.groups_total===9&&p.selected_exact_original_literal_packet?.additional_unnumbered_generator_group==='L02-S010','historical 9 group vs 8 numbered');
 t(JSON.stringify(p.selected_exact_original_literal_packet?.actual_numbered_equations)===JSON.stringify(priorNumbers),'8 original-numbered exact selected rows');
 t(e.numbered_original_equations===30&&e.selected_source_exact_literal_packet_numbered_eqs===8&&e.other_numbered_eqs_with_prior_source_research_but_without_this_exact_literal_packet===22&&e.confirmed_new_semantic_omissions_from_missing_selected_packet===0,'finite 30=8+22, no false omissions');
 t(e.source_expression_fidelity_whole_30_independently_verified===false&&e.whole_L02_12_page_cold_review_complete===false,'30 label index != source semantic cold');
 t(p.source_omission_cause?.failure_class==='EVIDENCE_PACKET_SCOPE_MISROUTING_AND_UNJUSTIFIED_ACCEPTANCE_COUNTER_PROMOTION'&&p.source_omission_cause?.missing_inrow_evidence_pointer_implies_source_semantic_omission===false,'scope-laundering methodological guard');
 t(p.reverse_correspondence?.source_to_SSC_each_equation_has_owner===true&&p.reverse_correspondence?.SSC_to_exact_original_eq_30_global_pass===false,'source->SSC not claimed global reverse semantic');
 t(p.stage_locks?.G0_frozen===false&&p.stage_locks?.G1_authorized===false&&p.stage_locks?.other_track_W_semantics_imported===false,'stage boundary');
 t(o.source_first_locations?.length===59&&i.source_first_locations?.length===59&&JSON.stringify(o.source_first_locations)===JSON.stringify(i.source_first_locations),'all 59 original L02 source groups conserved');
 t(o.counts?.source_equations===30&&i.counts?.source_equations===30&&i.counts?.selected_original_exact_LITERAL_packet_numbered_equations===8&&i.counts?.other_original_eq_original_exact_LITERAL_packet_not_indexed===22,'old 30 source equation denominator scoped exactly');
 t(i.counts?.original_source_locations===59&&i.counts?.total_30_original_numbered_formula_cell_semantic_whole_cold_complete===false&&i.counts?.preexisting_nine_selected_exact_expression_groups_reconciled_and_conserved===true,'no implied Eq1-30 source semantic proof');
 t(i.numbered_original_expression_coverage_scope?.git_blob_sha===hashes.packet&&i.numbered_original_expression_coverage_scope?.global_30_equation_literal_complete===false,'new L02 inventory original scope');
 t(i.current_original_PDF_provenance?.source_pdf_SHA256===f.original_PDF_SHA256&&i.predecessor_source_first?.git_blob_sha===hashes.oldInv,'source provenance and exact predecessor');
 t(s.exact_original_printed_equation_groups?.length===9&&s.exact_original_printed_equation_groups?.filter(z=>z.original_equation!==null)?.length===8,'selected original literal packet contains 8 numbered and 1 unnumbered');
 t(s.exact_original_printed_equation_groups?.filter(z=>z.original_equation===null).length===1&&s.exact_original_printed_equation_groups[0].normalized_original_printed_expression==='H=dx^μ·(1/2)H_μ^{IJ}γ_{IJ}; γ_{IJ}=γ_Iγ_J, I,J in 1..4+N','source-selected ninth unnumbered generator exact literal conserved');
 t(hashes.SSC==='dcf9bb8f5764a65db83a2046439fbfcff68eb071'&&JSON.stringify(n.items)===JSON.stringify(D.SSC.items),'all 191 actual prior source SSC item records exactly conserved including bodies');
 t(n.schema==='woit-lisi.track-l.source-semantic-census.v0.60'&&n.items?.length===191&&new Set(n.items.map(x=>x.id)).size===191,'all 191 existing SSC roots conserved');
 const rows=p.numbered_original_source_equation_coverage||[],ids=new Set(n.items.map(x=>x.id)),seen=new Set;
 t(rows.length===30,'30 original-numbered equation source records, no missing');
 for(let k=0;k<30;k++){
  const z=rows[k]||{},old=o.source_first_locations.find(x=>x.source_location_id===z.source_location_id);
  t(z.equation===k+1,'exact Eq1–Eq30 in source order '+(k+1));
  t(!seen.has(z.equation),'non-duplicate Eq'+z.equation);seen.add(z.equation);
  t(old?.pdf_pages_zero_based&&JSON.stringify(old.pdf_pages_zero_based)===JSON.stringify(z.original_PDF_pages_zero_based),'exact original PDF page locator Eq'+(k+1));
  t(old?.original_source_locator===z.original_source_locator&&old?.original_source_semantic_group===z.existing_source_semantic_role&&JSON.stringify(old?.SSC_ids)===JSON.stringify(z.existing_SSC_identities),'original SSC source claims conserved Eq'+(k+1));
  t(z.existing_SSC_identities?.length>0&&z.existing_SSC_identities?.every(id=>ids.has(id)),'Eq'+(k+1)+' existing SSC owner not invented');
  t(z.original_PDF_pages_zero_based?.every(page=>Number.isInteger(page)&&page>=0&&page<12),'Eq'+(k+1)+' original page range');
  const past=s.exact_original_printed_equation_groups.find(t=>t.original_equation===z.equation);
  t(z.original_exact_selected_nine_packet_item?.covered===!!past,'selected exact source packet scoped Eq'+(k+1));
  if(past)t(z.original_exact_selected_nine_packet_item.selected_packet_original_expr===past.normalized_original_printed_expression,'original exact selected expression Eq'+(k+1));
  else t(z.original_exact_selected_nine_packet_item.other_source_research_still_requires_per_expression_source_fidelity_adjudication===true,'other Eq'+(k+1)+' not globally source-exact');
  t(z.whole_source_semantic_cold_completed===false,'no source cold-promote Eq'+(k+1));
 }
 const sourceInverses=[
  ['L01',d.L01.original_source_first_locations],
  ['L02',i.source_first_locations],
  ['L03',d.L03.original_first_locations],
  ['L04',d.L04.locations],
  ['L05',d.L05.page_source_units],
  ['L06',d.L06.page_source_units]
 ];
 let numberLocations=0,nonload=0;const allLoc=new Set,allSSCOwners=new Set;
 for(const [source,items]of sourceInverses){
  t(Array.isArray(items),'exists source partition '+source);
  for(const z of items||[]){
   numberLocations++;
   const loc=z.source_location_id||z.original_source_location_id||z.id;
   const owners=z.SSC_ids||z.existing_SSC_ids||z.ssc_ids||[];
   const load=z.load_bearing??z.source_load_bearing;
   t(!!loc&&loc.startsWith(source+'-'),'strict original source location namespace '+source);
   t(!allLoc.has(loc),'no duplicate original-source location '+loc);allLoc.add(loc);
   if(!load){nonload++;t(owners.length===0,'nonload source location non-author SSI '+loc);}
   else t(owners.length>0,'all loadbearing original-source locations owner '+loc);
   for(const id of owners){t(ids.has(id),'no invented SSC '+id+' referenced by '+loc);allSSCOwners.add(id);}
  }
 }
 t(numberLocations===350&&allLoc.size===350&&allSSCOwners.size===191&&nonload===7,'all six original->SSC membership reversals 350/191 plus 7 nonload');
 t(pr.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.9'&&r.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.10','convergence parent/current versions');
 t(r.source_first_predecessor?.git_blob_sha===hashes.oldReg&&r.current_ssc?.git_blob_sha===hashes.SSC,'convergence source ancestor and unchanged SSC');
 const L02=r.per_source.find(x=>x.source==='L02'),L03=r.per_source.find(x=>x.source==='L03');
 t(L02?.audit_git_blob_sha===hashes.inv&&L02?.original_exact_cell_expression_groups_not_yet_independently_verified===0&&L02?.selected_exact_original_literal_packet_numbered_equations===8&&L02?.other_numbered_equations_outside_selected_packet===22&&L02?.all_original_equation_formulas_and_scopes_independently_cold_verified===false,'L02 old zero only selected packet not all original');
 t(L03?.original_exact_cell_expression_groups_not_yet_independently_verified===15&&r.per_source?.length===6&&r.per_source?.reduce((v,x)=>v+x.source_first_location_units,0)===350,'all other source debt conserved');
 t(r.explicit_G0_outstanding?.source_exactness_by_source?.find(z=>z.source==='L02')?.all_30_source_equation_exact_literal_fidelity_independently_completed===false&&r.explicit_G0_outstanding?.L02_source_equation_coverage_procedure?.claim_that_22_genuine_semantic_omissions_proven===false,'no improper 22 missing source statement');
 t(r.L02_30_original_source_equation_evidence?.git_blob_sha===hashes.packet&&r.L02_30_original_source_equation_evidence?.L02_source_first_packet?.git_blob_sha===hashes.inv,'register source evidence links');
 t(r.exit_acceptance_contract?.G0_SSC_complete===false&&r.explicit_locks?.G1_authorized===false,'not freeze entire original six');
 t(ot.schema==='lisi.full-treatment.source-traversal-ledger.v0.27'&&v.schema==='lisi.full-treatment.source-traversal-ledger.v0.28'&&v.predecessor_exact?.git_blob_sha===hashes.oldTr,'traversal source lineage');
 t(v.current_L02_source_first_inventory?.git_blob_sha===hashes.inv&&v.current_L02_eq_30_source_evidence?.git_blob_sha===hashes.packet&&v.current_G0_six_original_finite_convergence?.git_blob_sha===hashes.reg,'new traversal provenance');
 t(v.complete_sources===0&&v.G1_authorized===false&&v.sources?.every(s=>s.current_complete===false),'all six cold reviews still incomplete');
 t(og.schema==='isograph.exp062-l-current-stage-gate.v0.94'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.95'&&g.predecessor_gate?.git_blob_sha===hashes.oldGate,'exact gate predecessor');
 t(g.current_source_census?.git_blob_sha===hashes.SSC&&g.current_source_inventory?.git_blob_sha===hashes.inv&&g.current_convergence?.git_blob_sha===hashes.reg&&g.current_traversal?.git_blob_sha===hashes.tr&&g.source_packet?.git_blob_sha===hashes.packet&&g.verifier?.git_blob_sha===hashes.self,'stage all exact pointers');
 t(g.previous_failed_L02_eq30_source_CI?.run_id===38082065162&&g.previous_failed_L02_eq30_source_CI?.conclusion==='failure'&&g.previous_failed_L02_eq30_source_CI?.hostiles_rejected===25,'preserve exact initial 25/28 failed verifier result as failure');
 t(g.previous_L03_conditional_CI?.run_id===38081306472&&g.previous_L03_conditional_CI?.conclusion==='success'&&g.previous_L03_conditional_CI?.hostiles_rejected===27,'previous actual CI scope preserved');
 t(g.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.new_source_CI?.result===null&&g.new_source_CI?.whole_original_source_semantic_cold_pass===false,'source-first verifier not preclaimed');
 t(g.current_lawful_state?.G0_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.PR70_merge_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false,'gate L-only nonpromoting');
 return errs;
}
function originalPDFCheck(pages,rows){
 const errs=[],check=(yes,msg)=>{if(!yes)errs.push(msg);};
 for(const x of rows){
  const p=new RegExp('\\(\\s*'+x.equation+'\\s*\\)');
  const matched=x.original_PDF_pages_zero_based.some(j=>p.test(pages[j]||''));
  check(matched,'Eq('+x.equation+') not found in declared original-frozen v2 PDF page(s) '+x.original_PDF_pages_zero_based.join(','));
 }
 const full=pages.join('\n');
 check(full.includes('Plebanski')&&full.includes('Higgs'),'frozen L02 source textual identity');
 return errs;
}
const original='https://arxiv.org/pdf/1004.4866v2',frozen='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02-v2-EQ30-G0-'));let pages=[],sourceErrors=[];
try{
 const res=await fetch(original,{signal:AbortSignal.timeout(35000)});
 if(res.status!==200)throw Error('FROZEN_V2_ORIGINAL_HTTP_'+res.status);
 const buf=Buffer.from(await res.arrayBuffer());
 if(crypto.createHash('sha256').update(buf).digest('hex')!==frozen)throw Error('ORIGINAL_V2_PDF_SHA256_NOT_FROZEN');
 const pdf=path.join(dir,'source.pdf');fs.writeFileSync(pdf,buf);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*12$/m.test(info))throw Error('FROZEN_V2_ORIGINAL_PAGES_NOT_12');
 for(let j=1;j<=12;j++)pages.push(execFileSync('pdftotext',['-f',String(j),'-l',String(j),'-layout',pdf,'-'],{encoding:'utf8',maxBuffer:3000000,timeout:12000}));
 sourceErrors=originalPDFCheck(pages,D.packet.numbered_original_source_equation_coverage);
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=check(D).concat(sourceErrors),mutants=[
 ['replace_original_revision',d=>d.packet.original_source.frozen_revision='v1'],
 ['wrong_source_SHA',d=>d.packet.original_source.original_PDF_SHA256='bad'],
 ['zero_all_formula_exact',d=>d.packet.total_original_equation_spine.source_expression_fidelity_whole_30_independently_verified=true],
 ['invent_22_semantic_omissions',d=>d.packet.total_original_equation_spine.confirmed_new_semantic_omissions_from_missing_selected_packet=22],
 ['drop_original_eq30',d=>d.packet.numbered_original_source_equation_coverage.pop()],
 ['duplicate_original_eq',d=>d.packet.numbered_original_source_equation_coverage[7].equation=7],
 ['wrong_original_page',d=>d.packet.numbered_original_source_equation_coverage[0].original_PDF_pages_zero_based=[11]],
 ['rewrite_original_source_scope',d=>d.packet.numbered_original_source_equation_coverage[10].existing_source_semantic_role='forged'],
 ['invent_evidence_SC_ID',d=>d.packet.numbered_original_source_equation_coverage[4].existing_SSC_identities=['L-SSC-999']],
 ['smuggle_selected_exact',d=>d.packet.numbered_original_source_equation_coverage.find(x=>x.equation===14).original_exact_selected_nine_packet_item.covered=true],
 ['erase_original_selected_expression',d=>d.packet.numbered_original_source_equation_coverage.find(x=>x.equation===4).original_exact_selected_nine_packet_item.selected_packet_original_expr='wrong'],
 ['change_prior_selected_packet',d=>d.selected.exact_original_printed_equation_groups[0].normalized_original_printed_expression='forged'],
 ['alter_old_original_source_group',d=>d.inv.source_first_locations[0].original_source_semantic_group+='invented'],
 ['remove_existing_source_locus',d=>d.inv.source_first_locations.pop()],
 ['change_existing_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-082').body+='forged'],
 ['invent_192_SSC',d=>d.SSC.items.push(d.SSC.items[0])],
 ['recreate_L01_source_gap',d=>d.L01.original_source_first_locations[0].existing_SSC_ids=[]],
 ['invent_duplicate_source_loc',d=>d.L03.original_first_locations[0].source_location_id='L02-S001'],
 ['change_L02_selected_zero_scope',d=>d.reg.per_source.find(x=>x.source==='L02').all_original_equation_formulas_and_scopes_independently_cold_verified=true],
 ['change_L03_remaining',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['forge_global_original_cold',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['falsify_traversal_lineage',d=>d.tr.current_L02_source_first_inventory.git_blob_sha='bad'],
 ['falsify_predecessor_CI',d=>d.gate.previous_L03_conditional_CI.conclusion='failure'],
 ['invent_new_CI_success',d=>d.gate.new_source_CI.status='SUCCESS'],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['premature_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;for(const [name,modify] of mutants){const d=JSON.parse(JSON.stringify(D));try{modify(d);if(check(d).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name);}catch(e){errors.push('HOSTILE_ERROR_'+name+'_'+String(e));}}
const malformed=pages.map(s=>s.replace(/\(\s*30\s*\)/g,'[30]'));
if(originalPDFCheck(malformed,D.packet.numbered_original_source_equation_coverage).length)rejected++;else errors.push('HOSTILE_ESCAPED_ORIGINAL_PDF_30');
const unexpectedPage=pages.slice();unexpectedPage[2]='';if(originalPDFCheck(unexpectedPage,D.packet.numbered_original_source_equation_coverage).length)rejected++;else errors.push('HOSTILE_ESCAPED_ORIGINAL_PDF_PAGE_3');
const result={schema:'isograph.exp062.L.G0.L02.original-30-equation-evidence-scope.v0.2',pass:errors.length===0,issues:errors,frozen_original_PDF_SHA256_verified:true,source_version:'arXiv:1004.4866v2',source_original_PDF_pages:12,original_numbered_eq_labels_source_located:sourceErrors.length===0?30:null,selected_prior_exact_original_literal_packet:8,other_original_numbered_eqs_prior_packet_not_exhaustive:22,other_22_new_semantic_omissions_proven:0,source_first_existing_locations:350,SSC_identities_with_correspondence:191,complete_original_semantic_cold_source_papers:0,hostiles_defined:mutants.length+2,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
