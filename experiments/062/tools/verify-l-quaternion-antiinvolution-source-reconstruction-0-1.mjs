import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const promotionPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json';
const sourcePath='research/woit-lisi-isomorph/lisi/LISI_L05_QUATERNION_ALGEBRA_SOURCE_INSTANCE_0_2.isg';
const reconPath='research/woit-lisi-isomorph/lisi/LISI_L05_QUATERNION_ANTIINVOLUTION_SOURCE_RECONSTRUCTION_0_1.isg';

const P=json(promotionPath),S=read(sourcePath),R=read(reconPath);
check(P.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','composition qualification not active');
check(P.qualified_scope?.relations?.some(x=>x.id===215001),'215001 outside promoted scope');
check(P.global_qualified_authority===false,'global authority overclaim');
check(P.owner_bypass?.external_third_party_verification==='INCOMPLETE_BYPASSED_NOT_PASSED','external status');

const exactCall='(^150010 215001\n    189100 189101 189102 189103 189104 189105 189106\n    189200 189201 189202 189203 189204\n    189205 189206 189207 189208 189209)';
check(R.includes(exactCall),'exact quaternion 215001 instantiation absent');
const calls=[...R.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1]));
check(JSON.stringify(calls)===JSON.stringify([215001]),'wrapper contains extra semantic calls');
check(!/W-SSC-|\/woit\//i.test(R),'cross-track leakage');

// Frozen quaternion instance must carry exact composition/product/form/KAPPA identifiers.
for(const tok of [
  '(^150010 185003',
  '189200 189201 189202 189203 189204',
  '189205 189206 189207 189208',
  '(^150010 193100',
  '189205 189206 189209',
  '(^150010 189207 189206 189206 189106)',
  '(^150010 189208 189206 189106)'
]) check(S.includes(tok),'source support token missing: '+tok);

// Exhaustive finite quaternion control over F3.
// This is a qualification/reconstruction falsifier, not a claim that L05's scalar field is F3.
const mod=n=>((n%3)+3)%3;
const vecs=[];
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<3;d++)vecs.push([a,b,c,d]);
const eq=(x,y)=>x.every((v,i)=>v===y[i]);
const add=(x,y)=>x.map((v,i)=>mod(v+y[i]));
const scale=(k,x)=>x.map(v=>mod(k*v));
const mul=(x,y)=>{
 const [a,b,c,d]=x,[e,f,g,h]=y;
 return [
  mod(a*e-b*f-c*g-d*h),
  mod(a*f+b*e+c*h-d*g),
  mod(a*g-b*h+c*e+d*f),
  mod(a*h+b*g-c*f+d*e)
 ];
};
const B=(x,y)=>mod(x.reduce((s,v,i)=>s+v*y[i],0));
const Q=x=>B(x,x);
const K=x=>[x[0],mod(-x[1]),mod(-x[2]),mod(-x[3])];
const one=[1,0,0,0],zero=[0,0,0,0];

let linearFailures=0,involutionFailures=0,unitFailures=0,orderFailures=0,normFailures=0,compositionFailures=0;
if(!eq(K(one),one))unitFailures++;
for(const x of vecs){
 if(!eq(K(K(x)),x))involutionFailures++;
 if(Q(K(x))!==Q(x))normFailures++;
 for(const y of vecs){
   if(!eq(K(add(x,y)),add(K(x),K(y))))linearFailures++;
   if(!eq(K(mul(x,y)),mul(K(y),K(x))))orderFailures++;
   if(Q(mul(x,y))!==mod(Q(x)*Q(y)))compositionFailures++;
 }
 for(let k=0;k<3;k++)if(!eq(K(scale(k,x)),scale(k,K(x))))linearFailures++;
}
check(linearFailures===0,'finite KAPPA linearity failure');
check(involutionFailures===0,'finite KAPPA involution failure');
check(unitFailures===0,'finite KAPPA unit failure');
check(orderFailures===0,'finite KAPPA order-reversal failure');
check(normFailures===0,'finite KAPPA norm-preservation failure');
check(compositionFailures===0,'finite quaternion composition failure');

// Adversarial identity map must fail anti-involution on a noncommutative pair.
const i=[0,1,0,0],j=[0,0,1,0];
check(!eq(mul(i,j),mul(j,i)),'noncommutative control collapsed');
check(!eq(mul(i,j),mul(j,i)),'identity KAPPA adversarial control did not fail');

console.log(JSON.stringify({
 schema:'isograph.exp062-l-quaternion-antiinvolution-source-reconstruction-verifier.v0.1',
 pass:errors.length===0,
 errors,
 composition_promotion_git_blob_sha:blobSha(promotionPath),
 source_instance_git_blob_sha:blobSha(sourcePath),
 reconstruction_git_blob_sha:blobSha(reconPath),
 relation:215001,
 source_ids:{
   scalar:[189100,189101,189102,189103,189104,189105,189106],
   carrier:[189200,189201,189202,189203,189204],
   product:189205,unit:189206,bilinear:189207,norm:189208,kappa:189209
 },
 finite_control:{
   field:'F3',
   elements:vecs.length,
   ordered_pairs:vecs.length*vecs.length,
   linear_failures:linearFailures,
   involution_failures:involutionFailures,
   unit_failures:unitFailures,
   order_reversal_failures:orderFailures,
   norm_failures:normFailures,
   composition_failures:compositionFailures
 },
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);
