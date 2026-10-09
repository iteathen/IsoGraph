import fs from "node:fs";
import crypto from "node:crypto";

const L="research/woit-lisi-isomorph/lisi/",E="experiments/062/";
const paths={
 old:L+"SOURCE_SEMANTIC_CENSUS_0_21.json",
 now:L+"SOURCE_SEMANTIC_CENSUS_0_22.json",
 packet:L+"LISI_L01_ELECTROWEAK_WEW_CARTAN_TABLE4_G0_0_1.json",
 sourceVerifier:E+"tools/verify-l-g0-l01-wew-cartan-table4-source-0-1.mjs",
 gate:E+"L_CURRENT_STAGE_GATE_0_21.json"
};
const read=p=>JSON.parse(fs.readFileSync(p,"utf8")),j=JSON.stringify,clone=o=>JSON.parse(j(o));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash("sha1").update(Buffer.concat([Buffer.from("blob "+b.length+"\0"),b])).digest("hex")};
const old=read(paths.old),now=read(paths.now),packet=read(paths.packet),gate=read(paths.gate);
const gap="The source electroweak wew connection, V/U maps, Cartan weights, Table 4 and later graviweak Cl(7,1) are separately UNEXTRACTED.";
const successor="The source electroweak wew connection, typed V/U maps, Cartan matrix, and all 16 ordered Table 4 rows are now transcribed and finite-tested at source G0 only; the graviweak Cl(7,1) extension, later weight/root operators and global field/dynamics primitive closure remain UNEXTRACTED.";
function check(c=now){
 const errors=[],ok=(condition,message)=>{if(!condition)errors.push(message)};
 const prior=old.items.find(x=>x.id==="L-SSC-031");
 const item=c.items?.find(x=>x.id==="L-SSC-031"),a=item?.source_expression_census?.L01_wew_Cartan_Table4_G0||{},r=c.revision||{},guards=c.guards||{};
 ok(c.schema==="woit-lisi.track-l.source-semantic-census.v0.22"&&c.track==="L"&&c.status?.includes("G0")&&c.status?.includes("UNFROZEN"),"SSC0.22 L-only G0");
 ok(c.item_count===191&&c.items?.length===191&&old.items.length===191&&j(c.items.map(x=>x.id))===j(old.items.map(x=>x.id)),"all 191 SI identifiers and source order");
 ok(j(c.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(["L-SSC-031"]),"exactly one L031 source item altered");
 ok(old.items.filter(x=>x.id!=="L-SSC-031").every(x=>j(x)===j(c.items.find(y=>y.id===x.id))),"all 190 full unrelated source records unchanged");
 ok(r.id==="L_SSC_0_22_L031_WEW_CARTAN_TABLE4_SOURCE_G0"&&r.predecessor_path===paths.old&&r.predecessor_git_blob_sha===sha(paths.old)&&r.unchanged_source_items===190&&j(r.changed_source_items)===j(["L-SSC-031"]),"exact prior SSC blob and conservation");
 ok(r.source_packet?.path===paths.packet&&r.source_packet?.git_blob_sha===sha(paths.packet),"frozen L01 wew source packet SHA pin");
 ok(r.source_adversarial_verifier?.path===paths.sourceVerifier&&r.source_adversarial_verifier?.git_blob_sha===sha(paths.sourceVerifier),"frozen source verifier SHA pin");
 ok(r.predecessor_stage_gate?.path===paths.gate&&r.predecessor_stage_gate?.git_blob_sha===sha(paths.gate),"predecessor G0-only stage SHA pin");
 ok(r.source_CI?.run_id===37878875571&&r.source_CI?.conclusion==="success"&&r.source_CI?.source_complex_matrix_cells===11664&&r.source_CI?.table4_rows===16&&r.source_CI?.adversarial_rejected===32&&r.source_CI?.external_cold_review_passed===false,"strict source CI evidence limited");
 ok(r.prior_item_length===prior.body.length&&r.source_census_frozen===false&&r.G1_authorized===false&&r.global_module_promotion===false&&r.L01_L06_source_complete===false,"source/G1/module not falsely qualified");
 ok(Boolean(item),"L031 must remain present");if(!item)return errors;
 ok(prior.body.includes(gap)&&!item.body.includes(gap)&&item.body.includes(successor),"obsolete source gap replaced without claiming full closure");
 const expectedPrefix=prior.body.replace(gap,successor);
 ok(item.body.startsWith(expectedPrefix+" "),"conserve prior source body exactly except superseded verified gap clause");
 ok(a.source_packet?.path===paths.packet&&a.source_packet?.git_blob_sha===sha(paths.packet)&&a.source_verifier?.git_blob_sha===sha(paths.sourceVerifier),"item-L031 exact packet/verifier dependency");
 ok(j(a.gauge_and_chirality_roles)===j(packet.fermion_and_gauge_roles)&&j(a.wew_source_block_and_index_roles)===j(packet.wew)&&j(a.cartan_weight_and_eigenbracket)===j(packet.cartan),"full relevant source semantics and two chiral roles preserved");
 ok(j(a.printed_all_16_weight_rows)===j(packet.table4)&&j(a.limited_finite_domain)===j(packet.expected_limited_finite_reconstruction),"all 16 weight rows, finite coverage and limitations copied exactly");
 ok(a.CI?.run_id===37878875571&&a.CI?.source_matrix_cells===11664&&a.CI?.cartan_cases===9&&a.CI?.Table4_rows===16&&a.CI?.Table4_exact_rational_identities===32&&a.CI?.adversarial_rejected===32&&a.CI?.external_cold_review_passed===false,"precise CI witness and negative external result");
 for(const [name,value]of Object.entries({entire_source_complete:false,all_weight_root_gamma_representatives_tested:false,physical_claims_qualified:false,full_cl4_to_Cl7_1_qualified:false,G1_authorized:false}))ok(a[name]===value,"no item-level overclaim "+name);
 ok(guards.L031_wew_Cartan_Table4_G0_source_limited_transcribed===true&&guards.L031_wew_su2_chiral_source_matrix_finite_verified===true&&guards.L031_Table4_16_rows_extracted_source_G0===true,"scoped source progress only");
 for(const k of ["L031_Cl7_1_graviweak_complete","L031_full_weight_root_and_physical_theorem_qualified","source_census_freeze_complete","L_G1_source_reextraction_complete","recursive_IA_authorized"])ok(guards[k]===false,"source closure still open "+k);
 ok(item.body.includes(packet.wew.first_2x2_block)&&item.body.includes(packet.wew.second_2x2_block)&&item.body.includes(packet.cartan.source_expr)&&item.body.includes(packet.cartan.source_diag),"source W/B1 and Cartan signs independently visible in SSC");
 ok(item.body.includes(packet.cartan.phiZero_weight_example.source_vector)&&item.body.includes(packet.cartan.phiZero_weight_example.source_eigenbracket),"Higgs Cartan weight representative");
 for(const row of packet.table4.source_rows_ordered)ok(item.body.includes(row.label+"="+row.units.join(",")+"/6"),"full source row "+row.label+" must survive body");
 for(const phrase of ["phiOne denotes the distinct complex label","B1plus/B1minus are speculative","32 exact sixth-unit row checks","graviweak Cl(7,1)","real input phi^1","11,664 chiral matrix entries"])ok(item.body.includes(phrase),"source/negative obligation "+phrase);
 ok(j(c.items.find(x=>x.id==="L-SSC-030"))===j(old.items.find(x=>x.id==="L-SSC-030")),"older group-theoretic negative result conserved");
 ok(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.G0_source_census_frozen===false&&packet.G1_authorized===false,"parent and source pipeline G0 only");
 ok(!j(item).includes("W-SSC-")&&guards.cross_author_semantics_available===false,"no W semantic infiltration");
 return errors;
}
const baseline=check(),errors=[...baseline];
const mutants=[
 ["erase L031",c=>{c.items=c.items.filter(x=>x.id!=="L-SSC-031")}],
 ["change L031 SI",c=>{c.items.find(x=>x.id==="L-SSC-031").id="L-SSC-030"}],
 ["change L030 Spin negative result",c=>{c.items.find(x=>x.id==="L-SSC-030").body="source repaired"}],
 ["change L032 graviweak future source",c=>{c.items.find(x=>x.id==="L-SSC-032").body="completed"}],
 ["erase source old body",c=>{c.items.find(x=>x.id==="L-SSC-031").body="wew source only"}],
 ["corrupt W/B1 source block",c=>{c.items.find(x=>x.id==="L-SSC-031").source_expression_census.L01_wew_Cartan_Table4_G0.wew_source_block_and_index_roles.equal_first="wrong"}],
 ["corrupt Cartan sign",c=>{c.items.find(x=>x.id==="L-SSC-031").source_expression_census.L01_wew_Cartan_Table4_G0.cartan_weight_and_eigenbracket.source_expr="wrong"}],
 ["corrupt Table4 first entry",c=>{c.items.find(x=>x.id==="L-SSC-031").source_expression_census.L01_wew_Cartan_Table4_G0.printed_all_16_weight_rows.source_rows_ordered[0].units[0]=5}],
 ["erase source Table4 last row",c=>{c.items.find(x=>x.id==="L-SSC-031").source_expression_census.L01_wew_Cartan_Table4_G0.printed_all_16_weight_rows.source_rows_ordered.pop()}],
 ["change phiOne weight row in body",c=>{const i=c.items.find(x=>x.id==="L-SSC-031");i.body=i.body.replace("phiOne=3,-3,0,-3,0/6","phiOne=3,3,0,-3,0/6")}],
 ["promote G1",c=>{c.revision.G1_authorized=true}],
 ["mark all L01 source complete",c=>{c.revision.L01_L06_source_complete=true}],
 ["promote IA",c=>{c.guards.recursive_IA_authorized=true}],
 ["promote Cl7 theorem",c=>{c.guards.L031_Cl7_1_graviweak_complete=true}],
 ["promote physics",c=>{c.guards.L031_full_weight_root_and_physical_theorem_qualified=true}],
 ["erase source weight label distinction",c=>{const i=c.items.find(x=>x.id==="L-SSC-031");i.body=i.body.replace("phiOne denotes the distinct complex label","phiOne equals real phi^1")}],
 ["change source publisher/version",c=>{c.items.find(x=>x.id==="L-SSC-031").source_expression_census.L01_wew_Cartan_Table4_G0.frozen_revision="different paper"}],
 ["erase all weight verification",c=>{c.items.find(x=>x.id==="L-SSC-031").source_expression_census.L01_wew_Cartan_Table4_G0.CI.Table4_exact_rational_identities=0}],
 ["lose source packet blob",c=>{c.revision.source_packet.git_blob_sha="stale"}],
 ["lose source verifier blob",c=>{c.revision.source_adversarial_verifier.git_blob_sha="stale"}],
 ["lose parent SSC blob",c=>{c.revision.predecessor_git_blob_sha="stale"}],
 ["fabricate external review",c=>{c.revision.source_CI.external_cold_review_passed=true}],
 ["claim source frozen",c=>{c.guards.source_census_freeze_complete=true}],
 ["smuggle Woit",c=>{c.items.find(x=>x.id==="L-SSC-031").body+=" W-SSC-109"}],
 ["change L04 unrelated body",c=>{c.items.find(x=>x.id==="L-SSC-100").body="mutated"}]
];
let rejected=0;
if(!baseline.length)for(const [name,edit]of mutants){
 const item=clone(now),before=j(item);edit(item);
 if(j(item)===before)errors.push("NO-OP mutation "+name);
 else if(check(item).length===0)errors.push("ESCAPED hostile "+name);
 else rejected++;
}
console.log(JSON.stringify({schema:"isograph.exp062-l-ssc022-l031-wew-cartan-table4.v0.1",
pass:errors.length===0,errors,source_items:191,changed:["L-SSC-031"],unchanged:190,
Table4_rows:16,cartan_cases:9,source_wew_finite_cases:729,
adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?"BASELINE_FAILED":"TESTED",
G1_authorized:false,external_cold_review_passed:false},null,2));if(errors.length)process.exitCode=1;
