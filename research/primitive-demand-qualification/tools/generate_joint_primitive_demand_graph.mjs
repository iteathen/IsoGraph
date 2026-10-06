import fs from "node:fs";

const root="research/primitive-demand-qualification";
const corpus=JSON.parse(fs.readFileSync(root+"/SOURCE_DEMAND_CENSUS_0_1.json","utf8"));
const rules=JSON.parse(fs.readFileSync(root+"/DEMAND_EXTRACTION_RULES_0_1.json","utf8"));
const compiled=rules.demand_rules.map(r=>({...r,re:new RegExp(r.regex,"i")}));

const assertion_edges=[];
const quotient=Object.fromEntries(compiled.map(r=>[
  r.id,
  {demand_id:r.id,fingerprint:r.fingerprint,requires:r.requires,new_qualified_semantics:r.new_qualified_semantics!==false,W:[],L:[]}
]));
const unmatched=[],coreOnly=[];

for(const item of corpus.items){
  const matches=compiled.filter(r=>r.re.test(item.body)).map(r=>r.id);
  if(!matches.length)unmatched.push(item.census_id);
  const nonCore=matches.filter(id=>id!=="PD-CORE-STATUS");
  if(!nonCore.length)coreOnly.push(item.census_id);
  assertion_edges.push({track:item.track,census_id:item.census_id,demand_ids:matches});
  for(const id of matches) quotient[id][item.track].push(item.census_id);
}
if(unmatched.length) throw new Error("unmatched frozen bodies: "+unmatched.join(","));

const demand_nodes=Object.values(quotient).map(q=>({
  demand_id:q.demand_id,
  fingerprint:q.fingerprint,
  requires:q.requires,
  new_qualified_semantics:q.new_qualified_semantics,
  counts:{W:q.W.length,L:q.L.length,total:q.W.length+q.L.length},
  cross_track:q.W.length>0&&q.L.length>0,
  assertion_ids:{W:q.W,L:q.L}
}));
const structural=demand_nodes.filter(d=>d.new_qualified_semantics&&d.counts.total>0);

const graph={
  schema:"isograph.domain-neutral-primitive-demand-graph.v0.1",
  date:"2026-10-05",
  status:"FROZEN_MECHANICALLY_EXTRACTED_DEMAND_GRAPH",
  corpus:"SOURCE_DEMAND_CENSUS_0_1.json",
  extraction_rules:"DEMAND_EXTRACTION_RULES_0_1.json",
  semantics:{
    edge_meaning:"Exact frozen body matched the frozen surface trigger for this domain-neutral structural demand.",
    quotient_meaning:"Demand instances are quotiented iff they share the same frozen demand_id/fingerprint. Source object names play no role in quotient identity.",
    non_implication:"Shared demand fingerprints do not identify W and L source objects or assert any cross-author theorem."
  },
  counts:{
    assertions:corpus.items.length,W:corpus.counts.W,L:corpus.counts.L,
    demand_types_with_support:demand_nodes.filter(d=>d.counts.total>0).length,
    structural_demand_types:structural.length,
    cross_track_structural_types:structural.filter(d=>d.cross_track).length,
    W_only_structural_types:structural.filter(d=>d.counts.W>0&&d.counts.L===0).length,
    L_only_structural_types:structural.filter(d=>d.counts.L>0&&d.counts.W===0).length,
    core_only_open_assertions:coreOnly.length
  },
  core_only_open_assertions:coreOnly,
  assertion_edges,
  demand_nodes,
  cross_track_shared_structural_demands:structural.filter(d=>d.cross_track).map(d=>d.demand_id),
  W_only_structural_demands:structural.filter(d=>d.counts.W>0&&d.counts.L===0).map(d=>d.demand_id),
  L_only_structural_demands:structural.filter(d=>d.counts.L>0&&d.counts.W===0).map(d=>d.demand_id)
};

if(process.argv.includes("--write")){
  fs.writeFileSync(root+"/PRIMITIVE_DEMAND_GRAPH_0_1.json",JSON.stringify(graph,null,2)+"\n");
}
console.log(JSON.stringify(graph.counts,null,2));
