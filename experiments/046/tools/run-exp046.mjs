import fs from 'node:fs';

const OUT = 'out/exp046';
fs.mkdirSync(OUT, { recursive: true });

const ALPHABET = 3;
const PL = 9;
const WL = 18;
const TRIALS = 128;

function generateWords(length) {
  const count = ALPHABET * (2 ** (length - 1));
  const flat = new Uint8Array(count * length);
  const cur = new Uint8Array(length);
  let row = 0;

  function rec(pos, prev) {
    if (pos === length) {
      flat.set(cur, row * length);
      row++;
      return;
    }
    for (let a = 0; a < ALPHABET; a++) {
      if (pos > 0 && a === prev) continue;
      cur[pos] = a;
      rec(pos + 1, a);
    }
  }

  rec(0, -1);
  if (row !== count) throw new Error(`word generation mismatch ${row} != ${count}`);
  return flat;
}

function wordString(flat, row, length) {
  const off = row * length;
  let s = '';
  for (let i = 0; i < length; i++) s += String(flat[off + i]);
  return s;
}

class XorShift32 {
  constructor(seed) { this.x = seed >>> 0; }
  next() {
    let x = this.x >>> 0;
    x ^= (x << 13) >>> 0;
    x ^= x >>> 17;
    x ^= (x << 5) >>> 0;
    this.x = x >>> 0;
    return this.x;
  }
}

const totalStart = process.hrtime.bigint();

const genStart = process.hrtime.bigint();
const paths = generateWords(PL);
const words = generateWords(WL);
const P = paths.length / PL;
const U = words.length / WL;
const generationMs = Number(process.hrtime.bigint() - genStart) / 1e6;

if (P !== 768 || U !== 393216) {
  throw new Error(`unexpected dimensions P=${P} U=${U}`);
}

// Branchless per-word subsequence transition table.
// State s=0..WL is the next threshold-word position to search.
// FAIL_STATE is an absorbing failure sink.
const transitionStart = process.hrtime.bigint();
const FAIL_STATE = WL + 1;       // 19
const NEXT_STATES = WL + 2;      // 20
const NEXT_STRIDE = NEXT_STATES * ALPHABET; // 60
let nextState = new Uint8Array(U * NEXT_STRIDE);

for (let u = 0; u < U; u++) {
  const base = u * NEXT_STRIDE;
  const wo = u * WL;
  const sink = base + FAIL_STATE * 3;

  nextState[sink] = FAIL_STATE;
  nextState[sink + 1] = FAIL_STATE;
  nextState[sink + 2] = FAIL_STATE;

  let n0 = FAIL_STATE;
  let n1 = FAIL_STATE;
  let n2 = FAIL_STATE;

  for (let s = WL; s >= 0; s--) {
    if (s < WL) {
      const sym = words[wo + s];
      const next = s + 1;
      if (sym === 0) n0 = next;
      else if (sym === 1) n1 = next;
      else n2 = next;
    }

    const off = base + s * 3;
    nextState[off] = n0;
    nextState[off + 1] = n1;
    nextState[off + 2] = n2;
  }
}

const transitionMs = Number(process.hrtime.bigint() - transitionStart) / 1e6;

// Pass 1: exact failure count per threshold word.
// No row-incidence matrix is retained.
const countStart = process.hrtime.bigint();
const baseCount = new Uint16Array(U);

for (let p = 0; p < P; p++) {
  const po = p * PL;
  const p0 = paths[po];
  const p1 = paths[po + 1];
  const p2 = paths[po + 2];
  const p3 = paths[po + 3];
  const p4 = paths[po + 4];
  const p5 = paths[po + 5];
  const p6 = paths[po + 6];
  const p7 = paths[po + 7];
  const p8 = paths[po + 8];

  for (let u = 0; u < U; u++) {
    const nb = u * NEXT_STRIDE;
    let s = 0;
    s = nextState[nb + s * 3 + p0];
    s = nextState[nb + s * 3 + p1];
    s = nextState[nb + s * 3 + p2];
    s = nextState[nb + s * 3 + p3];
    s = nextState[nb + s * 3 + p4];
    s = nextState[nb + s * 3 + p5];
    s = nextState[nb + s * 3 + p6];
    s = nextState[nb + s * 3 + p7];
    s = nextState[nb + s * 3 + p8];

    if (s === FAIL_STATE) baseCount[u]++;
  }
}

const countPassMs = Number(process.hrtime.bigint() - countStart) / 1e6;

// Prefix offsets for threshold-word -> failing-path CSR.
const transposeStart = process.hrtime.bigint();
const coverOffset = new Uint32Array(U + 1);
for (let u = 0; u < U; u++) {
  const count = baseCount[u];
  if (count === 0) throw new Error(`all-path family leaves threshold word ${u} uncovered`);
  coverOffset[u + 1] = coverOffset[u] + count;
}

