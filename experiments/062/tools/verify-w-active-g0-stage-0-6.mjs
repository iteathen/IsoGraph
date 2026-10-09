import fs from 'node:fs';
import crypto from 'node:crypto';
const pins={"gate":["experiments/062/W_CURRENT_STAGE_GATE_0_51.json","933f615ac4ce3a290e3648f33fa31dbc9c325b42"],"S":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_24.json","d67d6a27ca604e774a82f0e6a8daa0e9f80b8ab4"],"R":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_10.json","56cf158ec5e7acdce596601f672863bf40a53bf0"],"C":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_9.json","d9fe088096724e00533f3bd1c0918c1cdff306eb"],"D":["experiments/062/W_G0_W04B_SOURCE_DEMAND_PROJECTION_0_11.json","4300200cdf41650d52cd8ba782d4e561195994b3"],"audit03":["experiments/062/W03_G0_FULL_PROJECT_STATUS_REVERSE_AUDIT_0_1.json","1f4485d628ca161fdbd7c3ce81e84718ae3a7d62"],"audit04b":["experiments/062/W04B_G0_FULL_AUTHOR_POST_REVERSE_AUDIT_0_1.json","1c5b8e1bcaed4dba555711a06b8cbc35d2cffa0a"],"defect03":["experiments/062/W03_G0_PROJECT_STATUS_ASSERTION_DEFECT_0_1.json","3223df780ecaa12ad23a2337c0d0139baa9e0fd6"],"oldGate":["experiments/062/W_CURRENT_STAGE_GATE_0_50.json","b28f4d8408b576c25f1ada2eaff35acce31c087b"],"g1":["experiments/062/W_EXTRACTION_RECONCILED_0_23.json","ccf4713009d624c4f9f84010f48f899e3aae2e22"],"g2":["experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json","4a6ef4b2e4987c6875e6fc4c0205a04f84c37b57"],"g3":["experiments/062/W_G3_CORE_DEFINABILITY_0_7.json","62e1236d7aa4c7b2814606b1640e35e280b73919"],"g7":["experiments/062/W_G7_RELATIONAL_TWO_STEP_RETURN_INSTANTIATION_0_1.json","4fb7708649aa37807ab87baea9a31c8358ec9b42"],"bypass":["experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json","b123824d8adb26a80f3fbb675464e59fc2aff2b2"]};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),cp=x=>JSON.parse(JSON.stringify(x));
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
function validate(ctx){
const errors=[],check=(t,s)=>{if(!t)errors.push(s)};
const {gate,S,R,C,D,audit03,audit04b,defect03,oldGate,g1,g2,g3,g7,bypass}=ctx;
const state=gate?.current_lawful_state;
check(gate?.schema==="isograph.exp062-w-current-stage-gate.v0.51"&&gate?.status==="W_G0_SSC0_24_W03_COMPLETE_LIVE_PROJECT_STATUS_REVERSE_17_SOURCE_CLAIMS_NINE_SOURCE_REVERSE_OPEN"&&gate?.track==="W"&&gate?.semantic_authority===false,"current W G0.51 gate");
check(gate?.supersedes?.git_blob_sha===pins.oldGate[1]&&gate?.current_source_census?.git_blob_sha===pins.S[1]&&gate?.current_all_151_conservation_register?.git_blob_sha===pins.R[1]&&gate?.current_source_coverage?.git_blob_sha===pins.C[1],"strict stage source/reg/cov pins");
check(gate?.current_historical_86_member_projection?.git_blob_sha===pins.D[1]&&gate?.current_historical_86_member_projection?.current_ssc0_24_not_regenerated_historical_only===true,"86 historical view NOT requalified");
check(gate?.current_W03_full_live_project_status_review?.git_blob_sha===pins.audit03[1]&&gate?.current_W03_source_defect?.git_blob_sha===pins.defect03[1]&&gate?.current_W03_verifier?.git_blob_sha==="8911e3fb2439ce66efe86d6ed509df6214b78d57","current W03 literal source review/defect/verifier pins");
check(gate?.current_W04b_full_live_article_review?.git_blob_sha===pins.audit04b[1],"W04b correct historical tuple preserved");
check(state?.G0_open===true&&state?.G0_complete===false&&state?.G0_frozen===false&&state?.source_census_frozen===false&&state?.all_nine_source_full_reverse_assertion_enumeration_complete===false&&state?.Oct03_mutable_source_byte_identity_verified===false&&state?.complete_W_151_semantic_demand_membership_requalified===false,"source G0 incomplete and byte identity unresolved");
for(const key of ["G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"])check(state?.[key]===false,"stage must remain blocked "+key);
check(S?.schema==="woit.source-semantic-census.v0.24"&&S?.items?.length===151&&S?.closure_claims?.sealed===false&&S?.correction?.G0_frozen===false&&S?.correction?.G1_authorized===false,"current W source 151 unfrozen");
check(R?.rows?.length===151&&C?.rows?.length===151&&D?.items?.length===86,"exact source/register/coverage/demand shapes");
if(R?.rows?.length!==151||C?.rows?.length!==151||S?.items?.length!==151||D?.items?.length!==86)return errors;
check(R.rows.every((y,i)=>y.source_body_exact===S.items[i].obligation&&y.census_id===S.items[i].id&&y.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"&&y.historical_closure_accepted_as_current===false),"all151 source assertions unclosed");
check(C.rows.every((y,i)=>y.body_length_chars===S.items[i].obligation.length&&y.census_id===S.items[i].id&&y.source_expression_statement_count===(S.items[i].source_expression_census?.statements?.length||0)),"all151 exact formula count reconstruction");
check(D.items.every(v=>v.track==="W"&&v.body===S.items.find(x=>x.id===v.census_id)?.obligation)&&D.items.every(v=>!["W-SSC-025","W-SSC-057","W-SSC-058"].includes(v.census_id)),"old 86 exact bodies/none W03");
check(R.counts?.old_projection_omits_old_incomplete===52&&R.counts?.old_projection_includes_old_closed_schema===8&&R.counts?.historical_nonmembers===65&&R.counts?.historical_W_demand_projection===86,"old 52 missing 8 wrong included unresolved");
check(R.counts?.W03_source_incidences_restored===17&&C.by_unit?.W03?.source_expression_statements===17&&C.counts?.W03_current_live_status_page_lines===23,"live W03 source 17/23");
check(C.counts?.original_nine_source_reverse_assertion_enumeration_complete===false&&C.counts?.source_revision_Oct03_bytes_verified===false&&R.counts?.all_nine_source_full_reverse_assertion_census_complete===false,"full source incomplete");
check(audit03?.line_map?.length===23&&audit03?.source_literal_assertion_oracle?.length===17&&audit03?.source?.Oct03_2026_retrieved_bytes==="NOT_AVAILABLE_OR_VERIFIED","source W03 23 lines 17 claims not Oct3");
check(audit04b?.line_map?.length===22&&audit04b?.source_literal_incidence_oracle?.length===22&&audit04b?.source?.original_2026_10_03_byte_identity==="NOT_ESTABLISHED","W04b 22-line source Oct3 unconfirmed");
check(S.items.find(x=>x.id==="W-SSC-057")?.source_expression_census?.statements?.[4]?.typed_roles?.polarity==="EXACTLY"&&S.items.find(x=>x.id==="W-SSC-057")?.source_expression_census?.statements?.[9]?.typed_roles?.relation==="AUTHOR_ANALOGY_NOT_ESTABLISHED_SEMANTIC_EQUIVALENCE","W03 EXACTLY and p-infinity analogy negation");
check(S.items.find(x=>x.id==="W-SSC-058")?.source_expression_census?.statements?.[2]?.typed_roles?.status==="WORK_IN_PROGRESS"&&S.items.find(x=>x.id==="W-SSC-025")?.state==="OPEN","W03 mutable provisional guard");
check(defect03?.affected?.length===2&&defect03?.source?.frozen_retrieval==="2026_10_03_BYTES_UNVERIFIED","source W03 correction/Oct3 unresolved");
check(oldGate?.current_source_census?.git_blob_sha==="bc86b39fdd69a3afb4c802771fcc330711683391"&&oldGate?.current_lawful_state?.G0_frozen===false&&oldGate?.current_lawful_state?.G1_authorized===false,"predecessor scope G0");
check(g1?.items?.length===84&&g1?.items?.reduce((n,x)=>n+x.occurrences.length,0)===446&&g2?.counts?.semantic_occurrence_nodes===446&&g3?.counts?.occurrences===445&&g3?.input?.g2_graph?.path==="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_3.json","historical 446->445 invalidated G3/G4");
check(eq(g7?.ruling?.closed_occurrences,["W-SSC-097-O06","W-SSC-097-O04"])&&g7?.source_instance_binding?.R?.totality_assumed===false&&g7?.source_instance_binding?.R?.single_valuedness_assumed===false&&gate?.invalidations?.G1_through_G7==="STILL_BLOCKED_G0_UNFROZEN","G7 incorrect source map closure remains invalid");
check(bypass?.scope?.waived_only?.every(s=>/external|third.party/i.test(s))&&bypass?.scope?.still_required?.some(s=>/deterministic/i.test(s)),"owner bypass only third-party review");
check(gate?.nonclaims?.some(x=>/No all-nine-source reverse assertion census/.test(x))&&gate?.nonclaims?.some(x=>/No proof of W03 original internal-symmetry/.test(x)),"nonclaims provenance");
return errors;
}
const tests=[
["G0 falsely frozen",o=>o.gate.current_lawful_state.G0_frozen=true],
["G0 falsely complete",o=>o.gate.current_lawful_state.G0_complete=true],
["source SSC falsely frozen",o=>o.gate.current_lawful_state.source_census_frozen=true],
["source nine reverse falsely complete",o=>o.gate.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
["Oct3 bytes falsely verified",o=>o.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["G1 unauthorized promotion",o=>o.gate.current_lawful_state.G1_authorized=true],
["G2 unauthorized promotion",o=>o.gate.current_lawful_state.G2_authorized=true],
["G3 unauthorized promotion",o=>o.gate.current_lawful_state.G3_authorized=true],
["G4 unauthorized promotion",o=>o.gate.current_lawful_state.G4_authorized=true],
["G5 unauthorized promotion",o=>o.gate.current_lawful_state.G5_authorized=true],
["G5H unauthorized promotion",o=>o.gate.current_lawful_state.G5H_authorized=true],
["G6 unauthorized promotion",o=>o.gate.current_lawful_state.G6_authorized=true],
["G7 unauthorized promotion",o=>o.gate.current_lawful_state.G7_authorized=true],
["IA unauthorized",o=>o.gate.current_lawful_state.recursive_IA_authorized=true],
["DTS unauthorized",o=>o.gate.current_lawful_state.DTS_authorized=true],
["DP unauthorized",o=>o.gate.current_lawful_state.DP_authorized=true],
["cross-track premature synthesis",o=>o.gate.current_lawful_state.cross_track_synthesis_authorized=true],
["wrong source pin",o=>o.gate.current_source_census.git_blob_sha="NO"],
["wrong register pin",o=>o.gate.current_all_151_conservation_register.git_blob_sha="NO"],
["wrong coverage pin",o=>o.gate.current_source_coverage.git_blob_sha="NO"],
["wrong historical86 pin",o=>o.gate.current_historical_86_member_projection.git_blob_sha="NO"],
["relabel old86 current SSC",o=>o.gate.current_historical_86_member_projection.current_ssc0_24_not_regenerated_historical_only=false],
["W03 direct audit missing",o=>o.gate.current_W03_full_live_project_status_review.git_blob_sha="NO"],
["W03 17 scope erased",o=>o.audit03.source_literal_assertion_oracle.pop()],
["W03 chronology abridged",o=>o.audit03.line_map.pop()],
["W03 2022 EXACTLY weakened",o=>o.S.items.find(x=>x.id==="W-SSC-057").source_expression_census.statements[4].typed_roles.polarity="SOME"],
["W03 p-infinity analogy theorem",o=>o.S.items.find(x=>x.id==="W-SSC-057").source_expression_census.statements[9].typed_roles.relation="PROVED"],
["W03 July state qualified",o=>o.S.items.find(x=>x.id==="W-SSC-058").source_expression_census.statements[2].typed_roles.status="COMPLETE"],
["W03 defect erased",o=>o.defect03.affected=[]],
["W04b source earlier audit erased",o=>o.audit04b.line_map.pop()],
["source body false",o=>o.S.items.find(x=>x.id==="W-SSC-057").obligation+="FAKE"],
["source register body false",o=>o.R.rows.find(x=>x.census_id==="W-SSC-057").source_body_exact="FAKE"],
["151 census row dropped",o=>o.S.items.pop()],
["151 register row dropped",o=>o.R.rows.pop()],
["151 coverage row dropped",o=>o.C.rows.pop()],
["historical86 W03 new member",o=>o.D.items.push({census_id:"W-SSC-057"})],
["old 52 omitted mislabeled",o=>o.R.counts.old_projection_omits_old_incomplete=0],
["old 8 closed included mislabeled",o=>o.R.counts.old_projection_includes_old_closed_schema=0],
["old G3 445 quietly becomes 446",o=>o.g3.counts.occurrences=446],
["old G7 partial relation becomes total",o=>o.g7.source_instance_binding.R.totality_assumed=true],
["external bypass internal waived",o=>o.bypass.scope.waived_only.push("all CI")]
];
const x=Object.fromEntries(Object.entries(pins).map(([k,[path]])=>[k,read(path)]));
const errs=validate(x),rejected=[],escaped=[];
if(!errs.length){for(const [n,f] of tests){const q=cp(x);f(q);if(validate(q).length)rejected.push(n);else escaped.push(n)}}else errs.push('POSITIVE_BASELINE_FAILED_MUTATION_COUNT_NOT_QUALIFIED');
for(const [k,[path,blob]] of Object.entries(pins))if(sha(path)!==blob)errs.push('SOURCE_BLOB_PIN '+k);
errs.push(...escaped.map(x=>'ESCAPED_MUTATION '+x));
if(rejected.length!==tests.length)errs.push('ADVERSARIAL_COVERAGE_INCOMPLETE');
console.log(JSON.stringify({schema:'isograph.exp062-w-active-g0-stage-guard.v0.6',pass:errs.length===0,errors:errs,stage:'G0_OPEN_UNFROZEN_SSC0_24',source_items:151,existing_source_bodies_reviewed:151,full_nine_source_reverse_complete:false,Oct03_mutable_source_identity_verified:false,W03_live_page_lines:23,W03_new_source_statements:17,predecessor_W04b_source_statements:25,historical_86_view_members:86,old_G1_G2:446,old_G3:445,G7_old_source_closure_invalid:true,adversarial_total:tests.length,rejected:rejected.length,rejected},null,2));
if(errs.length)process.exitCode=1;
