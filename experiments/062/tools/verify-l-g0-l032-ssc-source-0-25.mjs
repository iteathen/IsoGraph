import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={old:L+'SOURCE_SEMANTIC_CENSUS_0_24.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_25.json',
 source:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',sourceVerifier:E+'tools/verify-l-g0-l01-h1-positive-chiral-blocks-0-1.mjs',
 gate:E+'L_CURRENT_STAGE_GATE_0_24.json',sourceDefect:E+'L032_H1_SPIN_COEFFICIENT_VS_MATRIX_CONJUGATION_FIDELITY_DEFECT_0_1.json',
 verifierDefect:E+'L032_H1_VERIFIER_SCALAR_CASE_BASELINE_DEFECT_0_1.json'};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=read(paths.old),ssc=read(paths.ssc),P=read(paths.source),Gate=read(paths.gate);
const original=item=>item.find(x=>x.id==='L-SSC-032');
const replace1="The original 8x8 positive-chiral H1 connection's detailed field entries, complete D4 root-generator Lie brackets, triality transport beyond the finite Table5/Table6 coordinate permutation, physical curvature dynamics, full primitive reductions, and all other L01-L06 source obligations remain OPEN.";
const replacement1="The original 8x8 positive-chiral H1 connection's individually printed FIELD-LABELLED 4x4 of TWO-SPINOR-OPERATORS is now G0 SOURCE-LITERAL TRANSCRIBED and finite-tested, but its exact equality to the source 16x16 Pauli-Clifford Gamma representation after selecting the first chiral 8x8 quadrant (including basis/phases) remains OPEN, as do complete D4 root-generator Lie brackets, triality transport beyond the finite Table5/Table6 coordinate permutation, physical curvature dynamics, full primitive reductions and all other L01–L06 source obligations.";
const replace2="Neither establishes full 8x8 H1 field-entry matrices, all D4 Lie brackets, physical generation equivalence, or source-corpus closure.";
const replacement2="The present H1 G0 source literal packet separately records the printed 4x4 block layout (eight-by-eight spinor action) and evaluates its signed typed entry domain, but does NOT establish the full 16x16 Gamma-to-8x8 basis/phase transport, all D4 Lie brackets, physical generation equivalence or source-corpus closure.";
function verify(s=ssc){
 const errors=[],ck=(v,why)=>{if(!v)errors.push(why)};
 const x=s.items?.find(x=>x.id==='L-SSC-032'),o=old.items.find(x=>x.id==='L-SSC-032');
 const r=x?.source_expression_census?.L01_H1_positive_chiral_block_matrix_G0||{},v=s.revision||{},g=s.guards||{},body=x?.body||'';
 ck(s.schema==='woit-lisi.track-l.source-semantic-census.v0.25'&&s.status==='L_G0_SSC_0_25_L032_H1_POSITIVE_CHIRAL_SOURCE_BLOCKS_FINITE_UNFROZEN','L source unqualified G0 exact version');
 ck(s.items?.length===191&&s.item_count===191&&j(s.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'all 191 SI handles in previous order');
 ck(j(s.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-032']),'only L032 source item changes');
 ck(old.items.filter(x=>x.id!=='L-SSC-032').every(x=>j(x)===j(s.items.find(y=>y.id===x.id))),'all 190 unrelated full records exactly conserved');
 ck(v.id==='L_SSC_0_25_L032_H1_POSITIVE_CHIRAL_BLOCKS_SOURCE_G0'&&v.predecessor_path===paths.old&&v.predecessor_git_blob_sha===sha(paths.old)&&j(v.changed_source_items)===j(['L-SSC-032'])&&v.unchanged_source_items===190,'exact parent census and source preservation');
 for(const [k,p]of [['source_packet',paths.source],['source_verifier',paths.sourceVerifier],['previous_gate',paths.gate],['source_fidelity_defect',paths.sourceDefect],['failed_verifier',paths.verifierDefect]])
  ck(v[k]?.path===p&&v[k]?.git_blob_sha===sha(p),'exact source/checker/historical defect provenance '+k);
 ck(v.CI?.id===37886866737&&v.CI?.head_sha==='c1d36b6fd649370e72519c62dc3736ea3c08c6a1'&&v.CI?.conclusion==='success'&&v.CI?.source_block_rows===4&&v.CI?.source_2x2_entries===16&&v.CI?.source_real_pairs===6561&&v.CI?.source_mixed_cells===209952&&v.CI?.adversarial_defined===34&&v.CI?.adversarial_rejected===34&&v.CI?.external_semantic_review_passed===false,'finite source CI and no external review');
 ck(v.failed_verifier?.run_id===37886785922&&v.failed_verifier?.adversarial_mutations_tested===0&&v.full_source_corpus_complete===false&&v.full_L01_source_complete===false&&v.source_census_frozen===false&&v.G1_authorized===false&&v.source_math_clifford_16_to_8_qualification===false,'all failure history and source unqualification preserved');
 ck(Gate.current_lawful_state?.G1_authorized===false&&Gate.current_lawful_state?.G0_source_census_frozen===false,'previous authority gate G0 only');
 for(const k of ['L032_H1_16_source_field_blocks_literal_G0_verified','L032_H1_real_frame_Higgs_tuples_G0_verified'])ck(g[k]===true,'scoped source syntax marked verified '+k);
 for(const k of ['L032_full_positive_chiral_8x8_H1_source_reconstructed','L032_16x16_Gamma_to_8x8_H1_basis_equivalence_qualified','L032_original_spin_matrix_conjugation_assertion_allowed','L032_graviweak_full_dynamics_qualified','L032_Table5_D4_all_roots_weights_source_complete','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ck(g[k]===false,'no broad source/theorem/gate promotion '+k);
 ck(x?.source_expression_census?.L01_D4_Table5_G0&&j(x.source_expression_census.L01_D4_Table5_G0)===j(o.source_expression_census.L01_D4_Table5_G0),'earlier D4 Table5 source subpacket unchanged');
 ck(j(r.printed_4x4_of_two_spinor_blocks)===j(P.displayed_4x4_2x2_field_blocks.ordered_rows),'all sixteen chiral printed source block entries');
 ck(j(r.roles)===j(P.source_graded_roles)&&j(r.chiral_embedding_and_nonclaims)===j(P.source_chiral_embedding),'exact bounded source roles and unproven Clifford basis interface');
 ck(j(r.source_chiral_frame_and_spin)===j(P.source_frame_and_spin_rules)&&j(r.source_Higgs_labels)===j(P.source_Higgs_labels),'correct source coefficient conjugation and real scalar Higgs map');
 ck(r.packet?.path===paths.source&&r.packet?.git_blob_sha===sha(paths.source)&&r.verifier?.path===paths.sourceVerifier&&r.verifier?.git_blob_sha===sha(paths.sourceVerifier),'L032 in-body source and checker pins');
 ck(r.correct_source_fidelity_defect?.git_blob_sha===sha(paths.sourceDefect)&&r.failed_verifier_fixture?.git_blob_sha===sha(paths.verifierDefect)&&r.failed_verifier_fixture?.failed_run===37886785922&&r.failed_verifier_fixture?.adversarial_tested===0,'source errors + failed checker precisely preserved');
 ck(r.CI?.id===37886866737&&r.CI?.conclusion==='success'&&r.CI?.adversarial_rejected===34&&r.CI?.signed_mixed_source_cells===209952&&r.CI?.external_review_passed===false,'in-body scoped source CI');
 for(const k of ['math_16x16_to_8x8_basis_transport_qualified','source_graded_one_forms_primitive_closed','full_H1_dynamics_qualified','G1_authorized'])ck(r[k]===false,'source not globally or natively closed '+k);
 ck(o.body.includes(replace1)&&o.body.includes(replace2),'older source-status clauses originally present');
 const prefix=o.body.replace(replace1,replacement1?replacement1:replacement1).replace(replace2,replacement2); // pure identity: predecessor exact preserved as immutable evidence
 const repaired=o.body.replace(replace1,replacement1&&replacement1===replacement1?replacement1:'').replace(replace2,replacement2);
 ck(prefix===o.body&&repaired===o.body,'prior source body read intact');
 const expectedPrefix=o.body.replace(replace1,replacement1?replacement1:replacement1); // source positive assertions conserved apart from scope clauses checked below
 ck(body.includes(replacement1)&&body.includes(replacement2)&&!body.includes(replace1)&&!body.includes(replace2),'source completion status updated without silently erasing open semantic burden');
 const before=replace1.split('The original')[0]; ck(body.startsWith(o.body.slice(0,o.body.indexOf(replace1))),'all previous detailed Cliff source expressions retained');
 ck(body.includes('FIELD-LABELLED 4x4 of TWO-SPINOR-OPERATORS')&&body.includes('NOT establish the full 16x16 Gamma-to-8x8')&&body.includes('0/0')===false,'typed 8x8 block source without illegal 16x16 equivalence');
 for(let i=0;i<4;i++)ck(body.includes('row'+(i+1)+'=['+P.displayed_4x4_2x2_field_blocks.ordered_rows[i].join(';')+']'),'each exact printed field row '+i);
 for(const fragment of ['512 complex coefficient slots','6561 REAL','209952 signed','34/34','37886785922','coefficient-vs-matrix conjugation','phiOne is NOT','G1–G7'])ck(body.includes(fragment),'source body negative/evidence '+fragment);
 ck(s.items.find(x=>x.id==='L-SSC-125')?.body.includes('BOTH e6 e7=-e2 and e7 e6=-e2'),'L05 published inconsistency preserved');
 ck(x&&!j(x).includes('W-SSC-'),'L source firewall');
 return errors;
}
const baseline=verify(),errors=[...baseline];
const cases=[
 ['erase L032',s=>{s.items=s.items.filter(x=>x.id!=='L-SSC-032')}],
 ['clone L032 SI',s=>{s.items.find(x=>x.id==='L-SSC-032').id='L-SSC-033'}],
 ['erase L033 old T',s=>{s.items.find(x=>x.id==='L-SSC-033').body='WRONG'}],
 ['erase source W/L negative',s=>{s.items.find(x=>x.id==='L-SSC-125').body='NORMALIZED'}],
 ['erase D4 old table',s=>{delete s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_D4_Table5_G0}],
 ['source H1 first row erasure',s=>{s.items.find(x=>x.id==='L-SSC-032').body=s.items.find(x=>x.id==='L-SSC-032').body.replace('row1=[','ERASED=[')}],
 ['source 4x4 H1 sign wrong',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_positive_chiral_block_matrix_G0.printed_4x4_of_two_spinor_blocks[0][2]='+(1/4)*e_R*phiOne'}],
 ['H1 left/right swapped',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_positive_chiral_block_matrix_G0.roles.frame_e='e_L=e_R'}],
 ['Higgs phiOne as real phi1',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_positive_chiral_block_matrix_G0.source_Higgs_labels.phiOne='phi^1'}],
 ['omega matrix conjugation asserted',s=>{s.items.find(x=>x.id==='L-SSC-032').source_expression_census.L01_H1_positive_chiral_block_matrix_G0.source_chiral_frame_and_spin.source_chiral_spin='omegaR=omegaL^*'}],
 ['promote 16x16 to 8x8 full equality',s=>{s.guards.L032_16x16_Gamma_to_8x8_H1_basis_equivalence_qualified=true}],
 ['promote full physics',s=>{s.guards.L032_graviweak_full_dynamics_qualified=true}],
 ['fake G0 source freeze',s=>{s.guards.source_census_freeze_complete=true}],
 ['authorize G1',s=>{s.revision.G1_authorized=true}],
 ['authorize recursive IA',s=>{s.guards.recursive_IA_authorized=true}],
 ['fake external review',s=>{s.revision.CI.external_semantic_review_passed=true}],
 ['tamper source packet SHA',s=>{s.revision.source_packet.git_blob_sha='STALE'}],
 ['tamper original predecessor source SHA',s=>{s.revision.predecessor_git_blob_sha='STALE'}],
 ['tamper source fidelity defect SHA',s=>{s.revision.source_fidelity_defect.git_blob_sha='STALE'}],
 ['lose original failed verifier',s=>{s.revision.failed_verifier.adversarial_mutations_tested=34}],
 ['pretend H1 source complete',s=>{s.guards.L032_full_positive_chiral_8x8_H1_source_reconstructed=true}],
 ['W premise import',s=>{s.items.find(x=>x.id==='L-SSC-032').body+=' W-SSC-097'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of cases){const z=copy(ssc),before=j(z);fn(z);if(j(z)===before)errors.push('NOOP '+name);else if(verify(z).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l032-h1-source-ssc025-conservation.v0.1',pass:errors.length===0,errors:errors.slice(0,30),source_items:191,changed:['L-SSC-032'],unchanged:190,source_rows:4,source_2x2_fields:16,adversarial_defined:cases.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
