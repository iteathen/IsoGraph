#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const src='experiments/062/W02_G0_VERSIONED_FULL_ORIGINAL_SOURCE_REVERSE_0_1.json';
const old='research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_56.json';
const exp='27-32|33-35|36-37|38-41|42-46|47-48|49-58|59-62|63-63|64-64|65-67|68-69|70-71|72-75|76-77|78-79|80-81|82-83|84-84|85-86|87-91|92-102|103-105|106-107|108-108|109-109|110-110|111-113|114-114|115-120|121-122|123-123|124-125|126-130|131-131|132-135|136-137|138-138|139-140|141-141|142-143|144-144|145-145|146-146|147-147|148-148|149-149|150-150|151-151|152-152|153-153|154-154|155-155|156-156|157-157|158-158|159-159|160-160|161-161|162-162|163-163';
const expectedMath=[40,44,61,66,73,89,102,117,120,133];
const clone=x=>structuredClone(x);
function verify(x,c){
assert.equal(x.track,'W');assert.equal(x.semantic_authority,false);
assert.equal(x.source.frozen_revision,'arXiv:2311.00608v2');
assert.equal(x.source.Oct03_original_pdf_bytes_hash_verified,false);
assert.equal(x.source.html_pdf_date_discrepancy,'OBSERVED_NOT_INTERPRETED_AS_A_NEW_AUTHOR_REVISION');
assert.equal(x.source.pdf_document_date,'December 14, 2023');
assert.equal(x.source.current_html_header_date,'August 24, 2026');
assert.deepEqual(x.source.pdf_pages_visually_reviewed,[1,2,3,4,5,6,7,8,9,10,11]);
assert.equal(x.source_first_locations.length,61);
assert.equal(x.source_first_locations.map(y=>y.html_lines.join('-')).join('|'),exp);
assert.equal(new Set(x.source_first_locations.map(y=>y.key)).size,61);
assert.deepEqual(x.display_math_html_lines,expectedMath);
assert.deepEqual(x.reference_roles.map(y=>y.citation_id),Array.from({length:19},(_,i)=>i+1));
assert.deepEqual(x.reference_roles.map(y=>y.reference_html_line),Array.from({length:19},(_,i)=>i+145));
assert.equal(x.source_first_locations.filter(y=>y.kind==='BIBLIOGRAPHY_PROVENANCE_ONLY').length,19);
assert.equal(x.counts.disjoint_source_intervals,61);assert.equal(x.counts.displayed_math,10);assert.equal(x.counts.bibliography_entries,19);
assert.equal(x.counts.original_versioned_W02_body_and_reference_lines_including_headings,137);
assert.equal(x.predecessor_ssc.git_blob_sha,sha(old));
assert.equal(c.schema,'woit.source-semantic-census.v0.56');assert.equal(c.items.length,151);
assert.equal(x.confirmed_predecessor_source_semantic_gaps.length,2);
assert.deepEqual(x.confirmed_predecessor_source_semantic_gaps.map(y=>y.owner),['W-SSC-130','W-SSC-150']);
assert.deepEqual(x.confirmed_predecessor_source_semantic_gaps.map(y=>y.original_html_lines),[[59,59],[136,137]]);
assert.ok(x.confirmed_predecessor_source_semantic_gaps[0].predecessor_absence.includes('inequivalence'));
assert.ok(x.confirmed_predecessor_source_semantic_gaps[1].predecessor_absence.includes('perhaps'));
const w130=c.items.find(y=>y.id==='W-SSC-130'),w150=c.items.find(y=>y.id==='W-SSC-150');
assert.equal(w130.source_expression_census.statements.length,3);
assert.ok(!w130.obligation.includes('INEQUIVALENT'));
assert.equal((w150.source_expression_census?.statements||[]).length,0);
assert.ok(!w150.obligation.includes('PERHAPS'));
for(const y of x.source_first_locations)for(const id of y.ssc_ids)assert.ok(c.items.some(z=>z.id===id),'invented source SSC pointer '+id);
assert.equal(x.acceptance.G0,'OPEN_UNFROZEN');assert.equal(x.acceptance.W02_successor_repair,'PENDING');
assert.equal(x.acceptance.G1_to_G7_authorized,false);
return true;
}
const doc=read(src),ssc=read(old);verify(doc,ssc);
const controls=[
['drop interval',x=>x.source_first_locations.pop()],['bridge source gap',x=>x.source_first_locations[10].html_lines[0]--],
['drop citation',x=>x.reference_roles.pop()],['wrong citation role',x=>x.reference_roles[15].citation_id=17],
['loss of source math display',x=>x.display_math_html_lines.pop()],['wrong PDF page count',x=>x.source.pdf_pages_visually_reviewed.pop()],
['invented original source date equality',x=>x.source.html_pdf_date_discrepancy='SAME_DATE'],['invented October03 source bytes',x=>x.source.Oct03_original_pdf_bytes_hash_verified=true],
['lose group scoped omission',x=>x.confirmed_predecessor_source_semantic_gaps.shift()],['relabel gap as complete',x=>x.acceptance.W02_successor_repair='PASS'],
['G0 falsely closed',x=>x.acceptance.G0='PASS'],['illegal source item',x=>x.source_first_locations[8].ssc_ids=['L-SSC-001']]
];
let caught=0;for(const [name,fn] of controls){const t=clone(doc);fn(t);try{verify(t,ssc)}catch(e){caught++;continue}throw Error('HOSTILE ESCAPED '+name);}
assert.equal(caught,controls.length);console.log('W02 original-source first pre-repair audit PASS: 61 intervals, 10 mathematical displays, 19 citation identities, 11 PDF pages and 2 confirmed original-source SSC omissions. '+caught+'/'+controls.length+' hostile controls rejected; G0 still OPEN.');
