#!/usr/bin/env node
'use strict';
// W current-author G1 entry: provenance-locked 151-body audit, NOT G1 completion.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const b=p=>{const d=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+d.length+'\0'),d])).digest('hex')};
const j=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const pins={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inventory:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 gate:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 old_demand:['research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_7.json','a6cb48c82e5fa72a5820e01da80711eaf96ac2d0'],
 old_extraction:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 method:['research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md','9c03fc5825e4ed5750f376464c01bf77116f3aa2']
};
for(const [n,[p,sha]] of Object.entries(pins))assert.equal(b(p),sha,'source authority drift: '+n);
const ssc=j(pins.ssc[0]),inv=j(pins.inventory[0]),gate=j(pins.gate[0]);
const oldDemand=j(pins.old_demand[0]),oldG1=j(pins.old_extraction[0]);
const M=j('experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_REBASELINE_FRONTIER_0_1.json');
const oldBy=new Map(oldDemand.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const oldExtraction=new Map(oldG1.items.map(x=>[x.census_id,x]));
const originalInv=new Map(inv.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x]));
const SOURCE_IDS=['W-SSC-026','W-SSC-035','W-SSC-037','W-SSC-069','W-SSC-104','W-SSC-125'];
const copy=x=>structuredClone(x);
function verify(m){
 assert.equal(m.schema,'isograph.exp062-w-g1-current-author-source-rebaseline-frontier.v0.1');
 assert.equal(m.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(m.historically_open_target,'W_G0_OCT03_SOURCE_CORPUS_0_2');
 assert.equal(m.status,'CURRENT_REBASELINED_G1_SOURCE_BODY_RECONCILIATION_OPEN');
 assert.equal(m.track,'W');
 assert.equal(m.semantic_authority,false);
 assert.equal(m.authority_routing.G0_new_target_frozen,true);
 assert.equal(m.authority_routing.G1_extraction_authorized_for_new_target,true);
 assert.equal(m.authority_routing.G1_complete,false);
 assert.equal(m.authority_routing.G2_authorized,false);
 assert.equal(m.authority_routing.G3_to_G7_authorized,false);
 assert.equal(m.authority_routing.old_Oct03_G0_complete,false);
 assert.equal(m.authority_routing.L_source_available_as_G1_premise,false);
 assert.equal(m.not_G1_completion_claim,true);
 assert.equal(m.not_primitive_closure,true);
 assert.equal(m.owner_restriction,'W_151_CURRENT_SOURCE_ONLY_NO_L_MATHEMATICS');
 assert.equal(gate.current.G0_frozen,true);
 assert.equal(gate.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(gate.historical_oct03_target.G0_complete,false);
 for(const [id,[p,sha]] of Object.entries(pins))assert.deepEqual(m.original_inputs[id],{path:p,git_blob_sha:sha},'dossier pointer mismatch '+id);
 assert.equal(ssc.items.length,151);
 assert.equal(oldExtraction.size,84);
 assert.equal(m.rows.length,151);
 assert.deepEqual(m.rows.map(x=>x.census_id),ssc.items.map(x=>x.id));
 let oldPresent=0,bodyEqual=0,oldStale=[];
 const seen=new Set();
 for(let i=0;i<ssc.items.length;i++){
  const source=ssc.items[i],f=m.rows[i],o=oldExtraction.get(source.id),body=oldBy.get(source.id),original=originalInv.get(source.id);
  assert.ok(original,'G0 inverse missing '+source.id);
  assert.ok(!seen.has(f.census_id));seen.add(f.census_id);
  assert.equal(f.census_id,source.id);
  assert.equal(f.source_unit,original.unit);
  assert.equal(f.current_frozen_source_body_ref.path,pins.ssc[0]);
  assert.equal(f.current_frozen_source_body_ref.blob_sha,pins.ssc[1]);
  assert.equal(f.current_frozen_source_body_ref.census_id,source.id);
  assert.equal(f.current_frozen_source_body_ref.field,'obligation');
  assert.equal(f.current_source_body_characters,source.obligation.length);
  assert.deepEqual(f.source_semantic_exact_G0_locations,original.original_source_keys);
  assert.deepEqual(f.source_typed_incidence_ids,original.source_typed_statement_ids);
  assert.equal(f.historical_G1.previous_extraction_present,!!o);
  assert.equal(f.historical_G1.previous_occurrences,o?.occurrences.length||0);
  assert.equal(f.historical_G1.historical_body_identical_to_current,!!o&&source.obligation===body);
  assert.equal(f.historical_G1.qualification,'UNQUALIFIED_HISTORICAL_EVIDENCE_NOT_CURRENT_G1_AUTHORITY');
  assert.equal(f.current_G1_extract,null);
  if(o){
   oldPresent++;
   const lost=o.occurrences.filter(x=>!source.obligation.includes(x.source_span));
   assert.equal(f.historical_G1.verbatim_old_source_spans_still_present,o.occurrences.length-lost.length);
   assert.deepEqual(f.historical_G1.nonreconstructing_old_occurrences,lost.map(x=>({old_id:x.occurrence_id,source_span:x.source_span,relation_span:x.relation_span})));
   if(lost.length)oldStale.push(source.id);
   if(body===source.obligation)bodyEqual++;
  } else {
   assert.equal(f.historical_G1.verbatim_old_source_spans_still_present,0);
   assert.deepEqual(f.historical_G1.nonreconstructing_old_occurrences,[]);
  }
  assert.equal(f.current_G1_state,o&&body===source.obligation?'HISTORICAL_BODY_EXACT_CANDIDATE_REQUIRES_FRESH_COLD_G1_REVIEW':'OCCURRENCE_EXTRACTION_INCOMPLETE');
 }
 assert.equal(oldPresent,84);assert.equal(bodyEqual,17);
 assert.deepEqual(oldStale,SOURCE_IDS);
 assert.equal(m.summary.historical_G1_bodies,84);
 assert.equal(m.summary.historical_G1_exact_body_candidates,17);
 assert.equal(m.summary.historical_G1_changed_bodies,67);
 assert.equal(m.summary.current_bodies_without_historical_G1,67);
 assert.equal(m.summary.historical_G1_bodies_with_stale_verbatim_source_span,6);
 assert.equal(m.summary.legacy_occurrences_total,496);
 assert.equal(m.summary.current_frozen_SSC_bodies,151);
 assert.equal(m.summary.current_G1_fully_extracted,0);
 assert.equal(m.summary.remaining_G1_source_bodies_requiring_review,151);
 assert.equal(m.summary.G2_authorized,false);
 assert.equal(m.summary.stage_new_target,'G1_BEGUN_FRONTIER_ONLY');
 assert.equal(m.summary.original_G0_source_locations,649);
 assert.equal(m.summary.original_G0_bidirectional_source_memberships,560);
 assert.deepEqual(m.confirmed_reopening_classes[0].affected_G1_census_ids,SOURCE_IDS);
 assert.deepEqual([m.confirmed_reopening_classes[1].affected_count,m.confirmed_reopening_classes[2].affected_count],[67,67]);
 return {new_G1:'OPEN_FRONTIER',frozen_G0:151,historical_G1_bodies:84,exact_historical_candidates:17,changed_prior_G1_bodies:67,missing_from_old_G1:67,known_stale_span_bodies:oldStale.length,old_G0:'OPEN'};
}
const yes=verify(copy(M));
const attacks=[
 ['add new fake SSC row',a=>a.rows.push(a.rows[0])],
 ['drop 151st row',a=>a.rows.pop()],
 ['rewrite source owner',a=>a.rows[0].source_unit='W02'],
 ['rewrite source locator',a=>a.rows[0].source_semantic_exact_G0_locations=['fake']],
 ['erase typed ID',a=>a.rows.find(x=>x.source_typed_incidence_ids.length).source_typed_incidence_ids=[]],
 ['fake body length',a=>a.rows[0].current_source_body_characters=999],
 ['claim old G1 current-authority',a=>a.rows[0].historical_G1.qualification='PASS'],
 ['mark current G1 complete',a=>a.authority_routing.G1_complete=true],
 ['authorize G2',a=>a.authority_routing.G2_authorized=true],
 ['import other author',a=>a.authority_routing.L_source_available_as_G1_premise=true],
 ['historic Oct03 G0 close',a=>a.authority_routing.old_Oct03_G0_complete=true],
 ['erase W125 source mismatch',a=>a.rows.find(x=>x.census_id==='W-SSC-125').historical_G1.nonreconstructing_old_occurrences=[]],
 ['reuse W026 source false KAPPA',a=>a.rows.find(x=>x.census_id==='W-SSC-026').historical_G1.nonreconstructing_old_occurrences=[]],
 ['lie all source bodies exact',a=>a.summary.historical_G1_exact_body_candidates=84],
 ['invent G1 source extraction',a=>a.summary.current_G1_fully_extracted=151],
 ['drop exact inverse citation',a=>a.rows[1].current_frozen_source_body_ref.blob_sha='BAD'],
 ['false prior summary 67 changed',a=>a.summary.historical_G1_changed_bodies=0],
 ['attach phantom extracted semantics',a=>a.rows[2].current_G1_extract={fake:true}]
];
for(const [name,change]of attacks){let candidate=copy(M);change(candidate);let rejected=false;try{verify(candidate)}catch(e){rejected=true;}assert.ok(rejected,'hostile escaped '+name)}
console.log('W G1 current exact source rebaseline frontier PASS '+JSON.stringify({...yes,adversarial_rejected:attacks.length,adversarial_total:attacks.length}));
