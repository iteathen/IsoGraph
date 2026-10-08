import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};

const hypPath='experiments/062/L127_G5H_METRIC_SKEW_ENDOMORPHISM_LIE_0_2.json';
const sscPath='experiments/062/L127_G6_METRIC_SKEW_LIE_MODULE_SSC_0_2.json';
const iaPath='experiments/062/L127_G6_METRIC_SKEW_LIE_MODULE_IA_FIXED_POINT_0_2.json';
const lbPath='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json';
const caPath='experiments/062/L_G6_COMPOSITION_ALGEBRA_PROVISIONAL_QUALIFICATION_0_1.json';
const actPath='experiments/062/L126_G6_TYPED_ACTION_REVERSE_Q_PROVISIONAL_QUALIFICATION_0_1.json';
const bypassPath='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hypPath),S=json(sscPath),IA=json(iaPath),LB=json(lbPath),CA=json(caPath),ACTQ=json(actPath),By=json(bypassPath);

check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis status');
check(S.obligations?.length===16,'SSC count');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.first_zero_change_iteration===2,'IA fixed point');
check(IA.fixed_point?.admitted_implicit_assertions===9&&IA.fixed_point?.unresolved_ia_obligations===0,'IA obligations');
for(const q of [LB,CA,ACTQ])check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','dependency status');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner bypass');

