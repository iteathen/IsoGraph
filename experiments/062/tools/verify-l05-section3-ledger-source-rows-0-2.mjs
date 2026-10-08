import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={old:L+'LISI_L05_SECTION3_FORMULA_LEDGER_0_1.json',now:L+'LISI_L05_SECTION3_FORMULA_LEDGER_0_2.json',source:E+'L_G0_L05_SECTION3_SOURCE_ASSERTION_REOPEN_AUDIT_0_3.json',defect:E+'L05_SECTION3_EXPLORATORY_ROW_ORDER_PROVENANCE_DEFECT_0_1.json'};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),copy=x=>JSON.parse(JSON.stringify(x)),ser=x=>JSON.stringify(x);
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const prior=get(files.old),candidate=get(files.now),source=get(files.source);
const perm=[0,3,6,1,4,7,2,5,8];
const families=[['S07','L05-S07-E07-',source.source_expression_rows.eq7_division_actions],['S08','L05-S08-E08-',source.source_expression_rows.eq8_clifford_index_actions]];
function evaluate(packet=candidate){
 const e=[],ck=(v,m)=>{if(!v)e.push(m)};
 ck(packet.rows.length===70&&new Set(packet.rows.map(x=>x.formula_id)).size===70,'70 distinct formula records');
 ck(packet.inventory?.assertion_groups===26,'all 26 source assertion groups');
 ck(packet.predecessor?.git_blob_sha===blob(files.old),'predecessor blob pin');
 ck(packet.correction_basis?.defect?.git_blob_sha===blob(files.defect),'row-order defect pin');
 ck(packet.correction_basis?.source_audit?.git_blob_sha===blob(files.source),'source expression audit pin');
 ck(packet.authority===false&&!packet.status.includes('PROMOTED'), 'hypothesis/ledger must not claim qualified semantics');
 ck(packet.interpretation_boundary?.external_verification_passed===false,'no outside review');
 const originalOther=prior.rows.filter(x=>!['S07','S08'].includes(x.assertion_group)&&!['L05-S15-V-MATRIX','L05-S15-PSI-MATRIX','L05-S15-CHI-MATRIX'].includes(x.formula_id));
 const newOther=packet.rows.filter(x=>!['S07','S08'].includes(x.assertion_group)&&!['L05-S15-V-MATRIX','L05-S15-PSI-MATRIX','L05-S15-CHI-MATRIX'].includes(x.formula_id));
 ck(ser(originalOther)===ser(newOther),'49 unrelated source rows conserved exactly');
 const normalized=x=>(x||'').replace(/[\^\{\}\s]/g,'');
 for(const [group,prefix,sourceRows] of families){
  const current=packet.rows.filter(x=>x.assertion_group===group),original=prior.rows.filter(x=>x.assertion_group===group);
  ck(current.length===9&&original.length===9&&sourceRows.length===9,group+' 9x1 count');
  for(let i=0;i<9;i++){
   const curr=current[i],old=original[perm[i]],src=sourceRows[i],id=prefix+String(i+1).padStart(2,'0');
   ck(curr?.formula_id===id,group+' source row id '+i);
   ck(curr?.published_row_id===src.id,group+' independent source row id '+i);
   ck(curr?.historical_misordered_id===old.formula_id,group+' exact predecessor remap '+i);
   ck(curr?.source_expression===old.source_expression,group+' no semantic string drift '+i);
   ck(curr?.published_source_rhs===(src.rhs_source_ordered??src.rhs_latex_transcription),group+' independently frozen RHS '+i);
   ck(curr?.published_reflection===src.reflection,group+' source reflection '+i);
   ck(curr?.source_table_row_ordinal===i+1&&curr?.source_row_order==='OUTPUT_ROLE_MAJOR',group+' row-major provenance '+i);
   ck(curr?.native_source_audit_git_blob_sha===blob(files.source),group+' native audit pin '+i);
   if(group==='S07'){
     ck(normalized(curr.source_expression).startsWith(normalized(src.output_role+"'=")),group+' output role '+i);
     ck(curr.source_expression.includes(src.reflection+'(')&&curr.source_expression.includes('('+src.input+')'),group+' source input and reflection '+i);
     const expectedRHS=normalized(src.rhs_source_ordered.replaceAll('·','')).replaceAll('tilde','tilde');
     const actualRHS=normalized(curr.source_expression.split('=').slice(-1)[0]);
     ck(actualRHS===expectedRHS,group+' exact operand order/negation '+i);
   }else{
     ck(normalized(curr.source_expression).startsWith(normalized(src.lhs+'=')),group+' indexed LHS role '+i);
   }
  }
 }
 for(const [i,id] of ['L05-S15-V-MATRIX','L05-S15-PSI-MATRIX','L05-S15-CHI-MATRIX'].entries()){
  const cur=packet.rows.find(x=>x.formula_id===id),old=prior.rows.find(x=>x.formula_id===id),s=source.source_expression_rows.eq9_three_row_multirepresentation[i];
  ck(!!cur&&!!old&&!!s,'Eq9 row exists '+i);
  ck(cur?.historical_mnemonic_not_source_verbatim===old?.source_expression,'Eq9 prior mnemonic preserved as non-verbatim '+i);
  ck(cur?.source_expression===s.output+': '+s.division_index+' ~ '+s.clifford,'Eq9 independently frozen ordered index equations '+i);
  ck(cur?.source_exact_index_presentations?.division_index===s.division_index&&cur?.source_exact_index_presentations?.clifford_index===s.clifford,'Eq9 coefficient and Clifford carried exactly '+i);
  ck(cur?.native_source_audit_git_blob_sha===blob(files.source),'Eq9 native audit ref '+i);
  ck(cur?.source_test_boundary==='SOURCE_REPRESENTATION_CORRESPONDENCE_NOT_QUALIFIED_EQUIVALENCE','Eq9 not false equality '+i);
 }
 const u=packet.rows.find(x=>x.formula_id==='L05-S19-V-EXACT');
 ck(u?.source_expression?.includes('U v U^-'),'source U-minus not imported inverse');
 ck(packet.open_correctness_obligations?.some(x=>x.includes('Cold source review')),'source-cold review remains explicit');
 return e;
}
const errors=evaluate();
const mutants=[
 ['transpose Eq7 row ordinal',p=>{const g=p.rows.filter(x=>x.assertion_group==='S07');let x=g[1].published_row_id;g[1].published_row_id=g[2].published_row_id;g[2].published_row_id=x;}],
 ['shift Eq7 output roles',p=>{p.rows.find(x=>x.formula_id==='L05-S07-E07-02').source_expression="psi'=R_m^u(chi)";}],
 ['erase Eq7 conjugation order',p=>{p.rows.find(x=>x.formula_id==='L05-S07-E07-02').source_expression="v'=R_m^u(chi)=sqrt(s_u) tilde(u) tilde(chi)";}],
 ['drop Eq7 negative source sign',p=>{p.rows.find(x=>x.formula_id==='L05-S07-E07-01').source_expression="v'=R_v^u(v)=s_u u tilde(v) u";}],
 ['swap Eq8 matrix rows',p=>{p.rows.find(x=>x.formula_id==='L05-S08-E08-04').published_row_id='E8-07';}],
 ['mix Eq8 Gamma and barGamma',p=>{p.rows.find(x=>x.formula_id==='L05-S08-E08-03').published_source_rhs='barGamma interchangeable';}],
 ['swap Eq9 indexed Clifford roles',p=>{p.rows.find(x=>x.formula_id==='L05-S15-V-MATRIX').source_exact_index_presentations.clifford_index='Gamma interchange';}],
 ['erase Eq9 indexed M operand',p=>{p.rows.find(x=>x.formula_id==='L05-S15-PSI-MATRIX').source_expression='psi result by M convention';}],
 ['drop Eq9 mnemonic lineage',p=>{delete p.rows.find(x=>x.formula_id==='L05-S15-CHI-MATRIX').historical_mnemonic_not_source_verbatim;}],
 ['convert source minus to inverse',p=>{p.rows.find(x=>x.formula_id==='L05-S19-V-EXACT').source_expression="v'=U v inverse(U)";}],
 ['remove negative source record',p=>{p.rows=p.rows.filter(x=>x.formula_id!=='L05-S13-DIFFERENT');}],
 ['declare source semantic authority',p=>{p.authority=true;p.status='QUALIFIED';}],
 ['erase source-cold block',p=>{p.open_correctness_obligations=[];}],
 ['modify unaffected row',p=>{p.rows[0].source_expression='new meaning';}]
];
for(const [name,mutate] of mutants){let p=copy(candidate);mutate(p);if(evaluate(p).length===0)errors.push('adversarial mutation escaped '+name)}
console.log(JSON.stringify({schema:'isograph.exp062-verify-l05-section3-ledger-printed-rows.v0.2',pass:errors.length===0,errors,source_rows:70,Eq7:9,Eq8:9,Eq9_indexed:3,unaltered_other_rows:49,adversarial_mutations_rejected:mutants.length,source_census_frozen:false,qualified_authority:false},null,2));
if(errors.length)process.exitCode=1;