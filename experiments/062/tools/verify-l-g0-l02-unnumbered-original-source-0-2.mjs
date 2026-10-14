// IsoGraph L-only G0: frozen L02 v2 original unnumbered source semantic fidelity.
// Independent source-first physical PDF checks; NOT a whole-source/theory proof.
// Historical SSC and source files are read-only baselines; no QU or G1 promotion.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={source:P+'LISI_L02_SEVEN_UNNUMBERED_ORIGINAL_OPERATOR_SOURCE_G0_0_1.json',
oldInv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_4.json',inv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_5.json',
oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_60.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_61.json',
oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_10.json',reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_11.json',
oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_28.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_29.json',
oldGate:E+'L_CURRENT_STAGE_GATE_0_97.json',gate:E+'L_CURRENT_STAGE_GATE_0_98.json',
self:E+'tools/verify-l-g0-l02-unnumbered-original-source-0-2.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const refs=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,sha(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const loci=['L02-S018','L02-S019','L02-S020','L02-S021','L02-S025','L02-S038','L02-S052'];
const owned=['L-SSC-054','L-SSC-055','L-SSC-060','L-SSC-067'];
const byId=(a,id,key='id')=>a?.find(x=>x?.[key]===id);
function check(d){
 const issues=[],t=(yes,m)=>{if(!yes)issues.push(m);};
 const {source:s,oldInv:oi,inv:i,oldSSC:o,ssc:n,oldReg:pr,reg:r,oldTr:ot,tr:v,oldGate:og,gate:g}=d;
 t(s?.schema==='isograph.track-L.G0.L02-frozen-v2-seven-unnumbered-source-operator-conservation.v0.1'&&s?.track==='L'&&s?.stage==='G0','exact L-only G0 source packet');
 t(s?.frozen_original?.revision==='arXiv:1004.4866v2'&&s?.frozen_original?.frozen_PDF_SHA256==='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a'&&s?.frozen_original?.pdf_pages===12,'exact primary original source and SHA');
 t(s?.frozen_original?.qualified_original_byte_ci?.run_id===38046224902&&s?.frozen_original?.HTML_render_date_not_source_revision?.includes('2010'),'original source revision not mutable HTML date');
 t(s?.source_coverage_method?.systematic_failure==='NUMBERED_EQUATION_ONLY_FIDELITY_DENOMINATOR_AND_SUMMARY_SUPPRESSED_SOURCE_GENERATING_DEFINITIONS','systematic all-unumbered sweep cause');
 t(s?.conservation?.other_old_source_first_locations_unchanged===52&&s?.conservation?.other_SSC_records_unchanged===187&&s?.conservation?.new_SSC_identity_count===0,'no duplication and unchanged original records');
 t(s?.whole_L02_original_PDF_complete_cold===false&&s?.G0_frozen===false&&s?.G1_authorized===false&&s?.W_semantics_imported===false,'whole cold/G1/W isolation');
 const src=s?.independent_source_first_unnumbered_groups||[];
 t(src.length===7,'seven original unnumbered source semantic groups');
 const scan=src.map(x=>x.location);
 t(JSON.stringify(scan)===JSON.stringify(loci),'stable original L02 source identifiers and order');
 for(const loc of loci){
  const q=byId(src,loc,'location');
  t(!!q&&q?.source_modality?.length>5&&q?.previous_ssc_gap?.length>30,'exact original source meaning and previous underindex '+loc);
  t(Number.isInteger(q?.pdf_page_zero_based)&&q.pdf_page_zero_based>=0&&q.pdf_page_zero_based<12,'original frozen PDF page '+loc);
 }
 t(byId(src,'L02-S018','location')?.semantic_fidelity?.includes('B^{star cd}=(1/2)B^{ab}epsilon_ab^{cd}'),'Lie bivector dual exact 1/2 eps binders');
 t(byId(src,'L02-S019','location')?.semantic_fidelity?.includes('B_{*cd}=(1/2)B_ab epsilon^{ab}_{cd}'),'Hodge arbitrary B sign/index/1/2 carriers');
 t(byId(src,'L02-S020','location')?.semantic_fidelity?.includes('b(e_mu)^e(e_nu)^f epsilon_{ef}^{gh}')&&byId(src,'L02-S020','location')?.semantic_fidelity?.includes('d epsilon_{mu nu}^{rho sigma}epsilon^{ab}_{cd}'),'Phi indexed dual roles, not an opaque leaf');
 const p=byId(src,'L02-S021','location');
 t(p?.semantic_fidelity?.includes('a^2')===true&&p?.semantic_fidelity?.includes('2(ab-cd)')&&p?.semantic_fidelity?.includes('2(ac-bd)')&&p?.semantic_fidelity?.includes('2(ad+bc)'),'source full PhiPhi signs and coefficient tensor factors');
 t(JSON.stringify(p?.original_coeff_order?.map(z=>z[1]))===JSON.stringify(['a^2-b^2-c^2+d^2','2(ab-cd)','2(ac-bd)','2(ad+bc)']),'ordered four generator coefficients from original');
 t(p?.source_modality?.includes('NOT_UNIVERSAL_SOLUTION_PROOF'),'PhiPhi selected source branch not universal');
 t(byId(src,'L02-S025','location')?.semantic_fidelity?.includes('H^a F_ac e^c')&&byId(src,'L02-S025','location')?.semantic_fidelity?.includes('delta_a^{[b}'),'source vectorH contraction output index and grade');
 t(byId(src,'L02-S038','location')?.semantic_fidelity?.includes('-(3/2)phi^3')===true&&byId(src,'L02-S038','location')?.semantic_fidelity?.includes('(1/2)R_scalar phi')&&byId(src,'L02-S038','location')?.semantic_fidelity?.includes('4 vecD D phi'),'unnumbered contracted Eq21 1/2 3/2 4 and source bracket');
 t(byId(src,'L02-S052','location')?.semantic_fidelity?.includes('cubic and quintic')&&byId(src,'L02-S052','location')?.semantic_fidelity?.includes('one derivative'),'action degree under selected cubic potential');
 t(oi?.source_first_locations?.length===59&&i?.source_first_locations?.length===59&&i?.counts?.source_equations===30,'all 59 original source groups and 30 numbered equations remain');
 const changed=[];for(let j=0;j<59;j++){
  const a=oi?.source_first_locations?.[j],b=i?.source_first_locations?.[j];
  t(a?.source_location_id===b?.source_location_id,'original source row identity '+j);
  if(JSON.stringify(a)!==JSON.stringify(b))changed.push(b?.source_location_id);
 }
 t(JSON.stringify(changed.sort())===JSON.stringify(loci),'52 whole source groups conserved; seven precise original groups repaired');
 const requiredOriginalBody={
  'L02-S018':['Lie-bivector dual','epsilon_ab^cd','B^starcd'],
  'L02-S019':['Hodge','B_*cd','nondegenerate frame'],
  'L02-S020':['Phi_mu nu','epsilon_ef^gh','epsilon^ab_cd'],
  'L02-S021':['PhiPhi=','2(ab−cd)','2(ac−bd)','2(ad+bc)','additional B restrictions'],
  'L02-S025':['vecH F','H^a F_ac e^c','delta_a^[b'],
  'L02-S038':['0=(1/2)R_scalar phi','(3/2)','−4','Eq20'],
  'L02-S052':['topological BF','cubic and quintic','one derivative']
 };
 for(const loc of loci){
  const row=byId(i?.source_first_locations,loc,'source_location_id');
  t(row?.unnumbered_frozen_v2_source_fidelity?.packet_git_blob_sha===refs.source&&row?.unnumbered_frozen_v2_source_fidelity?.whole_original_PDF_cold_complete===false,'original-group exact SHA and nonpromotion '+loc);
  t(requiredOriginalBody[loc].every(token=>row?.original_source_semantic_group?.includes(token)===true),'original->SSC source semantic BODY not only pointer '+loc);
 }
 t(i?.source_unnumbered_visual_fidelity_round?.git_blob_sha===refs.source&&i?.counts?.new_unnumbered_source_semantic_underindexing_loci_repaired===7&&i?.counts?.original_source_semantic_global_cold_complete===false,'source original 7 not whole cold');
 t(i?.predecessor_source_first?.git_blob_sha===refs.oldInv,'original-first predecessor pinned');
 t(o?.schema==='woit-lisi.track-l.source-semantic-census.v0.60'&&n?.schema==='woit-lisi.track-l.source-semantic-census.v0.61'&&n?.items?.length===191&&o?.items?.length===191,'full prior/current SSC');
 const edited=[];for(let j=0;j<191;j++){
  const a=o?.items?.[j],b=n?.items?.[j];t(a?.id===b?.id,'SSC identity '+j);
  if(JSON.stringify(a)!==JSON.stringify(b))edited.push(b?.id);
 }
 t(JSON.stringify(edited)===JSON.stringify(owned),'187 whole old SSC records unchanged');
 t(n?.predecessor?.git_blob_sha===refs.oldSSC&&n?.revision?.original_packet?.git_blob_sha===refs.source&&n?.revision?.source_first_inverse?.git_blob_sha===refs.inv,'SSC exact source packet and inverse provenance');
 const m=Object.fromEntries(owned.map(x=>[x,byId(n?.items,x)?.body||'']));
 t(m['L-SSC-054'].includes('B^starcd=(1/2)B^ab epsilon_ab^cd')&&m['L-SSC-054'].includes('B_*cd=(1/2)B_ab epsilon^ab_cd'),'SSC preserves distinct Lie/Hodge dual definitions');
 t(m['L-SSC-055'].includes('PhiPhi=(a²−b²−c²+d²)+2(ab−cd)*+2(ac−bd)star_Lie+2(ad+bc)*star_Lie'),'SSC exact source PhiPhi four-sign expression');
 t(m['L-SSC-055'].includes('H^a F_ac e^c')&&m['L-SSC-055'].includes('delta_a^[b e^c]'),'SSC full vectorH action and coefficient indices');
 t(m['L-SSC-060'].includes('0=(1/2)R_scalar phi−(3/2)phi³−4 vecD Dphi'),'SSC intermediate Eq21 source literal');
 t(m['L-SSC-067'].includes('cubic and quintic')&&m['L-SSC-067'].includes('only one derivative'),'SSC conditional BF action shape');
 for(const id of owned){
  const item=byId(n?.items,id);
  t(item?.source_expression_census?.L02_ORIGINAL_SEVEN_UNNUMBERED_SOURCE_OPERATOR_0_1?.source_packet?.git_blob_sha===refs.source&&item?.source_expression_census?.L02_ORIGINAL_SEVEN_UNNUMBERED_SOURCE_OPERATOR_0_1?.source_first_reverse?.git_blob_sha===refs.inv,'SSC in-row original source+inverse pointer '+id);
 }
 t(n?.guards?.source_census_freeze_complete===false&&n?.guards?.L02_original_whole_pdf_cold_complete===false,'L02 source cold review remains unfinished');
 t(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.10'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.11','finite convergence successor');
 t(r?.source_first_predecessor?.git_blob_sha===refs.oldReg&&r?.current_ssc?.git_blob_sha===refs.ssc&&r?.per_source?.length===6&&r?.per_source?.reduce((q,z)=>q+z.source_first_location_units,0)===350,'six frozen original source unit conservation');
 const L02=r?.per_source?.find(z=>z.source==='L02');
 t(L02?.audit_git_blob_sha===refs.inv&&L02?.unnumbered_original_load_bearing_source_locations_repaired===7&&L02?.original_complete_cold_review_passed===false,'L02 repaired seven not whole completion');
 const originalExactPending={L01:16,L02:0,L03:15,L04:14,L05:31,L06:30};
 for(const [source,pending]of Object.entries(originalExactPending)){
   const row=r?.per_source?.find(z=>z.source===source);
   t(row?.original_exact_cell_expression_groups_not_yet_independently_verified===pending&&row?.original_complete_cold_review_passed===false,'six-source noninvented exactness and cold debt '+source);
 }
 t(r?.last_ci_result?.run_id===38082445672&&r?.last_ci_result?.conclusion==='success'&&r?.last_ci_result?.hostiles_rejected===28,'old numbered Eq30 exact CI preserved correctly');
 t(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.explicit_locks?.G1_authorized===false,'global G0 still open');
 t(ot?.schema==='lisi.full-treatment.source-traversal-ledger.v0.28'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.29'&&v?.predecessor_exact?.git_blob_sha===refs.oldTr,'traversal predecessor');
 t(v?.current_census?.git_blob_sha===refs.ssc&&v?.current_L02_source_first_inventory?.git_blob_sha===refs.inv&&v?.current_L02_unnumbered_operator_packet?.git_blob_sha===refs.source&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===refs.reg,'traversal exact semantic links');
 t(v?.complete_sources===0&&v?.G1_authorized===false&&v?.sources?.every(x=>x.current_complete===false),'0/6 source cold complete');
 t(og?.schema==='isograph.exp062-l-current-stage-gate.v0.97'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.98'&&g?.predecessor_gate?.git_blob_sha===refs.oldGate,'stage gate predecessor');
 t(g?.current_source_census?.git_blob_sha===refs.ssc&&g?.current_L02_inventory?.git_blob_sha===refs.inv&&g?.current_convergence?.git_blob_sha===refs.reg&&g?.current_traversal?.git_blob_sha===refs.tr&&g?.source_packet?.git_blob_sha===refs.source&&g?.source_verifier?.git_blob_sha===refs.self,'exact stage current source pointers');
 t(g?.prior_L02_original30_CI?.run_id===38082445672&&g?.prior_L02_original30_CI?.conclusion==='success','prior CI exact provenance');
 t(g?.first_unnumbered_source_failed_CI?.run_id===38084802980&&g?.first_unnumbered_source_failed_CI?.conclusion==='failure'&&g?.first_unnumbered_source_failed_CI?.hostiles_rejected===25,'preserve failed 25/28 first source hostile CI and artifact provenance');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.new_source_CI?.whole_original_PDF_cold_complete===false,'new source CI not preclaimed');
 t(g?.stage_locks?.G0_frozen===false&&g?.stage_locks?.G1_authorized===false&&g?.stage_locks?.W_semantics_imported===false&&g?.stage_locks?.PR70_merge_authorized===false,'no stage/source authority promotion');
 return issues;
}
const norm=s=>s.replace(/[\n\r\t]+/g,' ').replace(/-\s+/g,'').replace(/\s+/g,' ').trim();
function sourceCheck(p){
 const err=[],t=(v,m)=>{if(!v)err.push(m);};
 const b3=norm(p[3]||''),b4=norm(p[4]||''),b6=norm(p[6]||''),b8=norm(p[8]||'');
 t(b3.includes('Lie algebra dual')&&b3.includes('permutation symbol')&&b3.includes('nondegenerate gravitational frame'),'original p4 distinct Lie/spacetime dual source context');
 t(b4.includes('Using indices')&&b4.includes('two possible classes of solutions'),'original p5 indexed Phi and two source solution classes');
 t(b4.includes('From our ansatz (7), we have')&&b4.includes('vector operator'),'original p5 unnumbered square and vectorH source');
 const window=b4.slice(b4.indexOf('From our ansatz (7), we have'),b4.indexOf('Considering our equation of motion'));
 const compact=window.replace(/\s+/g,'').replaceAll('−','-').replaceAll('–','-');
 t(compact.includes('ab-cd')&&compact.includes('ac-bd')&&compact.includes('ad+bc'),'original p5 source PhiPhi coefficients and signs');
 t(b6.includes('Operating on (21)')&&b6.includes('factoring out a')&&b6.includes('scalar curvature'),'original p7 unnumbered Eq21 contraction and Eq23 route');
 t(b8.includes('topological BF action')&&b8.includes('cubic and quintic terms')&&b8.includes('derivative appearing in just a single'),'original p9 BF action degree, derivative scope');
 return err;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02-v2-unnum-G0-'));const pages={};let sourceProblems=[];
try{
 const res=await fetch('https://arxiv.org/pdf/1004.4866v2',{signal:AbortSignal.timeout(35000)});
 if(res.status!==200)throw Error('FROZEN_ORIGINAL_HTTP_'+res.status);
 const b=Buffer.from(await res.arrayBuffer()),hash=crypto.createHash('sha256').update(b).digest('hex');
 if(hash!=='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a')throw Error('FROZEN_ORIGINAL_SHA256_NOT_MATCH');
 const pdf=path.join(dir,'original-v2.pdf');fs.writeFileSync(pdf,b);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*12$/m.test(info))throw Error('NOT_12_PAGE_ORIGINAL_V2');
 for(const q of [3,4,6,8])pages[q]=execFileSync('pdftotext',['-f',String(q+1),'-l',String(q+1),'-layout',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1000000});
 sourceProblems=sourceCheck(pages);
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=check(D).concat(sourceProblems);
const mutants=[
 ['erase_source_packet',d=>d.source.independent_source_first_unnumbered_groups.pop()],
 ['wrong_original_pdf_revision',d=>d.source.frozen_original.revision='v1'],
 ['wrong_source_pdf_SHA',d=>d.source.frozen_original.frozen_PDF_SHA256='bad'],
 ['rewrite_source_dual',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S018','location').semantic_fidelity='opaque Lie dual'],
 ['erase_arbitrary_B_Hodge',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S019','location').semantic_fidelity='untyped star'],
 ['confuse_Phi_index_roles',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S020','location').semantic_fidelity='Phi is a scalar'],
 ['flip_Phi_Phi_cross_sign',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S021','location').original_coeff_order[1][1]='2(ab+cd)'],
 ['flip_Phi_Phi_identity',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S021','location').original_coeff_order[0][1]='a^2+b^2-c^2+d^2'],
 ['wrong_source_branch',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S021','location').source_modality='CLAIM_UNIVERSAL_SOLUTION_PROOF'],
 ['erase_vecH_result',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S025','location').semantic_fidelity='unknown'],
 ['erase_intermediate_Eq21',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S038','location').semantic_fidelity='unknown'],
 ['invent_only_quadratic_action',d=>byId(d.source.independent_source_first_unnumbered_groups,'L02-S052','location').semantic_fidelity='all quadratic'],
 ['alter_untouched_original_row',d=>d.inv.source_first_locations[0].original_source_semantic_group+=' forged'],
 ['regress_fixed_Phi_source_row',d=>byId(d.inv.source_first_locations,'L02-S021','source_location_id').original_source_semantic_group='opaque identity'],
 ['reclassify_original_59_as_passed',d=>d.inv.counts.original_source_semantic_global_cold_complete=true],
 ['tamper_original_packet_sha',d=>byId(d.inv.source_first_locations,'L02-S018','source_location_id').unnumbered_frozen_v2_source_fidelity.packet_git_blob_sha='bad'],
 ['erase_new_SSC_operator',d=>byId(d.ssc.items,'L-SSC-055').body='opaque claim'],
 ['alter_unrelated_SSC',d=>byId(d.ssc.items,'L-SSC-004').body+=' arbitrary'],
 ['erase_source_provenance',d=>byId(d.ssc.items,'L-SSC-060').source_expression_census.L02_ORIGINAL_SEVEN_UNNUMBERED_SOURCE_OPERATOR_0_1.source_packet.git_blob_sha='bad'],
 ['invent_new_SSC_ID',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['wrong_convergence_accounting',d=>d.reg.current_ssc.git_blob_sha='bad'],
 ['forge_whole_source_cold',d=>d.reg.per_source.find(x=>x.source==='L02').original_complete_cold_review_passed=true],
 ['remove_L03_debt',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['rewrite_traversal_current',d=>d.tr.current_L02_unnumbered_operator_packet.git_blob_sha='bad'],
 ['premature_G1',d=>d.gate.stage_locks.G1_authorized=true]
];
let rejects=0;for(const [name,change]of mutants){const d=JSON.parse(JSON.stringify(D));try{change(d);if(check(d).length)rejects++;else errors.push('HOSTILE_ESCAPED_'+name);}catch(e){errors.push('HOSTILE_EXCEPTION_'+name+':'+String(e));}}
for(const [name,id,old,replace]of [
 ['pdf_Phi_source','4','two possible classes of solutions','only one universal theorem'],
 ['pdf_degree_source','8','cubic and quintic terms','only quadratic terms'],
 ['pdf_contracted_21','6','factoring out a','never derives anything']]){
 const originalPage=norm(pages[Number(id)]||'');
 const mutatedPage=originalPage.replaceAll(old,replace);
 if(!originalPage.includes(old)||mutatedPage===originalPage)errors.push('INERT_HOSTILE_'+name);
 else if(sourceCheck({...pages,[Number(id)]:mutatedPage}).length)rejects++;
 else errors.push('HOSTILE_ESCAPED_'+name);
}
const result={schema:'isograph.exp062.L.G0.L02.seven-original-unnumbered-source.v0.2',pass:errors.length===0,issues:errors,original_SHA256_pdf_verified:true,original_pdf_pages_12:true,original_unnumbered_groups_repaired:7,source_first_locations_unchanged_others:52,existing_SSC_changed:owned,SSC_other_whole_records_unchanged:187,total_SSC_identities:191,total_frozen_sources:6,source_first_mixed_groups:350,whole_original_cold_completed:0,hostiles_defined:mutants.length+3,hostiles_rejected:rejects,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
