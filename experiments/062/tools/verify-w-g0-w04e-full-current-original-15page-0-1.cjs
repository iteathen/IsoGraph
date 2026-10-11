#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const root='experiments/062/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const deep=x=>JSON.parse(JSON.stringify(x));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const manifest=read(root+'W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_9.json');
for(const [id,pin] of Object.entries(manifest.pins))assert.equal(gitBlob(pin.path),pin.git_blob_sha,'pinned SHA drift: '+id);
const ancestor=read(manifest.historical_predecessor_convergence.path);
assert.equal(gitBlob(manifest.historical_predecessor_convergence.path),manifest.historical_predecessor_convergence.git_blob_sha);
const old=read(manifest.pins.old69.path);
const state={manifest,ancestor,old,
  s:read(manifest.pins.ssc.path),
  current:read(manifest.pins.full15.path),
  first:read(manifest.pins.firstten.path),
  late:read(root+'W04E_G0_FULL_SECTIONS_5_6_SOURCE_FIRST_INVERSE_0_1.json'),
  reg:read(manifest.pins.reg.path),
  cov:read(manifest.pins.review.path),
  unit:read(manifest.pins.unit.path),
  gate:read(manifest.pins.gate.path)};
const changed=['W-SSC-082','W-SSC-083','W-SSC-085','W-SSC-124'];
const pageRanges=[[0,24],[25,60],[61,106],[107,150],[151,208],[209,259],[260,301],[302,347],[348,409],[410,470],[471,513],[514,573],[574,633],[634,665],[666,693]];
const typed=item=>item?.source_expression_census?.statements||[];
const find=(s,id)=>s.items.find(z=>z.id===id);
const atom=(s,owner,id)=>typed(find(s,owner)).find(z=>z.id===id);
const fixed=[
{owner:'W-SSC-082',id:'W04E-082-10',loc:['W04E-P04-016'],field:'test_function_space',expected:'REAL_ANALYTIC_FUNCTIONS'},
{owner:'W-SSC-082',id:'W04E-082-10',loc:['W04E-P04-016'],field:'real_time_reconstruction_role',expected:'BOUNDARY_VALUES_AS_HYPERFUNCTIONS'},
{owner:'W-SSC-082',id:'W04E-082-10',loc:['W04E-P04-016'],field:'proposed_fundamental_carrier',expected:'HOLOMORPHIC_COMPLEX_TIME_UPPER_HALF_PLANE'},
{owner:'W-SSC-083',id:'W04E-083-04',loc:['W04E-P06-031','W04E-P06-032','W04E-P07-033','W04E-P07-040'],field:'Schwinger_reference',expected:'[15]'},
{owner:'W-SSC-083',id:'W04E-083-04',loc:['W04E-P06-031','W04E-P06-032','W04E-P07-033','W04E-P07-040'],field:'Schwinger_original_report',expected:'REVERSE_FROM_ARBITRARY_EUCLIDEAN_TO_SENSIBLE_LORENTZ_UNANSWERED_AT_CITED_PRIOR_DISCUSSION'},
{owner:'W-SSC-083',id:'W04E-083-04',loc:['W04E-P06-031','W04E-P06-032','W04E-P07-033','W04E-P07-040'],field:'Rychkov_reference',expected:'[14]'},
{owner:'W-SSC-085',id:'W04E-085-04',loc:['W04E-P09-048'],field:'antiparticle_role',expected:'EACH_ANTIPARTICLE_MOVES_IN_OPPOSITE_DIRECTION'},
{owner:'W-SSC-085',id:'W04E-085-04',loc:['W04E-P09-048'],field:'author_result',expected:'ONE_EFFECTIVE_SPACETIME_VARIABLE_NO_REMAINING_EQUATION_OF_MOTION_AFTER_REDUCTION'}
];
const sourceFrozen=current=>current?.original_source?.original_2026_oct03_raw_bytes_authenticated;
function verify(x){
 const {manifest:m,ancestor:prior,old,s,current:full,first,late,reg,cov,unit,gate}=x;
 assert.equal(m.schema,'isograph.exp062-w-g0-finite-versioned-source-bidirectional-convergence.v0.9');
 assert.equal(s.schema,'woit.source-semantic-census.v0.70');
 assert.equal(s.source_count,9);
 assert.equal(s.census_item_count,151);
 assert.equal(s.items.length,151);
 assert.equal(new Set(s.items.map(z=>z.id)).size,151);
 assert.equal(s.cross_author_semantics_available,false);
 assert.equal(typed(find(s,'W-SSC-082')).length,10);
 assert.equal(typed(find(s,'W-SSC-083')).length,4);
 assert.equal(typed(find(s,'W-SSC-085')).length,4);
 assert.equal(typed(find(s,'W-SSC-124')).length,9);
 assert.equal(s.items.reduce((n,z)=>n+typed(z).length,0),539);
 assert.equal(new Set(s.items.flatMap(z=>typed(z).map(y=>y.id))).size,537);
 assert.deepEqual(s.items.filter((z,i)=>!eq(z,old.items[i])).map(z=>z.id),changed);
 assert.equal(s.predecessor.git_blob_sha,m.pins.old69.git_blob_sha);
 assert.deepEqual(s.correction.changed_W_ids,changed);
 assert.equal(s.correction.other147_source_records_exact,true);
 for(let i=0;i<151;i++)if(!changed.includes(s.items[i].id))
   assert.deepEqual(s.items[i],old.items[i],'unrelated W/L item amended: '+s.items[i].id);
 assert.equal(first.schema,'isograph.exp062-w04e-independent-current-source-first-full-10page-v0.1');
 assert.equal(full.schema,'isograph.exp062-w04e-all15-current-author-pdf-sourcefirst-finite.v0.1');
 assert.equal(first.source.original_oct03_2026_frozen_raw_bytes_authenticated,false);
 assert.equal(sourceFrozen(full),false);
 assert.equal(full.original_source.source_role,'CURRENT_AUTHOR_PDF_NOT_HISTORICAL_2026_OCT03_QUALIFICATION');
 assert.equal(full.original_source.original_2026_oct03_raw_byte_digest,'UNRECOVERED');
 assert.equal(full.convergence.G0_frozen,false);
 assert.equal(first.original_source_intervals.length,57);
 assert.equal(first.convergence.reviewed_original_text_lines,471);
 assert.equal(first.convergence.load_bearing_intervals,54);
 assert.equal(first.convergence.nonload,3);
 assert.equal(late.source_intervals.length,29);
 assert.equal(full.original_source_to_ssc.length,88);
 assert.equal(full.convergence.original_text_lines_independently_partitioned,694);
 assert.equal(full.convergence.load_bearing_original_intervals,78);
 assert.equal(full.convergence.nonload_provenance_intervals,10);
 assert.equal(full.bibliography_native.original_numbered_identities,22);
 assert.deepEqual(full.source_first_component_first_10.git_blob_sha,m.pins.firstten.git_blob_sha);
 assert.deepEqual(full.source_first_component_last_5.git_blob_sha,m.pins.S56.git_blob_sha);
 let loc=0,load=0,nonload=0,allOwners=new Set(),intervalKeys=new Set();
 for(const [i,z] of full.original_source_to_ssc.entries()){
  assert.equal(z.original_pdf_text_lines[0],loc,'Original PDF source GAP/OVERLAP at '+z.key);
  assert.ok(z.original_pdf_text_lines[1]>=loc,'Original source interval inverted '+z.key);
  assert.ok(!intervalKeys.has(z.key),'Duplicate source original interval '+z.key);
  intervalKeys.add(z.key);
  const page=pageRanges.findIndex(([a,b])=>a<=z.original_pdf_text_lines[0]&&z.original_pdf_text_lines[1]<=b)+1;
  assert.equal(z.printed_pdf_page,page,'Wrong original source page for '+z.key);
  loc=z.original_pdf_text_lines[1]+1;
  assert.equal(z.current_revision_only,true);
  assert.ok(z.source_disposition?.length>12);
  const excluded=z.kind==='PROVENANCE'||z.kind.startsWith('NONLOAD');
  if(excluded){nonload++;assert.equal(z.ssc_owners.length,0,'Excluded evidence still source-owner qualified '+z.key)}
  else{load++;assert.ok(z.ssc_owners.length>0,'Ownerless original source semantic interval '+z.key);
   for(const id of z.ssc_owners){assert.ok(find(s,id)?.source.startsWith('W04e'),'Foreign original source owner '+id);allOwners.add(id)}
  }
  if(i<57){
   const a=first.original_source_intervals[i];
   assert.equal(z.key,a.key);assert.deepEqual(z.original_pdf_text_lines,a.original_pdf_text_lines);
   assert.deepEqual(z.ssc_owners,a.source_owners);
  }else if(i<86){
   const a=late.source_intervals[i-57];
   assert.equal(z.key,a.key);assert.deepEqual(z.original_pdf_text_lines,a.original_pdf_lines);
   assert.deepEqual(z.ssc_owners,a.ssc_owners);
  }
 }
 assert.equal(loc,694);
 assert.equal(load,78);
 assert.equal(nonload,10);
 assert.equal(first.original_source_intervals.at(-1).original_pdf_text_lines[1],470);
 assert.deepEqual(full.original_source_to_ssc[86].original_pdf_text_lines,[647,665]);
 assert.deepEqual(full.original_source_to_ssc[87].original_pdf_text_lines,[666,693]);
 assert.equal(full.original_source_to_ssc[86].ssc_owners.length,0);
 assert.equal(full.original_source_to_ssc[87].ssc_owners.length,0);
 const originalLoci=new Map(full.original_source_to_ssc.map(z=>[z.key,z]));
 for(const {owner,id,loc:expectedKeys,field,expected} of fixed){
  const st=atom(s,owner,id);assert.ok(st,'missing typed source assertion '+id);
  assert.deepEqual(st[field],expected,'independently fixed source assertion mismatch '+id+'/'+field);
  assert.deepEqual(st.source_locator.source_first_keys,expectedKeys,'wrong source span for '+id);
  for(const key of expectedKeys){const row=originalLoci.get(key);assert.ok(row&&row.ssc_owners.includes(owner),'missing original-to-SSC inverse '+id+'/'+key)}
  assert.equal(st.source_locator.original_2026_10_03_capture_bytes_authenticated,false);
  assert.equal(st.source_first_oracle.git_blob_sha,m.pins.firstten.git_blob_sha);
 }
 const hyper=atom(s,'W-SSC-082','W04E-082-10');
 assert.deepEqual(hyper.author_citation_roles,['[5]_HYPERFUNCTION_THEORY','[4]_HYPERFUNCTION_THEORY','[12]_PENROSE_PHYSICAL_CONTEXT']);
 assert.equal(hyper.modality,'AUTHOR_PROPOSAL_AND_CITED_HYPERFUNCTION_CONTEXT_NOT_COMPLETED_CHIRAL_THEORY');
 assert.deepEqual(hyper.negative,['DO_NOT_ASSERT_EXISTENCE_UNIQUENESS_OF_INVERSE_LAPLACE_FOR_ARBITRARY_DATA','UPPER_HALF_PLANE_SOURCE_SIGN_TENSION_WITH_Z_EQUALS_T_MINUS_I_TAU_UNALTERED']);
 const oldNotes=atom(s,'W-SSC-083','W04E-083-04');
 assert.equal(oldNotes.modality,'SOURCE_CITED_HISTORICAL_ASSESSMENTS_NOT_NEW_AUTHOR_NO_GO_THEOREM');
 assert.equal(oldNotes.Rychkov_report,'EARLY_OS_PAPERS_MISQUOTED_OR_ATTRIBUTED_RESULTS_NOT_IN_ORIGINAL_TEXTS');
 const motion=atom(s,'W-SSC-085','W04E-085-04');
 assert.deepEqual(motion.conditional_reduced_solutions,['RIGHT_CHIRAL_ARBITRARY_FUNCTION_X_R_EQUALS_X_MINUS_T','LEFT_CHIRAL_ARBITRARY_FUNCTION_X_L_EQUALS_X_PLUS_T']);
 assert.equal(motion.modality,'SOURCE_MASSLESS_TWO_DIMENSIONAL_CHIRAL_EOM_REDUCTION');
 const cayley=atom(s,'W-SSC-124','W04E-124-02').group_after_Cayley;
 assert.deepEqual(cayley,{input_real:'SL(2,R)',output_real:'SU(1,1)',relation:'SOURCE_ISOMORPHIC_GROUP_UNDER_MOBIUS_CAYLEY_COORDINATE',carrier:'UNIT_DISK',original_pdf_printed_page:9,original_pdf_text_lines:[383,389],guard:'DO_NOT_IDENTIFY_TWO_SOURCE_CHIRAL_GROUP_FACTORS_OR_EXTERNAL_PROOF',source_first_key:'W04E-P09-051'});
 assert.equal(originalLoci.get(cayley.source_first_key).kind,'LOAD_ENRICH');
 assert.equal(first.repaired_source_atoms.length,3);
 assert.equal(first.existing_atom_enrichment.typed,'W04E-124-02');
 assert.equal(first.existing_atom_enrichment.original_source_relation,'CAYLEY_COORDINATE_SL2R_ISOMORPHIC_TO_SU1_1');
 assert.deepEqual(m.versioned_original_source_to_ssc,prior.versioned_original_source_to_ssc,'changed W01/W02/W05 original source');
 assert.deepEqual(m.original_navigation_anchors,prior.original_navigation_anchors);
 assert.equal(m.versioned_original_source_to_ssc.length,437);
 assert.equal(m.counters.versioned_source_first_load_bearing_intervals,268);
 assert.equal(m.counters.versioned_original_bidirectional_ssc_items,91);
 assert.equal(m.counters.current_ssc_items,151);
 assert.equal(m.counters.current_typed_statement_incidences,539);
 assert.equal(m.counters.distinct_statement_ids,537);
 assert.equal(m.counters.frozen_mutable_oct03_exact_bytes_unverified,6);
 assert.equal(m.current_W04e_complete_available_PDF_source_first.audit.git_blob_sha,m.pins.full15.git_blob_sha);
 assert.equal(m.current_W04e_complete_available_PDF_source_first.exact_historical_2026Oct03_original_byte_provenance,false);
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);assert.equal(m.current_ssc_to_original_or_review.length,151);
 for(let i=0;i<151;i++){
  const rec=s.items[i],rr=reg.rows[i],cc=cov.rows[i],inverse=m.current_ssc_to_original_or_review[i];
  assert.equal(rr.census_id,rec.id);assert.equal(cc.census_id,rec.id);assert.equal(inverse.ssc_id,rec.id);
  assert.equal(rr.source_body_exact,rec.obligation,'G0 source body changed without register '+rec.id);
  assert.equal(rr.source_expression_statement_count,typed(rec).length);
  assert.equal(cc.body_length_chars,rec.obligation.length);
  assert.equal(cc.source_expression_statement_count,typed(rec).length);
  assert.deepEqual(inverse.typed_statement_ids,typed(rec).map(z=>z.id));
  assert.deepEqual(inverse.review_locator,cc.source_locator_this_review);
 }
 assert.equal(gate.current_source_census.git_blob_sha,m.pins.ssc.git_blob_sha);
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,m.pins.reg.git_blob_sha);
 assert.equal(gate.current_source_coverage.git_blob_sha,m.pins.review.git_blob_sha);
 assert.equal(gate.current_W_nine_source_inventory_037.git_blob_sha,m.pins.unit.git_blob_sha);
 assert.equal(gate.current_W04e_all15_current_author_source_first.audit.git_blob_sha,m.pins.full15.git_blob_sha);
 assert.equal(unit.summary.structured_incidences,539);
 assert.equal(unit.summary.other147_exact,true);
 assert.equal(unit.units.find(x=>x.unit==='W04e').structured_incidences,49);
 assert.equal(unit.units.reduce((n,z)=>n+z.structured_incidences,0),539);
 assert.equal(unit.units.reduce((n,z)=>n+z.existing_items,0),151);
 const legal=gate.current_lawful_state;
 assert.equal(legal.G0_open,true);
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','Oct03_mutable_source_byte_identity_verified','all_nine_source_full_reverse_assertion_enumeration_complete','source_semantic_omission_count_known_exact','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized','global_source_first_cold_audit_qualified'])
 assert.equal(legal[k],false,'premature G0 stage authority '+k);
 assert.equal(m.current_G0.open,true);assert.equal(m.current_G0.frozen,false);assert.equal(m.current_G0.source_provenance_complete,false);
 return {source_frozen_units:9,current_w04e_pdf_pages:15,original_pdf_lines:694,source_first_intervals:88,load_bearing:78,sscs:151,typed:539,distinct_typed:537,versioned_original_intervals:437,G0:'OPEN'};
}
const positive=verify(state);
const cases=[
['drop an original source location',x=>x.current.original_source_to_ssc.pop()],
['insert source gap',x=>x.current.original_source_to_ssc[1].original_pdf_text_lines[0]++],
['overlap source location',x=>x.current.original_source_to_ssc[10].original_pdf_text_lines[0]--],
['classify load as nonload',x=>{x.current.original_source_to_ssc[5].kind='NONLOAD_HEADING';x.current.original_source_to_ssc[5].ssc_owners=[];}],
['bibliography imported as theorem',x=>x.current.original_source_to_ssc[86].ssc_owners=['W-SSC-124']],
['original source wrong printed page',x=>x.current.original_source_to_ssc[5].printed_pdf_page=14],
['forge October3 raw source authenticated',x=>x.current.original_source.original_2026_oct03_raw_bytes_authenticated=true],
['fake W full current original into Oct3',x=>x.current.original_source.source_role='FROZEN_ORIGINAL_2026_OCT03'],
['silently remove source upper half-plane sign tension',x=>atom(x.s,'W-SSC-082','W04E-082-10').negative.pop()],
['delete hyperfunction real analytic test space',x=>atom(x.s,'W-SSC-082','W04E-082-10').test_function_space='Schwartz'],
['retarget proposed upper half-plane onto definite lower',x=>atom(x.s,'W-SSC-082','W04E-082-10').proposed_fundamental_carrier='LOWER_HALF_PLANE'],
['transform Schwinger open into proved no-go',x=>atom(x.s,'W-SSC-083','W04E-083-04').Schwinger_original_report='PROVEN_INVERSE_IMPOSSIBLE'],
['omit source citation Rychkov',x=>atom(x.s,'W-SSC-083','W04E-083-04').Rychkov_reference='UNKNOWN'],
['change antiparticles into same direction',x=>atom(x.s,'W-SSC-085','W04E-085-04').antiparticle_role='SAME_DIRECTION'],
['change no EOM scoped to all 4D',x=>atom(x.s,'W-SSC-085','W04E-085-04').author_result='GLOBAL_NO_EOM'],
['erase Cayley SU11 relation',x=>delete atom(x.s,'W-SSC-124','W04E-124-02').group_after_Cayley],
['co-corrupt source first and SSC to same altered citation',x=>{
  x.first.repaired_source_atoms[1].original_claims.Schwinger_ref='[9]';
  atom(x.s,'W-SSC-083','W04E-083-04').Schwinger_reference='[9]';}],
['co-corrupt source role and SSC particle direction',x=>{
  x.first.repaired_source_atoms[2].original_claims.antiparticle_motion='SAME';
  atom(x.s,'W-SSC-085','W04E-085-04').antiparticle_role='SAME';}],
['delete one negative history source location',x=>x.first.original_source_intervals.splice(30,1)],
['source original inverse missing owner',x=>x.current.original_source_to_ssc.find(z=>z.key==='W04E-P04-016').ssc_owners=[]],
['rewrite another author W source body',x=>x.s.items.find(z=>z.id==='W-SSC-047').obligation+='FORGED'],
['import other-author semantics into W',x=>x.s.items.find(z=>z.id==='W-SSC-082').source='L01'],
['erase source body register',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-083').source_body_exact='DROP'],
['erase current source review inverse',x=>x.manifest.current_ssc_to_original_or_review.pop()],
['erase versioned original W01 coverage',x=>x.manifest.versioned_original_source_to_ssc.pop()],
['promote failed G0 freeze',x=>x.gate.current_lawful_state.G0_frozen=true],
['authorize G1 before G0',x=>x.gate.current_lawful_state.G1_authorized=true],
['claim Oct3 source bytes without recovery',x=>x.manifest.current_G0.source_provenance_complete=true],
['make source math citations external proof',x=>atom(x.s,'W-SSC-083','W04E-083-04').modality='INDEPENDENT_PROVED_NO_GO'],
['duplicate current typed statement identity',x=>atom(x.s,'W-SSC-085','W04E-085-04').id='W04E-082-10'],
['erase current source first W04e status',x=>x.unit.units.find(z=>z.unit==='W04e').structured_incidences=46]
];
let rejected=0;for(const [name,mutate] of cases){const x=deep(state),before=JSON.stringify(x);mutate(x);assert.notEqual(JSON.stringify(x),before,'inert negative '+name);try{verify(x)}catch(e){rejected++;continue}throw Error('ADVERSARIAL_ESCAPE '+name)}
assert.equal(rejected,cases.length);
console.log('W G0 15-page original-current-PDF source→SSC complete local inverse PASS '+JSON.stringify(positive));
console.log('Source first adversarial controls rejected '+rejected+'/'+cases.length);
console.log('HISTORICAL Oct03 W03/W04a–e exact bytes remain unavailable. No global G0 freeze or G1.');
