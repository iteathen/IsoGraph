import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={old:L+'SOURCE_SEMANTIC_CENSUS_0_29.json',ssc:L+'SOURCE_SEMANTIC_CENSUS_0_30.json',
packet:L+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json',
verifier:E+'tools/verify-l-g0-l01-h1-graded-curvature-source-0-1.mjs',
gate:E+'L_CURRENT_STAGE_GATE_0_29.json',
failure:E+'L039_GRADED_CURVATURE_VERIFIER_BASELINE_FIXTURE_DEFECT_0_1.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Old=load(F.old),Current=load(F.ssc),Packet=load(F.packet),Gate=load(F.gate);
function verify(c=Current){
 const errs=[],ck=(v,msg)=>{if(!v)errs.push(msg)},r=c.revision||{},g=c.guards||{};
 const old=Old.items.find(x=>x.id==='L-SSC-039'),i=c.items?.find(x=>x.id==='L-SSC-039');
 const body=i?.body||'',data=i?.source_expression_census?.L01_H1_graded_curvature_Eq3_1_to_3_5_G0||{};
 ck(c.schema==='woit-lisi.track-l.source-semantic-census.v0.30'&&c.track==='L'&&c.status?.includes('G0')&&c.status?.includes('UNFROZEN'),'still G0 source candidate');
 ck(c.item_count===191&&c.items?.length===191&&j(c.items.map(x=>x.id))===j(Old.items.map(x=>x.id)),'all 191 original SI handles');
 ck(j(c.items.filter((x,k)=>j(x)!==j(Old.items[k])).map(x=>x.id))===j(['L-SSC-039']),'exact one corrected source item');
 ck(Old.items.filter(x=>x.id!=='L-SSC-039').every(x=>j(x)===j(c.items.find(z=>z.id===x.id))),'full 190 unrelated current source records unchanged');
 ck(body.startsWith(old.body+' '),'all preceding L039 claims and negative evidence kept');
 ck(r.id==='L_SSC_0_30_L039_GRADED_H1_EQ31_EQ35_SOURCE_G0'&&r.predecessor_path===F.old&&r.predecessor_git_blob_sha===sha(F.old),'exact SSC predecessor SHA');
 ck(j(r.changed_source_items)===j(['L-SSC-039'])&&r.unchanged_source_items===190,'assertion conservation accounting');
 ck(r.source_packet?.path===F.packet&&r.source_packet?.git_blob_sha===sha(F.packet),'source-first graded packet exact');
 ck(r.source_verifier?.path===F.verifier&&r.source_verifier?.git_blob_sha===sha(F.verifier),'source verifier exact');
 ck(r.preceding_G0_gate?.path===F.gate&&r.preceding_G0_gate?.git_blob_sha===sha(F.gate),'exact G0-only gate');
 ck(r.failed_verifier_baseline?.path===F.failure&&r.failed_verifier_baseline?.git_blob_sha===sha(F.failure)&&r.failed_verifier_baseline?.run_id===37904227568&&r.failed_verifier_baseline?.adversarial_mutations_executed===0,'invalid baseline retained with zero mutants');
 ck(r.source_CI?.run_id===37904387927&&r.source_CI?.conclusion==='success'&&r.source_CI?.source_equations===7&&r.source_CI?.typed_roles===11&&r.source_CI?.adversarial_defined===24&&r.source_CI?.adversarial_rejected===24&&r.source_CI?.external_review_passed===false,'source-only CI exact');
 for(const k of ['source_census_frozen','L01_L06_full_source_completed','full_graded_curvature_qualified','author_math_error_confirmed','G1_authorized'])ck(r[k]===false,'no source/domain promotion '+k);
 for(const k of ['L039_graded_H1_eq31_to_35_source_literals_G0_verified','L039_form_degree_one_versus_scalar_source_roles_G0_verified','L039_printed_Fgw_vs_raw_H1_normalization_still_unresolved'])ck(g[k]===true,'scoped source checkpoint '+k);
 for(const k of ['L039_full_field_graded_curvature_qualified','L039_author_publication_math_error_ownership_established','L039_source_native_normalization_transport_complete','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ck(g[k]===false,'open source/domains '+k);
 ck(data.packet?.path===F.packet&&data.packet?.git_blob_sha===sha(F.packet),'item expression source exact pin');
 ck(j(data.Eq31_to_35_full_literal_rows)===j(Packet.source_equations)&&j(data.graded_actor_degrees)===j(Packet.actor_degrees)&&j(data.ordered_graded_composition)===j(Packet.source_composition),'all literal source AST and actors conserved');
 ck(j(data.unresolved_common_output_normalization)===j(Packet.conditional_normalization_check)&&j(data.source_negative_evidence)===j(Packet.retained_negative_evidence),'unresolved conditional normalization and negative evidence retained');
 ck(data.node_CI?.run_id===37904387927&&data.node_CI?.adversarial_rejected===24&&data.node_CI?.external_cold_semantic_review_passed===false,'item-level CI exact');
 ck(data.failed_verifier_baseline?.run_id===37904227568&&data.failed_verifier_baseline?.provenance?.git_blob_sha===sha(F.failure)&&data.failed_verifier_baseline?.mutation_cases_run===0,'failed baseline never reclassified');
 for(const k of ['current_source_complete','graded_curvature_math_theorem_qualified','conditional_factor4_author_error_confirmed','G1_authorized'])ck(data[k]===false,'new artifact cannot self-authorize '+k);
 for(const z of Packet.source_equations.filter(x=>x.item==='L-SSC-039'))ck(body.includes(z.id+': '+z.source_literal),'all four L039 source expressions exact in body '+z.id);
 for(const t of ['OUTER 1/2','INNER 1/8','F_gw','W*W','B1*B1','ONE-FORMS','Higgs phi','factor four','not a CONFIRMED AUTHOR DEFECT','G1–G7'])ck(body.includes(t),'typed body source/nonclaim '+t);
 ck(Packet.source_complete===false&&Packet.open_conditions?.conditional_factor4_author_error_confirmed===false&&Gate.current_lawful_state?.G1_authorized===false,'underlying source method still open');
 ck(c.items?.some(x=>x.id==='L-SSC-032')&&!j(i??{}).includes('W-SSC-'),'source independent, earlier H1 not rewritten');
 return errs;
}
const base=verify(),issues=[...base];
const mutants=[
 ['delete L039',c=>{c.items=c.items.filter(x=>x.id!=='L-SSC-039')}],
 ['erase L032 original H1 source',c=>{c.items.find(x=>x.id==='L-SSC-032').body='gone'}],
 ['erase L038 curvature source',c=>{c.items.find(x=>x.id==='L-SSC-038').body='gone'}],
 ['erase L127 independent octonion source',c=>{c.items.find(x=>x.id==='L-SSC-127').body='gone'}],
 ['change SI handle',c=>{c.items.find(x=>x.id==='L-SSC-039').id='L-SSC-040'}],
 ['erase H1 source normalization',c=>{c.items.find(x=>x.id==='L-SSC-039').body=c.items.find(x=>x.id==='L-SSC-039').body.replace('H1=(1/2)*omega+(1/4)*e*phi','H1=omega+e*phi')}],
 ['drop source curvature FG',c=>{c.items.find(x=>x.id==='L-SSC-039').body=c.items.find(x=>x.id==='L-SSC-039').body.replace('L01-EQ3.3-FG:','MISSING')}],
 ['reverse FGW torsion sign',c=>{c.items.find(x=>x.id==='L-SSC-039').source_expression_census.L01_H1_graded_curvature_Eq3_1_to_3_5_G0.Eq31_to_35_full_literal_rows[5].source_literal='F_gw= -T*phi'}],
 ['turn Higgs into one-form',c=>{c.items.find(x=>x.id==='L-SSC-039').source_expression_census.L01_H1_graded_curvature_Eq3_1_to_3_5_G0.graded_actor_degrees[2].form_degree=1}],
 ['merge EW source sectors',c=>{c.items.find(x=>x.id==='L-SSC-039').source_expression_census.L01_H1_graded_curvature_Eq3_1_to_3_5_G0.ordered_graded_composition.gauge_roles='W=B1'}],
 ['erase source wedge',c=>{c.items.find(x=>x.id==='L-SSC-039').body=c.items.find(x=>x.id==='L-SSC-039').body.replace('exterior-curvature W*W','ordinary W W')}],
 ['make normalization definitely paper typo',c=>{c.guards.L039_author_publication_math_error_ownership_established=true}],
 ['claim common output mapping',c=>{c.guards.L039_source_native_normalization_transport_complete=true}],
 ['erase conditional unknown',c=>{c.guards.L039_printed_Fgw_vs_raw_H1_normalization_still_unresolved=false}],
 ['claim full graded curvature',c=>{c.revision.full_graded_curvature_qualified=true}],
 ['claim entire frozen source',c=>{c.guards.source_census_freeze_complete=true}],
 ['claim G1',c=>{c.revision.G1_authorized=true}],
 ['claim IA',c=>{c.guards.recursive_IA_authorized=true}],
 ['erase failed baseline record',c=>{c.revision.failed_verifier_baseline.run_id=0}],
 ['replace provenance pin',c=>{c.revision.source_packet.git_blob_sha='stale'}],
 ['replace parent pin',c=>{c.revision.predecessor_git_blob_sha='stale'}],
 ['forge external pass',c=>{c.revision.source_CI.external_review_passed=true}],
 ['smuggle W semantic',c=>{c.items.find(x=>x.id==='L-SSC-039').body+=' W-SSC-103'}]
];
let rejected=0;
if(!base.length)for(const [name,fn]of mutants){const c=cp(Current),p=j(c);fn(c);if(j(c)===p)issues.push('NO-OP '+name);else if(verify(c).length===0)issues.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l039-ssc030-source-fidelity.v0.1',pass:!issues.length,errors:issues,source_ids:191,changed:['L-SSC-039'],unchanged:190,Eq31_to_35_source_expressions:7,
adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?'BASELINE_FAILED':'TESTED',source_G0_unfrozen:true,source_mathematical_curvature_closed:false,G1_authorized:false},null,2));if(issues.length)process.exitCode=1;
