import fs from 'node:fs';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_7.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_8.json';
const successorPath='experiments/062/W_EXTRACTION_RECONCILED_0_8.json';

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const successor=JSON.parse(fs.readFileSync(successorPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const predItems=new Map(predecessor.items.map(x=>[x.census_id,x]));
const allowedForces=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDefinitions=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const allowedKeys=new Set(['occurrence_id','source_span','relation_span','argument_spans','logical_force','definition_status','depends_on','load_bearing_note']);
const countSubstring=(h,n)=>{if(!n)return 0;let p=0,c=0;while((p=h.indexOf(n,p))!==-1){c++;p+=n.length;}return c;};

if(successor.track!=='W') fail('successor track');
if(successor.items.length!==84) fail('item count '+successor.items.length);
const predCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
const succCount=successor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predCount!==219) fail('predecessor count '+predCount);
if(succCount!==252) fail('successor count '+succCount);
if(adjudication.corrections.length!==34) fail('correction count '+adjudication.corrections.length);

const expected=JSON.parse(JSON.stringify(predecessor));
const expectedItems=new Map(expected.items.map(x=>[x.census_id,x]));
let additions=0,replacements=0;
for(const c of adjudication.corrections){
  const item=expectedItems.get(c.census_id);
  if(!item){fail('adjudication item '+c.census_id);continue;}
  if(c.action==='ADD_OCCURRENCE'){
    if(item.occurrences.some(x=>x.occurrence_id===c.occurrence.occurrence_id)) fail('add collision '+c.occurrence.occurrence_id);
    item.occurrences.push(c.occurrence); additions++;
  }else if(c.action==='REPLACE_OCCURRENCE'){
    const i=item.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
    if(i<0) fail('replace missing '+c.replace_id);
    else if(c.occurrence.occurrence_id!==c.replace_id) fail('replace id changed '+c.replace_id);
    else item.occurrences[i]=c.occurrence;
    replacements++;
  }else fail('unsupported action '+c.action);
}
if(additions!==33||replacements!==1) fail('action counts '+additions+'/'+replacements);
if(JSON.stringify(successor)!==JSON.stringify(expected)) fail('successor is not exact deterministic replay of predecessor plus adjudication');

const globalIds=new Set();
for(const item of successor.items){
  const body=bodies.get(item.census_id);
  const pred=predItems.get(item.census_id);
  if(!body||!pred){fail('missing body/predecessor '+item.census_id);continue;}
  if(item.extraction_status!=='COMPLETE') fail('incomplete '+item.census_id);
  const prior=new Set(), signatures=new Map();
  for(const o of item.occurrences||[]){
    if(globalIds.has(o.occurrence_id)) fail('duplicate global id '+o.occurrence_id);
    globalIds.add(o.occurrence_id);
    const extra=Object.keys(o).filter(k=>!allowedKeys.has(k));
    if(extra.length) fail('extra fields '+o.occurrence_id+' '+JSON.stringify(extra));
    if(typeof o.source_span!=='string'||!body.includes(o.source_span)) fail('source '+o.occurrence_id);
    else if(countSubstring(body,o.source_span)!==1) fail('non-unique source span '+o.occurrence_id);
    if(typeof o.relation_span!=='string'||!o.source_span.includes(o.relation_span)) fail('relation '+o.occurrence_id);
    if(!Array.isArray(o.argument_spans)) fail('args array '+o.occurrence_id);
    else for(const a of o.argument_spans) if(typeof a!=='string'||!o.source_span.includes(a)) fail('arg '+o.occurrence_id+' :: '+a);
    if(!allowedForces.has(o.logical_force)) fail('force '+o.occurrence_id);
    if(!allowedDefinitions.has(o.definition_status)) fail('definition '+o.occurrence_id);
    if(!Array.isArray(o.depends_on)) fail('deps array '+o.occurrence_id);
    else for(const d of o.depends_on) if(!prior.has(d)) fail('dependency '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    if(typeof o.load_bearing_note!=='string'||!o.load_bearing_note.trim()) fail('note '+o.occurrence_id);
    const nonSource=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,load_bearing_note:o.load_bearing_note});
    if(/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA)\b/i.test(nonSource)) fail('forbidden pre-G5 token '+o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(signatures.has(sig)) fail('duplicate semantic signature '+signatures.get(sig)+' / '+o.occurrence_id);
    signatures.set(sig,o.occurrence_id);
  }
}

console.log(JSON.stringify({
 schema:'isograph.exp062-verify-w-extraction-reconciled-0-8.v0.1',
 pass:errors.length===0,
 errors,
 predecessor:predecessorPath,
 adjudication:adjudicationPath,
 successor:successorPath,
 item_count:successor.items.length,
 predecessor_occurrence_count:predCount,
 additions,
 replacements,
 occurrence_count:succCount,
 exact_predecessor_plus_adjudication:!errors.includes('successor is not exact deterministic replay of predecessor plus adjudication'),
 gate_effect:'DETERMINISTIC_SUCCESSOR_VERIFICATION_ONLY_FULL_MANUAL_SOURCE_AUDIT_AND_INDEPENDENT_ALL_84_COLD_AUDIT_STILL_REQUIRED'
},null,2));
if(errors.length) process.exitCode=1;
