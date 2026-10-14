import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const hypPath='experiments/062/L_G5H_ORDERED_POSITIVITY_SPLIT_WITNESS_0_1.json';
const sscPath='experiments/062/L_G6_ORDERED_POSITIVITY_SPLIT_MODULE_SSC_0_1.json';
const iaPath='experiments/062/L_G6_ORDERED_POSITIVITY_SPLIT_MODULE_IA_FIXED_POINT_0_1.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const caPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),CA=json(caPath),By=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===20,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2,'IA fixed point');
check(IA.fixed_point?.admitted_implicit_assertions===7&&IA.fixed_point?.unresolved_ia_obligations===0,'IA obligations');
check(FV.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','field/vector dependency');
check(CA.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','composition dependency');
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
 216000:new Set([182003,216000]),
 216001:new Set([182001,182004,216000,216001]),
 216002:new Set([182001,182004,216000,216002])
};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations||[]){
 const block=defBlock(rel.source_path,rel.id);
 const fixed=[...new Set([...block.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b);
 dependencyAudit[rel.id]=fixed;
 for(const x of fixed)check(allowed[rel.id]?.has(x)===true,'hidden dependency '+rel.id+' -> '+x);
 for(const x of allowed[rel.id]||[])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);
}
check(JSON.stringify((H.exact_scoped_relations||[]).map(x=>x.id).sort((a,b)=>a-b))===JSON.stringify([216000,216001,216002]),'selected relations');
check(!(H.exact_scoped_relations||[]).some(x=>x.id===216003),'division relation leaked');

// Exact rational arithmetic for deterministic semantic controls.
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){const t=a%b;a=b;b=t;}return a||1n;};
function Q(n,d=1n){
 n=BigInt(n);d=BigInt(d);if(d===0n)throw new Error('zero denominator');if(d<0n){n=-n;d=-d;}
 const g=gcd(n,d);return {n:n/g,d:d/g};
}
const add=(a,b)=>Q(a.n*b.d+b.n*a.d,a.d*b.d);
const mul=(a,b)=>Q(a.n*b.n,a.d*b.d);
const neg=a=>Q(-a.n,a.d);
const eq=(a,b)=>a.n===b.n&&a.d===b.d;
const le=(a,b)=>a.n*b.d<=b.n*a.d;
const zero=Q(0),one=Q(1);
const samples=[Q(-2),Q(-1),Q(-1,2),Q(0),Q(1,2),Q(1),Q(2)];

function orderCheck(LE){
 if(!LE(zero,one))return false;
 for(const a of samples){
  if(!LE(a,a))return false;
  for(const b of samples){
   if(!(LE(a,b)||LE(b,a)))return false;
   if(LE(a,b)&&LE(b,a)&&!eq(a,b))return false;
   for(const c of samples){
    if(LE(a,b)&&LE(b,c)&&!LE(a,c))return false;
    if(LE(a,b)&&!LE(add(a,c),add(b,c)))return false;
   }
   if(LE(zero,a)&&LE(zero,b)&&!LE(zero,mul(a,b)))return false;
  }
 }
 return true;
}
const ltOnly=(a,b)=>a.n*b.d<b.n*a.d;
function key(a){
 const num=Number(a.n)/Number(a.d);
 if(eq(a,one))return 10;
 return num;
}
const badTranslate=(a,b)=>key(a)<=key(b);
check(orderCheck(le),'216000 rational order rejected');
check(!orderCheck(ltOnly),'216000 strict-order control accepted');
check(!orderCheck(badTranslate),'216000 translation-incompatible total order accepted');

const coords=[Q(-2),Q(-1),Q(0),Q(1),Q(2)];
const vectors=[];for(const x of coords)for(const y of coords)vectors.push([x,y]);
const vz=[zero,zero];
const qPos=([x,y])=>add(mul(x,x),mul(y,y));
const qDeg=([x,y])=>mul(x,x);
const qIndef=([x,y])=>add(mul(x,x),neg(mul(y,y)));
function posDefCheck(QF){
 if(!eq(QF(vz),zero))return false;
 for(const v of vectors){
  const q=QF(v);
  if(!le(zero,q))return false;
  if(eq(q,zero)&&!(eq(v[0],zero)&&eq(v[1],zero)))return false;
 }
 return true;
}
check(posDefCheck(qPos),'216001 positive Q rejected');
check(!posDefCheck(qDeg),'216001 degenerate Q accepted');
check(!posDefCheck(qIndef),'216001 indefinite Q accepted');

function negWitnessCheck(QF,v){
 const q=QF(v);
 return le(q,zero)&&!eq(q,zero);
}
check(negWitnessCheck(qIndef,[zero,one]),'216002 valid negative witness rejected');
check(!negWitnessCheck(qIndef,[one,one]),'216002 zero-norm witness accepted');
check(!negWitnessCheck(qPos,[one,zero]),'216002 positive witness accepted');

const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['division property','completeness/Archimedean/real-closed','named R/C/H/O','alternativity/Moufang','triality/reflection','W/cross-track']){
 check(excluded.includes(term),'scope exclusion '+term);
}
check((IA.inference_profile?.prohibited_inferences||[]).some(x=>/named split algebra/.test(x)),'named split firewall');
check((IA.inference_profile?.prohibited_inferences||[]).some(x=>/division property/.test(x)),'division firewall');

const report={
 schema:'isograph.exp062-ordered-positivity-split-g6-deterministic-qualification.v0.1',
 pass:errors.length===0,
 failures:errors,
 hypothesis_git_blob_sha:blob(hypPath),
 module_ssc_git_blob_sha:blob(sscPath),
 module_ia_git_blob_sha:blob(iaPath),
 field_vector_dependency_git_blob_sha:blob(fvPath),
 composition_dependency_git_blob_sha:blob(caPath),
 selected_relation_ids:[216000,216001,216002],
 dependency_audit:dependencyAudit,
 checks:{
  ssc_obligations:S.obligations?.length,
  module_ia_fixed_point:IA.fixed_point,
  rational_order_positive:1,
  strict_order_negative:1,
  translation_incompatible_total_order_negative:1,
  positive_definite_Q_positive:1,
  degenerate_Q_negative:1,
  indefinite_Q_negative:1,
  negative_norm_witness_positive:1,
  zero_norm_witness_negative:1,
  positive_norm_witness_negative:1,
  division_relation_excluded:true
 },
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exit(1);
