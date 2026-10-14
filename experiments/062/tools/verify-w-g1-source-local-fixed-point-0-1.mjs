import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const auditPath='experiments/062/W_G1_COMPLETE_REPEAT_AUDIT_0_1.json';
const productAdjudicationPath='experiments/062/W_G1_FORMULA_OPERATOR_ADJUDICATION_0_2.json';
const semanticAdjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_18.json';
const errataPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_18_ERRATA_0_1.json';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_16.json';

execFileSync(process.execPath,['experiments/062/tools/verify-w-extraction-reconciled-0-18.mjs'],{stdio:'inherit'});

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));
const product=JSON.parse(fs.readFileSync(productAdjudicationPath,'utf8'));
const semantic=JSON.parse(fs.readFileSync(semanticAdjudicationPath,'utf8'));
const errata=JSON.parse(fs.readFileSync(errataPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const errors=[],fail=m=>errors.push(m);

const expectedIds=corpus.items.filter(x=>x.track==='W').map(x=>x.census_id);
if(extraction.items.length!==84||extraction.items.reduce((n,x)=>n+x.occurrences.length,0)!==425)fail('current extraction shape/count');
if(audit.current_input!==extractionPath)fail('audit current input');
if(audit.current_verifier!=='experiments/062/tools/verify-w-extraction-reconciled-0-18.mjs')fail('audit verifier');
if(audit.status!=='SOURCE_LOCAL_ZERO_CHANGE_FIXED_POINT_CANDIDATE_INDEPENDENT_COLD_AUDIT_REQUIRED')fail('audit status');
if((audit.items||[]).length!==84)fail('audit item count');
if(JSON.stringify((audit.items||[]).map(x=>x.census_id))!==JSON.stringify(expectedIds))fail('audit census order');
if((audit.items||[]).some(x=>x.status!=='PASS_NO_CORRECTION'))fail('non-PASS audit row');
const byExtraction=new Map(extraction.items.map(x=>[x.census_id,x]));
for(const row of audit.items||[]){
 const item=byExtraction.get(row.census_id);
 if(!item||row.occurrence_count!==item.occurrences.length)fail('audit occurrence count '+row.census_id);
}
if(audit.counts?.current_repeat_corrections!==0)fail('repeat corrections not zero');
if(audit.fixed_point?.source_local_zero_change!==true)fail('source-local fixed point not true');
if(audit.fixed_point?.W_candidate_frozen_for_independent_cold_audit!==true)fail('candidate not frozen');
if(audit.fixed_point?.W_G1_complete!==false)fail('W G1 must remain incomplete');
if(audit.fixed_point?.joint_G1_complete!==false)fail('joint G1 must remain incomplete');
if(audit.fixed_point?.G2_authorized!==false)fail('G2 must remain blocked');

const pm=new Map(predecessor.items.map(x=>[x.census_id,x]));
const changed=extraction.items.filter(x=>JSON.stringify(pm.get(x.census_id))!==JSON.stringify(x)).map(x=>x.census_id).sort();
const union=[...new Set([...product.corrections.map(x=>x.census_id),...semantic.corrections.map(x=>x.census_id)])].sort();
if(JSON.stringify(changed)!==JSON.stringify(union))fail('changed body union');
if(audit.counts?.changed_from_W_0_16!==changed.length)fail('audit changed count');
if(audit.counts?.byte_identical_from_W_0_16!==84-changed.length)fail('audit unchanged count');
if(errata.correction?.correct_value!==new Set(semantic.corrections.map(x=>x.census_id)).size)fail('errata corrected affected-body count');
if(errata.semantic_input_effect!=='NONE')fail('errata semantic effect');

const ids=new Set(extraction.items.flatMap(x=>x.occurrences.map(o=>o.occurrence_id)));
for(const c of product.corrections)if(!ids.has(c.occurrence.occurrence_id))fail('missing product correction '+c.occurrence.occurrence_id);
const priorFormula=JSON.parse(fs.readFileSync('experiments/062/W_G1_FORMULA_OPERATOR_ADJUDICATION_0_1.json','utf8'));
for(const c of priorFormula.corrections)if(!ids.has(c.occurrence.occurrence_id))fail('missing prior formula correction '+c.occurrence.occurrence_id);

console.log(JSON.stringify({
 schema:'isograph.exp062-verify-w-g1-source-local-fixed-point.v0.1',
 pass:errors.length===0,errors,current_input:extractionPath,item_count:84,occurrence_count:425,
 changed_from_W_0_16:changed.length,repeat_corrections:audit.counts?.current_repeat_corrections,
 W_G1_complete:audit.fixed_point?.W_G1_complete,G2_authorized:audit.fixed_point?.G2_authorized,
 gate_effect:'SOURCE_LOCAL_FIXED_POINT_INTEGRITY_ONLY_INDEPENDENT_COLD_AUDIT_STILL_REQUIRED'
},null,2));
if(errors.length)process.exitCode=1;