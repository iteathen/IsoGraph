# Glycan clue-fed exact derivations A17 — set-valued partition lower bound 0.1

**Status:** exact internal derivation
**Date:** 2026-09-27
**Motivation:** generalize the near-tight singleton one-class bound without assigning multi-susceptible types arbitrary singleton classes
**Prior exact implicit range:** G-IA001..G-IA325

## G-IA326 — path block representation

For one active child-to-parent path P=(q1,...,qm), any treatment-word coverage induces a partition of the path into contiguous nonempty blocks.

Every block assigned to one treatment position must have a nonempty common susceptibility intersection.

Conversely any contiguous block partition with one selected enzyme from each block intersection yields a path-covering treatment subsequence.

This is the path-local block form already underlying SEG and A10.

## G-IA327 — minimum use count of one enzyme group on one path

Let Gamma be any subset of EL.

For a contiguous path block B define:

    X_B = intersection of E_q over q in B.

A valid block requires X_B nonempty.

The minimum contribution of that block to the number of Gamma-labelled treatment positions is:

    cost_Gamma(B)=0
        if X_B contains an enzyme outside Gamma,

    cost_Gamma(B)=1
        otherwise.

For path P define:

    mu_Gamma(P)

as the minimum sum of cost_Gamma(B) over all valid contiguous block partitions of P.

Then every treatment word covering P contains at least mu_Gamma(P) positions whose treatment symbol lies in Gamma.

Proof: restrict any path-cover embedding to its used treatment positions, form its contiguous same-position blocks, and compare each block to the minimum cost definition.

## G-IA328 — DAG-wide group requirement

For an active instance state define:

    r_Gamma(A)
    = max mu_Gamma(P)
      over active maximal child-to-parent paths P.

Every solving continuation T satisfies:

    count_Gamma(T) >= r_Gamma(A),

where count_Gamma(T) is the number of treatment positions whose raw operator lies in Gamma.

## G-IA329 — partition lower bound

Let Pi={Gamma_1,...,Gamma_t} be a partition of the raw enzyme alphabet EL into disjoint nonempty groups.

Every treatment position belongs to exactly one group, so:

    LENGTH(T)
    = sum_i count_Gamma_i(T).

Using G-IA328:

    remaining_OPT(A)
    >= LB_Pi(A)
    := sum_i r_Gamma_i(A).

## G-IA330 — maximum partition bound

Because EL is finite, it has finitely many set partitions.

Define:

    PLB(A)
    = max over alphabet partitions Pi
      LB_Pi(A).

Then:

    remaining_OPT(A) >= PLB(A).

No one partition is declared canonical.

## G-IA331 — singleton one-class bound is recovered exactly

In the singleton-susceptibility subclass choose the partition into singleton enzyme groups.

For Gamma={c}, mu_Gamma(P) is exactly the number of maximal c-runs on P:

- each c-run requires at least one c-labelled treatment;
- all nodes of one c-run can share one c treatment;
- a different-class node between two c-runs prevents the same treatment position from covering both runs.

Therefore:

    r_{c}(A)

is exactly the A16/PCCSP per-class bound, and:

    LB_singleton_partition(A)=OC(A).

Hence:

    PLB(A) >= OC(A)

on singleton instances, with equality not asserted because coarser alphabet partitions may in principle tie or improve the numeric relaxation.

## G-IA332 — one-group partition recovers path SEG lower bound

For Pi={EL}, every valid path block necessarily has its selected enzyme inside EL, so every block costs 1.

Thus:

    mu_EL(P)=SEG(P),

and:

    LB_{EL}(A)=max_P SEG(P).

Therefore:

    PLB(A) >= max-path SEG(A).

The partition bound unifies the earlier path lower bound and the singleton one-class bound.

## G-IA333 — path group cost is computable by finite interval DP

For a path of length m, mu_Gamma(P) is computed by:

    dp[0]=0

    dp[j]=min over i<j with
          intersection(E_{i+1},...,E_j) nonempty
          of
          dp[i]+cost_Gamma(i+1..j).

This is an exact finite computation.

## G-IA334 — PLB is objective-only

PLB lower-bounds remaining treatment count.

It does not determine:

- the next optimal treatment;
- the exact continuation language;
- an NEI identity relation;
- a canonical alphabet partition.

Equal PLB values can occur on states with different exact futures.

## G-IA335 — no arbitrary singletonization is permitted

For multi-susceptible q, choosing one e in E_q and then applying singleton OC can create a bound tied to a non-authoritative assignment.

The partition bound avoids this by minimizing path group usage over the full represented E_q sets before summing disjoint group requirements.

Therefore arbitrary singletonization is not an admitted lower-bound rule.

## Disposition

New exact implicit assertions: G-IA326..G-IA335.

Next experiment: exhaustive set-valued states with three enzymes through n=4 and two enzymes through n=5, comparing max-path SEG and PLB to exact remaining distance.