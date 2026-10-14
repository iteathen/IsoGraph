#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const path='experiments/062/';
const p={
 ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json',
 inverse:path+'W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json',
 gate:path+'W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json',
 stage:path+'W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_5.json',
 frontier:path+'W_G1_CURRENT_AUTHOR_SOURCE_REBASELINE_FRONTIER_0_1.json',
 artifact:path+'W_G1_W059_W060_W061_W04A_AUTHOR_ORIGINAL_FIRST_0_1.json'
};
const pins={ssc:'f13075a1e2b039bab66e738cc992e121cd6c9947',inverse:'6a959eabe8803770bc8e9851e288de6535821477',
 gate:'e3848f4025a733d33b8b8b3411fa779e8b0a5b9a',stage:'25574b0c79b6897119bb291cebf25d66e2b06073',
 frontier:'0813758c9d11a32fa7e9e90329aaa7cf4d3d4c19'};
const sha=f=>{const b=fs.readFileSync(f);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
for(const [k,v] of Object.entries(pins))assert.equal(sha(p[k]),v,'original input SHA changed '+k);
const get=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const S=get(p.ssc),I=get(p.inverse),G=get(p.gate),P=get(p.stage),F=get(p.frontier),M=get(p.artifact);
const expected=['W-SSC-059','W-SSC-060','W-SSC-061'],occCounts=[6,6,8],originalCounts=[3,2,3],witnessCounts=[3,3,3];
const byID=new Map(S.items.map(x=>[x.id,x])),inverse=new Map(I.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x]));
const clone=x=>structuredClone(x);
const bodyHash='69792bb18e780484b0bdf491f5029d9bbeef04db7de677bd10122ffe7e869659';
function verify(m){
 assert.equal(m.schema,'isograph.exp062-W-G1-W04a-059-060-061-original-first.v0.1');
 assert.equal(m.track,'W');assert.equal(m.status,'W04A_THREE_SOURCE_FIRST_CANDIDATE_G1_NOT_QUALIFIED');
 assert.equal(m.target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(m.historic_oct03_G0,'OPEN');
 assert.equal(m.current_new_G0_frozen,true);assert.equal(m.G1_global_complete,false);assert.equal(m.G2_authorized,false);
 assert.equal(m.L_semantics_included,false);assert.equal(m.physics_or_primitive_qualified,false);assert.equal(Object.hasOwn(m,'qualifies_primitive_or_physical_theory'),false,'obsolete authority alias introduced');
 assert.equal(m.original_first.source_url,'https://www.math.columbia.edu/~woit/wordpress/?p=15574');
 assert.equal(m.original_first.author_content_sha256,bodyHash);
 assert.equal(m.original_first.no_reader_comments_or_third_party_theorem_in_scope,true);
 assert.deepEqual(m.original_first.source_line_interval,[12,31]);
 assert.equal(G.current.G0_frozen,true);assert.equal(G.current.new_current_source_target_G1_occurrence_extraction_authorized,true);
 assert.equal(G.historical_oct03_target.G0_complete,false);
 assert.equal(P.G1_complete,false);assert.equal(P.G2_authorized,false);
 assert.equal(m.source_negative.length,5);
 assert.equal(m.no_post_authority_promotion,true);
 for(const [k,sha]of Object.entries(pins))assert.deepEqual(m.source_inputs[k],{path:p[k],git_blob_sha:sha},'source input drift '+k);
 assert.equal(m.summary.before_qualified,24);
 assert.equal(m.summary.qualified_after_exact_source_audit_at_most,27);
 assert.equal(m.summary.remaining_after_success_at_least,124);
 assert.equal(m.summary.frozen_SSC_items,151);
 assert.equal(m.summary.old_G1_bodies_not_current_authority,true);
 assert.equal(m.summary.new_candidate_bodies,3);
 assert.equal(m.summary.new_candidate_occurrences,20);
 assert.equal(m.rows.length,3);
 assert.deepEqual(m.rows.map(x=>x.census_id),expected);
 const currentReviewed=Object.values(P.source_reconciliation.reviewed_ids_by_input).flat();
 assert.equal(currentReviewed.length,24);
 assert.ok(expected.every(id=>!currentReviewed.includes(id)));
 let total=0;
 for(let n=0;n<3;n++){
  const row=m.rows[n],id=row.census_id,source=byID.get(id),i=inverse.get(id),f=F.rows.find(x=>x.census_id===id);
  assert.ok(source&&i&&f);
  assert.equal(f.current_G1_state,'OCCURRENCE_EXTRACTION_INCOMPLETE');
  assert.equal(row.source_unit,'W04a');
  assert.equal(source.source,'W04a');
  assert.equal(row.frozen_source_body,source.obligation);
  assert.deepEqual(row.source_body_identity,{path:p.ssc,git_blob_sha:pins.ssc,id,field:'obligation'});
  assert.equal(row.original_author_source_url,m.original_first.source_url);
  assert.equal(row.original_post_date,'2026-03-05');
  assert.equal(row.author_article_normalized_sha256,bodyHash);
  assert.deepEqual(row.original_source_location_keys,i.original_source_keys);
  assert.deepEqual(row.original_typed_statement_ids,i.source_typed_statement_ids);
  assert.equal(row.historical_0_31_G1_not_authoritative,true);
  assert.equal(row.current_source_G1_status,'SOURCE_FIRST_CANDIDATE_PENDING_EXACT_CI');
  assert.equal(row.occurrences.length,occCounts[n]);
  assert.equal(row.original_source_location_keys.length,originalCounts[n]);
  assert.equal(row.source_original_witnesses.length,witnessCounts[n]);
  const seen=new Set();
  for(let j=0;j<row.occurrences.length;j++){
   const o=row.occurrences[j];
   total++;
   assert.equal(o.occurrence_id,id+'-CURG1-'+String(j+1).padStart(2,'0'));
   assert.ok(!seen.has(o.occurrence_id),'duplicate original G1 occurrence');seen.add(o.occurrence_id);
   assert.equal(o.definability,'UNDETERMINED_PENDING_G3');
   assert.equal(o.source_truth_not_scientific_verification,true);
   assert.ok(source.obligation.includes(o.source_span),'absent source span '+o.occurrence_id);
   assert.ok(o.source_span.includes(o.relation_span),'absent relation span '+o.occurrence_id);
   assert.ok(o.argument_spans.length>0);
   for(const a of o.argument_spans)assert.ok(o.source_span.includes(a),'unrecoverable source argument '+o.occurrence_id+' '+a);
   for(const dep of o.depends_on)assert.ok(seen.has(dep),'future or cross-body dep '+o.occurrence_id+' <- '+dep);
   assert.ok(o.logical_force.length>5);
   assert.ok(o.source_side_conditions_and_modality.length>20);
   assert.ok(o.argument_result_roles&&typeof o.argument_result_roles==='object');
   assert.ok(!Object.hasOwn(o,'requires')&&!Object.hasOwn(o,'primitive_id')&&!Object.hasOwn(o,'CLOSED_SCHEMA'));
  }
  for(const w of row.source_original_witnesses){
   assert.ok(w.line_interval.length===2&&w.line_interval[0]<=w.line_interval[1]);
   assert.ok(w.anchor.length>8);
   assert.ok(w.role.length>6);
  }
 }
 assert.equal(total,20);
 let w59=m.rows[0].occurrences,w60=m.rows[1].occurrences,w61=m.rows[2].occurrences;
 assert.deepEqual(w59[1].argument_result_roles.ordered_factors,['E+sigma·p','E-sigma·p']);
 assert.deepEqual(w59[2].argument_result_roles.energy_cases,['E=+|p|','E=-|p|']);
 assert.equal(w59[4].argument_result_roles.helicity,'+1/2');
 assert.equal(w59[4].argument_result_roles.role,'PARTICLE');
 assert.equal(w59[5].argument_result_roles.helicity,'-1/2');
 assert.equal(w59[5].argument_result_roles.role,'ANTIPARTICLE');
 assert.equal(w60[2].argument_result_roles.quantifier,'ONE_PER_MOMENTUM');
 assert.equal(w60[3].argument_result_roles.relation,'ANTICOMMUTE');
 assert.match(w60[3].source_side_conditions_and_modality,/CAR equation and coefficients absent/);
 assert.equal(w60[5].argument_result_roles.referent,'COVARIANT_DERIVATIVE');
 const typed60=byID.get('W-SSC-060').source_expression_census.statements.find(x=>x.id==='W04A060-E02');
 assert.equal(typed60.explicit_generator_CAR_equation_in_source,false);
 assert.equal(typed60.quantization_relation_fully_specified_by_source,false);
 assert.equal(w61[0].argument_result_roles.equality_count,2);
 assert.equal(w61[2].argument_result_roles.numerator,'E+sigma·p');
 assert.equal(w61[2].argument_result_roles.denominator,'E^2-|p|^2');
 assert.equal(w61[3].argument_result_roles.substitution,'E_TO_iE');
 assert.equal(w61[5].argument_result_roles.disposition,'FAILS_CONVENTIONAL_REPRESENTATION');
 assert.equal(w61[6].argument_result_roles.domain,'S_R^*');
 assert.equal(w61[6].argument_result_roles.codomain,'S_L');
 assert.equal(w61[7].argument_result_roles.proposal,'RIGHT_SPINOR_ONLY');
 return {source_unit:'W04a',new_source_bodies:3,original_author_witnesses:9,new_G1_candidates:20,old_target:'OPEN',G1:'SCOPED_PENDING',G2:'BLOCKED'};
}
const result=verify(clone(M));
const attacks=[
['wrong Weyl initial equation',q=>q.rows[0].occurrences[0].source_span='(E+sigma·p)tilde psi=1'],
['reverse Weyl factorization',q=>q.rows[0].occurrences[1].argument_result_roles.ordered_factors.reverse()],
['erase conditional mass shell',q=>q.rows[0].occurrences[2].argument_result_roles.energy_cases=['E=+|p|']],
['positive branch helicity inverted',q=>q.rows[0].occurrences[4].argument_result_roles.helicity='-1/2'],
['negative branch particle',q=>q.rows[0].occurrences[5].argument_result_roles.role='PARTICLE'],
['lose momentum binder',q=>q.rows[1].occurrences[2].argument_result_roles.quantifier='EXISTS_MOMENTUM'],
['anti-commutation to commutation',q=>q.rows[1].occurrences[3].argument_result_roles.relation='COMMUTATION'],
['invent full CAR source equation',q=>q.rows[1].occurrences[3].source_side_conditions_and_modality='Exact CAR full source theorem complete'],
['covariant derivative unrelated',q=>q.rows[1].occurrences[5].argument_result_roles.referent='UNRELATED'],
['Wightman two equalities collapsed',q=>q.rows[2].occurrences[0].argument_result_roles.equality_count=1],
['switch Wightman numerator sign',q=>q.rows[2].occurrences[2].argument_result_roles.numerator='E-sigma·p'],
['swap Wightman numerator denominator',q=>q.rows[2].occurrences[2].argument_result_roles.denominator='E+sigma·p'],
['erase i in naive Schwinger',q=>q.rows[2].occurrences[3].argument_result_roles.substitution='E_TO_E'],
['pretend naive Wick valid',q=>q.rows[2].occurrences[5].argument_result_roles.disposition='PROVED'],
['reverse spinor map',q=>q.rows[2].occurrences[6].argument_result_roles.codomain='S_R^*'],
['collapse conventional and proposed',q=>q.rows[2].occurrences[7].argument_result_roles.proposal='S_R_DUAL_TO_S_L'],
['delete original article witness',q=>q.rows[1].source_original_witnesses.pop()],
['change original G0 source locator',q=>q.rows[0].original_source_location_keys[0]='FAKE'],
['rewrite frozen source body',q=>q.rows[2].frozen_source_body='FAKE'],
['forge frozen G0 SHA',q=>q.source_inputs.ssc.git_blob_sha='FAKE'],
['G1 entire complete false claim',q=>q.G1_global_complete=true],
['G2 prematurely authorized',q=>q.G2_authorized=true],
['close historic Oct03',q=>q.historic_oct03_G0='COMPLETE'],
['admit cross-author meaning',q=>q.L_semantics_included=true],
['source physics false authority',q=>q.physics_or_primitive_qualified=true],
['old forbidden metadata alias',q=>q.qualifies_primitive_or_physical_theory=true],
['delete source occurrence',q=>q.rows[1].occurrences.pop()],
['insert forward occurrence dependency',q=>q.rows[0].occurrences[0].depends_on=['W-SSC-059-CURG1-06']]
];
for(const [name,change] of attacks){const q=clone(M);change(q);let rejected=false;try{verify(q)}catch(e){rejected=true;}assert.ok(rejected,'hostile escaped '+name)}
console.log('W G1 W04a three-source original-first occurrence guard PASS '+JSON.stringify({...result,hostile_rejected:attacks.length,hostile_total:attacks.length}));
