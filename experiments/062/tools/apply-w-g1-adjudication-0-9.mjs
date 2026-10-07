import fs from 'node:fs';

const predecessorPath='experiments/062/W_EXTRACTION_RECONCILED_0_8.json';
const adjudicationPath='experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_9.json';
const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const outputPath='experiments/062/W_EXTRACTION_RECONCILED_0_9.json';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const fail=m=>{throw new Error(m)};
if(predecessor.track!=='W'||predecessor.items.length!==84) fail('bad W predecessor');
const predCount=predecessor.items.reduce((n,x)=>n+(x.occurrences||[]).length,0);
if(predCount!==252) fail('predecessor count '+predCount);
if(adjudication.predecessor_input!==predecessorPath) fail('adjudication predecessor mismatch');
if(adjudication.corrections.length!==40) fail('correction count');

const bodies=new Map(corpus.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const output=JSON.parse(JSON.stringify(predecessor));
const items=new Map(output.items.map(x=>[x.census_id,x]));
const globalIds=new Set(output.items.flatMap(x=>x.occurrences.map(o=>o.occurrence_id)));
let additions=0,replacements=0;
for(const c of adjudication.corrections){
 const item=items.get(c.census_id),body=bodies.get(c.census_id),o=c.occurrence;
 if(!item||!body) fail('missing '+c.census_id);
 if(!body.includes(o.source_span)||!o.source_span.includes(o.relation_span)) fail('span '+o.occurrence_id);
 for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) fail('arg '+o.occurrence_id+' :: '+a);
 if(c.action==='ADD_OCCURRENCE'){
   if(globalIds.has(o.occurrence_id)) fail('collision '+o.occurrence_id);
   item.occurrences.push(o);globalIds.add(o.occurrence_id);additions++;
 }else if(c.action==='REPLACE_OCCURRENCE'){
   const i=item.occurrences.findIndex(x=>x.occurrence_id===c.replace_id);
   if(i<0||o.occurrence_id!==c.replace_id) fail('replace '+c.replace_id);
   item.occurrences[i]=o;replacements++;
 }else fail('action '+c.action);
}
const count=output.items.reduce((n,x)=>n+x.occurrences.length,0);
if(additions!==29||replacements!==11||count!==281) fail('counts '+additions+'/'+replacements+'/'+count);
for(const item of output.items){
 const body=bodies.get(item.census_id),prior=new Set(),sigs=new Map();
 for(const o of item.occurrences){
   if(!body.includes(o.source_span)||!o.source_span.includes(o.relation_span)) fail('post span '+o.occurrence_id);
   for(const a of o.argument_spans||[]) if(!o.source_span.includes(a)) fail('post arg '+o.occurrence_id);
   for(const d of o.depends_on||[]) if(!prior.has(d)) fail('dependency '+o.occurrence_id+' -> '+d);
   prior.add(o.occurrence_id);
   const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
   if(sigs.has(sig)) fail('duplicate '+sigs.get(sig)+' / '+o.occurrence_id);
   sigs.set(sig,o.occurrence_id);
 }
}
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({pass:true,predecessor:predecessorPath,adjudication:adjudicationPath,output:outputPath,items:84,predecessor_occurrences:predCount,additions,replacements,successor_occurrences:count},null,2));
