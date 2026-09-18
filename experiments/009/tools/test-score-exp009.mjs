import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out', 'exp009');
const assertions = JSON.parse(fs.readFileSync(path.join(ROOT, 'experiments', '009', 'hidden', 'ASSERTIONS.json'), 'utf8'));

function makeReport() {
  const cases = assertions.required_case_ids.map(id => {
    const spec = assertions.cases[id];
    return {
      case_id: id,
      qu_status: 'NOT_APPLICABLE',
      structural_relation: 'NOT_APPLICABLE',
      nei_status: 'NOT_APPLICABLE',
      requires_qu: false,
      requires_nei: false,
      requires_eager_enumeration: false,
      circular_evidence: false,
      decision: 'SUPPORTED',
      reason: 'Synthetic deterministic fixture satisfying the frozen expected semantic fields.',
      authority_used: ['fixture authority'],
      subresults: { ...(spec.subresults ?? {}) },
      rejected_overclaims: []
    };
  });
  for (const item of cases) Object.assign(item, assertions.cases[item.case_id].expect ?? {});
  return {
    cases,
    module_assessment: { qu_0_1: 'SUPPORTED', nei_0_1_0_2: 'SUPPORTED' },
    self_audit: { used_only_packet: true, notes: 'fixture' }
  };
}

function runScore(report) {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'PARSED_REPORT.json'), JSON.stringify(report, null, 2) + '\n');
  return spawnSync(process.execPath, ['experiments/009/tools/score-exp009.mjs'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
}

{
  const result = runScore(makeReport());
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const score = JSON.parse(fs.readFileSync(path.join(OUT, 'SCORE.json'), 'utf8'));
  assert.equal(score.disposition, 'QUALIFIES');
  assert.equal(score.qu_0_1.pass, true);
  assert.equal(score.nei_0_1_0_2.pass, true);
}

{
  const report = makeReport();
  report.cases.find(x => x.case_id === 'C08').qu_status = 'OPEN';
  const result = runScore(report);
  assert.equal(result.status, 2);
  const score = JSON.parse(fs.readFileSync(path.join(OUT, 'SCORE.json'), 'utf8'));
  assert.equal(score.disposition, 'DOES_NOT_QUALIFY');
  assert.equal(score.qu_0_1.pass, false);
  assert.ok(score.qu_0_1.failed_cases.includes('C08'));
}

{
  const report = makeReport();
  report.cases.pop();
  const result = runScore(report);
  assert.equal(result.status, 2);
  const score = JSON.parse(fs.readFileSync(path.join(OUT, 'SCORE.json'), 'utf8'));
  assert.equal(score.guards.exact_case_coverage, false);
}

fs.rmSync(OUT, { recursive: true, force: true });
console.log('Experiment 009 scorer tests: PASS');
