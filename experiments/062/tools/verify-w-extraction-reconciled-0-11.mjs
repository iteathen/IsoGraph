import fs from 'node:fs';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_10.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_11.json';
const successorPath='experiments/062/W_EXTRACTION_RECONCILED_0_11.json';
const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const successor=JSON.parse(fs.readFileSync(successorPath,'utf8'));
const errors=[],fail=m=>errors.push(m);
const expected=JSON.parse(JSON.stringify(predecessor)),by=new Map(expected.items.map(x=>[x.census_id,x]));
let additions=0,replacements=0;
for(const c of adjudication.corrections){const it=by.get(c.census_id);if(!it){fail('item '+c.census_id);continue;}if(c.action==='ADD_OCCURRENCE'){if(it.occurrences.some(o=>o.occurrence_id===c.occurrence.occurrence_id))fail('collision '+c.occurrence.occurrence_id);else {it.occurrences.push(c.occurrence);additions++;}}else if(c.action==='REPLACE_OCCURRENCE'){const i=it.occurrences.findIndex(o=>o.occurrence_id===c.replace_id);if(i<0)fail('replace '+c.replace_id);else {if(c.occurrence.occurrence_id!==c.replace_id)fail('replace id '+c.replace_id);it.occurrences[i]=c.occurrence;replacements++;}}else fail('action '+c.action);}
if(JSON.stringify(expected)!==JSON.stringify(successor))fail('successor is not exact replay');
const predCount=predecessor.items.reduce((n,x)=>n+x.occurrences.length,0),succCount=successor.items.reduce((n,x)=>n+x.occurrences.length,0);
if(predCount!==306||succCount!==317||additions!==11||replacements!==1)fail('counts '+JSON.stringify({predCount,succCount,additions,replacements}));
if(successor.track!=='W'||successor.items.length!==84)fail('shape');
const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const forces=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const defs=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const keys=new Set(['occurrence_id','source_span','relation_span','argument_spans','logical_force','definition_status','depends_on','load_bearing_note']);
const global=new Set();
const countSubstring=(h,n)=>{if(!n)return 0;let p=0,c=0;while((p=h.indexOf(n,p))!==-1){c++;p+=n.length;}return c;};
for(const it of successor.items){const body=bodies.get(it.census_id),prior=new Set(),sigs=new Map();if(!body){fail('body '+it.census_id);continue;}if(it.extraction_status!=='COMPLETE')fail('incomplete '+it.census_id);for(const o of it.occurrences){if(global.has(o.occurrence_id))fail('global duplicate '+o.occurrence_id);global.add(o.occurrence_id);const extra=Object.keys(o).filter(k=>!keys.has(k));if(extra.length)fail('extra '+o.occurrence_id);if(!body.includes(o.source_span))fail('source '+o.occurrence_id);else if(countSubstring(body,o.source_span)!==1)fail('source nonunique '+o.occurrence_id);if(!o.source_span.includes(o.relation_span))fail('relation '+o.occurrence_id);for(const a of o.argument_spans||[])if(!o.source_span.includes(a))fail('arg '+o.occurrence_id+' :: '+a);if(!forces.has(o.logical_force))fail('force '+o.occurrence_id);if(!defs.has(o.definition_status))fail('definition '+o.occurrence_id);for(const d of o.depends_on||[])if(!prior.has(d))fail('dep '+o.occurrence_id+' -> '+d);prior.add(o.occurrence_id);const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);if(sigs.has(sig))fail('duplicate '+sigs.get(sig)+' / '+o.occurrence_id);sigs.set(sig,o.occurrence_id);const nonSource=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,load_bearing_note:o.load_bearing_note});if(/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA)\b/i.test(nonSource))fail('pre-G5 '+o.occurrence_id);}}
console.log(JSON.stringify({schema:'isograph.exp062-verify-w-extraction-reconciled-0-11.v0.1',pass:!errors.length,errors,item_count:successor.items.length,predecessor_occurrence_count:predCount,additions,replacements,occurrence_count:succCount,gate_effect:'DETERMINISTIC_ONLY_COMPLETE_84_BODY_SUCCESSOR_AUDIT_AND_INDEPENDENT_COLD_AUDIT_REQUIRED'},null,2));
if(errors.length)process.exitCode=1;
