import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const hypPath='experiments/062/L_G5H_TRIPLE_ROLE_COEFFICIENT_0_1.json';
const sscPath='experiments/062/L_G6_TRIPLE_ROLE_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L_G6_TRIPLE_ROLE_MODULE_IA_FIXED_POINT_0_1.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const lbPath='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const schemaPath='research/woit-lisi-isomorph/support/PRIMITIVE_TRIPLE_ROLE_COEFFICIENT_SCHEMA_0_1.isg';

const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),LB=json(lbPath),B=json(bypassPath);
check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===12,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2&&IA.fixed_point?.admitted_implicit_assertions===7,'IA fixed point');
check(FV.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','field/vector dependency');
check(LB.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','linear/basis dependency');
check(B.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass');
check(H.exact_candidate?.git_blob_sha===blobSha(schemaPath),'candidate schema pin');

const src=read(schemaPath);
const fixedCalls=[...src.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1]));
const fixedUnique=[...new Set(fixedCalls)].sort((a,b)=>a-b);
const allowed=new Set([182001,187600,187601,193200,215000,219000,219001,219002]);
for(const id of fixedUnique)check(allowed.has(id),'hidden fixed dependency '+id);
for(const id of [219000,219001,219002])check(src.includes('^150014 '+id),'selected relation undeclared '+id);
for(const id of [182001,187600,187601,193200,215000])check(fixedUnique.includes(id),'expected dependency absent '+id);

function vectors(n){
 const out=[];for(let mask=0;mask<(1<<n);mask++)out.push(Array.from({length:n},(_,i)=>(mask>>i)&1));return out;
}
const eq=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>x===b[i]);
const add=(a,b)=>a.map((x,i)=>x^b[i]);
const scale=(c,v)=>c===0?Array(v.length).fill(0):[...v];
function standardBasis(n){return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));}
function basisCheck(V,basis){
 const n=basis.length;
 if(basis.some(b=>!V.some(v=>eq(v,b))))return false;
 for(let mask=0;mask<(1<<n);mask++){
  const coeff=Array.from({length:n},(_,i)=>(mask>>i)&1);
  const sum=basis.reduce((acc,b,i)=>add(acc,scale(coeff[i],b)),Array(V[0].length).fill(0));
  if(eq(sum,Array(V[0].length).fill(0))&&coeff.some(Boolean))return false;
 }
 const spans=[];
 for(let mask=0;mask<(1<<n);mask++){
  const coeff=Array.from({length:n},(_,i)=>(mask>>i)&1);
  spans.push(basis.reduce((acc,b,i)=>add(acc,scale(coeff[i],b)),Array(V[0].length).fill(0)));
 }
 return V.every(v=>spans.some(s=>eq(s,v)));
}
function linear(V,F){
 const z=Array(V[0].length).fill(0);
 if(!eq(F(z),z))return false;
 for(const u of V)for(const v of V){
  if(!eq(F(add(u,v)),add(F(u),F(v))))return false;
 }
 return true;
}
function bijective(V,F){
 const images=V.map(F);
 if(images.some(y=>!V.some(v=>eq(v,y))))return false;
 for(let i=0;i<images.length;i++)for(let j=i+1;j<images.length;j++)if(eq(images[i],images[j]))return false;
 return true;
}
function rotate(v){return v.length<2?[...v]:[v[v.length-1],...v.slice(0,-1)];}
function swap01(v){if(v.length<2)return [...v];const r=[...v];[r[0],r[1]]=[r[1],r[0]];return r;}
function totalFunction(V,F){return V.every(x=>{const y=F(x);return V.some(v=>eq(v,y));});}
function wrapperCheck(n,{kappa=rotate,FV=x=>[...x],FM=x=>[...x],FP=rotate}={}){
 const A=vectors(n),V=vectors(n),M=vectors(n),P=vectors(n);
 const e=standardBasis(n),vb=standardBasis(n),mb=standardBasis(n),pb=standardBasis(n);
 if(!basisCheck(A,e)||!basisCheck(V,vb)||!basisCheck(M,mb)||!basisCheck(P,pb))return false;
 if(!totalFunction(A,kappa))return false;
 for(const F of [FV,FM,FP])if(!linear(A,F)||!bijective(A,F))return false;
 for(let i=0;i<n;i++){
  if(!eq(FV(vb[i]),e[i]))return false;
  if(!eq(FM(mb[i]),e[i]))return false;
  const ke=kappa(e[i]);
  if(!eq(FP(pb[i]),ke))return false;
 }
 return true;
}

for(const n of [2,4,8])check(wrapperCheck(n),'positive wrapper rejected n='+n);
for(const n of [2,4,8])check(!wrapperCheck(n,{FP:x=>[...x]}),'wrong FP/KAPPA anchor accepted n='+n);
for(const n of [2,4,8])check(!wrapperCheck(n,{FM:swap01}),'swapped FM anchor accepted n='+n);
for(const n of [2,4,8])check(!wrapperCheck(n,{FV:x=>Array(n).fill(0)}),'non-bijective FV accepted n='+n);
for(const n of [2,4,8]){
 const eb=standardBasis(n)[0];
 const missing=x=>eq(x,eb)?null:rotate(x);
 check(!wrapperCheck(n,{kappa:missing,FP:rotate}),'partial KAPPA accepted n='+n);
}

const report={
 schema:'isograph.exp062-triple-role-g6-deterministic-qualification.v0.1',
 pass:errors.length===0,
 failures:errors,
 hypothesis_git_blob_sha:blobSha(hypPath),
 module_ssc_git_blob_sha:blobSha(sscPath),
 module_ia_git_blob_sha:blobSha(iaPath),
 field_vector_dependency_git_blob_sha:blobSha(fvPath),
 linear_basis_dependency_git_blob_sha:blobSha(lbPath),
 candidate_schema_git_blob_sha:blobSha(schemaPath),
 selected_relation_ids:[219000,219001,219002],
 dependency_audit:fixedUnique,
 checks:{
  ssc_obligations:S.obligations?.length,
  module_ia_fixed_point:IA.fixed_point,
  positive_variants:3,
  wrong_positive_role_anchor_cases:3,
  wrong_negative_role_anchor_cases:3,
  non_bijective_map_cases:3,
  partial_kappa_cases:3
 },
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exit(1);
