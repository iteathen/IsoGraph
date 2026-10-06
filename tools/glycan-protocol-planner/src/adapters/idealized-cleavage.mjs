import { canonicalKey, shortestPlan } from '../engine.mjs';

function uniqStrings(values = []) {
  return [...new Set(values.map(String))];
}

export function compileCleavageScenario(spec) {
  if (!spec || !Array.isArray(spec.nodes) || !Array.isArray(spec.enzymes)) {
    throw new TypeError('Cleavage scenario requires nodes[] and enzymes[].');
  }
  const nodes = spec.nodes.map((node, index) => ({
    id: String(node.id ?? `n${index}`),
    parent: node.parent == null ? null : String(node.parent),
    target: Boolean(node.target),
    label: String(node.label ?? node.id ?? `Residue ${index + 1}`),
    residue: node.residue ?? null,
    mass: node.mass == null ? null : Number(node.mass),
    meta: node.meta ?? null,
  }));
  const byId = new Map(nodes.map(n => [n.id, n]));
  if (byId.size !== nodes.length) throw new Error('Node ids must be unique.');
  for (const n of nodes) {
    if (n.parent != null && !byId.has(n.parent)) throw new Error(`Unknown parent ${n.parent} for node ${n.id}.`);
    if (n.parent === n.id) throw new Error(`Node ${n.id} cannot parent itself.`);
  }
  // Cycle check.
  for (const n of nodes) {
    const seen = new Set([n.id]);
    let p = n.parent;
    while (p != null) {
      if (seen.has(p)) throw new Error(`Parent cycle detected through ${p}.`);
      seen.add(p);
      p = byId.get(p).parent;
    }
  }
  // The frozen research model requires an ancestor-closed protected target.
  for (const n of nodes) {
    if (!n.target) continue;
    let p = n.parent;
    while (p != null) {
      if (!byId.get(p).target) throw new Error(`Target is not ancestor-closed: ${n.id} is protected but ancestor ${p} is not.`);
      p = byId.get(p).parent;
    }
  }
  const children = new Map(nodes.map(n => [n.id, []]));
  for (const n of nodes) if (n.parent != null) children.get(n.parent).push(n.id);

  const q = nodes.filter(n => !n.target).map(n => n.id);
  const qSet = new Set(q);
  const enzymes = spec.enzymes.map((e, index) => {
    const susceptible = new Set(uniqStrings(e.susceptible));
    for (const id of susceptible) if (!qSet.has(id)) {
      if (!byId.has(id)) throw new Error(`Enzyme ${e.id ?? index} references unknown node ${id}.`);
      // Target susceptibility can be source-real but is behaviorally irrelevant in the frozen model.
      susceptible.delete(id);
    }
    return {
      id: String(e.id ?? `E${index}`),
      label: String(e.label ?? e.id ?? `Enzyme ${index + 1}`),
      susceptible,
      cost: Number(e.cost ?? 1),
      meta: e.meta ?? null,
    };
  });
  const enzymeById = new Map(enzymes.map(e => [e.id, e]));
  if (enzymeById.size !== enzymes.length) throw new Error('Enzyme ids must be unique.');

  return {
    id: String(spec.id ?? 'cleavage-scenario'),
    label: String(spec.label ?? spec.id ?? 'Cleavage scenario'),
    description: spec.description ?? null,
    nodes,
    byId,
    children,
    nonTargetIds: q,
    nonTargetSet: qSet,
    targetIds: nodes.filter(n => n.target).map(n => n.id),
    enzymes,
    enzymeById,
    initialState: { removed: [] },
    metadata: spec.metadata ?? null,
  };
}

export function cleavageStateKey(state) {
  return JSON.stringify([...new Set(state.removed.map(String))].sort());
}

function removedSet(state) {
  return new Set(state.removed.map(String));
}

export function applyExhaustivePhase(model, state, enzymeOrId) {
  const enzyme = typeof enzymeOrId === 'string' ? model.enzymeById.get(enzymeOrId) : enzymeOrId;
  if (!enzyme) throw new Error(`Unknown enzyme ${enzymeOrId}.`);
  const beforeRemoved = removedSet(state);
  const active = new Set(model.nonTargetIds.filter(id => !beforeRemoved.has(id)));

  // Resistant-frontier formula from the frozen glycan model:
  // active_after_e = upward_closure(active_before_e ∩ e-resistant-sites)
  const survivors = new Set();
  for (const id of active) {
    if (enzyme.susceptible.has(id)) continue;
    let q = id;
    while (q != null && model.nonTargetSet.has(q) && active.has(q)) {
      if (survivors.has(q)) break;
      survivors.add(q);
      q = model.byId.get(q).parent;
    }
  }

  const afterRemoved = [];
  for (const id of model.nonTargetIds) if (!survivors.has(id)) afterRemoved.push(id);
  afterRemoved.sort();
  const newlyRemoved = afterRemoved.filter(id => !beforeRemoved.has(id));
  return {
    removed: afterRemoved,
    lastPhase: {
      enzyme: enzyme.id,
      newlyRemoved,
    },
  };
}

export function makeCleavageOperations(model) {
  return model.enzymes.map(enzyme => ({
    id: enzyme.id,
    label: enzyme.label,
    cost: enzyme.cost,
    description: `Exhaustive ${enzyme.label} phase`,
    apply: state => applyExhaustivePhase(model, state, enzyme),
  }));
}

