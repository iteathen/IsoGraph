# Glycan cleavage A8 maximal-path sufficiency correction 0.1

**Status:** current corrective support overlay for A8
**Date:** 2026-09-27
**Corrects:** GLYCAN_IMPLICIT_ASSERTIONS_A8_0_1.md, G-IA191 proof witness
**Semantic effect:** theorem retained; proof witness corrected
**Downstream rule:** use this correction with A8 before admitting G-IA192-G-IA209 downstream

## Observed discrepancy

A8 G-IA191 states the correct candidate theorem:

~~~text
a raw treatment word solves
IFF
it covers every maximal non-target path.
~~~

The written sufficiency proof used this step:

~~~text
a maximal-path witness through c_star
assigns c_star at a phase >= global tau(c_star)
because tau is componentwise earliest.
~~~

That comparison is not justified.

A path-local coverage witness is constrained only by nodes on its one path. It need not satisfy blockers in sibling branches inside the subtree of c_star, so it is not automatically a feasible global assignment to which G-IA168 can be applied.

This is a proof-support defect, not evidence that the theorem itself is false.

## Correct bottleneck-path lemma A8-L1

For every non-target type q and fixed treatment word T:

> If global tau_q(T) is finite, there exists a directed path ending at q whose **path-local earliest coverage completion phase** equals global tau_q(T).

Define path-local earliest completion recursively along one child-to-parent path exactly like A7 tau, but using only the preceding node on that path as the lower-bound blocker.

### Base

If q is a non-target leaf, both global and path-local recurrence select the first phase whose symbol lies in E_q.

Therefore the one-node path [q] has path-local earliest completion equal to tau_q(T).

### Inductive step

Let q have non-target children and let:

~~~text
h = max tau_c(T)
~~~

over direct child types c.

Choose c_star with tau_c_star(T)=h.

By induction there is a path P_star ending at c_star whose path-local earliest completion equals h.

Extend that path by q.

Both:

- the global recurrence for q; and
- the path-local recurrence for P_star followed by q

now search for the least phase j satisfying:

~~~text
j >= h
AND
e_j in E_q.
~~~

Therefore the extended path has path-local earliest completion exactly tau_q(T).

This proves A8-L1.

## Corrected G-IA191 sufficiency proof

Assume T covers every maximal non-target path.

Suppose for contradiction that some global tau_q(T)=INF.

Choose such a q of minimum possible subtree height among globally incomplete types.

Every direct child c then has finite global tau_c(T); otherwise a lower-height incomplete child would exist.

Let:

~~~text
h = max tau_c(T)
~~~

and choose c_star with tau_c_star(T)=h.

By A8-L1 applied to c_star, there is a child-to-c_star path whose path-local earliest completion is exactly h.

Extend that path upward through q and then, if q is not topmost in its non-target component, through any parent chain to a maximal non-target path P.

By assumption T covers P.

Restrict one covering witness to the prefix ending at q.

Because the path prefix below q has path-local earliest completion h, any valid nondecreasing coverage of that prefix followed by q must assign q to some phase j satisfying:

~~~text
j >= h
AND
e_j in E_q.
~~~

But global tau_q(T)=INF means that no such phase exists.

Contradiction.

Therefore every non-target type has finite global tau.

A7 G-IA166/G-IA169 then imply the word solves.

## Consequences

The following A8 results retain their stated exact semantics with G-IA191 support repaired:

- G-IA192 exact global language as maximal-path coverage intersection;
- G-IA193 nonmaximal path redundancy;
- G-IA194/G-IA195 path-language idempotence/dominance;
- G-IA196-G-IA201 generalized common path-cover formulation;
- G-IA202-G-IA206 singleton ordinary-SCS reduction;
- G-IA207-G-IA209 general-case boundaries.

No assertion body changes.

## Repair / discovery disposition

~~~text
repair disposition:
    LOCAL_PROOF_SUPPORT_DEFECT_CONFIRMED
    minimum causal repair = corrected sufficiency witness

discovery disposition:
    maximal-path characterization survives
    generalized path-cover reduction survives
    singleton SCS correspondence survives
~~~

This correction is now required support whenever A8 G-IA191 or its downstream consequences are cited.
