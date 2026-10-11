#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const p={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 index:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 old:['experiments/062/W_EXTRACTION_RECONCILED_0_31.json','a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e'],
 stage:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_3.json','dff23ea971d6c73e20679e380f2256747e491462'],
 gate:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a']
};
for(const [n,[path,hash]]of Object.entries(p))assert.equal(blob(path),hash,'frozen W source SHA drift '+n);
const s=read(p.ssc[0]),I=read(p.index[0]),old=read(p.old[0]),stage=read(p.stage[0]),gate=read(p.gate[0]);
const M=read('experiments/062/W_G1_W033_W113_ORIGINAL_AUTHOR_SECTION41_0_1.json');
const S=new Map(s.items.map(x=>[x.id,x])),inv=new Map(I.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x])),O=new Map(old.items.map(x=>[x.census_id,x]));
const clone=x=>structuredClone(x);
const ids=['W-SSC-033','W-SSC-113'];
const namesW033=[
 'J_2D_SQUARE_NEGATIVE_ONE','J_4D_S2_WORTH_OF_CHOICES','PT_OVER_S4_COMPLEX_J_FIBRATION',
 'PT_COMPLEX_WHILE_S4_NOT','ASD_METRIC_CONDITIONAL_EXTENSION','CP1_POINT_COMPLEX_LINE_IN_SR',
 'TANGENT_SELECTED_LINE_HOM_C','EXAMPLE_SPECIFIC_l_PAULI_COORDINATES','ELECTROWEAK_U1_UNIT_LINE_BUNDLE',
 'LIFTED_VECTOR_HIGGS_TRANSFORMATION','NONZERO_HIGGS_STABILIZER_U1'];
const namesW113=[
 'TAUTOLOGICAL_LINE_ON_PT','U1_UNIT_l_PRINCIPAL_BUNDLE','TANGENT_HOM_C_SELECTED_l',
 'U1_ACTS_ON_HOM_DOMAIN','SU2L_ACTS_ON_HOM_CODOMAIN','IMAGINARY_TIME_VECTOR_HIGGS',
 'NONZERO_HIGGS_SELECTS_U1_STABILIZER','STABILIZER_FIXES_SELECTED_HIGGS','EM_GAUGE_IDENTIFICATION'];
