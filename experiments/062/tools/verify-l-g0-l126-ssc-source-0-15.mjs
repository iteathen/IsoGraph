import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const f={old:L+'SOURCE_SEMANTIC_CENSUS_0_14.json',now:L+'SOURCE_SEMANTIC_CENSUS_0_15.json',source:L+'LISI_L05_EQ4_CYCLIC_SOURCE_G0_0_1.json',v:E+'tools/verify-l-g0-l05-eq4-cyclic-source-0-1.mjs',gate:E+'L_CURRENT_STAGE_GATE_0_15.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const old=get(f.old),cur=get(f.now),source=get(f.source),gate=get(f.gate);
function check(next=cur){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)},rev=next.revision||{},o=old.items.find(x=>x.id==='L-SSC-126'),n=next.items?.find(x=>x.id==='L-SSC-126'),r=n?.source_expression_census?.Eq4_four_M_cyclic_source_G0||{};
 ck(next.schema==='woit-lisi.track-l.source-semantic-census.v0.15'&&next.status.includes('G0')&&next.status.includes('UNFROZEN'),'strict source G0');
 ck(next.items?.length===191&&next.item_count===191&&j(next.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'all 191 L-SSC SI handles retained');
 ck(j(next.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-126']),'only L126 revised');
 ck(old.items.filter(x=>x.id!=='L-SSC-126').every(x=>j(x)===j(next.items.find(y=>y.id===x.id))),'all 190 full predecessor source items unchanged');
 ck(n?.body.startsWith(o.body+' '),'all previous L126 source claims and negative evidence retained verbatim');
 ck(rev.id==='L_SSC_0_15_L126_EQ4_M_CYCLE_G0_SOURCE_NEGATIVE'&&rev.predecessor_path===f.old&&rev.predecessor_git_blob_sha===sha(f.old)&&rev.unchanged_source_items===190&&j(rev.changed_source_items)===j(['L-SSC-126']),'exact frozen parent provenance');
 ck(rev.source_packet?.path===f.source&&rev.source_packet?.git_blob_sha===sha(f.source)&&rev.adversarial_verifier?.path===f.v&&rev.adversarial_verifier?.git_blob_sha===sha(f.v),'Eq4 exact source/CI verifier blobs');
 ck(rev.predecessor_gate?.path===f.gate&&rev.predecessor_gate?.git_blob_sha===sha(f.gate),'correct G0 gate predecessor');
 ck(rev.node_CI?.run_id===37840813885&&rev.node_CI?.conclusion==='success'&&rev.node_CI?.source_ordinary_O_counterexamples===4&&rev.node_CI?.adversarial_rejected===23&&rev.node_CI?.external_review_passed===false,'G0 source finite CI, no external PASS');
 ck(rev.historical_failure?.run_id===37840691538&&rev.historical_failure?.reason?.includes('version mutation escaped'),'failed mutation history cannot disappear');
 ck(rev.source_census_frozen===false&&rev.Eq4_all_eight_members_qualified===false&&rev.G1_authorized===false&&rev.L01_L06_complete===false,'no source/semantic closure');
 ck(next.guards?.section2_Eq4_four_M_source_ordinary_cases_conserved===true&&next.guards?.section2_Eq4_ordinary_O_four_counterexamples_preserved===true,'exact two positive G0 census milestones');
 for(const k of ['section2_Eq4_all_eight_members_reconstructed','section2_Eq4_split_metric_law_closed','section2_Eq4_math_qualified','source_census_freeze_complete','L_G1_source_reextraction_complete','L132_replay_authorized','recursive_IA_authorized'])ck(next.guards?.[k]===false,'qualification stage not closed '+k);
 ck(r.source_packet?.path===f.source&&r.source_packet?.git_blob_sha===sha(f.source),'L126 exact source packet pin');
 ck(r.source_expression===source.source_exact_Eq4.printed_eight_member_equality&&r.free_binders===source.source_exact_Eq4.binders&&j(r.four_exact_M_members)===j(source.source_exact_Eq4.members),'full exact four M terms and eight printed source identities conserved');
 ck(j(r.ordinary_C)===j(source.finite_evidence.ordinary_C)&&j(r.ordinary_H)===j(source.finite_evidence.ordinary_H)&&j(r.ordinary_O)===j(source.finite_evidence.ordinary_O),'C H O indexed source observations exact');
 ck(r.CI?.run_id===37840813885&&r.CI?.adversarial_cases_rejected===23&&r.CI?.external_cold_review_passed===false,'L126 source trace/CI evidence');
 ck(r.Gamma_lowered_four_members_audited===false&&r.split_index_lowering_audited===false&&r.full_source_math_qualified===false&&r.G1_authorized===false,'unresolved Gamma/split index/Math burden');
 if(!n){errors.push('L-SSC-126 missing (fail closed)');return errors;}
 ck(n.body.includes(source.source_exact_Eq4.printed_eight_member_equality),'all eight printed source chain members explicitly present'); 
 for(const row of source.finite_evidence.ordinary_O.counterexamples)ck(n.body.includes('('+row.a+','+row.b+','+row.c+')=['+row.terms.join(',')+']'),'every source negative witness visibly reconstructable '+[row.a,row.b,row.c]);
 for(const x of source.source_exact_Eq4.members)ck(n.body.includes(x.source+' = '+x.exact_calculation),'source ordered and conjugated operands '+x.source);
 for(const s of ['four source M coefficient','among 512','UNTESTED','COUNTERFACTUAL ONLY','G1–G7'])ck(n.body.includes(s),'negative/source scope text '+s);
 ck(gate.current_lawful_state?.G1_authorized===false&&source.G1_authorized===false&&next.guards?.cross_author_semantics_available===false,'never import W current authority');
 ck(n&&(!j(n).includes('W-SSC-')),'source-track firewall even if item omitted');
 return errors;
}
const baseline=check(),errors=[...baseline],cases=[
 ['erase L126',s=>{s.items=s.items.filter(x=>x.id!=='L-SSC-126')}],
 ['change L126 id to L125',s=>{s.items.find(x=>x.id==='L-SSC-126').id='L-SSC-125'}],
 ['erase L125 source O negative',s=>{s.items.find(x=>x.id==='L-SSC-125').body='repaired source'}],
 ['erase previous Eq2 negative',s=>{s.items.find(x=>x.id==='L-SSC-126').body='Eq2 repaired'}],
 ['erase L127 Eq5 prior source',s=>{s.items.find(x=>x.id==='L-SSC-127').body='gone'}],
 ['erase L133 f4 prior source',s=>{s.items.find(x=>x.id==='L-SSC-133').body='gone'}],
 ['erase first Eq4 triple',s=>{s.items.find(x=>x.id==='L-SSC-126').body=s.items.find(x=>x.id==='L-SSC-126').body.replace('(2,7,6)=[1,1,1,-1]','omitted')}],
 ['flip Eq4 tensor 4 sign',s=>{s.items.find(x=>x.id==='L-SSC-126').source_expression_census.Eq4_four_M_cyclic_source_G0.four_exact_M_members[3].exact_calculation='WRONG'}],
 ['change Gamma source',s=>{s.items.find(x=>x.id==='L-SSC-126').source_expression_census.Eq4_four_M_cyclic_source_G0.Gamma_lowered_four_members_audited=true}],
 ['claim split Eq4 proof',s=>{s.guards.section2_Eq4_split_metric_law_closed=true}],
 ['claim whole Eq4 proof',s=>{s.guards.section2_Eq4_math_qualified=true}],
 ['claim G1',s=>{s.revision.G1_authorized=true}],
 ['claim source frozen',s=>{s.guards.source_census_freeze_complete=true}],
 ['claim IA',s=>{s.guards.recursive_IA_authorized=true}],
 ['fake external review',s=>{s.revision.node_CI.external_review_passed=true}],
 ['edit parent pin',s=>{s.revision.predecessor_git_blob_sha='stale'}],
 ['edit source packet pin',s=>{s.revision.source_packet.git_blob_sha='stale'}],
 ['edit source verifier pin',s=>{s.revision.adversarial_verifier.git_blob_sha='stale'}],
 ['erase failed run',s=>{s.revision.historical_failure.run_id=0}],
 ['W import',s=>{s.items.find(x=>x.id==='L-SSC-126').body+=' W-SSC-102'}]
];
let rejected=0;if(!baseline.length)for(const [name,fn]of cases){const s=cp(cur),before=j(s);fn(s);if(j(s)===before)errors.push('no-op '+name);else if(check(s).length===0)errors.push('escaped '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-ssc015-eq4-source-conservation.v0.1',pass:!errors.length,errors,source_items:191,changed:'L-SSC-126',unchanged:190,ordinary_O_counterexamples:4,unqualified_Gamma_and_split:true,adversarial_defined:cases.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
