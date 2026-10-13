// Causal Step 2026-10-13 finite incidence/intervention witness.
// Internal mathematical control only, no claim of physical derivation.
// Run: node research/causal-step/experiments/2026-10-13-higher-order-causal-projection-and-scheduling.mjs
function diagnostic(){
const error=(c,s)=>{if(!c)throw Error(s)};
const edgesJoint=[{sources:["a","b"],target:"c"}];
const edgesSplit=[{sources:["a"],target:"c"},{sources:["b"],target:"c"}];
const shadow=es=>[...new Set(es.flatMap(e=>e.sources.map(x=>x+">"+e.target)))].sort();
const hasTarget=(es,active,target)=>es.some(e=>e.target===target&&e.sources.every(x=>active.includes(x)));
const subsets=[[],["a"],["b"],["a","b"]];
const counterexamples=subsets.map(active=>({active, joint:hasTarget(edgesJoint,active,"c"),split:hasTarget(edgesSplit,active,"c")}));
error(JSON.stringify(shadow(edgesJoint))===JSON.stringify(shadow(edgesSplit)),"Pairwise shadows must match");
error(counterexamples.filter(x=>x.joint!==x.split).length===2,"Exactly two interventions must distinguish");
const permutations=[["a","b","c"],["a","c","b"],["b","a","c"],["b","c","a"],["c","a","b"],["c","b","a"]];
let relabelled=0;
for(const p of permutations){const R=x=>p[["a","b","c"].indexOf(x)];
const rename=es=>es.map(e=>({sources:e.sources.map(R),target:R(e.target)}));
error(JSON.stringify(shadow(rename(edgesJoint)))===JSON.stringify(shadow(rename(edgesSplit))),"Projection invariance");
for(const subset of subsets){error(hasTarget(rename(edgesJoint),subset.map(R),R("c"))===hasTarget(edgesJoint,subset,"c"),"Joint equivariance");error(hasTarget(rename(edgesSplit),subset.map(R),R("c"))===hasTarget(edgesSplit,subset,"c"),"Split equivariance");}
relabelled++;}
const apply=(active,r)=>r.sources.every(x=>active.has(x))?new Set([...active,r.target]):null;
const r1={sources:["a","b"],target:"c"}, r2={sources:["d","e"],target:"f"}, r3={sources:["b","c"],target:"d"};
const initial=new Set(["a","b","d","e"]);
const forward=apply(apply(initial,r1),r2),reverse=apply(apply(initial,r2),r1);
error(forward&&reverse&&[...forward].sort().join() === [...reverse].sort().join(),"Disjoint concurrency");
const overlapStart=new Set(["a","b"]);
const legalOrder=apply(apply(overlapStart,r1),r3);
const reverseInitial=apply(overlapStart,r3);
error(legalOrder?.has("d")&&!reverseInitial,"Sequential dependence");
return {
experiment:"2026-10-13-higher-order-causal-projection-and-scheduling",
scope:"exact finite observer-level semantics; not a causal physics simulation",
pairwise_shadow:shadow(edgesJoint),
same_pairwise_shadow:true,
joint_kary_incidence:{source_count:2,total_incidence_rank:3},
split_incidence:{edge_count:2,incidence_rank_each:2},
intervention_truth_table:counterexamples,
distinguishing_interventions:2,
relabel_permutations_checked:relabelled,
disjoint_rewrite_terminal_states:{R1_then_R2:[...forward].sort(),R2_then_R1:[...reverse].sort(),same:true},
overlapping_rewrite_order:{R1_then_R3:[...legalOrder].sort(),R3_initially_enabled:false,unrestricted_commutation:false},
conclusion:"Pairwise reachability cannot reconstruct primitive joint-input event enabling; disjoint-rule final-state commutation does not imply all overlap schedules commute.",
limitations:["3-node exact comparison only","No probabilistic weights, quantum process, action, metric or effective gravitational result","Relabel invariance in this local witness does not prove global covariance","Historical 8000-rewrite persistence and complexity results untouched"]
};
}
console.log(JSON.stringify(diagnostic(), null, 2));
