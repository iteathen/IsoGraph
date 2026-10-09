import fs from 'node:fs';
import crypto from 'node:crypto';
const pins={"oldS":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_21.json","5ef9c65dddde1edea8c2f6974a21b3a479d096c7"],"S":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_22.json","874ce443edaad2cb256d1c1bf1dc5f5dec6f05bf"],"oldR":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_7.json","f470c3065b3131dea82844f16eecdcc8d85d100b"],"R":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_8.json","c07bc9980c7811380bcc0eefdc5bf67c8bab987f"],"oldC":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_6.json","e0de1e7e28c96cebeca5939683bff5ee881d7dfe"],"C":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_7.json","ed88140c50421aa7f7f645b7a1ee30e1c3f1df17"],"demand":["experiments/062/W_G0_W04DE_23_SOURCE_DEMAND_PROJECTION_0_10.json","e450ea541e05f4d592f7442647efa13689cfa1b6"],"review":["experiments/062/W04A_G0_LIVE_AUTHOR_FULL_POST_REVERSE_AUDIT_0_1.json","508bdad3b0ab4676d23758784e8bb14cb4a253a8"],"defect":["experiments/062/W04A_G0_SOURCE_ASSERTION_OMISSION_DEFECT_0_1.json","3372eb1e722af12251185576e72121bd7ddda26d"],"gateOld":["experiments/062/W_CURRENT_STAGE_GATE_0_48.json","ed53b9436ab42560ff07cd13af997ae236c3bf11"]};
const changed=["W-SSC-060","W-SSC-064"],tails={"W-SSC-060":" The source says the quantum theory is an infinite collection of complex harmonic oscillators, one for each momentum p, with annihilation and creation operators satisfying anti-commutation relations. No complete anticommutation algebra or coefficient convention is printed; do not invent one.","W-SSC-064":" The author additionally states that four dimensions is the only dimension in which the rotation group separates into two independent pieces so the geometry can be described as right- and left-handed parts; conventional Euclidean separation is explicitly contrasted with Minkowski complex-conjugate chiral halves. Preserve 'only' as the author's scoped source assertion rather than weakening it, or promoting it as an independently proven universal mathematical theorem."};
const lineRanges=[[9,11],[12,13],[14,16],[17,22],[23,23],[24,24],[25,26],[27,28],[29,31],[32,32],[33,33],[34,34],[35,35],[36,36],[37,37],[38,38]],roles=["AUTHOR_DATE_MOTIVATION_AND_PROPOSAL","ORDERED_WEYL_EQUATION","FACTORIZATION_AND_MASS_SHELL","HELICITY_OPERATOR_AND_ENERGY_POLARITY","MOMENTUM_INDEXED_OSCILLATOR_FAMILY_AND_QUANTIZATION_ANTICOMMUTATION","STANDARD_MODEL_COPIES_GAUGE_YUKAWA","EXACT_SOURCE_WIGHTMAN_TWO_EQUALITIES","NAIVE_SCHWINGER_CONTINUATION","CONVENTIONAL_S_R_DUAL_TO_S_L_MAPPING_AND_OBSTRUCTION","MINKOWSKI_CONJUGATION_VS_EUCLIDEAN_INDEPENDENCE","OS_CHIRAL_DOUBLING_ADDITIONAL_SELFADJOINTNESS","RIGHT_ONLY_VECTOR_MAPPING_PROPOSAL","SU2R_SU2L_GEOMETRIC_INTERNAL_ROLES","FOUR_DIMENSION_UNIQUENESS_AND_EUCLIDEAN_MINKOWSKI_CONTRAST","BOTH_SIGNATURES_PROPOSAL_MODALITY","TAUTOLOGICAL_TWISTOR_RIGHT_SPINOR_PLANE"];
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=x=>JSON.parse(JSON.stringify(x));
function verify(x) {
const errors=[],ck=(v,m)=>{if(!v)errors.push(m)};
const {S,oldS,R,oldR,C,oldC,review,defect,demand,gateOld}=x;
ck(S?.schema==="woit.source-semantic-census.v0.22"&&S?.status==="G0_W04A_COMPLETE_LIVE_ARTICLE_REVERSE_2_LITERAL_SOURCE_OMISSIONS_CORRECTED_151_ITEMS_NOT_FROZEN","source status");
ck(S?.correction?.G0_frozen===false&&S?.correction?.G1_authorized===false&&eq(S?.correction?.changed_W_census_ids,changed)&&S?.predecessor?.git_blob_sha===pins.oldS[1],"scope/stage");
ck(S?.closure_claims?.sealed===false&&S?.closure_claims?.primitive_closure===false&&S?.freeze_rule?.includes("full nine-source reverse assertion enumeration"),"no false freeze");
ck(S?.items?.length===151&&oldS?.items?.length===151&&R?.rows?.length===151&&oldR?.rows?.length===151&&C?.rows?.length===151&&oldC?.rows?.length===151,"151 membership");
if(S?.items?.length!==151||oldS?.items?.length!==151||R?.rows?.length!==151||oldR?.rows?.length!==151||C?.rows?.length!==151||oldC?.rows?.length!==151)return errors;
ck(eq(S.items.map(y=>y.id),oldS.items.map(y=>y.id)),"SSC ID/order");
ck(eq(R.rows.map(y=>y.census_id),oldR.rows.map(y=>y.census_id))&&eq(C.rows.map(y=>y.census_id),oldC.rows.map(y=>y.census_id)),"audit ID/order");
for(let i=0;i<151;i++){
const src=S.items[i],prev=oldS.items[i],reg=R.rows[i],cov=C.rows[i];
if(!changed.includes(src.id)){ck(eq(src,prev),"unchanged source "+src.id);ck(eq(reg,oldR.rows[i]),"unchanged register "+src.id);ck(eq(cov,oldC.rows[i]),"unchanged coverage "+src.id);}
else {
ck(src.source==="W04a"&&src.state===prev.state&&src.obligation===prev.obligation+tails[src.id],"correct exact W04a source body "+src.id);
ck(src.source_expression_census?.source_revision==="LIVE_AUTHOR_HTML_2026_10_08_OCT03_BYTES_UNCONFIRMED"&&src.source_expression_census?.statements?.length===2,"new source expression scope "+src.id);
ck(reg.source_body_exact===src.obligation&&reg.source_expression_statement_count===2&&reg.source_body_changed_this_successor===true,"register new source "+src.id);
ck(cov.body_length_chars===src.obligation.length&&cov.source_expression_statement_count===2&&cov.formula_coverage_this_cycle?.includes("NO_UNPRINTED_ALGEBRA"),"coverage new expression "+src.id);
}
ck(reg.source_body_exact===src.obligation&&cov.body_length_chars===src.obligation.length&&reg.historical_closure_accepted_as_current===false&&reg.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING","all rows exact and open "+src.id);
}
const o60=S.items.find(z=>z.id==="W-SSC-060")?.source_expression_census?.statements;
ck(o60?.[0]?.id==="W04A060-E01"&&o60[0].quantifier==="ONE_FOR_EACH_MOMENTUM_P"&&o60[0].family_cardinality==="INFINITE_COLLECTION"&&o60[0].per_member==="COMPLEX_HARMONIC_OSCILLATOR","quantified infinite quantum family");
ck(o60?.[1]?.id==="W04A060-E02"&&eq(o60[1].operators,["ANNIHILATION","CREATION"])&&o60[1].relation==="ANTI_COMMUTATION"&&o60[1].explicit_generator_CAR_equation_in_source===false&&o60[1].quantization_relation_fully_specified_by_source===false,"source anticommutation/no invented CAR");
const o64=S.items.find(z=>z.id==="W-SSC-064")?.source_expression_census?.statements;
ck(o64?.[0]?.id==="W04A064-E01"&&o64[0].dimension==="FOUR"&&o64[0].polarity==="ONLY_DIMENSION"&&o64[0].predicate==="ROTATION_GROUP_SPLITS_INTO_TWO_INDEPENDENT_PIECES_AND_GEOMETRY_CHIRALLY_DECOMPOSABLE"&&o64[0].author_proof_supplied===false,"source only-dimension polarity not qualified proof");
ck(o64?.[1]?.id==="W04A064-E02"&&o64[1].Euclidean==="USUAL_GEOMETRIC_SPLIT_SELF_DUAL_ANTI_SELF_DUAL"&&o64[1].Minkowski==="LEFT_RIGHT_COMPLEX_CONJUGATES_NOT_INDEPENDENT","source Minkowski/Euclidean context");
ck(review?.line_map?.length===16&&review?.counts?.article_body_lines_checked===30&&review?.status?.includes("NOT_NINE_SOURCE_G0_CLOSURE")&&review?.source?.frozen_Oct03_bytes==="UNVERIFIED","W04a complete current page scoped");
const scanned=[],units=new Set();
for(let i=0;i<16;i++){const row=review?.line_map?.[i];ck(row?.line_start===lineRanges[i][0]&&row?.line_end===lineRanges[i][1]&&row?.role===roles[i],"reverse source exact ordered row "+i);if(row&&Number.isInteger(row.line_start)&&Number.isInteger(row.line_end))for(let t=row.line_start;t<=row.line_end;t++)scanned.push(t);for(const id of row?.units||[])units.add(id);}
const W04aIDs=S.items.filter(v=>v.source==="W04a").map(v=>v.id);
ck(scanned.length===30&&new Set(scanned).size===30&&scanned[0]===9&&scanned[29]===38&&eq([...units].sort(),W04aIDs.sort()),"every author article line and all 10 W04a census items");
ck(review?.line_map?.find(q=>q.line_start===23)?.status==="DEFECT_CONSERVED_BY_SSC0_22"&&review?.line_map?.find(q=>q.line_start===36)?.status==="DEFECT_CONSERVED_BY_SSC0_22","both defects kept");
ck(defect?.status==="CONFIRMED_W04A_QUANTIZATION_FAMILY_CAR_AND_FOUR_DIMENSION_UNIQUENESS_OMISSIONS_AT_G0"&&defect?.defects?.length===3&&defect?.defects?.some(e=>e.type==="STALE_PROCEDURAL_STATUS_LABEL")&&defect?.source?.october_3_frozen_byte_identity==="NOT_VERIFIED","defect preserved and no frozen bytes");
ck(R?.source_census?.git_blob_sha===pins.S[1]&&C?.source_census?.git_blob_sha===pins.S[1]&&C?.reconstructed_register?.git_blob_sha===pins.R[1],"successor source/register pins");
ck(R?.counts?.source_items===151&&R?.counts?.old_projection_omits_old_incomplete===52&&R?.counts?.old_projection_includes_old_closed_schema===8&&R?.counts?.whole_nine_source_reverse_assertion_census_complete===false,"151 register historical unresolved discrepancy");
ck(C?.counts?.source_rows_remaining_cold_audit===0&&C?.counts?.original_nine_source_reverse_assertion_enumeration_complete===false&&C?.counts?.source_revision_Oct03_bytes_verified===false,"existing rows reviewed not reverse source closed");
ck(demand?.items?.length===86&&!demand?.items?.some(x=>changed.includes(x.census_id))&&gateOld?.current_lawful_state?.G0_open===true&&gateOld?.current_lawful_state?.G1_authorized===false,"historical W demand remains historical/no G1");
return errors;
}
const mutations=[
["drop a source member",x=>x.S.items.pop()],
["drop an R member",x=>x.R.rows.pop()],
["drop a C member",x=>x.C.rows.pop()],
["change W060 anti to commutation",x=>x.S.items.find(z=>z.id==="W-SSC-060").source_expression_census.statements[1].relation="COMMUTATION"],
["erase momentum quantifier",x=>x.S.items.find(z=>z.id==="W-SSC-060").source_expression_census.statements[0].quantifier="SOME_P"],
["erase infinite size",x=>x.S.items.find(z=>z.id==="W-SSC-060").source_expression_census.statements[0].family_cardinality="FINITE"],
["invent CAR algebra",x=>x.S.items.find(z=>z.id==="W-SSC-060").source_expression_census.statements[1].explicit_generator_CAR_equation_in_source=true],
["pretend source fully quantizes",x=>x.S.items.find(z=>z.id==="W-SSC-060").source_expression_census.statements[1].quantization_relation_fully_specified_by_source=true],
["drop creation operator",x=>x.S.items.find(z=>z.id==="W-SSC-060").source_expression_census.statements[1].operators.pop()],
["change momentum oscillator type",x=>x.S.items.find(z=>z.id==="W-SSC-060").source_expression_census.statements[0].per_member="REAL_HARMONIC"],
["weaken ONLY dimension",x=>x.S.items.find(z=>z.id==="W-SSC-064").source_expression_census.statements[0].polarity="SOME_DIMENSIONS"],
["make uniqueness theorem",x=>x.S.items.find(z=>z.id==="W-SSC-064").source_expression_census.statements[0].author_proof_supplied=true],
["change source 4 to 8",x=>x.S.items.find(z=>z.id==="W-SSC-064").source_expression_census.statements[0].dimension="EIGHT"],
["swap signature roles",x=>x.S.items.find(z=>z.id==="W-SSC-064").source_expression_census.statements[1].Minkowski="INDEPENDENT_CHIRAL_FACTORS"],
["change source to L",x=>x.S.items.find(z=>z.id==="W-SSC-060").source="L04"],
["change W060 obligation only",x=>x.S.items.find(z=>z.id==="W-SSC-060").obligation+="false math"],
["change source and register together",x=>{x.S.items.find(z=>z.id==="W-SSC-060").obligation+="bad";x.R.rows.find(z=>z.census_id==="W-SSC-060").source_body_exact+="bad";x.C.rows.find(z=>z.census_id==="W-SSC-060").body_length_chars+=4}],
["reopen old W103 Hodge",x=>x.S.items.find(z=>z.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["reclose old W109 analogy",x=>x.S.items.find(z=>z.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUAL"],
["unrelated W04d body changed",x=>x.S.items.find(z=>z.id==="W-SSC-080").obligation+="BAD"],
["register source identity lost",x=>x.R.source_census.git_blob_sha="BAD"],
["coverage register identity lost",x=>x.C.reconstructed_register.git_blob_sha="BAD"],
["register W064 current closure",x=>x.R.rows.find(z=>z.census_id==="W-SSC-064").historical_closure_accepted_as_current=true],
["coverage claims full reverse",x=>x.C.counts.original_nine_source_reverse_assertion_enumeration_complete=true],
["source status falsely frozen",x=>x.S.status="FROZEN"],
["source G1 suddenly enabled",x=>x.S.correction.G1_authorized=true],
["delete W04a line 23",x=>x.review.line_map=x.review.line_map.filter(q=>q.line_start!==23)],
["change W04a line 36 role",x=>x.review.line_map.find(q=>q.line_start===36).role="W04A_DIMENSION_CAN_BE_SIX"],
["duplicate W04a line",x=>x.review.line_map[0].line_end=12],
["line maps extra unsourced body",x=>x.review.line_map[0].units=["W-SSC-001"]],
["mutation W04a author's Oct3 byte claim",x=>x.review.source.frozen_Oct03_bytes="CONFIRMED"],
["remove defect metadata contradiction",x=>x.defect.defects=x.defect.defects.filter(e=>e.type!=="STALE_PROCEDURAL_STATUS_LABEL")],
["change original old 86 projection membership",x=>x.demand.items.push({census_id:"W-SSC-060"})],
["rewrite old SSC",x=>x.oldS.items.find(z=>z.id==="W-SSC-060").obligation+="alter history"]
];
const val=Object.fromEntries(Object.entries(pins).map(([name,[path]])=>[name,read(path)]));
const errors=verify(val),rejected=[],escaped=[];
for(const [name,fn] of mutations){const item=clone(val);fn(item);if(verify(item).length)rejected.push(name);else escaped.push(name)}
for(const [name,[path,sha]] of Object.entries(pins))if(gitSha(path)!==sha)errors.push('GIT_BLOB_SHA_MISMATCH '+name);
errors.push(...escaped.map(name=>'ESCAPED_MUTATION '+name));
const out={schema:'isograph.exp062-w04a-live-full-post-g0-reverse-audit-verifier.v0.1',pass:errors.length===0,errors,source_body_count:val.S.items.length,unchanged_other_source_items:149,unchanged_other_register_rows:149,unchanged_other_coverage_rows:149,full_current_HTML_body_lines:30,source_W04a_existing_census_items:10,source_assertion_omissions_repaired:['W-SSC-060','W-SSC-064'],adversarial_total:mutations.length,adversarial_rejected:rejected.length,rejected,full_nine_source_reverse_assertion_census_complete:false,source_Oct03_byte_identity_verified:false,G0_frozen:false,G1_authorized:false,external_review:'OWNER_BYPASSED_NOT_PASSED'};
console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;
