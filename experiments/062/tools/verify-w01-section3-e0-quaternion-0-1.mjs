import fs from 'node:fs';
import crypto from 'node:crypto';
const oraclePath='experiments/062/W01_G0_E0_SPATIAL_SOURCE_ORACLE_0_1.json';
const oracle=JSON.parse(fs.readFileSync(oraclePath,'utf8'));
const buf=fs.readFileSync(oraclePath);
const sha=crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+buf.length+'\0'),buf])).digest('hex');
const errors=[],check=(ok,m)=>{if(!ok)errors.push(m)};
check(sha==='c0c2864aaa6f4cb7d826540f8237706ce7a997d9','source oracle git pin');
check(oracle.source?.frozen_revision==='arXiv:2104.05099v2'&&oracle.source?.printed_page===6&&oracle.counts?.source_incidents===6,'source revision/count');
const claim=oracle.claims['W-SSC-003'];
check(claim?.length===4&&claim[0].source_predicate==='NONZERO_AND_IMAGINARY_TIME_DIRECTION','nonzero source e0 premise');
check(claim[2].source_latex==='e_0^{-1}x\\longmapsto g_R e_0^{-1}g_L^{-1}g_Lxg_R^{-1}=g_R e_0^{-1}xg_R^{-1}','printed source action');
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]];
const bar=a=>[a[0],-a[1],-a[2],-a[3]],eq=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]),norm=a=>a.reduce((n,x)=>n+x*x,0);
const units=[[1,0,0,0],[-1,0,0,0],[0,1,0,0],[0,-1,0,0],[0,0,1,0],[0,0,-1,0],[0,0,0,1],[0,0,0,-1]];
const chosenE0=[[1,0,0,0],[0,1,0,0],[1,1,0,0],[1,0,1,0],[1,0,0,1],[1,1,1,1]];
const xs=[-1,0,1].flatMap(a=>[-1,0,1].flatMap(b=>[-1,0,1].flatMap(c=>[-1,0,1].map(d=>[a,b,c,d]))));
let ordered=0,time=0,spatial=0;
for(const e of chosenE0){
 check(norm(e)>0,'e0 zero');
 for(const gL of units)for(const gR of units){
  const transformedE=mul(mul(gL,e),bar(gR));
  check(norm(e)===norm(transformedE),'unit Spin4 action norm');
  for(const x of xs){
   const lhs=mul(bar(transformedE),mul(mul(gL,x),bar(gR)));
   const rhs=mul(mul(mul(gR,bar(e)),x),bar(gR));
   ordered++;check(eq(lhs,rhs),'source ordered e0 inverse factor cancellation');
  }
  const length=norm(e);const inTime=mul(bar(transformedE),transformedE);
  time++;check(eq(inTime,[length,0,0,0]),'source along e0 invariant');
  for(const u of [[0,1,0,0],[0,0,1,0],[0,0,0,1]]){
   const x=mul(e,u),rel=mul(bar(transformedE),mul(mul(gL,x),bar(gR)));
   const expected=mul(mul(gR,u),bar(gR)).map(z=>z*length);
   spatial++;check(eq(rel,expected)&&rel[0]===0,'spatial SU2R conjugation and SU2L cancellation');
  }
 }
}
const wrong=[
['no right inverse',(e,x,gL,gR)=>mul(bar(mul(mul(gL,e),bar(gR))),mul(mul(gL,x),gR))],
['e0 held fixed',(e,x,gL,gR)=>mul(bar(e),mul(mul(gL,x),bar(gR)))],
['left factor instead of right',(e,x,gL,gR)=>mul(mul(mul(gL,bar(e)),x),bar(gL))],
['right factor not inverted',(e,x,gL,gR)=>mul(mul(mul(gR,bar(e)),x),gR)],
['swap left and right spin lifts',(e,x,gL,gR)=>mul(bar(mul(mul(gR,e),bar(gL))),mul(mul(gR,x),bar(gL))],
];
const negatives=[];
for(const [label,fn] of wrong){
 let witness=null;outer:for(const e of chosenE0)for(const x of xs.slice(0,24))for(const gL of units)for(const gR of units){
  const rhs=mul(mul(mul(gR,bar(e)),x),bar(gR));
  if(!eq(fn(e,x,gL,gR),rhs)){witness={e0:e,x,gL,gR};break outer;}
 }
 negatives.push({label,rejected:!!witness,witness});check(!!witness,'wrong transformation survived '+label);
}
check(ordered===31104&&time===384&&spatial===1152,'full finite case execution count');
check(negatives.length===5&&negatives.every(x=>x.rejected),'source finite falsifiers');
console.log(JSON.stringify({schema:'isograph.exp062-w01-section3-quaternion-exact-finite-source-verifier.v0.1',pass:errors.length===0,errors,source_revision:'arXiv:2104.05099v2',ordered_vector_cases:ordered,along_e0_cases:time,spatial_cases:spatial,wrong_action_controls:negatives,scope:'FINITE_QUATERNION_RECONSTRUCTION_NOT_UNIVERSAL_SU2_THEOREM_OR_G0_QUALIFICATION'},null,2));
if(errors.length)process.exitCode=1;