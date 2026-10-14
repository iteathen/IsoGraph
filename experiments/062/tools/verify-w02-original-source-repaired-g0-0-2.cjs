#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const paths={
o:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_56.json',
s:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_57.json',
a:'experiments/062/W02_G0_VERSIONED_FULL_ORIGINAL_SOURCE_REVERSE_0_1.json',
d:'experiments/062/W02_G0_ORIGINAL_REVERSE_CONFIRMED_DEFECTS_0_1.json',
ro:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_42.json',
r:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_43.json',
co:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_41.json',
c:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_42.json',
io:'experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_23.json',
i:'experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_24.json',
go:'experiments/062/W_CURRENT_STAGE_GATE_0_116.json',
g:'experiments/062/W_CURRENT_STAGE_GATE_0_117.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const copy=x=>structuredClone(x),docs=Object.fromEntries(Object.entries(paths).map(([k,v])=>[k,read(v)]));
const targets=['W-SSC-130','W-SSC-150'];
const expectedSpans='27-32|33-35|36-37|38-41|42-46|47-48|49-58|59-62|63-63|64-64|65-67|68-69|70-71|72-75|76-77|78-79|80-81|82-83|84-84|85-86|87-91|92-102|103-105|106-107|108-108|109-109|110-110|111-113|114-114|115-120|121-122|123-123|124-125|126-130|131-131|132-135|136-137|138-138|139-140|141-141|142-143|144-144|145-145|146-146|147-147|148-148|149-149|150-150|151-151|152-152|153-153|154-154|155-155|156-156|157-157|158-158|159-159|160-160|161-161|162-162|163-163';
function verify(x){
const {o,s,a,d,ro,r,co,c,io,i,go,g}=x;
assert.equal(o.schema,'woit.source-semantic-census.v0.56');assert.equal(s.schema,'woit.source-semantic-census.v0.57');
assert.equal(s.predecessor.git_blob_sha,sha(paths.o));
assert.equal(a.predecessor_ssc.git_blob_sha,sha(paths.o));
assert.equal(d.predecessor.git_blob_sha,sha(paths.o));
assert.equal(d.source_first.git_blob_sha,sha(paths.a));
assert.equal(d.immutable_predecessor,true);assert.equal(d.other149_unaffected,true);
assert.deepEqual(d.cases.map(z=>z.owner),targets);
assert.equal(a.source_first_locations.length,61);
assert.equal(a.source_first_locations.map(z=>z.html_lines.join('-')).join('|'),expectedSpans);
assert.equal(new Set(a.source_first_locations.map(z=>z.key)).size,61);
assert.deepEqual(a.display_math_html_lines,[40,44,61,66,73,89,102,117,120,133]);
assert.deepEqual(a.reference_roles.map(z=>z.citation_id),Array.from({length:19},(_,z)=>z+1));
assert.deepEqual(a.reference_roles.map(z=>z.reference_html_line),Array.from({length:19},(_,z)=>z+145));
assert.equal(a.source.pdf_page_count,11);
assert.deepEqual(a.source.pdf_pages_visually_reviewed,[1,2,3,4,5,6,7,8,9,10,11]);
assert.equal(a.source.Oct03_original_pdf_bytes_hash_verified,false);
assert.equal(a.source.html_pdf_date_discrepancy,'OBSERVED_NOT_INTERPRETED_AS_A_NEW_AUTHOR_REVISION');
assert.equal(a.source.pdf_document_date,'December 14, 2023');
assert.equal(a.source.current_html_header_date,'August 24, 2026');
assert.deepEqual(a.confirmed_predecessor_source_semantic_gaps.map(z=>z.owner),targets);
assert.deepEqual(a.confirmed_predecessor_source_semantic_gaps.map(z=>z.original_html_lines),[[59,59],[136,137]]);
assert.equal(o.items.length,151);assert.equal(s.items.length,151);assert.equal(s.census_item_count,151);
assert.equal(r.rows.length,151);assert.equal(c.rows.length,151);assert.equal(i.units.length,9);
assert.equal(r.counts.historical_W_demand_projection,86);
let oldTyped=0,newTyped=0,w02Typed=0,unchanged=0;
for(let j=0;j<151;j++){
 const orig=o.items[j],now=s.items[j],oldRow=ro.rows[j],regRow=r.rows[j],covOld=co.rows[j],covRow=c.rows[j];
 assert.equal(orig.id,now.id);
 assert.equal(regRow.census_id,now.id);assert.equal(covRow.census_id,now.id);
 assert.equal(regRow.source_body_exact,now.obligation);
 assert.equal(regRow.source_expression_statement_count,(now.source_expression_census?.statements||[]).length);
 assert.equal(covRow.body_length_chars,now.obligation.length);
 assert.equal(covRow.source_expression_statement_count,(now.source_expression_census?.statements||[]).length);
 assert.equal(regRow.historical_86_member,oldRow.historical_86_member);
 assert.equal(regRow.historical_ledger_0_19_mode,oldRow.historical_ledger_0_19_mode);
 assert.equal(regRow.historical_closure_accepted_as_current,false);
 if(!targets.includes(now.id)){
  assert.deepEqual(now,orig,'untouched source object altered: '+now.id);
  assert.deepEqual(regRow,oldRow,'untouched source register altered: '+now.id);
  assert.deepEqual(covRow,covOld,'untouched source coverage altered: '+now.id);
  unchanged++;
 }
 oldTyped+=(orig.source_expression_census?.statements||[]).length;
 newTyped+=(now.source_expression_census?.statements||[]).length;
 if(now.source.startsWith('W02'))w02Typed+=(now.source_expression_census?.statements||[]).length;
}
assert.equal(unchanged,149);assert.equal(oldTyped,471);assert.equal(newTyped,473);assert.equal(w02Typed,71);
const one=s.items.find(z=>z.id===targets[0]),two=s.items.find(z=>z.id===targets[1]);
assert.equal(one.source_expression_census.statements.length,4);
const z=one.source_expression_census.statements.at(-1);
assert.equal(z.id,'W02-I-130-04');assert.equal(z.owner,'W-SSC-130');
assert.deepEqual(z.original_html_lines,[59,59]);
assert.equal(z.source_relation,'INEQUIVALENT_AS_COMPLEX_SL2C_REPRESENTATIONS');
assert.equal(z.group,'SL(2,C)');assert.equal(z.conditional_contrast.group,'SU(2)_R');
assert.equal(z.conditional_contrast.relation,'BECOME_EQUIVALENT_UNDER_RESTRICTION_TO_SU2R');
assert.match(one.obligation,/INEQUIVALENT/);
assert.equal(two.source_expression_census.statements.length,1);
const q=two.source_expression_census.statements[0];
assert.equal(q.id,'W02-IV3-150-01');assert.deepEqual(q.original_html_lines,[136,137]);
assert.equal(q.author_problem.epistemic,'KNOWN_PROBLEMS');
assert.equal(q.author_problem.cited_source,'[16]');
assert.equal(q.author_possibility.epistemic,'PERHAPS');
assert.equal(q.author_possibility.solution_claim,false);assert.match(two.obligation,/PERHAPS/);
assert.equal(s.correction.G0_frozen,false);assert.deepEqual(s.correction.changed_W_ids,targets);
assert.equal(s.cross_author_semantics_available,false);
assert.equal(r.source_census.git_blob_sha,sha(paths.s));
assert.equal(i.source_census.git_blob_sha,sha(paths.s));
assert.equal(g.current_source_census.git_blob_sha,sha(paths.s));
assert.equal(g.current_all_151_conservation_register.git_blob_sha,sha(paths.r));
assert.equal(g.current_source_coverage.git_blob_sha,sha(paths.c));
assert.equal(g.current_W_nine_source_inventory_024.git_blob_sha,sha(paths.i));
assert.equal(g.current_W02_original_source_first.audit.git_blob_sha,sha(paths.a));
assert.equal(g.current_W02_original_source_first.defect.git_blob_sha,sha(paths.d));
assert.equal(g.supersedes.git_blob_sha,sha(paths.go));
assert.deepEqual(g.current_historical_86_member_projection,go.current_historical_86_member_projection);
assert.equal(i.summary.structured_incidences,473);assert.equal(i.summary.G0_frozen,false);
assert.equal(i.units.find(z=>z.unit==='W02').structured_incidences,71);
assert.equal(i.units.find(z=>z.unit==='W02').all_original_source_assertions_reverse_qualified,false);
assert.equal(r.counts.W02_typed,71);assert.equal(c.counts.total_structured_source_incidents,473);
const state=g.current_lawful_state;
assert.equal(state.G0_open,true);
for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(state[key],false,'unlawful G0 or later-stage promotion '+key);
return {source_items:151,source_incidences:473,W02:71,unchanged:149,original_intervals:61,displayed_math:10,cited_references:19,original_PDF_pages:11,G0:'OPEN'};
}
const positive=verify(docs);
const adversaries=[
['original source interval deleted',x=>x.a.source_first_locations.pop()],
['original interval overlap',x=>x.a.source_first_locations[9].html_lines[0]--],
['math source display dropped',x=>x.a.display_math_html_lines.pop()],
['source reference dropped',x=>x.a.reference_roles.pop()],
['source citation id wrong',x=>x.a.reference_roles[15].citation_id=15],
['PDF page count reduced',x=>x.a.source.pdf_pages_visually_reviewed.pop()],
['falsify PDF HTML rendering date',x=>x.a.source.html_pdf_date_discrepancy='IDENTICAL'],
['falsify original Oct03 source bytes',x=>x.a.source.Oct03_original_pdf_bytes_hash_verified=true],
['erase original omission',x=>x.a.confirmed_predecessor_source_semantic_gaps.pop()],
['erase defect record',x=>x.d.cases.pop()],
['change untouched source obligation',x=>x.s.items[0].obligation+=' fake'],
['change SL2C carrier scope',x=>x.s.items.find(z=>z.id==='W-SSC-130').source_expression_census.statements.at(-1).group='SU(2)'],
['reverse source inequivalence',x=>x.s.items.find(z=>z.id==='W-SSC-130').source_expression_census.statements.at(-1).source_relation='EQUIVALENT'],
['reverse SU2R equivalence',x=>x.s.items.find(z=>z.id==='W-SSC-130').source_expression_census.statements.at(-1).conditional_contrast.relation='INEQUIVALENT'],
['erase citation of QG source problem',x=>x.s.items.find(z=>z.id==='W-SSC-150').source_expression_census.statements[0].author_problem.cited_source='NONE'],
['invent QG solution',x=>x.s.items.find(z=>z.id==='W-SSC-150').source_expression_census.statements[0].author_possibility.solution_claim=true],
['remove QG tentative modality',x=>x.s.items.find(z=>z.id==='W-SSC-150').source_expression_census.statements[0].author_possibility.epistemic='PROVEN'],
['drop a coverage row',x=>x.c.rows.pop()],
['change unrelated review locator',x=>x.c.rows.find(z=>z.census_id==='W-SSC-012').body_length_chars++],
['change unaffected register source claim',x=>x.r.rows.find(z=>z.census_id==='W-SSC-020').source_body_exact+=' FAKE'],
['change old86 source-membership',x=>x.r.rows.find(z=>z.census_id==='W-SSC-150').historical_86_member=true],
['promote G0 freeze',x=>x.g.current_lawful_state.G0_frozen=true],
['fake all source review',x=>x.i.units.find(z=>z.unit==='W02').all_original_source_assertions_reverse_qualified=true],
['promote G1',x=>x.g.current_lawful_state.G1_authorized=true],
['premature W L bridge',x=>x.g.current_lawful_state.cross_track_synthesis_authorized=true]
];
let rejected=0;for(const [name,fn] of adversaries){const x=copy(docs);fn(x);try{verify(x);}catch(e){rejected++;continue;}throw Error('HOSTILE ESCAPED '+name);}
assert.equal(rejected,adversaries.length);
console.log('W G0 W02 source-fidelity reconciliation PASS '+JSON.stringify(positive));
console.log('W02 hostile controls '+rejected+'/'+adversaries.length+' rejected. G0 original whole-nine reverse, external review, historical mutable source bytes are NOT qualified.');
