import random
import math
import json
import uuid
import hashlib
import argparse
import datetime
import os
from collections import Counter
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Tuple

"""
================================================================================
SUPPLEMENTARY MODEL B — FIELD IGNITION
================================================================================
AUTHOR: Josh Y Oshiro (josh.oshiro@gmail.com)
DATE: April 26, 2026

PAPER-SUPPLEMENT PURPOSE:
    This file is an executable sketch for the primitive-presentation paper. It is not offered as
    an independent proof of role minimality, a physics claim, or evidence of
    universality. Its purpose is narrower: to illustrate, in runnable form, how a
    counted presentation can keep the dependency answers visible while the rest
    of the implementation remains arbitrary support machinery.

    The example isolates the paper's dependency questions as follows:

        α: what carries effective transition/update of the field from one row
           to the next?
        β: what supplies determinate presence, here the finite binary row/cell
           state and the local values read from it?
        γ: what settles how transition bears on presence, here the fixed audit,
           counted pressure, and boundary conventions that determine how the
           audit is applied?

    The search loop, scoring functions, JSONL export, structure tracking,
    filenames, fingerprints, dataset export, and ASCII rendering are not part
    of the paper's formal claim. They make the example inspectable and reproducible. They
    can be changed without changing the paper-relevant point, provided the
    counted dependency answers remain explicit and the executor is not hidden.

PHASE COVERAGE:
    Phase 0: Small generator                [COMPLETE]
    Phase 1: Ignition search + JSONL export [COMPLETE]
    Phase 2: Structure tracking             [COMPLETE]
    Phase 3: Transformer export             [COMPLETE]
    Phase 4: Ratio registry                 [PENDING]
    Phase 5: Isomorphism testing            [PENDING]

CHANGES FROM legacy_qf6.py:
    - Best run filename is always printed in the summary so it's easy to
      find and pass to --resume-from.
    - Best graph is always rendered at the end of a search run — no flag needed.
    - Removed --render flag (render is now unconditional for the best run).

CHANGES FROM legacy_qf5.py (carried forward from v6):
    - initial_state (the first non-zero row) is now stored as a parseable
      JSON array in both the .txt file header and the JSONL record.
    - Added evolve_from_state(): deterministic evolution from a saved state
      row, no sparse perturbation. The result is identical to the original run's
      evolution from that point forward.
    - Added load_initial_state_from_file(): reads the initial_state: line
      from any saved .txt file and returns the binary row.
    - Added --resume-from flag: point at any saved .txt file and the run
      is reproduced exactly — same field, same scores, same output.

CHANGES FROM legacy_qf2.py (carried forward from v3):
    - Added --out-dir flag: save every non-zero run to its own .txt file
    - Each file contains a scored header + full ASCII history render
    - All attempts are saved (not just the selected best), including
      short-cycle and partial-ignition runs, as long as activity is present

CHANGES FROM legacy_qf.py (carried forward from v2):
    - Added argparse CLI:
        --width, --steps, --qf-density, --qf-steps, --attempts,
        --seed, --out, --render
    - Added reproducibility:
        random seed, run_id (uuid4), parameter snapshot,
        pressure_function_id, timestamp, code_version
    - Added JSONL export with full APPLICATION.yaml schema
    - Added Phase 2 structure tracking:
        active region detection, lifetimes, mean velocity,
        velocity stability, split/merge events (birth/death labeling)
    - Added collision candidate detection:
        overlap and proximity events, post-collision survival flag
    - Added persistent structure candidate detection
    - Added separate score dimensions:
        ignition_score, structure_score, entropy_score,
        collision_score, persistence_score, composite

FRAMEWORK:
    Fixed audit with local perturbation
    Field Ignition: exploratory execution sketch
    Core illustration: counted state + counted update + counted audit.

CREDITS:
    - Stephen Wolfram (elementary cellular automata and computational irreducibility)
    - Bertrand Russell (logical framing of emptiness and structure)
    - Moses Coit Tyler (terminology reference)

================================================================================

[ INITIAL CONDITIONS: ZERO FIELD + LOCAL PERTURBATION ]

I. MODEL SETUP: A LOCAL CONSTRAINT SYSTEM

The toy system evolves via local evaluations rather than persistent objects.
At each coordinate in discrete space-time, a node is evaluated against a
fixed constraint using locally derived conditions.

1. THE ZERO STATE:
   Represented as 0. Absence of active state.

2. THE CANDIDATE ACTIVE STATE:
   Represented as 1. Candidate active state.

3. THE FIXED CONSTRAINT (COUNTED AUDIT):
       active iff p == 2z

   - THE PULSE (z): Local candidate state.
   - THE PRESSURE (p): Derived from neighborhood or local perturbation.
   - THE AUDIT: Binary evaluation determining survival.

NOTE:
The rule is fixed. No rule tables are generated or selected.

================================================================================

II. MOTIVATION

1. SMALL SUBSTRATE:
   Investigate whether sustained structure can arise from a fixed,
   simple constraint under stochastic perturbation.

2. PERSISTENCE:
   Focus on which perturbations survive and propagate.

3. ENTROPIC EXPANSION:
   Identify conditions under which activity expands without collapse.

4. STOCHASTIC IGNITION:
   Random local perturbations provide an arbitrary sparse input source.

================================================================================

III. MODEL DEFINITION

The system operates as follows:

    - Start from an all-zero field
    - Inject sparse local perturbations
    - Apply a fixed constraint at every step
    - Observe which perturbations survive and expand

There is no search over rule space. The only variation is in the
perturbations applied to the field.

================================================================================

IV. BEHAVIORAL MEASURES

The sketch records the following observed behavior:

    - sustained activity
    - expansion of active regions
    - non-trivial entropy
    - avoidance of immediate collapse
    - absence of trivial periodicity
    - interaction regions with non-trivial outcomes

================================================================================

V. LIMITATIONS

1. The system is discrete and binary.
2. Universality is not assumed.
3. Persistent localized structures would require separate demonstration.
4. Any mapping to physical systems is speculative.

================================================================================

[ SUMMARY ]

This sketch does not search over rules. It applies a fixed constraint to a
zero-state field under stochastic local perturbations. Observed patterns are
outcomes of the chosen update rule, boundary convention, perturbation source,
and scoring/display apparatus:

    active iff p == 2z

No physical interpretation is assumed. The representational structure is
included only for implementation, scoring, export, and reproducibility.

================================================================================
"""

