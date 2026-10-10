#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const path='experiments/062/W05_G0_VERSIONED_FULL_SOURCE_FIRST_PDF_HTML_0_2.json',censusPath='research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_57.json';
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const doc=load(path),ssc=load(censusPath);
function verify(x,y){
assert.equal(x.schema,'isograph.exp062-w05-original-source-first-complete-html-pdf-reverse.v0.2');
assert.equal(x.predecessor.path,'experiments/062/W05_G0_VERSIONED_FULL_SOURCE_FIRST_PDF_HTML_0_1.json');
assert.equal(x.predecessor.git_blob_sha,sha(x.predecessor.path));
assert.equal(x.predecessor_failed_CI.run_id,38028674592);
assert.equal(x.predecessor_failed_CI.result,'failure');
assert.equal(x.predecessor_failed_CI.historical_result_not_reclassified,true);
assert.equal(x.adjudication.index_repair.kind,'MISSING_EVIDENCE_POINTER_NOT_NEW_RESEARCH');
assert.equal(x.adjudication.index_repair.new_typed_occurrences,0);
assert.equal(x.track,'W');assert.equal(x.semantic_authority,false);
assert.equal(x.original.source_revision,'arXiv:2202.02657v2');assert.equal(x.original.arxiv_revision_date,'2022-02-08');
assert.equal(x.original.printed_pdf_document_date,'February 9, 2022');
assert.equal(x.original.October03_original_download_bytes_digest,'UNVERIFIED');
assert.deepEqual(x.original.original_html_author_interval,[33,410]);
assert.deepEqual(x.original.pdf_pages_visually_inspected,Array.from({length:16},(_,i)=>i+1));
assert.equal(x.original.HTML_scientific_diagram_omissions,3);
assert.deepEqual(x.excluded_from_original_author_interval.html_lines,[411,425]);
assert.equal(x.source_census.path,censusPath);assert.equal(x.source_census.git_blob_sha,sha(censusPath));
assert.equal(y.schema,'woit.source-semantic-census.v0.57');
assert.equal(y.items.length,151);
const w05=y.items.filter(t=>t.source.startsWith('W05'));
assert.equal(w05.length,17);
assert.equal(w05.reduce((n,z)=>n+(z.source_expression_census?.statements||[]).length,0),106);
assert.equal(y.items.reduce((n,z)=>n+(z.source_expression_census?.statements||[]).length,0),473);
assert.equal(x.source_census.W05_typed_incidents,106);
assert.equal(x.source_census.W05_original_existing_items,17);
assert.equal(x.audit_counts.semantic_source_items_added,0);
assert.equal(x.audit_counts.existing_source_items_changed,0);
const intervals=x.original_source_location_dispositions;
assert.equal(x.audit_counts.disjoint_semantic_coverage_locations,intervals.length);
let cursor=33;const seen=new Set;
for(const loc of intervals){assert.equal(loc.html_lines[0],cursor,'missing/overlap original location');
assert.ok(loc.html_lines[1]>=cursor);
cursor=loc.html_lines[1]+1;assert.ok(!seen.has(loc.key));seen.add(loc.key);
if(!['HEADING','HEADING_AND_ROLE','BIBLIOGRAPHY_SOURCE_ONLY','PROVENANCE'].includes(loc.kind))assert.ok(loc.ssc_owners.length>0,'missing source-to-SSC disposition '+loc.key);
for(const id of loc.ssc_owners)assert.ok(w05.some(z=>z.id===id),'invalid source owner '+id);
}
assert.equal(cursor,411);assert.equal(x.audit_counts.original_author_html_source_lines,378);
assert.deepEqual(intervals.find(y=>y.key==='W05-ORIGINAL-010').ssc_owners,['W-SSC-097']);
assert.equal(x.source_tables[0].kind,'HODGE_TWISTOR_ROW_DISPOSITIONS');
assert.equal(x.source_tables[1].kind,'FINITE_INFINITE_PRIME_EXPLICIT_ANALOGY_NO_CROSS_COLUMN_IDENTITY');
assert.equal(x.adjudication.reported_source_irregularities.length,4);
const refs=intervals.filter(z=>z.kind==='BIBLIOGRAPHY_SOURCE_ONLY');
assert.equal(refs.length,20);
assert.deepEqual(refs.map(z=>z.source_citations[0]),Array.from({length:20},(_,i)=>i+1));
assert.deepEqual(x.original_pdf_diagram_recovery.map(z=>z.kind),['GLOBAL_CP1_PT_HP1_BUNDLE','NONCOMPACT_R4XCP1_PROJECTION','HOLOMORPHIC_BUNDLE_DIRECT_SUM_PROJECTION']);
assert.deepEqual(x.original_pdf_diagram_recovery.map(z=>z.html_rendering),['BLANK_DISPLAY','BLANK_DISPLAY','BLANK_DISPLAY']);
assert.deepEqual(x.original_pdf_diagram_recovery.map(z=>z.pdf_printed_page),[4,5,5]);
assert.deepEqual(x.original_pdf_diagram_recovery.map(z=>z.ssc_ids),[['W-SSC-099','W-SSC-101'],['W-SSC-101'],['W-SSC-101']]);
assert.equal(x.original_pdf_diagram_recovery[2].source_arrows[0],'O(1) DIRECT_SUM O(1) -> CP1 via pi');
assert.ok(x.original_pdf_diagram_recovery.every(z=>z.new_ssc_obligation===false));
assert.equal(x.source_tables.length,2);
assert.deepEqual(x.source_tables.map(z=>z.rows),[4,11]);
assert.deepEqual(x.source_tables.map(z=>z.owner),['W-SSC-103','W-SSC-109']);
assert.deepEqual(x.source_tables.map(z=>z.html_lines),[[206,211],[369,381]]);
assert.equal(x.adjudication.G0,'OPEN_UNFROZEN');
assert.equal(x.adjudication.G1_to_G7_authorized,false);
assert.equal(x.adjudication.unresolved_global.length,3);
assert.equal(x.audit_counts.all_nine_G0_qualified,false);
assert.equal(x.audit_counts.confirmed_unrepresented_W05_semantic_obligations_in_this_pass,0);
const H=y.items.find(z=>z.id==='W-SSC-103').obligation;
assert.match(H,/F\^2=V/);
const A=y.items.find(z=>z.id==='W-SSC-109').obligation;
assert.match(A,/analogy/i);
const Q=y.items.find(z=>z.id==='W-SSC-106').obligation;
assert.match(Q,/p=2,u=7/);
const N=y.items.find(z=>z.id==='W-SSC-110').obligation;
assert.match(N,/no fundamental significance/);
return {source:'W05',intervals:intervals.length,bibliography:20,tables:2,table_rows:15,pdf_hidden_diagrams:3,pdf_pages:16,original_source_items:17,source_typed_incidences:106,G0:'OPEN'};
}
const result=verify(doc,ssc),deep=x=>structuredClone(x);
const cases=[
['remove source interval',x=>x.original_source_location_dispositions.pop()],
['omit paragraph boundary',x=>x.original_source_location_dispositions[7].html_lines[0]++],
['overlap source paragraphs',x=>x.original_source_location_dispositions[10].html_lines[1]++],
['omit bibliography item',x=>x.original_source_location_dispositions.splice(-1)],
['misnumber bibliography',x=>x.original_source_location_dispositions.at(-1).source_citations=[19]],
['hide PDF diagram',x=>x.original_pdf_diagram_recovery.pop()],
['claim source diagram appears HTML',x=>x.original_pdf_diagram_recovery[1].html_rendering='HTML_PRESENT'],
['wrong diagram fiber map',x=>x.original_pdf_diagram_recovery[2].source_arrows[0]='O(1) -> CP1'],
['invent diagram as new SSC obligation',x=>x.original_pdf_diagram_recovery[0].new_ssc_obligation=true],
['falsify PDF page provenance',x=>x.original.pdf_pages_visually_inspected.pop()],
['invent historical Oct03 bytes',x=>x.original.October03_original_download_bytes_digest='SHA256_ASSUMED'],
['erase pure real Hodge row',x=>x.source_tables[0].rows=3],
['erase Fargues table comparison row',x=>x.source_tables[1].rows=10],
['switch 11-row table from analogy',x=>x.source_tables[1].kind='CROSS_DOMAIN_THEOREM'],
['alter source real-structure warning',x=>x.adjudication.reported_source_irregularities=[]],
['falsify no-omission local result',x=>x.audit_counts.confirmed_unrepresented_W05_semantic_obligations_in_this_pass=3],
['promote G0 global source seal',x=>x.audit_counts.all_nine_G0_qualified=true],
['premature G1',x=>x.adjudication.G1_to_G7_authorized=true],
['replace source revision',x=>x.original.source_revision='LATEST'],
['import other-track ID',x=>x.original_source_location_dispositions[2].ssc_owners=['L-SSC-001']],
['unowned real structure source',x=>x.original_source_location_dispositions.find(y=>y.key==='W05-ORIGINAL-010').ssc_owners=[]],
['wrong W05 source owner',x=>x.original_source_location_dispositions.find(y=>y.key==='W05-ORIGINAL-010').ssc_owners=['W-SSC-110']]
];
let rejected=0;for(const [name,mod] of cases){const d=deep(doc);mod(d);try{verify(d,ssc);}catch(e){rejected++;continue;}throw Error('W05 HOSTILE ESCAPED '+name);}
assert.equal(rejected,cases.length);
console.log('W05 original v2 PDF+HTML source-first local reverse PASS '+JSON.stringify(result));
console.log('Hostile controls '+rejected+'/'+cases.length+' rejected. All-nine source G0, six October03 mutable originals, independent external cold review remain OPEN.');
