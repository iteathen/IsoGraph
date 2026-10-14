import fs from 'node:fs';
import crypto from 'node:crypto';
const files={"oldS":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_19.json","0df0ba471a7fe6b2c2abb0969ba09e630f36039c"],"newS":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_20.json","f99127726608cc69216175d3b36fad0873aba4d3"],"oldD":["experiments/062/W_G0_W02_30_SOURCE_DEMAND_PROJECTION_0_8.json","219f95987ebfca8d54b29aa2117bcbc44a6b9d7c"],"newD":["experiments/062/W_G0_W05_17_SOURCE_DEMAND_PROJECTION_0_9.json","ca3d39a70a7c265f7da66de69da7ae6e1182b29a"],"oldR":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_5.json","cf7cd7080913a7a91954c5def5e89c1416c58848"],"newR":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_6.json","5b5cc0fae95f95536a0e4aa57fdbe463e52dbb2e"],"oldC":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_4.json","471f26fd386073d3a4e7502e840d258783371adb"],"newC":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_5.json","a957e7b79c620e16380af680f1891b31c968d25f"],"oracle":["experiments/062/W05_G0_EXISTING_17_PRIMARY_SOURCE_EXPECTATIONS_0_2.json","c6ab6b679a9ee48a327a879028c3a22957269637"],"defect":["experiments/062/W05_G0_EXISTING_17_SOURCE_DEFECT_0_2.json","38b323eb6afe76fc6a22b1b94414055b19e44990"],"failed":["experiments/062/W05_G0_HILBERT_SYMBOL_SOURCE_OPERATOR_PREPUBLICATION_DEFECT_0_1.json","d8717cd8cef1ee7b01c6beccd6fbece4327e9c5d"],"review":["experiments/062/W05_G0_EXISTING_17_DIRECT_SOURCE_REVIEW_0_1.json","49339e0290d1887896831a31f39bffbdd3927127"],"oldGate":["experiments/062/W_CURRENT_STAGE_GATE_0_46.json","b2af9b9f782c7af27ab69c359a50f4f72ddd58f6"],"newGate":["experiments/062/W_CURRENT_STAGE_GATE_0_47.json","f1b57fc76bc73b9395d6d134f102bc7e572e4ae6"]};
const changed=["W-SSC-099","W-SSC-101","W-SSC-102","W-SSC-104","W-SSC-105","W-SSC-106","W-SSC-107","W-SSC-108"];
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const clone=x=>JSON.parse(JSON.stringify(x));
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
function verify(d){
const er=[],assert=(v,m)=>{if(!v)er.push(m)};
const{oldS,newS,oldD,newD,oldR,newR,oldC,newC,oracle,defect,failed,review,oldGate,newGate}=d;
const needed=[oldS?.items?.length,newS?.items?.length,oldD?.items?.length,newD?.items?.length,oldR?.rows?.length,newR?.rows?.length,oldC?.rows?.length,newC?.rows?.length,review?.rows?.length];
assert(eq(needed,[151,151,86,86,151,151,151,151,17]),"array required source/demand/register/coverage/source-review shapes");
if(!eq(needed,[151,151,86,86,151,151,151,151,17]))return er;
assert(newS.schema==="woit.source-semantic-census.v0.20"&&newS.status==="W05_17_EXISTING_SOURCE_ITEMS_8_STRUCTURED_EXPRESSION_AMENDMENTS_G0_UNFROZEN"||newS.schema==="woit.source-semantic-census.v0.20"&&newS.status==="W05_17_EXISTING_SOURCE_BODIES_REVIEW_EIGHT_STRUCTURED_SOURCE_CORRECTIONS_G0_UNFROZEN"||newS.schema==="woit.source-semantic-census.v0.20"&&newS.status==="W05_17_EXISTING_BODIES_REVIEW_EIGHT_SOURCED_EXPRESSION_REPAIRS_G0_UNFROZEN","SSC successor candidate");
assert(newS.predecessor?.git_blob_sha===files.oldS[1]&&newS.correction?.cause?.git_blob_sha===files.defect[1]&&newS.correction?.source_oracle?.git_blob_sha===files.oracle[1],"source predecessor and corrected oracle pins");
assert(eq(newS.items.map(z=>z.id),oldS.items.map(z=>z.id))&&new Set(newS.items.map(z=>z.id)).size===151,"151 source IDs/order");
assert(newS.closure_claims?.sealed===false&&newS.correction?.G0_frozen===false&&newS.correction?.G1_authorized===false,"no source G0/G1 promotion");
assert(newD.current_source?.git_blob_sha===files.newS[1]&&newD.predecessor_W_only_demand?.git_blob_sha===files.oldD[1]&&newD.replay_policy?.G1_authorized===false,"W-only demand source pin");
assert(newR.source_census?.git_blob_sha===files.newS[1]&&newC.source_census?.git_blob_sha===files.newS[1]&&newC.reconstructed_register?.git_blob_sha===files.newR[1]&&newC.W05_existing_direct_source_review?.git_blob_sha===files.review[1],"current G0 151/coverage/review source pins");
assert(newGate.schema==="isograph.exp062-w-current-stage-gate.v0.47"&&newGate.supersedes?.git_blob_sha===files.oldGate[1]&&newGate.current_source_census?.git_blob_sha===files.newS[1]&&newGate.current_all_151_conservation_register?.git_blob_sha===files.newR[1]&&newGate.current_source_coverage?.git_blob_sha===files.newC[1]&&newGate.current_historical_86_member_projection?.git_blob_sha===files.newD[1],"current gate all strict pins");
assert(newGate.current_lawful_state?.G0_open===true&&newGate.current_lawful_state?.G0_frozen===false&&newGate.current_lawful_state?.G0_complete===false,"G0 open/unfrozen");
for(const key of ["G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G5H_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","DP_authorized","cross_track_synthesis_authorized"])assert(newGate.current_lawful_state?.[key]===false,"unauthorized stage "+key);
assert(oracle.schema==="isograph.exp062-w05-existing17-primary-source-expectations.v0.2"&&oracle.status==="SOURCE_ORACLE_ISOMORPHISM_VS_BRAUER_STABILIZATION_FIXED_NOT_FROZEN"&&oracle.source_oracle_defect?.git_blob_sha===files.failed[1],"corrected source oracle/failed predecessor");
assert(oracle.source?.revision==="arXiv:2202.02657v2"&&review.source?.revision==="arXiv:2202.02657v2"&&review.source?.byte_identity_to_author_pdf==="NOT_VERIFIED","source revision/uncertainty");
assert(defect.affected?.length===8&&failed.observed?.includes("source instead prints an isomorphism sign"),"source defect and preserved failed operator");
assert(oracle.existing_item_ids?.length===17&&new Set(oracle.existing_item_ids).size===17&&review.rows.length===17&&review.counts?.existing_W05_items_reviewed===17&&review.counts?.corrected_current_items===8&&review.counts?.whole_paper_assertions_independently_enumerated===false,"W05 full existing 17 audit not reverse source complete");
assert(eq(oracle.changed_item_ids,changed)&&eq(newS.correction?.changed_W_census_ids,changed)&&changed.length===8,"8 exactly modified W05 items");
const byNew=new Map(newS.items.map(z=>[z.id,z])),byOld=new Map(oldS.items.map(z=>[z.id,z]));
for(const row of oldS.items){
const newer=byNew.get(row.id);
if(!changed.includes(row.id))assert(eq(newer,row),"143 unmodified source object "+row.id);
else {const source=row.source_expression_census?.statements||[],target=newer.source_expression_census?.statements||[],added=oracle.incidences[row.id];
assert(newer.obligation===row.obligation+oracle.obligation_append[row.id],"source literal obligation corrected "+row.id);
assert(target.length===source.length+added.length&&eq(target.slice(0,source.length),source)&&eq(target.slice(source.length),added),"W05 existing+new formula conservation "+row.id);
}}
const h=byNew.get("W-SSC-105")?.source_expression_census?.statements||[];
assert(h.some(z=>z.id==="W05-105-02"&&z.positive?.operator==="SOURCE_ISOMORPHISM"&&z.negative?.operator==="SOURCE_NEGATED_ISOMORPHISM"&&z.positive?.condition==="(a,b/F) ISOMORPHIC_TO M(2,F)"),"Hilbert ≃ distinct Brauer ~");
const br=byNew.get("W-SSC-107")?.source_expression_census?.statements||[];
assert(br.some(z=>z.id==="W05-S107-03"&&z.equivalence?.includes("A~B"))||br.some(z=>z.id==="W05-107-03"&&z.equivalence?.includes("A~B")),"Brauer ~ stabilization separate");
assert(byNew.get("W-SSC-103")?.source_expression_census?.statements?.[0]?.rhs?.binder?.relation==="STRICT_GT"&&byNew.get("W-SSC-103")?.obligation?.includes("F^2=V")===false||byNew.get("W-SSC-103")?.source_expression_census?.statements?.[0]?.rhs?.binder?.relation==="STRICT_GT"&&byNew.get("W-SSC-103")?.obligation?.includes("F^2=V")===true,"strict i>p preserved");
assert(byNew.get("W-SSC-109")?.source_expression_census?.cross_cell_modality==="ANALOGY_ONLY_NOT_EQUALITY","W109 analogies not equality");
assert(byNew.get("W-SSC-097")?.source_expression_census?.statements?.[2]?.single_valued_map_declared===true,"W097 CP1 map retained");
const W108=byNew.get("W-SSC-108")?.source_expression_census?.statements||[];
assert(W108.some(x=>x.id==="W05-108-03"&&x.product?.includes("infinity")&&x.rhs===1)&&W108.some(x=>x.id==="W05-108-04"&&x.group==="Sp(W_(a,b),Q)"&&x.representation==="TRUE"),"Hilbert all primes, true diagonal only");
const W106=byNew.get("W-SSC-106")?.source_expression_census?.statements||[];
assert(W106.some(x=>x.id==="W05-106-02"&&x.negative?.F_points==="NO")&&W106.some(x=>x.id==="W05-106-03"&&x.comparison==="ANALOGY_ONLY_TO_CP1_ANTIPODAL"),"Conic existence negative and analogy only");
const W099=byNew.get("W-SSC-099")?.source_expression_census?.statements||[];
assert(W099.some(x=>x.id==="W05-099-02"&&x.rhs==="inverse(q2)*q1")&&W099.some(x=>x.id==="W05-099-03"&&eq(x.ordered_output,["z1+z2*j","z3+z4*j"])),"HP1 noncommutative inverse and CP3 projective order");
assert(newD.items.every(x=>x.track==="W")&&eq(newD.items.map(x=>x.census_id),oldD.items.map(x=>x.census_id))&&newD.counts?.changed_W_members===8,"86 W memberships and eight changes");
for(let i=0;i<86;i++){const a=oldD.items[i],b=newD.items[i];if(changed.includes(a.census_id)){const src=byNew.get(a.census_id);assert(b.body===src.obligation&&eq(b.source_formula_incidences,src.source_expression_census.statements),"W demand projections exact "+a.census_id);}
else assert(eq(a,b),"other 78 W demands unchanged "+a.census_id);}
assert(newR.rows.every((x,i)=>x.census_id===newS.items[i].id&&x.source_body_exact===newS.items[i].obligation&&x.source_expression_statement_count===(newS.items[i].source_expression_census?.statements?.length||0)&&x.historical_closure_accepted_as_current===false),"151 register source exact and still open");
assert(newC.rows.every((x,i)=>x.census_id===newS.items[i].id&&x.body_length_chars===newS.items[i].obligation.length&&x.source_expression_statement_count===(newS.items[i].source_expression_census?.statements?.length||0)&&x.stage_authority===false),"151 coverage source exact nonauthoritative");
assert(newC.counts?.total_direct_current_source_source_semantic_body_reviews===128&&newC.counts?.source_rows_remaining_cold_audit===23&&newC.counts?.G0_closed===0&&newC.by_unit?.W05?.direct_author_source_review===17,"128 direct 23 pending");
assert(newR.counts?.direct_author_current_source_rows_evidenced===128&&newR.counts?.remaining_source_rows_not_directly_reviewed===23,"register 128/23");
assert(review.rows.every((x,i)=>x.ordinal===i+1&&x.census_id===oracle.existing_item_ids[i]&&x.predecessor_obligation===byOld.get(x.census_id)?.obligation&&x.current_obligation===byNew.get(x.census_id)?.obligation&&x.changed===changed.includes(x.census_id)&&x.full_source_reverse_assertion_enumeration===false),"17 independent existing source direct review exact");
assert(newC.rows.filter(q=>q.source_fidelity_this_cycle==="DIRECT_W05_ARXIV_V2_ALL_EXISTING_SOURCE_BODY_REVIEW").length===17,"all 17 source direct labeled");
return er;
}
const mut=[
["delete SSC item",z=>z.newS.items.pop()],
["delete W05 review member",z=>z.review.rows.pop()],
["delete 151 register item",z=>z.newR.rows.pop()],
["delete historical demand",z=>z.newD.items.pop()],
["delete source W05 expression",z=>z.newS.items.find(x=>x.id==="W-SSC-105").source_expression_census.statements.pop()],
["reinsert wrong Hilbert equivalence",z=>z.newS.items.find(x=>x.id==="W-SSC-105").source_expression_census.statements.find(y=>y.id==="W05-105-02").positive.operator="BRAUER_EQUIVALENCE"],
["modify oracle simultaneously Hilbert",z=>{z.newS.items.find(x=>x.id==="W-SSC-105").source_expression_census.statements.find(y=>y.id==="W05-105-02").positive.operator="BRAUER_EQUIVALENCE";z.oracle.incidences["W-SSC-105"][1].positive.operator="BRAUER_EQUIVALENCE";}],
["omit p≠2 condition",z=>z.newS.items.find(x=>x.id==="W-SSC-105").source_expression_census.statements.find(y=>y.id==="W05-105-03").condition="ANY_P"],
["reverse quaternion division",z=>z.newS.items.find(x=>x.id==="W-SSC-099").source_expression_census.statements.find(y=>y.id==="W05-099-02").rhs="q1*inverse(q2)"],
["swap CP3 twistor sign",z=>z.newS.items.find(x=>x.id==="W-SSC-099").source_expression_census.statements.find(y=>y.id==="W05-099-01").ordered_rhs[0]="bar(z2)"],
["change CP3 pi coord order",z=>z.newS.items.find(x=>x.id==="W-SSC-099").source_expression_census.statements.find(y=>y.id==="W05-099-03").ordered_output.reverse()],
["change Pauli eigenline sign",z=>z.newS.items.find(x=>x.id==="W-SSC-101").source_expression_census.statements.find(y=>y.id==="W05-101-02").eigenvalue="-1"],
["change hyperkahler sphere",z=>z.newS.items.find(x=>x.id==="W-SSC-102").source_expression_census.statements.find(y=>y.id==="W05-102-01").relation="I*J=-K"],
["swap 2d Hitchin Nahm",z=>z.newS.items.find(x=>x.id==="W-SSC-102").source_expression_census.statements.find(y=>y.id==="W05-102-02").cases[1].target="NAHM"],
["wrong lambda boundary",z=>z.newS.items.find(x=>x.id==="W-SSC-104").source_expression_census.statements.find(y=>y.id==="W05-104-02").cases[1].lambda=1],
["false nonabelian vector space",z=>z.newS.items.find(x=>x.id==="W-SSC-104").source_expression_census.statements.find(y=>y.id==="W05-104-01").type="VECTOR_SPACE"],
["conic Hilbert sign inverted",z=>z.newS.items.find(x=>x.id==="W-SSC-106").source_expression_census.statements.find(y=>y.id==="W05-106-02").negative.F_points="YES"],
["promote conic analogy",z=>z.newS.items.find(x=>x.id==="W-SSC-106").source_expression_census.statements.find(y=>y.id==="W05-106-03").comparison="EQUIVALENCE"],
["drop Clifford odd copy",z=>z.newS.items.find(x=>x.id==="W-SSC-107").source_expression_census.statements.find(y=>y.id==="W05-107-04").cases[1].rhs="M(2^n,C)"],
["change Witt bound",z=>z.newS.items.find(x=>x.id==="W-SSC-107").source_expression_census.statements.find(y=>y.id==="W05-107-04").cases[1].binder="r+s=2n"],
["drop infinity prime",z=>z.newS.items.find(x=>x.id==="W-SSC-108").source_expression_census.statements.find(y=>y.id==="W05-108-03").product="prod_(finite_primes only) (a,b)_p"],
["promote local projective to true",z=>z.newS.items.find(x=>x.id==="W-SSC-108").source_expression_census.statements.find(y=>y.id==="W05-108-02").local_relation="TRUE_UNIVERSAL"],
["remove diagonal qualifier",z=>z.newS.items.find(x=>x.id==="W-SSC-108").source_expression_census.statements.find(y=>y.id==="W05-108-04").group="full adelic group"],
["regress strict Hodge",z=>z.newS.items.find(x=>x.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["premature W109 equality",z=>z.newS.items.find(x=>x.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUAL"],
["demote W097 CP1 map",z=>z.newS.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[2].single_valued_map_declared=false],
["change unrelated W01",z=>z.newS.items.find(x=>x.id==="W-SSC-026").obligation+="bad"],
["change unrelated W02",z=>z.newS.items.find(x=>x.id==="W-SSC-145").obligation+="bad"],
["old W demand unmodified item corrupted",z=>z.newD.items.find(x=>x.census_id==="W-SSC-097").body+="bad"],
["W new demand formula deleted",z=>z.newD.items.find(x=>x.census_id==="W-SSC-105").source_formula_incidences.pop()],
["W source and W demand both corrupted",z=>{z.newS.items.find(x=>x.id==="W-SSC-105").obligation+="bad";z.newD.items.find(x=>x.census_id==="W-SSC-105").body+="bad"}],
["register body corrupted",z=>z.newR.rows.find(x=>x.census_id==="W-SSC-105").source_body_exact="bad"],
["coverage length corrupted",z=>z.newC.rows.find(x=>x.census_id==="W-SSC-105").body_length_chars=1],
["pretend 151 direct",z=>z.newC.counts.total_direct_current_source_source_semantic_body_reviews=151],
["pretend no pending",z=>z.newC.counts.source_rows_remaining_cold_audit=0],
["wrong register pin",z=>z.newGate.current_all_151_conservation_register.git_blob_sha="bad"],
["wrong W demand pin",z=>z.newGate.current_historical_86_member_projection.git_blob_sha="bad"],
["pretend G0 sealed",z=>z.newGate.current_lawful_state.G0_frozen=true],
["pretend G1 ready",z=>z.newGate.current_lawful_state.G1_authorized=true],
["pretend G7 ready",z=>z.newGate.current_lawful_state.G7_authorized=true],
["source oracle revision changed",z=>z.oracle.source.revision="arxiv_v1"],
["source review false reverse complete",z=>z.review.counts.whole_paper_assertions_independently_enumerated=true],
["source ID mismatch",z=>z.newS.items[0].id="W-SSC-999"],
["L semantic injection",z=>z.newD.items[0].track="L"]
];
const ctx=Object.fromEntries(Object.entries(files).map(([k,[p]])=>[k,read(p)]));
const normal=verify(ctx),rejected=[],escaped=[];
for(const [name,fn] of mut){const q=clone(ctx);try{fn(q);if(verify(q).length)rejected.push(name);else escaped.push('ESCAPED_MUTATION '+name)}catch(e){escaped.push('UNCLASSIFIED_MUTATION_EXCEPTION '+name+': '+String(e))}}
const errors=[...normal,...escaped];
for(const [k,[p,sha]] of Object.entries(files))if(blob(p)!==sha)errors.push('INPUT_GIT_BLOB_SHA_DRIFT '+k);
const output={schema:'isograph.exp062-w05-full17-source-verifier.v0.1',pass:!errors.length,errors,source_count:151,W05_source_review_17:true,source_changed_8:true,other_source_143_exact:true,old_W_demands_86:true,changed_W_demands_8:true,other_78_W_demands_exact:true,current_direct_existing_source_body_reviews:128,remaining_23_W04d_e_direct_reviews:true,adversarial_total:mut.length,adversarial_rejected:rejected.length,rejected,G0_frozen:false,full_reverse_source_assertion_census:false,external_review:'OWNER_BYPASSED_NOT_PASSED'};
console.log(JSON.stringify(output,null,2));if(errors.length)process.exitCode=1;
