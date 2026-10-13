#!/usr/bin/env node
/**
 * Experimental long-horizon control for Causal Step higher-order rewrites.
 * Incidence-indexed/Fenwick scheduler preserves exact k-ary source semantics.
 * Optimization changes search cost, never physical/model dynamics.
 * Reference: hypergraph-complexity-screen.mjs, pinned blob 563d9e93ec1a2610fe60fcbfa17c7d37f326d885.
 * Commands (Node 22+):
 * node hypergraph-long-horizon.mjs 3 400 results 0
 * node hypergraph-long-horizon.mjs 3 5000 results 982451653
 * node hypergraph-long-horizon.mjs 4 5000 results 0
 * node hypergraph-long-horizon.mjs 5 5000 results 0
 * CAUTION: a random-seed change alters scheduler choices only.
 * Every source rule in this experiment forces node birth on successful rewrites;
 * survival and complexity must remain independently assessed.
 */
import fs from 'node:fs';
import path from 'node:path';
const k=Number(process.argv[2]??3), horizon=Number(process.argv[3]??400);
const folder=path.resolve(process.argv[4]||'./long-results'),seedOffset=Number(process.argv[5]??0);
const NODE_LIMIT=12000, EDGE_LIMIT=250000, BUILD_SEED=20261012;
if(![3,4,5].includes(k)||!Number.isSafeInteger(horizon)||horizon<1||horizon>10000||
 !Number.isSafeInteger(seedOffset)||seedOffset<0||seedOffset>1000000000)throw Error('Bad experiment parameters');

// Frozen rewrite family helpers copied from the earlier source:
function rng(seed){
 let s=seed>>>0;
 return ()=>{s=(s+0x6d2b79f5)|0;let x=Math.imul(s^(s>>>15),1|s);x^=x+Math.imul(x^(x>>>7),61|x);return((x^(x>>>14))>>>0)/4294967296;};
}
function choose(n,j){
 if(j<0||j>n)return 0;
 let v=1;for(let a=1;a<=j;a++)v=v*(n-j+a)/a;
 return Math.round(v);
}
function combinations(arr,n){
 let results=[],ix=Array.from({length:n},(_,i)=>i),len=arr.length;
 if(n>len)return results;
 while(true){
  results.push(ix.map(i=>arr[i]));
  let p=n-1;while(p>=0&&ix[p]===len-n+p)p--;
  if(p<0)break;
  ix[p]++;for(let j=p+1;j<n;j++)ix[j]=ix[j-1]+1;
 }
 return results;
}
const MODES=['zero','one','parity','not-parity','majority'];
function newbornState(mode,ones,arity){
 if(mode===0)return 0;
 if(mode===1)return 1;
 if(mode===2)return ones&1;
 if(mode===3)return 1-(ones&1);
 return Number(2*ones>=arity);
}
function countHighOrderConfigurations(arity){
 let inputHyperedgePositions=0,outputHyperedgePositions=0;
 for(let r=3;r<=arity;r++)inputHyperedgePositions+=choose(arity,r);
 for(let r=3;r<=arity+1;r++)outputHyperedgePositions+=choose(arity,r-1);
 return {arity, inputHyperedgePositions, labeledInputHypergraphs:'2^'+inputHyperedgePositions,
  newbornContainingHyperedgePositions:outputHyperedgePositions,
  possibleSubsetsOfNewbornHyperedges:'2^'+outputHyperedgePositions,
  binaryInputNodePatterns:2**arity,
  fullStateLookupTableBinaryExponent:(outputHyperedgePositions+1)*(2**arity),
  symmetricNonemptyRuleFamilies:((2**(arity+1))-1)*((2**(arity-1))-1)*MODES.length*2};
}
function enumerateRules(arity){
 const result=[];
 for(let weights=1;weights<(1<<(arity+1));weights++){
  for(let ranks=1;ranks<(1<<(arity-1));ranks++){
   for(let mode=0;mode<MODES.length;mode++){
    for(let keep=0;keep<2;keep++)result.push({arity,weights,ranks,mode,keep:!!keep});
   }
  }
 }
 return result;
}
function chooseRuleSample(arity,count){
 const rules=enumerateRules(arity),R=rng(BUILD_SEED+997*arity);
 for(let i=rules.length-1;i>0;i--){const j=Math.floor(R()*(i+1)),t=rules[i];rules[i]=rules[j];rules[j]=t;}
 return rules.slice(0,Math.min(count,rules.length));
}
function offspringLayers(rule){
 let levels=[];
 for(let r=3;r<=rule.arity+1;r++)if(rule.ranks&(1<<(r-3)))levels.push(r);
 return levels;
}


