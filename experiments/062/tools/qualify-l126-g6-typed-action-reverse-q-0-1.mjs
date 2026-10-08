import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const hypPath='experiments/062/L126_G5H_TYPED_ACTION_REVERSE_Q_0_1.json';
const sscPath='experiments/062/L126_G6_TYPED_ACTION_REVERSE_Q_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L126_G6_TYPED_ACTION_REVERSE_Q_MODULE_IA_FIXED_POINT_0_1.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const lbPath='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const caPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';

const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),LB=json(lbPath),CA=json(caPath),By=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===16,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2,'IA fixed point');
check(IA.fixed_point?.admitted_implicit_assertions===8&&IA.fixed_point?.unresolved_ia_obligations===0,'IA obligations');
for(const q of [FV,LB,CA])check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','dependency not provisionally qualified');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass');
check(By.routing?.global_qualified_module_manifest_may_be_changed===false,'global manifest write allowed');

for(const rel of H.exact_scoped_relations||[]){
 check(fs.existsSync(rel.source_path),'missing source '+rel.source_path);
 if(fs.existsSync(rel.source_path))check(blob(rel.source_path)===rel.source_git_blob_sha,'source pin '+rel.id);
}
function topBlocks(s){
 const out=[];let depth=0,start=-1;
 for(let i=0;i<s.length;i++){
  if(s[i]==='['){if(depth===0)start=i;depth++;}
  else if(s[i]===']'){depth--;if(depth===0&&start>=0){out.push(s.slice(start,i+1));start=-1;}}
 }
 return out;
}
function defBlock(path,id){
 const hits=topBlocks(read(path)).filter(b=>new RegExp('\\(\\^150005\\s+\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(b));
 if(hits.length!==1)throw new Error('definition block count '+id+'='+hits.length);
 return hits[0];
}
const allowed={
 187200:new Set([182002,182004,187200]),
 195000:new Set([185002,187200,195000])
};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations||[]){
 const block=defBlock(rel.source_path,rel.id);
 const fixed=[...new Set([...block.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b);
 dependencyAudit[rel.id]=fixed;
 for(const x of fixed)check(allowed[rel.id]?.has(x)===true,'hidden dependency '+rel.id+' -> '+x);
 for(const x of allowed[rel.id]||[])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);
}
check(JSON.stringify((H.exact_scoped_relations||[]).map(x=>x.id).sort((a,b)=>a-b))===JSON.stringify([187200,195000]),'selected relations');

const mod=(x,p)=>((x%p)+p)%p;
const eq=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>x===b[i]);
function vectors(p,n){
 const out=[];function rec(a){if(a.length===n){out.push(a);return;}for(let x=0;x<p;x++)rec([...a,x]);}rec([]);return out;
}
const add=(p,a,b)=>a.map((x,i)=>mod(x+b[i],p));
const scale=(p,c,v)=>v.map(x=>mod(c*x,p));
const contains=(V,x)=>Array.isArray(x)&&V.some(v=>eq(v,x));

function bilinearAction(p,V,M,P,A){
 for(const v of V)for(const m of M){const y=A(v,m);if(!contains(P,y))return false;}
 for(const v1 of V)for(const v2 of V)for(const m of M){
  if(!eq(A(add(p,v1,v2),m),add(p,A(v1,m),A(v2,m))))return false;
  for(let a=0;a<p;a++)if(!eq(A(scale(p,a,v1),m),scale(p,a,A(v1,m))))return false;
 }
 for(const v of V)for(const m1 of M)for(const m2 of M){
  if(!eq(A(v,add(p,m1,m2)),add(p,A(v,m1),A(v,m2))))return false;
  for(let a=0;a<p;a++)if(!eq(A(v,scale(p,a,m1)),scale(p,a,A(v,m1))))return false;
 }
 return true;
}

const V2=vectors(3,2),M2=vectors(3,2),P2=vectors(3,2);
const goodA=(v,m)=>[mod(v[0]*m[0],3),mod(v[1]*m[1],3)];
const affineA=(v,m)=>[mod(v[0]*m[0]+1,3),mod(v[1]*m[1],3)];
const nonlinearV=(v,m)=>[mod(v[0]*v[0]*m[0],3),mod(v[1]*m[1],3)];
const nonlinearM=(v,m)=>[mod(v[0]*m[0]*m[0],3),mod(v[1]*m[1],3)];

check(bilinearAction(3,V2,M2,P2,goodA),'187200 positive bilinear action rejected');
check(!bilinearAction(3,V2,M2,P2,affineA),'187200 affine action accepted');
check(!bilinearAction(3,V2,M2,P2,nonlinearV),'187200 first-input nonlinear action accepted');
check(!bilinearAction(3,V2,M2,P2,nonlinearM),'187200 second-input nonlinear action accepted');

const V1=vectors(3,1),S1=vectors(3,1);
const Q=v=>mod(v[0]*v[0],3);
const GM=(v,m)=>[mod(v[0]*m[0],3)];
const GP=(v,p)=>[mod(v[0]*p[0],3)];
function pairCheck(V,SM,SP,gm,gp){
 if(!bilinearAction(3,V,SM,SP,gm)||!bilinearAction(3,V,SP,SM,gp))return false;
 for(const v of V){
  const q=Q(v);
  for(const m of SM)if(!eq(gp(v,gm(v,m)),scale(3,q,m)))return false;
  for(const p of SP)if(!eq(gm(v,gp(v,p)),scale(3,q,p)))return false;
 }
 return true;
}
check(pairCheck(V1,S1,S1,GM,GP),'195000 positive paired action rejected');

const GP2=(v,p)=>[mod(2*v[0]*p[0],3)];
check(bilinearAction(3,V1,S1,S1,GP2),'bad factor GP lost bilinearity');
check(!pairCheck(V1,S1,S1,GM,GP2),'195000 bad reverse factor accepted');

const SP2=vectors(3,2);
const GMembed=(v,m)=>[mod(v[0]*m[0],3),0];
const GPproj=(v,p)=>[mod(v[0]*p[0],3)];
check(bilinearAction(3,V1,S1,SP2,GMembed),'one-way GM not bilinear');
check(bilinearAction(3,V1,SP2,S1,GPproj),'one-way GP not bilinear');
let minusDirection=true,plusDirection=true;
for(const v of V1){
 const q=Q(v);
 for(const m of S1)if(!eq(GPproj(v,GMembed(v,m)),scale(3,q,m)))minusDirection=false;
 for(const p of SP2)if(!eq(GMembed(v,GPproj(v,p)),scale(3,q,p)))plusDirection=false;
}
check(minusDirection===true,'one-way negative did not preserve one direction');
check(plusDirection===false,'one-way negative unexpectedly preserved both directions');
check(!pairCheck(V1,S1,SP2,GMembed,GPproj),'195000 one-direction-only pair accepted');

const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['generic Clifford algebra','matrix representation','coefficient cyclic','Pin/Spin','irreducibility/chirality','triality/reflection','W/cross-track'])check(excluded.includes(term),'scope exclusion '+term);
check((IA.inference_profile?.prohibited_inferences||[]).some(x=>/named Clifford algebra/.test(x)),'named Clifford firewall');
check((IA.inference_profile?.prohibited_inferences||[]).some(x=>/coefficient cyclic identity/.test(x)),'cyclic firewall');

const report={
 schema:'isograph.exp062-l126-typed-action-reverse-q-g6-deterministic-qualification.v0.1',
 pass:errors.length===0,
 failures:errors,
 hypothesis_git_blob_sha:blob(hypPath),
 module_ssc_git_blob_sha:blob(sscPath),
 module_ia_git_blob_sha:blob(iaPath),
 field_vector_dependency_git_blob_sha:blob(fvPath),
 linear_basis_dependency_git_blob_sha:blob(lbPath),
 composition_dependency_git_blob_sha:blob(caPath),
 selected_relation_ids:[187200,195000],
 dependency_audit:dependencyAudit,
 checks:{
  ssc_obligations:S.obligations?.length,
  module_ia_fixed_point:IA.fixed_point,
  positive_bilinear_action:1,
  affine_action_negative:1,
  nonlinear_first_input_negative:1,
  nonlinear_second_input_negative:1,
  positive_reverse_Q_pair:1,
  reverse_factor_negative:1,
  one_direction_only_negative:1
 },
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exit(1);
