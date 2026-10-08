import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const p={old:L+'SOURCE_SEMANTIC_CENSUS_0_15.json',current:L+'SOURCE_SEMANTIC_CENSUS_0_16.json',packet:L+'LISI_L05_F4_EQ17_SOURCE_G0_0_1.json',verifier:E+'tools/verify-l-g0-l05-f4-eq17-source-0-1.mjs',defect:E+'L133_EQ17_PSI_CONJUGATION_SOURCE_FIDELITY_DEFECT_0_1.json',gate:E+'L_CURRENT_STAGE_GATE_0_16.json'};
const get=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const old=get(p.old),cur=get(p.current),src=get(p.packet),gate=get(p.gate);
const oldGap="The printed ordinary O table contradiction e6*e7=-e2 AND e7*e6=-e2 and Eq.(5) Γ/M index defects remain intact. Source §4.3 beyond Eq.(16), including Eq.(17) and all primitive reductions, remains OPEN.";
const newGap="The printed ordinary O table contradiction e6*e7=-e2 AND e7*e6=-e2 remains intact; Eq.(5) source Γ/M indices are now transcribed in a separate G0 packet, but its printed ordinary-O mathematical source inconsistency and primitive-domain gap remain open. Source §4.3 Eq.(17) source components are now transcribed, while reflection/triality/phase expressions beyond this printed display and every primitive reduction remain OPEN.";
function check(s=cur){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)},r=s.revision||{},guard=s.guards||{};
 const o=old.items.find(x=>x.id==='L-SSC-133'),n=s.items?.find(x=>x.id==='L-SSC-133');
 const c=n?.source_expression_census||{},z=c.f4_eq17_source||{},body=n?.body||'';
 ck(s.schema==='woit-lisi.track-l.source-semantic-census.v0.16'&&s.status?.includes('G0')&&s.status?.includes('UNFROZEN'),'only L G0 source candidate');
 ck(s.items?.length===191&&s.item_count===191&&j(s.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'every one of 191 source identity roles exactly conserved');
 ck(j(s.items.filter((v,i)=>j(v)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-133']),'only one source census obligation revised');
 ck(old.items.filter(x=>x.id!=='L-SSC-133').every(x=>j(x)===j(s.items.find(y=>y.id===x.id))),'190 unrelated source items are fully byte-equivalent as JSON');
 ck(r.id==='L_SSC_0_16_L133_F4_EQ17_SOURCE_LITERALS_G0'&&r.predecessor_path===p.old&&r.predecessor_git_blob_sha===sha(p.old)&&r.unchanged_source_items===190&&j(r.changed_source_items)===j(['L-SSC-133']),'precise parent census conservation');
 ck(r.source_packet?.path===p.packet&&r.source_packet?.git_blob_sha===sha(p.packet),'exact source Eq17 packet SHA');
 ck(r.source_adversarial_verifier?.path===p.verifier&&r.source_adversarial_verifier?.git_blob_sha===sha(p.verifier),'exact source Eq17 verifier SHA');
 ck(r.source_fidelity_defect?.path===p.defect&&r.source_fidelity_defect?.git_blob_sha===sha(p.defect),'wrong-operand source defect still pinned');
 ck(r.predecessor_stage_gate?.path===p.gate&&r.predecessor_stage_gate?.git_blob_sha===sha(p.gate),'previous G0 gate exact dependency');
 ck(r.source_CI?.id===37846801752&&r.source_CI?.head_sha==='642189b0d929abd14ce193a23767d6d31bcc7d7b'&&r.source_CI?.source_rows===4&&r.source_CI?.diagonal_roles===3&&r.source_CI?.adversarial_rejected===29&&r.source_CI?.external_cold_review_passed===false,'independent CI exact scope');
 ck(r.source_census_frozen===false&&r.G1_authorized===false&&r.global_qualified_module_promoted===false&&r.entire_L05_source_complete===false&&r.entire_L01_L06_source_complete===false,'current source not globally qualified');
 ck(guard.section4_f4_eq17_four_components_source_transcribed===true&&guard.section4_f4_eq17_diagonal_source_roles_transcribed===true,'source expression census subsystem witnessed');
 for(const k of ['section4_f4_eq17_triality_t_t2_closed','section4_f4_eq17_reflection_source_complete','section4_f4_eq17_lie_theorem_qualified','section4_f4_and_split_cases_complete','section4_L133_source_census_complete','source_census_freeze_complete','L_G1_source_reextraction_complete','recursive_IA_authorized'])ck(guard[k]===false,'cannot evade required source closure '+k);
 ck(z.source_packet?.git_blob_sha===sha(p.packet)&&z.prior_source_fidelity_defect?.git_blob_sha===sha(p.defect),'L133 source and negative evidence pin');
 ck(j(z.eq17_source_only_components)===j(src.eq17_components)&&j(z.diagonal_source_B_roles)===j(src.diagonal_operator_source),'four Eq17 components and three B roles exact');
 ck(j(z.right_first_octonion_example)===j(src.ordered_composition_example)&&j(z.source_negative_evidence)===j(src.negative_evidence),'nonassociative right-first action and source contradictions exact');
 ck(z.CI_source_literal?.id===37846801752&&z.CI_source_literal?.adversarial_rejected===29&&z.CI_source_literal?.external_cold_review_passed===false,'source CI witness inside SSC');
 for(const k of ['source_Section4_3_complete','source_triality_t_primitive_complete','source_f4_lie_theorem_qualified','G1_authorized'])ck(z[k]===false,'no source theorem on expression '+k);
 ck(c.source_specific_qualifications_issued===false&&c.lower_primitive_reduction==='NOT_COMPLETE','no imported f4 semantics');
 ck(j(c.f4_eq15_eq16_source)===j(o.source_expression_census.f4_eq15_eq16_source)&&j(c.sp3_eq13_eq14_source)===j(o.source_expression_census.sp3_eq13_eq14_source),'prior source §4 expressions exactly retained');
 ck(c.unexpanded_other_section4?.length===8&&c.unexpanded_other_section4[6]?.id==='L4-OTHER-07'&&c.unexpanded_other_section4[6].status.includes('REFLECTION_T_PHASE_AND_ALL_LATER_OPEN'),'remaining dependency family not erased');
 ck(o.body.includes(oldGap)&&!body.includes(oldGap)&&body.includes(newGap),'superseded G0 research gap status corrected, not silently retained');
 const base=o.body.replace(oldGap,newGap);
 ck(body.startsWith(base+' '),'every old author-positive expression reconstructed unmodified, only G0 status clause corrected');
 for(const v of src.eq17_components)ck(body.includes(v.id+': '+v.lhs+' = '+v.rhs),'Eq17 complete literal G0 source body '+v.id);
 for(const v of src.diagonal_operator_source)ck(body.includes(v.id+': '+v.lhs+' = '+(v.rhs??(v.rhs_1+' = '+v.rhs_2))),'all ordered B diagonal operators in body '+v.id);
 ck(body.includes(src.ordered_composition_example.source_formula)&&body.includes('FIRST-operand conjugation')&&body.includes('t and t² are unresolved'),'right first, correct conjugation, t unknown');
 ck(body.includes('§4.3 further printed formulas')&&body.includes('G1–G7')&&!body.includes('W-SSC-'),'no hidden global source closure or cross-author import');
 ck(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.G0_source_census_frozen===false,'prior stage ordering remained lawful');
 return errors;
}
const baseline=check(),errors=[...baseline],muts=[];
for(let i=0;i<4;i++)muts.push(['alter Eq17 source bracket '+(i+1),s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq17_source.eq17_source_only_components[i].rhs='WRONG'}]);
for(let i=0;i<3;i++)muts.push(['erase diagonal role '+(i+1),s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq17_source.diagonal_source_B_roles[i].lhs='WRONG'}]);
muts.push(
 ['delete SSC L133',s=>{s.items=s.items.filter(x=>x.id!=='L-SSC-133')}],
 ['make L127 source disappear',s=>{s.items.find(x=>x.id==='L-SSC-127').body='gone'}],
 ['forget O source previous contradiction',s=>{s.items.find(x=>x.id==='L-SSC-125').body='mathematically repaired'}],
 ['erase B3 source in body',s=>{s.items.find(x=>x.id==='L-SSC-133').body=s.items.find(x=>x.id==='L-SSC-133').body.replace('L4-EQ17-B3:','OMITTED:')}],
 ['invert psi conjugation',s=>{s.items.find(x=>x.id==='L-SSC-133').body=s.items.find(x=>x.id==='L-SSC-133').body.replace('tilde(psi1)*psi2','psi1*tilde(psi2)')}],
 ['erase t2 missing primitive',s=>{s.guards.section4_f4_eq17_triality_t_t2_closed=true}],
 ['erase unresolved reflections',s=>{s.guards.section4_f4_eq17_reflection_source_complete=true}],
 ['promote f4 algebra theorem',s=>{s.guards.section4_f4_eq17_lie_theorem_qualified=true}],
 ['promote G1',s=>{s.revision.G1_authorized=true}],
 ['promote IA',s=>{s.guards.recursive_IA_authorized=true}],
 ['fabricate source complete',s=>{s.guards.source_census_freeze_complete=true}],
 ['fabricate external review',s=>{s.revision.source_CI.external_cold_review_passed=true}],
 ['wrong source packet SHA',s=>{s.revision.source_packet.git_blob_sha='STALE'}],
 ['wrong source semantic defect SHA',s=>{s.revision.source_fidelity_defect.git_blob_sha='STALE'}],
 ['wrong predecessor pin',s=>{s.revision.predecessor_git_blob_sha='STALE'}],
 ['erase previous f4 Eq15',s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq15_eq16_source.eq16.brackets=[]}],
 ['import W semantics',s=>{s.items.find(x=>x.id==='L-SSC-133').body+=' W-SSC-103'}]
);
let rejected=0;
if(!baseline.length)for(const [name,modify]of muts){const s=cp(cur),prev=j(s);modify(s);if(j(s)===prev)errors.push('no-op mutation '+name);else if(check(s).length===0)errors.push('escaped mutation '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l133-ssc016-source-eq17.v0.1',pass:errors.length===0,errors,source_items:191,changed_item:'L-SSC-133',unchanged:190,source_eq17_rows:4,source_diagonal_roles:3,adversarial_defined:muts.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',source_census_frozen:false,G1_authorized:false,external_cold_review_passed:false},null,2));if(errors.length)process.exitCode=1;
