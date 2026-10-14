import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};

const hypPath='experiments/062/L127_G5H_QUATERNION_PRESENTATION_0_2.json';
const sscPath='experiments/062/L127_G6_QUATERNION_PRESENTATION_MODULE_SSC_0_2.json';
const iaPath='experiments/062/L127_G6_QUATERNION_PRESENTATION_MODULE_IA_FIXED_POINT_0_2.json';
const lbPath='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const caPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hypPath),S=json(sscPath),IA=json(iaPath),LB=json(lbPath),CA=json(caPath),By=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===11,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2,'IA fixed point');
check(IA.fixed_point?.admitted_implicit_assertions===5&&IA.fixed_point?.unresolved_ia_obligations===0,'IA obligations');
check(LB.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','linear/basis dependency');
check(CA.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','composition dependency');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass');

const rel=H.exact_scoped_relations?.[0];
check(rel?.id===193100,'relation id');
check(fs.existsSync(rel.source_path),'source missing');
if(fs.existsSync(rel.source_path))check(blob(rel.source_path)===rel.source_git_blob_sha,'source pin');
function topBlocks(s){const out=[];let d=0,start=-1;for(let i=0;i<s.length;i++){if(s[i]==='['){if(d===0)start=i;d++;}else if(s[i]===']'){d--;if(d===0&&start>=0){out.push(s.slice(start,i+1));start=-1;}}}return out;}
const hits=topBlocks(read(rel.source_path)).filter(b=>/\(\^150005\s+\(\^150010\s+193100(?:\s|\))/.test(b));
check(hits.length===1,'definition block count');
const fixed=hits.length?[...new Set([...hits[0].matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b):[];
const allowed=new Set([185001,187601,188000,193100]);
for(const x of fixed)check(allowed.has(x),'hidden dependency '+x);
for(const x of allowed)check(fixed.includes(x),'expected dependency absent '+x);

const mod=(x,p)=>((x%p)+p)%p;
function rank(rows,p){
 const A=rows.map(r=>r.map(x=>mod(x,p)));let r=0,n=A[0]?.length||0;
 const inv=x=>{for(let y=1;y<p;y++)if(mod(x*y,p)===1)return y;throw new Error('no inverse');};
 for(let c=0;c<n&&r<A.length;c++){let q=r;while(q<A.length&&A[q][c]===0)q++;if(q===A.length)continue;[A[r],A[q]]=[A[q],A[r]];const iv=inv(A[r][c]);A[r]=A[r].map(x=>mod(x*iv,p));for(let i=0;i<A.length;i++)if(i!==r&&A[i][c]){const f=A[i][c];A[i]=A[i].map((x,j)=>mod(x-f*A[r][j],p));}r++;}return r;
}
const expected=[
 [[1,0],[1,1],[1,2],[1,3]],
 [[1,1],[-1,0],[1,3],[-1,2]],
 [[1,2],[-1,3],[-1,0],[1,1]],
 [[1,3],[1,2],[-1,1],[-1,0]]
];
const std=()=>Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
const eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
function makeProd(p,T){
 return (x,y)=>{
  const out=[0,0,0,0];
  for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(x[i]&&y[j]){
   const [sg,k]=T[i][j];out[k]=mod(out[k]+sg*x[i]*y[j],p);
  }
  return out;
 };
}
function presentationCheck(p,basis,T,K){
 if(mod(2,p)===0)return false;
 if(rank(basis,p)!==4)return false;
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(T[i][j][0]!==expected[i][j][0]||T[i][j][1]!==expected[i][j][1])return false;
 const P=makeProd(p,T),e=std();
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)if(!eq(P(P(e[i],e[j]),e[k]),P(e[i],P(e[j],e[k]))))return false;
 const neg=v=>v.map(x=>mod(-x,p));
 const expectedK=[e[0],neg(e[1]),neg(e[2]),neg(e[3])];
 for(let i=0;i<4;i++)if(!eq(K(e[i]),expectedK[i]))return false;
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(!eq(K(P(e[i],e[j])),P(K(e[j]),K(e[i]))))return false;
 for(let i=0;i<4;i++)if(!eq(K(K(e[i])),e[i]))return false;
 return true;
}
const K3=v=>[v[0],mod(-v[1],3),mod(-v[2],3),mod(-v[3],3)];
check(presentationCheck(3,std(),expected.map(r=>r.map(x=>[...x])),K3),'F3 quaternion presentation rejected');

const wrongSign=expected.map(r=>r.map(x=>[...x]));wrongSign[2][1]=[1,3];
check(!presentationCheck(3,std(),wrongSign,K3),'wrong JI sign accepted');

const wrongK=v=>[v[0],v[1],mod(-v[2],3),mod(-v[3],3)];
check(!presentationCheck(3,std(),expected.map(r=>r.map(x=>[...x])),wrongK),'wrong KAPPA(I) accepted');

const K2=v=>[...v];
check(!presentationCheck(2,std(),expected.map(r=>r.map(x=>[...x])),K2),'characteristic-two presentation accepted');

const dup=std();dup[3]=[...dup[2]];
check(!presentationCheck(3,dup,expected.map(r=>r.map(x=>[...x])),K3),'dependent basis accepted');

const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['division property','positive definiteness/norm','classification theorem','octonion','so(8)/operator','W/cross-track'])check(excluded.includes(term),'scope exclusion '+term);

const report={
 schema:'isograph.exp062-l127-quaternion-presentation-g6-deterministic-qualification.v0.2',
 pass:errors.length===0,failures:errors,
 hypothesis_git_blob_sha:blob(hypPath),module_ssc_git_blob_sha:blob(sscPath),module_ia_git_blob_sha:blob(iaPath),linear_basis_dependency_git_blob_sha:blob(lbPath),composition_dependency_git_blob_sha:blob(caPath),
 selected_relation_ids:[193100],dependency_audit:fixed,
 checks:{ssc_obligations:S.obligations?.length,module_ia_fixed_point:IA.fixed_point,positive_F3:1,wrong_reversed_sign_negative:1,wrong_kappa_negative:1,characteristic_two_negative:1,dependent_basis_negative:1},
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exit(1);