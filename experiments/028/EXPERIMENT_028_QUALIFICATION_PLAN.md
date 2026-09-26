# Experiment 028 — DP 0.7 Derived-View Successor Qualification Plan

**Status:** frozen design before semantic execution  
**Candidate:** `extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md`  
**Qualified baseline:** Discovery Protocols 0.1–0.6 cumulative module  
**Qualified dependencies:** Core 0.17 + Core 0.18, QU 0.1, NEI 0.4, DTS 0.1 where invoked  
**Fresh predecessor evidence:** DP 0.7 three-positive-control campaign at `fe7874b1cb612c89c76984d7ceb32326466b2149`  
**Cases:** `experiments/028/DP_0_7_CASES.md`  
**Cold prompt:** `experiments/028/COLD_PROMPT.md`

## Goal

Qualify the DP 0.7 successor semantics for derived structural views without re-proving already-qualified DP 0.1–0.6 or dependency modules.

## Qualification claim

DP 0.7 section 17 lists seventeen qualification targets.

Fresh predecessor evidence already discharges:

- target 11 — primitive-first isomorph discovery;
- target 17 — exact-witness support closure.

Experiment 028 freshly tests the remaining targets:

1. same primitive pattern under different labels;
2. same label with materially different primitive structure;
3. loop plus recursion without exclusive taxonomy;
4. mutual/branching/nested recurrence;
5. unknown finite unfolding preserved through QU;
6. unknown branching/unfolding shape preserved as non-scalar QU;
7. represented exit without false termination/progress;
8. cycle without automatic recursion semantics;
9. multiple simultaneously valid derived views;
10. lossy abstraction prevented from masquerading as exact reconstruction;
12. false high-level match rejected by primitive support;
13. derived-view recursion with primitive provenance retained;
14. QU invariant across all admissible unfoldings;
15. DTS-sensitive recurrence comparison;
16. identity-sensitive structural correspondence without false NEI SAME.

Passing this focused delta on top of the pinned qualified DP 0.1–0.6 baseline and the fresh targets-11/17 evidence supports cumulative DP 0.1–0.7 promotion for the exercised dependency-closed scope.

## Case matrix

| Case | DP 0.7 targets | Primary distinction |
|---|---|---|
| D01 | 1 | same primitive structure, different labels |
| D02 | 2, 12 | same label, real primitive breaker |
| D03 | 3, 9 | loop + recursion, multiple valid views |
| D04 | 4 | branching/mutual/nested recurrence |
| D05 | 5 | unknown finite unfolding |
| D06 | 6 | unknown non-scalar branching shape |
| D07 | 7 | exit != termination/progress |
| D08 | 8 | cycle != recursion |
| D09 | 10 | lossy abstraction != exact substitute |
| D10 | 13 | derived view reused with primitive descent |
| D11 | 14 | QU invariant without realization selection |
| D12 | 15 | DTS-sensitive exactness breaker |
| D13 | 16 | structural correspondence != NEI SAME |

Targets 11 and 17 are not replayed inside the external call. Their fresh evidence is pinned in `BASELINE_AUTHORITY.md`.

## Isolation

The cold packet contains only:

- the exact DP 0.7 candidate;
- qualified dependency semantics needed by the cases;
- a baseline authority record that states predecessor qualification status without exposing Experiment 028 expected answers;
- the thirteen public cases;
- the public serializer contract.

It excludes:

- `experiments/028/hidden/**`;
- scorer and scorer self-test code;
- author audit;
- prior Experiment 028 evidence;
- repository status/routing files;
- positive-control hidden oracles and scoring files;
- prior decoder outputs.

## Resource discipline

One external semantic invocation covers all thirteen cases.

Before that call:

1. scorer self-test must accept a perfect synthetic report;
2. scorer self-test must reject a deliberately wrong report;
3. runner syntax and packet membership must pass deterministically;
4. exact candidate/dependency hashes must be checked;
5. dry-run packet identity must be recorded.

Hidden scoring occurs only after the semantic output is frozen.

## Completion gate

Experiment 028 qualifies only if:

- D01–D13 appear exactly once and in order;
- every expected answer matches exactly;
- every reason and authority list is nonempty;
- required self-audit fields pass;
- module assessment is `SUPPORTED`;
- packet isolation and candidate/dependency hashes pass;
- targets 11 and 17 remain pinned to the successful current positive-control evidence rather than a historical weaker run.

No partial score is promoted.
