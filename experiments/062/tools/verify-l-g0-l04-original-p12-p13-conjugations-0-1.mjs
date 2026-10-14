// IsoGraph L-only G0 original §6 p12–p13 conjugation/invariant source and finite witness.
// Frozen original arXiv:2407.02497v2 and exact git blob lineage; no G1/merge/physical-theory promotion.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import crypto from 'node:crypto';import{execFileSync}from'node:child_process';
import{auditModel}from'./verify-l-g0-l04-conjugation-invariant-finite-0-1.mjs';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={packet:P+'LISI_L04_ORIGINAL_P12_P13_CONJUGATION_INVARIANT_G0_0_1.json',
manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
previousSSC:P+'SOURCE_SEMANTIC_CENSUS_0_91.json',SSC:P+'SOURCE_SEMANTIC_CENSUS_0_92.json',
previousInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_24.json',inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_25.json',
reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_47.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_64.json',gate:E+'L_CURRENT_STAGE_GATE_0_173.json',
previousS031:P+'LISI_L04_ORIGINAL_SECTION6_BIQUATERNION_MATRIX_SOURCE_G0_0_1.json'};
const parse=p=>JSON.parse(fs.readFileSync(p,'utf8')),D=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,parse(p)]));
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim()]));
const sha256=b=>crypto.createHash('sha256').update(b).digest('hex'),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),diff=(a,b)=>a.filter((v,i)=>!eq(v,b[i])).map(v=>v.id);
const fail=(e,n)=>{if(!e.includes(n))e.push(n)};
function check(d,pages){
 const {packet:q,manifest:m,previousSSC:s0,SSC:s,previousInv:i0,inv:i,reg:r,tr:t,gate:g,previousS031:s31}=d;
 const errors=[],need=(c,l)=>{if(!c)fail(errors,l)};
 const original=m?.original_sources?.find(x=>x.id==='L04');
 need(q?.schema==='isograph.track-L.G0.L04-original-section6-conjugation-bilinear-source.v0.1'&&q?.track==='L'&&q?.stage==='G0'&&q.semantic_authority===false,'L G0 scope');
 need(q?.frozen_original?.revision==='arXiv:2407.02497v2'&&q.frozen_original.PDF_SHA256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422'&&q.frozen_original.PDF_SHA256===original?.PDF_SHA256&&q.frozen_original.PDF_bytes===348134&&q.frozen_original.PDF_pages===17,'frozen PDF provenance');
 const atoms=q?.frozen_original?.source_atoms??[];
 need(atoms.length===3&&eq(atoms.map(x=>x.source_atom_id),['L04-P012-B006','L04-P013-B001','L04-P013-B002']),'original three exact atoms');
 const pageNums=new Set(atoms.map(x=>x.PDF_page_zero_based));
 need(pageNums.size===2&&pageNums.has(11)&&pageNums.has(12),'printed pages 12 and 13 partition');
 for(const a of atoms){
 const pg=original?.original_pdf_extracted_pages?.find(x=>x.PDF_page_zero_based===a.PDF_page_zero_based);
 const block=pg?.blocks?.find(x=>x.source_atom_id===a.source_atom_id);
 need(pg?.original_extracted_page_SHA256===a.original_page_sha256&&block?.original_source_block_SHA256===a.original_block_sha256&&eq([block?.original_extracted_line_start,block?.original_extracted_line_end],a.original_lines),'source-matching exact PDF block '+a.source_atom_id);
 const txt=pages.get(a.PDF_page_zero_based);
 need(typeof txt==='string'&&sha256(Buffer.from(txt))===a.original_page_sha256,'independently re-extracted original complete page '+a.PDF_page_zero_based);
 if(typeof txt==='string'&&block){const ls=txt.replaceAll('\r','').replace(/\f+$/g,'').split('\n');need(sha256(Buffer.from(ls.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n')))===a.original_block_sha256,'independently re-extracted original block '+a.source_atom_id)}
 }
 const p12=(pages.get(11)??'').replace(/\s+/g,' ').toLowerCase(),p13=(pages.get(12)??'').replace(/\s+/g,' ').toLowerCase();
 need(p12.includes('describing the biquaternions')&&p12.includes('conjugations')&&p13.includes('bilinear dirac spinor scalar'),'original relevant printed text locators');
 const groups=q?.source_groups??[],a=groups[0],b=groups[1];
 need(groups.length===2&&a?.id==='L04-S032'&&b?.id==='L04-S033'&&a?.source_roles?.length===8&&b?.source_roles?.length===8,'16 source roles in S032 and S033');
 need(a?.correct_locator==='§6 printed p12 (PDF page index11), concluding paragraph'&&b?.correct_locator==='§6 printed pp12–13 (PDF page indices11–12): bilinear introduction followed by p13 equations','correct original printed page locators');
 need(eq(a?.ssc_ids,['L-SSC-112','L-SSC-113'])&&eq(b?.ssc_ids,['L-SSC-111','L-SSC-114']),'existing matrix-owner reciprocal source links');
 need(groups.every(x=>x.source_roles?.every(z=>x.ssc_ids?.includes(z.owner)&&typeof z.meaning==='string'&&z.modality)),'all source roles mapped to existing owners');
 const role=(g,k)=>g?.source_roles?.find(x=>x.key===k);
 need(role(a,'MATRIX_STAR_QUATERNION')?.modality==='SOURCE_REPRESENTATIONAL_RELATION'&&role(a,'MATRIX_STAR_QUATERNION')?.meaning.includes('∼ −e2')&&role(a,'MATRIX_HERMITIAN_ADJOINT')?.meaning.includes('tilde(ψHL*)'),'complex vs quaternion vs Hermitian and source tilde');
 need(role(a,'QUATERNION_TILDE')?.meaning.includes('tilde(e0)=e0')&&role(a,'S031_MISMATCH_RETAINED')?.modality==='PREEXISTING_CONDITIONAL_READER_DIAGNOSTIC','quaternion tilde and prior mismatch scope');
 need(role(b,'BILINEAR_IMAG_FOUR_TERMS')?.meaning.startsWith('Imaginary = −Ψ1R Ψ3I−Ψ2R Ψ4I')&&role(b,'SOURCE_DETERMINANT_IDENTITY')?.modality==='AUTHOR_PRINTED_INVARIANT_CLAIM','printed complex cross-term signs and determinant source claim');
 need(role(b,'DIRAC_SCALAR_REAL')?.meaning.includes('=2 Real(')&&role(b,'NOT_COMPLEX_DET_AS_DIRAC_SCALAR')?.modality==='SOURCE_SCOPE_GUARD','factor-two real scalar and non-equality of complex determinant');
 const oldS=s0?.items??[],nowS=s?.items??[],oldI=i0?.locations??[],nowI=i?.locations??[];
 need(s.item_count===191&&nowS.length===191&&oldS.length===191&&eq(diff(nowS,oldS),['L-SSC-113','L-SSC-114']),'exact 189 other SSC records conserved');
 need(nowI.length===53&&oldI.length===53&&eq(diff(nowI,oldI),['L04-S032','L04-S033']),'exact 51 other original L04 groups conserved');
 need(eq(nowI.find(x=>x.id==='L04-S032')?.ssc_ids,['L-SSC-112','L-SSC-113'])&&eq(nowI.find(x=>x.id==='L04-S033')?.ssc_ids,['L-SSC-111','L-SSC-114']),'inverse reciprocal links');
 need(nowI.find(x=>x.id==='L04-S032')?.source_locator.includes('p12')&&nowI.find(x=>x.id==='L04-S033')?.source_locator.includes('pp12–13'),'source locator correction');
 need(i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===6&&Object.values(i.counts.by_disposition).reduce((v,x)=>v+x,0)===53&&new Set(nowI.flatMap(x=>x.ssc_ids)).size===34,'53 group and 34 existing root conservation');
 const model=auditModel(),expect=q?.finite_model?.expected;
 need(model.PASS&&model.sample_count.sigma===4&&model.sample_count.quaternion===7&&model.sample_count.spinor===13,'exact independent finite model positive');
 need(Object.values(expect??{}).every(Number.isInteger)&&expect?.pauli_basis_star_matches===model.checks.basis_sigma_star.length&&expect?.biquaternion_matrix_star_matches===model.checks.quaternion_matrix_complex_star.length&&expect?.biquaternion_hermitian_matches===model.checks.quaternion_matrix_hermitian_dagger.length&&expect?.biquaternion_det_norm_matches===model.checks.complex_quaternion_norm_equals_det.length&&expect?.Dirac_scalar_real_and_twice_det_real_matches===model.checks.Dirac_scalar_equals_twice_real_det.length,'model case-by-case expected counts');
 need(eq(q?.finite_model?.witness?.psi,model.source_sample.Psi)&&eq(q?.finite_model?.witness?.det,model.source_sample.det_psiQL)&&eq(q?.finite_model?.witness?.Dirac_scalar,model.source_sample.Dirac_scalar),'mixed imaginary model witness');
 need(model.source_sample.det_psiQL[1]!==0&&model.source_sample.Dirac_scalar[1]===0&&model.S031_conditional_printed_coefficient_mismatch===true,'complex versus real and S031 unresolved conditional mismatch');
 need(q?.prior_S031_conditional_discrepancy?.status==='UNRESOLVED_CONDITIONAL_READER_MODEL_NOT_AUTHOR_CORRECTION'&&q.prior_S031_conditional_discrepancy.do_not_silently_repair===true&&q.prior_S031_conditional_discrepancy.source_packet.git_blob_sha===H.previousS031&&s31?.source_internal_distinction_evidence?.asserts_definite_author_error===false,'historical printed S031 discrepancy not hidden');
 need(s.items.find(x=>x.id==='L-SSC-113')?.body.includes('∼ −e2 ψHL* e2')&&s.items.find(x=>x.id==='L-SSC-114')?.body.includes('2 Re(')&&s.items.find(x=>x.id==='L-SSC-114')?.body.includes('UNRESOLVED')===false,'source SSC phase and real scalar modalities');
 need(q.predecessor.ssc.git_blob_sha===H.previousSSC&&q.predecessor.inverse.git_blob_sha===H.previousInv&&q.predecessor.gate.git_blob_sha==='4c4d997966b66bcc0975f9b59f9c2a229ecba724','exact predecessor SHA');
 need(s.predecessor.git_blob_sha===H.previousSSC&&s.revision.source_packet.git_blob_sha===H.packet&&s.revision.source_first_inverse.git_blob_sha===H.inv&&i.current_original_p12_p13_conjugation_invariant.packet.git_blob_sha===H.packet,'source packet and inverse SHA');
 need(r.current_ssc.git_blob_sha===H.SSC&&r.per_source.find(x=>x.source==='L04')?.audit_git_blob_sha===H.inv&&r.per_source.reduce((v,x)=>v+x.source_first_location_units,0)===350&&r.per_source.every(x=>!x.original_complete_cold_review_passed),'six frozen source register and exact byte pointers');
 need(t.current_census.git_blob_sha===H.SSC&&t.current_L04_source_first_inventory.git_blob_sha===H.inv&&t.current_G0_six_original_finite_convergence.git_blob_sha===H.reg&&t.complete_sources===0,'traversal source and gate lineage');
 need(g.current_source_census.git_blob_sha===H.SSC&&g.current_L04_source_first.git_blob_sha===H.inv&&g.current_convergence.git_blob_sha===H.reg&&g.current_traversal.git_blob_sha===H.tr,'active gate exact byte lineage');
 need(g.predecessor_gate.prior_original_p12_CI_success===38190883923&&g.predecessor_gate.prior_original_p12_CI_failure===38190554058&&g.new_source_CI.run_id===null,'prior CI failed/success retained and current pending');
 need(g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.W_semantics_imported===false&&g.current_lawful_state.cross_track_synthesis_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false&&q.locks.full_original_cold_sources===0,'no illicit authority stage or merge');
 return errors;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-conj-src-')),pages=new Map();let originalBinary=false;
try{const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(65000)});if(!res.ok)throw Error('ORIGINAL_SOURCE_HTTP_'+res.status);
const bytes=Buffer.from(await res.arrayBuffer());if(bytes.length!==348134||sha256(bytes)!==D.packet.frozen_original.PDF_SHA256)throw Error('original binary mismatch');originalBinary=true;
const pdf=path.join(dir,'original.pdf');fs.writeFileSync(pdf,bytes);
if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000})))throw Error('original 17 page mismatch');
for(const pg of [11,12])pages.set(pg,execFileSync('pdftotext',['-f',String(pg+1),'-l',String(pg+1),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:15000}));
}finally{fs.rmSync(dir,{recursive:true,force:true})}
const errors=check(D,pages);
const mutations=[
['source_pdf_sha',x=>x.packet.frozen_original.PDF_SHA256='BAD'],['wrong_original_page',x=>x.packet.frozen_original.source_atoms[0].original_page_sha256='BAD'],
['wrong_atom_block',x=>x.packet.frozen_original.source_atoms[2].original_block_sha256='BAD'],['wrong_atom_lines',x=>x.packet.frozen_original.source_atoms[1].original_lines=[99,100]],
['invent_p13_conjugation_location',x=>x.packet.source_groups[0].correct_locator='§6 p13'],['drop_second_original_source_group',x=>x.packet.source_groups.pop()],
['drop_conjugation_source_role',x=>x.packet.source_groups[0].source_roles.pop()],['drop_bilinear_role',x=>x.packet.source_groups[1].source_roles.pop()],
['matrix_complex_star_as_tilde',x=>x.packet.source_groups[0].source_roles.find(z=>z.key==='MATRIX_STAR_QUATERNION').modality='LITERAL_EQUALITY'],
['wrong_e2_conjugation',x=>x.packet.source_groups[0].source_roles.find(z=>z.key==='MATRIX_STAR_QUATERNION').meaning='ψQL* ∼ +e3 ψHL* e3'],
['wrong_hermitian_tilde',x=>x.packet.source_groups[0].source_roles.find(z=>z.key==='MATRIX_HERMITIAN_ADJOINT').meaning='ψQL†=ψHL*'],
['wrong_quaternion_tilde',x=>x.packet.source_groups[0].source_roles.find(z=>z.key==='QUATERNION_TILDE').meaning='tilde(e0)=-e0'],
['erase_S031_mismatch',x=>x.packet.prior_S031_conditional_discrepancy.status='RESOLVED'],['erase_S031_source_digest',x=>x.packet.prior_S031_conditional_discrepancy.source_packet.git_blob_sha='BAD'],
['wrong_complex_bilinear_sign',x=>x.packet.source_groups[1].source_roles.find(z=>z.key==='BILINEAR_IMAG_FOUR_TERMS').meaning='Imaginary = +Ψ1R Ψ3I'],
['pretend_complex_det_scalar',x=>x.packet.source_groups[1].source_roles.find(z=>z.key==='NOT_COMPLEX_DET_AS_DIRAC_SCALAR').modality='LITERAL_EQUALITY'],
['omit_real_projection',x=>x.packet.source_groups[1].source_roles.find(z=>z.key==='DIRAC_SCALAR_REAL').meaning='barΨ Ψ = tildeψHL ψHL'],
['change_source_sample_det',x=>x.packet.finite_model.witness.det=[-10,0]],['change_source_sample_scalar',x=>x.packet.finite_model.witness.Dirac_scalar=[-10,0]],
['change_basis_model_count',x=>x.packet.finite_model.expected.pauli_basis_star_matches=3],['change_quaternion_model_count',x=>x.packet.finite_model.expected.biquaternion_matrix_star_matches=6],
['change_Dirac_model_count',x=>x.packet.finite_model.expected.Dirac_scalar_real_and_twice_det_real_matches=12],
['remove_existing_s031_owner_link',x=>x.inv.locations.find(z=>z.id==='L04-S032').ssc_ids.shift()],
['remove_existing_s030_owner_link',x=>x.inv.locations.find(z=>z.id==='L04-S033').ssc_ids.shift()],
['change_unrelated_ssc',x=>x.SSC.items.find(z=>z.id==='L-SSC-110').body+='BAD'],
['change_unrelated_original_group',x=>x.inv.locations.find(z=>z.id==='L04-S041').disposition='BAD'],
['fake_L04_mapped_zero',x=>x.inv.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
['fake_6_frozen_full_cold',x=>x.reg.per_source.find(z=>z.source==='L04').original_complete_cold_review_passed=true],
['falsify_source_pointer',x=>x.gate.current_source_census.git_blob_sha='BAD'],
['erase_first_failed_CI',x=>x.gate.predecessor_gate.prior_original_p12_CI_failure=0],
['forge_new_CI_pass',x=>x.gate.new_source_CI.run_id=1],
['open_G1',x=>x.gate.current_lawful_state.G1_authorized=true],['enable_cross_track',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
['merge_PR70',x=>x.gate.current_lawful_state.PR70_merge_authorized=true]];
let rejected=0;if(!errors.length)for(const [n,mutate]of mutations){const x=structuredClone(D);try{mutate(x);if(check(x,pages).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+n)}catch(e){errors.push('CHECKER_HOSTILE_EXCEPTION_'+n+':'+String(e))}}
console.log(JSON.stringify({schema:'isograph.exp062.L04.original-conjugation-bilinear.v0.1',PASS:errors.length===0,errors,original_pdf_SHA256_verified:originalBinary,original_full_pages_SHA256_verified:pages.size,original_source_blocks:3,source_semantic_roles:16,SSC_count:191,source_location_groups:350,original_L04_broad_mapped_open:6,Gaussian_quaternion_examples:7,Gaussian_Dirac_examples:13,hostiles_defined:mutations.length,hostiles_rejected:rejected,previous_S031_mismatch_unresolved:true,full_original_source_cold_complete:0,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(errors.length)process.exitCode=1;
