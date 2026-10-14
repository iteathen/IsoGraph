#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),crypto=require('node:crypto');
const root='experiments/062/';
const path=root+'W05_G0_INDEPENDENT_16PAGE_SOURCE_FIRST_PDF_AUDIT_0_1.json';
const sourcePath='research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_69.json';
const oldPath=root+'W05_G0_VERSIONED_FULL_SOURCE_FIRST_PDF_HTML_0_2.json';
const gatePath=root+'W_CURRENT_STAGE_GATE_0_130.json';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=p=>{const r=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+r.length+'\0'),r])).digest('hex')};
const pins={
 source:'54b0ae071f6ba8a3a2c622f9a87d48540a90468d',
 original:'3af2512add89a58678c61b0dfd289ba192a304ed',
 gate:'b0179f1e104fb25cb3d721ad1c1150ffb8a59f0e',
 freeze:'5775af1ab9289f97d903b39d5eb8eda241bafe78'
};
for(const [k,p] of [['source',sourcePath],['original',oldPath],['gate',gatePath],['freeze','research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md']])
 assert.equal(gitBlob(p),pins[k],'original G0 source/authority tuple changed: '+k);
const fixture={cold:read(path),ssc:read(sourcePath),original:read(oldPath),gate:read(gatePath)};
const clone=x=>JSON.parse(JSON.stringify(x));
const fixed=[
 ['W05-SF-001',1,'W-SSC-024','W05-024-01'],
 ['W05-SF-002',1,'W-SSC-023','W05-023-02'],
 ['W05-SF-003',2,'W-SSC-097','W097-S01'],
 ['W05-SF-004',2,'W-SSC-097','W097-S03'],
 ['W05-SF-005',3,'W-SSC-098','W05-098-03'],
 ['W05-SF-006',4,'W-SSC-099','W05-099-02'],
 ['W05-SF-007',4,'W-SSC-099','W05-099-03'],
 ['W05-SF-008',4,'W-SSC-100','W05-100-04'],
 ['W05-SF-009',5,'W-SSC-101','W05-101-07'],
 ['W05-SF-010',5,'W-SSC-101','W05-101-02'],
 ['W05-SF-011',6,'W-SSC-102','W05-102-02'],
 ['W05-SF-012',6,'W-SSC-103','W05-103-05'],
 ['W05-SF-013',7,'W-SSC-103','W05-103-15'],
 ['W05-SF-014',8,'W-SSC-104','W05-104-01'],
 ['W05-SF-015',8,'W-SSC-104','W05-104-02'],
 ['W05-SF-016',9,'W-SSC-105','W05-105-03'],
 ['W05-SF-017',9,'W-SSC-105','W05-105-05'],
 ['W05-SF-018',10,'W-SSC-106','W05-106-04'],
 ['W05-SF-019',11,'W-SSC-107','W05-107-04'],
 ['W05-SF-020',11,'W-SSC-107','W05-107-08'],
 ['W05-SF-021',12,'W-SSC-108','W05-108-03'],
 ['W05-SF-022',13,'W-SSC-108','W05-108-04'],
 ['W05-SF-023',13,'W-SSC-109','W05-109-05'],
 ['W05-SF-024',14,'W-SSC-109','W109-T10-FINITE'],
 ['W05-SF-025',14,'W-SSC-109','W109-T10-INFINITE'],
 ['W05-SF-026',14,'W-SSC-110','W05-110-06'],
 ['W05-SF-027',14,'W-SSC-111','W05-111-01']
];
const pageKinds=Array(14).fill('SOURCE').concat(['BIBLIOGRAPHY_ONLY','BIBLIOGRAPHY_ONLY']);
pageKinds[3]='SOURCE_WITH_PDF_ONLY_DIAGRAM';
pageKinds[4]='SOURCE_WITH_TWO_PDF_ONLY_DIAGRAMS';
pageKinds[6]='SOURCE_WITH_FOUR_ROW_TABLE';
pageKinds[13]='SOURCE_WITH_ELEVEN_ROW_ANALOGY_TABLE';
const expectedW05=['W-SSC-023','W-SSC-024',...Array.from({length:15},(_,i)=>'W-SSC-'+String(97+i).padStart(3,'0'))].sort();
function audit(d){
 const {cold,ssc,original,gate}=d;
 assert.equal(cold.schema,'isograph.exp062-W05-independent-16page-original-pdf-sourcefirst.v0.1');
 assert.equal(cold.track,'W');
 assert.equal(cold.semantic_authority,false);
 assert.equal(cold.original.arxiv_version,'arXiv:2202.02657v2');
 assert.equal(cold.original.pdf,'https://arxiv.org/pdf/2202.02657v2');
 assert.equal(cold.original.pdf_pages,16);
 assert.equal(cold.original.original_PDF_printed_date,'2022-02-09');
 assert.equal(cold.original.arxiv_revision_dated,'2022-02-08');
 assert.equal(cold.original.original_pdf_oct03_download_byte_hash,'UNVERIFIED');
 assert.equal(cold.original.original_rev_marker_pinned_not_oct03_bytes,true);
 assert.deepEqual(cold.original.original_pdf_page_indexes_visually_examined,Array.from({length:16},(_,i)=>i));
 assert.deepEqual(cold.original.source_HTML_main_lines,[33,410]);
 assert.equal(cold.original.source_HTML_line_hints_NOT_exact_page_boundaries,true);
 assert.equal(cold.pages.length,16);
 assert.deepEqual(cold.pages.map(x=>x.page),Array.from({length:16},(_,i)=>i+1));
 assert.deepEqual(cold.pages.map(x=>x.kind),pageKinds);

 const fixedPageObligationCounts=[4,4,5,5,5,5,5,4,5,6,5,5,5,5,1,1];
 const fixedPageRoleMarkers=[
  'SIGNIFICANCE_OPEN',
  'COORDINATE_SQUARE_MINUS1_PROJECTIVE_SQUARE_PLUS1',
  'NO_TWISTOR_FIXED_POINT_CONTRADICTION_CONTINUED_FROM_PAGE_TWO',
  'PDF_ONLY_CP1_PT_CP3_S4_FIBRATION_DIRECTION',
  'PAULI_POSITIVE_PLUS1_EIGENLINE_NOT_MINUS1',
  'PRINTED_UNUSUAL_FILTRATION_TERMINAL_F2_EQUALS_V',
  'EXACT_FOUR_ROW_HODGE_TWISTOR_TABLE_NOT_ARITHMETIC_ANALOGY_TABLE',
  'SIMPSON_MODULI_H1_SET_NOT_VECTOR_OR_HIGHER_NONABELIAN_COHOMOLOGY',
  'ONLY_P_NE_2_THREE_NAMED_QUADRATIC_EXTENSIONS',
  'P_U_CONIC_SELECTED_NOT_EVERY_NONSQUARE_U',
  'CLIFFORD_COMPLEX_EVEN_SINGLE_ODD_DIRECT_SUM',
  'ALL_FINITE_PRIMES_PLUS_INFINITY_HILBERT_PRODUCT_EQUALS1',
  'SOURCE_WARNING_AUTHOR_UNDERSTANDS_ONLY_ONE_SIDE',
  'ELEVEN_ROW_FINITE_P_VS_INFINITY_ANALOGY_NOT_THEOREM',
  'NATIVE_BIBLIOGRAPHY_IDENTITIES_1_TO16_NOT_INDEPENDENT_MATH_THEOREMS',
  'NATIVE_BIBLIOGRAPHY_IDENTITIES_17_TO20_NOT_INDEPENDENT_MATH_THEOREMS'
 ];
 assert.deepEqual(cold.pages.map(x=>x.source_obligations.length),fixedPageObligationCounts,'loss of substantive original-PDF role within a page');
 for(let i=0;i<16;i++)assert.ok(cold.pages[i].source_obligations.includes(fixedPageRoleMarkers[i]),'original first W05 source page role lost '+(i+1));

 assert.equal(cold.pages.slice(0,14).every(p=>p.owners.length&&p.disposition==='PRESENT_IN_EXISTING_SSC'),true);
 assert.equal(cold.pages.slice(14).every(p=>p.owners.length===0&&p.reference_numbers&&p.disposition==='EXCLUDED_FROM_INDEPENDENT_MATH_ASSERTION_WITH_SOURCE_CITATION_PROVENANCE'),true);
 assert.deepEqual(cold.pages[14].reference_numbers,[1,16]);
 assert.deepEqual(cold.pages[15].reference_numbers,[17,20]);
 assert.equal(cold.native_bibliography.total,20);
 assert.equal(cold.native_bibliography.citation_only_not_20_new_theorems,true);
 assert.equal(cold.source_original_diagrams.length,3);
 assert.deepEqual(cold.source_original_diagrams.map(z=>[z.pdf_page,z.original_HTML_line]),[[4,141],[5,151],[5,156]]);
 assert.deepEqual(cold.tables.map(t=>[t.pdf_page,t.row_count,t.SSC]),[[7,4,'W-SSC-103'],[14,11,'W-SSC-109']]);
 assert.equal(cold.tables[0].is_equivalence_theorem,false);
 assert.equal(cold.tables[1].cross_column_equality_claim,false);
 assert.equal(cold.source_atomic_crosswalk.length,27);
 assert.deepEqual(cold.source_atomic_crosswalk.map(x=>[x.source_key,x.page,x.ssc_id,x.typed_id]),fixed);
 assert.equal(new Set(cold.source_atomic_crosswalk.map(z=>z.source_key)).size,27);
 assert.deepEqual(cold.reverse_crosswalk.original_source_pdf_pages,16);
 assert.equal(cold.reverse_crosswalk.original_main_text_pdf_pages,14);
 assert.equal(cold.reverse_crosswalk.bibliography_pdf_pages,2);
 assert.equal(cold.reverse_crosswalk.known_missing_load_bearing_original_obligations_found_in_this_independent_pass,0);
 assert.equal(cold.reverse_crosswalk.global_all_nine_originals_independently_complete,false);
 // This new original-first denominator is independent of the older 83-row
 // original HTML interval dataset. Cross-check it, never build it from SSC.
 const intervals=original.original_source_location_dispositions;
 assert.equal(intervals.length,83);
 let cursor=33;
 const nonload=new Set(['PROVENANCE','HEADING','HEADING_AND_ROLE','BIBLIOGRAPHY_SOURCE_ONLY']);
 let bib=0,load=0;
 for(const z of intervals){
  assert.equal(z.html_lines[0],cursor,'old original source gap '+z.key);
  cursor=z.html_lines[1]+1;
  const isload=!nonload.has(z.kind);
  if(isload){
   load++;
   assert.ok(z.ssc_owners.length>0,'author original load-bearing source unowned '+z.key);
  }
  if(z.kind==='BIBLIOGRAPHY_SOURCE_ONLY'){bib++;assert.equal(z.ssc_owners.length,0);}
 }
 assert.equal(cursor,411);
 assert.equal(load,48);
 assert.equal(bib,20);
 assert.equal(cold.reverse_crosswalk.original_versioned_HTML_disjoint_intervals_in_prior_ledger,83);
 assert.equal(cold.reverse_crosswalk.prior_semantic_intervals,48);
 assert.equal(cold.reverse_crosswalk.prior_bibliography_only_intervals,20);
 assert.equal(ssc.schema,'woit.source-semantic-census.v0.69');
 assert.equal(ssc.items.length,151);
 assert.equal(ssc.items.reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0),536);
 const w05=ssc.items.filter(z=>z.source.startsWith('W05'));
 assert.equal(w05.length,17);
 assert.deepEqual(w05.map(z=>z.id).sort(),expectedW05);
 assert.equal(w05.reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0),106);
 const pagesOwners=new Set(cold.pages.flatMap(z=>z.owners));
 assert.deepEqual([...pagesOwners].sort(),expectedW05);
 const getItem=id=>w05.find(z=>z.id===id);
 const getTyped=(id,owner)=>getItem(owner)?.source_expression_census?.statements?.find(z=>z.id===id);
 for(const claim of cold.source_atomic_crosswalk){
  assert.ok(cold.pages.find(p=>p.page===claim.page)?.owners.includes(claim.ssc_id),
   'source-first original PDF page does not dispose SSC owner '+claim.source_key);
  const st=getTyped(claim.typed_id,claim.ssc_id);
  assert.ok(st,'original-source author semantic atom missing from current SSC '+claim.source_key);
  assert.equal(typeof claim.role,'string');
  assert.ok(claim.role.length>9);
 }
 // Independent fixed original PDF mathematical and modal oracles. These are
 // authored source-first, not generated from ledger text or SSC field names.
 const typed=(owner,id)=>{const a=getTyped(id,owner);assert.ok(a);return a};
 assert.deepEqual(typed('W-SSC-097','W097-S03').result,['NEGATE(CONJUGATE(z2))','CONJUGATE(z1)']);
 assert.equal(typed('W-SSC-097','W097-S04').source_literal,'rho_tw(z)=-1/bar(z)');
 assert.equal(typed('W-SSC-099','W05-099-02').rhs,'inverse(q2)*q1');
 assert.deepEqual(typed('W-SSC-099','W05-099-03').ordered_output,['z1+z2*j','z3+z4*j']);
 assert.equal(typed('W-SSC-100','W05-100-04').minkowski.target,'PT_DUAL=CP3_DUAL');
 assert.equal(typed('W-SSC-101','W05-101-02').eigenvalue,'+1');
 assert.equal(typed('W-SSC-101','W05-101-02').two_copies,'O(1) directsum O(1)');
 assert.equal(typed('W-SSC-103','W05-103-05').terminal_as_printed,'F^2=V');
 assert.equal(typed('W-SSC-103','W05-103-15').ordered_rows.length,4);
 assert.deepEqual(typed('W-SSC-104','W05-104-02').cases,[{lambda:1,result:'USUAL_CONNECTION'},{lambda:0,result:'HIGGS_BUNDLE'}]);
 assert.equal(typed('W-SSC-105','W05-105-03').condition,'p != 2');
 assert.deepEqual(typed('W-SSC-105','W05-105-03').ordered_extensions,['Qp[sqrt(p)]','Qp[sqrt(u)]','Qp[sqrt(up)]']);
 assert.equal(typed('W-SSC-105','W05-105-05').quantifier_scope,'SOURCE_DOES_NOT_SAY_FOR_ALL_NONSQUARE_UNITS_U');
 assert.equal(typed('W-SSC-106','W05-106-04').required_for_nonpoint_inference,'QUATERNION_CLASS_IS_DIVISION_HILBERT_MINUS1');
 assert.deepEqual(typed('W-SSC-107','W05-107-04').cases,[{binder:'r+s=2n',rhs:'M(2^n,C)'},{binder:'r+s=2n+1',rhs:'M(2^n,C) directsum M(2^n,C)'}]);
 assert.equal(typed('W-SSC-107','W05-107-08').specialization.value,'Z/8Z');
 assert.equal(typed('W-SSC-108','W05-108-03').product,'prod_(finite_primes and infinity) (a,b)_p');
 assert.equal(typed('W-SSC-108','W05-108-04').relation,'SOURCE_STATES_EQUIVALENT_HILBERT_RECIPROCITY');
 assert.equal(typed('W-SSC-109','W109-T10-FINITE').side,'finite_p');
 assert.equal(typed('W-SSC-109','W109-T10-FINITE').rhs.carrier,'FF_p');
 assert.equal(typed('W-SSC-109','W109-T10-INFINITE').side,'infinite_p');
 assert.equal(typed('W-SSC-109','W109-T10-INFINITE').rhs.carrier,'P1_tw');
 assert.equal(typed('W-SSC-109','W05-109-05').epistemic_position,'UNDERSTANDS_ONE_SIDE_ONLY');
 assert.equal(typed('W-SSC-110','W05-110-06').source_certified_choice,'NONE');
 assert.equal(typed('W-SSC-111','W05-111-01').credited_person,'Peter Scholze');
 assert.equal(typed('W-SSC-111','W05-111-01').epistemic_type,'SOURCE_REPORTED_ANALOGY_NOT_MATHEMATICAL_EQUIVALENCE');
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const k of ['G0_frozen','G0_complete','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','global_source_first_cold_audit_qualified'])
 assert.equal(gate.current_lawful_state[k],false,'unauthorized G0 freeze/transition '+k);
 assert.equal(gate.current_source_census.git_blob_sha,pins.source);
 assert.equal(cold.G0_open,true);
 assert.equal(cold.G0_frozen,false);
 assert.equal(cold.G1_authorized,false);
 assert.equal(cold.L_semantics_used,false);
 return {pdf_pages:16,source_pages:14,bibliography_pages:2,independent_atom_witnesses:27,existing_W05_SSC_owners:17,prior_disjoint_html_intervals:83,prior_load:48,pdf_only_diagrams:3,comparison_table_rows:[4,11],known_new_W05_omissions:0,G0:'OPEN'};
}
const result=audit(fixture);
const mutants=[
 ['drop original PDF page',d=>d.cold.pages.pop()],
 ['demote arithmetic original source page',d=>d.cold.pages[8].kind='BIBLIOGRAPHY_ONLY'],
 ['invent mathematical theorem in native references',d=>d.cold.pages[14].owners=['W-SSC-109']],
 ['drop one original native bibliography identity',d=>d.cold.native_bibliography.total=19],
 ['erase PDF-only bundle diagram',d=>d.cold.source_original_diagrams.pop()],
 ['move CP1 bundle diagram to another PDF page',d=>d.cold.source_original_diagrams[0].pdf_page=5],
 ['replace four-row Hodge table with three rows',d=>d.cold.tables[0].row_count=3],
 ['promote arithmetic analogy to source-equivalence theorem',d=>d.cold.tables[1].cross_column_equality_claim=true],
 ['erase original source P1 physical state disclaimer',d=>d.cold.pages[0].source_obligations.pop()],
 ['erase one paper-to-SSC reciprocal original anchor',d=>d.cold.source_atomic_crosswalk.shift()],
 ['fake a foreign author source owner',d=>d.cold.pages[0].owners[0]='L-SSC-001'],
 ['remove CP1 twistor original projective map',d=>d.ssc.items.find(z=>z.id==='W-SSC-097').source_expression_census.statements.find(z=>z.id==='W097-S03').result=['z1','z2']],
 ['reverse HP1 quaternion chart multiplication order',d=>d.ssc.items.find(z=>z.id==='W-SSC-099').source_expression_census.statements.find(z=>z.id==='W05-099-02').rhs='q1*inverse(q2)'],
 ['co-corrupt page-ledger and SSC eigenspace',d=>{
 d.cold.pages[4].source_obligations[3]='PAULI_NEGATIVE_MINUS1_EIGENLINE';
 d.ssc.items.find(z=>z.id==='W-SSC-101').source_expression_census.statements.find(z=>z.id==='W05-101-02').eigenvalue='-1';
 }],
 ['normalize printed Hodge filtration anomaly',d=>d.ssc.items.find(z=>z.id==='W-SSC-103').source_expression_census.statements.find(z=>z.id==='W05-103-05').terminal_as_printed='F^0=V'],
 ['swap lambda Higgs/connection',d=>d.ssc.items.find(z=>z.id==='W-SSC-104').source_expression_census.statements.find(z=>z.id==='W05-104-02').cases.reverse()],
 ['generalize p=2 division selected to all nonsquare units',d=>d.ssc.items.find(z=>z.id==='W-SSC-105').source_expression_census.statements.find(z=>z.id==='W05-105-05').quantifier_scope='ALL_NONSQUARE_UNITS'],
 ['remove conic division antecedent',d=>d.ssc.items.find(z=>z.id==='W-SSC-106').source_expression_census.statements.find(z=>z.id==='W05-106-04').required_for_nonpoint_inference='NO_PREMISE'],
 ['collapse Clifford direct-sum odd case',d=>d.ssc.items.find(z=>z.id==='W-SSC-107').source_expression_census.statements.find(z=>z.id==='W05-107-04').cases.pop()],
 ['drop infinite-place Hilbert reciprocity',d=>d.ssc.items.find(z=>z.id==='W-SSC-108').source_expression_census.statements.find(z=>z.id==='W05-108-03').product='prod_finite_only'],
 ['falsely equate Fargues table across columns',d=>d.ssc.items.find(z=>z.id==='W-SSC-109').source_expression_census.statements.find(z=>z.id==='W109-T10-FINITE').rhs.carrier='P1_tw'],
 ['promote author tentative significance to certified choice',d=>d.ssc.items.find(z=>z.id==='W-SSC-110').source_expression_census.statements.find(z=>z.id==='W05-110-06').source_certified_choice='YES'],
 ['rewrite discovery credit from Scholze',d=>d.ssc.items.find(z=>z.id==='W-SSC-111').source_expression_census.statements.find(z=>z.id==='W05-111-01').credited_person='Woit'],
 ['erase original 83 interval source tail',d=>d.original.original_source_location_dispositions.pop()],
 ['claim all-nine G0 freeze from W05 local pass',d=>d.gate.current_lawful_state.G0_frozen=true],
 ['invent authenticated 2026 Oct3 original PDF bytes',d=>d.cold.original.original_pdf_oct03_download_byte_hash='VERIFIED'],
 ['invent global W/L synthesis authority',d=>d.cold.L_semantics_used=true]
];
let rejected=0;
for(const [name,mutate] of mutants){
 const m=clone(fixture),before=JSON.stringify(m);mutate(m);
 assert.notEqual(JSON.stringify(m),before,'inert original-source hostile '+name);
 try{audit(m)}catch(e){rejected++;continue;}
 throw Error('ADVERSARIAL_ESCAPE '+name);
}
assert.equal(rejected,mutants.length);
console.log('W05 original 16-page independent source-first G0 audit PASS '+JSON.stringify(result));
console.log('Adversarial controls rejected '+rejected+'/'+mutants.length);
console.log('No new W05 source occurrences. Six Oct3 mutable originals and all-nine G0 independent original cold review remain UNQUALIFIED; G0 OPEN.');
