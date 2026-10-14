import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
const SHARD_SIZE=Number(process.env.L_SHARD_SIZE||20);
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!KEY)throw new Error('GEMINI_API_KEY unavailable');
if(!Number.isInteger(SHARD_SIZE)||SHARD_SIZE<5||SHARD_SIZE>40)throw new Error('bad L_SHARD_SIZE');

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

const forbiddenOutput=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA)\b/i;
const out='out/exp062/L';
fs.mkdirSync(out+'/shards',{recursive:true});

function validateExtraction(x,selected){
 const errors=[];
 if(x?.track!=='L')errors.push('track mismatch');
 if(!Array.isArray(x?.items))return ['items not array'];
 const expected=selected.map(i=>i.census_id);
 const actual=x.items.map(i=>i?.census_id);
 if(JSON.stringify(actual)!==JSON.stringify(expected))errors.push('census ids/order mismatch');
 const byId=new Map(selected.map(i=>[i.census_id,i]));
 for(const item of x.items){
  const src=byId.get(item.census_id); if(!src)continue;
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

function validateAudit(x,selected){
 const errors=[];
 const expected=selected.map(i=>i.census_id);
 if(x?.track!=='L')errors.push('track mismatch');
 if(!Array.isArray(x?.items)||JSON.stringify(x.items.map(i=>i?.census_id))!==JSON.stringify(expected))errors.push('audit census ids/order mismatch');
 const byId=new Map(selected.map(i=>[i.census_id,i]));
 for(const item of x.items||[]){
  const src=byId.get(item.census_id); if(!src)continue;
  if(!['PASS','CORRECTION_REQUIRED'].includes(item.status))errors.push(item.census_id+': status');
  if(!Array.isArray(item.omissions)||item.omissions.some(o=>typeof o.source_span!=='string'||!src.body.includes(o.source_span)))errors.push(item.census_id+': omission span');
  if(!Array.isArray(item.spurious_occurrence_ids)||!Array.isArray(item.boundary_notes))errors.push(item.census_id+': audit arrays');
  if(forbiddenOutput.test(JSON.stringify({status:item.status,omissions:item.omissions,spurious:item.spurious_occurrence_ids,notes:item.boundary_notes})))errors.push(item.census_id+': forbidden category label');
 }
 if(!['PASS','CORRECTIONS_REQUIRED'].includes(x?.overall))errors.push('overall');
 return errors;
}

async function call(packet){
 const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:65536,temperature:0.1,responseMimeType:'application/json'}};
 const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
 let last='';
 for(let attempt=1;attempt<=4;attempt++){
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request),signal:AbortSignal.timeout(180000)});
  const txt=await response.text();
  if(response.ok){
   const data=JSON.parse(txt);
   const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
   return {raw,data,attempt};
  }
  last='HTTP '+response.status+' '+txt.slice(0,800);
  if(response.status<500&&response.status!==429)break;
  await new Promise(r=>setTimeout(r,1500*attempt));
 }
 throw new Error('Gemini '+last);
}

const shards=[];
for(let start=0;start<all.length;start+=SHARD_SIZE)shards.push(all.slice(start,Math.min(all.length,start+SHARD_SIZE)));
const mergedExtraction=[];
const mergedAudit=[];
const shardSummary=[];

