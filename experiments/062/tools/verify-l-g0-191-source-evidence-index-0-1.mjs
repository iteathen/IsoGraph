// IsoGraph L-only G0: exact 191-item source indexing audit. NOT a physics solver.
// The register distinguishes in-row evidence metadata from source correctness/cold review.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={
 packet:R+'LISI_G0_191_SOURCE_EVIDENCE_INDEX_COVERAGE_0_1.json',
 census:R+'SOURCE_SEMANTIC_CENSUS_0_49.json',
 traversal:R+'SOURCE_TRAVERSAL_LEDGER_0_12.json',
 historical:R+'SOURCE_TRAVERSAL_LEDGER_0_11.json',
 previousGate:E+'L_CURRENT_STAGE_GATE_0_61.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_62.json',
 checker:E+'tools/verify-l-g0-191-source-evidence-index-0-1.mjs'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sources=['L01','L02','L03','L04','L05','L06'];
const countsExpected={L01:30,L02:21,L03:26,L04:34,L05:38,L06:42};
const locatorExpression=/§|(?:\bEq(?:\.|s\.|\b))|(?:\beq(?:\.|s\.|\b))|(?:\bTable\b)|(?:\bp(?:p)?\.\s*\d)/i;
function expectedRow(item){
 const keys=Object.keys(item.source_expression_census||{}),located=locatorExpression.test(item.source_provenance);
 return {
 id:item.id,
 primary_source:item.source_provenance.slice(0,3),
 source_provenance_as_printed_in_census:item.source_provenance,
 source_semantic_kind:item.kind,
 source_disposition_hint:item.source_disposition_hint,
 source_location_in_item_provenance:located?'SECTION_OR_EQUATION_REFERENCE_PRESENT':'SOURCE_LEVEL_REFERENCE_ONLY',
 indexed_inrow_source_evidence_keys:keys,
 inrow_expression_evidence_field_present:keys.length>0,
 source_semantic_body_characters:item.body.length,
 representation_closure:item.representation_closure,
 relation_to_cold_source_review:'NOT_CLAIMED_BY_METADATA',
 source_replay_disposition:'OPEN_NOT_FROZEN_G0',
 source_semantics_derived_from_absence_of_metadata:false,
 external_source_reference_authority_imported:false
 };
}
function audit(packet,census,traversal,historical,gate){
 const issues=[],ck=(v,s)=>{if(!v)issues.push(s)};
 ck(packet.schema==='isograph.track-L.G0.191-item-source-evidence-index-coverage.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.semantic_authority===false,'G0 L-only evidence index not semantic authority');
 for(const [name,path]of [['source_census',files.census],['current_traversal',files.traversal],['historical_traversal',files.historical],['current_stage',files.previousGate]]){
  const x=packet.parents?.[name];ck(x?.path===path&&x.git_blob_sha===blob(path),'immutable indexed parent '+name);
 }
 ck(census.track==='L'&&census.item_count===191&&census.items?.length===191&&census.guards.source_census_freeze_complete===false,'191 L source identities current G0 open');
 ck(traversal.current_source_inventory?.one_primary_owner_for_each_of_191===true&&traversal.current_qualified_source_traversal_complete===false,'current traversal is unfrozen');
 ck(historical.status==='COMPLETE_CENSUS_FROZEN'&&historical.complete_sources===6,'historical six-source freeze preserved only as predecessor');
 const rows=packet.per_item||[],byId=new Map(census.items.map(x=>[x.id,x]));
 ck(byId.size===191&&rows.length===191&&new Set(rows.map(x=>x.id)).size===191,'all 191 unique indexed items, none lost');
 for(let i=0;i<census.items.length;i++){
  const source=census.items[i],row=rows[i],expected=expectedRow(source);
  ck(JSON.stringify(row)===JSON.stringify(expected),'exact source-metadata index item '+source.id);
 }
 const bySource={};
 let itemCount=0,locCount=0,inrowCount=0;
 for(const src of sources){
  const sourceItems=census.items.filter(x=>x.source_provenance.startsWith(src)),listed=rows.filter(x=>x.primary_source===src);
  const observed=packet.per_source?.[src]||{};
  const withLocation=sourceItems.filter(x=>locatorExpression.test(x.source_provenance));
  const withIndex=sourceItems.filter(x=>Object.keys(x.source_expression_census||{}).length);
  const withBoth=sourceItems.filter(x=>locatorExpression.test(x.source_provenance)&&Object.keys(x.source_expression_census||{}).length);
  const withoutIndex=sourceItems.filter(x=>!Object.keys(x.source_expression_census||{}).length);
  const target={
   source:src,
   source_identities:sourceItems.length,
   source_provenance_with_section_or_equation_locator:withLocation.length,
   source_provenance_only_or_multi_source:sourceItems.length-withLocation.length,
   items_with_inrow_index_keys:withIndex.length,
   items_without_inrow_index_keys:withoutIndex.length,
   items_with_both_locator_and_index_keys:withBoth.length,
   item_ids_with_no_inrow_index_keys:withoutIndex.map(x=>x.id),
   all_representation_closure_unassigned:sourceItems.every(x=>x.representation_closure==='NOT_YET_ASSIGNED_POST_COMPILATION'),
   all_source_dispositions_open:sourceItems.every(x=>x.source_disposition_hint.startsWith('OPEN'))
  };
  ck(JSON.stringify(observed)===JSON.stringify(target),'source exact location/evidence-index counts and ordered missing-index records '+src);
  ck(sourceItems.length===countsExpected[src]&&listed.length===countsExpected[src],'source primary ownership inventory '+src);
  itemCount+=sourceItems.length;locCount+=withLocation.length;inrowCount+=withIndex.length;
  bySource[src]={identities:sourceItems.length,indexed:withIndex.length,locators:withLocation.length};
 }
 const totals={items:itemCount,items_with_section_or_equation_locator:locCount,
 items_without_specific_locator:itemCount-locCount,
 items_with_inrow_evidence_index_keys:inrowCount,
 items_without_inrow_evidence_index_keys:itemCount-inrowCount,
 all_source_dispositions_are_open:census.items.every(x=>x.source_disposition_hint.startsWith('OPEN')),
 all_repr_closures_unassigned:census.items.every(x=>x.representation_closure==='NOT_YET_ASSIGNED_POST_COMPILATION')};
 ck(JSON.stringify(packet.counts)===JSON.stringify(totals),'191 source item metadata evidence index totals');
 ck(packet.methodology?.owner_rule?.includes('L-SSC-024')&&packet.methodology?.owner_rule?.includes('not duplicated'),'multi-source role is indexed exactly once');
 ck(packet.methodology?.locator_rule?.includes('not proof')&&packet.methodology?.metadata_rule?.includes('NO IN-ROW INDEX FIELD')&&packet.methodology?.metadata_rule?.includes('does NOT mean no source research'),'source locator vs in-row index vs absent evidence distinctly preserved');
 ck(packet.methodology?.cold_review_rule?.includes('No source cold review status is inferred')&&packet.methodology?.truth_value_rule?.includes('logical unknown'),'no OPEN interpreted as source domain truth');
 ck(packet.methodology?.no_interpretation_imported?.includes('unavailable')&&packet.methodology?.derived_scope?.includes('Not a new primitive'),'no W semantics or named source-metadata primitives');
 for(const src of sources)ck(typeof packet.source_specific_next_action?.[src]==='string'&&packet.source_specific_next_action[src].length>80,'six source-specific outstanding replay targets '+src);
 for(const k of ['source_cold_review_claimed','source_traversal_complete','source_census_frozen','G1_authorized','recursive_IA_authorized','NEI_pass_authorized','DTS_pass_authorized','DP_pass_authorized','cross_track_synthesis_authorized','PR70_merge_authorized'])
 ck(packet[k]===false,'all authority and source completion guards false '+k);
 ck(packet.no_automatic_author_outreach===true,'no author outreach');
 ck(gate.schema==='isograph.exp062-l-current-stage-gate.v0.62'&&gate.track==='L'&&gate.stage==='G0'&&gate.semantic_authority===false,'G0 successor gate label');
 ck(gate.predecessor_gate?.git_blob_sha===blob(files.previousGate),'source audit immediate procedural predecessor');
 ck(gate.current_source_census?.git_blob_sha===blob(files.census)&&gate.source_evidence_register?.git_blob_sha===blob(files.packet)&&gate.source_traversal?.git_blob_sha===blob(files.traversal),'current source gate exact referenced blobs');
 ck(gate.source_verifier?.git_blob_sha===blob(files.checker),'source checker exact hash');
 ck(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.NEI_pass_authorized===false&&gate.current_lawful_state?.source_census_complete===false,'no higher stage or source seal');
 return{issues,bySource,totals};
}
const packet=load(files.packet),census=load(files.census),traversal=load(files.traversal),historical=load(files.historical),gate=load(files.gate);
const baseline=audit(packet,census,traversal,historical,gate);const issues=[...baseline.issues];
const mutations=[
['drop_last_source_record',p=>p.per_item.pop()],
['duplicate_census_identity',p=>p.per_item[5].id=p.per_item[4].id],
['pretend_L03_metadata_index',p=>p.per_item.find(x=>x.id==='L-SSC-070').inrow_expression_evidence_field_present=true],
['invent_L06_evidence_key',p=>p.per_item.find(x=>x.id==='L-SSC-185').indexed_inrow_source_evidence_keys.push('FAKE_SOURCE_CASE')],
['erase_L03_source_section_locator',p=>p.per_item.find(x=>x.id==='L-SSC-070').source_location_in_item_provenance='SOURCE_LEVEL_REFERENCE_ONLY'],
['change_cross_source_primary_owner',p=>p.per_item.find(x=>x.id==='L-SSC-024').primary_source='L06'],
['misquote_existing_source_semantic_disposition',p=>p.per_item.find(x=>x.id==='L-SSC-087').source_disposition_hint='QUALIFIED'],
['pretend_primitive_closure',p=>p.per_item[0].representation_closure='CORE_CLOSED'],
['substitute_different_source_body_length',p=>p.per_item.find(x=>x.id==='L-SSC-033').source_semantic_body_characters+=1],
['forge_source_primary_count',p=>p.per_source.L06.source_identities=43],
['erase_source_missing_index_list',p=>p.per_source.L04.item_ids_with_no_inrow_index_keys=[]],
['lie_cold_complete',p=>p.source_cold_review_claimed=true],
['claim_census_frozen',p=>p.source_census_frozen=true],
['authorize_NEI',p=>p.NEI_pass_authorized=true],
['authorize_G1',p=>p.G1_authorized=true],
['erase_missing_evidence_disclaimer',p=>p.methodology.metadata_rule='No field means no source evidence exists'],
['falsify_191_totals',p=>p.counts.items_with_inrow_evidence_index_keys+=1],
['forge_L_census_blob_parent',p=>p.parents.source_census.git_blob_sha='DEADBEEF'],
['change_source_provenance_text',p=>p.per_item[20].source_provenance_as_printed_in_census='L05 §1'],
['invent_verified_source_warrant_from_index',p=>p.methodology.cold_review_rule='All with in-row metadata are source qualified']
];
let killed=0;
for(const [name,mutate]of mutations){const p=JSON.parse(JSON.stringify(packet));mutate(p);const result=audit(p,census,traversal,historical,gate);if(result.issues.length)killed++;else issues.push('ESCAPED_SOURCE_METADATA_MUTANT '+name);}
console.log(JSON.stringify({
 schema:'isograph.exp062-L-G0-191-source-evidence-index-audit.v0.1',
 pass:issues.length===0,issues,source_identities:baseline.totals.items,
 source_distribution:baseline.bySource,
 source_specific_locator_items:baseline.totals.items_with_section_or_equation_locator,
 without_specific_locator_items:baseline.totals.items_without_specific_locator,
 inrow_indexed_evidence_items:baseline.totals.items_with_inrow_evidence_index_keys,
 without_inrow_index_items:baseline.totals.items_without_inrow_evidence_index_keys,
 all_status_hints_open:baseline.totals.all_source_dispositions_are_open,
 all_primitive_representation_closures_unassigned:baseline.totals.all_repr_closures_unassigned,
 metadata_absence_does_not_prove_missing_evidence:true,
 source_hostiles_defined:mutations.length,source_hostiles_rejected:killed,
 source_full_cold_review_claimed:false,source_census_frozen:false,G1_authorized:false,
 NEI_authorized:false,DTS_authorized:false,DP_authorized:false,W_L_synthesis_authorized:false
},null,2));
if(issues.length)process.exitCode=1;
