#!/usr/bin/env node
/**
 * Literature-derived exactly enumerable hypergraph min-cut witness:
 *   one rank-4 hyperedge vs its complete pairwise two-section K4.
 *
 * Defines abstract cut weights, NOT physical entanglement entropy.
 * 4-party quantum interpretation needs separate GHZ/stabilizer construction.
 * No geometry, matter, background dimension or hypergraph dynamics assumed.
 * Source mathematical context:
 *   Bao et al., SciPost Phys. 9, 067 (2020), arXiv:2002.05317.
 *   Bao et al., "The Holographic Entropy Cone", JHEP 09 (2015) 130.
 *
 * Run: node 2026-10-13-hypergraph-entropic-cut-witness.mjs
 */
const N=4,T=[0,1,2,3],partyNames=["A","B","C","P"];
function pairs(){
 const a=[];for(let i=0;i<N;i++)for(let j=i+1;j<N;j++)a.push([i,j]);
 return a;
}
function cutCost(hyperedges,partMask){
 let cut=0;
 for(const [members,weight] of hyperedges){
  let inside=false,outside=false;
  for(const id of members){if(partMask&(1<<id))inside=true;else outside=true;}
  if(inside&&outside)cut+=weight;
 }
 return cut;
}
function entropyVector(edges){
 const result={};
 for(let mask=0;mask<(1<<N);mask++){
  const subset=partyNames.filter((_,i)=>mask&(1<<i)).join("")||"empty";
  result[subset]=cutCost(edges,mask);
 }
 return result;
}
function mutualTripartite(edges){
 const s=(mask)=>cutCost(edges,mask);
 const A=1<<0,B=1<<1,C=1<<2;
 return s(A)+s(B)+s(C)-s(A|B)-s(A|C)-s(B|C)+s(A|B|C);
}
const high=[[[0,1,2,3],1]],projection=pairs().map(ids=>[ids,1]);
const ranked={
 research_scope:"finite, undirected, four-terminal abstract weighted cut functions",
 vertices:partyNames,hyperedge:{edges:high,entropies:entropyVector(high),I3:mutualTripartite(high)},
 pairwiseProjection:{edges:projection,entropies:entropyVector(projection),I3:mutualTripartite(projection)},
 holographicMMIinequality:"I3(A:B:C) <= 0 for RT graph / geometric holographic entropy vectors",
 notes:[
  "All four nodes are designated terminals, with P as purifier, so each min-cut is the unique partition cut.",
  "A rank-4 unit hyperedge yields S(nonempty proper subset)=1, I3=+1, violating holographic MMI.",
  "K4 unit pairs yields S(single)=3, S(pair)=4, S(ABC)=3, I3=0.",
  "This is an exact *representation separation*, not evidence that causal networks are quantum/holographic or that aux-node pairwise encodings can never simulate a hyperedge.",
  "In standard quantum information the rank-4 vector matches the four-qubit GHZ entropy vector up to choice of logarithm normalization."
 ]
};
if(ranked.hyperedge.I3!==1||ranked.pairwiseProjection.I3!==0)throw Error("Counterexample mismatch");
for(let mask=1;mask<15;mask++)if(cutCost(high,mask)!==1)throw Error("Incorrect 4-edge cut at mask "+mask);
if(cutCost(high,0)!==0||cutCost(high,15)!==0)throw Error("Bad empty or full cuts");
console.log(JSON.stringify(ranked,null,2));
