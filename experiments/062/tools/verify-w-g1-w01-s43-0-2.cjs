#!/usr/bin/env node
'use strict';
// Original-first W01 §4.3 G1 source-occurrence review, not primitive authority.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const paths={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 index:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 gate:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 prior:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 stage:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_1.json','1904d4c44f9443d241eb33c550838ff913571f1f']
};
for(const [k,[p,sha]]of Object.entries(paths))assert.equal(blob(p),sha,'governing original frozen input SHA mismatch '+k);
const d=Object.fromEntries(Object.entries(paths).map(([k,[p]])=>[k,read(p)]));
const A=read('experiments/062/W_G1_CURRENT_AUTHOR_W01_S43_SOURCE_FIRST_0_1.json');
const current=new Map(d.ssc.items.map(x=>[x.id,x])),old=new Map(d.prior.items.map(x=>[x.census_id,x]));
const owners=new Map(d.index.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x]));
const ids=['W-SSC-040','W-SSC-041','W-SSC-042'];
const expected=[10,8,6];
const copy=x=>structuredClone(x);
function verify(v){
 assert.equal(v.schema,'isograph.exp062-w-g1-current-author-W01-section43-source-first.v0.1');
 assert.equal(v.track,'W');
 assert.equal(v.status,'W01_S43_THREE_G1_BODIES_SOURCE_LOCAL_REVIEW_PENDING_QUALIFICATION');
 assert.equal(v.source_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(v.source_root,'https://arxiv.org/html/2104.05099v2');
 assert.equal(v.governing_method,'research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md');
 assert.equal(v.historical_oct03_G0_status,'OPEN_HISTORICAL_RAW_MISSING');
 assert.equal(v.qualified_current_source_G0_frozen,true);
 assert.equal(v.G1_entire_151_complete,false);
 assert.equal(v.G2_authorized,false);
 assert.equal(v.L_semantics_in_scope,false);
 assert.equal(v.primitive_module_qualified_by_this_artifact,false);
 assert.equal(v.old_historical_records_untouched,true);
 assert.equal(v.qualified_global_G1_not_claimed,true);
 assert.equal(d.ssc.items.length,151);
 assert.equal(d.gate.current.G0_frozen,true);
 assert.equal(d.gate.historical_oct03_target.G0_complete,false);
 assert.equal(d.gate.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(d.stage.stage,'G1_SOURCE_LOCAL_NINE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(d.stage.source_reconciliation.current_source_local_reviewed_count,9);
 assert.equal(d.stage.G2_authorized,false);
 assert.equal(v.original_independent_source_reading.unit,'W01');
 assert.equal(v.original_independent_source_reading.source_revision,'arXiv:2104.05099v2');
 assert.deepEqual(v.original_independent_source_reading.source_html_line_interval,[313,338]);
 assert.deepEqual(Object.keys(v.frozen_source_inputs).sort(),Object.keys(paths).sort());
 for(const [k,[p,sha]]of Object.entries(paths))assert.deepEqual(v.frozen_source_inputs[k],{path:p,git_blob_sha:sha},'correspondence pointer manipulated '+k);
 assert.deepEqual(v.rows.map(x=>x.census_id),ids);
 assert.deepEqual(v.rows.map(x=>x.occurrences.length),expected);
 assert.equal(v.summary.candidate_source_bodies,3);
 assert.equal(v.summary.candidate_occurrences,24);
 assert.equal(v.summary.legacy_occurrences,14);
 assert.equal(v.summary.source_typed_witnesses,12);
 assert.equal(v.summary.current_151_frozen_G0_body_count,151);
 assert.equal(v.summary.current_reviewed_before_this_pass,9);
 assert.equal(v.summary.current_reviewed_after_independent_acceptance_at_most,12);
 assert.equal(v.summary.outstanding_global_G1_count_at_least,139);
 let all=0;
 const idsSeen=new Set();
 for(let n=0;n<v.rows.length;n++){
  const x=v.rows[n],s=current.get(x.census_id),inversion=owners.get(x.census_id),pre=old.get(x.census_id);
  assert.ok(s&&inversion&&pre);
  assert.equal(x.source_unit,'W01');
  assert.equal(x.original_author_source_revision,'arXiv:2104.05099v2');
  assert.equal(x.original_author_source_url,'https://arxiv.org/html/2104.05099v2');
  assert.equal(x.frozen_current_source_body,s.obligation);
  assert.equal(x.exact_frozen_source_body.path,paths.ssc[0]);
  assert.equal(x.exact_frozen_source_body.git_blob_sha,paths.ssc[1]);
  assert.equal(x.exact_frozen_source_body.field,'items[id].obligation');
  assert.equal(x.exact_frozen_source_body.id,x.census_id);
  assert.deepEqual(x.original_G0_source_location_keys,inversion.original_source_keys);
  assert.deepEqual(x.source_typed_provenance,inversion.source_typed_statement_ids);
  assert.equal(x.historical_G1_original.path,paths.prior[0]);
  assert.equal(x.historical_G1_original.git_blob_sha,paths.prior[1]);
  assert.equal(x.historical_G1_original.occurrences,pre.occurrences.length);
  assert.equal(x.historical_G1_original.current_authority,false);
  assert.equal(x.scoped_disposition,'SOURCE_FIRST_G1_CANDIDATE_NOT_YET_INDEPENDENTLY_QUALIFIED');
  assert.equal(x.source_original_first_and_G0_correspondence_only,true);
  const seen=new Set();
  for(let i=0;i<x.occurrences.length;i++){
   const oc=x.occurrences[i];
   all++;
   assert.equal(oc.occurrence_id,x.census_id+'-W01S43-'+String(i+1).padStart(2,'0'));
   assert.ok(!idsSeen.has(oc.occurrence_id));
   idsSeen.add(oc.occurrence_id);
   assert.ok(oc.source_typed_statement_id && oc.exact_typed_field);
   const typed=s.source_expression_census.statements.find(t=>t.id===oc.source_typed_statement_id);
   assert.ok(typed,'source typed proof owner missing');
   assert.ok(inversion.source_typed_statement_ids.includes(typed.id));
   assert.ok(typeof typed[oc.exact_typed_field]==='string');
   assert.ok(typed[oc.exact_typed_field].includes(oc.original_author_source_span),'source first typed anchor not found '+oc.occurrence_id);
   assert.ok(oc.original_author_source_span.length>=2);
   assert.ok(oc.source_relation_or_operator.length>=6);
   assert.ok(oc.argument_result_source_roles&&typeof oc.argument_result_source_roles==='object');
   assert.ok(oc.side_condition_modality_and_negative_guard.length>=15);
   assert.equal(oc.semantic_authority,false);
   assert.equal(oc.proof_of_mathematical_claim,false);
   assert.equal(oc.extraction_status,'W_G1_EXACT_SOURCE_LOCAL_REVIEW_CANDIDATE');
   for(const dep of oc.depends_on)assert.ok(seen.has(dep),'forward/cross-source dependency '+oc.occurrence_id+' '+dep);
   assert.ok(!Object.hasOwn(oc,'requires')&&!Object.hasOwn(oc,'primitive_id')&&!Object.hasOwn(oc,'CLOSED_SCHEMA'));
   seen.add(oc.occurrence_id);
  }
 }
 assert.equal(all,24);
 // Independently printed G0 source semantic atoms and guards.
 const w40=d.ssc.items.find(x=>x.id==='W-SSC-040').source_expression_census.statements;
 const w41=d.ssc.items.find(x=>x.id==='W-SSC-041').source_expression_census.statements;
 const w42=d.ssc.items.find(x=>x.id==='W-SSC-042').source_expression_census.statements;
 assert.deepEqual(w40[0].exclusions,['GAUGE_COUPLING','HIGGS_COUPLING']);
 assert.deepEqual(w40[1].regions,[{region:'S^4_+',condition:'tau>0'},{region:'S^4_-',condition:'tau<0'}]);
 assert.deepEqual(w40[2].addends_ordered,['s_1^perp * conjugate(s_1)','s_2^perp * conjugate(s_2)','conjugate(s_1^perp) * s_1','conjugate(s_2^perp) * s_2']);
 assert.equal(w40[3].equation,'Phi(s,s)=0');
 assert.equal(w40[3].dimension_real,5);
 assert.equal(w40[4].diagrams.length,2);
 assert.equal(w41[1].scope,'FREE_MASSLESS_NO_GAUGE_HIGGS');
 assert.equal(w41[2].equation,'H^1(CP^1,O(-3))=C^2');
 assert.equal(w41[3].citation,'[14]');
 assert.equal(w42[0].gauge_condition,'ANTI_SELF_DUAL_CONNECTION_ON_S^4_+');
 assert.equal(w42[1].excluded,'MORE_GENERAL_YANG_MILLS_EQUATIONS');
 assert.deepEqual(w42[2].citations_ordered,['[29]','[12]','[38]','[9]','[13]','[1]']);
 const t=v.rows;
 assert.equal(blob('experiments/062/W_G1_CURRENT_AUTHOR_W01_S43_SOURCE_FIRST_0_1.json'),'a2fff4315b5b23d028b8ff74e46c35ddef55c1da','immutable qualified source candidate changed');
 assert.equal(t[0].occurrences[0].argument_result_source_roles.source_domain,'FREE_MASSLESS','free massless source premise cannot be recast as coupled');
 assert.deepEqual(t[0].occurrences[1].argument_result_source_roles.excluded,['GAUGE_COUPLING','HIGGS_COUPLING'],'no gauge and no Higgs both required');
 assert.equal(t[0].occurrences[3].source_relation_or_operator,'SOURCE_LIMITATION_OBSCURED_SYMMETRY','original author stated Poincare action limitation');
 assert.equal(t[2].occurrences[1].argument_result_source_roles.output,'HOLOMORPHIC_F_ON_PT+','source Ward direction from ASD connection to holomorphic bundle');
 assert.deepEqual(t[0].occurrences[5].argument_result_source_roles.halves,[{name:'S4+',condition:'tau>0'},{name:'S4-',condition:'tau<0'}]);
 assert.deepEqual(t[0].occurrences[6].argument_result_source_roles.exact_ordered_addends,w40[2].addends_ordered);
 assert.equal(t[0].occurrences[7].argument_result_source_roles.locus,'N=PT0');
 assert.equal(t[0].occurrences[7].argument_result_source_roles.real_dimension,5);
 assert.equal(t[0].occurrences[8].argument_result_source_roles.base,'S3');
 assert.deepEqual(t[0].occurrences[9].argument_result_source_roles.bases,['S4+','S4-']);
 assert.equal(t[1].occurrences[2].argument_result_source_roles.codomain,'FREE_WEYL_ON_S4+');
 assert.equal(t[1].occurrences[4].argument_result_source_roles.location,'S4+_POINT_CP1_FIBER');
 assert.equal(t[1].occurrences[7].argument_result_source_roles.source_citation,'[14]');
 assert.equal(t[2].occurrences[0].argument_result_source_roles.field,'ASD_CONNECTION');
 assert.equal(t[2].occurrences[4].argument_result_source_roles.excluded,'GENERAL_YM_SOLUTIONS');
 assert.deepEqual(t[2].occurrences[5].argument_result_source_roles.ordered_references,['[29]','[12]','[38]','[9]','[13]','[1]']);
 return {W_G1:'PARTIAL_SOURCE_FIRST_REVIEW',current_G0:'FROZEN',body_ids:ids,occurrences:24,typed_witnesses:12,G2:'BLOCKED'};
}
const yes=verify(copy(A));
const mutants=[
 ['free premise dropped',q=>q.rows[0].occurrences[0].argument_result_source_roles.source_domain='COUPLED'],
 ['gauge coupling incorrectly included',q=>q.rows[0].occurrences[1].argument_result_source_roles.excluded=['GAUGE_COUPLING']],
 ['loss of Poincare caveat',q=>q.rows[0].occurrences[3].source_relation_or_operator='AUTHOR_FULL_POINCARE_SYMMETRY_PROVEN'],
 ['reverse signed hemispheres',q=>q.rows[0].occurrences[5].argument_result_source_roles.halves.reverse()],
 ['alter upper positive sign',q=>q.rows[0].occurrences[5].argument_result_source_roles.halves[0].condition='tau<0'],
 ['flip Hermitian addend order',q=>q.rows[0].occurrences[6].argument_result_source_roles.exact_ordered_addends.reverse()],
 ['erase complex conjugate',q=>q.rows[0].occurrences[6].argument_result_source_roles.exact_ordered_addends[2]='s_1^perp*s_1'],
 ['make null PT0 all PT',q=>q.rows[0].occurrences[7].argument_result_source_roles.locus='PT'],
 ['change null source dimension',q=>q.rows[0].occurrences[7].argument_result_source_roles.real_dimension=3],
 ['collapse signed fibration',q=>q.rows[0].occurrences[9].argument_result_source_roles.bases=['S3','S3']],
 ['misplace positive hemisphere',q=>q.rows[1].occurrences[2].argument_result_source_roles.codomain='FREE_WEYL_ON_S4-'],
 ['arbitrary CP1 instead of selected fiber',q=>q.rows[1].occurrences[4].argument_result_source_roles.location='ALL_CP1'],
 ['claim full state Hilbert proof',q=>q.rows[1].occurrences[5].proof_of_mathematical_claim=true],
 ['import cited Dolbeault theorem',q=>q.rows[1].occurrences[7].argument_result_source_roles.source_citation='[999]'],
 ['make ASD gauge arbitrary YM',q=>q.rows[2].occurrences[0].argument_result_source_roles.field='ANY_YM_CONNECTION'],
 ['erase ASD-only negative',q=>q.rows[2].occurrences[4].argument_result_source_roles.excluded='NONE'],
 ['reverse Ward transform direction',q=>q.rows[2].occurrences[1].argument_result_source_roles.output='ASD_ON_S4+'],
 ['fake YM citation order',q=>q.rows[2].occurrences[5].argument_result_source_roles.ordered_references.reverse()],
 ['source G0 pointer changed',q=>q.frozen_source_inputs.ssc.git_blob_sha='BAD'],
 ['source snippet changed',q=>q.rows[2].occurrences[4].original_author_source_span='Arbitrary gauge coupling'],
 ['replace typed ID',q=>q.rows[0].occurrences[0].source_typed_statement_id='L-SSC-001'],
 ['flip to W/L comparison',q=>q.L_semantics_in_scope=true],
 ['new G2 authorized',q=>q.G2_authorized=true],
 ['false G1 global complete',q=>q.G1_entire_151_complete=true],
 ['Oct03 source falsely closed',q=>q.historical_oct03_G0_status='CLOSED'],
 ['author mathematical proof upgraded',q=>q.rows[0].occurrences[0].semantic_authority=true],
 ['loss of 151 source count',q=>q.summary.current_151_frozen_G0_body_count=150],
 ['fabricate all bodies reviewed',q=>q.summary.current_reviewed_after_independent_acceptance_at_most=151],
 ['drop a required source occurrence',q=>q.rows[2].occurrences.pop()],
 ['illegal future G1 dependency',q=>q.rows[0].occurrences[0].depends_on=['W-SSC-040-W01S43-10']]
];
for(const [name,modify]of mutants){const c=copy(A);modify(c);let failed=false;try{verify(c)}catch(e){failed=true;}assert.ok(failed,'HOSTILE ESCAPE '+name)}
console.log('W G1 W01 §4.3 source-first verification '+JSON.stringify({...yes,rejected_adversarial:mutants.length,total_adversarial:mutants.length}));
