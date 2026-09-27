# P vs NP IsoGraph campaign — execution plan 0.1

**Status:** active research plan; not semantic authority  
**Branch:** `research/p-vs-np-isograph-20260926`

## Objective

Build an exact, barrier-aware IsoGraph representation of the P-versus-NP problem and use it to search for structural leads without encoding a preferred answer.

Top-level target:

```text
resolve whether P = NP
```

Both outcomes remain admissible.

## Phase 1 — exact foundation

Render and audit:

- deterministic polynomial-time decidability (P);
- certificate-based NP;
- P subset NP;
- polynomial many-one reductions;
- reduction transitivity;
- NP-hardness / NP-completeness;
- SAT verifier;
- Cook-Levin: SAT is NP-complete.

The first exact rendering is source-relative to the pinned Coq formalization. It is not an attempt to render all of complexity theory.

## Phase 2 — barrier layer

Represent three barrier families separately:

- relativization;
- Natural Proofs;
- algebrization.

Each barrier must include:

- exact or source-faithful trigger conditions;
- conclusion scope;
- assumptions;
- what class of proof methods is excluded;
- what the barrier does **not** imply.

Barrier nodes must not be attached directly to the truth value of P=NP.

## Phase 3 — controls

Positive controls:

1. `P subset NP` — machine-checked inclusion.
2. `SAT is NP-complete` — machine-checked reduction/completeness chain.
3. one established separation/lower-bound theorem with a machine-checked or tightly pinned source, selected only after its exact source is frozen.

Negative/barrier controls:

1. a relativizing argument must not be accepted as resolving P vs NP;
2. a circuit-lower-bound candidate satisfying the Natural-Proofs trigger must preserve the conditional cryptographic barrier;
3. an algebrizing candidate must not be promoted as a P-vs-NP resolution.

## Phase 4 — cross-proof synthesis

After controls pass, compare successful restricted separation/lower-bound proofs and ask:

- which support structures recur?
- which structures are presentation artifacts?
- which structures cross relativization?
- which remain natural?
- which algebrize?
- which requirements are genuinely simultaneous rather than inherited from one proof vocabulary?

## Phase 5 — DP discovery

Use the pinned DP 0.8 candidate experimentally only after the target and source semantics are frozen.

Primary discovery questions:

- Are apparently load-bearing interfaces only packaging dependencies?
- Are there alternative exact factorizations of a restricted lower-bound proof?
- Do known barriers constrain the same support node or distinct nodes?
- Is there a barrier-crossing topology already present in successful restricted results but hidden by conventional presentation?
- Where does QU sit between known reductions, lower-bound mechanisms, and unrestricted circuit complexity?

## Stop conditions

Stop and mark QU rather than infer when:

- a barrier assumption is missing;
- a source theorem is being generalized beyond its population;
- a restricted circuit lower bound is projected to general circuits without authority;
- nonuniform and uniform complexity are being conflated;
- language/class statements and function/circuit statements are being conflated;
- oracle, algebraic-oracle, and unrelativized worlds are being identified;
- a proof-technique limitation is being treated as evidence for P=NP or P!=NP.

## First deliverable

The first campaign checkpoint must contain:

- source registry;
- exact foundation rendering;
- reconstruction/audit document;
- barrier rendering;
- barrier scope audit;
- initial DP run containing discoveries, falsifiers, and QU without claiming resolution.
