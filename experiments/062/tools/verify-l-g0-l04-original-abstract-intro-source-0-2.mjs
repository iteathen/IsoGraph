// L-only G0 scope: frozen arXiv:2407.02497v2 abstract/p2 primary source, SSC conservation.
// v0.2: preserve failed 0.1 (22/23 hostile rejection); guard deleted source-group as controlled rejection.
// Exact PDF SHA and original extraction + immutable 0.85->0.86 source/owner delta; NO G1/merge authority.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={packet:P+'LISI_L04_ORIGINAL_ABSTRACT_INTRO_SOURCE_MODALITY_G0_0_1.json',
manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
ssc0:P+'SOURCE_SEMANTIC_CENSUS_0_85.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_86.json',
inv0:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_18.json',inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_19.json',
reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_41.json',
tr:P+'SOURCE_TRAVERSAL_LEDGER_0_58.json',
gate:E+'L_CURRENT_STAGE_GATE_0_157.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const D=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,load(p)]));
const H=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim()]));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),diff=(a,b)=>a.filter((x,k)=>!eq(x,b[k])).map(x=>x.id);
function check(o,pages){
 const {packet:q,manifest:m,ssc0,ssc,inv0,inv,reg,tr,gate}=o;
 const bad=[],need=(cond,label)=>{if(!cond)bad.push(label)};
 const src=m.original_sources.find(x=>x.id==='L04');
 need(q?.schema==='isograph.track-L.G0.L04-original-abstract-intro-source-modality.v0.1'&&q.track==='L'&&q.stage==='G0'&&q.source_semantic_authority===false,'correct G0 source authority');
 need(src?.revision==='arXiv:2407.02497v2'&&q.original.revision===src.revision&&q.original.PDF_SHA256===src.PDF_SHA256&&q.original.pdf_bytes===348134&&q.original.pages===17,'exact frozen revision/PDF identity');
 need(q.original.page_SHA256.length===2&&q.original.page_SHA256.every((h,i)=>h===src.original_pdf_extracted_pages[i].original_extracted_page_SHA256),'frozen page hashes from independent manifest');
 need(Array.isArray(pages)&&pages.length===2&&pages.every((p,i)=>sha(p)===q.original.page_SHA256[i]),'fresh pdf extraction of entire original pages 1-2');
 const a=q.original_source_atoms;
 need(a.length===5&&a.map(x=>x.id).join(',')==='L04-P001-B004,L04-P002-B001,L04-P002-B002,L04-P002-B003,L04-P002-B004','all exact original text atoms');
 for(const x of a){
  const pg=src.original_pdf_extracted_pages[x.page],z=pg?.blocks.find(v=>v.source_atom_id===x.id);
  need(z&&z.original_source_block_SHA256===x.source_SHA256&&eq(x.lines,[z.original_extracted_line_start,z.original_extracted_line_end]),'source atom manifest '+x.id);
  if(z&&pages[x.page]){
   const lines=pages[x.page].replaceAll('\r','').replace(/\f+$/g,'').split('\n');
   need(sha(Buffer.from(lines.slice(z.original_extracted_line_start-1,z.original_extracted_line_end).join('\n')) )===x.source_SHA256,'source original block bytes '+x.id);
  }
 }
 const normalized=pages.map(p=>p.replace(/\s+/g,' ').toLowerCase());
 need(normalized[0]?.includes('quantized fermion states')&&normalized[0]?.includes('three')&&normalized[0]?.includes('generations'),'original abstract semantic terms');
 need(normalized[1]?.includes('irreducible representation')&&normalized[1]?.includes('double cover')&&normalized[1]?.includes('very likely')&&normalized[1]?.includes('weak interaction'),'original introduction semantic terms');
 need(q.source_groups.length===2&&q.source_groups[0].id==='L04-S001'&&q.source_groups[1].id==='L04-S002'&&q.source_groups?.[0]?.source_roles.length===3&&q.source_groups?.[1]?.source_roles.length===8,'eleven separate source-semantic roles');
 need(Array.isArray(q.source_groups)&&q.source_groups.every(g=>Array.isArray(g.source_roles)&&Array.isArray(g.new_owners)&&g.source_roles.every(r=>g.new_owners.includes(r.owner))), 'every source role has existing SSC owner');
 need(q.source_groups?.[1]?.source_roles?.find(r=>r.id==='I1')?.modality==='AUTHOR_INFERENCE'&&q.source_groups?.[1]?.source_roles?.find(r=>r.id==='I7')?.modality==='AUTHOR_PHYSICAL_CONJECTURE'&&q.source_groups?.[1]?.source_roles?.find(r=>r.id==='I8')?.modality==='PROJECT_ATTRIBUTION_CORRECTION','triality/physical conjecture/editorial modalities');
 need(q.source_groups?.[1]?.source_roles?.find(r=>r.id==='I5')?.meaning.includes('⋊')&&q.source_groups?.[1]?.source_roles?.find(r=>r.id==='I5')?.meaning.includes('Pin(1,3)'), 'p2 original semidirect display separate from p3 ×');
 need(q.predecessor.census_sha===H.ssc0&&q.predecessor.inverse_sha===H.inv0,'exact source predecessor Git blob hashes');
 need(ssc.items.length===191&&ssc.item_count===191&&inv.locations.length===53&&inv0.locations.length===53,'exact populations 191/53');
 need(eq(diff(ssc.items,ssc0.items),['L-SSC-014','L-SSC-015','L-SSC-093']),'188 complete other SSC items unchanged');
 need(eq(diff(inv.locations,inv0.locations),['L04-S001','L04-S002']),'51 complete other L04 source groups unchanged');
 const i1=inv.locations.find(x=>x.id==='L04-S001'),i2=inv.locations.find(x=>x.id==='L04-S002');
 need(eq(i1.ssc_ids,['L-SSC-014','L-SSC-124'])&&eq(i2.ssc_ids,['L-SSC-014','L-SSC-015','L-SSC-093','L-SSC-124']),'bidirectional two new S002 existing owner links');
 need(inv.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===16&&Object.values(inv.counts.by_disposition).reduce((a,b)=>a+b,0)===53,'scope-exact remaining 16 L04 groups');
 need(new Set(inv.locations.flatMap(x=>x.ssc_ids)).size===34,'all 34 L04 source owners still mapped');
 need(ssc.items.find(x=>x.id==='L-SSC-015')?.body.includes('editorial comparison')&&ssc.items.find(x=>x.id==='L-SSC-015')?.body.includes('NOT a source-native'),'no root-negation attribution to author');
 need(ssc.items.find(x=>x.id==='L-SSC-093')?.body.includes('very likely')&&ssc.items.find(x=>x.id==='L-SSC-093')?.body.includes('⋊')&&ssc.items.find(x=>x.id==='L-SSC-014')?.body.includes('AUTHOR INTERPRETATION'),'source modal and notation guards');
 need(ssc.predecessor.git_blob_sha===H.ssc0&&ssc.revision.source_packet.git_blob_sha===H.packet&&ssc.revision.source_first_inverse.git_blob_sha===H.inv,'SSC SHA provenance');
 need(inv.current_original_abstract_intro_source_packet.git_blob_sha===H.packet&&reg.current_ssc.git_blob_sha===H.ssc&&reg.per_source.find(x=>x.source==='L04').audit_git_blob_sha===H.inv,'inverse/register current SHA provenance');
 need(reg.per_source.reduce((n,x)=>n+x.source_first_location_units,0)===350&&reg.per_source.every(x=>x.original_complete_cold_review_passed===false),'six-source 350/0 conservation');
 need(tr.current_census.git_blob_sha===H.ssc&&tr.current_L04_source_first_inventory.git_blob_sha===H.inv&&tr.current_G0_six_original_finite_convergence.git_blob_sha===H.reg&&tr.complete_sources===0,'current traversal hashes/qualification boundary');
 need(gate.current_source_census.git_blob_sha===H.ssc&&gate.current_L04_source_first.git_blob_sha===H.inv&&gate.current_convergence.git_blob_sha===H.reg&&gate.current_traversal.git_blob_sha===H.tr,'exact gate 0.157 SHA tuple');
 need(gate.predecessor_gate.prior_L04_spin_source_failed_CI===38178243330&&gate.predecessor_gate.prior_L04_spin_source_success_CI===38178354251,'failed original spin run preserved alongside later pass');
 need(gate.new_source_CI.run_id===null&&gate.L04_abstract_intro_source_packet.independent_original_CI==='NOT_RUN','gate 0.157 did not invent external CI');
 need(!gate.current_lawful_state.G0_frozen&&!gate.current_lawful_state.G1_authorized&&!gate.current_lawful_state.W_semantics_imported&&!gate.current_lawful_state.cross_track_synthesis_authorized&&!gate.current_lawful_state.PR70_merge_authorized,'no stage/cross-track/merge bypass');
 need(!q.locks.G0_frozen&&!q.locks.G1_authorized&&!q.locks.W_source_imported&&!q.locks.PR70_merge_authorized&&!q.locks.whole_L04_original_source_semantic_cold_complete,'source packet unqualified');
 return bad;
}
const work=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l04-intro-'));
let pages=[],pdfBytePass=false;
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(60000)});
 if(!response.ok)throw Error('ORIGINAL_SOURCE_HTTP_'+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length!==348134||sha(bytes)!==D.packet.original.PDF_SHA256)throw Error('ORIGINAL_PDF_BYTE_SHA_MISMATCH');
 pdfBytePass=true;
 const file=path.join(work,'l04-v2.pdf');fs.writeFileSync(file,bytes);
 const inf=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(inf))throw Error('ORIGINAL_PDF_NOT_17_PAGES');
 for(let i=1;i<=2;i++)pages.push(execFileSync('pdftotext',['-f',String(i),'-l',String(i),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000}));
}finally{fs.rmSync(work,{recursive:true,force:true});}
const errors=check(D,pages);
const mutations=[
 ['source_frozen_revision',x=>x.packet.original.revision='v1'],
 ['source_pdf_sha',x=>x.packet.original.PDF_SHA256='WRONG'],
 ['page_source_digest',x=>x.packet.original.page_SHA256[0]='WRONG'],
 ['source_atom_hash',x=>x.packet.original_source_atoms[0].source_SHA256='WRONG'],
 ['source_atom_locus',x=>x.packet.original_source_atoms[1].lines=[99,100]],
 ['erase_abstract_group',x=>x.packet.source_groups.shift()],
 ['drop_intro_source_role',x=>x.packet.source_groups[1].source_roles.pop()],
 ['misattribute_intro_role',x=>x.packet.source_groups[1].source_roles[0].owner='L-SSC-999'],
 ['promote_triality_inference',x=>x.packet.source_groups[1].source_roles[0].modality='PROVEN'],
 ['promote_parity_speculation',x=>x.packet.source_groups[1].source_roles[6].modality='PROVEN'],
 ['change_p2_semidirect_to_direct',x=>x.packet.source_groups[1].source_roles[4].meaning='× Pin(1,3)'],
 ['remove_s002_existing_owner',x=>x.inv.locations.find(z=>z.id==='L04-S002').ssc_ids.splice(0,1)],
 ['change_unrelated_ssc',x=>x.ssc.items.find(z=>z.id==='L-SSC-113').body+=' BAD'],
 ['change_unrelated_source_group',x=>x.inv.locations.find(z=>z.id==='L04-S007').disposition='BAD'],
 ['strip_root_negation_editorial_warning',x=>x.ssc.items.find(z=>z.id==='L-SSC-015').body='author asserts root negation'],
 ['drop_very_likely',x=>x.ssc.items.find(z=>z.id==='L-SSC-093').body='physically certain'],
 ['wrong_original_ssc_sha',x=>x.packet.predecessor.census_sha='BAD'],
 ['wrong_current_traversal_sha',x=>x.gate.current_traversal.git_blob_sha='BAD'],
 ['invent_6_source_cold_complete',x=>x.reg.per_source.find(z=>z.source==='L04').original_complete_cold_review_passed=true],
 ['forge_G1',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['forge_cross_track',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['erase_historical_failed_spin_CI',x=>x.gate.predecessor_gate.prior_L04_spin_source_failed_CI=0],
 ['forge_new_source_CI',x=>x.gate.L04_abstract_intro_source_packet.independent_original_CI='SUCCESS']
];
let rejected=0;
if(!errors.length)for(const [name,mutate] of mutations){let a=structuredClone(D);mutate(a);try{if(check(a,pages).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name)}catch(e){errors.push('HOSTILE_EXCEPTION_'+name+':'+String(e))}}
const report={schema:'isograph.exp062.L04-abstract-intro-frozen-source-check.v0.2',PASS:!errors.length,errors,original_PDF_SHA256_verified:pdfBytePass,original_pages_SHA256_verified:pages.length,scoped_original_source_groups:2,original_author_semantic_roles:11,SSC_IDs:191,source_first_groups:350,original_whole_source_cold_passes:0,hostiles_defined:mutations.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
