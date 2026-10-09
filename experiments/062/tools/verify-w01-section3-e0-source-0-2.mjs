import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"source":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_31.json","oldSource":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_30.json","register":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_17.json","oldRegister":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_16.json","coverage":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_16.json","oldCoverage":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_15.json","oracle":"experiments/062/W01_G0_E0_SPATIAL_SOURCE_ORACLE_0_1.json","historical86":"experiments/062/W_G0_W01_MAIN_SOURCE_DEMAND_PROJECTION_0_16.json","defect":"experiments/062/W01_G0_E0_SPATIAL_SOURCE_OMISSION_DEFECT_0_1.json","oldFailed":"experiments/062/W01_G0_S3_REGISTER_FLAG_BASELINE_DEFECT_0_1.json","stage":"experiments/062/W_CURRENT_STAGE_GATE_0_58.json","currentStage":"experiments/062/W_CURRENT_STAGE_GATE_0_59.json"};
const H={"source":"75dd724efbfffdcd5d475769cb5f3bea6eaaa97b","oldSource":"58cfe934b2cef6c2db0b5e4eca14c7bc1e60eb78","register":"95182dfb2d5bdec8740743325ce5a32e765d6a25","oldRegister":"23a425d58b2bf8b1936a5475c722819c5739b5d2","coverage":"ed5f6e4bb7c80f4a792997372f699b0dc707446c","oldCoverage":"b18b1a720f48d13d75e74e5480f9d5d53ef50d5b","oracle":"c0c2864aaa6f4cb7d826540f8237706ce7a997d9","historical86":"5415ad2e1e6491e89657e0f2d59804108f6bf163","defect":"0d5c2a7a398e8383324382a323332f0e961297e9","oldFailed":"bd97da22c0d3ec67fc33a3b534b0c330e4094618","stage":"981e31812f30baa204b067c049eb69a1187aef3d"};
const ids=['W-SSC-002','W-SSC-003'];
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const copy=o=>JSON.parse(JSON.stringify(o));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const get=(a,id)=>a?.items?.find(x=>x.id===id);
const load=()=>Object.fromEntries(Object.entries(P).map(([k,p])=>[k,read(p)]));
const o=load();
const suffix={"W-SSC-002":" W01 §3 contrasts earlier cited [3] and [30] proposals gauging SU(2) and Lorentz SL(2,C) inside complexified Spin(4,C) with Woit's Euclidean Spin(4) approach. Its two Euclidean factors are not interchanged: SU(2)_L is an INTERNAL WEAK YANG–MILLS gauge factor, while SU(2)_R is the SPACETIME factor whose chiral spin connection is used in the proposed gravitational sector. Both statements are source attribution and proposed roles, not a qualified interacting unification.","W-SSC-003":" W01 §3 explicitly assumes a NONZERO distinguished imaginary-time vector e_0 in Hom(S_R,S_L) to reconstruct the proposed Minkowski theory. Choosing e_0 identifies a vector x through the e_0-relative element e_0^(-1)*x in Hom(S_R,S_R); the source PRINTS e_0^(-1)*x -> g_R*e_0^(-1)*g_L^(-1)*g_L*x*g_R^(-1) = g_R*e_0^(-1)*x*g_R^(-1). For x in the e_0 direction this relative element is invariant; for spatial x it is invariant under SU(2)_L, transforms as an E3 vector under SU(2)_R, and S_R is the spin representation of the spatial SO(3) double cover SU(2)_R. Preserve inverse, factor order, e_0 choice and the two CONDITIONAL cases rather than asserting an e_0-independent isomorphism."};
function validate(d){
 const e=[],c=(v,m)=>{if(!v)e.push(m)};
 c(d.source?.schema==='woit.source-semantic-census.v0.31'&&d.source?.status==='W01_S3_NONZERO_E0_RELATIVE_SPATIAL_ACTION_SIX_SOURCE_INCIDENCES_CANDIDATE_UNFROZEN','source revision/status');
 c(d.source?.items?.length===151&&d.oldSource?.items?.length===151&&d.register?.rows?.length===151&&d.oldRegister?.rows?.length===151&&d.coverage?.rows?.length===151&&d.oldCoverage?.rows?.length===151&&d.historical86?.items?.length===86,'input shape and 151 scope');
 if(e.length)return e;
 c(d.source.predecessor?.git_blob_sha===H.oldSource&&eq(d.source.correction?.changed_W_ids,ids)&&d.source.correction?.G0_frozen===false&&d.source.correction?.G1_authorized===false,'source predecessor/correction/gate');
 c(d.source.correction?.oracle?.git_blob_sha===H.oracle&&d.source.correction?.cause?.git_blob_sha===H.defect,'independent source/defect pins');
 c(eq(d.source.items.map(x=>x.id),d.oldSource.items.map(x=>x.id)),'151 source identities/order');
 c(eq(d.register.rows.map(x=>x.census_id),d.oldRegister.rows.map(x=>x.census_id)),'151 register identities/order');
 c(eq(d.coverage.rows.map(x=>x.census_id),d.oldCoverage.rows.map(x=>x.census_id)),'151 coverage identities/order');
 for(let i=0;i<151;i++){
  const a=d.oldSource.items[i],b=d.source.items[i],ra=d.oldRegister.rows[i],rb=d.register.rows[i],ca=d.oldCoverage.rows[i],cb=d.coverage.rows[i],chg=ids.includes(a.id);
  if(!chg){c(eq(a,b),'other source body changed '+a.id);c(eq(ra,rb),'other register row changed '+a.id);c(eq(ca,cb),'other coverage row changed '+a.id);}
  c(rb.source_body_exact===b.obligation&&rb.source_expression_statement_count===(b.source_expression_census?.statements?.length||0),'register source body/formulas mismatch '+a.id);
  c(cb.body_length_chars===b.obligation.length&&cb.source_expression_statement_count===(b.source_expression_census?.statements?.length||0),'coverage source body/formulas mismatch '+a.id);
  c(rb.historical_closure_accepted_as_current===false&&rb.G0_status==='SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING'&&cb.stage_authority===false,'unqualified row promotion '+a.id);
  if(chg){c(b.obligation===a.obligation+suffix[a.id]&&b.source===a.source&&b.state===a.state,'target source body additive exact '+a.id);c(eq(b.source_expression_census?.statements,d.oracle.claims?.[a.id])&&b.source_expression_census?.source_revision==='arXiv:2104.05099v2','oracle mismatch '+a.id);c(rb.historical_86_member===false&&ra.historical_86_member===false,'historical W86 wrongly moved '+a.id);}
 }
 c(d.source.items.filter(x=>x.source?.startsWith('W01')).reduce((n,x)=>n+(x.source_expression_census?.statements?.length||0),0)===107,'W01 107 expressions');
 c(d.oldSource.items.filter(x=>x.source?.startsWith('W01')).reduce((n,x)=>n+(x.source_expression_census?.statements?.length||0),0)===101,'W01 predecessor 101 expressions');
 const a=get(d.source,ids[0])?.source_expression_census?.statements,b=get(d.source,ids[1])?.source_expression_census?.statements;
 if(!Array.isArray(a)||!Array.isArray(b)||a.length!==2||b.length!==4){e.push('S3 formula incident arrays absent/changed');return e;}
 c(a.length===2&&b.length===4&&d.oracle.counts?.source_incidents===6,'2/4 source expression split');
 c(eq(a[0].source_citations,['[3]','[30]'])&&a[0].author_contrast==='EUCLIDEAN_SPIN4_INSTEAD_OF_PRIOR_COMPLEXIFIED_APPROACH','citation authorship contrast');
 c(eq(a?.[1]?.factor_roles?.map(x=>x.factor),['SU(2)_L','SU(2)_R'])&&a?.[1]?.factor_roles?.[0]?.role==='INTERNAL_WEAK_SYMMETRY'&&a?.[1]?.factor_roles?.[1]?.role==='SPACETIME_ROTATION_SYMMETRY','opposite SU2 roles');
 c(b[0].source_predicate==='NONZERO_AND_IMAGINARY_TIME_DIRECTION'&&b[0].carrier==='Hom(S_R,S_L)','nonzero e0 source premise');
 c(b[1].expression==='e_0^{-1} x'&&b[1].result_carrier==='Hom(S_R,S_R)'&&b[1].source_choice==='e_0 nonzero imaginary-time vector','relative x type and inverse');
 c(eq(b[2].ordered_middle_factors,['g_R','e_0^{-1}','g_L^{-1}','g_L','x','g_R^{-1}'])&&eq(b[2].ordered_reduced_factors,['g_R','e_0^{-1}','x','g_R^{-1}']),'ordered transform and cancellation');
 c(b[2].source_printed_equality==='g_R e_0^{-1} g_L^{-1} g_L x g_R^{-1} = g_R e_0^{-1} x g_R^{-1}','source exact printed equality');
 c(b?.[3]?.cases?.[0]?.premise==='x in e0 direction'&&b?.[3]?.cases?.[1]?.consequences?.[0]==='e_0^{-1}x invariant under SU(2)_L'&&b?.[3]?.cases?.[1]?.consequences?.[1]==='e_0^{-1}x transforms as usual E3 vector under SU(2)_R','conditional temporal and spatial cases');
 c(d.oracle?.source?.frozen_revision==='arXiv:2104.05099v2'&&d.oracle?.source?.printed_page===6&&d.defect?.earliest_affected_stage==='G0_ASSERTION_CONSERVATION','primary source revision and earliest defect');
 c(d.historical86.current_source?.git_blob_sha===H.oldSource&&d.historical86.items.every(x=>!ids.includes(x.census_id)),'historical86 hash-only repair forbidden');
 c(d.register.source_census?.git_blob_sha===H.source&&d.register.predecessor_register?.git_blob_sha===H.oldRegister&&d.register.counts?.W01_source_expressions_total===107,'register pins/count');
 c(d.coverage.source_census?.git_blob_sha===H.source&&d.coverage.reconstructed_register?.git_blob_sha===H.register&&d.coverage.predecessor_coverage?.git_blob_sha===H.oldCoverage&&d.coverage.by_unit?.W01?.source_expression_statements===107,'coverage pins/count');
 c(d.register.counts?.historical_nonmembers===65&&d.register.counts?.old_projection_omits_old_incomplete===52&&d.register.counts?.old_projection_includes_old_closed_schema===8,'historical omissions');
 c(d.register.policy?.G1_authorized===false&&d.register.policy?.source_revision_Oct03_mutable_bytes_verified===false&&d.coverage.counts?.original_nine_source_reverse_assertion_enumeration_complete===false,'no premature full source census');
 c(d.oldFailed.status==='PREPUBLICATION_REGISTER_VERIFIER_FALSE_BASELINE_REQUIREMENT_PRESERVED'&&d.oldFailed.actual_source?.predecessor_true_flag_count===45,'failed-prepublication fixture kept');
 const g=d.stage;
 c(g?.schema==='isograph.exp062-w-current-stage-gate.v0.58'&&g?.current_source_census?.frozen===false&&g?.status==='W_G0_SSC0_31_W01_PRINTED_P6_E0_RELATIVE_SPATIAL_ACTION_SOURCE_RESTORED_151_UNFROZEN','current W0.58 gate');
 c(g?.supersedes?.git_blob_sha==='75c2927216a9d4f0452f695bae97a33f06550ac5'&&g?.current_source_census?.git_blob_sha===H.source&&g?.current_all_151_conservation_register?.git_blob_sha===H.register&&g?.current_source_coverage?.git_blob_sha===H.coverage,'stage source pins');
 c(g?.current_historical_86_member_projection?.git_blob_sha===H.historical86&&g?.current_historical_86_member_projection?.qualification===false,'old W demand stale/qualified false');
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])c(g?.current_lawful_state?.[key]===false,'unlawful stage promotion '+key);
 c(g?.current_lawful_state?.G0_open===true,'G0 not open');
 c(d.source.closure_claims?.sealed===false,'premature source seal');
 const cur=d.currentStage;
 c(cur?.schema==='isograph.exp062-w-current-stage-gate.v0.59'&&cur?.status==='W_G0_W01_S3_CORRECTED_VERIFIERS_CI_PENDING_SOURCE_UNFROZEN','successor W stage gate identity');
 c(cur?.supersedes?.git_blob_sha===H.stage&&cur?.current_source_census?.git_blob_sha===H.source&&cur?.current_source_census?.frozen===false,'successor gate source/supersedes pins');
 for(const k of ['G0_complete','G0_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','DP_authorized','cross_track_synthesis_authorized']) c(cur?.current_lawful_state?.[k]===false,'successor stage unauthorized '+k);
 return e;
}
const mutants=[
['lose prior citation',x=>{get(x.source,ids[0]).source_expression_census.statements[0].source_citations.pop()}],
['misattribute prior contrast',x=>{get(x.source,ids[0]).source_expression_census.statements[0].author_contrast='WOIT_ADOPTED'}],
['reverse SU2 roles',x=>{get(x.source,ids[0]).source_expression_census.statements[1].factor_roles.reverse()}],
['drop nonzero e0',x=>{get(x.source,ids[1]).source_expression_census.statements[0].source_predicate='ANY_E0'}],
['change e0 Hom carrier',x=>{get(x.source,ids[1]).source_expression_census.statements[0].carrier='Hom(S_R,S_R)'}],
['remove relative inverse',x=>{get(x.source,ids[1]).source_expression_census.statements[1].expression='e_0 x'}],
['flip Hom result',x=>{get(x.source,ids[1]).source_expression_census.statements[1].result_carrier='Hom(S_L,S_L)'}],
['swap outer gR',x=>{get(x.source,ids[1]).source_expression_census.statements[2].ordered_middle_factors[0]='g_L'}],
['wrong inner inverse',x=>{get(x.source,ids[1]).source_expression_census.statements[2].ordered_middle_factors[2]='g_R^{-1}'}],
['wrong inner cancellation',x=>{get(x.source,ids[1]).source_expression_census.statements[2].ordered_middle_factors[3]='g_R'}],
['wrong final inverse',x=>{get(x.source,ids[1]).source_expression_census.statements[2].ordered_reduced_factors[3]='g_R'}],
['wrong printed equality',x=>{get(x.source,ids[1]).source_expression_census.statements[2].source_printed_equality='FALSE'}],
['wrong temporal scope',x=>{get(x.source,ids[1]).source_expression_census.statements[3].cases[0].premise='x any vector'}],
['wrong spatial chirality',x=>{get(x.source,ids[1]).source_expression_census.statements[3].cases[1].consequences[1]='under SU(2)_L'}],
['drop source W item',x=>{x.source.items.pop()}],
['drop register W row',x=>{x.register.rows.pop()}],
['drop coverage W row',x=>{x.coverage.rows.pop()}],
['mutate unrelated W formula',x=>{get(x.source,'W-SSC-027').obligation+=' FORGED'}],
['mutate unrelated W register',x=>{x.register.rows[4].source_body_exact+=' FORGED'}],
['mutate unrelated W coverage',x=>{x.coverage.rows[3].source_expression_statement_count=100}],
['joint source register body forgery',x=>{get(x.source,ids[0]).obligation+=' FORGED';x.register.rows[1].source_body_exact+=' FORGED'}],
['replace historical W86 source pin',x=>{x.historical86.current_source.git_blob_sha=H.source}],
['inject nonmember into historical W86',x=>{x.historical86.items.push({census_id:ids[0]})}],
['remove historical incomplete omissions',x=>{x.register.counts.old_projection_omits_old_incomplete=0}],
['suppress historical closed schema',x=>{x.register.counts.old_projection_includes_old_closed_schema=0}],
['forge oct03 identity',x=>{x.register.policy.source_revision_Oct03_mutable_bytes_verified=true}],
['mutate standalone source oracle',x=>{x.oracle.claims[ids[1]][2].ordered_middle_factors[0]='g_L'}],
['mutate source and oracle together',x=>{get(x.source,ids[1]).source_expression_census.statements[2].ordered_middle_factors[0]='g_L';x.oracle.claims[ids[1]][2].ordered_middle_factors[0]='g_L'}],
['premature current source freeze',x=>{x.stage.current_source_census.frozen=true}],
['premature G0 freeze',x=>{x.stage.current_lawful_state.G0_frozen=true}],
['premature G1 authority',x=>{x.stage.current_lawful_state.G1_authorized=true}],
['premature G7 authority',x=>{x.stage.current_lawful_state.G7_authorized=true}],
['premature source-wide coverage',x=>{x.stage.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true}],
['wrong W01 structured count',x=>{x.coverage.by_unit.W01.source_expression_statements=106}],
['delete source statement',x=>{get(x.source,ids[0]).source_expression_census.statements.pop()}],
 ['delete factor roles',x=>{delete get(x.source,ids[0]).source_expression_census.statements[1].factor_roles}],
 ['delete temporal spatial case list',x=>{delete get(x.source,ids[1]).source_expression_census.statements[3].cases}],
 ['source and register plus coverage joint text forgery',x=>{get(x.source,ids[0]).obligation+=' FORGED';x.register.rows[1].source_body_exact+=' FORGED';x.coverage.rows[1].body_length_chars+=7}],
 ['successor premature source freeze',x=>{x.currentStage.current_source_census.frozen=true}],
 ['successor premature G1',x=>{x.currentStage.current_lawful_state.G1_authorized=true}],
 ['candidate source prematurely sealed',x=>{x.source.closure_claims.sealed=true}]
];
const baseline=validate(o);
if(baseline.length){console.log(JSON.stringify({baseline_pass:false,errors:baseline}));process.exitCode=1;}else{
const rejected=[],escaped=[],crashed=[];
for(const [name,f] of mutants){const x=copy(o),before=JSON.stringify(x);try{f(x);if(JSON.stringify(x)===before){crashed.push(name+' mutation ineffective');continue}const failure=validate(x);if(failure.length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+' threw '+String(e))}}
const sha_errors=Object.entries(H).filter(([k,v])=>sha(P[k])!==v).map(([k])=>'FROZEN_SHA_MISMATCH '+k);
const errors=[...sha_errors,...escaped.map(x=>'MUTATION_ESCAPED '+x),...crashed.map(x=>'MUTATION_NOT_CONTROLLED '+x)];
console.log(JSON.stringify({schema:'isograph.exp062-w01-section3-e0-source-validator.v0.2',pass:errors.length===0,errors,source_items:151,W01_incident_count:107,unchanged_W_source_items:149,unchanged_151_register_and_coverage_rows:149,historical_W86_member_count:86,historical86_rebased:false,adversarial_mutations:mutants.length,rejected:rejected.length,rejected,scope:'W01 printed p6 §3 source only G0 UNFROZEN - historical SSC0.31 unchanged',external_review:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(errors.length)process.exitCode=1;
}