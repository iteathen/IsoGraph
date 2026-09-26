# Experiment 031 — Full-Stack Core 0.19 Qualification Plan

**Status:** frozen qualification design before semantic execution  
**Purpose:** directly qualify the current complete IsoGraph semantic stack with Core 0.19 integrated, rather than inheriting the older Core 0.18 full-stack result by implication.

## Stack under test

```text
Core 0.17
+ Core 0.18
+ Core 0.19
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.7
+ DTS 0.1
```

This is a fresh revision-scoped integration qualification. Experiments 027–030 remain immutable predecessor/module evidence and are not rescored.

## Qualification question

Can the exact current modules be applied compositionally without semantic contradiction or boundary collapse when Core 0.19 assertion-support and exact-rendering semantics are active throughout the stack?

## Fresh holdout

Experiment 031 contains 32 cases covering:

1. Core 0.18 observation-first interpretation together with Core 0.19 assertion/support semantics;
2. exact and implicit support, provenance, multiple support paths, grounded/ungrounded support cycles, derivation depth, and non-universal operational closure;
3. QU propagation, invariance, refinement, missing-unknown failure, probabilistic support, and evidence dependence;
4. NEI exact/probabilistic identity boundaries with Core 0.19 support;
5. Core 0.19 exact source rendering integrated with DP 0.7 primitive-first discovery;
6. DP recurrence/derived-view discipline with load-bearing QU;
7. DTS transition semantics, TI, residuals, QU-bearing transition structure, and implicit assertion support;
8. anti-circularity and revision-scoped historical evidence across the complete stack.

The cases are new as an integrated set. Some individual semantic motifs intentionally overlap previously qualified obligations, but no previous experiment output is permitted as cold input.

## Formal success criterion

The hidden mechanical scorer requires:

- F01–F32 exactly once and in order;
- every expected answer field exact;
- every reason nontrivial;
- every authority list nonempty;
- all isolation self-audit flags true;
- every module assessment `SUPPORTED`;
- zero unexpected cases;
- zero duplicate cases.

Formal disposition:

```text
all 32 cases PASS
+ all structural guards PASS
+ full-stack assessment SUPPORTED
= QUALIFIES
```

Anything else is `DOES_NOT_QUALIFY` unless execution fails before a semantic score can be produced, in which case the failure is infrastructure/provider-classified.

## Independence / contamination controls

The cold decoder may read only:

- exact qualified semantic files for the stack;
- `experiments/031/BASELINE_AUTHORITY.md`;
- `experiments/031/FULL_STACK_CORE_0_19_CASES.md`;
- `experiments/031/COLD_PROMPT.md`.

It may not read:

- hidden assertions or scorer code;
- authoring audit;
- prior Experiment 027–030 reports, evidence, scores, or final reviews;
- current repository routing/status files;
- qualification conclusions for Experiment 031;
- browsing or external references.

The runner constructs the packet from the frozen workflow SHA and mechanically verifies all qualified authority hashes before provider execution.

## Historical discipline

Experiment 029 remains formally `DOES_NOT_QUALIFY` at its frozen contract. Experiment 030 remains the fresh corrected Core 0.19 module regression. Experiment 031 neither rescales nor rewrites those results.

A successful Experiment 031 establishes only the exercised direct full-stack composition at the exact pinned revisions. It is not universal completeness.
