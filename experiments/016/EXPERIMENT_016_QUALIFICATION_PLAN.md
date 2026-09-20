# Experiment 016 — NEI 0.4 Focused Qualification Plan

**Status:** frozen qualification design  
**Candidate:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`  
**Base authority:** Core 0.17 + QU 0.1 + historical qualified NEI 0.1/0.2; NEI 0.3 supplied only as the immediate successor precursor retained by 0.4  
**Cases:** `experiments/016/NEI_0_4_CASES.md`  
**Cold prompt:** `experiments/016/COLD_PROMPT.md`  
**Hidden assertions:** `experiments/016/hidden/ASSERTIONS.json`  
**Resource target:** one Gemini semantic call

## Claim

Qualify only the semantic changes introduced by NEI 0.4:

- identity results are derived rather than profile-declared;
- exact and probabilistic identity evidence remain distinct;
- Bayes factor is evidence strength, not posterior or identity truth;
- correlated evidence cannot be double-counted;
- QU is mandatory when unresolved structure affects identity/evidence;
- QU does not imply a probability distribution;
- missing required QU is incomplete, not semantic UNKNOWN;
- scoped quotient equivalence does not silently become global SAME;
- anti-circularity applies to QU restriction and likelihood construction.

## Cases

Q01-Q18 cover every qualification target listed in NEI 0.4 Section 19.

## Isolation

The cold packet may contain only:
- Core 0.17;
- QU 0.1;
- NEI 0.1/0.2 historical base;
- NEI 0.3 precursor;
- NEI 0.4 candidate;
- NEI native vocabulary 0.2;
- public Q01-Q18 holdout;
- public serializer prompt.

It must not contain hidden assertions, scorer, author audit, prior experiment evidence, or expected semantic results.

## Scoring

Qualification is proposition-specific. All 18 cases must match hidden assertions exactly, with:
- no missing/duplicate/unexpected case;
- nontrivial reasoning;
- nonempty authority provenance;
- cold self-audit true;
- module assessment SUPPORTED.

Any mismatch yields DOES_NOT_QUALIFY.

## Resource discipline

One cold semantic call. One provider retry is allowed only for 5xx infrastructure failure inside the same runner. No rerun to improve semantic output.

