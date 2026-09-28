import fs from 'node:fs';

const OUT='out/exp034';
fs.mkdirSync(OUT,{recursive:true});

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
  if(n>28) throw new Error('compact harness supports n<=28');
  const full=n===0?0:(2**n-1)>>>0;
  const children=Array.from({length:n},()=>[]);
  for(let i=0;i<n;i++) if(parent[i]>=0) children[parent[i]].push(i);
  const sup=supports.map(x=>(x&full)>>>0);
  const resist=sup.map(x=>(full^x)>>>0);
  return {n,full,parent:parent.slice(),children,supports:sup,resist,m:sup.length};
}

function upClosure(inst,mask){
  let out=mask>>>0;
  for(const q of bits(mask)){
    let p=inst.parent[q];
    while(p>=0){
      out=(out|(1<<p))>>>0;
      p=inst.parent[p];
    }
  }
  return out>>>0;
}

function phase(inst,I,e){
  const active=(inst.full^I)>>>0;
  const survivors=upClosure(inst,(active&inst.resist[e])>>>0);
  return (inst.full^survivors)>>>0;
}

function buildDfa(inst){
  const states=[0];
  const id=new Map([[0,0]]);
  const trans=[];
  for(let qi=0;qi<states.length;qi++){
    const I=states[qi];
    const row=[];
    for(let e=0;e<inst.m;e++){
      const J=phase(inst,I,e);
      let j=id.get(J);
      if(j===undefined){
        j=states.length;
        id.set(J,j);
        states.push(J);
      }
      row[e]=j;
    }
    trans[qi]=row;
  }
  return {states,trans,initial:0,accept:id.has(inst.full)?id.get(inst.full):-1};
}

function minimizeDfa(dfa,m){
  const N=dfa.states.length;
  let cls=Array(N).fill(0).map((_,q)=>q===dfa.accept?1:0);
  while(true){
    const map=new Map();
    const next=Array(N);
    let c=0;
    for(let q=0;q<N;q++){
      const sig=(q===dfa.accept?'1':'0')+'|'+dfa.trans[q].map(t=>cls[t]).join(',');
      if(!map.has(sig)) map.set(sig,c++);
      next[q]=map.get(sig);
    }
    let same=true;
    for(let q=0;q<N;q++) if(next[q]!==cls[q]) {same=false;break;}
    cls=next;
    if(same) break;
  }
  const K=Math.max(...cls)+1;
  const members=Array.from({length:K},()=>[]);
  for(let q=0;q<N;q++) members[cls[q]].push(q);
  const trans=Array.from({length:K},()=>Array(m).fill(0));
  for(let c=0;c<K;c++){
    const rep=members[c][0];
    for(let e=0;e<m;e++) trans[c][e]=cls[dfa.trans[rep][e]];
  }
  return {
    classes:members,
    classOf:cls,
    trans,
    initial:cls[dfa.initial],
    accept:dfa.accept>=0?cls[dfa.accept]:-1
  };
}

function alphabetOrder(inst){
  const a=Array.from({length:inst.m},()=>Array(inst.m).fill(false));
  for(let e=0;e<inst.m;e++) for(let f=0;f<inst.m;f++){
    a[e][f]=(((inst.supports[e]&inst.supports[f])>>>0)===(inst.supports[e]>>>0));
  }
  return a;
}

function stateOrder(min,m){
  const K=min.classes.length;
  const bad=Array.from({length:K},()=>Array(K).fill(false));
  for(let q=0;q<K;q++) for(let r=0;r<K;r++){
    if(q===min.accept && r!==min.accept) bad[q][r]=true;
  }
  let changed=true;
  while(changed){
    changed=false;
    for(let q=0;q<K;q++) for(let r=0;r<K;r++){
      if(bad[q][r]) continue;
      for(let e=0;e<m;e++){
        if(bad[min.trans[q][e]][min.trans[r][e]]){
          bad[q][r]=true;
          changed=true;
          break;
        }
      }
    }
  }
  return bad.map(row=>row.map(x=>!x));
}

