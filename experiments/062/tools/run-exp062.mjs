import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const mode=(process.argv[2]||'').trim();
const role=(process.argv[3]||'').trim();
if(!['W','L'].includes(mode)||!['extract','audit'].includes(role)) throw new Error('usage: node run-exp062.mjs W|L extract|audit');

const SHA=process.env.GITHUB_SHA;
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!KEY)throw new Error('GEMINI_API_KEY unavailable');

const root='research/primitive-demand-qualification';
const corpusPath=root+'/SOURCE_DEMAND_CENSUS_0_1.json';
const methodPath=root+'/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const promptPath='experiments/062/OCCURRENCE_EXTRACTION_PROMPT.md';
const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');
const corpus=JSON.parse(frozen(corpusPath));
const selected={...corpus,items:corpus.items.filter(x=>x.track===mode),counts:{total:corpus.items.filter(x=>x.track===mode).length,[mode]:corpus.items.filter(x=>x.track===mode).length}};
const method=frozen(methodPath);
const publicPrompt=frozen(promptPath);

const forbiddenOutput=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA)\b/i;

function validateExtraction(x){
 const errors=[];
 if(x?.track!==mode)errors.push('track mismatch');
 if(!Array.isArray(x?.items))return ['items not array'];
 const expected=selected.items.map(i=>i.census_id);
 const actual=x.items.map(i=>i?.census_id);
 if(JSON.stringify(actual)!==JSON.stringify(expected))errors.push('census ids/order mismatch');
 const byId=new Map(selected.items.map(i=>[i.census_id,i]));
 for(const item of x.items){
  const src=byId.get(item.census_id);
  if(!src)continue;
  if(!Array.isArray(item.occurrences))errors.push(item.census_id+': occurrences not array');
  const seen=new Set();
  for(const o of item.occurrences||[]){
   if(typeof o.occurrence_id!=='string'||seen.has(o.occurrence_id))errors.push(item.census_id+': bad/duplicate occurrence_id');
   seen.add(o.occurrence_id);
   if(typeof o.source_span!=='string'||!src.body.includes(o.source_span))errors.push(o.occurrence_id+': source_span not exact');
   if(typeof o.relation_span!=='string'||!o.source_span?.includes(o.relation_span)||!src.body.includes(o.relation_span))errors.push(o.occurrence_id+': relation_span not exact');
   if(!Array.isArray(o.argument_spans)||o.argument_spans.some(s=>typeof s!=='string'||!src.body.includes(s)))errors.push(o.occurrence_id+': argument span not exact');
   if(!['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER'].includes(o.logical_force))errors.push(o.occurrence_id+': logical_force');
   if(!['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED'].includes(o.definition_status))errors.push(o.occurrence_id+': definition_status');
   if(!Array.isArray(o.depends_on))errors.push(o.occurrence_id+': depends_on');
   const nonQuote=JSON.stringify({id:o.occurrence_id,logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,note:o.load_bearing_note});
   if(forbiddenOutput.test(nonQuote))errors.push(o.occurrence_id+': forbidden basis/category label');
  }
  if(!['COMPLETE','INCOMPLETE_AMBIGUOUS_BOUNDARY'].includes(item.extraction_status))errors.push(item.census_id+': extraction_status');
 }
 return errors;
}

async function call(packet){
 const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:65536,temperature:0.1,responseMimeType:'application/json'}};
 const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
 let response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request),signal:AbortSignal.timeout(180000)});
 const txt=await response.text();
 if(!response.ok)throw new Error('Gemini HTTP '+response.status+' '+txt.slice(0,500));
 const data=JSON.parse(txt);
 const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
 return {raw,data};
}

const out='out/exp062/'+mode;
fs.mkdirSync(out,{recursive:true});

