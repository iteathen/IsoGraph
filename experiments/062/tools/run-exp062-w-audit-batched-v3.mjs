import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
const BATCH_SIZE=Number(process.env.EXP062_W_AUDIT_BATCH_SIZE||12);
if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!KEY) throw new Error('GEMINI_API_KEY unavailable');
if(!Number.isInteger(BATCH_SIZE)||BATCH_SIZE<1||BATCH_SIZE>24) throw new Error('invalid batch size');

const root='research/primitive-demand-qualification';
const corpusPath=root+'/SOURCE_DEMAND_CENSUS_0_1.json';
const methodPath=root+'/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_2.json';
const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');
const corpus=JSON.parse(frozen(corpusPath));
const method=frozen(methodPath);
const extraction=JSON.parse(frozen(extractionPath));
const selectedItems=corpus.items.filter(x=>x.track==='W');
const bySource=new Map(selectedItems.map(x=>[x.census_id,x]));
const byExtraction=new Map(extraction.items.map(x=>[x.census_id,x]));
const expected=selectedItems.map(x=>x.census_id);
const forbiddenOutput=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA)\b/i;

if(extraction.track!=='W') throw new Error('W extraction track mismatch');
if(JSON.stringify(extraction.items.map(x=>x.census_id))!==JSON.stringify(expected)) throw new Error('W extraction corpus/order mismatch');

const out='out/exp062-w-audit';
fs.mkdirSync(out,{recursive:true});

function stripFence(raw){
 return raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,'');
}

async function call(packet){
 const request={
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{candidateCount:1,maxOutputTokens:32768,temperature:0.1,responseMimeType:'application/json'}
 };
 const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
 const delays=[0,2000,5000,10000];
 let lastError=null;
 for(let attempt=0; attempt<delays.length; attempt++){
  if(delays[attempt]) await new Promise(resolve=>setTimeout(resolve,delays[attempt]));
  try{
   const response=await fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json','x-goog-api-key':KEY},
    body:JSON.stringify(request),
    signal:AbortSignal.timeout(180000)
   });
   const txt=await response.text();
   if(response.ok){
    const data=JSON.parse(txt);
    const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
    return {raw,data,transport_attempt:attempt+1};
   }
   const retryable=[429,500,502,503,504].includes(response.status);
   lastError=new Error('Gemini HTTP '+response.status+' '+txt.slice(0,500));
   if(!retryable) throw lastError;
  }catch(err){
   lastError=err;
   const msg=String(err?.message||err);
   const timeoutLike=/timeout|aborted|network|fetch/i.test(msg);
   if(!timeoutLike && !/Gemini HTTP (429|500|502|503|504)/.test(msg)) throw err;
  }
 }
 throw lastError||new Error('Gemini call failed');
}

function validateAuditBatch(parsed,batch){
 const errors=[];
 const ids=batch.map(x=>x.census_id);
 if(parsed?.track!=='W') errors.push('track mismatch');
 if(!Array.isArray(parsed?.items)) return ['items not array'];
 if(JSON.stringify(parsed.items.map(x=>x?.census_id))!==JSON.stringify(ids)) errors.push('audit census ids/order mismatch');
 for(const item of parsed.items){
  const src=bySource.get(item.census_id);
  const ext=byExtraction.get(item.census_id);
  if(!src||!ext) continue;
  if(!['PASS','CORRECTION_REQUIRED'].includes(item.status)) errors.push(item.census_id+': invalid status');
  if(!Array.isArray(item.omissions)) errors.push(item.census_id+': omissions not array');
  for(const o of item.omissions||[]){
   if(typeof o?.source_span!=='string'||!src.body.includes(o.source_span)) errors.push(item.census_id+': omission span not exact');
   if(typeof o?.reason!=='string'||!o.reason.trim()) errors.push(item.census_id+': omission reason');
  }
  if(!Array.isArray(item.spurious_occurrence_ids)) errors.push(item.census_id+': spurious ids not array');
  const validOccurrenceIds=new Set((ext.occurrences||[]).map(o=>o.occurrence_id));
  for(const oid of item.spurious_occurrence_ids||[]){
   if(!validOccurrenceIds.has(oid)) errors.push(item.census_id+': unknown spurious occurrence '+oid);
  }
  if(!Array.isArray(item.boundary_notes)) errors.push(item.census_id+': boundary_notes not array');
  const nonQuote=JSON.stringify({
   status:item.status,
   omissionReasons:(item.omissions||[]).map(o=>o.reason),
   spurious:item.spurious_occurrence_ids,
   notes:item.boundary_notes
  });
  if(forbiddenOutput.test(nonQuote)) errors.push(item.census_id+': forbidden candidate/category label');
  const correctionCount=(item.omissions?.length||0)+(item.spurious_occurrence_ids?.length||0)+(item.boundary_notes?.length||0);
  if(item.status==='PASS'&&correctionCount!==0) errors.push(item.census_id+': PASS row carries correction content');
  if(item.status==='CORRECTION_REQUIRED'&&correctionCount===0) errors.push(item.census_id+': correction row lacks correction content');
 }
 if(!['PASS','CORRECTIONS_REQUIRED'].includes(parsed.overall)) errors.push('invalid overall');
 const anyCorrection=parsed.items.some(x=>x.status==='CORRECTION_REQUIRED');
 if(parsed.overall!==(anyCorrection?'CORRECTIONS_REQUIRED':'PASS')) errors.push('overall inconsistent with rows');
 return errors;
}

