import fs from 'node:fs';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_14.json';
const adjudicationPath='experiments/062/W_G1_FORMULA_OPERATOR_ADJUDICATION_0_1.json';
const successorPath='experiments/062/W_EXTRACTION_RECONCILED_0_15.json';

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const successor=JSON.parse(fs.readFileSync(successorPath,'utf8'));
const errors=[],fail=m=>errors.push(m);

const expected=JSON.parse(JSON.stringify(predecessor));
const expectedBy=new Map(expected.items.map(x=>[x.census_id,x]));
for(const c of adjudication.corrections||[]){
  if(c.action!=='ADD_OCCURRENCE'){fail('unsupported adjudication action '+c.action);continue;}
  const it=expectedBy.get(c.census_id);
  if(!it){fail('missing expected item '+c.census_id);continue;}
  if(it.occurrences.some(o=>o.occurrence_id===c.occurrence.occurrence_id))fail('expected id collision '+c.occurrence.occurrence_id);
  else it.occurrences.push(c.occurrence);
}
if(JSON.stringify(expected)!==JSON.stringify(successor))fail('successor is not exact predecessor+formula-adjudication replay');

const expectedItems=corpus.items.filter(x=>x.track==='W');
const bodies=new Map(expectedItems.map(x=>[x.census_id,x.body]));
const predCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
const succCount=successor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predecessor.track!=='W'||predecessor.items.length!==84||predCount!==331)fail('predecessor shape/count');
if(adjudication.corrections?.length!==53)fail('adjudication correction count '+String(adjudication.corrections?.length));
if(successor.track!=='W'||successor.items.length!==84||succCount!==384)fail('successor shape/count');
if(JSON.stringify(successor.items.map(x=>x.census_id))!==JSON.stringify(expectedItems.map(x=>x.census_id)))fail('census ids/order mismatch');

const allowedForces=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDefinitions=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const allowedOccurrenceKeys=new Set(['occurrence_id','source_span','relation_span','argument_spans','logical_force','definition_status','depends_on','load_bearing_note']);
const globalIds=new Set();

function countSubstring(haystack,needle){
  if(typeof needle!=='string'||needle.length===0)return 0;
  let count=0,pos=0;
  while((pos=haystack.indexOf(needle,pos))!==-1){count++;pos+=needle.length;}
  return count;
}

for(const item of successor.items){
  const body=bodies.get(item.census_id);
  if(typeof body!=='string'){fail('unknown item '+item.census_id);continue;}
  if(item.extraction_status!=='COMPLETE')fail('incomplete '+item.census_id);
  const prior=new Set(),signatures=new Map();
  for(const o of item.occurrences||[]){
    if(typeof o.occurrence_id!=='string'||!o.occurrence_id)fail('missing occurrence id '+item.census_id);
    else if(globalIds.has(o.occurrence_id))fail('global duplicate '+o.occurrence_id);
    else globalIds.add(o.occurrence_id);
    const extra=Object.keys(o).filter(k=>!allowedOccurrenceKeys.has(k));
    if(extra.length)fail('undeclared fields '+o.occurrence_id+' '+JSON.stringify(extra));
    if(typeof o.source_span!=='string'||!body.includes(o.source_span))fail('source span '+o.occurrence_id);
    else if(countSubstring(body,o.source_span)!==1)fail('source span not uniquely reversible '+o.occurrence_id);
    if(typeof o.relation_span!=='string'||!o.source_span?.includes(o.relation_span))fail('relation span '+o.occurrence_id);
    if(!Array.isArray(o.argument_spans))fail('argument_spans '+o.occurrence_id);
    else for(const a of o.argument_spans)if(typeof a!=='string'||!o.source_span.includes(a))fail('argument span '+o.occurrence_id+' :: '+a);
    if(!allowedForces.has(o.logical_force))fail('logical_force '+o.occurrence_id);
    if(!allowedDefinitions.has(o.definition_status))fail('definition_status '+o.occurrence_id);
    if(!Array.isArray(o.depends_on))fail('depends_on '+o.occurrence_id);
    else for(const d of o.depends_on)if(!prior.has(d))fail('dependency not prior/same-item '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(signatures.has(sig))fail('exact duplicate semantic occurrence '+signatures.get(sig)+' / '+o.occurrence_id);
    else signatures.set(sig,o.occurrence_id);
    const nonSource=JSON.stringify({
      logical_force:o.logical_force,
      definition_status:o.definition_status,
      depends_on:o.depends_on,
      load_bearing_note:o.load_bearing_note
    });
    if(/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA)\b/i.test(nonSource))fail('pre-G5 leakage '+o.occurrence_id);
  }
}

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-extraction-reconciled-0-15.v0.1',
  pass:errors.length===0,
  errors,
  item_count:successor.items.length,
  predecessor_occurrence_count:predCount,
  added_occurrences:adjudication.corrections.length,
  occurrence_count:succCount,
  exact_replay:!errors.includes('successor is not exact predecessor+formula-adjudication replay'),
  gate_effect:'DETERMINISTIC_ONLY_SOURCE_LOCAL_FIXED_POINT_REAUDIT_AND_INDEPENDENT_COLD_AUDIT_REQUIRED'
},null,2));
if(errors.length)process.exitCode=1;
