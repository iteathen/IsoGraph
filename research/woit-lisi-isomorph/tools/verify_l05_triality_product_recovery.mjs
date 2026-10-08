const basis=[
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
];

function mul(a,b){
  const [a0,a1,a2,a3]=a;
  const [b0,b1,b2,b3]=b;
  return [
    a0*b0-a1*b1-a2*b2-a3*b3,
    a0*b1+a1*b0+a2*b3-a3*b2,
    a0*b2-a1*b3+a2*b0+a3*b1,
    a0*b3+a1*b2-a2*b1+a3*b0,
  ];
}
const B=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];
const add=(a,b)=>a.map((x,i)=>x+b[i]);
const scale=(s,a)=>a.map(x=>s*x);
const eq=(a,b)=>a.every((x,i)=>x===b[i]);

const failures=[];
for(let vi=0;vi<4;vi++){
  for(let mi=0;mi<4;mi++){
    const h=mul(basis[vi],basis[mi]);
    let recovered=[0,0,0,0];
    const probes=[];
    for(let pi=0;pi<4;pi++){
      const t=B(basis[pi],h);
      probes.push(t);
      recovered=add(recovered,scale(t,basis[pi]));
    }
    if(!eq(h,recovered)) failures.push({vi,mi,h,probes,recovered});
  }
}
const result={
  schema:"woit-lisi.l05-quaternion-triality-product-recovery-falsifier.v0.1",
  carrier:"standard quaternion basis {1,i,j,k}",
  pairs_tested:16,
  probe_pairings_tested:64,
  formula:"recover h from T(v,m,e_a)=B(e_a,h) using the nondegenerate orthonormal quaternion basis",
  failures:failures.length,
  pass:failures.length===0
};
process.stdout.write(JSON.stringify(result,null,2)+"\n");
if(!result.pass) process.exitCode=1;