const totalIncidence = coverOffset[U];
const coverers = new Uint16Array(totalIncidence);
const coverFill = new Uint32Array(U);
coverFill.set(coverOffset.subarray(0, U));

// Pass 2: recompute exact incidence and fill CSR directly.
for (let p = 0; p < P; p++) {
  const po = p * PL;
  const p0 = paths[po];
  const p1 = paths[po + 1];
  const p2 = paths[po + 2];
  const p3 = paths[po + 3];
  const p4 = paths[po + 4];
  const p5 = paths[po + 5];
  const p6 = paths[po + 6];
  const p7 = paths[po + 7];
  const p8 = paths[po + 8];

  for (let u = 0; u < U; u++) {
    const nb = u * NEXT_STRIDE;
    let s = 0;
    s = nextState[nb + s * 3 + p0];
    s = nextState[nb + s * 3 + p1];
    s = nextState[nb + s * 3 + p2];
    s = nextState[nb + s * 3 + p3];
    s = nextState[nb + s * 3 + p4];
    s = nextState[nb + s * 3 + p5];
    s = nextState[nb + s * 3 + p6];
    s = nextState[nb + s * 3 + p7];
    s = nextState[nb + s * 3 + p8];

    if (s === FAIL_STATE) coverers[coverFill[u]++] = p;
  }
}

const transposeMs = Number(process.hrtime.bigint() - transposeStart) / 1e6;

// Transition table no longer participates in the search.
nextState = null;

// Initialize exact two-watcher state and intrusive watcher lists.
const watchInitStart = process.hrtime.bigint();
const NO_WATCH = 0xffff;
const NO_NODE = 0xffffffff;
const WATCH_NODES = U * 2;

const baseWatchOwner = new Uint16Array(WATCH_NODES);
baseWatchOwner.fill(NO_WATCH);
const baseWatchNext = new Uint32Array(WATCH_NODES);
baseWatchNext.fill(NO_NODE);
const baseWatchHead = new Uint32Array(P);
baseWatchHead.fill(NO_NODE);
const baseNextCover = new Uint32Array(U);
const basePrivateCount = new Uint32Array(P);

for (let u = 0; u < U; u++) {
  const begin = coverOffset[u];
  const finish = coverOffset[u + 1];
  const len = finish - begin;

  const nodeA = u << 1;
  const a = coverers[begin];
  baseWatchOwner[nodeA] = a;
  baseWatchNext[nodeA] = baseWatchHead[a];
  baseWatchHead[a] = nodeA;

  if (len === 1) {
    basePrivateCount[a]++;
    baseNextCover[u] = finish;
  } else {
    const nodeB = nodeA + 1;
    const b = coverers[begin + 1];
    baseWatchOwner[nodeB] = b;
    baseWatchNext[nodeB] = baseWatchHead[b];
    baseWatchHead[b] = nodeB;
    baseNextCover[u] = begin + 2;
  }
}

const watchInitMs = Number(process.hrtime.bigint() - watchInitStart) / 1e6;

// Deterministic 128-order deletion search.
const rng = new XorShift32(0x04612026);
const order = new Uint16Array(P);
const rank = new Uint16Array(P);
const selected = new Uint8Array(P);
const watchOwner = new Uint16Array(WATCH_NODES);
const watchNext = new Uint32Array(WATCH_NODES);
const watchHead = new Uint32Array(P);
const nextCover = new Uint32Array(U);
const privateCount = new Uint32Array(P);
const histogram = new Uint32Array(P + 1);

let bestSize = -1;
let bestTrial = -1;
let bestSelected = null;

const searchStart = process.hrtime.bigint();

for (let trial = 0; trial < TRIALS; trial++) {
  selected.fill(1);
  watchOwner.set(baseWatchOwner);
  watchNext.set(baseWatchNext);
  watchHead.set(baseWatchHead);
  nextCover.set(baseNextCover);
  privateCount.set(basePrivateCount);

  let size = P;

  for (let i = 0; i < P; i++) order[i] = i;
  for (let i = P - 1; i > 0; i--) {
    const j = rng.next() % (i + 1);
    const t = order[i];
    order[i] = order[j];
    order[j] = t;
  }
  for (let i = 0; i < P; i++) rank[order[i]] = i;

  for (let oi = 0; oi < P; oi++) {
    const p = order[oi];

    if (privateCount[p] !== 0) continue;

    selected[p] = 0;
    size--;

    let node = watchHead[p];
    while (node !== NO_NODE) {
      const nextNode = watchNext[node];
      const u = node >>> 1;
      const other = watchOwner[node ^ 1];

      if (other === NO_WATCH) {
        throw new Error(`attempted removal of sole watcher ${p} for threshold word ${u}`);
      }

      let cursor = nextCover[u];
      const finish = coverOffset[u + 1];
      let replacement = NO_WATCH;

      for (; cursor < finish; cursor++) {
        const r = coverers[cursor];
        if (r !== other && selected[r]) {
          replacement = r;
          cursor++;
          break;
        }
      }
      nextCover[u] = cursor;

      if (replacement === NO_WATCH) {
        watchOwner[node] = NO_WATCH;
        privateCount[other]++;
      } else {
        watchOwner[node] = replacement;
        if (rank[replacement] > oi) {
          watchNext[node] = watchHead[replacement];
          watchHead[replacement] = node;
        }
      }

      node = nextNode;
    }
  }

  histogram[size]++;
  if (size > bestSize) {
    bestSize = size;
    bestTrial = trial;
    bestSelected = Uint8Array.from(selected);
  }
}

