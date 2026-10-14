// L-only G0: original frozen L04 printed p9 Table2 narrative + p5 Table1 source-first review.
// Source fidelity, not G0 freeze, full-paper cold proof, physics, W-track synthesis or PR merge.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 p:P+'LISI_L04_ORIGINAL_P9_WEIGHT_MATCHING_EIGHT_PAIRS_G0_0_1.json',
 m:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',
 table:P+'LISI_L04_TABLE1_TABLE2_AND_FIGURES_COLD_G0_0_1.json',
 s0:P+'SOURCE_SEMANTIC_CENSUS_0_89.json',
 s:P+'SOURCE_SEMANTIC_CENSUS_0_90.json',
 i0:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_22.json',
 i:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_23.json',
 r:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_45.json',
 t:P+'SOURCE_TRAVERSAL_LEDGER_0_62.json',
 g0:E+'L_CURRENT_STAGE_GATE_0_167.json',
 g:E+'L_CURRENT_STAGE_GATE_0_168.json'
};
const j=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const D=Object.fromEntries(Object.entries(F).map(([k,f])=>[k,j(f)]));
const H=Object.fromEntries(Object.entries(F).map(([k,f])=>[k,execFileSync('git',['hash-object',f],{encoding:'utf8'}).trim()]));
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const diff=(a,b)=>a.filter((x,n)=>!eq(x,b[n])).map(x=>x.id);
const order=['omegaT2','omegaS2','h2','q2'];
const w=x=>Object.fromEntries(order.map(k=>[k,x[k]]));
const vec=x=>order.map(k=>x[k]).join(',');
const TABLE_SHA='b19b6c2ecc6678121b4ec865334f5f8a358a90b6';
function evidence(t){
 const errors=[],A=t?.table2?.original_annihilation_source_rows_8,C=t?.table2?.original_creation_source_rows_8,
  W=t?.table1?.source_sign_pair_instances_12;
 if(!Array.isArray(A)||!Array.isArray(C)||!Array.isArray(W)||A.length!==8||C.length!==8||W.length!==12)return{errors:['TABLE_SHAPE'],pairs:[],table1:[]};
 if(new Set(A.map(x=>x.source_row_id)).size!==8||new Set(C.map(x=>x.source_row_id)).size!==8)errors.push('TABLE_ROW_ID_UNIQUENESS');
 const h=A.concat(C).filter(x=>x.h2!==x.omegaT2*x.omegaS2);if(h.length)errors.push('SOURCE_HELICITY_FORMULA');
 for(const c of C){const a=A.find(x=>x.source_row_id===c.source_annihilation_correspondent_id);if(!a||c.omegaT2!==a.omegaT2||c.omegaS2!==-a.omegaS2||c.h2!==-a.h2||c.q2!==-a.q2)errors.push('SOURCE_CREATION_SIGN_'+c.source_row_id)}
 const pairs=[];
 for(const a of A){const xs=C.filter(c=>vec(c)===vec(a));if(xs.length!==1||xs[0].family===a.family){errors.push('CROSS_FAMILY_MATCH_'+a.source_row_id);continue}pairs.push({annihilation_row_id:a.source_row_id,annihilation_symbol:a.symbol,creation_row_id:xs[0].source_row_id,creation_symbol:xs[0].symbol,weight_twice:w(a),operator_identity_asserted:false})}
 const sourceBranches=['T1-R05-PLUS','T1-R05-MINUS','T1-R06-PLUS','T1-R06-MINUS','T1-R05-PLUS','T1-R05-MINUS','T1-R06-PLUS','T1-R06-MINUS'];
 const t1=[];
 A.forEach((a,n)=>{const t=W.find(x=>x.id===sourceBranches[n]);if(!t||a.omegaT2!==2*t.omegaT||a.omegaS2!==2*t.omegaS){errors.push('TABLE1_SPINOR_BRANCH_'+a.source_row_id);return}t1.push({annihilation_row_id:a.source_row_id,source_Table1_branch_id:t.id,omegaT2:a.omegaT2,omegaS2:a.omegaS2,kind:'SOURCE_REPRESENTATION_WEIGHT_CORRESPONDENCE_NOT_FIELD_IDENTITY'})});
 return{errors,pairs,table1:t1,hel:16,sign:8,matched:8,spin:8};
}
function check(d,original){
 const {p,m,table,s0,s,i0,i,r,t,g0,g}=d,issues=[],need=(x,n)=>{if(!x)issues.push(n)};
 const L04=m?.original_sources?.find(x=>x.id==='L04'),p5=L04?.original_pdf_extracted_pages?.[4],p9=L04?.original_pdf_extracted_pages?.[8];
 need(p?.schema==='isograph.track-L.G0.L04-original-p9-weight-matching-and-Table1-correspondence.v0.1'&&p.track==='L'&&p.stage==='G0'&&!p.semantic_authority,'SOURCE_SCOPE');
 need(L04?.PDF_SHA256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422'&&p?.primary_original?.PDF_SHA256===L04?.PDF_SHA256&&p.primary_original?.PDF_bytes===348134&&p.primary_original?.pages===17,'FROZEN_ORIGINAL');
 need(p?.primary_original?.page9_extracted_SHA256===p9?.original_extracted_page_SHA256&&p?.primary_original?.page5_extracted_SHA256===p5?.original_extracted_page_SHA256,'ORIGINAL_PAGE_SHA_BINDINGS');
 need(original?.[8]&&digest(Buffer.from(original[8]))===p.primary_original.page9_extracted_SHA256,'FRESH_P9_PAGE_SHA');
 need(original?.[4]&&digest(Buffer.from(original[4]))===p.primary_original.page5_extracted_SHA256,'FRESH_P5_PAGE_SHA');
 const lines=original?.[8]?.replaceAll('\r','').replace(/\f+$/g,'').split('\n')||[];
 need(p?.primary_original?.p9_original_source_blocks?.length===4&&eq(p.primary_original.p9_original_source_blocks.map(x=>x.id),['L04-P009-B003','L04-P009-B004','L04-P009-B005','L04-P009-B006']),'P9_ATOM_SET');
 for(const anchor of p?.primary_original?.p9_original_source_blocks||[]){const x=p9?.blocks?.find(z=>z.source_atom_id===anchor.id);need(x?.original_source_block_SHA256===anchor.original_source_block_SHA256&&eq([x?.original_extracted_line_start,x?.original_extracted_line_end],anchor.original_extracted_line_range),'MANIFEST_ANCHOR_'+anchor.id);if(x)need(digest(Buffer.from(lines.slice(x.original_extracted_line_start-1,x.original_extracted_line_end).join('\n')))===anchor.original_source_block_SHA256,'FRESH_SOURCE_BLOCK_'+anchor.id)}
 const prose=(original?.[8]||'').toLowerCase().replace(/\s+/g,' ');
 need(prose.includes('helicity quantum number')&&prose.includes('weight match')&&prose.includes('corresponding annihilation')&&prose.includes('whatever internal charge')&&prose.includes('table 1'),'AUTHOR_P9_PROSE_SCOPE');
 need(H.table===TABLE_SHA&&p?.historical_qualified_table_source?.git_blob_sha===H.table&&p.historical_qualified_table_source.original_numeric_cell_count===64,'HISTORICAL_TABLE2_EXACT_SHA');
 need(table?.original_source?.exact_official_PDF_SHA256===L04?.PDF_SHA256&&table?.table2?.source_id==='L04-S019','HISTORICAL_TABLE2_SOURCE_IDENTITY');
 const e=evidence(table);
 need(e.errors.length===0,'RECOMPUTED_TABLE_'+e.errors.join(','));
 need(eq(e.pairs,p?.recomputed_finite_table_witness?.annihilation_to_creation_weight_matches)&&e.pairs.length===8,'EXACT_EIGHT_UNIQUE_MATCHES');
 need(eq(e.table1,p?.recomputed_finite_table_witness?.source_Table1_spinor_branches)&&e.table1.length===8,'EIGHT_TABLE1_SPINOR_CROSS_LINKS');
 need(p?.recomputed_finite_table_witness?.all_helicity_h2_equals_omegaT2_times_omegaS2_count===16&&p.recomputed_finite_table_witness.all_corresponding_creation_sign_rules_count===8,'HELICITY_16_CREATION_8');
 need(p?.recomputed_finite_table_witness?.annihilation_to_opposite_creation_unique_matches_count===8&&p.recomputed_finite_table_witness.all_8_Table1_spin_boost_correspondences_count===8,'PAIR_8_SPINOR_8_COUNTS');
 const example=e.pairs.find(x=>x.annihilation_row_id==='T2-A04'),show=p?.recomputed_finite_table_witness?.printed_example;
 need(show?.annihilation_row_id==='T2-A04'&&show?.creation_row_id==='T2-C05'&&show?.relation_kind==='EQUALITY_OF_WEIGHTS_IN_SOURCE_CONTEXT_NOT_PHYSICAL_OPERATOR_EQUALITY'&&eq(show?.values_twice,example?.weight_twice),'AUTHOR_PRINTED_EXAMPLE_WEIGHT_ONLY');
 need(p?.source_first?.original_group==='L04-S020'&&eq(p.source_first.current_existing_ssc_owners,['L-SSC-099','L-SSC-102','L-SSC-103'])&&p.source_first.roles?.length===7,'SEVEN_ROLES_EXACT_OWNERS');
 need(p.source_first.roles?.every(z=>p.source_first.current_existing_ssc_owners.includes(z.owner)&&z.kind&&z.body),'SOURCE_ROLE_BINDERS');
 need(p.source_first.roles?.find(x=>x.role==='SOURCE_Q_INTERNAL_LABEL')?.kind==='ORIGINAL_SOURCE_SCOPE_RESTRICTION'&&p.source_first.roles?.find(x=>x.role==='PRINTED_EQUALITY_WEIGHT_CONTEXT')?.kind==='PRINTED_SOURCE_EQUALS_SIGN_WITH_WEIGHTS_ONLY','Q_MODALITY_AND_EQUALS_MODALITY');
 need(s?.items?.length===191&&s.item_count===191&&i?.locations?.length===53&&i0?.locations?.length===53,'SSC_191_LOC_53');
 need(eq(diff(s.items,s0.items),['L-SSC-103'])&&eq(diff(i.locations,i0.locations),['L04-S020']),'190_WHOLE_SSC_52_WHOLE_GROUP_CONSERVATION');
 need(eq(i.locations.find(x=>x.id==='L04-S020')?.ssc_ids,['L-SSC-099','L-SSC-102','L-SSC-103'])&&new Set(i.locations.flatMap(z=>z.ssc_ids)).size===34,'TWO_RECIPROCAL_EXISTING_SSC_OWNER_LINKS');
 need(i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===10&&Object.values(i.counts.by_disposition).reduce((sum,z)=>sum+z,0)===53,'OPEN_10_SOURCE_53_GROUPS');
 need(s.items.find(x=>x.id==='L-SSC-103')?.body.includes('EQUALITY')===false || s.items.find(x=>x.id==='L-SSC-103')?.body.includes('identity'),'SOURCE_WORDING_DIVERGENCE_CONTROL');
 need(s.items.find(x=>x.id==='L-SSC-103')?.body.includes('operator')&&s.items.find(x=>x.id==='L-SSC-103')?.body.includes('NOT')&&s.items.find(x=>x.id==='L-SSC-103')?.body.includes('h=p_z s_z'),'CENSUS_OPERATOR_GUARD_HELICITY');
 need(p?.predecessor?.SSC?.git_blob_sha===H.s0&&p?.predecessor?.source_first?.git_blob_sha===H.i0&&s?.predecessor?.git_blob_sha===H.s0,'PINNED_PREDECESSOR_SSC');
 need(s?.revision?.source_packet?.git_blob_sha===H.p&&s?.revision?.source_first_inverse?.git_blob_sha===H.i&&i?.current_p9_S020_weight_cross_table?.packet?.git_blob_sha===H.p,'PINNED_SOURCE_INVERSE');
 need(r?.current_ssc?.git_blob_sha===H.s&&r?.per_source?.find(x=>x.source==='L04')?.audit_git_blob_sha===H.i&&r?.per_source?.reduce((sum,x)=>sum+x.source_first_location_units,0)===350,'CURRENT_CONVERGENCE_350');
 need(r?.per_source?.every(x=>x.original_complete_cold_review_passed===false),'SIX_WHOLE_ORIGINAL_PAPERS_COLD_OPEN');
 need(t?.current_census?.git_blob_sha===H.s&&t?.current_L04_source_first_inventory?.git_blob_sha===H.i&&t?.current_G0_six_original_finite_convergence?.git_blob_sha===H.r&&t?.complete_sources===0,'TRAVERSAL_EXACT_SHA_NOT_FROZEN');
 need(g?.current_source_census?.git_blob_sha===H.s&&g?.current_L04_source_first?.git_blob_sha===H.i&&g?.current_convergence?.git_blob_sha===H.r&&g?.current_traversal?.git_blob_sha===H.t,'CURRENT_GATE_SHA_TUPLE');
 need(g?.predecessor_gate?.git_blob_sha===H.g0&&g?.predecessor_gate?.prior_vector_scoped_original_success_run===38185223742&&g?.predecessor_gate?.prior_vector_scoped_original_failed_run===38185057415,'HISTORICAL_CI_PRESERVED');
 need(g0?.new_source_CI?.run_id===38185223742&&g0.new_source_CI.previous_failed_run_id===38185057415&&g?.new_source_CI?.run_id===null,'PRESERVE_CI_FAILURE_NEW_CI_NOT_FABRICATED');
 need(g?.current_lawful_state?.G0_frozen===false&&g.current_lawful_state.G1_authorized===false&&g.current_lawful_state.W_semantics_imported===false&&g.current_lawful_state.cross_track_synthesis_authorized===false&&g.current_lawful_state.PR70_merge_authorized===false,'TRACK_AND_GATE_FIREWALL');
 need(p?.locks?.G0_frozen===false&&p.locks.G1_authorized===false&&p.locks.PR70_merge_authorized===false&&p.evidence_boundary.whole_original_cold_complete===false,'PACKET_NO_PROMOTION');
 return issues;
}
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-l-g0-p9-'));
const pages={};let pdfPass=false;
try{const resp=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(65000)});if(!resp.ok)throw Error('FROZEN_PDF_HTTP_'+resp.status);
 const buf=Buffer.from(await resp.arrayBuffer());if(buf.length!==348134||digest(buf)!==D.p.primary_original.PDF_SHA256)throw Error('ORIGINAL_FROZEN_SOURCE_BYTES_CHANGED');pdfPass=true;
 const file=path.join(temp,'l04v2.pdf');fs.writeFileSync(file,buf);if(!/^Pages:\s*17$/m.test(execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000})))throw Error('ORIGINAL_PAGE_COUNT');
 for(const p of [4,8])pages[p]=execFileSync('pdftotext',['-f',String(p+1),'-l',String(p+1),'-layout','-enc','UTF-8',file,'-'],{encoding:'utf8',timeout:15000});
}finally{fs.rmSync(temp,{recursive:true,force:true})}
const errors=check(D,pages);
const mutators=[
['wrong_pdf_sha',x=>x.p.primary_original.PDF_SHA256='BAD'],
['wrong_p9_sha',x=>x.p.primary_original.page9_extracted_SHA256='BAD'],
['wrong_p5_sha',x=>x.p.primary_original.page5_extracted_SHA256='BAD'],
['wrong_source_atom_sha',x=>x.p.primary_original.p9_original_source_blocks[3].original_source_block_SHA256='BAD'],
['drop_table_atom',x=>x.p.primary_original.p9_original_source_blocks.pop()],
['wrong_table2_blob',x=>x.p.historical_qualified_table_source.git_blob_sha='BAD'],
['mutate_original_table2_q',x=>x.table.table2.original_annihilation_source_rows_8[0].q2=-1],
['mutate_original_table2_spin',x=>x.table.table2.original_creation_source_rows_8[5].omegaS2=-1],
['mutate_original_table1_boost',x=>x.table.table1.source_sign_pair_instances_12.find(z=>z.id==='T1-R05-PLUS').omegaT=0],
['duplicate_source_row',x=>x.table.table2.original_creation_source_rows_8[1].source_row_id='T2-C01'],
['falsify_pair_count',x=>x.p.recomputed_finite_table_witness.annihilation_to_opposite_creation_unique_matches_count=7],
['invert_cross_family_match',x=>x.p.recomputed_finite_table_witness.annihilation_to_creation_weight_matches[0].creation_row_id='T2-C07'],
['equate_distinct_fock_operators',x=>x.p.recomputed_finite_table_witness.printed_example.relation_kind='PHYSICAL_OPERATOR_IDENTITY'],
['falsify_source_example',x=>x.p.recomputed_finite_table_witness.printed_example.creation_row_id='T2-C03'],
['falsify_table1_link',x=>x.p.recomputed_finite_table_witness.source_Table1_spinor_branches[0].source_Table1_branch_id='T1-R06-PLUS'],
['delete_source_role',x=>x.p.source_first.roles.pop()],
['claim_universal_charge',x=>x.p.source_first.roles.find(z=>z.role==='SOURCE_Q_INTERNAL_LABEL').kind='UNIVERSAL_ELECTRIC_CHARGE_THEOREM'],
['change_weight_context_modality',x=>x.p.source_first.roles.find(z=>z.role==='PRINTED_EQUALITY_WEIGHT_CONTEXT').kind='PHYSICAL_OPERATOR_EQUALITY'],
['remove_p9_099_reverse_owner',x=>x.i.locations.find(z=>z.id==='L04-S020').ssc_ids.shift()],
['remove_p9_102_reverse_owner',x=>x.i.locations.find(z=>z.id==='L04-S020').ssc_ids.splice(1,1)],
['mutate_unrelated_SSC',x=>x.s.items.find(z=>z.id==='L-SSC-115').body='CORRUPT'],
['mutate_unrelated_L04',x=>x.i.locations.find(z=>z.id==='L04-S028').disposition='CORRUPT'],
['forge_complete_L04',x=>x.i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
['forge_new_SSC',x=>x.s.items.push({id:'L-SSC-192'})],
['break_predecessor_sha',x=>x.p.predecessor.SSC.git_blob_sha='BAD'],
['break_current_ssc_sha',x=>x.r.current_ssc.git_blob_sha='BAD'],
['break_current_inv_sha',x=>x.t.current_L04_source_first_inventory.git_blob_sha='BAD'],
['break_stage_sha',x=>x.g.current_traversal.git_blob_sha='BAD'],
['erase_historical_failed_CI',x=>x.g.predecessor_gate.prior_vector_scoped_original_failed_run=0],
['invent_ci_pass',x=>x.g.new_source_CI.run_id=1234],
['promote_full_source',x=>x.r.per_source.find(z=>z.source==='L04').original_complete_cold_review_passed=true],
['premature_G1',x=>x.g.current_lawful_state.G1_authorized=true],
['import_W',x=>x.g.current_lawful_state.W_semantics_imported=true],
['authorize_merge',x=>x.g.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;if(!errors.length)for(const [id,mut] of mutators){const v=structuredClone(D);try{mut(v);if(check(v,pages).length)rejected++;else errors.push('HOSTILE_ESCAPE_'+id)}catch(e){errors.push('HOSTILE_CHECKER_EXCEPTION_'+id+':'+e.message)}}
const report={schema:'isograph.exp062.L04-S020.original-p9-weight-match.v0.1',PASS:errors.length===0,errors,original_PDF_sha256_verified:pdfPass,original_source_pages_verified:2,source_p9_blocks_sha_verified:4,source_Table2_rows:16,helicity_rows_verified:16,source_creation_sign_pairs_verified:8,unique_cross_family_weight_matches:8,Table1_spinor_comparisons:8,SSC_items:191,source_location_groups:350,changed_existing_SSC:['L-SSC-103'],changed_existing_source_groups:['L04-S020'],remaining_broad_mapped_L04_groups:10,hostiles_defined:mutators.length,hostiles_rejected:rejected,whole_source_cold_passes:0,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
