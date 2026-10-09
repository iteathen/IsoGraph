import fs from "node:fs";
import crypto from "node:crypto";
const E="experiments/062/",L="research/woit-lisi-isomorph/lisi/";
const P={
 gate:E+"L_CURRENT_STAGE_GATE_0_22.json",prior:E+"L_CURRENT_STAGE_GATE_0_21.json",
 ssc:L+"SOURCE_SEMANTIC_CENSUS_0_22.json",packet:L+"LISI_L01_ELECTROWEAK_WEW_CARTAN_TABLE4_G0_0_1.json",
 sourceVerifier:E+"tools/verify-l-g0-l01-wew-cartan-table4-source-0-1.mjs",
 sscVerifier:E+"tools/verify-l-g0-l031-ssc-source-0-22.mjs",
 defect:E+"L031_SSC022_SOURCE_REVISION_MUTATION_ESCAPE_0_1.json"
};
const load=p=>JSON.parse(fs.readFileSync(p,"utf8")),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash("sha1").update(Buffer.concat([Buffer.from("blob "+b.length+"\0"),b])).digest("hex")};
const gate=load(P.gate),old=load(P.prior),ssc=load(P.ssc),packet=load(P.packet);
function check(g=gate){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)},s=g.current_lawful_state||{},q=g.G0_22_CI||{},p=g.L031_wew_Cartan_Table4_G0_source_packet||{};
 ok(g.schema==="isograph.exp062-l-current-stage-gate.v0.22"&&g.track==="L"&&g.status?.includes("G0")&&g.status?.includes("UNFROZEN")&&g.authority_effect==="PROCEDURAL_STAGE_ROUTING_ONLY"&&g.semantic_authority===false,"G0 gate procedural non-semantic");
 ok(g.supersedes?.path===P.prior&&g.supersedes?.git_blob_sha===sha(P.prior)&&old.current_lawful_state?.G1_authorized===false,"exact historical prior gate");
 ok(g.current_source_census?.path===P.ssc&&g.current_source_census?.git_blob_sha===sha(P.ssc)&&g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&j(g.current_source_census?.changed_from_predecessor)===j(["L-SSC-031"]),"source 191 IDs one L031 delta");
 ok(g.current_source_census?.frozen===false&&g.current_source_census?.source_complete===false&&ssc.guards.source_census_freeze_complete===false,"source frozen FALSE");
 ok(p.path===P.packet&&p.git_blob_sha===sha(P.packet)&&p.source==="L01 2007-11-06 arXiv:0711.0770v1, §2.2.2 printed pages 10-11","exact L01 source revision and packet SHA");
 ok(p.source_W_su2_L_independent_of_B1_su2_R===true&&p.source_4x4_chiral_diagonal_blocks===2&&p.real_six_source_W_B1_cases===729&&p.source_complex_matrix_cells===11664,"separate W/B1 chiral finite source");
 ok(p.Table4_source_rows===16&&p.Table4_source_cells===80&&p.Cartan_source_cases===9,"all table rows and Cartan scope");
 for(const key of ["source_graviweak_Cl7_1_complete","source_all_weights_root_vectors_complete","standard_model_phenomenology_verified","source_full_primitive_closure","external_review_passed"])ok(p[key]===false,"unexpanded source obligation "+key);
 ok(p.diagnostic_bivector_witness_not_source_w_mutensor_identification===true,"derived gamma bivector witness cannot override source w^munu contraction");
 ok(q.source?.id===37878875571&&q.source?.conclusion==="success"&&q.source?.adversarial_rejected===32&&q.source?.source_matrix_cells===11664&&q.source?.external_cold_review_passed===false,"source exact frozen scoped CI");
 ok(q.ssc?.id===37879121188&&q.ssc?.conclusion==="success"&&q.ssc?.adversarial_rejected===25&&q.ssc?.unchanged_source_items===190&&q.ssc?.external_cold_review_passed===false,"source census exact CI");
 ok(q.source_verifier?.path===P.sourceVerifier&&q.source_verifier?.git_blob_sha===sha(P.sourceVerifier),"source verifier immutably pinned");
 ok(q.ssc_verifier?.path===P.sscVerifier&&q.ssc_verifier?.git_blob_sha===sha(P.sscVerifier),"SSC verifier immutably pinned");
 ok(q.failed_baseline?.path===P.defect&&q.failed_baseline?.git_blob_sha===sha(P.defect)&&q.failed_baseline?.run_id===37879042139&&q.failed_baseline?.result==="FAIL_VERSION_LABEL_MUTATION_ESCAPED","failed mutation history conserved");
 ok(q.G0_source_complete===false&&q.mathematical_theorem_qualified===false&&q.external_cold_review_passed===false&&q.G1_authorized===false,"CI != math or G1");
 ok(g.historical_failures?.some(x=>x.run_id===37879042139&&x.status==="failed")===true,"failed attempt preserved in historical gate");
 ok(g.outstanding_source_reconstruction?.some(x=>x.includes("graviweak Cl(7,1)"))&&g.outstanding_source_reconstruction?.some(x=>x.includes("L01–L06")),"remaining source reconstruction not hidden");
 ok(g.next_lawful_step?.startsWith("Continue L-only G0")&&g.next_lawful_step?.includes("Cl(7,1)")&&g.next_lawful_step?.includes("H1=1/2 omega+1/4 e phi+w_ew"),"next stage still G0 source");
 ok(s.G0_source_audit_authorized===true&&s.G0_source_local_CI_verified===true,"G0 local source work only");
 for(const k of ["G0_source_census_frozen","G0_full_source_assertion_census_complete","G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_campaign_new_promotion_authorized","G7_authorized","L_primitive_schema_closure_complete","L_recursive_IA_authorized","L_Discovery_Protocol_authorized","WL_cross_track_comparison_authorized","global_qualified_module_manifest_change_authorized","PR70_merge_authorized"])ok(s[k]===false,"no G-stage/IA/cross promotion "+k);
 ok(packet.G1_authorized===false&&packet.mathematical_theorem_qualified===false&&ssc.revision?.G1_authorized===false,"exact source ancestor remains unqualified");
 ok(g.owner_external_verification_bypass?.status==="OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE"&&g.owner_external_verification_bypass?.effect==="ONLY_OUTSIDE_REVIEW_CALLS_WAIVED","owner bypass external calls only");
 ok(!j(g).includes("W-SSC-"),"no W source premises");
 return errors;
}
const baseline=check(),errors=[...baseline],mutations=[
 ["claim G0 complete",g=>{g.current_source_census.frozen=true}],
 ["claim all source complete",g=>{g.current_source_census.source_complete=true}],
 ["promote G1",g=>{g.current_lawful_state.G1_authorized=true}],
 ["promote G4",g=>{g.current_lawful_state.G4_authorized=true}],
 ["promote G7",g=>{g.current_lawful_state.G7_authorized=true}],
 ["promote IA",g=>{g.current_lawful_state.L_recursive_IA_authorized=true}],
 ["promote cross-track",g=>{g.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ["promote merge",g=>{g.current_lawful_state.PR70_merge_authorized=true}],
 ["merge source W and B1",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.source_W_su2_L_independent_of_B1_su2_R=false}],
 ["flip field chirality count",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.source_4x4_chiral_diagonal_blocks=1}],
 ["claim Cl7 complete",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.source_graviweak_Cl7_1_complete=true}],
 ["claim source weight universal",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.source_all_weights_root_vectors_complete=true}],
 ["claim physics proven",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.standard_model_phenomenology_verified=true}],
 ["claim bivector witness primary source",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.diagnostic_bivector_witness_not_source_w_mutensor_identification=false}],
 ["change current paper revision",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.source="different arxiv revision"}],
 ["delete Table4 rows",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.Table4_source_rows=8}],
 ["wrong source SHA",g=>{g.L031_wew_Cartan_Table4_G0_source_packet.git_blob_sha="WRONG"}],
 ["wrong SSC SHA",g=>{g.current_source_census.git_blob_sha="WRONG"}],
 ["wrong source test SHA",g=>{g.G0_22_CI.source_verifier.git_blob_sha="WRONG"}],
 ["wrong census test SHA",g=>{g.G0_22_CI.ssc_verifier.git_blob_sha="WRONG"}],
 ["forget failed run",g=>{g.historical_failures=g.historical_failures.filter(x=>x.run_id!==37879042139)}],
 ["make external pass",g=>{g.G0_22_CI.source.external_cold_review_passed=true}],
 ["change next instruction to G1",g=>{g.next_lawful_step="Start G1 now"}],
 ["smuggle W premise",g=>{g.next_lawful_step+=" W-SSC-103"}]
];
let rejected=0;if(!baseline.length)for(const [label,fn]of mutations){const g=copy(gate),before=j(g);fn(g);if(before===j(g))errors.push("NOOP "+label);else if(check(g).length===0)errors.push("ESCAPED "+label);else rejected++;}
console.log(JSON.stringify({schema:"isograph.exp062-l-g0-stage022-wew-source-replay.v0.1",pass:errors.length===0,errors,
ssc_items:191,ssc_changed:["L-SSC-031"],ssc_unchanged:190,
source_real_wew_matrix_cases:729,table4_source_rows:16,
adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.length?"BASELINE_FAILED":"TESTED",
G1_to_G7_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
