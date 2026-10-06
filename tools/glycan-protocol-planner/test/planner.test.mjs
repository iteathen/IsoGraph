import test from 'node:test';
import assert from 'node:assert/strict';
import { runExample } from '../src/examples/catalog.mjs';
import { compileCleavageScenario, applyExhaustivePhase, planCleavage } from '../src/adapters/idealized-cleavage.mjs';
import { shortestPlan } from '../src/engine.mjs';

test('research-derived four-path synchronization witness has optimum six', () => {
  const data = runExample('higher-order-synchronization');
  assert.equal(data.result.status, 'OPTIMAL');
  assert.equal(data.result.phaseCount, 6);
  assert.equal(data.result.totalCost, 6);
  assert.deepEqual(data.pathAnalysis.paths.map(p => p.compressed.map(x => x.replace(/^E/, '')).join('')).sort(), ['010', '012', '101', '210']);
});

test('selective-cleavage demo preserves branch B', () => {
  const data = runExample('selective-cleavage');
  assert.equal(data.result.status, 'OPTIMAL');
  const removed = new Set(data.result.finalState.removed);
  assert(removed.has('a1'));
  assert(removed.has('a2'));
  assert(!removed.has('b1'));
  assert(!removed.has('b2'));
  assert.equal(data.result.phaseCount, 2);
});

test('adaptive sequencing distinguishes all four candidates with worst-case cost two', () => {
  const data = runExample('adaptive-sequencing');
  assert.equal(data.result.status, 'POLICY');
  assert.equal(data.result.policy.worstCost, 2);
  assert.equal(data.result.policy.branches.length, 2);
});

test('validation/QC demo classifies expected profile versus represented deviation', () => {
  const data = runExample('validation-qc');
  assert.equal(data.result.status, 'POLICY');
  assert.equal(data.result.candidateCount, 2);
  assert.equal(data.summary.representedModels, 3);
  assert.equal(data.result.policy.worstCost, 2);
});

test('remodeling demo chooses lower-cost three-step path over direct cost-four route', () => {
  const data = runExample('remodeling-path');
  assert.equal(data.result.status, 'OPTIMAL');
  assert.equal(data.result.totalCost, 3);
  assert.equal(data.result.phaseCount, 3);
  assert.deepEqual(data.result.steps.map(s => s.operation.id), ['trim', 'extend', 'finish']);
});

test('resistant-frontier phase removes newly exposed susceptible ancestors in one exhaustive phase', () => {
  const model = compileCleavageScenario({
    nodes: [
      { id: 'core', parent: null, target: true },
      { id: 'inner', parent: 'core' },
      { id: 'leaf', parent: 'inner' },
    ],
    enzymes: [{ id: 'E', susceptible: ['inner', 'leaf'] }],
  });
  const after = applyExhaustivePhase(model, model.initialState, 'E');
  assert.deepEqual(after.removed, ['inner', 'leaf']);
});

test('weighted generic planner is not phase-count-only', () => {
  const ops = [
    { id: 'direct', cost: 5, apply: s => s === 'A' ? 'D' : null },
    { id: 'ab', cost: 1, apply: s => s === 'A' ? 'B' : null },
    { id: 'bc', cost: 1, apply: s => s === 'B' ? 'C' : null },
    { id: 'cd', cost: 1, apply: s => s === 'C' ? 'D' : null },
  ];
  const result = shortestPlan({ initialState: 'A', operations: ops, isGoal: s => s === 'D', key: String });
  assert.equal(result.totalCost, 3);
  assert.deepEqual(result.steps.map(s => s.operation.id), ['ab', 'bc', 'cd']);
});

test('custom complete cleavage finds expected two-phase sequence', () => {
  const result = planCleavage({
    nodes: [
      { id: 'core', parent: null, target: true },
      { id: 'a', parent: 'core' },
      { id: 'b', parent: 'a' },
    ],
    enzymes: [
      { id: 'E1', susceptible: ['b'] },
      { id: 'E2', susceptible: ['a'] },
    ],
  });
  assert.equal(result.phaseCount, 2);
  assert.deepEqual(result.phases.map(p => p.enzyme), ['E1', 'E2']);
});
