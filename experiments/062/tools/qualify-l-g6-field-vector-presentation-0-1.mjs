import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
  const b=Buffer.from(read(p),'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const fail=[];
const check=(ok,msg)=>{if(!ok)fail.push(msg);};

const candidatePath='research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg';
const hypPath='experiments/062/L_G5H_FIELD_VECTOR_PRESENTATION_0_1.json';
const sscPath='experiments/062/L_G6_FIELD_VECTOR_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L_G6_FIELD_VECTOR_MODULE_IA_FIXED_POINT_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const core20Path='CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md';
const core21Path='CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md';

const src=read(candidatePath), H=json(hypPath), S=json(sscPath), IA=json(iaPath), B=json(bypassPath);
check(H.exact_candidate?.git_blob_sha===blobSha(candidatePath),'candidate pin mismatch');
check(S.exact_candidate?.git_blob_sha===blobSha(candidatePath),'SSC candidate pin mismatch');
check(S.hypothesis_origin?.git_blob_sha===blobSha(hypPath),'SSC hypothesis pin mismatch');
check(IA.inputs?.module_ssc?.git_blob_sha===blobSha(sscPath),'IA SSC pin mismatch');
check(IA.inputs?.exact_candidate?.git_blob_sha===blobSha(candidatePath),'IA candidate pin mismatch');
check(B.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass inactive');
check(B.routing?.G6_external_semantic_and_external_promotion_substeps_temporarily_bypassed===true,'G6 bypass routing absent');
check(B.routing?.global_qualified_module_manifest_may_be_changed===false,'global manifest mutation unexpectedly allowed');

const caretIds=[...src.matchAll(/\^(\d+)/g)].map(m=>Number(m[1]));
const allowedCore=new Set([0,...Array.from({length:25},(_,i)=>150000+i)]);
const local=new Set([182000,182001,182002,182003,182004]);
const undeclared=[...new Set(caretIds.filter(x=>!allowedCore.has(x)&&!local.has(x)))];
check(undeclared.length===0,'hidden semantic dependency IDs '+undeclared.join(','));
for(const id of local)check(src.includes('^15001'+(id===182000?'3':'4')+' '+id)||src.includes('^150014 '+id),'missing local declaration '+id);
for(let i=150000;i<=150024;i++)check(src.includes('^'+i),'missing Core import '+i);
check(S.obligations?.length===23,'SSC obligation count');
check(IA.fixed_point?.reached===true && IA.fixed_point?.first_zero_change_iteration===2,'IA fixed point');
check(IA.fixed_point?.admitted_implicit_assertions===7,'IA admitted count');
check((IA.iterations||[]).at(-1)?.newly_admitted?.length===0,'IA terminal nonzero change');

function unaryFunction(A,B,rows){
  for(const x of A){
    const ys=rows.filter(r=>r[0]===x).map(r=>r[1]).filter(y=>B.includes(y));
    if(ys.length!==1)return false;
  }
  return rows.every(([x,y])=>A.includes(x)&&B.includes(y));
}
function binaryFunction(A,B,C,rows){
  for(const x of A)for(const y of B){
    const zs=rows.filter(r=>r[0]===x&&r[1]===y).map(r=>r[2]).filter(z=>C.includes(z));
    if(zs.length!==1)return false;
  }
  return rows.every(([x,y,z])=>A.includes(x)&&B.includes(y)&&C.includes(z));
}
const uA=[0,1],uB=['a','b'];
check(unaryFunction(uA,uB,[[0,'a'],[1,'b']]),'positive unary function');
check(!unaryFunction(uA,uB,[[0,'a']]),'missing-domain unary accepted');
check(!unaryFunction(uA,uB,[[0,'a'],[0,'b'],[1,'b']]),'multivalued unary accepted');
check(binaryFunction([0,1],[0,1],[0,1],[[0,0,0],[0,1,1],[1,0,1],[1,1,0]]),'positive binary function');
check(!binaryFunction([0,1],[0,1],[0,1],[[0,0,0],[0,1,1],[1,0,1]]),'missing-domain binary accepted');
check(!binaryFunction([0,1],[0,1],[0,1],[[0,0,0],[0,0,1],[0,1,1],[1,0,1],[1,1,0]]),'multivalued binary accepted');

function mod(n,p){return ((n%p)+p)%p;}
function primeField(p){
 const C=Array.from({length:p},(_,i)=>i);
 return {C,zero:0,one:1%p,add:(a,b)=>mod(a+b,p),mul:(a,b)=>mod(a*b,p),neg:a=>mod(-a,p),
  inv:a=>{if(a===0)return null;for(let x=1;x<p;x++)if(mod(a*x,p)===1)return x;return null;}};
}
function checkField(F){
 const {C,zero,one,add,mul,neg,inv}=F;
 if(zero===one||!C.includes(zero)||!C.includes(one))return false;
 for(const a of C){
  if(add(a,zero)!==a||add(zero,a)!==a||mul(a,one)!==a||mul(one,a)!==a)return false;
  if(add(a,neg(a))!==zero||add(neg(a),a)!==zero)return false;
  if(a!==zero){const ia=inv(a); if(ia===null||!C.includes(ia)||mul(a,ia)!==one||mul(ia,a)!==one)return false;}
 }
 for(const a of C)for(const b of C){
  if(add(a,b)!==add(b,a)||mul(a,b)!==mul(b,a))return false;
  for(const c of C){
   if(add(add(a,b),c)!==add(a,add(b,c)))return false;
   if(mul(mul(a,b),c)!==mul(a,mul(b,c)))return false;
   if(mul(a,add(b,c))!==add(mul(a,b),mul(a,c)))return false;
  }
 }
 return true;
}
for(const p of [2,3,5])check(checkField(primeField(p)),'GF('+p+') rejected');
const z4={...primeField(4),inv:a=>{if(a===1||a===3)return a;return null;}};
check(!checkField(z4),'Z4 accepted as field');
const singleton={C:[0],zero:0,one:0,add:()=>0,mul:()=>0,neg:()=>0,inv:()=>null};
check(!checkField(singleton),'zero=one structure accepted');
const brokenDist={...primeField(3),mul:(a,b)=>(a===2&&b===2?0:mod(a*b,3)),inv:a=>a===1?1:(a===2?2:null)};
check(!checkField(brokenDist),'broken field accepted');

function tuples(p,n){
 const out=[];
 function rec(a){if(a.length===n){out.push(a);return;}for(let x=0;x<p;x++)rec([...a,x]);}
 rec([]);return out;
}
const eqv=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
function vectorModel(p,n,breakKind=null){
 const F=primeField(p), V=tuples(p,n), zero=Array(n).fill(0);
 const add=(u,v)=>breakKind==='add_identity'?zero:u.map((x,i)=>mod(x+v[i],p));
 const neg=u=>u.map(x=>mod(-x,p));
 const scale=(a,v)=>{
   if(breakKind==='one_action'&&a===F.one)return zero;
   const out=v.map(x=>mod(a*x,p));
   if(breakKind==='scalar_dist'&&a===2%p&&v.some(x=>x!==0))return zero;
   return out;
 };
 return {F,V,zero,add,neg,scale};
}
function checkVector(M){
 const {F,V,zero,add,neg,scale}=M;
 if(!checkField(F))return false;
 const has=v=>V.some(x=>eqv(x,v));
 if(!has(zero))return false;
 for(const v of V){
  if(!eqv(add(v,zero),v)||!eqv(add(zero,v),v))return false;
  if(!eqv(add(v,neg(v)),zero)||!eqv(add(neg(v),v),zero))return false;
  if(!eqv(scale(F.one,v),v))return false;
 }
 for(const u of V)for(const v of V){
  if(!eqv(add(u,v),add(v,u)))return false;
  for(const w of V)if(!eqv(add(add(u,v),w),add(u,add(v,w))))return false;
  for(const a of F.C)if(!eqv(scale(a,add(u,v)),add(scale(a,u),scale(a,v))))return false;
 }
 for(const a of F.C)for(const b of F.C)for(const v of V){
  if(!eqv(scale(F.add(a,b),v),add(scale(a,v),scale(b,v))))return false;
  if(!eqv(scale(F.mul(a,b),v),scale(a,scale(b,v))))return false;
 }
 return true;
}
for(const [p,n] of [[2,2],[3,2],[5,1]])check(checkVector(vectorModel(p,n)),'positive vector F'+p+'^'+n+' rejected');
check(!checkVector(vectorModel(3,2,'add_identity')),'broken vector identity accepted');
check(!checkVector(vectorModel(3,2,'one_action')),'broken scalar identity accepted');
check(!checkVector(vectorModel(3,2,'scalar_dist')),'broken scalar/vector distributivity accepted');

const candidatePatterns=[
 '(^150010 182003 ?C ?ADD ?MUL ?NEG ?INV ?ZERO ?ONE)',
 '(^150010 182004 ?C ?ADD ?MUL ?NEG ?INV ?ZERO ?ONE ?V ?VADD ?VNEG ?SCALE ?VZERO)',
 '(^150003 (^150008 ?ZERO ?ONE))',
 '(^150010 ?MUL ?a ?bc ?left)',
 '(^150010 ?SCALE ?a ?uv ?left)',
 '(^150010 ?SCALE ?ab ?v ?left)'
];
for(const p of candidatePatterns)check(src.includes(p),'candidate reconstruction pattern missing: '+p);

const result={
 schema:'isograph.exp062-field-vector-g6-deterministic-qualification.v0.1',
 pass:fail.length===0,
 failures:fail,
 candidate_git_blob_sha:blobSha(candidatePath),
 module_ssc_git_blob_sha:blobSha(sscPath),
 module_ia_git_blob_sha:blobSha(iaPath),
 exact_core_inputs:{core20_git_blob_sha:blobSha(core20Path),core21_git_blob_sha:blobSha(core21Path)},
 checks:{
  hidden_semantic_dependency_ids:undeclared,
  ssc_obligations:S.obligations?.length,
  module_ia_fixed_point:IA.fixed_point,
  positive_function_cases:2,
  adversarial_function_cases:4,
  positive_field_cases:3,
  adversarial_field_cases:3,
  positive_vector_cases:3,
  adversarial_vector_cases:3,
  candidate_reconstruction_patterns:candidatePatterns.length
 },
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:fail.length===0
   ?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW'
   :'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(result,null,2));
if(fail.length)process.exit(1);
