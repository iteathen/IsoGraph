import fs from 'node:fs';
import crypto from 'node:crypto';
const artifacts={"gate":["experiments/062/W_CURRENT_STAGE_GATE_0_60.json","f9d0e983fca8517180c7e1d3dabb7cc26fb0eca3"],"source":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_32.json","04212aa6fc74c679fb4744aa038df0ef43b83262"],"reg":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_18.json","180c367a94457344ac6168eca0ea9f4f354709a1"],"coverage":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_17.json","bc2eedcf813167d09935f2b948c0849a47443ea8"],"demand":["experiments/062/W_G0_W01_SECTION31_32_SOURCE_DEMAND_PROJECTION_0_17.json","ea9690fdeb1e8d1349aab3b7e4e1641502628f39"],"oracle":["experiments/062/W01_G0_SECTIONS_31_32_PRIMARY_SOURCE_ORACLE_0_2.json","68746cd9046143e6bc807698fa8588b09d05305c"],"failed":["experiments/062/W01_G0_SECTION31_32_VERIFIER_FREEZE_MUTATION_ESCAPE_0_1.json","ba39c150bc10664e8c4a48cc2c050e2833b0e8a4"],"oldGate":["experiments/062/W_CURRENT_STAGE_GATE_0_59.json","4fcea98f932c4291ccd95f00dd3ead8eaceb84b4"]};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
function validate(a){
 const errs=[],ck=(v,m)=>{if(!v)errs.push(m)},g=a.gate,s=a.source,reg=a.reg,c=a.coverage,dem=a.demand,o=a.oracle;
 ck(g?.schema==="isograph.exp062-w-current-stage-gate.v0.60"&&g?.status==="W_G0_W01_HAMILTONIAN_HIGGS_15_SOURCE_INCIDENCES_CONSERVED_NODE_CI_PENDING_UNFROZEN"&&g?.track==="W"&&g?.semantic_authority===false,"source-only procedural gate");
 ck(g?.supersedes?.git_blob_sha===artifact.oldGate[1]&&g?.current_source_census?.git_blob_sha===artifact.source[1]&&g?.current_all_151_conservation_register?.git_blob_sha===artifact.reg[1]&&g?.current_source_coverage?.git_blob_sha===artifact.coverage[1]&&g?.current_historical_86_member_projection?.git_blob_sha===artifact.demand[1],"exact latest artifact inputs");
 const state=g?.current_lawful_state;
 ck(state?.G0_open===true&&state?.G0_complete===false&&state?.G0_frozen===false&&state?.source_census_frozen===false&&state?.all_nine_source_full_reverse_assertion_enumeration_complete===false&&state?.Oct03_mutable_source_byte_identity_verified===false&&state?.complete_W_151_semantic_demand_membership_requalified===false&&state?.all_151_closure_re_adjudicated===false,"unfrozen source/coverage/closure");
 for(const key of ["G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"])ck(state?.[key]===false,"unauthorized "+key);
 ck(s?.schema==="woit.source-semantic-census.v0.32"&&s?.status?.endsWith("G0_UNFROZEN")&&s?.census_item_count===151&&s?.items?.length===151&&s?.correction?.G0_frozen===false&&s?.correction?.G1_G7_authorized===false&&s?.closure_claims?.sealed===false&&s?.closure_claims?.primitive_closure===false,"source 0.32 not qualified");
 ck(s?.freeze_rule?.startsWith("SSC 0.32 W01 §3.1-3.2 source-local")&&s?.freeze_rule?.includes("no G1-G7 authorization"),"source-level frozen state string");
 ck(o?.schema==="isograph.exp062-w01-section31-32-direct-primary-source-oracle.v0.2"&&o?.counts?.total===15&&o?.source?.revision==="arXiv:2104.05099v2"&&o?.predecessor_candidate?.disposition?.includes("REJECTED"),"15 primary W01 v2 oracle no predecessor promotion");
 ck(g?.W01_section31_32_source_oracle?.git_blob_sha===artifact.oracle[1]&&g?.W01_section31_32_prepublication_rejected_oracle?.disposition?.startsWith("REJECTED")&&g?.W01_section31_32_verifier_failed_control?.disposition?.includes("PREPUBLICATION_42_OF_43"),"failed oracle/hostile control retained");
 ck(a.failed?.observed?.escaped_mutation==="source frozen falsely"&&a.failed?.observed?.adversarial_rejected===42,"preserve prepublication failure");
 ck(g?.W01_section31_32_source_replay?.verification==="V8_46_OF_46_MUTATIONS_REJECTED_NOT_NODE"&&g?.verification_at_record_creation?.W01_S31_32_NodeCI==="PENDING_COMMIT","don't overclaim CI pass in immutable creation gate");
 ck(g?.current_source_census?.frozen===false&&g?.current_all_151_conservation_register?.all_source_obligations_qualified===false&&g?.current_source_coverage?.reverse_all_original_nine_sources_complete===false&&g?.current_historical_86_member_projection?.qualification===false,"no masquerading source freeze");
 ck(s?.items?.length===151&&reg?.rows?.length===151&&c?.rows?.length===151&&dem?.items?.length===86,"source census / old view shapes");
 if(s?.items?.length!==151||reg?.rows?.length!==151||c?.rows?.length!==151||dem?.items?.length!==86)return errs;
 ck(reg?.source_census?.git_blob_sha===artifact.source[1]&&c?.source_census?.git_blob_sha===artifact.source[1]&&c?.reconstructed_register?.git_blob_sha===artifact.reg[1]&&dem?.current_source?.git_blob_sha===artifact.source[1],"reg/coverage/projection exact predecessor/source pins");
 ck(reg?.counts?.source_items===151&&reg?.counts?.historical_nonmembers===65&&reg?.counts?.old_projection_omits_old_incomplete===52&&reg?.counts?.old_projection_includes_old_closed_schema===8,"historical unresolved 52/8 not erased");
 ck(reg?.counts?.W01_source_expressions_total===122&&c?.counts?.W01_new_structured_source_expressions===122&&reg?.counts?.W01_corrected_items===24,"W01 107+15, 24 corrected");
 ck(reg?.counts?.all_nine_source_full_reverse_assertion_census_complete===false&&c?.counts?.original_nine_source_reverse_assertion_enumeration_complete===false,"original nine-source reverse unresolved");
 ck(reg.rows.every((x,i)=>x.census_id===s.items[i].id&&x.source_body_exact===s.items[i].obligation&&x.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"&&x.historical_closure_accepted_as_current===false),"all 151 source still open and exact body");
 ck(c.rows.every((x,i)=>x.census_id===s.items[i].id&&x.body_length_chars===s.items[i].obligation.length&&x.source_expression_statement_count===(s.items[i].source_expression_census?.statements?.length||0)),"all 151 formula count and prose");
 ck(dem.items.every(x=>x.track==="W"&&x.body===s.items.find(y=>y.id===x.census_id)?.obligation),"old 86 W source projection exact");
 const w=s.items.find(x=>x.id==="W-SSC-112")?.source_expression_census?.statements,
       q=s.items.find(x=>x.id==="W-SSC-032")?.source_expression_census?.statements;
 ck(w?.length===9&&q?.length===6,"15 source roles still");
 ck(w?.[1]?.source_binding==="THREE_DIMENSIONAL_HYPERSURFACE"&&w?.[1]?.preexisting_symbol_scope==="EARLIER_M_IS_FOUR_DIMENSIONAL_RIEMANNIAN_MANIFOLD","typed M binder distinction");
 ck(w?.[7]?.side_condition==="AT_LEAST_WHEN_NO_BOUNDARIES"&&w?.[7]?.total_extra===4,"gravity conditional H=0");
 ck(w?.[8]?.negative==="CHIRAL_FORMALISM_DOES_NOT_BY_ITSELF_RESOLVE_QUANTUM_GRAVITY_QUANTIZATION","gravity limits");
 ck(q?.[2]?.first_problem==="ELECTROWEAK_U1_EXTRA_GAUGE_SYMMETRY_NOT_SUPPLIED_BY_SU2_L_ALONE"&&q?.[3]?.author_wants_invariant_under==="SU2_R"&&q?.[4]?.desired_group==="U2"&&q?.[4]?.desired_Higgs_representation==="DEFINING_C2_OF_U2"&&q?.[5]?.source_modality==="AUTHOR_FORWARD_PROPOSAL_NOT_ESTABLISHED_WITHIN_SECTION3_2","Higgs U2 source roles not qualified");
 ck(g?.W01_section31_32_source_oracle?.source_statements===15&&g?.W01_section31_32_reverse_coverage?.status==="SECTION_REVERSE_ONLY_NOT_ALL_W01","no fake 48-page completion");
 ck(g?.invalidations?.G1_to_G7==="BLOCKED_CURRENT_G0_UNFROZEN"&&g?.source_negative_and_irregularity_guards?.some(x=>/Higgs oneform/.test(x)),"retained negative and downstream invalidation");
 return errs;
}
const T=[
["premature G0 freeze",x=>x.gate.current_lawful_state.G0_frozen=true],
["premature SSC frozen",x=>x.gate.current_source_census.frozen=true],
["source freeze string changed",x=>x.source.freeze_rule="G0 FROZEN"],
["G1 falsely authorized",x=>x.gate.current_lawful_state.G1_authorized=true],
["G7 falsely authorized",x=>x.gate.current_lawful_state.G7_authorized=true],
["IA falsely authorized",x=>x.gate.current_lawful_state.recursive_IA_authorized=true],
["all 151 falsely qualified",x=>x.gate.current_all_151_conservation_register.all_source_obligations_qualified=true],
["all nine reverse falsely done",x=>x.gate.current_source_coverage.reverse_all_original_nine_sources_complete=true],
["mutable source bytes falsely verified",x=>x.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["old 86 declared qualified",x=>x.gate.current_historical_86_member_projection.qualification=true],
["SSC hashed to bogus",x=>x.gate.current_source_census.git_blob_sha="BAD"],
["register hash bogus",x=>x.gate.current_all_151_conservation_register.git_blob_sha="BAD"],
["coverage hash bogus",x=>x.gate.current_source_coverage.git_blob_sha="BAD"],
["old 86 hash bogus",x=>x.gate.current_historical_86_member_projection.git_blob_sha="BAD"],
["G0 15 oracle missing",x=>x.gate.W01_section31_32_source_oracle.source_statements=0],
["rejected prepub v0.1 declared passed",x=>x.gate.W01_section31_32_prepublication_rejected_oracle.disposition="PASSED"],
["prepub 42/43 failure erased",x=>x.gate.W01_section31_32_verifier_failed_control.disposition="PASS"],
["failed mutation missing",x=>x.failed.observed.escaped_mutation="NOT_FAILED"],
["old CI asserted qualification",x=>x.gate.verification_at_record_creation.W01_S31_32_NodeCI="QUALIFIED"],
["remove source item",x=>x.source.items.pop()],
["remove register",x=>x.reg.rows.pop()],
["remove coverage",x=>x.coverage.rows.pop()],
["change one historical W member",x=>x.demand.items[0].body+=" BAD"],
["remove old omitted 52",x=>x.reg.counts.old_projection_omits_old_incomplete=0],
["remove old included 8",x=>x.reg.counts.old_projection_includes_old_closed_schema=0],
["source W32 Higgs already invariant",x=>x.source.items.find(v=>v.id==="W-SSC-032").source_expression_census.statements[3].author_wants_invariant_under="NONE"],
["source W112 M3->M4",x=>x.source.items.find(v=>v.id==="W-SSC-112").source_expression_census.statements[1].source_binding="M4"],
["source W112 no boundary qualifier",x=>x.source.items.find(v=>v.id==="W-SSC-112").source_expression_census.statements[7].side_condition="ALWAYS"],
["source non-completion erased",x=>x.source.items.find(v=>v.id==="W-SSC-112").source_expression_census.statements[8].negative="QUANTUM_GRAVITY_SOLVED"],
["source U2 replaced product",x=>x.source.items.find(v=>v.id==="W-SSC-032").source_expression_census.statements[4].desired_group="SU2xU1"],
["source W103 other body changed",x=>x.source.items.find(v=>v.id==="W-SSC-103").obligation+=" BAD"],
["current gate incorrectly claims G1-G7 old authority",x=>x.gate.invalidations.G1_to_G7="AUTHORITY_RESTORED"]
];
const base=Object.fromEntries(Object.entries(artifacts).map(([k,[p]])=>[k,read(p)]));
const problems=validate(base),rejected=[],escaped=[];
for(const [n,f] of T){const m=JSON.parse(JSON.stringify(base));f(m);if(validate(m).length)rejected.push(n);else escaped.push(n)}
// Gate itself is checked field-by-field; pinning its blob here would create a circular dependency because the gate pins this verifier revision.
for(const [key,[p,sha]] of Object.entries(artifacts))if(key!=='gate'&&gitSha(p)!==sha)problems.push('SOURCE_BLOB_MISMATCH '+key);
problems.push(...escaped.map(x=>'ESCAPED_MUTANT '+x));
const guard=base.gate?.W01_section31_32_current_G0_guard;
if(guard?.path!=='experiments/062/tools/verify-w01-section31-32-current-g0-gate-0-1.mjs'||guard?.git_blob_sha!==gitSha(guard.path))problems.push('CURRENT_GATE_VERIFIER_SELF_PIN_INVALID');
if(rejected.length!==T.length)problems.push('ADVERSARIAL_COVERAGE_INCOMPLETE');
console.log(JSON.stringify({schema:'isograph.exp062-w-g0-current-s32-gate-hostile.v0.1',pass:!problems.length,errors:problems,current_W_gate:'G0_OPEN_SSC0.32_UNFROZEN',source_items:151,old_W_demand_members:86,corrected_items:['W-SSC-032','W-SSC-112'],new_source_incidences:15,mutations:T.length,mutations_rejected:rejected.length,rejected,source_complete:false,downstream_authorized:false,external:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(problems.length)process.exitCode=1;
