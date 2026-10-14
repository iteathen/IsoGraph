import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_38.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_39.json","oldD":"experiments/062/W_G0_W05_S23_J_SOURCE_DEMAND_PROJECTION_0_22.json","D":"experiments/062/W_G0_W05_S3_REALITY_SOURCE_DEMAND_PROJECTION_0_23.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_24.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_25.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_23.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_24.json","oldU":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_5.json","U":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_6.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_80.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_81.json","O":"experiments/062/W05_G0_S3_REALITY_SOURCE_FIRST_0_1.json","F":"experiments/062/W05_G0_S3_REALITY_TYPED_GAP_0_1.json","M":"experiments/062/W05_G0_S3_GROUP_IDENTITY_NEGATIVE_GUARD_0_1.json","self":"experiments/062/tools/verify-w05-s3-reality-source-g0-0-1.mjs"};
const pins={"oldS":"7b09a118635d62d4b6c364d1c12b8d85f2af1ae4","S":"f60ceba905cf52d76049c7d9966fc73c2f6120d9","oldD":"eda9117df588d819711ce716b5cef81294e82289","D":"8ecf71c8ae4dcaf1f96c4edfcb9173cc5525f532","oldR":"584157928c478672393efda98a493e9831fd9d32","R":"271e1e01f37a7b0abda0fba0d013315906cdfe59","oldC":"f1b6530f7be02145b7eea051d4d1fc06f43ddca1","C":"61f75f5c4f806bc845c2015f62ba5dd421dcb5f6","oldU":"a50f5a7768323f8598c5f552414fb486b4038960","U":"cf9823b69df864429aa06443079ed545d5bde1a2","oldG":"103d9f250b9ac0a74b51585c884f0954ed905001","O":"fba316479fdac78e693440c540d60e96fcfcc1a2","F":"a444b9a2c6b7f4c96a8bc786179eee12218f1867","M":"0b2459a8f66ed9b2f123ae8c6d99ad2a6153ec1e"};
const check=function check(q,ctx){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),p=ctx.pins;
 const {oldS,S,oldD,D,oldR,R,oldC,C,oldU,U,oldG,G,O,F,M}=q;
 const prev=oldS?.items?.find(x=>x.id==="W-SSC-100"),item=S?.items?.find(x=>x.id==="W-SSC-100"),cl=item?.source_expression_census?.statements||[];
 ok(oldS?.schema==="woit.source-semantic-census.v0.38"&&oldS?.items?.length===151&&prev?.source_expression_census===undefined,"old source0.38 W100 prose without typed");
 ok(S?.schema==="woit.source-semantic-census.v0.39"&&S?.items?.length===151&&S?.source_count===9&&S?.census_item_count===151&&S?.closure_claims?.sealed===false,"SSC0.39 all151 G0 still unfrozen");
 ok(eq(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&eq(S?.items?.filter((x,i)=>!eq(x,oldS.items[i])).map(x=>x.id),["W-SSC-100"])&&item?.obligation===prev?.obligation,"150 other W items exact and W100 original prose exact");
 ok(S?.predecessor?.git_blob_sha===p.oldS&&S?.correction?.source_first_oracle?.git_blob_sha===p.O&&S?.correction?.source_typed_defect?.git_blob_sha===p.F&&S?.correction?.negative_math_scope?.git_blob_sha===p.M,"source old/new lineage and oracle pointers");
 ok(cl.length===5&&eq(cl,O?.new_typed_statements)&&eq(cl.map(x=>x.id),["W05-100-01","W05-100-02","W05-100-03","W05-100-04","W05-100-05"]),"five independently sourced typed roles exact");
 const [a,b,c,d,e]=cl;
 ok(a?.modality==="SOURCE_COMPLEX_LINEAR_ACTION_INDUCES_PROJECTIVE_CONFORMAL_ACTION"&&a?.actor==="SL(2,C)"&&a?.source_action_domain==="C2"&&a?.induced_action_carrier==="CP1"&&a?.induced_action_type==="CONFORMAL_TRANSFORMATIONS"&&a?.quantifier_scope==="DO_NOT_REINTERPRET_AS_EVERY_GROUP_ELEMENT_FAILS_COMMUTATION","CP1 SL2C source group action not forall");
 ok(b?.modality==="SOURCE_QUATERNIONIC_CONFORMAL_ACTION_PROJECTIVE_REALITY_SCOPE"&&b?.actor==="SL(2,H)"&&b?.author_group_identification==="Spin(5,1)"&&b?.source_action_carrier==="C4=H2"&&b?.induced_action_carrier==="PT=CP3"&&b?.quantifier_scope==="WHOLE_ACTION_COMPATIBILITY_NOT_FORALL_ELEMENTWISE_NONCOMMUTATION","CP3 SL2H Spin5,1 source only");
 ok(c?.modality==="SOURCE_CP3_TWO_INEQUIVALENT_REAL_STRUCTURES_AUTHOR_CLAIM"&&c?.carrier==="PROJECTIVE_TWISTOR_SPACE_CP3"&&eq(c?.real_structures,["rho_USUAL_CONJUGATION","rho_tw_QUATERNION_ANTIPODAL"])&&c?.source_cardinality==="TWO_INEQUIVALENT_IN_AUTHOR_DECLARED_CP3_CONTEXT"&&c?.source_related_incident==="W-SSC-099/W05-099-01","source exactly two CP3 real structures, scoped");
 ok(d?.modality==="SOURCE_EUCLIDEAN_VERSUS_MINKOWSKI_REALITY_DIFFERENT_MAP_TARGETS"&&d?.euclidean?.source==="PT=CP3"&&d?.euclidean?.target==="PT=CP3"&&d?.euclidean?.source_map_type==="PROJECTIVE_SELF_MAP"&&d?.euclidean?.fiber_role==="CP1_FIBERS_INVARIANT_NOT_POINTWISE_FIXED"&&d?.minkowski?.source==="PT=CP3"&&d?.minkowski?.target==="PT_DUAL=CP3_DUAL"&&d?.minkowski?.source_map_type==="DUAL_PROJECTIVE_TARGET_MAP"&&d?.relation==="DISTINCT_SOURCE_MAP_TARGETS_NOT_SILENTLY_IDENTIFIED","real structures Euclidean self vs Minkowski dual codomains");
 ok(e?.modality==="SOURCE_MINKOWSKI_CONJUGATION_EXCHANGES_SPINOR_CHIRALITIES"&&e?.input_chirality==="ONE_SPINOR_CHIRALITY"&&e?.output_chirality==="OTHER_SPINOR_CHIRALITY"&&e?.context==="MINKOWSKI_REALITY_PT_TO_PT_DUAL"&&e?.contrast==="EUCLIDEAN_RHO_TW_ON_PT_ITSELF","source chirality transfer not alias");
 const w99=S?.items?.find(x=>x.id==="W-SSC-099")?.source_expression_census?.statements||[];
 ok(w99.some(x=>x.id==="W05-099-01"&&x.domain==="CP3"&&x.codomain==="CP3")&&w99.some(x=>x.id==="W05-099-03"&&x.domain==="CP3"&&x.codomain==="HP1"),"W099 CP3 real and HP1 fibration remains distinct");
 ok(O?.schema==="isograph.exp062-w05-s3-real-structure-chirality-source-first.v0.1"&&O?.original_primary?.revision==="arXiv:2202.02657v2"&&eq(O?.original_primary?.source_html_lines,[135,136])&&O?.original_primary?.printed_pdf_page===4&&O?.original_primary?.pdf_visually_inspected===true,"original W05 v2 html and PDF source");
 ok(O?.source_first_intervals?.length===2&&O?.source_first_intervals?.[0]?.html_line===135&&O?.source_first_intervals?.[1]?.html_line===136&&O?.source_first_intervals?.flatMap(x=>x.typed_ids||[])?.length===5,"line135 and line136 independent source roles");
 ok(O?.source_original_full_nine_reverse_complete===false&&O?.G0_frozen===false&&O?.no_W_L_synthesis===true&&O?.third_party==="OWNER_BYPASSED_NOT_PASSED","source scope not universal qualification");
 ok(F?.schema==="isograph.exp062-w05-s3-W100-reality-target-type-source-gap.v0.1"&&F?.earliest_affected_stage==="G0_SOURCE_SEMANTIC_TYPED_OCCURRENCE_CONSERVATION"&&F?.prior_source?.git_blob_sha===p.oldS&&F?.prior_source?.source_body_unchanged===true&&F?.new_roles?.length===5,"defect owner typed not prose");
 ok(M?.schema==="isograph.exp062-w05-s3-noncommuting-action-source-quantifier-guard.v0.1"&&M?.status==="INDEPENDENT_ELEMENTARY_IDENTITY_GROUP_ACTION_NEGATIVE_SCOPE_CONTROL"&&M?.formal_witness?.group_action_has_identity===true&&M?.formal_witness?.therefore_commute_for_identity===true&&M?.formal_witness?.composition_left==="A_e∘rho=rho"&&M?.formal_witness?.composition_right==="rho∘A_e=rho"&&M?.formal_witness?.refuted_overstrong_quantifier==="FOR_ALL_GROUP_ELEMENTS_g_ACTION_g_DOES_NOT_COMMUTE_WITH_RHO","independent identity always commutes hence no ∀g");
 ok(eq(M?.formal_witness?.works_for_both_source_group_roles,["SL(2,C)","SL(2,H)"])&&M?.map_target_type_guard?.euclidean_map_codomain==="PT"&&M?.map_target_type_guard?.minkowski_map_codomain==="PT_DUAL"&&M?.map_target_type_guard?.typed_identification_given_by_source===false&&M?.G0_frozen===false,"math witness both groups, dual target distinct");
 let sum=0,units={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){const s=S.items[i],r=R.rows[i],cov=C.rows[i],n=s.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(s.source)?.[0];sum+=n;units[u]=(units[u]||0)+n;ok(r.census_id===s.id&&cov.census_id===s.id&&r.source_body_exact===s.obligation&&r.source_expression_statement_count===n&&cov.body_length_chars===s.obligation.length&&cov.source_expression_statement_count===n&&r.historical_closure_accepted_as_current===false&&cov.stage_authority===false,"W151 all source coverage row "+i);}
 ok(sum===340&&units.W05===67&&eq(R?.counts?.current_source_expression_units,units)&&Object.entries(units).every(([key,n])=>C?.by_unit?.[key]?.source_expression_statements===n),"W05=67 W total340 counts");
 ok(R?.source_census?.git_blob_sha===p.S&&R?.historical_86_projection?.git_blob_sha===p.D&&R?.predecessor_register?.git_blob_sha===p.oldR&&C?.source_census?.git_blob_sha===p.S&&C?.reconstructed_register?.git_blob_sha===p.R&&C?.predecessor_coverage?.git_blob_sha===p.oldC,"current 151 register/coverage exact source lineage");
 ok(eq(R?.rows?.filter((x,i)=>!eq(x,oldR.rows[i])).map(x=>x.census_id),["W-SSC-100"])&&eq(C?.rows?.filter((x,i)=>!eq(x,oldC.rows[i])).map(x=>x.census_id),["W-SSC-100"]),"only source W100 affects register and coverage");
 ok(D?.items?.length===86&&D?.current_source?.git_blob_sha===p.S&&D?.predecessor_W_only_demand?.git_blob_sha===p.oldD&&D?.replay_policy?.G1_authorized===false&&eq(D?.items?.filter((x,i)=>!eq(x,oldD.items[i])).map(x=>x.census_id),["W-SSC-100"]),"historical86 85 other exact, not complete current demands");
 if(D?.items?.length===86)for(let i=0;i<86;i++){const x=D.items[i],s=S?.items?.find(z=>z.id===x.census_id);ok(x.track==="W"&&x.body===s?.obligation&&eq(x.source_formula_incidences||[],s?.source_expression_census?.statements||[]),"historical86 source projection row "+i);}
 ok(U?.source_census?.git_blob_sha===p.S&&U?.summary?.structured_incidences===340&&U?.summary?.W05_structured_count===67&&U?.summary?.all_nine_original_source_reverse_exhaustive===false&&eq(U?.units?.map(x=>x.structured_incidences),[122,41,17,11,25,24,12,21,67]),"current nine units 340 not reverse exhaustive");
 ok(oldG?.schema==="isograph.exp062-w-current-stage-gate.v0.80"&&G?.schema==="isograph.exp062-w-current-stage-gate.v0.81"&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===p.oldG,"G0 stage exact predecessor");
 ok(G?.current_source_census?.git_blob_sha===p.S&&G?.current_historical_86_member_projection?.git_blob_sha===p.D&&G?.current_all_151_conservation_register?.git_blob_sha===p.R&&G?.current_source_coverage?.git_blob_sha===p.C&&G?.current_W_nine_source_inventory?.git_blob_sha===p.U,"all gate0.81 source tuple pins");
 ok(G?.current_W05_S3_reality_source_first?.git_blob_sha===p.O&&G?.current_W05_S3_reality_gap?.git_blob_sha===p.F&&G?.current_W05_S3_noncommutation_negative?.git_blob_sha===p.M&&G?.current_W05_S3_verifier?.git_blob_sha===ctx.selfSha&&G?.current_W05_S3_verifier?.path===ctx.selfPath,"new stage W100 source, gap, negative and verifier pins");
 ok(G?.verification_at_record_creation?.W05_S3_NodeCI==="PENDING_CURRENT_GITHUB_ACTIONS"&&G?.verification_at_record_creation?.third_party==="OWNER_BYPASSED_NOT_PASSED","no unearned Node or external PASS");
 ok(G?.current_lawful_state?.G0_open===true,"G0 OPEN");
 for(const flag of ["G0_complete","G0_frozen","source_census_frozen","all_nine_source_full_reverse_assertion_enumeration_complete","Oct03_mutable_source_byte_identity_verified","complete_W_151_semantic_demand_membership_requalified","G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"])ok(G?.current_lawful_state?.[flag]===false,"no stage promotion "+flag);
 return errors;
};
const mutations=[
["drop W item",q=>q.S.items.pop()],
["unrelated W01 modified",q=>q.S.items[0].obligation+="BAD"],
["W100 narrative erased",q=>q.S.items.find(x=>x.id==="W-SSC-100").obligation="BAD"],
["W100 typed fifth claim erased",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements.pop()],
["W100 SL2C actor modified",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[0].actor="SL(2,R)"],
["W100 CP1 action domain changed",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[0].source_action_domain="C4"],
["W100 conformal carrier altered",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[0].induced_action_carrier="CP3"],
["W100 forall noncommuting promoted",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[0].quantifier_scope="FOR_ALL_g_NONCOMMUTES"],
["W100 SL2H missing",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[1].actor="SL(2,C)"],
["W100 Spin group changed",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[1].author_group_identification="Spin(4)"],
["W100 H2 source carrier missing",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[1].source_action_carrier="C2"],
["W100 H group forall noncommuting",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[1].quantifier_scope="FOR_ALL_g_FAILS"],
["W100 two real structures became three",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[2].source_cardinality="THREE_INEQUIVALENT"],
["W100 real structures swapped",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[2].real_structures.reverse()],
["W100 CP3 carrier erased",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[2].carrier="CP1"],
["W100 Euclidean target falsely dual",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[3].euclidean.target="PT_DUAL"],
["W100 Euclidean fibers falsely fixed",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[3].euclidean.fiber_role="EACH_POINT_FIXED"],
["W100 Minkowski dual target erased",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[3].minkowski.target="PT=CP3"],
["W100 Minkowski map type falsified",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[3].minkowski.source_map_type="PROJECTIVE_SELF_MAP"],
["W100 source map equivalence injected",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[3].relation="SAME_TARGET"],
["W100 chirality output same",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[4].output_chirality="ONE_SPINOR_CHIRALITY"],
["W100 chirality Minkowski context changed",q=>q.S.items.find(x=>x.id==="W-SSC-100").source_expression_census.statements[4].context="EUCLIDEAN"],
["W099 CP3 map target wrong",q=>q.S.items.find(x=>x.id==="W-SSC-099").source_expression_census.statements[0].codomain="PT_DUAL"],
["W099 quaternionic fibration wrong",q=>q.S.items.find(x=>x.id==="W-SSC-099").source_expression_census.statements[2].codomain="CP3"],
["source W05 original revision v1",q=>q.O.original_primary.revision="arXiv:2202.02657v1"],
["source W05 source lines wrong",q=>q.O.original_primary.source_html_lines=[136,137]],
["source original PDF index changed",q=>q.O.original_primary.printed_pdf_page=5],
["source row136 lost",q=>q.O.source_first_intervals.pop()],
["source source_full_nine falsely true",q=>q.O.source_original_full_nine_reverse_complete=true],
["source L synthesis falsely enabled",q=>q.O.no_W_L_synthesis=false],
["typed gap stage promoted G2",q=>q.F.earliest_affected_stage="G2"],
["typed gap old W100 source body marked changed",q=>q.F.prior_source.source_body_unchanged=false],
["identity group witness commutation false",q=>q.M.formal_witness.therefore_commute_for_identity=false],
["identity composition left changed",q=>q.M.formal_witness.composition_left="A_e∘rho=0"],
["source forall group noncommute not refuted",q=>q.M.formal_witness.refuted_overstrong_quantifier="EVERY_g_FAILS_PROVEN"],
["math Minkowski target falsely PT",q=>q.M.map_target_type_guard.minkowski_map_codomain="PT"],
["math chosen dual identification forged",q=>q.M.map_target_type_guard.typed_identification_given_by_source=true],
["old 86 row dropped",q=>q.D.items.pop()],
["old W100 typed in historical86 omitted",q=>{delete q.D.items.find(x=>x.census_id==="W-SSC-100").source_formula_incidences;}],
["current W100 register typed count old0",q=>q.R.rows.find(x=>x.census_id==="W-SSC-100").source_expression_statement_count=0],
["current W100 coverage typed count old0",q=>q.C.rows.find(x=>x.census_id==="W-SSC-100").source_expression_statement_count=0],
["all W05 incidence counter stale62",q=>q.C.by_unit.W05.source_expression_statements=62],
["nine unit W05 source count stale62",q=>q.U.summary.W05_structured_count=62],
["gate source sha stale",q=>q.G.current_source_census.git_blob_sha=pins.oldS],
["gate source oracle sha wrong",q=>q.G.current_W05_S3_reality_source_first.git_blob_sha="BAD"],
["gate math negative guard missing",q=>q.G.current_W05_S3_noncommutation_negative.git_blob_sha="BAD"],
["gate validator self sha wrong",q=>q.G.current_W05_S3_verifier.git_blob_sha="BAD"],
["G0 false complete",q=>q.G.current_lawful_state.G0_complete=true],
["G0 false frozen",q=>q.G.current_lawful_state.G0_frozen=true],
["G1 false authorized",q=>q.G.current_lawful_state.G1_authorized=true],
["original all nine false complete",q=>q.G.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
["Oct03 old source bytes falsely verified",q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["third-party false PASS",q=>q.G.verification_at_record_creation.third_party="PASSED"],
["W L synthesis false authorization",q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true]
];
const get=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const src=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,get(k)]));
const ctx={pins,selfSha:sha('self'),selfPath:P.self};
const errors=[];for(const[k,s]of Object.entries(pins))if(sha(k)!==s)errors.push('BLOB_PIN '+k);
const positive=check(src,ctx);errors.push(...positive.map(x=>'POSITIVE '+x));
const rejected=[],escaped=[],crashed=[];for(const [n,fn]of mutations){const q=JSON.parse(JSON.stringify(src)),old=JSON.stringify(q);try{fn(q);if(old===JSON.stringify(q))escaped.push(n+' NO_EFFECT');else if(check(q,ctx).length)rejected.push(n);else escaped.push(n)}catch(e){crashed.push(n+' '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §3 CP3 Minkowski dual target and noncommuting action source0.39 0.1',pass:errors.length===0,errors,positive_errors:positive,mutants:mutations.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,source_items:151,source_incidences:340,W05_source_incidences:67,W100_typed:5,other150_exact:true,narrative_unchanged:true,stage:'G0_OPEN_UNFROZEN',external:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
