import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};

const hypPath='experiments/062/L127_G5H_FINITE_BASIS_7_28_0_2.json';
const sscPath='experiments/062/L127_G6_FINITE_BASIS_7_28_MODULE_SSC_0_2.json';
const iaPath='experiments/062/L127_G6_FINITE_BASIS_7_28_MODULE_IA_FIXED_POINT_0_2.json';
const fvPath='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hypPath),S=json(sscPath),IA=json(iaPath),FV=json(fvPath),By=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===10,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2,'IA fixed point');
check(IA.fixed_point?.admitted_implicit_assertions===7&&IA.fixed_point?.unresolved_ia_obligations===0,'IA obligations');
check(FV.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','field/vector dependency');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass');

for(const rel of H.exact_scoped_relations||[]){
 check(fs.existsSync(rel.source_path),'missing source '+rel.source_path);
 if(fs.existsSync(rel.source_path))check(blob(rel.source_path)===rel.source_git_blob_sha,'source pin '+rel.id);
}
function topBlocks(s){const out=[];let d=0,start=-1;for(let i=0;i<s.length;i++){if(s[i]==='['){if(d===0)start=i;d++;}else if(s[i]===']'){d--;if(d===0&&start>=0){out.push(s.slice(start,i+1));start=-1;}}}return out;}
function defBlock(path,id){const hits=topBlocks(read(path)).filter(b=>new RegExp('\\(\\^150005\\s+\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(b));if(hits.length!==1)throw new Error('definition block count '+id+'='+hits.length);return hits[0];}
const allowed={225010:new Set([182004,225010]),225001:new Set([182004,225001])};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations||[]){
 const fixed=[...new Set([...defBlock(rel.source_path,rel.id).matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b);
 dependencyAudit[rel.id]=fixed;
 for(const x of fixed)check(allowed[rel.id].has(x),'hidden dependency '+rel.id+' -> '+x);
 for(const x of allowed[rel.id])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);
}

const mod=(x,p)=>((x%p)+p)%p;
function inv3(x){x=mod(x,3);if(x===1)return 1;if(x===2)return 2;throw new Error('zero inverse');}
function rank3(rows){
 const A=rows.map(r=>r.map(x=>mod(x,3)));if(!A.length)return 0;
 const m=A.length,n=A[0].length;let r=0;
 for(let c=0;c<n&&r<m;c++){
   let p=r;while(p<m&&A[p][c]===0)p++;
   if(p===m)continue;
   [A[r],A[p]]=[A[p],A[r]];
   const inv=inv3(A[r][c]);A[r]=A[r].map(x=>mod(x*inv,3));
   for(let i=0;i<m;i++)if(i!==r&&A[i][c]!==0){
     const f=A[i][c];A[i]=A[i].map((x,j)=>mod(x-f*A[r][j],3));
   }
   r++;
 }
 return r;
}
const std=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const perm=n=>{const B=std(n);return B.map((_,i)=>B[(i*5)%n]);};
function basisCheck(n,B){
 if(B.length!==n||B.some(v=>!Array.isArray(v)||v.length!==n))return false;
 return rank3(B)===n;
}
for(const n of [7,28]){
 const S=std(n),P=perm(n);
 check(basisCheck(n,S),'standard basis rejected n='+n);
 check(basisCheck(n,P),'permuted basis rejected n='+n);
 const dup=S.map(v=>[...v]);dup[n-1]=[...dup[0]];
 check(!basisCheck(n,dup),'duplicate basis accepted n='+n);
 const zero=S.map(v=>[...v]);zero[n-1]=Array(n).fill(0);
 check(!basisCheck(n,zero),'zeroed basis accepted n='+n);
 const dep=S.map(v=>[...v]);dep[n-1]=S[0].map((x,i)=>mod(x+S[1][i],3));
 check(!basisCheck(n,dep),'rank-deficient basis accepted n='+n);
}

const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['dimension beyond','orthogonality','operator/Lie','named so(8)','W/cross-track'])check(excluded.includes(term),'scope exclusion '+term);

const report={
 schema:'isograph.exp062-l127-finite-basis-7-28-g6-deterministic-qualification.v0.2',
 pass:errors.length===0,failures:errors,
 hypothesis_git_blob_sha:blob(hypPath),module_ssc_git_blob_sha:blob(sscPath),module_ia_git_blob_sha:blob(iaPath),field_vector_dependency_git_blob_sha:blob(fvPath),
 selected_relation_ids:[225010,225001],dependency_audit:dependencyAudit,
 checks:{ssc_obligations:S.obligations?.length,module_ia_fixed_point:IA.fixed_point,positive_standard:2,positive_permuted:2,duplicate_negative:2,zero_negative:2,rank_deficient_negative:2},
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exit(1);