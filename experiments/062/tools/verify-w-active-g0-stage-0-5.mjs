import fs from 'node:fs';
import crypto from 'node:crypto';
const pins={"gate":["experiments/062/W_CURRENT_STAGE_GATE_0_50.json","b28f4d8408b576c25f1ada2eaff35acce31c087b"],"S":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_23.json","bc86b39fdd69a3afb4c802771fcc330711683391"],"R":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_9.json","c9e21f6ff2ea7dae1dd04a1fcfea0a50ff1b66a3"],"C":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_8.json","43f0ce96eedbd2c3f6879c7fec14b097cf15f15e"],"D":["experiments/062/W_G0_W04B_SOURCE_DEMAND_PROJECTION_0_11.json","4300200cdf41650d52cd8ba782d4e561195994b3"],"audit":["experiments/062/W04B_G0_FULL_AUTHOR_POST_REVERSE_AUDIT_0_1.json","1c5b8e1bcaed4dba555711a06b8cbc35d2cffa0a"],"defect":["experiments/062/W04B_G0_SOURCE_REVERSE_OMISSION_DEFECT_0_1.json","b7b60d6da0117d3051f61b6b657a0aadef010394"],"oldGate":["experiments/062/W_CURRENT_STAGE_GATE_0_49.json","94d45e7946e035d9664669a80e95f5de4fa3707f"],"guardDef":["experiments/062/W_ACTIVE_G0_STAGE_04_STALE_PIN_DEFECT_0_1.json","6b7ceacc9f11a6590352d0a2e27c0cd2a989ba7e"],"g1":["experiments/062/W_EXTRACTION_RECONCILED_0_23.json","ccf4713009d624c4f9f84010f48f899e3aae2e22"],"g2":["experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json","4a6ef4b2e4987c6875e6fc4c0205a04f84c37b57"],"g3":["experiments/062/W_G3_CORE_DEFINABILITY_0_7.json","62e1236d7aa4c7b2814606b1640e35e280b73919"],"g7":["experiments/062/W_G7_RELATIONAL_TWO_STEP_RETURN_INSTANTIATION_0_1.json","4fb7708649aa37807ab87baea9a31c8358ec9b42"],"bypass":["experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json","b123824d8adb26a80f3fbb675464e59fc2aff2b2"]};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=x=>JSON.parse(JSON.stringify(x));
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
function check(ctx){
 const err=[],c=(x,m)=>{if(!x)err.push(m)};
 const {gate,S,R,C,D,audit,defect,oldGate,guardDef,g1,g2,g3,g7,bypass}=ctx;
 c(gate?.schema==="isograph.exp062-w-current-stage-gate.v0.50"&&gate?.status==="W_G0_SSC0_23_W04B_COMPLETE_LIVE_AUTHOR_ARTICLE_REVERSE_22_SOURCE_INCIDENCE_REPAIRS_NINE_SOURCE_REVERSE_OPEN"&&gate?.semantic_authority===false&&gate?.track==="W","exact current G0 authority");
 c(gate?.supersedes?.git_blob_sha===pins.oldGate[1]&&gate?.current_source_census?.git_blob_sha===pins.S[1]&&gate?.current_all_151_conservation_register?.git_blob_sha===pins.R[1]&&gate?.current_source_coverage?.git_blob_sha===pins.C[1]&&gate?.current_historical_86_member_projection?.git_blob_sha===pins.D[1],"current stage upstream exact pins");
 c(gate?.current_W04b_full_live_article_review?.git_blob_sha===pins.audit[1]&&gate?.current_W04b_fidelity_defect?.git_blob_sha===pins.defect[1]&&gate?.historical_stale_active_guard?.git_blob_sha===pins.guardDef[1],"current stage W04b source and stale guard defect");
 const state=gate?.current_lawful_state;
 c(state?.G0_open===true&&state?.G0_complete===false&&state?.G0_frozen===false&&state?.source_census_frozen===false&&state?.all_nine_source_full_reverse_assertion_enumeration_complete===false&&state?.Oct03_mutable_source_byte_identity_verified===false&&state?.complete_W_151_semantic_demand_membership_requalified===false,"G0 cannot freeze before full reverse");
 for(const k of ["G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","DP_authorized","cross_track_synthesis_authorized"])c(state?.[k]===false,"stage unauthorized "+k);
 c(S?.schema==="woit.source-semantic-census.v0.23"&&S?.items?.length===151&&S?.closure_claims?.sealed===false&&S?.correction?.G0_frozen===false&&S?.correction?.G1_authorized===false,"unfrozen source 151");
 c(R?.source_census?.git_blob_sha===pins.S[1]&&C?.source_census?.git_blob_sha===pins.S[1]&&C?.reconstructed_register?.git_blob_sha===pins.R[1],"register/coverage source tuples");
 c(R?.rows?.length===151&&C?.rows?.length===151&&D?.items?.length===86,"151/86 shape");
 if(R?.rows?.length!==151||C?.rows?.length!==151||D?.items?.length!==86||S?.items?.length!==151)return err;
 c(R.rows.every((x,i)=>x.census_id===S.items[i].id&&x.source_body_exact===S.items[i].obligation&&x.historical_closure_accepted_as_current===false&&x.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"),"151 registers all exact/open");
 c(C.rows.every((x,i)=>x.census_id===S.items[i].id&&x.body_length_chars===S.items[i].obligation.length&&x.source_expression_statement_count===(S.items[i].source_expression_census?.statements?.length||0)),"151 coverage exact body incidence counts");
 c(D.items.every(x=>x.track==="W"&&x.body===S.items.find(z=>z.id===x.census_id)?.obligation),"86 historical W demand source bodies exact");
 c(R.counts?.old_projection_omits_old_incomplete===52&&R.counts?.old_projection_includes_old_closed_schema===8&&R.counts?.historical_nonmembers===65&&R.counts?.historical_W_demand_projection===86,"old 52 omissions and 8 overinclusions preserved");
 c(R.counts?.W04b_new_source_incidences===22&&C.by_unit?.W04b?.source_expression_statements===25&&C.counts?.current_W04b_full_live_post_body_lines===22,"22 new W04b expression incidence and 22 source lines");
 c(audit?.line_map?.length===22&&audit?.source_literal_incidence_oracle?.length===22&&audit?.source?.original_2026_10_03_byte_identity==="NOT_ESTABLISHED"&&audit?.source?.post_comments_excluded===true,"live source reverse and provenance boundary");
 c(defect?.omission_ids?.length===22&&defect?.changed_W_source_ids?.length===6,"W04b source omissions preserved");
 c(gate?.source_provenance_caveats?.W04b_live_html==="MARCH9_AUTHOR_ARTICLE_ALL_BODY_LINES_9_30_REVERSE_ASSERTIONS_AUDITED_OCT3_FROZEN_BYTES_UNVERIFIED","current author source not frozen Oct3 bytes");
 c(gate?.current_source_coverage?.entire_author_source_assertion_reverse_enumeration_complete===false&&gate?.current_source_coverage?.complete_nine_source_author_revision_byte_identity===false&&gate?.current_source_coverage?.pending_existing_item_reviews===0,"existing item review vs full source reverse");
 c(gate?.verification_at_record_creation?.W04b_local_V8==="PASS_42_42_AFTER_PRESERVED_FAILED_POSITIVE"&&gate?.verification_at_record_creation?.W04b_NodeCI==="PENDING_COMMITTED_EXACT_SHA"&&gate?.verification_at_record_creation?.third_party==="OWNER_BYPASSED_NOT_PASSED","local vs Node/third party distinction");
 c(oldGate?.current_source_census?.git_blob_sha===pins.oldGate[1]||oldGate?.current_source_census?.git_blob_sha==="874ce443edaad2cb256d1c1bf1dc5f5dec6f05bf","old stage pinned SSC0.22");
 c(guardDef?.status==="CONFIRMED_ACTIVE_W_G0_WORKFLOW_0_4_VERIFIES_HISTORICAL_GATE_0_44_NOT_ACTUAL_GATE_0_49"&&gate?.invalidations?.old_active_stage_workflow_0_4?.includes("HISTORICAL_ONLY"),"old workflow green cannot qualify current");
 c(g1?.items?.length===84&&g1?.items?.reduce((n,x)=>n+x.occurrences.length,0)===446&&g2?.counts?.semantic_occurrence_nodes===446&&g3?.counts?.occurrences===445&&g3?.input?.g2_graph?.path==="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_3.json","G1/G2/G3 historical lineage and 446/445 skew");
 c(eq(g7?.ruling?.closed_occurrences,["W-SSC-097-O06","W-SSC-097-O04"])&&g7?.source_instance_binding?.R?.totality_assumed===false&&g7?.source_instance_binding?.R?.single_valuedness_assumed===false&&gate?.invalidations?.old_G7_W097_O04_O06==="SOURCE_INSTANCE_UNSOUND_FOR_CP1_TOTAL_MAP","historical G7 source instantiation unsound");
 c(bypass?.scope?.waived_only?.every(x=>/external|third.party/i.test(x))&&bypass?.scope?.still_required?.some(x=>/deterministic/i.test(x)),"owner bypass third party only");
 c(gate?.nonclaims?.some(x=>/No G0 full-source closure|Full W nine-source reverse assertion census not complete/.test(x))&&gate?.nonclaims?.some(x=>/No G1|G0 not frozen/.test(x)),"nonclaims preserved");
 return err;
}
const attacks=[
["G0 false frozen",x=>x.gate.current_lawful_state.G0_frozen=true],
["source census false frozen",x=>x.gate.current_lawful_state.source_census_frozen=true],
["G0 false complete",x=>x.gate.current_lawful_state.G0_complete=true],
["reverse full false qualification",x=>x.gate.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
["Oct03 mutable byte false verified",x=>x.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["G1 prematurely allowed",x=>x.gate.current_lawful_state.G1_authorized=true],
["G2 prematurely allowed",x=>x.gate.current_lawful_state.G2_authorized=true],
["G3 prematurely allowed",x=>x.gate.current_lawful_state.G3_authorized=true],
["G4 prematurely allowed",x=>x.gate.current_lawful_state.G4_authorized=true],
["G5 prematurely allowed",x=>x.gate.current_lawful_state.G5_authorized=true],
["G6 prematurely allowed",x=>x.gate.current_lawful_state.G6_authorized=true],
["G7 prematurely allowed",x=>x.gate.current_lawful_state.G7_authorized=true],
["IA prematurely allowed",x=>x.gate.current_lawful_state.recursive_IA_authorized=true],
["DP prematurely allowed",x=>x.gate.current_lawful_state.DP_authorized=true],
["cross-track synthesis prematurely allowed",x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
["source SSC successor pin wrong",x=>x.gate.current_source_census.git_blob_sha="BAD"],
["coverage pin wrong",x=>x.gate.current_source_coverage.git_blob_sha="BAD"],
["register pin wrong",x=>x.gate.current_all_151_conservation_register.git_blob_sha="BAD"],
["historical demand pin wrong",x=>x.gate.current_historical_86_member_projection.git_blob_sha="BAD"],
["W04b source review pin wrong",x=>x.gate.current_W04b_full_live_article_review.git_blob_sha="BAD"],
["W04b error record forgotten",x=>x.defect.omission_ids=[]],
["W04b source body subtly altered",x=>x.S.items.find(y=>y.id==="W-SSC-069").obligation+=" BAD"],
["G0 register historical closure falsely current",x=>x.R.rows.find(y=>y.census_id==="W-SSC-066").historical_closure_accepted_as_current=true],
["G0 register item omitted",x=>x.R.rows.pop()],
["source SSC item omitted",x=>x.S.items.pop()],
["coverage source expression count altered",x=>x.C.rows.find(y=>y.census_id==="W-SSC-068").source_expression_statement_count=0],
["historical W demand made 87",x=>x.D.items.push({census_id:"W-SSC-066"})],
["historical G3 falsely 446",x=>x.g3.counts.occurrences=446],
["historical G7 R totality imported",x=>x.g7.source_instance_binding.R.totality_assumed=true],
["old active guard misleading defect erased",x=>x.guardDef.status="RESOLVED"],
["current old workflow permitted",x=>x.gate.invalidations.old_active_stage_workflow_0_4="CURRENT_QUALIFIED"],
["Oct03 mutable source caveat dropped",x=>x.gate.source_provenance_caveats.W04b_live_html="CONFIRMED_OCT3"],
["third party review claimed",x=>x.gate.verification_at_record_creation.third_party="PASSED"],
["G0 qualifier nonclaims erased",x=>x.gate.nonclaims=[]],
["owner bypass permits internal experiments",x=>x.bypass.scope.waived_only.push("deterministic internal testing")]
];
const ctx=Object.fromEntries(Object.entries(pins).map(([k,[p]])=>[k,read(p)]));
const errors=check(ctx),rejected=[],escaped=[];
if(errors.length===0){for(const [name,mut] of attacks){const x=clone(ctx);mut(x);if(check(x).length)rejected.push(name);else escaped.push(name)}}else errors.push('BASELINE_FAILED_DO_NOT_COUNT_MUTATIONS');
for(const [name,[path,sha]] of Object.entries(pins))if(gitSha(path)!==sha)errors.push('SOURCE_BLOB_PIN_FAIL '+name);
errors.push(...escaped.map(n=>'ESCAPED_MUTATION '+n));
if(rejected.length!==attacks.length)errors.push('NOT_ALL_MUTATIONS_REJECTED');
console.log(JSON.stringify({schema:'isograph.exp062-w-active-g0-stage-guard.v0.5',pass:errors.length===0,errors,stage:'G0_OPEN_SSC0_23_NOT_FROZEN',source_items:151,historical_old_W_demands:86,live_W04b_source_lines_reversed:22,new_W04b_incidences:22,preexisting_W04a_live_post_source_fidelity_CI:'HISTORICAL_SHA_c9b689',older_G1_G7_prohibited:true,mutations:attacks.length,rejected:rejected.length,rejected,Oct03_mutable_source_bytes_verified:false},null,2));if(errors.length)process.exitCode=1;
