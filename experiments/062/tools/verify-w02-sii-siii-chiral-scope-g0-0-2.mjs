import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_44.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_45.json","oldD":"experiments/062/W_G0_W05_INTRO_SOURCE_DEMAND_PROJECTION_0_28.json","D":"experiments/062/W_G0_W02_II_III_SOURCE_DEMAND_PROJECTION_0_29.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_30.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_31.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_29.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_30.json","oldU":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_11.json","U":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_12.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_93.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_94.json","O":"experiments/062/W02_G0_SII_SIII_SOURCE_FIRST_0_1.json","def":"experiments/062/W02_G0_SII_SIII_TYPED_SOURCE_DEFECT_0_1.json","neg":"experiments/062/W02_G0_SII_SIII_SU2_SL2C_INTERTWINER_NEGATIVE_0_1.json","self":"experiments/062/tools/verify-w02-sii-siii-chiral-scope-g0-0-2.mjs","failure":"experiments/062/W02_G0_SII_SIII_VERIFIER_0_1_PREPUB_POSITIVE_FAILURE_0_1.json"};
const pins={"oldS":"99d5e463b4ea242651db7ac457fae3052aaa5bd5","S":"fa113859790cc0b13066bfd013c564cc6d3e72f8","oldD":"6d65c5388310ca3969b25e3489fdd5377c89f757","D":"c299df0b7f1376d327cf538da4eb42c4278f56cd","oldR":"b3452e42091b316c5eddb465517582ac40c133d4","R":"01e0c2b2801393fac6670301c66239b273f9573e","oldC":"eb62059dd96a7f250ead447dedf3514e3f4d5772","C":"7f594cee7c36ddd5acb29a30fa52f3cb00d2aec6","oldU":"771908f673a29854b9a0eb02157b8438754412d3","U":"60d662cd35f795f20011fb5ff409448a6671fefc","oldG":"8cb1c87e1838b726b600a745bb128b654df4d7a5","O":"f40e4c6e660e11b205e84461899be308d3315ab8","def":"02c44af0a8410bfe8681fe0e2009ce75cf6b1fa2","neg":"535bb81239b27b8f44b31f7a41dce5a7425d5186","failure":"ef7d11227190d0e6b484d9166c912fbadd644dc0"};
const load=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const same=(x,y)=>JSON.stringify(x)===JSON.stringify(y),cp=x=>JSON.parse(JSON.stringify(x));
const a=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,load(k)]));
const ids=['W-SSC-131','W-SSC-132','W-SSC-133','W-SSC-134','W-SSC-138'];
const hids=['W-SSC-133','W-SSC-134','W-SSC-138'];
const outids=['W-SSC-131','W-SSC-132'];
const newIds=['W02-131-03','W02-131-04','W02-132-01','W02-132-02','W02-132-03','W02-133-01','W02-133-02','W02-133-03','W02-134-01','W02-134-02','W02-138-01','W02-138-02'];
const within=(a,b)=>Math.abs(a-b)<1e-9;
const complex=x=>{if(typeof x==='number')return [x,0];if(typeof x==='string'){const y=x.split('/').map(Number);return [y[0]/(y[1]||1),0]}return[x?.re,x?.im]};
const plus=(x,y)=>[x[0]+y[0],x[1]+y[1]];
const mult=(x,y)=>[x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]];
const conj=x=>[x[0],-x[1]];
const mat=arr=>arr.map(row=>row.map(complex));
const dot=(a,b)=>a.map((row,i)=>row.map((_,j)=>mult(row[0],b[0][j]).map((v,k)=>v+mult(row[1],b[1][j])[k])));
const cmat=a=>a.map(row=>row.map(conj));
const adj=a=>[[conj(a[0][0]),conj(a[1][0])],[conj(a[0][1]),conj(a[1][1])]];
const matEq=(a,b)=>a.every((row,i)=>row.every((z,j)=>z.every((v,k)=>within(v,b[i][j][k]))));
const I2=[[[1,0],[0,0]],[[0,0],[1,0]]];
function check(q){
 const errors=[],ok=(x,what)=>{if(!x)errors.push(what)};
 const {S,oldS,D,oldD,R,oldR,C,oldC,U,oldU,G,oldG,O,def,neg,failure}=q;
 ok(S?.schema==='woit.source-semantic-census.v0.45'&&S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false,'source0.45 unqualified census 151');
 ok(oldS?.schema==='woit.source-semantic-census.v0.44'&&oldS?.items?.length===151,'predecessor SSC exact');
 ok(S?.predecessor?.git_blob_sha===pins.oldS&&S?.correction?.source_oracle?.git_blob_sha===pins.O&&S?.correction?.source_defect?.git_blob_sha===pins.def&&S?.correction?.independent_non_author_math?.git_blob_sha===pins.neg,'source SCC lineage and thirdparty math typed');
 ok(same(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&same(S?.items?.filter((x,i)=>!same(x,oldS.items[i])).map(x=>x.id),ids),'only 5 owners changed and all other146 byte-identical');
 ok(same(S?.items?.filter((x,i)=>x.obligation!==oldS.items[i].obligation).map(x=>x.id),ids.slice(0,3)),'only three original prose bodies extended');
 ok(S?.correction?.G0_frozen===false&&S?.correction?.G1_G7_authorized===false&&S?.cross_author_semantics_available===false,'no unlawful SSC promotion');
 ok(O?.schema==='isograph.exp062-w02-sectionsII-III-source-first-reverse.v0.1'&&O?.original_source?.frozen_revision==='arXiv:2311.00608v2'&&same(O?.original_source?.source_first_HTML_interval,[63,81])&&same(O?.original_source?.pdf_page_indices,[2,3,4])&&O?.method?.original_author_text_first===true,'original source-first W02 2-3');
 ok(O?.source_first_rows?.length===10&&O?.restored_source_incidents?.length===12&&same(O?.restored_existing_ids,ids),'source 10 intervals and five owner ids');
 if(O?.source_first_rows?.length===10){for(let i=0;i<10;i++)ok(O.source_first_rows[i]?.ordinal===i+1&&O.source_first_rows[i]?.html_line_first===(i===0?63:O.source_first_rows[i-1].html_line_last+1),'W02 original line span '+i);ok(O.source_first_rows[9]?.html_line_last===81&&same(O.source_first_rows.flatMap(x=>x.restored_claim_ids),newIds),'source interval end and 12 source claim coverage')}
 ok(O?.method?.all_original_nine_source_reverse_qualified===false&&O?.successor_expectation?.typed_incidences===391&&O?.provenance?.priority==='NO_GLOBAL_PRIORITY_ASSERTION','source method and no priority theorem');
 const claims=O?.restored_source_incidents||[],byID=id=>claims.find(x=>x.id===id),byItem=id=>S?.items?.find(x=>x.id===id),byOld=id=>oldS?.items?.find(x=>x.id===id);
 ok(same(claims.map(x=>x.id),newIds),'twelve canonical source claim identifiers');
 for(const id of ids){const n=claims.filter(x=>x.owner===id),s=byItem(id),old=byOld(id);
  ok(s?.obligation?.startsWith(old?.obligation||'MISSING')&&s?.source===old?.source&&s?.state===old?.state,'source body and state preserved '+id);
  ok(s?.source_expression_census?.statements?.length===(old?.source_expression_census?.statements?.length||0)+n.length&&same(s?.source_expression_census?.statements?.slice(-n.length),n),'new source exact typed incidence owner '+id);
  if(old?.source_expression_census?.statements?.length)ok(same(s?.source_expression_census?.statements?.slice(0,old.source_expression_census.statements.length),old.source_expression_census.statements),'old typed expressions unchanged '+id);
 }
 ok(byID('W02-131-03')?.original_epistemic_qualifier==='DOES_NOT_SEEM_TO_HAVE_BEEN_PREVIOUSLY_CONSIDERED'&&byID('W02-131-03')?.nonclaims?.includes('NOT_A_GLOBAL_NOVELTY_PRIOR_ART_FINDING'),'author limited apparent novelty not world priority');
 ok(byID('W02-131-04')?.source_chosen_factor==='SL(2,C)_R'&&byID('W02-131-04')?.source_wording==='ONE_OF_TWO_FACTORS_EG_RIGHT_HANDED'&&byID('W02-131-04')?.comparison==='NOT_CHIRALLY_SYMMETRIC_ADJOINT_PAIRS','chosen right factor eg not unique group law');
 ok(byID('W02-132-01')?.scope==='ONLY_REAL_LORENTZ_GROUP'&&byID('W02-132-01')?.not_comparison==='COMPLETE_COMPLEX_HOLOMORPHIC_DESCRIPTION_EQUIVALENCE','real subgroup agreement only');
 ok(byID('W02-132-02')?.losses?.length===2&&byID('W02-132-02')?.losses?.includes('SL(2,C)_L_ACTION_ON_ALTERNATIVE_COMPLEX_SPACETIME')&&byID('W02-132-02')?.quantifier_scope==='PROPOSED_RIGHT_HANDED_DESCRIPTION_ONLY','full complex group continuation lost');
 ok(byID('W02-132-03')?.retained_complex_spacetime===true&&same(byID('W02-132-03')?.real_subspaces,['MINKOWSKI','EUCLIDEAN'])&&byID('W02-132-03')?.contrast_with==='LOST_HOLOMORPHIC_COMPLEX_GROUP_CONTINUATION','coordinate continuation retained');
 ok(byID('W02-133-01')?.right_spinor_subspace==='C2_R_SUBSPACE_OF_C4'&&byID('W02-133-01')?.left_spinor==='C4_QUOTIENT_BY_C2_R'&&byID('W02-133-01')?.source_citation==='[3]','conventional twistor point subspace and quotient');
 ok(byID('W02-133-02')?.standard_tangent_bundle==='CHIRALLY_SYMMETRIC_HOLOMORPHIC_TENSOR_OF_TWO_SPINOR_KINDS'&&byID('W02-133-02')?.spinor_bundle_roles?.length===2,'standard holomorphic spinor tensor tangent contrast');
 ok(byID('W02-133-03')?.proposed_roles?.includes('TANGENT_BUNDLE_CHIRALLY_ASYMMETRIC_AND_PURELY_RIGHT_HANDED')&&byID('W02-133-03')?.epistemic==='AUTHOR_EXPLICIT_PROPOSAL_NOT_CONSTRUCTED_BUNDLE_ISOMORPHISM','proposed tangent geometry not established');
 ok(byID('W02-134-01')?.restriction==='x0_PURE_IMAGINARY_IN_EUCLIDEAN_REAL_SUBSPACE'&&byID('W02-134-01')?.left_action==='TRIVIAL'&&byID('W02-134-01')?.right_action==='NONTRIVIAL','SU2L trivial ONLY in proposed Euclidean restriction');
 ok(byID('W02-134-02')?.equivalence_scope==='RESTRICTED_SU(2)_R_ONLY'&&byID('W02-134-02')?.negative?.includes('NOT_AN_EQUIVARIANCE_ISOMORPHISM_FOR_ENTIRE_COMPLEX_SL2C_R'),'compact subgroup conjugate equivalence NOT SL2C');
 ok(byID('W02-138-01')?.premises?.includes('CHOICE_OF_NONZERO_VECTOR_IN_IMAGINARY_TIME_DIRECTION')&&byID('W02-138-01')?.negative?.includes('NOT_CANONICAL_WITHOUT_SELECTED_VECTOR'),'imaginary time nonzero choice guard');
 ok(same(byID('W02-138-02')?.translation,['CHIRALLY_ASYMMETRIC_TO_CHIRALLY_SYMMETRIC','CHIRALLY_SYMMETRIC_TO_CHIRALLY_ASYMMETRIC'])&&byID('W02-138-02')?.depends_on==='W02-138-01_SELECTED_NONZERO_VECTOR_ISOMORPHISM','bidirectional conditional on chosen vector');
 ok(def?.earliest_affected_stage==='G0_SOURCE_ASSERTION_CONSERVATION'&&same(def?.new_typed_ids,newIds)&&def?.historically_closed_schema_affected_items?.includes('W-SSC-131')&&def?.historically_closed_schema_affected_items?.includes('W-SSC-138'),'defect exact historical false closures');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.29'&&D?.items?.length===86&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD,'historical W86 limited to 86 current target pin');
 ok(same(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&same(D?.items?.filter((x,i)=>!same(x,oldD.items[i])).map(x=>x.census_id),hids),'old86 other 83 exactly identical');
 ok(hids.every(id=>D?.items?.find(x=>x.census_id===id))&&outids.every(id=>!D?.items?.some(x=>x.census_id===id)),'3 in86, two historical exclusions');
 ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.31'&&R?.rows?.length===151&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR,'all151 provenance register and predecessor');
 ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.30'&&C?.rows?.length===151&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC,'full151 coverage source pin');
 const unitCounts={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){for(let i=0;i<151;i++){const s=S.items[i],r=R.rows[i],c=C.rows[i],nc=s.source_expression_census?.statements?.length||0,unit=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(s.source)?.[0];unitCounts[unit]=(unitCounts[unit]||0)+nc;
  ok(r?.census_id===s.id&&r?.source_body_exact===s.obligation&&r?.source_expression_statement_count===nc&&r?.historical_closure_accepted_as_current===false&&c?.census_id===s.id&&c?.body_length_chars===s.obligation.length&&c?.source_expression_statement_count===nc&&c?.stage_authority===false,'151 source exact body and typed counts '+i);
 }}
 if(D?.items?.length===86){for(let i=0;i<86;i++){const d=D.items[i],s=S.items.find(x=>x.id===d.census_id);ok(d?.track==='W'&&d?.body===s?.obligation&&same(d?.source_formula_incidences||[],s?.source_expression_census?.statements||[]),'historical 86 source exact '+i)}}
 ok(unitCounts.W02===53&&unitCounts.W05===106&&Object.values(unitCounts).reduce((n,x)=>n+x,0)===391&&same(unitCounts,R?.counts?.current_source_expression_units)&&Object.entries(unitCounts).every(([unit,n])=>C?.by_unit?.[unit]?.source_expression_statements===n),'source unit totals W02 53 W05 106 all 391');
 ok(U?.schema==='isograph.exp062-w-g0-source-unit-current-inventory.v0.12'&&U?.source_census?.git_blob_sha===pins.S&&U?.historical_parent?.git_blob_sha===pins.oldU&&U?.summary?.structured_incidences===391&&U?.summary?.other146_items_unchanged===true&&U?.summary?.all_nine_original_source_reverse_exhaustive===false,'nine unit summary no false exhaustiveness');
 ok(neg?.schema==='isograph.exp062-w02-right-spinor-conjugate-compact-bridge-negative.v0.1'&&neg?.source_scope?.source_item_ids?.length===3&&neg?.not_new_source_claim===true,'independent negative not source theorem');
 const ep=neg?.epsilon_matrix,epi=neg?.epsilon_inverse;ok(same(ep,[[0,1],[-1,0]])&&same(epi,[[0,-1],[1,0]]),'standard epsilon exact');
 if(ep&&epi&&neg?.compact_subgroup?.test_matrix&&neg?.counterexample_outside_compact?.test_matrix){const eps=mat(ep),ei=mat(epi),g=mat(neg.compact_subgroup.test_matrix),z=mat(neg.counterexample_outside_compact.test_matrix),compact=dot(dot(eps,cmat(g)),ei),noncompact=dot(dot(eps,cmat(z)),ei);const det=m=>plus(mult(m[0][0],m[1][1]),mult([-1,0],mult(m[0][1],m[1][0])));
 ok(matEq(compact,g)&&matEq(dot(g,adj(g)),I2)&&within(det(g)[0],1)&&within(det(g)[1],0),'SU2 compact conjugate representation intertwiner and unitary');
 ok(!matEq(noncompact,z)&&matEq(noncompact,mat(neg.counterexample_outside_compact.conjugated_by_epsilon))&&within(det(z)[0],1)&&within(det(z)[1],0),'complex SL2 noncompact diagonal fails same epsilon intertwiner');
 ok(neg?.counterexample_outside_compact?.same_as_g===false&&neg?.compact_subgroup?.scope?.startsWith('FOR_SU2'),'compact only not all complex group');
 }
 ok(G?.current_W02_II_III_prepublication_v01_failure?.git_blob_sha===pins.failure&&G?.current_W02_II_III_prepublication_v01_failure?.positive_baseline_pass===false,'first prepublication failure preserved as unqualified');
 ok(failure?.schema==='isograph.exp062-w02-II-III-prepublication-v8-positive-failure.v0.1'&&failure?.first_candidate?.result?.positive_baseline_pass===false&&failure?.first_candidate?.result?.mutations_total===55&&failure?.first_candidate?.result?.mutations_rejected===55&&failure?.first_candidate?.result?.mutation_score_qualified===false,'55 old mutants not qualified by failed positive');
 ok(failure?.actual_defect?.source_artifacts_not_defective===true&&failure?.actual_defect?.expected_repair_version==='verify-w02-sii-siii-chiral-scope-g0-0-2.mjs'&&failure?.first_candidate?.result?.positive_errors?.length===2,'correct v02 mathematical fixture failure provenance');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.94'&&G?.semantic_authority===false&&G?.track==='W'&&G?.supersedes?.git_blob_sha===pins.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.93','gate0.94 lineage G0');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D,'new exact all151 and historical source tuple pins');
 ok(G?.current_W02_II_III_source_first?.git_blob_sha===pins.O&&G?.current_W02_II_III_typed_defect?.git_blob_sha===pins.def&&G?.current_W02_II_III_compact_negative?.git_blob_sha===pins.neg&&G?.current_W_nine_source_inventory?.git_blob_sha===pins.U,'G0 gate original math and inventory source evidence');
 ok(G?.current_W02_II_III_verifier?.path===P.self&&G?.current_W02_II_III_verifier?.git_blob_sha===sha('self'),'self-current verifier pin');
 ok(G?.verification_at_record_creation?.W02_II_III_NodeCI==='PENDING_GITHUB_CURRENT_COMMIT'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','Node not preclaimed and external bypass');
 const st=G?.current_lawful_state;ok(st?.G0_open===true,'G0 OPEN');
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[key]===false,'false unlawful stage '+key);
 return errors;
}
const errors=[];for(const[k,p]of Object.entries(pins))if(sha(k)!==p)errors.push('git blob pin mismatch '+k);
const positive=check(a);errors.push(...positive.map(x=>'POSITIVE '+x));
const mutant=[
 ['prepublication v01 failure incorrectly marked qualified',x=>x.failure.first_candidate.result.mutation_score_qualified=true],
 ['prepublication v01 positive error erased',x=>x.failure.first_candidate.result.positive_errors.pop()],
 ['prepublication failure source pin forged',x=>x.G.current_W02_II_III_prepublication_v01_failure.git_blob_sha='BAD'],
 ['source records now150',x=>x.S.items.pop()],
 ['source unrelated W05 changes',x=>x.S.items.find(y=>y.id==='W-SSC-104').obligation+=' BAD'],
 ['W131 source body changed',x=>x.S.items.find(y=>y.id==='W-SSC-131').obligation='BAD'],
 ['W131 novelty universalized',x=>x.O.restored_source_incidents[0].original_epistemic_qualifier='NO_PREVIOUS_WORK_EXISTED'],
 ['W131 chosen factor no longer eg',x=>x.O.restored_source_incidents[1].source_wording='UNIQUE_RIGHT_FACTORIZATION'],
 ['W131 old formula damaged',x=>x.S.items.find(y=>y.id==='W-SSC-131').source_expression_census.statements[0].left='(1/2)_L'],
 ['W132 real only loses binder',x=>x.O.restored_source_incidents[2].scope='ALL_COMPLEX_LORENTZ'],
 ['W132 real subgroup compared to complex',x=>x.O.restored_source_incidents[2].not_comparison='HOL_EQUIVALENT'],
 ['W132 lost full complex group flag',x=>x.O.restored_source_incidents[3].losses.pop()],
 ['W132 left SL2C acts',x=>x.O.restored_source_incidents[3].losses[0]='SL2C_L_ACTS'],
 ['W132 retained coordinate continuation erased',x=>x.O.restored_source_incidents[4].retained_complex_spacetime=false],
 ['W132 Minkowski and Euclidean roles swapped',x=>x.O.restored_source_incidents[4].real_subspaces.reverse()],
 ['W133 point C2 right forgotten',x=>x.O.restored_source_incidents[5].right_spinor_subspace='C2_L_SUBSPACE'],
 ['W133 left quotient changed',x=>x.O.restored_source_incidents[5].left_spinor='C4_RIGHT_TENSOR'],
 ['W133 Penrose reference erased',x=>x.O.restored_source_incidents[5].source_citation='[9]'],
 ['W133 conventional tangent falsely right-only',x=>x.O.restored_source_incidents[6].standard_tangent_bundle='RIGHT_ONLY'],
 ['W133 conventional spinor holomorphic omitted',x=>x.O.restored_source_incidents[6].spinor_bundle_roles.pop()],
 ['W133 proposal to established theorem',x=>x.O.restored_source_incidents[7].epistemic='PROVED'],
 ['W133 right-only tangent omitted',x=>x.O.restored_source_incidents[7].proposed_roles.pop()],
 ['W134 SU2L action nontrivial',x=>x.O.restored_source_incidents[8].left_action='NONTRIVIAL'],
 ['W134 Euclidean restriction lost',x=>x.O.restored_source_incidents[8].restriction='ALL_MINKOWSKI'],
 ['W134 conjugate equivalence universalized',x=>x.O.restored_source_incidents[9].equivalence_scope='SL2C_ALL'],
 ['W134 compact only negative removed',x=>x.O.restored_source_incidents[9].negative=[]],
 ['W138 zero vector allowed',x=>x.O.restored_source_incidents[10].premises[1]='ZERO_VECTOR'],
 ['W138 canonical isomorphism falsely',x=>x.O.restored_source_incidents[10].negative=[]],
 ['W138 reverse description dropped',x=>x.O.restored_source_incidents[11].translation.pop()],
 ['W138 dependence erased',x=>x.O.restored_source_incidents[11].depends_on='NONE'],
 ['source assertion list missing one',x=>x.S.items.find(y=>y.id==='W-SSC-132').source_expression_census.statements.pop()],
 ['historical W86 excluded W131 inserted',x=>x.D.items.push({census_id:'W-SSC-131'})],
 ['historical W86 affected W133 body wrong',x=>x.D.items.find(y=>y.census_id==='W-SSC-133').body='INVALID'],
 ['historical other83 edited',x=>x.D.items[0].body='BAD'],
 ['register W132 body wrong',x=>x.R.rows[131].source_body_exact='WRONG'],
 ['coverage W138 typed count stale',x=>x.C.rows[137].source_expression_statement_count=0],
 ['W02 total stale41',x=>x.C.by_unit.W02.source_expression_statements=41],
 ['W05 total falsely increased',x=>x.R.counts.current_source_expression_units.W05=107],
 ['nine source inventory false exhaustive',x=>x.U.summary.all_nine_original_source_reverse_exhaustive=true],
 ['source HTML interval gap',x=>x.O.source_first_rows[4].html_line_first=71],
 ['source original v1 substituted',x=>x.O.original_source.frozen_revision='arXiv:2311.00608v1'],
 ['new source ids order changed',x=>x.O.restored_source_incidents.reverse()],
 ['source first origin no longer primary',x=>x.O.method.original_author_text_first=false],
 ['math epsilon matrix reversed',x=>x.neg.epsilon_matrix[0][1]=-1],
 ['math SU2 test nonunitary',x=>x.neg.compact_subgroup.test_matrix[0][0].re=2],
 ['math noncompact test becomes identity',x=>x.neg.counterexample_outside_compact.test_matrix=[['1','0'],['0','1']]],
 ['math noncompact falsely equal',x=>x.neg.counterexample_outside_compact.same_as_g=true],
 ['math noncompact conjugated epsilon matrix stale',x=>x.neg.counterexample_outside_compact.conjugated_by_epsilon[0][0]='2'],
 ['historical closed schema current qualification forged',x=>x.R.rows[130].historical_closure_accepted_as_current=true],
 ['current source pin stale',x=>x.G.current_source_census.git_blob_sha=pins.oldS],
 ['gate verifier pin forged',x=>x.G.current_W02_II_III_verifier.git_blob_sha='BAD'],
 ['gate source oracle pin forged',x=>x.G.current_W02_II_III_source_first.git_blob_sha='BAD'],
 ['gate parent lineage wrong',x=>x.G.supersedes.git_blob_sha='BAD'],
 ['stage G0 marked complete',x=>x.G.current_lawful_state.G0_complete=true],
 ['stage G1 authorized',x=>x.G.current_lawful_state.G1_authorized=true],
 ['source mutable bytes falsely verified',x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['cross track synthesis enabled',x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true],
 ['third party falsely passed',x=>x.G.verification_at_record_creation.third_party='PASSED']
];
const rejected=[],escaped=[],crashed=[];
for(const [name,fn] of mutant){const q=cp(a),before=JSON.stringify(q);try{fn(q);if(before===JSON.stringify(q))escaped.push(name+':NO_EFFECT');else if(check(q).length)rejected.push(name);else escaped.push(name)}catch(err){crashed.push(name+':'+err.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W02 §II–III exact original-right-spinor scope source G0 0.2',pass:errors.length===0,positive_errors:positive,errors,source_items:151,source_incidents:391,W02_incidents:53,changed_W_items:5,historical86_selected:86,historical_member_changed:3,historical_excluded_changed:2,hostile_controls:mutant.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,stage:'G0_OPEN_UNFROZEN',external:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
