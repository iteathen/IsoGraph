# PC-G algorithm-hidden DP run 0.1

**Status:** positive-control discovery result; no P-vs-NP theorem
**Frozen source:** `PC_G_SOURCE_FREEZE_0_1.md`
**Primitive input:** `PC_G_PRIMITIVE_0_1.isg`
**Implicit closure:** `PC_G_IMPLICIT_ASSERTIONS_0_1.md`
**NEI/QU overlay:** `PC_G_NEI_QU_0_1.md`

## 1. Primitive observation

The authoritative input exposes only:

- finite variable/equation data;
- coefficient and RHS incidences;
- Boolean membership assignment;
- exact AND and XOR truth tables;
- ordered parity recursion;
- existential source truth.

No basis, pivot, row operation, rank, or elimination procedure is present.

## 2. Recovered local algebra

The finite XOR table independently yields:

```text
a XOR 0 = a
a XOR a = 0
commutativity
associativity.
```

Together with finite Boolean AND it yields the exact distributive law needed to compose equation residuals.

This produces a source-derived reversible transform:

```text
retain A
replace B by A XOR B
```

with exactly the same satisfying assignments.

## 3. Recovered progress structure

Using only frozen input order:

```text
choose next coefficient-1 coordinate
retain one row as pivot
remove that bit from every other row by the reversible transform.
```

Each pivot consumes a new variable coordinate.

Hence:

```text
pivot stages <= number of variables.
```

The retained row representation remains polynomial throughout.

This is a local exact normalization with an explicit polynomial progress rank.

## 4. Recovered elimination mechanisms

### T3 — polynomial hitting set / canonical witness: RECOVERED

If terminal normalization contains no contradiction row, setting every free variable to 0 and every pivot variable to its row RHS produces one satisfying assignment.

The singleton containing its source-list serialization is a polynomially constructible hitting set on YES instances.

### T5 — constructible rejection invariant: RECOVERED

A normalized row:

```text
0 ... 0 | 1
```

is an exact contradiction for every assignment.

Because every local transform preserves Q-G-SOLUTION identity, such a row is an exact NO invariant for the original source instance.

### T1 — local dominance/simulation: NOT RECOVERED

Arbitrary assignment inclusion is not a truth-preserving preorder; PC-G-F2 falsifies it.

The useful local law is reversible semantic-preserving normalization, not one-way witness dominance.

### T2 — bounded separator/sufficient statistic: NOT COUNTED AS THE PRIMARY LAW

The retained row system is a polynomial-size exact constraint representation, but treating the whole normalized system as a “sufficient statistic” would obscure the actual discovery: a locally reversible transform plus a polynomial pivot rank.

### T4 — aggregate recurrence DAG: NOT COUNTED

The derivation does not need to aggregate exponentially many witness assignments into an OR recurrence.

It changes the exact constraint presentation while preserving the full solution set.

## 5. Cross-control falsifier already obtained

PC-H's intersection-closed model law fails here:

```text
x XOR y=1
```

has satisfying assignments `{x}` and `{y}` but not their intersection.

Therefore the positive controls are not all instances of one monotone closure theorem.

## 6. NEI significance

Raw row syntax changes during normalization.

Yet each local replacement proves exact Q-G-SOLUTION SAME.

This gives a particularly clean control instance of:

```text
globally different representation
+
locally certified scoped semantic sameness
+
polynomial construction
    ->
useful normalization.
```

No complete exact identity classifier is invoked.

## 7. DP judgment

PC-G independently recovers a third mechanism shape:

```text
primitive finite local algebra
    ->
reversible exact semantic transform
    ->
polynomial retained representation
    ->
polynomial progress rank
    ->
canonical YES witness or exact NO contradiction.
```

This differs materially from:

- PC-R's future-statistic recurrence;
- PC-H's monotone forced-consequence saturation.

The shared structure, if any, therefore has to live below those high-level mechanism labels.

## 8. Novelty status

The parity algebra and row-normalization result are **STANDARD_KNOWN_CONSEQUENCE**.

Their primitive discovery decomposition is **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN** only.

No external novelty claim is made.

## 9. Truth status

```text
P = NP:  OPEN
P != NP: OPEN
```
