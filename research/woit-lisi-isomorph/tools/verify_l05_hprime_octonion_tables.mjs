const Hs=[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[1,0],[1,3],[1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[-1,2],[-1,1],[1,0]]];
const O=[[[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],[[1,1],[-1,0],[1,4],[1,7],[-1,2],[1,6],[-1,5],[-1,3]],[[1,2],[-1,4],[-1,0],[1,5],[1,1],[-1,3],[1,7],[-1,6]],[[1,3],[-1,7],[-1,5],[-1,0],[1,6],[1,2],[-1,4],[1,1]],[[1,4],[1,2],[-1,1],[-1,6],[-1,0],[1,7],[1,3],[-1,5]],[[1,5],[-1,6],[1,3],[-1,2],[-1,7],[-1,0],[1,1],[1,4]],[[1,6],[1,5],[-1,7],[1,4],[-1,3],[-1,1],[-1,0],[-1,2]],[[1,7],[1,3],[1,6],[-1,1],[1,5],[-1,4],[-1,2],[-1,0]]];
const Os=[[[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],[[1,1],[-1,0],[1,3],[-1,2],[-1,5],[1,4],[-1,7],[1,6]],[[1,2],[-1,3],[-1,0],[1,1],[-1,6],[1,7],[1,4],[-1,5]],[[1,3],[1,2],[-1,1],[-1,0],[-1,7],[-1,6],[1,5],[1,4]],[[1,4],[1,5],[1,6],[1,7],[1,0],[1,1],[1,2],[1,3]],[[1,5],[-1,4],[-1,7],[1,6],[-1,1],[1,0],[1,3],[-1,2]],[[1,6],[1,7],[-1,4],[-1,5],[-1,2],[-1,3],[1,0],[1,1]],[[1,7],[-1,6],[1,5],[-1,4],[-1,3],[1,2],[-1,1],[1,0]]];

function mul(table,x,y){
  const n=table.length, out=Array(n).fill(0);
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) if(x[i]&&y[j]){
    const [sg,k]=table[i][j]; out[k]+=sg*x[i]*y[j];
  }
  return out;
}
const conj=x=>x.map((v,i)=>i===0?v:-v);
const q=(sig,x)=>x.reduce((s,v,i)=>s+sig[i]*v*v,0);
const eq=(a,b)=>a.length===b.length&&a.every((v,i)=>v===b[i]);
function vecs(n){
  const out=[Array(n).fill(0)];
  for(let i=0;i<n;i++){
    for(const s of [-1,1]){const v=Array(n).fill(0);v[i]=s;out.push(v);}
  }
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) for(const s of [-1,1]){
    const v=Array(n).fill(0);v[i]=1;v[j]=s;out.push(v);
  }
  return out;
}
function check(name,table,sig){
  const vs=vecs(table.length), failures={norm:0,anti:0};
  for(const x of vs) for(const y of vs){
    const xy=mul(table,x,y);
    if(q(sig,xy)!==q(sig,x)*q(sig,y)) failures.norm++;
    if(!eq(conj(xy),mul(table,conj(y),conj(x)))) failures.anti++;
  }
  return {name,vectors:vs.length,pairs:vs.length*vs.length,failures,pass:failures.norm===0&&failures.anti===0};
}
const results=[
  check("H-prime",Hs,[1,-1,1,-1]),
  check("O",O,[1,1,1,1,1,1,1,1]),
  check("O-prime",Os,[1,1,1,1,-1,-1,-1,-1])
];
const result={schema:"woit-lisi.l05-hprime-o-oprime-falsifier.v0.1",results,pass:results.every(x=>x.pass)};
process.stdout.write(JSON.stringify(result,null,2)+"\n");
if(!result.pass) process.exitCode=1;
