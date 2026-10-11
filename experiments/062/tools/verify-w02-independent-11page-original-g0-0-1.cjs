#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const prefix = 'experiments/062/';
const paths = {
  evidence:prefix+'W02_G0_INDEPENDENT_11_PAGE_ORIGINAL_SOURCE_FIRST_0_1.json',
  ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_69.json',
  historical:prefix+'W02_G0_VERSIONED_FULL_ORIGINAL_SOURCE_REVERSE_0_1.json',
  gate:prefix+'W_CURRENT_STAGE_GATE_0_130.json',
  freeze:'research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md'
};
const pins = {
  evidence:'9b69b047f4f91200861812a75d6128671db035f3',
  ssc:'54b0ae071f6ba8a3a2c622f9a87d48540a90468d',
  historical:'1ff25926dcdce24408e889b6ca71766f6e403bcc',
  gate:'b0179f1e104fb25cb3d721ad1c1150ffb8a59f0e',
  freeze:'5775af1ab9289f97d903b39d5eb8eda241bafe78'
};
function shaOf(bytes){return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes])).digest('hex')}
for(const [k,path] of Object.entries(paths))assert.equal(shaOf(fs.readFileSync(path)),pins[k],'historical/current evidence pin drift '+k);
const source = Object.fromEntries(Object.entries(paths).filter(([k])=>k!=='freeze').map(([k,p])=>[k,JSON.parse(fs.readFileSync(p,'utf8'))]));
const clone=x=>structuredClone(x);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const partition = [
 ['W02-PDF-A00',27,32,'PROVENANCE',[]],
 ['W02-PDF-A01',33,35,'SEMANTIC',['008','009','139','151']],
 ['W02-PDF-A02',36,37,'HEADING',[]],
 ['W02-PDF-A03',38,46,'SEMANTIC',['128']],
 ['W02-PDF-A04',47,62,'SEMANTIC',['129','130','134']],
 ['W02-PDF-A05',63,69,'SEMANTIC',['131','132','133']],
 ['W02-PDF-A06',70,75,'SEMANTIC',['134','135']],
 ['W02-PDF-A07',76,81,'SEMANTIC',['136','137','010','138']],
 ['W02-PDF-A08',82,86,'SEMANTIC',['139']],
 ['W02-PDF-A09',87,102,'SEMANTIC',['140']],
 ['W02-PDF-A10',103,109,'SEMANTIC',['141','142','120','143']],
 ['W02-PDF-A11',110,114,'SEMANTIC',['144','145']],
 ['W02-PDF-A12',115,122,'SEMANTIC',['118','146']],
 ['W02-PDF-A13',123,125,'SEMANTIC',['147']],
 ['W02-PDF-A14',126,130,'SEMANTIC',['119','147']],
 ['W02-PDF-A15',131,131,'SEMANTIC',['148']],
 ['W02-PDF-A16',132,137,'SEMANTIC',['149','150']],
 ['W02-PDF-A17',138,143,'SEMANTIC',['151']],
 ['W02-PDF-A18',144,144,'HEADING',[]]
];
const citationOwners=[
 ['129','136'],['130'],['133'],['136'],['136'],
 ['137'],['137'],['137'],['141'],['141'],['120'],
 ['147'],['147','148'],['148'],['149'],['150'],
 ['151'],['151'],['151']
];
const formula = [
 ['MINKOWSKI_HERMITIAN_1',2,38,41,'W-SSC-128','W02-G0-MATRIX-01',{matrix:[['x0+x3','x1-i*x2'],['x1+i*x2','x0-x3']]}],
 ['LORENTZ_ACTION_UNNUMBERED',2,42,46,'W-SSC-128','W02-G0-MATRIX-03',{action:{lhs:'X',operator:'MAPS_TO',rhs:'Omega_L * X * inverse(Omega_R)'}}],
 ['COMPLEX_SYMMETRIC_TENSOR_2',3,59,62,'W-SSC-130','W02-G0-CHIRAL-01',{source_latex:'\\left(\\frac12\\right)_L\\otimes\\left(\\frac12\\right)_R'}],
 ['RIGHT_NONHOLOMORPHIC_TENSOR',3,64,67,'W-SSC-131','W02-G0-CHIRAL-02',{source_latex:'(0)_L\\otimes\\left(\\left(\\frac12\\right)_R\\otimes\\left(\\overline{\\frac12}\\right)_R\\right)'}],
 ['RESTRICTED_EUCLIDEAN_SPLIT',4,72,75,'W-SSC-135','W02-G0-CHIRAL-03',{source_latex:'\\left(\\frac12\\right)_R\\otimes\\left(\\frac12\\right)_R=(0)_R+(1)_R'}],
 ['WEYL_LAGRANGIAN',5,87,91,'W-SSC-140','W02-G0-WEYL-01',{source_latex:'\\mathcal{L}=\\widetilde{\\psi}^{\\dagger}(p)(p_0-\\boldsymbol{\\sigma}\\cdot\\boldsymbol{p})\\widetilde{\\psi}(p)'}],
 ['HELICITY_OPERATOR',5,100,102,'W-SSC-140','W02-G0-WEYL-02',{source_latex:'\\frac12\\frac{\\boldsymbol{\\sigma}\\cdot\\boldsymbol{p}}{|\\boldsymbol{p}|}'}],
 ['FIRST_YM_ACTION',7,115,117,'W-SSC-118','W02-G0-YM-01',{source_latex:'\\frac{1}{4g^2}|F_A|^2=\\frac{1}{4g^2}\\int\\mathrm{Tr}(F_A\\wedge *F(A))',modality:'SOURCE_DISPLAYED_EXACT_EQUALITY_WITHIN_FIRST_ACTION'}],
 ['SECOND_SELFDUAL_ACTION',7,118,120,'W-SSC-146','W02-G0-YM-02',{source_latex:'\\frac{1}{2g^2}\\int\\mathrm{Tr}(F_A^{+}\\wedge *F_A^{+})',modality:'SOURCE_DISPLAYED_EQUIVALENT_ACTION_MOD_TOPOLOGICAL_TERM_NOT_EQUALITY'}],
 ['CHIRAL_GR_ACTION',8,132,135,'W-SSC-149','W02-G0-GR-01',{source_latex:'\\int\\Sigma^{\\dot A\\dot B}\\wedge R_{\\dot A\\dot B}',modality:'SOURCE_CITED_GRAVITATIONAL_ACTION_DISPLAY'}]
];
const guards=[
 ['CONDITIONAL_MINKOWSKI_HERMITICITY','W-SSC-129','W02-COLD-REALFORMS-01','source_latex','\\Omega_R^{-1}=\\Omega_L^{\\dagger}',49],
 ['CHOSEN_SU2_REAL_SLICE','W-SSC-129','W02-COLD-REALFORMS-02','coordinate_condition','x0_PURE_IMAGINARY',56],
 ['REAL_LORENTZ_ONLY_AGREEMENT','W-SSC-132','W02-132-01','scope','ONLY_REAL_LORENTZ_GROUP',67],
 ['EUCLIDEAN_LEFT_TRIVIAL','W-SSC-134','W02-134-01','left_action','TRIVIAL',72],
 ['CHOICE_NOT_CANONICAL','W-SSC-138','W02-138-01','induced_relation','ISOMORPHISM_LEFT_HALF_TO_CONJUGATE_RIGHT_HALF',81],
 ['OS_POSITIVE_IMAGINARY_TIME','W-SSC-136','W02-COLD-OS-01','restriction','POSITIVE_IMAGINARY_TIME',77],
 ['HIGGS_EXCLUDED','W-SSC-139','W02-139-01','negative','DO_NOT_DROP_HIGGS_EXCEPTION',84],
 ['CITED_FERMION_EXTRA_DOUBLING','W-SSC-141','W02-141-03','condition','EVEN_WHEN_BOTH_EUCLIDEAN_CHIRALITIES_INTRODUCED',104],
 ['EUCLIDEAN_HODGE_PLUS','W-SSC-144','W02-G0-HODGE-01','source_latex','*^2=1',111],
 ['MINKOWSKI_HODGE_MINUS','W-SSC-144','W02-G0-HODGE-02','source_latex','*^2=-1',112],
 ['RIGHT_COMPLEX_SELFDUAL_DIM3','W-SSC-145','W02-COLD-SELFDUAL-01','dimension.scalar',3,114],
 ['YM_MOD_TOPOLOGY','W-SSC-146','W02-IV2-146-03','relation','SOURCE_EQUIVALENT_ACTION_FORM_DEPENDS_ON_TOPOLOGICAL_INVARIANCE_NOT_EXACT_ACTION_EQUALITY',118],
 ['CURVATURE_BLOCK_WORDING','W-SSC-148','W02-COLD-CURV-BLOCK-01','source_phrase','This has a block diagonal form',131],
 ['CONDITIONAL_OFFDIAGONAL_EINSTEIN','W-SSC-148','W02-COLD-CURV-BLOCK-02','operator','VANISHING_OFF_DIAGONAL_CURVATURE_BLOCKS',131],
 ['EUCLIDEAN_RECONSTRUCTION_NOT_SOLVED','W-SSC-150','W02-IV3-150-01','author_possibility.solution_claim',false,137],
 ['ELECTROWEAK_OPEN','W-SSC-151','W02-COLD-DISCUSSION-02','closure',false,143],
 ['TWO_CITED_CONTEXTS_NOT_PROOF','W-SSC-151','W02-REV-151-02','relation','OTHER_CONTEXT_PRECEDENTS_NOT_EQUIVALENCE_OR_PROOF_OF_THIS_PROPOSAL',141]
];
function getField(o,path){return path.split('.').reduce((x,k)=>x==null?undefined:x[k],o)}
function itemOf(ssc,id){return ssc.items.find(z=>z.id===id)}
function statementOf(ssc,id,st){return (itemOf(ssc,id)?.source_expression_census?.statements||[]).find(z=>z.id===st)}
function audit(d){
 const {evidence:e,ssc:s,historical:h,gate:g}=d;
 assert.equal(e.schema,'isograph.exp062-w02-independent-original-pdf-first-finite-completeness-audit.v0.1');
 assert.equal(e.track,'W');
 assert.equal(e.original.arxiv_revision,'arXiv:2311.00608v2');
 assert.equal(e.original.arxiv_pdf_url,'https://arxiv.org/pdf/2311.00608v2');
 assert.equal(e.original.arxiv_html_url,'https://arxiv.org/html/2311.00608v2');
 assert.equal(e.original.arxiv_version_date,'2023-12-12');
 assert.equal(e.original.original_pdf_printed_date,'2023-12-14');
 assert.equal(e.original.current_html_dateline,'2026-08-24');
 assert.equal(e.original.html_dateline_not_equal_printed_pdf_date,true);
 assert.equal(e.original.downloaded_pdf_oct03_2026_original_sha256,'UNVERIFIED');
 assert.equal(e.original.pdf_total_pages,11);
 assert.equal(e.original.no_published_figures_or_tables_observed,true);
 assert.equal(e.original.html_first_source_line,27);
 assert.equal(e.original.html_last_source_line,163);
 assert.equal(s.census_item_count,151);
 assert.equal(s.items.length,151);
 assert.equal(s.source_count,9);
 assert.equal(s.cross_author_semantics_available,false);
 assert.equal(s.items.reduce((n,z)=>n+(z.source_expression_census?.statements||[]).length,0),536);
 assert.equal(e.pdf_pages.length,11);
 assert.deepEqual(e.pdf_pages.map(z=>z.printed_page),Array.from({length:11},(_,i)=>i+1));
 for(const z of e.pdf_pages){assert.equal(z.visually_reviewed_pdf,true);assert.equal(z.figures_or_tables_present,false)}
 assert.equal(e.original_main_html_partition.length,partition.length);
 let nextLine=27;
 const ownerSet=new Set();
 for(let i=0;i<partition.length;i++){
  const z=e.original_main_html_partition[i],x=partition[i];
  assert.equal(z.id,x[0],'original source interval identity missing');
  assert.deepEqual(z.html_original_lines,x.slice(1,3),'source-first location changed '+x[0]);
  assert.equal(z.kind,x[3]);
  assert.deepEqual(z.source_to_ssc,x[4].map(y=>'W-SSC-'+y));
  assert.equal(z.html_original_lines[0],nextLine,'original source gap/overlap '+z.id);
  nextLine=z.html_original_lines[1]+1;
  assert.ok(z.printed_pdf_pages.length>=1&&z.printed_pdf_pages.every(p=>p>=1&&p<=11));
  assert.equal(typeof z.source_first_disposition,'string');
  assert.ok(z.source_first_disposition.length>20,'unsupported source semantic disposition '+z.id);
  if(z.kind==='SEMANTIC')assert.ok(z.source_to_ssc.length>0,'original semantic ownerless '+z.id);
  else assert.deepEqual(z.source_to_ssc,[],'nonload fake source ownership '+z.id);
  for(const id of z.source_to_ssc){assert.ok(itemOf(s,id)?.source.startsWith('W02'),'wrong/missing W02 source owner '+id);ownerSet.add(id)}
 }
 assert.equal(nextLine,145,'source original main tail not complete');
 assert.equal(e.original_main_html_partition.filter(z=>z.kind==='SEMANTIC').length,16);
 assert.equal(ownerSet.size,30);
 const allW02=s.items.filter(x=>x.source.match(/^W02(\b| §)/)).map(z=>z.id);
 assert.equal(allW02.length,30);
 assert.deepEqual([...ownerSet].sort(),allW02.sort(),'SSC→original independent inverse not complete');
 assert.equal(e.original_citations.length,19);
 for(let i=0;i<19;i++){
  const z=e.original_citations[i];
  assert.equal(z.reference_number,i+1);
  assert.equal(z.original_html_line,i+145);
  assert.equal(z.printed_pdf_page,i<17?10:11);
  assert.equal(z.role,'BIBLIOGRAPHY_PROVENANCE_ONLY');
  assert.deepEqual(z.cited_by_ssc,citationOwners[i].map(x=>'W-SSC-'+x),'bibliography original citation-owner mismatch ref'+(i+1));
  assert.ok(z.cited_by_ssc.every(id=>ownerSet.has(id)),'invented non-W02 bibliography claim');
 }
 assert.equal(e.source_displayed_math.length,10);
 for(let i=0;i<formula.length;i++){
  const f=e.source_displayed_math[i],ex=formula[i];
  assert.equal(f.key,ex[0]);
  assert.equal(f.page,ex[1]);
  assert.deepEqual(f.html,ex.slice(2,4));
  assert.equal(f.owner,ex[4]);
  assert.equal(f.typed,ex[5]);
  for(const [field,value] of Object.entries(ex[6])){
   assert.deepEqual(f.fixed[field],value,'original printed equation was altered '+f.key+'/'+field);
   assert.deepEqual(statementOf(s,f.owner,f.typed)?.[field],value,'SSC typed source does not match original PDF '+f.key+'/'+field);
  }
  assert.ok(f.html[0]>=27&&f.html[1]<=144);
  if(f.alias){
   const a=statementOf(s,f.alias,f.typed);
   assert.ok(a,'lost deliberate source alias '+f.key);
   for(const [field,value] of Object.entries(ex[6]))assert.deepEqual(a[field],value,'aliased source formula diverges '+f.key);
  }
 }
 assert.equal(e.source_negative_modal_and_relation_checks.length,17);
 for(let i=0;i<guards.length;i++){
  const x=guards[i],q=e.source_negative_modal_and_relation_checks[i],val=statementOf(s,x[1],x[2]);
  assert.equal(q.key,x[0]);
  assert.equal(q.owner,x[1]);
  assert.equal(q.typed,x[2]);
  assert.equal(q.field,x[3]);
  assert.equal(q.line,x[5]);
  assert.ok(val,'missing source negative/modal record '+x[0]);
  assert.equal(q.exact===undefined ? q.contains : q.exact,x[4]);
  const actual=getField(val,x[3]);
  if(q.contains!==undefined)assert.ok(Array.isArray(actual)&&actual.includes(x[4]),'missing source-scoped negative '+x[0]);
  else assert.deepEqual(actual,x[4],'author source modality/binder changed '+x[0]);
 }
 // Secondary coverage evidence is NOT the source oracle: our independent
 // 19-group PDF review must pass above even if the old 61-location ledger agrees.
 assert.equal(h.source_first_locations.length,61);
 let lo=27;for(const r of h.source_first_locations){assert.equal(r.html_lines[0],lo,'historical interval gap');lo=r.html_lines[1]+1;}
 assert.equal(lo,164);
 assert.equal(h.counts.pdf_pages,11);
 assert.equal(h.counts.displayed_math_html_lines || h.display_math_html_lines.length,10);
 assert.equal(h.counts.bibliography_entries,19);
 const l=g.current_lawful_state;
 assert.equal(l.G0_open,true);
 for(const k of ['G0_frozen','G0_complete','G1_authorized','Oct03_mutable_source_byte_identity_verified','global_source_first_cold_audit_qualified','all_nine_source_full_reverse_assertion_enumeration_complete'])assert.equal(l[k],false,'early stage promotion '+k);
 assert.equal(g.current_source_census.git_blob_sha,pins.ssc);
 assert.equal(e.convergence.new_omissions_this_independent_W02_sweep,0);
 assert.equal(e.convergence.W02_SSC_items_in_current_151,30);
 assert.equal(e.convergence.original_mutable_oct03_W03_W04_sources_byte_authenticated,false);
 assert.equal(e.convergence.other_W_sources_cold_exhaustiveness_qualified,false);
 assert.equal(e.convergence.G0_frozen,false);
 assert.equal(e.convergence.G1_authorized,false);
 return {original_pages:11,main_intervals:19,main_semantic:16,math:10,refs:19,negative_modal_controls:17,source_items:30,new_omissions:0,whole_W_G0:'OPEN'};
}
const positive=audit(source);
const hostile=[
 ['drop original source narrative interval',x=>x.evidence.original_main_html_partition.splice(5,1)],
 ['turn source math paragraph into exclusion',x=>x.evidence.original_main_html_partition[3].kind='HEADING'],
 ['source-first alter original main span',x=>x.evidence.original_main_html_partition[4].html_original_lines[0]++],
 ['source-first switch wrong source owner',x=>x.evidence.original_main_html_partition[10].source_to_ssc=['W-SSC-047']],
 ['conspire to change paper and SSC matrix entry',x=>{x.evidence.source_displayed_math[0].fixed.matrix[0][1]='x1+i*x2';statementOf(x.ssc,'W-SSC-128','W02-G0-MATRIX-01').matrix[0][1]='x1+i*x2';}],
 ['erase displayed independent source formula',x=>x.evidence.source_displayed_math.splice(7,1)],
 ['change second Yang-Mills action to equality',x=>{x.evidence.source_displayed_math[8].fixed.modality='EXACT_EQUALITY';statementOf(x.ssc,'W-SSC-146','W02-G0-YM-02').modality='EXACT_EQUALITY';}],
 ['switch signed Weyl momentum operator',x=>{x.evidence.source_displayed_math[5].fixed.source_latex='PLUS';statementOf(x.ssc,'W-SSC-140','W02-G0-WEYL-01').source_latex='PLUS';}],
 ['lose right holomorphic conjugate factor',x=>x.ssc.items.find(z=>z.id==='W-SSC-131').source_expression_census.statements[0].source_latex='NO_BAR'],
 ['turn external citation into math',x=>x.evidence.original_citations[0].role='AUTHOR_PROVEN_THEOREM'],
 ['duplicate native bibliography entry',x=>x.evidence.original_citations.push(clone(x.evidence.original_citations[0]))],
 ['falsify original PDF dateline',x=>x.evidence.original.original_pdf_printed_date='2026-08-24'],
 ['promote dynamic HTML dateline as paper date',x=>x.evidence.original.html_dateline_not_equal_printed_pdf_date=false],
 ['erase independently visually checked source page',x=>x.evidence.pdf_pages[8].visually_reviewed_pdf=false],
 ['wrong original source Hodge signature',x=>{x.evidence.source_negative_modal_and_relation_checks[9].exact='*^2=1';statementOf(x.ssc,'W-SSC-144','W02-G0-HODGE-02').source_latex='*^2=1';}],
 ['conspire author block semantics as same equation',x=>{x.evidence.source_negative_modal_and_relation_checks[12].exact='ALL_BLOCKS_ZERO';statementOf(x.ssc,'W-SSC-148','W02-COLD-CURV-BLOCK-01').source_phrase='ALL_BLOCKS_ZERO';}],
 ['erase source Higgs exception',x=>x.ssc.items.find(z=>z.id==='W-SSC-139').source_expression_census.statements.find(z=>z.id==='W02-139-01').negative=[]],
 ['turn open electroweak problem into solved',x=>{x.evidence.source_negative_modal_and_relation_checks[15].exact=true;statementOf(x.ssc,'W-SSC-151','W02-COLD-DISCUSSION-02').closure=true;}],
 ['silently import left-side source item',x=>x.ssc.items.find(z=>z.id==='W-SSC-140').source='L01'],
 ['drop source-specific citation owner',x=>x.evidence.original_citations[16].cited_by_ssc=[]],
 ['delete existing original W02 source interval',x=>x.historical.source_first_locations.pop()],
 ['invent original Oct03 raw PDF digest',x=>x.evidence.original.downloaded_pdf_oct03_2026_original_sha256='FAKE'],
 ['forge global W G0 qualification',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['activate G1 prematurely',x=>x.gate.current_lawful_state.G1_authorized=true]
];
let rejected=0;for(const [name,mutate] of hostile){let x=clone(source),before=JSON.stringify(x);mutate(x);assert.notEqual(JSON.stringify(x),before,'inert adversarial '+name);try{audit(x)}catch(_){rejected++;continue}throw Error('ADVERSARIAL_ESCAPE '+name)}
assert.equal(rejected,hostile.length);
console.log('W02 independent full original PDF source-first audit PASS '+JSON.stringify(positive));
console.log('Adversarial controls rejected '+rejected+'/'+hostile.length);
console.log('No additional W02 source occurrence warranted. Complete nine-source frozen October3 G0 remains blocked by six unauthenticated mutable original revisions and independent global review.');
