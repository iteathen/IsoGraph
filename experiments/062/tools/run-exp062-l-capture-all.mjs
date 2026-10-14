import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
const SHARD_SIZE=Number(process.env.L_SHARD_SIZE||20);
if(!SHA||!KEY)throw new Error('required environment missing');

const root='research/primitive-demand-qualification';
const corpusPath=root+'/SOURCE_DEMAND_CENSUS_0_1.json';
const methodPath=root+'/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const promptPath='experiments/062/OCCURRENCE_EXTRACTION_PROMPT_0_2.md';
const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');
const corpus=JSON.parse(frozen(corpusPath));
const all=corpus.items.filter(x=>x.track==='L');
const method=frozen(methodPath);
const publicPrompt=frozen(promptPath);
if(all.length!==151)throw new Error('expected 151 L bodies, got '+all.length);
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA)\b/i;
const out='out/exp062/L';
fs.mkdirSync(out+'/shards',{recursive:true});

function validate(x,selected){
 const e=[];
 if(x?.track!=='L')e.push('track mismatch');
 if(!Array.isArray(x?.items))return ['items not array'];
 const expected=selected.map(i=>i.census_id),actual=x.items.map(i=>i?.census_id);
 if(JSON.stringify(actual)!==JSON.stringify(expected))e.push('census ids/order mismatch');
 const byId=new Map(selected.map(i=>[i.census_id,i]));
 for(const item of x.items){
  const src=byId.get(item.census_id);if(!src)continue;
  if(!Array.isArray(item.occurrences))e.push(item.census_id+': occurrences not array');
  const seen=new Set();
  for(const o of item.occurrences||[]){
   if(typeof o.occurrence_id!=='string'||seen.has(o.occurrence_id))e.push(item.census_id+': bad/duplicate occurrence_id');
   seen.add(o.occurrence_id);
   if(typeof o.source_span!=='string'||!src.body.includes(o.source_span))e.push(o.occurrence_id+': source_span not exact');
   if(typeof o.relation_span!=='string'||!o.source_span?.includes(o.relation_span)||!src.body.includes(o.relation_span))e.push(o.occurrence_id+': relation_span not exact');
   if(!Array.isArray(o.argument_spans)||o.argument_spans.some(s=>typeof s!=='string'||!src.body.includes(s)))e.push(o.occurrence_id+': argument span not exact');
   if(!['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER'].includes(o.logical_force))e.push(o.occurrence_id+': logical_force');
   if(!['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED'].includes(o.definition_status))e.push(o.occurrence_id+': definition_status');
   if(!Array.isArray(o.depends_on))e.push(o.occurrence_id+': depends_on');
   if(forbidden.test(JSON.stringify({id:o.occurrence_id,lf:o.logical_force,ds:o.definition_status,deps:o.depends_on,note:o.load_bearing_note})))e.push(o.occurrence_id+': forbidden category label');
  }
  if(!['COMPLETE','INCOMPLETE_AMBIGUOUS_BOUNDARY'].includes(item.extraction_status))e.push(item.census_id+': extraction_status');
 }
 return e;
}

async function call(packet){
 const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:65536,temperature:0.1,responseMimeType:'application/json'}};
 const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
 let last='';
 for(let attempt=1;attempt<=12;attempt++){
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request),signal:AbortSignal.timeout(180000)});
  const txt=await response.text();
  if(response.ok){
   const data=JSON.parse(txt);
   const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
   return {raw,data,attempt};
  }
  last='HTTP '+response.status+' '+txt.slice(0,800);
  if(response.status<500&&response.status!==429)break;
  await new Promise(r=>setTimeout(r,Math.min(15000,1000*attempt)));
 }
 throw new Error('Gemini '+last);
}

