#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const raw=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+raw.length+'\0'),raw])).digest('hex');};
const clone=x=>JSON.parse(JSON.stringify(x));
const M=read('experiments/062/W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_7.json');
for(const [k,pin] of Object.entries(M.pins))assert.equal(blob(pin.path),pin.git_blob_sha,'unverifiable source pin '+k);
assert.equal(blob(M.historical_predecessor_convergence.path),M.historical_predecessor_convergence.git_blob_sha,'historical convergence pin rewritten');
const st={
 m:M,ssc:read(M.pins.ssc.path),old:read(M.pins.old67.path),oracle:read(M.pins.S52.path),
 reg:read(M.pins.reg.path),cov:read(M.pins.review.path),unit:read(M.pins.unit.path),
 gate:read(M.pins.gate.path),before:read(M.historical_predecessor_convergence.path),
 regBefore:read('experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_53.json'),
 covBefore:read('experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_52.json')
};
const original=[
 ['W04E-S52-HEAD',12,11,551,551,false,null],
 ['W04E-S52-QP',12,11,552,562,true,'W04E086-E03'],
 ['W04E-S52-OCS',12,11,563,569,true,'W04E086-E03'],
 ['W04E-S52-ZSPIN',12,11,570,573,true,'W04E086-E03'],
 ['W04E-S52-HK',13,12,574,577,true,'W04E086-E04'],
 ['W04E-S52-S4',13,12,578,591,true,'W04E086-E04'],
 ['W04E-S52-ASD',13,12,592,595,true,'W04E086-E04']
];
const literal=[
 {id:'W04E086-E03',source_page:12,text:[552,573],
  kind:'SOURCE_EUCLIDEAN_QUATERNIONIC_TWISTOR_MODEL_ORTHOGONAL_COMPLEX_STRUCTURE_BUNDLE',
  carrier:'T=C4=H2',base:'HP1=S4',realDimension:4,
  quotient:'SO(4)/U(2)=CP1',total:6,spin:'Z(M)=P(S_R)',spinCondition:'M_IS_SPIN',
  sources:['W04E-S52-QP','W04E-S52-OCS','W04E-S52-ZSPIN']},
 {id:'W04E086-E04',source_page:13,text:[574,595],
  kind:'SOURCE_CONDITIONAL_HYPERKAEHLER_S4_AND_ASD_COMPLEX_TWISTOR_CASES',
  hyperkahler:'Z(M)=M×CP1',s4:'Z(S4)=CP3',asdiv:'M_HAS_ANTI_SELF_DUAL_CURVATURE',
  baseComplex:false,totalComplex:true,
  sources:['W04E-S52-HK','W04E-S52-S4','W04E-S52-ASD']}
];
const stats=x=>x.items.reduce((n,z)=>n+(z.source_expression_census?.statements||[]).length,0);
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function verify(d) {
 const {m,ssc:s,old,oracle:o,reg,cov,unit,gate,before,regBefore,covBefore}=d;
 assert.equal(o.schema,'isograph.exp062-W04e-original-first-euclidean-twistor-S52-v0.1');
 assert.equal(o.track,'W');
 assert.equal(o.source.original_oct03_page_bytes_authenticated,false);
 assert.equal(o.source.original_oct03_digest,'UNRECOVERED');
 assert.equal(o.source_first_method.includes('Direct original external author PDF'),true);
 assert.equal(o.coverage_intervals.length,7);
 assert.deepEqual(o.source.original_pdf_text_lines,[551,595]);
 assert.equal(o.convergence.source_locations,7);
 assert.equal(o.convergence.original_source_load_bearing_sublocations,6);
 assert.equal(o.convergence.new_typed_source_assertions,2);
 let next=551,load=0,excluded=0;
 for(let i=0;i<original.length;i++){
   const [id,page,index,first,last,bearing,typed]=original[i];
   const item=o.coverage_intervals[i];
   assert.equal(item.source_locator,id,'original first physical source interval identity');
   assert.equal(item.printed_page,page,'page number corrupt '+id);
   assert.equal(item.pdf_index,index,'physical PDF page corrupt '+id);
   assert.deepEqual(item.lines,[first,last],'original HTML/PDF source text line span changed '+id);
   assert.equal(item.lines[0],next,'source partition GAP/OVERLAP '+id);
   assert.ok(item.lines[1]>=next);
   next=item.lines[1]+1;
   const bounds=page===12?[551,573]:[574,595];
   assert.ok(first>=bounds[0]&&last<=bounds[1]);
   if(bearing){
    load++;
    assert.equal(item.disposition,'LOAD_ORIGINAL_SOURCE');
    assert.deepEqual(item.ssc_ids,['W-SSC-086']);
    assert.equal(item.typed_id,typed);
   }else{
    excluded++;
    assert.equal(item.disposition,'NONLOAD_HEADING');
    assert.deepEqual(item.ssc_ids,[]);
   }
   assert.ok(item.source_semantics?.length>40);
 }
 assert.equal(next,596);
 assert.deepEqual([load,excluded],[6,1]);
 assert.equal(s.schema,'woit.source-semantic-census.v0.68');
 assert.equal(s.source_count,9);
 assert.equal(s.items.length,151);
 assert.equal(stats(old),531);
 assert.equal(stats(s),533);
 assert.equal(new Set(s.items.map(x=>x.id)).size,151);
 const oldTyped=old.items.flatMap(x=>x.source_expression_census?.statements||[]);
 const newTyped=s.items.flatMap(x=>x.source_expression_census?.statements||[]);
 assert.equal(new Set(oldTyped.map(x=>x.id)).size,529);
 assert.equal(new Set(newTyped.map(x=>x.id)).size,531);
 assert.deepEqual(s.items.filter((x,i)=>!eq(x,old.items[i])).map(x=>x.id),['W-SSC-086']);
 assert.equal(s.predecessor.git_blob_sha,m.pins.old67.git_blob_sha);
 assert.deepEqual(s.correction.changed_W_ids,['W-SSC-086']);
 assert.equal(s.correction.unchanged_other150_source_objects_exact,true);
 assert.equal(s.correction.source_first.git_blob_sha,m.pins.S52.git_blob_sha);
 assert.equal(s.correction.G0_frozen,false);
 assert.equal(s.correction.G1_authorized,false);
 const record=s.items.find(x=>x.id==='W-SSC-086');
 assert.equal(record.source,'W04e notes');
 assert.equal(record.source_expression_census.statements.length,4);
 for(const q of literal){
  const source=record.source_expression_census.statements.find(x=>x.id===q.id);
  assert.ok(source,'missing explicit Euclidean W04e author source atom '+q.id);
  assert.equal(source.owner,'W-SSC-086');
  assert.equal(source.kind,q.kind);
  assert.deepEqual(source.source_sub_loci,q.sources);
  assert.equal(source.source_locator.printed_pdf_page,q.source_page);
  assert.equal(source.source_locator.pdf_index,q.source_page-1);
  assert.deepEqual(source.source_locator.original_pdf_text_lines,q.text);
  assert.equal(source.source_locator.october_03_frozen_original_bytes_authenticated,false);
  assert.equal(source.source_first_oracle.git_blob_sha,m.pins.S52.git_blob_sha);
  assert.equal(source.source_assertion_author,'Peter Woit');
  assert.ok(source.modality.startsWith('SOURCE_')||source.modality.startsWith('WOIT_'));
  if(q.id==='W04E086-E03'){
    assert.equal(source.twistor_carrier.source_equality,q.carrier);
    assert.equal(source.twistor_carrier.base,q.base);
    assert.equal(source.complex_structure_family.real_dimension,q.realDimension);
    assert.equal(source.complex_structure_family.source_group_quotient,q.quotient);
    assert.equal(source.complex_structure_family.unique_canonical_tangent_J_claim,false);
    assert.equal(source.twistor_bundle.real_total_dimension,q.total);
    assert.equal(source.twistor_bundle.spin_projectivization,q.spin);
    assert.equal(source.twistor_bundle.spin_condition,q.spinCondition);
    assert.equal(source.twistor_bundle.fiber_role,'TANGENT_ORTHOGONAL_COMPLEX_STRUCTURES');
  }else{
    assert.equal(source.cases.length,3);
    assert.equal(source.cases[0].condition,'M_HYPERKAEHLER');
    assert.equal(source.cases[0].source_relation,q.hyperkahler);
    assert.equal(source.cases[1].condition,'M_EQUALS_S4');
    assert.equal(source.cases[1].source_relation,q.s4);
    assert.equal(source.cases[1].base_complex_structure,q.baseComplex);
    assert.equal(source.cases[1].total_twistor_complex_structure,q.totalComplex);
    assert.equal(source.cases[2].condition,q.asdiv);
    assert.equal(source.cases[2].consequence,'Z(M)_IS_COMPLEX_MANIFOLD');
  }
 }
 assert.ok(record.obligation.includes('Z(M)=P(S_R)'));
 assert.ok(record.obligation.includes('Z(S⁴)=CP³'));
 assert.ok(record.obligation.includes('anti-self-dual curvature'));
 assert.deepEqual(m.versioned_original_source_to_ssc,before.versioned_original_source_to_ssc);
 assert.deepEqual(m.original_navigation_anchors,before.original_navigation_anchors);
 assert.equal(m.versioned_original_source_to_ssc.length,437);
 assert.equal(m.counters.versioned_source_first_load_bearing_intervals,268);
 assert.equal(m.counters.versioned_original_bidirectional_ssc_items,91);
 assert.equal(m.counters.current_ssc_items,151);
 assert.equal(m.counters.current_typed_statement_incidences,533);
 assert.equal(m.counters.distinct_statement_ids,531);
 assert.equal(m.counters.frozen_mutable_oct03_exact_bytes_unverified,6);
 assert.equal(m.current_W04e_Euclidean_S52_source_first.audit.git_blob_sha,m.pins.S52.git_blob_sha);
 assert.equal(m.current_ssc_to_original_or_review.length,151);
 assert.equal(reg.rows.length,151);
 assert.equal(cov.rows.length,151);
 for(let i=0;i<151;i++){
  const z=s.items[i],rr=reg.rows[i],cr=cov.rows[i],inv=m.current_ssc_to_original_or_review[i];
  assert.equal(rr.census_id,z.id);
  assert.equal(cr.census_id,z.id);
  assert.equal(inv.ssc_id,z.id);
  assert.equal(rr.source_body_exact,z.obligation);
  assert.equal(rr.source_expression_statement_count,(z.source_expression_census?.statements||[]).length);
  assert.equal(cr.body_length_chars,z.obligation.length);
  assert.equal(cr.source_expression_statement_count,(z.source_expression_census?.statements||[]).length);
  assert.deepEqual(inv.typed_statement_ids,(z.source_expression_census?.statements||[]).map(q=>q.id));
  assert.deepEqual(inv.review_locator,cr.source_locator_this_review);
  if(z.id!=='W-SSC-086'){
   assert.deepEqual(rr,regBefore.rows[i],'unaffected register item rewritten '+z.id);
   assert.deepEqual(cr,covBefore.rows[i],'unaffected coverage source item rewritten '+z.id);
  }
 }
 assert.equal(reg.current_round.other150_full_source_objects_conserved,true);
 assert.equal(cov.current_round.all_other150_object_meaning_conserved,true);
 assert.equal(unit.summary.other150_exact,true);
 assert.equal(unit.summary.structured_incidences,533);
 assert.equal(unit.units.find(x=>x.unit==='W04e').structured_incidences,43);
 assert.equal(unit.units.reduce((n,x)=>n+x.structured_incidences,0),533);
 assert.equal(unit.units.reduce((n,x)=>n+x.existing_items,0),151);
 assert.equal(gate.current_source_census.git_blob_sha,m.pins.ssc.git_blob_sha);
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,m.pins.reg.git_blob_sha);
 assert.equal(gate.current_source_coverage.git_blob_sha,m.pins.review.git_blob_sha);
 assert.equal(gate.current_W_nine_source_inventory_035.git_blob_sha,m.pins.unit.git_blob_sha);
 assert.equal(gate.current_W04e_S52_original_source_first.audit.git_blob_sha,m.pins.S52.git_blob_sha);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const key of ['G0_frozen','G0_complete','source_census_frozen','Oct03_mutable_source_byte_identity_verified','all_nine_source_full_reverse_assertion_enumeration_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized','global_source_first_cold_audit_qualified'])
 assert.equal(gate.current_lawful_state[key],false,'illegal G0 transition '+key);
 assert.equal(m.current_G0.open,true);
 assert.equal(m.current_G0.complete,false);
 assert.equal(m.current_G0.frozen,false);
 assert.equal(m.current_G0.G1_authorized,false);
 assert.equal(m.current_G0.source_provenance_complete,false);
 return {frozen_source_units:9,ssc_items:151,typed:533,unique_typed:531,new_source_atoms:2,original_section_intervals:7,original_section_semantic_intervals:6,versioned_original_intervals:437,G0:'OPEN'};
}
const positive=verify(st);
const mutate=[
 ['source first drop heading source denominator',x=>x.oracle.coverage_intervals.shift()],
 ['source span interior GAP',x=>x.oracle.coverage_intervals[3].lines[0]++],
 ['source span interior OVERLAP',x=>x.oracle.coverage_intervals[2].lines[1]++],
 ['source page mislabel',x=>x.oracle.coverage_intervals[4].printed_page=12],
 ['no original source owner for hyperkähler',x=>x.oracle.coverage_intervals[4].ssc_ids=[]],
 ['erase one original spin fiber',x=>x.oracle.coverage_intervals.splice(3,1)],
 ['wrong quaternionic twistor base',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[2].twistor_carrier.base='CP3'],
 ['invent canonical global orthogonal J',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[2].complex_structure_family.unique_canonical_tangent_J_claim=true],
 ['swap the spin projectivized carrier',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[2].twistor_bundle.spin_projectivization='P(S_L)'],
 ['remove spin condition',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[2].twistor_bundle.spin_condition='ALL_MANIFOLDS'],
 ['hyperkähler product becomes universal',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[3].cases[0].condition='ALL_M'],
 ['S4 base called complex',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[3].cases[1].base_complex_structure=true],
 ['ASD conditional removed',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[3].cases[2].condition='ALL_METRICS'],
 ['false completed physical theory',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[3].modality='PROVED_PHYSICAL_THEORY'],
 ['change source first and SSC together',x=>{x.oracle.coverage_intervals[6].source_semantics='ALL Riemannian M complex';x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[3].cases[2].condition='ALL_METRICS'}],
 ['erase typed E03',x=>x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements.splice(2,1)],
 ['coedit author semantics with stored oracle',x=>{x.oracle.coverage_intervals[3].typed_id='FAKE';x.ssc.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements[2].id='FAKE'}],
 ['promote present author PDF into Oct3 bytes',x=>x.oracle.source.original_oct03_page_bytes_authenticated=true],
 ['lie that source revision resolved in stage',x=>x.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['incorrect stage transition G1',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['wrong source corpus scope',x=>x.ssc.source_count=8],
 ['erase another unrelated W author source',x=>x.ssc.items.find(z=>z.id==='W-SSC-028').obligation+=' altered'],
 ['inject L semantics',x=>x.ssc.items[0].source='L01'],
 ['erase original versioned W01 partition',x=>x.m.versioned_original_source_to_ssc.pop()],
 ['erase one of 151 current inverse',x=>x.m.current_ssc_to_original_or_review.pop()],
 ['mutate a historical identical source item in register',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-024').source_body_exact='MUTATED'],
 ['force G0 as frozen',x=>x.m.current_G0.frozen=true]
];
let rejected=0;
for(const [name,fn] of mutate){const x=clone(st),before=JSON.stringify(x);fn(x);assert.notEqual(JSON.stringify(x),before,'inert hostile '+name);try{verify(x);}catch(e){rejected++;continue;}throw Error('ADVERSARIAL_ESCAPE '+name)}
assert.equal(rejected,mutate.length);
console.log('W original-author Euclidean twistor §5.2 source-first inverse PASS '+JSON.stringify(positive));
console.log('Hostile controls rejected '+rejected+'/'+mutate.length);
console.log('Exact 2026-10-03 W03/W04 source bytes and global nine-source independent completeness remain OPEN; G1–G7 unauthorized.');