CODE_VERSION = "field_qf8_v8.0.0"
PRESSURE_FUNCTION_ID = "asymmetric_xor_or"

# ============================================================
# PAPER WITNESS LAYER: PURE THREE-CARRIER OBJECT CODES
# ============================================================
#
# The one-character names in this block are deliberate. This is the isolated
# witness/object layer, not the support program. The Python program is the
# counted host parser/evaluator; it is not being smuggled in as free
# background. The object-layer state codes below use only { (, ∅, ) }.
#
# Grammar used here:
#
#     Row  ::= "(" Cell* ")"
#     Cell ::= "()"       inactive determinate cell
#            | "(∅)"      active determinate cell
#
# This is deliberately modest. It does not claim that Python is a three-symbol
# language. It shows that the finite state handed to the counted
# evaluator can be serialized with only the three visible carriers.

z = "("
p = "∅"
r = ")"
s = frozenset({z, p, r})


def a(x: str) -> None:
    """Assert that x is pure three-carrier object code."""
    extra = set(x) - s
    if extra:
        raise ValueError(f"Object-code mark(s) outside the visible carrier set: {sorted(extra)!r}")


def b(x: int) -> str:
    """Encode one binary cell using only the three visible carriers."""
    if x not in (0, 1):
        raise ValueError(f"Cell must be 0 or 1, got {x!r}")
    return f"{z}{p if x else ''}{r}"


def c(x: List[int]) -> str:
    """Encode a finite binary row as pure three-carrier object code."""
    y = "".join(b(int(i)) for i in x)
    return f"{z}{y}{r}"


def d(x: str) -> List[int]:
    """Decode a row produced by c()."""
    a(x)
    if not (x.startswith(z) and x.endswith(r)):
        raise ValueError("Row code must be enclosed by opening/closing visible carriers")

    y: List[int] = []
    i = 1
    n = len(x) - 1
    while i < n:
        if x[i] != z:
            raise ValueError(f"Expected cell-opening visible carrier at index {i}")
        if i + 1 < n and x[i + 1] == r:
            y.append(0)
            i += 2
        elif i + 2 < len(x) and x[i + 1] == p and x[i + 2] == r:
            y.append(1)
            i += 3
        else:
            raise ValueError(f"Malformed cell beginning at index {i}")
    return y


def e(x: str, t: int = 60) -> List[str]:
    """
    Decode a pure three-carrier row, run the counted evaluator, and return each
    subsequent row in the same pure three-carrier object language.
    """
    h = evolve_from_state(d(x), steps=t)
    return [c(i) for i in h]


# ============================================================
# PHASE 0: CORE MECHANICS
# ============================================================

def passes_audit(z, p):
    """Fixed audit. Immutable. Active iff p == 2z."""
    return p == 2 * z


def binary_entropy(bits):
    if not bits:
        return 0.0
    ones = sum(bits)
    total = len(bits)
    if ones == 0 or ones == total:
        return 0.0
    p1 = ones / total
    p0 = 1.0 - p1
    return -(p0 * math.log2(p0) + p1 * math.log2(p1))


def active_span(row):
    active = [i for i, v in enumerate(row) if v]
    if not active:
        return 0
    return active[-1] - active[0] + 1


def generate_zero_field(width):
    return [0] * width


def qf_perturbation(qf_density=0.01):
    """
    Sparse stochastic perturbation.
    z is fixed to 1 in the small configuration.
    p is sampled from {0, 1, 2, 3}.
    """
    if random.random() >= qf_density:
        return 0, 0, False
    z = 1
    p = random.choice([0, 1, 2, 3])
    return z, p, True


def neighborhood_pressure(left, center, right):
    """
    Asymmetric local conductivity pressure function.
    ID: asymmetric_xor_or
    Expression: p = 2 if left XOR (center OR right), else 0
    Boundary policy: edge cells remain inactive (handled in evolve_field).
    """
    return 2 if left ^ (center | right) else 0


def evolve_field(width=80, steps=60, qf_density=0.01, qf_steps=1):
    current = generate_zero_field(width)
    history = []

    for t in range(steps):
        history.append(current[:])
        nxt = [0] * width

        for i in range(1, width - 1):  # edges remain inactive (boundary policy)
            left = current[i - 1]
            center = current[i]
            right = current[i + 1]

            z = 1
            p = neighborhood_pressure(left, center, right)

            if t < qf_steps:
                qf_z, qf_p, perturbed = qf_perturbation(qf_density)
                if perturbed:
                    z = qf_z
                    p = qf_p

            nxt[i] = 1 if passes_audit(z, p) else 0

        current = nxt

    return history


# ============================================================
# PHASE 1: IGNITION DETECTION & SCORING
# ============================================================
#
# Support apparatus only. These functions rank and inspect runs so the example
# is easier to study. They are not part of the three-carrier object language
# and they are not premises of the three-role claim.

def detect_short_cycle(history, window=8):
    if len(history) < window * 2:
        return False
    return history[-window:] == history[-2 * window:-window]


def compute_series(history):
    """Compute per-step span, density, and entropy series."""
    spans = [active_span(row) for row in history]
    densities = [sum(row) / len(row) for row in history]
    entropies = [binary_entropy(row) for row in history]
    return spans, densities, entropies


def score_ignition(spans, densities, entropies, collapse_detected, short_cycle):
    """
    Ignition score per APPLICATION.yaml:
        penalties: all-zero/all-one = -1000, short_cycle = -500
        rewards: max_span x1.0, final_span x1.5,
                 avg_entropy x100.0, final_entropy x100.0
    """
    if collapse_detected:
        return -1000.0
    if short_cycle:
        return -500.0
    return (
        max(spans)
        + spans[-1] * 1.5
        + sum(entropies) * 100.0 / len(entropies)
        + entropies[-1] * 100.0
    )


# ============================================================
# PHASE 2: STRUCTURE TRACKING
# ============================================================
#
# Support apparatus only. Region tracking, collision labels, and persistence
# metrics help describe outcomes, but the execution sketch would still
# have the same three-carrier boundary without these analysis functions.

