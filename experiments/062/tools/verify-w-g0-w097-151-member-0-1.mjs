import fs from 'node:fs';
import crypto from 'node:crypto';
const ids={"oldS":"2912ed46355a73f3368f428fc2478cc8e5ce4d4e","now":"4a39e2d36465519a91731d193128dbd4b0720192","oldD":"000f2dd31e66823a1974d3076c9c01bafdb23f9a","d":"2f45b3c137b7de051e36c2e20d8bf95b647eb110","oracle":"3a448c9e762578e6ce6796123155f3ca3c2b5032","register":"ef5ed068a8241479b5db60814a369b2796f568e4","ledger":"cb0563a66fc6af881efcb66b04faa78631405ea4","defect":"bd8daeb03a44da8c0a778b7265c06d10a7c49885","failed":"d7a65d5134934c07ef38b6ca7fc09aa026548925"};
const paths={oldS:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_14.json',now:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_15.json',oldD:'experiments/062/W_G0_W02_LATE_SOURCE_DEMAND_PROJECTION_0_4.json',d:'experiments/062/W_G0_W097_SOURCE_DEMAND_PROJECTION_0_5.json',oracle:'experiments/062/W05_W097_PRIMARY_SOURCE_TYPED_INCIDENCE_ORACLE_0_1.json',register:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_1.json',ledger:'research/woit-lisi-isomorph/woit/CORE021_CLOSURE_LEDGER_0_19.json',defect:'experiments/062/W_G0_ALL_151_DEMAND_MEMBERSHIP_DEFECT_0_1.json',failed:'experiments/062/W097_G0_REGISTER_VERIFIER_MISSING_MEMBER_DEFECT_0_1.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const clone=x=>JSON.parse(JSON.stringify(x)),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const appended=" In this W05 §2 source statement, rho_tw is itself the declared antiholomorphic CP1 real-structure MAP with source-given homogeneous arguments and outputs, not an optional relation restricted to witnessed two-step applications. Its map-type CP1 domain/codomain, projective-square identity, and projective fixed-point nonexistence are separate source obligations; the coordinate-level square-minus-identity and affine formula are distinct carrier/chart clauses and do not replace the projective type law.";
function check(x){
const errors=[],a=(v,msg)=>{if(!v)errors.push(msg)};
const {oldS,now,oldD,d,oracle,register,ledger,defect}=x;
a(now?.schema==="woit.source-semantic-census.v0.15"&&now?.status==="W05_W097_TOTAL_PROJECTIVE_MAP_G0_SOURCE_CONSERVATION_CANDIDATE_NOT_FROZEN","source candidate gate/schema");
a(now?.items?.length===151&&now?.census_item_count===151,"151 source members");
a(d?.items?.length===86&&d?.counts?.W_historical_demand_members===86,"86 predecessor W-only membership");
a(register?.rows?.length===151&&register?.counts?.source_items===151,"151 source membership rows");
a(oldS?.items?.length===151&&oldD?.items?.length===86&&ledger?.dispositions?.length===151,"historical input shape");
if(now?.items?.length!==151||d?.items?.length!==86||register?.rows?.length!==151||oldS?.items?.length!==151||oldD?.items?.length!==86||ledger?.dispositions?.length!==151)return errors;
a(now?.predecessor?.git_blob_sha===ids.oldS&&eq(now?.correction?.changed_W_census_ids,["W-SSC-097"])&&now?.correction?.G1_rebuild_authorized===false&&now?.correction?.G7_source_instantiation_closed===false,"source predecessor/G1/G7 gate");
a(eq(now.items.map(r=>r.id),oldS.items.map(r=>r.id)),"W source ID order");
for(let i=0;i<151;i++)if(oldS.items[i].id!=="W-SSC-097")a(eq(oldS.items[i],now.items[i]),"other source changed "+oldS.items[i].id);
const old=oldS.items.find(r=>r.id==="W-SSC-097"),w=now.items.find(r=>r.id==="W-SSC-097"),st=w?.source_expression_census?.statements;
a(w?.source==="W05 §2"&&w?.state==="OPEN"&&w?.obligation===old?.obligation+appended,"W097 minimal exact source text correction");
a(w?.source_expression_census?.coverage==="W097_TYPED_MAP_VS_COORDINATE_AND_NEGATIVE_PROJECTIVE_FIDELITY_ONLY"&&st?.length===8&&eq(st,oracle?.statements),"all 8 W097 source expressions against independent fixed oracle");
const [m,r,t,aff,vec,proj,neg,co]=st||[];
a(m?.declared_map==="rho: CP1 -> CP1"&&m?.domain==="CP1"&&m?.codomain==="CP1"&&m?.operator==="ANTIHOLomorphic_SELF_MAP"&&m?.single_valued_map_declared===true&&m?.application_total_on_declared_domain===true&&m?.composition?.quantifier_scope==="EVERY_CP1_POINT","CP1 real structure total-map type law");
a(r?.source_literal==="rho([z1,z2])=[bar(z1),bar(z2)]"&&eq(r?.result,["conjugate(z1)","conjugate(z2)"])&&r?.ordinary_real_point_criterion==="rho([z1,z2])=[z1,z2]","ordinary map source/conjugation");
a(t?.source_literal==="rho_tw([z1,z2])=[-bar(z2),bar(z1)]"&&eq(t?.result,["NEGATE(CONJUGATE(z2))","CONJUGATE(z1)"])&&t?.domain==="CP1"&&t?.codomain==="CP1"&&t?.single_valued_map_declared===true&&t?.application_total_on_declared_domain===true,"antipodal full map, sign/bars/roles");
a(aff?.source_literal==="rho_tw(z)=-1/bar(z)"&&aff?.chart==="z=z1/z2"&&aff?.chart_scope==="AFFINE_EXPRESSION_ONLY"&&aff?.guard?.includes("homogeneous CP1"),"affine guard and source fraction");
a(vec?.result==="NEGATIVE_IDENTITY_ON_C2"&&vec?.carrier==="C2_COORDINATE_PAIRS"&&vec?.source_literal==="rho_tw^2 = -1 on coordinates (z1,z2) of C2","vector square distinct");
a(proj?.result==="IDENTITY_ON_CP1"&&proj?.quantifier_scope==="EVERY_CP1_POINT"&&proj?.carrier==="CP1_COMPLEX_LINES","projective square all");
a(neg?.negative_scope==="NOT_EXISTS_PROJECTIVE_POINT_FIXED"&&neg?.operator==="NO_FIXED_POINT"&&neg?.source_affine_reason==="z=-1/bar(z) implies |z|^2=-1"&&neg?.source_literal==="There are no points on CP1 such that rho_tw([z1,z2])=[z1,z2]","negated fixed-point scope");
a(co?.source_literal==="x^2+y^2+z^2=0"&&co?.source_real_points==="NONE"&&co?.source_complex_points==="EXIST","conic polarity");
a(oracle?.source?.frozen_revision==="arXiv:2202.02657v2"&&oracle?.source?.pdf_byte_identity==="NOT_ESTABLISHED"&&oracle?.authority===false,"frozen source/oracle not third-party qualification");
a(d?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.5"&&d?.status==="W_ONLY_W097_TYPED_MAP_SOURCE_REPLAY_UNFROZEN_NOT_FULL_151_DEMAND_MEMBERSHIP"&&d?.replay_policy?.G1_authorized===false&&d?.replay_policy?.W097_G7_two_provisional_closures_invalid===true,"projection no premature G1/G7");
a(d?.current_source?.git_blob_sha===ids.now&&d?.predecessor_W_only_demand?.git_blob_sha===ids.oldD&&eq(d.items.map(r=>r.census_id),oldD.items.map(r=>r.census_id)),"projection pins and 86-member order");
for(let i=0;i<86;i++)if(oldD.items[i].census_id!=="W-SSC-097")a(eq(oldD.items[i],d.items[i]),"other W demand changed "+oldD.items[i].census_id);
const d97=d.items.find(r=>r.census_id==="W-SSC-097");
a(d97?.state==="OPEN"&&d97?.body===w?.obligation&&eq(d97?.source_formula_incidences,st),"W097 exact G0 demand reconstruction");
a(register?.source_census?.git_blob_sha===ids.now&&register?.historical_86_projection?.git_blob_sha===ids.d&&register?.historical_closure_ledger?.git_blob_sha===ids.ledger,"151 register pinned sources");
a(register?.status==="FULL_SOURCE_ITEM_MEMBERSHIP_REGISTER_RECONSTRUCTED_G0_SOURCE_FIDELITY_NOT_QUALIFIED"&&register?.policy?.all_151_require_source_review===true&&register?.policy?.L_semantics_used===false,"151 register nonauthoritative W-only");
const demandMap=new Map(oldD.items.map(r=>[r.census_id,r])),ledMap=new Map(ledger.dispositions.map(r=>[r.census_id,r])),seen=new Set(),hist={};
for(let i=0;i<151;i++){const src=now.items[i],row=register.rows[i],oldHit=demandMap.get(src.id),oldDisp=ledMap.get(src.id),member=!!oldHit;
a(row?.ordinal===i+1&&row?.census_id===src.id&&!seen.has(src.id),"register id/order "+src.id);seen.add(src.id);
a(row?.source_body_exact===src.obligation&&row?.source_provenance===src.source&&row?.source_state===src.state,"register exact source "+src.id);
a(row?.historical_86_member===member&&row?.historical_ledger_0_19_mode===oldDisp?.closure_mode&&row?.historical_86_member_state===(oldHit?.state||"NOT_A_MEMBER"),"register historical provenance "+src.id);
a(row?.historical_closure_accepted_as_current===false&&row?.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"&&row?.G1_G7_consequence==="NOT_AUTHORIZED","register current procedural gate "+src.id);
a(row?.source_expression_statement_count===(src.source_expression_census?.statements?.length||0),"register formula count "+src.id);
const k=(member?"IN":"OUT")+"__"+oldDisp?.closure_mode;hist[k]=(hist[k]||0)+1;
}
a(eq(register.counts?.historical_modes_by_membership,hist),"151 register exact independently derived histogram");
a(hist["OUT__INCOMPLETE_UNEXPANDED"]===52&&hist["IN__CLOSED_SCHEMA"]===8&&hist["OUT__CLOSED_SCHEMA"]===4&&hist["OUT__CLOSED_PRIMITIVE"]===9&&hist["IN__INCOMPLETE_UNEXPANDED"]===78,"original 52/8 mismatch and 151 count");
a(defect?.categories?.["OUT__INCOMPLETE_UNEXPANDED"]===52&&defect?.categories?.["IN__CLOSED_SCHEMA"]===8,"G0 membership defect source preserved");
return errors;
}
const tests=[
["deleting source census row",(x)=>x.now.items.pop()],
["deleting W-only projection member",(x)=>x.d.items.pop()],
["deleting 151 register row",(x)=>x.register.rows.pop()],
["source 097 map totality dropped",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[2].application_total_on_declared_domain=false],
["source abstract map totality dropped",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[0].application_total_on_declared_domain=false],
["source map single-valuedness dropped",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[2].single_valued_map_declared=false],
["twistor minus sign erased",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[2].result[0]="CONJUGATE(z2)"],
["twistor arguments swapped",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[2].result.reverse()],
["ordinary bar missing",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[1].result[0]="z1"],
["vector/projective square conflated",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[4].result="IDENTITY_ON_C2"],
["projective square negative",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[5].result="NEGATIVE_IDENTITY_ON_CP1"],
["missing universal projective domain",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[5].quantifier_scope="TWO_SPECIAL_POINTS"],
["fixed-point negation reversed",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[6].negative_scope="EXISTS"],
["affine chart presented globally",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[3].chart_scope="ALL_CP1"],
["source conic has real point",(x)=>x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[7].source_real_points="EXIST"],
["unrelated W103 Hodge reversal",(x)=>x.now.items.find(r=>r.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["unrelated W109 analogy promotion",(x)=>x.now.items.find(r=>r.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUIVALENT"],
["unrelated W131 conjugation loss",(x)=>x.now.items.find(r=>r.id==="W-SSC-131").source_expression_census.statements[0].right.right="(1/2)_R"],
["joint W097 source/demand corruption",(x)=>{x.now.items.find(r=>r.id==="W-SSC-097").obligation+="bad";x.d.items.find(r=>r.census_id==="W-SSC-097").body+="bad"}],
["W097 demand loses source equation",(x)=>x.d.items.find(r=>r.census_id==="W-SSC-097").source_formula_incidences.pop()],
["old W-demand unrelated changed",(x)=>x.d.items.find(r=>r.census_id==="W-SSC-100").body+="bad"],
["false 151 register source body",(x)=>x.register.rows.find(r=>r.census_id==="W-SSC-097").source_body_exact="bad"],
["false 52 omitted marked 0",(x)=>x.register.counts.historical_modes_by_membership["OUT__INCOMPLETE_UNEXPANDED"]=0],
["false 8 old closed included 0",(x)=>x.register.counts.historical_modes_by_membership["IN__CLOSED_SCHEMA"]=0],
["old W131 closure promoted",(x)=>x.register.rows.find(r=>r.census_id==="W-SSC-131").historical_closure_accepted_as_current=true],
["unqualified 151 row declared passed",(x)=>x.register.rows[0].G0_status="QUALIFIED"],
["G1 reopened prematurely",(x)=>x.d.replay_policy.G1_authorized=true],
["G7 reclosed prematurely",(x)=>x.d.replay_policy.W097_G7_two_provisional_closures_invalid=false],
["historical W131 ledger modified",(x)=>x.ledger.dispositions.find(r=>r.census_id==="W-SSC-131").closure_mode="INCOMPLETE_UNEXPANDED"],
["source oracle changed along with source",(x)=>{x.oracle.statements[2].result[0]="BAD";x.now.items.find(r=>r.id==="W-SSC-097").source_expression_census.statements[2].result[0]="BAD";x.d.items.find(r=>r.census_id==="W-SSC-097").source_formula_incidences[2].result[0]="BAD"}],
["L semantic leak",(x)=>x.d.items[0].track="L"]
];
const ctx=Object.fromEntries(Object.entries(paths).filter(([k])=>k!=='failed').map(([k,p])=>[k,read(p)]));
const errors=check(ctx),rejected=[],escaped=[];
for(const [label,m] of tests){const x=clone(ctx);m(x);if(check(x).length)rejected.push(label);else escaped.push(label)}
for(const [k,p] of Object.entries(paths))if(sha(p)!==ids[k])errors.push('GIT_BLOB_PIN '+k);
errors.push(...escaped.map(s=>'MUTATION_ESCAPED '+s));
const failed=read(paths.failed);if(failed.status!=='PREPUBLICATION_INTERNAL_VERIFIER_EXCEPTION_PRESERVED'||!failed.observed_failure.includes('TypeError'))errors.push('failed predecessor defect evidence absent');
const result={schema:'isograph.exp062-w-g0-w097-source-151-member-verifier.v0.1',pass:!errors.length,errors,source_count:151,historical_members:86,all_151_register_verified:true,omitted_historical_incomplete:52,historical_closed_schema_inside_86:8,source_items_unchanged:150,other_historical_W_demands_unchanged:85,adversarial_total:tests.length,adversarial_rejected:rejected.length,rejected,stage:'G0_CANDIDATE_UNFROZEN',external_review:'OWNER_BYPASSED_NOT_PASSED'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
