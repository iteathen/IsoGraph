import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_39.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_40.json","oldD":"experiments/062/W_G0_W05_S3_REALITY_SOURCE_DEMAND_PROJECTION_0_23.json","D":"experiments/062/W_G0_W05_S4_SOURCE_DEMAND_PROJECTION_0_24.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_25.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_26.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_24.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_25.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_83.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_84.json","O":"experiments/062/W05_G0_S4_FIBRATIONS_PRIMARY_SOURCE_FIRST_0_1.json","F":"experiments/062/W05_G0_S4_FIBRATIONS_TYPED_DEFECT_0_1.json","M":"experiments/062/W05_G0_S4_QUATERNION_PAULI_EXACT_SCOPE_0_1.json","U":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_7.json","self":"experiments/062/tools/verify-w05-s4-fibrations-source-g0-0-2.mjs","fail":"experiments/062/W05_G0_S4_VERIFIER_0_1_POSITIVE_FAILURE_0_1.json"};
const pins={"oldS":"f60ceba905cf52d76049c7d9966fc73c2f6120d9","S":"78aa5be5cd0dd8c5ae56ac2e645d6b36193369b7","oldD":"8ecf71c8ae4dcaf1f96c4edfcb9173cc5525f532","D":"32e52e23e6cf05afdc95042c8eb6d19e80b7badc","oldR":"271e1e01f37a7b0abda0fba0d013315906cdfe59","R":"b0ac13c809d0ee4acab455c4d7368140bf456690","oldC":"61f75f5c4f806bc845c2015f62ba5dd421dcb5f6","C":"8692736f0367b21b382ba2db69afc6f810ad7e38","oldG":"62520849c9ba96046a601e8cb5005b5b02ba9c72","O":"50032bcd8c56bd83730e1dcd59efb0fb6125b3fa","F":"08840fbe4ba296740dd49cd86e82eea070d3b3bc","M":"42e3e4188cc330c302e1747936ff0dad68e12449","U":"e51523e003317518e78d2f06572d1c1ce88e65d3","fail":"d3ddf2f09c0d6bc82a5d110eaad1dc87781b4937"};
const load=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const blobsha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const validate=function validate(q,pins,selfSHA){
const errors=[],ok=(x,m)=>{if(!x)errors.push(m)},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const {oldS,S,oldD,D,oldR,R,oldC,C,oldG,G,O,F,M,U,fail}=q;
const id="W-SSC-101",s=S?.items?.find(x=>x.id===id),prior=oldS?.items?.find(x=>x.id===id),stm=s?.source_expression_census?.statements||[];
const get=i=>stm.find(x=>x.id==="W05-101-"+i);
ok(G?.schema==="isograph.exp062-w-current-stage-gate.v0.84"&&oldG?.schema==="isograph.exp062-w-current-stage-gate.v0.83"&&G?.supersedes?.git_blob_sha===pins.oldG&&G?.track==="W"&&G?.semantic_authority===false,"current G0 and immutable predecessor");
ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C,"full new source tuple pinned");
ok(G?.current_W05_S4_source_first?.git_blob_sha===pins.O&&G?.current_W05_S4_source_gap?.git_blob_sha===pins.F&&G?.current_W05_S4_math_scope?.git_blob_sha===pins.M&&G?.current_W_nine_source_inventory?.git_blob_sha===pins.U,"source origin, gap, math, unit inventory pinned");
ok(G?.current_W05_S4_source_verifier?.git_blob_sha===selfSHA&&G?.current_W05_S4_source_verifier?.path===P.self,"current verifier self pin");
ok(S?.schema==="woit.source-semantic-census.v0.40"&&S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false&&S?.predecessor?.git_blob_sha===pins.oldS,"SSC0.40 identity and exact source parent");
ok(same(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&same(S?.items?.filter((x,i)=>!same(x,oldS.items[i])).map(x=>x.id),[id]),"150 other item objects verbatim");
ok(prior?.obligation===s?.obligation&&prior?.state===s?.state&&stm?.length===7&&prior?.source_expression_census?.statements?.length===2&&same(stm.slice(0,2),prior?.source_expression_census?.statements),"W101 original two expressions/body untouched");
ok(same(stm.slice(2),O?.typed_source_occurrences)&&same(stm.slice(2).map(x=>x.id),["W05-101-03","W05-101-04","W05-101-05","W05-101-06","W05-101-07"]),"exact source-first five typed expressions");
ok(s?.source==="W05 §4"&&s?.source_expression_census?.source_semantic_only===true&&s?.source_expression_census?.not_G1_authority===true&&s?.source_expression_census?.not_mathematical_theorem===true,"source is W-only expository typed not theorem");
ok(get("03")?.diagram?.total_space==="PT=CP3"&&get("03")?.diagram?.base==="S4=HP1"&&get("03")?.diagram?.fiber==="CP1"&&get("03")?.base_complex_manifold===false&&get("03")?.total_space_complex_manifold===true,"CP3->S4 fibration source base/dimension");
ok(get("04")?.input?.equations==="SELF_DUAL_YANG_MILLS"&&get("04")?.input?.base==="S4"&&get("04")?.output?.complex_base==="PT=CP3"&&get("04")?.source_relation==="AUTHOR_REPORTS_CORRESPONDENCE"&&get("04")?.negative?.includes("NOT_ALL_YANG_MILLS_SOLUTIONS"),"selfdual YM scope and CP3 bundle");
ok(get("05")?.credited_person==="Roger Penrose"&&get("05")?.citation_index==="12"&&get("05")?.name==="NON_LINEAR_GRAVITON_CONSTRUCTION"&&get("05")?.extension_object==="SELF_DUAL_SOLUTIONS_TO_EINSTEIN_EQUATIONS_ON_OTHER_FOUR_MANIFOLDS"&&get("05")?.negative?.includes("DO_NOT_CONFLATE_SELF_DUAL_YM_WITH_SELF_DUAL_EINSTEIN"),"Penrose credited Einstein extension separate");
ok(get("06")?.carrier==="R4=H"&&get("06")?.binder==="x in UNIT_SPHERE_R3"&&get("06")?.parameter_space==="CP1"&&get("06")?.negative?.includes("DO_NOT_TREAT_QUATERNION_I_J_K_AS_COMMUTATIVE"),"quaternion J unit sphere exact source scope");
ok(get("07")?.source_diagram_a?.total_space==="R4 x CP1"&&get("07")?.source_diagram_a?.base==="CP1"&&get("07")?.source_diagram_b?.total_space==="O(1) directsum O(1)"&&get("07")?.relation==="SOURCE_ISOMORPHISM_OF_HOLOMORPHIC_FIBRATIONS"&&get("07")?.source_diagram_a?.complex_structure_on_R4==="SELECTED_BY_CP1_PARAMETER"&&get("07")?.negative?.includes("SOURCE_NOT_ASSERTING_PRODUCT_HOLOMORPHIC_STRUCTURE_ON_R4xCP1"),"O1 bundles vs base-varying product not holomorphically trivial");
ok(s?.source_expression_census?.statements?.[1]?.eigenvalue==="+1"&&s?.source_expression_census?.statements?.[1]?.general_dimension==="2d O(1) copies","Pauli +1 source preserved");
ok(O?.method?.external_cold_reconstruction===false&&O?.method?.other_author_semantics_consumed===false,"source original review not claimed as external proof or cross-track");
ok(O?.schema==="isograph.exp062-w05-section4-fibrations-primary-reverse-v0.1"&&O?.primary_source?.revision==="arXiv:2202.02657v2"&&same(O?.primary_source?.primary_html_line_interval,[137,162])&&same(O?.primary_source?.pdf_page_indices,[3,4])&&O?.primary_source?.pdf_diagrams?.length===3&&O?.method?.primary_pdf_diagrams_used_when_HTML_math_is_blank===true,"PDF verified original diagrams and arxiv scope");
if(O?.rows?.length===7){for(let i=0;i<7;i++){let row=O.rows[i];ok(row?.ordinal===i+1&&row?.source_html_line_first===(i?O.rows[i-1].source_html_line_last+1:137),"original source interval contiguous "+i)}ok(O.rows[6].source_html_line_last===162&&O.rows.flatMap(x=>x.restored_typed_ids||[]).length===5,"seven intervals five typed statements")}
else ok(false,"seven original first-pass source rows");
ok(O?.expected?.unchanged_others===150&&O?.expected?.source_body_edit===false&&O?.G0_current==='OPEN_UNFROZEN'&&O?.method?.original_all_nine_reverse_complete===false&&O?.full_W_151_demands_qualified===false,"oracle not false G0 completeness");
ok(F?.earliest_affected_stage==="G0_SOURCE_SEMANTIC_ASSERTION_CONSERVATION"&&F?.source_predecessor?.git_blob_sha===pins.oldS&&F?.gaps?.length===5&&F?.not_original_author_omission===true,"G0 typed gap records source already in author prose");
ok(M?.schema==="isograph.exp062-w05-s4-quaternion-pauli-exact-control.v0.1"&&M?.source_census_edit===false&&M?.external_review==="OWNER_BYPASSED_NOT_PASSED","math control non-author only");
const sm=M?.quaternion_sample,pm=M?.pauli_sample,u=sm?.x1?.numerator||0,v=sm?.x2?.numerator||0,den=sm?.x1?.denominator;
ok(den===5&&sm?.x2?.denominator===5&&u*u+v*v===den*den&&sm?.unit_norm_squared===1&&sm?.source_complex_structure_square==="J_x^2=-identity_on_real_H"&&sm?.distinct_basis_case==="J_i and J_j distinct and J_i*J_j = -J_j*J_i","independent quaternion unit norm, J square, anticommutation");
ok(same(pm?.coefficients,["3/5","4/5","0"])&&same(pm?.matrix_entries,[["0","3/5-4i/5"],["3/5+4i/5","0"]])&&pm?.determinant===-1&&pm?.trace===0&&pm?.squared==="identity_C2"&&same(pm?.eigenvalues,[1,-1])&&pm?.positive_projector_properties?.rank===1&&pm?.positive_projector_properties?.idempotent===true,"Pauli exact rational square, eigen and projection");
ok(M?.scope_guards?.includes("This exact pointwise algebra does not independently prove the source's holomorphic line bundle classification O(1)"),"math point test not global holomorphic bundle proof");
ok(D?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.24"&&D?.items?.length===86&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD&&D?.replay_policy?.G1_authorized===false,"historical W86 partial and correct source pin");
ok(same(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&same(D?.items?.filter((x,i)=>!same(x,oldD.items[i])).map(x=>x.census_id),[id]),"other85 historical projection members byte-exact");
ok(R?.schema==="isograph.exp062-w-g0-all-151-source-membership-register.v0.26"&&R?.rows?.length===151&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR,"151 registered source tuple/current W86 exact");
ok(C?.schema==="isograph.exp062-w-g0-line-by-line-151-coverage.v0.25"&&C?.rows?.length===151&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC,"151 coverage W scope+provenance");
const difR=R?.rows?.filter((x,i)=>!same(x,oldR.rows[i])).map(x=>x.census_id),difC=C?.rows?.filter((x,i)=>!same(x,oldC.rows[i])).map(x=>x.census_id);
ok(same(difR,[id])&&same(difC,[id]),"only W101 register and coverage rows changed");
let tally={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){const x=S.items[i],r=R.rows[i],c=C.rows[i],n=x.source_expression_census?.statements?.length||0;const u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];tally[u]=(tally[u]||0)+n;ok(r?.census_id===x.id&&r?.source_body_exact===x.obligation&&r?.source_expression_statement_count===n&&r?.historical_closure_accepted_as_current===false&&c?.census_id===x.id&&c?.body_length_chars===x.obligation.length&&c?.source_expression_statement_count===n&&c?.stage_authority===false,"all 151 exact row "+i)}
if(D?.items?.length===86)for(let i=0;i<86;i++){let x=D.items[i],src=S.items.find(v=>v.id===x.census_id);ok(x?.track==="W"&&x?.body===src?.obligation&&same(x?.source_formula_incidences||[],src?.source_expression_census?.statements||[]),"partial86 source expressions exact "+i)}
ok(tally.W05===72&&Object.values(tally).reduce((a,b)=>a+b,0)===345&&same(R?.counts?.current_source_expression_units,tally)&&C?.by_unit?.W05?.source_expression_statements===72&&C?.counts?.total_structured_source_incidents===345,"all nine-source 345 W05 72 typed mechanical sums");
ok(U?.source_census?.git_blob_sha===pins.S&&U?.units?.length===9&&U?.summary?.items===151&&U?.summary?.structured_incidences===345&&U?.summary?.all_nine_original_source_reverse_exhaustive===false&&U?.summary?.G0_frozen===false,"unit inventory 9 exact and unfrozen");
const gstate=G?.current_lawful_state;
ok(gstate?.G0_open===true,"W G0 remains OPEN");
for(const k of ["G0_complete","G0_frozen","source_census_frozen","all_nine_source_full_reverse_assertion_enumeration_complete","Oct03_mutable_source_byte_identity_verified","complete_W_151_semantic_demand_membership_requalified","G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"])ok(gstate?.[k]===false,"stage must not promote "+k);
ok(G?.current_W05_S4_v01_failed_NodeCI?.git_blob_sha===pins.fail&&G?.current_W05_S4_v01_failed_NodeCI?.run_id===37990121656&&G?.current_W05_S4_v01_failed_NodeCI?.positive_baseline_pass===false,"previous source verifier positive failed preserved");
ok(fail?.schema==="isograph.exp062-w05-s4-source-verifier-v01-positive-failure.v0.1"&&fail?.run?.head_sha==="03fd2daeebf1378305914f84e448e962afe93684"&&fail?.run?.job_id===114021837538&&fail?.run?.positive_baseline_pass===false&&fail?.run?.mutations_total===46&&fail?.run?.rejected===46&&fail?.run?.score_qualified===false,"v01 46/46 mutants unqualified because baseline failed");
ok(fail?.cause?.bad_checks?.[0]?.actual==="O.expected.unchanged_others"&&fail?.cause?.bad_checks?.[1]?.actual==="O.method.original_all_nine_reverse_complete","exact two positive-fixture defects restored");
ok(G?.verification_at_record_creation?.W05_S4_NodeCI==="PENDING_CURRENT_GITHUB_ACTIONS"&&G?.verification_at_record_creation?.third_party==="OWNER_BYPASSED_NOT_PASSED"&&G?.current_historical_86_member_projection?.qualification===false,"Node not preclaimed nor external bypass treated as pass");
return errors;
};
const testcases={"source W101 entirely omitted":(x=>x.S.items.splice(100,1)),
"wrong W101 original prose":(x=>x.S.items[100].obligation="SOURCE_EDIT"),
"unrelated W01 source corruption":(x=>x.S.items[0].obligation="SOURCE_EDIT"),
"W101 original two expressions changed":(x=>x.S.items[100].source_expression_census.statements[1].eigenvalue="-1"),
"W101 new five omitted":(x=>x.S.items[100].source_expression_census.statements.pop()),
"W101 new source id forged":(x=>x.S.items[100].source_expression_census.statements[2].id="WRONG"),
"source CP3 base becomes CP1":(x=>x.O.typed_source_occurrences[0].diagram.base="CP1"),
"source CP3 S4 falsely complex":(x=>x.O.typed_source_occurrences[0].base_complex_manifold=true),
"source Yang Mills becomes all YM":(x=>x.O.typed_source_occurrences[1].negative=[]),
"source Yang Mills output wrong":(x=>x.O.typed_source_occurrences[1].output.complex_base="S4"),
"source Yang Mills author report promoted":(x=>x.O.typed_source_occurrences[1].source_relation="INDEPENDENTLY_PROVEN_THEOREM"),
"source Einstein attributed Woit not Penrose":(x=>x.O.typed_source_occurrences[2].credited_person="Peter Woit"),
"source nonlinear graviton citation lost":(x=>x.O.typed_source_occurrences[2].citation_index="15"),
"source Einstein conflated with YM":(x=>x.O.typed_source_occurrences[2].negative=[]),
"source quaternion unit sphere lost":(x=>x.O.typed_source_occurrences[3].binder="arbitrary real x"),
"source quaternion made commuting":(x=>x.O.typed_source_occurrences[3].negative=[]),
"source smooth R4 base turned S4":(x=>x.O.typed_source_occurrences[4].source_diagram_a.base="S4"),
"source holomorphic bundle made trivial":(x=>x.O.typed_source_occurrences[4].source_diagram_b.total_space="C2 x CP1"),
"source dependent complex structure erased":(x=>x.O.typed_source_occurrences[4].source_diagram_a.complex_structure_on_R4="fixed"),
"source nontrivial-complex negative erased":(x=>x.O.typed_source_occurrences[4].negative=[]),
"source PDF diagram omitted":(x=>x.O.primary_source.pdf_diagrams.pop()),
"source PDF index shifted":(x=>x.O.primary_source.pdf_page_indices=[4,5]),
"source line interval gap":(x=>x.O.rows[4].source_html_line_first=148),
"source line interval truncated":(x=>x.O.rows.pop()),
"source nine originally complete claimed":(x=>x.O.method.original_all_nine_reverse_complete=true),
"source fixture unchanged-other count forged":(x=>x.O.expected.unchanged_others=149),
"source v01 failed verifier falsely passed":(x=>x.fail.run.score_qualified=true),
"source v01 failure evidence pin forged":(x=>x.G.current_W05_S4_v01_failed_NodeCI.git_blob_sha="BAD"),
"source author proof fabricated":(x=>x.O.method.external_cold_reconstruction=true),
"source defect wrong gate":(x=>x.F.earliest_affected_stage="G2"),
"sample quaternion wrong sign":(x=>x.M.quaternion_sample.source_complex_structure_square="positive"),
"sample quaternion coefficient no unit":(x=>x.M.quaternion_sample.x1.numerator=4),
"sample quaternion commutative":(x=>x.M.quaternion_sample.distinct_basis_case="commute"),
"sample Pauli eigen minus only":(x=>x.M.pauli_sample.eigenvalues=[-1,-1]),
"sample Pauli rank two":(x=>x.M.pauli_sample.positive_projector_properties.rank=2),
"sample math falsely proves O1 bundle":(x=>x.M.scope_guards=[]),
"history 86 projection omits W101":(x=>x.D.items.splice(x.D.items.findIndex(y=>y.census_id==="W-SSC-101"),1)),
"history projection W101 source formula stale":(x=>x.D.items.find(y=>y.census_id==="W-SSC-101").source_formula_incidences.pop()),
"register 151 W101 source formula old":(x=>x.R.rows[100].source_expression_statement_count=2),
"coverage 151 W101 source formula old":(x=>x.C.rows[100].source_expression_statement_count=2),
"source inventory W05 count stale":(x=>x.U.summary.structured_incidences=340),
"source gate source SHA stale":(x=>x.G.current_source_census.git_blob_sha=pins.oldS),
"source gate current verifier SHA fake":(x=>x.G.current_W05_S4_source_verifier.git_blob_sha="BAD"),
"source gate new source oracle SHA fake":(x=>x.G.current_W05_S4_source_first.git_blob_sha="BAD"),
"source G0 freeze forged":(x=>x.G.current_lawful_state.G0_frozen=true),
"source G1 promotion forged":(x=>x.G.current_lawful_state.G1_authorized=true),
"source Oct3 byte identity forged":(x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true),
"source external review pass forged":(x=>x.G.verification_at_record_creation.third_party="PASSED"),
"source W/L synthesis forged":(x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true)};
const original=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,load(k)]));
const copy=x=>JSON.parse(JSON.stringify(x));
const errors=[];for(const[k,v] of Object.entries(pins))if(blobsha(k)!==v)errors.push('file SHA mismatch '+k);
const positive=validate(original,pins,blobsha('self'));errors.push(...positive.map(x=>'POSITIVE '+x));
const rejected=[],escaped=[],crashed=[];
for(const [name,mut] of Object.entries(testcases)){const q=copy(original),before=JSON.stringify(q);try{mut(q);if(before===JSON.stringify(q))escaped.push(name+' NO_EFFECT');else if(validate(q,pins,blobsha('self')).length)rejected.push(name);else escaped.push(name);}catch(error){crashed.push(name+':'+error.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §4 primary twistor fibrations source0.40 G0 0.2',pass:errors.length===0,errors,positive_errors:positive,hostile_total:Object.keys(testcases).length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,source_items:151,source_typed_incidences:345,W05_typed_incidences:72,current_state:'G0_OPEN_UNFROZEN',external:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
