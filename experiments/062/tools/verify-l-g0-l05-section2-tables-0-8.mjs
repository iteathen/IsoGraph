import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/lisi/',ex='experiments/062/';
const files={
 prior:root+'SOURCE_SEMANTIC_CENSUS_0_7.json',
 next:root+'SOURCE_SEMANTIC_CENSUS_0_8.json',
 frozen:root+'SOURCE_SEMANTIC_CENSUS_0_2.json',
 ledger:root+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
 oldLedger:root+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_1.json',
 historical:root+'LISI_L05_OCTONION_TABLE_SOURCE_DISCREPANCY_0_1.json',
 defect:ex+'L05_EQ1_OCTONION_SOURCE_TABLE_LITERAL_FIDELITY_DEFECT_0_1.json',
 originalDefect:ex+'L125_L127_L05_SECTION2_SOURCE_FORMULA_TABLE_CENSUS_DEFECT_0_1.json'
};
const data=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const copy=x=>JSON.parse(JSON.stringify(x)),text=x=>JSON.stringify(x);
const gitHash=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=data(files.prior),cur=data(files.next),frozen=data(files.frozen),source=data(files.ledger),priorLedger=data(files.oldLedger),historical=data(files.historical);
const fixture={
C:[
'e0 e1',
'e1 -e0'
],
C_split:[
'e0 e1',
'e1 e0'
],
H:[
'e0 e1 e2 e3',
'e1 -e0 e3 -e2',
'e2 -e3 -e0 e1',
'e3 e2 -e1 -e0'
],
H_split:[
'e0 e1 e2 e3',
'e1 e0 e3 e2',
'e2 -e3 -e0 e1',
'e3 -e2 -e1 e0'
],
O:[
'e0 e1 e2 e3 e4 e5 e6 e7',
'e1 -e0 e4 e7 -e2 e6 -e5 -e3',
'e2 -e4 -e0 e5 e1 -e3 e7 -e6',
'e3 -e7 -e5 -e0 e6 e2 -e4 e1',
'e4 e2 -e1 -e6 -e0 e7 e3 -e5',
'e5 -e6 e3 -e2 -e7 -e0 e1 e4',
'e6 e5 -e7 e4 -e3 -e1 -e0 -e2',
'e7 e3 e6 -e1 e5 -e4 -e2 -e0'
],
O_split:[
'e0 e1 e2 e3 e4 e5 e6 e7',
'e1 -e0 e3 -e2 -e5 e4 -e7 e6',
'e2 -e3 -e0 e1 -e6 e7 e4 -e5',
'e3 e2 -e1 -e0 -e7 -e6 e5 e4',
'e4 e5 e6 e7 e0 e1 e2 e3',
'e5 -e4 -e7 e6 -e1 e0 e3 -e2',
'e6 e7 -e4 -e5 -e2 -e3 e0 e1',
'e7 -e6 e5 -e4 -e3 e2 -e1 e0'
]};
const formulaExpected={
'L-SSC-125':[
 ['L125-F01','tilde(e_i)=-e_i'],
 ['L125-F02','e_a e_b = M_ab^c e_c'],
 ['L125-F03','n_ab=delta_ab ordinary'],
 ['L125-F04','tilde(e_a e_b)=tilde(e_b)tilde(e_a)']
],
'L-SSC-126':[
 ['L126-F01','M_(tilde c)(tilde b)^a'],
 ['L126-F02','Q^-_a'],
 ['L126-F03','barGamma_c=n_cc'],
 ['L126-F04','right multiplication'],
 ['L126-F05','gamma_a dot gamma_b'],
 ['L126-F06','M_(tilde c tilde b a)']
],
'L-SSC-127':[
 ['L127-F01','pseudoscalar'],
 ['L127-F02','gamma_cd, c<d'],
 ['L127-F03','e_d multiplies on RIGHT before'],
 ['L127-F04','B_8=so(8)'],
 ['L127-F05','Cl(0,2)']
]
};
const requiredFragment={
'L-SSC-125':['SIX','168','C_split','O_split','e_a e_b=M_ab^c e_c','tilde(e_a e_b)','signed'],
'L-SSC-126':['Eq.(2)','gamma_c=','M_ca^(tilde b)','barGamma_c=n_cc','Eq.(3)','Eq.(4)','octonions'],
'L-SSC-127':['Eq.(5)','e_d multiplies','RIGHT before','gamma_dc=-gamma_cd','28-dimensional','7-dimensional','remain explicitly awaiting separate source-exact transcription']
};
function verify(S=cur,L=source){
 const e=[],ck=(v,m)=>{if(!v)e.push(m)};
 ck(S.item_count===191&&S.items.length===191,'complete source census item count');
 ck(text(S.items.map(x=>x.id))===text(old.items.map(x=>x.id)),'source ids/order preserved');
 ck(S.status.includes('NOT_FROZEN')&&S.guards.source_census_freeze_complete===false&&S.guards.L_G1_source_reextraction_complete===false&&S.guards.L132_replay_authorized===false,'no premature G0/G1/L132 promotion');
 ck(S.revision?.predecessor_git_blob_sha===gitHash(files.prior),'correct predecessor source blob');
 ck(S.revision?.source_ledger?.git_blob_sha===gitHash(files.ledger),'correct Eq1-5 ledger blob');
 ck(S.revision?.defect?.git_blob_sha===gitHash(files.defect),'defect provenance pinned');
 ck(S.revision?.source_table_168_entries_exact_literal_candidate===true&&S.revision?.source_contradiction_preserved===true&&S.revision?.L128_L132_expression_rows_unchanged===true,'source literal/inconsistency conservation');
 const diffs=S.items.filter((x,i)=>text(x)!==text(old.items[i])).map(x=>x.id);
 ck(text(diffs)===text(['L-SSC-125','L-SSC-126','L-SSC-127']),'exact three-item v0.8 delta');
 ck(text(S.items.filter(x=>!['L-SSC-125','L-SSC-126','L-SSC-127','L-SSC-128','L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132'].includes(x.id)))===text(frozen.items.filter(x=>!['L-SSC-125','L-SSC-126','L-SSC-127','L-SSC-128','L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132'].includes(x.id))),'183 original non-L05-delta bodies exact');
 const names=['C','C_split','H','H_split','O','O_split'];
 ck(text(L.basis_multiplication_tables.map(t=>t.carrier))===text(names),'Eq1 six source carrier IDs/order');
 ck(L.status.includes('NOT_FROZEN')&&L.authority===false,'source ledger not qualified or frozen');
 ck(L.source_inconsistency?.preserved===true&&L.source_inconsistency?.response==='SOURCE_CONTRADICTION_PRESERVED_WITHOUT_REPAIR','source contradiction preserved');
 ck(historical.source_facts?.table_e6_e7==='-e2'&&historical.source_facts?.table_e7_e6==='-e2','independent prior primary-source finding');
 ck(L.correction_basis?.independent_earlier_source_discrepancy?.git_blob_sha===gitHash(files.historical),'historical discrepancy pin');
 ck(L.correction_basis?.git_blob_sha===gitHash(files.defect),'current correction defect pin');
 ck(L.table_counts.source_table_cells===168,'168 sign cells');
 let cells=0;const anticommutation_violations=[];
 for(const table of L.basis_multiplication_tables){
  const rows=fixture[table.carrier],d=rows?.length;
  ck(d===table.dimension,'table dimension '+table.carrier);
  ck(table.entries.length===d,'table row count '+table.carrier);
  for(let i=0;i<d;i++){
    const want=rows[i].split(' '),got=table.entries[i];
    ck(text(got)===text(want),'source Eq.(1) table sign/column mismatch '+table.carrier+' row '+i);
    ck(got.length===d,'ordered column count '+table.carrier+' '+i);
    ck(got[0]==='e'+i,'source e0 left/right identity '+table.carrier+' row '+i);
    for(let j=0;j<d;j++){
      cells++;
      if(i===0)ck(got[j]==='e'+j,'source left e0 identity '+table.carrier+' '+j);
      const v=got[j];ck(/^-?e[0-7]$/.test(v),'cell signed basis '+table.carrier+'/'+i+'/'+j);
      // Source contradicts its OWN conjugation-reversal claim at O(e6,e7): detect, do not normalize.
      if(i>0&&j>i){let opposite=table.entries[j]?.[i];if(opposite!==(v[0]==='-'?v.slice(1):'-'+v))anticommutation_violations.push([table.carrier,i,j]);}
    }
  }
 }
 ck(cells===168,'table actual cell count');
 ck(text(anticommutation_violations)===text([['O',6,7]]),'preserve exact single printed anti-commutation inconsistency');
 const sourceO=L.basis_multiplication_tables.find(t=>t.carrier==='O');
 ck(sourceO?.entries?.[6]?.[7]==='-e2'&&sourceO?.entries?.[7]?.[6]==='-e2','both source octonion signs must be negative');
 ck(S.items.find(x=>x.id==='L-SSC-125')?.body?.includes('BOTH e6 e7=-e2 and e7 e6=-e2'),'source mismatch conserved in SSC body');
 let different=0;for(let k=0;k<L.basis_multiplication_tables.length;k++){const now=L.basis_multiplication_tables[k],was=priorLedger.basis_multiplication_tables[k];for(let i=0;i<now.dimension;i++)for(let j=0;j<now.dimension;j++)if(now.entries[i][j]!==was.entries[i][j]){different++;ck(now.carrier==='O'&&i===7&&j===6&&now.entries[i][j]==='-e2'&&was.entries[i][j]==='e2','illegal source-table change other than exact source correction');}}
 ck(different===1&&text(L.formulas)===text(priorLedger.formulas),'exact one-cell repair, 167 unchanged and all 15 formula rows identical');
 // Positive control for the source-specific contradiction, rather than testing it away.
 const conj=x=>x.map((v,i)=>i===0?v:-v),vec=(n,i)=>Array.from({length:n},(_,k)=>k===i?1:0);
 const mul=(x,y,t)=>{let z=Array(t.dimension).fill(0);for(let i=0;i<t.dimension;i++)for(let j=0;j<t.dimension;j++){const c=t.entries[i][j],n=Number(c.replace(/^-?e/,'')),sign=c[0]==='-'?-1:1;z[n]+=x[i]*y[j]*sign;}return z;};
 if(sourceO){const a=mul(vec(8,6),vec(8,7),sourceO),b=mul(vec(8,7),vec(8,6),sourceO);ck(text(a)===text(b)&&text(a)===text([0,0,-1,0,0,0,0,0]),'printed non-anticommutative e6/e7 witness');ck(text(conj(a))!==text(mul(conj(vec(8,7)),conj(vec(8,6)),sourceO)),'source anti-involution identity must fail at printed witness');const x=[1,0,0,0,0,0,-1,0],y=[0,0,1,0,0,0,0,-1],p=mul(x,y,sourceO);ck(p.every(v=>v===0)&&x.reduce((n,q)=>n+q*q,0)===2&&y.reduce((n,q)=>n+q*q,0)===2,'source zero divisor with both squared lengths 2');}
 for(const [id,rows]of Object.entries(formulaExpected)){
   const item=S.items.find(y=>y.id===id),p=old.items.find(y=>y.id===id);
   ck(!!item&&(id==='L-SSC-125'?item.body.startsWith(p.body+' '):item.body===p.body),'original '+id+' source body exact carry-forward or additive prefix');
   for(const part of requiredFragment[id])ck(item?.body?.includes(part),'source body misses '+id+' '+part);
   const c=item?.source_expression_census;
   ck(c?.source_presentation_ledger?.git_blob_sha===gitHash(files.ledger),'per-item exact table/formula ledger pin '+id);
   ck(c?.source_defect_audit?.git_blob_sha===gitHash(files.originalDefect),'original source-formula defect pin '+id);
   ck(c?.source_discrepancy_audit?.git_blob_sha===gitHash(files.defect),'new source-table discrepancy defect pin '+id);
   ck(text(c?.source_formula_ids)===text(rows.map(r=>r[0])),'per-item formula IDs '+id);
   const extracted=L.formulas.filter(y=>y.item===id);
   ck(text(c?.source_assertion_rows)===text(extracted),'per-item formula exact carry-forward '+id);
   for(const [fid,txt]of rows){let r=extracted.find(x=>x.id===fid);ck(r?.statement?.includes(txt),'source operator/fragments '+fid);ck(r?.logical_force?.startsWith('SOURCE_'),'source force preserved '+fid)}
   ck(c?.current_source_reconstruction==='INCOMPLETE_EXACT_EQ5_INDICES_AND_CL02_WORKED_EXAMPLE','no hidden Eq5/Cl02 completeness claim '+id);
 }
 const a=S.items.find(y=>y.id==='L-SSC-125')?.source_expression_census;
 ck(a?.signed_table_carriers?.length===6&&a.signed_table_carriers.reduce((n,t)=>n+t.entries,0)===168,'SSC source table full 168 coverage');
 for(let id of ['L-SSC-128','L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132']){
   let v=S.items.find(y=>y.id===id),p=old.items.find(y=>y.id===id);
   ck(text(v)===text(p),'protected other L source rows '+id);
 }
 ck(S.items.find(x=>x.id==='L-SSC-128')?.source_expression_census?.source_assertion_rows?.length===6,'preserve 6 L128 expressions');
 ck(['L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132'].reduce((n,id)=>n+S.items.find(x=>x.id===id).source_expression_census.source_assertion_rows.length,0)===44,'preserve 44 L129–132 rows');
 ck(L.unreconstructed_primary_source?.length>=3&&S.guards.whole_L_source_cold_audit_complete===false,'open source reconstruction obligations remain visible');
 return e;
}
const errors=verify();
const mutants=[
 ['flip C multiplication sign',(S,L)=>{L.basis_multiplication_tables[0].entries[1][1]='e0';}],
 ['replace C split with ordinary',(S,L)=>{L.basis_multiplication_tables[1].entries[1][1]='-e0';}],
 ['flip H sign',(S,L)=>{L.basis_multiplication_tables[2].entries[1][2]='-e3';}],
 ['flip Hsplit unit square',(S,L)=>{L.basis_multiplication_tables[3].entries[3][3]='-e0';}],
 ['flip O nontrivial product',(S,L)=>{L.basis_multiplication_tables[4].entries[1][2]='-e4';}],
 ['silently restore mathematical repair e7e6=+e2',(S,L)=>{L.basis_multiplication_tables[4].entries[7][6]='e2';}],
 ['change other conflicting source term e6e7=+e2',(S,L)=>{L.basis_multiplication_tables[4].entries[6][7]='e2';}],
 ['erase source discrepancy status',(S,L)=>{L.source_inconsistency.preserved=false;}],
 ['erase L126 additive discrepancy provenance',(S,L)=>{delete S.items.find(x=>x.id==='L-SSC-126').source_expression_census.source_discrepancy_audit;}],
 ['replace old source defect pin',(S,L)=>{S.items.find(x=>x.id==='L-SSC-127').source_expression_census.source_defect_audit.git_blob_sha='stale';}],
 ['flip O split nontrivial product',(S,L)=>{L.basis_multiplication_tables[5].entries[4][5]='-e1';}],
 ['swap O operands',(S,L)=>{L.basis_multiplication_tables[4].entries[1][2]='-e4';L.basis_multiplication_tables[4].entries[2][1]='e4';}],
 ['drop all split signs',(S,L)=>{L.basis_multiplication_tables[5].entries[1]=[...L.basis_multiplication_tables[4].entries[1]];}],
 ['erase source Eq2 tilde index',(S,L)=>{L.formulas.find(x=>x.id==='L126-F01').statement='gamma_c=matrix by convention';}],
 ['erase source Eq3 signature',(S,L)=>{L.formulas.find(x=>x.id==='L126-F05').statement='gamma_a dot gamma_b = n_ab';}],
 ['lose source Eq4 cyclic arm',(S,L)=>{L.formulas.find(x=>x.id==='L126-F06').statement='some cyclic identity';}],
 ['erase right-first nonassociative order',(S,L)=>{L.formulas.find(x=>x.id==='L127-F03').statement='e_d multiplies after tilde(e_c)';}],
 ['truncate G0 L125 body',(S,L)=>{S.items.find(x=>x.id==='L-SSC-125').body=old.items.find(x=>x.id==='L-SSC-125').body;}],
 ['clobber L128 unrelated rows',(S,L)=>{S.items.find(x=>x.id==='L-SSC-128').body='lost';}],
 ['delete gamma coefficient formula',(S,L)=>{S.items.find(x=>x.id==='L-SSC-126').source_expression_census.source_assertion_rows.pop();}],
 ['drop one source table',(S,L)=>{L.basis_multiplication_tables.pop();}],
 ['assert table independently reviewed',(S,L)=>{L.status='FROZEN_INDEPENDENTLY_VERIFIED';}],
 ['authorize premature G1',(S,L)=>{S.guards.L_G1_source_reextraction_complete=true;}],
 ['authorize premature L132',(S,L)=>{S.guards.L132_replay_authorized=true;}],
 ['cross-track source import',(S,L)=>{S.items.find(x=>x.id==='L-SSC-127').source_expression_census.source_assertion_rows.push({id:'W-SSC-097'});}]
];
for(const [name,mutate]of mutants){const S=copy(cur),L=copy(source);mutate(S,L);if(verify(S,L).length===0)errors.push('mutation escaped '+name)}
console.log(JSON.stringify({schema:'isograph.exp062-l05-section2-source-table-g0-verifier.v0.8',pass:errors.length===0,errors,source_items:cur.items.length,changed_items:['L-SSC-125','L-SSC-126','L-SSC-127'],table_carriers:source.basis_multiplication_tables.length,checked_source_cells:168,formula_rows:source.formulas.length,mutations_rejected:mutants.length,stage:'G0_NOT_FROZEN',external_semantic_review:'NOT_PERFORMED'},null,2));
if(errors.length)process.exitCode=1;