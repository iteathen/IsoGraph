import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
const BATCH_SIZE=Number(process.env.EXP062_L_ADJUDICATION_BATCH_SIZE||7);
if(!SHA||!KEY)throw new Error('environment missing');
if(!Number.isInteger(BATCH_SIZE)||BATCH_SIZE<1||BATCH_SIZE>12)throw new Error('invalid batch size');

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const methodPath='research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const extractionPath='experiments/062/L_EXTRACTION_RECONCILED_0_1.json';
const auditPath='experiments/062/evidence/run-37502616897-attempt-2/exp062-l-batched-audit/AUDIT.json';
const auditValidationPath='experiments/062/evidence/run-37502616897-attempt-2/exp062-l-batched-audit/AUDIT_VALIDATION.json';
const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');
const corpus=JSON.parse(frozen(corpusPath));
const method=frozen(methodPath);
const extraction=JSON.parse(frozen(extractionPath));
const audit=JSON.parse(frozen(auditPath));
const auditValidation=JSON.parse(frozen(auditValidationPath));
if(auditValidation.pass!==true||auditValidation.item_count!==151)throw new Error('L audit not fully validated');

const L=corpus.items.filter(x=>x.track==='L');
const bodyById=new Map(L.map(x=>[x.census_id,x.body]));
const extById=new Map(extraction.items.map(x=>[x.census_id,x]));
const correctionRows=audit.items.filter(x=>x.status==='CORRECTION_REQUIRED');
if(correctionRows.length!==89)throw new Error('unexpected L correction count');
const expectedIds=correctionRows.map(x=>x.census_id);
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA|W-SSC-\d+)\b/i;
const allowedDecision=new Set(['ACCEPT_SOURCE_LOCAL_CORRECTION','ACCEPT_WITH_SOURCE_LOCAL_NARROWING','REJECT_CORE_ONLY_OR_SOURCE_MODALITY','REJECT_DUPLICATE_OR_SPURIOUS']);
const allowedForce=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDef=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);

const out='out/exp062-l-adjudication';
fs.mkdirSync(out,{recursive:true});

function stripFence(raw){return raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,'');}
async function call(packet){
 const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:32768,temperature:0.1,responseMimeType:'application/json'}};
 const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
 const delays=[0,2000,5000,10000,15000]; let last=null;
 for(let i=0;i<delays.length;i++){
  if(delays[i])await new Promise(r=>setTimeout(r,delays[i]));
  try{
   const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request),signal:AbortSignal.timeout(180000)});
   const txt=await response.text();
   if(response.ok){const data=JSON.parse(txt),raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();return{raw,data,transport_attempt:i+1};}
   last=new Error('Gemini HTTP '+response.status+' '+txt.slice(0,500));
   if(![429,500,502,503,504].includes(response.status))throw last;
  }catch(err){last=err;const m=String(err?.message||err);if(!/timeout|aborted|network|fetch|Gemini HTTP (429|500|502|503|504)/i.test(m))throw err;}
 }
 throw last||new Error('Gemini call failed');
}