const shards=[];for(let i=0;i<all.length;i+=SHARD_SIZE)shards.push(all.slice(i,Math.min(all.length,i+SHARD_SIZE)));
const merged=[],summary=[];
for(let si=0;si<shards.length;si++){
 const selected=shards[si],no=String(si+1).padStart(2,'0'),dir=out+'/shards/shard-'+no;
 fs.mkdirSync(dir,{recursive:true});
 const selectedCorpus={...corpus,items:selected,counts:{total:selected.length,L:selected.length},shard:{index:si+1,count:shards.length,start_census_id:selected[0].census_id,end_census_id:selected.at(-1).census_id}};
 const packet=[
  'ISOGRAPH EXPERIMENT 062 — GRAPH-FIRST SEMANTIC OCCURRENCE EXTRACTION — L SHARD '+(si+1)+'/'+shards.length,
  'Frozen SHA: '+SHA,'Requested track: L',
  'This is a fixed-order execution shard of the frozen L corpus. Return every and only the listed shard census IDs, in listed order.',
  'Use only the delimited files. Do not browse or use repository history.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== PUBLIC EXTRACTION PROMPT =====\n'+publicPrompt,
  '\n===== FROZEN L SHARD CORPUS =====\n'+JSON.stringify(selectedCorpus,null,2)
 ].join('\n');
 let x,parsed,errors;
 try{
  x=await call(packet);
  fs.writeFileSync(dir+'/EXTRACTION_RAW.txt',x.raw+'\n');
  parsed=JSON.parse(x.raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,''));
  errors=validate(parsed,selected);
  fs.writeFileSync(dir+'/EXTRACTION.json',JSON.stringify(parsed,null,2)+'\n');
  fs.writeFileSync(dir+'/EXTRACTION_VALIDATION.json',JSON.stringify({pass:errors.length===0,errors,track:'L',item_count:parsed.items?.length||0,packet_sha256:h(packet),report_sha256:h(x.raw),model:MODEL,source_sha:SHA,finish_reason:x.data.candidates?.[0]?.finishReason??null,api_attempt:x.attempt,shard:si+1,shard_count:shards.length},null,2)+'\n');
  merged.push(...(parsed.items||[]));
  summary.push({shard:si+1,start:selected[0].census_id,end:selected.at(-1).census_id,expected_count:selected.length,captured_count:parsed.items?.length||0,validation:errors.length?'DEFECTS_RECORDED':'PASS',errors,api_attempt:x.attempt});
 }catch(err){
  const message=String(err?.stack||err);
  fs.writeFileSync(dir+'/CAPTURE_ERROR.txt',message+'\n');
  summary.push({shard:si+1,start:selected[0].census_id,end:selected.at(-1).census_id,expected_count:selected.length,captured_count:0,validation:'TRANSPORT_OR_PARSE_FAILURE',errors:[message]});
 }
 fs.writeFileSync(out+'/EXTRACTION_PROGRESS_0_1.json',JSON.stringify({schema:'isograph.exp062-l-extraction-progress.v0.1',source_sha:SHA,completed_shards:summary.length,total_shards:shards.length,captured_items:merged.length,total_items:all.length,shards:summary,authority:false},null,2)+'\n');
}
const extraction={track:'L',items:merged};
const errors=validate(extraction,all);
fs.writeFileSync(out+'/EXTRACTION_CAPTURE_ALL_0_1.json',JSON.stringify(extraction,null,2)+'\n');
fs.writeFileSync(out+'/EXTRACTION_CAPTURE_ALL_VALIDATION_0_1.json',JSON.stringify({pass:errors.length===0,errors,track:'L',captured_item_count:merged.length,expected_item_count:all.length,source_sha:SHA,shard_size:SHARD_SIZE,shard_count:shards.length,shard_summary:summary,authority:false,status:errors.length?'RECONCILIATION_REQUIRED':'VALIDATED'},null,2)+'\n');
console.log(JSON.stringify({capture_complete:true,captured_item_count:merged.length,expected_item_count:all.length,validation_pass:errors.length===0,validation_error_count:errors.length,failed_shards:summary.filter(x=>x.validation==='TRANSPORT_OR_PARSE_FAILURE').map(x=>x.shard)},null,2));
