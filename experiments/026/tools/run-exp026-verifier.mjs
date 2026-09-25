import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP026-VERIFIER';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;

if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'qualification/DTS_0_1_QUALIFICATION_PLAN.md',
  'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',
  'extensions/dts/DTS_NATIVE_VOCAB_0_1.md',
  'extensions/dts/DTS_VOCAB_0_1.isg',
  'experiments/026/QUALIFIED_DEPENDENCY_PACKET.md',
  'experiments/026/DTS_0_1_CASES.md',
  'experiments/026/COLD_PROMPT.md',
  'experiments/026/evidence/run-36190237108-attempt-1/PARSED_REPORT.json',
  'experiments/026/evidence/run-36190237108-attempt-1/SCORE.json',
  'experiments/026/evidence/run-36190237108-attempt-1/METADATA.json',
  'experiments/026/evidence/run-36190237108-attempt-1/CONTROL.json',
  'qualification/QUALIFIED_MODULES_2026-09-25.md',
  'qualification/CURRENT_INTEGRATED_STACK_2026-09-25.md'
];
const promptPath='experiments/026/VERIFIER_PROMPT.md';
const forbidden=[
  'hidden/','ASSERTIONS','score-exp026-verifier','AUTHORING_AUDIT',
  'experiments/026/verifier/evidence','experiments/020','experiments/021',
  'experiments/022','experiments/023','experiments/024','experiments/025'
];

function frozen(path){
  return execFileSync('git',['show',SHA+':'+path],{encoding:'utf8',maxBuffer:128*1024*1024});
}
function sha256(value){
  return crypto.createHash('sha256').update(value).digest('hex');
}

fs.mkdirSync('out/exp026-verifier',{recursive:true});
for(const path of [...inputs,promptPath]){
  if(forbidden.some(x=>path.includes(x))) throw new Error('forbidden verifier input '+path);
  frozen(path);
}

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 026 — INDEPENDENT DTS 0.1 PROMOTION VERIFIER
Run: ${RUN}
Frozen SHA: ${SHA}
Model: ${MODEL}

ISOLATION: hidden assertion keys and prior DTS development experiments are unavailable. Verify the promotion evidence from the public/frozen qualification record only.
`];

for(const path of inputs){
  const text=frozen(path);
  manifest.push({path,sha256:sha256(text),bytes:Buffer.byteLength(text)});
  chunks.push('\n===== BEGIN PERMITTED FILE: '+path+' =====\n'+text+'\n===== END PERMITTED FILE: '+path+' =====\n');
}
const prompt=frozen(promptPath);
manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push('\n===== BEGIN VERIFIER PROMPT =====\n'+prompt+'\n===== END VERIFIER PROMPT =====\n');

const packet=chunks.join('');
const packetHash=sha256(packet);
fs.writeFileSync('out/exp026-verifier/PACKET.txt',packet);
fs.writeFileSync('out/exp026-verifier/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

if(DRY){
  const dry={run:RUN,dry_run:true,source_sha:SHA,model:MODEL,packet_sha256:packetHash,input_manifest:manifest};
  fs.writeFileSync('out/exp026-verifier/DRY_RUN.json',JSON.stringify(dry,null,2)+'\n');
  console.log(JSON.stringify(dry));
  process.exit(0);
}

const request={
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{candidateCount:1,maxOutputTokens:8192,temperature:0.1}
};
const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';

let status=0,responseText='',attempts=0;
for(let i=0;i<2;i++){
  attempts=i+1;
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});
  status=response.status;
  responseText=await response.text();
  if(response.ok) break;
  if(status===429) break;
  if(i===0&&[500,502,503,504].includes(status)){
    await new Promise(resolve=>setTimeout(resolve,20000));
    continue;
  }
  break;
}

const metadata={
  experiment:'026-verifier',run:RUN,model:MODEL,source_sha:SHA,
  workflow_run_id:process.env.GITHUB_RUN_ID||null,
  workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,
  input_manifest:manifest,packet_sha256:packetHash,
  api_attempts:attempts,http_status:status
};

if(!(status>=200&&status<300)){
  fs.writeFileSync('out/exp026-verifier/METADATA.json',JSON.stringify({...metadata,semantic_status:'PROVIDER_FAILURE'},null,2)+'\n');
  throw new Error('Gemini HTTP '+status);
}

const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
fs.writeFileSync('out/exp026-verifier/VERIFIER_RAW.txt',raw+'\n');

let jt=raw.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
const first=jt.indexOf('{'),last=jt.lastIndexOf('}');
if(first>=0&&last>=first) jt=jt.slice(first,last+1);

let parsed;
try{parsed=JSON.parse(jt);}
catch(error){
  fs.writeFileSync('out/exp026-verifier/METADATA.json',JSON.stringify({...metadata,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(raw)},null,2)+'\n');
  throw error;
}

fs.writeFileSync('out/exp026-verifier/VERIFIER_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync('out/exp026-verifier/METADATA.json',JSON.stringify({...metadata,semantic_status:'FROZEN',report_sha256:sha256(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({run:RUN,status,attempts,packet_sha256:packetHash,report_sha256:sha256(raw)}));
