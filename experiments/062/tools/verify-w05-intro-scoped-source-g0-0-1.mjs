import fs from 'node:fs';
import crypto from 'node:crypto';
const P={
 oldS:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_43.json',
 S:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_44.json',
 oldD:'experiments/062/W_G0_W05_S52_HODGE_SOURCE_DEMAND_PROJECTION_0_27.json',
 D:'experiments/062/W_G0_W05_INTRO_SOURCE_DEMAND_PROJECTION_0_28.json',
 oldR:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_29.json',
 R:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_30.json',
 oldC:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_28.json',
 C:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_29.json',
 oldU:'experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_10.json',
 U:'experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_11.json',
 oldG:'experiments/062/W_CURRENT_STAGE_GATE_0_91.json',
 G:'experiments/062/W_CURRENT_STAGE_GATE_0_92.json',
 O:'experiments/062/W05_G0_INTRO_SOURCE_FIRST_0_1.json',
 F:'experiments/062/W05_G0_INTRO_SOURCE_TYPED_DEFECT_0_1.json',
 N:'experiments/062/W05_G0_INTRO_EPISTEMIC_NEGATIVE_0_1.json',
 self:'experiments/062/tools/verify-w05-intro-scoped-source-g0-0-1.mjs'
};
const pins={"oldS":"bf845e567780b9f56dc48c587a9b56f85124fd69","S":"99d5e463b4ea242651db7ac457fae3052aaa5bd5","oldD":"3b8c1c8cf60bb711b0ed7e0294a5354fcbf67339","D":"6d65c5388310ca3969b25e3489fdd5377c89f757","oldR":"9dc8aad1991d9697b64cf7817b4ceddaf105280e","R":"b3452e42091b316c5eddb465517582ac40c133d4","oldC":"a620f47477db1620a38131c021a6c2f28e59dad8","C":"eb62059dd96a7f250ead447dedf3514e3f4d5772","oldU":"d07fb6beaac6bdd177aa2354ed7d11d74eb3a23e","U":"771908f673a29854b9a0eb02157b8438754412d3","oldG":"8ba15ade6e49c6b3bd293d6778fe47e8dc10772a","O":"39c7acb783a907bc3a469724359ae9b899f09328","F":"6502d26fb49de95bb6f07b8ed819140e1f0c60e0","N":"7cf495519ae8455d235de7df0aa3670704d7d104"};
const cp=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const initial=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,read(k)]));
function validate(q){
 const errors=[],ok=(v,m)=>{if(!v)errors.push(m)};
 const {oldS,S,oldD,D,oldR,R,oldC,C,oldU,U,oldG,G,O,F,N}=q;
 const IDs=['W-SSC-023','W-SSC-024'],new23=S?.items?.find(x=>x.id===IDs[0]),new24=S?.items?.find(x=>x.id===IDs[1]),old23=oldS?.items?.find(x=>x.id===IDs[0]),old24=oldS?.items?.find(x=>x.id===IDs[1]);
 const a=new23?.source_expression_census?.statements||[],b=new24?.source_expression_census?.statements||[],source=O?.new_typed_source_incidents||[];
 const claim=id=>source.find(x=>x.id===id);
 ok(S?.schema==='woit.source-semantic-census.v0.44'&&S?.source_count===9&&S?.items?.length===151&&S?.census_item_count===151&&S?.cross_author_semantics_available===false&&S?.closure_claims?.sealed===false,'151 W source identities G0 only');
 ok(S?.predecessor?.git_blob_sha===pins.oldS&&oldS?.schema==='woit.source-semantic-census.v0.43'&&S?.correction?.new_source_typed===8&&S?.correction?.source_corpus_changed===false,'exact current source0.44 predecessor and mutation');
 ok(same(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&same(S?.items?.filter((x,i)=>!same(x,oldS.items[i])).map(x=>x.id),IDs),'149 other source objects unchanged');
 ok(old23?.obligation==='In Euclidean twistor geometry, a spacetime point is represented by a twistor P1.'&&old24?.obligation==='W05 presents the twistor P1 as a geometric avatar of quaternions.'&&old23?.source_expression_census===undefined&&old24?.source_expression_census===undefined,'original two broad W source identities previously untyped');
 ok(new23?.obligation?.startsWith(old23?.obligation)&&new24?.obligation?.startsWith(old24?.obligation)&&new23?.obligation?.includes('sphere of light rays')&&new24?.obligation?.includes('PURELY EXPOSITORY')&&new24?.obligation?.includes('OFTEN'),'author prose corrected without deleting original');
 ok(a.length===3&&b.length===5&&same(a,source.filter(x=>x.id.startsWith('W05-023-')))&&same(b,source.filter(x=>x.id.startsWith('W05-024-'))),'source-first exact typed ordered eight');
 ok(new23?.source_expression_census?.source_first_ledger?.git_blob_sha===pins.O&&new24?.source_expression_census?.source_first_ledger?.git_blob_sha===pins.O&&new23?.source_expression_census?.not_G1_authority===true&&new24?.source_expression_census?.not_mathematical_theorem===true,'typed source provenance and no domain theorem');
 ok(O?.schema==='isograph.exp062-w05-abstract-introduction-source-first-census.v0.1'&&O?.original_primary?.source_revision==='arXiv:2202.02657v2'&&same(O?.original_primary?.html_lines,[37,51])&&same(O?.original_primary?.pdf_zero_pages,[0,1])&&O?.method?.primary_source_direct_current_review===true&&O?.method?.blind_cold_independence===false,'exact original source and honest noncold review');
 ok(O?.rows?.length===6&&source.length===8&&same(source.map(x=>x.id),['W05-023-01','W05-023-02','W05-023-03','W05-024-01','W05-024-02','W05-024-03','W05-024-04','W05-024-05']),'source six contiguous intervals and eight ids');
 if(O?.rows?.length===6){for(let i=0;i<6;i++)ok(O.rows[i]?.ordinal===i+1&&O.rows[i]?.html_lines?.[0]===(i?O.rows[i-1].html_lines[1]+1:37),'original interval continuity '+i);ok(O.rows[5]?.html_lines?.[1]===51&&same(O.rows.flatMap(x=>x.restored_ids).slice().sort(),source.map(x=>x.id).slice().sort()),'all eight claims mapped into source interval')}
 ok(claim('W05-023-01')?.signature==='EUCLIDEAN'&&claim('W05-023-01')?.real_structure==='ANTIPODAL_INVOLUTION'&&claim('W05-023-01')?.representation==='TWISTOR_P1','Euclidean antpodal sphere scoped');
 ok(claim('W05-023-02')?.interpretation==='SPHERE_OF_LIGHT_RAYS_THROUGH_CORRESPONDING_POINT'&&claim('W05-023-02')?.epistemic_role==='SOURCE_REPORTED_PHYSICAL_INTERPRETATION_NOT_EXPERIMENTAL_THEOREM','physical light-ray interpretation not empirical proof');
 ok(claim('W05-023-03')?.source_signature_binder==='EUCLIDEAN_TWISTOR_DESCRIPTION'&&claim('W05-023-03')?.other_signature_in_same_source_intro==='NOT_ASSERTED_IDENTICAL','signature scoped not Minkowski real equivalence');
 ok(claim('W05-024-01')?.paper_kind==='PURELY_EXPOSITORY'&&claim('W05-024-01')?.recurrence_qualifier==='OFTEN'&&claim('W05-024-01')?.source_phrase_scope==='TWISTOR_P1_GEOMETRIC_AVATAR_OF_QUATERNIONS','source often and expository no global quaternion identity');
 ok(claim('W05-024-02')?.credited_person==='Carlos Simpson'&&claim('W05-024-02')?.context==='HODGE_STRUCTURES_GIVEN_BY_EQUIVARIANT_VECTOR_BUNDLES_ON_TWISTOR_P1','Simpson historical Hodge credited');
 ok(same(claim('W05-024-03')?.source_credited_people,['Laurent Fargues','Peter Scholze'])&&claim('W05-024-03')?.source_relation==='ANALOGY_ONLY_NOT_SOURCE_ASSERTED_EQUALITY_OR_PROOF'&&claim('W05-024-03')?.infinite_prime==='TWISTOR_P1_AT_ARCHIMEDEAN_PLACE_OF_Q','Fargues Scholze infinite prime analogy only');
 ok(claim('W05-024-04')?.citation_index==='19'&&claim('W05-024-04')?.uncertainty==='SIGNIFICANCE_REMAINS_UNCLEAR'&&claim('W05-024-04')?.scope==='AUTHOR_ASSESSMENT_AND_EXPOSITORY_MOTIVATION_NOT_PROVEN_PHYSICAL_THEORY','author uncertain physical unification claim');
 ok(same(claim('W05-024-05')?.additional_appearances,['HYPERKAHLER_GEOMETRY','METAPLECTIC_CENTRAL_EXTENSION_OF_SYMPLECTIC_SYMMETRY_GROUP_IN_CANONICAL_QUANTIZATION'])&&claim('W05-024-05')?.source_relation==='SOURCE_OCCURRENCES_AND_CONTEXT_POINTERS_NOT_PROVEN_SHARED_PRIMITIVE','two other domains not collapsed');
 ok(F?.schema==='isograph.exp062-w05-intro-W023-W024-source-demand-schema-omission.v0.1'&&same(F?.affected_source_items,IDs)&&F?.historical_86_projection?.includes_W023===false&&F?.historical_86_projection?.includes_W024===false&&F?.historical_86_projection?.old_closure_mode_for_both==='CLOSED_SCHEMA'&&F?.new_typed_count===8,'historical CLOSED_SCHEMA excluded both source roles now typed');
 ok(N?.source_qualifiers?.expository===true&&N?.source_qualifiers?.avatar_word==='OFTEN'&&N?.source_qualifiers?.author_significance==='UNKNOWN'&&N?.source_qualifiers?.FF_cross_field_relation==='ANALOGY_ONLY'&&N?.historical_overgeneralization_guards?.length===4,'epistemic negative original source uncertainty');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.28'&&D?.items?.length===86&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD&&same(D.items,oldD?.items),'all 86 historical members exact unchanged and two W source edits outside');
 ok(D?.items?.every(x=>!IDs.includes(x.census_id))&&D?.counts?.changed_W_members===0&&same(D?.counts?.changed_nonmembers_source_ids,IDs)&&D?.replay_policy?.all_W151_demand_membership_currently_requalified===false,'both historical CLOSED_SCHEMA outside old86 cannot qualify current 151 demand');
 ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.30'&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR&&R?.rows?.length===151,'new all151 source register exact');
 ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.29'&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC&&C?.rows?.length===151,'new all151 coverage exact');
 for(const id of IDs){const rr=R?.rows?.find(x=>x.census_id===id),cc=C?.rows?.find(x=>x.census_id===id),ss=S?.items?.find(x=>x.id===id);ok(rr?.historical_86_member===false&&rr?.historical_ledger_0_19_mode==='CLOSED_SCHEMA'&&rr?.historical_closure_accepted_as_current===false&&rr?.source_expression_statement_count===(id===IDs[0]?3:5)&&cc?.historical_in_86===false&&cc?.historical_closure_state==='CLOSED_SCHEMA'&&cc?.stage_authority===false&&ss?.obligation===rr?.source_body_exact,'old closed-schema excluded '+id+' NOT current qualification')}
 const counts={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){for(let i=0;i<151;i++){const s=S.items[i],r=R.rows[i],c=C.rows[i],n=s.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(s.source)?.[0];counts[u]=(counts[u]||0)+n;ok(r?.census_id===s.id&&c?.census_id===s.id&&r?.source_body_exact===s.obligation&&c?.body_length_chars===s.obligation.length&&r?.source_expression_statement_count===n&&c?.source_expression_statement_count===n&&r?.historical_closure_accepted_as_current===false&&c?.stage_authority===false,'all151 source occurrence row '+i)}}
 ok(counts.W05===106&&Object.values(counts).reduce((a,b)=>a+b,0)===379&&same(R?.counts?.current_source_expression_units,counts)&&Object.entries(counts).every(([unit,n])=>C?.by_unit?.[unit]?.source_expression_statements===n),'106 W05, 379 all nine original source typed');
 ok(U?.schema==='isograph.exp062-w-g0-source-unit-current-inventory.v0.11'&&U?.source_census?.git_blob_sha===pins.S&&U?.historical_parent?.git_blob_sha===pins.oldU&&U?.summary?.items===151&&U?.summary?.structured_incidences===379&&U?.summary?.all_nine_original_source_reverse_exhaustive===false&&U?.units?.find(x=>x.unit==='W05')?.structured_incidences===106,'unit inventory qualified scope exact');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.92'&&G?.track==='W'&&G?.semantic_authority===false&&G?.supersedes?.git_blob_sha===pins.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.91','G0 stage gate lineage exact');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C,'G0 current source conservation pins exact');
 ok(G?.current_W05_intro_source_first?.git_blob_sha===pins.O&&G?.current_W05_intro_source_defect?.git_blob_sha===pins.F&&G?.current_W05_intro_negative?.git_blob_sha===pins.N&&G?.current_W_nine_source_inventory_011?.git_blob_sha===pins.U,'gate source and negative historical exclusions exact');
 ok(G?.current_W05_intro_verifier?.path===P.self&&G?.current_W05_intro_verifier?.git_blob_sha===sha('self')&&G?.verification_at_record_creation?.W05_Intro_NodeCI==='PENDING_CURRENT_GITHUB_ACTIONS','new checker self hash and no false CI claim');
 ok(G?.current_historical_86_member_projection?.qualification===false&&G?.current_all_151_conservation_register?.all_source_obligations_qualified===false&&G?.current_source_coverage?.reverse_all_original_nine_sources_complete===false&&G?.current_source_census?.frozen===false,'all source G0 freeze blocked');
 const state=G?.current_lawful_state;ok(state?.G0_open===true,'G0 OPEN');
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(state?.[k]===false,'G0 gate failclosed '+k);
 ok(G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED'&&O?.method?.full_nine_original_reverse_complete===false&&N?.G0_frozen===false,'external bypass != W source completeness');
 return errors;
}
const errors=[],positive=validate(initial);
for(const [k,s]of Object.entries(pins))if(sha(k)!==s)errors.push('Git blob mismatch '+k);
errors.push(...positive.map(x=>'POSITIVE '+x));
const muts=[
['W023 source item omitted',q=>q.S.items.splice(q.S.items.findIndex(x=>x.id==='W-SSC-023'),1)],
['W024 original prose prefix changed',q=>q.S.items.find(x=>x.id==='W-SSC-024').obligation='New unrelated proposal'],
['unrelated W01 item tampered',q=>q.S.items[0].obligation+=' tamper'],
['source W023 typed role removed',q=>q.S.items.find(x=>x.id==='W-SSC-023').source_expression_census.statements.pop()],
['source W024 typed role removed',q=>q.S.items.find(x=>x.id==='W-SSC-024').source_expression_census.statements.pop()],
['author Euclidean replaced Minkowski',q=>q.O.new_typed_source_incidents[0].signature='MINKOWSKI'],
['source antipodal replaced ordinary real',q=>q.O.new_typed_source_incidents[0].real_structure='ORDINARY_CONJUGATION'],
['physical sphere of light rays dropped',q=>q.O.new_typed_source_incidents[1].interpretation='UNKNOWN'],
['physical interpretation upgraded to empirical theorem',q=>q.O.new_typed_source_incidents[1].epistemic_role='PHYSICAL_LAW_PROVED'],
['Euclidean scope equated all signatures',q=>q.O.new_typed_source_incidents[2].other_signature_in_same_source_intro='EQUAL'],
['source Woit expository dropped',q=>q.O.new_typed_source_incidents[3].paper_kind='ORIGINAL_FORMAL_THEOREM'],
['source avatar often changed always',q=>q.O.new_typed_source_incidents[3].recurrence_qualifier='ALWAYS'],
['Simpson miscredited Woit',q=>q.O.new_typed_source_incidents[4].credited_person='Peter Woit'],
['source Hodge equivariant action omitted',q=>q.O.new_typed_source_incidents[4].context='HODGE_ONLY'],
['Fargues Scholze credit Woit',q=>q.O.new_typed_source_incidents[5].source_credited_people=['Peter Woit']],
['infinite prime analogy becomes theorem',q=>q.O.new_typed_source_incidents[5].source_relation='EXACT_EQUALITY_PROVED'],
['archimedean prime replaced finite p',q=>q.O.new_typed_source_incidents[5].infinite_prime='Qp'],
['earlier unification citation modified',q=>q.O.new_typed_source_incidents[6].citation_index='18'],
['significance marked determined',q=>q.O.new_typed_source_incidents[6].uncertainty='ALREADY_PROVEN'],
['unification judged mathematical theorem',q=>q.O.new_typed_source_incidents[6].scope='THEOREM'],
['source hyperkahler omitted',q=>q.O.new_typed_source_incidents[7].additional_appearances.shift()],
['source quantization claimed same structure',q=>q.O.new_typed_source_incidents[7].source_relation='PROVEN_SHARED_ISOMORPHISM'],
['source PDF version changed',q=>q.O.original_primary.source_revision='arXiv:2202.02657v1'],
['source PDF printed pages altered',q=>q.O.original_primary.pdf_zero_pages=[1,2]],
['source primary line gap',q=>q.O.rows[2].html_lines[0]=45],
['source original interval deleted',q=>q.O.rows.pop()],
['source typed ownership row deleted',q=>q.O.new_typed_source_incidents.pop()],
['source independence falsely cold',q=>q.O.method.blind_cold_independence=true],
['source full nine reverse falsely qualified',q=>q.O.method.full_nine_original_reverse_complete=true],
['W023 historical membership falsely yes',q=>q.F.historical_86_projection.includes_W023=true],
['W024 historical membership falsely yes',q=>q.F.historical_86_projection.includes_W024=true],
['old CLOSED_SCHEMA mode renamed CURRENT',q=>q.F.historical_86_projection.old_closure_mode_for_both='CURRENT'],
['negative author significance known',q=>q.N.source_qualifiers.author_significance='KNOWN_TRUE'],
['negative source expository false',q=>q.N.source_qualifiers.expository=false],
['one overgeneralization guard erased',q=>q.N.historical_overgeneralization_guards.pop()],
['historical86 member count 85',q=>q.D.items.pop()],
['historical86 falsely adds W023',q=>q.D.items.push({track:'W',census_id:'W-SSC-023'})],
['historical86 member silently changed',q=>q.D.items[0].body='UNKNOWN'],
['historical86 current full W151 promoted',q=>q.D.replay_policy.all_W151_demand_membership_currently_requalified=true],
['register W023 source body wrong',q=>q.R.rows[22].source_body_exact='UNKNOWN'],
['register W024 source count stale',q=>q.R.rows[23].source_expression_statement_count=0],
['register old CLOSED_SCHEMA becomes authorized',q=>q.R.rows[22].historical_closure_accepted_as_current=true],
['coverage W024 source count stale',q=>q.C.rows[23].source_expression_statement_count=0],
['coverage current stage authority promoted',q=>q.C.rows[22].stage_authority=true],
['inventory W05 old typed',q=>q.U.units.find(x=>x.unit==='W05').structured_incidences=98],
['source full census marked sealed',q=>q.S.closure_claims.sealed=true],
['stage source pin stale',q=>q.G.current_source_census.git_blob_sha='WRONG'],
['stage old86 pin stale',q=>q.G.current_historical_86_member_projection.git_blob_sha='WRONG'],
['stage verifier self SHA forged',q=>q.G.current_W05_intro_verifier.git_blob_sha='WRONG'],
['stage parent gate forged',q=>q.G.supersedes.git_blob_sha='WRONG'],
['stage G0 frozen',q=>q.G.current_lawful_state.G0_frozen=true],
['stage G1 authorized',q=>q.G.current_lawful_state.G1_authorized=true],
['stage source Oct03 bytes falsely verified',q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
['stage W/L synthesis authorized',q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true],
['external review marked PASS',q=>q.G.verification_at_record_creation.third_party='PASSED']
];
const rejected=[],escaped=[],crashed=[];
for(const [name,edit]of muts){const q=cp(initial),before=JSON.stringify(q);try{edit(q);if(before===JSON.stringify(q))escaped.push(name+':NO_EFFECT');else if(validate(q).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+': '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 introduction source and old schema exclusions G0 v0.1',pass:errors.length===0,errors,positive_errors:positive,hostile_total:muts.length,hostile_rejected:rejected.length,hostile_escaped:escaped.length,hostile_crashed:crashed.length,source_items:151,W05_typed:106,all_source_typed:379,W023_W024_historical_old86_members:false,stage:'G0_OPEN_UNFROZEN'}));
if(errors.length)process.exitCode=1;