function qoGuards(min,alpha,order){
  const K=min.classes.length;
  const issues=[];
  for(let q=0;q<K;q++) for(let r=0;r<K;r++){
    if(q!==r&&order[q][r]&&order[r][q]) issues.push('antisymmetry '+q+' '+r);
  }
  for(let q=0;q<K;q++){
    if(!order[min.initial][q]) issues.push('initial-not-min '+q);
    if(min.accept>=0&&!order[q][min.accept]) issues.push('accept-not-max '+q);
    for(let e=0;e<alpha.length;e++){
      if(!order[q][min.trans[q][e]]) issues.push('non-extensive '+q+' '+e);
    }
  }
  for(let q=0;q<K;q++) for(let r=0;r<K;r++) if(order[q][r]){
    for(let e=0;e<alpha.length;e++) for(let f=0;f<alpha.length;f++) if(alpha[e][f]){
      if(!order[min.trans[q][e]][min.trans[r][f]]) issues.push('non-monotone '+q+' '+r+' '+e+' '+f);
    }
  }
  return issues;
}

function wordKey(w){return w.join(',');}

function wordLeq(u,v,alpha){
  let j=0;
  for(let i=0;i<u.length;i++){
    while(j<v.length&&!alpha[u[i]][v[j]]) j++;
    if(j===v.length) return false;
    j++;
  }
  return true;
}

function minimizeWords(words,alpha){
  const uniq=[...new Map(words.map(w=>[wordKey(w),w])).values()];
  const out=[];
  for(let i=0;i<uniq.length;i++){
    const w=uniq[i];
    let dominated=false;
    for(let j=0;j<uniq.length&&!dominated;j++){
      if(i===j) continue;
      const v=uniq[j];
      if(wordLeq(v,w,alpha)&&!wordLeq(w,v,alpha)) dominated=true;
    }
    if(!dominated) out.push(w);
  }
  out.sort((a,b)=>a.length-b.length||wordKey(a).localeCompare(wordKey(b)));
  return out;
}

function automatonBasis(min,alpha){
  if(min.accept<0) return [];
  if(min.initial===min.accept) return [[]];
  const K=min.classes.length;
  const order=stateOrder(min,alpha.length);
  const edges=Array.from({length:K},()=>[]);
  for(let q=0;q<K;q++){
    const byDest=new Map();
    for(let e=0;e<alpha.length;e++){
      const r=min.trans[q][e];
      if(r===q) continue;
      if(!order[q][r]||order[r][q]) throw new Error('non-strict transition in minimal QO automaton');
      if(!byDest.has(r)) byDest.set(r,[]);
      byDest.get(r).push(e);
    }
    for(const [r,labels] of byDest){
      const mins=labels.filter(e=>!labels.some(f=>f!==e&&alpha[f][e]&&!alpha[e][f]));
      edges[q].push({r,labels:mins});
    }
  }
  const words=[];
  function dfs(q,w,path){
    if(q===min.accept){
      words.push(w.slice());
      return;
    }
    if(path.has(q)) throw new Error('strict path cycle');
    const nextPath=new Set(path);
    nextPath.add(q);
    for(const edge of edges[q]){
      for(const e of edge.labels){
        w.push(e);
        dfs(edge.r,w,nextPath);
        w.pop();
      }
    }
  }
  dfs(min.initial,[],new Set());
  return minimizeWords(words,alpha);
}

function evalWord(inst,w){
  let I=0;
  for(const e of w) I=phase(inst,I,e);
  return I;
}

function bruteBasis(inst,alpha){
  if(inst.full===0) return [[]];
  const solving=[];
  const w=[];
  function dfs(I,depth){
    if(I===inst.full){
      solving.push(w.slice());
      return;
    }
    if(depth===inst.n) return;
    for(let e=0;e<inst.m;e++){
      const J=phase(inst,I,e);
      if(J===I) continue;
      w.push(e);
      dfs(J,depth+1);
      w.pop();
    }
  }
  dfs(0,0);
  return minimizeWords(solving,alpha);
}

function sameWordSet(a,b){
  const A=a.map(wordKey).sort();
  const B=b.map(wordKey).sort();
  return A.length===B.length&&A.every((x,i)=>x===B[i]);
}

function commonClosure(inst,I,gamma){
  let cur=I>>>0;
  while(true){
    let changed=false;
    for(const e of gamma){
      const next=phase(inst,cur,e);
      if(next!==cur){
        cur=next;
        changed=true;
      }
    }
    if(!changed) return cur>>>0;
  }
}

