import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out', 'exp009');
const reportPath = path.join(OUT, 'PARSED_REPORT.json');
const assertionsPath = path.join(ROOT, 'experiments', '009', 'hidden', 'ASSERTIONS.json');
const scorePath = path.join(OUT, 'SCORE.json');

function fail(message) {
  const score = { experiment: '009', disposition: 'INFRASTRUCTURE_FAILURE', error: message };
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(scorePath, JSON.stringify(score, null, 2) + '\n');
  console.error(message);
  process.exitCode = 1;
}

if (!fs.existsSync(reportPath)) {
  fail('missing parsed report');
} else if (!fs.existsSync(assertionsPath)) {
  fail('missing hidden assertions');
} else {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const assertions = JSON.parse(fs.readFileSync(assertionsPath, 'utf8'));
  const cases = Array.isArray(report?.cases) ? report.cases : [];
  const byId = new Map();
  const duplicates = [];
  for (const item of cases) {
    const id = String(item?.case_id ?? '');
    if (byId.has(id)) duplicates.push(id);
    byId.set(id, item);
  }

  const results = [];
  for (const id of assertions.required_case_ids) {
    const spec = assertions.cases[id];
    const actual = byId.get(id);
    const mismatches = [];
    if (!actual) {
      mismatches.push({ field: 'case_id', expected: id, actual: null });
    } else {
      for (const [key, expected] of Object.entries(spec.expect ?? {})) {
        const got = actual[key];
        if (got !== expected) mismatches.push({ field: key, expected, actual: got ?? null });
      }
      for (const [key, expected] of Object.entries(spec.subresults ?? {})) {
        const got = actual?.subresults?.[key];
        if (got !== expected) mismatches.push({ field: `subresults.${key}`, expected, actual: got ?? null });
      }
      if (typeof actual.reason !== 'string' || actual.reason.trim().length < 12) {
        mismatches.push({ field: 'reason', expected: 'nontrivial explanation', actual: actual.reason ?? null });
      }
      if (!Array.isArray(actual.authority_used) || actual.authority_used.length === 0) {
        mismatches.push({ field: 'authority_used', expected: 'nonempty array', actual: actual.authority_used ?? null });
      }
      if (!actual.subresults || typeof actual.subresults !== 'object' || Array.isArray(actual.subresults)) {
        mismatches.push({ field: 'subresults', expected: 'object', actual: actual.subresults ?? null });
      }
    }
    results.push({
      case_id: id,
      modules: spec.modules,
      pass: mismatches.length === 0,
      mismatches
    });
  }

  const unexpectedCaseIds = [...byId.keys()].filter(id => !assertions.required_case_ids.includes(id));
  const quCases = results.filter(r => r.modules.includes('QU'));
  const neiCases = results.filter(r => r.modules.includes('NEI'));
  const quPass = quCases.every(r => r.pass);
  const neiPass = neiCases.every(r => r.pass);
  const packetDisciplinePass =
    report?.self_audit?.used_only_packet === true &&
    duplicates.length === 0 &&
    unexpectedCaseIds.length === 0 &&
    cases.length === assertions.required_case_ids.length;

  const declaredQu = report?.module_assessment?.qu_0_1 ?? null;
  const declaredNei = report?.module_assessment?.nei_0_1_0_2 ?? null;
  const moduleAssessmentConsistent =
    (!quPass || declaredQu === 'SUPPORTED') &&
    (!neiPass || declaredNei === 'SUPPORTED');

  let disposition = 'DOES_NOT_QUALIFY';
  if (quPass && neiPass && packetDisciplinePass && moduleAssessmentConsistent) {
    disposition = 'QUALIFIES';
  }

  const score = {
    experiment: '009',
    disposition,
    qu_0_1: {
      pass: quPass,
      passed_cases: quCases.filter(r => r.pass).map(r => r.case_id),
      failed_cases: quCases.filter(r => !r.pass).map(r => r.case_id)
    },
    nei_0_1_0_2: {
      pass: neiPass,
      passed_cases: neiCases.filter(r => r.pass).map(r => r.case_id),
      failed_cases: neiCases.filter(r => !r.pass).map(r => r.case_id)
    },
    guards: {
      packet_self_audit: report?.self_audit?.used_only_packet === true,
      exact_case_coverage: cases.length === assertions.required_case_ids.length,
      no_duplicate_case_ids: duplicates.length === 0,
      no_unexpected_case_ids: unexpectedCaseIds.length === 0,
      module_assessment_consistent: moduleAssessmentConsistent
    },
    duplicates,
    unexpected_case_ids: unexpectedCaseIds,
    case_results: results
  };

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(scorePath, JSON.stringify(score, null, 2) + '\n');
  console.log(JSON.stringify(score, null, 2));
  if (disposition !== 'QUALIFIES') process.exitCode = 2;
}
