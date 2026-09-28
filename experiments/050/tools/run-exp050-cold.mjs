import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP050';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3-flash-preview';
const FALLBACK_MODELS=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODEL_CANDIDATES=[...new Set([MODEL,...FALLBACK_MODELS])];
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY)throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
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
 'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md',
 'experiments/050/BASELINE_AUTHORITY.md',
 'experiments/050/DP_0_8_CASES.md',
 'experiments/050/PUBLIC_OUTPUT_SCHEMA.json'
];
const promptPath='experiments/050/COLD_PROMPT.md';
const forbidden=['hidden/','score-exp050','test-score-exp050','test-runner-exp050','evidence','ATTEMPT_','FINAL_QUALIFICATION_REVIEW','AGENTS.md','README.md','STATUS.md','GLYCAN_','P_VS_NP'];
function frozen(p){return execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});}
function sha256(v){return crypto.createHash('sha256').update(v).digest('hex');}
for(const p of [...inputs,promptPath]){if(forbidden.some(x=>p.includes(x)))throw new Error('forbidden cold input '+p);frozen(p);}
const cases=frozen('experiments/050/DP_0_8_CASES.md');
for(let i=1;i<=22;i++){const id='E'+String(i).padStart(2,'0');if(!cases.includes('## '+id+' '))throw new Error('missing '+id);}
const authorityPaths=inputs.slice(0,13);
const authorityHashes=Object.fromEntries(authorityPaths.map(p=>[p,sha256(frozen(p))]));
const manifest=[],chunks=[`ISOGRAPH EXPERIMENT 050 — DP 0.8 PRINCIPLE-LEVEL QUALIFICATION
Run: ${RUN}
Frozen SHA: ${SHA}
Requested model: ${MODEL}

ISOLATION: use only the delimited files. DP 0.1–0.7 are qualified predecessor discovery authority. Core 0.18/0.19, QU 0.1, NEI 0.4, and DTS 0.1 own their semantic domains. DP 0.8 is the candidate under test. Public cases are blind as to bug/clue/both/neither. Scoring is on required behavior, not non-normative bookkeeping-label granularity. Hidden answers, scorers, earlier DP 0.8 qualification attempts, repository status/routing, motivating research, and browsing are unavailable.
`];
for(const p of inputs){const v=frozen(p);manifest.push({path:p,sha256:sha256(v),bytes:Buffer.byteLength(v)});chunks.push('\n===== BEGIN PERMITTED FILE: '+p+' =====\n'+v+'\n===== END PERMITTED FILE: '+p+' =====\n');}
const prompt=frozen(promptPath);manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');
const packet=chunks.join(''),packetHash=sha256(packet),out='out/exp050';
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(out+'/PACKET.txt',packet);fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');
const baseMeta={experiment:'050',run:RUN,source_sha:SHA,model_requested:MODEL,model_candidates:MODEL_CANDIDATES,packet_sha256:packetHash,authority_hashes:authorityHashes,dp_0_8_sha256:authorityHashes['extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md'],case_count:22,input_manifest:manifest};
if(DRY){fs.writeFileSync(out+'/DRY_RUN.json',JSON.stringify({...baseMeta,dry_run:true},null,2)+'\n');console.log(JSON.stringify({...baseMeta,dry_run:true},null,2));process.exit(0);}

const providerCalls=[],disabledModels=new Map();
async function callGemini(){
 const failures=[];
 for(const model of MODEL_CANDIDATES){
  if(disabledModels.has(model))continue;
  let useThinking=!model.includes('flash-lite');
  for(let attempt=0;attempt<4;attempt++){
   const generationConfig={candidateCount:1,maxOutputTokens:32768,temperature:0.1,responseMimeType:'application/json'};
   if(useThinking)generationConfig.thinkingConfig={thinkingLevel:'MEDIUM'};
   const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig};
   const url='https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent';
   let response,responseText='';
   try{response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});responseText=await response.text();}
   catch(error){failures.push({model,status:null,error:String(error)});if(attempt<1){await new Promise(r=>setTimeout(r,8000));continue;}disabledModels.set(model,'network_error');break;}
   if(response.ok){const data=JSON.parse(responseText);const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();providerCalls.push({model,status:response.status,attempt:attempt+1,thinking:useThinking,usage:data.usageMetadata??null});return {model,status:response.status,attempts:attempt+1,data,raw,responseText};}
   failures.push({model,status:response.status,body_prefix:responseText.slice(0,500)});
   if(response.status===400&&useThinking&&/thinking/i.test(responseText)){useThinking=false;attempt--;continue;}
   if(response.status===429){if(attempt<3){await new Promise(r=>setTimeout(r,15000*(attempt+1)));continue;}disabledModels.set(model,'http_429');break;}
   if([500,502,503,504].includes(response.status)){if(attempt<3){await new Promise(r=>setTimeout(r,15000*(attempt+1)));continue;}disabledModels.set(model,'http_'+response.status);break;}
   disabledModels.set(model,'http_'+response.status);break;
  }
 }
 throw new Error('All Gemini candidates unavailable: '+JSON.stringify(failures).slice(0,3000));
}
const call=await callGemini();
fs.writeFileSync(out+'/API_RESPONSE.json',call.responseText);
const metadata={...baseMeta,workflow_run_id:process.env.GITHUB_RUN_ID||null,workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,selected_model:call.model,api_attempts:call.attempts,http_status:call.status,provider_calls:providerCalls,disabled_models:Object.fromEntries(disabledModels)};
fs.writeFileSync(out+'/COLD_REPORT_RAW.txt',call.raw+'\n');
let jsonText=call.raw.replace(/^\`\`\`(?:json)?\s*/i,'').replace(/\s*\`\`\`$/,'');const first=jsonText.indexOf('{'),last=jsonText.lastIndexOf('}');if(first>=0&&last>=first)jsonText=jsonText.slice(first,last+1);
let parsed;try{parsed=JSON.parse(jsonText);}catch(error){fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(call.raw),finish_reason:call.data.candidates?.[0]?.finishReason??null,usage:call.data.usageMetadata??null},null,2)+'\n');throw error;}
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'FROZEN',report_sha256:sha256(call.raw),finish_reason:call.data.candidates?.[0]?.finishReason??null,usage:call.data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({run:RUN,model:call.model,status:call.status,attempts:call.attempts,packet_sha256:packetHash,report_sha256:sha256(call.raw)},null,2));
