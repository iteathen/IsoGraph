// L-only exploratory finite Cl(1,3) diagnostic; no global Spin-group or physics claim.
import assert from 'node:assert/strict';
const id=[1,0],neg=x=>[-x[0],x[1]],eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const code=x=>x[0]+':'+x[1];
function mul(a,b){let s=a[0]*b[0];for(let i=0;i<4;i++)if((a[1]>>i)&1){if(i>0&&((b[1]>>i)&1))s=-s;for(let j=0;j<i;j++)if((b[1]>>j)&1)s=-s}return[s,a[1]^b[1]]}
const e=i=>[1,1<<i],pow=(x,n)=>{let y=id;for(let i=0;i<n;i++)y=mul(y,x);return y};
function closure(gen){let m=new Map([[code(id),id]]),grow=true;while(grow){grow=false;for(const a of [...m.values()])for(const b of gen)for(const v of [mul(a,b),mul(b,a)])if(!m.has(code(v))){m.set(code(v),v);grow=true}}return [...m.values()]}
const has=(g,x)=>g.some(y=>eq(x,y)),center=g=>g.filter(x=>g.every(y=>eq(mul(x,y),mul(y,x))));
const order=x=>{let y=id;for(let n=1;n<100;n++){y=mul(y,x);if(eq(y,id))return n}throw Error('unbounded order')};
const inv=(x,g)=>g.find(y=>eq(mul(x,y),id)&&eq(mul(y,x),id));
const P=e(0),T=mul(mul(e(1),e(2)),e(3)),z=mul(P,T),a=mul(e(1),e(2)),b=mul(e(2),e(3)),x=mul(a,z);
const H=closure([a,b]),G=closure([a,b,z]);
const image=(h,k)=>{let v=h;for(let n=0;n<k;n++)v=mul(v,z);return v};
const fibers=new Map();for(const h of H)for(let k=0;k<4;k++){let v=code(image(h,k));fibers.set(v,(fibers.get(v)||0)+1)}
const Hc=center(H),Gc=center(G),hist=g=>g.reduce((o,v)=>(o[order(v)]=(o[order(v)]||0)+1,o),{});
// Compare the actual product H0 x C2 (not just the printed set of coset representatives).
const D=H.flatMap((h,i)=>[0,1].map(k=>[i,k]));
const hidx=new Map(H.map((h,i)=>[code(h),i]));
const dm=(u,v)=>[hidx.get(code(mul(H[u[0]],H[v[0]]))),u[1]^v[1]];
const deq=(u,v)=>u[0]===v[0]&&u[1]===v[1];
const dc=D.filter(u=>D.every(v=>deq(dm(u,v),dm(v,u))));
const dord=u=>{let v=[hidx.get(code(id)),0];for(let n=1;n<100;n++){v=dm(v,u);if(deq(v,[hidx.get(code(id)),0]))return n}throw Error('direct order')};
const directHist=dc.reduce((o,v)=>(o[dord(v)]=(o[dord(v)]||0)+1,o),{});
const source={version:'arXiv:2407.02497v2',original:'×',earlier:'⋊',signature:[1,-1,-1,-1],ptSquare:-1,interpretationQualified:false,G0frozen:false,G1authorized:false,mergeAuthorized:false};
const result={p2:code(pow(P,2)),t2:code(pow(T,2)),pt:code(mul(P,T)),tp:code(mul(T,P)),z2:code(pow(z,2)),zOrder:order(z),Hsize:H.length,Gsize:G.length,Hcenter:hist(Hc),Gcenter:hist(Gc),directCenter:directHist,fibers:[fibers.size,[...fibers.values()].every(n=>n===2)],zNotH:!has(H,z),z2InH:has(H,pow(z,2)),xOrder:order(x),xNotH:!has(H,x),xConjugation:code(mul(mul(x,b),inv(x,G))),twoFactorClosed:has([id,z],pow(z,2))};
const expected={p2:'1:0',t2:'1:0',pt:'1:15',tp:'-1:15',z2:'-1:0',zOrder:4,Hsize:8,Gsize:16,Hcenter:{1:1,2:1},Gcenter:{1:1,2:1,4:2},directCenter:{1:1,2:3},fibers:[16,true],zNotH:true,z2InH:true,xOrder:2,xNotH:true,xConjugation:'-1:12',twoFactorClosed:false};
const valid=(s,r)=>{assert.deepEqual(s,source);assert.deepEqual(r,expected);assert.equal(s.interpretationQualified,false);assert.equal(s.G0frozen,false);assert.equal(s.G1authorized,false);assert.equal(s.mergeAuthorized,false)};
for(let i=0;i<4;i++)assert.ok(eq(pow(e(i),2),[i===0?1:-1,0]));
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)assert.ok(eq(mul(e(i),e(j)),neg(mul(e(j),e(i)))));
valid(source,result);
const mutants=[
['printed ×',s=>s.original='⋊'],['prior ⋊',s=>s.earlier='×'],['source version',s=>s.version='arXiv:2407.02497v1'],['signature',s=>s.signature[0]=-1],['PT square',s=>s.ptSquare=1],['subgroup closure',(_,r)=>r.twoFactorClosed=true],['order four',(_,r)=>r.zOrder=2],['central product',(_,r)=>r.fibers[1]=false],['group size',(_,r)=>r.Gsize=32],['direct-product center',(_,r)=>r.directCenter[4]=2],['semidirect action',(_,r)=>r.xConjugation='1:12'],['semidirect split',(_,r)=>r.xOrder=4],['physics/source intent',s=>s.interpretationQualified=true],['G0 closure',s=>s.G0frozen=true],['G1 admission',s=>s.G1authorized=true],['merge authority',s=>s.mergeAuthorized=true]
];
for(const [name,mut] of mutants){let s=structuredClone(source),r=structuredClone(result),rejected=false;mut(s,r);try{valid(s,r)}catch{rejected=true}assert.ok(rejected,'hostile escaped: '+name)}
console.log('PASS L04 finite Cl(1,3) G0 diagnostic: H0 8, G0 16, central C4 vs direct C2×C2, nontrivial semidirect complement; '+mutants.length+'/'+mutants.length+' hostile mutations rejected; G0/SSC NOT FROZEN');
