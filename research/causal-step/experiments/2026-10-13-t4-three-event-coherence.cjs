#!/usr/bin/env node
'use strict';
/**
 * Causal Step T4 third-order composition / coherence: source-pinned sampled
 * rule coefficients, exhaustive complete k-uniform incidence on k+1 nodes,
 * all binary participant states, triples of initially enabled occurrences.
 * Tests whether pairwise commuting squares at one state suffice to make
 * all six 3-event permutations valid and observationally identical.
 * NOT a fundamental physical arity ceiling or a proof for all reachable states.
 */
const PIN={engine:"87a420edfb3e562d7fcbacf4ca607b1e6952ac08",
 t2:"bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e",
 oldCSV:"d2d40f87d59a5a94d2df71a69543e521f6ad807f"};
const CONTEXTS=[{k:3,id:4},{k:3,id:28},{k:4,id:0},{k:4,id:21},{k:5,id:21},{k:5,id:81},{k:5,id:4}];
function assert(c,m){if(!c)throw Error(m)}
function choose(n,k){
 const arr=[],i=Array.from({length:k},(_,j)=>j);
 while(true){
  arr.push(i.slice());let j=k-1;
  while(j>=0&&i[j]===n-k+j)j--;
  if(j<0)break;i[j]++;for(let m=j+1;m<k;m++)i[m]=i[m-1]+1;
 }
 return arr;
}
function allOrders(ids){
 if(!ids.length)return [[]];
 return ids.flatMap((x,i)=>allOrders(ids.filter((_,j)=>i!==j)).map(y=>[x,...y]));
}
function retrieveRule(compiled,c){
 const proc={argv:['node','hypergraph-long-horizon.mjs',String(c.k),'2','none','0',String(c.id),'fifo','active']};
 const snaps=[];
 const result=compiled(proc,{mkdirSync(){},writeFileSync(){}},{resolve:x=>x,join:(...s)=>s.join('/')},{},
  ()=>{},s=>snaps.push(s),new Set([0]));
 assert(result.length===1&&snaps.length===1,"no source-sample rule");
 return {rule:snaps[0].rule,mutation:snaps[0].mutation};
}
function makeState(c,rule,mutation,mask){
 const n=c.k+1,ed=choose(n,c.k).map(ids=>({ids,
   origin:'initial:'+ids.join(','),alive:true,fired:false,eligible:false}));
 const ns=Array.from({length:n},(_,i)=>({id:i,bit:(mask>>>i)&1,depth:0}));
 const state={step:0,k:c.k,ruleId:c.id,kind:'complete-overlap',initialN:n,
  mutation,rule,nodes:ns,edges:ed};
 for(const e of ed){const wt=e.ids.reduce((sum,i)=>sum+ns[i].bit,0);
  e.eligible=!!(rule.weights&(1<<wt));}
 return state;
}
function evaluate({engine,t2Instrument,t4}={}){
 assert(engine&&t2Instrument&&t4?.apply,"Need pinned original engine and T4 observer");
 const compiled=new Function('process','fs','path','__trialOptions','__observe','__snapshot','__captureSteps',
  t4.instrumentSnap(engine,t2Instrument)+'\nreturn results;');
 const totals={ruleModes:0,binaryInitialStates:0,coenabledTriples:0,
  initiallyPairwiseAllCommutingTriples:0,initiallyNotAllPairwiseCommutingTriples:0,
  threeEventOrderPermutationsTried:0,threeEventOrderPathsLegallyComplete:0,
  pairwiseInitialIndependentButSomeTripleOrderBlocked:0,
  pairwiseInitialIndependentButTripleEndpointsDisagree:0,
  pairwiseInitialIndependentWithAll6Equivalent:0};
 const byCase=[],examples={blocked:[],differentEndpoints:[],allSixEquivalent:[],pairwiseNoncommuting:[]};
 for(const c of CONTEXTS){
  const rule=retrieveRule(compiled,c);
  for(const mode of ['active','fixed']){
   const mutation=mode==='active'?rule.mutation:0;
   const record={k:c.k,ruleId:c.id,mode,mutation,masks:0,coenabledTriples:0,
    initiallyPairwiseCommuting:0,all6Equivalent:0,anyBlocked:0,distinctEndpoints:0};
   totals.ruleModes++;
   for(let mask=0;mask<(1<<(c.k+1));mask++){
    totals.binaryInitialStates++;record.masks++;
    const s=makeState(c,rule.rule,mutation,mask);
    const ee=s.edges.filter(e=>e.eligible);
    if(ee.length<3)continue;
    for(const picks of choose(ee.length,3)){
     const names=picks.map(i=>ee[i].origin);
     const pairs=[[0,1],[0,2],[1,2]].map(([a,b])=>t4.targetedPair(s,names[a],names[b]));
     totals.coenabledTriples++;record.coenabledTriples++;
     const initiallyAll=pairs.every(p=>p.status==='commuting-square');
     if(!initiallyAll){
      totals.initiallyNotAllPairwiseCommutingTriples++;
      if(examples.pairwiseNoncommuting.length<4)examples.pairwiseNoncommuting.push({k:c.k,id:c.id,mode,mask,names,pairStatuses:pairs.map(p=>p.status)});
      continue;
     }
     totals.initiallyPairwiseAllCommutingTriples++;record.initiallyPairwiseCommuting++;
     let blocked=false;const fingerprints=new Set(),firstOutcomes=[];
     for(const order of allOrders(names)){
      totals.threeEventOrderPermutationsTried++;
      let state=s,done=true,blockedAt=null;
      for(const e of order){
       try{state=t4.apply(state,e).state;}
       catch(err){done=false;blockedAt=e;break;}
      }
      if(!done){blocked=true;firstOutcomes.push({order,blockedAt});}
      else{
       totals.threeEventOrderPathsLegallyComplete++;
       const fp=t4.canonState(state,s.nodes.length);
       fingerprints.add(fp);
       firstOutcomes.push({order,ok:true});
      }
     }
     if(blocked){
      totals.pairwiseInitialIndependentButSomeTripleOrderBlocked++;record.anyBlocked++;
      if(examples.blocked.length<8)examples.blocked.push({k:c.k,id:c.id,mode,mask,names,
       initialPairwiseStatus:pairs.map(p=>p.status),routes:firstOutcomes});
     }else if(fingerprints.size!==1){
      totals.pairwiseInitialIndependentButTripleEndpointsDisagree++;record.distinctEndpoints++;
      if(examples.differentEndpoints.length<8)examples.differentEndpoints.push({k:c.k,id:c.id,mode,mask,names,distinctEndpoints:fingerprints.size,
        routes:firstOutcomes});
     }else{
      totals.pairwiseInitialIndependentWithAll6Equivalent++;record.all6Equivalent++;
      if(examples.allSixEquivalent.length<7)examples.allSixEquivalent.push({k:c.k,id:c.id,mode,mask,names});
     }
    }
   }
   byCase.push(record);
  }
 }
 assert(totals.initiallyPairwiseAllCommutingTriples===
  totals.pairwiseInitialIndependentButSomeTripleOrderBlocked+
  totals.pairwiseInitialIndependentButTripleEndpointsDisagree+
  totals.pairwiseInitialIndependentWithAll6Equivalent,'Unclassified triple');
 return {experiment:'T4 genuine three-event coherence against context-dependent pairwise commutation',
  status:'mathematically exhaustive over stated finite initial-incidence/binary-state families; no physical interpretation',
  date:'2026-10-13',sourceBlobs:PIN,
  scope:'all rank-k occurrences on k+1 initial source vertices (k3, k4, k5) for seven pinned original rule contexts, original active and fixed mutation; exact three-event permutations only where all three distinct event occurrences initially enabled',
  nodeNaming:'Old nodes fixed, each newly created event child identified by its original selected parent occurrence rather than host execution index',
  totals,byCase,examples,
  cautions:[
   'Pairwise commuting at a single state need not imply a global partial-order independence theorem; recheck under intervening operations.',
   'This procedure only tests the stated finite initial family and every third-order permutation thereof, not all full k-ary rule histories.',
   'A positive finite six-route diamond does not derive matter/quantum physics or physical causal time.',
   'The frozen source only has one host event at a time; simultaneity means co-enabled alternative operations, not external synchronized time.'
  ]};
}
if(typeof module!=='undefined')module.exports={evaluate};
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),base=__dirname;
 const engine=fs.readFileSync(path.join(base,'hypergraph-long-horizon.mjs'),'utf8');
 const t2=fs.readFileSync(path.join(base,'hypergraph-t2-invariance-replay.cjs'),'utf8');
 const old=fs.readFileSync(path.join(base,'results/2026-10-12-higher-order-long-8000-summary.csv'),'utf8');
 const hash=x=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0'+x).digest('hex');
 assert(hash(engine)===PIN.engine&&hash(t2)===PIN.t2&&hash(old)===PIN.oldCSV,'Source drift');
 const t4=require('./2026-10-13-t4-two-event-squares.cjs'),{instrument}=require('./hypergraph-t2-invariance-replay.cjs');
 const result=evaluate({engine,t2Instrument:instrument,t4}),out=process.argv[2]||path.join(base,'results/2026-10-13-t4-triple-coherence.json');
 fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({file:out,totals:result.totals}));
}