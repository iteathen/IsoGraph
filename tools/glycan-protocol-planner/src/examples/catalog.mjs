import { optimalIdentificationPolicy } from '../engine.mjs';
import {
  compileCleavageScenario,
  makeCleavageIdentificationExperiment,
  maximalSingletonPathWords,
  planCleavage,
} from '../adapters/idealized-cleavage.mjs';
import { planFiniteState } from '../adapters/finite-state.mjs';

function synchronizationSpec() {
  const pathWords = ['010', '012', '101', '210'];
  const nodes = [{ id: 'core', parent: null, target: true, label: 'Protected core' }];
  const susceptible = { E0: [], E1: [], E2: [] };
  for (let p = 0; p < pathWords.length; p++) {
    const word = pathWords[p];
    for (let i = 0; i < word.length; i++) {
      const id = `p${p + 1}-${i + 1}`;
      const parent = i === word.length - 1 ? 'core' : `p${p + 1}-${i + 2}`;
      nodes.push({ id, parent, target: false, label: `Path ${p + 1} residue ${i + 1}` });
      susceptible[`E${word[i]}`].push(id);
    }
  }
  return {
    id: 'higher-order-synchronization',
    label: 'Higher-order synchronization',
    description: 'Exact research-derived four-path instance. Every three paths admit five phases, but all four require six.',
    nodes,
    enzymes: [0, 1, 2].map(i => ({ id: `E${i}`, label: `Treatment class ${i}`, susceptible: susceptible[`E${i}`] })),
    metadata: {
      evidence: 'Published glycan phase-algebra example: compressed path words 010, 012, 101, 210; OPT = 6.',
      laboratoryStatus: 'Abstract effective treatment classes; not a wet-lab prescription.',
    },
  };
}

function selectiveSpec() {
  return {
    id: 'selective-cleavage',
    label: 'Selective cleavage with preservation constraint',
    description: 'Shows how the same transition model can optimize a partial-removal goal while protecting an exposed branch.',
    nodes: [
      { id: 'core', parent: null, target: true, label: 'Protected core' },
      { id: 'a1', parent: 'core', label: 'Branch A inner' },
      { id: 'a2', parent: 'a1', label: 'Branch A terminal' },
      { id: 'b1', parent: 'core', label: 'Branch B inner' },
      { id: 'b2', parent: 'b1', label: 'Branch B terminal' },
    ],
    enzymes: [
      { id: 'broad-terminal', label: 'Broad terminal treatment', susceptible: ['a2', 'b2'] },
      { id: 'A-terminal', label: 'A-selective terminal treatment', susceptible: ['a2'] },
      { id: 'A-inner', label: 'A-selective inner treatment', susceptible: ['a1'] },
      { id: 'B-terminal', label: 'B-selective terminal treatment', susceptible: ['b2'] },
    ],
    metadata: {
      laboratoryStatus: 'Synthetic demonstration of preservation constraints; enzyme names are schematic.',
    },
  };
}

function sequencingCandidate(id, e0, e1) {
  const nodes = [
    { id: 'core', parent: null, target: true, label: 'Protected core' },
    { id: 'x', parent: 'core', label: 'Reporter X' },
    { id: 'y', parent: 'core', label: 'Reporter Y' },
    { id: 'z', parent: 'core', label: 'Reporter Z' },
  ];
  return compileCleavageScenario({
    id,
    label: id,
    nodes,
    enzymes: [
      { id: 'E0', label: 'Diagnostic treatment E0', susceptible: e0 },
      { id: 'E1', label: 'Diagnostic treatment E1', susceptible: e1 },
    ],
  });
}

function sequencingExample() {
  const models = [
    sequencingCandidate('Candidate A', ['x'], []),
    sequencingCandidate('Candidate B', ['x'], ['z']),
    sequencingCandidate('Candidate C', ['x', 'y'], []),
    sequencingCandidate('Candidate D', ['x', 'y'], ['z']),
  ];
  const candidates = models.map(model => ({
    id: model.id,
    label: model.label,
    state: model.initialState,
    meta: { model },
  }));
  const experiments = [
    makeCleavageIdentificationExperiment('E0', 'newly-removed-count'),
    makeCleavageIdentificationExperiment('E1', 'newly-removed-count'),
  ];
  experiments[0].label = 'Apply diagnostic treatment E0';
  experiments[1].label = 'Apply diagnostic treatment E1';
  return { candidates, experiments, models };
}

