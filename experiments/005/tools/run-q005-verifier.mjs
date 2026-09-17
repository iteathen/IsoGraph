import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const QUALIFICATION_SHA = 'fa733d533cd683c5064c4f31fa6c083fa3aed21d';
const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-lite-latest';
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs = [
  'CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md',
  'experiments/005/Q005_OBLIGATION_SUFFICIENCY.isg'
];
const promptPath = 'experiments/005/COLD_Q005_PROMPT.md';
const reportPath = 'experiments/005/cold-results/RUN-Q005/COLD_REPORT.txt';
const forbidden = ['Q005_ASSERTIONS', 'SCORING', 'QUALIFICATION_LEDGER', 'FINAL_REVIEW'];
for (const p of [...inputs, promptPath, reportPath]) {
  if (forbidden.some(x => p.includes(x))) throw new Error(`Forbidden verifier input mapped: ${p}`);
}

function frozen(path) {
  return execFileSync('git', ['show', `${QUALIFICATION_SHA}:${path}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

const coldReport = fs.readFileSync(reportPath, 'utf8');
const sections = [
  `ISOGRAPH EXPERIMENT 005 — INDEPENDENT SCORER-BLIND VERIFIER\n` +
  `Frozen qualification source: iteathen/IsoGraph @ ${QUALIFICATION_SHA}\n` +
  `Model: ${MODEL}\n\n` +
  `ISOLATION\n` +
  `You receive only the original permitted cold inputs plus the already-frozen cold report. ` +
  `You do NOT receive hidden scorer assertions, expected answers, scoring ledgers, author reviews, or prior verifier outputs. ` +
  `Do not browse or use outside material. Do not repair the frozen report.\n\n` +
  `TASK\n` +
  `Verify every material structural claim made by the frozen report against Draft 0.16 and the fixture. ` +
  `Check especially: dependency-closed claim obligations; existential versus complete witness-family burden; ` +
  `the exact S8 automorphism-family claim in Q005-01; context-local quotient validity; factorization-node versus factorization-space scope; ` +
  `proof-method neutrality without loss of required evidence; certificate-backed negatives; weak versus strong embedding; ` +
  `pairwise versus source reconstruction; and rejection of a proof profile that omits a real V0 stable-label dependency. ` +
  `A negative claim requires a valid separating certificate/invariant or complete search. ` +
  `A complete-family claim requires verified coverage, not merely several examples. ` +
  `Do not infer that canonicalization is required unless the frozen claim actually requires canonical output.\n\n` +
  `For each Q005 case classify every material claim as VERIFIED, FAILED, INCOMPLETE/UNKNOWN, or RESOURCE_LIMIT. ` +
  `Finish with overall disposition VERIFIED / VERIFIED_WITH_NON_MATERIAL_ISSUES / PARTIAL / FAILED / UNKNOWN and list every unresolved obligation.\n`
];
for (const p of inputs) {
  sections.push(`\n===== BEGIN ORIGINAL PERMITTED FILE: ${p} =====\n${frozen(p)}\n===== END ORIGINAL PERMITTED FILE: ${p} =====\n`);
}
sections.push(`\n===== BEGIN ORIGINAL GOVERNING COLD PROMPT: ${promptPath} =====\n${frozen(promptPath)}\n===== END ORIGINAL GOVERNING COLD PROMPT =====\n`);
sections.push(`\n===== BEGIN FROZEN COLD REPORT =====\n${coldReport}\n===== END FROZEN COLD REPORT =====\n`);
const packet = sections.join('');

fs.mkdirSync('out', { recursive: true });
fs.writeFileSync('out/RUN-Q005_VERIFIER_PACKET.txt', packet);
const request = {
  contents: [{ role: 'user', parts: [{ text: packet }] }],
  generationConfig: { candidateCount: 1, maxOutputTokens: 32768, thinkingConfig: { thinkingLevel: 'HIGH' } }
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
  console.log(`RUN-Q005 verifier: HTTP ${status}; retrying in ${delay / 1000}s`);
  await sleep(delay);
}
fs.writeFileSync('out/RUN-Q005_VERIFIER_API_RESPONSE.json', responseText);
if (!(status >= 200 && status < 300)) throw new Error(`Verifier failed HTTP ${status}: ${responseText.slice(0, 2000)}`);
const data = JSON.parse(responseText);
const report = (data.candidates?.[0]?.content?.parts || []).filter(p => !p.thought).map(p => p.text || '').join('');
if (!report.trim()) throw new Error(`Empty verifier report; finishReason=${data.candidates?.[0]?.finishReason}`);
fs.writeFileSync('out/RUN-Q005_VERIFIER_REPORT.txt', report);
const meta = {
  run: 'RUN-Q005', model: MODEL, qualification_sha: QUALIFICATION_SHA,
  workflow_sha: process.env.GITHUB_SHA, workflow_run_id: process.env.GITHUB_RUN_ID,
  packet_sha256: crypto.createHash('sha256').update(packet).digest('hex'),
  frozen_report_sha256: crypto.createHash('sha256').update(coldReport).digest('hex'),
  verifier_report_sha256: crypto.createHash('sha256').update(report).digest('hex'),
  finish_reason: data.candidates?.[0]?.finishReason ?? null,
  prompt_tokens: data.usageMetadata?.promptTokenCount ?? null,
  output_tokens: data.usageMetadata?.candidatesTokenCount ?? null,
  thoughts_tokens: data.usageMetadata?.thoughtsTokenCount ?? null,
  total_tokens: data.usageMetadata?.totalTokenCount ?? null,
  api_attempts: attempts,
  scorer_blind: true
};
fs.writeFileSync('out/RUN-Q005_VERIFIER_METADATA.json', JSON.stringify(meta, null, 2) + '\n');
console.log(JSON.stringify(meta));
