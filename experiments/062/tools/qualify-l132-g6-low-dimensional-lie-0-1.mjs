import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const hp='experiments/062/L132_G5H_LOW_DIMENSIONAL_LIE_PRESENTATIONS_0_1.json',sp='experiments/062/L132_G6_LOW_DIMENSIONAL_LIE_MODULE_SSC_0_1.json',ip='experiments/062/L132_G6_LOW_DIMENSIONAL_LIE_MODULE_IA_FIXED_POINT_0_1.json',mp='experiments/062/L127_G6_METRIC_SKEW_LIE_PROVISIONAL_QUALIFICATION_0_1.json',fp='experiments/062/L_G6_FIELD_VECTOR_PROVISIONAL_QUALIFICATION_0_1.json',lp='experiments/062/L_G6_LINEAR_BASIS_PROVISIONAL_QUALIFICATION_0_1.json',bp='experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json';
const H=json(hp),S=json(sp),IA=json(ip),M=json(mp),FV=json(fp),LB=json(lp),By=json(bp);
check(H.status==='HYPOTHESIS_CANDIDATE_G6_QUALIFICATION_REQUIRED','hypothesis');
check(S.obligations?.length===32,'SSC');
check(IA.fixed_point?.reached===true&&IA.fixed_point?.admitted_implicit_assertions===10&&IA.fixed_point?.unresolved_ia_obligations===0,'IA');
for(const q of [M,FV,LB])check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','dep status');
check(By.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','bypass');
function defBlock(path,id){
 const s=read(path),marker='(^150005 (^150010 '+id;
 const start=s.indexOf(marker);
 if(start<0)throw new Error('definition start missing '+id);
 let d=0;
 for(let i=start;i<s.length;i++){
  if(s[i]==='(')d++;
  else if(s[i]===')'){d--;if(d===0)return s.slice(start,i+1);}
 }
 throw new Error('definition expression unterminated '+id);
}
const allowed={
 184008:new Set([183002,184004,184008]),
 184009:new Set([184008,184009]),
 207000:new Set([182004,207000]),
 207001:new Set([184004,207000,207001]),
 236000:new Set([182004,236000]),
 236001:new Set([184004,236000,236001]),
 236002:new Set([184004,207000,236002]),
 236003:new Set([184004,184009,236003]),
 236004:new Set([184004,184009,236004])
};
const dependencyAudit={};
for(const rel of H.exact_scoped_relations){
 check(fs.existsSync(rel.source_path),'missing '+rel.source_path);if(fs.existsSync(rel.source_path))check(blob(rel.source_path)===rel.source_git_blob_sha,'pin '+rel.id);
 const b=defBlock(rel.source_path,rel.id);const calls=[...new Set([...b.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1])))].sort((a,b)=>a-b);dependencyAudit[rel.id]=calls;
 for(const x of calls)check(allowed[rel.id]?.has(x)===true,'hidden dep '+rel.id+' -> '+x);for(const x of allowed[rel.id]||[])check(calls.includes(x),'expected dep '+rel.id+' -> '+x);
}
const selected=H.exact_scoped_relations.map(x=>x.id).sort((a,b)=>a-b);check(JSON.stringify(selected)===JSON.stringify([184008,184009,207000,207001,236000,236001,236002,236003,236004]),'selected');

