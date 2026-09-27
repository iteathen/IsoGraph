import fs from 'node:fs';

const OUT='out/exp036';
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

function makeInstance(parent,classes,m){
  const n=parent.length;
  const full=n===0?0:(2**n-1)>>>0;
  const children=Array.from({length:n},()=>[]);
  for(let q=0;q<n;q++) if(parent[q]>=0) children[parent[q]].push(q);
  const supports=Array(m).fill(0);
  for(let q=0;q<n;q++) supports[classes[q]]=(supports[classes[q]]|((1<<q)>>>0))>>>0;
  const resist=supports.map(s=>(full^s)>>>0);
  return {n,full,parent:parent.slice(),children,classes:classes.slice(),m,supports,resist};
}

function upClosure(inst,mask){
  let out=mask>>>0;
  for(const q of bits(mask)){
    let p=inst.parent[q];
    while(p>=0){
      out=(out|((1<<p)>>>0))>>>0;
      p=inst.parent[p];
    }
  }
  return out>>>0;
}

function phase(inst,I,c){
  const active=(inst.full^I)>>>0;
  const survivors=upClosure(inst,(active&inst.resist[c])>>>0);
  return (inst.full^survivors)>>>0;
}

function reachableGraph(inst){
  const states=[0];
  const id=new Map([[0,0]]);
  const trans=[];
  for(let qi=0;qi<states.length;qi++){
    const I=states[qi];
    const row=[];
    for(let c=0;c<inst.m;c++){
      const J=phase(inst,I,c);
      let j=id.get(J);
      if(j===undefined){
        j=states.length;
        id.set(J,j);
        states.push(J);
      }
      row[c]=j;
    }
    trans[qi]=row;
  }
  const top=id.get(inst.full);
  if(top===undefined) throw new Error('singleton instance unexpectedly unsolvable');
  const rev=Array.from({length:states.length},()=>[]);
  for(let q=0;q<states.length;q++) for(let c=0;c<inst.m;c++){
    const r=trans[q][c];
    if(r!==q) rev[r].push({q,c});
  }
  const dist=Array(states.length).fill(Infinity);
  dist[top]=0;
  const queue=[top];
  for(let i=0;i<queue.length;i++){
    const r=queue[i];
    for(const {q} of rev[r]){
      if(dist[q]===Infinity){
        dist[q]=dist[r]+1;
        queue.push(q);
      }
    }
  }
  for(let q=0;q<states.length;q++) if(!Number.isFinite(dist[q])) throw new Error('reachable state has no target path');
  return {states,trans,dist,top};
}

function activeLeaves(inst,I){
  const active=(inst.full^I)>>>0;
  const out=[];
  for(let q=0;q<inst.n;q++){
    const bit=(1<<q)>>>0;
    if((active&bit)===0) continue;
    let hasChild=false;
    for(const c of inst.children[q]){
      if(active&((1<<c)>>>0)){hasChild=true;break;}
    }
    if(!hasChild) out.push(q);
  }
  return out;
}

function pathFromLeaf(inst,I,leaf){
  const active=(inst.full^I)>>>0;
  const p=[];
  let q=leaf;
  while(q>=0&&(active&((1<<q)>>>0))){
    p.push(q);
    q=inst.parent[q];
  }
  return p;
}

function bounds(inst,I){
  if(I===inst.full) return {cp:0,oc:0,paths:0};
  const leaves=activeLeaves(inst,I);
  let cp=0;
  const rc=Array(inst.m).fill(0);
  for(const leaf of leaves){
    const p=pathFromLeaf(inst,I,leaf);
    if(!p.length) continue;
    let runs=1;
    const per=Array(inst.m).fill(0);
    per[inst.classes[p[0]]]=1;
    for(let i=1;i<p.length;i++){
      if(inst.classes[p[i]]!==inst.classes[p[i-1]]){
        runs++;
        per[inst.classes[p[i]]]++;
      }
    }
    cp=Math.max(cp,runs);
    for(let c=0;c<inst.m;c++) rc[c]=Math.max(rc[c],per[c]);
  }
  const oc=rc.reduce((a,b)=>a+b,0);
  return {cp,oc,paths:leaves.length,rc};
}

