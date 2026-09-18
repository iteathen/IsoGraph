# Qualification Rejection Contract — 0.1 Candidate

**Status:** qualification-infrastructure candidate  
**Short name:** QRC 0.1  
**Semantic authority:** none  
**Purpose:** distinguish semantic rejection coverage from serializer conformance in blind qualification without constraining discovery behavior.

QRC 0.1 does not change Core, QU, NEI, or Discovery Protocol semantics. It does not promote DP 0.4. It governs only how a qualification harness interprets a terminal `rejected_overclaims` field when the public task requires explicit rejection of named overclaim classes.

The governing design rule is:

> Constrain what an agent may conclude more strongly than how it may explore.

A qualification output contract may therefore make terminal evidence mechanically checkable. It must not prescribe a hidden reasoning sequence or turn scorer-specific spellings into undisclosed semantic obligations.

---

## 1. Semantic requirement and serialization requirement are different

A scorer must distinguish:

```text
semantic rejection
    = the report clearly rejects the required overclaim concept

serialization conformance
    = the report uses a particular public wire representation
```

Exact spelling, enum casing, punctuation, or field-internal formatting is not semantic evidence by itself.

A strict serializer guard may be qualification-bearing only when the exact serialization requirement was public and frozen before the blind run.

A hidden scorer must not silently implement:

```text
semantic requirement
    -> undisclosed exact token requirement
```

---

## 2. Public rejection ontology

QRC 0.1 defines a small public ontology for proof/discovery qualification where these overclaims are relevant:

```text
FULL_PROOF_ISOMORPHISM
NATURAL_IDENTITY
SAME_INTERMEDIATE_OBJECTS
SAME_ALGORITHM
```

These IDs are public names for concepts, not hidden answers.

Their conservative public lexical signatures are:

| Concept | Required stems | At least one relation stem |
| --- | --- | --- |
| `FULL_PROOF_ISOMORPHISM` | `full`, `proof`, `isomorph` | none |
| `NATURAL_IDENTITY` | `natural`, `identit` | none |
| `SAME_INTERMEDIATE_OBJECTS` | `intermediate`, `object` | `same`, `ident`, `equiv`, `differ`, or `distinct` |
| `SAME_ALGORITHM` | `algorithm` | `same`, `ident`, `equiv`, `differ`, or `distinct` |

The signatures are intentionally small and public. A scorer must not use a hidden synonym table to rescue or reject an output.

This ontology may be extended only by versioning the public contract before a future benchmark is frozen.

---

## 3. Meaning of `rejected_overclaims`

When a public prompt declares a field named `rejected_overclaims`, the container supplies the rejection polarity.

An entry may be represented as any of:

```json
"FULL_PROOF_ISOMORPHISM"
```

```json
"Full proof isomorphism (different intermediate machinery)"
```

or:

```json
{
  "claim_id": "FULL_PROOF_ISOMORPHISM",
  "status": "REJECTED",
  "reason": "..."
}
```

The first and third forms are canonical-ID forms. The second is a natural-language label/gloss form.

A free-text entry is not required to reproduce a canonical enum token if the public prompt did not require that serialization.

---

## 4. Deterministic recognition

The reusable normalizer for QRC 0.1 is:

```text
tools/qualification/semantic-rejections.mjs
```

Recognition order:

1. accept a valid structured canonical `claim_id` / `concept_id` with status `REJECTED`;
2. accept an exact canonical string ID;
3. otherwise apply only the public lexical signatures in Section 2;
4. if exactly one concept matches, recognize it;
5. if multiple concepts match, return `AMBIGUOUS`;
6. if none matches, return `UNRESOLVED`.

Do not guess an unresolved entry into a required concept.

Do not call an external semantic model merely to make a deterministic scorer more permissive unless that verifier role is separately frozen and justified by the qualification plan.

---

## 5. Qualification guards

A benchmark may define a required set of public rejection concepts.

The semantic guard is:

```text
semantic_rejection_coverage
    = every required public concept was recognized
```

A separate diagnostic is:

```text
exact_canonical_string_coverage
    = every required public concept appeared as its exact canonical string
```

The second diagnostic is not qualification-bearing unless the public frozen output schema explicitly says exact canonical strings are required.

An additional unrecognized entry does not invalidate recognized required concepts unless another public rule says extra entries are forbidden.

---

## 6. Hidden scorer discipline

A hidden scorer may hide:

- expected structural mappings;
- motif membership;
- thresholds;
- benchmark-specific negative controls;
- other oracle material that would contaminate discovery.

It must not hide a serialization convention and then treat that convention as semantic evidence when the public prompt permits a broader representation.

If exact IDs are needed for implementation simplicity, put the exact IDs in a public schema before the benchmark is frozen.

---

## 7. Freeze order for future blind qualification

For a new blind holdout using QRC 0.1:

```text
1. freeze public semantic authority
2. freeze QRC/public output schema
3. freeze cold prompt
4. freeze hidden holdout/oracle/scorer
5. deterministic preflight
6. one isolated cold decoder run
7. freeze + hash output
8. deterministic hidden scoring
```

The hidden scorer may refer to QRC concept IDs because the ontology was already public. It may not add benchmark-specific aliases after seeing the output.

---

## 8. Historical runs

QRC 0.1 is not retroactive authority over a frozen disposition.

A historical run may receive a versioned post-freeze audit that reports:

```text
historical frozen disposition
semantic result under QRC 0.1
serializer result under QRC 0.1
```

without rewriting the historical score.

A post-freeze audit is diagnostic evidence only. New blind promotion evidence requires a new independent holdout frozen after this contract.

---

## 9. Experiment 007 implication

Experiment 007 remains formally:

```text
DOES_NOT_QUALIFY
```

under its frozen scorer.

Its logged natural-language rejections can be evaluated under QRC 0.1 as a versioned audit. That audit does not alter the frozen score and must not be described as an Experiment 007 formal pass.

---

## 10. Qualification target for this contract

Before QRC 0.1 is used by a new holdout, deterministic tests should show at least:

1. exact canonical IDs satisfy semantic and exact-serialization coverage;
2. direct natural-language labels that name the public concepts satisfy semantic coverage without exact-serialization coverage;
3. structured canonical entries satisfy semantic coverage;
4. generic words such as `identity` alone do not accidentally satisfy `NATURAL_IDENTITY`;
5. missing concepts remain missing;
6. no hidden alias table is required.

The implementation test is:

```text
node tools/qualification/test-semantic-rejections.mjs
```
