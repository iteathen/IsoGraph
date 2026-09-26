import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP030';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3-flash-preview';
const FALLBACK_MODELS=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODELS=[...new Set([MODEL,...FALLBACK_MODELS])];
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
  'experiments/030/CASES.md'
];
const promptPath='experiments/030/COLD_PROMPT.md';
const CORE_HASH='8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2';
const forbidden=['experiments/030/hidden/','experiments/030/hidden/ASSERTIONS.json','score-exp030','experiment/029/evidence','C25_CONTRACT_DIAGNOSTIC','STATUS.md','AGENTS.md','README.md'];

function frozen(p){return execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});}
function sha256(v){return crypto.createHash('sha256').update(v).digest('hex');}

for(const p of [...inputs,promptPath]){
  if(forbidden.some(x=>p.includes(x))) throw new Error('forbidden cold input '+p);
  frozen(p);
}
if(sha256(frozen(inputs[0]))!==CORE_HASH) throw new Error('Core 0.19 hash mismatch');
const cases=frozen('experiments/030/CASES.md');
for(const id of ['R01','R02']) if(!cases.includes('## '+id+' ')) throw new Error('missing '+id);

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 030 — CORE 0.19 MUTATION REGRESSION
Frozen SHA: ${SHA}
Model: ${MODEL}

ISOLATION: use only the delimited Core 0.19 candidate, fresh cases, and governing prompt. Experiment 029 outputs, hidden assertions/scorer, repository routing files, and browsing are unavailable.
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
const out='out/exp030';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');
const base={experiment:'030',run:RUN,source_sha:SHA,model_requested:MODEL,model_candidates:MODELS,packet_sha256:packetHash,core_0_19_sha256:CORE_HASH,case_count:2,input_manifest:manifest};

if(DRY){
  fs.writeFileSync(out+'/DRY_RUN.json',JSON.stringify({...base,dry_run:true},null,2)+'\n');
  console.log(JSON.stringify({...base,dry_run:true}));
  process.exit(0);
}

const failures=[];
let call=null;
for(const model of MODELS){
  for(let i=0;i<3;i++){
    const cfg={candidateCount:1,maxOutputTokens:4096,temperature:0.1,responseMimeType:'application/json'};
    if(!model.includes('flash-lite')) cfg.thinkingConfig={thinkingLevel:'HIGH'};
    const url='https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent';
    const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:packet}]}],generationConfig:cfg})});
    const txt=await res.text();
    if(res.ok){
      const data=JSON.parse(txt);
      const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
      call={model,status:res.status,attempts:i+1,data,raw,responseText:txt};
      break;
    }
    failures.push({model,status:res.status,body_prefix:txt.slice(0,300)});
    if(res.status===429||[500,502,503,504].includes(res.status)){
      if(i<2){await new Promise(r=>setTimeout(r,12000*(i+1)));continue;}
    }
    break;
  }
  if(call) break;
}
if(!call) throw new Error('No Gemini model available '+JSON.stringify(failures).slice(0,2000));

fs.writeFileSync(out+'/COLD_REPORT_RAW.txt',call.raw+'\n');
let parsed;
try{parsed=JSON.parse(call.raw);}
catch(e){
  fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...base,selected_model:call.model,http_status:call.status,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(call.raw)},null,2)+'\n');
  throw e;
}
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...base,workflow_run_id:process.env.GITHUB_RUN_ID||null,workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,selected_model:call.model,api_attempts:call.attempts,http_status:call.status,semantic_status:'FROZEN',report_sha256:sha256(call.raw),finish_reason:call.data.candidates?.[0]?.finishReason??null,usage:call.data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({model:call.model,status:call.status,packet_sha256:packetHash,report_sha256:sha256(call.raw)}));
