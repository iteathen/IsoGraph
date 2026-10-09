import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={
 old:L+'SOURCE_SEMANTIC_CENSUS_0_23.json', now:L+'SOURCE_SEMANTIC_CENSUS_0_24.json',
 source:L+'LISI_L01_TABLE5_D4_ROOT_TRIALITY_SOURCE_G0_0_1.json',
 verifier:E+'tools/verify-l-g0-l01-table5-d4-triality-source-0-1.mjs',
 gate:E+'L_CURRENT_STAGE_GATE_0_23.json',
 defect:E+'L01_TABLE5_D4_VERIFIER_F4_NONCLAIM_BASELINE_DEFECT_0_1.json'
};
const load=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,clone=x=>JSON.parse(j(x));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const old=load(p.old),now=load(p.now),src=load(p.source),gate=load(p.gate);
const item=(c,id)=>c.items?.find(x=>x.id===id);
const fmt=r=>r.id+'(wedge='+r.coordinate_numerators_over_2.wedge.join(',')+';vee='+r.coordinate_numerators_over_2.vee.join(',')+')';
const oldPhrase="The original 8x8 positive-chiral H1 connection's detailed field entries, the 24 source Table5 D4 roots, all eight 8Splus fermion weights, triality root transports, the proposed physical curvature dynamics, full source primitive reduction and all L01-L06 G0 source obligations remain OPEN.";
const replacement="The original 8x8 positive-chiral H1 connection's detailed field entries, complete D4 root-generator Lie brackets, triality transport beyond the finite Table5/Table6 coordinate permutation, physical curvature dynamics, full primitive reductions, and all other L01-L06 source obligations remain OPEN. The 24 Table5 bosonic D4 root coordinates, eight distinct 8Splus weights, and corresponding finite triality weights are now SOURCE-TRANSCRIBED and FINITELY TESTED at G0 only, not primitive or mathematical Lie closure.";
function verify(c=now){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)},r=c.revision||{},g=c.guards||{};
 const n32=item(c,'L-SSC-032'),n33=item(c,'L-SSC-033'),b32=item(old,'L-SSC-032'),b33=item(old,'L-SSC-033');
 ck(c.schema==='woit-lisi.track-l.source-semantic-census.v0.24'&&c.status?.includes('G0')&&c.status?.includes('UNFROZEN'),'current G0 only');
 ck(c.items?.length===191&&c.item_count===191&&j(c.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'all stable 191 semantic IDs');
 ck(j(c.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-032','L-SSC-033']),'only two L01 source items changed');
 ck(old.items.filter(x=>!['L-SSC-032','L-SSC-033'].includes(x.id)).every(x=>j(x)===j(c.items.find(y=>y.id===x.id))),'all 189 complete other source records conserved');
 ck(Boolean(n32&&n33),'both source bodies preserved; no missing item');
 if(!n32||!n33)return errors;
 ck(b32.body.includes(oldPhrase)&&n32.body.startsWith(b32.body.replace(oldPhrase,replacement)+' '),'L032 exact old full body except obsolete source gap');
 ck(n33.body.startsWith(b33.body+' '),'L033 complete old source body prefix exactly conserved');
 ck(n32.body.includes('8Splus SPINOR')&&n32.body.includes('D4 BOSON'),'G0 source body distinguishes D4 roots and 8Splus spinors');
 for(const z of src.table5.bosonic_rows_ordered)ck(n32.body.includes(fmt(z)),'12 paired exact root expressions '+z.id);
 for(const z of src.table5.spinor8Splus_rows_ordered)ck(n32.body.includes(fmt(z)),'4 paired exact fermion expressions '+z.id);
 for(const z of src.table6_source_companion.eight_rows_expected)ck(n33.body.includes(z.id+':'+z.source+'('+z.from+')='+z.expected.map(y=>'['+y.join(',')+']').join('/')),'8 Table6 source T / T² image labels '+z.id);
 for(const word of ['TENTATIVE','ARBITRARY','G1','8Splus','31/31'])ck((n32.body+' '+n33.body).includes(word),'source nonclaim and proof context '+word);
 ck(!j(n32).includes('W-SSC-')&&!j(n33).includes('W-SSC-'),'no W source semantics allowed');
 const x=n32.source_expression_census?.L01_D4_Table5_G0||{},y=n33.source_expression_census?.L01_D4_T3_Table6_G0||{};
 ck(x.packet?.path===p.source&&x.packet?.git_blob_sha===sha(p.source),'L032 original source packet exact Git hash');
 ck(x.verifier?.path===p.verifier&&x.verifier?.git_blob_sha===sha(p.verifier),'L032 source-checker exact Git hash');
 ck(j(x.header)===j(src.table5.header)&&x.signed_branch_binding===src.table5.signed_coordinate_encoding,'exact four Cartan axes and correlation');
 ck(j(x.boson_root_source_rows)===j(src.table5.bosonic_rows_ordered)&&j(x.spinor8Splus_weight_source_rows)===j(src.table5.spinor8Splus_rows_ordered),'all source rows exact order and typed roles');
 ck(x.finite_scope?.D4_boson_roots===24&&x.finite_scope?.spinor8Splus_weights===8&&x.full_D4_root_Lie_generator_qualification===false&&x.full_H1_positive_8x8_matrix_fields_verified===false&&x.G1_authorized===false,'limited L032 source scope');
 ck(x.CI?.id===37885282995&&x.CI?.adversarial_defined===31&&x.CI?.adversarial_rejected===31&&x.CI?.external_cold_review_passed===false,'scoped L032 finite source CI');
 ck(x.historical_failed_baseline?.id===37885206752&&x.historical_failed_baseline?.mutation_tests_executed===0&&x.historical_failed_baseline?.defect?.git_blob_sha===sha(p.defect),'failed L032 nonclaim fixture retained');
 ck(y.packet?.git_blob_sha===sha(p.source)&&y.dependency?.source_item==='L-SSC-032'&&y.dependency?.source_packet_git_blob_sha===sha(p.source),'L033 source-typed dependency on L032');
 ck(j(y.source_T)===j(src.triality_T)&&j(y.Table6_rows)===j(src.table6_source_companion.eight_rows_expected),'L033 source T and Table6 exact literal');
 ck(j(y.source_finite_counts)===j({boson:24,spin8Splus:8,spin8Sminus:8,vector8V:8,D4_fixed:6,D4_nontrivial_T_cycles:6,F4_candidate_points:48}),'L033 exact source finite-domain cardinality');
 ck(y.CI?.id===37885282995&&y.CI?.adversarial_rejected===31&&y.CI?.external_cold_review_passed===false,'L033 source CI no theorem promotion');
 ck(y.physics_generations_qualified===false&&y.full_F4_Lie_math_qualified===false&&y.G1_authorized===false,'physical/tangent F4 source boundary');
 ck(r.id==='L_SSC_0_24_L032_L033_TABLE5_D4_SOURCE_G0'&&r.predecessor_path===p.old&&r.predecessor_git_blob_sha===sha(p.old),'SSC0.24 original predecessor SHA');
 ck(j(r.changed_source_items)===j(['L-SSC-032','L-SSC-033'])&&r.unchanged_source_items===189,'189 unaffected old complete items');
 ck(r.source_packet?.path===p.source&&r.source_packet?.git_blob_sha===sha(p.source)&&r.source_verifier?.git_blob_sha===sha(p.verifier),'exact source artifact and checker SHA');
 ck(r.predecessor_gate?.path===p.gate&&r.predecessor_gate?.git_blob_sha===sha(p.gate),'gate0.23 dependency exact SHA');
 ck(r.verifier_baseline_defect?.path===p.defect&&r.verifier_baseline_defect?.git_blob_sha===sha(p.defect),'known source nonclaim checker defect retained');
 ck(r.historical_failure?.id===37885206752&&r.historical_failure?.mutation_tests_executed===0,'never count failed CI mutants');
 ck(r.CI?.id===37885282995&&r.CI?.conclusion==='success'&&r.CI?.adversarial_rejected===31&&r.CI?.external_cold_review_passed===false,'source CI verified no external claim');
 ck(r.source_census_frozen===false&&r.entire_L01_source_complete===false&&r.entire_L01_L06_source_complete===false&&r.G1_authorized===false&&r.global_Lie_math_qualified===false&&r.physical_generations_qualified===false,'G0 truly incomplete and unqualified');
 for(const name of ['L032_Table5_24_roots_8spinor_source_G0_verified','L033_D4_T3_Table6_source_G0_verified'])ck(g[name]===true,'scoped source success '+name);
 for(const name of ['L032_Table5_D4_all_roots_weights_source_complete','L032_full_positive_chiral_8x8_H1_source_reconstructed','L033_D4_F4_primitive_Lie_brackets_closed','L033_physical_three_generations_qualified','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ck(g[name]===false,'source-wide G0 barrier '+name);
 ck(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.G0_source_census_frozen===false,'gate0.23 itself G0');
 ck(item(c,'L-SSC-125')?.body.includes('BOTH e6 e7=-e2 and e7 e6=-e2'),'published L05 octonion conflict unchanged');
 ck(item(c,'L-SSC-030')?.body.includes('Spin')||item(c,'L-SSC-033')?.body.includes('real-Spin'),'frozen L01 negative real Spin evidence retained');
 return errors;
}
const base=verify(),errors=[...base],muts=[
 ['drop L032 root body',s=>{item(s,'L-SSC-032').body='ERASED'}],
 ['drop L033 body',s=>{item(s,'L-SSC-033').body='ERASED'}],
 ['erase L033 identity',s=>{s.items=s.items.filter(x=>x.id!=='L-SSC-033')}],
 ['erase L125 octonion conflict',s=>{item(s,'L-SSC-125').body='ERASED'}],
 ['erase L031 previous source',s=>{item(s,'L-SSC-031').body='ERASED'}],
 ['root sign flipped',s=>{item(s,'L-SSC-032').source_expression_census.L01_D4_Table5_G0.boson_root_source_rows[4].coordinate_numerators_over_2.wedge[0]=1}],
 ['8Splus lepton term changed',s=>{item(s,'L-SSC-032').source_expression_census.L01_D4_Table5_G0.spinor8Splus_weight_source_rows[0].id='nu_muL'}],
 ['erase full root text',s=>{item(s,'L-SSC-032').body=item(s,'L-SSC-032').body.replace('eT_phiOne','WRONG')}],
 ['erase T cycle',s=>{item(s,'L-SSC-033').source_expression_census.L01_D4_T3_Table6_G0.source_T.matrix[0][3]=0}],
 ['invent physical generation proof',s=>{item(s,'L-SSC-033').source_expression_census.L01_D4_T3_Table6_G0.physics_generations_qualified=true}],
 ['invent root Lie algebra proof',s=>{s.guards.L033_D4_F4_primitive_Lie_brackets_closed=true}],
 ['false full 8x8',s=>{s.guards.L032_full_positive_chiral_8x8_H1_source_reconstructed=true}],
 ['premature SSC freeze',s=>{s.guards.source_census_freeze_complete=true}],
 ['G1 illicit',s=>{s.revision.G1_authorized=true}],
 ['IA illicit',s=>{s.guards.recursive_IA_authorized=true}],
 ['old predecessor SHA modified',s=>{s.revision.predecessor_git_blob_sha='STALE'}],
 ['source verifier SHA tampered',s=>{s.revision.source_verifier.git_blob_sha='STALE'}],
 ['lost failed baseline',s=>{s.revision.historical_failure.mutation_tests_executed=31}],
 ['fake external review',s=>{s.revision.CI.external_cold_review_passed=true}],
 ['W track import',s=>{item(s,'L-SSC-033').body+=' W-SSC-102'}]
];
let rejected=0;
if(!base.length)for(const [name,fn]of muts){const x=clone(now),prev=j(x);fn(x);if(j(x)===prev)errors.push('no-op '+name);else if(verify(x).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-table5-ssc024-source-conservation.v0.1',pass:errors.length===0,errors,source_items:191,changed:['L-SSC-032','L-SSC-033'],unchanged:189,Table5_signed_rows:16,D4_roots:24,spin8Splus:8,Table6_rows:8,adversarial_defined:muts.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
