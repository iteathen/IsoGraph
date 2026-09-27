# P versus NP implicit-assertion pass A7 — support-closure and representation invariance

**Status:** admitted exact implicit assertions, round 7  
**Premise state:** A0 + corrected A1 + A2 + A3 + A4 + A5 + A6  
**Purpose:** make previously inline support lemmas explicit so later assertion lineages contain no unnamed computational/arithmetic closure assumptions

---

## IA-086 — sequential composition of functional polynomial realizations is functional polynomial

### Premise

Raw relations/functions have functional polynomial realizations:

```text
F : X -> Y
G : Y -> Z.
```

### Body

The composition:

```text
H(x)=G(F(x))
```

has a functional polynomial realization.

### Construction

Use finite control to:

1. run the realization of `F`;
2. preserve/encode its output;
3. initialize the realization of `G` on that output;
4. return `G`'s terminal polarity/output.

### Time

If:

```text
T_F(n) <= p(n)
T_G(m) <= q(m)
```

and output size of `F` is polynomially bounded, total time is bounded by a polynomial composition/sum.

### Disposition

ADMITTED EXACT.

---

## IA-087 — functional polynomial predicates are closed under conjunction

### Body

If unary/binary predicates `A` and `B` are functionally polynomial, then:

```text
A AND B
```

is functionally polynomial.

### Construction

Run both deterministic realizations and accept exactly when both return positive.

### Bound

Sum of two polynomial bounds.

### Disposition

ADMITTED EXACT.

---

## IA-088 — functional polynomial predicates are closed under disjunction

Same construction as `IA-087`, accepting when either result is positive.

**Disposition:** ADMITTED EXACT.

---

## IA-089 — functional polynomial predicates are closed under XOR / exact Boolean finite composition

### Body

For any fixed Boolean truth table over a fixed finite number of functionally polynomial predicate outputs, the composed predicate is functionally polynomial.

### Support

- sequential finite composition (`IA-086`);
- finite raw Boolean truth-table control;
- fixed number of calls.

XOR used in `IA-075` is one instance.

### Disposition

ADMITTED EXACT.

---

## IA-090 — exact self-delimiting pair encoding has linear overhead

### Body

There is an exact injective bit-list encoding of ordered pair `(x,y)` with:

```text
|PAIR(x,y)|
    <=
2|x| + |y| + 1
```

using, for example:

```text
1^{|x|} 0 x y.
```

### Decoding

A deterministic scan:

1. counts initial `1`s until the first `0`;
2. consumes exactly that many bits as `x`;
3. treats the remainder as `y`.

### Identity

Exact decoding recovers one ordered pair.

### Disposition

ADMITTED EXACT.

---

## IA-091 — pair encode/decode is functionally polynomial

### Body

The relation:

```text
z = PAIR(x,y)
```

and its two projections can be implemented by functional finite-control tape realizations in polynomial time.

### Support

`IA-090`; repeated scans/copying over a linear-size code.

### Disposition

ADMITTED EXACT.

---

## IA-092 — functional polynomial computation is closed under polynomial-time precomposition

### Premises

```text
f
```

is functionally polynomial and:

```text
Q(y)
```

is a functionally polynomial predicate.

### Body

```text
P(x) := Q(f(x))
```

is functionally polynomial.

### Support

`IA-086`.

### Consequence

This is the primitive computational support underlying backward closure through polynomial many-one reductions.

### Disposition

ADMITTED EXACT.

---

## IA-093 — finite sums and products of represented polynomial bounds are polynomial bounds

### Body

For fixed finite `r`, if each:

```text
p_i(n) <= c_i * n^{k_i}
```

eventually, then fixed finite sums/products/compositions used in the campaign admit an eventual bound:

```text
C * n^K
```

for suitable fixed `C,K`.

### Support

Primitive addition/multiplication/exponentiation plus natural-order arithmetic.

For products, exponents add.

For sums, use maximum exponent and summed coefficients above `n>=1`.

### Disposition

ADMITTED EXACT.

---

## IA-094 — an eventual polynomial bound can absorb finitely many small inputs

### Premise

For:

```text
n >= n0:
f(n) <= c*n^k.
```

### Body

There exists fixed `C,K` such that for **all** represented naturals `n`:

```text
f(n) <= C*(n+1)^K.
```

where `K` may be chosen at least `k`.

