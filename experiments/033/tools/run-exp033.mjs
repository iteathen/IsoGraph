import fs from 'node:fs';

const OUT='out/exp033';
fs.mkdirSync(OUT,{recursive:true});

function popcount(x){
  x >>>= 0;
  x=x-((x>>>1)&0x55555555);
  x=(x&0x33333333)+((x>>>2)&0x33333333);
  return (((x+(x>>>4))&0x0F0F0F0F)*0x01010101)>>>24;
}

function bits(mask){
  const out=[];
  let x=mask>>>0;
  while(x){
    const b=x&-x;
    out.push(31-Math.clz32(b));
    x=(x^b)>>>0;
  }
  return out;
}

function makeInstance(parent,supports){
  const n=parent.length;
  if(n>28) throw new Error('n>28 not supported by compact bitmask harness');
  const full=n===0?0:(2**n-1)>>>0;
  const children=Array.from({length:n},()=>[]);
  for(let i=0;i<n;i++){
    const p=parent[i];
    if(p>=0) children[p].push(i);
  }
  const desc=Array(n).fill(0);
  function dfs(u){
    let m=(1<<u)>>>0;
    for(const c of children[u]) m=(m|dfs(c))>>>0;
    desc[u]=m;
    return m;
  }
  for(let i=0;i<n;i++) if(parent[i]<0) dfs(i);
  const sup=supports.map(x=>(x&full)>>>0);
  const resist=sup.map(x=>(full^x)>>>0);
  return {n,full,parent:parent.slice(),children,desc,supports:sup,resist,m:sup.length};
}

function upClosure(inst,mask){
  let out=mask>>>0;
  for(const i of bits(mask)){
    let p=inst.parent[i];
    while(p>=0){
      out=(out|(1<<p))>>>0;
      p=inst.parent[p];
    }
  }
  return out>>>0;
}

function downClosure(inst,mask){
  let out=0;
  for(const i of bits(mask)) out=(out|inst.desc[i])>>>0;
  return out>>>0;
}

function phaseFormula(inst,I,e){
  const active=(inst.full^I)>>>0;
  const resistantActive=(active&inst.resist[e])>>>0;
  const survivors=upClosure(inst,resistantActive);
  return (inst.full^survivors)>>>0;
}

function phaseOperational(inst,I,e){
  let removed=I>>>0;
  while(true){
    const active=(inst.full^removed)>>>0;
    let chosen=-1;
    for(let q=0;q<inst.n;q++){
      const bit=(1<<q)>>>0;
      if((active&bit)===0) continue;
      if((inst.supports[e]&bit)===0) continue;
      let hasActiveChild=false;
      for(const c of inst.children[q]){
        if((active&((1<<c)>>>0))!==0){
          hasActiveChild=true;
          break;
        }
      }
      if(!hasActiveChild){
        chosen=q;
        break;
      }
    }
    if(chosen<0) return removed>>>0;
    removed=(removed|((1<<chosen)>>>0))>>>0;
  }
}

function principalPred(inst,J,e){
  return downClosure(inst,(J&inst.resist[e])>>>0);
}

function isSubset(a,b){
  return (((a&b)>>>0)===(a>>>0));
}

function minAntichain(values){
  const uniq=[...new Set(values.map(x=>x>>>0))];
  uniq.sort((a,b)=>popcount(a)-popcount(b)||a-b);
  const out=[];
  outer: for(const x of uniq){
    for(const y of out){
      if(isSubset(y,x)) continue outer;
    }
    out.push(x>>>0);
  }
  out.sort((a,b)=>a-b);
  return out;
}

function sameBasis(a,b){
  if(a.length!==b.length) return false;
  for(let i=0;i<a.length;i++) if(a[i]!==b[i]) return false;
  return true;
}

function forwardBfs(inst,crossCheck=false){
  const t0=process.hrtime.bigint();
  if(inst.full===0) return {opt:0,states:1,transitions:0,phaseChecks:0,phaseMismatches:0,ms:0};
  const dist=new Map([[0,0]]);
  const queue=[0];
  let qi=0,transitions=0,phaseChecks=0,phaseMismatches=0;
  while(qi<queue.length){
    const I=queue[qi++]>>>0;
    const d=dist.get(I);
    if(I===inst.full){
      const ms=Number(process.hrtime.bigint()-t0)/1e6;
      return {opt:d,states:dist.size,transitions,phaseChecks,phaseMismatches,ms};
    }
    for(let e=0;e<inst.m;e++){
      transitions++;
      const J=phaseFormula(inst,I,e);
      if(crossCheck){
        phaseChecks++;
        const Jo=phaseOperational(inst,I,e);
        if(J!==Jo) phaseMismatches++;
      }
      if(!dist.has(J)){
        dist.set(J,d+1);
        queue.push(J);
      }
    }
  }
  const ms=Number(process.hrtime.bigint()-t0)/1e6;
  return {opt:null,states:dist.size,transitions,phaseChecks,phaseMismatches,ms};
}

