import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
const FALLBACK=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODELS=[...new Set([MODEL,...FALLBACK])];
if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
 'CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md',
 'qualification/CORE_0_21_QUALIFICATION.md',
 'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
 'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',
 'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_10_EXPERIMENTAL_WARRANT_CANDIDATE.md',
 'extensions/experimental/EXPERIMENTAL_INQUIRY_0_1_CANDIDATE.md',
 'qualification/CURRENT_INTEGRATED_STACK_WITH_DP_0_10_EI_0_1_2026-09-29.md',
 'experiments/060/BASELINE_AUTHORITY.md',
 'experiments/060/BOUNDARY_CASE.md',
 'experiments/060/PUBLIC_OUTPUT_SCHEMA.json'
];
const promptPath='experiments/060/COLD_PROMPT.md';
const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:64*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');
for(const p of [...inputs,promptPath]) frozen(p);

const manifest=[],chunks=['ISOGRAPH EXPERIMENT 060 — CORE 0.21 INTEGRATION OWNERSHIP REPLACEMENT\nFrozen SHA: '+SHA+'\nISOLATION: use only supplied files. Experiment 059 outputs, hidden assertions, scorer source, issue text, prior reviews, repository status, and browsing are unavailable.\n'];
for(const p of inputs){
 const v=frozen(p);
 manifest.push({path:p,sha256:h(v),bytes:Buffer.byteLength(v)});
 chunks.push('\n===== BEGIN PERMITTED FILE: '+p+' =====\n'+v+'\n===== END PERMITTED FILE: '+p+' =====\n');
}
const prompt=frozen(promptPath);
manifest.push({path:promptPath,sha256:h(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');
const packet=chunks.join('');
const out='out/exp060';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/PACKET.txt',packet);
fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');
const base={experiment:'060',source_sha:SHA,packet_sha256:h(packet),core_0_21_sha256:h(frozen('CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md')),case_count:1,input_manifest:manifest};
if(DRY){fs.writeFileSync(out+'/DRY_RUN.json',JSON.stringify({...base,dry_run:true},null,2)+'\n');process.exit(0);}

async function call(){
 const failures=[];
 for(const model of MODELS){
  const generationConfig={candidateCount:1,maxOutputTokens:8192,temperature:0.1,responseMimeType:'application/json'};
  if(!model.includes('flash-lite')) generationConfig.thinkingConfig={thinkingLevel:'MEDIUM'};
  let response,text;
  try{
   response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{
    method:'POST',
    headers:{'Content-Type':'application/json','x-goog-api-key':KEY},
    body:JSON.stringify({contents:[{role:'user',parts:[{text:packet}]}],generationConfig}),
    signal:AbortSignal.timeout(90000)
   });
   text=await response.text();
  }catch(error){failures.push({model,error:String(error)});continue;}
  if(response.ok){
   const data=JSON.parse(text);
   const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
   return {model,response,data,raw,text};
  }
  failures.push({model,status:response.status,body_prefix:text.slice(0,300)});
 }
 throw new Error('all models unavailable '+JSON.stringify(failures));
}
const c=await call();
fs.writeFileSync(out+'/API_RESPONSE.json',c.text);
fs.writeFileSync(out+'/COLD_REPORT_RAW.txt',c.raw+'\n');
let t=c.raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,'');
const first=t.indexOf('{'),last=t.lastIndexOf('}');
if(first>=0&&last>=first) t=t.slice(first,last+1);
const parsed=JSON.parse(t);
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...base,selected_model:c.model,http_status:c.response.status,report_sha256:h(c.raw)},null,2)+'\n');
