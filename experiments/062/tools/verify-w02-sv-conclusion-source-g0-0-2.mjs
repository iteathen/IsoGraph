import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_98.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_99.json","oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_47.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_48.json","oldD":"experiments/062/W_G0_W02_IV2_SOURCE_DEMAND_PROJECTION_0_31.json","D":"experiments/062/W_G0_W02_SV_SOURCE_DEMAND_PROJECTION_0_32.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_33.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_34.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_32.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_33.json","I":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_15.json","O":"experiments/062/W02_G0_SV_CONCLUSION_SOURCE_FIRST_0_1.json","F":"experiments/062/W02_G0_SV_CONCLUSION_TYPED_DEFECT_0_1.json","N":"experiments/062/W02_G0_SV_EW_NONENTAILMENT_GUARD_0_1.json","CI":"experiments/062/W02_G0_SIV2_NODE_CI_RESULT_0_1.json","self":"experiments/062/tools/verify-w02-sv-conclusion-source-g0-0-2.mjs","prepub":"experiments/062/W02_G0_SV_VERIFIER_0_1_PREPUB_ESCAPE_0_1.json"};
const pin={"oldG":"e44b4f0eea1ddea977fc02c4a81b8d19fcfb8b81","oldS":"a7921a4434fcede276869c5334f1adc3711d4ad9","S":"a5e048e320ad64ab71e071ac6dbc8bc8a0393ab3","oldD":"64ae94a170cbf6e5844156fceefc684b3af139e3","D":"0e0bbfc7dbafc57db6d9aa7ed1d16160b2527b92","oldR":"dfb00c38a9368ee38693230bf4e29aa9f9c09ec4","R":"455f76122adbe853cfe4736aa609d0e9c9ae8c4e","oldC":"e2b31a073e2501d39bd0bab193879b8c5cd4c1f1","C":"e3bfa067a29aa47438855494a380077fa067311d","I":"d27ef92e5b2950620007f91d308848b741dc91d0","O":"ec23ba4b0c24f907b21de5120bbfcd6bd36dda00","F":"5634e002d1837b540d6ffe218e27bbc4fc886892","N":"82aa939dd167cf0e70a768380383db63735981a2","CI":"9154e907710f4758198b0568a736c9bf08e4812a","prepub":"ca3edd3004ebe848facf014f182a0e6923351529"};
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),dup=x=>JSON.parse(JSON.stringify(x)),num=x=>x?.source_expression_census?.statements?.length||0;
const input=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,read(k)]));
function check(q){
const problems=[],ok=(x,m)=>{if(!x)problems.push(m)};
const {oldG,G,oldS,S,oldD,D,oldR,R,oldC,C,I,O,F,N,CI,prepub}=q,st=G?.current_lawful_state;
const prior=oldS?.items?.find(x=>x.id==='W-SSC-151'),current=S?.items?.find(x=>x.id==='W-SSC-151');
const oldTyped=prior?.source_expression_census?.statements||[],nowTyped=current?.source_expression_census?.statements||[],added=nowTyped.slice(4);
ok(S?.schema==='woit.source-semantic-census.v0.48'&&S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false,'W source0.48 151 items');
ok(oldS?.schema==='woit.source-semantic-census.v0.47'&&S?.predecessor?.git_blob_sha===pin.oldS,'SSC0.47 immediate old source');
ok(equal(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&equal(S?.items?.filter((x,i)=>!equal(x,oldS.items[i])).map(x=>x.id),['W-SSC-151']),'150 other item objects exact');
ok(S?.items?.every((x,i)=>x.obligation===oldS.items[i].obligation),'all151 source author bodies unchanged');
ok(prior?.state==='OPEN_CONCLUSION_AND_LIMITATION'&&oldTyped.length===4&&nowTyped.length===7&&equal(nowTyped.slice(0,4),oldTyped),'W151 retains four old statements');
ok(equal(added,O?.restored_typed)&&equal(added.map(x=>x.id),['W02-V151-05','W02-V151-06','W02-V151-07']),'three new original author source types exact');
ok(S?.correction?.source_oracle?.git_blob_sha===pin.O&&S?.correction?.source_defect?.git_blob_sha===pin.F&&S?.correction?.negative_guard?.git_blob_sha===pin.N&&S?.correction?.old86_members_changed===0&&S?.correction?.G0_frozen===false,'new W source provenance and stage');
const totals={};for(const x of S?.items||[]){const u=x.source.match(/^W0(?:1|2|3|4[a-e]|5)/)?.[0];totals[u]=(totals[u]||0)+num(x)}
ok(totals.W02===69&&totals.W05===106&&Object.values(totals).reduce((a,b)=>a+b,0)===407,'W02=69 9 units=407');
ok(O?.schema==='isograph.exp062-w02-sv-source-first-chirality-electroweak-open.v0.1'&&O?.original?.source_revision==='arXiv:2311.00608v2'&&equal(O?.original?.html_lines,[138,143])&&equal(O?.original?.pdf_indices,[8,9])&&O?.rows?.length===5,'primary source first W02 v2 §V 138-143');
if(O?.rows?.length===5){for(let i=0;i<5;i++)ok(O.rows[i]?.ordinal===i+1&&O.rows[i]?.html?.[0]===(i?O.rows[i-1].html[1]+1:138),'source first contiguous row '+i);ok(O.rows[4]?.html?.[1]===143&&equal(O.rows.flatMap(x=>x.new_typed),added.map(x=>x.id)),'all three source new claims mapped');}
ok(O?.existing_W151_obligation_exact_string_preserved===true&&O?.full_nine_original_source_exhaustive===false&&O?.expected?.old86_member===false,'source claim preserved not source exhaustiveness');
const a=added[0],b=added[1],c=added[2];
ok(a?.modality==='SOURCE_AUTHOR_COUNTERINTUITIVE_INTERNAL_SU2L_INTERPRETATION_POSSIBILITY'&&a?.modal_scope==='COULD_PHYSICALLY_CORRESPOND_NOT_ALREADY_IDENTIFIED'&&a?.author_proposed_physical_role==='INTERNAL_NOT_SPACETIME_SYMMETRY'&&a?.negative?.includes('NO_COMPLETE_STANDARD_MODEL_CONSTRUCTION'),'author could SU2L not proven EW');
ok(b?.modality==='SOURCE_CONVENTIONAL_BOTH_CHIRAL_CONTINUATION_VS_AUTHOR_ONE_CHIRAL_PROPOSAL'&&b?.conventional?.group_symmetry_scope==='BOTH_CHIRALITIES'&&b?.alternative?.chiralities_used==='ONE'&&b?.alternative?.modality==='AUTHOR_PROPOSES_NOT_INDEPENDENT_THEOREM','both conventional vs one author proposal');
ok(c?.modality==='SOURCE_RIGHT_CHIRAL_SECTOR_GENERALIZATION_WITH_EXPLICIT_EW_NONCLOSURE'&&equal(c?.source_descriptive_cases,['SPIN_HALF_MATTER','YANG_MILLS_DYNAMICS','GENERAL_RELATIVITY_DYNAMICS'])&&c?.closure==='REQUIRES_FURTHER_INVESTIGATION'&&c?.negative?.includes('NO_ELECTROWEAK_REPRODUCTION_THEOREM_IN_SOURCE'),'matters YM GR and open EW');
ok(F?.status==='THREE_MISSING_TYPED_MODALITY_AND_COMPARISON_ROLES_W151_NOT_IN_HISTORICAL_W86'&&F?.historical_W151?.member===false&&F?.historical_W151?.old_mode==='INCOMPLETE_UNEXPANDED'&&F?.historical_W151?.qualified===false&&F?.no_author_narrative_text_changed===true&&equal(F?.gap_ids,added.map(x=>x.id)),'old W151 excluded invalid historical closure');
ok(N?.schema==='isograph.exp062-w02-sv-electroweak-nonentailment-two-models.v0.1'&&N?.source?.revision==='arXiv:2311.00608v2'&&N?.source?.not_author_mathematical_demonstration===true,'non-author nonentailment is scoped');
const model=N?.formal_abstract;
ok(model?.shared_source_antecedents?.length===4&&model?.question==='REPRODUCE_OBSERVED_ELECTROWEAK_THEORY'&&model?.new_required_link==='SPECIFICATION_OF_SU2_L_INTERNAL_COUPLINGS_AND_INTERACTIONS_NOT_SUPPLIED_BY_ABOVE_ANTECEDENTS','four shared premises do not pin EW couplings');
ok(model?.toy_models?.length===2&&model?.toy_models?.[0]?.shared_antecedents===true&&model?.toy_models?.[1]?.shared_antecedents===true&&model?.toy_models?.[0]?.reproduces_observed_EW===false&&model?.toy_models?.[1]?.reproduces_observed_EW===true&&model?.toy_models?.[0]?.electroweak_coupling_specified===false&&model?.toy_models?.[1]?.electroweak_coupling_specified===true,'logical witness two possible completions not physical models');
ok(model?.logical_result==='UNDERSPECIFIED_ANTECEDENTS_DO_NOT_ENTAIL_EW_REPRODUCTION_OR_EW_FAILURE'&&model?.negative_scope?.includes('NOT_PHYSICAL'),'non-entailment not source theorem');
ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.32'&&D?.current_source?.git_blob_sha===pin.S&&D?.predecessor_W_only_demand?.git_blob_sha===pin.oldD&&D?.items?.length===86&&D?.counts?.full_151_source_semantic_demand_qualified===false,'source-current old86 projection pointer');
ok(D?.items?.every((x,i)=>equal(x,oldD.items[i]))&&D?.items?.every(x=>x.census_id!=='W-SSC-151')&&D?.counts?.all_historical_86_items_exact_unchanged===true,'all old86 members EXACT unchanged W151 excluded');
ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.34'&&R?.source_census?.git_blob_sha===pin.S&&R?.historical_86_projection?.git_blob_sha===pin.D&&R?.predecessor_register?.git_blob_sha===pin.oldR&&R?.rows?.length===151,'all 151 source register ancestry');
ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.33'&&C?.source_census?.git_blob_sha===pin.S&&C?.reconstructed_register?.git_blob_sha===pin.R&&C?.predecessor_coverage?.git_blob_sha===pin.oldC&&C?.rows?.length===151,'coverage source row ancestry');
ok(equal(R?.rows?.filter((x,i)=>!equal(x,oldR.rows[i])).map(x=>x.census_id),['W-SSC-151'])&&equal(C?.rows?.filter((x,i)=>!equal(x,oldC.rows[i])).map(x=>x.census_id),['W-SSC-151']),'all 150 other current source registry/coverage rows exact');
if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){const s=S.items[i],r=R.rows[i],c=C.rows[i];ok(s.id===r.census_id&&s.id===c.census_id&&r.source_body_exact===s.obligation&&r.source_expression_statement_count===num(s)&&r.historical_closure_accepted_as_current===false&&c.body_length_chars===s.obligation.length&&c.source_expression_statement_count===num(s)&&c.stage_authority===false,'all 151 source tuple exact '+i);}
ok(R?.rows?.find(x=>x.census_id==='W-SSC-151')?.historical_86_member===false&&R?.rows?.find(x=>x.census_id==='W-SSC-151')?.source_expression_statement_count===7,'W151 exclusion survives');
ok(I?.source_census?.git_blob_sha===pin.S&&I?.summary?.items===151&&I?.summary?.structured_incidences===407&&I?.summary?.all_nine_original_source_reverse_exhaustive===false&&I?.units?.find(x=>x.unit==='W02')?.structured_incidences===69,'inventory all 9 and not sealed');
ok(C?.by_unit?.W02?.source_expression_statements===69&&R?.counts?.current_source_expression_units?.W02===69,'current W02 exactly 69');
ok(CI?.verified_node?.run_id===38008120874&&CI?.verified_node?.job_id===114081562411&&CI?.verified_node?.conclusion==='success'&&CI?.verified_node?.hostile_controls===63&&CI?.verified_node?.rejected===63&&CI?.verified_node?.escaped===0&&CI?.exact_input?.source_census?.git_blob_sha===pin.oldS,'preceding 0.47 CI genuine and historical for source0.48');
ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.99'&&G?.supersedes?.git_blob_sha===pin.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.98'&&G?.semantic_authority===false&&G?.track==='W','stage ancestry');
ok(G?.current_source_census?.git_blob_sha===pin.S&&G?.current_historical_86_member_projection?.git_blob_sha===pin.D&&G?.current_all_151_conservation_register?.git_blob_sha===pin.R&&G?.current_source_coverage?.git_blob_sha===pin.C,'stage G0 source tuple pins');
ok(G?.current_W02_SV_source_first?.git_blob_sha===pin.O&&G?.current_W02_SV_source_defect?.git_blob_sha===pin.F&&G?.current_W02_SV_negative?.git_blob_sha===pin.N&&G?.current_W_nine_source_inventory_015?.git_blob_sha===pin.I,'source oracle defect logical negative and inventory stage pins');
ok(prepub?.schema==='isograph.exp062-w02-sv-verifier-v01-prepublication-mutation-escape.v0.1'&&prepub?.test_result?.positive_baseline_pass===true&&prepub?.test_result?.hostile_total===59&&prepub?.test_result?.rejected===57&&prepub?.test_result?.escaped===2&&prepub?.test_result?.qualifies===false&&prepub?.prepublication_input?.not_Github_Node===true,'v0.1 prepublication failed mutation controls never qualified');
ok(G?.current_W02_SV_prepub_v01_failed?.git_blob_sha===pin.prepub&&G?.current_W02_SV_prepub_v01_failed?.qualified===false,'current gate retains v0.1 local failed evidence');
ok(G?.current_W02_SV_verifier?.git_blob_sha===sha('self')&&G?.current_W02_SV_verifier?.path===P.self,'current verifier self exact Git blob hash');
ok(G?.verification_at_record_creation?.W02_SV_NodeCI==='PENDING_CURRENT_SOURCE0_48'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','current Node and third-party not preclaimed');
ok(st?.G0_open===true&&st?.G0_complete===false&&st?.G0_frozen===false,'G0 still open');
for(const k of ['all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','source_census_frozen','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[k]===false,'no advanced W stage '+k);
return problems;}
const errors=[];for(const[k,v]of Object.entries(pin))if(sha(k)!==v)errors.push('input git blob SHA '+k);
const positive=check(input);errors.push(...positive.map(x=>'POSITIVE '+x));
const mutants=[
 ['prepublication failure falsely qualified',q=>q.prepub.test_result.qualifies=true],
 ['prepublication mutation escape erased',q=>q.prepub.test_result.escaped=0],
 ['gate prepublication failure SHA forged',q=>q.G.current_W02_SV_prepub_v01_failed.git_blob_sha='BAD'],
 ['source W151 deleted',q=>q.S.items.pop()],
 ['source W01 altered',q=>q.S.items[0].obligation+='BAD'],
 ['W151 printed author body changed',q=>q.S.items[150].obligation='BAD'],
 ['W151 original QFT assessment erased',q=>q.S.items[150].source_expression_census.statements[0].source_claim='BAD'],
 ['W151 prior [17] credit lost',q=>q.S.items[150].source_expression_census.statements[2].source_citation='[99]'],
 ['W151 3 new typed source roles omitted',q=>q.S.items[150].source_expression_census.statements.pop()],
 ['W151 author possible becomes empirically proven',q=>q.S.items[150].source_expression_census.statements[4].modal_scope='PROVED_INTERNAL_SU2_L_PHYSICAL'],
 ['W151 SU2L becomes spacetime',q=>q.S.items[150].source_expression_census.statements[4].author_proposed_physical_role='SPACETIME'],
 ['W151 Higgs completed',q=>q.S.items[150].source_expression_census.statements[4].negative=[]],
 ['W151 conventional changed to one chirality',q=>q.S.items[150].source_expression_census.statements[5].conventional.group_symmetry_scope='ONE'],
 ['W151 proposed changed to two chirality',q=>q.S.items[150].source_expression_census.statements[5].alternative.chiralities_used='BOTH'],
 ['W151 one-chiral now proven',q=>q.S.items[150].source_expression_census.statements[5].alternative.modality='THEOREM'],
 ['W151 omitted YM sector',q=>q.S.items[150].source_expression_census.statements[6].source_descriptive_cases.splice(1,1)],
 ['W151 electroweak closed',q=>q.S.items[150].source_expression_census.statements[6].closure='COMPLETE'],
 ['W151 EW theorem newly asserted',q=>q.S.items[150].source_expression_census.statements[6].negative=[]],
 ['primary source v1 substituted',q=>q.O.original.source_revision='arXiv:2311.00608v1'],
 ['primary PDF wrong index',q=>q.O.original.pdf_indices=[7,8]],
 ['source span shifted',q=>q.O.original.html_lines=[139,143]],
 ['source interval gap',q=>q.O.rows[3].html[0]=143],
 ['source last interval deleted',q=>q.O.rows.pop()],
 ['source fake extra occurrence',q=>q.O.restored_typed.push({id:'W02-V151-FAKE'})],
 ['source first falsely sealed',q=>q.O.full_nine_original_source_exhaustive=true],
 ['source defect old W151 member marked true',q=>q.F.historical_W151.member=true],
 ['source defect old mode closed primitive',q=>q.F.historical_W151.old_mode='CLOSED_PRIMITIVE'],
 ['source defect omission cleared',q=>q.F.gap_ids.pop()],
 ['source defect arbitrary repaired text',q=>q.F.no_author_narrative_text_changed=false],
 ['logical counterexample source credited as theorem',q=>q.N.source.not_author_mathematical_demonstration=false],
 ['model 0 falsely succeeds EW',q=>q.N.formal_abstract.toy_models[0].reproduces_observed_EW=true],
 ['model1 falsely fails EW',q=>q.N.formal_abstract.toy_models[1].reproduces_observed_EW=false],
 ['model shared premise removed',q=>q.N.formal_abstract.shared_source_antecedents.pop()],
 ['nonentailment coupling link fabricated source',q=>q.N.formal_abstract.new_required_link='W_SOURCE_PROVIDES_SU2_COUPLINGS'],
 ['model 0 EW coupling falsely specified',q=>q.N.formal_abstract.toy_models[0].electroweak_coupling_specified=true],
 ['nonphysical logical completions promoted',q=>q.N.formal_abstract.negative_scope='REAL_PHYSICS_MODELS_PROVEN'],
 ['W86 now 87',q=>q.D.items.push({census_id:'W-SSC-151'})],
 ['W86 one legacy member altered',q=>q.D.items[0].body='BAD'],
 ['W86 claimed full 151 current demand',q=>q.D.counts.full_151_source_semantic_demand_qualified=true],
 ['all151 register W151 falsely legacy member',q=>q.R.rows[150].historical_86_member=true],
 ['all151 register W151 source count stale4',q=>q.R.rows[150].source_expression_statement_count=4],
 ['all151 register missing row',q=>q.R.rows.pop()],
 ['coverage W151 source count stale4',q=>q.C.rows[150].source_expression_statement_count=4],
 ['coverage W02 total stale66',q=>q.C.by_unit.W02.source_expression_statements=66],
 ['current W inventory falsely complete',q=>q.I.summary.all_nine_original_source_reverse_exhaustive=true],
 ['W inventory total stale 404',q=>q.I.summary.structured_incidences=404],
 ['old CI 63/63 fabricated',q=>q.CI.verified_node.rejected=62],
 ['old CI head forged',q=>q.CI.exact_input.source_census.git_blob_sha='BAD'],
 ['current stage false G0 frozen',q=>q.G.current_lawful_state.G0_frozen=true],
 ['current stage false G1',q=>q.G.current_lawful_state.G1_authorized=true],
 ['current stage false G7',q=>q.G.current_lawful_state.G7_authorized=true],
 ['Oct03 mutable bytes falsely verified',q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['G0 full reverse falsely complete',q=>q.G.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['G0 all151 demand falsely qualified',q=>q.G.current_lawful_state.complete_W_151_semantic_demand_membership_requalified=true],
 ['gate source0.47 falsely current',q=>q.G.current_source_census.git_blob_sha=pin.oldS],
 ['gate current old86 source SHA forged',q=>q.G.current_historical_86_member_projection.git_blob_sha='WRONG'],
 ['gate current register SHA forged',q=>q.G.current_all_151_conservation_register.git_blob_sha='WRONG'],
 ['gate verifier blob forged',q=>q.G.current_W02_SV_verifier.git_blob_sha='WRONG'],
 ['gate predecessor SHA forged',q=>q.G.supersedes.git_blob_sha='WRONG'],
 ['external waiver claimed passed',q=>q.G.verification_at_record_creation.third_party='PASSED'],
 ['CI success preclaimed',q=>q.G.verification_at_record_creation.W02_SV_NodeCI='PASS'],
 ['cross track falsely authorized',q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true]
];
const rejected=[],escaped=[],crashed=[];
for(const[name,fn]of mutants){const q=dup(input),prev=JSON.stringify(q);try{fn(q);if(JSON.stringify(q)===prev)escaped.push('no effect '+name);else if(check(q).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+': '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W02 §V proposed right chirality vs unresolved electroweak G0 source-first 0.2',pass:errors.length===0,errors,positive_errors:positive,hostile_controls:mutants.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,source_items:151,source_typed:407,W02_typed:69,historical_W86_current:false,W151_historical_excluded:true,G0:'OPEN_UNFROZEN'}));
if(errors.length)process.exitCode=1;
