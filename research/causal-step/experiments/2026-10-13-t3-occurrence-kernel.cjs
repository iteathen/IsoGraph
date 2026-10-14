#!/usr/bin/env node
'use strict';
/**
 * Causal Step T3 / D1: exact one-step eligible-hyperedge-occurrence kernel.
 * Uses the same source-pinned higher-order rules, without changing the
 * generator or introducing a physical stochastic law.
 *
 * node research/causal-step/experiments/2026-10-13-t3-occurrence-kernel.cjs \
 *      /tmp/t3-kernel-result.json
 */
const PINNED={
 frozenEngine:"87a420edfb3e562d7fcbacf4ca607b1e6952ac08",
 frozenT2Observer:"bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e"};
function insist(p,s){if(!p)throw Error(s)}
const CASES=[
 {k:3,id:4,kind:"single"},{k:3,id:28,kind:"overlap"},
 {k:4,id:0,kind:"single"},{k:4,id:21,kind:"single"},
 {k:5,id:21,kind:"single"},{k:5,id:81,kind:"overlap"},{k:5,id:4,kind:"overlap"}];
function injectSnapshots(source,t2Instrument){
 let s=t2Instrument(source);
 const old="  const normallySelected=index.kth(scheduler==='fifo'?1:Math.floor(rand()*index.total)+1);";
 const extra=old+"\n  if(rewrite<(__trialOptions.sampleSteps||0)){\n"+
  "   const eligible=edges.filter(e=>e.eligible&&!e.fired&&e.alive).map(e=>({"+
  "origin:e.origin,participants:e.ids.map(canon).sort((a,b)=>a-b),rank:e.ids.length}));\n"+
  "   insist(eligible.length===index.total,'eligible snapshot mismatches Fenwick count');\n"+
  "   __kernelObserver({step:rewrite,eligible,rawChosen:edges[normallySelected].origin,"+
  "eligibleCount:index.total});\n  }";
 if(s.split(old).length!==2)throw Error("Pinned instrumentation anchor absent");
 s=s.replace(old,extra);
 return s;
}
function runSource(compiled,ctx,scheduler,options){
 const argv=['node','hypergraph-long-horizon.mjs',String(ctx.k),'3',
  'ignore','0',String(ctx.id),scheduler,'active'];
 const process={argv},fs={mkdirSync(){},writeFileSync(){}},
  path={resolve:x=>x,join:(...p)=>p.join('/')};
 const events=[],snapshots=[];
 const result=compiled(process,fs,path,{...options,sampleSteps:3},
   event=>events.push(event),snap=>snapshots.push(snap),insist);
 insist(result.length===1 && result[0].executedRewrites===3,
    'source three-rewrite prefix did not finish');
 insist(events.length===3 && snapshots.length===3,'snapshot count mismatch');
 for(let i=0;i<3;i++){
  insist(snapshots[i].step===i,'snapshot step mismatch');
  insist(snapshots[i].eligibleCount===snapshots[i].eligible.length,'snapshot eligible mismatch');
  insist(new Set(snapshots[i].eligible.map(x=>x.origin)).size===snapshots[i].eligibleCount,'distinct occurrence key collision');
  insist(snapshots[i].eligible.every(x=>x.rank===ctx.k),'not a native eligible rank-k occurrence');
 }
 return {events,snapshots,summary:result[0]};
}
function permute(n,which){return Array.from({length:n},(_,i)=>which==='rotation'?(i+1)%n:n-i-1)}
function sortedEligible(snapshot){
 return snapshot.eligible.map(x=>JSON.stringify([x.origin,x.rank,x.participants])).sort();
}
function sourceKernel(source,t2Instrument){
 const s=injectSnapshots(source,t2Instrument);
 const compiled=new Function('process','fs','path','__trialOptions','__observe','__kernelObserver','insist',
  s+'\nreturn results;');
 const cases=[];let snapsChecked=0,kernelsEqual=0,rawDifferent=0,firstDifferences=[],minEligible=1e6,maxEligible=0;
 for(const ctx of CASES)for(const scheduler of ['fifo','random']){
  const b=runSource(compiled,ctx,scheduler,{});
  const initialN=ctx.k+(ctx.kind==='overlap'?1:0);
  for(const permutationName of ['rotation','reversal']){
   const mapped=runSource(compiled,ctx,scheduler,
     {permutation:permute(initialN,permutationName),transport:b.events.map(e=>e.origin)});
   const records=[];
   for(let i=0;i<3;i++){
    const a=b.snapshots[i],p=mapped.snapshots[i];
    const sameCount=a.eligibleCount===p.eligibleCount;
    const sameOccurrences=JSON.stringify(sortedEligible(a))===JSON.stringify(sortedEligible(p));
    const kernelsIdentical=sameCount&&sameOccurrences;
    // Exact conditional-uniform distribution after pushforward to immutable source occurrence ids:
    // For every allowed event id, P(event|state)=1/number-of-eligible-occurrences.
    if(!kernelsIdentical)throw Error('Conditional event-occurrence kernel fails '+JSON.stringify({ctx,scheduler,permutationName,step:i}));
    const differentRaw=a.rawChosen!==p.rawChosen;
    snapsChecked++;kernelsEqual++;if(differentRaw){
     rawDifferent++;if(firstDifferences.length<22)firstDifferences.push({k:ctx.k,ruleId:ctx.id,
       scheduler,permutation:permutationName,step:i+1,a:a.rawChosen,b:p.rawChosen});
    }
    minEligible=Math.min(minEligible,a.eligibleCount);
    maxEligible=Math.max(maxEligible,a.eligibleCount);
    records.push({step:i+1,eligibleOccurrenceCount:a.eligibleCount,
      exactConditionalUniformKernel:"1/"+a.eligibleCount+" per selected occurrence",
      sameOccurrenceSupport:true,sameExactUniformKernel:true,
      rawNumberedSelectionDifferent:differentRaw,
      baselineRawSelection:a.rawChosen,relabeledRawSelection:p.rawChosen});
   }
   cases.push({k:ctx.k,ruleId:ctx.id,kind:ctx.kind,scheduler,
    permutation:permutationName,transportedHistoryReplayed:true,steps:records});
  }
 }
 insist(cases.length===28&&snapsChecked===84,'unexpected experiment scope');
 return {source:"unchanged k=3/4/5 high-order original simulator; original T2 instrumentation plus checked observer snapshot insertion",
  sourceBlobs:PINNED,cases,totals:{originalContexts:7,schedulersPerContext:2,
    relabelingChecks:28,conditionalOneStepStatesExamined:snapsChecked,
    exactUniformKernelPushforwardsEqual:kernelsEqual,
    rawIndexedSchedulerSelectionsDifferent:rawDifferent,
    minEligible,maxEligible},
  sampleOfNumberedSchedulerDifferences:firstDifferences,
  conditionalProbabilityMeaning:"mass 1/m assigned to every distinct *eligible hyperedge occurrence*, where m is the actual eligible frontier count; no claim that reality selects events uniformly",
  crucialDifference:"A same-seed random integer rank or first-created FIFO index does not define an equivariant pathwise coupling of the same occurrence; the conditional uniform kernel on the occurrence set does, under a bijection."};
}
function multiplicityWitness(){
 const occurrences=[
 {id:'alpha1',incidence:'a,b,c->x'},{id:'alpha2',incidence:'a,b,c->x'},
 {id:'beta1',incidence:'a,b,d->x'}];
 const quotient=new Map();
 for(const e of occurrences)quotient.set(e.incidence,(quotient.get(e.incidence)||0)+1);
 const q=[...quotient.entries()].map(([incidence,num])=>({incidence,
   actualOccurrenceUniform:{numerator:num,denominator:occurrences.length},
   incorrectDeduplicateThenUniform:{numerator:1,denominator:quotient.size}}));
 insist(q[0].actualOccurrenceUniform.numerator===2&&q[1].actualOccurrenceUniform.numerator===1,'wrong test');
 return {occurrences,eachOccurrenceProbability:'1/3',projection:q,
  result:"Collapsing distinct event occurrences before sampling changes the probability measure on incidence classes (2/3 versus 1/2)."};
}
function runKernel({source,t2Instrument}={}){
 insist(typeof source==='string'&&typeof t2Instrument==='function','missing source');
 return {experiment:'T3 exact source-conditional uniform event occurrence kernel versus raw FIFO/PRNG coupling',
   date:'2026-10-13',
   scope:'mathematical exact per-state conditional measure on currently enabled k-ary hyperedge occurrences; neither a derived stochastic law nor physical randomness',
   generatorChecks:sourceKernel(source,t2Instrument),eventMultiplicity:multiplicityWitness(),
   limitations:['No reweighting of actual source scheduler or editing of the original generator',
     'One-step kernels tested on first three selected event prefixes of seven configurations under both schedulers, with transported histories',
     'Equality of probability kernels conditioned on a state is not equality of sample paths using the same numeric random seed',
     'Possible quantum or physical stochastic rules are not established by uniform event sampling',
     'Multiplicities and event origin provenance must survive any causal representation map']};
}
if(typeof module!=='undefined')module.exports={runKernel};
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
 const root=__dirname;
 const old=fs.readFileSync(path.join(root,'hypergraph-long-horizon.mjs'),'utf8');
 const t2=fs.readFileSync(path.join(root,'hypergraph-t2-invariance-replay.cjs'),'utf8');
 const blob=b=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(b)+'\0'+b).digest('hex');
 insist(blob(old)===PINNED.frozenEngine && blob(t2)===PINNED.frozenT2Observer,'Pinned source mismatch');
 const {instrument}=require('./hypergraph-t2-invariance-replay.cjs');
 const out=process.argv[2]||path.join(root,'results/2026-10-13-t3-occurrence-kernel-exact.json');
 const r=runKernel({source:old,t2Instrument:instrument});
 fs.writeFileSync(out,JSON.stringify(r,null,2)+'\n');
 console.log(JSON.stringify({out,totals:r.generatorChecks.totals}));
}