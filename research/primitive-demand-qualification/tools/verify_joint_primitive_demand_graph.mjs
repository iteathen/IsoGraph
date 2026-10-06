import fs from "node:fs";

const root="research/primitive-demand-qualification";
const graph=JSON.parse(fs.readFileSync(root+"/PRIMITIVE_DEMAND_GRAPH_0_1.json","utf8"));
const census=JSON.parse(fs.readFileSync(root+"/SOURCE_DEMAND_CENSUS_0_1.json","utf8"));
const rules=JSON.parse(fs.readFileSync(root+"/DEMAND_EXTRACTION_RULES_0_1.json","utf8"));
const errors=[];

const byId=new Map(rules.demand_rules.map(r=>[r.id,r]));
const edgeById=new Map(graph.assertion_edges.map(e=>[e.census_id,e]));
if(graph.counts.assertions!==235||graph.counts.W!==84||graph.counts.L!==151)errors.push("corpus counts");
if(graph.counts.structural_demand_types!==30)errors.push("structural demand count");
if(graph.counts.cross_track_structural_types!==27)errors.push("cross-track demand count");
if(JSON.stringify(graph.core_only_open_assertions)!==JSON.stringify(["L-SSC-013"]))errors.push("core-only assertion set");
if(graph.assertion_edges.length!==census.items.length)errors.push("edge coverage");

for(const item of census.items){
  const e=edgeById.get(item.census_id);
  if(!e){errors.push("missing edge "+item.census_id);continue}
  const expected=rules.demand_rules.filter(r=>new RegExp(r.regex,"i").test(item.body)).map(r=>r.id);
  if(JSON.stringify(e.demand_ids)!==JSON.stringify(expected))errors.push("edge mismatch "+item.census_id);
  for(const id of e.demand_ids)if(!byId.has(id))errors.push("unknown demand "+id);
}

for(const d of graph.demand_nodes){
  const W=graph.assertion_edges.filter(e=>e.track==="W"&&e.demand_ids.includes(d.demand_id)).map(e=>e.census_id);
  const L=graph.assertion_edges.filter(e=>e.track==="L"&&e.demand_ids.includes(d.demand_id)).map(e=>e.census_id);
  if(d.counts.W!==W.length||d.counts.L!==L.length||d.counts.total!==W.length+L.length)errors.push("quotient count "+d.demand_id);
  if(JSON.stringify(d.assertion_ids.W)!==JSON.stringify(W)||JSON.stringify(d.assertion_ids.L)!==JSON.stringify(L))errors.push("quotient members "+d.demand_id);
  if(d.cross_track!==(W.length>0&&L.length>0))errors.push("cross-track flag "+d.demand_id);
}

const forbidden=/woit|lisi|twistor|triality|quaternion|octonion|clifford|penrose|yang.?mills|einstein/i;
for(const r of rules.demand_rules)if(forbidden.test(r.id+" "+r.fingerprint))errors.push("domain label leaked into demand fingerprint "+r.id);

const result={pass:errors.length===0,errors,counts:graph.counts,shared:graph.cross_track_shared_structural_demands.length};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
