# Experiment 007 — Blind Holdout Review

**Frozen qualification SHA:** `eae08ffc562168a2bc093c74056e3b6e01b88d93`  
**Control run:** `iteathen/OX-Alpha-Contol` Actions run `35302637298`  
**Decoder:** `nvidia/nemotron-3-ultra-550b-a55b:free`  
**Packet SHA-256:** `96db77cb58825d22365c3f494c0a66236ab4f76adfae67f2d19d2b5ecf7e7837`  
**Report SHA-256:** `4068f1b6b9ee31acdfc339082fba2f0117634bee5a506e0fee8093a61459d218`

## Isolation

The decoder received only the frozen Core/NEI/DP authority, the two anonymized proof files, and the cold prompt.

It did not receive:

- Experiment 007 hidden oracle;
- Experiment 007 assertions/scorer;
- Experiment 006 oracle/results;
- prior Experiment 007 outputs;
- repository map or agent guidance;
- external browsing.

The model call completed successfully with HTTP 200 in one attempt.

## Semantic result

The hidden scorer matched:

```text
O1 PASS
O2 PASS
O3 PASS
O4 PASS
O5 PASS
```

Deep motifs:

```text
O2 PASS
O3 PASS
O4 PASS
```

The report also passed:

- finding-width limits;
- minimum finding count;
- Alpha residual preservation;
- Beta residual preservation;
- residual explanation;
- SUPPORTED_CANDIDATE promotion;
- falsification on every finding;
- common-core recording;
- protocol/reranking recording;
- stop rationale.

The decoder independently recovered the intended shared structure:

```text
alternating-reachable witness region
    <-> source-side cut witness region

closure/no-escape constraints
    <-> cut-crossing exclusion

matching-count deficiency
    <-> cut-capacity deficiency

subset deficit
    -> contradiction
    -> complete pairing
```

## Formal scorer result

The frozen scorer returned:

```text
DOES_NOT_QUALIFY
```

for exactly one guard:

```text
overclaims_rejected = false
```

The report did reject every required overclaim, but expressed them as natural-language strings:

```text
"Full proof isomorphism (different intermediate machinery)"
"Natural identity of alternating walks and min-cuts ..."
"Same intermediate objects ..."
"Same algorithm ..."
```

The scorer required exact normalized tokens:

```text
FULL_PROOF_ISOMORPHISM
NATURAL_IDENTITY
SAME_INTERMEDIATE_OBJECTS
SAME_ALGORITHM
```

The cold prompt required explicit rejection of those concepts but did not require exact enum spelling.

## Disposition

This is a **blind semantic discovery success with a frozen scorer/output-contract defect**.

Do not rewrite the frozen score or rerun this holdout after unblinding.

A later qualification campaign may correct the generic rejection-field contract before freezing a new, independent holdout. It must use new hidden material rather than reusing Experiment 007.