function backwardAntichain(inst){
  const t0=process.hrtime.bigint();
  if(inst.full===0) return {opt:0,layers:0,peakBasis:1,finalBasis:[0],regressions:0,candidates:0,ms:0,bases:[[0]]};
  let basis=[inst.full>>>0];
  const bases=[basis.slice()];
  let regressions=0,candidates=0,peakBasis=1;
  for(let k=0;k<=inst.n+1;k++){
    if(basis.includes(0)){
      const ms=Number(process.hrtime.bigint()-t0)/1e6;
      return {opt:k,layers:k,peakBasis,finalBasis:basis,regressions,candidates,ms,bases};
    }
    const cand=basis.slice();
    for(const J of basis){
      for(let e=0;e<inst.m;e++){
        regressions++;
        cand.push(principalPred(inst,J,e));
      }
    }
    candidates+=cand.length;
    const next=minAntichain(cand);
    peakBasis=Math.max(peakBasis,next.length);
    if(sameBasis(next,basis)){
      const ms=Number(process.hrtime.bigint()-t0)/1e6;
      return {opt:null,layers:k,peakBasis,finalBasis:basis,regressions,candidates,ms,bases};
    }
    basis=next;
    bases.push(basis.slice());
  }
  throw new Error('backward recurrence exceeded finite strict-change bound');
}

function* enumerateForests(n){
  const parent=Array(n).fill(-1);
  function* rec(i){
    if(i===n){
      yield parent.slice();
      return;
    }
    parent[i]=-1;
    yield* rec(i+1);
    for(let p=i+1;p<n;p++){
      parent[i]=p;
      yield* rec(i+1);
    }
  }
  yield* rec(0);
}

function exhaustive(){
  let instances=0;
  let optMismatches=0;
  let phaseMismatches=0;
  let phaseChecks=0;
  let forwardStates=0;
  let backwardPeakSum=0;
  const byN=[];
  for(let n=0;n<=5;n++){
    let ni=0,nOptMismatch=0,nPhaseMismatch=0,nPhaseChecks=0,nStates=0,nPeak=0;
    const full=n===0?0:(2**n-1)>>>0;
    for(const parent of enumerateForests(n)){
      for(let s0=0;s0<=full;s0++){
        for(let s1=0;s1<=full;s1++){
          const inst=makeInstance(parent,[s0,s1]);
          const f=forwardBfs(inst,true);
          const b=backwardAntichain(inst);
          ni++; instances++;
          phaseMismatches+=f.phaseMismatches;
          phaseChecks+=f.phaseChecks;
          forwardStates+=f.states;
          backwardPeakSum+=b.peakBasis;
          nPhaseMismatch+=f.phaseMismatches;
          nPhaseChecks+=f.phaseChecks;
          nStates+=f.states;
          nPeak+=b.peakBasis;
          if(f.opt!==b.opt){
            optMismatches++; nOptMismatch++;
            if(optMismatches<=5){
              console.error('OPT_MISMATCH',JSON.stringify({n,parent,s0,s1,forward:f.opt,backward:b.opt}));
            }
          }
        }
      }
    }
    byN.push({
      n,instances:ni,opt_mismatches:nOptMismatch,
      phase_checks:nPhaseChecks,phase_mismatches:nPhaseMismatch,
      mean_forward_states:ni?nStates/ni:0,
      mean_backward_peak_basis:ni?nPeak/ni:0
    });
  }
  return {
    instances,opt_mismatches:optMismatches,
    phase_checks:phaseChecks,phase_mismatches:phaseMismatches,
    mean_forward_states:instances?forwardStates/instances:0,
    mean_backward_peak_basis:instances?backwardPeakSum/instances:0,
    by_n:byN
  };
}

function rng(seed){
  let x=seed>>>0;
  return function(){
    x^=(x<<13)>>>0;
    x^=x>>>17;
    x^=(x<<5)>>>0;
    x>>>=0;
    return x/4294967296;
  };
}

function randomTree(n,m,seed,singleton=false,p=0.45){
  const rnd=rng(seed);
  const parent=Array(n).fill(-1);
  if(n>0){
    parent[n-1]=-1;
    for(let i=0;i<n-1;i++){
      const span=n-i-1;
      parent[i]=i+1+Math.floor(rnd()*span);
    }
  }
  const supports=Array(m).fill(0);
  for(let q=0;q<n;q++){
    if(singleton){
      const e=Math.floor(rnd()*m);
      supports[e]=(supports[e]|((1<<q)>>>0))>>>0;
    }else{
      let any=false;
      for(let e=0;e<m;e++){
        if(rnd()<p){
          supports[e]=(supports[e]|((1<<q)>>>0))>>>0;
          any=true;
        }
      }
      if(!any){
        const e=Math.floor(rnd()*m);
        supports[e]=(supports[e]|((1<<q)>>>0))>>>0;
      }
    }
  }
  return makeInstance(parent,supports);
}