def find_active_regions(row):
    """Find all contiguous active regions in a row."""
    regions = []
    i = 0
    n = len(row)
    while i < n:
        if row[i] == 1:
            start = i
            while i < n and row[i] == 1:
                i += 1
            end = i - 1
            regions.append({
                'start': start,
                'end': end,
                'width': end - start + 1,
                'center': (start + end) / 2.0,
            })
        else:
            i += 1
    return regions


def match_regions(prev_regions, curr_regions):
    """
    Greedy nearest-center matching of regions across time steps.
    Returns:
        matched: list of (prev_idx, curr_idx)
        disappeared: list of prev indices with no match
        born: list of curr indices with no match
    Threshold: center must not move more than 2x the width of the larger region.
    """
    if not prev_regions or not curr_regions:
        return [], list(range(len(prev_regions))), list(range(len(curr_regions)))

    used_curr = set()
    matched = []

    for pi, pr in enumerate(prev_regions):
        best_ci = None
        best_dist = float('inf')
        for ci, cr in enumerate(curr_regions):
            if ci in used_curr:
                continue
            dist = abs(pr['center'] - cr['center'])
            if dist < best_dist:
                best_dist = dist
                best_ci = ci
        if best_ci is not None:
            threshold = max(pr['width'], curr_regions[best_ci]['width']) * 2
            if best_dist <= threshold:
                matched.append((pi, best_ci))
                used_curr.add(best_ci)

    matched_prev = {p for p, _ in matched}
    matched_curr = {c for _, c in matched}
    disappeared = [pi for pi in range(len(prev_regions)) if pi not in matched_prev]
    born = [ci for ci in range(len(curr_regions)) if ci not in matched_curr]

    return matched, disappeared, born


@dataclass
class RegionTrack:
    track_id: int
    birth_step: int
    death_step: Optional[int] = None
    centers: List[float] = field(default_factory=list)
    widths: List[int] = field(default_factory=list)
    starts: List[int] = field(default_factory=list)
    ends: List[int] = field(default_factory=list)

    @property
    def lifetime(self) -> Optional[int]:
        if self.death_step is not None:
            return self.death_step - self.birth_step
        return None

    @property
    def mean_velocity(self) -> float:
        if len(self.centers) < 2:
            return 0.0
        deltas = [self.centers[i + 1] - self.centers[i] for i in range(len(self.centers) - 1)]
        return sum(deltas) / len(deltas)

    @property
    def velocity_stability(self) -> float:
        """Std dev of step-to-step velocity. Lower = more stable."""
        if len(self.centers) < 3:
            return 0.0
        deltas = [self.centers[i + 1] - self.centers[i] for i in range(len(self.centers) - 1)]
        mean = sum(deltas) / len(deltas)
        variance = sum((d - mean) ** 2 for d in deltas) / len(deltas)
        return math.sqrt(variance)

    def to_dict(self) -> dict:
        return {
            'track_id': self.track_id,
            'birth_step': self.birth_step,
            'death_step': self.death_step,
            'lifetime': self.lifetime,
            'mean_velocity': round(self.mean_velocity, 4),
            'velocity_stability': round(self.velocity_stability, 4),
            'max_width': max(self.widths) if self.widths else 0,
        }


def track_regions_over_time(history) -> List[RegionTrack]:
    """
    Build RegionTrack objects across all time steps.
    Uses greedy nearest-center matching. Births and deaths are labeled
    per-step; no explicit split/merge cross-referencing yet (Phase 2 basic).
    Returns list of all completed RegionTrack objects.
    """
    next_track_id = 0
    active_tracks: Dict[int, RegionTrack] = {}
    completed_tracks: List[RegionTrack] = []
    prev_regions = []
    prev_assignment: List[int] = []

    for t, row in enumerate(history):
        curr_regions = find_active_regions(row)

        if t == 0:
            curr_assignment = []
            for cr in curr_regions:
                track = RegionTrack(track_id=next_track_id, birth_step=t)
                track.centers.append(cr['center'])
                track.widths.append(cr['width'])
                track.starts.append(cr['start'])
                track.ends.append(cr['end'])
                active_tracks[next_track_id] = track
                curr_assignment.append(next_track_id)
                next_track_id += 1
            prev_regions = curr_regions
            prev_assignment = curr_assignment
            continue

        matched, disappeared, born = match_regions(prev_regions, curr_regions)
        curr_assignment = [None] * len(curr_regions)

        for pi, ci in matched:
            tid = prev_assignment[pi]
            track = active_tracks[tid]
            track.centers.append(curr_regions[ci]['center'])
            track.widths.append(curr_regions[ci]['width'])
            track.starts.append(curr_regions[ci]['start'])
            track.ends.append(curr_regions[ci]['end'])
            curr_assignment[ci] = tid

        for pi in disappeared:
            tid = prev_assignment[pi]
            track = active_tracks.pop(tid)
            track.death_step = t
            completed_tracks.append(track)

        for ci in born:
            track = RegionTrack(track_id=next_track_id, birth_step=t)
            track.centers.append(curr_regions[ci]['center'])
            track.widths.append(curr_regions[ci]['width'])
            track.starts.append(curr_regions[ci]['start'])
            track.ends.append(curr_regions[ci]['end'])
            active_tracks[next_track_id] = track
            curr_assignment[ci] = next_track_id
            next_track_id += 1

        prev_regions = curr_regions
        prev_assignment = curr_assignment

    # Close tracks still alive at end
    final_step = len(history)
    for tid, track in active_tracks.items():
        track.death_step = final_step
        completed_tracks.append(track)

    return completed_tracks


