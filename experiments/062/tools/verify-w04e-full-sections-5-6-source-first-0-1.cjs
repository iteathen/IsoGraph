#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitblob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const clone=x=>JSON.parse(JSON.stringify(x));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const M=load('experiments/062/W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_8.json');
for(const [k,pin] of Object.entries(M.pins))assert.equal(gitblob(pin.path),pin.git_blob_sha,'stale source/provenance git blob '+k);
assert.equal(gitblob(M.historical_predecessor_convergence.path),M.historical_predecessor_convergence.git_blob_sha);
const d={m:M,s:load(M.pins.ssc.path),old:load(M.pins.old68.path),src:load(M.pins.S56.path),reg:load(M.pins.reg.path),cov:load(M.pins.review.path),unit:load(M.pins.unit.path),gate:load(M.pins.gate.path),pre:load(M.historical_predecessor_convergence.path),oldreg:load('experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_54.json'),oldcov:load('experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_53.json'),s52:load('experiments/062/W04E_G0_S52_EUCLIDEAN_TWISTOR_ORIGINAL_FIRST_0_1.json')};
const oldMath=[
 [471,472,11,'H'],[473,481,11,'C'],[482,495,11,'C'],[496,503,11,'C'],
 [504,509,11,'R'],[510,513,11,'R'],[514,520,12,'R'],[521,521,12,'H'],
 [522,530,12,'C'],[531,550,12,'C'],[551,551,12,'H'],
 [552,562,12,'C'],[563,569,12,'C'],[570,573,12,'C'],
 [574,577,13,'C'],[578,591,13,'C'],[592,595,13,'C'],[596,596,13,'H'],
 [597,603,13,'C'],[604,617,13,'R'],[618,621,13,'C'],[622,627,13,'P'],
 [628,628,13,'H'],[629,631,13,'A'],[632,633,13,'C'],[634,638,14,'C'],
 [639,639,14,'C'],[640,642,14,'R'],[643,646,14,'R']
];
const s52Ids=['W04E-S52-HEAD','W04E-S52-QP','W04E-S52-OCS','W04E-S52-ZSPIN','W04E-S52-HK','W04E-S52-S4','W04E-S52-ASD'];
const fixedNovel=[
 ['W04E086-E05','W-SSC-086','SOURCE_COMPLEX_CONFORMAL_TWISTOR_HALF_SPINOR_AND_GRASSMANNIAN_POINT_CARRIER',['W04E-S56-05','W04E-S56-06','W04E-S56-07']],
 ['W04E087-E03','W-SSC-087','SOURCE_DIRECT_PT_HOLOMORPHIC_CARRIER_VS_CP1_LINE_SPACE_DISTINCTION',['W04E-S56-20']],
 ['W04E127-E03','W-SSC-127','SOURCE_TENTATIVE_EUCLIDEAN_QUANTUM_GRAVITY_AND_COMPARATIVE_ASSESSMENT',['W04E-S56-28','W04E-S56-29']]
];
const pageBounds={11:[471,513],12:[514,573],13:[574,633],14:[634,646]};
const typedAll=x=>x.items.flatMap(z=>z.source_expression_census?.statements||[]);
function verify(x){
 const {m,s,old,src,reg,cov,unit,gate,pre,oldreg,oldcov,s52}=x;
 assert.equal(src.schema,'isograph.exp062-w04e-s5-s6-original-source-first-disjoint-complete-v0.1');
 assert.equal(src.track,'W');
 assert.equal(src.source.original_oct03_raw_bytes_authenticated,false);
 assert.equal(src.source.original_oct03_sha256,'UNRECOVERED');
 assert.deepEqual(src.source.source_range,[471,646]);
 assert.deepEqual(src.source.source_range,[471,646]);
 assert.equal(src.counts.lines,176);
 assert.equal(src.counts.intervals,29);
 assert.equal(src.counts.headings_excluded,5);
 assert.equal(src.counts.source_semantic_or_source_attribution_locations,24);
 assert.equal(src.counts.genuine_confirmed_G0_predecessor_omission_locations,6);
 assert.equal(src.counts.new_source_typed_groups,3);
 assert.deepEqual(src.counts.changed_owner_ids,['W-SSC-086','W-SSC-087','W-SSC-127']);
 assert.equal(src.predecessor_evidence.previous_original_euclidean_section.git_blob_sha,m.pins.S52.git_blob_sha);
 let pos=471,headers=0,restored=0,sourceEvents=0;
 const seen=new Set();
 for(let i=0;i<oldMath.length;i++){
   const [lo,hi,page,kind]=oldMath[i];
   const it=src.source_intervals[i];
   assert.ok(it&&typeof it.key==='string','source location missing '+i);
   assert.ok(!seen.has(it.key),'source location duplicate '+it.key);
   seen.add(it.key);
   assert.deepEqual(it.original_pdf_lines,[lo,hi],'original PDF source line range changed '+i);
   assert.equal(lo,pos,'source interval overlap/gap at '+i);
   pos=hi+1;
   assert.equal(it.printed_pdf_page,page,'PDF source page changed '+i);
   assert.equal(it.pdf_index,page-1,'PDF index changed '+i);
   assert.ok(lo>=pageBounds[page][0]&&hi<=pageBounds[page][1],'source boundaries cross PDF page '+i);
   assert.ok(it.author_source_semantics?.length>=26);
   if(kind==='H'){
     headers++;
     assert.equal(it.kind,'NONLOAD_HEADING');
     assert.deepEqual(it.ssc_owners,[]);
     assert.deepEqual(it.typed_incidences,[]);
   }else{
     sourceEvents++;
     assert.ok(it.ssc_owners.length>0);
     for(const id of it.ssc_owners)assert.ok(s.items.some(z=>z.id===id&&z.source.startsWith('W04e')),'non-W04e original source owner '+id);
     if(kind==='R'){
       restored++;
       assert.equal(it.kind,'CONFIRMED_G0_OMISSION_REPAIRED_EXISTING_SOURCE_ITEM');
     }else if(kind==='P')assert.equal(it.kind,'ALREADY_REPRESENTED_IN_EXPLICIT_W_SOURCE_BODY_NO_FAKE_TYPED_ITEM');
     else if(kind==='A')assert.equal(it.kind,'ALREADY_REPRESENTED_SOURCE_AUTHOR_ATTRIBUTION_AND_CITATION_PROVENANCE');
     else assert.equal(it.kind,'ALREADY_REPRESENTED_EXACT_W_SOURCE_SEMANTICS');
   }
 }
 assert.equal(pos,647);
 assert.deepEqual([headers,sourceEvents,restored],[5,24,6]);
 assert.equal(src.source_intervals.length,29);
 // The §5.2 subsection is one exact source location family, not an
 // independent duplicate; previous source-first identities remain stable.
 assert.deepEqual(src.source_intervals.slice(10,17).map(z=>z.key),s52Ids);
 assert.deepEqual(src.source_intervals.slice(10,17).map(z=>z.original_pdf_lines),s52.coverage_intervals.map(z=>z.lines));
 assert.equal(s.schema,'woit.source-semantic-census.v0.69');
 assert.equal(s.source_count,9);
 assert.equal(s.items.length,151);
 assert.equal(typedAll(old).length,533);
 assert.equal(typedAll(s).length,536);
 assert.equal(new Set(typedAll(old).map(z=>z.id)).size,531);
 assert.equal(new Set(typedAll(s).map(z=>z.id)).size,534);
 assert.equal(new Set(s.items.map(z=>z.id)).size,151);
 assert.equal(s.predecessor.git_blob_sha,m.pins.old68.git_blob_sha);
 const change=s.items.filter((z,i)=>!same(z,old.items[i])).map(z=>z.id);
 assert.deepEqual(change,['W-SSC-086','W-SSC-087','W-SSC-127']);
 assert.deepEqual(s.correction.changed_W_ids,change);
 assert.equal(s.correction.other148_source_item_objects_unchanged,true);
 assert.equal(s.correction.source_first.git_blob_sha,m.pins.S56.git_blob_sha);
 assert.equal(s.correction.source_orig_oct03_bytes_authenticated,false);
 assert.equal(s.correction.global_nine_original_complete,false);
 assert.equal(s.correction.G0_frozen,false);
 const get=id=>s.items.find(z=>z.id===id);
 for(const [id,owner,kind,loci] of fixedNovel){
   const z=get(owner),typed=z?.source_expression_census?.statements?.find(y=>y.id===id);
   assert.ok(typed,'missing source-typed original relation '+id);
   assert.equal(typed.owner,owner);
   assert.equal(typed.kind,kind);
   assert.deepEqual(typed.source_loci,loci);
   assert.equal(typed.source_first_oracle.git_blob_sha,m.pins.S56.git_blob_sha);
   assert.equal(typed.scope,'W04E_CURRENT_AUTHOR_PDF_ONLY_NOT_OCT03_AUTHENTICATED');
   for(const loc of loci)assert.ok(src.source_intervals.find(y=>y.key===loc)?.typed_incidences.includes(id),'source→SSC inverse lost '+loc);
 }
 const c1=get('W-SSC-086').source_expression_census.statements.find(z=>z.id==='W04E086-E05');
 assert.equal(c1.complex_conformal.group,'Spin(6,C)=SL(4,C)');
 assert.equal(c1.complex_conformal.twistor,'T=C4');
 assert.deepEqual(c1.complex_conformal.twistor_role,['SPIN6C_HALF_SPINOR','SL4C_FUNDAMENTAL']);
 assert.equal(c1.complex_conformal.projectivization,'PT=CP3');
 assert.equal(c1.complex_compact_spacetime.carrier,'Gr(2,4,C)');
 assert.equal(c1.complex_compact_spacetime.equivalent_projective,'EMBEDDED_CP1_LINE_IN_PT');
 assert.equal(c1.complex_compact_spacetime.right_handed_spinor,'S_R_POINT_C2_SUBSET_T');
 assert.equal(c1.complex_compact_spacetime.left_handed_spinor_role,'DISTINCT_NOT_IDENTIFIED_WITH_POINT_RIGHT_PLANE');
 assert.deepEqual(c1.source_locator.printed_pdf_pages,[11,12]);
 assert.deepEqual(c1.source_locator.pdf_indices,[10,11]);
 assert.deepEqual(c1.source_locator.source_page_line_spans,[
  {printed_pdf_page:11,pdf_index:10,original_pdf_text_lines:[504,513]},
  {printed_pdf_page:12,pdf_index:11,original_pdf_text_lines:[514,520]}
 ]);
 assert.equal(c1.source_locator.October03_original_source_bytes_authenticated,false);
 const c2=get('W-SSC-087').source_expression_census.statements.find(z=>z.id==='W04E087-E03');
 assert.equal(c2.conventional_chosen_domain,'SPACE_OF_CP1_LINES_IN_PT_COMPLEX_GRASSMANNIAN');
 assert.equal(c2.alternative_chosen_domain,'PROJECTIVE_TWISTOR_SPACE_PT_ITSELF');
 assert.equal(c2.positive_orbit,'PT_PLUS');
 assert.equal(c2.boundary,'PN_NULL');
 assert.equal(c2.parameter,'CHOICE_OF_HERMITIAN_PHI');
 assert.equal(c2.boundary_minkowski_status,'AUTHOR_PROPOSAL_NOT_PROVED_FULL_CHIRAL_QFT');
 assert.deepEqual(c2.source_locator.original_pdf_text_lines,[604,617]);
 assert.equal(c2.source_locator.printed_pdf_page,13);
 const c3=get('W-SSC-127').source_expression_census.statements.find(z=>z.id==='W04E127-E03');
 assert.equal(c3.exact_source_uncertainty,'QUITE_POSSIBLY');
 assert.equal(c3.possible_effect,'MAY_GIVE_SOMETHING_NEW_ON_EUCLIDEAN_QG_AND_WICK_ROTATION_IN_QG');
 assert.equal(c3.complete_unified_theory_constructed,false);
 assert.equal(c3.comparative_prior_approaches,'AUTHOR_ASSESSMENT_MORE_PROMISING_NOT_INDEPENDENT_RANKING');
 assert.equal(c3.source_locator.printed_pdf_page,14);
 assert.deepEqual(c3.source_locator.original_pdf_text_lines,[640,646]);
 assert.ok(get('W-SSC-086').obligation.includes('Gr(2,4,C)')===false || c1.complex_compact_spacetime.carrier==='Gr(2,4,C)');
 assert.ok(get('W-SSC-087').obligation.includes('holomorphicity **directly on PT itself**'));
 assert.ok(get('W-SSC-127').obligation.includes('quite possibly'));
 assert.deepEqual(m.versioned_original_source_to_ssc,pre.versioned_original_source_to_ssc);
 assert.deepEqual(m.original_navigation_anchors,pre.original_navigation_anchors);
 assert.equal(m.versioned_original_source_to_ssc.length,437);
 assert.equal(m.counters.versioned_source_first_load_bearing_intervals,268);
 assert.equal(m.counters.versioned_original_bidirectional_ssc_items,91);
 assert.equal(m.counters.current_ssc_items,151);
 assert.equal(m.counters.current_typed_statement_incidences,536);
 assert.equal(m.counters.distinct_statement_ids,534);
 assert.equal(m.counters.frozen_mutable_oct03_exact_bytes_unverified,6);
 assert.equal(m.current_W04e_sections5_6_source_first.audit.git_blob_sha,m.pins.S56.git_blob_sha);
 assert.equal(m.current_ssc_to_original_or_review.length,151);
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
 for(let i=0;i<151;i++){
  const a=s.items[i],b=reg.rows[i],c=cov.rows[i],iv=m.current_ssc_to_original_or_review[i];
  assert.equal(b.census_id,a.id);assert.equal(c.census_id,a.id);assert.equal(iv.ssc_id,a.id);
  assert.equal(b.source_body_exact,a.obligation);
  assert.equal(b.source_expression_statement_count,(a.source_expression_census?.statements||[]).length);
  assert.equal(c.body_length_chars,a.obligation.length);
  assert.equal(c.source_expression_statement_count,(a.source_expression_census?.statements||[]).length);
  assert.deepEqual(iv.typed_statement_ids,(a.source_expression_census?.statements||[]).map(z=>z.id));
  assert.deepEqual(iv.review_locator,c.source_locator_this_review);
  if(!change.includes(a.id)){
   assert.deepEqual(b,oldreg.rows[i],'unaffected source register row altered '+a.id);
   assert.deepEqual(c,oldcov.rows[i],'unaffected original source review row altered '+a.id);
  }
 }
 assert.equal(reg.current_round.other148_full_source_objects_conserved,true);
 assert.equal(cov.current_round.all_other148_object_meaning_conserved,true);
 assert.equal(unit.summary.other148_exact,true);
 assert.equal(unit.summary.structured_incidences,536);
 assert.equal(unit.units.find(z=>z.unit==='W04e').structured_incidences,46);
 assert.equal(unit.units.reduce((n,z)=>n+z.structured_incidences,0),536);
 assert.equal(unit.units.reduce((n,z)=>n+z.existing_items,0),151);
 assert.equal(gate.current_source_census.git_blob_sha,m.pins.ssc.git_blob_sha);
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,m.pins.reg.git_blob_sha);
 assert.equal(gate.current_source_coverage.git_blob_sha,m.pins.review.git_blob_sha);
 assert.equal(gate.current_W_nine_source_inventory_036.git_blob_sha,m.pins.unit.git_blob_sha);
 assert.equal(gate.current_W04e_full_5_6_source_first.audit.git_blob_sha,m.pins.S56.git_blob_sha);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','Oct03_mutable_source_byte_identity_verified','all_nine_source_full_reverse_assertion_enumeration_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized','global_source_first_cold_audit_qualified'])assert.equal(gate.current_lawful_state[key],false,'illegal G0 acceptance '+key);
 assert.equal(m.current_G0.open,true);
 assert.equal(m.current_G0.complete,false);
 assert.equal(m.current_G0.frozen,false);
 assert.equal(m.current_G0.G1_authorized,false);
 assert.equal(m.current_G0.source_provenance_complete,false);
 return {source_items:151,source_typed:536,distinct_typed:534,W04e_full_sections_5_6_original_pdf_lines:176,source_intervals:29,load_or_citation_intervals:24,headings:5,genuine_repaired_source_groups:3,versioned_original_intervals:437,G0:'OPEN'};
}
const positive=verify(d);
const hostiles=[
 ['source original interval omitted',x=>x.src.source_intervals.pop()],
 ['source original interval noncontiguous',x=>x.src.source_intervals[4].original_pdf_lines[0]++],
 ['source original interval duplicate',x=>x.src.source_intervals.splice(4,0,clone(x.src.source_intervals[4]))],
 ['source page wrongly shifted',x=>x.src.source_intervals[6].printed_pdf_page=11],
 ['S52 original identity altered',x=>x.src.source_intervals[11].key='W04E-DUPLICATE'],
 ['author source citation imported as proof',x=>x.src.source_intervals[23].kind='EXTERNAL_THEOREM_QUALIFIED'],
 ['heading promoted to semantic',x=>x.src.source_intervals[0].ssc_owners=['W-SSC-086']],
 ['omit original source meaning owner',x=>x.src.source_intervals[19].ssc_owners=[]],
 ['remove original E05 source typed pointer',x=>x.src.source_intervals[4].typed_incidences=[]],
 ['change source and SSC jointly to wrong twistor group',x=>{x.src.source_intervals[4].author_source_semantics='SL5C';x.s.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements.find(z=>z.id==='W04E086-E05').complex_conformal.group='SL(5,C)'}],
 ['W86 double source page locator ignored',x=>x.s.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements.find(z=>z.id==='W04E086-E05').source_locator.source_page_line_spans.pop()],
 ['swapped half-spinor chirality',x=>x.s.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements.find(z=>z.id==='W04E086-E05').complex_compact_spacetime.right_handed_spinor='LEFT'],
 ['replace CP1 lines with points',x=>x.s.items.find(z=>z.id==='W-SSC-086').source_expression_census.statements.find(z=>z.id==='W04E086-E05').complex_compact_spacetime.equivalent_projective='POINT_PT'],
 ['collapse CP1 line-space and PT holomorphic carrier',x=>x.s.items.find(z=>z.id==='W-SSC-087').source_expression_census.statements.find(z=>z.id==='W04E087-E03').alternative_chosen_domain='SPACE_OF_CP1_LINES_IN_PT_COMPLEX_GRASSMANNIAN'],
 ['falsify conditional PT boundary as proof',x=>x.s.items.find(z=>z.id==='W-SSC-087').source_expression_census.statements.find(z=>z.id==='W04E087-E03').boundary_minkowski_status='PROVEN_FULL_QFT'],
 ['remove source Phi choice',x=>x.s.items.find(z=>z.id==='W-SSC-087').source_expression_census.statements.find(z=>z.id==='W04E087-E03').parameter='NONE'],
 ['promote speculative QG to theorem',x=>x.s.items.find(z=>z.id==='W-SSC-127').source_expression_census.statements.find(z=>z.id==='W04E127-E03').exact_source_uncertainty='PROVED'],
 ['misstate author assessment as universal ranking',x=>x.s.items.find(z=>z.id==='W-SSC-127').source_expression_census.statements.find(z=>z.id==='W04E127-E03').comparative_prior_approaches='MATHEMATICAL_PROOF_BEST'],
 ['invent fully constructed theory',x=>x.s.items.find(z=>z.id==='W-SSC-127').source_expression_census.statements.find(z=>z.id==='W04E127-E03').complete_unified_theory_constructed=true],
 ['erase one new typed SSC evidence',x=>x.s.items.find(z=>z.id==='W-SSC-127').source_expression_census.statements.pop()],
 ['co-corrupt printed source with SSC QG status',x=>{x.src.source_intervals[27].author_source_semantics='QG established';x.s.items.find(z=>z.id==='W-SSC-127').source_expression_census.statements.find(z=>z.id==='W04E127-E03').exact_source_uncertainty='PROVED'}],
 ['claim October03 W04e source bytes verified',x=>x.src.source.original_oct03_raw_bytes_authenticated=true],
 ['claim G0 global cold pass',x=>x.gate.current_lawful_state.global_source_first_cold_audit_qualified=true],
 ['claim G0 closed',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['start G1 without G0',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['erase versioned source original ledger',x=>x.m.versioned_original_source_to_ssc.pop()],
 ['mutate unrelated W01 source',x=>x.s.items.find(z=>z.id==='W-SSC-028').obligation+='FORGED'],
 ['import other track original',x=>x.s.items[0].source='L01'],
 ['lose reciprocal SSC inverse row',x=>x.m.current_ssc_to_original_or_review.pop()],
 ['drop review evidence from unaffected source',x=>x.cov.rows.find(z=>z.census_id==='W-SSC-024').source_locator_this_review=null]
];
let rejected=0;
for(const [name,fn] of hostiles){let x=clone(d),before=JSON.stringify(x);fn(x);assert.notEqual(JSON.stringify(x),before,'inert negative fixture '+name);try{verify(x)}catch(e){rejected++;continue}throw Error('ADVERSARIAL_ESCAPE '+name)}
assert.equal(rejected,hostiles.length);
console.log('W04e original sections 5–6 complete original-first local 176-line reverse PASS '+JSON.stringify(positive));
console.log('Adversarial controls rejected '+rejected+'/'+hostiles.length);
console.log('G0 remains OPEN: six original Oct03 mutable source revisions not byte authenticated, global nine-original source cold audit not qualified, no G1–G7.');
