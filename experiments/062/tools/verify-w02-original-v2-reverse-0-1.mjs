import fs from 'node:fs';
import crypto from 'node:crypto';
const F={"oldS":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_26.json","730b57fa3a56ef7f384fc3d9480f5c41842df972"],"newS":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_27.json","040d45a3c963ef9250124aee37c6bed9126bb857"],"oldD":["experiments/062/W_G0_W05_W108_SOURCE_DEMAND_PROJECTION_0_12.json","e64af2d1f94141c071e755cd5fcbf1c217c874d8"],"newD":["experiments/062/W_G0_W02_V2_SOURCE_DEMAND_PROJECTION_0_13.json","ccd1c811896b1b830633074267becc1bcea6d2d5"],"oldR":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_12.json","7c186bb2f06ab5f50ffed7f1213a72f9b1763146"],"newR":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_13.json","c708219551d02c3c025da78bb00cb86ef64501d2"],"oldC":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_11.json","eae4787fd75e460092d3e0a1e38874624fed1f8f"],"newC":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_12.json","fa6a42b46c85d0b12d946d84571bd85348cc687e"],"oracle":["experiments/062/W02_G0_CONDITIONAL_CITATION_SOURCE_ORACLE_0_1.json","3009851729dbd1929dcd56b91a550e6d10476db5"],"defect":["experiments/062/W02_SOURCE_REVERSE_4_ITEMS_CITATION_DEFECT_0_1.json","bad3fdd4f7b3cd32850758ae7179310a11797f8b"],"review":["experiments/062/W02_G0_FULL_ORIGINAL_V2_REVERSE_0_1.json","05f8276c25da2c4a751a861311cc407c8ca4d74c"]};
const ids=["W-SSC-129","W-SSC-136","W-SSC-147","W-SSC-151"],priorMembers=["W-SSC-129","W-SSC-147"],outside=["W-SSC-136","W-SSC-151"];
const tails={"W-SSC-129":" W02 §I also describes Wightman coordinate-space expectation values as boundary values of functions HOLOMORPHIC in complexified spacetime coordinates x_j; restricting to REAL spatial coordinates and PURELY IMAGINARY x0 yields Euclidean Schwinger functions. Analytic continuation between them is called Wick rotation. The conventional Schwinger SU(2)_L×SU(2)_R covariance conclusion depends on taking Lorentz covariance of Wightman functions as an AXIOM, and is not automatically an authority for W02's proposed one-sided nonholomorphic formulation.","W-SSC-136":" W02 §III separately motivates Euclidean field theory by observing that path integrals OFTEN are well-defined in Euclidean spacetime and NOT in Minkowski spacetime. This qualifies the source motivation and is not a universally quantified path-integral existence theorem.","W-SSC-147":" W02 §IV.3 explicitly credits ASHTEKAR [12] for the earlier new CANONICAL chiral-gravity formulation introducing connection variables of the same kind as Yang-Mills, and directs readers to Krasnov [13] for detailed chiral-GR approaches. These are cited third-party foundations, not new Woit-proven chiral-gravity rules.","W-SSC-151":" W02 §V explicitly cites Woit's earlier Euclidean twistor-unification [17] as a prior SPECULATIVE proposal, not as proof that this later one-chirality formulation constructs the Standard Model. It notes two distinct other-context precedents for mixing Euclidean rotation and internal symmetry: TWISTING to define topological quantum field theories [18], and N=4 supersymmetry on a LATTICE (section 8.2 of [19]). These references are not asserted to establish equivalence or to resolve W02's explicitly OPEN electroweak SU(2)_L question."};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function verify(x) {
const errors=[],ck=(v,m)=>{if(!v)errors.push(m)};
const {oldS,newS,oldD,newD,oldR,newR,oldC,newC,oracle,defect,review}=x;
const lengths=[oldS?.items?.length,newS?.items?.length,oldD?.items?.length,newD?.items?.length,oldR?.rows?.length,newR?.rows?.length,oldC?.rows?.length,newC?.rows?.length,review?.rows?.length];
ck(eq(lengths,[151,151,86,86,151,151,151,151,29]),"full 151/86/151/151/29 shape");
if(!eq(lengths,[151,151,86,86,151,151,151,151,29]))return errors;
ck(newS?.schema==="woit.source-semantic-census.v0.27"&&newS?.status==="G0_W02_V2_SOURCE_REVERSE_FOUR_EXISTING_ASSERTIONS_CITATION_SCOPES_CORRECTED_151_UNFROZEN"&&newS?.closure_claims?.sealed===false,"current SSC0.27 status unfrozen");
ck(newS?.predecessor?.git_blob_sha===F.oldS[1]&&newS?.correction?.cause?.git_blob_sha===F.defect[1]&&newS?.correction?.source_oracle?.git_blob_sha===F.oracle[1],"predecessor/cause/source pins");
ck(eq(newS?.correction?.changed_W_ids,ids)&&newS?.correction?.G0_frozen===false&&newS?.correction?.G1_authorized===false&&newS?.correction?.external_review==="OWNER_BYPASSED_NOT_PASSED","all source changes and G0 restriction");
ck(eq(oldS.items.map(z=>z.id),newS.items.map(z=>z.id))&&new Set(newS.items.map(z=>z.id)).size===151,"151 source IDs unchanged");
for(let i=0;i<151;i++){let p=oldS.items[i],z=newS.items[i];if(!ids.includes(p.id))ck(eq(p,z),"other W source modified "+p.id)}
const sourceBy=new Map(newS.items.map(z=>[z.id,z])),oldBy=new Map(oldS.items.map(z=>[z.id,z]));
ck(oracle?.semantic_authority===false&&oracle?.status==="DIRECT_ARXIV_V2_SOURCE_INCIDENTS_NOT_NINE_SOURCE_G0_CLOSURE"&&oracle?.source?.frozen_revision==="arXiv:2311.00608v2"&&oracle?.source?.Oct03_captured_pdf_bytes==="UNVERIFIED"&&oracle?.independent_external_review==="OWNER_BYPASSED_NOT_PASSED"&&oracle?.statement_count===6,"oracle source/negative external scope");
ck(eq(oracle?.target_ids,ids)&&eq(Object.keys(oracle?.statements||{}),ids),"source oracle 4 IDs");
for(const id of ids){
 const p=oldBy.get(id),z=sourceBy.get(id),st=z?.source_expression_census?.statements||[],oldst=p?.source_expression_census?.statements||[],news=oracle?.statements?.[id];
 ck(z?.state===p?.state&&z?.source===p?.source&&z?.obligation===p?.obligation+tails[id],"source body citation scope "+id);
 ck(st.length===oldst.length+(news?.length||0)&&eq(st.slice(0,oldst.length),oldst)&&eq(st.slice(oldst.length),news),"source expression exact predecessors and new oracle "+id);
 ck(z?.source_expression_census?.source_semantic_only===true&&z?.source_expression_census?.not_qualified_theorem===true,"no theorem promotion "+id);
}
const e129=sourceBy.get("W-SSC-129")?.source_expression_census?.statements?.slice(-2)||[];
ck(e129[0]?.modality==="SOURCE_CONVENTIONAL_QFT_HOLOMORPHIC_BOUNDARY_VALUES"&&e129[0]?.relationship==="BOUNDARY_VALUES"&&e129[0]?.source_citation==="[1]"&&e129[0]?.qualification==="CONVENTIONAL_QFT_NOT_ONE_SIDED_NEW_PROPOSAL","W129 Wightman holomorphic boundary");
ck(e129[1]?.time_requirement==="PURELY_IMAGINARY"&&e129[1]?.spatial_requirement==="REAL"&&e129[1]?.assumption==="LORENTZ_COVARIANCE_OF_WIGHTMAN_FUNCTIONS_AS_AXIOM"&&e129[1]?.consequence==="SU(2)_L_times_SU(2)_R_SCHWINGER_COVARIANCE"&&e129[1]?.guard==="CONVENTIONAL_ANALYTIC_CONTINUATION_ONLY","W129 conditional Wick restriction, polarity");
const e136=sourceBy.get("W-SSC-136")?.source_expression_census?.statements?.at(-1);
ck(e136?.modality==="SOURCE_QUALIFIED_PATH_INTEGRAL_CONTRAST"&&e136?.Euclidean==="OFTEN_WELL_DEFINED"&&e136?.Minkowski==="CONTRAST_NOT_WELL_DEFINED"&&e136?.quantifier==="OFTEN_NOT_UNIVERSAL","W136 path integral OFTEN not universal");
const e147=sourceBy.get("W-SSC-147")?.source_expression_census?.statements?.at(-1);
ck(e147?.cited_author==="Abhay Ashtekar"&&e147?.source_citation==="[12]"&&e147?.source_role==="NEW_CANONICAL_CHIRAL_GRAVITY_CONNECTION_VARIABLES"&&e147?.review_reference==="Krasnov[13]"&&e147?.epistemic==="CITED_PRIOR_WORK_NOT_SOURCE_ORIGINAL_WOIT_THEOREM","W147 Ashtekar source cited provenance");
const e151=sourceBy.get("W-SSC-151")?.source_expression_census?.statements?.slice(-2)||[];
ck(e151[0]?.source_citation==="[17]"&&e151[0]?.status==="SPECULATIVE_PRECEDENT_NOT_COMPLETED_STANDARD_MODEL","W151 Woit past speculation not theorem");
ck(e151[1]?.modality==="SOURCE_TWO_INDEPENDENT_CITED_ROTATION_INTERNAL_MIXING_PRECEDENTS"&&e151[1]?.cases?.length===2&&e151[1]?.cases?.[0]?.citation==="Witten[18]"&&e151[1]?.cases?.[0]?.domain==="TOPOLOGICAL_QFT_SYMMETRY_TWISTING"&&e151[1]?.cases?.[1]?.citation==="Catterall_Kaplan_Ünsal[19]"&&e151[1]?.cases?.[1]?.source_section==="8.2"&&e151[1]?.remaining_problem==="USUAL_ELECTROWEAK_THEORY_FROM_EUCLIDEAN_SU2_L_OPEN","W151 two precedent distinct contexts/open electroweak");
ck(defect?.status==="CONFIRMED_G0_FOUR_W02_SOURCE_ITEMS_LOST_CONVENTIONAL_QFT_AND_CITED_PRECEDENTS"&&defect?.earliest_stage==="G0_ASSERTION_CENSUS_CONSERVATION"&&eq(defect?.affected_W_census_ids,ids)&&defect?.qualification?.all_nine_W_sources_reverse_complete===false,"defect preserved stage");
ck(newD?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.13"&&newD?.status==="W_ONLY_W02_V2_TWO_HISTORICAL_MEMBERS_REPLAY_FOUR_SOURCE_CLAIMS_CHANGED_NOT_FROZEN"&&newD?.current_source?.git_blob_sha===F.newS[1]&&newD?.predecessor_W_only_demand?.git_blob_sha===F.oldD[1],"demand W-only historical input pin");
ck(newD?.counts?.W_historical_demand_members===86&&newD?.counts?.unchanged_W_members===84&&eq(newD?.counts?.out_of_old_W86_changed,outside)&&newD?.replay_policy?.G1_authorized===false&&newD?.replay_policy?.L_members==="NOT_ACCESSED_OR_REWRITTEN","2 inside 2 outside historical W 86 and G1 blocked");
ck(eq(oldD.items.map(z=>z.census_id),newD.items.map(z=>z.census_id)),"historical 86 IDs preserved");
for(let i=0;i<86;i++){const p=oldD.items[i],w=newD.items[i];ck(w?.track==="W"&&w.body===sourceBy.get(w.census_id)?.obligation,"body source-demand "+p.census_id);
if(!priorMembers.includes(p.census_id))ck(eq(p,w),"other historical demand changed "+p.census_id);}
for(const id of priorMembers){const a=newD.items.find(x=>x.census_id===id);ck(eq(a?.source_formula_incidences,sourceBy.get(id)?.source_expression_census?.statements),"new W source claims to W-only demand "+id)}
for(const id of outside)ck(!newD.items.some(x=>x.census_id===id),"outside historical projection must not be arbitrarily inserted "+id);
ck(newR?.schema==="isograph.exp062-w-g0-all-151-conservation-register.v0.13"&&newR?.source_census?.git_blob_sha===F.newS[1]&&newR?.historical_86_projection?.git_blob_sha===F.newD[1]&&newR?.counts?.historical_nonmembers===65&&newR?.counts?.old_projection_omits_old_incomplete===52&&newR?.counts?.old_projection_includes_old_closed_schema===8,"source register historical omissions preserved");
ck(newC?.schema==="isograph.exp062-w-g0-line-by-line-151-coverage.v0.12"&&newC?.source_census?.git_blob_sha===F.newS[1]&&newC?.reconstructed_register?.git_blob_sha===F.newR[1]&&newC?.counts?.original_nine_source_reverse_assertion_enumeration_complete===false&&newC?.counts?.source_revision_Oct03_bytes_verified===false,"source coverage incomplete 9 original");
for(let i=0;i<151;i++){const oR=oldR.rows[i],nR=newR.rows[i],oC=oldC.rows[i],nC=newC.rows[i],src=newS.items[i];ck(nR?.census_id===src.id&&nC?.census_id===src.id&&nR?.source_body_exact===src.obligation&&nC?.source_expression_statement_count===(src.source_expression_census?.statements?.length||0),"all151 exact coverage "+src.id);
if(!ids.includes(src.id)){ck(eq(oR,nR),"non-W02 register changed "+src.id);ck(eq(oC,nC),"non-W02 coverage changed "+src.id)}}
ck(newR.rows.every(x=>x.historical_closure_accepted_as_current===false),"no source reclosure");
ck(review?.schema==="isograph.exp062-w02-v2-original-full-source-reverse-coverage.v0.1"&&review?.status==="W02_ARXIV_V2_HTML33_TO163_AND_ALL11_PDF_PAGES_SCOPED_SOURCE_REVERSE_FOUR_EXISTING_SOURCE_ITEMS_REPAIRED_G0_OPEN"&&review?.source?.frozen_revision==="arXiv:2311.00608v2"&&eq(review?.source?.reviewed_pdf_indices,Array.from({length:11},(_,i)=>i)),"W02 PDF 11 pages/current source v2 scope");
ck(review?.source_defect?.git_blob_sha===F.defect[1]&&review?.source_oracle?.git_blob_sha===F.oracle[1]&&review?.coverage?.G0_frozen===false&&review?.coverage?.full_nine_W_source_reverse_completed===false&&review?.coverage?.independent_external_verification==="OWNER_BYPASSED_NOT_PASSED","review pinned source negative");
const owners=new Set(),allowOwners=newS.items.filter(z=>z.source.startsWith("W02")).map(z=>z.id);let next=33;for(const row of review.rows){ck(row.line_first===next&&row.line_last>=row.line_first&&row.source_census_ids.every(id=>allowOwners.includes(id)),"W02 29 reverse contiguous source lines "+row.ordinal);next=row.line_last+1;for(const id of row.source_census_ids)owners.add(id)}
ck(next===164&&review.rows.length===29&&allowOwners.length===30&&allowOwners.every(x=>owners.has(x)),"W02 33..163/29 intervals/30 current owner IDs");
ck(eq(review.rows.filter(x=>x.citation_or_condition_newly_corrected).map(x=>x.line_first),[47,76,123,138,141]),"new W02 source incidence intervals 5");
ck(newS.items.find(x=>x.id==="W-SSC-103")?.source_expression_census?.statements?.[0]?.rhs?.binder?.relation==="STRICT_GT"&&newS.items.find(x=>x.id==="W-SSC-109")?.source_expression_census?.cross_cell_modality==="ANALOGY_ONLY_NOT_EQUALITY"&&newS.items.find(x=>x.id==="W-SSC-097")?.source_expression_census?.statements?.[2]?.single_valued_map_declared===true,"W05 source corrections preserved");
return errors;
}
const tests=[
["W129 Wightman boundary lost",x=>x.newS.items.find(z=>z.id==="W-SSC-129").source_expression_census.statements.slice(-2)[0].relationship="NOT_BOUNDARY"],
["W129 author reference erased",x=>x.newS.items.find(z=>z.id==="W-SSC-129").source_expression_census.statements.slice(-2)[0].source_citation="[9]"],
["W129 complex holomorphic claim generalized",x=>x.newS.items.find(z=>z.id==="W-SSC-129").source_expression_census.statements.slice(-2)[0].qualification="GENERAL_THEOREM"],
["W129 Euclidean time sign wrong",x=>x.newS.items.find(z=>z.id==="W-SSC-129").source_expression_census.statements.at(-1).time_requirement="PURELY_REAL"],
["W129 Wightman axiom lost",x=>x.newS.items.find(z=>z.id==="W-SSC-129").source_expression_census.statements.at(-1).assumption="DERIVED_FROM_NO_AX"],
["W129 group covariance swapped",x=>x.newS.items.find(z=>z.id==="W-SSC-129").source_expression_census.statements.at(-1).consequence="SU(2)_R_ONLY"],
["W136 often inflated universal",x=>x.newS.items.find(z=>z.id==="W-SSC-136").source_expression_census.statements.at(-1).quantifier="FOR_ALL_QFTS"],
["W136 Minkowski comparison inverted",x=>x.newS.items.find(z=>z.id==="W-SSC-136").source_expression_census.statements.at(-1).Minkowski="ALWAYS_WELL_DEFINED"],
["W147 Ashtekar attribution changed",x=>x.newS.items.find(z=>z.id==="W-SSC-147").source_expression_census.statements.at(-1).cited_author="Woit"],
["W147 citation changed",x=>x.newS.items.find(z=>z.id==="W-SSC-147").source_expression_census.statements.at(-1).source_citation="[99]"],
["W147 no canonical connection",x=>x.newS.items.find(z=>z.id==="W-SSC-147").source_expression_census.statements.at(-1).source_role="NOT_CANONICAL"],
["W147 Woit original theorem",x=>x.newS.items.find(z=>z.id==="W-SSC-147").source_expression_census.statements.at(-1).epistemic="WOIT_ORIGINAL_NEW_THEOREM"],
["W151 Woit original prior conjecture promoted",x=>x.newS.items.find(z=>z.id==="W-SSC-151").source_expression_census.statements.slice(-2)[0].status="PROVED_STANDARD_MODEL"],
["W151 topological twisting omitted",x=>x.newS.items.find(z=>z.id==="W-SSC-151").source_expression_census.statements.at(-1).cases.shift()],
["W151 N4 lattice wrong citation",x=>x.newS.items.find(z=>z.id==="W-SSC-151").source_expression_census.statements.at(-1).cases[1].citation="other"],
["W151 wrong lattice section",x=>x.newS.items.find(z=>z.id==="W-SSC-151").source_expression_census.statements.at(-1).cases[1].source_section="4"],
["W151 topological equivalence falsely established",x=>x.newS.items.find(z=>z.id==="W-SSC-151").source_expression_census.statements.at(-1).relation="PROVEN_EQUIVALENCE"],
["W151 electroweak falsely closed",x=>x.newS.items.find(z=>z.id==="W-SSC-151").source_expression_census.statements.at(-1).remaining_problem="SOLVED"],
["W02 source byte equivalence falsely assumed",x=>x.oracle.source.Oct03_captured_pdf_bytes="IDENTICAL"],
["W02 oracle externally reviewed",x=>x.oracle.independent_external_review="PASSED"],
["W02 G0 falsely frozen",x=>x.review.coverage.G0_frozen=true],
["W02 author cites inherited globally",x=>x.defect.qualification.all_nine_W_sources_reverse_complete=true],
["W02 source body changed untracked",x=>x.newS.items.find(z=>z.id==="W-SSC-129").obligation+=" bad"],
["W02 both source and W demand collude",x=>{x.newS.items.find(z=>z.id==="W-SSC-129").obligation+=" bad";x.newD.items.find(z=>z.census_id==="W-SSC-129").body+=" bad"}],
["source and oracle both mutated",x=>{x.oracle.statements["W-SSC-151"][1].remaining_problem="SOLVED";x.newS.items.find(z=>z.id==="W-SSC-151").source_expression_census.statements.at(-1).remaining_problem="SOLVED"}],
["source W108 predecessor citation erasure",x=>x.newS.items.find(z=>z.id==="W-SSC-108").source_expression_census.statements.pop()],
["source W103 strict filtration altered",x=>x.newS.items.find(z=>z.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["source W109 analogy promoted",x=>x.newS.items.find(z=>z.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUAL"],
["source W097 total map demoted",x=>x.newS.items.find(z=>z.id==="W-SSC-097").source_expression_census.statements[2].single_valued_map_declared=false],
["source outside unrelated changed",x=>x.newS.items.find(z=>z.id==="W-SSC-104").obligation+="bad"],
["one source item omitted",x=>x.newS.items.pop()],
["one old W demand omitted",x=>x.newD.items.pop()],
["historic outside W136 silently inserted",x=>x.newD.items.push({track:"W",census_id:"W-SSC-136"})],
["historic demand W129 source incidence omitted",x=>x.newD.items.find(z=>z.census_id==="W-SSC-129").source_formula_incidences.pop()],
["historic demand unrelated row modified",x=>x.newD.items.find(z=>z.census_id==="W-SSC-100").body+="bad"],
["L track leakage",x=>x.newD.items[0].track="L"],
["historic G1 authorized",x=>x.newD.replay_policy.G1_authorized=true],
["register W136 body not updated",x=>x.newR.rows.find(z=>z.census_id==="W-SSC-136").source_body_exact="old"],
["register W151 falsely historical closed",x=>x.newR.rows.find(z=>z.census_id==="W-SSC-151").historical_closure_accepted_as_current=true],
["coverage W147 formula count old",x=>x.newC.rows.find(z=>z.census_id==="W-SSC-147").source_expression_statement_count=0],
["coverage all nine asserted complete",x=>x.newC.counts.original_nine_source_reverse_assertion_enumeration_complete=true],
["review drop final W02 PDF page",x=>x.review.source.reviewed_pdf_indices.pop()],
["review new citation interval wrong",x=>x.review.rows.find(z=>z.line_first===141).citation_or_condition_newly_corrected=false],
["review HTML line gap",x=>x.review.rows.find(z=>z.line_first===123).line_first=124],
["review replace owner with L",x=>x.review.rows[0].source_census_ids=["L-SSC-031"]],
["review different original source revision",x=>x.review.source.frozen_revision="arXiv:2311.00608v1"]
];
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const d=Object.fromEntries(Object.entries(F).map(([k,[p]])=>[k,read(p)]));
const errors=verify(d),rejected=[],escaped=[];
for(const [name,fn] of tests){const z=JSON.parse(JSON.stringify(d));try{fn(z);if(verify(z).length)rejected.push(name);else escaped.push(name)}catch(e){errors.push('ADVERSARIAL_CONTROL_EXCEPTION '+name+' '+String(e))}}
for(const [k,[p,hash]] of Object.entries(F))if(sha(p)!==hash)errors.push('GIT_BLOB_SHA_PIN_MISMATCH '+k);
errors.push(...escaped.map(x=>'ESCAPED_MUTATION '+x));
const result={schema:'isograph.exp062-w02-v2-original-reverse-verifier.v0.1',pass:!errors.length,errors,source_items:151,historical_W_demand_members:86,unmodified_source_items:147,unmodified_W_demand_items:84,unmodified_register_rows:147,unmodified_coverage_rows:147,reviewed_W02_PDF_pages:11,contiguous_primary_HTML_intervals:29,all_W02_existing_source_owner_items:30,new_source_claims:6,new_source_items:4,old_historical_W86_changed:2,historical_outside_changed:2,mutations_total:tests.length,mutations_rejected:rejected.length,rejected,stage:'G0_UNFROZEN',external_review:'OWNER_BYPASSED_NOT_PASSED'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