def detect_collision_candidates(tracks: List[RegionTrack]) -> List[dict]:
    """
    Detect pairs of tracks whose regions overlap or come within 3 cells.
    Labels: collision_start, overlap, post_collision_survival.
    """
    step_to_tracks: Dict[int, List[Tuple[RegionTrack, int]]] = {}
    for track in tracks:
        for local_i, step in enumerate(range(track.birth_step, track.birth_step + len(track.centers))):
            step_to_tracks.setdefault(step, []).append((track, local_i))

    collisions = []
    visited_pairs = set()

    for step, track_list in step_to_tracks.items():
        if len(track_list) < 2:
            continue
        for a in range(len(track_list)):
            for b in range(a + 1, len(track_list)):
                ta, ia = track_list[a]
                tb, ib = track_list[b]
                pair_key = (min(ta.track_id, tb.track_id), max(ta.track_id, tb.track_id))
                if pair_key in visited_pairs:
                    continue

                ra_start, ra_end = ta.starts[ia], ta.ends[ia]
                rb_start, rb_end = tb.starts[ib], tb.ends[ib]

                overlap = ra_start <= rb_end and rb_start <= ra_end
                proximity = abs(ta.centers[ia] - tb.centers[ib]) <= 3

                if overlap or proximity:
                    visited_pairs.add(pair_key)
                    post_a = (ta.death_step is not None and ta.death_step > step + 3)
                    post_b = (tb.death_step is not None and tb.death_step > step + 3)
                    collisions.append({
                        'track_a': ta.track_id,
                        'track_b': tb.track_id,
                        'collision_start': step,
                        'overlap': overlap,
                        'post_collision_survival': post_a or post_b,
                    })

    return collisions


def find_persistent_candidates(tracks: List[RegionTrack], min_lifetime: int = 8) -> List[dict]:
    """Return tracks that survive at least min_lifetime steps."""
    return [
        t.to_dict()
        for t in tracks
        if t.lifetime is not None and t.lifetime >= min_lifetime
    ]


# ============================================================
# MULTI-DIMENSIONAL SCORING
# ============================================================

def score_structure(tracks: List[RegionTrack], collisions: List[dict], persistent: List[dict]) -> float:
    if not tracks:
        return 0.0

    lifetimes = [t.lifetime for t in tracks if t.lifetime is not None]
    mean_lifetime = sum(lifetimes) / len(lifetimes) if lifetimes else 0.0
    max_lifetime = max(lifetimes) if lifetimes else 0.0

    stable_tracks = [t for t in tracks if len(t.centers) >= 3]
    mean_stability = (
        sum(t.velocity_stability for t in stable_tracks) / len(stable_tracks)
        if stable_tracks else 0.0
    )
    stability_reward = max(0.0, 1.0 - mean_stability)

    collision_reward = sum(
        10.0 if c['post_collision_survival'] else 3.0
        for c in collisions
    )
    persistence_reward = len(persistent) * 20.0

    return (
        mean_lifetime * 2.0
        + max_lifetime * 1.0
        + stability_reward * 10.0
        + collision_reward
        + persistence_reward
    )


def score_entropy(entropies: List[float]) -> float:
    if not entropies:
        return 0.0
    return sum(entropies) / len(entropies) * 100.0 + entropies[-1] * 100.0


def score_collision(collisions: List[dict]) -> float:
    if not collisions:
        return 0.0
    return len(collisions) * 5.0 + sum(10.0 for c in collisions if c['post_collision_survival'])


def score_persistence(persistent: List[dict]) -> float:
    if not persistent:
        return 0.0
    lifetimes = [p['lifetime'] for p in persistent if p.get('lifetime')]
    return len(persistent) * 10.0 + (sum(lifetimes) / len(lifetimes) if lifetimes else 0.0)


def score_all(history, tracks=None, collisions=None, persistent=None) -> dict:
    spans, densities, entropies = compute_series(history)
    collapse_detected = densities[-1] == 0.0 or densities[-1] == 1.0
    short_cycle = detect_short_cycle(history)

    ign = score_ignition(spans, densities, entropies, collapse_detected, short_cycle)
    s_struct = score_structure(tracks or [], collisions or [], persistent or [])
    s_entropy = score_entropy(entropies)
    s_coll = score_collision(collisions or [])
    s_persist = score_persistence(persistent or [])

    return {
        'ignition_score': round(ign, 4),
        'structure_score': round(s_struct, 4),
        'entropy_score': round(s_entropy, 4),
        'collision_score': round(s_coll, 4),
        'persistence_score': round(s_persist, 4),
        'composite': round(ign + s_struct + s_coll + s_persist, 4),
        '_meta': {
            'collapse_detected': collapse_detected,
            'short_cycle_detected': short_cycle,
        }
    }


# ============================================================
# OUTPUT: RENDERING, JSONL EXPORT, AND PER-RUN FILE SAVING
# ============================================================

def render_history(history):
    for row in history:
        print("".join("█" if v else " " for v in row))


def render_history_to_lines(history) -> List[str]:
    return ["".join("█" if v else " " for v in row) for row in history]


def is_nonzero(history) -> bool:
    """True if any row in the history contains at least one active cell."""
    return any(any(row) for row in history)


def initial_condition_fingerprint(history) -> str:
    """
    Derive a stable 8-char hex fingerprint from the initial conditions of
    this run. Uses the active cell positions in the first non-zero row —
    i.e. the earliest observable state produced by sparse perturbation. Collected
    directly from the candidate at save time; no changes to random state.
    Same starting conditions always produce the same fingerprint.
    """
    for row in history:
        if any(row):
            active_positions = tuple(i for i, v in enumerate(row) if v)
            return hashlib.md5(str(active_positions).encode()).hexdigest()[:8]
    return "00000000"


def initial_state_from_history(history) -> Optional[List[int]]:
    """
    Return the first non-zero row of the history as a list.
    This is the earliest surviving field state after sparse perturbation and audit.
    Stored in each saved file so any run can be reproduced exactly.
    Returns None if the entire history is zero.
    """
    for row in history:
        if any(row):
            return list(row)
    return None


def evolve_from_state(state: List[int], steps: int = 60) -> List[List[int]]:
    """
    Deterministic evolution from a saved initial state. No sparse perturbation —
    the state is taken as given and the fixed audit is applied at every step.
    Reproduces the tail of any saved run exactly, starting from that row.
    Width is inferred from len(state).
    """
    width = len(state)
    current = list(state)
    history = []

    for _ in range(steps):
        history.append(current[:])
        nxt = [0] * width
        for i in range(1, width - 1):
            left = current[i - 1]
            center = current[i]
            right = current[i + 1]
            nxt[i] = 1 if R(1, neighborhood_pressure(left, center, right)) else 0
        current = nxt

    return history


def load_initial_state_from_file(path: str) -> List[int]:
    """
    Parse the initial_state: JSON line from a saved .txt run file and return
    the binary row as a list of ints. Raises ValueError if not found.
    """
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith("initial_state:"):
                payload = line.split("initial_state:", 1)[1].strip()
                return json.loads(payload)
    raise ValueError(f"No initial_state: line found in {path}")


