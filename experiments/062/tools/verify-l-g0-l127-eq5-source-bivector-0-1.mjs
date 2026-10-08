import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const paths={
source:dir+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
predecessor:dir+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_1.json',
sourceAudit:dir+'LISI_L05_OCTONION_TABLE_SOURCE_DISCREPANCY_0_1.json',
defect:exp+'L127_EQ5_SOURCE_BIVECTOR_REVERSE_INDEX_DEFECT_0_1.json',
ssc:dir+'SOURCE_SEMANTIC_CENSUS_0_10.json',gate:exp+'L_CURRENT_STAGE_GATE_0_10.json'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const copy=x=>JSON.parse(JSON.stringify(x)), j=x=>JSON.stringify(x);
const data=load(paths.defect),source=load(paths.source),prior=load(paths.predecessor),audit=load(paths.sourceAudit),ssc=load(paths.ssc),gate=load(paths.gate);
const expectedCarriers=['C','C_split','H','H_split','O','O_split'];
function scan(t){
 const n=t.dimension,one=i=>Array.from({length:n},(_,k)=>+(k===i)),tilde=x=>x.map((v,i)=>i? -v:v);
 function mul(x,y){
  const z=Array(n).fill(0);
  for(let i=0;i<n;i++)for(let k=0;k<n;k++)for(let m=0;m<n;m++){
   const entry=t.entries[k][m];
   if(!/^-?e[0-7]$/.test(entry))throw Error('invalid source cell '+entry);
   const col=Number(entry.replace(/^-?e/,''));
   if(col>=n)throw Error('basis target outside carrier');
   z[col]+=x[k]*y[m]*(entry.startsWith('-')?-1:1);
  }
  return z;
 }
 const add=(x,y)=>x.map((v,k)=>v+y[k]),nonzero=v=>v.some(x=>x!==0);
 let upper=0,lower=0,firstUpper=null,firstLower=null;
 for(let c=0;c<n;c++)for(let d=c+1;d<n;d++)for(let x=0;x<n;x++){
  const ec=one(c),ed=one(d),ex=one(x);
  const upperSum=add(mul(tilde(ec),mul(ed,ex)),mul(tilde(ed),mul(ec,ex)));
  const lowerSum=add(mul(ec,mul(tilde(ed),ex)),mul(ed,mul(tilde(ec),ex)));
  if(nonzero(upperSum)){upper++;firstUpper ||= {c,d,x,result:upperSum};}
  if(nonzero(lowerSum)){lower++;firstLower ||= {c,d,x,result:lowerSum};}
 }
 return{ordered_cases:n*n*(n-1)/2,upper_failures:upper,lower_failures:lower,firstUpper,firstLower};
}
function verify(D=data,T=source){
 const errors=[],ck=(condition,msg)=>{if(!condition)errors.push(msg)};
 ck(D.authority===false&&D.status?.includes('G0_OPEN'),'source G0 research only');
 ck(D.source_reconstruction?.operator_index_gap?.includes('UNEXTRACTED'),'unextracted Eq5 index issue retained');
 ck(D.invalidation?.new_G1_replay_authorized===false,'G1 promotion barred');
 ck(D.predecessors?.section2_ledger?.git_blob_sha===sha(paths.source),'exact current source ledger');
 ck(D.predecessors?.source_discrepancy?.git_blob_sha===sha(paths.sourceAudit),'historical source contradiction pin');
 ck(D.predecessors?.source_semantic_census?.git_blob_sha===sha(paths.ssc),'current L SSC source pin');
 ck(D.predecessors?.current_gate?.git_blob_sha===sha(paths.gate),'current gate source pin');
 ck(ssc?.items?.length===191&&ssc.status?.includes('UNFROZEN')&&ssc.guards?.L132_replay_authorized===false,'SSC still G0 candidate');
 ck(gate.current_lawful_state?.G1_authorized===false,'stage gate must not authorize G1');
 ck(T.authority===false&&T.source_inconsistency?.preserved===true,'source inconsistency must be preserved');
 ck(D.source_reconstruction?.upper_bivector_application==='UPPER(c,d,x)=left_multiply(tilde(e_c),left_multiply(e_d,x))','upper source ordered right-first operator');
 ck(D.source_reconstruction?.lower_bivector_application==='LOWER(c,d,x)=left_multiply(e_c,left_multiply(tilde(e_d),x))','lower source ordered right-first operator');
 ck(D.source_reconstruction?.reverse_index_claim==='gamma_(d c) = -gamma_(c d) for c!=d, printed after Eq.(5)','source reverse-index assertion retained');
 ck(j(T.basis_multiplication_tables.map(x=>x.carrier))===j(expectedCarriers),'six independent frozen-carrier source tables');
 ck(audit.source_facts?.table_e6_e7==='-e2'&&audit.source_facts?.table_e7_e6==='-e2','independent historical exact source signs');
 ck(T.basis_multiplication_tables.find(t=>t.carrier==='O')?.entries?.[6]?.[7]==='-e2','ordinary O e6e7 printed -e2');
 ck(T.basis_multiplication_tables.find(t=>t.carrier==='O')?.entries?.[7]?.[6]==='-e2','ordinary O e7e6 printed -e2');
 let delta=[];
 for(let k=0;k<6;k++){
  const t=T.basis_multiplication_tables[k],p=prior.basis_multiplication_tables[k];
  ck(t.dimension===p.dimension&&t.entries.length===p.entries.length,'base table dimension '+k);
  for(let i=0;i<t.dimension;i++)for(let j=0;j<t.dimension;j++)if(t.entries[i]?.[j]!==p.entries[i]?.[j])delta.push([t.carrier,i,j,t.entries[i]?.[j]]);
 }
 ck(j(delta)===j([['O',7,6,'-e2']]),'exact one-cell source correction 167 original cells unchanged');
 ck(j(T.formulas)===j(prior.formulas),'all 15 source formula records unchanged');
 const counts=[];
 for(const carrier of expectedCarriers){
  const t=T.basis_multiplication_tables.find(x=>x.carrier===carrier);
  const result=scan(t);
  counts.push([carrier,result]);
  const expected=D.finite_positive_controls?.find(x=>x.carrier===carrier);
  if(carrier==='O'){
   ck(result.ordered_cases===224&&result.upper_failures===12&&result.lower_failures===12,'ordinary O 12+12 explicit counterexamples');
   ck(j(result.firstUpper)===j({c:1,d:6,x:3,result:[0,0,2,0,0,0,0,0]}),'first source upper counterexample');
   ck(j(result.firstLower)===j({c:1,d:6,x:3,result:[0,0,2,0,0,0,0,0]}),'first source lower counterexample');
   ck(D.finite_counterexample?.upper_reverse_index_failures===12&&D.finite_counterexample?.lower_reverse_index_failures===12,'audit counterexample census');
  }else ck(expected?.basis_test_cases===result.ordered_cases&&expected.upper_failures===0&&expected.lower_failures===0&&result.upper_failures===0&&result.lower_failures===0,'source other carrier positive control '+carrier);
 }
 const O=T.basis_multiplication_tables.find(x=>x.carrier==='O');
 let A=copy(O),B=copy(O);A.entries[6][7]='e2';B.entries[7][6]='e2';
 const ar=scan(A),br=scan(B);
 ck(ar.upper_failures===0&&ar.lower_failures===0,'diagnostic e6e7 repair 0+0');
 ck(br.upper_failures===22&&br.lower_failures===22,'other e7e6 repair leaves 22+22');
 ck(D.diagnostic_counterfactuals?.[0]?.upper_failures===0&&D.diagnostic_counterfactuals?.[1]?.upper_failures===22,'negative controls preserve distinct counterfactual outcomes');
 return {errors,counts,ar,br};
}
const r=verify();
const mutations=[
 ['source-normalize e7e6', (D,T)=>{T.basis_multiplication_tables.find(x=>x.carrier==='O').entries[7][6]='e2';}],
 ['other mathematically repairing edit e6e7',(D,T)=>{T.basis_multiplication_tables.find(x=>x.carrier==='O').entries[6][7]='e2';}],
 ['flip unrelated H cell',(D,T)=>{T.basis_multiplication_tables.find(x=>x.carrier==='H').entries[1][2]='-e3';}],
 ['flip split-O cell',(D,T)=>{T.basis_multiplication_tables.find(x=>x.carrier==='O_split').entries[7][6]='e1';}],
 ['erase source contradiction',(D,T)=>{T.source_inconsistency.preserved=false;}],
 ['erase printed source e7e6 claim',(D,T)=>{D.finite_counterexample.upper_reverse_index_failures=0;}],
 ['reverse upper operand order',(D,T)=>{D.source_reconstruction.upper_bivector_application='UPPER(c,d,x)=left_multiply(e_d,left_multiply(tilde(e_c),x))';}],
 ['reverse lower operand order',(D,T)=>{D.source_reconstruction.lower_bivector_application='LOWER(c,d,x)=left_multiply(tilde(e_d),left_multiply(e_c,x))';}],
 ['erase Eq5 no-closure guard',(D,T)=>{D.source_reconstruction.operator_index_gap='COMPLETE';}],
 ['misstate repaired candidate outcome',(D,T)=>{D.diagnostic_counterfactuals[1].upper_failures=0;}],
 ['change source reverse-index claim',(D,T)=>{D.source_reconstruction.reverse_index_claim='gamma_(d c) = gamma_(c d)';}],
 ['lose frozen source audit pin',(D,T)=>{D.predecessors.source_discrepancy.git_blob_sha='stale';}],
 ['promote authority',(D,T)=>{D.authority=true;}],
 ['authorize G1',(D,T)=>{D.invalidation.new_G1_replay_authorized=true;}]
];
for(const [name,mutate]of mutations){const D=copy(data),T=copy(source);mutate(D,T);if(verify(D,T).errors.length===0)r.errors.push('mutant escaped '+name);}
const report={schema:'isograph.exp062-l05-eq5-source-bivector-reverse-index-verifier.v0.1',pass:r.errors.length===0,errors:r.errors,source_literal_counts:r.counts.map(([carrier,x])=>({carrier,ordered_cases:x.ordered_cases,upper_reverse_failures:x.upper_failures,lower_reverse_failures:x.lower_failures})),diagnostic_repair_e6e7:{upper:r.ar.upper_failures,lower:r.ar.lower_failures},diagnostic_repair_e7e6:{upper:r.br.upper_failures,lower:r.br.lower_failures},adversarial_mutations_rejected:mutations.length,G0_source_inconsistency_preserved:true,source_semantic_qualification:false};
console.log(JSON.stringify(report,null,2));if(r.errors.length)process.exitCode=1;