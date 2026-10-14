// Exact finite Weyl/Pauli calculation for Lisi L04 G0 source-adjacent diagnostics only.
// No full Pin/Spin theorem, quantum-field implementation, 24-cell claim, or physical symmetry proof.
const zi=(r=0,i=0)=>[r,i];
const add=(x,y)=>zi(x[0]+y[0],x[1]+y[1]);
const mul=(x,y)=>zi(x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]);
const conj=x=>zi(x[0],-x[1]);
const zrow=a=>a.map(r=>r.map(v=>typeof v==='number'?zi(v):v));
const I2=zrow([[1,0],[0,1]]),S1=zrow([[0,1],[1,0]]),S2=zrow([[zi(),zi(0,-1)],[zi(0,1),zi()]]),S3=zrow([[1,0],[0,-1]]);
const I4=Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>zi(r===c?1:0)));
const mx=(A,B)=>A.map((r,i)=>r.map((_,j)=>r.reduce((v,_,k)=>add(v,mul(A[i][k],B[k][j])),zi())));
const scale=(s,A)=>A.map(row=>row.map(x=>mul(s,x)));
const conjugate=A=>A.map(row=>row.map(conj));
const kron=(A,B)=>A.flatMap(a=>B.map(b=>a.flatMap(x=>b.map(y=>mul(x,y)))));
const gamma=[kron(S1,I2),...[S1,S2,S3].map(s=>kron(scale(zi(0,-1),S2),s))];
const I={M:I4,K:0},minusI={M:scale(zi(-1),I4),K:0};
const C={M:scale(zi(0,1),gamma[2]),K:1};
const P={M:scale(zi(0,1),gamma[0]),K:0};
const T={M:mx(gamma[1],gamma[3]),K:1};
const TQ={M:mx(gamma[1],gamma[3]),K:0};
const product=(a,b)=>({M:mx(a.M,a.K?conjugate(b.M):b.M),K:a.K^b.K});
const signed=a=>({M:scale(zi(-1),a.M),K:a.K});
const key=a=>JSON.stringify([a.K,a.M]);
const same=(a,b)=>key(a)===key(b);
function finiteClosure(gens){const seen=new Map([[key(I),I]]);const frontier=[I];while(frontier.length){const a=frontier.pop();for(const b of gens)for(const c of [product(a,b),product(b,a)])if(!seen.has(key(c))){seen.set(key(c),c);frontier.push(c)}if(seen.size>128)throw Error('finite-closure outside checked size bound')}return [...seen.values()]}
function order(x){let a=I;for(let n=1;n<=64;n++){a=product(a,x);if(same(a,I))return n}throw Error('order outside checked finite bound')}
const center=G=>G.filter(x=>G.every(y=>same(product(x,y),product(y,x))));
function histogram(G){const counts={};for(const g of G){const n=order(g);counts[n]=(counts[n]||0)+1}return counts}
const projCount=G=>new Set(G.map(g=>{const a=key(g),b=key(signed(g));return a<b?a:b})).size;
export function auditSourceFiniteModel(){
const signedCPT=finiteClosure([C,P,T]),quantizedSubstitution=finiteClosure([C,P,TQ]);
return {
 source_matrix_profile:'gamma0=sigma1_tensor_sigma0;gammaSpatial=(-i sigma2)_tensor_sigmaSpatial',
 selected_generators:{C:'i gamma2 K',P:'i gamma0',T:'gamma1 gamma3 K',T_Q:'gamma1 gamma3'},
 gamma_signature_check:gamma.map((g,i)=>JSON.stringify(mx(g,g))===JSON.stringify(scale(zi(i===0?1:-1),I4))),
 C_order:order(C),P_order:order(P),T_order:order(T),TQ_order:order(TQ),
 C_P_commute:same(product(C,P),product(P,C)),C_T_commute:same(product(C,T),product(T,C)),
 P_T_commute:same(product(P,T),product(T,P)),P_T_anticommute:same(product(P,T),signed(product(T,P))),
 signed_CPT:{order:signedCPT.length,center_order:center(signedCPT).length,order_histogram:histogram(signedCPT),central_minus_identity:signedCPT.some(g=>same(g,minusI)),central_sign_quotient_cardinality:projCount(signedCPT)},
 substituted_quantized_T:{order:quantizedSubstitution.length,center_order:center(quantizedSubstitution).length,order_histogram:histogram(quantizedSubstitution),central_sign_quotient_cardinality:projCount(quantizedSubstitution)},
 physically_realized:false,full_group_theorem:false,projective_cube_action_verified:false,
 };
}
if(process.argv[1]?.endsWith('l04-cpt-signed-finite-model-0-1.mjs'))console.log(JSON.stringify(auditSourceFiniteModel(),null,2));