def save_run_file(
    run_id: str,
    attempt: int,
    history,
    scores: dict,
    params: dict,
    tracks: List[RegionTrack],
    collisions: List[dict],
    persistent: List[dict],
    out_dir: str,
    ic_fingerprint: str = "",
    initial_state: Optional[List[int]] = None,
    is_best: bool = False,
):
    """
    Write a scored header + full ASCII history render to a uniquely named
    .txt file. Filename: run_{attempt:05d}_ic{ic_fingerprint}.txt
    Stores initial_state as a parseable JSON line so any run can be
    reproduced via --resume-from. Non-zero runs only.
    """
    os.makedirs(out_dir, exist_ok=True)
    fname = f"run_{attempt:05d}_ic{ic_fingerprint}.txt"
    fpath = os.path.join(out_dir, fname)

    s = scores
    collapse = s['_meta']['collapse_detected']
    short_cyc = s['_meta']['short_cycle_detected']
    ignition = not collapse and not short_cyc

    lines = []
    lines.append("=" * 72)
    lines.append(f"FIELD IGNITION RUN  {'[BEST]' if is_best else '      '}  attempt={attempt:05d}  ic={ic_fingerprint}")
    lines.append(f"code_version:      {CODE_VERSION}")
    lines.append(f"pressure_function: {PRESSURE_FUNCTION_ID}")
    lines.append(f"ic_fingerprint:    {ic_fingerprint}")
    lines.append(f"run_id:            {run_id}")
    lines.append(f"timestamp:         {datetime.datetime.now(datetime.UTC).isoformat()}")
    lines.append(f"initial_state:     {json.dumps(initial_state or [])}")
    if initial_state is not None:
        lines.append(f"initial_state_three_carrier: {c(initial_state)}")
    lines.append("boundary_note:     initial_state_three_carrier is pure { (, ∅, ) } object code;")
    lines.append("                   Python is the counted parser/evaluator, not hidden syntax.")
    lines.append("-" * 72)
    lines.append(f"width={params['width']}  steps={params['steps']}  "
                 f"qf_density={params['qf_density']}  qf_steps={params['qf_steps']}")
    lines.append("-" * 72)
    lines.append(f"composite:         {s['composite']:.4f}")
    lines.append(f"ignition_score:    {s['ignition_score']:.4f}")
    lines.append(f"structure_score:   {s['structure_score']:.4f}")
    lines.append(f"entropy_score:     {s['entropy_score']:.4f}")
    lines.append(f"collision_score:   {s['collision_score']:.4f}")
    lines.append(f"persistence_score: {s['persistence_score']:.4f}")
    lines.append("-" * 72)
    lines.append(f"ignition_detected: {ignition}")
    lines.append(f"collapse_detected: {collapse}")
    lines.append(f"short_cycle:       {short_cyc}")
    lines.append(f"region_tracks:     {len(tracks)}")
    lines.append(f"collisions:        {len(collisions)}")
    lines.append(f"persistent:        {len(persistent)}")
    lines.append("=" * 72)
    lines.append("")
    lines.extend(render_history_to_lines(history))
    lines.append("")

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))


def build_record(
    run_id: str,
    params: dict,
    history,
    scores: dict,
    tracks: List[RegionTrack],
    collisions: List[dict],
    persistent: List[dict],
    ic_fingerprint: str = "",
    initial_state: Optional[List[int]] = None,
) -> dict:
    """Build a full APPLICATION.yaml-schema record for JSONL export."""
    spans, densities, entropies = compute_series(history)
    collapse = scores['_meta']['collapse_detected']
    short_cycle = scores['_meta']['short_cycle_detected']

    return {
        'run_id': run_id,
        'ic_fingerprint': ic_fingerprint,
        'initial_state': initial_state,
        'initial_state_three_carrier': c(initial_state) if initial_state is not None else None,
        'object_language_boundary': (
            "initial_state_three_carrier uses only the visible carriers { (, ∅, ) }; "
            "the Python host is counted parser/evaluator apparatus."
        ),
        'params': params,
        'pressure_function_id': PRESSURE_FUNCTION_ID,
        'scores': {k: v for k, v in scores.items() if k != '_meta'},
        'history': history,
        'entropy_series': [round(e, 6) for e in entropies],
        'active_span_series': spans,
        'density_series': [round(d, 6) for d in densities],
        'labels': {
            'ignition_detected': not collapse and not short_cycle,
            'collapse_detected': collapse,
            'short_cycle_detected': short_cycle,
            'structure_candidates': persistent,
        },
        'tracks': [t.to_dict() for t in tracks],
        'collisions': collisions,
        'metadata': {
            'timestamp': datetime.datetime.now(datetime.UTC).isoformat(),
            'code_version': CODE_VERSION,
        },
    }


def append_jsonl(record: dict, path: str):
    with open(path, 'a') as f:
        f.write(json.dumps(record) + '\n')



# ============================================================
# PHASE 3: TRANSFORMER EXPORT
# ============================================================

def _try_import_numpy():
    try:
        import numpy as np
        return np
    except ImportError:
        raise SystemExit(
            "Phase 3 export requires numpy.  Install it with:\n"
            "    pip install numpy"
        )


