# P versus NP implicit-assertion pass A16 — positive/negative asymmetry and rejection invariants

**Status:** admitted exact implicit assertions, round 16  
**Premise state:** A0 + corrected A1 + A2-A15

---

## IA-235 — positive truth is nonemptiness of the root continuation language

### Body

For the root residual `r0`:

```text
L(x)=TRUE
IFF
C_(r0) is nonempty.
```

### Support

- `IA-035` certificate factorization;
- continuation-language definition;
- Q-EXISTS observable.

### Disposition

ADMITTED EXACT.

---

## IA-236 — negative truth is emptiness of the root continuation language

### Body

```text
L(x)=FALSE
IFF
C_(r0)=empty.
```

### Support

Negation of `IA-235` over the complete finite bounded witness domain.

### Disposition

ADMITTED EXACT.

---

## IA-237 — YES admits one accepting continuation witness

### Body

If:

```text
L(x)=TRUE,
```

then one admissible accepting suffix/witness is exact sufficient evidence for root nonemptiness.

### Support

Definition of nonempty set / existential projection.

### Verification

The witness is polynomially bounded and functionally polynomially checkable by A3.

### Disposition

ADMITTED EXACT.

---

## IA-238 — NO requires exclusion of every accepting continuation unless compressed by another exact theorem

### Body

The literal continuation-language statement:

```text
C_(r0)=empty
```

is equivalent to:

```text
for every admissible witness w:
    NOT V(x,w).
```

### Support

Set emptiness and bounded universal projection.

### Qualification

A proof need not enumerate every witness individually.

Any exact theorem/invariant that entails this universal claim may replace enumeration.

### Disposition

ADMITTED EXACT.

---

## IA-239 — the primitive YES/NO evidence burden is asymmetric

### Body

At the direct certificate level:

```text
YES:
    one accepting witness suffices

NO:
    absence of every accepting witness must be established.
```

### Support

`IA-237`, `IA-238`.

### Scope

This is about the direct bounded-witness presentation.

It does not say no short negative certificate can exist.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

## IA-240 — functional realization removes branch-family uncertainty for both polarities

### Body

For a functional realization and one input:

- there is one exact maximal terminal path (`IA-061`);
- positive terminal gives TRUE;
- negative terminal gives FALSE.

Thus one deterministic trajectory determines either polarity.

### Support

- `IA-061`;
- terminal interpretation in the primitive truth formula.

### Disposition

ADMITTED EXACT.

---

## IA-241 — an inductive rejection invariant proves root continuation emptiness

### Premises

For one input/branching realization, let `I(c)` be an exact represented predicate on configurations satisfying:

1. initial configuration is in `I`;
2. closure:

```text
I(c)
AND
STEP(c,c')
    ->
I(c');
```

3. positive terminal configurations are excluded:

```text
I(c)
    ->
state(c) != POSITIVE.
```

### Body

No positive terminal configuration is reachable from the initial configuration.

Therefore:

```text
C_root = empty
```

and:

```text
L(x)=FALSE.
```

### Witness

Induction on exact path length.

Every reachable configuration remains in `I`; positive terminal is forbidden inside `I`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-242 — the exact reachable set is always a rejection invariant on a NO instance

### Scope

One fixed NO input.

### Define

```text
Reach(c)
IFF
exists i <= bound:
    STEP_N(i,c0,c).
```

### Body

The exact reachable set:

- contains `c0`;
- is transition-closed for reachable nonterminal successors within the bound;
- contains no positive terminal on a NO instance.

So it satisfies the semantic role of `IA-241`.

### Important limitation

Its explicit representation may contain exponentially many configurations or may be computationally expensive to characterize.

### Disposition

ADMITTED EXACT.

---

## IA-243 — rejection-invariant existence is not the same as efficient negative certification

### Body

`IA-242` shows an exact invariant exists for every NO instance.

This alone does not give:

- polynomial representation size;
- polynomial-time membership;
- polynomial-time closure verification;
- polynomial-time construction.

### Support

Those are additional algorithmic/resource obligations absent from the existence statement.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-244 — compact verifiable rejection invariant is a negative-certificate compression topology

### Premises

There is a representation `z` of predicate/invariant `I_z` such that:

