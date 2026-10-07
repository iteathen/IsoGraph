import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const hypPath='experiments/062/L_G5H_LINEAR_BASIS_SUPPORT_0_1.json';
const sscPath='experiments/062/L_G6_LINEAR_BASIS_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L_G6_LINEAR_BASIS_MODULE_IA_FIXED_POINT_0_1.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),B=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===24,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2&&IA.fixed_point?.admitted_implicit_assertions===12,'IA fixed point');
check(FV.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','field/vector dependency not qualified');
check(B.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','bypass inactive');
check(B.routing?.global_qualified_module_manifest_may_be_changed===false,'global manifest write allowed');

for(const rel of H.exact_scoped_relations){
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
 const hit=blocks.filter(b=>new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(b));
 if(hit.length!==1)throw new Error('definition block count '+id+'='+hit.length);
 return hit[0];
}
const allowedCalls={
 183002:new Set([183002,182004,182001]),
 183003:new Set([183003,182004,182002]),
 188100:new Set([188100,182001]),
 193200:new Set([193200,183002,188100]),
 187600:new Set([187600,182004]),
 187601:new Set([187601,182004]),
 215000:new Set([215000,182004])
};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations){
 const block=definitionBlock(rel.source_path,rel.id);
 const calls=[...block.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1]));
 const fixed=[...new Set(calls)].sort((a,b)=>a-b);
 dependencyAudit[rel.id]=fixed;
 for(const x of fixed)check(allowedCalls[rel.id].has(x),'hidden dependency '+rel.id+' -> '+x);
 for(const x of allowedCalls[rel.id])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);
}
const selected=new Set(H.exact_scoped_relations.map(x=>x.id));
for(const forbidden of [183001,183004,183005,183006,188101])check(!selected.has(forbidden),'unselected relation leaked '+forbidden);

function mod(n,p){return ((n%p)+p)%p;}
const eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
function vectors(p,n){
 const out=[];function rec(a){if(a.length===n){out.push(a);return;}for(let x=0;x<p;x++)rec([...a,x]);}rec([]);return out;
}
function vadd(p,a,b){return a.map((x,i)=>mod(x+b[i],p));}
function scale(p,c,v){return v.map(x=>mod(c*x,p));}
function linear(p,A,B,F){
 const zA=Array(A[0].length).fill(0),zB=Array(B[0].length).fill(0);
 if(!eq(F(zA),zB))return false;
 for(const u of A)for(const v of A){
  if(!eq(F(vadd(p,u,v)),vadd(p,F(u),F(v))))return false;
  for(let a=0;a<p;a++)if(!eq(F(scale(p,a,v)),scale(p,a,F(v))))return false;
 }
 return true;
}
function bijection(A,B,F){
 const images=A.map(F);
 if(images.some(y=>!B.some(b=>eq(b,y))))return false;
 for(let i=0;i<images.length;i++)for(let j=i+1;j<images.length;j++)if(eq(images[i],images[j]))return false;
 return B.every(y=>images.some(x=>eq(x,y)));
}
function bilinear(p,V,Bf){
 for(const u of V)for(const v of V)for(const w of V){
  if(mod(Bf(vadd(p,u,v),w),p)!==mod(Bf(u,w)+Bf(v,w),p))return false;
  if(mod(Bf(u,vadd(p,v,w)),p)!==mod(Bf(u,v)+Bf(u,w),p))return false;
  for(let a=0;a<p;a++){
   if(mod(Bf(scale(p,a,u),w),p)!==mod(a*Bf(u,w),p))return false;
   if(mod(Bf(u,scale(p,a,v)),p)!==mod(a*Bf(u,v),p))return false;
  }
 }
 return true;
}
function span(p,basis){
 const coeffs=vectors(p,basis.length);
 return coeffs.map(cs=>basis.reduce((acc,b,i)=>vadd(p,acc,scale(p,cs[i],b)),Array(basis[0].length).fill(0)));
}
function basisCheck(p,V,basis){
 if(basis.some(b=>!V.some(v=>eq(v,b))))return false;
 const coeffs=vectors(p,basis.length);
 for(const cs of coeffs){
  const s=basis.reduce((acc,b,i)=>vadd(p,acc,scale(p,cs[i],b)),Array(V[0].length).fill(0));
  if(eq(s,Array(V[0].length).fill(0))&&cs.some(c=>c!==0))return false;
 }
 const S=span(p,basis);
 return V.every(v=>S.some(s=>eq(s,v)));
}

const V= vectors(3,2);
const identity=v=>[...v];
const shear=v=>[mod(v[0]+v[1],3),v[1]];
const zero=v=>[0,0];
const translate=v=>[mod(v[0]+1,3),v[1]];
check(linear(3,V,V,identity),'identity not linear');
check(bijection(V,V,identity),'identity not bijection');
check(linear(3,V,V,shear)&&bijection(V,V,shear),'invertible shear failed');
check(linear(3,V,V,zero)&&!bijection(V,V,zero),'zero-map control failed');
check(!linear(3,V,V,translate)&&bijection(V,V,translate),'nonlinear-bijection control failed');
check((linear(3,V,V,shear)&&bijection(V,V,shear))===true,'linear-bijection conjunction positive');
check((linear(3,V,V,zero)&&bijection(V,V,zero))===false,'linear-bijection conjunction negative');

const dot=(u,v)=>mod(u.reduce((s,x,i)=>s+x*v[i],0),3);
const shifted=(u,v)=>mod(dot(u,v)+1,3);
check(bilinear(3,V,dot),'dot form rejected');
check(!bilinear(3,V,shifted),'affine-shifted form accepted');

for(const n of [2,4,8]){
 const VV=vectors(2,n);
 const std=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
 check(basisCheck(2,VV,std),'standard basis rejected n='+n);
 const dep=std.map(x=>[...x]);dep[n-1]=[...dep[0]];
 check(!basisCheck(2,VV,dep),'dependent tuple accepted n='+n);
 const larger=vectors(2,n+1);
 const nonspan=std.map(row=>[...row,0]);
 check(!basisCheck(2,larger,nonspan),'nonspanning tuple accepted n='+n);
}

const report={
 schema:'isograph.exp062-linear-basis-g6-deterministic-qualification.v0.1',
 pass:errors.length===0,
 failures:errors,
 hypothesis_git_blob_sha:blobSha(hypPath),
 module_ssc_git_blob_sha:blobSha(sscPath),
 module_ia_git_blob_sha:blobSha(iaPath),
 field_vector_dependency_git_blob_sha:blobSha(fvPath),
 selected_relation_ids:[183002,183003,188100,193200,187600,187601,215000],
 dependency_audit:dependencyAudit,
 checks:{
  ssc_obligations:S.obligations?.length,
  module_ia_fixed_point:IA.fixed_point,
  positive_linear_cases:2,
  adversarial_linear_cases:2,
  positive_bijection_cases:2,
  adversarial_bijection_cases:1,
  positive_linear_bijection_cases:1,
  adversarial_linear_bijection_cases:1,
  positive_bilinear_cases:1,
  adversarial_bilinear_cases:1,
  positive_basis_cases:3,
  dependent_basis_cases:3,
  nonspanning_basis_cases:3,
  unselected_relation_firewall:[183001,183004,183005,183006,188101]
 },
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exit(1);
