# Counterfactual repair layer — isolated Woit/Lisi research

**Status: PROJECT-GENERATED / NONAUTHORITATIVE.** The eight candidate discrepancy models are in a separate branch and directory; they are not replacements for either author's published claims or for the independent L and W source treatments.

**Frozen branch base:** `21727ea5792aa8eeea322752054f2694bf25446b`
**Expansion:** R07–R08 Woit candidates are additive successors to the original R01–R06 records.
**Branch:** `research/woit-lisi-repair-sandbox-20261011`
**Source and authority changes:** none. L G0 remains OPEN; W G1 remains independently gated; PR #70 stays unmerged.

| Case | Executed model | Verification scope | Boundary |
| --- | --- | --- | --- |
| R01 | Distinguish Lorentz `SL(2,C)` from split `SL(2,R) x SL(2,R)` | centers 2 vs 4; Killing inertias (3,3) vs (4,2) | Not an author-approved correction |
| R02 | Counterfactual octonion cell `e6*e7: -e2 -> +e2` | 2->0 anti-involution, 28->0 composition, 7->0 Clifford-pair failures | Journal unchanged; later arXiv is distinct |
| R03 | Finite `(Q8 x C4)/<(-1,c²)>` or nontrivial `Q8 ⋊ C2` | 8-element subgroup, 16-element extension, order-four center | Does not determine global Spin claim |
| R04 | Project vector action `[B,v]` | 4/4 p5 eigenbranches; original p4 contraction is 1/4 | Missing author normalization |
| R05 | Mixed phase `-i` and *separate* coordinate rescale `N=M/4` | mixed brackets 24/24/72; phase fails 48 nonzero brackets | Naive phase automorphism rejected; no full H1 solution |
| R06 | Conjugation plus explicit chiral-role swap, finite charts only | 64 triality triples, 6 strict failures, 16 incidence pairs | Global infinity triality still rejected |
| **R07** | Woit §4.2: isolated first-factor **direct-sum hypothesis** replacing printed tensor | Restores Hom 16 versus original intermediate 12, all six component dimensions and relative weights | Original tensor retained; Woit intent and field theory unproved |
| **R08** | Woit SU(4) point stabilizer **U(3) ≅ (U(1)×SU(3))/Z3** | Exact block-group proof and 1728-element 12th-root stabilizer sample with 3:1 discrete covering | Intro may be shorthand; globally normalized U(1) charges require a lift |

The Woit additions are described in [R07/R08 source-specific model notes](WOIT_R07_R08_ALTERNATIVES_0_1.md). R07 protects the original §4.2 printed tensor and the three final direct-sum versus two formal-plus symbols; R08 protects the original §1 and §4.2 stabilizer descriptions without treating their Lie-algebra similarity as exact group identity. Both were checked against unchanged pinned W SSC and negative-audit source records.

The two distinct diagnostics in **R05** must not be collapsed. R06 is not permission to attach a total Lisi triality action to Woit's point at infinity. A PASS on this layer's tests means the bounded positive and *negative* predictions were reproduced, not that the physical theory was repaired.

## Files and replay

- [CANDIDATES_0_1.json](CANDIDATES_0_1.json) / [LOCAL_MECHANICAL_EVIDENCE_0_1.json](LOCAL_MECHANICAL_EVIDENCE_0_1.json): original six-model immutable predecessor snapshot.
- [CANDIDATES_0_2.json](CANDIDATES_0_2.json) / [LOCAL_MECHANICAL_EVIDENCE_0_2.json](LOCAL_MECHANICAL_EVIDENCE_0_2.json): two W-only successors, source Git blob pins, outcomes and false-inference guards.
- [verify-repairs.cjs](verify-repairs.cjs) / [verify-woit-repairs.cjs](verify-woit-repairs.cjs): original six standalone checks and two new source-pinned checks.
- [WOIT_R07_R08_ALTERNATIVES_0_1.md](WOIT_R07_R08_ALTERNATIVES_0_1.md): detailed proofs, scope, and counterexamples.

```text
node --check research/woit-lisi-isomorph/repair-layer/verify-repairs.cjs
node research/woit-lisi-isomorph/repair-layer/verify-repairs.cjs
node --check research/woit-lisi-isomorph/repair-layer/verify-woit-repairs.cjs
node research/woit-lisi-isomorph/repair-layer/verify-woit-repairs.cjs
```

Two versioned path-scoped GitHub Actions workflows conserve the original six tests and replay the new Woit checks, without changing or qualifying any frozen source ledger. Project-controlled deterministic CI is *not* independent cold source qualification or an external referee.

## Provenance, discipline, and next gate

Research direction and request to keep alternative repairs in an independent layer: **Joshua Oshiro (2026-10-11 conversation)**. Specific candidate mathematics and sign/phase finite evidence were proposed and formalized in earlier agent-assisted repository research; this branch packages and tests those existing leads. Source authors are **A. Garrett Lisi** and **Peter Woit**; their source claims are not amended here. Dates reflect the creation of this new record and do not assert scientific priority or prior public publication.

Original version-of-record octonion `e6e7=-e2` stays frozen despite later arXiv `e6e7=+e2`. Woit's 2021 printed tensor product and introductory quotient are likewise unchanged. Likewise historical failures, pending author-intent ambiguities, rejected strong U1.1 and unqualified cross-track hypotheses are conserved.

Only after separately authenticated source scope, cold original review, exact semantic reconstruction, full dependency checks, and explicit promotion may a successor consider any of these for source-facing interpretation. Nothing in this layer supplies W or L G0 authority, a G1 promotion, native primitive closure, physics validation or a merge authorization.
