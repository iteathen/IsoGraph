# Experiment 048 — Final Core 0.20 Qualification Review

**Status:** COMPLETE  
**Formal disposition:** `QUALIFIES`  
**Scope:** independent qualification of Core 0.20 primitive-logic closure

## Successful run

- workflow run: `36364086659`
- frozen execution SHA: `a707d6c9bcad3ac7953ef33bca0ce8652ca7b95a`
- Core 0.20 SHA-256: `9a619b552a6ef7719e5b4b5f3a9df4a732ff4377b9bc7b86c385ed5c992b88e7`
- packet SHA-256: `26591c665f3375feadfca1e69a639889ec1a9b82f7f3fd0d9e51f1273b652bc3`
- frozen report SHA-256: `a1b5f772dd3aa8f14880219945f144345f5236d4d1cdd39485ca7ad19c5aefb3`
- selected decoder: `gemini-3-flash-preview`
- provider status: HTTP 200 / finish `STOP`

## Mechanical result

```text
formal disposition:       QUALIFIES
fresh cases:              18 / 18 PASS
failed cases:             0
unexpected cases:         0
duplicate cases:          0
exact case count/order:   PASS
self-audit:               PASS
module assessment:        SUPPORTED
```

## Section-16 qualification coverage

The fresh controls discharge all twelve Core 0.20 targets:

1. definable named predicate rejected as authoritative leaf;
2. qualified theorem endpoint retained as cache/view but not primitive replacement;
3. arithmetic label rejected until lower semantics are represented;
4. computation predicate rejected until transition/trace structure is exposed;
5. raw carrier identities accepted when behavior is separately represented;
6. deletion of domain label preserves exact primitive reconstruction;
7. DP may search over a derived view while exact verification routes to primitive support;
8. unavailable lower definition remains `QU_UNEXPANDED`;
9. sidecar cannot supply primitive meaning absent from native support;
10. Core-0.19-valid predecessor rendering may be 0.20-incomplete without retroactive invalidation;
11. primitive rendering round-trips exactly to frozen source meaning;
12. adversarial relabeling of derived abstractions leaves primitive semantics unchanged.

Additional positive controls exercised primitive extensional observation incidences, domain-flavored raw carrier names, and the primitive-support deletion firewall.

## Earlier attempts preserved

### Attempt 1 — run 36361985554

The decoder completed and was semantically aligned, but the hidden scorer required undisclosed answer-field names.

Disposition:

`PUBLIC OUTPUT-SCHEMA HARNESS DEFECT / NO CORE 0.20 SEMANTIC DISPOSITION`.

See `ATTEMPT_1_REVIEW.md`.

### Attempt 2 — run 36362502547

After field names were made public, 17/18 cases passed. C11 returned `PASS` where the hidden oracle required `EXACT`; the public schema had not exposed the value vocabulary.

Disposition:

`PUBLIC VALUE-VOCABULARY CONTRACT DEFECT / NO CORE 0.20 SEMANTIC DISPOSITION`.

See `ATTEMPT_2_REVIEW.md`.

### Attempt 3 — run 36363867965

The fully public schema preflight passed, but the provider terminated `MAX_TOKENS` and produced truncated JSON. Hidden scoring did not run.

Disposition:

`PROVIDER OUTPUT-TRUNCATION / NO CORE 0.20 SEMANTIC DISPOSITION`.

See `ATTEMPT_3_REVIEW.md`.

The successful run changed only decoder thinking budget relative to Attempt 3; cases, hidden expected answers, public schema, scorer, and Core 0.20 bytes were unchanged.

## Qualification conclusion

Promote Core 0.20 at the exact SHA-256 above as the current cumulative primitive-logic-closure clarification over qualified Core 0.17 + 0.18 + 0.19.

This qualification does not retroactively rewrite predecessor renderings. A Core-0.19-qualified artifact may remain historically qualified while not claiming Core-0.20 primitive completeness.

Direct full-stack integration with DP 0.8 remains a separate burden.
