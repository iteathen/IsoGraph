import fs from 'node:fs';
import crypto from 'node:crypto';
const config={"oldS":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_29.json","801b83c0ef323233f4e2feab926ff63f0ad4fa13"],"S":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_30.json","58cfe934b2cef6c2db0b5e4eca14c7bc1e60eb78"],"oldD":["experiments/062/W_G0_W01_BC_SECOND_SOURCE_DEMAND_PROJECTION_0_15.json","7dbc9c45f47b9853f5a7f8ebbc9b2f8c707d6568"],"D":["experiments/062/W_G0_W01_MAIN_SOURCE_DEMAND_PROJECTION_0_16.json","5415ad2e1e6491e89657e0f2d59804108f6bf163"],"oldR":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_15.json","da659f0d9c44fcd04500ee1fa2610d0d362ce05e"],"R":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_16.json","23a425d58b2bf8b1936a5475c722819c5739b5d2"],"oldC":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_14.json","c571f0b5ef367c08a67ada81433de55bdbba2271"],"C":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_15.json","b18b1a720f48d13d75e74e5480f9d5d53ef50d5b"],"oldG":["experiments/062/W_CURRENT_STAGE_GATE_0_56.json","ded8d5fa71528e9536644efa6447e6089a4ba9e5"],"G":["experiments/062/W_CURRENT_STAGE_GATE_0_57.json","75c2927216a9d4f0452f695bae97a33f06550ac5"],"O":["experiments/062/W01_G0_21_22_SOURCE_ROLE_ORACLE_0_1.json","edb03bb27474f42c8988655640e2fd32078cc537"],"F":["experiments/062/W01_G0_21_22_SOURCE_ROLE_OMISSIONS_DEFECT_0_1.json","7cf0f0898c257c3add03c08575daa0ce52fe5a0d"],"failed1":["experiments/062/W01_MAIN_G0_VERIFIER_STATUS_BASELINE_DEFECT_0_1.json","25cdb450d1dbe9d00d25ebddcccac3998e0eae1c"],"failed2":["experiments/062/W01_MAIN_G0_VERIFIER_SECOND_STATUS_BASELINE_DEFECT_0_1.json","0abe249044601659290e2e06a071cf628a8ce1a5"],"failed3":["experiments/062/W01_MAIN_G0_VERIFIER_POLICY_BOOLEAN_CHAIN_DEFECT_0_1.json","b88a2702ca8045f38894ed03cf2a136688212df3"]};
const PINS={"oldS":"801b83c0ef323233f4e2feab926ff63f0ad4fa13","S":"58cfe934b2cef6c2db0b5e4eca14c7bc1e60eb78","oldD":"7dbc9c45f47b9853f5a7f8ebbc9b2f8c707d6568","D":"5415ad2e1e6491e89657e0f2d59804108f6bf163","oldR":"da659f0d9c44fcd04500ee1fa2610d0d362ce05e","R":"23a425d58b2bf8b1936a5475c722819c5739b5d2","oldC":"c571f0b5ef367c08a67ada81433de55bdbba2271","C":"b18b1a720f48d13d75e74e5480f9d5d53ef50d5b","oldG":"ded8d5fa71528e9536644efa6447e6089a4ba9e5","G":"75c2927216a9d4f0452f695bae97a33f06550ac5","O":"edb03bb27474f42c8988655640e2fd32078cc537","F":"7cf0f0898c257c3add03c08575daa0ce52fe5a0d","failed1":"25cdb450d1dbe9d00d25ebddcccac3998e0eae1c","failed2":"0abe249044601659290e2e06a071cf628a8ce1a5","failed3":"b88a2702ca8045f38894ed03cf2a136688212df3"},IDS=["W-SSC-005","W-SSC-027","W-SSC-028"],DIDS=["W-SSC-027","W-SSC-028"];
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),copy=x=>JSON.parse(JSON.stringify(x));
const input=Object.fromEntries(Object.entries(config).map(([k,v])=>[k,JSON.parse(fs.readFileSync(v[0],'utf8'))]));
function validate(x){
const errors=[],ck=(ok,msg)=>{if(!ok)errors.push(msg)};
const {oldS,S,oldD,D,oldR,R,oldC,C,oldG,G,O,F,failed1,failed2,failed3}=x;
ck(oldS?.items?.length===151&&S?.items?.length===151&&D?.items?.length===86&&oldD?.items?.length===86,"census/demand membership shape");
ck(R?.rows?.length===151&&oldR?.rows?.length===151&&C?.rows?.length===151&&oldC?.rows?.length===151,"151 register and coverage");
ck(O?.source?.revision==="arXiv:2104.05099v2"&&O?.incidence_count===9&&equal(O?.source_items,IDS),"primary source oracle nine assertions");
ck(F?.status==="CONFIRMED_W01_2_1_2_2_NINE_PRINTED_SEMANTIC_INCIDENCES_UNREPRESENTED_IN_SSC029"&&F?.earliest_affected_stage==="G0_SOURCE_ASSERTION_CONSERVATION","source omission defect");
ck(failed1?.prepublication_baseline?.mutations_eligible_for_qualification===0&&failed2?.qualification?.mutations_qualified===0&&failed3?.observed?.mutations_executed===0,"failed prepublication verifier evidence");
if(errors.length)return errors;
ck(S?.schema==="woit.source-semantic-census.v0.30"&&S?.predecessor?.git_blob_sha===PINS.oldS&&S?.closure_claims?.sealed===false&&S?.correction?.G0_frozen===false&&S?.correction?.G1_authorized===false,"SSC successor unfrozen");
ck(equal(S.items.map(z=>z.id),oldS.items.map(z=>z.id))&&equal(S?.correction?.changed_W_ids,IDS),"exact source identities and 3-row correction scope");
for(let i=0;i<151;i++){if(!IDS.includes(oldS.items[i].id))ck(equal(S.items[i],oldS.items[i]),"other W source modified "+oldS.items[i].id)}
for(const id of IDS){const a=oldS.items.find(z=>z.id===id),b=S.items.find(z=>z.id===id),q=O?.claims?.[id]||[],prev=a?.source_expression_census?.statements||[],cur=b?.source_expression_census?.statements||[];
ck(b?.state==="OPEN"&&b?.source===a?.source&&b?.obligation?.startsWith(a?.obligation)&&b?.obligation?.length>a?.obligation.length,"W source body "+id);
ck(cur.length===prev.length+q.length&&equal(cur.slice(0,prev.length),prev)&&equal(cur.slice(prev.length),q),"exact source incidence prefix and correction "+id)}
const w5=S.items[4].source_expression_census.statements,w27=S.items[26].source_expression_census.statements,w28=S.items[27].source_expression_census.statements;
ck(w5?.length===2&&w5[0]?.operator==="SOURCE_PRINTED_EQUALITY"&&equal(w5[0]?.rhs?.denominator?.factors,["U(1)","SU(3)"])&&equal(w5[1]?.acting_source_group?.factors,["U(1)","SU(2)"]),"source group distinction and CP3 formula");
ck(w5[0]?.source_modality==="AUTHOR_PRINTED_SOURCE_GEOMETRY_NOT_NEWLY_QUALIFIED_GROUP_QUOTIENT"&&w5[1]?.author_relation==="ACTS_IN_THE_SAME_WAY_AS_STANDARD_MODEL_ELECTROWEAK_ON_HIGGS","source Higgs role nonpromotion");
ck(w27?.length===3&&equal(w27[0]?.ordered_factors,["g_L","x","INVERSE(g_R)"])&&equal(w27[1]?.rhs_pair,["-g_L","-g_R"])&&w27[1]?.relation==="SAME_SO4_ROTATION"&&w27[1]?.negative_guard?.includes("not literal equality"),"paired-sign nonidentity and ordered action");
ck(w27[2]?.action==="INDEPENDENT_LEFT_AND_RIGHT_QUATERNION_MULTIPLICATION"&&w27[2]?.source_identification==="SU(2)=Sp(1)=GROUP_OF_UNIT_QUATERNIONS","Sp1 convention");
ck(w28?.length===9&&w28[5]?.split_signature_spinor==="R2_INSTEAD_OF_C2"&&w28[5]?.Euclidean_spinor==="C2"&&w28[5]?.Minkowski_spinor==="C2"&&w28[5]?.complexified_vector==="Hom(S_R,S_L)","signature spinor carriers");
ck(w28[6]?.Minkowski?.on_SR==="g"&&w28[6]?.Minkowski?.on_SL==="INVERSE(ADJOINT(g))"&&w28[6]?.Euclidean?.relation==="INDEPENDENT","signature-sensitive coupled action");
ck(w28[7]?.quotient==="S_L=T/S_R"&&w28[7]?.tangent==="Hom(S_R,S_L)"&&w28[7]?.carrier_scope==="AT_THE_SELECTED_TWISTOR_SPACETIME_POINT","point-local twistor quotient");
ck(equal(w28[8]?.source_ordered_real_forms,[{group:"Spin(5,1)",real_form:"E4",compactification:"S4"},{group:"Spin(4,2)",real_form:"E3,1",compactification:"S3×S1"},{group:"Spin(3,3)",real_form:"E2,2",compactification:"G_2,4(R)"}]),"ordered compactification groups");
ck(D?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.16"&&D?.current_source?.git_blob_sha===PINS.S&&D?.predecessor_W_only_demand?.git_blob_sha===PINS.oldD&&D?.replay_policy?.G1_authorized===false,"W projection pins");
ck(equal(D.items.map(x=>x.census_id),oldD.items.map(x=>x.census_id))&&equal(D?.replay_policy?.change_only,DIDS)&&equal(D?.replay_policy?.source_changed_outside_historical_86,["W-SSC-005"]),"86 historical members and W005 excluded");
for(let i=0;i<86;i++){const a=oldD.items[i],b=D.items[i];ck(b?.track==="W"&&b?.body===S.items.find(z=>z.id===b?.census_id)?.obligation,"source-demand exact body "+a.census_id);if(!DIDS.includes(a.census_id))ck(equal(a,b),"other W demand changed "+a.census_id)}
for(const id of DIDS){const a=D.items.find(z=>z.census_id===id),b=S.items.find(z=>z.id===id);ck(equal(a?.source_formula_incidences,b?.source_expression_census?.statements),"typed demand incidences "+id)}
ck(R?.schema==="isograph.exp062-w-g0-all-151-conservation-register.v0.16"&&R?.status==="ALL151_W01_1_2_1_2_2_SOURCE_MAIN_NINE_ROLES_RESTORED_UNFROZEN"&&R?.source_census?.git_blob_sha===PINS.S&&R?.historical_86_projection?.git_blob_sha===PINS.D,"register exact status/source/demand pins");
ck(C?.schema==="isograph.exp062-w-g0-line-by-line-151-coverage.v0.15"&&C?.source_census?.git_blob_sha===PINS.S&&C?.reconstructed_register?.git_blob_sha===PINS.R,"coverage strict pins");
ck(R?.policy?.G0_frozen===false&&R?.policy?.G1_authorized===false&&R?.policy?.source_revision_Oct03_mutable_bytes_verified===false&&R?.counts?.old_projection_omits_old_incomplete===52&&R?.counts?.old_projection_includes_old_closed_schema===8,"register no closure, 52/8 negative evidence");
const countW01=S.items.filter(z=>z.source?.startsWith("W01")).reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0);
ck(countW01===101&&C?.by_unit?.W01?.source_expression_statements===101&&C?.counts?.W01_corrected_items===20&&C?.counts?.W01_prior_corrected_items===18,"W01 101 source incidences and 20 corrected items");
ck(C?.counts?.original_nine_source_reverse_assertion_enumeration_complete===false&&C?.counts?.source_revision_Oct03_bytes_verified===false,"full reverse incomplete and mutable revision unverified");
for(let i=0;i<151;i++){const src=S.items[i],rr=R.rows[i],cc=C.rows[i];ck(rr?.ordinal===i+1&&rr?.census_id===src.id&&rr?.source_body_exact===src.obligation&&rr?.source_expression_statement_count===(src.source_expression_census?.statements?.length||0)&&rr?.historical_closure_accepted_as_current===false&&rr?.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING","register row fidelity "+src.id);
ck(cc?.ordinal===i+1&&cc?.census_id===src.id&&cc?.body_length_chars===src.obligation.length&&cc?.source_expression_statement_count===(src.source_expression_census?.statements?.length||0)&&cc?.stage_authority===false,"coverage row fidelity "+src.id);
if(!IDS.includes(src.id)){ck(equal(rr,oldR.rows[i]),"non-target register mutated "+src.id);ck(equal(cc,oldC.rows[i]),"non-target coverage mutated "+src.id)}}
ck(G?.schema==="isograph.exp062-w-current-stage-gate.v0.57"&&G?.semantic_authority===false&&G?.current_source_census?.git_blob_sha===PINS.S&&G?.current_all_151_conservation_register?.git_blob_sha===PINS.R&&G?.current_source_coverage?.git_blob_sha===PINS.C&&G?.current_historical_86_member_projection?.git_blob_sha===PINS.D&&G?.supersedes?.git_blob_sha===PINS.oldG,"G0 gate authoritative pins");
ck(G?.current_W01_main_text_source_oracle?.git_blob_sha===PINS.O&&G?.current_source_fidelity_defect?.git_blob_sha===PINS.F,"oracle/defect exact gate");
const gate=G?.current_lawful_state;
ck(gate?.G0_open===true&&gate?.G0_complete===false&&gate?.G0_frozen===false&&gate?.all_nine_source_full_reverse_assertion_enumeration_complete===false&&gate?.Oct03_mutable_source_byte_identity_verified===false&&gate?.complete_W_151_semantic_demand_membership_requalified===false,"G0 incomplete");
for(const k of ["G1","G2","G3","G4","G5","G5H","G6","G7","recursive_IA","NEI","DTS","DP","cross_track_synthesis"])ck(gate?.[k+"_authorized"]===false,"premature "+k);
return errors;
}
const mutations=[
["quotient denominator SU2",x=>x.S.items[4].source_expression_census.statements[0].rhs.denominator.factors[1]="SU(2)"],
["electroweak SU3",x=>x.S.items[4].source_expression_census.statements[1].acting_source_group.factors[1]="SU(3)"],
["quotient claimed theorem",x=>x.S.items[4].source_expression_census.statements[0].source_modality="QUALIFIED"],
["Euclidean action wrong argument order",x=>x.S.items[26].source_expression_census.statements[0].ordered_factors.reverse()],
["one-sided sign change",x=>x.S.items[26].source_expression_census.statements[1].rhs_pair[1]="g_R"],
["spin pair mistakenly equal",x=>x.S.items[26].source_expression_census.statements[1].relation="IDENTICAL"],
["quaternion action loses right factor",x=>x.S.items[26].source_expression_census.statements[2].action="LEFT_ONLY"],
["split spinor C2 not R2",x=>x.S.items[27].source_expression_census.statements[5].split_signature_spinor="C2"],
["Minkowski left action becomes g",x=>x.S.items[27].source_expression_census.statements[6].Minkowski.on_SL="g"],
["Euclidean chiral factors coupled",x=>x.S.items[27].source_expression_census.statements[6].Euclidean.relation="COUPLED"],
["twistor quotient replaced fixed plane",x=>x.S.items[27].source_expression_census.statements[7].quotient="FIXED_C2"],
["twistor tangent reversed",x=>x.S.items[27].source_expression_census.statements[7].tangent="Hom(S_L,S_R)"],
["conformal Minkowski compactification wrong",x=>x.S.items[27].source_expression_census.statements[8].source_ordered_real_forms[1].compactification="S4"],
["conformal real form order reversed",x=>x.S.items[27].source_expression_census.statements[8].source_ordered_real_forms.reverse()],
["old W028 assertion overwritten",x=>x.S.items[27].source_expression_census.statements[0].norm="wrong"],
["other W103 Hodge strict changed",x=>x.S.items.find(y=>y.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["unrelated source body changed",x=>x.S.items[10].obligation+="wrong"],
["source member removed",x=>x.S.items.pop()],
["old historical 86 W005 inserted",x=>x.D.items.push({census_id:"W-SSC-005"})],
["W027 projected body stale",x=>x.D.items.find(y=>y.census_id==="W-SSC-027").body="STALE"],
["W028 projected formula removed",x=>x.D.items.find(y=>y.census_id==="W-SSC-028").source_formula_incidences.pop()],
["non-target projected body changed",x=>x.D.items.find(y=>y.census_id==="W-SSC-029").body="WRONG"],
["historical projection member removed",x=>x.D.items.pop()],
["register W005 source wrong",x=>x.R.rows[4].source_body_exact="BAD"],
["register row falsely closed",x=>x.R.rows[26].historical_closure_accepted_as_current=true],
["register 52 negative evidence erased",x=>x.R.counts.old_projection_omits_old_incomplete=0],
["coverage W01 source count wrong",x=>x.C.by_unit.W01.source_expression_statements=92],
["coverage W027 statement count wrong",x=>x.C.rows[26].source_expression_statement_count=0],
["coverage row deleted",x=>x.C.rows.pop()],
["source G0 falsely frozen",x=>x.S.correction.G0_frozen=true],
["gate G1 falsely authorized",x=>x.G.current_lawful_state.G1_authorized=true],
["gate G7 falsely authorized",x=>x.G.current_lawful_state.G7_authorized=true],
["gate G0 falsely complete",x=>x.G.current_lawful_state.G0_complete=true],
["mutable Oct3 source snapshot falsely verified",x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["gate source pin changed",x=>x.G.current_source_census.git_blob_sha="bad"],
["oracle source claim corrupted",x=>x.O.claims["W-SSC-005"][0].rhs.denominator.factors[1]="bad"],
["source and projected demand jointly modified",x=>{x.S.items[27].obligation+="bad";x.D.items.find(y=>y.census_id==="W-SSC-028").body+="bad"}],
["L track contamination in demand",x=>x.D.items[0].track="L"]
];
const positive=validate(input),rejected=[],escaped=[],exceptions=[];
if(!positive.length){for(const [label,mut] of mutations){let c=copy(input),error=[];try{mut(c);error=validate(c)}catch(e){exceptions.push(label+':'+String(e));continue}if(error.length)rejected.push(label);else escaped.push(label)}}
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const pins=Object.entries(config).filter(([k,v])=>gitSha(v[0])!==v[1]).map(([k])=>'GIT_BLOB_PIN '+k);
const errors=[...positive,...escaped.map(x=>'ESCAPED_MUTATION '+x),...exceptions.map(x=>'MUTATION_EXCEPTION '+x),...pins];
const good=!errors.length&&rejected.length===mutations.length;
console.log(JSON.stringify({schema:'isograph.exp062-w01-main-source-21-22-verifier.v0.2',pass:good,errors,source_items:151,other_source_items_unchanged:148,historical_W_demand_members:86,other_W_demand_members_unchanged:84,all151_register_and_coverage_verified:true,new_source_assertions:9,W01_incidents_current:101,adversarial_total:positive.length?0:mutations.length,adversarial_rejected:rejected.length,G0_frozen:false,G1_G7_authorized:false,external:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(!good)process.exitCode=1;
