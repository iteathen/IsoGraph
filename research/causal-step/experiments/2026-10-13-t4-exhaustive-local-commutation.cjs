#!/usr/bin/env node
'use strict';
/**
 * Causal Step T4 exact exhaustive finite initial-state intervention sweep.
 * Frozen rule coefficients are recovered from unmodified source snapshots;
 * no new physics, rules, or imposed dimension. Exhaustive only over the
 * explicitly specified k+1 complete-overlap, two-disjoint and duplicate
 * initial-incidence families, for all possible binary source states.
 *
 * node .../2026-10-13-t4-exhaustive-local-commutation.cjs /tmp/t4-exact.json
 */
const PINS={engine:"87a420edfb3e562d7fcbacf4ca607b1e6952ac08",
 t2:"bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e",
 historical:"d2d40f87d59a5a94d2df71a69543e521f6ad807f"};
const CONTEXTS=[{k:3,id:4,kind:'single'},{k:3,id:28,kind:'overlap'},
 {k:4,id:0,kind:'single'},{k:4,id:21,kind:'single'},
 {k:5,id:21,kind:'single'},{k:5,id:81,kind:'overlap'},
 {k:5,id:4,kind:'overlap'}];
function check(x,msg){if(!x)throw Error(msg)}
function bitcount(n){let c=0;while(n){n&=n-1;c++;}return c}
function chooses(n,k){
 let all=[],idx=Array.from({length:k},(_,i)=>i);
 if(k>n)return [];
 while(true){all.push(idx.slice());let p=k-1;
  while(p>=0&&idx[p]===n-k+p)p--;if(p<0)break;idx[p]++;
  for(let i=p+1;i<k;i++)idx[i]=idx[i-1]+1;
 }return all;
}
function retrieveOriginalRule(compile,c){
 const p={argv:['node','hypergraph-long-horizon.mjs',String(c.k),'2','none','0',String(c.id),'fifo','active']};
 const out=[],result=compile(p,{mkdirSync(){},writeFileSync(){}},
  {resolve:x=>x,join:(...s)=>s.join('/')},{},()=>{},s=>out.push(s),new Set([0]));
 check(out.length===1&&out[0].k===c.k&&out[0].ruleId===c.id&&result.length===1,"Cannot source native rule");
 return {rule:out[0].rule,activeMutation:out[0].mutation};
}
function fromMask(rule,mutation,k,incidences,mask,family){
 const n=Math.max(...incidences.flat())+1;
 check(n<=10,"finite source count exceeds tested family");
 const edges=incidences.map((ids,i)=>({ids:ids.slice().sort((a,b)=>a-b),
  origin:family==='duplicate'?'occurrence-'+(i+1):'initial:'+ids.slice().sort((a,b)=>a-b).join(','),
  alive:true,fired:false,eligible:false}));
 const state={step:0,k,ruleId:null,kind:family,initialN:n,mutation,rule,
  nodes:Array.from({length:n},(_,i)=>({id:i,bit:(mask>>>i)&1,depth:0})),edges};
 for(const e of edges){
  const ones=e.ids.reduce((s,id)=>s+state.nodes[id].bit,0);
  e.eligible=!!(rule.weights&(1<<ones));
 }
 return state;
}
function runExhaustive({engine,t2Instrument,t4,includeDisjoint=true}={}){
 check(typeof engine==='string'&&typeof t2Instrument==='function'&&t4?.targetedPair,"No source code");
 const compile=new Function('process','fs','path','__trialOptions','__observe','__snapshot','__captureSteps',
    t4.instrumentSnap(engine,t2Instrument)+'\nreturn results;');
 const summary={contexts:CONTEXTS.length,ruleModes:0,exhaustiveInputStates:0,coenabledPairs:0,
    commuting:0,disabling:0,bothEnabledDifferent:0,
    overlapStates:0,overlapCoenabled:0,overlapCommuting:0,overlapBlocking:0,overlapOrderSensitive:0,
    disjointStates:0,disjointCoenabled:0,disjointCommuting:0,disjointNoncommuting:0,
    duplicateStates:0,duplicateCoenabled:0,duplicateCommuting:0,duplicateBlocking:0,duplicateOrderSensitive:0,
    stateDependentPairSignatures:0,caseRuleSubsets:[]},examples={stateDependent:[],commuteOverlap:[],disablingOverlap:[],
       orderSensitiveOverlap:[],disjointCounterexample:[],duplicate:[]};
 const cases=[];
 for(const c of CONTEXTS){
  const sourced=retrieveOriginalRule(compile,c);
  for(const mode of ['active','fixed']){
   const mutation=mode==='active'?sourced.activeMutation:0;
   const families=[
     {name:'complete-overlap',n:c.k+1,edges:chooses(c.k+1,c.k)},
     {name:'duplicate',n:c.k,edges:[Array.from({length:c.k},(_,i)=>i),Array.from({length:c.k},(_,i)=>i)]}
   ];
   if(includeDisjoint)families.push({name:'disjoint',n:2*c.k,
     edges:[Array.from({length:c.k},(_,i)=>i),Array.from({length:c.k},(_,i)=>i+c.k)]});
   const report={k:c.k,ruleId:c.id,rule:sourced.rule,mutation,mode,families:[]};
   summary.ruleModes++;
   for(const fam of families){
    const rec={name:fam.name,inputBinaryAssignments:1<<fam.n,pairsInitiallyEnabled:0,
      commuting:0,disabling:0,bothEnabledDifferent:0,pairStatusByMask:[]};
    const statuses=new Map();
    for(let mask=0;mask<(1<<fam.n);mask++){
     const state=fromMask(sourced.rule,mutation,c.k,fam.edges,mask,fam.name);
     summary.exhaustiveInputStates++;
     const eligible=state.edges.filter(e=>e.eligible);
     const these=[];
     for(let i=0;i<eligible.length;i++)for(let j=i+1;j<eligible.length;j++){
      const q=t4.targetedPair(state,eligible[i].origin,eligible[j].origin);
      const pairLabel=eligible[i].origin+'|'+eligible[j].origin;
      if(!statuses.has(pairLabel))statuses.set(pairLabel,new Set());
      statuses.get(pairLabel).add(q.status);
      const record={mask,ones:bitcount(mask),pair:pairLabel,status:q.status,
       overlap:q.overlap,sharedWrites:q.sharedWrites,
       fAfterE:q.availableFafterE,eAfterF:q.availableEafterF};
      these.push(record);rec.pairsInitiallyEnabled++;summary.coenabledPairs++;
      if(q.status==='commuting-square'){rec.commuting++;summary.commuting++;}
      if(q.status==='coenabled-but-disabling-conflict'){rec.disabling++;summary.disabling++;}
      if(q.status==='two-orders-enabled-but-different-complete-states'){rec.bothEnabledDifferent++;summary.bothEnabledDifferent++;}
      let dest=null;
      if(fam.name==='complete-overlap'){
       summary.overlapCoenabled++;
       if(q.status==='commuting-square'){summary.overlapCommuting++;dest='commuteOverlap';}
       else if(q.status==='coenabled-but-disabling-conflict'){summary.overlapBlocking++;dest='disablingOverlap';}
       else {summary.overlapOrderSensitive++;dest='orderSensitiveOverlap';}
      }else if(fam.name==='disjoint'){
       summary.disjointCoenabled++;
       if(q.status==='commuting-square')summary.disjointCommuting++;
       else {summary.disjointNoncommuting++;dest='disjointCounterexample';}
      }else{
       summary.duplicateCoenabled++;
       if(q.status==='commuting-square')summary.duplicateCommuting++;
       else if(q.status==='coenabled-but-disabling-conflict')summary.duplicateBlocking++;
       else summary.duplicateOrderSensitive++;
       dest='duplicate';
      }
      if(dest&&examples[dest].length<9)examples[dest].push({k:c.k,id:c.id,mode,family:fam.name,...record});
     }
     if(these.length && rec.pairStatusByMask.length<8)
      rec.pairStatusByMask.push({mask,coenabled:these.length,status:these.map(x=>x.status)});
    }
    summary[fam.name==='complete-overlap'?'overlapStates':fam.name==='disjoint'?'disjointStates':'duplicateStates']+=(1<<fam.n);
    const variable=[...statuses].filter(([name,set])=>set.size>1);
    summary.stateDependentPairSignatures+=variable.length;
    if(variable.length&&examples.stateDependent.length<8){
     const v=variable[0];examples.stateDependent.push({k:c.k,id:c.id,mode,family:fam.name,
      pair:v[0],possibleStatuses:[...v[1]],note:'same typed incidences and rule coefficients, but different binary participant-state assignments'});
    }
    rec.dynamicStatusPairs=variable.length;
    delete rec.pairStatusByMask; // no selective sample hides actual counts; retain compact audit counts.
    report.families.push(rec);
   }
   cases.push(report);
  }
 }
 check(summary.commuting+summary.disabling+summary.bothEnabledDifferent===summary.coenabledPairs,"summary partitions disagree");
 check(summary.disjointNoncommuting===0,"Expected disjoint control fails");
 return {experiment:"T4 exhaustive finite same-rule operational commute, conflict, dynamic independence tests",
  status:"executed mathematically exhaustive on listed finite initial-incidence and binary-state families",
  sourceBlobs:PINS,category:"source-faithful local-rule operator applied to explicit counterfactual initial states; not a changed published source history",
  scope:{ruleCoefficients:"retrieved from pinned native engine, not hand-entered",families:[
   "all k+1 choose k overlapping initial rank-k occurrences on k+1 vertices for all 2^(k+1) binary source assignments",
   "two disjoint rank-k occurrences on 2k vertices for all 2^(2k) assignments",
   "two distinct duplicate-occurrence rank-k incidences on k vertices for all 2^k assignments"],
   ruleModes:["original selected active mutation","frozen selected rule with mutation disabled as control"],
   constraints:["k=3,4,5 are finite prior experimental scopes, not physical dimension/rank ceilings",
    "Every pair case is conditioned on both source occurrences already being enabled",
    "Original simulator source rules unchanged; born-node names translated by selected event occurrence for two-order equivalence"]},
  summary,examples,perCase:cases,
  conclusions:["A fixed static independence relation based only on event incidence and source rule identity can fail if the same coenabled occurrence pair commutes in one source-bit state but conflicts in another.",
   "Overlapping read-only active hyperedges can commute, so shared-participant touch is not sufficient for causal precedence.",
   "Disjoint simultaneous source operations provide an exact positive locality control in all enumerated allowed binary assignments.",
   "Duplicate incidence does not imply the same event occurrence; both identity and multiplicity must survive causal comparison.",
   "Exhaustive quantification is over only the stated small initial families and selected 7 source rules; not over all reachable graphs or all higher-order rules."]};
}
if(typeof module!=='undefined')module.exports={runExhaustive};
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path'),base=__dirname;
 const engine=fs.readFileSync(path.join(base,'hypergraph-long-horizon.mjs'),'utf8');
 const t2=fs.readFileSync(path.join(base,'hypergraph-t2-invariance-replay.cjs'),'utf8');
 const historic=fs.readFileSync(path.join(base,'results/2026-10-12-higher-order-long-8000-summary.csv'),'utf8');
 const blob=x=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0'+x).digest('hex');
 check(blob(engine)===PINS.engine&&blob(t2)===PINS.t2&&blob(historic)===PINS.historical,'Original source drift');
 const t4=require('./2026-10-13-t4-two-event-squares.cjs'),{instrument}=require('./hypergraph-t2-invariance-replay.cjs');
 const dest=process.argv[2]||path.join(base,'results/2026-10-13-t4-exhaustive-local-commutation.json');
 const r=runExhaustive({engine,t2Instrument:instrument,t4});
 fs.writeFileSync(dest,JSON.stringify(r,null,2)+'\n');
 console.log(JSON.stringify({file:dest,summary:r.summary}));
}