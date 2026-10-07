import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const frontierPath='experiments/062/L_G5_RESIDUAL_RECONSTRUCTION_FRONTIER_0_1.json';
const extractionPath='experiments/062/L_EXTRACTION_RECONCILED_0_25.json';
const g3Path='experiments/062/L_G3_CORE_DEFINABILITY_0_5.json';
const g4Path='experiments/062/L_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const fixedPath='experiments/062/L_G4_FIXED_POINT_0_1.json';

const frontier=JSON.parse(fs.readFileSync(frontierPath,'utf8'));
const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const fixed=JSON.parse(fs.readFileSync(fixedPath,'utf8'));
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
const stable=x=>JSON.stringify(x);
const errors=[];
const fail=m=>errors.push(m);

if(frontier.schema!=='isograph.exp062-l-g5-residual-reconstruction-frontier.v0.1')fail('schema');
if(frontier.track!=='L'||frontier.comparison_scope!=='L_ONLY')fail('scope');
if(frontier.authority!==false)fail('authority overclaim');
if(fixed.fixed_point?.L_G4_complete!==true||fixed.fixed_point?.L_local_G5_authorized!==true)fail('G4 gate');
if(fixed.fixed_point?.cross_track_comparison_authorized!==false||fixed.fixed_point?.global_G5_authorized!==false)fail('cross/global gate');
for(const [key,path] of Object.entries({extraction:extractionPath,g3_fixed_point:g3Path,g4_quotient:g4Path,g4_fixed_point:fixedPath})){
 const x=frontier.input?.[key];
 if(x?.path!==path||x?.git_blob_sha!==blob(path))fail(key+' pin');
}
if(g3.counts?.UNEXPANDED_DEMAND!==736||g3.counts?.CORE_CLOSED!==82)fail('G3 counts');
if((g4.classes||[]).length!==345||g4.counts?.unresolved_input_occurrences!==736)fail('G4 counts');

const exById=new Map();
for(const it of extraction.items||[])for(const o of it.occurrences||[])exById.set(o.occurrence_id,{census_id:it.census_id,...o});
const g3ById=new Map(), bodyRows=new Map();
for(const it of g3.items||[]){bodyRows.set(it.census_id,it.occurrences||[]);for(const o of it.occurrences||[])g3ById.set(o.occurrence_id,{census_id:it.census_id,...o});}

const cache=new Map();
function component(root){
 if(cache.has(root))return cache.get(root);
 const r=g3ById.get(root);if(!r)throw new Error('missing root '+root);
 const rows=bodyRows.get(r.census_id)||[];
 const adj=new Map(rows.map(x=>[x.occurrence_id,new Set()]));
 for(const x of rows)for(const d of x.source_provenance?.depends_on||[]){
   if(!adj.has(d))throw new Error(x.occurrence_id+': dependency '+d);
   adj.get(x.occurrence_id).add(d);adj.get(d).add(x.occurrence_id);
 }
 const seen=new Set([root]),q=[root];
 while(q.length){const x=q.shift();for(const y of adj.get(x)||[])if(!seen.has(y)){seen.add(y);q.push(y);}}
 const result=[...seen];cache.set(root,result);return result;
}
const NAME='G1 explicitly records this occurrence as name-only/external-definition-required. No exact source-faithful lower definition is admitted under current L-only authority.';
const OPAQUE='G2 preserves this occurrence only as opaque incidence/provenance. This pass has not established that the full source-local behavior is exhausted by primitive extensional relation application, raw data, or another exact qualified-Core form.';
const EVAL='The source occurrence denotes an operation with load-bearing evaluation/composition/arithmetic behavior. Core 0.20 forbids hiding that behavior in a nonlogical symbol or raw argument text; exact lower relational semantics remain unexpanded.';

