import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const paths={table:dir+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
 deficit:exp+'L126_L05_EQ2_EQ3_OCTONION_CLIFFORD_SOURCE_CONTRADICTION_0_1.json',
 ssc:dir+'SOURCE_SEMANTIC_CENSUS_0_12.json',stage:exp+'L_CURRENT_STAGE_GATE_0_12.json'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),cp=x=>JSON.parse(JSON.stringify(x)),j=JSON.stringify;
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const L=read(paths.table),D=read(paths.deficit),SSC=read(paths.ssc),GATE=read(paths.stage);
const sign=i=>i===0?1:-1,one=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
const multiply=(A,B)=>Array.from({length:A.length},(_,i)=>Array.from({length:B[0].length},(_,j)=>A[i].reduce((s,v,k)=>s+v*B[k][j],0)));
const transpose=A=>A[0].map((_,i)=>A.map(r=>r[i]));
function analyze(T,mode='transpose'){
 const n=T.dimension;
 const Gamma=Array.from({length:n},()=>one(n,n)),barDirect=Array.from({length:n},()=>one(n,n));
 for(let c=0;c<n;c++)for(let a=0;a<n;a++){
  const cell=T.entries[c][a];if(!/^-?e\d+$/.test(cell))throw Error('invalid source term');
  const b=Number(cell.replace(/^-?e/,'')),v=cell.startsWith('-')?-1:1;
  if(b>=n)throw Error('bad basis product output');
  Gamma[c][b][a]+=v*sign(b);
  barDirect[c][b][a]+=v*sign(c)*sign(a);
 }
 const mismatch=[];
 for(let c=0;c<n;c++)for(let i=0;i<n;i++)for(let k=0;k<n;k++)
  if(barDirect[c][i][k]!==Gamma[c][k][i])mismatch.push({c,row:i,col:k,from_table:barDirect[c][i][k],from_transpose:Gamma[c][k][i]});
 const bar=mode==='transpose'?Gamma.map(transpose):barDirect;
 const mat=Array.from({length:n},(_,c)=>{
  const g=one(2*n,2*n);for(let r=0;r<n;r++)for(let k=0;k<n;k++){g[r][n+k]=-bar[c][r][k];g[n+r][k]=Gamma[c][r][k];}
  return g;
 });
 let pairFailures=0,entryFailures=0,first=null,failedPairs=[];
 for(let a=0;a<n;a++)for(let b=a;b<n;b++){
  const p=multiply(mat[a],mat[b]),q=multiply(mat[b],mat[a]);
  let failures=0;
  for(let r=0;r<2*n;r++)for(let c=0;c<2*n;c++){
   const expected=(a===b&&r===c)?-2:0,got=p[r][c]+q[r][c];
   if(got!==expected){failures++;entryFailures++;first??={generator_a:a,generator_b:b,row:r,col:c,observed:got,required:expected};}
  }
  if(failures){pairFailures++;failedPairs.push([a,b]);}
 }
 return{pairs_tested:n*(n+1)/2,pairs_failing:pairFailures,entries_failing:entryFailures,first,failedPairs,mismatches:mismatch};
}
function validate(Doc=D,Ledger=L){
 const errors=[],ck=(x,m)=>{if(!x)errors.push(m)};
 const Tab=Ledger.basis_multiplication_tables?.find(x=>x.carrier==='O'),H=Ledger.basis_multiplication_tables?.find(x=>x.carrier==='H'),C=Ledger.basis_multiplication_tables?.find(x=>x.carrier==='C');
 ck(Doc.schema==='isograph.exp062-l126-eq2-eq3-ordinary-octonion-clifford-source-discrepancy.v0.1'&&Doc.track==='L'&&Doc.stage==='G0'&&Doc.authority===false,'source observation not authority');
 ck(Doc.inputs?.source_table?.sha===gitSha(paths.table)&&Doc.inputs?.source_census?.sha===gitSha(paths.ssc)&&Doc.inputs?.current_gate?.sha===gitSha(paths.stage),'exact provenance input SHA pins');
 ck(SSC.items?.length===191&&SSC.guards?.source_census_freeze_complete===false&&GATE.current_lawful_state?.G1_authorized===false,'no downstream promotion');
 ck(Tab?.dimension===8&&Tab.entries?.length===8&&Tab.entries.every(row=>row.length===8),'source O dimension');
 ck(Tab?.entries[6][7]==='-e2'&&Tab?.entries[7][6]==='-e2','both literal published O source table cells');
 ck(Doc.explicit_source_facts?.O_e6_times_e7==='-e2'&&Doc.explicit_source_facts?.O_e7_times_e6==='-e2','document exact signs retained');
 ck(Doc.explicit_source_facts?.source_barGamma_transpose?.includes('Gamma_c^T')&&Doc.explicit_source_facts?.source_Clifford==='gamma_a gamma_b+gamma_b gamma_a=-2 delta_ab I16','printed transpose/anticommutation claims');
 let a,b;
 try{a=analyze(Tab,'transpose');b=analyze(Tab,'direct');}catch(err){errors.push('source construction error '+err.message);return errors;}
 const transposeD=Doc.observations?.transpose_construction||{},directD=Doc.observations?.table_upper_construction||{};
 ck(a.pairs_tested===36&&a.pairs_failing===7&&a.entries_failing===28,'source transpose construction 7 pairs /28 matrix entries');
 ck(b.pairs_tested===36&&b.pairs_failing===7&&b.entries_failing===28,'independent table upper construction 7 pairs /28 entries');
 ck(j(a.failedPairs)===j([[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,7]]),'exact failing source generator pairs');
 ck(j(a.first)===j({generator_a:0,generator_b:6,row:2,col:7,observed:2,required:0}),'first Γ transpose counterexample');
 ck(j(b.first)===j({generator_a:1,generator_b:6,row:2,col:3,observed:-2,required:0}),'independent first table Γ counterexample');
 ck(transposeD.generator_pairs_tested===a.pairs_tested&&transposeD.pairs_failing===a.pairs_failing&&transposeD.entries_failing===a.entries_failing&&j(transposeD.first)===j(a.first)&&j(transposeD.failing_pairs)===j(a.failedPairs),'source audit precise transpose report');
 ck(directD.generator_pairs_tested===b.pairs_tested&&directD.pairs_failing===b.pairs_failing&&directD.entries_failing===b.entries_failing&&j(directD.first)===j(b.first),'source audit precise direct table report');
 ck(a.mismatches.length===2&&j(a.mismatches)===j(Doc.observations?.barGamma_interpretation_clash?.rows),'barGamma index equality exact two-entry contradiction');
 ck(Doc.observations?.barGamma_interpretation_clash?.total_entry_disagreements===2,'source definition clash tally');
 const R=cp(Tab),S=cp(Tab);R.entries[6][7]='e2';S.entries[7][6]='e2';
 const rr=analyze(R,'transpose'),ss=analyze(S,'transpose');
 ck(rr.pairs_failing===0&&rr.entries_failing===0&&Doc.observations?.counterfactual_not_source?.change==='e6e7: -e2 -> +e2'&&Doc.observations?.counterfactual_not_source?.disposition==='NOT_ADOPTED_SOURCE_MODIFICATION','first counterfactual: one-cell alternative not authority');
 ck(ss.pairs_failing===12&&ss.entries_failing===48&&Doc.observations?.other_counterfactual_not_source?.disposition==='NOT_ADOPTED_SOURCE_MODIFICATION','second counterfactual: 12/48');
 for(const P of [C,H]){const x=analyze(P,'transpose'),y=analyze(P,'direct');ck(x.pairs_failing===0&&y.pairs_failing===0&&x.mismatches.length===0,'ordinary C/H source positive no false positive '+P?.carrier);}
 ck(Doc.invalidation?.earliest_lawful_stage==='G0'&&Doc.invalidation?.earliest_source_obligation==='L-SSC-126'&&Doc.invalidation?.G1_reextraction_authorized===false&&Doc.invalidation?.G2_through_G7_qualified===false,'earliest gate and descendants preserved');
 ck(Doc.nonclaims?.some(s=>s.includes('one-cell repair')),'counterfactual may not be promoted');
 return errors;
}
const base=validate(),errors=[...base];
const cases=[
 ['O e6e7 repair forbidden',(_,t)=>{t.basis_multiplication_tables.find(x=>x.carrier==='O').entries[6][7]='e2'}],
 ['O e7e6 repair forbidden',(_,t)=>{t.basis_multiplication_tables.find(x=>x.carrier==='O').entries[7][6]='e2'}],
 ['H positive control altered',(_,t)=>{t.basis_multiplication_tables.find(x=>x.carrier==='H').entries[1][2]='-e3'}],
 ['C positive control altered',(_,t)=>{t.basis_multiplication_tables.find(x=>x.carrier==='C').entries[1][1]='e0'}],
 ['source count falsified',(d)=>{d.observations.transpose_construction.pairs_failing=0}],
 ['source one matrix-entry removed',(d)=>{d.observations.transpose_construction.entries_failing=27}],
 ['first witness erased',(d)=>{d.observations.transpose_construction.first.row=3}],
 ['wrong failed pair class',(d)=>{d.observations.transpose_construction.failing_pairs.pop()}],
 ['direct M count falsified',(d)=>{d.observations.table_upper_construction.entries_failing=0}],
 ['barGamma discrepancy erased',(d)=>{d.observations.barGamma_interpretation_clash.rows=[]}],
 ['source negative cell overwritten',(d)=>{d.explicit_source_facts.O_e7_times_e6='+e2'}],
 ['counterfactual adopted',(d)=>{d.observations.counterfactual_not_source.disposition='SOURCE_CORRECTED'}],
 ['second repair reported success',(d)=>{d.observations.other_counterfactual_not_source.disposition='SOURCE_CORRECTED'}],
 ['stale provenance blob',(d)=>{d.inputs.source_table.sha='old'}],
 ['source scope changes',(d)=>{d.invalidation.earliest_lawful_stage='G3'}],
 ['premature G1',(d)=>{d.invalidation.G1_reextraction_authorized=true}],
 ['premature G7',(d)=>{d.invalidation.G2_through_G7_qualified=true}],
 ['positive theorem asserted',(d)=>{d.authority=true}],
 ['transpose identity altered',(d)=>{d.explicit_source_facts.source_barGamma_transpose='unknown'}],
 ['Clifford identity altered',(d)=>{d.explicit_source_facts.source_Clifford='unknown'}]
];
let rejected=0;
if(!base.length)for(const [name,mutate]of cases){const d=cp(D),t=cp(L),before=j([d,t]);mutate(d,t);if(j([d,t])===before)errors.push('mutation no-op '+name);else if(validate(d,t).length===0)errors.push('mutation escaped '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l126-eq2-eq3-hostile-check.v0.1',pass:errors.length===0,errors,positive_controls:['C','H'],source_generator_pairs:36,transpose_pair_failures:7,transpose_bad_entries:28,table_upper_pair_failures:7,table_upper_bad_entries:28,barGamma_definition_conflicts:2,adversarial_defined:cases.length,adversarial_rejected:rejected,adversarial_gate:base.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,external_semantic_verification:false},null,2));if(errors.length)process.exitCode=1;
