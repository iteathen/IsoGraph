import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP029';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3-flash-preview';
const FALLBACK_MODELS=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODEL_CANDIDATES=[...new Set([MODEL,...FALLBACK_MODELS])];
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;

if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
  'experiments/029/BASELINE_AUTHORITY.md',
  'experiments/029/CORE_0_19_CASES.md'
];
const promptPath='experiments/029/COLD_PROMPT.md';

const expectedSha256={
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md':'51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md':'1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md':'7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d'
};

const CORE017_BLOB='fb47f8de1bd70d6f9fe1d4cf5181a52018ce8e04';
const CORE019_BLOB='ae482dda774456a855af942dc8d15fcfd5aae0bb';
const ESR_PROMOTION='research/project-discovery/2026-09-25-dp07-three-positive-controls/translation-v2/PROMOTION_0_1.json';
const ESR_PROMOTION_BLOB='489be088187329ef3cbcf95d08fe73cd7d026ee8';

const forbidden=[
  'hidden/',
  'experiments/029/hidden/',
  'score-exp029',
  'test-score-exp029',
  'test-runner-exp029',
  'QUALIFICATION_REVIEW',
  'AUTHORING_AUDIT',
  'experiments/029/evidence',
  'translation-v2/evidence',
  'translation-v2/hidden',
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

function blobSha(path){
  return execFileSync('git',['rev-parse',SHA+':'+path],{encoding:'utf8'}).trim();
}

function sha256(value){
  return crypto.createHash('sha256').update(value).digest('hex');
}

for(const path of [...inputs,promptPath]){
  if(forbidden.some(item=>path.includes(item))) throw new Error('forbidden cold input '+path);
  frozen(path);
}

if(blobSha('CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md')!==CORE017_BLOB){
  throw new Error('Core 0.17 blob mismatch');
}
if(blobSha('CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md')!==CORE019_BLOB){
  throw new Error('Core 0.19 blob mismatch');
}

for(const [path,expected] of Object.entries(expectedSha256)){
  const actual=sha256(frozen(path));
  if(actual!==expected) throw new Error('authority hash mismatch '+path+' '+actual);
}

if(blobSha(ESR_PROMOTION)!==ESR_PROMOTION_BLOB) throw new Error('ESR promotion blob mismatch');
const promotion=JSON.parse(frozen(ESR_PROMOTION));
if(promotion.contract!=='ESR-0.1') throw new Error('ESR contract mismatch');
if(promotion.core_requirement!=='CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md#18') throw new Error('ESR Core requirement mismatch');
if(promotion.all_six_qualified!==true||promotion.q7_promotion!=='PASS'||promotion.status!=='PROMOTED_FOR_DP07_DISCOVERY'){
  throw new Error('ESR predecessor not fully qualified/promoted');
}
if(!Array.isArray(promotion.cases)||promotion.cases.length!==6) throw new Error('ESR predecessor case count mismatch');

const casesText=frozen('experiments/029/CORE_0_19_CASES.md');
for(let i=1;i<=24;i++){
  const id='D'+String(i).padStart(2,'0');
  if(!casesText.includes('## '+id+' ')) throw new Error('missing public case '+id);
}

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 029 — CORE 0.19 QUALIFICATION
Run: ${RUN}
Frozen SHA: ${SHA}
Requested model: ${MODEL}

ISOLATION: use only the delimited files. Core 0.17/Core 0.18 and named extensions are qualified dependencies. Core 0.19 is the candidate under test. The ESR predecessor is verified mechanically but its decoder/verifier/oracle evidence is not included. Hidden assertions/scorer, previous Experiment 029 evidence, repository routing files, and browsing are unavailable.
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
const out='out/exp029';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/PACKET.txt',packet);
fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

const baseMeta={
  experiment:'029',
  run:RUN,
  source_sha:SHA,
  model_requested:MODEL,
  model_candidates:MODEL_CANDIDATES,
  packet_sha256:packetHash,
  core_0_17_blob_sha:CORE017_BLOB,
  core_0_19_blob_sha:CORE019_BLOB,
  core_0_19_sha256:sha256(frozen('CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md')),
  case_count:24,
  esr_predecessor_status:'PASS_6_OF_6_Q7',
  esr_promotion_blob_sha:ESR_PROMOTION_BLOB,
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
        maxOutputTokens:65536,
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
  report_sha256:sha256(call.raw),
  core_0_19_sha256:baseMeta.core_0_19_sha256
}));
