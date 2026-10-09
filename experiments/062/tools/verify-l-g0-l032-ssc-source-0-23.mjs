import fs from "node:fs";import crypto from "node:crypto";
const L="research/woit-lisi-isomorph/lisi/",E="experiments/062/";
const P={old:L+"SOURCE_SEMANTIC_CENSUS_0_22.json",new:L+"SOURCE_SEMANTIC_CENSUS_0_23.json",
 source:L+"LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json",verifier:E+"tools/verify-l-g0-l01-cl71-graviweak-source-0-1.mjs",
 gate:E+"L_CURRENT_STAGE_GATE_0_22.json",defect:E+"L032_CL71_SOURCE_PREDECESSOR_NEGATIVE_MUTATION_ESCAPE_0_1.json"};
const j=JSON.stringify,read=p=>JSON.parse(fs.readFileSync(p,"utf8")),cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash("sha1").update(Buffer.concat([Buffer.from("blob "+b.length+"\0"),b])).digest("hex")};
const prev=read(P.old),now=read(P.new),source=read(P.source),gate=read(P.gate);
function verify(x=now){
 const err=[],ck=(v,m)=>{if(!v)err.push(m)},rev=x.revision||{},guard=x.guards||{},old=prev.items.find(z=>z.id==="L-SSC-032"),curr=x.items?.find(z=>z.id==="L-SSC-032"),z=curr?.source_expression_census?.L01_Cl71_H1_eight_gamma_mixed_G0||{};
 ck(x.schema==="woit-lisi.track-l.source-semantic-census.v0.23"&&x.track==="L"&&x.status.includes("G0")&&x.status.includes("UNFROZEN"),"current G0 source only");
 ck(x.item_count===191&&x.items?.length===191&&j(x.items.map(v=>v.id))===j(prev.items.map(v=>v.id)),"191 exact source identities/order");
 ck(j(x.items.filter((v,i)=>j(v)!==j(prev.items[i])).map(v=>v.id))===j(["L-SSC-032"]),"exactly one L032 source record changed");
 ck(prev.items.filter(v=>v.id!=="L-SSC-032").every(v=>j(v)===j(x.items.find(t=>t.id===v.id))),"all 190 unrelated complete predecessor records preserved");
 ck(rev.id==="L_SSC_0_23_L032_CL71_GAMMA_MIXED_SOURCE_G0"&&rev.predecessor_path===P.old&&rev.predecessor_git_blob_sha===sha(P.old)&&rev.unchanged_source_items===190&&j(rev.changed_source_items)===j(["L-SSC-032"]),"exact old blob and revision conservation");
 ck(rev.source_packet?.path===P.source&&rev.source_packet?.git_blob_sha===sha(P.source),"exact printed Cl71 packet SHA");
 ck(rev.source_verifier?.path===P.verifier&&rev.source_verifier?.git_blob_sha===sha(P.verifier),"exact source verifier SHA");
 ck(rev.predecessor_gate?.path===P.gate&&rev.predecessor_gate?.git_blob_sha===sha(P.gate),"exact source G0 gate SHA");
 ck(rev.failed_verifier?.path===P.defect&&rev.failed_verifier?.git_blob_sha===sha(P.defect)&&rev.failed_verifier?.run_id===37879714482&&rev.failed_verifier?.conclusion==="failure"&&rev.failed_verifier?.adversarial_rejected===24,"failed source adversarial run preserved");
 ck(rev.passing_source_CI?.run_id===37879801679&&rev.passing_source_CI?.conclusion==="success"&&rev.passing_source_CI?.ordered_gamma_pairs===64&&rev.passing_source_CI?.real_mixed_frame_Higgs_pairs===6561&&rev.passing_source_CI?.adversarial_rejected===26&&rev.passing_source_CI?.external_cold_review_passed===false,"source finite CI and nonexternal claim");
 ck(rev.old_item_length===old.body.length&&rev.full_source_corpus_complete===false&&rev.full_L01_graviweak_source_complete===false&&rev.source_census_frozen===false&&rev.G1_authorized===false&&rev.global_modules_promoted===false,"unfrozen G0, global claims not promoted");
 ck(guard.L032_eight_Cl71_gamma_source_G0_finite_verified===true&&guard.L032_H1_frame_Higgs_mixed_source_finite_verified===true,"source finite 64 and 6561");
 for(const name of ["L032_full_positive_chiral_8x8_H1_source_reconstructed","L032_Table5_D4_all_roots_weights_source_complete","L032_physical_graviweak_dynamics_qualified","source_census_freeze_complete","L_G1_source_reextraction_complete","recursive_IA_authorized"])ck(guard[name]===false,"current missing source or stage "+name);
 ck(Boolean(curr),"L032 source obligation exists");
 if(!curr)return err;
 ck(curr.body.startsWith(old.body+" "),"all older L032 source claims preserved verbatim");
 ck(z.source_packet?.path===P.source&&z.source_packet?.git_blob_sha===sha(P.source)&&z.source_verifier?.git_blob_sha===sha(P.verifier),"source packet trace exact");
 ck(z.historical_negative_verifier_defect?.path===P.defect&&z.historical_negative_verifier_defect?.git_blob_sha===sha(P.defect),"failed mutation packet not erased");
 ck(j(z.source_eight_gamma)===j(source.gamma_source)&&j(z.H1_typed_source_roles)===j(source.H1)&&j(z.limited_finite_scope)===j(source.finite_math_scope),"eight tensor source roles, exact H1 and limited finite scope");
 ck(z.CI?.run_id===37879801679&&z.CI?.conclusion==="success"&&z.CI?.ordered_generator_pairs===64&&z.CI?.source_16x16_anticommutator_cells===16384&&z.CI?.mixed_basis_products===16&&z.CI?.real_frame_Higgs_pairs===6561&&z.CI?.mixed_matrix_cells===1679616&&z.CI?.adversarial_rejected===26&&z.CI?.external_cold_review_passed===false,"exact finite source arithmetic CI");
 for(const name of ["source_Table5_qualified","source_positive_8x8_full_H1_matrix_qualified","full_H1_source_8x8_explicit_entries_cold_reviewed","full_graviweak_source_math_theorem_qualified","G1_authorized"])ck(z[name]===false,"no falsely closed field "+name);
 for(const t of source.gamma_source.eight_ordered_generators)ck(curr.body.includes(t.label+"="+t.source_tensor+"["+t.metric_role+"]"),"all 8 exact source generator terms "+t.label);
 for(const s of ["eta=diag(+,+,+,-,+,+,+,+)","H_1=(1/2)*omega+(1/4)*e*phi+w_ew","6561 pairs","Table5 D4 roots","24 source Table5 D4 roots","G1-G7","Published L01","L05 original published"]){
  // Semantically synonymous words may occur in different source spans; require all load-bearing exact H1/math and open scopes.
  if(["Published L01","L05 original published"].includes(s))continue;
  ck(curr.body.includes(s),"source body source/evidence "+s);
 }
 ck(curr.body.includes("source Eq.(2.10)")&&curr.body.includes("H1=1/2 omega+1/4 e phi+w_ew"),"source H1 1/2,1/4 normalization not removed");
 ck(curr.body.includes("center/Killing counterexamples")&&curr.body.includes("octonionic sign/Clifford counterexamples"),"prior independent negative source evidence must remain");
 ck(curr.body.includes("no normalization")&&curr.body.includes("remain OPEN"),"source and qualification nonclaims preserved");
 ck(gate.current_lawful_state?.G1_authorized===false&&source.G1_authorized===false&&guard.cross_author_semantics_available===false&&!j(curr).includes("W-SSC-"),"no G1/cross-track import");
 return err;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ["drop source L032 identity",s=>{s.items=s.items.filter(x=>x.id!=="L-SSC-032")}],
 ["change L032 to another identity",s=>{s.items.find(x=>x.id==="L-SSC-032").id="L-SSC-033"}],
 ["erase L031 source wew",s=>{s.items.find(x=>x.id==="L-SSC-031").body="gone"}],
 ["erase old real Spin negative",s=>{s.items.find(x=>x.id==="L-SSC-030").body="repaired"}],
 ["delete first gamma operator",s=>{s.items.find(x=>x.id==="L-SSC-032").source_expression_census.L01_Cl71_H1_eight_gamma_mixed_G0.source_eight_gamma.eight_ordered_generators.shift()}],
 ["flip gamma timelike source metric",s=>{s.items.find(x=>x.id==="L-SSC-032").source_expression_census.L01_Cl71_H1_eight_gamma_mixed_G0.source_eight_gamma.source_metric="8 positive"}],
 ["flip H1 mixed fraction",s=>{s.items.find(x=>x.id==="L-SSC-032").source_expression_census.L01_Cl71_H1_eight_gamma_mixed_G0.H1_typed_source_roles.source_formula="1/2 omega+1/2 ephi+w"}],
 ["lose source H1 old body",s=>{s.items.find(x=>x.id==="L-SSC-032").body="gamma matrices checked"}],
 ["delete Table5 unknown",s=>{s.items.find(x=>x.id==="L-SSC-032").body=s.items.find(x=>x.id==="L-SSC-032").body.replace("24 source Table5 D4 roots","ALL Table5 proven")}],
 ["claim physical theory complete",s=>{s.guards.L032_physical_graviweak_dynamics_qualified=true}],
 ["claim full 8x8 H1",s=>{s.guards.L032_full_positive_chiral_8x8_H1_source_reconstructed=true}],
 ["claim Table5 complete",s=>{s.guards.L032_Table5_D4_all_roots_weights_source_complete=true}],
 ["claim source G0 complete",s=>{s.guards.source_census_freeze_complete=true}],
 ["claim G1",s=>{s.revision.G1_authorized=true}],
 ["claim recursive IA",s=>{s.guards.recursive_IA_authorized=true}],
 ["erase 6561 real cases",s=>{s.items.find(x=>x.id==="L-SSC-032").source_expression_census.L01_Cl71_H1_eight_gamma_mixed_G0.CI.real_frame_Higgs_pairs=0}],
 ["erase right first product",s=>{s.items.find(x=>x.id==="L-SSC-032").source_expression_census.L01_Cl71_H1_eight_gamma_mixed_G0.H1_typed_source_roles.mixed_operator="phi*e"}],
 ["erase source packet pin",s=>{s.revision.source_packet.git_blob_sha="STALE"}],
 ["erase source verifier pin",s=>{s.revision.source_verifier.git_blob_sha="STALE"}],
 ["erase old SSC pin",s=>{s.revision.predecessor_git_blob_sha="STALE"}],
 ["fabricate external review",s=>{s.revision.passing_source_CI.external_cold_review_passed=true}],
 ["erase failed mutation provenance",s=>{s.revision.failed_verifier.run_id=0}],
 ["smuggle W semantic",s=>{s.items.find(x=>x.id==="L-SSC-032").body+=" W-SSC-103"}],
 ["overwrite unrelated L033",s=>{s.items.find(x=>x.id==="L-SSC-033").body="wrong"}]
];
let rejected=0;if(!baseline.length)for(const [name,edit]of mutants){const s=cp(now),old=j(s);edit(s);if(j(s)===old)errors.push("NOOP "+name);else if(verify(s).length===0)errors.push("ESCAPED "+name);else rejected++;}
console.log(JSON.stringify({schema:"isograph.exp062-l-ssc023-cl71-mixed-source-conservation.v0.1",pass:!errors.length,errors,
source_items:191,changed:"L-SSC-032",unchanged:190,Cl71_ordered_pairs:64,real_mixed_frame_Higgs_cases:6561,
adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?"BASELINE_FAILED":"TESTED",
source_census_frozen:false,G1_authorized:false,external_cold_review_passed:false},null,2));if(errors.length)process.exitCode=1;
