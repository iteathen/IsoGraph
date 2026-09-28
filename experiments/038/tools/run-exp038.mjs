import fs from 'node:fs';

const OUT='out/exp038';
fs.mkdirSync(OUT,{recursive:true});

function makeInstance(parent,emask,m){
  const n=parent.length, full=n===0?0:(2**n-1)>>>0;
  const children=Array.from({length:n},()=>[]);
  for(let q=0;q<n;q++) if(parent[q]>=0) children[parent[q]].push(q);
  const supports=Array(m).fill(0);
  for(let q=0;q<n;q++) for(let e=0;e<m;e++) if(emask[q]&(1<<e)) supports[e]=(supports[e]|(1<<q))>>>0;
  const resist=supports.map(s=>(full^s)>>>0);
  return {n,full,parent:parent.slice(),children,emask:emask.slice(),m,supports,resist};
}

function bits(mask){
  const a=[]; let x=mask>>>0;
  while(x){const b=x&-x;a.push(31-Math.clz32(b));x=(x^b)>>>0;}
  return a;
}

function upClosure(inst,mask){
  let out=mask>>>0;
  for(const q of bits(mask)){
    let p=inst.parent[q];
    while(p>=0){out=(out|(1<<p))>>>0;p=inst.parent[p];}
  }
  return out>>>0;
}

function phase(inst,I,e){
  const active=(inst.full^I)>>>0;
  return (inst.full^upClosure(inst,(active&inst.resist[e])>>>0))>>>0;
}

function reachableGraph(inst){
  const states=[0], id=new Map([[0,0]]), trans=[];
  for(let qi=0;qi<states.length;qi++){
    const row=[];
    for(let e=0;e<inst.m;e++){
      const J=phase(inst,states[qi],e);
      let j=id.get(J);
      if(j===undefined){j=states.length;id.set(J,j);states.push(J);}
      row[e]=j;
    }
    trans[qi]=row;
  }
  const top=id.get(inst.full);
  if(top===undefined) throw new Error('nonempty susceptibility instance unexpectedly unsolvable');
  const rev=Array.from({length:states.length},()=>[]);
  for(let q=0;q<states.length;q++) for(let e=0;e<inst.m;e++){
    const r=trans[q][e];
    if(r!==q) rev[r].push({q,e});
  }
  const dist=Array(states.length).fill(Infinity); dist[top]=0;
  const queue=[top];
  for(let i=0;i<queue.length;i++){
    const r=queue[i];
    for(const x of rev[r]) if(!Number.isFinite(dist[x.q])){
      dist[x.q]=dist[r]+1;
      queue.push(x.q);
    }
  }
  return {states,id,trans,dist,top};
}

function optimalWords(inst,g,sid,limit=64){
  const out=[], w=[];
  function dfs(q){
    if(out.length>=limit) return;
    if(g.dist[q]===0){out.push(w.slice());return;}
    for(let e=0;e<inst.m;e++){
      const r=g.trans[q][e];
      if(g.dist[r]===g.dist[q]-1){
        w.push(e); dfs(r); w.pop();
        if(out.length>=limit) return;
      }
    }
  }
  dfs(sid);
  return out;
}

function activeLeaves(inst,I){
  const active=(inst.full^I)>>>0,out=[];
  for(let q=0;q<inst.n;q++){
    if(!(active&(1<<q))) continue;
    let child=false;
    for(const c of inst.children[q]) if(active&(1<<c)){child=true;break;}
    if(!child) out.push(q);
  }
  return out;
}

function activePaths(inst,I){
  const active=(inst.full^I)>>>0,out=[];
  for(const leaf of activeLeaves(inst,I)){
    const p=[]; let q=leaf;
    while(q>=0&&(active&(1<<q))){p.push(q);q=inst.parent[q];}
    out.push(p);
  }
  return out;
}

function pathGroupCost(inst,path,gamma){
  const L=path.length, INF=1e9, dp=Array(L+1).fill(INF); dp[0]=0;
  const all=(1<<inst.m)-1;
  for(let j=1;j<=L;j++){
    let inter=all;
    for(let i=j-1;i>=0;i--){
      inter &= inst.emask[path[i]];
      if(inter===0) break;
      const cost=(inter & (~gamma))!==0?0:1;
      dp[j]=Math.min(dp[j],dp[i]+cost);
    }
  }
  return dp[L];
}

function pathSeg(inst,path){
  return pathGroupCost(inst,path,(1<<inst.m)-1);
}

function setPartitions(m){
  const out=[], groups=[];
  function rec(x){
    if(x===m){out.push(groups.slice());return;}
    for(let i=0;i<groups.length;i++){
      groups[i]|=1<<x; rec(x+1); groups[i]&=~(1<<x);
    }
    groups.push(1<<x); rec(x+1); groups.pop();
  }
  rec(0);
  return out;
}

