import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const RUN = 'RUN-Q006';
const SHA = process.env.GITHUB_SHA;
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const API_KEY = process.env.GEMINI_API_KEY;

if (!SHA) throw new Error('GITHUB_SHA unavailable');
if (!API_KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs = [
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md',
  'experiments/006/Q006_CASES.md',
  'experiments/006/DP_PROOF_ALPHA.md',
  'experiments/006/DP_PROOF_BETA.md'
];
const promptPath = 'experiments/006/COLD_Q006_PROMPT.md';
const forbiddenColdNames = [
  'Q006_ASSERTIONS',
  'DP_HIDDEN_ORACLE',
  'score-q006',
  'RESULT',
  'SCORING',
  'FINAL_REVIEW'
];

function frozen(path) {
  return execFileSync('git', ['show', `${SHA}:${path}`], {
    encoding: 'utf8',
    maxBuffer: 128 * 1024 * 1024
  });
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function requireText(text, needle, label) {
  if (!text.includes(needle)) throw new Error(`Preflight missing ${label}: ${needle}`);
}

fs.mkdirSync('out/q006', { recursive: true });

// Deterministic preflight before the single external semantic call.
for (const p of [...inputs, promptPath]) {
  if (forbiddenColdNames.some(x => p.includes(x))) {
    throw new Error(`Forbidden scorer-only resource mapped into cold packet: ${p}`);
  }
  frozen(p);
}

const qu = frozen('extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md');
const nei = frozen('extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md');
const dp = frozen('extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md');
const alpha = frozen('experiments/006/DP_PROOF_ALPHA.md');
const beta = frozen('experiments/006/DP_PROOF_BETA.md');
const cases = frozen('experiments/006/Q006_CASES.md');
const assertions = frozen('experiments/006/Q006_ASSERTIONS.json');

requireText(qu, 'R(Q)', 'QU realization-family semantics');
requireText(qu, 'Quantifiable Unknown Isomorph (QUI)', 'QUI semantics');
requireText(qu, 'semantic unresolvedness', 'QU unresolvedness distinction');
requireText(nei, '# 9. No maximally-coarse selection rule', 'NEI coarseness rejection');
if (nei.includes('Retain the maximally coarse admissible identity partitions')) {
  throw new Error('Obsolete maximally-coarse normative rule survived into NEI candidate');
}
requireText(nei, 'absence of evidence for DISTINCT', 'NEI absence-of-distinction barrier');
requireText(dp, 'discovery priority\n    != semantic authority', 'DP constitutional boundary');
const protocolCount = (dp.match(/^## DP-\d\d\b/gm) || []).length;
if (protocolCount !== 45) throw new Error(`Expected 45 DP protocols, found ${protocolCount}`);

for (const id of ['QU-01','QU-02','QU-03','QU-04','QU-05','QU-06','QU-07','QU-08',
                  'NEI-01','NEI-02','NEI-03','NEI-04','NEI-05','NEI-06','NEI-07','NEI-08']) {
  if (!cases.includes(id)) throw new Error(`Missing semantic case ${id}`);
}
for (const id of ['A01','A02','A03','A04','A05','A06','A07','A08','A09','A10']) {
  if (!alpha.includes(id)) throw new Error(`Missing Proof Alpha step ${id}`);
}
for (const id of ['B01','B02','B03','B04','B05','B06','B07','B08','B09','B10']) {
  if (!beta.includes(id)) throw new Error(`Missing Proof Beta step ${id}`);
}
const leakage = /\b(Brouwer|Sperner|Ivanov|Harper|Rutgers|arXiv)\b/i;
if (leakage.test(alpha) || leakage.test(beta) || leakage.test(cases) || leakage.test(frozen(promptPath))) {
  throw new Error('Historical benchmark identity leaked into cold-visible corpus');
}
JSON.parse(assertions);

const manifest = [];
const chunks = [
  `ISOGRAPH EXPERIMENT 006 — INTEGRATED COLD QUALIFICATION\n` +
  `Run: ${RUN}\nFrozen repository SHA: ${SHA}\nModel: ${MODEL}\n\n` +
  `ISOLATION REQUIREMENT\n` +
  `You receive only the files delimited below. Scorer assertions, the historical proof-unification oracle, prior outputs, and external sources are unavailable. ` +
  `Do not browse, redesign the modules, or use theorem-name recognition as evidence.\n`
];

for (const p of inputs) {
  const text = frozen(p);
  manifest.push({ path: p, sha256: sha256(text), bytes: Buffer.byteLength(text) });
  chunks.push(`\n===== BEGIN PERMITTED FILE: ${p} =====\n${text}\n===== END PERMITTED FILE: ${p} =====\n`);
}
const prompt = frozen(promptPath);
manifest.push({ path: promptPath, sha256: sha256(prompt), bytes: Buffer.byteLength(prompt) });
chunks.push(`\n===== BEGIN GOVERNING COLD PROMPT: ${promptPath} =====\n${prompt}\n===== END GOVERNING COLD PROMPT =====\n`);

const packet = chunks.join('');
const packetPath = `out/q006/${RUN}_PACKET.txt`;
fs.writeFileSync(packetPath, packet);
fs.writeFileSync(`out/q006/${RUN}_INPUT_MANIFEST.json`, JSON.stringify(manifest, null, 2) + '\n');

const request = {
  contents: [{ role: 'user', parts: [{ text: packet }] }],
  generationConfig: {
    candidateCount: 1,
    maxOutputTokens: 32768,
    temperature: 0.2,
    thinkingConfig: { thinkingLevel: 'HIGH' }
  }
};

const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
let responseText = '';
let status = 0;
let attempts = 0;

// One semantic call by default. One retry is allowed only for transient 5xx failure.
for (let i = 0; i < 2; i++) {
  attempts = i + 1;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY
    },
    body: JSON.stringify(request)
  });
  status = res.status;
  responseText = await res.text();
  if (res.ok) break;
  if (status === 429) break; // Do not amplify provider rate limiting.
  if (i === 0 && [500, 502, 503, 504].includes(status)) {
    await new Promise(r => setTimeout(r, 20000));
    continue;
  }
  break;
}

fs.writeFileSync(`out/q006/${RUN}_API_RESPONSE.json`, responseText);

const baseMeta = {
  experiment: '006',
  run: RUN,
  model: MODEL,
  qualification_sha: SHA,
  workflow_run_id: process.env.GITHUB_RUN_ID || null,
  workflow_attempt: process.env.GITHUB_RUN_ATTEMPT || null,
  input_manifest: manifest,
  packet_sha256: sha256(packet),
  api_attempts: attempts,
  http_status: status,
  scorer_only_assertions_sha256: sha256(assertions),
  isolation: 'single-packet cold decoder; scorer-only resources excluded'
};

if (!(status >= 200 && status < 300)) {
  fs.writeFileSync(`out/q006/${RUN}_METADATA.json`, JSON.stringify({ ...baseMeta, semantic_status: 'PROVIDER_FAILURE' }, null, 2) + '\n');
  fs.writeFileSync(`out/q006/${RUN}_FAILURE.txt`, `Gemini HTTP ${status}\n${responseText}\n`);
  throw new Error(`${RUN}: Gemini failed HTTP ${status}`);
}

const data = JSON.parse(responseText);
const rawReport = (data.candidates?.[0]?.content?.parts || [])
  .filter(p => !p.thought)
  .map(p => p.text || '')
  .join('')
  .trim();

fs.writeFileSync(`out/q006/${RUN}_COLD_REPORT_RAW.txt`, rawReport + '\n');

let jsonText = rawReport;
if (jsonText.startsWith('```')) {
  jsonText = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
}
const firstBrace = jsonText.indexOf('{');
const lastBrace = jsonText.lastIndexOf('}');
if (firstBrace >= 0 && lastBrace >= firstBrace) jsonText = jsonText.slice(firstBrace, lastBrace + 1);

let parsed;
try {
  parsed = JSON.parse(jsonText);
} catch (err) {
  fs.writeFileSync(`out/q006/${RUN}_METADATA.json`, JSON.stringify({
    ...baseMeta,
    semantic_status: 'MALFORMED_OUTPUT',
    report_sha256: sha256(rawReport),
    finish_reason: data.candidates?.[0]?.finishReason ?? null,
    usage: data.usageMetadata ?? null
  }, null, 2) + '\n');
  fs.writeFileSync(`out/q006/${RUN}_FAILURE.txt`, `Malformed required JSON output: ${err.message}\n`);
  throw err;
}

fs.writeFileSync(`out/q006/${RUN}_PARSED_REPORT.json`, JSON.stringify(parsed, null, 2) + '\n');
fs.writeFileSync(`out/q006/${RUN}_METADATA.json`, JSON.stringify({
  ...baseMeta,
  semantic_status: 'FROZEN',
  report_sha256: sha256(rawReport),
  parsed_report_sha256: sha256(JSON.stringify(parsed)),
  finish_reason: data.candidates?.[0]?.finishReason ?? null,
  usage: data.usageMetadata ?? null
}, null, 2) + '\n');

console.log(JSON.stringify({ run: RUN, packet_sha256: sha256(packet), report_sha256: sha256(rawReport), attempts, status }));
