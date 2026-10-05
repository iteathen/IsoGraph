function cmul(a,b){return [a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];}
function smul(a,b){return [a[0]*b[0]+a[1]*b[1],a[0]*b[1]+a[1]*b[0]];}
const k=a=>[a[0],-a[1]];
const qC=a=>a[0]*a[0]+a[1]*a[1];
const qS=a=>a[0]*a[0]-a[1]*a[1];
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const vals=[]; for(let a=-2;a<=2;a++) for(let b=-2;b<=2;b++) vals.push([a,b]);
const failures={complex_norm:0,split_norm:0,complex_anti:0,split_anti:0};
for(const x of vals) for(const y of vals){
  const c=cmul(x,y), s=smul(x,y);
  if(qC(c)!==qC(x)*qC(y)) failures.complex_norm++;
  if(qS(s)!==qS(x)*qS(y)) failures.split_norm++;
  if(!eq(k(c),cmul(k(y),k(x)))) failures.complex_anti++;
  if(!eq(k(s),smul(k(y),k(x)))) failures.split_anti++;
}
const result={
  schema:"woit-lisi.l05-complex-split-composition-falsifier.v0.1",
  coefficient_vectors_tested:vals.length,
  ordered_pairs_tested:vals.length*vals.length,
  failures,
  pass:Object.values(failures).every(x=>x===0)
};
process.stdout.write(JSON.stringify(result,null,2)+"\n");
if(!result.pass) process.exitCode=1;
