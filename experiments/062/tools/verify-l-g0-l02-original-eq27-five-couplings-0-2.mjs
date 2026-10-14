// Track L G0: frozen L02 v2 p8 Eq27 exact source coefficient/coupling census.
// Source first + independent original-PDF SHA/page semantic check, not physical proof.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';
import path from 'node:path';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={src:P+'LISI_L02_ORIGINAL_EQ27_FIVE_COEFFICIENT_COUPLING_SOURCE_G0_0_1.json',
oldInv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_5.json',inv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',
oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_61.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_62.json',
oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_11.json',reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_12.json',
oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_29.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_30.json',
oldGate:E+'L_CURRENT_STAGE_GATE_0_99.json',gate:E+'L_CURRENT_STAGE_GATE_0_100.json',
self:E+'tools/verify-l-g0-l02-original-eq27-five-couplings-0-2.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const h=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,sha(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const by=(a,id,k='id')=>a?.find(x=>x?.[k]===id);
function check(d){
 const issues=[],t=(ok,msg)=>{if(!ok)issues.push(msg);};
 const {src:s,oldInv:oi,inv:i,oldSSC:o,ssc:n,oldReg:pr,reg:r,oldTr:ot,tr:v,oldGate:og,gate:g}=d;
 t(s?.schema==='isograph.track-L.G0.L02-source-v2-Eq27-five-term-coupling-literal.v0.1'&&s?.track==='L'&&s?.stage==='G0','L original source G0 stage');
 t(s?.original_source?.revision==='arXiv:1004.4866v2'&&s?.original_source?.sha256==='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a'&&s?.original_source?.pdf_zero_based_page===7,'exact 2010 v2 PDF and page');
 t(s?.original_source?.byte_CI?.run_id===38046224902&&s?.original_source?.byte_CI?.conclusion==='success','qualified original source PDF provenance');
 t(s?.source_first_scope?.length===2&&s?.conservation?.new_typed_ids===0&&s?.conservation?.other_original_L02_rows_unchanged===57,'two existing exact source loci; no invented source identity');
 const A=s?.source_first_scope?.[0]||{},B=s?.source_first_scope?.[1]||{};
 t(A.location_id==='L02-S043'&&A.owner==='L-SSC-062'&&B.location_id==='L02-S044'&&B.owner==='L-SSC-063','source location names and SSC owners');
 t(A.source_formula?.replace(/\s+/g,'')==='S(e,phi,A)=(3/(8g))intd4x|e|[-phi2R/16+3phi4/32+Rab^cdR^ab_cd/16-(1/2)Daphi^mD^aphi_m-(1/4)Fab^mnF^ab_mn]','source original full 5-sector Eq27 body modulo inert whitespace');
 t(A.prefactor==='3/(8g)'&&JSON.stringify(A.five_terms_in_source_order?.map(x=>x.coefficient))===JSON.stringify(['-1/16','+3/32','+1/16','-1/2','-1/4']),'five full ordered original signed coefficients');
 t(JSON.stringify(A.five_terms_in_source_order?.map(x=>x.carrier))===JSON.stringify(['EinsteinHilbert_phi2_R','HiggsPotential_phi4','RiemannCurvatureSquare_R_ab_cd_Rab_cd','HiggsKinetic_D_a_phi_m_Da_phi_m','YMFieldTensorSquare_F_ab_mn_Fab_mn']),'source carrier assignment not coefficient-only agreement');
 t(A.required_prior_scope?.length===4&&A.required_prior_scope.some(x=>x.includes('ePrime=e'))&&A.required_prior_scope.some(x=>x.includes('torsion T=0')),'source Eq27 only after additional restrictions');
 t(A.author_literal_vs_project_discrepancy?.includes('not author erratum'),'do not silently fix source alleged mathematical discrepancy');
 const expected={Newton_constant:'G_N=128 g / (3 v^2)',cosmological_constant:'Lambda=3 v^2 / 4',Yang_Mills_squared_coupling:'g_YM^2=2 g / 3',vacuum_norm:'v^2=<phi_0^2>'};
 for(const [k,val]of Object.entries(expected))t(B.source_equalities?.[k]===val,'exact original bare parameter '+k);
 t(B.source_modality?.startsWith('THESE_ARE_SOURCE_CLAIMED_BARE_RELATIONS')&&B.scope_guard?.includes('bare values far from experiment'),'original coupling status, not measured physical truth');
 t(s?.source_proof_boundary?.strict_minimum_or_model_viability_proved===false&&s?.G0_frozen===false&&s?.G1_authorized===false&&s?.W_semantics_imported===false,'source physics and stage locks');
 t(oi?.source_first_locations?.length===59&&i?.source_first_locations?.length===59&&i?.counts?.source_equations===30,'59 original L02 group conservation');
 const edits=[];for(let k=0;k<59;k++){
  const a=oi?.source_first_locations?.[k],b=i?.source_first_locations?.[k];
  t(a?.source_location_id===b?.source_location_id,'original identity '+k);
  if(JSON.stringify(a)!==JSON.stringify(b))edits.push(b?.source_location_id);
 }
 t(edits.join(',')==='L02-S043,L02-S044','57 whole historical original-source groups conserved');
 for(const [id,bodyParts]of [
  ['L02-S043',['S=(3/(8g))','-1/16,+3/32,+1/16,-1/2,-1/4','BEFORE']],
  ['L02-S044',['G_N=128g/(3v²)','Lambda=3v²/4','g_YM²=2g/3','BARE']]]){
  const row=by(i?.source_first_locations,id,'source_location_id'),semantic=row?.original_source_semantic_group||'';
  const actual=id==='L02-S043'?[bodyParts[0],bodyParts[1],'Eq26']:[bodyParts[0],bodyParts[1],bodyParts[2],'bare'];
  t(actual.every(x=>semantic.includes(x)),'source original complete signed body '+id);
  t(row?.original_source_five_terms_and_couplings?.git_blob_sha===h.src&&row?.original_source_five_terms_and_couplings?.whole_original_L02_cold_complete===false,'original source file exact pointer and no cold-promotion '+id);
 }
 t(i?.predecessor_source_first?.git_blob_sha===h.oldInv&&i?.original_eq27_exact_component_and_coupling_source?.git_blob_sha===h.src,'source-first previous fidelity and current source');
 t(o?.schema==='woit-lisi.track-l.source-semantic-census.v0.61'&&n?.schema==='woit-lisi.track-l.source-semantic-census.v0.62'&&o?.items?.length===191&&n?.items?.length===191,'source census parent and 191 identities');
 const ch=[];for(let k=0;k<191;k++){
  const a=o?.items?.[k],b=n?.items?.[k];
  t(a?.id===b?.id,'SSC conserved identity '+k);
  if(JSON.stringify(a)!==JSON.stringify(b))ch.push(b?.id);
 }
 t(ch.join(',')==='L-SSC-062,L-SSC-063','189 entire SSC item records untouched');
 const b62=by(n?.items,'L-SSC-062')?.body||'',b63=by(n?.items,'L-SSC-063')?.body||'';
 t(b62.includes('−phi² R/16 +3phi⁴/32 +R_ab^cd R^ab_cd/16 −(1/2)D_a phi^m D^a phi_m −(1/4)F_ab^mn F^ab_mn')&&b62.includes('(−1/16,+3/32,+1/16,−1/2,−1/4)'),'all source coefficients and carriers in original SSC body');
 t(b62.includes('Eq(26)')&&b62.includes('unqualified independent evidence'),'author source versus selected-model sign mismatch separate');
 t(b63.includes('G_N=128g/(3v²)')&&b63.includes('Lambda=3v²/4')&&b63.includes('g_YM²=2g/3')&&b63.includes('BARE'),'exact original three bare couplings and squared YM distinction');
 t(b63.includes('as a speculation')&&n?.guards?.source_census_freeze_complete===false,'source unresolved claims and no premature freeze');
 for(const id of ['L-SSC-062','L-SSC-063']){
  const z=by(n?.items,id)?.source_expression_census?.L02_ORIGINAL_EQ27_FIVE_SIGNED_SECTORS_AND_BARE_COUPLINGS_0_1;
  t(z?.source_packet?.git_blob_sha===h.src&&z?.source_first_inverse?.git_blob_sha===h.inv&&z?.full_original_source_cold_complete===false,'original SSC reverse evidence and cold status '+id);
 }
 t(n?.predecessor?.git_blob_sha===h.oldSSC&&n?.revision?.source_packet?.git_blob_sha===h.src&&n?.revision?.source_first_inverse?.git_blob_sha===h.inv,'source SSC exact frozen predecessor');
 t(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.11'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.12','convergence source-first versions');
 t(r?.source_first_predecessor?.git_blob_sha===h.oldReg&&r?.current_ssc?.git_blob_sha===h.ssc&&r?.per_source?.length===6&&r?.per_source?.reduce((a,z)=>a+z.source_first_location_units,0)===350,'all six original-source groups and current SSC');
 const L02=r?.per_source?.find(x=>x.source==='L02');
 t(L02?.audit_git_blob_sha===h.inv&&L02?.Eq27_restricted_original_coefficient_vector_repaired===true&&L02?.original_complete_cold_review_passed===false,'L02 2 exact source repairs do not qualify whole cold');
 const counts={L01:16,L02:0,L03:15,L04:14,L05:31,L06:30};
 for(const [id,count]of Object.entries(counts)){const row=r?.per_source?.find(z=>z.source===id);t(row?.original_exact_cell_expression_groups_not_yet_independently_verified===count&&row?.original_complete_cold_review_passed===false,'other frozen source debt conserved '+id);}
 t(r?.L02_five_signed_Eq27_bare_couplings_source?.git_blob_sha===h.src&&r?.exit_acceptance_contract?.G0_SSC_complete===false,'global source still G0');
 t(ot?.schema==='lisi.full-treatment.source-traversal-ledger.v0.29'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.30'&&v?.predecessor_exact?.git_blob_sha===h.oldTr,'source traversal preserves previous');
 t(v?.current_census?.git_blob_sha===h.ssc&&v?.current_L02_source_first_inventory?.git_blob_sha===h.inv&&v?.current_G0_six_original_finite_convergence?.git_blob_sha===h.reg&&v?.complete_sources===0,'source traversals no hidden cold complete');
 t(og?.schema==='isograph.exp062-l-current-stage-gate.v0.99'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.100'&&g?.predecessor_gate?.git_blob_sha===h.oldGate,'procedural gate previous/current');
 t(g?.current_source_census?.git_blob_sha===h.ssc&&g?.current_L02_inventory?.git_blob_sha===h.inv&&g?.current_convergence?.git_blob_sha===h.reg&&g?.current_traversal?.git_blob_sha===h.tr&&g?.source_packet?.git_blob_sha===h.src&&g?.source_verifier?.git_blob_sha===h.self,'exact source/SSC verifier guard routing');
 t(g?.failed_first_Eq27_original_CI?.run_id===38085493600&&g?.failed_first_Eq27_original_CI?.conclusion==='failure'&&g?.failed_first_Eq27_original_CI?.hostiles_rejected===27,'original first Eq27 baseline failing CI remains failure');
 t(g?.prior_L02_unnumbered_CI?.run_id===38084996608&&g?.prior_L02_unnumbered_CI?.conclusion==='success'&&g?.prior_L02_unnumbered_CI?.hostiles_rejected===28,'prior successful original unnumbered source scope');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.new_source_CI?.whole_source_cold_complete===false&&g?.stage_locks?.G1_authorized===false,'source exact test pending; G1 blocked');
 return issues;
}
const norm=s=>s.replace(/[\n\r\t]+/g,' ').replace(/-\s+/g,'').replace(/\s+/g,' ').trim();
function sourceCheck(page){
 const s=norm(page||''),err=[],t=(ok,msg)=>{if(!ok)err.push(msg);};
 t(s.includes('Restricting to the gravitational sector')&&s.includes('(27)'),'actual frozen original Eq27 restricted source introduction');
 t(s.includes('Newton')&&s.includes('cosmological constant')&&s.includes('Yang-Mills'),'original bare parameter interpretation');
 t(s.includes('third term')&&s.includes('fourth term')&&s.includes('fifth term'),'source five-sector ordering and roles');
 t(s.includes('far from observed values')&&s.includes('bare parameters'),'original bare vs measured unresolved limits');
 return err;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02v2-eq27-G0-'));let page='';
try{
 const res=await fetch('https://arxiv.org/pdf/1004.4866v2',{signal:AbortSignal.timeout(35000)});
 if(res.status!==200)throw Error('SOURCE_PDF_DOWNLOAD_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());
 if(crypto.createHash('sha256').update(bytes).digest('hex')!=='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a')throw Error('FROZEN_V2_ORIGINAL_SHA256_MISMATCH');
 const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*12$/m.test(info))throw Error('FROZEN_ORIGINAL_PDF_PAGES_NOT_12');
 page=execFileSync('pdftotext',['-f','8','-l','8','-layout',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1200000});
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=check(D).concat(sourceCheck(page));
const mutants=[
 ['source_negate_potential',d=>d.src.source_first_scope[0].five_terms_in_source_order[1].coefficient='-3/32'],
 ['source_change_EH',d=>d.src.source_first_scope[0].five_terms_in_source_order[0].coefficient='+1/16'],
 ['source_R2_coeff',d=>d.src.source_first_scope[0].five_terms_in_source_order[2].coefficient='+1/32'],
 ['source_Higgs_kinetic',d=>d.src.source_first_scope[0].five_terms_in_source_order[3].coefficient='+1/2'],
 ['source_YM_square',d=>d.src.source_first_scope[0].five_terms_in_source_order[4].coefficient='+1/4'],
 ['swap_source_carrier',d=>d.src.source_first_scope[0].five_terms_in_source_order[1].carrier='gravity'],
 ['unfreeze_restrictions',d=>d.src.source_first_scope[0].required_prior_scope=[]],
 ['erase_source_quartic_discrepancy',d=>d.src.source_first_scope[0].author_literal_vs_project_discrepancy='theorem disproved'],
 ['wrong_G_N',d=>d.src.source_first_scope[1].source_equalities.Newton_constant='G_N=128g/v2'],
 ['wrong_Lambda',d=>d.src.source_first_scope[1].source_equalities.cosmological_constant='Lambda=3v2'],
 ['wrong_squaredYM',d=>d.src.source_first_scope[1].source_equalities.Yang_Mills_squared_coupling='g_YM=2g/3'],
 ['change_bare_modality',d=>d.src.source_first_scope[1].source_modality='MEASURED_EXPERIMENTALLY'],
 ['forge_source_pdf_revision',d=>d.src.original_source.revision='v1'],
 ['forge_source_pdf_hash',d=>d.src.original_source.sha256='bad'],
 ['alter_unrelated_source_row',d=>d.inv.source_first_locations[0].original_source_semantic_group+=' forged'],
 ['erase_exact_L02_S043_body',d=>by(d.inv.source_first_locations,'L02-S043','source_location_id').original_source_semantic_group='generic sectors'],
 ['erase_bare_L02_S044_body',d=>by(d.inv.source_first_locations,'L02-S044','source_location_id').original_source_semantic_group='generic couplings'],
 ['erase_inv_original_sha',d=>by(d.inv.source_first_locations,'L02-S043','source_location_id').original_source_five_terms_and_couplings.git_blob_sha='bad'],
 ['alter_other_SSC',d=>by(d.ssc.items,'L-SSC-004').body+=' rewrite'],
 ['erase_Eq27_SSC_coeff',d=>by(d.ssc.items,'L-SSC-062').body='no source factors'],
 ['erase_coupling_ssc',d=>by(d.ssc.items,'L-SSC-063').body='no source coupling values'],
 ['invent_SSC_id',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['change_L03_debt',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['forge_G0_done',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['premature_G1',d=>d.gate.stage_locks.G1_authorized=true]
];
let rejected=0;
for(const [name,change]of mutants){
 const copy=JSON.parse(JSON.stringify(D));try{
  change(copy);
  if(check(copy).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name);
 }catch(e){errors.push('HOSTILE_CHECKER_EXCEPTION_'+name+':'+String(e));}
}
for(const [name,old,next]of [
 ['source_scope_phrase','Restricting to the gravitational sector','The general unrestricted sector'],
 ['source_bare_phrase','bare parameters','physically measured values']]){
 const o=norm(page),edited=o.replaceAll(old,next);
 if(o===edited)errors.push('INERT_PDF_HOSTILE_'+name);
 else if(sourceCheck(edited).length)rejected++;
 else errors.push('HOSTILE_ESCAPED_'+name);
}
const result={schema:'isograph.exp062.L.G0.L02.exact-original-Eq27-coupling.v0.2',pass:errors.length===0,issues:errors,source_PDF_SHA256_verified:true,source_page_original_8:true,source_Eq27_coefficients_5_exact:true,bare_couplings_3_exact:true,source_loci_replayed:['L02-S043','L02-S044'],SSC_repaired:['L-SSC-062','L-SSC-063'],other_SSC_whole_records_conserved:189,all_six_original_source_locations:350,total_SSC_IDs:191,fully_independent_original_cold_sources:0,hostiles_defined:mutants.length+2,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