function isAncestor(inst,desc,anc){
  let q=desc;
  while(q>=0){
    if(q===anc) return true;
    q=inst.parent[q];
  }
  return false;
}

function pathHasDifferentClass(inst,desc,anc,c){
  let q=desc;
  while(q>=0){
    if(inst.classes[q]!==c) return true;
    if(q===anc) return false;
    q=inst.parent[q];
  }
  return false;
}

function immediateCertificates(inst,I){
  if(I===inst.full) return {available:[],only:null,nonextendable:[]};
  const active=(inst.full^I)>>>0;
  const leaves=activeLeaves(inst,I);
  const availByClass=Array.from({length:inst.m},()=>[]);
  for(const q of leaves) availByClass[inst.classes[q]].push(q);
  const available=[];
  for(let c=0;c<inst.m;c++) if(availByClass[c].length) available.push(c);
  const only=available.length===1?available[0]:null;
  const nonextendable=[];
  for(const c of available){
    const nav=[];
    for(let q=0;q<inst.n;q++){
      if(!(active&((1<<q)>>>0))) continue;
      if(inst.classes[q]!==c) continue;
      if(!availByClass[c].includes(q)) nav.push(q);
    }
    let allBlocked=true;
    for(const u of nav){
      let blocked=false;
      for(const v of availByClass[c]){
        if(isAncestor(inst,v,u)&&pathHasDifferentClass(inst,v,u,c)){
          blocked=true;
          break;
        }
      }
      if(!blocked){
        allBlocked=false;
        break;
      }
    }
    if(allBlocked) nonextendable.push(c);
  }
  return {available,only,nonextendable};
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

function* enumerateClasses(n,m){
  const a=Array(n).fill(0);
  function* rec(i){
    if(i===n){yield a.slice();return;}
    for(let c=0;c<m;c++){
      a[i]=c;
      yield* rec(i+1);
    }
  }
  yield* rec(0);
}

function runSurface(nMax,m,exactNOnly=false){
  const stats={
    instances:0,states:0,
    cp_gt_oc:0,oc_gt_distance:0,
    cp_tight:0,oc_tight:0,oc_strictly_stronger:0,
    sum_distance:0,sum_cp:0,sum_oc:0,
    only_certificates:0,only_counterexamples:0,
    nonextendable_certificates:0,nonextendable_counterexamples:0,
    nonextendable_states:0,
    certificate_overlap:0,
    examples:[]
  };
  const ns=exactNOnly?[nMax]:Array.from({length:nMax+1},(_,i)=>i);
  for(const n of ns){
    for(const parent of enumerateForests(n)){
      for(const classes of enumerateClasses(n,m)){
        const inst=makeInstance(parent,classes,m);
        const g=reachableGraph(inst);
        stats.instances++;
        for(let sid=0;sid<g.states.length;sid++){
          const I=g.states[sid], d=g.dist[sid];
          stats.states++;
          const b=bounds(inst,I);
          stats.sum_distance+=d;
          stats.sum_cp+=b.cp;
          stats.sum_oc+=b.oc;
          if(b.cp>b.oc){
            stats.cp_gt_oc++;
            if(stats.examples.length<8) stats.examples.push({kind:'CP_GT_OC',n,parent,classes,I,d,b});
          }
          if(b.oc>d){
            stats.oc_gt_distance++;
            if(stats.examples.length<8) stats.examples.push({kind:'OC_GT_DIST',n,parent,classes,I,d,b});
          }
          if(b.cp===d) stats.cp_tight++;
          if(b.oc===d) stats.oc_tight++;
          if(b.oc>b.cp) stats.oc_strictly_stronger++;
          if(I===inst.full) continue;
          const cert=immediateCertificates(inst,I);
          if(cert.only!==null){
            stats.only_certificates++;
            const J=g.trans[sid][cert.only];
            if(1+g.dist[J]!==d){
              stats.only_counterexamples++;
              if(stats.examples.length<8) stats.examples.push({kind:'ONLY_FAIL',n,parent,classes,I,d,c:cert.only,nextDist:g.dist[J],cert});
            }
          }
          let anyNon=false;
          for(const c of cert.nonextendable){
            anyNon=true;
            stats.nonextendable_certificates++;
            if(cert.only===c) stats.certificate_overlap++;
            const J=g.trans[sid][c];
            if(1+g.dist[J]!==d){
              stats.nonextendable_counterexamples++;
              if(stats.examples.length<8) stats.examples.push({kind:'NONEXT_FAIL',n,parent,classes,I,d,c,nextDist:g.dist[J],cert});
            }
          }
          if(anyNon) stats.nonextendable_states++;
        }
      }
    }
  }
  const denom=Math.max(1,stats.states);
  return {
    ...stats,
    cp_tight_rate:stats.cp_tight/denom,
    oc_tight_rate:stats.oc_tight/denom,
    oc_stronger_rate:stats.oc_strictly_stronger/denom,
    mean_distance:stats.sum_distance/denom,
    mean_cp:stats.sum_cp/denom,
    mean_oc:stats.sum_oc/denom
  };
}

const t0=process.hrtime.bigint();
const three=runSurface(5,3,false);
const two6=runSurface(6,2,true);
function add(a,b,k){return (a[k]||0)+(b[k]||0);}
const combined={
  instances:add(three,two6,'instances'),
  states:add(three,two6,'states'),
  cp_gt_oc:add(three,two6,'cp_gt_oc'),
  oc_gt_distance:add(three,two6,'oc_gt_distance'),
  cp_tight:add(three,two6,'cp_tight'),
  oc_tight:add(three,two6,'oc_tight'),
  oc_strictly_stronger:add(three,two6,'oc_strictly_stronger'),
  only_certificates:add(three,two6,'only_certificates'),
  only_counterexamples:add(three,two6,'only_counterexamples'),
  nonextendable_certificates:add(three,two6,'nonextendable_certificates'),
  nonextendable_counterexamples:add(three,two6,'nonextendable_counterexamples'),
  nonextendable_states:add(three,two6,'nonextendable_states'),
  certificate_overlap:add(three,two6,'certificate_overlap'),
  examples:[...three.examples,...two6.examples].slice(0,12)
};
combined.cp_tight_rate=combined.cp_tight/combined.states;
combined.oc_tight_rate=combined.oc_tight/combined.states;
combined.oc_stronger_rate=combined.oc_strictly_stronger/combined.states;
const totalMs=Number(process.hrtime.bigint()-t0)/1e6;
const pass=combined.cp_gt_oc===0&&combined.oc_gt_distance===0&&combined.only_counterexamples===0&&combined.nonextendable_counterexamples===0;
const result={
  experiment:'036',
  disposition:pass?'PASS':'FAIL',
  total_ms:totalMs,
  three_class_through_n5:three,
  two_class_n6:two6,
  combined
};
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(OUT+'/THREE_CLASS.json',JSON.stringify(three,null,2)+'\n');
fs.writeFileSync(OUT+'/TWO_CLASS_N6.json',JSON.stringify(two6,null,2)+'\n');
console.log(JSON.stringify({
  experiment:'036',disposition:result.disposition,total_ms:totalMs,
  combined:{
    instances:combined.instances,states:combined.states,
    cp_gt_oc:combined.cp_gt_oc,oc_gt_distance:combined.oc_gt_distance,
    cp_tight_rate:combined.cp_tight_rate,oc_tight_rate:combined.oc_tight_rate,
    oc_stronger_rate:combined.oc_stronger_rate,
    only_certificates:combined.only_certificates,only_counterexamples:combined.only_counterexamples,
    nonextendable_certificates:combined.nonextendable_certificates,
    nonextendable_counterexamples:combined.nonextendable_counterexamples
  },
  examples:combined.examples
},null,2));
if(!pass) process.exitCode=1;
