import fs from 'node:fs';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_9.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_10.json';
const successorPath='experiments/062/W_EXTRACTION_RECONCILED_0_10.json';

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const successor=JSON.parse(fs.readFileSync(successorPath,'utf8'));
const errors=[],fail=m=>errors.push(m);
const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const expected=JSON.parse(JSON.stringify(predecessor));
const items=new Map(expected.items.map(x=>[x.census_id,x]));

for(const c of adjudication.corrections){
  if(c.action!=='ADD_OCCURRENCE'){fail('unsupported action '+c.action);continue;}
  const it=items.get(c.census_id); if(!it){fail('missing item '+c.census_id);continue;}
  if(it.occurrences.some(x=>x.occurrence_id===c.occurrence.occurrence_id))fail('collision '+c.occurrence.occurrence_id);
  else it.occurrences.push(c.occurrence);
}
if(JSON.stringify(expected)!==JSON.stringify(successor))fail('successor is not exact predecessor+adjudication replay');

const predCount=predecessor.items.reduce((n,x)=>n+x.occurrences.length,0);
const succCount=successor.items.reduce((n,x)=>n+x.occurrences.length,0);
if(predCount!==281)fail('predecessor count '+predCount);
if(adjudication.corrections.length!==25)fail('correction count '+adjudication.corrections.length);
if(succCount!==306)fail('successor count '+succCount);
if(successor.track!=='W'||successor.items.length!==84)fail('successor shape');

const allowedForces=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDefinitions=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const allowedKeys=new Set(['occurrence_id','source_span','relation_span','argument_spans','logical_force','definition_status','depends_on','load_bearing_note']);
const global=new Set();

function countSubstring(h,n){if(!n)return 0;let p=0,c=0;while((p=h.indexOf(n,p))!==-1){c++;p+=n.length;}return c;}

for(const it of successor.items){
  const body=bodies.get(it.census_id),prior=new Set(),sigs=new Map();
  if(!body){fail('missing body '+it.census_id);continue;}
  if(it.extraction_status!=='COMPLETE')fail('incomplete '+it.census_id);
  for(const o of it.occurrences){
    if(global.has(o.occurrence_id))fail('global duplicate '+o.occurrence_id); global.add(o.occurrence_id);
    const extra=Object.keys(o).filter(k=>!allowedKeys.has(k)); if(extra.length)fail('extra fields '+o.occurrence_id+' '+extra.join(','));
    if(typeof o.source_span!=='string'||!body.includes(o.source_span))fail('source span '+o.occurrence_id);
    else if(countSubstring(body,o.source_span)!==1)fail('non-unique source span '+o.occurrence_id);
    if(typeof o.relation_span!=='string'||!o.source_span?.includes(o.relation_span))fail('relation span '+o.occurrence_id);
    if(!Array.isArray(o.argument_spans))fail('args '+o.occurrence_id);
    else for(const a of o.argument_spans)if(typeof a!=='string'||!o.source_span.includes(a))fail('arg '+o.occurrence_id+' :: '+a);
    if(!allowedForces.has(o.logical_force))fail('force '+o.occurrence_id);
    if(!allowedDefinitions.has(o.definition_status))fail('definition '+o.occurrence_id);
    if(!Array.isArray(o.depends_on))fail('deps '+o.occurrence_id);
    else for(const d of o.depends_on)if(!prior.has(d))fail('dependency '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(sigs.has(sig))fail('semantic duplicate '+sigs.get(sig)+' / '+o.occurrence_id); else sigs.set(sig,o.occurrence_id);
    const nonSource=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,load_bearing_note:o.load_bearing_note});
    if(/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA)\b/i.test(nonSource))fail('pre-G5 leakage '+o.occurrence_id);
  }
}

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-extraction-reconciled-0-10.v0.1',
  pass:!errors.length,
  errors,
  item_count:successor.items.length,
  predecessor_occurrence_count:predCount,
  additions:adjudication.corrections.length,
  occurrence_count:succCount,
  exact_replay:errors.every(x=>x!=='successor is not exact predecessor+adjudication replay'),
  gate_effect:'DETERMINISTIC_ONLY_COMPLETE_84_BODY_SUCCESSOR_AUDIT_AND_INDEPENDENT_COLD_AUDIT_REQUIRED'
},null,2));
if(errors.length)process.exitCode=1;