function downwardOperatorSubsets(alpha){
  const m=alpha.length,out=[];
  for(let mask=1;mask<(1<<m);mask++){
    let ok=true;
    for(let e=0;e<m&&ok;e++) if(mask&(1<<e)){
      for(let f=0;f<m;f++) if(alpha[f][e]&&!(mask&(1<<f))){ok=false;break;}
    }
    if(ok) out.push(mask);
  }
  return out;
}

function starOracle(inst,alpha,atoms){
  let I=0;
  for(const atom of atoms){
    if(atom.type==='opt'){
      I=phase(inst,I,atom.e);
    }else{
      I=commonClosure(inst,I,bits(atom.mask));
    }
  }
  return I===inst.full;
}

function bruteStar(inst,alpha,atoms){
  let states=new Set([0]);
  for(const atom of atoms){
    const next=new Set();
    if(atom.type==='opt'){
      const allowed=[];
      for(let e=0;e<inst.m;e++) if(alpha[e][atom.e]) allowed.push(e);
      for(const I of states){
        next.add(I);
        for(const e of allowed) next.add(phase(inst,I,e));
      }
    }else{
      const gamma=bits(atom.mask);
      for(const I0 of states){
        const q=[I0];
        const seen=new Set([I0]);
        for(let i=0;i<q.length;i++){
          const I=q[i];
          for(const e of gamma){
            const J=phase(inst,I,e);
            if(!seen.has(J)){seen.add(J);q.push(J);}
          }
        }
        for(const I of seen) next.add(I);
      }
    }
    states=next;
  }
  return states.has(inst.full);
}

function* enumerateForests(n){
  const parent=Array(n).fill(-1);
  function* rec(i){
    if(i===n){yield parent.slice();return;}
    parent[i]=-1;
    yield* rec(i+1);
    for(let p=i+1;p<n;p++){
      parent[i]=p;
      yield* rec(i+1);
    }
  }
  yield* rec(0);
}

function basisControls(){
  let instances=0,mismatches=0,guardFailures=0,totalReach=0,totalMin=0,totalBrute=0,totalAuto=0;
  const examples=[];
  for(let n=0;n<=4;n++){
    const full=n===0?0:(2**n-1)>>>0;
    for(const parent of enumerateForests(n)){
      for(let s0=0;s0<=full;s0++) for(let s1=0;s1<=full;s1++){
        const inst=makeInstance(parent,[s0,s1]);
        const alpha=alphabetOrder(inst);
        const dfa=buildDfa(inst);
        const min=minimizeDfa(dfa,inst.m);
        const order=stateOrder(min,inst.m);
        const issues=qoGuards(min,alpha,order);
        const auto=automatonBasis(min,alpha);
        const brute=bruteBasis(inst,alpha);
        instances++;
        totalReach+=dfa.states.length;
        totalMin+=min.classes.length;
        totalBrute+=brute.length;
        totalAuto+=auto.length;
        if(issues.length) guardFailures++;
        if(!sameWordSet(auto,brute)){
          mismatches++;
          if(examples.length<5) examples.push({n,parent,s0,s1,auto,brute,issues});
        }
      }
    }
  }
  return {
    instances,basis_mismatches:mismatches,qo_guard_failures:guardFailures,
    mean_reachable_states:totalReach/instances,
    mean_minimal_dfa_states:totalMin/instances,
    mean_brute_basis_size:totalBrute/instances,
    mean_automaton_basis_size:totalAuto/instances,
    mismatch_examples:examples
  };
}

function starControls(){
  let instances=0,products=0,mismatches=0;
  const examples=[];
  for(let n=0;n<=3;n++){
    const full=n===0?0:(2**n-1)>>>0;
    for(const parent of enumerateForests(n)){
      for(let s0=0;s0<=full;s0++) for(let s1=0;s1<=full;s1++){
        const inst=makeInstance(parent,[s0,s1]);
        const alpha=alphabetOrder(inst);
        const atoms=[];
        for(let e=0;e<inst.m;e++) atoms.push({type:'opt',e});
        for(const mask of downwardOperatorSubsets(alpha)) atoms.push({type:'star',mask});
        const all=[[]];
        for(let len=1;len<=3;len++){
          const prev=all.filter(x=>x.length===len-1);
          for(const p of prev) for(const a of atoms) all.push(p.concat([a]));
        }
        for(const product of all){
          products++;
          const a=starOracle(inst,alpha,product);
          const b=bruteStar(inst,alpha,product);
          if(a!==b){
            mismatches++;
            if(examples.length<5) examples.push({n,parent,s0,s1,product,oracle:a,brute:b});
          }
        }
        instances++;
      }
    }
  }
  return {instances,products,mismatches,mismatch_examples:examples};
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
    for(let i=0;i<n-1;i++) parent[i]=i+1+Math.floor(rnd()*(n-i-1));
  }
  const supports=Array(m).fill(0);
  for(let q=0;q<n;q++){
    if(singleton){
      const e=Math.floor(rnd()*m);
      supports[e]=(supports[e]|(1<<q))>>>0;
    }else{
      let any=false;
      for(let e=0;e<m;e++) if(rnd()<p){
        supports[e]=(supports[e]|(1<<q))>>>0;
        any=true;
      }
      if(!any){
        const e=Math.floor(rnd()*m);
        supports[e]=(supports[e]|(1<<q))>>>0;
      }
    }
  }
  return makeInstance(parent,supports);
}

