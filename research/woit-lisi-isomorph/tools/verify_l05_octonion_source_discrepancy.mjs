const O=[
[[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],
[[1,1],[-1,0],[1,4],[1,7],[-1,2],[1,6],[-1,5],[-1,3]],
[[1,2],[-1,4],[-1,0],[1,5],[1,1],[-1,3],[1,7],[-1,6]],
[[1,3],[-1,7],[-1,5],[-1,0],[1,6],[1,2],[-1,4],[1,1]],
[[1,4],[1,2],[-1,1],[-1,6],[-1,0],[1,7],[1,3],[-1,5]],
[[1,5],[-1,6],[1,3],[-1,2],[-1,7],[-1,0],[1,1],[1,4]],
[[1,6],[1,5],[-1,7],[1,4],[-1,3],[-1,1],[-1,0],[-1,2]],
[[1,7],[1,3],[1,6],[-1,1],[1,5],[-1,4],[-1,2],[-1,0]]
];
const Hs=[
[[1,0],[1,1],[1,2],[1,3]],
[[1,1],[1,0],[1,3],[1,2]],
[[1,2],[-1,3],[-1,0],[1,1]],
[[1,3],[-1,2],[-1,1],[1,0]]
];
const Os=[
[[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],
[[1,1],[-1,0],[1,3],[-1,2],[-1,5],[1,4],[-1,7],[1,6]],
[[1,2],[-1,3],[-1,0],[1,1],[-1,6],[1,7],[1,4],[-1,5]],
[[1,3],[1,2],[-1,1],[-1,0],[-1,7],[-1,6],[1,5],[1,4]],
[[1,4],[1,5],[1,6],[1,7],[1,0],[1,1],[1,2],[1,3]],
[[1,5],[-1,4],[-1,7],[1,6],[-1,1],[1,0],[1,3],[-1,2]],
[[1,6],[1,7],[-1,4],[-1,5],[-1,2],[-1,3],[1,0],[1,1]],
[[1,7],[-1,6],[1,5],[-1,4],[-1,3],[1,2],[-1,1],[1,0]]
];

function mul(table,x,y){
  const out=Array(table.length).fill(0);
  for(let i=0;i<table.length;i++) for(let j=0;j<table.length;j++) if(x[i]&&y[j]){
    const [s,k]=table[i][j]; out[k]+=s*x[i]*y[j];
  }
  return out;
}
const conj=x=>x.map((v,i)=>i===0?v:-v);
const eq=(a,b)=>a.every((v,i)=>v===b[i]);
const q=(sig,x)=>x.reduce((z,v,i)=>z+sig[i]*v*v,0);
function vecs(n){
  const out=[Array(n).fill(0)];
  for(let i=0;i<n;i++) for(const s of [-1,1]){
    const v=Array(n).fill(0); v[i]=s; out.push(v);
  }
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) for(const s of [-1,1]){
    const v=Array(n).fill(0); v[i]=1; v[j]=s; out.push(v);
  }
  return out;
}
function counts(table,sig){
  const vs=vecs(table.length); let norm=0,anti=0;
  for(const x of vs) for(const y of vs){
    const xy=mul(table,x,y);
    if(q(sig,xy)!==q(sig,x)*q(sig,y)) norm++;
    if(!eq(conj(xy),mul(table,conj(y),conj(x)))) anti++;
  }
  return {vectors:vs.length,pairs:vs.length*vs.length,norm_failures:norm,antiinvolution_failures:anti};
}
const exact=counts(O,[1,1,1,1,1,1,1,1]);
const hControl=counts(Hs,[1,-1,1,-1]);
const osControl=counts(Os,[1,1,1,1,-1,-1,-1,-1]);
const repairA=JSON.parse(JSON.stringify(O)); repairA[6][7]=[1,2];
const repairB=JSON.parse(JSON.stringify(O)); repairB[7][6]=[1,2];
const ra=counts(repairA,[1,1,1,1,1,1,1,1]);
const rb=counts(repairB,[1,1,1,1,1,1,1,1]);
const x=[1,0,0,0,0,0,-1,0], y=[0,0,1,0,0,0,0,-1];
const xy=mul(O,x,y);
const pass=
  exact.norm_failures>0 &&
  exact.antiinvolution_failures>0 &&
  hControl.norm_failures===0 && hControl.antiinvolution_failures===0 &&
  osControl.norm_failures===0 && osControl.antiinvolution_failures===0 &&
  eq(xy,Array(8).fill(0)) &&
  q([1,1,1,1,1,1,1,1],x)===2 &&
  q([1,1,1,1,1,1,1,1],y)===2 &&
  ra.norm_failures===0 && ra.antiinvolution_failures===0 &&
  rb.norm_failures>0 && rb.antiinvolution_failures===0;

const result={
  schema:"woit-lisi.l05-octonion-source-discrepancy-verifier.v0.1",
  exact_source_table:exact,
  split_quaternion_control:hControl,
  split_octonion_control:osControl,
  zero_divisor_witness:{x:"e0-e6",y:"e2-e7",product:xy,norm_x:2,norm_y:2},
  repair_e6e7_plus_e2:ra,
  repair_e7e6_plus_e2:rb,
  pass
};
process.stdout.write(JSON.stringify(result,null,2)+"\n");
if(!pass) process.exitCode=1;