function validationExample() {
  const expected = sequencingCandidate('Expected profile', ['x'], ['z']);
  const deviationA = sequencingCandidate('Deviation A', ['x', 'y'], ['z']);
  const deviationB = sequencingCandidate('Deviation B', ['x'], ['y', 'z']);
  const candidates = [
    { id: 'EXPECTED', label: 'Expected profile', state: expected.initialState, meta: { model: expected } },
    { id: 'DEVIATION', label: 'Represented deviation', state: deviationA.initialState, meta: { model: deviationA } },
    { id: 'DEVIATION', label: 'Represented deviation', state: deviationB.initialState, meta: { model: deviationB } },
  ];
  const experiments = [
    makeCleavageIdentificationExperiment('E0', 'newly-removed-count'),
    makeCleavageIdentificationExperiment('E1', 'newly-removed-count'),
  ];
  experiments[0].label = 'QC probe E0';
  experiments[1].label = 'QC probe E1';
  return { candidates, experiments, models: [expected, deviationA, deviationB] };
}

function remodelingSpec() {
  return {
    id: 'remodeling-path',
    label: 'Remodeling path optimization',
    description: 'Demonstrates planning over a general glycan-state transition network rather than deletion-only chemistry.',
    states: ['Start glycoform', 'Trimmed intermediate', 'Extended intermediate', 'Alternate intermediate', 'Target glycoform'],
    initial: 'Start glycoform',
    target: 'Target glycoform',
    operations: [
      {
        id: 'trim', label: 'Glycosidase trim', cost: 1,
        description: 'Illustrative trimming operation.',
        transitions: { 'Start glycoform': 'Trimmed intermediate' },
      },
      {
        id: 'extend', label: 'Transferase extension', cost: 1,
        description: 'Illustrative addition operation.',
        transitions: { 'Trimmed intermediate': 'Extended intermediate' },
      },
      {
        id: 'finish', label: 'Terminal transfer', cost: 1,
        description: 'Illustrative target-forming operation.',
        transitions: { 'Extended intermediate': 'Target glycoform' },
      },
      {
        id: 'alternate', label: 'Broad remodeling reagent', cost: 4,
        description: 'More expensive direct route used to demonstrate weighted optimization.',
        transitions: { 'Start glycoform': 'Target glycoform' },
      },
      {
        id: 'detour', label: 'Off-path transfer', cost: 1,
        transitions: { 'Start glycoform': 'Alternate intermediate', 'Alternate intermediate': 'Trimmed intermediate' },
      },
    ],
    metadata: {
      laboratoryStatus: 'Synthetic state-transition demonstration; not a chemically validated protocol.',
    },
  };
}

export const exampleCatalog = [
  {
    id: 'higher-order-synchronization',
    mode: 'complete-cleavage',
    title: 'Exact complete-cleavage optimization',
    subtitle: 'Research-derived three-class synchronization witness',
    description: 'Finds and certifies the minimum global treatment sequence for four branched paths whose constraints cannot be resolved by three-path reasoning alone.',
  },
  {
    id: 'selective-cleavage',
    mode: 'selective-cleavage',
    title: 'Selective cleavage',
    subtitle: 'Remove one branch while preserving another',
    description: 'Optimizes against a partial-removal objective instead of assuming that every non-target residue must be digested.',
  },
  {
    id: 'adaptive-sequencing',
    mode: 'sequencing',
    title: 'Adaptive glycan sequencing',
    subtitle: 'Choose experiments by information gain and worst-case cost',
    description: 'Builds an adaptive decision policy: observe a digestion result, reduce the candidate set, update candidate states, and choose the next experiment.',
  },
  {
    id: 'validation-qc',
    mode: 'validation',
    title: 'Structure validation / QC',
    subtitle: 'Confirm an expected represented profile or flag a deviation',
    description: 'Uses the adaptive experiment engine as a classifier: the exact deviation subtype does not need to be identified once the expected-vs-deviation question is resolved.',
  },
  {
    id: 'remodeling-path',
    mode: 'remodeling',
    title: 'Glycan remodeling',
    subtitle: 'Plan through a general transformation network',
    description: 'Uses the same optimizer over a non-deletion state-transition adapter to show that the engine is not tied to cleavage.',
  },
];

