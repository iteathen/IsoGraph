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
const baseXor = new Uint16Array(U);

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
      baseXor[u] ^= (p + 1);
    }
  }

  forbiddenLength[p] = n;
}

const basePrivateCount = new Uint32Array(P);

for (let u = 0; u < U; u++) {
  const count = baseCount[u];
  if (count === 0) {
    throw new Error(`all-path family does not cover threshold word ${u}`);
  }

  if (count === 1) basePrivateCount[baseXor[u] - 1]++;
}

const incidenceMs = Number(process.hrtime.bigint() - t0) / 1e6;

const rng = new XorShift32(0x04512026);
const order = new Uint16Array(P);
const counts = new Uint16Array(U);
const xors = new Uint16Array(U);
const privateCount = new Uint32Array(P);
const selected = new Uint8Array(P);
const histogram = new Uint32Array(P + 1);

let bestSize = -1;
let bestTrial = -1;
let bestSelected = null;

const searchStart = process.hrtime.bigint();

for (let trial = 0; trial < TRIALS; trial++) {
  counts.set(baseCount);
  xors.set(baseXor);
  privateCount.set(basePrivateCount);
  selected.fill(1);

  let size = P;

  for (let i = 0; i < P; i++) order[i] = i;
  for (let i = P - 1; i > 0; i--) {
    const j = rng.next() % (i + 1);
    const t = order[i];
    order[i] = order[j];
    order[j] = t;
  }

  for (let oi = 0; oi < P; oi++) {
    const p = order[oi];

    // privateCount[p] === 0 is already the exact removability test:
    // a selected set is essential iff it is the sole coverer of some word.
    // The prior second scan for counts[u]===1 duplicated this invariant.
    if (privateCount[p] !== 0) continue;

    selected[p] = 0;
    size--;

    const enc = p + 1;
    let i = p * U;
    const end = i + forbiddenLength[p];

    for (; i < end; i++) {
      const u = forbidden[i];
      const count = counts[u];

      if (count === 2) {
        privateCount[(xors[u] ^ enc) - 1]++;
      }

      counts[u] = count - 1;
      xors[u] ^= enc;
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
  node_optimization_revision: 'branchless-next-separate-cover-v4',
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
