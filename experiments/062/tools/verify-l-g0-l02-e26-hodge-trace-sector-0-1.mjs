// L-only G0: L02 v2 printed p6-8 Eq14/Eq25/Eq26 Hodge-Clifford source trace.
// Math evidence is a separately authored 21-bivector rational model, not source-universal authority.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {round,mutants} from './l02-e26-exact-math-0-1.mjs';
const ROOT='research/woit-lisi-isomorph/lisi/',EXP='experiments/062/';
const paths={
 packet:ROOT+'LISI_L02_E26_HODGE_TRACE_SECTOR_G0_0_1.json',
 previous:ROOT+'SOURCE_SEMANTIC_CENSUS_0_45.json',
 current:ROOT+'SOURCE_SEMANTIC_CENSUS_0_46.json',
 previousGate:EXP+'L_CURRENT_STAGE_GATE_0_49.json',
 gate:EXP+'L_CURRENT_STAGE_GATE_0_50.json',
 eq14:ROOT+'LISI_L02_FRAME_HIGGS_GRADED_CURVATURE_G0_0_1.json',
 hodge:ROOT+'LISI_L02_PLEBANSKI_LORENTZIAN_HODGE_AUXILIARY_G0_0_1.json',
 math:EXP+'tools/l02-e26-exact-math-0-1.mjs',
 checker:EXP+'tools/verify-l-g0-l02-e26-hodge-trace-sector-0-1.mjs'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
function sourceAudit(packet,previous,current,gate){
 const bad=[],check=(v,s)=>{if(!v)bad.push(s);};
 check(packet?.schema==='isograph.lisi-L02-E26-Hodge-trace-sector-G0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.authority===false,'L-only G0 source/provenance');
 check(packet?.source?.id==='L02'&&packet.source.revision==='arXiv:1004.4866v2'&&packet.source.printed_pages.join('|')==='6|7|8','frozen original L02 version and pages');
 check(packet?.source?.pdf_url==='https://arxiv.org/pdf/1004.4866'&&packet.source.authors.length===3,'source location/authors');
 for(const[k,p]of [['ssc045',paths.previous],['gate049',paths.previousGate],['eq14',paths.eq14],['hodgeAux',paths.hodge]]){
   check(packet?.ancestors?.[k]?.path===p&&packet.ancestors[k].git_blob_sha===blob(p),'immutable predecessor '+k);
 }
 const authoritativeLiterals={
 E14:'F=1/2*(R-1/8*SigmaPrime*phi2)+1/4*(T*phi-ePrime*Dphi)+FA',
 E25:'S(H,e)=3/(8*g)*int< F wedge star_e(F) >',
 E26:'S(H,e)=3/(8*g)*int< -phi2/16*R*star_e(SigmaPrime)+phi4/256*SigmaPrime*star_e(SigmaPrime)+1/4*R*star_e(R)+1/16*M*star_e(M)+FA*star_e(FA) >',
 E27:'Only after choosing ePrime=e and T=0, restricted component gravitational/Higgs/YM action; source does not state equality before these assumptions',
 FRAME:'star_e uses independent gravitational e; SigmaPrime=ePrime wedge ePrime uses connection frame ePrime',
 SOURCE_LIMIT:'G0 source Eq26 bilinear expansion, not a proof of universal Clifford trace, original arbitrary Spin(N), Eq27 physical normalization or complete field-equation solutions'
 };
 const source=packet?.source_equations||[];
 check(source.length===6&&new Set(source.map(x=>x.id)).size===6,'six source roles and limits');
 for(const[id,literal]of Object.entries(authoritativeLiterals))check(source.find(x=>x.id===id)?.normalized===literal,'source exact formula '+id);
 const model=packet?.model;
 check(model?.sample_N===3&&model.signature?.join('|')==='1|-1|-1|-1|1|1|1','selected N3 Clifford real signature');
 check(model?.grading==='Clifford gamma multiplication times exterior 2-form wedge; scalar Clifford grade projected only after multiplying','double-graded source');
 check(model?.coframes===6&&model.independent_seeds_per_frame===4&&model.e_equals_eprime_before_eq27===false,'independent e and eprime');
 check(model?.direct_oracle==='Exact generic Clifford product, exterior wedge and e-dependent Hodge on all 21 Lie bivectors','direct Clifford/exterior oracle');
 check(model?.independent_oracle==='Sector-diagonal metric trace coefficients -eta_i*eta_j and independently constructed 6x6 Hodge pairing','separate Gram/Hodge oracle');
 check(model?.source_rank_one_Phi_recovered===false&&model.original_all_spinN_matrix_trace_qualified===false,'no project-model source promotion');
 const m=packet?.math_evidence;
 check(m?.eq26_action_cases===24&&m.clifford_pair_tests===384&&m.Hodge_square_basis_tests===864&&m.cross_sector_zero_cases===240,'independent math case expectations');
 check(m?.math_hostiles===14&&m.source_hostiles===16,'hostile suite declaration');
 for(const id of ['source_census_frozen','original_global_spinN_action_qualified','original_E8_fermion_trace_qualified','source_Eq27_unrestricted_qualified','physical_GN_gYM_normalizations_qualified','G1_authorized','G2_G7_authorized','cross_track_comparison_authorized','recursive_IA_authorized','external_independent_theory_review_passed','author_error_proved','author_outreach_authorized','PR70_merge_authorized']){
   check(packet?.stage_locks?.[id]===false,'G0-only/no-promotions '+id);
 }
 const before=new Map((previous.items||[]).map(x=>[x.id,x])),after=new Map((current.items||[]).map(x=>[x.id,x])),changed=[];
 check(before.size===191&&after.size===191&&current.item_count===191,'191 complete source identities');
 for(const[id,old]of before){if(!after.has(id))bad.push('missing source '+id);else if(JSON.stringify(after.get(id))!==JSON.stringify(old))changed.push(id);}
 for(const id of after.keys())if(!before.has(id))bad.push('invented '+id);
 check(changed.join('|')==='L-SSC-057|L-SSC-061|L-SSC-062','188 whole unaffected source records conserved ('+changed+')');
 for(const id of changed){
  const old=before.get(id),now=after.get(id),link=now?.source_expression_census?.L02_E26_HODGE_TRACE_SECTOR_G0;
  check(now.body.startsWith(old.body),'prior source semantics preserved '+id);
  check(link?.source_packet?.path===paths.packet&&link.source_packet.git_blob_sha===blob(paths.packet),'exact linked new source packet '+id);
  check(link?.source_original_trace_normalization_qualified===false&&link.original_Eq27_physical_coefficients_qualified===false&&link.G1_authorized===false,'source uncertainty not closed '+id);
 }
 check(current?.revision?.predecessor_git_blob_sha===blob(paths.previous)&&current.revision?.source_packet?.git_blob_sha===blob(paths.packet)&&current.revision?.changed_source_items?.join('|')==='L-SSC-057|L-SSC-061|L-SSC-062','SSC046 lineage');
 check(current.guards?.source_census_freeze_complete===false&&current.guards.recursive_IA_authorized===false,'G0 unfrozen SSC');
 check(gate.track==='L'&&gate.stage==='G0'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===blob(paths.previousGate),'gate050 predecessor');
 check(gate.current_source_census?.git_blob_sha===blob(paths.current)&&gate.current_source_census.source_identities===191&&gate.current_source_census.frozen===false,'gate/SSC link');
 check(gate.current_source_packet?.git_blob_sha===blob(paths.packet)&&gate.source_verifier?.git_blob_sha===blob(paths.checker)&&gate.source_verifier.math_blob_sha===blob(paths.math),'gate checker & original math contents');
 check(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state.cross_track_synthesis_authorized===false,'G0 downstream firewall');
 check(!JSON.stringify(packet).includes('W-SSC-'),'no W imports');
 return bad;
}
const baseline=round(),issues=[...baseline.issues];
let mathRejected=0,sourceRejected=0;
for(const [name,mutator] of mutants){
 let result;try{result=round(mutator);}catch(error){issues.push('CRASHED_MATH_MUTANT '+name+':'+String(error));continue;}
 if(result.pass)issues.push('ESCAPED_MATH_MUTANT '+name);else mathRejected++;
}
if(!process.argv.includes('--math-only')){
 const packet=load(paths.packet),previous=load(paths.previous),current=load(paths.current),gate=load(paths.gate);
 issues.push(...sourceAudit(packet,previous,current,gate));
 const sourceMutants=[
 ['wrong arxiv version',p=>p.source.revision='arXiv:1004.4866v1'],
 ['Eq14 gravity prefactor wrong',p=>p.source_equations[0].normalized=p.source_equations[0].normalized.replace('1/2*','1/4*')],
 ['Eq25 on-shell action prefactor wrong',p=>p.source_equations[1].normalized=p.source_equations[1].normalized.replace('3/(8*g)','3/(4*g)')],
 ['Eq26 negative cross reversed',p=>p.source_equations[2].normalized=p.source_equations[2].normalized.replace('-phi2/16','+phi2/16')],
 ['Eq26 Phi fourth-power coefficient',p=>p.source_equations[2].normalized=p.source_equations[2].normalized.replace('phi4/256','phi4/128')],
 ['Eq26 R-squared coefficient',p=>p.source_equations[2].normalized=p.source_equations[2].normalized.replace('1/4*R','1/2*R')],
 ['Eq26 4N mixed coefficient',p=>p.source_equations[2].normalized=p.source_equations[2].normalized.replace('1/16*M','1/8*M')],
 ['Eq26 YM curvature sign',p=>p.source_equations[2].normalized=p.source_equations[2].normalized.replace('+FA*star_e(FA)','-FA*star_e(FA)')],
 ['collapse eprime and e before restricted action',p=>p.source_equations[4].normalized='ePrime=e is a source identity'],
 ['claim Eq27 without eprime=e/T=0',p=>p.source_equations[3].normalized='General all-field dynamics completed'],
 ['wrong Lorentz signature',p=>p.model.signature[1]=1],
 ['promote chosen N=3 to all SpinN',p=>p.model.original_all_spinN_matrix_trace_qualified=true],
 ['fake source predecessor hash',p=>p.ancestors.ssc045.git_blob_sha='BAD'],
 ['erase independent Hodge frame',p=>p.model.e_equals_eprime_before_eq27=true],
 ['unauthorized G1',p=>p.stage_locks.G1_authorized=true],
 ['physical coupling qualified',p=>p.stage_locks.physical_GN_gYM_normalizations_qualified=true]
 ];
 for(const [name,change] of sourceMutants){const altered=structuredClone(packet);change(altered);if(sourceAudit(altered,previous,current,gate).length)sourceRejected++;else issues.push('ESCAPED_SOURCE_MUTANT '+name);}
}
console.log(JSON.stringify({
 schema:'isograph.exp062-L02-E26-Hodge-trace-sector-G0-verifier.v0.1',
 pass:issues.length===0,issues,math:baseline,
 mathematical_mutants_defined:mutants.length,mathematical_mutants_rejected:mathRejected,
 source_mutants_defined:process.argv.includes('--math-only')?0:16,source_mutants_rejected:sourceRejected,
 source_identities:191,unchanged_source_records:188,changed_ids:['L-SSC-057','L-SSC-061','L-SSC-062'],
 all_N_trace_qualified:false,source_full_dynamics_qualified:false,G1_authorized:false,
 cross_track_semantics_available:false,independent_external_mathematical_cold_review_passed:false
},null,2));
if(issues.length)process.exitCode=1;
