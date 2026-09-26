# Experiment 030 — Core 0.19 QU-Invariant Support Regression Plan

**Status:** frozen fresh focused qualification design  
**Candidate:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md` at Git blob `ae482dda774456a855af942dc8d15fcfd5aae0bb`  
**Predecessor evidence:** Experiment 029 (23/24 PASS; only D09 failed) + ESR 0.1 six-rendering section-18 campaign  
**Qualified dependency:** QU 0.1  
**Cases:** `experiments/030/QU_DISCHARGE_CASES.md`  
**Cold prompt:** `experiments/030/COLD_PROMPT.md`

## Purpose

Resolve the one remaining Core 0.19 qualification distinction exposed by Experiment 029 without replaying the same D09 case or hidden answer.

The focused question is:

```text
when φ is invariant across every admissible realization
under the qualified support scope,

may the assertion body remain φ
while QU/refinement/universality remains in support/scope/provenance?
```

Core 0.19 section 16 target 9 says a universally invariant result may discharge QU from the conclusion while retaining provenance.

This experiment tests that distinction with fresh cases and adversarial near-misses.

## Fresh cases

- R01 — strict refinement + invariant result: plain assertion body versus QU-bearing support.
- R02 — invariant across the unreﬁned QU family: conclusion/body discharge without provenance loss.
- R03 — realizations disagree: no unconditional exact support and no QU discharge.
- R04 — support-scope escape attempt: exact support under Q1 cannot be reused outside Q1 without authority.
- R05 — same assertion body, different QU support lineages: support identity remains distinct.
- R06 — explicit semantic guard versus QU uncertainty: invariant-discharge does not erase a condition that is part of the proposition's valid scope.

## Qualification chain

A clean focused result at the same candidate bytes may be combined with:

- Experiment 029's 23 unaffected PASS cases;
- Experiment 029's all-true scoring guards;
- the ESR 0.1 six-rendering/Q7 predecessor for section 18.

The failed Experiment 029 disposition remains immutable.

## Isolation

Cold packet contains only:

- Core 0.19 candidate;
- QU 0.1;
- Experiment 030 baseline authority;
- fresh R01–R06 cases;
- public serializer prompt.

It excludes Experiment 029 report/score, Experiment 030 hidden assertions/scorer, ESR decoder outputs, routing files, and browsing.

## Resource discipline

One batched semantic invocation covers R01–R06 after deterministic scorer/runner RED→GREEN checks.

No replay of Experiment 029 D09 is permitted.