for(const rel of H.exact_scoped_relations||[]){check(fs.existsSync(rel.source_path),'missing source '+rel.source_path);if(fs.existsSync(rel.source_path))check(blob(rel.source_path)===rel.source_git_blob_sha,'source pin '+rel.id);}
function topBlocks(s){const out=[];let d=0,start=-1;for(let i=0;i<s.length;i++){if(s[i]==='['){if(d===0)start=i;d++;}else if(s[i]===']'){d--;if(d===0&&start>=0){out.push(s.slice(start,i+1));start=-1;}}}return out;}
function defBlock(path,id){const hits=topBlocks(read(path)).filter(b=>new RegExp('\\(\\^150005\\s+\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(b));if(hits.length!==1)throw new Error('definition block count '+id+'='+hits.length);return hits[0];}
const allowed={184004:new Set([184003,184004]),227000:new Set([183002,184004,185002,187200,227000])};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations||[]){const fixed=[...new Set([...defBlock(rel.source_path,rel.id).matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b);dependencyAudit[rel.id]=fixed;for(const x of fixed)check(allowed[rel.id].has(x),'hidden dependency '+rel.id+' -> '+x);for(const x of allowed[rel.id])check(fixed.includes(x),'expected dependency absent '+rel.id+' -> '+x);}

const p=3,mod=x=>((x%p)+p)%p,eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
function vectors(n){const out=[];function rec(a){if(a.length===n){out.push(a);return;}for(let x=0;x<p;x++)rec([...a,x]);}rec([]);return out;}
const add=(a,b)=>a.map((x,i)=>mod(x+b[i])),neg=a=>a.map(x=>mod(-x)),scale=(c,a)=>a.map(x=>mod(c*x));
function bilinearProduct(V,BR){
 for(const x of V)for(const y of V){const z=BR(x,y);if(!V.some(v=>eq(v,z)))return false;}
 for(const x1 of V)for(const x2 of V)for(const y of V){
  if(!eq(BR(add(x1,x2),y),add(BR(x1,y),BR(x2,y))))return false;
  if(!eq(BR(y,add(x1,x2)),add(BR(y,x1),BR(y,x2))))return false;
  for(let a=0;a<p;a++){
   if(!eq(BR(scale(a,x1),y),scale(a,BR(x1,y))))return false;
   if(!eq(BR(y,scale(a,x1)),scale(a,BR(y,x1))))return false;
  }
 }
 return true;
}
function lieCheck(V,BR){
 if(!bilinearProduct(V,BR))return false;
 const zero=Array(V[0].length).fill(0);
 for(const x of V)for(const y of V)if(!eq(BR(y,x),neg(BR(x,y))))return false;
 for(const x of V)for(const y of V)for(const z of V){
  const j=add(add(BR(x,BR(y,z)),BR(y,BR(z,x))),BR(z,BR(x,y)));
  if(!eq(j,zero))return false;
 }
 return true;
}
const L1=vectors(1);
const zero1=(a,b)=>[0];
const sym1=(a,b)=>[mod(a[0]*b[0])];
check(lieCheck(L1,zero1),'184004 zero bracket rejected');
check(!lieCheck(L1,sym1),'184004 symmetric bracket accepted');

const L3=vectors(3);
const basis3=[[1,0,0],[0,1,0],[0,0,1]];
const badTable=[
 [[0,0,0],[1,0,0],[0,0,0]],
 [[2,0,0],[0,0,0],[0,1,0]],
 [[0,0,0],[0,2,0],[0,0,0]]
];
const jacobiBad=(x,y)=>{
 let out=[0,0,0];
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(x[i]&&y[j])out=add(out,scale(mod(x[i]*y[j]),badTable[i][j]));
 return out;
};
check(bilinearProduct(L3,jacobiBad),'Jacobi negative not bilinear');
for(const x of L3)for(const y of L3)check(eq(jacobiBad(y,x),neg(jacobiBad(x,y))),'Jacobi negative not antisymmetric');
check(!lieCheck(L3,jacobiBad),'184004 Jacobi-violating bracket accepted');

const V=vectors(3),L=L3;
const mat=a=>[[0,a[0],a[1]],[mod(-a[0]),0,a[2]],[mod(-a[1]),mod(-a[2]),0]];
const mapply=(M,x)=>M.map(row=>mod(row.reduce((s,c,i)=>s+c*x[i],0)));
const mmul=(A,B)=>A.map((row,i)=>B[0].map((_,j)=>mod(row.reduce((s,x,k)=>s+x*B[k][j],0))));
const msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>mod(x-B[i][j])));
const meq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const comm=(A,B)=>msub(mmul(A,B),mmul(B,A));
const param=M=>[M[0][1],M[0][2],M[1][2]];
const BR=(a,b)=>param(comm(mat(a),mat(b)));
const B=(x,y)=>mod(x.reduce((s,a,i)=>s+a*y[i],0));
const action=(a,x)=>mapply(mat(a),x);

function actionBilinear(ACT){
 for(const a1 of L)for(const a2 of L)for(const x of V){
  if(!eq(ACT(add(a1,a2),x),add(ACT(a1,x),ACT(a2,x))))return false;
  for(let c=0;c<p;c++)if(!eq(ACT(scale(c,a1),x),scale(c,ACT(a1,x))))return false;
 }
 for(const a of L)for(const x1 of V)for(const x2 of V){
  if(!eq(ACT(a,add(x1,x2)),add(ACT(a,x1),ACT(a,x2))))return false;
  for(let c=0;c<p;c++)if(!eq(ACT(a,scale(c,x1)),scale(c,ACT(a,x1))))return false;
 }
 return true;
}
function isSkewMatrix(M){
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(mod(M[j][i]+M[i][j])!==0)return false;
 return true;
}
function allMatrices(){
 const out=[];for(let code=0;code<Math.pow(p,9);code++){let q=code,M=[[],[],[]];for(let k=0;k<9;k++){M[Math.floor(k/3)].push(q%p);q=Math.floor(q/p);}out.push(M);}return out;
}
const matrices=allMatrices();
const skew=matrices.filter(isSkewMatrix);
check(skew.length===27,'unexpected skew matrix count '+skew.length);

function fullCheck(ACT,BR0){
 if(!lieCheck(L,BR0)||!actionBilinear(ACT))return false;
 for(const a of L)for(const x of V)for(const y of V)if(mod(B(ACT(a,x),y)+B(x,ACT(a,y)))!==0)return false;
 for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){
  const same=V.every(x=>eq(ACT(L[i],x),ACT(L[j],x)));
  if(same)return false;
 }
 for(const M of skew){
  const represented=L.some(a=>V.every(x=>eq(ACT(a,x),mapply(M,x))));
  if(!represented)return false;
 }
 for(const a of L)for(const b of L){
  const c=BR0(a,b);
  for(const x of V){
   const rhs=add(ACT(a,ACT(b,x)),neg(ACT(b,ACT(a,x))));
   if(!eq(ACT(c,x),rhs))return false;
  }
 }
 return true;
}
check(fullCheck(action,BR),'227000 complete F3^3 skew model rejected');

const nonSkew=(a,x)=>{const M=mat(a).map(r=>[...r]);M[0][0]=a[0];return mapply(M,x);};
check(!fullCheck(nonSkew,BR),'227000 non-skew action accepted');

const nonfaithful=(a,x)=>action([a[0],a[1],0],x);
check(!fullCheck(nonfaithful,BR),'227000 nonfaithful action accepted');

const wrongBR=(a,b)=>[0,0,0];
check(lieCheck(L,wrongBR),'wrong commutator control not Lie');
check(!fullCheck(action,wrongBR),'227000 wrong commutator bracket accepted');

const excluded=(H.declared_scope?.excluded||[]).join('\n');
for(const term of ['dimension 28','so(8)','orthogonal group/Spin/Pin','exponential','irreducibility','octonion','W/cross-track'])check(excluded.includes(term),'scope exclusion '+term);

const report={
 schema:'isograph.exp062-l127-metric-skew-lie-g6-deterministic-qualification.v0.2',
 pass:errors.length===0,failures:errors,
 hypothesis_git_blob_sha:blob(hypPath),module_ssc_git_blob_sha:blob(sscPath),module_ia_git_blob_sha:blob(iaPath),linear_dependency_git_blob_sha:blob(lbPath),composition_dependency_git_blob_sha:blob(caPath),action_dependency_git_blob_sha:blob(actPath),
 selected_relation_ids:[184004,227000],dependency_audit:dependencyAudit,
 checks:{ssc_obligations:S.obligations?.length,module_ia_fixed_point:IA.fixed_point,zero_lie_positive:1,symmetric_bracket_negative:1,jacobi_negative:1,enumerated_matrices:matrices.length,metric_skew_matrices:skew.length,complete_metric_skew_model_positive:1,non_skew_negative:1,nonfaithful_negative:1,wrong_commutator_negative:1},
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',
 disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'
};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exit(1);