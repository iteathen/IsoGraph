// Lisi-only G0: source-scoped exact original four complete matrix table
// reconciliation. Does NOT qualify whole-paper source semantics or physics.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={source:P+'LISI_L03_ORIGINAL_FOUR_REMAINING_MATRIX_TABLES_SOURCE_G0_0_1.json',
 qual:E+'L03_FOUR_ORIGINAL_SOURCE_MATRIX_TABLES_24_HOSTILE_VERIFIED_0_1.json',
 oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_9.json',
 inv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_10.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_67.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_68.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_19.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_20.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_36.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_37.json',
 layout:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_118.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_119.json',
 self:E+'tools/verify-l-g0-l03-four-original-scoped-census-promotion-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,gitsha(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const ids=['L03-S015','L03-S017','L03-S019','L03-S021'];
const owners=['L-SSC-070','L-SSC-071','L-SSC-072','L-SSC-073','L-SSC-075'];
const expected=[18,14,18,10];
const oldDisposition='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED';
const exactDisposition='SCOPED_EXACT_ORIGINAL_FOUR_COMPLETE_MATRIX_GENERATOR_TABLES_RECONCILED_L03_WHOLE_SOURCE_COLD_OPEN';
function check(d){
 const errors=[],t=(value,msg)=>{if(!value)errors.push(msg);};
 const {source:p,qual:q,oldInv:oi,inv:i,oldSSC:os,ssc:s,oldReg:or,reg:r,oldTr:ot,tr:tr,layout:l,oldGate:og,gate:g}=d;
 const frozen='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e';
 t(p?.schema==='isograph.track-L.G0.L03.original-complete-four-matrix-tables.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.frozen_source?.revision==='arXiv:1006.4908v1'&&p.frozen_source?.SHA256===frozen,'original source version/scope');
 t(JSON.stringify(p?.source_first)===JSON.stringify(D.source.source_first),'all frozen source ORIGINAL table factors and signed coefficients conserved');
 t(q?.schema==='isograph.exp062.L.G0.L03.four-original-complete-generator-tables-preflight-success.v0.1'&&q?.qualified_ci?.run_id===38113206868&&q?.qualified_ci?.head_sha==='d0cf658d853b86147288449b9e5ad2780eb7e701'&&q?.qualified_ci?.conclusion==='success'&&q?.qualified_ci?.hostiles_rejected===24,'exact 24 hostile successful original source evidence');
 t(q?.frozen_source_packet?.git_blob_sha===H.source&&q?.qualified_verifier?.git_blob_sha==='3c1f9c70542b63baf79e0684da1a24ea2ec71931','source CI exact original and tested verifier provenance');
 t(q?.predecessor_failure_lineage?.length===3&&q?.predecessor_failure_lineage?.every(z=>z.conclusion==='failure'),'all three preceding failures remain failures');
 t(q?.evidence_lawful_scope?.no_claim_L03_whole_14_page_independent_semantic_cold_review===true&&q?.stage_locks?.G0_frozen===false&&q?.stage_locks?.G1_authorized===false,'source certificate not G0 freeze');
 t(l?.original_sources?.[2]?.PDF_SHA256===frozen&&l?.original_sources?.[2]?.original_pdf_layout_blocks===94&&l?.original_sources?.[2]?.original_PDF_pages===14,'independent original PDF 94 source-block and 14-page authority');
 t(oi?.original_first_locations?.length===47&&i?.original_first_locations?.length===47&&oi?.counts?.original_source_formula_groups_unverified===4&&i?.counts?.original_source_formula_groups_unverified===0,'original source exact selected group denominator 4 to 0');
 const changes=[];
 for(let k=0;k<47;k++){
  const x=oi?.original_first_locations?.[k],y=i?.original_first_locations?.[k];
  t(x?.source_location_id===y?.source_location_id,'source-first ID conservation '+k);
  if(JSON.stringify(x)!==JSON.stringify(y))changes.push(y?.source_location_id);
 }
 t(JSON.stringify(changes)===JSON.stringify(ids),'only four source-first selected exact matrix groups modified');
 for(let n=0;n<4;n++){
  const id=ids[n],before=oi.original_first_locations.find(x=>x.source_location_id===id),after=i.original_first_locations.find(x=>x.source_location_id===id),packet=p?.source_first?.[id];
  t(before?.disposition===oldDisposition&&after?.disposition===exactDisposition&&JSON.stringify(after?.SSC_ids)===JSON.stringify(before?.SSC_ids)&&JSON.stringify(packet?.existing_SSC_owners)===JSON.stringify(after?.SSC_ids),'original selected matrix group->SSC owner identity '+id);
  t(after?.original_four_full_matrix_source_evidence?.git_blob_sha===H.source&&after?.original_four_full_matrix_source_evidence?.source_matrix_CI?.run_id===38113206868&&after?.original_four_full_matrix_source_evidence?.complete_source_row_count===expected[n],'source exact qualified packet full row count '+id);
  t(after?.original_four_full_matrix_source_evidence?.full_original_source_PDF_semantic_cold_complete===false,'no premature whole source original cold '+id);
 }
 t(Object.values(i?.counts?.by_disposition||{}).reduce((x,z)=>x+z,0)===47&&i?.counts?.by_disposition?.[oldDisposition]===0&&i?.counts?.by_disposition?.[exactDisposition]===4,'source original-first disposition conservation');
 t(i?.predecessor_four_complete_matrix_tables?.git_blob_sha===H.oldInv&&i?.source_four_complete_matrix_table_evidence?.source_packet?.git_blob_sha===H.source&&i?.current_exact_source_formula_groups_remaining===0&&i?.stage_locks?.G0_frozen===false,'current source-inventory parent and exact scope');
 t(os?.items?.length===191&&s?.items?.length===191&&os?.schema==='woit-lisi.track-l.source-semantic-census.v0.67'&&s?.schema==='woit-lisi.track-l.source-semantic-census.v0.68','191 original SSC identities, correct versions');
 const edited=[];
 for(let k=0;k<191;k++){
  const x=os?.items?.[k],y=s?.items?.[k];
  t(x?.id===y?.id,'original SSC root SI identity '+k);
  if(JSON.stringify(x)!==JSON.stringify(y))edited.push(y?.id);
 }
 t(JSON.stringify(edited)===JSON.stringify(owners),'other 186 entire original-source SSC records conserved');
 for(const id of owners){
  const before=os?.items?.find(x=>x.id===id),after=s?.items?.find(x=>x.id===id),e=after?.source_expression_census?.L03_ORIGINAL_COMPLETE_FOUR_GENERATOR_TABLES_0_1;
  t(after?.body?.startsWith(before?.body||'UNDEFINED')&&after?.body?.includes('G0 FROZEN L03 v1'),'existing SSC source meaning extends rather than discards '+id);
  t(e?.source_original_matrix_packet?.git_blob_sha===H.source&&e?.original_source_to_SSC_inverse?.git_blob_sha===H.inv&&e?.preflight_qualification?.git_blob_sha===H.qual&&e?.complete_original_L03_full_14_page_cold_review===false,'exact in-record original PDF source evidence + G0 scope '+id);
 }
 t(s?.predecessor?.git_blob_sha===H.oldSSC&&s?.revision?.source_packet?.git_blob_sha===H.source&&s?.revision?.source_first_inverse?.git_blob_sha===H.inv&&s?.revision?.unchanged_source_items===186&&s?.guards?.source_census_freeze_complete===false,'current SSC exact ancestry and no freeze');
 t(or?.per_source?.length===6&&r?.per_source?.length===6&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.20','six frozen source convergence successor');
 for(const orig of or?.per_source||[]){
  const next=r?.per_source?.find(z=>z.source===orig.source);
  if(orig.source==='L03'){
   t(next?.audit_git_blob_sha===H.inv&&next?.original_exact_cell_expression_groups_not_yet_independently_verified===0&&next?.original_complete_cold_review_passed===false,'exact selected L03 source formula debt 0, whole cold open');
   t(next?.classified_source_locations?.[oldDisposition]===0&&next?.classified_source_locations?.[exactDisposition]===4,'L03 new source exact group statuses');
  }else t(JSON.stringify(next)===JSON.stringify(orig),'other whole original source registry unchanged '+orig.source);
 }
 t(r?.source_first_predecessor?.git_blob_sha===H.oldReg&&r?.current_ssc?.git_blob_sha===H.ssc&&r?.L03_four_original_complete_matrix_source_fidelity?.source_first_inverse?.git_blob_sha===H.inv,'global convergence full ancestry');
 t(r?.per_source?.reduce((x,z)=>x+z.source_first_location_units,0)===350&&r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false&&r?.explicit_locks?.G1_authorized===false,'six original source scope and G0 exit still open');
 t(ot?.schema==='lisi.full-treatment.source-traversal-ledger.v0.36'&&tr?.schema==='lisi.full-treatment.source-traversal-ledger.v0.37'&&tr?.predecessor_exact?.git_blob_sha===H.oldTr,'traversal exact predecessor');
 t(tr?.current_census?.git_blob_sha===H.ssc&&tr?.current_L03_source_first_inventory?.git_blob_sha===H.inv&&tr?.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg&&tr?.complete_sources===0&&tr?.G1_authorized===false,'current traversal source exactness vs G0');
 t(og?.schema==='isograph.exp062-l-current-stage-gate.v0.118'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.119'&&g?.predecessor_gate?.git_blob_sha===H.oldGate,'stage successor exact ancestry');
 t(g?.current_source_census?.git_blob_sha===H.ssc&&g?.current_L03_inventory?.git_blob_sha===H.inv&&g?.current_convergence?.git_blob_sha===H.reg&&g?.current_traversal?.git_blob_sha===H.tr&&g?.original_four_matrix_source_packet?.git_blob_sha===H.source&&g?.qualified_four_matrix_source_CI?.git_blob_sha===H.qual&&g?.current_reconciliation_verifier?.git_blob_sha===H.self,'procedural G0 exact source lineage');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G0_SSC_complete===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'G0 unclosed, no later stages, no merge');
 return errors;
}
async function independentlyCheckFrozenSource(){
 const issues=[],tmp=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L03-four-matrix-original-'));
 try{
  const r=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(45000)});
  if(r.status!==200)throw Error('SOURCE_ORIGINAL_HTTP_'+r.status);
  const b=Buffer.from(await r.arrayBuffer());
  if(sha256(b)!=='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e')throw Error('FROZEN_V1_PDF_SHA256_MISMATCH');
  const pdf=path.join(tmp,'original-v1.pdf');fs.writeFileSync(pdf,b);
  const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});if(!/^Pages:\s*14$/m.test(info))throw Error('FROZEN_V1_PAGE_COUNT');
  for(const [page,eq]of [[6,'2.8'],[7,'3.1'],[8,'3.3'],[8,'3.4']]){
   const raw=execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:14000,maxBuffer:1800000});
   const expectedPage=D.layout.original_sources[2].original_pdf_extracted_pages[page-1];
   if(sha256(Buffer.from(raw))!==expectedPage.original_extracted_page_SHA256)issues.push('SOURCE_ORIGINAL_PDF_TEXT_SHA_'+page);
   if(!raw.includes('('+eq+')'))issues.push('SOURCE_EXACT_NUMBERED_EQ_LABEL_'+eq);
  }
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}
 return issues;
}
const issues=check(D);
const attackers=[
 ['rewrite_original_matrix_coefficient',d=>d.source.source_first['L03-S019'].source_rows.Y[2].coefficient='1/4'],
 ['replace_original_source_SHA',d=>d.source.frozen_source.SHA256='forged'],
 ['remove_historical_failed_preflight',d=>d.qual.predecessor_failure_lineage.pop()],
 ['relabel_qualified_CI',d=>d.qual.qualified_ci.conclusion='failure'],
 ['tamper_original_source_block',d=>d.layout.original_sources[2].PDF_SHA256='wrong'],
 ['delete_original_L03_source_group',d=>d.inv.original_first_locations.pop()],
 ['change_existing_source_owner',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S015').SSC_ids=['L-SSC-999']],
 ['rewrite_unchanged_L03_source',d=>d.inv.original_first_locations[0].source_semantic_group+=' fabricated'],
 ['restore_original_4_pending',d=>d.inv.counts.original_source_formula_groups_unverified=4],
 ['invent_exact_source_cold',d=>d.inv.stage_locks.G0_frozen=true],
 ['reclassify_source_table',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S019').disposition=oldDisposition],
 ['erase_Eq2_8_source_body',d=>d.ssc.items.find(x=>x.id==='L-SSC-070').body='generic matrix'],
 ['erase_source_packet_link',d=>d.ssc.items.find(x=>x.id==='L-SSC-073').source_expression_census.L03_ORIGINAL_COMPLETE_FOUR_GENERATOR_TABLES_0_1.source_original_matrix_packet.git_blob_sha='bad'],
 ['rewrite_unchanged_SSC_body',d=>d.ssc.items.find(x=>x.id==='L-SSC-001').body+=' fabricated'],
 ['add_192nd_SSC',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['relabel_SSC_predecessor',d=>d.ssc.predecessor.git_blob_sha='bad'],
 ['change_other_L_source_debt',d=>d.reg.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['forge_G0_complete',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['forge_source_cold_completed',d=>d.reg.per_source.find(x=>x.source==='L03').original_complete_cold_review_passed=true],
 ['change_stage_census_pointer',d=>d.gate.current_source_census.git_blob_sha='bad'],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['merge_PR70',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;
for(const [name,fn]of attackers){
 const trial=JSON.parse(JSON.stringify(D));
 try{fn(trial);if(check(trial).length)rejected++;else issues.push('HOSTILE_ESCAPED_'+name);}
 catch(e){issues.push('HOSTILE_CHECKER_EXCEPTION_'+name+':'+String(e));}
}
issues.push(...await independentlyCheckFrozenSource());
const out={schema:'isograph.exp062.L.G0.L03.four-original-matrix-source-census-reconciliation.v0.1',pass:issues.length===0,issues,source_frozen_revision:'arXiv:1006.4908v1',original_PDF_SHA256_verified:true,
 original_four_eq_source_replayed:['2.8','3.1','3.3','3.4'],prior_scoped_original_matrix_CI:38113206868,
 original_L03_source_groups:47,original_L03_previously_unverified_exact_matrix_groups:4,remaining_selected_source_matrix_groups:0,
 SSC_track_L_identities:191,source_SSC_changed_existing_count:5,source_other_unchanged_records:186,
 original_frozen_corpus_sources:6,whole_original_source_cold_completed_count:0,
 new_typed_ids:0,hostiles_defined:attackers.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(out,null,2));if(issues.length)process.exitCode=1;
