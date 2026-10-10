#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const root='experiments/062/';
const paths={manifest:root+'W_G0_W02_W05_BIDIRECTIONAL_ORIGINAL_SOURCE_INDEX_0_1.json',w02:root+'W02_G0_VERSIONED_FULL_ORIGINAL_SOURCE_REVERSE_0_1.json',w05:root+'W05_G0_VERSIONED_FULL_SOURCE_FIRST_PDF_HTML_0_2.json',ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_57.json',coverage:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_42.json',gate:root+'W_CURRENT_STAGE_GATE_0_117.json',history:root+'W_G0_FINITE_SOURCE_FIRST_COVERAGE_BASELINE_0_1.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const d={meta:read(paths.manifest),w02:read(paths.w02),w05:read(paths.w05),ssc:read(paths.ssc),review:read(paths.coverage),gate:read(paths.gate),history:read(paths.history)};
const cp=x=>structuredClone(x),nonload=new Set(['PROVENANCE','NON_LOAD_HEADING','HEADING','HEADING_AND_ROLE','BIBLIOGRAPHY_SOURCE_ONLY']);
function project(source,unit){
 const rows=unit==='W02'?source.source_first_locations:source.original_source_location_dispositions;
 return rows.map(z=>({key:z.key,html:z.html_lines,kind:z.kind,owners:unit==='W02'?z.ssc_ids:z.ssc_owners,refs:unit==='W02'?z.citations:(z.source_citations||[])}));
}
function verify(x){
 const {meta:m,w02,w05,ssc,review,gate,history}=x;
 assert.equal(m.schema,'isograph.exp062-w-source-first-bidirectional-index.v0.1');
 assert.equal(m.track,'W');assert.equal(m.semantic_authority,false);
 assert.equal(m.status,'W02_W05_SCOPED_ORIGINAL_SOURCE_CORRESPONDENCE_G0_OPEN_NOT_SEALED');
 assert.deepEqual(m.units.map(z=>z.unit),['W02','W05']);
 for(const [obj,p] of [[m.input.ssc,paths.ssc],[m.input.review,paths.coverage],[m.input.gate,paths.gate],[m.input.historical_finite_anchor,paths.history]]){assert.equal(obj.path,p);assert.equal(obj.blob_sha,sha(p));}
 assert.equal(ssc.schema,'woit.source-semantic-census.v0.57');assert.equal(ssc.items.length,151);
 assert.equal(ssc.items.reduce((n,z)=>n+(z.source_expression_census?.statements||[]).length,0),473);
 assert.equal(new Set(ssc.items.map(z=>z.id)).size,151);
 assert.equal(review.rows.length,151);assert.equal(new Set(review.rows.map(z=>z.census_id)).size,151);
 for(const a of ssc.items)assert.ok(review.rows.some(z=>z.census_id===a.id),'missing SSC review pointer');
 assert.equal(history.counters.frozen_w_units,9);
 const g=gate.current_lawful_state;
 assert.equal(gate.current_source_census.git_blob_sha,sha(paths.ssc));
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(g[key],false,'stage false positive '+key);
 assert.equal(g.G0_open,true);
 const totals={locations:0,load:0,indexed:0,owners:0,bib:0};
 for(const u of m.units){
   const src=u.unit==='W02'?w02:w05,p=u.unit==='W02'?paths.w02:paths.w05;
   assert.equal(u.source_first_ledger.path,p);assert.equal(u.source_first_ledger.blob_sha,sha(p));
   const rows=project(src,u.unit);
   assert.deepEqual(rows,u.crosswalk,'original source↔SSC crosswalk drift '+u.unit);
   assert.equal(new Set(rows.map(z=>z.key)).size,rows.length);
   assert.equal(rows.length,u.counts.all_original_locations);
   assert.deepEqual([rows[0].html[0],rows.at(-1).html[1]],u.original_html_range);
   assert.equal(u.original_source_revision,u.unit==='W02'?'arXiv:2311.00608v2':'arXiv:2202.02657v2');
   const semRows=rows.filter(z=>!nonload.has(z.kind));
   let position=u.original_html_range[0],cited=new Set(),ownerSet=new Set();
   for(const row of rows){
      assert.equal(row.html[0],position,'gap or overlap in original source '+row.key);
      assert.ok(Number.isInteger(row.html[1])&&row.html[1]>=row.html[0]);
      position=row.html[1]+1;
      if(!nonload.has(row.kind)){
         assert.ok(row.owners.length>0,'missing original→SSC source semantic disposition '+row.key);
         for(const id of row.owners){assert.ok(ssc.items.some(z=>z.id===id&&z.source.startsWith(u.unit)),'invalid source-native SSC owner '+id);ownerSet.add(id);}
      }
      if(!row.kind.includes('BIBLIOGRAPHY'))for(const id of row.refs)cited.add(id);
   }
   assert.equal(position,u.original_html_range[1]+1);
   const expectedCites=u.unit==='W02'?19:20;
   assert.deepEqual([...cited].sort((a,b)=>a-b),Array.from({length:expectedCites},(_,i)=>i+1),'unowned original citation');
   assert.deepEqual([...ownerSet].sort(),ssc.items.filter(z=>z.source.startsWith(u.unit)).map(z=>z.id).sort(),'SSC→original inverse coverage missing');
   assert.equal(semRows.length,u.counts.load_bearing_locations);
   assert.equal(semRows.filter(z=>z.owners.length>0).length,u.counts.load_bearing_mapped);
   assert.equal(ownerSet.size,u.counts.distinct_ssc_owners);
   assert.equal(u.counts.bibliography_entries,expectedCites);
   if(u.unit==='W02'){
      assert.equal(rows.length,61);assert.equal(semRows.length,51);assert.equal(ownerSet.size,30);
      assert.equal(src.source.frozen_revision,'arXiv:2311.00608v2');
      assert.equal(src.source.Oct03_original_pdf_bytes_hash_verified,false);
      assert.deepEqual(src.reference_roles.map(z=>z.citation_id),Array.from({length:19},(_,i)=>i+1));
      assert.deepEqual(src.confirmed_predecessor_source_semantic_gaps.map(z=>z.owner),['W-SSC-130','W-SSC-150']);
      const a=ssc.items.find(z=>z.id==='W-SSC-130').source_expression_census.statements.find(z=>z.id==='W02-I-130-04');
      assert.equal(a.source_relation,'INEQUIVALENT_AS_COMPLEX_SL2C_REPRESENTATIONS');
      assert.equal(a.conditional_contrast.relation,'BECOME_EQUIVALENT_UNDER_RESTRICTION_TO_SU2R');
      const b=ssc.items.find(z=>z.id==='W-SSC-150').source_expression_census.statements[0].author_possibility;
      assert.equal(b.epistemic,'PERHAPS');assert.equal(b.solution_claim,false);
   } else {
      assert.equal(rows.length,83);assert.equal(semRows.length,48);assert.equal(ownerSet.size,17);
      assert.equal(src.original.source_revision,'arXiv:2202.02657v2');
      assert.equal(src.original.October03_original_download_bytes_digest,'UNVERIFIED');
      assert.deepEqual(src.original_source_location_dispositions.find(z=>z.key==='W05-ORIGINAL-010').ssc_owners,['W-SSC-097']);
      assert.deepEqual(src.source_tables.map(z=>z.rows),[4,11]);
      assert.equal(src.source_tables[1].kind,'FINITE_INFINITE_PRIME_EXPLICIT_ANALOGY_NO_CROSS_COLUMN_IDENTITY');
      assert.equal(src.original_pdf_diagram_recovery.length,3);
      assert.ok(src.original_pdf_diagram_recovery.every(z=>z.html_rendering==='BLANK_DISPLAY'&&z.new_ssc_obligation===false));
      assert.equal(src.predecessor_failed_CI.run_id,38028674592);
      assert.equal(src.predecessor_failed_CI.result,'failure');
      assert.equal(src.adjudication.index_repair.new_typed_occurrences,0);
      assert.match(ssc.items.find(z=>z.id==='W-SSC-109').obligation,/analogy/i);
   }
   totals.locations+=rows.length;totals.load+=semRows.length;totals.indexed+=semRows.filter(z=>z.owners.length>0).length;totals.owners+=ownerSet.size;totals.bib+=expectedCites;
 }
 assert.deepEqual(totals,{locations:144,load:99,indexed:99,owners:47,bib:39});
 assert.equal(m.summary.frozen_W_source_units,9);
 assert.equal(m.summary.locally_source_first_reconciled_units,2);
 assert.equal(m.summary.remaining_original_source_units,7);
 assert.equal(m.summary.locations,144);
 assert.equal(m.summary.load_bearing_locations,99);
 assert.equal(m.summary.load_bearing_original_to_ssc_indexed,99);
 assert.equal(m.summary.distinct_original_backed_SSC_items,47);
 assert.equal(m.summary.bibliography_identities,39);
 assert.equal(m.summary.all_W_SSC_items,151);
 assert.equal(m.summary.typed_source_incidences,473);
 assert.equal(m.historical.W05_v01_failed_workflow_run,38028674592);
 assert.equal(m.historical.W05_v02_successful_workflow_run,38028978539);
 assert.equal(m.historical.W02_repaired_successful_workflow_run,38028312321);
 assert.equal(m.historical.Oct03_six_mutable_source_bytes,'UNVERIFIED');
 assert.equal(m.qualification_limits.G0_frozen,false);
 assert.equal(m.qualification_limits.G1_to_G7_authorized,false);
 assert.equal(m.qualification_limits.external_independent_global_nine_source_cold_review_qualified,false);
 assert.deepEqual(m.qualification_limits.original_first_source_units_not_complete,['W01','W03','W04a','W04b','W04c','W04d','W04e']);
 return totals;
}
const results=verify(d);
const controls=[
 ['W02 source location deletion',(x)=>x.w02.source_first_locations.pop()],
 ['W05 source location deletion',(x)=>x.w05.original_source_location_dispositions.pop()],
 ['W02 source overlap',(x)=>x.w02.source_first_locations[5].html_lines[0]--],
 ['W05 source gap',(x)=>x.w05.original_source_location_dispositions[9].html_lines[0]++],
 ['W02 missing semantic owner',(x)=>x.w02.source_first_locations[7].ssc_ids=[]],
 ['W05 missing semantic owner',(x)=>x.w05.original_source_location_dispositions[9].ssc_owners=[]],
 ['W02 wrong SSC owner',(x)=>x.w02.source_first_locations[7].ssc_ids=['W-SSC-001']],
 ['W05 wrong real-structure owner',(x)=>x.w05.original_source_location_dispositions[9].ssc_owners=['W-SSC-110']],
 ['W02 citation deletion',(x)=>x.w02.source_first_locations.find(z=>z.citations?.includes(19)&&!z.kind.includes('BIBLIOGRAPHY')).citations=[]],
 ['W05 citation deletion',(x)=>x.w05.original_source_location_dispositions.find(z=>z.source_citations?.includes(20)&&!z.kind.includes('BIBLIOGRAPHY')).source_citations=[]],
 ['original W02 crosswalk change',(x)=>x.meta.units[0].crosswalk[7].owners=['W-SSC-131']],
 ['original W05 crosswalk change',(x)=>x.meta.units[1].crosswalk[9].html=[63,68]],
 ['wrong W02 author claim',(x)=>x.ssc.items.find(z=>z.id==='W-SSC-130').source_expression_census.statements.at(-1).source_relation='EQUIVALENT'],
 ['promoted W02 gravity suggestion',(x)=>x.ssc.items.find(z=>z.id==='W-SSC-150').source_expression_census.statements[0].author_possibility.solution_claim=true],
 ['W05 PDF diagram erased',(x)=>x.w05.original_pdf_diagram_recovery.pop()],
 ['W05 PDF diagram falsely HTML visible',(x)=>x.w05.original_pdf_diagram_recovery[0].html_rendering='RENDERED'],
 ['W05 analogy table promoted',(x)=>x.w05.source_tables[1].kind='CROSS_DOMAIN_THEOREM'],
 ['W05 table row missing',(x)=>x.w05.source_tables[1].rows=10],
 ['W05 historical failed run relabeled',(x)=>x.w05.predecessor_failed_CI.result='success'],
 ['wrong W02 arXiv revision',(x)=>x.w02.source.frozen_revision='LATEST'],
 ['October03 mutable byte identity invented',(x)=>x.meta.historical.Oct03_six_mutable_source_bytes='VERIFIED'],
 ['drop SSC source item',(x)=>x.ssc.items=x.ssc.items.filter(z=>z.id!=='W-SSC-150')],
 ['drop existing SSC review row',(x)=>x.review.rows.pop()],
 ['false W G0 freeze',(x)=>x.gate.current_lawful_state.G0_frozen=true],
 ['false W G0 completion',(x)=>x.gate.current_lawful_state.G0_complete=true],
 ['premature G1',(x)=>x.gate.current_lawful_state.G1_authorized=true],
 ['cross-track bridge',(x)=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['invent global cold success',(x)=>x.meta.qualification_limits.external_independent_global_nine_source_cold_review_qualified=true],
 ['invent fully checked ninth source',(x)=>x.meta.summary.locally_source_first_reconciled_units=9],
 ['falsify load-bearing denominator',(x)=>x.meta.summary.load_bearing_locations=100]
];
let rejected=0;
for(const [label,mutate] of controls){const x=cp(d);mutate(x);try{verify(x);}catch(e){rejected++;continue;}throw Error('HOSTILE ESCAPED '+label);}
assert.equal(rejected,controls.length);
console.log('W original source bidirectional evidence PASS '+JSON.stringify(results));
console.log('Adversarial controls '+rejected+'/'+controls.length+' rejected. G0 remains OPEN; this is scoped source-index conservation, not all-nine original semantic completeness.');
