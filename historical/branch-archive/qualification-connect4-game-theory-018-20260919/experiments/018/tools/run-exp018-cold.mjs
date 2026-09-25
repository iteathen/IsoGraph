import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const RUN='RUN-EXP018';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.5-flash';
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY)throw new Error('GEMINI_API_KEY unavailable');

const inputs=[
 'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
 'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
 'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',
 'qualification/QUALIFIED_MODULES_2026-09-18.md',
 'experiments/018/SOURCE_MANIFEST.json',
 'experiments/018/source/CONNECT4_GAME_THEORY_1_2_CANDIDATE.md',
 'experiments/018/source/CONNECT4_GAME_THEORY_1_2_CANDIDATE.json',
 'experiments/018/source/CONNECT4_GAME_THEORY_1_2_CANDIDATE.isg',
 'experiments/018/source/CONNECT4_GAME_THEORY_CLAIM_COVERAGE_1_2_CANDIDATE.json',
 'experiments/018/source/Q_CONGRUENCE_FINAL_QUALIFICATION_0_2.md',
 'experiments/018/source/CLEAN_SUCCESSOR_DISCOVERY_0_2.md',
 'experiments/018/source/CLEAN_SUCCESSOR_DISCOVERY_0_2.json',
 'experiments/018/source/ISOMAX_HOT_LOOP_GRAPH_AUTHORITY_0_3.md',
 'experiments/018/CASES.md'
];
const promptPath='experiments/018/COLD_PROMPT.md';
const forbidden=['hidden/','ASSERTIONS','score-exp018','AUTHORING_AUDIT','QUALIFICATION_REVIEW','experiments/018/evidence'];
function frozen(p){return execFileSync('git',['show',SHA+':'+p],{encoding:'utf8',maxBuffer:128*1024*1024});}
function sha256(v){return crypto.createHash('sha256').update(v).digest('hex');}

fs.mkdirSync('out/exp018',{recursive:true});
for(const p of [...inputs,promptPath]){if(forbidden.some(x=>p.includes(x)))throw new Error('Forbidden cold input: '+p);frozen(p);}
const cases=frozen('experiments/018/CASES.md');
for(let i=1;i<=16;i++){const id='P'+String(i).padStart(2,'0');if(!cases.includes('## '+id+' '))throw new Error('Missing '+id);}

const manifest=[],chunks=[`ISOGRAPH EXPERIMENT 018 — CONNECT4 GAME-THEORY 1.2 FINAL PACKAGE
Run: ${RUN}
Frozen SHA: ${SHA}
Model: ${MODEL}

ISOLATION: use only delimited files. Hidden assertions/scorer, prior outputs, author audit, prior conversations, repository map, and browsing are unavailable.
`];
for(const p of inputs){
 const t=frozen(p);manifest.push({path:p,sha256:sha256(t),bytes:Buffer.byteLength(t)});
 chunks.push('\n===== BEGIN PERMITTED FILE: '+p+' =====\n'+t+'\n===== END PERMITTED FILE: '+p+' =====\n');
}
const prompt=frozen(promptPath);manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push('\n===== BEGIN GOVERNING PROMPT =====\n'+prompt+'\n===== END GOVERNING PROMPT =====\n');
const packet=chunks.join(''),packetHash=sha256(packet);
fs.writeFileSync('out/exp018/'+RUN+'_PACKET.txt',packet);
fs.writeFileSync('out/exp018/'+RUN+'_INPUT_MANIFEST.json',JSON.stringify(manifest,null,2)+'\n');
if(DRY){
 const d={run:RUN,dry_run:true,qualification_sha:SHA,model:MODEL,packet_sha256:packetHash,input_manifest:manifest};
 fs.writeFileSync('out/exp018/DRY_RUN.json',JSON.stringify(d,null,2)+'\n');console.log(JSON.stringify(d));process.exit(0);
}
const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:32768,temperature:0.15,thinkingConfig:{thinkingLevel:'HIGH'}}};
const url='https://generativelanguage.googleapis.com/v1beta/models/'+MODEL+':generateContent';
let status=0,responseText='',attempts=0;
for(let i=0;i<2;i++){
 attempts=i+1;
 const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});
 status=res.status;responseText=await res.text();
 if(res.ok)break;
 if(status===429)break;
 if(i===0&&[500,502,503,504].includes(status)){await new Promise(r=>setTimeout(r,20000));continue;}
 break;
}
fs.writeFileSync('out/exp018/'+RUN+'_API_RESPONSE.json',responseText);
const meta={experiment:'018',run:RUN,model:MODEL,qualification_sha:SHA,workflow_run_id:process.env.GITHUB_RUN_ID||null,workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,input_manifest:manifest,packet_sha256:packetHash,api_attempts:attempts,http_status:status};
if(!(status>=200&&status<300)){fs.writeFileSync('out/exp018/METADATA.json',JSON.stringify({...meta,semantic_status:'PROVIDER_FAILURE'},null,2)+'\n');throw new Error('Gemini HTTP '+status);}
const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
fs.writeFileSync('out/exp018/COLD_REPORT_RAW.txt',raw+'\n');
let jt=raw.replace(/^\`\`\`(?:json)?\s*/i,'').replace(/\s*\`\`\`$/,'');const a=jt.indexOf('{'),b=jt.lastIndexOf('}');if(a>=0&&b>=a)jt=jt.slice(a,b+1);
let parsed;try{parsed=JSON.parse(jt);}catch(e){fs.writeFileSync('out/exp018/METADATA.json',JSON.stringify({...meta,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(raw)},null,2)+'\n');throw e;}
fs.writeFileSync('out/exp018/PARSED_REPORT.json',JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync('out/exp018/METADATA.json',JSON.stringify({...meta,semantic_status:'FROZEN',report_sha256:sha256(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({run:RUN,status,attempts,packet_sha256:packetHash,report_sha256:sha256(raw)}));
