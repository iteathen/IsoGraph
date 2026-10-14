const V=0,M=1,P=2;
const types={
  Rv:[V,P,M],
  Rm:[P,M,V],
  Rp:[M,V,P],
};
const entries=Object.entries(types);
const results=[];
let pass=true;
for(const [n1,p1] of entries) for(const [n2,p2] of entries){
  const c=[p2[p1[V]],p2[p1[M]],p2[p1[P]]];
  const same=n1===n2;
  const identity=c.every((x,i)=>x===i);
  const noFixed=c.every((x,i)=>x!==i);
  const c2=c.map(x=>c[x]), c3=c2.map(x=>c[x]);
  const order3=c3.every((x,i)=>x===i);
  const ok=same?identity:(noFixed&&order3);
  if(!ok)pass=false;
  results.push({first:n1,second:n2,composition:c,same,identity,noFixed,order3,pass:ok});
}
const seq=[types.Rp,types.Rm,types.Rv,types.Rp];
function applySeq(r){for(const p of seq)r=p[r];return r;}
const canonical=[applySeq(V),applySeq(M),applySeq(P)];
const canonicalExpected=[P,V,M];
const canonicalPass=canonical.every((x,i)=>x===canonicalExpected[i]);
pass=pass&&canonicalPass;
console.log(JSON.stringify({schema:"lisi.l131-role-composition-falsifier.v0.1",results,canonical,canonicalExpected,canonicalPass,pass},null,2));
if(!pass)process.exitCode=1;
