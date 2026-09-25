import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP023';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-2.5-pro';
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;

if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'experiments/023/FOCUSED_AUTHORITY.md',
  'experiments/023/SOURCE_BARRIERS.json',
  'experiments/023/BARRIERS.isg',
  'experiments/023/README.md'
];
const promptPath='experiments/023/COLD_PROMPT.md';
const forbidden=[
  'hidden/','CONTROLS','score-exp023','AUTHORING_AUDIT','RESULTS',
  'experiments/023/evidence','AGENTS.md','STATUS.md'
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

fs.mkdirSync('out/exp023',{recursive:true});

for(const path of [...inputs,promptPath]){
  if(forbidden.some(x=>path.includes(x))) throw new Error('forbidden cold input '+path);
  frozen(path);
}

const corpus=JSON.parse(frozen('experiments/023/SOURCE_BARRIERS.json'));
if(corpus.modules?.length!==6) throw new Error('expected six modules');
if(corpus.modules.reduce((n,m)=>n+(m.edges||0),0)!==74) throw new Error('expected 74 barrier edges');

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 023 — INTERPRETATION-BARRIER DISCOVERY
Run: ${RUN}
Frozen SHA: ${SHA}
Model: ${MODEL}

ISOLATION: use only the delimited packet. Hidden controls/scorer, prior Experiment 023 evidence, author audit, repository routing instructions, and browsing are unavailable.
`];

for(const path of inputs){
  const text=frozen(path);
  manifest.push({path,sha256:sha256(text),bytes:Buffer.byteLength(text)});
  chunks.push('\n===== BEGIN PERMITTED FILE: '+path+' =====\n'+text+'\n===== END PERMITTED FILE: '+path+' =====\n');
}
const prompt=frozen(promptPath);
manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');

const packet=chunks.join('');
const packetHash=sha256(packet);
fs.writeFileSync('out/exp023/'+RUN+'_PACKET.txt',packet);
fs.writeFileSync('out/exp023/'+RUN+'_INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

if(DRY){
  const dry={run:RUN,dry_run:true,source_sha:SHA,model:MODEL,packet_sha256:packetHash,input_manifest:manifest};
  fs.writeFileSync('out/exp023/DRY_RUN.json',JSON.stringify(dry,null,2)+'\n');
  console.log(JSON.stringify(dry));
  process.exit(0);
}

const request={
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{
    candidateCount:1,
    maxOutputTokens:32768,
    temperature:0.1
  }
};
const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';

let status=0,responseText='',attempts=0;
for(let i=0;i<2;i++){
  attempts=i+1;
  const response=await fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json','x-goog-api-key':KEY},
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
  experiment:'023',
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
  fs.writeFileSync('out/exp023/METADATA.json',JSON.stringify({...metadata,semantic_status:'PROVIDER_FAILURE'},null,2)+'\n');
  throw new Error('Gemini HTTP '+status);
}

const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[])
  .filter(part=>!part.thought)
  .map(part=>part.text||'')
  .join('')
  .trim();

fs.writeFileSync('out/exp023/COLD_REPORT_RAW.txt',raw+'\n');

let jsonText=raw.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
const first=jsonText.indexOf('{');
const last=jsonText.lastIndexOf('}');
if(first>=0&&last>=first) jsonText=jsonText.slice(first,last+1);

let parsed;
try{
  parsed=JSON.parse(jsonText);
}catch(error){
  fs.writeFileSync('out/exp023/METADATA.json',JSON.stringify({...metadata,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(raw)},null,2)+'\n');
  throw error;
}

fs.writeFileSync('out/exp023/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync('out/exp023/METADATA.json',JSON.stringify({
  ...metadata,
  semantic_status:'FROZEN',
  report_sha256:sha256(raw),
  finish_reason:data.candidates?.[0]?.finishReason??null,
  usage:data.usageMetadata??null
},null,2)+'\n');

console.log(JSON.stringify({run:RUN,status,attempts,packet_sha256:packetHash,report_sha256:sha256(raw)}));
