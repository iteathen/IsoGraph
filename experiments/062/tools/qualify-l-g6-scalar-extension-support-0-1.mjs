import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const hypPath='experiments/062/L_G5H_SCALAR_EXTENSION_SUPPORT_0_1.json';
const sscPath='experiments/062/L_G6_SCALAR_EXTENSION_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L_G6_SCALAR_EXTENSION_MODULE_IA_FIXED_POINT_0_1.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const lbPath='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const triPath='experiments/062/L_G6_TRILINEAR_RECOVERY_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),LB=json(lbPath),TRI=json(triPath),By=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===33,'SSC count');
check(IA.fixed_point?.reached===true,'IA fixed point not reached');
check(IA.fixed_point?.first_zero_change_iteration===2,'IA zero-change iteration');
check(IA.fixed_point?.admitted_implicit_assertions===12,'IA admitted count');
check(IA.fixed_point?.unresolved_ia_obligations===0,'IA unresolved obligations');
check(FV.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','field/vector dependency');
check(LB.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','linear/basis dependency');
check(TRI.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','trilinear dependency');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass inactive');
check(By.routing?.global_qualified_module_manifest_may_be_changed===false,'global manifest write allowed');

for(const rel of H.exact_scoped_relations||[]){
  check(fs.existsSync(rel.source_path),'missing source '+rel.source_path);
  if(fs.existsSync(rel.source_path))check(blobSha(rel.source_path)===rel.source_git_blob_sha,'source pin mismatch '+rel.id);
}

function topBlocks(s){
  const out=[];let depth=0,start=-1;
  for(let i=0;i<s.length;i++){
    if(s[i]==='['){if(depth===0)start=i;depth++;}
    else if(s[i]===']'){depth--;if(depth===0&&start>=0){out.push(s.slice(start,i+1));start=-1;}}
  }
  return out;
}
function definitionBlock(path,id){
  const blocks=topBlocks(read(path));
  const hit=blocks.filter(b=>new RegExp('\\(\\^150005\\s+\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(b));
  if(hit.length!==1)throw new Error('definition block count '+id+'='+hit.length);
  return hit[0];
}
const allowedCalls={
  193302:new Set([182001,182003,193302]),
  193303:new Set([182004,193302,193303]),
  193400:new Set([183002,193400]),
  222000:new Set([187600,187601,193302,193303,193400,215000,222000,222001,222002]),
  222001:new Set([187600,187601,193302,193303,193400,215000,222000,222001,222002]),
  222002:new Set([187600,187601,193302,193303,193400,215000,222000,222001,222002]),
  225000:new Set([185005,193302,193303,193400,225000]),
  231000:new Set([182002,182004,193302,193303,193400,231000])
};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations||[]){
  const block=definitionBlock(rel.source_path,rel.id);
  const fixed=[...new Set([...block.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b);
  dependencyAudit[rel.id]=fixed;
  for(const x of fixed)check(allowedCalls[rel.id]?.has(x)===true,'hidden dependency '+rel.id+' -> '+x);
  for(const x of allowedCalls[rel.id]||[])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);
}
const selected=[...(H.exact_scoped_relations||[]).map(x=>x.id)].sort((a,b)=>a-b);
check(JSON.stringify(selected)===JSON.stringify([193302,193303,193400,222000,222001,222002,225000,231000]),'selected relation set changed');

// F2 and F4 = F2[a]/(a^2+a+1), encoded a+b*a as bits a | (b<<1).
const f2Add=(x,y)=>(x^y)&1, f2Mul=(x,y)=>(x&y)&1;
const f4Add=(x,y)=>(x^y)&3;
function f4Mul(x,y){
  const a=x&1,b=(x>>1)&1,c=y&1,d=(y>>1)&1;
  // (a+bA)(c+dA), A^2=A+1 in characteristic 2.
  return ((a*c)^(b*d)) | ((((a*d)^(b*c)^(b*d)))<<1);
}
const emb=x=>x&1;
function fieldCheck(elements,add,mul,zero,one){
  for(const x of elements)for(const y of elements){
    if(!elements.includes(add(x,y))||!elements.includes(mul(x,y)))return false;
  }
  for(const x of elements){
    if(add(x,zero)!==x||add(zero,x)!==x||mul(x,one)!==x||mul(one,x)!==x)return false;
    let addInv=false;for(const y of elements)if(add(x,y)===zero)addInv=true;if(!addInv)return false;
    if(x!==zero){let inv=false;for(const y of elements)if(mul(x,y)===one&&mul(y,x)===one)inv=true;if(!inv)return false;}
  }
  for(const x of elements)for(const y of elements)for(const z of elements){
    if(add(add(x,y),z)!==add(x,add(y,z)))return false;
    if(mul(mul(x,y),z)!==mul(x,mul(y,z)))return false;
    if(mul(x,add(y,z))!==add(mul(x,y),mul(x,z)))return false;
    if(mul(add(x,y),z)!==add(mul(x,z),mul(y,z)))return false;
  }
  return true;
}
const R=[0,1],C=[0,1,2,3];
check(fieldCheck(R,f2Add,f2Mul,0,1),'F2 control not field');
check(fieldCheck(C,f4Add,f4Mul,0,1),'F4 control not field');

function embeddingCheck(E){
  if(E(0)!==0||E(1)!==1)return false;
  const images=R.map(E); if(new Set(images).size!==R.length||images.some(x=>!C.includes(x)))return false;
  for(const a of R)for(const b of R){
    if(E(f2Add(a,b))!==f4Add(E(a),E(b)))return false;
    if(E(f2Mul(a,b))!==f4Mul(E(a),E(b)))return false;
  }
  return true;
}
const badUnitEmb=x=>x===0?0:2;
check(embeddingCheck(emb),'193302 F2->F4 embedding rejected');
check(!embeddingCheck(badUnitEmb),'193302 wrong-unit embedding accepted');

function vecs(field,n){
  const out=[];function rec(a){if(a.length===n){out.push(a);return;}for(const x of field)rec([...a,x]);}rec([]);return out;
}
const eq=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>x===b[i]);
const vadd=(add,a,b)=>a.map((x,i)=>add(x,b[i]));
const vscale=(mul,c,v)=>v.map(x=>mul(c,x));
function scalarRestrictionCheck(n,RSCALE){
  const V=vecs(C,n);
  for(const r of R)for(const v of V){
    const a=RSCALE(r,v),b=vscale(f4Mul,emb(r),v);
    if(!eq(a,b))return false;
  }
  return true;
}
const goodRScale=(r,v)=>vscale(f4Mul,emb(r),v);
const badRScale=(r,v)=>r===0?Array(v.length).fill(0):v.map((x,i)=>i===0?f4Add(x,1):x);
check(scalarRestrictionCheck(2,goodRScale),'193303 scalar restriction rejected');
check(!scalarRestrictionCheck(2,badRScale),'193303 scalar restriction mismatch accepted');

function linearInjectionCheck(field,add,mul,A,B,F){
  const zeroA=Array(A[0].length).fill(0),zeroB=Array(B[0].length).fill(0);
  if(!eq(F(zeroA),zeroB))return false;
  for(const u of A)for(const v of A){
    if(!eq(F(vadd(add,u,v)),vadd(add,F(u),F(v))))return false;
    for(const a of field)if(!eq(F(vscale(mul,a,v)),vscale(mul,a,F(v))))return false;
  }
  for(const x of A)for(const y of A)if(eq(F(x),F(y))&&!eq(x,y))return false;
  return true;
}
const A2=vecs(R,2),B3=vecs(R,3);
const incl=v=>[v[0],v[1],0],collapse=v=>[v[0],0,0];
check(linearInjectionCheck(R,f2Add,f2Mul,A2,B3,incl),'193400 linear injection rejected');
check(!linearInjectionCheck(R,f2Add,f2Mul,A2,B3,collapse),'193400 noninjective linear map accepted');

function standardBasis(n,one=1,zero=0){return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?one:zero));}
function finiteExtensionCheck(n,J){
  const VR=vecs(R,n),VC=vecs(C,n);
  const rb=standardBasis(n),cb=standardBasis(n);
  if(!scalarRestrictionCheck(n,goodRScale))return false;
  if(!linearInjectionCheck(R,f2Add,f2Mul,VR,VC,J))return false;
  for(let i=0;i<n;i++)if(!eq(J(rb[i]),cb[i]))return false;
  return true;
}
const coordEmbed=v=>v.map(emb);
for(const n of [2,4,8]){
  check(finiteExtensionCheck(n,coordEmbed),'finite scalar extension positive rejected n='+n);
  const wrong=v=>{const out=coordEmbed(v);if(v.length===n&&eq(v,standardBasis(n)[0]))out[0]=2;return out;};
  check(!finiteExtensionCheck(n,wrong),'wrong basis image accepted n='+n);
}

function trilinearCheck(field,add,mul,V1,V2,V3,T){
  const z=0;
  for(const x of V1)for(const y of V2)for(const w of V3){
    const t=T(x,y,w); if(!field.includes(t))return false;
  }
  for(const x1 of V1)for(const x2 of V1)for(const y of V2)for(const zed of V3){
    if(T(vadd(add,x1,x2),y,zed)!==add(T(x1,y,zed),T(x2,y,zed)))return false;
    for(const a of field)if(T(vscale(mul,a,x1),y,zed)!==mul(a,T(x1,y,zed)))return false;
  }
  for(const x of V1)for(const y1 of V2)for(const y2 of V2)for(const zed of V3){
    if(T(x,vadd(add,y1,y2),zed)!==add(T(x,y1,zed),T(x,y2,zed)))return false;
    for(const a of field)if(T(x,vscale(mul,a,y1),zed)!==mul(a,T(x,y1,zed)))return false;
  }
  for(const x of V1)for(const y of V2)for(const z1 of V3)for(const z2 of V3){
    if(T(x,y,vadd(add,z1,z2))!==add(T(x,y,z1),T(x,y,z2)))return false;
    for(const a of field)if(T(x,y,vscale(mul,a,z1))!==mul(a,T(x,y,z1)))return false;
  }
  return true;
}
const R2=vecs(R,2),C2=vecs(C,2);
const TR=(x,y,z)=>x.reduce((s,xi,i)=>f2Add(s,f2Mul(f2Mul(xi,y[i]),z[i])),0);
const TC=(x,y,z)=>x.reduce((s,xi,i)=>f4Add(s,f4Mul(f4Mul(xi,y[i]),z[i])),0);
const alpha=2;
const TCscaled=(x,y,z)=>f4Mul(alpha,TC(x,y,z));
check(trilinearCheck(R,f2Add,f2Mul,R2,R2,R2,TR),'real trilinear control rejected');
check(trilinearCheck(C,f4Add,f4Mul,C2,C2,C2,TC),'complex trilinear extension rejected');
check(trilinearCheck(C,f4Add,f4Mul,C2,C2,C2,TCscaled),'scaled complex trilinear negative lost trilinearity');
function triExtensionAgreement(TCx){
  for(const x of R2)for(const y of R2)for(const z of R2){
    if(TCx(coordEmbed(x),coordEmbed(y),coordEmbed(z))!==emb(TR(x,y,z)))return false;
  }
  return true;
}
check(triExtensionAgreement(TC),'225000 embedded triple agreement rejected');
check(!triExtensionAgreement(TCscaled),'225000 altered C-trilinear extension accepted');

const PARAM=[0,1];
const WC=C2;
const matricesR=[
  [[1,0],[0,1]],
  [[1,1],[0,1]]
];
function matVecR(M,v){return M.map(row=>row.reduce((s,a,i)=>f2Add(s,f2Mul(a,v[i])),0));}
function matVecC(M,v){return M.map(row=>row.reduce((s,a,i)=>f4Add(s,f4Mul(emb(a),v[i])),0));}
const F=(p,v)=>coordEmbed(matVecR(matricesR[p],v));
const FC=(p,v)=>matVecC(matricesR[p],v);
const FCbad=(p,v)=>{
  const base=FC(p,v);
  if(p===1){
    // still C-linear: alter the (0,0) matrix coefficient from 1 to alpha.
    return [
      f4Add(f4Mul(alpha,v[0]),v[1]),
      v[1]
    ];
  }
  return base;
};
function paramExtensionCheck(F0,FC0){
  for(const p of PARAM){
    for(const u of R2)for(const v of R2){
      if(!eq(F0(p,vadd(f2Add,u,v)),vadd(f4Add,F0(p,u),F0(p,v))))return false;
      for(const a of R)if(!eq(F0(p,vscale(f2Mul,a,v)),vscale(f4Mul,emb(a),F0(p,v))))return false;
    }
    for(const u of C2)for(const v of C2){
      if(!eq(FC0(p,vadd(f4Add,u,v)),vadd(f4Add,FC0(p,u),FC0(p,v))))return false;
      for(const a of C)if(!eq(FC0(p,vscale(f4Mul,a,v)),vscale(f4Mul,a,FC0(p,v))))return false;
    }
    for(const v of R2)if(!eq(F0(p,v),FC0(p,coordEmbed(v))))return false;
  }
  return true;
}
check(paramExtensionCheck(F,FC),'231000 parameterized extension positive rejected');
check(!paramExtensionCheck(F,FCbad),'231000 C-linear disagreement on embedded input accepted');

const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['reflection','anti-linear real structures','square-root or signature-branch','division/positivity/split','triality-group','named algebra','W/cross-track']){
  check(excluded.includes(term),'scope exclusion missing '+term);
}