const searchMs = Number(process.hrtime.bigint() - searchStart) / 1e6;

// Exact post-search verification from CSR only.
const verifyStart = process.hrtime.bigint();
let uncovered = 0;
const privateWord = new Int32Array(P);
privateWord.fill(-1);

for (let u = 0; u < U; u++) {
  let owner = -1;
  let selectedCount = 0;

  for (let i = coverOffset[u], end = coverOffset[u + 1]; i < end; i++) {
    const p = coverers[i];
    if (!bestSelected[p]) continue;

    selectedCount++;
    if (selectedCount === 1) owner = p;
    else break;
  }

  if (selectedCount === 0) {
    uncovered++;
  } else if (selectedCount === 1 && privateWord[owner] < 0) {
    privateWord[owner] = u;
  }
}

const selectedIds = [];
let missingPrivate = 0;
for (let p = 0; p < P; p++) {
  if (!bestSelected[p]) continue;
  selectedIds.push(p);
  if (privateWord[p] < 0) missingPrivate++;
}

const verifyMs = Number(process.hrtime.bigint() - verifyStart) / 1e6;

const histogramObject = {};
for (let size = 0; size <= P; size++) {
  if (histogram[size]) histogramObject[String(size)] = histogram[size];
}

const pass = uncovered === 0 && missingPrivate === 0 && selectedIds.length === bestSize;

const selectedPaths = selectedIds.map(p => wordString(paths, p, PL));
const privateWitnesses = selectedIds.map(p => ({
  path: wordString(paths, p, PL),
  word: privateWord[p] >= 0 ? wordString(words, privateWord[p], WL) : ''
}));

const result = {
  experiment: '046',
  disposition: pass ? 'PASS' : 'FAIL',
  implementation_language: 'Node.js',
  node_version: process.version,
  optimization_revision: 'csr-two-pass-intrusive-watchers-v1',
  alphabet_size: ALPHABET,
  candidate_path_length: PL,
  candidate_path_count: P,
  threshold_length: WL,
  threshold_universe_size: U,
  randomized_trials: TRIALS,
  best_trial: bestTrial,
  best_cover_size: bestSize,
  threshold_uncovered_words: uncovered,
  missing_private_witnesses: missingPrivate,
  exact_witness_width: pass ? bestSize : -1,
  total_glycan_non_target_nodes: pass ? bestSize * PL : 0,
  generation_ms: generationMs,
  transition_ms: transitionMs,
  count_pass_ms: countPassMs,
  transpose_fill_ms: transposeMs,
  watch_init_ms: watchInitMs,
  search_ms: searchMs,
  verification_ms: verifyMs,
  total_incidence: totalIncidence,
  coverer_bytes: coverers.byteLength,
  total_ms: Number(process.hrtime.bigint() - totalStart) / 1e6,
  cover_size_histogram: histogramObject,
  selected_paths: selectedPaths,
  private_witnesses: privateWitnesses
};

fs.writeFileSync(`${OUT}/RESULT.json`, JSON.stringify(result, null, 2) + '\n');

console.log(JSON.stringify({
  experiment: result.experiment,
  disposition: result.disposition,
  implementation_language: result.implementation_language,
  best_cover_size: result.best_cover_size,
  threshold_uncovered_words: result.threshold_uncovered_words,
  missing_private_witnesses: result.missing_private_witnesses,
  total_incidence: result.total_incidence,
  coverer_mb: result.coverer_bytes / 1048576,
  generation_ms: result.generation_ms,
  transition_ms: result.transition_ms,
  count_pass_ms: result.count_pass_ms,
  transpose_fill_ms: result.transpose_fill_ms,
  watch_init_ms: result.watch_init_ms,
  search_ms: result.search_ms,
  verification_ms: result.verification_ms,
  total_ms: result.total_ms
}, null, 2));

if (!pass) process.exitCode = 1;
