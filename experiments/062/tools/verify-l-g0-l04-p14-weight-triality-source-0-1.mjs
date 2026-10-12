// L-only G0: frozen L04 p9+p14 original source, Euclidean weight/triality, and guard lineage.
// Project-controlled internal source qualification only. NO global G0 freeze, W import, G1 or merge.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
p:P+'LISI_L04_ORIGINAL_P14_24CELL_WEIGHT_TRIALITY_SOURCE_G0_0_1.json',
m:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
table:P+'LISI_L04_TABLE1_TABLE2_AND_FIGURES_COLD_G0_0_1.json',
matrix:P+'LISI_L04_TABLE3_TRIALITY_MATRIX_EXACT_G0_0_2.json',
fig:P+'LISI_L04_ORIGINAL_FIGURE1_24_VERTEX_60_EDGE_SOURCE_CELLS_0_1.json',
oldCross:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_1.json',
cross:P+'LISI_L04_109_ORIGINAL_PDF_SOURCE_BLOCK_SSC_REVERSE_0_2.json',
oldI:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_28.json',
i:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_29.json',
oldS:P+'SOURCE_SEMANTIC_CENSUS_0_95.json',
s:P+'SOURCE_SEMANTIC_CENSUS_0_96.json',
r:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_51.json',
t:P+'SOURCE_TRAVERSAL_LEDGER_0_68.json',
g:E+'L_CURRENT_STAGE_GATE_0_183.json'
};
const D=Object.fromEntries(Object.entries(paths).map(([k,v])=>[k,JSON.parse(fs.readFileSync(v,'utf8'))]));
const H=Object.fromEntries(Object.entries(paths).map(([k,v])=>[k,execFileSync('git',['hash-object',v],{encoding:'utf8'}).trim()]));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const changed=(a,b)=>a.filter((x,j)=>!eq(x,b[j])).map(x=>x.id);
const key=v=>v.join(',');
const dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
const mm=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((v,x,i)=>v+x*b[i][j],0)));
const trans=a=>a[0].map((_,i)=>a.map(row=>row[i]));
const id=n=>Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?n:0));
const diag=s=>s.map((c,i)=>s.map((_,j)=>i===j?(c==='+'?1:-1):0));
const isSignedPermutation=a=>a.length===4&&a.every(row=>row.filter(x=>Math.abs(x)===1).length===1)&&trans(a).every(row=>row.filter(x=>Math.abs(x)===1).length===1)&&a.flat().every(x=>[-1,0,1].includes(x));
const matvec=(a,v)=>a.map(row=>dot(row,v));
function matrixEvidence(sourceRows,originalTableRows,model){
 const src=originalTableRows.map(row=>({source_row_id:row.source_row_id,omegaT_Lorentz_twice:row.omegaT2,omegat_Euclidean_twice:row.omegaS2*row.h2*row.q2,euclidean_coordinates_twice:[row.omegaS2*row.h2*row.q2,row.omegaS2,row.h2,row.q2]}));
 const signs=sourceRows.map(row=>[...row].map(c=>c==='+'?1:-1));
 const t2=mm(signs,signs),t3=mm(t2,signs);
 const tr=v=>{const w=matvec(signs,v);if(w.some(x=>x%2))throw Error('noninteger triality transport');return w.map(x=>x/2)};
 const v0=src.map(x=>x.euclidean_coordinates_twice),v1=v0.map(tr),v2=v1.map(tr),v3=v2.map(tr);
 const V=[v0,v1,v2],all=V.flat(),edges=all.reduce((s,a,i)=>s+all.slice(i+1).filter(b=>dot(a,b)===2).length,0);
 const inter=[[0,1],[0,2],[1,2]].map(([i,j])=>V[i].reduce((s,a)=>s+V[j].filter(b=>dot(a,b)===2).length,0));
 const names=['C_I','P_I','T_I'];const ops={};
 for(const name of names){const d=diag(model.CPT_signs[name]),rawII=mm(mm(signs,d),t2),rawIII=mm(mm(t2,d),signs);if(rawII.flat().some(x=>x%8)||rawIII.flat().some(x=>x%8))throw Error('noninteger conjugation');
 const dII=rawII.map(row=>row.map(x=>x/8)),dIII=rawIII.map(row=>row.map(x=>x/8));
 ops[name]={II_signed_permutation:isSignedPermutation(dII),III_signed_permutation:isSignedPermutation(dIII),not_first_diagonal:!eq(dII,d),second_preserved:v1.every(v=>v1.some(w=>key(matvec(dII,v))===key(w))),third_preserved:v2.every(v=>v2.some(w=>key(matvec(dIII,v))===key(w))};}
 return {reconstructed_source_rows:src,triality_cubed: eq(t3,id(8)),triality_orthogonal:eq(mm(signs,trans(signs)),id(4)),sets:[v0.length,v1.length,v2.length],distinct:new Set(all.map(key)).size,returns_to_first:v3.every((v,i)=>key(v)===key(v0[i])),first_even_half:v0.every(v=>v.every(x=>Math.abs(x)===1)&&v.reduce((s,x)=>s*x,1)===1),second_odd_half:v1.every(v=>v.every(x=>Math.abs(x)===1)&&v.reduce((s,x)=>s*x,1)===-1),third_coordinate_axes:v2.every(v=>v.filter(x=>Math.abs(x)===2).length===1&&v.filter(x=>x===0).length===3),norms_one:all.every(v=>dot(v,v)===4),edge_count:edges,per_vertex_degree:all.map(a=>all.filter(b=>dot(a,b)===2).length),inter_edges:inter,boost_equal:src.filter(x=>x.omegaT_Lorentz_twice===x.omegat_Euclidean_twice).length,boost_opposite:src.filter(x=>x.omegaT_Lorentz_twice===-x.omegat_Euclidean_twice).length,operators:ops};
}
function check(d,pages){
 const {p,m,table,matrix,fig,oldCross,cross,oldI,i,oldS,s,r,t,g}=d;
 const failures=[],need=(v,k)=>{if(!v)failures.push(k)};
 const orig=m.original_sources.find(x=>x.id==='L04');
 need(p?.schema==='isograph.track-L.G0.L04-original-p14-24cell-weight-triality.v0.1'&&p?.track==='L'&&p?.stage==='G0'&&!p?.semantic_authority,'L research identity and source candidate');
 need(p?.frozen_source?.SHA256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422'&&p.frozen_source.SHA256===orig.PDF_SHA256&&p.frozen_source.bytes===348134&&p.frozen_source.pages===17,'frozen original PDF identity');
 need(eq(p.frozen_source.original_atoms.map(a=>a.id),['L04-P009-B004','L04-P014-B001','L04-P014-B002','L04-P014-B003']),'full explicit original block census');
 for(const atom of p.frozen_source.original_atoms){const page=orig.original_pdf_extracted_pages[atom.page],block=page?.blocks.find(x=>x.source_atom_id===atom.id),raw=pages.get(atom.page);
 need(page?.original_extracted_page_SHA256===atom.page_sha256&&block?.original_source_block_SHA256===atom.block_sha256&&eq(atom.lines,[block?.original_extracted_line_start,block?.original_extracted_line_end]),'original source manifest anchor '+atom.id);
 need(typeof raw==='string'&&sha(Buffer.from(raw))===atom.page_sha256,'fresh source page sha '+atom.id);
 if(typeof raw==='string'&&block){const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');need(sha(Buffer.from(lines.slice(block.original_extracted_line_start-1,block.original_extracted_line_end).join('\n')) )===atom.block_sha256,'fresh source block sha '+atom.id);}
 }
 const p14=pages.get(13)?.replace(/\s+/g,' ').toLowerCase()||'';
 need(p14.includes('24-cell')&&p14.includes('euclidean boost weight')&&p14.includes('necessarily nonsensical')&&p14.includes('under triality'),'source p14 semantic context');
 need(table.original_source.exact_official_PDF_SHA256===p.frozen_source.SHA256&&p.prior_sources.table2.sha===H.table&&p.prior_sources.triality.sha===H.matrix&&p.prior_sources.figure1.sha===H.fig&&p.prior_sources.block_crosswalk.sha===H.oldCross,'replayed exact prior source packets');
 need(eq(p.exact_model.sign_rows,matrix.triality.triality_integer_sign_rows)&&eq(p.exact_model.CPT_signs,matrix.triality.first_generation_diagonal_sign_strings)&&eq(p.exact_model.sign_rows,['+-++','+---','+++-','++-+']),'original C P T t signed matrix fidelity');
 const A=p.groups?.[0],B=p.groups?.[1],role=(g,id)=>g?.roles?.find(x=>x.id===id);
 need(p.groups?.length===2&&A?.id==='L04-S038'&&B?.id==='L04-S040'&&A?.roles?.length===10&&B?.roles?.length===9,'19 source roles in 2 existing groups');
 need(p.groups?.every(x=>Array.isArray(x.roles)&&x.roles.every(z=>x.owners.includes(z.owner)&&z.id&&z.modality&&z.claim)),'source occurrence owner and scope mapping');
 need(role(A,'EUCLIDEAN_BOOST')?.modality==='SOURCE_DEFINITION'&&role(A,'DISTINCT_BOOST_COORDINATES')?.modality==='SOURCE_SCOPE'&&role(A,'FIGURE1_GRAPH_SCOPE')?.modality==='SOURCE_GRAPH_VS_GEOMETRY','euclidean coordinate/source geometry boundary');
 need(role(B,'NO_DIRECT_LORENTZ')?.modality==='ORIGINAL_NEGATIVE_CLAIM'&&role(B,'PRINTED_II_CONJUGATES')?.modality==='LITERAL_SOURCE_FORMULA'&&role(B,'MODEL_III_CONJUGATES')?.modality==='INTERNAL_MATRIX_DEDUCTION','do not promote physical or extrapolated operator claims');
 need(role(B,'DIVISION_ALGEBRA_CITATION')?.modality==='SOURCE_NATIVE_CITATION_ONLY'&&role(B,'PROJECTIVE_SCOPE')?.modality==='SOURCE_MODALITY','cite and physical scope locks');
 const originals=table.table2.original_annihilation_source_rows_8;
 need(originals.length===8&&p.exact_model.source_table2_first_eight.length===8&&originals.every(x=>[x.omegaT2,x.omegaS2,x.h2,x.q2].every(v=>v===1||v===-1)),'source Table2 eight half-weight literal rows');
 const x=matrixEvidence(p.exact_model.sign_rows,originals,p.exact_model);
 need(eq(p.exact_model.source_table2_first_eight,x.reconstructed_source_rows)&&x.boost_equal===4&&x.boost_opposite===4,'4/4 Lorentz vs Euclidean boost carrier');
 need(x.triality_cubed&&x.triality_orthogonal&&eq(x.sets,[8,8,8])&&x.distinct===24&&x.returns_to_first&&x.first_even_half&&x.second_odd_half&&x.third_coordinate_axes&&x.norms_one,'exact 24-cell 8+8+8 geometry');
 need(x.edge_count===96&&x.per_vertex_degree.every(v=>v===8)&&eq(x.inter_edges,[32,32,32]),'full finite 24-cell geometric 96 edges');
 need(Object.values(x.operators).every(z=>Object.values(z).every(Boolean)),'transported second/third signed operator actions');
 need(p.exact_model.t_order===3&&p.exact_model.t_orthogonal===true&&p.exact_model.t_determinant===1&&p.exact_model.distinct_union===24&&p.exact_model.geometric_edges===96&&p.exact_model.each_vertex_geometric_degree===8,'packet model not drifted');
 need(eq(p.exact_model.intergeneration_geometry_edge_counts,[32,32,32]),'all intergen geometric edge counts');
 need(fig.vertices.length===24&&fig.edges.length===60&&eq(fig.incidence_summary.edge_palette,{red:12,green:12,blue:12,triality:24})&&fig.incidence_summary.triality_triplets===8,'preserve drawn figure original 60-label subset');
 need(p.exact_model.figure1_drawn_segments===60&&eq(p.exact_model.figure1_drawn_cube_segments,[12,12,12])&&p.exact_model.figure1_drawn_black_triality===24,'source drawing not full polytope skeleton');
 const before=oldCross.original_first_source_blocks,after=cross.original_first_source_blocks;
 need(before.length===109&&after.length===109&&before.every((x,j)=>x.atom_id===after[j]?.atom_id),'109 source atom identities conserved');
 const diffs=after.filter((z,j)=>!eq(z,before[j])).map(z=>z.atom_id);
 need(eq(diffs,['L04-P014-B001'])&&cross.original_p14_source_reciprocal_overlay.other_entire_108_original_atoms_unchanged===true,'one and only one B001 block source/SSC link repaired');
 const a=after.find(z=>z.atom_id==='L04-P014-B001'),b=before.find(z=>z.atom_id==='L04-P014-B001');
 need(eq(b.source_group_ids,['L04-S037','L04-S039'])&&eq(a.source_group_ids,['L04-S037','L04-S038','L04-S039','L04-S040'])&&eq(a.existing_SSC_owner_ids,['L-SSC-118','L-SSC-119','L-SSC-120']),'original reciprocal p14 B001 semantics');
 need(p.prior_sources.block_crosswalk.sha===H.oldCross&&cross.original_p14_source_reciprocal_overlay.predecessor.sha===H.oldCross&&a.source_semantics_added_in_successor.source_packet_git_blob_sha===H.p,'historical crosswalk immutable lineage');
 need(s.items.length===191&&s.item_count===191&&i.locations.length===53&&eq(changed(s.items,oldS.items),['L-SSC-119','L-SSC-120'])&&eq(changed(i.locations,oldI.locations),['L04-S038','L04-S040']),'189 SSC and 51 original L04 record conservation');
 need(i.counts.current_mapped_meaning_groups_source_cold_open===0&&Object.values(i.counts.by_disposition).reduce((z,v)=>z+v,0)===53&&new Set(i.locations.flatMap(z=>z.ssc_ids)).size===34,'source locations complete disposition, not global review');
 need(s.predecessor.git_blob_sha===H.oldS&&s.revision.source_packet.git_blob_sha===H.p&&s.revision.source_first_inverse.git_blob_sha===H.i&&s.revision.source_109_block_successor.git_blob_sha===H.cross,'source SSC sha-chain');
 need(i.current_original_p14_four_weight_and_triality.packet.git_blob_sha===H.p&&i.current_original_p14_four_weight_and_triality.original_109_block_successor.git_blob_sha===H.cross,'source inverse SHA chain');
 need(r.current_ssc.git_blob_sha===H.s&&r.per_source.find(z=>z.source==='L04').audit_git_blob_sha===H.i&&r.per_source.reduce((z,v)=>z+v.source_first_location_units,0)===350,'six frozen original sources denominator');
 need(r.per_source.every(z=>z.original_complete_cold_review_passed===false)&&t.complete_sources===0&&t.current_census.git_blob_sha===H.s&&t.current_L04_source_first_inventory.git_blob_sha===H.i&&t.current_G0_six_original_finite_convergence.git_blob_sha===H.r,'global whole-source review not invented');
 need(g.current_source_census.git_blob_sha===H.s&&g.current_L04_source_first.git_blob_sha===H.i&&g.current_convergence.git_blob_sha===H.r&&g.current_traversal.git_blob_sha===H.t&&g.current_L04_S038_S040_source_packet.git_blob_sha===H.p,'current stage SHA exact pointer graph');
 need(g.predecessor_gate.prior_scoped_original_CI_run===38212524368&&g.predecessor_gate.prior_original_failed_CI_run===38212309646&&g.new_source_CI.run_id===null,'prior passing and failed source CI conserved');
 need(g.current_lawful_state.G0_frozen===false&&g.current_lawful_state.G0_SSC_complete===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.W_semantics_imported===false&&g.current_lawful_state.cross_track_synthesis_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'never bypass authority, track, merge');
 return failures;
}
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-L04-p14-'));const pages=new Map();let bytesVerified=false;
try{const resp=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(65000)});if(!resp.ok)throw Error('OFFICIAL_PDF_HTTP_'+resp.status);
 const buf=Buffer.from(await resp.arrayBuffer());if(buf.length!==348134||sha(buf)!==D.p.frozen_source.SHA256)throw Error('ORIGINAL_PDF_SHA_MISMATCH');bytesVerified=true;
 const fn=path.join(tmp,'L04.pdf');fs.writeFileSync(fn,buf);
 if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[fn],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_17_PAGE_FAIL');
 for(const page of [8,13])pages.set(page,execFileSync('pdftotext',['-f',String(page+1),'-l',String(page+1),'-layout','-enc','UTF-8',fn,'-'],{encoding:'utf8',timeout:15000}));
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
const errors=check(D,pages);
const mutants=[
['corrupt_frozen_pdf',z=>z.p.frozen_source.SHA256='BAD'],
['corrupt_source_p14_page',z=>z.p.frozen_source.original_atoms[1].page_sha256='BAD'],
['corrupt_source_p9_page',z=>z.p.frozen_source.original_atoms[0].page_sha256='BAD'],
['corrupt_p14_B001',z=>z.p.frozen_source.original_atoms[1].block_sha256='BAD'],
['corrupt_p14_B002',z=>z.p.frozen_source.original_atoms[2].block_sha256='BAD'],
['corrupt_p14_B003',z=>z.p.frozen_source.original_atoms[3].block_sha256='BAD'],
['erase_original_role',z=>z.p.groups[0].roles.pop()],
['erase_second_group',z=>z.p.groups.pop()],
['mislabel_Euclidean_coord',z=>z.p.groups[0].roles.find(x=>x.id==='EUCLIDEAN_BOOST').modality='PHYSICAL_PROOF'],
['mislabel_negative_Lorentz_claim',z=>z.p.groups[1].roles.find(x=>x.id==='NO_DIRECT_LORENTZ').modality='PHYSICAL_SAME'],
['promote_third_inference_to_printed',z=>z.p.groups[1].roles.find(x=>x.id==='MODEL_III_CONJUGATES').modality='LITERAL_SOURCE_FORMULA'],
['claim_cross_source_import',z=>z.p.groups[1].roles.find(x=>x.id==='DIVISION_ALGEBRA_CITATION').modality='SOURCE_PROOF'],
['break_triality_matrix_source',z=>z.p.exact_model.sign_rows[0]='+--+'],
['break_first_gen_charge_conjugation',z=>z.p.exact_model.CPT_signs.C_I='++++'],
['rewrite_table2_lorentz',z=>z.table.table2.original_annihilation_source_rows_8[4].omegaT2=1],
['rewrite_packet_Euclidean',z=>z.p.exact_model.source_table2_first_eight[4].omegat_Euclidean_twice=-1],
['false_claim_torder2',z=>z.p.exact_model.t_order=2],
['false_full_24_set',z=>z.p.exact_model.distinct_union=23],
['fake_geometric_edges60',z=>z.p.exact_model.geometric_edges=60],
['fake_geometric_interfamily',z=>z.p.exact_model.intergeneration_geometry_edge_counts=[24,24,24]],
['fake_fig_96_drawn',z=>z.p.exact_model.figure1_drawn_segments=96],
['fake_original_fig60_to96',z=>z.fig.incidence_summary.edges=96],
['break_historical_matrix_sha',z=>z.p.prior_sources.triality.sha='BAD'],
['break_source_figure_sha',z=>z.p.prior_sources.figure1.sha='BAD'],
['break_historical_crosswalk_sha',z=>z.p.prior_sources.block_crosswalk.sha='BAD'],
['erase_crosswalk_B001_S038',z=>z.cross.original_first_source_blocks.find(x=>x.atom_id==='L04-P014-B001').source_group_ids=z.cross.original_first_source_blocks.find(x=>x.atom_id==='L04-P014-B001').source_group_ids.filter(v=>v!=='L04-S038')],
['erase_crosswalk_B001_S040',z=>z.cross.original_first_source_blocks.find(x=>x.atom_id==='L04-P014-B001').source_group_ids=z.cross.original_first_source_blocks.find(x=>x.atom_id==='L04-P014-B001').source_group_ids.filter(v=>v!=='L04-S040')],
['mutate_unrelated_crosswalk_block',z=>z.cross.original_first_source_blocks.find(x=>x.atom_id==='L04-P014-B002').source_first_role='BAD'],
['mutate_unrelated_ssc',z=>z.s.items.find(x=>x.id==='L-SSC-118').body+='BAD'],
['mutate_unrelated_L04_location',z=>z.i.locations.find(x=>x.id==='L04-S037').disposition='BAD'],
['undispose_S038',z=>z.i.locations.find(x=>x.id==='L04-S038').disposition='MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS'],
['hide_cold_status',z=>z.r.per_source.find(x=>x.source==='L04').original_complete_cold_review_passed=true],
['invent_new_ssc_id',z=>z.s.items.push({id:'L-SSC-192'})],
['erase_source_inv_pointer',z=>z.g.current_L04_source_first.git_blob_sha='BAD'],
['erase_traversal_pointer',z=>z.g.current_traversal.git_blob_sha='BAD'],
['erase_historical_failed_CI',z=>z.g.predecessor_gate.prior_original_failed_CI_run=0],
['fake_original_CI_qualification',z=>z.g.new_source_CI.run_id=100],
['illicit_G1',z=>z.g.current_lawful_state.G1_authorized=true],
['illicit_W_import',z=>z.g.current_lawful_state.W_semantics_imported=true],
['illicit_merge',z=>z.g.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;if(!errors.length)for(const [name,mutate] of mutants){const z=structuredClone(D);try{mutate(z);const issues=check(z,pages);if(issues.length)rejected++;else errors.push('HOSTILE_ESCAPE_'+name)}catch(e){errors.push('HOSTILE_CHECKER_EXCEPTION_'+name+':'+String(e))}}
console.log(JSON.stringify({schema:'isograph.exp062.L04.p14.24cell-source.v0.1',PASS:errors.length===0,errors,original_pdf_SHA256_verified:bytesVerified,source_pages_verified:pages.size,source_blocks_verified:4,source_roles:19,SSC_IDs:191,L_source_groups:350,L04_broad_mapping_only_remaining:0,exact_24cell_vertices:24,mathematical_full_24cell_edges:96,original_figure_drawn_segments:60,hostiles_defined:mutants.length,hostiles_rejected:rejected,whole_original_semantic_cold_complete:0,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));
if(errors.length)process.exitCode=1;