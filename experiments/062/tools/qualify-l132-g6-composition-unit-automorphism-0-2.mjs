import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};

const hp='experiments/062/L132_G5H_COMPOSITION_UNIT_AUTOMORPHISM_0_2.json';
const sp='experiments/062/L132_G6_COMPOSITION_UNIT_AUTOMORPHISM_MODULE_SSC_0_2.json';
const ip='experiments/062/L132_G6_COMPOSITION_UNIT_AUTOMORPHISM_MODULE_IA_FIXED_POINT_0_2.json';
const cp='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json';
const lp='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const bp='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hp),S=json(sp),IA=json(ip),CA=json(cp),LB=json(lp),By=json(bp);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis');
check(S.obligations?.length===7,'SSC');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2,'IA fixed point');
check(IA.fixed_point?.admitted_implicit_assertions===6&&IA.fixed_point?.unresolved_ia_obligations===0,'IA obligations');
check(CA.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','composition dep');
check(LB.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','linear dep');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','bypass');

const rel=H.exact_scoped_relations?.[0];
check(rel?.id===187701,'relation id');
check(fs.existsSync(rel.source_path),'schema missing');
if(fs.existsSync(rel.source_path))check(blob(rel.source_path)===rel.source_git_blob_sha,'schema pin');
function topBlocks(s){const out=[];let d=0,start=-1;for(let i=0;i<s.length;i++){if(s[i]==='['){if(d===0)start=i;d++;}else if(s[i]===']'){d--;if(d===0&&start>=0){out.push(s.slice(start,i+1));start=-1;}}}return out;}
const hits=topBlocks(read(rel.source_path)).filter(b=>/\(\^150005\s+\(\^150010\s+187701(?:\s|\))/.test(b));
check(hits.length===1,'definition block count');
const fixed=hits.length?[...new Set([...hits[0].matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b):[];
check(JSON.stringify(fixed)===JSON.stringify([183002,185003,187701]),'dependency surface');

const p=3,mod=x=>((x%p)+p)%p,eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
const V=[];for(let a=0;a<p;a++)for(let b=0;b<p;b++)V.push([a,b]);
const add=(x,y)=>[mod(x[0]+y[0]),mod(x[1]+y[1])];
const scale=(c,x)=>[mod(c*x[0]),mod(c*x[1])];
const mul=(x,y)=>[mod(x[0]*y[0]-x[1]*y[1]),mod(x[0]*y[1]+x[1]*y[0])];
const B=(x,y)=>mod(x[0]*y[0]+x[1]*y[1]);
const Q=x=>B(x,x),unit=[1,0],zero=[0,0];

function bilinearProduct(){
 for(const x of V)for(const y of V)for(const z of V){
  if(!eq(mul(add(x,y),z),add(mul(x,z),mul(y,z))))return false;
  if(!eq(mul(x,add(y,z)),add(mul(x,y),mul(x,z))))return false;
  for(let c=0;c<p;c++){
   if(!eq(mul(scale(c,x),z),scale(c,mul(x,z))))return false;
   if(!eq(mul(x,scale(c,y)),scale(c,mul(x,y))))return false;
  }
 }
 return true;
}
function compositionParent(){
 if(!bilinearProduct())return false;
 for(const x of V){if(!eq(mul(unit,x),x)||!eq(mul(x,unit),x))return false;}
 for(const x of V)for(const y of V)if(Q(mul(x,y))!==mod(Q(x)*Q(y)))return false;
 for(const x of V)for(const y of V)if(B(x,y)!==B(y,x))return false;
 for(const x of V){
  const annihilates=V.every(y=>B(x,y)===0);
  if(annihilates&&!eq(x,zero))return false;
 }
 return true;
}
check(compositionParent(),'positive model does not satisfy exact composition parent');

function linear(F){
 if(!eq(F(zero),zero))return false;
 for(const x of V)for(const y of V){
  if(!eq(F(add(x,y)),add(F(x),F(y))))return false;
  for(let c=0;c<p;c++)if(!eq(F(scale(c,x)),scale(c,F(x))))return false;
 }
 return true;
}
function bij(F){const out=V.map(F);return out.every(y=>V.some(v=>eq(v,y)))&&new Set(out.map(x=>x.join(','))).size===V.length;}
function props(F){
 const r={linear:linear(F),bijective:bij(F),unit:false,product:true,q:true};
 r.unit=r.linear&&r.bijective&&eq(F(unit),unit);
 if(r.linear&&r.bijective){
  for(const x of V){
   if(Q(F(x))!==Q(x))r.q=false;
   for(const y of V)if(!eq(F(mul(x,y)),mul(F(x),F(y))))r.product=false;
  }
 }else{r.product=false;r.q=false;}
 return r;
}
function auto(F){const r=props(F);return r.linear&&r.bijective&&r.unit&&r.product&&r.q;}

const id=x=>[...x];
const conj=x=>[x[0],mod(-x[1])];
const neg=x=>[mod(-x[0]),mod(-x[1])];
const shear=x=>[mod(x[0]+x[1]),x[1]];
const proj=x=>[x[0],0];

check(auto(id),'identity rejected');
check(auto(conj),'conjugation rejected');

const negP=props(neg);
check(negP.linear&&negP.bijective&&!negP.unit,'unit-moving control preconditions');
check(!auto(neg),'unit-moving negation accepted');

const shearP=props(shear);
check(shearP.linear&&shearP.bijective&&shearP.unit&&!shearP.product,'unit-fixing product-break control preconditions');
check(!auto(shear),'unit-fixing shear accepted');

const projP=props(proj);
check(projP.linear&&!projP.bijective,'projection precondition');
check(!auto(proj),'projection accepted');

const excluded=H.declared_scope?.excluded?.join('\n')||'';
for(const t of ['group closure','named Aut(D)','inner/outer','triality/rotation','W/cross-track'])check(excluded.includes(t),'scope '+t);

const report={
 schema:'isograph.exp062-l132-composition-unit-automorphism-g6-deterministic-qualification.v0.2',
 pass:errors.length===0,failures:errors,
 hypothesis_git_blob_sha:blob(hp),module_ssc_git_blob_sha:blob(sp),module_ia_git_blob_sha:blob(ip),
 composition_dependency_git_blob_sha:blob(cp),linear_dependency_git_blob_sha:blob(lp),
 selected_relation_ids:[187701],dependency_audit:{187701:fixed},
 checks:{
  ssc_obligations:S.obligations?.length,module_ia_fixed_point:IA.fixed_point,
  positive_parent_composition_model:1,
  positive_identity:1,positive_conjugation:1,
  unit_moving_negative:1,unit_fixing_product_negative:1,nonbijective_negative:1
 },
 adversarial_coverage_note:'Q preservation is exercised exhaustively on both positive automorphisms. In the chosen exact composition parent, algebra automorphisms preserve the represented composition norm, so no valid-parent map isolating only Q failure is asserted.',
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exit(1);