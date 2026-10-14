import fs from 'node:fs';
import crypto from 'node:crypto';
const fix={"src":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_15.json","4a39e2d36465519a91731d193128dbd4b0720192"],"ext":["experiments/062/W_EXTRACTION_RECONCILED_0_23.json","ccf4713009d624c4f9f84010f48f899e3aae2e22"],"graph":["experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json","4a6ef4b2e4987c6875e6fc4c0205a04f84c37b57"],"quot":["experiments/062/W_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_4.json","4895485b27489fc8028f5b7804ef6d9a6021ffaa"],"def":["experiments/062/W097_G0_CROSS_OCCURRENCE_SI_DEFECT_0_1.json","ec80a867e5ec5373183f134e462aebc6386604d1"],"gate":["experiments/062/W_CURRENT_STAGE_GATE_0_42.json",null]};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const A=[["m","u"],["m","v"]],B=[["m1","u"],["m2","v"]],C=[["r","p"],["r","q"]];
const pattern=xs=>{const m=new Map();return xs.map(v=>{if(!m.has(v))m.set(v,m.size);return m.get(v)})},localSig=a=>JSON.stringify(a.map((args,i)=>({arity:args.length,local:pattern(args),force:i?"NEGATED":"ASSERTED",dependency:i?[0]:[]}))),globalSig=a=>{const m=new Map();return JSON.stringify(a.flatMap(v=>v.map(x=>{if(!m.has(x))m.set(x,m.size);return m.get(x)})))};
function validate(d){
const err=[],ck=(v,s)=>{if(!v)err.push(s)},w=d.src?.items?.find(x=>x.id==="W-SSC-097"),z=w?.source_expression_census?.statements;
ck(d.gate?.schema==="isograph.exp062-w-current-stage-gate.v0.42"&&d.gate?.status==="W_G0_UNFROZEN_W097_TYPED_SI_AND_BINDER_CONSERVATION_PENDING","stage identity");
ck(d.gate?.current_lawful_state?.G0_open===true&&d.gate?.current_lawful_state?.G0_frozen===false&&d.gate?.current_lawful_state?.G1_authorized===false&&d.gate?.current_lawful_state?.G2_authorized===false&&d.gate?.current_lawful_state?.G7_authorized===false,"no downstream authorization");
ck(d.gate?.historical_G1_G2_source_co_reference_complete===false&&d.gate?.cross_occurrence_identity_conservation?.defect?.git_blob_sha===fix.def[1]&&d.gate?.current_source_census?.git_blob_sha===fix.src[1],"gate/source SI pin");
ck(d.gate?.cross_occurrence_identity_conservation?.G1_authorized===false,"SI source prevents G1");
ck(d.src?.schema==="woit.source-semantic-census.v0.15"&&d.src?.items?.length===151&&z?.length===8&&w?.state==="OPEN","SSC0.15 exact source");
ck(z?.[2]?.domain==="CP1"&&z?.[2]?.codomain==="CP1"&&z?.[2]?.map==="rho_tw"&&z?.[2]?.single_valued_map_declared===true&&z?.[2]?.application_total_on_declared_domain===true,"CP1 source map total and single valued");
ck(z?.[4]?.carrier==="C2_COORDINATE_PAIRS"&&z?.[5]?.carrier==="CP1_COMPLEX_LINES"&&z?.[4]?.result==="NEGATIVE_IDENTITY_ON_C2"&&z?.[5]?.result==="IDENTITY_ON_CP1"&&z?.[6]?.negative_scope==="NOT_EXISTS_PROJECTIVE_POINT_FIXED","distinct carrier square and no fixed");
const e=d.ext?.items?.find(x=>x.census_id==="W-SSC-097")?.occurrences||[];
const m=new Map(e.map(x=>[x.occurrence_id,x]));
ck(e.length===8&&m.get("W-SSC-097-O06")?.source_span?.includes("rho_tw twice")&&m.get("W-SSC-097-O04")?.source_span==="rho_tw has no projective fixed points"&&m.get("W-SSC-097-O03")?.source_span?.includes("twistor antipodal real structure rho_tw"),"repeated projective map in G1 source occurrences");
const g=d.graph?.items?.find(x=>x.census_id==="W-SSC-097")?.graph;
const edgeTypes=(g?.edges||[]).reduce((a,x)=>(a[x.kind]=(a[x.kind]||0)+1,a),{});
ck(g?.nodes?.length===24&&g?.edges?.length===22&&edgeTypes.ORDERED_ARGUMENT_INCIDENCE===16&&edgeTypes.INTRA_BODY_DEPENDENCY_INCIDENCE===6&&Object.keys(edgeTypes).length===2,"historical graph lacks coidentity");
ck(d.graph?.input?.git_blob_sha===fix.ext[1]&&d.graph?.counts?.semantic_occurrence_nodes===446,"historical G2 pin and count");
ck(d.quot?.canonicalization?.alpha_renaming?.includes("Within one occurrence only")&&d.quot?.input?.g2_graph?.path==="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_3.json","historical G4 quotient scope");
ck(localSig(A)===localSig(B)&&globalSig(A)!==globalSig(B),"two-map split collision under local-only signature");
ck(localSig(A)===localSig(C)&&globalSig(A)===globalSig(C),"consistent alpha-renaming positive");
ck(localSig(A)!==localSig([["m","m"],["m","v"]]),"local repeated-arg control");
ck(d.def?.status==="HISTORICAL_G1_G2_EXPLICIT_SOURCE_REFERENT_COREFERENCE_NOT_CONSERVED_BLOCK_CURRENT_G0_RECONSTRUCTION"&&d.def?.repair_boundary?.current_stage==="G0_OPEN_W097_TYPED_SOURCE_CONSERVED_IN_SSC0_15","defect G0 status required");
ck(d.def?.observations?.W097_explicit_SI_or_binder_identity_edges===0&&d.def?.repair_boundary?.generic_221101==="UNAFFECTED_OWN_PROVISIONAL_RELATIONAL_SCOPE"&&d.def?.source?.vector_referent?.includes("different typed application"),"do not merge typed SI or generic module");
return err;
}
const tests=[
["G1 false pass",o=>o.gate.current_lawful_state.G1_authorized=true],
["G2 false pass",o=>o.gate.current_lawful_state.G2_authorized=true],
["G7 false pass",o=>o.gate.current_lawful_state.G7_authorized=true],
["G0 false freeze",o=>o.gate.current_lawful_state.G0_frozen=true],
["gate SI claim falsely closed",o=>o.gate.historical_G1_G2_source_co_reference_complete=true],
["gate source sha changed",o=>o.gate.current_source_census.git_blob_sha="BAD"],
["gate defect sha changed",o=>o.gate.cross_occurrence_identity_conservation.defect.git_blob_sha="BAD"],
["source total map lost",o=>o.src.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[2].application_total_on_declared_domain=false],
["source single-valued lost",o=>o.src.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[2].single_valued_map_declared=false],
["C2 mapped as CP1",o=>o.src.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[4].carrier="CP1_COMPLEX_LINES"],
["source vector square normalized",o=>o.src.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[4].result="IDENTITY_ON_C2"],
["negation dropped",o=>o.src.items.find(x=>x.id==="W-SSC-097").source_expression_census.statements[6].negative_scope="EXISTS"],
["historical O04 co-reference lost",o=>o.ext.items.find(x=>x.census_id==="W-SSC-097").occurrences.find(x=>x.occurrence_id==="W-SSC-097-O04").source_span="different map"],
["historical O03 co-reference lost",o=>o.ext.items.find(x=>x.census_id==="W-SSC-097").occurrences.find(x=>x.occurrence_id==="W-SSC-097-O03").source_span="different map"],
["historical G2 slot removed",o=>o.graph.items.find(x=>x.census_id==="W-SSC-097").graph.nodes.pop()],
["historical G2 forged identity edge",o=>o.graph.items.find(x=>x.census_id==="W-SSC-097").graph.edges.push({kind:"SI_SAME_REFERENT"})],
["historical G4 lied about SI coverage",o=>o.quot.canonicalization.alpha_renaming="Full SI across all occurrences"],
["historical G4 source hash silently replaced",o=>o.quot.input.g2_graph.path="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json"],
["source defect prematurely G1 closed",o=>o.def.repair_boundary.current_stage="G1_COMPLETE"],
["source defect merges C2/CP1",o=>o.def.source.vector_referent="same SI as projective map"],
["generic module wrongly promoted",o=>o.def.repair_boundary.generic_221101="GLOBALLY_QUALIFIED"]
];
const clone=o=>JSON.parse(JSON.stringify(o));
const ctx=Object.fromEntries(Object.entries(fix).map(([k,[p]])=>[k,read(p)]));
const errors=validate(ctx),rejected=[],escaped=[];
for(const [label,mut] of tests){const z=clone(ctx);mut(z);if(validate(z).length)rejected.push(label);else escaped.push(label)}
for(const [k,[p,s]] of Object.entries(fix))if(s&&sha(p)!==s)errors.push('HISTORICAL_SOURCE_SHA_MISMATCH '+k);
errors.push(...escaped.map(s=>'ESCAPED_MUTATION '+s));
const failed=read('experiments/062/W097_G0_SI_VERIFIER_STAGE_ESCAPE_DEFECT_0_1.json');
if(failed?.status!=='PREPUBLICATION_INTERNAL_VALIDATOR_MUTATION_ESCAPE_PRESERVED')errors.push('failed-predecessor absent');
console.log(JSON.stringify({schema:'isograph.exp062-w097-g0-cross-occurrence-si-guard.v0.2',pass:!errors.length,errors,local_skeleton_collision_demonstrated:true,global_alpha_distinction_preserved:true,typed_C2_CP1_map_identity_not_collapsed:true,mutations_total:tests.length,mutations_rejected:rejected.length,rejected,stage:'G0_UNFROZEN_G1_G7_NOT_AUTHORIZED'},null,2));
if(errors.length)process.exitCode=1;
