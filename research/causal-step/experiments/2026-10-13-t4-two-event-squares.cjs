#!/usr/bin/env node
'use strict';
/**
 * T4 operational independence for the frozen higher-order Causal Step engine.
 * Observer snapshots are instrumented into pinned engine source; local state
 * reducer is checked against next full source states before square testing.
 * No physical clock, metric, dimension ceiling or new rewrite law.
 *
 * Reproduce (Node 22):
 * node research/causal-step/experiments/2026-10-13-t4-two-event-squares.cjs 3,4 129 /tmp/t4-k34.json
 * node ... 5 129 /tmp/t4-k5.json
 * Reports are scoped to tested histories, source modes and selected pair
 * samples; no general theorem of confluence or physical causality is claimed.
 */
const PINS={
 engine:"87a420edfb3e562d7fcbacf4ca607b1e6952ac08",
 t2:"bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e",
 historical:"d2d40f87d59a5a94d2df71a69543e521f6ad807f"
};
const CASES=[
 {k:3,id:4,kind:"single"},{k:3,id:28,kind:"overlap"},
 {k:4,id:0,kind:"single"},{k:4,id:21,kind:"single"},
 {k:5,id:21,kind:"single"},{k:5,id:81,kind:"overlap"},
 {k:5,id:4,kind:"overlap"}];
