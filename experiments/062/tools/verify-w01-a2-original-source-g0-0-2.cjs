#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const root='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const paths={
 before:w+'SOURCE_SEMANTIC_CENSUS_0_59.json',
 now:w+'SOURCE_SEMANTIC_CENSUS_0_60.json',
 source:root+'W01_G0_A2_ORIGINAL_SOURCE_FIRST_REVERSE_0_1.json',
 defect:root+'W01_G0_A2_WARD_DIRECTION_HELICITY_GAP_0_1.json',
 regold:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_45.json',
 reg:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_46.json',
 covold:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_44.json',
 cov:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_45.json',
 invold:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_26.json',
 inv:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_27.json',
 gateold:root+'W_CURRENT_STAGE_GATE_0_119.json',
 gate:root+'W_CURRENT_STAGE_GATE_0_120.json',
 failure:root+'W01_G0_A2_VERIFIER_V01_SYNTAX_FAIL_0_1.json'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const shaBytes=x=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex');
const sha=p=>shaBytes(fs.readFileSync(p));
const shaParsed=x=>shaBytes(Buffer.from(JSON.stringify(x,null,2)+'\n'));
const docs=Object.fromEntries(Object.entries(paths).map(([k,v])=>[k,read(v)]));
const deep=x=>structuredClone(x);
function verify(ctx){
 const {before,now,source,defect,regold,reg,covold,cov,invold,inv,gateold,gate,failure}=ctx;
 assert.equal(before.schema,'woit.source-semantic-census.v0.59');
 assert.equal(now.schema,'woit.source-semantic-census.v0.60');
 for(const name of ['before','now','source','defect'])assert.equal(shaParsed(ctx[name]),sha(paths[name]),'frozen original/versioned document changed: '+name);
 assert.equal(now.predecessor.git_blob_sha,sha(paths.before));
 assert.equal(shaParsed(failure),sha(paths.failure),'historical failed v01 verifier provenance altered');
 assert.equal(failure.run_id,38046477920);
 assert.equal(failure.commit,'6dc6018f78bdc29f58137db67d3f93782b878860');
 assert.equal(failure.conclusion,'failure');
 assert.equal(failure.parse_success,false);
 assert.equal(failure.positive_baseline_executed,false);
 assert.equal(failure.adversarial_controls_executed,false);
 assert.equal(failure.reclassified_as_pass,false);
 assert.equal(failure.old_verifier_git_blob_sha,'d6c2a386df2d8c31c48e868c25d76cf3bb330a93');
 assert.equal(now.cross_author_semantics_available,false);
 assert.equal(source.schema,'isograph.exp062-w01-a2-finite-original-source-first-census.v0.1');
 assert.equal(source.track,'W');assert.equal(source.semantic_authority,false);
 assert.equal(source.source.frozen_revision,'arXiv:2104.05099v2');
 assert.deepEqual(source.source.html_scope,[491,537]);
 assert.deepEqual(source.source.original_pdf_printed_pages,[19,20]);
 assert.equal(source.source.pdf_visually_checked_both,true);
 assert.equal(source.source.Oct03_original_pdf_bytes_digest,'NOT_ESTABLISHED');
 assert.equal(source.source_represented_predecessor.blob_sha,sha(paths.before));
 assert.equal(source.source_represented_predecessor.W050_typed_incidents,3);
 assert.equal(source.counts.new_source_id_count,0);
 assert.equal(source.counts.confirmed_missing_semantic_role_classes,4);
 const rr=source.source_locations;
 assert.equal(rr.length,9);
 assert.deepEqual(rr.map(z=>z.html_span),[[491,491],[492,497],[498,504],[505,508],[509,518],[519,522],[523,523],[524,524],[525,537]]);
 assert.deepEqual(rr.map(z=>z.id),Array.from({length:9},(_,i)=>'W01-A2-'+String(i+1).padStart(3,'0')));
 let pos=491,load=0;
 for(const line of rr){
   assert.equal(line.html_span[0],pos,'source original interval gap');
   assert.ok(line.html_span[1]>=line.html_span[0]);
   pos=line.html_span[1]+1;
   if(line.kind==='HEADING')assert.deepEqual(line.SSC_owners,[]);
   else {load++;assert.deepEqual(line.SSC_owners,['W-SSC-050'],'original author semantic location lacks correct SSC owner');}
 }
 assert.equal(pos,538);assert.equal(load,8);
 assert.equal(source.counts.original_html_lines,47);
 assert.equal(source.counts.load_bearing,8);
 assert.equal(source.source_operators.uncoupled.helicity,'k/2');
 assert.equal(source.source_operators.uncoupled.source_cohomology,'H¹(Uhat,O(-k-2))');
 assert.equal(source.source_operators.gauge_coupled.helicity,'k');
 assert.equal(source.source_operators.gauge_coupled.source_cohomology,'H¹(Uhat,O(E)(-k-2))');
 assert.equal(source.source_operators.different_helicity_printed,true);
 assert.equal(source.source_operators.not_independently_equated,true);
 assert.deepEqual(rr[7].source_native_citations,[35,28]);
 assert.deepEqual(rr[8].source_native_citations,[16]);
 assert.equal(defect.changed_handle,'W-SSC-050');
 assert.equal(defect.old_ssc.git_blob_sha,sha(paths.before));
 assert.equal(defect.G0,'OPEN_UNFROZEN');
 assert.equal(defect.other150_W_source_items_expected_exact,true);
 assert.equal(before.items.length,151);assert.equal(now.items.length,151);
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
 const cnt=(j,unit)=>j.items.filter(v=>!unit||v.source.startsWith(unit)).reduce((n,v)=>n+(v.source_expression_census?.statements?.length||0),0);
 assert.equal(cnt(before),485);assert.equal(cnt(now),489);
 assert.equal(cnt(before,'W01'),198);assert.equal(cnt(now,'W01'),202);
 assert.equal(cnt(now,'W02'),71);
 let ownerCount=0;
 for(let i=0;i<151;i++){
   const a=before.items[i],b=now.items[i];
   assert.equal(a.id,b.id);
   assert.equal(reg.rows[i].census_id,b.id);assert.equal(cov.rows[i].census_id,b.id);
   assert.equal(reg.rows[i].source_body_exact,b.obligation);
   assert.equal(reg.rows[i].source_expression_statement_count,(b.source_expression_census?.statements||[]).length);
   assert.equal(cov.rows[i].body_length_chars,b.obligation.length);
   assert.equal(cov.rows[i].source_expression_statement_count,(b.source_expression_census?.statements||[]).length);
   assert.equal(reg.rows[i].historical_86_member,regold.rows[i].historical_86_member);
   assert.equal(reg.rows[i].historical_ledger_0_19_mode,regold.rows[i].historical_ledger_0_19_mode);
   assert.equal(reg.rows[i].historical_closure_accepted_as_current,false);
   if(b.id==='W-SSC-050'){
     ownerCount++;
     assert.equal(a.source_expression_census.statements.length,3);
     assert.equal(b.source_expression_census.statements.length,7);
     assert.deepEqual(b.source_expression_census.statements.slice(0,3),a.source_expression_census.statements,'W050 older original-source occurrences modified');
   }else{
     assert.deepEqual(b,a,'unaffected source semantic record changed');
     assert.deepEqual(reg.rows[i],regold.rows[i],'unaffected source membership changed');
     assert.deepEqual(cov.rows[i],covold.rows[i],'unaffected source review changed');
   }
 }
 assert.equal(ownerCount,1);
 const t=now.items.find(x=>x.id==='W-SSC-050');
 const [a,b,c,d]=t.source_expression_census.statements.slice(3);
 assert.deepEqual([a.id,b.id,c.id,d.id],['W01-A2-050-04','W01-A2-050-05','W01-A2-050-06','W01-A2-050-07']);
 assert.deepEqual(a.original_html_lines,[505,508]);
 assert.equal(a.source_sheaf,'O(-k-2)=HOLOMORPHIC_SECTIONS_OF_L^(TENSOR(-k-2))');
 assert.equal(a.first_helicity,'k/2');
 assert.deepEqual(b.original_html_lines,[523,523]);
 assert.equal(b.direction,'SPACE_TIME_ASD_CONNECTION_TO_HOLOMORPHIC_TWISTOR_BUNDLE');
 assert.equal(b.source_construction,'E_p = COVARIANTLY_CONSTANT_SECTIONS_OF_BUNDLE_WITH_A_ON_ALPHA(p) INTERSECT U');
 assert.deepEqual(c.original_html_lines,[524,524]);
 assert.equal(c.source_fiber,'E_TILDE_m=HOLOMORPHIC_SECTIONS_OF_E_RESTRICTED_TO_CP1_m');
 assert.equal(c.direction,'HOLOMORPHIC_TWISTOR_BUNDLE_TO_SPACE_TIME_ASD_CONNECTION');
 assert.equal(d.source_heliticy_literal,'k');
 assert.equal(d.source_sheaf,'H¹(Uhat,O(E)(-k-2))');
 assert.equal(d.contrast_prior_uncoupled.helicity,'k/2');
 assert.equal(d.source_citation,'[16]');
 assert.match(t.obligation,/uncoupled Penrose transform explicitly says helicity k\/2/);
 assert.match(t.obligation,/printed helicity k/);
 assert.deepEqual(now.correction.changed_W_ids,['W-SSC-050']);
 assert.equal(now.correction.G0_frozen,false);
 assert.equal(reg.source_census.git_blob_sha,sha(paths.now));
 assert.equal(inv.source_census.git_blob_sha,sha(paths.now));
 assert.equal(gate.current_source_census.git_blob_sha,sha(paths.now));
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,sha(paths.reg));
 assert.equal(gate.current_source_coverage.git_blob_sha,sha(paths.cov));
 assert.equal(gate.current_W_nine_source_inventory_027.git_blob_sha,sha(paths.inv));
 assert.equal(gate.current_W01_A2_source_first.original_oracle.git_blob_sha,sha(paths.source));
 assert.equal(gate.current_W01_A2_source_first.predecessor_source_gap.git_blob_sha,sha(paths.defect));
 assert.equal(gate.supersedes.git_blob_sha,sha(paths.gateold));
 assert.deepEqual(gate.current_historical_86_member_projection,gateold.current_historical_86_member_projection);
 assert.equal(inv.summary.structured_incidences,489);
 assert.equal(inv.units.find(z=>z.unit==='W01').structured_incidences,202);
 assert.equal(inv.units.find(z=>z.unit==='W01').all_original_source_assertions_reverse_qualified,false);
 assert.equal(reg.counts.source_expression_total,489);
 assert.equal(cov.counts.total_structured_source_incidents,489);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate.current_lawful_state[key],false,'unauthorized G0/downstream stage '+key);
 return {W_source:'W01_A2',intervals:9,load_bearing:8,source_ids_unchanged:151,source_typed:489,W01_source_typed:202,other150_full_source_objects_exact:true,source_uncoupled_helicity:'k/2',source_coupled_helicity:'k',G0:'OPEN'};
}
const positive=verify(docs);
const mutants=[
 ['delete A2 original interval',x=>x.source.source_locations.pop()],
 ['gap original interval',x=>x.source.source_locations[3].html_span[0]++],
 ['overlap original interval',x=>x.source.source_locations[6].html_span[0]--],
 ['unindexed original constructive role',x=>x.source.source_locations[6].SSC_owners=[]],
 ['misassign old source owner',x=>x.source.source_locations[7].SSC_owners=['W-SSC-049']],
 ['promote heading to semantic occurrence',x=>x.source.source_locations[0].SSC_owners=['W-SSC-050']],
 ['erase source native Ward citation',x=>x.source.source_locations[7].source_native_citations=[]],
 ['erase source coupled cited role',x=>x.source.source_locations[8].source_native_citations=[]],
 ['change printed uncoupled helicity',x=>x.source.source_operators.uncoupled.helicity='k'],
 ['change printed coupled helicity',x=>x.source.source_operators.gauge_coupled.helicity='k/2'],
 ['equate source heliities',x=>x.source.source_operators.not_independently_equated=false],
 ['wrong sheaf operator source',x=>x.source.source_operators.gauge_coupled.source_cohomology='H¹(Uhat,O(-k-2))'],
 ['source original byte fabricated',x=>x.source.source.Oct03_original_pdf_bytes_digest='VERIFIED'],
 ['source version substituted',x=>x.source.source.frozen_revision='v3'],
 ['erase defect historical record',x=>x.defect.failure_cause=''],
 ['rewrite predecessor W050',x=>x.before.items.find(q=>q.id==='W-SSC-050').obligation+='fake'],
 ['rewrite unrelated historical W017',x=>x.before.items.find(q=>q.id==='W-SSC-017').obligation+='fake'],
 ['delete forward Ward source',x=>x.now.items.find(q=>q.id==='W-SSC-050').source_expression_census.statements.splice(4,1)],
 ['fake Ward forward construction',x=>x.now.items.find(q=>q.id==='W-SSC-050').source_expression_census.statements[4].source_construction='FAKE'],
 ['fake Ward reverse fiber type',x=>x.now.items.find(q=>q.id==='W-SSC-050').source_expression_census.statements[5].source_fiber='FAKE'],
 ['erase twisted Penrose cohomology',x=>x.now.items.find(q=>q.id==='W-SSC-050').source_expression_census.statements[6].source_sheaf='H¹(Uhat,O(-k-2))'],
 ['change source heuristic helicity',x=>x.now.items.find(q=>q.id==='W-SSC-050').source_expression_census.statements[6].source_heliticy_literal='k/2'],
 ['modify unrelated current source',x=>x.now.items.find(q=>q.id==='W-SSC-049').obligation+='fake'],
 ['drop SSC membership row',x=>x.reg.rows.pop()],
 ['modify unrelated SSC review row',x=>x.cov.rows.find(q=>q.census_id==='W-SSC-047').body_length_chars++],
 ['change historical 86 roster',x=>x.reg.rows.find(q=>q.census_id==='W-SSC-050').historical_86_member=!x.reg.rows.find(q=>q.census_id==='W-SSC-050').historical_86_member],
 ['wrong source pin',x=>x.gate.current_source_census.git_blob_sha='WRONG'],
 ['wrong coverage pin',x=>x.gate.current_source_coverage.git_blob_sha='WRONG'],
 ['wrong source-first oracle pin',x=>x.gate.current_W01_A2_source_first.original_oracle.git_blob_sha='WRONG'],
 ['false all nine original-source reverse complete',x=>x.gate.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['false G0 freeze',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['G1 unauthorized',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['G7 unauthorized',x=>x.gate.current_lawful_state.G7_authorized=true],
 ['L bridge unauthorized',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['falsify failed parse result',x=>x.failure.parse_success=true],
 ['falsify failed positive status',x=>x.failure.positive_baseline_executed=true],
 ['delete original failed record',x=>x.failure.run_id=0]
];
let rejected=0;for(const [name,mutate] of mutants){let x=deep(docs);mutate(x);try{verify(x);}catch(e){rejected++;continue;}throw Error('HOSTILE ESCAPED '+name);}
assert.equal(rejected,mutants.length);
console.log('W G0 W01 Appendix A.2 original source correspondence PASS '+JSON.stringify(positive));
console.log('Hostile controls rejected '+rejected+'/'+mutants.length+'. Global nine-source reverse and mutable Oct03 source provenance remain OPEN.');
