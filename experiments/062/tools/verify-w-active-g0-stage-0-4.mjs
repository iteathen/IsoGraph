import fs from 'node:fs';
import crypto from 'node:crypto';
const paths={"gate":"experiments/062/W_CURRENT_STAGE_GATE_0_44.json","src":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_17.json","register":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_3.json","demand":"experiments/062/W_G0_MULTISOURCE_SOURCE_DEMAND_PROJECTION_0_6.json","g1":"experiments/062/W_EXTRACTION_RECONCILED_0_23.json","g2":"experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json","g3":"experiments/062/W_G3_CORE_DEFINABILITY_0_7.json","g7":"experiments/062/W_G7_RELATIONAL_TWO_STEP_RETURN_INSTANTIATION_0_1.json","si":"experiments/062/W097_G0_CROSS_OCCURRENCE_SI_DEFECT_0_1.json","bypass":"experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json","coverage":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_2.json","oracle":"experiments/062/W_G0_SEVEN_SOURCE_LITERAL_ORACLE_0_1.json"};
const shaExpected={"gate":"29aac5ad45e96eb247a630da5b4ea0ddc3758e08","src":"85ce3cab9cd2a4f77c0bc2d49ab8c28214754607","register":"be674f1e8246db4355d509f8aa7d3dcf905bfff4","demand":"66760bb8f58cbe50cb334dd1a653e3c89924cf05","g1":"ccf4713009d624c4f9f84010f48f899e3aae2e22","g2":"4a6ef4b2e4987c6875e6fc4c0205a04f84c37b57","g3":"62e1236d7aa4c7b2814606b1640e35e280b73919","g7":"4fb7708649aa37807ab87baea9a31c8358ec9b42","si":"ec80a867e5ec5373183f134e462aebc6386604d1","bypass":"b123824d8adb26a80f3fbb675464e59fc2aff2b2","coverage":"fa0ea8de18df82f888a8de96e305c9f22b787cae","oracle":"31300250f200dc9b58c08d3814e361193f9882ec"};
const s=shaExpected;
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function check(z){
const e=[],c=(ok,m)=>{if(!ok)e.push(m)};
const {gate,src,register,demand,g1,g2,g3,g7,si,bypass,coverage,oracle}=z;
c(gate?.schema==="isograph.exp062-w-current-stage-gate.v0.44"&&gate?.status==="W_G0_SSC0_17_W075_SOURCE_ROLE_CORRECTED_38_AUTHOR_ROWS_REVIEWED_113_OUTSTANDING_UNFROZEN"&&gate?.semantic_authority===false&&gate?.track==="W","current W G0 routing authority");
for(const k of ["G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","DP_authorized","cross_track_synthesis_authorized"])c(gate?.current_lawful_state?.[k]===false,"stage blocked "+k);
c(gate?.current_lawful_state?.G0_open===true&&gate?.current_lawful_state?.G0_complete===false&&gate?.current_lawful_state?.G0_frozen===false&&gate?.current_lawful_state?.full_W_source_audit_complete===false&&gate?.current_lawful_state?.all_151_closure_re_adjudicated===false,"G0 still incomplete");
c(gate?.current_source_census?.git_blob_sha===s.src&&gate?.current_source_census?.frozen===false&&src?.schema==="woit.source-semantic-census.v0.17"&&src?.items?.length===151,"current source pin and 151");
c(gate?.current_all_151_conservation_register?.git_blob_sha===s.register&&register?.rows?.length===151&&register?.status==="G0_ALL151_W075_SOURCE_ROLE_CORRECTED_38_DIRECT_AUTHOR_SOURCE_REVIEWS_NOT_FROZEN","all151 G0 inventory not semantic closure");
c(gate?.current_historical_86_member_projection?.git_blob_sha===s.demand&&demand?.items?.length===86,"old 86 only historical");
c(gate?.current_source_coverage?.git_blob_sha===s.coverage&&coverage?.rows?.length===151&&coverage?.counts?.total_direct_current_source_source_semantic_body_reviews===38&&coverage?.counts?.source_rows_remaining_cold_audit===113&&gate?.current_source_coverage?.nine_source_complete===false,"151 audit rows; only seven source-cold");
c(gate?.current_independent_source_literal_oracle?.git_blob_sha===s.oracle&&oracle?.covered_source_ids?.length===7&&oracle?.coverage?.source_expression_count===22,"seven new source-literal oracle pin/count");
c(gate?.current_source_verifier?.git_blob_sha==="de538ed5a57e4afdd052110a3a1a32344d26c7f4"&&gate?.failed_prepublication_verifier_control?.git_blob_sha==="2ae5204317d0f0b6074cf46119895eee359a22f7","current seven-source verifier & prior failed seal evidence");
c(src?.closure_claims?.sealed===false&&src?.closure_claims?.primitive_closure===false&&src?.correction?.G1_authorized===false,"never promote full W source");
c(gate?.current_author_source_34_row_audit?.git_blob_sha==="b0998141c953d89e78687075b820242a9a665787"&&gate?.source_fidelity_defect?.git_blob_sha==="af6503f786364b26a68f7f6be996f2d8d5556403","full 34 author source audit and W075 defect pinned");
c(gate?.source_reconstruction?.W075_left_factor_tangent_only===true&&gate?.source_reconstruction?.W075_rank3_canonical_quotient_separate_in_W077===true,"W075 source separate roles");
c(gate?.current_historical_86_member_projection?.source_version==="SSC0_16_HISTORICAL_NO_HASH_REPAIR"&&gate?.current_historical_86_member_projection?.W075_out_of_old_86===true,"W 86 historical only");
c(src?.items?.find(i=>i.id==="W-SSC-075")?.source_expression_census?.statements?.[1]?.patient==="TANGENT_SPACE_TO_SPACE_PARAMETRIZING_CP1S"&&src?.items?.find(i=>i.id==="W-SSC-075")?.source_expression_census?.provenance_guard?.not_author_negation===true,"W075 source tangent and negative distinction");
c(src?.items?.find(i=>i.id==="W-SSC-122")?.source_expression_census?.statements?.[1]?.rhs==="conjugate(lambda)*f"&&src?.items?.find(i=>i.id==="W-SSC-107")?.source_expression_census?.statements?.[0]?.source_cardinality_claim==="HAS_TWO_ELEMENTS","W04e bare-f and W05 H1 printed cardinality");
c(!demand?.items?.find(x=>x.census_id==="W-SSC-066")&&demand?.replay_policy?.out_of_old_W_projection_changed?.includes("W-SSC-066"),"W066 historical nonmember preserved");
c(register?.counts?.old_projection_omits_old_incomplete===52&&register?.counts?.old_projection_includes_old_closed_schema===8&&register?.counts?.historical_nonmembers===65&&register?.counts?.historical_W_demand_projection===86,"historical 52 omitted 8 extra 65 outside");
c(register?.rows?.every(x=>x.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"&&x.historical_closure_accepted_as_current===false),"none of 151 auto qualified");
c(new Set(register?.rows?.map(x=>x.census_id)).size===151&&register?.rows?.every((x,i)=>x.census_id===src.items?.[i]?.id&&x.source_body_exact===src.items?.[i]?.obligation),"151 exact source conservation/order");
c(gate?.cross_occurrence_identity_conservation?.G1_authorized===false&&gate?.cross_occurrence_identity_conservation?.defect?.git_blob_sha===s.si&&si?.status==="HISTORICAL_G1_G2_EXPLICIT_SOURCE_REFERENT_COREFERENCE_NOT_CONSERVED_BLOCK_CURRENT_G0_RECONSTRUCTION","same SI real source incomplete");
const x=src?.items?.find(x=>x.id==="W-SSC-097"),fo=x?.source_expression_census?.statements;
c(fo?.length===8&&fo?.[2]?.domain==="CP1"&&fo?.[2]?.application_total_on_declared_domain===true&&fo?.[2]?.single_valued_map_declared===true&&fo?.[4]?.carrier==="C2_COORDINATE_PAIRS"&&fo?.[5]?.carrier==="CP1_COMPLEX_LINES"&&fo?.[6]?.negative_scope==="NOT_EXISTS_PROJECTIVE_POINT_FIXED","source CP1 map/not mistaken C2/fixed neg");
c(g1?.items?.length===84&&g1?.items?.reduce((sum,i)=>sum+i.occurrences.length,0)===446&&g2?.counts?.semantic_occurrence_nodes===446&&g2?.input?.git_blob_sha===s.g1,"old G1-G2 historical 446");
c(g3?.counts?.occurrences===445&&g3?.input?.g2_graph?.path==="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_3.json"&&g3?.input?.g2_graph?.git_blob_sha!==s.g2,"G3 current chain invalidated 445");
c(eq(g7?.ruling?.closed_occurrences,["W-SSC-097-O06","W-SSC-097-O04"])&&g7?.source_instance_binding?.R?.totality_assumed===false&&g7?.source_instance_binding?.R?.single_valuedness_assumed===false,"G7 old provisional source-binding insufficient");
c(gate?.invalidations?.W097_G7_O04_O06==="REMAIN_OPEN_SOURCE_MAP_STRONGER_THAN_RELATIONAL_SCHEMA","W097 G7 invalidation explicit");
c(bypass?.scope?.waived_only?.every(v=>/external|third.party/i.test(v))&&bypass?.scope?.still_required?.some(v=>/deterministic/i.test(v)),"owner bypass external only");
return e;
}
const tests=[
["W075 tangent misapplied to quotient",z=>z.src.items.find(x=>x.id==="W-SSC-075").source_expression_census.statements[1].patient="CANONICAL_RANK3_QUOTIENT"],
["W075 invented author negation",z=>z.src.items.find(x=>x.id==="W-SSC-075").source_expression_census.provenance_guard.not_author_negation=false],
["fake all 151 direct author-reviewed",z=>z.coverage.counts.total_direct_current_source_source_semantic_body_reviews=151],
["hide 113 unreviewed source rows",z=>z.coverage.counts.source_rows_remaining_cold_audit=0],
["gate 34 source review pin modified",z=>z.gate.current_author_source_34_row_audit.git_blob_sha="BAD"],
["seal current SSC",z=>z.src.closure_claims.sealed=true],
["false 151 cold audit complete",z=>z.coverage.counts.source_rows_remaining_cold_audit=0],
["false full W source audit",z=>z.gate.current_source_coverage.nine_source_complete=true],
["fake current seven-source oracle pin",z=>z.gate.current_independent_source_literal_oracle.git_blob_sha="BAD"],
["W04e printed anomaly normalized",z=>z.src.items.find(i=>i.id==="W-SSC-122").source_expression_census.statements[1].rhs="conjugate(lambda)*Theta(f)"],
["W05 H1 cardinality erased",z=>z.src.items.find(i=>i.id==="W-SSC-107").source_expression_census.statements[0].source_cardinality_claim="NONE"],
["historical W066 silently included",z=>z.demand.items.push({census_id:"W-SSC-066"})],
["premature G1",z=>z.gate.current_lawful_state.G1_authorized=true],
["premature G7",z=>z.gate.current_lawful_state.G7_authorized=true],
["premature G0 freeze",z=>z.gate.current_lawful_state.G0_frozen=true],
["premature full source audit",z=>z.gate.current_lawful_state.full_W_source_audit_complete=true],
["fake full 151 closure",z=>z.gate.current_lawful_state.all_151_closure_re_adjudicated=true],
["bad SSC pin",z=>z.gate.current_source_census.git_blob_sha="FAKE"],
["false source census frozen",z=>z.gate.current_source_census.frozen=true],
["fake full 151 register qualified",z=>z.register.status="QUALIFIED"],
["invent member closure",z=>z.register.rows[7].historical_closure_accepted_as_current=true],
["remove source member",z=>z.src.items.pop()],
["remove register row",z=>z.register.rows.pop()],
["alter source body without register",z=>z.src.items[0].obligation+="FORGED"],
["false old omission count",z=>z.register.counts.old_projection_omits_old_incomplete=0],
["false old closed extras",z=>z.register.counts.old_projection_includes_old_closed_schema=0],
["invent new W projection membership",z=>z.demand.items.push({census_id:"W-SSC-131"})],
["source total map demoted",z=>z.src.items.find(q=>q.id==="W-SSC-097").source_expression_census.statements[2].application_total_on_declared_domain=false],
["vector and projective mismerged",z=>z.src.items.find(q=>q.id==="W-SSC-097").source_expression_census.statements[4].carrier="CP1_COMPLEX_LINES"],
["no fixed negation lost",z=>z.src.items.find(q=>q.id==="W-SSC-097").source_expression_census.statements[6].negative_scope="EXISTS"],
["source SI reopened as G1 qualified",z=>z.gate.cross_occurrence_identity_conservation.G1_authorized=true],
["SI defect disappeared",z=>z.si.status="FIXED"],
["G3 pretends 446",z=>z.g3.counts.occurrences=446],
["G3 input silently changed",z=>z.g3.input.g2_graph.path="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json"],
["G7 now total",z=>z.g7.source_instance_binding.R.totality_assumed=true],
["G7 closure retroactively removed",z=>z.g7.ruling.closed_occurrences=[]],
["G7 invalidation erased",z=>z.gate.invalidations.W097_G7_O04_O06="QUALIFIED"],
["owner bypass internal CI",z=>z.bypass.scope.waived_only.push("deterministic replay and node CI")]
];
const clone=x=>JSON.parse(JSON.stringify(x)),context=Object.fromEntries(Object.entries(paths).map(([k,path])=>[k,read(path)]));
const errors=check(context),rejected=[],escaped=[];
for(const [name,fn] of tests){const z=clone(context);fn(z);if(check(z).length)rejected.push(name);else escaped.push(name)}
for(const [key,path] of Object.entries(paths))if(gitSha(path)!==shaExpected[key])errors.push('SOURCE_BLOB_SHA_DRIFT '+key);
errors.push(...escaped.map(x=>'ESCAPED_MUTATION '+x));
const out={schema:'isograph.exp062-w-active-g0-stage-failclosed-verifier.v0.4',pass:errors.length===0,errors,head_qualifying_status:'G0_OPEN_UNFROZEN_W_SSC0_16',source_item_count:151,historical_W_demand_members:86,old_incomplete_items_omitted:52,old_closed_schema_members_included:8,old_G1_G2_occurrences:446,old_G3_occurrences:445,old_G7_invalid_closed_occurrences:2,adversarial_mutations_rejected:rejected.length,adversarial_mutations_total:tests.length,rejected,generic_221101_not_modified:true,direct_author_source_rows_reviewed:38,source_rows_not_directly_reviewed:113};
console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;
