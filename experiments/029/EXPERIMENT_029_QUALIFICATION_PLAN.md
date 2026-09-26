# Experiment 029 — Core 0.19 Qualification Plan

**Status:** frozen design before semantic execution  
**Candidate:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`  
**Qualified base Core:** Core 0.17 + Core 0.18  
**Qualified dependency:** QU 0.1 where unresolved structure is load-bearing  
**Fresh predecessor evidence:** six ESR-qualified/Q7-promoted exact source renderings from the DP 0.7 three-positive-control campaign  
**Cases:** `experiments/029/CORE_0_19_CASES.md`  
**Cold prompt:** `experiments/029/COLD_PROMPT.md`

## Goal

Qualify Core 0.19 as the next cumulative Core clarification layer over the current qualified Core.

Core 0.19 has two distinct semantic burdens:

1. assertion/support semantics, including explicit versus implicit support, exact versus Bayesian support, lineage, QU propagation, cycles, iterative expansion, scope, and search neutrality;
2. exact source-to-native rendering admission semantics in section 18.

Both burdens must pass before promotion.

## Qualification claim

Experiment 029 freshly tests every Core 0.19 section-16 qualification target:

1. explicit provenance;
2. exact implicit derivation;
3. no hidden premise;
4. scope preservation;
5. no authority amplification;
6. grounded cycle;
7. ungrounded cycle;
8. QU propagation;
9. QU refinement/discharge;
10. no invented probability;
11. Bayesian implicit chain;
12. dependence protection;
13. no probabilistic promotion;
14. explicit + implicit support coexistence;
15. discovery neutrality;
16. iterative depth;
17. fixed-point stop;
18. failure-to-find honesty.

It also includes adversarial section-18 controls for:

- skeleton versus exact rendering;
- sidecar semantic leakage;
- silent conventional mathematics;
- alternate exact form without a transformation witness;
- source ambiguity/unknown preservation;
- precision/modality preservation;
- one-distinction mutation preservation;
- downstream barrier against using incomplete renderings as source-faithful support.

## Section 18 predecessor evidence

The immediately preceding DP 0.7 qualification campaign created six source-to-native bundles under Core 0.19 section 18 and ESR 0.1.

All six passed:

- zero-gap native coverage;
- syntax/signature/binding closure;
- two independent native-only cold reconstructions;
- exact source/reconstruction sameness;
- adversarial one-distinction mutation controls;
- scorer-blind verification;
- explicit Q7 promotion.

Promotion record:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/translation-v2/PROMOTION_0_1.json`

That evidence is pinned as predecessor evidence, not replayed in the external semantic call.

Experiment 029's section-18 adversarial policy cases test the constitutional rule itself, while the predecessor campaign supplies concrete reconstruction evidence.

## Case matrix

| Cases | Primary Core 0.19 burden |
|---|---|
| C01-C18 | section 16 targets 1-18 |
| C19 | formula skeleton != exact rendering |
| C20 | sidecar completion forbidden |
| C21 | silent conventional mathematics forbidden |
| C22 | alternate form requires exact witness |
| C23 | ambiguity / QU preservation |
| C24 | precision and modality preservation |
| C25 | adversarial mutation preservation |
| C26 | incomplete-rendering downstream barrier |

## Isolation

The cold packet contains only:

- Core 0.17 qualified base;
- Core 0.18 qualified clarification;
- QU 0.1;
- Core 0.19 candidate;
- Experiment 029 baseline authority;
- public cases;
- public serializer contract.

It excludes:

- hidden assertions;
- scorer/scorer tests;
- author audit;
- prior Experiment 029 evidence;
- ESR decoder outputs and hidden scoring;
- positive-control hidden oracles;
- repository routing/status files.

The baseline authority may state that the predecessor ESR stage passed, but must not expose Experiment 029 expected answers.

## Resource discipline

One batched external semantic call covers all 26 cases.

Before that call:

1. scorer self-test accepts a perfect synthetic report;
2. scorer self-test rejects a wrong semantic answer;
3. scorer self-test rejects a bad self-audit;
4. runner dry-run verifies exact packet membership and candidate/dependency hashes;
5. runner verifies the six-case ESR Q7 predecessor promotion;
6. no external semantic call occurs until all deterministic gates are green.

Hidden scoring occurs only after the semantic output is frozen.

## Promotion gate

Core 0.19 qualifies only if:

- C01-C26 appear exactly once and in order;
- every hidden expected answer matches exactly;
- every reason and authority list is nonempty;
- all required self-audit fields pass;
- module assessment is `SUPPORTED`;
- Core 0.19 exact bytes match the frozen candidate revision;
- qualified base/dependency hashes match;
- ESR predecessor record still pins six exact-qualified renderings with Q7 PASS;
- no hidden material enters the cold packet.

No partial result promotes Core 0.19.

## Authority effect on success

A successful result promotes the exact tested Core 0.19 candidate bytes as a cumulative clarification over:

```text
Core 0.17 qualified base
+
Core 0.18 qualified clarification
+
Core 0.19 qualified clarification
```

It does not retroactively rewrite historical qualification evidence and does not automatically qualify ESR 0.1 as a general-purpose qualification contract beyond the scope actually exercised.
