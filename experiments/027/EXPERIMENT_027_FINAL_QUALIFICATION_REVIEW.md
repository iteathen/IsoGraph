# Experiment 027 — DTS-Inclusive Current Stack Final Qualification Review

**Composition under test:** qualified Core 0.17 + Core 0.18 + QU 0.1 + NEI 0.4 + Discovery Protocols 0.1–0.6 + DTS 0.1  
**Formal disposition:** **QUALIFIES**  
**Workflow run:** `36191443384`  
**Frozen qualification SHA:** `c53856f840dc1c9ee29bb55b509f6de3f6926179`

## Result

Experiment 027 tested the expanded qualified family as a composition rather than re-proving each lower module.

```text
case coverage:          18 / 18 PASS
mismatches:             0
scoring guards:         all true
module assessment:      SUPPORTED
formal disposition:     QUALIFIES
API attempts:           1
HTTP status:            200
model:                  gemini-3.1-flash-lite
```

Packet SHA-256:

`1ab972c5edf76c2644f5bccd4f15bed9175a5babca32c0d549bb6363e0b3e2cd`

Frozen report SHA-256:

`37af0c0330879f940c75eab39fb245bb4924292598015f138f70093141ee33c8`

## Fresh integration burden discharged

The DTS-inclusive holdout independently recovered the required cross-module behavior for:

1. determinate transition observation without artificial QU or known mechanism;
2. unresolved load-bearing transition structure requiring QU;
3. endpoint equality failing to establish TI when a load-bearing transition breaker exists;
4. valid scoped TI with projected mechanism/profile differences retained as residual;
5. QU-bearing TI without equality of actual realizations or NEI SAME;
6. projected decomposition differences not creating false TI rejection;
7. load-bearing decomposition/order mismatch rejecting TI;
8. exact NEI identity not implying TI;
9. DP structural discovery not supplying TI proof authority;
10. target-driven projection/QU restriction remaining circular;
11. missing QU not masquerading as completeness;
12. observation-first semantic-quantity alignment preserving qualification/discovery separation;
13. genuine QU refinement changing a later TI result without rewriting historical evidence;
14. mechanism/profile labels not supplying natural identity or DTS base truth;
15. partial transition common core retaining load-bearing residuals;
16. reuse of ordinary boundary/interface semantics rather than a DTS-private duplicate;
17. role-count/factorization similarity not proving invariant structure or TI;
18. scoped TI coexisting with a broader unresolved natural-identity question.

## Isolation and scorer discipline

Before the external semantic call:

- exact qualified semantic hashes were checked;
- DTS deterministic base controls passed;
- the runner/scorer/self-test scripts passed syntax checks;
- a perfect synthetic report qualified;
- a deliberately wrong synthetic report was rejected;
- the dry-run packet was verified to contain exactly the qualified-stack packet, fresh Experiment 027 cases, and public decoder contract;
- hidden assertions, scorer code, prior Experiment 019 outputs, prior Experiment 026 outputs, author audits, routing files, and qualification results were excluded;
- normal repository Verify run `36191411405` passed before the trigger-only commit.

The frozen semantic report was scored unchanged.

## Composition conclusion

No new unsound inference path was observed in the exercised expanded composition:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.6
+ DTS 0.1
-> integrated composition QUALIFIES
```

This integration result preserves the existing module boundaries:

- qualified extension != Core membership;
- DP discovery priority != proof authority;
- TI != NEI SAME;
- same endpoints != TI;
- unknown != irrelevant;
- missing QU != completeness;
- role factorization != invariant proof;
- profile/mechanism semantics != DTS base semantics.

## Historical evidence

Experiment 019 remains the immutable integration record for the pre-DTS composition.

Experiment 026 remains the immutable module qualification record for DTS 0.1.

Experiment 027 adds the fresh evidence required to qualify their expanded composition; it does not rewrite either predecessor.