for(let si=0;si<shards.length;si++){
 const selected=shards[si];
 const shardNo=String(si+1).padStart(2,'0');
 const dir=out+'/shards/shard-'+shardNo;
 fs.mkdirSync(dir,{recursive:true});
 const selectedCorpus={...corpus,items:selected,counts:{total:selected.length,L:selected.length},shard:{index:si+1,count:shards.length,start_census_id:selected[0].census_id,end_census_id:selected.at(-1).census_id}};
 const extractPacket=[
  'ISOGRAPH EXPERIMENT 062 — GRAPH-FIRST SEMANTIC OCCURRENCE EXTRACTION — L SHARD '+(si+1)+'/'+shards.length,
  'Frozen SHA: '+SHA,
  'Requested track: L',
  'This is a fixed-order execution shard of the frozen L corpus. Return every and only the listed shard census IDs, in listed order.',
  'Use only the delimited files. Do not browse or use repository history.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== PUBLIC EXTRACTION PROMPT =====\n'+publicPrompt,
  '\n===== FROZEN L SHARD CORPUS =====\n'+JSON.stringify(selectedCorpus,null,2)
 ].join('\n');
 const ex=await call(extractPacket);
 fs.writeFileSync(dir+'/EXTRACTION_RAW.txt',ex.raw+'\n');
 const parsed=JSON.parse(ex.raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,''));
 const exErrors=validateExtraction(parsed,selected);
 fs.writeFileSync(dir+'/EXTRACTION.json',JSON.stringify(parsed,null,2)+'\n');
 fs.writeFileSync(dir+'/EXTRACTION_VALIDATION.json',JSON.stringify({pass:exErrors.length===0,errors:exErrors,track:'L',item_count:parsed.items?.length||0,packet_sha256:h(extractPacket),report_sha256:h(ex.raw),model:MODEL,source_sha:SHA,finish_reason:ex.data.candidates?.[0]?.finishReason??null,api_attempt:ex.attempt,shard:si+1,shard_count:shards.length},null,2)+'\n');
 if(exErrors.length)throw new Error('shard '+shardNo+' extraction invalid: '+JSON.stringify(exErrors.slice(0,20)));
 mergedExtraction.push(...parsed.items);

 const auditPacket=[
  'ISOGRAPH EXPERIMENT 062 — SOURCE-CONSERVATION AUDIT — L SHARD '+(si+1)+'/'+shards.length,
  'Frozen SHA: '+SHA,
  'Requested track: L',
  'You are auditing a frozen semantic-occurrence extraction. Do not propose primitives or mathematical categories.',
  'For each census item, determine whether the extraction omitted a load-bearing non-Core operation/relation, added a spurious one, or used a non-exact semantic boundary.',
  'Return JSON: {"track":"L","items":[{"census_id":"...","status":"PASS|CORRECTION_REQUIRED","omissions":[{"source_span":"exact contiguous source substring","reason":"..."}],"spurious_occurrence_ids":[],"boundary_notes":["..."]}],"overall":"PASS|CORRECTIONS_REQUIRED"}.',
  'Every omission source_span must be an exact contiguous substring of the frozen body. Do not emit PD-*, B-*, DNWF, DNIA, primitive proposals, or W/L correspondences.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== FROZEN L SHARD CORPUS =====\n'+JSON.stringify(selectedCorpus,null,2),
  '\n===== FROZEN SHARD EXTRACTION =====\n'+JSON.stringify(parsed,null,2)
 ].join('\n');
 const au=await call(auditPacket);
 fs.writeFileSync(dir+'/AUDIT_RAW.txt',au.raw+'\n');
 const aud=JSON.parse(au.raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,''));
 const auErrors=validateAudit(aud,selected);
 fs.writeFileSync(dir+'/AUDIT.json',JSON.stringify(aud,null,2)+'\n');
 fs.writeFileSync(dir+'/AUDIT_VALIDATION.json',JSON.stringify({pass:auErrors.length===0,errors:auErrors,track:'L',item_count:aud.items?.length||0,packet_sha256:h(auditPacket),report_sha256:h(au.raw),model:MODEL,source_sha:SHA,finish_reason:au.data.candidates?.[0]?.finishReason??null,api_attempt:au.attempt,shard:si+1,shard_count:shards.length},null,2)+'\n');
 if(auErrors.length)throw new Error('shard '+shardNo+' audit invalid: '+JSON.stringify(auErrors.slice(0,20)));
 mergedAudit.push(...aud.items);
 shardSummary.push({shard:si+1,start:selected[0].census_id,end:selected.at(-1).census_id,count:selected.length,extraction_pass:true,audit_contract_pass:true,audit_overall:aud.overall,corrections_required:aud.items.filter(x=>x.status==='CORRECTION_REQUIRED').length});
}

const extraction={track:'L',items:mergedExtraction};
const fullErrors=validateExtraction(extraction,all);
if(fullErrors.length)throw new Error('merged extraction invalid '+JSON.stringify(fullErrors.slice(0,20)));
const audit={track:'L',items:mergedAudit,overall:mergedAudit.some(x=>x.status==='CORRECTION_REQUIRED')?'CORRECTIONS_REQUIRED':'PASS'};
const fullAuditErrors=validateAudit(audit,all);
if(fullAuditErrors.length)throw new Error('merged audit invalid '+JSON.stringify(fullAuditErrors.slice(0,20)));
fs.writeFileSync(out+'/EXTRACTION_SHARDED_0_1.json',JSON.stringify(extraction,null,2)+'\n');
fs.writeFileSync(out+'/AUDIT_SHARDED_0_1.json',JSON.stringify(audit,null,2)+'\n');
fs.writeFileSync(out+'/SHARDED_SUMMARY_0_1.json',JSON.stringify({schema:'isograph.exp062-l-sharded-summary.v0.1',source_sha:SHA,method:methodPath,prompt:promptPath,shard_size:SHARD_SIZE,shard_count:shards.length,item_count:all.length,full_extraction_validation:'PASS',full_audit_contract_validation:'PASS',audit_overall:audit.overall,corrections_required:mergedAudit.filter(x=>x.status==='CORRECTION_REQUIRED').map(x=>x.census_id),shards:shardSummary,authority:false},null,2)+'\n');
console.log(JSON.stringify({pass:true,item_count:all.length,shard_count:shards.length,audit_overall:audit.overall,corrections_required:mergedAudit.filter(x=>x.status==='CORRECTION_REQUIRED').map(x=>x.census_id)},null,2));
