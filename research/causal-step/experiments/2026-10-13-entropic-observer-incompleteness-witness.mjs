#!/usr/bin/env node
/**
 * Causal Step entropy-completeness diagnostic: exact cut-map non-injectivity.
 *
 * Two genuine higher-order incidence structures have the same ENTIRE
 * four-terminal min-cut vector despite distinct internal incidence and
 * ability to match a specified further high-order rewrite pattern.
 *
 * This is an elementary constructed mathematical counterexample.
 * It is not a quantum entropy calculation or a proof about physical entropy.
 */
const boundary=["A","B","C","P"];
const reference={name:"H0",vertices:[...boundary],edges:[
 {participants:["A","B","C","P"],weight:1}
]};
const enhanced={name:"H1",vertices:[...boundary,"x","y"],edges:[
 {participants:["A","B","C","P"],weight:1},
 {participants:["A","x","y"],weight:2}
]};
function allMasks(n){return Array.from({length:1<<n},(_,i)=>i);}
function minCut(model,termMask){
 const internals=model.vertices.filter(v=>!boundary.includes(v));
 const index=Object.fromEntries(boundary.map((v,i)=>[v,i]));
 let best=Infinity,count=0;
 for(const mask of allMasks(internals.length)){
  const inA=new Set();
  for(let j=0;j<boundary.length;j++)if(termMask&(1<<j))inA.add(boundary[j]);
  for(let j=0;j<internals.length;j++)if(mask&(1<<j))inA.add(internals[j]);
  let cost=0;
  for(const edge of model.edges){
   let left=false,right=false;
   for(const id of edge.participants){
    if(inA.has(id))left=true;else right=true;
   }
   if(left&&right)cost+=edge.weight;
  }
  if(cost<best){best=cost;count=1;}
  else if(cost===best)count++;
 }
 return {cost:best,numberOfOptimalInternalAssignments:count};
}
function vector(model){
 const entries=[];
 for(const mask of allMasks(boundary.length)){
  const names=boundary.filter((_,i)=>mask&(1<<i));
  entries.push({boundaryRegion:names.join("")||"empty",mincut:minCut(model,mask).cost});
 }
 return entries;
}
function hasThreeWayActivation(model){
 return model.edges.some(e=>e.participants.length===3&&
  ["A","x","y"].every(n=>e.participants.includes(n)));
}
function shape(model){
 const counts={};
 for(const e of model.edges)counts[e.participants.length]=(counts[e.participants.length]||0)+1;
 return {vertexCount:model.vertices.length,hyperedgeCount:model.edges.length,rankCounts:counts,canMatchSpecificThreeWayRewrite:hasThreeWayActivation(model)};
}
const v0=vector(reference),v1=vector(enhanced),different=[];
for(let i=0;i<v0.length;i++)if(v0[i].mincut!==v1[i].mincut)different.push(i);
if(different.length!==0)throw Error("The readout vectors differ");
if(hasThreeWayActivation(reference)||!hasThreeWayActivation(enhanced))throw Error("Structural rewrite witness missing");
for(let i=1;i<v0.length-1;i++)if(v0[i].mincut!==1)throw Error("Unexpected four-way cut");
const result={
 observerMap:"all minimum cut costs for every subset of four designated terminal vertices",
 terminalSet:boundary,
 network0:shape(reference),network1:shape(enhanced),
 completeTerminalMinCutVector0:v0,
 completeTerminalMinCutVector1:v1,
 equalityOfAllTerminalMinCutCosts:true,
 countOfTerminalPartitionsTested:v0.length,
 witness:"Added rank3 relation {A,x,y} of weight 2 can always keep x,y on same cut side as A. The rank4 terminal edge forces the original cost; therefore cuts agree. The rank3 relation can match a separate high-order rewrite in H1 but not H0.",
 qualification:"Noninjective entropy cut readout does not imply the quantum information entropy formula is mathematically wrong, physically incomplete, or incapable of encoding internal structure by another readout."
};
console.log(JSON.stringify(result,null,2));
