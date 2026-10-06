import { shortestPlan } from '../engine.mjs';

export function compileFiniteStateScenario(spec) {
  if (!spec || !Array.isArray(spec.states) || !Array.isArray(spec.operations)) {
    throw new TypeError('Finite-state scenario requires states[] and operations[].');
  }
  const states = new Set(spec.states.map(String));
  const initial = String(spec.initial);
  const target = String(spec.target);
  if (!states.has(initial)) throw new Error(`Unknown initial state ${initial}.`);
  if (!states.has(target)) throw new Error(`Unknown target state ${target}.`);
  const operations = spec.operations.map((op, index) => {
    const transitions = new Map(Object.entries(op.transitions ?? {}).map(([a, b]) => [String(a), String(b)]));
    for (const [a, b] of transitions) {
      if (!states.has(a) || !states.has(b)) throw new Error(`Operation ${op.id ?? index} has transition ${a} -> ${b} outside declared states.`);
    }
    return {
      id: String(op.id ?? `op-${index}`),
      label: String(op.label ?? op.id ?? `Operation ${index + 1}`),
      cost: Number(op.cost ?? 1),
      description: op.description ?? null,
      apply(state) {
        const next = transitions.get(String(state.value));
        return next == null ? null : { value: next };
      },
    };
  });
  return {
    id: String(spec.id ?? 'finite-state-scenario'),
    label: String(spec.label ?? spec.id ?? 'Finite-state scenario'),
    description: spec.description ?? null,
    states: [...states],
    initial,
    target,
    operations,
    metadata: spec.metadata ?? null,
  };
}

export function planFiniteState(specOrModel, options = {}) {
  const model = specOrModel?.operations?.[0]?.apply ? specOrModel : compileFiniteStateScenario(specOrModel);
  const result = shortestPlan({
    initialState: { value: model.initial },
    operations: model.operations,
    isGoal: s => s.value === model.target,
    key: s => s.value,
    maxStates: options.maxStates ?? 100000,
  });
  return {
    ...result,
    model: {
      id: model.id,
      label: model.label,
      description: model.description,
      states: model.states,
      initial: model.initial,
      target: model.target,
      operations: model.operations.map(o => ({ id: o.id, label: o.label, cost: o.cost, description: o.description })),
    },
  };
}
