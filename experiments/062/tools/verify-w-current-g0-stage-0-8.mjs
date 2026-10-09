import fs from 'node:fs';
import crypto from 'node:crypto';
const P={g:'experiments/062/W_CURRENT_STAGE_GATE_0_68.json',old:'experiments/062/W_CURRENT_STAGE_GATE_0_67.json',ci:'experiments/062/W05_G0_SECTION8_CORRECTED_NODE_CI_RESULT_0_1.json',provenance:'experiments/062/W_G0_MUTABLE_SOURCE_BYTE_RECOVERY_AUDIT_0_1.json',s:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_34.json',r:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_20.json',c:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_19.json',v:'experiments/062/tools/verify-w-current-g0-stage-0-8.mjs'};
const pins={old:'03fdcee964d9d7ec975fb7796c294bc2e443a22d',ci:'39ffe0b0dd8e9ef72d3d660ec7abc62919115cdf',provenance:'600710ed5a125b67c0aaf0be1dececa4e2f95d32',s:'115f62f1ebb801b1e0f8ccb1cbe8f8821dc8611b',r:'73f02fc7e4ac28d6bb46541922dd06ceba87908e',c:'d68c1c4409547f42b8991a0dd89f2421808d3f50'};
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const load=k=>JSON.parse(fs.readFileSync(P[k],'utf8')),dup=q=>JSON.parse(JSON.stringify(q)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const input=Object.fromEntries(['g','old','ci','provenance','s','r','c'].map(k=>[k,load(k)]));
const verify=q=>{
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)};
 const {g,old,ci,provenance,s,r,c}=q,state=g?.current_lawful_state,run=ci?.CI;
 ok(g?.schema==='isograph.exp062-w-current-stage-gate.v0.68'&&g?.semantic_authority===false&&g?.track==='W'&&g?.supersedes?.git_blob_sha===pins.old,'current stage and lineage');
 ok(old?.schema==='isograph.exp062-w-current-stage-gate.v0.67'&&old?.current_lawful_state?.G0_complete===false,'prior stage genuine unfinished');
 ok(g?.current_source_census?.git_blob_sha===pins.s&&g?.current_all_151_conservation_register?.git_blob_sha===pins.r&&g?.current_source_coverage?.git_blob_sha===pins.c,'current 151 source tuple');
 ok(g?.current_g0_reconstructed_NodeCI?.git_blob_sha===pins.ci&&g?.current_g0_mutable_source_identity_blocker?.git_blob_sha===pins.provenance,'CI and source provenance pinned');
 ok(g?.current_W_g0_current_guard?.path===P.v&&g?.current_W_g0_current_guard?.git_blob_sha===sha('v'),'self-current validator pin');
 ok(run?.run_id===37956974726&&run?.job_id===113909844401&&run?.head_sha==='62a9505c473a25d16a3c640e216e61af16e46155'&&run?.result==='SUCCESS'&&run?.positive_baseline_pass===true&&same(run?.positive_errors,[]),'source-current Node positive');
 ok(run?.hostile_mutations?.total===29&&run?.hostile_mutations?.rejected===29&&run?.hostile_mutations?.escaped===0&&run?.hostile_mutations?.crashed===0,'all 29 mutations actually rejected');
 ok(run?.w05_selected_division_scope?.total===37&&run?.w05_selected_division_scope?.rejected===37&&run?.prior_p2u7_split?.total===21&&run?.prior_p2u7_split?.rejected===21,'37 / 21 legacy controls separate');
 ok(ci?.preserved_invalid_CI?.length===2&&ci?.preserved_invalid_CI?.[0]?.run_id===37956466200&&ci?.preserved_invalid_CI?.[1]?.run_id===37956974680&&ci?.preserved_invalid_CI?.every(x=>x.result==='FAILURE'),'v0.1 positive failures never erased');
 ok(ci?.qualification?.G0_complete===false&&ci?.qualification?.external_review==='OWNER_BYPASSED_NOT_PASSED','CI neither stage closure nor external');
 ok(provenance?.source_corpus?.frozen==='2026-10-03'&&same(provenance?.source_corpus?.mutable_source_units,['W03','W04a','W04b','W04c','W04d','W04e']),'mutable source units correct');
 ok(provenance?.live_tree?.checked_commit==='62a9505c473a25d16a3c640e216e61af16e46155'&&provenance?.live_tree?.recursive_tree_truncated===false&&provenance?.live_tree?.non_L_non_bridge_research_source_raw_snapshot_files_by_extension_or_name===0,'bounded tree file search');
 ok(provenance?.limitations?.original_mutable_oct03_bytes_verified===false&&provenance?.limitations?.git_history_object_recovery_complete===false&&provenance?.limitations?.no_absolute_absence_claim===true,'cannot promote absence or byte identity');
 ok(s?.items?.length===151&&r?.rows?.length===151&&c?.rows?.length===151&&s?.closure_claims?.sealed===false&&g?.current_source_coverage?.reverse_all_original_nine_sources_complete===false,'151 source items still open');
 let count=0;if(s?.items?.length===151&&r?.rows?.length===151&&c?.rows?.length===151)for(let i=0;i<151;i++){const v=s.items[i],R=r.rows[i],C=c.rows[i],n=v?.source_expression_census?.statements?.length||0;count+=n;ok(R?.census_id===v?.id&&R?.source_body_exact===v?.obligation&&C?.census_id===v?.id&&C?.body_length_chars===v?.obligation?.length&&R?.source_expression_statement_count===n&&C?.source_expression_statement_count===n,'row '+i)}
 ok(count===315,'source incidences exact');
 ok(g?.current_historical_86_member_projection?.qualification===false&&g?.current_all_151_conservation_register?.all_source_obligations_qualified===false,'no W86 closed-schema evasions');
 ok(state?.G0_open===true,'G0 stays open');
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(state?.[k]===false,'stage blocked '+k);
 ok(g?.verification_at_record_creation?.W05_S8_NodeCI==='PASS_SHA_62a9505c473a25d16a3c640e216e61af16e46155_RUN_37956974726_29_OF_29_AND_37_OF_37_AND_21_OF_21','verified source run exact');
 ok(g?.verification_at_record_creation?.W_G0_guard_0_8_NodeCI==='PENDING_THIS_COMMIT'&&g?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','no false v0.8 CI before commit');
 return errors;
};
const errors=[];for(const [k,shaExpected]of Object.entries(pins))if(sha(k)!==shaExpected)errors.push('BLOB_SHA '+k);
const positive=verify(input);errors.push(...positive.map(x=>'POSITIVE '+x));
const mutations=[
 ['false G0 complete',q=>q.g.current_lawful_state.G0_complete=true],
 ['false G0 frozen',q=>q.g.current_lawful_state.G0_frozen=true],
 ['source falsely frozen',q=>q.g.current_lawful_state.source_census_frozen=true],
 ['false nine-source reverse',q=>q.g.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['false original bytes identity',q=>q.g.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['false G1',q=>q.g.current_lawful_state.G1_authorized=true],
 ['false G7',q=>q.g.current_lawful_state.G7_authorized=true],
 ['false W/L synthesis',q=>q.g.current_lawful_state.cross_track_synthesis_authorized=true],
 ['source SHA falsely changed',q=>q.g.current_source_census.git_blob_sha='BAD'],
 ['CI evidence SHA falsely changed',q=>q.g.current_g0_reconstructed_NodeCI.git_blob_sha='BAD'],
 ['self-verifier SHA falsely changed',q=>q.g.current_W_g0_current_guard.git_blob_sha='BAD'],
 ['one source W111 altered',q=>q.s.items[110].obligation+='WRONG'],
 ['one source removed',q=>q.s.items.pop()],
 ['CI run result forged',q=>q.ci.CI.result='FAILURE'],
 ['CI positive false',q=>q.ci.CI.positive_baseline_pass=false],
 ['CI escape inserted',q=>q.ci.CI.hostile_mutations.escaped=1],
 ['CI mutant missing',q=>q.ci.CI.hostile_mutations.rejected=28],
 ['old failed run erased',q=>q.ci.preserved_invalid_CI.pop()],
 ['old failed run false pass',q=>q.ci.preserved_invalid_CI[0].result='SUCCESS'],
 ['CI external falsely passed',q=>q.ci.qualification.external_review='PASSED'],
 ['October03 snapshot falsely found',q=>q.provenance.live_tree.non_L_non_bridge_research_source_raw_snapshot_files_by_extension_or_name=2],
 ['October03 bytes falsely verified',q=>q.provenance.limitations.original_mutable_oct03_bytes_verified=true],
 ['Git history search falsely claimed',q=>q.provenance.limitations.git_history_object_recovery_complete=true],
 ['tree truncated',q=>q.provenance.live_tree.recursive_tree_truncated=true],
 ['current gate ancestor changed',q=>q.g.supersedes.git_blob_sha='WRONG']
];
let rejected=0,escaped=[],crashed=[];for(const[name,fn]of mutations){let x=dup(input),before=JSON.stringify(x);try{fn(x);if(JSON.stringify(x)===before)escaped.push(name+' no-change');else if(verify(x).length)rejected++;else escaped.push(name)}catch(e){crashed.push(name+': '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W current G0 source+Node-qualification stage0.68 guard',pass:errors.length===0,errors,positive_errors:positive,mutations:mutations.length,rejected,escaped:escaped.length,crashed:crashed.length,existing_W_source_items:151,structured_occurrences:315,current_stage:'G0_OPEN_UNFROZEN',third_party:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
