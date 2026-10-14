#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const raw=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+raw.length+'\0'),raw])).digest('hex');};
const m=read('experiments/062/W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_6.json');
for(const [key,pin] of Object.entries(m.pins))assert.equal(blob(pin.path),pin.git_blob_sha,'stale '+key);
const d={
 audit:read(m.pins.printed_verified_context.path),
 old:read(m.pins.printed.path),
 s:read(m.pins.ssc.path),
 gate:read(m.pins.gate.path),
 m,
 before:read(m.historical_predecessor_convergence.path)
};
assert.equal(blob(m.historical_predecessor_convergence.path),m.historical_predecessor_convergence.git_blob_sha);
const clone=x=>JSON.parse(JSON.stringify(x));
const knownPageBounds={
 1:[0,24],2:[25,60],3:[61,106],4:[107,150],5:[151,208],
 6:[209,259],7:[260,301],8:[302,347],9:[348,408],
 10:[409,470],11:[471,505],12:[506,573],13:[574,633],
 14:[634,665],15:[666,693]
};
function audit(x){
 const {audit:a,old,s,gate:g,m, before}=x;
 assert.equal(a.schema,'isograph.exp062-W04e-source-first-formula-and-binder-coverage.v0.2');
 assert.equal(a.track,'W');
 assert.equal(a.source.original_oct03_bytes_verified,false);
 assert.equal(a.source.original_oct03_sha256,'UNRECOVERED');
 assert.equal(a.predecessor.git_blob_sha,m.pins.printed.git_blob_sha);
 assert.equal(m.pins.printed_verified_context.git_blob_sha,g.current_W04e_page_boundary_source_index.audit.git_blob_sha);
 assert.equal(s.schema,'woit.source-semantic-census.v0.67');
 assert.equal(s.items.length,151);
 assert.equal(s.items.reduce((n,z)=>n+(z.source_expression_census?.statements||[]).length,0),531);
 assert.equal(m.counters.current_typed_statement_incidences,531);
 assert.equal(m.current_G0.frozen,false);
 assert.equal(m.current_G0.source_provenance_complete,false);
 assert.deepEqual(m.versioned_original_source_to_ssc,before.versioned_original_source_to_ssc);
 assert.deepEqual(m.current_ssc_to_original_or_review,before.current_ssc_to_original_or_review);
 assert.deepEqual(m.original_navigation_anchors,before.original_navigation_anchors);
 assert.equal(a.source_first_missing_atoms.length,5);
 assert.deepEqual(a.source_first_missing_atoms,old.source_first_missing_atoms,'previous five source mathematical atoms redefined');

 // Fixed source-first author PDF literals, independent of both editable ledgers.
 const fixed=[
  {loc:'F-LAPLACE-01',owner:'W-SSC-082',typed:'W04E-082-08',page:3,lines:[78,102],fields:{
   FT:'Wtilde2(E) = (1/(2*pi))*integral_R exp(i*t*E)*W2(t) dt',
   complex_inverse:'W2(z) = integral_R exp(-i*z*E)*Wtilde2(E) dE',
   Schwinger:'S2(tau)=W2(-i*tau)=integral_0_to_infinity exp(-tau*E)*Wtilde2(E) dE',
   spectrum_side_condition:'Wtilde2 support E>=0'}},
  {loc:'F-KG-04',owner:'W-SSC-082',typed:'W04E-082-09',page:6,lines:[209,232],fields:{
   ordered_operator:'(-d2_dt2-omega^2)*psi=(i*d_dt+omega)*(i*d_dt-omega)*psi=0',
   frequency:'omega=sqrt(|p|^2+m^2)',positive_negative_energy:true,
   second_annihilator:'b',second_creator:'b_dagger',real_field_restriction:'b=a'}},
  {loc:'F-HYPERFUNCTION-01',owner:'W-SSC-122',typed:'W04E-122-05',page:8,lines:[302,306],fields:{
   carrier:'equivalence_classes_of_pairs_[F_plus,F_minus]',
   domains:['F_plus holomorphic on upper half plane','F_minus holomorphic on lower half plane'],
   map_from:'[F(z),0]',map_to:'[0,overline(F(overline(z)))]'}},
  {loc:'F-OS-LAPLACE-01',owner:'W-SSC-123',typed:'W04E-123-03',page:8,lines:[307,332],fields:{
   positive_time_test_space:'S_plus(R)',OS_form:'<f,g>_OS=S2(Theta(f),g)',
   spectral_integral:'integral_R overline(Lf(E))*Lg(E)*Wtilde2(E) dE',
   conclusion:'<f,g>_OS=<Lf,Lg>',
   premises:['FREE_FIELD_EXAMPLE','SCHWINGER_FROM_LAPLACE_WIGHTMAN','REFLECTION_POSITIVITY']}},
  {loc:'F-PAULI-2D4D-01',owner:'W-SSC-085',typed:'W04E-085-03',page:9,lines:[355,369],fields:{
   source_operator:'partial_x',analogue:'sum_{j=1}^3 sigma_j*partial_{x_j}',
   moving_modes:['RIGHT_MOVER_FROM_(partial_t+partial_x)_psi_R=0','LEFT_MOVER_FROM_(partial_t-partial_x)_psi_L=0'],
   chiral_coordinates:['x_R=x-t','x_L=x+t'],
   reduced_dependence:'RIGHT_ONLY_x_R_LEFT_ONLY_x_L'}}
 ];
 for(const x of fixed){
  const candidate=a.source_first_missing_atoms.find(z=>z.key===x.loc);
  const historical=old.source_first_missing_atoms.find(z=>z.key===x.loc);
  const typed=(s.items.find(z=>z.id===x.owner)?.source_expression_census?.statements||[]).find(z=>z.id===x.typed);
  assert.ok(candidate&&historical&&typed,'source-to-SSC occurrence inverse missing '+x.loc);
  for(const [field,value] of Object.entries(x.fields)){
   assert.deepEqual(candidate.source_exact[field],value,'source-first original text literal mismatch '+x.loc+'/'+field);
   assert.deepEqual(historical.source_exact[field],value,'historical source literal mismatch '+x.loc+'/'+field);
   assert.deepEqual(typed.source_exact[field],value,'current SSC original text mismatch '+x.loc+'/'+field);
  }
  assert.equal(candidate.owner,x.owner);
  assert.equal(candidate.typed,x.typed);
  assert.equal(candidate.page,x.page);
  assert.deepEqual(candidate.original_pdf_text_lines,x.lines);
  assert.equal(typed.source_locator.original_source_locator,x.loc);
  assert.equal(typed.source_locator.printed_pdf_page,x.page);
  assert.deepEqual(typed.source_locator.source_line_span,x.lines);
 }

 assert.equal(a.already_represented_or_evidence_index_only.length,24);
 assert.equal(a.stats.source_first_rows,29);
 assert.deepEqual(a.source_page_limits,knownPageBounds,'source page partitions changed');
 const all=[...a.source_first_missing_atoms.map(z=>({label:z.key,page:z.page,lines:z.original_pdf_text_lines,owner:z.owner,typed:z.typed})),...a.already_represented_or_evidence_index_only];
 assert.equal(all.length,29);
 assert.equal(new Set(all.map(z=>z.label)).size,29);
 for(const z of all){
  assert.ok(Number.isInteger(z.page)&&z.page>=1&&z.page<=15,'invalid printed page '+z.label);
  const [start,end]=knownPageBounds[z.page];
  assert.ok(Array.isArray(z.lines)&&z.lines.length===2&&z.lines.every(Number.isInteger)&&z.lines[0]>=start&&z.lines[1]<=end&&z.lines[0]<=z.lines[1], 'original source lines OUTSIDE recorded page: '+z.label);
  if(z.owner)assert.ok(s.items.some(x=>x.id===z.owner&&x.source.startsWith('W04e')),'not original W04e source owner '+z.label);
  if(z.typed)assert.ok(s.items.find(x=>x.id===z.owner)?.source_expression_census?.statements?.some(y=>y.id===z.typed),'missing typed source fidelity owner '+z.label);
 }
 const byLabel=label=>{const z=a.already_represented_or_evidence_index_only.find(x=>x.label===label);assert.ok(z,'missing key '+label);return z};
 assert.deepEqual(byLabel('P13-OPEN-THETA').lines,[618,621]);
 assert.equal(byLabel('P13-OPEN-THETA').page,13);
 assert.deepEqual(byLabel('P14-GAUGE-PROPOSAL').lines,[639,639]);
 assert.equal(byLabel('P14-GAUGE-PROPOSAL').typed,'W04E127-E02');
 assert.deepEqual(byLabel('P14-ELECTROWEAK-ROLE').lines,[634,638]);
 assert.equal(byLabel('P14-ELECTROWEAK-ROLE').typed,'W04E127-E01');
 assert.deepEqual(byLabel('P14-BIBLIOGRAPHY-FIRST').lines,[647,665]);
 assert.deepEqual(byLabel('P15-BIBLIOGRAPHY').lines,[666,693]);
 for(const label of ['P14-BIBLIOGRAPHY-FIRST','P15-BIBLIOGRAPHY'])assert.equal(byLabel(label).owner,null,'bibliography imported as author mathematical claim');
 assert.deepEqual(byLabel('P8-CHIRAL-EOM-R').lines,[338,347]);
 assert.deepEqual(byLabel('P9-CHIRAL-EOM').lines,[348,355]);
 assert.deepEqual(byLabel('P12-EUCLIDEAN-FIBER-START').lines,[563,573]);
 assert.deepEqual(byLabel('P13-EUCLIDEAN-FIBER').lines,[574,595]);
 assert.ok(!a.already_represented_or_evidence_index_only.some(z=>z.label==='P14-OPEN-THETA'),'historical malformed location retained');
 assert.equal(g.current_lawful_state.G0_open,true);
 for(const k of ['G0_frozen','G0_complete','G1_authorized','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','global_source_first_cold_audit_qualified'])
 assert.equal(g.current_lawful_state[k],false,'stage prematurely promoted '+k);
 assert.equal(g.current_source_census.git_blob_sha,m.pins.ssc.git_blob_sha);
 assert.equal(g.current_W04e_source_printed_formula_inverse.audit.git_blob_sha,m.pins.printed.git_blob_sha);
 return {source_original_context_rows:24,source_first_new_semantic_atoms_retained:5,versioned_original_intervals:437,current_ssc_items:151,G0:'OPEN'};
}
const positive=audit(d);
const hostile=[
 ['bibliography used as unification claim',x=>x.audit.already_represented_or_evidence_index_only.find(z=>z.label==='P14-GAUGE-PROPOSAL').lines=[648,650]],
 ['unification relabeled reference',x=>x.audit.already_represented_or_evidence_index_only.find(z=>z.label==='P14-BIBLIOGRAPHY-FIRST').owner='W-SSC-127'],
 ['Theta wrong original printed page',x=>x.audit.already_represented_or_evidence_index_only.find(z=>z.label==='P13-OPEN-THETA').page=14],
 ['cross-page Theta span',x=>x.audit.already_represented_or_evidence_index_only.find(z=>z.label==='P13-OPEN-THETA').lines=[618,640]],
 ['drop split right-moving PDE page',x=>x.audit.already_represented_or_evidence_index_only.splice(x.audit.already_represented_or_evidence_index_only.findIndex(z=>z.label==='P8-CHIRAL-EOM-R'),1)],
 ['incorrect right-field SSC typing',x=>x.audit.already_represented_or_evidence_index_only.find(z=>z.label==='P8-CHIRAL-EOM-R').typed='W04E-123-02'],
 ['fabricate historical Oct3 byte equality',x=>x.audit.source.original_oct03_bytes_verified=true],
 ['coedit source to change existing five atoms',x=>{x.old.source_first_missing_atoms[0].source_exact.FT='bad';x.audit.source_first_missing_atoms[0].source_exact.FT='bad';}],
 ['coedit original and historical source plus SSC to fake FT',x=>{
  x.old.source_first_missing_atoms[0].source_exact.FT='Wtilde2(E)=FAKE';
  x.audit.source_first_missing_atoms[0].source_exact.FT='Wtilde2(E)=FAKE';
  x.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-08').source_exact.FT='Wtilde2(E)=FAKE';
 }],
 ['coedit source page number and typed locator',x=>{
  x.audit.source_first_missing_atoms.find(z=>z.key==='F-KG-04').page=5;
  x.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-09').source_locator.printed_pdf_page=5;
 }],
 ['invent extra source atom',x=>x.audit.source_first_missing_atoms.push(clone(x.audit.source_first_missing_atoms[0]))],
 ['wrong bibliography owner',x=>x.audit.already_represented_or_evidence_index_only.find(z=>z.label==='P15-BIBLIOGRAPHY').owner='W-SSC-085'],
 ['move W04e paper current to G1',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['change original 437 versioned source intervals',x=>x.m.versioned_original_source_to_ssc.pop()],
 ['revise W without changing frozen SSC',x=>x.s.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.pop()],
 ['misplace source page boundary itself',x=>x.audit.source_page_limits[14]=[634,679]],
 ['drop W04e author provenance',x=>x.audit.predecessor.git_blob_sha='0000000000000000000000000000000000000000'],
 ['invent unqualified nine-source cold pass',x=>x.gate.current_lawful_state.global_source_first_cold_audit_qualified=true]
];
let rejected=0;
for(const [name,fn] of hostile){let x=clone(d),before=JSON.stringify(x);fn(x);assert.notEqual(JSON.stringify(x),before,'inert hostile '+name);try{audit(x)}catch(e){rejected++;continue}throw Error('ADVERSARIAL_ESCAPE '+name)}
assert.equal(rejected,hostile.length);
console.log('W G0 original page/line source contextual inverse PASS '+JSON.stringify(positive));
console.log('Adversarial controls rejected '+rejected+'/'+hostile.length);
console.log('Historical 0.5 five-atom PASS remains scoped; six mutable Oct03 original source bytes and all-nine cold source audit remain OPEN.');
