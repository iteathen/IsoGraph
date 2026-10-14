import fs from 'node:fs';
import crypto from 'node:crypto';
const P={
 oldS:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_42.json',
 S:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_43.json',
 oldR:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_28.json',
 R:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_29.json',
 oldC:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_27.json',
 C:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_28.json',
 oldD:'experiments/062/W_G0_W05_S7_SOURCE_DEMAND_PROJECTION_0_26.json',
 D:'experiments/062/W_G0_W05_S52_HODGE_SOURCE_DEMAND_PROJECTION_0_27.json',
 oldU:'experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_9.json',
 U:'experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_10.json',
 oldG:'experiments/062/W_CURRENT_STAGE_GATE_0_89.json',
 G:'experiments/062/W_CURRENT_STAGE_GATE_0_90.json',
 O:'experiments/062/W05_G0_S52_HODGE_SOURCE_FIRST_0_1.json',
 F:'experiments/062/W05_G0_S52_HODGE_TYPED_GAP_0_1.json',
 N:'experiments/062/W05_G0_S52_HODGE_SYNTAX_NEGATIVE_0_1.json',
 cp1:'experiments/062/W05_G0_W103_CP1_PRINTED_FILTRATION_FALSIFIER_0_1.json',
 self:'experiments/062/tools/verify-w05-s52-hodge-source-g0-0-2.mjs'
};
const pins={"oldS":"77a7e7c3442e9bdd6d781279f327805ba59c0e6e","S":"bf845e567780b9f56dc48c587a9b56f85124fd69","oldR":"d247ff9cb12848812a291ac2f092705414ce871c","R":"9dc8aad1991d9697b64cf7817b4ceddaf105280e","oldC":"1a9a40b855bb45799d8b551b9cc923d87bdb8b9c","C":"a620f47477db1620a38131c021a6c2f28e59dad8","oldD":"13e543475171d6d09e79880668ab0e0042e6133a","D":"3b8c1c8cf60bb711b0ed7e0294a5354fcbf67339","oldU":"c52717ba69374ef14b4d2acc94f974ac95927888","U":"d07fb6beaac6bdd177aa2354ed7d11d74eb3a23e","oldG":"074fc19420d998bc925fffcbd6610649cb1e00e0","O":"030240f26b0b1e0c58c553346c1f896602ee23ce","F":"2f4e9e046c4e6de51b5959a7b93c0a46d60e991d","N":"be75f7383c451bd57c278225b3c1adbe86688902","cp1":"2c6786ae62c057ea9fb6e8a35653c69444f92412"};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const copy=x=>JSON.parse(JSON.stringify(x));
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const obj=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,read(k)]));
function check(q){
 const errors=[],ok=(condition,label)=>{if(!condition)errors.push(label)};
 const {oldS,S,oldR,R,oldC,C,oldD,D,oldU,U,oldG,G,O,F,N,cp1}=q;
 const oldW=oldS?.items?.find(x=>x.id==='W-SSC-103'),newW=S?.items?.find(x=>x.id==='W-SSC-103');
 const occ=newW?.source_expression_census?.statements||[],claims=O?.restored_typed_source_incidences||[],by=id=>claims.find(x=>x.id===id);
 ok(S?.schema==='woit.source-semantic-census.v0.43'&&S?.source_count===9&&S?.items?.length===151&&S?.census_item_count===151&&S?.cross_author_semantics_available===false&&S?.closure_claims?.sealed===false,'new G0 source census exactly 151 and W-only');
 ok(S?.predecessor?.git_blob_sha===pins.oldS&&oldS?.schema==='woit.source-semantic-census.v0.42'&&oldW?.source_expression_census?.statements?.length===2&&newW?.source_expression_census?.statements?.length===16,'source lineage and two existing +14 new');
 ok(same(oldS?.items?.map(x=>x.id),S?.items?.map(x=>x.id))&&same(S?.items?.filter((x,i)=>!same(x,oldS.items[i])).map(x=>x.id),['W-SSC-103']),'other 150 W source items byte-exact');
 ok(newW?.state==='OPEN_EXPOSITORY'&&newW?.source==='W05 §5.2'&&newW?.obligation===oldW?.obligation&&same(occ.slice(0,2),oldW?.source_expression_census?.statements),'W103 original author obligation and first two typed exact');
 ok(S?.correction?.added_typed===14&&S?.correction?.source_first_ledger?.git_blob_sha===pins.O&&S?.correction?.typed_defect?.git_blob_sha===pins.F&&S?.correction?.syntax_negative?.git_blob_sha===pins.N&&S?.correction?.external_review==='OWNER_BYPASSED_NOT_PASSED','new correction primary/source lineage/negative pin');
 ok(O?.schema==='isograph.exp062-w05-s52-hodge-structure-source-first-audit.v0.1'&&O?.primary_source?.version==='arXiv:2202.02657v2'&&same(O?.primary_source?.html_span,[175,211])&&same(O?.primary_source?.pdf_zero_based_pages,[5,6])&&O?.method?.direction==='PRIMARY_AUTHOR_SOURCE_WITH_EXISTING_W103_AS_COMPARISON_NOT_COLD_BLIND','original source v2 reviewed but not falsely cold');
 ok(O?.source_rows?.length===11&&claims.length===14&&same(claims.map(x=>x.id),Array.from({length:14},(_,i)=>'W05-103-'+String(i+3).padStart(2,'0'))),'eleven source intervals and fourteen typed source identities');
 if(O?.source_rows?.length===11){for(let i=0;i<11;i++)ok(O.source_rows[i]?.ordinal===i+1&&O.source_rows[i]?.html_lines?.[0]===(i?O.source_rows[i-1].html_lines[1]+1:175),'source rows contiguous original '+i);ok(O.source_rows[10]?.html_lines?.[1]===211&&same(O.source_rows.flatMap(x=>x.restored_typed_incidence_ids).slice().sort(),claims.map(x=>x.id).slice().sort()),'all typed incidences have original source span')}
 ok(same(occ.slice(2),claims)&&newW?.source_expression_census?.source_first_ledger?.git_blob_sha===pins.O&&newW?.source_expression_census?.G0_frozen===false,'W103 source occurrences precisely primary audited');
 const prior1=occ[0],prior2=occ[1];
 ok(prior1?.id==='W103-G0-F01'&&prior1?.rhs?.binder?.relation==='STRICT_GT'&&prior1?.rhs?.binder?.variable==='i'&&prior1?.rhs?.binder?.bound==='p'&&prior1?.rhs?.summand==='H^q(M,Omega^i)'&&prior2?.rhs?.operator==='INTERSECTION'&&prior2?.rhs?.right?.operator==='CONJUGATE','unrepaired strict i>p and conjugate intersection');
 ok(newW?.obligation?.includes('F^2=V')&&newW?.obligation?.includes('F^p directsum conjugate(F^(n-p+1))=V'),'retained author terminal F2 and conjugate complement');
 ok(by('W05-103-03')?.premise==='M_SMOOTH_COMPACT_KAHLER'&&by('W05-103-03')?.binder==='p+q=n'&&by('W05-103-03')?.summand==='H^(p,q)(M)','Hodge decomposition Kähler side condition');
 ok(by('W05-103-04')?.Hodge_decomposition_varies_holomorphically===false&&by('W05-103-04')?.Hodge_filtration_varies_holomorphically===true,'different variation modalities');
 ok(same(by('W05-103-05')?.chain,['0','F^n','F^(n-1)','...','F^1','F^2=V'])&&by('W05-103-05')?.weight_symbol==='w'&&by('W05-103-05')?.filtration_index_symbol==='n','unusual terminal chain and different w/n symbols');
 ok(by('W05-103-06')?.index_binding==='n-p+1'&&by('W05-103-06')?.complex_conjugation_operand==='F^(n-p+1)'&&by('W05-103-06')?.operator==='EQUAL'&&by('W05-103-06')?.not_same_as==='W103-G0-F02_INTERSECTION','conjugate complement not intersection');
 ok(by('W05-103-07')?.in_scoped_presentation===false&&by('W05-103-07')?.scope==='PURE_REAL_HODGE_ONLY','mixed Hodge excluded');
 ok(by('W05-103-08')?.credited_person==='Carlos Simpson'&&by('W05-103-08')?.citation_index==='14'&&by('W05-103-08')?.epistemic_role==='THIRD_PARTY_CITED_CONTEXT_NOT_WOIT_ORIGINAL_OR_INDEPENDENT_ISOGRAPH_PROOF','Simpson exact attribution');
 ok(by('W05-103-09')?.line_rank===1&&by('W05-103-09')?.line_degree==='w'&&by('W05-103-09')?.source_claim==='DIRECT_SUMS_OF_LINE_BUNDLES_O(w)','ordinary CP1 line splitting');
 ok(same(by('W05-103-10')?.cases,[{degree_parity:'ODD',rank:2},{degree_parity:'EVEN',rank:1}])&&by('W05-103-10')?.slope==='w/2'&&by('W05-103-10')?.notation==='O_(P1_tw)(w/2)','odd-even rank parity and half-weight slope');
 ok(by('W05-103-11')?.number_of_terms==='dim(V)'&&by('W05-103-11')?.filtration_role==='U1_ACTION_ON_E'&&by('W05-103-11')?.negative?.includes('SOURCE_SAYS_NUMBER_OF_TERMS_dimV_DESPITE_PRIOR_ODD_w_RANK_TWO'),'number of summands and parity not collapsed');
 ok(by('W05-103-12')?.local_parameter==='lambda=1/z'&&by('W05-103-12')?.stabilized_point==='infinity'&&by('W05-103-12')?.parameter_zero==='infinity','local infinity, lambda and U1');
 ok(by('W05-103-13')?.source_display==='E1=V tensor_R O_(P1_tw)'&&by('W05-103-13')?.restriction==='AWAY_FROM_lambda=0'&&by('W05-103-13')?.glued_to==='E2_ON_FORMAL_NEIGHBORHOOD_OF_lambda=0'&&by('W05-103-13')?.gluing_data==='FILTRATION','trivial E1 real tensor and formal gluing');
 ok(by('W05-103-14')?.V_recovered_from==='E_FIBER_AT_POINT_AWAY_FROM_lambda=0'&&by('W05-103-14')?.graded_from==='U1_WEIGHT_SPACE_DECOMPOSITION_AT_lambda=0'&&by('W05-103-14')?.output==='ASSOCIATED_GRADED_OF_HODGE_FILTRATION','fiber versus weight graded not identical');
 ok(by('W05-103-15')?.ordered_rows?.length===4&&same(by('W05-103-15')?.ordered_rows?.map(x=>x.source),['REAL_HODGE_STRUCTURE','PURE_WEIGHT_w','UNDERLYING_VECTOR_SPACE_V','HODGE_FILTRATION'])&&by('W05-103-15')?.relation==='SOURCE_PRESENTATION_TABLE_NOT_QUALIFIED_LOWER_MODULE_ISOMORPHISM','four ordered source table rows not theorem');
 ok(by('W05-103-16')?.source_binding_for_q==='NOT_EXPLICIT_IN_THIS_SOURCE_FORMULA'&&by('W05-103-16')?.source_binding_for_i==='i>p'&&by('W05-103-16')?.negative?.includes('DO_NOT_INFER_q=n-i_AS_SOURCE_LITERAL'),'unbound q and strict i>p');
 ok(F?.status==='EXISTING_W103_PROSE_SOURCE_FAITHFUL_FOURTEEN_SEPARATE_TYPED_INCIDENCE_ROLES_MISSING'&&F?.difference?.prior_typed===2&&F?.difference?.successor_typed===16&&F?.difference?.source_body_obligation_unchanged===true&&F?.earliest_affected_stage===undefined,'defect owner G0 no invented author emendation');
 ok(N?.kind==='NONAUTHOR_SOURCE_SYNTAX_QUALIFICATION_WARNING_NOT_SOURCE_EMENDATION'&&N?.literal_source?.binder_in_formula==='i>p'&&N?.literal_source?.q_in_formula==='UNBOUND_IN_DISPLAY'&&N?.parity_guard?.source_odd_real_twistor_bundle_rank===2&&N?.parity_guard?.source_even_real_twistor_bundle_rank===1&&N?.prior_exact_cp1_counterexample?.git_blob_sha===pins.cp1&&N?.prior_exact_cp1_counterexample?.logic==='CP1 H11 DIMENSION1 BUT SOURCE_STRICT_F1_ZERO','source syntax/parity and prior CP1 negative unchanged');
 ok(cp1?.schema==='isograph.exp062-w05-w103-cp1-hodge-print-conjunction-negative-witness.v0.1'&&cp1?.counterexample?.source_intersection_consequence?.consistent===false&&cp1?.counterexample?.source_terminal_F2_consequence?.consistent===false,'prior real CP1 negative preserved');
 ok(D?.schema==='isograph.exp062-w-g0-source-demand-projection.v0.27'&&D?.current_source?.git_blob_sha===pins.S&&D?.predecessor_W_only_demand?.git_blob_sha===pins.oldD&&D?.items?.length===86&&same(D?.items?.map(x=>x.census_id),oldD?.items?.map(x=>x.census_id))&&same(D?.items?.filter((x,i)=>!same(x,oldD.items[i])).map(x=>x.census_id),['W-SSC-103']),'86 historical only W103 altered');
 ok(R?.schema==='isograph.exp062-w-g0-all-151-source-membership-register.v0.29'&&R?.source_census?.git_blob_sha===pins.S&&R?.historical_86_projection?.git_blob_sha===pins.D&&R?.predecessor_register?.git_blob_sha===pins.oldR&&R?.rows?.length===151,'151 source register current');
 ok(C?.schema==='isograph.exp062-w-g0-line-by-line-151-coverage.v0.28'&&C?.source_census?.git_blob_sha===pins.S&&C?.reconstructed_register?.git_blob_sha===pins.R&&C?.predecessor_coverage?.git_blob_sha===pins.oldC&&C?.rows?.length===151,'151 coverage current');
 const sourceCounts={};if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){
   for(let i=0;i<151;i++){
     const x=S.items[i],r=R.rows[i],c=C.rows[i],n=x.source_expression_census?.statements?.length||0,u=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];
     sourceCounts[u]=(sourceCounts[u]||0)+n;
     ok(r?.census_id===x.id&&c?.census_id===x.id&&r?.source_body_exact===x.obligation&&c?.body_length_chars===x.obligation.length&&r?.source_expression_statement_count===n&&c?.source_expression_statement_count===n&&r?.historical_closure_accepted_as_current===false&&c?.stage_authority===false,'all 151 source/register/coverage rows '+i);
   }
 }
 if(D?.items?.length===86)for(let i=0;i<86;i++){let d=D.items[i],x=S.items.find(y=>y.id===d.census_id);ok(d.track==='W'&&d.body===x?.obligation&&same(d.source_formula_incidences||[],x?.source_expression_census?.statements||[]),'86 incomplete historical member exact source '+i)}
 ok(sourceCounts.W05===98&&Object.values(sourceCounts).reduce((a,b)=>a+b,0)===371&&same(sourceCounts,R?.counts?.current_source_expression_units)&&Object.entries(sourceCounts).every(([unit,count])=>C?.by_unit?.[unit]?.source_expression_statements===count),'W05 98; all source 371 exact counts');
 ok(U?.schema==='isograph.exp062-w-g0-source-unit-current-inventory.v0.10'&&U?.historical_parent?.git_blob_sha===pins.oldU&&U?.source_census?.git_blob_sha===pins.S&&U?.summary?.structured_incidences===371&&U?.summary?.items===151&&U?.summary?.all_nine_original_source_reverse_exhaustive===false&&U?.units?.find(x=>x.unit==='W05')?.structured_incidences===98,'source-unit inventory nine G0 unqualified');
 ok(G?.schema==='isograph.exp062-w-current-stage-gate.v0.90'&&G?.semantic_authority===false&&G?.track==='W'&&G?.supersedes?.git_blob_sha===pins.oldG&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.89','stage historical lineage');
 ok(G?.current_source_census?.git_blob_sha===pins.S&&G?.current_historical_86_member_projection?.git_blob_sha===pins.D&&G?.current_all_151_conservation_register?.git_blob_sha===pins.R&&G?.current_source_coverage?.git_blob_sha===pins.C,'G0 exact current 151 source artifacts');
 ok(G?.current_W05_S52_source_first?.git_blob_sha===pins.O&&G?.current_W05_S52_gap?.git_blob_sha===pins.F&&G?.current_W05_S52_syntax_negative?.git_blob_sha===pins.N&&G?.current_W_nine_source_inventory_010?.git_blob_sha===pins.U,'W05 original scope audit pinned to gate');
 ok(G?.current_W05_S52_v01_failed_prepublication?.git_blob_sha==='29ec5728eee463be901271c30f2235d1244c7e71'&&G?.current_W05_S52_v01_failed_prepublication?.positive_baseline_pass===false&&G?.current_W05_S52_v01_failed_prepublication?.qualified_mutants===0,'failed V8 positive baseline remains unqualified');
 ok(G?.current_W05_S52_verifier?.path===P.self&&G?.current_W05_S52_verifier?.git_blob_sha===sha('self')&&G?.verification_at_record_creation?.W05_S52_NodeCI==='PENDING_CURRENT_GITHUB_ACTIONS','self-pinned validator not pre-claimed');
 ok(G?.current_historical_86_member_projection?.qualification===false&&G?.current_all_151_conservation_register?.all_source_obligations_qualified===false&&G?.current_source_coverage?.reverse_all_original_nine_sources_complete===false&&G?.current_source_census?.frozen===false,'stage current tuple NOT G0 qualified');
 const st=G?.current_lawful_state;ok(st?.G0_open===true,'stage G0 OPEN');
 for(const k of ['G0_complete','G0_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized','all_151_closure_re_adjudicated','source_census_frozen'])ok(st?.[k]===false,'stage G0 false '+k);
 ok(G?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED'&&O?.original_nine_source_reverse_exhaustiveness===false&&O?.qualification?.G0_complete===false,'external bypass not a source/semantic proof');
 return errors;
}
const errors=[],positive=check(obj);
for(const[k,v]of Object.entries(pins))if(sha(k)!==v)errors.push('pinned Git blob mismatch '+k);
errors.push(...positive.map(x=>'POSITIVE '+x));
const changes=[
['source W103 removed',q=>q.S.items.splice(q.S.items.findIndex(x=>x.id==='W-SSC-103'),1)],
['unrelated W01 modified',q=>q.S.items[0].obligation+='WRONG'],
['W103 narrative modified to repair strict i>p',q=>q.S.items.find(x=>x.id==='W-SSC-103').obligation+='correct >='],
['W103 old first source formula changed',q=>q.S.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[0].rhs.binder.relation='GREATER_EQUAL'],
['W103 old intersection no conjugation',q=>q.S.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[1].rhs.right.operator='IDENTITY'],
['W103 new typed claim omitted',q=>q.S.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements.pop()],
['W103 source occurrence list forged',q=>q.O.restored_typed_source_incidences.pop()],
['source row omitted',q=>q.O.source_rows.pop()],
['source row gap',q=>q.O.source_rows[5].html_lines[0]=191],
['original PDF page index off',q=>q.O.primary_source.pdf_zero_based_pages=[6,7]],
['original arxiv v1 rather than v2',q=>q.O.primary_source.version='arXiv:2202.02657v1'],
['false cold independence claim',q=>q.O.method.direction='COLD_BLIND'],
['Kahler condition omitted',q=>q.O.restored_typed_source_incidences[0].premise='ANY_MANIFOLD'],
['Hodge direct-sum binder wrong',q=>q.O.restored_typed_source_incidences[0].binder='p+q=n+1'],
['variation Hodge decomposition positive',q=>q.O.restored_typed_source_incidences[1].Hodge_decomposition_varies_holomorphically=true],
['variation filtration negative',q=>q.O.restored_typed_source_incidences[1].Hodge_filtration_varies_holomorphically=false],
['F2 repaired silently to F0',q=>q.O.restored_typed_source_incidences[2].chain[5]='F^0=V'],
['weight w changed to n',q=>q.O.restored_typed_source_incidences[2].weight_symbol='n'],
['conjugate complement dropped conjugation',q=>q.O.restored_typed_source_incidences[3].complex_conjugation_operand='NO_CONJUGATION'],
['complement p index shifted',q=>q.O.restored_typed_source_incidences[3].index_binding='n-p'],
['mixed Hodge extension silently included',q=>q.O.restored_typed_source_incidences[4].in_scoped_presentation=true],
['Simpson becomes Woit',q=>q.O.restored_typed_source_incidences[5].credited_person='Peter Woit'],
['Simpson citation wrong',q=>q.O.restored_typed_source_incidences[5].citation_index='15'],
['ordinary O(w) rank two',q=>q.O.restored_typed_source_incidences[6].line_rank=2],
['odd real twistor rank changed',q=>q.O.restored_typed_source_incidences[7].cases[0].rank=1],
['even real twistor rank changed',q=>q.O.restored_typed_source_incidences[7].cases[1].rank=2],
['twistor slope changed',q=>q.O.restored_typed_source_incidences[7].slope='w'],
['E number terms no dimV',q=>q.O.restored_typed_source_incidences[8].number_of_terms='2*dim(V)'],
['U1 filtration action missing',q=>q.O.restored_typed_source_incidences[8].filtration_role='NO_GROUP'],
['infinity lambda wrong',q=>q.O.restored_typed_source_incidences[9].local_parameter='lambda=z'],
['U1 fixes zero instead infinity',q=>q.O.restored_typed_source_incidences[9].stabilized_point='zero'],
['E1 coefficient changed to C',q=>q.O.restored_typed_source_incidences[10].source_display='E1=V tensor_C O'],
['formal neighborhood lost',q=>q.O.restored_typed_source_incidences[10].glued_to='GLOBAL_E2'],
['fiber V conflated with infinity',q=>q.O.restored_typed_source_incidences[11].V_recovered_from='E_INFINITY'],
['weight space recovers filtration not graded',q=>q.O.restored_typed_source_incidences[11].output='FULL_FILTRATION'],
['four row table one removed',q=>q.O.restored_typed_source_incidences[12].ordered_rows.pop()],
['table order swapped',q=>q.O.restored_typed_source_incidences[12].ordered_rows.reverse()],
['Hodge q falsely source bound',q=>q.O.restored_typed_source_incidences[13].source_binding_for_q='q=n-i'],
['source strict > changed in q guard',q=>q.O.restored_typed_source_incidences[13].source_binding_for_i='i>=p'],
['prior CP1 negative declared consistent',q=>q.cp1.counterexample.source_terminal_F2_consequence.consistent=true],
['negative guard CP1 forgotten',q=>q.N.prior_exact_cp1_counterexample.logic='CONSISTENT'],
['defect says source body changed',q=>q.F.difference.source_body_obligation_unchanged=false],
['historical W86 member missing',q=>q.D.items.pop()],
['historical other85 member mutated',q=>q.D.items[0].body='WRONG'],
['historical W103 typed stale',q=>q.D.items.find(x=>x.census_id==='W-SSC-103').source_formula_incidences.pop()],
['all151 register W103 typed count stale',q=>q.R.rows.find(x=>x.census_id==='W-SSC-103').source_expression_statement_count=2],
['source row R W104 body changed',q=>q.R.rows.find(x=>x.census_id==='W-SSC-104').source_body_exact='WRONG'],
['coverage W103 old count',q=>q.C.rows.find(x=>x.census_id==='W-SSC-103').source_expression_statement_count=2],
['nine source inventory W05 old',q=>q.U.units.find(x=>x.unit==='W05').structured_incidences=84],
['new W source census falsely frozen',q=>q.S.closure_claims.sealed=true],
['stage gate source pin stale',q=>q.G.current_source_census.git_blob_sha='WRONG'],
['stage gate lineage stale',q=>q.G.supersedes.git_blob_sha='WRONG'],
['stage gate self verifier SHA forged',q=>q.G.current_W05_S52_verifier.git_blob_sha='WRONG'],
['stage gate G0 closed',q=>q.G.current_lawful_state.G0_complete=true],
['stage gate G1 authorized',q=>q.G.current_lawful_state.G1_authorized=true],
['stage gate W L synthesis authorized',q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true],
['Oct03 source bytes falsely verified',q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
['third party status falsely PASS',q=>q.G.verification_at_record_creation.third_party='PASSED'],
['new source paper G0 full falsely certified',q=>q.O.original_nine_source_reverse_exhaustiveness=true]
];
const rejected=[],escaped=[],crashed=[];
for(const[name,modify]of changes){const q=copy(obj),before=JSON.stringify(q);try{modify(q);if(JSON.stringify(q)===before)escaped.push(name+': no effect');else if(check(q).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+': '+e.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §5.2 Hodge source-first G0 0.2',pass:errors.length===0,errors,positive_errors:positive,hostile_total:changes.length,hostile_rejected:rejected.length,hostile_escaped:escaped.length,hostile_crashed:crashed.length,source_items:151,W05_typed_incidences:98,all_W_typed_incidences:371,G0_status:'OPEN_UNFROZEN',external:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
