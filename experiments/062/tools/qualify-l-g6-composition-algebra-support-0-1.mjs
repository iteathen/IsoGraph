import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const hypPath='experiments/062/L_G5H_COMPOSITION_ALGEBRA_SUPPORT_0_1.json';
const sscPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_MODULE_IA_FIXED_POINT_0_1.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const lbPath='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';

const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),LB=json(lbPath),By=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===32,'SSC count');
check(IA.fixed_point?.reached===true,'IA fixed point not reached');
check(IA.fixed_point?.first_zero_change_iteration===2,'IA zero-change iteration');
check(IA.fixed_point?.admitted_implicit_assertions===11,'IA admitted count');
check(IA.fixed_point?.unresolved_ia_obligations===0,'IA unresolved obligations');
check(FV.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','field/vector dependency');
check(LB.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','linear/basis dependency');
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
  184003:new Set([184003,182004,182002]),
  185001:new Set([185001,184003]),
  185002:new Set([185002,182004,183003,182001]),
  185003:new Set([185003,184003,185002]),
  188000:new Set([188000,185001,183002]),
  215001:new Set([215001,185003,183002])
};
const dependencyAudit={};
const definitionBlocks={};
for(const rel of H.exact_scoped_relations||[]){
  const block=definitionBlock(rel.source_path,rel.id);
  definitionBlocks[rel.id]=block;
  const calls=[...block.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1]));
  const fixed=[...new Set(calls)].sort((a,b)=>a-b);
  dependencyAudit[rel.id]=fixed;
  for(const x of fixed)check(allowedCalls[rel.id]?.has(x)===true,'hidden dependency '+rel.id+' -> '+x);
  for(const x of allowedCalls[rel.id]||[])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);
}
const selected=new Set((H.exact_scoped_relations||[]).map(x=>x.id));
check(JSON.stringify([...selected].sort((a,b)=>a-b))===JSON.stringify([184003,185001,185002,185003,188000,215001]),'selected relation set changed');
for(const forbidden of [184001,184002,184004,184005,184006,184007,184008,184009,185004,185005,185006,188001,188002]){
  check(!selected.has(forbidden),'unselected relation leaked '+forbidden);
}
check(!dependencyAudit[185003].includes(185001),'composition schema silently depends on associativity');
check(!/ASSOCIAT|associat/i.test(definitionBlocks[185003]),'composition schema contains associativity text/token');

const mod=(n,p)=>((n%p)+p)%p;
const eq=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>x===b[i]);
function vectors(p,n){
  const out=[];function rec(a){if(a.length===n){out.push(a);return;}for(let x=0;x<p;x++)rec([...a,x]);}rec([]);return out;
}
const vadd=(p,a,b)=>a.map((x,i)=>mod(x+b[i],p));
const vscale=(p,c,a)=>a.map(x=>mod(c*x,p));
const contains=(V,x)=>Array.isArray(x)&&V.some(v=>eq(v,x));