export function makeCleavageGoal(model, objective = { remove: 'all-nontarget' }) {
  const requiredRemove = objective.remove === 'all-nontarget'
    ? new Set(model.nonTargetIds)
    : new Set(uniqStrings(objective.remove ?? []));
  const preserve = new Set(uniqStrings(objective.preserve ?? []));
  for (const id of requiredRemove) if (!model.nonTargetSet.has(id)) throw new Error(`Goal asks to remove non-removable/unknown node ${id}.`);
  for (const id of preserve) if (!model.byId.has(id)) throw new Error(`Goal asks to preserve unknown node ${id}.`);
  for (const id of requiredRemove) if (preserve.has(id)) throw new Error(`Goal both removes and preserves ${id}.`);

  return state => {
    const removed = removedSet(state);
    for (const id of requiredRemove) if (!removed.has(id)) return false;
    for (const id of preserve) if (removed.has(id)) return false;
    return true;
  };
}

export function planCleavage(specOrModel, objective = { remove: 'all-nontarget' }, options = {}) {
  const model = specOrModel?.byId instanceof Map ? specOrModel : compileCleavageScenario(specOrModel);
  const result = shortestPlan({
    initialState: model.initialState,
    operations: makeCleavageOperations(model),
    isGoal: makeCleavageGoal(model, objective),
    key: cleavageStateKey,
    maxStates: options.maxStates ?? 250000,
  });
  if (result.status !== 'OPTIMAL') return { ...result, model: summarizeModel(model), objective };

  let before = model.initialState;
  const phases = [];
  for (const step of result.steps) {
    const after = applyExhaustivePhase(model, before, step.operation.id);
    phases.push({
      phase: step.index,
      enzyme: step.operation.id,
      label: step.operation.label,
      cost: step.operation.cost,
      newlyRemoved: after.lastPhase.newlyRemoved,
      removedTotal: after.removed.length,
      remaining: model.nonTargetIds.length - after.removed.length,
      costAfter: step.costAfter,
    });
    before = after;
  }
  return {
    ...result,
    phases,
    model: summarizeModel(model),
    objective,
  };
}

export function summarizeModel(model) {
  return {
    id: model.id,
    label: model.label,
    description: model.description,
    nodes: model.nodes.map(n => ({ id: n.id, parent: n.parent, target: n.target, label: n.label, residue: n.residue, mass: n.mass, meta: n.meta })),
    enzymes: model.enzymes.map(e => ({ id: e.id, label: e.label, cost: e.cost, susceptible: [...e.susceptible].sort(), meta: e.meta })),
    nonTargetCount: model.nonTargetIds.length,
    targetCount: model.targetIds.length,
  };
}

export function measureCleavageTransition(model, before, after, mode = 'newly-removed-count') {
  const b = removedSet(before);
  const a = removedSet(after);
  const newly = [...a].filter(id => !b.has(id)).sort();
  if (mode === 'newly-removed-count') return newly.length;
  if (mode === 'remaining-count') return model.nonTargetIds.length - a.size;
  if (mode === 'removed-signature') return newly;
  if (mode === 'remaining-signature') return model.nonTargetIds.filter(id => !a.has(id)).sort();
  if (mode === 'mass-delta') {
    let total = 0;
    for (const id of newly) {
      const m = model.byId.get(id).mass;
      if (!Number.isFinite(m)) throw new Error(`Node ${id} has no finite mass for mass-delta observation.`);
      total += m;
    }
    return total;
  }
  throw new Error(`Unknown cleavage observation mode ${mode}.`);
}

export function makeCleavageIdentificationExperiment(enzymeId, observationMode = 'newly-removed-count', cost = 1) {
  return {
    id: enzymeId,
    label: enzymeId,
    cost,
    description: `Apply ${enzymeId} and observe ${observationMode}`,
    run(candidate, state) {
      const model = candidate.meta?.model;
      if (!model) throw new Error(`Candidate ${candidate.id} lacks compiled cleavage model in meta.model.`);
      const after = applyExhaustivePhase(model, state, enzymeId);
      return {
        state: { removed: after.removed },
        observation: measureCleavageTransition(model, state, after, observationMode),
      };
    },
  };
}

export function maximalSingletonPathWords(model) {
  const classes = new Map();
  for (const id of model.nonTargetIds) {
    const hits = model.enzymes.filter(e => e.susceptible.has(id));
    if (hits.length !== 1) return { status: 'NOT_SINGLETON', node: id, classCount: hits.length };
    classes.set(id, hits[0].id);
  }
  const activeChildren = new Map(model.nonTargetIds.map(id => [id, []]));
  for (const id of model.nonTargetIds) {
    const p = model.byId.get(id).parent;
    if (p != null && model.nonTargetSet.has(p)) activeChildren.get(p).push(id);
  }
  const leaves = model.nonTargetIds.filter(id => activeChildren.get(id).length === 0);
  const paths = [];
  for (const leaf of leaves) {
    const ids = [];
    let q = leaf;
    while (q != null && model.nonTargetSet.has(q)) {
      ids.push(q);
      q = model.byId.get(q).parent;
    }
    const raw = ids.map(id => classes.get(id));
    const compressed = raw.filter((x, i) => i === 0 || x !== raw[i - 1]);
    paths.push({ leaf, nodes: ids, raw, compressed });
  }
  return { status: 'OK', paths };
}

export function verifyCleavagePlan(model, objective, enzymeWord) {
  const isGoal = makeCleavageGoal(model, objective);
  let state = model.initialState;
  const trace = [];
  for (const id of enzymeWord) {
    const before = state;
    const after = applyExhaustivePhase(model, state, id);
    trace.push({ enzyme: id, before: canonicalKey(before), after: canonicalKey(after), newlyRemoved: after.lastPhase.newlyRemoved });
    state = { removed: after.removed };
  }
  return { success: isGoal(state), finalState: state, trace };
}