function insist(x,msg){if(!x)throw Error(msg)}
function replaceOne(s,a,b){insist(s.split(a).length===2,"Source anchor not unique: "+a.slice(0,120));return s.replace(a,b)}
function instrumentSnap(engine,t2Instrument){
 let s=t2Instrument(engine);
 const anchor="  const normallySelected=index.kth(scheduler==='fifo'?1:Math.floor(rand()*index.total)+1);";
 const extra=[
 "  if(__captureSteps.has(rewrite))__snapshot({step:rewrite,k:arity,ruleId:spec.ruleId,kind:spec.kind,",
 "   initialN,mutation,scheduler,",
 "   rule:{arity:rule.arity,weights:rule.weights,ranks:rule.ranks,mode:rule.mode,keep:rule.keep},",
 "   nodes:nodes.map((n,i)=>({id:canon(i),bit:n.bit,depth:n.depth})),",
 "   edges:edges.map(e=>({ids:e.ids.map(canon).sort((a,b)=>a-b),origin:e.origin,",
 "    alive:e.alive,fired:e.fired,eligible:e.eligible}))});"
 ].join("\n");
 return replaceOne(s,anchor,extra+"\n"+anchor);
}
function runNative(compiled,ctx,mode,sched,horizon,steps){
 const process={argv:['node','hypergraph-long-horizon.mjs',String(ctx.k),String(horizon),'t4-no-writes',
  '0',String(ctx.id),sched,mode]};
 const fs={mkdirSync(){},writeFileSync(){}},path={resolve:x=>x,join:(...s)=>s.join('/')};
 const snapshots=new Map(),receipts=[];
 const outputs=compiled(process,fs,path,{},e=>receipts.push(e),snap=>snapshots.set(snap.step,snap),new Set(steps));
 insist(outputs.length===1,"Native selected exactly one history");
 insist(outputs[0].executedRewrites===horizon,"Native source trace prematurely ended");
 return {summary:outputs[0],snapshots,receipts};
}
function clone(s){return {
 step:s.step,k:s.k,ruleId:s.ruleId,kind:s.kind,initialN:s.initialN,mutation:s.mutation,rule:{...s.rule},
 nodes:s.nodes.map(n=>({...n})),
 edges:s.edges.map(e=>({...e,ids:e.ids.slice()}))
};}
function choose(n,r){
 const result=[],idx=Array.from({length:r},(_,i)=>i);
 if(r>n)return result;
 while(true){
  result.push(idx.slice());
  let p=r-1;while(p>=0&&idx[p]===n-r+p)p--;
  if(p<0)break;idx[p]++;
  for(let i=p+1;i<r;i++)idx[i]=idx[i-1]+1;
 }
 return result;
}
const MODE=['zero','one','parity','not-parity','majority'];
function newborn(rule,ones,k){
 const mode=rule.mode;
 if(mode===0)return 0;
 if(mode===1)return 1;
 if(mode===2)return ones&1;
 if(mode===3)return 1-(ones&1);
 if(mode===4)return +(2*ones>=k);
 throw Error("Unknown source newborn mode "+mode);
}
function eligibility(s,e){
 if(e.fired||!e.alive||e.ids.length!==s.k)return false;
 const w=e.ids.reduce((sum,id)=>sum+s.nodes[id].bit,0);
 return !!(s.rule.weights&(1<<w));
}
function recount(s){
 for(const e of s.edges)e.eligible=eligibility(s,e);
 return s;
}
function apply(s0,eventOrigin,{historicalNames=false}={}){
 const s=clone(s0);
 const e=s.edges.find(e=>e.origin===eventOrigin);
 insist(!!e,"Selected original event occurrence missing: "+eventOrigin);
 insist(eligibility(s,e),"Selected original event occurrence not eligible: "+eventOrigin);
 const ids=e.ids,ones=ids.reduce((sum,id)=>sum+s.nodes[id].bit,0);
 const maxDepth=Math.max(...ids.map(id=>s.nodes[id].depth));
 const oldBits=ids.map(id=>s.nodes[id].bit);
 e.fired=true;if(!s.rule.keep)e.alive=false;
 for(const id of ids){
  const b=s.nodes[id].bit;let after=b;
  if(s.mutation===1)after=1-b;
  else if(s.mutation===2)after=b^(ones&1);
  else if(s.mutation===3)after=+(2*ones>=s.k);
  else if(s.mutation===4)after=2*ones>=s.k?1-b:b;
  else insist(s.mutation===0,"Unknown source mutation operator");
  s.nodes[id].bit=after;
 }
 const baby=s.nodes.length;
 s.nodes.push({id:baby,bit:newborn(s.rule,ones,s.k),depth:maxDepth+1,bornBy:eventOrigin});
 for(let rank=3;rank<=s.k+1;rank++){
  if(!(s.rule.ranks&(1<<(rank-3))))continue;
  for(const positions of choose(s.k,rank-1)){
   const newIds=[...positions.map(p=>ids[p]),baby].sort((a,b)=>a-b);
   const origin='birth'+(s.step+1)+':'+newIds.join(',');
   insist(!s.edges.some(old=>old.origin===origin),"Source-style event occurrence collision "+origin);
   s.edges.push({ids:newIds,origin,alive:true,fired:false,eligible:false,
     createdBy:eventOrigin});
  }
 }
 s.step++;
 recount(s);
 return {state:s,selected:eventOrigin,ones,
   oldBits,changedOldBits:ids.filter((id,i)=>s.nodes[id].bit!==oldBits[i]),
   sourceParticipantIds:ids.slice(),newbornBit:s.nodes[baby].bit};
}
function rawState(s){
 return JSON.stringify({
  step:s.step,
  rule:s.rule,mutation:s.mutation,
  nodes:s.nodes.map(n=>({id:n.id,bit:n.bit,depth:n.depth})),
  edges:s.edges.map(e=>({ids:e.ids,origin:e.origin,alive:e.alive,
   fired:e.fired,eligible:e.eligible}))
 });
}
function canonState(s,n0){
 // Restrict isomorphism to fixing all preexisting nodes and preexisting
 // occurrences, and swapping only the two newly born nodes by parent event.
 const nodeName=i=>i<n0?String(i):'new@'+s.nodes[i].bornBy;
 insist(s.nodes.slice(n0).every(n=>typeof n.bornBy==='string'),
  "No birth-event provenance for newly created nodes");
 const nodes=s.nodes.map(n=>({key:nodeName(n.id),bit:n.bit,depth:n.depth}))
   .sort((a,b)=>a.key.localeCompare(b.key));
 const edges=s.edges.map(e=>({
  key:e.createdBy?'newEdge@'+e.createdBy+':'+e.ids.map(nodeName).sort().join(','):'existing@'+e.origin,
  participants:e.ids.map(nodeName).sort(),
  alive:e.alive,fired:e.fired,eligible:e.eligible
 })).sort((a,b)=>a.key.localeCompare(b.key));
 insist(new Set(edges.map(e=>e.key)).size===edges.length,
   "Occurrence identity collision; no unjustified quotient allowed");
 return JSON.stringify({nodes,edges});
}
function common(e,f){const F=new Set(f.ids);return e.ids.filter(i=>F.has(i));}
function targetedPair(state,originA,originB){
 const e=state.edges.find(e=>e.origin===originA),f=state.edges.find(e=>e.origin===originB);
 insist(e&&f&&e!==f&&eligibility(state,e)&&eligibility(state,f),"Both initial events must be enabled and distinct");
 const overlap=common(e,f);
 const E=apply(state,e.origin),F=apply(state,f.origin);
 const availableF=eligibility(E.state,E.state.edges.find(x=>x.origin===f.origin));
 const availableE=eligibility(F.state,F.state.edges.find(x=>x.origin===e.origin));
 const sharedWrites=overlap.filter(id=>E.changedOldBits.includes(id)||F.changedOldBits.includes(id));
 let status,nonCommuteReason=null,forward=null,reverse=null;
 if(!availableF||!availableE){
  status="coenabled-but-disabling-conflict";
  nonCommuteReason="At least one originally enabled event is disabled by firing the other first";
 }else{
  forward=apply(E.state,f.origin);
  reverse=apply(F.state,e.origin);
  const left=canonState(forward.state,state.nodes.length),
        right=canonState(reverse.state,state.nodes.length);
  if(left===right)status="commuting-square";
  else {status="two-orders-enabled-but-different-complete-states";
    nonCommuteReason="Different labeled fixed-old-node/canonically newborn-tagged node and/or full hyperedge occurrence state";}
 }
 return {originA:e.origin,originB:f.origin,overlap:overlap.length,overlapIds:overlap,
   sharedWrites:sharedWrites.length,availableFafterE:availableF,availableEafterF:availableE,
   status,nonCommuteReason,oneStepAChanged:E.changedOldBits.length,
   oneStepBChanged:F.changedOldBits.length,
   firstInputWeights:[E.ones,F.ones],
   firstNewbornBits:[E.newbornBit,F.newbornBit],
   ifBoth:{forwardNewbornBits:forward&&[E.newbornBit,forward.newbornBit],
     reverseNewbornBits:reverse&&[F.newbornBit,reverse.newbornBit]}};
}
function candidatePairIndices(state,maxPerGroup=7){
 const ee=state.edges.filter(e=>e.eligible),m=ee.length;
 if(m<2)return {pairs:[],eligible:m,poolSize:m};
 const pool=[],seen=new Set();
 function add(i){if(i>=0&&i<m&&!seen.has(i)){seen.add(i);pool.push(ee[i]);}}
 for(let i=0;i<Math.min(m,28);i++)add(i);
 for(let i=Math.max(0,m-24);i<m;i++)add(i);
 for(let i=0;i<28;i++)add(Math.floor((m-1)*i/27));
 pool.sort((a,b)=>a.origin.localeCompare(b.origin));
 const sets=[[],[],[],[]];
 for(let i=0;i<pool.length;i++)for(let j=i+1;j<pool.length;j++){
  const over=common(pool[i],pool[j]).length;
  const bucket=over===0?0:over===1?1:over===2?2:3;
  if(sets[bucket].length<maxPerGroup)sets[bucket].push([pool[i].origin,pool[j].origin]);
 }
 const pairs=sets.flat();
 return {pairs,eligible:m,poolSize:pool.length,byOverlapSample:sets.map(x=>x.length)};
}
function checkpoints(horizon){
 const points=[0,1,2,3,4,5,6,7,8,15,16,31,32,63,64,95,96,127,128];
 return points.filter(t=>t<horizon);
}
function runT4({engine,t2Instrument,ks=[3,4,5],horizon=129,
 maxPerOverlap=7,schedulers=['fifo','random'],modes=['active','fixed']}={}){
 insist(typeof engine==='string'&&typeof t2Instrument==='function',"Need pinned engine and T2 instrumentation");
 insist(Number.isInteger(horizon)&&horizon>=10&&horizon<=1000,"Bad horizon");
 insist([3,4,5].some(k=>ks.includes(k))&&ks.every(k=>[3,4,5].includes(k)),"Bad k");
 const compiled=new Function('process','fs','path','__trialOptions','__observe','__snapshot','__captureSteps',
  instrumentSnap(engine,t2Instrument)+'\nreturn results;');
 const candidates=CASES.filter(c=>ks.includes(c.k)),checks=checkpoints(horizon),sampleAt=[0,1,2,3,4,8,16,32,64,128].filter(t=>t<horizon);
 const report=[],examples={commuteOverlap:[],conflictOverlap:[],noncommuteOverlap:[],commuteDisjoint:[],noncommuteDisjoint:[]};
 const totals={nativeHistories:0,sourceGoldTransitions:0,goldMismatches:0,
  sourceCheckpoints:0,statesWithTwoEligible:0,concurrentPairsExamined:0,
  commutingSquares:0,disablingConflicts:0,bothEnabledNoncommuting:0,
  disjointPairs:0,disjointCommute:0,disjointNoncommute:0,
  overlapPairs:0,overlapCommute:0,overlapConflict:0,overlapNoncommute:0,
  readOnlyOverlapCommute:0,readOnlyOverlapConflict:0,
  casesWithoutEligiblePair:0,syntheticBaselineRewrites:0};
 for(const c of candidates)for(const scheduler of schedulers)for(const mode of modes){
  const native=runNative(compiled,c,mode,scheduler,horizon,checks);
  totals.nativeHistories++;totals.syntheticBaselineRewrites+=horizon;
  const r={k:c.k,ruleId:c.id,kind:c.kind,scheduler,mutationMode:mode,
    selectedRule:native.summary.rule, mutation:native.summary.mutation,horizon,
    goldChecks:0,pairs:0,stats:{},byCheckpoint:[]};
  const bins=new Map();
  for(const t of checks){
   const s=native.snapshots.get(t);
   insist(s&&s.step===t,"missing frozen snapshot "+t);
   totals.sourceCheckpoints++;
   if(native.snapshots.has(t+1)){
    const event=native.receipts[t];
    insist(event&&event.step===t+1,"missing source occurrence for gold");
    const next=apply(s,event.origin).state;
    const gold=native.snapshots.get(t+1);
    if(rawState(next)!==rawState(gold)){
     totals.goldMismatches++;
     throw Error('Local reducer mismatch to exact original source: '+JSON.stringify({case:c,scheduler,mode,t,
       expected:rawState(gold).slice(0,900),actual:rawState(next).slice(0,900)}));
    }
    totals.sourceGoldTransitions++;r.goldChecks++;
   }
  }
  for(const t of sampleAt){
   const s=native.snapshots.get(t);
   if(!s)continue;
   const candidates=candidatePairIndices(s,maxPerOverlap);
   const entry={t,eligible:candidates.eligible,pool:candidates.poolSize,
     pairs:candidates.pairs.length,overlapBins:candidates.byOverlapSample||[],classified:{}};
   if(candidates.pairs.length>0)totals.statesWithTwoEligible++;
   else totals.casesWithoutEligiblePair++;
   for(const [a,b]of candidates.pairs){
    const q=targetedPair(s,a,b);
    const z=q.overlap?'overlap':'disjoint';
    totals.concurrentPairsExamined++;r.pairs++;bins.set(q.status,(bins.get(q.status)||0)+1);
    entry.classified[q.status]=(entry.classified[q.status]||0)+1;
    if(q.overlap){
     totals.overlapPairs++;
     if(q.status==='commuting-square'){totals.overlapCommute++;
      if(q.sharedWrites===0)totals.readOnlyOverlapCommute++;}
     if(q.status==='coenabled-but-disabling-conflict'){totals.overlapConflict++;
      if(q.sharedWrites===0)totals.readOnlyOverlapConflict++;}
     if(q.status==='two-orders-enabled-but-different-complete-states')totals.overlapNoncommute++;
    }else{
     totals.disjointPairs++;
     if(q.status==='commuting-square')totals.disjointCommute++;
     else totals.disjointNoncommute++;
    }
    if(q.status==='commuting-square')totals.commutingSquares++;
    if(q.status==='coenabled-but-disabling-conflict')totals.disablingConflicts++;
    if(q.status==='two-orders-enabled-but-different-complete-states')totals.bothEnabledNoncommuting++;
    const key=(q.status==='commuting-square'?(z==='overlap'?'commuteOverlap':'commuteDisjoint'):
      q.status==='coenabled-but-disabling-conflict'?'conflictOverlap':
      z==='overlap'?'noncommuteOverlap':'noncommuteDisjoint');
    if(examples[key].length<8)examples[key].push({k:c.k,ruleId:c.id,mode,scheduler,t,...q});
   }
   r.byCheckpoint.push(entry);
  }
  r.stats=Object.fromEntries(bins);
  report.push(r);
 }
 return {experiment:"T4 exact two-rewrite operational independence and event-conflict squares",
  status:"executed scoped combinatorial comparisons with preserved original generator; no new dynamical premise",
  date:"2026-10-13",sourceGitBlobs:PINS,
  equivalence:"same complete node bit/depth state and all live/dead/fired/eligible higher-order occurrence states, holding preexisting node and edge identities fixed while tagging the two newborn identities by their firing parent event occurrence rather than execution position; no incidence deduplication",
  scope:{ks,horizon,selectedPrefixes:sampleAt,maxPairsPerOverlapBucket:maxPerOverlap,
   schedulers,modes,goldValidation:"original source snapshots vs independent local two-step exact reducer at all sampled adjacent stored checkpoints",
   physicalClock:false,coordinates:false,physicalDimension:false,entropyForce:false},
  totals,examples,perCase:report,
  centralDispositions:[
   "A commuting square is an operational *independence witness* for this local two-step intervention and declared full-state observer, not a universal causality theorem.",
   "A coenabled pair may be incompatible: if one disables the other, represent as conflict, not automatically one event temporally preceding the other.",
   "Two operations can remain enabled both ways yet have different complete successor states; do not collapse this into a simple read/write edge or birth ancestry.",
   "Overlapping participants alone never certify dependence: read-only overlaps can commute, contradicting unconditional conservative-touch ordering.",
   "Disjoint participant pairs are a necessary positive locality control; every discovered violation is a potential source-fidelity fault or hidden global interaction.",
   "This experiment cannot yet define a unique global physically correct event partial order or guarantee confluence for arbitrary futures."
  ],
  limitations:["Small sampled concurrently-enabled rank-k pairs from the unchanged finite source histories; not exhaustive states, all rules, or all horizons.",
   "Source 8000-rewrite historical evidence and all earlier T1–T3 findings remain untouched.",
   "The reducer reimplements source local rules independently and must pass source-backed exact one-step full-state comparison before accepting any square.",
   "The choice of fixed preexisting labels / event-born newborn labels is declared equivalence, not a unique canonical representation across arbitrary histories.",
   "Scheduler law, real quantum processes, physical spacetime or dark-sector explanations remain unproved."]};
}
if(typeof module!=='undefined')module.exports={runT4,instrumentSnap,apply,rawState,canonState,targetedPair};
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path'),base=__dirname;
 const engine=fs.readFileSync(path.join(base,'hypergraph-long-horizon.mjs'),'utf8');
 const t2=fs.readFileSync(path.join(base,'hypergraph-t2-invariance-replay.cjs'),'utf8');
 const csv=fs.readFileSync(path.join(base,'results/2026-10-12-higher-order-long-8000-summary.csv'),'utf8');
 const blob=x=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0'+x).digest('hex');
 insist(blob(engine)===PINS.engine&&blob(t2)===PINS.t2&&blob(csv)===PINS.historical,"Frozen source changed");
 const {instrument}=require('./hypergraph-t2-invariance-replay.cjs');
 const ks=(process.argv[2]||'3,4,5').split(',').map(Number),horizon=Number(process.argv[3]||129);
 const dest=process.argv[4]||path.join(base,'results/2026-10-13-t4-squares-'+ks.join('-')+'.json');
 const result=runT4({engine,t2Instrument:instrument,ks,horizon});
 fs.writeFileSync(dest,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({file:dest,totals:result.totals}));
}