if((frontier.classes||[]).length!==345)fail('frontier class count');
const classById=new Map((frontier.classes||[]).map(x=>[x.class_id,x]));
let roots=0, memberComponents=0, componentRows=0, pureName=0,pureOpaque=0,pureEval=0;
for(const qc of g4.classes||[]){
 const row=classById.get(qc.class_id);if(!row){fail('missing class '+qc.class_id);continue;}
 if(row.member_count!==qc.member_count)fail(qc.class_id+': member count');
 if(row.structural_invariant_sha256!==qc.structural_invariant_sha256)fail(qc.class_id+': invariant');
 if(row.component_node_count!==qc.component_node_count||row.component_dependency_edge_count!==qc.component_dependency_edge_count)fail(qc.class_id+': component summary');
 if(row.g5_state!=='UNADJUDICATED_RESIDUAL')fail(qc.class_id+': premature adjudication');
 if(row.current_authority_reduction?.all_roots_rejected_by_g3!==true||row.current_authority_reduction?.qualified_QU_boundary_candidates_in_L_G3!==0||row.current_authority_reduction?.reduction_state!=='RESIDUAL_REMAINS_UNDER_FROZEN_G0_AUTHORITY')fail(qc.class_id+': authority reduction');
 if(stable((row.members||[]).map(x=>x.root_occurrence_id))!==stable(qc.member_occurrence_ids))fail(qc.class_id+': root order/coverage');
 const rootRelations=[],rootStatuses=[],rootReasons=[],allUnresolved=[];
 for(const m of row.members||[]){
   roots++;memberComponents++;
   const gr=g3ById.get(m.root_occurrence_id),ex=exById.get(m.root_occurrence_id);
   if(!gr||!ex||gr.disposition!=='UNEXPANDED_DEMAND')fail(m.root_occurrence_id+': root provenance');
   if(m.root_census_id!==gr.census_id)fail(m.root_occurrence_id+': census');
   if(stable(m.root_source_provenance)!==stable(gr.source_provenance))fail(m.root_occurrence_id+': source provenance');
   if(m.root_missing_definition_or_authority!==gr.missing_definition_or_authority)fail(m.root_occurrence_id+': failure reason');
   const ids=component(m.root_occurrence_id);
   if(stable(m.component_occurrence_ids)!==stable(ids))fail(m.root_occurrence_id+': component ids');
   const expectedRows=ids.map(id=>{
     const g=g3ById.get(id),e=exById.get(id);
     return {occurrence_id:id,census_id:g.census_id,g3_disposition:g.disposition,missing_definition_or_authority:g.missing_definition_or_authority,source_provenance:g.source_provenance,g1_load_bearing_note:e.load_bearing_note};
   });
   if(stable(m.component_rows)!==stable(expectedRows))fail(m.root_occurrence_id+': component rows');
   componentRows+=ids.length;
   rootRelations.push(gr.source_provenance?.relation_span);
   rootStatuses.push(gr.source_provenance?.definition_status);
   rootReasons.push(gr.missing_definition_or_authority);
   allUnresolved.push(...expectedRows.filter(x=>x.g3_disposition==='UNEXPANDED_DEMAND'));
 }
 const rels=[...new Set(rootRelations)],statuses=[...new Set(rootStatuses)],reasons=[...new Set(rootReasons)],compReasons=[...new Set(allUnresolved.map(x=>x.missing_definition_or_authority))];
 const allName=allUnresolved.length>0&&allUnresolved.every(x=>x.missing_definition_or_authority===NAME);
 const allOpaque=allUnresolved.length>0&&allUnresolved.every(x=>x.missing_definition_or_authority===OPAQUE);
 const allEval=allUnresolved.length>0&&allUnresolved.every(x=>x.missing_definition_or_authority===EVAL);
 if(allName)pureName++;if(allOpaque)pureOpaque++;if(allEval)pureEval++;
 const d=row.diagnostics||{};
 if(stable(d.root_relation_spans)!==stable(rels)||stable(d.root_definition_statuses)!==stable(statuses)||stable(d.root_g3_failure_reasons)!==stable(reasons)||stable(d.component_unresolved_failure_reasons)!==stable(compReasons))fail(qc.class_id+': diagnostics');
 if(d.root_relation_homogeneous!==(rels.length===1)||d.root_definition_status_homogeneous!==(statuses.length===1)||d.whole_component_name_only!==allName||d.whole_component_opaque_incidence!==allOpaque||d.whole_component_evaluation_semantics!==allEval)fail(qc.class_id+': flags');
}
for(const c of frontier.classes||[])if(!(g4.classes||[]).some(x=>x.class_id===c.class_id))fail('extra class '+c.class_id);
if(roots!==736)fail('root count '+roots);
const c=frontier.counts||{};
if(c.quotient_classes!==345||c.unresolved_root_occurrences!==736||c.member_components!==memberComponents||c.component_rows_with_repetition!==componentRows||c.whole_component_name_only_classes!==pureName||c.whole_component_opaque_incidence_classes!==pureOpaque||c.whole_component_evaluation_semantics_classes!==pureEval)fail('count summary');

const text=stable(frontier.classes);
if(/W-SSC-/i.test(text))fail('W source evidence leaked');
if(/\bB-[A-Z0-9-]+/i.test(text)||/\bPD-[A-Z0-9-]+/i.test(text)||/DNWF/i.test(text)||/DNIA/i.test(text))fail('pre-G5 category/basis leakage');

execFileSync('node',['experiments/062/tools/generate-l-g5-residual-frontier-0-1.mjs'],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',frontierPath],{encoding:'utf8'});
if(diff.trim())fail('generator replay diff');

console.log(JSON.stringify({
 schema:'isograph.exp062-verify-l-g5-residual-frontier.v0.1',
 pass:errors.length===0,
 errors,
 counts:{quotient_classes:345,unresolved_roots:roots,member_components:memberComponents,component_rows_with_repetition:componentRows,whole_component_name_only_classes:pureName,whole_component_opaque_incidence_classes:pureOpaque,whole_component_evaluation_semantics_classes:pureEval},
 deterministic_replay_exact:diff.trim()==='',
 cross_track_evidence_absent:!/W-SSC-/i.test(text),
 L_local_G5_frontier_valid:errors.length===0
},null,2));
if(errors.length)process.exit(1);