const originalTyped=new Set(inv.get('W-SSC-033').source_typed_statement_ids);
function verify(m){
 assert.equal(m.schema,'isograph.exp062-W-G1-current-source-W033-W113-original-first-0.1');
 assert.equal(m.status,'SOURCE_FIRST_TWO_AUTHOR_BODIES_UNQUALIFIED');assert.equal(m.track,'W');
 assert.equal(m.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(m.Oct03_original_G0,'OPEN');
 assert.equal(m.G0_current_frozen,true);assert.equal(m.G1_complete,false);assert.equal(m.G2_authorized,false);
 assert.equal(m.L_semantics_available,false);
 assert.equal(stage.G1_complete,false);assert.equal(stage.G2_authorized,false);
 assert.equal(gate.current.G0_frozen,true);assert.equal(gate.historical_oct03_target.G0_complete,false);
 assert.equal(s.items.length,151);
 assert.equal(m.rows.length,2);
 assert.deepEqual(m.rows.map(x=>x.census_id),ids);
 assert.deepEqual(m.rows.map(x=>x.occurrences.length),[11,9]);
 assert.equal(m.counts.qualified_prior_G1_bodies,18);
 assert.equal(m.counts.new_candidate_bodies,2);assert.equal(m.counts.new_candidate_occurrences,20);
 assert.equal(m.counts.W113_own_typed_ids,0);
 assert.equal(m.counts.G0_items,151);
 assert.equal(m.counts.global_G1_incomplete,true);assert.equal(m.counts.G2_blocked,true);
 assert.equal(m.source_evidence_index_disposition.G0_W033_typed_eight_preserved,true);
 assert.equal(m.source_evidence_index_disposition.shared_source_semantics_not_counted_as_new_corpus,true);
 for(const [key,[path,sha]]of Object.entries(p)){
   const bound=key==='ssc'?'ssc':key==='index'?'inverse':key==='old'?'historical':key==='stage'?'stage18':'G0';
   assert.deepEqual(m.input[bound],{path,sha});
 }
 const requiredOriginalAnchors=[
  'There are two such','inequivalent different ways','bundle of all such complex structures',
  'four-manifold with anti-self-dual metric','complex two dimensional space of complex linear maps',
  'unit vectors in','leaves the field vector invariant'
 ];
 let n=0;for(let k=0;k<2;k++){
  const id=ids[k],row=m.rows[k],obj=S.get(id),loc=inv.get(id),prior=O.get(id);
  assert.ok(obj&&loc&&prior);
  assert.equal(row.source_unit,'W01');
  assert.equal(row.original_author_html_source,'https://arxiv.org/html/2104.05099v2');
  assert.equal(row.exact_frozen_G0_body,obj.obligation);
  assert.equal(row.historical_G1_occurrence_count,prior.occurrences.length);
  assert.equal(row.historical_G1_exact_source_body_candidate,true);
  assert.deepEqual(row.original_source_keys,loc.original_source_keys);
  assert.deepEqual(row.own_original_typed_ids,loc.source_typed_statement_ids);
  assert.equal(row.current_status,'G1_COLD_SOURCE_FIRST_CANDIDATE_UNQUALIFIED');
  assert.deepEqual(row.source_lines,k===0?[247,270]:[252,270]);
  if(k===1){
    assert.deepEqual(loc.source_typed_statement_ids,[]);
    assert.equal(row.source_typed_witness_alias_from_W033,'W033_SHARED_SOURCE_TUPLES_NO_NEW_TYPED_ID');
  }
  for(let j=0;j<row.occurrences.length;j++){
    n++;const o=row.occurrences[j];
    const names=k===0?namesW033:namesW113;
    assert.equal(o.occurrence_id,id+'-CURRENT-G1-'+String(j+1).padStart(2,'0'));
    assert.equal(o.source_operation,names[j],'original source semantic operation drift');
    assert.equal(o.original_source_reference,'https://arxiv.org/html/2104.05099v2');
    assert.ok(o.original_author_line>=row.source_lines[0]&&o.original_author_line<=row.source_lines[1]);
    assert.ok(o.original_author_anchor?.length>=5);
    assert.ok(o.source_guard?.length>=10);
    assert.ok(o.source_argument_result_roles&&typeof o.source_argument_result_roles==='object');
    assert.equal(o.binder,'W01_ORIGINAL_PT_SOURCE_POINT_SCOPE_ONLY');
    assert.deepEqual(o.depends_on,[]); // source-local primary excerpt and roles are independent here
    assert.equal(o.claimed_independent_math_truth,false);
    assert.equal(o.qualified_primitive,false);
    assert.equal(o.verification_status,'PENDING_INDEPENDENT_ORIGINAL_AUTHOR_COLD_READ');
    assert.ok(originalTyped.has(o.original_source_typed_id),'source incidence not in original W033 first-owner ledger');
    assert.equal(o.typed_witness_ownership,k===0?'W033_G0_OWN_TYPED':'SHARED_W033_G0_TYPED_WITNESS_IN_W113_SOURCE_LOCUS');
    if(k===0)assert.ok(loc.source_typed_statement_ids.includes(o.original_source_typed_id));
    assert.ok(!Object.hasOwn(o,'requires')&&!Object.hasOwn(o,'CLOSED_SCHEMA'));
  }
 }
 assert.equal(n,20);
 assert.deepEqual(m.rows[0].occurrences[1].source_argument_result_roles,{dimension:4,family:'S2_OF_J',operator:'J^2=-1'});
 assert.equal(m.rows[0].occurrences[4].source_argument_result_roles.premise,'FOUR_MANIFOLD_WITH_ASD_METRIC');
 assert.equal(m.rows[0].occurrences[6].source_argument_result_roles.operator,'Hom_C');
 assert.equal(m.rows[0].occurrences[7].source_argument_result_roles.chosen_l,'span((1,0)^T)');
 assert.equal(m.rows[0].occurrences[9].source_argument_result_roles.acting[0],'U1_ON_l');
 assert.equal(m.rows[0].occurrences[9].source_argument_result_roles.acting[1],'SU2L_ON_SL');
 assert.equal(m.rows[1].occurrences[3].source_argument_result_roles.role,'DOMAIN_OF_HOM_C');
 assert.equal(m.rows[1].occurrences[4].source_argument_result_roles.role,'CODOMAIN_OF_HOM_C');
 assert.equal(m.rows[1].occurrences[6].source_argument_result_roles.binder,'HIGGS_VECTOR_NONZERO');
 assert.equal(m.rows[1].occurrences[8].source_argument_result_roles.reported_role,'ELECTROMAGNETISM_GAUGE');
 assert.ok(m.cold_author_original.must_check.includes('ASD_ONLY_GENERALIZATION'));
 return {G1:'TWO_W01_SOURCE_FIRST_CANDIDATES_RECONCILED',new_bodies:2,source_scoped_occurrences:20,G2:'BLOCKED',G0:'FROZEN',Oct03:'OPEN'};
}
const b=verify(clone(M));
const attacks=[
 ['erase a source body',x=>x.rows.pop()],
 ['falsify W113 original typed witness own',x=>x.rows[1].own_original_typed_ids.push('FAKE')],
 ['promote W113 alias as own new source',x=>x.rows[1].occurrences[1].typed_witness_ownership='W033_G0_OWN_TYPED'],
 ['delete original W033 typed source witness',x=>x.rows[0].occurrences[2].original_source_typed_id='FAKE'],
 ['J four dimension source unique',x=>x.rows[0].occurrences[1].source_argument_result_roles.family='ONE_CANONICAL_J'],
 ['ASD conditional removed',x=>x.rows[0].occurrences[4].source_argument_result_roles.premise='ANY_METRIC'],
 ['S4 base falsely complex',x=>x.rows[0].occurrences[3].source_argument_result_roles.base_S4_complex=true],
 ['selected l globalized',x=>x.rows[0].occurrences[6].source_guard='GLOBAL_HOM_C'],
 ['chosen l changed',x=>x.rows[0].occurrences[7].source_argument_result_roles.chosen_l='(0,1)^T'],
 ['flip U1 and SU2L actions',x=>x.rows[0].occurrences[9].source_argument_result_roles.acting=['SU2L_ON_l','U1_ON_SL']],
 ['flip W113 domain/codomain',x=>x.rows[1].occurrences[3].source_argument_result_roles.role='CODOMAIN_OF_HOM_C'],
 ['erase W113 U1 codomain',x=>x.rows[1].occurrences[4].source_argument_result_roles.role='DOMAIN_OF_HOM_C'],
 ['delete nonzero Higgs',x=>x.rows[1].occurrences[6].source_argument_result_roles.binder='HIGGS_ANY'],
 ['change EM physical role',x=>x.rows[1].occurrences[8].source_argument_result_roles.reported_role='FULLY_PROVEN_HIGGS_ACTION'],
 ['malign source provenance',x=>x.rows[0].original_author_html_source='https://example.com/other'],
 ['invent source line after §4.1',x=>x.rows[1].occurrences[1].original_author_line=370],
 ['drop source original keys',x=>x.rows[0].original_source_keys=[]],
 ['change current SSC body',x=>x.rows[0].exact_frozen_G0_body='NO'],
 ['elevate source to proven mathematics',x=>x.rows[1].occurrences[0].claimed_independent_math_truth=true],
 ['name as a primitive',x=>x.rows[0].occurrences[1].qualified_primitive=true],
 ['open historical G0',x=>x.Oct03_original_G0='FROZEN'],
 ['wrong G1 complete',x=>x.G1_complete=true],
 ['illegal G2',x=>x.G2_authorized=true],
 ['import L semantics',x=>x.L_semantics_available=true],
 ['fake W113 nine own typed',x=>x.counts.W113_own_typed_ids=9]
];
for(const [name,change]of attacks){let x=clone(M);change(x);let caught=false;try{verify(x)}catch(e){caught=true;}assert.ok(caught,'hostile escaped: '+name)}
console.log('W033 W113 original first occurrence source LOCK PASS '+JSON.stringify({...b,adversarial_rejected:attacks.length,adversarial_total:attacks.length}));
