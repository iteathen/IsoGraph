const $ = sel => document.querySelector(sel);
const els = {
  exampleList: $('#example-list'),
  title: $('#example-title'),
  description: $('#example-description'),
  modeTag: $('#mode-tag'),
  run: $('#run-button'),
  metrics: $('#metrics'),
  graph: $('#graph'),
  protocol: $('#protocol'),
  protocolTitle: $('#protocol-title'),
  certificate: $('#certificate'),
  legend: $('#legend'),
  customButton: $('#custom-button'),
  customPanel: $('#custom-panel'),
  loadTemplate: $('#load-template'),
  scenarioJson: $('#scenario-json'),
  objectiveJson: $('#objective-json'),
  runCustom: $('#run-custom'),
  customStatus: $('#custom-status'),
};

let catalog = [];
let selected = null;

const modeNames = {
  'complete-cleavage': 'Complete cleavage',
  'selective-cleavage': 'Selective cleavage',
  'sequencing': 'Adaptive sequencing',
  'remodeling': 'Remodeling',
};

function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else el.setAttribute(k, v);
  }
  for (const child of Array.isArray(children) ? children : [children]) {
    if (child == null) continue;
    el.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return el;
}

async function api(path, body) {
  const res = await fetch(path, body == null ? undefined : {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data;
}

function selectExample(id) {
  selected = catalog.find(x => x.id === id);
  for (const card of els.exampleList.querySelectorAll('.example-card')) card.classList.toggle('active', card.dataset.id === id);
  els.title.textContent = selected.title;
  els.description.textContent = selected.description;
  els.modeTag.textContent = modeNames[selected.mode] ?? selected.mode;
  els.run.disabled = false;
  els.customPanel.hidden = true;
}

function renderCatalog() {
  els.exampleList.textContent = '';
  for (const x of catalog) {
    const card = h('button', { class: 'example-card', 'data-id': x.id }, [
      h('span', { class: 'mode', text: modeNames[x.mode] ?? x.mode }),
      h('strong', { text: x.title }),
      h('small', { text: x.subtitle }),
    ]);
    card.addEventListener('click', () => selectExample(x.id));
    els.exampleList.append(card);
  }
}

function prettyValue(v) {
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toFixed(2);
  if (v == null) return '—';
  if (typeof v === 'string') return v;
  return JSON.stringify(v);
}

function renderMetrics(summary = {}) {
  els.metrics.textContent = '';
  const entries = Object.entries(summary).filter(([, v]) => ['string', 'number', 'boolean'].includes(typeof v)).slice(0, 4);
  for (const [k, v] of entries) {
    const label = k.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ');
    els.metrics.append(h('div', { class: 'metric' }, [
      h('div', { class: 'k', text: label }),
      h('div', { class: 'v', text: prettyValue(v) }),
    ]));
  }
  els.metrics.hidden = entries.length === 0;
}

function treeLayout(nodes) {
  const byId = new Map(nodes.map(n => [n.id, n]));
  const children = new Map(nodes.map(n => [n.id, []]));
  const roots = [];
  for (const n of nodes) {
    if (n.parent != null && children.has(n.parent)) children.get(n.parent).push(n.id);
    else roots.push(n.id);
  }
  const depth = new Map();
  function setDepth(id, d) {
    depth.set(id, d);
    for (const c of children.get(id) ?? []) setDepth(c, d + 1);
  }
  roots.forEach(r => setDepth(r, 0));
  let leafCounter = 0;
  const xpos = new Map();
  function assignX(id) {
    const cs = children.get(id) ?? [];
    if (!cs.length) {
      const x = 70 + leafCounter++ * 125;
      xpos.set(id, x);
      return x;
    }
    const xs = cs.map(assignX);
    const x = xs.reduce((a, b) => a + b, 0) / xs.length;
    xpos.set(id, x);
    return x;
  }
  roots.forEach(assignX);
  const maxDepth = Math.max(0, ...depth.values());
  const width = Math.max(620, 140 + Math.max(1, leafCounter - 1) * 125);
  const height = Math.max(390, 110 + maxDepth * 90);
  return { byId, children, depth, xpos, width, height };
}

function renderGraph(model, removedIds = []) {
  if (!model?.nodes?.length) {
    els.graph.className = 'graph-canvas empty-state';
    els.graph.textContent = 'This workflow uses a state transition network rather than a residue tree.';
    els.legend.textContent = '';
    return;
  }
  els.graph.className = 'graph-canvas';
  els.graph.textContent = '';
  const removed = new Set(removedIds);
  const layout = treeLayout(model.nodes);
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${layout.width} ${layout.height}`);
  svg.setAttribute('width', layout.width);
  svg.setAttribute('height', layout.height);

  for (const n of model.nodes) {
    if (n.parent == null || !layout.xpos.has(n.parent)) continue;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('class', 'edge');
    line.setAttribute('x1', layout.xpos.get(n.parent));
    line.setAttribute('y1', 55 + layout.depth.get(n.parent) * 90);
    line.setAttribute('x2', layout.xpos.get(n.id));
    line.setAttribute('y2', 55 + layout.depth.get(n.id) * 90);
    svg.append(line);
  }

  for (const n of model.nodes) {
    const g = document.createElementNS(ns, 'g');
    const x = layout.xpos.get(n.id);
    const y = 55 + layout.depth.get(n.id) * 90;
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 18);
    circle.setAttribute('class', `node-circle${n.target ? ' target' : ''}${removed.has(n.id) ? ' removed' : ''}`);
    g.append(circle);
    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y + 34);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('class', 'node-label');
    text.textContent = n.label ?? n.id;
    g.append(text);
    const sub = document.createElementNS(ns, 'text');
    sub.setAttribute('x', x);
    sub.setAttribute('y', y + 48);
    sub.setAttribute('text-anchor', 'middle');
    sub.setAttribute('class', 'node-sub');
    sub.textContent = n.target ? 'protected' : n.id;
    g.append(sub);
    svg.append(g);
  }
  els.graph.append(svg);
  els.legend.innerHTML = '<span>removable site</span><span class="target">protected target</span>';
}

function renderCleavageProtocol(result) {
  els.protocol.className = 'protocol';
  els.protocol.textContent = '';
  const list = h('div', { class: 'timeline' });
  for (const p of result.phases ?? []) {
    list.append(h('div', { class: 'phase', 'data-step': p.phase }, [
      h('strong', { text: p.label }),
      h('small', { text: `${p.newlyRemoved.length} newly removed · ${p.remaining} non-target sites remain · cumulative cost ${p.costAfter}` }),
      h('small', { text: p.newlyRemoved.length ? `Removed: ${p.newlyRemoved.join(', ')}` : 'No new removals' }),
    ]));
  }
  els.protocol.append(list);
  els.protocolTitle.textContent = 'Minimum protocol';
}

function renderTransitionProtocol(result) {
  els.protocol.className = 'protocol';
  els.protocol.textContent = '';
  const list = h('div', { class: 'timeline' });
  let state = result.model.initial;
  for (const step of result.steps ?? []) {
    const next = step.state.value;
    list.append(h('div', { class: 'phase', 'data-step': step.index }, [
      h('strong', { text: step.operation.label }),
      h('small', { text: `${state} → ${next} · cumulative cost ${step.costAfter}` }),
    ]));
    state = next;
  }
  els.protocol.append(list);
  els.protocolTitle.textContent = 'Minimum transformation path';
}

function policyNode(policy) {
  if (!policy) return h('div', { class: 'policy-node', text: 'No policy.' });
  if (policy.status === 'IDENTIFIED') {
    return h('div', { class: 'policy-node' }, [
      h('div', { class: 'title', text: `Identified: ${policy.label ?? policy.candidate}` }),
    ]);
  }
  if (policy.status !== 'POLICY') return h('div', { class: 'policy-node', text: policy.status });
  const root = h('div', { class: 'policy-node experiment' }, [
    h('div', { class: 'title', text: policy.experiment.label }),
    h('div', { class: 'meta', text: `${policy.candidateCount} candidates · worst remaining cost ${prettyValue(policy.worstCost)}` }),
  ]);
  const children = h('div', { class: 'policy-children' });
  for (const b of policy.branches) {
    const wrap = h('div');
    wrap.append(h('span', { class: 'observation-chip', text: `Observe ${prettyValue(b.observation)}` }));
    wrap.append(policyNode(b.policy));
    children.append(wrap);
  }
  root.append(children);
  return root;
}

function renderPolicy(result) {
  els.protocol.className = 'protocol';
  els.protocol.textContent = '';
  const tree = h('div', { class: 'policy-tree' }, policyNode(result.policy));
  els.protocol.append(tree);
  els.protocolTitle.textContent = 'Adaptive experiment policy';
}

function renderCertificate(data) {
  els.certificate.className = 'certificate';
  els.certificate.textContent = '';
  const cards = h('div', { class: 'certificate-grid' });
  const result = data.result ?? {};
  if (data.mode === 'sequencing') {
    cards.append(
      cert('Decision objective', result.objective ?? 'Adaptive identification'),
      cert('Policy search', `${result.memoStates ?? 0} memoized candidate-state sets evaluated.`),
      cert('Scope', 'Deterministic represented experiments and observations; output is only as chemically valid as the supplied transition/measurement adapter.'),
    );
  } else {
    const certificate = result.certificate ?? {};
    cards.append(
      cert('Planner status', result.status ?? data.summary?.status ?? 'unknown'),
      cert('Optimality method', certificate.optimality ?? certificate.method ?? 'Exact shortest-path planning over the supplied finite transition model.'),
      cert('Model boundary', data.notes?.join(' ') ?? 'Represented-state result; not an automatic wet-lab validation.'),
    );
  }
  if (data.pathAnalysis?.status === 'OK') {
    cards.append(cert('Maximal-path constraints', data.pathAnalysis.paths.map(p => p.compressed.join('')).join(' · ')));
  }
  els.certificate.append(cards);
}

function cert(title, text) {
  return h('div', { class: 'cert-card' }, [h('strong', { text: title }), h('p', { text: String(text) })]);
}

function renderResult(data) {
  renderMetrics(data.summary ?? {});
  const r = data.result ?? {};
  if (data.mode === 'sequencing') {
    const first = data.candidateModels?.[0];
    renderGraph(first ? { nodes: first.nodes } : null);
    renderPolicy(r);
  } else if (data.mode === 'remodeling' || data.mode === 'custom-transition-network') {
    renderGraph(null);
    renderTransitionProtocol(r);
  } else {
    renderGraph(r.model, r.finalState?.removed ?? []);
    renderCleavageProtocol(r);
  }
  renderCertificate(data);
}

async function runSelected() {
  if (!selected) return;
  els.run.disabled = true;
  els.run.textContent = 'Planning…';
  try {
    const data = await api('/api/run-example', { id: selected.id });
    renderResult(data);
  } catch (error) {
    els.certificate.className = 'certificate';
    els.certificate.textContent = error.message;
  } finally {
    els.run.disabled = false;
    els.run.textContent = 'Run planner';
  }
}

const customTemplate = {
  scenario: {
    id: 'custom-example',
    label: 'Custom selective cleavage',
    nodes: [
      { id: 'core', parent: null, target: true, label: 'Protected core' },
      { id: 'a', parent: 'core', label: 'Inner residue' },
      { id: 'b', parent: 'a', label: 'Terminal residue' },
    ],
    enzymes: [
      { id: 'E1', label: 'Treatment E1', susceptible: ['b'] },
      { id: 'E2', label: 'Treatment E2', susceptible: ['a'] },
    ],
  },
  objective: { remove: 'all-nontarget' },
};

function loadTemplate() {
  els.scenarioJson.value = JSON.stringify(customTemplate.scenario, null, 2);
  els.objectiveJson.value = JSON.stringify(customTemplate.objective, null, 2);
}

async function runCustom() {
  els.customStatus.textContent = 'Planning…';
  try {
    const scenario = JSON.parse(els.scenarioJson.value);
    const objective = JSON.parse(els.objectiveJson.value);
    const data = await api('/api/plan-cleavage', { scenario, objective });
    data.summary = {
      status: data.result.status,
      optimumPhases: data.result.phaseCount,
      totalCost: data.result.totalCost,
      expandedStates: data.result.expandedStates,
    };
    data.notes = ['Custom result is exact for the supplied idealized susceptibility model.'];
    renderResult(data);
    els.customStatus.textContent = 'Complete.';
  } catch (error) {
    els.customStatus.textContent = error.message;
  }
}

els.run.addEventListener('click', runSelected);
els.customButton.addEventListener('click', () => {
  els.customPanel.hidden = !els.customPanel.hidden;
  if (!els.customPanel.hidden && !els.scenarioJson.value) loadTemplate();
});
els.loadTemplate.addEventListener('click', loadTemplate);
els.runCustom.addEventListener('click', runCustom);

(async function init() {
  try {
    const data = await api('/api/examples');
    catalog = data.examples;
    renderCatalog();
    if (catalog[0]) selectExample(catalog[0].id);
  } catch (error) {
    els.exampleList.textContent = `Unable to load examples: ${error.message}`;
  }
})();
