#!/usr/bin/env node
'use strict';
// W-only source-first local G1 eligibility, not primitive or G2 qualification.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const P={
 ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 inverse:['experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json','6a959eabe8803770bc8e9851e288de6535821477'],
 stage:['experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_7.json','6898f1f62e85b5cbca3f258b3d7d28a552a3e61a'],
 g0:['experiments/062/W04B_G0_FULL_AUTHOR_POST_REVERSE_AUDIT_0_1.json','1c5b8e1bcaed4dba555711a06b8cbc35d2cffa0a'],
 scope:['research/woit-lisi-isomorph/woit/W_CURRENT_AUTHOR_SOURCE_SCOPE_2026_10_11_0_1.json','86bb7d5ad55c26ea3586f2a74f1411c2a5d843c7'],
 freeze:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
 previous:['experiments/062/W_G1_W04B_SIX_UNREVIEWED_SOURCE_FIRST_0_1.json','39e49c605ede376bf7c07cd40d0ccfaa3b64f567']
};
for(const [k,[path,sha]] of Object.entries(P))assert.equal(blob(path),sha,'immutable original evidence SHA drift '+k);
const ssc=read(P.ssc[0]),inverse=read(P.inverse[0]),stage=read(P.stage[0]),g0=read(P.g0[0]),scope=read(P.scope[0]),freeze=read(P.freeze[0]),prev=read(P.previous[0]);
const M=read('experiments/062/W_G1_W04B_SIX_UNREVIEWED_SOURCE_FIRST_0_2.json');
const live=read('/tmp/isograph-w04b-author-source-20261011-0-1.json');
const expectIds=['W-SSC-015','W-SSC-066','W-SSC-067','W-SSC-068','W-SSC-070','W-SSC-071'];
const denom=[2,9,9,10,4,11];
const C=new Map(ssc.items.map(x=>[x.id,x]));
const I=new Map(inverse.current_ssc_to_original_inverse.map(x=>[x.ssc_id,x]));
const priorQualified=Object.values(stage.source_reconciliation.reviewed_ids_by_input).flat();
const copy=x=>structuredClone(x);
function verify(q,c){
 assert.equal(q.schema,'isograph.exp062-W-G1-current-author-W04b-six-source-local-cold-candidates.v0.2');
 assert.equal(q.status,'W04B_SIX_AUTHOR_SOURCE_FIRST_REVISED_CANDIDATES_PENDING_COLD_CI');
 assert.equal(q.track,'W');assert.equal(q.source_only,true);
 assert.equal(q.current_target,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(q.historical_oct03_G0,'OPEN');
 assert.equal(q.frozen_W_G0_count,151);
 assert.equal(q.G1_global_complete,false);assert.equal(q.G2_authorized,false);
 assert.equal(q.no_L_semantics,true);assert.equal(q.no_W_L_synthesis,true);
 assert.equal(q.original_author.url,'https://www.math.columbia.edu/~woit/wordpress/?p=15600');
 assert.equal(q.original_author.normalized_entry_content_sha256,'b706bc304a45c29059e74c5db0be3e8cd4da25f0d71f68de941d45db38d4cb67');
 assert.equal(q.original_author.reader_comments_excluded,true);
 assert.deepEqual(q.original_author.original_article_line_range,[10,30]);
 assert.equal(q.predecessor.git_blob_sha,P.previous[1]);
 assert.equal(q.predecessor.historical_46_candidate_preserved,true);
 assert.equal(q.audit_only_reclassifications.length,1);
 assert.equal(q.audit_only_reclassifications[0].old_occurrence_id,'W-SSC-070-CURG1-05');
 assert.equal(q.audit_only_reclassifications[0].source_limit_preserved,true);
 assert.equal(q.summary.previous_source_local_qualified,33);
 assert.equal(q.summary.authored_occurrence_candidates,45);
 assert.equal(q.summary.predecessor_occurrence_candidates,46);
 assert.equal(q.summary.removed_pseudo_occurrences,1);
 assert.equal(q.summary.global_G1_qualified,false);
 assert.equal(q.summary.max_after_qualification,39);
 assert.equal(q.summary.remaining_if_all_qualify,112);
 assert.equal(q.summary.current_total,151);
 assert.equal(q.source_first_method,undefined); // exact top-level is interpretation_rule
 assert.equal(q.interpretation_rule.startsWith('Primary authored original'),true);
 for(const [name,[path,sha]]of Object.entries(P))if(name!=='previous')assert.deepEqual(q.frozen_inputs[name==='g0'?'original_G0':name]?.sha,sha,'candidate source SHA '+name);
 assert.equal(ssc.items.length,151);
 assert.equal(inverse.summary.current_original_locations,649);
 assert.equal(inverse.summary.original_to_ssc_pair_count,560);
 assert.equal(freeze.current.G0_frozen,true);
 assert.equal(freeze.historical_oct03_target.G0_complete,false);
 assert.equal(freeze.current.G1_occurrence_extraction_started,false);
 assert.equal(stage.G0_qualified_frozen,true);
 assert.equal(stage.G1_complete,false);assert.equal(stage.G2_authorized,false);
 assert.equal(stage.stage,'G1_SOURCE_LOCAL_THIRTYTHREE_BODIES_RECONCILED_GLOBAL_G1_OPEN');
 assert.equal(stage.source_reconciliation.current_source_local_reviewed_count,33);
 assert.equal(new Set(priorQualified).size,33);
 assert.equal(c.schema,'isograph.exp062-W04b-2026-03-09-original-author-cold.v0.1');
 assert.equal(c.source,'W04b');assert.equal(c.two_clean_original_author_http_reads,true);
 assert.equal(c.original_author_anchor_count,19);
 assert.equal(c.comments_and_reader_responses_excluded,true);
 assert.equal(c.original_2026_10_03_raw_identical_not_claimed,true);
 assert.equal(c.scientific_truth_qualified,false);
 assert.equal(c.first.sha256,q.original_author.normalized_entry_content_sha256);
 assert.equal(c.second.sha256,q.original_author.normalized_entry_content_sha256);
 assert.equal(c.first.anchors_verified,19);assert.equal(c.second.anchors_verified,19);
 assert.deepEqual(c.original_author_article_lines,[10,30]);
 assert.equal(q.rows.length,6);
 assert.deepEqual(q.rows.map(x=>x.census_id),expectIds);
 assert.deepEqual(q.rows.map(x=>x.occurrences.length),denom);
 assert.equal(q.summary.source_bodies,6);
 const seen=new Set();let total=0;
 for(let r=0;r<6;r++){
  const x=q.rows[r],s=C.get(x.census_id),i=I.get(x.census_id),parts=g0.line_map.filter(a=>a.census_ids.includes(x.census_id));
  assert.ok(s&&i);assert.equal(i.unit,'W04b');
  assert.ok(!priorQualified.includes(x.census_id),'already qualified G1 source '+x.census_id);
  assert.equal(x.exact_frozen_ssc_body,s.obligation);
  assert.equal(x.source_provenance.ssc_blob_sha,P.ssc[1]);
  assert.equal(x.source_provenance.original_index_blob_sha,P.inverse[1]);
  assert.equal(x.source_provenance.original_author_url,q.original_author.url);
  assert.equal(x.source_provenance.source_original_exact_revision,'2026-10-11_STABLE_AUTHOR_BODY_FINGERPRINT');
  assert.equal(x.source_provenance.original_article_date,'2026-03-09');
  assert.deepEqual(x.source_provenance.source_location_keys,i.original_source_keys);
  assert.deepEqual(x.source_provenance.original_source_typed_ids,i.source_typed_statement_ids);
  assert.deepEqual(x.source_provenance.source_location_keys,parts.map(a=>'W04b/web_author_article/W04B-L'+a.line));
  assert.equal(x.current_G1_status,'SOURCE_LOCAL_G1_CANDIDATE_PENDING_COLD_AUTHOR_CI');
  assert.ok(x.source_first_method.length>30);
  const deps=new Set();
  for(let k=0;k<x.occurrences.length;k++){
   const o=x.occurrences[k];total++;
   assert.equal(o.occurrence_id,x.census_id+'-CURG1-'+String(k+1).padStart(2,'0'));
   assert.ok(!seen.has(o.occurrence_id),'duplicate source occurrence '+o.occurrence_id);seen.add(o.occurrence_id);
   assert.equal(o.current_qualification,'SOURCE_LOCAL_CANDIDATE_NOT_FULL_G1_CLOSURE');
   assert.equal(o.source_semantic_authority,false);
   assert.equal(o.binder_ownership,'ONLY_WHERE_PRINTED_WITHIN_AUTHOR_SOURCE_SCOPE');
   assert.ok(s.obligation.includes(o.exact_current_frozen_body_span),'SSC source-span not present '+o.occurrence_id);
   assert.ok(o.exact_current_frozen_body_span.includes(o.relation_span),'relation absent from G0 source span '+o.occurrence_id);
   for(const term of o.argument_spans)assert.ok(o.exact_current_frozen_body_span.includes(term),'argument absent '+o.occurrence_id);
   for(const dep of o.depends_on)assert.ok(deps.has(dep),'future or cross-source dependency '+o.occurrence_id+' <- '+dep);
   assert.ok(o.source_specific_guard.length>18);
   assert.ok(o.source_logical_force.length>7);
   assert.ok(o.source_argument_result_roles&&typeof o.source_argument_result_roles==='object');
   assert.ok(!Object.hasOwn(o,'requires')&&!Object.hasOwn(o,'primitive_id')&&!Object.hasOwn(o,'CLOSED_SCHEMA'));
   assert.ok(Number.isInteger(o.original_author_line)&&o.original_author_line>=10&&o.original_author_line<=30);
   const authorG0=g0.line_map.find(a=>a.line===o.original_author_line);
   assert.ok(authorG0?.census_ids.includes(x.census_id),'unmatched original author line '+o.occurrence_id);
   if(o.original_typed_assertion_id){
     assert.ok(i.source_typed_statement_ids.includes(o.original_typed_assertion_id));
     const rec=s.source_expression_census?.statements.find(t=>t.id===o.original_typed_assertion_id);
     assert.ok(rec,'missing source-inverse typed original semantic atom '+o.original_typed_assertion_id);
     if(rec.live_author_html_line)assert.equal(rec.live_author_html_line,o.original_author_line);
   }else assert.equal(x.census_id,'W-SSC-015','typed source original omitted for '+x.census_id);
   deps.add(o.occurrence_id);
  }
 }
 assert.equal(total,45);
 assert.equal(q.rows[1].occurrences[1].source_argument_result_roles.range_order[0],'CONJUGATE_G');
 assert.deepEqual(q.rows[1].occurrences[1].source_argument_result_roles.range_order,['CONJUGATE_G','G']);
 assert.deepEqual(q.rows[1].occurrences[2].source_argument_result_roles.ordered_factors,['SU2_L','SU2_R']);
 assert.equal(q.rows[1].occurrences[8].source_argument_result_roles.only_spinor_kind,'S_R');
 assert.equal(q.rows[2].occurrences[4].source_argument_result_roles.representer,'CP1_IN_PT');
 assert.equal(q.rows[2].occurrences[5].source_argument_result_roles.preferred,'PT_COMPLEX_3');
 assert.deepEqual(q.rows[3].occurrences[2].source_argument_result_roles.ordered,['CP1_PLUS','CP1_MINUS','S1_EQUATOR']);
 assert.equal(q.rows[3].occurrences[7].source_argument_result_roles.unique,false);
 assert.equal(q.rows[3].occurrences[8].source_logical_force,'SOURCE_CAYLEY_ACTION_RELATION');
 assert.equal(q.rows[4].occurrences[0].source_argument_result_roles.solutions,'MASSLESS_WAVE_EQUATIONS');
 assert.deepEqual(q.rows[4].occurrences[1].source_argument_result_roles.domains,['PT_PLUS','PT_MINUS']);
 assert.equal(q.rows[4].occurrences[3].source_argument_result_roles.candidate,'HYPERFUNCTIONS_ON_N');
 assert.equal(q.rows[5].occurrences[3].source_argument_result_roles.base,'HP1_EQUALS_S4');
 assert.equal(q.rows[5].occurrences[3].source_argument_result_roles.fiber,'CP1_EQUALS_S2');
 assert.equal(q.rows[5].occurrences[8].source_argument_result_roles.total,'N');
 assert.equal(q.rows[5].occurrences[8].source_argument_result_roles.base,'S3');
 assert.equal(q.rows[5].occurrences[8].source_argument_result_roles.fiber,'S2');
 assert.equal(q.rows[5].occurrences[10].source_argument_result_roles.completion,false);
 // Pinned source-native typed assertions independent of the newly compiled G1 candidate.
 const ww=i=>C.get('W-SSC-'+i).source_expression_census?.statements||[];
 assert.deepEqual(ww('066').find(x=>x.id==='W04B-066-02').ordered_factors,['CONJUGATE(g)','g']);
 assert.equal(ww('068').find(x=>x.id==='W04B-068-01').roles.orbit_count,3);
 assert.equal(ww('070').find(x=>x.id==='W04B-070-01').roles.scope,'MASSLESS_WAVE_EQUATIONS');
 assert.equal(ww('071').find(x=>x.id==='W04B-071-02').roles.fiber,'CP1=S2');
 return {current_source_G0:'FROZEN',G1:'SIX_SOURCE_LOCAL_W04B_CANDIDATES',reviewed_predecessor:33,new_source_bodies:6,new_source_occurrences:45,old_Oct03_G0:'OPEN',G2:'BLOCKED'};
}
const original=verify(copy(M),copy(live));
const tests=[
['rewrite old G0',a=>a.m.historical_oct03_G0='PASS'],
['premature G2',a=>a.m.G2_authorized=true],
['import L',a=>a.m.no_L_semantics=false],
['fake W04b authored source SHA',a=>a.l.first.sha256='bad'],
['delete original author body anchor',a=>a.l.first.anchors_verified=18],
['insert reader comment',a=>a.m.original_author.reader_comments_excluded=false],
['revert source-typed provenance',a=>a.m.rows[1].source_provenance.ssc_blob_sha='bad'],
['wrong original author source id',a=>a.m.rows[1].occurrences[0].original_typed_assertion_id='fake'],
['wrong original author locus',a=>a.m.rows[3].occurrences[0].original_author_line=28],
['wrong source author unit',a=>a.m.rows[1].source_unit='W04c'],
['invent source expression',a=>a.m.rows[5].occurrences[8].exact_current_frozen_body_span='N≅Spin(10)'],
['reverse Minkowski embedding',a=>a.m.rows[1].occurrences[1].source_argument_result_roles.range_order=['G','CONJUGATE_G']],
['drop bar first',a=>a.m.rows[1].occurrences[1].source_argument_result_roles.range_order[0]='G'],
['wrong Euclidean SU order',a=>a.m.rows[1].occurrences[2].source_argument_result_roles.ordered_factors.reverse()],
['false left-only Wick',a=>a.m.rows[1].occurrences[8].source_argument_result_roles.only_spinor_kind='S_L'],
['turn CP1 into PT point',a=>a.m.rows[2].occurrences[4].source_argument_result_roles.representer='POINT_OF_PT'],
['reverse complex geometry priority',a=>a.m.rows[2].occurrences[5].source_argument_result_roles.preferred='CP1_FAMILY_COMPLEX_4'],
['invent orbit fourth',a=>a.m.rows[3].occurrences[2].source_argument_result_roles.ordered.push('FOURTH')],
['hyperfunctions forced unique',a=>a.m.rows[3].occurrences[7].source_argument_result_roles.unique=true],
['Cayley relation becomes carrier equality',a=>a.m.rows[3].occurrences[8].source_logical_force='SOURCE_CARRIER_IDENTITY'],
['overreach Penrose massless',a=>a.m.rows[4].occurrences[0].source_argument_result_roles.solutions='ALL_INTERACTING_FIELDS'],
['collapse two PT orbit choices',a=>a.m.rows[4].occurrences[1].source_argument_result_roles.domains=['PT_PLUS']],
['force hyperfunctions physical necessity',a=>a.m.rows[4].occurrences[3].source_argument_result_roles.candidate='ONLY_LEGAL_BOUNDARY_SPACE'],
['swap fibration base and fiber',a=>a.m.rows[5].occurrences[3].source_argument_result_roles.base='CP1_EQUALS_S2'],
['invert null fibration direction',a=>a.m.rows[5].occurrences[8].source_argument_result_roles.base='N'],
['pretend physics finished',a=>a.m.rows[5].occurrences[10].source_argument_result_roles.completion=true],
['unbound cross owner dep',a=>a.m.rows[1].occurrences[0].depends_on=['W-SSC-067-CURG1-01']],
['move author source math to named primitive',a=>a.m.rows[2].occurrences[1].primitive_id='CP3'],
['mark global G1 complete',a=>a.m.G1_global_complete=true],
['missing W04b occurrence',a=>a.m.rows[1].occurrences.pop()]
];
for(const [name,fn]of tests){const a={m:copy(M),l:copy(live)};fn(a);let rejected=false;try{verify(a.m,a.l)}catch(e){rejected=true;}assert.ok(rejected,'MUTATION ESCAPED '+name)}
console.log('W G1 six W04b source-first original-cold verification PASS '+JSON.stringify({...original,hostile_rejected:tests.length,hostile_total:tests.length}));
