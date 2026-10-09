import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={seven:L+'LISI_L01_SEVEN_SOURCE_MODALITY_ASSERTIONS_G0_0_1.json',
 spin:L+'LISI_L01_SPIN_REAL_GROUP_ISOMORPHISM_SOURCE_DEFECT_G0_0_1.json',
 visual:L+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_18.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_18.json'};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8')),cp=x=>JSON.parse(JSON.stringify(x)),J=JSON.stringify;
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const S=read(P.seven),Spin=read(P.spin),Audit=read(P.visual),SSC=read(P.ssc),Gate=read(P.gate);
const entries=[
 ['L-SSC-028',4,'L01 §2 Eq.(2.1)','[V_beta,V_gamma]=V_delta <=> alpha_beta+alpha_gamma=alpha_delta','SOURCE_NORMALIZED_EXAMPLE_WITH_INTERACTION_INTERPRETATION','Lie structure constants and bracket root-domain guards remain unexpanded.'],
 ['L-SSC-030',9,'L01 §2.2.1 Eq.(2.8) and following','omega_L=omega_S−i*omega_T; omega_R=omega_S+i*omega_T; omega_R^tau=(omega_L^tau)*; sl(2,C)-valued left/right blocks are not independent, with exact source generator tau reality roles','SOURCE_CHIRAL_REAL_FORM_DEPENDENCY','Exact complex generator-index AST and spinor reality conditions remain uncompiled.'],
 ['L-SSC-033',22,'L01 §2.2.3–§2.4.2 original T triality','D4 triality T^3=1 cycles 8s+,8s-,8v; the later embedded E8 source matrix T is a somewhat arbitrary choice leaving W^3 and color invariant; physical second/third charge/spin assignments work only under equivalence by T','SOURCE_TENTATIVE_GENERATION_AND_CHARGE_EQUIVALENCE_GUARD','Full 8x8 E8 triality matrix and action on all root/weight role types not independently reconstructed.'],
 ['L-SSC-039',24,'L01 §3.1 Eqs.(3.3),(3.4),(3.5)','F^G=1/2*(R−(1/8)*e*e*phi^2); F^gw=T*phi−e*D(phi); F^ew=F^W+F^B1','SOURCE_EXACT_COEFFICIENT_AND_ORDERED_CURVATURE_G0','Full differential-form graded AST, spinor action and exact source proof of curvature decomposition not independently closed.'],
 ['L-SSC-040',24,'L01 §3.1 Eq.(3.6) and following','F^2=F^w+F^B2+F^x+F^g+xPhi*xPhi','SOURCE_NONSEPARABILITY_AND_MULTI_SECTOR_DEPENDENCY','Exact full xPhi products, coframes and mixed covariant derivative signs require separate source AST.'],
 ['L-SSC-042',25,'L01 §3.2 Eqs.(3.7),(3.8)','After varying B and substituting, Eq.(3.8) is the source action ONLY UP TO A BOUNDARY TERM relative to Eq.(3.7)','SOURCE_ACTION_BOUNDARY_TERM_CONDITIONAL_EQUIVALENCE','Complete BF multiplier types, variation domain, boundary terms and Hodge/integration closure are open.'],
 ['L-SSC-043',26,'L01 §3.2.1 gravitational variation','<R R gamma>=d(... Chern-Simons ...), DROP boundary, then Palatini SG=(1/(16piG))*int epsilon phi^2*(R−(3/2)*phi^2); Lambda=(3/4)*phi^2','SOURCE_COSMOLOGICAL_CONSTANT_AND_MOD_BOUNDARY_DERIVATION','Original author chooses background and action, no mathematically qualified full variational equivalence under all field/boundary conditions.']
];
function verify(s=S){
 const issues=[],ck=(v,m)=>{if(!v)issues.push(m)};
 ck(s.schema==='isograph.lisi-l01-seven-source-math-modality-atoms-g0.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.authority===false,'source-only L G0 packet');
 ck(s.status==='SEVEN_SOURCE_LOWERING_AND_MODALITY_CANDIDATES_PRIMARY_PDF_VISUALLY_CHECKED_NOT_CORE_CLOSED'&&s.source_complete===false&&s.G1_authorized===false&&s.external_review_passed===false,'no blanket source qualification');
 ck(s.source?.id==='L01'&&s.source?.frozen_revision==='arXiv:0711.0770v1 dated 2007-11-06'&&s.source?.url==='https://arxiv.org/pdf/0711.0770v1'&&s.source?.pdf_page_zero_based_same_printed===true,'source revision/pages frozen exactly');
 for(const [key,p] of [['SSC0_18',P.ssc],['page_31_audit',P.visual],['gate0_18',P.gate]])ck(s.predecessors?.[key]?.path===p&&s.predecessors[key].git_blob_sha===sha(p),'source versioned predecessor '+key);
 ck(Audit.page_ledger.length===31&&Audit.source?.arxiv==='0711.0770v1'&&Audit.coverage_count?.complete_source_item_cold_reconstructions===0,'source page visually reviewed, not all formulas complete');
 ck(SSC.items.length===191&&SSC.status==='L_G0_SOURCE_SSC_0_18_L01_EIGHT_SOURCE_EQ_LOCATOR_FIXES_PARTIAL_UNFROZEN'&&SSC.guards.source_census_freeze_complete===false&&Gate.current_lawful_state.G1_authorized===false,'current source census partial');
 const rows=s.seven_source_claim_packets||[];
 ck(rows.length===7&&J(rows.map(x=>x.id))===J(entries.map(x=>x[0])),'seven independent source assertions exact order');
 for(let i=0;i<entries.length;i++){
  const [id,page,locator,excerpt,kind,open]=entries[i],row=rows[i]||{},item=SSC.items.find(x=>x.id===id);
  ck(row.id===id&&row.pdf_page===page&&row.locator===locator&&item?.source_provenance===locator.replace(/.*§2\.2\.1 Eq\.\(2\.8\) and following$/,'L01 §2.2.1')||id!=='L-SSC-030','source row id, page and locators '+id);
  ck(row.id===id&&row.pdf_page===page&&row.locator===locator,'exact independent frozen source location '+id);
  ck(row.source_exact_excerpt===excerpt,'source formula literal sign/phase/guard '+id);
  ck(row.type===kind&&row.open===open,'source modality/unexpanded primitive owner '+id);
  ck(typeof row.statement==='string'&&row.statement.length>40,'retain substantive source statement '+id);
  ck(item?.body?.length>45&&item?.representation_closure==='NOT_YET_ASSIGNED_POST_COMPILATION','not G1/Core closed '+id);
 }
 const sign=rows.find(x=>x.id==='L-SSC-030');
 ck(sign?.statement?.includes('omega_L=omega_S−i*omega_T')&&sign.statement.includes('omega_R=omega_S+i*omega_T')&&sign.statement.includes('omega_R^tau=complex_conjugate(omega_L^tau)')&&sign.statement.includes('NOT independent'),'L01 exact opposed source signs and L/R reality coupling');
 ck(s.source_fidelity_refinement?.stage==='G0'&&s.source_fidelity_refinement?.source_L01_pdf_page_zero_based===9&&s.source_fidelity_refinement?.mathematical_reality_conditions_fully_qualified===false&&s.source_fidelity_refinement?.other_six_claims_unchanged===true,'retain latest L01 sign correction scope');
 ck(rows[0].statement.includes('not a source-independent normalization')&&rows[2].statement.includes('tentative')&&rows[3].statement.includes('1/8')&&rows[4].statement.includes('not four independent')===false,'source positive/negative normalization, triality, curvature limits');
 ck(rows[4].statement.includes('not four independent closed decomposition pieces'),'xPhi shared nonseparability');
 ck(rows[5].statement.includes('do not assert unrestricted equality')&&rows[6].statement.includes('modulo the dropped term'),'BF and gravitational modulo-boundary scope');
 ck(s.conservation_rule!==undefined&&s.qualification!==undefined,'explicit source-only conservation + no-promotion');
 ck(Spin.frozen_source?.verbatim_source_statement==='The Spin^+(3,1) Lie group of gravity, with Lie algebra so(3,1), is neither simple nor compact — it is isomorphic to SL(2,C) = SL(2,R) × SL(2,R).','separate printed real-group error kept unchanged');
 ck(Spin.independent_group_center_certificate?.center_order_left===2&&Spin.independent_group_center_certificate?.center_order_right===4&&Spin.independent_real_Lie_algebra_certificate.signature_sl2C_R?.negative===3&&Spin.independent_real_Lie_algebra_certificate.signature_sl2R_plus_sl2R?.negative===2,'exact independent scope real form not falsely harmonized');
 ck(Spin.source_disposition.no_claim_full_2007_E8_model_invalid===true&&Spin.qualification_boundary.L_G1_through_G7_authorized===false,'single real group source inconsistency cannot condemn all E8');
 ck(!J(s).includes('W-SSC-')&&s.future_source_audit!==undefined,'no W source import and source remaining open');
 return issues;
}
const initial=verify(),errors=[...initial],mutants=[
 ['erase root-source normalized guard',s=>{s.seven_source_claim_packets[0].statement='every root bracket has N=1'}],
 ['swap root-source printed sign',s=>{s.seven_source_claim_packets[0].source_exact_excerpt='[V_beta,V_gamma]=0'}],
 ['erase chiral complex minus',s=>{s.seven_source_claim_packets[1].source_exact_excerpt=s.seven_source_claim_packets[1].source_exact_excerpt.replace('omega_S−i','omega_S+i')}],
 ['erase opposite chirality plus',s=>{s.seven_source_claim_packets[1].source_exact_excerpt=s.seven_source_claim_packets[1].source_exact_excerpt.replace('omega_R=omega_S+i','omega_R=omega_S−i')}],
 ['false L/R independent',s=>{s.seven_source_claim_packets[1].statement=s.seven_source_claim_packets[1].statement.replace('NOT independent','INDEPENDENT')}],
 ['drop omega reality',s=>{s.seven_source_claim_packets[1].statement=s.seven_source_claim_packets[1].statement.replace('omega_R^tau=complex_conjugate(omega_L^tau)','unknown')}],
 ['canonical physical triality',s=>{s.seven_source_claim_packets[2].statement='canonical unique generations and charges'}],
 ['erase 1/8',s=>{s.seven_source_claim_packets[3].source_exact_excerpt=s.seven_source_claim_packets[3].source_exact_excerpt.replace('(1/8)','(1/4)')}],
 ['change mixed source sign',s=>{s.seven_source_claim_packets[3].source_exact_excerpt=s.seven_source_claim_packets[3].source_exact_excerpt.replace('−e*D(phi)','+e*D(phi)')}],
 ['hide xPhi multi-sector',s=>{s.seven_source_claim_packets[4].statement='four independent closed decomposition pieces'}],
 ['erase BF modulo boundary',s=>{s.seven_source_claim_packets[5].source_exact_excerpt='Eq3.8 unrestricted equality'}],
 ['erase CS dropped term',s=>{s.seven_source_claim_packets[6].statement='full exact action identity'}],
 ['flip Lambda coefficient',s=>{s.seven_source_claim_packets[6].source_exact_excerpt=s.seven_source_claim_packets[6].source_exact_excerpt.replace('(3/4)','(1/4)')}],
 ['wrong original paper revision',s=>{s.source.frozen_revision='arXiv:0711.0770v2'}],
 ['wrong source page',s=>{s.seven_source_claim_packets[6].pdf_page=25}],
 ['wrong pinned census SHA',s=>{s.predecessors.SSC0_18.git_blob_sha='stale'}],
 ['wrong page audit SHA',s=>{s.predecessors.page_31_audit.git_blob_sha='stale'}],
 ['external review fabricated',s=>{s.external_review_passed=true}],
 ['promote G1',s=>{s.G1_authorized=true}],
 ['declare source complete',s=>{s.source_complete=true}],
 ['change full source claim',s=>{s.status='QUALIFIED_E8'}],
 ['unbound foreign source',s=>{s.seven_source_claim_packets[2].statement+=' W-SSC-103'}]
];
let rejected=0;
if(!initial.length)for(const [name,mutate]of mutants){const c=cp(S),prev=J(c);mutate(c);if(J(c)===prev)errors.push('MUTANT NOOP '+name);else if(verify(c).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-source-seven-literals-cold-v0.1',pass:errors.length===0,errors,L01_source_rows:7,pdf_total_pages:31,source_items:191,adversarial_defined:mutants.length,adversarial_rejected:rejected,baseline_gate:initial.length?'NOT_TESTED_BASELINE_FAILURE':'TESTED',author_source_corrected:false,G1_to_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
