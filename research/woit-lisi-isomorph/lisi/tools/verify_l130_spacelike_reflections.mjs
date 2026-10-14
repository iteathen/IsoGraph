import fs from "node:fs";

const root="research/woit-lisi-isomorph/lisi";
const Htable=[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[-1,0],[1,3],[-1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[1,2],[-1,1],[-1,0]]];
const defs=[{"name":"C","prod":214005,"basis":[214010,214011],"neg":[214013,214014],"sig":[1,1],"file":"LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"Cprime","prod":214105,"basis":[214110,214111],"neg":[214113,214114],"sig":[1,-1],"file":"LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"H","table":[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[-1,0],[1,3],[-1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[1,2],[-1,1],[-1,0]]],"sig":[1,1,1,1]},{"name":"Hprime","prod":214205,"basis":[214210,214211,214212,214213],"neg":[214214,214215,214216,214217],"sig":[1,-1,1,-1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"O","prod":214305,"basis":[214310,214311,214312,214313,214314,214315,214316,214317],"neg":[214318,214319,214320,214321,214322,214323,214324,214325],"sig":[1,1,1,1,1,1,1,1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"Oprime","prod":214405,"basis":[214410,214411,214412,214413,214414,214415,214416,214417],"neg":[214418,214419,214420,214421,214422,214423,214424,214425],"sig":[1,1,1,1,-1,-1,-1,-1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"}];
const cache=new Map();
function src(file){if(!cache.has(file))cache.set(file,fs.readFileSync(root+"/"+file,"utf8"));return cache.get(file);}
function parseProd(text,prod){
  const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");
  const m=new Map();let z;while((z=re.exec(text)))m.set(z[1]+","+z[2],Number(z[3]));return m;
}
function bp(D,[s1,i],[s2,j]){
  let sg,k;
  if(D.name==="H"){[sg,k]=Htable[i][j];}
  else{
    if(!D.pm)D.pm=parseProd(src(D.file),D.prod);
    const out=D.pm.get(D.basis[i]+","+D.basis[j]);
    k=D.basis.indexOf(out);sg=1;if(k<0){k=D.neg.indexOf(out);sg=-1;}
  }
  return [s1*s2*sg,k];
}
const kap=([s,k])=>[k===0?s:-s,k];
const neg=([s,k])=>[-s,k];
const B=(D,[s1,k1],[s2,k2])=>k1===k2?s1*s2*D.sig[k1]:0;
const T=(D,x,y,z)=>B(D,z,bp(D,x,y));
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const tripleEq=(a,b)=>eq(a[0],b[0])&&eq(a[1],b[1])&&eq(a[2],b[2]);

function rv(D,u,x,y,z){const ku=kap(u),kx=kap(x),ky=kap(y);return [neg(bp(D,u,bp(D,kx,u))),bp(D,ku,z),kap(bp(D,ky,ku))];}
function rm(D,u,x,y,z){const ku=kap(u),kx=kap(x),ky=kap(y);return [bp(D,z,ku),neg(bp(D,u,bp(D,ky,u))),kap(bp(D,ku,kx))];}
function rp(D,zu,x,y,z){const u=kap(zu),kx=kap(x),ky=kap(y);return [bp(D,zu,ky),bp(D,kx,zu),kap(neg(bp(D,u,bp(D,z,u))))];}

const results=[];
for(const D of defs){
  const n=D.sig.length;
  const vb=Array.from({length:n},(_,i)=>[1,i]);
  const pb=vb.map(kap);
  const uv=vb.filter((_,i)=>D.sig[i]===1);
  const up=pb.filter((_,i)=>D.sig[i]===1);
  const refls=[
    {name:"Rv",units:uv,apply:(u,x,y,z)=>rv(D,u,x,y,z)},
    {name:"Rm",units:uv,apply:(u,x,y,z)=>rm(D,u,x,y,z)},
    {name:"Rp",units:up,apply:(u,x,y,z)=>rp(D,u,x,y,z)}
  ];
  let involution_failures=0,antiinvariance_failures=0,even_composition_failures=0;
  for(const R of refls)for(const u of R.units)for(const x of vb)for(const y of vb)for(const z of pb){
    const out=R.apply(u,x,y,z);
    const out2=R.apply(u,...out);
    if(!tripleEq(out2,[x,y,z]))involution_failures++;
    if(T(D,...out)!==-T(D,x,y,z))antiinvariance_failures++;
  }
  for(const R1 of refls)for(const R2 of refls)for(const u1 of R1.units)for(const u2 of R2.units)for(const x of vb)for(const y of vb)for(const z of pb){
    const out=R2.apply(u2,...R1.apply(u1,x,y,z));
    if(T(D,...out)!==T(D,x,y,z))even_composition_failures++;
  }
  results.push({name:D.name,involution_failures,antiinvariance_failures,even_composition_failures});
}
const pass=results.every(r=>r.name==="O"
  ? r.involution_failures===720&&r.antiinvariance_failures===118&&r.even_composition_failures===4484
  : r.involution_failures===0&&r.antiinvariance_failures===0&&r.even_composition_failures===0);
console.log(JSON.stringify({schema:"woit-lisi.l130-spacelike-reflection-falsifier.v0.1",source_repair_used:false,results,pass},null,2));
if(!pass)process.exitCode=1;
