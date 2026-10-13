/**
 * Causal Step / complete Newtonian-ablation source-compatible graph replay.
 * Researcher: Joshua Oshiro. Experimental implementation: AI-assisted.
 * Frozen source blob: 4d7e6f4bb594204afa92534d697a9a32fc3ea9a0
 * No coordinate dimension, x/v/f arrays, spring, mass, dt, rest length,
 * Newtonian force, geometric constraint, energy or momentum concept.
 * Graph path lengths are optional observer diagnostics, NOT spatial physics.
 *
 * Usage: node model-a-no-metric-graph-replay.mjs legacy 3000 ./out
 *        node model-a-no-metric-graph-replay.mjs causal 3000 ./out --limit=9000 --prune=none --edges=30000
 *        node model-a-no-metric-graph-replay.mjs tree 3000 ./out
 *        node model-a-no-metric-graph-replay.mjs causal-local 3000 ./out
 *        node model-a-no-metric-graph-replay.mjs optional-link 1000 ./out --limit=9000 --prune=none
 *        node model-a-no-metric-graph-replay.mjs unlinked 1000 ./out --limit=9000 --prune=none
 */
import fs from 'node:fs';
import path from 'node:path';
import {performance} from 'node:perf_hooks';
const variant=process.argv[2]||'legacy';
const horizon=Number(process.argv[3]||3000);
const folder=path.resolve(process.argv[4]||'./out');
const options=Object.fromEntries(process.argv.slice(5).map(x=>{const q=/^--([a-z]+)=(.+)$/.exec(x);if(!q)throw Error('Bad option: '+x);return [q[1],q[2]];}));
if(!['legacy','causal','tree','causal-local','optional-link','unlinked'].includes(variant))throw Error('Unsupported variant');
if(!Number.isSafeInteger(horizon)||horizon<1||horizon>30000)throw Error('Bad horizon');
const nodeLimit=Number(options.limit||3000),edgeLimit=Number(options.edges||9000);
if(!Number.isSafeInteger(nodeLimit)||nodeLimit<1||nodeLimit>30000||!Number.isSafeInteger(edgeLimit)||edgeLimit<1||edgeLimit>90000)throw Error('Unsafe limits');
const prune=options.prune||'source';
if(!['source','none'].includes(prune))throw Error('Unknown pruning');
const source=options.source||'hash';
if(!['hash','rule30'].includes(source))throw Error('Unknown source');
const cfg={qfWidth:1024,forceRule30:source==='rule30'};
let sourceIndex=0,rule30=new Uint8Array(cfg.qfWidth);
rule30[cfg.qfWidth>>1]=1;
// Verbatim deterministic source functions from frozen historical HTML:
function mix32(x){ x|=0; x^=x>>>16; x=Math.imul(x,0x7feb352d); x^=x>>>15; x=Math.imul(x,0x846ca68b); x^=x>>>16; return x>>>0; }
function qfBit(i,t){ return ((mix32(i ^ Math.imul(t+1,0x9e3779b9) ^ sourceIndex) >>> ((i+t)&31)) & 1); }
function qfWord(t){ let v=0; for(let i=0;i<32;i++) v=(v<<1)|qfBit((i*37+t*13)&(cfg.qfWidth-1),t); return v>>>0; }
function rule30Advance(){
  const next = new Uint8Array(cfg.qfWidth);
  for(let i=1;i<cfg.qfWidth-1;i++){
    const l=rule30[i-1], c=rule30[i], r=rule30[i+1];
    next[i] = (l ^ (c || r)) ? 1 : 0;
  }
  rule30 = next;
}
function sourceWord(t){
  if(!cfg.forceRule30) return qfWord(t);
  rule30Advance();
  let v=0;
  const off=(t*17)&(cfg.qfWidth-1);
  for(let i=0;i<32;i++) v=(v<<1)|rule30[(off+i*13)&(cfg.qfWidth-1)];
  return v>>>0;
}

// ─────────────────────────────────────────────────────────────
// Node / edge constructors — UNCHANGED from v2
// ─────────────────────────────────────────────────────────────

