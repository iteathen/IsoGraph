import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3-flash-preview';
const FALLBACK=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODELS=[...new Set([MODEL,...FALLBACK])];
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY)throw new Error('GEMINI_API_KEY unavailable');
const inputs=[
 'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
 'CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md',
 'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
 'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md',
 'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_9_MINIMUM_SUFFICIENT_SUPPORT_VALUATION_CANDIDATE.md',
 'experiments/053/BASELINE_AUTHORITY.md',
 'experiments/053/DP_0_9_CASES.md',
 'experiments/053/PUBLIC_OUTPUT_SCHEMA.json'
];
const promptPath='experiments/053/COLD_PROMPT.md';
function frozen(p){return execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});}
function sha256(v){return crypto.createHash('sha256').update(v).digest('hex');}
for(const p of [...inputs,promptPath])frozen(p);
const cases=frozen('experiments/053/DP_0_9_CASES.md');
for(let i=1;i<=20;i++){const id='M'+String(i).padStart(2,'0');if(!cases.includes('## '+id+' '))throw new Error('missing '+id);}
const manifest=[],chunks=[`ISOGRAPH EXPERIMENT 053 — DP 0.9 QUALIFICATION
Frozen SHA: ${SHA}
ISOLATION: use only the delimited files. Hidden assertions, scorers, issue text, repository summaries, prior outputs, and browsing are unavailable.
`];
for(const p of inputs){const v=frozen(p);manifest.push({path:p,sha256:sha256(v),bytes:Buffer.byteLength(v)});chunks.push('\n===== BEGIN PERMITTED FILE: '+p+' =====\n'+v+'\n===== END PERMITTED FILE: '+p+' =====\n');}
const prompt=frozen(promptPath);manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');
const packet=chunks.join(''),out='out/exp053',candidate=frozen('extensions/discovery/DISCOVERY_PROTOCOLS_0_9_MINIMUM_SUFFICIENT_SUPPORT_VALUATION_CANDIDATE.md');
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(out+'/PACKET.txt',packet);fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');
const base={experiment:'053',source_sha:SHA,packet_sha256:sha256(packet),dp_0_9_sha256:sha256(candidate),case_count:20,input_manifest:manifest};
if(DRY){fs.writeFileSync(out+'/DRY_RUN.json',JSON.stringify({...base,dry_run:true},null,2)+'\n');process.exit(0);}
let last=[];
async function call(){
 for(const model of MODELS){
  for(let attempt=0;attempt<4;attempt++){
   const generationConfig={candidateCount:1,maxOutputTokens:32768,temperature:0.1,responseMimeType:'application/json'};
   if(!model.includes('flash-lite'))generationConfig.thinkingConfig={thinkingLevel:'MEDIUM'};
   let res,txt;
   try{res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:packet}]}],generationConfig})});txt=await res.text();}catch(e){last.push(String(e));continue;}
   if(res.ok){const data=JSON.parse(txt);const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();return {model,res,data,raw,txt};}
   last.push(model+':'+res.status+':'+txt.slice(0,300)); if(res.status===429||res.status>=500)await new Promise(r=>setTimeout(r,12000*(attempt+1))); else break;
  }
 }
 throw new Error('all models failed '+last.slice(-6).join(' | '));
}
const c=await call();fs.writeFileSync(out+'/API_RESPONSE.json',c.txt);fs.writeFileSync(out+'/COLD_REPORT_RAW.txt',c.raw+'\n');
let t=c.raw.replace(/^\`\`\`(?:json)?\s*/i,'').replace(/\s*\`\`\`$/,'');const first=t.indexOf('{'),lastBrace=t.lastIndexOf('}');if(first>=0&&lastBrace>=first)t=t.slice(first,lastBrace+1);
const parsed=JSON.parse(t);fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...base,selected_model:c.model,http_status:c.res.status,report_sha256:sha256(c.raw)},null,2)+'\n');
