import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
packet:L+'LISI_L05_EQ4_CYCLIC_SOURCE_G0_0_1.json',
table:L+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_14.json',
gate:E+'L_CURRENT_STAGE_GATE_0_15.json',
eq2:E+'L126_L05_EQ2_EQ3_OCTONION_CLIFFORD_SOURCE_CONTRADICTION_0_1.json'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const packet=read(paths.packet),source=read(paths.table),ssc=read(paths.ssc),gate=read(paths.gate);
const sign=i=>i===0?1:-1;
function expr(t,a,b,c){
 function M(left,right,out){
  const x=t.entries?.[left]?.[right];
  if(!/^-?e[0-7]$/.test(x))throw Error('invalid literal source multiplication table cell');
  if(Number(x.slice(-1))>=t.dimension)throw Error('source coefficient output outside carrier');
  return Number(x.slice(-1))===out?(x[0]==='-'?-1:1):0;
 }
 return [
  sign(b)*M(c,a,b),
  sign(c)*M(a,b,c),
  sign(a)*sign(c)*M(a,c,b),
  sign(c)*sign(b)*M(c,b,a)
 ];
}
function enumerate(t){
 const bad=[],total=t.dimension**3;
 for(let a=0;a<t.dimension;a++)for(let b=0;b<t.dimension;b++)for(let c=0;c<t.dimension;c++){
  const v=expr(t,a,b,c);
  if(v.some(x=>x!==v[0]))bad.push({a,b,c,terms:v});
 }
 return{carrier:t.carrier,total,bad};
}
function sourceVerifier(pkt=packet,t=source){
 const errors=[],ck=(b,m)=>{if(!b)errors.push(m)},s=pkt.source_exact_Eq4||{},ev=pkt.finite_evidence||{},guards=pkt.negative_scope_guards||{};
 ck(pkt.schema==='isograph.lisi-l05-eq4-cyclic-source-ordinary-g0.v0.1'&&pkt.track==='L'&&pkt.stage==='G0'&&pkt.authority===false&&pkt.G1_authorized===false,'L source G0 research only');
 ck(pkt.source?.id==='L05'&&pkt.source?.printed_page===4&&pkt.source?.pdf_zero_based_page===3&&pkt.source?.section==='§2 Eq.(4)','frozen source exact section/equation');
 ck(pkt.source_census_frozen===false&&pkt.source_complete===false&&pkt.external_cold_review_passed===false,'no external/source qualification');
 for(const [name,sourcePath]of [['ordinary_tables',paths.table],['ssc_014',paths.ssc],['gate_015',paths.gate],['Eq2_Eq3_defect',paths.eq2]])
  ck(pkt.upstream?.[name]?.path===sourcePath&&pkt.upstream?.[name]?.git_blob_sha===sha(sourcePath),'exact source pin '+name);
 ck(ssc.items.length===191&&ssc.guards.source_census_freeze_complete===false&&gate.current_lawful_state.G1_authorized===false,'upstream SSC and G0 gate not promoted');
 ck(s.printed_eight_member_equality==='barGamma_{a b c} = barGamma_{b c a} = Gamma_{a c b} = Gamma_{c b a} = M_{c a}^{tilde b} = M_{a b}^{tilde c} = M_{tilde a tilde c}^{b} = M_{tilde c tilde b}^{a}','all eight printed source equalities conserved with operand order');
 ck(s.tested_subscope==='SOURCE_FOUR_EXPLICIT_M_COEFFICIENT_MEMBERS_ONLY; all four Gamma/barGamma lowered-index members remain independent untested obligations','four M expressions not entire Eq4');
 ck(s.binders==='a,b,c independently range 0..n-1 for each source ordinary carrier; all three positions are FREE for equality, not summed','all exact binders free/unsummed');
 ck(s.ordinary_metric==='n_ab=delta_ab in ordinary C,H,O; no signature-adjusted split index lowering inferred','source ordinary vs split metric scope');
 ck(s.sig==='sigma(0)=+1; sigma(i>0)=-1','tilde sign');
 const formulas=[
  ['M_{c a}^{tilde b}','sigma(b)*coeff(c,a,b)'],
  ['M_{a b}^{tilde c}','sigma(c)*coeff(a,b,c)'],
  ['M_{tilde a tilde c}^{b}','sigma(a)*sigma(c)*coeff(a,c,b)'],
  ['M_{tilde c tilde b}^{a}','sigma(c)*sigma(b)*coeff(c,b,a)']
 ];
 ck(j(s.members?.map(x=>[x.source,x.exact_calculation]))===j(formulas),'all four ordered M source coefficient formulas');
 ck(j(t.basis_multiplication_tables.map(x=>x.carrier))===j(['C','C_split','H','H_split','O','O_split']),'complete unchanged 6 source table names');
 const T={};
 try{for(const name of ['C','H','O'])T[name]=enumerate(t.basis_multiplication_tables.find(x=>x.carrier===name));}
 catch(e){errors.push('source exact finite computation fail '+e.message);return errors;}
 for(const name of ['C','H']){
  ck(T[name].bad.length===0&&ev['ordinary_'+name]?.index_triples===T[name].total&&ev['ordinary_'+name]?.contradicting_triples===0,'ordinary positive control '+name);
 }
 const O=T.O,z=ev.ordinary_O||{};
 ck(O.total===512&&O.bad.length===4&&z.dimension===8&&z.index_triples===512&&z.contradicting_triples===4&&z.other_triples_consistent===508,'ordinary O 4 exact negative witnesses');
 ck(j(O.bad)===j(z.counterexamples),'all 4 counterexamples preserve source row/col and index ordering');
 const frozen=t.basis_multiplication_tables.find(x=>x.carrier==='O');
 ck(frozen.entries[6][7]==='-e2'&&frozen.entries[7][6]==='-e2'&&guards.source_Eq1_journal_cells==='e6*e7=-e2 AND e7*e6=-e2, preserved','original frozen signed O cells not normalized');
 const fix=cp(frozen);fix.entries[6][7]='e2';const newO=enumerate(fix);
 ck(newO.bad.length===0&&ev.counterfactual_NOT_SOURCE?.contradicting_triples===0&&ev.counterfactual_NOT_SOURCE?.source_literal_mutated===false&&ev.counterfactual_NOT_SOURCE?.modality==='MATHEMATICAL_COUNTERFACTUAL_NOT_FROZEN_ARTICLE_OR_AUTHOR_ERRATUM','hypothetical edit negative source authority');
 ck(guards.whole_eight_member_Eq4_qualified===false&&guards.ordinary_O_M_four_member_equality_true===false&&guards.source_syntax_complete_G0===false,'no math authority or source completion');
 ck(guards.split_C_H_O_signature_sufficiency?.startsWith('NOT_TESTED;')&&s.scope_caution?.includes('split-Clifford'),'split n_ab lowering remains open');
 ck(guards.source_Eq2_barGamma_discrepancy?.includes('two coefficients')&&guards.source_Eq3_anticommutator_failures?.includes('7/36')&&guards.source_Eq5_reverse_antisymmetry_and_Lie_nonclosure?.includes('168/378'),'prior three negative source findings preserved');
 ck(guards.cross_track_semantics_imported===false&&!j(pkt).includes('W-SSC-'),'track independence');
 ck(pkt.next_lawful_work?.some(x=>x.includes('G0 zero-change'))===false&&pkt.next_lawful_work?.some(x=>x.includes('Complete source audit')),'source method boundary and no false fixed point');
 return errors;
}
const baseline=sourceVerifier(),errors=[...baseline],mutants=[
 ['omit Eq4 source term',p=>{p.source_exact_Eq4.members.pop()}],
 ['mutate output tilde',p=>{p.source_exact_Eq4.members[0].exact_calculation='coeff(c,a,b)'}],
 ['reverse M source input',p=>{p.source_exact_Eq4.members[1].exact_calculation='sigma(c)*coeff(b,a,c)'}],
 ['flip M3 index roles',p=>{p.source_exact_Eq4.members[2].source='M_{tilde c tilde a}^{b}'}],
 ['flip M4 coefficient sign',p=>{p.source_exact_Eq4.members[3].exact_calculation='-sigma(c)*sigma(b)*coeff(c,b,a)'}],
 ['erase one explicit counterexample',p=>{p.finite_evidence.ordinary_O.counterexamples.pop()}],
 ['swap counterexample binder',p=>{p.finite_evidence.ordinary_O.counterexamples[0].a=6}],
 ['change counterexample sign',p=>{p.finite_evidence.ordinary_O.counterexamples[1].terms[2]=1}],
 ['falsify source C control',p=>{p.finite_evidence.ordinary_C.contradicting_triples=1}],
 ['falsify H control',p=>{p.finite_evidence.ordinary_H.contradicting_triples=1}],
 ['claim O cyclic equality',p=>{p.negative_scope_guards.ordinary_O_M_four_member_equality_true=true}],
 ['claim Eq4 whole theorem',p=>{p.negative_scope_guards.whole_eight_member_Eq4_qualified=true}],
 ['erase split type guard',p=>{p.negative_scope_guards.split_C_H_O_signature_sufficiency='TESTED_AND_PASS'}],
 ['erase M-only scope',p=>{p.source_exact_Eq4.tested_subscope='ALL_EIGHT_TESTED'}],
 ['pretend metric split ordinary',p=>{p.source_exact_Eq4.ordinary_metric='all carriers delta'}],
 ['source table edit',(_p,t)=>{t.basis_multiplication_tables.find(x=>x.carrier==='O').entries[6][7]='e2'}],
 ['unrelated H table edit',(_p,t)=>{t.basis_multiplication_tables.find(x=>x.carrier==='H').entries[1][2]='-e3'}],
 ['change source version',p=>{p.source.frozen_published='2026-09-10 other paper'}],
 ['source qualification',p=>{p.source_census_frozen=true}],
 ['G1 premature',p=>{p.G1_authorized=true}],
 ['external cold fabricated',p=>{p.external_cold_review_passed=true}],
 ['lose parent SSC pin',p=>{p.upstream.ssc_014.git_blob_sha='stale'}],
 ['import W',p=>{p.source.id='W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const p=cp(packet),t=cp(source),before=j([p,t]);fn(p,t);if(j([p,t])===before)errors.push('no-op mutation '+name);else if(sourceVerifier(p,t).length===0)errors.push('escaped mutation '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-eq4-source-ordinary-g0.v0.1',pass:errors.length===0,errors,positive_C_triples:8,positive_H_triples:64,ordinary_O_triples:512,ordinary_O_counterexamples:4,source_lowered_Gamma_members_tested:false,split_source_cases_tested:false,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILURE':'TESTED',G1_authorized:false,external_cold_review_passed:false},null,2));if(errors.length)process.exitCode=1;
