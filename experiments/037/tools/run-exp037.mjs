import fs from 'node:fs';

const OUT='out/exp037';
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
  const active=(inst.full^I)>>>0, out=[];
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
  if(I===inst.full) return {seg:0,plb:0,bestGroups:0};
  const paths=activePaths(inst,I);
  let seg=0;
  for(const p of paths) seg=Math.max(seg,pathSeg(inst,p));
  let plb=0,bestGroups=0;
  for(const Pi of partitions(inst.m)){
    let sum=0;
    for(const gamma of Pi){
      let r=0;
      for(const p of paths) r=Math.max(r,pathGroupCost(inst,p,gamma));
      sum+=r;
    }
    if(sum>plb){plb=sum;bestGroups=Pi.length;}
  }
  return {seg,plb,bestGroups};
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

function runSurface(ns,m){
  const s={instances:0,states:0,seg_gt_plb:0,plb_gt_dist:0,seg_tight:0,plb_tight:0,plb_stronger:0,
    sum_dist:0,sum_seg:0,sum_plb:0,best_partition_group_counts:{},examples:[]};
  for(const n of ns){
    for(const parent of enumerateForests(n)){
      for(const emask of enumerateMasks(n,m)){
        const inst=makeInstance(parent,emask,m), g=reachableGraph(inst); s.instances++;
        for(let sid=0;sid<g.states.length;sid++){
          const I=g.states[sid], d=g.dist[sid], b=bounds(inst,I); s.states++;
          s.sum_dist+=d;s.sum_seg+=b.seg;s.sum_plb+=b.plb;
          s.best_partition_group_counts[b.bestGroups]=(s.best_partition_group_counts[b.bestGroups]||0)+1;
          if(b.seg>b.plb){s.seg_gt_plb++;if(s.examples.length<6)s.examples.push({kind:'SEG_GT_PLB',n,parent,emask,I,d,b});}
          if(b.plb>d){s.plb_gt_dist++;if(s.examples.length<6)s.examples.push({kind:'PLB_GT_DIST',n,parent,emask,I,d,b});}
          if(b.seg===d)s.seg_tight++;
          if(b.plb===d)s.plb_tight++;
          if(b.plb>b.seg)s.plb_stronger++;
        }
      }
    }
  }
  const z=Math.max(1,s.states);
  return {...s,seg_tight_rate:s.seg_tight/z,plb_tight_rate:s.plb_tight/z,plb_stronger_rate:s.plb_stronger/z,
    mean_dist:s.sum_dist/z,mean_seg:s.sum_seg/z,mean_plb:s.sum_plb/z};
}

const t0=process.hrtime.bigint();
const three=runSurface([0,1,2,3,4],3);
const two=runSurface([5],2);
const keys=['instances','states','seg_gt_plb','plb_gt_dist','seg_tight','plb_tight','plb_stronger','sum_dist','sum_seg','sum_plb'];
const combined={};
for(const k of keys) combined[k]=(three[k]||0)+(two[k]||0);
combined.best_partition_group_counts={};
for(const src of [three,two]) for(const [k,v] of Object.entries(src.best_partition_group_counts))
  combined.best_partition_group_counts[k]=(combined.best_partition_group_counts[k]||0)+v;
combined.examples=[...three.examples,...two.examples].slice(0,10);
const z=Math.max(1,combined.states);
combined.seg_tight_rate=combined.seg_tight/z;
combined.plb_tight_rate=combined.plb_tight/z;
combined.plb_stronger_rate=combined.plb_stronger/z;
combined.mean_dist=combined.sum_dist/z;
combined.mean_seg=combined.sum_seg/z;
combined.mean_plb=combined.sum_plb/z;
const pass=combined.seg_gt_plb===0&&combined.plb_gt_dist===0;
const result={experiment:'037',disposition:pass?'PASS':'FAIL',
  total_ms:Number(process.hrtime.bigint()-t0)/1e6,
  three_class_through_n4:three,two_class_n5:two,combined};
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(OUT+'/THREE_CLASS.json',JSON.stringify(three,null,2)+'\n');
fs.writeFileSync(OUT+'/TWO_CLASS_N5.json',JSON.stringify(two,null,2)+'\n');
console.log(JSON.stringify({experiment:'037',disposition:result.disposition,total_ms:result.total_ms,
  combined:{instances:combined.instances,states:combined.states,seg_gt_plb:combined.seg_gt_plb,plb_gt_dist:combined.plb_gt_dist,
    seg_tight_rate:combined.seg_tight_rate,plb_tight_rate:combined.plb_tight_rate,plb_stronger_rate:combined.plb_stronger_rate,
    mean_dist:combined.mean_dist,mean_seg:combined.mean_seg,mean_plb:combined.mean_plb,
    best_partition_group_counts:combined.best_partition_group_counts},
  examples:combined.examples},null,2));
if(!pass) process.exitCode=1;
