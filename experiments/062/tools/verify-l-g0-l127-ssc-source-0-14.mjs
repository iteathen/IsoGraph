import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={before:L+'SOURCE_SEMANTIC_CENSUS_0_13.json',after:L+'SOURCE_SEMANTIC_CENSUS_0_14.json',source:L+'LISI_L05_EQ5_INDEXED_BIVECTOR_SOURCE_RECONSTRUCTION_0_1.json',sourceVerifier:E+'tools/verify-l-g0-l127-eq5-indexed-source-0-1.mjs',gate:E+'L_CURRENT_STAGE_GATE_0_14.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,clone=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const old=get(P.before),now=get(P.after),src=get(P.source),gate=get(P.gate);
function verify(c=now){
 const errors=[],ck=(ok,msg)=>{if(!ok)errors.push(msg)};
 const o=old.items.find(x=>x.id==='L-SSC-127'),a=c.items?.find(x=>x.id==='L-SSC-127'),r=a?.source_expression_census?.Eq5_indexed_chiral_source_G0||{},rev=c.revision||{},guard=c.guards||{};
 ck(c.schema==='woit-lisi.track-l.source-semantic-census.v0.14'&&c.status?.includes('G0')&&c.status?.includes('UNFROZEN'),'current source G0 only');
 ck(c.item_count===191&&c.items?.length===191&&j(c.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'all 191 stable source identities');
 ck(j(c.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-127']),'only L127 source body changed');
 ck(old.items.filter(x=>x.id!=='L-SSC-127').every(x=>j(x)===j(c.items.find(y=>y.id===x.id))),'all 190 complete unrelated source claims exactly conserved');
 ck(c.items.find(x=>x.id==='L-SSC-126')?.body.includes('7 of 36')&&c.items.find(x=>x.id==='L-SSC-125')?.body.includes('BOTH e6 e7=-e2 and e7 e6=-e2'),'upstream source contradictions preserved');
 ck(rev.id==='L_SSC_0_14_L127_EQ5_TYPED_INDEX_G0_SOURCE_CONSERVATION'&&rev.predecessor_path===P.before&&rev.predecessor_git_blob_sha===sha(P.before),'exact prior 0.13 source census SHA');
 ck(rev.changed_source_items?.length===1&&rev.changed_source_items[0]==='L-SSC-127'&&rev.unchanged_source_items===190,'revision conservation summary');
 ck(rev.source_packet?.path===P.source&&rev.source_packet?.git_blob_sha===sha(P.source),'Eq5 exact source packet dependency pin');
 ck(rev.adversarial_verifier?.path===P.sourceVerifier&&rev.adversarial_verifier?.git_blob_sha===sha(P.sourceVerifier),'Eq5 source verifier exact pin');
 ck(rev.historical_gate?.path===P.gate&&rev.historical_gate?.git_blob_sha===sha(P.gate),'old gate is historical parent');
 ck(rev.node_CI?.run_id===37839333341&&rev.node_CI?.conclusion==='success'&&rev.node_CI?.cell_cases===15136&&rev.node_CI?.adversarial_defined===27&&rev.node_CI?.adversarial_rejected===27&&rev.node_CI?.external_semantic_review_passed===false,'scoped source CI no external promotion');
 ck(j(rev.historical_failed_runs)===j([37838619149,37838782350,37838925736,37839051903,37839225214]),'retain all failed intermediate verifiers');
 ck(rev.source_census_frozen===false&&rev.G1_authorized===false&&rev.full_L01_L06_source_census_complete===false&&rev.entire_Eq5_source_consistency_and_theorem_complete===false,'no stale downstream promotion');
 ck(guard.section2_Eq5_index_transcribed_G0_candidate===true&&guard.section2_Eq5_index_complete===false&&guard.section2_Eq5_operator_math_theorem_qualified===false&&guard.section2_Eq5_printed_O_Lie_closure_inconsistent===true,'transcription != source-consistency closure');
 ck(guard.section2_Eq5_source_cold_audit_passed===false&&guard.source_census_freeze_complete===false&&guard.L127_Eq5_and_L133_f4_current_promotion_allowed===false&&guard.L_G1_source_reextraction_complete===false&&guard.recursive_IA_authorized===false,'source audit still open');
 ck(guard.cross_author_semantics_available===false&&!j(a).includes('W-SSC-'),'track firewall');
 ck(r.packet?.path===P.source&&r.packet?.git_blob_sha===sha(P.source),'L127 exact packet pin');
 ck(j(r.upper)===j(src.eq5.upper)&&j(r.lower)===j(src.eq5.lower)&&j(r.binders)===j(src.index_semantics),'complete ordered Γ/M incidence and quantifier binders');
 ck(j(r.negative_source_tests)===j(src.observations_to_test)&&r.source_index_transcribed_G0_candidate===true&&r.source_math_claims_qualified===false&&r.G1_authorized===false,'source negative and source syntax only');
 ck(r.source_independent_finite_reconstruction?.run_id===37839333341&&r.source_independent_finite_reconstruction?.signed_chiral_cell_cases===15136&&r.source_independent_finite_reconstruction?.mutations_rejected===27&&r.source_independent_finite_reconstruction?.external_review_passed===false,'finite evidence exact');
 ck(r.full_Eq5_syntactic_source_cold_audit_passed===false&&r.source_original_table_unchanged===true,'source unchanged no cold proof');
 const body=a?.body||'';
 ck(!body.includes('internal coefficient indices remain explicitly awaiting separate source-exact transcription')&&!body.includes("Eq.(5)'s unresolved general-index bivector matrices"),'obsolete incompleteness replaced without source claim deletion');
 ck(body.startsWith(o.body.split('complete example signs and Eq.(5)')[0]),'previous source positive claims preceding correction retained');
 for(const [label,x]of [['upper',src.eq5.upper],['lower',src.eq5.lower]]){
  for(const s of [x.Gamma_block,x.M_block,x.division_algebra])ck(body.includes(s),'body reconstructs '+label+' source literal '+s);
 }
 ck(body.includes('free row a / free column e / SUM b')&&body.includes('free row b / free column f / SUM a'),'distinct upper/lower binders and roles not conflated');
 for(const fragment of ['15,136','168/378','augmented rank 29','6 non-antisymmetric','12 counterexample','one upper generator pair','six lower generator pairs','NOT a lawful repair','remain OPEN'])ck(body.includes(fragment),'source positive/negative witness '+fragment);
 ck(src.primitive_or_theorem_qualification===false&&src.source_census_frozen===false&&src.G1_authorized===false&&gate.current_lawful_state.G1_authorized===false,'no source mathematical qualification via packet');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['drop one source obligation',c=>{c.items.pop()}],
 ['merge SI records',c=>{c.items[126].id='L-SSC-125'}],
 ['change source L125 contradiction',c=>{c.items.find(x=>x.id==='L-SSC-125').body='normalized'}],
 ['erase independent L126 counterexample',c=>{c.items.find(x=>x.id==='L-SSC-126').body='closed'}],
 ['replace L133 source',c=>{c.items.find(x=>x.id==='L-SSC-133').body='closed'}],
 ['source packet pin stale',c=>{c.revision.source_packet.git_blob_sha='stale'}],
 ['adversarial verifier pin stale',c=>{c.revision.adversarial_verifier.git_blob_sha='stale'}],
 ['predecessor revision pin stale',c=>{c.revision.predecessor_git_blob_sha='stale'}],
 ['upper Γ source swapped',c=>{c.items.find(x=>x.id==='L-SSC-127').source_expression_census.Eq5_indexed_chiral_source_G0.upper.Gamma_block='MISSING'}],
 ['lower M source missing',c=>{c.items.find(x=>x.id==='L-SSC-127').source_expression_census.Eq5_indexed_chiral_source_G0.lower.M_block='MISSING'}],
 ['swap upper binder',c=>{c.items.find(x=>x.id==='L-SSC-127').source_expression_census.Eq5_indexed_chiral_source_G0.binders.summation='both sum a'}],
 ['drop free upper row',c=>{c.items.find(x=>x.id==='L-SSC-127').body=c.items.find(x=>x.id==='L-SSC-127').body.replace('free row a / free column e / SUM b','ambiguous')}],
 ['erase Lie nonclosure',c=>{c.items.find(x=>x.id==='L-SSC-127').body=c.items.find(x=>x.id==='L-SSC-127').body.replace('168/378','0/378')}],
 ['source rank false',c=>{c.items.find(x=>x.id==='L-SSC-127').source_expression_census.Eq5_indexed_chiral_source_G0.negative_source_tests.ordinary_O_upper_Lie_span.generator_rank_two_mod_primes=0}],
 ['declare source-index complete without cold audit',c=>{c.guards.section2_Eq5_index_complete=true}],
 ['declare mathematical theorem',c=>{c.guards.section2_Eq5_operator_math_theorem_qualified=true}],
 ['claim cold review',c=>{c.guards.section2_Eq5_source_cold_audit_passed=true}],
 ['authorize G1',c=>{c.revision.G1_authorized=true}],
 ['authorize IA',c=>{c.guards.recursive_IA_authorized=true}],
 ['hide failed verifier evidence',c=>{c.revision.historical_failed_runs=[]}],
 ['cross-track import',c=>{c.items.find(x=>x.id==='L-SSC-127').body+=' W-SSC-103'}],
 ['change unrelated L189',c=>{c.items.find(x=>x.id==='L-SSC-189').body='something else'}]
];
let rejection=0;
if(!baseline.length)for(const [name,fn]of mutants){const c=clone(now),b=j(c);fn(c);if(j(c)===b)errors.push('no-op adversarial mutation '+name);else if(verify(c).length===0)errors.push('escaped adversarial mutation '+name);else rejection++;}
const out={schema:'isograph.exp062-l-ssc014-eq5-source-fidelity.v0.1',pass:errors.length===0,errors,source_items:191,changed:['L-SSC-127'],unchanged:190,indexed_Eq5_source_transcribed:true,Eq5_math_theorem_qualified:false,adversarial_defined:mutants.length,adversarial_rejected:rejection,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILURE':'TESTED',G1_authorized:false,external_review_passed:false};
console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;