const partitionCache=new Map();
function partitions(m){
  if(!partitionCache.has(m)) partitionCache.set(m,setPartitions(m));
  return partitionCache.get(m);
}

function bounds(inst,I){
  if(I===inst.full) return {seg:0,plb:0,best:[]};
  const paths=activePaths(inst,I);
  let seg=0;
  for(const p of paths) seg=Math.max(seg,pathSeg(inst,p));
  let plb=-1,best=[];
  for(const Pi of partitions(inst.m)){
    let sum=0;
    for(const gamma of Pi){
      let r=0;
      for(const p of paths) r=Math.max(r,pathGroupCost(inst,p,gamma));
      sum+=r;
    }
    if(sum>plb){plb=sum;best=[Pi.slice()];}
    else if(sum===plb) best.push(Pi.slice());
  }
  return {seg,plb,best};
}

function seqKey(seq){return seq.join('.');}
const pairMemo=new Map();

function pairOptSeq(a,b,m){
  let ka=seqKey(a), kb=seqKey(b);
  if(ka>kb){const t=a;a=b;b=t;const tk=ka;ka=kb;kb=tk;}
  const key=m+'|'+ka+'|'+kb;
  if(pairMemo.has(key)) return pairMemo.get(key);
  const la=a.length,lb=b.length;
  const W=lb+1;
  const start=0,goal=la*W+lb;
  const dist=new Int16Array((la+1)*(lb+1)); dist.fill(-1); dist[start]=0;
  const q=[start];
  function advance(seq,i,e){
    while(i<seq.length && (seq[i]&(1<<e))) i++;
    return i;
  }
  for(let qi=0;qi<q.length;qi++){
    const s=q[qi], ia=Math.floor(s/W), ib=s%W, d=dist[s];
    if(s===goal){pairMemo.set(key,d);return d;}
    for(let e=0;e<m;e++){
      const na=advance(a,ia,e), nb=advance(b,ib,e);
      if(na===ia&&nb===ib) continue;
      const ns=na*W+nb;
      if(dist[ns]===-1){dist[ns]=d+1;q.push(ns);}
    }
  }
  pairMemo.set(key,Infinity);
  return Infinity;
}

function pairBound(inst,I){
  const paths=activePaths(inst,I);
  if(paths.length===0) return {p2:0,pathSeqs:[],pairMatrix:[]};
  const seqs=paths.map(p=>p.map(q=>inst.emask[q]));
  let p2=0;
  const mat=Array.from({length:seqs.length},()=>Array(seqs.length).fill(null));
  for(let i=0;i<seqs.length;i++){
    const d=pairOptSeq(seqs[i],[],inst.m);
    mat[i][i]=d; p2=Math.max(p2,d);
    for(let j=i+1;j<seqs.length;j++){
      const x=pairOptSeq(seqs[i],seqs[j],inst.m);
      mat[i][j]=mat[j][i]=x;
      p2=Math.max(p2,x);
    }
  }
  return {p2,pathSeqs:seqs,pairMatrix:mat};
}

function* enumerateForests(n){
  const parent=Array(n).fill(-1);
  function* rec(i){
    if(i===n){yield parent.slice();return;}
    parent[i]=-1; yield* rec(i+1);
    for(let p=i+1;p<n;p++){parent[i]=p;yield* rec(i+1);}
  }
  yield* rec(0);
}

function* enumerateMasks(n,m){
  const a=Array(n).fill(1), max=(1<<m)-1;
  function* rec(i){
    if(i===n){yield a.slice();return;}
    for(let x=1;x<=max;x++){a[i]=x;yield* rec(i+1);}
  }
  yield* rec(0);
}

function activeNodeCount(inst,I){
  return inst.n-bits(I).length;
}

