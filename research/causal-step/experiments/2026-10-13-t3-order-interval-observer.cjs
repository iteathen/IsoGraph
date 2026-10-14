#!/usr/bin/env node
'use strict';
/**
 * Causal Step T3: order-interval observer loss and provenance-dependent event
 * order diagnostics. Node >=20 (BigInt not required). No source dynamics edited.
 *
 * node research/causal-step/experiments/2026-10-13-t3-order-interval-observer.cjs \
 *   256 /tmp/causal-step-t3.json
 * Uses frozen T2 observer instrumentation solely to replay historical high-order
 * rules; its derived birth-only / conservative touch dependencies are alternative
 * observers, NOT an asserted physical causal order.
 */
const PINNED={engine:'87a420edfb3e562d7fcbacf4ca607b1e6952ac08',
 harness:'bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e',
 oldSummary:'d2d40f87d59a5a94d2df71a69543e521f6ad807f'};
const CONTEXTS=[
 {k:3,id:4,kind:'single'},{k:3,id:28,kind:'overlap'},
 {k:4,id:0,kind:'single'},{k:4,id:21,kind:'single'},
 {k:5,id:21,kind:'single'},{k:5,id:81,kind:'overlap'},
 {k:5,id:4,kind:'overlap'}];
function insist(value,message){if(!value)throw Error(message)}
function popcount(x){x-=((x>>>1)&0x55555555);x=(x&0x33333333)+((x>>>2)&0x33333333);return (((x+(x>>>4))&0x0f0f0f0f)*0x01010101)>>>24}
function relation(n,arcs){
 insist(Number.isInteger(n)&&n>=1&&n<=1024,'unsupported event count');
 const parents=Array.from({length:n},()=>new Set()),out=Array.from({length:n},()=>[]);
 for(const [a,b]of arcs){insist(Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>=0&&a<n&&b<n&&a!==b,'invalid arc');
  parents[b].add(a);}
 const ind=parents.map(s=>s.size);
 for(let b=0;b<n;b++)for(const a of parents[b])out[a].push(b);
 const q=[];for(let i=0;i<n;i++)if(!ind[i])q.push(i);
 const topo=[];
 for(let qi=0;qi<q.length;qi++){const a=q[qi];topo.push(a);for(const b of out[a])if(--ind[b]===0)q.push(b);}
 insist(topo.length===n,'cyclic graph is not causal order');
 const words=Math.ceil(n/32),anc=Array.from({length:n},()=>new Uint32Array(words));
 for(const b of topo)for(const a of parents[b]){
  for(let w=0;w<words;w++)anc[b][w]|=anc[a][w];
  anc[b][a>>>5]|=1<<(a&31);
 }
 const before=(a,b)=>!!(anc[b][a>>>5]&(1<<(a&31)));
 const desc=Array.from({length:n},()=>new Uint32Array(words));
 let comparablePairs=0;
 for(let b=0;b<n;b++)for(let a=0;a<n;a++)if(a!==b&&before(a,b)){
  desc[a][b>>>5]|=1<<(b&31);comparablePairs++;
 }
 const hist=new Map();let coverPairs=0,maxInterior=0;
 for(let b=0;b<n;b++)for(let a=0;a<n;a++)if(a!==b&&before(a,b)){
  let count=0;for(let w=0;w<words;w++)count+=popcount(anc[b][w]&desc[a][w]);
  hist.set(count,(hist.get(count)||0)+1);if(count===0)coverPairs++;
  if(count>maxInterior)maxInterior=count;
 }
 // Hopcroft–Karp on all strict comparabilities; Dilworth gives max antichain n - matching.
 const adj=Array.from({length:n},(_,a)=>out[a].length===0&&!desc[a].some(x=>x!==0)?[]:
    Array.from({length:n},(_,b)=>b).filter(b=>before(a,b)));
 const mateL=new Int32Array(n).fill(-1),mateR=new Int32Array(n).fill(-1),dist=new Int32Array(n);
 let matching=0;
 const bfs=()=>{const queue=[];let found=false;
  for(let a=0;a<n;a++)if(mateL[a]===-1){dist[a]=0;queue.push(a)}else dist[a]=-1;
  for(let qi=0;qi<queue.length;qi++){
   const a=queue[qi];for(const b of adj[a]){const nxt=mateR[b];
    if(nxt===-1)found=true;else if(dist[nxt]===-1){dist[nxt]=dist[a]+1;queue.push(nxt);}
   }
  }return found;};
 const dfs=a=>{for(const b of adj[a]){const nxt=mateR[b];
  if(nxt===-1||(dist[nxt]===dist[a]+1&&dfs(nxt))){mateL[a]=b;mateR[b]=a;return true;}
  }dist[a]=-1;return false;};
 while(bfs())for(let a=0;a<n;a++)if(mateL[a]===-1&&dfs(a))matching++;
 const ancestors=anc.map(row=>row.reduce((s,v)=>s+popcount(v),0));
 const ideals=anc.map((row,b)=>ancestors[b]);
 const inDegreeParents=parents.map(s=>s.size);
 const vals={events:n,immediateCandidateDependencies:parents.reduce((s,p)=>s+p.size,0),
   comparablePairs,incomparablePairs:n*(n-1)/2-comparablePairs,
   coverRelations:coverPairs,maxAntichainWidth:n-matching,
   maxIntervalInterior:maxInterior,intervalInteriorHistogram:Object.fromEntries([...hist].sort((a,b)=>a[0]-b[0])),
   maximalAncestorCount:Math.max(...ancestors),totalAncestorCount:comparablePairs,
   sourceEventCount:inDegreeParents.filter(x=>!x).length,
   ancestryCountHistogram:Object.fromEntries([...ancestors.reduce((m,x)=>(m.set(x,(m.get(x)||0)+1),m),new Map())].sort((a,b)=>a[0]-b[0])),
   maximalEventCount:out.filter(x=>x.length===0).length
 };
 if(n<=12){let antichains=0;
  for(let bits=0;bits<(1<<n);bits++){let valid=true;
   for(let a=0;a<n&&valid;a++)if(bits&(1<<a))for(let b=a+1;b<n;b++)if((bits&(1<<b))&&(before(a,b)||before(b,a))){valid=false;break;}
   if(valid)antichains++;
  }vals.numberOfAntichainsIncludingEmpty=antichains;}
 return {stats:vals,before,topo,parents,ancestorRows:anc,descendantRows:desc};
}
function directedShadow(nodes,hyperedges){
 const arcs=new Set(),ids=new Set(nodes);
 for(const e of hyperedges){insist(e.sources.length>=3,'test expects genuine higher order');
  insist(ids.has(e.target),'unknown target');
  for(const a of e.sources){insist(ids.has(a)&&a!==e.target,'unknown source');arcs.add(a+':'+e.target);}
 }
 return [...arcs].map(v=>v.split(':').map(Number)).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
}
function enabling(edges,active){const A=new Set(active);return edges.some(e=>e.sources.every(x=>A.has(x)))}
function degreeSignature(edges,sources){
 const degrees=new Map(sources.map(x=>[x,0]));
 for(const e of edges)for(const a of e.sources)degrees.set(a,degrees.get(a)+1);
 return [...degrees.values()].sort((a,b)=>a-b);
}
function orderEqual(x,y,n){
 for(let a=0;a<n;a++)for(let b=0;b<n;b++)if(a!==b&&x.before(a,b)!==y.before(a,b))return false;
 return true;
}
function witness(){
 const nodes=[0,1,2,3,4,5],root=[0,1,2,3,4];
 const h0=[{sources:[0,1,2],target:5},{sources:[0,1,3],target:5},{sources:[0,1,4],target:5}];
 const h1=[{sources:[0,1,2],target:5},{sources:[0,3,4],target:5},{sources:[1,3,4],target:5}];
 const s0=directedShadow(nodes,h0),s1=directedShadow(nodes,h1);
 insist(JSON.stringify(s0)===JSON.stringify(s1),'witness shadow mismatch');
 const r0=relation(nodes.length,s0),r1=relation(nodes.length,s1);
 insist(orderEqual(r0,r1,nodes.length),'witness causal order mismatch');
 const d0=degreeSignature(h0,root),d1=degreeSignature(h1,root);
 insist(JSON.stringify(d0)!==JSON.stringify(d1),'witness should be nonisomorphic even unlabeled');
 let disagree=0,forward=0,reverse=0,both=0;const distinguishing=[];
 for(let bits=0;bits<(1<<root.length);bits++){
  const active=root.filter((_,i)=>bits&(1<<i));const a=enabling(h0,active),b=enabling(h1,active);
  if(a!==b){disagree++;if(a)forward++;else reverse++;distinguishing.push({active:active.map(x=>'abcde'[x]).join(''),h0:a,h1:b})}
  if(a&&b)both++;
 }
 insist(disagree>0&&forward>0&&reverse>0,'need two-way intervention difference');
 const degrees0=d0.join(','),degrees1=d1.join(',');
 const intervalObserverAllEqual=JSON.stringify(r0.stats)===JSON.stringify(r1.stats);
 insist(intervalObserverAllEqual,'order observables should agree');
 insist(r0.stats.maxAntichainWidth===5 && r0.stats.numberOfAntichainsIncludingEmpty===33,'star order control failure');
 return {model:"directed, joint-input event preconditions (NOT the unordered native generator)",
 nodes:['a','b','c','d','e','x'],sourceCount:5,
 H0:h0.map(x=>({sources:x.sources.map(v=>'abcde'[v]),target:'x',rank:x.sources.length+1})),
 H1:h1.map(x=>({sources:x.sources.map(v=>'abcde'[v]),target:'x',rank:x.sources.length+1})),
 bothHaveThreeRank4Occurrences:true,shadow:s0.map(([a,b])=>'abcde'[a]+'->x'),
 sourceDegreeMultisets:[d0,d1],notIsomorphicBySourceDegreeMultiset:degrees0!==degrees1,
 identicalFullPartialOrders:orderEqual(r0,r1,6),
 identicalAllIntervalObservers:intervalObserverAllEqual,
 observer:r0.stats,interventions:{tested:32,disagree,onlyH0:forward,onlyH1:reverse,bothEnabled:both,
 distinguishingExamples:distinguishing.slice(0,14)},
 verdict:"Whole binary order, exact every labeled interval, antichain width and distribution cannot recover k-ary joint preconditions even with equal hyperedge count and rank."};
}
function permuteArcs(arcs,p){return arcs.map(([a,b])=>[p[a],p[b]])}
function permutations(arr){
 if(arr.length===0)return[[]];
 const result=[];for(let i=0;i<arr.length;i++)for(const p of permutations(arr.filter((_,j)=>i!==j)))result.push([arr[i],...p]);return result;
}
function relabelNulls(){
 const arcs=[[0,3],[1,3],[2,3],[3,4],[3,5]];const base=relation(6,arcs).stats;
 let checks=0;
 for(const p of permutations([0,1,2,3,4,5])){const r=relation(6,permuteArcs(arcs,p)).stats;
  insist(JSON.stringify(r.intervalInteriorHistogram)===JSON.stringify(base.intervalInteriorHistogram)&&
    r.maxAntichainWidth===base.maxAntichainWidth&&r.comparablePairs===base.comparablePairs,'order relabel check failed');
  checks++;
 }
 return {graph:"three roots => middle => two sinks",initialArcCount:arcs.length,
 exhaustiveVertexPermutations:checks,pass:true,originalObserver:base};
}
function orderNulls(){
 const test=[
  {name:'chain6',n:6,arcs:[[0,1],[1,2],[2,3],[3,4],[4,5]],expectedWidth:1,expectedComparable:15},
  {name:'discrete6',n:6,arcs:[],expectedWidth:6,expectedComparable:0},
  {name:'tree7',n:7,arcs:[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]],expectedWidth:4,expectedComparable:10},
  {name:'star5to1',n:6,arcs:[[0,5],[1,5],[2,5],[3,5],[4,5]],expectedWidth:5,expectedComparable:5},
  {name:'diamond',n:4,arcs:[[0,1],[0,2],[1,3],[2,3]],expectedWidth:2,expectedComparable:5},
 ];
 return test.map(t=>{const s=relation(t.n,t.arcs).stats;
  insist(s.maxAntichainWidth===t.expectedWidth,'null width failed '+t.name);
  insist(s.comparablePairs===t.expectedComparable,'null order failed '+t.name);
  return {name:t.name,arcs:t.arcs,observer:s};});
}
// For n=5, enumerate all 2^(n choose 2) forward DAGs; test whether
// summary interval histogram + width + comparable count is complete for
// unlabeled partial orders, using exact canonical isomorphism separation.
function intervalHistogramCollision(){
 const n=5,pairs=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)pairs.push([i,j]);
 const perms=permutations([0,1,2,3,4]);
 const canonical=r=>{let best=null;
  for(const p of perms){let bits='';
   for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(i!==j)
    bits+=r.before(p[i],p[j])?'1':'0';
   if(best===null||bits<best)best=bits;
  }return best;
 };
 const unique=new Map(),collisionGroups=new Map();
 for(let mask=0;mask<1<<pairs.length;mask++){
  const arcs=pairs.filter((_,i)=>mask&(1<<i)),r=relation(n,arcs);
  const can=canonical(r);
  if(unique.has(can))continue;
  unique.set(can,{arcs,stats:r.stats,canonical:can});
  const k=JSON.stringify({comparablePairs:r.stats.comparablePairs,width:r.stats.maxAntichainWidth,
   histogram:r.stats.intervalInteriorHistogram});
  if(!collisionGroups.has(k))collisionGroups.set(k,[]);
  collisionGroups.get(k).push({arcs,canonical:can,stats:r.stats});
 }
 const collisions=[...collisionGroups].filter(([k,list])=>list.length>1)
  .sort((a,b)=>b[1].length-a[1].length);
 return {labeledForwardDagRepresentations:1<<pairs.length,uniqueUnlabeledPosets:unique.size,
  signatureDefinition:"(comparable pair count, interval-interior cardinality histogram, maximum antichain width)",
  collisionGroups:collisions.length,largestGroup:collisions[0]?.[1].length||0,
  firstCollision:collisions[0]?{signature:JSON.parse(collisions[0][0]),
   examples:collisions[0][1].slice(0,2).map(e=>({generatingArcs:e.arcs,canonicalOrderCertificate:e.canonical,
      ancestorCountHistogram:e.stats.ancestryCountHistogram,sourceEventCount:e.stats.sourceEventCount}))}:null,
  note:"A collision is a strictly weaker observer-loss witness between nonisomorphic partial orders, not merely between hypergraphs projecting to the same order."};
}
function traceOrder(events,initialN,mode){
 const arcs=[],lastTouch=new Map(),n=events.length;
 const add=(p,t)=>{if(p===undefined||p===null)return;insist(Number.isInteger(p)&&p>=0&&p<t,'invalid event dependency '+p+' -> '+t);arcs.push([p,t]);};
 for(let t=0;t<n;t++){
  const e=events[t];insist(e.step===t+1,'noncontiguous event receipt');
  const origin=/^birth(\d+):/.exec(e.origin);
  if(origin)add(Number(origin[1])-1,t);
  const participants=e.participants.map(p=>p[0]);
  for(const participant of participants){
   if(participant>=initialN)add(participant-initialN,t);
   if(mode==='touch'&&lastTouch.has(participant))add(lastTouch.get(participant),t);
  }
  if(mode==='touch')for(const participant of participants)lastTouch.set(participant,t);
 }
 return {arcs:arcs.filter((a,i,all)=>all.findIndex(b=>b[0]===a[0]&&b[1]===a[1])===i),
  dependencyModel:mode,scope:mode==='birth'?'event creates chosen relation OR source node births':
    'birth parents plus last touching event per read participant, conservative read/read ordering'};
}
function replay(source,instrument,ctx,scheduler,horizon){
 const fakeProcess={argv:['node','hypergraph-long-horizon.mjs',String(ctx.k),String(horizon),
  'no-writes','0',String(ctx.id),scheduler,'active']};
 const fs={mkdirSync(){},writeFileSync(){}},path={resolve:x=>x,join:(...x)=>x.join('/')};
 const events=[];const wrapped=new Function('process','fs','path','__trialOptions','__observe',
  instrument(source)+'\nreturn results;');
 const result=wrapped(fakeProcess,fs,path,{},e=>events.push(e));
 insist(result.length===1&&events.length===horizon,'prefix ended early');
 const r=result[0];insist(r.ruleId===ctx.id && r.executedRewrites===horizon,'wrong source run');
 return {events,summary:r};
}
function runT3({source,instrument,horizon=192,schedulers=['fifo','random'], contexts=CONTEXTS,
 traceEnabled=true}={}){
 insist(Number.isInteger(horizon)&&horizon>=16&&horizon<=8000,'bad trace horizon');
 const finite=witness(),nulls=orderNulls(),permutationNull=relabelNulls(),secondLoss=intervalHistogramCollision();
 const trace=[];
 if(traceEnabled){
  insist(typeof source==='string'&&typeof instrument==='function','missing frozen source/instrument');
  for(const ctx of contexts)for(const scheduler of schedulers){
   const {events,summary}=replay(source,instrument,ctx,scheduler,horizon);
   const initialN=ctx.k+(ctx.kind==='overlap'?1:0);
   const b=traceOrder(events,initialN,'birth'),t=traceOrder(events,initialN,'touch');
   const B=relation(horizon,b.arcs).stats,T=relation(horizon,t.arcs).stats;
   insist(T.comparablePairs>=B.comparablePairs,'touch should not lose birth dependency');
   trace.push({k:ctx.k,ruleId:ctx.id,kind:ctx.kind,scheduler,horizon,
     selectedEdgeOriginExamples:events.slice(0,4).map(e=>e.origin),
     sourceSummary:{rewrites:summary.executedRewrites,nodeCount:summary.nodes,
       frontier:summary.eligibleFrontier,liveHyperedges:summary.liveHyperedges,
       recent64Distinct:summary.recent64Distinct,period12:summary.recent64Period12},
     birthOnly:{model:b.dependencyModel,observer:B},
     conservativeTouch:{model:t.dependencyModel,observer:T},
     extraComparablePairs:T.comparablePairs-B.comparablePairs,
     differentOrderViews:T.comparablePairs!==B.comparablePairs||T.maxAntichainWidth!==B.maxAntichainWidth,
     interpretation:"Neither birth-only nor last-touch edges are asserted to exhaust real causal dependencies; only observable derivations under declared choices."});
  }
 }
 return {experiment:"Causal Step T3 order-interval observer loss and provenance-choice sensitivity",
  date:"2026-10-13",status:"exact finite mathematical controls plus finite unchanged-generator source-trace observer replay",
  sourceBlobs:PINNED,scope:{conditionalEventSemantics:"directed joint-source hyperedges are a separate formal test class, not the unordered hyperedge generator",
    derivedEventOrder:"birth links vs conservative last-touch dependencies from history; neither is a physical spacetime metric",
    noBackgroundDimension:true,noEnergyMassQuantumMetric:true},
  finiteWitness:finite,
  orderControls:nulls,exactRelabelControl:permutationNull,
  weakerPosetStatisticsControl:secondLoss,
  generatorTraces:{horizon,numberOfScenarios:trace.length,scenarios:trace,
    distinctObserverPairs:trace.filter(t=>t.differentOrderViews).length,
    caveat:"The trace graph is an investigator-defined observer map from actual k-ary event receipts; the generator itself does not supply a uniquely defined causal event poset."},
  next:["Freeze causal precedence semantics before asserting derived geometry or BD curvature",
    "Compare exact order-only interval observers against k-ary enabling interventions with matched nulls",
    "Only apply 4D causal-set curvature coefficients if four-dimensional manifoldlike regime is independently warranted",
    "Retain period-5 and scheduler-dependent negative results and the two noncollapse/complexity filters",
    "Do not identify antichain width with emergent spatial dimension or causality with a host clock"]};
}
if(typeof module!=='undefined')module.exports={runT3,witness,relation,traceOrder,intervalHistogramCollision};
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
 const base=__dirname;
 const engine=fs.readFileSync(path.join(base,'hypergraph-long-horizon.mjs'),'utf8');
 const t2=fs.readFileSync(path.join(base,'hypergraph-t2-invariance-replay.cjs'),'utf8');
 const csv=fs.readFileSync(path.join(base,'results/2026-10-12-higher-order-long-8000-summary.csv'),'utf8');
 const blob=x=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0'+x).digest('hex');
 insist(blob(engine)===PINNED.engine && blob(t2)===PINNED.harness&&blob(csv)===PINNED.oldSummary,
  'source provenance mismatch');
 const {instrument}=require('./hypergraph-t2-invariance-replay.cjs');
 const horizon=Number(process.argv[2]||192),out=process.argv[3]||path.join(base,'results/2026-10-13-t3-executed-order-observer.json');
 const result=runT3({source:engine,instrument,horizon});
 fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({file:out,horizon,scenarios:result.generatorTraces.numberOfScenarios,
  identicalOrderWitness:result.finiteWitness.identicalFullPartialOrders,
  interventionDifferences:result.finiteWitness.interventions.disagree,
  positiveStatsCollision:result.weakerPosetStatisticsControl.collisionGroups>0}));
}