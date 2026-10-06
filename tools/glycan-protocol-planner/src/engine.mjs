export function canonicalKey(value) {
  const seen = new WeakSet();
  function norm(v) {
    if (v === null || typeof v !== 'object') return v;
    if (v instanceof Set) return [...v].sort().map(norm);
    if (Array.isArray(v)) return v.map(norm);
    if (seen.has(v)) throw new TypeError('State contains a cycle and cannot be keyed canonically.');
    seen.add(v);
    const out = {};
    for (const k of Object.keys(v).sort()) out[k] = norm(v[k]);
    seen.delete(v);
    return out;
  }
  return JSON.stringify(norm(value));
}

class MinHeap {
  constructor(compare = (a, b) => a.priority - b.priority) {
    this.a = [];
    this.compare = compare;
  }
  get size() { return this.a.length; }
  push(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(a[p], a[i]) <= 0) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    if (!a.length) return undefined;
    const root = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      while (true) {
        let best = i;
        const l = i * 2 + 1;
        const r = l + 1;
        if (l < a.length && this.compare(a[l], a[best]) < 0) best = l;
        if (r < a.length && this.compare(a[r], a[best]) < 0) best = r;
        if (best === i) break;
        [a[i], a[best]] = [a[best], a[i]];
        i = best;
      }
    }
    return root;
  }
}

function normalizeOperation(op, index) {
  if (!op || typeof op.apply !== 'function') throw new TypeError(`Operation ${index} needs apply(state).`);
  const cost = Number(op.cost ?? 1);
  if (!Number.isFinite(cost) || cost < 0) throw new TypeError(`Operation ${op.id ?? index} has invalid cost.`);
  return {
    ...op,
    id: String(op.id ?? `op-${index}`),
    label: String(op.label ?? op.id ?? `Operation ${index + 1}`),
    cost,
  };
}

export function replayPlan(initialState, steps) {
  let state = initialState;
  const trace = [];
  for (const step of steps) {
    const before = state;
    state = step.operation.apply(state);
    if (state == null) throw new Error(`Operation ${step.operation.id} became invalid while replaying plan.`);
    trace.push({ operation: step.operation, before, after: state });
  }
  return { state, trace };
}

export function shortestPlan({
  initialState,
  operations,
  isGoal,
  key = canonicalKey,
  maxStates = 250000,
}) {
  if (typeof isGoal !== 'function') throw new TypeError('shortestPlan requires isGoal(state).');
  const ops = operations.map(normalizeOperation);
  const startKey = key(initialState);
  const heap = new MinHeap((a, b) => a.cost - b.cost || a.depth - b.depth || a.serial - b.serial);
  const best = new Map([[startKey, 0]]);
  const records = new Map([[startKey, { state: initialState, cost: 0, depth: 0, parent: null, opIndex: null }]]);
  let serial = 0;
  let expanded = 0;
  heap.push({ state: initialState, stateKey: startKey, cost: 0, depth: 0, serial: serial++ });

  let goalKey = null;
  while (heap.size) {
    const cur = heap.pop();
    if (cur.cost !== best.get(cur.stateKey)) continue;
    const rec = records.get(cur.stateKey);
    if (isGoal(cur.state)) {
      goalKey = cur.stateKey;
      break;
    }
    expanded++;
    if (expanded > maxStates) {
      return {
        status: 'LIMIT',
        reason: `state limit ${maxStates} reached`,
        expandedStates: expanded,
        discoveredStates: records.size,
      };
    }
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      const next = op.apply(cur.state);
      if (next == null) continue;
      const nextKey = key(next);
      if (nextKey === cur.stateKey && op.cost >= 0) continue;
      const nextCost = cur.cost + op.cost;
      if (nextCost >= (best.get(nextKey) ?? Infinity)) continue;
      const nextDepth = rec.depth + 1;
      best.set(nextKey, nextCost);
      records.set(nextKey, {
        state: next,
        cost: nextCost,
        depth: nextDepth,
        parent: cur.stateKey,
        opIndex: i,
      });
      heap.push({ state: next, stateKey: nextKey, cost: nextCost, depth: nextDepth, serial: serial++ });
    }
  }

  if (goalKey == null) {
    return {
      status: 'NO_PLAN',
      expandedStates: expanded,
      discoveredStates: records.size,
    };
  }

  const rev = [];
  let k = goalKey;
  while (k !== startKey) {
    const rec = records.get(k);
    if (!rec || rec.parent == null) throw new Error('Broken shortest-path predecessor chain.');
    rev.push({ operation: ops[rec.opIndex], state: rec.state, costAfter: rec.cost });
    k = rec.parent;
  }
  rev.reverse();
  const steps = rev.map((x, i) => ({
    index: i + 1,
    operation: x.operation,
    state: x.state,
    costAfter: x.costAfter,
  }));
  return {
    status: 'OPTIMAL',
    totalCost: records.get(goalKey).cost,
    phaseCount: steps.length,
    steps,
    finalState: records.get(goalKey).state,
    expandedStates: expanded,
    discoveredStates: records.size,
    certificate: {
      method: 'exact uniform/nonnegative-cost state-space search',
      optimality: 'The first goal removed from the nonnegative-cost priority queue is globally minimum cost over the represented transition model.',
      stateKey: 'canonical structural state key',
    },
  };
}

