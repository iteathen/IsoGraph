import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const RUN = 'RUN-EXP009';
const SHA = process.env.GITHUB_SHA;
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const DRY = process.env.ISOGRAPH_COLD_DRY_RUN === '1';
const API_KEY = process.env.GEMINI_API_KEY;

if (!SHA) throw new Error('GITHUB_SHA unavailable');
if (!DRY && !API_KEY) throw new Error('GEMINI_API_KEY unavailable');

const inputs = [
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md',
  'experiments/009/QU_NEI_CASES.md'
];
const promptPath = 'experiments/009/COLD_PROMPT.md';
const forbidden = [
  'hidden/',
  'ASSERTIONS',
  'score-exp009',
  'AUTHORING_AUDIT',
  'QUALIFICATION_REVIEW',
  'SCORE',
  'prior output'
];

function frozen(p) {
  return execFileSync('git', ['show', `${SHA}:${p}`], {
    encoding: 'utf8',
    maxBuffer: 128 * 1024 * 1024
  });
}
function sha256(t) {
  return crypto.createHash('sha256').update(t).digest('hex');
}

fs.mkdirSync('out/exp009', { recursive: true });

for (const p of [...inputs, promptPath]) {
  if (forbidden.some(x => p.toLowerCase().includes(x.toLowerCase()))) {
    throw new Error(`Forbidden cold input path: ${p}`);
  }
  frozen(p);
}

const cases = frozen('experiments/009/QU_NEI_CASES.md');
for (let i = 1; i <= 18; i++) {
  const id = `C${String(i).padStart(2, '0')}`;
  if (!cases.includes(`## ${id} `)) throw new Error(`Missing public case ${id}`);
}

const manifest = [];
const chunks = [
  `ISOGRAPH EXPERIMENT 009 — JOINT QU + NEI COLD QUALIFICATION\n` +
  `Run: ${RUN}\nFrozen repository SHA: ${SHA}\nModel: ${MODEL}\n\n` +
  `ISOLATION: use only the files delimited below. Hidden assertions, scorer source, authoring audit, prior outputs, repository map, agent guidance, historical experiment reports, and external browsing are unavailable.\n`
];

for (const p of inputs) {
  const text = frozen(p);
  manifest.push({ path: p, sha256: sha256(text), bytes: Buffer.byteLength(text) });
  chunks.push(`\n===== BEGIN PERMITTED FILE: ${p} =====\n${text}\n===== END PERMITTED FILE: ${p} =====\n`);
}
const prompt = frozen(promptPath);
manifest.push({ path: promptPath, sha256: sha256(prompt), bytes: Buffer.byteLength(prompt) });
chunks.push(`\n===== BEGIN GOVERNING PROMPT =====\n${prompt}\n===== END GOVERNING PROMPT =====\n`);

const packet = chunks.join('');
const packetHash = sha256(packet);
fs.writeFileSync(`out/exp009/${RUN}_PACKET.txt`, packet);
fs.writeFileSync(`out/exp009/${RUN}_INPUT_MANIFEST.json`, JSON.stringify(manifest, null, 2) + '\n');

if (DRY) {
  const dry = {
    run: RUN,
    dry_run: true,
    qualification_sha: SHA,
    model: MODEL,
    packet_sha256: packetHash,
    input_manifest: manifest
  };
  fs.writeFileSync('out/exp009/DRY_RUN.json', JSON.stringify(dry, null, 2) + '\n');
  console.log(JSON.stringify(dry));
  process.exit(0);
}

const request = {
  contents: [{ role: 'user', parts: [{ text: packet }] }],
  generationConfig: {
    candidateCount: 1,
    maxOutputTokens: 32768,
    temperature: 0.15,
    thinkingConfig: { thinkingLevel: 'HIGH' }
  }
};

const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
let responseText = '';
let status = 0;
let attempts = 0;

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
  if (status === 429) break;
  if (i === 0 && [500, 502, 503, 504].includes(status)) {
    await new Promise(r => setTimeout(r, 20000));
    continue;
  }
  break;
}

fs.writeFileSync(`out/exp009/${RUN}_API_RESPONSE.json`, responseText);
const baseMeta = {
  experiment: '009',
  run: RUN,
  model: MODEL,
  qualification_sha: SHA,
  workflow_run_id: process.env.GITHUB_RUN_ID || null,
  workflow_attempt: process.env.GITHUB_RUN_ATTEMPT || null,
  input_manifest: manifest,
  packet_sha256: packetHash,
  api_attempts: attempts,
  http_status: status,
  isolation: 'cold-visible packet only; runner never opens hidden assertions or scorer material'
};

if (!(status >= 200 && status < 300)) {
  fs.writeFileSync('out/exp009/METADATA.json', JSON.stringify({ ...baseMeta, semantic_status: 'PROVIDER_FAILURE' }, null, 2) + '\n');
  throw new Error(`${RUN}: Gemini failed HTTP ${status}`);
}

const data = JSON.parse(responseText);
const raw = (data.candidates?.[0]?.content?.parts || [])
  .filter(p => !p.thought)
  .map(p => p.text || '')
  .join('')
  .trim();

fs.writeFileSync('out/exp009/COLD_REPORT_RAW.txt', raw + '\n');

let jsonText = raw.replace(/^\`\`\`(?:json)?\s*/i, '').replace(/\s*\`\`\`$/, '');
const first = jsonText.indexOf('{');
const last = jsonText.lastIndexOf('}');
if (first >= 0 && last >= first) jsonText = jsonText.slice(first, last + 1);

let parsed;
try {
  parsed = JSON.parse(jsonText);
} catch (err) {
  fs.writeFileSync('out/exp009/METADATA.json', JSON.stringify({
    ...baseMeta,
    semantic_status: 'MALFORMED_OUTPUT',
    report_sha256: sha256(raw),
    finish_reason: data.candidates?.[0]?.finishReason ?? null,
    usage: data.usageMetadata ?? null
  }, null, 2) + '\n');
  throw err;
}

fs.writeFileSync('out/exp009/PARSED_REPORT.json', JSON.stringify(parsed, null, 2) + '\n');
fs.writeFileSync('out/exp009/METADATA.json', JSON.stringify({
  ...baseMeta,
  semantic_status: 'FROZEN',
  report_sha256: sha256(raw),
  finish_reason: data.candidates?.[0]?.finishReason ?? null,
  usage: data.usageMetadata ?? null
}, null, 2) + '\n');

console.log(JSON.stringify({
  run: RUN,
  status,
  attempts,
  packet_sha256: packetHash,
  report_sha256: sha256(raw)
}));
