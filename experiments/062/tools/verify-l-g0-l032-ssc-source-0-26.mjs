import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={old:L+'SOURCE_SEMANTIC_CENSUS_0_25.json',new:L+'SOURCE_SEMANTIC_CENSUS_0_26.json',
 packet:L+'LISI_L01_H1_MIXED_TRACE_SQUARE_SIMILARITY_OBSTRUCTION_G0_0_1.json',
 check:E+'tools/verify-l-g0-l01-h1-mixed-trace-square-0-1.mjs',
 prior:L+'LISI_L01_H1_GAMMA_TO_PRINTED_RELATIVE_PHASE_DIAGNOSTIC_G0_0_1.json',
 priorCheck:E+'tools/verify-l-g0-l01-h1-gamma-relative-phase-0-1.mjs',
 gate:E+'L_CURRENT_STAGE_GATE_0_25.json'};
const get=f=>JSON.parse(fs.readFileSync(f,'utf8')),j=JSON.stringify,clone=x=>JSON.parse(j(x));
const gitsha=f=>{const b=fs.readFileSync(f);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const old=get(p.old),cur=get(p.new),Packet=get(p.packet),Gate=get(p.gate);
function verify(s=cur){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)},r=s.revision||{},guards=s.guards||{};
 const oldItem=old.items.find(x=>x.id==='L-SSC-032'),item=s.items?.find(x=>x.id==='L-SSC-032');
 ck(s.schema==='woit-lisi.track-l.source-semantic-census.v0.26'&&s.status==='L_G0_SSC_0_26_L032_H1_SAME_COEFFICIENT_TRACE_SQUARE_OBSTRUCTION_UNFROZEN','G0 only source candidate');
 ck(s.item_count===191&&s.items?.length===191&&j(s.items?.map(x=>x.id))===j(old.items.map(x=>x.id)),'all 191 unique source identities in same positions');
 ck(new Set(s.items?.map(x=>x.id)).size===191,'source identities unique, not just array cardinality');
 ck(j(s.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-032']),'only L032 changed from predecessor');
 ck(old.items.filter(x=>x.id!=='L-SSC-032').every(x=>j(x)===j(s.items.find(y=>y.id===x.id))),'190 old source items exact including L05 negative evidence');
 ck(r.id==='L_SSC_0_26_L032_H1_NATIVE_PRINTED_TRACE_SQUARE_G0'&&r.predecessor_path===p.old&&r.predecessor_git_blob_sha===gitsha(p.old)&&r.unchanged_source_items===190&&j(r.changed_source_items)===j(['L-SSC-032']),'exact predecessor source and one item conservation');
 for(const [field,path]of[['source_packet',p.packet],['source_verifier',p.check],['old_natural_diagnostic',p.prior],['old_natural_verifier',p.priorCheck],['predecessor_gate',p.gate]])
  ck(r[field]?.path===path&&r[field]?.git_blob_sha===gitsha(path),'exact source/dependency pin '+field);
 ck(r.CI?.basis_diagnostic?.run_id===37892025204&&r.CI?.basis_diagnostic?.conclusion==='success'&&r.CI?.basis_diagnostic?.adversarial_rejected===21,'baseline natural source CI');
 ck(r.CI?.trace_square?.run_id===37892401781&&r.CI?.trace_square?.conclusion==='success'&&r.CI?.trace_square?.adversarial_rejected===26&&r.CI?.trace_square?.exact_pairs===16&&r.CI?.external_cold_review_passed===false,'basis-independent matrix CI exact');
 ck(r.relation_scope==='FROZEN_EXACT_SAME_e_mu_phi_nu_COEFFICIENTS_AND_COMPLEX_SIMILARITY_ONLY'&&r.author_error_qualified===false,'original source author blame not licensed');
 ck(r.source_census_frozen===false&&r.full_source_census_complete===false&&r.G1_authorized===false&&Gate.current_lawful_state?.G1_authorized===false,'no higher stage authorized');
 ck(guards.L032_H1_native_to_printed_mixed_source_16_pair_traces_G0_verified===true&&guards.L032_H1_fixed_complex_similarity_alone_cannot_reconcile_coefficients===true,'strict proved source difference');
 for(const field of ['L032_H1_author_publication_math_error_ownership_known','L032_H1_source_relative_phase_author_repair_known','L032_16x16_Gamma_to_8x8_H1_basis_equivalence_qualified','L032_full_positive_chiral_8x8_H1_source_reconstructed','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])
 ck(guards[field]===false,'no unwarranted math/review promotion '+field);
 if(!item){errors.push('L032 MISSING: fail closed');return errors;}
 const r0=item.source_expression_census?.L01_H1_mixed_trace_square_G0||{},priorExpr=oldItem.source_expression_census||{},nowExpr=item.source_expression_census||{};
 ck(item.body.startsWith(oldItem.body+' '),'all preceding source text and negatives intact');
 ck(Object.keys(nowExpr).length===Object.keys(priorExpr).length+1,'exact one new source expression family only');
 for(const [name,expr]of Object.entries(priorExpr))ck(j(nowExpr[name])===j(expr),'all older exact L032 source blocks unchanged '+name);
 ck(r0.source_packet?.path===p.packet&&r0.source_packet?.git_blob_sha===gitsha(p.packet),'item source packet exact parent');
 ck(r0.math_verifier?.path===p.check&&r0.math_verifier?.git_blob_sha===gitsha(p.check),'item source verifier exact');
 ck(r0.prior_natural_phase_packet?.path===p.prior&&r0.prior_natural_phase_packet?.git_blob_sha===gitsha(p.prior),'item old source diagnostic preserved');
 ck(j(r0.finite_math)===j(Packet.source_all_pairs_expected)&&j(r0.first_exact_analytic_witness)===j(Packet.source_pauli_analytic_first_witness)&&j(r0.exact_scope)===j(Packet.scalar_and_matrix_domain),'complete 16 exact finite trace witness and operator/field roles');
 ck(j(r0.source_discrepancy_disposition)===j(Packet.discrepancy_disposition),'research dispute owner and nonclaims not normalized');
 ck(r0.source_first_quadrant_CI?.run_id===37892025204&&r0.source_first_quadrant_CI?.adversarial_rejected===21&&r0.trace_square_CI?.run_id===37892401781&&r0.trace_square_CI?.matrix_pairs===16&&r0.trace_square_CI?.matrix_cells===1024&&r0.trace_square_CI?.adversarial_rejected===26,'item source CI exact');
 ck(r0.basis_only_similarity_falsified_under_declared_coefficient_scope===true&&r0.source_error_owner==='UNRESOLVED'&&r0.full_source_math_qualified===false&&r0.full_source_primitive_closed===false&&r0.G1_authorized===false&&r0.external_cold_review_passed===false,'strict source interpretation boundary');
 for(const token of ['trace=-8','trace=+8','16 independent','128 differing entries','1024 tested','source-native','NO CONSTANT INVERTIBLE COMPLEX SIMILARITY','trace(S^-1 X^2 S)=trace(X^2)','COEFFICIENT','PROJECT-GENERATED','OPEN/UNAUTHORIZED'])
 ck(item.body.includes(token),'record complete source detail literal '+token);
 ck(!item.body.includes('W-SSC-')&&s.guards.cross_author_semantics_available===false,'L-only firewall');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutations=[
 ['drop source 032',s=>{s.items=s.items.filter(x=>x.id!=='L-SSC-032')}],
 ['replace 032 SI id',s=>{s.items.find(x=>x.id==='L-SSC-032').id='L-SSC-031'}],
 ['modify unrelated 125 O negative',s=>{s.items.find(x=>x.id==='L-SSC-125').body='corrected O'}],
 ['modify unrelated 031 source',s=>{s.items.find(x=>x.id==='L-SSC-031').body='lost'}],
 ['modify older L032 H1 field',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_positive_chiral_block_matrix_G0='LOST'}],
 ['erase new 16 native traces',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0.finite_math.source_native_square_traces=[]}],
 ['flip printed first trace',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0.finite_math.printed_H1_square_traces[0]=-8}],
 ['erase native first exact witness',s=>{s.items.find(x=>x.id==='L-SSC-032').body=s.items.find(x=>x.id==='L-SSC-032').body.replace('trace=-8','trace=0')}],
 ['move source field role',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0.exact_scope.coefficients='ANY SOURCE W'}],
 ['hide original old source expression',s=>{delete s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_D4_Table5_G0}],
 ['fabricate similarity escape',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0.basis_only_similarity_falsified_under_declared_coefficient_scope=false}],
 ['replace source error ownership',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0.source_error_owner='AUTHOR_BUG'}],
 ['fake source theorem',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0.full_source_math_qualified=true}],
 ['fake reviewer',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_mixed_trace_square_G0.external_cold_review_passed=true}],
 ['fake G1',s=>{s.revision.G1_authorized=true}],
 ['fake current source freeze',s=>{s.guards.source_census_freeze_complete=true}],
 ['fake basis source equivalence',s=>{s.guards.L032_16x16_Gamma_to_8x8_H1_basis_equivalence_qualified=true}],
 ['erase predecessor blob',s=>{s.revision.predecessor_git_blob_sha='STALE'}],
 ['erase new source blob',s=>{s.revision.source_packet.git_blob_sha='STALE'}],
 ['erase checked verifier blob',s=>{s.revision.source_verifier.git_blob_sha='STALE'}],
 ['invent current source author correction',s=>{s.guards.L032_H1_author_publication_math_error_ownership_known=true}],
 ['smuggle W track',s=>{s.items.find(x=>x.id==='L-SSC-032').body+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [label,fn]of mutations){const s=clone(cur),before=j(s);fn(s);if(j(s)===before)errors.push('NOOP '+label);else if(verify(s).length===0)errors.push('ESCAPED '+label);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l032-ssc026-source-trace-square.v0.1',pass:errors.length===0,errors,source_items:191,changed:'L-SSC-032',unchanged:190,source_pairs:16,exact_trace_square_unmatched_pairs:16,
 adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',
 author_error_qualified:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
