// IsoGraph Track L G0 source-fidelity role/lineage conservation. No domain-physics solver.
// This is a source evidence and scope verifier, NOT a native .isg or Core/NEI/DTS pass.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const paths={
 packet:R+'LISI_G0_SOURCE_NATIVE_ROLE_RELATIONS_0_1.json',
 previous:R+'SOURCE_SEMANTIC_CENSUS_0_48.json',
 current:R+'SOURCE_SEMANTIC_CENSUS_0_49.json',
 previousTraversal:R+'SOURCE_TRAVERSAL_LEDGER_0_11.json',
 traversal:R+'SOURCE_TRAVERSAL_LEDGER_0_12.json',
 packetParentGate:E+'L_CURRENT_STAGE_GATE_0_56.json',
 previousGate:E+'L_CURRENT_STAGE_GATE_0_58.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_59.json',
 checker:E+'tools/verify-l-g0-source-role-and-traversal-reconciliation-0-3.mjs'
};
const load=(p)=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=(p)=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const exactIds=['L-SSC-024','L-SSC-033','L-SSC-087','L-SSC-120','L-SSC-172','L-SSC-185'];
const sourceIds=['L01','L02','L03','L04','L05','L06'];
const expectedCounts={L01:30,L02:21,L03:26,L04:34,L05:38,L06:42};
const original={};
function audit(packet,previous,current,oldTraversal,traversal,gate){
 const issues=[],ck=(v,s)=>{if(!v)issues.push(s)};
 ck(packet.schema==='isograph.track-L.G0.source-native-role-occurrences-and-transition-boundaries.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.semantic_authority===false,'packet G0 L only no authority');
 for(const[k,p]of [['source_census',paths.previous],['historical_traversal',paths.previousTraversal],['current_gate',paths.packetParentGate]])
 ck(packet.parents?.[k]?.path===p&&packet.parents[k].git_blob_sha===blob(p),'pinned packet ancestor '+k);
 ck(packet.primary_source_recheck?.L03?.revision==='arXiv:1006.4908v1'&&packet.primary_source_recheck.L03.sections.join('|')==='Introduction p2|§4 pp12–13|§5 pp13–14','L03 original source revision and passage provenance');
 ck(packet.primary_source_recheck?.other_sources?.method.includes('not independently cold re-traversed'),'no claims of current six-source cold proof');
 const occ=packet.source_occurrences||[],rel=packet.source_relations||[];
 ck(occ.length===18&&rel.length===16,'18 occurrence carriers and 16 typed source relations');
 const occMap=new Map(occ.map(x=>[x.id,x]));const relMap=new Map(rel.map(x=>[x.id,x]));
 ck(occMap.size===18&&relMap.size===16,'distinct occurrence/relationship identifiers');
 const prevItems=previous.items||[],nextItems=current.items||[];
 ck(prevItems.length===191&&nextItems.length===191&&previous.item_count===191&&current.item_count===191,'191 exact source item inventory');
 const oldBy=new Map(prevItems.map(x=>[x.id,x])),newBy=new Map(nextItems.map(x=>[x.id,x]));
 ck(oldBy.size===191&&newBy.size===191,'no duplicate source item ids');
 const sourceCount={L01:0,L02:0,L03:0,L04:0,L05:0,L06:0};
 for(const x of prevItems){const source=x.source_provenance?.slice(0,3);if(source in sourceCount)sourceCount[source]++;else issues.push('unknown source ownership '+x.id);}
 for(const k of sourceIds)ck(sourceCount[k]===expectedCounts[k],'exact primary source census count '+k);
 ck(prevItems.filter(x=>x.source_provenance==='L01/L06/L05').map(x=>x.id).join('|')==='L-SSC-024','cross-source provenance is one declared multi-source occurrence with a primary owner');
 const changed=[];
 for(const [id,record]of oldBy){if(!newBy.has(id))issues.push('source removed '+id);else if(JSON.stringify(newBy.get(id))!==JSON.stringify(record))changed.push(id);}
 for(const id of newBy.keys())if(!oldBy.has(id))issues.push('source invented '+id);
 ck(changed.join('|')===exactIds.join('|'),'only six authorized source scopes revised; entire other 185 records unchanged: '+changed);
 for(const id of exactIds){const a=oldBy.get(id),b=newBy.get(id),xref=b?.source_expression_census?.L_G0_NATIVE_ROLE_RELATION_RECONCILIATION_0_1;
 ck(b?.body.startsWith(a?.body??'@missing')&&b.body.length>a.body.length,'source base verbatim preserved '+id);
 ck(xref?.source_anchor_id===id&&xref?.source_packet?.path===paths.packet&&xref.source_packet.git_blob_sha===blob(paths.packet),'source occurrence packet link exact '+id);
 ck(xref?.source_occurrence_ids?.length>=1&&xref.source_occurrence_ids.every(k=>occMap.has(k)),'source occurrence links valid '+id);
 for(const field of ['source_occurrence_SI_not_a_NEI_identity','no_trivial_triality_identity','source_revision_or_same_carrier_not_authoritatively_qualified','source_full_cold_traversal_passed','primitive_closed','IA_fixed_point_authorized','NEI_pass_authorized','DTS_pass_authorized','G1_authorized','cross_track_semantics_authorized','author_physics_correctness_tested_in_this_round']){
  const expected=['source_occurrence_SI_not_a_NEI_identity','no_trivial_triality_identity','source_revision_or_same_carrier_not_authoritatively_qualified'].includes(field);
  ck(xref?.[field]===expected,'G0 source role/IA/NEI/DTS guard '+id+':'+field);
 }
 }
 for(const o of occ){ck(o.id.startsWith('L-G0-RO-')&&sourceIds.includes(o.source),'L source-only occurrence id '+o.id);
 ck(typeof o.carrier==='string'&&o.carrier.length>=20&&o.semantics?.length>15&&o.scope?.length>25,'source semantic role not just a label '+o.id);
 ck(o.anchors?.length>=1&&o.anchors.every(k=>oldBy.has(k)),'source occurrence anchors '+o.id);
 ck(o.anchors?.some(k=>oldBy.get(k)?.source_provenance.startsWith(o.source)),'an occurrence anchored in its own source '+o.id);
 }
 for(const e of rel){ck(e.id.startsWith('L-G0-SR-')&&occMap.has(e.from)&&occMap.has(e.to)&&e.from!==e.to,'directed source-only relation endpoints '+e.id);
 ck(e.identity_licensed===false,'NO global source-name = NEI SAME '+e.id);
 ck(e.anchors?.length>=2&&e.anchors.every(k=>oldBy.has(k)),'relationship justified by source item ids '+e.id);
 ck(typeof e.modality==='string'&&e.modality.length>40&&typeof e.original_source_evidence==='string'&&e.original_source_evidence.length>=20,'explicit source modality/evidence '+e.id);
 }
 const mandatory={
  'L-G0-SR-01':['L-G0-RO-01','L-G0-RO-02','EXPLICIT_AUTHOR_CORRECTION','L-SSC-087'],
  'L-G0-SR-02':['L-G0-RO-03','L-G0-RO-04','SELECTED_SUBALGEBRA_INCLUSION_NOT_GLOBAL_BRACKET_IDENTIFICATION','L-SSC-081'],
  'L-G0-SR-04':['L-G0-RO-11','L-G0-RO-12','LATER_AUTHOR_GEOMETRIC_REFRAMING','L-SSC-161'],
  'L-G0-SR-05':['L-G0-RO-13','L-G0-RO-14','CONDITIONAL_EQUALITY_BROKEN_BY_DEFORMATION','L-SSC-172'],
  'L-G0-SR-06':['L-G0-RO-14','L-G0-RO-15','REGIONAL_ACCESSIBILITY_ASSUMPTION','L-SSC-185'],
  'L-G0-SR-07':['L-G0-RO-06','L-G0-RO-07','WITHIN_SOURCE_CANDIDATE_REJECTION_FOR_DESIGN_TARGET','L-SSC-110'],
  'L-G0-SR-08':['L-G0-RO-07','L-G0-RO-08','WEIGHT_ROLE_CONDITIONAL_TRANSPORT','L-SSC-120'],
  'L-G0-SR-09':['L-G0-RO-08','L-G0-RO-09','DIFFERENT_SOURCE_ROLE_CARRIERS_IDENTITY_UNRESOLVED','L-SSC-131'],
  'L-G0-SR-10':['L-G0-RO-02','L-G0-RO-15','LATER_CONDITIONAL_MODEL_NOT_RETROACTIVE_ALGEBRA_REPAIR','L-SSC-087'],
  'L-G0-SR-11':['L-G0-RO-16','L-G0-RO-17','SAME_SHAPED_CONNECTION_IDENTITY_NOT_ESTABLISHED','L-SSC-057'],
  'L-G0-SR-16':['L-G0-RO-18','L-G0-RO-09','SOURCE_CITATION_QUARANTINE_PRESERVED','L-SSC-022']
 };
 for(const[k,[from,to,kind,id]]of Object.entries(mandatory)){
 const e=relMap.get(k);ck(e?.from===from&&e.to===to&&e.relation===kind&&e.anchors.includes(id),'source-specific relationship modality '+k);
 }
 ck(packet.source_vs_identity_guards?.same_label_triality_does_not_prove_same_carrier===true&&packet.source_vs_identity_guards?.L04_2024_v2_cannot_literally_cite_L05_2026_as_existing_publication===true,'do not invent anachronistic original citation or same triality');
 ck(packet.source_vs_identity_guards?.external_target_Woit_meaning_not_imported===true&&packet.source_vs_identity_guards?.identity_licensed_by_any_relation===false,'external target quarantined & no global identity assertion');
 for(const field of ['source_census_complete','historical_complete_traversal_superseded'])ck(packet.source_replay_obligations?.[field]===(field==='historical_complete_traversal_superseded'),'source completion must remain open '+field);
 for(const field of ['census_frozen','G1_authorized','recursive_IA_authorized','NEI_pass_authorized','DTS_pass_authorized','DP_authorized','cross_track_synthesis_authorized','author_outreach_authorized','PR70_merge_authorized'])
 ck(packet.execution_locks?.[field]===false,'higher gate cannot be claimed '+field);
 ck(current.track==='L'&&current.guards?.source_census_freeze_complete===false&&current.guards?.source_census_replay_incomplete===true,'current SSC0.49 open');
 ck(current.revision?.predecessor_git_blob_sha===blob(paths.previous)&&current.revision?.source_packet?.git_blob_sha===blob(paths.packet)&&current.revision?.changed_source_items?.join('|')===exactIds.join('|')&&current.revision.unchanged_source_items===185,'SSC0.49 exact ancestry, entire-record conservation');
 ck(oldTraversal.status==='COMPLETE_CENSUS_FROZEN'&&oldTraversal.complete_sources===6&&oldTraversal.sources?.every(x=>x.state==='COMPLETE_CENSUSED_FROZEN'),'historical traversal remained intact historical');
 ck(traversal.schema==='lisi.full-treatment.source-traversal-ledger.v0.12'&&traversal.status==='HISTORICAL_SIX_SOURCE_TRAVERSAL_CONSERVED_CURRENT_G0_REOPENED_UNFROZEN','historical 0.10 vs current 0.11 correction');
 ck(traversal.historical_traversal?.git_blob_sha===blob(paths.previousTraversal)&&traversal.historical_traversal?.original_complete_sources===6,'historical six-source freeze retained as historical evidence');
 ck(traversal.current_census?.git_blob_sha===blob(paths.current)&&traversal.current_census.item_count===191&&traversal.complete_sources===0&&traversal.current_qualified_source_traversal_complete===false,'current source replay is NOT frozen / complete');
 ck(traversal.current_source_relations?.git_blob_sha===blob(paths.packet)&&traversal.current_source_relations.occurrences===18&&traversal.current_source_relations.relations===16,'current source graph/index attached');
 ck(traversal.sources?.length===6,'exact six source traversal rows');
 for(const source of traversal.sources){const original=oldTraversal.sources.find(x=>x.id===source.id);
 ck(!!original&&source.historical_state===original.state&&JSON.stringify(source.historical_covered)===JSON.stringify(original.covered),'all source history and coverage preserved '+source.id);
 ck(source.state==='CURRENT_G0_REOPENED_SOURCE_FIDELITY_AUDIT_NOT_FROZEN'&&source.current_complete===false&&source.current_full_source_cold_review_completed===false,'source reopened not silently frozen '+source.id);
 ck(source.current_unresolved_source_replay?.length>=2&&source.current_source_primary_item_count===expectedCounts[source.id],'source-specific current open obligations and item count '+source.id);
 }
 for(const k of sourceIds)ck(traversal.current_source_inventory?.primary_ownership_counts?.[k]===expectedCounts[k],'traversal primary ownership count '+k);
 ck(traversal.current_source_inventory?.multi_source_edge_id==='L-SSC-024','cross-source provenance not erased');
 for(const key of ['G1_authorized','NEI_DTS_DP_passes_authorized','cross_track_synthesis_authorized','source_census_freeze_authorized','PR70_merge_authorized'])ck(traversal[key]===false,'traversal G0 guard '+key);
 ck(gate.schema==='isograph.exp062-l-current-stage-gate.v0.59'&&gate.track==='L'&&gate.stage==='G0'&&gate.semantic_authority===false,'source-only procedural gate0.59');
 ck(gate.predecessor_gate?.git_blob_sha===blob(paths.previousGate)&&gate.current_source_census?.git_blob_sha===blob(paths.current),'current source gate/parent exact hashes');
 ck(gate.current_source_relations?.git_blob_sha===blob(paths.packet)&&gate.source_traversal?.git_blob_sha===blob(paths.traversal),'gate exact source evidence/ledger hash');
 ck(gate.source_verifier?.git_blob_sha===blob(paths.checker),'gate exact code SHA');
 ck(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false&&gate.current_lawful_state?.NEI_pass_authorized===false,'downstream gate G0 only');
 return issues;
}
const packet=load(paths.packet),previous=load(paths.previous),current=load(paths.current),oldTraversal=load(paths.previousTraversal),traversal=load(paths.traversal),gate=load(paths.gate);
const issues=audit(packet,previous,current,oldTraversal,traversal,gate);
const mutants=[
 ['collapse_source_triality_identity',p=>p.source_relations[0].identity_licensed=true],
 ['reverse_2010_author_correction',p=>{p.source_relations[0].from='L-G0-RO-02';p.source_relations[0].to='L-G0-RO-01';}],
 ['turn_correction_into_equivalence',p=>p.source_relations[0].relation='SAME_REFERENCE'],
 ['erase_semidirect/full_e8_bracket_distinction',p=>p.source_relations[1].relation='SAME_BRACKET'],
 ['invent_source_citation_to_future_L05',p=>p.source_vs_identity_guards.L04_2024_v2_cannot_literally_cite_L05_2026_as_existing_publication=false],
 ['turn_conditional_L06_generation_hypothesis_into_unconditional',p=>p.source_relations[5].relation='UNCONDITIONAL_PROOF'],
 ['erase_L04_48_vs_96_choice',p=>p.source_relations[6].relation='EQUIVALENT_FINAL_MODELS'],
 ['promote_same_shaped_L02_L03_frame_carriers',p=>p.source_relations[10].identity_licensed=true],
 ['lose_quarantined_external_target',p=>p.source_vs_identity_guards.external_target_Woit_meaning_not_imported=false],
 ['promote_G1_IA',p=>p.execution_locks.G1_authorized=true],
 ['promote_Natural_Entropic_Identity',p=>p.execution_locks.NEI_pass_authorized=true],
 ['forge_source_revision',p=>p.primary_source_recheck.L03.revision='arXiv:1006.4908v2'],
 ['forge_old_traversal_blob',p=>p.parents.historical_traversal.git_blob_sha='INVALID'],
 ['erase_2010_later_source_correction',p=>p.source_occurrences[1].anchors=['L-SSC-008']],
 ['drop_source_occurrence',p=>p.source_occurrences.pop()],
 ['erase_source_modality_evidence',p=>p.source_relations[8].original_source_evidence='none'],
 ['promote_source_replay_frozen',p=>p.source_replay_obligations.source_census_complete=true],
 ['add_nonexistent_L_source_anchor',p=>p.source_relations[4].anchors.push('L-SSC-999')]
];
let rejected=0;
for(const [label,fn] of mutants){const p=JSON.parse(JSON.stringify(packet));fn(p);const errors=audit(p,previous,current,oldTraversal,traversal,gate);if(errors.length)rejected++;else issues.push('ESCAPED_MUTANT '+label);}
console.log(JSON.stringify({
 schema:'isograph.exp062-L-G0-source-role-traversal-reconciliation-verifier.v0.3',
 pass:issues.length===0,issues,
 exact_source_identities:191,
 source_primary_counts:expectedCounts,
 preserved_full_predecessor_source_records:185,
 revised_source_ids:exactIds,
 source_occurrences:18,source_relations:16,
 former_traversal_historical_complete_sources:6,
 current_g0_cold_complete_sources:0,
 relation_and_scope_hostiles_defined:mutants.length,
 relation_and_scope_hostiles_rejected:rejected,
 external_independent_cold_source_review_passed:false,
 source_census_frozen:false,G1_authorized:false,recursive_IA_authorized:false,
 NEI_pass_authorized:false,DTS_pass_authorized:false,cross_track_semantics_authorized:false
},null,2));
if(issues.length)process.exitCode=1;
