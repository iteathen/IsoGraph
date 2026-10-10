// L-only source v2 G0: distinguish Eq28 zero-curvature background, scalar stationary
// potential and unqualified global "strictly minimizing" Lorentzian action.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {mathAudit,mutations} from './l02-eq28-lorentzian-minimum-scope-math-0-1.mjs';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
 packet:R+'LISI_L02_EQ28_LORENTZIAN_MINIMUM_SCOPE_G0_0_1.json',
 old:R+'SOURCE_SEMANTIC_CENSUS_0_46.json',census:R+'SOURCE_SEMANTIC_CENSUS_0_47.json',
 ancestralGate:E+'L_CURRENT_STAGE_GATE_0_51.json',oldGate:E+'L_CURRENT_STAGE_GATE_0_52.json',gate:E+'L_CURRENT_STAGE_GATE_0_53.json',
 oldEq26:R+'LISI_L02_E26_HODGE_TRACE_SECTOR_G0_0_1.json',
 oldHodge:R+'LISI_L02_PLEBANSKI_LORENTZIAN_HODGE_AUXILIARY_G0_0_1.json',
 math:E+'tools/l02-eq28-lorentzian-minimum-scope-math-0-1.mjs',
 checker:E+'tools/verify-l-g0-l02-eq28-minimum-scope-0-1.mjs'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
