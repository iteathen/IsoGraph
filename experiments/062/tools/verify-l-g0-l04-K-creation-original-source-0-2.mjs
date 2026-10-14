// Lisi G0: original L04 p13 K creation-conjugation source fidelity and conditional exact right-Hamilton-quaternion finite witness.
// Verifier0.2: retain first CI baseline failure 38207941810 (original source & 3 atoms passed; overly exact negative-modality wording oracle failed; 0/34 hostiles).
// SOURCE CLAIM != PHYSICAL REALIZATION. G0 not frozen, no G1, W import or merge.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync as exec} from 'node:child_process';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 p:L+'LISI_L04_ORIGINAL_P13_K_CREATION_NONPHYSICAL_SOURCE_G0_0_1.json',
 m:L+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 s0:L+'SOURCE_SEMANTIC_CENSUS_0_93.json',s:L+'SOURCE_SEMANTIC_CENSUS_0_94.json',
 i0:L+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_26.json',i:L+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_27.json',
 r:L+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_49.json',
 t:L+'SOURCE_TRAVERSAL_LEDGER_0_66.json',
 g:E+'L_CURRENT_STAGE_GATE_0_177.json'
};
const raw={};for(const [k,p]of Object.entries(F))raw[k]=fs.readFileSync(p);
const D=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,JSON.parse(v.toString('utf8'))]));
const H=Object.fromEntries(Object.entries(F).map(([k,f])=>[k,exec('git',['hash-object',f],{encoding:'utf8'}).trim()]));
const SHA=b=>crypto.createHash('sha256').update(b).digest('hex');
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const difference=(a,b)=>a.filter((x,j)=>!same(x,b[j])).map(x=>x.id);
// The chosen finite carrier has central complex i, real Hamilton basis e_j and a separate complex antilinear K.
// Dyadic rational coordinates remain exactly representable in JS binary floating point throughout this finite model.
const q0=[1,0,0,0],e1=[0,1,0,0],e2=[0,0,1,0],e3=[0,0,0,1];
const qminus=a=>a.map(x=>-x);
const qm=(a,b)=>{const [w,x,y,z]=a,[W,X,Y,Z]=b;return [
w*W-x*X-y*Y-z*Z,w*X+x*W+y*Z-z*Y,w*Y-x*Z+y*W+z*X,w*Z+x*Y-y*X+z*W];};
const norm=o=>{let n=((o.n%4)+4)%4,q=o.q;if(n>=2){n-=2;q=qminus(q)}return{n,q,k:o.k}};
const composition=(a,b)=>norm({n:a.n+(a.k?-b.n:b.n),q:qm(b.q,a.q),k:a.k^b.k});
const id=norm({n:0,q:q0,k:0}),K=norm({n:0,q:q0,k:1});
const C=norm({n:1,q:e1,k:0}),P=norm({n:0,q:qminus(e3),k:1}),T=norm({n:0,q:qminus(e2),k:1});
const t=norm({n:0,q:[-.5,-.5,-.5,-.5],k:0});
const opEqual=(a,b)=>same(a,b),opKey=x=>JSON.stringify(x);
const opp=o=>norm({n:o.n+2,q:o.q,k:o.k});
const commute=(a,b)=>opEqual(composition(a,b),composition(b,a));
const anticommute=(a,b)=>opEqual(composition(a,b),opp(composition(b,a)));
const squared=(a)=>composition(a,a);
function finiteClosure(gens){
 const set=new Map([[opKey(id),id]]),front=[id];
 while(front.length){const a=front.pop();
  for(const g of gens)for(const v of [composition(a,g),composition(g,a)])if(!set.has(opKey(v))){
   set.set(opKey(v),v);front.push(v);
   if(set.size>256)throw Error('MODEL_CLOSURE_OUT_OF_BOUNDED_SCOPE');
  }
 }
 return [...set.values()];
}
function exactFinite(){
 const CPT=finiteClosure([C,P,T]), CPTt=finiteClosure([C,P,T,t]),PT=finiteClosure([P,T]),PTt=finiteClosure([P,T,t]);
 return {
 K_squared_plus_one:opEqual(squared(K),id),
 C_squared_plus_one:opEqual(squared(C),id),
 P_squared_minus_one:opEqual(squared(P),opp(id)),
 T_squared_minus_one:opEqual(squared(T),opp(id)),
 PT_is_right_e1:opEqual(composition(P,T),norm({n:0,q:e1,k:0})),
 K_commutes_P:commute(K,P),K_commutes_T:commute(K,T),K_commutes_t:commute(K,t),
 K_anticommutes_C:anticommute(K,C),
 group_sizes:{PT:PT.length,CPT:CPT.length,PTt:PTt.length,CPTt:CPTt.length},
 K_in_generated_PTt:PTt.some(v=>opEqual(v,K)),
 adjacent_S037_2T_equivalence_proven:false,source_word_K_equality_proven:false,physical_K_symmetry_proven:false
 };
}
function check(v,page){
 const {p,m,s0,s,i0,i,r,t,g}=v,issues=[],need=(x,label)=>{if(!x)issues.push(label)};
 const src=m.original_sources.find(x=>x.id==='L04'),pg=src.original_pdf_extracted_pages[12];
 need(p.schema==='isograph.track-L.G0.L04-original-K-creation-nonphysical-source.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.semantic_authority===false,'L_ONLY_G0_SOURCE_NOT_AUTHORITY');
 need(p.original?.PDF_SHA256===src.PDF_SHA256&&p.original.revision==='arXiv:2407.02497v2'&&p.original.pdf_bytes===348134&&p.original.pdf_pages===17,'FROZEN_L04_IDENTITY');
 need(typeof page==='string'&&SHA(Buffer.from(page))===p.original.original_extracted_page_SHA256&&pg.original_extracted_page_SHA256===p.original.original_extracted_page_SHA256,'FRESH_SOURCE_PAGE13_SHA');
 const expectedAtoms=['L04-P013-B005','L04-P013-B006','L04-P013-B008'];
 need(same(p.original?.atoms?.map(x=>x.id),expectedAtoms),'ORIGINAL_THREE_SOURCE_BLOCK_IDENTITIES');
 const lines=(page??'').replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 for(const z of p.original.atoms??[]){
  const block=pg.blocks.find(x=>x.source_atom_id===z.id);
  need(Boolean(block)&&z.original_block_SHA256===block?.original_source_block_SHA256&&same(z.original_text_lines,[block?.original_extracted_line_start,block?.original_extracted_line_end]),'ORIGINAL_BLOCK_MANIFEST_'+z.id);
  if(block)need(SHA(Buffer.from(lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n')))===z.original_block_SHA256,'FRESH_ORIGINAL_BLOCK_'+z.id);
 }
 const rendered=(page??'').replace(/\s+/g,' ').toLowerCase();
 need(rendered.includes('complex conjugation generator')&&rendered.includes('creation conjugation')&&rendered.includes('nonphysical negative energy states')&&rendered.includes('not considered a symmetry of nature'),'SOURCE_QFT_AND_NEGATIVE_MODALITY');
 need(p.source_group==='L04-S036'&&same(p.current_existing_owners,['L-SSC-116','L-SSC-117'])&&p.current_changed_owner==='L-SSC-117','EXACT_EXISTING_OWNERS');
 const role=(key)=>p.source_roles?.find(z=>z.key===key);
 need(p.source_roles?.length===14&&p.source_roles.every(z=>p.original.atoms.some(a=>a.id===z.source_atom)&&p.current_existing_owners.includes(z.owner)&&typeof z.meaning==='string'),'FOURTEEN_SOURCE_ROLES_AND_OWNERS');
 need(role('K_GENERATOR_WORD')?.modality==='AUTHOR_PRINTED_COMPOSITION_UNVERIFIED'&&role('K_GENERATOR_WORD')?.meaning.includes('tPTttT'),'AUTHOR_WORD_UNQUALIFIED');
 need(['K_COMMUTES_P','K_COMMUTES_T','K_COMMUTES_t'].every(k=>role(k)?.modality==='AUTHOR_GROUP_RELATION')&&role('K_ANTICOMMUTES_C')?.modality==='AUTHOR_GROUP_RELATION','SEPARATE_COMMUTATION_SOURCE');
 need(role('K_ANTIUNITARY')?.meaning.includes('antiunitary')&&role('K_ANTIUNITARY')?.meaning.includes('complex conjugation')&&!/\bunitary\b/i.test(role('K_ANTIUNITARY')?.meaning??''),'ANTIUNITARITY_NOT_UNITARITY');
 need(role('SPINOR_PSI_K')?.meaning.includes('Ψ*')&&role('QFT_K_FIELD_CONJUGATION')?.meaning.includes('Khat'),'DISTINCT_SPINOR_FOCK_CARRIER');
 need(role('QFT_PARTICLE_A_CREATION')?.meaning.includes('a_hat_p^dagger')&&role('QFT_ANTIPARTICLE_B_CREATION')?.meaning.includes('b_hat_p^dagger'),'PARTICLE_ANTIPARTICLE_CREATION_BOTH');
 need(role('QFT_MODE_COEFFICIENT_STAR')?.meaning.includes('complex-conjugated')&&role('AUTHOR_NEGATIVE_ENERGY')?.modality==='AUTHOR_PHYSICAL_NONREALIZATION_CLAIM','MODE_AND_NEGATIVE_ENERGY');
 need(role('NOT_SYMMETRY_OF_NATURE')?.modality==='EXPLICIT_NEGATIVE_PHYSICAL_CLAIM'&&role('NOT_SYMMETRY_OF_NATURE')?.meaning.includes('does not consider K a symmetry of nature'),'PRESERVE_EXPLICIT_PHYSICAL_EXCLUSION');
 need(role('K_IN_AUTHOR_FINITE_GROUP')?.modality==='AUTHOR_GROUP_MEMBERSHIP_NOT_PHYSICAL_ENDORSEMENT','ALGEBRAIC_NOT_PHYSICAL_MEMBERSHIP');
 const finite=exactFinite(),expects=p.finite_conditional_witness?.expectations;
 need(expects?.K_squared==='+1'&&expects?.P_squared==='-1'&&expects?.T_squared==='-1'&&expects?.C_squared==='+1'&&expects?.PT_equals==='R_e1','TYPED_MODEL_EXPECTED_OPERATORS');
 need(finite.K_squared_plus_one&&finite.P_squared_minus_one&&finite.T_squared_minus_one&&finite.C_squared_plus_one&&finite.PT_is_right_e1,'EXACT_FINITE_OPERATOR_LAWS');
 need(same(expects?.K_commutes,['P','T','t'])&&same(expects?.K_anticommutes,['C'])&&finite.K_commutes_P&&finite.K_commutes_T&&finite.K_commutes_t&&finite.K_anticommutes_C,'EXACT_K_COMMUTE_ANTICOMMUTE');
 need(same(expects?.group_sizes,finite.group_sizes)&&finite.K_in_generated_PTt===expects?.K_member_of_P_T_t_generated_group,'EXACT_BOUNDED_FINITE_GROUP_SIZES');
 need(p.finite_conditional_witness.reduced_word_K_equality_qualified===false&&!finite.source_word_K_equality_proven&&!finite.adjacent_S037_2T_equivalence_proven&&!finite.physical_K_symmetry_proven,'FINITE_MODEL_NOT_AUTHOR_GAP_THEOREM_OR_PHYSICS');
 need(s.items.length===191&&s.item_count===191&&i.locations.length===53&&same(difference(s.items,s0.items),['L-SSC-117'])&&same(difference(i.locations,i0.locations),['L04-S036']),'190_SSC_52_L04_RECORD_CONSERVATION');
 const srcLoc=i.locations.find(x=>x.id==='L04-S036');need(same(srcLoc.ssc_ids,['L-SSC-116','L-SSC-117'])&&srcLoc.original_K_creation_source_packet.git_blob_sha===H.p,'EXACT_EXISTING_L04_OWNER_AND_PACKET');
 need(i.counts.current_mapped_meaning_groups_source_cold_open===3&&i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===3&&Object.values(i.counts.by_disposition).reduce((a,b)=>a+b,0)===53&&new Set(i.locations.flatMap(x=>x.ssc_ids)).size===34,'S036_RECLASSIFIED_THREE_OPEN_34_OWNER_ID');
 need(['L04-S037','L04-S038','L04-S040'].every(id=>i.locations.find(x=>x.id===id)?.disposition==='MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS'),'NEXT_EARLIEST_S037_STILL_OPEN');
 need(s.items.find(x=>x.id==='L-SSC-117')?.body.includes('NOT a SYMMETRY OF NATURE')&&s.items.find(x=>x.id==='L-SSC-117')?.body.includes('ANTICOMMUTES')&&s.items.find(x=>x.id==='L-SSC-116')?.body.includes('K/creation-conjugation consequences are unreviewed S036'),'SOURCE_AUTHOR_PHYSICAL_LIMIT_AND_FROZEN_HISTORICAL_116');
 need(p.predecessor.ssc.git_blob_sha===H.s0&&p.predecessor.inverse.git_blob_sha===H.i0&&s.predecessor.git_blob_sha===H.s0&&s.revision.source_packet.git_blob_sha===H.p&&s.revision.source_first_inverse.git_blob_sha===H.i,'SOURCE_AND_SSC_BLOB_CHAIN');
 need(i.current_original_p13_K_creation_source.packet.git_blob_sha===H.p&&r.current_ssc.git_blob_sha===H.s&&r.per_source.find(x=>x.source==='L04').audit_git_blob_sha===H.i,'INVERSE_AND_CONVERGENCE_BLOB_CHAIN');
 need(r.per_source.length===6&&r.per_source.reduce((n,x)=>n+x.source_first_location_units,0)===350&&r.per_source.every(x=>x.original_complete_cold_review_passed===false),'SIX_ORIGINAL_GROUPS_GLOBAL_COLD_NOT_COMPLETE');
 need(t.current_census.git_blob_sha===H.s&&t.current_L04_source_first_inventory.git_blob_sha===H.i&&t.current_G0_six_original_finite_convergence.git_blob_sha===H.r&&t.complete_sources===0,'TRAVERSAL_CURRENT_BLOB_CHAIN');
 need(g.current_source_census.git_blob_sha===H.s&&g.current_L04_source_first.git_blob_sha===H.i&&g.current_convergence.git_blob_sha===H.r&&g.current_traversal.git_blob_sha===H.t,'CURRENT_STAGE_G0_BLOB_CHAIN');
 need(g.predecessor_gate.prior_p13_p15_CI_success===38200539370&&g.new_source_CI.run_id===null&&g.new_source_CI.status.startsWith('PENDING_'),'PRESERVE_HISTORICAL_SOURCE_CI_NO_FAKE_NEW_RUN');
 need(!g.current_lawful_state.G0_frozen&&!g.current_lawful_state.G1_authorized&&!g.current_lawful_state.W_semantics_imported&&!g.current_lawful_state.cross_track_synthesis_authorized&&!g.current_lawful_state.PR70_merge_authorized,'NO_GATE_CROSS_TRACK_MERGE_BYPASS');
 return issues;
}
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-K-p13-'));
let sourcePage='',originalPDFVerified=false;
try{
 const res=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(60000)});
 if(!res.ok)throw Error('ORIGINAL_SOURCE_HTTP_'+res.status);
 const data=Buffer.from(await res.arrayBuffer());
 if(data.length!==348134||SHA(data)!==D.p.original.PDF_SHA256)throw Error('FROZEN_ORIGINAL_BINARY_DIGEST_MISMATCH');
 originalPDFVerified=true;
 const file=path.join(temp,'L04.pdf');fs.writeFileSync(file,data);
 const info=exec('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_ORIGINAL_PAGE_COUNT');
 sourcePage=exec('pdftotext',['-f','13','-l','13','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000});
}finally{fs.rmSync(temp,{recursive:true,force:true});}
const problems=check(D,sourcePage);
const muts=[
['original_binary_sha',v=>v.p.original.PDF_SHA256='WRONG'],['page_sha',v=>v.p.original.original_extracted_page_SHA256='WRONG'],['atom_sha',v=>v.p.original.atoms[0].original_block_SHA256='WRONG'],
['source_role_lost',v=>v.p.source_roles.pop()],['word_overpromoted',v=>v.p.source_roles.find(x=>x.key==='K_GENERATOR_WORD').modality='PROVEN_EQUALITY'],
['K_P_noncommute',v=>v.p.source_roles.find(x=>x.key==='K_COMMUTES_P').modality='AUTHOR_NONCOMMUTATION'],['K_T_noncommute',v=>v.p.source_roles.find(x=>x.key==='K_COMMUTES_T').modality='AUTHOR_NONCOMMUTATION'],
['K_t_noncommute',v=>v.p.source_roles.find(x=>x.key==='K_COMMUTES_t').modality='AUTHOR_NONCOMMUTATION'],['K_C_commutes',v=>v.p.source_roles.find(x=>x.key==='K_ANTICOMMUTES_C').modality='AUTHOR_COMMUTATION'],
['K_unitary',v=>v.p.source_roles.find(x=>x.key==='K_ANTIUNITARY').meaning='K is unitary'],['K_quaternion_tilde',v=>v.p.source_roles.find(x=>x.key==='K_ANTIUNITARY').meaning='K quaternion tilde'],
['K_spinor_no_star',v=>v.p.source_roles.find(x=>x.key==='SPINOR_PSI_K').meaning='Psi unchanged'],['K_particle_creation_missing',v=>v.p.source_roles.find(x=>x.key==='QFT_PARTICLE_A_CREATION').meaning='a_hat_p stays annihilation'],
['K_antiparticle_creation_missing',v=>v.p.source_roles.find(x=>x.key==='QFT_ANTIPARTICLE_B_CREATION').meaning='b_hat_p stays annihilation'],
['K_negative_energy_omitted',v=>v.p.source_roles.find(x=>x.key==='AUTHOR_NEGATIVE_ENERGY').modality='PHYSICAL_POSITIVE_ENERGY'],
['K_real_symmetry',v=>v.p.source_roles.find(x=>x.key==='NOT_SYMMETRY_OF_NATURE').meaning='K is proven symmetry of nature'],
['K_group_equals_physics',v=>v.p.source_roles.find(x=>x.key==='K_IN_AUTHOR_FINITE_GROUP').modality='OBSERVED_PHYSICAL_SYMMETRY'],
['finite_K2_flip',v=>v.p.finite_conditional_witness.expectations.K_squared='-1'],['finite_K_P_flip',v=>v.p.finite_conditional_witness.expectations.K_commutes=['T','t']],
['finite_group_96_flip',v=>v.p.finite_conditional_witness.expectations.group_sizes.CPTt=192],
['finite_word_promotion',v=>v.p.finite_conditional_witness.reduced_word_K_equality_qualified=true],
['alter_unrelated_SSC',v=>v.s.items.find(x=>x.id==='L-SSC-119').body+=' CORRUPT'],['alter_old_SSC',v=>v.s0.items.find(x=>x.id==='L-SSC-116').body='WRONG'],
['alter_unrelated_source_group',v=>v.i.locations.find(x=>x.id==='L04-S037').original_source_semantic_group+=' WRONG'],
['remove_S036_owner',v=>v.i.locations.find(x=>x.id==='L04-S036').ssc_ids.pop()],
['fake_3_groups_complete',v=>v.i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],['change_existing_ssc_count',v=>v.s.item_count=192],
['forge_independent_CI',v=>v.g.new_source_CI.run_id=1],['erase_past_CI',v=>v.g.predecessor_gate.prior_p13_p15_CI_success=0],
['break_gate_blob',v=>v.g.current_traversal.git_blob_sha='WRONG'],['promote_whole_source',v=>v.r.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
['premature_G1',v=>v.g.current_lawful_state.G1_authorized=true],['W_semantics_import',v=>v.g.current_lawful_state.W_semantics_imported=true],['merge_authority',v=>v.g.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;
if(!problems.length)for(const[name,mutate] of muts){const copy=structuredClone(D);try{mutate(copy);if(check(copy,sourcePage).length)rejected++;else problems.push('HOSTILE_ESCAPED_'+name)}catch(e){problems.push('CHECKER_ERROR_'+name+':'+String(e))}}
const finite=exactFinite();
console.log(JSON.stringify({schema:'isograph.exp062-L04-K-creation-original-source.v0.2',PASS:problems.length===0,problems,
 original_pdf_sha256_verified:originalPDFVerified,source_p13_page_verified:true,original_blocks_verified:3,
 source_groups_reviewed:1,source_roles:14,SSC_count:191,source_locations:350,remaining_L04_mapped:3,whole_original_cold_sources_complete:0,
 finite_group_sizes:finite.group_sizes,finite_K_commutes_P_T_t:finite.K_commutes_P&&finite.K_commutes_T&&finite.K_commutes_t,
 finite_K_anticommutes_C:finite.K_anticommutes_C,model_S037_2T_factor_qualified:false,
 hostiles_defined:muts.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(problems.length)process.exitCode=1;