function validateBatch(parsed,batch){
 const errors=[],ids=batch.map(x=>x.census_id);
 if(parsed?.track!=='L')errors.push('track mismatch');
 if(!Array.isArray(parsed?.items)||JSON.stringify(parsed.items.map(x=>x?.census_id))!==JSON.stringify(ids))errors.push('ids/order mismatch');
 const auditById=new Map(batch.map(x=>[x.census_id,x]));
 for(const item of parsed.items||[]){
  const srcBody=bodyById.get(item.census_id),auditRow=auditById.get(item.census_id),ext=extById.get(item.census_id);
  if(!srcBody||!auditRow||!ext)continue;
  if(!Array.isArray(item.lead_resolutions)||item.lead_resolutions.length!==auditRow.omissions.length)errors.push(item.census_id+': lead count');
  const auditSpans=auditRow.omissions.map(x=>x.source_span);
  if(JSON.stringify((item.lead_resolutions||[]).map(x=>x.audit_source_span))!==JSON.stringify(auditSpans))errors.push(item.census_id+': lead span/order');
  const existingIds=new Set((ext.occurrences||[]).map(x=>x.occurrence_id));
  const candidateIds=new Set();
  for(const lr of item.lead_resolutions||[]){
   if(!allowedDecision.has(lr.decision))errors.push(item.census_id+': decision');
   if(typeof lr.reason!=='string'||!lr.reason.trim())errors.push(item.census_id+': reason');
   if(forbidden.test(lr.reason))errors.push(item.census_id+': forbidden reason');
   if(!Array.isArray(lr.proposed_occurrences))errors.push(item.census_id+': proposed not array');
   const accept=lr.decision.startsWith('ACCEPT_');
   if(accept&&!(lr.proposed_occurrences||[]).length)errors.push(item.census_id+': accepted lead has no occurrence');
   if(!accept&&(lr.proposed_occurrences||[]).length)errors.push(item.census_id+': rejected lead has occurrence');
   for(const o of lr.proposed_occurrences||[]){
    if(typeof o.candidate_id!=='string'||!/^[A-Z]?[A-Z0-9_-]*C\d{2}$/.test(o.candidate_id)||candidateIds.has(o.candidate_id))errors.push(item.census_id+': bad candidate id '+o.candidate_id);
    candidateIds.add(o.candidate_id);
    if(typeof o.source_span!=='string'||!srcBody.includes(o.source_span))errors.push(item.census_id+': source span '+o.candidate_id);
    if(typeof o.relation_span!=='string'||!srcBody.includes(o.relation_span)||!o.source_span.includes(o.relation_span))errors.push(item.census_id+': relation span '+o.candidate_id);
    if(!Array.isArray(o.argument_spans)||o.argument_spans.some(a=>typeof a!=='string'||!srcBody.includes(a)))errors.push(item.census_id+': arg span '+o.candidate_id);
    if(!allowedForce.has(o.logical_force))errors.push(item.census_id+': force '+o.candidate_id);
    if(!allowedDef.has(o.definition_status))errors.push(item.census_id+': def '+o.candidate_id);
    if(!Array.isArray(o.depends_on))errors.push(item.census_id+': deps '+o.candidate_id);
    const meta=JSON.stringify({force:o.logical_force,def:o.definition_status,note:o.load_bearing_note,deps:o.depends_on});
    if(forbidden.test(meta))errors.push(item.census_id+': forbidden meta '+o.candidate_id);
   }
  }
  for(const lr of item.lead_resolutions||[])for(const o of lr.proposed_occurrences||[])for(const dep of o.depends_on||[])if(!existingIds.has(dep)&&!candidateIds.has(dep))errors.push(item.census_id+': unresolved dependency '+dep);
 }
 return errors;
}

