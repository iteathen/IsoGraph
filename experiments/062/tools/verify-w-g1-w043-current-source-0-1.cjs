#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p));
const blob=p=>{let b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const src={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inv:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 g1:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 stage:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_3.json','dff23ea971d6c73e20679e380f2256747e491462'],
 gate:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a']
};
for(const [key,[p,sha]]of Object.entries(src))assert.equal(blob(p),sha,'original input SHA drift '+key);
const s=read(src.ssc[0]),inv=read(src.inv[0]),old=read(src.g1[0]),stage=read(src.stage[0]),gate=read(src.gate[0]);
const m=read('experiments/062/W_G1_W043_ORIGINAL_SECTION43_COLD_SOURCE_0_1.json');
const id='W-SSC-043',item=s.items.find(x=>x.id===id),index=inv.current_ssc_to_original_inverse.find(x=>x.ssc_id===id),prior=old.items.find(x=>x.census_id===id);
const opNames=[
 'SOURCE_CONVENTIONAL_S3_STATE_FUNCTIONALS','SOURCE_PROPOSED_PT0_FIVE_DIMENSIONAL_FIELD_CARRIER',
 'SOURCE_CP1_FIBRATION_PT0_OVER_S3','SOURCE_REQUIRED_PT0_S3_FIELD_RECONSTRUCTION',
 'SOURCE_HOLOMORPHIC_CP1_STRUCTURE_AS_UNCONSTRUCTED_BRIDGE',
 'SOURCE_PREEXISTING_PENROSE_WARD_PULLBACK_CONTEXT','SOURCE_INTRINSIC_PT_U1_SU3_PRINCIPAL_BUNDLES_NOT_PULLBACK',
 'SOURCE_CP1_DEPENDENCE_OF_PT_PRINCIPAL_BUNDLES'];
const clone=x=>structuredClone(x);
function verify(x){
 assert.equal(x.schema,'isograph.exp062-W-G1-W043-actual-original-first-cold-source-review.v0.1');
 assert.equal(x.census_id,id);assert.equal(x.track,'W');
 assert.equal(x.status,'ONE_W_G1_COLD_SOURCE_BODY_CANDIDATE_PENDING_EXACT_CI');
 assert.equal(x.current_source_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(x.old_Oct03_G0,'OPEN');assert.equal(x.G0_new_scope_frozen,true);
 assert.equal(x.G1_global_complete,false);assert.equal(x.G2_authorized,false);assert.equal(x.L_semantics_used,false);
 assert.equal(stage.source_reconciliation.current_source_local_reviewed_count,18);
 assert.equal(stage.G1_complete,false);assert.equal(stage.G2_authorized,false);
 assert.equal(gate.current.G0_frozen,true);assert.equal(gate.historical_oct03_target.G0_complete,false);
 assert.equal(s.items.length,151);
 for(const [key,[p,sha]]of Object.entries(src))assert.deepEqual(x.pinned_inputs[key==='ssc'?'ssc':key==='inv'?'inverse':key==='g1'?'historical_G1':key==='stage'?'current_stage':'current_G0'],{path:p,sha});
 assert.equal(x.original_source.revision,'arXiv:2104.05099v2');
 assert.equal(x.original_source.url,'https://arxiv.org/html/2104.05099v2');
 assert.equal(x.original_source.section,'4.3');
 assert.deepEqual(x.original_source.author_html_lines,[339,340]);
 assert.equal(x.full_frozen_body,item.obligation);
 assert.deepEqual(x.original_source_inverse_keys,index.original_source_keys);
 assert.deepEqual(x.G0_original_source_typed_evidence,index.source_typed_statement_ids);
 assert.deepEqual(index.source_typed_statement_ids,['W01-S43-043-01','W01-S43-043-02']);
 assert.equal(x.historical_G1.previous_count,prior.occurrences.length);
 assert.equal(x.historical_G1.not_current_G1_qualification,true);
 assert.equal(x.source_first_distinctions.source_author_does_not_construct_full_PT_state_theory,true);
 assert.equal(x.source_first_distinctions.source_uses_existing_PenroseWard_pullback_as_contrast_not_author_constructed_implementation,true);
 assert.equal(x.source_scope_only_not_primitive_closure,true);
 assert.equal(x.observations.current_qualifiable_bodies_before,18);
 assert.equal(x.observations.after_qualified_at_most,19);
 assert.equal(x.observations.global_total,151);
 assert.equal(x.observations.global_remaining_if_qualified,132);
 assert.equal(x.observations.full_source_G1_claim,false);
 assert.equal(x.candidate_occurrences.length,8);
 const deps=new Set();
 for(let i=0;i<8;i++){
   const o=x.candidate_occurrences[i];
   assert.equal(o.occurrence_id,id+'-CURRENT-G1-'+String(i+1).padStart(2,'0'));
   assert.equal(o.operation,opNames[i]);
   assert.equal(o.author_original_html_line,i<=4?339:340);
   assert.ok(o.author_primary_source_prose_anchor?.length>=4);
   assert.equal(o.source_typed_G0_evidence_id,i<=4?'W01-S43-043-01':'W01-S43-043-02');
   assert.ok(o.negative_scope_and_modality_guard?.length>15);
   assert.ok(Array.isArray(o.argument_result_roles)&&o.argument_result_roles.length>=2);
   assert.equal(o.source_binder,'W01_SECTION43_LOCAL_ONLY');
   assert.equal(o.semantics_qualified_as_mathematical_truth,false);
   assert.equal(o.stage,'G1_SOURCE_LOCAL_CANDIDATE');
   for(const dep of o.depends_on){assert.ok(deps.has(dep),'wrong source graph edge '+dep);}
   deps.add(o.occurrence_id);
 }
 const c=x.candidate_occurrences;
 assert.deepEqual(c[0].argument_result_roles,['SPINOR','GAUGE','VIERBEIN','HIGGS']);
 assert.deepEqual(c[1].argument_result_roles,['PT0','REAL_DIM_5','BASE_S3']);
 assert.deepEqual(c[2].argument_result_roles,['CP1','BASE_S3','TOTAL_PT0']);
 assert.equal(c[3].logical_force,'AUTHOR_FUTURE_RECONSTRUCTION_REQUIRED');
 assert.equal(c[4].logical_force,'AUTHOR_EXPLICIT_INCOMPLETE_METHOD');
 assert.equal(c[5].logical_force,'SOURCE_CITED_CONVENTIONAL_METHOD');
 assert.deepEqual(c[6].argument_result_roles,['U1_PT','SU3_PT','NO_SPACETIME_PULLBACK']);
 assert.equal(c[6].logical_force,'SOURCE_EXPLICIT_NEGATIVE_AND_PROPOSED_DIFFERENCE');
 assert.equal(c[7].operation,'SOURCE_CP1_DEPENDENCE_OF_PT_PRINCIPAL_BUNDLES');
 assert.equal(c[7].author_primary_source_prose_anchor,'vary along');
 assert.equal(c[4].author_primary_source_prose_anchor,'One needs to somehow exploit the holomorphic structure');
 return {W_G1_W043:'SOURCE_LOCAL_PASS',new_bodies:1,source_occurrences:8,G1_global:'OPEN',G2:'BLOCKED',Oct03:'OPEN'};
}
const result=verify(clone(m));
const attacks=[
 ['turn PT0 to four-dimensional',x=>x.candidate_occurrences[1].argument_result_roles[1]='REAL_DIM_4'],
 ['erase S3 base',x=>x.candidate_occurrences[1].argument_result_roles[2]='BASE_S4'],
 ['replace CP1 fibration',x=>x.candidate_occurrences[2].argument_result_roles[0]='CP2'],
 ['erase unbuilt negative source',x=>x.candidate_occurrences[4].logical_force='AUTHOR_FINISHED_STATE_ISOMORPHISM'],
 ['promote usual Penrose-Ward as Woit construction',x=>x.candidate_occurrences[5].logical_force='AUTHOR_CONSTRUCTED_PT_UNIFICATION'],
 ['erase U1 PT source scope',x=>x.candidate_occurrences[6].argument_result_roles[0]='U1_SPACETIME_PULLBACK'],
 ['erase SU3 source scope',x=>x.candidate_occurrences[6].argument_result_roles[1]='SU3_SPACETIME_PULLBACK'],
 ['erase not-pullback',x=>x.candidate_occurrences[6].argument_result_roles[2]='SPACETIME_PULLBACK'],
 ['erase fiber variation',x=>x.candidate_occurrences[7].operation='CONSTANT_ALONG_CP1'],
 ['false stage G2',x=>x.G2_authorized=true],
 ['false whole G1',x=>x.G1_global_complete=true],
 ['swap old historical target',x=>x.old_Oct03_G0='FROZEN'],
 ['claim mathematical proof',x=>x.candidate_occurrences[3].semantics_qualified_as_mathematical_truth=true],
 ['drop original G0 support',x=>x.original_source_inverse_keys=[]],
 ['change typed source witness',x=>x.candidate_occurrences[0].source_typed_G0_evidence_id='W01-NOPE'],
 ['delete one occurrence',x=>x.candidate_occurrences.pop()],
 ['duplicate source local operation',x=>x.candidate_occurrences[0].operation=x.candidate_occurrences[1].operation],
 ['import other author',x=>x.L_semantics_used=true],
 ['rewrite frozen source body',x=>x.full_frozen_body='bad'],
 ['change source revision',x=>x.original_source.revision='arXiv:2104.05099v1']
];
for(const [name,change]of attacks){const x=clone(m);change(x);let rejected=false;try{verify(x)}catch(e){rejected=true;}assert.ok(rejected,'HOSTILE ESCAPED '+name);}
console.log('W G1 current-author original-first W043 PASS '+JSON.stringify({...result,hostile_rejections:attacks.length,hostile_total:attacks.length}));