function candidateSetKey(items, stateKey) {
  return items
    .map(x => `${x.id}\u0000${stateKey(x.state)}`)
    .sort()
    .join('\u0001');
}

function normalizeExperiment(exp, index) {
  if (!exp || typeof exp.run !== 'function') throw new TypeError(`Experiment ${index} needs run(candidate,state).`);
  const cost = Number(exp.cost ?? 1);
  if (!Number.isFinite(cost) || cost < 0) throw new TypeError(`Experiment ${exp.id ?? index} has invalid cost.`);
  return {
    ...exp,
    id: String(exp.id ?? `experiment-${index}`),
    label: String(exp.label ?? exp.id ?? `Experiment ${index + 1}`),
    cost,
  };
}

function comparePolicyScore(a, b) {
  return a.worstCost - b.worstCost ||
    a.expectedCost - b.expectedCost ||
    a.maxBucket - b.maxBucket ||
    a.experimentCost - b.experimentCost ||
    a.experimentId.localeCompare(b.experimentId);
}

export function optimalIdentificationPolicy({
  candidates,
  experiments,
  stateKey = canonicalKey,
  observationKey = canonicalKey,
  maxDepth = 12,
  maxMemoStates = 50000,
}) {
  const exps = experiments.map(normalizeExperiment);
  const initial = candidates.map((c, i) => ({
    id: String(c.id ?? `candidate-${i}`),
    label: String(c.label ?? c.id ?? `Candidate ${i + 1}`),
    state: c.state,
    weight: Number(c.weight ?? 1),
    meta: c.meta ?? null,
  }));
  if (!initial.length) throw new TypeError('At least one candidate is required.');
  for (const c of initial) if (!(c.weight > 0) || !Number.isFinite(c.weight)) throw new TypeError(`Candidate ${c.id} has invalid weight.`);

  const memo = new Map();
  const active = new Set();

  function solve(items, depthLeft) {
    const uniqueIds = new Set(items.map(x => x.id));
    if (uniqueIds.size <= 1) {
      return {
        status: 'IDENTIFIED',
        candidate: items[0]?.id ?? null,
        label: items[0]?.label ?? null,
        worstCost: 0,
        expectedCost: 0,
        maxBucket: items.length,
      };
    }
    if (depthLeft <= 0) return { status: 'DEPTH_LIMIT' };
    const setKey = candidateSetKey(items, stateKey);
    const memoKey = `${depthLeft}|${setKey}`;
    if (memo.has(memoKey)) return memo.get(memoKey);
    if (active.has(setKey)) return { status: 'CYCLE' };
    if (memo.size > maxMemoStates) return { status: 'MEMO_LIMIT' };
    active.add(setKey);

    let bestNode = null;
    let bestScore = null;
    const totalWeight = items.reduce((s, x) => s + x.weight, 0);

    for (const exp of exps) {
      const buckets = new Map();
      let valid = true;
      let anyStateChange = false;
      for (const c of items) {
        const out = exp.run(c, c.state);
        if (!out || !('state' in out) || !('observation' in out)) { valid = false; break; }
        if (stateKey(out.state) !== stateKey(c.state)) anyStateChange = true;
        const ok = observationKey(out.observation);
        let bucket = buckets.get(ok);
        if (!bucket) {
          bucket = { observation: out.observation, items: [] };
          buckets.set(ok, bucket);
        }
        bucket.items.push({ ...c, state: out.state });
      }
      if (!valid) continue;
      if (buckets.size === 1 && !anyStateChange) continue;

      const branches = [];
      let feasible = true;
      let worstChild = 0;
      let expectedChild = 0;
      let maxBucket = 0;
      for (const [ok, bucket] of buckets) {
        const child = solve(bucket.items, depthLeft - 1);
        if (!['IDENTIFIED', 'POLICY'].includes(child.status)) { feasible = false; break; }
        const bucketWeight = bucket.items.reduce((s, x) => s + x.weight, 0);
        worstChild = Math.max(worstChild, child.worstCost ?? 0);
        expectedChild += (bucketWeight / totalWeight) * (child.expectedCost ?? 0);
        maxBucket = Math.max(maxBucket, new Set(bucket.items.map(x => x.id)).size);
        branches.push({
          observationKey: ok,
          observation: bucket.observation,
          candidates: [...new Set(bucket.items.map(x => x.id))],
          policy: child,
        });
      }
      if (!feasible) continue;

      const score = {
        worstCost: exp.cost + worstChild,
        expectedCost: exp.cost + expectedChild,
        maxBucket,
        experimentCost: exp.cost,
        experimentId: exp.id,
      };
      if (!bestScore || comparePolicyScore(score, bestScore) < 0) {
        bestScore = score;
        bestNode = {
          status: 'POLICY',
          experiment: { id: exp.id, label: exp.label, cost: exp.cost, description: exp.description ?? null },
          branches,
          worstCost: score.worstCost,
          expectedCost: score.expectedCost,
          maxBucket,
          candidateCount: uniqueIds.size,
        };
      }
    }

    active.delete(setKey);
    const answer = bestNode ?? { status: 'NO_DISCRIMINATING_POLICY' };
    memo.set(memoKey, answer);
    return answer;
  }

  const policy = solve(initial, maxDepth);
  return {
    status: policy.status,
    policy,
    candidateCount: new Set(initial.map(x => x.id)).size,
    experimentCount: exps.length,
    memoStates: memo.size,
    objective: 'minimum worst-case experiment cost; expected cost, largest unresolved bucket, experiment cost, then stable experiment id used as tie-breakers',
  };
}

export function flattenPolicy(policy, depth = 0, rows = []) {
  if (!policy) return rows;
  if (policy.status === 'IDENTIFIED') {
    rows.push({ depth, type: 'identified', candidate: policy.candidate, label: policy.label });
    return rows;
  }
  if (policy.status !== 'POLICY') {
    rows.push({ depth, type: 'terminal', status: policy.status });
    return rows;
  }
  rows.push({ depth, type: 'experiment', experiment: policy.experiment, candidateCount: policy.candidateCount });
  for (const branch of policy.branches) {
    rows.push({ depth: depth + 1, type: 'observation', observation: branch.observation, candidates: branch.candidates });
    flattenPolicy(branch.policy, depth + 2, rows);
  }
  return rows;
}
