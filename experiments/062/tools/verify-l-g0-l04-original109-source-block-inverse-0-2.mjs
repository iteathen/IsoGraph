// L-only G0 original-source audit: SHA256-frozen 2407.02497v2 original PDF
// 109 original layout blocks -> 53 previous source groups -> 34 previous
// SSC owners. This checks real frozen PDF bytes, per-block lineage and local
// inverse memberships, not full mathematical or figure-cell fidelity.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 source:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
 manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 inverse:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_69.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_21.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_22.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_38.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_39.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_122.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_123.json',
 self:E+'tools/verify-l-g0-l04-original109-source-block-inverse-0-2.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const h=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const originalDef=D.manifest.original_sources[3];
const legitimate='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const expectedGroupIds=new Set(D.inverse.locations.map(x=>x.id));
const expectedSSCOwners=new Set(D.inverse.locations.flatMap(x=>x.ssc_ids));
const oldSSC=JSON.stringify(D.SSC.items);
const originalIntake=JSON.stringify(D.inverse.locations);
const by=(arr,id,key='id')=>arr?.find(x=>x?.[key]===id);
const total=(x)=>Object.values(x||{}).reduce((a,b)=>a+b,0);
function check(z,pdfPages){
 const bad=[],t=(q,m)=>{if(!q)bad.push(m);};
 const {source:s,manifest:m,inverse:i,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=z;
 t(s?.schema==='isograph.track-L.G0.L04.original-109-PDF-block-source-SSC-bidirectional-role-census.v0.1'&&s.track==='L'&&s.stage==='G0','original source G0 L-only');
 t(s?.frozen_primary?.id==='L04'&&s?.frozen_primary?.revision==='arXiv:2407.02497v2'&&s?.frozen_primary?.SHA256===legitimate&&s?.frozen_primary?.PDF_pages===17,'original frozen v2 PDF revision provenance');
 t(s?.source_first_original_109_preview_CI?.run_id===38114397470&&s?.source_first_original_109_preview_CI?.head_sha==='5c5293edf8fd882a7de68ef3ab5bde39a9f424a6'&&s?.source_first_original_109_preview_CI?.conclusion==='success'&&s?.source_first_original_109_preview_CI?.hostiles_rejected===12,'historical independent PDF source-first probe qualified');
 t(m?.original_sources?.length===6&&m?.original_sources?.[3]?.PDF_SHA256===legitimate&&m?.original_sources?.[3]?.original_PDF_pages===17,'six original PDF SHA frozen manifest still source authority');
 t(i?.locations?.length===53&&n?.items?.length===191&&JSON.stringify(i?.locations)===originalIntake&&JSON.stringify(n?.items)===oldSSC,'entire original L04 source-group and SSC bodies unchanged');
 t(s?.parent_source_group?.git_blob_sha===h.inverse&&s?.source_SSC?.git_blob_sha===h.SSC&&s?.source_SSC?.new_identity_count===0,'exact predecessor SHA immutable and no typed ID proliferation');
 t(s?.totals?.original_source_text_blocks===109&&s?.totals?.source_role_dispositions===109&&s?.totals?.prior_53_source_group_ids_all_referenced===true&&s?.totals?.prior_34_SSC_root_ids_all_referenced===true,'finite original source first denominator and both correspondences');
 t(s?.totals?.original_nonblank_extracted_lines===848&&s?.totals?.frozen_original_pages===17&&total(s?.totals?.dispositions)===109,'original source original 17p 848 lines 109 independent dispositions');
 t(s?.totals?.selected_exact_source_formula_table_diagram_groups_outstanding===14&&s?.totals?.full_original_L04_semantic_cold_pass===false&&s?.totals?.original_formula_table_diagram_exact_cell_cold_complete===false,'selected remaining 14, whole original cold still open');
 t(s?.known_G0_exit_debt?.selected_14_original_L04_formula_table_diagram_exact_groups_still_pending===true&&s?.known_G0_exit_debt?.diagram_cpt_cube_8vertex_edge_incidences_pending===true&&s?.known_G0_exit_debt?.figure2_full_192_weight_cell_color_semantics_pending===true,'source figure exactness not silently promoted');
 t(s?.stage_locks?.G0_complete===false&&s?.stage_locks?.G0_frozen===false&&s?.stage_locks?.G1_authorized===false&&s?.stage_locks?.W_semantics_imported===false&&s?.stage_locks?.PR70_merge_authorized===false,'G0 stage isolation');
 const ids=new Set,sourceOwners=new Set,sourceGroups=new Set,cls={},seenSourceLines=new Map;
 t(s?.original_first_source_blocks?.length===109&&pdfPages?.length===17,'all physical original PDF source blocks present');
 for(let p=0;p<17;p++){
  const prev=m?.original_sources?.[3]?.original_pdf_extracted_pages?.[p],raw=pdfPages?.[p]||'';
  t(sha(Buffer.from(raw))===prev?.original_extracted_page_SHA256,'actual original frozen PDF page SHA '+p);
  const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
  const matches=s?.original_first_source_blocks?.filter(x=>x.original_PDF_page_zero_based===p)||[];
  t(matches.length===prev?.source_layout_blocks,'exact per-page source text blocks '+p);
  const linesOwned=new Set;
  for(const x of matches){
   if(ids.has(x.atom_id))t(false,'duplicate original PDF source block '+x.atom_id);
   ids.add(x.atom_id);
   const orig=prev?.blocks?.find(b=>b.source_atom_id===x.atom_id);
   t(!!orig,'original source SHA block exists '+x.atom_id);
   const a=x.source_line_range?.[0],b=x.source_line_range?.[1];
   t(Number.isInteger(a)&&Number.isInteger(b)&&a>=1&&b>=a&&b<=lines.length,'original source precise page/text span '+x.atom_id);
   if(Number.isInteger(a)&&Number.isInteger(b)&&a>=1&&b>=a&&b<=lines.length){
    const slice=lines.slice(a-1,b).join('\n');
    t(sha(Buffer.from(slice))===x.source_original_text_block_SHA256&&x.source_original_text_block_SHA256===orig?.original_source_block_SHA256,'actual original PDF primary source block SHA '+x.atom_id);
    const nonblank=lines.slice(a-1,b).map(y=>y.trim()).filter(Boolean);
    const opening=nonblank.slice(0,2).join(' ');
    const bounded=opening.length>130?opening.slice(0,75)+' [context omitted] '+opening.slice(-45):opening;
    t(x.source_role_bounded_excerpt===bounded.slice(0,155),'source-first independently extracted original opening '+x.atom_id);
    for(let k=a;k<=b;k++){t(!linesOwned.has(k)&&!!lines[k-1].trim(),'one-to-one original PDF nonblank extracted line '+x.atom_id+'/'+k);linesOwned.add(k);}
   }
   const groupIds=x.source_group_ids||[],mapped=new Set;
   for(const id of groupIds){
    const g=by(i?.locations,id);t(!!g,'real existing original source group '+id);if(g)for(const owner of g.ssc_ids)mapped.add(owner);
    sourceGroups.add(id);
   }
   const claimed=x.existing_SSC_owner_ids||[];
   t(new Set(claimed).size===claimed.length&&mapped.size===claimed.length&&claimed.every(id=>mapped.has(id)&&expectedSSCOwners.has(id)),'EXACT per-source-block SSC owner array '+x.atom_id);
   claimed.forEach(id=>sourceOwners.add(id));
   t(x.source_formula_table_figure_exact_visual_cell_qualified===false&&x.source_exact_semantic_cold_pass===false,'no unjustified original equation/diagram proof '+x.atom_id);
   cls[x.original_first_role]=(cls[x.original_first_role]||0)+1;
   if(x.original_first_role==='DEFENSIBLE_NONLOAD_PAGE_FURNITURE')t(groupIds.join(',')==='L04-S053'&&claimed.length===0,'page furniture no semantic claim '+x.atom_id);
  }
  t(linesOwned.size===prev?.source_extracted_nonblank_lines,'full original PDF text no omissions or duplicate nonblank lines page '+p);
 }
 t(ids.size===109&&sourceGroups.size===53&&sourceOwners.size===34&&[...expectedGroupIds].every(z=>sourceGroups.has(z))&&[...expectedSSCOwners].every(z=>sourceOwners.has(z)),'bidirectional finite 109/53/34 source owner coverage');
 t(JSON.stringify(cls)===JSON.stringify(s?.totals?.dispositions),'source role-type conservation');
 t(pr?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.21'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.22','six-source register preserved');
 t(r?.source_first_predecessor?.git_blob_sha===h.oldReg&&r?.current_ssc?.git_blob_sha===h.SSC&&r?.L04_full_original_109_source_block_crosswalk?.git_blob_sha===h.source,'source convergence exact lineage');
 t(r?.per_source?.length===6&&r?.per_source?.reduce((q,x)=>q+x.source_first_location_units,0)===350&&r?.per_source?.find(x=>x.source==='L04')?.original_exact_cell_expression_groups_not_yet_independently_verified===14&&r?.per_source?.every(x=>x.original_complete_cold_review_passed===false),'six source counts and G0 pending debt preserved');
 t(r?.exit_acceptance_contract?.G0_SSC_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false&&r?.explicit_locks?.G1_authorized===false,'G0 exit contract still closed to transition');
 t(pt?.schema==='lisi.full-treatment.source-traversal-ledger.v0.38'&&v?.schema==='lisi.full-treatment.source-traversal-ledger.v0.39'&&v?.predecessor_exact?.git_blob_sha===h.oldTr,'source traversal predecessor immutable');
 t(v?.current_G0_six_original_finite_convergence?.git_blob_sha===h.reg&&v?.current_L04_109_source_first_reconstruction?.git_blob_sha===h.source&&v?.complete_sources===0,'source-first traversal limited current scope');
 t(og?.schema==='isograph.exp062-l-current-stage-gate.v0.122'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.123'&&g?.predecessor_gate?.git_blob_sha===h.oldGate,'G0 stage gate ancestor');
 t(g?.current_source_census?.git_blob_sha===h.SSC&&g?.current_convergence?.git_blob_sha===h.reg&&g?.source_first_L04_original_inverse?.git_blob_sha===h.source&&g?.source_first_verifier?.git_blob_sha===h.self,'stage exact source and verifier provenance');
 t(g?.first_failed_L04_109_inverse_CI?.run_id===38116665825&&g?.first_failed_L04_109_inverse_CI?.conclusion==='failure'&&g?.first_failed_L04_109_inverse_CI?.hostiles_rejected===24,'preserve first original109 source inverse baseline failure as failure');
 t(g?.prior_L04_109block_source_CI?.run_id===38114397470&&g?.prior_L04_109block_source_CI?.conclusion==='success'&&g?.prior_L04_109block_source_CI?.hostiles_rejected===12,'prior original source run provenance exact');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false,'new CI not preclaimed or unauthorized stage');
 return bad;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L04-G0-original-first-'));const pages=[];
try{
 const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(response.status!==200)throw Error('FROZEN_L04_OFFICIAL_SOURCE_HTTP_'+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(sha(bytes)!==legitimate||bytes.length!==originalDef.PDF_byte_count)throw Error('FROZEN_L04_ORIGINAL_PDF_BYTES_MISMATCH');
 const pdf=path.join(dir,'source.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('FROZEN_L04_PAGE_COUNT_CHANGED');
 for(let p=0;p<17;p++)pages.push(execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:14000,maxBuffer:1800000}));
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const errors=check(D,pages);
const hostiles=[
 ['erase_original_block',d=>d.source.original_first_source_blocks.pop()],
 ['duplicate_original_atom',d=>d.source.original_first_source_blocks[1].atom_id=d.source.original_first_source_blocks[0].atom_id],
 ['mutate_source_byte_sha',d=>d.source.original_first_source_blocks[0].source_original_text_block_SHA256='bad'],
 ['mutate_line_span',d=>d.source.original_first_source_blocks[4].source_line_range[0]=999],
 ['mutate_excerpt',d=>d.source.original_first_source_blocks[3].source_role_bounded_excerpt='FAKE SOURCE'],
 ['erase_block_owner',d=>d.source.original_first_source_blocks.find(z=>z.atom_id==='L04-P005-B004').existing_SSC_owner_ids=[]],
 ['invent_ssc_owner',d=>d.source.original_first_source_blocks[18].existing_SSC_owner_ids.push('L-SSC-999')],
 ['erase_source_group',d=>d.source.original_first_source_blocks.find(z=>z.atom_id==='L04-P006-B002').source_group_ids=[]],
 ['wrong_group_route',d=>d.source.original_first_source_blocks.find(z=>z.atom_id==='L04-P008-B006').source_group_ids=['L04-S053']],
 ['claim_visual_cold',d=>d.source.original_first_source_blocks[5].source_formula_table_figure_exact_visual_cell_qualified=true],
 ['claim_paper_cold',d=>d.source.totals.full_original_L04_semantic_cold_pass=true],
 ['claim_G0',d=>d.source.stage_locks.G0_complete=true],
 ['claim_G1',d=>d.source.stage_locks.G1_authorized=true],
 ['claim_W_import',d=>d.source.stage_locks.W_semantics_imported=true],
 ['wrong_source_revision',d=>d.source.frozen_primary.revision='arXiv:2407.02497v1'],
 ['forged_CI_success',d=>d.source.source_first_original_109_preview_CI.conclusion='failure'],
 ['change_source_group_owner',d=>d.inverse.locations[0].ssc_ids.pop()],
 ['change_source_semantic_body',d=>d.inverse.locations[3].original_source_semantic_group='UNSOURCED'],
 ['change_other_SSC',d=>d.SSC.items[0].body+=' forged'],
 ['invent_new_SSC_ID',d=>d.SSC.items.push({...d.SSC.items[0],id:'L-SSC-192'})],
 ['forge_register_open14',d=>d.reg.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['forge_exit_G0',d=>d.reg.exit_acceptance_contract.G0_SSC_frozen=true],
 ['forge_gate_parent',d=>d.gate.predecessor_gate.git_blob_sha='BAD'],
 ['forge_gate_G1',d=>d.gate.current_lawful_state.G1_authorized=true]
];
let rejected=0;for(const [name,edit] of hostiles){
 const clone=JSON.parse(JSON.stringify(D));
 try{edit(clone);if(check(clone,pages).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+name)}
 catch(e){errors.push('HOSTILE_VERIFIER_EXCEPTION_'+name+':'+String(e))}
}
const result={schema:'isograph.exp062.L.G0.L04.frozen-original109-bidirectional.v0.2',
 pass:errors.length===0,issues:errors,official_frozen_v2_PDF_SHA256_verified:true,
 original_pages:17,original_source_blocks:109,original_nonblank_text_lines:848,
 original_source_groups_crosswalked:53,existing_SSC_owner_IDs:34,
 selected_original_exact_cell_groups_still_open:14,
 full_original_paper_cold_qualified:false,all_six_original_cold_complete:0,
 hostiles_defined:hostiles.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
