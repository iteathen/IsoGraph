# P versus NP implicit-assertion pass A21 — local simulation certificates for dominance

**Status:** admitted exact implicit assertions, round 21  
**Premise state:** A0 + corrected A1 + A2-A20

This round supplies a local sufficient condition for continuation dominance that does not require solving the full suffix-inclusion query directly.

---

## IA-303 — choice-normalized residuals form a deterministic labeled transition system

### Scope

Use the transition-choice certificate normalization from A5.

For one residual state `p` and one next choice-code symbol `a`:

```text
NEXT(p,a)
```

is either:

- one uniquely determined successor residual; or
- invalid/no successor.

### Support

- `IA-054`: a selected legal tuple determines at most one next configuration;
- exact transition-code decoding;
- `IA-055`: one code sequence determines at most one replay path.

### Body

After choice normalization, nondeterminism is externalized into the choice label.

Conditioned on one label, successor behavior is functional.

### Disposition

ADMITTED EXACT.

---

## IA-304 — finite-horizon continuation dominance has a one-layer recursive characterization

### Scope

Same verifier/input and same remaining witness horizon.

Let:

```text
DOM_t(p,q)
```

mean:

```text
p <=F q
```

at depth `t`.

### Body

At nonterminal depth:

```text
DOM_t(p,q)
IFF

(CURRENT(p) -> CURRENT(q))

AND

for every next choice symbol a:

    if NEXT(p,a)=p'
    then
        NEXT(q,a)=q'
        for some q'
        AND
        DOM_(t+1)(p',q').
```

Invalid choice labels on `p` impose no obligation.

### Proof — forward

If `p <=F q`:

- empty/STOP acceptance from `p` must be accepted from `q`;
- for any legal `a` at `p`, every accepting suffix after `p·a`
  gives an accepting continuation `a·s` from `p`;
- dominance makes `a·s` accepting from `q`;
- therefore the same first choice must be legal under the normalized exact code semantics and child continuation is dominated.

### Proof — reverse

Induct over remaining suffix length.

Current/empty acceptance transfers by the first clause.

For any nonempty accepting continuation `a·s` from `p`, the second clause supplies matching `q'` and child dominance; induction transfers `s`.

### Disposition

ADMITTED EXACT.

---

## IA-305 — exact residual identity has the symmetric local simulation characterization

### Body

Q-RESIDUAL SAME at one fixed horizon is equivalent to:

```text
DOM_t(p,q)
AND
DOM_t(q,p).
```

Using `IA-304`, this is exact mutual label-preserving simulation with equal current acceptance.

### Support

- `IA-200`;
- `IA-304`.

### NEI significance

This is an exact local proof route to scoped SAME.

It does not make the underlying raw objects globally SAME.

### Disposition

ADMITTED EXACT.

---

## IA-306 — any locally closed forward-simulation relation is sound dominance evidence

### Premise

Represent relation:

```text
R_t(p,q)
```

for residual pairs at each depth, satisfying:

1. if `R_t(p,q)` and `CURRENT(p)`, then `CURRENT(q)`;
2. if `R_t(p,q)` and `NEXT(p,a)=p'`, then there exists `q'` with:
   - `NEXT(q,a)=q'`;
   - `R_(t+1)(p',q')`.

No completeness converse is required.

### Body

```text
R_t(p,q)
    ->
p <=F q.
```

### Proof

Induction on remaining horizon, exactly as the reverse direction of `IA-304`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-307 — local simulation is a sound incomplete dominance under-approximation

### Define

```text
Dhat(p,q)
IFF
R_t(p,q)
```

for any relation satisfying `IA-306`.

### Body

```text
Dhat(p,q)
    ->
p <=F q.
```

Thus it is a valid `Dhat` for A17 pruning.

### Support

`IA-306`, `IA-253`.

### Disposition

ADMITTED EXACT.

---

## IA-308 — mutual sound simulation gives exact Q-RESIDUAL SAME

### Premises

```text
R_t(p,q)
R'_t(q,p)
```

where each relation independently satisfies the local simulation conditions.

