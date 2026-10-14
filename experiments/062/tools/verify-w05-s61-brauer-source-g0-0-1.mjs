import fs from 'node:fs';
import crypto from 'node:crypto';
const base='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const P={oldS:w+'SOURCE_SEMANTIC_CENSUS_0_35.json',oldD:base+'W_G0_W05_S62_S63_SOURCE_DEMAND_PROJECTION_0_19.json',oldR:base+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_21.json',oldC:base+'W_G0_LINE_BY_LINE_151_COVERAGE_0_20.json',oldG:base+'W_CURRENT_STAGE_GATE_0_69.json',S:w+'SOURCE_SEMANTIC_CENSUS_0_36.json',D:base+'W_G0_W05_S61_BRAUER_SOURCE_DEMAND_PROJECTION_0_20.json',R:base+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_22.json',C:base+'W_G0_LINE_BY_LINE_151_COVERAGE_0_21.json',G:base+'W_CURRENT_STAGE_GATE_0_70.json',O:base+'W05_G0_S61_BRAUER_PRIMARY_SOURCE_FIRST_0_1.json',def:base+'W05_G0_S61_BRAUER_TYPED_SOURCE_DEFECT_0_1.json',U:base+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_3.json',self:base+'tools/verify-w05-s61-brauer-source-g0-0-1.mjs'};
const pinned={"oldS":"3cab92ed2abcfc65b9082cd871dfa40f71cbb011","oldD":"234275110a77494831f98d27f299f25655519d1d","oldR":"80c34982df47bc88cf0a979a2e569c8cc1f37e5c","oldC":"771cb6ccd52b32612cb8f17817b9febffd707eaf","oldG":"dbdd1c4fd80e6c0808f58b688b24479f6e4cd325","S":"631cd8b54e34ccca5b4a6de050a3136d3a26de7b","D":"bf8fefd99f69d6a6d22c59de2c2380456d35e37a","R":"184bdfec1607c047e088c8e7ca514e72f339bfa4","C":"5f802bc063d1a84124b6e86607e5d25331c7e88f","O":"850486c339a5ea9831d1eb1aa29db15a87146a00","def":"d10bff7eb5ac04470ad49f6870fee8353f0c60fa","U":"0e4cb6013e3b88b142fbaabf97f74541aad8cb02"};
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const hash=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=x=>JSON.parse(JSON.stringify(x));
const original=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,read(k)]));
function verify(q){
 const problems=[],ok=(v,m)=>{if(!v)problems.push(m)};
 const {oldS,oldD,oldR,oldC,oldG,S,D,R,C,G,O,def,U}=q;
 const oldW=oldS?.items?.find(x=>x.id==='W-SSC-107'),newW=S?.items?.find(x=>x.id==='W-SSC-107'),sources=O?.new_source_expression_incidences||[];
 ok(S?.schema==='woit.source-semantic-census.v0.36'&&S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false,'new source151 G0');
 ok(S?.predecessor?.git_blob_sha===pinned.oldS&&S?.correction?.source_oracle?.git_blob_sha===pinned.O&&S?.correction?.source_defect?.git_blob_sha===pinned.def,'W source exact lineage');
 ok(oldW?.source_expression_census?.statements?.length===4&&newW?.source_expression_census?.statements?.length===9&&equal(newW?.source_expression_census?.statements?.slice(0,4),oldW?.source_expression_census?.statements),'preserve original four');
 ok(equal(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&equal(S?.items?.filter((x,i)=>!equal(x,oldS.items[i])).map(x=>x.id),['W-SSC-107']),'only W107 changed/150 untouched');
 ok(newW?.obligation?.startsWith(oldW?.obligation||'MISSING')&&S?.correction?.source_corpus_changed===false&&newW?.state==='OPEN_EXPOSITORY','preserve original printed author and status');
 ok(equal(S?.items?.find(x=>x.id==='W-SSC-109')?.source_comparison_rows,oldS?.items?.find(x=>x.id==='W-SSC-109')?.source_comparison_rows)&&S?.items?.find(x=>x.id==='W-SSC-109')?.source_comparison_rows?.length===11,'W109 eleven analogies untouched');
 ok(sources.length===5&&equal(sources.map(x=>x.id),['W05-107-05','W05-107-06','W05-107-07','W05-107-08','W05-107-09'])&&equal(newW?.source_expression_census?.statements?.slice(4),sources),'source-first independent five');
 const pick=k=>sources.find(x=>x.id===k);
 ok(pick('W05-107-05')?.base_field==='Q_p'&&pick('W05-107-05')?.group==='Br(Q_p)'&&pick('W05-107-05')?.order===2&&pick('W05-107-05')?.needs==='HILBERT_MINUS_ONE_DIVISION_CLASS_PREMISE'&&pick('W05-107-05')?.negative?.includes('NOT_ALL_NONSQUARE_2_ADIC_UNITS_DIVISION'),'QP class order 2 scoped to selected division');
 ok(S?.items?.find(x=>x.id==='W-SSC-105')?.source_expression_census?.statements?.[4]?.quantifier_scope==='SOURCE_DOES_NOT_SAY_FOR_ALL_NONSQUARE_UNITS_U'&&S?.items?.find(x=>x.id==='W-SSC-106')?.source_expression_census?.statements?.[3]?.required_for_nonpoint_inference==='QUATERNION_CLASS_IS_DIVISION_HILBERT_MINUS1','predecessor W105 W106 p2u7 universal blocked');
 ok(pick('W05-107-06')?.carrier==='Br(Q_p)'&&pick('W05-107-06')?.equality==='Q/Z'&&pick('W05-107-06')?.order_parameter==='n'&&pick('W05-107-06')?.claimed_structure==='SUBGROUPS_OF_ORDER_N_HAVE_GENERATORS','Brauer Q/Z higher order n classes');
 ok(pick('W05-107-07')?.codomain==='Z/2Z'&&pick('W05-107-07')?.kernel==='I'&&pick('W05-107-07')?.correspondence?.left==='BRAUER_GROUP_TWO_TORSION'&&pick('W05-107-07')?.correspondence?.right==='I^2/I^3','Witt codomain/kernel/quotient');
 ok(pick('W05-107-08')?.base_field_parameter==='F'&&pick('W05-107-08')?.grading==='Z/2Z'&&pick('W05-107-08')?.constructed_class_group==='SBr(F)'&&pick('W05-107-08')?.specialization?.value==='Z/8Z'&&pick('W05-107-08')?.real_clifford_representatives?.quadratic_form==='NONDEGENERATE','superBrauer typed and nondegenerate');
 ok(pick('W05-107-09')?.periodicity===8&&equal(pick('W05-107-09')?.carriers,['REAL_CLIFFORD_ALGEBRAS','KO_K_THEORY'])&&equal(pick('W05-107-09')?.before_complexification,['MATRIX_ALGEBRAS_OVER_R','MATRIX_ALGEBRAS_OVER_C','MATRIX_ALGEBRAS_OVER_H'])&&pick('W05-107-09')?.negative?.includes('NOT_EVEN_ODD_CASE_EQUALITY'),'KO context and real matrix types');
 ok(oldW?.source_expression_census?.statements?.[3]?.cases?.length===2&&equal(newW?.source_expression_census?.statements?.[3]?.cases,oldW?.source_expression_census?.statements?.[3]?.cases),'even/odd W107 case source unchanged');
 ok(O?.source?.revision==='arXiv:2202.02657v2'&&equal(O?.source?.html_lines,[278,308])&&equal(O?.source?.pdf_indices,[9,10])&&O?.rows?.length===6&&O?.method?.external_review==='OWNER_BYPASSED_NOT_PASSED','source first six intervals and primary version');
 if(O?.rows?.length===6){for(let i=0;i<6;i++)ok(O.rows[i]?.ordinal===i+1&&O.rows[i]?.html?.[0]===(i?O.rows[i-1].html[1]+1:278),'source row continuity '+i);ok(O.rows[5]?.html?.[1]===308&&O.rows.flatMap(x=>x.new_ids||[]).length===5,'full scoped original source interval')}
 ok(def?.earliest_affected_stage==='G0_SOURCE_ASSERTION_CONSERVATION'&&def?.source_first_primary_audit?.git_blob_sha===pinned.O&&def?.gap?.new_typed_incidence_ids?.length===5,'defect source provenance');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.20'&&D?.current_source?.git_blob_sha===pinned.S&&D?.predecessor_W_only_demand?.git_blob_sha===pinned.oldD&&D?.items?.length===86,'old86 is historical only');
 ok(equal(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&equal(D?.items?.filter((x,i)=>!equal(x,oldD.items[i])).map(x=>x.census_id),['W-SSC-107']),'other 85 demand projections exact unchanged');
 ok(R?.source_census?.git_blob_sha===pinned.S&&R?.historical_86_projection?.git_blob_sha===pinned.D&&R?.rows?.length===151&&R?.predecessor_register?.git_blob_sha===pinned.oldR,'151 register exact W source + old86 pointers');
 ok(C?.source_census?.git_blob_sha===pinned.S&&C?.reconstructed_register?.git_blob_sha===pinned.R&&C?.predecessor_coverage?.git_blob_sha===pinned.oldC&&C?.rows?.length===151,'151 coverage exact lineage');
 let counts={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){const s=S.items[i],r=R.rows[i],c=C.rows[i],n=s.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(s.source)?.[0];counts[u]=(counts[u]||0)+n;ok(r?.census_id===s.id&&r?.source_body_exact===s.obligation&&r?.source_expression_statement_count===n&&r?.historical_closure_accepted_as_current===false&&c?.census_id===s.id&&c?.body_length_chars===s.obligation.length&&c?.source_expression_statement_count===n&&c?.stage_authority===false,'all 151 body/source counts '+i)}
 if(D?.items?.length===86)for(let i=0;i<86;i++){const d=D.items[i],s=S.items.find(x=>x.id===d.census_id);ok(d.track==='W'&&d.body===s?.obligation&&equal(d.source_formula_incidences||[],s?.source_expression_census?.statements||[]),'86 scoped projection rows match '+i)}
 ok(counts.W05===54&&Object.values(counts).reduce((a,b)=>a+b,0)===327&&equal(counts,R?.counts?.current_source_expression_units)&&Object.entries(counts).every(([k,n])=>C?.by_unit?.[k]?.source_expression_statements===n),'54 W05/327 all source expressions exact');
 ok(U?.source_census?.git_blob_sha===pinned.S&&U?.counts?.structured_incidents===327&&U?.counts?.source_items===151&&U?.counts?.all_nine_original_source_reverse_complete===false,'source-by-unit nine negative completion');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.70'&&G?.supersedes?.git_blob_sha===pinned.oldG&&oldG?.current_lawful_state?.G0_complete===false&&G?.track==='W'&&G?.semantic_authority===false,'current W gate historical lineage');
 ok(G?.current_source_census?.git_blob_sha===pinned.S&&G?.current_historical_86_member_projection?.git_blob_sha===pinned.D&&G?.current_all_151_conservation_register?.git_blob_sha===pinned.R&&G?.current_source_coverage?.git_blob_sha===pinned.C,'all gate source tuple pins current');
 ok(G?.current_W05_S61_source_oracle?.git_blob_sha===pinned.O&&G?.current_W05_S61_source_defect?.git_blob_sha===pinned.def&&G?.current_W_nine_source_current_inventory?.git_blob_sha===pinned.U&&G?.W05_S61_source_verifier?.git_blob_sha===hash('self'),'gate exact verifier and oracle source');
 ok(G?.prior_W05_S62_S63_CI?.run_id===37963693412&&G?.prior_W05_S62_S63_CI?.head_sha==='e657f1c0a0d72f0e54d41d3141498c508fcb99e1'&&G?.prior_W05_S62_S63_CI?.mutations_rejected===45&&G?.prior_W05_S62_S63_CI?.input_source_superseded===true,'prior 45/45 success retained historical');
 const st=G?.current_lawful_state;ok(st?.G0_open===true&&st?.G0_complete===false&&st?.G0_frozen===false,'G0 still OPEN');
 for(const key of ['source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[key]===false,'no stage escape '+key);
 ok(G?.verification_at_record_creation?.W05_S61_NodeCI==='PENDING_CURRENT_GITHUB_ACTIONS'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED'&&G?.current_historical_86_member_projection?.qualification===false,'No current CI/third-party preclaim');
 return problems;
}
const errors=[];for(const [k,x]of Object.entries(pinned))if(hash(k)!==x)errors.push('blob PIN '+k);
const positive=verify(original);errors.push(...positive.map(x=>'POSITIVE '+x));
const bad=[
 ['W107 body removed',x=>x.S.items[106].obligation='BAD'],
 ['W107 appended one of five missing',x=>x.S.items[106].source_expression_census.statements.pop()],
 ['unrelated W01 tampered',x=>x.S.items[0].obligation+='bad'],
 ['151 drops item',x=>x.S.items.pop()],
 ['W107 original four terms changed',x=>x.S.items[106].source_expression_census.statements[3].cases[0].rhs='NO'],
 ['selected division class order one',x=>x.O.new_source_expression_incidences[0].order=1],
 ['selected division binder erased',x=>x.O.new_source_expression_incidences[0].needs='NONE'],
 ['class p2u7 made division',x=>x.O.new_source_expression_incidences[0].negative=[]],
 ['both source/oracle order3',x=>{x.O.new_source_expression_incidences[0].order=3;x.S.items[106].source_expression_census.statements[4].order=3}],
 ['Br Qp equality not QZ',x=>x.O.new_source_expression_incidences[1].equality='Z/2Z'],
 ['higher order n forgotten',x=>x.O.new_source_expression_incidences[1].order_parameter='2'],
 ['Witt codomain integers',x=>x.O.new_source_expression_incidences[2].codomain='Z'],
 ['Witt kernel not I',x=>x.O.new_source_expression_incidences[2].kernel='J'],
 ['Witt I2I3 omitted',x=>x.O.new_source_expression_incidences[2].correspondence.right='I'],
 ['superBrauer F forced R',x=>x.O.new_source_expression_incidences[3].base_field_parameter='R'],
 ['superBrauer grading lost',x=>x.O.new_source_expression_incidences[3].grading='Z'],
 ['superBrauer R Z8 changed',x=>x.O.new_source_expression_incidences[3].specialization.value='Z/4Z'],
 ['real Clifford allowed degenerate',x=>x.O.new_source_expression_incidences[3].real_clifford_representatives.quadratic_form='DEGENERATE'],
 ['KO periodicity changed',x=>x.O.new_source_expression_incidences[4].periodicity=2],
 ['KO theory dropped',x=>x.O.new_source_expression_incidences[4].carriers.pop()],
 ['matrix H omitted',x=>x.O.new_source_expression_incidences[4].before_complexification.pop()],
 ['even odd promoted same',x=>x.O.new_source_expression_incidences[4].negative=[]],
 ['W105 source all nonsquares promotion',x=>x.S.items[104].source_expression_census.statements[4].quantifier_scope='FOR_ALL'],
 ['W106 conic premise changed',x=>x.S.items[105].source_expression_census.statements[3].required_for_nonpoint_inference='NONE'],
 ['W109 11 comparisons shrunk',x=>x.S.items[108].source_comparison_rows.pop()],
 ['source W107 interval gap',x=>x.O.rows[3].html[0]=302],
 ['source W107 interval deleted',x=>x.O.rows.pop()],
 ['arxiv source v1 substituted',x=>x.O.source.revision='arXiv:2202.02657v1'],
 ['source external review falsely PASS',x=>x.O.method.external_review='PASS'],
 ['W source defect stage G3 not G0',x=>x.def.earliest_affected_stage='G3'],
 ['old86 projection 85',x=>x.D.items.pop()],
 ['historical W107 body wrong',x=>x.D.items.find(v=>v.census_id==='W-SSC-107').body='WRONG'],
 ['source register W107 wrong',x=>x.R.rows[106].source_body_exact='WRONG'],
 ['source coverage W107 count old4',x=>x.C.rows[106].source_expression_statement_count=4],
 ['source W05 total old49',x=>x.C.by_unit.W05.source_expression_statements=49],
 ['nine-source inventory falsely complete',x=>x.U.counts.all_nine_original_source_reverse_complete=true],
 ['gate W source stale',x=>x.G.current_source_census.git_blob_sha=pinned.oldS],
 ['gate verifier hash changed',x=>x.G.W05_S61_source_verifier.git_blob_sha='FAKE'],
 ['prior 45/45 CI erased',x=>x.G.prior_W05_S62_S63_CI.mutations_rejected=0],
 ['G0 frozen',x=>x.G.current_lawful_state.G0_frozen=true],
 ['G1 authorized',x=>x.G.current_lawful_state.G1_authorized=true],
 ['W/L synthesis authorized',x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true],
 ['October03 mutable bytes falsely verified',x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['external review false PASS',x=>x.G.verification_at_record_creation.third_party='PASS'],
 ['G0 parent lineage stale',x=>x.G.supersedes.git_blob_sha='STALE']
];
const rejected=[],escaped=[],crashed=[];for(const[name,act]of bad){const x=clone(original),before=JSON.stringify(x);try{act(x);if(JSON.stringify(x)===before)escaped.push(name+' NO_EFFECT');else if(verify(x).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+': '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §6.1 Brauer Witt superBrauer KO source G0',pass:errors.length===0,errors,positive_errors:positive,hostile_controls:bad.length,mutations_rejected:rejected.length,mutations_escaped:escaped.length,mutations_crashed:crashed.length,source_items:151,W05_incidences:54,all_source_incidences:327,current_stage:'G0_OPEN_UNFROZEN'}));
if(errors.length)process.exitCode=1;
