import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const RUN = 'RUN-Q006-R4';
const SHA = process.env.GITHUB_SHA;
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const API_KEY = process.env.GEMINI_API_KEY;
if (!SHA) throw new Error('GITHUB_SHA unavailable');
if (!API_KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs = [
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md',
  'experiments/006/DP_PROOF_ALPHA.md',
  'experiments/006/DP_PROOF_BETA.md'
];
const promptPath = 'experiments/006/COLD_Q006_R4_PROMPT.md';
const forbidden = ['Q006_ASSERTIONS','DP_HIDDEN_ORACLE','SCORE','R2_REVIEW','R3_REVIEW','REPRODUCTION'];

function frozen(p) {
  return execFileSync('git', ['show', `${SHA}:${p}`], { encoding: 'utf8', maxBuffer: 128*1024*1024 });
}
function sha256(t) { return crypto.createHash('sha256').update(t).digest('hex'); }

fs.mkdirSync('out/q006r4', { recursive: true });
for (const p of [...inputs,promptPath]) {
  if (forbidden.some(x => p.includes(x))) throw new Error(`Forbidden cold input: ${p}`);
  frozen(p);
}

const alpha = frozen('experiments/006/DP_PROOF_ALPHA.md');
const beta = frozen('experiments/006/DP_PROOF_BETA.md');
for (const id of ['A01','A02','A03','A04','A05','A06','A07','A08','A09','A10']) if (!alpha.includes(id)) throw new Error(`Missing ${id}`);
for (const id of ['B01','B02','B03','B04','B05','B06','B07','B08','B09','B10']) if (!beta.includes(id)) throw new Error(`Missing ${id}`);
const leakage = /\b(Brouwer|Sperner|Ivanov|Harper|Rutgers|arXiv)\b/i;
if (leakage.test(alpha) || leakage.test(beta)) throw new Error('Historical identity leaked');

const manifest=[];
const chunks=[`ISOGRAPH EXPERIMENT 006 R4 — FOCUSED DISCOVERY QUALIFICATION\nRun: ${RUN}\nFrozen SHA: ${SHA}\nModel: ${MODEL}\n\nISOLATION: use only delimited files; no browsing, prior outputs, scorer assertions, or historical oracle.\n`];
for (const p of inputs) {
  const t=frozen(p); manifest.push({path:p,sha256:sha256(t),bytes:Buffer.byteLength(t)});
  chunks.push(`\n===== BEGIN PERMITTED FILE: ${p} =====\n${t}\n===== END PERMITTED FILE: ${p} =====\n`);
}
const prompt=frozen(promptPath); manifest.push({path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push(`\n===== BEGIN GOVERNING PROMPT =====\n${prompt}\n===== END GOVERNING PROMPT =====\n`);
const packet=chunks.join('');
fs.writeFileSync(`out/q006r4/${RUN}_PACKET.txt`,packet);
fs.writeFileSync(`out/q006r4/${RUN}_INPUT_MANIFEST.json`,JSON.stringify(manifest,null,2)+'\n');

const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:24576,temperature:0.2,thinkingConfig:{thinkingLevel:'HIGH'}}};
const url=`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
let responseText='', status=0, attempts=0;
for (let i=0;i<2;i++) {
  attempts=i+1;
  const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':API_KEY},body:JSON.stringify(request)});
  status=res.status; responseText=await res.text();
  if (res.ok) break;
  if (status===429) break;
  if (i===0 && [500,502,503,504].includes(status)) { await new Promise(r=>setTimeout(r,20000)); continue; }
  break;
}
fs.writeFileSync(`out/q006r4/${RUN}_API_RESPONSE.json`,responseText);
const meta={run:RUN,model:MODEL,qualification_sha:SHA,workflow_run_id:process.env.GITHUB_RUN_ID||null,workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,input_manifest:manifest,packet_sha256:sha256(packet),api_attempts:attempts,http_status:status};
if (!(status>=200&&status<300)) {
  fs.writeFileSync(`out/q006r4/${RUN}_METADATA.json`,JSON.stringify({...meta,semantic_status:'PROVIDER_FAILURE'},null,2)+'\n');
  throw new Error(`${RUN}: Gemini failed HTTP ${status}`);
}
const data=JSON.parse(responseText);
const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
fs.writeFileSync(`out/q006r4/${RUN}_COLD_REPORT_RAW.txt`,raw+'\n');
let jt=raw.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
const a=jt.indexOf('{'), b=jt.lastIndexOf('}'); if(a>=0&&b>=a) jt=jt.slice(a,b+1);
let parsed;
try { parsed=JSON.parse(jt); } catch(e) {
  fs.writeFileSync(`out/q006r4/${RUN}_METADATA.json`,JSON.stringify({...meta,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
  throw e;
}
fs.writeFileSync(`out/q006r4/${RUN}_PARSED_REPORT.json`,JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(`out/q006r4/${RUN}_METADATA.json`,JSON.stringify({...meta,semantic_status:'FROZEN',report_sha256:sha256(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({run:RUN,status,attempts,packet_sha256:sha256(packet),report_sha256:sha256(raw)}));
