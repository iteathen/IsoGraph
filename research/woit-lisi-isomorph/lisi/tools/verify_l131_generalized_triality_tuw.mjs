import fs from "node:fs";
const root="research/woit-lisi-isomorph/lisi";
const Htable=[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[-1,0],[1,3],[-1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[1,2],[-1,1],[-1,0]]];
const defs=[{"name":"C","prod":214005,"basis":[214010,214011],"neg":[214013,214014],"sig":[1,1],"file":"LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"Cprime","prod":214105,"basis":[214110,214111],"neg":[214113,214114],"sig":[1,-1],"file":"LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"H","table":[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[-1,0],[1,3],[-1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[1,2],[-1,1],[-1,0]]],"sig":[1,1,1,1]},{"name":"Hprime","prod":214205,"basis":[214210,214211,214212,214213],"neg":[214214,214215,214216,214217],"sig":[1,-1,1,-1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"O","prod":214305,"basis":[214310,214311,214312,214313,214314,214315,214316,214317],"neg":[214318,214319,214320,214321,214322,214323,214324,214325],"sig":[1,1,1,1,1,1,1,1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"Oprime","prod":214405,"basis":[214410,214411,214412,214413,214414,214415,214416,214417],"neg":[214418,214419,214420,214421,214422,214423,214424,214425],"sig":[1,1,1,1,-1,-1,-1,-1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"}];
const cache=new Map();
function text(f){if(!cache.has(f))cache.set(f,fs.readFileSync(root+"/"+f,"utf8"));return cache.get(f);}
function parse(src,prod){const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");const m=new Map();let z;while((z=re.exec(src)))m.set(z[1]+","+z[2],Number(z[3]));return m;}
function bp(D,i,j){if(D.name==="H"){const q=Htable[i][j];return[q[0],q[1]];}if(!D.pm)D.pm=parse(text(D.file),D.prod);const out=D.pm.get(D.basis[i]+","+D.basis[j]);let k=D.basis.indexOf(out),s=1;if(k<0){k=D.neg.indexOf(out);s=-1;}if(k<0)throw new Error("bad product");return[s,k];}
function smul(D,[a,i],[b,j]){const q=bp(D,i,j);return[a*b*q[0],q[1]];}
const kap=([s,k])=>[k===0?s:-s,k];
const B=(D,[s1,k1],[s2,k2])=>k1===k2?s1*s2*D.sig[k1]:0;
function cmul([a,b],[c,d]){return[a*c-b*d,a*d+b*c];}
function cscale([s,k],[a,b]){return[[s*a,s*b],k];}
function cprod(D,[[a,b],i],[[c,d],j]){const q=bp(D,i,j),z=cmul([a,b],[c,d]);return[[q[0]*z[0],q[0]*z[1]],q[1]];}
function cB(D,[[a,b],i],[[c,d],j]){if(i!==j)return[0,0];const z=cmul([a,b],[c,d]);return[D.sig[i]*z[0],D.sig[i]*z[1]];}
const results=[];
for(const D of defs){const n=D.sig.length;let inv=0,canon=0,total=0;
 for(let ui=0;ui<n;ui++)for(let wi=0;wi<n;wi++){const su=D.sig[ui],sw=D.sig[wi],phase=su*sw===1?[1,0]:[0,1];
  for(let vi=0;vi<n;vi++)for(let mi=0;mi<n;mi++)for(let pi=0;pi<n;pi++){total++;
   const u=[1,ui],w=[1,wi],m=[1,mi],chi=[1,pi],v=[1,vi],kw=kap(w),ku=kap(u);
   const vc=cscale(smul(D,kw,smul(D,u,m)),phase);
   const mc=cscale(smul(D,smul(D,chi,u),kw),phase);
   let chio=smul(D,w,smul(D,smul(D,ku,v),ku));chio=smul(D,chio,w);chio=[chio[0]*su*sw,chio[1]];
   const pc=cscale(kap(chio),[1,0]);
   const orig=B(D,kap(chi),smul(D,v,m));
   const out=cB(D,pc,cprod(D,vc,mc));
   if(out[0]!==orig||out[1]!==0)inv++;
   if(ui===0&&wi===0){
    const ev=[[1,0],mi],em=[[1,0],pi],ep=cscale(kap([1,vi]),[1,0]);
    if(JSON.stringify(vc)!==JSON.stringify(ev)||JSON.stringify(mc)!==JSON.stringify(em)||JSON.stringify(pc)!==JSON.stringify(ep))canon++;
   }
  }
 }
 results.push({name:D.name,total_cases:total,invariance_failures:inv,canonical_failures:canon});
}
const pass=results.every(r=>r.name==="O"?(r.invariance_failures===500&&r.canonical_failures===0):(r.invariance_failures===0&&r.canonical_failures===0));
console.log(JSON.stringify({schema:"lisi.l131-tuw-falsifier.v0.1",source_repair_used:false,results,pass},null,2));
if(!pass)process.exitCode=1;
