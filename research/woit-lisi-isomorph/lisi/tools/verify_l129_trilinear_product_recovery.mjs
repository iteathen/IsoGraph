import fs from "node:fs";

const root="research/woit-lisi-isomorph/lisi";
const Htable=[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[-1,0],[1,3],[-1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[1,2],[-1,1],[-1,0]]];
const defs=[{"name":"C","prod":214005,"basis":[214010,214011],"neg":[214013,214014],"sig":[1,1],"file":"LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"Cprime","prod":214105,"basis":[214110,214111],"neg":[214113,214114],"sig":[1,-1],"file":"LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"H","table":[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[-1,0],[1,3],[-1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[1,2],[-1,1],[-1,0]]],"sig":[1,1,1,1]},{"name":"Hprime","prod":214205,"basis":[214210,214211,214212,214213],"neg":[214214,214215,214216,214217],"sig":[1,-1,1,-1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"O","prod":214305,"basis":[214310,214311,214312,214313,214314,214315,214316,214317],"neg":[214318,214319,214320,214321,214322,214323,214324,214325],"sig":[1,1,1,1,1,1,1,1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"Oprime","prod":214405,"basis":[214410,214411,214412,214413,214414,214415,214416,214417],"neg":[214418,214419,214420,214421,214422,214423,214424,214425],"sig":[1,1,1,1,-1,-1,-1,-1],"file":"LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"}];

const cache=new Map();
function text(file){
  if(!cache.has(file)) cache.set(file,fs.readFileSync(root+"/"+file,"utf8"));
  return cache.get(file);
}
function parseProd(src,prod){
  const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");
  const m=new Map(); let z;
  while((z=re.exec(src)))m.set(z[1]+","+z[2],Number(z[3]));
  return m;
}
function bp(D,i,j){
  if(D.name==="H"){const q=Htable[i][j];return [q[0],q[1]];}
  if(!D.pm)D.pm=parseProd(text(D.file),D.prod);
  const out=D.pm.get(D.basis[i]+","+D.basis[j]);
  let k=D.basis.indexOf(out),sg=1;
  if(k<0){k=D.neg.indexOf(out);sg=-1;}
  if(k<0)throw new Error("unresolved product "+D.name+" "+i+","+j+" -> "+out);
  return [sg,k];
}
const kap=([sg,k])=>[k===0?sg:-sg,k];
const B=(D,[s1,k1],[s2,k2])=>k1===k2?s1*s2*D.sig[k1]:0;

const results=[];
for(const D of defs){
  const n=D.sig.length;
  let recovery_failures=0, typed_cycle_failures=0;
  const cycle_samples=[];
  for(let x=0;x<n;x++)for(let y=0;y<n;y++){
    const xy=bp(D,x,y);
    const pairings=Array.from({length:n},(_,z)=>B(D,[1,z],xy));
    const recovered=pairings.map((t,z)=>D.sig[z]*t);
    const expected=Array(n).fill(0);expected[xy[1]]=xy[0];
    if(recovered.some((v,z)=>v!==expected[z])) recovery_failures++;

    for(let z=0;z<n;z++){
      const t1=pairings[z];
      const kz=kap([1,z]),ky=kap([1,y]);
      const q=bp(D,kz[1],x);
      const prod=[q[0]*kz[0],q[1]];
      const t2=B(D,ky,prod);
      if(t1!==t2){
        typed_cycle_failures++;
        if(cycle_samples.length<8)cycle_samples.push({x,y,z,t1,t2});
      }
    }
  }
  results.push({name:D.name,recovery_failures,typed_cycle_failures,cycle_samples});
}

const pass=results.every(r=>
  r.recovery_failures===0 &&
  (r.name==="O" ? r.typed_cycle_failures===2 : r.typed_cycle_failures===0)
);
const result={
  schema:"woit-lisi.l129-trilinear-product-recovery-falsifier.v0.1",
  source_repair_used:false,
  expected_ordinary_O_cycle_failures:2,
  results,
  pass
};
console.log(JSON.stringify(result,null,2));
if(!pass)process.exitCode=1;