function chainForest(n,m,chains,seed){
  const rnd=rng(seed);
  const groups=Array.from({length:chains},()=>[]);
  for(let i=0;i<n;i++) groups[i%chains].push(i);
  const parent=Array(n).fill(-1);
  for(const g of groups){
    for(let i=0;i+1<g.length;i++) parent[g[i]]=g[i+1];
  }
  const supports=Array(m).fill(0);
  for(let q=0;q<n;q++){
    const e=Math.floor(rnd()*m);
    supports[e]=(supports[e]|((1<<q)>>>0))>>>0;
  }
  return makeInstance(parent,supports);
}

function benchmark(){
  const cases=[];
  let id=0;
  for(const n of [12,18,24,28]){
    for(let s=0;s<4;s++){
      cases.push({name:'singleton-tree-'+n+'-'+s,inst:randomTree(n,4,1000+n*17+s,true)});
      cases.push({name:'setvalued-tree-'+n+'-'+s,inst:randomTree(n,5,2000+n*19+s,false,0.42)});
      cases.push({name:'singleton-4chains-'+n+'-'+s,inst:chainForest(n,4,4,3000+n*23+s)});
    }
  }
  const rows=[];
  let optMismatches=0;
  for(const c of cases){
    id++;
    const f=forwardBfs(c.inst,false);
    const b=backwardAntichain(c.inst);
    if(f.opt!==b.opt) optMismatches++;
    rows.push({
      id,name:c.name,n:c.inst.n,operators:c.inst.m,
      opt_forward:f.opt,opt_backward:b.opt,
      forward_states:f.states,forward_transitions:f.transitions,forward_ms:f.ms,
      backward_layers:b.layers,backward_peak_basis:b.peakBasis,
      backward_regressions:b.regressions,backward_candidates:b.candidates,backward_ms:b.ms,
      state_to_peak_ratio:b.peakBasis?f.states/b.peakBasis:null,
      time_ratio_forward_over_backward:b.ms>0?f.ms/b.ms:null
    });
  }
  function mean(key){
    const xs=rows.map(r=>r[key]).filter(Number.isFinite);
    return xs.reduce((a,b)=>a+b,0)/(xs.length||1);
  }
  return {
    cases:rows.length,
    opt_mismatches:optMismatches,
    mean_forward_states:mean('forward_states'),
    mean_backward_peak_basis:mean('backward_peak_basis'),
    mean_state_to_peak_ratio:mean('state_to_peak_ratio'),
    mean_forward_ms:mean('forward_ms'),
    mean_backward_ms:mean('backward_ms'),
    rows
  };
}

function markdown(exh,bench){
  const lines=[];
  lines.push('# Experiment 033 result');
  lines.push('');
  lines.push('## Correctness');
  lines.push('');
  lines.push('- exhaustive instances: '+exh.instances);
  lines.push('- forward/backward optimum mismatches: '+exh.opt_mismatches);
  lines.push('- operational/formula phase checks: '+exh.phase_checks);
  lines.push('- phase mismatches: '+exh.phase_mismatches);
  lines.push('- benchmark cases: '+bench.cases);
  lines.push('- benchmark optimum mismatches: '+bench.opt_mismatches);
  lines.push('');
  lines.push('## Benchmark summary');
  lines.push('');
  lines.push('| metric | value |');
  lines.push('| --- | ---: |');
  lines.push('| mean forward reached states | '+bench.mean_forward_states.toFixed(2)+' |');
  lines.push('| mean backward peak basis | '+bench.mean_backward_peak_basis.toFixed(2)+' |');
  lines.push('| mean forward-states / peak-basis | '+bench.mean_state_to_peak_ratio.toFixed(2)+' |');
  lines.push('| mean forward ms | '+bench.mean_forward_ms.toFixed(4)+' |');
  lines.push('| mean backward ms | '+bench.mean_backward_ms.toFixed(4)+' |');
  lines.push('');
  lines.push('Performance timings are descriptive for this runner only and are not semantic evidence.');
  return lines.join('\n')+'\n';
}

const t0=process.hrtime.bigint();
const exh=exhaustive();
const bench=benchmark();
const totalMs=Number(process.hrtime.bigint()-t0)/1e6;
const pass=exh.opt_mismatches===0&&exh.phase_mismatches===0&&bench.opt_mismatches===0;
const result={
  experiment:'033',
  disposition:pass?'PASS':'FAIL',
  total_ms:totalMs,
  exhaustive:exh,
  benchmark:{
    cases:bench.cases,
    opt_mismatches:bench.opt_mismatches,
    mean_forward_states:bench.mean_forward_states,
    mean_backward_peak_basis:bench.mean_backward_peak_basis,
    mean_state_to_peak_ratio:bench.mean_state_to_peak_ratio,
    mean_forward_ms:bench.mean_forward_ms,
    mean_backward_ms:bench.mean_backward_ms
  }
};
fs.writeFileSync(OUT+'/EXHAUSTIVE.json',JSON.stringify(exh,null,2)+'\n');
fs.writeFileSync(OUT+'/BENCHMARK.json',JSON.stringify(bench,null,2)+'\n');
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(OUT+'/SUMMARY.md',markdown(exh,bench));
console.log(JSON.stringify(result,null,2));
if(!pass) process.exitCode=1;
