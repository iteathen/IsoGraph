import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_21.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_22.json','utf8'));
const frontier=JSON.parse(fs.readFileSync('experiments/062/L_G1_COMPACT_OPERATOR_FRONTIER_0_1.json','utf8'));
const adj=JSON.parse(fs.readFileSync('experiments/062/L_G1_COMPACT_OPERATOR_ADJUDICATION_0_1.json','utf8'));
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const prevMap=new Map(prev.items.map(x=>[x.census_id,x]));
const byBody=new Map();
for(const c of adj.corrections){if(!byBody.has(c.census_id))byBody.set(c.census_id,[]);byBody.get(c.census_id).push(c);}
const errors=[];
if(prev.track!=='L'||prev.items.length!==151)errors.push('bad predecessor');
if(next.track!=='L'||next.items.length!==151)errors.push('bad successor');
if(prev.items.reduce((n,x)=>n+(x.occurrences||[]).length,0)!==675)errors.push('predecessor count');
if(next.items.reduce((n,x)=>n+(x.occurrences||[]).length,0)!==733)errors.push('successor count');
if(frontier.candidates.length!==61)errors.push('frontier count');
if(adj.candidate_dispositions.length!==61)errors.push('disposition count');
if(adj.corrections.length!==58)errors.push('correction count');
if(adj.candidate_dispositions.filter(x=>x.disposition==='ALREADY_EXPLICIT_RELATION').length!==3)errors.push('already explicit count');
if(adj.candidate_dispositions.filter(x=>x.disposition==='PROMOTE_SOURCE_OCCURRENCE').length!==58)errors.push('promotion count');
const ids=new Set();
for(const item of next.items){
 const body=bodies.get(item.census_id),p=prevMap.get(item.census_id);
 if(!body||!p){errors.push('missing body/prev '+item.census_id);continue;}
 const expected=JSON.parse(JSON.stringify(p));
 for(const c of byBody.get(item.census_id)||[]){
  const o=c.occurrence;
  if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))errors.push('adjudicated source '+o.occurrence_id);
  if(!o.source_span.includes(o.relation_span))errors.push('adjudicated relation '+o.occurrence_id);
  for(const a of o.argument_spans||[])if(!o.source_span.includes(a))errors.push('adjudicated arg '+o.occurrence_id+' :: '+a);
  const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans]);
  if(expected.occurrences.some(x=>JSON.stringify([x.source_span,x.relation_span,x.argument_spans])===sig))errors.push('preexisting semantic duplicate '+o.occurrence_id);
  expected.occurrences.push(o);
 }
 if(JSON.stringify(expected)!==JSON.stringify(item))errors.push('successor mismatch '+item.census_id);
 const prior=new Set(),sigs=new Map();
 for(const o of item.occurrences||[]){
  if(ids.has(o.occurrence_id))errors.push('duplicate '+o.occurrence_id);ids.add(o.occurrence_id);
  if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))errors.push('source '+o.occurrence_id);
  if(!o.source_span.includes(o.relation_span))errors.push('relation '+o.occurrence_id);
  for(const a of o.argument_spans||[])if(!o.source_span.includes(a))errors.push('arg '+o.occurrence_id+' :: '+a);
  for(const d of o.depends_on||[])if(!prior.has(d))errors.push('dependency '+o.occurrence_id+' -> '+d);
  prior.add(o.occurrence_id);
  const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
  if(sigs.has(sig))errors.push('exact semantic duplicate '+sigs.get(sig)+' / '+o.occurrence_id);
  sigs.set(sig,o.occurrence_id);
 }
}
const candIds=frontier.candidates.map(x=>x.candidate_id).sort();
const dispIds=adj.candidate_dispositions.map(x=>x.candidate_id).sort();
if(JSON.stringify(candIds)!==JSON.stringify(dispIds))errors.push('frontier/disposition conservation');
for(const d of adj.candidate_dispositions){
 const item=next.items.find(x=>x.census_id===d.census_id);
 if(!item?.occurrences.some(o=>o.occurrence_id===d.occurrence_id))errors.push('missing disposition occurrence '+d.occurrence_id);
}
const l130=next.items.find(x=>x.census_id==='L-SSC-130');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O01')?.argument_spans?.[0]!=='individual generalized reflections')errors.push('L130 individual scope');
if(!l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O03')?.source_span?.includes('even compositions'))errors.push('L130 even composition');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O06')?.argument_spans?.[1]!=='T')errors.push('L130 T preservation');
console.log(JSON.stringify({pass:errors.length===0,errors,items:151,predecessor_occurrences:675,successor_occurrences:733,frontier_candidates:61,corrections:58,all_complete:next.items.every(x=>x.extraction_status==='COMPLETE')},null,2));
if(errors.length)process.exitCode=1;
