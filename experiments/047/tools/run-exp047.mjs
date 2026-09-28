import fs from 'node:fs';

const OUT = 'out/exp047';
fs.mkdirSync(OUT, { recursive: true });

const ALPHABET = 3;
const PL = 10;
const WL = 20;
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
  let s = '';
  const off = row * length;
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

function lowBitIndex(mask) {
  const lsb = mask & -mask;
  return 31 - Math.clz32(lsb);
}

const totalStart = process.hrtime.bigint();

const generationStart = process.hrtime.bigint();
const paths = generateWords(PL);
const words = generateWords(WL);
const P = paths.length / PL;
const U = words.length / WL;
const generationMs = Number(process.hrtime.bigint() - generationStart) / 1e6;

if (P !== 1536 || U !== 1572864) {
  throw new Error(`unexpected dimensions P=${P} U=${U}`);
}

const UNROLLED_PL = 10;
if (PL !== UNROLLED_PL) {
  throw new Error(`unrolled incidence kernel requires PL=${UNROLLED_PL}, got ${PL}`);
}

// Branchless subsequence transitions per threshold word.
const transitionStart = process.hrtime.bigint();
const FAIL_STATE = WL + 1;
const NEXT_STATES = WL + 2;
const NEXT_STRIDE = NEXT_STATES * ALPHABET;
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

// Exact dense transposed failure incidence: one bit per path/threshold pair.
// This is P*U bits instead of a sparse Uint16 path-id list.
const incidenceStart = process.hrtime.bigint();
const BLOCKS = (P + 31) >>> 5; // 24
const failBits = new Uint32Array(U * BLOCKS);
let totalIncidence = 0;

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
  const p9 = paths[po + 9];

  const block = p >>> 5;
  const bit = (1 << (p & 31)) >>> 0;

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
    s = nextState[nb + s * 3 + p9];

    if (s === FAIL_STATE) {
      failBits[u * BLOCKS + block] |= bit;
      totalIncidence++;
    }
  }
}

const incidenceMs = Number(process.hrtime.bigint() - incidenceStart) / 1e6;
nextState = null;

// Initialize the same ascending-path-id two-watcher semantics as the CSR run.
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
const baseNextPath = new Uint16Array(U);
const basePrivateCount = new Uint32Array(P);

for (let u = 0; u < U; u++) {
  const row = u * BLOCKS;
  let first = NO_WATCH;
  let second = NO_WATCH;

  for (let b = 0; b < BLOCKS && second === NO_WATCH; b++) {
    let mask = failBits[row + b] >>> 0;

    while (mask) {
      const bitIndex = lowBitIndex(mask);
      const p = (b << 5) + bitIndex;

      if (first === NO_WATCH) first = p;
      else {
        second = p;
        break;
      }

      mask = (mask & (mask - 1)) >>> 0;
    }
  }

  if (first === NO_WATCH) {
    throw new Error(`all-path family leaves threshold word ${u} uncovered`);
  }

  const nodeA = u << 1;
  baseWatchOwner[nodeA] = first;
  baseWatchNext[nodeA] = baseWatchHead[first];
  baseWatchHead[first] = nodeA;

  if (second === NO_WATCH) {
    basePrivateCount[first]++;
    baseNextPath[u] = P;
  } else {
    const nodeB = nodeA + 1;
    baseWatchOwner[nodeB] = second;
    baseWatchNext[nodeB] = baseWatchHead[second];
    baseWatchHead[second] = nodeB;
    baseNextPath[u] = second + 1;
  }
}

const watchInitMs = Number(process.hrtime.bigint() - watchInitStart) / 1e6;

// Exact deterministic deletion search.
const rng = new XorShift32(0x04712026);
const order = new Uint16Array(P);
const rank = new Uint16Array(P);
const selected = new Uint8Array(P);
const selectedBits = new Uint32Array(BLOCKS);
const watchOwner = new Uint16Array(WATCH_NODES);
const watchNext = new Uint32Array(WATCH_NODES);
const watchHead = new Uint32Array(P);
const nextPath = new Uint16Array(U);
const privateCount = new Uint32Array(P);
const histogram = new Uint32Array(P + 1);

let bestSize = -1;
let bestTrial = -1;
let bestSelected = null;

const searchStart = process.hrtime.bigint();

