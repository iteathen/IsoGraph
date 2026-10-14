import fs from 'node:fs';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_15.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_16.json';
const successorPath='experiments/062/W_EXTRACTION_RECONCILED_0_16.json';

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const successor=JSON.parse(fs.readFileSync(successorPath,'utf8'));
const errors=[],fail=m=>errors.push(m);

const expected=JSON.parse(JSON.stringify(predecessor));
const expectedBy=new Map(expected.items.map(x=>[x.census_id,x]));
for(const c of adjudication.corrections||[]){
  if(c.action!=='ADD_OCCURRENCE'){fail('unsupported action '+c.action);continue;}
  const item=expectedBy.get(c.census_id);
  if(!item){fail('missing expected item '+c.census_id);continue;}
  if(item.occurrences.some(o=>o.occurrence_id===c.occurrence.occurrence_id))fail('id collision '+c.occurrence.occurrence_id);
  else item.occurrences.push(c.occurrence);
}
if(JSON.stringify(expected)!==JSON.stringify(successor))fail('successor is not exact predecessor+adjudication replay');

const expectedItems=corpus.items.filter(x=>x.track==='W');
const bodies=new Map(expectedItems.map(x=>[x.census_id,x.body]));
const predCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
const succCount=successor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predecessor.track!=='W'||predecessor.items.length!==84||predCount!==384)fail('predecessor shape/count');
if((adjudication.corrections||[]).length!==26)fail('adjudication correction count');
if(successor.track!=='W'||successor.items.length!==84||succCount!==410)fail('successor shape/count');
if(JSON.stringify(successor.items.map(x=>x.census_id))!==JSON.stringify(expectedItems.map(x=>x.census_id)))fail('census ids/order mismatch');

const allowedForces=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDefinitions=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const allowedKeys=new Set(['occurrence_id','source_span','relation_span','argument_spans','logical_force','definition_status','depends_on','load_bearing_note']);
const global=new Set();
for(const item of successor.items){
  const body=bodies.get(item.census_id); if(typeof body!=='string'){fail('unknown item '+item.census_id);continue;}
  if(item.extraction_status!=='COMPLETE')fail('incomplete '+item.census_id);
  const prior=new Set(),sigs=new Map();
  for(const o of item.occurrences||[]){
    if(typeof o.occurrence_id!=='string'||!o.occurrence_id)fail('missing id '+item.census_id);
    else if(global.has(o.occurrence_id))fail('global duplicate '+o.occurrence_id);
    else global.add(o.occurrence_id);
    const extra=Object.keys(o).filter(k=>!allowedKeys.has(k)); if(extra.length)fail('undeclared fields '+o.occurrence_id);
    if(typeof o.source_span!=='string'||!body.includes(o.source_span))fail('source span '+o.occurrence_id);
    if(typeof o.relation_span!=='string'||!o.source_span?.includes(o.relation_span))fail('relation span '+o.occurrence_id);
    if(!Array.isArray(o.argument_spans))fail('argument_spans '+o.occurrence_id);
    else for(const a of o.argument_spans)if(typeof a!=='string'||!o.source_span.includes(a))fail('argument span '+o.occurrence_id+' :: '+a);
    if(!allowedForces.has(o.logical_force))fail('logical_force '+o.occurrence_id);
    if(!allowedDefinitions.has(o.definition_status))fail('definition_status '+o.occurrence_id);
    if(!Array.isArray(o.depends_on))fail('depends_on '+o.occurrence_id);
    else for(const d of o.depends_on)if(!prior.has(d))fail('dependency not prior/same-item '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(sigs.has(sig))fail('exact duplicate semantic occurrence '+sigs.get(sig)+' / '+o.occurrence_id);
    else sigs.set(sig,o.occurrence_id);
    const ns=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,load_bearing_note:o.load_bearing_note});
    if(/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA)\b/i.test(ns))fail('pre-G5 leakage '+o.occurrence_id);
  }
}
console.log(JSON.stringify({
 schema:'isograph.exp062-verify-w-extraction-reconciled-0-16.v0.1',
 pass:errors.length===0,errors,item_count:successor.items.length,predecessor_occurrence_count:predCount,
 added_occurrences:adjudication.corrections.length,occurrence_count:succCount,
 gate_effect:'DETERMINISTIC_ONLY_COMPLETE_ZERO_CHANGE_REPEAT_AND_INDEPENDENT_COLD_AUDIT_REQUIRED'
},null,2));
if(errors.length)process.exitCode=1;
