# Unique Minimum Support in Two Frozen Navier–Stokes Proof Deletion Spaces

**Joshua Oshiro**

**Agent-derived research generated using the IsoGraph system designed by Joshua Oshiro**

**License:** CC BY 4.0  
© 2026 Joshua Oshiro.

The original text, analysis, diagrams, and explanatory material in this paper are licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. They may be copied, redistributed, adapted, and built upon for any purpose with appropriate attribution. Referenced source code, formal proofs, repository contents, third-party publications, trademarks, and other externally owned materials retain their respective licenses and ownership.

---

## Abstract

Two previously established Navier–Stokes proof-interface analyses were described as source-relative irreducibility results: RF-0.2 over eight fixed interfaces and S0.4 over twenty-five fixed atomic mechanisms. A later IsoGraph discovery pass identified that the existing validation evidence supports a stronger conclusion than irreducibility alone.

For each system, the declared candidate space is the power set of a fixed vocabulary under deletion-only reduction. The dependency model is positive: adding retained support cannot invalidate an already supported obligation, while deleting support can only remove available dependencies. The complete interface set is sufficient, and the validation record supplies an individual deletion witness for every member of the complete set.

Under those conditions, any proper subset omits at least one individually necessary member and is contained in a one-deletion set already known to be insufficient. Therefore the complete set is not merely deletion-irreducible. It is the **only sufficient subset** of its declared deletion space, and hence is both the **unique inclusion-minimum** and the **unique minimum-cardinality sufficient support** in that finite candidate space.

Applied to RF-0.2, the result holds over the fixed vocabulary G1–G8. Applied to S0.4 for the combined whole-space and periodic target, it holds over A0–A24. These are exact finite-space statements. They do not establish a globally shortest Navier–Stokes proof, uniqueness across alternative factorizations, or minimum proof-engineering cost.

## 1. Introduction

The IsoGraph Navier–Stokes research line contains several successive attempts to characterize how much of the represented forced-blowup proof architecture is required to recover its declared final obligations.

RF-0.2 freezes an eight-interface reduced formula. S0.4 refines a later proof architecture into twenty-five atomic mechanisms and mechanically tests the effect of deleting each atom. The S0.4 audit deliberately described its conclusion conservatively as **source-relative irreducibility** and explicitly declined to claim global mathematical uniqueness or a cardinality-minimum proof [1].

That caution remains correct.

However, a separate question can be answered more strongly:

> Given the already frozen vocabulary and the already declared deletion-only candidate space, is there more than one sufficient subset?

An IsoGraph DP 0.8 discovery pass showed that the answer is no for both RF-0.2 and the S0.4 combined target [2].

The stronger result follows from the structure of the candidate space and the existing deletion witnesses. No new Navier–Stokes analytic lemma is required. The novelty is the exact classification of these two represented proof spaces.

## 2. Scope of the Claim

The result in this paper is intentionally bounded.

For a fixed finite vocabulary U, define the deletion candidate space to be every subset of U:

```text
P(U) = all subsets of U
```

A candidate subset is sufficient when the frozen positive dependency graph can still derive the declared target or target set.

The present result assumes:

1. the full vocabulary U is sufficient;
2. the support model is monotone under retained positive support;
3. for every element u in U, deleting only u makes the required target unreachable.

The result does **not** quantify over:

- newly invented interfaces;
- alternative theorem factorizations;
- different semantic quotients;
- replacement lemmas not represented in the frozen graph;
- postulating downstream conclusions as axioms;
- different formal proof constructions;
- proof length, runtime, memory, verification cost, or human readability.

Thus “unique minimum” in this paper always means:

> unique minimum sufficient support **inside the explicitly declared finite deletion-only candidate space**.

## 3. Finite-Space Lemma

Let U be a finite sufficient support set. Assume sufficiency is monotone upward: if S is sufficient and S is a subset of T, then T is also sufficient.

Assume further that for every u in U:

```text
U without {u}
    is insufficient.
```

Then U is the only sufficient subset of U.

### Proof

Take any proper subset S of U.

