import fs from 'node:fs';
import crypto from 'node:crypto';

const dir='research/woit-lisi-isomorph/lisi/';
const data='experiments/062/';
const get=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=get(dir+'SOURCE_SEMANTIC_CENSUS_0_2.json');
const candidate=get(dir+'SOURCE_SEMANTIC_CENSUS_0_4.json');
const audit=get(dir+'LISI_SSC_SOURCE_CORRECTION_0_4.json');
const defect=get(data+'L_G0_L05_SOURCE_CENSUS_OMISSION_DEFECT_0_3.json');
const source=get(data+'L_G0_L05_SECTION3_SOURCE_ASSERTION_REOPEN_AUDIT_0_2.json');
const clone=x=>JSON.parse(JSON.stringify(x));
const j=x=>JSON.stringify(x);
const requiredIDs=['L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132'];

function verify(next) {
 const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};
 check(old.items.length===191&&old.item_count===191,'frozen predecessor unexpectedly mutated');
 check(next.items?.length===191&&next.item_count===191,'total source assertion count');
 const oldIds=old.items.map(x=>x.id),newIds=(next.items||[]).map(x=>x.id);
 check(j(oldIds)===j(newIds)&&new Set(newIds).size===191,'source census IDs not conserved');
 check(next.status?.includes('NOT_FROZEN')&&next.guards?.source_census_freeze_complete===false,'candidate falsely frozen');
 check(next.guards?.recursive_IA_authorized===false&&next.guards?.global_L_G7_closed===false,'premature IA/G7');
 check(next.conservation_audit==='LISI_SSC_SOURCE_CORRECTION_0_4.json','wrong source audit');
 const changes=new Map(audit.changes.map(x=>[x.id,x]));
 check(j([...changes.keys()])===j(requiredIDs),'changed-set mismatch');
 for(let i=0;i<old.items.length;i++) {
   const p=old.items[i],q=next.items?.[i],delta=changes.get(p.id);
   if(!q){errors.push('missing source '+p.id);continue}
   if(!delta)check(j(q)===j(p),'unchanged source drift '+p.id);
   else {
     check(q.id===p.id,'changed source ID drift '+p.id);
     check(q.source_disposition_hint===p.source_disposition_hint,'changed source polarity drift '+p.id);
     check(q.body===delta.after_body&&q.body.startsWith(p.body+' '),'changed source body not additively conserved '+p.id);
     check(q.source_provenance===delta.new_source_provenance,'source provenance mismatch '+p.id);
   }
 }
 const byId=new Map((next.items||[]).map(x=>[x.id,x]));
 const body=id=>byId.get(id)?.body||'';
 check(body('L-SSC-129').includes('T(v,psi,chi)=1')&&body('L-SSC-129').includes('inverse squared product norms')&&body('L-SSC-129').includes('non-unit'),'L129 conditions/denominator/non-unit scope omitted');
 check(body('L-SSC-130').includes('R^u A=(u gamma) A (u gamma)^-')&&body('L-SSC-130').includes('arbitrary Clifford element'),'L130 source Clifford adjoint omitted');
 check(body('L-SSC-131').includes('U=exp(B/2)')&&body('L-SSC-131').includes('U v U^-')&&!body('L-SSC-131').includes('v=U v U^-1'),'L131 source minus-superscript wrongly normalized');
 check(body('L-SSC-131').includes('Psi\'=R_v^B Psi=U Psi')&&body('L-SSC-131').includes('first-order (approximately-equal, not exact)'),'vector/spinor exact/approx modality omitted');
 check(body('L-SSC-131').includes('B_m and B_p')&&body('L-SSC-131').includes('R_m^B=t^2 R_v^B t')&&body('L-SSC-131').includes('R_p^B=t R_v^B t^2'),'source B-block / conjugation order omitted');
 check(body('L-SSC-132').includes('three-position infinitesimal condition')&&body('L-SSC-132').includes('T(Rv,psi,chi)+T(v,Rpsi,chi)+T(v,psi,Rchi)=0'),'L132 T-derivative omitted');
 return errors;
}
const errors=verify(candidate);
const osha=gitsha(dir+'SOURCE_SEMANTIC_CENSUS_0_2.json');
const dsha=gitsha(data+'L_G0_L05_SOURCE_CENSUS_OMISSION_DEFECT_0_3.json');
if(audit.predecessor?.git_blob_sha!==osha)errors.push('old census git blob pin stale');
if(audit.defect_0_3?.git_blob_sha!==dsha)errors.push('defect git blob pin stale');
if(defect.additional_correction?.source_literal_operator!=='superscript minus on U and u gamma')errors.push('source operator defect not pinned');
const s19=source.source_expressions_newly_required.find(x=>x.id==='S19');
if(!s19||j(s19.exact).includes('"INVERSE"')||!j(s19.exact).includes('"SOURCE_SUPERSCRIPT_MINUS"'))errors.push('source audit still equates printed minus with inverse');
const alterations=[
 ['drop identity',(x)=>{x.items.pop()}],
 ['shift one item ID',(x)=>{x.items[130].id='L-SSC-132'}],
 ['drop denominator',(x)=>{x.items.find(y=>y.id==='L-SSC-129').body='generic recovery'}],
 ['omit Clifford adjoint',(x)=>{x.items.find(y=>y.id==='L-SSC-130').body='reflections'}],
 ['replace U^- by U^-1',(x)=>{let y=x.items.find(y=>y.id==='L-SSC-131');y.body=y.body.replace('U v U^-','U v U^-1')}],
 ['swap conjugation powers',(x)=>{let y=x.items.find(y=>y.id==='L-SSC-131');y.body=y.body.replace('R_p^B=t R_v^B t^2','R_p^B=t^2 R_v^B t')}],
 ['drop infinitesimal third term',(x)=>{let y=x.items.find(y=>y.id==='L-SSC-132');y.body=y.body.replace('+T(v,psi,Rchi)','')}],
 ['source omission but counts preserved',(x)=>{let y=x.items.find(y=>y.id==='L-SSC-131');y.body=y.body.replace('U=exp(B/2)','U=DEFINED_ELSEWHERE')}],
 ['false freeze',(x)=>{x.guards.source_census_freeze_complete=true;x.status='FROZEN_COMPLETE'}]
];
const rejected=[];
for(const [label,modify] of alterations){const test=clone(candidate);modify(test);if(verify(test).length)rejected.push(label);else errors.push('mutation escaped '+label)}
const result={schema:'isograph.exp062-l-g0-l05-source-census-candidate-verifier.v0.1',pass:errors.length===0,errors,source_census_records:candidate.items.length,conserved_unchanged_records:187,expanded_source_records:requiredIDs,mutation_controls_rejected:rejected.length,mutation_controls:rejected,status:'CANDIDATE_CONSERVATION_ONLY_NO_FULL_SOURCE_CLOSURE_NO_EXTERNAL_REVIEW'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
