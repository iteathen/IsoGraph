import fs from 'node:fs';
import crypto from 'node:crypto';
const paths={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_18.json","newS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_19.json","oldD":"experiments/062/W_G0_W01_SOURCE_DEMAND_PROJECTION_0_7.json","newD":"experiments/062/W_G0_W02_30_SOURCE_DEMAND_PROJECTION_0_8.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_4.json","newR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_5.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_3.json","newC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_4.json","oracle":"experiments/062/W02_G0_EXISTING_30_SOURCE_LITERAL_EXPECTATIONS_0_1.json","review":"experiments/062/W02_G0_30_DIRECT_SOURCE_REVIEW_0_1.json","defect":"experiments/062/W02_G0_30_DIRECT_SOURCE_CENSUS_DEFECT_0_1.json","gateOld":"experiments/062/W_CURRENT_STAGE_GATE_0_45.json","gateNew":"experiments/062/W_CURRENT_STAGE_GATE_0_46.json"};
const pin={"oldS":"1fb691f7dcbf578b01cae1df78760d2789a09b48","newS":"0df0ba471a7fe6b2c2abb0969ba09e630f36039c","oldD":"ff06cb6cef785ac1328fad4ad274b618547252b5","newD":"219f95987ebfca8d54b29aa2117bcbc44a6b9d7c","oldR":"3bfb8812f892bd3003324e2b0ea66592fd13b3c8","newR":"cf7cd7080913a7a91954c5def5e89c1416c58848","oldC":"016118678a6d3fe5d45af7dcb82875ac469e9a6d","newC":"471f26fd386073d3a4e7502e840d258783371adb","oracle":"773eb4deb4d6e4cc14cd4f390912793813859718","review":"41071ec71b2e5804d894592962d56adc1e61a80f","defect":"254706f36b44164ca50ff5a8588d8464db8186a0","gateOld":"35daabca64eb6fa454e1d5ee800eda1d71b16fcc","gateNew":"b2af9b9f782c7af27ab69c359a50f4f72ddd58f6"};
const changed=["W-SSC-118","W-SSC-119","W-SSC-120","W-SSC-129","W-SSC-130","W-SSC-131","W-SSC-136","W-SSC-137","W-SSC-145","W-SSC-148","W-SSC-151"];
const changedMember=["W-SSC-118","W-SSC-119","W-SSC-129","W-SSC-130","W-SSC-145","W-SSC-148"];
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const clone=x=>JSON.parse(JSON.stringify(x)),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const sorted=xs=>[...xs].sort();
function verify(x){
const errors=[],assert=(v,m)=>{if(!v)errors.push(m)};
const {oldS,newS,oldD,newD,oldR,newR,oldC,newC,oracle,review,defect,gateOld,gateNew}=x;
assert(newS?.schema==="woit.source-semantic-census.v0.19"&&newS?.status==="W02_30_EXISTING_ITEM_SOURCE_REVIEW_11_EXACT_INCIDENT_CORRECTIONS_G0_UNFROZEN","W02 SSC status");
assert(newS?.items?.length===151&&oldS?.items?.length===151&&newD?.items?.length===86&&oldD?.items?.length===86,"Source/demand all preserved");
assert(newR?.rows?.length===151&&newC?.rows?.length===151&&review?.rows?.length===30&&oracle?.reviewed_all_30_source_body_rows?.length===30,"151 register and 30 W02 coverage");
assert(newS?.predecessor?.git_blob_sha===pin.oldS&&newS?.correction?.source_oracle?.git_blob_sha===pin.oracle&&newS?.correction?.cause?.git_blob_sha===pin.defect,"SSC source independent oracle/defect pins");
assert(newS?.correction?.G1_authorized===false&&newS?.correction?.G0_frozen===false&&newS?.closure_claims?.sealed===false,"Source no premature closure");
assert(newD?.current_source?.git_blob_sha===pin.newS&&newD?.predecessor_W_only_demand?.git_blob_sha===pin.oldD&&newD?.replay_policy?.G1_authorized===false,"demand pinned unqualified W-only");
assert(newR?.source_census?.git_blob_sha===pin.newS&&newC?.source_census?.git_blob_sha===pin.newS&&newC?.reconstructed_register?.git_blob_sha===pin.newR&&newC?.source_W02_review?.git_blob_sha===pin.review,"register/coverage pins");
assert(gateNew?.schema==="isograph.exp062-w-current-stage-gate.v0.46"&&gateNew?.current_source_census?.git_blob_sha===pin.newS&&gateNew?.current_source_coverage?.git_blob_sha===pin.newC&&gateNew?.current_all_151_conservation_register?.git_blob_sha===pin.newR,"current W gate triple pin");
assert(gateNew?.supersedes?.git_blob_sha===pin.gateOld&&gateNew?.current_historical_86_member_projection?.git_blob_sha===pin.newD&&gateOld?.schema==="isograph.exp062-w-current-stage-gate.v0.45","stage lineage/previous source");
assert(gateNew?.current_lawful_state?.G0_open===true&&gateNew?.current_lawful_state?.G0_complete===false&&gateNew?.current_lawful_state?.G0_frozen===false&&gateNew?.current_lawful_state?.G1_authorized===false&&gateNew?.current_lawful_state?.G2_authorized===false&&gateNew?.current_lawful_state?.G3_authorized===false&&gateNew?.current_lawful_state?.G4_authorized===false&&gateNew?.current_lawful_state?.G5_authorized===false&&gateNew?.current_lawful_state?.G5H_authorized===false&&gateNew?.current_lawful_state?.G6_authorized===false&&gateNew?.current_lawful_state?.G7_authorized===false&&gateNew?.current_lawful_state?.recursive_IA_authorized===false&&gateNew?.current_lawful_state?.DP_authorized===false&&gateNew?.current_lawful_state?.cross_track_synthesis_authorized===false,"all downstream gates blocked");
assert(oracle?.primary?.revision==="arXiv:2311.00608v2"&&review?.primary?.revision==="arXiv:2311.00608v2"&&review?.primary?.arxiv_pdf_author_pdf_byte_identity==="NOT_ESTABLISHED","exact W02 PDF revision and unknown author-PDF identity");
assert(review?.counts?.W02_existing_items===30&&review?.counts?.W02_direct_read_existing_items===30&&review?.counts?.W02_exact_details_corrected===11&&review?.counts?.full_W02_reverse_assertion_enumeration_complete===false,"W02 source review exact scope not paper complete");
const newMap=new Map(newS.items?.map(y=>[y.id,y])),oldMap=new Map(oldS.items?.map(y=>[y.id,y]));
assert(eq(newS.items?.map(y=>y.id),oldS.items?.map(y=>y.id))&&newMap.size===151&&oldMap.size===151,"W source identity membership all 151 exact");
const target=sorted(Object.keys(oracle?.corrections_by_source_id||{}));
assert(eq(target,changed)&&eq(sorted(newS?.correction?.changed_W_census_ids||[]),changed)&&target.length===11,"changed exactly 11 W02 source");
let otherUntouched=0;
for(const it of oldS.items){
const t=newMap.get(it.id);
if(!t){errors.push("missing source "+it.id);continue}
if(!changed.includes(it.id)){assert(eq(it,t),"unrelated source object drift "+it.id);otherUntouched++;continue}
assert(t.source===it.source&&t.state===it.state&&t.obligation===it.obligation+oracle.correction_append_exact[it.id],"W02 minimal source body "+it.id);
const oldExpr=it.source_expression_census?.statements||[],nextExpr=t.source_expression_census?.statements||[],ext=oracle.corrections_by_source_id[it.id];
assert(nextExpr.length===oldExpr.length+ext.length&&eq(nextExpr.slice(0,oldExpr.length),oldExpr)&&eq(nextExpr.slice(oldExpr.length),ext),"exact source assertions conserved "+it.id);
}
assert(otherUntouched===140,"W01/W03/W04/W05 140 objects exact");
assert(newMap.get("W-SSC-103")?.source_expression_census?.statements?.[0]?.rhs?.binder?.relation==="STRICT_GT","W103 strict i>p preserved");
assert(newMap.get("W-SSC-109")?.source_expression_census?.cross_cell_modality==="ANALOGY_ONLY_NOT_EQUALITY","W109 analogies remain analogies");
assert(newMap.get("W-SSC-097")?.source_expression_census?.statements?.[2]?.single_valued_map_declared===true,"W097 full CP1 map source preserved");
const E=x.newS.items?.find(y=>y.id==="W-SSC-145")?.source_expression_census?.statements||[];
assert(E.some(y=>y.id==="W02-COLD-SELFDUAL-01"&&y.dimension?.scalar===3&&y.dimension?.field==="C"&&y.operator==="TRACELESS_ENDOMORPHISMS"),"W145 3-C-dimensional right-chiral source");
const F=x.newS.items?.find(y=>y.id==="W-SSC-148")?.source_expression_census?.statements||[];
assert(F.some(y=>y.id==="W02-COLD-CURV-BLOCK-01"&&y.source_phrase==="This has a block diagonal form"&&eq(y.decomposition,[3,3]))&&F.some(y=>y.id==="W02-COLD-CURV-BLOCK-02"&&y.operator==="VANISHING_OFF_DIAGONAL_CURVATURE_BLOCKS"),"W148 source preserves apparent two-clause tension");
const M=x.newS.items?.find(y=>y.id==="W-SSC-129")?.source_expression_census?.statements||[];
assert(M.some(y=>y.id==="W02-COLD-REALFORMS-01"&&y.op==="EQUAL"&&y.lhs==="inverse(Omega_R)"&&y.rhs==="adjoint(Omega_L)")&&M.some(y=>y.id==="W02-COLD-REALFORMS-02"&&y.coordinate_condition==="x0_PURE_IMAGINARY"),"W129 realforms and signs");
const H=x.newS.items?.find(y=>y.id==="W-SSC-136")?.source_expression_census?.statements||[];
assert(H.some(y=>y.id==="W02-COLD-OS-01"&&y.restriction==="POSITIVE_IMAGINARY_TIME"&&y.reflection==="OSTERWALDER_SCHRADER"),"W136 OS positive half-time");
const Y=x.newS.items?.find(y=>y.id==="W-SSC-118")?.source_expression_census?.statements||[];
assert(Y.some(y=>y.id==="W02-COLD-YM-CARRIER-01"&&y.group==="G"&&y.connection==="A"&&y.curvature==="F_A"),"W118 YM carrier");
const X=x.newS.items?.find(y=>y.id==="W-SSC-151")?.source_expression_census?.statements||[];
assert(X.some(y=>y.id==="W02-COLD-DISCUSSION-02"&&y.closure===false&&y.source_literal==="requires further investigation"),"W151 open electroweak");
assert(newD?.items?.every(y=>y.track==="W")&&eq(newD?.items?.map(y=>y.census_id),oldD?.items?.map(y=>y.census_id))&&newD?.counts?.changed_W_members===changedMember.length,"all 86 W old demand retained");
for(let i=0;i<(oldD?.items?.length||0);i++){const q=oldD.items[i],r=newD.items[i];if(!r){errors.push("missing W demand "+i);continue}
if(changedMember.includes(q.census_id)){assert(r.body===newMap.get(q.census_id)?.obligation&&eq(r.source_formula_incidences,newMap.get(q.census_id)?.source_expression_census?.statements),"W02 source-to-old-W-demand "+q.census_id)}
else assert(eq(q,r),"other W demand object changed "+q.census_id)}
assert(newR?.rows?.every((r,i)=>r.census_id===newS.items?.[i]?.id&&r.source_body_exact===newS.items?.[i]?.obligation&&r.source_expression_statement_count===(newS.items?.[i]?.source_expression_census?.statements?.length||0)&&r.historical_closure_accepted_as_current===false),"all 151 register source exact and never promoted");
assert(newC?.rows?.every((r,i)=>r.census_id===newS.items?.[i]?.id&&r.body_length_chars===newS.items?.[i]?.obligation.length&&r.source_expression_statement_count===(newS.items?.[i]?.source_expression_census?.statements?.length||0)&&r.stage_authority===false),"all 151 coverage rows source exact");
const rowId=new Set(review?.rows?.map(r=>r.census_id));
assert(rowId.size===30&&eq(sorted([...rowId]),sorted(oldS.items.filter(t=>t.source?.startsWith("W02")).map(x=>x.id))),"all and only W02 30 existing bodies source compared");
for(const r of review?.rows||[]){const p=oldMap.get(r.census_id),q=newMap.get(r.census_id);
assert(r.prior_body===p?.obligation&&r.current_body===q?.obligation&&r.changed===changed.includes(r.census_id)&&r.direct_source_observation?.length>20&&r.closed===false,"W02 exact review row "+r.census_id)}
assert(newC?.rows?.filter(q=>q.source_fidelity_this_cycle==="DIRECT_W02_ARXIV_V2_EXISTING_ITEM_PRIMARY_SOURCE_REVIEW")?.length===30,"30 W02 direct flags");
assert(newC?.counts?.total_direct_current_source_source_semantic_body_reviews===112&&newC?.counts?.source_rows_remaining_cold_audit===39&&newC?.counts?.W02_corrected_items===11&&newC?.counts?.G0_closed===0,"112 reviewed 39 pending G0 open");
assert(newR?.counts?.direct_author_current_source_rows_evidenced===112&&newR?.counts?.remaining_source_rows_not_directly_reviewed===39,"register same source row count");
assert(defect?.affected_ids?.length===11&&eq(sorted(defect?.affected_ids||[]),changed)&&defect?.full_W02_assertion_exhaustiveness===false,"defect authority boundaries");
return errors;
}
const mutation=[
["Drop W02 source item",x=>{x.newS.items.pop()}],
["Drop W02 reviewed item",x=>{x.review.rows.pop()}],
["Drop 151 register row",x=>{x.newR.rows.pop()}],
["Drop W old-demand row",x=>{x.newD.items.pop()}],
["Change historical W01",x=>{x.newS.items.find(y=>y.id==="W-SSC-026").obligation+="FAKE"}],
["Change source Hodge W103",x=>{x.newS.items.find(y=>y.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"}],
["Promote W109 table analogy",x=>{x.newS.items.find(y=>y.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUAL"}],
["Demote W097 CP1 map",x=>{x.newS.items.find(y=>y.id==="W-SSC-097").source_expression_census.statements[2].single_valued_map_declared=false}],
["Delete W02 citation source row",x=>{x.newS.items.find(y=>y.id==="W-SSC-120").source_expression_census.statements.pop()}],
["Change W02 YM curvature",x=>{x.newS.items.find(y=>y.id==="W-SSC-118").source_expression_census.statements.at(-1).curvature="G"}],
["Change W119 theta output",x=>{x.newS.items.find(y=>y.id==="W-SSC-119").source_expression_census.statements.at(-1).value_space="R3"}],
["Change W120 external attribution",x=>{x.newS.items.find(y=>y.id==="W-SSC-120").source_expression_census.statements.at(-1).modality="AUTHOR_NEW_THEOREM"}],
["Change W129 dagger condition",x=>{x.newS.items.find(y=>y.id==="W-SSC-129").source_expression_census.statements.at(-2).rhs="Omega_L"}],
["Change W130 dotted role",x=>{x.newS.items.find(y=>y.id==="W-SSC-130").source_expression_census.statements.at(-1).dotted.left="(1/2)_L"}],
["Change W131 nonholomorphic",x=>{x.newS.items.find(y=>y.id==="W-SSC-131").source_expression_census.statements.at(-1).complex_spacetime_representation="HOLOMORPHIC"}],
["Change W136 positive imaginary",x=>{x.newS.items.find(y=>y.id==="W-SSC-136").source_expression_census.statements.at(-2).restriction="NEGATIVE_IMAGINARY_TIME"}],
["Import W137 external references as theory",x=>{x.newS.items.find(y=>y.id==="W-SSC-137").source_expression_census.statements.at(-1).modality="QUALIFIED_THEOREM"}],
["Change W145 dimension",x=>{x.newS.items.find(y=>y.id==="W-SSC-145").source_expression_census.statements.at(-2).dimension.scalar=4}],
["Normalize W148 source block tension",x=>{x.newS.items.find(y=>y.id==="W-SSC-148").source_expression_census.statements.at(-2).source_phrase="Always offdiagonal vanishes"}],
["Erase W151 unresolved question",x=>{x.newS.items.find(y=>y.id==="W-SSC-151").source_expression_census.statements.at(-1).closure=true}],
["Alter W02 original formula",x=>{x.newS.items.find(y=>y.id==="W-SSC-128").source_expression_census.statements[0].matrix[0][1]="x1+i*x2"}],
["Remove old YM statement",x=>{x.newS.items.find(y=>y.id==="W-SSC-118").source_expression_census.statements.shift()}],
["Mutate W02 source body but oracle coordinated",x=>{x.newS.items.find(y=>y.id==="W-SSC-145").obligation+="FAKE";x.oracle.correction_append_exact["W-SSC-145"]+="FAKE"}],
["Mutate W02 source+oracle together",x=>{x.newS.items.find(y=>y.id==="W-SSC-145").source_expression_census.statements.at(-2).dimension.scalar=4;x.oracle.corrections_by_source_id["W-SSC-145"][0].dimension.scalar=4}],
["Old W demand modified unrelated",x=>{x.newD.items.find(y=>y.census_id==="W-SSC-097").body+="UNSOURCED"}],
["Omit source-to-demand formula",x=>{x.newD.items.find(y=>y.census_id==="W-SSC-118").source_formula_incidences.pop()}],
["Change register literal body",x=>{x.newR.rows[0].source_body_exact="FAKE"}],
["Change coverage literal body",x=>{x.newC.rows[0].body_length_chars=0}],
["Fake 151 direct",x=>{x.newC.counts.total_direct_current_source_source_semantic_body_reviews=151}],
["Fake 0 outstanding",x=>{x.newC.counts.source_rows_remaining_cold_audit=0}],
["Fake G0 frozen",x=>{x.gateNew.current_lawful_state.G0_frozen=true}],
["Fake G1 pass",x=>{x.gateNew.current_lawful_state.G1_authorized=true}],
["Fake G7 pass",x=>{x.gateNew.current_lawful_state.G7_authorized=true}],
["Change stage W demand pin",x=>{x.gateNew.current_historical_86_member_projection.git_blob_sha="BAD"}],
["Change W02 oracle revision",x=>{x.oracle.primary.revision="arXiv:2311.00608v1"}],
["Change G0 gate source pin",x=>{x.gateNew.current_source_census.git_blob_sha="FAKE"}],
["Change register pin",x=>{x.gateNew.current_all_151_conservation_register.git_blob_sha="FAKE"}],
["Promote 1 of 151 review",x=>{x.newR.rows[0].historical_closure_accepted_as_current=true}],
["Change W02 index review page",x=>{x.review.rows[0].prior_body="FAKE"}],
["Import L into W demand",x=>{x.newD.items[0].track="L"}],
["Delete original source from target",x=>{x.newS.items.find(y=>y.id==="W-SSC-119").obligation=""}]
];
const ctx=Object.fromEntries(Object.entries(paths).map(([k,p])=>[k,read(p)]));
const errors=verify(ctx),reject=[],escaped=[];
for(const [name,fn] of mutation){const x=clone(ctx);try{fn(x);const bad=verify(x);if(bad.length)reject.push(name);else escaped.push('ESCAPED_MUTATION '+name)}catch(e){escaped.push('MUTATION_UNCLASSIFIED_EXCEPTION '+name+' '+String(e))}}
for(const [k,p] of Object.entries(paths))if(gitBlob(p)!==pin[k])errors.push('GIT_BLOB_SHA_PIN_MISMATCH '+k);
errors.push(...escaped);
const result={schema:'isograph.exp062-w02-existing30-g0-verifier.v0.1',pass:errors.length===0,errors,source_census_members:151,existing_W02_source_bodies_reviewed:30,source_bodies_corrected:11,other_W_source_objects_exactly_preserved:140,old_W_only_projection_members:86,old_W_only_projection_changed:changedMember.length,current_direct_source_body_reviews:112,current_direct_source_body_pending:39,adversarial_mutations_total:mutation.length,adversarial_mutations_rejected:reject.length,rejected:reject,G0_frozen:false,G1_to_G7_qualified:false,external_review:'OWNER_BYPASSED_NOT_PASSED'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