### Body

```text
Q-RESIDUAL SAME(p,q).
```

### Support

- `IA-306` gives both dominance directions;
- `IA-200` converts mutual dominance to SAME.

### Disposition

ADMITTED EXACT.

---

## IA-309 — local simulation can prove SAME/DISTINCT structure without enumerating suffixes

### Body

A finite relation/certificate closed under the local rules of `IA-306` can establish dominance by checking only represented local obligations.

Mutual certificates can establish SAME.

### Exact limitation

The relation may itself be large or hard to construct.

The assertion concerns proof locality, not resource complexity.

### Disposition

ADMITTED EXACT.

---

## IA-310 — polynomial-size simulation certificate with polynomial local verification gives polynomially verifiable dominance evidence

### Premises

For queried `p,q`, certificate `z` represents relation `R` such that:

- `|z|` is polynomial;
- membership/pair enumeration is polynomially accessible;
- all current-acceptance obligations can be checked polynomially;
- all labeled-successor closure obligations can be checked polynomially;
- `R(p,q)` is represented.

### Body

`z` is a polynomial-size polynomially verifiable certificate for:

```text
p <=F q.
```

### Support

`IA-306`.

### Important distinction

Verification of supplied dominance evidence is not the same as deterministic construction of such evidence.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-311 — polynomial dominance certificates alone do not yield a deterministic pruning algorithm

### Body

Even if every true dominance fact of interest has a polynomial verifiable simulation certificate, a deterministic algorithm still needs a polynomial method to:

- find the relevant certificate; or
- otherwise establish enough dominance facts.

### Support

Same existence-versus-construction distinction as A16/A19.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-312 — polynomially constructible local simulation cover yields polynomial decision when frontier width remains polynomial

### Premises

There is a deterministic polynomial process which, at each depth:

1. generates polynomially many retained residuals;
2. constructs/checks sound local simulation evidence showing every omitted reachable residual is dominated by a retained one;
3. preserves polynomial frontier size;
4. constructs next residuals polynomially.

### Body

The bounded existential projection is functionally polynomial.

### Support

Local simulations imply true dominance (`IA-306`).

Apply the exact sound-cover algorithm `IA-255/260`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-313 — simulation search may be strictly cheaper than exact dominance classification on restricted families

### Body

The universal exact dominance problem is equivalent in strength to existential closure (`IA-214`).

A restricted syntactically generated relation `R` satisfying `IA-306` need not decide all true dominance pairs.

Therefore no existing equivalence forces construction of `R` to solve the universal problem.

### Scope

This is a support non-implication.

It does not assert that a useful `R` exists for every verifier.

### Disposition

ADMITTED EXACT.

---

## IA-314 — simulation relation identity is itself scope-sensitive

### Body

Two residuals may be:

- globally DISTINCT;
- Q-RESIDUAL SAME by mutual simulation;
- or one-way dominance-related by forward simulation only.

These are three different semantic relations.

### NEI firewall

One-way simulation is evidence of substitutability for the existential objective, not natural coidentity.

### Disposition

ADMITTED EXACT.

---

## IA-315 — simulation failure does not establish non-dominance

### Body

Failure to find/prove `R_t(p,q)` for one chosen simulation relation does not establish:

```text
NOT (p <=F q).
```

### Support

`R` is only a sound under-approximation.

Exact non-dominance requires a distinguishing suffix or another complete theorem (`IA-201`).

### Disposition

ADMITTED EXACT.

---

# A21 central result

The first non-circular dominance mechanism is now explicit:

```text
local forward simulation certificate
    ->
exact continuation dominance
    ->
sound pruning.
```

It has three valuable properties:

1. it is **one-way**, so it can prune more than NEI equality;
2. it is **local**, so verification need not enumerate every suffix;
3. it may be **incomplete**, so it avoids requiring a universal exact dominance oracle.

The remaining discovery burden is concrete:

> Find primitive verifier structure that makes a polynomially constructible simulation cover exist with polynomial frontier width.

# P-vs-NP status

OPEN.
