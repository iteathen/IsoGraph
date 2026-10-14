// IsoGraph L-only G0 finite diagnostic. Exact doubled Hurwitz quaternion arithmetic and a separate central C2.
// Source t' ∼ -1/2(1+e1+e2+e3) is a representational claim, not an unconditional group identity.
// INTERNAL-QUALIFICATION scope ONLY: no global Pin/Spin, 96-group, empirical, or physical theorem.
const ONE=[2,0,0,0],MINUS_ONE=[-2,0,0,0],E1=[0,2,0,0],E2=[0,0,2,0],E3=[0,0,0,2];
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),key=a=>a.join(',');
function mul(a,b){
 const [a0,a1,a2,a3]=a,[b0,b1,b2,b3]=b;
 const raw=[a0*b0-a1*b1-a2*b2-a3*b3,a0*b1+a1*b0+a2*b3-a3*b2,a0*b2-a1*b3+a2*b0+a3*b1,a0*b3+a1*b2-a2*b1+a3*b0];
 if(raw.some(x=>x%2!==0))throw Error('Hurwitz doubled-lattice closure failed');
 return raw.map(x=>x/2);
}
const inverse=a=>[a[0],-a[1],-a[2],-a[3]];
function power(a,n){let q=ONE;for(let i=0;i<n;i++)q=mul(q,a);return q}
function closure(gens){const known=new Map([[key(ONE),ONE]]),todo=[ONE];while(todo.length){const x=todo.pop();for(const g of gens)for(const y of [mul(x,g),mul(g,x)])if(!known.has(key(y))){known.set(key(y),y);todo.push(y)}if(known.size>96)throw Error('Excessive finite quaternion closure')}return[...known.values()]}
const pair=(q,c=0)=>({q,c}),pKey=a=>key(a.q)+':'+a.c;
const product=(a,b)=>pair(mul(a.q,b.q),a.c^b.c);
function closurePair(gens){const id=pair(ONE),seen=new Map([[pKey(id),id]]),todo=[id];while(todo.length){const x=todo.pop();for(const g of gens)for(const y of [product(x,g),product(g,x)])if(!seen.has(pKey(y))){seen.set(pKey(y),y);todo.push(y)}if(seen.size>128)throw Error('Excessive split-complex extension closure')}return[...seen.values()]}
function order(x){let p=pair(ONE);for(let n=1;n<=24;n++){p=product(p,x);if(same(p,pair(ONE)))return n}throw Error('No finite order <=24')}
export function auditTriality48(tprime=[-1,-1,-1,-1]){
 const Q8=closure([E1,E2]),T24=closure([E1,E2,tprime]),G=closurePair([pair(E1),pair(E2),pair(tprime),pair(ONE,1)]);
 const center=G.filter(x=>G.every(y=>same(product(x,y),product(y,x))));
 const histogram=Object.fromEntries([...new Set(G.map(order))].sort((a,b)=>a-b).map(n=>[n,G.filter(x=>order(x)===n).length]));
 const conj=e=>mul(mul(tprime,e),inverse(tprime));
 const ad=[same(conj(E1),E2),same(conj(E2),E3),same(conj(E3),E1)];
 const positive=[1,1,1,1];
 return{
  selected_tprime_doubled:tprime,
  source_quaternion_basis_e1e2_e3:same(mul(E1,E2),E3),
  source_ei_squares_negative:[E1,E2,E3].every(x=>same(power(x,2),MINUS_ONE)),
  tprime_cube_positive_one:same(power(tprime,3),ONE),
  tprime_cube_negative_one:same(power(tprime,3),MINUS_ONE),
  positive_half_companion_cube_negative_one:same(power(positive,3),MINUS_ONE),
  source_adjoint_three_cycle:ad,
  q8_normal_under_tprime:Q8.every(q=>Q8.some(z=>same(z,conj(q)))),
  PT_Q8_order:Q8.length,
  PTtprime_binary_tetrahedral_order:T24.length,
  independent_split_complex_C_commutes_with_tprime:same(product(pair(tprime),pair(ONE,1)),product(pair(ONE,1),pair(tprime))),
  CPTtprime_direct_product_order:G.length,
  center_order:center.length,
  group_element_order_histogram:histogram,
  mathematical_model_scope_only:true,
  physical_symmetry_proved:false,
  final_96_group_uniqueness_proved:false
 };
}
if(process.argv[1]?.endsWith('verify-l04-commuting-C-48-finite-model-0-1.mjs'))console.log(JSON.stringify(auditTriality48(),null,2));
