import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP031';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3-flash-preview';
const FALLBACK_MODELS=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODEL_CANDIDATES=[...new Set([MODEL,...FALLBACK_MODELS])];
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;

if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const authorityInputs=[
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md',
  'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md'
];
const publicInputs=[
  'experiments/031/BASELINE_AUTHORITY.md',
  'experiments/031/FULL_STACK_CORE_0_19_CASES.md'
];
const inputs=[...authorityInputs,...publicInputs];
const promptPath='experiments/031/COLD_PROMPT.md';

const expectedHashes={
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md':'348d59017047f7d64daba2066b9b3e068c629186ee3e767551cfcb9815fe36a8',
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md':'51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63',
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md':'8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md':'1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md':'6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md':'25fb4f84343633a22b08b2375fa085c2e01dc7f8a799a0e038b3fcf7ecc73c6b',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md':'9b121b767f5ca52759bd9a7a42d32dd1e6f12872c2bcfb370277a6292dd6011c',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md':'c37c9caebe33dc0b7f021638ab1679930f0e7edfbb3bd9368efdfc48538a11ee',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md':'35e70a19f0eb6a1893f541465d76e7d37d028a9128391562afcd6c9260d462cd',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md':'522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md':'2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md':'7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d',
  'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md':'9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad'
};

const forbidden=[
  'hidden/','ASSERTIONS','score-exp031','test-score-exp031','AUTHORING_AUDIT',
  'FINAL_QUALIFICATION_REVIEW','experiments/031/evidence','experiments/027/evidence',
  'experiments/028/evidence','experiments/029/evidence','experiments/030/evidence',
  'EXPERIMENT_027_FINAL','EXPERIMENT_028_FINAL','EXPERIMENT_029_FINAL','EXPERIMENT_030_FINAL',
  'qualification/CORE_0_19_QUALIFICATION','CURRENT_INTEGRATED_STACK','QUALIFIED_MODULES',
  'AGENTS.md','README.md','STATUS.md'
];

function frozen(path){
  return execFileSync('git',['show',SHA+':'+path],{encoding:'utf8',maxBuffer:128*1024*1024});
}
function sha256(value){ return crypto.createHash('sha256').update(value).digest('hex'); }

for(const path of [...inputs,promptPath]){
  if(forbidden.some(item=>path.includes(item))) throw new Error('forbidden cold input '+path);
  frozen(path);
}
for(const [path,expected] of Object.entries(expectedHashes)){
  const actual=sha256(frozen(path));
  if(actual!==expected) throw new Error('authority hash mismatch '+path+' '+actual);
}

const casesText=frozen('experiments/031/FULL_STACK_CORE_0_19_CASES.md');
for(let i=1;i<=32;i++){
  const id='F'+String(i).padStart(2,'0');
  if(!casesText.includes('## '+id+' ')) throw new Error('missing public case '+id);
}

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 031 — DIRECT FULL-STACK CORE 0.19 QUALIFICATION
Run: ${RUN}
Frozen SHA: ${SHA}
Requested model: ${MODEL}

ISOLATION: use only the delimited files. Every semantic module in this packet is already individually qualified at the pinned hash. This experiment directly tests their complete composition with Core 0.19 active. Hidden assertions/scorer, prior experiment outputs/evidence/reviews, repository status/routing files, current integration conclusions, and browsing are unavailable.
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
const out='out/exp031';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/PACKET.txt',packet);
fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

const baseMeta={
  experiment:'031',
  run:RUN,
  source_sha:SHA,
  model_requested:MODEL,
  model_candidates:MODEL_CANDIDATES,
  packet_sha256:packetHash,
  authority_hashes:expectedHashes,
  case_count:32,
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
        maxOutputTokens:32768,
        temperature:0.1,
        responseMimeType:'application/json'
      };
      if(useThinking) generationConfig.thinkingConfig={thinkingLevel:'HIGH'};
      const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig};
      const url='https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent';
      let response; let responseText='';
      try{
        response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});
        responseText=await response.text();
      }catch(error){
        failures.push({model,status:null,error:String(error)});
        if(attempt<1){await new Promise(r=>setTimeout(r,8000));continue;}
        disabledModels.set(model,'network_error'); break;
      }
      if(response.ok){
        let data;
        try{data=JSON.parse(responseText);}catch(error){
          failures.push({model,status:response.status,error:'malformed_api_json',detail:String(error)});
          if(attempt<1) continue;
          disabledModels.set(model,'malformed_api_json'); break;
        }
        const raw=(data.candidates?.[0]?.content?.parts||[]).filter(part=>!part.thought).map(part=>part.text||'').join('').trim();
        providerCalls.push({model,status:response.status,attempt:attempt+1,thinking:useThinking,usage:data.usageMetadata??null});
        return {model,status:response.status,attempts:attempt+1,thinking:useThinking,data,raw,responseText};
      }
      failures.push({model,status:response.status,body_prefix:responseText.slice(0,500)});
      if(response.status===400&&useThinking&&/thinking/i.test(responseText)){useThinking=false;attempt--;continue;}
      if(response.status===429){
        if(attempt<3){
          let retryMs=15000; const match=responseText.match(/retry in ([0-9.]+)s/i);
          if(match) retryMs=Math.max(retryMs,Math.ceil(Number(match[1])*1000)+3000);
          await new Promise(r=>setTimeout(r,retryMs)); continue;
        }
        disabledModels.set(model,'http_429'); break;
      }
      if(response.status===404){disabledModels.set(model,'http_404');break;}
      if([500,502,503,504].includes(response.status)){
        if(attempt<3){await new Promise(r=>setTimeout(r,15000*(attempt+1)));continue;}
        disabledModels.set(model,'http_'+response.status); break;
      }
      disabledModels.set(model,'http_'+response.status); break;
    }
  }
  throw new Error('All Gemini model candidates unavailable: '+JSON.stringify(failures).slice(0,4000));
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

let jsonText=call.raw.replace(/^\`\`\`(?:json)?\s*/i,'').replace(/\s*\`\`\`$/,'');
const first=jsonText.indexOf('{'); const last=jsonText.lastIndexOf('}');
if(first>=0&&last>=first) jsonText=jsonText.slice(first,last+1);

let parsed;
try{parsed=JSON.parse(jsonText);}catch(error){
  fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(call.raw),finish_reason:call.data.candidates?.[0]?.finishReason??null,usage:call.data.usageMetadata??null},null,2)+'\n');
  throw error;
}
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'FROZEN',report_sha256:sha256(call.raw),finish_reason:call.data.candidates?.[0]?.finishReason??null,usage:call.data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({run:RUN,model:call.model,status:call.status,attempts:call.attempts,packet_sha256:packetHash,report_sha256:sha256(call.raw)}));
