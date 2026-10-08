import fs from 'node:fs';
import crypto from 'node:crypto';
const base='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const files={
 case:base+'LISI_L05_CL02_WORKED_EXAMPLE_SOURCE_MATRICES_0_1.json',
 source:base+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
 census:base+'SOURCE_SEMANTIC_CENSUS_0_8.json',
 gate:exp+'L_CURRENT_STAGE_GATE_0_8.json',
 discrepancy:base+'LISI_L05_OCTONION_TABLE_SOURCE_DISCREPANCY_0_1.json'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),clone=o=>JSON.parse(JSON.stringify(o)),j=o=>JSON.stringify(o);
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const pack=read(files.case),table=read(files.source),census=read(files.census),gate=read(files.gate),historical=read(files.discrepancy);
const fixtures={
 Gamma0:[[1,0],[0,-1]],
 Gamma1:[[0,-1],[-1,0]],
 gamma0:[[0,0,-1,0],[0,0,0,1],[1,0,0,0],[0,-1,0,0]],
 gamma1:[[0,0,0,1],[0,0,1,0],[0,-1,0,0],[-1,0,0,0]],
 Q:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 coefficient:[[0,0,0,1],[0,1,1,-1]] // unused canonical coefficients checked separately
};
const mul=(a,b)=>a.map(row=>b[0].map((_,k)=>row.reduce((sum,v,i)=>sum+v*b[i][k],0)));
const plus=(a,b)=>a.map((row,i)=>row.map((v,k)=>v+b[i][k]));
const zero=(n)=>Array.from({length:n},()=>Array(n).fill(0));
const diag=(n,scale)=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,k)=>i===k?scale:0));
const neg=x=>x.map(row=>row.map(y=>-y)),transpose=x=>x[0].map((_,i)=>x.map(row=>row[i]));
const block=(x,y)=>[...neg(transpose(x)).map((row)=>[0,0,...row]),...y.map(row=>[...row,0,0])];
const printExpected=new Map([
 ['M_(0 0)^(tilde 0)',1],
 ['M_(0 1)^(tilde 1)',-1],
 ['M_(1 0)^(tilde 1)',-1],
 ['M_(1 1)^(tilde 0)',-1]
]);
function validate(c=pack,t=table){
 const errors=[],ck=(ok,m)=>{if(!ok)errors.push(m)};
 const cs=c.source_matrix_chain||{},C=t.basis_multiplication_tables?.find(x=>x.carrier==='C'),O=t.basis_multiplication_tables?.find(x=>x.carrier==='O');
 ck(c.authority===false&&c.status?.includes('NOT_FROZEN')&&c.status?.includes('NOT_QUALIFIED'),'no source-module authority or G0 freeze');
 ck(c.inputs?.section2_source_ledger?.git_blob_sha===blob(files.source),'source table authority tuple');
 ck(c.inputs?.L_SSC?.git_blob_sha===blob(files.census),'source census tuple');
 ck(c.inputs?.stage_gate?.git_blob_sha===blob(files.gate),'source procedural gate tuple');
 ck(c.target_impact?.L132_replay_authorized===false&&!gate.current_lawful_state?.G1_authorized,'no premature G1 / L132 authorization');
 ck(c.source_polarity_and_syntax?.source_only_unqualified===true&&c.source_polarity_and_syntax?.separate_octal_source_discrepancy_still_preserved===true,'source-only status');
 ck(c.source_polarity_and_syntax?.source_uses_blank_entries_as_zero===true,'sparse matrix blank status');
 ck(c.source_spinor_basis?.length===4,'four source basis columns');
 for(let i=0;i<4;i++){
  ck(j(c.source_spinor_basis?.[i]?.representation)===j(fixtures.Q[i]),'exact printed chiral source spinor '+i);
  ck(c.source_spinor_basis[i].source_order===i+1,'source spinor order '+i);
  ck(c.source_spinor_basis[i].carrier===(i<2?'negative chirality':'positive chirality'),'spinor chirality role '+i);
 }
 const coefficients=c.source_coefficient_claims||[];
 ck(coefficients.length===4&&new Set(coefficients.map(x=>x.indexed)).size===4,'four printed indexed coefficients');
 for(const e of coefficients)ck(e.value===printExpected.get(e.indexed),'source coefficient '+e.indexed+' sign and index');
 ck(C?.entries?.[0]?.[0]==='e0'&&C?.entries?.[0]?.[1]==='e1'&&C?.entries?.[1]?.[0]==='e1'&&C?.entries?.[1]?.[1]==='-e0','actual source C multiplication table');
 const getCoeff=(d,a,b)=>{const entry=C?.entries?.[d]?.[a];if(!entry)return null;const k=Number(entry.replace(/^-?e/,''));
 const sign=entry[0]==='-'?-1:1;return k===b?sign*(b===1?-1:1):0;};
 const GammaDerived=[0,1].map(d=>[0,1].map(b=>[0,1].map(a=>getCoeff(d,a,b))));
 ck(j(GammaDerived[0])===j(fixtures.Gamma0)&&j(GammaDerived[1])===j(fixtures.Gamma1),'independent C-table to Gamma coefficient transport');
 ck(j(cs.matrix_Gamma_0)===j(fixtures.Gamma0)&&j(cs.matrix_Gamma_1)===j(fixtures.Gamma1),'source 2x2 Gamma matrices literal');
 ck(j(cs.matrix_Gamma_0)===j(GammaDerived[0])&&j(cs.matrix_Gamma_1)===j(GammaDerived[1]),'Gamma derived from C table source');
 ck(j(cs.matrix_barGamma_0)===j(transpose(cs.matrix_Gamma_0))&&j(cs.matrix_barGamma_1)===j(transpose(cs.matrix_Gamma_1)),'signature-adjusted transpose for source C');
 const gammaDerived0=block(cs.matrix_Gamma_0,cs.matrix_Gamma_0),gammaDerived1=block(cs.matrix_Gamma_1,cs.matrix_Gamma_1);
 ck(j(cs.matrix_gamma_0)===j(fixtures.gamma0)&&j(cs.matrix_gamma_1)===j(fixtures.gamma1),'source 4x4 gamma matrices literal');
 ck(j(cs.matrix_gamma_0)===j(gammaDerived0)&&j(cs.matrix_gamma_1)===j(gammaDerived1),'chiral gamma from independent printed Gamma reconstruction');
 const ga=[cs.matrix_gamma_0,cs.matrix_gamma_1];
 ck(j(mul(ga[0],ga[0]))===j(diag(4,-1))&&j(mul(ga[1],ga[1]))===j(diag(4,-1)),'finite Cl(0,2) squares');
 ck(j(plus(mul(ga[0],ga[1]),mul(ga[1],ga[0])))===j(zero(4)),'finite anticommutation from source example');
 ck(O?.entries?.[6]?.[7]==='-e2'&&O?.entries?.[7]?.[6]==='-e2','preserve two negative ordinary octonion products');
 ck(historical.source_facts?.table_e6_e7==='-e2'&&historical.source_facts?.table_e7_e6==='-e2','independent historical octonion source-discrepancy verification');
 ck(c.remaining_open?.some(x=>x.includes('Eq.(5)'))&&c.remaining_open?.some(x=>x.includes('G0')),'G0 source gap kept visible');
 ck(!j(c).includes('W-SSC-')&&!j(c).includes('W_G7_'),'L track only');
 return errors;
}
const errors=validate();
const cases=[
 ['flip gamma0 source sign',x=>{x.source_matrix_chain.matrix_gamma_0[0][2]=1;}],
 ['swap gamma1 source chirality',x=>{x.source_matrix_chain.matrix_gamma_1[2][1]=1;}],
 ['flip Gamma1 upper sign',x=>{x.source_matrix_chain.matrix_Gamma_1[0][1]=1;}],
 ['remove Gamma0 diagonal',x=>{x.source_matrix_chain.matrix_Gamma_0[1][1]=0;}],
 ['violate source Gamma/barGamma distinction',x=>{x.source_matrix_chain.matrix_barGamma_1[0][1]=1;}],
 ['change chiral Qminus0',x=>{x.source_spinor_basis[0].representation=[0,0,1,0];}],
 ['swap spinor source chiralities',x=>{x.source_spinor_basis[2].carrier='negative chirality';}],
 ['duplicate Q basis',x=>{x.source_spinor_basis[3].representation=[0,0,1,0];}],
 ['mutate M coefficient sign',x=>{x.source_coefficient_claims[1].value=1;}],
 ['mutate M source index',x=>{x.source_coefficient_claims[1].indexed='M_(0 1)^(tilde 0)';}],
 ['assert mathematical universal law',x=>{x.source_polarity_and_syntax.source_only_unqualified=false;}],
 ['pretend G0 frozen',x=>{x.status='FROZEN_QUALIFIED';}],
 ['misroute stage',x=>{x.target_impact.L132_replay_authorized=true;}],
 ['erase source Eq5 boundary',x=>{x.remaining_open=[];}],
 ['delete source sparse zero role',x=>{x.source_polarity_and_syntax.source_uses_blank_entries_as_zero=false;}]
];
for(const [name,mutate]of cases){const q=clone(pack);mutate(q);if(validate(q).length===0)errors.push('adversarial mutation escaped '+name);}
for(const [name,mutate]of [
 ['silently repair O e7e6=+e2',t=>{t.basis_multiplication_tables.find(x=>x.carrier==='O').entries[7][6]='e2';}],
 ['corrupt C product',t=>{t.basis_multiplication_tables.find(x=>x.carrier==='C').entries[1][1]='e0';}],
 ]){
 const t=clone(table);mutate(t);if(validate(pack,t).length===0)errors.push('table mutation escaped '+name);
}
const result={schema:'isograph.exp062-l-cl02-source-matrices-verifier.v0.1',pass:errors.length===0,errors,source_matrix_shapes:'Gamma 2x2; gamma 4x4; Q four length-4 basis vectors',finite_clifford_check:true,adversarial_mutations_total:cases.length+2,checked_source_coefficients:4,source_comparison:'Published L05 printed page 5 source fixture',stage:'G0_NOT_FROZEN',G1_authorized:false,external_verification_passed:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;