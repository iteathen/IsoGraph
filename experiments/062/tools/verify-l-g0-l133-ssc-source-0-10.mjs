import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const files={
 old:root+'SOURCE_SEMANTIC_CENSUS_0_9.json',
 next:root+'SOURCE_SEMANTIC_CENSUS_0_10.json',
 audit:exp+'L_G0_L05_SECTION4_L133_SOURCE_EXPRESSION_AUDIT_0_1.json',
 defect:exp+'L_G0_L05_SECTION4_L133_SOURCE_FIDELITY_DEFECT_0_1.json'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const clone=x=>JSON.parse(JSON.stringify(x)),json=x=>JSON.stringify(x);
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=load(files.old),current=load(files.next),audit=load(files.audit),src=audit.source_specific;
function check(S=current){
const e=[],ck=(b,m)=>{if(!b)e.push(m)};
const before=old.items.find(x=>x.id==='L-SSC-133'),now=S.items.find(x=>x.id==='L-SSC-133'),r=now?.source_expression_census||{};
ck(S.item_count===191&&S.items.length===191,'all 191 prior items conserved');
ck(json(S.items.map(x=>x.id))===json(old.items.map(x=>x.id)),'all 191 source identities/order exactly conserved');
ck(json(S.items.filter((x,i)=>json(x)!==json(old.items[i])).map(x=>x.id))===json(['L-SSC-133']),'only L133 changed');
ck(S.status?.includes('UNFROZEN')&&S.guards?.source_census_freeze_complete===false&&S.guards?.L132_replay_authorized===false,'no source freeze or stale replay');
ck(S.guards?.section4_L133_source_census_complete===false&&S.guards?.section4_f4_and_split_cases_complete===false,'section4 unresolved');
ck(S.revision?.predecessor_git_blob_sha===sha(files.old),'exact predecessor source SSC pin');
ck(S.revision?.source_expression_audit?.git_blob_sha===sha(files.audit),'source audit pin');
ck(S.revision?.source_fidelity_defect?.git_blob_sha===sha(files.defect),'source defect pin');
ck(S.revision?.G1_authorized===false&&S.revision?.section4_full_source_complete===false,'stage and section4 boundary');
ck(now?.body?.startsWith(before.body+' '),'L133 old body preserved as exact prefix');
ck(r.source_expression_audit?.git_blob_sha===sha(files.audit)&&r.source_defect?.git_blob_sha===sha(files.defect),'source semantic occurrence provenance');
ck(r.lower_primitive_reduction==='NOT_COMPLETE'&&r.source_specific_qualifications_issued===false,'no imported Lie/group closure');
const componentsC=r.su3_commutator?.components||[],componentsH=r.sp3_commutator?.components||[];
const matrixC=r.su3_matrix?.first,matrixH=r.sp3_matrix?.entries;
ck(r.source_six_decompositions?.length===6,'six source decompositions');
ck(componentsC.length===5&&componentsH.length===6,'5+6 exact source bracket components');
ck(r.su3_basis_brackets?.finite_rows?.length===13&&r.su3_basis_brackets?.parameterized_rows?.length===3,'13+3 explicit source basis bracket rows');
ck(json(r.source_six_decompositions)===json(src.six_source_decompositions),'six decompositions match direct source audit');
ck(json(r.su3_matrix)===json(src.su3_matrix)&&json(r.sp3_matrix)===json(src.sp3_matrix),'source 3x3 matrices exact audit carry');
ck(json(r.su3_commutator)===json(src.su3_commutator)&&json(r.sp3_commutator)===json(src.sp3_commutator),'source 11 bracket components exact audit carry');
ck(json(r.su3_basis_brackets)===json(src.su3_basis_brackets),'basis bracket rows source audit exact');
ck(json(r.unexpanded_other_section4)===json(src.other),'all open source §4 families visible');
const body=now?.body||'';
for(const d of src.six_source_decompositions)ck(body.includes(d.source_carrier)&&body.includes(d.triality),'decomposition reconstructs '+d.id);
for(const [carrier,matrix]of [['C',matrixC],['H',matrixH]]){ck(matrix?.length===3&&matrix?.every(row=>row.length===3),'source matrix 3x3 '+carrier);for(let i=0;i<3;i++)for(const s of matrix?.[i]||[])ck(body.includes(s),'source matrix cell '+carrier+' row '+i+' ='+s);}
for(const c of [...src.su3_commutator.components,...src.sp3_commutator.components])ck(body.includes(c.id+': '+c.lhs+' = '+c.rhs),'source commutator fully reconstructable '+c.id);
for(const [x,y]of [...src.su3_basis_brackets.finite_rows,...src.su3_basis_brackets.parameterized_rows])ck(body.includes(x+'='+y),'source basis bracket reconstructable '+x);
ck(body.includes('remain unextracted')&&body.includes('Eq.(13)')&&body.includes('G0-complete or G3 CORE_CLOSED')&&r.unexpanded_other_section4?.length===8,'open source families and nonclaims');
for(const id of ['L-SSC-125','L-SSC-126','L-SSC-127','L-SSC-128','L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132'])ck(json(S.items.find(x=>x.id===id))===json(old.items.find(x=>x.id===id)),'prior corrected G0 item exact carry '+id);
ck(old.items.find(x=>x.id==='L-SSC-125').body.includes('BOTH e6 e7=-e2 and e7 e6=-e2'),'source octonion discrepancy never normalized');
ck(!json(now).includes('W-SSC-')&&!(S.guards?.whole_L_source_cold_audit_complete),'track fire wall/full-source nonclaim');
return e;
}
const errors=check();
const mutations=[
 ['erase su3 bracket component',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.su3_commutator.components.pop();}],
 ['erase sp3 bracket component',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.sp3_commutator.components.pop();}],
 ['reverse quaternion product order',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.sp3_commutator.components[3].rhs='(v2*P1-P2*v1)';}],
 ['erase complex conjugation',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.su3_matrix.first[0][1]='-v0-i*v1';}],
 ['omit one source decomposition',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.source_six_decompositions.pop();}],
 ['remove source bracket text',(s)=>{s.items.find(x=>x.id==='L-SSC-133').body=s.items.find(x=>x.id==='L-SSC-133').body.replace('L4-SP3-C6: chi3','L4-SP3-C6: omitted');}],
 ['erase root bracket',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.su3_basis_brackets.finite_rows.splice(10,1);}],
 ['remove root nonclaim',(s)=>{s.items.find(x=>x.id==='L-SSC-133').body=s.items.find(x=>x.id==='L-SSC-133').body.replace('remain unextracted','closed');}],
 ['lose source input',(s)=>{s.revision.source_expression_audit.git_blob_sha='stale';}],
 ['claim full section4',(s)=>{s.guards.section4_L133_source_census_complete=true;}],
 ['premature G1',(s)=>{s.revision.G1_authorized=true;}],
 ['overwrite SI-corrected L127',(s)=>{s.items.find(x=>x.id==='L-SSC-127').body='global qualified';}],
 ['change earlier source discrepancy',(s)=>{s.items.find(x=>x.id==='L-SSC-125').body=s.items.find(x=>x.id==='L-SSC-125').body.replace('e7 e6=-e2','e7 e6=e2');}],
 ['erase source matrix basis',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.su3_matrix.first[1][1]='0';}],
 ['claim qualified Lie module',(s)=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.source_specific_qualifications_issued=true;}]
];
for(const [label,mutate]of mutations){const s=clone(current);mutate(s);if(check(s).length===0)errors.push('escaped '+label);}
console.log(JSON.stringify({schema:'isograph.exp062-L133-SSC0_10-source-fidelity-verifier.v0.1',pass:errors.length===0,errors,source_items:191,changed_body:'L-SSC-133',unmodified_bodies:190,source_decompositions:6,source_su3_matrix_cells:9,source_sp3_matrix_cells:9,source_commutator_components:11,source_basis_brackets:16,adversarial_mutations_rejected:mutations.length,G1_authorized:false,external_verification_claimed:false},null,2));if(errors.length)process.exitCode=1;