# PC-H algorithm-hidden DP run 0.1

**Status:** positive-control discovery result; no P-vs-NP theorem
**Frozen source:** `PC_H_SOURCE_FREEZE_0_1.md`
**Primitive input:** `PC_H_PRIMITIVE_0_1.isg`
**Implicit closure:** `PC_H_IMPLICIT_ASSERTIONS_0_1.md`
**NEI/QU overlay:** `PC_H_NEI_QU_0_1.md`

## 1. Primitive observation

The source exposes only:

- variable/clause finite data;
- BODY and optional HEAD incidences;
- existential assignment membership;
- exact clause truth.

It contains no closure set, least model, saturation rule, or canonical witness.

## 2. First semantic discovery: intersection closure

Primitive clause truth implies that satisfying assignments are closed under intersection.

Therefore, when any model exists, there is a unique least assignment set.

This is exact semantic compression, but it fails the campaign accessibility test if used alone:

```text
M_min = intersection of all models
```

does not provide a cheap method for obtaining `M_min`.

## 3. Accessibility discovery: local forced consequences

The primitive clause cases also yield a stronger operational law:

```text
BODY(c) subseteq F
AND
HEAD(c,h)
    ->
h is forced whenever F is forced.
```

Starting from empty and repeatedly adding exactly such forced heads:

- never adds an unforced variable;
- strictly grows at most `n` times;
- reaches `F_*`;
- makes `F_*` equal the semantic least model on YES instances.

A headless clause whose BODY is contained in `F_*` is an exact NO witness.

## 4. Recovered elimination mechanisms

### T3 — polynomial hitting set / canonical witness: RECOVERED

On every YES instance, the deterministic list encoding of `F_*` is a satisfying witness.

The singleton:

```text
{F_*}
```

is therefore a polynomially constructible hitting set for the accepting-witness family.

### T5 — constructible rejection invariant: RECOVERED

On every NO instance, the expansion trace plus a headless clause with BODY contained in `F_*` proves that all possible models violate that clause.

This is constructed by the same polynomial local consequence process.

### T1 — local dominance/simulation: NOT RECOVERED AS THE PRIMARY LAW

Simple assignment inclusion is not sound dominance for source truth.

PC-H-F3 and PC-H-F4 show that truth is neither upward- nor downward-monotone in arbitrary assignment inclusion.

The useful monotonicity belongs to the **forced-consequence construction**, not to arbitrary witness assignments.

### T2 — bounded separator/sufficient statistic: NOT COUNTED

The evolving forced set is a polynomially represented construction state, but counting it as a source-residual sufficient statistic would collapse a distinct mechanism into T2.

The primary recovered law is local consequence saturation with a polynomial strict-growth rank.

### T4 — aggregate recurrence DAG: NOT COUNTED AS THE PRIMARY LAW

One could serialize the expansion trace as a DAG, but that would merely repackage the closure construction.

No independent aggregate-recurrence explanation is counted.

## 5. Falsifier outcomes

Rejected:

- all-false canonical witness;
- all-true canonical witness;
- upward witness monotonicity;
- downward witness monotonicity;
- semantic least-model existence as a sufficient access argument.

Survived:

- exact local forced-head implication;
- monotone growth of the forced set;
- at most `n` strict additions;
- exact terminal rejection test;
- exact canonical YES witness.

## 6. DP judgment

The hidden-algorithm control independently recovers a mechanism different from PC-R:

```text
local exact consequence rule
    +
monotone construction state
    +
polynomial strict-growth rank
    +
exact terminal contradiction/model test.
```

This is stronger evidence for the campaign's “cheap sound structure + polynomial retained support + exact target preservation” synthesis.

It also sharpens the accessibility firewall:

```text
semantic least object
    !=
constructible least object.
```

The polynomial conclusion appears only after the primitive graph supplies a local rule that constructs the semantic object in polynomially many progress stages.

## 7. Novelty status

The Horn-form closure facts are **STANDARD_KNOWN_CONSEQUENCE**.

The cross-campaign interpretation is **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN** only.

No external novelty claim is made.

## 8. Truth status

```text
P = NP:  OPEN
P != NP: OPEN
```
