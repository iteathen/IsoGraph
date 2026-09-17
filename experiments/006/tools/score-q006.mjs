import fs from 'node:fs';

const OUT = 'out/q006';
const RUN = process.env.Q006_RUN || 'RUN-Q006';
const assertionsPath = 'experiments/006/Q006_ASSERTIONS.json';
const reportPath = `${OUT}/${RUN}_PARSED_REPORT.json`;
const scorePath = `${OUT}/${RUN}_SCORE.json`;
const scoreMdPath = `${OUT}/${RUN}_SCORE.md`;

fs.mkdirSync(OUT, { recursive: true });
const assertions = JSON.parse(fs.readFileSync(assertionsPath, 'utf8'));

function norm(v) {
  const value = String(v ?? '')
    .trim()
    .toUpperCase()
    .replace(/\s*,\s*/g, ',');
  // RUN-Q006 exposed this as a scorer-only singular/plural spelling mismatch.
  if (value === 'SEMANTIC_PRESERVED_UNDER_ALPHA_RENAMING') {
    return 'SEMANTICS_PRESERVED_UNDER_ALPHA_RENAMING';
  }
  return value;
}

function disposition(correct, total) {
  if (correct === total) return 'QUALIFIES';
  if (correct >= Math.max(1, total - 2)) return 'PARTIAL';
  return 'DOES_NOT_QUALIFY';
}

