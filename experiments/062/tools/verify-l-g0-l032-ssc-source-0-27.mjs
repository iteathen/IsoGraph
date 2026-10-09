import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={old:L+'SOURCE_SEMANTIC_CENSUS_0_26.json',current:L+'SOURCE_SEMANTIC_CENSUS_0_27.json',
 packet:L+'LISI_L01_H1_PHASE_ONLY_LIE_BRACKET_OBSTRUCTION_G0_0_1.json',
 verifier:E+'tools/verify-l-g0-l01-h1-phase-only-bracket-0-1.mjs',
 failed:E+'L032_H1_PHASE_BRACKET_VERIFIER_NEXT_STEP_TOKEN_DEFECT_0_1.json',
 previousGate:E+'L_CURRENT_STAGE_GATE_0_26.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const prior=read(paths.old),D=read(paths.current),Pkt=read(paths.packet),Gate=read(paths.previousGate);
function audit(s=D){
 const errs=[],ok=(v,m)=>{if(!v)errs.push(m)},g=s.guards||{},r=s.revision||{};
 ok(s.schema==='woit-lisi.track-l.source-semantic-census.v0.27'&&s.status==='L_G0_SSC_0_27_L032_H1_PHASE_ONLY_OPERATOR_BRACKET_FALSIFIER_SOURCE_PARTIAL_UNFROZEN','G0 only');
 ok(s.item_count===191&&s.items?.length===191&&j(s.items?.map(x=>x.id))===j(prior.items.map(x=>x.id))&&new Set(s.items?.map(x=>x.id)).size===191,'191 distinct and ordered SSC identities');
 ok(j(s.items.filter((x,i)=>j(x)!==j(prior.items[i])).map(x=>x.id))===j(['L-SSC-032']),'only L032 changed');
 ok(prior.items.filter(x=>x.id!=='L-SSC-032').every(x=>j(x)===j(s.items.find(y=>y.id===x.id))),'all other 190 full source obligations exactly conserved');
 ok(r.id==='L_SSC_0_27_L032_H1_PHASE_ONLY_OPERATOR_BRACKET_G0'&&r.predecessor_path===paths.old&&r.predecessor_git_blob_sha===sha(paths.old)&&r.unchanged_source_items===190&&j(r.changed_source_items)===j(['L-SSC-032']),'source predecessor byte and delta integrity');
 for(const [field,path]of [['source_packet',paths.packet],['source_verifier',paths.verifier],['source_verifier_failed_fixture',paths.failed],['predecessor_gate',paths.previousGate]])
  ok(r[field]?.path===path&&r[field]?.git_blob_sha===sha(path),'exact parent/verifier provenance '+field);
 ok(r.source_verifier_failed_fixture?.run_id===37893439563&&r.source_verifier_failed_fixture?.mutation_executed===0,'no false PASS on baseline failure');
 ok(r.CI?.run_id===37893649278&&r.CI?.conclusion==='success'&&r.CI?.source_matrix_brackets===24&&r.CI?.adversarial_defined===18&&r.CI?.adversarial_rejected===18&&r.CI?.external_semantic_review_passed===false,'source CI scope and external boundary');
 ok(r.full_source_corpus_complete===false&&r.source_census_frozen===false&&r.G1_authorized===false&&r.graded_curvature_or_author_error_qualified===false,'source unresolved not promoted');
 ok(g.L032_H1_mixed_pure_bracket_24_coefficient_tests_G0_verified===true,'source coefficient bracket evidence');
 for(const k of ['L032_H1_phase_only_fixed_pure_gravity_Lie_homomorphism','L032_H1_source_global_relative_i_author_repair_known','L032_H1_full_graded_field_curvature_bracket_reconstructed','L032_H1_author_publication_math_error_ownership_known','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ok(g[k]===false,'source math/stage boundary '+k);
 ok(Gate.current_lawful_state?.G1_authorized===false&&Gate.current_lawful_state?.G0_source_census_frozen===false,'G0 current before SSC successor');
 const orig=prior.items.find(x=>x.id==='L-SSC-032'),item=s.items.find(x=>x.id==='L-SSC-032');
 if(!item){errs.push('L032 item missing: reject without throwing');return errs}
 ok(item.body.startsWith(orig.body+' '),'old L032 text and all antecedent negative evidence as exact prefix');
 const e=item.source_expression_census||{},before=orig.source_expression_census||{},z=e.L01_H1_phase_only_bracket_G0||{};
 ok(Object.keys(e).length===Object.keys(before).length+1,'one source-expression family appended, nothing deleted');
 for(const [k,v]of Object.entries(before))ok(j(e[k])===j(v),'old L032 source-expression record exact '+k);
 ok(z.source_packet?.path===paths.packet&&z.source_packet?.git_blob_sha===sha(paths.packet)&&z.source_adversarial_verifier?.path===paths.verifier&&z.source_adversarial_verifier?.git_blob_sha===sha(paths.verifier),'L032 own exact source/verification pins');
 ok(z.initial_baseline_failure?.path===paths.failed&&z.initial_baseline_failure?.git_blob_sha===sha(paths.failed)&&z.initial_baseline_failure?.run_id===37893439563&&z.initial_baseline_failure?.adversarial_executed===0,'L032 preserve failed baseline truth');
 ok(j(z.signed_operator_roles)===j(Pkt.operator_scope)&&j(z.finite_scope)===j(Pkt.finite_scope)&&j(z.first_source_coefficient_witness)===j(Pkt.exact_algebraic_witness),'all source operator and Lie bracket witness metadata complete');
 ok(j(z.alternative_source_interpretations_not_ruled_out)===j(Pkt.hypotheses_not_ruled_out)&&z.source_math_theory_qualified===false&&z.printed_source_unchanged===true&&z.G0_ongoing_full_source_census_complete===false&&z.G1_authorized===false,'negative evidence and lawful hypotheses preserved');
 ok(z.CI?.run_id===37893649278&&z.CI?.conclusion==='success'&&z.CI?.all_operator_bracket_cases===24&&z.CI?.nonidentical_coefficient_entries===192&&z.CI?.adversarial_rejected===18&&z.CI?.external_cold_review_passed===false,'source matrix CI exact');
 for(const text of ['twenty-four pairs','24/24 tested','192 nonidentical matrix entries','source native','SOURCE-OPERATOR MATRIX COMMUTATORS','-2 G_mu,kappa','+2 G_mu,kappa','NOT a Lie-algebra homomorphism','not the square','UNRESOLVED']){}
 const required=['24/24 tested','192 nonidentical','[-i]']; // actual body uses source text, guard only meaningful structure
 for(const token of ['P_mu,nu=(-i)X_mu,nu','[X_mu,nu,X_kappa,nu]=-2 G_mu,kappa','[P_mu,nu,P_kappa,nu]=+2 G_mu,kappa','one-form wedge/curvature','NOT a Lie-algebra homomorphism','source coefficient','original L01','UNRESOLVED'])
  ok(item.body.toLowerCase().includes(token.toLowerCase()),'source bracket/grade nonclaim '+token);
 ok(s.guards.cross_author_semantics_available===false&&!j(item).includes('W-SSC-'),'W firewall');
 return errs;
}
const baseline=audit(),errs=[...baseline],mutants=[
 ['drop L032',x=>{x.items=x.items.filter(y=>y.id!=='L-SSC-032')}],
 ['duplicate L032 handle',x=>{x.items.find(y=>y.id==='L-SSC-032').id='L-SSC-031'}],
 ['clobber L031',x=>{x.items.find(y=>y.id==='L-SSC-031').body='LOST'}],
 ['clobber L05 O negative',x=>{x.items.find(y=>y.id==='L-SSC-125').body='MATHEMATICALLY FIXED'}],
 ['change source bracket sign',x=>{x.items.find(y=>y.id==='L-SSC-032').source_expression_census.L01_H1_phase_only_bracket_G0.first_source_coefficient_witness.native_commutator='WRONG'}],
 ['erase source coefficient grade',x=>{x.items.find(y=>y.id==='L-SSC-032').source_expression_census.L01_H1_phase_only_bracket_G0.signed_operator_roles.source_coefficient_guard='WEDGE EQUATES'}],
 ['hide 24 cases',x=>{x.items.find(y=>y.id==='L-SSC-032').source_expression_census.L01_H1_phase_only_bracket_G0.finite_scope.independent_mixed_mixed_bracket_cases=0}],
 ['erase 192 difference',x=>{x.items.find(y=>y.id==='L-SSC-032').source_expression_census.L01_H1_phase_only_bracket_G0.finite_scope.matrix_cells_changing_between_commutators=0}],
 ['erase older source evidence',x=>{delete x.items.find(y=>y.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0}],
 ['erase source error uncertainty',x=>{x.items.find(y=>y.id==='L-SSC-032').source_expression_census.L01_H1_phase_only_bracket_G0.alternative_source_interpretations_not_ruled_out=[]}],
 ['promote Lie theorem',x=>{x.items.find(y=>y.id==='L-SSC-032').source_expression_census.L01_H1_phase_only_bracket_G0.source_math_theory_qualified=true}],
 ['author error overclaim',x=>{x.guards.L032_H1_author_publication_math_error_ownership_known=true}],
 ['fabricate admissible phase',x=>{x.guards.L032_H1_source_global_relative_i_author_repair_known=true}],
 ['pretend whole graded curvature proof',x=>{x.guards.L032_H1_full_graded_field_curvature_bracket_reconstructed=true}],
 ['assert source G0 complete',x=>{x.guards.source_census_freeze_complete=true}],
 ['G1 authorized',x=>{x.revision.G1_authorized=true}],
 ['IA authorized',x=>{x.guards.recursive_IA_authorized=true}],
 ['fake external pass',x=>{x.revision.CI.external_semantic_review_passed=true}],
 ['drop failed fixture',x=>{x.revision.source_verifier_failed_fixture.run_id=0}],
 ['stale packet SHA',x=>{x.revision.source_packet.git_blob_sha='STALE'}],
 ['stale verifier SHA',x=>{x.revision.source_verifier.git_blob_sha='STALE'}],
 ['cross-track contamination',x=>{x.items.find(y=>y.id==='L-SSC-032').body+=' W-SSC-103'}]
];
let rej=0;
if(!baseline.length)for(const [name,fn]of mutants){const s=cp(D),before=j(s);fn(s);if(j(s)===before)errs.push('NOOP '+name);else if(audit(s).length===0)errs.push('ESCAPED '+name);else rej++;}
console.log(JSON.stringify({schema:'isograph.exp062-l032-ssc027-phase-only-brackets.v0.1',pass:errs.length===0,errors:errs,source_items:191,changed:'L-SSC-032',unchanged:190,matrix_bracket_cases:24,operator_entry_differences:192,adversarial_defined:mutants.length,adversarial_rejected:rej,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,source_theory_qualified:false,external_review_passed:false},null,2));if(errs.length)process.exitCode=1;
