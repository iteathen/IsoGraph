import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_40.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_41.json","oldD":"experiments/062/W_G0_W05_S4_SOURCE_DEMAND_PROJECTION_0_24.json","D":"experiments/062/W_G0_W05_S51_SOURCE_DEMAND_PROJECTION_0_25.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_26.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_27.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_25.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_26.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_85.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_86.json","O":"experiments/062/W05_G0_S51_HYPERKAHLER_SOURCE_FIRST_0_1.json","F":"experiments/062/W05_G0_S51_HYPERKAHLER_TYPED_DEFECT_0_1.json","M":"experiments/062/W05_G0_S51_UNIT_SPHERE_NEGATIVE_CONTROL_0_1.json","N":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_8.json","Oct3":"experiments/062/W_G0_OCT03_ACTIONS_JOB_LOG_RECOVERY_0_3.json","self":"experiments/062/tools/verify-w05-s51-hyperkahler-source-g0-0-1.mjs"};
const pins={"oldS":"78aa5be5cd0dd8c5ae56ac2e645d6b36193369b7","S":"64d51e3bd41b816fc415b47012089518156bcb28","oldD":"32e52e23e6cf05afdc95042c8eb6d19e80b7badc","D":"4474914f458bf2d0de8d3fe2bb5a20407342d93c","oldR":"b0ac13c809d0ee4acab455c4d7368140bf456690","R":"9b67edc121878c41dad049bb554e95d33fdcd576","oldC":"8692736f0367b21b382ba2db69afc6f810ad7e38","C":"4180469f612538c52bfbb3c7e65e376b7293b83a","oldG":"8dcefd58856484620c7ddf69254d2a4899110d11","O":"a14bce71e29173cc1fa60168381481c5a8811da0","F":"fd2d00b93b0165c24c92466df5ee25689cdc7561","M":"60ab2449e06f5f849b6257d7dc4820b0d7a4871c","N":"f3c75a0de33e24ee345bb9093370ecbced2d8391","Oct3":"8594c9271d45e4559704f213ac5860a3ac884329"};
const load=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),cp=x=>JSON.parse(JSON.stringify(x));
const input=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,load(k)]));
function quaternionMultiply(a,b){return [a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]]}
function verify(q){
const errs=[],ok=(v,m)=>{if(!v)errs.push(m)};
const {oldS,S,oldD,D,oldR,R,oldC,C,oldG,G,O,F,M,N,Oct3}=q;
const before=oldS?.items?.find(x=>x.id==='W-SSC-102'),after=S?.items?.find(x=>x.id==='W-SSC-102');
const current=after?.source_expression_census?.statements||[],previous=before?.source_expression_census?.statements||[],newSource=O?.new_exact_source_claims||[];
const claim=id=>newSource.find(x=>x.id===id);
ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.86'&&G?.track==='W'&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===pins.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.85'&&oldG?.current_lawful_state?.G0_complete===false,'stage G0 old85 new86 exact ancestry');
ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C,'G0 pinned source demand register coverage');
ok(G?.current_W05_S51_source_oracle?.git_blob_sha===pins.O&&G?.current_W05_S51_source_gap?.git_blob_sha===pins.F&&G?.current_W05_S51_math_scope?.git_blob_sha===pins.M&&G?.current_W_nine_source_inventory?.git_blob_sha===pins.N,'W102 source first original provenance and inventory exact');
ok(G?.current_W05_S51_source_verifier?.path===P.self&&G?.current_W05_S51_source_verifier?.git_blob_sha===sha('self'),'current source verifier exact self pin');
ok(oldS?.schema==='woit.source-semantic-census.v0.40'&&S?.schema==='woit.source-semantic-census.v0.41'&&S?.items?.length===151&&oldS?.items?.length===151&&S?.closure_claims?.sealed===false&&S?.correction?.G0_frozen===false,'current 151 source identities remain unsealed');
ok(S?.predecessor?.git_blob_sha===pins.oldS&&S?.correction?.primary_oracle?.git_blob_sha===pins.O&&S?.correction?.defect?.git_blob_sha===pins.F&&S?.correction?.math_control?.git_blob_sha===pins.M,'SSCs source predecessor and first independent research');
ok(same(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&same(S?.items?.filter((x,i)=>!same(x,oldS.items[i])).map(x=>x.id),['W-SSC-102']),'other 150 W source items exactly unchanged');
ok(after?.source==='W05 §5.1'&&after?.state==='OPEN_EXPOSITORY'&&after?.obligation?.startsWith(before?.obligation||'MISSING')&&before?.source_expression_census?.statements?.length===2&&current.length===8&&same(current.slice(0,2),previous),'W102 old text and two source expressions prefix preserved');
ok(newSource?.length===6&&same(newSource.map(x=>x.id),['W05-102-03','W05-102-04','W05-102-05','W05-102-06','W05-102-07','W05-102-08'])&&same(current.slice(2),newSource),'six source-first author assertions exact ordered');
ok(claim('W05-102-03')?.example_families?.length===4&&claim('W05-102-03')?.example_families?.[0]?.alternate==='H^k'&&claim('W05-102-03')?.example_families?.[2]?.base==='RIEMANN_SURFACE_SIGMA'&&claim('W05-102-03')?.example_families?.[3]?.base==='RIEMANN_SURFACE_SIGMA'&&claim('W05-102-03')?.negative?.includes('DONT_GENERALIZE_SIGMA_TO_ARBITRARY_X'),'flat and coadjoint and Riemann surface examples each source-scoped');
ok(claim('W05-102-04')?.modality==='SOURCE_TWISTOR_SPACE_FROM_HYPERKAHLER_SPHERE'&&claim('W05-102-04')?.carrier==='HYPERKAHLER_M_REAL_DIM_4k'&&claim('W05-102-04')?.base_parameter==='SPHERE_OF_KAHLER_STRUCTURES_S2_EQ_CP1'&&claim('W05-102-04')?.negative?.includes('M_NOT_ALWAYS_FLAT_R4'),'hyperkahler twistor construction not flat total-space identity');
ok(same(claim('W05-102-05')?.source_bibliography?.authors,['N. J. Hitchin','A. Karlhede','U. Lindström','M. Roček'])&&claim('W05-102-05')?.source_citation==='6'&&claim('W05-102-05')?.source_bibliography?.year===1987&&claim('W05-102-05')?.credit_scope==='AUTHOR_REPORTED_EARLY_STUDY_NOT_GLOBAL_PRIORITY_PROOF','reference6 four named authors early historical attribution only');
ok(claim('W05-102-06')?.source_citation==='7'&&claim('W05-102-06')?.source_bibliography?.author==='Nigel Hitchin'&&claim('W05-102-06')?.source_bibliography?.year===1992&&claim('W05-102-06')?.credit_scope==='BIBLIOGRAPHIC_POINTER_DISTINCT_FROM_REFERENCE_6_ORIGINAL_QUOTIENT_CLAIM','source separate Hitchin survey not duplicate ref6');
ok(claim('W05-102-07')?.source_actor==='AUTHORS_OF_REFERENCE_6'&&claim('W05-102-07')?.source_action==='GENERALIZED_SYMPLECTIC_QUOTIENT_BY_GROUP_G_FROM_KAHLER_TO_HYPERKAHLER'&&claim('W05-102-07')?.negative?.includes('NO_G_ACTION_REGULARITY_OR_MOMENT_MAP_HYPOTHESES_PRINTED_HERE'),'quoted hyperkahler quotient and necessary unprinted assumptions');
ok(claim('W05-102-08')?.source_carrier==='SPACE_OF_SELF_DUAL_YANG_MILLS_CONNECTIONS_ON_A_BUNDLE_ON_R4'&&claim('W05-102-08')?.operator==='QUOTIENT_BY_GROUP_OF_GAUGE_TRANSFORMATIONS'&&claim('W05-102-08')?.source_reported_result==='FINITE_DIMENSIONAL_MODULI_SPACE_OF_SOLUTIONS'&&claim('W05-102-08')?.source_unprinted_hypotheses?.length===4&&claim('W05-102-08')?.negative?.includes('DO_NOT_ASSERT_UNRESTRICTED_SDYM_QUOTIENT_ON_NONCOMPACT_R4_FINITE_DIMENSION'),'SDYM cited finite-dimensional result as author report not unrestricted theorem');
ok(previous?.[0]?.lhs==='aI+bJ+cK'&&previous?.[0]?.coefficient_condition==='a^2+b^2+c^2=1'&&previous?.[1]?.cases?.length===3&&same(previous?.[1]?.cases?.map(x=>x.directions),[1,2,3]),'original unit-sphere and directional reduction expressions retained');
ok(O?.schema==='isograph.exp062-w05-s51-hyperkahler-source-first.v0.1'&&O?.original_author?.revision==='arXiv:2202.02657v2'&&O?.original_author?.source_html_lines?.[0]===166&&O?.original_author?.source_html_lines?.[1]===174&&O?.original_author?.pdf_zero_index===5&&O?.independent_original_first_intervals?.length===5&&O?.baseline?.original_W102_statement_count===2&&O?.baseline?.new_W102_statement_count===8&&O?.baseline?.new_all_incidents===351,'original HTML and visually checked PDF p6 five intervals');
if(O?.independent_original_first_intervals?.length===5){for(let i=0;i<5;i++){const row=O.independent_original_first_intervals[i];ok(row?.ordinal===i+1&&row?.html?.[0]===(i===0?166:O.independent_original_first_intervals[i-1].html[1]+1),'source first row contiguous '+i)}ok(O.independent_original_first_intervals[4].html[1]===174&&O.independent_original_first_intervals.flatMap(x=>x.new_source_ids).length===6,'source first interval terminal and six source identifiers')}
ok(O?.source_dependent_extra_qualification?.source_does_not_print_SDYM_R4_boundary_finite_energy_regularities===true&&O?.source_dependent_extra_qualification?.do_not_import_third_party_mathematics===true&&O?.limits?.third_party==='OWNER_BYPASSED_NOT_PASSED'&&O?.limits?.not_all_source_reverse===true,'source proof qualifier');
ok(F?.earliest_defect_stage==='G0_SOURCE_ASSERTION_CENSUS'&&same(F?.missing_source_typed_ids,newSource.map(x=>x.id))&&F?.old_source?.git_blob_sha===pins.oldS&&F?.full_original_nine_source_reverse_complete===false&&F?.source_corpus_target_changed===false,'original source defect typed only no phantom omissions');
ok(M?.schema==='isograph.exp062-w05-s51-unit-quaternion-sphere-nonauthor-negative.v0.1'&&M?.status==='NONAUTHOR_EVALUATION_UNIT_SPHERE_BINDER_NOT_GENERAL_HYPERKAHLER_THEOREM'&&M?.conclusion?.not_an_author_statement===true,'math negative non-author exact');
if(M?.calculation?.source_unit_cases?.length===5){for(let i=0;i<5;i++){const p=M.calculation.source_unit_cases[i],q=quaternionMultiply([0,p.a,p.b,p.c],[0,p.a,p.b,p.c]);ok(Math.abs(p.a*p.a+p.b*p.b+p.c*p.c-1)<1e-10&&Math.abs(q[0]+1)<1e-10&&q.slice(1).every(x=>Math.abs(x)<1e-10),'unit imaginary quaternion left multiplication squares -identity '+i)}}
const n=M?.calculation?.negative_case,qr=n?quaternionMultiply([0,n.a,n.b,n.c],[0,n.a,n.b,n.c]):[];
ok(n?.norm_squared===4&&n?.not_complex_structure===true&&Math.abs(qr[0]+4)<1e-10&&qr.slice(1).every(x=>x===0),'nonunit control not complex structure');
ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.25'&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD&&D?.items?.length===86,'partial W86 historical projection correctly pinned');
ok(same(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&same(D?.items?.filter((x,i)=>!same(x,oldD.items[i])).map(x=>x.census_id),['W-SSC-102']),'old86 other85 exact unchanged');
ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.27'&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR&&R?.rows?.length===151,'all151 source register source+historical projection lineage');
ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.26'&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC&&C?.rows?.length===151,'all151 source coverage lineage');
let typed=0,unit={};
if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){for(let i=0;i<151;i++){const x=S.items[i],r=R.rows[i],c=C.rows[i],n=x.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];typed+=n;unit[u]=(unit[u]||0)+n;ok(r.census_id===x.id&&r.source_body_exact===x.obligation&&r.source_expression_statement_count===n&&r.historical_closure_accepted_as_current===false&&c.census_id===x.id&&c.body_length_chars===x.obligation.length&&c.source_expression_statement_count===n&&c.stage_authority===false,'151 source/register/coverage row '+i)}}
if(D?.items?.length===86)for(let i=0;i<86;i++){let d=D.items[i],x=S?.items?.find(v=>v.id===d.census_id);ok(d.track==='W'&&d.body===x?.obligation&&same(d.source_formula_incidences||[],x?.source_expression_census?.statements||[]),'86 historical source incidence '+i)}
ok(typed===351&&unit.W05===78&&same(R?.counts?.current_source_expression_units,unit)&&C?.by_unit?.W05?.source_expression_statements===78&&C?.counts?.total_structured_source_incidents===351,'all 351 structural incidences and 9 source unit totals');
ok(N?.source_census?.git_blob_sha===pins.S&&N?.units?.length===9&&N?.summary?.items===151&&N?.summary?.structured_incidences===351&&N?.summary?.all_nine_original_source_reverse_exhaustive===false,'nine unit inventory no false source closure');
ok(Oct3?.summary?.original_mutable_oct03_source_byte_identity_verified===false&&Oct3?.summary?.all_nine_source_reverse_exhaustive===false&&N?.provenance?.October03_job_log_audit?.git_blob_sha===pins.Oct3,'Oct03 sixteen job log audit recorded original mutable provenance still blocked');
ok(G?.verification_at_record_creation?.W05_S51_NodeCI==='PENDING_CURRENT_NODE_RUN'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','current W05 5.1 CI NOT preclaimed');
const legal=G?.current_lawful_state;ok(legal?.G0_open===true,'G0 still OPEN');
for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(legal?.[key]===false,'source stage anti-promotion '+key);
return errs;
}
const errors=[];for(const[k,x]of Object.entries(pins))if(sha(k)!==x)errors.push('BLOB_PIN '+k);
const base=verify(input);errors.push(...base.map(x=>'POSITIVE '+x));
const mutations=[
['lose one of 151 source items',x=>x.S.items.pop()],
['mutate unrelated W01 body',x=>x.S.items[0].obligation+='FAKE'],
['delete W102 last source typed',x=>x.S.items[101].source_expression_census.statements.pop()],
['change old W102 first unit sphere',x=>x.S.items[101].source_expression_census.statements[0].coefficient_condition='a2+b2+c2=4'],
['change old W102 one directional reduction',x=>x.S.items[101].source_expression_census.statements[1].cases[0].directions=4],
['W102 lose original narrative',x=>x.S.items[101].obligation='BAD'],
['source W102 invented theorem',x=>x.O.new_exact_source_claims[0].epistemic_role='MATHEMATICAL_THEOREM_QUALIFIED'],
['coadjoint generalized all metrics',x=>x.O.new_exact_source_claims[0].negative=[]],
['Sigma replaced arbitrary X',x=>x.O.new_exact_source_claims[0].example_families[2].base='ARBITRARY_X'],
['Higgs Sigma erased',x=>x.O.new_exact_source_claims[0].example_families[3].base='ARBITRARY_X'],
['flat Hk removed',x=>x.O.new_exact_source_claims[0].example_families.shift()],
['twistor M replaced R4 equality',x=>x.O.new_exact_source_claims[1].negative=[]],
['hyperkahler sphere parameter not CP1',x=>x.O.new_exact_source_claims[1].base_parameter='UNRESTRICTED_R4'],
['early study credited to Woit',x=>x.O.new_exact_source_claims[2].source_bibliography.authors=['Peter Woit']],
['early study global priority proof forged',x=>x.O.new_exact_source_claims[2].credit_scope='PROVED_FIRST_AUTHOR_GLOBAL'],
['Hitchin Karlhede author dropped',x=>x.O.new_exact_source_claims[2].source_bibliography.authors.pop()],
['reference6 year mutated',x=>x.O.new_exact_source_claims[2].source_bibliography.year=1992],
['reference6 citation mislabeled7',x=>x.O.new_exact_source_claims[2].source_citation='7'],
['reference7 survey attributed Woit',x=>x.O.new_exact_source_claims[3].source_bibliography.author='Peter Woit'],
['survey conflated primary paper',x=>x.O.new_exact_source_claims[3].credit_scope='ORIGINAL_QUOTIENT_PROOF'],
['survey citation changed',x=>x.O.new_exact_source_claims[3].source_citation='6'],
['hyperkahler quotient author attribution changed',x=>x.O.new_exact_source_claims[4].source_actor='WOIT'],
['quotient generalized without group',x=>x.O.new_exact_source_claims[4].source_action='NO_GROUP'],
['arbitrary group actions allowed',x=>x.O.new_exact_source_claims[4].negative=[]],
['SDYM original geometry not R4',x=>x.O.new_exact_source_claims[5].source_carrier='S4'],
['SDYM quotient operator erased',x=>x.O.new_exact_source_claims[5].operator='IDENTITY'],
['SDYM finite dimensional report removed',x=>x.O.new_exact_source_claims[5].source_reported_result='INFINITE'],
['SDYM unprinted conditions attributed to author',x=>x.O.new_exact_source_claims[5].negative=[]],
['SDYM missing finite action context dropped',x=>x.O.new_exact_source_claims[5].source_unprinted_hypotheses.pop()],
['source third-party review falsely claimed passed',x=>x.O.limits.third_party='PASSED'],
['source full reverse falsely qualified',x=>x.O.limits.not_all_source_reverse=false],
['defect original all9 falsely complete',x=>x.F.full_original_nine_source_reverse_complete=true],
['original source version changed',x=>x.O.original_author.revision='arXiv:2202.02657v1'],
['original source p6 altered',x=>x.O.original_author.pdf_zero_index=6],
['source-first interval gap',x=>x.O.independent_original_first_intervals[2].html[0]=171],
['source-first missing row',x=>x.O.independent_original_first_intervals.pop()],
['original author no longer opaque',x=>x.O.source_dependent_extra_qualification.do_not_import_third_party_mathematics=false],
['source interval counter wrong',x=>x.O.baseline.original_W102_statement_count=3],
['missing source gap falsely G1',x=>x.F.earliest_defect_stage='G1'],
['mutate math unit sphere coefficients',x=>x.M.calculation.source_unit_cases[3].a=0.9],
['mutate math nonunit norm 1',x=>x.M.calculation.negative_case.norm_squared=1],
['nonunit becomes complex structure',x=>x.M.calculation.negative_case.not_complex_structure=false],
['math control falsely author text',x=>x.M.conclusion.not_an_author_statement=false],
['historical86 omitted one member',x=>x.D.items.pop()],
['historical86 W102 body corrupt',x=>x.D.items.find(x=>x.census_id==='W-SSC-102').body='WRONG'],
['current all151 register W102 corrupt',x=>x.R.rows[101].source_body_exact='WRONG'],
['current coverage W102 expression count old',x=>x.C.rows[101].source_expression_statement_count=2],
['current W05 typed total old',x=>x.C.by_unit.W05.source_expression_statements=72],
['nine source inv lies closed',x=>x.N.summary.all_nine_original_source_reverse_exhaustive=true],
['nine source inc total wrong',x=>x.N.summary.structured_incidences=345],
['Oct03 W original bytes falsely verified',x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
['Oct03 log audit falsely recovered',x=>x.Oct3.summary.original_mutable_oct03_source_byte_identity_verified=true],
['gate old parent pointer stale',x=>x.G.supersedes.git_blob_sha='BAD'],
['gate W102 source pointer wrong',x=>x.G.current_source_census.git_blob_sha=pins.oldS],
['gate verifier self hash wrong',x=>x.G.current_W05_S51_source_verifier.git_blob_sha='WRONG'],
['source first oracle pointer corrupted',x=>x.G.current_W05_S51_source_oracle.git_blob_sha='WRONG'],
['G0 falsely frozen',x=>x.G.current_lawful_state.G0_frozen=true],
['G1 falsely authorized',x=>x.G.current_lawful_state.G1_authorized=true],
['cross-track synthesis allowed',x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true],
['external verification prequalified',x=>x.G.verification_at_record_creation.third_party='PASSED'],
['current Node CI preclaimed',x=>x.G.verification_at_record_creation.W05_S51_NodeCI='PASS']
];
const rejected=[],escaped=[],crashed=[];for(const[name,fn]of mutations){const x=cp(input),before=JSON.stringify(x);try{fn(x);if(before===JSON.stringify(x))escaped.push(name+' NO_EFFECT');else if(verify(x).length)rejected.push(name);else escaped.push(name)}catch(err){crashed.push(name+': '+err.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §5.1 primary source six citation/example/quotient incidence G0 0.1',pass:errors.length===0,positive_errors:base,errors,hostile_total:mutations.length,hostile_rejected:rejected.length,hostile_escaped:escaped.length,hostile_crashed:crashed.length,current_W_source_items:151,current_all9_source_incidents:351,W05_incidents:78,original_all9_reverse_complete:false,current_G0:'OPEN_UNFROZEN',original_Oct03_mutable_source_bytes:'UNVERIFIED',third_party:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
