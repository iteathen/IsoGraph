// G0 Track-L nine original v2 source expressions: finite PDF/HTML print-replay guard.
// Separate from all original-source cold completeness and from mathematical proof.
// Run pre-existing L02 source-first v0.3 checker before this supplemental verifier.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const F={
 packet:R+'LISI_L02_ORIGINAL_PRINTED_EQUATIONS_RECONCILIATION_G0_0_1.json',
 before:R+'SOURCE_SEMANTIC_CENSUS_0_52.json',
 after:R+'SOURCE_SEMANTIC_CENSUS_0_53.json',
 oldAudit:R+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 audit:R+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',
 tr:R+'SOURCE_TRAVERSAL_LEDGER_0_16.json',
 failure:E+'L02_NINE_PRINTED_EQUATIONS_INITIAL_DESTRUCTIVE_MUTATION_CI_FAILURE_0_1.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_74.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_73.json',
 self:E+'tools/verify-l-g0-l02-exact-source-equations-0-2.mjs'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const packet=load(F.packet),before=load(F.before),after=load(F.after),prev=load(F.oldAudit),audit=load(F.audit),trav=load(F.tr),gate=load(F.gate),initialFailure=load(F.failure);
const EDIS='EXACT_PRINTED_ORIGINAL_EQ_RECONCILED_NO_AUTHOR_MATH_QUALIFICATION';
const PDIS='EXACT_ORIGINAL_FORMULA_REPLAY_UNVERIFIED';
const expectedLocations=['L02-S010','L02-S014','L02-S030','L02-S031','L02-S032','L02-S035','L02-S036','L02-S037','L02-S038'];
const ids=['L-SSC-051','L-SSC-053','L-SSC-059','L-SSC-060'];
const eqs=[null,4,15,16,17,20,21,22,23];
const coeff=[['1/2'],['1/32','-1/512'],['1/2','-1/8','1/4','-1/32','-1/16','+1/16'],['1/4','1/8','-1/8','1/8','-3/32','-1/4','-1/4','1/4'],['1/4'],['1/2','1/8'],['1/2','-3/8'],['1/4'],['-1/2','-3/4','-2']];
function verify(q,b,n,p,a,t,g){
 const err=[],test=(cond,msg)=>{if(!cond)err.push(msg);};
 const expr=(i)=>q.exact_original_printed_equation_groups?.[i]?.normalized_original_printed_expression??'';
 test(initialFailure.run?.id===38027967509&&initialFailure.run?.conclusion==='failure'&&initialFailure.failed_step?.error_kind==='UNCAUGHT_TYPEERROR_DURING_DESTRUCTIVE_ADVERSARIAL_MUTATION','preserve original failed destructive-mutant test as failure');
 test(g.original_source_printed_CI_failure?.run_id===38027967509&&g.original_source_printed_CI_failure?.evidence_blob_sha===blob(F.failure),'gate pins original failed mutation failure');
 test(q.schema==='isograph.track-L.G0.L02.original-print-equation-reconstruction.v0.1'&&q.track==='L'&&q.stage==='G0'&&q.semantic_authority===false,'native G0 L-only source evidence');
 test(q.source?.revision==='arXiv:1004.4866v2'&&q.source?.original_pdf_pages===12&&q.source?.original_first_page_header==='arXiv:1004.4866v2 [gr-qc] 13 Oct 2010','original v2 paper revision');
 test(q.source?.original_pdf==='https://arxiv.org/pdf/1004.4866'&&q.source?.supplemental_same_revision_html==='https://arxiv.org/html/1004.4866v2'&&q.source?.supplemental_html_date_cannot_override_frozen_pdf===true,'HTML is independent rendition not new frozen source');
 test(q.source?.pdf_binary_sha_verified===false&&q.source?.qualified_external_independent_human_cold_review===false,'do not invent PDF bytes or whole-paper human review');
 test(q.predecessor_audit?.git_blob_sha===blob(F.oldAudit),'exact original 59-unit inventory predecessor SHA');
 test(q.exact_original_printed_equation_groups?.length===9&&a.source_first_locations?.length===59,'nine finite printed expression obligations within 59 source units');
 const seen=new Set();
 for(let i=0;i<9;i++){
  const row=q.exact_original_printed_equation_groups?.[i],loc=expectedLocations[i],eq=eqs[i];
  test(row?.source_location_id===loc&&!seen.has(loc),'unique exact-source original locator '+i);seen.add(row?.source_location_id);
  test(row?.original_equation===eq,'exact source Eq marker '+i);
  test(row?.explicit_source_coefficient_sequence?.join('|')===coeff[i].join('|'),'original sign/fraction sequence '+i);
  test(row?.source_locator?.length>1&&row?.page?.includes('PDF p'),'source-native printed PDF locator '+i);
  test(row?.provenance_modes?.includes('ORIGINAL_2010_V2_PDF_VISUALLY_INSPECTED')&&row?.provenance_modes?.includes('ARXIV_HTML_V2_INDEPENDENT_RENDITION_CROSSCHECK'),'two original-v2 renditions observed '+i);
  test(ids.includes(row?.existing_SSC_identity),'same existing L-only source identity '+i);
  const newrow=a.source_first_locations?.find(x=>x.source_location_id===loc);
  test(newrow?.disposition===EDIS&&newrow?.evidence_packet?.git_blob_sha===blob(F.packet),'exact expression evidence linked in original source inventory '+i);
 }
 test(expr(0).includes('(1/2)H_μ^{IJ}γ_{IJ}'),'H generator half and gamma carriers');
 const eq4=expr(1);
 test(eq4.includes('(1/32)ε^{μνρσ}')&&eq4.includes('=-(1/512)ε^{μνρσ}')&&eq4.includes('Φ_{φχ MN}^{ψω KL}Φ_{ψω PQ}^{ικ MN}'),'Eq4 exact signed tensor double-binder source');
 const eq15=expr(2);
 test(eq15.includes('-(1/32)[ω⃗,Σ′₂]')&&eq15.includes('-(1/16)[e′⃗,T₂]')&&eq15.includes('+(1/16)[e′₁,e′⃗]'),'Eq15 separate gravitational operator carriers');
 const eq16=expr(3);
 test(eq16.includes('−(3/32)e′₁φ³')&&eq16.includes('−(1/4)e′₁[A⃗,D₁φ]')&&eq16.includes('+(1/4)[e′⃗φ,F_A₂]'),'Eq16 source sign/terms pre-ansatz');
 test(expr(4)===expr(7),'Eq17 and Eq22 same expression but distinct original occurrences');
 const eq23=expr(8);
 test(eq23.includes('φ^-D⃗D₁φ')&&eq23.includes('−φ^-[e⃗φ,F_A₂]')&&!eq23.includes('φ^-1'),'source Eq23 literal superscript minus not unsupported inverse normalization');
 test(q.relation_evidence?.some(x=>x.id==='SOURCE_EQ23_MINUS_NOT_DEFINED'&&x.status==='SOURCE_NOTATION_MEANING_UNRESOLVED_PRESERVE_LITERAL'&&x.author_typo_claim===false),'unresolved author minus modality not repaired');
 test(q.relation_evidence?.some(x=>x.id==='SOURCE_EQ23_MINUS_NOT_DEFINED'&&x.invalid_reinterpretation==='φ^(-1)'),'negative interpretation anti-alias');
 test(q.remaining_boundary?.original_source_content_exhaustive_external_cold_verification_pass===false&&q.stage_locks?.G0_open===true&&q.stage_locks?.G1_authorized===false,'no premature stage or original source cold proof');
 test(a.predecessor_audit?.git_blob_sha===blob(F.oldAudit)&&a.reconciled_original_expression_packet?.git_blob_sha===blob(F.packet),'exact preserved predecessor/print packet');
 test(a.schema==='isograph.track-L.G0.L02-original-source-first-bidirectional-audit.v0.3'&&a.stage==='G0'&&a.stage_locks?.G0_open===true&&a.stage_locks?.source_census_frozen===false,'source inverse remains G0 scope');
 test(p.source_first_locations?.length===59&&a.source_first_locations?.length===59,'no location loss');
 let changed=[];for(let i=0;i<59;i++){const old=p.source_first_locations[i],now=a.source_first_locations[i];test(now?.source_location_id===old?.source_location_id,'source order '+i);if(JSON.stringify(now)!==JSON.stringify(old))changed.push(now?.source_location_id);if(!expectedLocations.includes(now?.source_location_id))test(JSON.stringify(now)===JSON.stringify(old),'50 original nonreconstructed locations verbatim conserved '+i);}
 test(changed.join(',')===expectedLocations.join(','),'exactly nine original print-evidence inventory updates');
 test(a.counts?.dispositions?.[PDIS]===0&&a.counts?.dispositions?.[EDIS]===9&&a.open_G0_original_formula_locations?.length===0,'all nine local formula groups reconciled without false cold source completion');
 test(a.reverse?.source_cold_complete===false&&a.reverse?.source_to_SSC_full_exact_fidelity_PASS===false&&a.reverse?.SSC_to_source_full_exact_fidelity_PASS===false,'do not promote whole-source PDF fidelity');
 test(b.schema==='woit-lisi.track-l.source-semantic-census.v0.52'&&n.schema==='woit-lisi.track-l.source-semantic-census.v0.53'&&b.items?.length===191&&n.items?.length===191,'original 191 SSC records conserved');
 test(n.predecessor?.git_blob_sha===blob(F.before)&&n.revision?.source_packet?.git_blob_sha===blob(F.audit)&&n.revision?.original_equation_packet?.git_blob_sha===blob(F.packet),'exact v0.53 ancestor packet hashes');
 let changedSSC=[];for(let i=0;i<191;i++){test(b.items[i]?.id===n.items[i]?.id,'SSC identity at '+i);if(JSON.stringify(b.items[i])!==JSON.stringify(n.items[i]))changedSSC.push(n.items[i].id);}
 test(changedSSC.join(',')===ids.join(',')&&n.revision?.unchanged_source_items===187,'four source-fidelity updates; 187 original records verbatim conserved');
 const body=id=>n.items.find(x=>x.id===id)?.body||'';
 test(body('L-SSC-051').includes('H=dx^μ(1/2)H_μ^{IJ}γ_{IJ}')&&body('L-SSC-053').includes('−(1/512)ε^{μνρσ}'),'source generator and Phi tensor exact clauses preserved');
 test(body('L-SSC-059').includes('−3/32')&&body('L-SSC-059').includes('Eq17')&&body('L-SSC-060').includes('φ^-')&&body('L-SSC-060').includes('Eq22'),'L02 dynamic source equations faithfully extended');
 for(const id of ids){const link=n.items.find(x=>x.id===id)?.source_expression_census?.L02_SOURCE_PRINTED_EXACT_NINE_0_1;test(link?.evidence_packet?.git_blob_sha===blob(F.packet)&&link?.source_inverse?.git_blob_sha===blob(F.audit)&&link?.author_model_math_qualified===false,'four scoped source-evidence pointers '+id);}
 test(t.schema==='lisi.full-treatment.source-traversal-ledger.v0.16'&&t.predecessor==='SOURCE_TRAVERSAL_LEDGER_0_15.json'&&t.complete_sources===0&&t.sources?.length===6&&t.sources.every(x=>x.current_complete===false),'six G0 sources not falsely frozen');
 test(t.current_census?.git_blob_sha===blob(F.after)&&t.current_L02_source_first_inventory?.git_blob_sha===blob(F.audit)&&t.L02_printed_equation_reconstruction?.git_blob_sha===blob(F.packet),'traversal three source parents pinned');
 test(g.schema==='isograph.exp062-l-current-stage-gate.v0.74'&&g.stage==='G0'&&g.semantic_authority===false&&g.status.endsWith('OPEN_UNFROZEN'),'G0 procedural successor only');
 test(g.predecessor_gate?.git_blob_sha===blob(F.oldGate)&&g.current_source_census?.git_blob_sha===blob(F.after)&&g.source_traversal?.git_blob_sha===blob(F.tr)&&g.source_first_L02_packet?.git_blob_sha===blob(F.audit),'gate exact ancestry');
 test(g.L02_printed_equations?.git_blob_sha===blob(F.packet)&&g.source_verifier?.git_blob_sha===blob(F.self),'exact source literals and verifier gate pinned');
 test(g.retained_source_first_success_CI?.run_id===38027565977&&g.retained_source_first_success_CI?.head_sha==='ccbf6a48f0a52d65aa7c8b1d2f85e31e1ff62d0c','previous 31-hostile successful CI provenance exact');
 test(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.independent_complete_original_pdf_review_passed===false,'new source CI not predetermined success');
 test(g.current_lawful_state?.source_census_complete===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.NEI_pass_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false,'no downstream stage premature promotion');
 return err;
}
const errs=verify(packet,before,after,prev,audit,trav,gate);
const hostile=[
 ['drop_exact_eq',(q)=>q.exact_original_printed_equation_groups.pop()],
 ['duplicate_exact_id',(q)=>q.exact_original_printed_equation_groups[1].source_location_id='L02-S010'],
 ['drop_eq4_binder',(q)=>q.exact_original_printed_equation_groups[1].normalized_original_printed_expression='scalar'],
 ['swap_eq4_sign',(q)=>q.exact_original_printed_equation_groups[1].normalized_original_printed_expression=q.exact_original_printed_equation_groups[1].normalized_original_printed_expression.replace('=-(1/512)','=+(1/512)')],
 ['switch_eq16_frame',(q)=>q.exact_original_printed_equation_groups[3].normalized_original_printed_expression=q.exact_original_printed_equation_groups[3].normalized_original_printed_expression.replaceAll('e′','e')],
 ['rewrite_phi_minus_to_inverse',(q)=>q.exact_original_printed_equation_groups[8].normalized_original_printed_expression=q.exact_original_printed_equation_groups[8].normalized_original_printed_expression.replaceAll('φ^-','φ^-1')],
 ['erase_negative_phi_evidence',(q)=>q.relation_evidence=q.relation_evidence.filter(x=>x.id!=='SOURCE_EQ23_MINUS_NOT_DEFINED')],
 ['erase_second_eq_ym_occurrence',(q)=>q.exact_original_printed_equation_groups[7].original_equation=17],
 ['tamper_original_revision',(q)=>q.source.revision='arXiv:1004.4866v1'],
 ['forge_primary_pdf_digest',(q)=>q.source.pdf_binary_sha_verified=true],
 ['pretend_external_review',(q)=>q.source.qualified_external_independent_human_cold_review=true],
 ['drop_original_l02_group',(q,b,n,p,a)=>a.source_first_locations.pop()],
 ['erase_one_exact_source_disposition',(q,b,n,p,a)=>a.source_first_locations.find(x=>x.source_location_id==='L02-S031').disposition=PDIS],
 ['invent_original_source_pass',(q,b,n,p,a)=>a.reverse.source_cold_complete=true],
 ['change_unrelated_original_location',(q,b,n,p,a)=>a.source_first_locations[0].original_source_locator='fabricated'],
 ['splice_W_identity',(q,b,n,p,a)=>a.source_first_locations[0].SSC_ids.push('W-SSC-901')],
 ['change_unrelated_SSC_record',(q,b,n)=>n.items.find(x=>x.id==='L-SSC-121').body+=' changed'],
 ['erase_eq23_unknown_from_SSC',(q,b,n)=>n.items.find(x=>x.id==='L-SSC-060').body='solved inverse'],
 ['invent_new_SSC_record',(q,b,n)=>n.items.push(n.items[0])],
 ['forge_parent_ancestor',(q,b,n)=>n.predecessor.git_blob_sha='FALSE'],
 ['promote_six_complete',(q,b,n,p,a,t)=>t.sources[0].current_complete=true],
 ['replace_source_packet_hash',(q,b,n,p,a,t)=>t.L02_printed_equation_reconstruction.git_blob_sha='FALSE'],
 ['promote_G1',(q,b,n,p,a,t,g)=>g.current_lawful_state.G1_authorized=true],
 ['promote_DP',(q,b,n,p,a,t,g)=>g.current_lawful_state.DP_pass_authorized=true],
 ['forge_gate_parent',(q,b,n,p,a,t,g)=>g.predecessor_gate.git_blob_sha='FALSE'],
 ['forge_verifier_parent',(q,b,n,p,a,t,g)=>g.source_verifier.git_blob_sha='FALSE'],
 ['pretend_CI_pass',(q,b,n,p,a,t,g)=>g.source_CI.status='SUCCESS'],
 ['erase_initial_destructive_mutant_failure',(q,b,n,p,a,t,g)=>g.original_source_printed_CI_failure.run_id=0]
];let killed=0;
for(const [name,mutation] of hostile){
 const clones=[packet,before,after,prev,audit,trav,gate].map(x=>JSON.parse(JSON.stringify(x)));
 mutation(...clones);
 if(verify(...clones).length)killed++;else errs.push('HOSTILE_ESCAPED '+name);
}
console.log(JSON.stringify({schema:'isograph.L.G0.L02.nine-original-source-expression-verification.v0.1',pass:errs.length===0,errors:errs,exact_printed_source_groups:9,unchanged_source_groups:50,source_items:191,unchanged_SSC_full_records:187,printed_phi_minus_unresolved:true,hostiles_defined:hostile.length,hostiles_rejected:killed,original_whole_pdf_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(errs.length)process.exitCode=1;
