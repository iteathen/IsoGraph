import fs from "node:fs";import crypto from "node:crypto";
const L="research/woit-lisi-isomorph/lisi/",E="experiments/062/";
const P={gate:E+"L_CURRENT_STAGE_GATE_0_23.json",prior:E+"L_CURRENT_STAGE_GATE_0_22.json",
ssc:L+"SOURCE_SEMANTIC_CENSUS_0_23.json",packet:L+"LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json",
sourceVerifier:E+"tools/verify-l-g0-l01-cl71-graviweak-source-0-1.mjs",sscVerifier:E+"tools/verify-l-g0-l032-ssc-source-0-23.mjs",
defect:E+"L032_CL71_SOURCE_PREDECESSOR_NEGATIVE_MUTATION_ESCAPE_0_1.json"};
const read=p=>JSON.parse(fs.readFileSync(p,"utf8")),j=JSON.stringify,clone=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash("sha1").update(Buffer.concat([Buffer.from("blob "+b.length+"\0"),b])).digest("hex")};
const gate=read(P.gate),prior=read(P.prior),ssc=read(P.ssc),source=read(P.packet),defect=read(P.defect);
function check(g=gate){
 const err=[],ok=(v,m)=>{if(!v)err.push(m)},state=g.current_lawful_state||{},packet=g.L032_Cl71_H1_mixed_source||{},ci=g.G0_23_CI||{};
 ok(g.schema==="isograph.exp062-l-current-stage-gate.v0.23"&&g.track==="L"&&g.status.includes("G0")&&g.status.includes("UNFROZEN")&&g.semantic_authority===false&&g.authority_effect==="PROCEDURAL_STAGE_ROUTING_ONLY","G0-only procedural gate");
 ok(g.supersedes?.path===P.prior&&g.supersedes?.git_blob_sha===sha(P.prior)&&prior.current_lawful_state.G1_authorized===false,"exact historical parent gate and inherited no-G1");
 ok(g.current_source_census?.path===P.ssc&&g.current_source_census?.git_blob_sha===sha(P.ssc)&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&j(g.current_source_census?.changed_from_predecessor)===j(["L-SSC-032"]),"191 stable items one L032 mutation");
 ok(g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false&&ssc.guards.source_census_freeze_complete===false,"source cold census not complete");
 ok(packet.path===P.packet&&packet.git_blob_sha===sha(P.packet)&&packet.frozen_source==="L01 arXiv:0711.0770v1, published 2007-11-06, §2.2.3, printed p12","exact source and blob");
 ok(packet.signature==="+,+,+,-,+,+,+,+"&&packet.eight_source_16x16_gamma_generators===8&&packet.ordered_gamma_anticommutator_pairs===64&&packet.ordered_16x16_anticommutator_cells===16384,"source Cl71 signature/ordered pairs");
 ok(packet.mixed_gravity_EW_ordered_basis===16&&packet.real_frame_Higgs_coeff_grid===6561&&packet.mixed_16x16_matrix_cells===1679616&&packet.positive_chiral_8x8_matrix_cells===419904,"exact source-finite frame Higgs grid");
 ok(j(packet.source_H1_relative_coefficients)===j(["1/2 omega","1/4 e phi","1 w_ew"]),"H1 mixed source coefficients exact");
 for(const k of ["full_printed_H1_8x8_source_entries_complete","full_Table5_D4_roots_and_8Splus_weights_audited","f4_E8_generation_physics_qualified","complete_L01_L06_source_closed","external_cold_review_passed"])ok(packet[k]===false,"cannot promote H1 source unknown "+k);
 ok(ci.source?.id===37879801679&&ci.source?.conclusion==="success"&&ci.source?.frame_Higgs_pairs===6561&&ci.source?.adversarial_rejected===26&&ci.source?.external_cold_review_passed===false,"source CI exact pinned scope");
 ok(ci.ssc?.id===37880017060&&ci.ssc?.conclusion==="success"&&ci.ssc?.unchanged_complete_source_items===190&&ci.ssc?.adversarial_rejected===24&&ci.ssc?.external_cold_review_passed===false,"SSC CI exact scope");
 ok(ci.source_verifier?.path===P.sourceVerifier&&ci.source_verifier?.git_blob_sha===sha(P.sourceVerifier)&&ci.ssc_verifier?.path===P.sscVerifier&&ci.ssc_verifier?.git_blob_sha===sha(P.sscVerifier),"verifier exact tested SHA");
 ok(ci.failed_source_verifier?.path===P.defect&&ci.failed_source_verifier?.git_blob_sha===sha(P.defect)&&ci.failed_source_verifier?.run_id===37879714482&&ci.failed_source_verifier?.status==="failed"&&ci.failed_source_verifier?.mutation_rejections===24,"failed negative control not hidden");
 ok(g.historical_failures?.some(x=>x.run_id===37879714482&&x.status==="failed")===true&&defect.failed_run.adversarial_rejected===24,"negative evidence linked in gate and defect");
 ok(ci.G0_source_census_fixed_point===false&&ci.mathematical_Lie_or_unification_theorem_qualified===false&&ci.external_validation_passed===false&&ci.G1_authorized===false,"internal CI not global theorem");
 ok(g.outstanding_source_reconstruction?.some(x=>x.includes("positive-chiral 8x8")&&x.includes("UNQUALIFIED"))&&g.outstanding_source_reconstruction?.some(x=>x.includes("Table5 D4")),"pending H1 explicit and Table5 source");
 ok(g.next_lawful_step?.startsWith("Continue independent L-only G0")&&g.next_lawful_step?.includes("Table5")&&g.next_lawful_step?.includes("8x8"),"next source step still G0");
 ok(state.G0_source_audit_authorized===true&&state.G0_source_local_CI_verified===true,"G0-only work allowed");
 for(const k of ["G0_source_census_frozen","G0_full_source_assertion_census_complete","G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_campaign_new_promotion_authorized","G7_authorized","L_primitive_schema_closure_complete","L_recursive_IA_authorized","L_Discovery_Protocol_authorized","WL_cross_track_comparison_authorized","global_qualified_module_manifest_change_authorized","PR70_merge_authorized"])ok(state[k]===false,"no early stage/protocol/merge "+k);
 ok(source.source_census_frozen===false&&source.mathematical_theorem_qualified===false&&ssc.revision.G1_authorized===false,"source source still unqualified");
 ok(g.owner_external_verification_bypass?.status==="OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE"&&g.owner_external_verification_bypass?.effect==="ONLY_OUTSIDE_REVIEW_CALLS_WAIVED","external review waiver no semantic pass");
 ok(!j(g).includes("W-SSC-"),"L source track independence");
 return err;
}
const base=check(),errors=[...base],mutants=[
 ["mark source census frozen",g=>{g.current_source_census.frozen=true}],
 ["declare source globally complete",g=>{g.current_source_census.source_complete=true}],
 ["promote G1",g=>{g.current_lawful_state.G1_authorized=true}],
 ["promote G7",g=>{g.current_lawful_state.G7_authorized=true}],
 ["promote IA",g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ["promote cross-track",g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ["promote merge",g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ["change Cl71 signature",g=>{g.L032_Cl71_H1_mixed_source.signature="+,+,+,+,+,+,+,+"}],
 ["change gamma count",g=>{g.L032_Cl71_H1_mixed_source.eight_source_16x16_gamma_generators=7}],
 ["erase 6561 cases",g=>{g.L032_Cl71_H1_mixed_source.real_frame_Higgs_coeff_grid=0}],
 ["change source H1 mixed coefficient",g=>{g.L032_Cl71_H1_mixed_source.source_H1_relative_coefficients[1]="1/2 e phi"}],
 ["falsely close printed 8x8 H1",g=>{g.L032_Cl71_H1_mixed_source.full_printed_H1_8x8_source_entries_complete=true}],
 ["falsely close Table5",g=>{g.L032_Cl71_H1_mixed_source.full_Table5_D4_roots_and_8Splus_weights_audited=true}],
 ["falsely close physics",g=>{g.L032_Cl71_H1_mixed_source.f4_E8_generation_physics_qualified=true}],
 ["wrong source revision",g=>{g.L032_Cl71_H1_mixed_source.frozen_source="arXiv:0711.0770v2"}],
 ["wrong source SHA",g=>{g.L032_Cl71_H1_mixed_source.git_blob_sha="STALE"}],
 ["wrong SSC source SHA",g=>{g.current_source_census.git_blob_sha="STALE"}],
 ["wrong source verifier SHA",g=>{g.G0_23_CI.source_verifier.git_blob_sha="STALE"}],
 ["wrong SSC verifier SHA",g=>{g.G0_23_CI.ssc_verifier.git_blob_sha="STALE"}],
 ["lose negative prior run",g=>{g.historical_failures=g.historical_failures.filter(x=>x.run_id!==37879714482)}],
 ["fabricate external review",g=>{g.G0_23_CI.source.external_cold_review_passed=true}],
 ["promote source all math",g=>{g.G0_23_CI.mathematical_Lie_or_unification_theorem_qualified=true}],
 ["next action G1",g=>{g.next_lawful_step="Proceed G1"}],
 ["import W source",g=>{g.next_lawful_step+=" W-SSC-103"}]
];
let rejected=0;
if(!base.length)for(const [label,fn]of mutants){const obj=clone(gate),before=j(obj);fn(obj);if(j(obj)===before)errors.push("NOOP "+label);else if(check(obj).length===0)errors.push("ESCAPED "+label);else rejected++;}
console.log(JSON.stringify({schema:"isograph.exp062-l-current-G0-gate023-cl71-source.v0.1",pass:!errors.length,errors,
ssc_items:191,changed:"L-SSC-032",unchanged:190,source_gamma_pairs:64,source_frame_Higgs_grid:6561,
adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:base.length?"BASELINE_FAILED":"TESTED",
G1_to_G7_authorized:false,external_cold_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
