import fs from 'node:fs';
import crypto from 'node:crypto';
const P={
  "oldS": "research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_48.json",
  "S": "research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_49.json",
  "oldD": "experiments/062/W_G0_W02_SV_SOURCE_DEMAND_PROJECTION_0_32.json",
  "D": "experiments/062/W_G0_W01_S6_SOURCE_DEMAND_PROJECTION_0_33.json",
  "oldR": "experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_34.json",
  "R": "experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_35.json",
  "oldC": "experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_33.json",
  "C": "experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_34.json",
  "oldU": "experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_15.json",
  "U": "experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_16.json",
  "oldG": "experiments/062/W_CURRENT_STAGE_GATE_0_102.json",
  "G": "experiments/062/W_CURRENT_STAGE_GATE_0_103.json",
  "O": "experiments/062/W01_G0_S6_CONCLUSION_SOURCE_FIRST_0_1.json",
  "F": "experiments/062/W01_G0_S6_CONCLUSION_TYPED_SOURCE_DEFECT_0_1.json",
  "N": "experiments/062/W01_G0_S6_CONCLUSION_MODAL_NEGATIVE_0_1.json",
  "self": "experiments/062/tools/verify-w01-s6-conclusion-source-g0-0-3.mjs",
  "fail": "experiments/062/W01_G0_S6_VERIFIER_0_1_POSITIVE_FAILURE_0_1.json",
  "fail2": "experiments/062/W01_G0_S6_VERIFIER_0_2_MEMBERSHIP_ESCAPE_0_1.json"
};
const PIN={
  "oldS": "a5e048e320ad64ab71e071ac6dbc8bc8a0393ab3",
  "S": "a414b5e0e6d9b84e30aa1f2278da8fea60aae54c",
  "oldD": "0e0bbfc7dbafc57db6d9aa7ed1d16160b2527b92",
  "D": "94b6154b07d837cd6af25429ad6769c58ec401b2",
  "oldR": "455f76122adbe853cfe4736aa609d0e9c9ae8c4e",
  "R": "7192eb3c34c14d4e6de92637c18c6c63da0cae78",
  "oldC": "e3bfa067a29aa47438855494a380077fa067311d",
  "C": "72a9613c90fc987b5148141b912847800e9ff424",
  "oldU": "d27ef92e5b2950620007f91d308848b741dc91d0",
  "U": "4c7f1491ce2882914280310d0fb9397c57ac85b1",
  "oldG": "7615a7d01c2865e37a3d3ba77dec9e988deffd89",
  "O": "9cd6c7e8eb5c29941081fc34d67568733fea963c",
  "F": "638b8e6b702857491310b342430df6a5dc8be252",
  "N": "938117e76865b2bee04ed0a322db8ee701738ffc",
  "fail": "03cfe40c6b51317d1a6dca6a8142ea76b821edaa",
  "fail2": "c15a820323c9dc45052c442bbd741885267126d6"
};
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const hashOf=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const clone=x=>JSON.parse(JSON.stringify(x));
const input=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,read(k)]));
function validate(q){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)};
 const {oldS,S,oldD,D,oldR,R,oldC,C,oldU,U,oldG,G,O,F,N,fail,fail2}=q;
 const id='W-SSC-117',old117=oldS?.items?.find(x=>x.id===id),w117=S?.items?.find(x=>x.id===id);
 const claim=w117?.source_expression_census?.statements||[],c=k=>claim.find(x=>x.id==='W01-117-'+String(k).padStart(2,'0'));
 const st=G?.current_lawful_state;
 ok(oldS?.schema==='woit.source-semantic-census.v0.48'&&S?.schema==='woit.source-semantic-census.v0.49'&&S?.predecessor?.git_blob_sha===PIN.oldS&&S?.correction?.source_oracle?.git_blob_sha===PIN.O&&S?.correction?.source_defect?.git_blob_sha===PIN.F,'SSC0.49 exact source ancestry/provenance');
 ok(S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false&&S?.source_count===9,'151 W source identities unsealed');
 if(S?.items?.length===151&&oldS?.items?.length===151){
   ok(eq(S.items.map(x=>x.id),oldS.items.map(x=>x.id)),'W source identity order complete');
   ok(eq(S.items.filter((x,i)=>!eq(x,oldS.items[i])).map(x=>x.id),[id]),'one W117 source record changed other150 exact');
   ok(S.items.every((x,i)=>x.obligation===oldS.items[i].obligation),'all 151 author bodies exactly unchanged');
 }
 ok(old117?.source_expression_census===undefined&&old117?.state==='OPEN_SCOPE_GUARD'&&old117?.source==='W01 §6','prior W117 had zero typed expressions');
 ok(w117?.source_expression_census?.revision==='arXiv:2104.05099v2'&&claim.length===10&&w117?.state===old117?.state&&w117?.obligation===old117?.obligation,'W117 ten typed roles no author text mutation');
 ok(eq(claim,O?.restored_typed_source_occurrences)&&eq(claim.map(x=>x.id),Array.from({length:10},(_,i)=>'W01-117-'+String(i+1).padStart(2,'0'))),'independent author source-first ledger all ten typed source incidence IDs');
 ok(O?.source?.source_id==='W01'&&O?.source?.revision==='arXiv:2104.05099v2'&&eq(O?.source?.html_lines,[354,385])&&eq(O?.source?.pdf_printed_pages,[15,16])&&eq(O?.source?.PDF_page_indices_visually_checked,[14,15])&&O?.source_intervals?.length===10,'original source W01 §6 exact scope');
 if(O?.source_intervals?.length===10){for(let i=0;i<10;i++){const a=O.source_intervals[i];ok(a?.ordinal===i+1&&a?.html_first===(i?O.source_intervals[i-1].html_last+1:355),'line-by-line original-source interval '+i)}
 ok(O.source_intervals[9].html_last===385&&eq(O.source_intervals.flatMap(x=>x.new_ids),claim.map(x=>x.id)),'all intervals without gaps and source IDs')}
 ok(O?.other_source_items_unchanged===150&&O?.all_151_original_author_bodies_unmodified===true&&O?.old_W117_historical_member===false&&O?.all_nine_original_source_reverse_exhaustive===false&&O?.G0_frozen===false,'oracle scopes G0-only and excludes W117 old86');
 ok(c(1)?.author_judgment==='TWISTOR_FRAMEWORK_PROVIDES_COMPELLING_PICTURE'&&c(1)?.combined_signatures?.join(',')==='EUCLIDEAN,MINKOWSKI'&&c(1)?.common_carrier==='PROJECTIVE_TWISTOR_SPACE_PT','conclusion joint PT Euclidean and Minkowski a proposal');
 ok(c(2)?.carrier==='SPACETIME_POINT_AS_SPACE_OF_WEYL_SPINORS'&&c(2)?.epistemic==='AUTHOR_STATED_ADVANTAGE','tautological spinor framed author advantage');
 ok(c(3)?.reason==='JOINT_TWISTOR_COMPLEXIFICATION'&&c(3)?.source_modal_word==='CAN_BE_NATURALLY_PERFORMED'&&c(3)?.negative?.includes('NOT_COMPLETED_PT_QUANTIZATION'),'analytic continuation is not physical QFT proof');
 ok(c(4)?.source_quantifier==='EXACTLY_THE_INTERNAL_SYMMETRIES_OF_STANDARD_MODEL_OCCUR'&&c(4)?.semantic_scope==='GROUP_APPEARANCE_IN_PROPOSED_EUCLIDEAN_TWISTOR_GEOMETRY'&&c(4)?.negative?.includes('NO_FULL_LAGRANGIAN_CONSTRUCTION_ENTAILED'),'exact group source claim not complete SM realization');
 ok(c(5)?.proposed_mechanism==='EUCLIDEAN_SO4_SYMMETRY_BROKEN_BY_PHYSICAL_STATE_DEFINITION'&&c(5)?.negative?.includes('NOT_PROVEN_STANDARD_MODEL_HIGGS_DYNAMICS'),'Euclidean state-space proposal not confirmed Higgs dynamics');
 ok(c(6)?.carrier==='TRANSFORMATION_PROPERTIES_OF_ONE_STANDARD_MODEL_FERMION_GENERATION'&&c(6)?.distinct_open_requirement==='EXPECTED_THREE_GENERATIONS_NOT_CONSTRUCTED_IN_SOURCE','one generation not three');
 ok(c(7)?.claimed_structure==='NEW_CHIRAL_FORMULATION_OF_GRAVITY_UNIFIED_WITH_STANDARD_MODEL'&&c(7)?.negative?.includes('NOT_SOURCE_COMPLETED_GRAVITY_SM_DYNAMICS'),'chiral gravity source proposal not completed');
 ok(c(8)?.claimed_structure==='CONFORMAL_SYMMETRY_FUNDAMENTAL_IN_PROPOSED_TWISTOR_PICTURE'&&c(8)?.negative?.includes('NO_COMPLETE_QFT_WARD_IDENTITY_PROOF'),'conformal symmetry author picture not field theorem');
 ok(c(9)?.unfinished_tasks?.length===3&&c(9)?.unfinished_tasks?.includes('EXPECTED_THREE_MATTER_GENERATIONS')&&c(9)?.quantifier_scope==='MIGHT_AND_POSSIBLY_NOT_ALREADY_ACCOMPLISHED'&&c(9)?.negative?.includes('NO_VERIFIED_DISTINCT_PHYSICAL_PREDICTION'),'full PT, 3 generations, speculative predictions remain future');
 ok(c(10)?.claim==='PROPOSED_FRAMEWORK_GRAVITATIONALLY_CHIRAL_NOT_ONLY_ELECTROWEAK_CHIRAL'&&c(10)?.consequence==='MAY_HAVE_OBSERVABLE_IMPLICATIONS'&&c(10)?.negative?.includes('DO_NOT_INFER_OBSERVED_CHIRAL_GRAVITY_EFFECT'),'possibly observable not observed');
 ok(F?.earliest_stage==='G0_SOURCE_SEMANTIC_OCCURRENCE_CENSUS'&&F?.historical_demand?.W117_selected===false&&F?.census_expected?.other150_exact===true&&eq(F?.missing_occurrence_ids,claim.map(x=>x.id)),'defect provenance and historical false closed prevented');
 ok(N?.status==='NON_AUTHOR_LOGICAL_TWO_MODEL_COUNTERCONTROL_NO_PHYSICAL_THEORY_CLAIM'&&N?.premises?.length===3&&N?.model_A?.three_generations_construction==='NOT_GIVEN'&&N?.model_B?.three_generations_construction==='HYPOTHETICALLY_ASSIGNED'&&N?.logical_conclusion?.not_real_physical_models===true&&N?.logical_conclusion?.author_text_untouched===true,'hypothetical two-model inference guard not physical theory');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.33'&&D?.items?.length===86&&D?.current_source?.git_blob_sha===PIN.S&&D?.predecessor_W_only_demand?.git_blob_sha===PIN.oldD&&eq(D?.items,oldD?.items),'historical old86 rows byte-equivalent');
 ok(!D?.items?.some(x=>x.census_id===id)&&D?.counts?.changed_excluded_source_id===id&&D?.counts?.other_86_exact_unchanged===true&&D?.replay_policy?.G1_authorized===false&&D?.counts?.full_151_source_semantic_demand_qualified===false,'W117 still excluded and unfinished full demand');
 ok(R?.rows?.[116]?.census_id===id&&R?.rows?.[116]?.historical_86_member===false&&R?.rows?.[116]?.historical_ledger_0_19_mode==='INCOMPLETE_UNEXPANDED'&&C?.rows?.[116]?.historical_in_86===false&&C?.rows?.[116]?.historical_closure_state==='INCOMPLETE_UNEXPANDED','excluded W117 must be reflected in both historical flags and open mode');
 if(D?.items?.length===86&&R?.rows?.length===151&&C?.rows?.length===151){
  const included=new Set(D.items.map(x=>x.census_id));
  for(let i=0;i<151;i++)ok(R.rows[i]?.historical_86_member===included.has(R.rows[i]?.census_id)&&C.rows[i]?.historical_in_86===included.has(C.rows[i]?.census_id),'all 151 historical membership flags exactly agree with 86 subset '+i);
 }
 ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.35'&&R?.rows?.length===151&&R?.source_census?.git_blob_sha===PIN.S&&R?.historical_86_projection?.git_blob_sha===PIN.D&&R?.predecessor_register?.git_blob_sha===PIN.oldR,'exact R current and predecessor');
 ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.34'&&C?.rows?.length===151&&C?.source_census?.git_blob_sha===PIN.S&&C?.reconstructed_register?.git_blob_sha===PIN.R&&C?.predecessor_coverage?.git_blob_sha===PIN.oldC,'exact current C source register predecessor');
 ok(eq(R?.rows?.filter((x,i)=>!eq(x,oldR.rows[i])).map(x=>x.census_id),[id])&&eq(C?.rows?.filter((x,i)=>!eq(x,oldC.rows[i])).map(x=>x.census_id),[id]),'other 150 register and coverage row objects exact');
 const units={};let total=0;
 if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){
  for(let i=0;i<151;i++){const x=S.items[i],y=R.rows[i],z=C.rows[i],n=x.source_expression_census?.statements?.length||0,unit=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];total+=n;units[unit]=(units[unit]||0)+n;
  ok(y.census_id===x.id&&y.source_body_exact===x.obligation&&y.source_expression_statement_count===n&&y.historical_closure_accepted_as_current===false&&z.census_id===x.id&&z.body_length_chars===x.obligation.length&&z.source_expression_statement_count===n&&z.stage_authority===false,'all151 source/register/coverage aligned '+i);
 }}
 ok(total===417&&units.W01===132&&eq(R?.counts?.current_source_expression_units,units)&&C?.by_unit?.W01?.source_expression_statements===132&&C?.counts?.total_structured_source_incidents===417,'current 417 typed source incidences W01 132');
 ok(U?.schema==='isograph.exp062-w-g0-source-unit-current-inventory.v0.16'&&U?.source_census?.git_blob_sha===PIN.S&&U?.historical_parent?.git_blob_sha===PIN.oldU&&U?.summary?.structured_incidences===417&&U?.units?.length===9&&U?.units?.reduce((a,x)=>a+x.structured_incidences,0)===417&&U?.summary?.all_nine_original_source_reverse_exhaustive===false,'nine-source inventory scoped and not complete');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.103'&&G?.track==='W'&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===PIN.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.102','G0 gate parent exact0.100');
 ok(G?.current_source_census?.git_blob_sha===PIN.S&&G?.current_historical_86_member_projection?.git_blob_sha===PIN.D&&G?.current_all_151_conservation_register?.git_blob_sha===PIN.R&&G?.current_source_coverage?.git_blob_sha===PIN.C,'gate current source tuple');
 ok(G?.current_W01_S6_source_oracle?.git_blob_sha===PIN.O&&G?.current_W01_S6_source_defect?.git_blob_sha===PIN.F&&G?.current_W01_S6_modal_nonentailment?.git_blob_sha===PIN.N&&G?.current_W_nine_source_inventory?.git_blob_sha===PIN.U,'source-first evidence gate exact');
 ok(G?.current_W01_S6_source_verifier?.path===P.self&&G?.current_W01_S6_source_verifier?.git_blob_sha===hashOf('self'),'validator pinned to exact own Git blob');
 ok(G?.current_W01_S6_v01_failed_NodeCI?.git_blob_sha===PIN.fail&&G?.current_W01_S6_v01_failed_NodeCI?.run_id===38018234785&&G?.current_W01_S6_v01_failed_NodeCI?.positive_pass===false&&G?.current_W01_S6_v01_failed_NodeCI?.qualifies===false,'prior unmutated verifier v0.1 failure gate pinned');
 ok(fail?.schema==='isograph.exp062-w01-s6-conclusion-checker-v01-positive-baseline-failure.v0.1'&&fail?.run?.id===38018234785&&fail?.run?.job_id===114113233629&&fail?.run?.head_sha==='1092e6a7c4e391d2898b0bdbabfd8ca4f0032dbe'&&fail?.run?.positive_baseline_pass===false&&fail?.run?.qualification===false,'actual prior positive baseline failed');
 ok(fail?.run?.hostile_total===55&&fail?.run?.hostile_rejected===55&&fail?.run?.hostile_escaped===0&&fail?.diagnosis?.actual_source_oracle_field==='all_nine_original_source_reverse_exhaustive'&&fail?.diagnosis?.actual_source_oracle_value===false,'prior 55/55 unqualified due missing field');
 ok(G?.current_W01_S6_v02_failed_NodeCI?.git_blob_sha===PIN.fail2&&G?.current_W01_S6_v02_failed_NodeCI?.run_id===38018459741&&G?.current_W01_S6_v02_failed_NodeCI?.qualified===false&&G?.current_W01_S6_v02_failed_NodeCI?.hostile_rejected===58&&G?.current_W01_S6_v02_failed_NodeCI?.hostile_total===59,'v02 mutant escape correctly preserved gate');
 ok(fail2?.schema==='isograph.exp062-w01-s6-conclusion-verifier-v02-hostile-membership-escape.v0.1'&&fail2?.run?.id===38018459741&&fail2?.run?.job_id===114113933961&&fail2?.run?.head_sha==='09fe7b9e1d4da42a7a17ee0fd91729d28e9f835d'&&fail2?.run?.positive_baseline_pass===true&&fail2?.run?.hostile_total===59&&fail2?.run?.hostile_rejected===58&&fail2?.run?.hostile_escaped===1&&fail2?.run?.qualification===false,'unqualified v02 positive pass 58 of 59 rejected one escape');
 ok(fail2?.root_cause?.real_register_field==='rows[census_id=W-SSC-117].historical_86_member'&&fail2?.root_cause?.expected_value===false,'v02 source membership escape owner unaltered');
 ok(G?.verification_at_record_creation?.W01_S6_NodeCI==='PENDING_V0_3_EXACT_CURRENT_NODE'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','cannot preclaim Node nor external');
 ok(st?.G0_open===true&&st?.G0_complete===false&&st?.G0_frozen===false,'current G0 OPEN unfrozen');
 for(const key of ['source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[key]===false,'stage law G0 blocked '+key);
 return errors;
}
const errors=[];
for(const[k,v]of Object.entries(PIN))if(hashOf(k)!==v)errors.push('GIT_BLOB_PIN_MISMATCH '+k);
const baseline=validate(input);
errors.push(...baseline.map(x=>'POSITIVE '+x));
const mutations=[
 ['source 151 count wrong',q=>q.S.items.pop()],
 ['source W01-117 vanished',q=>q.S.items.splice(116,1)],
 ['unrelated W02 author changed',q=>q.S.items[7].obligation+=' wrong'],
 ['W117 author body changed',q=>q.S.items[116].obligation+=' NEW'],
 ['W117 author state theorem',q=>q.S.items[116].state='QUALIFIED_THEOREM'],
 ['W117 source v1',q=>q.S.items[116].source_expression_census.revision='arXiv:2104.05099v1'],
 ['W117 typed loses one',q=>q.S.items[116].source_expression_census.statements.pop()],
 ['W117 typed old source claim erased',q=>q.S.items[116].source_expression_census.statements[0].common_carrier='UNRELATED'],
 ['W117 promise becomes proof',q=>q.S.items[116].source_expression_census.statements[8].quantifier_scope='ALREADY_PROVED'],
 ['W117 predicted observation becomes measured',q=>q.S.items[116].source_expression_census.statements[9].consequence='HAS_OBSERVED_EFFECTS'],
 ['W117 exact internal group is full SM',q=>q.S.items[116].source_expression_census.statements[3].semantic_scope='COMPLETE_SM_LAGRANGIAN_VERIFIED'],
 ['W117 one gen becomes three',q=>q.S.items[116].source_expression_census.statements[5].distinct_open_requirement='THREE_GENERATIONS_DONE'],
 ['W117 analytic continuation proof forged',q=>q.S.items[116].source_expression_census.statements[2].negative=[]],
 ['W117 Higgs proof fabricated',q=>q.S.items[116].source_expression_census.statements[4].negative=[]],
 ['W117 conformal exact quantum Ward verified',q=>q.S.items[116].source_expression_census.statements[7].negative=[]],
 ['W117 source line interval gap',q=>q.O.source_intervals[4].html_first=367],
 ['W117 source line interval end truncated',q=>q.O.source_intervals[9].html_last=384],
 ['W117 source original PDF page wrong',q=>q.O.source.pdf_printed_pages=[14,15]],
 ['W117 source original HTML range wrong',q=>q.O.source.html_lines=[355,384]],
 ['W117 missing original author source row',q=>q.O.source_intervals.pop()],
 ['W117 source wrong arxiv version',q=>q.O.source.revision='arXiv:2104.05099v1'],
 ['W117 original author body falsely changed',q=>q.O.all_151_original_author_bodies_unmodified=false],
 ['W117 nine source completeness forged',q=>q.O.all_nine_original_source_reverse_exhaustive=true],
 ['failed v0.1 positive forged PASS',q=>q.fail.run.positive_baseline_pass=true],
 ['failed v0.1 mutant score falsely qualified',q=>q.fail.run.qualification=true],
 ['failed v0.1 source-oracle field forged',q=>q.fail.diagnosis.actual_source_oracle_field='wrong'],
 ['gate old failed verifier pin removed',q=>q.G.current_W01_S6_v01_failed_NodeCI.git_blob_sha='BAD'],
 ['W117 selected in historic86 falsely',q=>q.O.old_W117_historical_member=true],
 ['W117 modal claim source invented',q=>q.O.restored_typed_source_occurrences[8].unfinished_tasks=[]],
 ['W117 defect G1 instead G0',q=>q.F.earliest_stage='G1'],
 ['W117 defect historical member becomes yes',q=>q.F.historical_demand.W117_selected=true],
 ['W117 defect provenance claim removed',q=>q.F.missing_occurrence_ids.pop()],
 ['W117 N two-model physically real',q=>q.N.logical_conclusion.not_real_physical_models=false],
 ['W117 N future theory proven',q=>q.N.model_A.three_generations_construction='DONE'],
 ['W117 N source text emended',q=>q.N.logical_conclusion.author_text_untouched=false],
 ['historical 86 selected altered',q=>q.D.items.pop()],
 ['historical W117 inserted selected',q=>q.D.items[0].census_id='W-SSC-117'],
 ['historical86 falsely fully qualifies',q=>q.D.counts.full_151_source_semantic_demand_qualified=true],
 ['historical W117 excluded marker omitted',q=>q.D.counts.changed_excluded_source_id='W-SSC-101'],
 ['register W117 typed stays zero',q=>q.R.rows[116].source_expression_statement_count=0],
 ['W117 historical mode falsely closed',q=>q.R.rows[116].historical_ledger_0_19_mode='CLOSED_SCHEMA'],
 ['W117 coverage historical flag forged',q=>q.C.rows[116].historical_in_86=true],
 ['W117 coverage historical mode falsely closed',q=>q.C.rows[116].historical_closure_state='CLOSED_SCHEMA'],
 ['v02 escaped mutant falsely accepted',q=>q.fail2.run.qualification=true],
 ['v02 59th mutant forged rejected',q=>q.fail2.run.hostile_rejected=59],
 ['v02 failure gate SHA forged',q=>q.G.current_W01_S6_v02_failed_NodeCI.git_blob_sha='BAD'],
 ['register W117 body stale',q=>q.R.rows[116].source_body_exact='STALE'],
 ['register W117 membership falsified',q=>q.R.rows[116].historical_86_member=true],
 ['register non-W117 item changed',q=>q.R.rows[0].source_body_exact='STALE'],
 ['coverage W117 typed zero',q=>q.C.rows[116].source_expression_statement_count=0],
 ['coverage W01 unit stays prior122',q=>q.C.by_unit.W01.source_expression_statements=122],
 ['coverage future G1 authorized',q=>q.C.rows[116].stage_authority=true],
 ['inventory falsely all nine reverse complete',q=>q.U.summary.all_nine_original_source_reverse_exhaustive=true],
 ['inventory total wrong',q=>q.U.summary.structured_incidences=407],
 ['current G0 source pointer stale',q=>q.G.current_source_census.git_blob_sha=PIN.oldS],
 ['current G0 register pointer stale',q=>q.G.current_all_151_conservation_register.git_blob_sha=PIN.oldR],
 ['current G0 gate parent wrong',q=>q.G.supersedes.git_blob_sha='WRONG'],
 ['current G0 source oracle stale',q=>q.G.current_W01_S6_source_oracle.git_blob_sha='WRONG'],
 ['current G0 validator own hash forged',q=>q.G.current_W01_S6_source_verifier.git_blob_sha='WRONG'],
 ['current W G0 source frozen false->true',q=>q.G.current_lawful_state.G0_frozen=true],
 ['current W G1 enabled',q=>q.G.current_lawful_state.G1_authorized=true],
 ['current W all 151 demands falsely qualified',q=>q.G.current_lawful_state.complete_W_151_semantic_demand_membership_requalified=true],
 ['October3 mutable bytes falsely recovered',q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['new W L synthesis prematurely permitted',q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true],
 ['external third party falsely PASS',q=>q.G.verification_at_record_creation.third_party='PASSED']
];
const rejected=[],escaped=[],crashed=[];
for(const[name,apply]of mutations){const q=clone(input),old=JSON.stringify(q);try{apply(q);if(JSON.stringify(q)===old)escaped.push(name+' NO_EFFECT');else if(validate(q).length)rejected.push(name);else escaped.push(name);}catch(ex){crashed.push(name+' '+String(ex));}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W01 §6 source conclusion and 151-row historical membership corrected G0 0.3',pass:errors.length===0,errors,positive_errors:baseline,source_items:151,all_source_incidents:417,W01_incidents:132,historical_W86_members:86,historical_W117_excluded:true,source_bodies_unchanged:true,hostile_total:mutations.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,stage:'G0_OPEN_UNFROZEN',external:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;