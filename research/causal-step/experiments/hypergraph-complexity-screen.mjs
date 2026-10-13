#!/usr/bin/env node
/**
 * Causal Step: local-pattern simplicity and overlapping-hyperedge feedback probe.
 * Derived from hypergraph-rewrite-lab.mjs; never modifies its original rules.
 * This screen is diagnostic; no entropy/dimension/physics is inferred.
 *
 * Usage:
 *    node hypergraph-complexity-screen.mjs 3 120 ./results
 *    node hypergraph-complexity-screen.mjs 4 120 ./results
 *    node hypergraph-complexity-screen.mjs 5 120 ./results
 *
 * Inputs: selected identical 12-rule subsets of the original seeded 192-rule
 * sample for a given arity, crossed with two hypergraph initial incidences,
 * three node-bit patterns, two schedulers, and matched fixed/mutable states.
 * Labels refer to TRAJECTORIES under specified input contexts, not to global
 * computational universality of entire rewrite rule classes.
 */
import fs from 'node:fs';
import path from 'node:path';
const arity=Number(process.argv[2]??3), horizon=Number(process.argv[3]??120);
const folder=path.resolve(process.argv[4]||'./complexity-screen');
if(![3,4,5].includes(arity)||!Number.isSafeInteger(horizon)||horizon<1||horizon>1000)throw Error('Invalid scope');
const NODE_LIMIT=2000, EDGE_LIMIT=16000, BUILD_SEED=20261012;
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

