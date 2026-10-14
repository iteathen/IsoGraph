import fs from 'node:fs';
const C=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_3.json','utf8'));
const P=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_22.json','utf8'));
const A=JSON.parse(fs.readFileSync('experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_23.json','utf8'));
const S=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_23.json','utf8'));
const e=[],c=(x,m)=>{if(!x)e.push(m)};
const E=JSON.parse(JSON.stringify(P));E.items[E.items.findIndex(x=>x.census_id===A.replacement.census_id)]=A.replacement.replacement_item;c(JSON.stringify(E)===JSON.stringify(S),'replay');
const changed=[];for(let i=0;i<P.items.length;i++)if(JSON.stringify(P.items[i])!==JSON.stringify(S.items[i]))changed.push(P.items[i].census_id);c(JSON.stringify(changed)===JSON.stringify(['W-SSC-097']),'changed');
const body=C.items.find(x=>x.track==='W'&&x.census_id==='W-SSC-097')?.body,w=S.items.find(x=>x.census_id==='W-SSC-097'),o08=w?.occurrences.find(o=>o.occurrence_id==='W-SSC-097-O08'),o05=w?.occurrences.find(o=>o.occurrence_id==='W-SSC-097-O05');
c(body?.includes(o08?.source_span),'O08 source');c(o08?.source_span==='real points'&&o08?.relation_span==='real'&&JSON.stringify(o08?.argument_spans)===JSON.stringify(['points']),'O08 shape');c(o08?.definition_status==='NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED','O08 definition');c(o05?.depends_on?.includes('W-SSC-097-O08'),'O05 dependency');
const ids=new Set();for(const it of S.items)for(const o of it.occurrences){c(!ids.has(o.occurrence_id),'dup '+o.occurrence_id);ids.add(o.occurrence_id);}
c(S.items.reduce((n,x)=>n+x.occurrences.length,0)===446,'count');
const sem=JSON.stringify({o08,o05});for(const t of ['221103','EMPTY_TYPED_PREDICATE','L-SSC-'])c(!sem.includes(t),'pre-G5 leak '+t);
console.log(JSON.stringify({schema:'isograph.exp062-verify-w-extraction-reconciled-0-23.v0.1',pass:!e.length,errors:e,occurrences:446,changed_bodies:changed,real_predicate_exposed:!!o08},null,2));if(e.length)process.exitCode=1;
