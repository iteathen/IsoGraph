import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const QUALIFICATION_SHA = '30d9b0f0a84cb6005fae1d8f82b1777fd24c0215';
const CLAUDE_BRANCH = 'origin/experiment/004-cold-results-claude';
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const API_KEY = process.env.GEMINI_API_KEY;
const RUN = process.env.RUN_ID;
if (!API_KEY) throw new Error('GEMINI_API_KEY unavailable');
if (!RUN) throw new Error('RUN_ID unavailable');

const runs = {
  'RUN-A': {
    prompt: 'experiments/004/COLD_PHASE_A_PROMPT_004_DRAFT_0_15.md',
    inputs: [
      'CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md',
      'experiments/004/PHASE_A_CASES_004.axh',
      'experiments/004/Q004_07_NAMESPACE_A.axh',
      'experiments/004/Q004_07_NAMESPACE_B.axh'
    ],
    reportRef: CLAUDE_BRANCH,
    report: 'experiments/004/cold-results/claude/RUN-A_RAW_FRAGMENT_001.txt'
  },
  'RUN-S01': {
    prompt: 'experiments/004/COLD_Q004_S01_PROMPT.md',
    inputs: [
      'CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md',
      'experiments/004/Q004_S01_LEGAL_REFERENCE_BINDING.isg',
      'experiments/004/Q004_S01_INVALID_EDGE_BINDING.isg',
      'experiments/004/Q004_S01_INVALID_DECLARATIVE_BINDING.isg'
    ],
    reportRef: CLAUDE_BRANCH,
    report: 'experiments/004/cold-results/claude/RUN-S01_COLD_CLAUDE_001.md'
  },
  'RUN-S02': {
    prompt: 'experiments/004/COLD_Q004_S02_PROMPT.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S02_RULE_SPLICE.isg'],
    reportRef: CLAUDE_BRANCH,
    report: 'experiments/004/cold-results/claude/RUN-S02_COLD_CLAUDE_001.md'
  },
  'RUN-S03': {
    prompt: 'experiments/004/COLD_Q004_S03_PROMPT.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S03_VARIABLE_OWNERSHIP.isg'],
    reportRef: CLAUDE_BRANCH,
    report: 'experiments/004/cold-results/claude/RUN-S03_COLD_CLAUDE_001.md'
  },
  'RUN-S06': {
    prompt: 'experiments/004/COLD_Q004_S06_PROMPT.md',
    inputs: [
      'CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md',
      'experiments/004/Q004_S06_PARSE_01.isg','experiments/004/Q004_S06_PARSE_02.isg','experiments/004/Q004_S06_PARSE_03.isg',
      'experiments/004/Q004_S06_PARSE_04.isg','experiments/004/Q004_S06_PARSE_05.isg','experiments/004/Q004_S06_PARSE_06.isg'
    ],
    reportRef: CLAUDE_BRANCH,
    report: 'experiments/004/cold-results/claude/RUN-S06_COLD_CLAUDE_001.md'
  },
  'RUN-S07': {
    prompt: 'experiments/004/COLD_Q004_S07_PROMPT.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S07_NAC_INERT.isg','experiments/004/Q004_S07_NAC_MATCHER.isg','experiments/004/Q004_S07_NAC_FORBIDDEN.isg']
  },
  'RUN-S04': {
    prompt: 'experiments/004/COLD_Q004_S04_PROMPT.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S04_TWO_STAGE_RESIDUAL.isg']
  },
  'RUN-S05': {
    prompt: 'experiments/004/COLD_Q004_S05_PROMPT.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S05_FACTOR_STAGE_INDEX.isg']
  },
  'RUN-S08': {
    prompt: 'experiments/004/COLD_Q004_S08_PROMPT.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S08_SERIALIZER_SCOPE.isg']
  },
  'RUN-B': {
    prompt: 'experiments/004/COLD_PHASE_B_REWRITE_PROMPT_004_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/PHASE_B_REWRITE_CASES_004.axh']
  },
  'RUN-C1': {
    prompt: 'experiments/004/COLD_PHASE_C_PROMPT_004_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/004/PHASE_C_COMPARISON_CASES_004.axh']
  },
  'RUN-C2': {
    prompt: 'experiments/004/COLD_PHASE_C_NEGATIVE_INDEX_PROMPT_004_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/004/PHASE_C_NEGATIVE_INDEX_CASES_004.axh']
  },
  'RUN-D09': {
    prompt: 'experiments/004/COLD_Q004_09_PROMPT_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_09_DECOMPOSITION_CHEAT_004.axh']
  },
  'RUN-D10': {
    prompt: 'experiments/004/COLD_Q004_10_PROMPT_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/004/Q004_10_EXTRACTION_FREEZE_004.axh']
  },
  'RUN-D16': {
    prompt: 'experiments/004/COLD_Q004_16_PROMPT_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_CLASS_SCHEMA_CONTRACT_006.md','experiments/004/Q004_16_CLASS_NONVACUITY_004.axh']
  },
  'RUN-D18': {
    prompt: 'experiments/004/COLD_Q004_18_PROMPT_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_18_SOURCE_AMBIGUITY_004.axh']
  },
  'RUN-D19': {
    prompt: 'experiments/004/COLD_Q004_19_PROMPT_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/003/STRUCTURAL_CLASS_SCHEMA_CONTRACT_006.md','experiments/004/Q004_19_NOVEL_CLASS_004.axh']
  },
  'RUN-D20S': {
    prompt: 'experiments/004/COLD_Q004_20_STRUCTURE_ONLY_PROMPT_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_20_STRUCTURE_CORPUS_004.axh']
  },
  'RUN-D20L': {
    prompt: 'experiments/004/COLD_Q004_20_LABEL_ASSISTED_PROMPT_DRAFT_0_15.md',
    inputs: ['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_20_STRUCTURE_CORPUS_004.axh','experiments/004/Q004_20_LABEL_ASSIST_004.axh']
  }
};

