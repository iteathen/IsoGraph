import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP017';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.5-flash';
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY)throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'experiments/017/CORE_0_18_CASES.md'
];
const promptPath='experiments/017/COLD_PROMPT.md';
const forbidden=[
  'hidden/','ASSERTIONS','score-exp017','AUTHORING_AUDIT','QUALIFICATION_REVIEW',
  'experiments/017/evidence','AGENTS.md','README.md','STATUS.md'
];

function frozen(p){return execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});}
function sha256(v){return crypto.createHash('sha256').update(v).digest('hex');}

fs.mkdirSync('out/exp017',{recursive:true});
for(const p of [...inputs,promptPath]){
  if(forbidden.some(x=>p.includes(x)))throw new Error('Forbidden cold input: '+p);
  frozen(p);
}
const cases=frozen('experiments/017/CORE_0_18_CASES.md');
for(let i=1;i<=12;i++){
  const id='C'+String(i).padStart(2,'0');
  if(!cases.includes('## '+id+' '))throw new Error('Missing '+id);
}

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 017 — CORE 0.18 QUALIFICATION
Run: ${RUN}
Frozen SHA: ${SHA}
Model: ${MODEL}

ISOLATION: use only delimited files. Prior outputs, hidden assertions/scorer, author audits, repository map, agent guidance, and browsing are unavailable.
`];

for(const p of inputs){
  const t=frozen(p);
  manifest.push({path:p,sha256:sha256(t),bytes:Buffer.byteLength(t)});
  chunks.push('\n===== BEGIN PERMITTED FILE: '+p+' =====\n'+t+'\n===== END PERMITTED FILE: '+p+' =====\n');
}
const prompt=frozen(promptPath);
manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');

const packet=chunks.join('');
const packetHash=sha256(packet);
fs.writeFileSync('out/exp017/'+RUN+'_PACKET.txt',packet);
fs.writeFileSync('out/exp017/'+RUN+'_INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

if(DRY){
  const d={run:RUN,dry_run:true,qualification_sha:SHA,model:MODEL,packet_sha256:packetHash,input_manifest:manifest};
  fs.writeFileSync('out/exp017/DRY_RUN.json',JSON.stringify(d,null,2)+'\n');
  console.log(JSON.stringify(d));
  process.exit(0);
}

const request={
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{candidateCount:1,maxOutputTokens:24576,temperature:0.1,thinkingConfig:{thinkingLevel:'HIGH'}}
};
const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
let status=0,responseText='',attempts=0;
for(let i=0;i<2;i++){
  attempts=i+1;
  const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});
  status=res.status;responseText=await res.text();
  if(res.ok)break;
  if(status===429)break;
  if(i===0&&[500,502,503,504].includes(status)){await new Promise(r=>setTimeout(r,20000));continue;}
  break;
}
fs.writeFileSync('out/exp017/'+RUN+'_API_RESPONSE.json',responseText);
const meta={
  experiment:'017',run:RUN,model:MODEL,qualification_sha:SHA,
  workflow_run_id:process.env.GITHUB_RUN_ID||null,
  workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,
  input_manifest:manifest,packet_sha256:packetHash,api_attempts:attempts,http_status:status
};
if(!(status>=200&&status<300)){
  fs.writeFileSync('out/exp017/METADATA.json',JSON.stringify({...meta,semantic_status:'PROVIDER_FAILURE'},null,2)+'\n');
  throw new Error('Gemini HTTP '+status);
}
const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
fs.writeFileSync('out/exp017/COLD_REPORT_RAW.txt',raw+'\n');
let jt=raw.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
const a=jt.indexOf('{'),b=jt.lastIndexOf('}');
if(a>=0&&b>=a)jt=jt.slice(a,b+1);
let parsed;
try{parsed=JSON.parse(jt);}
catch(e){
  fs.writeFileSync('out/exp017/METADATA.json',JSON.stringify({...meta,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(raw)},null,2)+'\n');
  throw e;
}
fs.writeFileSync('out/exp017/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync('out/exp017/METADATA.json',JSON.stringify({...meta,semantic_status:'FROZEN',report_sha256:sha256(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({run:RUN,status,attempts,packet_sha256:packetHash,report_sha256:sha256(raw)}));
