// HISTORICAL REPRODUCER ONLY.
// Frozen Draft 0.15 Experiment 004 Gemini cold-run helper recovered from
// experiment/004-gemini-cold-bulk. It is not a current qualification route.
// Current resource/storage policy and current semantic authority supersede the
// branch workflows that originally invoked it. Do not reactivate those workflows
// without a new versioned qualification plan and current storage-policy conformance.

import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const runs = {
  'RUN-S07': ['experiments/004/COLD_Q004_S07_PROMPT.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S07_NAC_INERT.isg','experiments/004/Q004_S07_NAC_MATCHER.isg','experiments/004/Q004_S07_NAC_FORBIDDEN.isg']],
  'RUN-S04': ['experiments/004/COLD_Q004_S04_PROMPT.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S04_TWO_STAGE_RESIDUAL.isg']],
  'RUN-S05': ['experiments/004/COLD_Q004_S05_PROMPT.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S05_FACTOR_STAGE_INDEX.isg']],
  'RUN-S08': ['experiments/004/COLD_Q004_S08_PROMPT.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_S08_SERIALIZER_SCOPE.isg']],
  'RUN-B': ['experiments/004/COLD_PHASE_B_REWRITE_PROMPT_004_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/PHASE_B_REWRITE_CASES_004.axh']],
  'RUN-C1': ['experiments/004/COLD_PHASE_C_PROMPT_004_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/004/PHASE_C_COMPARISON_CASES_004.axh']],
  'RUN-C2': ['experiments/004/COLD_PHASE_C_NEGATIVE_INDEX_PROMPT_004_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/004/PHASE_C_NEGATIVE_INDEX_CASES_004.axh']],
  'RUN-D09': ['experiments/004/COLD_Q004_09_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_09_DECOMPOSITION_CHEAT_004.axh']],
  'RUN-D10': ['experiments/004/COLD_Q004_10_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/004/Q004_10_EXTRACTION_FREEZE_004.axh']],
  'RUN-D16': ['experiments/004/COLD_Q004_16_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_CLASS_SCHEMA_CONTRACT_006.md','experiments/004/Q004_16_CLASS_NONVACUITY_004.axh']],
  'RUN-D17': ['experiments/004/COLD_Q004_17_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_17_NATIVE_RECORDS_004.axh']],
  'RUN-D17B': ['experiments/004/COLD_Q004_17B_PROMPT.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_17B_NATIVE_RECORDS_004.isg']],
  'RUN-D18': ['experiments/004/COLD_Q004_18_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_18_SOURCE_AMBIGUITY_004.axh']],
  'RUN-D19': ['experiments/004/COLD_Q004_19_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/003/STRUCTURAL_COMPARISON_PROTOCOL_006.md','experiments/003/STRUCTURAL_CLASS_SCHEMA_CONTRACT_006.md','experiments/004/Q004_19_NOVEL_CLASS_004.axh']],
  'RUN-D20S': ['experiments/004/COLD_Q004_20_STRUCTURE_ONLY_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_20_STRUCTURE_CORPUS_004.axh']],
  'RUN-D20L': ['experiments/004/COLD_Q004_20_LABEL_ASSISTED_PROMPT_DRAFT_0_15.md',['CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md','experiments/004/Q004_20_STRUCTURE_CORPUS_004.axh','experiments/004/Q004_20_LABEL_ASSIST_004.axh']]
};

const run = process.env.RUN_ID;
const entry = runs[run];
if (!entry) throw new Error(`Unknown RUN_ID ${run}`);
const [promptPath, inputFiles] = entry;
const sha = process.env.QUALIFICATION_SHA;
const model = process.env.GEMINI_MODEL;
const key = process.env.GEMINI_API_KEY;
if (!sha || !model || !key) throw new Error('Required environment missing');

const forbidden = ['ASSERTIONS_004.json','RESULTS_004.md','CONSTRUCTION_AUDIT'];
for (const p of [...inputFiles,promptPath]) {
  if (forbidden.some(x => p.includes(x))) throw new Error(`Forbidden cold input mapped: ${p}`);
}