Because S is proper, there exists at least one u in U that is not in S. Therefore:

```text
S is a subset of U without {u}.
```

The one-deletion set U without {u} is known to be insufficient.

If S were sufficient, upward monotonicity would imply that its superset U without {u} is also sufficient. That contradicts the deletion witness.

Therefore S is insufficient.

Since every proper subset S is insufficient and U itself is sufficient, U is the only sufficient member of P(U).

Consequently U is simultaneously:

- the unique inclusion-minimum sufficient subset;
- the unique inclusion-maximal sufficient subset within the deletion space, trivially because it is the only sufficient subset;
- the unique minimum-cardinality sufficient subset;
- the unique maximum-cardinality sufficient subset among sufficient subsets, again trivially because it is the only one.

Only the first and third characterizations are relevant to proof-support minimization.

The lemma is elementary. The substantive point here is that the frozen RF-0.2 and S0.4 validation records satisfy its hypotheses.

## 4. RF-0.2

### 4.1 Frozen candidate vocabulary

RF-0.2 uses the fixed interface vocabulary:

```text
G1, G2, G3, G4, G5, G6, G7, G8
```

The native rendering is frozen as `REDUCED_FORMULA_0_2.isg`, Git blob:

```text
e219437e9707d96ffb94af66a025e4ba84d952a8
```

[3].

Its validation record is frozen at Git blob:

```text
f1508137dc17fb910dff608561085327438cac49
```

and supplies a load-bearing deletion witness for each G-interface [2].

The declared candidate space is not an open-ended search over all possible proof formulations. It is:

```text
P({G1,...,G8})
under deletion-only reduction.
```

### 4.2 Stronger conclusion

The previous interpretation established that every G-interface was individually load-bearing.

The finite-space lemma strengthens that statement.

Every proper subset of `{G1,...,G8}` omits some `Gi`. That subset is contained in the corresponding one-deletion candidate already shown to fail. Because the dependency model is positive, deleting still more support cannot restore the missing obligation.

Therefore:

```text
{G1,...,G8}
    is the only sufficient subset
    in P({G1,...,G8}).
```

Hence RF-0.2 has:

```text
unique inclusion-minimum support
and
unique minimum-cardinality support
```

inside its frozen deletion space.

### 4.3 What this does not prove

The RF result does not prove that eight is the globally smallest possible number of interfaces for every correct representation of the theorem.

Another factorization could:

- divide or merge responsibilities differently;
- expose a different intermediate theorem;
- use a different vocabulary;
- prove one represented interface from other information not present in RF-0.2.

Those possibilities lie outside the declared candidate space.

## 5. S0.4

### 5.1 Frozen atomic vocabulary

S0.4 refines the represented proof architecture into twenty-five atomic mechanisms:

```text
A0, A1, ..., A24
```

The native rendering is frozen as `S0_4_ATOMIC_MINIMALITY.isg`, Git blob:

```text
c4584b6592dd70a4698ca4c4b187bde84229712a
```

[4].

The corresponding audit identifies the role, representative source, first irreplaceable consumer, and deletion witness for each atom [1].

The mechanical validation records:

```text
A0-A21:
    deleting any one makes both final targets unreachable

A22:
    R3 remains reachable
    periodic target becomes unreachable

A23:
    R3 becomes unreachable
    periodic target remains reachable

A24:
    R3 remains reachable
    periodic target becomes unreachable
```

[5].

The combined objective requires both represented final obligations:

- the whole-space R3/C forced-breakdown target;
- the periodic/D forced-breakdown target.

Therefore every atom A0–A24 is individually necessary for that combined objective in the frozen graph.

### 5.2 Unique minimum for the combined target

Let:

```text
U = {A0,...,A24}.
```

The candidate space is every subset of U under deletion-only reduction.

The full set U is sufficient.

For every Ai, the set `U without {Ai}` fails at least one required final target.

Therefore any proper subset S of U omits some Ai and is contained in a known failing one-deletion set. Under positive support monotonicity, S cannot be sufficient.

It follows that:

