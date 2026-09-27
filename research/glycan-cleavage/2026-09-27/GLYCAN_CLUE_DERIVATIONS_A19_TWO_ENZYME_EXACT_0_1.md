# Glycan clue-fed exact derivations A19 — two-enzyme exact path collapse 0.1

**Status:** exact internal derivation
**Date:** 2026-09-27
**Motivation:** Experiment 039 found J2 exact on the complete tested two-enzyme set-valued surface; external PCCSP literature independently notes triviality for at most two singleton classes
**Prior exact implicit range:** G-IA001..G-IA346

External PCCSP prior art is motivation/corroboration only. The theorem below is proved from the glycan path language and permits multi-susceptible nodes.

## G-IA347 — every minimum two-enzyme treatment word is alternating

Let EL={A,B}.

Every minimum solving word contains no adjacent repeated operator by G-IA032.

Over a two-symbol alphabet, any word with no adjacent equal symbols is alternating.

Therefore every minimum solution is exactly one of:

    A B A B ...

or:

    B A B A ...

truncated at some finite length.

## G-IA348 — path feasibility under a fixed starting symbol is a length threshold

For one active maximal path P define:

    a(P)
    = minimum length of an A-start alternating word covering P,

    b(P)
    = minimum length of a B-start alternating word covering P.

Both values are finite because every path susceptibility set is nonempty and alternating words contain arbitrarily many occurrences of both operators.

For L>=0:

    the A-start alternating word of length L covers P
    iff
    L >= a(P).

Similarly for B and b(P).

Forward direction is definition of minimum.

Reverse direction follows because the longer same-start alternating word contains the minimum one as a prefix and treatment insertion cannot destroy path coverage.

## G-IA349 — exact two-enzyme global optimum formula

Let Paths(A) be the active maximal non-target paths.

Define:

    Amax = max_P a(P)
    Bmax = max_P b(P),

with both zero when there are no active paths.

Then:

    remaining_OPT(A)
    = min(Amax,Bmax).

Proof:

- every minimum solution is alternating by G-IA347;
- an A-start solution must have length at least every a(P), hence at least Amax;
- the A-start alternating word of length Amax covers every path by G-IA348 and therefore solves by corrected A8;
- symmetric argument for B;
- choose the shorter of the two exact candidates.

Thus the two-enzyme set-valued problem has a direct polynomial-size value description with no state-space search.

## G-IA350 — at most two paths witness the exact optimum

Choose path P_A attaining Amax and path P_B attaining Bmax.

If the same path attains both, one path suffices.

For the family H={P_A,P_B}:

    max_{P in H} a(P)=Amax
    max_{P in H} b(P)=Bmax.

Therefore:

    OPT_PATH(H)=min(Amax,Bmax)=remaining_OPT(A).

Hence:

    J2(A)=remaining_OPT(A)

for every two-enzyme frozen-0.1 state, including set-valued susceptibility.

This upgrades the Experiment-039 two-enzyme observation to an exact theorem.

## G-IA351 — exact optimum words in the two-enzyme case

If Amax < Bmax, every minimum word must be the unique A-start alternating word of length Amax.

If Bmax < Amax, every minimum word must be the unique B-start alternating word of length Bmax.

If Amax=Bmax>0, both alternating words of that length are candidate optima and each solves; they are distinct raw optimum words unless length 0.

Thus the complete raw optimum family has size at most two in the two-enzyme case.

## G-IA352 — direct computation of a(P), b(P)

For one path P and fixed start symbol, scan the alternating candidate positions while greedily advancing through every consecutive path node susceptible to the current symbol.

The first prefix length that completes P is the exact threshold.

Equivalently compute the one-path product-progress recurrence under the fixed alternating symbol stream.

Each threshold requires only finite path-local work.

## G-IA353 — two-enzyme exactness does not extend by alphabet cardinality alone

The proof depends on a special binary fact:

    no-adjacent-repeat word over {A,B}
    has only two possible forms,
    determined by starting symbol and length.

For three or more enzymes, no-adjacent-repeat words have branching symbol choices and cannot be summarized by two scalar thresholds.

Therefore no J3 theorem is inferred from alphabet cardinality or from Experiment 039's finite three-enzyme result.

Experiment 040 is the active falsifier for that overgeneralization.

## Prior-art boundary

The 2020 PCCSP paper reports that PCCSP is trivial for at most two classes and strongly NP-hard from three classes even on disjoint paths.

The theorem here is not imported from PCCSP: it directly covers set-valued glycan susceptibility, which is outside the fixed-class PCCSP model.

No external novelty claim is made without a dedicated novelty review.

## Disposition

New exact implicit assertions: G-IA347..G-IA353.

Consequences:

- universal two-enzyme J2 exactness;
- direct optimum formula;
- complete optimum family size <=2;
- no state-space search required for objective/optimum-word computation in this subclass.