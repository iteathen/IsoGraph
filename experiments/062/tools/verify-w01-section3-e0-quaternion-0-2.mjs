import fs from 'node:fs';
import crypto from 'node:crypto';
const p='experiments/062/W01_G0_E0_SPATIAL_SOURCE_ORACLE_0_1.json';
const oracle=JSON.parse(fs.readFileSync(p,'utf8'));
const buf=fs.readFileSync(p),git=crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+buf.length+'\0'),buf])).digest('hex');
const errors=[],check=(yes,msg)=>{if(!yes)errors.push(msg)};
check(git==='c0c2864aaa6f4cb7d826540f8237706ce7a997d9','original arXiv source oracle Git blob pin');
check(oracle.source?.frozen_revision==='arXiv:2104.05099v2'&&oracle.source?.printed_page===6&&oracle.counts?.source_incidents===6,'W01 revision/source counts');
const role=oracle.claims?.['W-SSC-003'];
check(role?.length===4&&role?.[0]?.source_predicate==='NONZERO_AND_IMAGINARY_TIME_DIRECTION','source nonzero e0 and temporal premise');
check(role?.[1]?.expression==='e_0^{-1} x'&&role?.[1]?.source_choice==='e_0 nonzero imaginary-time vector','source requires inverse, not conjugate');
check(role?.[2]?.source_latex==='e_0^{-1}x\\longmapsto g_R e_0^{-1}g_L^{-1}g_Lxg_R^{-1}=g_R e_0^{-1}xg_R^{-1}','exact ordered source transform');
const mul=(a,b)=>[
 a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],
 a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
 a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],
 a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]];
const bar=a=>[a[0],-a[1],-a[2],-a[3]];
const norm=a=>a.reduce((n,x)=>n+x*x,0);
const scale=(a,k)=>a.map(x=>x*k),eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
const rational=(e,x)=>{const den=norm(e);if(!(den>0))throw Error('NONZERO_E0_REQUIRED');return {num:mul(bar(e),x),den}};
const equalRat=(a,b)=>eq(scale(a.num,b.den),scale(b.num,a.den));
const equalInt=(a,integer)=>eq(a.num,scale(integer,a.den));
const unit=[1,0,0,0],spatialBasis=[[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const Q8=[[1,0,0,0],[-1,0,0,0],[0,1,0,0],[0,-1,0,0],[0,0,1,0],[0,0,-1,0],[0,0,0,1],[0,0,0,-1]];
const e0s=[[1,0,0,0],[0,1,0,0],[1,1,0,0],[1,0,1,0],[1,0,0,1],[1,1,1,1]];
const xs=[-1,0,1].flatMap(a=>[-1,0,1].flatMap(b=>[-1,0,1].flatMap(c=>[-1,0,1].map(d=>[a,b,c,d]))));
const byNorm={};let transforms=0,parallel=0,spatial=0,nonunit=0;
for(const e of e0s){const N=norm(e);byNorm[N]=(byNorm[N]||0)+1;
 for(const gL of Q8)for(const gR of Q8){
 const E=mul(mul(gL,e),bar(gR));
 check(norm(E)===N,'norm preserved under unit quaternion action');
 for(const x of xs){
 const X=mul(mul(gL,x),bar(gR)),left=rational(E,X),reference=rational(e,x);
 const right={num:mul(mul(gR,reference.num),bar(gR)),den:reference.den};
 check(equalRat(left,right),'e0 inverse relative Spin4 equivariance');
 if(N>1)nonunit++;
 transforms++;
 }
 const invariant=rational(E,E);check(equalInt(invariant,unit),'e0 inverse e0 is 1 for any nonzero e0');parallel++;
 for(const u of spatialBasis){
 const x=mul(e,u),X=mul(mul(gL,x),bar(gR)),got=rational(E,X);
 const expected=mul(mul(gR,u),bar(gR));
 check(equalInt(got,expected)&&expected[0]===0,'relative spatial x transforms under right factor only');
 spatial++;
 }
 }}
const e=[1,1,0,0],witness=rational(e,e),incorrectUnnormalized=mul(bar(e),e);
check(norm(e)===2&&equalInt(witness,unit)&&!eq(incorrectUnnormalized,unit)&&eq(incorrectUnnormalized,[2,0,0,0]),'non-unit distinguished e0: inverse != conjugation');
check(transforms===31104&&parallel===384&&spatial===1152&&nonunit===20736,'finite case counts and non-unit coverage');
// Mutants are evaluated against the exact rational expression, NOT a shared conjugate-only oracle.
const bad=[
 ['omit right inverse',(e,x,gL,gR)=>({num:mul(bar(mul(mul(gL,e),bar(gR))),mul(mul(gL,x),gR)),den:norm(e)})],
 ['hold e0 fixed',(e,x,gL,gR)=>({num:mul(bar(e),mul(mul(gL,x),bar(gR))),den:norm(e)})],
 ['replace right action with left',(e,x,gL,gR)=>({num:mul(mul(mul(gL,bar(e)),x),bar(gL)),den:norm(e)})],
 ['right final gR not inverted',(e,x,gL,gR)=>({num:mul(mul(mul(gR,bar(e)),x),gR),den:norm(e)})],
 ['swap left/right spin lifts',(e,x,gL,gR)=>({num:mul(bar(mul(mul(gR,e),bar(gL))),mul(mul(gR,x),bar(gL))),den:norm(e)})],
 ['omit e0 inverse norm denominator',(e,x,gL,gR)=>({num:mul(bar(mul(mul(gL,e),bar(gR))),mul(mul(gL,x),bar(gR))),den:1})],
 ['square e0 inverse norm denominator',(e,x,gL,gR)=>({num:mul(bar(mul(mul(gL,e),bar(gR))),mul(mul(gL,x),bar(gR))),den:norm(e)*norm(e)})]
];
const negatives=[];
for(const [label,fn] of bad){
 let witness=null;
 search:for(const e of e0s)for(const x of xs)for(const gL of Q8)for(const gR of Q8){
 const correctBase=rational(e,x),expected={num:mul(mul(gR,correctBase.num),bar(gR)),den:correctBase.den};
 const mutated=fn(e,x,gL,gR);
 if(!equalRat(mutated,expected)){witness={e0:e,x,gL,gR,expected,mutated};break search;}
 }
 negatives.push({label,rejected:witness!==null,witness});
 check(witness!==null,'wrong inverse/action mutant escaped '+label);
}
check(negatives.length===7&&negatives.every(x=>x.rejected),'seven independent negative actions');
const result={schema:'isograph.exp062-w01-section3-rational-inverse-reconstruction.v0.2',pass:errors.length===0,errors,source_revision:'arXiv:2104.05099v2',source_section:'§3 printed p6',e0_norms:byNorm,ordered_vector_cases:transforms,nonunit_relative_vector_cases:nonunit,relative_e0_direction_cases:parallel,spatial_role_cases:spatial,old_conjugate_only_witness:{e0:e,old_unscaled:incorrectUnnormalized,correct_num:witness.num,correct_den:witness.den,correct_value:unit},wrong_action_mutations_total:negatives.length,wrong_action_mutations_rejected:negatives.filter(x=>x.rejected).length,negatives,scope:'FINITE_EXACT_RATIONAL_QUATERNION_TEST_NOT_GLOBAL_SPIN4_THEOREM_OR_SOURCE_FREEZE'};
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;
