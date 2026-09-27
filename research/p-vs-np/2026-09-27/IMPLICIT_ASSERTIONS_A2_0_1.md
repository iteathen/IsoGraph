# P versus NP implicit-assertion pass A2 — arithmetic, finiteness, and deterministic closure

**Status:** admitted exact implicit assertions, round 2  
**Premise state:** corrected A1 + A0  
**Support mode:** EXACT throughout

---

## IA-016 — primitive natural order reflexivity

### Body

```text
LE(a,a).
```

### Support

Order definition:

```text
LE(a,b)
IFF
exists d:
    ADD(a,d,b).
```

Addition zero clause supplies:

```text
ADD(a,ZERO,a)
```

by induction / recursive addition orientation.

### Disposition

ADMITTED EXACT.

---

## IA-017 — primitive natural order transitivity

### Body

```text
LE(a,b)
AND
LE(b,c)
    ->
LE(a,c).
```

### Support

There exist residuals `d1,d2`:

```text
ADD(a,d1,b)
ADD(b,d2,c).
```

Associativity of recursively represented addition is derived by natural induction, giving residual `d1+d2`.

### Support sublemma

```text
ADD_ASSOC:
    (a+d1)+d2 = a+(d1+d2).
```

This sublemma is itself an exact implicit arithmetic assertion with primitive-induction support and is included in this assertion's witness lineage.

### Disposition

ADMITTED EXACT.

---

## IA-018 — primitive natural order antisymmetry

### Body

```text
LE(a,b)
AND
LE(b,a)
    ->
a=b.
```

### Support

Additive residual definition of `LE`, zero/successor disjointness, addition functionality, induction.

A positive residual in either direction would force strict constructor growth and cannot return to the starting natural.

### Disposition

ADMITTED EXACT.

---

## IA-019 — primitive natural order totality

### Body

For all naturals:

```text
LE(a,b)
OR
LE(b,a).
```

### Support

Primitive natural induction and zero/successor decomposition.

### Witness sketch

Induct on `a`.

- ZERO <= every natural by additive residual.
- for successor `a`, decompose `b` as ZERO or successor and apply induction to predecessors.

### Disposition

ADMITTED EXACT.

---

## IA-020 — strict residual decomposition

### Body

Define explanatory strict relation only as:

```text
LT(a,b)
:=
LE(S(a),b).
```

Then:

```text
LT(a,b)
    ->
exists d:
    b = a + S(d).
```

### Support

Primitive `LE` definition and addition recursion.

### Disposition

ADMITTED EXACT.

---

## IA-021 — deterministic terminal polarity uniqueness

### Body

For one functional realization and one input, positive-terminal and negative-terminal paths cannot both exist.

### Premises

- `IA-007` exact-n endpoint functionality;
- `IA-008` no continuation from terminal;
- `IA-019` natural-order totality;
- exact positive/negative terminal disequality.

### Witness

Compare path lengths `i,j`.

- if equal: endpoint uniqueness contradicts terminal disequality;
- if `i<j`: `IA-020` gives a positive nonempty suffix after the positive terminal;
- if `j<i`: symmetric contradiction.

### Disposition

ADMITTED EXACT.

This is the corrected successor of predecessor `IA-013`.

---

## IA-022 — all paths from a bounded-total witness are bounded

### Body

For one input with bound `b`:

```text
STEP_N(j,c0,h)
    ->
LE(j,b).
```

### Support

- `IA-009`;
- `IA-019`.

### Witness

If `LE(j,b)` failed, totality gives `LE(b,j)`.

Antisymmetry handles equality; otherwise `LT(b,j)`, contradicting `IA-009`.

### Disposition

ADMITTED EXACT.

---

## IA-023 — fixed finite list members admit constant-size unary codes

### Scope

One fixed finite list `F` outside the input quantifier.

### Body

There exists an exact code relation from distinct represented members of `F` to finite bit lists such that:

- equal members have equal canonical code;
- distinct members have distinct canonical code;
- every member has a code;
- every code length is at most `LENGTH(F) + 1`.

### Support

- finite-list constructor recursion;
- `IA-004` unique list length;
- `IA-019` total natural order;
- exact equality.

### Witness construction

Use the least list position containing the member.

Encode position `i` as unary:

```text
1^i 0
```

or any exact equivalent primitive bit-list construction.

Duplicate occurrences do not create multiple canonical codes because the least position is unique under total order.

### Scope firewall

The code length bound is constant with respect to external input length only because `F` is fixed outside that input quantifier.

### Disposition

ADMITTED EXACT.

---

## IA-024 — one fixed branching witness has constant local choice-code width

### Scope

One fixed antecedent realization.

### Body

Every legal raw transition tuple can be assigned an exact finite bit code whose maximum length is input-independent.

### Support

- transition tuple typing;
- fixed finite state list;
- fixed finite symbol list;
- two exact movement values;
- `IA-023` for state and symbol members;
- finite concatenation of a fixed number of constant-size codes.

### Witness

Encode the tuple fields:

```text
(current state,
 read symbol,
 next state,
 write symbol,
 move)
```

using the canonical codes of the fixed state/symbol lists plus one movement bit.

### Disposition

ADMITTED EXACT.

---

## IA-025 — fixed local branching multiplicity is finite and input-independent

### Body

For one fixed branching realization and one fixed current state/read-symbol pair, the set of distinct legal next tuples is finite.

There is one input-independent finite upper bound for all such local branch sets.

### Support

- transition typing into fixed finite lists;
- two movement values;
- `IA-024`.

### Note

No probability or entropy is implied by finiteness.

### Disposition

ADMITTED EXACT.

---

## IA-026 — raw finite-table size is not witness-input size

### Body

The finite control/symbol/transition data of one realization are existentially chosen outside the universal input quantifier.

Therefore their represented size is constant with respect to the varying input length for asymptotic analysis of that realization.

### Support

Quantifier scope of the primitive truth kernel.

### Firewall

This does not say a *family of different realizations* has a uniform constant table size.

It is scoped to one fixed witness realization.

### Disposition

ADMITTED EXACT.

---

# A2 residuals

Still pending:

```text
CA-006  path -> explicit choice/certificate sequence
CA-008  polynomial sequence bound
CA-009  deterministic polynomial verification
CA-010  branching -> verifier factorization
CA-011  verifier -> branching
CA-012  exact existential projection equivalence
CA-013  polynomial candidate enumeration
CA-015  NEI residual dynamic propagation
CA-016..021 scoped identity consequences
CA-030..036 tape-growth/verification encoding consequences
```

# Round-2 disposition

```text
new exact assertions admitted: 11
support-lineage correction:     1
remaining universal-closure claim: NOT MADE
```
