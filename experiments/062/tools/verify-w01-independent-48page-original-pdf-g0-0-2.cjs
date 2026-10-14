#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const root='experiments/062/';
const names={
 pdf:root+'W01_G0_INDEPENDENT_48PAGE_SOURCE_FIRST_PDF_AUDIT_0_1.json',
 ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_69.json',
 old:root+'W01_G0_FULL_ORIGINAL_SOURCE_BIDIRECTIONAL_0_1.json',
 gate:root+'W_CURRENT_STAGE_GATE_0_130.json',
 freeze:'research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md'
};
const known={
 ssc:'54b0ae071f6ba8a3a2c622f9a87d48540a90468d',
 old:'67a8b002a799b60a3c3dd5178fa4fcac584ffd0e',
 gate:'b0179f1e104fb25cb3d721ad1c1150ffb8a59f0e',
 freeze:'5775af1ab9289f97d903b39d5eb8eda241bafe78'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=p=>{let raw=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+raw.length+'\0'),raw])).digest('hex');};
for(const k of ['ssc','old','gate','freeze'])assert.equal(gitBlob(names[k]),known[k],'stale frozen original audit input '+k);
const state={pdf:read(names.pdf),ssc:read(names.ssc),old:read(names.old),gate:read(names.gate)};
const clone=x=>JSON.parse(JSON.stringify(x));
const officialOwnerIds=['001','002','003','004','005','006','007',...Array.from({length:31},(_,i)=>String(26+i).padStart(3,'0')),...Array.from({length:6},(_,i)=>String(112+i).padStart(3,'0'))].map(n=>'W-SSC-'+n).sort();
const pageOwnerNumbers=[
 '001 002 003 004 005 046','001 002 003 004 007 027 040 054 113','004 005 026 027 028','026 027 028',
 '002 003 028','002 003 029','029 030 031','031 032 112','004 032 033','033 034 113','034 035 036 037',
 '005 006 037 038 039 040','040 041 042 043','043 044 045 046 114 115','046 116 117','046 047 117',
 '047 048','048 049','048 049 050','050 051','051','007 051 052','051 052 053','053','053','033 053',
 '050 051 053','051 054 055','054 055','054','054','054','054','054','054','054',
 '054 055','055','054 055','054 055 056','056','056','056','056','','','',''
];
const originalDiagrams=[
 [10,'CP1_TWISTOR_PT_CP3_FIBERS_HP1_S4'],
 [13,'PT0_NULL_FIBRATION_S3_IN_S4'],
 [13,'PT_PLUS_MINUS_S4_HEMISPHERE_FIBRATION'],
 [18,'P_S_GLOBAL_MU_TO_PT_NU_TO_M'],
 [19,'Z_S_LOCAL_MU_TO_S_ZS_NU_TO_Z'],
 [25,'A6_CP1_PT_CP3_S4_PSEUDOREAL_EUCLIDEAN_FIBRATION'],
 [34,'FREE_SCALAR_T_AXIS_TWO_BRANCH_CUT_SKETCH']
];
// These exact source anchors were audited against all 48 original PDF-page role records
// before publication. Historical v0.1 CI failed on two equivalent word-order anchors.
const originalPageTopics=[
 'Spin4 right-gravity','Minkowski Wightman vs Euclidean Schwinger','Euclidean Pauli 2x2','double cover Spin4',
 'Hom(S_R,S_L)','Palatini epsilon wedge','torsion-free','Ashtekar cited canonical','Higgs one-form invariance',
 'CP1→PT CP3','spinor exterior carriers','original tensor (not sum)','PT0/PT±','three generations','geometric Langlands',
 'Plücker anti-tensor','duplicated z01','fractional local','alpha plane','Ward ASD','Spin33 SL4R','Hermitian Phi','open/closed orbit',
 'sigma antilinear square−1','A.5 literal','SO4/U2 CP1','SU4 compact','Borel–Weil–Bott','Euclidean commuting','oscillator Schwinger',
 'oscillator H1','Euclidean E1','negative-tau','branch-cut','Lorentz H1','tau=0 delta','Minkowski Weyl','Wightman matrix',
 'Wick adjoint','positive imaginary time','real analytic','delta-pole','positive energy lower-time','two signed hyperfunction',
 'bibliography references 14','bibliography references 30','Euclidean spinor bibliography references 46','Euclidean spinor bibliography references 62'
];
const bibRanges=[[44,1,13],[45,14,29],[46,30,45],[47,46,61],[48,62,76]];
const fixedAtomic=[
 ['W01-029-PALATINI-01','W-SSC-029','ordered_factors',['epsilon_ABCD','e^A','WEDGE','e^B','WEDGE','Omega^CD(omega)']],
 ['W01-031-EINSTEIN-01','W-SSC-031','premise','omega_TORSION_FREE'],
 ['W01-031-EINSTEIN-01','W-SSC-031','required_equation','Omega_(-,R)(omega)=0'],
 ['W01-SEC32-EW-03','W-SSC-032','first_problem','ELECTROWEAK_U1_EXTRA_GAUGE_SYMMETRY_NOT_SUPPLIED_BY_SU2_L_ALONE'],
 ['W01-S41-035-02','W-SSC-035','right_weights_ordered',[-1,1]],
 ['W01-036-WEIGHT-03','W-SSC-036','on_quotient','-1/3'],
 ['W01-037-REP-01','W-SSC-037','first_operator','TENSOR_SOURCE_LITERAL'],
 ['W01-S43-041-03','W-SSC-041','equation','H^1(CP^1,O(-3))=C^2'],
 ['W01-A1-047-01','W-SSC-047','source_equation','ω∧ω=0'],
 ['W01-A1-048-03','W-SSC-048','local_Z_rows',[['z01','z01'],['z10','z11']]],
 ['W01-A1-048-03','W-SSC-048','distinct_symbolic_free_parameters_printed',3],
 ['W01-A1-048-07','W-SSC-048','source_HTML_diagram_blank',true],
 ['W01-A1-048-08','W-SSC-048','source_HTML_diagram_blank',true],
 ['W01-A1-049-03','W-SSC-049','source_printed_chain','s⊥=(Z₁−Z₂)s=0'],
 ['W01-050-WARD-02','W-SSC-050','source_latex','*F_A=-F_A'],
 ['W01-A3-052-06','W-SSC-052','source_negative','NO_COMPACT_SU(n)_ASD_GAUGE_FIELDS_FROM_MINKOWSKI_REAL_BOUNDARY'],
 ['W01-A3-053-04','W-SSC-053','source_negative','ORDINARY_NONCOMMUTATIVE_2X2_QUATERNIONIC_DETERMINANT_NOT_DEFINED_LIKE_COMPLEX'],
 ['W01-APP-B01','W-SSC-054','source_formula','S2(tau)=exp(-omega*abs(tau))/((2*pi)*(2*omega))'],
 ['W01-054-SUPPORT-01','W-SSC-054','support_condition','tau<0'],
 ['W01-APP-B15','W-SSC-054','semantic_roles',{right_cut:'t >= |x|',left_cut:'t <= -|x|',middle:'-abs(x)<t<abs(x)',spacelike:'SPACELIKE_UNCUT_IN_OPEN_INTERIOR',timelike:'CROSS_REAL_BRANCH_CUT'}],
 ['W01-APP-W07','W-SSC-055','semantic_roles',{problem1:'RIGHT_SPINOR_INNER_PRODUCT_NOT_EUCLIDEAN_INVARIANT',problem2:'ADJOINTNESS_OBSTRUCTION',remedy:'OPPOSITE_CHIRALITY_DOUBLING_CONVENTIONAL_ONLY'}],
 ['W01-APP-C04','W-SSC-056','semantic_roles.source_RHS_numerator','1'],
 ['W01-APP-C04','W-SSC-056','semantic_roles.derived_RHS_numerator','eps'],
 ['W01-APP-C05','W-SSC-056','semantic_roles.forward_phase','+i*E*t'],
 ['W01-APP-C05','W-SSC-056','semantic_roles.inverse_phase','-i*E*t'],
 ['W01-APP-C13','W-SSC-056','semantic_roles.overall_prefactor','i*pi/(omega*sqrt(2*pi))'],
 ['W01-BC-056-18','W-SSC-056','hyperfunction_coefficients','GROWTH_LESS_THAN_EXPONENTIAL_AS_n_TO_PLUS_MINUS_INFINITY'],
 ['W01-117-09','W-SSC-117','negative',['NO_COMPLETED_FULL_INTERACTING_PT_THEORY','NO_EXISTING_THREE_GEN_DERIVATION','NO_VERIFIED_DISTINCT_PHYSICAL_PREDICTION']]
];
function property(x,path){return path.split('.').reduce((obj,key)=>obj?.[key],x)}
function audit(state){
 const {pdf,ssc,old,gate}=state;
 assert.equal(pdf.schema,'isograph.exp062-w01-independent-48page-original-pdf-sourcefirst.v0.1');
 assert.equal(pdf.track,'W');
 assert.equal(pdf.semantic_authority,false);
 assert.equal(pdf.original.revision,'arXiv:2104.05099v2');
 assert.equal(pdf.original.pdf_pages,48);
 assert.equal(pdf.original.substantive_pages,44);
 assert.equal(pdf.original.bibliography_only_pages,4);
 assert.equal(pdf.original.mixed_page,44);
 assert.equal(pdf.original.october3_download_byte_sha,'UNVERIFIED');
 assert.equal(pdf.original.author_source_revision_PINNED_not_exact_oct03_download_bytes,true);
 assert.deepEqual(pdf.original.visually_read_pdf_zero_indexes,Array.from({length:48},(_,i)=>i));
 assert.equal(pdf.source_first_pdf_pages.length,48);
 assert.deepEqual(pdf.source_first_pdf_pages.map(x=>x.pdf_page),Array.from({length:48},(_,i)=>i+1));
 assert.deepEqual(pdf.source_first_pdf_pages.map(x=>x.pdf_index),Array.from({length:48},(_,i)=>i));
 assert.deepEqual(pdf.source_first_pdf_pages.map(x=>x.kind),Array.from({length:48},(_,i)=>i<43?'AUTHOR_SEMANTIC_SOURCE':i===43?'MIXED_AUTHOR_SOURCE_AND_BIBLIOGRAPHY':'BIBLIOGRAPHY_SOURCE_ONLY'));
 assert.deepEqual(pdf.source_first_pdf_pages.map(x=>x.ssc_owner_ids),pageOwnerNumbers.map(s=>s?s.split(' ').map(n=>'W-SSC-'+n):[]));
 for(let i=0;i<48;i++){
   assert.ok(pdf.source_first_pdf_pages[i].source_first_original_meaning.includes(originalPageTopics[i]),'source-first original page obligation removed '+(i+1));
   assert.equal(pdf.source_first_pdf_pages[i].exact_original_Oct3_author_pdf_download_bytes_verified,false);
 }
 assert.deepEqual(pdf.original_native_bibliography.ordered_page_ranges.map(x=>[x.pdf_page,x.first,x.last]),bibRanges);
 assert.equal(pdf.original_native_bibliography.unique_identities,76);
 assert.equal(pdf.original_native_bibliography.not_independent_theorems,true);
 assert.equal(pdf.source_original_diagrams.length,7);
 assert.deepEqual(pdf.source_original_diagrams.map(x=>[x.printed_pdf_page,x.source_rendering]),originalDiagrams);
 assert.equal(pdf.source_original_diagrams.filter(x=>x.kind==='PDF_ONLY_HTML_BLANK_LINE_479'||x.kind==='PDF_ONLY_HTML_BLANK_LINE_484').length,2);
 assert.equal(pdf.source_original_diagrams.find(x=>x.printed_pdf_page===34).kind,'PDF_GRAPHIC_NOT_HTML_TEXT_AT_909_910');
 assert.equal(pdf.source_first_typed_witnesses.length,54);
 assert.equal(new Set(pdf.source_first_typed_witnesses.map(x=>x.source_key)).size,54);
 const W=ssc.items.filter(x=>x.source.startsWith('W01'));
 assert.equal(ssc.schema,'woit.source-semantic-census.v0.69');
 assert.equal(ssc.items.length,151);
 assert.equal(ssc.items.reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0),536);
 assert.equal(W.length,44);
 assert.equal(W.reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0),220);
 assert.deepEqual(W.map(x=>x.id).sort(),officialOwnerIds);
 const byId=new Map(W.map(x=>[x.id,x]));
 assert.deepEqual([...new Set(pdf.source_first_pdf_pages.flatMap(x=>x.ssc_owner_ids))].sort(),officialOwnerIds);
 for(const w of pdf.source_first_typed_witnesses){
   assert.ok(pdf.source_first_pdf_pages[w.pdf_page-1].ssc_owner_ids.includes(w.ssc_id),'missing original source page→owner inverse '+w.source_key);
   const st=byId.get(w.ssc_id)?.source_expression_census?.statements?.find(x=>x.id===w.typed_id);
   assert.ok(st,'source-first W01 typed atom missing '+w.source_key);
   assert.equal(typeof w.source_role,'string');
   assert.ok(w.source_role.length>25);
 }
 for(const [id,owner,path,value] of fixedAtomic){
   const st=byId.get(owner)?.source_expression_census?.statements?.find(x=>x.id===id);
   assert.ok(st,'missing source-specific original literal '+id);
   assert.deepEqual(property(st,path),value,'source original immutable literal changed '+id+':'+path);
 }
 assert.equal(old.original_to_SSC.length,293);
 assert.equal(old.source_to_SSC_summary.load_bearing,188);
 assert.equal(old.source_to_SSC_summary.nonload,29);
 assert.equal(old.source_to_SSC_summary.bibliography,76);
 assert.equal(old.source_to_SSC_summary.owner_count,44);
 assert.equal(old.source_to_SSC_summary.source_start,49);
 assert.equal(old.source_to_SSC_summary.source_end,1232);
 assert.equal(old.source_to_SSC_summary.source_semantic_items_without_source_first_original_owner,0);
 let cursor=49,load=0,bib=0;
 for(const z of old.original_to_SSC){
   assert.equal(z.source_original_html_lines[0],cursor,'original source gap/overlap '+z.key);
   cursor=z.source_original_html_lines[1]+1;
   assert.ok(z.source_meaning.length>0);
   if(z.disposition_kind==='SOURCE_LOAD_BEARING'){
     load++;assert.ok(z.ssc_owners.length>0,'load-bearing source without W01 SSC owner '+z.key);
   }
   if(z.disposition_kind==='NATIVE_BIBLIOGRAPHY'){
     bib++;assert.equal(z.ssc_owners.length,0);
   }
   for(const id of z.ssc_owners)assert.ok(byId.has(id),'foreign SSC original owner '+id);
 }
 assert.equal(cursor,1233);
 assert.equal(load,188);
 assert.equal(bib,76);
 assert.equal(pdf.prior_independent_versioned_HTML_original_first.total_original_disjoint_HTML_intervals,293);
 // The original HTML proof covers every author paragraph, while this new
 // independent page-denominator originates from visual PDF pages, not from it.
 assert.equal(pdf.counts.original_pdf_pages,48);
 assert.equal(pdf.counts.current_W01_source_item_inverse_count,44);
 assert.equal(pdf.counts.confirmed_new_W01_semantic_omissions,0);
 assert.equal(pdf.counts.source_research_not_completed_globally,true);
 assert.equal(pdf.G0_open,true);
 assert.equal(pdf.G0_frozen,false);
 assert.equal(pdf.G1_authorized,false);
 assert.equal(pdf.cross_track,false);
 assert.equal(gate.current_source_census.git_blob_sha,known.ssc);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','global_source_first_cold_audit_qualified'])assert.equal(gate.current_lawful_state[k],false,'illicit G0 closure '+k);
 return {pdf_pages:48,body_pages:44,original_html_intervals:293,source_semantic_original_intervals:188,SSC_W01_items:44,selected_anchors:54,bibliography:76,diagram_carriers:7,confirmed_new_W01_omissions:0,G0:'OPEN'};
}
const positive=audit(state);
const mutants=[
 ['delete a source PDF page',x=>x.pdf.source_first_pdf_pages.pop()],
 ['drop one source-original author PDF paragraph role',x=>x.pdf.source_first_pdf_pages[0].source_first_original_meaning='BLANK'],
 ['claim bibliography mathematical authority',x=>x.pdf.source_first_pdf_pages[44].ssc_owner_ids=['W-SSC-055']],
 ['move last C2 source into bibliography',x=>x.pdf.source_first_pdf_pages[43].kind='BIBLIOGRAPHY_SOURCE_ONLY'],
 ['delete original W01 author source owner',x=>x.pdf.source_first_pdf_pages[13].ssc_owner_ids.pop()],
 ['invent foreign L source owner',x=>x.pdf.source_first_pdf_pages[3].ssc_owner_ids[0]='L-SSC-001'],
 ['erase source PDF-only mu nu diagram',x=>x.pdf.source_original_diagrams.splice(3,1)],
 ['move PDF-only local diagram to wrong page',x=>x.pdf.source_original_diagrams[4].printed_pdf_page=18],
 ['erase scalar field branch-cut source graphic',x=>x.pdf.source_original_diagrams.pop()],
 ['fabricate original Oct03 downloaded PDF bytes',x=>x.pdf.original.october3_download_byte_sha='MATCHED'],
 ['silently drop native bibliography entries 62-76',x=>x.pdf.original_native_bibliography.ordered_page_ranges.pop()],
 ['conflate cited bibliography with mathematical theorem',x=>x.pdf.original_native_bibliography.not_independent_theorems=false],
 ['omit source-first mathematics witness',x=>x.pdf.source_first_typed_witnesses.shift()],
 ['wrong source-first SSC owner',x=>x.pdf.source_first_typed_witnesses[0].ssc_id='W-SSC-109'],
 ['remove original disjoint source interval',x=>x.old.original_to_SSC.splice(4,1)],
 ['delete original source load owner',x=>x.old.original_to_SSC.find(z=>z.disposition_kind==='SOURCE_LOAD_BEARING').ssc_owners=[]],
 ['normalize literal original Z duplicated symbol',x=>x.ssc.items.find(z=>z.id==='W-SSC-048').source_expression_census.statements.find(z=>z.id==='W01-A1-048-03').local_Z_rows=[['z00','z01'],['z10','z11']]],
 ['rewrite W01 intermediate tensor as direct sum',x=>x.ssc.items.find(z=>z.id==='W-SSC-037').source_expression_census.statements.find(z=>z.id==='W01-037-REP-01').first_operator='DIRECT_SUM'],
 ['co-edit source page and SSC invalid signed U1 weight',x=>{x.pdf.source_first_pdf_pages[10].source_first_original_meaning+=' altered weights';x.ssc.items.find(z=>z.id==='W-SSC-035').source_expression_census.statements.find(z=>z.id==='W01-S41-035-02').right_weights_ordered=[1,1]}],
 ['swap mu nu map in original PDF figure',x=>x.pdf.source_original_diagrams[3].source_rendering='P_S_GLOBAL_NU_TO_PT_MU_TO_M'],
 ['remove Klein quadratic source literal',x=>x.ssc.items.find(z=>z.id==='W-SSC-047').source_expression_census.statements.find(z=>z.id==='W01-A1-047-01').source_equation='NONZERO'],
 ['promote literal malformed nullness chain as correct universal',x=>x.ssc.items.find(z=>z.id==='W-SSC-049').source_expression_census.statements.find(z=>z.id==='W01-A1-049-03').source_printed_chain='s_perp=0'],
 ['erase Einstein torsion-free premise',x=>x.ssc.items.find(z=>z.id==='W-SSC-031').source_expression_census.statements.find(z=>z.id==='W01-031-EINSTEIN-01').premise='NONE'],
 ['normalize W01 negative-time original E1 plus to positive',x=>x.ssc.items.find(z=>z.id==='W-SSC-054').source_expression_census.statements.find(z=>z.id==='W01-054-SUPPORT-01').support_condition='tau>0'],
 ['erase original scalar branch cut right bound',x=>x.ssc.items.find(z=>z.id==='W-SSC-054').source_expression_census.statements.find(z=>z.id==='W01-APP-B15').semantic_roles.right_cut='t<|x|'],
 ['erase source hyperfunction epsilon discrepancy',x=>x.ssc.items.find(z=>z.id==='W-SSC-056').source_expression_census.statements.find(z=>z.id==='W01-APP-C04').semantic_roles.source_RHS_numerator='eps'],
 ['reverse source Fourier positive/negative phase',x=>x.ssc.items.find(z=>z.id==='W-SSC-056').source_expression_census.statements.find(z=>z.id==='W01-APP-C05').semantic_roles.forward_phase='-i*E*t'],
 ['select speculative author physical significance as proven',x=>x.ssc.items.find(z=>z.id==='W-SSC-117').source_expression_census.statements.find(z=>z.id==='W01-117-09').negative=[]],
 ['unlawfully freeze W G0',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['invent historical mutable Oct3 original bytes',x=>x.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['authorize G1 prematurely',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['import cross-author synthesis',x=>x.pdf.cross_track=true],
 ['co-edit typed owner and page role to forge real-space equality',x=>{x.pdf.source_first_pdf_pages[18].source_first_original_meaning+=' CP1 equals CP2';x.ssc.items.find(z=>z.id==='W-SSC-049').source_expression_census.statements.find(z=>z.id==='W01-A1-049-03').source_printed_chain='CP1=CP2'}]
];
let rejected=0;
for(const [name,fn] of mutants){let x=clone(state),before=JSON.stringify(x);fn(x);assert.notEqual(JSON.stringify(x),before,'inert hostile '+name);try{audit(x)}catch(e){rejected++;continue}throw Error('ADVERSARIAL_ESCAPE '+name);}
assert.equal(rejected,mutants.length);
console.log('W01 original 48-page independent source-first G0 audit PASS '+JSON.stringify(positive));
console.log('Adversarial controls rejected '+rejected+'/'+mutants.length);
console.log('W01 independent source study changed no SSC meaning; G0 remains OPEN: six mutable Oct03 originals unavailable and all-nine independent review not qualified.');
