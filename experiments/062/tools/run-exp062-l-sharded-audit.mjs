import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA,KEY=process.env.GEMINI_API_KEY,MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite',SHARD_SIZE=Number(process.env.L_SHARD_SIZE||20);
if(!SHA||!KEY)throw new Error('environment missing');
const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');
const corpus=JSON.parse(frozen('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json'));
const all=corpus.items.filter(x=>x.track==='L');
const extraction=JSON.parse(frozen('experiments/062/L_EXTRACTION_RECONCILED_0_1.json'));
const method=frozen('research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md');
if(all.length!==151||extraction.items.length!==151)throw new Error('L cardinality');
const exMap=new Map(extraction.items.map(x=>[x.census_id,x]));
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA)\b/i;
const out='out/exp062/L_AUDIT';
fs.mkdirSync(out+'/shards',{recursive:true});

function validateAudit(x,selected){
 const errors=[],expected=selected.map(i=>i.census_id);
 if(x?.track!=='L')errors.push('track mismatch');
 if(!Array.isArray(x?.items)||JSON.stringify(x.items.map(i=>i?.census_id))!==JSON.stringify(expected))errors.push('audit census ids/order mismatch');
 const byId=new Map(selected.map(i=>[i.census_id,i]));
 for(const item of x.items||[]){
  const src=byId.get(item.census_id);if(!src)continue;
  if(!['PASS','CORRECTION_REQUIRED'].includes(item.status))errors.push(item.census_id+': status');
  if(!Array.isArray(item.omissions)||item.omissions.some(o=>typeof o.source_span!=='string'||!src.body.includes(o.source_span)))errors.push(item.census_id+': omission span');
  if(!Array.isArray(item.spurious_occurrence_ids)||!Array.isArray(item.boundary_notes))errors.push(item.census_id+': arrays');
  if(forbidden.test(JSON.stringify({status:item.status,omissions:item.omissions,spurious:item.spurious_occurrence_ids,notes:item.boundary_notes})))errors.push(item.census_id+': forbidden label');
 }
 if(!['PASS','CORRECTIONS_REQUIRED'].includes(x?.overall))errors.push('overall');
 return errors;
}
async function call(packet){
 const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:65536,temperature:0.1,responseMimeType:'application/json'}};
 const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';let last='';
 for(let attempt=1;attempt<=12;attempt++){
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request),signal:AbortSignal.timeout(180000)});
  const txt=await response.text();
  if(response.ok){const data=JSON.parse(txt),raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();return{raw,data,attempt};}
  last='HTTP '+response.status+' '+txt.slice(0,800);if(response.status<500&&response.status!==429)break;await new Promise(r=>setTimeout(r,Math.min(15000,1000*attempt)));
 }
 throw new Error('Gemini '+last);
}

