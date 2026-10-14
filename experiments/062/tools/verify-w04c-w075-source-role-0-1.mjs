import fs from 'node:fs';
import crypto from 'node:crypto';
const I={"oldSrc":"34be22f77f84e9f40c9a9d7c92a7eab76b4e7d03","src":"85ce3cab9cd2a4f77c0bc2d49ab8c28214754607","oldReg":"509be0f345018d73f2f5727276de49e050baa549","reg":"be674f1e8246db4355d509f8aa7d3dcf905bfff4","oldCov":"e0dd0a6e1687083dc30850ffba43a88eda414a7b","cov":"fa0ea8de18df82f888a8de96e305c9f22b787cae","audit":"b0998141c953d89e78687075b820242a9a665787","defect":"af6503f786364b26a68f7f6be996f2d8d5556403","oldD":"66760bb8f58cbe50cb334dd1a653e3c89924cf05"};
const paths={oldSrc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_16.json',src:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_17.json',oldReg:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_2.json',reg:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_3.json',oldCov:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_1.json',cov:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_2.json',audit:'experiments/062/W_G0_AUTHOR_POSTS_34_ROW_SOURCE_COLD_REVIEW_0_1.json',defect:'experiments/062/W04C_W075_TANGENT_QUOTIENT_SOURCE_DEFECT_0_1.json',oldD:'experiments/062/W_G0_MULTISOURCE_SOURCE_DEMAND_PROJECTION_0_6.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const orig="left factor acts on tangent/quotient data",corrected="left factor acts on the tangent space to the space parametrizing the CP1s";
const reviewed=new Set(["W-SSC-011","W-SSC-012","W-SSC-013","W-SSC-014","W-SSC-015","W-SSC-016","W-SSC-017","W-SSC-018","W-SSC-021","W-SSC-022","W-SSC-025","W-SSC-057","W-SSC-058","W-SSC-059","W-SSC-060","W-SSC-061","W-SSC-062","W-SSC-063","W-SSC-064","W-SSC-065","W-SSC-066","W-SSC-067","W-SSC-068","W-SSC-069","W-SSC-070","W-SSC-071","W-SSC-072","W-SSC-073","W-SSC-074","W-SSC-075","W-SSC-076","W-SSC-077","W-SSC-078","W-SSC-121","W-SSC-079","W-SSC-107","W-SSC-122","W-SSC-124"]),olderIds=["W-SSC-079","W-SSC-107","W-SSC-122","W-SSC-124"];
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=x=>JSON.parse(JSON.stringify(x));
function check(a){
const errors=[],ck=(v,m)=>{if(!v)errors.push(m)};
const {oldSrc,src,oldReg,reg,oldCov,cov,audit,defect,oldD}=a;
ck(src?.schema==="woit.source-semantic-census.v0.17"&&src?.status==="W04C_W075_LEFT_TANGENT_ROLE_SOURCE_CORRECTION_AND_34_ROW_SOURCE_REVIEW_CANDIDATE_NOT_FROZEN","current G0 SSC");
ck(src?.items?.length===151&&oldSrc?.items?.length===151&&reg?.rows?.length===151&&cov?.rows?.length===151&&oldReg?.rows?.length===151,"complete census and inventory");
ck(src?.closure_claims?.sealed===false&&src?.closure_claims?.primitive_closure===false&&src?.correction?.G1_authorized===false,"source not qualified/promotion");
ck(src?.predecessor?.git_blob_sha===I.oldSrc&&src?.correction?.cause?.git_blob_sha===I.defect&&eq(src?.correction?.changed_W_census_ids,["W-SSC-075"]),"W075 exact predecessor and defect");
if(src?.items?.length!==151||oldSrc?.items?.length!==151||reg?.rows?.length!==151||cov?.rows?.length!==151||oldReg?.rows?.length!==151)return errors;
ck(eq(src.items.map(x=>x.id),oldSrc.items.map(x=>x.id)),"source 151 ID/order");
for(let i=0;i<151;i++){const cur=src.items[i],old=oldSrc.items[i];if(old.id!=="W-SSC-075")ck(eq(old,cur),"other W source item changed "+old.id)}
const before=oldSrc.items.find(x=>x.id==="W-SSC-075"),w=src.items.find(x=>x.id==="W-SSC-075"),w077=src.items.find(x=>x.id==="W-SSC-077"),st=w?.source_expression_census?.statements;
ck(w?.source==="W04c"&&w?.state==="OPEN"&&w?.obligation===before?.obligation.replace(orig,corrected),"source W075 exact correction");
ck(st?.length===3&&st?.[0]?.actor==="SL(2,C)_R"&&st?.[0]?.patient==="CP1_POINT_DATA"&&st?.[0]?.source_line===25,"right-hand factor typed CP1 role");
ck(st?.[1]?.actor==="SL(2,C)_L"&&st?.[1]?.patient==="TANGENT_SPACE_TO_SPACE_PARAMETRIZING_CP1S"&&st?.[1]?.source_line===25,"left factor exact tangent role");
ck(st?.[2]?.premise==="WICK_ROTATION_EXTRA_CHOICE"&&st?.[2]?.modality==="SOURCE_PROPOSAL_CONDITIONAL_TO_WICK_CHOICE"&&st?.[2]?.source_line===26,"Wick choice SU2L only proposal");
ck(w?.source_expression_census?.provenance_guard?.not_author_negation===true&&w?.source_expression_census?.provenance_guard?.rank_three_quotient?.includes("W077"),"separate W077 quotient / not false source negative");
ck(w077?.obligation?.includes("rank-three quotient bundles")&&w077?.state==="OPEN_PROPOSAL","W077 independent bundle remains");
ck(defect?.status==="CONFIRMED_G0_SOURCE_ROLE_CONFLATION_W075"&&defect?.repair?.replace_exact===orig&&defect?.repair?.with_exact===corrected,"source defect evidence and exact rewrite");
ck(audit?.scope?.total_source_semantic_items_checked===34&&audit?.scope?.confirmed_source_conservation_defects===1&&audit?.rows?.length===34&&audit?.defects?.[0]?.census_id==="W-SSC-075","complete 34 author post source review");
const amap=new Map(audit?.rows?.map(x=>[x.census_id,x]));ck(amap.get("W-SSC-075")?.source_verdict==="DEFECT_SOURCE_ROLE_CONFLATION_REOPEN_G0","audit preserved original overreach");
ck(reg?.schema==="isograph.exp062-w-g0-all-151-conservation-register.v0.3"&&reg?.source_census?.git_blob_sha===I.src&&reg?.predecessor_register?.git_blob_sha===I.oldReg,"register new/old source pins");
ck(reg?.counts?.current_W_source_item_count===151&&reg?.counts?.direct_author_current_source_rows_evidenced===38&&reg?.counts?.remaining_source_rows_not_directly_reviewed===113,"register review counts");
ck(reg?.historical_86_projection?.git_blob_sha===I.oldD&&reg?.historical_86_projection?.disposition?.includes("NO_REPIN"),"old W86 historical projection no hash-only repair");
ck(oldD?.items?.length===86&&!oldD?.items?.some(x=>x.census_id==="W-SSC-075"),"W075 old W86 nonmember");
ck(reg?.rows?.every(x=>x.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"&&x.historical_closure_accepted_as_current===false),"151 not qualified");
for(let i=0;i<151;i++){const s=src.items[i],row=reg.rows[i],prior=oldReg.rows[i];
ck(row?.census_id===s.id&&row?.ordinal===i+1&&row?.source_body_exact===s.obligation&&row?.source_expression_statement_count===(s.source_expression_census?.statements?.length||0),"151 source/register exact "+s.id);
ck(row?.historical_86_member===prior.historical_86_member&&row?.historical_ledger_0_19_mode===prior.historical_ledger_0_19_mode,"historical 151 membership unchanged "+s.id)
}
ck(cov?.schema==="isograph.exp062-w-g0-line-by-line-151-source-coverage.v0.2"&&cov?.source_census?.git_blob_sha===I.src&&cov?.reconstructed_register?.git_blob_sha===I.reg&&cov?.source_author_full_post_review?.git_blob_sha===I.audit,"coverage input pins");
ck(cov?.counts?.rows===151&&cov?.counts?.total_direct_current_source_source_semantic_body_reviews===38&&cov?.counts?.source_rows_remaining_cold_audit===113,"151 38 reviewed 113 open truthful");
let p=0;for(let i=0;i<151;i++){const x=src.items[i],r=cov.rows[i],yes=reviewed.has(x.id);if(yes)p++;
ck(r?.census_id===x.id&&r?.ordinal===i+1&&r?.source===x.source&&r?.body_length_chars===x.obligation.length&&r?.source_expression_statement_count===(x.source_expression_census?.statements?.length||0),"coverage exact "+x.id);
ck(r?.source_fidelity_this_cycle===(amap.has(x.id)?"DIRECT_AUTHOR_POST_ORIGINAL_TEXT_REVIEW_W075_REPAIRED_AND_SOURCE_SCOPE_PRESERVED":olderIds.includes(x.id)?"DIRECT_AUTHOR_SOURCE_TARGETED_PDF_OR_EQUATION_REVIEW_FROM_PREDECESSOR":"PENDING_DIRECT_SOURCE_COLD_REVIEW"),"review coverage flag "+x.id);
ck(r?.stage_authority===false&&r?.source_revision_bytes_equal_to_oct3_freeze==="NOT_ESTABLISHED","no fake source byte identity "+x.id)
}ck(p===38,"union review coverage 38");
ck(cov?.counts?.G0_closed===0&&cov?.status?.endsWith("113_OUTSTANDING"),"G0 unqualified and 113 open");
const X=src.items.find(x=>x.id==="W-SSC-097")?.source_expression_census?.statements;
ck(X?.[2]?.application_total_on_declared_domain===true&&X?.[6]?.negative_scope==="NOT_EXISTS_PROJECTIVE_POINT_FIXED","W097 source map and negative preserved");
ck(src.items.find(x=>x.id==="W-SSC-103")?.source_expression_census?.statements?.[0]?.rhs?.binder?.relation==="STRICT_GT","W103 strict Hodge not normalized");
ck(src.items.find(x=>x.id==="W-SSC-109")?.source_expression_census?.cross_cell_modality==="ANALOGY_ONLY_NOT_EQUALITY","W109 analogy only");
ck(src.items.find(x=>x.id==="W-SSC-122")?.source_expression_census?.statements?.[1]?.rhs==="conjugate(lambda)*f","W04e unusual bare f preserved");
return errors;
}
const tests=[
["drop 151 source",(a)=>a.src.items.pop()],
["drop 151 register",(a)=>a.reg.rows.pop()],
["drop 151 coverage",(a)=>a.cov.rows.pop()],
["wrong SSC status",(a)=>a.src.status="G0_FROZEN"],
["false SSC sealed",(a)=>a.src.closure_claims.sealed=true],
["false G1 authorized",(a)=>a.src.correction.G1_authorized=true],
["SSC wrong predecessor",(a)=>a.src.predecessor.git_blob_sha="BAD"],
["SSC wrong defect",(a)=>a.src.correction.cause.git_blob_sha="BAD"],
["W075 left role reverted",(a)=>a.src.items.find(x=>x.id==="W-SSC-075").obligation=a.oldSrc.items.find(x=>x.id==="W-SSC-075").obligation],
["W075 left tangent patient wrong",(a)=>a.src.items.find(x=>x.id==="W-SSC-075").source_expression_census.statements[1].patient="CANONICAL_RANK3_QUOTIENT"],
["W075 left actor swapped",(a)=>a.src.items.find(x=>x.id==="W-SSC-075").source_expression_census.statements[1].actor="SL(2,C)_R"],
["W075 right actor swapped",(a)=>a.src.items.find(x=>x.id==="W-SSC-075").source_expression_census.statements[0].actor="SL(2,C)_L"],
["W075 Wick condition removed",(a)=>a.src.items.find(x=>x.id==="W-SSC-075").source_expression_census.statements[2].premise="ALWAYS_TRUE"],
["W075 invented source negative",(a)=>a.src.items.find(x=>x.id==="W-SSC-075").source_expression_census.provenance_guard.not_author_negation=false],
["W077 rank3 altered",(a)=>a.src.items.find(x=>x.id==="W-SSC-077").obligation+="FORGED"],
["W097 maps rewritten",(a)=>a.src.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[2].application_total_on_declared_domain=false],
["W103 source strict omitted",(a)=>a.src.items.find(x=>x.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["W109 equivalence promoted",(a)=>a.src.items.find(x=>x.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUIVALENT"],
["W04e Theta anomaly normalized",(a)=>a.src.items.find(x=>x.id==="W-SSC-122").source_expression_census.statements[1].rhs="conjugate(lambda)*Theta(f)"],
["source other row changed",(a)=>a.src.items.find(x=>x.id==="W-SSC-001").obligation+="fake"],
["full register W075 stale",(a)=>a.reg.rows.find(x=>x.census_id==="W-SSC-075").source_body_exact="wrong"],
["inferred old86 W075 closed",(a)=>a.oldD.items.push({census_id:"W-SSC-075"})],
["current W86 fake hash replay",(a)=>a.reg.historical_86_projection.git_blob_sha="85ce3cab9cd2a4f77c0bc2d49ab8c28214754607"],
["direct source review overstated 151",(a)=>a.cov.counts.source_rows_remaining_cold_audit=0],
["source review W01 all forged",(a)=>a.cov.rows.find(x=>x.census_id==="W-SSC-001").source_fidelity_this_cycle="DIRECT_AUTHOR_POST_ORIGINAL_TEXT_REVIEW_W075_REPAIRED_AND_SOURCE_SCOPE_PRESERVED"],
["revision byte equality claimed",(a)=>a.cov.rows[0].source_revision_bytes_equal_to_oct3_freeze="CONFIRMED"],
["full 38 review list missing",(a)=>a.audit.rows.pop()],
["W075 source defect erased",(a)=>a.audit.rows.find(x=>x.census_id==="W-SSC-075").source_verdict="PASS"],
["register old closed accepted",(a)=>a.reg.rows[0].historical_closure_accepted_as_current=true],
["coverage inauthentic source sha",(a)=>a.cov.source_census.git_blob_sha="BAD"],
["joint source-register mutation",(a)=>{a.src.items.find(x=>x.id==="W-SSC-075").obligation+="forged";a.reg.rows.find(x=>x.census_id==="W-SSC-075").source_body_exact+="forged"}]
];
const inp=Object.fromEntries(Object.entries(paths).map(([k,p])=>[k,read(p)]));
const errors=check(inp),rejected=[],escaped=[];
for(const [name,fn] of tests){const c=clone(inp);fn(c);if(check(c).length)rejected.push(name);else escaped.push(name)}
for(const [k,p] of Object.entries(paths))if(hash(p)!==I[k])errors.push('PINNED_BLOB_SHA_MISMATCH '+k);
errors.push(...escaped.map(x=>'ESCAPED_ADVERSARIAL_CONTROL '+x));
console.log(JSON.stringify({schema:'isograph.exp062-w04c-w075-source-role-verifier.v0.1',pass:!errors.length,errors,source_items:151,other_source_items_unchanged:150,source_author_page_review_rows:34,cumulative_direct_source_rows:38,unreviewed_source_rows:113,mutations_total:tests.length,mutations_rejected:rejected.length,rejected,stage:'G0_UNFROZEN_NO_G1_AUTHORITY'},null,2));
if(errors.length)process.exitCode=1;
