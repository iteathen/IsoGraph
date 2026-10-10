#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const root='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const p={old:w+'SOURCE_SEMANTIC_CENSUS_0_57.json',now:w+'SOURCE_SEMANTIC_CENSUS_0_58.json',audit:root+'W01_G0_S2_S3_FULL_SOURCE_FIRST_INTERVAL_0_1.json',defect:root+'W01_G0_S21_DIMENSION_EXCEPTION_PREDECESSOR_DEFECT_0_1.json',oldreg:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_43.json',reg:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_44.json',oldcov:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_42.json',cov:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_43.json',oldinv:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_24.json',inv:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_25.json',oldgate:root+'W_CURRENT_STAGE_GATE_0_117.json',gate:root+'W_CURRENT_STAGE_GATE_0_118.json',failed:root+'W01_G0_S23_VERIFIER_V01_FAILED_CI_0_1.json'};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8'));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const d=Object.fromEntries(Object.entries(p).map(([key,val])=>[key,read(val)])),copy=x=>structuredClone(x);
const sourceOwners=['W-SSC-002','W-SSC-003','W-SSC-026','W-SSC-027','W-SSC-028','W-SSC-029','W-SSC-030','W-SSC-031','W-SSC-032','W-SSC-112'];
function check(v){
 const {old,now,audit,defect,oldreg,reg,oldcov,cov,oldinv,inv,oldgate,gate,failed}=v;
 assert.equal(old.schema,'woit.source-semantic-census.v0.57');
 assert.equal(now.schema,'woit.source-semantic-census.v0.58');
 assert.equal(now.predecessor.git_blob_sha,sha(p.old));
 const oldBytes=Buffer.from(JSON.stringify(old,null,2)+'\n');
 const historicalSnapshotSHA=crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+oldBytes.length+'\0'),oldBytes])).digest('hex');
 assert.equal(historicalSnapshotSHA,sha(p.old),'historical old SSC object array modified in memory');
 assert.equal(failed.run_id,38036423232);
 assert.equal(failed.commit,'52287fc5f67897ff938a4a2570ffd1adbe3633e1');
 assert.equal(failed.predecessor_verifier_blob_sha,'306a7bb625c987db9a3e28a81669f0bbae1a26fb');
 assert.equal(failed.positive_baseline,true);
 assert.equal(failed.hostile_total,30);
 assert.equal(failed.hostile_rejected,29);
 assert.deepEqual(failed.hostile_escaped,['rewrite old 151 source record']);
 assert.equal(failed.qualified,false);
 assert.equal(audit.source_predecessor.blob_sha,sha(p.old));
 assert.equal(audit.source.version,'arXiv:2104.05099v2');
 assert.equal(audit.source.PDF_printed_internal_date,'October 18, 2021');
 assert.deepEqual(audit.source.html_source_interval,[79,230]);
 assert.equal(audit.source.pdf_printed_page_4_dimension_exception_checked,true);
 assert.equal(audit.source.pdf_other_page_8_GR_negative_spot_checked,true);
 assert.equal(audit.source.all_48_pdf_pages_rechecked_in_this_round,false);
 assert.equal(audit.source.Oct03_exact_source_download_bytes_hash_verified,false);
 assert.equal(audit.partitions.length,34);
 let pos=79,load=0,owners=new Set();
 for(const a of audit.partitions){
   assert.equal(a.html_lines[0],pos,'source coverage gap');
   assert.ok(a.html_lines[1]>=pos);
   pos=a.html_lines[1]+1;
   if(a.kind!=='HEADING'){
      load++;assert.ok(a.ssc_owners.length>0,'unowned source meaning');
      for(const id of a.ssc_owners){assert.ok(sourceOwners.includes(id),'out-of-source W SSC handle');owners.add(id);}
   }else assert.equal(a.ssc_owners.length,0,'heading falsely treated as semantic occurrence');
 }
 assert.equal(pos,231);assert.equal(load,29);
 assert.deepEqual([...owners].sort(),sourceOwners.slice().sort());
 assert.deepEqual(audit.partitions[2].html_lines,[89,96]);
 assert.deepEqual(audit.partitions[2].ssc_owners,['W-SSC-027']);
 assert.match(audit.partitions[2].source_first_disposition,/dimension-four exceptional/);
 assert.equal(audit.counters.disjoint_intervals,34);
 assert.equal(audit.counters.load_bearing_intervals,29);
 assert.equal(audit.counters.distinct_existing_W_SSC_owners,10);
 assert.equal(audit.counters.source_html_lines,152);
 assert.equal(audit.counters.confirmed_missing_load_bearing_original_meanings,1);
 assert.equal(audit.exit.G0_frozen,false);
 assert.equal(audit.exit.global_W01_original_source_reverse_exhaustive,false);
 assert.equal(audit.exit.all_nine_source_reverse_exhaustive,false);
 assert.equal(defect.historical_W027.blob_sha,sha(p.old));
 assert.equal(defect.original.html_line,96);
 assert.equal(defect.original.printed_pdf_page,4);
 assert.equal(defect.repair_type,'G0_SOURCE_SEMANTIC_CONSERVATION_NOT_MATHEMATICAL_THEOREM_REPAIR');
 assert.equal(old.items.length,151);assert.equal(now.items.length,151);
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
 let n1=0,n2=0,W01=0,changed=0;
 for(let i=0;i<151;i++){
   const a=old.items[i],b=now.items[i];
   assert.equal(a.id,b.id);
   assert.equal(reg.rows[i].census_id,b.id);
   assert.equal(cov.rows[i].census_id,b.id);
   assert.equal(reg.rows[i].source_body_exact,b.obligation);
   assert.equal(reg.rows[i].source_expression_statement_count,(b.source_expression_census?.statements||[]).length);
   assert.equal(cov.rows[i].source_expression_statement_count,(b.source_expression_census?.statements||[]).length);
   assert.equal(cov.rows[i].body_length_chars,b.obligation.length);
   assert.equal(reg.rows[i].historical_86_member,oldreg.rows[i].historical_86_member);
   assert.equal(reg.rows[i].historical_ledger_0_19_mode,oldreg.rows[i].historical_ledger_0_19_mode);
   assert.equal(reg.rows[i].historical_closure_accepted_as_current,false);
   if(b.id==='W-SSC-027')changed++;
   else{
     assert.deepEqual(b,a,'untouched W SSC object changed');
     assert.deepEqual(reg.rows[i],oldreg.rows[i],'untouched source membership row changed');
     assert.deepEqual(cov.rows[i],oldcov.rows[i],'untouched source review row changed');
   }
   n1+=(a.source_expression_census?.statements||[]).length;
   n2+=(b.source_expression_census?.statements||[]).length;
   if(b.source.startsWith('W01'))W01+=(b.source_expression_census?.statements||[]).length;
 }
 assert.equal(changed,1);assert.equal(n1,473);assert.equal(n2,474);assert.equal(W01,187);
 const W=now.items.find(x=>x.id==='W-SSC-027'),prev=old.items.find(x=>x.id==='W-SSC-027');
 assert.equal(prev.source_expression_census.statements.length,3);
 assert.equal(W.source_expression_census.statements.length,4);
 const s=W.source_expression_census.statements[3];
 assert.equal(s.id,'W01-027-D4-04');
 assert.deepEqual(s.original_html_lines,[96,96]);
 assert.equal(s.original_pdf_printed_page,4);
 assert.equal(s.source_first_location,'W01-S23-003');
 assert.equal(s.kind,'SOURCE_AUTHOR_FOUR_DIMENSIONAL_ROTATION_FACTORIZATION_UNIQUENESS_CLAUSE');
 assert.equal(s.modality,'AUTHOR_REPORTED_DIMENSION_RESTRICTED_MOTIVATION_NOT_INDEPENDENT_THEOREM');
 assert.match(s.source_statement,/only in this dimension/);
 assert.match(W.obligation,/not an independently established classification theorem/);
 assert.equal(now.cross_author_semantics_available,false);
 assert.equal(reg.source_census.git_blob_sha,sha(p.now));
 assert.equal(inv.source_census.git_blob_sha,sha(p.now));
 assert.equal(gate.current_source_census.git_blob_sha,sha(p.now));
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,sha(p.reg));
 assert.equal(gate.current_source_coverage.git_blob_sha,sha(p.cov));
 assert.equal(gate.current_W_nine_source_inventory_025.git_blob_sha,sha(p.inv));
 assert.equal(gate.current_W01_s2_s3_source_first.original_source_oracle.git_blob_sha,sha(p.audit));
 assert.equal(gate.current_W01_s2_s3_source_first.source_predecessor_defect.git_blob_sha,sha(p.defect));
 assert.equal(gate.supersedes.git_blob_sha,sha(p.oldgate));
 assert.deepEqual(gate.current_historical_86_member_projection,oldgate.current_historical_86_member_projection);
 assert.equal(gate.current_source_census.W01_typed,187);
 assert.equal(inv.summary.structured_incidences,474);
 assert.equal(inv.units.find(x=>x.unit==='W01').structured_incidences,187);
 assert.equal(inv.units.find(x=>x.unit==='W01').all_original_source_assertions_reverse_qualified,false);
 assert.equal(reg.counts.source_expression_total,474);
 assert.equal(cov.counts.total_structured_source_incidents,474);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate.current_lawful_state[key],false,'premature stage '+key);
 return {source_W:'W01',original_html_lines:152,intervals:34,load_bearing:29,SSC_owners:10,added_source_fidelity_incidents:1,other150_conserved:true,source_total:151,typed_total:474,G0:'OPEN'};
}
const pos=check(d),tests=[
 ['original interval deleted',x=>x.audit.partitions.pop()],
 ['source interval overlap',x=>x.audit.partitions[2].html_lines[0]--],
 ['source interval gap',x=>x.audit.partitions[5].html_lines[0]++],
 ['source dimensional scope owner missing',x=>x.audit.partitions[2].ssc_owners=[]],
 ['source dimensional scope owner wrong',x=>x.audit.partitions[2].ssc_owners=['W-SSC-028']],
 ['source from other track',x=>x.audit.partitions[2].ssc_owners=['L-SSC-001']],
 ['false source denominator',x=>x.audit.counters.disjoint_intervals=35],
 ['wrong original paper version',x=>x.audit.source.version='LATEST'],
 ['claim all 48 pages rechecked',x=>x.audit.source.all_48_pdf_pages_rechecked_in_this_round=true],
 ['invent original Oct03 bytes',x=>x.audit.source.Oct03_exact_source_download_bytes_hash_verified=true],
 ['erase PDF page4 source anchor',x=>x.audit.source.pdf_printed_page_4_dimension_exception_checked=false],
 ['wrong source defect location',x=>x.defect.original.html_line=97],
 ['invent unconditional SO4 equality',x=>x.now.items.find(y=>y.id==='W-SSC-027').source_expression_census.statements[3].modality='GLOBAL_GROUP_THEOREM'],
 ['delete exact author scope',x=>x.now.items.find(y=>y.id==='W-SSC-027').source_expression_census.statements[3].source_statement='Dimension four special'],
 ['erase source dimension predicate',x=>x.now.items.find(y=>y.id==='W-SSC-027').source_expression_census.statements.pop()],
 ['alter untouched source item',x=>x.now.items.find(y=>y.id==='W-SSC-026').obligation+='fake'],
 ['erase source row review',x=>x.cov.rows.pop()],
 ['alter other150 coverage',x=>x.cov.rows.find(y=>y.census_id==='W-SSC-112').body_length_chars++],
 ['alter old86 source membership',x=>x.reg.rows.find(y=>y.census_id==='W-SSC-027').historical_86_member=!x.reg.rows.find(y=>y.census_id==='W-SSC-027').historical_86_member],
 ['alter new source gate digest',x=>x.gate.current_source_census.git_blob_sha='WRONG'],
 ['alter new source register digest',x=>x.gate.current_all_151_conservation_register.git_blob_sha='WRONG'],
 ['alter new source original digest',x=>x.gate.current_W01_s2_s3_source_first.original_source_oracle.git_blob_sha='WRONG'],
 ['false all W01 reverse complete',x=>x.audit.exit.global_W01_original_source_reverse_exhaustive=true],
 ['false G0 frozen',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['false G0 completed',x=>x.gate.current_lawful_state.G0_complete=true],
 ['G1 prematurely authorized',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['G7 prematurely authorized',x=>x.gate.current_lawful_state.G7_authorized=true],
 ['IA prematurely authorized',x=>x.gate.current_lawful_state.recursive_IA_authorized=true],
 ['W L synthesis imported',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['rewrite old 151 source record',x=>x.old.items.find(y=>y.id==='W-SSC-027').obligation+='FAKE'],
 ['rewrite untouched historical source record',x=>x.old.items.find(y=>y.id==='W-SSC-026').obligation+='FAKE'],
 ['rewrite historical failure status',x=>x.failed.qualified=true]
];
let rejected=0;for(const [name,fn] of tests){let q=structuredClone(d);fn(q);try{check(q);}catch(e){rejected++;continue;}throw Error('HOSTILE ESCAPED '+name);}
assert.equal(rejected,tests.length);
console.log('W01 §2–3 original source first G0 PASS '+JSON.stringify(pos));
console.log('Adversarial source/SSC conservation '+rejected+'/'+tests.length+' rejected; original all W01 and nine-W source reverse, Oct03 mutable source bytes remain OPEN.');
