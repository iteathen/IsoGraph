#!/usr/bin/env node
'use strict';
/**
 * T4 adjacent-event dependence observer, no primitive generator edits.
 * Uses frozen T4 adapter and T2-canonical source event receipts. The allowed
 * histories are actual source FIFO/random executions, not invented schedules.
 * Host rewrite indices locate experiment prefixes, not physical time.
 *
 * node .../2026-10-13-t4-adjacent-dependency.cjs 3,4 129 /tmp/t4-adjacent-k34.json
 * node .../2026-10-13-t4-adjacent-dependency.cjs 5 129 /tmp/t4-adjacent-k5.json
 */
const PINNED={
 engine:'87a420edfb3e562d7fcbacf4ca607b1e6952ac08',
 t2:'bb1eefb92fedbd0d4f1b1b6ce6b6839bc35d669e',
 historical:'d2d40f87d59a5a94d2df71a69543e521f6ad807f'
};
const CASES=[
 {k:3,id:4,kind:'single'},{k:3,id:28,kind:'overlap'},
 {k:4,id:0,kind:'single'},{k:4,id:21,kind:'single'},
 {k:5,id:21,kind:'single'},{k:5,id:81,kind:'overlap'},
 {k:5,id:4,kind:'overlap'}];
function requireTrue(x,msg){if(!x)throw Error(msg)}
function runAdjacent({engine,t2Instrument,t4,ks=[3,4,5],horizon=129,
 schedulers=['fifo','random'],modes=['active','fixed']}={}){
 requireTrue(typeof engine==='string'&&typeof t2Instrument==='function'&&t4?.targetedPair,"Need pinned source and adapters");
 requireTrue(Number.isInteger(horizon)&&horizon>=3&&horizon<=1000,"bad horizon");
 requireTrue(ks.length>0&&ks.every(x=>[3,4,5].includes(x)),"bad arities");
 const compiled=new Function('process','fs','path','__trialOptions','__observe','__snapshot','__captureSteps',
   t4.instrumentSnap(engine,t2Instrument)+'\nreturn results;');
 const outcomes=[],examples={
  newlyCreated:[],reactivated:[],preenabledCommutingOverlaps:[],preenabledCommutingDisjoint:[],
  preenabledAsymmetricConflict:[],preenabledOrderDifferent:[]};
 const totals={nativeHistories:0,totalSourceEvents:0,adjacentPairs:0,sourceVerifiedNextStates:0,
  newlyCreatedNextOccurrence:0,oldOccurrenceReactivated:0,
  preEnabledNextEvents:0,preEnabledCommuting:0,preEnabledNoncommuting:0,preEnabledBlocking:0,
  preEnabledCommutingSharedParticipant:0,preEnabledCommutingDisjoint:0,
  preEnabledNoncommutingSharedParticipant:0,preEnabledNoncommutingDisjoint:0,
  naiveTouchWouldOverorder:0,naiveBirthWouldMissOrderSensitivity:0};
 for(const c of CASES.filter(x=>ks.includes(x.k)))for(const scheduler of schedulers)for(const mode of modes){
  const argv=['node','hypergraph-long-horizon.mjs',String(c.k),String(horizon),
   'none','0',String(c.id),scheduler,mode],proc={argv};
  const file={mkdirSync(){},writeFileSync(){}},path={resolve:x=>x,join:(...x)=>x.join('/')};
  const snap=[],receipts=[];
  const result=compiled(proc,file,path,{},e=>receipts.push(e),s=>snap[s.step]=s,
   new Set(Array.from({length:horizon},(_,i)=>i)));
  requireTrue(result.length===1&&result[0].executedRewrites===horizon,"native source stopped unexpectedly");
  requireTrue(snap.length===horizon&&receipts.length===horizon,"source snapshot count mismatch");
  const r={k:c.k,id:c.id,kind:c.kind,scheduler,mode,mutation:result[0].mutation,
   nativeRewrites:result[0].executedRewrites,classified:[],checks:0,stats:{}};
  const counts=new Map();
  totals.nativeHistories++;totals.totalSourceEvents+=horizon;
  for(let i=0;i<horizon-1;i++){
   const s=snap[i],next=snap[i+1],first=receipts[i],second=receipts[i+1];
   requireTrue(s&&next&&first&&second&&s.step===i&&next.step===i+1,"invalid source trace");
   const gold=t4.apply(s,first.origin);
   requireTrue(t4.rawState(gold.state)===t4.rawState(next),
     "T4 local rule fails source next-state agreement at "+JSON.stringify({c,scheduler,mode,i}));
   totals.sourceVerifiedNextStates++;r.checks++;
   const f=s.edges.find(x=>x.origin===second.origin);
   let entry={step:i+1,first:first.origin,second:second.origin,
      secondInitiallyExists:!!f,secondInitiallyEnabled:!!f&&f.eligible,
      overlap:null,status:null,classification:null};
   let bucket;
   if(!f){
    bucket='newly-created-occurrence';
    // Every newborn-produced edge origin is from the immediately prior event, unless
    // a different mechanism was discovered in the original source.
    requireTrue(second.origin.startsWith('birth'+(i+1)+':'),
      "second was absent from prefix but not just born from prior event");
    totals.newlyCreatedNextOccurrence++;
   }else if(!f.eligible){
    bucket='previously-ineligible-occurrence-activated';
    totals.oldOccurrenceReactivated++;
   }else{
    totals.preEnabledNextEvents++;
    const pair=t4.targetedPair(s,first.origin,second.origin);
    entry.overlap=pair.overlap;
    entry.status=pair.status;
    if(pair.status==='commuting-square'){
     bucket='preenabled-commuting';
     totals.preEnabledCommuting++;
     if(pair.overlap>0){totals.preEnabledCommutingSharedParticipant++;totals.naiveTouchWouldOverorder++;}
     else totals.preEnabledCommutingDisjoint++;
    }else if(pair.status==='coenabled-but-disabling-conflict'){
     bucket='preenabled-asymmetric-conflict';
     totals.preEnabledBlocking++;
     totals.naiveBirthWouldMissOrderSensitivity++;
    }else{
     bucket='preenabled-both-orders-enabled-but-different-outcome';
     totals.preEnabledNoncommuting++;
     totals.naiveBirthWouldMissOrderSensitivity++;
     if(pair.overlap>0)totals.preEnabledNoncommutingSharedParticipant++;
     else totals.preEnabledNoncommutingDisjoint++;
    }
    if((pair.status==='commuting-square'&&pair.overlap>0)&&examples.preenabledCommutingOverlaps.length<8)
     examples.preenabledCommutingOverlaps.push({k:c.k,id:c.id,mode,scheduler,...entry});
    if((pair.status==='commuting-square'&&!pair.overlap)&&examples.preenabledCommutingDisjoint.length<8)
     examples.preenabledCommutingDisjoint.push({k:c.k,id:c.id,mode,scheduler,...entry});
    if(pair.status==='coenabled-but-disabling-conflict'&&examples.preenabledAsymmetricConflict.length<8)
     examples.preenabledAsymmetricConflict.push({k:c.k,id:c.id,mode,scheduler,...entry});
    if(pair.status==='two-orders-enabled-but-different-complete-states'&&examples.preenabledOrderDifferent.length<8)
     examples.preenabledOrderDifferent.push({k:c.k,id:c.id,mode,scheduler,...entry});
   }
   entry.classification=bucket;
   if(bucket==='newly-created-occurrence'&&examples.newlyCreated.length<5)examples.newlyCreated.push({k:c.k,id:c.id,mode,scheduler,...entry});
   if(bucket==='previously-ineligible-occurrence-activated'&&examples.reactivated.length<5)examples.reactivated.push({k:c.k,id:c.id,mode,scheduler,...entry});
   counts.set(bucket,(counts.get(bucket)||0)+1);totals.adjacentPairs++;
  }
  r.stats=Object.fromEntries(counts);outcomes.push(r);
 }
 requireTrue(totals.adjacentPairs===totals.nativeHistories*(horizon-1),"adjacent coverage not complete");
 requireTrue(totals.adjacentPairs===totals.newlyCreatedNextOccurrence+totals.oldOccurrenceReactivated+
   totals.preEnabledNextEvents,"adjacent decomposition not complete");
 requireTrue(totals.preEnabledNextEvents===totals.preEnabledCommuting+
   totals.preEnabledBlocking+totals.preEnabledNoncommuting,"pre-enabled decomposition inconsistent");
 return {experiment:"Causal Step T4 adjacent actual-event pair causal-enable and commutation classification",
  asOf:"2026-10-13",sourceGitBlobs:PINNED,
  status:"bounded observer research over actual frozen source traces, not a unique physical causal order",
  scope:{ks,horizon,schedulers,modes,
   comparison:"first and second actual consecutive source events; second exists and enabled already vs newly created vs reactivated; only if pre-enabled test both possible event orders for full-state convergence",
   sourceAdapter:"same exact source-backed local reducer as separate full two-event square experiment"},
  totals,perCase:outcomes,examples,
  warnings:[
   "A newly created occurrence is necessarily after its producer in this trace, but birth is insufficient to capture all state-dependent consequences.",
   "Reactivation is a measured conditional cause for an immediately consecutive event, not a theorem that all future activation orders are unique.",
   "A commuting pair with shared read participants disproves treating every touch as intrinsic causal precedence.",
   "A noncommuting pair that was already enabled demonstrates order-sensitive choice, not an unconditionally mandatory arrow from its historical first event to its second.",
   "Conflict is not itself a temporal order; alternative mutually exclusive continuations must be preserved as alternatives.",
   "Selected pair counts are conditional on the existing FIFO/random histories and active/fixed mutation controls."
  ]};
}
if(typeof module!=='undefined')module.exports={runAdjacent};
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),base=__dirname;
 const old=fs.readFileSync(path.join(base,'hypergraph-long-horizon.mjs'),'utf8');
 const t2=fs.readFileSync(path.join(base,'hypergraph-t2-invariance-replay.cjs'),'utf8');
 const csv=fs.readFileSync(path.join(base,'results/2026-10-12-higher-order-long-8000-summary.csv'),'utf8');
 const blob=x=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0'+x).digest('hex');
 requireTrue(blob(old)===PINNED.engine&&blob(t2)===PINNED.t2&&blob(csv)===PINNED.historical,'source hash mismatch');
 const t4=require('./2026-10-13-t4-two-event-squares.cjs');
 const {instrument}=require('./hypergraph-t2-invariance-replay.cjs');
 const ks=(process.argv[2]||'3,4,5').split(',').map(Number),horizon=Number(process.argv[3]||129);
 const dest=process.argv[4]||path.join(base,'results/2026-10-13-t4-adjacent-'+ks.join('-')+'.json');
 const report=runAdjacent({engine:old,t2Instrument:instrument,t4,ks,horizon});
 fs.writeFileSync(dest,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({file:dest,totals:report.totals}));
}