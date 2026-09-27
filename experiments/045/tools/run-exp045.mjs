import fs from 'node:fs';

const OUT = 'out/exp045';
fs.mkdirSync(OUT, { recursive: true });

const PL = 8;
const WL = 16;
const TRIALS = 128;
const ALPHABET = 3;

function generateWords(length) {
  if (length === 0) return new Uint8Array(0);
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
  if (row !== count) throw new Error(`word generation mismatch: ${row} != ${count}`);
  return flat;
}

function isSubsequence(pathFlat, pathOffset, pathLength, wordFlat, wordOffset, wordLength) {
  let i = 0;
  for (let j = 0; j < wordLength && i < pathLength; j++) {
    if (pathFlat[pathOffset + i] === wordFlat[wordOffset + j]) i++;
  }
  return i === pathLength;
}

function wordString(flat, row, length) {
  let s = '';
  const off = row * length;
  for (let i = 0; i < length; i++) s += String(flat[off + i]);
  return s;
}

class XorShift32 {
  constructor(seed) {
    this.x = seed >>> 0;
  }
  next() {
    let x = this.x >>> 0;
    x ^= (x << 13) >>> 0;
    x ^= x >>> 17;
    x ^= (x << 5) >>> 0;
    this.x = x >>> 0;
    return this.x;
  }
}

const t0 = process.hrtime.bigint();
const paths = generateWords(PL);
const words = generateWords(WL);
const P = paths.length / PL;
const U = words.length / WL;

if (P !== 384 || U !== 98304) {
  throw new Error(`unexpected dimensions P=${P} U=${U}`);
}

// Precompute a branchless subsequence transition automaton per threshold word.
// State s=0..16 is the next word position to search; state 17 is a permanent
// failure sink. Each transition consumes one candidate-path symbol.
const NEXT_STATES = 18;
const NEXT_STRIDE = NEXT_STATES * ALPHABET; // 54
const FAIL_STATE = 17;
const nextState = new Uint8Array(U * NEXT_STRIDE);