const p=5,mod=x=>((x%p)+p)%p,eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]),add=(a,b)=>a.map((x,i)=>mod(x+b[i])),scale=(c,a)=>a.map(x=>mod(c*x)),zero=n=>Array(n).fill(0);
function vecs(n){const out=[];function rec(a){if(a.length===n){out.push(a);return;}for(let x=0;x<p;x++)rec([...a,x]);}rec([]);return out;}
function basis(n){return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));}
function basisCheck(V,bs){
 const n=V[0].length;if(bs.length!==n)return false;
 for(const b of bs)if(!V.some(v=>eq(v,b)))return false;
 const coeff=vecs(bs.length);const seen=new Set();
 for(const cs of coeff){let s=zero(n);for(let i=0;i<bs.length;i++)s=add(s,scale(cs[i],bs[i]));seen.add(s.join(','));if(eq(s,zero(n))&&cs.some(c=>c!==0))return false;}
 return seen.size===V.length;
}
function bracketFromTable(n,table){
 return (x,y)=>{let out=zero(n);for(let i=0;i<n;i++)for(let j=0;j<n;j++){const c=mod(x[i]*y[j]);if(c){const t=table[i][j];out=add(out,scale(c,t));}}return out;};
}
function lieCheck(n,br){
 const E=basis(n),z=zero(n);
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){const a=br(E[i],E[j]),b=br(E[j],E[i]);if(!eq(add(a,b),z))return false;}
 for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){const jac=add(add(br(E[i],br(E[j],E[k])),br(E[j],br(E[k],E[i]))),br(E[k],br(E[i],E[j])));if(!eq(jac,z))return false;}
 return true;
}
const V1=vecs(1),V2=vecs(2),V3=vecs(3),E3=basis(3),Z1=(x,y)=>[0],Z2=(x,y)=>[0,0],Z3=(x,y)=>[0,0,0];
check(basisCheck(V3,E3),'207000 positive');check(!basisCheck(V3,[E3[0],E3[1],E3[1]]),'207000 dependent accepted');
check(basisCheck(V1,[[1]]),'236000 positive');check(!basisCheck(V1,[[0]]),'236000 zero basis accepted');
check(lieCheck(1,Z1),'236001 zero Lie parent');

const z3=zero(3),compact=Array.from({length:3},()=>Array.from({length:3},()=>[...z3]));
function setAnti(T,i,j,v){T[i][j]=v;T[j][i]=scale(-1,v);}
setAnti(compact,0,1,[0,0,2]);setAnti(compact,1,2,[2,0,0]);setAnti(compact,2,0,[0,2,0]);
const brCompact=bracketFromTable(3,compact);check(lieCheck(3,brCompact),'207001 compact not Lie');
check(eq(brCompact(E3[0],E3[1]),[0,0,2])&&eq(brCompact(E3[1],E3[2]),[2,0,0])&&eq(brCompact(E3[2],E3[0]),[0,2,0]),'207001 table');
const compactWrong=compact.map(r=>r.map(v=>[...v]));setAnti(compactWrong,0,1,[0,0,1]);const brCompactWrong=bracketFromTable(3,compactWrong);check(!(eq(brCompactWrong(E3[0],E3[1]),[0,0,2])&&eq(brCompactWrong(E3[1],E3[2]),[2,0,0])&&eq(brCompactWrong(E3[2],E3[0]),[0,2,0])),'wrong compact table passed exact rows');

const split=Array.from({length:3},()=>Array.from({length:3},()=>[...z3]));
setAnti(split,0,1,[0,2,0]);setAnti(split,0,2,[0,0,3]);setAnti(split,1,2,[1,0,0]);
const brSplit=bracketFromTable(3,split);check(lieCheck(3,brSplit),'236002 split not Lie');
check(eq(brSplit(E3[0],E3[1]),[0,2,0])&&eq(brSplit(E3[0],E3[2]),[0,0,3])&&eq(brSplit(E3[1],E3[2]),[1,0,0]),'236002 table');
const splitWrong=split.map(r=>r.map(v=>[...v]));setAnti(splitWrong,0,2,[0,0,2]);const brSplitWrong=bracketFromTable(3,splitWrong);check(!(eq(brSplitWrong(E3[0],E3[1]),[0,2,0])&&eq(brSplitWrong(E3[0],E3[2]),[0,0,3])&&eq(brSplitWrong(E3[1],E3[2]),[1,0,0])),'wrong split table passed');

function linearMap(A,B,F){const n=A[0].length,m=B[0].length;if(!eq(F(zero(n)),zero(m)))return false;for(const x of A)for(const y of A){if(!eq(F(add(x,y)),add(F(x),F(y))))return false;for(let c=0;c<p;c++)if(!eq(F(scale(c,x)),scale(c,F(x))))return false;}return true;}
function lieHom(A,B,brA,brB,F){if(!linearMap(A,B,F))return false;for(const x of A)for(const y of A)if(!eq(F(brA(x,y)),brB(F(x),F(y))))return false;return true;}
function injective(A,F){const s=new Set(A.map(x=>F(x).join(',')));return s.size===A.length;}
const incl=x=>[x[0],0],zeroMap=x=>[0,0];
check(lieHom(V1,V2,Z1,Z2,incl)&&injective(V1,incl),'184009 positive');
check(lieHom(V1,V2,Z1,Z2,zeroMap)&&!injective(V1,zeroMap),'184009 noninjective control');
const scale2=x=>scale(2,x);check(linearMap(V3,V3,scale2),'bracket-break map not linear');check(!lieHom(V3,V3,brCompact,brCompact,scale2),'184008 bracket-break accepted');