function benchmark(){
  const rows=[];
  for(const n of [8,10,12]){
    for(let seed=0;seed<2;seed++){
      for(const kind of ['singleton','setvalued']){
        const inst=randomTree(n,3,9000+n*31+seed+(kind==='setvalued'?1000:0),kind==='singleton',0.45);
        const alpha=alphabetOrder(inst);
        const t0=process.hrtime.bigint();
        const dfa=buildDfa(inst);
        const t1=process.hrtime.bigint();
        const min=minimizeDfa(dfa,inst.m);
        const order=stateOrder(min,inst.m);
        const issues=qoGuards(min,alpha,order);
        const basis=automatonBasis(min,alpha);
        const t2=process.hrtime.bigint();
        let solveChecks=0,badBasis=0;
        for(const w of basis){
          solveChecks++;
          if(evalWord(inst,w)!==inst.full) badBasis++;
        }
        rows.push({
          name:kind+'-'+n+'-'+seed,
          n,operators:inst.m,
          reachable_states:dfa.states.length,
          minimal_dfa_states:min.classes.length,
          compression_ratio:dfa.states.length/min.classes.length,
          basis_size:basis.length,
          max_basis_length:basis.reduce((a,w)=>Math.max(a,w.length),0),
          qo_guard_issues:issues.length,
          bad_basis_words:badBasis,
          build_dfa_ms:Number(t1-t0)/1e6,
          minimize_and_basis_ms:Number(t2-t1)/1e6
        });
      }
    }
  }
  function mean(k){
    return rows.reduce((a,r)=>a+r[k],0)/rows.length;
  }
  return {
    cases:rows.length,
    mean_reachable_states:mean('reachable_states'),
    mean_minimal_dfa_states:mean('minimal_dfa_states'),
    mean_compression_ratio:mean('compression_ratio'),
    mean_basis_size:mean('basis_size'),
    total_qo_guard_issues:rows.reduce((a,r)=>a+r.qo_guard_issues,0),
    total_bad_basis_words:rows.reduce((a,r)=>a+r.bad_basis_words,0),
    rows
  };
}

const t0=process.hrtime.bigint();
const basis=basisControls();
const star=starControls();
const bench=benchmark();
const totalMs=Number(process.hrtime.bigint()-t0)/1e6;
const pass=basis.basis_mismatches===0&&basis.qo_guard_failures===0&&star.mismatches===0&&bench.total_qo_guard_issues===0&&bench.total_bad_basis_words===0;
const result={
  experiment:'034',
  disposition:pass?'PASS':'FAIL',
  total_ms:totalMs,
  basis_controls:basis,
  star_controls:star,
  benchmark:{
    cases:bench.cases,
    mean_reachable_states:bench.mean_reachable_states,
    mean_minimal_dfa_states:bench.mean_minimal_dfa_states,
    mean_compression_ratio:bench.mean_compression_ratio,
    mean_basis_size:bench.mean_basis_size,
    total_qo_guard_issues:bench.total_qo_guard_issues,
    total_bad_basis_words:bench.total_bad_basis_words
  }
};
fs.writeFileSync(OUT+'/BASIS_CONTROLS.json',JSON.stringify(basis,null,2)+'\n');
fs.writeFileSync(OUT+'/STAR_CONTROLS.json',JSON.stringify(star,null,2)+'\n');
fs.writeFileSync(OUT+'/BENCHMARK.json',JSON.stringify(bench,null,2)+'\n');
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(!pass) process.exitCode=1;
