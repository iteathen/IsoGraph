#!/usr/bin/env node
'use strict';
// Four W original-source current-G0 to G1 body-local reviews. No global G1/G2 claims.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const sha=p=>{let b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const input={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 frontier:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_REBASELINE_FRONTIER_0_1.json','0813758c9d11a32fa7e9e90329aaa7cf4d3d4c19'],
 oldG1:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 gate:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 candidate:['experiments/062/W_G1_CURRENT_AUTHOR_FOUR_STALE_SOURCE_LOCAL_REPAIRS_0_1.json','fb15c94ae4cfc91126040c16cdf84113bad39a2a']
};
for(const [k,[path,expected]] of Object.entries(input))assert.equal(sha(path),expected,'source SHA drift '+k);
const ssc=read(input.ssc[0]),inv=read(input.inverse[0]),front=read(input.frontier[0]),old=read(input.oldG1[0]),stage=read(input.gate[0]),prior=read(input.candidate[0]);
const m=read('experiments/062/W_G1_CURRENT_AUTHOR_FOUR_STALE_SOURCE_LOCAL_REPAIRS_0_2.json');
const C=new Map(ssc.items.map(x=>[x.id,x])),I=new Map(inv.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x])),O=new Map(old.items.map(x=>[x.census_id,x]));
const ids=['W-SSC-035','W-SSC-037','W-SSC-069','W-SSC-104'];
const denom=[9,12,12,17];
const excluded=['W-SSC-069-NEWG1-13','W-SSC-069-NEWG1-14','W-SSC-104-NEWG1-18','W-SSC-104-NEWG1-19'];
const copy=x=>structuredClone(x);
function verify(q){
 assert.equal(q.schema,'isograph.exp062-W-G1-current-author-four-stale-source-local-occurrences.v0.2');
 assert.equal(q.track,'W');
 assert.equal(q.status,'FOUR_RECONCILED_SOURCE_FIRST_AUTHOR_OPERATOR_CANDIDATES_PENDING_CI');
 assert.equal(q.G1_scope,'SOURCE_LOCAL_OPERATION_AND_RELATION_EXTRACTION_ONLY');
 assert.equal(q.current_frozen_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(q.historical_2026_10_03_target_G0,'OPEN');
 assert.equal(q.G2_authorized,false);
 assert.equal(q.no_L_semantics,true);
 assert.equal(q.original_source_not_imported_qualified_third_party_math,true);
 assert.equal(q.authors_exact_modality_and_negative_meaning_preserved,true);
 assert.equal(q.source_MATH_truth_not_proven,true);
 assert.equal(q.predecessor.path,input.candidate[0]);
 assert.equal(q.predecessor.sha,input.candidate[1]);
 assert.equal(q.predecessor.record_preserved,true);
 assert.deepEqual(q.source_inputs,{
   current_SSC_blob:input.ssc[1],source_inverse_blob:input.inverse[1],
   source_frontier_blob:input.frontier[1],older_G1_blob:input.oldG1[1],G0_stage_gate_blob:input.gate[1]
 });
 assert.equal(stage.current.G0_frozen,true);
 assert.equal(stage.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(stage.historical_oct03_target.G0_complete,false);
 assert.equal(ssc.items.length,151);
 assert.equal(front.rows.length,151);
 assert.equal(inv.current_ssc_to_original_inverse.length,151);
 assert.deepEqual(q.previous_four_ids,ids);
 assert.equal(q.summary.corrected_stale_G1_source_bodies,4);
 assert.equal(q.summary.source_frozen_body_count,151);
 assert.equal(q.summary.current_source_G0_qualified,true);
 assert.equal(q.summary.full_current_G1_complete,false);
 assert.equal(q.summary.current_G2_authorized,false);
 assert.equal(q.summary.source_bodies_remaining_for_complete_cold_review,151);
 assert.equal(q.summary.previous_candidate_occurrences,54);
 assert.equal(q.summary.occurrence_candidates,50);
 assert.equal(q.summary.nonoperator_or_duplicate_exclusions,4);
 assert.equal(q.summary.current_four_body_G1_qualified,false);
 assert.deepEqual(q.rows.map(x=>x.census_id),ids);
 assert.deepEqual(q.rows.map(x=>x.occurrences.length),denom);
 assert.deepEqual(q.reclassified_nonoccurrence_or_duplicate.map(x=>x.old_candidate_id),excluded);
 let n=0;
 const seen=new Set();
 for(let i=0;i<q.rows.length;i++){
   const row=q.rows[i],obj=C.get(row.census_id),origin=I.get(row.census_id),legacy=O.get(row.census_id);
   assert.ok(obj&&origin&&legacy);
   assert.equal(row.source_unit,origin.unit);
   assert.equal(row.exact_frozen_SSC_body,obj.obligation,'source body mismatch '+row.census_id);
   assert.equal(row.frozen_current_SSC_locator.git_blob_sha,input.ssc[1]);
   assert.equal(row.frozen_current_SSC_locator.field,'obligation');
   assert.equal(row.frozen_current_SSC_locator.id,row.census_id);
   assert.deepEqual(row.original_author_source_locations,origin.original_source_keys);
   assert.deepEqual(row.original_author_typed_source_ids,origin.source_typed_statement_ids);
   assert.equal(row.historical_predecessor_G1.path,input.oldG1[0]);
   assert.equal(row.historical_predecessor_G1.git_blob_sha,input.oldG1[1]);
   assert.equal(row.historical_predecessor_G1.occurrences,legacy.occurrences.length);
   assert.equal(row.historical_predecessor_G1.current_scope_authority,false);
   assert.equal(row.current_G1_status,'SOURCE_LOCAL_RECONCILED_CANDIDATE_NOT_G1_GLOBAL_COMPLETE');
   assert.equal(row.source_audit_guards_preserved_as_metadata.no_analytic_guard_promoted_to_theorem,true);
   assert.equal(row.source_audit_guards_preserved_as_metadata.freeze_G0_body_unchanged,true);
   assert.equal(row.source_audit_guards_preserved_as_metadata.source_restatement_not_counted_twice,true);
   assert.ok(row.source_first_review?.length>=20);
   const local=new Set();
   for(const [index,o] of row.occurrences.entries()){
     n++;
     assert.equal(o.occurrence_id,row.census_id+'-NEWG1-'+String(index+1).padStart(2,'0'),'invalid ordinal source occurrence '+o.occurrence_id);
     assert.ok(!seen.has(o.occurrence_id),'duplicate source occurrence');
     assert.ok(!excluded.includes(o.occurrence_id),'analyst guard or duplicate as G1 occurrence');
     assert.equal(o.status,'G1_SOURCE_LOCAL_CANDIDATE_PENDING_COLD_REVIEW');
     assert.equal(o.epistemic_class,'WOIT_SOURCE_ASSERTION_OR_SOURCE_GIVEN_LIMITATION_ONLY');
     assert.equal(o.semantics_source_not_qualified_mathematical_truth,true);
     assert.ok(obj.obligation.includes(o.source_span),'nonfrozen author body source span: '+o.occurrence_id);
     assert.ok(o.source_span.includes(o.relation_span),'relation absent from frozen span: '+o.occurrence_id);
     for(const a of o.argument_spans)assert.ok(o.source_span.includes(a),'source operand absent '+o.occurrence_id+' '+a);
     for(const dep of o.depends_on)assert.ok(local.has(dep),'invalid binder/dependency '+o.occurrence_id+' <- '+dep);
     assert.ok(o.logical_force.length>5);
     assert.ok(o.source_side_conditions_modality.length>10);
     assert.ok(o.source_specific_roles&&typeof o.source_specific_roles==='object');
     assert.ok(!Object.hasOwn(o,'requires')&&!Object.hasOwn(o,'primitive_id')&&!Object.hasOwn(o,'CLOSED_SCHEMA'));
     seen.add(o.occurrence_id);local.add(o.occurrence_id);
   }
 }
 assert.equal(n,50);
 for(const z of q.reclassified_nonoccurrence_or_duplicate){
   assert.equal(z.result,'SOURCE_DUPLICATE_OR_G0_EPISTEMIC_SCOPE_GUARD_NOT_SEPARATE_AUTHORED_OPERATOR');
   assert.equal(z.old_source_record_immutable,true);
   assert.ok(z.exclusion_reason.length>70);
   const oldO=prior.rows.find(x=>x.census_id===z.census_id).occurrences.find(x=>x.occurrence_id===z.old_candidate_id);
   assert.ok(oldO);
   assert.equal(z.source_span,oldO.source_span);
 }
 const W035=C.get('W-SSC-035').source_expression_census.statements;
 assert.deepEqual(W035[1].right_weights_ordered,[-1,1]);
 assert.match(W035[1].source_latex,/\\oplus/);
 assert.equal(q.rows[0].occurrences[6].source_specific_roles.operator,'DIRECT_SUM');
 assert.deepEqual(q.rows[0].occurrences[7].source_specific_roles.weight_order,[-1,1]);
 assert.equal(q.rows[0].occurrences[2].source_specific_roles.binder,'J');
 const W037=C.get('W-SSC-037').source_expression_census.statements;
 assert.equal(W037[1].first_operator,'TENSOR_SOURCE_LITERAL');
 assert.equal(W037[1].outer,'TENSOR');
 assert.deepEqual(W037[1].second_join_operators,['DIRECT_SUM','DIRECT_SUM']);
 assert.deepEqual(W037[2].join_operators,['DIRECT_SUM','DIRECT_SUM','DIRECT_SUM','PLUS','PLUS']);
 assert.deepEqual(W037[3].particles,['(nu_e,e)_L','e_R','(nu_e)_R','(u,d)_L','u_R','d_R']);
 assert.deepEqual(q.rows[1].occurrences[4].source_specific_roles.order,['DUAL_LINE_QUOTIENT','LEFT_PLUS_RIGHT'],'printed RHS tensor factor order changed');
 assert.deepEqual(q.rows[1].occurrences[11].source_specific_roles.particles,['(nu_e,e)_L','e_R','(nu_e)_R','(u,d)_L','u_R','d_R'],'source six particle association order changed');
 assert.equal(q.rows[2].occurrences[5].logical_force,'SOURCE_PROJECTIVE_CONTAINMENT','source CP1 incidence cannot silently become equality');
 assert.equal(q.rows[1].occurrences[7].source_specific_roles.operator,'TENSOR');
 assert.equal(q.rows[1].occurrences[8].source_specific_roles.operator,'TENSOR');
 assert.deepEqual(q.rows[1].occurrences[10].source_specific_roles.ordered_joins,['DIRECT_SUM','DIRECT_SUM','DIRECT_SUM','PLUS','PLUS']);
 const W069=C.get('W-SSC-069').source_expression_census.statements;
 assert.equal(W069[3].roles.subject,'MINKOWSKI_SPACETIME_POINTS');
 assert.equal(W069[3].roles.point_representation,'CP1_CONTAINED_IN_N');
 assert.equal(W069[1].roles.orbit_count,3);
 assert.deepEqual(q.rows[2].occurrences[3].source_specific_roles.orbit_roles,['PT_PLUS','PT_MINUS','N_NULL']);
 assert.equal(q.rows[2].occurrences[4].source_specific_roles.point_scope,'MINKOWSKI');
 assert.ok(!q.rows[2].occurrences.some(o=>/COMPACTIFIED_MINKOWSKI_ONLY/.test(o.logical_force)));
 const W104=C.get('W-SSC-104').source_expression_census.statements;
 assert.deepEqual(W104[1].cases,[{lambda:1,result:'USUAL_CONNECTION'},{lambda:0,result:'HIGGS_BUNDLE'}]);
 assert.equal(W104[0].type,'SET_NOT_VECTOR_SPACE');
 assert.equal(W104[0].higher_cohomology_extension,false);
 assert.equal(W104[2].credited_person,'Carlos Simpson');
 assert.equal(W104[4].credited_person,'Pierre Deligne');
 assert.equal(W104[3].case_binding.X,'RIEMANN_SURFACE_SIGMA');
 assert.deepEqual(q.rows[3].occurrences[2].source_specific_roles,{parameter:1,result:'USUAL_CONNECTIONS'});
 assert.deepEqual(q.rows[3].occurrences[3].source_specific_roles,{parameter:0,result:'HIGGS_BUNDLES'});
 assert.equal(q.rows[3].occurrences[8].source_specific_roles.carrier_kind,'SET');
 assert.equal(q.rows[3].occurrences[10].logical_force,'SOURCE_NEGATIVE_HIGHER_COHOMOLOGY');
 assert.equal(q.rows[3].occurrences[11].source_specific_roles.binder,'X=Sigma');
 assert.equal(q.rows[3].occurrences[15].source_specific_roles.credited,'SIMPSON');
 assert.equal(q.rows[3].occurrences[16].source_specific_roles.credited,'DELIGNE');
 return {G1:'SOURCE_LOCAL_FOUR_BODIES_PENDING_INDEPENDENT_REVIEW',original_G0:'FROZEN',old_Oct03:'OPEN',body_count:4,author_occurrence_count:50,audit_only_reclassified:4,G2:'BLOCKED'};
}
const baseline=verify(copy(m));
const attack=[
 ['erase W035 source direct sum',z=>z.rows[0].occurrences[6].source_specific_roles.operator='SCALAR_PLUS'],
 ['swap signed weights',z=>z.rows[0].occurrences[7].source_specific_roles.weight_order=[1,-1]],
 ['delete J choice',z=>z.rows[0].occurrences[2].source_specific_roles.binder='UNBOUND'],
 ['source RHS product swapped',z=>z.rows[1].occurrences[4].source_specific_roles.order=['RIGHT_PLUS_LEFT','DUAL_LINE']],
 ['fabricate W037 repaired direct sum',z=>z.rows[1].occurrences[7].source_specific_roles.operator='DIRECT_SUM'],
 ['fabricate W037 inner direct sum',z=>z.rows[1].occurrences[8].source_specific_roles.operator='DIRECT_SUM'],
 ['change W037 3/2 signs',z=>z.rows[1].occurrences[10].source_specific_roles.ordered_joins=['DIRECT_SUM','DIRECT_SUM','DIRECT_SUM','DIRECT_SUM','DIRECT_SUM']],
 ['reverse six source particle identities',z=>z.rows[1].occurrences[11].source_specific_roles.particles.reverse()],
 ['rewrite W069 compactified claim',z=>z.rows[2].occurrences[4].source_specific_roles.point_scope='COMPACTIFIED_MINKOWSKI_ONLY'],
 ['invent fourth source orbit',z=>z.rows[2].occurrences[3].source_specific_roles.orbit_roles.push('PT_OTHER')],
 ['promote false CP1 equals N',z=>z.rows[2].occurrences[5].logical_force='CP1_EQUAL_TO_N'],
 ['delete null boundary condition',z=>z.rows[2].occurrences[4].source_span='Minkowski points are CP1s'],
 ['change W104 lambda1 to FLAT',z=>z.rows[3].occurrences[2].source_specific_roles.result='FLAT_CONNECTIONS'],
 ['change W104 lambda0 to connection',z=>z.rows[3].occurrences[3].source_specific_roles.result='CONNECTIONS'],
 ['recast M as vector',z=>z.rows[3].occurrences[8].source_specific_roles.carrier_kind='VECTOR_SPACE'],
 ['erase W104 higher negative',z=>z.rows[3].occurrences[10].logical_force='AUTHOR_H1_ALL_DEGREES'],
 ['remove Riemann-surface binder',z=>z.rows[3].occurrences[11].source_specific_roles.binder='ANY_X'],
 ['misattribute Simpson',z=>z.rows[3].occurrences[15].source_specific_roles.credited='WOIT'],
 ['misattribute Deligne',z=>z.rows[3].occurrences[16].source_specific_roles.credited='WOIT'],
 ['pretend source mathematical theorem',z=>z.source_MATH_truth_not_proven=false],
 ['invent G2',z=>z.G2_authorized=true],
 ['change Oct03 original state',z=>z.historical_2026_10_03_target_G0='COMPLETE'],
 ['import L semantics',z=>z.no_L_semantics=false],
 ['mark G1 all complete',z=>z.summary.full_current_G1_complete=true],
 ['mark current 4 already qualified',z=>z.summary.current_four_body_G1_qualified=true],
 ['drop authored occurrence',z=>z.rows[1].occurrences.pop()],
 ['insert excluded source duplicate',z=>z.rows[2].occurrences.push(prior.rows[2].occurrences.at(-1))],
 ['source locator drift',z=>z.rows[0].original_author_source_locations=['bad']],
 ['source SSC body rewritten',z=>z.rows[3].exact_frozen_SSC_body='bad'],
 ['source manuscript mathematical quote replaced',z=>z.rows[1].occurrences[0].source_span='fake'],
 ['forward G1 source dependency',z=>z.rows[3].occurrences[0].depends_on=['W-SSC-104-NEWG1-17']],
 ['erase negative citation',z=>z.rows[3].occurrences[15].source_specific_roles.credited='UNKNOWN']
];
for(const [name,fn] of attack){const z=copy(m);fn(z);let blocked=false;try{verify(z)}catch(e){blocked=true;}assert.ok(blocked,'hostile escaped: '+name)}
console.log('W G1 current source-local four-body PASS '+JSON.stringify({...baseline,hostile_rejections:attack.length,hostile_total:attack.length}));
