import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP027';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;

if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'experiments/027/QUALIFIED_STACK_PACKET.md',
  'experiments/027/INTEGRATED_WITH_DTS_CASES.md'
];
const promptPath='experiments/027/COLD_PROMPT.md';

const forbidden=[
  'hidden/',
  'ASSERTIONS',
  'score-exp027',
  'test-score-exp027',
  'AUTHORING_AUDIT',
  'QUALIFICATION_REVIEW',
  'RESULTS',
  'experiments/027/evidence',
  'experiments/019',
  'experiments/026',
  'AGENTS.md',
  'README.md',
  'STATUS.md'
];

function frozen(path){
  return execFileSync('git',['show',SHA+':'+path],{
    encoding:'utf8',
    maxBuffer:128*1024*1024
  });
}

function sha256(value){
  return crypto.createHash('sha256').update(value).digest('hex');
}

fs.mkdirSync('out/exp027',{recursive:true});

for(const path of [...inputs,promptPath]){
  if(forbidden.some(item=>path.includes(item))) throw new Error('forbidden cold input '+path);
  frozen(path);
}

const casesText=frozen('experiments/027/INTEGRATED_WITH_DTS_CASES.md');
for(let i=1;i<=18;i++){
  const id='D'+String(i).padStart(2,'0');
  if(!casesText.includes('## '+id+' ')) throw new Error('missing public case '+id);
}

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 027 — CURRENT INTEGRATED STACK WITH DTS
Run: ${RUN}
Frozen SHA: ${SHA}
Model: ${MODEL}

ISOLATION: use only the delimited files. The modules are already qualified individually. This fresh holdout tests composition after DTS promotion. Hidden assertions/scorer, prior Experiment 019/026 outputs, author audits, repository routing docs, and browsing are unavailable.
`];

for(const path of inputs){
  const value=frozen(path);
  manifest.push({path,sha256:sha256(value),bytes:Buffer.byteLength(value)});
  chunks.push('\n===== BEGIN PERMITTED FILE: '+path+' =====\n'+value+'\n===== END PERMITTED FILE: '+path+' =====\n');
}

const prompt=frozen(promptPath);
manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');

const packet=chunks.join('');
const packetHash=sha256(packet);

fs.writeFileSync('out/exp027/PACKET.txt',packet);
fs.writeFileSync('out/exp027/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

if(DRY){
  const dry={
    run:RUN,
    dry_run:true,
    source_sha:SHA,
    model:MODEL,
    packet_sha256:packetHash,
    input_manifest:manifest
  };
  fs.writeFileSync('out/exp027/DRY_RUN.json',JSON.stringify(dry,null,2)+'\n');
  console.log(JSON.stringify(dry));
  process.exit(0);
}

const request={
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{
    candidateCount:1,
    maxOutputTokens:8192,
    temperature:0.1
  }
};

const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';

let status=0;
let responseText='';
let attempts=0;

for(let i=0;i<2;i++){
  attempts=i+1;
  const response=await fetch(url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-goog-api-key':KEY
    },
    body:JSON.stringify(request)
  });

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
  experiment:'027',
  run:RUN,
  model:MODEL,
  source_sha:SHA,
  workflow_run_id:process.env.GITHUB_RUN_ID||null,
  workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,
  input_manifest:manifest,
  packet_sha256:packetHash,
  api_attempts:attempts,
  http_status:status
};

if(!(status>=200&&status<300)){
  fs.writeFileSync(
    'out/exp027/METADATA.json',
    JSON.stringify({...metadata,semantic_status:'PROVIDER_FAILURE'},null,2)+'\n'
  );
  throw new Error('Gemini HTTP '+status);
}

const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[])
  .filter(part=>!part.thought)
  .map(part=>part.text||'')
  .join('')
  .trim();

fs.writeFileSync('out/exp027/COLD_REPORT_RAW.txt',raw+'\n');

let jsonText=raw
  .replace(/^\`\`\`(?:json)?\s*/i,'')
  .replace(/\s*\`\`\`$/,'');

const first=jsonText.indexOf('{');
const last=jsonText.lastIndexOf('}');
if(first>=0&&last>=first) jsonText=jsonText.slice(first,last+1);

let parsed;
try{
  parsed=JSON.parse(jsonText);
}catch(error){
  fs.writeFileSync(
    'out/exp027/METADATA.json',
    JSON.stringify({
      ...metadata,
      semantic_status:'MALFORMED_OUTPUT',
      report_sha256:sha256(raw)
    },null,2)+'\n'
  );
  throw error;
}

fs.writeFileSync('out/exp027/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(
  'out/exp027/METADATA.json',
  JSON.stringify({
    ...metadata,
    semantic_status:'FROZEN',
    report_sha256:sha256(raw),
    finish_reason:data.candidates?.[0]?.finishReason??null,
    usage:data.usageMetadata??null
  },null,2)+'\n'
);

console.log(JSON.stringify({
  run:RUN,
  status,
  attempts,
  packet_sha256:packetHash,
  report_sha256:sha256(raw)
}));