function linearMap(p,V,W,F){
  const zV=Array(V[0].length).fill(0),zW=Array(W[0].length).fill(0);
  if(!eq(F(zV),zW))return false;
  for(const u of V)for(const v of V){
    const Fu=F(u),Fv=F(v),Fuv=F(vadd(p,u,v));
    if(!contains(W,Fu)||!contains(W,Fv)||!contains(W,Fuv))return false;
    if(!eq(Fuv,vadd(p,Fu,Fv)))return false;
    for(let a=0;a<p;a++){
      const Fav=F(vscale(p,a,v));
      if(!contains(W,Fav)||!eq(Fav,vscale(p,a,Fv)))return false;
    }
  }
  return true;
}
function bilinearProduct(p,V,P){
  for(const u of V)for(const v of V){
    const uv=P(u,v); if(!contains(V,uv))return false;
  }
  for(const u of V)for(const v of V)for(const w of V){
    if(!eq(P(vadd(p,u,v),w),vadd(p,P(u,w),P(v,w))))return false;
    if(!eq(P(u,vadd(p,v,w)),vadd(p,P(u,v),P(u,w))))return false;
    for(let a=0;a<p;a++){
      if(!eq(P(vscale(p,a,u),w),vscale(p,a,P(u,w))))return false;
      if(!eq(P(u,vscale(p,a,v)),vscale(p,a,P(u,v))))return false;
    }
  }
  return true;
}
function bilinearForm(p,V,B){
  for(const u of V)for(const v of V)for(const w of V){
    if(mod(B(vadd(p,u,v),w),p)!==mod(B(u,w)+B(v,w),p))return false;
    if(mod(B(u,vadd(p,v,w)),p)!==mod(B(u,v)+B(u,w),p))return false;
    for(let a=0;a<p;a++){
      if(mod(B(vscale(p,a,u),w),p)!==mod(a*B(u,w),p))return false;
      if(mod(B(u,vscale(p,a,v)),p)!==mod(a*B(u,v),p))return false;
    }
  }
  return true;
}
function quadraticForm(p,V,B,Q){
  if(!bilinearForm(p,V,B))return false;
  for(const v of V){
    const q=Q(v); if(!Number.isInteger(q)||q<0||q>=p)return false;
    if(mod(q,p)!==mod(B(v,v),p))return false;
  }
  for(const u of V)for(const v of V)if(mod(B(u,v),p)!==mod(B(v,u),p))return false;
  const zero=Array(V[0].length).fill(0);
  for(const v of V){
    const annihilatesAll=V.every(w=>mod(B(v,w),p)===0);
    if(annihilatesAll&&!eq(v,zero))return false;
  }
  return true;
}
function associativeAlgebra(p,V,P,unit){
  if(!bilinearProduct(p,V,P)||!contains(V,unit))return false;
  for(const x of V){
    if(!eq(P(unit,x),x)||!eq(P(x,unit),x))return false;
  }
  for(const x of V)for(const y of V)for(const z of V){
    if(!eq(P(P(x,y),z),P(x,P(y,z))))return false;
  }
  return true;
}
function compositionAlgebra(p,V,P,unit,B,Q){
  if(!bilinearProduct(p,V,P)||!quadraticForm(p,V,B,Q)||!contains(V,unit))return false;
  for(const x of V){
    if(!eq(P(unit,x),x)||!eq(P(x,unit),x))return false;
  }
  for(const x of V)for(const y of V){
    if(mod(Q(P(x,y)),p)!==mod(Q(x)*Q(y),p))return false;
  }
  return true;
}
function associativeAntiInvolution(p,V,P,unit,K){
  if(!associativeAlgebra(p,V,P,unit)||!linearMap(p,V,V,K)||!eq(K(unit),unit))return false;
  for(const x of V){
    if(!eq(K(K(x)),x))return false;
    for(const y of V)if(!eq(K(P(x,y)),P(K(y),K(x))))return false;
  }
  return true;
}
function compositionAntiInvolution(p,V,P,unit,B,Q,K){
  if(!compositionAlgebra(p,V,P,unit,B,Q)||!linearMap(p,V,V,K)||!eq(K(unit),unit))return false;
  for(const x of V){
    if(!eq(K(K(x)),x)||mod(Q(K(x)),p)!==mod(Q(x),p))return false;
    for(const y of V)if(!eq(K(P(x,y)),P(K(y),K(x))))return false;
  }
  return true;
}

// 184003: bilinear product and one-sided adversarial failures.
const V3=vectors(3,2);
const coord=(u,v)=>[mod(u[0]*v[0],3),mod(u[1]*v[1],3)];
const badFirst=(u,v)=>[mod(u[0]*u[0]*v[0],3),0];
const badSecond=(u,v)=>[mod(u[0]*v[0]*v[0],3),0];
check(bilinearProduct(3,V3,coord),'184003 positive bilinear product rejected');
check(!bilinearProduct(3,V3,badFirst),'184003 nonlinear-first product accepted');
check(!bilinearProduct(3,V3,badSecond),'184003 nonlinear-second product accepted');

// 185001: associative matrix algebra vs a bilinear unital nonassociative control.
const M2=vectors(2,4);
const mmul=(A,B)=>[
  mod(A[0]*B[0]+A[1]*B[2],2),
  mod(A[0]*B[1]+A[1]*B[3],2),
  mod(A[2]*B[0]+A[3]*B[2],2),
  mod(A[2]*B[1]+A[3]*B[3],2)
];
const I2=[1,0,0,1];
check(associativeAlgebra(2,M2,mmul,I2),'185001 M2(F2) positive rejected');

const N=vectors(2,3), unitN=[1,0,0];
// basis 1,a,b: 1 is unit; a*a=0, a*b=a, b*a=b, b*b=0.
const table=[
  [[1,0,0],[0,1,0],[0,0,1]],
  [[0,1,0],[0,0,0],[0,1,0]],
  [[0,0,1],[0,0,1],[0,0,0]]
];
const nmul=(x,y)=>{
  let out=[0,0,0];
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(x[i]&&y[j])out=vadd(2,out,vscale(2,x[i]*y[j],table[i][j]));
  return out;
};
check(bilinearProduct(2,N,nmul),'nonassociative control is not bilinear');
check(!associativeAlgebra(2,N,nmul,unitN),'185001 accepted deliberate nonassociative algebra');

