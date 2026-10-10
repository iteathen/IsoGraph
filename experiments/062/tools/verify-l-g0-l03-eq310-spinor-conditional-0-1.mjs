// Lisi-only G0: frozen L03 v1 original Eq3.10 action + Eq3.11 conditional zero.
// Source PDF is retrieved by exact SHA and read independently of the SSC ledger.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={source:P+'LISI_L03_EQ3_10_EQ3_11_CONDITIONAL_SPINOR_SOURCE_G0_0_1.json',
oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_5.json',inv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',
oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_59.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_60.json',
oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_8.json',reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_9.json',
oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_26.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_27.json',
oldGate:E+'L_CURRENT_STAGE_GATE_0_92.json',gate:E+'L_CURRENT_STAGE_GATE_0_93.json',
self:E+'tools/verify-l-g0-l03-eq310-spinor-conditional-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
const hashes=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,sha(p)]));
const open='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED';
const exact='EXACT_ORIGINAL_EQ3_10_SPINOR_ACTION_COEFFICIENT_ORDER_RECONCILED_GLOBAL_COLD_OPEN';
function check(d){
 const issues=[],t=(v,m)=>{if(!v)issues.push(m);};
 const {source:p,oldInv:oi,inv:i,oldSSC:o,ssc:n,oldReg:or,reg:r,oldTr:ot,tr:v,oldGate:og,gate:g}=d;
 t(p.schema==='isograph.track-L.G0.L03-original-Eq3.10-3.11-spinor-action-conditional-zero.v0.1'&&p.track==='L'&&p.stage==='G0','source-bound G0 L');
 t(p.frozen_source?.revision==='arXiv:1006.4908v1'&&p.frozen_source?.SHA256==='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e'&&p.frozen_source?.original_page_zero_based===9,'real frozen v1');
 const e=p.exact_original_meaning||{};
 t(e.Eq3_10==='[Gamma_ij,Q_iota]=GammaPlus_ij Q_iota=Q_kappa (GammaPlus_ij)^kappa_iota','exact original input output action');
 t(e.coefficient_index_roles?.input==='iota'&&e.coefficient_index_roles?.output==='kappa'&&e.coefficient_index_roles?.operator_action?.includes('positive-chiral'),'input output typed coefficients');
 t(e.original_spinor_carrier?.includes('64-real Majorana-Weyl')&&e.hypothetical_zero_choice?.startsWith('If we define'),'positive chiral MW input and source IF');
 t(e.hypothesized_antisymmetry?.startsWith('and presume')&&e.author_generalized_algebra_caveat?.includes('may be undefined')&&e.author_conditional_conclusion?.startsWith('then brackets'),'exact source conditional binders');
 t(e.modality==='AUTHOR_CONDITIONAL_IF_DEFINE_ZERO_AND_PRESUME_ANTISYMMETRY_NOT_UNCONDITIONAL_INITIAL_BRACKET'&&e.source_E8_nonzero_spinor_spinor_not_overwritten===true,'conditional versus source-E8 nonzero');
 t(p.original_source_evidence?.original_eq3_10_nearby_text_sha256==='2e3373dea5e9796dc5257e3e8d4f67b492f2c6bcb3683942cefad350878ec25f','original PDF extraction first location');
 t(p.original_source_evidence?.original_eq3_11_nearby_text_sha256==='5313835a30f48bf1ded182c65efe928226b6461aa46d339cb75fb5d3b2dedab3','original PDF extraction conditional location');
 t(p.failure_mechanism?.new_typed_SSC_identity_needed===false&&p.failure_mechanism?.class==='SOURCE_CONDITIONAL_BINDER_SCOPE_ERASED_PLUS_ACTION_INDEX_ORDER_UNDERINDEXED','source-fidelity defect not ID proliferation');
 t(p.conservation?.exact_original_formula_groups_before===16&&p.conservation?.after_success===15&&p.conservation?.entire_unchanged_SSC_records===190&&p.conservation?.all_six_original_cold_complete===0,'source/replay conservation');
 t(p.G0_complete===false&&p.G1_authorized===false&&p.W_semantics_imported===false,'source gate isolation');
 t(oi.original_first_locations?.length===47&&i.original_first_locations?.length===47,'both 47 original locations');
 const changed=[];for(let k=0;k<47;k++){const before=oi.original_first_locations[k],after=i.original_first_locations[k];t(before.source_location_id===after.source_location_id,'source location '+k);if(JSON.stringify(before)!==JSON.stringify(after))changed.push(after.source_location_id);}
 t(changed.join(',')==='L03-S027,L03-S028','45 whole old source groups unchanged');
 const action=i.original_first_locations.find(z=>z.source_location_id==='L03-S027'),condition=i.original_first_locations.find(z=>z.source_location_id==='L03-S028');
 t(action?.disposition===exact&&action?.SSC_ids?.includes('L-SSC-078')&&action?.original_spinor_action_source_packet?.git_blob_sha===hashes.source,'source to SSC action and packet');
 t(condition?.disposition==='MAPPED_SOURCE_SEMANTIC_ROLE_COLD_FIDELITY_STILL_OPEN'&&condition?.source_semantic_group?.includes('IF define')&&condition?.source_semantic_group?.includes('PRESUME')&&condition?.original_conditional_source_packet?.git_blob_sha===hashes.source,'conditional original M row not artificially passed');
 t(i.counts?.by_disposition?.[open]===15&&i.counts?.by_disposition?.[exact]===1&&Object.values(i.counts?.by_disposition||{}).reduce((a,b)=>a+b,0)===47,'finite source group denominator');
 t(i.counts?.remaining_other_original_formula_and_matrix_exactness_groups===15&&i.reverse?.source_to_SSC_full_exact_source_fidelity_pass===false,'L03 still cold open');
 t(o.items?.length===191&&n.items?.length===191&&n.schema==='woit-lisi.track-l.source-semantic-census.v0.60','SSC full prior identities');
 const edited=[];for(let k=0;k<191;k++){t(o.items[k].id===n.items[k].id,'SSC source ID '+k);if(JSON.stringify(o.items[k])!==JSON.stringify(n.items[k]))edited.push(n.items[k].id);}
 t(edited.join(',')==='L-SSC-078','190 whole old SSC records intact');
 const body=n.items.find(z=>z.id==='L-SSC-078')?.body||'';
 t(body.includes('bracket UNDEFINED')&&body.includes('IF one defines')&&body.includes('PRESUMES')&&body.includes('positive-chiral 64-real')&&body.includes('Q_κ(Γ^+_ij)^κ_ι')&&body.includes('may be undefined')&&body.includes('NONZERO E8(−24)'),'SSC source conditional and exact action semantically preserved');
 t(!body.includes('then defines the fermion-fermion bracket trivially as zero'),'prior unconditional characterization removed');
 t(n.items.find(z=>z.id==='L-SSC-078')?.source_expression_census?.L03_ORIGINAL_EQ3_10_EQ3_11_CONDITIONAL_0_1?.evidence_packet?.git_blob_sha===hashes.source,'source evidence in record');
 t(n.revision?.source_first_inverse?.git_blob_sha===hashes.inv&&n.predecessor?.git_blob_sha===hashes.oldSSC&&n.guards?.L03_original_remaining_exact_formula_groups===15&&n.guards?.source_census_freeze_complete===false,'SSC exact provenance and no freeze');
 t(or.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.8'&&r.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.9','convergence successor');
 t(r.source_first_predecessor?.git_blob_sha===hashes.oldReg&&r.current_ssc?.git_blob_sha===hashes.ssc,'register lineage');
 t(r.per_source?.length===6&&r.per_source?.reduce((a,z)=>a+z.source_first_location_units,0)===350&&r.denominator?.SSC_identity_owner_assignments===191,'finite six source unit/ID denominator');
 const l=r.per_source.find(x=>x.source==='L03'),l04=r.per_source.find(x=>x.source==='L04');
 t(l?.audit_git_blob_sha===hashes.inv&&l?.original_exact_cell_expression_groups_not_yet_independently_verified===15&&l?.original_complete_cold_review_passed===false,'L03 remaining P group fidelity');
 t(l04?.original_exact_cell_expression_groups_not_yet_independently_verified===14&&r.explicit_G0_outstanding?.source_exactness_by_source?.find(x=>x.source==='L04')?.count===14,'L04 stale counter not reintroduced');
 t(r.explicit_G0_outstanding?.source_exactness_by_source?.find(x=>x.source==='L03')?.count===15&&r.exit_acceptance_contract?.G0_SSC_complete===false,'register 15, G0 open');
 t(ot.schema==='lisi.full-treatment.source-traversal-ledger.v0.26'&&v.schema==='lisi.full-treatment.source-traversal-ledger.v0.27','traversal successor');
 t(v.predecessor_exact?.git_blob_sha===hashes.oldTr&&v.current_census?.git_blob_sha===hashes.ssc&&v.current_L03_source_first_inventory?.git_blob_sha===hashes.inv&&v.current_G0_six_original_finite_convergence?.git_blob_sha===hashes.reg,'traversal source chain');
 t(v.complete_sources===0&&v.sources?.every(z=>z.current_complete===false)&&v.sources?.find(z=>z.id==='L03')?.current_exact_formula_groups_unverified===15&&v.G1_authorized===false,'whole six source cold review outstanding');
 t(og.schema==='isograph.exp062-l-current-stage-gate.v0.92'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.93'&&g.predecessor_gate?.git_blob_sha===hashes.oldGate,'gate successor preserved');
 t(g.current_source_census?.git_blob_sha===hashes.ssc&&g.current_source_inventory?.git_blob_sha===hashes.inv&&g.current_convergence?.git_blob_sha===hashes.reg&&g.current_traversal?.git_blob_sha===hashes.tr&&g.source_packet?.git_blob_sha===hashes.source&&g.verifier?.git_blob_sha===hashes.self,'gate full exact object refs');
 t(g.prior_original_eq44_CI?.run_id===38080830103&&g.prior_original_eq44_CI?.conclusion==='success'&&g.prior_original_eq44_CI?.hostiles_rejected===28,'prior source CI exact record');
 t(g.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g.new_source_CI?.result===null,'CI pending at authorship');
 t(g.current_lawful_state?.G0_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false&&g.current_lawful_state?.PR70_merge_authorized===false,'no premature transition');
 return issues;
}
const norm=s=>s.replace(/\s+/g,' ').trim();
function sourceCheck(body){
 const n=norm(body),err=[],t=(v,m)=>{if(!v)err.push(m);};
 const idx=n.indexOf('(3.10)'),idx2=n.indexOf('(3.11)'),n2=idx<0?'':n.slice(idx,idx+240),context=idx2<0?'':n.slice(Math.max(0,idx2-350),idx2+400);
 t(idx>=0&&idx2>=0&&idx<idx2,'source original two numbered eq labels');
 t(n2.includes('[Γij , Qι ] = Γ+')&&n2.includes('Qκ (Γij ) ι'),'source Eq3.10 spinor coefficient right slot');
 t(context.includes('bracket between two spinors may be undefined'),'source expressly UNDEFINED possibility');
 t(context.includes('If we define such a')&&context.includes('[Qι , Qκ ] = 0'),'source IF preceding 0 bracket');
 t(context.includes('and presume [Qι , Γij ] = −[Γij , Qι ]'),'source presumed opposite mixed bracket');
 t(context.includes('spinors are')&&context.includes('ideal'),'source conclusion only under completion assumptions');
 return err;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L03-EQ310-G0-'));let page='',srcIssues=[];
try{
 const res=await fetch('https://arxiv.org/pdf/1006.4908v1',{signal:AbortSignal.timeout(35000)});
 if(res.status!==200)throw Error('ORIGINAL_PDF_RETRIEVAL_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());
 if(crypto.createHash('sha256').update(bytes).digest('hex')!=='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e')throw Error('NOT_ORIGINAL_FROZEN_V1_PDF_SHA');
 const file=path.join(dir,'source.pdf');fs.writeFileSync(file,bytes);
 const info=execFileSync('pdfinfo',[file],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*14$/m.test(info))throw Error('ORIGINAL_FROZEN_V1_14_PAGES');
 page=execFileSync('pdftotext',['-f','10','-l','10','-layout',file,'-'],{encoding:'utf8',maxBuffer:2000000,timeout:12000});
 srcIssues=sourceCheck(page);
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const issues=check(D).concat(srcIssues);
const mutants=[
 ['forge_unconditional_source',d=>d.source.exact_original_meaning.modality='UNCONDITIONAL_LIE_BRACKET'],
 ['erase_author_conditional',d=>d.source.exact_original_meaning.hypothetical_zero_choice='[Q_iota,Q_kappa]=0'],
 ['erase_presume',d=>d.source.exact_original_meaning.hypothesized_antisymmetry='proved'],
 ['reverse_action_index',d=>d.source.exact_original_meaning.Eq3_10='Q_iota Gamma_ij'],
 ['switch_carrier',d=>d.source.exact_original_meaning.original_spinor_carrier='complex 64'],
 ['switch_paper_revision',d=>d.source.frozen_source.revision='arXiv:1006.4908v2'],
 ['reclassify_M_cold',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S028').disposition=exact],
 ['erase_source_action',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S027').disposition=open],
 ['rewrite_unaffected_source_group',d=>d.inv.original_first_locations[0].source_semantic_group+=' forged'],
 ['wrong_source_action_provenance',d=>d.inv.original_first_locations.find(x=>x.source_location_id==='L03-S027').original_spinor_action_source_packet.git_blob_sha='bad'],
 ['erase_SSC_conditional',d=>d.ssc.items.find(x=>x.id==='L-SSC-078').body='unconditional zero Lie bracket'],
 ['wrong_SSC_source_id',d=>d.ssc.items.find(x=>x.id==='L-SSC-078').id='L-SSC-192'],
 ['rewrite_other_SSC',d=>d.ssc.items.find(x=>x.id==='L-SSC-082').body+=' changed'],
 ['invent_192nd',d=>d.ssc.items.push(d.ssc.items[0])],
 ['forge_census_freeze',d=>d.ssc.guards.source_census_freeze_complete=true],
 ['forge_register_count',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['restore_L04_stale',d=>d.reg.explicit_G0_outstanding.source_exactness_by_source.find(x=>x.source==='L04').count=16],
 ['forge_original_whole_source_cold',d=>d.reg.exit_acceptance_contract.G0_SSC_complete=true],
 ['wrong_traversal_count',d=>d.tr.sources.find(x=>x.id==='L03').current_exact_formula_groups_unverified=0],
 ['wrong_gate_predecessor',d=>d.gate.predecessor_gate.git_blob_sha='bad'],
 ['relabel_prior_CI_failure',d=>d.gate.prior_original_eq44_CI.conclusion='failure'],
 ['claim_future_CI_pass',d=>d.gate.new_source_CI.status='PASS'],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['unfreeze_PR_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;for(const [name,fn] of mutants){const copy=JSON.parse(JSON.stringify(D));try{fn(copy);if(check(copy).length)rejected++;else issues.push('ESCAPE_'+name);}catch(e){issues.push('HOSTILE_ERROR_'+name+' '+String(e));}}
for(const [name,original,alternate] of [['source_if','If we define such a','We have fully proved such a'],['source_presume','and presume [Qι , Γij ] = −[Γij , Qι ]','and prove [Qι , Γij ] = +[Γij , Qι ]'],['source_undefined','bracket between two spinors may be undefined','bracket between two spinors is always defined']]){
 const changed=page.replace(original,alternate);if(sourceCheck(changed).length)rejected++;else issues.push('ESCAPED_ORIGINAL_'+name);
}
const result={schema:'isograph.exp062.L.G0.L03.original-source-Eq3.10-Eq3.11.v0.1',pass:issues.length===0,issues,source_v1_SHA256_verified:true,source_original_action_and_modality_verified:srcIssues.length===0,source_exact_loci:['L03-S027'],source_condition_corrected:['L03-S028'],SSC_repaired:['L-SSC-078'],unchanged_SSC_records:190,source_first_location_total:350,SSC_identities:191,L03_exact_formula_groups_prior:16,L03_exact_formula_groups_current:15,all_six_original_whole_cold_complete:0,hostiles_defined:mutants.length+3,hostiles_rejected:rejected,G0_complete:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(issues.length)process.exitCode=1;