for (let u = 0; u < U; u++) {
  const base = u * NEXT_STRIDE;
  const wo = u << 4; // WL = 16

  // Sink transitions.
  nextState[base + 51] = FAIL_STATE;
  nextState[base + 52] = FAIL_STATE;
  nextState[base + 53] = FAIL_STATE;

  let n0 = FAIL_STATE;
  let n1 = FAIL_STATE;
  let n2 = FAIL_STATE;

  for (let s = 16; s >= 0; s--) {
    if (s < 16) {
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

// Flat fixed-stride failure incidence.
const forbidden = new Uint32Array(P * U);
const forbiddenLength = new Uint32Array(P);
const baseCount = new Uint16Array(U);

for (let p = 0; p < P; p++) {
  const base = p * U;
  const po = p << 3; // PL = 8
  const p0 = paths[po];
  const p1 = paths[po + 1];
  const p2 = paths[po + 2];
  const p3 = paths[po + 3];
  const p4 = paths[po + 4];
  const p5 = paths[po + 5];
  const p6 = paths[po + 6];
  const p7 = paths[po + 7];

  let n = 0;

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

    if (s === FAIL_STATE) {
      forbidden[base + n] = u;
      n++;
      baseCount[u]++;
    }
  }

  forbiddenLength[p] = n;
}

for (let u = 0; u < U; u++) {
  if (baseCount[u] === 0) {
    throw new Error(`all-path family does not cover threshold word ${u}`);
  }
}

const incidenceMs = Number(process.hrtime.bigint() - t0) / 1e6;

// Build the exact transpose once: for each threshold word, list every
// candidate path whose forbidden set contains that word.
const coverOffset = new Uint32Array(U + 1);
for (let u = 0; u < U; u++) coverOffset[u + 1] = coverOffset[u] + baseCount[u];

const totalIncidence = coverOffset[U];
const coverers = new Uint16Array(totalIncidence);
const coverFill = new Uint32Array(U);
coverFill.set(coverOffset.subarray(0, U));

for (let p = 0; p < P; p++) {
  let i = p * U;
  const end = i + forbiddenLength[p];
  for (; i < end; i++) {
    const u = forbidden[i];
    coverers[coverFill[u]++] = p;
  }
}

// Two-watched-coverer invariant with intrusive typed-array watcher lists.
//
// Each threshold word owns two fixed watcher slots (node ids 2*u and 2*u+1).
// A slot is moved between path watcher-lists in O(1) by relinking the same
// node. This removes all per-trial dynamic JS arrays/pushes from the hot loop.
const NO_WATCH = 0xffff;
const NO_NODE = 0xffffffff;
const WATCH_NODES = U * 2;

const baseWatchOwner = new Uint16Array(WATCH_NODES);
baseWatchOwner.fill(NO_WATCH);
const baseNextCover = new Uint32Array(U);
const basePrivateCount = new Uint32Array(P);

const baseWatchHead = new Uint32Array(P);
baseWatchHead.fill(NO_NODE);
const baseWatchNext = new Uint32Array(WATCH_NODES);
baseWatchNext.fill(NO_NODE);

for (let u = 0; u < U; u++) {
  const begin = coverOffset[u];
  const finish = coverOffset[u + 1];
  const len = finish - begin;

  if (len === 0) throw new Error(`threshold word ${u} has no coverer`);

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

const rng = new XorShift32(0x04512026);
const order = new Uint16Array(P);
const rank = new Uint16Array(P);
const selected = new Uint8Array(P);
const watchOwner = new Uint16Array(WATCH_NODES);
const watchHead = new Uint32Array(P);
const watchNext = new Uint32Array(WATCH_NODES);
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
  watchHead.set(baseWatchHead);
  watchNext.set(baseWatchNext);
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

    // Once a path owns a private threshold word it must remain selected.
    if (privateCount[p] !== 0) continue;

    selected[p] = 0;
    size--;

    let node = watchHead[p];
    while (node !== NO_NODE) {
      const nextNode = watchNext[node];
      const u = node >>> 1;
      const other = watchOwner[node ^ 1];

      if (other === NO_WATCH) {
        throw new Error(`removing sole watcher ${p} for word ${u}`);
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

// Exact post-search verification.
const verifyCount = new Uint16Array(U);
const selectedIds = [];

for (let p = 0; p < P; p++) {
  if (!bestSelected[p]) continue;
  selectedIds.push(p);
  let i = p * U;
  const end = i + forbiddenLength[p];
  for (; i < end; i++) verifyCount[forbidden[i]]++;
}

let uncovered = 0;
for (let u = 0; u < U; u++) if (verifyCount[u] === 0) uncovered++;

const privateWord = new Int32Array(P);
privateWord.fill(-1);

for (const p of selectedIds) {
  let i = p * U;
  const end = i + forbiddenLength[p];
  for (; i < end; i++) {
    const u = forbidden[i];
    if (verifyCount[u] === 1) {
      privateWord[p] = u;
      break;
    }
  }
}

let missingPrivate = 0;
for (const p of selectedIds) if (privateWord[p] < 0) missingPrivate++;

const histogramObject = {};
for (let size = 0; size <= P; size++) {
  if (histogram[size]) histogramObject[String(size)] = histogram[size];
}

const selectedPaths = selectedIds.map(p => wordString(paths, p, PL));
const privateWitnesses = selectedIds.map(p => ({
  path: wordString(paths, p, PL),
  word: privateWord[p] >= 0 ? wordString(words, privateWord[p], WL) : ''
}));

const pass =
  uncovered === 0 &&
  missingPrivate === 0 &&
  selectedIds.length === bestSize;

const result = {
  experiment: '045-node-rerun',
  disposition: pass ? 'PASS' : 'FAIL',
  implementation_language: 'Node.js',
  node_version: process.version,
  historical_cpp_run_authoritative: false,
  node_optimization_revision: 'lean-watched-coverers-v7',
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
  incidence_ms: incidenceMs,
  search_ms: searchMs,
  total_incidence: totalIncidence,
  max_trial_event_count: maxTrialEventCount,
  total_ms: Number(process.hrtime.bigint() - t0) / 1e6,
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
  incidence_ms: result.incidence_ms,
  search_ms: result.search_ms,
  total_ms: result.total_ms
}, null, 2));

if (!pass) process.exitCode = 1;
