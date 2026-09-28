import fs from 'node:fs';

const OUT='out/exp035';
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
  const sup=supports.map(x=>(x&full)>>>0);
  const resist=sup.map(x=>(full^x)>>>0);
  return {n,full,parent:parent.slice(),supports:sup,resist,m:sup.length};
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

function alphabetOrder(inst){
  const a=Array.from({length:inst.m},()=>Array(inst.m).fill(false));
  for(let e=0;e<inst.m;e++) for(let f=0;f<inst.m;f++){
    a[e][f]=(((inst.supports[e]&inst.supports[f])>>>0)===(inst.supports[e]>>>0));
  }
  return a;
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
    let strictPred=false;
    for(let j=0;j<uniq.length&&!strictPred;j++){
      if(i===j) continue;
      const v=uniq[j];
      if(wordLeq(v,w,alpha)&&!wordLeq(w,v,alpha)) strictPred=true;
    }
    if(!strictPred) out.push(w);
  }
  out.sort((a,b)=>a.length-b.length||wordKey(a).localeCompare(wordKey(b)));
  return out;
}

function sameWordSet(a,b){
  const A=a.map(wordKey).sort();
  const B=b.map(wordKey).sort();
  return A.length===B.length&&A.every((x,i)=>x===B[i]);
}

function evalWord(inst,w){
  let I=0;
  for(const e of w) I=phase(inst,I,e);
  return I;
}

