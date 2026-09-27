# Experiment 048 — Boolean-embedding critical-family test

**Status:** exact construction test
**Date:** 2026-09-27
**Internal parent:** A29 standard-example view
**External clue:** Languages Ordered by the Subword Order, Section 5 Boolean-vector embedding
**Implementation constraint:** Node.js only

## Construction

Work inside the run-compressed ternary language.

Choose equal-length blocks:

    u = 01
    v = 02

so:

    uv = 0102

is primitive, and every concatenation in `{u,v}*` remains run-compressed.

For width parameter m define:

    n = |uv| + m + 3 = m + 7

and:

    phi_m(t1,...,tm)
    =
    v^t1 (uv)^n ... v^tm (uv)^n.

For standard-example lower vectors use:

    a_i = e_i

and private-witness upper vectors:

    b_i = 1 - e_i.

Define:

    P_i = phi_m(a_i)
    W_i = phi_m(b_i).

All P_i have equal length; all W_i have equal threshold length.

## Exact obligations

For m=3 and m=4:

1. verify every P_i and W_i is run-compressed;
2. verify `P_i` is not a subsequence of `W_i`;
3. verify `P_j` is a subsequence of `W_i` for every j != i;
4. compute the exact shortest common supersequence length of all P_i;
5. compare that optimum to the common W_i threshold length and to phi_m(1,...,1).

## Search algorithm

Use exact A* on product-progress states:

- one state stores one prefix-progress index per P_i;
- one treatment symbol advances every path whose next symbol matches;
- heuristic = maximum remaining path length;
- stop only when all path positions are consumed.

For m<=4 each progress vector fits in one uint32 byte-packed key.

## High-value outcome

If:

    SCS(P_1,...,P_m)
    >
    |W_i|

then the P_i / W_i standard example is already a threshold-critical family of width m.

If additionally:

    SCS length = |phi_m(1,...,1)|,

that suggests the rigid Boolean embedding may force one optional v-block per coordinate in every common supersequence.

Such a theorem would give an unconditional arbitrary-width construction if it generalizes.

## Falsification outcome

If a common supersequence of length <=|W_i| exists, preserve it explicitly. That would show arbitrary standard examples in subword order are insufficient even under this rigid equal-length embedding.

## Acceptance

The experiment is descriptive: it records exact m=3 and m=4 outcomes. No general theorem is accepted solely from these controls.