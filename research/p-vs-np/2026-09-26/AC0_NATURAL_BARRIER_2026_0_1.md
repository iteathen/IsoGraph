# AC0-natural lower-bound barrier 2026 — source record 0.1

**Status:** contemporary barrier source; no IsoGraph authority effect  
**Campaign:** P-vs-NP structural discovery  
**Date pinned:** 2026-09-26

## Source

Bruno Loff, Suhail Sherif, Navid Talebanfard, Francesca Ugazio,

**The Switching Lemma shows what the Switching Lemma cannot prove: an unconditional natural-proofs barrier**

arXiv:2606.12631, June 2026.

## Source-level result used by this campaign

The authors study **AC0-natural proofs**: natural-proof distinguishers computable by AC0 circuits.

The abstract records three facts relevant to this campaign:

1. switching-lemma-based lower bounds are AC0-natural;
2. most known lower-bound techniques against constant-depth circuits fall into this AC0-natural framework;
3. there is an **unconditional** quantitative barrier: AC0-natural proofs cannot prove lower bounds greater than the stated `2^(n^(7/(d-5)))` regime against depth-`d` circuits.

The paper contrasts this with the switching-lemma PARITY frontier, whose exponent has the `1/(d-1)` form.

The abstract also emphasizes a self-referential feature: the switching lemma is used in the security analysis underlying the barrier against the proof family that includes switching-lemma arguments themselves.

## Scope firewall

This source does **not** establish:

- an unconditional natural-proofs barrier for all Boolean-circuit lower bounds;
- a P-vs-NP barrier by itself;
- that every proof of a stronger AC0 lower bound must fail;
- that every non-AC0-natural proof succeeds;
- that changing a constant in a switching estimate changes the proof's naturality class.

The barrier is a theorem about a specific proof-property class and quantitative target regime.

## Relation to the formal PARITY control

The pinned Lean control proves the sharp switching-lemma PARITY lower bound:

```text
exp(Omega_d(n^(1/(d-1))))
```

for fixed depth.

The 2026 barrier source places switching-lemma-style proofs inside the AC0-natural class and proves a ceiling for that class in a comparable exponent regime.

Therefore the P-vs-NP campaign gains a new falsifier:

```text
improve the same switching proof internally
without changing its AC0-natural proof signature
    !=
evidence of escaping the AC0-natural barrier
```

## Discovery implication

DP should classify modifications to the formal PARITY proof along two independent axes:

```text
T — theorem strength / quantitative improvement
B — barrier-signature change
```

A change may improve `T` while leaving `B` unchanged.

For a barrier-crossing research campaign, only a verified change in `B` is evidence that the method has left the blocked proof family.

## Authority boundary

The exact internal proof of the 2026 barrier has not been rendered in IsoGraph yet.

This record uses only the public source-level theorem/abstract scope.

A future exact barrier rendering must pin the full definitions and theorem hypotheses before DP is allowed to delete or refactor barrier premises.