1. `|z|` is polynomially bounded;
2. checking `c0 in I_z` is polynomial;
3. checking exclusion of positive terminal is polynomial under a represented exact method;
4. checking transition closure is polynomial under a represented exact method;
5. the checks are sound for the full relevant configuration domain.

### Body

`z` is a polynomial-size verifiable certificate that:

```text
L(x)=FALSE.
```

### Support

`IA-241`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-245 — polynomial positive and negative certificates alone do not supply a deterministic polynomial decider

### Premises

For every input:

- YES instances have polynomial verifiable positive certificates;
- NO instances have polynomial verifiable negative certificates.

### Exact support conclusion

These premises supply short verifiable evidence for both polarities.

They do **not themselves contain**:

- a deterministic polynomial constructor for the correct certificate;
- a deterministic polynomial rule selecting the correct polarity.

### Body

A deterministic polynomial decision conclusion requires additional support beyond certificate existence/verification.

### Scope of non-implication

This is a support-theoretic statement:

```text
the represented premises do not contain a decider construction.
```

It is not a claim that no separate theorem could derive one.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-246 — polynomial-time construction of either polarity certificate gives a deterministic polynomial decider

### Premise

There is one functional polynomial procedure which, on every input, outputs exactly one of:

```text
positive certificate
negative certificate
```

with a tag indicating its type, and both verification systems are sound/complete.

### Body

The language is functionally polynomially decidable.

### Witness

Run constructor; verify the returned tagged certificate; output the corresponding polarity.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-247 — polynomial-time construction of a rejection invariant on every NO input plus positive-witness construction on YES inputs gives P

### Premise

One functional polynomial procedure is guaranteed to produce:

- an accepting witness when one exists; or
- a compact sound rejection invariant when none exists.

### Body

Deterministic polynomial decision follows.

### Support

Specialization of `IA-246`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-248 — Q-EXISTS FALSE is the negative fixed point of existential recurrence

### Body

Under the recurrence:

```text
E(p)
=
CURRENT(p)
OR
OR_a E(p·a),
```

we have:

```text
E(p)=FALSE
```

iff:

```text
CURRENT(p)=FALSE
AND
for every a:
    E(p·a)=FALSE.
```

### Support

Finite Boolean OR semantics.

### Disposition

ADMITTED EXACT.

---

## IA-249 — Q-EXISTS TRUE needs one successful child, FALSE needs all children false

### Body

For a non-currently-accepting residual:

```text
E(p)=TRUE
IFF
exists a:
    E(p·a)=TRUE

E(p)=FALSE
IFF
forall a:
    E(p·a)=FALSE.
```

### Support

`IA-248` and finite OR duality.

### Significance

This is the recursive local form of the positive/negative evidence asymmetry.

### Disposition

ADMITTED EXACT.

---

## IA-250 — exact dominance propagates negative information backward

### Body

If:

```text
p <=F q
```

and:

```text
E(q)=FALSE,
```

then:

```text
E(p)=FALSE.
```

### Support

Contrapositive of `IA-203`.

### Interpretation

A known-false dominating residual proves every dominated residual false.

### Disposition

ADMITTED EXACT.

---

## IA-251 — exact dominance propagates positive information forward

### Body

If:

```text
p <=F q
```

and:

```text
E(p)=TRUE,
```

then:

```text
E(q)=TRUE.
```

### Support

`IA-203`.

### Disposition

ADMITTED EXACT.

---

## IA-252 — positive and negative compression use different exact structures

### Positive side

Can compress via:

- one accepting witness;
- hitting set containing an accepting witness;
- domination by a known-true residual;
- aggregate OR.

### Negative side

Can compress via:

- rejection invariant;
- universal child-false closure;
- domination from a known-false dominator;
- another exact emptiness theorem.

### Body

The useful compression certificate need not have the same topology on both polarities.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

# A16 central result

The primitive existential residual contains a polarity asymmetry:

```text
TRUE:
    prove one successful future exists

FALSE:
    prove no successful future exists.
```

Determinism removes this asymmetry operationally by leaving one terminal trajectory.

Alternative P-vs-NP routes can therefore search not only for witness-space collapse, but also for independently constructible compact **negative invariants** that eliminate the universal no-side burden.

Existence of such certificates alone is not enough; construction/access cost remains load-bearing.

# P-vs-NP status

OPEN.
