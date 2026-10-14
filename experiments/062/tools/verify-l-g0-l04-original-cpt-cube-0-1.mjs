// IsoGraph Lisi G0 independent original 17-page L04 §5 p11 CPT cube verifier.
// Original figure's eight weight states are NOT the 16-element signed CPT operator group.
// Does not prove author's physical theory, future stage, or six-paper SSC completion.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const F={
  packet:P+'LISI_L04_ORIGINAL_CPT_CUBE_8_VERTEX_28_EDGE_SOURCE_G0_0_1.json',
  manifest:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
  oldInv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',
  inv:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_7.json',
  oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_73.json',
  SSC:P+'SOURCE_SEMANTIC_CENSUS_0_74.json',
  oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_26.json',
  reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_27.json',
  oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_43.json',
  tr:P+'SOURCE_TRAVERSAL_LEDGER_0_44.json',
  oldGate:E+'L_CURRENT_STAGE_GATE_0_128.json',
  gate:E+'L_CURRENT_STAGE_GATE_0_129.json',
  self:E+'tools/verify-l-g0-l04-original-cpt-cube-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const SHA=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,blob(p)]));
const data=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const source_SHA='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422';
const expected_roles=['C','P','T','CP','CT','PT','CPT'];
const mask={C:[false,false,true],P:[true,false,false],T:[true,true,false],CP:[true,false,true],CT:[true,true,true],PT:[false,true,false],CPT:[false,true,true]};
const labels=['f_L_wedge','f_R_wedge','f_R_vee','f_L_vee','bar_f_L_wedge','bar_f_R_wedge','bar_f_R_vee','bar_f_L_vee'];
const weights=[[-1,1,1],[1,1,1],[-1,-1,1],[1,-1,1],[-1,1,-1],[1,1,-1],[-1,-1,-1],[1,-1,-1]];
const printLocs=[
 ['L04-P011-B001',1,10,'9b743430f1c27df61e3a228973a664e5783676eca864e2f478e8c4caad5f8fc3'],
 ['L04-P011-B002',12,12,'ba26877f5d892365db6b49d0b2ca1a9a4195ba7c2b439461dd4a5413f9c6246c'],
 ['L04-P011-B003',14,28,'d82b62a04595eb8d052dae7d8cf9c0bb6fc12a3cc052df978059a2d78d864aba']
];
const repaired='SCOPED_ORIGINAL_CPT_CUBE_8_VERTEX_28_PROJECTIVE_EDGE_SOURCE_RECONCILED_WHOLE_COLD_OPEN';
const unique=x=>new Set(x).size===x.length;
function verify(d,originalPageText){
 const errors=[], t=(p,n)=>{if(!p)errors.push(n);};
 const {packet:s,manifest:m,oldInv:oi,inv:i,oldSSC:o,SSC:n,oldReg:pr,reg:r,oldTr:pt,tr:v,oldGate:og,gate:g}=d;
 t(s?.schema==='isograph.track-L.G0.L04-frozen-original-CPT-eight-weight-cube-graph.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.semantic_authority===false,'non-authoritative L-only source packet');
 t(s?.source?.revision==='arXiv:2407.02497v2'&&s?.source?.PDF_SHA256===source_SHA&&s?.source?.PDF_bytes===348134&&s?.source?.PDF_pages===17&&s.source.printed_page===11,'frozen original revision and printed page identity');
 t(s?.source?.visual_CI?.run_id===38120301520&&s?.source?.visual_CI?.job_id===114413453012&&s?.source?.visual_CI?.head_sha==='91401ae8b82806779aa5c0437c751c572c88b000'&&s?.source?.visual_CI?.conclusion==='success'&&s?.source?.visual_CI?.original_image_SHA256==='135d6d31489136b84f60c225d495d234b14e41b7e082b08101ad8c8d37eb9f0b','exact original source visual CI identity');
 t(m.original_sources?.[3]?.id==='L04'&&m.original_sources[3].PDF_SHA256===source_SHA&&m.original_sources[3].original_pdf_extracted_pages?.length===17,'source manifest 17-page identity');
 const page=m.original_sources[3].original_pdf_extracted_pages[10],lines=originalPageText.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 t(sha(Buffer.from(originalPageText))===page.original_extracted_page_SHA256&&page.original_extracted_page_SHA256===s.source.PDF_page_original_text_SHA256,'original p11 full extracted page exact SHA');
 t(eq(s?.source_evidence_loci?.map(z=>[z.id,...z.lines,z.SHA256]),printLocs),'original three block locators, printed p11 lines and SHA');
 for(const [id,a,b,digest] of printLocs){
  const block=page.blocks.find(z=>z.source_atom_id===id);
  t(!!block&&block.original_extracted_line_start===a&&block.original_extracted_line_end===b&&block.original_source_block_SHA256===digest,'official original PDF census block '+id);
  t(sha(Buffer.from(lines.slice(a-1,b).join('\n')))===digest,'independent original PDF exact 11-page block digest '+id);
 }
 t(s.source_group==='L04-S027'&&eq(s.source_SSC_owner_ids,['L-SSC-097','L-SSC-108'])&&s.current_exact_transcription_owner==='L-SSC-108','source-first exactly existing S027 two owners and one adjusted SSC source item');
 t(s.figure?.vertices?.length===8&&eq(s.figure.vertices.map(x=>x.id),labels),'eight original source glyph labels');
 t(eq(s.figure?.operators?.map(x=>x.id),expected_roles),'seven source composite operation roles');
 t(s.figure?.vertices.every((x,k)=>eq([x.x_sign,x.s_sign,x.q_sign],weights[k])&&x.weights.omega_T===weights[k][0]+'/2'&&x.weights.omega_S===weights[k][1]+'/2'&&x.weights.q===weights[k][2]+'/2'&&x.weights.h===weights[k][0]*weights[k][1]+'/2'),'source Eq5.4/Table2 weight sign labels and h coupling');
 t(s.figure.source_Equation_5_4?.C==='(omega_T,omega_S,h,q)->(omega_T,omega_S,h,-q)'&&s.figure.source_Equation_5_4?.P==='(omega_T,omega_S,h,q)->(-omega_T,omega_S,-h,q)'&&s.figure.source_Equation_5_4?.T==='(omega_T,omega_S,h,q)->(-omega_T,-omega_S,h,q)','original p11 Eq5.4 C/P/T exact source sign distinction');
 for(const op of s.figure.operators){t(eq(op.mask,mask[op.id]),'source weight-sign action for '+op.id);}
 const induced=[],reconstructed={};
 for(const op of expected_roles){const seen=new Set();
  for(const v of s.figure.vertices){
   const m0=mask[op],d=[v.x_sign*(m0[0]?-1:1),v.s_sign*(m0[1]?-1:1),v.q_sign*(m0[2]?-1:1)];
   const peer=s.figure.vertices.find(x=>eq([x.x_sign,x.s_sign,x.q_sign],d));
   if(!peer){t(false,'missing original peer for '+op+' '+v.id);continue;}
   const pair=[v.id,peer.id].sort(),key=pair.join('|');
   if(v.id===peer.id)t(false,'invalid weight fixed edge '+op);
   if(!seen.has(key)){seen.add(key);induced.push({operator:op,from:pair[0],to:pair[1]});}
  }
  reconstructed[op]=seen.size;t(seen.size===4,'4 precise original picture edges per action '+op);
 }
 const actual=s.figure?.incidence_edges||[];
 t(eq(induced,actual)&&actual.length===28&&unique(actual.map(x=>x.from+'|'+x.to))&&eq(reconstructed,s.figure.edge_counts_per_label),'all and only 28 derived source figure edges, one per unordered glyph pair');
 t(s.figure.source_16_signed_operator_elements_NOT_identified_with_8_projective_weight_states===true&&s.figure.not_the_underlying_Q8_times_Z2_multiplication_table===true&&s.figure.calculated_from_source_eq5_4_not_imported_physics===true,'8-state picture != order16 lifted group');
 t(s.figure.figure_vertex_embedding_positions_are_presentation_only===true&&s.locks?.G0_frozen===false&&s.locks?.G1_authorized===false&&s.locks?.W_semantics_imported===false&&s.locks?.source_fig1_fig2_full_edge_incidence_still_open===true,'source pictorial geometry nonload and other figures still G0');
 t(s.conservation?.prior_L04_original_location_total===53&&s.conservation.other_entire_L04_original_groups_unchanged===52&&s.conservation.other_entire_SSC_records_unchanged===190&&s.conservation.after_this_scoped_review_exact_open_L04_groups===7&&s.conservation.added_SSC_items===0,'scoped conservation and 8-to-7 original debt');
 t(oi.locations.length===53&&i.locations.length===53&&o.items.length===191&&n.items.length===191,'frozen source and SSC cardinalities');
 let changes=[];
 for(let k=0;k<53;k++){t(oi.locations[k].id===i.locations[k].id,'source group order '+k);if(!eq(oi.locations[k],i.locations[k]))changes.push(i.locations[k].id)}
 t(eq(changes,['L04-S027']),'52 unchanged entire other original source groups');
 const row=i.locations.find(x=>x.id==='L04-S027');
 t(row.disposition===repaired&&row.original_figure_source_evidence?.git_blob_sha===SHA.packet&&row.original_figure_source_evidence.full_original_17page_semantic_cold_complete===false&&eq(row.ssc_ids,['L-SSC-097','L-SSC-108']),'original figure source-SSC correspondence and cold guard');
 const owners=new Set(),counts={};
 for(const row of i.locations){counts[row.disposition]=(counts[row.disposition]||0)+1;for(const id of row.ssc_ids)owners.add(id)}
 t(owners.size===34&&eq([...owners].sort(),oi.reverse.L04_ssc_ids.slice().sort()),'unchanged bidirectional 53 to 34 source-owner mapping');
 t(Object.entries(counts).every(([k,v])=>i.counts.by_disposition?.[k]===v)&&Object.keys(counts).length===Object.keys(i.counts.by_disposition||{}).length&&counts.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===7&&counts[repaired]===1,'current 53 source location dispositions derive mechanically');
 t(i.counts.remaining_exact_source_groups===7&&i.counts.independent_full_cold_complete_sources===0&&i.G0_frozen===false&&i.G1_authorized===false,'seven actual remaining original exact groups and no global G0 qualification');
 let altered=[];for(let k=0;k<191;k++){t(o.items[k].id===n.items[k].id,'SSC existing SI '+k);if(!eq(o.items[k],n.items[k]))altered.push(n.items[k].id)}
 t(eq(altered,['L-SSC-108']),'190 complete SSC records conserved and no new ID');
 const record=n.items.find(x=>x.id==='L-SSC-108');
 for(const phrase of ['eight','28','C, P, T','projective','16','nonabelian'])t(record?.body?.includes(phrase),'exact SSC108 source distinction '+phrase);
 t(record?.source_expression_census?.L04_ORIGINAL_CPT_CUBE_GRAPH_0_1?.original_source_packet?.git_blob_sha===SHA.packet&&record.source_expression_census.L04_ORIGINAL_CPT_CUBE_GRAPH_0_1.source_first_inverse.git_blob_sha===SHA.inv,'in-record original evidence provenance in SSC108');
 t(n.predecessor?.git_blob_sha===SHA.oldSSC&&n.revision.source_packet.git_blob_sha===SHA.packet&&n.revision.source_first_inverse.git_blob_sha===SHA.inv&&n.item_count===191&&n.guards.source_census_freeze_complete===false,'current SSC ancestry plus frozen guard');
 t(r.source_first_predecessor?.git_blob_sha===SHA.oldReg&&r.current_ssc?.git_blob_sha===SHA.SSC&&r.per_source.length===6&&r.per_source.reduce((q,x)=>q+x.source_first_location_units,0)===350,'six source groups conserved and source/SSC provenance');
 t(r.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified===7&&r.per_source.every(x=>x.original_complete_cold_review_passed===false)&&r.exit_acceptance_contract.G0_SSC_frozen===false,'current original source remaining qualified scope not six-source G0 pass');
 t(v.predecessor_exact?.git_blob_sha===SHA.oldTr&&v.current_census?.git_blob_sha===SHA.SSC&&v.current_L04_source_first_inventory?.git_blob_sha===SHA.inv&&v.current_G0_six_original_finite_convergence?.git_blob_sha===SHA.reg&&v.complete_sources===0,'traversal exact lineage, no false source completion');
 t(g.predecessor_gate?.git_blob_sha===SHA.oldGate&&g.current_source_census?.git_blob_sha===SHA.SSC&&g.current_convergence?.git_blob_sha===SHA.reg&&g.current_traversal?.git_blob_sha===SHA.tr&&g.cpt_cube_source_packet?.git_blob_sha===SHA.packet&&g.cpt_cube_source_verifier?.git_blob_sha===SHA.self,'current L stage guard exact provenance');
 t(g.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.current_lawful_state?.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'no CI success prematurity, G1 or merge');
 return errors;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-CPT-cube-source-'));let text11='',exactOriginalVerified=false;
try{
 const resp=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(45000)});
 if(resp.status!==200)throw Error('FROZEN_HISTORICAL_SOURCE_HTTP_'+resp.status);
 const bin=Buffer.from(await resp.arrayBuffer());
 if(bin.length!==348134||sha(bin)!==source_SHA)throw Error('HISTORICAL_SOURCE_BYTES_WRONG');
 const pdf=path.join(dir,'source.pdf');fs.writeFileSync(pdf,bin);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*17$/m.test(info))throw Error('HISTORICAL_L04_SOURCE_PAGE_COUNT');
 text11=execFileSync('pdftotext',['-f','11','-l','11','-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1600000});exactOriginalVerified=true;
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=verify(data,text11);
const hostile=[
 ['change_official_revision',d=>d.packet.source.revision='arXiv:2407.02497v1'],
 ['change_official_PDF_SHA',d=>d.packet.source.PDF_SHA256='BAD'],
 ['replace_original_p11_page_SHA',d=>d.packet.source.PDF_page_original_text_SHA256='BAD'],
 ['modify_original_figure_block',d=>d.packet.source_evidence_loci[2].SHA256='BAD'],
 ['forge_visual_CI',d=>d.packet.source.visual_CI.conclusion='failure'],
 ['forge_visual_PNG_digest',d=>d.packet.source.visual_CI.original_image_SHA256='BAD'],
 ['remove_source_first_owner',d=>d.packet.source_SSC_owner_ids=['L-SSC-108']],
 ['change_vertex_count',d=>d.packet.figure.vertices.pop()],
 ['reverse_first_vertex_charge',d=>d.packet.figure.vertices[0].q_sign=-1],
 ['reverse_first_vertex_boost',d=>d.packet.figure.vertices[0].x_sign=1],
 ['reverse_first_vertex_spin',d=>d.packet.figure.vertices[0].s_sign=-1],
 ['invent_ninth_original_glyph',d=>d.packet.figure.vertices.push({...d.packet.figure.vertices[0],id:'f_extra'})],
 ['replace_first_glyph',d=>d.packet.figure.vertices[0].id='new_glyph'],
 ['edit_source_eq5_4_C',d=>d.packet.figure.source_Equation_5_4.C='C: flip omegaT'],
 ['edit_source_eq5_4_P',d=>d.packet.figure.source_Equation_5_4.P='P: flip q'],
 ['edit_source_eq5_4_T',d=>d.packet.figure.source_Equation_5_4.T='T: flip q'],
 ['change_C_mask',d=>d.packet.figure.operators.find(x=>x.id==='C').mask=[true,false,false]],
 ['change_P_mask',d=>d.packet.figure.operators.find(x=>x.id==='P').mask=[false,true,false]],
 ['change_T_mask',d=>d.packet.figure.operators.find(x=>x.id==='T').mask=[true,false,true]],
 ['duplicate_operator_id',d=>d.packet.figure.operators[6].id='C'],
 ['drop_original_edge',d=>d.packet.figure.incidence_edges.pop()],
 ['replace_inferred_edge_role',d=>d.packet.figure.incidence_edges[0].operator='P'],
 ['reverse_edge_pair_partner',d=>d.packet.figure.incidence_edges[0].to='f_R_wedge'],
 ['duplicate_original_edge',d=>d.packet.figure.incidence_edges[1]=d.packet.figure.incidence_edges[0]],
 ['forge_order16_equals8',d=>d.packet.figure.source_16_signed_operator_elements_NOT_identified_with_8_projective_weight_states=false],
 ['erase_figure_1_2_remaining',d=>d.packet.locks.source_fig1_fig2_full_edge_incidence_still_open=false],
 ['alter_unrelated_SSC',d=>d.SSC.items.find(x=>x.id==='L-SSC-100').body+='BAD'],
 ['alter_original_group',d=>d.inv.locations.find(x=>x.id==='L04-S013').original_source_semantic_group+='BAD'],
 ['remove_original_inverse_edge',d=>d.inv.locations.find(x=>x.id==='L04-S027').ssc_ids.pop()],
 ['demote_unverified_figure_count',d=>d.inv.counts.remaining_exact_source_groups=0],
 ['forge_six_original_cold_pass',d=>d.reg.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
 ['forge_G0',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['forge_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['forge_PR_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true],
 ['forge_current_CI_success',d=>d.gate.new_source_CI.status='SUCCESS'],
 ['alter_exact_lineage',d=>d.tr.current_census.git_blob_sha='BAD']
];
let rejected=0;
if(!issues.length){for(const [name,mut]of hostile){const m=structuredClone(data);mut(m);if(verify(m,text11).length)rejected++;else issues.push('HOSTILE_ESCAPED_'+name)}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.original-L04-CPT-cube-source-0.1',PASS:issues.length===0,issues,source_exact_binary_verified:exactOriginalVerified,original_page_11_and_3_blocks_verified:issues.length===0,original_eight_weight_vertices:8,original_28_projective_edge_incidence:28,underlying_source_CPT_order:16,SSC_repaired:['L-SSC-108'],source_group_repaired:['L04-S027'],original_unmodified_source_groups:52,unmodified_entire_SSC_records:190,selected_exact_L04_groups_remaining:7,hostiles_defined:hostile.length,hostiles_rejected:rejected,whole_source_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(issues.length)process.exitCode=1;
