# P versus NP implicit-assertion pass A3 — path certificates and existential projection

**Status:** admitted exact implicit assertions, round 3  
**Premise state:** A0 + corrected A1 + A2  
**Support mode:** EXACT throughout  
**Purpose:** derive the certificate/verifier factorization from primitive transition semantics rather than importing it as a complexity-theory abstraction

---

## IA-027 — one transition increases represented tape span by at most one

### Define the structural span

For a configuration `c` with left list `l` and right list `r`, let:

```text
SPAN(c) = LENGTH(l) + LENGTH(r).
```

This is an explanatory derived quantity; its arithmetic support is primitive.

### Body

For one represented transition:

```text
STEP(c,c')
    ->
SPAN(c') <= SPAN(c) + 1.
```

### Support

Primitive one-step cases.

#### Move right

- write/current cell is consed onto `left`;
- if `right` is CONS, its head becomes current and its tail becomes new right;
- if `right` is NIL, new current is blank and right stays NIL.

So total left/right cell count either stays constant or increases by one.

#### Move left

Symmetric argument.

### Dependencies

- A0 list-length recursion;
- `IA-004`;
- A2 arithmetic/order closure.

**Disposition:** ADMITTED EXACT.

---

## IA-028 — reachable tape span is linearly bounded by input length plus step count

### Body

For input bit list `x`, primitive initial configuration `c0`, and:

```text
STEP_N(i,c0,c)
```

we have:

```text
SPAN(c) <= LENGTH(x) + i.
```

A slightly tighter bound is available for nonempty inputs, but is not needed.

### Support

- primitive initialization;
- initial left list is NIL;
- initial right list is either NIL or the input tail;
- `IA-027`;
- induction on `i`.

### Disposition

ADMITTED EXACT.

---

## IA-029 — fixed-realization configuration codes have linear size in represented span

### Scope

One fixed realization with fixed finite state and symbol lists.

### Body

There exists an exact binary encoding of every reachable configuration such that:

```text
CODELEN(c)
    <=
C0 + C1 * (SPAN(c) + 1)
```

for constants `C0,C1` independent of input length.

### Support

- `IA-023` fixed finite-list member coding;
- fixed state/symbol lists outside the input quantifier (`IA-026`);
- configuration has exactly four fields;
- left/right fields are finite symbol lists.

### Witness construction

Use fixed-width or self-delimiting constant-size codes for:

- control state;
- current symbol;
- each tape symbol.

Encode each side list with a unary natural-length prefix plus the sequence of fixed-size symbol codes.

All per-symbol widths are constants for the fixed realization.

### Identity requirement

Configuration extensionality guarantees that decoding all four exact fields reconstructs one configuration identity.

### Disposition

ADMITTED EXACT.

---

## IA-030 — an exact accepting path has a polynomial-size tableau encoding

### Scope

One branching realization satisfying the primitive polynomial bound.

### Body

If input `x` has a positive-terminal accepting path:

```text
c0, c1, ..., ci
```

then there exists a finite bit-list tableau code `w` containing the exact path such that:

```text
|w|
    <=
C * (i+1) * (|x| + i + 1)
```

for one fixed realization-dependent constant `C`.

Since:

```text
i <= B(|x|)
```

and `B` is polynomially bounded, there exists a polynomial `p` with:

```text
|w| <= p(|x|).
```

### Support

- `IA-022` path length bounded;
- `IA-028` span bound for every path configuration;
- `IA-029` linear configuration encoding;
- exact self-delimiting concatenation of `i+1` configuration codes;
- primitive multiplication/power/order;
- polynomial closure under addition and multiplication, derived from A2 arithmetic.

### Small-input handling

The primitive polynomial bound is eventual.

There are finitely many lengths below the threshold; their finite maximum certificate size is absorbed into the polynomial constant.

### Disposition

ADMITTED EXACT.

---

## IA-031 — tableau validity is locally checkable

### Body

For one fixed branching realization, there is a deterministic procedure over a pair `(x,w)` that checks exactly:

1. `w` parses into a finite sequence of configuration codes;
2. the first decoded configuration is the exact primitive initialization of `x`;
3. every adjacent pair satisfies the primitive one-step relation for the fixed transition extension;
4. the final decoded configuration has the positive terminal state.

### Why the transition check is decidable

The fixed transition extension is a subset of a finite typed tuple universe.

By `IA-024..026`, its exact tuple extension can be hardwired into finite control.

No input-dependent search over the transition relation is required.

### Soundness

If the checker accepts, primitive reconstruction yields a genuine positive-terminal path.

### Completeness

Every genuine positive-terminal path has an exact tableau encoding accepted by the checker.

### Disposition

ADMITTED EXACT.

---

## IA-032 — tableau checking is deterministic polynomial time

### Body

The checker from `IA-031` has one functional finite-control realization whose running time is polynomial in:

```text
|x| + |w|.
```

### Construction witness

A deliberately non-optimized single-tape checker is sufficient.

It can:

- parse unary/self-delimiting field lengths by scans;
- verify fixed-width state/symbol codes;
- compare adjacent encoded lists by repeated scans;
- test one-step update against a hardwired finite transition table;
- advance to the next tableau row.

Even if one adjacent-row check uses quadratic time in the encoded row lengths and the checker rescans the tableau, a fixed polynomial upper bound exists.

No random access or unit-cost high-level list operation is assumed.

