# DTS 0.1 Qualification Plan

**Status:** frozen qualification design; semantic run not yet authorized  
**Candidate:** `extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md`  
**Candidate Git blob:** `04170c1faa26ca8b76e211a0491ce76e358d111b`  
**Candidate SHA-256:** `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`  
**Native vocabulary:** `extensions/dts/DTS_NATIVE_VOCAB_0_1.md` + `extensions/dts/DTS_VOCAB_0_1.isg`  
**Qualified dependencies:** cumulative Core 0.17 + Core 0.18, QU 0.1; NEI 0.4 only where identity non-claims are exercised  
**Discovery dependency:** none for DTS truth  
**Current non-DTS integration:** qualified by Experiment 019  
**Development evidence:** Experiments 020–025; excluded from the cold holdout packet

## Qualification objective

Qualify DTS 0.1 base semantics only.

The campaign does not qualify:
- DPO rewriting;
- sequential execution profiles;
- concurrency profiles;
- cost/accounting;
- optimization;
- Transition Structural Signatures;
- external adapters.

Profile qualification cannot substitute for DTS base qualification.

## Frozen semantic burden

The fresh holdout must exercise all DTS 0.1 Section 13 targets plus three additional constitutional controls:

1. ordinary Core structures remain valid without DTS;
2. source and target projections are recoverable;
3. transition anatomy remains ordinary IsoGraph structure;
4. boundary/interface semantics are reused rather than duplicated;
5. determinate transitions do not require artificial QU;
6. unresolved load-bearing transition structure requires QU rather than a DTS-private opaque unknown;
7. missing required QU/closure authority blocks the stronger claim;
8. identical endpoints do not establish TI;
9. valid scoped TI can be recovered with explicit residuals;
10. decomposition differences do not create false TI rejection when D/O are independently projected;
11. decomposition topology can reject TI when load-bearing;
12. QU-bearing transition correspondence does not imply equality of actual QU realizations;
13. TI does not imply NEI SAME;
14. mechanism/profile qualification remains separate from DTS base qualification;
15. seductive surface transition similarity is rejected when a load-bearing breaker exists;
16. target TI cannot circularly choose its own view, QU restriction, decomposition, or projection evidence;
17. incomplete observation cannot masquerade as complete merely because no QU object is present;
18. QU wholly owned by independently qualified projected regions may remain residual without blocking a scoped claim;
19. an observed transition remains valid before mechanism/cause is known;
20. DTS semantic role factorization does not by itself establish invariant structure or TI.

## Evidence split

### Deterministic preflight

Before any cold call:

- candidate Git blob and SHA-256 are frozen;
- native vocabulary files are present;
- DTS deterministic base suite passes;
- Experiment 020 reconstruction suite passes;
- Experiment 022 decomposition suite passes;
- Experiment 025 QU projection ownership suite passes;
- holdout case IDs and public answer schemas are exact;
- hidden assertions/scorer self-test pass;
- cold packet contains no hidden assertions, prior DTS development outputs, author audits, scorer, expected dispositions, repository routing instructions, or qualification review.

### One cold semantic decoder

One fresh decoder invocation over all qualification cases.

The decoder must receive:
- the exact DTS 0.1 candidate;
- an obligation-sufficient packet of already-qualified Core/QU/NEI dependency clauses;
- fresh qualification cases;
- public answer schema.

It must not receive Experiments 020–025 results or hidden expected answers.

### Deterministic scoring

All public answer fields are proposition-specific and scored exactly.

No hidden lexical alias, minimum free-text length, undisclosed pair requirement, or serializer convention is qualification-bearing.

Public requirements:
- every case exactly once;
- nonempty reason;
- nonempty authority list;
- packet self-audit true;
- module assessment `SUPPORTED` only when every semantic case is supported.

### Independent promotion verifier

Only after a clean cold decoder pass, one independent verifier may inspect:
- exact candidate hash;
- frozen public holdout;
- frozen decoder report;
- deterministic score;
- dependency qualification records;
- no hidden answer key.

Its task is to challenge promotion for unsupported overclaim, dependency leakage, circularity, or evidence mismatch.

The verifier does not rescore hidden propositions.

## Resource budget

Default campaign budget:

```text
cold semantic decoder calls:        1
same-run provider 5xx retry:         at most 1
independent verifier calls:          at most 1, only after decoder PASS
GitHub qualification workflow:       one batched run per frozen phase
```

Provider/infrastructure failure produces no semantic disposition and may justify a recorded retry without changing the frozen corpus.

A semantic `DOES_NOT_QUALIFY` result is not rerun merely to seek a better answer.

## Promotion dispositions

Final DTS 0.1 review ends in exactly one:

- `QUALIFIED`;
- `QUALIFIED_WITH_EXPLICIT_SCOPE`;
- `DOES_NOT_QUALIFY`;
- `INCOMPLETE_EVIDENCE`;
- `INFRASTRUCTURE_FAILURE`.

## Promotion gate

DTS 0.1 may be promoted only when:

- all 20 fresh semantic controls pass;
- all deterministic preflight controls pass;
- QU dependency closure is preserved;
- no TI claim relies on same endpoints alone;
- no hidden serializer/output contract affects the score;
- no profile result is substituted for base qualification;
- the independent verifier supports promotion or identifies no unresolved qualification-bearing defect;
- exact candidate/vocabulary/provenance records are frozen.

A semantic change after the cold run creates a new DTS candidate revision and a new affected qualification burden.
