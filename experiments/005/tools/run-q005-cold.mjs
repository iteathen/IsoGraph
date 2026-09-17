import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const QUALIFICATION_SHA = 'fa733d533cd683c5064c4f31fa6c083fa3aed21d';
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs = [
  'CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md',
  'experiments/005/Q005_OBLIGATION_SUFFICIENCY.isg'
];
const promptPath = 'experiments/005/COLD_Q005_PROMPT.md';
const forbidden = ['Q005_ASSERTIONS', 'RESULTS', 'SCORING', 'QUALIFICATION_LEDGER', 'FINAL_REVIEW'];
for (const p of [...inputs, promptPath]) {
  if (forbidden.some(x => p.includes(x))) throw new Error(`Forbidden cold input mapped: ${p}`);
}

function frozen(path) {
  return execFileSync('git', ['show', `${QUALIFICATION_SHA}:${path}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

fs.mkdirSync('out', { recursive: true });
const chunks = [
  `ISOGRAPH EXPERIMENT 005 — ISOLATED COLD QUALIFICATION\n` +
  `Run: RUN-Q005\nFrozen source: iteathen/IsoGraph @ ${QUALIFICATION_SHA}\nModel: ${MODEL}\n\n` +
  `ISOLATION REQUIREMENT\n` +
  `You receive only the exact discovery-visible resources authorized for this run. ` +
  `Do not browse, infer from prior Experiment 005 work, or use external sources. ` +
  `Do not repair or redesign Draft 0.16. Return the complete report requested by the governing prompt.\n`
];
for (const p of inputs) {
  chunks.push(`\n===== BEGIN PERMITTED FILE: ${p} =====\n${frozen(p)}\n===== END PERMITTED FILE: ${p} =====\n`);
}
chunks.push(`\n===== BEGIN GOVERNING COLD PROMPT: ${promptPath} =====\n${frozen(promptPath)}\n===== END GOVERNING COLD PROMPT =====\n`);
const packet = chunks.join('');
fs.writeFileSync('out/RUN-Q005_PACKET.txt', packet);

const request = {
  contents: [{ role: 'user', parts: [{ text: packet }] }],
  generationConfig: { candidateCount: 1, maxOutputTokens: 65536, thinkingConfig: { thinkingLevel: 'HIGH' } }
};
const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let responseText = '', status = 0, attempts = 0;
for (let i = 0; i < 6; i++) {
  attempts = i + 1;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
    body: JSON.stringify(request)
  });
  status = res.status;
  responseText = await res.text();
  if (res.ok) break;
  if (![429, 500, 502, 503, 504].includes(status)) break;
  const delay = Math.min(240000, 15000 * (2 ** i));
  console.log(`RUN-Q005: HTTP ${status}; retrying in ${delay / 1000}s`);
  await sleep(delay);
}
fs.writeFileSync('out/RUN-Q005_API_RESPONSE.json', responseText);
if (!(status >= 200 && status < 300)) {
  fs.writeFileSync('out/RUN-Q005_FAILURE.txt', `Gemini HTTP ${status}\n${responseText}\n`);
  throw new Error(`RUN-Q005: Gemini failed HTTP ${status}`);
}

const data = JSON.parse(responseText);
const report = (data.candidates?.[0]?.content?.parts || []).filter(p => !p.thought).map(p => p.text || '').join('');
if (!report.trim()) {
  fs.writeFileSync('out/RUN-Q005_FAILURE.txt', `Empty final report. finishReason=${data.candidates?.[0]?.finishReason ?? 'unknown'}\n`);
  throw new Error('RUN-Q005: empty final report');
}
fs.writeFileSync('out/RUN-Q005_COLD_REPORT.txt', report);
const meta = {
  run: 'RUN-Q005',
  model: MODEL,
  qualification_sha: QUALIFICATION_SHA,
  workflow_sha: process.env.GITHUB_SHA,
  workflow_run_id: process.env.GITHUB_RUN_ID,
  prompt_path: promptPath,
  input_files: inputs,
  packet_sha256: crypto.createHash('sha256').update(packet).digest('hex'),
  report_sha256: crypto.createHash('sha256').update(report).digest('hex'),
  finish_reason: data.candidates?.[0]?.finishReason ?? null,
  prompt_tokens: data.usageMetadata?.promptTokenCount ?? null,
  output_tokens: data.usageMetadata?.candidatesTokenCount ?? null,
  thoughts_tokens: data.usageMetadata?.thoughtsTokenCount ?? null,
  total_tokens: data.usageMetadata?.totalTokenCount ?? null,
  api_attempts: attempts,
  isolation: 'discovery-visible-only'
};
fs.writeFileSync('out/RUN-Q005_METADATA.json', JSON.stringify(meta, null, 2) + '\n');
console.log(JSON.stringify(meta));
