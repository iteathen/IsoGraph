#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const e='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const p={
 old:w+'SOURCE_SEMANTIC_CENSUS_0_60.json',now:w+'SOURCE_SEMANTIC_CENSUS_0_61.json',
 audit:e+'W01_G0_A3_COMPLETE_ORIGINAL_SOURCE_FIRST_0_1.json',
 negative:e+'W01_G0_A3_A5_SOURCE_INVERSE_NEGATIVE_0_1.json',
 defect:e+'W01_G0_A3_SYSTEMATIC_SOURCE_FIDELITY_DEFECT_0_1.json',
 oldreg:e+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_46.json',
 reg:e+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_47.json',
 oldcov:e+'W_G0_LINE_BY_LINE_151_COVERAGE_0_45.json',
 cov:e+'W_G0_LINE_BY_LINE_151_COVERAGE_0_46.json',
 oldinv:e+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_27.json',
 inv:e+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_28.json',
 oldgate:e+'W_CURRENT_STAGE_GATE_0_120.json',
 gate:e+'W_CURRENT_STAGE_GATE_0_121.json',
 failed:e+'W01_G0_A3_V01_METADATA_FIELD_FAILED_CI_0_1.json',
 failed2:e+'W01_G0_A3_V02_NOOP_MUTANT_FAILED_CI_0_1.json'
};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8'));
const blobSha=b=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const sha=x=>blobSha(fs.readFileSync(x));
const shaCanonical=x=>blobSha(Buffer.from(JSON.stringify(x,null,2)+'\n','utf8'));
const originals=Object.fromEntries(Object.entries(p).map(([k,v])=>[k,read(v)]));
const clone=x=>structuredClone(x);
const owners=['W-SSC-051','W-SSC-052','W-SSC-053'];
const count=x=>x.items.reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0);
const countW=x=>x.items.filter(z=>z.source.startsWith('W01')).reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0);
function verify(ctx){
 const {old,now,audit,negative,defect,oldreg,reg,oldcov,cov,oldinv,inv,oldgate,gate,failed,failed2}=ctx;
 assert.equal(old.schema,'woit.source-semantic-census.v0.60');
 assert.equal(now.schema,'woit.source-semantic-census.v0.61');
 for(const key of Object.keys(p))assert.equal(shaCanonical(ctx[key]),sha(p[key]),'exact historical/current blob mutated: '+key);
 assert.equal(now.predecessor.git_blob_sha,sha(p.old));
 assert.equal(shaCanonical(failed),sha(p.failed),'failed original v0.1 status immutable');
 assert.equal(failed.run_id,38070863714);
 assert.equal(failed.original_commit,'186e615fd7f57ec2ce355be88339f36807b8da26');
 assert.equal(failed.positive_passed,false);
 assert.equal(failed.hostile_controls_executed,false);
 assert.equal(failed.conclusion,'failure');
 assert.equal(failed.qualified,false);
 assert.equal(failed.predecessor_verifier_blob_sha,'7295a577953480753bbbde0f0c8989545c718168');
 assert.equal(shaCanonical(failed2),sha(p.failed2),'second failed verifier run must remain immutable');
 assert.equal(failed2.run_id,38071012374);
 assert.equal(failed2.commit,'5cb6143aac6942cd906f0f268eff82127f728f4e');
 assert.equal(failed2.conclusion,'failure');
 assert.equal(failed2.baseline_positive,true);
 assert.equal(failed2.rejected_before_escape,3);
 assert.equal(failed2.escaped_mutation,'source original owner missing');
 assert.equal(failed2.qualified,false);
 assert.equal(failed2.predecessor_verifier_blob_sha,'d504e0c64aebfaeb1b0dc54d89067c7914f49981');
 assert.equal(audit.schema,'isograph.exp062-w01-a3-original-full-source-first.v0.1');
 assert.equal(audit.track,'W');assert.equal(audit.semantic_authority,false);
 assert.equal(audit.source.revision,'arXiv:2104.05099v2');
 assert.deepEqual(audit.source.author_html_scope,[538,762]);
 assert.deepEqual(audit.source.pdf_printed_pages_visually_checked,[20,21,22,23,24,25,26,27,28]);
 assert.equal(audit.source.oct03_original_author_pdf_download_bytes_verified,false);
 assert.equal(audit.locations.length,42);
 let cursor=538,load=0,seen=new Set(),covered=new Set();
 for(const loc of audit.locations){
   assert.equal(loc.html[0],cursor,'source-first gap/overlap '+loc.id);
   assert.ok(Number.isInteger(loc.html[1])&&loc.html[1]>=cursor);
   cursor=loc.html[1]+1;
   assert.ok(!seen.has(loc.id),'source location duplicated');
   seen.add(loc.id);
   assert.ok(loc.source_semantic_disposition.length>8);
   if(loc.kind==='HEADING')assert.deepEqual(loc.ssc_owners,[]);
   else {
     load++;
     assert.ok(loc.ssc_owners.length>0,'unindexed author load-bearing location '+loc.id);
     for(const id of loc.ssc_owners){
       assert.ok(owners.includes(id),'source location wrong author/section owner '+id);
       covered.add(id);
     }
   }
 }
 assert.equal(cursor,763);assert.equal(load,37);
 assert.deepEqual([...covered].sort(),owners);
 assert.equal(audit.counts.disjoint_original_locations,42);
 assert.equal(audit.counts.load_bearing_source_intervals,37);
 assert.equal(audit.counts.nonload_heading_intervals,5);
 assert.equal(audit.counts.full_A3_source_lines,225);
 assert.equal(audit.G0_scope.G0_frozen,false);
 assert.equal(audit.G0_scope.W01_whole_original_source_complete,false);
 assert.equal(audit.G0_scope.all_9_frozen_source_units_complete,false);
 assert.equal(audit.source_guarded_findings.length,7);
 assert.deepEqual(audit.source_guarded_findings.map(z=>z.owner).sort(),['W-SSC-051','W-SSC-051','W-SSC-051','W-SSC-052','W-SSC-052','W-SSC-053','W-SSC-053'].sort());
 assert.equal(defect.classes.length,4);
 assert.deepEqual(defect.existing_source_owners,owners);
 assert.equal(defect.G0_open,true);
 assert.equal(negative.schema,'isograph.exp062-w01-a3-quaternion-inverse-literal-negative.v0.1');
 assert.equal(negative.source.eq,'(A.5)');
 assert.equal(negative.source.source_printed,undefined);
 assert.equal(negative.source_direct_verbatim_math.source_defining_s,'s=s1+s2*j');
 assert.equal(negative.source_direct_verbatim_math.source_middle_inverse_factor,'conj(s1)-s1*j');
 assert.equal(negative.source_direct_verbatim_math.source_final_expanded_j_coeff,'-s_perp1*s2+s_perp2*s1');
 const w=negative.independent_non_author_recheck;
 assert.deepEqual(w.chosen_real_quaternion_components,{s1:1,s2:2,sperp1:1,sperp2:0});
 const {s1,s2,sperp1,sperp2}=w.chosen_real_quaternion_components;
 const den=s1*s1+s2*s2;
 assert.equal(den,5);
 const left=[(sperp1*s1+sperp2*s2)/den,(-sperp1*s2+sperp2*s1)/den];
 const middle=[sperp1*s1/den,-sperp1*s1/den];
 const rhs=[(sperp1*s1+sperp2*s2)/den,(-sperp1*s2+sperp2*s1)/den];
 assert.deepEqual(left,w.left_coeff_pair);
 assert.deepEqual(middle,w.middle_coeff_pair);
 assert.deepEqual(rhs,w.right_coeff_pair);
 assert.deepEqual(left,rhs);
 assert.notDeepEqual(left,middle);
 assert.equal(w.equal_left_right,true);
 assert.equal(w.equal_left_middle,false);
 assert.equal(negative.source_correction_made,false);
 assert.equal(old.items.length,151);assert.equal(now.items.length,151);
 assert.equal(count(old),489);assert.equal(count(now),503);
 assert.equal(countW(old),202);assert.equal(countW(now),216);
 assert.equal(now.correction.unaffected_other148_full_source_objects_exact,true);
 assert.deepEqual(now.correction.changed_W_ids,owners);
 assert.equal(now.correction.G0_frozen,false);
 assert.equal(now.cross_author_semantics_available,false);
 for(const id of owners){
   const oldItem=old.items.find(z=>z.id===id),item=now.items.find(z=>z.id===id);
   assert.ok(oldItem&&item);
   const before=oldItem.source_expression_census?.statements||[];
   const after=item.source_expression_census?.statements||[];
   const extra=id==='W-SSC-053'?6:4;
   assert.equal(after.length,before.length+extra);
   assert.deepEqual(after.slice(0,before.length),before,'preexisting typed source incidence changed '+id);
 }
 const W51=now.items.find(z=>z.id==='W-SSC-051');
 const W52=now.items.find(z=>z.id==='W-SSC-052');
 const W53=now.items.find(z=>z.id==='W-SSC-053');
 const m51=W51.source_expression_census.statements;
 assert.deepEqual(m51[0].real_forms_considered,['so(3,3)','so(4,2)','so(5,1)','so(6)']);
 assert.equal(m51[0].other_real_form_not_treated,'su(3,1)');
 assert.deepEqual(m51[2].source_Z,[['x0+x3','x1-x2'],['x1+x2','x0-x3']]);
 assert.deepEqual(m51[2].earlier_W01_S21_Z,[['x0+x3','x1+x2'],['x1-x2','x0-x3']]);
 assert.equal(m51[3].negative,'NO_FOUR_REAL_DIMENSIONAL_ORBIT_IN_M_TO_FURNISH_REAL_SPACETIME');
 assert.equal(m51[3].homogeneous.P_S,'SU(4)/S(U(1)×U(2))');
 const m52=W52.source_expression_census.statements;
 assert.equal(m52[2].SU22_membership,'g† J g=J');
 assert.equal(m52[3].condition,'A†C=-C†A');
 assert.equal(m52[4].explicit_negative,'TWISTOR_SU22_INCIDENT_OBJECT_NOT_IDENTICAL_TO_DIRAC_SPINOR');
 assert.equal(m52[5].open_boundary,'HYPERFUNCTION_HELICITY_K_OVER_2');
 assert.equal(m52[5].closed_boundary,'REAL_ANALYTIC_HELICITY_K_OVER_2');
 assert.equal(m52[5].source_negative,'NO_COMPACT_SU(n)_ASD_GAUGE_FIELDS_FROM_MINKOWSKI_REAL_BOUNDARY');
 const m53=W53.source_expression_census.statements;
 assert.equal(m53[4].source_middle_factor,'conj(s1)-s1*j');
 assert.equal(m53[4].source_expanded_j_coeff,'-sperp1*s2+sperp2*s1');
 assert.equal(m53[5].Euclidean_action,'DZA^-1+CA^-1');
 assert.equal(m53[6].PDF_diagram,'CP¹→PT=CP³; π:PT→S⁴=HP¹');
 assert.equal(m53[6].pdf_diagram_present,true);
 assert.equal(m53[7].Euclidean,'alpha(p) INTERSECTION sigma(alpha(p)) = ONE REAL_POINT π(p)');
 assert.equal(m53[8].coupled_sheaf,'H¹(Uhat,O(E)(-k-2))');
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
 for(let i=0;i<151;i++){
   const p0=old.items[i],p1=now.items[i],r=reg.rows[i],c=cov.rows[i];
   assert.equal(p0.id,p1.id);assert.equal(r.census_id,p1.id);assert.equal(c.census_id,p1.id);
   assert.equal(r.source_body_exact,p1.obligation);
   assert.equal(r.source_expression_statement_count,p1.source_expression_census?.statements?.length||0);
   assert.equal(c.body_length_chars,p1.obligation.length);
   assert.equal(c.source_expression_statement_count,p1.source_expression_census?.statements?.length||0);
   assert.equal(r.historical_86_member,oldreg.rows[i].historical_86_member);
   assert.equal(r.historical_ledger_0_19_mode,oldreg.rows[i].historical_ledger_0_19_mode);
   assert.equal(r.historical_closure_accepted_as_current,false);
   if(!owners.includes(p1.id)){
      assert.deepEqual(p1,p0,'unaffected SSC object modified');
      assert.deepEqual(r,oldreg.rows[i],'unaffected source membership changed');
      assert.deepEqual(c,oldcov.rows[i],'unaffected source coverage changed');
   }
 }
 assert.equal(reg.source_census.git_blob_sha,sha(p.now));
 assert.equal(inv.source_census.git_blob_sha,sha(p.now));
 assert.equal(gate.current_source_census.git_blob_sha,sha(p.now));
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,sha(p.reg));
 assert.equal(gate.current_source_coverage.git_blob_sha,sha(p.cov));
 assert.equal(gate.current_W_nine_source_inventory_028.git_blob_sha,sha(p.inv));
 assert.equal(gate.current_W01_A3_original_source_first.audit.git_blob_sha,sha(p.audit));
 assert.equal(gate.current_W01_A3_original_source_first.negative.git_blob_sha,sha(p.negative));
 assert.equal(gate.current_W01_A3_original_source_first.defect.git_blob_sha,sha(p.defect));
 assert.equal(gate.supersedes.git_blob_sha,sha(p.oldgate));
 assert.deepEqual(gate.current_historical_86_member_projection,oldgate.current_historical_86_member_projection);
 assert.equal(inv.summary.structured_incidences,503);
 assert.equal(inv.units.find(z=>z.unit==='W01').structured_incidences,216);
 assert.equal(inv.units.find(z=>z.unit==='W01').all_original_source_assertions_reverse_qualified,false);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate.current_lawful_state[k],false,'illegal stage '+k);
 return {source:'W01 Appendix A.3',locations:42,load_bearing:37,census_items:151,typed_incidents:503,other148_exact:true,A5_literal_preserved:true,G0:'OPEN'};
}
const positive=verify(originals);
const mutants=[
 ['drop original A3 interval',x=>x.audit.locations.pop()],
 ['shift source A3 boundary',x=>x.audit.locations[7].html[0]++],
 ['overlap source A3 boundary',x=>x.audit.locations[10].html[0]--],
 ['source original owner missing',x=>x.audit.locations[4].ssc_owners=[]],
 ['wrong source owner',x=>x.audit.locations[4].ssc_owners=['W-SSC-150']],
 ['false compact no-real-orbit scope',x=>x.now.items.find(z=>z.id==='W-SSC-051').source_expression_census.statements[3].negative='4D_PRESENT'],
 ['omit excluded su31 real form',x=>x.now.items.find(z=>z.id==='W-SSC-051').source_expression_census.statements[0].other_real_form_not_treated='NONE'],
 ['normalize split x2 source signs',x=>x.now.items.find(z=>z.id==='W-SSC-051').source_expression_census.statements[2].source_Z[0][1]='x1+x2'],
 ['silently rewrite A5 middle factor',x=>x.now.items.find(z=>z.id==='W-SSC-053').source_expression_census.statements[4].source_middle_factor='conj(s1)-s2*j'],
 ['remove A5 independent negative',x=>x.negative.independent_non_author_recheck.equal_left_middle=true],
 ['false A5 witness inputs',x=>x.negative.independent_non_author_recheck.chosen_real_quaternion_components.s2=1],
 ['wrong A6 PDF diagram',x=>x.now.items.find(z=>z.id==='W-SSC-053').source_expression_census.statements[6].PDF_diagram='NONE'],
 ['Minkowski open boundary falsely analytic',x=>x.now.items.find(z=>z.id==='W-SSC-052').source_expression_census.statements[5].open_boundary='REAL_ANALYTIC'],
 ['Minkowski compact SU(n) forbidden negative erased',x=>x.now.items.find(z=>z.id==='W-SSC-052').source_expression_census.statements[5].source_negative='NONE'],
 ['wrong Poincare group block condition',x=>x.now.items.find(z=>z.id==='W-SSC-052').source_expression_census.statements[3].condition='A†C=C†A'],
 ['W01 twistor interpreted as literally Dirac',x=>x.now.items.find(z=>z.id==='W-SSC-052').source_expression_census.statements[4].explicit_negative='IDENTICAL'],
 ['rewrite historical W51',x=>x.old.items.find(z=>z.id==='W-SSC-051').obligation+='modified'],
 ['rewrite historical W27',x=>x.old.items.find(z=>z.id==='W-SSC-027').obligation+='modified'],
 ['edit unrelated W02 source',x=>x.now.items.find(z=>z.id==='W-SSC-140').obligation+='fake'],
 ['remove older existing W53 statement',x=>x.now.items.find(z=>z.id==='W-SSC-053').source_expression_census.statements.shift()],
 ['erase existing SSC register row',x=>x.reg.rows.pop()],
 ['incorrect W051 current body',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-051').source_body_exact=''],
 ['falsify old86 membership',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-051').historical_86_member=false],
 ['wrong source revision',x=>x.audit.source.revision='v3'],
 ['claim October03 frozen author PDF bytes proven',x=>x.audit.source.oct03_original_author_pdf_download_bytes_verified=true],
 ['mutate source original A3 oracle',x=>x.audit.locations[27].kind='NEW'],
 ['erase source defect',x=>x.defect.classes.pop()],
 ['edit parent stage digest',x=>x.gate.supersedes.git_blob_sha='no'],
 ['false G0 frozen',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['false all nine original complete',x=>x.gate.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['authorize G1',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['authorize W/L synthesis',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['rewrite historical failed v01 run',x=>x.failed.qualified=true],
 ['rewrite failed v01 tested checker SHA',x=>x.failed.predecessor_verifier_blob_sha='NO'],
 ['erase failed v01 positive status',x=>x.failed.positive_passed=true],
 ['falsify failed v02 status',x=>x.failed2.qualified=true],
 ['rewrite failed v02 test SHA',x=>x.failed2.predecessor_verifier_blob_sha='WRONG']
];
let rejected=0;
for(const [name,alter] of mutants){
 const cp=clone(originals);alter(cp);
 // A would-be hostile mutation that leaves the fixture unchanged is a verifier bug,
 // not evidence that the baseline is resilient.
 assert.notDeepEqual(cp,originals,'INERT_HOSTILE_MUTATION '+name);
 try{verify(cp);}catch(e){rejected++;continue;}
 throw Error('HOSTILE ESCAPED '+name);
}
assert.equal(rejected,mutants.length);
console.log('W G0 A3 source-first local conservation PASS '+JSON.stringify(positive));
console.log('Adversarial original-source/SSC controls '+rejected+'/'+mutants.length+' rejected; all-nine original-source G0 and Oct03 mutable-page byte identity still OPEN.');
