import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const P={old:root+'SOURCE_SEMANTIC_CENSUS_0_12.json',new:root+'SOURCE_SEMANTIC_CENSUS_0_13.json',negative:exp+'L126_L05_EQ2_EQ3_OCTONION_CLIFFORD_SOURCE_CONTRADICTION_0_1.json',verifier:exp+'tools/verify-l-g0-eq2-eq3-clifford-source-contradiction-0-1.mjs',table:root+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=read(P.old),next=read(P.new),neg=read(P.negative),tab=read(P.table);
function verify(s=next){
 const err=[],ck=(test,why)=>{if(!test)err.push(why)},p=s.revision||{},a=s.items?.find(x=>x.id==='L-SSC-126'),b=old.items?.find(x=>x.id==='L-SSC-126'),z=a?.source_consistency_g0||{};
 ck(s.schema==='woit-lisi.track-l.source-semantic-census.v0.13'&&s.status.includes('G0')&&s.status.includes('UNFROZEN'),'still unfrozen G0');
 ck(s.item_count===191&&s.items?.length===191&&j(s.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'all 191 stable source IDs');
 ck(j(s.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-126']),'exactly one source claim changed');
 ck(old.items.filter(x=>x.id!=='L-SSC-126').every(x=>j(x)===j(s.items.find(y=>y.id===x.id))),'all 190 unrelated full source item bodies exact');
 ck(p.predecessor_path===P.old&&p.predecessor_git_blob_sha===sha(P.old),'exact old SSC source SHA');
 ck(p.contradiction_evidence?.path===P.negative&&p.contradiction_evidence?.git_blob_sha===sha(P.negative),'independently calculated contradictory source witness');
 ck(p.source_computation_verifier?.path===P.verifier&&p.source_computation_verifier?.git_blob_sha===sha(P.verifier),'exact Node mathematical replay pin');
 ck(p.changed_source_items?.length===1&&p.changed_source_items[0]==='L-SSC-126'&&p.unchanged_source_items===190,'conservation metadata');
 ck(p.node_ci?.run_id===37834203305&&p.node_ci?.conclusion==='success'&&p.node_ci?.source_pair_failures===7&&p.node_ci?.source_matrix_entry_failures===28&&p.node_ci?.adversarial_rejected===20&&p.node_ci?.external_cold_review_passed===false,'CI evidence only not external verification');
 ck(j(p.historical_fixture_failures)===j([37833925600,37834051764]),'failed verifier fixture history preserved');
 ck(p.frozen===false&&p.source_complete===false&&p.G1_authorized===false&&p.global_qualification===false,'never G1/promote');
 ck(s.guards?.L126_eq2_eq3_original_O_source_consistency_failed===true&&s.guards?.L126_eq2_eq3_mathematical_qualification_allowed===false&&s.guards?.L127_Eq5_and_L133_f4_current_promotion_allowed===false,'negative source downstream gate');
 ck(s.guards?.source_census_freeze_complete===false&&s.guards?.L132_replay_authorized===false&&s.guards?.recursive_IA_authorized===false,'source still incomplete and IA closed');
 ck(z.status==='CONFIRMED_SOURCE_INCONSISTENCY_NOT_MATHEMATICAL_QUALIFICATION'&&z.positive_source_claim_retained===true&&z.source_literal_math_contradiction===true,'source assertion != qualified truth');
 ck(z.adversarial_defect?.git_blob_sha===sha(P.negative)&&z.source_table_path===P.table,'L126 exact source pointers');
 ck(z.barGamma_definition_conflicts===2&&z.ordinary_O_generator_pairs===36&&z.ordinary_O_failing_pairs===7&&z.ordinary_O_failed_matrix_entries===28,'source matrix counterexample graph');
 ck(z.H_C_positive_controls_zero_failures===true&&z.upstream_original_table_unchanged===true,'source table and controls');
 ck(z.node_ci?.run_id===37834203305&&z.node_ci?.adversarial_defined===20&&z.node_ci?.adversarial_rejected===20&&z.node_ci?.external_review_passed===false,'L126 local CI truth');
 ck(j(z.historical_failed_fixtures)===j([37833925600,37834051764])&&z.G1_reextraction_authorized===false&&z.whole_source_census_complete===false,'failed fixtures and strict boundary');
 ck(a.body.startsWith(b.body+' '),'exact old source claim left intact');
 const body=a.body||'';
 for(const fragment of ['e6*e7=-e2 AND e7*e6=-e2','7 of 36','28 coefficient locations','(gamma0,gamma6)','(gamma1,gamma6)','(2,7) and (7,2)','ordinary C/H','NOT adopted','G1-G7 UNAUTHORIZED'])ck(body.toLowerCase().includes(fragment.toLowerCase()),'negative witness complete: '+fragment);
 ck(tab.basis_multiplication_tables.find(t=>t.carrier==='O').entries[6][7]==='-e2'&&tab.basis_multiplication_tables.find(t=>t.carrier==='O').entries[7][6]==='-e2','original contradicting source cells conserved');
 ck(neg.observations?.transpose_construction?.pairs_failing===7&&neg.observations?.barGamma_interpretation_clash?.total_entry_disagreements===2,'independent source defect not altered');
 ck(j(s.items.find(x=>x.id==='L-SSC-133'))===j(old.items.find(x=>x.id==='L-SSC-133')),'L133 unchanged though dependent');
 ck(!j(a).includes('W-SSC-'),'no cross-track source');
 return err;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['erase source witness',s=>{s.items.find(x=>x.id==='L-SSC-126').body='erased'}],
 ['erase first gamma pair',s=>{const x=s.items.find(x=>x.id==='L-SSC-126');x.body=x.body.replace('(gamma0,gamma6)','unknown')}],
 ['erase second gamma pair',s=>{const x=s.items.find(x=>x.id==='L-SSC-126');x.body=x.body.replace('(gamma1,gamma6)','unknown')}],
 ['erase 28 entries',s=>{const x=s.items.find(x=>x.id==='L-SSC-126');x.body=x.body.replace('28 coefficient locations','unknown')}],
 ['alter 7 source pairs',s=>{s.items.find(x=>x.id==='L-SSC-126').source_consistency_g0.ordinary_O_failing_pairs=0}],
 ['erase table-clash count',s=>{s.items.find(x=>x.id==='L-SSC-126').source_consistency_g0.barGamma_definition_conflicts=0}],
 ['wrong CI run',s=>{s.items.find(x=>x.id==='L-SSC-126').source_consistency_g0.node_ci.run_id=0}],
 ['lose source literal',s=>{s.items.find(x=>x.id==='L-SSC-126').source_consistency_g0.upstream_original_table_unchanged=false}],
 ['normalize O table',s=>{s.items.find(x=>x.id==='L-SSC-126').body=s.items.find(x=>x.id==='L-SSC-126').body.replace('e7*e6=-e2','e7*e6=+e2')}],
 ['tamper source pin',s=>{s.revision.contradiction_evidence.git_blob_sha='stale'}],
 ['tamper predecessor pin',s=>{s.revision.predecessor_git_blob_sha='stale'}],
 ['tamper verifier pin',s=>{s.revision.source_computation_verifier.git_blob_sha='stale'}],
 ['overwrite L127',s=>{s.items.find(x=>x.id==='L-SSC-127').body='overwrite'}],
 ['overwrite L133',s=>{s.items.find(x=>x.id==='L-SSC-133').body='overwrite'}],
 ['erase failure history',s=>{s.revision.historical_fixture_failures=[]}],
 ['claim source frozen',s=>{s.revision.frozen=true}],
 ['claim mathematical proof',s=>{s.guards.L126_eq2_eq3_mathematical_qualification_allowed=true}],
 ['authorize G1',s=>{s.revision.G1_authorized=true}],
 ['promote G7',s=>{s.guards.L127_Eq5_and_L133_f4_current_promotion_allowed=true}],
 ['premature IA',s=>{s.guards.recursive_IA_authorized=true}],
 ['cross-track pollution',s=>{s.items.find(x=>x.id==='L-SSC-126').body+=' W-SSC-103'}]
];
let rejects=0;
if(!baseline.length)for(const [name,fn]of mutants){const s=cp(next),before=j(s);fn(s);if(j(s)===before)errors.push('mutation no-op '+name);else if(verify(s).length===0)errors.push('escaped mutation '+name);else rejects++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-source-ssc013-conservation.v0.1',pass:errors.length===0,errors,census:191,changed:['L-SSC-126'],unchanged:190,source_inconsistent:true,mathematical_theorem_proved:false,adversarial_defined:mutants.length,adversarial_rejected:rejects,mutation_gate:baseline.length?'NOT_RUN_BASELINE_FAILURE':'TESTED',G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
