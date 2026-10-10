#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const repo = process.cwd();
const readText = p => fs.readFileSync(path.join(repo,p),'utf8');
const read = p => JSON.parse(readText(p));
const original = read('experiments/062/W_G0_FINITE_SOURCE_FIRST_COVERAGE_BASELINE_0_1.json');
const ssc = read(original.comparison_snapshot.census.path);
const coverage = read(original.comparison_snapshot.coverage.path);
const inventory = read(original.comparison_snapshot.source_unit_inventory.path);
const stage = read(original.comparison_snapshot.stage.path);
const sourceHeads = {
 W01:'Abstract|1|2|2.1|2.2|3|3.1|3.2|4|4.1|4.2|4.3|5|6|A|A.1|A.2|A.3|A.3.1|A.3.2|A.3.3|A.3.4|B|B.1|B.2|B.3|B.4|C|C.1|C.2|References',
 W02:'Abstract|I|II|III|IV|IV.1|IV.2|IV.3|V|References',
 W03:'page',
 W04a:'page',
 W04b:'page',
 W04c:'page',
 W04d:'page|linked_slides',
 W04e:'page|linked_notes',
 W05:'Abstract|1|2|3|4|5|5.1|5.2|5.3|6|6.1|6.2|6.3|7|8|References'
};
const expectedAnchors=Object.entries(sourceHeads).flatMap(([u,heads])=>heads.split('|').map(h=>u+':'+h));
const mutable=['W03','W04a','W04b','W04c','W04d','W04e'];
function fileSha(s) { const b=Buffer.from(s);return crypto.createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex'); }
function verify(meta,census,rev,unitStatus,gate) {
 assert.equal(meta.track,'W');
 assert.equal(meta.status,'BOUNDARY_AND_RECONCILIATION_AUDIT_NOT_G0_QUALIFICATION');
 assert.equal(meta.authority_effect,'NONE_RESEARCH_PROCEDURE_EVIDENCE_ONLY');
 assert.equal(census.source_count,9);
 assert.equal(census.items.length,151);
 assert.equal(rev.rows.length,151);
 assert.equal(unitStatus.units.length,9);
 assert.equal(meta.counters.frozen_w_units,9);
 assert.equal(meta.counters.ssc_items,151);
 assert.equal(meta.counters.existing_ssc_items_direct_reviewed,151);
 assert.equal(meta.counters.existing_ssc_items_with_recoverable_review_locators,151);
 assert.equal(meta.counters.anchors_full_reverse_qualified_here,0);
 assert.equal(meta.counters.independently_qualified_whole_source_reverse_audits,0);
 assert.equal(meta.counters.oct03_mutable_source_units_unverified,6);
 assert.equal(meta.counters.remaining_actual_source_omissions,'UNKNOWN_UNTIL_ORIGINAL_FIRST_REVERSE_AUDIT');
 assert.equal(meta.g0_exit_obligations.freeze_and_transition,'NOT_AUTHORIZED');
 assert.match(meta.g0_exit_obligations.source_to_ssc,/^OPEN_/);
 assert.equal(unitStatus.summary.G0_frozen,false);
 assert.equal(unitStatus.summary.all_nine_original_source_reverse_exhaustive,false);
 assert.equal(meta.comparison_snapshot.census.git_blob_sha,fileSha(readText(meta.comparison_snapshot.census.path)));
 assert.equal(meta.comparison_snapshot.coverage.git_blob_sha,fileSha(readText(meta.comparison_snapshot.coverage.path)));
 assert.equal(meta.comparison_snapshot.source_unit_inventory.git_blob_sha,fileSha(readText(meta.comparison_snapshot.source_unit_inventory.path)));
 assert.equal(meta.comparison_snapshot.stage.git_blob_sha,fileSha(readText(meta.comparison_snapshot.stage.path)));
 assert.match(gate.status,/UNFROZEN/);
 const actualAnchors=meta.source_first_navigation_anchors.map(x=>x.key);
 assert.deepEqual(actualAnchors.slice().sort(),expectedAnchors.slice().sort());
 assert.equal(new Set(actualAnchors).size,expectedAnchors.length);
 for (const h of meta.source_first_navigation_anchors) {
   assert.equal(h.key,h.unit+':'+h.heading);
   assert.ok(h.original_url.startsWith('https://'));
   assert.equal(h.current_reverse_status,'HEADING_OR_PAGE_ANCHOR_ONLY_NOT_FULL_ORIGINAL_SEMANTIC_REVERSE_PASS');
 }
 assert.equal(meta.counters.original_navigation_anchors,expectedAnchors.length);
 assert.deepEqual(Object.keys(meta.by_unit).sort(),Object.keys(sourceHeads).sort());
 for(const unit of mutable) {
   assert.equal(meta.by_unit[unit].source_revision_bytes_verified,false);
   assert.equal(meta.by_unit[unit].reverse_original_exhaustive_qualified,false);
 }
 const rows=new Map(rev.rows.map(x=>[x.census_id,x]));
 assert.equal(rows.size,151);
 const indexed=new Map(meta.ssc_to_review_locator_index.map(x=>[x.census_id,x]));
 assert.equal(indexed.size,151);
 const seen=new Set(), byUnit={}, statementIdOwners=new Map();
 let incidences=0,withoutInRecord=0,locatorCount=0;
 const expectedUnindexed=[];
 for(const x of census.items) {
   assert.ok(!seen.has(x.id),'duplicate census identity');
   seen.add(x.id);
   const row=rows.get(x.id), idx=indexed.get(x.id);
   assert.ok(row&&idx,'lost SSC-to-source index '+x.id);
   assert.equal(idx.source_unit,row.source_unit);
   assert.ok(typeof row.source_locator_this_review==='string'||typeof row.source_locator_this_review==='object');
   assert.ok(row.source_locator_this_review&&JSON.stringify(row.source_locator_this_review).length>2);
   assert.deepEqual(idx.review_locator,row.source_locator_this_review);
   assert.equal(idx.direct_review_kind,row.source_fidelity_this_cycle);
   assert.equal(idx.status,'SSC_TO_SOURCE_REVIEW_LOCATOR_ONLY_NOT_INDEPENDENT_REVERSE_EXHAUSTIVENESS');
   assert.ok(x.source.startsWith(row.source_unit),'mixed source/owner '+x.id);
   assert.ok(sourceHeads[row.source_unit]!==undefined,'non-W unit');
   locatorCount++;
   const arr=x.source_expression_census?.statements||[];
   assert.equal(idx.typed_statement_incidences,arr.length);
   assert.equal(row.source_expression_statement_count,arr.length);
   incidences+=arr.length;
   if (!arr.length){withoutInRecord++;expectedUnindexed.push(x.id);}
   const u=byUnit[row.source_unit]||(byUnit[row.source_unit]={items:0,typed:0});
   u.items++;u.typed+=arr.length;
   for(const statement of arr){
     assert.ok(statement.id,'unidentified typed statement');
     const old=statementIdOwners.get(statement.id);
     if(old) {
       const pair=[old.owner,x.id].sort().join('|');
       assert.equal(pair,'W-SSC-118|W-SSC-146','unexpected alias of source evidence');
       assert.ok(['W02-G0-YM-01','W02-G0-YM-02'].includes(statement.id),'unexpected duplicate statement');
       assert.deepEqual(statement,old.statement,'shared source-evidence payload mismatch');
       assert.equal(x.source_expression_census.duplicate_occurrence_with,old.owner,'missing reciprocal alias A');
       assert.equal(census.items.find(y=>y.id===old.owner).source_expression_census.duplicate_occurrence_with,x.id,'missing reciprocal alias B');
     } else statementIdOwners.set(statement.id,{owner:x.id,statement});
   }
 }
 assert.deepEqual(expectedUnindexed,meta.in_record_statement_index_absent_but_review_locator_present);
 assert.equal(meta.counters.ssc_items_without_in_record_statement_array,withoutInRecord);
 assert.equal(meta.counters.these_items_with_existing_coverage_review_locator,withoutInRecord);
 assert.equal(meta.counters.typed_source_incidences,incidences);
 assert.equal(meta.counters.distinct_typed_statement_ids,statementIdOwners.size);
 assert.equal(meta.counters.explicit_shared_statement_aliases,incidences-statementIdOwners.size);
 assert.equal(meta.counters.explicit_shared_statement_aliases,2);
 for(const recorded of unitStatus.units) {
   const b=byUnit[recorded.unit];
   assert.ok(b,'unit missing');
   assert.equal(b.items,recorded.existing_items,'unit item drift');
   assert.equal(b.typed,recorded.structured_incidences,'unit incidence drift');
   assert.equal(meta.by_unit[recorded.unit].existing_ssc_items,b.items);
   assert.equal(meta.by_unit[recorded.unit].typed_source_incidences,b.typed);
 }
 assert.equal(locatorCount,151);
 const originalTensor=census.items.find(x=>x.id==='W-SSC-037');
 const tensor=originalTensor.source_expression_census.statements.find(x=>x.id==='W01-037-REP-01');
 assert.equal(tensor.first_operator,'TENSOR_SOURCE_LITERAL','silently repaired W01 printed tensor');
 const printedSix=originalTensor.source_expression_census.statements.find(x=>x.id==='W01-037-REP-02');
 assert.deepEqual(printedSix.join_operators,['DIRECT_SUM','DIRECT_SUM','DIRECT_SUM','PLUS','PLUS']);
 const authorOpen=census.items.find(x=>x.id==='W-SSC-151');
 assert.match(authorOpen.obligation,/OPEN question/);
 assert.equal(meta.special_shared_source_evidence[0].disposition,'EXPLICIT_SHARED_SOURCE_OCCURRENCES_NOT_TWO_INDEPENDENT_SOURCE_WITNESSES');
 return {units:9,anchors:expectedAnchors.length,ssc:seen.size,locators:locatorCount,typed_incidences:incidences,distinct_ids:statementIdOwners.size,shared_aliases:2,without_in_record_statements:withoutInRecord,g0:'OPEN'};
}
const snapshot=verify(original,ssc,coverage,inventory,stage);
const cases=[
 ['drop source-first TOC heading',m=>{m.source_first_navigation_anchors=m.source_first_navigation_anchors.filter(x=>x.key!=='W01:4.2');}],
 ['declare G0 frozen',m=>{m.g0_exit_obligations.freeze_and_transition='PASS';}],
 ['declare source-first reverse complete',m=>{m.g0_exit_obligations.source_to_ssc='PASS';}],
 ['claim October 3 mutable byte identity',m=>{m.by_unit.W04e.source_revision_bytes_verified=true;}],
 ['drop an SSC review locator',m=>{m.ssc_to_review_locator_index=m.ssc_to_review_locator_index.filter(x=>x.census_id!=='W-SSC-032');}],
 ['silently change shared statement source meaning',(_m,c)=>{c.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements[0].source_distinctness='altered';}],
 ['erase reviewer source anchor',(_m,_c,v)=>{v.rows.find(x=>x.census_id==='W-SSC-095').source_locator_this_review=null;}],
 ['inject a cross-track unit',m=>{m.source_first_navigation_anchors[0].unit='L01';}],
 ['silently repair printed tensor',(_m,c)=>{c.items.find(x=>x.id==='W-SSC-037').source_expression_census.statements.find(x=>x.id==='W01-037-REP-01').first_operator='DIRECT_SUM';}],
 ['silently repair printed plus operators',(_m,c)=>{c.items.find(x=>x.id==='W-SSC-037').source_expression_census.statements.find(x=>x.id==='W01-037-REP-02').join_operators[3]='DIRECT_SUM';}]
];
let rejected=0;
for(const [name,fn] of cases) {
 const [m,c,v,u,g]=[original,ssc,coverage,inventory,stage].map(x=>structuredClone(x));
 fn(m,c,v,u,g);
 try{verify(m,c,v,u,g);}catch(e){rejected++;continue;}
 throw Error('HOSTILE ESCAPED: '+name);
}
assert.equal(rejected,cases.length);
console.log('W G0 finite source-first source/SSC accounting PASS '+JSON.stringify(snapshot));
console.log('Adversarial controls: '+rejected+'/'+cases.length+' correctly rejected. Whole-source G0 reverse and Oct03 mutable source-byte identity remain OPEN.');
