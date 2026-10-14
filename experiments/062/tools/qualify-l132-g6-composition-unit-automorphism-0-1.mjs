import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const hp='experiments/062/L132_G5H_COMPOSITION_UNIT_AUTOMORPHISM_0_1.json',sp='experiments/062/L132_G6_COMPOSITION_UNIT_AUTOMORPHISM_MODULE_SSC_0_1.json',ip='experiments/062/L132_G6_COMPOSITION_UNIT_AUTOMORPHISM_MODULE_IA_FIXED_POINT_0_1.json',cp='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json',lp='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json',bp='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hp),S=json(sp),IA=json(ip),CA=json(cp),LB=json(lp),By=json(bp);
check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis');
check(S.obligations?.length===7,'SSC');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.admitted_implicit_assertions===6&&IA.fixed_point?.unresolved_ia_obligations===0,'IA');
check(CA.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','composition dep');
check(LB.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','linear dep');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','bypass');
const rel=H.exact_scoped_relations[0];check(fs.existsSync(rel.source_path),'schema missing');if(fs.existsSync(rel.source_path))check(blob(rel.source_path)===rel.source_git_blob_sha,'schema pin');
const txt=read(rel.source_path);const blocks=[];let d=0,st=-1;for(let i=0;i<txt.length;i++){if(txt[i]==='['){if(d===0)st=i;d++;}else if(txt[i]===']'){d--;if(d===0&&st>=0){blocks.push(txt.slice(st,i+1));st=-1;}}}
const hit=blocks.filter(b=>/\(\^150005\s+\(\^150010\s+187701(?:\s|\))/.test(b));check(hit.length===1,'187701 block');
const calls=hit.length?[...new Set([...hit[0].matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b):[];
check(JSON.stringify(calls)===JSON.stringify([183002,185003,187701]),'dependency surface');
const mod=(x,p)=>((x%p)+p)%p,eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
const V=[];for(let a=0;a<3;a++)for(let b=0;b<3;b++)V.push([a,b]);
const add=(x,y)=>[mod(x[0]+y[0],3),mod(x[1]+y[1],3)],scale=(c,x)=>[mod(c*x[0],3),mod(c*x[1],3)];
const mul=(x,y)=>[mod(x[0]*y[0]-x[1]*y[1],3),mod(x[0]*y[1]+x[1]*y[0],3)];
const Q=x=>mod(x[0]*x[0]+x[1]*x[1],3),unit=[1,0];
function linear(F){for(const x of V)for(const y of V){if(!eq(F(add(x,y)),add(F(x),F(y))))return false;for(let c=0;c<3;c++)if(!eq(F(scale(c,x)),scale(c,F(x))))return false;}return true;}
function bij(F){const out=V.map(F);return out.every(y=>V.some(v=>eq(v,y)))&&new Set(out.map(x=>x.join(','))).size===V.length;}
function auto(F){if(!linear(F)||!bij(F)||!eq(F(unit),unit))return false;for(const x of V){if(Q(F(x))!==Q(x))return false;for(const y of V)if(!eq(F(mul(x,y)),mul(F(x),F(y))))return false;}return true;}
const id=x=>[...x],conj=x=>[x[0],mod(-x[1],3)],neg=x=>[mod(-x[0],3),mod(-x[1],3)],shear=x=>[mod(x[0]+x[1],3),x[1]],proj=x=>[x[0],0];
check(auto(id),'identity rejected');check(auto(conj),'conjugation rejected');
check(!auto(neg),'unit-moving negation accepted');
check(linear(shear)&&bij(shear)&&eq(shear(unit),unit),'shear preconditions');check(!auto(shear),'unit-fixing shear accepted');
check(linear(proj)&&!bij(proj),'projection precondition');check(!auto(proj),'projection accepted');
const excluded=H.declared_scope.excluded.join('\n');for(const t of ['group closure','named Aut(D)','inner/outer','triality/rotation','W/cross-track'])check(excluded.includes(t),'scope '+t);
const report={schema:'isograph.exp062-l132-composition-unit-automorphism-g6-deterministic-qualification.v0.1',pass:errors.length===0,failures:errors,hypothesis_git_blob_sha:blob(hp),module_ssc_git_blob_sha:blob(sp),module_ia_git_blob_sha:blob(ip),composition_dependency_git_blob_sha:blob(cp),linear_dependency_git_blob_sha:blob(lp),selected_relation_ids:[187701],dependency_audit:{187701:calls},checks:{ssc_obligations:S.obligations?.length,module_ia_fixed_point:IA.fixed_point,positive_identity:1,positive_conjugation:1,unit_moving_negative:1,unit_fixing_product_negative:1,nonbijective_negative:1},external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exit(1);