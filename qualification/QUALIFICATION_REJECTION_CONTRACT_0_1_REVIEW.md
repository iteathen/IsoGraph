# Qualification Rejection Contract 0.1 — Investigation Review

**Contract:** `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`  
**Status after review:** candidate qualification infrastructure; not semantic authority

## Problem

Experiment 007 exposed a qualification-contract defect:

```text
public requirement:
    explicitly reject four overclaim concepts

decoder output:
    semantically explicit natural-language rejection labels

hidden scorer:
    exact enum-string equality

result:
    semantic discovery success
    but formal DOES_NOT_QUALIFY
```

The defect was not that the decoder failed to reject the claims. The scorer had silently made a serialization convention qualification-bearing.

## Adopted contract

QRC 0.1 separates:

```text
semantic rejection coverage
from
exact serialization conformance
```

It supplies a small public ontology and conservative public lexical signatures. Recognition is deterministic and fails unresolved/ambiguous entries closed.

A hidden scorer may still hide benchmark-specific structural answers. It may not hide one spelling of a public rejection concept and then treat that spelling as semantic evidence.

Exact canonical strings remain available as a serializer diagnostic or as a hard requirement when an exact public schema is frozen before the benchmark.

## Evidence

### Deterministic tests

`tools/qualification/test-semantic-rejections.mjs` covers:

- exact canonical IDs;
- Experiment 007's frozen natural-language labels;
- structured canonical rejected-claim entries;
- negative controls that are too vague to identify a concept;
- missing-concept failure.

`experiments/008/tools/test-score-exp008.mjs` verifies that:

- natural-language QRC labels can qualify semantically while exact canonical-string coverage is false;
- omission of one semantic rejection fails qualification;
- canonical IDs also qualify and are recorded as exact serializer conformance.

Both test suites passed in the Experiment 008 deterministic preflight before the cold model call.

### Historical audit

`experiments/007/EXPERIMENT_007_QRC_0_1_POST_FREEZE_AUDIT.md` applies QRC 0.1 diagnostically to the immutable Experiment 007 output:

```text
semantic rejection coverage: PASS
exact canonical serialization: FAIL
historical frozen disposition: DOES_NOT_QUALIFY
```

No historical score was rewritten.

### Fresh blind holdout

Experiment 008 was frozen after QRC 0.1 and produced:

```text
formal disposition: QUALIFIES
motifs: 5/5
deep motifs: 3/3
semantic rejection coverage: PASS
exact canonical serialization: PASS
```

The decoder selected the public canonical IDs, so Experiment 008 proves fresh compatibility of QRC with blind qualification but does not itself sample the free-text recognition branch.

## Assessment

The generic contract issue is resolved at the mechanism level:

```text
semantic rejection
    -> qualification-bearing

serialization choice
    -> separately observable
    -> qualification-bearing only when publicly frozen as such
```

This avoids both failure modes:

```text
hidden token overfitting
and
unbounded hidden semantic synonym guessing
```

The public ontology/signatures are versioned, deterministic, and inspectable. Benchmark-specific hidden aliases are not permitted.

## Remaining boundary

QRC 0.1 is infrastructure, not a Discovery Protocol semantic rule.

Its current evidence supports use in future blind qualification packets. It should remain explicitly versioned and public before freeze.

Do not infer from Experiment 008 that:

- DP 0.4 is automatically promoted;
- all natural-language paraphrases are recognized;
- an external semantic judge is needed;
- exact canonical IDs should be forced into every decoder response.

Unrecognized or ambiguous free text should remain unresolved unless a future public QRC version expands the ontology before the next benchmark is frozen.
