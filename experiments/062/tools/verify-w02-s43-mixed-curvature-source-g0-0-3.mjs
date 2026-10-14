import fs from 'node:fs';
import crypto from 'node:crypto';
const P={
 oldG:'experiments/062/W_CURRENT_STAGE_GATE_0_74.json',
 G:'experiments/062/W_CURRENT_STAGE_GATE_0_75.json',
 S:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_36.json',
 R:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_22.json',
 C:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_21.json',
 D:'experiments/062/W_G0_W05_S61_BRAUER_SOURCE_DEMAND_PROJECTION_0_20.json',
 W103ci:'experiments/062/W05_G0_W103_CP1_NODE_CI_RESULT_0_1.json',
 W02oracle:'experiments/062/W02_G0_S43_CHIRAL_CURVATURE_SOURCE_FIRST_0_1.json',
 W02witness:'experiments/062/W02_G0_S43_MIXED_BLOCK_NEGATIVE_CONTROL_0_1.json',
 W103oracle:'experiments/062/W05_G0_W103_SOURCE_FIRST_CONJUNCTION_REVERSE_0_1.json',
 W103negative:'experiments/062/W05_G0_W103_CP1_PRINTED_FILTRATION_FALSIFIER_0_1.json',
 fail:'experiments/062/W02_G0_S43_VERIFIER_0_1_POSITIVE_FAILURE_0_1.json',
 fail2:'experiments/062/W02_G0_S43_VERIFIER_0_2_POSITIVE_FAILURE_0_1.json',
 self:'experiments/062/tools/verify-w02-s43-mixed-curvature-source-g0-0-3.mjs'
};
const pins={"oldG":"6b214062562b47f5a19c982dd2399d329fe05e15","S":"631cd8b54e34ccca5b4a6de050a3136d3a26de7b","R":"184bdfec1607c047e088c8e7ca514e72f339bfa4","C":"5f802bc063d1a84124b6e86607e5d25331c7e88f","D":"bf8fefd99f69d6a6d22c59de2c2380456d35e37a","W103ci":"163aa89f789a72ee32d8f1975780f1432ddd7fac","W02oracle":"7ac32b4ec3ab9c4a90debdb73f2c58e4d322dafa","W02witness":"0e55755baa7e41299e7044d61bce31571daee80f","W103oracle":"81c0e2d5fa18f3a4ce868f2c69b369e561a7e904","W103negative":"2c6786ae62c057ea9fb6e8a35653c69444f92412","fail":"ed9e239f3633401765b8ca2c77655af828345c7f","fail2":"21d1ecb58f16a42b7870456efe0892b284a4dac1"};
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{let b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),copy=x=>JSON.parse(JSON.stringify(x));
const inputs=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,read(k)]));
const rat=x=>Math.abs(x)<1e-12?'0':Math.abs(x-0.5)<1e-12?'1/2':Math.abs(x+0.5)<1e-12?'-1/2':Math.abs(x-1)<1e-12?'1':Math.abs(x+1)<1e-12?'-1':String(x);
function build(k1,k2){
 const eig=[k1,0,0,k2,0,0], T=Array.from({length:6},()=>Array(6).fill(0)), pairs=[[0,3],[1,4],[2,5]];
 for(let i=0;i<3;i++){let [a,b]=pairs[i];T[a][i]=1/Math.sqrt(2);T[b][i]=1/Math.sqrt(2);T[a][i+3]=1/Math.sqrt(2);T[b][i+3]=-1/Math.sqrt(2)}
 const gram=Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>T.reduce((a,row)=>a+row[i]*row[j],0)));
 const mixed=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>T.reduce((a,row,z)=>a+row[i]*eig[z]*row[j+3],0)));
 return {eig,gram,mixed,ric:[k1,k1,k2,k2]};
}
function verify(q){
 const errors=[],ok=(x,m)=>{if(!x)errors.push(m)};
 const {oldG,G,S,R,C,D,W103ci,W02oracle,W02witness,W103oracle,W103negative,fail,fail2}=q,st=G?.current_lawful_state;
 const w=S?.items?.find(x=>x.id==='W-SSC-148'),rr=R?.rows?.find(x=>x.census_id==='W-SSC-148'),cr=C?.rows?.find(x=>x.census_id==='W-SSC-148');
 const expressions=w?.source_expression_census?.statements||[],sourceP=expressions.find(x=>x.id==='W02-COLD-CURV-BLOCK-01'),sourceE=expressions.find(x=>x.id==='W02-COLD-CURV-BLOCK-02');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.75'&&G?.track==='W'&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===pins.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.74','G0 gate successor current');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D,'all unchanged exact SSC0.36 source tuple');
 ok(G?.current_W02_chiral_curvature_source_first?.git_blob_sha===pins.W02oracle&&G?.current_W02_nonEinstein_mixed_block_witness?.git_blob_sha===pins.W02witness&&G?.current_W103_negative_NodeCI?.git_blob_sha===pins.W103ci,'W02 and W103 exact artifacts');
 ok(G?.current_W02_negative_curvature_verifier?.path===P.self&&G?.current_W02_negative_curvature_verifier?.git_blob_sha===sha('self'),'W02 verifier self pin');
 ok(G?.W05_W103_source_first_conjunction_oracle?.git_blob_sha===pins.W103oracle&&G?.W05_W103_CP1_literal_conjunction_counterexample?.git_blob_sha===pins.W103negative,'W103 source first still pinned intact');
 ok(S?.schema==='woit.source-semantic-census.v0.36'&&S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false,'original source census all 151 still open');
 ok(S?.items?.find(x=>x.id==='W-SSC-103')?.source_expression_census?.statements?.length===2,'previous W103 source typed unchanged');
 ok(w?.state==='OPEN'&&w?.source==='W02 §IV.3'&&w?.obligation?.includes('block diagonal form')&&w?.obligation?.includes('OFF-DIAGONAL blocks'),'source W148 author both phrases not rewritten');
 ok(expressions.length===2&&sourceP?.source_phrase==='This has a block diagonal form'&&same(sourceP?.decomposition,[3,3])&&sourceP?.acting_space==='SIX_DIMENSIONAL_TWO_FORMS','source phrase and 3+3 structure');
 ok(sourceE?.operator==='VANISHING_OFF_DIAGONAL_CURVATURE_BLOCKS'&&sourceE?.condition==='EINSTEIN_EQUATIONS'&&same(sourceE?.source_citations,['[14]','[13]']),'source Einstein mixed block condition distinct from general structure');
 ok(R?.rows?.length===151&&C?.rows?.length===151&&D?.items?.length===86&&rr?.source_body_exact===w?.obligation&&rr?.source_expression_statement_count===2&&cr?.source_expression_statement_count===2&&cr?.stage_authority===false,'W148 source/register/coverage plus historical W86 untouched');
 ok(W02oracle?.source?.revision==='arXiv:2311.00608v2'&&W02oracle?.source?.section==='IV.3'&&same(W02oracle?.source?.html_lines,[123,137])&&W02oracle?.source?.pdf_index===7&&W02oracle?.rows?.length===7,'W02 original source-first 7 intervals');
 if(W02oracle?.rows?.length===7){for(let i=0;i<7;i++)ok(W02oracle.rows[i]?.ordinal===i+1&&W02oracle.rows[i]?.html_lines?.[0]===(i?W02oracle.rows[i-1].html_lines[1]+1:123),'W02 line interval '+i);ok(W02oracle.rows[6]?.html_lines?.[1]===137&&same(W02oracle.rows[3]?.exact_author_phrases,['This has a block diagonal form','the Einstein equations correspond to vanishing of the off-diagonal blocks']),'W02 core original two phrases')}
 ok(W02oracle?.checked_existing_item?.added_source_incidents===0&&W02oracle?.checked_existing_item?.source_census_changed===false&&W02oracle?.checked_existing_item?.original_both_author_phrases_conserved===true&&W02oracle?.full_nine_source_reverse_qualified===false&&W02oracle?.cited_target_mathematics_imported===false,'source already conserved no edit/no thirdparty theorem');
 ok(W02witness?.schema==='isograph.exp062-w02-curvature-self-anti-mixed-block-negative.v0.1'&&W02witness?.status==='INDEPENDENT_NON_AUTHOR_MATHEMATICAL_NEGATIVE_WITNESS_NOT_SOURCE_CORRECTION','non-author scope type');
 ok(W02witness?.source_context?.revision==='arXiv:2311.00608v2'&&W02witness?.source_context?.existing_item==='W-SSC-148'&&W02witness?.source_context?.source_printed_two_roles?.length===2,'source scope location preserved');
 const a=W02witness?.analytic_construction;
 ok(same(a?.ordered_twoform_basis,['e12','e13','e14','e34','e42','e23'])&&same(a?.real_hodge_star_pairs,[['e12','e34'],['e13','e42'],['e14','e23']]),'correct oriented wedge/Hodge pairs');
 ok(same(a?.plus_basis,['(e12+e34)/sqrt2','(e13+e42)/sqrt2','(e14+e23)/sqrt2'])&&same(a?.minus_basis,['(e12-e34)/sqrt2','(e13-e42)/sqrt2','(e14-e23)/sqrt2']),'chiral basis exact');
 ok(a?.curvature_wedge_matrix_rule==='diag(k1,0,0,k2,0,0)'&&a?.curvature_chiral_block_rule==='B_plus_minus = diag((k1-k2)/2,0,0)'&&a?.for_this_family_only_Einstein_criterion==='k1=k2','conditional analytic operator factor');
 function caseTest(v,shouldEinstein,label){
  ok(v?.k1===1&&v?.k2===(shouldEinstein?1:0),'matched curvature parameters '+label);
  const calc=build(v?.k1,v?.k2),recorded=calc.mixed.map(row=>row.map(rat)), allSame=calc.ric.every(x=>x===calc.ric[0]);
  ok(calc.gram.every((row,i)=>row.every((x,j)=>Math.abs(x-(i===j?1:0))<1e-12)),'orthonormal plus/minus change basis '+label);
  ok(same(v?.six_twoform_curvature_eigenvalues,calc.eig)&&same(v?.mixing_block,recorded),'direct independent six-dimensional curvature and mixed block '+label);
  ok(same(v?.Ricci_eigenvalues,calc.ric)&&v?.Einstein===allSame&&v?.mixed_block_zero===calc.mixed.every(row=>row.every(x=>Math.abs(x)<1e-12)),'Ricci and Einstein status '+label);
  ok((calc.mixed[0][0]==0)===shouldEinstein,'contrast non-Einstein and equal curvature '+label);
 }
 caseTest(W02witness?.negative_case,false,'negative S2T2');
 caseTest(W02witness?.paired_control,true,'paired S2S2');
 ok(W02witness?.conclusions?.disproven_scope==='ALL_RIEMANNIAN_FOUR_DIMENSIONAL_CURVATURE_ENDOMORPHISMS_IDENTICALLY_BLOCK_DIAGONAL_IN_SELFDUAL_ANTI_SELFDUAL_BASIS'&&W02witness?.conclusions?.not_disproven?.includes('EINSTEIN_OFFDIAGONAL_ZERO_CONDITION_IN_APPROPRIATE_CONTEXT')&&W02witness?.conclusions?.not_disproven?.includes('WOIT_PHYSICAL_UNIFICATION_HYPOTHESIS'),'negative only universal block claim');
 ok(G?.current_W02_v01_failed_NodeCI?.git_blob_sha===pins.fail&&G?.current_W02_v01_failed_NodeCI?.run_id===37973537552&&G?.current_W02_v01_failed_NodeCI?.positive_baseline_pass===false,'failed v0.1 exact pin and disqualification');
 ok(fail?.run?.id===37973537552&&fail?.run?.job_id===113965941081&&fail?.run?.head_sha==='1dea98efe57928a1da5c4e9b2cc1be24644e1728'&&fail?.run?.conclusion==='failure'&&fail?.run?.positive_baseline_pass===false&&fail?.run?.score_not_qualified===true,'previous positive baseline explicitly failed');
 ok(fail?.run?.mutations_total===42&&fail?.run?.mutations_rejected===42&&fail?.run?.mutations_escaped===0&&fail?.run?.positive_errors?.[0]==='source already conserved no edit/no thirdparty theorem','42 old controls NOT qualified');
 ok(fail?.failed_verifier?.blob_sha==='ace7f6b29cda0b6ef7ce804dc3a573fe76997d8e'&&fail?.source_fixture?.source_correct_fields?.source_census_changed===false&&fail?.source_fixture?.source_correct_fields?.added_source_incidents===0,'fixture bug exact and repaired');
 ok(G?.current_W02_v02_failed_NodeCI?.git_blob_sha===pins.fail2&&G?.current_W02_v02_failed_NodeCI?.run_id===37973892281&&G?.current_W02_v02_failed_NodeCI?.positive_baseline_pass===false,'second failed positive oracle immutable');
 ok(fail2?.schema==='isograph.exp062-w02-s43-mixed-block-verifier-v02-positive-failure.v0.1'&&fail2?.run?.head_sha==='4c4334d818d084152de23744df259163642cdd4c'&&fail2?.run?.job_id===113967147587&&fail2?.run?.positive_baseline_pass===false&&fail2?.run?.mutation_score_qualified===false&&fail2?.run?.mutations_total===46&&fail2?.run?.mutations_rejected===46,'v0.2 failed unmutated and 46 unqualified');
 ok(fail2?.causes?.[0]?.id==='P_SWAP'&&fail2?.causes?.[1]?.id==='SOURCE_COMPLETE_FIELD','root causes retained');
 ok(W02witness?.conclusions?.source_unchanged===true&&W02witness?.conclusions?.source_census_blob_sha===pins.S&&W02witness?.conclusions?.current_G0_frozen===false&&W02witness?.conclusions?.third_party_review==='OWNER_BYPASSED_NOT_PASSED','no author repair or external qualification');
 const prior=W103ci?.confirmed_GitHub_Actions;
 ok(W103ci?.input?.head_sha==='73c11f974788b7cc0e2297b10b09f17e7eed3c0e'&&W103ci?.input?.source_census?.git_blob_sha===pins.S&&prior?.run_id===37972460893&&prior?.job_id===113962282840&&prior?.conclusion==='SUCCESS'&&prior?.positive_baseline==='PASS','actual previous W103 source CI pinned');
 ok(prior?.hostile_controls===41&&prior?.rejected===41&&prior?.escaped===0&&prior?.crashed===0&&prior?.source_items===151&&prior?.source_structured_incidents===327,'W103 successful 41/41 with no escapes');
 ok(W103ci?.qualification_limits?.G0_frozen===false&&W103ci?.qualification_limits?.third_party==='OWNER_BYPASSED_NOT_PASSED','prior CI not all source qualified');
 ok(G?.verification_at_record_creation?.W02_S43_NodeCI==='PENDING_V0_3_NODE_CURRENT_HEAD'&&G?.verification_at_record_creation?.W05_W103_CP1_NodeCI==='PASS_SHA_73c11f974788b7cc0e2297b10b09f17e7eed3c0e_RUN_37972460893_41_OF_41'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','W02 new CI pending, W103 past CI correct');
 ok(st?.G0_open===true,'G0 remains OPEN');
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[key]===false,'stage blocked '+key);
 return errors;
}
const errs=[];for(const[k,v]of Object.entries(pins)){let f={oldG:'oldG',S:'S',R:'R',C:'C',D:'D',W103ci:'W103ci',W02oracle:'W02oracle',W02witness:'W02witness',W103oracle:'W103oracle',W103negative:'W103negative',fail:'fail',fail2:'fail2'}[k];if(sha(f)!==v)errs.push('input source SHA mismatch '+k)}
const positive=verify(inputs);errs.push(...positive.map(x=>'POSITIVE '+x));
const cases=[
 ['false current G1',x=>x.G.current_lawful_state.G1_authorized=true],
 ['false G0 freeze',x=>x.G.current_lawful_state.G0_frozen=true],
 ['false full reverse',x=>x.G.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['false oct03 source bytes',x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['false cross-track synthesis',x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true],
 ['stale old gate',x=>x.G.supersedes.git_blob_sha='BAD'],
 ['stale source pin',x=>x.G.current_source_census.git_blob_sha='BAD'],
 ['oracle pin forged',x=>x.G.current_W02_chiral_curvature_source_first.git_blob_sha='BAD'],
 ['witness pin forged',x=>x.G.current_W02_nonEinstein_mixed_block_witness.git_blob_sha='BAD'],
 ['CI pin forged',x=>x.G.current_W103_negative_NodeCI.git_blob_sha='BAD'],
 ['self pin forged',x=>x.G.current_W02_negative_curvature_verifier.git_blob_sha='BAD'],
 ['source W148 removed',x=>x.S.items.splice(x.S.items.findIndex(y=>y.id==='W-SSC-148'),1)],
 ['source W148 wording erased',x=>x.S.items.find(y=>y.id==='W-SSC-148').obligation='BAD'],
 ['source W148 block phrase altered',x=>x.S.items.find(y=>y.id==='W-SSC-148').source_expression_census.statements[0].source_phrase='no block'],
 ['source Einstein condition lost',x=>x.S.items.find(y=>y.id==='W-SSC-148').source_expression_census.statements[1].operator='ALWAYS_ZERO'],
 ['source Einstein [14] attribution lost',x=>x.S.items.find(y=>y.id==='W-SSC-148').source_expression_census.statements[1].source_citations.pop()],
 ['source chiral partition wrong',x=>x.S.items.find(y=>y.id==='W-SSC-148').source_expression_census.statements[0].decomposition=[2,4]],
 ['register W148 fake',x=>x.R.rows.find(y=>y.census_id==='W-SSC-148').source_body_exact='WRONG'],
 ['coverage W148 fake',x=>x.C.rows.find(y=>y.census_id==='W-SSC-148').source_expression_statement_count=1],
 ['historical86 shortened',x=>x.D.items.pop()],
 ['W02 oracle version v1',x=>x.W02oracle.source.revision='arXiv:2311.00608v1'],
 ['W02 fixture source census flag forged',x=>x.W02oracle.checked_existing_item.source_census_changed=true],
 ['W02 source phrasing original credit forged',x=>x.W02oracle.checked_existing_item.original_both_author_phrases_conserved=false],
 ['failed Node v01 becomes success',x=>x.fail.run.conclusion='success'],
 ['failed v01 mutant score falsely qualified',x=>x.fail.run.score_not_qualified=false],
 ['v02 wrongly reports success',x=>x.fail2.run.positive_baseline_pass=true],
 ['v02 mutants misqualified',x=>x.fail2.run.mutation_score_qualified=true],
 ['v02 failure SHA forged',x=>x.G.current_W02_v02_failed_NodeCI.git_blob_sha='STALE'],
 ['W02 oracle source gap',x=>x.W02oracle.rows[3].html_lines[0]=132],
 ['W02 oracle missing source row',x=>x.W02oracle.rows.pop()],
 ['W02 oracle block diagonal phrase erased',x=>x.W02oracle.rows[3].exact_author_phrases[0]='BLOCK STRUCTURE'],
 ['W02 oracle prematurely source closed',x=>x.W02oracle.nine_source_full_reverse_qualified=true],
 ['W02 witness wrong selfdual basis',x=>x.W02witness.analytic_construction.plus_basis[0]='(e12-e34)/sqrt2'],
 ['W02 witness wrong orientation',x=>x.W02witness.analytic_construction.real_hodge_star_pairs[0][1]='e23'],
 ['W02 witness first factor curvature wrong',x=>x.W02witness.negative_case.k1=2],
 ['W02 witness second factor nonflat',x=>x.W02witness.negative_case.k2=1],
 ['W02 witness curvature eig wrong',x=>x.W02witness.negative_case.six_twoform_curvature_eigenvalues[0]=2],
 ['W02 witness offdiag falsely zero',x=>x.W02witness.negative_case.mixing_block[0][0]='0'],
 ['W02 witness nonEinstein falsely Einstein',x=>x.W02witness.negative_case.Einstein=true],
 ['W02 witness Ricci false equal',x=>x.W02witness.negative_case.Ricci_eigenvalues=[1,1,1,1]],
 ['paired Einstein offdiag falsely nonzero',x=>x.W02witness.paired_control.mixing_block[0][0]='1/2'],
 ['paired Einstein status falsely nonEinstein',x=>x.W02witness.paired_control.Einstein=false],
 ['paired control k2 wrong',x=>x.W02witness.paired_control.k2=0],
 ['witness source text falsely rewritten',x=>x.W02witness.conclusions.source_unchanged=false],
 ['witness wrongly refutes source Einstein condition',x=>x.W02witness.conclusions.not_disproven=x.W02witness.conclusions.not_disproven.filter(y=>y!=='EINSTEIN_OFFDIAGONAL_ZERO_CONDITION_IN_APPROPRIATE_CONTEXT')],
 ['prior W103 CI fabricated',x=>x.W103ci.confirmed_GitHub_Actions.conclusion='FAIL'],
 ['prior W103 41/41 fabricated',x=>x.W103ci.confirmed_GitHub_Actions.rejected=40],
 ['W02 CI falsely prepassed',x=>x.G.verification_at_record_creation.W02_S43_NodeCI='PASS'],
 ['third-party falsely qualified',x=>x.G.verification_at_record_creation.third_party='PASS']
];
const rejected=[],escaped=[],crashed=[];
for(const[name,fn]of cases){const q=copy(inputs),before=JSON.stringify(q);try{fn(q);if(before===JSON.stringify(q))escaped.push(name+':NO_EFFECT');else if(verify(q).length)rejected.push(name);else escaped.push(name)}catch(err){crashed.push(name+':'+err.message)}}
errs.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W02 §IV.3 source chiral curvature non-Einstein mixed block G0 0.1',pass:errs.length===0,errors:errs,positive_errors:positive,hostile_controls:cases.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,source_items:151,source_typed_incidents:327,source_text_changed:false,negative_mixing:'1/2',paired_mixing:'0',W103_previous_Node:'41/41_PASS_HISTORICAL_CURRENT_SOURCE',stage:'G0_OPEN_UNFROZEN',verifier_version:'0.3'}));
if(errs.length)process.exitCode=1;
