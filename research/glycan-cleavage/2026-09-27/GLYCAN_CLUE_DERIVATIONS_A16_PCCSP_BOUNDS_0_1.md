# Glycan clue-fed exact derivations A16 — PCCSP lower-bound transfer 0.1

**Status:** exact internal derivations informed by PCCSP prior art
**Date:** 2026-09-27
**External reference:** Bürgy, Baptiste, Hertz, An exact dynamic programming algorithm for the precedence-constrained class sequencing problem, Computers & Operations Research 124 (2020), 105063
**Internal scope:** singleton-susceptibility subclass of frozen glycan 0.1
**Prior exact implicit range:** G-IA001..G-IA318

The external paper supplies the search cue. The assertions below are supported directly by the singleton glycan precedence/treatment semantics.

## G-IA319 — singleton exhaustive treatment equals PCCSP class execution

Assume every active non-target node q has exactly one susceptible operator c(q).

For one selected class c, the frozen exhaustive glycan phase removes exactly the operations removable by one PCCSP class execution: all c-labeled operations that can be reached by repeatedly removing c-labeled currently available operations without crossing a still-present different-class precedence blocker.

Both processes stop at exactly the first surviving different-class blockers.

Therefore the class-sequence state transition and the glycan saturated phase transition are extensionally equal in this restricted subclass.

## G-IA320 — critical-path class-run lower bound

For an active directed child-to-parent path P, let RUN(P) be the number of maximal consecutive equal-class blocks along P.

Any solving continuation needs at least RUN(P) treatment phases to remove all nodes on P.

Reason: one treatment phase has one class label and cannot cross a still-present different-class block on that path.

Therefore:

    CP(A) = max RUN(P) over active directed paths P

is a lower bound on the remaining optimum.

This is the singleton specialization of the previously admitted path-SEG lower bound.

## G-IA321 — per-class separated-run lower bound

For class c and active directed path P, let BLOCK_c(P) be the number of maximal c-labeled blocks on P.

Let:

    r_c(A) = max BLOCK_c(P) over active directed paths P.

Every solving continuation contains at least r_c(A) occurrences of treatment c.

Each c phase can service at most one c block of any one path before a still-present different-class block forces a later c occurrence.

## G-IA322 — one-class summed lower bound

Define:

    OC(A) = sum over classes c of r_c(A).

Then:

    remaining_OPT(A) >= OC(A).

Proof: treatment-word length is exactly the sum, over classes, of the number of occurrences of each class. G-IA321 lower-bounds each summand independently.

## G-IA323 — one-class bound dominates the critical-path bound

For every path P:

    RUN(P) = sum_c BLOCK_c(P).

Hence:

    RUN(P)
    <= sum_c max_P' BLOCK_c(P')
    = OC(A).

Taking the maximum over P gives:

    CP(A) <= OC(A).

Thus the one-class bound is never weaker than the singleton max-path/critical-path bound.

## G-IA324 — one-class bound remains objective-only

OC(A) is an admissible numeric lower bound.

It does not identify which class must be selected next and does not by itself merge states, nodes, or operator identities.

Different remaining states may have the same OC value while having different continuation languages.

## G-IA325 — set-valued susceptibility does not inherit the bound by arbitrary class assignment

In the general frozen model one type may be susceptible to several operators.

Assigning each type one convenient class and applying OC can overstate or understate the true shared-choice structure unless the assignment is separately justified.

Therefore G-IA321-G-IA323 are admitted only for singleton susceptibility.

A valid set-valued generalization requires its own optimization over allowed label assignments or a different dual bound.

## Disposition

New exact implicit assertions: G-IA319..G-IA325.

The next experiment compares CP and OC against exact backward-antichain distances on exhaustive singleton controls, and tests the PCCSP immediate-selection criterion separately rather than importing it by name.