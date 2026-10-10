// Lisi G0 frozen L03 v1 original source-to-SSC exact bracket occurrence guard.
// Source literal Eq4.5 index discrepancy is retained; no proof of mathematical error.
// v0.2 repairs aggregate-only source replay classification and false-cold source oracle guards.
// First run 38077641405 remains failed with 34/36 hostiles; do not retrospectively pass.
// Passing does not establish complete original source-semantic cold review.
import fs from 'node:fs';
import crypto from 'node:crypto';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 fail:E+'L03_ORIGINAL_BIVECTOR_FIRST_36_HOSTILE_ORACLE_FAILURE_0_1.json',
 s:P+'LISI_L03_26_ORIGINAL_EQUATION_AND_BIVECTOR_LITERAL_COMPARISON_0_1.json',
 oldAudit:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 audit:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',
 oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_56.json',
 SSC:P+'SOURCE_SEMANTIC_CENSUS_0_57.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_6.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_24.json',
 prev:E+'L_CURRENT_STAGE_GATE_0_89.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_90.json',
 me:E+'tools/verify-l-g0-l03-original-source-bivector-0-2.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const data={fail:read(F.fail),s:read(F.s),oldAudit:read(F.oldAudit),audit:read(F.audit),oldSSC:read(F.oldSSC),SSC:read(F.SSC),reg:read(F.reg),tr:read(F.tr),prev:read(F.prev),gate:read(F.gate)};
