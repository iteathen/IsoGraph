import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP028';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3-flash-preview';
const FALLBACK_MODELS=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODEL_CANDIDATES=[...new Set([MODEL,...FALLBACK_MODELS])];
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;

if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',
  'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md',
  'experiments/028/BASELINE_AUTHORITY.md',
  'experiments/028/DP_0_7_CASES.md'
];
const promptPath='experiments/028/COLD_PROMPT.md';

const expectedHashes={
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md':'51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md':'1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md':'6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee',
  'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md':'9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md':'7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d'
};

const forbidden=[
  'hidden/',
  'ASSERTIONS',
  'score-exp028',
  'test-score-exp028',
  'test-runner-exp028',
  'QUALIFICATION_REVIEW',
  'AUTHORING_AUDIT',
  'experiments/028/evidence',
  'SCORE_0_4',
  'FINAL_REPORT_0_4',
  'oracle/',
  'SCORING_CONTRACT',
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

for(const path of [...inputs,promptPath]){
  if(forbidden.some(item=>path.includes(item))) throw new Error('forbidden cold input '+path);
  frozen(path);
}

for(const [path,expected] of Object.entries(expectedHashes)){
  const actual=sha256(frozen(path));
  if(actual!==expected) throw new Error('authority hash mismatch '+path+' '+actual);
}

const baseline=frozen('experiments/028/BASELINE_AUTHORITY.md');
for(const marker of [
  'accepted blind workflow run: `36228776786`',
  'section 17 target 11',
  'section 17 target 17',
  'all three positive controls passed'
]){
  if(!baseline.toLowerCase().includes(marker.toLowerCase())){
    throw new Error('baseline predecessor marker missing: '+marker);
  }
}

const casesText=frozen('experiments/028/DP_0_7_CASES.md');
for(let i=1;i<=13;i++){
  const id='D'+String(i).padStart(2,'0');
  if(!casesText.includes('## '+id+' ')) throw new Error('missing public case '+id);
}

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 028 — DP 0.7 DERIVED-VIEW SUCCESSOR QUALIFICATION
Run: ${RUN}
Frozen SHA: ${SHA}
Requested model: ${MODEL}

ISOLATION: use only the delimited files. DP 0.1-0.6 and the named dependency modules are already qualified baseline authority. Fresh predecessor evidence already covers DP 0.7 section 17 targets 11 and 17. This call tests the remaining DP 0.7 successor burden. Hidden assertions/scorer, previous Experiment 028 evidence, positive-control hidden oracles/scores, repository routing documents, and browsing are unavailable.
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
const out='out/exp028';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/PACKET.txt',packet);
fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

const baseMeta={
  experiment:'028',
  run:RUN,
  source_sha:SHA,
  model_requested:MODEL,
  model_candidates:MODEL_CANDIDATES,
  packet_sha256:packetHash,
  dp_0_7_sha256:expectedHashes['extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md'],
  case_count:13,
  predecessor_positive_control_stage:'PASS_3_OF_3',
  predecessor_positive_control_run:36228776786,
  input_manifest:manifest
};

if(DRY){
  fs.writeFileSync(out+'/DRY_RUN.json',JSON.stringify({...baseMeta,dry_run:true},null,2)+'\n');
  console.log(JSON.stringify({...baseMeta,dry_run:true}));
  process.exit(0);
}

const providerCalls=[];
const disabledModels=new Map();

async function callGemini(){
  const failures=[];
  for(const model of MODEL_CANDIDATES){
    if(disabledModels.has(model)) continue;
    let useThinking=!model.includes('flash-lite');

    for(let attempt=0;attempt<4;attempt++){
      const generationConfig={
        candidateCount:1,
        maxOutputTokens:16384,
        temperature:0.1,
        responseMimeType:'application/json'
      };
      if(useThinking) generationConfig.thinkingConfig={thinkingLevel:'HIGH'};

      const request={
        contents:[{role:'user',parts:[{text:packet}]}],
        generationConfig
      };

      const url='https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent';
      let response;
      let responseText='';

      try{
        response=await fetch(url,{
          method:'POST',
          headers:{'Content-Type':'application/json','x-goog-api-key':KEY},
          body:JSON.stringify(request)
        });
        responseText=await response.text();
      }catch(error){
        failures.push({model,status:null,error:String(error)});
        if(attempt<1){
          await new Promise(resolve=>setTimeout(resolve,8000));
          continue;
        }
        disabledModels.set(model,'network_error');
        break;
      }

      if(response.ok){
        let data;
        try{
          data=JSON.parse(responseText);
        }catch(error){
          failures.push({model,status:response.status,error:'malformed_api_json',detail:String(error)});
          if(attempt<1) continue;
          disabledModels.set(model,'malformed_api_json');
          break;
        }

        const raw=(data.candidates?.[0]?.content?.parts||[])
          .filter(part=>!part.thought)
          .map(part=>part.text||'')
          .join('')
          .trim();

        providerCalls.push({
          model,
          status:response.status,
          attempt:attempt+1,
          thinking:useThinking,
          usage:data.usageMetadata??null
        });

        return {model,status:response.status,attempts:attempt+1,thinking:useThinking,data,raw,responseText};
      }

      failures.push({model,status:response.status,body_prefix:responseText.slice(0,500)});

      if(response.status===400&&useThinking&&/thinking/i.test(responseText)){
        useThinking=false;
        attempt--;
        continue;
      }

      if(response.status===429){
        if(attempt<3){
          let retryMs=15000;
          const match=responseText.match(/retry in ([0-9.]+)s/i);
          if(match) retryMs=Math.max(retryMs,Math.ceil(Number(match[1])*1000)+3000);
          await new Promise(resolve=>setTimeout(resolve,retryMs));
          continue;
        }
        disabledModels.set(model,'http_429');
        break;
      }

      if(response.status===404){
        disabledModels.set(model,'http_404');
        break;
      }

      if([500,502,503,504].includes(response.status)){
        if(attempt<3){
          await new Promise(resolve=>setTimeout(resolve,15000*(attempt+1)));
          continue;
        }
        disabledModels.set(model,'http_'+response.status);
        break;
      }

      disabledModels.set(model,'http_'+response.status);
      break;
    }
  }

  throw new Error('All Gemini model candidates unavailable: '+JSON.stringify(failures).slice(0,3000));
}

const call=await callGemini();
fs.writeFileSync(out+'/API_RESPONSE.json',call.responseText);

const metadata={
  ...baseMeta,
  workflow_run_id:process.env.GITHUB_RUN_ID||null,
  workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,
  selected_model:call.model,
  api_attempts:call.attempts,
  http_status:call.status,
  provider_calls:providerCalls,
  disabled_models:Object.fromEntries(disabledModels)
};

fs.writeFileSync(out+'/COLD_REPORT_RAW.txt',call.raw+'\n');

let jsonText=call.raw
  .replace(/^\`\`\`(?:json)?\s*/i,'')
  .replace(/\s*\`\`\`$/,'');

const first=jsonText.indexOf('{');
const last=jsonText.lastIndexOf('}');
if(first>=0&&last>=first) jsonText=jsonText.slice(first,last+1);

let parsed;
try{
  parsed=JSON.parse(jsonText);
}catch(error){
  fs.writeFileSync(out+'/METADATA.json',JSON.stringify({
    ...metadata,
    semantic_status:'MALFORMED_OUTPUT',
    report_sha256:sha256(call.raw),
    finish_reason:call.data.candidates?.[0]?.finishReason??null,
    usage:call.data.usageMetadata??null
  },null,2)+'\n');
  throw error;
}

fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(out+'/METADATA.json',JSON.stringify({
  ...metadata,
  semantic_status:'FROZEN',
  report_sha256:sha256(call.raw),
  finish_reason:call.data.candidates?.[0]?.finishReason??null,
  usage:call.data.usageMetadata??null
},null,2)+'\n');

console.log(JSON.stringify({
  run:RUN,
  model:call.model,
  status:call.status,
  attempts:call.attempts,
  packet_sha256:packetHash,
  report_sha256:sha256(call.raw)
}));