const report={
  schema:'isograph.exp062-scalar-extension-g6-deterministic-qualification.v0.1',
  pass:errors.length===0,
  failures:errors,
  hypothesis_git_blob_sha:blobSha(hypPath),
  module_ssc_git_blob_sha:blobSha(sscPath),
  module_ia_git_blob_sha:blobSha(iaPath),
  field_vector_dependency_git_blob_sha:blobSha(fvPath),
  linear_basis_dependency_git_blob_sha:blobSha(lbPath),
  trilinear_dependency_git_blob_sha:blobSha(triPath),
  selected_relation_ids:[193302,193303,193400,222000,222001,222002,225000,231000],
  dependency_audit:dependencyAudit,
  checks:{
    ssc_obligations:S.obligations?.length,
    module_ia_fixed_point:IA.fixed_point,
    positive_field_embedding:1,
    wrong_unit_embedding:1,
    positive_scalar_restriction:1,
    scalar_restriction_mismatch:1,
    positive_linear_injection:1,
    noninjective_linear_map:1,
    positive_finite_extensions:3,
    wrong_basis_image_cases:3,
    positive_trilinear_extension:1,
    altered_C_trilinear_extension:1,
    positive_parameterized_extension:1,
    C_linear_embedded_disagreement:1
  },
  external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
  disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exit(1);
