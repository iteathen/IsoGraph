#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const root='experiments/062/';
const mfPath=root+'W_G0_CUMULATIVE_ORIGINAL_FIRST_SOURCE_CONVERGENCE_0_1.json';
const failedPath=root+'W_G0_CUMULATIVE_ORIGINAL_FIRST_V01_FAILED_CI_0_1.json';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const shaBuffer=b=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const sha=p=>shaBuffer(fs.readFileSync(p));
const canonicalSha=obj=>shaBuffer(Buffer.from(JSON.stringify(obj,null,2)+'\n','utf8'));
const deep=x=>structuredClone(x);
const manifest=read(mfPath);
const names=['W02','W05','W01S23','W01A1','W01A2'];
const artifacts=Object.fromEntries(names.map(n=>[n,read(manifest.audits[n].path)]));
const refer=Object.fromEntries(Object.entries(manifest.references).map(([k,o])=>[k,k==='corpus'?fs.readFileSync(o.path,'utf8'):read(o.path)]));
const failed=read(failedPath);
const originals={manifest,artifacts,refer,failed};
function project(n,doc){
 let rows=null,key=null,span=null,owner=null;
 if(n==='W02'){rows=doc.source_first_locations;key='key';span='html_lines';owner='ssc_ids';}
 if(n==='W05'){rows=doc.original_source_location_dispositions;key='key';span='html_lines';owner='ssc_owners';}
 if(n==='W01S23'){rows=doc.partitions;key='id';span='html_lines';owner='ssc_owners';}
 if(n==='W01A1'){rows=doc.source_locations;key='key';span='source_lines';owner='ssc_owners';}
 if(n==='W01A2'){rows=doc.source_locations;key='id';span='html_span';owner='SSC_owners';}
 assert.ok(rows,'unknown source scope '+n);
 return rows.map(z=>({key:z[key],span:z[span],kind:z.kind,owners:z[owner]}));
}
const nonload=new Set(['PROVENANCE','NON_LOAD_HEADING','HEADING','HEADING_AND_ROLE','BIBLIOGRAPHY_SOURCE_ONLY']);
function verify(d){
 const {manifest:m,artifacts:arts,refer:r,failed:f}=d;
 assert.equal(canonicalSha(f),sha(failedPath),'failed original v0.1 evidence was altered');
 assert.equal(f.run_id,38047071742);
 assert.equal(f.commit,'754704f78bcaf79bc595c7034728dfbb78641dc8');
 assert.equal(f.conclusion,'failure');
 assert.equal(f.old_verifier_git_blob_sha,'e1856e9cc4892ac1da60e89d7f8489af0a14abd4');
 assert.equal(f.positive_baseline_passed,false);
 assert.equal(f.hostile_controls_executed,false);
 assert.equal(f.reclassified_as_pass,false);
 assert.equal(m.schema,'isograph.exp062-w-g0-cumulative-finite-original-first-scope-reconciliation.v0.1');
 assert.equal(m.track,'W');assert.equal(m.semantic_authority,false);
 assert.equal(m.status,'FIVE_SOURCE_FIRST_LOCAL_SCOPES_CONSERVED_150_OF_150_ORIGINAL_LOAD_BEARING_G0_ALL_NINE_OPEN');
 assert.deepEqual(Object.keys(m.audits),names);
 assert.equal(m.totals.frozen_W_source_units,9);
 assert.equal(m.totals.locally_original_first_complete_source_units,2);
 assert.equal(m.totals.partially_original_first_scoped_units,1);
 assert.equal(m.totals.other_mutable_source_units_without_exact_oct03_bytes,6);
 assert.equal(m.totals.current_all_W_SSC_items,151);
 assert.equal(m.totals.current_W_typed_source_incidences,489);
 assert.equal(m.totals.bibliography_W02,19);
 assert.equal(m.totals.bibliography_W05,20);
 assert.equal(m.totals.current_W01_A1_PDF_only_diagrams,2);
 assert.equal(m.totals.current_W05_PDF_only_diagrams,3);
 for(const [k,ref] of Object.entries(m.references)){
   assert.equal(ref.git_blob_sha,sha(ref.path),'evidence file SHA incorrect '+k);
   if(k!=='corpus')assert.equal(canonicalSha(r[k]),sha(ref.path),'evidence payload changed '+k);
 }
 const current=r.census,gate=r.gate,cov=r.review;
 assert.equal(current.schema,'woit.source-semantic-census.v0.60');
 assert.equal(current.items.length,151);
 assert.equal(current.source_count,9);
 assert.equal(current.items.reduce((s,x)=>s+(x.source_expression_census?.statements||[]).length,0),489);
 assert.equal(new Set(current.items.map(x=>x.id)).size,151);
 assert.equal(cov.rows.length,151);
 assert.equal(new Set(cov.rows.map(x=>x.census_id)).size,151);
 const rowById=new Map(cov.rows.map(x=>[x.census_id,x]));
 for(const item of current.items){
   const row=rowById.get(item.id);
   assert.ok(row,'current SSC record has no review locator');
   assert.equal(row.source_expression_statement_count,(item.source_expression_census?.statements||[]).length);
   assert.equal(row.body_length_chars,item.obligation.length);
   assert.ok(row.source_locator_this_review,'source body has no reverse review location '+item.id);
 }
 assert.equal(gate.schema,'isograph.exp062-w-current-stage-gate.v0.120');
 assert.equal(gate.current_source_census.git_blob_sha,sha(m.references.census.path));
 assert.equal(gate.current_source_coverage.git_blob_sha,sha(m.references.review.path));
 const law=gate.current_lawful_state;
 assert.equal(law.G0_open,true);
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized']){
   assert.equal(law[key],false,'unauthorized later-stage claim: '+key);
 }
 const corpus=r.corpus;
 assert.match(corpus,/W01/);assert.match(corpus,/W03/);assert.match(corpus,/W04e/);assert.match(corpus,/W05/);
 const hist=r.history,logs=r.logs;
 assert.equal(hist.GitHub_history_audit.checked_commit_count,16);
 assert.equal(hist.Actions_archive_audit.run_count,16);
 assert.equal(hist.Actions_archive_audit.total_currently_listed,0);
 assert.equal(hist.conclusions.original_mutable_2026_10_03_author_webpage_bytes_recovered,false);
 assert.equal(hist.conclusions.absence_of_snapshots_proved_globally,false);
 assert.equal(logs.summary.run_count,16);
 assert.equal(logs.summary.decoded_log_count,16);
 assert.equal(logs.summary.matching_lines,0);
 assert.equal(logs.summary.original_mutable_oct03_source_byte_identity_verified,false);
 assert.equal(m.historical_recovery.historical_commit_trees_checked,16);
 assert.equal(m.historical_recovery.historical_actions_artifact_lists_checked,16);
 assert.equal(m.historical_recovery.historical_accessible_job_logs_screened,16);
 assert.equal(m.historical_recovery.Oct03_W03_W04_retrieval_bytes_verified,false);
 assert.equal(m.historical_recovery.exact_original_bytes_not_recovered,true);
 assert.equal(m.historical_recovery.no_global_absence_claim,true);
 const historyByScope={W02:r.historical57,W05:r.historical57,W01S23:r.historical58,W01A1:r.historical59,W01A2:r.census};
 let total=0,load=0,indexed=0,ownerUnion=new Set();
 const sourceStats={};
 for(const name of names){
   const bound=m.audits[name],a=arts[name];
   assert.equal(bound.git_blob_sha,sha(bound.path),'source-ledger SHA drift '+name);
   assert.equal(canonicalSha(a),sha(bound.path),'source ledger changed '+name);
   assert.equal(a.track,'W');
   assert.equal(a.semantic_authority,false);
   const rows=project(name,a);
   assert.equal(rows.length,bound.total);
   assert.equal(rows[0].span[0],bound.first);
   assert.equal(rows.at(-1).span[1],bound.last);
   assert.equal(bound.source_unit,name.startsWith('W01')?'W01':name);
   assert.equal(bound.source_revision,name==='W02'?'arXiv:2311.00608v2':name==='W05'?'arXiv:2202.02657v2':'arXiv:2104.05099v2');
   let cursor=bound.first,localLoad=0,localIndexed=0;
   const localOwners=new Set(),seen=new Set();
   for(const row of rows){
     assert.ok(!seen.has(row.key),'duplicate source-first location identity '+row.key);
     seen.add(row.key);
     assert.deepEqual(row.span.length,2);
     assert.equal(row.span[0],cursor,'original source first coverage gap '+name+'/'+row.key);
     assert.ok(Number.isInteger(row.span[1])&&row.span[1]>=row.span[0]);
     cursor=row.span[1]+1;
     const kind=row.kind;
     if(!nonload.has(kind)){
       localLoad++;
       assert.ok(Array.isArray(row.owners)&&row.owners.length>0,'load-bearing original position lacks SSC disposition '+name+'/'+row.key);
       localIndexed++;
       for(const owner of row.owners){
         const item=current.items.find(x=>x.id===owner);
         assert.ok(item,'fabricated SSC owner '+owner);
         assert.ok(item.source.startsWith(bound.source_unit),'other-track / cross-unit source contamination '+owner);
         const precursor=historyByScope[name].items.find(x=>x.id===owner);
         assert.ok(precursor,'original-first ownership missing in exact audit authority tuple '+name+'/'+owner);
         assert.deepEqual(item,precursor,'unreviewed future source-record change to original scope '+name+'/'+owner);
         localOwners.add(owner);
         ownerUnion.add(owner);
       }
     }
   }
   assert.equal(cursor,bound.last+1);
   assert.equal(localLoad,bound.load);
   assert.equal(localIndexed,bound.indexed);
   assert.deepEqual([...localOwners].sort(),bound.owners);
   assert.equal(localOwners.size,bound.owners.length);
   total+=rows.length;load+=localLoad;indexed+=localIndexed;
   sourceStats[name]={locations:rows.length,load:localLoad,owners:localOwners.size};
 }
 assert.deepEqual(sourceStats,{
   W02:{locations:61,load:51,owners:30},
   W05:{locations:83,load:48,owners:17},
   W01S23:{locations:34,load:29,owners:10},
   W01A1:{locations:15,load:14,owners:3},
   W01A2:{locations:9,load:8,owners:1}
 });
 assert.equal(total,202);assert.equal(load,150);assert.equal(indexed,150);
 assert.equal(ownerUnion.size,61);
 assert.equal(m.totals.original_first_scoped_intervals,total);
 assert.equal(m.totals.load_bearing_scoped_intervals,load);
 assert.equal(m.totals.load_bearing_mapped_scoped_intervals,indexed);
 assert.equal(m.totals.distinct_current_W_SSC_items_with_original_location,ownerUnion.size);
 const w02=arts.W02,w05=arts.W05,w01s=arts.W01S23,w01a1=arts.W01A1,w01a2=arts.W01A2;
 assert.equal(w02.source.Oct03_original_pdf_bytes_hash_verified,false);
 assert.deepEqual(w02.reference_roles.map(x=>x.citation_id),Array.from({length:19},(_,i)=>i+1));
 assert.deepEqual(w02.confirmed_predecessor_source_semantic_gaps.map(x=>x.owner),['W-SSC-130','W-SSC-150']);
 assert.equal(w05.original.October03_original_download_bytes_digest,'UNVERIFIED');
 assert.equal(w05.original_pdf_diagram_recovery.length,3);
 assert.deepEqual(w05.source_tables.map(x=>x.rows),[4,11]);
 assert.equal(w05.source_tables[1].kind,'FINITE_INFINITE_PRIME_EXPLICIT_ANALOGY_NO_CROSS_COLUMN_IDENTITY');
 assert.deepEqual(w05.original_source_location_dispositions.find(x=>x.key==='W05-ORIGINAL-010').ssc_owners,['W-SSC-097']);
 assert.equal(w05.predecessor_failed_CI.result,'failure');
 assert.equal(w05.predecessor_failed_CI.run_id,38028674592);
 assert.equal(w01s.source.Oct03_exact_source_download_bytes_hash_verified,false);
 assert.equal(w01s.exit.global_W01_original_source_reverse_exhaustive,false);
 assert.deepEqual(w01a1.source.html_diagram_gaps,[479,484]);
 assert.equal(w01a1.counters.source_pdf_diagrams_recovered,2);
 assert.equal(w01a1.source_local_outcome.G0_frozen,false);
 assert.equal(w01a2.source.Oct03_original_pdf_bytes_digest,'NOT_ESTABLISHED');
 assert.deepEqual(w01a2.source_operators.uncoupled,{helicity:'k/2',source_cohomology:'H¹(Uhat,O(-k-2))'});
 assert.deepEqual(w01a2.source_operators.gauge_coupled,{helicity:'k',source_cohomology:'H¹(Uhat,O(E)(-k-2))'});
 assert.equal(w01a2.source_operators.not_independently_equated,true);
 const W050=current.items.find(x=>x.id==='W-SSC-050');
 assert.equal(W050.source_expression_census.statements.length,7);
 const w130=current.items.find(x=>x.id==='W-SSC-130').source_expression_census.statements.find(x=>x.id==='W02-I-130-04');
 assert.equal(w130.source_relation,'INEQUIVALENT_AS_COMPLEX_SL2C_REPRESENTATIONS');
 assert.equal(w130.conditional_contrast.relation,'BECOME_EQUIVALENT_UNDER_RESTRICTION_TO_SU2R');
 const w150=current.items.find(x=>x.id==='W-SSC-150').source_expression_census.statements[0];
 assert.equal(w150.author_possibility.epistemic,'PERHAPS');
 assert.equal(w150.author_possibility.solution_claim,false);
 assert.equal(m.conservation.W02_W05_items_exact_from_SSC_0_57,true);
 assert.equal(m.conservation.W01_S2_S3_owners_exact_from_SSC_0_58,true);
 assert.equal(m.conservation.W01_A1_owners_exact_from_SSC_0_59,true);
 assert.equal(m.conservation.W01_A2_current_source_W050_has_7_typed_incidents,true);
 assert.equal(m.conservation.full_original_correspondence_independent_external_cold_certified,false);
 assert.equal(m.G0_boundary.G0_open,true);
 assert.equal(m.G0_boundary.G0_frozen,false);
 assert.equal(m.G0_boundary.all_nine_original_source_reverse_complete,false);
 assert.deepEqual(m.G0_boundary.remaining_to_original_first_certify,['W01 remaining original-source intervals','W03 original Oct03 retrieval','W04a–W04e original Oct03 retrieval']);
 assert.equal(m.G0_boundary.source_provenance_requires_new_evidence_or_lawful_SCOPE_REVISION,true);
 return {scopes:5,source_locations:total,load_bearing:indexed,unique_SSC_owners:ownerUnion.size,all_W_sources:9,global_G0:'OPEN'};
}
const positive=verify(originals);
const mutants=[
 ['drop W02 source location',t=>t.artifacts.W02.source_first_locations.pop()],
 ['shift W05 original source boundary',t=>t.artifacts.W05.original_source_location_dispositions[9].html_lines[0]++],
 ['erase W01 S23 source owner',t=>t.artifacts.W01S23.partitions[3].ssc_owners=[]],
 ['erase W01 A1 source owner',t=>t.artifacts.W01A1.source_locations[9].ssc_owners=[]],
 ['erase W01 A2 source owner',t=>t.artifacts.W01A2.source_locations[7].SSC_owners=[]],
 ['cross-unit incorrect W05 owner',t=>t.artifacts.W05.original_source_location_dispositions[9].ssc_owners=['W-SSC-050']],
 ['wrong manifest owner roster',t=>t.manifest.audits.W02.owners.pop()],
 ['invent load count',t=>t.manifest.totals.load_bearing_scoped_intervals=151],
 ['invent unique source identities',t=>t.manifest.totals.distinct_current_W_SSC_items_with_original_location=150],
 ['false all nine certified',t=>t.manifest.G0_boundary.all_nine_original_source_reverse_complete=true],
 ['false scope closure count',t=>t.manifest.totals.locally_original_first_complete_source_units=9],
 ['falsify Oct03 byte provenance',t=>t.manifest.historical_recovery.Oct03_W03_W04_retrieval_bytes_verified=true],
 ['pretend 16 source logs nonzero',t=>t.refer.logs.summary.matching_lines=1],
 ['falsify historical Git trees',t=>t.refer.history.GitHub_history_audit.checked_commit_count=20],
 ['cross track source item',t=>t.refer.census.items.find(x=>x.id==='W-SSC-050').source='L01'],
 ['change current SSC source',t=>t.refer.census.items.find(x=>x.id==='W-SSC-050').obligation+='FAKE'],
 ['change W02 original math',t=>t.artifacts.W02.source_first_locations[7].source_semantics='WRONG'],
 ['change W05 PDF diagram evidence',t=>t.artifacts.W05.original_pdf_diagram_recovery.pop()],
 ['change W05 source analogy to theorem',t=>t.artifacts.W05.source_tables[1].kind='THEOREM'],
 ['change W01 source Hodge print',t=>t.refer.census.items.find(x=>x.id==='W-SSC-103').obligation+='NEW'],
 ['normalize W01 A2 helicity',t=>t.artifacts.W01A2.source_operators.gauge_coupled.helicity='k/2'],
 ['delete W01 A2 source Ward semantics',t=>t.refer.census.items.find(x=>x.id==='W-SSC-050').source_expression_census.statements.pop()],
 ['remove source review locator',t=>t.refer.review.rows.find(x=>x.census_id==='W-SSC-050').source_locator_this_review=null],
 ['rewrite historical 0.57 source',t=>t.refer.historical57.items.find(x=>x.id==='W-SSC-130').obligation+='FAKE'],
 ['rewrite historical 0.58 source',t=>t.refer.historical58.items.find(x=>x.id==='W-SSC-027').obligation+='FAKE'],
 ['rewrite historical 0.59 source',t=>t.refer.historical59.items.find(x=>x.id==='W-SSC-048').obligation+='FAKE'],
 ['false current stage G0 complete',t=>t.refer.gate.current_lawful_state.G0_complete=true],
 ['false current stage G0 frozen',t=>t.refer.gate.current_lawful_state.G0_frozen=true],
 ['enter G1 illegally',t=>t.refer.gate.current_lawful_state.G1_authorized=true],
 ['enter W/L synthesis illegally',t=>t.refer.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['falsify current source corpus',t=>t.refer.corpus='REPLACED'],
 ['wrong W02 source original revision',t=>t.manifest.audits.W02.source_revision='arXiv:2311.00608v9'],
 ['erase source convergence warning',t=>t.manifest.conservation.full_original_correspondence_independent_external_cold_certified=true],
 ['alter historical failure result',t=>t.failed.conclusion='success'],
 ['falsify original positive status',t=>t.failed.positive_baseline_passed=true],
 ['rewrite old verifier blob',t=>t.failed.old_verifier_git_blob_sha='FAKE']
];
let rejected=0;
for(const [name,mutate] of mutants){const t=deep(originals);mutate(t);try{verify(t);}catch(e){rejected++;continue;}throw Error('HOSTILE ESCAPED '+name);}
assert.equal(rejected,mutants.length);
console.log('W cumulative original-source G0 accounting PASS '+JSON.stringify(positive));
console.log('Adversarial original→SSC/authority/provenance controls rejected '+rejected+'/'+mutants.length+'. G0 original full nine-source certification and historical mutable source bytes remain OPEN.');
