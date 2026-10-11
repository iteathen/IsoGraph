// IsoGraph L-only G0 §4 original Lorentz QFT source-fidelity.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_SECTION4_LORENTZ_COMMUTATORS_G0_0_1.json',
 original:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 table:P+'LISI_L04_TABLE1_TABLE2_AND_FIGURES_COLD_G0_0_1.json',
 prevInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_8.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_9.json',
 prevSSC:P+'SOURCE_SEMANTIC_CENSUS_0_75.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_76.json',
 prevReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_28.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_29.json',
 prevTr:P+'SOURCE_TRAVERSAL_LEDGER_0_45.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_46.json',
 prevGate:E+'L_CURRENT_STAGE_GATE_0_133.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_134.json',
 self:E+'tools/verify-l-g0-l04-original-section4-quantum-commutators-0-2.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eql=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const G=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,gitsha(v)]));
const S=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,v])=>[k,read(v)]));
const SOURCE='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const exp={
eq4_3:['[O_hat, Psi_hat] = O Psi_hat','[J_hat3,Psi_hat] = J3 Psi_hat'],
eq4_4:['[O_hat^dagger,Psi_bar_hat] = -Psi_bar_hat (gamma0 O^dagger gamma^0)','[J_hat3,Psi_bar_hat] = -Psi_bar_hat J3'],
eq4_5:['[K_hat3,Psi_hat] = K3 Psi_hat','[K_hat3,Psi_bar_hat] = +Psi_bar_hat (gamma0 K3^dagger gamma^0) = -Psi_bar_hat K3']
};
const blocked='FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED';
const repaired='SCOPED_ORIGINAL_EQ4_3_TO_4_5_JK_OPERATOR_ADJOINT_32_SOURCE_SIGNED_RECONCILED_WHOLE_COLD_OPEN';
function check(z,pages){
 const failures=[],assert=(cond,msg)=>{if(!cond)failures.push(msg);};
 const {packet:s,original:m,table:tab,prevInv:oi,inv:i,prevSSC:o,ssc:n,prevReg:pr,reg:r,prevTr:pt,tr:v,prevGate:og,gate:g}=z;
 assert(s?.schema==='isograph.track-L.G0.L04-frozen-original-Eq4_3-4_5-quantum-Lorentz-commutator-source.v0.1'&&s?.track==='L'&&s?.stage==='G0'&&s?.semantic_authority===false,'strict original L-only G0 source packet');
 assert(s?.source?.id==='L04'&&s.source.original_revision==='arXiv:2407.02497v2'&&s.source.original_PDF_SHA256===SOURCE&&s.source.original_PDF_bytes===348134&&s.source.original_PDF_pages===17,'historical original exact revision and SHA');
 assert(s?.source?.original_pdf_manifest?.git_blob_sha===G.original&&s.source.original_17_page_visual_run_id===38120301520,'historical 17-page visual and source-layout authority');
 const f=m?.original_sources?.[3];
 assert(f?.id==='L04'&&f.revision==='arXiv:2407.02497v2'&&f.PDF_SHA256===SOURCE&&f.PDF_byte_count===348134&&f.original_pdf_extracted_pages?.length===17,'frozen original binary manifest');
 const seen=[];
 for(const pg of [8,9]){
  const ref=f?.original_pdf_extracted_pages?.[pg-1];
  const raw=pages?.[pg];
  assert(typeof raw==='string'&&sha(Buffer.from(raw))===ref?.original_extracted_page_SHA256,'actual original PDF page 8/9 layout hash '+pg);
  const lines=raw?.replaceAll('\r','').replace(/\f+$/g,'').split('\n')||[];
  for(const atom of ref?.blocks||[]){
   const section=lines.slice(atom.original_extracted_line_start-1,atom.original_extracted_line_end).join('\n');
   assert(sha(Buffer.from(section))===atom.original_source_block_SHA256,'actual original PDF block SHA '+atom.source_atom_id);
   seen.push(atom.source_atom_id);
  }
 }
 const expectedIds=[...Array.from({length:9},(_,k)=>'L04-P008-B'+String(k+1).padStart(3,'0')),...Array.from({length:7},(_,k)=>'L04-P009-B'+String(k+1).padStart(3,'0'))];
 assert(eql(seen,expectedIds),'full 16 original layout block independent partition');
 assert(s?.original_source_first?.location==='L04-S018'&&eql(s.original_source_first.existing_ssc_owners,['L-SSC-102','L-SSC-103'])&&s.original_source_first.full_original_source_cold===false,'exact original source owner and no full cold claim');
 for(const [key,want]of Object.entries(exp))assert(eql(s?.printed_author_equations?.[key],want),'original Eq '+key+' operator side and signs');
 const context=s?.printed_author_equations?.source_gamma_operator_context||[];
 assert(context.length===3&&context[0].includes('anti-Hermitian in finite spinor representation')&&context[1].includes('Hermitian finite spinor matrix')&&context[2].includes('Fock-space J_hat3 and K_hat3 are anti-Hermitian'),'finite source spinor J/K and quantum Fock operator nonidentity');
 assert(s?.printed_author_equations?.source_unqualified_semantic_guard?.includes('not a mathematical/physical proof'),'no physics theorem at G0');
 const sourceRows=s?.source_p9_commutator_reverse?.original_source_16_operator_signed_rows||[];
 const tableRows=[...(tab?.table2?.original_annihilation_source_rows_8||[]),...(tab?.table2?.original_creation_source_rows_8||[])];
 assert(s?.source_p9_commutator_reverse?.source_T2_existing_original_weight_packet?.git_blob_sha===G.table&&s.source_p9_commutator_reverse.original_source_action_equations===32,'source-first original Table2 identity not an imported mathematical proof');
 assert(sourceRows.length===16&&tableRows.length===16&&tab?.table2?.source_original_numeric_cells===64,'16 source row ×2 quantum signed commutator formula counts');
 const ids=new Set();
 for(let k=0;k<16;k++){
  const row=sourceRows[k],w=tableRows[k];
  if(!row||!w){assert(false,'missing original Table2 corresponding commutator row '+k);continue;}
  assert(!ids.has(row.source_T2_row_id)&&row.source_T2_row_id===w.source_row_id,'unique source row '+k);ids.add(row.source_T2_row_id);
  assert(row.source_symbol===w.symbol&&row.operator_kind===w.operator&&row.particle_family===w.family&&row.source_table2_subtable===w.source_subtable,'creation/annihilation particle-family original source identity '+k);
  assert(row.author_source_weight_omegaT_twice===w.omegaT2&&row.author_source_weight_omegaS_twice===w.omegaS2&&row.original_p9_K3_eigencommutator_coefficient_twice===-w.omegaT2&&row.original_p9_J3_eigencommutator_coefficient_twice_i===-w.omegaS2,'source p9 signed J/K eigencoefficients '+k);
  assert(eql(row.source_relations,['[K_hat3,operator]=(-omegaT)*operator','[J_hat3,operator]=(-i omegaS)*operator']),'distinct J/K original source operations '+k);
 }
 assert(s?.source_p9_commutator_reverse?.literal_sign_interpretation?.includes('+(i/2)')&&s.source_p9_commutator_reverse.literal_sign_interpretation.includes('−(1/2)'),'original half unit source coefficients not mixed real/imag');
 assert(s?.diagnosis?.class==='GENERIC_FIELD_WEIGHT_SUMMARY_OMITS_SOURCE_LIE_COMMUTATOR_ADJOINT_SIDE_AND_HERMITICITY'&&s.diagnosis.do_not_expand_to_later_stages===true,'source semantic omission cause repaired at G0 without G1');
 assert(s?.conservation?.source_first_location_groups===350&&s.conservation.L04_locations===53&&s.conservation.all_SSC_ids===191&&s.conservation.unchanged_original_source_groups===52&&s.conservation.unchanged_whole_SSC_records===189&&s.conservation.typed_SSC_records_added===0,'explicit finite source conservation');
 assert(s?.locks?.G0_frozen===false&&s.locks.G1_authorized===false&&s.locks.L04_whole_source_cold_complete===false&&s.locks.physical_math_theorem_proof_is_G0_prerequisite===false&&s.locks.W_semantics_imported===false&&s.locks.PR70_merge_authorized===false,'stage and source-theorem firewall');
 assert(oi?.locations?.length===53&&i?.locations?.length===53&&o?.items?.length===191&&n?.items?.length===191,'expected old/new finite identity cardinalities');
 const changed=[],dispositions={},sscOwners=new Set();
 for(let k=0;k<53;k++){
  const a=oi?.locations?.[k],b=i?.locations?.[k];
  if(!a||!b){assert(false,'missing source row '+k);continue;}
  assert(a.id===b.id,'source stable location id '+k);
  if(!eql(a,b))changed.push(b.id);
  dispositions[b.disposition]=(dispositions[b.disposition]||0)+1;
  for(const sid of b.ssc_ids||[])sscOwners.add(sid);
 }
 assert(eql(changed,['L04-S018'])&&oi.locations.find(x=>x.id==='L04-S018').disposition===blocked&&i.locations.find(x=>x.id==='L04-S018').disposition===repaired,'exactly one original source row repaired');
 assert(Object.keys(dispositions).length===Object.keys(i?.counts?.by_disposition||{}).length&&Object.entries(dispositions).every(([k,v])=>i.counts.by_disposition[k]===v)&&dispositions[blocked]===4&&i.counts.remaining_exact_source_groups===4,'source-first derived live exact-source count');
 assert(eql([...sscOwners].sort(),oi?.reverse?.L04_ssc_ids?.slice().sort())&&sscOwners.size===34&&i.reverse.source_to_SSC_global_Pass===false&&i.reverse.SSC_to_source_global_Pass===false,'bidirectional original source owner mapping but not global cold semantic verification');
 assert(i?.locations?.find(x=>x.id==='L04-S018')?.original_Lorentz_commutator_source_evidence?.git_blob_sha===G.packet&&i.original_section4_Lorentz_commutator_source_first.git_blob_sha===G.packet,'exact source-to-SSC packet provenance');
 const modified=[];
 for(let k=0;k<191;k++){
  const a=o?.items?.[k],b=n?.items?.[k];
  if(!a||!b){assert(false,'missing SSC source item '+k);continue;}
  assert(a.id===b.id,'stable typed SSC identity '+k);
  if(!eql(a,b))modified.push(b.id);
 }
 assert(eql(modified,['L-SSC-102','L-SSC-103']),'189 full nonaffected SSC objects conserved');
 for(const id of modified){
  const it=n.items.find(x=>x.id===id);
  const rec=it?.source_expression_census?.L04_ORIGINAL_EQ4_3_TO_4_5_SIGNED_QUANTUM_COMMUTATORS_0_1;
  assert(rec?.source_packet?.git_blob_sha===G.packet&&rec?.source_first_inverse?.git_blob_sha===G.inv&&rec?.original_existing_exact_Table2_sha===G.table&&rec?.whole_original_source_COLD_complete===false,'original SSC in-record explicit evidence pointer '+id);
 }
 const b102=n?.items?.find(x=>x.id==='L-SSC-102')?.body||'',b103=n?.items?.find(x=>x.id==='L-SSC-103')?.body||'';
 for(const x of ['Eq4.3','Eq4.4','Eq4.5','γ0','Ohat†','−Ψbarhat','ANTI-HERMITIAN','HERMITIAN','Khat3'])assert(b102.includes(x),'SSC102 exact source-adjoint qualifier '+x);
 for(const x of ['exactly 32','−ωT','−i ωS','eight 4_s','eight 4_s†','source Table2'])assert(b103.includes(x),'SSC103 original 32 operator-weight signed semantic expression '+x);
 assert(n?.schema==='woit-lisi.track-l.source-semantic-census.v0.76'&&n.predecessor.git_blob_sha===G.prevSSC&&n.revision.source_packet.git_blob_sha===G.packet&&n.revision.source_first_inverse.git_blob_sha===G.inv,'SSC lineal immutable parent');
 assert(r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.29'&&r.source_first_predecessor.git_blob_sha===G.prevReg&&r.current_ssc.git_blob_sha===G.ssc&&r.per_source.length===6&&r.per_source.reduce((n,x)=>n+x.source_first_location_units,0)===350&&r.denominator.distinct_ssc_identity_refs===191,'full frozen original six source finite denominator');
 assert(r.per_source.find(x=>x.source==='L04')?.audit_git_blob_sha===G.inv&&r.per_source.find(x=>x.source==='L04')?.original_exact_cell_expression_groups_not_yet_independently_verified===4&&r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_complete===false&&r.explicit_locks.G1_authorized===false,'global G0 cannot be promoted from one local source check');
 assert(v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.46'&&v.predecessor_exact.git_blob_sha===G.prevTr&&v.current_census.git_blob_sha===G.ssc&&v.current_L04_source_first_inventory.git_blob_sha===G.inv&&v.current_G0_six_original_finite_convergence.git_blob_sha===G.reg&&v.complete_sources===0,'source current traversal and exact lineage');
 assert(g?.schema==='isograph.exp062-l-current-stage-gate.v0.134'&&g.predecessor_gate.git_blob_sha===G.prevGate&&g.current_source_census.git_blob_sha===G.ssc&&g.current_convergence.git_blob_sha===G.reg&&g.current_traversal.git_blob_sha===G.tr&&g.section4_Lorentz_source_packet.git_blob_sha===G.packet&&g.section4_Lorentz_source_verifier.git_blob_sha===G.self,'G0 stage gate exact old/current artifact pin');
 assert(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'new verifier not pre-declared successful');
 return failures;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'IsoGraph-L04-QFT-G0-'));const pages={};
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(res.status!==200)throw Error('ORIGINAL_SOURCE_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());
 if(bytes.length!==348134||sha(bytes)!==SOURCE)throw Error('WRONG_ORIGINAL_FROZEN_L04_BYTES');
 const file=path.join(dir,'L04v2.pdf');fs.writeFileSync(file,bytes);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_L04_PAGE_COUNT');
 for(const pg of [8,9])pages[pg]=execFileSync('pdftotext',['-f',String(pg),'-l',String(pg),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:12000,maxBuffer:3000000});
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=check(S,pages);
const mutant=[
 ['wrong_J_source_eq',z=>z.packet.printed_author_equations.eq4_3[1]='[Jhat,Psi]=-J Psi'],
 ['wrong_O_adjoint_dagger',z=>z.packet.printed_author_equations.eq4_4[0]='wrong'],
 ['swap_gamma_side',z=>z.packet.printed_author_equations.eq4_4[0]=z.packet.printed_author_equations.eq4_4[0].replace('gamma0','gamma1')],
 ['alter_boost_adjoint_sign',z=>z.packet.printed_author_equations.eq4_5[1]=z.packet.printed_author_equations.eq4_5[1].replace('-Psi_bar_hat K3','+Psi_bar_hat K3')],
 ['turn_K_spinor_antiHermitian',z=>z.packet.printed_author_equations.source_gamma_operator_context[1]='K is anti-Hermitian'],
 ['turn_K_Fock_Hermitian',z=>z.packet.printed_author_equations.source_gamma_operator_context[2]='Khat Hermitian'],
 ['omit_nonphysics_guard',z=>z.packet.printed_author_equations.source_unqualified_semantic_guard='proved theorem'],
 ['wrong_table_original_weight',z=>z.table.table2.original_annihilation_source_rows_8[0].omegaT2*=-1],
 ['delete_original_p9_row',z=>z.packet.source_p9_commutator_reverse.original_source_16_operator_signed_rows.pop()],
 ['insert_duplicate_p9_row',z=>z.packet.source_p9_commutator_reverse.original_source_16_operator_signed_rows.push(z.packet.source_p9_commutator_reverse.original_source_16_operator_signed_rows[0])],
 ['wrong_row_symbol',z=>z.packet.source_p9_commutator_reverse.original_source_16_operator_signed_rows[0].source_symbol='no source'],
 ['wrong_creation_operator',z=>z.packet.source_p9_commutator_reverse.original_source_16_operator_signed_rows[9].operator_kind='annihilation'],
 ['wrong_antiparticle_family',z=>z.packet.source_p9_commutator_reverse.original_source_16_operator_signed_rows[12].particle_family='particle'],
 ['unpin_source_revision',z=>z.packet.source.original_revision='arXiv:2407.02497v1'],
 ['unpin_source_sha',z=>z.packet.source.original_PDF_SHA256='bad'],
 ['break_original_p8_page',z=>z.original.original_sources[3].original_pdf_extracted_pages[7].original_extracted_page_SHA256='bad'],
 ['remove_p9_source_block',z=>z.original.original_sources[3].original_pdf_extracted_pages[8].blocks.pop()],
 ['remove_L04_location',z=>z.inv.locations.pop()],
 ['mutate_other_source_group',z=>z.inv.locations.find(x=>x.id==='L04-S010').original_source_semantic_group+='bad'],
 ['mutate_unaffected_SSC',z=>z.ssc.items.find(x=>x.id==='L-SSC-108').body+='wrong'],
 ['remove_original_owner',z=>z.inv.locations.find(x=>x.id==='L04-S018').ssc_ids=[]],
 ['forge_G0',z=>z.packet.locks.G0_frozen=true],
 ['forge_physics_G0',z=>z.packet.locks.physical_math_theorem_proof_is_G0_prerequisite=true],
 ['forge_full_cold',z=>z.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['forge_G1',z=>z.gate.current_lawful_state.G1_authorized=true],
 ['forge_merge',z=>z.gate.current_lawful_state.PR70_merge_authorized=true],
 ['claim_CI_PASS',z=>z.gate.new_source_CI.status='SUCCESS']
];
for(let k=0;k<16;k++)for(const kind of ['K3','J3'])mutant.push(['original_p9_'+kind+'_coefficient_row_'+k,z=>{const a=z.packet.source_p9_commutator_reverse.original_source_16_operator_signed_rows[k];const fld=kind==='K3'?'original_p9_K3_eigencommutator_coefficient_twice':'original_p9_J3_eigencommutator_coefficient_twice_i';a[fld]*=-1;}]);
let rejected=0;
if(issues.length===0)for(const [name,fun]of mutant){const clone=structuredClone(S);try{fun(clone);if(check(clone,pages).length)rejected++;else issues.push('HOSTILE_ESCAPE '+name)}catch(e){issues.push('HOSTILE_VERIFIER_EXCEPTION '+name+' '+e.message)}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.original-L04-section4-quantum-operator.v0.2',PASS:issues.length===0,issues,source_original_sha_verified:true,source_original_pages:[8,9],original_source_blocks_sha_checked:16,original_source_p9_commutator_coefficients:32,original_L04_source_groups:53,unchanged_other_source_groups:52,all_existing_SSC:191,unchanged_other_SSC:189,selected_L04_exact_gaps_now:4,hostiles_defined:mutant.length,hostiles_rejected:rejected,whole_original_source_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(issues.length)process.exitCode=1;