function selectCandidateRules(k){
 const all=chooseRuleSample(k,192);
 const candidate=[];
 for(let i=0;i<all.length;i++){
  const rule=all[i],cert=(rule.mode===1&&!!(rule.weights&(1<<k))&&!!(rule.ranks&(1<<(k-3))))||
    (rule.mode===0&&!!(rule.weights&1)&&!!(rule.ranks&(1<<(k-3))));
  candidate.push({ruleId:i,rule,uniformCertificate:!!cert});
 }
 const selected=[...candidate.filter(c=>c.uniformCertificate).slice(0,6),...candidate.filter(c=>!c.uniformCertificate).slice(0,6)];
 if(selected.length!==12)throw Error('Not enough candidates');
 return selected;
}

const CASES={
 3:[{ruleId:4,initial:'zero',kind:'single'},{ruleId:28,initial:'mixed',kind:'overlap'}],
 4:[{ruleId:0,initial:'zero',kind:'single'},{ruleId:21,initial:'mixed',kind:'single'}],
 5:[{ruleId:21,initial:'mixed',kind:'single'},{ruleId:81,initial:'mixed',kind:'overlap'},
    {ruleId:4,initial:'mixed',kind:'overlap'}]
};

class Fenwick{
 constructor(n){this.n=n;this.bits=new Int32Array(n+1);this.total=0;
  this.top=1;while(this.top*2<=n)this.top*=2;}
 add(index,change){
  if(change!==1&&change!==-1)throw Error('Invalid eligible change');
  if(index<0||index>=this.n)throw Error('Index beyond independent resource capacity');
  for(let i=index+1;i<=this.n;i+=i&-i)this.bits[i]+=change;
  this.total+=change;
  if(this.total<0)throw Error('Negative frontier');
 }
 kth(rank){
  if(rank<1||rank>this.total)throw Error('Invalid kth eligible rank');
  let index=0;
  for(let j=this.top;j>0;j>>=1){
   const next=index+j;
   if(next<=this.n&&this.bits[next]<rank){index=next;rank-=this.bits[next];}
  }
  return index; // zero-indexed edge ID
 }
}

function shortPeriod(seq,maxP){
 const window=seq.length;
 if(window<Math.max(16,maxP))return null;
 for(let p=1;p<=maxP;p++){
  let equal=true;
  for(let i=p;i<window;i++)if(seq[i]!==seq[i-p]){equal=false;break;}
  if(equal)return p;
 }
 return null;
}
function diversity(seq,window){
 const tail=seq.slice(-window);
 let trigram=0;
 const grams=new Set();
 for(let i=2;i<tail.length;i++)grams.add(tail[i-2]+'|'+tail[i-1]+'|'+tail[i]);
 trigram=grams.size;
 return {events:tail.length,distinct:new Set(tail).size,trigram,
  period12:shortPeriod(tail,12),period64:tail.length>=128?shortPeriod(tail,64):null,
  period128:tail.length>=256?shortPeriod(tail,128):null};
}

