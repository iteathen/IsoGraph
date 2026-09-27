import fs from 'node:fs';

const OUT='out/exp041';
fs.mkdirSync(OUT,{recursive:true});

const families=[
  {
    name:'W4',
    paths:['010','012','101','210'],
    expected_full:6,
    expected_submax:5
  },
  {
    name:'W5',
    paths:['10102','12012','20202','01202','02121'],
    expected_full:9,
    expected_submax:8
  },
  {
    name:'W6',
    paths:['20210','01010','02121','21201','1020','20120'],
    expected_full:9,
    expected_submax:8
  },
  {
    name:'W7',
    paths:['02021','02120','12021','1212','2010','2012','2102'],
    expected_full:9,
    expected_submax:8
  }
];

function parse(s){return [...s].map(x=>Number(x));}
function key(paths){return paths.map(p=>p.join('')).sort().join('|');}
const memo=new Map();

function jointOpt(paths,m=3,wantWord=false){
  const canon=paths.map(p=>p.slice()).sort((a,b)=>a.join('').localeCompare(b.join('')));
  const k=m+'|'+key(canon);
  if(!wantWord&&memo.has(k)) return {dist:memo.get(k)};
  const lens=canon.map(p=>p.length);
  const start=Array(canon.length).fill(0);
  const sk=start.join(','),gk=lens.join(',');
  const q=[start],dist=new Map([[sk,0]]),prev=new Map();
  for(let qi=0;qi<q.length;qi++){
    const st=q[qi],ks=st.join(','),d=dist.get(ks);
    if(ks===gk){
      memo.set(k,d);
      if(!wantWord)return {dist:d};
      const w=[];let cur=ks;
      while(cur!==sk){
        const x=prev.get(cur);w.push(x.e);cur=x.from;
      }
      w.reverse();
      return {dist:d,witness:w};
    }
    for(let e=0;e<m;e++){
      const nx=st.slice();let changed=false;
      for(let i=0;i<canon.length;i++){
        while(nx[i]<lens[i]&&canon[i][nx[i]]===e){nx[i]++;changed=true;}
      }
      if(!changed)continue;
      const nk=nx.join(',');
      if(!dist.has(nk)){dist.set(nk,d+1);prev.set(nk,{from:ks,e});q.push(nx);}
    }
  }
  throw new Error('unreachable');
}

function submax(paths){
  let best=0,details=[];
  for(let drop=0;drop<paths.length;drop++){
    const sub=paths.filter((_,i)=>i!==drop);
    const r=jointOpt(sub,3,true);
    best=Math.max(best,r.dist);
    details.push({drop,opt:r.dist,witness:r.witness});
  }
  return {best,details};
}

function realize(paths){
  const parent=[],classes=[];
  let base=0;
  for(const p of paths){
    for(let i=0;i<p.length;i++){
      classes.push(p[i]);
      parent.push(i+1<p.length?base+i+1:-1);
    }
    base+=p.length;
  }
  return {parent,classes};
}

function bits(mask){
  const a=[];let x=mask>>>0;
  while(x){const b=x&-x;a.push(31-Math.clz32(b));x=(x^b)>>>0;}
  return a;
}

function makeInst(real,m){
  const n=real.parent.length,full=n===0?0:(2**n-1)>>>0;
  if(n>28)throw new Error('bitmask harness n>28');
  const children=Array.from({length:n},()=>[]);
  for(let q=0;q<n;q++)if(real.parent[q]>=0)children[real.parent[q]].push(q);
  const supports=Array(m).fill(0);
  for(let q=0;q<n;q++)supports[real.classes[q]]|=(1<<q);
  const resist=supports.map(s=>(full^s)>>>0);
  return {n,full,parent:real.parent,children,m,supports,resist};
}

function up(inst,mask){
  let out=mask>>>0;
  for(const q of bits(mask)){
    let p=inst.parent[q];
    while(p>=0){out|=(1<<p);p=inst.parent[p];}
  }
  return out>>>0;
}

function phase(inst,I,e){
  const active=(inst.full^I)>>>0;
  const surv=up(inst,(active&inst.resist[e])>>>0);
  return (inst.full^surv)>>>0;
}

function glycanOpt(real,m){
  const inst=makeInst(real,m);
  const q=[0],dist=new Map([[0,0]]);
  for(let qi=0;qi<q.length;qi++){
    const I=q[qi],d=dist.get(I);
    if(I===inst.full)return {dist:d,states:dist.size};
    for(let e=0;e<m;e++){
      const J=phase(inst,I,e);
      if(!dist.has(J)){dist.set(J,d+1);q.push(J);}
    }
  }
  throw new Error('unsolvable realization');
}

const rows=[];
let failures=0;
for(const f of families){
  const paths=f.paths.map(parse);
  const full=jointOpt(paths,3,true);
  const sm=submax(paths);
  const real=realize(paths);
  const gly=glycanOpt(real,3);
  const ok=
    full.dist===f.expected_full &&
    sm.best===f.expected_submax &&
    full.dist>sm.best &&
    gly.dist===full.dist;
  if(!ok)failures++;
  rows.push({
    name:f.name,
    width_candidate:paths.length,
    paths:f.paths,
    total_nodes:paths.reduce((a,p)=>a+p.length,0),
    full_opt:full.dist,
    full_witness:full.witness,
    subfamily_max:sm.best,
    deletion_details:sm.details,
    glycan_nodes:real.parent.length,
    glycan_opt:gly.dist,
    glycan_reached_states:gly.states,
    verified:ok
  });
}

const result={
  experiment:'041',
  disposition:failures===0?'PASS':'FAIL',
  verified_widths:rows.filter(r=>r.verified).map(r=>r.width_candidate),
  maximum_verified_width:Math.max(...rows.filter(r=>r.verified).map(r=>r.width_candidate)),
  failures,
  rows
};
fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(failures)process.exitCode=1;
