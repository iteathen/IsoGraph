import fs from 'node:fs';import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_49.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_50.json","oldD":"experiments/062/W_G0_W01_S6_SOURCE_DEMAND_PROJECTION_0_33.json","D":"experiments/062/W_G0_W01_S5_SOURCE_DEMAND_PROJECTION_0_34.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_35.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_36.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_34.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_35.json","oldU":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_16.json","U":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_17.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_104.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_105.json","O":"experiments/062/W01_G0_S5_SOURCE_FIRST_0_1.json","F":"experiments/062/W01_G0_S5_TYPED_DEFECT_0_1.json","N":"experiments/062/W01_G0_S5_MODAL_NEGATIVE_0_1.json","self":"experiments/062/tools/verify-w01-s5-speculative-source-g0-0-1.mjs"};
const PIN={"oldS":"a414b5e0e6d9b84e30aa1f2278da8fea60aae54c","S":"d139d5a0b2790524b379d148baffb360c71ba429","oldD":"94b6154b07d837cd6af25429ad6769c58ec401b2","D":"4f39f436203213882d01e4985e530156fc77b759","oldR":"7192eb3c34c14d4e6de92637c18c6c63da0cae78","R":"254479f169cb720bb78fa47377c23fc801b76147","oldC":"72a9613c90fc987b5148141b912847800e9ff424","C":"add6dc7f89fbeef7eb6cb679ae4db4a48c3f525c","oldU":"4c7f1491ce2882914280310d0fb9397c57ac85b1","U":"79618ea1ffa6e2400f02d4c0634e7cf4399792fa","oldG":"f30cc32bd94718fd7299b72297bb2584fc2e8628","O":"51754a9e0330c2724c0cda253f975baa9c99b74a","F":"3ca733c61892e6007ca7bc9a23598d406188c3f3","N":"a66f627fe06ab5d41a520fcb3fec18fa35ff7063"};
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const hashOf=k=>{let b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const orig=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,read(k)]));
const clone=x=>JSON.parse(JSON.stringify(x));
const validate=function validate(q,cx){
 const e=[],ok=(b,m)=>{if(!b)e.push(m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const {oldS,S,oldD,D,oldR,R,oldC,C,oldU,U,oldG,G,O,F,N}=q;
 const ids=["W-SSC-044","W-SSC-045","W-SSC-114","W-SSC-115","W-SSC-116"],selected=["W-SSC-114","W-SSC-116"];
 const item=id=>S?.items?.find(x=>x.id===id),was=id=>oldS?.items?.find(x=>x.id===id),typed=id=>item(id)?.source_expression_census?.statements||[];
 const record=id=>O?.source_typed_occurrences?.find(x=>x.id===id);
 ok(oldS?.schema==="woit.source-semantic-census.v0.49"&&S?.schema==="woit.source-semantic-census.v0.50"&&S?.census_item_count===151&&S?.items?.length===151&&S?.source_count===9&&S?.closure_claims?.sealed===false,"source0.50 and G0 still OPEN");
 ok(S?.predecessor?.git_blob_sha===cx.pin.oldS&&S?.correction?.source_first_oracle?.git_blob_sha===cx.pin.O&&S?.correction?.source_defect?.git_blob_sha===cx.pin.F&&S?.correction?.negative_guard?.git_blob_sha===cx.pin.N,"original source snapshot lineage");
 if(S?.items?.length===151&&oldS?.items?.length===151){
  ok(eq(S.items.map(x=>x.id),oldS.items.map(x=>x.id))&&eq(S.items.filter((x,i)=>!eq(x,oldS.items[i])).map(x=>x.id),ids),"source IDs and only 5 exact source-item changes");
  ok(S.items.every((x,i)=>x.obligation===oldS.items[i].obligation),"every original author source obligation string exact");
 }
 for(const id of ids){const a=item(id),b=was(id),claims=typed(id),expected=O?.source_typed_occurrences?.filter(x=>x.owner===id);
  ok(a?.state==="OPEN_SPECULATIVE"&&a?.source==="W01 §5"&&b?.source_expression_census===undefined&&a?.obligation===b?.obligation,"old source text and modality preserved "+id);
  ok(a?.source_expression_census?.revision==="arXiv:2104.05099v2"&&a?.source_expression_census?.not_G1_authority===true&&eq(claims,expected),"ordered new author expression roles exact "+id);
 }
 ok(O?.schema==="isograph.exp062-w01-s5-source-first-speculative-reverse.v0.1"&&O?.frozen_primary?.revision==="arXiv:2104.05099v2"&&eq(O?.frozen_primary?.html_range,[341,353])&&eq(O?.frozen_primary?.printed_pdf_pages,[14,15])&&eq(O?.frozen_primary?.pdf_indices_visually_reviewed,[13,14]),"primary W01 exact revision and page intervals");
 ok(O?.source_first_rows?.length===11&&O?.source_typed_occurrences?.length===12&&O?.new_typed_occurrences===12,"W01 source 11 intervals 12 statements");
 if(O?.source_first_rows?.length===11){for(let i=0;i<11;i++){const x=O.source_first_rows[i];ok(x?.ordinal===i+1&&x?.first===(i?O.source_first_rows[i-1].last+1:341),"original source interval contiguous row "+i)}
 ok(O.source_first_rows[10]?.last===353&&eq(O.source_first_rows.flatMap(x=>x.ids),O.source_typed_occurrences.map(x=>x.id)),"all 12 source IDs captured in 11 intervals")}
 ok(eq(O?.target_item_ids,ids)&&eq(O?.per_item_counts,{"W-SSC-044":4,"W-SSC-045":2,"W-SSC-114":1,"W-SSC-115":2,"W-SSC-116":3}),"author source per owner counts");
 ok(O?.all_nine_original_source_reverse_complete===false&&O?.all_W151_demand_memberships_qualified===false&&O?.G0_frozen===false&&O?.L_semantics_used===false,"source-first no W-L bridge or premature G0");
 ok(record("W01-044-01")?.issue==="ORIGIN_OF_FERMION_GENERATIONS_UNKNOWN"&&record("W01-044-01")?.dependent_questions?.includes("MIXING_ANGLES"),"generation origin + mixing remains open");
 ok(record("W01-044-02")?.candidate_base==="S7"&&record("W01-044-02")?.author_modal==="IT_IS_POSSIBLE_FUNDAMENTAL_THEORY_SHOULD_LIVE_ON_S7","S7 remains candidate not physical fact");
 ok(eq(record("W01-044-03")?.source_ordered_rhs,["Spin(8)/Spin(7)","Spin(7)/G2","Spin(6)/SU(3)","Spin(5)/Sp(1)"])&&record("W01-044-03")?.relation==="SOURCE_DISPLAYED_CHAIN_OF_IDENTIFICATIONS","all four S7 quotient source mathematical identities exact order");
 ok(record("W01-044-04")?.S7_identified_with==="UNIT_OCTONIONS"&&eq(record("W01-044-04")?.author_used_presentations,["Spin(6)/SU(3)","Spin(5)/Sp(1)"])&&eq(record("W01-044-04")?.author_not_used_presentations,["Spin(8)/Spin(7)","Spin(7)/G2"]),"the used vs previously unused S7 quotient contrast source kept");
 ok(record("W01-045-01")?.complex_matrix_size==="4x4"&&record("W01-045-01")?.candidate_origin==="CLIFFORD_ALGEBRA_BUNDLE_ON_S4"&&record("W01-045-01")?.epistemic==="HYPOTHESIS_ONLY","Clifford PT lift explicitly hypothetical");
 ok(record("W01-045-02")?.comparison_subject==="CONVENTIONAL_LATTICE_KOGUT_SUSSKIND_FERMIONS"&&record("W01-045-02")?.conventional_spinor_multiplicity==="MULTIPLE_COPIES_OF_BOTH_SPACETIME_CHIRALITIES","Kogut-Susskind both-chiral conventional distinct");
 ok(record("W01-114-01")?.source_modal==="WOULD_BE_SOMETHING_DIFFERENT"&&record("W01-114-01")?.resulting_multiplicity===16&&record("W01-114-01")?.copy_type==="WEYL_SPINOR"&&record("W01-114-01")?.source_Weyl_degree_carrier==="CP1_FIBER_AT_PT_SPACETIME_POINT"&&record("W01-114-01")?.negative?.includes("NOT_SIXTEEN_GENERATIONS"),"hypothetical 16 Weyl copies not proven 16 generations");
 ok(record("W01-115-01")?.group==="SU(2,2)"&&record("W01-115-01")?.orbit==="PT_PLUS"&&record("W01-115-01")?.technical_obstruction==="LACK_OF_APPROPRIATE_INVARIANT_POLARIZATION","PT+ quantization obstruction remains");
 ok(record("W01-115-02")?.cited_prior?.includes("[33]")&&record("W01-115-02")?.author_modal==="IT_MAY_GIVE_NEW_INSIGHT","analytic continuation as hope not already solved");
 ok(record("W01-116-01")?.statement==="ANTI_SELF_DUALITY_EQUATIONS_MOMENT_MAP_VANISHING"&&record("W01-116-01")?.source_cited_reference==="[40]","ASD moment map cited not general Yang Mills dynamics");
 ok(eq(record("W01-116-02")?.source_theories,["N_EQUALS_2_SUPER_YANG_MILLS","N_EQUALS_4_SUPER_YANG_MILLS"])&&record("W01-116-02")?.source_reference!==""&&record("W01-116-02")?.transformation==="TWIST_SPACETIME_SYMMETRY_INTO_INTERNAL_SYMMETRY","twisted N2 N4 source-only");
 ok(record("W01-116-03")?.source_reference==="[23]"&&record("W01-116-03")?.epistemic==="AUTHOR_SPECULATION_NO_ASSERTED_ISOMORPHISM"&&record("W01-116-03")?.negative?.includes("NO_PROVEN_PT_GEOMETRIC_LANGLANDS_EQUIVALENCE"),"N4 geometric Langlands is analogy only");
 ok(F?.earliest_stage==="G0_SOURCE_SEMANTIC_CENSUS"&&eq(F?.corrected_source_item_ids,ids)&&F?.all_151_original_obligations_exact===true&&F?.historical86?.selected_to_change?.join(",")===selected.join(",")&&eq(F?.historical86?.historically_excluded_changed_ids,["W-SSC-044","W-SSC-045","W-SSC-115"]),"G0 source defect/old86 exact member provenance");
 ok(N?.status==="NONAUTHOR_ILLUSTRATION_OF_HYPOTHETICAL_VS_SOURCE_FIXED_SCOPE"&&N?.invariant_premises?.length===4&&N?.scenario_uncompleted?.PT_lift_16_Weyl==="UNCONSTRUCTED"&&N?.scenario_hypothetical?.PT_N4_relation==="NOT_FORCED"&&N?.author_source_text_unchanged===true&&N?.not_actual_physical_models===true,"non-author two-model nonentailment only");
 ok(D?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.34"&&D?.items?.length===86&&D?.current_source?.git_blob_sha===cx.pin.S&&D?.predecessor_W_only_demand?.git_blob_sha===cx.pin.oldD&&D?.counts?.full_151_source_semantic_demand_qualified===false,"historical W86 updated but not full 151");
 const afterSel=D?.items?.filter((x,i)=>!eq(x,oldD?.items?.[i])).map(x=>x.census_id);
 ok(eq(afterSel,selected)&&D?.counts?.changed_W_members===2&&D?.counts?.other_84_exact_unchanged===true,"only 2 old86 records modified other84 exact");
 for(const id of ids){const exists=D?.items?.some(x=>x.census_id===id),expect=selected.includes(id);ok(exists===expect,"historical86 membership exact for "+id);if(expect){const sel=D?.items?.find(x=>x.census_id===id);ok(sel?.body===item(id)?.obligation&&eq(sel?.source_formula_incidences,typed(id)),"selected old86 record current source exact "+id)}}
 ok(R?.schema==="isograph.exp062-w-g0-all-151-source-membership-register.v0.36"&&R?.rows?.length===151&&R?.source_census?.git_blob_sha===cx.pin.S&&R?.historical_86_projection?.git_blob_sha===cx.pin.D&&R?.predecessor_register?.git_blob_sha===cx.pin.oldR,"source register all151 exact pins");
 ok(C?.schema==="isograph.exp062-w-g0-line-by-line-151-coverage.v0.35"&&C?.rows?.length===151&&C?.source_census?.git_blob_sha===cx.pin.S&&C?.reconstructed_register?.git_blob_sha===cx.pin.R&&C?.predecessor_coverage?.git_blob_sha===cx.pin.oldC,"coverage all151 exact source/registration");
 ok(eq(R?.rows?.filter((x,i)=>!eq(x,oldR?.rows?.[i])).map(x=>x.census_id),ids)&&eq(C?.rows?.filter((x,i)=>!eq(x,oldC?.rows?.[i])).map(x=>x.census_id),ids),"only five register coverage record changes");
 const chosen=new Set(D?.items?.map(x=>x.census_id)||[]);
 let sum=0;const units={};
 if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151){for(let i=0;i<151;i++){const x=S.items[i],y=R.rows[i],z=C.rows[i],m=x.source_expression_census?.statements?.length||0,u=x.source.match(/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/)?.[0];sum+=m;units[u]=(units[u]||0)+m;
 ok(x.id===y.census_id&&x.id===z.census_id&&y.source_body_exact===x.obligation&&z.body_length_chars===x.obligation.length&&y.source_expression_statement_count===m&&z.source_expression_statement_count===m&&z.stage_authority===false,"source/register/coverage all151 aligned at "+i);
 ok(y.historical_86_member===chosen.has(x.id)&&z.historical_in_86===chosen.has(x.id),"historical86 membership W current151 correct at "+i);
 }}
 ok(sum===429&&units.W01===144&&eq(R?.counts?.current_source_expression_units,units)&&C?.by_unit?.W01?.source_expression_statements===144&&C?.counts?.total_structured_source_incidents===429,"all typed counts W01 144 global429");
 ok(U?.schema==="isograph.exp062-w-g0-source-unit-current-inventory.v0.17"&&U?.source_census?.git_blob_sha===cx.pin.S&&U?.historical_parent?.git_blob_sha===cx.pin.oldU&&U?.summary?.structured_incidences===429&&U?.summary?.all_nine_original_source_reverse_exhaustive===false&&U?.units?.reduce((a,x)=>a+x.structured_incidences,0)===429,"nine source inventory G0-unfrozen");
 ok(oldG?.schema==="isograph.exp062-w-current-stage-gate.v0.104"&&G?.schema==="isograph.exp062-w-current-stage-gate.v0.105"&&G?.supersedes?.git_blob_sha===cx.pin.oldG&&G?.track==="W"&&G?.semantic_authority===false,"G0 gate lineage parent0.104");
 ok(G?.current_source_census?.git_blob_sha===cx.pin.S&&G?.current_historical_86_member_projection?.git_blob_sha===cx.pin.D&&G?.current_all_151_conservation_register?.git_blob_sha===cx.pin.R&&G?.current_source_coverage?.git_blob_sha===cx.pin.C,"G0 source current full tuple");
 ok(G?.current_W01_S5_source_oracle?.git_blob_sha===cx.pin.O&&G?.current_W01_S5_source_defect?.git_blob_sha===cx.pin.F&&G?.current_W01_S5_modal_negative?.git_blob_sha===cx.pin.N&&G?.current_W_nine_source_inventory?.git_blob_sha===cx.pin.U,"current source-first evidence pins exact");
 ok(G?.current_W01_S5_source_verifier?.git_blob_sha===cx.selfSHA&&G?.current_W01_S5_source_verifier?.path===cx.selfPath,"current checker pinned to content and path");
 ok(G?.verification_at_record_creation?.W01_S5_NodeCI==="PENDING_THIS_SOURCE0_50_COMMIT"&&G?.verification_at_record_creation?.third_party==="OWNER_BYPASSED_NOT_PASSED","Node G0 and external not preclaimed");
 const st=G?.current_lawful_state;
 ok(st?.G0_open===true&&st?.G0_complete===false&&st?.G0_frozen===false,"G0 open");
 for(const key of ["source_census_frozen","all_nine_source_full_reverse_assertion_enumeration_complete","Oct03_mutable_source_byte_identity_verified","complete_W_151_semantic_demand_membership_requalified","G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"])ok(st?.[key]===false,"G0 locked "+key);
 return e;
};
const muts=[
["remove W01 S5 item",q=>q.S.items.splice(43,1)],
["modify unrelated W02 source",q=>q.S.items[7].obligation+=" malicious"],
["change 044 source body",q=>q.S.items[43].obligation+=" new"],
["source open/speculative promoted",q=>q.S.items[43].state="QUALIFIED_THEOREM"],
["source W044 loses expression",q=>q.S.items[43].source_expression_census.statements.pop()],
["source W045 loses expression",q=>q.S.items[44].source_expression_census.statements.pop()],
["source W114 loses expression",q=>q.S.items[113].source_expression_census.statements.pop()],
["source W115 loses expression",q=>q.S.items[114].source_expression_census.statements.pop()],
["source W116 loses expression",q=>q.S.items[115].source_expression_census.statements.pop()],
["source full count wrong",q=>q.S.census_item_count=150],
["source W01 arxiv version wrong",q=>q.S.items[43].source_expression_census.revision="arXiv:2104.05099v1"],
["S7 candidate treated proven",q=>q.O.source_typed_occurrences[1].author_modal="THIS_IS_FUNDAMENTAL"],
["S7 quotient first group wrong",q=>q.O.source_typed_occurrences[2].source_ordered_rhs[0]="Spin(7)/G2"],
["S7 quotient fourth group wrong",q=>q.O.source_typed_occurrences[2].source_ordered_rhs[3]="Spin(6)/G2"],
["S7 prior used first two",q=>q.O.source_typed_occurrences[3].author_used_presentations=["Spin(8)/Spin(7)","Spin(7)/G2"]],
["unit octonion role swapped",q=>q.O.source_typed_occurrences[3].S7_identified_with="UNIT_QUATERNIONS"],
["Clifford S4 lift became proven",q=>q.O.source_typed_occurrences[4].epistemic="PROVEN"],
["Kogut Susskind treated one chirality",q=>q.O.source_typed_occurrences[5].conventional_spinor_multiplicity="ONE_WEYL"],
["hypothetical sixteen copies become generations",q=>q.O.source_typed_occurrences[6].negative=[]],
["16 Weyl becomes 3",q=>q.O.source_typed_occurrences[6].resulting_multiplicity=3],
["16 Weyl fiber changed",q=>q.O.source_typed_occurrences[6].source_Weyl_degree_carrier="EXTERIOR_ALGEBRA"],
["missing invariant polarization becomes found",q=>q.O.source_typed_occurrences[7].technical_obstruction="SOLVED"],
["PT+ SU(2,2) becomes SU(4)",q=>q.O.source_typed_occurrences[7].group="SU(4)"],
["Euclidean speculation author certainty",q=>q.O.source_typed_occurrences[8].author_modal="PROVEN_TO_WORK"],
["ASD moment map relation universal YM",q=>q.O.source_typed_occurrences[9].statement="ALL_YM_FIELD_EQS_ZERO_MOMENT_MAP"],
["N2 missing",q=>q.O.source_typed_occurrences[10].source_theories.splice(0,1)],
["N4 missing",q=>q.O.source_typed_occurrences[10].source_theories.splice(1,1)],
["N4 twisted context proof",q=>q.O.source_typed_occurrences[11].epistemic="PROVEN_PT_ISOMORPHISM"],
["geometric Langlands [23] changed",q=>q.O.source_typed_occurrences[11].source_reference="[30]"],
["source interval missing",q=>q.O.source_first_rows.pop()],
["source interval gap",q=>q.O.source_first_rows[4].first=348],
["source HTML scope wrong",q=>q.O.frozen_primary.html_range=[341,355]],
["original arxiv wrong",q=>q.O.frozen_primary.revision="arXiv:2104.05099v1"],
["source oracle full reverse forged complete",q=>q.O.all_nine_original_source_reverse_complete=true],
["source oracle W-L semantics claimed",q=>q.O.L_semantics_used=true],
["source defect all 151 author text changed",q=>q.F.all_151_original_obligations_exact=false],
["source defect missing W045",q=>q.F.corrected_source_item_ids.splice(1,1)],
["source defect historically W044 included",q=>q.F.historical86.historically_excluded_changed_ids.splice(0,1)],
["negative hypothetical physical model asserted",q=>q.N.not_actual_physical_models=false],
["negative PT theory becomes forced",q=>q.N.scenario_uncompleted.PT_lift_16_Weyl="ALREADY_CONSTRUCTED"],
["old86 missing selected W114",q=>q.D.items.splice(q.D.items.findIndex(x=>x.census_id==="W-SSC-114"),1)],
["old86 W114 source body wrong",q=>q.D.items.find(x=>x.census_id==="W-SSC-114").body="WRONG"],
["old86 W116 source expression dropped",q=>q.D.items.find(x=>x.census_id==="W-SSC-116").source_formula_incidences.pop()],
["old86 unrelated W member modified",q=>q.D.items[0].body="WRONG"],
["old86 new excluded W044 inserted",q=>q.D.items[0].census_id="W-SSC-044"],
["old86 all151 falsely qualified",q=>q.D.counts.full_151_source_semantic_demand_qualified=true],
["current register source W115 count wrong",q=>q.R.rows[114].source_expression_statement_count=0],
["current register source W114 body wrong",q=>q.R.rows[113].source_body_exact="WRONG"],
["current register W114 membership forged excluded",q=>q.R.rows[113].historical_86_member=false],
["current register W115 membership falsely included",q=>q.R.rows[114].historical_86_member=true],
["current register W045 historical mode forged closed",q=>q.R.rows[44].historical_ledger_0_19_mode="CLOSED_SCHEMA"],
["current coverage W044 count wrong",q=>q.C.rows[43].source_expression_statement_count=0],
["current coverage W116 membership forged",q=>q.C.rows[115].historical_in_86=false],
["current coverage W01 unit count stale",q=>q.C.by_unit.W01.source_expression_statements=132],
["current coverage unrelated item altered",q=>q.C.rows[0].body_length_chars=0],
["inventory current typed stale",q=>q.U.summary.structured_incidences=417],
["inventory new W01 count stale",q=>q.U.units[0].structured_incidences=132],
["inventory all nine reverse falsely complete",q=>q.U.summary.all_nine_original_source_reverse_exhaustive=true],
["current W gate parent stale",q=>q.G.supersedes.git_blob_sha="WRONG"],
["current W gate source SHA stale",q=>q.G.current_source_census.git_blob_sha="WRONG"],
["current W gate register SHA stale",q=>q.G.current_all_151_conservation_register.git_blob_sha="WRONG"],
["current W gate coverage SHA stale",q=>q.G.current_source_coverage.git_blob_sha="WRONG"],
["current W gate oracle SHA stale",q=>q.G.current_W01_S5_source_oracle.git_blob_sha="WRONG"],
["current W gate source verifier SHA forged",q=>q.G.current_W01_S5_source_verifier.git_blob_sha="WRONG"],
["current W gate G0 closed",q=>q.G.current_lawful_state.G0_frozen=true],
["current W gate W151 full requalified",q=>q.G.current_lawful_state.complete_W_151_semantic_demand_membership_requalified=true],
["current W gate G1 authorized",q=>q.G.current_lawful_state.G1_authorized=true],
["current W gate G7 authorized",q=>q.G.current_lawful_state.G7_authorized=true],
["current W gate mutable Oct3 bytes falsely verified",q=>q.G.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["current W gate cross W-L synthesis enabled",q=>q.G.current_lawful_state.cross_track_synthesis_authorized=true],
["external review passed falsely",q=>q.G.verification_at_record_creation.third_party="PASSED"]
];
const selfSHA=hashOf('self');
const cx={pin:PIN,selfSHA,selfPath:P.self};
const errs=[];for(const [k,v] of Object.entries(PIN))if(hashOf(k)!==v)errs.push('BLOB_PIN '+k);
const positive=validate(orig,cx);errs.push(...positive.map(x=>'POSITIVE '+x));
const rejected=[],escaped=[],crashed=[];
for(const [name,fn] of muts){const q=clone(orig),before=JSON.stringify(q);try{fn(q);if(JSON.stringify(q)===before)escaped.push(name+' NO_EFFECT');else if(validate(q,cx).length)rejected.push(name);else escaped.push(name)}catch(err){crashed.push(name+' '+String(err));}}
errs.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W01 §5 speculative source 12 typed incidence G0 0.1',pass:errs.length===0,errors:errs,positive_errors:positive,source_items:151,W01_source_statements:144,all_W_typed_source_statements:429,historical_W86_members:86,current_W151_demands_requalified:false,hostile_controls:muts.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,stage:'G0_OPEN_UNFROZEN'}));
if(errs.length)process.exitCode=1;