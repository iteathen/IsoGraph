import fs from 'node:fs';
import crypto from 'node:crypto';

const base='research/woit-lisi-isomorph/lisi/';
const exp='experiments/062/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const old=read(base+'SOURCE_SEMANTIC_CENSUS_0_4.json');
const current=read(base+'SOURCE_SEMANTIC_CENSUS_0_5.json');
const sourceAudit=read(exp+'L_G0_L05_SECTION3_SOURCE_ASSERTION_REOPEN_AUDIT_0_3.json');
const defect=read(exp+'L_G0_L05_SOURCE_CENSUS_OMISSION_DEFECT_0_3.json');
const copy=x=>JSON.parse(JSON.stringify(x));
const j=x=>JSON.stringify(x);
const assigned={
 'L-SSC-129':['E6-01','E6-02','E7-30','E7-31','E7-32'],
 'L-SSC-130':['E6-04','E7-00','E7-10','E7-20',...Array.from({length:9},(_,i)=>'E7-'+String(i+1).padStart(2,'0')),...Array.from({length:9},(_,i)=>'E8-'+String(i+1).padStart(2,'0'))],
 'L-SSC-131':['E7-40','E9-20','E9-21','E9-22','E9-23','E9-30','E9-31','E9-32','E9-33','E9-01','E9-02','E9-03'],
 'L-SSC-132':['E6-03','E9-40','E9-41','E9-42','E9-43']
};
const expected7=[
['v','R_v^u','v','-s_u·u·tilde(v)·u'],
['v','R_m^u','chi','sqrt(s_u)·tilde(chi)·tilde(u)'],
['v','R_p^u','psi','sqrt(s_u)·tilde(u)·tilde(psi)'],
['psi','R_v^u','chi','sqrt(s_u)·tilde(u)·tilde(chi)'],
['psi','R_m^u','psi','-s_u·u·tilde(psi)·u'],
['psi','R_p^u','v','sqrt(s_u)·tilde(v)·tilde(u)'],
['chi','R_v^u','psi','sqrt(s_u)·tilde(psi)·tilde(u)'],
['chi','R_m^u','v','sqrt(s_u)·tilde(u)·tilde(v)'],
['chi','R_p^u','chi','-s_u·u·tilde(chi)·u']
];
const expected8=[
['gamma'_c','R_v^u','(delta^a_c - 2 s_u u^a u_c) gamma_a'],
["gamma'_c",'R_m^u','sqrt(s_u) u^a (Gamma_a)^b_c Q^+_b'],
["gamma'_c",'R_p^u','sqrt(s_u) u^b (barGamma_b)^a_c Q^-_a'],
["(Q^-_a)'",'R_v^u','sqrt(s_u) u^c (barGamma_c)^b_a Q^+_b'],
["(Q^-_a)'",'R_m^u','(delta^b_a - 2 s_u u^b u_a) Q^-_b'],
["(Q^-_a)'",'R_p^u','sqrt(s_u) u^c (Gamma_c)^b_a gamma_b'],
["(Q^+_b)'",'R_v^u','sqrt(s_u) u^c (Gamma_c)^a_b Q^-_a'],
["(Q^+_b)'",'R_m^u','sqrt(s_u) u^c (barGamma_c)^a_b gamma_a'],
["(Q^+_b)'",'R_p^u','(delta^a_b - 2 s_u u^a u_b) Q^+_a']
];
function verify(doc,sa=sourceAudit) {
 const errors=[],check=(b,msg)=>{if(!b)errors.push(msg)};
 const same=(a,b)=>j(a)===j(b);
 check(doc.item_count===191&&doc.items?.length===191,'census total must be 191');
 check(same(doc.items?.map(x=>x.id),old.items.map(x=>x.id)),'census item identity/order drift');
 check(doc.status?.includes('NOT_FROZEN')&&doc.guards?.source_census_freeze_complete===false,'premature G0 freeze');
 check(doc.guards?.L_G1_source_reextraction_complete===false&&doc.guards?.L132_replay_authorized===false,'premature dependent routing');
 check(doc.revision?.certification==='NOT_QUALIFIED_NOT_FROZEN','false qualification');
 const rows=[...(sa.source_expression_rows?.eq7_division_actions||[]),...(sa.source_expression_rows?.eq8_clifford_index_actions||[]),...(sa.source_expression_rows?.eq9_three_row_multirepresentation||[]),...(sa.source_expression_rows?.other_source_assertions||[])];
 const map=new Map(rows.map(x=>[x.id,x]));
 check(rows.length===44&&map.size===44,'G0 row count / duplicate source assertion');
 check(sa.obligations?.length===26,'G0 source obligations truncated');
 let unchanged=0;const itemMap=new Map((doc.items||[]).map(x=>[x.id,x]));
 for(const p of old.items){
   const q=itemMap.get(p.id);
   if(!q){errors.push('lost source item '+p.id);continue}
   if(!assigned[p.id]){if(same(q,p))unchanged++;else errors.push('unaffected source item drift '+p.id);continue}
   const reconstructed=copy(q);delete reconstructed.source_expression_census;
   check(same(reconstructed,p),'old source body/provenance drift '+p.id);
   const ext=q.source_expression_census||{};
   check(ext.source_audit?.git_blob_sha===blob(exp+'L_G0_L05_SECTION3_SOURCE_ASSERTION_REOPEN_AUDIT_0_3.json'),'source audit hash mismatch '+p.id);
   check(same(ext.source_relation_ids,assigned[p.id]),'exact source occurrence assignment '+p.id);
   check(ext.source_assertion_rows?.length===assigned[p.id].length,'semantic assertion count '+p.id);
   check(same(ext.source_assertion_rows,assigned[p.id].map(x=>map.get(x))),'source assertion byte-for-byte reconstruction '+p.id);
   check(ext.proof_status==='SOURCE_ASSERTIONS_RECORDED_NO_INDEPENDENT_THEOREM_PROVED','hypothesis/source conflation '+p.id);
 }
 check(unchanged===187,'187 unrelated source records must be byte-for-byte untouched');
 const r7=sa.source_expression_rows?.eq7_division_actions||[];
 const r8=sa.source_expression_rows?.eq8_clifford_index_actions||[];
 const r9=sa.source_expression_rows?.eq9_three_row_multirepresentation||[];
 for(let i=0;i<9;i++){
   const a=r7[i],b=r8[i],expectedId='E7-'+String(i+1).padStart(2,'0');
   check(a?.id===expectedId&&same([a.output_role,a.reflection,a.input,a.rhs_source_ordered],expected7[i]),'Eq7 source role/order failure '+expectedId);
   const idxId='E8-'+String(i+1).padStart(2,'0');
   check(b?.id===idxId&&same([b.lhs,b.reflection,b.rhs_latex_transcription],expected8[i]),'Eq8 index/basis/transpose failure '+idxId);
 }
 check(same(r9.map(x=>x.output),["v'","psi'","chi'"]),'Eq9 role outputs');
 check(r9[0]?.clifford?.endsWith('Q^-_f'),'source-written Qminus must not be normalized');
 check(r9[1]?.clifford?.includes('Q^+_f'),'Eq9 positive spinor indexed carrier');
 check(r9[2]?.clifford?.endsWith('gamma_c'),'Eq9 vector indexed carrier');
 check(r9.every(x=>x.transport==='SIMILARITY_TILDE_OR_ROLE'),'Eq9 source similarity not identity');
 const other=new Map((sa.source_expression_rows?.other_source_assertions||[]).map(x=>[x.id,x]));
 check(other.get('E7-20')?.modality==='SOURCE_ANTIINVARIANCE_NEGATIVE','odd anti-invariance sign');
 check(other.get('E7-40')?.terms?.some(x=>x.includes('NOT a rotation')),'missing negative nonrotation assertion');
 check(other.get('E7-30')?.condition==='T(v,psi,chi)=1 for a matched triple'&&other.get('E7-30')?.terms?.length===3,'conditional three-part duality');
 check(other.get('E7-32')?.modality==='SOURCE_EQUIVALENT_REPRESENTATIONS','source equivalence != literal identity');
 check(other.get('E9-21')?.terms?.length===5,'ordered four-way t^(uw) factorization');
 check(other.get('E9-22')?.modality==='SOURCE_GENERAL_EVEN_WORD_FACTOR_EXISTENCE','unbounded even word claim missing');
 check(other.get('E9-31')?.modality==='SOURCE_FIRST_ORDER_APPROXIMATION_ONLY'&&other.get('E9-31')?.terms?.every(s=>s.includes('≃')),'first-order approximation treated as equation');
 check(other.get('E9-30')?.terms?.some(x=>x.includes('U^-'))&&!other.get('E9-30')?.terms?.some(x=>x.includes('U^-1')),'source minus operator normalization');
 check(other.get('E9-33')?.terms?.some(x=>x.includes('t^2 R_v^B t')),'t-conjugation order mutated');
 check(other.get('E9-42')?.modality==='SOURCE_NEGATIVE_ZERO_EQUALITY','infinitesimal cancellation lost');
 check(other.get('E9-43')?.terms?.length===6,'six real/split triality presentations');
 check(!/W-SSC-|research\/woit-lisi-isomorph\/woit\//i.test(j([doc.items.filter(x=>assigned[x.id]),sa])),'W source leak');
 return errors;
}
const errors=verify(current);
const mutatedCases=[
['one Eq7 tilde reversed',(a)=>{a.source_expression_rows.eq7_division_actions[1].rhs_source_ordered='sqrt(s_u)·tilde(u)·tilde(chi)'}],
['one Eq8 chiral target altered',(a)=>{a.source_expression_rows.eq8_clifford_index_actions[2].rhs_latex_transcription=a.source_expression_rows.eq8_clifford_index_actions[2].rhs_latex_transcription.replace('Q^-_a','Q^+_a')}],
['one Eq8 barGamma dropped',(a)=>{a.source_expression_rows.eq8_clifford_index_actions[2].rhs_latex_transcription=a.source_expression_rows.eq8_clifford_index_actions[2].rhs_latex_transcription.replace('barGamma','Gamma')}],
['source negative forgotten',(a)=>{a.source_expression_rows.other_source_assertions.find(x=>x.id==='E7-40').terms[1]='different type -> rotation'}],
['approximation made exact',(a)=>{a.source_expression_rows.other_source_assertions.find(x=>x.id==='E9-31').modality='SOURCE_EXACT_EQUALITY'}],
['U minus normalized',(a)=>{a.source_expression_rows.other_source_assertions.find(x=>x.id==='E9-30').terms[1]='R_v^B(v)=U v U^-1'}],
['source similarity made identity',(a)=>{a.source_expression_rows.eq9_three_row_multirepresentation[0].transport='IDENTICAL_CARRIER'}],
['wrong Eq9 source Qminus',(a)=>{a.source_expression_rows.eq9_three_row_multirepresentation[0].clifford=a.source_expression_rows.eq9_three_row_multirepresentation[0].clifford.replace('Q^-_f','gamma_f')}],
['missing source denominator',(a)=>{a.source_expression_rows.other_source_assertions.find(x=>x.id==='E7-30').terms[0]='v=tilde(psi chi)'}]
];
const rejected=[];
for(const [label,mutate] of mutatedCases){
 const trial=copy(sourceAudit);mutate(trial);
 const packet=copy(current);const auditMap=new Map([...trial.source_expression_rows.eq7_division_actions,...trial.source_expression_rows.eq8_clifford_index_actions,...trial.source_expression_rows.eq9_three_row_multirepresentation,...trial.source_expression_rows.other_source_assertions].map(x=>[x.id,x]));
 for(const item of packet.items)if(assigned[item.id])item.source_expression_census.source_assertion_rows=assigned[item.id].map(id=>auditMap.get(id));
 if(verify(packet,trial).length)rejected.push(label);else errors.push('adversarial escape '+label);
}
const result={schema:'isograph.exp062-l-g0-l05-expression-census-verifier.v0.1',pass:errors.length===0,errors,source_items:current.item_count,unchanged_items:187,source_assertion_rows:44,eq7:9,eq8:9,eq9:3,other:23,mutation_tests_rejected:rejected.length,mutations:rejected,source_external_review:'OWNER_BYPASSED_NOT_PASSED',certification:'SOURCE_CENSUS_CANDIDATE_ONLY_NOT_G0_COMPLETENESS'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
