# DTS 0.1 Qualification Authority — 2026-09-25

**Status:** qualified semantic extension  
**Artifact:** `extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md`  
**Candidate Git blob:** `04170c1faa26ca8b76e211a0491ce76e358d111b`  
**Candidate SHA-256:** `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`  
**Native vocabulary:** `extensions/dts/DTS_NATIVE_VOCAB_0_1.md` + `extensions/dts/DTS_VOCAB_0_1.isg`  
**Qualification evidence:** Experiment 026  
**Final review:** `experiments/026/EXPERIMENT_026_FINAL_QUALIFICATION_REVIEW.md`

DTS 0.1 is qualified at the exact tested semantic bytes above as a separately versioned IsoGraph extension.

The historical `_CANDIDATE` filename is retained because those exact bytes were tested. Filename spelling does not determine qualification status.

## Qualified scope

The qualification establishes:

- transitions over ordinary IsoGraph source and target structures;
- source/target projection recovery;
- transition anatomy represented as ordinary IsoGraph structure;
- semantic transition roles `K`, `Delta-`, `Delta+`, `Delta~`, `B`, `D`, `O`, `Q`, and `E`;
- reuse of ordinary boundary/interface semantics for `B`;
- QU as the unresolved-information substrate when unresolved transition structure is load-bearing;
- no artificial QU requirement for determinate transitions;
- fail-closed behavior when required QU or closure authority is absent;
- noncanonical decomposition with explicit authority when decomposition is load-bearing;
- view-scoped Transition Isomorph (TI) with explicit load-bearing/projected regions, mappings, residuals, and QU dependencies;
- projected decomposition/QU structure remaining explicit residual rather than being erased;
- rejection of TI from endpoint equality, surface similarity, or role-count similarity alone;
- anti-circularity for target TI evidence;
- separation of observation of transition from explanation of mechanism;
- separation of DTS base semantics from mechanism/profile semantics.

## Authority boundaries

DTS 0.1 does not establish:

- NEI `SAME`;
- equality of actual QU realizations;
- canonical decomposition;
- invariant/TSS structure from role factorization alone;
- DPO rewrite semantics;
- sequential mechanism semantics;
- concurrency semantics;
- cost/accounting semantics;
- optimization semantics;
- external adapter correctness;
- existential or universal TI over every admissible decomposition family.

Qualified DTS remains an extension and does not silently become Core.

## Evidence

Primary cold semantic qualification:

```text
workflow run:              36190237108
frozen source SHA:         0a5ffa2298235a4b959f8a89a9c7d0aa93848028
case coverage:             20 / 20 PASS
failed cases:              none
scoring guards:            all true
module assessment:         SUPPORTED
formal disposition:        QUALIFIES
external semantic calls:   1
provider retries:           0
```

Independent promotion verification:

```text
workflow run:              36190514681
frozen source SHA:         886faac2b751884258cdfb031df7500214877c83
validation:                VALID
verdict:                   SUPPORT_PROMOTION
overclaims:                none
circularity findings:      none
evidence gaps:             none
external verifier calls:   1
provider retries:           0
```

## Dependency closure

Qualified DTS 0.1 depends on:

- cumulative qualified Core 0.17 + Core 0.18;
- qualified QU 0.1 for unresolved load-bearing transition structure.

NEI 0.4 remains the authority for natural/domain identity conclusions. Discovery Protocols may discover DTS/TI structure but do not supply DTS truth authority.

## Integration status

This record qualifies the DTS module itself.

It does **not** by itself qualify the expanded full composition:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.6
+ DTS 0.1
```

That expanded composition requires a fresh integrated holdout after DTS promotion.

## Revision rule

Any semantic change to the qualified DTS artifact creates a new revision and the affected dependency-closed qualification burden.
