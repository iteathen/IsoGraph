# Experiment 007 — QRC 0.1 Post-Freeze Rejection Audit

**Status:** post-freeze diagnostic audit; not a rescore  
**Historical frozen disposition:** `DOES_NOT_QUALIFY`  
**Frozen qualification SHA:** `eae08ffc562168a2bc093c74056e3b6e01b88d93`  
**Control run:** `35302637298`  
**Frozen report SHA-256:** `4068f1b6b9ee31acdfc339082fba2f0117634bee5a506e0fee8093a61459d218`  
**Audit contract:** `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`

## Scope

This audit asks one question only:

> Under the later public QRC 0.1 semantic/serialization split, did the frozen Experiment 007 report semantically cover the four required rejection concepts even though it did not serialize them as exact enum strings?

It does not alter the frozen Experiment 007 scorer, assertions, prompt, score, or disposition.

## Frozen logged field

The workflow log for run `35302637298` records:

```text
Full proof isomorphism (different intermediate machinery)
Natural identity of alternating walks and min-cuts (NEI distinction audit: representational difference, not natural distinction)
Same intermediate objects (alternating paths ≠ cut partitions)
Same algorithm (augmenting path ≠ max-flow)
Carrier identity between matching M and flow network
```

The exact same five strings are used by the deterministic QRC regression fixture in:

```text
tools/qualification/test-semantic-rejections.mjs
```

## QRC 0.1 result

The public lexical signatures recognize:

```text
FULL_PROOF_ISOMORPHISM
NATURAL_IDENTITY
SAME_INTERMEDIATE_OBJECTS
SAME_ALGORITHM
```

Therefore:

```text
semantic_rejection_coverage:        PASS
exact_canonical_string_coverage:   FAIL
extra carrier-identity entry:      UNRESOLVED / not required
```

This is the distinction the frozen scorer did not make.

## Historical disposition remains immutable

The Experiment 007 frozen automatic result remains:

```text
DOES_NOT_QUALIFY
```

This audit must not be cited as a formal Experiment 007 pass.

The appropriate interpretation is:

```text
blind semantic discovery: SUCCESS
hidden motif recovery: 5/5
deep motif recovery: 3/3
frozen automatic score: DOES_NOT_QUALIFY
QRC 0.1 post-freeze semantic rejection audit: PASS
QRC 0.1 exact canonical serialization audit: FAIL
new blind qualification: NOT CLAIMED
```

## Consequence for the next holdout

A new independent blind holdout may use QRC 0.1 only after the public contract and prompt are frozen before the hidden benchmark is executed.

That future scorer should keep semantic rejection coverage separate from serializer conformance and must not add hidden aliases after observing decoder output.
