# P versus NP implicit-assertion pass A13 — aggregate identity and access cost

**Status:** admitted exact implicit assertions, round 13  
**Premise state:** A0 + corrected A1 + A2-A12  
**NEI scopes:** Q-EXISTS, Q-MIN, Q-COUNT

---

## IA-179 — Q-MIN refines Q-EXISTS

### Scope

One fixed input, verifier, residual prefix and remaining witness bound.

Define:

```text
D(p)
    =
minimum length of an accepting admissible continuation

or INF
if none exists.
```

### Body

```text
D(p) != INF
IFF
E(p)=TRUE.
```

Therefore:

```text
Q-MIN SAME(p,q)
    ->
Q-EXISTS SAME(p,q).
```

### Disposition

ADMITTED EXACT.

---

## IA-180 — Q-MIN has at most remaining-bound-plus-two exact values

### Scope

If at most `r` witness symbols remain, then:

```text
D(p)
in
{0,1,...,r,INF}.
```

### Body

The number of possible exact Q-MIN values is at most:

```text
r + 2.
```

If `r` is polynomially bounded in input length, the semantic Q-MIN value range is polynomially bounded.

### Disposition

ADMITTED EXACT.

---

## IA-181 — shortest accepting continuation obeys an exact min recurrence

### Body

Let `CURRENT(p)` mean that the empty continuation is accepting.

For remaining bound `r>0`:

```text
D_r(p)
=
0
    if CURRENT(p)

otherwise

1 + min_{a in A} D_{r-1}(p·a),
```

with:

```text
1 + INF = INF.
```

At remaining bound `0`:

```text
D_0(p)=0
```

iff the empty continuation accepts, otherwise `INF`.

### Support

Every nonempty continuation has a unique first symbol.

Taking the shortest accepting continuation therefore decomposes by its first symbol.

### Disposition

ADMITTED EXACT.

---

## IA-182 — Q-MIN is not a right congruence in general

### Counterexample

Let residual `p` accept exactly one-symbol continuation `0`.

Let residual `q` accept exactly one-symbol continuation `1`.

Then:

```text
D(p)=1
D(q)=1,
```

so they are Q-MIN SAME.

After common extension `0`:

```text
D(p·0)=0
D(q·0)=INF.
```

Thus Q-MIN SAME is not preserved by common witness extension.

### Disposition

ADMITTED EXACT COUNTEREXAMPLE.

---

## IA-183 — exact Q-MIN value computation decides Q-EXISTS

### Body

Given exact `D(p)`:

```text
E(p)=TRUE
IFF
D(p) != INF.
```

### Consequence

A universal polynomial-time exact Q-MIN value procedure would decide every bounded existential projection in polynomial time.

### Support

`IA-179`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-184 — existential-projection closure implies polynomial exact Q-MIN computation

### Premise

Assume universal EXISTS-CLOSURE from `IA-065`.

### Body

Exact `D(p)` for a polynomial verifier can be found in polynomial time.

### Witness

For every candidate length bound:

```text
k = 0..r,
```

define the functional-polynomial predicate:

```text
EXISTS-AT-MOST-k(p)
    :=
exists suffix s:
    |s| <= k
    AND
    C_p(s).
```

By EXISTS-CLOSURE, each predicate is functionally polynomial.

Since `r` is polynomially bounded, test increasing `k` until the first true value.

If none is true, return `INF`.

A polynomial number of polynomial calls remains polynomial.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-185 — universal exact Q-MIN access is equivalent in strength to existential closure

### Body

The universal principles imply each other:

```text
A. EXISTS-CLOSURE

B. exact shortest-accepting-continuation value
   is polynomial-time computable
   for every polynomial verifier/residual.
```

### Support

- A -> B: `IA-184`;
- B -> A: `IA-183` applied at the root residual.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE.

---

## IA-186 — polynomial Q-MIN semantic width does not imply polynomial decision

### Body

Every bounded existential verifier already has polynomially many possible Q-MIN values:

```text
<= r+2.
```

Yet universal polynomial access to those values is equivalent to the unresolved existential-closure principle.

Therefore:

```text
polynomial semantic identity width
    !=
polynomial identity access.
```

### Support

`IA-180` + `IA-185`.

### Disposition

ADMITTED EXACT.

---

# Q-COUNT

## IA-187 — accepting-continuation count obeys an exact sum recurrence

### Define

For remaining bound `r`, let:

```text
N_r(p)
```

be the number of admissible accepting continuations of length at most `r`.

### Body

At `r=0`:

```text
N_0(p)
=
1 if CURRENT(p)
0 otherwise.
```

For `r>0`:

```text
N_r(p)
=
[CURRENT(p)]
+
sum_{a in A} N_{r-1}(p·a),
```

where `[CURRENT]` is `1` or `0`.

### Support

The bounded suffix domain is a disjoint union of:

- the empty suffix;
- suffixes whose first symbol is each `a`.

### Disposition

