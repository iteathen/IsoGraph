import fs from 'node:fs';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_5.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_6.json';
const successorPath='experiments/062/W_EXTRACTION_RECONCILED_0_6.json';

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const successor=JSON.parse(fs.readFileSync(successorPath,'utf8'));
const errors=[];
const fail=(m)=>errors.push(m);
const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const predecessorItems=new Map(predecessor.items.map(x=>[x.census_id,x]));
const addsByItem=new Map();

for(const c of adjudication.corrections){
  if(c.action!=='ADD_OCCURRENCE') fail('W 0.6 adjudication contains non-add action '+c.action);
  if(!addsByItem.has(c.census_id)) addsByItem.set(c.census_id,[]);
  addsByItem.get(c.census_id).push(c.occurrence);
}

if(successor.track!=='W') fail('successor track is not W');
if(successor.items.length!==84) fail('successor item count '+successor.items.length);
const occurrenceCount=successor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(occurrenceCount!==210) fail('successor occurrence count '+occurrenceCount);
if(adjudication.corrections.length!==33) fail('adjudication correction count '+adjudication.corrections.length);

const countSubstring=(h,n)=>{
  if(!n) return 0;
  let p=0,c=0;
  while((p=h.indexOf(n,p))!==-1){c++;p+=n.length;}
  return c;
};

const globalIds=new Set();
for(const item of successor.items){
  const body=bodies.get(item.census_id);
  const prev=predecessorItems.get(item.census_id);
  const adds=addsByItem.get(item.census_id)||[];
  if(typeof body!=='string'||!prev){fail('missing frozen/predecessor item '+item.census_id);continue;}
  if(item.extraction_status!=='COMPLETE') fail('incomplete successor item '+item.census_id);

  const expected=[...prev.occurrences,...adds];
  if(JSON.stringify(item.occurrences)!==JSON.stringify(expected)) fail('successor is not exact predecessor+adjudication for '+item.census_id);

  const prior=new Set();
  const signatures=new Map();
  for(const o of item.occurrences||[]){
    if(globalIds.has(o.occurrence_id)) fail('duplicate global occurrence id '+o.occurrence_id);
    globalIds.add(o.occurrence_id);
    if(!body.includes(o.source_span)) fail('source span not in frozen body '+o.occurrence_id);
    if(countSubstring(body,o.source_span)!==1) fail('source span not uniquely reversible '+o.occurrence_id);
    if(!o.source_span.includes(o.relation_span)) fail('relation span not enclosed '+o.occurrence_id);
    for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) fail('argument span not enclosed '+o.occurrence_id+' :: '+a);
    for(const d of o.depends_on||[]) if(!prior.has(d)) fail('dependency not prior/same-item '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(signatures.has(sig)) fail('exact duplicate semantic signature '+signatures.get(sig)+' / '+o.occurrence_id);
    signatures.set(sig,o.occurrence_id);
    const nonSource=JSON.stringify({
      logical_force:o.logical_force,
      definition_status:o.definition_status,
      depends_on:o.depends_on,
      load_bearing_note:o.load_bearing_note
    });
    if(/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA)\b/i.test(nonSource)) fail('forbidden historical/basis token '+o.occurrence_id);
  }
}

const result={
  schema:'isograph.exp062-verify-w-extraction-reconciled-0-6.v0.1',
  pass:errors.length===0,
  errors,
  predecessor:predecessorPath,
  adjudication:adjudicationPath,
  successor:successorPath,
  item_count:successor.items.length,
  occurrence_count:occurrenceCount,
  added_occurrences:33,
  affected_bodies:addsByItem.size,
  exact_predecessor_plus_adjudication:errors.every(x=>!x.startsWith('successor is not exact')),
  gate_effect:'DETERMINISTIC_SUCCESSOR_VERIFICATION_ONLY_INDEPENDENT_ALL_84_COLD_AUDIT_STILL_REQUIRED'
};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exitCode=1;
