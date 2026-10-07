import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_24.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_25.json','utf8'));
const adj=JSON.parse(fs.readFileSync('experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_25.json','utf8'));
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const errors=[];
if(prev.items.reduce((n,x)=>n+x.occurrences.length,0)!==817)errors.push('predecessor count');
if(next.items.reduce((n,x)=>n+x.occurrences.length,0)!==818)errors.push('successor count');
if(prev.items.length!==151||next.items.length!==151)errors.push('item count');
if(adj.corrections.length!==1||adj.audit_scope?.coverage!=='151/151')errors.push('adjudication shape');
const target='L-SSC-075';
for(const item of next.items){
 const body=bodies.get(item.census_id), p=prev.items.find(x=>x.census_id===item.census_id);
 if(!body||!p){errors.push('missing '+item.census_id);continue;}
 const expected=JSON.parse(JSON.stringify(p));
 if(item.census_id===target)expected.occurrences.push(adj.corrections[0].occurrence);
 if(JSON.stringify(expected)!==JSON.stringify(item))errors.push('successor mismatch '+item.census_id);
 const prior=new Set(),ids=new Set(),sigs=new Map();
 for(const o of item.occurrences){
  if(ids.has(o.occurrence_id))errors.push('local dup '+o.occurrence_id);ids.add(o.occurrence_id);
  if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))errors.push('source '+o.occurrence_id);
  if(!o.source_span.includes(o.relation_span))errors.push('relation '+o.occurrence_id);
  for(const a of o.argument_spans||[])if(!o.source_span.includes(a))errors.push('arg '+o.occurrence_id+' :: '+a);
  for(const d of o.depends_on||[])if(!prior.has(d))errors.push('dep '+o.occurrence_id+' -> '+d);prior.add(o.occurrence_id);
  const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
  if(sigs.has(sig))errors.push('semantic dup '+sigs.get(sig)+' / '+o.occurrence_id);sigs.set(sig,o.occurrence_id);
 }
}
const l075=next.items.find(x=>x.census_id==='L-SSC-075');
if(!l075?.occurrences.some(o=>o.relation_span==='same'&&o.argument_spans?.[0]==='spin(11,3) Clifford presentation'))errors.push('L075 same relation missing');
const l130=next.items.find(x=>x.census_id==='L-SSC-130');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O01')?.argument_spans?.[0]!=='individual generalized reflections')errors.push('L130 individual');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O06')?.argument_spans?.[1]!=='T')errors.push('L130 preserve T');
console.log(JSON.stringify({pass:errors.length===0,errors,items:151,predecessor_occurrences:817,successor_occurrences:818,all_complete:next.items.every(x=>x.extraction_status==='COMPLETE')},null,2));
if(errors.length)process.exitCode=1;
