import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT='research/project-discovery/2026-09-25-dp07-three-positive-controls';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.5-flash';
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

function frozen(p){
  return execFileSync('git',['show',`${SHA}:${p}`],{encoding:'utf8',maxBuffer:128*1024*1024});
}
function sha256(v){return crypto.createHash('sha256').update(v).digest('hex');}

const manifestPath=`${ROOT}/DISCOVERY_INPUT_MANIFEST.json`;
const promptPath=`${ROOT}/BLIND_DISCOVERY_PROMPT.md`;
const manifest=JSON.parse(frozen(manifestPath));
if(manifest.status!=='READY_FOR_BLIND_EXECUTION') throw new Error('manifest not ready');

const authority=manifest.authority_inputs||[];
const inputs=manifest.discovery_inputs||[];
const withheld=new Set(manifest.withheld_from_discovery||[]);
if(inputs.length!==12) throw new Error('expected exactly 12 anonymous discovery inputs');
for(const p of inputs){
  if(!p.includes('/blind/')) throw new Error('non-blind discovery input: '+p);
  if(withheld.has(p)) throw new Error('withheld path leaked: '+p);
}
const forbiddenPathTerms=['/oracle/','SCORING_CONTRACT','ising','lattice-gas','xor-gf2','newton-hamilton'];
for(const p of [...authority,...inputs,promptPath]){
  const low=p.toLowerCase();
  if(forbiddenPathTerms.some(x=>low.includes(x.toLowerCase()))) throw new Error('forbidden cold path: '+p);
}

const packetManifest=[];
const chunks=[
  'ISOGRAPH DP 0.7 THREE-POSITIVE-CONTROL BLIND DISCOVERY\n',
  `Frozen SHA: ${SHA}\nModel: ${MODEL}\n\n`,
  'ISOLATION: The packet contains only authority plus anonymized A/B structures. Hidden source identities, scoring contract, and correspondence oracles are unavailable.\n'
];
for(const p of authority){
  const t=frozen(p);
  packetManifest.push({kind:'authority',path:p,sha256:sha256(t),bytes:Buffer.byteLength(t)});
  chunks.push(`\n===== BEGIN AUTHORITY FILE: ${p} =====\n${t}\n===== END AUTHORITY FILE: ${p} =====\n`);
}
for(const p of inputs){
  const t=frozen(p);
  packetManifest.push({kind:'discovery_input',path:p,sha256:sha256(t),bytes:Buffer.byteLength(t)});
  chunks.push(`\n===== BEGIN ANONYMOUS DISCOVERY INPUT: ${p} =====\n${t}\n===== END ANONYMOUS DISCOVERY INPUT: ${p} =====\n`);
}
const prompt=frozen(promptPath);
packetManifest.push({kind:'prompt',path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push(`\n===== BEGIN GOVERNING PROMPT =====\n${prompt}\n===== END GOVERNING PROMPT =====\n`);

const packet=chunks.join('');
const packetHash=sha256(packet);
const out='out/dp07-positive-controls';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(`${out}/PACKET.txt`,packet);
fs.writeFileSync(`${out}/INPUT_MANIFEST.json`,JSON.stringify(packetManifest,null,2)+'\n');
const baseMeta={campaign:manifest.campaign,model:MODEL,frozen_sha:SHA,packet_sha256:packetHash,input_manifest:packetManifest};
if(DRY){
  fs.writeFileSync(`${out}/DRY_RUN.json`,JSON.stringify({...baseMeta,dry_run:true},null,2)+'\n');
  console.log(JSON.stringify({dry_run:true,packet_sha256:packetHash,files:packetManifest.length}));
  process.exit(0);
}

const request={
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{
    candidateCount:1,
    maxOutputTokens:32768,
    temperature:0.1,
    responseMimeType:'application/json',
    thinkingConfig:{thinkingLevel:'HIGH'}
  }
};
const url=`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
let status=0,responseText='',attempts=0;
for(let i=0;i<4;i++){
  attempts=i+1;
  const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});
  status=res.status;
  responseText=await res.text();
  if(res.ok) break;
  if(status===429) break;
  if([500,502,503,504].includes(status) && i<3){
    await new Promise(r=>setTimeout(r,20000*(i+1)));
    continue;
  }
  break;
}
fs.writeFileSync(`${out}/API_RESPONSE.json`,responseText);
const meta={...baseMeta,workflow_run_id:process.env.GITHUB_RUN_ID||null,workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,api_attempts:attempts,http_status:status};
if(!(status>=200&&status<300)){
  fs.writeFileSync(`${out}/METADATA.json`,JSON.stringify({...meta,semantic_status:'PROVIDER_FAILURE'},null,2)+'\n');
  throw new Error(`Gemini HTTP ${status}`);
}
const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
fs.writeFileSync(`${out}/COLD_REPORT_RAW.txt`,raw+'\n');
let parsed;
try{parsed=JSON.parse(raw);}
catch(e){
  fs.writeFileSync(`${out}/METADATA.json`,JSON.stringify({...meta,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(raw)},null,2)+'\n');
  throw e;
}
if(!Array.isArray(parsed?.cases)||parsed.cases.length!==3) throw new Error('expected three cases');
fs.writeFileSync(`${out}/PARSED_REPORT.json`,JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(`${out}/METADATA.json`,JSON.stringify({...meta,semantic_status:'FROZEN',report_sha256:sha256(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({status,attempts,packet_sha256:packetHash,report_sha256:sha256(raw)}));
