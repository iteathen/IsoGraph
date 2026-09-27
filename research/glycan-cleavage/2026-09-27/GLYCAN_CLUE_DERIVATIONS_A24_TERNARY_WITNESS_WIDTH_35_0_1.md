# Glycan clue-fed exact derivations A24 — ternary witness width 35 and private-witness incidence 0.1

**Status:** exact internal derivation after Experiment 043
**Date:** 2026-09-27
**Internal parents:** A21, A22, A23
**Prior exact implicit range:** G-IA001..G-IA390
**Experiment:** 043, run 36355676844, frozen source SHA 38d7583a62556ffafca5ff4819edb6f8cfba08aa

Experiment 043 searched the complete run-compressed ternary path family of length 6 against the complete irredundant treatment-word universe of length 12.

The randomized search is heuristic with respect to maximum cover size. The selected cover itself is verified exactly.

---

## G-IA391 — irredundant solving words may be padded to any larger length

Assume an effective treatment alphabet with at least two distinct labels.

Let w be a run-compressed treatment word.

For every L >= LENGTH(w), there exists a run-compressed word w' of length exactly L such that:

    w <=subseq w'.

Construction:

Repeatedly append any treatment label different from the current final label.

Because at least two labels exist, such a choice is always available.

Subsequence containment is preserved under insertion.

Therefore every path covered by w is also covered by w'.

---

## G-IA392 — threshold-L infeasibility excludes every shorter solution

Fix a singleton-susceptibility path family over an alphabet with at least two labels.

If no run-compressed word of length exactly L covers the family, then no treatment word of length <=L solves it.

Proof:

Any solving word can delete adjacent duplicate labels without changing the phase transformer, producing a run-compressed solving word of no greater length.

If that word had length <=L, G-IA391 would pad it to a run-compressed length-L solving word, contradiction.

Thus:

    no solution in U_L
    ->
    OPT > L.

---

## G-IA393 — Experiment 043 supplies a 35-path threshold-critical family

Experiment 043 considered:

    all 96 run-compressed ternary singleton paths of length 6

and the complete threshold universe:

    U_12

with:

    |U_12| = 3 * 2^11 = 6144.

After 50,000 deterministic randomized deletion-minimization trials, the largest selected inclusion-minimal forbidden-set cover found had:

    35 paths.

For that selected family F_35:

    union_{P in F_35} D_12(P)
    =
    U_12.

Therefore there is no length-12 common treatment word.

By G-IA392:

    OPT(F_35) > 12.

---

## G-IA394 — every selected path has an exact private length-12 deletion witness

For every P_i in F_35, Experiment 043 records one word:

    w_i in U_12

such that:

    P_i is not a subsequence of w_i,

while:

    every P_j with j != i
    is a subsequence of w_i.

All 35 private witnesses were verified.

Therefore every one-path deletion satisfies:

    OPT(F_35 without {P_i})
    <= 12.

---

## G-IA395 — the full 35-path family has exact optimum 13

Experiment 043 found the run-compressed length-13 word:

    0102010210210

covering every path in F_35.

Therefore:

    OPT(F_35) <= 13.

Combined with G-IA393:

    OPT(F_35) > 12,

hence:

    OPT(F_35) = 13.

---

## G-IA396 — ternary witness width 35 is exactly realized

F_35 has 35 paths.

The full family has optimum 13.

Deleting any one path yields a family with a length-12 solution.

Therefore by A21's one-path-deletion criterion:

    W(F_35) = 35.

This raises the unconditional frozen-model lower bound to:

    three effective treatment labels
    can realize witness width 35.

---

## G-IA397 — direct glycan realization uses 210 independent non-target nodes

Every path in F_35 is:

- singleton susceptibility;
- run-compressed;
- length 6.

Realize each as one independent non-target chain below retained target structure.

Then:

    35 paths * 6 nodes/path
    =
    210 non-target nodes.

By corrected A8 singleton path-language equivalence, the direct frozen glycan instance has the same treatment-word language as F_35.

Therefore its exact optimum is 13 and its joint-path witness width is 35.

No non-target branching or multi-enzyme site ambiguity is required.

---

## G-IA398 — J_h fails universally for every h <= 34 in the ternary subclass

For the direct F_35 instance:

    W(F_35)=35.

By A22:

    J_h(F_35)=OPT(F_35)
    iff
    h>=35.

Therefore:

    J_h(F_35) < OPT(F_35)

for every:

    h <= 34.

Hence no theorem:

    J_h = OPT universally

can hold for any fixed h<=34 even in deterministic singleton-susceptibility instances over three treatment labels.

---

## G-IA399 — private witnesses form an identity submatrix of the failure incidence relation

Define the threshold failure-incidence matrix:

    M(P,w)=1
    iff
    w in D_12(P)
    iff
    w fails path P.

Index rows by the 35 selected paths:

    P_1,...,P_35,

and columns by their private witnesses:

    w_1,...,w_35.

G-IA394 gives:

    M(P_i,w_i)=1

and for i != j:

    M(P_i,w_j)=0.

Therefore the selected row/column submatrix is exactly the 35-by-35 identity matrix.

This is an exact structural property of every private-witness critical cover.

A high-level analogy to fooling-set / communication matrices may guide external comparison, but no communication-complexity theorem is imported here.

---

## G-IA400 — threshold satisfaction-set Helly number is at least 35

At threshold 12, the 35 satisfaction sets:

    C_12(P_i)

have empty total intersection.

For every i, removing C_12(P_i) leaves a nonempty intersection witnessed by w_i.

Therefore the family contains a minimal empty-intersection subfamily of cardinality 35.

Hence its ordinary set-system Helly number is at least 35.

This is a finite combinatorial statement about the threshold satisfaction-set family.

---

## G-IA401 — Experiment 043 does not establish the maximum threshold-12 witness width

The 50,000-trial deletion search is not exhaustive over all inclusion-minimal covers.

It found exactly two size-35 covers in its deterministic search sequence, while also finding many smaller minimal covers.

Therefore:

    width 35 is verified achievable,

but:

    maximum possible width at threshold 12
    remains unknown.

No optimality claim for 35 is admitted.

---

## G-IA402 — critical-cover search directly targets witness width

The earlier random path-family search attempted to discover high witness width indirectly.

A23/A24 expose the direct finite construction problem:

    find a large inclusion-minimal cover
    of U_L
    using path-forbidden sets D_L(P).

Every verified critical cover plus one solution at length L+1 yields an exact witness-width family.

Therefore critical-cover optimization is the current preferred construction route for widening explicit ternary witness-width lower bounds.

---

## Disposition

New exact implicit assertions:

    G-IA391..G-IA402.

Strongest unconditional finite witness:

    alphabet size:          3
    witness width:          35
    path count:             35
    path length:            6
    threshold length:       12
    exact optimum:          13
    non-target glycan nodes:210.

Conditional complexity boundary remains A22:

    cited PCCSP hardness
    +
    P != NP
    ->
    ternary witness width is unbounded.

Unconditional unboundedness remains open.