function verify(D){
 const e=[],ok=(good,msg)=>{if(!good)e.push(msg);};
 const failed=D.fail||{};
 const s=D.s||{},o=D.oldAudit||{},a=D.audit||{},old=D.oldSSC||{},cur=D.SSC||{},r=D.reg||{},t=D.tr||{},g=D.gate||{},p=D.prev||{};
 const pending='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED';
 const repaired='EXACT_ORIGINAL_REPEAT_BIVECTOR_LITERAL_RECONCILED_SOURCE_INTERNAL_DISCREPANCY_CONSERVED';
 const originalIDs=['L03-S026','L03-S031','L03-S033'];
 const changedIDs=['L-SSC-078','L-SSC-081','L-SSC-083'];
 ok(failed.exact_failed_CI?.run_id===38077641405&&failed.exact_failed_CI?.conclusion==='failure'&&failed.original_hostiles_defined===36&&failed.original_hostiles_rejected===34,'exact initial 0.1 failed CI remains failed with 34/36 hostiles');
 ok(g.first_failed_L03_bivector_CI?.run_id===38077641405&&g.first_failed_L03_bivector_CI?.evidence_blob_sha===sha(F.fail),'current source stage must pin immutable failed CI');
 ok(s.schema==='isograph.track-L.G0.L03-26-original-equation-source-first-and-bivector-literal-discrepancy.v0.1'&&s.track==='L'&&s.stage==='G0','L-only original source scope');
 ok(s.source?.revision==='arXiv:1006.4908v1'&&s.source?.original_binary_sha256==='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e'&&s.source?.original_pages===14,'original source PDF revision/SHA/pages');
 ok(s.source_oracle?.run_id===38071927170&&s.source_oracle?.conclusion==='success'&&s.source_oracle?.source_numbering_not_exact_formula_proof===true,'independent original PDF equation locator CI provenance');
 ok(s.predecessor?.original_source_inventory_git_blob_sha===sha(F.oldAudit)&&s.predecessor?.source_exact_pending_groups_before===25,'predecessor original source audit evidence');
 const labels=[...Array.from({length:8},(_,i)=>'2.'+(i+1)),...Array.from({length:11},(_,i)=>'3.'+(i+1)),...Array.from({length:7},(_,i)=>'4.'+(i+1))];
 const records=s.all_numbered_original_equation_source_first_locations||[];
 ok(records.length===26,'all 26 original PDF numbered eq labels');
 for(let i=0;i<26;i++){
  const x=records[i]||{},y=(o.original_first_locations||[]).find(q=>q.source_location_id===x.original_first_location_id);
  ok(x.number===labels[i]&&y?.original_source_locator?.includes('('+x.number+')'),'frozen source Eq label first location '+i);
  ok(JSON.stringify(x.existing_L03_SSC_ids||[])===JSON.stringify(y?.SSC_ids||[]),'source Eq owns same old SSC relations '+i);
  ok(Number.isInteger(x.original_PDF_page_zero_based)&&x.original_PDF_page_zero_based>=0&&x.original_PDF_page_zero_based<14&&/^[a-f0-9]{64}$/.test(x.original_PDF_nearby_text_SHA256||''),'original source page and text fingerprint '+i);
  ok(x.full_exact_formula_cell_independently_replayed===false,'all-matrix cold proof not fabricated '+i);
 }
 const eq=s.literal_original_source_bivector_equations||{};
 const b39=eq.Eq3_9?.source_graviGUT_spin_11_3_bracket_terms||[];
 const b43=eq.Eq4_3?.source_spin_12_4_bracket_as_ij_kl_after_substitution_w_i_x_j_y_k_z_l||[];
 const b45=eq.Eq4_5?.source_printed_inherited_GraviGUT_bracket_terms||[];
 const expect=[['jk','il','+'],['jl','ik','-'],['il','jk','+'],['ik','jl','-']];
 const printed=[['jk','il','+'],['jl','il','-'],['il','jk','+'],['ik','jl','-']];
 const sig=z=>[z?.eta_index_pair,z?.generator_index_pair,z?.sign].join(',');
 ok(b39.length===4&&b43.length===4&&b45.length===4,'four source bivector bracket terms each');
 for(let i=0;i<4;i++){
  ok(sig(b39[i])===expect[i].join(','),'source Eq3.9 literal index term '+i);
  ok(sig(b43[i])===expect[i].join(','),'source Eq4.3 canonical index relabeling '+i);
  ok(sig(b45[i])===printed[i].join(','),'source Eq4.5 literal NOT repaired '+i);
 }
 ok(s.observed_source_literal_discrepancy?.Eq4_5_printed==='-2 eta_jl GammaPrime_il'&&s.observed_source_literal_discrepancy?.Eq3_9_printed==='-2 eta_jl Gamma_ik'&&s.observed_source_literal_discrepancy?.source_claim_retained_without_typo_rewrite===true,'source author assertion vs independent literal discrepancy');
 ok(s.observed_source_literal_discrepancy?.author_typo_or_mathematical_theory_false_NOT_proven===true&&s.exact_original_printed_formula_groups_remaining_unreplayed===22&&s.G0_open===true&&s.G1_authorized===false,'no full theory or original semantic source G0 proof');
 ok(o.schema==='isograph.track-L.G0.L03-original-source-first-bidirectional-coverage.v0.2'&&a.schema==='isograph.track-L.G0.L03-original-source-first-bidirectional-coverage.v0.3','original source first audit predecessors');
 ok(o.original_first_locations?.length===47&&a.original_first_locations?.length===47&&a.counts?.by_disposition?.[pending]===22&&a.counts?.by_disposition?.[repaired]===3,'L03 original 47, three source formula replays, 22 pending');
 const changed=[];for(let i=0;i<47;i++){const before=o.original_first_locations[i]||{},after=a.original_first_locations[i]||{};ok(before.source_location_id===after.source_location_id,'source first original location conserved '+i);if(JSON.stringify(before)!==JSON.stringify(after))changed.push(after.source_location_id);}
 ok(changed.join(',')===originalIDs.join(',')&&a.scoped_original_source_literal_comparison?.git_blob_sha===sha(F.s),'only exact three old original source group changes');
 ok(originalIDs.every(id=>{const x=a.original_first_locations?.find(r=>r.source_location_id===id);return x?.disposition===repaired&&x?.original_literal_source_review_packet?.git_blob_sha===sha(F.s);}), 'each original Eq3.9/4.3/4.5 exact replay retains true source disposition, not only aggregate');
 ok(old.schema==='woit-lisi.track-l.source-semantic-census.v0.56'&&cur.schema==='woit-lisi.track-l.source-semantic-census.v0.57'&&old.items?.length===191&&cur.items?.length===191,'191 SSC source identity ledger conserved');
 ok(cur.predecessor?.git_blob_sha===sha(F.oldSSC)&&cur.revision?.source_packet?.git_blob_sha===sha(F.s)&&cur.revision?.source_first_inventory?.git_blob_sha===sha(F.audit),'new L03 source evidence SHA and old SSC exact parent');
 const edited=[];for(let i=0;i<191;i++){ok(old.items[i]?.id===cur.items[i]?.id,'current source SSC identity unchanged '+i);if(JSON.stringify(old.items[i])!==JSON.stringify(cur.items[i]))edited.push(cur.items[i].id);}
 ok(edited.join(',')===changedIDs.join(',')&&cur.revision?.unchanged_source_items===188,'188 entire unaffected SSC records unchanged');
 const body=id=>cur.items.find(x=>x.id===id)?.body||'';
 ok(body(changedIDs[0]).includes('−2η_jl Γ_ik')&&body(changedIDs[1]).includes('−2η_xz Γ′_wy'),'source Eq3.9/4.3 literal signs and roles in SSC');
 ok(body(changedIDs[2]).includes('second term literally repeats Γ′_il')&&body(changedIDs[2]).includes('Γ′_ik')&&body(changedIDs[2]).includes('author'),'source Eq4.5 literally different from claimed match');
 for(const id of changedIDs){const ptr=cur.items.find(x=>x.id===id)?.source_expression_census?.L03_26_EQ_REPEATED_BIVECTOR_LITERAL_G0_0_1;ok(ptr?.source_packet?.git_blob_sha===sha(F.s)&&ptr?.source_first_inventory?.git_blob_sha===sha(F.audit)&&ptr?.global_frozen_original_semantic_cold_review_passed===false,'exact three source evidence pointers '+id);}
 ok(cur.guards?.source_census_freeze_complete===false&&cur.guards?.L03_Eq4_5_printed_GammaPrime_il_not_silently_rewritten===true,'L03 source discrepancy conserved G0 open');
 ok(r.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.6'&&r.current_ssc?.git_blob_sha===sha(F.SSC)&&r.per_source?.find(z=>z.source==='L03')?.audit_git_blob_sha===sha(F.audit)&&r.per_source?.find(z=>z.source==='L03')?.original_exact_cell_expression_groups_not_yet_independently_verified===22,'six-source register actual L03 22 G0 source debt');
 ok(r.per_source?.length===6&&r.denominator?.source_first_location_units===350&&r.current_ssc?.source_identities===191&&r.exit_acceptance_contract?.G0_SSC_frozen===false,'six source denominator not global complete');
 ok(r.per_source?.find(x=>x.source==='L03')?.original_complete_cold_review_passed===false,'L03 cannot be falsely promoted to complete original cold source review');
 ok(t.schema==='lisi.full-treatment.source-traversal-ledger.v0.24'&&t.predecessor==='SOURCE_TRAVERSAL_LEDGER_0_23.json'&&t.current_L03_source_first_inventory?.git_blob_sha===sha(F.audit)&&t.current_G0_six_original_finite_convergence?.git_blob_sha===sha(F.reg),'traversal current source SHA, version and provenance');
 ok(t.sources?.length===6&&t.complete_sources===0&&t.sources.every(z=>z.current_complete===false)&&t.G1_authorized===false&&t.current_census?.git_blob_sha===sha(F.SSC),'none of six original full source cold reviews passed');
 ok(p.schema==='isograph.exp062-l-current-stage-gate.v0.89'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.90'&&g.predecessor_gate?.git_blob_sha===sha(F.prev),'original source gate stage exact ancestor');
 ok(g.current_source_census?.git_blob_sha===sha(F.SSC)&&g.source_traversal?.git_blob_sha===sha(F.tr)&&g.source_first_L03_packet?.git_blob_sha===sha(F.audit)&&g.L03_bivector_original_literal_source?.git_blob_sha===sha(F.s)&&g.source_first_global_convergence?.git_blob_sha===sha(F.reg)&&g.source_verifier?.git_blob_sha===sha(F.me),'current gate evidence and verifier self SHA');
 ok(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.hostiles_rejected===null&&g.convergence?.L03?.source_exact_groups_unverified===22,'no CI predeclared success');
 ok(g.current_lawful_state?.source_census_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false&&g.current_lawful_state?.L03_original_math_error_proved===false&&g.PR70_merge_authorized===false,'G0 source only, no author theorem claim, G1/W/merge');
 ok(g.current_lawful_state?.L03_complete_cold_source_review===false,'current L03 source full cold reviewer NOT completed');
 ok(g.W_track_mutated===false&&g.last_L04_table1_table2_corrected_CI?.run_id===38074030535&&g.last_L04_table1_table2_corrected_CI?.conclusion==='success','W isolation and earlier L04 CI exact status');
 return e;
}
const corruptions=[
 ['remove_original_eq',(d)=>d.s.all_numbered_original_equation_source_first_locations.pop()],
 ['mislabel_original_eq',(d)=>d.s.all_numbered_original_equation_source_first_locations[0].number='3.1'],
 ['fake_original_pdf',(d)=>d.s.source.original_binary_sha256='wrong'],
 ['fake_original_cold',(d)=>d.s.all_numbered_original_equation_source_first_locations[0].full_exact_formula_cell_independently_replayed=true],
 ['insert_W_SSC',(d)=>d.s.all_numbered_original_equation_source_first_locations[0].existing_L03_SSC_ids.push('W-SSC-004')],
 ['correct_printed_eq45',(d)=>d.s.literal_original_source_bivector_equations.Eq4_5.source_printed_inherited_GraviGUT_bracket_terms[1].generator_index_pair='ik'],
 ['change_original_eq39',(d)=>d.s.literal_original_source_bivector_equations.Eq3_9.source_graviGUT_spin_11_3_bracket_terms[1].generator_index_pair='il'],
 ['change_original_eq43',(d)=>d.s.literal_original_source_bivector_equations.Eq4_3.source_spin_12_4_bracket_as_ij_kl_after_substitution_w_i_x_j_y_k_z_l[1].generator_index_pair='il'],
 ['erase_author_modality',(d)=>d.s.observed_source_literal_discrepancy.source_claim_retained_without_typo_rewrite=false],
 ['invent_author_erratum',(d)=>d.s.observed_source_literal_discrepancy.author_typo_or_mathematical_theory_false_NOT_proven=false],
 ['erase_pending22',(d)=>d.s.exact_original_printed_formula_groups_remaining_unreplayed=0],
 ['delete_source_location',(d)=>d.audit.original_first_locations.pop()],
 ['regress_Eq45_source_replay',(d)=>d.audit.original_first_locations.find(x=>x.source_location_id==='L03-S033').disposition='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED'],
 ['rewrite_unrelated_original_source',(d)=>d.audit.original_first_locations[0].source_semantic_group+='fake'],
 ['modify_unrelated_SSC',(d)=>d.SSC.items.find(x=>x.id==='L-SSC-001').body+='fake'],
 ['erase_source_083_body',(d)=>d.SSC.items.find(x=>x.id==='L-SSC-083').body='generic equality'],
 ['erase_source_081_body',(d)=>d.SSC.items.find(x=>x.id==='L-SSC-081').body='generic'],
 ['erase_source_evidence_ref',(d)=>delete d.SSC.items.find(x=>x.id==='L-SSC-083').source_expression_census.L03_26_EQ_REPEATED_BIVECTOR_LITERAL_G0_0_1],
 ['create_fake_SSC_item',(d)=>d.SSC.items.push(d.SSC.items[0])],
 ['promote_register_L03',(d)=>d.reg.per_source.find(x=>x.source==='L03').original_complete_cold_review_passed=true],
 ['close_register_L03',(d)=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['break_register_source_SHA',(d)=>d.reg.per_source.find(x=>x.source==='L03').audit_git_blob_sha='bad'],
 ['break_traverse_source_SHA',(d)=>d.tr.current_L03_source_first_inventory.git_blob_sha='bad'],
 ['complete_traverse_L03',(d)=>d.tr.sources.find(x=>x.id==='L03').current_complete=true],
 ['promote_traverse_G1',(d)=>d.tr.G1_authorized=true],
 ['erase_gate_source_SHA',(d)=>d.gate.L03_bivector_original_literal_source.git_blob_sha='bad'],
 ['erase_gate_checker_SHA',(d)=>d.gate.source_verifier.git_blob_sha='bad'],
 ['erase_gate_predecessor_SHA',(d)=>d.gate.predecessor_gate.git_blob_sha='bad'],
 ['declare_CI_success',(d)=>d.gate.source_CI.status='SUCCESS'],
 ['force_G0_freeze',(d)=>d.gate.current_lawful_state.source_census_frozen=true],
 ['promote_G1',(d)=>d.gate.current_lawful_state.G1_authorized=true],
 ['promote_DP',(d)=>d.gate.current_lawful_state.DP_pass_authorized=true],
 ['import_W',(d)=>d.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['declare_mathematical_error_proven',(d)=>d.gate.current_lawful_state.L03_original_math_error_proved=true],
 ['merge_PR70',(d)=>d.gate.PR70_merge_authorized=true],
 ['retroactively_fail_L04_success',(d)=>d.gate.last_L04_table1_table2_corrected_CI.conclusion='failure'],
 ['erase_failed_L03_CI',(d)=>d.gate.first_failed_L03_bivector_CI.run_id=0],
 ['forge_completed_L03_gate',(d)=>d.gate.current_lawful_state.L03_complete_cold_source_review=true]
];
const d=data;
const errors=verify(d);let rejected=0;
for(const [name,mut] of corruptions){
 const c=JSON.parse(JSON.stringify(d));
 try{mut(c);if(verify(c).length)rejected++;else errors.push('HOSTILE_ESCAPED '+name);}
 catch(e){errors.push('HOSTILE_ERROR '+name+':'+String(e));}
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L03-original-source-bivector-scope.v0.1',pass:!errors.length,issues:errors,original_numbered_equations:26,source_literal_replays:3,one_original_term_index_discrepancy:true,remaining_other_L03_formula_groups:22,untouched_older_SSC_source_items:188,total_SSC_source_items:191,hostiles_defined:corruptions.length,hostiles_rejected:rejected,whole_original_source_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;