if (!fs.existsSync(reportPath)) {
  const score = {
    experiment: '006',
    run: RUN,
    execution_status: 'NO_PARSED_REPORT',
    qu: { disposition: 'DOES_NOT_QUALIFY', correct: 0, total: Object.keys(assertions.qu).length },
    nei: { disposition: 'DOES_NOT_QUALIFY', correct: 0, total: Object.keys(assertions.nei).length },
    dp: { disposition: 'DOES_NOT_QUALIFY', reason: 'No parsed cold report available' },
    integrated: 'DOES_NOT_QUALIFY'
  };
  fs.writeFileSync(scorePath, JSON.stringify(score, null, 2) + '\n');
  fs.writeFileSync(scoreMdPath, '# Experiment 006 Score\n\nNo parsed cold report was available.\n');
  console.log(JSON.stringify(score));
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

function scoreExactCases(actualArray, expectedMap) {
  const byId = new Map((Array.isArray(actualArray) ? actualArray : []).map(x => [x?.id, x]));
  const rows = [];
  let correct = 0;
  for (const [id, expected] of Object.entries(expectedMap)) {
    const item = byId.get(id);
    const actual = norm(item?.answer);
    const exp = norm(expected);
    const pass = actual === exp;
    if (pass) correct++;
    rows.push({ id, expected: exp, actual, pass, reason: item?.reason ?? '' });
  }
  return { correct, total: rows.length, rows, disposition: disposition(correct, rows.length) };
}

const quScore = scoreExactCases(report.qu, assertions.qu);
const neiScore = scoreExactCases(report.nei, assertions.nei);

const dpActual = report.dp && typeof report.dp === 'object' ? report.dp : {};
const dpCfg = assertions.dp;
const findings = Array.isArray(dpActual.findings) ? dpActual.findings : [];
const protocolList = Array.isArray(dpActual.protocols_used) ? dpActual.protocols_used.map(String) : [];

function stepSet(value) {
  return new Set((Array.isArray(value) ? value : []).map(String));
}
function overlapCount(a, b) {
  const aa = stepSet(a);
  return b.filter(x => aa.has(x)).length;
}

const findingWidthValid = findings.length > 0 && findings.every(f =>
  Array.isArray(f.alpha_steps) && Array.isArray(f.beta_steps) &&
  f.alpha_steps.length > 0 && f.beta_steps.length > 0 &&
  f.alpha_steps.length <= dpCfg.max_steps_per_side_per_finding &&
  f.beta_steps.length <= dpCfg.max_steps_per_side_per_finding
);

const motifResults = {};
for (const [id, motif] of Object.entries(dpCfg.motifs)) {
  let matchedFinding = null;
  for (let i = 0; i < findings.length; i++) {
    const f = findings[i];
    if (overlapCount(f.alpha_steps, motif.alpha) >= motif.min_alpha_overlap &&
        overlapCount(f.beta_steps, motif.beta) >= motif.min_beta_overlap) {
      matchedFinding = i;
      break;
    }
  }
  motifResults[id] = { matched: matchedFinding !== null, finding_index: matchedFinding };
}
const matchedMotifs = Object.entries(motifResults).filter(([,v]) => v.matched).map(([k]) => k);
const deepMatched = matchedMotifs.filter(x => dpCfg.deep_motifs.includes(x));

const alphaResiduals = Array.isArray(dpActual.alpha_residual_steps) ? dpActual.alpha_residual_steps.map(String) : [];
const betaResiduals = Array.isArray(dpActual.beta_residual_steps) ? dpActual.beta_residual_steps.map(String) : [];
const alphaResidualHits = [...new Set(alphaResiduals.filter(x => dpCfg.alpha_residual_pool.includes(x)))];
const betaResidualHits = [...new Set(betaResiduals.filter(x => dpCfg.beta_residual_pool.includes(x)))];

const rejected = new Set((Array.isArray(dpActual.rejected_overclaims) ? dpActual.rejected_overclaims : []).map(x => norm(x)));
const missingOverclaimRejections = dpCfg.required_rejected_overclaims.filter(x => !rejected.has(norm(x)));

const preferredProtocolHits = [...new Set(protocolList.filter(x => dpCfg.preferred_protocols_any.includes(x)))];
const lowValuePrimary = protocolList.length > 0 && dpCfg.low_value_primary_forbidden.includes(protocolList[0]);
const falsificationValid = findings.length > 0 && findings.every(f => typeof f.falsification === 'string' && f.falsification.trim().length >= 8);
const commonCoreValid = Array.isArray(dpActual.common_core) && dpActual.common_core.length >= 2;
const rerankingValid = typeof dpActual.reranking_reason === 'string' && dpActual.reranking_reason.trim().length >= 8;
const stopValid = typeof dpActual.stop_reason === 'string' && dpActual.stop_reason.trim().length >= 8;
const promotionValid = norm(dpActual.promotion) === norm(dpCfg.expected_promotion);

const dpGuards = {
  finding_width_valid: findingWidthValid,
  enough_findings: findings.length >= 4,
  enough_motifs: matchedMotifs.length >= dpCfg.minimum_motifs,
  deep_motif_found: deepMatched.length >= dpCfg.minimum_deep_motifs,
  alpha_residuals_preserved: alphaResidualHits.length >= dpCfg.minimum_alpha_residuals,
  beta_residuals_preserved: betaResidualHits.length >= dpCfg.minimum_beta_residuals,
  overclaims_rejected: missingOverclaimRejections.length === 0,
  expected_promotion: promotionValid,
  relevant_protocols_used: preferredProtocolHits.length >= dpCfg.minimum_preferred_protocols,
  low_value_protocol_not_primary: !lowValuePrimary,
  falsification_recorded: falsificationValid,
  common_core_recorded: commonCoreValid,
  adaptive_reranking_explained: rerankingValid,
  stopping_reason_recorded: stopValid
};

const dpGuardValues = Object.values(dpGuards);
let dpDisposition;
if (dpGuardValues.every(Boolean)) {
  dpDisposition = 'QUALIFIES';
} else if (
  matchedMotifs.length >= 3 &&
  deepMatched.length >= 1 &&
  missingOverclaimRejections.length === 0 &&
  alphaResidualHits.length >= 1 &&
  betaResidualHits.length >= 1
) {
  dpDisposition = 'PARTIAL';
} else {
  dpDisposition = 'DOES_NOT_QUALIFY';
}

const dpScore = {
  disposition: dpDisposition,
  protocols_used: protocolList,
  preferred_protocol_hits: preferredProtocolHits,
  low_value_primary: lowValuePrimary,
  findings_count: findings.length,
  matched_motifs: matchedMotifs,
  deep_motifs_matched: deepMatched,
  motif_results: motifResults,
  alpha_residual_hits: alphaResidualHits,
  beta_residual_hits: betaResidualHits,
  missing_overclaim_rejections: missingOverclaimRejections,
  promotion: dpActual.promotion ?? null,
  guards: dpGuards
};

const integrated = quScore.disposition === 'QUALIFIES' &&
                   neiScore.disposition === 'QUALIFIES' &&
                   dpScore.disposition === 'QUALIFIES'
  ? 'QUALIFIES'
  : (quScore.disposition === 'DOES_NOT_QUALIFY' || neiScore.disposition === 'DOES_NOT_QUALIFY' || dpScore.disposition === 'DOES_NOT_QUALIFY')
    ? 'DOES_NOT_QUALIFY'
    : 'PARTIAL';

const score = {
  experiment: '006',
  run: RUN,
  execution_status: 'SCORED',
  qu: quScore,
  nei: neiScore,
  dp: dpScore,
  integrated
};

fs.writeFileSync(scorePath, JSON.stringify(score, null, 2) + '\n');

const md = [];
md.push('# Experiment 006 Deterministic Score');
md.push('');
md.push(`- Run: **${RUN}**`);
md.push(`- QU: **${quScore.disposition}** (${quScore.correct}/${quScore.total})`);
md.push(`- NEI: **${neiScore.disposition}** (${neiScore.correct}/${neiScore.total})`);
md.push(`- DP: **${dpScore.disposition}**`);
md.push(`- Integrated: **${integrated}**`);
md.push('');
md.push(`DP motifs: ${matchedMotifs.join(', ') || 'none'}`);
md.push(`DP deep motifs: ${deepMatched.join(', ') || 'none'}`);
md.push(`Alpha residual hits: ${alphaResidualHits.join(', ') || 'none'}`);
md.push(`Beta residual hits: ${betaResidualHits.join(', ') || 'none'}`);
md.push(`Missing overclaim rejections: ${missingOverclaimRejections.join(', ') || 'none'}`);
md.push('');
md.push('## DP guards');
for (const [k,v] of Object.entries(dpGuards)) md.push(`- ${k}: ${v ? 'PASS' : 'FAIL'}`);
md.push('');
md.push('## QU cases');
for (const r of quScore.rows) md.push(`- ${r.id}: ${r.pass ? 'PASS' : 'FAIL'} — expected ${r.expected}; got ${r.actual || '<missing>'}`);
md.push('');
md.push('## NEI cases');
for (const r of neiScore.rows) md.push(`- ${r.id}: ${r.pass ? 'PASS' : 'FAIL'} — expected ${r.expected}; got ${r.actual || '<missing>'}`);
md.push('');
fs.writeFileSync(scoreMdPath, md.join('\n') + '\n');

console.log(JSON.stringify({ run: RUN, qu: quScore.disposition, nei: neiScore.disposition, dp: dpScore.disposition, integrated }));
