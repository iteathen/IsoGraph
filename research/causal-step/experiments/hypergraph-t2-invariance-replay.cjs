#!/usr/bin/env node
'use strict';
/**
 * Causal Step T2: observer-only event-provenance and relabel/scheduler controls.
 * Does not change the frozen hypergraph-long-horizon.mjs.
 * Native reproduction (Node 22):
 *  node research/causal-step/experiments/hypergraph-t2-invariance-replay.cjs \
 *    3,4 8000 /tmp/t2-k3-4.json
 *  node ... 5 8000 /tmp/t2-k5.json
 * Environment: no network, no Actions, no modification to source corpus.
 */
const PINNED_RUNNER_BLOB = '87a420edfb3e562d7fcbacf4ca607b1e6952ac08';
const PINNED_REFERENCE_CSV_BLOB = 'd2d40f87d59a5a94d2df71a69543e521f6ad807f';
const T2_CASES = [
 {k:3,ruleId:4},{k:3,ruleId:28},
 {k:4,ruleId:0},{k:4,ruleId:21},
 {k:5,ruleId:21},{k:5,ruleId:81},{k:5,ruleId:4}
];
function exactReplace(s,a,b){
 const n=s.split(a).length-1;
 if(n!==1)throw Error('Failed closed: expected one insertion point, found '+n+' for '+a.slice(0,90));
 return s.replace(a,b);
}
function instrument(original){
 let s=original.replace(/^#![^\n]*\n/, '');
 s=exactReplace(s,"import fs from 'node:fs';","");
 s=exactReplace(s,"import path from 'node:path';","");
 s=exactReplace(s,'console.log(JSON.stringify({meta,concise}));','');
 s=exactReplace(s,
 "const bits=spec.initial==='zero'?0:spec.initial==='one'?(1<<initialN)-1:(1<<Math.floor(initialN/2))-1;\n const rand=rng(sourceSeed);",
 "const bits=spec.initial==='zero'?0:spec.initial==='one'?(1<<initialN)-1:(1<<Math.floor(initialN/2))-1;\n"+
 " const P=__trialOptions.permutation || Array.from({length:initialN},(_,i)=>i);\n"+
 " if(P.length!==initialN || new Set(P).size!==initialN || P.some(v=>!Number.isInteger(v)||v<0||v>=initialN))throw Error('Invalid initial-node bijection');\n"+
 " const inverseP=Array.from({length:initialN},(_,i)=>P.indexOf(i));\n"+
 " const canon=id=>id<initialN?inverseP[id]:id;\n"+
 " const rand=rng(sourceSeed);");
 s=exactReplace(s,
 "const nodes=Array.from({length:initialN},(_,i)=>({bit:(bits>>i)&1,depth:0}));",
 "const nodes=Array.from({length:initialN},(_,i)=>({bit:(bits>>inverseP[i])&1,depth:0}));");
 s=exactReplace(s,
 "const edges=[];\n let liveEdges=0",
 "const edges=[]; const originIndex=new Map(); let creatingFromEvent=null;\n let liveEdges=0");
 s=exactReplace(s,
 "const edge={ids:ids.slice().sort((a,b)=>a-b),alive:true,fired:false,eligible:false};\n  edges.push(edge);",
 "const origin=(creatingFromEvent===null?'initial':'birth'+creatingFromEvent)+':'+ids.map(canon).sort((a,b)=>a-b).join(',');\n"+
 "  if(originIndex.has(origin))throw Error('Ambiguous occurrence origin '+origin);\n"+
 "  const edge={ids:ids.slice().sort((a,b)=>a-b),alive:true,fired:false,eligible:false,origin};\n"+
 "  originIndex.set(origin,id);edges.push(edge);");
 s=exactReplace(s,
 "const seeds=Array.from({length:initialN},(_,i)=>i);",
 "const seeds=Array.from({length:initialN},(_,i)=>P[i]);");
 s=exactReplace(s,
 "}else addEdge(Array.from({length:arity},(_,i)=>i));",
 "}else addEdge(Array.from({length:arity},(_,i)=>P[i]));");
 s=exactReplace(s,
 "const selected=index.kth(scheduler==='fifo'?1:Math.floor(rand()*index.total)+1);\n  const e=edges[selected];",
 "const normallySelected=index.kth(scheduler==='fifo'?1:Math.floor(rand()*index.total)+1);\n"+
 "  const target=__trialOptions.transport?.[rewrite];\n"+
 "  const selected=target===undefined?normallySelected:originIndex.get(target);\n"+
 "  if(selected===undefined)throw Error('Cannot transport source occurrence '+target+' at step '+rewrite);\n"+
 "  const e=edges[selected];\n"+
 "  const beforeEvent={step:rewrite+1,origin:e.origin,participants:e.ids.map(id=>[canon(id),nodes[id].bit]).sort((a,b)=>a[0]-b[0]),frontierBefore:index.total};");
 s=exactReplace(s,
 "let reactivated=0;\n  for(const id of affected){",
 "let reactivated=0; const reactivatedOrigins=[];\n  for(const id of affected){");
 s=exactReplace(s,
 "if(before!==after){setEligible(id,after);if(!before&&after)reactivated++;}",
 "if(before!==after){setEligible(id,after);if(!before&&after){reactivated++;reactivatedOrigins.push(edge.origin);}}");
 s=exactReplace(s,
 "for(const r of levels)for(const chosen of combinations(e.ids,r-1))addEdge([...chosen,id]);",
 "const edgeStart=edges.length; creatingFromEvent=rewrite+1;\n"+
 "  for(const r of levels)for(const chosen of combinations(e.ids,r-1))addEdge([...chosen,id]);\n"+
 "  creatingFromEvent=null;\n"+
 "  __observe({...beforeEvent,ones,newborn,changed,overlap,reactivated,\n"+
 "    reactivatedOrigins:reactivatedOrigins.sort(),emitted:edges.slice(edgeStart).map(e=>e.origin).sort(),\n"+
 "    frontierAfter:index.total,nodeCount:nodes.length,liveEdges});");
 return s;
}
function parseReference(text){
 const lines=text.trim().split(/\r?\n/);
 const keys=lines.shift().split(',');
 return lines.filter(Boolean).map(line=>Object.fromEntries(line.split(',').map((v,i)=>[keys[i],v])));
}
function runOne(compiled,configuration){
 const output=[],io=[];
 const fakeProcess={argv:['node','hypergraph-long-horizon.mjs',
    String(configuration.k),String(configuration.horizon),'t2-only',
    String(configuration.seedOffset||0),String(configuration.ruleId),
    configuration.scheduler,'active']};
 const fakeFS={mkdirSync(){},writeFileSync(name,body){io.push({name,length:body.length});}};
 const fakePath={resolve:x=>x,join:(...parts)=>parts.join('/')};
 const results=compiled(fakeProcess,fakeFS,fakePath,configuration,event=>output.push(event));
 if(results.length!==1)throw Error('Expected one selected historic context but got '+results.length);
 return {summary:results[0],events:output};
}
function exactDiff(a,b){
 const n=Math.min(a.length,b.length);
 for(let i=0;i<n;i++)if(JSON.stringify(a[i])!==JSON.stringify(b[i])){
  return {same:false,firstDifferentStep:i+1,expected:a[i],observed:b[i]};
 }
 return a.length===b.length?{same:true,steps:n}:{same:false,firstDifferentStep:n+1,lengths:[a.length,b.length]};
}
function matchReference(summary,ref,horizon){
 if(horizon!==8000)return {status:'not-requested-at-8000'};
 const row=ref.find(r=>Number(r.k)===summary.k && Number(r.rule)===summary.ruleId &&
    r.scheduler===summary.scheduler && Number(r.mutation)===summary.mutation);
 if(!row)throw Error('Missing preserved 8000 run reference k'+summary.k+' rule'+summary.ruleId+' '+summary.scheduler);
 const fields=[
  ['executedRewrites','rewrites'],['status','status'],['nodes','nodes'],
  ['liveHyperedges','liveEdges'],['eligibleFrontier','frontier'],['depth','depth'],
  ['recent64Distinct','recent64'],['recent64ReactivationEvents','recentReactivated'],
  ['recent64Period12','period12']
 ];
 const mismatches=[];
 for(const [field,legacy]of fields){
  const actual=summary[field]==null?'':String(summary[field]);
  if(actual!==row[legacy])mismatches.push({field,expected:row[legacy],actual});
 }
 return {status:mismatches.length?'FAIL':'PASS',fieldsCompared:fields.length,mismatches};
}
function digest32(events){
 let h=2166136261>>>0;
 for(const event of events){
  const s=JSON.stringify(event);
  for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}
 }
 return h.toString(16).padStart(8,'0');
}
function permutations(n){
 return [{name:'rotation',map:Array.from({length:n},(_,i)=>(i+1)%n)},
  {name:'reversal',map:Array.from({length:n},(_,i)=>n-1-i)}];
}
function runT2(original,referenceCsv,{ks=[3,4,5],horizon=8000,naiveHorizon=400,
  includeTransport=true,includeNaive=true,alternateRandom=false,ruleIds=null,schedulers=['fifo','random'],permutationNames=null}={}){
 const supported=[3,4,5];if(!ks.length||ks.some(k=>!supported.includes(k)))throw Error('Unsupported arity');
 if(!Number.isInteger(horizon)||horizon<1||horizon>10000)throw Error('Bad horizon');
 if(!schedulers.length||schedulers.some(x=>!['fifo','random'].includes(x)))throw Error('Bad scheduler filter');
 const code=instrument(original)+'\nreturn results;';
 const compiled=new Function('process','fs','path','__trialOptions','__observe',code);
 const ref=parseReference(referenceCsv);
 const cases=T2_CASES.filter(c=>ks.includes(c.k)&&(ruleIds===null||ruleIds.includes(c.ruleId)));
 if(!cases.length)throw Error('No selected cases');
 const reports=[];let checked=0,fullReference=0,fullRefFields=0;
 for(const c of cases){
  const n=c.k+([28,81,4].includes(c.ruleId)&&c.k===3?1:0); // replaced below using true case mapping
  const origCase = c.k===3&&c.ruleId===28?'overlap':
     c.k===5&&(c.ruleId===81||c.ruleId===4)?'overlap':'single';
  const initialN=c.k+(origCase==='overlap'?1:0);
  for(const scheduler of schedulers){
   const opts={...c,horizon,scheduler,seedOffset:0};
   const baseline=runOne(compiled,opts);
   const legacy=matchReference(baseline.summary,ref,horizon);
   if(legacy.status==='FAIL')throw Error('Source drift or instrumentation change in historical reference '+JSON.stringify({c,scheduler,legacy}));
   if(legacy.status==='PASS'){fullReference++;fullRefFields+=legacy.fieldsCompared;}
   const report={k:c.k,ruleId:c.ruleId,initial:baseline.summary.initial,
     kind:baseline.summary.kind,mutation:baseline.summary.mutation,
     scheduler,seed:baseline.summary.seed,rewrites:baseline.summary.executedRewrites,
     status:baseline.summary.status,baselineDigest32:digest32(baseline.events),
     legacy,transport:[],untransported:[]};
   if(includeTransport)for(const permutation of permutations(initialN).filter(p=>permutationNames===null||permutationNames.includes(p.name))){
    const permuted=runOne(compiled,{...opts,permutation:permutation.map,transport:baseline.events.map(e=>e.origin)});
    const diff=exactDiff(baseline.events,permuted.events);
    const fields=['executedRewrites','status','nodes','liveHyperedges','eligibleFrontier',
     'depth','oldEdgeReactivationEvents','totalOldReactivated','oldOverlapEvents',
     'nodeBitChangeEvents','uniqueEventSignatures','uniqueContextSignatures',
     'recent64Distinct','recent64ReactivationEvents','recent64Period12',
     'firstSignatures','lastSignatures'];
    const summaryDifferences=fields.filter(f=>JSON.stringify(baseline.summary[f])!==JSON.stringify(permuted.summary[f]));
    report.transport.push({permutation:permutation.name,map:permutation.map,
     sameReceipts:diff.same,firstDifferentStep:diff.firstDifferentStep||null,
     sameSummary:summaryDifferences.length===0,summaryDifferences,
     digest32:digest32(permuted.events),error:diff.same?null:{
      expected:diff.expected,observed:diff.observed}});
    checked++;
   }
   if(includeNaive){
    const probeLength=Math.min(naiveHorizon,horizon);
    const raw=runOne(compiled,{...opts,horizon:probeLength});
    const permutation=permutations(initialN)[0];
    const naive=runOne(compiled,{...opts,horizon:probeLength,permutation:permutation.map});
    const diff=exactDiff(raw.events,naive.events);
    report.untransported.push({permutation:permutation.name,
      horizon:probeLength,traceSame:diff.same,
      firstDifferentStep:diff.firstDifferentStep||null,
      baselineEvent:diff.same?null:diff.expected,
      relabelEvent:diff.same?null:diff.observed});
   }
   reports.push(report);
  }
 }
 const schedulerPairs=[];
 for(const c of cases){
  const a=reports.find(x=>x.k===c.k&&x.ruleId===c.ruleId&&x.scheduler==='fifo');
  const b=reports.find(x=>x.k===c.k&&x.ruleId===c.ruleId&&x.scheduler==='random');
  const first=a&&b&&a.baselineDigest32===b.baselineDigest32;
  schedulerPairs.push({k:c.k,ruleId:c.ruleId,
    sameFullProvenanceDigest:a&&b?first:null,fifoDigest32:a?.baselineDigest32||null,
    randomDigest32:b?.baselineDigest32||null,
    reportedGateDifference:a?.legacy.status==='PASS'&&b?.legacy.status==='PASS'&&
      (a.ruleId===21&&a.k===4||a.ruleId===81&&a.k===5)});
 }
 return {experiment:'T2 exact provenance-preserving relabel/scheduler replay',
  date:'2026-10-13',authority:'exploratory exact observer diagnostic, not physical theory',
  originalRunnerBlobSha:PINNED_RUNNER_BLOB,
  referenceCsvBlobSha:PINNED_REFERENCE_CSV_BLOB,
  methodology:'source-text observer instrumentation with checked insertion anchors; no edits to generator or selected rules; transported event occurrence schedule versus raw order of eligible edges',
  configuration:{ks,horizon,naiveHorizon,includeTransport,includeNaive,alternateRandom,ruleIds,schedulers,permutationNames},
  totals:{baseHistories:reports.length,baselineMatches:fullReference,
     matchedHistoricalScalarFields:fullRefFields,
     transportedPermutationRuns:checked,
     transportedExactEqual:reports.reduce((n,r)=>n+r.transport.filter(x=>x.sameReceipts&&x.sameSummary).length,0),
     naivePermutationRuns:reports.reduce((n,r)=>n+r.untransported.length,0),
     naiveDivergences:reports.reduce((n,r)=>n+r.untransported.filter(x=>!x.traceSame).length,0)},
  cases:reports,schedulerPairs,
  caveats:['Original 8000-rewrite generator and mutation rules untouched',
    'Canonical initial labels and corresponding event occurrence schedules are observer controls, not new physics',
    'Transported replay is stronger than equality of terminal node count but only across tested histories',
    'Raw FIFO or seeded-random scheduler may depend on original edge enumeration; distinguish from rule covariance',
    'FNV-1a32 digests are navigation aids only; full receipts were compared exactly in memory',
    'Events are host rewrites not physical clock units; no demonstration of particles, GR, universality or quantum dynamics']};
}
if(typeof module!=='undefined')module.exports={runT2,instrument};
if(typeof require!=='undefined' && require.main===module){
 const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
 const here=__dirname;
 const source=fs.readFileSync(path.join(here,'hypergraph-long-horizon.mjs'),'utf8');
 const csv=fs.readFileSync(path.join(here,'results/2026-10-12-higher-order-long-8000-summary.csv'),'utf8');
 const blobHash=bytes=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(bytes)+'\0'+bytes).digest('hex');
 if(blobHash(source)!==PINNED_RUNNER_BLOB||blobHash(csv)!==PINNED_REFERENCE_CSV_BLOB)
  throw Error('Frozen source or historical reference CSV differs from pinned Git blob');
 const ks=(process.argv[2]||'3,4,5').split(',').map(Number);
 const horizon=Number(process.argv[3]||8000);
 const outfile=process.argv[4]||path.join(here,'results/t2-replay-'+ks.join('-')+'-'+horizon+'.json');
 const ruleIds=process.argv[5]?process.argv[5].split(',').map(Number):null;
 const schedulers=process.argv[6]?process.argv[6].split(','):['fifo','random'];
 const permutationNames=process.argv[7]?process.argv[7].split(','):null;
 const result=runT2(source,csv,{ks,horizon,ruleIds,schedulers,permutationNames});
 fs.writeFileSync(outfile,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({outfile,totals:result.totals}));
}