for (let trial = 0; trial < TRIALS; trial++) {
  selected.fill(1);
  selectedBits.fill(0xffffffff);
  watchOwner.set(baseWatchOwner);
  watchNext.set(baseWatchNext);
  watchHead.set(baseWatchHead);
  nextPath.set(baseNextPath);
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
    selectedBits[p >>> 5] &= ~((1 << (p & 31)) >>> 0);
    size--;

    let node = watchHead[p];

    while (node !== NO_NODE) {
      const nextNode = watchNext[node];
      const u = node >>> 1;
      const other = watchOwner[node ^ 1];

      if (other === NO_WATCH) {
        throw new Error(`attempted removal of sole watcher ${p} for threshold word ${u}`);
      }

      const row = u * BLOCKS;
      let pos = nextPath[u];
      let block = pos >>> 5;
      let replacement = NO_WATCH;

      while (block < BLOCKS) {
        let mask = (failBits[row + block] & selectedBits[block]) >>> 0;

        if (block === (pos >>> 5)) {
          const shift = pos & 31;
          if (shift) mask &= (0xffffffff << shift) >>> 0;
        }

        if ((other >>> 5) === block) {
          mask &= ~((1 << (other & 31)) >>> 0);
        }

        if (mask) {
          const bitIndex = lowBitIndex(mask);
          replacement = (block << 5) + bitIndex;
          pos = replacement + 1;
          break;
        }

        block++;
        pos = block << 5;
      }

      nextPath[u] = pos;

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

// Exact verification directly against the failure bit matrix.
const verifyStart = process.hrtime.bigint();
const bestBits = new Uint32Array(BLOCKS);
for (let p = 0; p < P; p++) {
  if (bestSelected[p]) bestBits[p >>> 5] |= (1 << (p & 31)) >>> 0;
}

let uncovered = 0;
const privateWord = new Int32Array(P);
privateWord.fill(-1);

for (let u = 0; u < U; u++) {
  const row = u * BLOCKS;
  let owner = -1;
  let count = 0;

  for (let b = 0; b < BLOCKS; b++) {
    let mask = (failBits[row + b] & bestBits[b]) >>> 0;

    while (mask) {
      const bitIndex = lowBitIndex(mask);
      const p = (b << 5) + bitIndex;
      count++;

      if (count === 1) owner = p;
      else break;

      mask = (mask & (mask - 1)) >>> 0;
    }

    if (count > 1) break;
  }

  if (count === 0) uncovered++;
  else if (count === 1 && privateWord[owner] < 0) privateWord[owner] = u;
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

const result = {
  experiment: '047',
  disposition: pass ? 'PASS' : 'FAIL',
  implementation_language: 'Node.js',
  node_version: process.version,
  optimization_revision: 'dense-bitset-watchers-v1',
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
  incidence_ms: incidenceMs,
  watch_init_ms: watchInitMs,
  search_ms: searchMs,
  verification_ms: verifyMs,
  total_incidence: totalIncidence,
  failure_bitset_bytes: failBits.byteLength,
  total_ms: Number(process.hrtime.bigint() - totalStart) / 1e6,
  cover_size_histogram: histogramObject,
  selected_paths: selectedIds.map(p => wordString(paths, p, PL)),
  private_witnesses: selectedIds.map(p => ({
    path: wordString(paths, p, PL),
    word: privateWord[p] >= 0 ? wordString(words, privateWord[p], WL) : ''
  }))
};

fs.writeFileSync(`${OUT}/RESULT.json`, JSON.stringify(result, null, 2) + '\n');

console.log(JSON.stringify({
  experiment: result.experiment,
  disposition: result.disposition,
  optimization_revision: result.optimization_revision,
  best_cover_size: result.best_cover_size,
  threshold_uncovered_words: result.threshold_uncovered_words,
  missing_private_witnesses: result.missing_private_witnesses,
  total_incidence: result.total_incidence,
  failure_bitset_mb: result.failure_bitset_bytes / 1048576,
  generation_ms: result.generation_ms,
  transition_ms: result.transition_ms,
  incidence_ms: result.incidence_ms,
  watch_init_ms: result.watch_init_ms,
  search_ms: result.search_ms,
  verification_ms: result.verification_ms,
  total_ms: result.total_ms
}, null, 2));

if (!pass) process.exitCode = 1;
