import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_41.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_42.json","oldD":"experiments/062/W_G0_W05_S51_SOURCE_DEMAND_PROJECTION_0_25.json","D":"experiments/062/W_G0_W05_S7_SOURCE_DEMAND_PROJECTION_0_26.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_27.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_28.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_26.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_27.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_87.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_88.json","O":"experiments/062/W05_G0_S7_SOURCE_FIRST_0_1.json","F":"experiments/062/W05_G0_S7_CITED_MODALITY_DEFECT_0_1.json","M":"experiments/062/W05_G0_S7_TWO_MODEL_NEGATIVE_0_1.json","N":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_9.json","CI":"experiments/062/W05_G0_S51_HYPERKAHLER_NODE_CI_RESULT_0_1.json","Oct3":"experiments/062/W_G0_OCT03_ACTIONS_JOB_LOG_RECOVERY_0_3.json","self":"experiments/062/tools/verify-w05-s7-source-modal-citation-g0-0-1.mjs"};
const pins={"oldS":"64d51e3bd41b816fc415b47012089518156bcb28","S":"77a7e7c3442e9bdd6d781279f327805ba59c0e6e","oldD":"4474914f458bf2d0de8d3fe2bb5a20407342d93c","D":"13e543475171d6d09e79880668ab0e0042e6133a","oldR":"9b67edc121878c41dad049bb554e95d33fdcd576","R":"d247ff9cb12848812a291ac2f092705414ce871c","oldC":"4180469f612538c52bfbb3c7e65e376b7293b83a","C":"1a9a40b855bb45799d8b551b9cc923d87bdb8b9c","oldG":"c6abfcdf7874842a5642562ef7ee7d7003b8d71e","O":"832bb8b9bc394fa75603bd310713b5a8d0bb6331","F":"35bbdaf2e5e93475fbb2cb307f1eddb716e1b88e","M":"56cf65f82b215662cb0609489550ec71f609ccab","N":"c52717ba69374ef14b4d2acc94f974ac95927888","CI":"46f589ced8ea1ec504b615a161b1a6b4b80312c8","Oct3":"8594c9271d45e4559704f213ac5860a3ac884329"};
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{let b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=x=>JSON.parse(JSON.stringify(x));
const input=Object.fromEntries(Object.keys(P).filter(x=>x!=='self').map(x=>[x,read(x)]));
function verify(q){
 const err=[],ok=(b,m)=>{if(!b)err.push(m)};
 const {oldS,S,oldD,D,oldR,R,oldC,C,oldG,G,O,F,M,N,CI,Oct3}=q;
 const before=oldS?.items?.find(x=>x.id==='W-SSC-110'),after=S?.items?.find(x=>x.id==='W-SSC-110');
 const terms=after?.source_expression_census?.statements||[],fn=id=>terms.find(x=>x.id===id);
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.88'&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.87'&&G?.supersedes?.git_blob_sha===pins.oldG&&G?.semantic_authority===false&&G?.track==='W','stage parent and current schema');
 ok(oldG?.current_W05_S51_verified_NodeCI?.git_blob_sha===pins.CI&&oldG?.current_lawful_state?.G0_complete===false,'prior G0 source0.41 Node scoped only');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C,'all updated source0.42 source/register/coverage/historical W86 pins');
 ok(G?.current_W05_S7_primary_oracle?.git_blob_sha===pins.O&&G?.current_W05_S7_source_gap?.git_blob_sha===pins.F&&G?.current_W05_S7_nondetermination?.git_blob_sha===pins.M&&G?.current_W_nine_source_inventory?.git_blob_sha===pins.N,'primary W05 source-first and two-model negative pinned');
 ok(G?.current_W05_S7_source_verifier?.path===P.self&&G?.current_W05_S7_source_verifier?.git_blob_sha===sha('self'),'verifier content exact current pin');
 ok(oldS?.schema==='woit.source-semantic-census.v0.41'&&S?.schema==='woit.source-semantic-census.v0.42'&&oldS?.items?.length===151&&S?.items?.length===151&&S?.closure_claims?.sealed===false&&S?.correction?.G0_complete===false,'151 source items remains G0 unfrozen');
 ok(S?.predecessor?.git_blob_sha===pins.oldS&&S?.correction?.source_oracle?.git_blob_sha===pins.O&&S?.correction?.defect?.git_blob_sha===pins.F&&S?.correction?.negative?.git_blob_sha===pins.M,'source0.42 exact author-source defect/falsifier');
 ok(equal(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&equal(S?.items?.filter((x,i)=>!equal(x,oldS.items[i])).map(x=>x.id),['W-SSC-110']),'W110 only, other150 source objects unchanged');
 ok(before?.source_expression_census===undefined&&after?.state==='OPEN_SPECULATIVE'&&after?.obligation?.startsWith(before?.obligation||'NONE')&&after?.source_expression_census?.not_mathematical_theorem===true&&terms.length===6,'old W110 narrative and open speculation preserved');
 ok(equal(terms.map(x=>x.id),['W05-110-01','W05-110-02','W05-110-03','W05-110-04','W05-110-05','W05-110-06'])&&equal(terms,O?.new_typed_occurrences),'six source-first typed W110 citations and two-way uncertainty exact');
 ok(fn('W05-110-01')?.epistemic_status==='SOURCE_SAYS_SIGNIFICANCE_REMAINS_OBSCURE'&&fn('W05-110-01')?.negative?.includes('NOT_PROVEN_NEW_UNIFICATION'),'unknown meaning no W-L consequence');
 ok(fn('W05-110-02')?.attributed_to==='David Ben-Zvi'&&fn('W05-110-02')?.source_citation==='2'&&fn('W05-110-02')?.bibliography?.notes_by==='Jackson van Dyke'&&fn('W05-110-02')?.context==='FOUR_DIMENSIONAL_TOPOLOGICAL_QUANTUM_FIELD_THEORY_VIEWPOINT_ON_NUMBER_THEORY','Ben Zvi 4D number theory TQFT cited source role');
 ok(fn('W05-110-03')?.source_citation==='11'&&fn('W05-110-03')?.bibliography?.author==='Masanori Morishita'&&fn('W05-110-03')?.ordered_source_analogies?.length===2&&equal(fn('W05-110-03')?.ordered_source_analogies?.map(x=>x.left+'~'+x.right),['NUMBER_FIELDS~THREE_MANIFOLDS','PRIMES~KNOTS'])&&fn('W05-110-03')?.ordered_source_analogies?.every(x=>x.operator==='ANALOGY_ONLY'),'Morishita two distinct analogies not actual identities');
 ok(equal(fn('W05-110-04')?.attributed_to,['Anton Kapustin','Edward Witten'])&&fn('W05-110-04')?.source_citation==='9'&&fn('W05-110-04')?.source_reported_relation?.left==='GEOMETRIC_LANGLANDS_PROGRAM_DUALITY'&&fn('W05-110-04')?.source_reported_relation?.right==='ELECTROMAGNETIC_DUALITY_IN_4D_QFT'&&fn('W05-110-04')?.negative?.includes('NO_W_L_TRACK_BRIDGE'),'Kapustin Witten external cited duality only');
 ok(fn('W05-110-05')?.source_assertions?.length===2&&fn('W05-110-05')?.source_assertions?.includes('PENROSE_WARD_TRANSFORM_INDICATES_TWISTOR_GEOMETRIC_FRAMEWORK')&&fn('W05-110-05')?.negative?.includes('DO_NOT_PROMOTE_TO_COMPLETE_FIELD_EQUATION_RECONSTRUCTION'),'Penrose Ward suggested geometric framework no universal theorem');
 ok(fn('W05-110-06')?.modality==='SOURCE_TWO_WAY_EPISTEMIC_POSSIBILITY_NO_RESOLUTION'&&fn('W05-110-06')?.source_certified_choice==='NONE'&&fn('W05-110-06')?.epistemic_mode==='OPEN_AND_UNRESOLVED'&&equal(fn('W05-110-06')?.possible_outcomes?.map(x=>x.case),['NO_FUNDAMENTAL_SIGNIFICANCE','UNKNOWN_DEEPER_INSIGHT_TO_BE_FOUND']),'two author possibilities unselected');
 ok(O?.schema==='isograph.exp062-w05-section7-cited-speculation-source-first.v0.1'&&O?.original_source?.revision==='arXiv:2202.02657v2'&&O?.original_source?.pdf_index===13&&equal(O?.original_source?.html_lines,[382,385])&&O?.source_first_intervals?.length===4,'original primary W05 p14 HTML382-385 source first');
 if(O?.source_first_intervals?.length===4){for(let i=0;i<4;i++)ok(O.source_first_intervals[i]?.html_lines?.[0]===(i?O.source_first_intervals[i-1].html_lines[1]+1:382)&&O.source_first_intervals[i]?.ordinal===i+1,'each original paragraph G0 source line '+i);ok(O.source_first_intervals[3].html_lines[1]===385&&O.source_first_intervals.flatMap(x=>x.incidences).length===6,'all six G0 cited/incidence roles from exact source lines')}
 ok(O?.scope_status?.all_original_nine_source_reverse_complete===false&&O?.scope_status?.full_current_W151_demand_qualified!==true&&O?.scope_status?.third_party==='OWNER_BYPASSED_NOT_PASSED','scope boundary external bypass not passed');
 ok(F?.earliest_affected_stage==='G0_SEMANTIC_OCCURRENCE_CONSERVATION'&&F?.predecessor?.git_blob_sha===pins.oldS&&F?.predecessor?.narrative_correct===true&&equal(F?.needed_typed_occurrence_ids,terms.map(x=>x.id))&&F?.source_text_changed===false&&F?.complete_original_W05_or_nine_source_reverse_proven===false,'W110 source gap typed not prose');
 ok(M?.schema==='isograph.exp062-w05-s7-two-model-epistemic-negative-control.v0.1'&&M?.status==='NONAUTHOR_TWO_VALUATIONS_SOURCE_CLAIM_DOES_NOT_CHOOSE_DEEPER_LINK'&&M?.logic?.models?.length===2&&equal(M?.logic?.models?.map(x=>x.symbol_value),[false,true])&&M?.logic?.models?.every(x=>x.source_assertions_compatible===true),'two illustrative valuations source cannot select actual result');
 ok(M?.logic?.entailed_true===false&&M?.logic?.entailed_false===false&&M?.logic?.epistemic_status==='NONDETERMINATE_SOURCE'&&M?.logic?.model_status==='ILLUSTRATIVE_ARGUMENT_NOT_FORMALLY_QUALIFIED_MODAL_LOGIC_AXIOMS','non-author negative merely scoped unknown');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.26'&&D?.items?.length===86&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD&&D?.replay_policy?.G1_authorized===false,'old86 demand historical source projection not qualified');
 ok(equal(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&equal(D?.items?.filter((x,i)=>!equal(x,oldD.items[i])).map(x=>x.census_id),['W-SSC-110']),'historical other85 source projection exact');
 ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.28'&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.rows?.length===151&&R?.predecessor_register?.git_blob_sha===pins.oldR,'all151 W source register predecessor and old86 pins');
 ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.27'&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.rows?.length===151&&C?.predecessor_coverage?.git_blob_sha===pins.oldC,'all151 W source coverage predecessor pinned');
 let count=0,units={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){for(let i=0;i<151;i++){const x=S.items[i],r=R.rows[i],c=C.rows[i],n=x.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];count+=n;units[u]=(units[u]||0)+n;ok(r?.census_id===x.id&&r?.source_body_exact===x.obligation&&r?.source_expression_statement_count===n&&r?.historical_closure_accepted_as_current===false&&c?.census_id===x.id&&c?.body_length_chars===x.obligation.length&&c?.source_expression_statement_count===n&&c?.stage_authority===false,'151 sources and cardinality '+i)}}
 if(D?.items?.length===86)for(let i=0;i<86;i++){let d=D.items[i],s=S.items.find(x=>x.id===d.census_id);ok(d.track==='W'&&d.body===s?.obligation&&equal(d.source_formula_incidences||[],s?.source_expression_census?.statements||[]),'old86 source inc '+i)}
 ok(count===357&&units.W05===84&&equal(R?.counts?.current_source_expression_units,units)&&C?.by_unit?.W05?.source_expression_statements===84&&C?.counts?.total_structured_source_incidents===357,'full source0.42 W05=84 and all9=357 exact');
 ok(N?.source_census?.git_blob_sha===pins.S&&N?.summary?.structured_incidences===357&&N?.summary?.items===151&&N?.units?.length===9&&N?.summary?.all_nine_original_source_reverse_exhaustive===false,'all nine current unit source totals without original reverse qualification');
 ok(CI?.run?.run_id===37997843016&&CI?.run?.head_sha==='83e05874ce53618fa29de865d8d7c115a94e4c9d'&&CI?.run?.positive_baseline==='PASS'&&CI?.run?.hostile_total===61&&CI?.run?.hostile_rejected===61&&CI?.pins?.source?.git_blob_sha===pins.oldS,'prior W05 hyperkahler Node 61/61 historical source0.41 exactly');
 ok(Oct3?.summary?.original_mutable_oct03_source_byte_identity_verified===false&&N?.provenance?.October03_job_log_audit?.git_blob_sha===pins.Oct3,'Oct03 mutable W03 W04 page bytes remain unverified');
 ok(G?.verification_at_record_creation?.W05_S7_NodeCI==='PENDING_FRESH_NODE_CI'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','current §7 Node and external review not preclaimed');
 const law=G?.current_lawful_state;ok(law?.G0_open===true,'G0 open');
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(law?.[key]===false,'G0 authoritative firewall '+key);
 return err;
}
const errors=[];for(const[k,v]of Object.entries(pins))if(sha(k)!==v)errors.push('BLOB_SHA '+k);
const baseline=verify(input);errors.push(...baseline.map(x=>'POSITIVE '+x));
const mutations=[
 ['old source item removed',x=>x.S.items.pop()],
 ['unrelated W01 source edited',x=>x.S.items[0].obligation+='FALSE'],
 ['new W110 missing one citation',x=>x.S.items[109].source_expression_census.statements.pop()],
 ['W110 old prose erased',x=>x.S.items[109].obligation='REWRITTEN'],
 ['W110 status incorrectly theorem',x=>x.S.items[109].state='CLOSED_THEOREM'],
 ['source Ben Zvi attributed to Woit',x=>x.O.new_typed_occurrences[1].attributed_to='Peter Woit'],
 ['Ben Zvi citation changed',x=>x.O.new_typed_occurrences[1].source_citation='11'],
 ['Ben Zvi four dimension changed',x=>x.O.new_typed_occurrences[1].context='TWO_DIMENSIONAL'],
 ['Ben Zvi note writer missing',x=>x.O.new_typed_occurrences[1].bibliography.notes_by='NONE'],
 ['Morishita swapped with Ben Zvi',x=>x.O.new_typed_occurrences[2].bibliography.author='Ben Zvi'],
 ['Morishita field-manifold changed',x=>x.O.new_typed_occurrences[2].ordered_source_analogies[0].left='POINTS'],
 ['Morishita prime-knot erased',x=>x.O.new_typed_occurrences[2].ordered_source_analogies.pop()],
 ['Morishita analogies promoted equality',x=>x.O.new_typed_occurrences[2].ordered_source_analogies[1].operator='IDENTITY'],
 ['Morishita cited ref2 instead11',x=>x.O.new_typed_occurrences[2].source_citation='2'],
 ['Kapustin Witten authors swapped',x=>x.O.new_typed_occurrences[3].attributed_to=['Woit']],
 ['Kapustin Witten citation source wrong',x=>x.O.new_typed_occurrences[3].source_citation='5'],
 ['Kapustin geometric Langlands changed',x=>x.O.new_typed_occurrences[3].source_reported_relation.left='LOCAL_LANG_LANDS'],
 ['Kapustin 4D EM duality changed',x=>x.O.new_typed_occurrences[3].source_reported_relation.right='2D_CFT'],
 ['Kapustin Woit-Lisi bridge invented',x=>x.O.new_typed_occurrences[3].negative=[]],
 ['Penrose Ward deleted',x=>x.O.new_typed_occurrences[4].source_assertions.pop()],
 ['Penrose Ward theorem promoted',x=>x.O.new_typed_occurrences[4].negative=[]],
 ['early statement significance determinate',x=>x.O.new_typed_occurrences[0].epistemic_status='KNOWN_PROOF'],
 ['close W110 no possibility',x=>x.O.new_typed_occurrences[5].source_certified_choice='DEEPER_LINK'],
 ['close W110 author mode proven',x=>x.O.new_typed_occurrences[5].epistemic_mode='QUALIFIED'],
 ['two possibilities collapse one',x=>x.O.new_typed_occurrences[5].possible_outcomes.pop()],
 ['source year revision v1',x=>x.O.original_source.revision='arXiv:2202.02657v1'],
 ['source PDF page wrong',x=>x.O.original_source.pdf_index=12],
 ['source-first missing interval',x=>x.O.source_first_intervals.pop()],
 ['source-first source line gap',x=>x.O.source_first_intervals[2].html_lines[0]=385],
 ['source-first provenance external passed',x=>x.O.scope_status.third_party='PASSED'],
 ['source-first false complete',x=>x.O.scope_status.all_original_nine_source_reverse_complete=true],
 ['F source typed incidence count decreased',x=>x.F.needed_typed_occurrence_ids.pop()],
 ['F says original W110 prose absent',x=>x.F.predecessor.narrative_correct=false],
 ['F source text changed falsely',x=>x.F.source_text_changed=true],
 ['two-world models collapse to no link',x=>x.M.logic.models[1].symbol_value=false],
 ['two-world link entailed true',x=>x.M.logic.entailed_true=true],
 ['two-world link entailed false',x=>x.M.logic.entailed_false=true],
 ['two-world source incompatible',x=>x.M.logic.models[0].source_assertions_compatible=false],
 ['negative two-world model becomes theorem',x=>x.M.logic.model_status='AXIOMS_PROVED'],
 ['historical W86 loses member',x=>x.D.items.pop()],
 ['historical W86 W110 false body',x=>x.D.items.find(y=>y.census_id==='W-SSC-110').body='WRONG'],
 ['register W110 old typed count 0',x=>x.R.rows[109].source_expression_statement_count=0],
 ['coverage W110 wrong text length',x=>x.C.rows[109].body_length_chars=1],
 ['source W05 typed count left 78',x=>x.C.by_unit.W05.source_expression_statements=78],
 ['nine source reverse incorrectly complete',x=>x.N.summary.all_nine_original_source_reverse_exhaustive=true],
 ['nine unit source count stale',x=>x.N.summary.structured_incidences=351],
 ['prior s51 CI falsely failure',x=>x.CI.run.positive_baseline='FAIL'],
 ['Oct3 mutable page bytes magically verified',x=>x.Oct3.summary.original_mutable_oct03_source_byte_identity_verified=true],
 ['gate source current stale',x=>x.G.current_source_census.git_blob_sha=pins.oldS],
 ['gate source first oracle pointer forged',x=>x.G.current_W05_S7_primary_oracle.git_blob_sha='BAD'],
 ['gate verifier self SHA forged',x=>x.G.current_W05_S7_source_verifier.git_blob_sha='BAD'],
 ['gate old parent wrong',x=>x.G.supersedes.git_blob_sha='BAD'],
 ['G0 frozen',x=>x.G.current_lawful_state.G0_frozen=true],
 ['G1 activated',x=>x.G.current_lawful_state.G1_authorized=true],
 ['G7 activated',x=>x.G.current_lawful_state.G7_authorized=true],
 ['cross track synthesis activated',x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true],
 ['external semantic review falsely passed',x=>x.G.verification_at_record_creation.third_party='PASSED'],
 ['current node prematurely marked pass',x=>x.G.verification_at_record_creation.W05_S7_NodeCI='PASS']
];
const rejected=[],escaped=[],crashed=[];
for(const[name,fn]of mutations){const q=clone(input),prior=JSON.stringify(q);try{fn(q);if(prior===JSON.stringify(q))escaped.push('NO_EFFECT '+name);else if(verify(q).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+': '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §7 source-first speculative third-party citation scope G0 0.1',pass:errors.length===0,errors,positive_errors:baseline,hostile_total:mutations.length,hostile_rejected:rejected.length,hostile_escaped:escaped.length,hostile_crashed:crashed.length,W_source_items:151,W05_structured:84,all9_structured:357,W110_source_occurrences:6,current_stage:'G0_OPEN_UNFROZEN',no_G1_or_L:true}));
if(errors.length)process.exitCode=1;
