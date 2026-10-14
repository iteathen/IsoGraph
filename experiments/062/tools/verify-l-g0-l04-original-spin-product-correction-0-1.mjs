// IsoGraph L-only G0. Source-original p3 × versus historical semidirect mistranscription.
// Frozen 2024 arXiv v2 original source PDF, 191-item SSC conservation, finite signed Cl(1,3) witness.
// No G0 freeze, external physical theory proof, W import, G1, or PR merge.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 packet:P+'LISI_L04_SPIN_DIRECT_PRODUCT_SOURCE_FIDELITY_DEFECT_G0_0_1.json',
 oldPacket:P+'LISI_L04_ORIGINAL_SECTION1_CLIFFORD_ADJOINT_REFLECTION_PTU_SOURCE_G0_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_84.json',SSC:P+'SOURCE_SEMANTIC_CENSUS_0_85.json',
 oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_17.json',
 inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_18.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_39.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_56.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_154.json'
};
const j=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const D=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,j(p)]));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const ORIGINAL_SHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const SOURCE_P3='7f569c8a8ef99942eb0bb318bdaff4e9509d923ada6b0bd81540a57947d044bf';
const BLOCK_P3='599069870dfbe88de38891eb84e32d38aed9ca92ca66a0cee397c2cb98c15f5f';
const sig=[1,-1,-1,-1],I={m:0,s:1},P0={m:1,s:1},T0={m:14,s:1};
function mul(a,b){let s=a.s*b.s;for(let i=0;i<4;i++)if(a.m&(1<<i)){for(let k=0;k<i;k++)if(b.m&(1<<k))s=-s;if(b.m&(1<<i))s*=sig[i];}return {m:a.m^b.m,s};}
const meq=(a,b)=>a.m===b.m&&a.s===b.s;
function check(z,original2,original3){
 const errors=[],need=(c,msg)=>{if(!c)errors.push(msg);};
 const {packet:q,oldPacket:o,manifest:m,oldSSC:s0,SSC:s,oldInv:i0,inv:i,reg:r,tr:t,gate:g}=z;
 need(q?.schema==='isograph.track-L.G0.L04-section1-spin-factor-source-fidelity-defect.v0.1'&&q.track==='L'&&q.stage==='G0'&&q.semantic_authority===false,'L G0 scope');
 need(q?.frozen_original?.revision==='arXiv:2407.02497v2'&&q.frozen_original.sha256===ORIGINAL_SHA&&q.frozen_original.bytes===348134&&q.frozen_original.pages===17,'source frozen original revision and bytes');
 need(m?.original_sources?.[3]?.id==='L04'&&m.original_sources[3].PDF_SHA256===ORIGINAL_SHA,'six-source manifest original');
 const pg3=m?.original_sources?.[3]?.original_pdf_extracted_pages?.[2];
 need(typeof original3==='string'&&sha(Buffer.from(original3))===SOURCE_P3&&pg3?.original_extracted_page_SHA256===SOURCE_P3,'actual p3 extracted original full page SHA');
 need(q.frozen_original.original_text_page_sha256===SOURCE_P3&&q.frozen_original.original_source_atom_sha256===BLOCK_P3,'new source packet exact p3 old primary anchors');
 const lines=(original3||'').replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const blk=pg3?.blocks?.find(x=>x.source_atom_id==='L04-P003-B001');
 need(blk?.original_source_block_SHA256===BLOCK_P3&&sha(Buffer.from(lines.slice(blk.original_extracted_line_start-1,blk.original_extracted_line_end).join('\n')))===BLOCK_P3,'original p3 full source block SHA');
 const pg2=m?.original_sources?.[3]?.original_pdf_extracted_pages?.[1];
 need(typeof original2==='string'&&sha(Buffer.from(original2))===pg2?.original_extracted_page_SHA256,'actual original p2 layout SHA');
 const f2=(original2||'').replace(/\s+/g,' '),f3=(original3||'').replace(/\s+/g,' ');
 need(f2.includes('⋊')&&f2.includes('Spin+(1, 3)'), 'source original p2 semidirect Pin extension distinct from p3');
 const sourceDirect=/Spin\s*\(\s*1,\s*3\s*\)\s*=\s*Spin\+\s*\(\s*1,\s*3\s*\)\s*×\s*\{\s*1,\s*P\s*T\s*U\s*\}/g;
 need([...f3.matchAll(sourceDirect)].length===2,'actual source p3 TWO original direct-product × displays');
 need(f3.includes('−1')||f3.includes('−1}'),'actual source p3 negative PT square sign preserved');
 need(q.source_roles?.length===4&&q.source_roles[0].notation==='⋊'&&q.source_roles[1].notation==='×'&&q.source_roles[2].notation==='×'&&q.source_roles[3].notation==='(PT_U)^2=-1','separate p2 ⋊ and both p3 × original author/source roles');
 need(q.transcription_defect?.original_source_packet_git_blob_sha===H.oldPacket&&q.transcription_defect?.existing_source_group==='L04-S003'&&q.transcription_defect.existing_SSC_owner==='L-SSC-094','historical old source packet SHA and existing owner');
 need(o?.source_printed_semantics?.at(-1)?.includes('semidirect {1,P T_U}')&&q.transcription_defect.previous_SSC_literal.includes('semidirect {1,P T_U}'),'old wrong transcription retained, never silently rewritten');
 const g0=mul(P0,T0),g2=mul(g0,g0);
 need(meq(mul(P0,P0),I)&&meq(mul(T0,T0),I)&&meq(g0,{m:15,s:1})&&meq(mul(T0,P0),{m:15,s:-1})&&meq(g2,{m:0,s:-1})&&meq(mul(g2,g2),I),'exact signed Cl(1,3) original-compatible matrix-free blade algebra');
 need(q.finite_model?.PT_U_squared==='-1'&&q.finite_model.PT_U_order===4&&q.finite_model.proposed_factor_multiplicatively_closed===false,'two-element factor is not an unquotiented group without qualification');
 need(q.unresolved_semantics?.length===3&&q.locks.G0_open===true&&q.locks.G1_authorized===false&&q.locks.W_semantics_imported===false&&q.locks.PR70_merge_authorized===false,'interpreted source group meaning open and stage isolated');
 need(s0?.items?.length===191&&s?.items?.length===191&&s.item_count===191&&i0.locations?.length===53&&i.locations?.length===53,'all existing source/SSC ID cardinalities');
 const changedS=s.items.filter((x,k)=>!eq(x,s0.items[k])).map(x=>x.id);
 const changedI=i.locations.filter((x,k)=>!eq(x,i0.locations[k])).map(x=>x.id);
 need(eq(changedS,['L-SSC-094'])&&eq(changedI,['L04-S003']),'190 whole SSC and 52 original source-location records unchanged');
 const item=s.items.find(x=>x.id==='L-SSC-094'),loc=i.locations.find(x=>x.id==='L04-S003');
 need(item?.body.includes('Spin(1,3)=Spin+(1,3) × {1,P T_U}')&&!item.body.includes('Spin(1,3)=Spin+(1,3) semidirect'),'correct exact author source transcription in existing SSC owner');
 need(s0.items.find(x=>x.id==='L-SSC-094')?.body.includes(' semidirect {1,P T_U}')&&loc?.original_source_semantic_group.includes('mistaken semidirect transcription'),'historical SSC negative and current original location source repair');
 need(item?.source_expression_census?.L04_SPIN_PRINTED_PRODUCT_NOTATION_CORRECTION_G0_0_1?.source_packet?.git_blob_sha===H.packet&&item.source_expression_census.L04_SPIN_PRINTED_PRODUCT_NOTATION_CORRECTION_G0_0_1.source_first_inverse.git_blob_sha===H.inv,'current SSC original packet and inverse SHA-pinned');
 need(loc?.original_spin_factor_notation_correction?.source_packet_git_blob_sha===H.packet&&i.current_original_spin_product_symbol_audit.source_packet.git_blob_sha===H.packet,'inverse group source packet exact SHA');
 need(s.predecessor?.git_blob_sha===H.oldSSC&&s.revision?.source_first_inverse?.git_blob_sha===H.inv&&s.revision?.unchanged_source_items===190,'SSC correct predecessor and exact conservation revision');
 need(r.current_ssc?.git_blob_sha===H.SSC&&r.per_source?.find(x=>x.source==='L04')?.audit_git_blob_sha===H.inv&&r.per_source.reduce((v,x)=>v+x.source_first_location_units,0)===350,'six original groups and exact convergence current SHA');
 need(r.per_source.find(x=>x.source==='L04').classified_source_locations.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===18&&r.per_source.every(x=>x.original_complete_cold_review_passed===false),'18 L04 mapped source cold-open, 0/6 whole cold');
 need(t.current_census?.git_blob_sha===H.SSC&&t.current_L04_source_first_inventory?.git_blob_sha===H.inv&&t.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg&&t.complete_sources===0,'traversal stage full ledger conservation');
 need(g.current_source_census?.git_blob_sha===H.SSC&&g.current_L04_source_first?.git_blob_sha===H.inv&&g.current_convergence?.git_blob_sha===H.reg&&g.current_traversal?.git_blob_sha===H.tr,'gate exact current SHA pointers');
 need(g.prior_p15_scoped_source_CI_success?.run_id===38176580576&&g.predecessor_gate?.first_p15_failure_id===38176395190,'historical failed p15 and successful repair not falsified');
 need(g.current_lawful_state?.G0_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.W_semantics_imported===false&&g.current_lawful_state?.PR70_merge_authorized===false&&g.new_source_CI?.run_id===null,'new G0 CI pending, no illicit promotion');
 return errors;
}
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l-g0-Spin-original-'));
let original2='',original3='',binaryVerified=false;
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(55000)});
 if(!response.ok)throw Error('ORIGINAL_SOURCE_HTTP_'+response.status);
 const data=Buffer.from(await response.arrayBuffer());
 if(data.length!==348134||sha(data)!==ORIGINAL_SHA)throw Error('FROZEN_ORIGINAL_BYTES_OR_SHA_MISMATCH');
 binaryVerified=true;
 const file=path.join(temp,'arxiv-2407.02497v2.pdf');
 fs.writeFileSync(file,data);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('ORIGINAL_PDF_PAGES_NOT_17');
 original2=execFileSync('pdftotext',['-f','2','-l','2','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000});
 original3=execFileSync('pdftotext',['-f','3','-l','3','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000});
}finally{fs.rmSync(temp,{recursive:true,force:true});}
const issues=check(D,original2,original3);
const hostile=[
 ['invent_semidirect_at_first_original_p3',z=>z.packet.source_roles[1].notation='⋊'],
 ['invent_semidirect_at_second_original_p3',z=>z.packet.source_roles[2].notation='⋊'],
 ['replace_original_Pin_semidirect_with_direct',z=>z.packet.source_roles[0].notation='×'],
 ['discard_original_source_phase_sign',z=>z.packet.source_roles[3].notation='(PT_U)^2=1'],
 ['force_PT_square_positive_in_model',z=>z.packet.finite_model.PT_U_squared='+1'],
 ['pretend_two_factor_is_closed',z=>z.packet.finite_model.proposed_factor_multiplicatively_closed=true],
 ['erase_interpretation_unknown',z=>z.packet.unresolved_semantics=[]],
 ['alter_historical_wrong_source_packet',z=>z.oldPacket.source_printed_semantics[11]='direct product'],
 ['alter_historical_SSC',z=>z.oldSSC.items.find(x=>x.id==='L-SSC-094').body='retroactively repaired'],
 ['restore_false_semidirect_to_current_SSC',z=>z.SSC.items.find(x=>x.id==='L-SSC-094').body='Spin(1,3)=Spin+(1,3) semidirect {1,P T_U}'],
 ['change_unrelated_SSC_body',z=>z.SSC.items.find(x=>x.id==='L-SSC-105').body+=' UNAUTHORIZED'],
 ['delete_source_inverse_link',z=>delete z.inv.locations.find(x=>x.id==='L04-S003').original_spin_factor_notation_correction],
 ['change_unrelated_source_group',z=>z.inv.locations.find(x=>x.id==='L04-S005').original_source_semantic_group+=' WRONG'],
 ['falsify_191_current_count',z=>z.SSC.item_count=192],
 ['falsify_L04_mapped_original_open_18',z=>z.reg.per_source.find(x=>x.source==='L04').classified_source_locations.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
 ['premature_whole_source_cold_pass',z=>z.reg.per_source[3].original_complete_cold_review_passed=true],
 ['premature_G1',z=>z.gate.current_lawful_state.G1_authorized=true],
 ['pretend_authorized_merge',z=>z.gate.current_lawful_state.PR70_merge_authorized=true],
 ['falsify_original_binary_digest',z=>z.packet.frozen_original.sha256='BAD'],
 ['falsify_original_p3_block_hash',z=>z.packet.frozen_original.original_source_atom_sha256='BAD'],
 ['break_live_census_sha_pointer',z=>z.tr.current_census.git_blob_sha='BAD'],
 ['erase_historical_failed_CI',z=>z.gate.predecessor_gate.first_p15_failure_id=0]
];
let rejected=0;
if(!issues.length)for(const [name,mutate]of hostile){const z=structuredClone(D);try{mutate(z);if(check(z,original2,original3).length)rejected++;else issues.push('HOSTILE_ESCAPE_'+name)}catch(e){issues.push('HOSTILE_CHECK_EXCEPTION_'+name+':'+e.message)}}
const report={schema:'isograph.exp062.track-L.G0.L04-spin-product-source.v0.1',PASS:issues.length===0,issues,original_pdf_binary_SHA256_verified:binaryVerified,source_printed_page:3,source_direct_product_occurrences:2,historical_wrong_semidirect_preserved:true,source_first_changed_existing_group:'L04-S003',SSC_changed_existing_owner:'L-SSC-094',unmodified_other_SSC_records:190,unmodified_other_L04_groups:52,L_frozen_original_sources:6,source_location_groups:350,SSC_count:191,original_semantics_full_cold_complete:false,hostiles_defined:hostile.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
