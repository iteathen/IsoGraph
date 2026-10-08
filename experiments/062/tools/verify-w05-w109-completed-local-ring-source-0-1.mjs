import fs from 'node:fs';
import crypto from 'node:crypto';
const sp="research/woit-lisi-isomorph/woit/",ep="experiments/062/";
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const orig="[W05-T10] Fontaine B_dR^+ completed local ring ~ power-series C[[lambda]] completed local ring at twistor infinity",revised="[W05-T10] Fontaine B_dR^+ = O_hat_(FF_p,infinity) ~ power-series C[[lambda]] = O_hat_(P1_tw,infinity) (two equalities inside separate table cells; cross-column comparison is analogy only)";
const LAT_FIN="B^{+}_{dR}=\\widehat{\\mathcal{O}}_{FF_{p},\\infty}",LAT_INF="\\mathbf{C}[[\\lambda]]=\\widehat{\\mathcal{O}}_{\\mathbf{P}^{1}_{tw},\\infty}";
const clone=x=>JSON.parse(JSON.stringify(x)),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const oldS=read(sp+'SOURCE_SEMANTIC_CENSUS_0_11.json');
const oldD=read(ep+'W_G0_W103_SOURCE_DEMAND_PROJECTION_0_1.json');
const now=read(sp+'SOURCE_SEMANTIC_CENSUS_0_12.json');
const dem=read(ep+'W_G0_W109_SOURCE_DEMAND_PROJECTION_0_2.json');
const pinned=[['source predecessor',sp+'SOURCE_SEMANTIC_CENSUS_0_11.json','05c0b665a7ec6cf97573856bbc1eb3e809a014f7'],['demand predecessor',ep+'W_G0_W103_SOURCE_DEMAND_PROJECTION_0_1.json','aa6cf9a640ce3899e56b26b6ef4e9b75639655c2'],['source successor',sp+'SOURCE_SEMANTIC_CENSUS_0_12.json','94ba7b0c94148651b765f0873bc70bf3d46d2404'],['demand successor',ep+'W_G0_W109_SOURCE_DEMAND_PROJECTION_0_2.json','a023e1b5397a025887d086879f7f4573f84c0dfa']];
function check(ss,dd){
const errors=[],a=(v,x)=>{if(!v)errors.push(x)};
a(ss?.schema==="woit.source-semantic-census.v0.12"&&ss?.status==="W05_G0_W109_TWO_TABLE_CELL_EQUALITIES_CANDIDATE_NOT_FROZEN","current SSC candidate not frozen");
a(ss?.predecessor?.git_blob_sha==="05c0b665a7ec6cf97573856bbc1eb3e809a014f7","prior source pin");
a(ss?.correction?.G1_authorized===false&&eq(ss?.correction?.changed_W_census_ids,["W-SSC-109"]),"no G1/other change authorization");
a(ss?.items?.length===151&&ss?.census_item_count===151,"151 source items");
a(eq(ss?.items?.map(x=>x.id),oldS.items.map(x=>x.id)),"source IDs/order conserved");
for(let i=0;i<oldS.items.length;i++){if(oldS.items[i].id!=="W-SSC-109")a(eq(oldS.items[i],ss.items?.[i]),"other source item changed "+oldS.items[i].id)}
const w=ss?.items?.find(x=>x.id==="W-SSC-109"),p=oldS.items.find(x=>x.id==="W-SSC-109");
a(w?.state==="OPEN_ANALOGY_GUARD"&&w?.source==="W05 §6.3","W109 source and open");
a(w?.obligation===p.obligation.replace(orig,revised),"W109 exact textual correction");
a(w?.source_comparison_rows?.length===11,"11 table rows");
for(let i=0;i<11;i++){const row=w?.source_comparison_rows?.[i];a(row?.ordinal===i+1&&row?.row_id==="W05-T"+String(i+1).padStart(2,"0"),"table order "+i);a(row?.source_modality==="EXPLICIT_AUTHOR_COMPARISON_TABLE_ANALOGY_ONLY"&&row?.semantic_isomorphism_asserted===false,"analogy claim false "+i);if(i!==9)a(eq(row,p.source_comparison_rows[i]),"unrelated analogy row "+i)}
const row=w?.source_comparison_rows?.[9];
a(row?.finite_prime==="Fontaine ring B_dR^+ = O_hat_(FF_p,infinity)"&&row?.infinite_prime==="Power-series ring C[[lambda]] = O_hat_(P1_tw,infinity)","full source-side row10 operands");
a(eq(row?.internal_equality_ids,["W109-T10-FINITE","W109-T10-INFINITE"]),"two row eq references");
const x=w?.source_expression_census,z=x?.statements;
a(x?.revision==="arXiv:2202.02657v2"&&x?.cross_cell_modality==="ANALOGY_ONLY_NOT_EQUALITY"&&x?.author_uncertainty==="EXPLICIT_WARNING"&&x?.source_pdf_byte_identity==="UNVERIFIED","source revision/uncertainty/analogy");
a(z?.length===2,"both source cell equality records");
a(z?.[0]?.id==="W109-T10-FINITE"&&z?.[0]?.row_id==="W05-T10"&&z?.[0]?.side==="finite_p"&&z?.[0]?.modality==="SOURCE_TABLE_CELL_EQUALITY"&&z?.[0]?.lhs==="B^+_{dR}"&&z?.[0]?.op==="EQUAL"&&eq(z?.[0]?.rhs,{symbol:"O_hat",carrier:"FF_p",index:"infinity"})&&z?.[0]?.source_latex===LAT_FIN,"finite source exact equality operands/binders");
a(z?.[1]?.id==="W109-T10-INFINITE"&&z?.[1]?.row_id==="W05-T10"&&z?.[1]?.side==="infinite_p"&&z?.[1]?.modality==="SOURCE_TABLE_CELL_EQUALITY"&&z?.[1]?.lhs==="C[[lambda]]"&&z?.[1]?.op==="EQUAL"&&eq(z?.[1]?.rhs,{symbol:"O_hat",carrier:"P1_tw",index:"infinity"})&&z?.[1]?.source_latex===LAT_INF,"infinite source exact equality operands/binders");
a(dd?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.2"&&dd?.status==="W_ONLY_W109_DEMAND_CORRECTION_CANDIDATE_NOT_FROZEN","current demand status");
a(dd?.current_source?.git_blob_sha==="94ba7b0c94148651b765f0873bc70bf3d46d2404"&&dd?.predecessor_W_demand?.git_blob_sha==="aa6cf9a640ce3899e56b26b6ef4e9b75639655c2","demand source/predecessor pins");
a(dd?.items?.length===86&&dd?.counts?.W_unresolved===86&&dd?.replay_policy?.G1_authorized===false&&dd?.replay_policy?.L_members==="NOT_ACCESSED_OR_REWRITTEN","86 W demands and G1/L guard");
a(eq(dd?.items?.map(x=>x.census_id),oldD.items.map(x=>x.census_id)),"W demand IDs/order");
const mp=new Map(ss?.items?.map(x=>[x.id,x]));
for(let i=0;i<oldD.items.length;i++){const o=oldD.items[i],d=dd?.items?.[i];if(!d){errors.push("missing demand "+i);continue}a(d.track==="W"&&d.body===mp.get(d.census_id)?.obligation,"source/demand body mismatch "+i);if(o.census_id!=="W-SSC-109")a(eq(o,d),"unrelated W demand changed "+o.census_id)}
const d109=dd?.items?.find(x=>x.census_id==="W-SSC-109"),d110=dd?.items?.find(x=>x.census_id==="W-SSC-110");
a(d109?.state==="OPEN_ANALOGY_GUARD_UNEXPANDED"&&d109?.source_modality==="ANALOGY_ONLY_NOT_SEMANTIC_EQUIVALENCE","W109 remains open/analogy");
a(eq(d109?.source_comparison_rows,w?.source_comparison_rows)&&eq(d109?.source_formula_incidences,z),"exact demand row/equation projection");
a(d109?.source_semantic_scope==="two within-cell equalities; 11 cross-column analogies remain non-equivalences","demand source scope guard");
a(d110?.state?.includes("OPEN"),"W110 false closure");
a(ss?.items?.find(x=>x.id==="W-SSC-103")?.source_expression_census?.statements?.[0]?.rhs?.binder?.relation==="STRICT_GT","W103 strict Hodge source");
a(ss?.items?.find(x=>x.id==="W-SSC-103")?.source_expression_census?.statements?.[1]?.rhs?.right?.operator==="CONJUGATE","W103 conjugation");
return errors;
}
const tests=[
["finite equality omitted",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements.shift()],
["infinite equality omitted",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements.pop()],
["finite carrier mutated",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[0].rhs.carrier="P1_tw"],
["infinite carrier mutated",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[1].rhs.carrier="FF_p"],
["finite infinity changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[0].rhs.index="zero"],
["infinite infinity changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[1].rhs.index="zero"],
["finite operator changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[0].op="ANALOGY"],
["infinite operator changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[1].op="ANALOGY"],
["finite latex changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[0].source_latex="wrong"],
["infinite latex changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[1].source_latex="wrong"],
["finite-infinite role swapped",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.statements[1].side="finite_p"],
["analogy made equivalence",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.cross_cell_modality="EQUIVALENT"],
["table isomorphism claimed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_comparison_rows[9].semantic_isomorphism_asserted=true],
["finite table text truncated",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_comparison_rows[9].finite_prime="Fontaine ring"],
["infinite table text truncated",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_comparison_rows[9].infinite_prime="power series"],
["unrelated table item changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_comparison_rows[0].finite_prime="bad"],
["removed comparison",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_comparison_rows.pop()],
["lost warning",(s,d)=>s.items.find(x=>x.id==="W-SSC-109").source_expression_census.author_uncertainty="NONE"],
["W103 source changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-103").source_expression_census.statements[0].rhs.binder.relation="GTE"],
["unrelated source changed",(s,d)=>s.items.find(x=>x.id==="W-SSC-108").obligation+="bad"],
["unrelated W demand changed",(s,d)=>d.items.find(x=>x.census_id==="W-SSC-108").body+="bad"],
["missing demand member",(s,d)=>d.items.pop()],
["missing demand equality",(s,d)=>d.items.find(x=>x.census_id==="W-SSC-109").source_formula_incidences.pop()],
["false W109 closure",(s,d)=>d.items.find(x=>x.census_id==="W-SSC-109").state="CLOSED_PRIMITIVE"],
["false W110 closure",(s,d)=>d.items.find(x=>x.census_id==="W-SSC-110").state="CLOSED_PRIMITIVE"],
["joint body edit",(s,d)=>{s.items.find(x=>x.id==="W-SSC-109").obligation+="bad";d.items.find(x=>x.census_id==="W-SSC-109").body+="bad"}]
];
const normalErrors=check(now,dem),rejected=[],escaped=[];
for(const [name,f] of tests){const s=clone(now),d=clone(dem);f(s,d);if(check(s,d).length)rejected.push(name);else escaped.push(name)}
const pinFailures=pinned.filter(x=>sha(x[1])!==x[2]).map(x=>'BLOB_SHA_PIN '+x[0]);
const errors=[...normalErrors,...escaped.map(x=>'ESCAPED_MUTATION '+x),...pinFailures];
console.log(JSON.stringify({schema:'isograph.exp062-w109-source-verifier.v0.1',pass:errors.length===0,errors,source_items:151,W_unresolved:86,unchanged_source_items:150,unchanged_other_W_demands:85,rejected_mutations:rejected.length,total_mutations:tests.length,rejected,stage:'G0_ONLY_UNFROZEN',external_review:'OWNER_BYPASSED_NOT_PASSED',arxiv_author_PDF_byte_identity:'NOT_TESTED'},null,2));
if(errors.length)process.exitCode=1;