const merged=[],meta=[],batches=[];
for(let i=0;i<correctionRows.length;i+=BATCH_SIZE)batches.push(correctionRows.slice(i,i+BATCH_SIZE));
for(let bi=0;bi<batches.length;bi++){
 const batch=batches[bi],ids=batch.map(x=>x.census_id);
 const payload=batch.map(row=>({census_id:row.census_id,body:bodyById.get(row.census_id),predecessor_extraction:extById.get(row.census_id),audit_row:row}));
 const packet=[
  'ISOGRAPH EXPERIMENT 062 — L SOURCE-LOCAL AUDIT-LEAD ADJUDICATION',
  'Frozen SHA: '+SHA,
  'This is source-local G1 reconciliation research only. Do not propose primitives, mathematical categories, cross-track correspondences, or source-track closures.',
  'For EVERY audit omission lead, decide whether it identifies a genuine load-bearing NON-CORE semantic operation/relation/side-condition occurrence missing from the predecessor extraction.',
  'Ordinary logical composition, bare source-status/motivational modality, or a statement already fully represented by qualified Core logic is NOT a new G1 non-Core occurrence.',
  'If genuine, ACCEPT and propose the smallest exact source-local occurrence record(s) needed. If the audit wording is too broad, ACCEPT_WITH_SOURCE_LOCAL_NARROWING and use a narrower exact source span.',
  'If Core-only/source-modality, or duplicate/spurious relative to predecessor occurrences, REJECT with a source-local reason.',
  'Every proposed source_span/relation_span/argument_span must be an exact contiguous substring of that frozen body. relation_span must lie inside source_span.',
  'Do not import textbook definitions. definition_status describes only whether this frozen body itself defines the occurrence behavior.',
  'candidate_id is temporary, unique within the census item, and must end in C01, C02, etc. depends_on may reference predecessor occurrence IDs or temporary candidate_ids from the same item.',
  'Return JSON only: {"track":"L","items":[{"census_id":"...","lead_resolutions":[{"audit_source_span":"exact audit span","decision":"ACCEPT_SOURCE_LOCAL_CORRECTION|ACCEPT_WITH_SOURCE_LOCAL_NARROWING|REJECT_CORE_ONLY_OR_SOURCE_MODALITY|REJECT_DUPLICATE_OR_SPURIOUS","reason":"...","proposed_occurrences":[{"candidate_id":"C01","source_span":"...","relation_span":"...","argument_spans":["..."],"logical_force":"ASSERTED|NEGATED|CONDITIONAL|EQUALITY_OR_IDENTIFICATION|EXISTENCE|COMPARISON|OTHER","definition_status":"EXPLICIT_IN_BODY|PARTIAL_IN_BODY|NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED","depends_on":[],"load_bearing_note":"..."}]}]}]}.',
  'Do not emit PD-*, B-*, DNWF, DNIA, W-SSC IDs, or conventional category labels in reasons/notes.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== L ADJUDICATION BATCH =====\n'+JSON.stringify(payload,null,2)
 ].join('\n');
 const {raw,data,transport_attempt}=await call(packet),parsed=JSON.parse(stripFence(raw)),errors=validateBatch(parsed,batch),tag=String(bi+1).padStart(2,'0');
 fs.writeFileSync(out+'/BATCH_'+tag+'_RAW.txt',raw+'\n');
 fs.writeFileSync(out+'/BATCH_'+tag+'.json',JSON.stringify(parsed,null,2)+'\n');
 fs.writeFileSync(out+'/BATCH_'+tag+'_VALIDATION.json',JSON.stringify({pass:errors.length===0,errors,batch:bi+1,census_ids:ids,packet_sha256:h(packet),report_sha256:h(raw),model:MODEL,source_sha:SHA,finish_reason:data.candidates?.[0]?.finishReason??null,transport_attempt},null,2)+'\n');
 if(errors.length)throw new Error('batch '+(bi+1)+' validation failed: '+errors.join('; '));
 merged.push(...parsed.items);meta.push({batch:bi+1,census_ids:ids,packet_sha256:h(packet),report_sha256:h(raw),transport_attempt});
}
if(JSON.stringify(merged.map(x=>x.census_id))!==JSON.stringify(expectedIds))throw new Error('merged correction ids/order mismatch');
const result={artifact:'L_SOURCE_COMPLETENESS_AUDIT_ADJUDICATION_CANDIDATES_0_1',track:'L',status:'BATCHED_SOURCE_LOCAL_ADJUDICATION_CANDIDATES_COMPLETE',authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',inputs:{corpus:corpusPath,method:methodPath,predecessor_extraction:extractionPath,audit:auditPath,audit_validation:auditValidationPath},items:merged,batches:meta};
fs.writeFileSync(out+'/ADJUDICATION_CANDIDATES.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(out+'/ADJUDICATION_VALIDATION.json',JSON.stringify({pass:true,correction_rows:merged.length,lead_count:merged.reduce((n,x)=>n+x.lead_resolutions.length,0),model:MODEL,source_sha:SHA,authority:false},null,2)+'\n');
console.log(JSON.stringify({pass:true,correction_rows:merged.length,lead_count:merged.reduce((n,x)=>n+x.lead_resolutions.length,0)},null,2));
