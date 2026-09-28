import fs from 'node:fs';

const OUT='out/exp040';
fs.mkdirSync(OUT,{recursive:true});

function wordKey(w){return w.join('');}

function nonrepeatingWords(m,maxLen){
  const out=[];
  const w=[];
  function rec(target){
    if(w.length===target){out.push(w.slice());return;}
    for(let e=0;e<m;e++){
      if(w.length&&w[w.length-1]===e) continue;
      w.push(e);rec(target);w.pop();
    }
  }
  for(let len=1;len<=maxLen;len++) rec(len);
  out.sort((a,b)=>a.length-b.length||wordKey(a).localeCompare(wordKey(b)));
  return out;
}

function* choose(n,k,start=0,p=[]){
  if(p.length===k){yield p.slice();return;}
  for(let i=start;i<n;i++){p.push(i);yield* choose(n,k,i+1,p);p.pop();}
}

const jointMemo=new Map();

function familyKey(paths,m){
  return m+'|'+paths.map(wordKey).sort().join('/');
}

function jointOpt(paths,m,wantWitness=false){
  if(!paths.length) return {dist:0,witness:[]};
  const canon=paths.map(p=>p.slice()).sort((a,b)=>wordKey(a).localeCompare(wordKey(b)));
  const key=familyKey(canon,m);
  if(!wantWitness&&jointMemo.has(key)) return {dist:jointMemo.get(key)};
  const lens=canon.map(p=>p.length);
  const start=Array(canon.length).fill(0);
  const sk=start.join(','),gk=lens.join(',');
  const dist=new Map([[sk,0]]),prev=new Map(),queue=[start];
  for(let qi=0;qi<queue.length;qi++){
    const v=queue[qi],vk=v.join(','),d=dist.get(vk);
    if(vk===gk){
      jointMemo.set(key,d);
      if(!wantWitness) return {dist:d};
      const witness=[];
      let cur=vk;
      while(cur!==sk){
        const pr=prev.get(cur);
        witness.push(pr.e);
        cur=pr.from;
      }
      witness.reverse();
      return {dist:d,witness};
    }
    for(let e=0;e<m;e++){
      const w=v.slice();let changed=false;
      for(let i=0;i<canon.length;i++){
        while(w[i]<lens[i]&&canon[i][w[i]]===e){w[i]++;changed=true;}
      }
      if(!changed) continue;
      const wk=w.join(',');
      if(!dist.has(wk)){
        dist.set(wk,d+1);prev.set(wk,{from:vk,e});queue.push(w);
      }
    }
  }
  throw new Error('unreachable path family');
}

function maxSubfamilyOpt(paths,m,h){
  if(paths.length<=h) return jointOpt(paths,m).dist;
  let best=0;
  for(const ix of choose(paths.length,h)){
    best=Math.max(best,jointOpt(ix.map(i=>paths[i]),m).dist);
  }
  return best;
}

function rankCounterexample(x){
  return [x.total_length,x.max_length,x.paths.map(wordKey).sort().join('|')];
}

function lessRank(a,b){
  const A=rankCounterexample(a),B=rankCounterexample(b);
  if(A[0]!==B[0]) return A[0]<B[0];
  if(A[1]!==B[1]) return A[1]<B[1];
  return A[2]<B[2];
}

function realize(paths){
  const parent=[],classes=[];
  let base=0;
  for(const p of paths){
    for(let i=0;i<p.length;i++){
      classes[base+i]=p[i];
      parent[base+i]=(i+1<p.length)?base+i+1:-1;
    }
    base+=p.length;
  }
  return {parent,classes};
}

function makeInst(parent,classes,m){
  const n=parent.length,full=n===0?0:(2**n-1)>>>0;
  const children=Array.from({length:n},()=>[]);
  for(let q=0;q<n;q++) if(parent[q]>=0)children[parent[q]].push(q);
  const supports=Array(m).fill(0);
  for(let q=0;q<n;q++)supports[classes[q]]|=1<<q;
  const resist=supports.map(s=>(full^s)>>>0);
  return {n,full,parent,children,classes,m,supports,resist};
}

function bitList(mask){
  const a=[];let x=mask>>>0;
  while(x){const b=x&-x;a.push(31-Math.clz32(b));x^=b;}
  return a;
}

function up(inst,mask){
  let out=mask>>>0;
  for(const q of bitList(mask)){
    let p=inst.parent[q];
    while(p>=0){out|=1<<p;p=inst.parent[p];}
  }
  return out>>>0;
}

function phase(inst,I,e){
  const active=inst.full^I;
  const surv=up(inst,active&inst.resist[e]);
  return inst.full^surv;
}

function glycanOpt(real,m){
  const inst=makeInst(real.parent,real.classes,m);
  const states=[0],dist=new Map([[0,0]]);
  for(let qi=0;qi<states.length;qi++){
    const I=states[qi],d=dist.get(I);
    if(I===inst.full)return d;
    for(let e=0;e<m;e++){
      const J=phase(inst,I,e);
      if(!dist.has(J)){dist.set(J,d+1);states.push(J);}
    }
  }
  throw new Error('realized singleton forest unsolvable');
}

function threeAlphabetSearch(){
  const words=nonrepeatingWords(3,3);
  let tested=0,best=null;
  for(const ix of choose(words.length,4)){
    const paths=ix.map(i=>words[i]);
    const full=jointOpt(paths,3).dist;
    const j3=maxSubfamilyOpt(paths,3,3);
    tested++;
    if(full>j3){
      const c={
        paths:paths.map(p=>p.slice()),
        full_opt:full,j3,
        total_length:paths.reduce((a,p)=>a+p.length,0),
        max_length:Math.max(...paths.map(p=>p.length))
      };
      if(best===null||lessRank(c,best))best=c;
    }
  }
  if(best){
    best.optimum_word=jointOpt(best.paths,3,true).witness;
    best.triple_details=[];
    for(const ix of choose(4,3)){
      const fam=ix.map(i=>best.paths[i]);
      best.triple_details.push({indices:ix,opt:jointOpt(fam,3,true)});
    }
    best.realization=realize(best.paths);
    best.realized_glycan_opt=glycanOpt(best.realization,3);
  }
  return {alphabet:3,max_path_length:3,family_size:4,word_count:words.length,families_tested:tested,counterexample:best};
}

function binaryControl(){
  const words=nonrepeatingWords(2,8);
  let families=0,counterexamples=0,first=null;
  for(let k=2;k<=4;k++){
    for(const ix of choose(words.length,k)){
      const paths=ix.map(i=>words[i]);
      const full=jointOpt(paths,2).dist;
      const j2=maxSubfamilyOpt(paths,2,2);
      families++;
      if(full>j2){
        counterexamples++;
        if(!first)first={paths,full_opt:full,j2};
      }
    }
  }
  return {alphabet:2,max_path_length:8,max_family_size:4,word_count:words.length,families_tested:families,counterexamples,first_counterexample:first};
}

const t0=process.hrtime.bigint();
const three=threeAlphabetSearch();
const binary=binaryControl();
const result={
  experiment:'040',
  disposition:'COMPLETE',
  total_ms:Number(process.hrtime.bigint()-t0)/1e6,
  three_enzyme:three,
  two_enzyme_control:binary
};
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
