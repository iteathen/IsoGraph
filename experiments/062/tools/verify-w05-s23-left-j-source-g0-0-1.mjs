import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_37.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_38.json","oldD":"experiments/062/W_G0_W05_S53_SOURCE_DEMAND_PROJECTION_0_21.json","D":"experiments/062/W_G0_W05_S23_J_SOURCE_DEMAND_PROJECTION_0_22.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_23.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_24.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_22.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_23.json","oldU":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_4.json","U":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_5.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_78.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_79.json","O":"experiments/062/W05_G0_S23_J_LEFT_SOURCE_FIRST_0_1.json","F":"experiments/062/W05_G0_S23_J_LEFT_TYPED_DEFECT_0_1.json","M":"experiments/062/W05_G0_S23_J_EXACT_NEGATIVE_CALC_0_1.json","self":"experiments/062/tools/verify-w05-s23-left-j-source-g0-0-1.mjs"};
const pins={"oldS":"7ff385d7194cb98faa71119eb51545cce1da41e1","S":"7b09a118635d62d4b6c364d1c12b8d85f2af1ae4","oldD":"7920016c19aede43dd81287761793ee331cb5955","D":"eda9117df588d819711ce716b5cef81294e82289","oldR":"1e977b5d9285c2df0e23b3d113d0aaeef1fe2155","R":"584157928c478672393efda98a493e9831fd9d32","oldC":"2874adbd70adac2858cef3e4c00b8d97a9ea4a3d","C":"f1b6530f7be02145b7eea051d4d1fc06f43ddca1","oldU":"f77c3926a50fb67843ac5db42a16297aa7a33343","U":"a50f5a7768323f8598c5f552414fb486b4038960","oldG":"6bdb9c5852fbda67000ae9764048a5119779a1ae","O":"e4324e2fb30f68c0ab40174673f8d3df16fd2874","F":"0d03917eceffe13ba47f1755d825d2ff8a2bdd45","M":"8c8499dd656ef8c1a8367feacf3bf18cd3573f6c"};
const check=function check(q,ctx){
const e=[],ok=(p,s)=>{if(!p)e.push(s)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),p=ctx.pins;
const {S,oldS,D,oldD,R,oldR,C,oldC,U,oldU,G,oldG,O,F,M}=q;
const w=S?.items?.find(x=>x.id==="W-SSC-098"),oldW=oldS?.items?.find(x=>x.id==="W-SSC-098"),j=w?.source_expression_census?.statements||[];
ok(oldS?.schema==="woit.source-semantic-census.v0.37"&&oldW?.source_expression_census===undefined&&oldS?.items?.length===151,"old0.37 W098 zero typed");
ok(S?.schema==="woit.source-semantic-census.v0.38"&&S?.items?.length===151&&S?.census_item_count===151&&S?.source_count===9&&S?.closure_claims?.sealed===false,"source0.38 151 nine unfrozen");
ok(eq(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&eq(S?.items?.filter((x,i)=>!eq(x,oldS.items[i])).map(x=>x.id),["W-SSC-098"])&&w?.obligation===oldW?.obligation,"150 other W items unchanged, W098 body exact");
ok(S?.predecessor?.git_blob_sha===p.oldS&&S?.correction?.source_first_oracle?.git_blob_sha===p.O&&S?.correction?.source_expression_defect?.git_blob_sha===p.F&&S?.correction?.calculation_check?.git_blob_sha===p.M,"candidate predecessor/source provenance exact");
ok(j.length===5&&eq(j,O?.restored_source_incidents)&&eq(j.map(x=>x.id),["W05-098-01","W05-098-02","W05-098-03","W05-098-04","W05-098-05"]),"5 typed source-first inc exact");
ok(j[0]?.modality==="SOURCE_REAL_QUATERNION_COORDINATE_CARRIER_IDENTIFICATION"&&eq(j[0]?.original_quaternion_order,["x0*1","x1*bold_i","x2*bold_j","x3*bold_k"])&&eq(j[0]?.complex_coordinate_pair_order,["x0+x1*i","x2+x3*i"]),"H real to ordered C2 pair");
ok(j[1]?.first_term==="z1"&&j[1]?.second_term==="z2*bold_j"&&j[1]?.z1==="x0+x1*i"&&j[1]?.z2==="x2+x3*i"&&j[1]?.complex_coefficient_position==="LEFT_OF_BOLD_J"&&j[1]?.no_permitted_silent_reversal===true,"source q right-j ordered");
ok(j[2]?.modality==="SOURCE_LEFT_QUATERNION_J_MULTIPLICATION_EXPANSION"&&j[2]?.action_side==="LEFT_OF_Q"&&j[2]?.original_input==="bold_j*(z1+z2*bold_j)"&&j[2]?.source_intermediate==="bold_j*(x0+x1*bold_i)+bold_j*(x2+x3*bold_i)*bold_j"&&j[2]?.source_real_components_intermediate==="-(x2-x3*bold_i)+(x0-x1*bold_i)*bold_j"&&j[2]?.source_output==="-conj(z2)+conj(z1)*bold_j"&&eq(j[2]?.output_order,["-conj(z2)","conj(z1)"]),"j left source intermediate and exact signs");
ok(j[3]?.complex_vector_carrier==="C2_COORDINATE_PAIRS"&&eq(j[3]?.coordinate_map?.ordered_output,["-conj(z2)","conj(z1)"])&&j[3]?.source_ref==="W-SSC-097/W097-S03"&&j[3]?.source_vector_square_ref==="W-SSC-097/W097-S05"&&j[3]?.source_projective_composition_ref==="W-SSC-097/W097-S06","W097 source map J roles vector vs projective");
ok(j[4]?.twistor_space==="T=C4=H2"&&eq(j[4]?.ordered_complex_pair_blocks,[["z1","z2"],["z3","z4"]])&&eq(j[4]?.complex_four_vector_output,["-conj(z2)","conj(z1)","-conj(z4)","conj(z3)"])&&j[4]?.source_ref==="W-SSC-099/W05-099-01"&&j[4]?.semantic_role==="SHARED_COORDINATE_MECHANISM_NOT_SECOND_INDEPENDENT_THEOREM","CP3 paired J output and non-duplicated scope");
const a=S?.items?.find(x=>x.id==="W-SSC-097")?.source_expression_census?.statements||[],b=S?.items?.find(x=>x.id==="W-SSC-099")?.source_expression_census?.statements||[];
ok(a.some(x=>x.id==="W097-S03"&&eq(x.result,["NEGATE(CONJUGATE(z2))","CONJUGATE(z1)"]))&&a.some(x=>x.id==="W097-S05"&&x.result==="NEGATIVE_IDENTITY_ON_C2")&&a.some(x=>x.id==="W097-S06"&&x.result==="IDENTITY_ON_CP1"),"W097 existing vector minus/projective plus distinction");
const canon=x=>x.replaceAll("bar(","conj(");
ok(b.some(x=>x.id==="W05-099-01"&&x.domain==="CP3"&&eq(x.ordered_rhs.map(canon),j[4]?.complex_four_vector_output))&&b.some(x=>x.id==="W05-099-03"&&x.codomain==="HP1"),"W099 actual bar/conj notation scoped normalized and CP3");
ok(O?.schema==="isograph.exp062-w05-s23-quaternion-j-source-first-census.v0.1"&&O?.original_primary?.arxiv_revision==="arXiv:2202.02657v2"&&eq(O?.original_primary?.scoped_original_lines,[99,120])&&O?.original_primary?.printed_pdf_page===3&&O?.original_primary?.pdf_visually_inspected===true,"original W05 v2 HTML99-120 and PDF3");
ok(O?.source_first_intervals?.length===5&&O?.source_first_intervals[0]?.html?.[0]===99&&O?.source_first_intervals[4]?.html?.[1]===120&&O?.source_first_intervals.flatMap(x=>x.typed_restored||[]).length===5,"source first typed 5 and bounded 99-120");
if(O?.source_first_intervals?.length===5)for(let i=0;i<5;i++)ok(O.source_first_intervals[i].ordinal===i+1&&(i===0||O.source_first_intervals[i].html[0]===O.source_first_intervals[i-1].html[1]+1),"source interval contiguous "+i);
ok(O?.full_W151_current_demand_qualified===false&&O?.original_nine_source_reverse_exhaustiveness===false&&O?.source_first_intervals?.[3]?.scope==="ALREADY_CONSERVED_AS_OTHER_W_SOURCE_ITEM","no accidental nine-unit/full151 claim");
ok(F?.schema==="isograph.exp062-w05-s23-j-left-mul-structured-expression-gap.v0.1"&&F?.earliest_affected_stage==="G0_SOURCE_SEMANTIC_EXPRESSION_CENSUS"&&F?.no_claim_original_text_was_omitted===true&&F?.missing_typed_roles?.length===5&&F?.predecessor?.git_blob_sha===p.oldS,"gap typed not author narrative omission");
ok(M?.schema==="isograph.exp062-w05-s23-left-j-real-quaternion-independent-calculation.v0.1"&&M?.status==="NONAUTHOR_EXACT_GAUSSIAN_INTEGER_CALCULATION_CHECKS_SOURCE_SIGNS_AND_CARRIER_DISTINCTION","independent math not new author claim");
const s=M?.calculation?.selected_real_coefficients,v=[s?.x0,s?.x1,s?.x2,s?.x3],J=x=>[-x[2],x[3],x[0],-x[1]],u=J(v),u2=J(u),o=M?.calculation?.expected_left_J_quaternion_coefficients,o2=M?.calculation?.expected_second_left_J_quaternion_coefficients;
ok(eq(u,[o?.x0,o?.x1,o?.x2,o?.x3])&&eq(u2,v.map(z=>-z))&&eq(u2,[o2?.x0,o2?.x1,o2?.x2,o2?.x3])&&eq(M?.calculation?.expected_left_J_complex_pairs,[{re:u[0],im:u[1]},{re:u[2],im:u[3]}]),"J independently evaluates and J² is negative C2");
const lambda=M?.calculation?.complex_antilinearity_example?.lambda,L=[lambda?.re,lambda?.im],conj=[lambda?.re,-lambda?.im],cmul=(z,l)=>[z[0]*l[0]-z[1]*l[1],z[0]*l[1]+z[1]*l[0]],zz=[[v[0],v[1]],[v[2],v[3]]],left=J(cmul(zz[0],L).concat(cmul(zz[1],L))),right=cmul([u[0],u[1]],conj).concat(cmul([u[2],u[3]],conj)),wrong=cmul([u[0],u[1]],L).concat(cmul([u[2],u[3]],L));
ok(eq(left,right)&&!eq(left,wrong)&&M?.calculation?.complex_antilinearity_example?.identity==="J(lambda*v)=conj(lambda)*J(v)"&&M?.calculation?.expected_squared_action==="NEGATIVE_IDENTITY_ON_C2_NOT_ON_CP1"&&M?.calculation?.projective_squared_action==="IDENTITY_ON_CP1_WHEN_MINUS_SIGN_IS_QUOTIENTED","independent conjugate-scalar anti-linearity and CP1 projective quotient");
let sum=0,units={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){const x=S.items[i],y=R.rows[i],z=C.rows[i],num=x.source_expression_census?.statements?.length||0,k=x.source.match(/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/)?.[0];sum+=num;units[k]=(units[k]||0)+num;ok(y.census_id===x.id&&z.census_id===x.id&&y.source_body_exact===x.obligation&&y.source_expression_statement_count===num&&z.body_length_chars===x.obligation.length&&z.source_expression_statement_count===num&&y.historical_closure_accepted_as_current===false&&z.stage_authority===false,"151 source registry+coverage row "+i)}
ok(sum===335&&units.W05===62&&eq(R?.counts?.current_source_expression_units,units)&&Object.entries(units).every(([k,n])=>C?.by_unit?.[k]?.source_expression_statements===n),"W05 62 / total335 current");
ok(R?.source_census?.git_blob_sha===p.S&&R?.historical_86_projection?.git_blob_sha===p.D&&R?.predecessor_register?.git_blob_sha===p.oldR&&C?.source_census?.git_blob_sha===p.S&&C?.reconstructed_register?.git_blob_sha===p.R&&C?.predecessor_coverage?.git_blob_sha===p.oldC,"register coverage exact pin lineage");
ok(eq(R?.rows?.filter((x,i)=>!eq(x,oldR.rows[i])).map(x=>x.census_id),["W-SSC-098"])&&eq(C?.rows?.filter((x,i)=>!eq(x,oldC.rows[i])).map(x=>x.census_id),["W-SSC-098"]),"other150 register and coverage rows exact");
ok(D?.items?.length===86&&D?.current_source?.git_blob_sha===p.S&&D?.predecessor_W_only_demand?.git_blob_sha===p.oldD&&D?.replay_policy?.G1_authorized===false&&eq(D.items.filter((x,i)=>!eq(x,oldD.items[i])).map(x=>x.census_id),["W-SSC-098"]),"historical86 other85 exact not qualified");
if(D?.items?.length===86)for(let i=0;i<86;i++){const x=D.items[i],y=S?.items?.find(z=>z.id===x.census_id);ok(x.track==="W"&&x.body===y?.obligation&&eq(x.source_formula_incidences||[],y?.source_expression_census?.statements||[]),"historical W86 body/typed member "+i)}
ok(U?.source_census?.git_blob_sha===p.S&&U?.summary?.structured_incidences===335&&U?.summary?.W05_structured_count===62&&U?.summary?.all_nine_original_source_reverse_exhaustive===false&&eq(U?.units?.map(x=>x.structured_incidences),[122,41,17,11,25,24,12,21,62]),"nine source item totals 335 no exhaustive claim");
ok(oldG?.schema==="isograph.exp062-w-current-stage-gate.v0.78"&&G?.schema==="isograph.exp062-w-current-stage-gate.v0.79"&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===p.oldG,"W G0 exact strict parent");
ok(G?.current_source_census?.git_blob_sha===p.S&&G?.current_historical_86_member_projection?.git_blob_sha===p.D&&G?.current_all_151_conservation_register?.git_blob_sha===p.R&&G?.current_source_coverage?.git_blob_sha===p.C&&G?.current_W_nine_source_inventory?.git_blob_sha===p.U,"gate all source tuple current");
ok(G?.current_W05_S23_source_first?.git_blob_sha===p.O&&G?.current_W05_S23_typed_defect?.git_blob_sha===p.F&&G?.current_W05_S23_math?.git_blob_sha===p.M&&G?.current_W05_S23_verifier?.git_blob_sha===ctx.selfSha&&G?.current_W05_S23_verifier?.path===ctx.selfPath,"new source oracle defect math and verifier self");
ok(G?.verification_at_record_creation?.W05_S23_NodeCI==="PENDING_CURRENT_GITHUB_ACTIONS"&&G?.verification_at_record_creation?.third_party==="OWNER_BYPASSED_NOT_PASSED","no preclaimed Node and external PASS");
ok(G?.current_lawful_state?.G0_open===true,"G0 OPEN");
for(const flag of ["G0_complete","G0_frozen","source_census_frozen","all_nine_source_full_reverse_assertion_enumeration_complete","Oct03_mutable_source_byte_identity_verified","complete_W_151_semantic_demand_membership_requalified","G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"])ok(G?.current_lawful_state?.[flag]===false,"G0 no promoted "+flag);
return e;
};
const mutations=[
["lost source count",q=>q.S.items.pop()],
["other W01 item modified",q=>q.S.items[0].obligation+="BAD"],
["W098 old narrative erased",q=>q.S.items.find(x=>x.id==="W-SSC-098").obligation="BAD"],
["W098 fifth source typed dropped",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements.pop()],
["source quaternion pair reversed",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[0].complex_coordinate_pair_order.reverse()],
["source coefficient j reordered",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[1].second_term="bold_j*z2"],
["source q z1 role lost",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[1].first_term="z2"],
["source J applied on wrong side",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[2].action_side="RIGHT_OF_Q"],
["source J intermediate sign reversed",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[2].source_real_components_intermediate="+(x2-x3*bold_i)+(x0-x1*bold_i)*bold_j"],
["source J conjugate negative lost",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[2].source_output="conj(z2)+conj(z1)*bold_j"],
["source J output swapped",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[2].output_order.reverse()],
["C2 map first negative lost",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[3].coordinate_map.ordered_output[0]="conj(z2)"],
["C2 source carrier falsely CP1",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[3].complex_vector_carrier="CP1"],
["source J² C2 role swapped",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[3].source_vector_square_ref="W-SSC-097/W097-S06"],
["source CP1 projective role swapped",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[3].source_projective_composition_ref="W-SSC-097/W097-S05"],
["C4 second pair removed",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[4].ordered_complex_pair_blocks.pop()],
["C4 output minus z4 lost",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[4].complex_four_vector_output[2]="conj(z4)"],
["CP3 repeated claim wrongly new theorem",q=>q.S.items.find(x=>x.id==="W-SSC-098").source_expression_census.statements[4].semantic_role="INDEPENDENT_THEOREM"],
["W097 vector square +1 fake",q=>q.S.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements.find(x=>x.id==="W097-S05").result="IDENTITY_ON_C2"],
["W097 projective square -1 fake",q=>q.S.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements.find(x=>x.id==="W097-S06").result="NEGATIVE_ON_CP1"],
["W099 CP3 conjugation output rearranged",q=>q.S.items.find(x=>x.id==="W-SSC-099").source_expression_census.statements.find(x=>x.id==="W05-099-01").ordered_rhs.reverse()],
["W099 CP3 domain collapsed CP1",q=>q.S.items.find(x=>x.id==="W-SSC-099").source_expression_census.statements.find(x=>x.id==="W05-099-01").domain="CP1"],
["original arxiv version swapped",q=>q.O.original_primary.arxiv_revision="arXiv:2202.02657v1"],
["original PDF printed page wrong",q=>q.O.original_primary.printed_pdf_page=4],
["source-first interval gap",q=>q.O.source_first_intervals[2].html[0]=108],
["source-first row deleted",q=>q.O.source_first_intervals.splice(3,1)],
["source-original complete falsely true",q=>q.O.original_nine_source_reverse_exhaustiveness=true],
["W151 current demands falsely qualified",q=>q.O.full_W151_current_demand_qualified=true],
["source defect falsely says old prose absent",q=>q.F.no_claim_original_text_was_omitted=false],
["source defect stage falsely G2",q=>q.F.earliest_affected_stage="G2"],
["quaternion input changed",q=>q.M.calculation.selected_real_coefficients.x0=99],
["quaternion output changed",q=>q.M.calculation.expected_left_J_quaternion_coefficients.x1=7],
["quaternion second J output changed",q=>q.M.calculation.expected_second_left_J_quaternion_coefficients.x0=2],
["antilinearity fake linearity",q=>q.M.calculation.complex_antilinearity_example.identity="J(lambda*v)=lambda*J(v)"],
["C2 square false identity",q=>q.M.calculation.expected_squared_action="IDENTITY_ON_C2"],
["projective CP1 square false negative",q=>q.M.calculation.projective_squared_action="NEGATIVE_IDENTITY_ON_CP1"],
["historical 86 record dropped",q=>q.D.items.pop()],
["historical W098 typed removed",q=>{delete q.D.items.find(x=>x.census_id==="W-SSC-098").source_formula_incidences;}],
["W098 register count stale",q=>q.R.rows.find(x=>x.census_id==="W-SSC-098").source_expression_statement_count=0],
["W098 coverage count stale",q=>q.C.rows.find(x=>x.census_id==="W-SSC-098").source_expression_statement_count=0],
["W05 typed sum stale 57",q=>q.C.by_unit.W05.source_expression_statements=57],
["nine source inventory old57",q=>q.U.summary.W05_structured_count=57],
["gate source SHA stale",q=>q.G.current_source_census.git_blob_sha=pins.oldS],
["gate source oracle SHA wrong",q=>q.G.current_W05_S23_source_first.git_blob_sha="BAD"],
["gate math SHA wrong",q=>q.G.current_W05_S23_math.git_blob_sha="BAD"],
["gate verifier SHA wrong",q=>q.G.current_W05_S23_verifier.git_blob_sha="BAD"],
["gate coverage SHA stale",q=>q.G.current_source_coverage.git_blob_sha=pins.oldC],
["G0 complete forged",q=>q.G.current_lawful_state.G0_complete=true],
["G0 freeze forged",q=>q.G.current_lawful_state.G0_frozen=true],
["G1 permission forged",q=>q.G.current_lawful_state.G1_authorized=true],
["all original reverse falsely true",q=>q.G.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
["Oct03 mutable identity falsely verified",q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["third-party falsely passed",q=>q.G.verification_at_record_creation.third_party="PASSED"],
["cross track falsely authorized",q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true]
];
const get=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const source=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,get(k)]));
const ctx={pins,selfSha:sha('self'),selfPath:P.self};
const errors=[];for(const[k,v]of Object.entries(pins))if(sha(k)!==v)errors.push('BLOB_SHA '+k);
const positive=check(source,ctx);errors.push(...positive.map(x=>'POSITIVE '+x));
const rejected=[],escaped=[],crashed=[];
for(const[name,fn]of mutations){let q=JSON.parse(JSON.stringify(source)),before=JSON.stringify(q);try{fn(q);if(before===JSON.stringify(q))escaped.push(name+' NO_EFFECT');else if(check(q,ctx).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+' '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 G0 section2-3 left-j original source0.38 0.1',pass:errors.length===0,errors,positive_errors:positive,hostile_controls:mutations.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,source_items:151,source_incidences:335,W05_incidences:62,W098_typed:5,narrative_unchanged:true,stage:'G0_OPEN_UNFROZEN',third_party:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
