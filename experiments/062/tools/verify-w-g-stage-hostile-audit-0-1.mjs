import fs from 'node:fs';
import crypto from 'node:crypto';
const pins={"gate":{"path":"experiments/062/W_CURRENT_STAGE_GATE_0_39.json","git_blob_sha":"3e32bf53f2b36e0312a0ffeb9ca291b26d57a898"},"source":{"path":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_14.json","git_blob_sha":"2912ed46355a73f3368f428fc2478cc8e5ce4d4e"},"demand":{"path":"experiments/062/W_G0_W02_LATE_SOURCE_DEMAND_PROJECTION_0_4.json","git_blob_sha":"000f2dd31e66823a1974d3076c9c01bafdb23f9a"},"g1":{"path":"experiments/062/W_EXTRACTION_RECONCILED_0_23.json","git_blob_sha":"ccf4713009d624c4f9f84010f48f899e3aae2e22"},"g2":{"path":"experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json","git_blob_sha":"4a6ef4b2e4987c6875e6fc4c0205a04f84c37b57"},"g3":{"path":"experiments/062/W_G3_CORE_DEFINABILITY_0_7.json","git_blob_sha":"62e1236d7aa4c7b2814606b1640e35e280b73919"},"g4":{"path":"experiments/062/W_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_4.json","git_blob_sha":"4895485b27489fc8028f5b7804ef6d9a6021ffaa"},"g5":{"path":"experiments/062/W_G5_CANDIDATE_BASIS_SYNTHESIS_0_4.json","git_blob_sha":"e0c3afe21f88e36c3b7a6843a08cb64897df1a00"},"g7":{"path":"experiments/062/W_G7_RELATIONAL_TWO_STEP_RETURN_INSTANTIATION_0_1.json","git_blob_sha":"4fb7708649aa37807ab87baea9a31c8358ec9b42"},"qual":{"path":"experiments/065/OWNER_BYPASS_PROVISIONAL_QUALIFICATION_0_1.json","git_blob_sha":"08b76b3c01ff82b5ee64de8e00fa8e692881f77d"},"ledger":{"path":"research/woit-lisi-isomorph/woit/CORE021_CLOSURE_LEDGER_0_19.json","git_blob_sha":"cb0563a66fc6af881efcb66b04faa78631405ea4"},"bypass":{"path":"experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json","git_blob_sha":"b123824d8adb26a80f3fbb675464e59fc2aff2b2"}};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const ctx=Object.fromEntries(Object.entries(pins).map(([k,v])=>[k,read(v.path)]));
const clone=x=>JSON.parse(JSON.stringify(x)),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const occ=x=>x?.items?.flatMap(z=>z.occurrences||[])||[];
const get=(x,id,key='id')=>x?.items?.find(z=>z[key]===id);
const relOk=(P,R)=>{const S=new Set(P);if(R.some(([a,b])=>!S.has(a)||!S.has(b)))return false;for(const [a,b] of R)if(a===b)return false;for(const [a,b] of R)for(const [b2,c] of R)if(b===b2&&c!==a)return false;return true;};
const neededMap=(P,R)=>relOk(P,R)&&P.every(a=>R.filter(([x])=>x===a).length===1);
const models=[{"name":"empty relation on nonempty P","P":["a","b"],"R":[],"generic":true,"mapRequired":false},{"name":"one-way partial relation","P":["a","b"],"R":[["a","b"]],"generic":true,"mapRequired":false},{"name":"multivalued partial relation","P":["a","b","c"],"R":[["a","b"],["a","c"]],"generic":true,"mapRequired":false},{"name":"total two-point involution","P":["a","b"],"R":[["a","b"],["b","a"]],"generic":true,"mapRequired":true},{"name":"self-loop forbidden","P":["a","b"],"R":[["a","a"]],"generic":false,"mapRequired":false},{"name":"nonreturning two-step forbidden","P":["a","b","c"],"R":[["a","b"],["b","c"]],"generic":false,"mapRequired":false}];
const countModels=n=>{const points=Array.from({length:n},(_,i)=>"v"+i),pairs=points.flatMap(a=>points.map(b=>[a,b]));const count={generic:0,meetsNecessaryMap:0,genericButNotMap:0};for(let mask=0;mask<(1<<pairs.length);mask++){const R=pairs.filter((_,i)=>(mask&(1<<i))!==0);if(relOk(points,R)){count.generic++;if(neededMap(points,R))count.meetsNecessaryMap++;else count.genericButNotMap++}}return count};
function check(context){
const errors=[],assert=(x,m)=>{if(!x)errors.push(m)};
const {gate,source,demand,g1,g2,g3,g4,g5,g7,qual,ledger,bypass}=context;
assert(gate?.schema==="isograph.exp062-w-current-stage-gate.v0.39"&&gate?.current_lawful_state?.G0_open===true&&!gate?.current_lawful_state?.G0_frozen&&gate?.current_lawful_state?.G1_authorized===false&&gate?.current_lawful_state?.G7_authorized===false,"G0 only/stage ordering");
assert(gate?.current_source_census?.git_blob_sha===pins.source.git_blob_sha&&!gate?.current_source_census?.frozen,"current W source hash and unfrozen");
assert(source?.items?.length===151&&source?.status?.includes("NOT_FROZEN"),"151 source items not frozen");
const w=get(source,"W-SSC-097"),W=w?.obligation||"";
assert(w?.source==="W05 §2"&&W.includes("antiholomorphic map rho: CP1 -> CP1")&&W.includes("rho_tw")&&W.includes("rho_tw squared equals 1")&&W.includes("no projective fixed points"),"W097 source map/nonfixed/polarity");
assert(W.includes("on C2 coordinates rho_tw squared equals -1")&&W.includes("[-bar(z2),bar(z1)]"),"W097 source vector/projective distinction");
const ids=new Set(demand?.items?.map(z=>z.census_id));assert(demand?.items?.length===86&&source?.items?.length-ids.size===65&&!ids.has("W-SSC-131"),"86 historical demands not 151, W131 excluded");
assert(ledger?.dispositions?.find(x=>x.census_id==="W-SSC-131")?.closure_mode==="CLOSED_SCHEMA","historical W131 closed schema evidence");
assert(get(source,"W-SSC-131")?.source_expression_census?.statements?.[0]?.modality==="SOURCE_DISPLAYED_NONHOLOMORPHIC_TENSOR","new W131 source expression/old closure now invalid");
const ex=g1?.items?.find(x=>x.census_id==="W-SSC-097")?.occurrences||[],exids=new Set(ex.map(x=>x.occurrence_id));
assert(g1?.items?.length===84&&occ(g1).length===446&&exids.has("W-SSC-097-O08")&&exids.has("W-SSC-097-O04")&&exids.has("W-SSC-097-O06"),"G1 446 and W097 O08 O04 O06");
assert(!ex.some(z=>/antiholomorphic map|CP1\s*->\s*CP1|map declaration|totality|single.valued/i.test(z.source_span||"")),"G1 extraction does not separately conserve source map signature");
assert(g2?.input?.git_blob_sha===pins.g1.git_blob_sha&&g2?.counts?.semantic_occurrence_nodes===446&&g2?.items?.length===84,"G2 latest 446 pinned to latest G1");
assert(g3?.counts?.occurrences===445&&g3?.counts?.UNEXPANDED_DEMAND===432,"historical G3 445");
assert(g3?.input?.g2_graph?.path==="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_3.json"&&g3?.input?.g2_graph?.git_blob_sha!==(pins.g2.git_blob_sha),"G3 pinned to G2.0.3 instead of 0.4");
assert(g4?.input?.g3_core_definability?.git_blob_sha===pins.g3.git_blob_sha&&g4?.input?.g2_graph?.path==="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_3.json","G4 consumes stale G3/G2");
const members=g4?.classes?.flatMap(x=>x.member_occurrence_ids)||[];
assert(g4?.counts?.unresolved_input_occurrences===430&&g4?.classes?.length===370&&!members.includes("W-SSC-097-O08"),"G4 370 classes omit new O08");
assert(g4?.effective_closure_overlay?.CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY===2,"G4 two provisional G7 closures");
assert(g5?.input?.g4_quotient?.git_blob_sha===pins.g4.git_blob_sha&&g5?.counts?.quotient_classes===370&&g5?.counts?.proposed_reusable_candidates===0,"G5 historical quotient/boundary only");
assert(g7?.source_input?.extraction?.path==="experiments/062/W_EXTRACTION_RECONCILED_0_22.json"&&g7?.source_input?.extraction?.git_blob_sha!==pins.g1.git_blob_sha,"G7 older W097 extraction input");
assert(g7?.source_instance_binding?.R?.totality_assumed===false&&g7?.source_instance_binding?.R?.single_valuedness_assumed===false&&g7?.source_instance_binding?.R?.existence_beyond_source_sequence_assumed===false,"G7 deliberately partial/unfunctional");
assert(eq(g7?.ruling?.closed_occurrences,["W-SSC-097-O06","W-SSC-097-O04"])&&g7?.ruling?.closure_disposition==="CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY","G7 source instance false closure claims");
assert(qual?.global_semantic_authority===false&&qual?.campaign_semantic_authority===true&&qual?.campaign_disposition?.L_may_consume_candidate===false,"generic G6 provisional remains limited");
assert(qual?.internal_scope_review?.checks?.some(x=>/empty relation/i.test(x))&&qual?.nonclaims?.some(x=>/does not establish that W097 supplies/i.test(x)),"generic G6 explicitly permits empty partial models/conditional W instance");
assert(bypass?.scope?.waived_only?.every(x=>/external|third.party/i.test(x))&&bypass?.scope?.still_required?.some(x=>/deterministic/i.test(x)),"owner bypass cannot waive internal G stages");
for(const m of models){assert(relOk(m.P,m.R)===m.generic,"model generic "+m.name);assert(neededMap(m.P,m.R)===m.mapRequired,"model map "+m.name)}
const n2=countModels(2),n3=countModels(3);
assert(eq(n2,{generic:4,meetsNecessaryMap:1,genericButNotMap:3})&&eq(n3,{generic:16,meetsNecessaryMap:0,genericButNotMap:16}),"exhaustive finite 2/3 countermodels");
return errors;
}
const tests=[
["promote G1 while G0 open",c=>c.gate.current_lawful_state.G1_authorized=true],
["freeze incomplete G0",c=>c.gate.current_lawful_state.G0_frozen=true],
["current SSC pin drift",c=>c.gate.current_source_census.git_blob_sha="00000000"],
["remove W097 source map",c=>{const w=get(c.source,"W-SSC-097");w.obligation=w.obligation.replace("antiholomorphic map rho: CP1 -> CP1","untyped relation rho")}],
["turn W097 fixed point into positive",c=>get(c.source,"W-SSC-097").obligation=get(c.source,"W-SSC-097").obligation.replace("no projective fixed points","has projective fixed points")],
["normalize vector/projective sign",c=>get(c.source,"W-SSC-097").obligation=get(c.source,"W-SSC-097").obligation.replace("on C2 coordinates rho_tw squared equals -1","on C2 coordinates rho_tw squared equals 1")],
["reclose W131 by history",c=>c.ledger.dispositions.find(x=>x.census_id==="W-SSC-131").closure_mode="INCOMPLETE_UNEXPANDED"],
["remove missing W131 hazard",c=>c.demand.items.push({census_id:"W-SSC-131"})],
["delete G1 new real predicate occurrence",c=>c.g1.items.find(x=>x.census_id==="W-SSC-097").occurrences=c.g1.items.find(x=>x.census_id==="W-SSC-097").occurrences.filter(x=>x.occurrence_id!=="W-SSC-097-O08")],
["make G2 445 without replay",c=>c.g2.counts.semantic_occurrence_nodes=445],
["fake G3 446",c=>c.g3.counts.occurrences=446],
["claim G3 consumed corrected G2",c=>c.g3.input.g2_graph.path="experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_4.json"],
["make G4 quotient include new O08 without source replay",c=>c.g4.classes[0].member_occurrence_ids.push("W-SSC-097-O08")],
["drop G7 overlay class",c=>c.g4.effective_closure_overlay.CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY=0],
["pretend G5 found reusable module",c=>c.g5.counts.proposed_reusable_candidates=1],
["pretend G7 totality was conserved",c=>c.g7.source_instance_binding.R.totality_assumed=true],
["pretend G7 full source already reconstructed",c=>c.g7.ruling.closed_occurrences=[]],
["mislabel generic G6 globally qualified",c=>c.qual.global_semantic_authority=true],
["remove generic G6 uncertainty",c=>c.qual.nonclaims=[]],
["expand owner bypass",c=>c.bypass.scope.waived_only.push("all internal CI replay")]
];
const audit=read('experiments/062/W_G_STAGE_HOSTILE_AUDIT_0_1.json');
const errors=check(ctx),rejected=[],escaped=[];
for(const [name,fn] of tests){const a=clone(ctx);fn(a);if(check(a).length)rejected.push(name);else escaped.push(name)}
const pinErrors=Object.entries(pins).filter(([k,v])=>sha(v.path)!==v.git_blob_sha).map(([k,v])=>'SOURCE_BLOB_MISMATCH '+k);
const ownAudit=sha('experiments/062/W_G_STAGE_HOSTILE_AUDIT_0_1.json');
if(ownAudit!=="65fa7e51f504f741aa28a512f671386d5f8ba4c9")errors.push('audit blob not same frozen target');
errors.push(...pinErrors,...escaped.map(x=>'ESCAPED_MUTATION '+x));
if(audit.status!=='CONFIRMED_HISTORICAL_G7_W097_UNSOUND_SOURCE_CLOSURE_AND_G2_G3_VERSION_SKEW')errors.push('audit disposition mutated');
if(audit.findings?.length!==3)errors.push('audit findings scope changed');
if(audit.adversarial_replay?.mutations_rejected!==rejected.length)errors.push('audit mutation counts mismatched');
console.log(JSON.stringify({schema:'isograph.exp062-w-g-stage-hostile-audit-verifier.v0.1',pass:errors.length===0,errors,stage:'G0_OPEN_NOT_FROZEN',source_items:151,W_projection_members:86,old_G1_G2_occurrences:446,old_G3_occurrences:445,historical_G7_claimed_closed:['W-SSC-097-O06','W-SSC-097-O04'],generic_221101_retains_original_scope:true,countermodels:models.map(m=>({name:m.name,accepts_generic:m.generic,meets_source_map_necessary_fragment:m.mapRequired})),enumeration_2:countModels(2),enumeration_3:countModels(3),mutation_total:tests.length,mutations_rejected:rejected.length,rejected,external_review:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(errors.length)process.exitCode=1;
