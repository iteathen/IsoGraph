import fs from 'node:fs';
import crypto from 'node:crypto';
const expected={"gate":"35daabca64eb6fa454e1d5ee800eda1d71b16fcc","source":"1fb691f7dcbf578b01cae1df78760d2789a09b48","demand":"ff06cb6cef785ac1328fad4ad274b618547252b5","register":"3bfb8812f892bd3003324e2b0ea66592fd13b3c8","coverage":"016118678a6d3fe5d45af7dcb82875ac469e9a6d","review":"6427cebc194754983d21616d539729c71b964577","oracle":"b84093d70a30dbab47d0ea24b3c59f553c0f7364","defect":"2409daa041c12e4fde79c4eff09a58886805b0a7","sourceVerifier":"bdfedd06739dda8e85ea0e0d184cab8689b77ded","workflow":"d1e3b8d3786e273f9888eceb2d1e63454098edd7"};
const paths={"gate":"experiments/062/W_CURRENT_STAGE_GATE_0_45.json","source":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_18.json","demand":"experiments/062/W_G0_W01_SOURCE_DEMAND_PROJECTION_0_7.json","register":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_4.json","coverage":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_3.json","review":"experiments/062/W_G0_W01_44_EXISTING_SOURCE_DIRECT_REVIEW_0_1.json","oracle":"experiments/062/W01_G0_INDEPENDENT_SOURCE_LITERAL_EXPECTATIONS_0_1.json","defect":"experiments/062/W01_G0_SOURCE_EXPRESSION_AND_ORBIT_COUNT_DEFECT_0_1.json","sourceVerifier":"experiments/062/tools/verify-w01-g0-existing-44-source-0-1.mjs","workflow":".github/workflows/experiment-062-w01-g0-source-44-0-1.yml"};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
function validate(x){
const e=[],c=(x,m)=>{if(!x)e.push(m)};
c(x?.schema==="isograph.exp062-w-current-stage-gate.v0.45"&&x?.track==="W"&&x?.semantic_authority===false,"version W not semantic authority");
c(x?.status==="W_G0_SSC0_18_W01_44_EXISTING_ITEM_SOURCE_REVIEW_15_EXPRESSION_CORRECTIONS_82_DIRECT_69_OUTSTANDING_UNFROZEN","current state");
c(x?.supersedes?.git_blob_sha==="29aac5ad45e96eb247a630da5b4ea0ddc3758e08"&&x?.governing_method?.endsWith("PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md"),"method and previous stage");
c(x?.current_source_census?.git_blob_sha===expected.source&&x?.current_source_census?.frozen===false&&x?.current_source_census?.source_items===151&&x?.current_source_census?.changed_ids?.length===15,"current source 151/15");
c(x?.current_historical_86_member_projection?.git_blob_sha===expected.demand&&x?.current_historical_86_member_projection?.historical_only===true&&x?.current_historical_86_member_projection?.qualification===false&&x?.current_historical_86_member_projection?.member_count===86,"86 historical only");
c(x?.current_all_151_conservation_register?.git_blob_sha===expected.register&&x?.current_all_151_conservation_register?.review_complete===false&&x?.current_all_151_conservation_register?.eligible_for_G1===false,"all151 register non-qualified");
c(x?.current_source_coverage?.git_blob_sha===expected.coverage&&x?.current_source_coverage?.direct_existing_items_primary_source_reviewed===82&&x?.current_source_coverage?.source_rows_outstanding_direct_cold_review===69&&x?.current_source_coverage?.nine_source_complete===false&&x?.current_source_coverage?.W01_48_page_new_assertion_completeness==="NOT_PROVED","current 82/69 and no whole 48p assertion proof");
c(x?.W01_direct_existing_body_source_review?.git_blob_sha===expected.review&&x?.W01_direct_existing_body_source_review?.reviewed_existing_W01_source_items===44&&x?.W01_direct_existing_body_source_review?.changed_items===15&&x?.W01_direct_existing_body_source_review?.source_expression_structured===50&&x?.W01_direct_existing_body_source_review?.full_W01_source_assertion_completeness===false,"source direct 44/15/50 under limitation");
c(x?.W01_independent_source_literals?.git_blob_sha===expected.oracle&&x?.W01_independent_source_literals?.external_independent_third_party===false,"exact source oracle not third party");
c(x?.source_fidelity_defect?.git_blob_sha===expected.defect&&x?.source_fidelity_defect?.W026_quaternion_variable==="SOURCE_PRINTED_x_BINDER"&&x?.source_fidelity_defect?.source_orbit_count_discrepancy==="SOURCE_SIX_CLAIM_FIVE_NAMED_PRESERVED","preserve W01 negative evidence");
c(x?.current_source_verifier?.git_blob_sha===expected.sourceVerifier&&x?.current_source_verifier?.mutation_count===62&&x?.current_source_verifier?.mutations_rejected_local===62&&x?.current_source_verifier?.Node_CI==="PENDING_AT_ARTIFACT_CREATION","source verifier properly local not CI");
c(x?.CI_workflow?.git_blob_sha===expected.workflow&&x?.CI_workflow?.status_at_record_creation==="NOT_OBSERVED","workflow not falsely passed");
c(x?.owner_external_bypass?.waives==="THIRD_PARTY_CALLS_ONLY","external bypass not CI");
const st=x?.current_lawful_state||{};
c(st.G0_open===true&&st.G0_complete===false&&st.G0_frozen===false&&st.full_W_source_audit_complete===false&&st.full_W_demand_membership_frozen===false&&st.all_151_closure_re_adjudicated===false,"G0 open and incomplete");
for(const key of ["G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","DP_authorized","cross_track_synthesis_authorized"])c(st[key]===false,"premature stage "+key);
c(x?.source_reconstruction?.W01_six_M_orbits_but_five_names_unrepaired===true&&x?.source_reconstruction?.W01_Einstein_minus_R_distinct_from_plus_L_and_half_flat_minus_L===true&&x?.source_reconstruction?.W01_OS_support_tau_less_than_zero===true&&x?.source_reconstruction?.other_W01_new_assertions_absent==="UNPROVED"&&x?.source_reconstruction?.W01_author_PDF_byte_identity==="UNVERIFIED","W01 negative explicit");
c(x?.invalidations?.SSC0_17?.startsWith("HISTORICAL_W01")&&x?.invalidations?.W_G1_G7?.startsWith("INVALIDATED")&&x?.invalidations?.L==="NOT_TOUCHED","invalidate source predecessor downstream and preserve L");
return e;
}
const tests=[
["G0 falsely frozen",x=>x.current_lawful_state.G0_frozen=true],
["G0 falsely complete",x=>x.current_lawful_state.G0_complete=true],
["G1 prematurely authorized",x=>x.current_lawful_state.G1_authorized=true],
["G2 prematurely authorized",x=>x.current_lawful_state.G2_authorized=true],
["G3 prematurely authorized",x=>x.current_lawful_state.G3_authorized=true],
["G4 prematurely authorized",x=>x.current_lawful_state.G4_authorized=true],
["G5 prematurely authorized",x=>x.current_lawful_state.G5_authorized=true],
["G5H prematurely authorized",x=>x.current_lawful_state.G5H_authorized=true],
["G6 prematurely authorized",x=>x.current_lawful_state.G6_authorized=true],
["G7 prematurely authorized",x=>x.current_lawful_state.G7_authorized=true],
["recIA premature",x=>x.current_lawful_state.recursive_IA_authorized=true],
["DP premature",x=>x.current_lawful_state.DP_authorized=true],
["cross-track synthesis premature",x=>x.current_lawful_state.cross_track_synthesis_authorized=true],
["external review bypass expanded",x=>x.owner_external_bypass.waives="ALL_TESTS"],
["source new body wrongly sealed",x=>x.current_source_census.frozen=true],
["source 151 count changed",x=>x.current_source_census.source_items=150],
["review 82 called 151",x=>x.current_source_coverage.direct_existing_items_primary_source_reviewed=151],
["remaining source 69 declared zero",x=>x.current_source_coverage.source_rows_outstanding_direct_cold_review=0],
["W01 whole 48p asserted complete",x=>x.current_source_coverage.W01_48_page_new_assertion_completeness="PROVED"],
["old demand 86 falsely qualified",x=>x.current_historical_86_member_projection.qualification=true],
["old demand historical flag removed",x=>x.current_historical_86_member_projection.historical_only=false],
["register G1 eligible",x=>x.current_all_151_conservation_register.eligible_for_G1=true],
["W01 review claims all assertions found",x=>x.W01_direct_existing_body_source_review.full_W01_source_assertion_completeness=true],
["W01 source orbital anomaly repaired",x=>x.source_reconstruction.W01_six_M_orbits_but_five_names_unrepaired=false],
["W01 OS sign flipped",x=>x.source_reconstruction.W01_OS_support_tau_less_than_zero=false],
["W01 half-flat conflated",x=>x.source_reconstruction.W01_Einstein_minus_R_distinct_from_plus_L_and_half_flat_minus_L=false],
["W01 invent source PDF byte identity",x=>x.source_reconstruction.W01_author_PDF_byte_identity="CONFIRMED"],
["W01 source variable wrong",x=>x.source_fidelity_defect.W026_quaternion_variable="INVENTED_q_BINDER"],
["current SSC SHA wrong",x=>x.current_source_census.git_blob_sha="BAD"],
["register SHA wrong",x=>x.current_all_151_conservation_register.git_blob_sha="BAD"],
["source oracle SHA wrong",x=>x.W01_independent_source_literals.git_blob_sha="BAD"],
["W source 62 mutation count overstated",x=>x.current_source_verifier.mutations_rejected_local=63],
["CI pretended passed at creation",x=>x.current_source_verifier.Node_CI="PASS"],
["old SSC invalidation deleted",x=>delete x.invalidations.SSC0_17],
["old G1 G7 invalidation erased",x=>x.invalidations.W_G1_G7="PASSED"],
["L declared changed",x=>x.invalidations.L="MODIFIED"]
];
const clone=x=>JSON.parse(JSON.stringify(x));
const gate=read(paths.gate);
const errors=validate(gate),rejected=[],escaped=[];
for(const [name,mut] of tests){const x=clone(gate);mut(x);if(validate(x).length)rejected.push(name);else escaped.push(name)}
for(const [name,p] of Object.entries(paths))if(sha(p)!==expected[name])errors.push('SOURCE_BLOB_MISMATCH '+name);
errors.push(...escaped.map(x=>'ESCAPED_MUTATION '+x));
console.log(JSON.stringify({schema:'isograph.exp062-w01-g0-stage-0-45-verifier.v0.1',pass:errors.length===0,errors,stage:'G0_OPEN_UNFROZEN',W01_reviewed_existing:44,W_total_direct_reviewed:82,W_pending_direct_source:69,W01_expression_corrections:15,source_member_count:151,old_W_historical_members:86,G1_G7_authorized:false,adversarial_mutations_total:tests.length,mutations_rejected:rejected.length,rejected,external_review:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(errors.length)process.exitCode=1;