function trial(spec,rule,mutation,scheduler,sourceSeed,limit){
 const arity=spec.k, initialN=arity+(spec.kind==='overlap'?1:0);
 const bits=spec.initial==='zero'?0:spec.initial==='one'?(1<<initialN)-1:(1<<Math.floor(initialN/2))-1;
 const rand=rng(sourceSeed);
 const nodes=Array.from({length:initialN},(_,i)=>({bit:(bits>>i)&1,depth:0}));
 const incident=nodes.map(()=>[]),pairIndex=new Map();
 const levels=offspringLayers(rule),birthEdges=levels.reduce((v,r)=>v+choose(arity,r-1),0);
 const initialCount=spec.kind==='overlap'?initialN:1;
 const createdCap=initialCount+limit*birthEdges+16;
 const index=new Fenwick(createdCap);
 const edges=[];
 let liveEdges=0,maxDepth=0,rewrite=0,flippingEvents=0,overlapEvents=0,reactivationEvents=0,totalReactivated=0;
 let status='horizon-censored',stopCause='observation horizon';
 let currentOnes=nodes.reduce((acc,n)=>acc+n.bit,0);
 const signatures=[],structuralSignatures=[],reactivations=[],checkpoints=[];
 const key=(a,b)=>a<b?a+':'+b:b+':'+a;
 const eligible=(edge)=>{
  if(edge.fired||!edge.alive||edge.ids.length!==arity)return false;
  let weight=0;for(const id of edge.ids)weight+=nodes[id].bit;
  return !!(rule.weights&(1<<weight));
 };
 const setEligible=(edgeID,on)=>{
  const edge=edges[edgeID];const b=!!on;
  if(edge.eligible!==b){edge.eligible=b;index.add(edgeID,b?1:-1);}
 };
 const addEdge=(ids)=>{
  const r=ids.length,id=edges.length;
  if(id>=createdCap)throw Error('Total hyperedge allocation cap exceeded');
  const edge={ids:ids.slice().sort((a,b)=>a-b),alive:true,fired:false,eligible:false};
  edges.push(edge);liveEdges++;
  if(r===arity){
   for(let ii=0;ii<r;ii++){
    incident[edge.ids[ii]].push(id);
    for(let jj=0;jj<ii;jj++){
      const pk=key(edge.ids[ii],edge.ids[jj]);
      if(!pairIndex.has(pk))pairIndex.set(pk,[]);
      pairIndex.get(pk).push(id);
    }
   }
   setEligible(id,eligible(edge));
  }
 };
 if(spec.kind==='overlap'){
  const seeds=Array.from({length:initialN},(_,i)=>i);
  for(const h of combinations(seeds,arity))addEdge(h);
 }else addEdge(Array.from({length:arity},(_,i)=>i));
 const initialEligible=index.total>0;
 const witness=(edgeID)=>{
  const e=edges[edgeID],seen=new Set(),a=e.ids;
  for(let i=0;i<a.length;i++)for(let j=0;j<i;j++){
   const ids=pairIndex.get(key(a[i],a[j]))||[];
   for(let id of ids){
    if(id===edgeID||seen.has(id))continue;
    const other=edges[id];
    if(!other.fired&&other.alive){
      seen.add(id);
      if(seen.size>=8)return 8;
    }
   }
  }
  return seen.size;
 };
 const sample=(final=false)=>{
  const tail64=signatures.slice(-64),recentFlags=reactivations.slice(-64);
  const recentUnique=new Set(tail64).size,reactivation64=recentFlags.filter(Boolean).length;
  const p12=shortPeriod(tail64,12);
  const statusLabel=(!initialEligible&&rewrite===0)?'initially-inert':
    index.total===0?'stopped-rewriting':
    recentUnique>=3&&reactivation64>=2&&p12===null&&tail64.length===64?'structured-dynamics-candidate':
    p12!==null&&recentUnique<=2?'simple-periodic-local-tail':'complexity-unresolved';
  const checkpoint={rewrite,nodes:nodes.length,liveHyperedges:liveEdges,createdHyperedges:edges.length,
    eligibleFrontier:index.total,maxDepth,allNodesFracOne:currentOnes/nodes.length,
    reactivationEvents,totalReactivated,oldOverlapEvents:overlapEvents,flippingEvents,
    recent64Distinct:recentUnique,recent64ReactivationEvents:reactivation64,recent64Period12:p12,
    recent256:diversity(signatures,256),recent1024:diversity(signatures,1024),
    statusLabel, sampleEnd:final};
  checkpoints.push(checkpoint);
  return checkpoint;
 };
 sample();
 while(rewrite<limit){
  if(index.total===0){status=rewrite===0?'initially-inert':'stopped-rewriting';stopCause='no eligible higher-order hyperedges';break;}
  if(nodes.length+1>NODE_LIMIT||liveEdges-(rule.keep?0:1)+birthEdges>EDGE_LIMIT||
   edges.length+birthEdges>createdCap){
   status='resource-censored';stopCause='independent node/hyperedge budget';break;
  }
  const selected=index.kth(scheduler==='fifo'?1:Math.floor(rand()*index.total)+1);
  const e=edges[selected];
  if(!e.eligible||e.fired||!e.alive)throw Error('Eligible edge index inconsistent');
  const overlap=witness(selected);
  if(overlap>0)overlapEvents++;
  let ones=0,parentDepth=0;
  for(const id of e.ids){ones+=nodes[id].bit;parentDepth=Math.max(parentDepth,nodes[id].depth);}
  e.fired=true;setEligible(selected,false);
  if(!rule.keep){e.alive=false;liveEdges--;}
  let changed=0,changedIDs=[];
  if(mutation){
   for(const id of e.ids){
    const old=nodes[id].bit;
    let after=old;
    if(mutation===1)after=1-old;
    else if(mutation===2)after=old^(ones&1);
    else if(mutation===3)after=Number(2*ones>=arity);
    else if(mutation===4)after=2*ones>=arity?1-old:old;
    if(old!==after){nodes[id].bit=after;currentOnes+=after-old;changed++;changedIDs.push(id);}
   }
  }
  if(changed)flippingEvents++;
  const affected=new Set();for(const id of changedIDs)for(const target of incident[id])affected.add(target);
  let reactivated=0;
  for(const id of affected){
   const edge=edges[id];
   if(edge.fired||!edge.alive)continue;
   const before=edge.eligible,after=eligible(edge);
   if(before!==after){setEligible(id,after);if(!before&&after)reactivated++;}
  }
  if(reactivated>0){reactivationEvents++;totalReactivated+=reactivated;}
  const newborn=newbornState(rule.mode,ones,arity);
  const id=nodes.length;
  maxDepth=Math.max(maxDepth,parentDepth+1);
  nodes.push({bit:newborn,depth:parentDepth+1});incident.push([]);currentOnes+=newborn;
  for(const r of levels)for(const chosen of combinations(e.ids,r-1))addEdge([...chosen,id]);
  const local=[ones,newborn,changed,reactivated>0?1:0].join(':');
  const bucket=overlap===0?0:overlap===1?1:overlap<=3?2:overlap<=7?3:4;
  signatures.push(local);structuralSignatures.push(local+':'+bucket);reactivations.push(reactivated>0);
  rewrite++;
  if(rewrite===400||rewrite===1200||rewrite===2000||rewrite===3000||rewrite===5000||rewrite===7500||rewrite===10000||rewrite%500===0)sample();
 }
 const last=checkpoints.at(-1);
 if(last.rewrite!==rewrite)sample(true);else last.sampleEnd=true;
 const recent=diversity(signatures,Math.min(signatures.length,256));
 return {k:arity,ruleId:spec.ruleId,rule:{weights:rule.weights,ranks:rule.ranks,mode:MODES[rule.mode],keep:rule.keep},
  initial:spec.initial,initialBits:bits,kind:spec.kind,mutation,scheduler,seed:sourceSeed,
  requestedHorizon:limit, executedRewrites:rewrite,status,stopCause,
  nodes:nodes.length,liveHyperedges:liveEdges,createdHyperedges:edges.length,eligibleFrontier:index.total,
  depth:maxDepth,oldEdgeReactivationEvents:reactivationEvents,totalOldReactivated:totalReactivated,
  oldOverlapEvents:overlapEvents,nodeBitChangeEvents:flippingEvents,
  uniqueEventSignatures:new Set(signatures).size,uniqueContextSignatures:new Set(structuralSignatures).size,
  recent256:recent,recent64Distinct:new Set(signatures.slice(-64)).size,
  recent64ReactivationEvents:reactivations.slice(-64).filter(Boolean).length,
  recent64Period12:shortPeriod(signatures.slice(-64),12),
  firstSignatures:signatures.slice(0,6).join('|'),lastSignatures:signatures.slice(-6).join('|'),
  checkpoints};
}
const candidates=selectCandidateRules(k),results=[];
for(const spec of CASES[k]){
 const candidate=candidates.find(x=>x.ruleId===spec.ruleId);
 if(!candidate)throw Error('Selected candidate not in reference sample');
 const n=k+(spec.kind==='overlap'?1:0);
 const bits=spec.initial==='zero'?0:spec.initial==='one'?(1<<n)-1:(1<<Math.floor(n/2))-1;
 for(const scheduler of ['fifo','random'])for(const mutation of [0,1+(spec.ruleId%4)]){
  const seed=BUILD_SEED+spec.ruleId*113+k*17+bits+seedOffset;
  results.push(trial({...spec,k},candidate.rule,mutation,scheduler,seed,horizon));
 }
}
const meta={experiment:'long-horizon higher-order complexity screen, exact event selection optimized using Fenwick+incidence index',
 originSourceSha:'563d9e93ec1a2610fe60fcbfa17c7d37f326d885',
 k,horizon,seedOffset,limits:{nodes:NODE_LIMIT,liveEdges:EDGE_LIMIT},runs:results.length};
const destination='higher-order-long-k'+k+'-h'+horizon+'-seed'+seedOffset;
fs.mkdirSync(folder,{recursive:true});
fs.writeFileSync(path.join(folder,destination+'.json'),JSON.stringify({...meta,runs:results},null,2)+'\n');
const concise=results.map(r=>({k:r.k,id:r.ruleId,initial:r.initial,kind:r.kind,schedule:r.scheduler,mut:r.mutation,
 status:r.status,rewrites:r.executedRewrites,frontier:r.eligibleFrontier,nodes:r.nodes,liveEdges:r.liveHyperedges,
 recent64:r.recent64Distinct,recentReactivation:r.recent64ReactivationEvents,
 p12:r.recent64Period12,recent256Unique:r.recent256.distinct,recent256Trigrams:r.recent256.trigram,
 p128:r.recent256.period128,reactivatedTotal:r.totalOldReactivated,depth:r.depth}));
console.log(JSON.stringify({meta,concise}));