function runSurface(ns,m){
  const s={
    instances:0,states:0,plb_gap_states:0,
    p2_gt_dist:0,lb2_gt_dist:0,
    p2_tight:0,lb2_tight:0,
    p2_closes_plb_gap:0,residual_after_lb2:0,
    sum_dist:0,sum_plb:0,sum_p2:0,sum_lb2:0,
    residual_examples:[],closed_examples:[]
  };
  for(const n of ns){
    for(const parent of enumerateForests(n)){
      for(const emask of enumerateMasks(n,m)){
        const inst=makeInstance(parent,emask,m), g=reachableGraph(inst); s.instances++;
        for(let sid=0;sid<g.states.length;sid++){
          const I=g.states[sid], d=g.dist[sid], b=bounds(inst,I), p=pairBound(inst,I), lb2=Math.max(b.plb,p.p2);
          s.states++; s.sum_dist+=d;s.sum_plb+=b.plb;s.sum_p2+=p.p2;s.sum_lb2+=lb2;
          if(p.p2>d) s.p2_gt_dist++;
          if(lb2>d) s.lb2_gt_dist++;
          if(p.p2===d) s.p2_tight++;
          if(lb2===d) s.lb2_tight++;
          if(b.plb<d){
            s.plb_gap_states++;
            if(p.p2===d){
              s.p2_closes_plb_gap++;
              if(s.closed_examples.length<8){
                s.closed_examples.push({
                  n,parent:parent.slice(),emask:emask.slice(),removed:I,active_nodes:activeNodeCount(inst,I),
                  exact:d,seg:b.seg,plb:b.plb,p2:p.p2,lb2,best_partitions:b.best,
                  path_sequences:p.pathSeqs,pair_matrix:p.pairMatrix,
                  optimum_words:optimalWords(inst,g,sid,32)
                });
              }
            }
            if(lb2<d){
              s.residual_after_lb2++;
              if(s.residual_examples.length<16){
                s.residual_examples.push({
                  n,parent:parent.slice(),emask:emask.slice(),removed:I,active_nodes:activeNodeCount(inst,I),
                  exact:d,seg:b.seg,plb:b.plb,p2:p.p2,lb2,best_partitions:b.best,
                  path_sequences:p.pathSeqs,pair_matrix:p.pairMatrix,
                  optimum_words:optimalWords(inst,g,sid,64)
                });
              }
            }
          }
        }
      }
    }
  }
  const z=Math.max(1,s.states);
  return {
    ...s,
    p2_tight_rate:s.p2_tight/z,
    lb2_tight_rate:s.lb2_tight/z,
    plb_gap_close_rate:s.plb_gap_states?s.p2_closes_plb_gap/s.plb_gap_states:1,
    mean_dist:s.sum_dist/z,mean_plb:s.sum_plb/z,mean_p2:s.sum_p2/z,mean_lb2:s.sum_lb2/z
  };
}

const t0=process.hrtime.bigint();
const three=runSurface([0,1,2,3,4],3);
const two=runSurface([5],2);
const keys=[
  'instances','states','plb_gap_states','p2_gt_dist','lb2_gt_dist','p2_tight','lb2_tight',
  'p2_closes_plb_gap','residual_after_lb2','sum_dist','sum_plb','sum_p2','sum_lb2'
];
const combined={};
for(const k of keys) combined[k]=(three[k]||0)+(two[k]||0);
combined.residual_examples=[...three.residual_examples,...two.residual_examples]
  .sort((a,b)=>a.n-b.n||a.active_nodes-b.active_nodes||a.exact-b.exact).slice(0,20);
combined.closed_examples=[...three.closed_examples,...two.closed_examples]
  .sort((a,b)=>a.n-b.n||a.active_nodes-b.active_nodes||a.exact-b.exact).slice(0,12);
const z=Math.max(1,combined.states);
combined.p2_tight_rate=combined.p2_tight/z;
combined.lb2_tight_rate=combined.lb2_tight/z;
combined.plb_gap_close_rate=combined.plb_gap_states?combined.p2_closes_plb_gap/combined.plb_gap_states:1;
combined.mean_dist=combined.sum_dist/z;
combined.mean_plb=combined.sum_plb/z;
combined.mean_p2=combined.sum_p2/z;
combined.mean_lb2=combined.sum_lb2/z;

const pass=combined.p2_gt_dist===0&&combined.lb2_gt_dist===0;
const result={
  experiment:'038',
  disposition:pass?'PASS':'FAIL',
  total_ms:Number(process.hrtime.bigint()-t0)/1e6,
  three_class_through_n4:three,
  two_class_n5:two,
  combined
};
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(OUT+'/THREE_CLASS.json',JSON.stringify(three,null,2)+'\n');
fs.writeFileSync(OUT+'/TWO_CLASS_N5.json',JSON.stringify(two,null,2)+'\n');
console.log(JSON.stringify({
  experiment:'038',disposition:result.disposition,total_ms:result.total_ms,
  combined:{
    instances:combined.instances,states:combined.states,plb_gap_states:combined.plb_gap_states,
    p2_gt_dist:combined.p2_gt_dist,lb2_gt_dist:combined.lb2_gt_dist,
    p2_tight_rate:combined.p2_tight_rate,lb2_tight_rate:combined.lb2_tight_rate,
    p2_closes_plb_gap:combined.p2_closes_plb_gap,
    plb_gap_close_rate:combined.plb_gap_close_rate,
    residual_after_lb2:combined.residual_after_lb2,
    mean_dist:combined.mean_dist,mean_plb:combined.mean_plb,mean_p2:combined.mean_p2,mean_lb2:combined.mean_lb2
  },
  residual_examples:combined.residual_examples.slice(0,6),
  closed_examples:combined.closed_examples.slice(0,3)
},null,2));
if(!pass) process.exitCode=1;