### Witness

The finite set:

```text
n < n0
```

has a finite maximum of the finitely many fixed values `f(n)` because `f` is functional.

Choose `C` large enough to dominate those values and the eventual coefficient.

### Disposition

ADMITTED EXACT.

---

## IA-095 — membership in one fixed finite raw relation extension is functionally decidable

### Scope

One fixed finite tuple universe and one fixed exact raw relation extension over it.

### Body

Predicate:

```text
R(tuple)?
```

has a functional constant-table realization.

### Witness

Enumerate the finitely many possible tuples in finite control and hardwire the exact yes/no extension bits.

### Uniformity firewall

The resulting finite control depends on the fixed relation `R`.

This is not a uniform polynomial algorithm that receives arbitrary relation extensions as input.

### Disposition

ADMITTED EXACT.

---

## IA-096 — a fixed finite number of functional polynomial calls remains polynomial

### Body

Any construction issuing `k` sequential or nested polynomial-time calls for fixed natural constant `k` remains polynomial.

### Support

Repeated `IA-086` + `IA-093`.

### Relevance

This discharges the finite Boolean-composition burden used in residual distinguishing verification.

### Disposition

ADMITTED EXACT.

---

## IA-097 — nondeterministic choices may be front-loaded as one existential choice string

### Body

For one branching polynomial realization, adaptive local branching during execution is extensionally equivalent, for language acceptance, to:

1. existentially choose the complete transition-code string first;
2. deterministically replay it from the input;
3. accept iff replay is valid and reaches positive terminal.

### Support

- `IA-055..058`;
- choice code determines replay;
- accepting path iff some valid code string exists.

### Consequence

The temporal interleaving:

```text
guess one choice
execute
guess next choice
...
```

is nonessential for the extensional acceptance objective.

### Disposition

ADMITTED EXACT objective-scoped.

---

## IA-098 — bijective transition-code renaming preserves the represented language

### Scope

One fixed realization and one exact bijection on its finite transition-choice code alphabet.

### Body

Replacing every certificate code by its bijective renamed code and applying the inverse renaming before replay preserves:

```text
L(x)
```

for every input.

### Support

- `IA-056`;
- bijection preserves one-to-one legal tuple selection.

### Identity firewall

Renamed certificate strings need not be globally SAME bit-list objects.

The result is exact behavioral equivalence under the acceptance scope.

### Disposition

ADMITTED EXACT.

---

## IA-099 — bijective internal state/symbol alpha-renaming preserves language behavior

### Premise

A bijection renames:

- nonterminal state identities;
- tape-symbol identities;

while preserving:

- distinguished start/terminal roles through corresponding anchors;
- transition tuple incidence;
- input-bit/blank anchors;
- movement identities.

### Body

The renamed realization computes the same extensional raw relation `L`.

### Witness

Transport every configuration/path field through the bijection.

One-step incidence commutes with the renaming.

Initialization and terminal polarity are anchor-preserved.

### NEI firewall

Exact isomorphism/behavioral equivalence does not automatically make the two realization artifacts globally NEI SAME.

### Disposition

ADMITTED EXACT.

---

## IA-100 — exactly unreachable internal structure is nonessential for extensional language behavior

### Premise

An internal state/transition object is proved unreachable from every admissible initialized input under every admissible path of the realization.

### Body

Removing that unreachable object and any incidence solely internal to the unreachable region preserves the extensional relation `L`, provided the remaining realization still satisfies all primitive typing/totality obligations on reachable structure.

### Scope

Language-output objective only.

### Firewall

Unreachability must be exact and quantified over the full admissible input/path scope.

Failure to observe reachability is not proof of unreachability.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

# Support-lineage refinements

The following earlier assertions now cite explicit named support instead of inline “polynomial closure” or “Boolean closure” assumptions:

```text
IA-030 -> IA-093, IA-094
IA-032 -> IA-093
IA-034 -> IA-086, IA-090, IA-091, IA-093
IA-037 -> IA-086, IA-093
IA-057/058 -> IA-095
IA-075 -> IA-089, IA-090, IA-091, IA-096
IA-067 -> IA-086, IA-093
```

No assertion body changes.

# Round-7 disposition

```text
new exact/conditional assertions admitted: 15
previous hidden support assumptions named: 7 assertion families
```

Universal semantic closure is still not claimed.
