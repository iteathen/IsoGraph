import fs from 'node:fs';

const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_20.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_21.json','utf8'));
const adj=JSON.parse(fs.readFileSync('experiments/062/L_G1_FORMULA_OPERATOR_ADJUDICATION_0_1.json','utf8'));
const frontier=JSON.parse(fs.readFileSync('experiments/062/L_G1_FORMULA_OPERATOR_FRONTIER_0_2.json','utf8'));

const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const prevMap=new Map(prev.items.map(x=>[x.census_id,x]));
const nextMap=new Map(next.items.map(x=>[x.census_id,x]));
const byBody=new Map();
for(const c of adj.corrections){ if(!byBody.has(c.census_id))byBody.set(c.census_id,[]); byBody.get(c.census_id).push(c); }
const errors=[];

if(prev.track!=='L'||prev.items.length!==151)errors.push('bad predecessor');
if(next.track!=='L'||next.items.length!==151)errors.push('bad successor');
if(prev.items.reduce((n,x)=>n+(x.occurrences||[]).length,0)!==578)errors.push('predecessor count');
if(next.items.reduce((n,x)=>n+(x.occurrences||[]).length,0)!==675)errors.push('successor count');
if(adj.corrections.length!==99)errors.push('correction count');
if(adj.corrections.filter(x=>x.action==='ADD_OCCURRENCE').length!==97)errors.push('addition count');
if(adj.corrections.filter(x=>x.action==='REPLACE_OCCURRENCE').length!==2)errors.push('replacement count');
if(frontier.counts.total_tokens!==143)errors.push('frontier token count');
if(adj.token_dispositions.length!==143)errors.push('token disposition count');
if(adj.token_dispositions.some(x=>x.disposition==='UNRESOLVED'))errors.push('unresolved token disposition');

const ids=new Set();
for(const item of next.items){
  const body=bodies.get(item.census_id), p=prevMap.get(item.census_id);
  if(!body||!p){errors.push('missing body/prev '+item.census_id);continue;}
  const expected=JSON.parse(JSON.stringify(p));
  for(const c of byBody.get(item.census_id)||[]){
    const o=c.occurrence;
    if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))errors.push('adjudicated source '+o.occurrence_id);
    if(!o.source_span.includes(o.relation_span))errors.push('adjudicated relation '+o.occurrence_id);
    for(const a of o.argument_spans||[])if(!o.source_span.includes(a))errors.push('adjudicated arg '+o.occurrence_id+' :: '+a);
    if(c.action==='ADD_OCCURRENCE') expected.occurrences.push(o);
    else if(c.action==='REPLACE_OCCURRENCE'){
      const i=expected.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
      if(i<0||c.replace_id!==o.occurrence_id)errors.push('bad replacement '+o.occurrence_id);
      else expected.occurrences[i]=o;
    } else errors.push('bad action '+c.action);
  }
  if(JSON.stringify(expected)!==JSON.stringify(item))errors.push('successor mismatch '+item.census_id);

  const prior=new Set(), sigs=new Map();
  for(const o of item.occurrences||[]){
    if(ids.has(o.occurrence_id))errors.push('duplicate '+o.occurrence_id); ids.add(o.occurrence_id);
    if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))errors.push('source '+o.occurrence_id);
    if(!o.source_span.includes(o.relation_span))errors.push('relation '+o.occurrence_id);
    for(const a of o.argument_spans||[])if(!o.source_span.includes(a))errors.push('arg '+o.occurrence_id+' :: '+a);
    for(const d of o.depends_on||[])if(!prior.has(d))errors.push('dependency '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(sigs.has(sig))errors.push('semantic duplicate '+sigs.get(sig)+' / '+o.occurrence_id);
    sigs.set(sig,o.occurrence_id);
  }
}

const frontierKeys=[];
for(const it of frontier.items)for(const t of it.tokens)frontierKeys.push(JSON.stringify([it.census_id,t.kind,t.lexeme,t.start,t.end]));
const dispositionKeys=adj.token_dispositions.map(x=>JSON.stringify([x.census_id,x.kind,x.lexeme,x.start,x.end]));
if(new Set(frontierKeys).size!==frontierKeys.length)errors.push('frontier token key duplicate');
if(new Set(dispositionKeys).size!==dispositionKeys.length)errors.push('disposition token key duplicate');
if(JSON.stringify([...frontierKeys].sort())!==JSON.stringify([...dispositionKeys].sort()))errors.push('frontier/disposition conservation mismatch');

const promoted=new Set(adj.token_dispositions.filter(x=>x.disposition==='PROMOTE_SOURCE_OPERATOR'||x.disposition==='SUBTOKEN_OF_EXPLICIT_SOURCE_EXPRESSION').map(x=>x.occurrence_id));
for(const c of adj.corrections)if(!promoted.has(c.occurrence.occurrence_id))errors.push('unreferenced correction '+c.occurrence.occurrence_id);
for(const x of adj.token_dispositions){
  if(x.occurrence_id){
    const item=nextMap.get(x.census_id);
    if(!item?.occurrences.some(o=>o.occurrence_id===x.occurrence_id))errors.push('missing disposition occurrence '+x.occurrence_id);
  }
}

const l130=nextMap.get('L-SSC-130');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O01')?.argument_spans?.[0]!=='individual generalized reflections')errors.push('L130 individual scope');
if(!l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O03')?.source_span?.includes('even compositions'))errors.push('L130 even-composition scope');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O06')?.argument_spans?.[1]!=='T')errors.push('L130 T preservation');

console.log(JSON.stringify({
  pass:errors.length===0,
  errors,
  items:next.items.length,
  predecessor_occurrences:578,
  successor_occurrences:675,
  corrections:99,
  frontier_tokens:143,
  token_disposition_counts:adj.counts.token_disposition_counts,
  all_complete:next.items.every(x=>x.extraction_status==='COMPLETE')
},null,2));
if(errors.length)process.exitCode=1;
