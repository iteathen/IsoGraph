import fs from "node:fs";
const root="research/primitive-demand-qualification";
const graph=JSON.parse(fs.readFileSync(root+"/PRIMITIVE_DEMAND_GRAPH_0_1.json","utf8"));
const rules=JSON.parse(fs.readFileSync(root+"/DEMAND_EXTRACTION_RULES_0_1.json","utf8"));
const basis=JSON.parse(fs.readFileSync(root+"/CANDIDATE_PRIMITIVE_BASIS_0_1.json","utf8"));
const errors=[];
const demand=new Map(graph.demand_nodes.map(d=>[d.demand_id,d]));
const candidateIds=new Set(rules.candidate_basis_ids);
const foundation=new Set(basis.result.foundational_basis);
const derived=new Set(basis.result.derived_generic_schemas);
if(candidateIds.size!==12||foundation.size!==5||derived.size!==7)errors.push("basis cardinality");
for(const id of candidateIds)if(!basis.candidates[id])errors.push("missing basis candidate "+id);
for(const id of foundation)if(derived.has(id))errors.push("foundation/derived overlap "+id);
for(const [id,c] of Object.entries(basis.candidates)){
  for(const dep of c.dependencies||[])if(!candidateIds.has(dep))errors.push("unknown dependency "+id+" -> "+dep);
  const demandIds=rules.demand_rules.filter(r=>(r.requires||[]).includes(id)&&r.id!=="PD-CORE-STATUS").map(r=>r.id);
  if(JSON.stringify(c.support.demand_ids)!==JSON.stringify(demandIds))errors.push("support demand set "+id);
  const W=new Set(),L=new Set();
  for(const dId of demandIds){const d=demand.get(dId);for(const x of d?.assertion_ids?.W||[])W.add(x);for(const x of d?.assertion_ids?.L||[])L.add(x)}
  if(c.support.assertion_counts.W!==W.size||c.support.assertion_counts.L!==L.size||c.support.assertion_counts.total!==W.size+L.size)errors.push("support count "+id);
}
for(const w of basis.foundational_witnesses){
  if(!foundation.has(w.basis_id))errors.push("nonfoundation witness "+w.basis_id);
  const d=demand.get(w.witness_demand);
  if(!d?.cross_track)errors.push("foundation witness is not cross-track "+w.basis_id);
}
const forbidden=/woit|lisi|twistor|triality|quaternion|octonion|clifford|penrose|yang.?mills|einstein/i;
for(const [id,c] of Object.entries(basis.candidates))if(forbidden.test(id+" "+c.name+" "+c.meaning))errors.push("domain label in candidate "+id);
const result={pass:errors.length===0,errors,foundational:[...foundation],derived:[...derived],witnesses:basis.foundational_witnesses.length};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;