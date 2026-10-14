import fs from 'node:fs';

const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const prev=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_14.json','utf8'));
const next=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_15.json','utf8'));
const adj=JSON.parse(fs.readFileSync('experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_15.json','utf8'));
const frontier=JSON.parse(fs.readFileSync('experiments/062/G1_SURFACE_LOCATOR_COVERAGE_FRONTIER_0_1.json','utf8'));
const locator=JSON.parse(fs.readFileSync('experiments/062/L_G1_LOCATOR_ADJUDICATION_0_15.json','utf8'));

const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const prevMap=new Map(prev.items.map(x=>[x.census_id,x]));
const nextMap=new Map(next.items.map(x=>[x.census_id,x]));
const correctionsByBody=new Map();
for(const c of adj.corrections){ if(!correctionsByBody.has(c.census_id)) correctionsByBody.set(c.census_id,[]); correctionsByBody.get(c.census_id).push(c); }
const errors=[];
if(next.track!=='L') errors.push('track mismatch');
if(next.items.length!==151) errors.push('item count '+next.items.length);
if(prev.items.length!==151) errors.push('predecessor item count '+prev.items.length);
if(adj.corrections.length!==42) errors.push('correction count '+adj.corrections.length);
if(adj.corrections.filter(x=>x.action==='ADD_OCCURRENCE').length!==41) errors.push('addition count');
if(adj.corrections.filter(x=>x.action==='REPLACE_OCCURRENCE').length!==1) errors.push('replacement count');

const globalIds=new Set();
for(const item of next.items){
  const body=bodies.get(item.census_id);
  const p=prevMap.get(item.census_id);
  if(!body||!p) errors.push('missing body/predecessor '+item.census_id);
  if(item.extraction_status!=='COMPLETE') errors.push('incomplete '+item.census_id);
  const expected=JSON.parse(JSON.stringify(p));
  const list=correctionsByBody.get(item.census_id)||[];
  for(const c of list){
    const o=c.occurrence;
    if(!body.includes(o.source_span)) errors.push('adjudicated source span '+o.occurrence_id);
    if(!o.source_span.includes(o.relation_span)) errors.push('adjudicated relation span '+o.occurrence_id);
    for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) errors.push('adjudicated argument '+o.occurrence_id+' :: '+a);
    if(c.action==='ADD_OCCURRENCE') expected.occurrences.push(o);
    else if(c.action==='REPLACE_OCCURRENCE'){
      const i=expected.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
      if(i<0||c.replace_id!==o.occurrence_id) errors.push('bad replacement '+o.occurrence_id);
      else expected.occurrences[i]=o;
    } else errors.push('unsupported action '+c.action);
  }
  if(JSON.stringify(expected)!==JSON.stringify(item)) errors.push('successor mismatch '+item.census_id);

  const prior=new Set(), sigs=new Map();
  for(const o of item.occurrences||[]){
    if(globalIds.has(o.occurrence_id)) errors.push('duplicate id '+o.occurrence_id);
    globalIds.add(o.occurrence_id);
    if(!body.includes(o.source_span)) errors.push('source span '+o.occurrence_id);
    if(!o.source_span.includes(o.relation_span)) errors.push('relation span '+o.occurrence_id);
    for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) errors.push('argument '+o.occurrence_id+' :: '+a);
    for(const d of o.depends_on||[]) if(!prior.has(d)) errors.push('dependency '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    if(sigs.has(sig)) errors.push('semantic duplicate '+sigs.get(sig)+' / '+o.occurrence_id);
    sigs.set(sig,o.occurrence_id);
  }
}
const count=next.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(count!==411) errors.push('occurrence count '+count);

const recomputed=[];
for(const x of frontier.items.filter(x=>x.track==='L')){
  const item=nextMap.get(x.census_id),body=x.frozen_body; let covered=false;
  for(const o of item.occurrences||[]){
    let idx=body.indexOf(o.source_span);
    while(idx>=0){ if(idx<=x.body_start && idx+o.source_span.length>=x.body_end){ covered=true; break; } idx=body.indexOf(o.source_span,idx+1); }
    if(covered) break;
  }
  if(!covered) recomputed.push(x.locator_occurrence_id);
}
const adjudicated=locator.items.map(x=>x.locator_occurrence_id);
if(recomputed.length!==38) errors.push('remaining locator count '+recomputed.length);
if(new Set(adjudicated).size!==adjudicated.length) errors.push('locator duplicate');
if(JSON.stringify([...recomputed].sort())!==JSON.stringify([...adjudicated].sort())) errors.push('locator conservation mismatch');
if(locator.counts.unassigned!==0||locator.counts.duplicates!==0) errors.push('locator conservation counters');

const l130=nextMap.get('L-SSC-130');
for(const id of ['L-SSC-130-O01','L-SSC-130-O03','L-SSC-130-O04','L-SSC-130-O05']) if(!l130?.occurrences.some(x=>x.occurrence_id===id)) errors.push('L130 protected semantic missing '+id);
const l177=nextMap.get('L-SSC-177');
for(const id of ['L-SSC-177-O02','L-SSC-177-O03','L-SSC-177-O04']) if(!l177?.occurrences.some(x=>x.occurrence_id===id)) errors.push('L177 condition missing '+id);
const l178=nextMap.get('L-SSC-178');
for(const id of ['L-SSC-178-O01','L-SSC-178-O02','L-SSC-178-O03']) if(!l178?.occurrences.some(x=>x.occurrence_id===id)) errors.push('L178 condition missing '+id);

console.log(JSON.stringify({
  pass:errors.length===0,
  errors,
  item_count:next.items.length,
  predecessor_occurrence_count:prev.items.reduce((n,x)=>n+(x.occurrences||[]).length,0),
  occurrence_count:count,
  corrections:adj.corrections.length,
  locator_remaining:recomputed.length,
  locator_adjudicated:adjudicated.length,
  all_complete:next.items.every(x=>x.extraction_status==='COMPLETE')
},null,2));
if(errors.length) process.exitCode=1;
