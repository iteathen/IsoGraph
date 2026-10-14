import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={old:L+'SOURCE_SEMANTIC_CENSUS_0_16.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_17.json',
 certificate:L+'LISI_L05_O_RATIONAL_BIVECTOR_CERTIFICATE_G0_0_1.json',verifier:E+'tools/verify-l-g0-o-rational-bivector-0-1.mjs',
 gate:E+'L_CURRENT_STAGE_GATE_0_17.json'};
const get=x=>JSON.parse(fs.readFileSync(x,'utf8'));const J=JSON.stringify,copy=x=>JSON.parse(J(x));
const sha=k=>{const b=fs.readFileSync(k);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=get(p.old),SSC=get(p.ssc),certificate=get(p.certificate),gate=get(p.gate);
function check(s=SSC){
 const errors=[],ck=(test,label)=>{if(!test)errors.push(label)};
 const rev=s.revision||{},guards=s.guards||{},before=old.items?.find(x=>x.id==='L-SSC-127');
 const item=s.items?.find(x=>x.id==='L-SSC-127'),proof=item?.source_expression_census?.Eq5_exact_rational_source_nonclosure_G0||{};
 ck(s.schema==='woit-lisi.track-l.source-semantic-census.v0.17'&&s.status==='L_G0_SOURCE_SSC_0_17_L127_EXACT_Q_NONCLOSURE_PARTIAL_UNFROZEN','G0 source partial only');
 ck(s.items?.length===191&&s.item_count===191&&J(s.items.map(x=>x.id))===J(old.items.map(x=>x.id)),'all 191 stable source IDs and order');
 ck(J(s.items.filter((x,i)=>J(x)!==J(old.items[i])).map(x=>x.id))===J(['L-SSC-127']),'only L127 source item changed');
 ck(old.items.filter(x=>x.id!=='L-SSC-127').every(x=>J(x)===J(s.items.find(y=>y.id===x.id))),'all 190 unrelated full source records unchanged');
 ck(rev.id==='L_SSC_0_17_L127_SOURCE_EXACT_Q_RATIONAL_BIVECTOR_CERTIFICATE'&&rev.predecessor_path===p.old&&rev.predecessor_git_blob_sha===sha(p.old),'source 0.16 full parent SHA');
 ck(rev.unchanged_source_items===190&&J(rev.changed_source_items)===J(['L-SSC-127']),'exact delta declaration');
 ck(rev.source_exact_Q_certificate?.path===p.certificate&&rev.source_exact_Q_certificate?.git_blob_sha===sha(p.certificate),'exact source certificate SHA');
 ck(rev.source_exact_Q_adversarial_verifier?.path===p.verifier&&rev.source_exact_Q_adversarial_verifier?.git_blob_sha===sha(p.verifier),'exact independent rational verifier SHA');
 ck(rev.prior_governing_G0_gate?.path===p.gate&&rev.prior_governing_G0_gate?.git_blob_sha===sha(p.gate),'correct old G0 procedural authority');
 ck(rev.test?.workflow_id===37856322251&&rev.test?.conclusion==='success'&&rev.test?.Q_source_variants===8&&rev.test?.source_commutator_pairs_per_variant===378&&rev.test?.original_source_outside_span_per_variant===168&&rev.test?.diagnostic_source_alternative_outside_span_per_variant===0&&rev.test?.adversarial_rejected===24&&rev.test?.external_review_passed===false,'exact pinned scoped CI not external PASS');
 ck(rev.source_census_frozen===false&&rev.source_complete===false&&rev.primitive_schema_closure===false&&rev.G1_authorized===false&&rev.global_mathematical_qualification===false,'not current source or math closure');
 ck(guards.section2_Eq5_exact_Q_source_bivector_reconstruction_verified===true&&guards.section2_Eq5_all_four_chiral_source_matrix_variants_verified===true&&guards.section2_Eq5_rational_span_counterexamples===168,'new exact Q finite source evidence');
 for(const k of ['section2_Eq5_general_so8_f4_theorem_qualified','section2_Eq5_index_complete','source_census_freeze_complete','whole_L_source_cold_audit_complete','L_G1_source_reextraction_complete','L_recursive_IA_authorized','recursive_IA_authorized'])ck(guards[k]===false,'no premature full source/IA qualification '+k);
 ck(proof.certificate?.path===p.certificate&&proof.certificate?.git_blob_sha===sha(p.certificate)&&proof.verification_script?.git_blob_sha===sha(p.verifier),'L127 proof provenance');
 ck(J(proof.finite_source_facts)===J(certificate.all_eight_variants_exact_rational)&&J(proof.exact_method)===J(certificate.exact_method),'eight complete source variants with exact arithmetic claims');
 ck(proof.source_original_table_unchanged===true&&proof.source_one_cell_diagnostic_not_authority===true&&proof.source_G0_complete===false&&proof.general_Lie_theorem_qualified===false&&proof.G1_authorized===false,'all source negative and qualification guards');
 ck(proof.workflow?.id===37856322251&&proof.workflow?.conclusion==='success'&&proof.workflow?.adversarial_rejected===24&&proof.workflow?.external_cold_review_passed===false,'source mathematical scope qualified internally only');
 ck(Boolean(item)&&item.body.startsWith(before.body+' '),'ALL prior source assertions including their guards and contradictions kept verbatim');
 const body=item?.body||'';
 for(const str of ['168 of the 378','rank 28 over Q','SPARSE rational linear constraint','M_[2,3]+M_[3,2]=0','M_[4,7]+M_[7,4]=0','COUNTERFACTUAL','NOT a general denial','G0 FULL SOURCE ASSERTION CENSUS'])ck(body.includes(str),'source claim/body exact scope '+str);
 ck(item?.source_expression_census?.Eq5_indexed_chiral_source_G0&&J(item.source_expression_census.Eq5_indexed_chiral_source_G0)===J(before.source_expression_census.Eq5_indexed_chiral_source_G0),'older exact Eq5 roles unaffected by rational confirmation');
 ck(s.items?.find(x=>x.id==='L-SSC-125')?.body.includes('BOTH e6 e7=-e2 and e7 e6=-e2'),'printed source table contradiction retained');
 ck(s.items?.find(x=>x.id==='L-SSC-126')?.body.includes('7 of 36'),'earlier Eq2/3 negative evidence retained');
 ck(certificate.independently_visually_transcribed_journal_O_table[6].endsWith('-e0 -e2')&&gate.current_lawful_state?.G1_authorized===false,'source journal unchanged, G0 current gate');
 ck(!J(item??{}).includes('W-SSC-'),'anti-bias L-only source');
 return errors;
}
const baseline=check(),errors=[...baseline],mutants=[
 ['erase L127',s=>{s.items=s.items.filter(x=>x.id!=='L-SSC-127')}],
 ['duplicate identity',s=>{s.items[126].id='L-SSC-125'}],
 ['edit L125',s=>{s.items.find(x=>x.id==='L-SSC-125').body='repaired'}],
 ['edit L126',s=>{s.items.find(x=>x.id==='L-SSC-126').body='repaired'}],
 ['edit L133',s=>{s.items.find(x=>x.id==='L-SSC-133').body='repaired'}],
 ['wrong basis rank',s=>{s.items.find(x=>x.id==='L-SSC-127').source_expression_census.Eq5_exact_rational_source_nonclosure_G0.finite_source_facts[0].generator_basis_rank_Q=27}],
 ['wrong 168 source count',s=>{s.guards.section2_Eq5_rational_span_counterexamples=167}],
 ['lose first sparse witness',s=>{s.items.find(x=>x.id==='L-SSC-127').source_expression_census.Eq5_exact_rational_source_nonclosure_G0.finite_source_facts[0].sparse_pair_relation.commutator_B01_B06_values_sum=0}],
 ['wrong source formula body',s=>{s.items.find(x=>x.id==='L-SSC-127').body=s.items.find(x=>x.id==='L-SSC-127').body.replace('168 of the 378','0 of the 378')}],
 ['erase previous upper index',s=>{s.items.find(x=>x.id==='L-SSC-127').source_expression_census.Eq5_indexed_chiral_source_G0.upper.binder='a'}],
 ['wrong original SSC pin',s=>{s.revision.predecessor_git_blob_sha='bad'}],
 ['wrong Q proof pin',s=>{s.revision.source_exact_Q_certificate.git_blob_sha='bad'}],
 ['wrong verifier pin',s=>{s.revision.source_exact_Q_adversarial_verifier.git_blob_sha='bad'}],
 ['fabricate source freeze',s=>{s.guards.source_census_freeze_complete=true}],
 ['fabricate theorem',s=>{s.guards.section2_Eq5_general_so8_f4_theorem_qualified=true}],
 ['fabricate G1',s=>{s.revision.G1_authorized=true}],
 ['fabricate IA',s=>{s.guards.L_recursive_IA_authorized=true}],
 ['erase earlier failure evidence',s=>{s.items.find(x=>x.id==='L-SSC-127').body='source discrepancy erased'}],
 ['invent external verification',s=>{s.revision.test.external_review_passed=true}],
 ['cross-track semantic import',s=>{s.items.find(x=>x.id==='L-SSC-127').body+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [label,mutate]of mutants){
 const s=copy(SSC),before=J(s);mutate(s);
 if(J(s)===before)errors.push('NO-OP '+label);
 else if(check(s).length===0)errors.push('ESCAPED '+label);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l-ssc017-rational-nonclosure-conservation.v0.1',pass:errors.length===0,errors,
 source_items:191,changed_item:'L-SSC-127',unchanged_items:190,
 proof_source_variants:8,source_rational_outside_per_variant:168,
 adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'NO_MUTATIONS_BASELINE_FAILED':'TESTED',
 full_source_cold_audit:false,G1_authorized:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
