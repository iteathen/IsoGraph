#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const root='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const paths={
old:w+'SOURCE_SEMANTIC_CENSUS_0_61.json',ssc:w+'SOURCE_SEMANTIC_CENSUS_0_62.json',
audit:root+'W01_G0_APPENDIX_BC_COMPLETE_ORIGINAL_FIRST_0_1.json',
defect:root+'W01_G0_APPENDIX_BC_G0_SEMANTIC_SCOPE_OMISSIONS_0_1.json',
oldReg:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_47.json',reg:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_48.json',
oldCov:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_46.json',cov:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_47.json',
oldInv:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_28.json',inv:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_29.json',
oldGate:root+'W_CURRENT_STAGE_GATE_0_121.json',gate:root+'W_CURRENT_STAGE_GATE_0_122.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=b=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const fileSha=p=>gitSha(fs.readFileSync(p));
const objSha=o=>gitSha(Buffer.from(JSON.stringify(o,null,2)+'\n','utf8'));
const data=Object.fromEntries(Object.entries(paths).map(([k,p])=>[k,read(p)]));
const cp=x=>structuredClone(x);
const changed=['W-SSC-054','W-SSC-055','W-SSC-056'];
const sum=c=>c.items.reduce((n,x)=>n+(x.source_expression_census?.statements?.length||0),0);
function verify(d){
const {old,ssc,audit,defect,oldReg,reg,oldCov,cov,oldInv,inv,oldGate,gate}=d;
assert.equal(old.schema,'woit.source-semantic-census.v0.61');
assert.equal(ssc.schema,'woit.source-semantic-census.v0.62');
for(const key of Object.keys(d))assert.equal(objSha(d[key]),fileSha(paths[key]),'versioned source/authority artifact changed '+key);
assert.equal(ssc.predecessor.git_blob_sha,fileSha(paths.old));
assert.equal(ssc.items.length,151);assert.equal(old.items.length,151);
assert.equal(sum(old),503);assert.equal(sum(ssc),507);
assert.equal(ssc.source_count,9);
assert.equal(ssc.cross_author_semantics_available,false);
assert.deepEqual(ssc.correction.changed_W_ids,changed);
assert.equal(ssc.correction.other148_full_predecessor_source_objects_exact,true);
assert.equal(ssc.correction.G0_frozen,false);
const b=audit;
assert.equal(b.schema,'isograph.exp062-w01-appendix-bc-original-source-first-inverse.v0.1');
assert.equal(b.track,'W');assert.equal(b.semantic_authority,false);
assert.equal(b.source.revision,'arXiv:2104.05099v2');
assert.deepEqual(b.source.original_author_BC_html_span,[763,1155]);
assert.deepEqual(b.source.original_bibliography_html_span,[1156,1232]);
assert.deepEqual(b.source.HTML_duplicate_bibliography_span,[1233,1309]);
assert.deepEqual(b.source.PDF_sample_visual_pages_this_round,[29,37,40,42,43,44]);
assert.equal(b.source.Oct03_download_PDF_bytes_verified,false);
assert.equal(b.counts.original_BC_body_lines,393);
assert.equal(b.original_author_BC_disjoint_intervals.length,47);
const shown=new Set,activeOwners=new Set;let cursor=763,n=0;
for(const loc of b.original_author_BC_disjoint_intervals){
 assert.ok(!shown.has(loc.id),'duplicate location identity');
 shown.add(loc.id);
 assert.equal(loc.html_lines[0],cursor,'source-original hole/overlap');
 assert.ok(Number.isInteger(loc.html_lines[1])&&loc.html_lines[1]>=cursor);
 cursor=loc.html_lines[1]+1;
 if(loc.kind==='NON_LOAD_HEADING'){
   assert.deepEqual(loc.SSC_owners,[]);
 }else{
   n++;
   assert.ok(loc.SSC_owners.length>0,'unowned original semantic position '+loc.id);
   for(const owner of loc.SSC_owners){assert.ok(changed.includes(owner),'source owner is not W01 B/C');activeOwners.add(owner);}
 }
}
assert.equal(cursor,1156);
assert.equal(n,40);
assert.deepEqual([...activeOwners].sort(),changed);
assert.equal(b.counts.BC_disjoint_locations,47);
assert.equal(b.counts.BC_load_bearing_locations,40);
assert.equal(b.counts.existing_BC_source_owner_ids,3);
assert.equal(b.bibliography_source_identifiers.length,76);
for(let n=0;n<76;n++){
 const a=b.bibliography_source_identifiers[n];
 assert.equal(a.source_bibliography_id,n+1);
 assert.equal(a.primary_original_html_line,1157+n);
 assert.equal(a.mirrored_HTML_duplicate_line,1234+n);
 assert.equal(a.PDF_bibliography_original,true);
 assert.equal(a.duplicate_disposition,'ONE_CITATION_IDENTITY_TWO_ARXIV_HTML_RENDERINGS_NOT_TWO_AUTHOR_REFERENCES');
}
assert.equal(b.counts.source_bibliography_identity_count,76);
assert.equal(b.counts.duplicate_HTML_bibliography_rendering_rows,76);
assert.equal(b.counts.confirmed_predecessor_semantic_gaps,4);
assert.equal(defect.failures.length,4);
assert.deepEqual(defect.failures.map(f=>f.owner),['W-SSC-055','W-SSC-054','W-SSC-054','W-SSC-056']);
assert.equal(defect.systematic_causes.length,4);
assert.equal(defect.G0,'OPEN_UNFROZEN');
assert.deepEqual(b.confirmed_missing_original_meanings.map(f=>f.original_html),[[775,776],[836,836],[978,982],[1072,1072]]);
assert.equal(b.G0,'OPEN_UNFROZEN');
assert.equal(b.not_qualified.full_W_nine_original_source_reverse,true);
assert.equal(b.not_qualified.October03_mutable_W03_W04_original_bytes,true);
assert.equal(b.recovery_guards.bib_duplicates_must_not_inflate_corpus,true);
const named=new Map(ssc.items.map(x=>[x.id,x]));
assert.equal(named.size,151);
assert.deepEqual(ssc.items.map(x=>x.id),old.items.map(x=>x.id));
assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
let other=0;
for(let i=0;i<151;i++){
 const o=old.items[i],s=ssc.items[i],R=reg.rows[i],C=cov.rows[i];
 assert.equal(R.census_id,s.id);assert.equal(C.census_id,s.id);
 assert.equal(R.source_body_exact,s.obligation);
 assert.equal(R.source_expression_statement_count,s.source_expression_census?.statements?.length||0);
 assert.equal(C.body_length_chars,s.obligation.length);
 assert.equal(C.source_expression_statement_count,s.source_expression_census?.statements?.length||0);
 assert.equal(R.historical_86_member,oldReg.rows[i].historical_86_member);
 assert.equal(R.historical_ledger_0_19_mode,oldReg.rows[i].historical_ledger_0_19_mode);
 assert.equal(R.historical_closure_accepted_as_current,false);
 if(!changed.includes(s.id)){other++;assert.deepEqual(s,o,'unrelated predecessor source object changed '+s.id);assert.deepEqual(R,oldReg.rows[i]);assert.deepEqual(C,oldCov.rows[i]);}
}
assert.equal(other,148);
assert.equal(named.get('W-SSC-054').source_expression_census.statements.length,26);
assert.equal(named.get('W-SSC-055').source_expression_census.statements.length,12);
assert.equal(named.get('W-SSC-056').source_expression_census.statements.length,18);
const a=named.get('W-SSC-054').source_expression_census.statements;
const z=a.find(x=>x.id==='W01-BC-054-25'),k=a.find(x=>x.id==='W01-BC-054-26');
assert.deepEqual(z.original_html_lines,[836,836]);
assert.equal(z.scope,'ONE_DIMENSIONAL_HARMONIC_OSCILLATOR_SINGLE_PARTICLE_CONSTRUCTION');
assert.deepEqual(k.original_html_lines,[978,982]);
assert.equal(k.source_bibliography_ref,'[24]');
assert.equal(k.reported_first_year_in_author_body,1982);
assert.equal(k.bibliography_publication_year,1983);
assert.equal(k.source_only,true);
const e=named.get('W-SSC-055').source_expression_census.statements.find(x=>x.id==='W01-BC-055-12');
assert.equal(e.author_epistemic,'AUTHOR_HAS_LONG_FOUND_THIS_HARD_TO_BELIEVE');
assert.equal(e.cited_warning_context.length,3);
const t=named.get('W-SSC-056').source_expression_census.statements.find(x=>x.id==='W01-BC-056-18');
assert.deepEqual(t.original_html_lines,[1072,1072]);
assert.equal(t.positive_parameter,'SOME_c_GT_ZERO');
assert.match(t.hyperfunction_coefficients,/LESS_THAN_EXPONENTIAL/);
assert.match(t.analytic_test_coefficients,/EXP/);
assert.equal(ssc.correction.old_total_typed,503);
assert.equal(ssc.correction.new_total_typed,507);
assert.equal(ssc.correction.new_W01_typed,220);
assert.equal(reg.source_census.git_blob_sha,fileSha(paths.ssc));
assert.equal(inv.source_census.git_blob_sha,fileSha(paths.ssc));
assert.equal(gate.current_source_census.git_blob_sha,fileSha(paths.ssc));
assert.equal(gate.current_all_151_conservation_register.git_blob_sha,fileSha(paths.reg));
assert.equal(gate.current_source_coverage.git_blob_sha,fileSha(paths.cov));
assert.equal(gate.current_W_nine_source_inventory_029.git_blob_sha,fileSha(paths.inv));
assert.equal(gate.current_W01_BC_original_first.audit.git_blob_sha,fileSha(paths.audit));
assert.equal(gate.current_W01_BC_original_first.defect.git_blob_sha,fileSha(paths.defect));
assert.equal(gate.supersedes.git_blob_sha,fileSha(paths.oldGate));
assert.deepEqual(gate.current_historical_86_member_projection,oldGate.current_historical_86_member_projection);
assert.equal(inv.summary.structured_incidences,507);
assert.equal(inv.summary.G0_frozen,false);
assert.equal(inv.units.find(x=>x.unit==='W01').structured_incidences,220);
assert.equal(inv.units.find(x=>x.unit==='W01').all_original_source_assertions_reverse_qualified,false);
assert.equal(gate.current_lawful_state.G0_open,true);
for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate.current_lawful_state[key],false);
return {original_locations:47,load_bearing:40,unique_bibliography:76,SSC_items:151,typed:507,W01_typed:220,repaired:4,other_source_items_exact:148,G0:'OPEN'};
}
const snapshot=verify(data);
const tests=[
 ['drop original source interval',x=>x.audit.original_author_BC_disjoint_intervals.pop()],
 ['overlap original text',x=>x.audit.original_author_BC_disjoint_intervals[5].html_lines[0]--],
 ['erase source semantic owner',x=>x.audit.original_author_BC_disjoint_intervals[10].SSC_owners=[]],
 ['wrong native source owner',x=>x.audit.original_author_BC_disjoint_intervals[10].SSC_owners=['W-SSC-051']],
 ['falsify B1 quotient equivalence',x=>x.ssc.items.find(y=>y.id==='W-SSC-054').source_expression_census.statements.find(y=>y.id==='W01-BC-054-25').scope='ALL_THEORIES'],
 ['promote Klein Landau citation to author theorem',x=>x.ssc.items.find(y=>y.id==='W-SSC-054').source_expression_census.statements.find(y=>y.id==='W01-BC-054-26').citation_authority='WOIT_PROOF'],
 ['silently normalize bibliography year',x=>x.ssc.items.find(y=>y.id==='W-SSC-054').source_expression_census.statements.find(y=>y.id==='W01-BC-054-26').bibliography_publication_year=1982],
 ['erase W055 author doubt',x=>x.ssc.items.find(y=>y.id==='W-SSC-055').source_expression_census.statements.at(-1).author_epistemic='PROVEN'],
 ['erase hyperfunction growth restriction',x=>x.ssc.items.find(y=>y.id==='W-SSC-056').source_expression_census.statements.at(-1).positive_parameter='NONE'],
 ['fake 152 distinct citations',x=>x.audit.counts.source_bibliography_identity_count=152],
 ['delete one original bibliography entry',x=>x.audit.bibliography_source_identifiers.pop()],
 ['relabel duplicate HTML as independent source',x=>x.audit.bibliography_source_identifiers[4].duplicate_disposition='NEW_SOURCE'],
 ['misaddress bibliography mirror',x=>x.audit.bibliography_source_identifiers[23].mirrored_HTML_duplicate_line=1158],
 ['rewrite frozen arxiv revision',x=>x.audit.source.revision='LATEST'],
 ['claim entire PDF rechecked now',x=>x.audit.source.PDF_sample_visual_pages_this_round=[1,2,3]],
 ['invent original Oct03 bytes',x=>x.audit.source.Oct03_download_PDF_bytes_verified=true],
 ['lose source year scope guard',x=>x.audit.source_consistency_guards.pop()],
 ['remove defect class',x=>x.defect.systematic_causes.pop()],
 ['retroactively alter prior W054',x=>x.old.items.find(y=>y.id==='W-SSC-054').obligation+='fake'],
 ['alter unaffected W027',x=>x.ssc.items.find(y=>y.id==='W-SSC-027').obligation+='fake'],
 ['drop one census item',x=>x.ssc.items.pop()],
 ['drop 151 coverage row',x=>x.cov.rows.pop()],
 ['alter unaffected review row',x=>x.cov.rows.find(y=>y.census_id==='W-SSC-055').ordinal=999],
 ['alter W86 membership',x=>x.reg.rows.find(y=>y.census_id==='W-SSC-055').historical_86_member=!x.reg.rows.find(y=>y.census_id==='W-SSC-055').historical_86_member],
 ['wrong new SSC SHA',x=>x.gate.current_source_census.git_blob_sha='fake'],
 ['wrong new coverage SHA',x=>x.gate.current_source_coverage.git_blob_sha='fake'],
 ['wrong original source oracle SHA',x=>x.gate.current_W01_BC_original_first.audit.git_blob_sha='fake'],
 ['fake full source closure',x=>x.gate.current_lawful_state.G0_complete=true],
 ['fake G0 freeze',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['invent Oct03 mutable source provenance',x=>x.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['premature G1',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['premature G7',x=>x.gate.current_lawful_state.G7_authorized=true],
 ['import L track',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['false all-nine reverse',x=>x.audit.not_qualified.full_W_nine_original_source_reverse=false],
 ['falsify current source incidence count',x=>x.inv.summary.structured_incidences=508]
];
let rejects=0;
for(const [name,modify] of tests){
 const x=cp(data),before=JSON.stringify(x);modify(x);
 assert.notEqual(JSON.stringify(x),before,'INERT ADVERSE CONTROL '+name);
 try{verify(x);}catch(e){rejects++;continue;}throw Error('HOSTILE ESCAPED '+name);
}
assert.equal(rejects,tests.length);
console.log('W01 B/C original source G0 conservation PASS '+JSON.stringify(snapshot));
console.log('Hostile controls '+rejects+'/'+tests.length+' rejected. Whole-source/global W G0 and historical mutable source bytes remain OPEN.');
