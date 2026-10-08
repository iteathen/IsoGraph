import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={old:L+'SOURCE_SEMANTIC_CENSUS_0_17.json',now:L+'SOURCE_SEMANTIC_CENSUS_0_18.json',
 defect:L+'LISI_L01_EQUATION_LOCATOR_G0_DEFECT_0_1.json',audit:L+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_18.json'};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8')),J=JSON.stringify,copy=x=>JSON.parse(J(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=read(P.old),n=read(P.now),D=read(P.defect),A=read(P.audit),G=read(P.gate);
const literal=[
 ['L-SSC-026','L01 §1.1 eq. (1)','L01 §1.1 Eq. (1.1)',3],
 ['L-SSC-027','L01 §1.1 eq. (2)','L01 §1.1 Eq. (1.2)',3],
 ['L-SSC-028','L01 §2 eq. (3)','L01 §2 Eq. (2.1)',4],
 ['L-SSC-032','L01 §2.2.3 eq. (14)','L01 §2.2.3 Eq. (2.10)',12],
 ['L-SSC-038','L01 §3.1 eq. (18)','L01 §3.1 Eq. (3.2)',24],
 ['L-SSC-039','L01 §3.1 eqs. (19)–(21)','L01 §3.1 Eqs. (3.3)–(3.5)',24],
 ['L-SSC-040','L01 §3.1 eq. (22) and following','L01 §3.1 Eq. (3.6) and following unnumbered expressions',24],
 ['L-SSC-042','L01 §3.2 eqs. (23)–(24)','L01 §3.2 Eqs. (3.7)–(3.8)',25]
];
function check(x=n){
 const errors=[],ok=(q,msg)=>{if(!q)errors.push(msg)};
 ok(x.schema==='woit-lisi.track-l.source-semantic-census.v0.18'&&x.status==='L_G0_SOURCE_SSC_0_18_L01_EIGHT_SOURCE_EQ_LOCATOR_FIXES_PARTIAL_UNFROZEN','source only G0 and partial');
 ok(x.items?.length===191&&x.item_count===191&&J(x.items.map(y=>y.id))===J(old.items.map(y=>y.id)),'all 191 identities strictly conserved');
 const changes=x.items.filter((y,i)=>J(y)!==J(old.items[i])).map(y=>y.id);
 ok(J(changes)===J(literal.map(a=>a[0])),'exactly eight L01 source records revised');
 ok(old.items.filter(y=>!literal.some(q=>q[0]===y.id)).every(y=>J(y)===J(x.items.find(z=>z.id===y.id))),'all 183 COMPLETE other L source items bitwise-equivalent as JSON');
 const r=x.revision||{},guard=x.guards||{};
 ok(r.id==='L_SSC_0_18_EIGHT_L01_PRINTED_EQUATION_PROVENANCE_FIXES_G0'&&r.predecessor?.path===P.old&&r.predecessor?.git_blob_sha===sha(P.old),'exact source SSC0.17 predecessor');
 ok(r.changed_source_items?.length===8&&J(r.changed_source_items)===J(literal.map(a=>a[0]))&&r.unchanged_source_items===183,'source record conservation 8+183=191');
 ok(r.frozen_L01_defect?.path===P.defect&&r.frozen_L01_defect?.git_blob_sha===sha(P.defect),'source equation defect provenance exact');
 ok(r.L01_visual_pages_audit?.path===P.audit&&r.L01_visual_pages_audit?.git_blob_sha===sha(P.audit),'source visual 31-page audit exact');
 ok(r.previous_procedural_gate?.path===P.gate&&r.previous_procedural_gate?.git_blob_sha===sha(P.gate),'governing earlier G0 gate exact SHA');
 ok(r.source_L01_revision==='0711.0770v1'&&r.original_L01_paper_unchanged===true&&r.source_spans_correction_only===true,'frozen 2007 arxiv revision not rewritten');
 ok(r.unreconstructed_more_L01_source_semantics===7&&r.L01_full_semantic_assertion_census_complete===false&&r.whole_L01_L06_corpus_complete===false,'seven additional G0 semantic omissions still open');
 ok(r.SSC_frozen===false&&r.G1_authorized===false&&r.global_primitives_qualified===false&&r.external_independent_review_passed===false,'never qualify source while correcting locators');
 ok(guard.L01_visually_checked_all_31_pdf_pages===true&&guard.L01_eight_source_equation_provenances_corrected===true&&guard.L01_30_SI_identities_preserved===undefined,'scope guard limited to actual 31-page source visual audit');
 ok(guard.L01_all_source_formula_bindings_fully_qualified===false&&guard.L01_source_30_obligation_completeness_proved===false&&guard.L01_7_additional_source_formula_gaps_remain_open===true,'no fake L01 source semantic completeness');
 for(const key of ['source_census_freeze_complete','whole_L_source_cold_audit_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ok(guard[key]===false,'G0/IA only '+key);
 ok(D.primary_source?.revision==='arXiv:0711.0770v1, 2007-11-06'&&D.confirmed_locator_corrections?.length===8,'exact 2007 primary-source v1 and 8 identified defects');
 ok(A.page_ledger?.length===31&&A.page_ledger.every((y,i)=>y.pdf_page_index===i&&y.visual_read===true&&y.complete_formula_AST_reconstructed===false&&y.source_semantic_closure===false),'ALL 31 source page review coverage, no AST theorem completion');
 ok(A.L01_related_source_items?.length===30&&A.coverage_count?.complete_source_item_cold_reconstructions===0&&A.seven_additional_source_granularity_obligations?.length===7,'all thirty L01 items looked at with explicit seven AST gaps');
 ok(J(D.confirmed_locator_corrections.map(y=>[y.id,y.source_old_locator,y.source_exact_printed_locator,y.pdf_zero_based_page]))===J(literal),'independent hardcoded 8 source Eq labels/pages, not self-referential anticipated answer');
 for(const [id,before,after,page]of literal){
  const oldItem=old.items.find(y=>y.id===id),current=x.items?.find(y=>y.id===id);
  ok(oldItem?.source_provenance===before&&current?.source_provenance===after,'source equation label exactly from paper: '+id);
  ok(current?.body===oldItem?.body&&current?.kind===oldItem?.kind&&current?.source_disposition_hint===oldItem?.source_disposition_hint&&current?.representation_closure===oldItem?.representation_closure,'positive original source semantics not silently rewritten '+id);
  const ev=current?.source_expression_census?.L01_frozen_source_equation_locator_G0||{};
  ok(ev.old_locator===before&&ev.printed_locator===after&&ev.pdf_zero_based_page===page&&ev.source_id==='L01'&&ev.revision==='arXiv:0711.0770v1','exact per-item page and source revision '+id);
  ok(ev.source_fidelity_defect?.path===P.defect&&ev.source_fidelity_defect?.git_blob_sha===sha(P.defect),'per-item source error provenance '+id);
  ok(ev.all_page_source_coverage?.path===P.audit&&ev.all_page_source_coverage?.git_blob_sha===sha(P.audit),'per-item page ledger provenance '+id);
  ok(ev.positive_claim_body_changed===false&&ev.complete_eq_AST_verified===false&&ev.all_source_semantics_qualified===false&&ev.G1_authorized===false,'no atom/binder closure from locator correction '+id);
 }
 ok(x.items?.find(y=>y.id==='L-SSC-125')?.body.includes('BOTH e6 e7=-e2 and e7 e6=-e2')&&x.items?.find(y=>y.id==='L-SSC-127')?.body.includes('168 of the 378'),'prior original octonion contradictions conserved from L05');
 ok(G.current_lawful_state?.G1_authorized===false&&G.current_lawful_state?.G0_source_census_frozen===false,'exact old G0 stage boundary still enforced');
 ok(!J(x).includes('W-SSC-'),'no W-only semantic import');
 return errors;
}
const baseline=check(),errors=[...baseline],mutations=[
 ['swap Eq1.1 to Eq1.2',x=>{x.items.find(z=>z.id==='L-SSC-026').source_provenance='L01 §1.1 Eq. (1.2)'}],
 ['retain old wrong Eq2.10 label',x=>{x.items.find(z=>z.id==='L-SSC-032').source_provenance='L01 §2.2.3 eq. (14)'}],
 ['change exact Eq3.3-3.5 interval',x=>{x.items.find(z=>z.id==='L-SSC-039').source_provenance='L01 §3.1 Eqs. (3.2)–(3.4)'}],
 ['drop old L01 source claim',x=>{x.items.find(z=>z.id==='L-SSC-028').body='erased'}],
 ['erase one L01 item',x=>{x.items=x.items.filter(z=>z.id!=='L-SSC-042')}],
 ['recycle SI handle',x=>{x.items.find(z=>z.id==='L-SSC-032').id='L-SSC-028'}],
 ['change unrelated L05 source contradiction',x=>{x.items.find(z=>z.id==='L-SSC-125').body='repaired'}],
 ['change unrelated L06 body',x=>{x.items.find(z=>z.id==='L-SSC-190').body='empty'}],
 ['change exact parent SSC hash',x=>{x.revision.predecessor.git_blob_sha='wrong'}],
 ['change exact L01 defect SHA',x=>{x.revision.frozen_L01_defect.git_blob_sha='wrong'}],
 ['change whole page audit SHA',x=>{x.revision.L01_visual_pages_audit.git_blob_sha='wrong'}],
 ['claim 191 cold audit complete',x=>{x.guards.whole_L_source_cold_audit_complete=true}],
 ['claim L01 30 items all semantically closed',x=>{x.guards.L01_source_30_obligation_completeness_proved=true}],
 ['erase additional source AST gaps',x=>{x.guards.L01_7_additional_source_formula_gaps_remain_open=false}],
 ['claim historical G1 authority',x=>{x.revision.G1_authorized=true}],
 ['claim recursive IA authorization',x=>{x.guards.recursive_IA_authorized=true}],
 ['claim full external review',x=>{x.revision.external_independent_review_passed=true}],
 ['promote first formula to closed AST',x=>{x.items.find(z=>z.id==='L-SSC-026').source_expression_census.L01_frozen_source_equation_locator_G0.complete_eq_AST_verified=true}],
 ['alter source page index',x=>{x.items.find(z=>z.id==='L-SSC-038').source_expression_census.L01_frozen_source_equation_locator_G0.pdf_zero_based_page=23}],
 ['delete one recorded change',x=>{x.revision.changed_source_items.pop()}],
 ['cross-track import',x=>{x.items.find(z=>z.id==='L-SSC-026').body+=' W-SSC-001'}]
];
let rejected=0;
if(!baseline.length)for(const [name,mutate]of mutations){const candidate=copy(n),before=J(candidate);mutate(candidate);if(J(candidate)===before)errors.push('NO-OP '+name);else if(check(candidate).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-ssc018-frozen-source-equation-locators.v0.1',
 pass:errors.length===0,errors,source_items:191,exact_l01_source_equation_corrections:8,unaffected_source_items:183,
 complete_pdf_pages_visual_swept:31,L01_related_source_items:30,missing_finer_AST_obligations:7,
 adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED_NO_MUTANTS':'TESTED',
 G1_to_G7_authorized:false,full_source_semantic_cold_audit:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
