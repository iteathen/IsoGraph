#!/usr/bin/env node
'use strict';
// Bounded math-only structural screen. No physical simulation/units.
// Native source blob: 87a420edfb3e562d7fcbacf4ca607b1e6952ac08
// Reaction-source original definitions: MECH-25 (batch 07).
// Carletti et al. hypergraph operator: MECH-07 (batch 02).
// Original T4 records: e8427e9fe7fe2d3aa0834af1fc89213cabad62f8.
function test(p,m){if(!p)throw Error(m||'mismatch');}
function pop(n){let c=0;while(n){n&=n-1;c++;}return c;}
const fit=(w,k,b)=>!!(w&(1<<pop(b))),allowed=(e,b,w,k)=>e.live&&!e.fired&&e.v.length===k&&!!(w&(1<<e.v.reduce((a,i)=>a+((b>>i)&1),0)));
function masks(e,k,w){if(e.v.length!==k)return [];
  const out=[];for(let m=0;m<(1<<k);m++)if(w&(1<<pop(m)))out.push(m);return out;}
// Each clause uses nonempty R=S + {always present, live_e, unfired_e},
// I=(e\S)+{always absent}, P={marker_e}; source R,I,P nonempty,
// R∩I=∅. The Boolean test below is exactly its set membership semantics.
function matches(e,b,c){if(!e.live||e.fired)return false;
  for(let j=0;j<e.v.length;j++)if(((b>>e.v[j])&1)!==((c>>j)&1))return false;
  return true;}
let local=0,yes=0;const byRank={};
for(let k of [3,4,5]){let n=0;const v=Array.from({length:k},(_,i)=>i);
  for(let w=0;w<(1<<(k+1));w++)for(let b=0;b<(1<<k);b++)for(let live of [false,true])for(let fired of [false,true]){
    const e={id:'e',v,live,fired},clauses=masks(e,k,w);
    const matched=clauses.filter(c=>matches(e,b,c)).length;
    const source=Number(allowed(e,b,w,k));
    test(matched===source,JSON.stringify({k,w,b,live,fired,matched,source}));
    local++;n++;if(source)yes++;
  }
  byRank[k]=n;
}
let frontier=0;const byFrontierRank={};
for(let k of [3,4,5]){let n=0;
 const E=[{id:0,v:Array.from({length:k},(_,i)=>i)},
          {id:1,v:Array.from({length:k},(_,i)=>i)},
          {id:2,v:Array.from({length:k},(_,i)=>i+1)}];
 for(let w=0;w<(1<<(k+1));w++)for(let b=0;b<(1<<(k+1));b++)for(let s=0;s<27;s++){
  let code=s;const occ=E.map(e=>{let x=code%3;code=Math.floor(code/3);
    return {...e,live:x!==2,fired:x!==0};});
  const source=occ.filter(e=>allowed(e,b,w,k)).map(e=>e.id).join(',');
  const response=occ.filter(e=>masks(e,k,w).some(c=>matches(e,b,c))).map(e=>e.id).join(',');
  test(source===response,'frontier');n++;frontier++;
 }
 byFrontierRank[k]=n;
}
function choose(xs,k){const z=[];function go(i,cur){if(cur.length===k){z.push(cur);return;}
 for(let j=i;j<xs.length;j++)go(j+1,[...cur,xs[j]]);}go(0,[]);return z;}
const eq=(x,y)=>JSON.stringify(x)===JSON.stringify(y);
function encode(s){return {V:s.V.map(v=>({...v,t:'V'})),
 E:s.E.map(e=>({id:e.id,t:'E',live:e.live,fired:e.fired,producer:e.producer||null})),
 I:s.E.flatMap(e=>e.v.map(v=>[v,e.id]))};}
function decode(s){return {V:s.V.map(v=>({id:v.id,bit:v.bit})),
 E:s.E.map(e=>({id:e.id,v:s.I.filter(p=>p[1]===e.id).map(p=>p[0]).sort(),
 live:e.live,fired:e.fired,producer:e.producer}))};}
let loops=0;const triple=choose([0,1,2,3],3);
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)for(let bits=0;bits<16;bits++)for(let status=0;status<27;status++){
 let t=status;const E=[a,b,c].map((j,i)=>{let x=t%3;t=Math.floor(t/3);
   return {id:'e'+i,v:triple[j],live:x!==2,fired:x!==0,producer:null};});
 const s={V:[0,1,2,3].map(i=>({id:i,bit:(bits>>i)&1})),E};
 test(eq(s,decode(encode(s))),'incidence roundtrip');loops++;
}
const plane1=[[0,1,2],[0,3,4],[0,5,6],[1,3,5],[1,4,6],[2,3,6],[2,4,5]];
const plane2=plane1.map(e=>e.map(i=>i===1?2:i===2?1:i).sort((a,b)=>a-b));
function gram(H){const G=Array.from({length:7},()=>Array(7).fill(0));
 for(let e of H)for(let a of e)for(let b of e)if(a!==b)G[a][b]+=e.length-1;
 return G;}
const K1=gram(plane1),K2=gram(plane2);
test(eq(K1,K2),'Laplacian K');test(K1.every((row,i)=>row.every((v,j)=>v===(i===j?0:2))));
const chosen=[1,3,5],ones=chosen.reduce((m,j)=>m|(1<<j),0);
const active=H=>H.filter((v,i)=>allowed({v,live:true,fired:false},ones,8,3)).map(v=>v.join(','));
test(eq(active(plane1),['1,3,5'])&&eq(active(plane2),[]),'operator nonreconstruction');
// Native source k3 rule-4: weights=11, mutation flip, keep=false.
const e=[0,1,2],f=[0,1,3];
const fires=(m,E)=>allowed({v:E,live:true,fired:false},m,11,3);
const flip=(m,E)=>E.reduce((x,i)=>x^(1<<i),m);
const t4=[];
for(const m of [0,1]){
 test(fires(m,e)&&fires(m,f));
 const x=fires(flip(m,e),f),y=fires(flip(m,f),e);
 test(x===y);if(x)test(flip(flip(m,e),f)===flip(flip(m,f),e));
 t4.push({mask:m,eAfterF:y,fAfterE:x,kind:x?'commuting-square':'coenabled-but-disabling-conflict'});
}
test(t4[0].kind==='coenabled-but-disabling-conflict'&&t4[1].kind==='commuting-square');
console.log(JSON.stringify({localChecks:local,localByRank:byRank,positiveOneClauseCases:yes,
 frontierChecks:frontier,frontierByRank:byFrontierRank,roundtripChecks:loops,
 operatorWitness:{FanoLabelledStructuresDifferent:true,weightedKEqual:true,selectedTriple:chosen,enabledInFirst:active(plane1),enabledInSecond:active(plane2),isomorphicUnderSimultaneousNodeRelabel:true},
 T4PairWitness:t4,fullNativeProcessEquivalence:false,physicalMeasurementsUsed:false},null,2));
