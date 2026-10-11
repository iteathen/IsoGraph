#!/usr/bin/env node
'use strict';
// G1 source-local cold reconciliation from a frozen nine-source W G0 tuple.
// Do not promote source-internal existence, mathematical truth, new primitive, or G2.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const inputs={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 old_G1:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 inventory:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 frontier:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_REBASELINE_FRONTIER_0_1.json','0813758c9d11a32fa7e9e90329aaa7cf4d3d4c19'],
 gate:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 old_candidate:['experiments/062/W_G1_CURRENT_AUTHOR_HIGH_RISK_SOURCE_LOCAL_REPAIRS_0_1.json','ce5d9c0d127b83eea2eb17fd71282e55a1935364']
};
for(const [k,[p,s]]of Object.entries(inputs))assert.equal(sha(p),s,'fixed evidence SHA changed '+k);
const sources=read(inputs.ssc[0]),prior=read(inputs.old_G1[0]),inverse=read(inputs.inventory[0]),frontier=read(inputs.frontier[0]),gate=read(inputs.gate[0]),old=read(inputs.old_candidate[0]);
const m=read('experiments/062/W_G1_CURRENT_AUTHOR_HIGH_RISK_SOURCE_LOCAL_REPAIRS_0_2.json');
const items=new Map(sources.items.map(x=>[x.id,x])),inv=new Map(inverse.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x])),older=new Map(prior.items.map(x=>[x.census_id,x]));
const order=['W-SSC-125','W-SSC-022','W-SSC-026'];
const counts=[7,11,9];
const removed=['W-SSC-125-NG1-07','W-SSC-022-NG1-12','W-SSC-026-NG1-10','W-SSC-026-NG1-11'];
const copy=x=>structuredClone(x);
function verify(x){
 assert.equal(x.schema,'isograph.exp062-w-current-author-g1-source-local-repair.v0.2');
 assert.equal(x.stage,'G1_SOURCE_LOCAL_REVISED_CANDIDATES_AWAITING_EXACT_CI');
 assert.equal(x.track,'W');
 assert.equal(x.current_frozen_source_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(x.predecessor.path,inputs.old_candidate[0]);
 assert.equal(x.predecessor.git_blob_sha,inputs.old_candidate[1]);
 assert.equal(x.predecessor.source_revision_preserved,true);
 assert.equal(x.repair_class,'RECLASSIFY_4_G0_ANALYST_FIDELITY_GUARDS_AS_METADATA_NOT_AUTHOR_OPERATIONS');
 assert.equal(x.historical_original_target_open,true);
 assert.equal(x.current_G1_partial_only,true);
 assert.equal(x.entire_151_body_G1_complete,false);
 assert.equal(x.G2_authorized,false);
 assert.equal(x.no_L_data_use,true);
 assert.equal(x.source_only_semantics_not_qualified_physics,true);
 assert.equal(x.summary.source_local_candidate_bodies,3);
 assert.equal(x.summary.source_local_occurrences,27);
 assert.equal(x.summary.current_frozen_G0_source_bodies,151);
 assert.equal(x.summary.remaining_G1_bodies_for_review,151);
 assert.equal(x.summary.predecessor_candidate_occurrences,31);
 assert.equal(x.summary.excluded_audit_guard_pseudo_occurrences,4);
 assert.equal(x.summary.author_source_occs_pending_independent_qualification,27);
 assert.equal(x.summary.current_G1_qualified,false);
 assert.equal(x.summary.no_claim_of_G1_fixed_point,true);
 assert.equal(x.older_source_body_G1_complete,false);
 assert.equal(gate.current.G0_frozen,true);
 assert.equal(gate.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(gate.historical_oct03_target.G0_complete,false);
 assert.equal(sources.items.length,151);
 assert.equal(inverse.current_ssc_to_original_inverse.length,151);
 assert.equal(frontier.rows.length,151);
 assert.deepEqual(x.frozen_input_blobs,{ssc:inputs.ssc[1],old_G1:inputs.old_G1[1],inventory:inputs.inventory[1],frontier:inputs.frontier[1],gate:inputs.gate[1]});
 assert.deepEqual(x.rows.map(z=>z.census_id),order);
 assert.deepEqual(x.rows.map(z=>z.occurrences.length),counts);
 assert.deepEqual(x.audit_guard_not_occurrence.map(z=>z.old_occurrence_id),removed);
 const seen=new Set();
 let occTotal=0;
 for(let i=0;i<x.rows.length;i++){
  const z=x.rows[i],source=items.get(z.census_id),idx=inv.get(z.census_id),oldItem=older.get(z.census_id);
  assert.ok(source&&idx&&oldItem);
  assert.equal(z.source_body_ref.ssc_git_sha,inputs.ssc[1]);
  assert.equal(z.source_body_ref.field,'obligation');
  assert.equal(z.source_body_ref.census_id,z.census_id);
  assert.equal(z.exact_current_frozen_source_body,source.obligation,'current source body drift');
  assert.equal(z.source_unit,idx.unit);
  assert.equal(z.current_local_extraction_status,'SOURCE_LOCAL_REVISED_CANDIDATE_G1_UNQUALIFIED_PENDING_ORIGINAL_FIRST_CHECKS');
  assert.equal(z.provenance_and_scope_guards.original_G0_analyst_negative_guards_not_author_assertion,true);
  assert.equal(z.provenance_and_scope_guards.author_source_roles_only,true);
  assert.equal(z.provenance_and_scope_guards.mathematical_or_physical_truth_claimed,false);
  assert.deepEqual(z.source_typed_statement_ids,idx.source_typed_statement_ids);
  assert.equal(z.historical_G1_record_preserved.source,inputs.old_G1[0]);
  assert.equal(z.historical_G1_record_preserved.old_occurrence_count,oldItem.occurrences.length);
  assert.equal(z.historical_G1_record_preserved.semantic_authority,'NONE_HISTORICAL');
  for(const key of z.original_source_location_keys)assert.ok(idx.original_source_keys.includes(key),'wrong G0 source location: '+key);
  const local=new Set();
  for(const occ of z.occurrences){
   occTotal++;
   assert.match(occ.occurrence_id,new RegExp('^'+z.census_id+'-NG1-\\d{2}$'));
   assert.ok(!seen.has(occ.occurrence_id),'global occurrence collision');
   assert.ok(!removed.includes(occ.occurrence_id),'G0 analyst guard misrepresented as source occurrence');
   seen.add(occ.occurrence_id);
   assert.equal(occ.status,'SOURCE_LOCAL_CANDIDATE_NOT_G1_QUALIFIED');
   assert.equal(occ.binder_ownership,'EXACT_SOURCE_CLAUSE_ONLY_NO_UNSTATED_GLOBAL_BINDER');
   assert.ok(occ.source_span.length>=4);
   assert.ok(source.obligation.includes(occ.source_span),'source phrase absent from frozen body '+occ.occurrence_id);
   assert.ok(occ.source_span.includes(occ.relation_span),'relation token absent from source span');
   for(const arg of occ.argument_spans)assert.ok(occ.source_span.includes(arg),'argument absent '+arg);
   for(const dep of occ.depends_on)assert.ok(local.has(dep),'nonlocal or forward dependence '+dep);
   assert.ok(typeof occ.logical_force==='string'&&occ.logical_force.length>5);
   assert.ok(occ.source_argument_result_roles && typeof occ.source_argument_result_roles==='object');
   assert.ok(!Object.hasOwn(occ,'requires')&&!Object.hasOwn(occ,'primitive_id')&&!Object.hasOwn(occ,'CLOSED_SCHEMA'));
   local.add(occ.occurrence_id);
  }
 }
 assert.equal(occTotal,27);
 for(const g of x.audit_guard_not_occurrence){
  assert.equal(g.correct_disposition,'FROZEN_G0_AUDIT_GUARD_NOT_WOIT_AUTHOR_SOURCE_OCCURRENCE');
  assert.equal(g.record_preserved_in_predecessor,true);
  const predecessor=old.rows.find(y=>y.census_id===g.census_id).occurrences.find(y=>y.occurrence_id===g.old_occurrence_id);
  assert.ok(predecessor,'missing original misclassified guard');
  assert.equal(g.old_original_source_span,predecessor.source_span);
  assert.equal(g.original_logical_force,predecessor.logical_force);
  assert.ok(g.reason.length>50);
 }
 const t125=items.get('W-SSC-125').source_expression_census.statements.find(o=>o.id==='W04E125-E02');
 assert.equal(t125.operator_constructed,false);
 assert.equal(t125.operator_qualified,false);
 assert.equal(t125.modal,'OPEN_RELATED_TO_TWISTOR_TRANSFORM');
 const w125=x.rows[0];
 assert.equal(w125.occurrences.find(o=>o.occurrence_id.endsWith('-06')).logical_force,'AUTHOR_UNRESOLVED_SEARCH_NOT_ESTABLISHED_CONSTRUCTION');
 assert.equal(w125.occurrences.find(o=>o.occurrence_id.endsWith('-08')).logical_force,'OPAQUE_REFERENT_OF_UNCONSTRUCTED_OPERATOR');
 assert.ok(!w125.occurrences.some(o=>o.logical_force==='ASSERTED_THETA_CONJUGATION_SUCCESS'));
 const t22=items.get('W-SSC-022').source_expression_census.statements.find(o=>o.id==='W04E-022-01');
 assert.equal(t22.goal,'LOCAL_4D_QUANTUM_FIELD_THEORY');
 assert.equal(t22.completion,'NOT_CONSTRUCTED_IN_GENERAL_4D');
 assert.equal(t22.negative,'NOT_TRYING_TO_PRODUCE_TOPOLOGICAL_QFT');
 const w22=x.rows[1];
 assert.equal(w22.occurrences.find(o=>o.occurrence_id.endsWith('-06')).logical_force,'AUTHOR_NEGATIVE_INTENT');
 assert.equal(w22.occurrences.find(o=>o.occurrence_id.endsWith('-07')).logical_force,'AUTHOR_MERE_POSSIBLE_BYPRODUCT');
 assert.equal(w22.occurrences.find(o=>o.occurrence_id.endsWith('-11')).logical_force,'AUTHOR_LIMITED_EPISTEMIC_UNKNOWN');
 const t26=items.get('W-SSC-026').source_expression_census.statements.find(o=>o.id==='W01-026-QUATNORM-04');
 assert.equal(t26.negative,'NOT_KAPPA(x)');
 assert.match(t26.source_latex,/overline/);
 const w26=x.rows[2];
 assert.equal(w26.occurrences.find(o=>o.occurrence_id.endsWith('-07')).source_span,'|x|^2=x*conjugate(x)');
 assert.equal(w26.occurrences.find(o=>o.occurrence_id.endsWith('-09')).relation_span,'conjugate');
 assert.ok(w26.occurrences.every(o=>!o.source_span.includes('KAPPA(x)')));
 assert.equal(w26.occurrences.find(o=>o.occurrence_id.endsWith('-02')).source_argument_result_roles.binder,'x_MATRIX_MODEL');
 assert.equal(w26.occurrences.find(o=>o.occurrence_id.endsWith('-06')).source_argument_result_roles.binder,'x_QUATERNION_MODEL');
 return {G1:'PARTIAL_SOURCE_LOCAL',body_count:3,active_author_occurrences:27,audit_nonoccurrence_guards:4,original_G0:'FROZEN',Oct03_original_G0:'OPEN',G2:'BLOCKED'};
}
const result=verify(copy(m));
const tests=[
 ['delete one source occurrence',v=>v.rows[0].occurrences.pop()],
 ['reinsert G0 analyst KAPPA correction as source operator',v=>v.rows[2].occurrences.push(old.rows[2].occurrences.find(x=>x.occurrence_id.endsWith('-11')))],
 ['assert Θ is constructed',v=>v.rows[0].occurrences.find(x=>x.occurrence_id.endsWith('-06')).logical_force='ASSERTED_THETA_CONJUGATION_SUCCESS'],
 ['source Θ wrong source span',v=>v.rows[0].occurrences[0].source_span='Θ definitely proven'],
 ['erase Θ unconstructed referent',v=>v.rows[0].occurrences.find(x=>x.occurrence_id.endsWith('-08')).logical_force='DEFINED_OPERATOR'],
 ['replace W022 negative intent with successful physics',v=>v.rows[1].occurrences.find(x=>x.occurrence_id.endsWith('-06')).logical_force='PROVED_GLOBAL_TOPOLOGICAL_QFT'],
 ['byproduct maybe -> exists',v=>v.rows[1].occurrences.find(x=>x.occurrence_id.endsWith('-07')).logical_force='EXISTS'],
 ['novelty caveat erased',v=>v.rows[1].occurrences.find(x=>x.occurrence_id.endsWith('-11')).logical_force='PROVED_NOVEL'],
 ['KAPPA old token marked as source truth',v=>v.audit_guard_not_occurrence[3].correct_disposition='W_AUTHOR_ASSERTION'],
 ['delete analyst guard',v=>v.audit_guard_not_occurrence.pop()],
 ['incorrect G0 source provenance',v=>v.rows[0].original_source_location_keys=['W01/fake']],
 ['change W022 original author reply source',v=>v.rows[1].source_unit='W01'],
 ['replace true quaternion binding with matrix',v=>v.rows[2].occurrences.find(x=>x.occurrence_id.endsWith('-06')).source_argument_result_roles.binder='x_MATRIX_MODEL'],
 ['reverse quaternion multiplication',v=>v.rows[2].occurrences.find(x=>x.occurrence_id.endsWith('-07')).source_span='|x|^2=conjugate(x)*x'],
 ['future dependency',v=>v.rows[0].occurrences[0].depends_on=['W-SSC-125-NG1-08']],
 ['invent external primitive',v=>v.rows[0].occurrences[1].primitive_id='QU'],
 ['false current G1 complete',v=>v.entire_151_body_G1_complete=true],
 ['false G2',v=>v.G2_authorized=true],
 ['false historical G0 complete',v=>v.historical_original_target_open=false],
 ['cross author data',v=>v.no_L_data_use=false],
 ['SSC body co-edit',v=>v.rows[2].exact_current_frozen_source_body='bad'],
 ['source exact guard drift',v=>v.frozen_input_blobs.ssc='bad'],
 ['falsify current G1 count',v=>v.summary.source_local_occurrences=31],
 ['falsify old source provenance',v=>v.predecessor.git_blob_sha='bad'],
 ['fake status accepted',v=>v.rows[0].current_local_extraction_status='G1_COMPLETE']
];
let accepted=0;for(const [name,fn]of tests){let c=copy(m);fn(c);let failed=false;try{verify(c)}catch(e){failed=true;}assert.ok(failed,'HOSTILE ESCAPED '+name);accepted++;}
console.log('W G1 source-local 3-body real author operation/relation PASS '+JSON.stringify({...result,adversarial_rejected:accepted,adversarial_total:accepted}));
