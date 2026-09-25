# Experiment 018 — DP 0.6 Cumulative Qualification Plan

**Status:** frozen qualification design  
**Candidate:** `extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md`  
**Cumulative base:** DP 0.1–0.5  
**Qualified dependencies:** current Core 0.17 + Core 0.18, QU 0.1, NEI 0.4 where invoked  
**Cases:** `experiments/018/DP_0_6_CASES.md`  
**Cold prompt:** `experiments/018/COLD_PROMPT.md`  
**Hidden assertions:** `experiments/018/hidden/ASSERTIONS.json`  
**Resource target:** one Gemini semantic call

## Claim

Qualify the cumulative Discovery Protocol behavior through DP 0.6, focusing on:
- observation-first discrepancy handling from DP 0.5;
- independent qualification and discovery dispositions;
- hidden distinction and scoped-equivalence discovery;
- QU preservation for unresolved load-bearing structure;
- bounded search and ordinary-error closure;
- dependency-cone propagation;
- corrected routing to current qualified NEI 0.4 only for identity-dependent conclusions;
- no artificial NEI or QU invocation when the claim does not depend on those semantics.

## Isolation

The cold packet contains only the current qualified semantic dependencies, DP 0.1–0.6, the public holdout and serializer prompt.

Hidden assertions, scorer, author audit, prior experiment evidence, expected answers, repository map and agent guidance remain unavailable until output freeze.

## Scoring

All D01–D14 proposition fields must match exactly. Missing, duplicate or unexpected cases; weak reasoning; absent authority provenance; failed packet self-audit; or inconsistent module assessment fail qualification.

## Resource discipline

One cold semantic call. Only one same-run 5xx provider retry is allowed. No rerun may be used to improve semantic output.
