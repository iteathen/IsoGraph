#!/usr/bin/env node
/**
 * Causal Step: true higher-order hypergraph branching laboratory.
 *
 * This is a NEW, separately scoped experiment, not archived Model A.
 * A primitive hyperedge is an unordered set of >=3 distinct node IDs, and
 * activating it tests the state of ALL participating nodes simultaneously.
 * There is no metric, pairwise spring, gravity, mass, time-dt or dimension cap.
 * One rewrite consumes or retains an activated hyperedge, adds exactly one
 * new node, and creates hyperedges that contain the newborn and >=2 source nodes.
 * Purely finite resource limits censor outcomes; they are not physical rules.
 *
 * Run: node hypergraph-rewrite-lab.mjs sweep 3 128 250 results
 *      node hypergraph-rewrite-lab.mjs sweep 4 128 250 results
 *      node hypergraph-rewrite-lab.mjs sweep 5 128 250 results
 *      node hypergraph-rewrite-lab.mjs controls 0 0 0 results
 *      node hypergraph-rewrite-lab.mjs multi 3 160 250 results
 * node >=18; no external dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';

const args=process.argv.slice(2), phase=args[0]||'sweep';
const k=Number(args[1]||3), ruleCount=Number(args[2]||128), horizon=Number(args[3]||250);
const folder=path.resolve(args[4]||'./hypergraph-results');
if(!['sweep','controls','multi'].includes(phase))throw new Error('Unknown phase');
if(phase!=='controls'&&(![3,4,5].includes(k)||!Number.isSafeInteger(ruleCount)||ruleCount<1||ruleCount>10000||!Number.isSafeInteger(horizon)||horizon<1||horizon>5000))throw new Error('Invalid bounded arguments');
const NODE_LIMIT=2000,EDGE_LIMIT=16000,BUILD_SEED=20261012;

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
function runTrial({initialArity,initialBits,rules,scheduler='fifo',seed=1,limit=250,nodeCap=NODE_LIMIT,edgeCap=EDGE_LIMIT,initialHyperedges=null}){
 const R=rng(seed),nodes=[];
 for(let i=0;i<initialArity;i++)nodes.push({id:i,bit:(initialBits>>i)&1,depth:0});
 let edgeList=[],liveEdges=0,queue=[],head=0,active=0,rewrites=0,totalCreated=0,last50=[],maxDepth=0;
 let finalStatus='limit',stopCause='',rankCounts={};
 function ruleFor(arity){return rules[arity];}
 function addEdge(ids){
  if(ids.length<3)throw new Error('Pairwise relations forbidden in this lab');
  let e={ids:ids.slice().sort((a,b)=>a-b),alive:true,fired:false};
  const edgeID=edgeList.length;edgeList.push(e);liveEdges++;
  rankCounts[ids.length]=(rankCounts[ids.length]||0)+1;
  const rule=ruleFor(ids.length);
  if(rule){
   let ones=0;for(const id of e.ids)ones+=nodes[id].bit;
   if(rule.weights&(1<<ones)){queue.push(edgeID);active++;}
  }
 }
 if(initialHyperedges!==null){for(let ids of initialHyperedges)addEdge(ids);}
 else addEdge(Array.from({length:initialArity},(_,i)=>i));
 function dequeue(){
  if(scheduler==='fifo')return queue[head++];
  if(scheduler==='lifo')return queue.pop();
  const i=Math.floor(R()*queue.length),id=queue[i];
  queue[i]=queue[queue.length-1];queue.pop();return id;
 }
 function backlog(){return scheduler==='fifo'?queue.length-head:queue.length;}
 while(rewrites<limit){
  if(backlog()===0){finalStatus='absorbed';stopCause='no eligible high-order hyperedges';break;}
  // Predetermine child count to avoid partial resource-truncated rewrites.
  const candidateID=scheduler==='fifo'?queue[head]:scheduler==='lifo'?queue.at(-1):null;
  const candidate=candidateID!==null?edgeList[candidateID]:null;
  // For random scheduling, inspect potential capacity after selecting the edge.
  const selected=dequeue(),edge=edgeList[selected],rule=ruleFor(edge.ids.length);
  active--;
  const children=offspringLayers(rule);
  let newEdges=0;for(const r of children)newEdges+=choose(edge.ids.length,r-1);
  if(nodes.length+1>nodeCap||liveEdges-(rule.keep?0:1)+newEdges>edgeCap){
   finalStatus='resource-censored';stopCause=nodes.length+1>nodeCap?'node budget':'hyperedge budget';break;
  }
  edge.fired=true;
  if(!rule.keep){edge.alive=false;liveEdges--;rankCounts[edge.ids.length]--;}
  let ones=0,maxParentDepth=0;
  for(const id of edge.ids){ones+=nodes[id].bit;maxParentDepth=Math.max(maxParentDepth,nodes[id].depth);}
  const newborn={id:nodes.length,bit:newbornState(rule.mode,ones,edge.ids.length),depth:maxParentDepth+1};
  maxDepth=Math.max(maxDepth,newborn.depth);nodes.push(newborn);
  for(const r of children){
   for(const included of combinations(edge.ids,r-1)){
    addEdge([...included,newborn.id]);totalCreated++;
   }
  }
  rewrites++;last50.push(backlog());if(last50.length>50)last50.shift();
 }
 if(rewrites>=limit&&finalStatus==='limit')stopCause='fixed observation horizon';
 const final=rewrites===0&&finalStatus==='absorbed'?'initially-inert':finalStatus;
 const initialRule=rules[initialArity];
 let startWeight=0;for(let i=0;i<initialArity;i++)startWeight+=(initialBits>>i)&1;
 const firstEnabled=initialRule?!!(initialRule.weights&(1<<startWeight)):false;
 const recent=last50.length?last50.reduce((a,b)=>a+b,0)/last50.length:0;
 const first=last50[0]||0,last=last50.at(-1)||0;
 const nearFlat=last50.length>=50&&last>0&&Math.abs(last-first)/Math.max(1,recent)<=0.1;
 return {status:final,stopCause,initialWeight:startWeight,initialEnabled:firstEnabled,
  rewrites,nodes:nodes.length,liveEdges,hyperedgesCreated:totalCreated,activeFrontier:backlog(),
  maxDepth,finalBacklogChange:last-first,nearFlatBacklogWindow:nearFlat,
  count3:rankCounts[3]||0,count4:rankCounts[4]||0,count5:rankCounts[5]||0,count6:rankCounts[6]||0};
}

function csvField(x){return String(x).replaceAll('"','""').includes(',')?'"'+String(x).replaceAll('"','""')+'"':String(x);}
function toCSV(items,columns){return columns.join(',')+'\n'+items.map(x=>columns.map(k=>csvField(x[k]??'')).join(',')).join('\n')+'\n';}
const stats=['status','stopCause','initialWeight','initialEnabled','rewrites','nodes','liveEdges','hyperedgesCreated','activeFrontier','maxDepth','nearFlatBacklogWindow','count3','count4','count5','count6'];
function sweepOne(arity,n,steps){
 const rules=chooseRuleSample(arity,n),trials=[],ruleRecords=[];
 for(let j=0;j<rules.length;j++){
  const rule=rules[j];ruleRecords.push({k:arity,id:j,weights:rule.weights,ranks:rule.ranks,mode:MODES[rule.mode],keep:rule.keep,
    ranksProduced:offspringLayers(rule).join('|'),ranksIncludeInput:offspringLayers(rule).includes(arity)});
  for(let c=0;c<=arity;c++){
   const bits=(1<<c)-1; // canonical unordered binary state multiset
   for(const scheduler of ['fifo','random']){
    const x=runTrial({initialArity:arity,initialBits:bits,rules:{[arity]:rule},scheduler,
     seed:BUILD_SEED+101*j+53*c+arity,limit:steps});
    trials.push({k:arity,rule:j,scheduler,initialOnes:c,...x});
   }
  }
 }
 return {rules:ruleRecords,trials,summary:summarize(trials,'k'+arity),arity};
}
function summarize(rows,name){
 const n=rows.length,absorbed=rows.filter(x=>x.status==='absorbed'||x.status==='initially-inert').length;
 const censored=rows.filter(x=>x.status==='resource-censored').length;
 const horizons=rows.filter(x=>x.status==='limit').length;
 const activeTrials=rows.filter(x=>x.rewrites>0);
 const survived=activeTrials.filter(x=>x.status==='limit').length;
 let terminalMeanDepth=rows.reduce((s,x)=>s+x.maxDepth,0)/n;
 return {name,trials:n,absorbed,resourceCensored:censored,horizonCensored:horizons,
  trialsWithAnyRewrite:activeTrials.length,activeHorizonCensored:survived,
  meanMaxDepth:Number(terminalMeanDepth.toFixed(3)),
  nearFlatBacklogAmongHorizonCensored:rows.filter(x=>x.status==='limit'&&x.nearFlatBacklogWindow).length,
  maxRecordedDepth:Math.max(...rows.map(x=>x.maxDepth)),
  maxRecordedNodes:Math.max(...rows.map(x=>x.nodes))};
}
function nullControl(arity){
 const id=Array.from({length:arity},(_,i)=>i);
 const inputBits=(1<<arity)-1;
 const rule={arity,weights:1<<arity,ranks:1<<(arity-3),mode:1,keep:false};
 const completePairs=[];
 for(const pair of combinations(id,2))completePairs.push(pair);
 const allProper=[];
 for(const proper of combinations(id,arity-1))if(proper.length>=3)allProper.push(proper);
 const high=runTrial({initialArity:arity,initialBits:inputBits,rules:{[arity]:rule},limit:6,initialHyperedges:[id]});
 const low=runTrial({initialArity:arity,initialBits:inputBits,rules:{[arity]:rule},limit:6,initialHyperedges:arity===3?[]:allProper});
 // The 2-section of complete k-hyperedge and all its (k-1)-faces is the same K_k.
 return {k:arity,highOrderInitialRelation:'one genuine k-hyperedge',controlRelation:arity===3?'all pairwise edges only (not entered into high-order engine)':'all proper (k-1)-hyperedges; same K_k 2-section',
  highOrderRewrites:high.rewrites,controlRewrites:low.rewrites,highOrderStatus:high.status,controlStatus:low.status};
}
function multiSample(ruleN,steps){
 const results=[],ruleRecords=[];
 for(let j=0;j<ruleN;j++){
  const rules={};
  for(let r=3;r<=5;r++){
   const all=chooseRuleSample(r,ruleN+10);
   rules[r]=all[(j*17+r*19)%all.length];
  }
  const row={j,rank3weights:rules[3].weights,rank4weights:rules[4].weights,rank5weights:rules[5].weights,
    rank3outputs:rules[3].ranks,rank4outputs:rules[4].ranks,rank5outputs:rules[5].ranks};
  ruleRecords.push(row);
  for(let initialOnes=0;initialOnes<=3;initialOnes++){
   const s=runTrial({initialArity:3,initialBits:(1<<initialOnes)-1,rules,scheduler:j%2?'fifo':'random',
    seed:BUILD_SEED+j*133+initialOnes,limit:steps});
   results.push({rule:j,initialOnes,...s});
  }
 }
 return {rules:ruleRecords,trials:results,summary:summarize(results,'multi-3-4-5')};
}
fs.mkdirSync(folder,{recursive:true});
if(phase==='sweep'){
 const z=sweepOne(k,ruleCount,horizon);
 fs.writeFileSync(path.join(folder,'higher-order-k'+k+'-rules.csv'),toCSV(z.rules,['k','id','weights','ranks','mode','keep','ranksProduced','ranksIncludeInput']));
 fs.writeFileSync(path.join(folder,'higher-order-k'+k+'-trials.csv'),toCSV(z.trials,['k','rule','scheduler','initialOnes',...stats]));
 const report={scheme:'source-independent higher-order hypergraph branching',k,ruleCount:z.rules.length,
  eligibleFiniteSymmetricRules:countHighOrderConfigurations(k),
  conditions:'k-uniform hyperedges, immutable binary node states, one birth per applied rule; rank3+ output including newborn; only k-arity hyperedges fire in fixed-arity sweeps',
  resourceLimits:{nodes:NODE_LIMIT,hyperedges:EDGE_LIMIT,rewrites:horizon},sampling:'seeded uniform-without-replacement over nonempty symmetric rule tables; canonical initial Hamming weights 0..k; FIFO/random scheduler',summary:z.summary};
 fs.writeFileSync(path.join(folder,'higher-order-k'+k+'-summary.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({phase,k,ruleCount,summary:z.summary}));
}else if(phase==='controls'){
 const r=[3,4,5].map(nullControl);
 fs.writeFileSync(path.join(folder,'higher-order-irreducibility-controls.json'),JSON.stringify(r,null,2)+'\n');
 console.log(JSON.stringify({phase,controls:r}));
}else{
 const z=multiSample(ruleCount,horizon);
 fs.writeFileSync(path.join(folder,'higher-order-multi-rules.csv'),toCSV(z.rules,['j','rank3weights','rank4weights','rank5weights','rank3outputs','rank4outputs','rank5outputs']));
 fs.writeFileSync(path.join(folder,'higher-order-multi-trials.csv'),toCSV(z.trials,['rule','initialOnes',...stats]));
 fs.writeFileSync(path.join(folder,'higher-order-multi-summary.json'),JSON.stringify({summary:z.summary,limits:{nodes:NODE_LIMIT,edges:EDGE_LIMIT,rewrites:horizon}},null,2)+'\n');
 console.log(JSON.stringify({phase,summary:z.summary}));
}
