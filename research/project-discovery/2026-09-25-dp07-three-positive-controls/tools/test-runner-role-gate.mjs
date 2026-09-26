import assert from 'node:assert/strict';
import fs from 'node:fs';

const ROOT='research/project-discovery/2026-09-25-dp07-three-positive-controls';
const prompt=fs.readFileSync(`${ROOT}/BLIND_DISCOVERY_PROMPT.md`,'utf8');
const runner=fs.readFileSync(`${ROOT}/tools/run-blind-discovery.mjs`,'utf8');
const workflow=fs.readFileSync('.github/workflows/dp07-three-positive-controls.yml','utf8');

assert.match(prompt,/"role_coverage"\s*:/,'blind prompt must require role_coverage');
for(const status of ['MAPPED','TRANSFORMED','RESIDUAL','SHARED_INFRASTRUCTURE','NON_LOAD_BEARING']){
  assert.match(prompt,new RegExp(status),`blind prompt must define ${status}`);
}
assert.match(prompt,/every used signature symbol/i,'blind prompt must require every used signature symbol to be classified');

assert.match(runner,/exact-role-coverage\.mjs/,'runner must import the exact role coverage gate');
assert.match(runner,/enforceExactRoleCoverage\s*\(/,'runner must enforce exact role coverage');

const enforceAt=runner.indexOf('enforceExactRoleCoverage(');
const parsedWriteAt=runner.indexOf("fs.writeFileSync(`${out}/PARSED_REPORT.json`");
assert.ok(enforceAt>=0,'runner enforcement call missing');
assert.ok(parsedWriteAt>=0,'runner parsed report write missing');
assert.ok(enforceAt<parsedWriteAt,'runner must enforce coverage before accepting PARSED_REPORT.json');

for(const pair of ['case-01','case-02','case-03']){
  assert.match(runner,new RegExp(`['"]${pair}['"]`),`runner must bind promoted signatures for ${pair}`);
}

console.log('PASS: blind runner exact role coverage integration');

assert.match(workflow,/ROLE_COVERAGE_AUDIT\.json/,'blind workflow must persist the mechanical role coverage audit');
console.log('PASS: blind workflow persists role coverage audit evidence');
