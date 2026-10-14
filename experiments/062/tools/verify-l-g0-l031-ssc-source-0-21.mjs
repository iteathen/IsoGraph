import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={old:L+'SOURCE_SEMANTIC_CENSUS_0_20.json',now:L+'SOURCE_SEMANTIC_CENSUS_0_21.json',source:L+'LISI_L01_ELECTROWEAK_CL4_HIGGS_SOURCE_G0_0_1.json',verifier:E+'tools/verify-l-g0-l01-electroweak-cl4-higgs-source-0-1.mjs',oldGate:E+'L_CURRENT_STAGE_GATE_0_20.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),J=JSON.stringify,cp=x=>JSON.parse(J(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=load(P.old),current=load(P.now),src=load(P.source),Gate=load(P.oldGate);
const id='L-SSC-031';
function verify(s=current){
 const errors=[],ck=(x,msg)=>{if(!x)errors.push(msg)};
 const a=s.items?.find(x=>x.id===id),o=old.items.find(x=>x.id===id);
 const d=a?.source_expression_census?.L01_electroweak_Cl4_Higgs_finite_G0||{},r=s.revision||{},g=s.guards||{};
 ck(s.schema==='woit-lisi.track-l.source-semantic-census.v0.21'&&s.status==='L_G0_SSC_0_21_L01_CL4_HIGGS_81_REAL_FINITE_SOURCE_ONLY_UNFROZEN','strict G0 SSC revision');
 ck(s.item_count===191&&s.items?.length===191&&J(s.items.map(x=>x.id))===J(old.items.map(x=>x.id)),'191 exact stable sequential source IDs');
 ck(J(s.items.filter((x,i)=>J(x)!==J(old.items[i])).map(x=>x.id))===J([id]),'exactly one current source obligation changed');
 ck(old.items.filter(x=>x.id!==id).every(x=>J(x)===J(s.items.find(y=>y.id===x.id))),'190 other current full source records exactly unchanged, not body only');
 if(!a){errors.push('missing L031 must fail closed');return errors}
 ck(a.source_provenance===o.source_provenance&&a.kind===o.kind&&a.declared_scope===o.declared_scope&&a.representation_closure===o.representation_closure&&a.source_disposition_hint==='OPEN','original semantic identity and open source roles conserved');
 ck(a.body.startsWith(o.body+' '),'old L031 source-positive body preserved as exact prefix');
 ck(r.id==='L_SSC_0_21_L031_ELECTROWEAK_CL4_HIGGS_FINITE_G0'&&r.predecessor_path===P.old&&r.predecessor_git_blob_sha===sha(P.old)&&r.predecessor_revision_id===old.revision.id&&r.unchanged_source_items===190&&J(r.changed_source_items)===J([id]),'exact source predecessor provenance and 190 conservation');
 ck(r.source_packet?.path===P.source&&r.source_packet?.git_blob_sha===sha(P.source),'current G0 source packet SHA');
 ck(r.source_verifier?.path===P.verifier&&r.source_verifier?.git_blob_sha===sha(P.verifier),'source external-flow verifier exact SHA');
 ck(r.previous_gate?.path===P.oldGate&&r.previous_gate?.git_blob_sha===sha(P.oldGate)&&Gate.current_lawful_state?.G1_authorized===false,'source old G0 procedural gate pinned');
 ck(r.internal_node_CI?.run_id===37873857848&&r.internal_node_CI?.head_sha==='19bfb16a7d1b46553b74dfa2654c7b058572326b'&&r.internal_node_CI?.conclusion==='success'&&r.internal_node_CI?.Cl4_ordered_pairs===16&&r.internal_node_CI?.real_Higgs_tuples===81&&r.internal_node_CI?.Higgs_matrix_source_cells===1296&&r.internal_node_CI?.adversarial_defined===28&&r.internal_node_CI?.adversarial_rejected===28&&r.internal_node_CI?.external_cold_review_passed===false,'exact source CI no external truth substitution');
 for(const name of ['L01_full_cold_reconstruction_complete','L01_L06_source_census_complete','source_census_frozen','G1_authorized','global_qualified_module_promotion'])ck(r[name]===false,'no downstream promotion '+name);
 for(const name of ['L01_electroweak_Cl4_Higgs_four_gamma_G0_source_transcribed','L01_electroweak_Cl4_Higgs_81_real_tuples_finite_verified','L01_electroweak_Cl4_Higgs_phiOne_label_conserved'])ck(g[name]===true,'bounded positive G0 source token '+name);
 for(const name of ['L01_electroweak_connection_and_cartan_complete','L01_electroweak_Cl4_full_math_qualified','L01_all_source_formula_bindings_fully_qualified','L01_complete_source_reconstruction','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ck(g[name]===false,'not qualified '+name);
 ck(g.cross_author_semantics_available===false&&g.L01_real_sl2C_vs_two_sl2R_source_math_discrepancy_preserved===true,'no W source and old real group negative evidence retained');
 ck(d.source_packet?.path===P.source&&d.source_packet?.git_blob_sha===sha(P.source),'new L031 expression provenance exact');
 ck(d.source==='L01 0711.0770v1 §2.2.2 page 10, zero-based PDF page 10','specific source p10');
 ck(J(d.gammaPrime)===J(src.source_clifford.generators_ordered)&&J(d.source_Pauli_matrix)===J(src.source_clifford.Pauli_2x2),'all four source Cl4 generators / Pauli');
 ck(J(d.source_blocks)===J(src.source_clifford.source_blocks)&&J(d.full_4x4_matrix)===J(src.source_clifford.source_4x4_matrix)&&J(d.labelled_Higgs_coordinates)===J(src.source_clifford.source_labels),'full 4x4 source matrix/labels exact');
 ck(J(d.source_binders)===J(src.source_clifford.distinct_binders)&&J(d.free_real_components)===J(['phi^1','phi^2','phi^3','phi^4'])&&d.phiOne_distinct_from_phiSup1===true,'source symbol identity vs real scalar distinction');
 ck(J(d.source_modalities)===J(src.source_clifford.preserved_modalities)&&J(d.G0_finite_cases)===J(src.finite_scope),'source modalities, boundary, finite cases complete');
 ck(d.source_CI?.run_id===37873857848&&d.source_CI?.conclusion==='success'&&d.source_CI?.adversarial_defined===28&&d.source_CI?.adversarial_rejected===28&&d.source_CI?.external_cold_review_passed===false,'per-item CI exact');
 for(const name of ['complete_electroweak_formula_AST','Clifford_theorem_globally_qualified','full_source_L01_complete','G1_authorized'])ck(d[name]===false,'no disguised semantic closure in source item '+name);
 const body=a.body;
 for(const phrase of ['Cl(4)','gammaPrime1=sigma1 tensor sigma1','gammaPrime4=sigma2 tensor I2','phiOne is NOT phi^1','1296 Higgs 4x4 source matrix cells','Hermitian','Imaginary phi^4 is a SOURCE-EXCLUDED negative boundary','UNEXTRACTED','G1–G7'])ck(body.includes(phrase),'visible source clause/body '+phrase);
 ck(body.includes('[[0,0,-phiOne,phiPlus],[0,0,phiMinus,phiZero],[-phiZero,phiPlus,0,0],[phiMinus,phiOne,0,0]]'),'exact source matrix textual row/column order');
 ck(body.includes('zero discrepancies')&&body.includes('NOT a complete physical/dynamical proof'),'finite pass not original physical proof');
 ck(!J(a).includes('W-SSC-'),'L-only source wall');
 return errors;
}
const base=verify(),errors=[...base],mutants=[
['erase L031 item',s=>{s.items=s.items.filter(x=>x.id!==id)}],
['merge source ID',s=>{s.items.find(x=>x.id===id).id='L-SSC-030'}],
['erase L030 group counterexample',s=>{s.items.find(x=>x.id==='L-SSC-030').body='normalized'}],
['erase source L033 triality guard',s=>{s.items.find(x=>x.id==='L-SSC-033').body='settled'}],
['wrong old SSC pin',s=>{s.revision.predecessor_git_blob_sha='stale'}],
['wrong source packet SHA',s=>{s.revision.source_packet.git_blob_sha='stale'}],
['wrong source verifier SHA',s=>{s.revision.source_verifier.git_blob_sha='stale'}],
['wrong old gate SHA',s=>{s.revision.previous_gate.git_blob_sha='stale'}],
['lose original old text',s=>{s.items.find(x=>x.id===id).body='invented closure'}],
['erase source matrix first entry',s=>{s.items.find(x=>x.id===id).body=s.items.find(x=>x.id===id).body.replace('-phiOne,phiPlus','-phi^1,phiPlus')}],
['wrong tensor source gamma4',s=>{s.items.find(x=>x.id===id).source_expression_census.L01_electroweak_Cl4_Higgs_finite_G0.gammaPrime[3].Kronecker='i*sigma1 tensor identity'}],
['wrong lower phi block label',s=>{s.items.find(x=>x.id===id).source_expression_census.L01_electroweak_Cl4_Higgs_finite_G0.full_4x4_matrix[2][0]='-phiOne'}],
['erase phiOne distinction',s=>{s.items.find(x=>x.id===id).source_expression_census.L01_electroweak_Cl4_Higgs_finite_G0.phiOne_distinct_from_phiSup1=false}],
['tamper original source reality',s=>{s.items.find(x=>x.id===id).source_expression_census.L01_electroweak_Cl4_Higgs_finite_G0.G0_finite_cases.source_excluded_negative_case.source_real_coefficients_violated=false}],
['fake 729 phi vectors',s=>{s.items.find(x=>x.id===id).source_expression_census.L01_electroweak_Cl4_Higgs_finite_G0.G0_finite_cases.real_phi_tuples=729}],
['promote electroweak connection',s=>{s.guards.L01_electroweak_connection_and_cartan_complete=true}],
['claim whole L01 source closed',s=>{s.guards.L01_complete_source_reconstruction=true}],
['claim Clifford theorem',s=>{s.guards.L01_electroweak_Cl4_full_math_qualified=true}],
['claim G1',s=>{s.revision.G1_authorized=true}],
['claim source frozen',s=>{s.guards.source_census_freeze_complete=true}],
['claim IA',s=>{s.guards.recursive_IA_authorized=true}],
['fake external pass',s=>{s.revision.internal_node_CI.external_cold_review_passed=true}],
['erase real group source negative',s=>{s.guards.L01_real_sl2C_vs_two_sl2R_source_math_discrepancy_preserved=false}],
['smuggle W source',s=>{s.items.find(x=>x.id===id).body+=' W-SSC-103'}]
];
let rejected=0;if(!base.length)for(const [name,fn]of mutants){const v=cp(current),before=J(v);fn(v);if(J(v)===before)errors.push('NO-OP '+name);else if(verify(v).length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l031-ssc021-higgs-source-conservation.v0.1',pass:errors.length===0,errors,source_items:191,changed_item:id,unchanged:190,finite_Cl4_pairs:16,finite_real_phi_cases:81,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',complete_L01_source:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
