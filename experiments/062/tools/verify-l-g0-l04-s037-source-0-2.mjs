// IsoGraph L-only G0, S037: original frozen PDF + exact internal finite carrier.
// 0.2: first CI 38212309646 FAILED baseline source-packet ±1 shorthand oracle, 0/33 hostiles executed.
// Guard the exact unchanged source packet Z2={1,-1}; other checks and source/SSC semantics unaltered.
// No author mathematical defect or group generator ID proved. G0 remains unfrozen.
import fs from 'node:fs';import crypto from 'node:crypto';import os from 'node:os';import path from 'node:path';import {execFileSync as exec} from 'node:child_process';
import {auditL04S037} from './l04-s037-2T-D4-center-model-0-1.mjs';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={p:P+'LISI_L04_ORIGINAL_P13_P14_CENTRAL_PRODUCT_SOURCE_G0_0_1.json',m:P+'L_G0_SIX_FROZEN_ORIGINAL_LAYOUT_SOURCE_FIRST_MANIFEST_0_1.json',s0:P+'SOURCE_SEMANTIC_CENSUS_0_94.json',s:P+'SOURCE_SEMANTIC_CENSUS_0_95.json',i0:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_27.json',i:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_28.json',r:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_50.json',t:P+'SOURCE_TRAVERSAL_LEDGER_0_67.json',g:E+'L_CURRENT_STAGE_GATE_0_180.json'};
const data=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,JSON.parse(fs.readFileSync(v,'utf8'))]));
const hashes=Object.fromEntries(Object.entries(F).map(([k,v])=>[k,exec('git',['hash-object',v],{encoding:'utf8'}).trim()]));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const delta=(a,b)=>a.filter((x,i)=>!eq(x,b[i])).map(x=>x.id);
const model=auditL04S037();
function check(d,pg){
 const bad=[],need=(v,k)=>{if(!v)bad.push(k)};
 const {p,m,s0,s,i0,i,r,t,g}=d;
 const src=m.original_sources.find(x=>x.id==='L04'),atoms=p?.frozen_original?.atoms;
 need(p?.schema==='isograph.track-L.G0.L04-S037-original-p13-p14-central-product-source.v0.1'&&p.stage==='G0'&&p.track==='L'&&!p.semantic_authority,'L-only source scope');
 need(p.frozen_original.PDF_SHA256===src.PDF_SHA256&&p.frozen_original.PDF_SHA256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422'&&p.frozen_original.bytes===348134,'frozen binary provenance');
 need(atoms?.length===3&&eq(atoms?.map(x=>x.id),['L04-P013-B005','L04-P013-B008','L04-P014-B001']),'exact original source blocks');
 for(const a of atoms??[]){
 const sourcepg=src.original_pdf_extracted_pages.find(x=>x.PDF_page_zero_based===a.page_zero_based),b=sourcepg?.blocks.find(x=>x.source_atom_id===a.id),raw=pg.get(a.page_zero_based);
 need(sourcepg?.original_extracted_page_SHA256===a.page_SHA256&&b?.original_source_block_SHA256===a.atom_SHA256&&eq(a.text_lines,[b?.original_extracted_line_start,b?.original_extracted_line_end]),'original source atom index '+a.id);
 need(typeof raw==='string'&&sha(Buffer.from(raw))===a.page_SHA256,'original page SHA '+a.id);
 if(typeof raw==='string'&&b){const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');need(sha(Buffer.from(lines.slice(b.original_extracted_line_start-1,b.original_extracted_line_end).join('\n')))===a.atom_SHA256,'original atom SHA '+a.id);}
 }
 const roles=p?.original_source_roles??[],role=id=>roles.find(x=>x.id===id);
 need(roles.length===17&&roles.every(x=>x.id&&x.owner&&x.modality&&x.meaning&&['L-SSC-117','L-SSC-118'].includes(x.owner)),'all 17 provenance roles');
 need(role('2T_INCLUDES_K')?.modality==='AUTHOR_SOURCE_INCLUSION_UNRESOLVED'&&role('2T_INCLUDES_K')?.meaning.includes('includes K')&&role('PT_GENERATES_Q8')?.modality==='AUTHOR_GENERATED_SUBGROUP_CLAIM','literal author K-in-2T and P/T Q8');
 need(role('K_ANTICOMMUTES_C')?.modality==='AUTHOR_TYPED_OPERATOR_RELATION'&&role('K_COMMUTES_t')?.modality==='AUTHOR_TYPED_OPERATOR_RELATION','K source relation direction');
 need(role('D4_EXACT_ELEMENTS')?.meaning.includes('±K')&&role('COMMON_Z2')?.meaning.includes('Z2={1,-1}')&&role('NORMAL_SUBGROUPS')?.modality==='AUTHOR_NORMALITY_ASSERTION','exact original D4 and common center');
 need(role('GAP_ID_96_202')?.meaning.includes('[96,202]')&&role('UNIQUE_231')?.meaning.includes('231'),'author GAP ID and claimed count');
 need(p.conditional_obstruction?.premises_same_faithful_carrier?.length===4&&!p.conditional_obstruction.source_defect_established&&!p.conditional_obstruction.fix_promoted&&p.conditional_obstruction.distinct_shared_factor_obstruction.includes('at least 4'),'unresolved same-carrier conditional obstruction only');
 need(p.independent_non_author_context?.authority_for_original_source_semantics===false&&p.independent_non_author_context.url.includes('GroupNames/73/D4.A4.html'),'external math source not imported as author semantics');
 const v=p.finite_exact_model?.expected;
 const expected={quaternion_2T_order:v?.H_2T_order,quaternion_2T_center:v?.H_center_order,D4_order:v?.D4_order,D4_center:v?.D4_center_order,central_product_order:v?.central_product_order,central_product_center:v?.central_product_center_order,derived_subgroup_order:v?.derived_order,image_2T_order:v?.H_image_order,image_D4_order:v?.D4_image_order,image_intersection_order:v?.H_D4_intersection_order};
 need(Object.entries(expected).every(([k,w])=>model[k]===w),'exact rational quaternion / D4 / central product');
 need(model.group_sizes.PT===v?.generated_PT_order&&model.group_sizes.PTt===v?.generated_PTt_order&&model.group_sizes.CPTt===v?.generated_CPTt_order,'source-adjacent typed generators orders8/48/96');
 need(model.pure_quaternion_Q8_order===v?.pure_quaternion_Q8_order&&model.PT_generated_Q8_order===v?.generated_PT_Q8_order&&model.Q8_embeddings_equal===v?.Q8_embeddings_equal&&model.pure_Q8_normal===v?.pure_Q8_normal&&model.PT_Q8_normal===v?.generated_PT_Q8_normal,'Q8 identity versus isomorphism / normality');
 need(model.K_in_quaternion_2T===v?.K_in_H&&model.K_in_D4===v?.K_in_D4&&model.K_commutes_P===v?.K_commutes_P&&model.K_commutes_T===v?.K_commutes_T&&model.K_commutes_t===v?.K_commutes_t&&model.K_anticommutes_C===v?.K_anticommutes_C,'typed K memberships/relations');
 need(model.model_representation_isomorphic_to_GAP_ID_96_202_proved===false&&!model.physical_realization_proved&&p.finite_exact_model?.limitations?.length===4,'no GAP/physics authority');
 need(s.items?.length===191&&i.locations?.length===53&&eq(delta(s.items,s0.items),['L-SSC-118'])&&eq(delta(i.locations,i0.locations),['L04-S037']),'190 SSC and 52 source groups preserved');
 need(eq(i.locations.find(x=>x.id==='L04-S037')?.ssc_ids,['L-SSC-117','L-SSC-118'])&&new Set(i.locations.flatMap(x=>x.ssc_ids)).size===34,'S037 existing owner links');
 need(i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS===2&&Object.values(i.counts.by_disposition).reduce((a,b)=>a+b,0)===53,'two broad mapped L04 S038/S040 open');
 need(s.predecessor.git_blob_sha===hashes.s0&&s.revision.source_packet.git_blob_sha===hashes.p&&s.revision.source_first_inverse.git_blob_sha===hashes.i,'census SHA predecessors');
 need(r.current_ssc.git_blob_sha===hashes.s&&r.per_source.find(x=>x.source==='L04').audit_git_blob_sha===hashes.i&&r.per_source.reduce((a,b)=>a+b.source_first_location_units,0)===350&&r.per_source.every(x=>!x.original_complete_cold_review_passed),'350 sources/zero full cold complete');
 need(i.current_original_S037_2T_D4_center_source.packet.git_blob_sha===hashes.p&&t.current_census.git_blob_sha===hashes.s&&t.current_L04_source_first_inventory.git_blob_sha===hashes.i&&t.current_G0_six_original_finite_convergence.git_blob_sha===hashes.r&&t.complete_sources===0,'inverse/traversal SHA graph');
 need(g.current_source_census.git_blob_sha===hashes.s&&g.current_L04_source_first.git_blob_sha===hashes.i&&g.current_convergence.git_blob_sha===hashes.r&&g.current_traversal.git_blob_sha===hashes.t&&g.current_L04_S037_original_center_product.packet.git_blob_sha===hashes.p,'exact current stage SHA graph');
 need(g.predecessor_gate.prior_failed_S036_original_CI===38207941810&&g.predecessor_gate.prior_successful_S036_original_CI===38208109739&&g.new_source_CI.run_id===null,'historical failure not reclassified / current CI not invented');
 need(!g.current_lawful_state.G0_frozen&&!g.current_lawful_state.G1_authorized&&!g.current_lawful_state.W_semantics_imported&&!g.current_lawful_state.cross_track_synthesis_authorized&&!g.current_lawful_state.PR70_merge_authorized,'stage + cross-track + PR locks');
 return bad;
}
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'iso-L-S037-')),pages=new Map();let fullBinary=false;
try{const response=await fetch('https://arxiv.org/pdf/2407.02497v2',{signal:AbortSignal.timeout(65000)});if(!response.ok)throw Error('frozen source HTTP '+response.status);const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length!==348134||sha(bytes)!==data.p.frozen_original.PDF_SHA256)throw Error('original PDF bytes/hash changed');fullBinary=true;const f=path.join(tmp,'source.pdf');fs.writeFileSync(f,bytes);if(!/^Pages:\s*17$/m.test(exec('pdfinfo',[f],{encoding:'utf8',timeout:12000})))throw Error('source PDF pages!=17');for(const i of [12,13])pages.set(i,exec('pdftotext',['-f',String(i+1),'-l',String(i+1),'-layout','-enc','UTF-8',f,'-'],{encoding:'utf8',timeout:16000}));}finally{fs.rmSync(tmp,{recursive:true,force:true})}
const errors=check(data,pages);
const controls=[
 ['original_pdf',x=>x.p.frozen_original.PDF_SHA256='BAD'],
 ['original_atom',x=>x.p.frozen_original.atoms[0].atom_SHA256='BAD'],
 ['erase_atom',x=>x.p.frozen_original.atoms.pop()],
 ['erase_role',x=>x.p.original_source_roles.pop()],
 ['erase_K_2T',x=>x.p.original_source_roles.find(y=>y.id==='2T_INCLUDES_K').meaning='K excluded'],
 ['relabel_K_2T',x=>x.p.original_source_roles.find(y=>y.id==='2T_INCLUDES_K').modality='PROVEN'],
 ['K_anticonj',x=>x.p.original_source_roles.find(y=>y.id==='K_ANTICOMMUTES_C').modality='UNPROVEN'],
 ['D4_set',x=>x.p.original_source_roles.find(y=>y.id==='D4_EXACT_ELEMENTS').meaning='unknown'],
 ['wrong_GAP',x=>x.p.original_source_roles.find(y=>y.id==='GAP_ID_96_202').meaning='[96,201]'],
 ['wrong_source_231',x=>x.p.original_source_roles.find(y=>y.id==='UNIQUE_231').meaning='none'],
 ['promote_defect',x=>x.p.conditional_obstruction.source_defect_established=true],
 ['promote_repair',x=>x.p.conditional_obstruction.fix_promoted=true],
 ['erase_conditional_intersection',x=>x.p.conditional_obstruction.distinct_shared_factor_obstruction='none'],
 ['external_as_author',x=>x.p.independent_non_author_context.authority_for_original_source_semantics=true],
 ['2T_wrong_order',x=>x.p.finite_exact_model.expected.H_2T_order=48],
 ['G_wrong_order',x=>x.p.finite_exact_model.expected.central_product_order=48],
 ['G_wrong_center',x=>x.p.finite_exact_model.expected.central_product_center_order=4],
 ['wrong_intersection',x=>x.p.finite_exact_model.expected.H_D4_intersection_order=4],
 ['wrong_PTt_order',x=>x.p.finite_exact_model.expected.generated_PTt_order=24],
 ['fake_Q8_equal',x=>x.p.finite_exact_model.expected.Q8_embeddings_equal=true],
 ['fake_Q8_normal',x=>x.p.finite_exact_model.expected.generated_PT_Q8_normal=true],
 ['fake_K_in_2T',x=>x.p.finite_exact_model.expected.K_in_H=true],
 ['fake_K_not_in_D4',x=>x.p.finite_exact_model.expected.K_in_D4=false],
 ['fake_K_C_commutes',x=>x.p.finite_exact_model.expected.K_anticommutes_C=false],
 ['unrelated_SSC_change',x=>x.s.items.find(y=>y.id==='L-SSC-119').body+='UNAUTHORIZED'],
 ['unrelated_source_change',x=>x.i.locations.find(y=>y.id==='L04-S038').disposition='INVALID'],
 ['erase_reverse_link',x=>x.i.locations.find(y=>y.id==='L04-S037').ssc_ids=['L-SSC-118']],
 ['fake_review_complete',x=>x.i.counts.by_disposition.MAPPED_MEANING_NOT_GLOBAL_FIDELITY_PASS=0],
 ['break_dependency_SHA',x=>x.g.current_convergence.git_blob_sha='WRONG'],
 ['rewrite_failed_CI',x=>x.g.predecessor_gate.prior_failed_S036_original_CI=0],
 ['premature_G1',x=>x.g.current_lawful_state.G1_authorized=true],
 ['cross_track',x=>x.g.current_lawful_state.W_semantics_imported=true],
 ['merge',x=>x.g.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;if(!errors.length)for(const [k,mutate]of controls){const x=structuredClone(data);try{mutate(x);if(check(x,pages).length)rejected++;else errors.push('HOSTILE_ESCAPED_'+k)}catch(e){errors.push('HOSTILE_CHECKER_EXCEPTION_'+k+':'+e.message)}}
console.log(JSON.stringify({schema:'isograph.exp062.L04-S037.original-group-source.v0.2',PASS:!errors.length,errors,frozen_PDF_SHA256_verified:fullBinary,original_pages_SHA256_verified:2,original_source_atoms_verified:3,source_semantic_roles:17,finite_center_product_order:model.central_product_order,finite_center_order:model.central_product_center,finite_K_in_2T:model.K_in_quaternion_2T,SSC_IDs:191,source_groups:350,remaining_L04_groups:2,hostiles_defined:controls.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false,PR70_merge_authorized:false},null,2));if(errors.length)process.exitCode=1;