function buildTrueDfa(inst){
  const states=[0];
  const id=new Map([[0,0]]);
  const trans=[];
  const accepts=[];
  for(let qi=0;qi<states.length;qi++){
    const I=states[qi];
    accepts[qi]=I===inst.full;
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
  return {trans,accepts,initial:0,statePayload:states};
}

function buildBasisDfa(B,alpha,m){
  const init=B.map(()=>0);
  const states=[init];
  const id=new Map([[init.join(','),0]]);
  const trans=[];
  const accepts=[];
  for(let qi=0;qi<states.length;qi++){
    const p=states[qi];
    accepts[qi]=B.some((b,i)=>p[i]>=b.length);
    const row=[];
    for(let e=0;e<m;e++){
      const next=p.slice();
      for(let i=0;i<B.length;i++){
        if(next[i]<B[i].length&&alpha[B[i][next[i]]][e]) next[i]++;
      }
      const key=next.join(',');
      let j=id.get(key);
      if(j===undefined){
        j=states.length;
        id.set(key,j);
        states.push(next);
      }
      row[e]=j;
    }
    trans[qi]=row;
  }
  return {trans,accepts,initial:0,statePayload:states};
}

function minimizeDfa(dfa,m){
  const N=dfa.trans.length;
  let cls=Array(N).fill(0).map((_,q)=>dfa.accepts[q]?1:0);
  while(true){
    const map=new Map();
    const next=Array(N);
    let c=0;
    for(let q=0;q<N;q++){
      const sig=(dfa.accepts[q]?'1':'0')+'|'+dfa.trans[q].map(t=>cls[t]).join(',');
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
  const accepts=Array(K).fill(false);
  for(let c=0;c<K;c++){
    const rep=members[c][0];
    accepts[c]=dfa.accepts[rep];
    for(let e=0;e<m;e++) trans[c][e]=cls[dfa.trans[rep][e]];
  }
  return {classes:members,classOf:cls,trans,accepts,initial:cls[dfa.initial]};
}

function stateOrder(min,m){
  const K=min.classes.length;
  const bad=Array.from({length:K},()=>Array(K).fill(false));
  for(let q=0;q<K;q++) for(let r=0;r<K;r++){
    if(min.accepts[q]&&!min.accepts[r]) bad[q][r]=true;
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
  const accepting=[];
  for(let q=0;q<K;q++) if(min.accepts[q]) accepting.push(q);
  if(accepting.length>1) issues.push('multiple accepting classes');
  for(let q=0;q<K;q++) for(let r=0;r<K;r++){
    if(q!==r&&order[q][r]&&order[r][q]) issues.push('antisymmetry '+q+' '+r);
  }
  for(let q=0;q<K;q++){
    if(!order[min.initial][q]) issues.push('initial-not-min '+q);
    if(accepting.length===1&&!order[q][accepting[0]]) issues.push('accept-not-max '+q);
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

function automatonBasis(min,alpha){
  const accepting=[];
  for(let q=0;q<min.classes.length;q++) if(min.accepts[q]) accepting.push(q);
  if(accepting.length===0) return [];
  if(min.accepts[min.initial]) return [[]];
  if(accepting.length!==1) throw new Error('minimal upward DFA has unexpected accepting classes');
  const acc=accepting[0];
  const order=stateOrder(min,alpha.length);
  const edges=Array.from({length:min.classes.length},()=>[]);
  for(let q=0;q<min.classes.length;q++){
    const byDest=new Map();
    for(let e=0;e<alpha.length;e++){
      const r=min.trans[q][e];
      if(r===q) continue;
      if(!order[q][r]||order[r][q]) throw new Error('non-strict transition');
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
    if(q===acc){words.push(w.slice());return;}
    if(path.has(q)) throw new Error('strict path cycle');
    const nextPath=new Set(path);
    nextPath.add(q);
    for(const edge of edges[q]) for(const e of edge.labels){
      w.push(e);
      dfs(edge.r,w,nextPath);
      w.pop();
    }
  }
  dfs(min.initial,[],new Set());
  return minimizeWords(words,alpha);
}

function equivalentLetters(a,alpha){
  const out=[];
  for(let e=0;e<alpha.length;e++) if(alpha[a][e]&&alpha[e][a]) out.push(e);
  return out;
}

function expandEquivalentWords(B,alpha){
  const out=[];
  for(const w of B){
    function rec(i,p){
      if(i===w.length){out.push(p.slice());return;}
      for(const e of equivalentLetters(w[i],alpha)){
        p.push(e);
        rec(i+1,p);
        p.pop();
      }
    }
    rec(0,[]);
  }
  return minimizeWords(out,alpha);
}

function commonClosureWitness(inst,I,gamma){
  let cur=I>>>0;
  const word=[];
  while(true){
    let changed=false;
    for(const e of gamma){
      const next=phase(inst,cur,e);
      if(next!==cur){
        cur=next;
        word.push(e);
        changed=true;
      }
    }
    if(!changed) return {state:cur,word};
  }
}

function isDownwardMask(mask,alpha){
  for(let e=0;e<alpha.length;e++) if(mask&(1<<e)){
    for(let f=0;f<alpha.length;f++) if(alpha[f][e]&&!(mask&(1<<f))) return false;
  }
  return true;
}

function starOracleWitness(inst,alpha,atoms){
  let I=0;
  const word=[];
  for(const atom of atoms){
    if(atom.type==='opt'){
      word.push(atom.e);
      I=phase(inst,I,atom.e);
    }else{
      if(!isDownwardMask(atom.mask,alpha)) throw new Error('non-downward star mask');
      const r=commonClosureWitness(inst,I,bits(atom.mask));
      I=r.state;
      word.push(...r.word);
    }
  }
  return {intersects:I===inst.full,witness:word,final:I};
}

function productKey(atoms){
  return atoms.map(a=>a.type==='opt'?'o'+a.e:'s'+a.mask).join('|');
}

function complementStarProducts(min,alpha){
  const m=alpha.length;
  const accepting=[];
  for(let q=0;q<min.classes.length;q++) if(min.accepts[q]) accepting.push(q);
  if(accepting.length===0){
    return [[{type:'star',mask:(1<<m)-1}]];
  }
  if(min.accepts[min.initial]) return [];
  if(accepting.length!==1) throw new Error('unexpected accepting classes');
  const acc=accepting[0];
  const order=stateOrder(min,m);
  const loopMask=Array(min.classes.length).fill(0);
  for(let q=0;q<min.classes.length;q++){
    let mask=0;
    for(let e=0;e<m;e++) if(min.trans[q][e]===q) mask|=1<<e;
    if(mask&&!isDownwardMask(mask,alpha)) throw new Error('loop alphabet not downward closed');
    loopMask[q]=mask;
  }
  const out=new Map();
  function add(atoms){out.set(productKey(atoms),atoms);}
  function dfs(q,atoms,path){
    if(path.has(q)) throw new Error('complement strict path cycle');
    const nextPath=new Set(path);
    nextPath.add(q);
    let oneAway=false;
    for(let e=0;e<m;e++) if(min.trans[q][e]===acc) {oneAway=true;break;}
    if(oneAway) add(atoms.slice());
    for(let e=0;e<m;e++){
      const r=min.trans[q][e];
      if(r===q||r===acc) continue;
      if(!order[q][r]||order[r][q]) throw new Error('complement non-strict transition');
      const next=atoms.slice();
      next.push({type:'opt',e});
      if(loopMask[r]) next.push({type:'star',mask:loopMask[r]});
      dfs(r,next,nextPath);
    }
  }
  const initAtoms=[];
  if(loopMask[min.initial]) initAtoms.push({type:'star',mask:loopMask[min.initial]});
  dfs(min.initial,initAtoms,new Set());
  return [...out.values()];
}

function hypothesisAccepts(B,w,alpha){
  return B.some(b=>wordLeq(b,w,alpha));
}

function learnBasis(inst){
  const alpha=alphabetOrder(inst);
  let B=[];
  let iterations=0,oracleQueries=0,productsTested=0,maxHypStates=0,maxProducts=0;
  let qoIssues=0,badCounterexamples=0;
  while(true){
    const h=buildBasisDfa(B,alpha,inst.m);
    const hm=minimizeDfa(h,inst.m);
    maxHypStates=Math.max(maxHypStates,hm.classes.length);
    const order=stateOrder(hm,inst.m);
    const issues=qoGuards(hm,alpha,order);
    qoIssues+=issues.length;
    const products=complementStarProducts(hm,alpha);
    maxProducts=Math.max(maxProducts,products.length);
    let found=null;
    for(const P of products){
      productsTested++;
      oracleQueries++;
      const o=starOracleWitness(inst,alpha,P);
      if(o.intersects){
        if(evalWord(inst,o.witness)!==inst.full) badCounterexamples++;
        if(hypothesisAccepts(B,o.witness,alpha)) badCounterexamples++;
        found=o.witness;
        break;
      }
    }
    if(found===null){
      const expanded=expandEquivalentWords(B,alpha);
      return {basis:B,expanded,iterations,oracleQueries,productsTested,maxHypStates,maxProducts,qoIssues,badCounterexamples};
    }
    B=minimizeWords(B.concat([found]),alpha);
    iterations++;
    if(iterations>256) throw new Error('learner iteration guard exceeded');
  }
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

function exhaustive(){
  let instances=0,mismatches=0,qoIssues=0,badCounterexamples=0,totalIterations=0,totalQueries=0,totalProducts=0;
  const examples=[];
  for(let n=0;n<=4;n++){
    const full=n===0?0:(2**n-1)>>>0;
    for(const parent of enumerateForests(n)){
      for(let s0=0;s0<=full;s0++) for(let s1=0;s1<=full;s1++){
        const inst=makeInstance(parent,[s0,s1]);
        const alpha=alphabetOrder(inst);
        const trueDfa=minimizeDfa(buildTrueDfa(inst),inst.m);
        const reference=automatonBasis(trueDfa,alpha);
        const learned=learnBasis(inst);
        instances++;
        qoIssues+=learned.qoIssues;
        badCounterexamples+=learned.badCounterexamples;
        totalIterations+=learned.iterations;
        totalQueries+=learned.oracleQueries;
        totalProducts+=learned.productsTested;
        if(!sameWordSet(reference,learned.expanded)){
          mismatches++;
          if(examples.length<5) examples.push({n,parent,s0,s1,reference,learned:learned.expanded,representatives:learned.basis});
        }
      }
    }
  }
  return {
    instances,basis_mismatches:mismatches,qo_guard_issues:qoIssues,bad_counterexamples:badCounterexamples,
    total_refinement_iterations:totalIterations,total_oracle_queries:totalQueries,total_products_tested:totalProducts,
    mean_iterations:totalIterations/instances,mean_oracle_queries:totalQueries/instances,
    mismatch_examples:examples
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
  let mismatches=0;
  for(const n of [8,10,12]){
    for(let seed=0;seed<2;seed++){
      for(const kind of ['singleton','setvalued']){
        const inst=randomTree(n,3,15000+n*37+seed+(kind==='setvalued'?1000:0),kind==='singleton',0.45);
        const alpha=alphabetOrder(inst);
        const refMin=minimizeDfa(buildTrueDfa(inst),inst.m);
        const reference=automatonBasis(refMin,alpha);
        const t0=process.hrtime.bigint();
        const learned=learnBasis(inst);
        const ms=Number(process.hrtime.bigint()-t0)/1e6;
        const ok=sameWordSet(reference,learned.expanded);
        if(!ok) mismatches++;
        rows.push({
          name:kind+'-'+n+'-'+seed,
          n,operators:inst.m,
          reference_basis_size:reference.length,
          learned_representative_basis_size:learned.basis.length,
          learned_expanded_basis_size:learned.expanded.length,
          refinement_iterations:learned.iterations,
          oracle_queries:learned.oracleQueries,
          products_tested:learned.productsTested,
          max_hypothesis_states:learned.maxHypStates,
          max_complement_products:learned.maxProducts,
          qo_issues:learned.qoIssues,
          bad_counterexamples:learned.badCounterexamples,
          basis_match:ok,
          learn_ms:ms
        });
      }
    }
  }
  function mean(k){return rows.reduce((a,r)=>a+r[k],0)/rows.length;}
  return {
    cases:rows.length,basis_mismatches:mismatches,
    mean_reference_basis_size:mean('reference_basis_size'),
    mean_refinement_iterations:mean('refinement_iterations'),
    mean_oracle_queries:mean('oracle_queries'),
    mean_products_tested:mean('products_tested'),
    mean_max_hypothesis_states:mean('max_hypothesis_states'),
    mean_learn_ms:mean('learn_ms'),
    total_qo_issues:rows.reduce((a,r)=>a+r.qo_issues,0),
    total_bad_counterexamples:rows.reduce((a,r)=>a+r.bad_counterexamples,0),
    rows
  };
}

const t0=process.hrtime.bigint();
const ex=exhaustive();
const bench=benchmark();
const totalMs=Number(process.hrtime.bigint()-t0)/1e6;
const pass=ex.basis_mismatches===0&&ex.qo_guard_issues===0&&ex.bad_counterexamples===0&&bench.basis_mismatches===0&&bench.total_qo_issues===0&&bench.total_bad_counterexamples===0;
const result={
  experiment:'035',disposition:pass?'PASS':'FAIL',total_ms:totalMs,
  exhaustive:ex,
  benchmark:{
    cases:bench.cases,basis_mismatches:bench.basis_mismatches,
    mean_reference_basis_size:bench.mean_reference_basis_size,
    mean_refinement_iterations:bench.mean_refinement_iterations,
    mean_oracle_queries:bench.mean_oracle_queries,
    mean_products_tested:bench.mean_products_tested,
    mean_max_hypothesis_states:bench.mean_max_hypothesis_states,
    mean_learn_ms:bench.mean_learn_ms,
    total_qo_issues:bench.total_qo_issues,
    total_bad_counterexamples:bench.total_bad_counterexamples
  }
};
fs.writeFileSync(OUT+'/EXHAUSTIVE.json',JSON.stringify(ex,null,2)+'\n');
fs.writeFileSync(OUT+'/BENCHMARK.json',JSON.stringify(bench,null,2)+'\n');
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(!pass) process.exitCode=1;