### Model support

The construction is a finite-control tape computation of the same primitive kind as the truth kernel.

### Disposition

ADMITTED EXACT.

---

## IA-033 — branching realization implies polynomial bounded-certificate verification

### Body

For every raw unary relation `L` with one primitive branching polynomial realization, there exist:

- a polynomial bound `p`;
- a raw binary relation `V(x,w)`;

such that:

```text
L(x)
IFF
exists w:
    |w| <= p(|x|)
    AND
    V(x,w),
```

and `V` has a functional deterministic polynomial realization.

### Construction

`w` is the tableau certificate from `IA-030`.

`V` is exactly the checker relation from `IA-031`.

### Soundness

`V(x,w)` gives a genuine positive path, hence `L(x)` by `IA-010`.

### Completeness

`L(x)` gives a bounded positive path, hence a polynomial tableau certificate.

### Disposition

ADMITTED EXACT.

---

## IA-034 — bounded certificate verification implies a branching realization

### Premise schema

Assume exact represented data:

```text
L(x)
IFF
exists w:
    |w| <= p(|x|)
    AND
    V(x,w),
```

where:

- `p(n)` is an explicit polynomially computable natural bound;
- `V` has a functional deterministic polynomial realization on a self-delimiting pair encoding of `(x,w)`.

### Body

Then `L` has a primitive branching polynomial realization.

### Construction witness

On input `x`:

1. deterministically compute the explicit polynomial limit `p(|x|)`;
2. branch to generate an arbitrary finite bit string of length at most that limit;
3. feed the exact pair encoding `(x,w)` to the deterministic realization of `V`;
4. enter positive terminal iff the verifier returns true;
5. otherwise enter negative terminal.

A branch may choose to stop generating `w` at any position up to the limit.

All branches are forcibly stopped at the limit and then run the total verifier.

### Time bound

Guessing uses at most `p(|x|)` branching steps.

Pair construction and verifier simulation add polynomial overhead.

Composition of fixed polynomials gives a polynomial bound.

### Soundness/completeness

Directly from the certificate biconditional.

### Disposition

ADMITTED EXACT.

---

## IA-035 — branching realizability is exactly bounded existential projection of functional polynomial verification

### Body

Inside the primitive computation model:

```text
L has a branching polynomial realization
IFF
there exist polynomial p and functionally-polynomial relation V
such that

L(x)
IFF
exists w:
    |w| <= p(|x|)
    AND V(x,w).
```

### Support

- forward: `IA-033`;
- reverse: `IA-034`.

### Provenance

This is an implicit assertion recovered from the primitive transition theory.

It is the standard certificate/verifier characterization, but it is not imported as a premise.

### Disposition

ADMITTED EXACT.

---

## IA-036 — the unresolved primitive implication is equivalent to bounded existential-projection closure

### Body

The top primitive truth implication is equivalent to:

```text
for every functionally polynomial relation V(x,w)
with polynomially bounded w,

the unary projection

    L(x) := exists w V(x,w)

has a functional polynomial realization.
```

### Support

- `IA-035`;
- the consequent's functional realization;
- `IA-011` known functional-to-branching inclusion.

### Scope

Chosen primitive finite-control tape model.

### Model-transfer firewall

Official-model authority still depends on the separately tracked exact model-alignment bridge.

### Disposition

ADMITTED EXACT.

---

## IA-037 — polynomially many candidate witnesses imply deterministic polynomial projection

### Premise schema

For one bounded-existential relation:

```text
L(x)
IFF
exists w in W(x):
    V(x,w)
```

assume:

1. `V` is functionally polynomial;
2. all candidates can be enumerated deterministically;
3. the number of candidates is bounded by polynomial `q(|x|)`;
4. each candidate length is polynomially bounded.

### Body

`L` has a functional polynomial realization.

### Witness

Enumerate every candidate and run `V`.

At most:

```text
q(n)
```

polynomial-time verifier calls occur.

A finite product/composition of represented polynomial bounds is polynomial.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-038 — polynomial candidate count is stronger than polynomial candidate length

### Body

A polynomial upper bound on witness length alone does not imply the enumeration premise of `IA-037`.

### Exact structural witness

For one fixed binary witness alphabet, strings of length exactly `m` have `2^m` distinct constructor forms.

For polynomial `m(n)` of positive degree, that count is not thereby polynomially bounded.

### Scope note

This assertion records non-implication of the support conditions.

It is not a lower bound against all deterministic algorithms.

### Disposition

ADMITTED EXACT.

---

# A3 support summary

New exact assertions:

```text
IA-027 .. IA-038
```

The central exact chain is:

```text
primitive branching path
    ->
polynomial tableau
    ->
deterministic local verification
    ->
bounded existential projection
```

and conversely:

```text
bounded existential projection
+ deterministic polynomial verifier
    ->
primitive branching realization.
```

# Remaining high-priority candidates

```text
CA-015  NEI residual quotient width -> deterministic propagation
CA-016  NEI SAME equivalence closure
CA-017  continuation equivalence -> scoped SAME
CA-018  global DISTINCT + scoped SAME consistency
CA-019  scoped SAME substitution
CA-020  class count bounds
CA-021  one-class-per-depth collapse
```

Those move to the identity-focused A4 round.

# Completeness posture

This round still does not assert that all implicit consequences have been found.

It closes one major support family: branching/certificate existential factorization.
