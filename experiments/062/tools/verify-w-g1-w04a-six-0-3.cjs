#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const root='experiments/062/',files={
 review:[root+'W_G1_W04A_SIX_REMAINING_AUTHOR_SOURCE_FIRST_0_1.json','df2f9cf8741d17bce974913b48198a675aab68c3'],
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inv:[root+'W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 prev:[root+'W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_6.json','b3f5f69ba57d6b4dd48d9a2d14ab903546621a7a'],
 gate:[root+'W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a']
};
for(const [k,[path,pin]]of Object.entries(files))assert.equal(hash(path),pin,'immutable evidence input changed '+k);
const base=load(files.review[0]),ssc=load(files.ssc[0]),idx=load(files.inv[0]),prev=load(files.prev[0]),gate=load(files.gate[0]);
const ids=['W-SSC-011','W-SSC-012','W-SSC-013','W-SSC-063','W-SSC-064','W-SSC-065'],denoms=[1,2,2,2,6,2];
const list=new Map(ssc.items.map(x=>[x.id,x])),locations=new Map(idx.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x]));
const clone=x=>structuredClone(x);
function verify(m){
 assert.equal(m.schema,'isograph.exp062-W-G1-W04a-six-remaining-original.v0.1');
 assert.equal(m.track,'W');assert.equal(m.status,'SIX_AUTHOR_SOURCE_FIRST_W04A_BODIES_PENDING_QUALIFICATION');
 assert.equal(m.current_G0_frozen,true);
 assert.equal(m.G1_global_complete,false);assert.equal(m.G2_authorized,false);
 assert.equal(m.historical_Oct03,'OPEN');assert.equal(m.no_L_semantics,true);
 assert.equal(m.physics_or_primitive_qualified,false);assert.equal(m.original_author_only,true);
 assert.equal(m.source_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(m.source_url || m.original_source,'https://www.math.columbia.edu/~woit/wordpress/?p=15574');
 assert.equal(m.original_author_sha256,'69792bb18e780484b0bdf491f5029d9bbeef04db7de677bd10122ffe7e869659');
 assert.equal(m.input_blobs.SSC,files.ssc[1]);
 assert.equal(m.input_blobs.inverse,files.inv[1]);
 assert.equal(m.input_blobs.stage,files.prev[1]);
 assert.equal(m.summary.six_new_source_bodies,6);assert.equal(m.summary.occurrence_candidates,15);
 assert.equal(m.summary.prior_qualified_source_local_bodies,27);assert.equal(m.summary.on_success_source_local_qualified,33);
 assert.equal(m.summary.remaining_source_bodies_after_success,118);assert.equal(m.summary.entire_frozen_G0_SSC,151);
 assert.equal(m.summary.stage_not_advanced_before_exact_original_ci,true);
 assert.equal(gate.current.G0_frozen,true);assert.equal(gate.historical_oct03_target.G0_complete,false);
 assert.equal(prev.source_reconciliation.current_source_local_reviewed_count,27);
 const prevIDs=new Set(Object.values(prev.source_reconciliation.reviewed_ids_by_input).flat());
 assert.ok(ids.every(id=>!prevIDs.has(id)));
 assert.equal(ssc.items.length,151);
 assert.deepEqual(m.rows.map(x=>x.census_id),ids);assert.deepEqual(m.rows.map(x=>x.occurrences.length),denoms);
 let total=0;
 for(const row of m.rows){
  const s=list.get(row.census_id),i=locations.get(row.census_id);
  assert.equal(row.source_unit,'W04a');assert.equal(i.unit,'W04a');
  assert.equal(row.frozen_source_body,s.obligation);
  assert.deepEqual(row.original_source_location_keys,i.original_source_keys);
  assert.deepEqual(row.original_typed_statement_ids,i.source_typed_statement_ids);
  assert.equal(row.source_body_identity.path,files.ssc[0]);assert.equal(row.source_body_identity.git_blob_sha,files.ssc[1]);
  assert.equal(row.source_body_identity.id,row.census_id);assert.equal(row.source_body_identity.field,'obligation');
  assert.equal(row.original_author_content_sha256,m.original_author_sha256);
  assert.equal(row.current_G1_status,'SOURCE_FIRST_CANDIDATE_PENDING_CI');
  assert.equal(row.G0_author_modality_and_negative_preserved,true);
  assert.ok(row.original_author_anchors.length>0);
  for(const a of row.original_author_anchors)assert.ok(a.length>=6,'weak original-source anchor');
  const deps=new Set();
  for(let n=0;n<row.occurrences.length;n++){
   const o=row.occurrences[n];total++;
   assert.equal(o.occurrence_id,row.census_id+'-W04A-G1-'+String(n+1).padStart(2,'0'));
   assert.ok(s.obligation.includes(o.source_span),'frozen source occurrence missing '+o.occurrence_id);
   assert.ok(o.source_span.includes(o.relation_span),'source relation missing '+o.occurrence_id);
   for(const a of o.argument_spans)assert.ok(o.source_span.includes(a),'source argument missing '+a);
   for(const dep of o.depends_on)assert.ok(deps.has(dep),'forward/other author dependency '+dep);
   assert.equal(o.definability,'UNDETERMINED_PENDING_G3');
   assert.equal(o.source_truth_not_scientific_verification,true);
   assert.equal(o.source_truth_not_scientific_verification,true,'author source not scientific-theory qualification');
   assert.ok(o.source_side_conditions_and_modality.length>=20);
   assert.ok(!Object.hasOwn(o,'requires')&&!Object.hasOwn(o,'primitive_id')&&!Object.hasOwn(o,'CLOSED_SCHEMA'));
   deps.add(o.occurrence_id);
  }
 }
 assert.equal(total,15);
 assert.equal(m.rows[0].occurrences[0].argument_result_roles.obstacle,'EUCLIDEAN_CHIRALITY_DOUBLING');
 assert.equal(m.rows[1].occurrences[0].argument_result_roles.signatures[0],'MINKOWSKI');
 assert.equal(m.rows[1].occurrences[0].argument_result_roles.signatures[1],'EUCLIDEAN');
 assert.equal(m.rows[1].occurrences[1].argument_result_roles.quantifier,'ONLY');
 assert.equal(m.rows[2].occurrences[0].argument_result_roles.actor,'SU(2)_R');
 assert.equal(m.rows[2].occurrences[1].argument_result_roles.actor,'SU(2)_L');
 assert.equal(m.rows[3].occurrences[0].argument_result_roles.mechanism,'CONVENTIONAL_OS','conventional OS doubling is not proposed right-only route');
 assert.equal(m.rows[3].occurrences[0].argument_result_roles.new_carrier,'LEFT_EUCLIDEAN_WEYL');
 assert.equal(m.rows[3].occurrences[1].argument_result_roles.sequence,'SECOND_DOUBLE');
 assert.equal(m.rows[4].occurrences[1].argument_result_roles.polarity,'ONLY');
 assert.equal(m.rows[4].occurrences[2].argument_result_roles.role,'INTERNAL_POSSIBLE');
 assert.equal(m.rows[4].occurrences[3].argument_result_roles.quantifier,'ONLY');
 assert.equal(m.rows[4].occurrences[3].argument_result_roles.dimension,4);
 assert.equal(m.rows[4].occurrences[5].argument_result_roles.Minkowski,'CONJUGATE_HALVES');
 assert.equal(m.rows[5].occurrences[0].argument_result_roles.point_rep,'S_R_PLANE');
 assert.equal(m.rows[5].occurrences[1].argument_result_roles.representer,'RIGHT_SPINOR_PLANE');
 return {new_author_sources:6,source_occurrences:15,original_frozen_SSC:151,prev_qualified_G1:27,after_if_qualified:33,G1:'SCOPED_PENDING',G2:'BLOCKED'};
}
const result=verify(clone(base));
const attacks=[
['relabel OS second doubling as initial',q=>q.rows[3].occurrences[1].argument_result_roles.sequence='INITIAL'],
['drop OS first chirality',q=>q.rows[3].occurrences[0].argument_result_roles.new_carrier='RIGHT'],
['swap R geometric factor',q=>q.rows[2].occurrences[0].argument_result_roles.actor='SU(2)_L'],
['swap L internal factor',q=>q.rows[2].occurrences[1].argument_result_roles.actor='SU(2)_R'],
['lose both-signature quantifier',q=>q.rows[1].occurrences[0].argument_result_roles.signatures.pop()],
['weaken right-only',q=>q.rows[1].occurrences[1].argument_result_roles.quantifier='SOME'],
['weaken 4D only claim',q=>q.rows[4].occurrences[3].argument_result_roles.quantifier='SOME'],
['change four dimensional scope',q=>q.rows[4].occurrences[3].argument_result_roles.dimension=5],
['claim SU2L geometric and broken',q=>q.rows[4].occurrences[2].argument_result_roles.role='GEOMETRIC'],
['promote proposed theory to math fact',q=>q.physics_or_primitive_qualified=true],
['falsify old Oct03 provenance',q=>q.historical_Oct03='CLOSED'],
['improper W/L import',q=>q.no_L_semantics=false],
['stage premature G1 full',q=>q.G1_global_complete=true],
['G2 premature',q=>q.G2_authorized=true],
['swap signature contrast',q=>q.rows[4].occurrences[5].argument_result_roles.Minkowski='INDEPENDENT'],
['wrong twistor point plane',q=>q.rows[5].occurrences[0].argument_result_roles.point_rep='S_L'],
['wrong twistor point representer',q=>q.rows[5].occurrences[1].argument_result_roles.representer='UNQUALIFIED'],
['source locator misplaced',q=>q.rows[5].original_source_location_keys[0]='W04a/FAKE'],
['source frozen object coedit',q=>q.rows[4].frozen_source_body+=' false'],
['delete source obligation occurrence',q=>q.rows[4].occurrences.pop()],
['missing author source anchor',q=>q.rows[0].original_author_anchors=[]],
['source relation mutated',q=>q.rows[4].occurrences[3].relation_span='FAKE'],
['source premises forward dependency',q=>q.rows[0].occurrences[0].depends_on=['W-SSC-011-W04A-G1-99']],
['forge W G0 provenance',q=>q.input_blobs.SSC='FAKE'],
['incorrect total W reviewer count',q=>q.summary.remaining_source_bodies_after_success=117],
['collapse conventional OS into proposed',q=>q.rows[3].occurrences[0].argument_result_roles.mechanism='WOIT_RIGHT_ONLY'],
['falsify source truth',q=>q.rows[5].occurrences[0].source_truth_not_scientific_verification=false],
['cross-source contributor quoted',q=>q.rows[4].source_unit='L04']
];
for(const [name,fun]of attacks){let c=clone(base);fun(c);let fail=false;try{verify(c)}catch(e){fail=true;}assert.ok(fail,'HOSTILE ESCAPED '+name)}
console.log('W G1 W04a six remaining original-source occurrence PASS '+JSON.stringify({...result,hostiles_rejected:attacks.length,hostiles_total:attacks.length}));