def export_numpy_dataset(
    jsonl_path: str,
    out_dir: str,
    context_steps: int = 8,
) -> dict:
    """
    Read all records from a JSONL file produced by field-ignition search runs and
    export them as a collection of numpy arrays ready for transformer training.

    Exported files
    ──────────────
    histories.npy          [N, T, W]  int8    — full spatiotemporal histories
    X_context.npy          [M, C, W]  int8    — context windows (M = N*(T-1))
    y_next_row.npy         [M, W]     int8    — target next row for each context
    entropy_series.npy     [N, T]     float32 — per-step binary entropy
    span_series.npy        [N, T]     int32   — per-step active span
    density_series.npy     [N, T]     float32 — per-step active density
    score_composite.npy    [N]        float32 — composite score
    score_ignition.npy     [N]        float32 — ignition score
    score_structure.npy    [N]        float32 — structure score
    score_entropy.npy      [N]        float32 — entropy score
    score_collision.npy    [N]        float32 — collision score
    score_persistence.npy  [N]        float32 — persistence score
    label_ignition.npy     [N]        bool    — ignition detected
    label_collapse.npy     [N]        bool    — collapse detected
    label_short_cycle.npy  [N]        bool    — short cycle detected
    label_has_collision.npy[N]        bool    — any collision candidate present
    label_has_persistent.npy[N]       bool    — any persistent candidate present
    run_ids.txt                               — one run_id per line (index → id)
    ic_fingerprints.txt                       — one fingerprint per line
    manifest.json                             — full description of all exports

    Parameters
    ──────────
    jsonl_path   : path to JSONL file written by field-ignition search
    out_dir      : directory where .npy files are written (created if absent)
    context_steps: number of preceding rows used as autoregressive context
                   for X_context / y_next_row pairs (default: 8)

    Returns the manifest dict.
    """
    np = _try_import_numpy()
    os.makedirs(out_dir, exist_ok=True)

    # ── Load records ─────────────────────────────────────────────────────────
    records = []
    with open(jsonl_path, "r", encoding="utf-8") as f:
        for line_no, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError as e:
                print(f"  WARNING: skipping malformed line {line_no}: {e}")
                continue
            if "history" not in rec:
                continue
            records.append(rec)

    if not records:
        raise ValueError(f"No valid records found in {jsonl_path}")

    print(f"  Loaded {len(records)} records from {jsonl_path}")

    # ── Determine dominant (T, W) shape ──────────────────────────────────────
    shape_counts = Counter(
        (len(rec["history"]), len(rec["history"][0]))
        for rec in records
        if rec["history"]
    )
    (dominant_T, dominant_W), dominant_count = shape_counts.most_common(1)[0]

    excluded = len(records) - dominant_count
    if excluded > 0:
        print(f"  WARNING: {excluded} record(s) have non-dominant shape and will be skipped.")
        print(f"           Dominant shape: T={dominant_T}, W={dominant_W} ({dominant_count} records)")

    selected = [
        rec for rec in records
        if len(rec["history"]) == dominant_T and len(rec["history"][0]) == dominant_W
    ]
    N = len(selected)

    # ── Build primary arrays ─────────────────────────────────────────────────
    histories     = np.zeros((N, dominant_T, dominant_W), dtype=np.int8)
    ent_series    = np.zeros((N, dominant_T), dtype=np.float32)
    span_series_a = np.zeros((N, dominant_T), dtype=np.int32)
    dens_series   = np.zeros((N, dominant_T), dtype=np.float32)

    sc_composite  = np.zeros(N, dtype=np.float32)
    sc_ignition   = np.zeros(N, dtype=np.float32)
    sc_structure  = np.zeros(N, dtype=np.float32)
    sc_entropy    = np.zeros(N, dtype=np.float32)
    sc_collision  = np.zeros(N, dtype=np.float32)
    sc_persistence= np.zeros(N, dtype=np.float32)

    lb_ignition   = np.zeros(N, dtype=bool)
    lb_collapse   = np.zeros(N, dtype=bool)
    lb_short_cycle= np.zeros(N, dtype=bool)
    lb_has_coll   = np.zeros(N, dtype=bool)
    lb_has_persist= np.zeros(N, dtype=bool)

    run_ids_list  = []
    ic_fps_list   = []

    for i, rec in enumerate(selected):
        histories[i] = np.array(rec["history"], dtype=np.int8)

        ent = rec.get("entropy_series", [0.0] * dominant_T)
        spn = rec.get("active_span_series", [0] * dominant_T)
        dns = rec.get("density_series", [0.0] * dominant_T)
        ent_series[i]    = np.array(ent[:dominant_T], dtype=np.float32)
        span_series_a[i] = np.array(spn[:dominant_T], dtype=np.int32)
        dens_series[i]   = np.array(dns[:dominant_T], dtype=np.float32)

        scores = rec.get("scores", {})
        sc_composite[i]   = float(scores.get("composite", 0.0))
        sc_ignition[i]    = float(scores.get("ignition_score", 0.0))
        sc_structure[i]   = float(scores.get("structure_score", 0.0))
        sc_entropy[i]     = float(scores.get("entropy_score", 0.0))
        sc_collision[i]   = float(scores.get("collision_score", 0.0))
        sc_persistence[i] = float(scores.get("persistence_score", 0.0))

        labels = rec.get("labels", {})
        lb_ignition[i]    = bool(labels.get("ignition_detected", False))
        lb_collapse[i]    = bool(labels.get("collapse_detected", False))
        lb_short_cycle[i] = bool(labels.get("short_cycle_detected", False))
        lb_has_coll[i]    = len(rec.get("collisions", [])) > 0
        lb_has_persist[i] = len(labels.get("structure_candidates", [])) > 0

        run_ids_list.append(rec.get("run_id", ""))
        ic_fps_list.append(rec.get("ic_fingerprint", ""))

    # ── Build autoregressive context/target pairs ─────────────────────────────
    # For each run i and each step t in [context_steps, T):
    #   X_context[idx] = histories[i, t-context_steps : t, :]   shape [C, W]
    #   y_next_row[idx] = histories[i, t, :]                     shape [W]
    C = context_steps
    M = N * (dominant_T - C)
    X_context   = np.zeros((M, C, dominant_W), dtype=np.int8)
    y_next_row  = np.zeros((M, dominant_W),    dtype=np.int8)

    idx = 0
    for i in range(N):
        for t in range(C, dominant_T):
            X_context[idx]  = histories[i, t - C : t, :]
            y_next_row[idx] = histories[i, t, :]
            idx += 1

    # ── Save all arrays ───────────────────────────────────────────────────────
    def save(name, arr):
        path = os.path.join(out_dir, name)
        np.save(path, arr)
        return {"file": name, "shape": list(arr.shape), "dtype": str(arr.dtype)}

    manifest_files = {}
    manifest_files["histories"]          = save("histories.npy",          histories)
    manifest_files["X_context"]          = save("X_context.npy",          X_context)
    manifest_files["y_next_row"]         = save("y_next_row.npy",         y_next_row)
    manifest_files["entropy_series"]     = save("entropy_series.npy",     ent_series)
    manifest_files["span_series"]        = save("span_series.npy",        span_series_a)
    manifest_files["density_series"]     = save("density_series.npy",     dens_series)
    manifest_files["score_composite"]    = save("score_composite.npy",    sc_composite)
    manifest_files["score_ignition"]     = save("score_ignition.npy",     sc_ignition)
    manifest_files["score_structure"]    = save("score_structure.npy",    sc_structure)
    manifest_files["score_entropy"]      = save("score_entropy.npy",      sc_entropy)
    manifest_files["score_collision"]    = save("score_collision.npy",    sc_collision)
    manifest_files["score_persistence"]  = save("score_persistence.npy",  sc_persistence)
    manifest_files["label_ignition"]     = save("label_ignition.npy",     lb_ignition)
    manifest_files["label_collapse"]     = save("label_collapse.npy",     lb_collapse)
    manifest_files["label_short_cycle"]  = save("label_short_cycle.npy",  lb_short_cycle)
    manifest_files["label_has_collision"]= save("label_has_collision.npy",lb_has_coll)
    manifest_files["label_has_persistent"]= save("label_has_persistent.npy", lb_has_persist)

    with open(os.path.join(out_dir, "run_ids.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(run_ids_list))
    with open(os.path.join(out_dir, "ic_fingerprints.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(ic_fps_list))

    manifest = {
        "code_version": CODE_VERSION,
        "source_jsonl": jsonl_path,
        "N": N,
        "T": dominant_T,
        "W": dominant_W,
        "context_steps": C,
        "M_autoregressive": M,
        "excluded_records": excluded,
        "training_tasks": {
            "next_row_prediction":          "X=X_context[M,C,W]  y=y_next_row[M,W]",
            "ignition_classification":      "X=histories[N,T,W]  y=label_ignition[N]",
            "collapse_prediction":          "X=histories[N,T,W]  y=label_collapse[N]",
            "entropy_prediction":           "X=histories[N,T,W]  y=entropy_series[N,T]",
            "active_span_prediction":       "X=histories[N,T,W]  y=span_series[N,T]",
            "collision_candidate_detection":"X=histories[N,T,W]  y=label_has_collision[N]",
            "persistent_structure_detection":"X=histories[N,T,W] y=label_has_persistent[N]",
        },
        "files": manifest_files,
    }

    with open(os.path.join(out_dir, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    return manifest

# ============================================================
# SEARCH LOOP
# ============================================================

def search_qf_ignitions(
    width=80,
    steps=60,
    qf_density=0.01,
    qf_steps=1,
    attempts=1000,
    out=None,
    out_dir=None,
):
    params = {
        'width': width,
        'steps': steps,
        'qf_density': qf_density,
        'qf_steps': qf_steps,
        'attempts': attempts,
        'pressure_function_id': PRESSURE_FUNCTION_ID,
    }

    best_composite = -1e9
    best_record = None
    best_attempt = None
    best_filename = None
    saved_count = 0

    for attempt in range(1, attempts + 1):
        run_id = str(uuid.uuid4())
        history = evolve_field(width, steps, qf_density, qf_steps)

        # Collect initial conditions from the candidate
        ic_state = initial_state_from_history(history)
        ic_fp = initial_condition_fingerprint(history)

        # Phase 2: structure tracking
        tracks = track_regions_over_time(history)
        collisions = detect_collision_candidates(tracks)
        persistent = find_persistent_candidates(tracks, min_lifetime=8)

        scores = score_all(history, tracks, collisions, persistent)
        is_best = scores['composite'] > best_composite

        if is_best:
            best_composite = scores['composite']
            best_record = build_record(
                run_id, params, history, scores, tracks, collisions, persistent,
                ic_fingerprint=ic_fp, initial_state=ic_state,
            )
            best_attempt = attempt
            best_filename = f"run_{attempt:05d}_ic{ic_fp}.txt" if out_dir else None

        # Save every non-zero run to its own file
        if out_dir and is_nonzero(history):
            save_run_file(
                run_id=run_id,
                attempt=attempt,
                history=history,
                scores=scores,
                params=params,
                tracks=tracks,
                collisions=collisions,
                persistent=persistent,
                out_dir=out_dir,
                ic_fingerprint=ic_fp,
                initial_state=ic_state,
                is_best=is_best,
            )
            saved_count += 1

        if out:
            record = build_record(
                run_id, params, history, scores, tracks, collisions, persistent,
                ic_fingerprint=ic_fp, initial_state=ic_state,
            )
            append_jsonl(record, out)

        if attempt % 100 == 0:
            print(
                f"attempt={attempt:>6}  "
                f"best_composite={best_composite:>10.2f}  "
                f"ignition={scores['ignition_score']:>8.2f}  "
                f"structure={scores['structure_score']:>7.2f}  "
                f"collision={scores['collision_score']:>6.2f}  "
                f"persist={scores['persistence_score']:>6.2f}"
                + (f"  saved={saved_count}" if out_dir else "")
            )

    # Re-stamp best record's file with [BEST] marker
    if out_dir and best_record:
        tracks_obj = track_regions_over_time(best_record['history'])
        collisions_best = detect_collision_candidates(tracks_obj)
        persistent_best = find_persistent_candidates(tracks_obj, min_lifetime=8)
        scores_best = score_all(
            best_record['history'], tracks_obj, collisions_best, persistent_best
        )
        save_run_file(
            run_id=best_record['run_id'],
            attempt=best_attempt,
            history=best_record['history'],
            scores=scores_best,
            params=params,
            tracks=tracks_obj,
            collisions=collisions_best,
            persistent=persistent_best,
            out_dir=out_dir,
            ic_fingerprint=best_record.get('ic_fingerprint', ''),
            initial_state=best_record.get('initial_state'),
            is_best=True,
        )

    return best_composite, best_record, best_filename, saved_count


# ============================================================
# ENTRY POINT
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="Field Search — Fixed Constraint + Sparse Perturbation"
    )
    parser.add_argument('--width',       type=int,   default=80,   help='Field width (default: 80)')
    parser.add_argument('--steps',       type=int,   default=60,   help='Time steps (default: 60)')
    parser.add_argument('--qf-density',  type=float, default=0.01, help='Sparse perturbation density (default: 0.01)')
    parser.add_argument('--qf-steps',    type=int,   default=1,    help='Steps with sparse perturbation active (default: 1)')
    parser.add_argument('--attempts',    type=int,   default=1000, help='Search attempts (default: 1000)')
    parser.add_argument('--out',         type=str,   default=None, help='Output JSONL file path')
    parser.add_argument('--out-dir',     type=str,   default=None, help='Directory to save per-run .txt files for all non-zero runs')
    parser.add_argument('--resume-from',  type=str,   default=None, help='Path to a saved .txt run file; reproduces that run exactly from its initial_state')
    parser.add_argument('--export-npy',   type=str,   default=None, help='Phase 3: path to JSONL file to export as numpy dataset')
    parser.add_argument('--npy-out',      type=str,   default=None, help='Output directory for numpy export (default: <jsonl_dir>/npy_export)')
    parser.add_argument('--context-steps',type=int,   default=8,    help='Context window size for autoregressive pairs (default: 8)')
    args = parser.parse_args()

    print(f"Field Search — {CODE_VERSION}")
    print(f"pressure_function_id: {PRESSURE_FUNCTION_ID}")

    # ── EXPORT MODE (Phase 3) ─────────────────────────────────────
    if args.export_npy:
        npy_out = args.npy_out or os.path.join(
            os.path.dirname(os.path.abspath(args.export_npy)), "npy_export"
        )
        print(f"export_npy:    {args.export_npy}")
        print(f"npy_out:       {npy_out}")
        print(f"context_steps: {args.context_steps}")
        print()
        manifest = export_numpy_dataset(
            jsonl_path=args.export_npy,
            out_dir=npy_out,
            context_steps=args.context_steps,
        )
        print()
        print("EXPORT COMPLETE")
        print(f"  records:       {manifest['N']}")
        print(f"  shape:         [{manifest['N']}, {manifest['T']}, {manifest['W']}]")
        print(f"  AR pairs:      {manifest['M_autoregressive']} (context={manifest['context_steps']})")
        print(f"  excluded:      {manifest['excluded_records']}")
        print(f"  output dir:    {npy_out}")
        print(f"  manifest:      {os.path.join(npy_out, 'manifest.json')}")
        return

    # ── RESUME MODE ──────────────────────────────────────────────
    if args.resume_from:
        print(f"resume_from:   {args.resume_from}")
        print()
        state = load_initial_state_from_file(args.resume_from)
        ic_fp = initial_condition_fingerprint([state])
        print(f"ic_fingerprint:  {ic_fp}  (width={len(state)}, active={sum(state)})")

        history = evolve_from_state(state, steps=args.steps)
        tracks = track_regions_over_time(history)
        collisions = detect_collision_candidates(tracks)
        persistent = find_persistent_candidates(tracks, min_lifetime=8)
        scores = score_all(history, tracks, collisions, persistent)
        s = scores

        print("\n" + "=" * 60)
        print("RESUMED FIELD IGNITION RUN")
        print("=" * 60)
        print(f"composite:       {s['composite']:.4f}")
        print(f"ignition_score:  {s['ignition_score']:.4f}")
        print(f"structure_score: {s['structure_score']:.4f}")
        print(f"entropy_score:   {s['entropy_score']:.4f}")
        print(f"collision_score: {s['collision_score']:.4f}")
        print(f"persist_score:   {s['persistence_score']:.4f}")
        print(f"ignition:        {not s['_meta']['collapse_detected'] and not s['_meta']['short_cycle_detected']}")
        print(f"region_tracks:   {len(tracks)}")
        print(f"collisions:      {len(collisions)}")
        print(f"persistent:      {len(persistent)}")
        print()

        print("HISTORY:")
        render_history(history)

        if args.out:
            run_id = str(uuid.uuid4())
            params = {
                'width': len(state), 'steps': args.steps,
                'qf_density': 0, 'qf_steps': 0, 'attempts': 1,
                'pressure_function_id': PRESSURE_FUNCTION_ID,
                'resumed_from': args.resume_from,
            }
            record = build_record(
                run_id, params, history, scores, tracks, collisions, persistent,
                ic_fingerprint=ic_fp, initial_state=state,
            )
            append_jsonl(record, args.out)
            print(f"Resumed run written to: {args.out}")
        return

    # ── SEARCH MODE ──────────────────────────────────────────────
    print(f"params: width={args.width} steps={args.steps} "
          f"qf_density={args.qf_density} qf_steps={args.qf_steps} "
          f"attempts={args.attempts}")
    if args.out:
        print(f"jsonl output:  {args.out}")
    if args.out_dir:
        print(f"per-run dir:   {args.out_dir}")
    print()

    best_composite, best_record, best_filename, saved_count = search_qf_ignitions(
        width=args.width,
        steps=args.steps,
        qf_density=args.qf_density,
        qf_steps=args.qf_steps,
        attempts=args.attempts,
        out=args.out,
        out_dir=args.out_dir,
    )

    print("\n" + "=" * 60)
    print("BEST FIELD IGNITION RUN")
    print("=" * 60)
    if best_record:
        s = best_record['scores']
        print(f"ic_fingerprint:  {best_record['ic_fingerprint']}")
        print(f"run_id:          {best_record['run_id']}")
        if best_filename and args.out_dir:
            print(f"file:            {os.path.join(args.out_dir, best_filename)}")
        print(f"composite:       {best_composite:.4f}")
        print(f"ignition_score:  {s['ignition_score']:.4f}")
        print(f"structure_score: {s['structure_score']:.4f}")
        print(f"entropy_score:   {s['entropy_score']:.4f}")
        print(f"collision_score: {s['collision_score']:.4f}")
        print(f"persist_score:   {s['persistence_score']:.4f}")
        print(f"ignition:        {best_record['labels']['ignition_detected']}")
        print(f"collapse:        {best_record['labels']['collapse_detected']}")
        print(f"short_cycle:     {best_record['labels']['short_cycle_detected']}")
        print(f"region_tracks:   {len(best_record['tracks'])}")
        print(f"collisions:      {len(best_record['collisions'])}")
        print(f"persistent:      {len(best_record['labels']['structure_candidates'])}")
        print()
        print("HISTORY:")
        render_history(best_record['history'])
        print()

        if args.out:
            best_record['_best'] = True
            append_jsonl(best_record, args.out)
            print(f"All runs written to: {args.out}")

        if args.out_dir:
            print(f"Non-zero runs saved: {saved_count} files in {args.out_dir}/")


if __name__ == "__main__":
    main()

