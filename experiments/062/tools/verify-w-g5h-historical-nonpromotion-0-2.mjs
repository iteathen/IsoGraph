import fs from 'node:fs';
import crypto from 'node:crypto';
const paths={"H":"experiments/062/W_G5H_VARIATION_LAYER_FALSIFICATION_0_1.json","F":"experiments/062/W_G5H_VARIATION_FIXED_POINT_0_1.json","OLD":"experiments/062/W_CURRENT_STAGE_GATE_0_9.json","GATE":"experiments/062/W_CURRENT_STAGE_GATE_0_49.json","SSC":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_22.json","REG":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_8.json"};
const pins={"H":"00088c30b59088c319dc23ae577b1ee142d15ba5","F":"33cd3aefaed73f551bfc2369e030b95da0113107","OLD":"617d891004543efae8c1d6d7a19d8e80d310ad76","GATE":"94d45e7946e035d9664669a80e95f5de4fa3707f","SSC":"874ce443edaad2cb256d1c1bf1dc5f5dec6f05bf","REG":"c07bc9980c7811380bcc0eefdc5bf67c8bab987f"};
const expected=[{"id":"W-G5H-VAR-INCIDENCE-003","origin":"HYPOTHESIS","test_result":"FAIL_EXACT_RECONSTRUCTION","disposition":"REJECT_BEFORE_G6_CORE_REPRESENTABLE_INCIDENCE_INSUFFICIENT","fresh":"NONE_CURRENT_CORRECTED_EVIDENCE_IS_ADAPTIVE"},{"id":"W-G5H-VAR-OPAQUE-004","origin":"HYPOTHESIS","test_result":"FAIL_NO_EVASION","disposition":"REJECT_BEFORE_G6_OPAQUE_RENAMING","fresh":"NONE_REJECTED_BY_DEFINITIONAL_NO_EVASION_CONTROL"},{"id":"W-G5H-VAR-PERTURB-005","origin":"HYPOTHESIS","test_result":"FAIL_SOURCE_INSTANCE","disposition":"REJECT_BEFORE_G6_UNSUPPORTED_TRANSFORMATION_SEMANTICS","fresh":"NONE_SOURCE_INSTANCE_FAILS_BEFORE_G6"},{"id":"W-G5H-VAR-EOM-006","origin":"HYPOTHESIS","test_result":"FAIL_SCOPE_AND_NO_EVASION","disposition":"REJECT_BEFORE_G6_SOURCE_SCOPE_MISMATCH_AND_UNRESOLVED_D1","fresh":"NONE_ADAPTIVE_TO_CORRECTED_SOURCE"},{"id":"W-G5H-VAR-STATIONARITY-007","origin":"HYPOTHESIS_LINEAGE_RECHECK","test_result":"FAIL_SOURCE_INSTANCE_PRESERVED","disposition":"RETAIN_NEGATIVE_EVIDENCE_NO_W_G6_REOPEN","fresh":"CORRECTED_SOURCE_RECHECK_NOT_INDEPENDENT"}];
const flags=["G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"];
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const clone=x=>JSON.parse(JSON.stringify(x));
function verify(d){
 const errs=[],ck=(v,m)=>{if(!v)errs.push(m)};
 const {H,F,OLD,GATE,SSC,REG}=d;
 ck(H?.schema==="isograph.exp062-w-g5h-variation-layer-falsification.v0.1"&&H?.track==="W"&&H?.authority===false&&H?.scope?.L_evidence_used===false&&H?.scope?.cross_track_evidence_used===false,"W-only historical hypothesis scope");
 ck(F?.schema==="isograph.exp062-w-g5h-variation-fixed-point.v0.1"&&F?.track==="W"&&F?.authority===false,"historical fixed point non-authority");
 ck(F?.input?.falsification?.git_blob_sha===pins.H&&F?.input?.verifier?.git_blob_sha==="5d67e48660fe5b435b02206f72fabaa831c6ef83"&&F?.input?.g5_fixed_point?.git_blob_sha==="907199a26dab98683adfcbccfd4e9122531893f2","historical input/verifier immutable pins");
 ck(H?.inputs?.g5_fixed_point?.git_blob_sha==="907199a26dab98683adfcbccfd4e9122531893f2"&&H?.inputs?.g4?.git_blob_sha==="fb46b4d42afd26da956dc96870dd4cfe22e6b9d6","H G4/G5 lineage");
 ck(H?.decomposition_boundary?.D1_selected_role_variation_operation==="NAMED_AND_ROLE_INDEXED_INTERNAL_BEHAVIOR_UNDEFINED"&&H?.decomposition_boundary?.D4_zero_stationarity_over_directions==="ABSENT","source semantic D1/D4 missing");
 ck(H?.falsification_summary?.hypotheses_tested===5&&H?.falsification_summary?.survivors===0&&H?.falsification_summary?.G6_candidates_authorized===0&&H?.falsification_summary?.current_source_defines_D1_behavior===false,"five tested zero survivors no invented D1");
 ck(H?.hypotheses?.length===5,"five exact H hypotheses");
 if(H?.hypotheses?.length===5)for(let i=0;i<5;i++){
  const a=H.hypotheses[i],ex=expected[i];
  ck(a?.hypothesis_id===ex.id&&a?.origin===ex.origin&&a?.test_result===ex.test_result&&a?.disposition===ex.disposition&&a?.fresh_confirmation_status===ex.fresh,"hypothesis "+i+" immutable provenance and negative result");
  for(const k of ["parent_residual","candidate_statement","declared_scope","motivating_evidence","prohibited_evidence","predicted_consequences","known_alternatives","positive_controls","negative_adversarial_controls","falsifier","adaptive_evidence","fresh_confirmation_status","coverage_limits","reason"])ck(a?.[k]!==undefined,"hypothesis "+i+" missing "+k);
  ck(a?.test_result?.startsWith("FAIL_")&&(a?.disposition?.includes("REJECT")||a?.disposition==="RETAIN_NEGATIVE_EVIDENCE_NO_W_G6_REOPEN"),"hypothesis "+i+" no survivor/qualified promotion");
 }
 ck(F?.verification?.workflow_run_id===37674234072&&F?.verification?.workflow_head_sha==="cbc522d212003cbc24b66734c36f57f80d527dcb"&&F?.verification?.conclusion==="success"&&F?.verification?.survivors===0&&F?.verification?.G6_candidates_authorized===0,"old CI precisely historical");
 ck(F?.fixed_point?.target_family==="W_VARIATION_LAYER"&&F?.fixed_point?.W_G5H_complete_for_declared_variation_scope===true&&F?.fixed_point?.W_G6_new_candidate_authorized===false&&F?.fixed_point?.W_G7_authorized===false&&F?.fixed_point?.W_primitive_closure_complete===false&&F?.fixed_point?.W_recursive_IA_authorized===false&&F?.fixed_point?.cross_track_comparison_authorized===false&&F?.fixed_point?.W_track_sealed===false,"no false G5H scope/promotion");
 ck(F?.fixed_point?.boundary_kind==="SOURCE_INFORMATION_AND_INTERNAL_VARIATION_SEMANTICS_BOUNDARY"&&(F?.nonclaims||[]).some(x=>x.includes("not a proof of mathematical irreducibility")),"historical negative result limited");
 ck(OLD?.current_G5H?.fixed_point?.git_blob_sha===pins.F&&OLD?.current_lawful_state?.G6_new_candidate_authorized===false&&OLD?.primitive_211000?.W_source_instantiation_authorized===false,"stage0.9 historical exact pin");
 ck(GATE?.schema==="isograph.exp062-w-current-stage-gate.v0.49"&&GATE?.track==="W"&&GATE?.semantic_authority===false&&GATE?.current_source_census?.git_blob_sha===pins.SSC&&GATE?.current_all_151_conservation_register?.git_blob_sha===pins.REG,"current G0.49 exact route");
 ck(GATE?.current_lawful_state?.G0_open===true&&GATE?.current_lawful_state?.G0_complete===false&&GATE?.current_lawful_state?.G0_frozen===false&&GATE?.current_lawful_state?.all_nine_source_full_reverse_assertion_enumeration_complete===false,"current source not qualified");
 for(const k of flags)ck(GATE?.current_lawful_state?.[k]===false,"current "+k+" prohibited");
 ck(SSC?.schema==="woit.source-semantic-census.v0.22"&&SSC?.items?.length===151&&SSC?.closure_claims?.primitive_closure===false&&SSC?.closure_claims?.sealed===false,"151 W source semantics not frozen");
 ck(REG?.rows?.length===151&&REG?.source_census?.git_blob_sha===pins.SSC&&REG?.counts?.historical_nonmembers===65,"151 source register not 86");
 if(REG?.rows?.length===151&&SSC?.items?.length===151)for(let i=0;i<151;i++){
  const a=REG.rows[i],b=SSC.items[i];
  ck(a?.census_id===b.id&&a?.source_body_exact===b.obligation&&a?.historical_closure_accepted_as_current===false,"151 exact source-row conservation "+(i+1));
 }
 return errs;
}
const mutate=[
["one missing H claim",z=>z.H.hypotheses.pop()],
["reordered H claim",z=>z.H.hypotheses.reverse()],
["misreported H first result",z=>z.H.hypotheses[0].test_result="PASS"],
["misreported last origin",z=>z.H.hypotheses[4].origin="HYPOTHESIS"],
["adaptive called fresh",z=>z.H.hypotheses[0].fresh_confirmation_status="INDEPENDENT"],
["No-Evasion falsifier dropped",z=>delete z.H.hypotheses[1].falsifier],
["negative case dropped",z=>delete z.H.hypotheses[4].negative_adversarial_controls],
["H imports variation behavior",z=>z.H.decomposition_boundary.D1_selected_role_variation_operation="DEFINED"],
["H imports stationarity",z=>z.H.decomposition_boundary.D4_zero_stationarity_over_directions="DEFINED"],
["H survivors one",z=>z.H.falsification_summary.survivors=1],
["H total four",z=>z.H.falsification_summary.hypotheses_tested=4],
["H consumes L",z=>z.H.scope.L_evidence_used=true],
["H false G4 input",z=>z.H.inputs.g4.git_blob_sha="BAD"],
["F false H pin",z=>z.F.input.falsification.git_blob_sha="BAD"],
["F false verifier pin",z=>z.F.input.verifier.git_blob_sha="BAD"],
["F false ancestor G5",z=>z.F.input.g5_fixed_point.git_blob_sha="BAD"],
["F CI survivor",z=>z.F.verification.survivors=1],
["F CI head spoof",z=>z.F.verification.workflow_head_sha="BAD"],
["F new G6 authorized",z=>z.F.fixed_point.W_G6_new_candidate_authorized=true],
["F G7 authorized",z=>z.F.fixed_point.W_G7_authorized=true],
["F source closed",z=>z.F.fixed_point.W_primitive_closure_complete=true],
["F track sealed",z=>z.F.fixed_point.W_track_sealed=true],
["F changed boundary",z=>z.F.fixed_point.boundary_kind="SCHEMA_CLOSED"],
["F irreducibility nonclaim removed",z=>z.F.nonclaims=[]],
["old G0.9 bad historic fixed-point pin",z=>z.OLD.current_G5H.fixed_point.git_blob_sha="BAD"],
["old G0.9 consumes 211000",z=>z.OLD.primitive_211000.W_source_instantiation_authorized=true],
["new G0.49 bad SSC pin",z=>z.GATE.current_source_census.git_blob_sha="BAD"],
["new G0.49 bad register pin",z=>z.GATE.current_all_151_conservation_register.git_blob_sha="BAD"],
["new G0.49 false freeze",z=>z.GATE.current_lawful_state.G0_frozen=true],
["new G0.49 false G6",z=>z.GATE.current_lawful_state.G6_authorized=true],
["new G0.49 false G7",z=>z.GATE.current_lawful_state.G7_authorized=true],
["new G0.49 false DP",z=>z.GATE.current_lawful_state.DP_authorized=true],
["new G0.49 reverse assertion complete",z=>z.GATE.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
["new SSC member omitted",z=>z.SSC.items.pop()],
["new register member omitted",z=>z.REG.rows.pop()],
["new register wrong body",z=>z.REG.rows[0].source_body_exact="BAD"],
["old closure promoted current",z=>z.REG.rows[0].historical_closure_accepted_as_current=true]
];
const data=Object.fromEntries(Object.entries(paths).map(([k,p])=>[k,read(p)]));
const errors=verify(data),rejected=[],escaped=[];
for(const [n,fn] of mutate){const d=clone(data),pre=JSON.stringify(d);fn(d);if(pre===JSON.stringify(d)){errors.push('INEFFECTIVE_MUTATION '+n);continue}if(verify(d).length)rejected.push(n);else escaped.push(n)}
for(const [k,p] of Object.entries(paths))if(blob(p)!==pins[k])errors.push('GIT_BLOB_INPUT_PIN '+k);
const F=data.F,H=data.H;
for(const rec of Object.values(H.inputs||{}))if(blob(rec.path)!==rec.git_blob_sha)errors.push('ANCIENT_W_G5H_H_INPUT_PIN '+rec.path);
for(const key of ['falsification','verifier','g5_fixed_point']){const rec=F.input?.[key];if(!rec||blob(rec.path)!==rec.git_blob_sha)errors.push('ANCIENT_W_G5H_F_INPUT_PIN '+key)}
errors.push(...escaped.map(n=>'ESCAPED_MUTATION '+n));
const output={schema:'isograph.exp062-w-g5h-historical-nonpromotion-verifier.v0.2',pass:errors.length===0,errors,source_scope:'HISTORICAL_G5H_VARIATION_ONLY',historical_hypotheses:5,historical_survivors:0,latest_W_G0:'SSC0.22_GATE0.49_UNFROZEN',current_G6_authorized:false,current_G7_authorized:false,source_register_151_checked:true,history_not_current_authority:true,cross_track_semantics_used:false,mutations_total:mutate.length,mutations_rejected:rejected.length,rejected};
console.log(JSON.stringify(output,null,2));if(errors.length)process.exitCode=1;