export function runExample(id) {
  if (id === 'higher-order-synchronization') {
    const spec = synchronizationSpec();
    const model = compileCleavageScenario(spec);
    const result = planCleavage(model, { remove: 'all-nontarget' });
    return {
      id,
      mode: 'complete-cleavage',
      title: exampleCatalog.find(x => x.id === id).title,
      summary: {
        status: result.status,
        optimumPhases: result.phaseCount,
        totalCost: result.totalCost,
        expectedOptimum: 6,
        expandedStates: result.expandedStates,
      },
      result,
      pathAnalysis: maximalSingletonPathWords(model),
      notes: [
        'This is the exact four-path witness from the published idealized model.',
        'The class labels E0/E1/E2 are effective treatment classes, not claims about named commercial enzymes.',
      ],
    };
  }
  if (id === 'selective-cleavage') {
    const spec = selectiveSpec();
    const model = compileCleavageScenario(spec);
    const objective = { remove: ['a1', 'a2'], preserve: ['b1', 'b2'] };
    const result = planCleavage(model, objective);
    return {
      id,
      mode: 'selective-cleavage',
      title: exampleCatalog.find(x => x.id === id).title,
      summary: {
        status: result.status,
        optimumPhases: result.phaseCount,
        totalCost: result.totalCost,
        preservationConstraint: 'b1,b2 remain active',
      },
      result,
      notes: ['Synthetic enzyme labels make the constraint mechanics visible without presenting an unvalidated wet-lab protocol.'],
    };
  }
  if (id === 'adaptive-sequencing') {
    const { candidates, experiments, models } = sequencingExample();
    const result = optimalIdentificationPolicy({ candidates, experiments, maxDepth: 5 });
    return {
      id,
      mode: 'sequencing',
      title: exampleCatalog.find(x => x.id === id).title,
      summary: {
        status: result.status,
        candidates: result.candidateCount,
        experiments: result.experimentCount,
        worstCaseCost: result.policy.worstCost ?? null,
        expectedCost: result.policy.expectedCost ?? null,
      },
      result,
      candidateModels: models.map(m => ({
        id: m.id,
        nodes: m.nodes.map(n => ({ id: n.id, parent: n.parent, target: n.target, label: n.label })),
        enzymes: m.enzymes.map(e => ({ id: e.id, susceptible: [...e.susceptible].sort() })),
      })),
      notes: [
        'The observation in this demonstration is the number of residues newly removed by each diagnostic treatment.',
        'The engine supports stateful adaptive sequencing: each candidate carries its updated post-treatment state into the next decision.',
      ],
    };
  }
  if (id === 'validation-qc') {
    const { candidates, experiments, models } = validationExample();
    const result = optimalIdentificationPolicy({ candidates, experiments, maxDepth: 4 });
    return {
      id,
      mode: 'sequencing',
      title: exampleCatalog.find(x => x.id === id).title,
      summary: {
        status: result.status,
        classifications: result.candidateCount,
        representedModels: models.length,
        experiments: result.experimentCount,
        worstCaseCost: result.policy.worstCost ?? null,
      },
      result,
      candidateModels: models.map(m => ({
        id: m.id,
        nodes: m.nodes.map(n => ({ id: n.id, parent: n.parent, target: n.target, label: n.label })),
        enzymes: m.enzymes.map(e => ({ id: e.id, susceptible: [...e.susceptible].sort() })),
      })),
      notes: [
        'This demonstration answers a classification question: expected represented profile versus represented deviation.',
        'Multiple deviation models intentionally share one classification ID, so the policy may stop as soon as the validation/QC question is settled.',
        'Probe labels and response models are schematic and are not a validated clinical or manufacturing assay.',
      ],
    };
  }
  if (id === 'remodeling-path') {
    const spec = remodelingSpec();
    const result = planFiniteState(spec);
    return {
      id,
      mode: 'remodeling',
      title: exampleCatalog.find(x => x.id === id).title,
      summary: {
        status: result.status,
        operations: result.phaseCount,
        totalCost: result.totalCost,
        directRouteCost: 4,
      },
      result,
      notes: ['This demonstrates the general transition-planning interface. The chemistry is schematic, not a validated biological recipe.'],
    };
  }
  throw new Error(`Unknown example ${id}.`);
}

export function exampleById(id) {
  return exampleCatalog.find(x => x.id === id) ?? null;
}
