import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA,DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1',KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3-flash-preview';
const FALLBACK=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODELS=[...new Set([MODEL,...FALLBACK])];
if(!SHA)throw new Error('GITHUB_SHA unavailable');if(!DRY&&!KEY)throw new Error('GEMINI_API_KEY unavailable');
const inputs=[
 'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md',
 'experiments/051/BASELINE_AUTHORITY.md',
 'experiments/051/TARGET_5_CASE.md',
 'experiments/051/PUBLIC_OUTPUT_SCHEMA.json'
];
const promptPath='experiments/051/COLD_PROMPT.md';
function frozen(p){return execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});}
function h(v){return crypto.createHash('sha256').update(v).digest('hex');}
const forbidden=['hidden/','score-exp051','test-score-exp051','evidence','ATTEMPT_','FINAL_','AGENTS.md','STATUS.md'];
for(const p of [...inputs,promptPath]){if(forbidden.some(x=>p.includes(x)))throw new Error('forbidden '+p);frozen(p);}
const manifest=[],chunks=[`ISOGRAPH EXPERIMENT 051 — DP 0.8 TARGET-5 REPLACEMENT
Frozen SHA: ${SHA}

Use only delimited files. This is a fresh control for hidden distinction with no defect. Prior qualification outputs and hidden scoring are unavailable.
`];
for(const p of inputs){const v=frozen(p);manifest.push({path:p,sha256:h(v),bytes:Buffer.byteLength(v)});chunks.push('\n===== '+p+' =====\n'+v+'\n');}
const prompt=frozen(promptPath);manifest.push({path:promptPath,sha256:h(prompt),bytes:Buffer.byteLength(prompt)});chunks.push('\n===== PROMPT =====\n'+prompt);
const packet=chunks.join(''),out='out/exp051',packetHash=h(packet);
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(out+'/PACKET.txt',packet);fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');
const dpHash=h(frozen('extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md'));
const meta={experiment:'051',source_sha:SHA,packet_sha256:packetHash,dp_0_8_sha256:dpHash,case_count:1,input_manifest:manifest};
if(DRY){fs.writeFileSync(out+'/DRY_RUN.json',JSON.stringify({...meta,dry_run:true},null,2)+'\n');console.log(JSON.stringify({...meta,dry_run:true}));process.exit(0);}
let call=null,failures=[];
for(const model of MODELS){
 let useThinking=!model.includes('flash-lite');
 for(let attempt=0;attempt<3;attempt++){
  const generationConfig={candidateCount:1,maxOutputTokens:8192,temperature:0.1,responseMimeType:'application/json'};
  if(useThinking)generationConfig.thinkingConfig={thinkingLevel:'LOW'};
  const url='https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent';
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:packet}]}],generationConfig})});
  const responseText=await response.text();
  if(response.ok){const data=JSON.parse(responseText);const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();call={model,status:response.status,attempts:attempt+1,data,raw,responseText};break;}
  failures.push({model,status:response.status});
  if(response.status===400&&useThinking&&/thinking/i.test(responseText)){useThinking=false;attempt--;continue;}
  if([429,500,502,503,504].includes(response.status)&&attempt<2){await new Promise(r=>setTimeout(r,10000*(attempt+1)));continue;}
  break;
 }
 if(call)break;
}
if(!call)throw new Error('provider unavailable '+JSON.stringify(failures));
fs.writeFileSync(out+'/API_RESPONSE.json',call.responseText);fs.writeFileSync(out+'/COLD_REPORT_RAW.txt',call.raw+'\n');
let t=call.raw.replace(/^\`\`\`(?:json)?\s*/i,'').replace(/\s*\`\`\`$/,'');const first=t.indexOf('{'),last=t.lastIndexOf('}');if(first>=0&&last>=first)t=t.slice(first,last+1);
let parsed;try{parsed=JSON.parse(t);}catch(e){fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...meta,selected_model:call.model,semantic_status:'MALFORMED_OUTPUT',finish_reason:call.data.candidates?.[0]?.finishReason??null,report_sha256:h(call.raw)},null,2)+'\n');throw e;}
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...meta,selected_model:call.model,http_status:call.status,semantic_status:'FROZEN',finish_reason:call.data.candidates?.[0]?.finishReason??null,usage:call.data.usageMetadata??null,report_sha256:h(call.raw)},null,2)+'\n');
console.log(JSON.stringify({model:call.model,packet_sha256:packetHash,report_sha256:h(call.raw)}));