```text
{A0,...,A24}
    is the only sufficient subset
    for the S0.4 combined target
    inside P({A0,...,A24}).
```

Thus S0.4 has a **unique inclusion-minimum** and a **unique minimum-cardinality** sufficient support for the combined target inside this frozen candidate space.

This is stronger than the original phrase “source-relative irreducible.”

## 6. Target-Specific Corollaries

The same support reasoning can be scoped to a narrower declared objective.

For the current fixed S0.4 graph, the R3-only support cone excludes the periodic-only adapter and periodic obstruction:

```text
R3-only current support:
    A0-A21 + A23
```

The periodic-only current support cone excludes the whole-space uniqueness obstruction:

```text
periodic-only current support:
    A0-A22 + A24
```

The DP 0.8 record classifies these as minimum supports inside their corresponding fixed deletion graphs [2].

These objective-scoped claims are weaker than the combined-target result because changing the factorization can alter what belongs to the support cone.

In particular, later source-consumer inspection found that A20 finite-energy closure may be a packaging dependency rather than an intrinsic periodic semantic dependency [6]. That later finding does not contradict the S0.4 minimum result. It demonstrates why the candidate-space qualifier is essential.

## 7. Minimal Versus Minimum

The distinction between “minimal” and “minimum” is central.

A support is **minimal** under deletion if no single retained element can be removed while preserving sufficiency.

A support is **minimum-cardinality** if no other sufficient support in the declared candidate space contains fewer elements.

Normally, a collection of single-deletion failures establishes only minimality. It does not automatically establish minimum cardinality in an arbitrary search space.

Here the stronger conclusion is available because the candidate space has additional structure:

- every candidate is a subset of the full fixed vocabulary;
- the support relation is positive/monotone;
- every one-deletion superset of any proper candidate is already known to fail.

That turns the deletion witnesses into an exhaustive statement over the full power-set candidate space.

The result can therefore be summarized as:

```text
single-deletion irreducibility
+ complete deletion-only subset space
+ positive support monotonicity
=
unique sufficient subset
```

for these two frozen models.

## 8. Why the Qualifier Matters

The strongest lesson is not that the Navier–Stokes proof has been globally minimized.

It has not.

The result instead separates two questions that can otherwise be conflated.

### Question A

Within this exact representation, can any subset of the represented support still derive the target?

For RF-0.2 and S0.4 combined:

```text
No.
```

The complete support is uniquely sufficient.

### Question B

Could a different representation or factorization derive the same mathematical target with a different support basis?

For the global proof:

```text
Open.
```

Indeed, the separate periodic packaging-dependency analysis provides a concrete candidate example where a different factorization may bypass a field that is mandatory inside S0.4 [6].

Thus:

```text
unique minimum inside one representation
    does not imply
global minimum across representations.
```

The two results are complementary rather than contradictory.

## 9. Relationship to the Formal Source

The IsoGraph proof family is pinned to:

```text
openai/NavierStokesAndEuler
commit f9e8bc5b38b6e212696e8a30e3e91517af887bbd
```

[7].

S0.4 imports thirty-four source declarations with no missing source imports and records 126 native relation occurrences across its twenty-five atoms [5].

The unique-minimum result in this paper does not modify those formal declarations. It is a theorem about the already frozen dependency representation and candidate space derived from that source.

No claim is made that Lean itself proves that A0–A24 are the only possible semantic basis for the theorem.

## 10. Limitations

The following limitations are part of the result.

First, the minimum is **representation-relative**. A different vocabulary defines a different candidate space.

Second, the result is **deletion-space-relative**. Replacement, fusion, refinement, theorem strengthening, and alternative constructions are not candidates unless explicitly represented.

Third, the result is **objective-relative**. The S0.4 combined target and its R3-only or periodic-only projections have different sufficient-support cones.

Fourth, the result is not a performance statement. Minimum support count does not imply minimum checking cost, runtime, memory, formal proof size, or human complexity.

Fifth, the DP 0.8 discovery procedure that surfaced the stronger classification remains an experimental discovery layer. This publication does not promote DP 0.8 or alter the frozen source authority.

