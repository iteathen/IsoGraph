#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const j=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const p={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 stage:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_2.json','1b74246bd5e216ac6e2ec9a6731ba23528301e6e'],
 old:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 g0:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a']
};
for(const [k,[path,ref]] of Object.entries(p))assert.equal(sha(path),ref,'source/authority changed '+k);
const ssc=j(p.ssc[0]),inv=j(p.inverse[0]),prior=j(p.old[0]),stage=j(p.stage[0]),g0=j(p.g0[0]),m=j('experiments/062/W_G1_CURRENT_AUTHOR_SIX_SOURCE_FIRST_EXACT_BODIES_0_1.json');
const sources=new Map(ssc.items.map(x=>[x.id,x])),inverse=new Map(inv.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x])),older=new Map(prior.items.map(x=>[x.census_id,x]));
const ids=['W-SSC-001','W-SSC-014','W-SSC-062','W-SSC-114','W-SSC-134','W-SSC-138'];
const lens=[1,5,7,5,5,6];
const critical={
 'W-SSC-014':{0:['same_carrier',false],2:['group','SU(2,2)'],3:['orbit_count',3]},
 'W-SSC-062':{1:['domain','DUAL(S_R)'],5:['signature','EUCLIDEAN']},
 'W-SSC-114':{2:['count',16],0:['status','PROPOSED_NOT_CONSTRUCTED']},
 'W-SSC-134':{1:['action','TRIVIAL'],2:['action','NONTRIVIAL']},
 'W-SSC-138':{1:['nonzero',true],2:['witness','SELECTED_V']}
};
const c=x=>structuredClone(x);
function verify(x){
 assert.equal(x.schema,'isograph.exp062.W.G1.six-original-first-exact-body-0.1');
 assert.equal(x.track,'W');
 assert.equal(x.stage,'G1_SIX_SOURCE_LOCAL_CANDIDATES_PENDING_COLD_AUTHENTICATION');
 assert.equal(x.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(x.original_oct03_G0_open,true);
 assert.equal(x.G0_current_frozen,true);
 assert.equal(x.G1_global_complete,false);
 assert.equal(x.G2_authorized,false);
 assert.equal(x.other_author_semantics_used,false);
 assert.equal(x.no_primitive_authority_inferred,true);
 assert.equal(g0.current.G0_frozen,true);
 assert.equal(g0.historical_oct03_target.G0_complete,false);
 assert.equal(stage.G1_complete,false);
 assert.equal(stage.G2_authorized,false);
 assert.equal(ssc.items.length,151);
 assert.equal(inv.current_ssc_to_original_inverse.length,151);
 assert.deepEqual(x.source_input_pins,Object.fromEntries(Object.entries(p).map(([k,[path,ref]])=>[k,{path,sha:ref}])));
 assert.equal(x.rows.length,6);
 assert.deepEqual(x.rows.map(y=>y.census_id),ids);
 assert.deepEqual(x.rows.map(y=>y.occurrences.length),lens);
 assert.equal(x.summary.frozen_W_source_bodies,151);
 assert.equal(x.summary.previous_qualified_source_local,12);
 assert.equal(x.summary.new_candidate_source_bodies,6);
 assert.equal(x.summary.new_candidate_occurrences,29);
 assert.equal(x.summary.source_local_total_if_qualified,18);
 assert.equal(x.summary.remaining_if_qualified,133);
 assert.deepEqual(x.reviewed_12_prior_exact_conserved,Object.values(stage.source_reconciliation.reviewed_ids_by_input).flat());
 const seen=new Set();
 for(let i=0;i<x.rows.length;i++){
  const row=x.rows[i],source=sources.get(row.census_id),e=inverse.get(row.census_id),old=older.get(row.census_id);
  assert.ok(source&&e&&old);
  assert.equal(row.frozen_SSC_body,source.obligation);
  assert.equal(row.source_unit,e.unit);
  assert.deepEqual(row.original_G0_source_location_keys,e.original_source_keys);
  assert.deepEqual(row.original_G0_source_typed_incidence_ids,e.source_typed_statement_ids);
  assert.equal(row.historical_old_G1_occurrence_count,old.occurrences.length);
  assert.equal(row.historical_record_not_currently_authoritative,true);
  assert.equal(row.stage,'G1_SOURCE_LOCAL_ORIGINAL_FIRST_CANDIDATE_NOT_GLOBAL_G1');
  assert.ok(row.original_author_source_locator.length>15);
  assert.ok(row.independently_read_original_anchor_fragments.length>=2);
  for(const [z,o] of row.occurrences.entries()){
   assert.equal(o.occurrence_id,row.census_id+'-CURG1-'+String(z+1).padStart(2,'0'));
   assert.ok(!seen.has(o.occurrence_id));seen.add(o.occurrence_id);
   assert.equal(o.semantic_authority,false);
   assert.equal(o.operator_definition_status,'SOURCE_NAMED_BEHAVIOR_NOT_PRIMITIVE_CLOSED');
   assert.equal(o.source_binder_scope,'INHERIT_LOCAL_FROZEN_SSC_AND_ORIGINAL_PRIMARY_SOURCE_NOT_A_GLOBAL_SEMANTIC_AXIOM');
   assert.ok(o.source_modality_guard.length>20);
   assert.ok(source.obligation.includes(o.source_span),'span not in frozen G0 '+o.occurrence_id);
   assert.ok(o.source_span.includes(o.relation_span),'relation not in source span');
   for(const a of o.argument_spans)assert.ok(o.source_span.includes(a),'argument not in span '+o.occurrence_id);
   const prevDep=z?[row.occurrences[z-1].occurrence_id]:[];
   assert.deepEqual(o.depends_on,prevDep,'ordered local dependency violates frozen occurrence order');
   assert.ok(!('requires' in o||'primitive_id' in o||'CLOSED_SCHEMA' in o));
  }
 }
 assert.equal(seen.size,29);
 for(const [id,tests] of Object.entries(critical)){
  const row=x.rows.find(z=>z.census_id===id);
  for(const [idx,[key,val]] of Object.entries(tests)){
   assert.deepEqual(row.occurrences[Number(idx)].ordered_argument_and_result_roles[key],val,'loss of original source role '+id+'/'+key);
  }
 }
 assert.equal(x.rows[3].occurrences[2].logical_force,'CONDITIONAL_SIXTEEN_COPIES');
 assert.equal(x.rows[5].occurrences[2].logical_force,'CHOICE_DEPENDENT_SPINOR_ISOMORPHISM');
 assert.equal(x.rows[4].occurrences[3].logical_force,'RIGHT_CONJUGATE_REP_EQUIVALENCE');
 assert.deepEqual(x.rows[2].occurrences[6].ordered_argument_and_result_roles.cases,['MINKOWSKI_CONJUGATE','EUCLIDEAN_INDEPENDENT']);
 return {six_source_local:true,old_G1_not_promoted:true,author_occurrences:29,source_units:4,global_G1:'OPEN',G2:'BLOCKED'};
}
const base=verify(c(m));
const tests=[
 ['delete source body',x=>x.rows.pop()],
 ['duplicate source body',x=>x.rows.push(x.rows[0])],
 ['rewrite G0 body',x=>x.rows[2].frozen_SSC_body='UNTRUSTED'],
 ['swap source ids',x=>x.rows[0].census_id='W-SSC-002'],
 ['missing source locator',x=>x.rows[4].original_G0_source_location_keys.pop()],
 ['rewrite source typed statement',x=>x.rows[3].original_G0_source_typed_incidence_ids=[]],
 ['fake older authority',x=>x.rows[0].historical_record_not_currently_authoritative=false],
 ['present PT same as C4',x=>x.rows[1].occurrences[0].ordered_argument_and_result_roles.same_carrier=true],
 ['SU2 real-form substitution',x=>x.rows[1].occurrences[2].ordered_argument_and_result_roles.group='SU(4)'],
 ['invent fourth orbit',x=>x.rows[1].occurrences[3].ordered_argument_and_result_roles.orbit_count=4],
 ['map wrong spinor input',x=>x.rows[2].occurrences[1].ordered_argument_and_result_roles.domain='S_L^*'],
 ['lose Euclidean case',x=>x.rows[2].occurrences[5].ordered_argument_and_result_roles.signature='MINKOWSKI'],
 ['lose signed contrast',x=>x.rows[2].occurrences[6].ordered_argument_and_result_roles.cases.reverse()],
 ['hypothetical PT lift asserted completed',x=>x.rows[3].occurrences[0].ordered_argument_and_result_roles.status='COMPLETED'],
 ['16 source copies mutated',x=>x.rows[3].occurrences[2].ordered_argument_and_result_roles.count=8],
 ['SU2L trivial becomes nontrivial',x=>x.rows[4].occurrences[1].ordered_argument_and_result_roles.action='NONTRIVIAL'],
 ['SU2R nontrivial becomes trivial',x=>x.rows[4].occurrences[2].ordered_argument_and_result_roles.action='TRIVIAL'],
 ['remove chosen nonzero',x=>x.rows[5].occurrences[1].ordered_argument_and_result_roles.nonzero=false],
 ['make vector independent',x=>x.rows[5].occurrences[2].ordered_argument_and_result_roles.witness='CANONICAL'],
 ['overclaim W138',x=>x.rows[5].occurrences[2].logical_force='CANONICAL_SPINOR_ISOMORPHISM'],
 ['add missing source argument',x=>x.rows[5].occurrences[0].argument_spans=['not in source body']],
 ['invert edge dependency',x=>x.rows[1].occurrences[0].depends_on=['W-SSC-014-CURG1-05']],
 ['invent semantic primitive',x=>x.rows[3].occurrences[1].primitive_id='TWISTOR_LIFT'],
 ['claim global G1',x=>x.G1_global_complete=true],
 ['authorize G2',x=>x.G2_authorized=true],
 ['claim Oct03 bytes',x=>x.original_oct03_G0_open=false],
 ['import L',x=>x.other_author_semantics_used=true],
 ['remove source uncertainty',x=>x.rows[3].occurrences[0].source_modality_guard='short'],
 ['fake previous 12',x=>x.summary.previous_qualified_source_local=84],
 ['hide old G1 issues',x=>x.reviewed_12_prior_exact_conserved=[]]
];
for(const [name,mutate] of tests){let q=c(m),reject=false;mutate(q);try{verify(q)}catch(e){reject=true}assert.ok(reject,'hostile escaped: '+name)}
console.log('W_G1_SIX_SOURCE_LOCAL_EXACT_CONSERVATION_PASS '+JSON.stringify({...base,hostile_rejected:tests.length,hostile_total:tests.length}));
