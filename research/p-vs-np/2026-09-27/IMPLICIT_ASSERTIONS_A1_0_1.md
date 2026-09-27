# P versus NP implicit-assertion pass A1 — primitive exact closure

**Status:** admitted exact implicit assertions, round 1  
**Base:** `ASSERTION_BASE_A0_0_1.md`  
**Primitive bundle:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`  
**Support mode:** EXACT throughout  
**Probability authority:** none used

Each assertion below is implicit relative to A0: its body is not separately supplied as an A0 assertion, but it follows exactly from A0 plus the named logical/datatype authority.

---

## IA-001 — addition result functionality

### Body

For represented naturals `a,b,c1,c2`:

```text
ADD(a,b,c1)
AND
ADD(a,b,c2)
    ->
c1 = c2.
```

### Support

- `EA-010..018`;
- addition zero/successor recursion;
- successor field functionality/extensionality;
- primitive natural induction.

### Witness

Induction on `a`.

Base:

```text
ADD(0,b,c)
```

forces `c=b`.

Successor:

```text
ADD(S(a),b,S(c))
IFF
ADD(a,b,c).
```

Apply induction to predecessors and successor extensionality.

### Dependencies

QU: none.  
NEI: none.

**Disposition:** ADMITTED EXACT.

---

## IA-002 — multiplication result functionality

### Body

```text
MUL(a,b,c1)
AND
MUL(a,b,c2)
    ->
c1 = c2.
```

### Support

- multiplication zero/successor recursion;
- `IA-001`;
- primitive natural induction.

### Witness

Induction on `a`.

At successor, both results reduce to:

```text
MUL(a,b,d)
AND
ADD(d,b,c).
```

Use induction for `d`, then `IA-001` for `c`.

**Disposition:** ADMITTED EXACT.

---

## IA-003 — exponentiation result functionality

### Body

```text
POW(a,k,c1)
AND
POW(a,k,c2)
    ->
c1 = c2.
```

### Support

- exponentiation zero/successor recursion;
- `IA-002`;
- induction on `k`.

**Disposition:** ADMITTED EXACT.

---

## IA-004 — list length functionality

### Body

For every finite list object `l`:

```text
LENGTH(l,n1)
AND
LENGTH(l,n2)
    ->
n1 = n2.
```

### Support

- `EA-020..027`;
- NIL/CONS disjointness;
- functional HEAD/TAIL;
- list constructor extensionality;
- successor predecessor functionality/extensionality;
- natural induction.

### Witness

Induct on one represented length.

If length is ZERO, the recursive length IFF forces NIL, hence the other length is ZERO.

If length is a successor, the list cannot be NIL, so it is CONS with one functional tail. Both length witnesses reduce to the same tail with predecessor lengths. Apply induction and successor extensionality.

**Disposition:** ADMITTED EXACT.

---

## IA-005 — primitive input initialization is functional

### Body

For any represented bit list `x`:

```text
INIT(x,c1)
AND
INIT(x,c2)
    ->
c1 = c2
```

where `INIT` is explanatory shorthand for the primitive empty/nonempty initialization formula.

### Support

- `EA-020..024`;
- `EA-031..033`;
- empty/nonempty initialization cases;
- list/configuration constructor extensionality.

### Witness

NIL and CONS cases are disjoint.

Inside either case all four configuration fields are fixed by the primitive formula.

Configuration extensionality gives equality.

**Disposition:** ADMITTED EXACT.

---

## IA-006 — deterministic one-step successor functionality

### Scope

One fixed transition relation satisfying `EA-056` functional tuple uniqueness.

### Body

```text
STEP(c,c1)
AND
STEP(c,c2)
    ->
c1 = c2.
```

### Support

- transition tuple uniqueness for same state/read symbol;
- functional configuration fields;
- functional list HEAD/TAIL;
- one-step left/right case clauses;
- LEFT/RIGHT disequality;
- configuration extensionality.

### Witness

The current state/read symbol are unique.

Functional tuple uniqueness fixes next state, write symbol and move.

The move value fixes which left/right update case applies.

NIL/CONS and HEAD/TAIL functionality fix the exposed neighbor symbol/tail.

Thus the four next-configuration fields coincide; configuration extensionality yields equality.

**Disposition:** ADMITTED EXACT.

---

## IA-007 — deterministic exact-n endpoint functionality

### Scope

One fixed functional transition relation.

### Body

```text
STEP_N(n,c,h1)
AND
STEP_N(n,c,h2)
    ->