function hamming(bits,n){let t=0;for(let i=0;i<n;i++)t+=(bits>>i)&1;return t}
function entropy01(p){if(p<=0||p>=1)return 0;return -(p*Math.log2(p)+(1-p)*Math.log2(1-p))}
function suffixPeriod(seq,maxPeriod=12,window=64){
 if(seq.length<window)return null;
 const z=seq.slice(-window);
 for(let p=1;p<=maxPeriod;p++){
   let ok=true;for(let i=p;i<z.length;i++)if(z[i]!==z[i-p]){ok=false;break;}
   if(ok)return p;
 }
 return null;
}
function trialTrace({k,rule,bits,initKind,mutate,scheduler,seed,limit}){
 const R=rng(seed),n=k+(initKind==='overlap'?1:0);
 const nodes=Array.from({length:n},(_,i)=>({bit:(bits>>i)&1,depth:0}));
 const hyperedges=(initKind==='overlap'?combinations(nodes.map((_,i)=>i),k):[Array.from({length:k},(_,i)=>i)])
    .map(ids=>({ids,alive:true,fired:false}));
 const initialEdges=hyperedges.length;
 const outputRanks=offspringLayers(rule),outputCount=outputRanks.reduce((s,r)=>s+choose(k,r-1),0);
 let live=hyperedges.length,rewrites=0,status='limit',totalOldActivated=0,changedStateEvents=0;
 let overlapEvents=0,causalDepth=0,activeFrontier=0;
 const signatures=[],structureSignatures=[],stateWeights=[],incidenceChanges=[];
 function eligible(){
  const out=[];
  for(let i=0;i<hyperedges.length;i++){
   const e=hyperedges[i];
   if(!e.alive||e.fired||e.ids.length!==k)continue;
   let ones=0;for(const id of e.ids)ones+=nodes[id].bit;
   if(rule.weights&(1<<ones))out.push(i);
  }
  return out;
 }
 const originallyEligible=eligible().length>0;
 while(rewrites<limit){
  const before=eligible();
  if(!before.length){status=rewrites===0?'initially-inert':'no-eligible-rewrite';break;}
  const edgeIndex=scheduler==='fifo'?before[0]:before[Math.floor(R()*before.length)];
  const e=hyperedges[edgeIndex],budgetNodes=nodes.length+1>NODE_LIMIT,budgetEdges=live-(rule.keep?0:1)+outputCount>EDGE_LIMIT;
  if(budgetNodes||budgetEdges){status='resource-censored';break;}
  let oldWeight=0,maxDepth=0;
  for(const id of e.ids){oldWeight+=nodes[id].bit;maxDepth=Math.max(maxDepth,nodes[id].depth);}
  let oldOverlap=0;
  const sourceIds=new Set(e.ids);
  for(let j=0;j<hyperedges.length;j++){
    if(j===edgeIndex)continue;
    const g=hyperedges[j];if(!g.alive||g.fired||g.ids.length!==k)continue;
    let inter=0;for(const id of g.ids)if(sourceIds.has(id))inter++;
    if(inter>=2)oldOverlap++;
  }
  if(oldOverlap>0)overlapEvents++;
  e.fired=true;if(!rule.keep){e.alive=false;live--;}
  let flipped=0;
  if(mutate>0){
   for(const id of e.ids){
    const prev=nodes[id].bit;
    const after=mutate===1?1-prev:mutate===2?prev^(oldWeight&1):mutate===3?Number(2*oldWeight>=k):
                ((2*oldWeight>=k)?1-prev:prev);
    nodes[id].bit=after;
    flipped+=Number(after!==prev);
   }
  }
  if(flipped)changedStateEvents++;
  const formerly=new Set(before),postMutation=eligible();
  let reactivated=0;
  for(const id of postMutation)if(!formerly.has(id))reactivated++;
  totalOldActivated+=reactivated;
  const nb=newbornState(rule.mode,oldWeight,k);
  nodes.push({bit:nb,depth:maxDepth+1});
  causalDepth=Math.max(causalDepth,maxDepth+1);
  for(const r of outputRanks)for(const chosen of combinations(e.ids,r-1)){
   const ids=[...chosen,nodes.length-1].sort((a,b)=>a-b);
   hyperedges.push({ids,alive:true,fired:false});live++;
  }
  const overlapBucket=oldOverlap===0?0:oldOverlap===1?1:oldOverlap<=3?2:oldOverlap<=7?3:4;
  const sig=[oldWeight,nb,flipped,reactivated?1:0].join(':');
  signatures.push(sig);structureSignatures.push(sig+':'+overlapBucket);
  stateWeights.push(nodes.reduce((a,b)=>a+b.bit,0)/nodes.length);
  incidenceChanges.push(reactivated);
  rewrites++;
 }
 if(rewrites>=limit&&status==='limit')status='horizon-censored';
 activeFrontier=eligible().length;
 const eventPeriod=suffixPeriod(signatures),structurePeriod=suffixPeriod(structureSignatures);
 const uniqueEventSignatures=new Set(signatures).size,uniqueContextSignatures=new Set(structureSignatures).size;
 const homogenousTrace=signatures.length>=64&&uniqueEventSignatures===1&&eventPeriod===1;
 const unchangingGlobalBits=stateWeights.length>=2&&Math.max(...stateWeights)-Math.min(...stateWeights)<1e-10;
 const dynamicsLead=(totalOldActivated>0&&uniqueEventSignatures>1);
 const statusLabel=rewrites===0?'no-productive-trajectory':
    homogenousTrace&&totalOldActivated===0?'simple-repeating-local-trajectory':
    dynamicsLead?'context-sensitive-overlap-lead':'capacity-unresolved';
 return {arity:k,mode:MODES[rule.mode],weights:rule.weights,ranks:rule.ranks,keep:rule.keep,
  initKind,scheduler,mutation:mutate,initialNodes:n,initialEdges,initialBits:bits,initialOnes:hamming(bits,n),
  originallyEligible,status,rewrites,nodes:nodes.length,liveHyperedges:live,activeFrontier,causalDepth,
  uniqueEventSignatures,uniqueContextSignatures,eventSuffixPeriod:eventPeriod,contextSuffixPeriod:structurePeriod,
  homogenousTrace,unchangingGlobalBits,changedStateEvents,oldOverlapEvents:overlapEvents,
  reactivatedOldHyperedges:totalOldActivated,dynamicsLead,statusLabel,
  firstSignatures:signatures.slice(0,6).join('|'),lastSignatures:signatures.slice(-6).join('|')};
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
function csvField(x){return '"'+String(x===null?'':x).replaceAll('"','""')+'"'}
function toCsv(list,columns){return columns.join(',')+'\n'+list.map(r=>columns.map(k=>csvField(r[k])).join(',')).join('\n')+'\n'}
const selected=selectCandidateRules(arity),out=[],metadata=[];
const scenarios=['zero','mixed','one'];
for(const {ruleId,rule,uniformCertificate} of selected){
 metadata.push({arity,ruleId,uniformCertificate,weights:rule.weights,ranks:rule.ranks,mode:MODES[rule.mode],keep:rule.keep});
 for(const initial of scenarios)for(const initKind of ['single','overlap']){
  const n=arity+(initKind==='overlap'?1:0);
  const bits=initial==='zero'?0:initial==='one'?(1<<n)-1:(1<<Math.floor(n/2))-1;
  for(const scheduler of ['fifo','random'])for(const mutation of [0,1+(ruleId%4)]){
   const t=trialTrace({k:arity,rule,bits,initKind,mutate:mutation,scheduler,
     seed:BUILD_SEED+ruleId*113+arity*17+bits,limit:horizon});
   out.push({ruleId,uniformCertificate,initial, ...t});
  }
 }
}
const results=out.filter(r=>r.statusLabel==='simple-repeating-local-trajectory');
const positives=out.filter(r=>r.statusLabel==='context-sensitive-overlap-lead');
const positiveRuleIds=new Set(positives.map(x=>x.ruleId));
const uniformCertificateIds=new Set(selected.filter(c=>c.uniformCertificate).map(c=>c.ruleId));
const report={arity,horizon,ruleCount:selected.length,runs:out.length,selectedRules:metadata,
 trajectoryTags:{
  noProductive:out.filter(t=>t.statusLabel==='no-productive-trajectory').length,
  simpleLocal:results.length,
  overlappingInteractionLead:positives.length,
  unresolved:out.filter(t=>t.statusLabel==='capacity-unresolved').length
 },
 certifiedUniformRulesSelected:uniformCertificateIds.size,
 certifiedUniformRulesWithOtherCoupledOverlapLead:[...uniformCertificateIds].filter(id=>positiveRuleIds.has(id)).length,
 noCapsHit:out.every(t=>t.status!=='resource-censored'),
 caveats:['local rule/event signatures are not complete graph isomorphism tests','simple local periods do not prove rule-wide incapacity for complex organization','overlap reactivation demonstrates dependence but is not alone evidence of physical structured complexity','synthetic aggregate binary-state mutations are deliberately supplied controls, not emergent laws','no attempt at exhaustive search over general hypergraph rewrite systems']};
fs.mkdirSync(folder,{recursive:true});
const prefix='complexity-screen-k'+arity;
const cols=['ruleId','uniformCertificate','initial','arity','mode','weights','ranks','keep','initKind','scheduler','mutation',
'initialNodes','initialEdges','initialBits','initialOnes','status','rewrites','nodes','liveHyperedges','activeFrontier','causalDepth',
'uniqueEventSignatures','uniqueContextSignatures','eventSuffixPeriod','contextSuffixPeriod','homogenousTrace','unchangingGlobalBits',
'changedStateEvents','oldOverlapEvents','reactivatedOldHyperedges','dynamicsLead','statusLabel','firstSignatures','lastSignatures'];
fs.writeFileSync(path.join(folder,prefix+'-trials.csv'),toCsv(out,cols));
fs.writeFileSync(path.join(folder,prefix+'-summary.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({arity,horizon,runs:out.length,tags:report.trajectoryTags,
 uniformCert:report.certifiedUniformRulesSelected,certWithAlternateOverlap:report.certifiedUniformRulesWithOtherCoupledOverlapLead,noCapsHit:report.noCapsHit}));