let step=0,nextNodeId=0,nextEdgeId=0,nodes=[],edges=[];
let budgetNodesRemoved=0,budgetEdgesRemoved=0,ageNodesRemoved=0,orphansRemoved=0,oldOldAdded=0;
function makeNode(parent=null){
 const node={id:nextNodeId++,born:step,parent:parent?parent.id:null,age:0,alive:true,depth:parent?parent.depth+1:0};
 nodes.push(node);if(nodes.length>nodeLimit){nodes.shift();budgetNodesRemoved++;}
 return node;
}
function makeEdge(a,b,kind='unit'){
 const edge={id:nextEdgeId++,a:a.id,b:b.id,born:step,kind};
 edges.push(edge);if(edges.length>edgeLimit){edges.shift();budgetEdgesRemoved++;}
 if(kind==='old-old')oldOldAdded++;
 else if(a.born>=b.born)throw Error('Noncausal new-node link');
 else b.depth=Math.max(b.depth,a.depth+1);
 return edge;
}
makeNode();
function selectLocalOther(parent,active,word){
 const near=new Set();
 for(const e of edges){if(e.a===parent.id)near.add(e.b);if(e.b===parent.id)near.add(e.a);}
 const candidates=active.filter(x=>x.id!==parent.id&&near.has(x.id));
 return candidates.length?candidates[(word>>>11)%candidates.length]:null;
}
function grow(){
 step++;
 const active=nodes.filter(n=>n.alive);
 if(!active.length)throw Error('No active nodes; original Reset has a known duplicate-root defect');
 const word=sourceWord(step);
 const parent=active[word%active.length];
 const births=1+((word>>>7)&3)+(cfg.forceRule30?((word>>>3)&1):0)+(((word>>>13)&15)===0?2:0);
 for(let k=0;k<births;k++){
  const independent=variant==='optional-link'||variant==='unlinked';
  const child=makeNode(independent?null:parent);
  if(!independent)makeEdge(parent,child,'unit');
  if(variant!=='tree'&&variant!=='unlinked'&&active.length>3&&((word>>>(k+17))&3)===0){
   const other=variant==='causal-local'?selectLocalOther(parent,active,word):active[(word>>>11)%active.length];
   if(other&&other.id!==parent.id)makeEdge(other,child,'unit');
  }
 }
 if(variant==='legacy'&&active.length>5&&(word&7)===3){
  const x=active[(word>>>3)%active.length],y=active[(word>>>19)%active.length];
  if(x.id!==y.id)makeEdge(x,y,'old-old');
 }
 if(prune==='source'){
  const degrees=new Map(nodes.map(n=>[n.id,0]));
  for(const e of edges){if(degrees.has(e.a))degrees.set(e.a,degrees.get(e.a)+1);if(degrees.has(e.b))degrees.set(e.b,degrees.get(e.b)+1);}
  const before=nodes.length,minBorn=step-900;
  for(const n of nodes){n.age=step-n.born;if(n.born<minBorn&&(degrees.get(n.id)||0)<=1&&n.id!==0)n.alive=false;}
  nodes=nodes.filter(n=>n.alive||n.age<80);
  ageNodesRemoved+=before-nodes.length;
 }
 const live=new Set(nodes.map(n=>n.id)),before=edges.length;
 edges=edges.filter(e=>live.has(e.a)&&live.has(e.b));
 orphansRemoved+=before-edges.length;
 return births;
}
function metrics(){
 const adjacent=new Map(nodes.map(n=>[n.id,[]]));
 let oldOld=0;
 for(const e of edges){if(!adjacent.has(e.a)||!adjacent.has(e.b))throw Error('Orphan');
 adjacent.get(e.a).push(e.b);adjacent.get(e.b).push(e.a);if(e.kind==='old-old')oldOld++;}
 let components=0,largest=0;
 const seen=new Set();
 for(const id of adjacent.keys()){if(seen.has(id))continue;components++;let size=0;const todo=[id];seen.add(id);
  while(todo.length){const x=todo.pop();size++;for(const y of adjacent.get(x)){if(!seen.has(y)){seen.add(y);todo.push(y);}}}
  largest=Math.max(largest,size);
 }
 return {step,nodes:nodes.length,edges:edges.length,components,largest,cycleRank:edges.length-nodes.length+components,oldOldEdges:oldOld,maxCausalDepth:Math.max(0,...nodes.map(n=>n.depth)),rootPresent:adjacent.has(0)};
}
const steps=['step,nodes,edges,births,components,largest,cycle_rank,old_old_edges,causal_depth,root_present'];
const checkpoints=[]; const sampleSteps=new Set([1,50,100,200,250,500,750,900,950,1000,1200,1250,1500,2000,2500,3000,4000,5000]);
let accumulatedMs=0;
for(let i=1;i<=horizon;i++){
 const t=performance.now(),births=grow();accumulatedMs+=performance.now()-t;
 const chk=i===horizon||sampleSteps.has(i),stats=chk?metrics():null;
 if(stats)checkpoints.push(stats);
 steps.push([i,nodes.length,edges.length,births,stats?stats.components:'',stats?stats.largest:'',stats?stats.cycleRank:'',stats?stats.oldOldEdges:'',stats?stats.maxCausalDepth:'',stats?stats.rootPresent:''].join(','));
}
const result={sourceBlob:'4d7e6f4bb594204afa92534d697a9a32fc3ea9a0',variant,source,prune,horizon,nodeLimit,edgeLimit,allNewtonianDynamicsRemoved:true,coordinates:false,spatialDimension:null,budgetNodesRemoved,budgetEdgesRemoved,ageNodesRemoved,orphansRemoved,oldOldAdded,createdNodes:nextNodeId,createdEdges:nextEdgeId,meanUpdateMs:accumulatedMs/horizon,checkpoints};
fs.mkdirSync(folder,{recursive:true});
const stem=path.join(folder,variant+'-'+source+'-'+prune+'-nodes'+nodeLimit+'-'+horizon);
fs.writeFileSync(stem+'-steps.csv',steps.join('\n')+'\n');
fs.writeFileSync(stem+'-summary.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({variant,source,prune,horizon,atEnd:checkpoints.at(-1),budgetNodesRemoved,ageNodesRemoved}));
