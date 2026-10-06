import fs from "node:fs";

const root="research/primitive-demand-qualification";
const census=JSON.parse(fs.readFileSync(root+"/SOURCE_DEMAND_CENSUS_0_1.json","utf8"));
const rules=JSON.parse(fs.readFileSync(root+"/DEMAND_EXTRACTION_RULES_0_1.json","utf8"));
const graph=JSON.parse(fs.readFileSync(root+"/PRIMITIVE_DEMAND_GRAPH_0_1.json","utf8"));
const wManifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_24.json","utf8"));
const lManifest=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_36.json","utf8"));
const wSsc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));
const lSsc=JSON.parse(fs.readFileSync("research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json","utf8"));

const errors=[];
const items=census.items||[];
const byTrack=t=>items.filter(x=>x.track===t);
if(census.status!=="FROZEN_CROSS_TRACK_UNRESOLVED_BODY_DEMAND_CORPUS")errors.push("census status");
if(items.length!==235||byTrack("W").length!==84||byTrack("L").length!==151)errors.push("census counts");

const wOpen=wManifest.items.filter(x=>x.closure_mode==="INCOMPLETE_UNEXPANDED").map(x=>x.census_id).sort();
const lOpen=lManifest.items.filter(x=>x.closure_mode==="INCOMPLETE_UNEXPANDED").map(x=>x.census_id).sort();
const cw=byTrack("W").map(x=>x.census_id).sort(),cl=byTrack("L").map(x=>x.census_id).sort();
if(JSON.stringify(wOpen)!==JSON.stringify(cw))errors.push("W unresolved corpus mismatch");
if(JSON.stringify(lOpen)!==JSON.stringify(cl))errors.push("L unresolved corpus mismatch");

const wSscMap=new Map(wSsc.items.map(x=>[x.id,x]));
const lSscMap=new Map(lSsc.items.map(x=>[x.id,x]));
for(const x of items){
  const src=x.track==="W"?wSscMap.get(x.census_id):lSscMap.get(x.census_id);
  const body=x.track==="W"?src?.obligation:src?.body;
  if(!src||x.body!==body)errors.push("frozen body mismatch "+x.census_id);
}

if(rules.status!=="FROZEN_PRE_EXTRACTION")errors.push("rules status");
if((rules.demand_rules||[]).length!==31)errors.push("rule count");
if((rules.candidate_basis_ids||[]).length!==12||new Set(rules.candidate_basis_ids||[]).size!==12)errors.push("basis count");
if((rules.candidate_basis_ids||[]).some(x=>/[Ww]oit|[Ll]isi|E8|twistor|triality|clifford|cartan/i.test(x)))errors.push("domain-labelled basis id");

if(graph.status!=="FROZEN_MECHANICALLY_EXTRACTED_DEMAND_GRAPH")errors.push("graph status");
if(graph.counts?.assertions!==235||graph.counts?.W!==84||graph.counts?.L!==151)errors.push("graph assertion counts");
if(graph.counts?.demand_types_with_support!==31||graph.counts?.structural_demand_types!==30)errors.push("graph demand counts");
if(graph.counts?.cross_track_structural_types!==27||graph.counts?.W_only_structural_types!==2||graph.counts?.L_only_structural_types!==1)errors.push("graph partition counts");
if(JSON.stringify(graph.core_only_open_assertions)!==JSON.stringify(["L-SSC-013"]))errors.push("core-only set");

const edges=graph.assertion_edges||[];
if(edges.length!==235)errors.push("edge cardinality");
const edgeIds=edges.map(x=>x.track+":"+x.census_id);
if(new Set(edgeIds).size!==235)errors.push("duplicate assertion edge");
for(const x of items)if(!edgeIds.includes(x.track+":"+x.census_id))errors.push("missing edge "+x.census_id);

const ruleMap=new Map((rules.demand_rules||[]).map(x=>[x.id,x]));
for(const e of edges)for(const d of e.demand_ids||[])if(!ruleMap.has(d))errors.push("unknown demand "+d);

const nodes=graph.demand_nodes||[];
for(const n of nodes){
  const w=n.assertion_ids?.W||[],l=n.assertion_ids?.L||[];
  if(n.counts?.W!==w.length||n.counts?.L!==l.length||n.counts?.total!==w.length+l.length)errors.push("node count "+n.demand_id);
  const rule=ruleMap.get(n.demand_id);
  if(!rule||n.fingerprint!==rule.fingerprint||JSON.stringify(n.requires)!==JSON.stringify(rule.requires))errors.push("node/rule mismatch "+n.demand_id);
}
const shared=new Set(graph.cross_track_shared_structural_demands||[]);
const wonly=new Set(graph.W_only_structural_demands||[]);
const lonly=new Set(graph.L_only_structural_demands||[]);
for(const n of nodes.filter(x=>x.new_qualified_semantics!==false)){
  const hasW=(n.counts?.W||0)>0,hasL=(n.counts?.L||0)>0;
  if(hasW&&hasL&&!shared.has(n.demand_id))errors.push("shared partition "+n.demand_id);
  if(hasW&&!hasL&&!wonly.has(n.demand_id))errors.push("W-only partition "+n.demand_id);
  if(!hasW&&hasL&&!lonly.has(n.demand_id))errors.push("L-only partition "+n.demand_id);
}

const result={
  pass:errors.length===0,
  errors,
  corpus:{total:items.length,W:byTrack("W").length,L:byTrack("L").length},
  demand_graph:graph.counts,
  candidate_basis_ids:rules.candidate_basis_ids,
  qualified:false
};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