const shards=[];for(let i=0;i<all.length;i+=SHARD_SIZE)shards.push(all.slice(i,Math.min(all.length,i+SHARD_SIZE)));
const merged=[],summary=[];
for(let si=0;si<shards.length;si++){
 const selected=shards[si],no=String(si+1).padStart(2,'0'),dir=out+'/shards/shard-'+no;fs.mkdirSync(dir,{recursive:true});
 const selectedCorpus={...corpus,items:selected,counts:{total:selected.length,L:selected.length},shard:{index:si+1,count:shards.length,start_census_id:selected[0].census_id,end_census_id:selected.at(-1).census_id}};
 const selectedExtraction={track:'L',items:selected.map(x=>exMap.get(x.census_id))};
 const packet=[
  'ISOGRAPH EXPERIMENT 062 — SOURCE-CONSERVATION AUDIT — L SHARD '+(si+1)+'/'+shards.length,
  'Frozen SHA: '+SHA,'Requested track: L',
  'Audit the frozen occurrence extraction only. Do not propose primitives, mathematical categories, or W/L correspondences.',
  'For each census item, determine whether the extraction omitted a load-bearing non-Core operation/relation, added a spurious one, or used a semantically incomplete boundary.',
  'Return JSON: {"track":"L","items":[{"census_id":"...","status":"PASS|CORRECTION_REQUIRED","omissions":[{"source_span":"exact contiguous source substring","reason":"..."}],"spurious_occurrence_ids":[],"boundary_notes":["..."]}],"overall":"PASS|CORRECTIONS_REQUIRED"}.',
  'Every omission source_span must be an exact contiguous substring of the frozen body. Do not emit PD-*, B-*, DNWF, DNIA, primitive proposals, or source-domain taxonomy labels.',
  '\n===== GRAPH-FIRST METHOD =====\n'+method,
  '\n===== FROZEN L SHARD CORPUS =====\n'+JSON.stringify(selectedCorpus,null,2),
  '\n===== FROZEN RECONCILED EXTRACTION =====\n'+JSON.stringify(selectedExtraction,null,2)
 ].join('\n');
 try{
  const x=await call(packet);fs.writeFileSync(dir+'/AUDIT_RAW.txt',x.raw+'\n');
  const parsed=JSON.parse(x.raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,''));
  const errors=validateAudit(parsed,selected);
  fs.writeFileSync(dir+'/AUDIT.json',JSON.stringify(parsed,null,2)+'\n');
  fs.writeFileSync(dir+'/AUDIT_VALIDATION.json',JSON.stringify({pass:errors.length===0,errors,track:'L',item_count:parsed.items?.length||0,packet_sha256:h(packet),report_sha256:h(x.raw),model:MODEL,source_sha:SHA,finish_reason:x.data.candidates?.[0]?.finishReason??null,api_attempt:x.attempt,shard:si+1,shard_count:shards.length},null,2)+'\n');
  merged.push(...(parsed.items||[]));
  summary.push({shard:si+1,start:selected[0].census_id,end:selected.at(-1).census_id,expected_count:selected.length,captured_count:parsed.items?.length||0,validation:errors.length?'DEFECTS_RECORDED':'PASS',errors,api_attempt:x.attempt,overall:parsed.overall,corrections_required:(parsed.items||[]).filter(i=>i.status==='CORRECTION_REQUIRED').length});
 }catch(err){
  const message=String(err?.stack||err);fs.writeFileSync(dir+'/CAPTURE_ERROR.txt',message+'\n');summary.push({shard:si+1,start:selected[0].census_id,end:selected.at(-1).census_id,expected_count:selected.length,captured_count:0,validation:'TRANSPORT_OR_PARSE_FAILURE',errors:[message]});
 }
 fs.writeFileSync(out+'/AUDIT_PROGRESS_0_1.json',JSON.stringify({schema:'isograph.exp062-l-audit-progress.v0.1',source_sha:SHA,completed_shards:summary.length,total_shards:shards.length,captured_items:merged.length,total_items:all.length,shards:summary,authority:false},null,2)+'\n');
}
const audit={track:'L',items:merged,overall:merged.length===151&&merged.some(x=>x.status==='CORRECTION_REQUIRED')?'CORRECTIONS_REQUIRED':merged.length===151?'PASS':'INCOMPLETE'};
const fullErrors=merged.length===151?validateAudit(audit,all):['captured '+merged.length+' of 151'];
fs.writeFileSync(out+'/AUDIT_CAPTURE_ALL_0_1.json',JSON.stringify(audit,null,2)+'\n');
fs.writeFileSync(out+'/AUDIT_CAPTURE_ALL_VALIDATION_0_1.json',JSON.stringify({pass:fullErrors.length===0,errors:fullErrors,track:'L',captured_item_count:merged.length,expected_item_count:151,corrections_required:merged.filter(x=>x.status==='CORRECTION_REQUIRED').map(x=>x.census_id),source_sha:SHA,shard_summary:summary,authority:false},null,2)+'\n');
console.log(JSON.stringify({capture_complete:true,captured_item_count:merged.length,validation_pass:fullErrors.length===0,corrections_required:merged.filter(x=>x.status==='CORRECTION_REQUIRED').map(x=>x.census_id)},null,2));
