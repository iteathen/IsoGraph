import fs from 'node:fs';
const predecessor=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_24.json','utf8'));
const adj=JSON.parse(fs.readFileSync('experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_25.json','utf8'));
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0)!==817)fail('predecessor count');
if(adj.corrections.length!==1)fail('correction count');
const bodyMap=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const out=JSON.parse(JSON.stringify(predecessor)),item=out.items.find(x=>x.census_id==='L-SSC-075'),o=adj.corrections[0].occurrence,body=bodyMap.get('L-SSC-075');
if(!body.includes(o.source_span)||body.indexOf(o.source_span)!==body.lastIndexOf(o.source_span))fail('source');
if(!o.source_span.includes(o.relation_span)||!o.argument_spans.every(a=>o.source_span.includes(a)))fail('incidence');
const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans]);
if(item.occurrences.some(x=>JSON.stringify([x.source_span,x.relation_span,x.argument_spans])===sig))fail('duplicate');
item.occurrences.push(o);
const count=out.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);if(count!==818)fail('successor count');
const ids=new Set();
for(const it of out.items){const b=bodyMap.get(it.census_id),prior=new Set(),sigs=new Map();for(const x of it.occurrences){
 if(ids.has(x.occurrence_id))fail('dup '+x.occurrence_id);ids.add(x.occurrence_id);
 if(!b.includes(x.source_span)||b.indexOf(x.source_span)!==b.lastIndexOf(x.source_span))fail('source '+x.occurrence_id);
 if(!x.source_span.includes(x.relation_span)||!x.argument_spans.every(a=>x.source_span.includes(a)))fail('incidence '+x.occurrence_id);
 for(const d of x.depends_on||[])if(!prior.has(d))fail('dep '+x.occurrence_id+' -> '+d);prior.add(x.occurrence_id);
 const s=JSON.stringify([x.source_span,x.relation_span,x.argument_spans,x.logical_force,x.definition_status,x.depends_on]);if(sigs.has(s))fail('semantic dup '+x.occurrence_id);sigs.set(s,x.occurrence_id);
}}
fs.writeFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_25.json',JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({pass:true,items:151,predecessor_occurrences:817,corrections:1,successor_occurrences:818},null,2));
