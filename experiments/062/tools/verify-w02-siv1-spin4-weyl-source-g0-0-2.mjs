import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_45.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_46.json","oldD":"experiments/062/W_G0_W02_II_III_SOURCE_DEMAND_PROJECTION_0_29.json","D":"experiments/062/W_G0_W02_IV1_SOURCE_DEMAND_PROJECTION_0_30.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_31.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_32.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_30.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_31.json","oldU":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_12.json","U":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_13.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_94.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_95.json","O":"experiments/062/W02_G0_SIV1_WEYL_SOURCE_FIRST_0_1.json","def":"experiments/062/W02_G0_SIV1_TYPED_SOURCE_DEFECT_0_1.json","neg":"experiments/062/W02_G0_SIV1_SPIN4_CENTER_NEGATIVE_0_1.json","priorCI":"experiments/062/W02_G0_SII_SIII_NODE_CI_RESULT_0_1.json","self":"experiments/062/tools/verify-w02-siv1-spin4-weyl-source-g0-0-2.mjs","failure":"experiments/062/W02_G0_SIV1_VERIFIER_0_1_PREPUB_HOSTILE_ESCAPE_0_1.json"};
const pins={"oldS":"fa113859790cc0b13066bfd013c564cc6d3e72f8","S":"853a0e30b6ed659d177e2129bcb06be74987b532","oldD":"c299df0b7f1376d327cf538da4eb42c4278f56cd","D":"bdfc7da9a730bc342f26251835497f45ffaac713","oldR":"01e0c2b2801393fac6670301c66239b273f9573e","R":"430cc1915b01dc8acf1c8616c4a86e6fd05ba358","oldC":"7f594cee7c36ddd5acb29a30fa52f3cb00d2aec6","C":"f640bff6de0a095a9193b95195dbd46d5fd1b9a6","oldU":"60d662cd35f795f20011fb5ff409448a6671fefc","U":"61208e7de20d7c8be6df88b11d64f2edc2ce1cf4","oldG":"214ed27d37cc83c6ba8b62c56692ca83cdea805c","O":"22ab437f7167d20519e2162d5d3d56a34bcf04bc","def":"324ffd6532fc076e574ae7be723277e84c8c6d1a","neg":"4fab5235ce1e87db534df2798ea6e4f4814530ca","priorCI":"7c87cc67b1c227ffe2e357a5b485fad30a4ce757","failure":"3a0549685f63ac37864ec54c0117ca7838692017"};
const load=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const same=(x,y)=>JSON.stringify(x)===JSON.stringify(y),copy=x=>JSON.parse(JSON.stringify(x));
const input=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,load(k)]));
const ids=['W-SSC-139','W-SSC-141','W-SSC-142','W-SSC-143'],out=['W-SSC-139','W-SSC-141','W-SSC-143'],sel=['W-SSC-142'];
const claimIDs=['W02-139-01','W02-139-02','W02-141-01','W02-141-02','W02-141-03','W02-141-04','W02-142-02','W02-143-01','W02-143-02'];
const apply=(A,v)=>A.map(row=>row.reduce((a,x,i)=>a+x*v[i],0)),equalVector=(a,b)=>same(a,b);
function validate(q){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)};
 const {oldS,S,oldD,D,oldR,R,oldC,C,oldU,U,oldG,G,O,def,neg,priorCI,failure}=q;
 const claim=id=>O?.restored_source_incidents?.find(x=>x.id===id);
 const item=id=>S?.items?.find(x=>x.id===id),oldItem=id=>oldS?.items?.find(x=>x.id===id);
 ok(oldS?.schema==='woit.source-semantic-census.v0.45'&&oldS?.items?.length===151&&S?.schema==='woit.source-semantic-census.v0.46'&&S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false,'old SSC0.45 and current SSC0.46 151 unfrozen');
 ok(S?.predecessor?.git_blob_sha===pins.oldS&&S?.correction?.source_oracle?.git_blob_sha===pins.O&&S?.correction?.source_defect?.git_blob_sha===pins.def&&S?.correction?.non_author_math?.git_blob_sha===pins.neg&&S?.correction?.prior_narrow_CI?.git_blob_sha===pins.priorCI,'current W source and previous CI exact provenance');
 ok(same(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&same(S?.items?.filter((x,i)=>!same(x,oldS.items[i])).map(x=>x.id),ids)&&same(S?.items?.filter((x,i)=>x.obligation!==oldS.items[i].obligation).map(x=>x.id),['W-SSC-139','W-SSC-143']),'only four source objects, other147 byte-identical; two prose appended');
 ok(O?.schema==='isograph.exp062-w02-SIV1-weyl-source-first-reverse.v0.1'&&O?.original?.frozen_revision==='arXiv:2311.00608v2'&&same(O?.original?.HTML,[84,109])&&same(O?.original?.PDF_indices,[4,5])&&O?.source_first_rows?.length===9&&O?.restored_source_incidents?.length===9,'original source first all §IV1 intervals and nine instances');
 if(O?.source_first_rows?.length===9){for(let i=0;i<9;i++)ok(O.source_first_rows[i].ordinal===i+1&&O.source_first_rows[i].html_first===(i?O.source_first_rows[i-1].html_last+1:84),'original source line coverage '+i);ok(O.source_first_rows[8].html_last===109&&same(O.source_first_rows.flatMap(x=>x.restored_ids),claimIDs),'original scoped reverse contiguous no omitted typed IDs')}
 ok(same(O?.restored_source_incidents?.map(x=>x.id),claimIDs)&&same(O?.source_owner_ids,ids)&&O?.epistemic?.G0_complete===false&&O?.epistemic?.complete_9_original_reverse===false,'scoped source not full W original or stage');
 for(const id of ids){const s=item(id),old=oldItem(id),newClaims=O?.restored_source_incidents?.filter(x=>x.owner===id);
  ok(s?.source===old?.source&&s?.state===old?.state&&s?.obligation?.startsWith(old?.obligation||'ABSENT'),'original body/source/state preserved '+id);
  ok(s?.source_expression_census?.statements?.length===(old?.source_expression_census?.statements?.length||0)+newClaims.length&&same(s?.source_expression_census?.statements?.slice(-newClaims.length),newClaims),'new exact source typed owner '+id);
  if(old?.source_expression_census?.statements?.length)ok(same(s?.source_expression_census?.statements?.slice(0,old.source_expression_census.statements.length),old.source_expression_census.statements),'previous typed source statements intact '+id);
 }
 ok(claim('W02-139-01')?.exception==='HIGGS_FIELD'&&claim('W02-139-01')?.role==='AUTHOR_REPORT_NOT_COMPLETE_QFT_OR_EMPIRICAL_THEOREM'&&claim('W02-139-01')?.setting==='FOUR_DIMENSIONAL_EUCLIDEAN_SPACETIME','source Higgs negative explicit');
 ok(claim('W02-139-02')?.new_in_this_paper==='CHIRAL_SPINOR_FIELD_DESCRIPTION'&&same(claim('W02-139-02')?.prior_known_reported,['GAUGE_FIELD_RIGHT_HANDED_FORMULATION','GRAVITATIONAL_FIELD_RIGHT_HANDED_FORMULATION']),'new spinor vs reported existing gauge/gravity');
 ok(claim('W02-141-01')?.single_euclidean_spinor==='RIGHT_HANDED_ONLY'&&claim('W02-141-01')?.cited_reference==='[9]'&&claim('W02-141-01')?.cited_page===226&&claim('W02-141-01')?.result==='NO_EXPECTED_INVARIANT_EUCLIDEAN_LAGRANGIAN','source conventional scoped invariant action negative');
 ok(claim('W02-141-02')?.source_conventional_group==='Spin(4)'&&same(claim('W02-141-02')?.required_fields,['RIGHT_EUCLIDEAN_CHIRALITY','LEFT_EUCLIDEAN_CHIRALITY'])&&claim('W02-141-02')?.obstruction==='NO_EXPECTED_SPIN4_EQUIVARIANT_EUCLIDEAN_SPINOR_PROPAGATOR_WITH_RIGHT_ONLY','Spin4 propagator both Euclidean chirality');
 ok(claim('W02-141-03')?.reference==='[10]'&&claim('W02-141-03')?.condition==='EVEN_WHEN_BOTH_EUCLIDEAN_CHIRALITIES_INTRODUCED'&&claim('W02-141-03')?.epistemic_role==='AUTHOR_CITED_CONTEXT_NOT_PROVEN_UNIVERSAL_DOUBLING_FOR_ALL_FORMALISMS','additional doubling cited not universal');
 ok(claim('W02-141-04')?.proposal==='SPACETIME_INVOLVING_ONLY_RIGHT_HANDED_SPINOR_GEOMETRY'&&claim('W02-141-04')?.epistemic_role==='W02_AUTHOR_PROPOSAL_NOT_CONSTRUCTED_STANDARD_MODEL_QFT','alternative proposal not QFT theorem');
 ok(claim('W02-142-02')?.source_operator_ref==='W02-G0-WICK-01'&&claim('W02-142-02')?.right_only_carrier==='(1/2)_R_TENSOR_CONJUGATE((1/2)_R)'&&claim('W02-142-02')?.conventional_carrier==='(1/2)_L_TENSOR_(1/2)_R'&&claim('W02-142-02')?.conventional_premise==='CHOSEN_DISTINGUISHED_EUCLIDEAN_VECTOR_IDENTIFIES_LEFT_AND_RIGHT_SPINORS','two operator interpretations with choice');
 ok(claim('W02-143-01')?.operator==='SOURCE_CONJUGATION'&&claim('W02-143-01')?.from==='RIGHT_HANDED_MINKOWSKI_WEYL_SPINOR_FIELDS'&&claim('W02-143-01')?.to==='LEFT_HANDED_MINKOWSKI_WEYL_SPINOR_FIELDS','left Minkowski from right Minkowski conjugation');
 ok(same(claim('W02-143-02')?.from_chiralities,['RIGHT_HANDED_MINKOWSKI','LEFT_HANDED_MINKOWSKI'])&&claim('W02-143-02')?.target==='RIGHT_HANDED_EUCLIDEAN_SPINORS'&&claim('W02-143-02')?.epistemic_role==='SOURCE_DESCRIPTION_NOT_ONE_TO_ONE_STATE_SPACE_MAP_THEOREM','two Minkowski chiralities to Euclidean right proposed');
 ok(item('W-SSC-140')?.source_expression_census?.statements?.length===2&&item('W-SSC-142')?.source_expression_census?.statements?.[0]?.id==='W02-G0-WICK-01'&&item('W-SSC-120')?.source_expression_census?.statements?.[0]?.id==='W02-COLD-HITCHIN-01','three existing formula/cited roles conserved');
 ok(def?.earliest_affected_stage==='G0_SOURCE_SEMANTIC_OCCURRENCE_CONSERVATION'&&def?.untyped_roles?.length===9&&same(def?.unqualified_old_W86_omissions,out),'nine source granularity defect and three excluded roles');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.30'&&D?.items?.length===86&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD,'old 86 projection not current all151');
 ok(same(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&same(D?.items?.filter((x,i)=>!same(x,oldD.items[i])).map(x=>x.census_id),sel)&&out.every(id=>!D?.items.some(x=>x.census_id===id)),'85 old86 unaffected and three nonmember scope');
 ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.32'&&R?.rows?.length===151&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR,'register all151 current source and old partial86');
 ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.31'&&C?.rows?.length===151&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC,'coverage source/register exact');
 const totals={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){const s=S.items[i],r=R.rows[i],c=C.rows[i],n=s.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(s.source)?.[0];totals[u]=(totals[u]||0)+n;ok(r?.census_id===s.id&&r?.source_body_exact===s.obligation&&r?.source_expression_statement_count===n&&r?.historical_closure_accepted_as_current===false&&c?.census_id===s.id&&c?.source_expression_statement_count===n&&c?.body_length_chars===s.obligation.length&&c?.stage_authority===false,'151 exact source/register/coverage alignment '+i)}
 if(D?.items?.length===86)for(let i=0;i<86;i++){const d=D.items[i],s=S.items.find(x=>x.id===d.census_id);ok(d?.track==='W'&&d?.body===s?.obligation&&same(d?.source_formula_incidences||[],s?.source_expression_census?.statements||[]),'selected 86 source body/formula exact '+i)}
 ok(totals.W02===62&&totals.W05===106&&Object.values(totals).reduce((a,b)=>a+b,0)===400&&same(totals,R?.counts?.current_source_expression_units)&&Object.entries(totals).every(([u,n])=>C?.by_unit?.[u]?.source_expression_statements===n),'all W typed exactly 400 with W02 62');
 ok(U?.schema==='isograph.exp062-w-g0-source-unit-current-inventory.v0.13'&&U?.summary?.structured_incidences===400&&U?.source_census?.git_blob_sha===pins.S&&U?.historical_parent?.git_blob_sha===pins.oldU&&U?.summary?.other147_items_unchanged===true&&U?.summary?.all_nine_original_source_reverse_exhaustive===false&&U?.summary?.G0_frozen===false,'nine W unit inventory G0 open');
 ok(neg?.schema==='isograph.exp062-w02-IV1-spin4-center-obstruction-negative.v0.1'&&neg?.status==='NONAUTHOR_EXACT_GROUP_CENTRAL_SIGN_COUNTERMODEL_FOR_CONVENTIONAL_RIGHT_ONLY_SYMBOL','math negative source independence');
 const g=neg?.representation?.central_element,actions=neg?.representation?.actions,mom=neg?.signed_momentum_check;
 ok(g?.left==='-I_2'&&g?.right==='I_2'&&actions?.conventional_vector===-1&&actions?.right_spinor===1&&actions?.right_endomorphisms===1&&neg?.representation?.right_spinor==='(0)_L tensor (1/2)_R','central element conventional V odd, End R even');
 ok(neg?.representation?.center_result==='T(-v)=T(v) implies T=0 over characteristic not 2'&&neg?.proposed_right_only_contrast?.central_element_on_right_only_vector===1&&neg?.proposed_right_only_contrast?.obstruction_from_left_central_element==='ABSENT_NOT_FULL_THEORY_PROVEN','conditional no-go proof NOT full theory');
 if(mom?.sigma1?.length===2){const z=mom.sigma1;ok(same(z,[[0,1],[1,0]])&&same(mom.spatial_momentum,[1,0,0]),'momentum source Pauli sigma1');
 for(const key of ['positive_case','negative_case']){const m=mom[key],v=m?.eigenspinor,p=m?.p0,eigen=m?.sigma1_eigenvalue;ok(v?.length===2&&equalVector(apply(z,v),v.map(x=>eigen*x))&&equalVector(v.map(x=>p*x),apply(z,v))&&m?.helicity===(key==='positive_case'?'+1/2':'-1/2'),'paired Weyl p0 operator kernel and helicity '+key);}
 }
 ok(neg?.scope_guards?.includes('NO_COMPLETE_QFT_EXISTENCE_THEOREM_FOR_PROPOSED_GEOMETRY')&&neg?.authority?.G0_frozen===false,'negative finite group check not QFT theorem');
 ok(priorCI?.verified_GitHub_Actions?.run_id===38005055523&&priorCI?.verified_GitHub_Actions?.job_id===114071808207&&priorCI?.verified_GitHub_Actions?.head_sha==='6650f5a37145194f438d15d9e65c3f60ed9651aa'&&priorCI?.verified_GitHub_Actions?.positive_baseline===true&&priorCI?.verified_GitHub_Actions?.rejected===58&&priorCI?.verified_GitHub_Actions?.mutations_total===58&&priorCI?.qualifications?.G0_complete===false,'historical source0.45 Node 58/58 retained exact');
 ok(G?.current_W02_IV1_prepublication_v01_failure?.git_blob_sha===pins.failure&&G?.current_W02_IV1_prepublication_v01_failure?.qualified===false,'unqualified original escaped V8 mutation preserved');
 ok(failure?.schema==='isograph.exp062-w02-IV1-prepublication-verifier-mutation-escape.v0.1'&&failure?.candidate?.baseline?.pass===true&&failure?.candidate?.hostile?.total===62&&failure?.candidate?.hostile?.rejected===61&&failure?.candidate?.hostile?.escaped===1&&failure?.candidate?.hostile?.qualified===false,'prepublication 61/62 one escape not qualification');
 ok(failure?.correction?.source_artifacts_changed===false&&failure?.candidate?.hostile?.escaped_name==='nine source inventory false complete','failed inventory fake completeness mutant identified');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.95'&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.94'&&G?.supersedes?.git_blob_sha===pins.oldG&&G?.semantic_authority===false&&G?.track==='W','G0 stage0.95 exact lineage');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D,'current source0.46 tuple all pin');
 ok(G?.current_W02_IV1_source_first?.git_blob_sha===pins.O&&G?.current_W02_IV1_typed_defect?.git_blob_sha===pins.def&&G?.current_W02_IV1_center_negative?.git_blob_sha===pins.neg&&G?.current_W02_II_III_verified_NodeCI?.git_blob_sha===pins.priorCI&&G?.current_W_nine_source_inventory?.git_blob_sha===pins.U,'W02 old and new scope evidence pin');
 ok(G?.current_W02_IV1_verifier?.path===P.self&&G?.current_W02_IV1_verifier?.git_blob_sha===sha('self'),'current verifier self pin');
 ok(G?.verification_at_record_creation?.W02_IV1_NodeCI==='PENDING_CURRENT_GITHUB_ACTIONS'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','no premature CI or external pass');
 const st=G?.current_lawful_state;ok(st?.G0_open===true,'G0 remains OPEN');
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[key]===false,'stage firewall '+key);
 return errors;
}
const errors=[];for(const[k,sha0]of Object.entries(pins))if(sha(k)!==sha0)errors.push('PIN mismatch '+k);
const pos=validate(input);errors.push(...pos.map(x=>'POSITIVE '+x));
const mutants=[
 ['previous positive/escaped 61 of 62 falsely qualified',x=>x.failure.candidate.hostile.qualified=true],
 ['previous escaped record pin forged',x=>x.G.current_W02_IV1_prepublication_v01_failure.git_blob_sha='BAD'],
 ['wrong W139 Higgs exception',x=>x.O.restored_source_incidents[0].exception='NONE'],
 ['W139 broad physical QFT theorem',x=>x.O.restored_source_incidents[0].role='PROVEN_COMPLETE_MODEL'],
 ['W139 new and known gauge switched',x=>x.O.restored_source_incidents[1].new_in_this_paper='GAUGE_AND_GRAVITY'],
 ['W139 existing role erased',x=>x.O.restored_source_incidents[1].prior_known_reported.pop()],
 ['W141 wrong Ramond citation',x=>x.O.restored_source_incidents[2].cited_reference='[11]'],
 ['W141 missing conventional guard',x=>x.O.restored_source_incidents[2].single_euclidean_spinor='BOTH'],
 ['W141 no source obstruction',x=>x.O.restored_source_incidents[2].result='INVARIANT_RIGHT_ONLY'],
 ['W141 propagator left role omitted',x=>x.O.restored_source_incidents[3].required_fields.pop()],
 ['W141 conventional group not Spin4',x=>x.O.restored_source_incidents[3].source_conventional_group='SL2C'],
 ['W141 doubling citation wrong',x=>x.O.restored_source_incidents[4].reference='[9]'],
 ['W141 doubling scope wrong',x=>x.O.restored_source_incidents[4].condition='BEFORE_ANY_FIELDS'],
 ['W141 doubling becomes universal theorem',x=>x.O.restored_source_incidents[4].epistemic_role='GLOBAL_NO_GO'],
 ['W141 proposed alternative becomes proven',x=>x.O.restored_source_incidents[5].epistemic_role='PROVEN_QFT'],
 ['W141 proposal changed to standard',x=>x.O.restored_source_incidents[5].proposal='STANDARD_SPIN4'],
 ['W142 Euclidean operator wrong Wick source',x=>x.O.restored_source_incidents[6].source_operator_ref='OTHER'],
 ['W142 right-only carrier replaced left',x=>x.O.restored_source_incidents[6].right_only_carrier='LEFT_TIMES_RIGHT'],
 ['W142 conventional carrier swapped',x=>x.O.restored_source_incidents[6].conventional_carrier='RIGHT_ONLY'],
 ['W142 nonzero vector premise erased',x=>x.O.restored_source_incidents[6].conventional_premise='NO_CHOICE'],
 ['W143 source conjugation erased',x=>x.O.restored_source_incidents[7].operator='IDENTITY'],
 ['W143 source Minkowski left/right roles swapped',x=>x.O.restored_source_incidents[7].from='LEFT_HAND'],
 ['W143 target no longer Minkowski left',x=>x.O.restored_source_incidents[7].to='LEFT_EUCLIDEAN'],
 ['W143 both source chiralities dropped',x=>x.O.restored_source_incidents[8].from_chiralities.pop()],
 ['W143 target changed to left Euclidean',x=>x.O.restored_source_incidents[8].target='LEFT_EUCLIDEAN'],
 ['W143 proposal turned invertible theorem',x=>x.O.restored_source_incidents[8].epistemic_role='PROVEN_INVERTIBLE'],
 ['source item omitted',x=>x.S.items.pop()],
 ['unrelated W05 source changed',x=>x.S.items.find(y=>y.id==='W-SSC-108').obligation+='bad'],
 ['W139 source prose wrong',x=>x.S.items.find(y=>y.id==='W-SSC-139').obligation='bad'],
 ['W141 source typed omitted',x=>x.S.items.find(y=>y.id==='W-SSC-141').source_expression_census.statements.pop()],
 ['W142 previous Wick sign corrupted',x=>x.S.items.find(y=>y.id==='W-SSC-142').source_expression_census.statements[0].substitution.rhs='-i*p0'],
 ['W140 original helicity sign corrupted',x=>x.S.items.find(y=>y.id==='W-SSC-140').source_expression_census.statements[1].source_polarities[0].helicity='-1/2'],
 ['W143 new conjugation body removed',x=>x.S.items.find(y=>y.id==='W-SSC-143').obligation='missing'],
 ['W02 old history source 0.45 wrong',x=>x.S.predecessor.git_blob_sha='BAD'],
 ['original source-line gap',x=>x.O.source_first_rows[4].html_first=104],
 ['original source span wrong',x=>x.O.original.HTML=[84,108]],
 ['source original revision v1',x=>x.O.original.frozen_revision='arXiv:2311.00608v1'],
 ['source item owner ID swapped',x=>x.O.restored_source_incidents[0].owner='W-SSC-141'],
 ['old W86 member deleted',x=>x.D.items.pop()],
 ['old W86 unexpected nonmember added',x=>x.D.items.push({census_id:'W-SSC-141'})],
 ['old W86 selected W142 formula wrong',x=>x.D.items.find(y=>y.census_id==='W-SSC-142').source_formula_incidences=[]],
 ['old W86 other85 modified',x=>x.D.items[0].body='bad'],
 ['all 151 register W139 body fake',x=>x.R.rows[138].source_body_exact='wrong'],
 ['all 151 coverage W143 count stale',x=>x.C.rows[142].source_expression_statement_count=0],
 ['W02 total stale',x=>x.C.by_unit.W02.source_expression_statements=53],
 ['W05 source count altered',x=>x.R.counts.current_source_expression_units.W05=107],
 ['nine source inventory false complete',x=>x.U.summary.all_nine_original_source_reverse_exhaustive=true],
 ['math center left sign flipped',x=>x.neg.representation.actions.conventional_vector=1],
 ['math right End sign flipped',x=>x.neg.representation.actions.right_endomorphisms=-1],
 ['math proposed right only central sign flipped',x=>x.neg.proposed_right_only_contrast.central_element_on_right_only_vector=-1],
 ['math central conclusion removed',x=>x.neg.representation.center_result='NO_OBSTRUCTION'],
 ['math sigma1 entry wrong',x=>x.neg.signed_momentum_check.sigma1[0][1]=-1],
 ['math positive p0 wrong',x=>x.neg.signed_momentum_check.positive_case.p0=-1],
 ['math negative source helicity sign wrong',x=>x.neg.signed_momentum_check.negative_case.helicity='+1/2'],
 ['math positive kernel eigenvector wrong',x=>x.neg.signed_momentum_check.positive_case.eigenspinor=[1,-1]],
 ['math source QFT proof claim',x=>x.neg.scope_guards=[]],
 ['historical prior 58/58 run falsified',x=>x.priorCI.verified_GitHub_Actions.rejected=57],
 ['current source pin stale',x=>x.G.current_source_census.git_blob_sha=pins.oldS],
 ['current source verifier SHA forged',x=>x.G.current_W02_IV1_verifier.git_blob_sha='BAD'],
 ['current stage G0 complete',x=>x.G.current_lawful_state.G0_complete=true],
 ['current G1 enabled',x=>x.G.current_lawful_state.G1_authorized=true],
 ['current third party false passed',x=>x.G.verification_at_record_creation.third_party='PASSED'],
 ['current oct03 original raw verified false claim',x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['cross track synthesis now enabled',x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true]
];
const rejected=[],escaped=[],crashed=[];for(const[name,act]of mutants){const q=copy(input),old=JSON.stringify(q);try{act(q);if(old===JSON.stringify(q))escaped.push(name+':NO_EFFECT');else if(validate(q).length)rejected.push(name);else escaped.push(name)}catch(err){crashed.push(name+': '+err.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W02 §IV.1 Weyl/Spin4 source and nonauthor central no-go G0 0.2',pass:errors.length===0,positive_errors:pos,errors,source_items:151,W02_typed:62,total_typed:400,old86:86,old86_member_changed:1,old86_excluded_changed:3,hostile_controls:mutants.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,stage:'G0_OPEN_UNFROZEN'}));
if(errors.length)process.exitCode=1;
