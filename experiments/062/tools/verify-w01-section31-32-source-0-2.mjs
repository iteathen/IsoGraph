import fs from 'node:fs';
import crypto from 'node:crypto';
const refs={"oldS":"75dd724efbfffdcd5d475769cb5f3bea6eaaa97b","oldD":"5415ad2e1e6491e89657e0f2d59804108f6bf163","oldR":"95182dfb2d5bdec8740743325ce5a32e765d6a25","oldC":"ed5f6e4bb7c80f4a792997372f699b0dc707446c","oracleOld":"21c785409bfe6c8026f225d84e99398e9001baab","oracle":"68746cd9046143e6bc807698fa8588b09d05305c","ssc":"04212aa6fc74c679fb4744aa038df0ef43b83262","demand":"ea9690fdeb1e8d1349aab3b7e4e1641502628f39","register":"180c367a94457344ac6168eca0ea9f4f354709a1","coverage":"bc2eedcf813167d09935f2b948c0849a47443ea8","failed":"ba39c150bc10664e8c4a48cc2c050e2833b0e8a4"};
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_31.json","oldD":"experiments/062/W_G0_W01_MAIN_SOURCE_DEMAND_PROJECTION_0_16.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_17.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_16.json","oracleOld":"experiments/062/W01_G0_SECTIONS_31_32_PRIMARY_SOURCE_ORACLE_0_1.json","oracle":"experiments/062/W01_G0_SECTIONS_31_32_PRIMARY_SOURCE_ORACLE_0_2.json","ssc":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_32.json","demand":"experiments/062/W_G0_W01_SECTION31_32_SOURCE_DEMAND_PROJECTION_0_17.json","register":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_18.json","coverage":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_17.json","failed":"experiments/062/W01_G0_SECTION31_32_VERIFIER_FREEZE_MUTATION_ESCAPE_0_1.json"};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const oldS=read(P.oldS),oldD=read(P.oldD),oldR=read(P.oldR),oldC=read(P.oldC),oracle=read(P.oracle);
const clone=x=>JSON.parse(JSON.stringify(x)),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const ids=["W-SSC-032","W-SSC-112"],by=(x,id,key="id")=>x?.items?.find(t=>t[key]===id);
const tails={"W-SSC-032":" W01 §3.2 separately says the proposed SU(2)_L weak connection omega_L and imaginary-time component of the canonical one-form as Higgs could be assigned the usual Standard Model Yang–Mills and Higgs kinetic/potential dynamics (an author claim, not a demonstrated complete model). It then lists two explicit objections: the electroweak extra U(1) is not yet supplied by SU(2)_L alone; and the Higgs one-form transforms nontrivially under BOTH SU(2)_L and SU(2)_R although the author wants invariance under SU(2)_R. W01 says the extra U(1) SHOULD combine with SU(2)_L to give U(2), with the Higgs in the defining complex C2 representation. The author points forward to a twistor-space formulation as a proposed solution, not a completed source-local proof in §3.2.","W-SSC-112":" W01 §3.1's Hamiltonian passage requires choosing a time coordinate AND a three-dimensional hypersurface called M; that M symbol is a locally rebound 3D carrier, distinct from the earlier four-dimensional Riemannian M. The choice restricts right-handed four-dimensional spinor fields to three-dimensional spinor fields S and the canonical one-form theta to an R3-valued form with R3 a subspace of End(S). The author compares Euclidean Ashtekar canonical variables with SU(2) Yang–Mills variables while distinguishing role pairs: (spin connection, canonical one-form) versus (gauge field, electric field). Both have an SU(2)-gauge-generated Gauss-law constraint, but only Yang–Mills here has the electric/magnetic norm-square Hamiltonian; Ashtekar diffeomorphism invariance adds four constraints, three spatial-translation and one time-translation, with the last setting the Hamiltonian to zero AT LEAST WHEN THERE ARE NO BOUNDARIES. The source explicitly says chirality by itself does NOT solve quantum-gravity quantization, and describes other-chirality/time-direction possibilities as prospective."},frozenRule="SSC 0.32 W01 §3.1-3.2 source-local 15-incidence targeted repair only. Whole 48-page W01 + nine frozen sources reverse assertion census, original Oct3 mutable-source byte provenance, and current 151-row source closure remain unqualified; no G1-G7 authorization.";
function verify(x){
const errors=[],f=(truth,msg)=>{if(!truth)errors.push(msg)};
const {ssc,demand,register,coverage}=x;
f(ssc?.schema==="woit.source-semantic-census.v0.32"&&ssc?.status==="W01_SECTION31_32_HAMILTONIAN_WEAK_SOURCE_SCOPE_TWO_ITEM_REPAIR_CANDIDATE_G0_UNFROZEN","exact SSC candidate");
f(ssc?.freeze_rule===frozenRule&&ssc?.correction?.G0_frozen===false&&ssc?.correction?.G1_G7_authorized===false&&ssc?.closure_claims?.primitive_closure===false&&ssc?.closure_claims?.sealed===false,"SOURCE_STILL_G0_UNFROZEN_NO_PROMOTION");
f(ssc?.items?.length===151&&ssc?.census_item_count===151&&demand?.items?.length===86&&register?.rows?.length===151&&coverage?.rows?.length===151,"all input array length and census counts");
f(ssc?.predecessor?.git_blob_sha===refs.oldS&&ssc?.correction?.cause?.git_blob_sha==="74f518af12815348ac25bb85fcad9bdad45178ec"&&ssc?.correction?.primary_source_oracle?.git_blob_sha===refs.oracle,"oracle/predecessor/defect exact pins");
f(eq(ssc?.correction?.changed_W_ids,ids)&&ssc?.correction?.added_source_incidents===15&&ssc?.correction?.other_149_source_items_exactly_unchanged===true,"minimal change scope");
f(demand?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.17"&&demand?.status==="W01_SECTION31_32_HISTORICAL_86_W_DEMAND_REPLAY_NOT_CURRENT_CLOSED_CORPUS","historical 86 W only");
f(demand?.replay_policy?.G1_authorized===false&&demand?.replay_policy?.G0_frozen===false&&demand?.replay_policy?.complete_source_reverse===false&&demand?.replay_policy?.L_members==="NOT_ACCESSED_OR_MODIFIED","no G1/L/closure");
f(oracle?.schema==="isograph.exp062-w01-section31-32-direct-primary-source-oracle.v0.2"&&oracle?.source?.revision==="arXiv:2104.05099v2"&&oracle?.counts?.total===15&&oracle?.predecessor_candidate?.git_blob_sha===refs.oracleOld,"source oracle arxiv v2 and rejected predecessor");
if(ssc?.items?.length!==151||demand?.items?.length!==86||register?.rows?.length!==151||coverage?.rows?.length!==151)return errors;
f(eq(ssc.items.map(t=>t.id),oldS.items.map(t=>t.id))&&eq(demand.items.map(t=>t.census_id),oldD.items.map(t=>t.census_id)),"source and old W projection IDs/order");
const changedSet=new Set(ids);
for(let i=0;i<151;i++){
 const prior=oldS.items[i],s=ssc.items[i],r=register.rows[i],c=coverage.rows[i];
 if(!changedSet.has(prior.id)){f(eq(s,prior),"old unchanged source drift "+prior.id);f(eq(r,oldR.rows[i]),"old unchanged register drift "+prior.id);f(eq(c,oldC.rows[i]),"old unchanged coverage drift "+prior.id)}
 f(r?.census_id===s.id&&r?.source_body_exact===s.obligation&&r?.source_expression_statement_count===(s.source_expression_census?.statements?.length||0),"source->register "+prior.id);
 f(c?.census_id===s.id&&c?.body_length_chars===s.obligation.length&&c?.source_expression_statement_count===(s.source_expression_census?.statements?.length||0),"source->coverage "+prior.id);
 f(r?.historical_closure_accepted_as_current===false&&r?.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING","historical closure forbidden "+prior.id);
}
for(let i=0;i<86;i++){const d=demand.items[i],p=oldD.items[i];
 f(d.track==="W"&&d.body===by(ssc,d.census_id)?.obligation,"source->historical_W_demand "+p.census_id);
 if(!changedSet.has(p.census_id))f(eq(d,p),"other old demand changed "+p.census_id)}
f(demand?.current_source?.git_blob_sha===refs.ssc&&demand?.predecessor_W_only_demand?.git_blob_sha===refs.oldD,"demand tuple pins");
f(register?.source_census?.git_blob_sha===refs.ssc&&register?.historical_86_projection?.git_blob_sha===refs.demand&&register?.predecessor_register?.git_blob_sha===refs.oldR,"register pins");
f(coverage?.source_census?.git_blob_sha===refs.ssc&&coverage?.reconstructed_register?.git_blob_sha===refs.register&&coverage?.predecessor_coverage?.git_blob_sha===refs.oldC,"coverage pins");
f(register?.counts?.W01_source_expressions_total===122&&register?.counts?.W01_corrected_items===24&&coverage?.counts?.W01_new_structured_source_expressions===122&&coverage?.counts?.W01_corrected_items===24,"W01 source count 107+15");
f(register?.counts?.all_nine_source_full_reverse_assertion_census_complete===false&&coverage?.counts?.original_nine_source_reverse_assertion_enumeration_complete===false,"nine source reverse census remains incomplete");
const b32=by(ssc,"W-SSC-032"),b112=by(ssc,"W-SSC-112"),q=b32?.source_expression_census?.statements||[],w=b112?.source_expression_census?.statements||[];
f(b32?.state==="OPEN"&&b112?.state==="OPEN"&&b32?.obligation===by(oldS,"W-SSC-032")?.obligation+tails["W-SSC-032"]&&b112?.obligation===by(oldS,"W-SSC-112")?.obligation+tails["W-SSC-112"],"no unsupported original-body rewrite");
f(q.length===6&&w.length===9&&eq(q,oracle.statements["W-SSC-032"])&&eq(w,oracle.statements["W-SSC-112"]),"ordered exact 15 source assertions/roles");
if(q.length!==6||w.length!==9)return errors;
f(q[0].electroweak?.connection==="SU2_L_SPIN_CONNECTION_OMEGA_L"&&q[0].gravity?.connection==="SU2_R_SPIN_CONNECTION_OMEGA_R"&&q[0].electroweak?.field==="IMAGINARY_TIME_COMPONENT_OF_THETA_AS_HIGGS","distinct weak/chiral fields");
f(q[1].source_quoted_clause==="These can be given exactly the dynamics of the Standard Model"&&q[1].methods?.length===3&&q[1].source_modality?.includes("AUTHOR_ASSERTS_POSSIBILITY"),"author stated possibility no proof");
f(q[2].first_problem==="ELECTROWEAK_U1_EXTRA_GAUGE_SYMMETRY_NOT_SUPPLIED_BY_SU2_L_ALONE","first explicit U1 problem");
f(eq(q[3].acts_nontrivially,["SU2_L","SU2_R"])&&q[3].author_wants_invariant_under==="SU2_R"&&q[3].source_modality==="AUTHOR_EXPLICIT_PROBLEM_NOT_SOLVED_IN_THIS_SECTION","Higgs SU2R obstruction/polarity");
f(q[4].desired_group==="U2"&&q[4].combine_with==="SU2_L"&&q[4].desired_Higgs_representation==="DEFINING_C2_OF_U2"&&q[4].source_modality==="AUTHOR_DESIRED_CONSTRUCTION","not SU2xU1 equality");
f(q[5].author_wording==="A solution to these problems can be found by formulating the theory in twistor space"&&q[5].source_modality==="AUTHOR_FORWARD_PROPOSAL_NOT_ESTABLISHED_WITHIN_SECTION3_2","future twistor proposal not established");
f(w[0].kind==="SOURCE_ATTRIBUTED_ASHTEKAR_REFORMULATION"&&eq(w[0].cited_refs,["[4]","[5]"])&&w[0].source_modality==="SOURCE_AUTHOR_DESCRIPTION_WITH_CITATIONS_NOT_NEW_PROOF","historical cited Ashtekar");
f(w[1].source_symbol==="M"&&w[1].source_binding==="THREE_DIMENSIONAL_HYPERSURFACE"&&w[1].preexisting_symbol_scope==="EARLIER_M_IS_FOUR_DIMENSIONAL_RIEMANNIAN_MANIFOLD"&&w[1].operands?.[0]==="time coordinate","M3/M4 rebinding and time");
f(w[2].target==="three-dimensional spinor fields S"&&eq(w[2].conditions,["chosen time coordinate","chosen M3"]),"time spinor restriction");
f(w[3].result==="R3_VALUED_CANONICAL_ONE_FORM"&&w[3].source_inclusion==="R3 subset End(S)"&&w[3].restricted_to==="M3","theta on M3 R3 subset End(S)");
f(w[4].cases?.[0]?.first==="GAUGE_FIELD"&&w[4].cases?.[0]?.second==="ELECTRIC_FIELD"&&w[4].cases?.[1]?.first==="SPIN_CONNECTION"&&w[4].cases?.[1]?.second==="CANONICAL_ONE_FORM","YM vs Ashtekar role order");
f(w[5].origin==="ACTION_OF_SU2_GAUGE_TRANSFORMATIONS"&&w[5].theories?.length===2,"Gauss law SU2");
f(w[6].theory==="SU2_YANG_MILLS"&&w[6].hamiltonian==="SUM_NORM_SQUARES_ELECTRIC_MAGNETIC_FIELDS","Hamiltonian source YM only");
f(w[7].total_extra===4&&w[7].spatial_translations===3&&w[7].time_translations===1&&w[7].side_condition==="AT_LEAST_WHEN_NO_BOUNDARIES"&&w[7].time_constraint_result==="HAMILTONIAN_EQUAL_ZERO","4 Ashtekar constraints, boundary qualifier");
f(w[8].negative==="CHIRAL_FORMALISM_DOES_NOT_BY_ITSELF_RESOLVE_QUANTUM_GRAVITY_QUANTIZATION"&&w[8].source_modality==="AUTHOR_QUALIFIED_PROPOSAL_NOT_COMPLETION","QG noncompletion negative evidence");
for(const id of ids)f(eq(by(demand,id,"census_id")?.source_formula_incidences,by(ssc,id)?.source_expression_census?.statements),"exact source-formula projection "+id);
return errors;
}
const muts=[
["source missing item",x=>x.ssc.items.pop()],
["demand missing item",x=>x.demand.items.pop()],
["register missing member",x=>x.register.rows.pop()],
["coverage missing member",x=>x.coverage.rows.pop()],
["source freeze rule forged",x=>x.ssc.freeze_rule="G0 FROZEN"],
["source frozen flag forged",x=>x.ssc.correction.G0_frozen=true],
["source qualified primitive",x=>x.ssc.closure_claims.primitive_closure=true],
["source prematurely sealed",x=>x.ssc.closure_claims.sealed=true],
["G1 authorization forged",x=>x.demand.replay_policy.G1_authorized=true],
["missing nine-source source audit claimed",x=>x.register.counts.all_nine_source_full_reverse_assertion_census_complete=true],
["coverage full nine source false claim",x=>x.coverage.counts.original_nine_source_reverse_assertion_enumeration_complete=true],
["old register historical closure promoted",x=>x.register.rows[31].historical_closure_accepted_as_current=true],
["unrelated W103 strict binder regression",x=>by(x.ssc,"W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["unrelated W109 analogy promoted",x=>by(x.ssc,"W-SSC-109").source_expression_census.cross_cell_modality="EQUIVALENCE"],
["unrelated W002 source body changed",x=>by(x.ssc,"W-SSC-002").obligation+=" bad"],
["joint bad body W032",x=>{by(x.ssc,"W-SSC-032").obligation+=" bad";by(x.demand,"W-SSC-032","census_id").body+=" bad"}],
["W112 M3 rebound to M4",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[1].source_binding="FOUR_DIMENSIONAL"],
["W112 lost M4 local scope",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[1].preexisting_symbol_scope="SAME_M3"],
["W112 time choice omitted",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[1].operands.shift()],
["W112 spinor restriction 3D omitted",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[2].target="S_R"],
["W112 canonical theta wrong R4",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[3].result="R4_VALUED"],
["W112 theta EndS role omitted",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[3].source_inclusion="R4 subset End(S)"],
["W112 field roles reversed",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[4].cases.reverse()],
["W112 Gauss origin removed",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[5].origin="NO_SU2_ACTION"],
["W112 YM H misassigned GR",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[6].theory="ASHETKAR"],
["W112 4 constraints changed to 3",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[7].total_extra=3],
["W112 3 space constraints changed to 4",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[7].spatial_translations=4],
["W112 boundary qualifier removed",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[7].side_condition="ALWAYS"],
["W112 quantum completion invented",x=>by(x.ssc,"W-SSC-112").source_expression_census.statements[8].negative="QG_SOLVED"],
["W032 weak geometry swapped to R",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[0].electroweak.connection="SU2_R_SPIN_CONNECTION_OMEGA_R"],
["W032 completion falsely proved",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[1].source_modality="QUALIFIED_FINAL_STANDARD_MODEL"],
["W032 U1 problem omitted",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[2].first_problem="ALREADY_SUFFICIENT"],
["W032 SU2R Higgs transformation omitted",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[3].acts_nontrivially.pop()],
["W032 desired SU2R invariance declared achieved",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[3].source_modality="INVARIANCE_PROVED"],
["W032 U2 replaced product SU2×U1",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[4].desired_group="SU2_TIMES_U1"],
["W032 desired C2 replaced C3",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[4].desired_Higgs_representation="DEFINING_C3"],
["W032 prospective solution promoted",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements[5].source_modality="SOLVED_AT_3_2"],
["W032 missing source expression",x=>by(x.ssc,"W-SSC-032").source_expression_census.statements.pop()],
["W032 demand loses source expression",x=>by(x.demand,"W-SSC-032","census_id").source_formula_incidences.pop()],
["W112 demand body changed",x=>by(x.demand,"W-SSC-112","census_id").body="bad"],
["register new formula count changed",x=>x.register.rows.find(z=>z.census_id==="W-SSC-112").source_expression_statement_count=100],
["coverage newer formula count changed",x=>x.coverage.rows.find(z=>z.census_id==="W-SSC-032").source_expression_statement_count=100],
["register W01 total structured count forged",x=>x.register.counts.W01_source_expressions_total=999],
["coverage W01 corrected item count forged",x=>x.coverage.counts.W01_corrected_items=23],
["source oracle pinned wrong",x=>x.ssc.correction.primary_source_oracle.git_blob_sha="BAD"],
["register W member identity switched",x=>x.register.rows[0].census_id="FAKE"]
];
const ctx={ssc:read(P.ssc),demand:read(P.demand),register:read(P.register),coverage:read(P.coverage)};
const positive=verify(ctx),rejected=[],escaped=[];
for(const [n,fn] of muts){const x=clone(ctx);fn(x);if(verify(x).length)rejected.push(n);else escaped.push(n)}
const pins=Object.entries(P).filter(([k,p])=>gitSha(p)!==refs[k]).map(([k])=>'GIT_BLOB_PIN_MISMATCH '+k);
const fail=read(P.failed);
const failures=[...positive,...pins,...escaped.map(x=>'ESCAPED_MUTATION '+x)];
if(fail.status!=='PREPUBLICATION_V8_VERIFIER_MUTATION_ESCAPE_PRESERVED'||fail.observed?.escaped_mutation!=='source frozen falsely')failures.push('PRESERVED_FAILED_MUTATION_MISSING');
console.log(JSON.stringify({schema:'isograph.exp062-w01-source-p8-p9-verifier.v0.2',pass:failures.length===0,errors:failures,source_items:151,source_ids_changed:ids,other_149_identical:true,historical_W_demand_count:86,other_84_W_demands_identical:true,current_W01_structured_incidents:122,new_W01_incidents:15,adversarial_total:muts.length,adversarial_rejected:rejected.length,rejected,G0_frozen:false,external:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(failures.length)process.exitCode=1;