ADMITTED EXACT.

---

## IA-188 — Q-COUNT refines Q-EXISTS

### Body

```text
N_r(p)=0
IFF
E_r(p)=FALSE.
```

Therefore equal exact counts imply equal existential truth.

### Disposition

ADMITTED EXACT.

---

## IA-189 — Q-COUNT values have polynomial binary representation length

### Scope

Fixed finite witness alphabet of size `k`, polynomial remaining bound `r`.

### Bound

The total number of admissible continuations is at most:

```text
1 + k + k^2 + ... + k^r.
```

Hence:

```text
N_r(p)
```

is at most that quantity.

Its binary representation length is:

```text
O(r log(k+1)).
```

For fixed `k` and polynomial `r`, that is polynomial in input length.

### Disposition

ADMITTED EXACT.

---

## IA-190 — compact numeric representation does not imply easy Q-COUNT computation

### Body

The exact count may have polynomially many bits while deriving those bits from the verifier remains a separate computational obligation.

### Exact consequence

A universal polynomial exact Q-COUNT procedure would decide existential projection by testing:

```text
N_r(root) > 0.
```

### Disposition

ADMITTED EXACT CONDITIONAL / NON-IMPLICATION.

---

## IA-191 — Q-COUNT is not a right congruence in general

### Counterexample

Residuals may have equal total accepting-continuation counts distributed over different first-symbol branches.

Appending one common symbol can expose unequal child counts.

Thus:

```text
Q-COUNT SAME
```

need not survive common witness extension.

### Disposition

ADMITTED EXACT COUNTEREXAMPLE.

---

## IA-192 — equal Q-MIN does not imply equal Q-COUNT

### Counterexample

Residual `p` has one accepting continuation of shortest length `1`.

Residual `q` has two accepting continuations, both of shortest length `1`.

Then:

```text
D(p)=D(q)=1
```

but:

```text
N(p) != N(q).
```

### Disposition

ADMITTED EXACT.

---

## IA-193 — equal Q-COUNT does not imply equal Q-MIN

### Counterexample

Residual `p` has exactly one accepting continuation of length `1`.

Residual `q` has exactly one accepting continuation of length `2`.

Then:

```text
N(p)=N(q)=1
```

but:

```text
D(p) != D(q).
```

### Disposition

ADMITTED EXACT.

---

## IA-194 — aggregate-value identities and right-congruence identities are different compositional forms

### Body

Q-RESIDUAL supports:

```text
labeled extension composition:
    class(p), a -> class(p·a).
```

Q-MIN and Q-COUNT support instead:

```text
aggregate recurrences over all child values:
    MIN
    SUM.
```

Q-EXISTS supports:

```text
OR.
```

### Consequence

Failure of right congruence does not mean the observable lacks all compositional structure.

It means the composition occurs through an aggregate operator rather than a deterministic per-symbol quotient transition.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

## IA-195 — small aggregate identity range can coexist with hard aggregate derivation

### Body

The semantic output space may be:

```text
2 values for Q-EXISTS

O(r) values for Q-MIN

polynomial-bit integers for Q-COUNT
```

while computing the aggregate from a succinct polynomial verifier remains nontrivial.

### Support

`IA-164`, `IA-180`, `IA-189`, and access-equivalence results.

### Disposition

ADMITTED EXACT.

---

## IA-196 — P-vs-NP is not an output-information-size problem

### Body

For the decision objective, the required external result is one Boolean value.

The unresolved resource question is the cost of deriving that value from the succinctly represented bounded existential structure.

### Support

Q-EXISTS has at most two semantic classes (`IA-164`), yet polynomial classification is equivalent to existential closure (`IA-171/172`).

### Scope

This is a structural statement about the represented decision problem.

It is not a Shannon-information theorem and introduces no entropy measure.

### Disposition

ADMITTED EXACT.

---

## IA-197 — answer-defined identity is maximally compressed but potentially computationally circular

### Define

An identity scope whose class label is exactly the target answer:

```text
same iff target observable is equal.
```

Q-EXISTS is such a scope.

### Body

This quotient is semantically maximally compressed for the target observable, but generic exact classification of the root is exactly the original decision task.

### Support

- two-class/objective minimum: `IA-164/167`;
- access equivalence: `IA-171/172`.

### Anti-circularity consequence

A DP proposal cannot cite the existence of this two-class quotient as an algorithm unless it independently supplies a way to compute the class.

### Disposition

ADMITTED EXACT.

---

# A13 central result

The campaign now distinguishes three orthogonal quantities:

```text
SEMANTIC RANGE
    how many identity/aggregate values exist

REPRESENTATION SIZE
    how many bits describe one value

ACCESS COST
    how hard it is to derive the correct value from primitive structure.
```

P-vs-NP can remain difficult even when the first two are tiny.

This shifts discovery pressure toward:

```text
independent structural laws
that make the aggregate value accessible
without already solving the existential projection.
```

# P-vs-NP status

OPEN.
