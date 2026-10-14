// IsoGraph Experiment 062, L-only G0 S037 finite-carrier diagnostic.
// Exact rational quaternions + abstract central product. Not author/source semantic authority,
// not a GAP calculation, nor proof of the source's K inclusion, 24-cell or physics.
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
function q(a,b=0,c=0,d=0,n=1){if(n<0)return q(-a,-b,-c,-d,-n);const k=[a,b,c,d,n].reduce((v,x)=>gcd(v,x),0)||1;return [a/k,b/k,c/k,d/k,n/k];}
const o=q(1),minus=q(-1),e1=q(0,1),e2=q(0,0,1),e3=q(0,0,0,1),t=q(-1,-1,-1,-1,2);
function mul(x,y){const[a,b,c,d,n]=x,[e,f,g,h,m]=y;return q(a*e-b*f-c*g-d*h,a*f+b*e+c*h-d*g,a*g-b*h+c*e+d*f,a*h+b*g-c*f+d*e,n*m);}
const ident=x=>JSON.stringify(x),same=(a,b)=>ident(a)===ident(b);
function cl(gens,identity,op,key=ident,limit=500){const a=[identity],known=new Set([key(identity)]);for(let n=0;n<a.length;n++)for(const x of gens)for(const y of [op(a[n],x),op(x,a[n])]){const k=key(y);if(!known.has(k)){a.push(y);known.add(k);if(a.length>limit)throw Error('exceeded finite carrier bound');}}return a;}
function D(n,k){return[((n%4)+4)%4,k];}
function dmul(x,y){return D(x[0]+(x[1]?-y[0]:y[0]),x[1]^y[1]);}
const d1=D(0,0),di=D(1,0),dk=D(0,1),dneg=D(2,0);
function pair(h,d){return[h,d];}
const identity=pair(o,d1);
function product(x,y){return pair(mul(x[0],y[0]),dmul(x[1],y[1]));}
function signPair(x){return pair(mul(x[0],minus),x[1]);}
function pkey([h,d]){const a=ident([h,d]),b=ident([mul(h,minus),dmul(d,dneg)]);return a<b?a:b;}
function closure(gens){return cl(gens,identity,product,pkey,130);}
function ncomm(x,y){return pkey(product(x,y))===pkey(product(y,x));}
function central(group,op,key){return group.filter(x=>group.every(y=>key(op(x,y))===key(op(y,x))));}
function order(x){let a=identity;for(let n=1;n<=96;n++){a=product(a,x);if(pkey(a)===pkey(identity))return n;}throw Error('unexpected element order');}
const H=cl([e1,e2,t],o,mul),D4=cl([di,dk],d1,dmul),P=pair(mul(minus,e3),dk),T=pair(mul(minus,e2),dk),C=pair(e1,di),tg=pair(t,d1),K=pair(o,dk);
const full=closure([C,P,T,tg]),pt=closure([P,T]),ptt=closure([P,T,tg]);
const qPure=closure([pair(e1,d1),pair(e2,d1)]),qPT=pt;
const imageH=new Set(H.map(h=>pkey(pair(h,d1)))),imageD=new Set(D4.map(d=>pkey(pair(o,d))));
function powers(x){let a=identity;for(let n=1;n<=96;n++){a=product(a,x);if(pkey(a)===pkey(identity))return n;}throw Error('not finite');}
function inverse(x){return product(x,[o,d1]);} // unused; group law tests use order and inverse power below.
function invpow(x){let z=order(x)-1,y=identity;while(z--)y=product(y,x);return y;}
function subgroupNormal(sub){const ks=new Set(sub.map(pkey));for(const g of full){const gi=invpow(g);for(const h of sub)if(!ks.has(pkey(product(product(g,h),gi))))return false;}return true;}
const commutators=new Map();for(const a of full){const ai=invpow(a);for(const b of full){const bi=invpow(b),c=product(product(product(a,b),ai),bi);commutators.set(pkey(c),c);}}
const derived=closure([...commutators.values()]);
const positive=full.filter(x=>full.every(y=>ncomm(x,y)));
const Hpair=closure([pair(e1,d1),pair(e2,d1),tg]),Dpair=closure([pair(o,di),K]);
const dk2=pair(o,dk),negG=pair(minus,d1);
export function auditL04S037(){
return{
 carrier:'exact rational Hamilton quaternions, D4=<i,K> with K i K^-1=-i, and central product by (-1_quaternion,-1_D4)',
 quaternion_2T_order:H.length,quaternion_2T_center:central(H,mul,ident).length,
 quaternion_2T_triality_cube:mul(mul(t,t),t),
 D4_order:D4.length,D4_center:central(D4,dmul,ident).length,
 central_product_order:full.length,central_product_center:positive.length,derived_subgroup_order:derived.length,
 image_2T_order:Hpair.length,image_D4_order:Dpair.length,image_intersection_order:[...imageH].filter(x=>imageD.has(x)).length,
 group_sizes:{PT:pt.length,PTt:ptt.length,CPTt:full.length},
 pure_quaternion_Q8_order:qPure.length,PT_generated_Q8_order:qPT.length,
 Q8_embeddings_equal:qPure.every(x=>new Set(qPT.map(pkey)).has(pkey(x))),
 pure_Q8_normal:subgroupNormal(qPure),PT_Q8_normal:subgroupNormal(qPT),
 K_in_quaternion_2T:imageH.has(pkey(K)),K_in_D4:imageD.has(pkey(K)),
 K_commutes_P:ncomm(K,P),K_commutes_T:ncomm(K,T),K_commutes_t:ncomm(K,tg),
 K_anticommutes_C:pkey(product(K,C))===pkey(product(negG,product(C,K))),
 K_not_scalar:pkey(K)!==pkey(identity)&&pkey(K)!==pkey(negG),
 model_representation_isomorphic_to_GAP_ID_96_202_proved:false,
 source_K_membership_in_2T_qualified:false,physical_realization_proved:false,whole_original_cold_pass_complete:false
};}
if(process.argv[1]?.endsWith('l04-s037-2T-D4-center-model-0-1.mjs'))console.log(JSON.stringify(auditL04S037(),null,2));
