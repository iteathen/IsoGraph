# Experiment 017 — Core 0.18 Observation-First Holdout

**Purpose:** fresh focused qualification of Core 0.18 observation-first discrepancy semantics.

## C01 — Different counting quantities are not a direct value conflict

One evidence system is reported as:

- 12 citation occurrences;
- 4 artifacts.

Both numbers are correct under their stated definitions and refer to the same frozen evidence corpus.

Determine whether the observations measure the same semantic quantity, whether the numbers directly conflict, and what must happen before value comparison.

## C02 — Same aligned quantity may produce a real discrepancy

Two independent decoders inspect the same frozen revision, same artifact-count definition, same scope and same closure assumptions.

One reports artifact count = 4.
The other reports artifact count = 5.

Determine whether the semantic quantity is aligned and whether a real discrepancy remains after alignment.

## C03 — Explicit metadata and derived semantic property are different predicates

A representation contains no explicit `scope` field.

Separately, exact surrounding structure proves that proposition P is valid only in domain S.

One observer reports:

```text
explicit scope metadata present = false
```

Another reports:

```text
proposition has constrained semantic domain = true
```

Determine whether the two booleans are direct contradiction values of one predicate.

## C04 — A genuine decoder error may leave a discovery lead

A decoder incorrectly emits three relation records where the frozen source contains four. Exact byte/source inspection establishes the decoder defect owner.

Before repair, the discrepancy record also shows that this decoder repeatedly collapses one explicit relation whenever that relation is derivable from two others.

Determine the qualification disposition, whether repair may proceed, and whether the derivability pattern must be erased merely because the decoder is wrong.

## C05 — Hidden distinction should split a coarse comparison model

Several reports previously used one informal quantity called `source_count`.

Preserved evidence now establishes that different reports counted:
- citation occurrences;
- artifacts;
- evidence events;
- lineages.

Determine whether one value should be chosen as the correct `source_count`, or whether the comparison model should split the quantities.

## C06 — Scoped quotient is not global identity

Under frozen comparison context C, exact evidence proves objects A and B equivalent for downstream observable O.

Outside C, a distinction D remains represented and may matter to broader questions.

Determine whether the scoped equivalence is valid and whether global identity follows.

## C07 — Unknown potentially load-bearing structure cannot be projected away

Claim K depends on whether unresolved structural distinction U is present.

U has not been resolved, and no authority establishes U irrelevant to K.

An optimizer proposes dropping U from the representation because its value is unknown.

Determine whether projection is permitted and whether the stronger claim K may proceed as though U were absent.

## C08 — Dependency invalidation is not itself a defect

A newly established distinction falsifies a quotient assumption used by eight downstream candidate claims.

Exact provenance identifies every dependency.

Determine whether propagation through the dependency cone should be suppressed to preserve prior results, whether affected claims should be reassessed, and whether historical records at their original revisions are erased.

## C09 — Exact mechanical corruption may use the fast repair path

A stored immutable hash is one byte different from an exact source oracle. The first divergence and owning serializer are established with no semantic ambiguity.

Determine whether exhaustive structural-discovery search is required before repair.

## C10 — Observation-first investigation is bounded

An ordinary local semantic mismatch is aligned by quantity/scope. A straightforward implementation defect is then proved and owns the discrepancy. No independent structural lead remains.

Determine whether investigation may stop after sufficient evidence or must continue through every imaginable hidden-equivalence explanation.

## C11 — An interesting anomaly may end as ordinary error

A surprising mismatch initially suggested a hidden isomorphism. After quantity/scope alignment, preserved evidence and falsification reject every plausible structural explanation and establish an implementation error.

Determine whether the protocol may close the structural lead and whether it should manufacture an isomorphism because the anomaly was interesting.

## C12 — Equal reported values do not establish semantic alignment

Observer A reports `5` meaning five evidence events.
Observer B reports `5` meaning five artifacts.
The scope and revision are otherwise the same.

Determine whether numerical equality establishes that both observers measured the same semantic quantity.