function audit(packet,prev,cur,gate){
 const bad=[],ck=(v,s)=>{if(!v)bad.push(s)};
 ck(packet.schema==='isograph.lisi-L02-Eq28-Lorentzian-minimum-scope-G0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.authority===false,'original L only G0 no authority');
 ck(packet.source?.id==='L02'&&packet.source.revision==='arXiv:1004.4866v2'&&JSON.stringify(packet.source.printed_pages)==='[7,8]'&&packet.source.authors.length===3,'exact frozen original source');
 const original={
 E25:'S(H,e)=3/(8*g)*int< F wedge star_e(F) >',
 E27:'S(e,phi,A)=3/(8*g)*int|e|(-phi2*R/16+3*phi4/32+R_abcd*R_cdab/16-Dphi2/2-FA2/4)',
 E28:'phi0^2=R_scalar0/3; R_twoform0=(v2/8)*Sigma0; Ricci0=(3*v2/4)*e0; R_scalar0=3*v2=4*Lambda',
 E28_VANISH:'F0=(1/2)*R_twoform0-(1/16)*Sigma0*phi0^2=0',
 AUTHOR_MIN:'Eq28 F0=0 solves Eq11 and strictly minimizes the action Eq25',
 AUTHOR_LIMIT:'Source does not explicitly delimit strict minimum to offshell Lorentzian gauge perturbations, fixed-metric compact perturbations, a Euclidean functional, positive energy, or a restricted solution/variation family.'
 };
 const eq=packet?.source?.source_equations||[];
 ck(eq.length===6&&new Set(eq.map(e=>e.id)).size===6,'all six source layers retained');
 for(const [k,v]of Object.entries(original))ck(eq.find(x=>x.id===k)?.expression===v,'original source '+k);
 for(const [k,p]of [['ssc046',paths.old],['gate051',paths.ancestralGate],['eq26',paths.oldEq26],['hodgeAux',paths.oldHodge]])
 ck(packet.parents?.[k]?.path===p&&packet.parents[k]?.git_blob_sha===blob(p),'source ancestry '+k);
 const m=packet.math_model||{};
 ck(m.signature?.join('|')==='1|-1|-1|-1|1|1|1'&&m.scope?.includes('Clifford(4,3)')&&m.unbroken_internal_u1?.includes('gamma5*gamma6'),'conditional Lorentzian Clifford source model');
 ck(m.pointwise_second_variation?.includes('opposite-sign')&&m.what_must_not_be_claimed?.includes('do not themselves prove'),'mathematical obstruction distinct source error');
 ck(packet.mathematics?.coframes===6&&packet.mathematics?.local_electric_and_magnetic_pairs===24&&packet.mathematics.twoform_Hodge_involution_checks===216,'coframes and exact tests');
 ck(packet.mathematics?.math_hostiles===14&&packet.mathematics?.source_hostiles===16,'declared adversarial coverage');
 const result=packet.result_classification||{};
 ck(result.original_vacuum_zero_curvature_from_E28==='CONFIRMED_EXACT_ALGEBRA_IN_SOURCE_SELECTED_BACKGROUND','Eq28 source-algebra yes');
 ck(result.unrestricted_Lorentzian_quadratic_local_minimum==='OBSTRUCTED_IN_SELECTED_FINITE_MODEL','project conditional sign indefinite');
 ck(result.author_strict_minimum_as_printed==='OPEN_SCOPE_UNDETERMINED'&&result.genuine_author_discrepancy_or_typo==='NOT_ESTABLISHED',"original author's global strict minimum scope is NOT declared contradicted");
 for(const k of ['source_census_frozen','source_strict_minimum_qualified','source_author_error_proved','global_offshell_variation_class_qualified','source_all_spinN_qualified','G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_synthesis_authorized','external_independent_cold_math_review_passed','author_outreach_authorized','PR70_merge_authorized'])
 ck(packet.stage_locks?.[k]===false,'no disallowed source/higher authority '+k);
 const a=new Map(prev.items.map(x=>[x.id,x])),b=new Map(cur.items.map(x=>[x.id,x])),changed=[];
 ck(a.size===191&&b.size===191&&cur.item_count===191,'complete 191 source identities');
 for(const[id,x]of a){if(!b.has(id))bad.push('lost '+id);else if(JSON.stringify(x)!==JSON.stringify(b.get(id)))changed.push(id)}
 for(const id of b.keys())if(!a.has(id))bad.push('invented '+id);
 ck(changed.join('|')==='L-SSC-061|L-SSC-063','189 whole predecessor records preserved '+changed);
 for(const id of changed){
  const old=a.get(id),updated=b.get(id),link=updated?.source_expression_census?.L02_EQ28_MINIMUM_SCOPE_G0;
  ck(updated?.body?.startsWith(old?.body||'NO_ANCESTOR'),'old source text retained '+id);
  ck(link?.source_packet?.path===paths.packet&&link.source_packet.git_blob_sha===blob(paths.packet),'current packet hash '+id);
  ck(link?.source_original_global_strict_minimum_qualified===false&&link?.source_author_error_proved===false&&link.G1_authorized===false,'source uncertainty conserved '+id);
 }
 ck(cur.revision?.predecessor_git_blob_sha===blob(paths.old)&&cur.revision?.changed_source_items?.join('|')==='L-SSC-061|L-SSC-063'&&cur.revision?.source_packet?.git_blob_sha===blob(paths.packet),'census 0.47 exact parent');
 ck(cur.guards?.source_census_freeze_complete===false&&cur.guards.recursive_IA_authorized===false,'G0 source still unfrozen');
 ck(gate.track==='L'&&gate.stage==='G0'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===blob(paths.oldGate),'0.52 gate source lineage');
 ck(gate.current_source_census?.git_blob_sha===blob(paths.census)&&gate.current_source_census.frozen===false&&gate.current_source_packet?.git_blob_sha===blob(paths.packet),'stage exact source packet');
 ck(gate.source_verifier?.git_blob_sha===blob(paths.checker)&&gate.source_verifier?.math_blob_sha===blob(paths.math),'stage verifier math hashes');
 ck(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false&&gate.current_lawful_state?.source_author_strict_minimum_scope_qualified===false,'current source not falsely closed');
 ck(!JSON.stringify(packet).includes('W-SSC-'),'no W interpretation imported');
 return bad;
}
const baseline=mathAudit(),issues=[...baseline.issues];let mathRejected=0,sourceRejected=0;
for(const[name,mutant]of mutations){let result;try{result=mathAudit(mutant);}catch(e){issues.push('CRASHED_MATH_MUTANT '+name+':'+e.message);continue}if(result.pass)issues.push('ESCAPED_MATH_MUTANT '+name);else mathRejected++;}
if(!process.argv.includes('--math-only')){
 const source=load(paths.packet),old=load(paths.old),cur=load(paths.census),gate=load(paths.gate);
 issues.push(...audit(source,old,cur,gate));
 const mutants=[
 ['wrong source revision',x=>x.source.revision='arXiv:1004.4866v1'],
 ['erase strict minimum source assertion',x=>x.source.source_equations[4].expression='F0=0 only'],
 ['rewrite source as global positivity proof',x=>x.source.source_equations[4].expression='Universal positive action proven'],
 ['wrong vacuum R factor',x=>x.source.source_equations[2].expression=x.source.source_equations[2].expression.replace('v2/8','v2/4')],
 ['wrong zero F bracket',x=>x.source.source_equations[3].expression=x.source.source_equations[3].expression.replace('1/16','1/8')],
 ['wrong action coefficient',x=>x.source.source_equations[0].expression=x.source.source_equations[0].expression.replace('3/(8*g)','3/(4*g)')],
 ['wrong Eq27 Higgs factor',x=>x.source.source_equations[1].expression=x.source.source_equations[1].expression.replace('3*phi4/32','3*phi4/16')],
 ['omit source scope unknown',x=>x.source.source_equations[5].expression='All variations admitted and author wrong'],
 ['Euclidean project model',x=>x.math_model.signature[1]=1],
 ['claim no indefinite Hessian',x=>x.result_classification.unrestricted_Lorentzian_quadratic_local_minimum='QUALIFIED_MINIMUM'],
 ['invent confirmed author typo',x=>x.result_classification.genuine_author_discrepancy_or_typo='CONFIRMED'],
 ['erase Clifford commutant source boundary',x=>x.math_model.unbroken_internal_u1='generator does not commute'],
 ['invent full SpinN theorem',x=>x.stage_locks.source_all_spinN_qualified=true],
 ['promote G1',x=>x.stage_locks.G1_authorized=true],
 ['fake original source parent',x=>x.parents.ssc046.git_blob_sha='FAKE'],
 ['remove offshell scope boundary',x=>x.stage_locks.global_offshell_variation_class_qualified=true]
 ];
 for(const[name,fn]of mutants){const m=JSON.parse(JSON.stringify(source));fn(m);if(audit(m,old,cur,gate).length)sourceRejected++;else issues.push('ESCAPED_SOURCE_MUTANT '+name);}
}
console.log(JSON.stringify({schema:'isograph.exp062-L02-Eq28-minimum-scope-G0-verifier.v0.1',pass:issues.length===0,issues,
 mathematical_baseline:baseline,math_hostiles_defined:14,math_hostiles_rejected:mathRejected,source_hostiles_defined:process.argv.includes('--math-only')?0:16,source_hostiles_rejected:sourceRejected,
 L_identities:191,unchanged_complete_records:189,changed:['L-SSC-061','L-SSC-063'],
 source_original_global_minimum_qualified:false,source_error_proved:false,G1_authorized:false,
 cross_track_synthesis_authorized:false,external_independent_cold_theory_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
