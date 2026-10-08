import fs from 'node:fs';import crypto from 'node:crypto';
const E='experiments/062/',L='research/woit-lisi-isomorph/lisi/';
const paths={gate:E+'L_CURRENT_STAGE_GATE_0_17.json',old:E+'L_CURRENT_STAGE_GATE_0_16.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_16.json',source:L+'LISI_L05_F4_EQ17_SOURCE_G0_0_1.json',
 sourceVerifier:E+'tools/verify-l-g0-l05-f4-eq17-source-0-1.mjs',sscVerifier:E+'tools/verify-l-g0-l133-ssc-source-0-16.mjs',sourceDefect:E+'L133_EQ17_PSI_CONJUGATION_SOURCE_FIDELITY_DEFECT_0_1.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const G=load(paths.gate),prior=load(paths.old),S=load(paths.ssc),source=load(paths.source),defect=load(paths.sourceDefect);
function check(g=G){
 const e=[],ok=(v,m)=>{if(!v)e.push(m)};
 const c=g.current_lawful_state||{},r=g.G0_17_CI||{},z=g.Eq17_G0_source_packet||{};
 ok(g.schema==='isograph.exp062-l-current-stage-gate.v0.17'&&g.track==='L'&&g.status?.includes('G0')&&g.status?.includes('UNFROZEN')&&g.semantic_authority===false,'L G0 current procedural authority only');
 ok(g.supersedes?.path===paths.old&&g.supersedes?.git_blob_sha===sha(paths.old)&&prior.current_lawful_state?.G1_authorized===false,'previous procedural source fixed');
 ok(g.current_source_census?.path===paths.ssc&&g.current_source_census?.git_blob_sha===sha(paths.ssc),'current exact SSC0.16 SHA');
 ok(g.current_source_census?.source_identities===191&&g.current_source_census?.unchanged_from_predecessor===190&&j(g.current_source_census?.changed_from_predecessor)===j(['L-SSC-133'])&&g.current_source_census?.source_complete===false&&g.current_source_census?.frozen===false,'191 ids and 190 preserved, still unfrozen');
 ok(S.items.length===191&&S.guards.section4_f4_eq17_triality_t_t2_closed===false&&S.guards.source_census_freeze_complete===false,'source G0 not primitive-closed');
 ok(z.path===paths.source&&z.git_blob_sha===sha(paths.source)&&z.frozen_source==='L05 2026-08-29 journal version §4.3 Eq17, printed page 19/51'&&z.source_f4_real_form==='compact f4(-52) ordinary O ONLY','exact L05 source version and type');
 ok(z.source_component_equations===4&&z.source_B_diag_roles===3&&z.source_right_first_octonion_rule===true&&z.source_error_published_not_repaired===true,'Eq17 load-bearing subexpressions and negative source');
 for(const name of ['source_t_t2_primitive_definition_closed','source_reflections_and_split_complete','universal_f4_mathematics_qualified'])ok(z[name]===false,'not semantic theorem or reflection closure '+name);
 ok(r.source_eq17?.id===37846801752&&r.source_eq17?.conclusion==='success'&&r.source_eq17?.adversarial_rejected===29&&r.source_eq17?.external_cold_review_passed===false,'exact source CI gate');
 ok(r.SSC_016?.id===37847116335&&r.SSC_016?.conclusion==='success'&&r.SSC_016?.unchanged_source_items===190&&r.SSC_016?.adversarial_rejected===24&&r.SSC_016?.external_cold_review_passed===false,'exact SSC0.16 source conservation CI');
 ok(r.source_checker?.path===paths.sourceVerifier&&r.source_checker?.git_blob_sha===sha(paths.sourceVerifier),'source verifier immutable SHA');
 ok(r.SSC_checker?.path===paths.sscVerifier&&r.SSC_checker?.git_blob_sha===sha(paths.sscVerifier),'SSC verifier immutable SHA');
 ok(r.original_source_packet_defect?.path===paths.sourceDefect&&r.original_source_packet_defect?.git_blob_sha===sha(paths.sourceDefect)&&defect.defects.length===2,'load-bearing Eq17 correction provenance preserved');
 ok(r.source_census_frozen===false&&r.source_closure_verified===false&&r.mathematical_theorem_qualified===false&&r.G1_authorized===false,'CI never authority');
 ok(g.outstanding_source_reconstruction?.some(x=>x.includes('Eq17')&&x.includes('t²'))&&g.outstanding_source_reconstruction?.some(x=>x.includes('reflection matrices'))&&g.outstanding_source_reconstruction?.some(x=>x.includes('L01–L06')),'remaining source scope not suppressed');
 ok(g.next_lawful_step?.startsWith('Continue L-only G0')&&g.next_lawful_step?.includes('source assertion audit'),'next lawful work G0 only');
 ok(c.G0_source_audit_authorized===true&&c.G0_source_local_CI_verified===true,'G0 research allowed');
 for(const k of ['G0_source_census_frozen','G0_full_source_assertion_census_complete','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_campaign_new_promotion_authorized','G7_authorized','L_primitive_schema_closure_complete','L_recursive_IA_authorized','L_Discovery_Protocol_authorized','WL_cross_track_comparison_authorized','global_qualified_module_manifest_change_authorized','PR70_merge_authorized'])ok(c[k]===false,'no premature stage '+k);
 ok(source.eq17_components?.length===4&&source.global_mathematical_qualification===false&&S.revision.G1_authorized===false,'frozen source still only source claim');
 ok(g.owner_external_verification_bypass?.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','owner waived external calls not substantive requirements');
 ok(!j(g).includes('W-SSC-'),'independent L-only source');
 return e;
}
const baseline=check(),issues=[...baseline],mutants=[
 ['claim G0 source frozen',x=>{x.current_source_census.frozen=true}],
 ['claim whole L source complete',x=>{x.current_source_census.source_complete=true}],
 ['authorize G1',x=>{x.current_lawful_state.G1_authorized=true}],
 ['authorize G7',x=>{x.current_lawful_state.G7_authorized=true}],
 ['authorize IA',x=>{x.current_lawful_state.L_recursive_IA_authorized=true}],
 ['authorize W-L',x=>{x.current_lawful_state.WL_cross_track_comparison_authorized=true}],
 ['authorize merge',x=>{x.current_lawful_state.PR70_merge_authorized=true}],
 ['promote f4 theorem',x=>{x.Eq17_G0_source_packet.universal_f4_mathematics_qualified=true}],
 ['invent t² closure',x=>{x.Eq17_G0_source_packet.source_t_t2_primitive_definition_closed=true}],
 ['invent reflection closure',x=>{x.Eq17_G0_source_packet.source_reflections_and_split_complete=true}],
 ['switch to split source',x=>{x.Eq17_G0_source_packet.source_f4_real_form='split f4(4)'}],
 ['change source version',x=>{x.Eq17_G0_source_packet.frozen_source='2026-09 arxiv'}],
 ['drop CI source cases',x=>{x.G0_17_CI.source_eq17.adversarial_rejected=0}],
 ['drop SSC conservation',x=>{x.G0_17_CI.SSC_016.unchanged_source_items=0}],
 ['lose input source pin',x=>{x.Eq17_G0_source_packet.git_blob_sha='STALE'}],
 ['lose source correction pin',x=>{x.G0_17_CI.original_source_packet_defect.git_blob_sha='STALE'}],
 ['erase open reflections',x=>{x.outstanding_source_reconstruction=x.outstanding_source_reconstruction.filter(v=>!v.includes('reflection matrices'))}],
 ['fabricate external pass',x=>{x.G0_17_CI.source_eq17.external_cold_review_passed=true}],
 ['cross-track import',x=>{x.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [label,fn]of mutants){const x=cp(G),before=j(x);fn(x);if(j(x)===before)issues.push('NO-OP '+label);else if(check(x).length===0)issues.push('ESCAPED '+label);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l-current-g0-stage017.v0.1',pass:issues.length===0,errors:issues,source_census_items:191,changed:'L-SSC-133',unchanged:190,adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILURE':'TESTED',G1_to_G7_authorized:false,external_review_passed:false},null,2));if(issues.length)process.exitCode=1;
