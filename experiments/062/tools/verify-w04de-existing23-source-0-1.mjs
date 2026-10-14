import fs from 'node:fs';
import crypto from 'node:crypto';
const f={"priorSource":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_20.json","f99127726608cc69216175d3b36fad0873aba4d3"],"source":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_21.json","5ef9c65dddde1edea8c2f6974a21b3a479d096c7"],"priorDemand":["experiments/062/W_G0_W05_17_SOURCE_DEMAND_PROJECTION_0_9.json","ca3d39a70a7c265f7da66de69da7ae6e1182b29a"],"demand":["experiments/062/W_G0_W04DE_23_SOURCE_DEMAND_PROJECTION_0_10.json","e450ea541e05f4d592f7442647efa13689cfa1b6"],"review":["experiments/062/W04DE_G0_EXISTING_23_PRIMARY_SOURCE_DIRECT_REVIEW_0_1.json","20bff13a791d9c1ca13babafb768860ec708ba82"],"register":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_7.json","f470c3065b3131dea82844f16eecdcc8d85d100b"],"coverage":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_6.json","e0de1e7e28c96cebeca5939683bff5ee881d7dfe"],"gate":["experiments/062/W_CURRENT_STAGE_GATE_0_48.json","ed53b9436ab42560ff07cd13af997ae236c3bf11"],"defect":["experiments/062/W04DE_G0_EXISTING_23_SOURCE_DEFECT_0_1.json","3849ad91844106bad8eece792a5df73e642143eb"],"counterDefect":["experiments/062/W_G0_CARRIED_GATE_COUNTER_DEFECT_0_1.json","dc4ca3b99bb7fe56bb377007aa15d6511cfc50ae"]};
const negLiterals={"W082z":"t-i*tau","W082kernel":"exp(-i*z*E)=exp(-i*t*E)*exp(-tau*E)","W090lhs":"S_R tensor S_R","W090proposal":"S_R tensor conjugate(S_R)","W125modal":"OPEN_RELATED_TO_TWISTOR_TRANSFORM","W083theta":"conjugate(f(-tau))","W083OS":"S2(Theta f,g)","W092Spin55":"Spin(5,1)","W093null":"PT0=S3 x S2"};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=x=>JSON.parse(JSON.stringify(x));
function verify(v){
const errors=[],a=(ok,label)=>{if(!ok)errors.push(label)};
const {priorSource,source,priorDemand,demand,review,register,coverage,gate,defect,counterDefect}=v;
a(source?.schema==="woit.source-semantic-census.v0.21"&&source?.status==="W04DE_PENDING_23_EXISTING_ITEM_REVIEW_15_SOURCE_LITERAL_SCOPE_CORRECTIONS_G0_UNFROZEN","SSC candidate/stage");
a(source?.items?.length===151&&source?.census_item_count===151&&priorSource?.items?.length===151,"151 source exact identity census");
a(priorDemand?.items?.length===86&&demand?.items?.length===86,"86 historical old projection membership");
a(review?.rows?.length===23&&Object.keys(review?.amendments||{}).length===15,"23 existing source rows and 15 corrections");
a(register?.rows?.length===151&&coverage?.rows?.length===151,"151 W register/coverage");
if(source?.items?.length!==151||priorSource?.items?.length!==151||priorDemand?.items?.length!==86||demand?.items?.length!==86||review?.rows?.length!==23||register?.rows?.length!==151||coverage?.rows?.length!==151)return errors;
const changed=Object.keys(review.amendments).sort(),corrected86=changed.filter(id=>priorDemand.items.some(z=>z.census_id===id));
a(changed.length===15&&corrected86.length===8,"15 changed source, 8 W86 source");
a(same(changed,source?.correction?.changed_W_census_ids?.slice().sort())&&source?.correction?.G0_complete===false&&source?.correction?.G1_authorized===false,"corrected SSC ID/procedural status");
a(source?.predecessor?.git_blob_sha===f.priorSource[1]&&source?.correction?.cause?.git_blob_sha===f.defect[1]&&source?.correction?.source_review?.git_blob_sha===f.review[1],"SSC predecessor/defect/oracle pins");
a(same(priorSource.items.map(z=>z.id),source.items.map(z=>z.id))&&source.items.every((z,i)=>z.id==="W-SSC-"+String(i+1).padStart(3,"0")),"complete ordered source IDs");
const byId=new Map(source.items.map(z=>[z.id,z])),reviewBy=new Map(review.rows.map(z=>[z.census_id,z])),oldMap=new Map(priorDemand.items.map(z=>[z.census_id,z])),newMap=new Map(demand.items.map(z=>[z.census_id,z]));
a(reviewBy.size===23&&review.rows.every(row=>byId.has(row.census_id)),"distinct valid reviewed 23 IDs");
for(let i=0;i<151;i++){
const x=priorSource.items[i],y=source.items[i],id=y.id,fix=review.amendments[id];
if(!fix){a(same(x,y),"unrelated W source changed "+id);continue;}
let expectedBody=x.obligation;
if(fix.amendment_mode==="APPEND")expectedBody+=fix.append;
else if(fix.amendment_mode==="REPLACE"){
 a(x.obligation.includes(fix.find)&&x.obligation.split(fix.find).length===2,"single original source overclaim found "+id);
 expectedBody=x.obligation.replace(fix.find,fix.replacement);
}else errors.push("unknown repair type "+id);
a(y.obligation===expectedBody,"source original assertion conserved with delta "+id);
a(y.source===x.source&&y.state===x.state,"source scope/state preserved "+id);
a(y.source_expression_census?.source_id===fix.locator.source&&y.source_expression_census?.source_revision==="PRESENT_AUTHORED_SOURCE_NOT_OCT3_BYTE_VERIFIED","exact locator/status "+id);
a(same(y.source_expression_census?.statements,fix.statements),"all source equation/qualifier records "+id);
a(!x.source_expression_census,"unexpected predecessor expression replacement "+id);
}
a(demand.schema==="isograph.exp062-w-g0-historical-W86-source-demand-projection.v0.10"&&demand?.current_source?.git_blob_sha===f.source[1]&&demand?.predecessor_W_only_demand?.git_blob_sha===f.priorDemand[1],"successor historical demand schema/route");
a(demand?.replay_policy?.G1_authorized===false&&demand?.replay_policy?.full_G0_demand_membership_reconstruction_pending===true&&demand?.replay_policy?.L_members==="NOT_READ_OR_WRITTEN","W no G1 and no L");
a(same(priorDemand.items.map(z=>z.census_id),demand.items.map(z=>z.census_id)),"86 demand ordered historic membership");
for(let i=0;i<86;i++){const p=priorDemand.items[i],q=demand.items[i],id=p.census_id;
if(!corrected86.includes(id))a(same(p,q),"unrelated historical demand mutated "+id);
else{const src=byId.get(id),fix=review.amendments[id];
a(q.body===src.obligation&&same(q.source_formula_incidences,fix.statements)&&same(q.source_semantic_scope,fix.locator),"source/demand exact replay "+id);
}
a(q.track==="W","nonW demand "+id);
}
a(register.schema==="isograph.exp062-w-g0-all-151-conservation-register.v0.7"&&register.source_census?.git_blob_sha===f.source[1]&&register.historical_86_projection?.git_blob_sha===f.demand[1],"151 register pins");
a(register.rows.every(r=>r.historical_closure_accepted_as_current===false&&r.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"),"151 historical closure not promoted");
a(register?.counts?.direct_author_current_source_rows_evidenced===151&&register?.counts?.remaining_source_rows_not_directly_reviewed===0&&register?.counts?.whole_nine_source_reverse_assertion_census_complete===false,"all 151 existing bodies reviewed NOT reverse entire source");
a(register?.counts?.old_projection_omits_old_incomplete===52&&register?.counts?.old_projection_includes_old_closed_schema===8&&register?.counts?.historical_nonmembers===65,"historical membership defect preserved");
for(let i=0;i<151;i++){
const src=source.items[i],rr=register.rows[i],cc=coverage.rows[i];
a(rr.ordinal===i+1&&rr.census_id===src.id&&rr.source_body_exact===src.obligation&&rr.source_state===src.state&&rr.source_provenance===src.source,"151 register exact bodies "+src.id);
a(cc.ordinal===i+1&&cc.census_id===src.id&&cc.body_length_chars===src.obligation.length,"151 coverage exact bodies "+src.id);
const n=src.source_expression_census?.statements?.length||0;
a(rr.source_expression_statement_count===n&&cc.source_expression_statement_count===n,"151 exact formula count "+src.id);
a(rr.source_body_changed_this_successor===changed.includes(src.id),"151 corrected IDs exactly "+src.id);
if(reviewBy.has(src.id)){a(cc.source_fidelity_this_cycle==="DIRECT_W04DE_CURRENT_AUTHOR_PRIMARY_TEXT_OR_PDF_EXISTING_ITEM_REVIEW","23 source row review status "+src.id);
a(rr.source_revision_cold_review_status==="DIRECT_CURRENT_AVAILABLE_W04DE_AUTHOR_SOURCE_EXISTING_ITEM_REVIEW_OCT03_BYTE_IDENTITY_UNVERIFIED","register primary review "+src.id);
a(rr.source_existing_item_direct_review?.git_blob_sha===f.review[1],"register reviewer provenance "+src.id);
a(cc.source_revision_bytes_equal_to_oct3_freeze==="NOT_ESTABLISHED"&&cc.stage_authority===false,"no Oct3 / stage promotion "+src.id);
}
}
a(coverage.schema==="isograph.exp062-w-g0-line-by-line-151-source-coverage.v0.6"&&coverage?.source_census?.git_blob_sha===f.source[1]&&coverage?.reconstructed_register?.git_blob_sha===f.register[1],"coverage pins");
a(coverage?.counts?.total_direct_current_source_source_semantic_body_reviews===151&&coverage?.counts?.source_rows_remaining_cold_audit===0&&coverage?.counts?.original_nine_source_reverse_assertion_enumeration_complete===false&&coverage?.counts?.G0_closed===0,"151 existing audits != G0 nine source completeness");
let count=0;for(const [unit,cat]of Object.entries(coverage.by_unit)){const rows=coverage.rows.filter(x=>x.source_unit===unit);a(cat.rows===rows.length&&cat.source_expression_statements===rows.reduce((s,r)=>s+r.source_expression_statement_count,0),"unit exact count/source formula "+unit);
a(cat.direct_author_source_review===cat.rows&&cat.not_direct_source_reviewed===0,"unit existing source review full "+unit);count+=cat.rows;}
a(count===151&&coverage.by_unit.W04d.rows===13&&coverage.by_unit.W04e.rows===16,"nine source unit review coverage");
a(gate.schema==="isograph.exp062-w-current-stage-gate.v0.48"&&gate.current_source_census?.git_blob_sha===f.source[1]&&gate.current_all_151_conservation_register?.git_blob_sha===f.register[1]&&gate.current_source_coverage?.git_blob_sha===f.coverage[1]&&gate.current_historical_86_member_projection?.git_blob_sha===f.demand[1],"gate new exact revision tuple");
a(gate.current_lawful_state?.G0_open===true&&gate.current_lawful_state?.G0_complete===false&&gate.current_lawful_state?.G0_frozen===false,"G0 still unfrozen");
for(const stage of ["G1","G2","G3","G4","G5","G5H","G6","G7"])a(gate.current_lawful_state?.[stage+"_authorized"]===false,"no downstream stage "+stage);
a(gate.current_lawful_state?.all_nine_source_full_reverse_assertion_enumeration_complete===false&&gate.current_lawful_state?.Oct03_mutable_source_byte_identity_verified===false&&gate.current_lawful_state?.all_151_closure_re_adjudicated===false,"critical remaining G0 barriers");
a(gate.gate_counter_defect?.git_blob_sha===f.counterDefect[1]&&counterDefect.status==="CONFIRMED_STALE_DUPLICATED_STAGE_COUNTERS_IN_G0_GATE0_47","stale counters recorded no inheritance");
a(defect.status==="CONFIRMED_W04D_E_G0_PRINTED_SOURCE_SCOPE_AND_EXPRESSION_CONSERVATION_DEFECT"&&defect.affected_source_item_ids?.length===15,"source primary defect preserved");
const w82=byId.get("W-SSC-082"),w90=byId.get("W-SSC-090"),w125=byId.get("W-SSC-125"),w127=byId.get("W-SSC-127"),w83=byId.get("W-SSC-083");
const e82=w82?.source_expression_census?.statements?.[0],e90=w90?.source_expression_census?.statements?.[1],e125=w125?.source_expression_census?.statements?.[1],e127=w127?.source_expression_census?.statements?.[0],e83=w83?.source_expression_census?.statements?.[0];
a(e82?.source_z===negLiterals.W082z&&e82?.kernel===negLiterals.W082kernel&&e82?.source_claimed_domain==="UPPER_HALF_Z_PLANE"&&e82?.algebraic_sign_domain==="LOWER_HALF_Z_PLANE"&&e82?.resolution==="PRINTED_INCONSISTENCY_UNRESOLVED_DO_NOT_NORMALIZE","W082 contradictory half plane and original kernel conserved");
a(e90?.displayed_lhs===negLiterals.W090lhs&&w90?.source_expression_census?.statements?.[0]?.proposed===negLiterals.W090proposal&&e90?.source_printed_conjugation_bar_on_lhs===false,"W090 source bare vs conjugate notation preserved");
a(e125?.modal===negLiterals.W125modal&&e125?.operator_constructed===false&&!w125.obligation.includes("supplies the required conjugation"),"W125 no constructed Theta promotion");
a(e127?.electroweak_SU2L_breaking==="CAN_PROVIDE"&&e127?.exact_Higgs_dynamics==="UNCONSTRUCTED","W127 speculative Phi and Higgs preserved");
a(e83?.output===negLiterals.W083theta&&w83?.source_expression_census?.statements?.[1]?.rhs===negLiterals.W083OS,"W083 involution and OS positive time roles");
a(byId.get("W-SSC-092")?.source_expression_census?.statements?.[0]?.equalities?.[2]?.[1]===negLiterals.W092Spin55,"W092 source exact group role");
a(byId.get("W-SSC-093")?.source_expression_census?.statements?.[0]?.source_equation===negLiterals.W093null,"W093 PT0 product topological scope");
a((-2)<0&&Math.exp(-2*1)<1&&Math.exp(-2*1)>0,"independent half-plane and positive energy exponential algebra");
return errors;
}
const mutations=[
["delete source W151",(v)=>v.source.items.pop()],
["delete demand historical member",(v)=>v.demand.items.pop()],
["delete coverage W row",(v)=>v.coverage.rows.pop()],
["delete register W row",(v)=>v.register.rows.pop()],
["delete direct primary review row",(v)=>v.review.rows.pop()],
["source W082 half plane silently corrected",(v)=>v.source.items.find(x=>x.id==="W-SSC-082").source_expression_census.statements[0].source_claimed_domain="LOWER_HALF_Z_PLANE"],
["source W082 kernel sign flipped",(v)=>v.source.items.find(x=>x.id==="W-SSC-082").source_expression_census.statements[0].kernel="exp(-i*z*E)=exp(-i*t*E)*exp(+tau*E)"],
["source W082 algebraic sign flipped",(v)=>v.source.items.find(x=>x.id==="W-SSC-082").source_expression_census.statements[0].algebraic_sign_domain="UPPER_HALF_Z_PLANE"],
["source W125 Theta promoted",(v)=>v.source.items.find(x=>x.id==="W-SSC-125").source_expression_census.statements[1].operator_constructed=true],
["source W125 provisional language omitted",(v)=>v.source.items.find(x=>x.id==="W-SSC-125").obligation+=" supplies the required conjugation"],
["source W090 bar normalized",(v)=>v.source.items.find(x=>x.id==="W-SSC-090").source_expression_census.statements[1].displayed_lhs="S_R tensor conjugate(S_R)"],
["source W090 bare vs proposed conflated",(v)=>v.source.items.find(x=>x.id==="W-SSC-090").source_expression_census.statements[0].proposed="S_R tensor S_R"],
["source W127 Higgs falsely constructed",(v)=>v.source.items.find(x=>x.id==="W-SSC-127").source_expression_census.statements[0].exact_Higgs_dynamics="CONSTRUCTED"],
["source W083 OS operator omitted",(v)=>v.source.items.find(x=>x.id==="W-SSC-083").source_expression_census.statements[1].rhs="S2(f,g)"],
["source W092 real form switched",(v)=>v.source.items.find(x=>x.id==="W-SSC-092").source_expression_census.statements[0].equalities[2][1]="Spin(4,2)"],
["source W093 product sign changed",(v)=>v.source.items.find(x=>x.id==="W-SSC-093").source_expression_census.statements[0].source_equation="PT0=S3+S2"],
["source W090 unrelated 23 unchanged mutant",(v)=>v.source.items.find(x=>x.id==="W-SSC-091").obligation+="broken"],
["source W05 Hodge altered",(v)=>v.source.items.find(x=>x.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["source W109 analogy promoted",(v)=>v.source.items.find(x=>x.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUALITY"],
["source W097 map changed",(v)=>v.source.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[2].application_total_on_declared_domain=false],
["demand W125 loses formula",(v)=>v.demand.items.find(x=>x.census_id==="W-SSC-125").source_formula_incidences.pop()],
["demand W083 unrelated source body changed",(v)=>v.demand.items.find(x=>x.census_id==="W-SSC-083").body="different"],
["demand W100 unrelated change",(v)=>v.demand.items.find(x=>x.census_id==="W-SSC-100").body+="bad"],
["source and demand W125 jointly corrupted",(v)=>{v.source.items.find(x=>x.id==="W-SSC-125").obligation+="bad";v.demand.items.find(x=>x.census_id==="W-SSC-125").body+="bad"}],
["oracle and source W125 jointly corrupted",(v)=>{v.review.amendments["W-SSC-125"].statements[1].operator_constructed=true;v.source.items.find(x=>x.id==="W-SSC-125").source_expression_census.statements[1].operator_constructed=true;v.demand.items.find(x=>x.census_id==="W-SSC-125").source_formula_incidences[1].operator_constructed=true}],
["wrong changed delta W019",(v)=>v.source.items.find(x=>x.id==="W-SSC-019").obligation="wrong body"],
["register body mutated",(v)=>v.register.rows[18].source_body_exact="wrong"],
["register falsely passed G0",(v)=>v.register.rows[18].historical_closure_accepted_as_current=true],
["register 23 pending erroneously",(v)=>v.register.counts.remaining_source_rows_not_directly_reviewed=23],
["register 151 review falsely reverse",(v)=>v.register.counts.whole_nine_source_reverse_assertion_census_complete=true],
["coverage W04d direct only 1",(v)=>v.coverage.by_unit.W04d.direct_author_source_review=1],
["coverage W04e direct only 5",(v)=>v.coverage.by_unit.W04e.direct_author_source_review=5],
["coverage stale source length",(v)=>v.coverage.rows.find(x=>x.census_id==="W-SSC-082").body_length_chars=0],
["coverage falsely full reverse",(v)=>v.coverage.counts.original_nine_source_reverse_assertion_enumeration_complete=true],
["gate prematurely frozen",(v)=>v.gate.current_lawful_state.G0_frozen=true],
["gate G1 prematurely authorized",(v)=>v.gate.current_lawful_state.G1_authorized=true],
["gate G7 prematurely authorized",(v)=>v.gate.current_lawful_state.G7_authorized=true],
["gate mutable Oct3 bytes falsely certified",(v)=>v.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
["gate wrong source pin",(v)=>v.gate.current_source_census.git_blob_sha="BAD"],
["gate stale counter record missing",(v)=>v.gate.gate_counter_defect.git_blob_sha="BAD"],
["defect wrong source issue count",(v)=>v.defect.affected_source_item_ids.pop()],
["review W082 printed inconsistency removed",(v)=>v.review.amendments["W-SSC-082"].statements[0].source_claimed_domain="LOWER_HALF_Z_PLANE"],
["wrong source revision inherited",(v)=>v.source.items.find(x=>x.id==="W-SSC-082").source_expression_census.source_revision="OCT3_BYTES_VERIFIED"],
["L injected demand",(v)=>v.demand.items[0].track="L"],
["G3 order violated",(v)=>v.gate.current_lawful_state.G3_authorized=true],
["G5H order violated",(v)=>v.gate.current_lawful_state.G5H_authorized=true]
];
const ctx=Object.fromEntries(Object.entries(f).map(([name,[path]])=>[name,read(path)]));
const errors=verify(ctx),rejected=[],escaped=[];
for(const [name,m] of mutations){const x=clone(ctx);try{m(x);if(verify(x).length)rejected.push(name);else escaped.push(name)}catch(e){escaped.push(name+' UNCAUGHT '+e.message)}}
for(const [name,[path,want]] of Object.entries(f)){if(sha(path)!==want)errors.push('PIN_MISMATCH '+name)}
errors.push(...escaped.map(x=>'ESCAPED_MUTATION '+x));
const report={schema:'isograph.exp062-w04de-23-source-conservation-verifier.v0.1',pass:errors.length===0,errors,source_count:151,direct_existing_source_items_reviewed:151,pending_existing_items:0,whole_nine_source_assertions_reverse_enumerated:false,changed_source_items:15,unchanged_source_items:136,old_W86_demand_changed:8,old_W86_demand_unchanged:78,source_irregularity_W082_upper_vs_lower_preserved:true,source_unconstructed_Theta_W125_preserved:true,adversarial_total:mutations.length,adversarial_rejected:rejected.length,rejected,G0_frozen:false,external_review:'OWNER_BYPASSED_NOT_PASSED'};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