h1 = h2.
```

### Support

- exact-n zero/successor recursive clauses;
- `IA-006`;
- natural induction.

### Witness

Base `n=0`: both endpoints equal `c`.

Successor: `IA-006` makes the first successor unique. Apply induction to the shared successor and remaining predecessor count.

**Disposition:** ADMITTED EXACT.

---

## IA-008 — terminal states cannot occur before a longer continuation

### Body

If a configuration `h` has positive or negative terminal state, then:

```text
NOT exists c':
    STEP(h,c').
```

Therefore for any positive natural `k`:

```text
NOT STEP_N(k,h,c').
```

### Support

- `EA-035`;
- exact-n successor decomposition.

### Witness

The one-step relation requires a raw transition tuple from the current state/read symbol.

A terminal state has no such outgoing tuple.

Any positive-length exact path requires a first one-step edge.

**Disposition:** ADMITTED EXACT.

---

## IA-009 — bounded-totality excludes paths longer than the bound

### Scope

One witness satisfying `EA-052`.

### Body

Let input `x` have primitive bound `b` and initial configuration `c0`.

Then no exact path of length `j>b` exists from `c0`.

### Support

- every endpoint reachable in exactly `b` steps is terminal (`EA-052`);
- exact-n path decomposition;
- `IA-008`;
- primitive natural/order arithmetic.

### Witness

Assume a path of length `j>b`.

By exact-path decomposition, take the prefix endpoint after exactly `b` steps.

`EA-052` makes that endpoint terminal.

Because `j>b`, a positive-length suffix remains, contradicting `IA-008`.

**Disposition:** ADMITTED EXACT.

---

## IA-010 — language truth splits the positive-path cases exactly

### Scope

One branching or functional realization of raw unary relation `L`.

### Body

For each admissible input `x`:

```text
L(x)
    ->
exists i <= B(|x|), h:
    STEP_N(i,c0,h)
    AND state(h)=POSITIVE

NOT L(x)
    ->
there is no such positive-terminal bounded path.
```

### Support

- `EA-053` biconditional;
- primitive IFF direction extraction.

### Witness

The two directions are the direct logical consequences of the represented biconditional.

**Disposition:** ADMITTED EXACT.

---

## IA-011 — functional realization is a branching realization

### Body

Any witness satisfying all consequent realization clauses also satisfies all antecedent realization clauses for the same `L` after forgetting transition-tuple uniqueness.

### Support

- `EA-050..056`;
- conjunction elimination;
- the consequent repeats all branching obligations and adds one additional constraint.

### Witness

Projection/removal of the functional-uniqueness conjunct.

No source object is mutated; this is a support projection.

**Disposition:** ADMITTED EXACT.

---

## IA-012 — known containment is structural in the primitive model

### Derived explanatory body

The class of raw relations admitting a functional polynomial realization is included in the class admitting a branching polynomial realization.

### Support

`IA-011`, universally generalized over raw unary relation `L`.

### Scope

Primitive finite-control tape model only.

### Authority firewall

This is a derived-view statement. The authoritative body is `IA-011`; no complexity-class label enters primitive support.

**Disposition:** ADMITTED EXACT.

---

## IA-013 — deterministic terminal polarity is unique

### Scope

One functional realization, one input.

### Body

It is impossible to have both:

```text
a positive-terminal path from c0
and
a negative-terminal path from c0.
```

### Support

- `IA-007`;
- `IA-008`;
- positive/negative terminal disequality;
- natural linear comparability derived from the represented Peano/order theory.

### Witness

Let the path lengths be `i,j`.

If equal, `IA-007` gives the same endpoint, contradicting terminal-state disequality.

If `i<j`, the positive terminal endpoint would need a nonempty suffix to the negative endpoint, contradicting `IA-008`.

The `j<i` case is symmetric.

### Completeness note

The required natural-order comparability is a standard exact consequence of the represented zero/successor/induction theory and is included in this derivation lineage rather than imported as an opaque arithmetic premise.

**Disposition:** ADMITTED EXACT.

---

## IA-014 — exact constructor equality feeds NEI SAME

### Scope

Qualified NEI query whose natural-identity domain is exactly the mathematical constructor datatype.

### Body

If primitive constructor extensionality proves object equality, then every admissible identity model respecting that exact equality coidentifies the subjects.

### Support

- primitive exact equality;
- qualified NEI 0.4 exact-evidence semantics.

### Examples

- successor objects with same predecessor;
- CONS cells with same HEAD/TAIL;
- configurations with same four fields.

**Disposition:** ADMITTED EXACT.

---

## IA-015 — exact disequality feeds NEI DISTINCT

### Scope

Qualified NEI query whose identity theory treats primitive raw-value equality/disequality as exact object identity.

### Body

An exact represented disequality eliminating all coidentity models yields NEI DISTINCT.

### Control

Positive terminal raw value versus negative terminal raw value.

### Support

- exact primitive disequality;
- NEI 0.4 admissible-model semantics.

**Disposition:** ADMITTED EXACT.

---

# Round-1 residuals

The following seeded candidates are **not yet admitted** in A1:

```text
CA-001  global numeral-normal-form uniqueness
CA-006  branch -> finite local choice sequence
CA-007  fixed local branching is input-independent finite
CA-008  accepting choice sequence polynomial length
CA-009  deterministic polynomial verification
CA-010  branching -> certificate/verifier
CA-011  certificate/verifier -> branching
CA-012  exact existential-projection reformulation
CA-013  polynomial candidate count -> deterministic enumeration
CA-015  polynomial NEI residual width -> deterministic propagation
CA-016..021 identity/quotient closure results
CA-030..036 tape-growth/encoding/verifier results
```

They require the next closure round or stronger construction witnesses.

# Round-1 disposition

```text
new exact implicit assertions admitted: 15
Bayesian assertions admitted:            0
QU silently discharged:                  0
identity scope promotions:               0
hidden premises intentionally imported:  0
```