## 11. Conclusion

The RF-0.2 and S0.4 Navier–Stokes proof representations support a stronger exact statement than previously recorded.

For RF-0.2:

```text
within P({G1,...,G8})
under the declared deletion-only positive-support model,

{G1,...,G8}
is the only sufficient subset.
```

For S0.4 and the combined R3 plus periodic objective:

```text
within P({A0,...,A24})
under the declared deletion-only positive-support model,

{A0,...,A24}
is the only sufficient subset.
```

Therefore each full support is both the unique inclusion-minimum and the unique minimum-cardinality sufficient support within its respective frozen finite candidate space.

The result does not establish a globally shortest Navier–Stokes proof. Instead, it precisely identifies what has been minimized: the support of two fixed proof representations under exhaustive deletion.

That distinction is important because it permits both statements to be true at once:

```text
the current representation has a unique minimum support

and

a different representation may admit a different support basis.
```

The companion periodic packaging-dependency result supplies a concrete reason to take that second possibility seriously.

## Provenance and Contribution Note

Joshua Oshiro is the author of this paper and the designer of the IsoGraph system and discovery methodology used in this research.

The specific stronger classification reported here was generated by an **AI research agent operating through Oshiro's IsoGraph system** during a structural-discovery pass over the frozen Navier–Stokes proof representations and validation records. The agent-derived result was checked against the declared candidate spaces, the S0.4 deletion validation, and the pinned research artifacts before publication.

This distinction is recorded to separate authorship and system/method design from the agent execution that produced the specific discovery.

## License

© 2026 Joshua Oshiro.

This work is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

You are free to share, copy, redistribute, remix, transform, and build upon the original material for commercial or noncommercial purposes, provided appropriate credit is given to Joshua Oshiro, the license is identified, and changes are indicated.

This license applies to the original text, analysis, diagrams, and explanatory material in this paper. Referenced source code, formal proofs, repository contents, third-party publications, trademarks, and other externally owned materials retain their original licenses and ownership.

## References

[1] IsoGraph, [S0.4 Atomic Interface Minimality Audit](../../navier-stokes-proof/S0_4_ATOMIC_MINIMALITY_AUDIT.md), Git blob `e004980610a5916ff94dbe7a3173d6840804f5d1`.

[2] IsoGraph, *DP 0.8 Discovery Run — Navier–Stokes Forced-Blowup Family*, experimental discovery record, branch `research/dp08-rendering-discovery-20260926`, Git blob `6736be1c921da0f04e628ac028d4ff7e420a3a92`.

[3] IsoGraph, [RF-0.2 Native Reduced Formula](../../navier-stokes-proof/REDUCED_FORMULA_0_2.isg), Git blob `e219437e9707d96ffb94af66a025e4ba84d952a8`.

[4] IsoGraph, [S0.4 Atomic Minimality Native Rendering](../../navier-stokes-proof/S0_4_ATOMIC_MINIMALITY.isg), Git blob `c4584b6592dd70a4698ca4c4b187bde84229712a`.

[5] IsoGraph, [S0.4 Atomic Minimality Validation](../../navier-stokes-proof/S0_4_ATOMIC_MINIMALITY_VALIDATION.md), Git blob `ef7e746a85316b930cc45ac02f05b2b2daa06bf7`.

[6] Oshiro, Joshua. [A Packaging Dependency in the Periodic Navier–Stokes Blowup Corollary](NAVIER_STOKES_PERIODIC_PACKAGING_DEPENDENCY_0_1.md). IsoGraph research publication, 2026. Agent-derived research generated using the IsoGraph system designed by Joshua Oshiro. CC BY 4.0.

[7] OpenAI, `NavierStokesAndEuler`, pinned formal source revision `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`.

### Citation

Oshiro, Joshua. *Unique Minimum Support in Two Frozen Navier–Stokes Proof Deletion Spaces*. IsoGraph research publication, 2026. Agent-derived research generated using the IsoGraph system designed by Joshua Oshiro. CC BY 4.0.
