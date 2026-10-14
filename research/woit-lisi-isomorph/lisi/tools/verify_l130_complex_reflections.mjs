import fs from "node:fs";

const root="research/woit-lisi-isomorph/lisi";
const cText=fs.readFileSync(root+"/LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg","utf8");
const xText=fs.readFileSync(root+"/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg","utf8");

function parseProd(text,prod){
  const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");
  const m=new Map(); let z;
  while((z=re.exec(text)))m.set(z[1]+","+z[2],Number(z[3]));
  return m;
}
const defs=[
  {name:"Cprime",text:cText,prod:214105,basis:[214110,214111],neg:[214113,214114],sig:[1,-1],negative:[1]},
  {name:"Hprime",text:xText,prod:214205,basis:[214210,214211,214212,214213],neg:[214214,214215,214216,214217],sig:[1,-1,1,-1],negative:[1,3]},
  {name:"Oprime",text:xText,prod:214405,basis:[214410,214411,214412,214413,214414,214415,214416,214417],neg:[214418,214419,214420,214421,214422,214423,214424,214425],sig:[1,1,1,1,-1,-1,-1,-1],negative:[4,5,6,7]}
];
const C=(re=0,im=0)=>[re,im];
const cadd=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const cmul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const cneg=a=>[-a[0],-a[1]];
const ceq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const I=C(0,1),ONE=C(1,0);

for(const D of defs){
  D.pm=parseProd(D.text,D.prod);
  D.bp=(i,j)=>{
    const out=D.pm.get(D.basis[i]+","+D.basis[j]);
    let k=D.basis.indexOf(out),sg=1;
    if(k<0){k=D.neg.indexOf(out);sg=-1;}
    if(k<0)throw new Error("unresolved product "+D.name+" "+i+","+j+" -> "+out);
    return [sg,k];
  };
}
function basisVec(n,k,scalar=ONE){
  const v=Array.from({length:n},()=>C());
  v[k]=scalar;
  return v;
}
function mul(D,x,y){
  const out=Array.from({length:D.sig.length},()=>C());
  for(let i=0;i<x.length;i++)for(let j=0;j<y.length;j++){
    if((x[i][0]||x[i][1])&&(y[j][0]||y[j][1])){
      const [sg,k]=D.bp(i,j);
      out[k]=cadd(out[k],cmul(C(sg,0),cmul(x[i],y[j])));
    }
  }
  return out;
}
function kap(x){return x.map((z,k)=>k===0?z:cneg(z));}
function scale(s,x){return x.map(z=>cmul(s,z));}
function B(D,x,y){
  let out=C();
  for(let k=0;k<x.length;k++)out=cadd(out,cmul(C(D.sig[k],0),cmul(x[k],y[k])));
  return out;
}
const T=(D,x,y,z)=>B(D,z,mul(D,x,y));

function reflect(D,type,ui,triple){
  const [x,y,z]=triple;
  const a=basisVec(D.sig.length,ui),zu=kap(a);
  if(type===0){
    return [
      mul(D,a,mul(D,kap(x),a)),
      scale(I,mul(D,kap(a),z)),
      scale(I,kap(mul(D,kap(y),kap(a))))
    ];
  }
  if(type===1){
    return [
      scale(I,mul(D,z,kap(a))),
      mul(D,a,mul(D,kap(y),a)),
      scale(I,kap(mul(D,kap(a),kap(x))))
    ];
  }
  const aOrd=kap(zu);
  return [
    scale(I,mul(D,zu,kap(y))),
    scale(I,mul(D,kap(x),zu)),
    kap(mul(D,aOrd,mul(D,z,aOrd)))
  ];
}

const results=[];
for(const D of defs){
  const n=D.sig.length;
  const dirs=[];
  for(let t=0;t<3;t++)for(const u of D.negative)dirs.push([t,u]);

  let odd_failures=0,even_failures=0;
  const odd_samples=[],even_samples=[];

  for(const [t,u] of dirs){
    for(let x=0;x<n;x++)for(let y=0;y<n;y++)for(let z=0;z<n;z++){
      const input=[basisVec(n,x),basisVec(n,y),basisVec(n,z)];
      const before=T(D,...input);
      const after=T(D,...reflect(D,t,u,input));
      if(!ceq(after,cneg(before))){
        odd_failures++;
        if(odd_samples.length<8)odd_samples.push({t,u,x,y,z,before,after});
      }
    }
  }

  for(const [t1,u1] of dirs)for(const [t2,u2] of dirs){
    for(let x=0;x<n;x++)for(let y=0;y<n;y++)for(let z=0;z<n;z++){
      const input=[basisVec(n,x),basisVec(n,y),basisVec(n,z)];
      const before=T(D,...input);
      const after=T(D,...reflect(D,t2,u2,reflect(D,t1,u1,input)));
      if(!ceq(after,before)){
        even_failures++;
        if(even_samples.length<8)even_samples.push({t1,u1,t2,u2,x,y,z,before,after});
      }
    }
  }

  results.push({
    name:D.name,
    odd_maps:dirs.length,
    odd_basis_cases:dirs.length*n*n*n,
    even_map_pairs:dirs.length*dirs.length,
    even_basis_cases:dirs.length*dirs.length*n*n*n,
    odd_failures,
    even_failures,
    odd_samples,
    even_samples
  });
}

const pass=results.every(r=>r.odd_failures===0&&r.even_failures===0);
const result={
  census_id:"L-SSC-130",
  branch:"complexified s_u=-1 extensions",
  results,
  total_odd_basis_cases:results.reduce((s,r)=>s+r.odd_basis_cases,0),
  total_even_basis_cases:results.reduce((s,r)=>s+r.even_basis_cases,0),
  source_repair_used:false,
  pass
};
console.log(JSON.stringify(result,null,2));
if(!pass)process.exitCode=1;
