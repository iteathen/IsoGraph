# P versus NP implicit-assertion pass A19 — decision/search/Skolem equivalence

**Status:** admitted exact implicit assertions, round 19  
**Premise state:** A0 + corrected A1 + A2-A18

---

## IA-279 — existential closure gives polynomial prefix-extension queries

### Premise

Assume universal EXISTS-CLOSURE.

For verifier `V(x,w)` with normalized polynomial witness horizon, fix any prefix `p`.

### Body

The residual query:

```text
EXTENDABLE(x,p)
IFF
exists suffix s:
    V(x,p·s)
```

has a functional polynomial realization.

### Support

It is another polynomially bounded existential projection of a functional-polynomial verifier.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-280 — existential closure gives a polynomial accepting-witness constructor

### Premise

Universal EXISTS-CLOSURE.

### Body

For every polynomially bounded functional verifier `V`, there is a functional polynomial procedure returning:

```text
NONE
```

iff no accepting witness exists, otherwise returning one accepting witness.

### Construction

Use fixed-horizon/STOP normalization from `IA-149`.

1. Query root extendability.
2. If false, output NONE.
3. Otherwise, at each witness position:
   - test symbols in fixed order;
   - use `IA-279` to ask whether the current prefix plus that symbol has an accepting completion;
   - choose the first extendable symbol.
4. Stop at the canonical STOP/terminal condition.

There are polynomially many positions and a fixed finite alphabet.

Each query is polynomial.

### Soundness

Every chosen prefix remains extendable.

At the horizon the constructed witness is accepting.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-281 — existential closure gives the lexicographically first accepting witness

### Premise

Fix an exact total order on the finite witness alphabet.

### Body

The construction in `IA-280`, always selecting the least extendable next symbol, returns the lexicographically least accepting normalized witness.

### Support

Induction on prefix length.

Any lexicographically smaller accepting witness would disagree first at a smaller symbol that the procedure would have detected as extendable.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-282 — a polynomial accepting-witness/NONE constructor decides the existential projection

### Premise

Functional polynomial procedure `F(x)` returns:

- NONE exactly when no witness exists;
- otherwise one exact accepting witness.

### Body

The bounded existential projection is functionally polynomially decidable.

### Witness

Run `F`.

Return FALSE on NONE.

Otherwise optionally verify the returned witness and return TRUE.

### Disposition

ADMITTED EXACT.

---

## IA-283 — universal bounded-existential decision and universal witness search are equivalent in strength

### Principles

```text
DECISION:
    every polynomially bounded existential projection
    of a functional-polynomial verifier
    is functionally polynomial.

SEARCH:
    every such verifier has a functional polynomial
    accepting-witness/NONE constructor.
```

### Body

```text
DECISION -> SEARCH
```

by `IA-280`.

```text
SEARCH -> DECISION
```

by `IA-282`.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE.

---

## IA-284 — universal constructible singleton hitting sets are equivalent to existential closure

### Define

A singleton hitting-set constructor returns:

```text
H(x) = empty
```

when no accepting witness exists, otherwise:

```text
H(x) = {w_x}
```

for one accepting witness.

### Body

Universal polynomial construction of such `H` is equivalent to EXISTS-CLOSURE.

### Support

- singleton hitting set is a witness/NONE constructor;
- `IA-283`.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE.

---

## IA-285 — universal canonical-witness construction is equivalent to existential closure

### Principle

For a fixed exact witness order, suppose every polynomial verifier admits a functional polynomial constructor returning:

```text
the least accepting witness
```

or NONE if none exists.

### Body

This principle is equivalent in strength to EXISTS-CLOSURE.

### Support

- EXISTS-CLOSURE -> least witness: `IA-281`;
- least witness/NONE -> decision: `IA-282`.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE.

---

## IA-286 — witness uniqueness does not remove the search/decision burden

### Premise

One verifier family has at most one accepting witness per input.

### Exact conclusion

If that unique witness can be constructed in polynomial time, decision is polynomial.

But uniqueness alone does not provide the constructor or root existence decision.

### Support

- `IA-282`;
- NEI identity truth does not supply computational construction (`IA-148`).

### Scope

This is a support non-implication, not a claim about every unique-witness complexity class.

### Disposition

ADMITTED EXACT.

---

## IA-287 — Q-EXISTS access gives witness search by self-reduction

### Premise

For one verifier family, exact Q-EXISTS value is polynomially computable for every residual prefix.

### Body

An accepting witness/NONE can be constructed in polynomial time.

### Construction

Same prefix-extension procedure as `IA-280`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-288 — a polynomial exact child-selector plus exact root status gives witness search

### Premises

There are polynomial procedures:

1. `STATUS(p)` computes Q-EXISTS truth;
2. if `STATUS(p)=TRUE` and current completion is not already accepted, `SELECT(p)` returns a next symbol `a` with:

```text
STATUS(p·a)=TRUE.
```

### Body

An accepting witness is constructible in polynomial time.

### Support

Follow SELECT for polynomially many layers.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-289 — a selector without root/status completeness does not itself decide NO

### Premise

Procedure is guaranteed to return a successful next symbol only when called on a residual already known to be TRUE.

### Body

Such a selector alone does not supply a decision method for arbitrary root inputs because it has no required behavior on FALSE roots.

### Support

The missing root classification remains exactly the existential decision problem.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-290 — exact canonical witness is an objective-scoped identity choice, not natural identity of all witnesses

### Body

Lexicographically choosing one accepting witness defines a canonical representative for a search objective.

It does not establish that all accepting witnesses are globally NEI SAME.

### Support

Canonicalization policy and natural identity are different semantic notions.

### Disposition

ADMITTED EXACT.

---

## IA-291 — decision/search equivalence gives two dual DP search directions

### Decision-oriented route

Find a direct law computing:

```text
E(root).
```

### Search-oriented route

Find a law constructing:

```text
one accepting witness or NONE.
```

### Body

At the universal polynomial level the routes are equivalent in strength (`IA-283`) but can expose different primitive structures.

### Discovery consequence

DP should preserve both search topologies rather than forcing one presentation.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

# A19 central result

The unresolved closure can be stated equivalently as:

```text
DECISION:
    compute whether any witness exists

SEARCH:
    construct one witness or NONE

CANONICAL SEARCH:
    construct the least witness or NONE

SINGLETON HITTING:
    construct one-element hitting set or empty.
```

This equivalence is universal and polynomially bounded.

It does not imply any one representation is easier to discover.

# P-vs-NP status

OPEN.
