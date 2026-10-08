import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const run=(process.argv[2]||'').trim();
if(!['A','B'].includes(run)) throw new Error('usage: node run-exp061-cold.mjs A|B');

const SHA=process.env.GITHUB_SHA;
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
  'CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md',
  'research/primitive-demand-qualification/dnwf/DNWF_0_1_CANDIDATE.md',
  'research/primitive-demand-qualification/dnwf/DNWF_NATIVE_VOCAB_0_1.md',
  'research/primitive-demand-qualification/dnwf/DNWF_COLD_CASES_0_3.json',
  'experiments/061/PUBLIC_OUTPUT_SCHEMA.json'
];
const promptPath='research/primitive-demand-qualification/dnwf/DNWF_COLD_PROMPT_0_3.md';
const forbidden=[
  'ORACLE','score-exp061','SCORE','PREQUALIFICATION','COVERAGE_AUDIT','CANDIDATE_SCOPE_AUDIT',
  'SOURCE_SEMANTIC_CENSUS','PRIMITIVE_DEMAND_GRAPH','CANDIDATE_PRIMITIVE_BASIS',
  'woit-lisi-isomorph/woit','woit-lisi-isomorph/lisi','AGENTS.md','STATUS.md',
  'experiments/061/evidence'
];

const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');
for(const p of [...inputs,promptPath]){
  if(forbidden.some(x=>p.includes(x))) throw new Error('forbidden cold input '+p);
  frozen(p);
}

const cases=JSON.parse(frozen('research/primitive-demand-qualification/dnwf/DNWF_COLD_CASES_0_3.json'));
if(cases.cases?.length!==19) throw new Error('expected 19 cold cases');
for(let i=1;i<=19;i++){
  const id='DNWF-C'+String(i).padStart(2,'0');
  if(!cases.cases.some(x=>x.id===id)) throw new Error('missing '+id);
}

const manifest=[];
const chunks=[
  'ISOGRAPH EXPERIMENT 061 — DNWF 0.1 COLD QUALIFICATION\n'+
  'Frozen SHA: '+SHA+'\n'+
  'ISOLATION: use only the delimited permitted files. Hidden oracle, scorer source, prior decoder outputs, author audits, qualification reviews, W/L source material, repository summaries, and browsing are unavailable.\n'
];
for(const p of inputs){
  const v=frozen(p);
  manifest.push({path:p,sha256:h(v),bytes:Buffer.byteLength(v)});
  chunks.push('\n===== BEGIN PERMITTED FILE: '+p+' =====\n'+v+'\n===== END PERMITTED FILE: '+p+' =====\n');
}
const prompt=frozen(promptPath);
manifest.push({path:promptPath,sha256:h(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');
const packet=chunks.join('');
const packetHash=h(packet);
const out='out/exp061/decoder-'+run;
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/PACKET.txt',packet);
fs.writeFileSync(out+'/INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');

const base={
  experiment:'061',decoder_run:run,source_sha:SHA,model:MODEL,
  packet_sha256:packetHash,input_manifest:manifest,case_count:19
};
if(DRY){
  fs.writeFileSync(out+'/DRY_RUN.json',JSON.stringify({...base,dry_run:true},null,2)+'\n');
  console.log(JSON.stringify({...base,dry_run:true}));
  process.exit(0);
}

const request={
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{
    candidateCount:1,
    maxOutputTokens:16384,
    temperature:0.1,
    responseMimeType:'application/json'
  }
};
const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
let status=0,responseText='',attempts=0;
for(let i=0;i<2;i++){
  attempts=i+1;
  let response;
  try{
    response=await fetch(url,{
      method:'POST',
      headers:{'Content-Type':'application/json','x-goog-api-key':KEY},
      body:JSON.stringify(request),
      signal:AbortSignal.timeout(90000)
    });
    status=response.status;
    responseText=await response.text();
  }catch(error){
    responseText=String(error);
    status=0;
  }
  if(status>=200&&status<300) break;
  if(status===429) break;
  if(i===0&&[0,500,502,503,504].includes(status)){
    await new Promise(resolve=>setTimeout(resolve,20000));
    continue;
  }
  break;
}

const metadata={
  ...base,
  workflow_run_id:process.env.GITHUB_RUN_ID||null,
  workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,
  api_attempts:attempts,http_status:status
};
if(!(status>=200&&status<300)){
  fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'PROVIDER_FAILURE',response_prefix:responseText.slice(0,500)},null,2)+'\n');
  throw new Error('decoder '+run+' Gemini HTTP '+status);
}

const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
fs.writeFileSync(out+'/API_RESPONSE.json',responseText);
fs.writeFileSync(out+'/COLD_REPORT_RAW.txt',raw+'\n');
let t=raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,'');
const first=t.indexOf('['),last=t.lastIndexOf(']');
if(first>=0&&last>=first)t=t.slice(first,last+1);
let parsed;
try{parsed=JSON.parse(t);}
catch(error){
  fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'MALFORMED_OUTPUT',report_sha256:h(raw)},null,2)+'\n');
  throw error;
}
if(!Array.isArray(parsed)) throw new Error('decoder output is not an array');
fs.writeFileSync(out+'/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'FROZEN',report_sha256:h(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({decoder_run:run,status,attempts,packet_sha256:packetHash,report_sha256:h(raw)}));