if(role==='extract'){
 const packet=[
  'ISOGRAPH EXPERIMENT 062 — GRAPH-FIRST SEMANTIC OCCURRENCE EXTRACTION',
  'Frozen SHA: '+SHA,
  'Requested track: '+mode,
  'Use only the delimited files. Do not browse or use repository history.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== PUBLIC EXTRACTION PROMPT =====\n'+publicPrompt,
  '\n===== FROZEN REQUESTED CORPUS =====\n'+JSON.stringify(selected,null,2)
 ].join('\n');
 const {raw,data}=await call(packet);
 fs.writeFileSync(out+'/EXTRACTION_RAW.txt',raw+'\n');
 let parsed=JSON.parse(raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,''));
 const errors=validateExtraction(parsed);
 fs.writeFileSync(out+'/EXTRACTION.json',JSON.stringify(parsed,null,2)+'\n');
 fs.writeFileSync(out+'/EXTRACTION_VALIDATION.json',JSON.stringify({pass:errors.length===0,errors,track:mode,item_count:parsed.items?.length||0,packet_sha256:h(packet),report_sha256:h(raw),model:MODEL,source_sha:SHA,finish_reason:data.candidates?.[0]?.finishReason??null},null,2)+'\n');
 if(errors.length)process.exitCode=1;
}else{
 const extractionPath=out+'/EXTRACTION.json';
 if(!fs.existsSync(extractionPath))throw new Error('missing extraction for '+mode);
 const extraction=fs.readFileSync(extractionPath,'utf8');
 const packet=[
  'ISOGRAPH EXPERIMENT 062 — SOURCE-CONSERVATION AUDIT',
  'Frozen SHA: '+SHA,
  'Requested track: '+mode,
  'You are auditing a frozen semantic-occurrence extraction. Do not propose primitives or mathematical categories.',
  'For each census item, determine whether the extraction omitted a load-bearing non-Core operation/relation, added a spurious one, or used a non-exact semantic boundary.',
  'Return JSON: {"track":"'+mode+'","items":[{"census_id":"...","status":"PASS|CORRECTION_REQUIRED","omissions":[{"source_span":"exact contiguous source substring","reason":"..."}],"spurious_occurrence_ids":[],"boundary_notes":["..."]}],"overall":"PASS|CORRECTIONS_REQUIRED"}.',
  'Every omission source_span must be an exact contiguous substring of the frozen body. Do not emit PD-*, B-*, DNWF, DNIA, primitive proposals, or W/L correspondences.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== FROZEN REQUESTED CORPUS =====\n'+JSON.stringify(selected,null,2),
  '\n===== FROZEN EXTRACTION =====\n'+extraction
 ].join('\n');
 const {raw,data}=await call(packet);
 fs.writeFileSync(out+'/AUDIT_RAW.txt',raw+'\n');
 const parsed=JSON.parse(raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,''));
 const errors=[];
 const expected=selected.items.map(i=>i.census_id);
 if(parsed.track!==mode)errors.push('track mismatch');
 if(!Array.isArray(parsed.items)||JSON.stringify(parsed.items.map(i=>i.census_id))!==JSON.stringify(expected))errors.push('audit census ids/order mismatch');
 const byId=new Map(selected.items.map(i=>[i.census_id,i]));
 for(const item of parsed.items||[]){
  const src=byId.get(item.census_id); if(!src)continue;
  if(!['PASS','CORRECTION_REQUIRED'].includes(item.status))errors.push(item.census_id+': status');
  if(!Array.isArray(item.omissions)||item.omissions.some(o=>typeof o.source_span!=='string'||!src.body.includes(o.source_span)))errors.push(item.census_id+': omission span');
  if(!Array.isArray(item.spurious_occurrence_ids)||!Array.isArray(item.boundary_notes))errors.push(item.census_id+': audit arrays');
  if(forbiddenOutput.test(JSON.stringify({status:item.status,omissions:item.omissions,spurious:item.spurious_occurrence_ids,notes:item.boundary_notes})))errors.push(item.census_id+': forbidden category label');
 }
 fs.writeFileSync(out+'/AUDIT.json',JSON.stringify(parsed,null,2)+'\n');
 fs.writeFileSync(out+'/AUDIT_VALIDATION.json',JSON.stringify({pass:errors.length===0,errors,track:mode,item_count:parsed.items?.length||0,packet_sha256:h(packet),report_sha256:h(raw),model:MODEL,source_sha:SHA,finish_reason:data.candidates?.[0]?.finishReason??null},null,2)+'\n');
 if(errors.length)process.exitCode=1;
}