// 185002: symmetric nondegenerate B/Q vs degenerate, asymmetric, and diagonal-mismatch controls.
const dot=(u,v)=>mod(u.reduce((s,x,i)=>s+x*v[i],0),3);
const qdot=v=>dot(v,v);
const degB=(u,v)=>mod(u[0]*v[0],3),degQ=v=>degB(v,v);
const asymB=(u,v)=>mod(u[0]*v[0]+u[0]*v[1]+u[1]*v[1],3),asymQ=v=>asymB(v,v);
const wrongQ=v=>mod(qdot(v)+1,3);
check(quadraticForm(3,V3,dot,qdot),'185002 dot/Q positive rejected');
check(!quadraticForm(3,V3,degB,degQ),'185002 degenerate form accepted');
check(!quadraticForm(3,V3,asymB,asymQ),'185002 asymmetric form accepted');
check(!quadraticForm(3,V3,dot,wrongQ),'185002 Q diagonal mismatch accepted');

// 185003: F9-like complex algebra over F3 is a composition example.
// A dual-number product preserves bilinearity/unit but violates the chosen Q multiplicativity.
const cmul=(x,y)=>[
  mod(x[0]*y[0]-x[1]*y[1],3),
  mod(x[0]*y[1]+x[1]*y[0],3)
];
const dualMul=(x,y)=>[
  mod(x[0]*y[0],3),
  mod(x[0]*y[1]+x[1]*y[0],3)
];
const oneC=[1,0];
check(compositionAlgebra(3,V3,cmul,oneC,dot,qdot),'185003 composition positive rejected');
check(bilinearProduct(3,V3,dualMul),'composition negative product lost bilinearity');
check(!compositionAlgebra(3,V3,dualMul,oneC,dot,qdot),'185003 accepted nonmultiplicative-Q algebra');

// 188000: transpose on M2(F2) is an anti-involution; identity fails order reversal.
const trans=A=>[A[0],A[2],A[1],A[3]];
const id=A=>[...A];
check(associativeAntiInvolution(2,M2,mmul,I2,trans),'188000 transpose positive rejected');
check(!associativeAntiInvolution(2,M2,mmul,I2,id),'188000 identity KAPPA accepted on noncommutative algebra');

// 215001: conjugation on the F9-like composition algebra vs a bad linear involution.
const conj=x=>[x[0],mod(-x[1],3)];
const badK=x=>[mod(x[0]+x[1],3),mod(-x[1],3)];
check(compositionAntiInvolution(3,V3,cmul,oneC,dot,qdot,conj),'215001 conjugation positive rejected');
check(linearMap(3,V3,V3,badK)&&eq(badK(badK([2,1])),[2,1])&&eq(badK(oneC),oneC),'bad-K control does not meet linear/involution/unit preconditions');
check(!compositionAntiInvolution(3,V3,cmul,oneC,dot,qdot,badK),'215001 accepted product/norm-incompatible involution');

// Scope firewalls from the hypothesis itself.
const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['division property','positive definiteness','alternativity/Moufang','canonical conjugation uniqueness','triality/product-recovery/reflection','W/cross-track']){
  check(excluded.includes(term),'scope exclusion missing '+term);
}
check((IA.inference_profile?.prohibited_inferences||[]).includes('185003 -> associativity'),'IA associativity firewall missing');

const report={
  schema:'isograph.exp062-composition-algebra-g6-deterministic-qualification.v0.1',
  pass:errors.length===0,
  failures:errors,
  hypothesis_git_blob_sha:blobSha(hypPath),
  module_ssc_git_blob_sha:blobSha(sscPath),
  module_ia_git_blob_sha:blobSha(iaPath),
  field_vector_dependency_git_blob_sha:blobSha(fvPath),
  linear_basis_dependency_git_blob_sha:blobSha(lbPath),
  selected_relation_ids:[184003,185001,185002,185003,188000,215001],
  dependency_audit:dependencyAudit,
  checks:{
    ssc_obligations:S.obligations?.length,
    module_ia_fixed_point:IA.fixed_point,
    positive_bilinear_product_cases:1,
    adversarial_bilinear_product_cases:2,
    positive_associative_algebra_cases:1,
    nonassociative_bilinear_unit_controls:1,
    positive_quadratic_form_cases:1,
    adversarial_quadratic_form_cases:3,
    positive_composition_cases:1,
    adversarial_norm_multiplicativity_cases:1,
    positive_associative_antiinvolution_cases:1,
    adversarial_associative_antiinvolution_cases:1,
    positive_composition_antiinvolution_cases:1,
    adversarial_composition_antiinvolution_cases:1,
    composition_associativity_dependency_absent:!dependencyAudit[185003].includes(185001),
    unselected_relation_firewall:[184001,184002,184004,184005,184006,184007,184008,184009,185004,185005,185006,188001,188002]
  },
  external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
  disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exit(1);
