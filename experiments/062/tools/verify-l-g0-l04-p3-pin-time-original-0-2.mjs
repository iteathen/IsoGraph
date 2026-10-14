// L-only G0 exact original p3 Pin signature / C,T modality. Source authorship and physical truth not inferred.
// v0.2: first 24/25 hostile test failed; substring 'unitary' matched 'antiunitary'.
// Distinct whole-token antiunitary/unitary + exclusive polarity guards correct this checker defect.
// Current SSC 0.87 is UNFROZEN, G1+/cross-track/merge blocked. 0.1 first candidate.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={packet:P+'LISI_L04_ORIGINAL_P3_PIN_SIGNATURE_C_T_MODALITIES_G0_0_1.json',manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
  ssc0:P+'SOURCE_SEMANTIC_CENSUS_0_86.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_87.json',
  inv0:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_19.json',inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_20.json',
  reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_42.json',
  tr:P+'SOURCE_TRAVERSAL_LEDGER_0_59.json',gate:E+'L_CURRENT_STAGE_GATE_0_160.json'};
const j=p=>JSON.parse(fs.readFileSync(p,'utf8')),D=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,j(p)]));
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim()]));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),diff=(a,b)=>a.filter((x,i)=>!eq(x,b[i])).map(x=>x.id);
const solelyTyped=(value,kind)=>typeof value==='string'&&new RegExp('\\b'+kind+'\\b','i').test(value)&&!new RegExp('\\b'+(kind==='unitary'?'antiunitary':'unitary')+'\\b','i').test(value);
const sig=[1,-1,-1,-1];const unit={mask:0,sign:1},gamma=i=>({mask:1<<i,sign:1});
function mul(a,b){let sign=a.sign*b.sign;for(let i=0;i<4;i++)if(a.mask&(1<<i)){for(let k=0;k<i;k++)if(b.mask&(1<<k))sign=-sign;if(b.mask&(1<<i))sign*=sig[i]}return{mask:a.mask^b.mask,sign}}
const tm=mul(mul(gamma(1),gamma(2)),gamma(3)),pm=gamma(0),pt=mul(pm,tm);
function check(data,source){
 const {packet:q,manifest:m,ssc0,ssc,inv0,inv,reg,tr,gate}=data,bad=[];
 const need=(condition,key)=>{if(!condition)bad.push(key)};
 const orig=m.original_sources.find(x=>x.id==='L04'),src=q.original;
 need(q.track==='L'&&q.stage==='G0'&&q.semantic_authority===false&&src.revision==='arXiv:2407.02497v2','exact L original research scope');
 need(src.PDF_SHA256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422'&&orig.PDF_SHA256===src.PDF_SHA256&&src.pdf_bytes===348134&&src.PDF_pages===17,'source frozen binary SHA');
 need(typeof source==='string'&&sha(Buffer.from(source))===src.p3_page_SHA256&&orig.original_pdf_extracted_pages[2].original_extracted_page_SHA256===src.p3_page_SHA256,'fresh original p3 whole extracted page SHA');
 const block=orig.original_pdf_extracted_pages[2].blocks.find(x=>x.source_atom_id==='L04-P003-B001');
 need(block&&block.original_source_block_SHA256===src.source_atom_SHA256&&src.source_atom==='L04-P003-B001','original p3 atom literal hash');
 const lines=(source||'').replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 need(block&&sha(Buffer.from(lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n')) )===src.source_atom_SHA256,'original p3 block extracted text SHA');
 const text=(source||'').replace(/\s+/g,' ').toLowerCase();
 need(text.includes('fudge a bit')&&text.includes('complex conjugation')&&text.includes('positive energy constraint'),'p3 original characteristic modal phrases');
 need(q.source_first?.length===2&&q.source_first?.[0]?.id==='L04-S004'&&q.source_first?.[1]?.id==='L04-S005','two existing target source groups');
 need(q.source_first?.[0]?.roles?.length===7&&q.source_first?.[1]?.roles?.length===6,'13 separately expressed source roles');
 need(q.source_first?.every(g=>Array.isArray(g.roles)&&g.roles.every(r=>r.key&&r.modality&&typeof r.literal==='string')),'all 13 roles have literal source + modality');
 const s4=q.source_first?.[0]?.roles??[],s5=q.source_first?.[1]?.roles??[];
 need(eq(s4.find(x=>x.key==='PIN13_SIGNS')?.signs,[1,1,-1])&&eq(s4.find(x=>x.key==='PIN31_SIGNS')?.signs,[-1,-1,-1]),'two DIFFERENT printed Pin signature sign triples');
 need(s4.find(x=>x.key==='P_PHASE_SQUARE')?.sign===-1&&s4.find(x=>x.key==='P_UNDERLYING_PIN31')?.modality==='AUTHOR_PHYSICAL_INFERENCE_NOT_PROOF','phase square and tentative physical stance');
 need(solelyTyped(s5.find(x=>x.key==='C_ANTIUNITARY')?.literal,'antiunitary')&&solelyTyped(s5.find(x=>x.key==='TIME_Q_UNITARY')?.literal,'unitary')&&solelyTyped(s5.find(x=>x.key==='TIME_UNQUANTIZED_ANTIUNITARY')?.literal,'antiunitary'),'three typed C/T operation polarities');
 need(s5.find(x=>x.key==='TIME_UNQUANTIZED_ANTIUNITARY')?.literal.includes('-i U')&&s5.find(x=>x.key==='THREE_DISTINCT_TIME_ROLES')?.modality==='SOURCE_SCOPE_DISAMBIGUATION','composition and T_U vs T_Q vs T distinction');
 need(eq(mul(pm,pm),unit)&&eq(mul(tm,tm),unit)&&eq(mul(pt,pt),{mask:0,sign:-1})&&eq(mul(tm,gamma(2)),{mask:10,sign:1}), 'independently recomputed finite Clifford coefficients');
 need(ssc.items.length===191&&inv.locations.length===53&&eq(diff(ssc.items,ssc0.items),['L-SSC-095','L-SSC-096']),'exact two changed SSC roots and 189 stable');
 need(eq(diff(inv.locations,inv0.locations),['L04-S004','L04-S005'])&&inv.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===14&&Object.values(inv.counts.by_disposition).reduce((a,v)=>a+v,0)===53,'51 stable L04 groups and 14 open mapped');
 need(new Set(inv.locations.flatMap(r=>r.ssc_ids)).size===34,'no lost existing L04 source identity owner');
 need(ssc.items.find(r=>r.id==='L-SSC-095')?.body.includes('(+1,+1,-1)')&&ssc.items.find(r=>r.id==='L-SSC-095')?.body.includes('APPEAR')&&ssc.items.find(r=>r.id==='L-SSC-096')?.body.includes('ANT IUNITARY')===false,'pin signed source and author guarded physical modality');
 need(ssc.items.find(r=>r.id==='L-SSC-096')?.body.includes('ANTIUNITARY')&&ssc.items.find(r=>r.id==='L-SSC-096')?.body.includes('U_T^Q=gamma13'),'separate C/UT source modalities');
 need(q.predecessors.ssc_sha===H.ssc0&&q.predecessors.inverse_sha===H.inv0&&ssc.predecessor.git_blob_sha===H.ssc0,'predecessor SHA chain');
 need(ssc.revision.source_packet.git_blob_sha===H.packet&&ssc.revision.source_first_inverse.git_blob_sha===H.inv&&inv.current_original_p3_pin_time_review.packet.git_blob_sha===H.packet,'source packet + inverse SHA');
 need(reg.current_ssc.git_blob_sha===H.ssc&&reg.per_source.find(x=>x.source==='L04').audit_git_blob_sha===H.inv&&reg.per_source.reduce((a,x)=>a+x.source_first_location_units,0)===350,'six original source-group denominator and new SHA');
 need(tr.current_census.git_blob_sha===H.ssc&&tr.current_L04_source_first_inventory.git_blob_sha===H.inv&&tr.current_G0_six_original_finite_convergence.git_blob_sha===H.reg&&tr.complete_sources===0,'current traversal original provenance');
 need(gate.current_source_census.git_blob_sha===H.ssc&&gate.current_L04_source_first.git_blob_sha===H.inv&&gate.current_convergence.git_blob_sha===H.reg&&gate.current_traversal.git_blob_sha===H.tr,'current gate exact hash tuple');
 need(gate.predecessor_gate.last_successful_L04_abstract_source_run===38181493891&&gate.predecessor_gate.previous_failed_original_source_run===38181212146,'prior scoped success and historical failure not lost');
 need(gate.new_source_CI.run_id===null&&gate.current_lawful_state.G0_frozen===false&&gate.current_lawful_state.G1_authorized===false&&gate.current_lawful_state.W_semantics_imported===false&&gate.current_lawful_state.cross_track_synthesis_authorized===false&&gate.current_lawful_state.PR70_merge_authorized===false,'no premature semantic or merge gate');
 need(q.locks.G0_frozen===false&&q.locks.G1_authorized===false&&q.locks.whole_source_cold_passes===0,'source-level nonpromotion');
 return bad;
}
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l04-p3-pin-'));let original='',originalBytesVerified=false;
try{const resp=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(60000)});if(!resp.ok)throw Error('FROZEN_ORIGINAL_SOURCE_HTTP_'+resp.status);
 const bytes=Buffer.from(await resp.arrayBuffer());if(bytes.length!==348134||sha(bytes)!==D.packet.original.PDF_SHA256)throw Error('FROZEN_PDF_MISMATCH');originalBytesVerified=true;
 const file=path.join(tmp,'l04-v2.pdf');fs.writeFileSync(file,bytes);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_PDF_PAGE_COUNT');
 original=execFileSync('pdftotext',['-f','3','-l','3','-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000});
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
const errors=check(D,original);
const hostile=[
['changed_signature_pin13',x=>x.packet.source_first[0].roles.find(r=>r.key==='PIN13_SIGNS').signs[0]=-1],
['changed_signature_pin31',x=>x.packet.source_first[0].roles.find(r=>r.key==='PIN31_SIGNS').signs[2]=1],
['fake_phase_square',x=>x.packet.source_first[0].roles.find(r=>r.key==='P_PHASE_SQUARE').sign=1],
['promote_physical_Pin_guess',x=>x.packet.source_first[0].roles.find(r=>r.key==='P_UNDERLYING_PIN31').modality='ESTABLISHED'],
['wrong_antiunitary_C',x=>x.packet.source_first[1].roles.find(r=>r.key==='C_ANTIUNITARY').literal='C is unitary'],
['wrong_quantized_unitarity',x=>x.packet.source_first[1].roles.find(r=>r.key==='TIME_Q_UNITARY').literal='T is antiunitary'],
['wrong_unquantized_unitarity',x=>x.packet.source_first[1].roles.find(r=>r.key==='TIME_UNQUANTIZED_ANTIUNITARY').literal='T is unitary'],
['erase_T_role_distinction',x=>x.packet.source_first[1].roles.find(r=>r.key==='THREE_DISTINCT_TIME_ROLES').modality='SAME'],
['wrong_time_operator_composition',x=>x.packet.source_first[1].roles.find(r=>r.key==='TIME_UNQUANTIZED_ANTIUNITARY').literal='U_T=+i'],
['invent_original_pdf_sha',x=>x.packet.original.PDF_SHA256='BAD'],
['invent_original_page_sha',x=>x.packet.original.p3_page_SHA256='BAD'],
['invent_original_atom_sha',x=>x.packet.original.source_atom_SHA256='BAD'],
['erase_source_group',x=>x.packet.source_first.pop()],
['erase_source_role',x=>x.packet.source_first[1].roles.pop()],
['alter_unrelated_ssc',x=>x.ssc.items.find(r=>r.id==='L-SSC-113').body+='BAD'],
['alter_unrelated_source_group',x=>x.inv.locations.find(r=>r.id==='L04-S007').original_source_semantic_group+='BAD'],
['erase_signed_ssc',x=>x.ssc.items.find(r=>r.id==='L-SSC-095').body='signs not recorded'],
['erase_C_T_ssc',x=>x.ssc.items.find(r=>r.id==='L-SSC-096').body='one time'],
['forge_original_open_count',x=>x.inv.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
['break_current_ssc_pointer',x=>x.reg.current_ssc.git_blob_sha='BAD'],
['break_traversal_pointer',x=>x.gate.current_traversal.git_blob_sha='BAD'],
['erase_historical_failed_CI',x=>x.gate.predecessor_gate.previous_failed_original_source_run=0],
['premature_G1',x=>x.gate.current_lawful_state.G1_authorized=true],
['premature_cross_author',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
['premature_PR70_merge',x=>x.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;if(!errors.length)for(const [label,mut] of hostile){let m=structuredClone(D);try{mut(m);if(check(m,original).length)rejected++;else errors.push('HOSTILE_ESCAPE_'+label)}catch(e){errors.push('HOSTILE_CHECKER_EXCEPTION_'+label+':'+String(e))}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04-Pin-C-T-source.v0.2',PASS:errors.length===0,errors,original_pdf_sha256_verified:originalBytesVerified,original_p3_page_and_block_sha256_verified:true,SSC_IDs:191,source_groups:350,source_reviewed_groups:2,source_roles:13,remaining_L04_mapped_open:14,hostiles_defined:hostile.length,hostiles_rejected:rejected,whole_original_source_cold_passes:0,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(errors.length)process.exitCode=1;