function frozen(path) {
  return execFileSync('git',['show',`${sha}:${path}`],{encoding:'utf8',maxBuffer:64*1024*1024});
}

fs.mkdirSync('out',{recursive:true});
const chunks = [
  `ISOGRAPH EXPERIMENT 004 — GEMINI ISOLATED COLD RUN\n` +
  `Run: ${run}\nFrozen source: iteathen/IsoGraph @ ${sha}\nModel: ${model}\n\n` +
  `ISOLATION REQUIREMENT\n` +
  `You receive only the exact cold inputs authorized for this run. Do not browse or use external sources. ` +
  `Do not infer from other Experiment 004 runs. Follow the embedded governing prompt exactly. ` +
  `Return the COMPLETE raw report requested by that prompt; do not return only a summary. ` +
  `Preserve every genuine ambiguity, difficulty, mapping, certificate, and requested verdict.\n`
];
for (const p of inputFiles) {
  chunks.push(`\n===== BEGIN PERMITTED FILE: ${p} =====\n${frozen(p)}\n===== END PERMITTED FILE: ${p} =====\n`);
}
chunks.push(`\n===== BEGIN GOVERNING COLD PROMPT: ${promptPath} =====\n${frozen(promptPath)}\n===== END GOVERNING COLD PROMPT =====\n`);
const packet = chunks.join('');
fs.writeFileSync(`out/${run}_PACKET.txt`,packet);

const request = {
  contents:[{role:'user',parts:[{text:packet}]}],
  generationConfig:{candidateCount:1,maxOutputTokens:65536,thinkingConfig:{thinkingLevel:'HIGH'}}
};
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
const sleep = ms => new Promise(r => setTimeout(r,ms));
let responseText='';
let status=0;
let attempts=0;
for (let i=0;i<6;i++) {
  attempts=i+1;
  const res = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify(request)});
  status=res.status;
  responseText=await res.text();
  if (res.ok) break;
  if (![429,500,502,503,504].includes(status)) break;
  const delay=Math.min(240000,15000*(2**i));
  console.log(`${run}: HTTP ${status}; retrying in ${delay/1000}s`);
  await sleep(delay);
}
fs.writeFileSync(`out/${run}_API_RESPONSE.json`,responseText);
if (!(status>=200 && status<300)) {
  fs.writeFileSync(`out/${run}_FAILURE.txt`,`Gemini HTTP ${status}\n${responseText}\n`);
  throw new Error(`${run}: Gemini failed HTTP ${status}`);
}

const data=JSON.parse(responseText);
const report=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('');
if (!report.trim()) {
  fs.writeFileSync(`out/${run}_FAILURE.txt`,`Empty final report. finishReason=${data.candidates?.[0]?.finishReason ?? 'unknown'}\n`);
  throw new Error(`${run}: empty final report`);
}
fs.writeFileSync(`out/${run}_COLD_REPORT.txt`,report);
const metadata={
  run,model,qualification_sha:sha,workflow_sha:process.env.GITHUB_SHA,workflow_run_id:process.env.GITHUB_RUN_ID,
  prompt_path:promptPath,input_files:inputFiles,
  packet_sha256:crypto.createHash('sha256').update(packet).digest('hex'),
  report_sha256:crypto.createHash('sha256').update(report).digest('hex'),
  finish_reason:data.candidates?.[0]?.finishReason??null,
  prompt_tokens:data.usageMetadata?.promptTokenCount??null,
  output_tokens:data.usageMetadata?.candidatesTokenCount??null,
  thoughts_tokens:data.usageMetadata?.thoughtsTokenCount??null,
  total_tokens:data.usageMetadata?.totalTokenCount??null,
  api_attempts:attempts
};
fs.writeFileSync(`out/${run}_METADATA.json`,JSON.stringify(metadata,null,2)+'\n');
console.log(JSON.stringify(metadata));
