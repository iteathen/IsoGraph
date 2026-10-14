import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={old:L+'SOURCE_SEMANTIC_CENSUS_0_18.json',new:L+'SOURCE_SEMANTIC_CENSUS_0_19.json',
 seven:L+'LISI_L01_SEVEN_SOURCE_MODALITY_ASSERTIONS_G0_0_1.json',
 spin:L+'LISI_L01_SPIN_REAL_GROUP_ISOMORPHISM_SOURCE_DEFECT_G0_0_1.json',
 visual:L+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_18.json',
 sourceVerifier:E+'tools/verify-l-g0-l01-seven-modalities-0-1.mjs',
 spinVerifier:E+'tools/verify-l-g0-l01-spin-real-form-source-0-1.mjs'};
const parse=p=>JSON.parse(fs.readFileSync(p,'utf8')),cp=x=>JSON.parse(JSON.stringify(x)),J=JSON.stringify;
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=parse(P.old),cur=parse(P.new),seven=parse(P.seven),spin=parse(P.spin),gate=parse(P.gate);
const ids=['L-SSC-028','L-SSC-030','L-SSC-033','L-SSC-039','L-SSC-040','L-SSC-042','L-SSC-043'];
const exactBodyFragments={
 'L-SSC-028':['SOURCE-FIDELITY REOPEN:','[V_beta,V_gamma]=V_delta','NOT supply globally normalized structure constants','root-domain guards'],
 'L-SSC-030':['omega_L=omega_S−i*omega_T','omega_R=omega_S+i*omega_T','omega_R^tau=conj(omega_L^tau)','NOT independent','Z(SL2C)','order 4','(3+,3−)','(4+,2−)','whole E8 proposal'],
 'L-SSC-033':['somewhat arbitrary','equivalent UNDER T','tentative'],
 'L-SSC-039':['1/2','MINUS 1/8','T*phi−e*D(phi)','F^W+F^B1'],
 'L-SSC-040':['xPhi*xPhi','does NOT easily separate','multiple so(8) sectors'],
 'L-SSC-042':['ONLY UP TO A BOUNDARY TERM','unconstrained functional equality'],
 'L-SSC-043':['Chern-Simons','Lambda=(3/4)*phi²','conditional source context','unconditional exact action']
};
function verify(s=cur){
 const errors=[],ok=(v,msg)=>{if(!v)errors.push(msg)};
 const rev=s.revision||{},guards=s.guards||{};
 ok(s.schema==='woit-lisi.track-l.source-semantic-census.v0.19'&&s.status==='L_G0_SSC_0_19_SEVEN_L01_SOURCE_MODALITIES_AND_REAL_SPIN_COUNTEREXAMPLE_PARTIAL_UNFROZEN','G0 SSC0.19 exact scope');
 ok(s.item_count===191&&s.items?.length===191&&J(s.items.map(x=>x.id))===J(old.items.map(x=>x.id)),'191 stable source identities and order');
 ok(J(s.items.map((x,i)=>J(x)!==J(old.items[i])?x.id:null).filter(Boolean))===J(ids),'exact seven current source body changes');
 ok(old.items.filter(x=>!ids.includes(x.id)).every(x=>J(x)===J(s.items.find(z=>z.id===x.id))),'all 184 unrelated full source records conserved');
 ok(rev.id==='L_SSC_0_19_SEVEN_L01_SOURCE_MODALITY_G0_REPLAY'&&rev.predecessor_path===P.old&&rev.predecessor_git_blob_sha===sha(P.old),'exact source-parent revision');
 ok(J(rev.changed_source_items)===J(ids)&&rev.unchanged_source_items===184&&rev.source_prefix_conservation_seven_items===true,'source census conservation metadata');
 for(const [field,p] of [['L01_source_modality_packet',P.seven],['L01_real_group_discrepancy',P.spin],['L01_visual_31_page_audit',P.visual],['prior_procedural_gate',P.gate],['modality_source_verifier',P.sourceVerifier],['real_spin_source_verifier',P.spinVerifier]]){
   ok(rev[field]?.path===p&&rev[field]?.git_blob_sha===sha(p),'all exact artifact/file provenance '+field);
 }
 ok(rev.exact_current_source_CI?.id===37870344713&&rev.exact_current_source_CI?.conclusion==='success'&&rev.exact_current_source_CI?.source_rows===7&&rev.exact_current_source_CI?.adversarial_rejected===22&&rev.exact_current_source_CI?.external_review_passed===false,'correct preliminary source CI scope');
 ok(rev.source_assertions_preserved_no_math_fix===true&&rev.full_L01_L06_source_complete===false&&rev.source_census_frozen===false&&rev.G1_authorized===false&&rev.global_qualified_module_promotion===false,'no source error repaired/premature promotion');
 ok(guards.L01_seven_source_modalities_literal_G0_CI_verified===true&&guards.L01_real_sl2C_vs_two_sl2R_source_math_discrepancy_preserved===true&&guards.L01_chiral_omega_opposite_complex_sign_and_reality_condition_conserved===true,'seven-source correction and real group certificate');
 for(const key of ['L01_real_group_source_assertion_author_correction_known','L01_all_source_formula_bindings_fully_qualified','L01_source_30_obligation_completeness_proved','source_census_freeze_complete','whole_L_source_cold_audit_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ok(guards[key]===false,'unclosed source/authority '+key);
 ok(guards.L01_7_additional_source_formula_gaps_remain_open===true&&gate.current_lawful_state?.G1_authorized===false,'other exact AST gaps still unresolved');
 for(const id of ids){
   const o=old.items.find(x=>x.id===id),v=s.items.find(x=>x.id===id);
   if(!o||!v){errors.push('MISSING source item '+id);continue}
   const r=seven.seven_source_claim_packets.find(x=>x.id===id);
   ok(v.source_provenance===o.source_provenance&&v.body.startsWith(o.body+' G0 SOURCE-FIDELITY REOPEN: '),'original source body exact retained with additive G0 qualifier '+id);
   for(const phrase of exactBodyFragments[id])ok(v.body.includes(phrase),'L01 full source literal/negative scope '+id+':'+phrase);
   const b=v.source_expression_census?.L01_seven_source_modality_G0||{};
   ok(b.source_packet?.path===P.seven&&b.source_packet?.git_blob_sha===sha(P.seven)&&b.full_visual_source?.path===P.visual&&b.full_visual_source?.git_blob_sha===sha(P.visual),'item exact source packet and page provenance '+id);
   ok(b.source_scope===r.locator&&b.source_exact_excerpt===r.source_exact_excerpt&&b.source_logical_force===r.type&&b.source_modality_statement===r.statement&&b.unexpanded_semantics===r.open,'item source assertions/formula types preserved '+id);
   ok(b.primary_source?.id==='L01'&&b.primary_source?.revision==='arXiv:0711.0770v1'&&b.primary_source?.zero_based_pdf_page===r.pdf_page,'item original arxiv and exact PDF page '+id);
   ok(b.exact_source_verifier_run?.id===37870344713&&b.exact_source_verifier_run?.adversarial_rejected===22&&b.exact_source_verifier_run?.external_cold_review_passed===false,'item CI research evidence '+id);
   ok(b.author_positive_body_preserved_as_prefix===true&&b.full_source_AST_reconstructed===false&&b.scope_mathematically_qualified===false&&b.G1_authorized===false,'item native primitive/source full closure denied '+id);
 }
 const spinItem=s.items.find(x=>x.id==='L-SSC-030')?.source_expression_census?.L01_real_spin_source_discrepancy||{};
 ok(spinItem.source_falsifier?.path===P.spin&&spinItem.source_falsifier?.git_blob_sha===sha(P.spin),'real group falsifier exact source blob');
 ok(spinItem.printed_statement===spin.frozen_source.verbatim_source_statement&&J(spinItem.exact_group_center_orders)===J([2,4])&&J(spinItem.exact_real_Killing_inertias)===J([[3,3],[4,2]]),'real group strict mathematical category and independent counterexamples');
 ok(spinItem.mathematically_false_under_stated_real_direct_product===true&&spinItem.author_source_unchanged===true&&spinItem.whole_E8_model_refuted===false&&spinItem.G1_authorized===false&&spinItem.external_review_passed===false,'negative single equality cannot become whole-program assertion');
 ok(!J(s).includes('W-SSC-'),'track L firewall against W imported source');
 return errors;
}
const base=verify(),errors=[...base],mutants=[
 ['erase L030',x=>{x.items=x.items.filter(z=>z.id!=='L-SSC-030')}],
 ['recycle L030 identity',x=>{x.items.find(z=>z.id==='L-SSC-030').id='L-SSC-028'}],
 ['erase unrelated L133',x=>{x.items.find(z=>z.id==='L-SSC-133').body='lost'}],
 ['tamper previous full L030 body',x=>{x.items.find(z=>z.id==='L-SSC-030').body='new body only'}],
 ['erase chiral minus',x=>{x.items.find(z=>z.id==='L-SSC-030').body=x.items.find(z=>z.id==='L-SSC-030').body.replace('omega_L=omega_S−i','omega_L=omega_S+i')}],
 ['erase chiral plus',x=>{x.items.find(z=>z.id==='L-SSC-030').body=x.items.find(z=>z.id==='L-SSC-030').body.replace('omega_R=omega_S+i','omega_R=omega_S−i')}],
 ['silence chiral reality',x=>{x.items.find(z=>z.id==='L-SSC-030').source_expression_census.L01_seven_source_modality_G0.source_exact_excerpt='L,R independent'}],
 ['reinterpret SL2R real product as valid',x=>{x.items.find(z=>z.id==='L-SSC-030').source_expression_census.L01_real_spin_source_discrepancy.mathematically_false_under_stated_real_direct_product=false}],
 ['erase center difference',x=>{x.items.find(z=>z.id==='L-SSC-030').source_expression_census.L01_real_spin_source_discrepancy.exact_group_center_orders=[2,2]}],
 ['entire E8 rejected',x=>{x.items.find(z=>z.id==='L-SSC-030').source_expression_census.L01_real_spin_source_discrepancy.whole_E8_model_refuted=true}],
 ['wrong source packet SHA',x=>{x.revision.L01_source_modality_packet.git_blob_sha='bad'}],
 ['wrong center proof SHA',x=>{x.revision.L01_real_group_discrepancy.git_blob_sha='bad'}],
 ['wrong old SSC SHA',x=>{x.revision.predecessor_git_blob_sha='bad'}],
 ['alter 7 source ID list',x=>{x.revision.changed_source_items.pop()}],
 ['erase Eq2 root guard',x=>{x.items.find(z=>z.id==='L-SSC-028').body=x.items.find(z=>z.id==='L-SSC-028').body.replace('NOT supply globally normalized structure constants','always N=1')}],
 ['erase triality qualification',x=>{x.items.find(z=>z.id==='L-SSC-033').body=x.items.find(z=>z.id==='L-SSC-033').body.replace('tentative','established')}],
 ['flip Fgw source sign',x=>{x.items.find(z=>z.id==='L-SSC-039').body=x.items.find(z=>z.id==='L-SSC-039').body.replace('T*phi−e*D(phi)','T*phi+e*D(phi)')}],
 ['erase xPhi sector coupling',x=>{x.items.find(z=>z.id==='L-SSC-040').body=x.items.find(z=>z.id==='L-SSC-040').body.replace('does NOT easily separate','decomposes independently')}],
 ['erase boundary qualification',x=>{x.items.find(z=>z.id==='L-SSC-042').body=x.items.find(z=>z.id==='L-SSC-042').body.replace('ONLY UP TO A BOUNDARY TERM','always equal')}],
 ['change cosmological constant factor',x=>{x.items.find(z=>z.id==='L-SSC-043').body=x.items.find(z=>z.id==='L-SSC-043').body.replace('Lambda=(3/4)*phi²','Lambda=(1/4)*phi²')}],
 ['claim G0 source complete',x=>{x.guards.source_census_freeze_complete=true}],
 ['claim G1 authorized',x=>{x.revision.G1_authorized=true}],
 ['claim external review',x=>{x.revision.exact_current_source_CI.external_review_passed=true}],
 ['smuggle W source',x=>{x.items.find(z=>z.id==='L-SSC-030').body+=' W-SSC-103'}]
];
let rejected=0;
if(!base.length)for(const [name,fn]of mutants){const x=cp(cur),before=J(x);fn(x);if(J(x)===before)errors.push('NOOP mutation '+name);else if(verify(x).length===0)errors.push('ESCAPED mutation '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-seven-ssc019-source-conservation.v0.1',pass:errors.length===0,errors,source_items:191,changed:ids,unchanged:184,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED_NO_MUTATIONS':'TESTED',G0_complete:false,G1_to_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
