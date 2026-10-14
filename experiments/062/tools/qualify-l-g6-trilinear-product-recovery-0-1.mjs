import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const hypPath='experiments/062/L_G5H_TRILINEAR_PRODUCT_RECOVERY_0_1.json';
const sscPath='experiments/062/L_G6_TRILINEAR_RECOVERY_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L_G6_TRILINEAR_RECOVERY_MODULE_IA_FIXED_POINT_0_1.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const lbPath='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const compPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';

const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),LB=json(lbPath),CA=json(compPath),By=json(bypassPath);
check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===24,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2&&IA.fixed_point?.admitted_implicit_assertions===11&&IA.fixed_point?.unresolved_ia_obligations===0,'IA fixed point');
for(const [name,j] of [['field/vector',FV],['linear/basis',LB],['composition',CA]])check(j.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS',name+' dependency');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass inactive');
check(By.routing?.global_qualified_module_manifest_may_be_changed===false,'global manifest write allowed');

for(const rel of H.exact_scoped_relations||[]){
 check(fs.existsSync(rel.source_path),'missing source '+rel.source_path);
 if(fs.existsSync(rel.source_path))check(blobSha(rel.source_path)===rel.source_git_blob_sha,'source pin mismatch '+rel.id);
}
function topBlocks(s){const out=[];let d=0,start=-1;for(let i=0;i<s.length;i++){if(s[i]==='['){if(d===0)start=i;d++;}else if(s[i]===']'){d--;if(d===0&&start>=0){out.push(s.slice(start,i+1));start=-1;}}}return out;}
function definitionBlock(path,id){
 const hit=topBlocks(read(path)).filter(b=>new RegExp('\\(\\^150005\\s+\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(b));
 if(hit.length!==1)throw new Error('definition block count '+id+'='+hit.length);
 return hit[0];
}
const allowedCalls={
 185005:new Set([182004,185005]),
 185006:new Set([183002,185005,185006]),
 220000:new Set([185003,185005,220000])
};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations||[]){
 const block=definitionBlock(rel.source_path,rel.id);
 const fixed=[...new Set([...block.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b);
 dependencyAudit[rel.id]=fixed;
 for(const x of fixed)check(allowedCalls[rel.id]?.has(x)===true,'hidden dependency '+rel.id+' -> '+x);
 for(const x of allowedCalls[rel.id]||[])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);
}
check(JSON.stringify((H.exact_scoped_relations||[]).map(x=>x.id))===JSON.stringify([185005,185006,220000]),'selected relations changed');
check(!(H.exact_scoped_relations||[]).some(x=>x.id===220001||x.id===185004),'unselected relation leaked');

const mod=(n,p)=>((n%p)+p)%p;
const eq=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>x===b[i]);
function vectors(p,n){const out=[];function rec(a){if(a.length===n){out.push(a);return;}for(let x=0;x<p;x++)rec([...a,x]);}rec([]);return out;}
const add=(p,a,b)=>a.map((x,i)=>mod(x+b[i],p));
const scale=(p,c,a)=>a.map(x=>mod(c*x,p));
function linearMap(p,V,F){
 const z=Array(V[0].length).fill(0); if(!eq(F(z),z))return false;
 for(const u of V)for(const v of V){
  if(!eq(F(add(p,u,v)),add(p,F(u),F(v))))return false;
  for(let a=0;a<p;a++)if(!eq(F(scale(p,a,v)),scale(p,a,F(v))))return false;
 }
 return true;
}
function trilinear(p,V,T){
 const z=Array(V[0].length).fill(0);
 for(const x of V)for(const y of V)for(const w of V){
  const t=T(x,y,w); if(!Number.isInteger(t)||t<0||t>=p)return false;
 }
 for(const x1 of V)for(const x2 of V)for(const y of V)for(const z0 of V){
  if(mod(T(add(p,x1,x2),y,z0),p)!==mod(T(x1,y,z0)+T(x2,y,z0),p))return false;
 }
 for(const x of V)for(const y1 of V)for(const y2 of V)for(const z0 of V){
  if(mod(T(x,add(p,y1,y2),z0),p)!==mod(T(x,y1,z0)+T(x,y2,z0),p))return false;
 }
 for(const x of V)for(const y of V)for(const z1 of V)for(const z2 of V){
  if(mod(T(x,y,add(p,z1,z2)),p)!==mod(T(x,y,z1)+T(x,y,z2),p))return false;
 }
 for(let a=0;a<p;a++)for(const x of V)for(const y of V)for(const z0 of V){
  const t=T(x,y,z0);
  if(mod(T(scale(p,a,x),y,z0),p)!==mod(a*t,p))return false;
  if(mod(T(x,scale(p,a,y),z0),p)!==mod(a*t,p))return false;
  if(mod(T(x,y,scale(p,a,z0)),p)!==mod(a*t,p))return false;
 }
 return true;
}
function cyclicSchema(p,V,T,Rxy,Ryz,Rzx){
 if(!trilinear(p,V,T))return false;
 for(const R of [Rxy,Ryz,Rzx])if(!linearMap(p,V,R))return false;
 for(const x of V)if(!eq(Rzx(Ryz(Rxy(x))),x))return false;
 for(const y of V)if(!eq(Rxy(Rzx(Ryz(y))),y))return false;
 for(const z of V)if(!eq(Ryz(Rxy(Rzx(z))),z))return false;
 for(const x of V)for(const y of V)for(const z of V){
  if(mod(T(x,y,z),p)!==mod(T(Rzx(z),Rxy(x),Ryz(y)),p))return false;
 }
 return true;
}
function bilinearForm(p,V,B){
 for(const u of V)for(const v of V)for(const w of V){
  if(mod(B(add(p,u,v),w),p)!==mod(B(u,w)+B(v,w),p))return false;
  if(mod(B(u,add(p,v,w)),p)!==mod(B(u,v)+B(u,w),p))return false;
  for(let a=0;a<p;a++){
   if(mod(B(scale(p,a,u),w),p)!==mod(a*B(u,w),p))return false;
   if(mod(B(u,scale(p,a,v)),p)!==mod(a*B(u,v),p))return false;
  }
 }
 return true;
}
function nondegenerate(p,V,B){
 const zero=Array(V[0].length).fill(0);
 for(const v of V)if(V.every(w=>mod(B(v,w),p)===0)&&!eq(v,zero))return false;
 return true;
}
function recoveryContract(p,V,Prod,B,Q,unit,T){
 if(!trilinear(p,V,T)||!bilinearForm(p,V,B)||!nondegenerate(p,V,B))return false;
 for(const x of V)for(const y of V){
  const xy=Prod(x,y);
  if(!V.some(v=>eq(v,xy)))return false;
  if(mod(Q(xy),p)!==mod(Q(x)*Q(y),p))return false;
  if(!eq(Prod(unit,x),x)||!eq(Prod(x,unit),x))return false;
  for(const z of V)if(mod(T(x,y,z),p)!==mod(B(z,xy),p))return false;
  const rec=V.filter(h=>V.every(z=>mod(T(x,y,z),p)===mod(B(z,h),p)));
  if(rec.length!==1||!eq(rec[0],xy))return false;
 }
 return true;
}

// 185005 positive/negative.
const V2=vectors(3,2);
const T2=(x,y,z)=>mod(x[0]*y[0]*z[0]+x[1]*y[1]*z[1],3);
const Taff=(x,y,z)=>mod(T2(x,y,z)+x[0],3);
check(trilinear(3,V2,T2),'185005 positive trilinear rejected');
check(!trilinear(3,V2,Taff),'185005 affine/nontrilinear control accepted');

// 185006 positive order-three cycle and two independent negative controls.
const V3=vectors(3,3);
const rot=v=>[v[1],v[2],v[0]];
const id=v=>[...v];
const T3=(x,y,z)=>mod(x[0]*y[0]*z[0]+x[1]*y[1]*z[1]+x[2]*y[2]*z[2],3);
const Tw=(x,y,z)=>mod(x[0]*y[0]*z[0]+x[1]*y[1]*z[1]+2*x[2]*y[2]*z[2],3);
check(cyclicSchema(3,V3,T3,rot,rot,rot),'185006 order-three cycle positive rejected');
check(!cyclicSchema(3,V3,T3,rot,rot,id),'185006 broken round-trip accepted');
check(trilinear(3,V3,Tw),'weighted T negative is not trilinear');
check(!cyclicSchema(3,V3,Tw,rot,rot,rot),'185006 T-breaking role cycle accepted');

// 220000 positive composition/recovery and two negatives.
const cmul=(x,y)=>[mod(x[0]*y[0]-x[1]*y[1],3),mod(x[0]*y[1]+x[1]*y[0],3)];
const B=(x,y)=>mod(x[0]*y[0]+x[1]*y[1],3);
const Q=x=>B(x,x);
const one=[1,0];
const Tprod=(x,y,z)=>B(z,cmul(x,y));
const Tscaled=(x,y,z)=>mod(2*Tprod(x,y,z),3);
const Bdeg=(x,y)=>mod(x[0]*y[0],3);
const Qdeg=x=>Bdeg(x,x);
check(recoveryContract(3,V2,cmul,B,Q,one,Tprod),'220000 product recovery positive rejected');
check(trilinear(3,V2,Tscaled),'220000 scaled-T adversary is not trilinear');
check(!recoveryContract(3,V2,cmul,B,Q,one,Tscaled),'220000 mismatched trilinear T accepted');
check(!recoveryContract(3,V2,cmul,Bdeg,Qdeg,one,(x,y,z)=>Bdeg(z,cmul(x,y))),'220000 degenerate-pairing recovery accepted');

const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['triality group','generalized reflection','division/positivity/split','alternativity/Moufang','canonical conjugation','generation physics','W/cross-track'])check(excluded.includes(term),'scope exclusion missing '+term);
for(const forbidden of ['185006 -> triality group','185006 -> natural/domain identity of X,Y,Z','220000 -> division','220000 -> reflection semantics','any W/cross-track conclusion'])check((IA.inference_profile?.prohibited_inferences||[]).includes(forbidden),'IA firewall missing '+forbidden);

const report={
 schema:'isograph.exp062-trilinear-recovery-g6-deterministic-qualification.v0.1',
 pass:errors.length===0,
 failures:errors,
 hypothesis_git_blob_sha:blobSha(hypPath),
 module_ssc_git_blob_sha:blobSha(sscPath),
 module_ia_git_blob_sha:blobSha(iaPath),
 field_vector_dependency_git_blob_sha:blobSha(fvPath),
 linear_basis_dependency_git_blob_sha:blobSha(lbPath),
 composition_dependency_git_blob_sha:blobSha(compPath),
 selected_relation_ids:[185005,185006,220000],
 dependency_audit:dependencyAudit,
 checks:{
  ssc_obligations:S.obligations?.length,
  module_ia_fixed_point:IA.fixed_point,
  positive_trilinear_cases:1,
  adversarial_nontrilinear_cases:1,
  positive_cyclic_transport_cases:1,
  adversarial_roundtrip_cases:1,
  adversarial_T_preservation_cases:1,
  positive_product_recovery_cases:1,
  adversarial_mismatched_T_cases:1,
  adversarial_degenerate_pairing_cases:1,
  unselected_relation_firewall:[185004,220001]
 },
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exit(1);
