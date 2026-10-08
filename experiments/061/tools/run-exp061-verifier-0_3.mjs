import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const KEY=process.env.GEMINI_API_KEY;
const MODEL=process.env.GEMINI_VERIFIER_MODEL||process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!KEY)throw new Error('GEMINI_API_KEY unavailable');

const frozen=p=>execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});
const h=v=>crypto.createHash('sha256').update(v).digest('hex');

const repoInputs=[
 'research/primitive-demand-qualification/dnwf/DNWF_0_1_CANDIDATE.md',
 'research/primitive-demand-qualification/dnwf/DNWF_0_1_QUALIFICATION_PLAN.md',
 'research/primitive-demand-qualification/dnwf/DNWF_COLD_CASES_0_3.json',
 'research/primitive-demand-qualification/dnwf/DNWF_COLD_ORACLE_0_3.json',
 'experiments/061/VERIFIER_PROMPT.md'
];
for(const p of repoInputs)frozen(p);

const requiredOut=[
 'out/exp061/decoder-A/PARSED_REPORT.json',
 'out/exp061/decoder-B/PARSED_REPORT.json',
 'out/exp061/decoder-A/METADATA.json',
 'out/exp061/decoder-B/METADATA.json',
 'out/exp061/decoder-A/INPUT_MANIFEST.json',
 'out/exp061/decoder-B/INPUT_MANIFEST.json',
 'out/exp061/SCORE_DECODERS.json'
];
for(const p of requiredOut)if(!fs.existsSync(p))throw new Error('missing frozen evidence '+p);

const chunks=[
 'ISOGRAPH EXPERIMENT 061 — DNWF POST-FREEZE INDEPENDENT VERIFICATION\n'+
 'Frozen source SHA: '+SHA+'\n'+
 'The decoder outputs below are frozen evidence. Do not alter or reinterpret their classifications. The hidden oracle becomes visible only in this verifier phase.\n'
];
for(const p of repoInputs){
 const v=frozen(p);
 chunks.push('\n===== BEGIN FROZEN REPOSITORY FILE: '+p+' =====\n'+v+'\n===== END FROZEN REPOSITORY FILE: '+p+' =====\n');
}
for(const p of requiredOut){
 const v=fs.readFileSync(p,'utf8');
 chunks.push('\n===== BEGIN FROZEN EVIDENCE: '+p+' =====\n'+v+'\n===== END FROZEN EVIDENCE: '+p+' =====\n');
}
const packet=chunks.join('');
const out='out/exp061/verifier';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/PACKET.txt',packet);
fs.writeFileSync(out+'/PACKET_METADATA.json',JSON.stringify({source_sha:SHA,model:MODEL,packet_sha256:h(packet)},null,2)+'\n');

const request={
 contents:[{role:'user',parts:[{text:packet}]}],
 generationConfig:{candidateCount:1,maxOutputTokens:8192,temperature:0.1,responseMimeType:'application/json'}
};
const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
let status=0,responseText='',attempts=0;
for(let i=0;i<2;i++){
 attempts=i+1;
 let response;
 try{
  response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request),signal:AbortSignal.timeout(90000)});
  status=response.status;responseText=await response.text();
 }catch(error){status=0;responseText=String(error);}
 if(status>=200&&status<300)break;
 if(status===429)break;
 if(i===0&&[0,500,502,503,504].includes(status)){await new Promise(r=>setTimeout(r,20000));continue;}
 break;
}
const metadata={experiment:'061',role:'independent_verifier',model:MODEL,source_sha:SHA,packet_sha256:h(packet),api_attempts:attempts,http_status:status,workflow_run_id:process.env.GITHUB_RUN_ID||null,workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null};
if(!(status>=200&&status<300)){
 fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'PROVIDER_FAILURE',response_prefix:responseText.slice(0,500)},null,2)+'\n');
 throw new Error('verifier Gemini HTTP '+status);
}
const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
fs.writeFileSync(out+'/API_RESPONSE.json',responseText);
fs.writeFileSync(out+'/VERIFIER_RAW.txt',raw+'\n');
let t=raw.replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,'');
const a=t.indexOf('{'),b=t.lastIndexOf('}');if(a>=0&&b>=a)t=t.slice(a,b+1);
const parsed=JSON.parse(t);
fs.writeFileSync(out+'/VERIFIER_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(out+'/METADATA.json',JSON.stringify({...metadata,semantic_status:'FROZEN',report_sha256:h(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({status,attempts,packet_sha256:h(packet),report_sha256:h(raw),support_promotion:parsed.support_promotion}));
