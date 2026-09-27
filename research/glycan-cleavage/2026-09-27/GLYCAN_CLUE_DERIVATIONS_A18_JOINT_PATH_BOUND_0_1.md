# Glycan clue-fed exact derivations A18 — joint-path lower-bound hierarchy 0.1

**Status:** exact internal derivation after Experiment 037 residual analysis
**Date:** 2026-09-27
**Prior exact implicit range:** G-IA001..G-IA335

## G-IA336 — exact progress state for one active maximal path

For active maximal path P=(q1,...,qm) in child-to-parent order, define progress index p in {0,...,m}: positions 1..p have already been covered by the treatment word prefix.

For treatment operator e define ADV_e(P,p) as the largest p' >= p such that every path position p+1,...,p' is susceptible to e.

Equivalently, one occurrence of e greedily consumes the maximal consecutive remaining path block whose susceptibility sets all contain e.

Greedy maximal advancement is exact because covering fewer compatible consecutive positions with the same word occurrence can never create an advantage for later path coverage.

## G-IA337 — exact product progress transition for a path family

For finite path family H={P1,...,Ph}, define product progress state:

    x=(p1,...,ph).

One treatment e maps:

    x -> (ADV_e(P1,p1),...,ADV_e(Ph,ph)).

Starting state is all zeros.

Goal state is the vector of path lengths.

A raw treatment word covers every path in H iff its repeated product-progress transitions reach the goal.

Proof follows directly from the corrected A8 nondecreasing path-coverage semantics, maximizing the nodes assigned to each treatment position.

## G-IA338 — exact joint-path optimum

Define:

    OPT_PATH(H)

as the shortest treatment-word length reaching the product-progress goal for H.

This equals the minimum length of a raw word covering every path in H.

The product state space is finite:

    product over P in H of (|P|+1).

Therefore OPT_PATH(H) is exactly computable by finite shortest-path/BFS search.

## G-IA339 — h-way joint-path lower bound

Let Paths(A) be the active maximal non-target paths of a valid state A.

For h>=1 define:

    J_h(A)
    = max OPT_PATH(H)
      over all H subseteq Paths(A)
      with 1 <= |H| <= h.

If Paths(A) is empty define J_h(A)=0.

Any global solving continuation covers every selected H, hence:

    J_h(A) <= remaining_OPT(A).

## G-IA340 — joint-path hierarchy is monotone

For h1<=h2:

    J_h1(A) <= J_h2(A).

Reason: the family of subsets maximized over only grows.

## G-IA341 — J_1 is exactly max-path SEG

For one path P, the product-progress automaton is the exact one-path set-valued cover problem.

Its shortest word partitions P into the minimum number of compatible contiguous blocks.

Therefore:

    OPT_PATH({P})=SEG(P)

and:

    J_1(A)=max_P SEG(P).

## G-IA342 — full path-family level is exact global optimum

Corrected A8 gives:

    T solves state A
    iff
    T covers every active maximal path.

Therefore if h is at least the number of active maximal paths:

    J_h(A)=remaining_OPT(A).

The hierarchy interpolates monotonically from the cheap single-path lower bound to the exact global problem.

## G-IA343 — two-path level detects opposite-order synchronization

For paths:

    {A},{B}
and
    {B},{A},

the two-path product progress optimum is 3.

Thus J_2 detects the smallest Experiment-037 order-conflict residual that PLB misses.

## G-IA344 — three-path level detects pairwise-compatible/global-incompatible labels

For three one-node paths:

    {A,B}
    {A,C}
    {B,C},

every one- or two-path subproblem has optimum 1, while the three-path family has optimum 2.

Thus:

    J_1=J_2=1
    J_3=2.

This detects the smallest higher-order label-choice residual found after Experiment 037.

## G-IA345 — PLB and J_h are independently admissible and may be combined

Both:

    PLB(A)
and
    J_h(A)

are lower bounds on the same exact remaining objective.

Therefore:

    LB_h(A)=max(PLB(A),J_h(A))

is also admissible and is never weaker than either component.

Neither component is assumed to dominate the other generally.

## G-IA346 — h is a resource/strength parameter, not semantic truth

Choosing small h is an algorithmic relaxation.

Failure of J_h to equal OPT does not mean the missing branch interactions are absent; it only means they require more than h paths to witness under this relaxation.

No fixed h<|Paths| is claimed universally exact.

## Disposition

New exact implicit assertions: G-IA336..G-IA346.

Next experiment: compute J2 and J3 on the Experiment-037 exhaustive surface, compare PLB, max(PLB,J2), and max(PLB,J3) to exact distance, and preserve the smallest remaining residual if any.