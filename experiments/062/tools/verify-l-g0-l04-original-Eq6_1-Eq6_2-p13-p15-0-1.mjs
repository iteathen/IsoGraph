// IsoGraph L-only G0: exact source p13/p15 C/P/T carrier and signed triality source audit.
// Scoped INTERNAL qualification. No full-paper cold review, W import, group theorem, physical proof, or merge.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_ORIGINAL_P13_P15_CPT_TRIALITY_MODAL_FIDELITY_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 prevSSC:P+'SOURCE_SEMANTIC_CENSUS_0_92.json',SSC:P+'SOURCE_SEMANTIC_CENSUS_0_93.json',
 prevInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_25.json',Inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_26.json',
 Reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_48.json',
 Trav:P+'SOURCE_TRAVERSAL_LEDGER_0_65.json',prevGate:E+'L_CURRENT_STAGE_GATE_0_174.json',Gate:E+'L_CURRENT_STAGE_GATE_0_175.json'
};
const j=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const D=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,j(p)]));
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim()]));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const changed=(a,b)=>a.filter((x,k)=>!eq(x,b[k])).map(x=>x.id);
function qm(a,b){return [
 a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],
 a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
 a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],
 a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0],
]}
const qc=q=>[q[0],-q[1],-q[2],-q[3]],one=[1,0,0,0],minusOne=[-1,0,0,0],es=[[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const q3=q=>qm(qm(q,q),q),adj=(q,e)=>qm(qm(q,e),qc(q));
const first=[...['C_DIRAC','C_QL','C_HL','P_DIRAC','P_QL','P_HL','T_DIRAC','T_QL','T_HL','RIGHT_CARRIER','EQ61_TILDE','P15_EQUALITY','S031_OPEN']];
const second=['T_MINUS_P13','GROUP_VS_ADJOINT','C_NONCOMMUTE','CPT_COMMUTE','PT_E1','AD_CYCLE','T_PLUS_P15','FINITE_SIGN_DIAGNOSTIC','NEXT_K_SCOPE'];
function check(d,pages){
 const {packet:p,manifest:m,prevSSC,s:unusedS,SSC:s,prevInv,Inv:i,Reg:r,Trav:t,prevGate:g0,Gate:g}=d,fail=[],need=(v,msg)=>{if(!v)fail.push(msg)};
 const source=m.original_sources.find(x=>x.id==='L04');
 need(p?.schema==='isograph.track-L.G0.L04-original-Eq6_1-Eq6_2-p15-fidelity.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.semantic_authority===false,'packet stage');
 need(p.primary.revision==='arXiv:2407.02497v2'&&p.primary.pdf_sha256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422'&&source.PDF_SHA256===p.primary.pdf_sha256&&p.primary.bytes===348134&&p.primary.pages===17,'frozen source exact');
 const ids=['L04-P013-B003','L04-P013-B004','L04-P013-B005','L04-P013-B007','L04-P015-B002'];
 need(eq(p.primary.atoms.map(x=>x.id),ids),'exact five source atoms');
 for(const a of p.primary.atoms??[]){const pg=source.original_pdf_extracted_pages.find(x=>x.PDF_page_zero_based===a.page_zero_based),block=pg?.blocks.find(x=>x.source_atom_id===a.id),text=pages.get(a.page_zero_based);
 need(pg?.original_extracted_page_SHA256===a.page_sha256&&block?.original_source_block_SHA256===a.block_sha256&&eq(a.lines,[block?.original_extracted_line_start,block?.original_extracted_line_end]),'manifest original atom '+a.id);
 need(typeof text==='string'&&sha(Buffer.from(text))===a.page_sha256,'re-extracted whole source page '+a.id);
 if(block&&typeof text==='string'){const lines=text.replaceAll('\r','').replace(/\f+$/g,'').split('\n');need(sha(Buffer.from(lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n')) )===a.block_sha256,'re-extracted source block '+a.id)}
 }
 const page13=(pages.get(12)||'').replace(/\s+/g,' ').toLowerCase(),page15=(pages.get(14)||'').replace(/\s+/g,' ').toLowerCase();
 need(page13.includes('quaternionic multiplication from the right')&&page13.includes('antiunitary time conjugation operator')&&page15.includes('using an isomorphism'),'original source modal language');
 const a=p.groups?.[0],b=p.groups?.[1];
 need(p.groups?.length===2&&a?.id==='L04-S034'&&b?.id==='L04-S035'&&a?.roles?.length===13&&b?.roles?.length===9,'two groups 22 roles');
 need(eq(a?.roles?.map(x=>x.role),first)&&eq(b?.roles?.map(x=>x.role),second),'complete source role order');
 need(eq(a?.after_owners,['L-SSC-096','L-SSC-111','L-SSC-115'])&&eq(b?.after_owners,['L-SSC-116']),'exact existing SSC owner map');
 need(p.groups?.every(x=>x.roles?.every(v=>x.after_owners?.includes(v.owner)&&v.modality&&typeof v.meaning==='string')),'all 22 roles have owners/modality');
 const by=(group,id)=>group?.roles?.find(z=>z.role===id),has=(group,id,token)=>by(group,id)?.meaning.includes(token);
 need(has(a,'C_DIRAC','Psi^C=i gamma2 Psi*')&&has(a,'C_QL','psi^C_QL=psi_QL sigma1')&&has(a,'C_HL','psi^C_HL=i psi_HL e1')&&has(a,'P_DIRAC','Psi^P=i gamma0 Psi')&&has(a,'P_QL','-sigma2 psi_QL* sigma1')&&has(a,'P_HL','-psi_HL* e3')&&has(a,'T_DIRAC','gamma13 Psi*')&&has(a,'T_QL','i sigma2 psi_QL*')&&has(a,'T_HL','-psi_HL* e2'),'original three carriers 9 exact formulas');
 need(by(a,'T_DIRAC')?.modality==='PRINTED_ANTIUNITARY_SPINOR'&&has(a,'RIGHT_CARRIER','right')&&has(a,'EQ61_TILDE','CPT~-i')&&has(a,'P15_EQUALITY','chosen isomorphism')&&by(a,'S031_OPEN')?.modality==='UNRESOLVED_ADJACENT_SCOPE','antiunitary, tilde/equality, S031 open');
 need(has(b,'T_MINUS_P13','t~-1/2')&&has(b,'T_PLUS_P15','t=+1/2')&&has(b,'AD_CYCLE','e1->e2->e3->e1')&&has(b,'C_NONCOMMUTE','does not commute')&&has(b,'CPT_COMMUTE','commutes with CPT')&&by(b,'NEXT_K_SCOPE')?.modality==='EXCLUDED_ADJACENT_GROUP','t signed original and reserved S036 scope');
 const w=p.finite_witness,tm=w.negative,tp=w.positive;
 need(eq(tm,[-.5,-.5,-.5,-.5])&&eq(tp,[.5,.5,.5,.5]),'source two opposite representatives');
 need(eq(qm(tm,qc(tm)),one)&&eq(qm(tp,qc(tp)),one)&&eq(q3(tm),one)&&eq(q3(tp),minusOne),'exact Hamilton group element powers');
 need(eq(q3(tm),w.negative_cube)&&eq(q3(tp),w.positive_cube)&&w.negative_order===3&&w.positive_order===6,'declared signed cubes and orders');
 need(es.every((e,k)=>eq(adj(tm,e),es[(k+1)%3])&&eq(adj(tp,e),es[(k+1)%3]))&&eq(w.adjoint_e1_e2_e3,['e2','e3','e1'])&&w.positive_and_negative_have_same_adjoint===true,'both exact adjoint cycles');
 need(!eq(qm(tm,es[0]),qm(es[0],tm))&&w.noncommutes_e1===true&&w.commutes_central_phase===true,'t source C noncommutation/central CPT commutation boundary');
 need(w.global_author_group_theorem===false&&w.source_typo_proved===false&&w.physical_triality_proved===false,'exact finite witness has no unsupported promotion');
 need(p.source_modality.p13_eq61_representation_tilde&&p.source_modality.p15_chosen_isomorphism_equality&&p.source_modality.p13_negative_t&&p.source_modality.p15_positive_t&&p.source_modality.source_S031_mismatch_unresolved&&p.source_modality.S036_K_creation_physics_not_in_scope,'original source distinction and known unresolved');
 need(s.item_count===191&&s.items.length===191&&i.locations.length===53&&eq(changed(s.items,prevSSC.items),['L-SSC-115','L-SSC-116'])&&eq(changed(i.locations,prevInv.locations),['L04-S034','L04-S035']),'189 other SSC and 51 other L04 entire records preserved');
 need(eq(i.locations.find(x=>x.id==='L04-S034')?.ssc_ids,a?.after_owners)&&eq(i.locations.find(x=>x.id==='L04-S035')?.ssc_ids,b?.after_owners)&&new Set(i.locations.flatMap(x=>x.ssc_ids)).size===34,'S034 reciprocal links + all 34 root owners');
 need(i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===4&&Object.values(i.counts.by_disposition).reduce((n,z)=>n+z,0)===53,'4 L04 source broad unreviewed and 53 total');
 need(p.predecessor.ssc_sha===H.prevSSC&&p.predecessor.inverse_sha===H.prevInv&&s.predecessor.git_blob_sha===H.prevSSC&&s.revision.source_packet.git_blob_sha===H.packet&&s.revision.source_first_inverse.git_blob_sha===H.Inv,'source predecessor and packet immutable git SHA');
 need(i.current_original_p13_p15_CPT_triality.packet.git_blob_sha===H.packet&&r.current_ssc.git_blob_sha===H.SSC&&r.per_source.find(x=>x.source==='L04')?.audit_git_blob_sha===H.Inv&&r.per_source.reduce((n,x)=>n+x.source_first_location_units,0)===350&&r.per_source.every(x=>!x.original_complete_cold_review_passed),'6 sources, 350 groups, all 0 cold complete');
 need(t.current_census.git_blob_sha===H.SSC&&t.current_L04_source_first_inventory.git_blob_sha===H.Inv&&t.current_G0_six_original_finite_convergence.git_blob_sha===H.Reg&&t.complete_sources===0,'current traversal exact SHA and source state');
 need(g.current_source_census.git_blob_sha===H.SSC&&g.current_L04_source_first.git_blob_sha===H.Inv&&g.current_convergence.git_blob_sha===H.Reg&&g.current_traversal.git_blob_sha===H.Trav&&g.predecessor_gate.git_blob_sha===H.prevGate,'current gate exact SHA');
 need(g0.new_source_CI.run_id===38196224136&&g.predecessor_gate.historical_failures_preserved===true&&g.new_source_CI.run_id===null,'retained prior success/fail history, pending fresh result');
 need(!g.current_lawful_state.G0_frozen&&!g.current_lawful_state.G1_authorized&&!g.current_lawful_state.W_semantics_imported&&!g.current_lawful_state.cross_track_synthesis_authorized&&!g.current_lawful_state.PR70_merge_authorized,'no stage or track bypass');
 return fail;
}
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-p13-p15-'));
const pages=new Map();let pdfShaVerified=false;
try{const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(60000)});
if(!response.ok)throw Error('FROZEN_ORIGINAL_HTTP_'+response.status);
const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length!==348134||sha(bytes)!==D.packet.primary.pdf_sha256)throw Error('FROZEN_PDF_DIGEST_MISMATCH');pdfShaVerified=true;
const file=path.join(tmp,'L04.pdf');fs.writeFileSync(file,bytes);if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000})))throw Error('SOURCE_PAGES_NOT_17');
for(const page of [12,14])pages.set(page,execFileSync('pdftotext',['-f',String(page+1),'-l',String(page+1),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000}));
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
const failures=check(D,pages);
const hostile=[
['wrong_pdf_digest',d=>d.packet.primary.pdf_sha256='BAD'],
['wrong_pdf_revision',d=>d.packet.primary.revision='v1'],
['wrong_original_page_sha',d=>d.packet.primary.atoms[0].page_sha256='BAD'],
['wrong_original_block_sha',d=>d.packet.primary.atoms[2].block_sha256='BAD'],
['wrong_block_line_span',d=>d.packet.primary.atoms[2].lines=[100,101]],
['delete_S034',d=>d.packet.groups.shift()],
['delete_S035_role',d=>d.packet.groups[1].roles.pop()],
['alter_unowned_role',d=>d.packet.groups[0].roles[0].owner='L-SSC-999'],
['flip_complex_C_dirac',d=>d.packet.groups[0].roles.find(x=>x.role==='C_DIRAC').meaning='Psi^C=i gamma0 Psi*'],
['flip_QL_parity_sign',d=>d.packet.groups[0].roles.find(x=>x.role==='P_QL').meaning='sigma2 psi_QL* sigma1'],
['erase_T_star',d=>d.packet.groups[0].roles.find(x=>x.role==='T_DIRAC').meaning='gamma13 Psi'],
['promote_T_unitary',d=>d.packet.groups[0].roles.find(x=>x.role==='T_DIRAC').modality='PRINTED_UNITARY_SPINOR'],
['erase_right_action',d=>d.packet.groups[0].roles.find(x=>x.role==='RIGHT_CARRIER').meaning='left'],
['erase_tilde_CPT',d=>d.packet.groups[0].roles.find(x=>x.role==='EQ61_TILDE').meaning='CPT=-i'],
['deny_chosen_iso',d=>d.packet.groups[0].roles.find(x=>x.role==='P15_EQUALITY').meaning='global'],
['pretend_S031_fixed',d=>d.packet.source_modality.source_S031_mismatch_unresolved=false],
['flip_p13_triality_sign',d=>d.packet.groups[1].roles.find(x=>x.role==='T_MINUS_P13').meaning='t~+1/2'],
['flip_p15_triality_sign',d=>d.packet.groups[1].roles.find(x=>x.role==='T_PLUS_P15').meaning='t=-1/2'],
['change_tminus_component',d=>d.packet.finite_witness.negative[2]=+.5],
['change_tplus_component',d=>d.packet.finite_witness.positive[2]=-.5],
['claim_tminus_order6',d=>d.packet.finite_witness.negative_order=6],
['claim_tplus_cube_positive',d=>d.packet.finite_witness.positive_cube=[1,0,0,0]],
['claim_different_adjoint',d=>d.packet.finite_witness.positive_and_negative_have_same_adjoint=false],
['claim_author_typo',d=>d.packet.finite_witness.source_typo_proved=true],
['claim_global_physics',d=>d.packet.finite_witness.physical_triality_proved=true],
['promote_K_from_S036',d=>d.packet.source_modality.S036_K_creation_physics_not_in_scope=false],
['drop_S034_reciprocal_owner',d=>d.Inv.locations.find(x=>x.id==='L04-S034').ssc_ids.shift()],
['alter_unrelated_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-105').body+='UNLAWFUL'],
['alter_unrelated_source_location',d=>d.Inv.locations.find(x=>x.id==='L04-S012').disposition='UNLAWFUL'],
['forge_cold_zero',d=>d.Inv.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
['forge_SSC_192',d=>d.SSC.items.push({id:'L-SSC-192'})],
['break_reg_SHA_pointer',d=>d.Reg.current_ssc.git_blob_sha='BAD'],
['break_trav_SHA_pointer',d=>d.Gate.current_traversal.git_blob_sha='BAD'],
['erase_prior_original_CI',d=>d.prevGate.new_source_CI.run_id=0],
['invent_new_source_CI',d=>d.Gate.new_source_CI.run_id=100],
['premature_G1',d=>d.Gate.current_lawful_state.G1_authorized=true],
['premature_W_import',d=>d.Gate.current_lawful_state.W_semantics_imported=true],
['premature_merge',d=>d.Gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;
if(!failures.length)for(const [name,mutate]of hostile){const z=structuredClone(D);try{mutate(z);if(check(z,pages).length)rejected++;else failures.push('HOSTILE_ESCAPE_'+name)}catch(e){failures.push('HOSTILE_CHECKER_EXCEPTION_'+name+':'+e.message)}}
const report={schema:'isograph.exp062.track-L.G0.original-L04-Eq6_1-Eq6_2-source.v0.1',PASS:failures.length===0,failures,frozen_original_PDF_SHA256_verified:pdfShaVerified,original_page_SHAs_verified:pages.size,original_source_atoms_verified:5,source_semantic_groups:2,typed_roles:22,SSC_IDs:191,source_locations:350,remaining_L04_broad_mapped:4,tminus_order:3,tplus_order:6,equal_adjoint_three_cycle:true,hostiles_defined:hostile.length,hostiles_rejected:rejected,full_original_semantic_cold_sources:0,G0_frozen:false,G1_authorized:false,W_imported:false,PR70_merge_authorized:false};
console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
