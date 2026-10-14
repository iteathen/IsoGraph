// Track L G0 original-first L03 frozen v1 reverse-coverage conservation verifier.
// Verifies finite source/SSC correspondence metadata, NOT original-PDF cold semantics.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:R+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
 census:R+'SOURCE_SEMANTIC_CENSUS_0_50.json',
 l04:R+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_68.json',
 priorGate:E+'L_CURRENT_STAGE_GATE_0_67.json',
 verifier:E+'tools/verify-l-g0-l03-source-first-reverse-0-1.mjs'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{let b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const p=load(F.packet),c=load(F.census),oldL04=load(F.l04),gate=load(F.gate);
function verify(a,ssc,w,g){
 let errors=[],ck=(x,y)=>{if(!x)errors.push(y)};
 ck(a.schema==='isograph.track-L.G0.L03-original-source-first-bidirectional-coverage.v0.1'&&a.track==='L'&&a.stage==='G0'&&a.semantic_authority===false,'L-only G0 source packet type');
 ck(a.source?.revision==='arXiv:1006.4908v1'&&a.source?.printed_pages===14&&a.source?.verified_original_pdf_v1_first_page_marking===true,'original L03 frozen version 14 pages');
 ck(a.source?.source_pdf_byte_sha_verified===false&&a.source?.source_pdf_all_formula_cells_independently_rebuilt===false,'no unsupported cold source claim');
 ck(a.parent?.current_census_blob===sha(F.census),'exact current 191 SSC ancestor identity');
 ck(ssc.schema==='woit-lisi.track-l.source-semantic-census.v0.50'&&ssc.items?.length===191&&ssc.item_count===191,'current L SSC191 identity');
 const original=ssc.items.filter(x=>/^L03(?:\s|$)/.test(x.source_provenance));
 const expect=original.map(x=>x.id).sort(),seen=new Set(),mapped=new Set(),count={};
 ck(original.length===26,'frozen L03 existing 26 SSC source identities');
 ck(a.counts?.source_locations===47&&a.counts?.existing_SSC_records===26,'explicit source location and SSC coverage totals');
 ck(a.original_first_locations?.length===47,'finite 47 source groups');
 for(let i=0;i<(a.original_first_locations||[]).length;i++){
  let row=a.original_first_locations[i],id='L03-S'+String(i+1).padStart(3,'0');
  ck(row.source_location_id===id&&!seen.has(id),'unique original source location '+i);seen.add(row.source_location_id);
  ck(typeof row.original_source_locator==='string'&&row.original_source_locator.length>5,'recoverable original section/equation/page '+i);
  ck(typeof row.source_semantic_group==='string'&&row.source_semantic_group.length>15,'source native load-bearing role '+i);
  ck(Object.values(a.statuses||{}).includes(row.disposition),'known disposition '+i);
  ck(row.load_bearing===!(row.disposition||'').includes('NON_LOAD_BEARING'),'exclusion scope '+i);
  if(row.disposition.includes('NON_LOAD_BEARING'))ck(row.SSC_ids?.length===0,'no nonload phantom source assertion '+i);
  for(const sid of row.SSC_ids||[]){ck(original.some(x=>x.id===sid),'L03 source-only scoped SSC ref '+sid);mapped.add(sid);}
  count[row.disposition]=(count[row.disposition]||0)+1;
 }
 ck(JSON.stringify([...mapped].sort())===JSON.stringify(expect),'bidirectional L03 source identities');
 ck(JSON.stringify(a.reverse?.current_original_L03_ids?.slice().sort())===JSON.stringify(expect),'explicit reverse index');
 ck(a.reverse?.missing_existing_ssc_ids?.length===0&&a.reverse?.invalid_source_ssc_ids?.length===0,'no orphan SSC/source references');
 ck(a.reverse?.source_to_SSC_full_exact_source_fidelity_pass===false&&a.reverse?.SSC_to_source_full_exact_source_fidelity_pass===false,'no false original cold fidelity success');
 ck(Object.keys(count).length===Object.keys(a.counts?.by_disposition||{}).length&&Object.entries(count).every(([k,v])=>a.counts?.by_disposition?.[k]===v),'disposition counts independent from dictionary insertion order');
 ck(count.MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED===25,'25 exact original source formula/matrix groups unresolved');
 let indexed=original.filter(x=>Object.keys(x.source_expression_census||{}).length).length;
 ck(indexed===1&&a.counts?.inrow_evidence_indexed===indexed&&a.indexing_caveat?.items_without_inrow_expression_index===25,'metadata underindex not identical absent source study');
 ck(a.source_revisions?.source_direct_three_generation_identification_corrected_to_nonidentity===true&&a.source_revisions?.source_full_spinor_spinor_bracket_nonzero===true&&a.source_revisions?.source_GraviGUT_spinor_spinor_bracket_zero===true,'distinct original source scopes');
 ck(a.newly_found_genuine_missing_typed_semantics===0,'do not duplicate 26 source-typed obligations');
 ck(w.locations?.length===53&&w.counts?.by_disposition?.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===18,'separate original L04 source predecessor conserved');
 ck(a.no_automatic_promotion?.G0_complete===false&&a.no_automatic_promotion?.G0_frozen===false&&a.no_automatic_promotion?.G1_authorized===false&&a.no_automatic_promotion?.recursive_IA_authorized===false&&a.no_automatic_promotion?.NEI_authorized===false&&a.no_automatic_promotion?.DTS_authorized===false&&a.no_automatic_promotion?.DP_authorized===false&&a.no_automatic_promotion?.W_synthesis===false,'G0 authority explicitly held');
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.68'&&g.track==='L'&&g.stage==='G0'&&g.semantic_authority===false&&g.status.endsWith('OPEN_UNFROZEN'),'stage G0 OPEN');
 ck(g.predecessor_gate?.git_blob_sha===sha(F.priorGate),'exact predecessor0.67');
 ck(g.source_L03_original_first?.git_blob_sha===sha(F.packet)&&g.current_source_census?.git_blob_sha===sha(F.census),'exact new audit + SSC parents');
 ck(g.source_verifier?.git_blob_sha===sha(F.verifier),'exact committed checker');
 ck(g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.source_census_complete===false&&g.current_lawful_state?.NEI_pass_authorized===false&&g.current_lawful_state?.DTS_pass_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false,'no early G1 or physics qualification');
 ck(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.independent_complete_original_pdf_review_passed===false,'new run cannot predetermine its result');
 return errors;
}
const failures=verify(p,c,oldL04,gate),hostile=[
 ['drop_original_section',(a,b,w,g)=>a.original_first_locations.pop()],
 ['duplicate_source_locator',(a,b,w,g)=>a.original_first_locations[1].source_location_id='L03-S001'],
 ['remove_ssc_map',(a,b,w,g)=>a.original_first_locations.find(x=>x.SSC_ids.includes('L-SSC-091')).SSC_ids=[]],
 ['fake_W_crossref',(a,b,w,g)=>a.original_first_locations[0].SSC_ids.push('W-SSC-123')],
 ['fabricate_cold_proof',(a,b,w,g)=>a.source.source_pdf_all_formula_cells_independently_rebuilt=true],
 ['forge_pdf_revision',(a,b,w,g)=>a.source.revision='arXiv:1006.4908v2'],
 ['forge_source_pdf_bytes',(a,b,w,g)=>a.source.source_pdf_byte_sha_verified=true],
 ['erase_cold_debt',(a,b,w,g)=>a.original_first_locations.find(x=>x.disposition.includes('NOT_INDEPENDENTLY_RECONSTRUCTED')).disposition=a.statuses.M],
 ['forge_whole_source_pass',(a,b,w,g)=>a.reverse.SSC_to_source_full_exact_source_fidelity_pass=true],
 ['falsify_26_total',(a,b,w,g)=>a.counts.existing_SSC_records=27],
 ['forge_census_SHA',(a,b,w,g)=>a.parent.current_census_blob='DEADBEEF'],
 ['wrong_L03_embedded_claim',(a,b,w,g)=>a.source_revisions.source_direct_three_generation_identification_corrected_to_nonidentity=false],
 ['claim_IA',(a,b,w,g)=>a.no_automatic_promotion.recursive_IA_authorized=true],
 ['promote_G1',(a,b,w,g)=>g.current_lawful_state.G1_authorized=true],
 ['fake_stage_parent',(a,b,w,g)=>g.predecessor_gate.git_blob_sha='DEADBEEF'],
 ['fake_checker_parent',(a,b,w,g)=>g.source_verifier.git_blob_sha='DEADBEEF'],
 ['claim_preemptive_ci',(a,b,w,g)=>g.source_CI.status='SUCCESS']
];
let rejected=0;
for(const [name,fn]of hostile){
 let a=structuredClone(p),b=structuredClone(c),w=structuredClone(oldL04),g=structuredClone(gate);
 fn(a,b,w,g);if(verify(a,b,w,g).length)rejected++;else failures.push('ESCAPED '+name);
}
console.log(JSON.stringify({schema:'isograph.exp062.l03-original-source-first-bidirectional-metadata-audit.v0.1',pass:failures.length===0,issues:failures,source_locations:47,existing_L03_SSC_records:26,one_inrow_metadata_coverage_not_source_fidelity:true,exact_original_formula_groups_unverified:25,hostiles_defined:hostile.length,hostiles_rejected:rejected,whole_original_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(failures.length)process.exitCode=1;
