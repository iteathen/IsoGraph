#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const p={audit:'experiments/062/W01_G0_MAIN_S4_S6_FULL_ORIGINAL_FIRST_0_1.json',
ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_61.json',
gate:'experiments/062/W_CURRENT_STAGE_GATE_0_121.json',
prev:'experiments/062/W_G0_CUMULATIVE_ORIGINAL_FIRST_SOURCE_CONVERGENCE_0_1.json'};
const load=x=>JSON.parse(fs.readFileSync(x,'utf8'));
const shaBuffer=b=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const hash=x=>shaBuffer(fs.readFileSync(x));
const canonicalSha=x=>shaBuffer(Buffer.from(JSON.stringify(x,null,2)+'\n','utf8'));
const data={audit:load(p.audit),ssc:load(p.ssc),gate:load(p.gate),prev:load(p.prev)},deep=x=>structuredClone(x);
const heading=new Set(['HEADING']);
const expectedRef={
 'W01-S46-011':[41],
 'W01-S46-027':[14],
 'W01-S46-029':[29,12,38,9,13,1],
 'W01-S46-033':[26,20],
 'W01-S46-036':[33],
 'W01-S46-037':[40,37,23]
};
const mandatoryOwnerIds=['W-SSC-004','W-SSC-005','W-SSC-007','W-SSC-028','W-SSC-033','W-SSC-034','W-SSC-035','W-SSC-036','W-SSC-037','W-SSC-038','W-SSC-039','W-SSC-040','W-SSC-041','W-SSC-042','W-SSC-043','W-SSC-044','W-SSC-045','W-SSC-046','W-SSC-113','W-SSC-114','W-SSC-115','W-SSC-116','W-SSC-117'];
function verify(v){
 const {audit:a,ssc:s,gate:g,prev:m}=v;
 assert.equal(a.schema,'isograph.exp062-w01-original-s4-s6-full-main-source-first.v0.1');
 assert.equal(a.track,'W');assert.equal(a.semantic_authority,false);
 assert.equal(a.source.frozen_revision,'arXiv:2104.05099v2');
 assert.deepEqual(a.source.original_author_html_interval,[231,385]);
 assert.deepEqual(a.source.printed_pdf_pages_in_scope,[9,10,11,12,13,14,15,16]);
 assert.equal(a.source.all_original_PDF_pages_reexamined_now,false);
 assert.equal(a.source.Oct03_original_download_bytes_verified,false);
 assert.equal(s.schema,'woit.source-semantic-census.v0.61');assert.equal(s.items.length,151);
 assert.equal(s.items.reduce((n,x)=>n+(x.source_expression_census?.statements?.length||0),0),503);
 assert.equal(a.source_census.git_blob_sha,hash(p.ssc));
 assert.equal(a.source_census.unchanged,true);
 assert.equal(m.totals.current_all_W_SSC_items,151);
 assert.equal(m.G0_boundary.G0_frozen,false);
 assert.equal(g.current_source_census.git_blob_sha,hash(p.ssc));
 assert.equal(g.current_lawful_state.G0_open,true);
 for(const key of ['G0_complete','G0_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G7_authorized','cross_track_synthesis_authorized'])assert.equal(g.current_lawful_state[key],false,'illegal promotion '+key);
 assert.equal(a.original_locations.length,44);
 let cursor=231,loadBearing=0,headingCount=0;const ids=new Set,owners=new Set,seenCitations=new Set();
 for(const z of a.original_locations){
  assert.equal(z.original_html[0],cursor,'original source interval gap or overlap '+z.id);
  assert.ok(Number.isInteger(z.original_html[1])&&z.original_html[1]>=cursor);
  cursor=z.original_html[1]+1;
  assert.ok(!ids.has(z.id),'duplicate source locator');
  ids.add(z.id);
  assert.ok(z.source_fidelity_disposition.length>=20,'opaque/truncated source meaning '+z.id);
  if(heading.has(z.kind)){headingCount++;assert.deepEqual(z.ssc_source_owners,[]);}
  else{
    loadBearing++;assert.ok(z.ssc_source_owners.length>0,'unmapped load-bearing source '+z.id);
    for(const id of z.ssc_source_owners){const sscItem=s.items.find(x=>x.id===id);assert.ok(sscItem?.source.startsWith('W01'),'wrong original W source owner '+z.id+' '+id);owners.add(id);}
  }
  const should=expectedRef[z.id]||[];
  assert.deepEqual(z.native_bibliographic_citations||[],should,'source citation location mismatch '+z.id);
  for(const id of z.native_bibliographic_citations||[])seenCitations.add(id);
 }
 assert.equal(cursor,386);assert.equal(loadBearing,38);assert.equal(headingCount,6);
 assert.deepEqual([...owners].sort(),mandatoryOwnerIds.slice().sort());
 assert.equal(a.counts.source_html_lines,155);assert.equal(a.counts.disjoint_locations,44);
 assert.equal(a.counts.load_bearing_locations,38);
 assert.equal(a.counts.load_bearing_mapped,38);
 assert.equal(a.counts.unique_current_W_SSC_owner_handles,23);
 assert.equal(seenCitations.size,14);
 assert.equal(a.counts.distinct_native_citation_ids,14);
 assert.deepEqual(a.source_citation_index.map(z=>z.interval),Object.keys(expectedRef));
 assert.equal(a.source_citation_index.reduce((n,x)=>n+x.ids.length,0),14);
 assert.equal(a.source_figures_missing_HTML.length,3);
 assert.deepEqual(a.source_figures_missing_HTML.map(z=>z.html_line),[249,326,330]);
 assert.deepEqual(a.source_figures_missing_HTML.map(z=>z.SSC),['W-SSC-033','W-SSC-040','W-SSC-040']);
 for(const figure of a.source_figures_missing_HTML){
   const x=a.original_locations.find(z=>z.original_html[0]<=figure.html_line&&figure.html_line<=z.original_html[1]);
   assert.ok(x?.kind.startsWith('PDF_ONLY_'),'missing PDF source figure disposition');
   assert.ok(x.ssc_source_owners.includes(figure.SSC));
 }
 assert.equal(a.preserved_author_modal_boundaries.length,5);
 assert.deepEqual(a.preserved_author_modal_boundaries.map(z=>z.status),[
 'SOURCE_LITERAL_TENSOR_NOT_REPAIRED_DIRECT_SUM',
 'THREE_DIRECT_SUM_FOLLOWED_BY_TWO_PLUS_AS_PRINTED',
 'FULL_PT_INTERACTING_DYNAMICS_NOT_DEFINED',
 'THREE_GENERATIONS_OPEN_SOURCE_QUESTION',
 'SOURCE_MIGHT_HAVE_OBSERVABLE_CHIRAL_GRAVITY_NOT_ACTUAL_PREDICTION'
 ]);
 const w37=s.items.find(z=>z.id==='W-SSC-037');
 assert.equal(w37.source_expression_census.statements.find(z=>z.id==='W01-037-REP-01').first_operator,'TENSOR_SOURCE_LITERAL');
 assert.deepEqual(w37.source_expression_census.statements.find(z=>z.id==='W01-037-REP-02').join_operators,['DIRECT_SUM','DIRECT_SUM','DIRECT_SUM','PLUS','PLUS']);
 const w40=s.items.find(z=>z.id==='W-SSC-040');
 assert.equal(w40.source_expression_census.statements.find(z=>z.id==='W01-S43-040-05').diagrams.length,2);
 const w44=s.items.find(z=>z.id==='W-SSC-044');
 assert.equal(w44.source_expression_census.statements[0].epistemic,'AUTHOR_EXPLICIT_UNSOLVED_PROBLEM');
 const w117=s.items.find(z=>z.id==='W-SSC-117');
 assert.equal(w117.source_expression_census.statements[8].quantifier_scope,'MIGHT_AND_POSSIBLY_NOT_ALREADY_ACCOMPLISHED');
 assert.equal(a.counts.current_SSC_source_items,151);assert.equal(a.counts.current_source_typed_incidences,503);
 assert.equal(a.counts.SSC_source_records_changed,0);
 assert.equal(a.counts.confirmed_new_source_omissions,0);
 assert.equal(a.conclusion.entire_original_W01_exhaustive,false);
 assert.equal(a.conclusion.G0_open,true);
 assert.equal(a.conclusion.G0_frozen,false);
 assert.equal(a.conclusion.G1_to_G7_authorized,false);
 assert.equal(a.conclusion.October03_mutable_six_source_byte_gaps_remain,true);
 // Exact-blob conservation is checked after independently scoped semantic assertions:
 // no omitted or overwritten original-first row, no unexplained source SSC mutation.
 assert.equal(canonicalSha(a),hash(p.audit),'source-first original ledger bytes changed');
 assert.equal(canonicalSha(s),hash(p.ssc),'source SSC 0.61 body changed');
 return {source:'W01 §§4–6',locations:44,load_bearing:38,original_backed_ssc_owners:23,native_citation_roles:14,PDF_only_diagrams:3,new_omissions:0,G0:'OPEN'};
}
const valid=verify(data);
const attacks=[
['drop source paragraph',x=>x.audit.original_locations.pop()],
['source gap',x=>x.audit.original_locations[4].original_html[0]++],
['source overlap',x=>x.audit.original_locations[6].original_html[0]--],
['drop load-bearing mapping',x=>x.audit.original_locations[3].ssc_source_owners=[]],
['wrong source owner',x=>x.audit.original_locations[3].ssc_source_owners=['W-SSC-130']],
['fabricate same-author other source W05 owner',x=>x.audit.original_locations[4].ssc_source_owners=['W-SSC-099']],
['fragment same source location',x=>x.audit.original_locations[3].original_html[1]++],
['drop PDF original diagram',x=>x.audit.source_figures_missing_HTML.pop()],
['assign figure to wrong SSC claim',x=>x.audit.source_figures_missing_HTML[1].SSC='W-SSC-033'],
['drop a citation role',x=>x.audit.original_locations[26].native_bibliographic_citations=[]],
['reclassify author modal negative',x=>x.audit.preserved_author_modal_boundaries[3].status='G3_CLOSED'],
['silently repair source tensor',x=>x.ssc.items.find(z=>z.id==='W-SSC-037').source_expression_census.statements.find(z=>z.id==='W01-037-REP-01').first_operator='DIRECT_SUM'],
['change plus to direct sum',x=>x.ssc.items.find(z=>z.id==='W-SSC-037').source_expression_census.statements.find(z=>z.id==='W01-037-REP-02').join_operators[3]='DIRECT_SUM'],
['remove PDF fibration source from SSC',x=>x.ssc.items.find(z=>z.id==='W-SSC-040').source_expression_census.statements.find(z=>z.id==='W01-S43-040-05').diagrams.pop()],
['promote author three-generations open',x=>x.ssc.items.find(z=>z.id==='W-SSC-044').source_expression_census.statements[0].epistemic='PROVEN'],
['promote speculative physics prediction',x=>x.ssc.items.find(z=>z.id==='W-SSC-117').source_expression_census.statements[8].quantifier_scope='ALREADY_VERIFIED'],
['invent historic oct03 raw evidence',x=>x.audit.source.Oct03_original_download_bytes_verified=true],
['falsify arxiv source edition',x=>x.audit.source.frozen_revision='latest'],
['change G0 stage source ref',x=>x.gate.current_source_census.git_blob_sha='WRONG'],
['change frozen SSC',x=>x.ssc.items[0].obligation+='fake'],
['false G0 closure',x=>x.gate.current_lawful_state.G0_complete=true],
['false complete W01 audit',x=>x.audit.conclusion.entire_original_W01_exhaustive=true],
['premature G1',x=>x.gate.current_lawful_state.G1_authorized=true],
['cross-track synthesis',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true]
];
let rejected=0;
for(const [label,fn] of attacks){
 const candidate=deep(data);fn(candidate);
 assert.notDeepEqual(candidate,data,'NO_OP_HOSTILE_FIXTURE '+label);
 try{verify(candidate);}catch(e){rejected++;continue;}
 throw Error('HOSTILE ESCAPED '+label);
}
assert.equal(rejected,attacks.length);
console.log('W01 original-first §§4–6 source/SSC conservation PASS '+JSON.stringify(valid));
console.log('Hostile tests '+rejected+'/'+attacks.length+' rejected; full nine W frozen originals and mutable October03 historical pages remain G0 OPEN.');
