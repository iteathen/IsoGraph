#!/usr/bin/env node
'use strict';
/**
 * Causal Step information-preservation / recovery comparison.
 *
 * FINITE FORMAL COMPARATOR, NOT ORIGINAL UNORDERED HIGHER-ORDER SIMULATOR:
 * 5 named input nodes, one named target, three distinct rank-4 directed
 * occurrences with 3-source conjunctive enabling and OR across occurrences.
 * This is exactly the scoped T3 joint-input witness model.
 *
 * Reproduction: node 2026-10-14-classical-recovery-and-incidence.cjs
 * Source and data are independent of any required physical dimensions,
 * Hilbert space, background spacetime, mass, fields or entropy force.
 */
const N=5,ALL=(1<<N)-1,EPS=1e-10;
const comb=(arr,k)=>{const out=[];const rec=(start,sofar)=>{if(sofar.length===k){out.push(sofar.slice());return;}
  for(let i=start;i<=arr.length-(k-sofar.length);i++)rec(i+1,[...sofar,arr[i]]);};rec(0,[]);return out;};
function check(x,msg){if(!x)throw Error(msg)}
const popcount=x=>{let n=0;while(x){x&=x-1;n++;}return n};
const triples=comb([0,1,2,3,4],3).map(t=>t.reduce((v,i)=>v|(1<<i),0));
const trikey=x=>[0,1,2,3,4].filter(i=>x&(1<<i)).map(i=>'abcde'[i]).join('');
const combinations=comb(triples,3);
const sourceLabelPermutations=(()=>{
 const loop=arr=>arr.length?arr.flatMap((x,i)=>loop(arr.filter((_,j)=>j!==i)).map(p=>[x,...p])):[[]];
 return loop([0,1,2,3,4]);
})();
function canonicalUnlabeledHypergraph(edges){
 let best=null;
 for(const P of sourceLabelPermutations){
  const e=edges.map(mask=>[0,1,2,3,4].reduce((bits,i)=>bits|((mask&(1<<i))?(1<<P[i]):0),0))
   .sort((a,b)=>a-b).join(',');
  if(best===null||e<best)best=e;
 }
 return best;
}
function enabling(model,mask){return model.some(edge=>(edge&mask)===edge)?1:0}
function shadow(model){return model.reduce((a,x)=>a|x,0)}
function incidence(model){return Array.from({length:5},(_,i)=>model.map(e=>(e>>i)&1))}
function incidenceGraphHomology(model){
 // A separately DECLARED graph 1-complex of source + typed event vertices.
 // It is not an inferred simplicial closure of rank-4 multiway events.
 const parent=Array.from({length:8},(_,i)=>i);
 const find=i=>parent[i]===i?i:(parent[i]=find(parent[i]));
 const union=(a,b)=>{const x=find(a),y=find(b);if(x!==y)parent[x]=y;};
 let links=0;
 for(let j=0;j<model.length;j++)for(let i=0;i<5;i++)if(model[j]&(1<<i)){
  union(i,5+j);links++;
 }
 check(links===9,'Every rank-4 model has nine source-event graph incidence links');
 const components=new Set(parent.map((_,i)=>find(i))).size;
 return {declaredComplex:'bipartite incidence graph, no 2-cells',
  graphVertices:8,graphIncidenceLinks:links,
  b0:components,b1:links-8+components,b2:0};
}
function gram(model){
 const X=incidence(model);
 return Array.from({length:3},(_,a)=>Array.from({length:3},(_,b)=>X.reduce((s,row)=>s+row[a]*row[b],0)));
}
function det3(M){return M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-
M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+
M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);}
function charpoly(M){
 const tr=M[0][0]+M[1][1]+M[2][2];
 const c2=M[0][0]*M[1][1]-M[0][1]*M[1][0]+M[0][0]*M[2][2]-
 M[0][2]*M[2][0]+M[1][1]*M[2][2]-M[1][2]*M[2][1];
 return [1,-tr,c2,-det3(M)];
}
function symmetricPoly(m){return charpoly(gram(m)).join(',')}
function witness(){
 const dictionary=new Map(triples.map(i=>[trikey(i),i]));
 const A=['abc','abd','abe'].map(x=>dictionary.get(x));
 const B=['abc','ade','bde'].map(x=>dictionary.get(x));
 check(A.every(Number.isInteger)&&B.every(Number.isInteger),'invalid named source');
 const outcomes=Array.from({length:32},(_,mask)=>({mask,
  sources:[0,1,2,3,4].filter(i=>mask&(1<<i)).map(i=>'abcde'[i]).join(''),
  A:enabling(A,mask),B:enabling(B,mask)}));
 const diff=outcomes.filter(x=>x.A!==x.B).map(x=>x.sources);
 const degree=m=>[0,1,2,3,4].map(i=>m.reduce((a,e)=>a+Number(!!(e&(1<<i))),0)).sort((a,b)=>a-b);
 check(diff.length===6&&shadow(A)===31&&shadow(B)===31,'T3 source witness changed');
 check(degree(A).join()==='1,1,1,3,3'&&degree(B).join()==='1,2,2,2,2','witness degrees changed');
 const gA=gram(A),gB=gram(B),pA=charpoly(gA),pB=charpoly(gB);
 check(pA.join()==='1,-9,15,-7'&&pB.join()==='1,-9,21,-13','operator charpoly mismatch');
 return {A,B,sourcesA:A.map(trikey),sourcesB:B.map(trikey),
  jointEnablingOutputs:outcomes,distinguishingInputs:diff,
  responseCounts:[outcomes.filter(x=>x.A).length,outcomes.filter(x=>x.B).length],
  degrees:[degree(A),degree(B)],allFiveSourceShadow:true,
  incidenceSourceByEvent:[incidence(A),incidence(B)],
  incidenceGrams:[gA,gB],exactCharacteristicPolynomials:[pA,pB],
  declaredIncidenceGraphHomologies:[incidenceGraphHomology(A),incidenceGraphHomology(B)],
  exactEigenvalueForms:['7, 1, 1','1, 4+sqrt(3), 4-sqrt(3)'],
  interpretation:"Same complete binary source-to-target order; different exact joint-input activation truth tables and different incidence Gram spectra, under fixed named-source intervention semantics. No metric, quantum density matrix or Dirac/Hodge operator inferred."};
}
function tv(p,q){return p.reduce((s,x,i)=>s+Math.abs(x-q[i]),0)/2}
function kl(p,q){return p.reduce((s,x,i)=>s+(x>0?x*Math.log(x/q[i]):0),0)}
function normalize(p){const s=p.reduce((a,b)=>a+b,0);check(Math.abs(s-1)<EPS,"normalization broken "+s)}
function observations(model,eta){
 const v=[];
 for(let mask=0;mask<32;mask++){
  const hit=enabling(model,mask),py=eta+(1-2*eta)*hit;
  v.push(1/32*(1-py),1/32*py);
 }
 normalize(v);return v;
}
function observe(dist,model){
 const entries=new Map();
 for(let x=0;x<64;x++){
  const m=x>>1,y=x&1;
  const key=model==="full"?String(x):
  model==="response-only"?String(y):
  model==="input-only"?String(m):
  model==="intervention-cardinality-and-response"?popcount(m)+':'+y:
  model==="selected-3source-intervention-and-response"?(popcount(m)===3?trikey(m):'*')+':'+y:
  model==="constant-binary-shadow"?'full-5-source-star':
  null;
  check(key!==null,"unknown observer "+model);
  entries.set(key,(entries.get(key)||0)+dist[x]);
 }
 return entries;
}
function analyzeProjection(p,q,name){
 const P=observe(p,name),Q=observe(q,name);
 const keys=[...new Set([...P.keys(),...Q.keys()])].sort();
 const pp=keys.map(k=>P.get(k)||0),qq=keys.map(k=>Q.get(k)||0);
 normalize(pp);normalize(qq);
 const relative=kl(pp,qq),t=tv(pp,qq);
 const original=kl(p,q),retained=kl(p,q)>EPS?relative/original:null;
 // Classical reference-dependent recovery R_Q(x|z) = Q(x) / Q_Z(z)
 // reconstructs Q by construction. It recovers P iff both
 // source conditionals inside every deterministic observer fiber agree.
 let reconstructionP=Array(64).fill(0),reconstructionQ=Array(64).fill(0);
 // observe() intentionally normalizes only distributions, so use
 // direct key reconstruction from basis-independent deterministic logic.
 const key=(m,y)=>name==="full"?String(m*2+y):
  name==="response-only"?String(y):
  name==="input-only"?String(m):
  name==="intervention-cardinality-and-response"?popcount(m)+':'+y:
  name==="selected-3source-intervention-and-response"?(popcount(m)===3?trikey(m):'*')+':'+y:
  'full-5-source-star';
 for(let x=0;x<64;x++){
  const z=key(x>>1,x&1),qm=Q.get(z);
  check(qm>0,'reference support missing');
  reconstructionP[x]=(P.get(z)||0)*q[x]/qm;
  reconstructionQ[x]=(Q.get(z)||0)*q[x]/qm;
 }
 normalize(reconstructionP);normalize(reconstructionQ);
 const loss=original-relative;
 const conditionalProof=keys.reduce((sum,z)=>{
  const pi=P.get(z),qi=Q.get(z);if(pi===0)return sum;
  let d=0;
  for(let x=0;x<64;x++){
   if(key(x>>1,x&1)!==z)continue;
   const px=p[x]/pi,qx=q[x]/qi;
   if(px>0)d+=px*Math.log(px/qx);
  }return sum+pi*d;
 },0);
 check(loss>=-EPS&&Math.abs(loss-conditionalProof)<EPS,
  'Classical KL/data-processing chain identity fails for '+name);
 check(tv(q,reconstructionQ)<EPS,'reference reconstruction failure');
 return {observer:name,outputCells:keys.length,
  totalVariation:t,KL_nats:relative,
  informationRetainedKLFraction:retained,
  KL_loss_nats:loss,
  exactClassicalReferenceRecovery:Boolean(tv(p,reconstructionP)<EPS),
  referenceBasedRecoveryErrorTV:tv(p,reconstructionP),
  conditionalFiberKL_nats:conditionalProof};
}
function recoveryTest(w){
 const observers=['full','selected-3source-intervention-and-response',
 'intervention-cardinality-and-response','response-only',
 'input-only','constant-binary-shadow'];
 const arr=[];
 for(const eta of [0.1,0.25,0.5]){
  const p=observations(w.A,eta),q=observations(w.B,eta);
  const records=observers.map(n=>analyzeProjection(p,q,n));
  check(Math.abs(records[0].totalVariation-(6/32)*Math.abs(1-2*eta))<EPS,
   'full binary operational total variation did not match source truth table');
  check(Math.abs(records[0].KL_nats-(6/32)*(1-2*eta)*Math.log((1-eta)/eta))<EPS,
   'exact finite noisy KL formula mismatch');
  check(records[5].totalVariation<EPS&&records[5].KL_nats<EPS,
   'binary shadow should be identical');
  if(eta!==0.5)check(records[0].exactClassicalReferenceRecovery &&
    !records[3].exactClassicalReferenceRecovery && !records[5].exactClassicalReferenceRecovery,
    'recovery negative control unexpectedly passed');
  arr.push({flipProbability:eta,formalExperimentalNoiseOnly:true,
    fullObserverKLFormula:'6/32 * (1-2*eta) * ln((1-eta)/eta)',
    observationalResults:records});
 }
 return arr;
}
function catalog(){
 const models=combinations.map((e,i)=>({
  id:i,edges:e,shadow:shadow(e),
  gramPolynomial:symmetricPoly(e),isomorphismOrbit:canonicalUnlabeledHypergraph(e),
  graphHomology:incidenceGraphHomology(e),
  truthVector:Array.from({length:32},(_,m)=>enabling(e,m)).join(''),
  outcomes:Array.from({length:32},(_,m)=>enabling(e,m))
 }));
 check(models.length===120&&new Set(models.map(x=>x.truthVector)).size===120,'formal models not distinct');
 const pairStats={differentModels:0,identicalFullOrder:0,
  sameFullOrderButDifferentResponse:0,
  sameIncidenceGramPolyButDifferentResponse:0,
  sameFullOrderSameGramPolyButDifferentResponse:0,
  sameFullOrderSameGramPolyDifferentUnlabeledIsomorphismTypes:0,
  minTVWithinEqualFullOrder:1,maxTVWithinEqualFullOrder:0,
  sumTVWithinEqualFullOrder:0,unlabeledCommonSupportGroups:{}};
 const polyCollisions=[],incidenceCollisions=[];
 for(let i=0;i<models.length;i++)for(let j=i+1;j<models.length;j++){
  const a=models[i],b=models[j],diff=a.outcomes.reduce((t,v,k)=>t+Number(v!==b.outcomes[k]),0);
  check(diff>0,'injective full intervention observer false');
  pairStats.differentModels++;
  if(a.shadow===b.shadow){
   pairStats.identicalFullOrder++;
   pairStats.sameFullOrderButDifferentResponse++;
   const t=diff/32;
   pairStats.minTVWithinEqualFullOrder=Math.min(pairStats.minTVWithinEqualFullOrder,t);
   pairStats.maxTVWithinEqualFullOrder=Math.max(pairStats.maxTVWithinEqualFullOrder,t);
   pairStats.sumTVWithinEqualFullOrder+=t;
  }
  if(a.gramPolynomial===b.gramPolynomial){
   pairStats.sameIncidenceGramPolyButDifferentResponse++;
   if(a.shadow===b.shadow){
    pairStats.sameFullOrderSameGramPolyButDifferentResponse++;
    if(a.isomorphismOrbit!==b.isomorphismOrbit)
      pairStats.sameFullOrderSameGramPolyDifferentUnlabeledIsomorphismTypes++;
    if(polyCollisions.length<3)polyCollisions.push({modelIds:[a.id,b.id],
     A:a.edges.map(trikey),B:b.edges.map(trikey),commonPoly:a.gramPolynomial,shadow:trikey(a.shadow),diff});
   }
  }
 }
 pairStats.avgTVWithinEqualFullOrder=pairStats.sumTVWithinEqualFullOrder/pairStats.identicalFullOrder;
 const group=new Map();
 for(const m of models){if(!group.has(m.shadow))group.set(m.shadow,[]);group.get(m.shadow).push(m.id);}
 pairStats.unlabeledCommonSupportGroups=Object.fromEntries([...group].sort((a,b)=>a[0]-b[0]).map(([k,ids])=>[trikey(k),ids.length]));
 // Only genuinely query-distinguishable masks: triples (10) and
 // quadruples (5); smaller masks are universally false, all-five true.
 const probes=Array.from({length:32},(_,i)=>i).filter(mask=>popcount(mask)===3||popcount(mask)===4);
 check(probes.length===15,'probe census incorrect');
 let best=Number.POSITIVE_INFINITY,numberOptimal=0,example=null;
 for(let set=1;set<(1<<probes.length);set++){
  const count=popcount(set);if(count>best)continue;
  const seen=new Set();let unique=true;
  for(const model of models){
   let signature=0;
   for(let i=0;i<probes.length;i++)if((set&(1<<i))&&enabling(model.edges,probes[i]))
    signature|=1<<i;
   if(seen.has(signature)){unique=false;break;}seen.add(signature);
  }
  if(unique){
   if(count<best){best=count;numberOptimal=0;example=probes.filter((_,i)=>set&(1<<i)).map(trikey);}
   numberOptimal++;
  }
 }
 check(Number.isFinite(best)&&best<=9,'nine triplet tests must suffice under exactly three distinct events');
 const gramShapes=new Map(),orbitShapes=new Map(),gramToOrbits=new Map(),
 homologyShapes=new Map(),jointSpectralHomologyToOrbits=new Map();
 for(const m of models){
  gramShapes.set(m.gramPolynomial,(gramShapes.get(m.gramPolynomial)||0)+1);
  const h=m.graphHomology.b0+','+m.graphHomology.b1+','+m.graphHomology.b2;
  homologyShapes.set(h,(homologyShapes.get(h)||0)+1);
  const joint=h+'|'+m.gramPolynomial;
  if(!jointSpectralHomologyToOrbits.has(joint))jointSpectralHomologyToOrbits.set(joint,new Set());
  jointSpectralHomologyToOrbits.get(joint).add(m.isomorphismOrbit);
  if(!orbitShapes.has(m.isomorphismOrbit))orbitShapes.set(m.isomorphismOrbit,{
    count:0,representativeSourceTriples:m.edges.map(trikey),polynomial:m.gramPolynomial,
    sourceShadowCardinality:popcount(m.shadow)});
  orbitShapes.get(m.isomorphismOrbit).count++;
  if(!gramToOrbits.has(m.gramPolynomial))gramToOrbits.set(m.gramPolynomial,new Set());
  gramToOrbits.get(m.gramPolynomial).add(m.isomorphismOrbit);
 }
 check(orbitShapes.size===4 && gramShapes.size===3 && sourceLabelPermutations.length===120,
  'unexpected finite isomorphism/spectral classification');
 check(pairStats.sameFullOrderSameGramPolyDifferentUnlabeledIsomorphismTypes===0,
  'spectrum plus full shadow unexpectedly fails to separate unlabeled 5-source class');
 return {candidateModelClass:'all exactly 3 distinct rank-4 (3-input AND -> 1 sink OR) occurrence sets chosen from 10 labeled triples of 5 sources',
  numberOfModels:models.length,directedBinaryShadows:group.size,
  fullLabeled32InterventionSignatureUniqueModels:new Set(models.map(m=>m.truthVector)).size,
  modelPairs:pairStats,
  probeCompleteCensus:{meaningfulSingleEventMasks:probes.map(trikey),
   fixedNonadaptiveSmallestSeparatingProbeCount:best,
   optimalProbeSubsetsAmong15:numberOptimal,oneMinimumProbeSet:example,
   probeUniverseSize:15,
   proofScope:'exhaustive all 2^15 subsets of the 10 size-3 and 5 size-4 masks; size 0/1/2 always disable, size 5 always enables; exactly three distinct rank-4 occurrences known'},
  numberOfUnlabeledIsomorphismClasses:orbitShapes.size,
  sourceRelabelPermutationsCheckedPerModel:sourceLabelPermutations.length,
  declaredBipartiteGraphHomologyClasses:homologyShapes.size,
  declaredBipartiteGraphHomologyHistogram:Object.fromEntries(homologyShapes),
  gramPolynomialPlusDeclaredHomologySeparatesUnlabeledTypes:[...jointSpectralHomologyToOrbits].every(([,orbits])=>orbits.size===1),
  unlabeledOrbitCensus:[...orbitShapes].map(([canonical,r])=>({canonical,count:r.count,
    representativeSourceTriples:r.representativeSourceTriples,polynomial:r.polynomial,
    sourceShadowCardinality:r.sourceShadowCardinality})),
  gramPolynomialsFailToSeparateUnlabeledOrbits:[...gramToOrbits].filter(([,set])=>set.size>1)
    .map(([polynomial,orbits])=>({polynomial,nonIsomorphicOrbits:[...orbits]})),
  inThisFiniteClassGramPolynomialPlusShadowDoesSeparateUnlabeledOrbits:true,
  incidenceGramCharacteristicPolynomialClasses:gramShapes.size,
  incidenceGramPolyHistogram:Object.fromEntries([...gramShapes].sort((a,b)=>a[0].localeCompare(b[0]))),
  sameShadowSameGramButDistinctNamedInterventions:polyCollisions};
}
function run(){
 const w=witness(),cat=catalog(),info=recoveryTest(w);
 return {experiment:'Causal Step: classical distinguishability, sufficient intervention measurements and retained higher-order incidence operator',
 date:'2026-10-14',
 status:'exact finite directed joint-input comparator; no physical or quantum emergence',
 sourceWitness:'T3 formal source semantics: research/causal-step/experiments/2026-10-13-t3-order-interval-observer.cjs Git blob 2bad02a08ccf8bccf0e6e73216dcb63fe9365e7f',
 witness:{...w,incidenceRole:'Binary B[source,event], not a topological boundary operator; G=B^T B, not a spacetime metric.'},
 recoveryExperiments:info,
 modelClassSurvey:cat,
 inferenceLimits:[
  'These are directed AND-source / OR-across-edge events, intentionally not the native unordered higher-order bit-mutation generator.',
  'Classical D_KL and total variation on investigator-imposed intervention/output distributions are not quantum relative entropy, spacetime geometry, gravitational dynamics or fundamental entropy back-pressure.',
  'The artificial binary-output flip channel eta is a regularization/control, not intrinsic physical stochasticity; eta=0 deterministic differences yield infinite KL, even though TV is finite.',
  'The full binary order loses genuine k-ary joint enabling; a static incidence Gram operator can distinguish the T3 witness but does not reconstruct all named interventions or define an oriented cellular boundary complex.',
  'The deliberately constructed bipartite graph 1-complex has well-defined b0/b1 but imposes no original k-way AND semantics: the T3 witness has identical graph homology despite different event incidence Gram spectra.',
  'Exact full-output recoverability in a predeclared finite hypothesis class is not equal to microscopic-source reconstruction in all causal models.',
  'Fixed labeled input-node interventions are part of operational equivalence; re-label invariance must be specified and checked separately.',
  'Petz recovery and holographic bulk/boundary statements require quantum state/channel or code-subspace assumptions not available in this experiment.'
 ]};
}
if(typeof module!=='undefined')module.exports={run};
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),path=require('node:path');
 const result=run();
 const dest=process.argv[2]||path.join(__dirname,'results/2026-10-14-information-recovery-and-incidence-exact.json');
 fs.writeFileSync(dest,JSON.stringify(result,null,2)+'\n');
 process.stdout.write(JSON.stringify({file:dest,catalog:result.modelClassSurvey.modelPairs,
  minimalProbes:result.modelClassSurvey.probeCompleteCensus.fixedNonadaptiveSmallestSeparatingProbeCount,
  firstWitness:result.witness.distinguishingInputs})+'\n');
}