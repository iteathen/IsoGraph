import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_96.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_97.json","oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_46.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_47.json","oldD":"experiments/062/W_G0_W02_IV1_SOURCE_DEMAND_PROJECTION_0_30.json","D":"experiments/062/W_G0_W02_IV2_SOURCE_DEMAND_PROJECTION_0_31.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_32.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_33.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_31.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_32.json","I":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_14.json","O":"experiments/062/W02_G0_SIV2_HODGE_YM_SOURCE_FIRST_0_1.json","F":"experiments/062/W02_G0_SIV2_TYPED_SOURCE_DEFECT_0_1.json","N":"experiments/062/W02_G0_SIV2_YM_ACTION_LOCAL_NEGATIVE_0_1.json","self":"experiments/062/tools/verify-w02-siv2-hodge-ym-source-g0-0-1.mjs"};
const pins={"oldG":"3527467ddb94ea1728b970f5aa4cb5e41f972fe2","oldS":"853a0e30b6ed659d177e2129bcb06be74987b532","S":"a7921a4434fcede276869c5334f1adc3711d4ad9","oldD":"bdfc7da9a730bc342f26251835497f45ffaac713","D":"64ae94a170cbf6e5844156fceefc684b3af139e3","oldR":"430cc1915b01dc8acf1c8616c4a86e6fd05ba358","R":"dfb00c38a9368ee38693230bf4e29aa9f9c09ec4","oldC":"f640bff6de0a095a9193b95195dbd46d5fd1b9a6","C":"e2b31a073e2501d39bd0bab193879b8c5cd4c1f1","I":"e4d03df0274391593cd2cf53e7c6c96da6da5191","O":"552654a27dbaa5ec99d78d07ed87f7afa3efbc91","F":"18ebdf82fe159bf97b3fda22fce8475b44c44062","N":"1a06bbddb3d58a4418a818cd4b7b887420cceb97"};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),copy=a=>JSON.parse(JSON.stringify(a));
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const keys=Object.keys(P).filter(k=>k!=='self');
const input=Object.fromEntries(keys.map(k=>[k,read(k)]));
const owners=['W-SSC-144','W-SSC-145','W-SSC-146'];
const typedIds=['W02-IV2-144-03','W02-IV2-145-03','W02-IV2-146-03','W02-IV2-146-04'];
const num=(s)=>{const bits=String(s).split('/');return Number(bits[0])/Number(bits[1]||1)};
const expcount=x=>x?.source_expression_census?.statements?.length||0;
function validate(q){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)};
 const {oldG,G,oldS,S,oldD,D,oldR,R,oldC,C,I,O,F,N}=q,law=G?.current_lawful_state;
 const oldItems=oldS?.items||[],items=S?.items||[];
 const src=id=>items.find(x=>x.id===id),prior=id=>oldItems.find(x=>x.id===id),typed=id=>src(id)?.source_expression_census?.statements||[];
 const originalSourceIds=oldItems.map(x=>x.id);
 ok(S?.schema==='woit.source-semantic-census.v0.47'&&S?.census_item_count===151&&items.length===151&&S?.cross_author_semantics_available===false&&S?.closure_claims?.sealed===false,'current 151 W source identities and open state');
 ok(oldS?.schema==='woit.source-semantic-census.v0.46'&&oldItems.length===151&&S?.predecessor?.git_blob_sha===pins.oldS,'source0.46 actual parent');
 ok(same(items.map(x=>x.id),originalSourceIds),'no source ID added removed or reordered');
 ok(same(items.filter((x,i)=>!same(x,oldItems[i])).map(x=>x.id),owners),'only three source objects changed');
 ok(items.every((x,i)=>x.obligation===oldItems[i].obligation),'all 151 author source obligation strings byte-identical');
 ok(typed('W-SSC-144').length===3&&typed('W-SSC-145').length===3&&typed('W-SSC-146').length===4,'new typed source 3/3/4');
 ok(owners.every(id=>same(typed(id).slice(0,prior(id)?.source_expression_census?.statements?.length),prior(id)?.source_expression_census?.statements)),'all original source typed assertions exact prefix unchanged');
 const added=owners.flatMap(id=>typed(id).slice(prior(id)?.source_expression_census?.statements?.length||0));
 ok(same(added,O?.restored_typed_source_incidents)&&same(added.map(x=>x.id),typedIds),'four new source occurrences match source-first oracle exactly');
 const incidenceByUnit={};for(const x of items){const unit=x.source.match(/^W0(?:1|2|3|4[a-e]|5)/)?.[0];incidenceByUnit[unit]=(incidenceByUnit[unit]||0)+expcount(x)}
 ok(incidenceByUnit.W02===66&&incidenceByUnit.W05===106&&Object.values(incidenceByUnit).reduce((a,b)=>a+b,0)===404,'source typed totals W02 66 all 404');
 ok(S?.correction?.source_oracle?.git_blob_sha===pins.O&&S?.correction?.source_defect?.git_blob_sha===pins.F&&S?.correction?.source_negative?.git_blob_sha===pins.N&&S?.correction?.G0_frozen===false,'author provenance and no G0 freeze');
 ok(O?.schema==='isograph.exp062-w02-iv2-source-first-curvature-hodge-action.v0.1'&&O?.original_source?.version==='arXiv:2311.00608v2'&&same(O?.original_source?.source_html_lines,[110,122])&&same(O?.original_source?.pdf_indices,[5,6]),'original W02 PDF and HTML version scope');
 ok(O?.source_intervals?.length===6&&O?.restored_typed_source_incidents?.length===4&&O?.external_verification==='OWNER_BYPASSED_NOT_PASSED','six source-first intervals four source roles');
 if(O?.source_intervals?.length===6){for(let i=0;i<6;i++)ok(O.source_intervals[i]?.ordinal===i+1&&O.source_intervals[i]?.html_lines?.[0]===(i?O.source_intervals[i-1].html_lines[1]+1:110),'source-first continuous interval '+i);
  ok(O.source_intervals[5]?.html_lines?.[1]===122&&O.source_intervals[4]?.source_relation==='EQUIVALENT_FORM_USING_TOPOLOGICAL_INVARIANT','source terminal and mod-topology equivalence');}
 const a=added.find(x=>x.id===typedIds[0]),b=added.find(x=>x.id===typedIds[1]),c=added.find(x=>x.id===typedIds[2]),d=added.find(x=>x.id===typedIds[3]);
 ok(a?.premise==='FOUR_DIMENSIONS_AND_METRIC_INNER_PRODUCT'&&a?.map_role==='IDENTIFY_TWO_FORMS_WITH_INFINITESIMAL_SPIN4_TRANSFORMATIONS'&&a?.target==='Lie(Spin(4))'&&same(a?.chiral_role_pairs?.map(x=>x.star_eigenvalue),['+1','-1'])&&same(a?.chiral_role_pairs?.map(x=>x.target_algebra),['su(2)_R','su(2)_L']),'Lambda2 metric identification and ordered chiral sign');
 ok(b?.modality==='SOURCE_RIGHT_HANDED_GEOMETRY_INTERPRETIVE_INFERENCE_FROM_COMPLEX_SELF_DUAL_CARRIER'&&b?.premises?.length===3&&b?.source_conclusion==='THIS_PART_OF_FOUR_DIMENSIONAL_GEOMETRY_INVOLVES_ONLY_RIGHT_HANDED_FACTOR'&&b?.guard==='NOT_ALL_NONSELFDUAL_FIELD_DYNAMICS_ARE_SOURCE_PROVED_RIGHT_ONLY','complex RH local conclusion not global theorem');
 ok(c?.modality==='SOURCE_CURVATURE_TWO_SECTOR_DECOMPOSITION_AND_TOPOLOGICAL_EQUIVALENCE_DEPENDENCY'&&same(c?.components?.map(x=>x.symbol),['F_A^+','F_A^-'])&&same(c?.components?.map(x=>x.star_eigenvalue),['+1','-1'])&&c?.source_topological_assumption==='INTEGRAL_Tr(F_A_WEDGE_F_A)_IS_TOPOLOGICAL_INVARIANT'&&c?.relation==='SOURCE_EQUIVALENT_ACTION_FORM_DEPENDS_ON_TOPOLOGICAL_INVARIANCE_NOT_EXACT_ACTION_EQUALITY'&&c?.source_does_not_display_projection_formula===true,'F positive/negative and topology source scope, no fabricated projection');
 ok(d?.modality==='SOURCE_SPECIFIC_SELF_DUAL_ACTION_RIGHT_CHIRAL_GEOMETRY_CONCLUSION'&&d?.source_conclusion==='THIS_ACTION_ONLY_INVOLVES_SELF_DUAL_TWO_FORMS_AND_RIGHT_HANDED_SPACETIME_SPINOR_GEOMETRY'&&d?.scope==='THIS_SOURCE_EQUIVALENT_ACTION_FORM_NOT_ALL_YANG_MILLS_DYNAMICS_AS_SOURCE_PROVED_EQUATION','this action conditional source conclusion');
 const W118=typed('W-SSC-118'),W146=typed('W-SSC-146');
 ok(W118?.length===3&&W146?.length===4&&same(W118[0],W146[0])&&same(W118[1],W146[1]),'one original source displayed action duplicated across W118 and W146 not independent theorem');
 ok(W118[0]?.modality==='SOURCE_DISPLAYED_EXACT_EQUALITY_WITHIN_FIRST_ACTION'&&W118[0]?.rhs?.integrand?.operand?.right?.operand==='F(A)'&&W118[1]?.modality==='SOURCE_DISPLAYED_EQUIVALENT_ACTION_MOD_TOPOLOGICAL_TERM_NOT_EQUALITY','preserve source literal F(A), equality vs equivalence');
 ok(typed('W-SSC-144')[0]?.value==='+1'&&typed('W-SSC-144')[1]?.value==='-1'&&typed('W-SSC-144')[1]?.real_selfdual_forms_exist===false,'Euclidean and Minkowski Hodge star distinctly scoped');
 ok(F?.earliest_stage==='G0_SOURCE_ASSERTION_CONSERVATION'&&same(F?.four_source_incidence_ids,typedIds)&&F?.legacy_W144_W145_historical_classification==='CLOSED_SCHEMA'&&F?.current_W144_W145_source_membership_is_qualified===false,'source typed defect and unqualified historical closed schema');
 ok(N?.status==='NONAUTHOR_EXACT_LOCAL_WEDGE_COEFFICIENT_CONTROL_SOURCE_ACTION_EQUIVALENT_NOT_EXACT_EQUAL'&&N?.source?.arxiv==='2311.00608v2'&&N?.normalization?.gauge_coupling_squared===1&&N?.normalization?.single_commuting_internal_T_trace_square===1,'negative control source and only local algebra');
 ok(N?.cases?.length===5&&N?.normalization?.Hodge_star_on_relevant_twoforms?.e12==='e34'&&N?.normalization?.Hodge_star_on_relevant_twoforms?.e34==='e12','exact Hodge local sample basis');
 if(N?.cases?.length===5)for(let i=0;i<5;i++){const x=N.cases[i],u=x.a,v=x.b,S=(u*u+v*v)/4,Splus=(u+v)*(u+v)/4,D=(u*v)/2;
   ok(num(x.S)===S&&num(x.Splus)===Splus&&num(x.difference)===D&&num(x.topological)===D&&x.exact_equal===(S===Splus),'independent exact action Splus-S=1/4 FF local '+i)}
 ok(N?.epistemic?.not_author_source_equation===true&&N?.epistemic?.not_G1_theorem_authority===true&&N?.epistemic?.does_not_show?.includes('UNIVERSAL_GLOBAL_TOPOLOGICAL_INVARIANCE_WITHOUT_FIXED_BUNDLE_AND_BOUNDARY_GUARDS'),'negative is not global bundle theorem');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.31'&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD&&D?.items?.length===86,'historical W86 source tuple not complete');
 ok(same(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&same(D?.items?.filter((x,i)=>!same(x,oldD.items[i])).map(x=>x.census_id),owners),'other 83 W86 source memberships remain exact');
 ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.33'&&R?.rows?.length===151&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR,'151 register current source and historical W86');
 ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.32'&&C?.rows?.length===151&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC,'151 coverage current parent');
 ok(same(R?.rows?.filter((x,i)=>!same(x,oldR.rows[i])).map(x=>x.census_id),owners)&&same(C?.rows?.filter((x,i)=>!same(x,oldC.rows[i])).map(x=>x.census_id),owners),'other 148 all151 source records exact');
 if(items.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){const s=items[i],r=R.rows[i],cc=C.rows[i],num=expcount(s);ok(s.id===r.census_id&&s.id===cc.census_id&&r.source_body_exact===s.obligation&&cc.body_length_chars===s.obligation.length&&r.source_expression_statement_count===num&&cc.source_expression_statement_count===num&&r.historical_closure_accepted_as_current===false&&cc.stage_authority===false,'all151 source register coverage exact '+i);}
 if(D?.items?.length===86)for(let i=0;i<86;i++){const d=D.items[i],s=src(d.census_id);ok(d.track==='W'&&d.body===s?.obligation&&same(d.source_formula_incidences||[],s?.source_expression_census?.statements||[]),'historical86 exact source projection '+i)}
 ok(C?.by_unit?.W02?.source_expression_statements===66&&I?.source_census?.git_blob_sha===pins.S&&I?.summary?.structured_incidences===404&&I?.summary?.all_nine_original_source_reverse_exhaustive===false&&I?.units?.length===9,'independent source-by-unit current inventory');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.97'&&G?.track==='W'&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===pins.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.96','current gate predecessor lineage');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C,'gate 0.97 W source demand register coverage pins');
 ok(G?.current_W02_IV2_source_oracle?.git_blob_sha===pins.O&&G?.current_W02_IV2_typed_defect?.git_blob_sha===pins.F&&G?.current_W02_IV2_local_math_negative?.git_blob_sha===pins.N&&G?.current_W_nine_source_inventory_014?.git_blob_sha===pins.I,'four G0 source evidence pins');
 ok(G?.current_W02_IV2_source_verifier?.path===P.self&&G?.current_W02_IV2_source_verifier?.git_blob_sha===sha('self'),'current source verifier exact content self');
 ok(G?.verification_at_record_creation?.W02_IV2_NodeCI==='PENDING_CURRENT_W_SOURCE0_47_COMMIT'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','positive and external CI not preclaimed');
 ok(law?.G0_open===true&&law?.G0_complete===false&&law?.G0_frozen===false,'G0 still open unfrozen');
 for(const k of ['all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized','source_census_frozen'])ok(law?.[k]===false,'blocked stage '+k);
 return errors;
}
const errors=[];
for(const[k,expected]of Object.entries(pins))if(sha(k)!==expected)errors.push('Git blob input SHA mismatch '+k);
const positive=validate(input);errors.push(...positive.map(x=>'POSITIVE '+x));
const tests=[
 ['W01 unrelated source mutation',q=>q.S.items[0].obligation+='WRONG'],
 ['one source item removed',q=>q.S.items.pop()],
 ['W144 original author prose replaced',q=>q.S.items.find(x=>x.id==='W-SSC-144').obligation='CHANGED'],
 ['W145 source old expressions altered',q=>q.S.items.find(x=>x.id==='W-SSC-145').source_expression_census.statements[0].dimension.scalar=4],
 ['W146 new fourth expression removed',q=>q.S.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements.pop()],
 ['W144 new source record removed',q=>q.S.items.find(x=>x.id==='W-SSC-144').source_expression_census.statements.pop()],
 ['W145 new source record removed',q=>q.S.items.find(x=>x.id==='W-SSC-145').source_expression_census.statements.pop()],
 ['W144 chiral source sign flipped',q=>q.S.items.find(x=>x.id==='W-SSC-144').source_expression_census.statements[2].chiral_role_pairs[0].star_eigenvalue='-1'],
 ['W144 source right/left interchanged',q=>q.S.items.find(x=>x.id==='W-SSC-144').source_expression_census.statements[2].chiral_role_pairs[1].target_algebra='su(2)_R'],
 ['W144 metric inner product carrier dropped',q=>q.S.items.find(x=>x.id==='W-SSC-144').source_expression_census.statements[2].premise='NO_METRIC'],
 ['W145 RH conclusion globalized',q=>q.S.items.find(x=>x.id==='W-SSC-145').source_expression_census.statements[2].guard='ALL_DYNAMICS_RIGHT_ONLY_PROVED'],
 ['W145 RH source logic absent',q=>q.S.items.find(x=>x.id==='W-SSC-145').source_expression_census.statements[2].premises.pop()],
 ['W146 topological condition erased',q=>q.S.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements[2].source_topological_assumption='NONE'],
 ['W146 new decomposition Fminus lost',q=>q.S.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements[2].components.pop()],
 ['W146 selfdual and antiselfdual swapped',q=>q.S.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements[2].components[1].star_eigenvalue='+1'],
 ['W146 equivalent becomes equal',q=>q.S.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements[2].relation='EXACT_EQUALITY'],
 ['W146 source fictitious printed Fplus projection equation',q=>q.S.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements[2].source_does_not_display_projection_formula=false],
 ['W146 right only becomes all field dynamics',q=>q.S.items.find(x=>x.id==='W-SSC-146').source_expression_census.statements[3].scope='ALL_DYNAMICS_PROVED_RIGHT_ONLY'],
 ['duplicate W118 source no longer repeated W146',q=>q.S.items.find(x=>x.id==='W-SSC-118').source_expression_census.statements[0].lhs.op='NOT_EQUAL'],
 ['source source text F(A) normalized silently',q=>q.S.items.find(x=>x.id==='W-SSC-118').source_expression_census.statements[0].rhs.integrand.operand.right.operand='F_A'],
 ['source action rewritten exact equation',q=>q.S.items.find(x=>x.id==='W-SSC-118').source_expression_census.statements[1].modality='EXACT_EQUALITY'],
 ['Minkowski real selfdual claimed present',q=>q.S.items.find(x=>x.id==='W-SSC-144').source_expression_census.statements[1].real_selfdual_forms_exist=true],
 ['source first oracle citation version v1',q=>q.O.original_source.version='arXiv:2311.00608v1'],
 ['source first oracle one interval dropped',q=>q.O.source_intervals.pop()],
 ['source first oracle gap in intervals',q=>q.O.source_intervals[2].html_lines[0]=115],
 ['source first oracle topological equivalence becomes equality',q=>q.O.source_intervals[4].source_relation='EXACT_EQUAL'],
 ['source first oracle source count changed',q=>q.O.restored_typed_source_incidents.pop()],
 ['old source predecessor pin forged',q=>q.S.predecessor.git_blob_sha='STALE'],
 ['source oracle SHA forged',q=>q.S.correction.source_oracle.git_blob_sha='STALE'],
 ['source defect legacy closed schema qualified',q=>q.F.current_W144_W145_source_membership_is_qualified=true],
 ['source deficit typed IDs erased',q=>q.F.four_source_incidence_ids.pop()],
 ['local negative wrong starred e12',q=>q.N.normalization.Hodge_star_on_relevant_twoforms.e12='e12'],
 ['local negative gauge squared wrong',q=>q.N.normalization.gauge_coupling_squared=2],
 ['local math negative case a changed',q=>q.N.cases[0].a=4],
 ['local math negative case b sign flipped',q=>q.N.cases[1].b=3],
 ['local math false action S corrected',q=>q.N.cases[0].S='25/4'],
 ['local math false Splus corrected',q=>q.N.cases[0].Splus='13/4'],
 ['local math local difference sign flipped',q=>q.N.cases[1].difference='3'],
 ['local math claim exact equality',q=>q.N.cases[1].exact_equal=true],
 ['local math promoted global topology theorem',q=>q.N.epistemic.not_G1_theorem_authority=false],
 ['all 151 source register one row lost',q=>q.R.rows.pop()],
 ['register historical closed accepted',q=>q.R.rows.find(x=>x.census_id==='W-SSC-145').historical_closure_accepted_as_current=true],
 ['register W146 typed stale',q=>q.R.rows.find(x=>x.census_id==='W-SSC-146').source_expression_statement_count=2],
 ['coverage W144 source occurrence short',q=>q.C.rows.find(x=>x.census_id==='W-SSC-144').source_expression_statement_count=2],
 ['coverage old 62 W02 total',q=>q.C.by_unit.W02.source_expression_statements=62],
 ['86 view missing historical member',q=>q.D.items.pop()],
 ['86 view W145 expression missing',q=>q.D.items.find(x=>x.census_id==='W-SSC-145').source_formula_incidences.pop()],
 ['86 view invented source body',q=>q.D.items.find(x=>x.census_id==='W-SSC-146').body='INCORRECT'],
 ['current inventory claims all source exhaustive',q=>q.I.summary.all_nine_original_source_reverse_exhaustive=true],
 ['current inventory count stale',q=>q.I.summary.structured_incidences=400],
 ['source0.46 gate falsely current',q=>q.G.current_source_census.git_blob_sha=pins.oldS],
 ['gate old86 pin stale',q=>q.G.current_historical_86_member_projection.git_blob_sha=pins.oldD],
 ['gate register pin stale',q=>q.G.current_all_151_conservation_register.git_blob_sha=pins.oldR],
 ['gate own validator hash forged',q=>q.G.current_W02_IV2_source_verifier.git_blob_sha='BAD'],
 ['gate parent SHA swapped',q=>q.G.supersedes.git_blob_sha='BAD'],
 ['gate old source reverse falsely done',q=>q.G.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['G0 frozen',q=>q.G.current_lawful_state.G0_frozen=true],
 ['G1 authorized',q=>q.G.current_lawful_state.G1_authorized=true],
 ['G7 authorized',q=>q.G.current_lawful_state.G7_authorized=true],
 ['October3 mutable author bytes falsely verified',q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['cross track synthesis falsely authorized',q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true],
 ['external bypass falsely passed',q=>q.G.verification_at_record_creation.third_party='PASSED'],
 ['Node CI preclaimed success',q=>q.G.verification_at_record_creation.W02_IV2_NodeCI='SUCCESS']
];
const rejected=[],escaped=[],crashed=[];
for(const[name,modify]of tests){const q=copy(input),before=JSON.stringify(q);try{modify(q);if(JSON.stringify(q)===before)escaped.push(name+':no effect');else if(validate(q).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+': '+e.message)}}
errors.push(...escaped.map(s=>'ESCAPED '+s),...crashed.map(s=>'CRASH '+s));
console.log(JSON.stringify({suite:'W02 IV.2 original source Hodge Yang-Mills conditional action G0 0.1',pass:errors.length===0,positive_errors:positive,errors,hostile_controls:tests.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,W_source_items:151,W_source_incidents:404,W02_incidents:66,historical_W86_incomplete:true,source_bodies_changed:0,source_gate:'G0_OPEN_UNFROZEN'}));
if(errors.length)process.exitCode=1;