const cfg = runs[RUN];
if (!cfg) throw new Error(`Unknown verifier run ${RUN}`);

function gitShow(ref, path) {
  return execFileSync('git', ['show', `${ref}:${path}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

const forbidden = ['ASSERTIONS_004.json','SCORING','QUALIFICATION_LEDGER','RESULTS_004.md','CONSTRUCTION_AUDIT'];
for (const p of [...cfg.inputs, cfg.prompt]) {
  if (forbidden.some(x => p.includes(x))) throw new Error(`Forbidden verifier input mapped: ${p}`);
}

const coldReport = cfg.reportRef
  ? gitShow(cfg.reportRef, cfg.report)
  : fs.readFileSync(`experiments/004/cold-results/gemini/raw/${RUN}/COLD_REPORT.txt`, 'utf8');

const sections = [];
sections.push(`ISOGRAPH EXPERIMENT 004 — INDEPENDENT SCORER-BLIND STRUCTURAL VERIFIER\nRun: ${RUN}\nSemantic authority source: iteathen/IsoGraph @ ${QUALIFICATION_SHA}\nModel: ${MODEL}\n\nVERIFIER ISOLATION\nYou are not the cold decoder and you are not a scorer. You receive the original cold inputs plus the already-frozen cold report. You do NOT receive hidden assertions, expected answers, scoring reports, qualification ledgers, prior verifier outputs, or external reviews. Do not browse or use outside material. Do not repair the frozen report.\n\nTASK\nCheck the frozen report's explicit structural claims against the supplied native fixtures and governing authority. Verify obligations rather than merely agreeing with conclusions. For every material claim, mapping, witness, separating certificate, residual/cut accounting, rewrite result, parser/ownership result, or retrieval result that the frozen report actually makes, classify it as VERIFIED, FAILED, INCOMPLETE/UNKNOWN, or RESOURCE_LIMIT. Give exact reasons for failures. Check ordered-incidence position, scope nesting, occurrence multiplicity, stable-label rigidity/mappability, binding ownership, negative/NAC conditions, residual/cut reconstruction, and stage/view restrictions where relevant. A claimed negative requires a valid separating certificate/invariant or complete search. Do not invent optimality/minimality when no frozen metric/partial order supports it. Preserve multiple valid mappings where relevant.\n\nFor RUN-A specifically, the owner accepted an abbreviated cold summary. Verify only claims actually present in that frozen summary; do not reconstruct omitted cold answers.\n\nFinish with a concise overall verifier disposition: VERIFIED / VERIFIED_WITH_NON_MATERIAL_ISSUES / PARTIAL / FAILED / UNKNOWN, and list every failed or unresolved obligation.\n`);
for (const p of cfg.inputs) {
  sections.push(`\n===== BEGIN ORIGINAL PERMITTED FILE: ${p} =====\n${gitShow(QUALIFICATION_SHA, p)}\n===== END ORIGINAL PERMITTED FILE: ${p} =====\n`);
}
sections.push(`\n===== BEGIN ORIGINAL GOVERNING COLD PROMPT: ${cfg.prompt} =====\n${gitShow(QUALIFICATION_SHA, cfg.prompt)}\n===== END ORIGINAL GOVERNING COLD PROMPT =====\n`);
sections.push(`\n===== BEGIN FROZEN COLD REPORT: ${RUN} =====\n${coldReport}\n===== END FROZEN COLD REPORT =====\n`);
const packet = sections.join('');

fs.mkdirSync('out', { recursive: true });
fs.writeFileSync(`out/${RUN}_VERIFIER_PACKET.txt`, packet);

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
  console.log(`${RUN}: HTTP ${status}; retrying in ${delay / 1000}s`);
  await sleep(delay);
}
fs.writeFileSync(`out/${RUN}_VERIFIER_API_RESPONSE.json`, responseText);
if (!(status >= 200 && status < 300)) {
  console.error(`${RUN}: Gemini verifier failed HTTP ${status}: ${responseText.slice(0, 3000)}`);
  process.exit(1);
}
const data = JSON.parse(responseText);
const report = (data.candidates?.[0]?.content?.parts || []).filter(p => !p.thought).map(p => p.text || '').join('');
if (!report.trim()) {
  console.error(`${RUN}: empty verifier report; finishReason=${data.candidates?.[0]?.finishReason}`);
  process.exit(1);
}
fs.writeFileSync(`out/${RUN}_VERIFIER_REPORT.txt`, report);
const meta = {
  run: RUN,
  model: MODEL,
  qualification_sha: QUALIFICATION_SHA,
  verifier_harness_sha: process.env.GITHUB_SHA,
  workflow_run_id: process.env.GITHUB_RUN_ID,
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
fs.writeFileSync(`out/${RUN}_VERIFIER_METADATA.json`, JSON.stringify(meta, null, 2) + '\n');
console.log(JSON.stringify(meta));
