import fs from 'node:fs';
import crypto from 'node:crypto';
const paths={oldS:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_34.json',oldD:'experiments/062/W_G0_W05_P2_SOURCE_DEMAND_PROJECTION_0_18.json',oldR:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_20.json',oldC:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_19.json',oldG:'experiments/062/W_CURRENT_STAGE_GATE_0_68.json',S:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_35.json',D:'experiments/062/W_G0_W05_S62_S63_SOURCE_DEMAND_PROJECTION_0_19.json',R:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_21.json',C:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_20.json',G:'experiments/062/W_CURRENT_STAGE_GATE_0_69.json',O:'experiments/062/W05_G0_SECTIONS62_63_SOURCE_FIRST_REVERSE_0_1.json',def:'experiments/062/W05_G0_SECTIONS62_63_SOURCE_FIDELITY_DEFECT_0_1.json',units:'experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_2.json',self:'experiments/062/tools/verify-w05-sections62-63-primary-source-g0-0-1.mjs'};
const pins={"oldS":"115f62f1ebb801b1e0f8ccb1cbe8f8821dc8611b","oldD":"d283558640c4fdb02f0f9967d8fe5468756e0706","oldR":"73f02fc7e4ac28d6bb46541922dd06ceba87908e","oldC":"d68c1c4409547f42b8991a0dd89f2421808d3f50","oldG":"2fffcb396f656203a1bbab7a80565727db9a6f43","S":"3cab92ed2abcfc65b9082cd871dfa40f71cbb011","D":"234275110a77494831f98d27f299f25655519d1d","R":"80c34982df47bc88cf0a979a2e569c8cc1f37e5c","C":"771cb6ccd52b32612cb8f17817b9febffd707eaf","O":"2fbc9d618c8288ee4ed108ed3985a48b67af40e4","def":"1444878b37de98abb745e2053f96e959e031d439","units":"a1007b74fb9e90530b2adc4e01319861ccd4200a"};
const read=k=>JSON.parse(fs.readFileSync(paths[k],'utf8')),hash=k=>{const b=fs.readFileSync(paths[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),copy=x=>JSON.parse(JSON.stringify(x));
const orig=Object.fromEntries(Object.keys(paths).filter(x=>x!=='self').map(k=>[k,read(k)]));
function validate(q){
 const e=[],ok=(b,m)=>{if(!b)e.push(m)};
 const {oldS,oldD,oldR,oldC,oldG,S,D,R,C,G,O,def,units}=q;
 const ids=['W-SSC-108','W-SSC-109'],ns=O?.provisional_fresh_source_assertions||[],by=id=>S?.items?.find(v=>v.id===id),old=id=>oldS?.items?.find(v=>v.id===id);
 ok(S?.schema==='woit.source-semantic-census.v0.35'&&S?.items?.length===151&&S?.census_item_count===151&&S?.closure_claims?.sealed===false&&S?.correction?.G0_frozen===false,'SSC0.35 authority');
 ok(S?.predecessor?.git_blob_sha===pins.oldS&&S?.correction?.source_oracle?.git_blob_sha===pins.O&&S?.correction?.defect?.git_blob_sha===pins.def,'source exact predecessor/oracle/defect');
 const changed=S?.items?.filter((v,i)=>!equal(v,oldS.items[i])).map(v=>v.id);
 ok(equal(changed,ids)&&equal(S?.items?.map(v=>v.id),oldS?.items?.map(v=>v.id)),'exact 149 of 151 items unchanged');
 ok(old('W-SSC-108')?.source_expression_census?.statements?.length===7&&old('W-SSC-109')?.source_expression_census?.statements?.length===2,'predecessor W108/W109 7/2');
 ok(by('W-SSC-108')?.source_expression_census?.statements?.length===11&&by('W-SSC-109')?.source_expression_census?.statements?.length===5,'new 11/5 typed claims');
 ok(equal(by('W-SSC-108')?.source_expression_census?.statements?.slice(0,7),old('W-SSC-108')?.source_expression_census?.statements)&&equal(by('W-SSC-109')?.source_expression_census?.statements?.slice(0,2),old('W-SSC-109')?.source_expression_census?.statements),'old seven/two remain exact');
 ok(equal(by('W-SSC-109')?.source_comparison_rows,old('W-SSC-109')?.source_comparison_rows)&&by('W-SSC-109')?.source_comparison_rows?.length===11&&by('W-SSC-109')?.source_comparison_rows?.every(x=>x.semantic_isomorphism_asserted===false),'11 comparison-table analogies unchanged');
 ok(ns.length===7&&equal(ns.map(x=>x.id),['W05-108-08','W05-108-09','W05-108-10','W05-108-11','W05-109-03','W05-109-04','W05-109-05']),'seven ordered new original assertions');
 for(const id of ids){const n=ns.filter(v=>v.id.startsWith(id==='W-SSC-108'?'W05-108-':'W05-109-'));ok(equal(by(id)?.source_expression_census?.statements?.slice(-n.length),n)&&by(id)?.obligation?.startsWith(old(id)?.obligation||'missing'),'source and independent source-first ledger agree '+id)}
 const n=id=>ns.find(x=>x.id===id);
 ok(n('W05-108-08')?.context?.configuration_space==='H'&&n('W05-108-08')?.context?.dimension_real===4&&n('W05-108-08')?.modality==='SOURCE_AUTHOR_PHYSICAL_INTERPRETATION_SCOPE'&&n('W05-108-08')?.guards?.includes('AUTHOR_SOURCE_CONTEXT_NOT_QUALIFIED_PHYSICAL_THEORY'),'H space-time wave-function author-scoped');
 ok(n('W05-108-09')?.speaker==='Peter Woit'&&n('W05-108-09')?.quantifier_scope==='PERSONAL_KNOWLEDGE_NOT_GLOBAL_PRIORITY_ORIGINALITY_THEOREM'&&n('W05-108-09')?.requested_action==='DESERVES_FURTHER_STUDY','novelty author knowledge not global');
 ok(n('W05-108-10')?.premise==='HILBERT_RECIPROCITY_ALL_FINITE_AND_INFINITE_PLACES'&&n('W05-108-10')?.conclusion==='GAUSS_QUADRATIC_RECIPROCITY_LAW'&&n('W05-108-10')?.relation==='AUTHOR_STATES_DERIVABLE_FROM'&&n('W05-108-10')?.not_represented_proof===true,'Gauss from Hilbert claimed not independently proven');
 ok(n('W05-108-11')?.attributed_to==='André Weil'&&n('W05-108-11')?.ambient==='ADELE_RING_A_Q'&&equal(n('W05-108-11')?.constructed_object_families,['HEISENBERG_GROUPS','METAPLECTIC_GROUPS','WEIL_REPRESENTATIONS'])&&equal(n('W05-108-11')?.citation_indices,['16']),'three Weil adelic group/representation object classes');
 ok(n('W05-109-03')?.claimed_role==='GEOMETRIC_INTERPRETATION_OF_SOME_P_ADIC_HODGE_STRUCTURE'&&n('W05-109-03')?.relation_to_twistor==='SOURCE_ANALOGY_ONLY','FF some p-adic Hodge');
 ok(equal(n('W05-109-04')?.attributed_to,['Laurent Fargues','Peter Scholze'])&&n('W05-109-04')?.citation_index==='4'&&n('W05-109-04')?.relation==='RECAST_USING_CURVE_NOT_QUALIFIED_SOLUTION'&&n('W05-109-04')?.reformulation==='GEOMETRIC_LANGLANDS_CONJECTURE_ON_FARGUES_FONTAINE_CURVE','Fargues Scholze source cited recast not solved');
 ok(n('W05-109-05')?.epistemic_position==='UNDERSTANDS_ONE_SIDE_ONLY'&&n('W05-109-05')?.recommended_sources?.length===3&&n('W05-109-05')?.recommended_sources?.[2]?.exact_locator==='SECTION_6_AND_TOP_FIGURE_3'&&n('W05-109-05')?.negative?.includes('READING_LIST_NOT_IMPORTED_THEOREMS'),'author warning and cited sources');
 ok(O?.source?.revision==='arXiv:2202.02657v2'&&equal(O?.source?.html_interval,[309,410])&&equal(O?.source?.pdf_visual_page_indices_checked,[10,11,12,13])&&O?.rows?.length===16&&O?.method?.external_cold_audit===false,'scoped original W05 source independent rows not nine-source');
 if(O?.rows?.length===16){for(let i=0;i<16;i++){const x=O.rows[i];ok(x?.ordinal===i+1&&x?.html_line_first===(i?O.rows[i-1].html_line_last+1:309),'nonoverlap contiguous W05 interval '+i)}ok(O.rows[15]?.html_line_last===410&&O.rows.flatMap(x=>x.restored_claim_ids||[]).length===7,'complete recorded source-first interval + seven new claims')}
 ok(def?.earliest_affected_stage==='G0_SOURCE_ASSERTION_CONSERVATION'&&equal(def?.expected_successor?.changed_source_ids,ids)&&def?.expected_successor?.added_source_expression_incidence_count===7,'defect and earliest stage no bypass');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.19'&&D?.items?.length===86&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD&&D?.replay_policy?.G1_authorized===false,'86 projection historical only');
 ok(equal(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&equal(D?.items?.filter((x,i)=>!equal(x,oldD.items[i])).map(x=>x.census_id),ids),'84 other historical members identical');
 ok(R?.rows?.length===151&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR,'151 register source and partial projection pins');
 ok(C?.rows?.length===151&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC,'151 coverage predecessor and register pins');
 const actual={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){for(let i=0;i<151;i++){let x=S.items[i],y=R.rows[i],z=C.rows[i],num=x?.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];actual[u]=(actual[u]||0)+num;ok(y?.census_id===x.id&&y?.source_body_exact===x.obligation&&y?.source_expression_statement_count===num&&y?.historical_closure_accepted_as_current===false&&z?.census_id===x.id&&z?.body_length_chars===x.obligation.length&&z?.source_expression_statement_count===num&&z?.stage_authority===false,'all 151 rows aligned '+i)}
 }
 for(let i=0;i<86;i++){const y=D?.items?.[i],x=S?.items?.find(v=>v.id===y?.census_id);ok(y?.track==='W'&&y?.body===x?.obligation&&equal(y?.source_formula_incidences||[],x?.source_expression_census?.statements||[]),'86 partial projection aligns '+i)}
 ok(actual.W05===49&&Object.values(actual).reduce((a,b)=>a+b,0)===322&&equal(R?.counts?.current_source_expression_units,actual)&&Object.entries(actual).every(([u,n])=>C?.by_unit?.[u]?.source_expression_statements===n),'49 W05, 322 total by unit');
 ok(units?.source_census?.git_blob_sha===pins.S&&units?.counts?.existing_items===151&&units?.counts?.structured_incidents===322&&units?.counts?.whole_nine_source_reverse_complete===false&&units?.source_units?.length===9,'all nine-source inventory 151/322 not original reverse');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.69'&&G?.track==='W'&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===pins.oldG&&oldG?.current_lawful_state?.G0_frozen===false,'G0 gate lineage');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C,'gate all current source pins');
 ok(G?.current_W05_sections62_63_source_reverse_oracle?.git_blob_sha===pins.O&&G?.current_W05_sections62_63_source_fidelity_defect?.git_blob_sha===pins.def&&G?.current_W_nine_source_current_inventory?.git_blob_sha===pins.units,'gate direct source oracle defect inventory pins');
 ok(G?.W05_sections62_63_source_verifier?.git_blob_sha===hash('self')&&G?.W05_sections62_63_source_verifier?.path===paths.self,'new validator exact content self');
 const st=G?.current_lawful_state;ok(st?.G0_open===true,'G0 current OPEN');
 for(const x of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[x]===false,'no stage advance '+x);
 ok(G?.current_source_census?.frozen===false&&G?.current_historical_86_member_projection?.qualification===false&&G?.current_all_151_conservation_register?.all_source_obligations_qualified===false&&G?.current_source_coverage?.reverse_all_original_nine_sources_complete===false,'source G0 all unqualified');
 ok(G?.verification_at_record_creation?.W05_S62_S63_NodeCI==='PENDING_CURRENT_GITHUB_ACTIONS'&&G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','no preclaimed Node or external');
 return e;
}
const errors=[];for(const [k,v]of Object.entries(pins))if(hash(k)!==v)errors.push('blob pin mismatch '+k);
const baseline=validate(orig);errors.push(...baseline.map(x=>'POSITIVE '+x));
const mutations=[
 ['source 150',x=>x.S.items.pop()],
 ['W01 unrelated changes',x=>x.S.items[0].obligation+='WRONG'],
 ['source108 coda lost',x=>x.S.items[107].obligation='WRONG'],
 ['source109 coda lost',x=>x.S.items[108].obligation='WRONG'],
 ['new W108 clause removed',x=>x.S.items[107].source_expression_census.statements.pop()],
 ['new W109 clause removed',x=>x.S.items[108].source_expression_census.statements.pop()],
 ['author physical H to R3',x=>x.O.provisional_fresh_source_assertions[0].context.configuration_space='R3'],
 ['author spacetime dimension 5',x=>x.O.provisional_fresh_source_assertions[0].context.dimension_real=5],
 ['Woit physically established theory',x=>x.O.provisional_fresh_source_assertions[0].guards=[]],
 ['personal unawareness globalized',x=>x.O.provisional_fresh_source_assertions[1].quantifier_scope='NO_PREVIOUS_PHYSICS_WORK_EXISTED'],
 ['author stated study completed',x=>x.O.provisional_fresh_source_assertions[1].requested_action='FINISHED'],
 ['Gauss conclusion dropped',x=>x.O.provisional_fresh_source_assertions[2].conclusion='UNKNOWN'],
 ['Gauss source reported becomes proved',x=>x.O.provisional_fresh_source_assertions[2].not_represented_proof=false],
 ['Gauss source relation becomes identity',x=>x.O.provisional_fresh_source_assertions[2].relation='EQUAL'],
 ['Weil attributed to Woit',x=>x.O.provisional_fresh_source_assertions[3].attributed_to='Woit'],
 ['adelic swapped for local',x=>x.O.provisional_fresh_source_assertions[3].ambient='LOCAL_Q2'],
 ['metaplectic group omitted',x=>x.O.provisional_fresh_source_assertions[3].constructed_object_families.splice(1,1)],
 ['Weil wrong reference',x=>x.O.provisional_fresh_source_assertions[3].citation_indices=['17']],
 ['FF p-adic Hodge all promotion',x=>x.O.provisional_fresh_source_assertions[4].claimed_role='ALL_P_ADIC_HODGE_PROVED'],
 ['Fargues-Scholze becomes Woit claim',x=>x.O.provisional_fresh_source_assertions[5].attributed_to=['Peter Woit']],
 ['Fargues-Scholze solved conjecture',x=>x.O.provisional_fresh_source_assertions[5].relation='CONJECTURE_PROVED'],
 ['Fargues-Scholze citation changed',x=>x.O.provisional_fresh_source_assertions[5].citation_index='9'],
 ['Fargues reading list removed',x=>x.O.provisional_fresh_source_assertions[6].recommended_sources.pop()],
 ['Scholze figure3 lost',x=>x.O.provisional_fresh_source_assertions[6].recommended_sources[2].exact_locator='NO_FIGURE'],
 ['author warning made expertise',x=>x.O.provisional_fresh_source_assertions[6].epistemic_position='KNOWS_BOTH_SIDES'],
 ['source interval row removed',x=>x.O.rows.pop()],
 ['source interval line gap',x=>x.O.rows[6].html_line_first=330],
 ['source version v1 injected',x=>x.O.source.revision='arXiv:2202.02657v1'],
 ['reverse ledger source false external',x=>x.O.method.external_cold_audit=true],
 ['W109 table 10 rows',x=>x.S.items[108].source_comparison_rows.pop()],
 ['W109 table analogy equivalence',x=>x.S.items[108].source_comparison_rows[0].semantic_isomorphism_asserted=true],
 ['D projection member omitted',x=>x.D.items.pop()],
 ['D projection W108 wrong body',x=>x.D.items.find(v=>v.census_id==='W-SSC-108').body='WRONG'],
 ['R register W109 wrong',x=>x.R.rows[108].source_body_exact='WRONG'],
 ['C coverage W109 count stale',x=>x.C.rows[108].source_expression_statement_count=2],
 ['source W05 by-unit stale',x=>x.C.by_unit.W05.source_expression_statements=42],
 ['all nine inventory falsely complete',x=>x.units.counts.whole_nine_source_reverse_complete=true],
 ['current source pin stale',x=>x.G.current_source_census.git_blob_sha=pins.oldS],
 ['gate source verifier hash forged',x=>x.G.W05_sections62_63_source_verifier.git_blob_sha='BAD'],
 ['current stage G0 frozen',x=>x.G.current_lawful_state.G0_frozen=true],
 ['current stage G1 authorized',x=>x.G.current_lawful_state.G1_authorized=true],
 ['source source bytes Oct3 verified',x=>x.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['W source switched to L synthesis',x=>x.G.current_lawful_state.cross_track_synthesis_authorized=true],
 ['fake third-party passed',x=>x.G.verification_at_record_creation.third_party='PASSED'],
 ['stage parent lineage wrong',x=>x.G.supersedes.git_blob_sha='BAD']
];
const escaped=[],crashed=[],rejected=[];for(const [name,act]of mutations){let q=copy(orig),before=JSON.stringify(q);try{act(q);if(JSON.stringify(q)===before){escaped.push('NO_EFFECT '+name);continue;}if(validate(q).length)rejected.push(name);else escaped.push(name);}catch(err){crashed.push(name+': '+err.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §6.2–§6.3 source-first G0 0.1',pass:errors.length===0,errors,positive_errors:baseline,source_items:151,changed_source_items:2,old86_incomplete:true,W05_structured_incidents:49,all_source_structured_incidents:322,hostile_controls:mutations.length,hostile_rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,stage:'G0_OPEN_UNFROZEN'}));
if(errors.length)process.exitCode=1;