const merged=[];
const batchMeta=[];
const batchValidationErrors=[];
for(let start=0,bn=1; start<selectedItems.length; start+=BATCH_SIZE,bn++){
 const batch=selectedItems.slice(start,start+BATCH_SIZE);
 const batchIds=batch.map(x=>x.census_id);
 const batchExtraction={track:'W',items:batchIds.map(id=>byExtraction.get(id))};
 const packet=[
  'ISOGRAPH EXPERIMENT 062 — BATCHED W SOURCE-CONSERVATION AUDIT SUCCESSOR',
  'Frozen SHA: '+SHA,
  'This is an independent semantic-occurrence audit. It is not primitive discovery, qualification, W closure, or cross-track synthesis.',
  'Audit EVERY census item in this batch and return exactly one row for EVERY ID in the given order, including PASS rows.',
  'For each frozen body, compare the supplied extraction only against that body. Identify omitted load-bearing non-Core operation/relation occurrences, spurious extracted occurrences, or a semantic boundary that loses an explicitly stated argument/side condition.',
  'Ordinary logical composition and source-status/motivational modality are not G1 occurrences by themselves.',
  'Do not import textbook definitions, infer conventional mathematical categories, propose primitives, or infer W/L correspondences.',
  'Every omission source_span must be an exact contiguous substring copied character-for-character from that frozen body.',
  'Return JSON only in this exact shape: {"track":"W","items":[{"census_id":"...","status":"PASS|CORRECTION_REQUIRED","omissions":[{"source_span":"...","reason":"..."}],"spurious_occurrence_ids":[],"boundary_notes":[]}],"overall":"PASS|CORRECTIONS_REQUIRED"}.',
  'A PASS row MUST have empty omissions, spurious_occurrence_ids, and boundary_notes.',
  'A CORRECTION_REQUIRED row must state at least one concrete omission, spurious occurrence ID, or boundary note.',
  'Do not emit PD-*, B-*, DNWF, DNIA, candidate primitive names, or cross-author identities.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== FROZEN W BATCH =====\n'+JSON.stringify({track:'W',items:batch},null,2),
  '\n===== FROZEN W EXTRACTION BATCH =====\n'+JSON.stringify(batchExtraction,null,2)
 ].join('\n');
 const {raw,data,transport_attempt}=await call(packet);
 const parsed=JSON.parse(stripFence(raw));
 const errors=validateAuditBatch(parsed,batch);
 const tag=String(bn).padStart(2,'0');
 fs.writeFileSync(out+'/BATCH_'+tag+'_RAW.txt',raw+'\n');
 fs.writeFileSync(out+'/BATCH_'+tag+'.json',JSON.stringify(parsed,null,2)+'\n');
 fs.writeFileSync(out+'/BATCH_'+tag+'_VALIDATION.json',JSON.stringify({
  pass:errors.length===0,
  errors,
  batch:bn,
  census_ids:batchIds,
  packet_sha256:h(packet),
  report_sha256:h(raw),
  model:MODEL,
  source_sha:SHA,
  finish_reason:data.candidates?.[0]?.finishReason??null
 },null,2)+'\n');
 if(errors.length) batchValidationErrors.push({batch:bn,errors});
 merged.push(...parsed.items);
 batchMeta.push({batch:bn,census_ids:batchIds,validation_pass:errors.length===0,errors,packet_sha256:h(packet),report_sha256:h(raw),finish_reason:data.candidates?.[0]?.finishReason??null,transport_attempt});
}

const mergedIds=merged.map(x=>x.census_id);
const finalErrors=[];
if(JSON.stringify(mergedIds)!==JSON.stringify(expected)) finalErrors.push('merged census ids/order mismatch');
for(const b of batchValidationErrors) for(const e of b.errors) finalErrors.push('batch '+b.batch+': '+e);
const corrections=merged.filter(x=>x.status==='CORRECTION_REQUIRED');
const final={track:'W',items:merged,overall:corrections.length?'CORRECTIONS_REQUIRED':'PASS'};
fs.writeFileSync(out+'/AUDIT.json',JSON.stringify(final,null,2)+'\n');
fs.writeFileSync(out+'/AUDIT_VALIDATION.json',JSON.stringify({
 pass:finalErrors.length===0,
 errors:finalErrors,
 track:'W',
 item_count:merged.length,
 correction_count:corrections.length,
 batch_size:BATCH_SIZE,
 batch_count:batchMeta.length,
 batches:batchMeta,
 extraction_path:extractionPath,
 extraction_sha256:h(frozen(extractionPath)),
 corpus_sha256:h(frozen(corpusPath)),
 method_sha256:h(method),
 model:MODEL,
 source_sha:SHA,
 note:'Batch-local validation defects are retained diagnostically and do not prevent later batches from running.'
},null,2)+'\n');
if(finalErrors.length) process.exit(1);
