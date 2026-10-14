#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const root='experiments/062/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blobHash=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const clone=x=>structuredClone(x);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const M=read(root+'W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_5.json');
for(const [key,pin] of Object.entries(M.pins))assert.equal(blobHash(pin.path),pin.git_blob_sha,'stale input '+key);
const old66=read(M.pins.old66.path);
const SSC=read(M.pins.ssc.path);
const O=read(M.pins.printed.path);
const Reg=read(M.pins.reg.path);
const Cov=read(M.pins.review.path);
const Gate=read(M.pins.gate.path);
const Unit=read(M.pins.unit.path);
const Previous=read(M.historical_predecessor_convergence.path);
assert.equal(blobHash(M.historical_predecessor_convergence.path),M.historical_predecessor_convergence.git_blob_sha,'historical 0.4 manifest not conserved');
const sourceOld=read('experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_52.json');
const coverageOld=read('experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_51.json');
const expected=[
 ['F-LAPLACE-01','W-SSC-082','W04E-082-08','SOURCE_FOURIER_INVERSION_AND_SCHWINGER_LAPLACE_CHAIN',3,[78,102]],
 ['F-KG-04','W-SSC-082','W04E-082-09','SOURCE_RELATIVISTIC_COMPLEX_SCALAR_FREQUENCY_FACTORIZATION',6,[209,232]],
 ['F-HYPERFUNCTION-01','W-SSC-122','W04E-122-05','SOURCE_HYPERFUNCTION_PAIR_CHIRAL_CONJUGATION',8,[302,306]],
 ['F-OS-LAPLACE-01','W-SSC-123','W04E-123-03','SOURCE_OS_LAPLACE_RECONSTRUCTION_INNER_PRODUCT_IDENTITY',8,[307,332]],
 ['F-PAULI-2D4D-01','W-SSC-085','W04E-085-03','SOURCE_TWO_DIMENSIONAL_TO_FOUR_DIMENSIONAL_CHIRAL_DIFFERENTIAL_OPERATOR_ANALOG',9,[355,369]]
];
const changes=['W-SSC-082','W-SSC-085','W-SSC-122','W-SSC-123'];
const stats=x=>x.items.reduce((sum,z)=>sum+(z.source_expression_census?.statements?.length||0),0);
const texts=x=>x.items.flatMap(z=>z.source_expression_census?.statements||[]);
const lookup=(x,id)=>x.items.find(z=>z.id===id);
function validate(w){
 const {s,old,src,reg,cov,gate,unit,m,prev,regOld,covOld}=w;
 assert.equal(src.schema,'isograph.exp062-W04e-source-first-formula-and-binder-coverage.v0.1');
 assert.equal(src.source.original_oct03_bytes_verified,false);
 assert.equal(src.source.original_oct03_sha256,'UNRECOVERED');
 assert.equal(src.stats.new_source_atoms,5);
 assert.equal(src.stats.source_first_rows,24);
 assert.equal(src.source_first_missing_atoms.length,5);
 assert.equal(src.already_represented_or_evidence_index_only.length,19);
 assert.equal(s.schema,'woit.source-semantic-census.v0.67');
 assert.equal(s.source_count,9);
 assert.equal(s.items.length,151);
 assert.equal(new Set(s.items.map(z=>z.id)).size,151);
 assert.equal(stats(old),526);
 assert.equal(stats(s),531);
 assert.equal(texts(s).length,531);
 assert.equal(new Set(texts(s).map(x=>x.id)).size,529);
 assert.deepEqual(s.items.filter((z,i)=>!same(z,old.items[i])).map(z=>z.id),changes);
 assert.equal(s.predecessor.git_blob_sha,m.pins.old66.git_blob_sha);
 assert.deepEqual(s.correction.changed_W_ids,changes);
 assert.equal(s.correction.other147_full_predecessor_objects_unchanged,true);
 assert.equal(s.correction.oct03_frozen_raw_bytes_authenticated,false);
 assert.equal(s.correction.G0_frozen,false);
 assert.equal(s.correction.G1_authorized,false);
 assert.ok(s.items.every((z,i)=>changes.includes(z.id)||same(z,old.items[i])));
 assert.deepEqual(src.source_first_missing_atoms.map(x=>x.typed),expected.map(x=>x[2]));
 for(const [loc,owner,typed,kind,page,lines] of expected){
  const original=src.source_first_missing_atoms.find(z=>z.key===loc);
  assert.ok(original,'new original-source evidence missing '+loc);
  assert.equal(original.owner,owner);
  assert.equal(original.typed,typed);
  assert.equal(original.kind,kind);
  assert.equal(original.page,page);
  assert.deepEqual(original.original_pdf_text_lines,lines);
  assert.equal(typeof original.modality,'string');
  assert.ok(original.modality.length>12);
  const record=lookup(s,owner);
  const typedRecord=(record.source_expression_census?.statements||[]).find(z=>z.id===typed);
  assert.ok(typedRecord,'source first atom not typed: '+typed);
  assert.equal(typedRecord.owner,owner);
  assert.equal(typedRecord.kind,kind);
  assert.deepEqual(typedRecord.source_exact,original.source_exact);
  assert.equal(typedRecord.source_modality,original.modality);
  assert.equal(typedRecord.source_locator.original_source_locator,loc);
  assert.equal(typedRecord.source_locator.printed_pdf_page,page);
  assert.equal(typedRecord.source_locator.pdf_index,original.pdf_index);
  assert.deepEqual(typedRecord.source_locator.source_line_span,lines);
  assert.equal(typedRecord.source_locator.october_03_2026_original_bytes_verified,false);
  assert.equal(typedRecord.scope,'W04E_JUL14_AVAILABLE_AUTHOR_REVISION_NO_AUTHENTICATED_OCT03_RAW_BYTES');
  assert.equal(typedRecord.guard,original.guard);
  assert.equal(typedRecord.source_first_frozen_oracle.git_blob_sha,m.pins.printed.git_blob_sha);
 }
 const F=(id)=>texts(s).find(y=>y.id===id).source_exact;
 // Independent source-first literals, fixed in the checker rather than
 // generated by reading whichever current SSC claims to be authoritative.
 assert.equal(F('W04E-082-08').FT,'Wtilde2(E) = (1/(2*pi))*integral_R exp(i*t*E)*W2(t) dt');
 assert.equal(F('W04E-082-08').complex_inverse,'W2(z) = integral_R exp(-i*z*E)*Wtilde2(E) dE');
 assert.equal(F('W04E-082-08').Schwinger,'S2(tau)=W2(-i*tau)=integral_0_to_infinity exp(-tau*E)*Wtilde2(E) dE');
 assert.equal(F('W04E-082-08').spectrum_side_condition,'Wtilde2 support E>=0');
 assert.equal(F('W04E-082-09').ordered_operator,'(-d2_dt2-omega^2)*psi=(i*d_dt+omega)*(i*d_dt-omega)*psi=0');
 assert.equal(F('W04E-082-09').frequency,'omega=sqrt(|p|^2+m^2)');
 assert.equal(F('W04E-082-09').second_annihilator,'b');
 assert.equal(F('W04E-082-09').real_field_restriction,'b=a');
 assert.deepEqual(F('W04E-122-05').domains,['F_plus holomorphic on upper half plane','F_minus holomorphic on lower half plane']);
 assert.equal(F('W04E-122-05').map_from,'[F(z),0]');
 assert.equal(F('W04E-122-05').map_to,'[0,overline(F(overline(z)))]');
 assert.equal(F('W04E-123-03').positive_time_test_space,'S_plus(R)');
 assert.equal(F('W04E-123-03').OS_form,'<f,g>_OS=S2(Theta(f),g)');
 assert.equal(F('W04E-123-03').spectral_integral,'integral_R overline(Lf(E))*Lg(E)*Wtilde2(E) dE');
 assert.equal(F('W04E-123-03').conclusion,'<f,g>_OS=<Lf,Lg>');
 assert.deepEqual(F('W04E-123-03').premises,['FREE_FIELD_EXAMPLE','SCHWINGER_FROM_LAPLACE_WIGHTMAN','REFLECTION_POSITIVITY']);
 assert.equal(F('W04E-085-03').analogue,'sum_{j=1}^3 sigma_j*partial_{x_j}');
 assert.equal(F('W04E-085-03').source_operator,'partial_x');
 assert.deepEqual(F('W04E-085-03').chiral_coordinates,['x_R=x-t','x_L=x+t']);
 assert.equal(texts(s).find(y=>y.id==='W04E-085-03').source_modality,
 'SOURCE_ANALOGY_NOT_IDENTIFICATION_OF_TWO_AND_FOUR_DIMENSIONAL_THEORIES');
 assert.ok(lookup(s,'W-SSC-082').obligation.includes('Eq. (4)'));
 assert.ok(lookup(s,'W-SSC-122').obligation.includes('[F(z),0]'));
 assert.ok(lookup(s,'W-SSC-123').obligation.includes('⟨ℒf,ℒg⟩'));
 assert.ok(lookup(s,'W-SSC-085').obligation.includes('operator substitution'));
 // Preserve all distinct original-source location → SSC crosswalk records
 // and exact current SSC → previously independent versioned original spans.
 assert.equal(m.versioned_original_source_to_ssc.length,437);
 assert.deepEqual(m.versioned_original_source_to_ssc,prev.versioned_original_source_to_ssc);
 assert.deepEqual(m.original_navigation_anchors,prev.original_navigation_anchors);
 assert.equal(m.counters.versioned_source_first_load_bearing_intervals,268);
 assert.equal(m.counters.versioned_source_first_load_bearing_ownerless,0);
 assert.equal(m.counters.versioned_original_bidirectional_ssc_items,91);
 assert.equal(m.counters.current_ssc_items,151);
 assert.equal(m.counters.current_typed_statement_incidences,531);
 assert.equal(m.counters.distinct_statement_ids,529);
 assert.equal(m.counters.frozen_mutable_oct03_exact_bytes_unverified,6);
 assert.equal(m.current_W04e_printed_source_formula_repair.audit.git_blob_sha,m.pins.printed.git_blob_sha);
 const byId=new Map(s.items.map(z=>[z.id,z]));
 assert.equal(m.current_ssc_to_original_or_review.length,151);
 assert.equal(reg.rows.length,151);
 assert.equal(cov.rows.length,151);
 for(let i=0;i<151;i++){
  const rec=s.items[i],rr=reg.rows[i],cr=cov.rows[i],inv=m.current_ssc_to_original_or_review[i];
  assert.equal(rr.census_id,rec.id);
  assert.equal(cr.census_id,rec.id);
  assert.equal(inv.ssc_id,rec.id);
  assert.equal(rr.source_body_exact,rec.obligation);
  assert.equal(rr.source_expression_statement_count,rec.source_expression_census?.statements?.length||0);
  assert.equal(cr.body_length_chars,rec.obligation.length);
  assert.equal(cr.source_expression_statement_count,rec.source_expression_census?.statements?.length||0);
  assert.deepEqual(inv.typed_statement_ids,(rec.source_expression_census?.statements||[]).map(z=>z.id));
  assert.deepEqual(inv.review_locator,cr.source_locator_this_review);
  if(!changes.includes(rec.id)){
   assert.deepEqual(rr,regOld.rows[i],'unaffected register row rewritten '+rec.id);
   assert.deepEqual(cr,covOld.rows[i],'unaffected source review row rewritten '+rec.id);
  }
 }
 assert.equal(reg.current_round.other147_full_source_objects_conserved,true);
 assert.equal(cov.current_round.all_other147_object_meaning_conserved,true);
 assert.equal(reg.current_round.added_source_incidences,5);
 assert.equal(cov.current_round.new_typed_incidences,5);
 assert.equal(unit.summary.structured_incidences,531);
 assert.equal(unit.summary.other147_exact,true);
 assert.equal(unit.units.find(z=>z.unit==='W04e').structured_incidences,41);
 assert.equal(unit.units.reduce((n,z)=>n+z.structured_incidences,0),531);
 assert.equal(unit.units.reduce((n,z)=>n+z.existing_items,0),151);
 assert.equal(gate.current_source_census.git_blob_sha,m.pins.ssc.git_blob_sha);
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,m.pins.reg.git_blob_sha);
 assert.equal(gate.current_source_coverage.git_blob_sha,m.pins.review.git_blob_sha);
 assert.equal(gate.current_W_nine_source_inventory_034.git_blob_sha,m.pins.unit.git_blob_sha);
 assert.equal(gate.current_W04e_source_printed_formula_inverse.audit.git_blob_sha,m.pins.printed.git_blob_sha);
 const legal=gate.current_lawful_state;
 assert.equal(legal.G0_open,true);
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','Oct03_mutable_source_byte_identity_verified','all_nine_source_full_reverse_assertion_enumeration_complete','source_semantic_omission_count_known_exact','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized','global_source_first_cold_audit_qualified'])
 assert.equal(legal[k],false,'illegal premature G0 closure/routing '+k);
 assert.equal(m.current_G0.open,true);
 assert.equal(m.current_G0.complete,false);
 assert.equal(m.current_G0.frozen,false);
 assert.equal(m.current_G0.G1_authorized,false);
 assert.equal(m.current_G0.source_provenance_complete,false);
 return {source_units:9,source_items:151,original_versioned_intervals:437,versioned_load_bearing:268,source_atoms:531,unique_typed:529,current_new_atoms:5,G0:'OPEN'};
}
const state={s:SSC,old:old66,src:O,reg:Reg,cov:Cov,gate:Gate,unit:Unit,m:M,prev:Previous,regOld:sourceOld,covOld:coverageOld};
const positive=validate(state);
const hostile=[
 ['wrong Fourier sign',w=>w.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-08').source_exact.FT='exp(-itE)'],
 ['wrong Laplace lower limit',w=>w.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-08').source_exact.Schwinger='integral_R'],
 ['reverse complex scalar ordered factor',w=>w.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-09').source_exact.ordered_operator='(i*d_dt-omega)*(i*d_dt+omega)'],
 ['silently drop second antiparticle oscillator',w=>w.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-09').source_exact.second_creator='a_dagger'],
 ['switch hyperfunction carriers',w=>w.s.items.find(z=>z.id==='W-SSC-122').source_expression_census.statements.find(z=>z.id==='W04E-122-05').source_exact.map_to='[F(z),0]'],
 ['remove hyperfunction conjugation',w=>w.s.items.find(z=>z.id==='W-SSC-122').source_expression_census.statements.find(z=>z.id==='W04E-122-05').source_exact.map_to='[0,F(z)]'],
 ['drop OS inner product Laplace link',w=>w.s.items.find(z=>z.id==='W-SSC-123').source_expression_census.statements.find(z=>z.id==='W04E-123-03').source_exact.conclusion='UNKNOWN'],
 ['replace conditional OS with universal theorem',w=>w.s.items.find(z=>z.id==='W-SSC-123').source_expression_census.statements.find(z=>z.id==='W04E-123-03').source_modality='PROVED_ALL_QFT'],
 ['lose chiral Pauli sum',w=>w.s.items.find(z=>z.id==='W-SSC-085').source_expression_census.statements.find(z=>z.id==='W04E-085-03').source_exact.analogue='sigma1*dx1'],
 ['upgrade source analogy to theory equivalence',w=>w.s.items.find(z=>z.id==='W-SSC-085').source_expression_census.statements.find(z=>z.id==='W04E-085-03').source_modality='EQUIVALENT_THEORY'],
 ['co-corrupt oracle and SSC Fourier normalization',w=>{
   w.src.source_first_missing_atoms[0].source_exact.FT='Wtilde2(E)=integral_R e^(itE)*W2(t)dt';
   w.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-08').source_exact.FT='Wtilde2(E)=integral_R e^(itE)*W2(t)dt';}],
 ['remove source-first original formula location',w=>w.src.source_first_missing_atoms.splice(2,1)],
 ['invent frozen Oct3 bytes in original oracle',w=>w.src.source.original_oct03_bytes_verified=true],
 ['lie about historical byte recovery in stage',w=>w.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['unjustified G1 stage authorization',w=>w.gate.current_lawful_state.G1_authorized=true],
 ['erase previously fixed versioned original source',w=>w.m.versioned_original_source_to_ssc.pop()],
 ['rewrite unrelated SSC item',w=>w.s.items.find(z=>z.id==='W-SSC-047').obligation+='FORGED'],
 ['rewrite other track identity',w=>w.s.items.find(z=>z.id==='W-SSC-047').source='L01'],
 ['drop 151 inverse owner row',w=>w.m.current_ssc_to_original_or_review.pop()],
 ['falsify scope comparator',w=>w.m.current_G0.source_provenance_complete=true],
 ['alter current W04e typed count',w=>w.unit.units.find(z=>z.unit==='W04e').structured_incidences--],
 ['delete one checked source-expression typed ID',w=>w.s.items.find(z=>z.id==='W-SSC-123').source_expression_census.statements.pop()],
 ['silently mutate unchanged register',w=>w.reg.rows.find(z=>z.census_id==='W-SSC-047').source_body_exact='FORGED'],
 ['promote current source to original oct03 within typed atom',w=>w.s.items.find(z=>z.id==='W-SSC-122').source_expression_census.statements.find(z=>z.id==='W04E-122-05').source_locator.october_03_2026_original_bytes_verified=true]
];
let rejected=0;
for(const [name,mutate] of hostile){
 const x=clone(state),before=JSON.stringify(x);
 mutate(x);
 assert.notEqual(JSON.stringify(x),before,'inert hostile mutation '+name);
 try{validate(x);}catch(e){rejected++;continue;}
 throw new Error('ADVERSARIAL_ESCAPE '+name);
}
assert.equal(rejected,hostile.length);
console.log('W G0 source-first original formula & bidirectional preservation PASS '+JSON.stringify(positive));
console.log('Adversarial controls rejected '+rejected+'/'+hostile.length);
console.log('Historical Oct03 W03/W04 original bytes unavailable; all-nine independent source completeness unqualified; G0 remains OPEN and G1–G7 prohibited.');