function sum2Check(brL,IA,IB){
 if(!lieHom(V1,V2,Z1,brL,IA)||!injective(V1,IA)||!lieHom(V1,V2,Z1,brL,IB)||!injective(V1,IB))return false;
 for(const l of V2){let count=0;for(const a of V1)for(const b of V1)if(eq(add(IA(a),IB(b)),l))count++;if(count!==1)return false;}
 for(const a of V1)for(const b of V1)if(!eq(brL(IA(a),IB(b)),[0,0]))return false;return true;
}
const injA2=x=>[x[0],0],injB2=x=>[0,x[0]],injBOverlap2=x=>[x[0],0];
check(sum2Check(Z2,injA2,injB2),'236003 positive');check(!sum2Check(Z2,injA2,injBOverlap2),'236003 overlap accepted');
const aff2Table=[[ [0,0],[0,1] ],[ [0,4],[0,0] ]],brAff2=bracketFromTable(2,aff2Table);check(lieCheck(2,brAff2),'aff2 not Lie');check(!sum2Check(brAff2,injA2,injB2),'236003 cross bracket accepted');

function sum3Check(brL,IA3,IB3,ID3){
 for(const F of [IA3,IB3,ID3])if(!lieHom(V1,V3,Z1,brL,F)||!injective(V1,F))return false;
 for(const l of V3){let count=0;for(const a of V1)for(const b of V1)for(const d of V1)if(eq(add(add(IA3(a),IB3(b)),ID3(d)),l))count++;if(count!==1)return false;}
 const Fs=[IA3,IB3,ID3];for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)for(const a of V1)for(const b of V1)if(!eq(brL(Fs[i](a),Fs[j](b)),[0,0,0]))return false;return true;
}
const I1=x=>[x[0],0,0],I2=x=>[0,x[0],0],I3=x=>[0,0,x[0]];
check(sum3Check(Z3,I1,I2,I3),'236004 positive');check(!sum3Check(Z3,I1,I2,I2),'236004 overlap accepted');
const aff3=Array.from({length:3},()=>Array.from({length:3},()=>[0,0,0]));setAnti(aff3,0,1,[0,1,0]);const brAff3=bracketFromTable(3,aff3);check(lieCheck(3,brAff3),'aff3 not Lie');check(!sum3Check(brAff3,I1,I2,I3),'236004 cross bracket accepted');

const excluded=H.declared_scope.excluded.join('\n');for(const t of ['su(2)','sl(2,R)','classification','group integration','arbitrary finite direct-sum','W/cross-track'])check(excluded.includes(t),'scope '+t);
const report={schema:'isograph.exp062-l132-low-dimensional-lie-g6-deterministic-qualification.v0.1',pass:errors.length===0,failures:errors,hypothesis_git_blob_sha:blob(hp),module_ssc_git_blob_sha:blob(sp),module_ia_git_blob_sha:blob(ip),metric_lie_dependency_git_blob_sha:blob(mp),field_vector_dependency_git_blob_sha:blob(fp),linear_dependency_git_blob_sha:blob(lp),selected_relation_ids:selected,dependency_audit:dependencyAudit,checks:{ssc_obligations:S.obligations?.length,module_ia_fixed_point:IA.fixed_point,basis3_positive:1,basis3_dependent_negative:1,basis1_positive:1,basis1_zero_negative:1,compact3_positive:1,compact_wrong_table_negative:1,split3_positive:1,split_wrong_table_negative:1,injective_lie_hom_positive:1,noninjective_hom_negative:1,bracket_breaking_linear_negative:1,direct_sum2_positive:1,direct_sum2_overlap_negative:1,direct_sum2_cross_bracket_negative:1,direct_sum3_positive:1,direct_sum3_overlap_negative:1,direct_sum3_cross_bracket_negative:1},external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED',disposition:errors.length===0?'PASS_INTERNAL_DETERMINISTIC_ELIGIBLE_FOR_CAMPAIGN_LOCAL_PROVISIONAL_PROMOTION_REVIEW':'FAIL_NOT_ELIGIBLE'};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exit(1);