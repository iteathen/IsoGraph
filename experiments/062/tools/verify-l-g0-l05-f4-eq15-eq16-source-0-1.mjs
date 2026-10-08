import fs from 'node:fs';
const d='research/woit-lisi-isomorph/lisi/';
const S=JSON.parse(fs.readFileSync(d+'LISI_L05_F4_EQ15_EQ16_SOURCE_G0_0_1.json','utf8'));
const T=JSON.parse(fs.readFileSync(d+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json','utf8'));
const clone=x=>JSON.parse(JSON.stringify(x)),j=JSON.stringify;
const printed=[
 ['[gamma_ab,gamma_cd]','2*(n_ac*gamma_bd-n_ad*gamma_bc-n_bc*gamma_ad+n_bd*gamma_ac)'],
 ['[gamma_ab,gamma_c]','2*(-n_bc*gamma_a+n_ac*gamma_b)'],
 ['[gamma_a,gamma_b]','2*gamma_ab'],
 ['[gamma_ab,Qminus_c]','Qminus_d*(-barGamma_a*Gamma_b)^d_c'],
 ['[gamma_c,Qminus_a]','Qplus_b*(Gamma_c)^b_a'],
 ['[gamma_ab,Qplus_c]','Qplus_d*(-Gamma_a*barGamma_b)^d_c'],
 ['[gamma_c,Qplus_b]','Qminus_a*(-barGamma_c)^a_b'],
 ['[Qminus_a,Qminus_b]','gamma_cd*(MP_barGamma^c*Gamma^d)_ab'],
 ['[Qminus_a,Qplus_b]','gamma_c*(MP_barGamma^c)_ab'],
 ['[Qplus_a,Qplus_b]','gamma_cd*(MP_Gamma^c*barGamma^d)_ab']
];
const split=[
 ['[Qminus_a,Qplus_b]','gamma_c*(-barGamma^c)_ab'],
 ['[Qminus_a,Qminus_b]','gamma_cd*(+barGamma^c*Gamma^d)_ab'],
 ['[Qplus_a,Qplus_b]','gamma_cd*(+Gamma^c*barGamma^d)_ab']
];
const eq15matrix=[['B_M','-tilde(v)','psi'],['v','B_P','-tilde(chi)'],['-tilde(psi)','chi','B_V']];
const matrixTable=T.basis_multiplication_tables.find(x=>x.carrier==='O');
function check(s=S,t=T){
 const errs=[],ck=(b,msg)=>{if(!b)errs.push(msg)};
 const o=t.basis_multiplication_tables?.find(x=>x.carrier==='O');
 ck(s.schema==='isograph.lisi-l05-f4-eq15-eq16-g0-source.v0.1'&&s.track==='L'&&s.stage==='G0'&&s.authority===false&&s.G1_authorized===false&&s.source_census_frozen===false&&s.source_complete===false,'only L G0 unfinished scope');
 ck(s.source?.id==='L05'&&s.source?.section==='4.3'&&j(s.source?.printed_pages)===j([17,18])&&j(s.source?.equations)===j(['15','16']),'frozen article version and source locations');
 ck(s.eq15?.sum==='A(B,v,psi,chi)=B^{ab}*gamma_ab/2+v^a*gamma_a+psi^a*Qminus_a+chi^a*Qplus_a'&&j(s.eq15?.matrix)===j(eq15matrix),'Eq15 ordered source carrier');
 ck(s.eq15?.printed_relation==='tilde-element-of su(3,O) ~ f4'&&s.eq15?.relation_modality==='INSPIRATION_APPROXIMATE_COMPOSITIONAL_REALIZATION_NOT_LITERAL_LIE_MATRIX_MEMBERSHIP'&&s.eq15?.one_to_one_source_matrix_theorem===false,'no naïve su3-O membership');
 ck(s.eq15?.source_nonassociativity?.includes('nonassociative')&&s.eq15?.source_composition_order==='octonions multiply to their right before being multiplied by octonions from their left','right-first operator composition');
 ck(s.indices?.octonion_basis==='a,b,c,d range 0..7'&&s.indices?.bivectors?.includes('28 representatives a<b')&&s.indices?.ordinary_metric==='n_ab=delta_ab'&&s.indices?.split_metric==='nprime_ab=diag(++++----)'&&s.indices?.mp_token?.includes('printed \\mp'),'binder, metric, sign roles');
 ck(s.eq16?.brackets?.length===10&&s.eq16?.number_of_rows===10&&s.eq16.brackets.every((row,i)=>row.id==='L4-F4-EQ16-'+String(i+1).padStart(2,'0')&&j([row.lhs,row.rhs])===j(printed[i])&&row.sign_modal==='ROWS_08_TO_10_HAVE_PRINTED_MP_SIGN'),'all ten source Eq16 bracket rows ordered');
 ck(j(s.eq16?.ordinary_real_form_signs?.map(x=>[x.form,x.carrier,x.mp_selection]))===j([['f4(-52)','ordinary O','MINUS'],['f4(-20)','ordinary O','PLUS']]),'ordinary f4(-52) vs f4(-20) sign distinction');
 ck(s.eq16?.split_real_form?.form==='f4(4)'&&s.eq16?.split_real_form?.metric==='diag(++++----)'&&s.eq16?.split_real_form?.carrier==='split Oprime'&&s.eq16?.split_real_form?.sign_changes_count===3,'split f4(4) distinct branch');
 ck(s.eq16?.split_real_form?.brackets?.length===3&&s.eq16.split_real_form.brackets.every((row,i)=>row.id==='L4-F4-SPLIT-'+String(i+1).padStart(2,'0')&&j([row.lhs,row.rhs])===j(split[i])),'three printed split sign rows');
 ck(s.eq16?.split_real_form?.warning?.includes('not interchangeable with ordinary f4(-20)'),'split vs noncompact H real form not conflated');
 ck(s.eq16?.canonical_triality_condition?.includes('match Killing form'),'conditional source requirement preserved');
 ck(s.preserved_source_negative_evidence?.general_clifford_indices_unclosed===true&&s.preserved_source_negative_evidence?.no_octonion_naive_matrix_commutator===true&&s.preserved_source_negative_evidence?.no_premature_G3_CORE_CLOSED===true&&s.preserved_source_negative_evidence?.no_cross_track_semantics===true,'primitive/source firewalls');
 ck(o?.entries?.[6]?.[7]==='-e2'&&o?.entries?.[7]?.[6]==='-e2'&&s.preserved_source_negative_evidence?.octonion_table_source_conflict?.includes('e7*e6=-e2'),'exact contradictory O signs preserved');
 ck(s.open_scope?.some(x=>x.includes('Eq.(17)'))&&s.open_scope?.some(x=>x.includes('Γ/M-index'))&&s.source?.scope_note?.includes('not audited'),'explicit source remainder');
 ck(s.source_claims_are_qualified_theorems===false&&s.external_cold_review_passed===false,'external cold review not passed and theorem not qualified');
 return errs;
}
const baseline=check(),errors=[...baseline],muts=[];
for(let i=0;i<10;i++)muts.push(['Eq16 row '+(i+1),(s,t)=>{s.eq16.brackets[i].rhs='WRONG'}]);
for(let i=0;i<3;i++)muts.push(['split row '+(i+1),(s,t)=>{s.eq16.split_real_form.brackets[i].rhs='WRONG'}]);
muts.push(
 ['omit Eq15 minus sign',(s,t)=>{s.eq15.matrix[0][1]='tilde(v)'}],
 ['pretend associative',(s,t)=>{s.eq15.one_to_one_source_matrix_theorem=true}],
 ['swap composition order',(s,t)=>{s.eq15.source_composition_order='left before right'}],
 ['plus/minus collapse',(s,t)=>{s.eq16.ordinary_real_form_signs[1].mp_selection='MINUS'}],
 ['merge split real form',(s,t)=>{s.eq16.split_real_form.form='f4(-20)'}],
 ['alter split metric',(s,t)=>{s.indices.split_metric='diag(--------)'}],
 ['change octonion source printed cell',(s,t)=>{t.basis_multiplication_tables.find(x=>x.carrier==='O').entries[7][6]='e2'}],
 ['erase Eq17 remainder',(s,t)=>{s.open_scope=s.open_scope.filter(x=>!x.includes('Eq.(17)'))}],
 ['qualified group imported',(s,t)=>{s.source_claims_are_qualified_theorems=true}],
 ['authorize G1',(s,t)=>{s.G1_authorized=true}],
 ['fabricate external audit',(s,t)=>{s.external_cold_review_passed=true}],
 ['delete nonassociativity',(s,t)=>{s.eq15.source_nonassociativity='ASSOCIATIVE'}],
 ['drop f4 root triality condition',(s,t)=>{s.eq16.canonical_triality_condition='automatic'}]
);
let rejected=0;
if(!baseline.length)for(const [label,fn]of muts){const s=clone(S),t=clone(T),previous=j([s,t]);fn(s,t);if(j([s,t])===previous)errors.push('no-op mutation '+label);else if(check(s,t).length===0)errors.push('escaped mutation '+label);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-f4-eq15-eq16-source.v0.1',pass:errors.length===0,errors,source_eq16_brackets:10,split_sign_brackets:3,adversarial_cases_defined:muts.length,adversarial_cases_rejected:rejected,adversarial_gate:baseline.length===0?'TESTED':'UNTESTED_BASELINE_FAILURE',finite_octonion_lie_algebra_tests:'NOT_RUN_SOURCE_EQ1_INCONSISTENCY_AND_COMPOSITIONAL_ROLE_GAP',source_complete:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
