import fs from 'node:fs';

const OUT='out/exp039';
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
  if(top===undefined) throw new Error('unexpected unsolvable nonempty-susceptibility instance');
  const rev=Array.from({length:states.length},()=>[]);
  for(let q=0;q<states.length;q++) for(let e=0;e<inst.m;e++){
    const r=trans[q][e]; if(r!==q) rev[r].push(q);
  }
  const dist=Array(states.length).fill(Infinity); dist[top]=0;
  const queue=[top];
  for(let i=0;i<queue.length;i++){
    const r=queue[i];
    for(const q of rev[r]) if(!Number.isFinite(dist[q])){dist[q]=dist[r]+1;queue.push(q);}
  }
  return {states,trans,dist,top};
}

function optimalWords(inst,g,sid,limit=32){
  const out=[], w=[];
  function dfs(q){
    if(out.length>=limit) return;
    if(g.dist[q]===0){out.push(w.slice());return;}
    for(let e=0;e<inst.m;e++){
      const r=g.trans[q][e];
      if(g.dist[r]===g.dist[q]-1){
        w.push(e);dfs(r);w.pop();
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
    const p=[];let q=leaf;
    while(q>=0&&(active&(1<<q))){p.push(q);q=inst.parent[q];}
    out.push(p);
  }
  return out;
}

function pathGroupCost(inst,path,gamma){
  const L=path.length,INF=1e9,dp=Array(L+1).fill(INF);dp[0]=0;
  const all=(1<<inst.m)-1;
  for(let j=1;j<=L;j++){
    let inter=all;
    for(let i=j-1;i>=0;i--){
      inter&=inst.emask[path[i]];
      if(inter===0) break;
      const cost=(inter&(~gamma))!==0?0:1;
      dp[j]=Math.min(dp[j],dp[i]+cost);
    }
  }
  return dp[L];
}

function setPartitions(m){
  const out=[],groups=[];
  function rec(x){
    if(x===m){out.push(groups.slice());return;}
    for(let i=0;i<groups.length;i++){
      groups[i]|=1<<x;rec(x+1);groups[i]&=~(1<<x);
    }
    groups.push(1<<x);rec(x+1);groups.pop();
  }
  rec(0);return out;
}
const pCache=new Map();
function partitions(m){if(!pCache.has(m))pCache.set(m,setPartitions(m));return pCache.get(m);}

function plb(inst,I){
  if(I===inst.full) return 0;
  const paths=activePaths(inst,I);
  let best=0;
  for(const Pi of partitions(inst.m)){
    let sum=0;
    for(const gamma of Pi){
      let r=0;
      for(const p of paths) r=Math.max(r,pathGroupCost(inst,p,gamma));
      sum+=r;
    }
    best=Math.max(best,sum);
  }
  return best;
}

function familyKey(seqs,m){
  return m+'|'+seqs.map(s=>s.join('.')).sort().join('|');
}
const jointMemo=new Map();

function jointOpt(seqs,m){
  if(seqs.length===0) return 0;
  const canonical=seqs.map(s=>s.slice()).sort((a,b)=>a.join('.').localeCompare(b.join('.')));
  const key=familyKey(canonical,m);
  if(jointMemo.has(key)) return jointMemo.get(key);
  const lens=canonical.map(s=>s.length);
  const mult=Array(lens.length).fill(1);
  for(let i=lens.length-2;i>=0;i--) mult[i]=mult[i+1]*(lens[i+1]+1);
  const encode=idx=>idx.reduce((a,x,i)=>a+x*mult[i],0);
  function decode(code){
    const idx=Array(lens.length);
    for(let i=0;i<lens.length;i++){
      idx[i]=Math.floor(code/mult[i])%(lens[i]+1);
    }
    return idx;
  }
  const goal=encode(lens);
  const dist=new Int16Array(lens.reduce((a,x)=>a*(x+1),1));dist.fill(-1);dist[0]=0;
  const q=[0];
  function adv(seq,i,e){while(i<seq.length&&(seq[i]&(1<<e)))i++;return i;}
  for(let qi=0;qi<q.length;qi++){
    const code=q[qi],d=dist[code];
    if(code===goal){jointMemo.set(key,d);return d;}
    const idx=decode(code);
    for(let e=0;e<m;e++){
      const nxt=idx.map((x,i)=>adv(canonical[i],x,e));
      let changed=false;
      for(let i=0;i<nxt.length;i++) if(nxt[i]!==idx[i]){changed=true;break;}
      if(!changed) continue;
      const nc=encode(nxt);
      if(dist[nc]===-1){dist[nc]=d+1;q.push(nc);}
    }
  }
  jointMemo.set(key,Infinity);
  return Infinity;
}

function* subsetsN(n,k,start=0,prefix=[]){
  if(prefix.length===k){yield prefix.slice();return;}
  for(let i=start;i<n;i++){prefix.push(i);yield* subsetsN(n,k,i+1,prefix);prefix.pop();}
}

function jointBound(inst,I,h){
  const seqs=activePaths(inst,I).map(p=>p.map(q=>inst.emask[q]));
  if(seqs.length===0) return {value:0,seqs,witness:[]};
  let best=0,witness=[];
  const max=Math.min(h,seqs.length);
  for(let k=1;k<=max;k++){
    for(const ids of subsetsN(seqs.length,k)){
      const family=ids.map(i=>seqs[i]);
      const d=jointOpt(family,inst.m);
      if(d>best){best=d;witness=ids.slice();}
    }
  }
  return {value:best,seqs,witness};
}

function* enumerateForests(n){
  const parent=Array(n).fill(-1);
  function* rec(i){
    if(i===n){yield parent.slice();return;}
    parent[i]=-1;yield* rec(i+1);
    for(let p=i+1;p<n;p++){parent[i]=p;yield* rec(i+1);}
  }
  yield* rec(0);
}

function* enumerateMasks(n,m){
  const a=Array(n).fill(1),max=(1<<m)-1;
  function* rec(i){
    if(i===n){yield a.slice();return;}
    for(let x=1;x<=max;x++){a[i]=x;yield* rec(i+1);}
  }
  yield* rec(0);
}

function runSurface(ns,m){
  const s={
    instances:0,states:0,
    j2_gt_dist:0,j3_gt_dist:0,lb2_gt_dist:0,lb3_gt_dist:0,
    j2_tight:0,j3_tight:0,lb2_tight:0,lb3_tight:0,
    plb_gap_states:0,lb2_residual:0,lb3_residual:0,j3_closes_lb2:0,
    sum_dist:0,sum_plb:0,sum_j2:0,sum_j3:0,sum_lb2:0,sum_lb3:0,
    residual_examples:[]
  };
  for(const n of ns){
    for(const parent of enumerateForests(n)){
      for(const emask of enumerateMasks(n,m)){
        const inst=makeInstance(parent,emask,m),g=reachableGraph(inst);s.instances++;
        for(let sid=0;sid<g.states.length;sid++){
          const I=g.states[sid],d=g.dist[sid],p=plb(inst,I),j2=jointBound(inst,I,2),j3=jointBound(inst,I,3);
          const lb2=Math.max(p,j2.value),lb3=Math.max(p,j3.value);
          s.states++;s.sum_dist+=d;s.sum_plb+=p;s.sum_j2+=j2.value;s.sum_j3+=j3.value;s.sum_lb2+=lb2;s.sum_lb3+=lb3;
          if(j2.value>d)s.j2_gt_dist++;
          if(j3.value>d)s.j3_gt_dist++;
          if(lb2>d)s.lb2_gt_dist++;
          if(lb3>d)s.lb3_gt_dist++;
          if(j2.value===d)s.j2_tight++;
          if(j3.value===d)s.j3_tight++;
          if(lb2===d)s.lb2_tight++;
          if(lb3===d)s.lb3_tight++;
          if(p<d)s.plb_gap_states++;
          if(lb2<d)s.lb2_residual++;
          if(lb2<d&&lb3===d)s.j3_closes_lb2++;
          if(lb3<d){
            s.lb3_residual++;
            if(s.residual_examples.length<16){
              s.residual_examples.push({
                n,parent:parent.slice(),emask:emask.slice(),removed:I,exact:d,plb:p,
                j2:j2.value,j3:j3.value,lb2,lb3,path_sequences:j3.seqs,
                j2_witness:j2.witness,j3_witness:j3.witness,
                optimum_words:optimalWords(inst,g,sid,32)
              });
            }
          }
        }
      }
    }
  }
  const z=Math.max(1,s.states);
  return {...s,
    j2_tight_rate:s.j2_tight/z,j3_tight_rate:s.j3_tight/z,
    lb2_tight_rate:s.lb2_tight/z,lb3_tight_rate:s.lb3_tight/z,
    lb2_residual_close_rate:s.lb2_residual?s.j3_closes_lb2/s.lb2_residual:1,
    mean_dist:s.sum_dist/z,mean_plb:s.sum_plb/z,mean_j2:s.sum_j2/z,mean_j3:s.sum_j3/z,
    mean_lb2:s.sum_lb2/z,mean_lb3:s.sum_lb3/z
  };
}

const t0=process.hrtime.bigint();
const three=runSurface([0,1,2,3,4],3);
const two=runSurface([5],2);
const keys=[
  'instances','states','j2_gt_dist','j3_gt_dist','lb2_gt_dist','lb3_gt_dist',
  'j2_tight','j3_tight','lb2_tight','lb3_tight',
  'plb_gap_states','lb2_residual','lb3_residual','j3_closes_lb2',
  'sum_dist','sum_plb','sum_j2','sum_j3','sum_lb2','sum_lb3'
];
const combined={};
for(const k of keys)combined[k]=(three[k]||0)+(two[k]||0);
combined.residual_examples=[...three.residual_examples,...two.residual_examples]
  .sort((a,b)=>a.n-b.n||a.exact-b.exact).slice(0,20);
const z=Math.max(1,combined.states);
for(const k of ['j2','j3','lb2','lb3'])combined[k+'_tight_rate']=combined[k+'_tight']/z;
combined.lb2_residual_close_rate=combined.lb2_residual?combined.j3_closes_lb2/combined.lb2_residual:1;
for(const k of ['dist','plb','j2','j3','lb2','lb3'])combined['mean_'+k]=combined['sum_'+k]/z;

const pass=combined.j2_gt_dist===0&&combined.j3_gt_dist===0&&combined.lb2_gt_dist===0&&combined.lb3_gt_dist===0;
const result={experiment:'039',disposition:pass?'PASS':'FAIL',
  total_ms:Number(process.hrtime.bigint()-t0)/1e6,
  three_class_through_n4:three,two_class_n5:two,combined};
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(OUT+'/THREE_CLASS.json',JSON.stringify(three,null,2)+'\n');
fs.writeFileSync(OUT+'/TWO_CLASS_N5.json',JSON.stringify(two,null,2)+'\n');
console.log(JSON.stringify({
  experiment:'039',disposition:result.disposition,total_ms:result.total_ms,
  combined:{
    instances:combined.instances,states:combined.states,plb_gap_states:combined.plb_gap_states,
    lb2_residual:combined.lb2_residual,lb3_residual:combined.lb3_residual,
    j3_closes_lb2:combined.j3_closes_lb2,lb2_residual_close_rate:combined.lb2_residual_close_rate,
    j2_tight_rate:combined.j2_tight_rate,j3_tight_rate:combined.j3_tight_rate,
    lb2_tight_rate:combined.lb2_tight_rate,lb3_tight_rate:combined.lb3_tight_rate,
    violations:{j2:combined.j2_gt_dist,j3:combined.j3_gt_dist,lb2:combined.lb2_gt_dist,lb3:combined.lb3_gt_dist}
  },
  residual_examples:combined.residual_examples.slice(0,8)
},null,2));
if(!pass)process.exitCode=1;
