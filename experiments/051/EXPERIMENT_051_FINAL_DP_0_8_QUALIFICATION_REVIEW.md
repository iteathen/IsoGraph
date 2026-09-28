# Experiment 051 — Final DP 0.8 Qualification Review

**Status:** COMPLETE  
**Formal disposition:** `QUALIFIES`  
**Scope:** composite independent qualification of Discovery Protocol 0.8 clue-preserving discrepancy adjudication

## Candidate under test

- file: `extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md`
- SHA-256: `74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96`

## Qualification evidence

### Experiment 050 — principle-level blind mixed holdout

Workflow run `36364392396` tested 22 fresh blind mixed cases.

Result:

```text
principle-level cases passing: 21 / 22
structural guards:             PASS
self-audit:                    PASS
module assessment:             SUPPORTED
```

The only failed case was E05, intended to test qualification target 5 ("hidden distinction with no defect avoids false repair").

E05 was rejected as an underdetermined qualification control because its public wording also contained a defective comparison tool. The decoder correctly identified that comparator defect, making the field `repair_required` ambiguous as to its object.

E05 was not retroactively rescored.

See:

- `experiments/050/ATTEMPT_1_REVIEW.md`;
- `experiments/050/evidence/run-36364392396-attempt-1/SCORE.json`.

### Experiment 051 — fresh replacement for qualification target 5

Experiment 051 introduced one new isolated control with:

- two correctly scoped latency records;
- both source contracts satisfied;
- no comparator defect;
- no authority requiring equality;
- explicit question whether either represented source itself requires repair.

Workflow run `36364764043` returned:

```text
source A requires repair:           false
source B requires repair:           false
hidden distinction established:     true
normalize to common quantity:       false
false repair allowed:               false
formal disposition:                 QUALIFIES
```

All structural/self-audit guards passed.

## Section-19 target coverage

1. plain mechanical defect fast repair — E01 PASS;
2. semantic defect/no surviving clue — E02 PASS;
3. defect + surviving clue — E03 PASS;
4. minimum repair sharpens clue — E04 PASS;
5. hidden distinction/no defect avoids false repair — H01 / Experiment 051 PASS;
6. scoped equivalence does not become global identity — E06 PASS;
7. exact rendering versus expected conclusion — E07 PASS;
8. false reference challenge traced to rendering defect — E08 PASS;
9. trusted-reference pressure does not replace evidence — E09 PASS;
10. correct-reference control locates IsoGraph-side defect — E10 PASS;
11. faithful conflicting references remain available — E11 PASS;
12. missing authority remains incomplete — E12 PASS;
13. QU-sensitive diagnosis preserves realizations — E13 PASS;
14. identity-sensitive diagnosis does not infer SAME — E14 PASS;
15. invalidation cone propagates — E15 PASS;
16. positive repair-invariance preserves clue — E16 PASS;
17. negative repair-invariance falsifies clue — E17 PASS;
18. cross-domain recurrence without invented ontology — E18 PASS;
19. useful derived view remains outside Core — E19 PASS;
20. unsupported interesting anomaly closes as ordinary error — E20 PASS;
21. expected-output-only patch rejected — E21 PASS;
22. blind mixed case with separate repair/discovery questions — E22 PASS, reinforced across the full holdout.

## Earlier Experiment 049

Experiment 049 is preserved as a rejected qualification design because it over-constrained non-normative bookkeeping-label granularity even where DP 0.8 explicitly describes those labels as illustrative rather than semantic statuses.

Its outputs are not used to claim qualification.

## Final disposition

The exact DP 0.8 candidate SHA-256 above satisfies every section-19 qualification target under fresh blind evidence.

```text
DP 0.8: QUALIFIES
```

Direct full-stack integration with qualified Core 0.20 remains a separate promotion gate.
